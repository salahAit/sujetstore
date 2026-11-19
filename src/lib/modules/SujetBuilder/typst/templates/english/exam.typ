// templates/english/exam.typ — Dedicated LTR English Exam Template for SujetStore
// Supports Primary (3AP-5AP + Competency Eval), Middle (1AM-4AM BEM), Secondary (1AS-3AS), and BAC.
// Clean legal header: People's Democratic Republic of Algeria + SujetStore Educational Platform (NO Ministry / NO ONEC).

#let safe-eval-en(content, mode: "markup") = {
  if content == "" or content == none { return [] }
  let scope = (cm: 1cm, mm: 1mm, pt: 1pt, em: 1em)
  eval(content, mode: mode, scope: scope)
}

#let render-block-en(b, is-solution, body-size: 11.5pt, table-inset: 6pt) = {
  let m = b.at("mark", default: b.at("points", default: ""))
  let mark-badge = if is-solution and m != "" {
    align(bottom + right)[#text(size: calc.max(body-size - 0.5pt, 10pt), weight: "bold", fill: rgb("B91C1C"))[#m pts]]
  } else { [] }

  if b.type == "text" [
    #grid(
      columns: (1fr, auto),
      column-gutter: 8pt,
      [
        #(if is-solution and b.at("answer", default: "") != "" {
          text(size: body-size, fill: rgb("1D4ED8"))[#safe-eval-en(b.answer)]
        } else {
          text(size: body-size)[#safe-eval-en(b.content)]
        })
      ],
      mark-badge
    )
    #v(2pt)
  ] else if b.type == "true_false" [
    #for item in b.items [
      #grid(
        columns: (1fr, auto),
        column-gutter: 8pt,
        [
          - #safe-eval-en(item.q) #h(6pt) [#box(width: 48pt, align(center)[#(if is-solution { text(fill: rgb("1D4ED8"), weight: "bold")[#safe-eval-en(item.a)] } else { "........" })])] \
          #if item.at("c", default: "") != "" [
            #v(-1pt) #text(size: calc.max(body-size - 1.2pt, 9.5pt))[Correction: #(if is-solution { text(fill: rgb("1D4ED8"))[#safe-eval-en(item.c)] } else { "...................................................................................." })]
          ]
        ],
        if is-solution and item.at("mark", default: "") != "" {
          align(bottom + right)[#text(size: calc.max(body-size - 0.5pt, 10pt), weight: "bold", fill: rgb("B91C1C"))[#item.mark pts]]
        } else { [] }
      )
      #v(3pt)
    ]
  ] else if b.type == "multiple_choice" [
    #v(3pt)
    #stack(dir: ttb, spacing: 6pt,
      ..b.groups.map(g => [
        #grid(
          columns: (1fr, auto),
          column-gutter: 8pt,
          [
            #text(weight: "bold")[#safe-eval-en(g.header)] \
            #h(10pt) #g.options.map(opt => [
              #let symbol = if is-solution and opt == g.correct { text(fill: rgb("1D4ED8"), weight: "bold")[X] } else { " " }
              #box(stroke: 0.5pt, width: 11pt, height: 11pt, radius: 2pt, align(center + horizon)[#text(size: 8.5pt)[#symbol]]) #h(4pt) #(if is-solution and opt == g.correct { text(fill: rgb("1D4ED8"), weight: "bold")[#safe-eval-en(opt)] } else { safe-eval-en(opt) })
            ]).join(h(16pt))
          ],
          if is-solution and g.at("mark", default: "") != "" {
            align(bottom + right)[#text(size: calc.max(body-size - 0.5pt, 10pt), weight: "bold", fill: rgb("B91C1C"))[#g.mark pts]]
          } else { [] }
        )
      ])
    )
    #v(2pt)
  ] else if b.type == "table" [
    #v(4pt)
    #let t-align = b.at("align", default: "left")
    #let t-width = b.at("width", default: "full")
    #let t-borders = b.at("borders", default: "grid")
    #let t-header-bg = b.at("headerBackground", default: true)
    #let t-stroke = if t-borders == "grid" { 0.55pt + luma(90) } else if t-borders == "horizontal" { (x, y) => (bottom: 0.55pt + luma(90), top: if y == 0 { 0.55pt + luma(90) } else { 0pt }) } else { none }
    #let t-fill = (x, y) => if y == 0 and t-header-bg { rgb("EFF6FF") } else { none }
    #let t-cols = if t-width == "full" { b.headers.map(_ => 1fr) } else { b.headers.map(_ => auto) }

    #let rows-grid = (b.headers,)
    #if b.at("rows", default: none) != none {
      for r in b.rows { rows-grid.push(r) }
    } else if b.at("cells", default: ()).len() > 0 {
      rows-grid.push(b.cells)
    }

    #let flat-cells = ()
    #for (ri, row) in rows-grid.enumerate() {
      for cell in row {
        let is-dict = type(cell) == dictionary
        let rs = if is-dict { cell.at("rowspan", default: 1) } else { 1 }
        let cs = if is-dict { cell.at("colspan", default: 1) } else { 1 }
        let cb = if ri == 0 { true } else if is-dict { cell.at("bold", default: false) } else { false }
        let answer-str = if is-dict { cell.at("answer", default: "") } else { "" }
        let mark-str = if is-dict { cell.at("mark", default: "") } else { "" }
        let content-str = if is-dict { cell.at("content", default: "") } else { str(cell) }

        let rendered = if is-solution and answer-str != "" {
          text(fill: rgb("1D4ED8"))[#safe-eval-en(answer-str)]
        } else {
          safe-eval-en(content-str)
        }
        if cb { rendered = text(weight: "bold")[#rendered] }
        if is-solution and mark-str != "" {
          rendered = stack(dir: ttb, spacing: 3pt, rendered, align(right)[#text(size: 9pt, weight: "bold", fill: rgb("B91C1C"))[#mark-str pts]])
        }
        if cs > 1 or rs > 1 {
          flat-cells.push(table.cell(colspan: cs, rowspan: rs)[#rendered])
        } else {
          flat-cells.push(rendered)
        }
      }
    }

    #align(center)[
      #table(
        columns: t-cols,
        align: eval(t-align) + horizon,
        stroke: t-stroke,
        fill: t-fill,
        inset: table-inset,
        ..flat-cells
      )
    ]
    #v(4pt)
  ] else if b.type == "image" [
    #if b.at("src", default: "") != "" {
      let img-w-raw = b.at("width", default: 75%)
      let img-w = if type(img-w-raw) == int or type(img-w-raw) == float {
        calc.min(calc.max(img-w-raw * 0.72, 110), 400) * 1pt
      } else if type(img-w-raw) == str {
        if img-w-raw == "full" { 95% } else if img-w-raw == "half" { 50% } else { 75% }
      } else {
        img-w-raw
      }
      align(center)[
        #image(b.src, width: img-w)
        #if b.at("caption", default: "") != "" {
          text(size: calc.max(body-size - 1.5pt, 9.5pt), style: "italic")[#safe-eval-en(b.caption)]
        }
      ]
    }
  ] else if b.type == "typst_raw" [
    #grid(
      columns: (1fr, auto),
      column-gutter: 8pt,
      [
        #(if is-solution and b.at("answer", default: "") != "" {
          text(fill: rgb("1D4ED8"))[#safe-eval-en(b.answer)]
        } else {
          safe-eval-en(b.content)
        })
      ],
      mark-badge
    )
    #v(3pt)
  ] else if b.type == "columns" [
    #let children = b.at("children", default: ())
    #let n = children.len()
    #if n > 0 {
      let cols = b.at("widths", default: none)
      if cols == none { cols = range(n).map(_ => 1fr) } else { cols = cols.map(w => eval(w)) }
      grid(
        columns: cols,
        column-gutter: 12pt,
        ..children.map(child => [#render-block-en(child, is-solution, body-size: body-size, table-inset: table-inset)])
      )
    }
  ]
}

#let english-exam-template(data, template-id: "english/secondary", is-solution: false) = {
  let metadata = data.at("metadata", default: (:))
  let level-id = metadata.at("levelId", default: "secondaire")
  let year-name = metadata.at("yearName", default: "English Exam")
  let stream-name = metadata.at("streamName", default: "")
  let trimester-name = metadata.at("trimesterName", default: "First Term")
  let doc-type = metadata.at("docType", default: "exam")
  let academic-year = metadata.at("academicYear", default: "2025 / 2026")
  let duration = metadata.at("duration", default: "02 Hours")
  let coefficient = str(metadata.at("coefficient", default: "2"))
  let custom-title = metadata.at("customDocTitle", default: "")
  let session-en = metadata.at("examSessionAr", default: "2025 / 2026")
  let topic-num = metadata.at("topicNumber", default: 1)

  let is-primary = template-id == "english/primary" or level-id == "primaire"
  let is-middle = template-id == "english/middle" or level-id == "moyen"
  let is-bac = template-id == "english/bac_official"

  let body-size = if is-primary { 13pt } else if is-middle { 11.5pt } else { 11pt }
  let main-font = ("Arial", "DejaVu Sans", "Arabic Transparent")
  let total-pts = if is-primary { "10" } else { "20" }

  let title-banner = if custom-title != "" {
    custom-title
  } else if is-bac {
    "Baccalaureate Practice Examination — English Language"
  } else if doc-type == "test" {
    trimester-name + " Test — English Language"
  } else {
    trimester-name + " Examination — English Language"
  }

  set page(
    paper: "a4",
    margin: (top: 1.4cm, bottom: 1.6cm, left: 1.6cm, right: 1.6cm),
    footer: context [
      #set text(font: main-font, size: 9pt, dir: ltr)
      #line(length: 100%, stroke: 0.5pt + luma(140))
      #v(-4pt)
      #grid(
        columns: (1fr, 1fr, 1fr),
        align: horizon,
        align(left)[#text(weight: "bold", fill: luma(70))[#(if stream-name != "" { stream-name + " — Coeff: " + coefficient } else { year-name })]],
        align(center)[#text(weight: "bold")[Page #counter(page).display() of #counter(page).final().at(0)]],
        align(right)[#link("https://sujetstore.com/")[#text(fill: rgb("1D4ED8"), weight: "bold")[sujetstore.com]]]
      )
    ]
  )

  set text(font: main-font, lang: "en", dir: ltr, size: body-size, weight: "regular")
  set par(leading: 0.62em, justify: true)

  // ═══════════ Clean Legal Header (NO Ministry / NO ONEC) ═══════════
  align(center)[
    #text(size: 13pt, weight: "bold")[People's Democratic Republic of Algeria] \
    #text(size: 10.5pt, weight: "bold", fill: rgb("1E3A8A"))[SujetStore Educational Platform]
  ]
  v(4pt)

  box(
    width: 100%,
    stroke: 1pt + rgb("1E3A8A"),
    radius: 3pt,
    inset: (x: 11pt, y: 8pt),
    fill: rgb("F8FAFC")
  )[
    #set par(leading: 0.55em, justify: false)
    #grid(
      columns: (1.35fr, auto, 1fr),
      column-gutter: 10pt,
      align: horizon,
      align(left)[
        #text(size: 11pt, weight: "bold")[#year-name] \
        #(if stream-name != "" [
          #text(size: 10.5pt)[Stream: #text(weight: "bold")[#stream-name]]
        ] else [
          #text(size: 10.5pt)[Term: #text(weight: "bold")[#trimester-name]]
        ])
      ],
      align(center)[
        #box(stroke: 0.7pt + luma(120), inset: (x: 10pt, y: 5pt), radius: 2pt, fill: white)[
          #text(size: 10.5pt, weight: "bold")[#(if is-bac { session-en } else { academic-year })]
        ]
      ],
      align(right)[
        #text(size: 10.5pt)[Duration: #text(weight: "bold")[#duration]] \
        #text(size: 10.5pt)[#(if is-primary { "Mark: .... / 10" } else { "Coefficient: " + coefficient })]
      ]
    )
  ]
  v(5pt)

  box(
    width: 100%,
    stroke: (top: 1.2pt + rgb("1E3A8A"), bottom: 1.2pt + rgb("1E3A8A")),
    inset: (y: 7pt, x: 10pt),
    fill: if is-solution { rgb("ECFDF5") } else { rgb("EFF6FF") }
  )[
    #grid(
      columns: (1fr, auto),
      column-gutter: 8pt,
      align: horizon,
      align(center)[
        #text(size: 13pt, weight: "bold", fill: if is-solution { rgb("047857") } else { rgb("1E3A8A") })[
          #title-banner #(if is-solution { "— Model Answer & Marking Scale" } else { "" })
        ]
      ],
      align(right)[
        #if is-solution [
          #text(size: 10.5pt, weight: "bold", fill: rgb("B91C1C"))[Total: #total-pts pts]
        ] else if is-bac [
          #text(size: 10.5pt, weight: "bold")[#(if topic-num == 2 { "Subject 2" } else { "Subject 1" })]
        ] else []
      ]
    )
  ]
  v(4pt)

  if is-primary and not is-solution [
    #box(width: 100%, stroke: 0.6pt + luma(140), radius: 3pt, inset: (x: 10pt, y: 6pt))[
      #set par(justify: false)
      #set text(size: 11.5pt)
      #grid(
        columns: (1.75fr, 1fr, 0.85fr),
        column-gutter: 10pt,
        [Full Name: ..................................],
        [Class: .................],
        align(right)[Mark: ...... / 10]
      )
    ]
    #v(4pt)
  ]

  // ═══════════ Exam Sections / Exercises ═══════════
  let exercises = if data.keys().contains("exercises") {
    data.exercises
  } else if data.keys().contains("topics") {
    data.topics.at(0).exercises
  } else {
    ()
  }

  for (idx, ex) in exercises.enumerate() {
    let custom-ex-title = ex.at("customTitle", default: none)
    let pts = str(ex.at("points", default: "0"))
    let heading-text = if custom-ex-title != none and custom-ex-title != "" {
      custom-ex-title + " (" + pts + " points)"
    } else {
      "Activity " + str(idx + 1) + " (" + pts + " points)"
    }

    v(6pt)
    block(breakable: true, width: 100%)[
      #box(
        width: 100%,
        inset: (x: 8pt, y: 5pt),
        fill: if is-solution { rgb("ECFDF5") } else { rgb("F1F5F9") },
        stroke: (left: 3pt + if is-solution { rgb("047857") } else { rgb("1E3A8A") })
      )[
        #text(weight: "bold", size: body-size + 1pt, fill: rgb("0F172A"))[#safe-eval-en(heading-text)]
      ]
      #v(4pt)
      #if ex.at("instruction", default: "") != "" [
        #text(style: "italic", size: body-size - 0.3pt, fill: rgb("334155"))[#safe-eval-en(ex.instruction)]
        #v(3pt)
      ]
      #let blocks = ex.at("blocks", default: ex.at("content", default: ()))
      #for b in blocks [
        #render-block-en(b, is-solution, body-size: body-size, table-inset: 6pt)
      ]
    ]
  }
}
