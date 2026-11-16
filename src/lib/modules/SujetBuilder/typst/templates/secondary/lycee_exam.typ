// lycee_exam.typ — قالب فروض واختبارات الطور الثانوي (1AS - 2AS - 3AS الشعب العلمية)
// يُبرز اسم المؤسسة، الشعبة، المعامل، المدة، وبنية التمارين + المسألة الشاملة

#import "../../common/exercises.typ": render-block

#let lycee-exam-template(data, is-solution: false) = {
  let metadata = data.at("metadata", default: (:))
  let doc-type = metadata.at("docType", default: "exam")
  let year-name = metadata.at("yearName", default: "السنة الثانوية")
  let stream-name = metadata.at("streamName", default: "")
  let subject-name = metadata.at("subjectName", default: "الرياضيات")
  let trimester-name = metadata.at("trimesterName", default: "الفصل الأول")
  let duration = metadata.at("duration", default: "02 ساعة")
  let coefficient = metadata.at("coefficient", default: 5)
  let academic-year = metadata.at("academicYear", default: "2025 / 2026")
  let school-name = metadata.at("schoolName", default: "ثانوية جزائرية نموذجية — منصة SujetStore")
  let custom-doc-title = metadata.at("customDocTitle", default: "")

  let explicit-font = metadata.at("font", default: "")
  let main-font = if explicit-font != "" {
    (explicit-font, "Amiri", "Noto Naskh Arabic")
  } else {
    ("Amiri", "Noto Naskh Arabic", "Scheherazade")
  }

  let body-size = 11.5pt
  let table-inset = 6pt
  let type-label = if doc-type == "test" { "فرض محروس" } else { "اختبار" }
  let banner-title = if custom-doc-title != "" { custom-doc-title } else { type-label + " " + trimester-name }

  set page(
    paper: "a4",
    margin: (top: 0.9cm, bottom: 1.9cm, x: 1.4cm),
    footer: context [
      #set text(size: 9pt, font: main-font)
      #line(length: 100%, stroke: 0.5pt + gray)
      #v(-4pt)
      #grid(
        columns: (1fr, 1fr, 1fr),
        align: horizon,
        align(right)[#box(width: 22pt, height: 22pt)[#image("../../common/qrcode.png", width: 100%, height: 100%, fit: "contain")]],
        align(center)[#text(size: 9.5pt)[صفحة #counter(page).display() من #counter(page).final().at(0)]],
        align(left)[#stack(dir: ltr, spacing: 4pt,
          link("https://sujetstore.com/")[#box(width: 22pt, height: 22pt)[#image("../../common/logo.png", width: 100%, height: 100%, fit: "contain")]],
          align(horizon)[#text(fill: rgb("1D4ED8"), size: 8.5pt)[sujetstore.com]]
        )]
      )
    ],
  )

  set text(font: main-font, lang: "ar", region: "dz", dir: rtl, size: body-size, weight: "regular")
  set par(leading: 0.72em, justify: true)
  show math.equation: set text(font: "New Computer Modern Math", dir: ltr)

  // ═══════════ رأس الورقة الثانوية ═══════════
  grid(
    columns: (1.2fr, auto, 1.2fr),
    align: horizon,
    column-gutter: 8pt,
    align(right)[
      #text(size: 10pt, weight: "bold")[وزارة التربية الوطنية] \
      #text(size: 10pt)[#school-name] \
      #text(size: 10.5pt, weight: "bold")[#year-name #(if stream-name != "" { "— " + stream-name } else { "" })]
    ],
    align(center)[
      #link("https://sujetstore.com/")[#image("../../common/logo.png", width: 1.5cm, fit: "contain")]
    ],
    align(left)[
      #text(size: 10pt, weight: "bold")[السنة الدراسية: #academic-year] \
      #text(size: 10pt, weight: "bold")[المدة: #duration] \
      #text(size: 10pt, weight: "bold")[المعامل: #coefficient]
    ]
  )
  v(4pt)

  box(
    width: 100%,
    stroke: 1pt + rgb("1E3A8A"),
    radius: 4pt,
    inset: (y: 6pt, x: 10pt),
    fill: if is-solution { rgb("ECFDF5") } else { rgb("EFF6FF") }
  )[
    #align(center)[
      #text(font: main-font, size: 14.5pt, weight: "bold", fill: if is-solution { rgb("047857") } else { rgb("1E3A8A") })[
        #banner-title في مادة: #subject-name #(if is-solution { "— التصحيح النموذجي وسلم التنقيط" } else { "" })
      ]
    ]
  ]
  v(5pt)

  // ═══════════ التمارين والمسألة ═══════════
  let exercises = if data.keys().contains("exercises") {
    data.exercises
  } else if data.keys().contains("topics") {
    data.topics.at(0).exercises
  } else {
    ()
  }

  let ordinals = ("الأول", "الثاني", "الثالث", "الرابع", "الخامس")

  for (idx, ex) in exercises.enumerate() {
    let custom-title = ex.at("customTitle", default: none)
    let pts = ex.at("points", default: 0)
    let pts-str = if pts < 10 and type(pts) == int { "0" + str(pts) } else { str(pts) }
    let pts-word = if pts == 1 { "نقطة" } else if pts == 2 { "نقطتان" } else { "نقاط" }

    let heading-text = if custom-title != none and custom-title != "" {
      custom-title + " (" + pts-str + " " + pts-word + ")"
    } else {
      "التمرين " + ex.at("num", default: ordinals.at(idx, default: str(idx + 1))) + ": (" + pts-str + " " + pts-word + ")"
    }

    v(4pt)
    block(breakable: true, width: 100%)[
      #grid(
        columns: (auto, 1fr),
        gutter: 8pt,
        align: horizon,
        text(size: 16pt, fill: if is-solution { rgb("047857") } else { rgb("1D4ED8") })[◆],
        text(font: main-font, weight: "bold", size: 13pt)[#eval(heading-text, mode: "markup")]
      )
      #v(2pt)

      #block(width: 100%, inset: (right: 12pt))[
        #if ex.keys().contains("instruction") and ex.instruction != "" [
          #text(font: main-font, weight: "semibold", size: 11pt)[#eval(ex.instruction, mode: "markup")]
          #v(3pt)
        ]

        #let blocks = ex.at("blocks", default: ex.at("content", default: ()))
        #for b in blocks [
          #render-block(b, is-solution, body-size: body-size, table-inset: table-inset)
          #v(3pt)
        ]
      ]
    ]
  }

  v(1fr)
  align(center)[#text(font: main-font, size: body-size, weight: "bold")[انتهى الموضوع — بالتوفيق]]
}
