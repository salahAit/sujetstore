// common/illustrated_figure.typ — Textbook-Grade Illustrated Figure & Callout Legend for SujetStore
// Supports pure #FFFFFF Nano Banana plates (.jpg/.png) with crisp vector numbered pins and
// dual-mode legends ("labeled" reference mode or "quiz" fill-in-the-blank mode).
// Guarantees 0 FreeMono and proportional height capping so exam pagination stays tight.

#let render-illustrated-figure(
  b,
  is-solution,
  body-size: 13pt,
  is-ltr: false,
  eval-fn: none,
) = {
  let src = b.at("src", default: "")
  if src == "" { return [] }

  let title-str = b.at("title", default: "")
  let caption-str = b.at("caption", default: "")
  let pins = b.at("pins", default: ())
  let legend = b.at("legend", default: ())
  let legend-mode = b.at("legendMode", default: "labeled")
  let max-h-num = b.at("maxHeight", default: 142)
  let max-h = max-h-num * 1pt

  let w-raw = b.at("width", default: 68%)
  let w-frac = if type(w-raw) == ratio {
    w-raw / 100%
  } else if type(w-raw) == int or type(w-raw) == float {
    if w-raw <= 1.0 { w-raw } else if w-raw <= 100 { w-raw / 100.0 } else { calc.min(w-raw / 480.0, 0.92) }
  } else if type(w-raw) == str {
    if w-raw == "full" { 0.90 } else if w-raw == "half" { 0.50 } else if w-raw.ends-with("%") {
      float(w-raw.slice(0, w-raw.len() - 1)) / 100.0
    } else { 0.68 }
  } else {
    0.68
  }

  let render-txt(s) = {
    if eval-fn != none { eval-fn(s) } else { [#s] }
  }

  v(4pt)
  align(center)[
    #block(
      width: 96%,
      breakable: false,
      inset: (x: 8pt, y: 7pt),
      radius: 5pt,
      stroke: 0.65pt + rgb("#cbd5e1"),
      fill: rgb("#ffffff"),
    )[
      #if title-str != "" [
        #align(center)[
          #text(size: calc.max(body-size - 1pt, 10.5pt), weight: "bold", fill: rgb("#0f172a"))[#render-txt(title-str)]
        ]
        #v(4pt)
      ]

      #layout(avail => context {
        let target-w = avail.width * w-frac
        let probe = image(src, width: target-w)
        let probe-sz = measure(probe)
        let final-img = if probe-sz.height > max-h {
          image(src, height: max-h)
        } else {
          probe
        }
        let sz = measure(final-img)
        align(center)[
          #box(width: sz.width, height: sz.height)[
            #set align(top + left)
            #final-img
            #for p in pins {
              let px = float(p.at("xPct", default: 50))
              let py = float(p.at("yPct", default: 50))
              let pcol = p.at("color", default: "#1d4ed8")
              let pnum = str(p.at("num", default: "1"))
              place(
                top + left,
                dx: sz.width * (px / 100.0) - 8pt,
                dy: sz.height * (py / 100.0) - 8pt,
              )[
                #circle(radius: 8pt, fill: rgb(pcol), stroke: 1.3pt + white)[
                  #set text(dir: ltr, fill: white, size: 8.5pt, weight: "bold")
                  #align(center + horizon)[#pnum]
                ]
              ]
            }
          ]
        ]
      })

      #if legend.len() > 0 [
        #v(5pt)
        #line(length: 100%, stroke: 0.45pt + rgb("#e2e8f0"))
        #v(4pt)
        #let ncols = if legend.len() == 1 { 1 } else if legend.len() <= 4 { 2 } else { 3 }
        #set text(size: calc.max(body-size - 2.2pt, 9.5pt))
        #grid(
          columns: (1fr,) * ncols,
          column-gutter: 8pt,
          row-gutter: 5pt,
          align: if is-ltr { left + horizon } else { right + horizon },
          ..legend.map(it => {
            let inum = str(it.at("num", default: ""))
            let ilabel = str(it.at("label", default: ""))
            let imark = str(it.at("mark", default: ""))
            let badge = if inum != "" {
              box(baseline: 2.5pt)[
                #circle(radius: 6.8pt, fill: rgb("#1e40af"))[
                  #set text(dir: ltr, fill: white, size: 7.8pt, weight: "bold")
                  #align(center + horizon)[#inum]
                ]
              ]
            } else { [] }
            let val = if legend-mode == "quiz" {
              if is-solution {
                [#text(fill: rgb("#1d4ed8"), weight: "bold")[#render-txt(ilabel)] #(if imark != "" { text(fill: red, size: 8.5pt)[(#imark)] } else { [] })]
              } else {
                box(width: 6.2em, baseline: 1pt)[#repeat(gap: 1.8pt)[.]]
              }
            } else {
              [#text(fill: rgb("#1e293b"))[#render-txt(ilabel)]]
            }
            if is-ltr {
              [#badge #h(3pt) #val]
            } else {
              [#badge #h(3pt) #val]
            }
          })
        )
      ]

      #if caption-str != "" [
        #v(3pt)
        #align(center)[
          #text(size: calc.max(body-size - 2.5pt, 9.2pt), style: "italic", fill: rgb("#475569"))[#render-txt(caption-str)]
        ]
      ]
    ]
  ]
}
