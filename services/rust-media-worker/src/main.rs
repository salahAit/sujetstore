use std::env;
use std::net::SocketAddr;
use std::sync::Arc;
use std::time::Instant;

use axum::body::Bytes;
use axum::extract::{DefaultBodyLimit, State};
use axum::http::{header, HeaderMap, HeaderValue, StatusCode};
use axum::response::{IntoResponse, Response};
use axum::routing::{get, post};
use axum::{Json, Router};
use lopdf::{dictionary, Document, Object, ObjectId, Stream, StringFormat};
use serde::{Deserialize, Serialize};

const SERVICE_NAME: &str = "sujetstore-rust-worker";
const SERVICE_VERSION: &str = env!("CARGO_PKG_VERSION");
const MAX_PDF_BYTES: usize = 64 * 1024 * 1024; // 64 MiB

#[derive(Clone)]
struct AppState {
    internal_secret: Option<String>,
}

#[derive(Serialize)]
struct HealthResponse {
    status: &'static str,
    service: &'static str,
    version: &'static str,
}

#[derive(Serialize)]
struct ErrorResponse {
    ok: bool,
    error: String,
}

#[derive(Deserialize)]
struct ParseTranscriptRequest {
    raw: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
struct TranscriptSegment {
    seq_index: usize,
    start_sec: u32,
    end_sec: u32,
    text_ar: String,
    text_normalized: String,
}

#[derive(Serialize)]
struct ParseTranscriptResponse {
    segments: Vec<TranscriptSegment>,
}

#[tokio::main]
async fn main() {
    let bind_addr = env::var("BIND_ADDR").unwrap_or_else(|_| "127.0.0.1:9020".to_string());
    let internal_secret = env::var("RUST_WORKER_SECRET")
        .ok()
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty());

    let state = Arc::new(AppState { internal_secret });

    let app = build_router(state);

    let addr: SocketAddr = bind_addr
        .parse()
        .unwrap_or_else(|e| panic!("Invalid BIND_ADDR '{bind_addr}': {e}"));

    println!(
        "[{SERVICE_NAME}] v{SERVICE_VERSION} listening on http://{addr} (secret={})",
        if env::var("RUST_WORKER_SECRET")
            .ok()
            .filter(|s| !s.trim().is_empty())
            .is_some()
        {
            "enabled"
        } else {
            "disabled"
        }
    );

    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .unwrap_or_else(|e| panic!("Failed to bind {addr}: {e}"));

    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await
        .expect("Axum server exited with error");
}

fn build_router(state: Arc<AppState>) -> Router {
    Router::new()
        .route("/health", get(health_handler))
        .route("/watermark-pdf", post(watermark_pdf_handler))
        .route("/parse-transcript", post(parse_transcript_handler))
        .layer(DefaultBodyLimit::max(MAX_PDF_BYTES))
        .with_state(state)
}

async fn shutdown_signal() {
    let ctrl_c = async {
        let _ = tokio::signal::ctrl_c().await;
    };
    #[cfg(unix)]
    let terminate = async {
        if let Ok(mut sig) =
            tokio::signal::unix::signal(tokio::signal::unix::SignalKind::terminate())
        {
            sig.recv().await;
        }
    };
    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {},
        _ = terminate => {},
    }
}

fn constant_time_eq(a: &[u8], b: &[u8]) -> bool {
    if a.len() != b.len() {
        return false;
    }
    let mut diff: u8 = 0;
    for (&x, &y) in a.iter().zip(b.iter()) {
        diff |= x ^ y;
    }
    diff == 0
}

fn verify_internal_secret(state: &AppState, headers: &HeaderMap) -> bool {
    let Some(expected) = state.internal_secret.as_deref() else {
        return true;
    };
    let provided = headers
        .get("x-internal-secret")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("");
    constant_time_eq(expected.as_bytes(), provided.as_bytes())
}

fn json_error(status: StatusCode, msg: impl Into<String>) -> Response {
    (
        status,
        Json(ErrorResponse {
            ok: false,
            error: msg.into(),
        }),
    )
        .into_response()
}

async fn health_handler() -> Json<HealthResponse> {
    Json(HealthResponse {
        status: "ok",
        service: SERVICE_NAME,
        version: SERVICE_VERSION,
    })
}

async fn watermark_pdf_handler(
    State(state): State<Arc<AppState>>,
    headers: HeaderMap,
    body: Bytes,
) -> Response {
    if !verify_internal_secret(&state, &headers) {
        return json_error(StatusCode::UNAUTHORIZED, "Invalid X-Internal-Secret");
    }

    if body.len() < 8 || !body.starts_with(b"%PDF-") {
        return json_error(StatusCode::BAD_REQUEST, "Request body is not a valid PDF");
    }

    let raw_watermark = headers
        .get("x-watermark-text")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("SujetStore")
        .to_string();

    let owner_hash = headers
        .get("x-owner-hash")
        .and_then(|v| v.to_str().ok())
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty());

    let started = Instant::now();
    let input_vec = body.to_vec();

    let result = tokio::task::spawn_blocking(move || {
        watermark_pdf_bytes(&input_vec, &raw_watermark, owner_hash.as_deref())
    })
    .await;

    let elapsed_ms = started.elapsed().as_millis();

    match result {
        Ok(Ok(pdf_bytes)) => {
            let mut resp = Response::new(axum::body::Body::from(pdf_bytes));
            *resp.status_mut() = StatusCode::OK;
            let resp_headers = resp.headers_mut();
            resp_headers.insert(
                header::CONTENT_TYPE,
                HeaderValue::from_static("application/pdf"),
            );
            if let Ok(ms_val) = HeaderValue::from_str(&elapsed_ms.to_string()) {
                resp_headers.insert("x-watermark-ms", ms_val);
            }
            resp
        }
        Ok(Err(err)) => json_error(StatusCode::UNPROCESSABLE_ENTITY, err),
        Err(join_err) => json_error(
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Worker task failed: {join_err}"),
        ),
    }
}

async fn parse_transcript_handler(
    State(state): State<Arc<AppState>>,
    headers: HeaderMap,
    Json(payload): Json<ParseTranscriptRequest>,
) -> Response {
    if !verify_internal_secret(&state, &headers) {
        return json_error(StatusCode::UNAUTHORIZED, "Invalid X-Internal-Secret");
    }

    let segments = parse_transcript(&payload.raw);
    (StatusCode::OK, Json(ParseTranscriptResponse { segments })).into_response()
}

// ============================================================================
// PDF Watermarking Engine (lopdf)
// ============================================================================

/// Restricts watermark text to printable ASCII suitable for Standard Type1 Helvetica.
fn sanitize_ascii_watermark(text: &str) -> String {
    let cleaned: String = text
        .chars()
        .map(|c| {
            if c.is_ascii() && (0x20..=0x7E).contains(&(c as u32)) {
                c
            } else if c.is_whitespace() {
                ' '
            } else {
                ' '
            }
        })
        .collect();
    let collapsed = cleaned.split_whitespace().collect::<Vec<_>>().join(" ");
    if collapsed.is_empty() {
        "SujetStore".to_string()
    } else if collapsed.len() > 160 {
        collapsed[..160].to_string()
    } else {
        collapsed
    }
}

/// Escapes special characters inside a PDF literal string `(...)`.
fn escape_pdf_literal(s: &str) -> String {
    let mut out = String::with_capacity(s.len() + 8);
    for ch in s.chars() {
        match ch {
            '\\' => out.push_str("\\\\"),
            '(' => out.push_str("\\("),
            ')' => out.push_str("\\)"),
            _ => out.push(ch),
        }
    }
    out
}

/// Resolves a page's MediaBox (walking up `/Parent` nodes if inherited).
fn resolve_media_box(doc: &Document, page_id: ObjectId) -> [f32; 4] {
    let default_box = [0.0_f32, 0.0_f32, 595.0_f32, 842.0_f32];
    let mut current_id = Some(page_id);
    let mut depth = 0;

    while let Some(obj_id) = current_id {
        if depth > 16 {
            break;
        }
        depth += 1;
        let Ok(dict) = doc.get_dictionary(obj_id) else {
            break;
        };

        if let Ok(mb_obj) = dict.get(b"MediaBox") {
            let resolved = match mb_obj {
                Object::Reference(r) => doc.get_object(*r).ok(),
                other => Some(other),
            };
            if let Some(Object::Array(arr)) = resolved {
                if arr.len() >= 4 {
                    let vals: Vec<f32> = arr
                        .iter()
                        .take(4)
                        .filter_map(|o| match o {
                            Object::Real(f) => Some(*f),
                            Object::Integer(i) => Some(*i as f32),
                            _ => None,
                        })
                        .collect();
                    if vals.len() == 4 {
                        return [vals[0], vals[1], vals[2], vals[3]];
                    }
                }
            }
        }

        current_id = dict.get(b"Parent").ok().and_then(|p| p.as_reference().ok());
    }

    default_box
}

/// Finds inherited `/Resources` dictionary from parent `/Pages` tree if the page has none.
fn find_inherited_resources(doc: &Document, page_id: ObjectId) -> Option<lopdf::Dictionary> {
    let mut current_id = doc
        .get_dictionary(page_id)
        .ok()
        .and_then(|d| d.get(b"Parent").ok())
        .and_then(|p| p.as_reference().ok());
    let mut depth = 0;

    while let Some(obj_id) = current_id {
        if depth > 16 {
            break;
        }
        depth += 1;
        let Ok(dict) = doc.get_dictionary(obj_id) else {
            break;
        };
        if let Ok(res_obj) = dict.get(b"Resources") {
            let resolved = match res_obj {
                Object::Reference(r) => doc.get_object(*r).ok(),
                other => Some(other),
            };
            if let Some(Object::Dictionary(res_dict)) = resolved {
                return Some(res_dict.clone());
            }
        }
        current_id = dict.get(b"Parent").ok().and_then(|p| p.as_reference().ok());
    }
    None
}

/// Injects custom `SujetStoreOwner` (and `SujetStoreWatermark`) entries into the PDF Info dictionary.
fn inject_info_metadata(doc: &mut Document, watermark_text: &str, owner_hash: Option<&str>) {
    let owner_value = owner_hash.unwrap_or(watermark_text);

    if let Ok(info_obj) = doc.trailer.get(b"Info").cloned() {
        match info_obj {
            Object::Reference(info_id) => {
                if let Ok(Object::Dictionary(ref mut info_dict)) = doc.get_object_mut(info_id) {
                    info_dict.set(
                        "SujetStoreOwner",
                        Object::String(owner_value.as_bytes().to_vec(), StringFormat::Literal),
                    );
                    info_dict.set(
                        "SujetStoreWatermark",
                        Object::String(watermark_text.as_bytes().to_vec(), StringFormat::Literal),
                    );
                    return;
                }
            }
            Object::Dictionary(mut info_dict) => {
                info_dict.set(
                    "SujetStoreOwner",
                    Object::String(owner_value.as_bytes().to_vec(), StringFormat::Literal),
                );
                info_dict.set(
                    "SujetStoreWatermark",
                    Object::String(watermark_text.as_bytes().to_vec(), StringFormat::Literal),
                );
                let info_id = doc.add_object(Object::Dictionary(info_dict));
                doc.trailer.set("Info", Object::Reference(info_id));
                return;
            }
            _ => {}
        }
    }

    let info_dict = dictionary! {
        "SujetStoreOwner" => Object::String(owner_value.as_bytes().to_vec(), StringFormat::Literal),
        "SujetStoreWatermark" => Object::String(watermark_text.as_bytes().to_vec(), StringFormat::Literal),
    };
    let info_id = doc.add_object(Object::Dictionary(info_dict));
    doc.trailer.set("Info", Object::Reference(info_id));
}

/// Ensures a sub-dictionary (e.g. `Font` or `ExtGState`) inside a `Resources` dictionary
/// contains `(entry_key -> Reference(target_id))`, safely handling indirect sub-dictionaries.
fn ensure_resource_entry(
    doc: &mut Document,
    resources_dict: &mut lopdf::Dictionary,
    category: &[u8],
    entry_key: &[u8],
    target_id: ObjectId,
) {
    match resources_dict.get(category).cloned() {
        Ok(Object::Reference(sub_ref)) => {
            if let Ok(Object::Dictionary(sub_dict)) = doc.get_object(sub_ref) {
                let mut cloned = sub_dict.clone();
                cloned.set(entry_key, Object::Reference(target_id));
                let new_sub_id = doc.add_object(Object::Dictionary(cloned));
                resources_dict.set(category, Object::Reference(new_sub_id));
            } else {
                let mut new_dict = lopdf::Dictionary::new();
                new_dict.set(entry_key, Object::Reference(target_id));
                resources_dict.set(category, Object::Dictionary(new_dict));
            }
        }
        Ok(Object::Dictionary(mut sub_dict)) => {
            sub_dict.set(entry_key, Object::Reference(target_id));
            resources_dict.set(category, Object::Dictionary(sub_dict));
        }
        _ => {
            let mut new_dict = lopdf::Dictionary::new();
            new_dict.set(entry_key, Object::Reference(target_id));
            resources_dict.set(category, Object::Dictionary(new_dict));
        }
    }
}

fn watermark_pdf_bytes(
    input: &[u8],
    raw_watermark_text: &str,
    owner_hash: Option<&str>,
) -> Result<Vec<u8>, String> {
    let mut doc = Document::load_mem(input).map_err(|e| format!("Failed to parse PDF: {e}"))?;

    let wm_text = sanitize_ascii_watermark(raw_watermark_text);
    let escaped_wm = escape_pdf_literal(&wm_text);

    // 1. Inject Info dictionary metadata
    inject_info_metadata(&mut doc, &wm_text, owner_hash);

    // 2. Create shared Helvetica Type1 font & translucent ExtGState objects once
    let font_id = doc.add_object(Object::Dictionary(dictionary! {
        "Type" => "Font",
        "Subtype" => "Type1",
        "BaseFont" => "Helvetica",
        "Encoding" => "WinAnsiEncoding",
    }));

    let gs_id = doc.add_object(Object::Dictionary(dictionary! {
        "Type" => "ExtGState",
        "ca" => 0.45_f32,
        "CA" => 0.45_f32,
    }));

    // Reusable graphics-state isolation prefix so existing page CTM transforms cannot distort footer
    let save_state_stream_id = doc.add_object(Stream::new(dictionary! {}, b"q\n".to_vec()));

    // 3. Stamp every page safely without modifying existing content streams
    let pages: Vec<(u32, ObjectId)> = doc.get_pages().into_iter().collect();
    for (_page_num, page_id) in pages {
        let [llx, lly, _urx, _ury] = resolve_media_box(&doc, page_id);
        let x = llx + 24.0;
        let y = lly + 14.0;

        // Prepare Resources dictionary for this page (cloning indirect or inherited resources safely)
        let current_res_obj = doc
            .get_dictionary(page_id)
            .ok()
            .and_then(|d| d.get(b"Resources").ok().cloned());

        let mut resources_dict = match current_res_obj {
            Some(Object::Dictionary(d)) => d,
            Some(Object::Reference(res_id)) => match doc.get_object(res_id) {
                Ok(Object::Dictionary(d)) => d.clone(),
                _ => lopdf::Dictionary::new(),
            },
            _ => find_inherited_resources(&doc, page_id).unwrap_or_default(),
        };

        ensure_resource_entry(&mut doc, &mut resources_dict, b"Font", b"F_SS_WM", font_id);
        ensure_resource_entry(
            &mut doc,
            &mut resources_dict,
            b"ExtGState",
            b"GS_SS_WM",
            gs_id,
        );

        let new_res_id = doc.add_object(Object::Dictionary(resources_dict));

        // Build footer watermark stream (closes the outer `q` first, then draws in default page space)
        let wm_ops = format!(
            "\nQ\nq\n/GS_SS_WM gs\nBT\n/F_SS_WM 8 Tf\n0.45 g\n1 0 0 1 {x:.2} {y:.2} Tm\n({escaped_wm}) Tj\nET\nQ\n"
        );
        let wm_stream_id = doc.add_object(Stream::new(dictionary! {}, wm_ops.into_bytes()));

        // Read existing /Contents references without altering their streams
        let existing_contents = doc
            .get_dictionary(page_id)
            .ok()
            .and_then(|d| d.get(b"Contents").ok().cloned());

        let mut new_contents_array: Vec<Object> = Vec::new();
        match existing_contents {
            Some(Object::Reference(ref_id)) => {
                // Check if the indirect object is itself an Array of stream refs or a single Stream
                match doc.get_object(ref_id) {
                    Ok(Object::Array(arr)) => {
                        new_contents_array.push(Object::Reference(save_state_stream_id));
                        new_contents_array.extend(arr.clone());
                        new_contents_array.push(Object::Reference(wm_stream_id));
                    }
                    _ => {
                        new_contents_array.push(Object::Reference(save_state_stream_id));
                        new_contents_array.push(Object::Reference(ref_id));
                        new_contents_array.push(Object::Reference(wm_stream_id));
                    }
                }
            }
            Some(Object::Array(arr)) => {
                new_contents_array.push(Object::Reference(save_state_stream_id));
                new_contents_array.extend(arr);
                new_contents_array.push(Object::Reference(wm_stream_id));
            }
            _ => {
                // Blank page with no prior contents
                let standalone_ops = format!(
                    "q\n/GS_SS_WM gs\nBT\n/F_SS_WM 8 Tf\n0.45 g\n1 0 0 1 {x:.2} {y:.2} Tm\n({escaped_wm}) Tj\nET\nQ\n"
                );
                let standalone_id =
                    doc.add_object(Stream::new(dictionary! {}, standalone_ops.into_bytes()));
                new_contents_array.push(Object::Reference(standalone_id));
            }
        }

        if let Ok(Object::Dictionary(ref mut page_dict)) = doc.get_object_mut(page_id) {
            page_dict.set("Resources", Object::Reference(new_res_id));
            page_dict.set("Contents", Object::Array(new_contents_array));
        }
    }

    let mut out = Vec::with_capacity(input.len() + 2048);
    doc.save_to(&mut out)
        .map_err(|e| format!("Failed to serialize watermarked PDF: {e}"))?;

    if !out.starts_with(b"%PDF-") {
        return Err("Serialized output missing %PDF- header".to_string());
    }

    Ok(out)
}

// ============================================================================
// WebVTT / SRT Transcript Parser & Arabic Normalizer
// ============================================================================

/// Normalizes Arabic text for accent-insensitive search:
/// - Strips Arabic diacritics (\u{064B}..=\u{065F}, \u{0670}) and tatweel (\u{0640})
/// - Normalizes Alef variants ([أإآٱ] -> ا)
/// - Normalizes Alef Maksura (ى -> ي)
/// - Normalizes Teh Marbuta (ة -> ه)
fn normalize_arabic(input: &str) -> String {
    let mut out = String::with_capacity(input.len());
    let mut prev_space = true;

    for ch in input.chars() {
        let code = ch as u32;
        // Strip Arabic diacritics (Fathatan..Wavy Hamza Below) + superscript Alef + Tatweel
        if (0x064B..=0x065F).contains(&code) || code == 0x0670 || code == 0x0640 {
            continue;
        }
        let mapped = match ch {
            'أ' | 'إ' | 'آ' | 'ٱ' => 'ا',
            'ى' => 'ي',
            'ة' => 'ه',
            c if c.is_whitespace() => {
                if !prev_space {
                    out.push(' ');
                    prev_space = true;
                }
                continue;
            }
            c => c,
        };
        out.push(mapped);
        prev_space = false;
    }

    out.trim().to_string()
}

/// Strips inline WebVTT/SRT formatting tags like `<c>`, `<i>`, `</b>`, `<00:01:02.000>`.
fn strip_cue_tags(input: &str) -> String {
    let mut out = String::with_capacity(input.len());
    let mut in_tag = false;
    for ch in input.chars() {
        match ch {
            '<' => in_tag = true,
            '>' => in_tag = false,
            _ if !in_tag => out.push(ch),
            _ => {}
        }
    }
    out.split_whitespace().collect::<Vec<_>>().join(" ")
}

/// Parses a single timestamp (`HH:MM:SS.mmm`, `HH:MM:SS,mmm`, `MM:SS.mmm`, or `MM:SS`) into whole seconds.
fn parse_timestamp_sec(raw: &str) -> Option<u32> {
    let token = raw.trim().split_whitespace().next()?;
    let main_part = token.split(['.', ',']).next()?;
    let parts: Vec<&str> = main_part.split(':').collect();
    match parts.len() {
        3 => {
            let h: u32 = parts[0].parse().ok()?;
            let m: u32 = parts[1].parse().ok()?;
            let s: u32 = parts[2].parse().ok()?;
            Some(h.saturating_mul(3600).saturating_add(m.saturating_mul(60)).saturating_add(s))
        }
        2 => {
            let m: u32 = parts[0].parse().ok()?;
            let s: u32 = parts[1].parse().ok()?;
            Some(m.saturating_mul(60).saturating_add(s))
        }
        _ => None,
    }
}

fn parse_timing_line(line: &str) -> Option<(u32, u32)> {
    let (left, right) = line.split_once("-->")?;
    let start = parse_timestamp_sec(left)?;
    let end = parse_timestamp_sec(right)?;
    Some((start, end.max(start)))
}

fn parse_transcript(raw: &str) -> Vec<TranscriptSegment> {
    let normalized_newlines = raw.trim_start_matches('\u{FEFF}').replace("\r\n", "\n").replace('\r', "\n");
    let lines: Vec<&str> = normalized_newlines.lines().collect();

    let mut segments: Vec<TranscriptSegment> = Vec::new();
    let mut i = 0;

    while i < lines.len() {
        let trimmed = lines[i].trim();

        // Skip blank lines and VTT headers/metadata blocks
        if trimmed.is_empty() || trimmed.starts_with("WEBVTT") {
            i += 1;
            continue;
        }
        if trimmed.starts_with("NOTE") || trimmed.starts_with("STYLE") || trimmed.starts_with("REGION") {
            i += 1;
            while i < lines.len() && !lines[i].trim().is_empty() {
                i += 1;
            }
            continue;
        }

        // Either this line is a timing line, or an optional cue index/id followed by a timing line
        let timing = if let Some(t) = parse_timing_line(trimmed) {
            i += 1;
            Some(t)
        } else if i + 1 < lines.len() {
            if let Some(t) = parse_timing_line(lines[i + 1].trim()) {
                i += 2;
                Some(t)
            } else {
                i += 1;
                None
            }
        } else {
            i += 1;
            None
        };

        let Some((start_sec, end_sec)) = timing else {
            continue;
        };

        let mut text_lines: Vec<&str> = Vec::new();
        while i < lines.len() && !lines[i].trim().is_empty() {
            // Stop if next cue starts without a blank line
            if lines[i].contains("-->") {
                break;
            }
            text_lines.push(lines[i].trim());
            i += 1;
        }

        let joined = text_lines.join(" ");
        let cleaned = strip_cue_tags(&joined);
        if cleaned.is_empty() {
            continue;
        }

        let text_normalized = normalize_arabic(&cleaned);
        let seq_index = segments.len();
        segments.push(TranscriptSegment {
            seq_index,
            start_sec,
            end_sec,
            text_ar: cleaned,
            text_normalized,
        });
    }

    segments
}

// ============================================================================
// Unit Tests
// ============================================================================

#[cfg(test)]
mod tests {
    use super::*;

    fn build_sample_pdf() -> Vec<u8> {
        let mut doc = Document::with_version("1.5");
        let pages_id = doc.new_object_id();
        let font_id = doc.add_object(dictionary! {
            "Type" => "Font",
            "Subtype" => "Type1",
            "BaseFont" => "Helvetica",
        });
        let resources_id = doc.add_object(dictionary! {
            "Font" => dictionary! {
                "F1" => font_id,
            },
        });
        let content = Stream::new(
            dictionary! {},
            b"BT /F1 18 Tf 72 720 Td (SujetStore Sample Exam) Tj ET".to_vec(),
        );
        let content_id = doc.add_object(content);
        let page_id = doc.add_object(dictionary! {
            "Type" => "Page",
            "Parent" => pages_id,
            "MediaBox" => vec![0.into(), 0.into(), 595.into(), 842.into()],
            "Resources" => resources_id,
            "Contents" => content_id,
        });
        let pages = dictionary! {
            "Type" => "Pages",
            "Kids" => vec![page_id.into()],
            "Count" => 1,
        };
        doc.objects.insert(pages_id, Object::Dictionary(pages));
        let catalog_id = doc.add_object(dictionary! {
            "Type" => "Catalog",
            "Pages" => pages_id,
        });
        doc.trailer.set("Root", catalog_id);

        let mut bytes = Vec::new();
        doc.save_to(&mut bytes).expect("sample PDF save failed");
        bytes
    }

    #[test]
    fn test_watermark_sample_pdf_preserves_validity_and_injects_metadata() {
        let sample = build_sample_pdf();
        assert!(sample.starts_with(b"%PDF-"));

        let watermark_text = "SujetStore Pro | user#22 | 2026-11-21";
        let owner_hash = "sha256:abcdef123456";

        let out = watermark_pdf_bytes(&sample, watermark_text, Some(owner_hash))
            .expect("watermarking failed");

        assert!(out.starts_with(b"%PDF-"), "Output must start with %PDF-");
        assert!(out.len() > sample.len(), "Watermarked PDF should include overlay");

        // Reload with lopdf to guarantee structural validity
        let reloaded = Document::load_mem(&out).expect("Watermarked PDF must reload cleanly");
        assert_eq!(reloaded.get_pages().len(), 1);

        // Verify Info dictionary metadata
        let info_ref = reloaded
            .trailer
            .get(b"Info")
            .expect("Info dict should exist")
            .as_reference()
            .expect("Info should be indirect reference");
        let info_dict = reloaded
            .get_dictionary(info_ref)
            .expect("Info dict should resolve");
        let owner_obj = info_dict
            .get(b"SujetStoreOwner")
            .expect("SujetStoreOwner metadata must exist");
        assert_eq!(owner_obj.as_str().unwrap(), owner_hash.as_bytes());

        // Verify page content stream contains watermark text
        let page_id = *reloaded.get_pages().values().next().unwrap();
        let page_content = reloaded
            .get_page_content(page_id)
            .expect("Page content should decode");
        let content_str = String::from_utf8_lossy(&page_content);
        assert!(
            content_str.contains("SujetStore Pro | user#22 | 2026-11-21"),
            "Page content stream should contain watermark text: {content_str}"
        );
        assert!(
            content_str.contains("SujetStore Sample Exam"),
            "Original page content must remain intact"
        );
    }

    #[test]
    fn test_parse_vtt_and_srt_with_arabic_normalization() {
        let vtt = "WEBVTT\n\nNOTE intro comment\n\n00:00:01.250 --> 00:00:05.500\n<b>السَّلَامُ</b> عَلَيْكُمْ وَرَحْمَةُ اللهِ\n\n01:02 --> 01:10\nأَحْمَدُ وَإِبْرَاهِيمُ فِي المَدْرَسَةِ — مُلَخَّصٌ عَامٌّ عَلَى القَاعِدَةِ\n";
        let segs = parse_transcript(vtt);
        assert_eq!(segs.len(), 2);

        assert_eq!(segs[0].seq_index, 0);
        assert_eq!(segs[0].start_sec, 1);
        assert_eq!(segs[0].end_sec, 5);
        assert_eq!(segs[0].text_ar, "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ");
        assert_eq!(segs[0].text_normalized, "السلام عليكم ورحمه الله");

        assert_eq!(segs[1].seq_index, 1);
        assert_eq!(segs[1].start_sec, 62);
        assert_eq!(segs[1].end_sec, 70);
        assert!(segs[1].text_normalized.contains("احمد وابراهيم"));
        assert!(segs[1].text_normalized.contains("علي القاعده"));

        let srt = "1\r\n00:01:05,000 --> 00:01:12,500\r\nالـدَّرْسُ الأَوَّلُ\r\nفي الرِّيَاضِيَّاتِ\r\n";
        let srt_segs = parse_transcript(srt);
        assert_eq!(srt_segs.len(), 1);
        assert_eq!(srt_segs[0].start_sec, 65);
        assert_eq!(srt_segs[0].end_sec, 72);
        assert_eq!(srt_segs[0].text_normalized, "الدرس الاول في الرياضيات");
    }

    #[test]
    fn test_constant_time_secret_check() {
        assert!(constant_time_eq(b"secret123", b"secret123"));
        assert!(!constant_time_eq(b"secret123", b"secret124"));
        assert!(!constant_time_eq(b"short", b"longer"));
    }
}
