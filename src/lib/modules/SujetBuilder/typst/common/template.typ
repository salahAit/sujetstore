// official-template — القالب الرئيسي لمنصة سوجيستور
// مُستخرج من exam_1/template_logic.typ ومُكيّف مع SujetBuilder

#import "exercises.typ": render-block

#let official-template(data, is-solution: false) = {
  // ─────── إعداد الصفحة ───────
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

  // ─────── العناصر العائمة (أعلى الصفحة) ───────
  place(top + left, dx: 0pt, dy: -5pt)[#stack(dir: ltr, spacing: 5pt,
    link("https://sujetstore.com/")[#box(width: 25pt, height: 25pt, stroke: none, inset: 0pt)[#image("logo.png", width: 100%, height: 100%, fit: "contain")]],
    align(horizon)[#text(size: 9pt, fill: blue)[#link("https://sujetstore.com/")[https://sujetstore.com]]]
  )]
  place(top + right, dx: 0pt, dy: -5pt)[#stack(dir: ttb, spacing: 2pt, box(width: 35pt, height: 35pt, stroke: 0.5pt + gray, radius: 2pt, inset: 2pt)[#image("qrcode.png")], align(center)[#text(size: 5pt, fill: gray)[امسح للمزيد]])]

  // ─────── الترويسة ───────
  v(7pt)
  align(center)[#text(font: "Noto Naskh Arabic", size: 18pt, weight: "bold")[منصة سوجيستور للنجاح] \ #text(font: "Noto Naskh Arabic", size: 9pt, weight: "bold")[من أجل تلميذ جزائري مميز]]
  v(0pt)
  grid(columns: (1fr, auto, 1fr), column-gutter: 5pt, align: horizon,
    align(right)[#set par(leading: 0.4em); 
      #text(font: "Noto Naskh Arabic", weight: "bold")[#data.metadata.at("docType", default: data.metadata.at("exam_type", default: "فرض"))] \ 
      #text(font: "Noto Naskh Arabic", weight: "bold")[#data.metadata.at("trimesterName", default: "")] \
      #text(font: "Noto Naskh Arabic", weight: "bold")[#data.metadata.at("yearName", default: data.metadata.at("branch", default: ""))]],
    align(center)[#link("https://sujetstore.com/")[#image("logo.png", width: 2.2cm, fit: "contain")]],
    align(left)[#set par(leading: 0.4em); 
      #text(font: "Noto Naskh Arabic", weight: "bold")[#data.metadata.at("academicYear", default: data.metadata.at("date", default: ""))] \ 
      #text(font: "Noto Naskh Arabic", weight: "bold")[المدة: #data.metadata.at("duration", default: "")]]
  )
  v(1pt)
  
  // ─────── شريط العنوان ───────
  {
    let exam-type-label = data.metadata.at("docType", default: data.metadata.at("exam_type", default: "فرض"))
    let subject-label = data.metadata.at("subjectName", default: data.metadata.at("subject", default: ""))
    let solution-suffix = if is-solution { " - الإجابة النموذجية" } else { "" }
    
    align(center)[
      #line(length: 100%, stroke: 1.2pt)
      #v(-5pt)
      #text(font: "Noto Naskh Arabic", size: 16pt, weight: "bold")[#exam-type-label في مادة: #subject-label #solution-suffix]
      #v(-5pt)
      #line(length: 100%, stroke: 1.2pt)
    ]
  }
  v(2pt)

  // ─────── التمارين ───────
  // Support both new format (data.exercises) and legacy format (data.topics.exercises)
  let exercises = if data.keys().contains("exercises") {
    data.exercises
  } else if data.keys().contains("topics") {
    data.topics.at(0).exercises
  } else {
    ()
  }

  let ordinals = ("الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن")

  for (idx, ex) in exercises.enumerate() {
    v(2pt)
    block(breakable: true, width: 100%)[
      #grid(
        columns: (auto, 1fr),
        gutter: 10pt,
        align: horizon,
        text(size: 22pt, fill: if is-solution { green } else { blue })[▪],
        text(font: "Noto Naskh Arabic", weight: "bold", size: 17pt)[التمرين #ex.at("num", default: ordinals.at(idx, default: str(idx + 1))) : (#ex.at("points", default: "0") نقاط)],
      )
      #v(2pt)
      
      #block(width: 100%, inset: (right: 15pt))[
        #if ex.keys().contains("instruction") and ex.instruction != "" [
          #text(style: "italic", size: 13pt)[#ex.instruction]
          #v(2pt)
        ]
        
        // Support both "blocks" and "content" key names
        #let blocks = ex.at("blocks", default: ex.at("content", default: ()))
        #for b in blocks [
          #render-block(b, is-solution)
          #v(2pt)
        ]
      ]
    ]
  }
  v(1fr)
  align(center)[#text(weight: "bold")[#("انتهى الموضوع")]]
}
