#!/usr/bin/env python3
"""Strict PDF technical verification and manifest builder for SujetStore math references."""

import argparse
import hashlib
import json
import os
import subprocess
import sys
from pathlib import Path
from pypdf import PdfReader

MIN_SIZE_BYTES = 20 * 1024
ROOT = Path(__file__).resolve().parent.parent
REFS_DIR = ROOT / "pipeline" / "references"
MANIFEST_PATH = REFS_DIR / "manifest.json"


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest()


def inspect_pdf(path: Path) -> dict:
    if not path.exists() or not path.is_file():
        return {"ok": False, "error": "file_missing"}
    size = path.stat().st_size
    if size <= MIN_SIZE_BYTES:
        return {"ok": False, "error": f"file_too_small ({size} bytes)"}

    with path.open("rb") as f:
        header = f.read(16)
    if not header.startswith(b"%PDF-"):
        return {"ok": False, "error": f"invalid_magic_bytes ({header[:12]!r})"}

    try:
        reader = PdfReader(str(path), strict=False)
        pages_count = len(reader.pages)
        if pages_count <= 0:
            return {"ok": False, "error": "zero_pages"}
        sample_pages = min(pages_count, 5)
        extracted_chars = 0
        for idx in range(sample_pages):
            try:
                txt = reader.pages[idx].extract_text() or ""
                extracted_chars += len("".join(txt.split()))
            except Exception:
                pass
    except Exception as exc:
        return {"ok": False, "error": f"pypdf_error: {exc}"}

    # Fallback check with pdftotext when pypdf sees little text (some Arabic CID fonts)
    if extracted_chars < 60:
        try:
            res = subprocess.run(
                ["pdftotext", "-f", "1", "-l", str(min(pages_count, 5)), str(path), "-"],
                capture_output=True,
                text=True,
                timeout=15,
            )
            if res.returncode == 0:
                alt_chars = len("".join(res.stdout.split()))
                if alt_chars > extracted_chars:
                    extracted_chars = alt_chars
        except Exception:
            pass

    extraction_mode = "digital_text" if extracted_chars >= 60 else "scanned_ocr"
    return {
        "ok": True,
        "size_bytes": size,
        "pages_count": pages_count,
        "extracted_sample_chars": extracted_chars,
        "extraction_mode": extraction_mode,
        "sha256": sha256_file(path),
    }


def merge_manifests() -> int:
    partial_files = sorted(REFS_DIR.glob("**/partial_manifest.json"))
    all_docs = []
    missing_refs = []
    seen_hashes = {}
    seen_ids = set()

    for pf in partial_files:
        try:
            data = json.loads(pf.read_text(encoding="utf-8"))
        except Exception as exc:
            print(f"[WARN] Failed reading {pf}: {exc}", file=sys.stderr)
            continue

        docs = data.get("documents", []) if isinstance(data, dict) else data
        if isinstance(data, dict):
            for m in data.get("missing_references", []):
                missing_refs.append(m)

        for doc in docs:
            rel_path = doc.get("local_path", "")
            abs_path = (ROOT / rel_path) if rel_path else None
            if not abs_path or not abs_path.exists():
                print(f"[PRUNE] Missing file for entry {doc.get('id')}: {rel_path}")
                continue
            info = inspect_pdf(abs_path)
            if not info["ok"]:
                print(f"[DELETE INVALID] {rel_path}: {info['error']}")
                abs_path.unlink(missing_ok=True)
                missing_refs.append({
                    "grade": doc.get("grade"),
                    "title_ar": doc.get("title_ar"),
                    "reason": info["error"],
                    "source_url": doc.get("source_url"),
                })
                continue

            digest = info["sha256"]
            if digest in seen_hashes:
                print(f"[DEDUP] Duplicate sha256 {rel_path} == {seen_hashes[digest]}")
                continue
            seen_hashes[digest] = rel_path

            doc_id = doc.get("id") or f"ref_{doc.get('grade')}_{len(all_docs) + 1}"
            while doc_id in seen_ids:
                doc_id = f"{doc_id}_{len(seen_ids) + 1}"
            seen_ids.add(doc_id)

            all_docs.append({
                "id": doc_id,
                "grade": doc.get("grade"),
                "title_ar": doc.get("title_ar"),
                "category": doc.get("category"),
                "year": str(doc.get("year") or "2024"),
                "generation": doc.get("generation", "gen2"),
                "local_path": rel_path,
                "source_url": doc.get("source_url"),
                "pages_count": info["pages_count"],
                "extraction_mode": info["extraction_mode"],
                "sha256": digest,
                "size_bytes": info["size_bytes"],
            })

    manifest = {
        "schema_version": "1.0",
        "total_verified": len(all_docs),
        "counts_by_grade": {
            g: sum(1 for d in all_docs if d["grade"] == g) for g in ("2ap", "5ap", "2am")
        },
        "documents": all_docs,
        "missing_references": missing_refs,
    }
    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({
        "total_verified": manifest["total_verified"],
        "counts_by_grade": manifest["counts_by_grade"],
        "missing_count": len(missing_refs),
    }, ensure_ascii=False))
    return 0


def verify_manifest() -> int:
    if not MANIFEST_PATH.exists():
        print(f"ERROR: {MANIFEST_PATH} not found", file=sys.stderr)
        return 1
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    docs = manifest.get("documents", [])
    if not docs:
        print("ERROR: manifest.documents is empty", file=sys.stderr)
        return 1
    failures = []
    for doc in docs:
        abs_path = ROOT / doc["local_path"]
        info = inspect_pdf(abs_path)
        if not info["ok"]:
            failures.append({"id": doc["id"], "path": doc["local_path"], "error": info["error"]})
        elif info["sha256"] != doc["sha256"]:
            failures.append({"id": doc["id"], "path": doc["local_path"], "error": "sha256_mismatch"})
        elif info["pages_count"] != doc["pages_count"]:
            failures.append({"id": doc["id"], "path": doc["local_path"], "error": "pages_count_mismatch"})
    print(json.dumps({
        "checked": len(docs),
        "passed": len(docs) - len(failures),
        "failures": failures,
    }, ensure_ascii=False, indent=2))
    return 1 if failures else 0


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", help="Inspect a single PDF file")
    parser.add_argument("--scan-dir", help="Inspect all PDFs in directory and delete invalid ones")
    parser.add_argument("--merge-manifests", action="store_true")
    parser.add_argument("--verify-manifest", action="store_true")
    args = parser.parse_args()

    if args.check:
        res = inspect_pdf(Path(args.check))
        print(json.dumps(res, ensure_ascii=False))
        return 0 if res["ok"] else 1
    if args.scan_dir:
        results = {}
        for p in sorted(Path(args.scan_dir).rglob("*.pdf")):
            info = inspect_pdf(p)
            if not info["ok"]:
                p.unlink(missing_ok=True)
            results[str(p)] = info
        print(json.dumps(results, ensure_ascii=False, indent=2))
        return 0
    if args.merge_manifests:
        return merge_manifests()
    if args.verify_manifest:
        return verify_manifest()
    parser.print_help()
    return 1


if __name__ == "__main__":
    sys.exit(main())
