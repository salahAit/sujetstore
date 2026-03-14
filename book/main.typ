#set document(title: "منصة SujetStore — الدليل التقني", author: "فريق SujetStore")

// Premium Colors
#let primary = rgb("#065F46") // Emerald Green
#let secondary = rgb("#C2A052") // Gold
#let text-dark = rgb("#1E293B") // Slate 800
#let bg-light = rgb("#F8FAFC") // Slate 50

#set text(
  lang: "ar", 
  size: 13pt, 
  font: "KFGQPC Uthman Taha Naskh", 
  dir: rtl,
  fill: text-dark
)

#set page(
  paper: "a4",
  margin: (x: 2.5cm, y: 3cm),
  header: context {
    let elems = query(selector(heading.where(level: 1)).before(here()))
    if elems.len() == 0 { return none }
    let current-chap = elems.last().body
    align(left)[
      #text(fill: primary, size: 10pt, weight: "bold")[SujetStore | الدليل التقني — #current-chap]
      #line(length: 100%, stroke: 0.5pt + secondary)
    ]
  },
  footer: context {
    align(center)[
      #line(length: 100%, stroke: 0.5pt + primary)
      #text(fill: text-dark, size: 11pt)[#counter(page).display("1")]
    ]
  }
)

// Professional Heading Styles
#show heading.where(level: 1): it => {
  pagebreak(weak: true)
  v(1cm)
  block(
    fill: bg-light,
    inset: 1.5cm,
    radius: 10pt,
    stroke: (left: 4pt + primary),
    width: 100%,
    [
      #text(fill: primary, size: 24pt, weight: "bold")[#it.body]
    ]
  )
  v(1cm)
}

#show heading.where(level: 2): it => {
  v(0.8cm)
  block(
    stroke: (bottom: 1pt + secondary),
    inset: (bottom: 0.3cm),
    width: 100%,
    [
      #text(fill: text-dark, size: 18pt, weight: "bold")[#it.body]
    ]
  )
  v(0.4cm)
}

#show heading.where(level: 3): it => {
  v(0.5cm)
  text(fill: primary, size: 15pt, weight: "bold")[#it.body]
  v(0.3cm)
}

#set par(justify: true, leading: 1.6em, first-line-indent: 1em)

// Cover Page
#align(center)[
  #v(4cm)
  #block(
    fill: primary,
    inset: 2cm,
    radius: 20pt,
    width: 90%,
    [
      #text(size: 48pt, weight: "bold", fill: white)[SujetStore]
      #v(0.5cm)
      #text(size: 20pt, fill: secondary)[منصة الأرشيف التعليمي للمنهج الجزائري]
    ]
  )

  #v(2cm)
  #text(size: 16pt, fill: text-dark)[الدليل التقني — المعمارية، الميزات وخارطة الطريق]

  #v(3cm)
  #text(size: 14pt, fill: primary)[الإصدار 2.0 — مارس 2026]
]

#pagebreak()

// Outline styling
#show outline.entry.where(
  level: 1
): it => {
  v(12pt, weak: true)
  strong(it)
}

#align(center)[
  #text(size: 24pt, fill: primary, weight: "bold")[فهرس المحتويات]
  #v(1cm)
]
#outline(title: none, depth: 3, indent: 2em)

#pagebreak()

#include "chapters/01-introduction.typ"
#include "chapters/02-architecture.typ"
#include "chapters/03-ui-ux.typ"
#include "chapters/04-document-engine.typ"
#include "chapters/05-quiz-engine.typ"
#include "chapters/06-gamification.typ"
#include "chapters/07-admin-dashboard.typ"
#include "chapters/08-deployment-roadmap.typ"
#include "chapters/09-educational-hierarchy.typ"
