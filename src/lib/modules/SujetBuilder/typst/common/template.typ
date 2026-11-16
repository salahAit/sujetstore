// official-template — القالب الرئيسي لمنصة سوجيستور
// مُستخرج من exam_1/template_logic.typ ومُكيّف مع SujetBuilder

#import "exercises.typ": render-block

#let official-template(data, is-solution: false) = {
  let metadata = data.at("metadata", default: (:))
  let doc-type = metadata.at("docType", default: metadata.at("exam_type", default: "test"))
  let level-id = metadata.at("levelId", default: "moyen")
  let year-id = metadata.at("yearId", default: "2am")
  let custom-doc-title = metadata.at("customDocTitle", default: "")

  let exam-type-label = if level-id == "primaire" {
    if doc-type == "exam" { "اختبار" } else { "تقويم مرحلي" }
  } else {
    if doc-type == "exam" { "اختبار" } else { "فرض محروس" }
  }

  let explicit-font = metadata.at("font", default: "")
  let main-font = if explicit-font != "" {
    (explicit-font, "Scheherazade", "Noto Naskh Arabic")
  } else if year-id == "1ap" or year-id == "2ap" {
    ("Arabic Transparent", "Scheherazade", "Scheherazade New", "Noto Naskh Arabic")
  } else if year-id == "3ap" or year-id == "4ap" or year-id == "5ap" {
    ("Arabic Transparent", "Noto Naskh Arabic", "Scheherazade", "Scheherazade New")
  } else {
    ("Traditional Arabic", "Amiri", "KFGQPC Uthman Taha Naskh", "Noto Naskh Arabic")
  }

  let body-size = if year-id == "1ap" {
    17pt
  } else if year-id == "2ap" {
    15.5pt
  } else if year-id == "3ap" {
    14.5pt
  } else if year-id == "4ap" or year-id == "5ap" {
    13.5pt
  } else {
    12.5pt
  }

  let heading-size = if year-id == "1ap" {
    18.5pt
  } else if year-id == "2ap" {
    17.5pt
  } else if year-id == "3ap" {
    16.5pt
  } else if year-id == "4ap" or year-id == "5ap" {
    15.5pt
  } else {
    14.5pt
  }

  let instr-size = if year-id == "1ap" {
    15pt
  } else if year-id == "2ap" {
    14pt
  } else if year-id == "3ap" {
    13.5pt
  } else if year-id == "4ap" or year-id == "5ap" {
    12.5pt
  } else {
    12pt
  }

  let body-leading = if year-id == "1ap" {
    1.15em
  } else if year-id == "2ap" {
    1.05em
  } else if year-id == "3ap" {
    0.95em
  } else if year-id == "4ap" or year-id == "5ap" {
    0.85em
  } else {
    0.78em
  }

  let table-inset = if year-id == "1ap" {
    11pt
  } else if year-id == "2ap" {
    10pt
  } else if year-id == "3ap" {
    9pt
  } else if year-id == "4ap" or year-id == "5ap" {
    8pt
  } else {
    7pt
  }

  let show-pupil-box = year-id == "1ap" or year-id == "2ap" or year-id == "3ap"

  // ─────── إعداد الصفحة ───────
  set page(
    paper: "a4",
    margin: (top: 0.8cm, bottom: 2.0cm, x: 1.5cm),
    footer: context [
      #set text(size: 9pt, font: main-font)
      #line(length: 100%, stroke: 0.5pt + gray)
      #v(-5pt)
      #grid(
        columns: (1fr, 1fr, 1fr),
        align: horizon,
        align(right)[#box(width: 25pt, height: 25pt, stroke: none, inset: 0pt)[#image("qrcode.png", width: 100%, height: 100%, fit: "contain")]],
        align(center)[#text(font: main-font, size: 10pt)[صفحة #counter(page).display() من #counter(page).final().at(0)]],
        align(left)[#stack(dir: ltr, spacing: 5pt,
          link("https://sujetstore.com/")[#box(width: 25pt, height: 25pt, stroke: none, inset: 0pt)[#image("logo.png", width: 100%, height: 100%, fit: "contain")]],
          align(horizon)[#text(fill: blue, size: 9pt)[#link("https://sujetstore.com/")[sujetstore.com]]]
        )]
      )
    ],
  )

  set text(font: main-font, lang: "ar", region: "dz", dir: rtl, size: body-size, weight: "regular")
  set par(leading: body-leading)
  show math.equation: set text(font: "New Computer Modern Math", dir: ltr)

  // ═══════════ العناصر العائمة (أعلى الصفحة) ═══════════
  place(top + left, dx: 0pt, dy: -5pt)[#stack(dir: ttb, spacing: 1pt,
    text(size: 9pt, fill: blue)[#link("https://sujetstore.com/")[https://sujetstore.com]],
    text(size: 7pt, fill: luma(80))[تطوير جزائري حصري و عصري]
  )]
  place(top + right, dx: 0pt, dy: -5pt)[#stack(dir: ttb, spacing: 1pt,
    box(width: 35pt, height: 35pt, stroke: 0.5pt + gray, radius: 2pt, inset: 2pt)[#image("qrcode.png")],
    align(center)[#text(size: 7pt)[امسح للمزيد]]
  )]

  // ═══════════ العنوان المركزي ═══════════
  v(2pt)
  align(center)[
    #text(font: main-font, size: 18pt, weight: "bold")[منصة ]#text(font: main-font, size: 22pt, weight: "bold", fill: rgb("2563EB"))[سوجيستور]#text(font: main-font, size: 18pt, weight: "bold")[ للنجاح]
  ]
  v(-8pt)

  // ═══════════ الشبكة: معلومات + اللوجو الكبير ═══════════
  grid(columns: (1fr, auto, 1fr), column-gutter: 5pt, align: horizon,
    // ── اليمين: نوع الموضوع + الفصل + المستوى ──
    align(right)[#set par(leading: 0.4em)
      #text(font: main-font, size: 12pt, weight: "bold")[#exam-type-label #metadata.at("trimesterName", default: "")]
      \
      #text(font: main-font, size: 12pt, weight: "bold")[#metadata.at("yearName", default: metadata.at("branch", default: ""))]
    ],
    // ── الوسط: اللوجو الكبير ──
    align(center)[#link("https://sujetstore.com/")[#image("logo.png", width: 1.8cm, fit: "contain")]],
    // ── اليسار: السنة الدراسية + المدة ──
    align(left)[#set par(leading: 0.4em)
      #text(font: main-font, size: 12pt, weight: "bold")[#metadata.at("academicYear", default: metadata.at("date", default: ""))]
      \
      #text(font: main-font, size: 12pt, weight: "bold")[المدة: #metadata.at("duration", default: "")]
    ],
  )
  v(-10pt)

  // ═══════════ شريط العنوان ═══════════
  {
    let subject-label = metadata.at("subjectName", default: metadata.at("subject", default: ""))
    let solution-suffix = if is-solution { " - الإجابة النموذجية" } else { "" }
    let banner-prefix = if custom-doc-title != "" { custom-doc-title } else { exam-type-label }

    align(center)[
      #line(length: 100%, stroke: 1pt)
      #v(-7pt)
      #text(font: main-font, size: 16pt, weight: "bold", fill: rgb("2563EB"))[#banner-prefix في مادة: #subject-label #solution-suffix]
      #v(-7pt)
      #line(length: 100%, stroke: 1pt)
    ]
  }
  v(2pt)

  // ── خانة التلميذ (للأطوار الدنيا من الابتدائي في ورقة الموضوع) ──
  if show-pupil-box and not is-solution {
    box(width: 100%, stroke: 0.8pt + luma(140), radius: 5pt, inset: (x: 10pt, y: 7pt), fill: luma(250))[
      #grid(
        columns: (1.7fr, 1fr, 0.9fr),
        gutter: 8pt,
        align: right + horizon,
        [#text(font: main-font, size: 12pt, weight: "bold")[الاسم واللقب: ...............................]],
        [#text(font: main-font, size: 12pt, weight: "bold")[القسم: ..............]],
        [#text(font: main-font, size: 12pt, weight: "bold")[العلامة: ....... / 10]]
      )
    ]
    v(4pt)
  }

  // ─────── التمارين ───────
  // Support both new format (data.exercises) and legacy format (data.topics.exercises)
  let exercises = if data.keys().contains("exercises") {
    data.exercises
  } else if data.keys().contains("topics") {
    data.topics.at(0).exercises
  } else {
    ()
  }

  let ordinals = ("الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن")

  for (idx, ex) in exercises.enumerate() {
    let custom-title = ex.at("customTitle", default: none)
    let heading-text = if custom-title != none and custom-title != "" {
      custom-title + " : (" + str(ex.at("points", default: "0")) + " نقاط)"
    } else {
      "التمرين " + ex.at("num", default: ordinals.at(idx, default: str(idx + 1))) + " : (" + str(ex.at("points", default: "0")) + " نقاط)"
    }
    v(3pt)
    block(breakable: true, width: 100%)[
      #grid(
        columns: (auto, 1fr),
        gutter: 10pt,
        align: horizon,
        text(size: heading-size + 4pt, fill: if is-solution { green } else { blue })[▪],
        text(font: main-font, weight: "bold", size: heading-size)[#eval(heading-text, mode: "markup")],
      )
      #v(2pt)
      
      #block(width: 100%, inset: (right: 15pt))[
        #if ex.keys().contains("instruction") and ex.instruction != "" [
          #text(font: main-font, weight: "bold", size: instr-size)[#eval(ex.instruction, mode: "markup")]
          #v(3pt)
        ]
        
        // Support both "blocks" and "content" key names
        #let blocks = ex.at("blocks", default: ex.at("content", default: ()))
        #for b in blocks [
          #render-block(b, is-solution, body-size: body-size, table-inset: table-inset)
          #v(3pt)
        ]
      ]
    ]
  }
  v(1fr)
  align(center)[#text(font: main-font, size: body-size, weight: "bold")[#("انتهى الموضوع")]]
}
