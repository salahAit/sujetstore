// bac_official.typ — القالب الرسمي لامتحان شهادة البكالوريا (الديوان الوطني للامتحانات والمسابقات ONEC)
// يدعم وضعَي الموضوع الرسمي والإجابة النموذجية وسلم التنقيط

#import "../../common/exercises.typ": render-block

#let bac-official-template(data, is-solution: false) = {
  let metadata = data.at("metadata", default: (:))
  let year-name = metadata.at("yearName", default: "السنة الثالثة ثانوي")
  let stream-name = metadata.at("streamName", default: "علوم تجريبية")
  let subject-name = metadata.at("subjectName", default: "الرياضيات")
  let duration = metadata.at("duration", default: "03 ساعات و30 دقيقة")
  let coefficient = metadata.at("coefficient", default: 5)
  let academic-year = metadata.at("academicYear", default: "2024")
  let session-ar = metadata.at("examSessionAr", default: "دورة جوان " + str(academic-year))
  let custom-doc-title = metadata.at("customDocTitle", default: "")
  let topic-num = metadata.at("topicNumber", default: 1)
  let source-kind = metadata.at("docType", default: "exam")

  let explicit-font = metadata.at("font", default: "")
  let banned-arabic-fonts = ("", "Noto Naskh Arabic", "Amiri", "Traditional Arabic", "Scheherazade New", "Scheherazade", "KFGQPC Uthman Taha Naskh")
  let main-font = if explicit-font not in banned-arabic-fonts {
    (explicit-font, "Arabic Transparent", "STIX Two Math")
  } else {
    ("Arabic Transparent", "STIX Two Math")
  }

  let body-size = 14pt
  let table-inset = 6.5pt

  let is-official-archive = custom-doc-title.contains("بكالوريا") and not custom-doc-title.contains("تجريبية")
  let exam-banner = if custom-doc-title != "" {
    custom-doc-title
  } else if is-official-archive {
    "امتحان بكالوريا التعليم الثانوي"
  } else {
    "بكالوريا تجريبية للتعليم الثانوي"
  }

  let topic-label = if topic-num == 2 { "الموضوع الثاني" } else { "الموضوع الأول" }

  set page(
    paper: "a4",
    margin: (top: 1.0cm, bottom: 1.8cm, x: 1.4cm),
    footer: context [
      #set text(size: 10pt, font: main-font)
      #line(length: 100%, stroke: 0.6pt + luma(120))
      #v(-4pt)
      #grid(
        columns: (1fr, 1fr, 1fr),
        align: horizon,
        align(right)[#text(size: 10pt, weight: "bold")[#stream-name — المعامل: #coefficient]],
        align(center)[#text(size: 10.5pt, weight: "bold")[صفحة #counter(page).display() من #counter(page).final().at(0)]],
        align(left)[#link("https://sujetstore.com/")[#text(size: 10pt, fill: rgb("1E3A8A"))[sujetstore.com]]]
      )
    ],
  )

  set text(font: main-font, lang: "ar", region: "dz", dir: rtl, size: body-size, weight: "regular", top-edge: "ascender", bottom-edge: "descender")
  set par(leading: 0.72em, justify: true)
  show math.equation: set text(font: ("STIX Two Math", "Arabic Transparent"), dir: ltr)

  // ═══════════ الترويسة الجزائرية لمنصة SujetStore ═══════════
  align(center)[
    #text(font: main-font, size: 14.5pt, weight: "bold")[الجمهورية الجزائرية الديمقراطية الشعبية] \
    #text(font: main-font, size: 12pt, weight: "bold", fill: rgb("1E3A8A"))[منصة SujetStore التعليمية]
  ]
  v(4pt)

  box(
    width: 100%,
    stroke: 1.1pt + black,
    radius: 2pt,
    inset: (x: 12pt, y: 11pt),
    fill: luma(248)
  )[
    #set text(top-edge: "ascender", bottom-edge: "descender")
    #set par(leading: 0.65em, justify: false)
    #grid(
      columns: (1.35fr, auto, 0.95fr),
      column-gutter: 10pt,
      align: horizon,
      align(right)[
        #text(font: main-font, weight: "bold", size: 13pt)[#exam-banner] \
        #text(font: main-font, size: 12.5pt)[الشعبة: #text(font: main-font, weight: "bold")[#stream-name]]
      ],
      align(center)[
        #box(stroke: 0.8pt + luma(90), inset: (x: 12pt, y: 8pt), radius: 2pt, fill: white)[
          #set text(top-edge: "bounds", bottom-edge: "bounds")
          #text(font: main-font, weight: "bold", size: 13pt)[#session-ar]
        ]
      ],
      align(left)[
        #text(font: main-font, size: 12.5pt)[المدة: #text(font: main-font, weight: "bold")[#duration]] \
        #text(font: main-font, size: 12.5pt)[المعامل: #text(font: main-font, weight: "bold")[#coefficient]]
      ]
    )
  ]
  v(5pt)

  // شريط عنوان الاختبار / الحل النموذجي
  box(
    width: 100%,
    stroke: (top: 1.2pt + black, bottom: 1.2pt + black),
    inset: (y: 10pt, x: 12pt),
    fill: if is-solution { rgb("EFF6FF") } else { luma(240) }
  )[
    #set text(top-edge: "bounds", bottom-edge: "bounds")
    #grid(
      columns: (1fr, auto),
      column-gutter: 8pt,
      align: horizon,
      align(center)[
        #text(weight: "bold", size: 16pt, fill: if is-solution { rgb("1D4ED8") } else { black })[
          اختبار في مادة: #subject-name #(if is-solution { "— الإجابة النموذجية وسلم التنقيط" } else { "" })
        ]
      ],
      align(left)[
        #if not is-solution [
          #text(size: 12pt, weight: "bold")[#topic-label]
        ] else [
          #text(size: 12pt, weight: "bold", fill: rgb("B91C1C"))[المجموع: 20 نقطة]
        ]
      ]
    )
  ]
  v(4pt)

  if not is-solution [
    #align(center)[
      #text(size: 11.5pt, style: "italic", fill: luma(60))[
        #(if str(metadata.at("subjectId", default: "")).starts-with("ARB") {
          "على المترشح أن يختار أحد الموضوعين الآتيين — تُراعى سلامة اللغة ودقّة المنهجية"
        } else if str(metadata.at("subjectId", default: "")).starts-with("ISL") {
          "على المترشح أن يختار أحد الموضوعين الآتيين — يُراعى الترتيب والدّقة الشرعية وسلامة اللغة"
        } else {
          "على المترشح أن يختار أحد الموضوعين الآتيين — التوثيق العلمي والبرهان الصريح ضروريان"
        })
      ]
    ]
    #v(3pt)
  ]

  // ═══════════ التمارين (4 + 4 + 5 + 7) ═══════════
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
      #box(
        width: 100%,
        inset: (x: 8pt, y: 8pt),
        fill: if is-solution { rgb("F0FDF4") } else { luma(244) },
        stroke: (right: 3pt + if is-solution { rgb("15803D") } else { rgb("1E3A8A") }),
      )[
        #set text(top-edge: "bounds", bottom-edge: "bounds")
        #text(font: main-font, weight: "bold", size: 15.5pt)[#eval(heading-text, mode: "markup")]
      ]
      #v(3pt)

      #block(width: 100%, inset: (right: 10pt))[
        #if ex.keys().contains("instruction") and ex.instruction != "" [
          #text(font: main-font, weight: "bold", size: 14pt)[#eval(ex.instruction, mode: "markup")]
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
  align(center)[
    #line(length: 40%, stroke: 0.7pt + luma(140))
    #v(2pt)
    #text(font: main-font, size: 11pt, weight: "bold")[انتهى #topic-label — بالتوفيق]
  ]
}
