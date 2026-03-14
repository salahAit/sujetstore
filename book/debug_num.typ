#set text(dir: rtl, lang: "ar")

#let test(label, body) = {
  [#label: ]
  body
  v(0.5cm)
}

#let ch = "I"
#let sec = "1"

#test("Simple ch and sec joined", [#ch - #sec])
#test("Boxed ch and sec", box(ch) + " - " + box(sec))
#test("RLM between ch and sec", ch + "\u{200f}" + "-" + "\u{200f}" + sec)
#test("Arabic digits for section (breaks LTR run)", ch + "-" + "١")
