// templates/italian/exam.typ — Dedicated LTR Italian Exam Template for SujetStore
// Supports Secondary (2AS LE & 3AS LE) and BAC Ufficiale (3AS LE).
// Clean legal header: Repubblica Algerina Democratica e Popolare + SujetStore (NO Ministero / NO ONEC).

#import "../../common/illustrated_figure.typ": render-illustrated-figure

#let safe-eval-it(content, mode: "markup") = {
  if content == "" or content == none { return [] }
  let prepared = if mode == "markup" and type(content) == str {
    content.replace(regex("\.{12,}"), "#repeat(gap: 1.8pt)[.]")
  } else {
    content
  }
  let scope = (cm: 1cm, mm: 1mm, pt: 1pt, em: 1em)
  eval(prepared, mode: mode, scope: scope)
}

#let render-block-it(b, is-solution, body-size: 11.5pt, table-inset: 6pt) = {
  let m = b.at("mark", default: b.at("points", default: ""))
  let mark-badge = if is-solution and m != "" {
    align(bottom + right)[#text(size: calc.max(body-size - 0.5pt, 10pt), weight: "bold", fill: rgb("B91C1C"))[#m pti]]
  } else { [] }

  if b.type == "text" [
    #grid(
      columns: (1fr, auto),
      column-gutter: 8pt,
      [
        #(if is-solution and b.at("answer", default: "") != "" {
          text(size: body-size, fill: rgb("1D4ED8"))[#safe-eval-it(b.answer)]
        } else {
          text(size: body-size)[#safe-eval-it(b.content)]
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
          - #safe-eval-it(item.q) #h(6pt) [#box(width: 56pt, align(center)[#(if is-solution { text(fill: rgb("1D4ED8"), weight: "bold")[#safe-eval-it(item.a)] } else { "........" })])] \
          #if item.at("c", default: "") != "" [
            #v(-1pt) #text(size: calc.max(body-size - 1.2pt, 9.5pt))[Giustificazione : #(if is-solution { text(fill: rgb("1D4ED8"))[#safe-eval-it(item.c)] } else { repeat(gap: 1.8pt)[.] })]
          ]
        ],
        if is-solution and item.at("mark", default: "") != "" {
          align(bottom + right)[#text(size: calc.max(body-size - 0.5pt, 10pt), weight: "bold", fill: rgb("B91C1C"))[#item.mark pti]]
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
            #text(weight: "bold")[#safe-eval-it(g.header)] \
            #h(10pt) #g.options.map(opt => [
              #let symbol = if is-solution and opt == g.correct { text(fill: rgb("1D4ED8"), weight: "bold")[X] } else { " " }
              #box(stroke: 0.5pt, width: 11pt, height: 11pt, radius: 2pt, align(center + horizon)[#text(size: 8.5pt)[#symbol]]) #h(4pt) #(if is-solution and opt == g.correct { text(fill: rgb("1D4ED8"), weight: "bold")[#safe-eval-it(opt)] } else { safe-eval-it(opt) })
            ]).join(h(16pt))
          ],
          if is-solution and g.at("mark", default: "") != "" {
            align(bottom + right)[#text(size: calc.max(body-size - 0.5pt, 10pt), weight: "bold", fill: rgb("B91C1C"))[#g.mark pti]]
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
        let is-dots-only = content-str.trim().len() >= 4 and content-str.trim().find(regex("^[.\u{2026}]+$")) != none

        let rendered = if is-solution and answer-str != "" {
          text(fill: rgb("1D4ED8"))[#safe-eval-it(answer-str)]
        } else if is-dots-only {
          if t-width == "full" {
            box(width: 100%)[#repeat(gap: 1.8pt)[.]]
          } else {
            box(width: 80pt)[#repeat(gap: 1.8pt)[.]]
          }
        } else {
          safe-eval-it(content-str)
        }
        if cb { rendered = text(weight: "bold")[#rendered] }
        if is-solution and mark-str != "" {
          rendered = stack(dir: ttb, spacing: 3pt, rendered, align(right)[#text(size: 9pt, weight: "bold", fill: rgb("B91C1C"))[#mark-str pti]])
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
          text(size: calc.max(body-size - 1.5pt, 9.5pt), style: "italic")[#safe-eval-it(b.caption)]
        }
      ]
    }
  ] else if b.type == "image_grid" [
    #v(4pt)
    #align(center)[
      #table(
        columns: (1fr,) * b.columns,
        align: center + horizon,
        stroke: 0.5pt + rgb("CBD5E1"),
        inset: 5pt,
        ..b.items.map(it => [
          #box(width: 100%, height: 74pt, inset: 0pt)[#image(it.src, fit: "contain")]
        ]),
        ..b.items.map(it => [
          #set text(size: calc.max(body-size - 1pt, 10pt))
          #stack(dir: ttb, spacing: 3pt,
            if is-solution and it.at("answer", default: "") != "" { text(fill: rgb("1D4ED8"), weight: "bold")[#safe-eval-it(it.answer)] } else { safe-eval-it(it.label) },
            if is-solution and it.at("mark", default: "") != "" { text(size: 9pt, fill: rgb("B91C1C"))[#it.mark pti] }
          )
        ])
      )
    ]
    #v(4pt)
  ] else if b.type == "illustrated_figure" [
    #render-illustrated-figure(b, is-solution, body-size: body-size, is-ltr: true, eval-fn: s => safe-eval-it(s))
  ] else if b.type == "typst_raw" [
    #grid(
      columns: (1fr, auto),
      column-gutter: 8pt,
      [
        #(if is-solution and b.at("answer", default: "") != "" {
          text(fill: rgb("1D4ED8"))[#safe-eval-it(b.answer)]
        } else {
          safe-eval-it(b.content)
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
        ..children.map(child => [#render-block-it(child, is-solution, body-size: body-size, table-inset: table-inset)])
      )
    }
  ]
}

#let italian-exam-template(data, template-id: "italian/secondary", is-solution: false) = {
  let metadata = data.at("metadata", default: (:))
  let year-name = metadata.at("yearName", default: "Prova di Lingua Italiana")
  let stream-name = metadata.at("streamName", default: "")
  let trimester-name = metadata.at("trimesterName", default: "1º Trimestre")
  let doc-type = metadata.at("docType", default: "exam")
  let academic-year = metadata.at("academicYear", default: "2025 / 2026")
  let duration = metadata.at("duration", default: "02 h 00")
  let coefficient = str(metadata.at("coefficient", default: "4"))
  let custom-title = metadata.at("customDocTitle", default: "")
  let session-it = metadata.at("examSessionAr", default: "2025 / 2026")
  let topic-num = metadata.at("topicNumber", default: 1)

  let is-bac = template-id == "italian/bac_official"
  let body-size = 11pt
  let main-font = ("Arial", "DejaVu Sans", "Arabic Transparent")

  let title-banner = if custom-title != "" {
    custom-title
  } else if is-bac {
    "Esame di Maturità (BAC) — Lingua Italiana"
  } else if doc-type == "test" {
    "Verifica scritta del " + trimester-name + " — Lingua Italiana"
  } else {
    "Esame del " + trimester-name + " — Lingua Italiana"
  }

  set page(
    paper: "a4",
    margin: (top: 1.0cm, bottom: 1.9cm, left: 1.5cm, right: 1.5cm),
    footer: context [
      #set text(font: main-font, size: 9pt, dir: ltr)
      #line(length: 100%, stroke: 0.5pt + luma(140))
      #v(-4pt)
      #grid(
        columns: (1fr, 1fr, 1fr),
        align: horizon,
        align(left)[#stack(dir: ltr, spacing: 5pt,
          link("https://sujetstore.com/")[#box(width: 22pt, height: 22pt)[#image("../../common/logo.png", width: 100%, height: 100%, fit: "contain")]],
          align(horizon)[#link("https://sujetstore.com/")[#text(fill: rgb("1D4ED8"), weight: "bold", size: 9.5pt)[sujetstore.com]]]
        )],
        align(center)[#text(weight: "bold", size: 9.5pt)[Pagina #counter(page).display() di #counter(page).final().at(0)]],
        align(right)[#box(width: 22pt, height: 22pt)[#image("../../common/qrcode.png", width: 100%, height: 100%, fit: "contain")]]
      )
    ]
  )

  set text(font: main-font, lang: "it", dir: ltr, size: body-size, weight: "regular")
  set par(leading: 0.62em, justify: true)

  // ═══════════ Branded Italian Header (Logo + QR + SujetStore Identity, NO Ministero / NO ONEC) ═══════════
  if is-bac [
    #grid(
      columns: (1fr, auto, 1fr),
      column-gutter: 8pt,
      align: horizon,
      align(left)[#set par(justify: false)
        #stack(dir: ttb, spacing: 2pt,
        link("https://sujetstore.com/")[#text(size: 8.8pt, fill: rgb("1D4ED8"), weight: "bold")[https://sujetstore.com]],
        text(size: 7.4pt, fill: luma(90))[Piattaforma educativa algerina]
      )],
      align(center)[
        #stack(dir: ttb, spacing: 2pt,
          align(center)[#link("https://sujetstore.com/")[#image("../../common/logo.png", width: 1.25cm, fit: "contain")]],
          align(center)[#text(size: 11.5pt, weight: "bold")[Repubblica Algerina Democratica e Popolare]],
          align(center)[#text(size: 9.8pt, weight: "bold", fill: rgb("1D4ED8"))[Piattaforma Educativa SujetStore]]
        )
      ],
      align(right)[#stack(dir: ttb, spacing: 2pt,
        align(right)[#box(width: 30pt, height: 30pt, stroke: 0.5pt + luma(140), radius: 2pt, inset: 2pt)[#image("../../common/qrcode.png")]],
        align(right)[#text(size: 7.2pt, fill: luma(80))[Scansiona per altro]]
      )]
    )
    #v(4pt)
    #box(
      width: 100%,
      stroke: 1pt + rgb("0F766E"),
      radius: 3pt,
      inset: (x: 11pt, y: 7pt),
      fill: rgb("F0FDFA")
    )[
      #set par(leading: 0.55em, justify: false)
      #grid(
        columns: (1.35fr, auto, 1fr),
        column-gutter: 10pt,
        align: horizon,
        align(left)[
          #text(size: 11pt, weight: "bold")[#year-name] \
          #text(size: 10.5pt)[Indirizzo : #text(weight: "bold")[#stream-name]]
        ],
        align(center)[
          #box(stroke: 0.7pt + luma(120), inset: (x: 10pt, y: 5pt), radius: 2pt, fill: white)[
            #text(size: 10.5pt, weight: "bold")[#session-it]
          ]
        ],
        align(right)[
          #text(size: 10.5pt)[Durata : #text(weight: "bold")[#duration]] \
          #text(size: 10.5pt)[Coefficiente : #text(weight: "bold")[#coefficient]]
        ]
      )
    ]
    #v(5pt)
  ] else [
    #grid(
      columns: (1fr, auto, 1fr),
      column-gutter: 6pt,
      align: horizon,
      align(left)[#set par(justify: false)
        #stack(dir: ttb, spacing: 1.5pt,
        link("https://sujetstore.com/")[#text(size: 8.8pt, fill: rgb("0F766E"), weight: "bold")[https://sujetstore.com]],
        text(size: 7.4pt, fill: luma(85))[Piattaforma educativa algerina]
      )],
      align(center)[
        #text(size: 14.8pt, weight: "bold", fill: rgb("0F766E"))[SujetStore ]#text(size: 13.8pt, weight: "bold", fill: rgb("0F172A"))[Piattaforma del Successo]
      ],
      align(right)[#stack(dir: ttb, spacing: 2pt,
        align(right)[#box(width: 30pt, height: 30pt, stroke: 0.5pt + luma(140), radius: 2pt, inset: 2pt)[#image("../../common/qrcode.png")]],
        align(right)[#text(size: 7.2pt, fill: luma(80))[Scansiona per altro]]
      )]
    )
    #v(4pt)

    #grid(
      columns: (1.35fr, auto, 1.1fr),
      column-gutter: 8pt,
      align: horizon,
      align(left)[#set par(leading: 0.55em, justify: false)
        #text(size: 9.8pt, weight: "bold")[Repubblica Algerina Democratica e Popolare] \
        #text(size: 10.2pt, weight: "bold", fill: rgb("0F766E"))[#year-name] \
        #(if stream-name != "" [
          #text(size: 9.8pt)[Indirizzo : #text(weight: "bold")[#stream-name]]
        ] else [
          #text(size: 9.8pt)[Trimestre : #text(weight: "bold")[#trimester-name]]
        ])
      ],
      align(center)[
        #link("https://sujetstore.com/")[#image("../../common/logo.png", width: 1.5cm, fit: "contain")]
      ],
      align(right)[#set par(leading: 0.55em, justify: false)
        #text(size: 10pt, weight: "bold")[Anno scolastico : #academic-year] \
        #text(size: 10pt, weight: "bold")[Durata : #duration] \
        #text(size: 10pt, weight: "bold")[Coefficiente : #coefficient]
      ]
    )
    #v(4pt)
  ]

  // ═══════════ Main Title Banner ═══════════
  box(
    width: 100%,
    inset: (x: 10pt, y: 6pt),
    fill: if is-solution { rgb("ECFDF5") } else { rgb("F0FDFA") },
    stroke: (
      top: 1.2pt + if is-solution { rgb("047857") } else { rgb("0F766E") },
      bottom: 1.2pt + if is-solution { rgb("047857") } else { rgb("0F766E") }
    )
  )[
    #if is-bac [
      #grid(
        columns: (1fr, auto),
        align: horizon,
        align(center)[
          #text(size: 12.5pt, weight: "bold", fill: if is-solution { rgb("065F46") } else { rgb("0F766E") })[
            #if is-solution [Correzione Modello e Griglia — #title-banner] else [#title-banner]
          ]
        ],
        text(size: 10.5pt, weight: "bold")[Traccia #topic-num]
      )
    ] else [
      #align(center)[
        #text(size: 12.5pt, weight: "bold", fill: if is-solution { rgb("065F46") } else { rgb("0F766E") })[
          #if is-solution [Correzione modello — #title-banner] else [#title-banner]
        ]
      ]
    ]
  ]
  v(5pt)

  // ═══════════ Exercises / Parts Body ═══════════
  let exercises = if data.keys().contains("exercises") {
    data.exercises
  } else if data.keys().contains("topics") {
    data.topics.at(0).exercises
  } else {
    ()
  }

  for (idx, ex) in exercises.enumerate() {
    let ex-pts = str(ex.at("points", default: ""))
    let ex-title = ex.at("customTitle", default: "Parte " + str(idx + 1))

    v(5pt)
    block(breakable: true, width: 100%)[
      #box(
        width: 100%,
        fill: if is-solution { rgb("ECFDF5") } else { rgb("F1F5F9") },
        inset: (x: 9pt, y: 5pt),
        stroke: (left: 3pt + if is-solution { rgb("047857") } else { rgb("0F766E") })
      )[
        #text(size: calc.max(body-size + 0.5pt, 11.5pt), weight: "bold", fill: rgb("0F172A"))[
          #safe-eval-it(ex-title) #(if ex-pts != "" and not ex-title.contains("pti") and not ex-title.contains("punti") { "(" + ex-pts + " punti)" } else { "" })
        ]
      ]
      #v(4pt)
      #if ex.at("instruction", default: "") != "" [
        #text(style: "italic", fill: rgb("334155"))[#safe-eval-it(ex.instruction)]
        #v(4pt)
      ]
      #let blocks = ex.at("blocks", default: ex.at("content", default: ()))
      #for b in blocks [
        #render-block-it(b, is-solution, body-size: body-size, table-inset: 5.5pt)
      ]
    ]
  }

  v(8pt)
  align(center)[
    #text(size: 10pt, weight: "bold", fill: luma(80))[
      #if is-solution [— Fine della correzione modello — Piattaforma SujetStore —] else [— Fine della prova — Buon lavoro! —]
    ]
  ]
}
