// ============================================
// footer.typ — Page Footer
// SujetBuilder Module
// ============================================

// Page footer with page numbers and platform URL
#let exam-footer(site-url: "sujetstore.com") = {
  set page(
    footer: context {
      let current = counter(page).get().first()
      let total = counter(page).final().first()
      block(width: 100%)[
        #line(length: 100%, stroke: 0.3pt + luma(200))
        #v(2pt)
        #grid(
          columns: (1fr, 1fr),
          align: (right, left),
          text(size: 8pt, fill: luma(130))[#site-url],
          text(size: 9pt)[صفحة #current من #total],
        )
      ]
    }
  )
}
