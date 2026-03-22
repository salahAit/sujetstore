// logic.typ - النسخة النهائية المستقرة (استعادة التنسيقات الأصلية + القالب الديناميكي)
#let db = json("data.json")

#let render_block(b, is_solution) = {
  let m = b.at("mark", default: b.at("points", default: ""))
  
  if b.type == "text" [
    #grid(columns: (1fr, auto), [
      #(if is_solution and b.at("answer", default: "") != "" {
        text(fill: blue)[#b.answer]
      } else {
        text(size: 14pt)[#b.content]
      })
    ], if is_solution and b.at("mark", default: "") != "" { align(bottom)[#text(size: 14pt, fill: red)[#b.mark ن]] } else { [] })
  ] else if b.type == "true_false" [
    #for item in b.items [
      #grid(columns: (1fr, auto), [
        - #item.q #h(5pt) [#box(width: 35pt, align(center)[#(if is_solution { text(fill: blue)[#item.a] } else { "........" })])] \
        #v(-2pt) #text(size: 10pt)[التصحيح: #(if is_solution and item.at("c", default: "") != "" { text(fill: blue)[#item.c] } else { "........................................................................................................" })]
      ], if is_solution { align(bottom)[#text(size: 14pt, fill: red)[#item.mark ن]] } else { [] })
      #v(4pt)
    ]
  ] else if b.type == "multiple_choice" [
    #v(5pt)
    #stack(dir: ttb, spacing: 8pt,
      ..b.groups.map(g => [
        #grid(columns: (1fr, auto), [
          #text(font: "Noto Naskh Arabic", weight: "bold")[#g.header] \
          #h(15pt) #g.options.map(opt => [
            #let symbol = if is_solution and opt == g.correct { text(fill: blue)[×] } else { " " }
            #box(stroke: 0.5pt, width: 12pt, height: 12pt, radius: 2pt, align(center + horizon)[#v(-2pt)#symbol]) #h(4pt) #(if is_solution and opt == g.correct { text(fill: blue)[#opt] } else { opt })
          ]).join(h(20pt))
        ], if is_solution and g.at("mark", default: "") != "" { text(size: 14pt, fill: red)[#g.mark ن] } else { [] })
      ])
    )
  ] else if b.type == "diagram_flow" [
    #v(5pt)
    #grid(columns: (1fr, auto), [
      #align(center)[
        #grid(
          columns: (1fr, auto, 1.2fr, auto, 1fr), 
          align: center + horizon, 
          rect(width: 100%, stroke: 0.7pt, inset: 10pt, radius: 4pt)[#(if is_solution { text(fill: blue)[#b.flow.at(2)] } else { "..............." })],
          [ #h(10pt) $arrow.l$ #h(10pt) ],
          rect(width: 100%, stroke: 1.5pt + blue.darken(20%), inset: 12pt, radius: 4pt, fill: blue.lighten(95%))[#text(weight: "bold")[#b.flow.at(1)]],
          [ #h(10pt) $arrow.l$ #h(10pt) ],
          rect(width: 100%, stroke: 0.7pt, inset: 10pt, radius: 4pt)[#(if is_solution { text(fill: blue)[#b.flow.at(0)] } else { "..............." })]
        )
      ]
    ], if is_solution and m != "" { text(size: 14pt, fill: red)[#m ن] } else { [] })
  ] else if b.type == "labeling" [
    #grid(columns: (1fr, auto), [
      #grid(columns: (1fr, 1fr), gutter: 15pt,
        ..b.labels.map(l => [ - #(if is_solution { text(fill: blue)[#l] } else { ".........................................." }) ])
      )
    ], if is_solution and m != "" { text(size: 14pt, fill: red)[#m ن] } else { [] })
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
              if is_solution { text(fill: blue)[#c.answer] } else { c.content },
              if is_solution and c.at("mark", default: "") != "" { align(left)[#text(size: 12pt, fill: red)[#c.mark ن]] }
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
            if is_solution { text(fill: blue)[#it.answer] } else { it.label },
            if is_solution and it.at("mark", default: "") != "" { text(size: 12pt, fill: red)[#it.mark ن] }
          )
        ])
      )
    ]
  ]
}

#let official_template(is_solution: false) = {
  set page(
    paper: "a4",
    margin: (top: 0.8cm, bottom: 2.0cm, x: 1.5cm),
    footer: context [
      #set text(size: 9pt, font: "Noto Naskh Arabic")
      #line(length: 100%, stroke: 0.5pt + gray)
      #v(-5pt)
      #grid(
        columns: (1fr, 1fr, 1fr),
        align: horizon,
        align(right)[#box(width: 25pt, height: 25pt, stroke: none, inset: 0pt)[#image("qrcode.png", width: 100%, height: 100%, fit: "contain")]],
        align(center)[#text(font: "Noto Naskh Arabic", size: 10pt)[صفحة #counter(page).display() من #counter(page).final().at(0)]],
        align(left)[#stack(dir: ltr, spacing: 5pt,
          link("https://sujetstore.com/")[#box(width: 25pt, height: 25pt, stroke: none, inset: 0pt)[#image("logo.png", width: 100%, height: 100%, fit: "contain")]],
          align(horizon)[#text(fill: blue)[#link("https://sujetstore.com/")[https://sujetstore.com]]]
        )]
      )
    ],
  )

  set text(font: "Noto Naskh Arabic", lang: "ar", region: "dz", dir: rtl, size: 16pt, weight: "regular")
  show math.equation: set text(font: "New Computer Modern Math", dir: ltr)

  // العناصر العائمة
  place(top + left, dx: 0pt, dy: -5pt)[#stack(dir: ltr, spacing: 5pt,
    link("https://sujetstore.com/")[#box(width: 25pt, height: 25pt, stroke: none, inset: 0pt)[#image("logo.png", width: 100%, height: 100%, fit: "contain")]],
    align(horizon)[#text(size: 9pt, fill: blue)[#link("https://sujetstore.com/")[https://sujetstore.com]]]
  )]
  place(top + right, dx: 0pt, dy: -5pt)[#stack(dir: ttb, spacing: 2pt, box(width: 35pt, height: 35pt, stroke: 0.5pt + gray, radius: 2pt, inset: 2pt)[#image("qrcode.png")], align(center)[#text(size: 5pt, fill: gray)[امسح للمزيد]])]

  // الترويسة (الرجوع للتنسيق الأصلي)
  v(7pt)
  align(center)[#text(font: "Noto Naskh Arabic", size: 18pt, weight: "bold")[منصة سوجيستور للنجاح] \ #text(font: "Noto Naskh Arabic", size: 9pt, weight: "bold")[من أجل تلميذ جزائري مميز]]
  v(0pt)
  grid(columns: (1fr, auto, 1fr), column-gutter: 5pt, align: horizon,
    align(right)[#set par(leading: 0.4em); #text(font: "Noto Naskh Arabic", weight: "bold")[#db.metadata.exam_type] \ #text(font: "Noto Naskh Arabic", weight: "bold")[#db.metadata.branch]],
    align(center)[#link("https://sujetstore.com/")[#image("logo.png", width: 2.2cm, fit: "contain")]],
    align(left)[#set par(leading: 0.4em); #text(font: "Noto Naskh Arabic", weight: "bold")[#db.metadata.date] \ #text(font: "Noto Naskh Arabic", weight: "bold")[المدة: #db.metadata.duration]]
  )
  v(1pt)
  align(center)[
    #line(length: 100%, stroke: 1.2pt)
    #v(-5pt)
    #text(font: "Noto Naskh Arabic", size: 16pt, weight: "bold")[#db.metadata.exam_type في مادة: #db.metadata.subject #(if is_solution {" - الإجابة النموذجية"} else {""})]
    #v(-5pt)
    #line(length: 100%, stroke: 1.2pt)
  ]
  v(2pt)

  for ex in db.topics.at(0).exercises {
    v(2pt)
    block(breakable: true, width: 100%)[
      #grid(
        columns: (auto, 1fr),
        gutter: 10pt,
        align: horizon,
        text(size: 22pt, fill: if is_solution { green } else { blue })[▪],
        text(font: "Noto Naskh Arabic", weight: "bold", size: 17pt)[التمرين #ex.num : (#ex.points نقاط)],
      )
      #v(2pt)
      
      #block(width: 100%, inset: (right: 15pt))[
        #if ex.keys().contains("instruction") and ex.instruction != "" [
          #text(style: "italic", size: 13pt)[#ex.instruction]
          #v(2pt)
        ]
        
        #for block in ex.blocks [
          #render_block(block, is_solution)
          #v(2pt)
        ]
      ]
    ]
  }
  v(1fr)
  align(center)[#text(weight: "bold")[#("انتهى الموضوع")]]
}
