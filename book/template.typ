#import "theme.typ": *

// دالة الترقيم الموحدة (I-1) لضمان اتساق المظهر العربي
#let technical-num(..nums) = {
  let n = nums.pos()
  if n.len() == 1 {
    numbering("I", n.at(0))
  } else {
    // تنسيق الترقيم ليكون الفصل (روماني) أولاً ثم القسم (عربي)
    // نستخدم صناديق منفصلة لضمانفاظ الترتيب الصحيح في التدفق من اليمين لليسار
    let ch = numbering("I", n.at(0))
    let sec = numbering("1", n.at(1))
    [#box(ch)-#box(sec)]
  }
}

#let book-template(body) = {
  // --- Global Document Rules ---
  set document(title: "SujetStore Technical Manual", author: "SujetStore Team")
  
  set text(
    lang: "ar",
    size: 11pt,
    font: main-font,
    dir: rtl,
    fill: text-dark
  )
  
  // Force RTL for everything, including the outline and headings
  show outline: set text(dir: rtl)
  set outline(indent: 1.5em)
  
  set page(
    paper: "a4",
    margin: (x: 2.5cm, y: 3cm),
    header: context {
      if counter(page).get().first() > 1 {
        let elems = query(selector(heading.where(level: 1)).before(here()))
        if elems.len() > 0 {
          let current-chap = elems.last().body
          grid(
            columns: (1fr, 1fr),
            align(right, text(fill: primary, weight: "bold", size: 9pt)[#current-chap]),
            align(left, text(fill: secondary, size: 9pt)[SUJETSTORE | ٢٠٢٦])
          )
          v(0.2cm)
          line(length: 100%, stroke: 0.5pt + primary.lighten(70%))
        }
      }
    },
    footer: context {
      if counter(page).get().first() > 1 {
        align(center, text(fill: primary, weight: "bold")[#counter(page).display("1")])
      }
    }
  )

  // --- Professional Numbering & Heading Styles ---
  set heading(numbering: technical-num)
  
  // Chapter (Level 1)
  show heading.where(level: 1): it => {
    pagebreak(weak: true)
    v(4cm)
    block(width: 100%)[
      #text(size: 18pt, weight: "bold", fill: secondary)[الفصل #counter(heading).display()]
      #v(0.2cm)
      #line(length: 100%, stroke: 2pt + primary)
      #v(0.4cm)
      #text(size: 32pt, weight: "bold", fill: primary)[#it.body]
      #v(2cm)
    ]
  }

  // Section (Level 2)
  show heading.where(level: 2): it => {
    v(1cm)
    block(width: 100%)[
      #text(size: 18pt, weight: "bold", fill: primary)[
        #if it.numbering != none {
          counter(heading).display(it.numbering)
          h(0.3cm)
        }
        #it.body
      ]
      #v(0.1cm)
      #line(length: 30%, stroke: 1pt + secondary.lighten(50%))
    ]
    v(0.5cm)
  }
  
  set par(justify: true, leading: 1.2em, spacing: 1.5em)
  
  // Style Figures (Images)
  show figure: set block(above: 2em, below: 2em)
  show figure.caption: set text(size: 9pt, style: "italic", fill: primary.lighten(20%))

  body
}

// Cover Page Function
#let cover-page() = {
  page(background: none, margin: 0cm)[
    #place(right + top)[ #rect(width: 1.5cm, height: 100%, fill: rgb("#064E3B")) ]
    #place(right + top, dx: -1.5cm)[ #rect(width: 2pt, height: 100%, fill: rgb("#B48A32")) ]
    
    #set align(center)
    #block(width: 100%, height: 100%, inset: (right: 3cm, left: 2cm, top: 4cm, bottom: 2cm))[
      #v(1cm)
      #image("logo.png", width: 4.5cm)
      #v(2cm)
      #text(size: 60pt, weight: "bold", fill: rgb("#064E3B"))[SujetStore]
      #v(-0.8cm)
      #text(size: 32pt, weight: "bold", fill: rgb("#B48A32"))[سوجيستور]
      #v(1.5cm)
      #line(length: 40%, stroke: 1.5pt + rgb("#064E3B").lighten(80%))
      #v(1cm)
      #text(size: 26pt, weight: "bold", fill: rgb("#111827"))[الدليل التقني الشامل]
      #v(0.5cm)
      #text(size: 15pt, fill: rgb("#111827").lighten(40%))[منصة الأرشيف التعليمي المتطورة للمنهج الجزائري]
      #v(5cm)
      #grid(columns: (1fr, 1fr), gutter: 1cm,
        align(right, [ #text(weight: "bold", fill: rgb("#B48A32"), size: 10pt)[الإصدار التقني]\ #text(size: 11pt)[٢.٠ — مارس ٢٠٢٦] ]),
        align(left, [ #text(weight: "bold", fill: rgb("#B48A32"), size: 10pt)[فريق العمل]\ #text(size: 11pt)[فريق سوجيستور] ])
      )
    ]
  ]
}
