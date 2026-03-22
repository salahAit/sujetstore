// ============================================
// secondary/quiz.typ — فرض (Secondary School Test)
// SujetBuilder Module
// ============================================

#import "../../common/styles.typ": *
#import "../../common/template.typ": official-template

// Parse JSON data from sys.inputs
#let raw-data = sys.inputs.at("data", default: "{}")
#let data = json(bytes(raw-data))

#let is-solution-input = sys.inputs.at("is-solution", default: "false") == "true"

// Use the unified official template
#official-template(data, is-solution: is-solution-input)
