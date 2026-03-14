#import "template.typ": *

#show: book-template

// 1. Cover
#cover-page()

#pagebreak()

// 2. TOC
#align(center, text(size: 24pt, fill: rgb("#064E3B"), weight: "bold")[فهرس المحتويات])
#v(1.5cm)
#outline(title: none, depth: 3, indent: 1.5em)

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
