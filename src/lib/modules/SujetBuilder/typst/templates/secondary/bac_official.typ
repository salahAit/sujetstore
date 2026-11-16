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
  let main-font = if explicit-font != "" {
    (explicit-font, "Amiri", "Noto Naskh Arabic")
  } else {
    ("Amiri", "Noto Naskh Arabic", "Scheherazade")
  }

  let body-size = 11.5pt
  let table-inset = 6pt

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
      #set text(size: 9pt, font: main-font)
      #line(length: 100%, stroke: 0.6pt + luma(120))
      #v(-4pt)
      #grid(
        columns: (1fr, 1fr, 1fr),
        align: horizon,
        align(right)[#text(size: 8.5pt, weight: "bold")[#stream-name — المعامل: #coefficient]],
        align(center)[#text(size: 9.5pt, weight: "bold")[صفحة #counter(page).display() من #counter(page).final().at(0)]],
        align(left)[#link("https://sujetstore.com/")[#text(size: 8.5pt, fill: rgb("1E3A8A"))[sujetstore.com]]]
      )
    ],
  )

  set text(font: main-font, lang: "ar", region: "dz", dir: rtl, size: body-size, weight: "regular")
  set par(leading: 0.72em, justify: true)
  show math.equation: set text(font: "New Computer Modern Math", dir: ltr)

  // ═══════════ الترويسة الرسمية الجزائرية ═══════════
  align(center)[
    #text(size: 11.5pt, weight: "bold")[الجمهورية الجزائرية الديمقراطية الشعبية] \
    #text(size: 10.5pt, weight: "bold")[وزارة التربية الوطنية — الديوان الوطني للامتحانات والمسابقات]
  ]
  v(3pt)

  box(
    width: 100%,
    stroke: 1.1pt + black,
    radius: 2pt,
    inset: (x: 10pt, y: 7pt),
    fill: luma(248)
  )[
    #grid(
      columns: (1fr, auto, 1fr),
      align: horizon,
      align(right)[
        #text(weight: "bold", size: 11.5pt)[#exam-banner] \
        #text(size: 10.5pt)[الشعبة: #text(weight: "bold")[#stream-name]]
      ],
      align(center)[
        #box(stroke: 0.8pt + luma(90), inset: (x: 10pt, y: 4pt), radius: 2pt, fill: white)[
          #text(weight: "bold", size: 11pt)[#session-ar]
        ]
      ],
      align(left)[
        #text(size: 10.5pt)[المدة: #text(weight: "bold")[#duration]] \
        #text(size: 10.5pt)[المعامل: #text(weight: "bold")[#coefficient]]
      ]
    )
  ]
  v(4pt)

  // شريط عنوان الاختبار / الحل النموذجي
  box(
    width: 100%,
    stroke: (top: 1.2pt + black, bottom: 1.2pt + black),
    inset: (y: 5pt, x: 8pt),
    fill: if is-solution { rgb("EFF6FF") } else { luma(240) }
  )[
    #grid(
      columns: (1fr, auto),
      align: horizon,
      align(center)[
        #text(weight: "bold", size: 14pt, fill: if is-solution { rgb("1D4ED8") } else { black })[
          اختبار في مادة: #subject-name #(if is-solution { "— الإجابة النموذجية وسلم التنقيط" } else { "" })
        ]
      ],
      align(left)[
        #if not is-solution [
          #text(size: 9.5pt, weight: "bold")[#topic-label]
        ] else [
          #text(size: 9.5pt, weight: "bold", fill: rgb("B91C1C"))[المجموع: 20 نقطة]
        ]
      ]
    )
  ]
  v(4pt)

  if not is-solution [
    #align(center)[
      #text(size: 9.5pt, style: "italic", fill: luma(60))[
        على المترشح أن يختار أحد الموضوعين الآتيين — التوثيق العلمي والبرهان الصريح ضروريان
      ]
    ]
    v(3pt)
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
        inset: (x: 6pt, y: 4pt),
        fill: if is-solution { rgb("F0FDF4") } else { luma(244) },
        stroke: (right: 3pt + if is-solution { rgb("15803D") } else { rgb("1E3A8A") }),
      )[
        #text(font: main-font, weight: "bold", size: 12.5pt)[#eval(heading-text, mode: "markup")]
      ]
      #v(3pt)

      #block(width: 100%, inset: (right: 10pt))[
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
  align(center)[
    #line(length: 40%, stroke: 0.7pt + luma(140))
    #v(2pt)
    #text(font: main-font, size: 11pt, weight: "bold")[انتهى #topic-label — بالتوفيق]
  ]
}
