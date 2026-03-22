// ============================================
// middle/quiz.typ — فرض (Middle School Test)
// SujetBuilder Module
// ============================================

#import "../../common/styles.typ": *
#import "../../common/header.typ": exam-header
#import "../../common/footer.typ": exam-footer
#import "../../common/exercises.typ": render-exercises

// Parse JSON data from sys.inputs
#let raw-data = sys.inputs.at("data", default: "{}")
#let data = json.decode(raw-data)

#let metadata = data.at("metadata", default: (:))
#let exercises = data.at("exercises", default: ())

// Apply page setup and footer
#show: page-setup
#exam-footer(site-url: metadata.at("siteUrl", default: "sujetstore.com"))

// ── Header ──
#exam-header(metadata)

// ── Instructions ──
#align(center)[
  #text(size: 10pt, style: "italic", fill: luma(100))[
    على المترشح أن يجيب على جميع التمارين
  ]
]
#v(0.5em)

// ── Exercises ──
#render-exercises(exercises)

// ── End marker ──
#v(1fr)
#align(center)[
  #text(size: 10pt, weight: "bold", fill: luma(150))[— انتهى —]
]
