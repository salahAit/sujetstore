// ============================================================================
// SujetStore Developer Guide v4.0 — Entry Point
// Build command:
//   bun run docs:dev-guide
//   (typst compile --root . --font-path static/fonts
//    docs/developer-guide/main.typ
//    docs/developer-guide/SujetStore-Developer-Guide-v4.pdf)
// ============================================================================

#import "template.typ": *

#show: dev-guide-template

#dev-cover-page()

#pagebreak()

#block(below: 12pt)[
  #text(font: heading-font, size: 20pt, weight: "bold", fill: emerald)[فهرس المحتويات]
  #v(4pt)
  #line(length: 100%, stroke: 1.5pt + gold)
]
#outline(title: none)

#include "chapters/01-overview-and-stack.typ"
#include "chapters/02-local-setup-and-infra.typ"
#include "chapters/03-dual-database-architecture.typ"
#include "chapters/04-rustfs-storage-and-pwa.typ"
#include "chapters/05-kernel-and-subject-plugins.typ"
#include "chapters/06-typst-pdf-and-generator-engine.typ"
#include "chapters/07-search-seo-and-caching.typ"
#include "chapters/08-student-portal-and-remediation.typ"
#include "chapters/09-api-and-routes-reference.typ"
#include "chapters/10-testing-deployment-and-runbooks.typ"
