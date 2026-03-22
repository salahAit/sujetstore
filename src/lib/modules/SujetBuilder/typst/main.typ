// main.typ — نقطة الدخول الرئيسية لـ SujetBuilder
// يتلقى template-id و data من sys.inputs

#import "common/template.typ": official-template

#let template-id = sys.inputs.at("template-id", default: "middle/quiz")
#let raw-data = sys.inputs.at("data", default: "{}")
#let data = json(bytes(raw-data))

// Determine if this is a solution template
#let is-solution-input = sys.inputs.at("is-solution", default: "false") == "true"
#let is-solution = is-solution-input or template-id.ends-with("_solution") or template-id.ends-with("/solution")

// Use the unified official template for all levels
#official-template(data, is-solution: is-solution)
