// main.typ — نقطة الدخول الرئيسية لـ SujetBuilder
// يتلقى template-id و data من sys.inputs

#import "common/template.typ": official-template
#import "templates/secondary/bac_official.typ": bac-official-template
#import "templates/secondary/lycee_exam.typ": lycee-exam-template
#import "templates/english/exam.typ": english-exam-template
#import "templates/french/exam.typ": french-exam-template

#let template-id = sys.inputs.at("template-id", default: "middle/quiz")
#let raw-data = sys.inputs.at("data", default: "{}")
#let data = if "data-file" in sys.inputs {
  json(sys.inputs.at("data-file"))
} else {
  json.decode(raw-data)
}

// Determine if this is a solution template
#let is-solution-input = sys.inputs.at("is-solution", default: "false") == "true"
#let is-solution = is-solution-input or template-id.ends-with("_solution") or template-id.ends-with("/solution")

#if template-id.starts-with("english/") [
  #english-exam-template(data, template-id: template-id, is-solution: is-solution)
] else if template-id.starts-with("french/") [
  #french-exam-template(data, template-id: template-id, is-solution: is-solution)
] else if template-id == "secondary/bac_official" [
  #bac-official-template(data, is-solution: is-solution)
] else if template-id == "secondary/lycee_exam" or template-id == "secondary/exam" or template-id == "secondary/quiz" or template-id == "secondary/solution" [
  #lycee-exam-template(data, is-solution: is-solution)
] else [
  #official-template(data, is-solution: is-solution)
]
