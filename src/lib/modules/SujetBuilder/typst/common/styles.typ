// ============================================
// styles.typ — Global Page & Typography Setup
// SujetBuilder Module
// ============================================

// Page configuration
#let page-setup(body) = {
  set page(
    paper: "a4",
    margin: (top: 2cm, bottom: 2cm, left: 1.8cm, right: 1.8cm),
    numbering: "1 / 1",
  )
  set text(
    font: "Amiri",
    size: 12pt,
    lang: "ar",
    dir: rtl,
  )
  set par(
    justify: true,
    leading: 0.8em,
  )

  // Heading styles
  show heading.where(level: 1): set text(size: 16pt, weight: "bold")
  show heading.where(level: 2): set text(size: 14pt, weight: "bold")
  show heading.where(level: 3): set text(size: 12pt, weight: "bold")

  body
}

// Arabic ordinal names for exercises
#let exercise-ordinals = (
  "الأول",
  "الثاني",
  "الثالث",
  "الرابع",
  "الخامس",
  "السادس",
  "السابع",
  "الثامن",
  "التاسع",
  "العاشر",
)

// Format exercise header with points
// e.g. "التمرين الأول: (06 نقاط)"
#let exercise-header(index, points) = {
  let ordinal = if index < exercise-ordinals.len() {
    exercise-ordinals.at(index)
  } else {
    str(index + 1)
  }
  let points-str = if points < 10 {
    "0" + str(points)
  } else {
    str(points)
  }
  let points-label = if points == 1 { "نقطة" } else if points == 2 { "نقطتان" } else { "نقاط" }

  block(width: 100%, above: 1.5em, below: 1em)[
    #set text(weight: "bold", size: 13pt)
    #underline[التمرين #ordinal: (#points-str #points-label)]
  ]
}

// Table styling for exam tables
#let exam-table(headers, rows) = {
  let header-cells = headers.map(h => [*#h*])
  let all-rows = rows.map(row => row.map(cell => [#cell]))

  table(
    columns: headers.len(),
    inset: 8pt,
    align: center + horizon,
    fill: (x, y) => if y == 0 { luma(230) } else { none },
    stroke: 0.5pt,
    ..header-cells,
    ..all-rows.flatten(),
  )
}

// Sub-question numbering (Arabic Eastern numerals)
#let sub-question(index, content) = {
  let arabic-nums = ("١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "١٠")
  let num = if index < arabic-nums.len() {
    arabic-nums.at(index)
  } else {
    str(index + 1)
  }
  block(above: 0.5em)[
    #text(weight: "bold")[#num) ] #content
  ]
}

// Horizontal separator line
#let separator() = {
  v(0.5em)
  line(length: 100%, stroke: 0.5pt + luma(180))
  v(0.5em)
}
