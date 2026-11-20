// ============================================================================
// SujetStore Developer Guide v4.0 — Page Layout, Typography & Cover Template
// ============================================================================

#import "theme.typ": *

#let chapter-num(..nums) = {
  let n = nums.pos()
  if n.len() == 1 {
    numbering("1", n.at(0))
  } else if n.len() == 2 {
    [#numbering("1", n.at(0)).#numbering("1", n.at(1))]
  } else {
    [#numbering("1", n.at(0)).#numbering("1", n.at(1)).#numbering("1", n.at(2))]
  }
}

#let dev-guide-template(body) = {
  set document(
    title: "SujetStore Developer Guide v4.0",
    author: "SujetStore Engineering Team",
  )

  set text(
    lang: "ar",
    dir: rtl,
    font: body-font,
    size: 10.5pt,
    fill: slate-900,
  )

  set par(justify: true, leading: 0.85em, spacing: 1.15em)

  set list(indent: 1em, body-indent: 0.5em, marker: text(fill: emerald, weight: "bold")[•])
  set enum(indent: 1em, body-indent: 0.5em)

  show outline: set text(dir: rtl, font: body-font, size: 9pt)
  show outline: set par(leading: 0.58em, spacing: 0.55em)
  show outline.entry.where(level: 1): it => {
    v(3pt, weak: true)
    text(font: heading-font, weight: "bold", fill: emerald, size: 9.5pt)[#it]
  }
  set outline(indent: 1.3em, depth: 2)

  // Inline code (LTR monospace chip)
  show raw.where(block: false): it => box(
    fill: slate-100,
    stroke: 0.4pt + slate-200,
    inset: (x: 3.5pt, y: 1.2pt),
    outset: (y: 1pt),
    radius: 3pt,
    text(dir: ltr, font: mono-font, size: 8.6pt, fill: emerald)[#it],
  )

  // Block code (LTR monospace with crisp styling)
  show raw.where(block: true): it => block(
    width: 100%,
    breakable: true,
    fill: slate-50,
    stroke: (left: 2.5pt + emerald-mid, rest: 0.5pt + slate-200),
    inset: (x: 10pt, y: 8pt),
    radius: 4pt,
    above: 6pt,
    below: 10pt,
  )[
    #set text(dir: ltr, font: mono-font, size: 8.3pt, fill: slate-900)
    #set par(justify: false, leading: 0.65em)
    #align(left)[#it]
  ]

  set page(
    paper: "a4",
    margin: (top: 2.4cm, bottom: 2.2cm, x: 2.1cm),
    header: context {
      if counter(page).get().first() > 1 {
        let elems = query(selector(heading.where(level: 1)).before(here()))
        let chap-title = if elems.len() > 0 { elems.last().body } else { [دليل المطور — SujetStore v4.0] }
        grid(
          columns: (1fr, auto),
          align(right, text(font: heading-font, fill: emerald, weight: "bold", size: 8.5pt)[#chap-title]),
          align(left, text(dir: ltr, font: mono-font, fill: slate-500, size: 8pt)[SUJETSTORE DEV GUIDE v4.0]),
        )
        v(3pt)
        line(length: 100%, stroke: 0.6pt + emerald.lighten(65%))
      }
    },
    footer: context {
      if counter(page).get().first() > 1 {
        line(length: 100%, stroke: 0.4pt + slate-200)
        v(3pt)
        grid(
          columns: (1fr, auto, 1fr),
          align(right, text(size: 8pt, fill: slate-500)[وثيقة هندسية داخلية — لا تُنشر في الموقع العام]),
          align(center, text(font: heading-font, fill: emerald, weight: "bold", size: 9pt)[#counter(page).display("1")]),
          align(left, text(dir: ltr, font: mono-font, size: 8pt, fill: gold)[INTERNAL ONLY]),
        )
      }
    },
  )

  set heading(numbering: chapter-num)

  // Level 1: Chapter Header
  show heading.where(level: 1): it => {
    pagebreak(weak: true)
    block(width: 100%, below: 14pt)[
      #set par(justify: false)
      #text(font: heading-font, size: 11pt, weight: "bold", fill: gold)[
        الفصل #counter(heading).display("1")
      ]
      #v(3pt)
      #text(font: heading-font, size: 19pt, weight: "bold", fill: emerald)[#it.body]
      #v(5pt)
      #line(length: 100%, stroke: 1.8pt + emerald)
    ]
  }

  // Level 2: Section Header
  show heading.where(level: 2): it => {
    v(10pt, weak: true)
    block(width: 100%, sticky: true, below: 6pt)[
      #set par(justify: false)
      #text(font: heading-font, size: 13pt, weight: "bold", fill: emerald-mid)[
        #if it.numbering != none {
          text(fill: gold)[#counter(heading).display(it.numbering)]
          h(6pt)
        }
        #it.body
      ]
      #v(2pt)
      #line(length: 28%, stroke: 0.9pt + gold.lighten(35%))
    ]
  }

  // Level 3: Subsection Header
  show heading.where(level: 3): it => {
    v(7pt, weak: true)
    block(sticky: true, below: 4pt)[
      #text(font: heading-font, size: 11pt, weight: "bold", fill: slate-900)[#it.body]
    ]
  }

  body
}

#let dev-cover-page() = {
  page(margin: 0cm, header: none, footer: none)[
    // Right emerald accent stripe + gold hairline
    #place(right + top)[ #rect(width: 1.6cm, height: 100%, fill: emerald) ]
    #place(right + top, dx: -1.6cm)[ #rect(width: 3pt, height: 100%, fill: gold) ]

    // Top internal badge
    #place(left + top, dx: 2cm, dy: 1.6cm)[
      #box(
        fill: danger-light,
        stroke: 0.8pt + danger,
        radius: 4pt,
        inset: (x: 10pt, y: 5pt),
      )[
        #text(font: heading-font, size: 9pt, weight: "bold", fill: danger)[
          وثيقة داخلية للمطورين — غير مخصّصة للعرض في الموقع العام
        ]
      ]
    ]

    #block(width: 100%, height: 100%, inset: (right: 3.1cm, left: 2cm, top: 4.2cm, bottom: 2.2cm))[
      #align(center)[
        #image("/static/logo.png", width: 3.6cm)
        #v(1.1cm)
        #text(dir: ltr, font: heading-font, size: 42pt, weight: "bold", fill: emerald)[SujetStore]
        #v(-0.2cm)
        #text(font: heading-font, size: 22pt, weight: "bold", fill: gold)[دليل المطور الشامل]
        #v(0.7cm)
        #line(length: 45%, stroke: 1.4pt + emerald.lighten(60%))
        #v(0.7cm)
        #text(font: body-font, size: 13pt, fill: slate-700)[
          المرجع الهندسي الكامل لمعمارية الإصدار الرابع (v4.0):
          \
          النواة والإضافات، القواعد المزدوجة (SQLite + PostgreSQL 17)،
          \
          تخزين RustFS S3، محرك Typst PDF، البحث FTS5، والتشغيل الإنتاجي
        ]
      ]

      #v(1fr)

      #block(
        width: 100%,
        fill: slate-50,
        stroke: 0.7pt + slate-200,
        radius: 6pt,
        inset: 14pt,
      )[
        #grid(
          columns: (1fr, 1fr, 1fr),
          gutter: 12pt,
          [
            #text(font: heading-font, size: 8.5pt, fill: gold, weight: "bold")[الإصدار المعماري]\
            #text(size: 10.5pt, weight: "bold")[الإصدار 4.0 (نوفمبر 2026)]
          ],
          [
            #text(font: heading-font, size: 8.5pt, fill: gold, weight: "bold")[حزمة التشغيل]\
            #text(dir: ltr, font: mono-font, size: 8.2pt)[Bun 1.4 · SvelteKit 3.2\ PostgreSQL 17 · RustFS S3]
          ],
          [
            #text(font: heading-font, size: 8.5pt, fill: gold, weight: "bold")[نطاق التوزيع]\
            #text(size: 10pt, fill: danger, weight: "bold")[فريق التطوير والمستودع فقط]
          ],
        )
      ]
    ]
  ]
}
