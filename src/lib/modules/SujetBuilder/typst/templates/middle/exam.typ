// ============================================
// middle/exam.typ — اختبار (Middle School Exam)
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

// ── Exam-specific: Total points summary ──
#let total-points = exercises.map(ex => ex.at("points", default: 0)).sum(default: 0)
#align(center)[
  #block(inset: 8pt, stroke: 0.5pt + luma(180), radius: 3pt)[
    #text(size: 10pt)[
      *الموضوع يتكون من #str(exercises.len()) تمارين — المجموع: #str(total-points) نقطة*
    ]
  ]
]
#v(0.5em)

// ── Instructions ──
#align(center)[
  #text(size: 10pt, style: "italic", fill: luma(100))[
    على المترشح أن يجيب على جميع التمارين • يُراعى الترتيب والتنظيم في الإجابة
  ]
]
#v(0.8em)

// ── Exercises ──
#render-exercises(exercises)

// ── End marker ──
#v(1fr)
#align(center)[
  #text(size: 10pt, weight: "bold", fill: luma(150))[— انتهى —]
]
