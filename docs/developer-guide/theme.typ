// ============================================================================
// SujetStore Developer Guide v4.0 — Design Tokens & Reusable Components
// Strictly internal documentation (NEVER placed under static/ or src/routes/)
// ============================================================================

#let emerald = rgb("#064E3B")
#let emerald-light = rgb("#ECFDF5")
#let emerald-mid = rgb("#047857")
#let gold = rgb("#B48A32")
#let gold-light = rgb("#FEF3C7")
#let slate-900 = rgb("#0F172A")
#let slate-700 = rgb("#334155")
#let slate-500 = rgb("#64748B")
#let slate-200 = rgb("#E2E8F0")
#let slate-100 = rgb("#F1F5F9")
#let slate-50 = rgb("#F8FAFC")
#let danger = rgb("#B91C1C")
#let danger-light = rgb("#FEF2F2")
#let info-blue = rgb("#1D4ED8")
#let info-light = rgb("#EFF6FF")

#let body-font = ("Noto Naskh Arabic", "Amiri", "Arabic Transparent")
#let heading-font = ("Noto Kufi Arabic", "Noto Naskh Arabic")
#let mono-font = ("DejaVu Sans Mono", "Noto Mono")

// Styled callout box: kind in ("info", "tip", "warn")
#let callout(title, kind: "info", body) = {
  let (accent, bg) = if kind == "tip" {
    (emerald-mid, emerald-light)
  } else if kind == "warn" {
    (danger, danger-light)
  } else {
    (info-blue, info-light)
  }

  block(
    width: 100%,
    breakable: true,
    inset: (x: 12pt, y: 10pt),
    radius: 5pt,
    fill: bg,
    stroke: (right: 3.5pt + accent, rest: 0.5pt + accent.lighten(65%)),
    above: 10pt,
    below: 12pt,
  )[
    #text(font: heading-font, weight: "bold", size: 10pt, fill: accent)[#title]
    #v(4pt)
    #set text(size: 10pt, fill: slate-900)
    #body
  ]
}

// Styled developer table with emerald header and zebra rows
#let dev-table(columns: auto, headers: (), ..rows) = {
  block(above: 8pt, below: 12pt, width: 100%, breakable: true)[
    #set text(size: 9.5pt)
    #set par(justify: false, leading: 0.72em)
    #table(
      columns: columns,
      inset: (x: 8pt, y: 6.5pt),
      align: (col, row) => right + horizon,
      fill: (col, row) => if row == 0 {
        emerald
      } else if calc.odd(row) {
        white
      } else {
        slate-50
      },
      stroke: 0.5pt + slate-200,
      table.header(
        ..headers.map(h => text(font: heading-font, weight: "bold", fill: white, size: 9.5pt)[#h])
      ),
      ..rows
    )
  ]
}

// Framed LTR code block with optional file/caption title bar
#let code-card(title: none, body) = {
  block(
    width: 100%,
    breakable: true,
    radius: 5pt,
    stroke: 0.6pt + slate-200,
    clip: true,
    above: 8pt,
    below: 12pt,
  )[
    #if title != none {
      block(
        width: 100%,
        fill: slate-900,
        inset: (x: 10pt, y: 5pt),
      )[
        #align(left)[
          #text(dir: ltr, font: mono-font, size: 8.5pt, fill: rgb("#A7F3D0"), weight: "bold")[#title]
        ]
      ]
    }
    #block(
      width: 100%,
      fill: slate-50,
      inset: (x: 10pt, y: 8pt),
    )[
      #body
    ]
  ]
}

// Metric KPI strip card
#let kpi-grid(items) = {
  block(above: 8pt, below: 12pt, width: 100%)[
    #grid(
      columns: items.len(),
      gutter: 8pt,
      ..items.map(it => block(
        width: 100%,
        fill: slate-50,
        stroke: (top: 2.5pt + emerald, rest: 0.5pt + slate-200),
        radius: 4pt,
        inset: (x: 8pt, y: 8pt),
      )[
        #align(center)[
          #text(font: heading-font, size: 15pt, weight: "bold", fill: emerald)[#it.value]
          #v(2pt)
          #text(size: 8.5pt, fill: slate-700)[#it.label]
        ]
      ])
    )
  ]
}
