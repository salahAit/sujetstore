// render-block: renders a single content block (exam or solution mode)
// Adapted from exam_1/template_logic.typ official design

#let render-block(b, is-solution) = {
  let m = b.at("mark", default: b.at("points", default: ""))
  
  if b.type == "text" [
    #grid(columns: (1fr, auto), [
      #(if is-solution and b.at("answer", default: "") != "" {
        text(fill: blue)[#b.answer]
      } else {
        text(size: 14pt)[#b.content]
      })
    ], if is-solution and b.at("mark", default: "") != "" { align(bottom)[#text(size: 14pt, fill: red)[#b.mark ن]] } else { [] })
  ] else if b.type == "true_false" [
    #for item in b.items [
      #grid(columns: (1fr, auto), [
        - #item.q #h(5pt) [#box(width: 35pt, align(center)[#(if is-solution { text(fill: blue)[#item.a] } else { "........" })])] \
        #v(-2pt) #text(size: 10pt)[التصحيح: #(if is-solution and item.at("c", default: "") != "" { text(fill: blue)[#item.c] } else { "........................................................................................................" })]
      ], if is-solution { align(bottom)[#text(size: 14pt, fill: red)[#item.mark ن]] } else { [] })
      #v(4pt)
    ]
  ] else if b.type == "multiple_choice" [
    #v(5pt)
    #stack(dir: ttb, spacing: 8pt,
      ..b.groups.map(g => [
        #grid(columns: (1fr, auto), [
          #text(font: "Noto Naskh Arabic", weight: "bold")[#g.header] \
          #h(15pt) #g.options.map(opt => [
            #let symbol = if is-solution and opt == g.correct { text(fill: blue)[×] } else { " " }
            #box(stroke: 0.5pt, width: 12pt, height: 12pt, radius: 2pt, align(center + horizon)[#v(-2pt)#symbol]) #h(4pt) #(if is-solution and opt == g.correct { text(fill: blue)[#opt] } else { opt })
          ]).join(h(20pt))
        ], if is-solution and g.at("mark", default: "") != "" { text(size: 14pt, fill: red)[#g.mark ن] } else { [] })
      ]))
  ] else if b.type == "diagram_flow" [
    #v(5pt)
    #grid(columns: (1fr, auto), [
      #align(center)[
        #grid(
          columns: (1fr, auto, 1.2fr, auto, 1fr), 
          align: center + horizon, 
          rect(width: 100%, stroke: 0.7pt, inset: 10pt, radius: 4pt)[#(if is-solution { text(fill: blue)[#b.flow.at(2)] } else { "..............." })],
          [ #h(10pt) $arrow.l$ #h(10pt) ],
          rect(width: 100%, stroke: 1.5pt + blue.darken(20%), inset: 12pt, radius: 4pt, fill: blue.lighten(95%))[#text(weight: "bold")[#b.flow.at(1)]],
          [ #h(10pt) $arrow.l$ #h(10pt) ],
          rect(width: 100%, stroke: 0.7pt, inset: 10pt, radius: 4pt)[#(if is-solution { text(fill: blue)[#b.flow.at(0)] } else { "..............." })]
        )
      ]
    ], if is-solution and m != "" { text(size: 14pt, fill: red)[#m ن] } else { [] })
  ] else if b.type == "labeling" [
    #grid(columns: (1fr, auto), [
      #grid(columns: (1fr, 1fr), gutter: 15pt,
        ..b.labels.map(l => [ - #(if is-solution { text(fill: blue)[#l] } else { ".........................................." }) ])
      )
    ], if is-solution and m != "" { text(size: 14pt, fill: red)[#m ن] } else { [] })
  ] else if b.type == "table" [
    #v(5pt)
    #align(center)[
      #table(
        columns: b.headers.map(x => 1fr),
        align: center,
        stroke: 0.5pt,
        inset: 8pt,
        ..b.headers.map(h => [ #text(font: "Noto Naskh Arabic", weight: "bold")[#h] ]),
        ..b.cells.map(c => [
          #(if type(c) == dictionary {
            stack(dir: ttb, spacing: 5pt,
              if is-solution { text(fill: blue)[#c.answer] } else { c.content },
              if is-solution and c.at("mark", default: "") != "" { align(left)[#text(size: 12pt, fill: red)[#c.mark ن]] }
            )
          } else { c })
        ])
      )
    ]
  ] else if b.type == "image_grid" [
    #v(5pt)
    #align(center)[
      #table(
        columns: (1fr,) * b.columns,
        align: center + horizon,
        stroke: 0.5pt,
        gutter: 0pt,
        ..b.items.map(it => [
          #box(width: 100%, height: 80pt, inset: 0pt)[#image(it.src, fit: "contain")]
        ]),
        ..b.items.map(it => [
          #set text(size: 11pt)
          #stack(dir: ttb, spacing: 3pt,
            if is-solution { text(fill: blue)[#it.answer] } else { it.label },
            if is-solution and it.at("mark", default: "") != "" { text(size: 12pt, fill: red)[#it.mark ن] }
          )
        ])
      )
    ]
  ] else if b.type == "math" [
    #(if b.at("display", default: false) {
      align(center)[$ #eval(b.content, mode: "math") $]
    } else {
      [$ #eval(b.content, mode: "math") $]
    })
  ] else if b.type == "image" [
    #if b.at("src", default: "") != "" {
      align(center)[
        #image(b.src, width: b.at("width", default: 80%))
        #if b.at("caption", default: "") != "" {
          text(size: 10pt, style: "italic")[#b.caption]
        }
      ]
    }
  ]
}
