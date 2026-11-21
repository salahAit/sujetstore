// common/islamic_blocks.typ — Dignified Shariah & Quranic Typst Components for SujetStore
// Uses KFGQPC Uthman Taha Naskh (static/fonts/UthmanTN_v2-0.ttf) for Quranic verses with ﴿ ... ﴾
// Guarantees 0 FreeMono and 100% crisp embedded glyphs across all templates and RAM rebuilds.

#let quran-font = ("KFGQPC Uthman Taha Naskh", "Arabic Transparent")

#let quran-box(
  verses: "",
  surah: "",
  ayah-range: "",
  label: "قال الله تعالى:",
  vocabulary: (),
) = {
  block(
    width: 100%,
    breakable: false,
    inset: (x: 12pt, y: 10pt),
    radius: 4pt,
    stroke: (right: 3pt + rgb("#047857"), top: 0.7pt + rgb("#a7f3d0"), bottom: 0.7pt + rgb("#a7f3d0"), left: 0.7pt + rgb("#a7f3d0")),
    fill: rgb("#f0fdf4"),
  )[
    #if label != "" [
      #text(size: 13pt, weight: "bold", fill: rgb("#065f46"))[#label]
      #v(4pt)
    ]
    #align(center)[
      #par(leading: 0.88em, justify: false)[
        #text(font: quran-font, size: 15.5pt, fill: rgb("#0f172a"))[﴿#verses﴾]
      ]
    ]
    #if surah != "" [
      #v(4pt)
      #align(left)[
        #text(size: 11.5pt, weight: "bold", fill: rgb("#065f46"))[
          [سورة #surah#(if ayah-range != "" { ": " + ayah-range } else { "" })]
        ]
      ]
    ]
    #if vocabulary.len() > 0 [
      #v(5pt)
      #line(length: 100%, stroke: 0.45pt + rgb("#a7f3d0"))
      #v(3pt)
      #text(size: 12pt, fill: rgb("#1e293b"))[
        #strong[شرح المفردات:] #vocabulary.map(v => [#strong[#v.at(0)]: #v.at(1)]).join([ — ])
      ]
    ]
  ]
}

#let hadith-box(
  narrator: "",
  text-body: "",
  source: "",
  label: "السند النبوي الشريف:",
  vocabulary: (),
) = {
  block(
    width: 100%,
    breakable: false,
    inset: (x: 12pt, y: 10pt),
    radius: 4pt,
    stroke: (right: 3pt + rgb("#b45309"), top: 0.7pt + rgb("#fde68a"), bottom: 0.7pt + rgb("#fde68a"), left: 0.7pt + rgb("#fde68a")),
    fill: rgb("#fffbeb"),
  )[
    #if label != "" [
      #text(size: 13pt, weight: "bold", fill: rgb("#92400e"))[#label]
      #v(3pt)
    ]
    #par(leading: 0.76em, justify: true)[
      #if narrator != "" [#text(size: 13.5pt, fill: rgb("#1e293b"))[#narrator] ]
      #text(size: 14pt, weight: "bold", fill: rgb("#0f172a"))[«#text-body»]
    ]
    #if source != "" [
      #v(4pt)
      #align(left)[
        #text(size: 11.5pt, weight: "bold", fill: rgb("#92400e"))[[#source]]
      ]
    ]
    #if vocabulary.len() > 0 [
      #v(5pt)
      #line(length: 100%, stroke: 0.45pt + rgb("#fde68a"))
      #v(3pt)
      #text(size: 12pt, fill: rgb("#1e293b"))[
        #strong[شرح المفردات:] #vocabulary.map(v => [#strong[#v.at(0)]: #v.at(1)]).join([ — ])
      ]
    ]
  ]
}

#let islamic-rubric-table(
  headers: (),
  rows: (),
  inset: 7pt,
) = {
  let n-cols = headers.len()
  if n-cols == 0 { return [] }
  align(center)[
    #table(
      columns: (1fr,) * n-cols,
      align: right + horizon,
      stroke: 0.6pt + rgb("#94a3b8"),
      inset: inset,
      fill: (x, y) => if y == 0 { rgb("#ecfdf5") } else { none },
      ..headers.map(h => text(weight: "bold", fill: rgb("#065f46"))[#h]),
      ..rows.flatten().map(c => if c == "..." {
        box(width: 100%)[#repeat(gap: 1.8pt)[.]]
      } else {
        [#c]
      })
    )
  ]
}
