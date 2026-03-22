// ============================================
// middle/quiz_solution.typ — الحل النموذجي
// SujetBuilder Module
// ============================================

#import "../../common/styles.typ": *
#import "../../common/header.typ": exam-header
#import "../../common/footer.typ": exam-footer
#import "../../common/exercises.typ": render-solutions

// Parse JSON data from sys.inputs
#let raw-data = sys.inputs.at("data", default: "{}")
#let data = json(bytes(raw-data))

#let metadata = data.at("metadata", default: (:))
#let exercises = data.at("exercises", default: ())
#let solutions = data.at("solutions", default: ())

// Apply page setup and footer
#show: page-setup
#exam-footer(site-url: metadata.at("siteUrl", default: "sujetstore.com"))

// ── Header (same as the exam, for reference) ──
#exam-header(metadata)

// ── Solution content ──
#render-solutions(solutions, exercises)

// ── End marker ──
#v(1fr)
#align(center)[
  #text(size: 10pt, weight: "bold", fill: luma(150))[— انتهى الحل النموذجي —]
]
