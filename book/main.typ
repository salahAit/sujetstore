#set document(title: "منصة SujetStore — الدليل التقني", author: "فريق SujetStore")
#set text(lang: "ar", size: 12pt, font: "Inter", dir: rtl)
#set page(paper: "a4", numbering: "1", margin: (x: 2.5cm, y: 2.5cm))
#set heading(numbering: "1.1.")
#set par(justify: true, leading: 1.2em)

#align(center)[
  #v(5cm)
  #text(size: 36pt, weight: "bold", fill: rgb("#065f46"))[SujetStore]

  #v(0.5cm)
  #text(size: 18pt, fill: luma(100))[منصة الأرشيف التعليمي للمنهج الجزائري]

  #v(1cm)
  #text(size: 14pt, fill: luma(120))[الدليل التقني — المعمارية، الميزات وخارطة الطريق]

  #v(3cm)
  #text(size: 12pt, fill: luma(150))[الإصدار 2.0 — مارس 2026]
]

#pagebreak()

#outline(title: "فهرس المحتويات", depth: 3, indent: 1.5em)

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
