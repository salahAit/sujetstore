#set text(dir: rtl)
#let t-align = "right"
#let t-width = "full"
#let b = (headers: ("أ", "ب"))

#align(eval(t-align))[
  #table(
    columns: if t-width == "full" { b.headers.map(x => 1fr) } else { b.headers.map(x => auto) },
    align: eval(t-align) + horizon,
    [1], [2], [3], [4]
  )
]
