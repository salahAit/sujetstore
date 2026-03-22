// official-template — القالب الرئيسي لمنصة سوجيستور
// مُستخرج من exam_1/template_logic.typ ومُكيّف مع SujetBuilder

#import "exercises.typ": render-block

#let official-template(data, is-solution: false) = {
  let metadata = data.at("metadata", default: (:))
  let doc-type = metadata.at("docType", default: metadata.at("exam_type", default: "test"))
  let exam-type-label = if doc-type == "exam" { "اختبار" } else { "فرض" }

  // ─────── إعداد الصفحة ───────
  set page(
    paper: "a4",
    margin: (top: 0.8cm, bottom: 2.0cm, x: 1.5cm),
    footer: context [
      #set text(size: 9pt, font: "KFGQPC Uthman Taha Naskh")
      #line(length: 100%, stroke: 0.5pt + gray)
      #v(-5pt)
      #grid(
        columns: (1fr, 1fr, 1fr),
        align: horizon,
        align(right)[#box(width: 25pt, height: 25pt, stroke: none, inset: 0pt)[#image("qrcode.png", width: 100%, height: 100%, fit: "contain")]],
        align(center)[#text(font: "KFGQPC Uthman Taha Naskh", size: 10pt)[صفحة #counter(page).display() من #counter(page).final().at(0)]],
        align(left)[#stack(dir: ltr, spacing: 5pt,
          link("https://sujetstore.com/")[#box(width: 25pt, height: 25pt, stroke: none, inset: 0pt)[#image("logo.png", width: 100%, height: 100%, fit: "contain")]],
          align(horizon)[#text(fill: blue, size: 9pt)[#link("https://sujetstore.com/")[sujetstore.com]]]
        )]
      )
    ],
  )

  set text(font: "KFGQPC Uthman Taha Naskh", lang: "ar", region: "dz", dir: rtl, size: 16pt, weight: "regular")
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
    #text(font: "KFGQPC Uthman Taha Naskh", size: 18pt, weight: "bold")[منصة ]#text(font: "KFGQPC Uthman Taha Naskh", size: 22pt, weight: "bold", fill: rgb("2563EB"))[سوجيستور]#text(font: "KFGQPC Uthman Taha Naskh", size: 18pt, weight: "bold")[ للنجاح]
  ]
  v(-8pt)

  // ═══════════ الشبكة: معلومات + اللوجو الكبير ═══════════
  grid(columns: (1fr, auto, 1fr), column-gutter: 5pt, align: horizon,
    // ── اليمين: نوع الموضوع + الفصل + المستوى ──
    align(right)[#set par(leading: 0.4em)
      #text(font: "KFGQPC Uthman Taha Naskh", size: 12pt, weight: "bold")[#exam-type-label #metadata.at("trimesterName", default: "")]
      \
      #text(font: "KFGQPC Uthman Taha Naskh", size: 12pt, weight: "bold")[#metadata.at("yearName", default: metadata.at("branch", default: ""))]
    ],
    // ── الوسط: اللوجو الكبير ──
    align(center)[#link("https://sujetstore.com/")[#image("logo.png", width: 1.8cm, fit: "contain")]],
    // ── اليسار: السنة الدراسية + المدة ──
    align(left)[#set par(leading: 0.4em)
      #text(font: "KFGQPC Uthman Taha Naskh", size: 12pt, weight: "bold")[#metadata.at("academicYear", default: metadata.at("date", default: ""))]
      \
      #text(font: "KFGQPC Uthman Taha Naskh", size: 12pt, weight: "bold")[المدة: #metadata.at("duration", default: "")]
    ],
  )
  v(-10pt)

  // ═══════════ شريط العنوان ═══════════
  {
    let subject-label = metadata.at("subjectName", default: metadata.at("subject", default: ""))
    let solution-suffix = if is-solution { " - الإجابة النموذجية" } else { "" }

    align(center)[
      #line(length: 100%, stroke: 1pt)
      #v(-7pt)
      #text(font: "KFGQPC Uthman Taha Naskh", size: 16pt, weight: "bold", fill: rgb("2563EB"))[#exam-type-label في مادة: #subject-label #solution-suffix]
      #v(-7pt)
      #line(length: 100%, stroke: 1pt)
    ]
  }
  v(1pt)

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
    v(2pt)
    block(breakable: true, width: 100%)[
      #grid(
        columns: (auto, 1fr),
        gutter: 10pt,
        align: horizon,
        text(size: 22pt, fill: if is-solution { green } else { blue })[▪],
        text(font: "KFGQPC Uthman Taha Naskh", weight: "bold", size: 17pt)[#eval("التمرين " + ex.at("num", default: ordinals.at(idx, default: str(idx + 1))) + " : (" + str(ex.at("points", default: "0")) + " نقاط)", mode: "markup")],
      )
      #v(2pt)
      
      #block(width: 100%, inset: (right: 15pt))[
        #if ex.keys().contains("instruction") and ex.instruction != "" [
          #text(style: "italic", size: 13pt)[#eval(ex.instruction, mode: "markup")]
          #v(2pt)
        ]
        
        // Support both "blocks" and "content" key names
        #let blocks = ex.at("blocks", default: ex.at("content", default: ()))
        #for b in blocks [
          #render-block(b, is-solution)
          #v(2pt)
        ]
      ]
    ]
  }
  v(1fr)
  align(center)[#text(weight: "bold")[#("انتهى الموضوع")]]
}
