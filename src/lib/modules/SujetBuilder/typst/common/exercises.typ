#let safe-eval(content, mode: "markup") = {
  if content == "" or content == none { return [] }
  
  // Define common units as variables to avoid "unknown variable" errors in math eval
  let scope = (
    cm: 1cm, mm: 1mm, pt: 1pt, em: 1em,
  )
  
  let result = eval(content, mode: mode, scope: scope)
  result
}

#let render-block(b, is-solution) = {
  let m = b.at("mark", default: b.at("points", default: ""))
  
  let scope = (cm: 1cm, mm: 1mm, pt: 1pt, em: 1em)
  
  if b.type == "text" [
    #grid(columns: (1fr, auto), [
      #(if is-solution and b.at("answer", default: "") != "" {
        text(fill: blue)[#safe-eval(b.answer)]
      } else {
        text(size: 14pt)[#safe-eval(b.content)]
      })
    ], if is-solution and b.at("mark", default: "") != "" { align(bottom)[#text(size: 14pt, fill: red)[#b.mark ن]] } else { [] })
  ] else if b.type == "true_false" [
    #for item in b.items [
      #grid(columns: (1fr, auto), [
        - #eval(item.q, mode: "markup", scope: scope) #h(5pt) [#box(width: 35pt, align(center)[#(if is-solution { text(fill: blue)[#eval(item.a, mode: "markup", scope: scope)] } else { "........" })])] \
        #v(-2pt) #text(size: 10pt)[التصحيح: #(if is-solution and item.at("c", default: "") != "" { text(fill: blue)[#eval(item.c, mode: "markup", scope: scope)] } else { "........................................................................................................" })]
      ], if is-solution { align(bottom)[#text(size: 14pt, fill: red)[#item.mark ن]] } else { [] })
      #v(4pt)
    ]
  ] else if b.type == "multiple_choice" [
    #v(5pt)
    #stack(dir: ttb, spacing: 8pt,
      ..b.groups.map(g => [
        #grid(columns: (1fr, auto), [
          #text(weight: "bold")[#eval(g.header, mode: "markup", scope: scope)] \
          #h(15pt) #g.options.map(opt => [
            #let symbol = if is-solution and opt == g.correct { text(fill: blue)[×] } else { " " }
            #box(stroke: 0.5pt, width: 12pt, height: 12pt, radius: 2pt, align(center + horizon)[#v(-2pt)#symbol]) #h(4pt) #(if is-solution and opt == g.correct { text(fill: blue)[#eval(opt, mode: "markup", scope: scope)] } else { eval(opt, mode: "markup", scope: scope) })
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
          rect(width: 100%, stroke: 0.7pt, inset: 10pt, radius: 4pt)[#(if is-solution { text(fill: blue)[#eval(b.flow.at(2), mode: "markup", scope: scope)] } else { "..............." })],
          [ #h(10pt) $arrow.l$ #h(10pt) ],
          rect(width: 100%, stroke: 1.5pt + blue.darken(20%), inset: 12pt, radius: 4pt, fill: blue.lighten(95%))[#text(weight: "bold")[#eval(b.flow.at(1), mode: "markup", scope: scope)]],
          [ #h(10pt) $arrow.l$ #h(10pt) ],
          rect(width: 100%, stroke: 0.7pt, inset: 10pt, radius: 4pt)[#(if is-solution { text(fill: blue)[#eval(b.flow.at(0), mode: "markup", scope: scope)] } else { "..............." })]
        )
      ]
    ], if is-solution and m != "" { text(size: 14pt, fill: red)[#m ن] } else { [] })
  ] else if b.type == "labeling" [
    #grid(columns: (1fr, auto), [
      #grid(columns: (1fr, 1fr), gutter: 15pt,
        ..b.labels.map(l => [ - #(if is-solution { text(fill: blue)[#eval(l, mode: "markup", scope: scope)] } else { ".........................................." }) ])
      )
    ], if is-solution and m != "" { text(size: 14pt, fill: red)[#m ن] } else { [] })
  ] else if b.type == "table" [
    #v(5pt)
    #let t-align = b.at("align", default: "center")
    #let t-width = b.at("width", default: "full")
    #let t-borders = b.at("borders", default: "grid")
    #let t-header-bg = b.at("headerBackground", default: false)
    
    #let t-stroke = if t-borders == "grid" { 0.5pt } else if t-borders == "horizontal" { (x, y) => (bottom: 0.5pt, top: if y == 0 { 0.5pt } else { 0pt }) } else { none }
    #let t-fill = (x, y) => if y == 0 and t-header-bg { luma(240) } else { none }
    #let t-cols = if t-width == "full" { b.headers.map(x => 1fr) } else { b.headers.map(x => auto) }
    
    #let get-grid() = {
      let g = (b.headers,)
      if b.at("rows", default: none) != none {
        for r in b.rows { g.push(r) }
      } else {
        g.push(b.cells)
      }
      return g
    }
    
    #let process-grid(grid, is-sol) = {
      let out = ()
      for ri in range(grid.len()) {
        let row = grid.at(ri)
        for ci in range(row.len()) {
          // check if covered
          let covered = false
          for r in range(ri + 1) {
            for c in range(ci + 1) {
              if r == ri and c == ci { continue }
              if r >= grid.len() or c >= grid.at(r).len() { continue }
              let p-cell = grid.at(r).at(c)
              let is-d = type(p-cell) == dictionary
              let rs = if is-d { p-cell.at("rowspan", default: 1) } else { 1 }
              let cs = if is-d { p-cell.at("colspan", default: 1) } else { 1 }
              if r + rs > ri and c + cs > ci {
                covered = true
              }
            }
          }
          
          if not covered {
            let cell = row.at(ci)
            let is-dict = type(cell) == dictionary
            let rs = if is-dict { cell.at("rowspan", default: 1) } else { 1 }
            let cs = if is-dict { cell.at("colspan", default: 1) } else { 1 }
            let cb = if is-dict { cell.at("bold", default: false) } else { false }
            if ri == 0 { cb = true } // Headers
            
            let answer-str = if is-dict { cell.at("answer", default: "") } else { "" }
            let mark-str = if is-dict { cell.at("mark", default: "") } else { "" }
            let content-str = if is-dict { cell.at("content", default: "") } else { cell }
            
            let cell-styled = if is-sol and answer-str != "" {
              text(fill: blue)[#safe-eval(answer-str)]
            } else {
              safe-eval(content-str)
            }
            
            if cb { cell-styled = text(weight: "bold")[#cell-styled] }
            
            if is-sol and mark-str != "" {
              cell-styled = stack(dir: ttb, spacing: 5pt, cell-styled, align(left)[#text(size: 12pt, fill: red)[#mark-str ن]])
            }
            
            if cs > 1 or rs > 1 {
              out.push(table.cell(colspan: cs, rowspan: rs)[#cell-styled])
            } else {
              out.push(cell-styled)
            }
          }
        }
      }
      return out
    }

    #align(center)[
      #table(
        columns: t-cols,
        align: eval(t-align) + horizon,
        stroke: t-stroke,
        fill: t-fill,
        inset: 8pt,
        ..process-grid(get-grid(), is-solution)
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
      align(center)[$ #eval(b.content, mode: "math", scope: scope) $]
    } else {
      [$ #eval(b.content, mode: "math", scope: scope) $]
    })
  ] else if b.type == "image" [
    #if b.at("src", default: "") != "" {
      align(center)[
        #image(b.src, width: b.at("width", default: 80%))
        #if b.at("caption", default: "") != "" {
          text(size: 10pt, style: "italic")[#eval(b.caption, mode: "markup", scope: scope)]
        }
      ]
    }
  ] else if b.type == "typst_raw" [
    #grid(columns: (1fr, auto), [
      #(if is-solution and b.at("answer", default: "") != "" {
        text(fill: blue)[#safe-eval(b.answer)]
      } else {
        safe-eval(b.content)
      })
    ], if is-solution and b.at("mark", default: "") != "" { align(bottom)[#text(size: 14pt, fill: red)[#b.mark ن]] } else { [] })
  ] else if b.type == "columns" [
    #let children = b.at("children", default: ())
    #let n = children.len()
    #if n > 0 {
      let cols = b.at("widths", default: none)
      if cols == none { cols = range(n).map(_ => 1fr) } else { cols = cols.map(w => eval(w)) }
      grid(
        columns: cols,
        column-gutter: 12pt,
        ..children.map(child => [#render-block(child, is-solution)])
      )
    }
  ]
}

// render-exercises: iterates the array of exercises
#let render-exercises(exercises, is-solution: false) = {
  let ordinals = ("الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن")
  
  for (idx, ex) in exercises.enumerate() {
    v(10pt)
    block(breakable: true, width: 100%)[
      #grid(
        columns: (auto, 1fr),
        gutter: 10pt,
        align: horizon,
        text(size: 22pt, fill: if is-solution { green } else { blue })[▪],
        text(weight: "bold", size: 17pt)[#eval("التمرين " + ex.at("num", default: ordinals.at(idx, default: str(idx + 1))) + " : (" + str(ex.at("points", default: "0")) + " نقاط)", mode: "markup")],
      )
      #v(5pt)
      
      #if ex.at("instruction", default: "") != "" [
        #text(style: "italic", size: 13pt)[#eval(ex.instruction, mode: "markup", scope: scope)]
        #v(2pt)
      ]
      
      #let blocks = ex.at("blocks", default: ex.at("content", default: ()))
      #for b in blocks [
        #render-block(b, is-solution)
        #v(5pt)
      ]
    ]
  }
}

// render-solutions: specific wrapper for solution mode
#let render-solutions(solutions, exercises) = {
  render-exercises(exercises, is-solution: true)
}
