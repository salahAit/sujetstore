// ============================================
// primary/taqweem.typ — تقويم المكتسبات (Primary School)
// SujetBuilder Module
// ============================================

#import "../../common/styles.typ": *
#import "../../common/header.typ": exam-header
#import "../../common/footer.typ": exam-footer
#import "../../common/exercises.typ": render-exercises

// Parse JSON data from sys.inputs
#let raw-data = sys.inputs.at("data", default: "{}")
#let data = json(bytes(raw-data))

#let metadata = data.at("metadata", default: (:))
#let exercises = data.at("exercises", default: ())

// Override doc type display for primary
#let taqweem-metadata = metadata
// The header will use the docType from metadata

// Apply page setup with larger font for primary students
#show: body => {
  page-setup(body)
}

// Override text size for primary school (larger, more readable)
#set text(size: 14pt)

#exam-footer(site-url: metadata.at("siteUrl", default: "sujetstore.com"))

// ── Header ──
#exam-header(metadata)

// ── Decorative title ──
#align(center)[
  #block(
    inset: 10pt,
    stroke: 1pt + luma(180),
    radius: 6pt,
    fill: luma(248),
  )[
    #text(size: 12pt, weight: "bold")[
      ✏️ أجب عن الأسئلة التالية بخط واضح ومرتب
    ]
  ]
]
#v(1em)

// ── Exercises (with primary-friendly spacing) ──
#set par(leading: 1em)
#render-exercises(exercises)

// ── End marker ──
#v(1fr)
#align(center)[
  #text(size: 12pt, weight: "bold", fill: luma(150))[🌟 بالتوفيق 🌟]
]
