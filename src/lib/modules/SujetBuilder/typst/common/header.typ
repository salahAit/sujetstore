// ============================================
// header.typ — Official Algerian Exam Header
// SujetBuilder Module
// ============================================

#import "styles.typ": *

// Main header function
// Renders the official-style header used in BEM/BAC exams
#let exam-header(data) = {
  let academic-year = data.at("academicYear", default: "2024/2025")
  let duration = data.at("duration", default: "")
  let level-name = data.at("yearName", default: "")
  let stream-name = data.at("streamName", default: none)
  let subject-name = data.at("subjectName", default: "")
  let doc-type = data.at("docType", default: "test")
  let trimester-name = data.at("trimesterName", default: "")
  let school-name = data.at("schoolName", default: none)
  let site-url = data.at("siteUrl", default: "sujetstore.com")

  // Determine exam title
  let exam-title = if doc-type == "exam" {
    "اختبار"
  } else {
    "فرض"
  }
  let full-title = exam-title + " " + trimester-name

  // Build the header block
  block(width: 100%, stroke: 1.5pt, inset: 0pt)[
    // Top row: School info + Academic year
    #block(width: 100%, inset: (x: 12pt, y: 8pt))[
      #grid(
        columns: (1fr, 1fr),
        align: (right, left),
        [
          #if school-name != none [
            #text(size: 11pt, weight: "bold")[#school-name]
            #linebreak()
          ]
          #text(size: 10pt)[المستوى: *#level-name*]
          #if stream-name != none [
            #linebreak()
            #text(size: 10pt)[الشعبة: *#stream-name*]
          ]
        ],
        [
          #text(size: 11pt)[السنة الدراسية: *#academic-year*]
          #linebreak()
          #text(size: 10pt)[المدة: *#duration*]
        ],
      )
    ]

    // Separator line
    #line(length: 100%, stroke: 0.8pt)

    // Center: Exam title + Subject
    #block(width: 100%, inset: (x: 12pt, y: 10pt))[
      #align(center)[
        #text(size: 16pt, weight: "bold")[#full-title]
        #linebreak()
        #v(4pt)
        #text(size: 14pt, weight: "bold")[في مادة: #subject-name]
      ]
    ]

    // Bottom decorative line
    #line(length: 100%, stroke: 0.5pt)

    // Footer with site branding
    #block(width: 100%, inset: (x: 12pt, y: 4pt), fill: luma(245))[
      #align(center)[
        #text(size: 8pt, fill: luma(120))[#site-url]
      ]
    ]
  ]

  v(1em)
}
