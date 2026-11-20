// common/arabic_poetry.typ — Authentic Arabic Classical Poetry Justification Engine
// Combines Arabic calligraphic Kashida (ـ U+0640) elongation + exact #h(1fr) word justification
// so both right and left margins of الصدر and العجز align seamlessly like official Algerian BAC exams.

#let _render-poem-word(w, k-count) = {
  let pre = w.at(0)
  let post = w.at(1)
  let style = w.at(2)
  let prefix-punct = w.at(3, default: "")
  let suffix-punct = w.at(4, default: "")

  let core = if k-count > 0 and post != "" {
    pre + ("ـ" * k-count) + post
  } else {
    pre + post
  }

  let styled = if style == "ul" {
    underline(strong(core))
  } else if style == "bold" {
    strong(core)
  } else {
    [#core]
  }

  if prefix-punct != "" or suffix-punct != "" {
    [#prefix-punct#styled#suffix-punct]
  } else {
    styled
  }
}

#let _measure-hemistich-natural(words) = {
  let parts = words.map(w => _render-poem-word(w, 0))
  measure(parts.join([ ])).width
}

#let _render-justified-hemistich(words, col-w, kashida-w) = {
  let n = words.len()
  if n == 0 { return box(width: col-w)[] }

  // Find indices of words that have a valid Kashida slot (post != "")
  // Prefer normal words first; allow styled words only if no normal slots exist
  let normal-slots = ()
  let all-slots = ()
  for (i, w) in words.enumerate() {
    if w.at(1) != "" {
      all-slots.push(i)
      if w.at(2) == "normal" {
        normal-slots.push(i)
      }
    }
  }
  let slot-indices = if normal-slots.len() > 0 { normal-slots } else { all-slots }
  let num-slots = slot-indices.len()

  let nat-w = _measure-hemistich-natural(words)
  let deficit = col-w - nat-w

  // Compute graceful total Kashida count (fills ~58% of deficit, capped at 2 kashidas/word for calligraphic elegance)
  let total-k = if deficit > 2pt and num-slots > 0 and kashida-w > 0.5pt {
    let target-k = int(calc.floor((deficit * 0.58) / kashida-w))
    calc.min(calc.max(target-k, 0), num-slots * 2)
  } else {
    0
  }

  // Build per-word kashida allocation and verify it never overflows col-w
  let build-k-map(tk) = {
    let counts = range(n).map(_ => 0)
    if tk > 0 and num-slots > 0 {
      for step in range(tk) {
        let idx = slot-indices.at(calc.rem(step, num-slots))
        counts.at(idx) = counts.at(idx) + 1
      }
    }
    counts
  }

  let k-counts = build-k-map(total-k)

  // Safety guard: ensure words + minimum spaces never exceed col-w
  let min-gap = 2.5pt
  while total-k > 0 {
    let rendered = range(n).map(i => _render-poem-word(words.at(i), k-counts.at(i)))
    let w-sum = measure(rendered.join(h(min-gap))).width
    if w-sum <= col-w {
      break
    }
    total-k = total-k - 1
    k-counts = build-k-map(total-k)
  }

  let final-words = range(n).map(i => _render-poem-word(words.at(i), k-counts.at(i)))

  if n == 1 {
    box(width: col-w)[#align(center)[#final-words.at(0)]]
  } else {
    // Check if even with 0 kashidas the hemistich exceeds col-w (rare long verse): scale slightly instead of ugly wrapping
    let min-w = measure(final-words.join(h(2pt))).width
    if min-w > col-w {
      box(width: col-w)[#scale(x: (col-w / min-w) * 100%, reflow: true)[#final-words.join(h(2pt))]]
    } else {
      box(width: col-w)[#final-words.join(h(1fr))]
    }
  }
}

#let render-arabic-poem(
  verses: (),
  numbered: true,
  gutter: 24pt,
  row-gutter: 8pt,
) = {
  if verses.len() == 0 { return [] }

  layout(avail => {
    context {
      // Measure a single Kashida glyph width in the active Arabic font
      let w-base = measure([بب]).width
      let w-stretched = measure([بـب]).width
      let kashida-w = calc.max(w-stretched - w-base, 3pt)

      // Measure natural widths of all hemistichs to pick a balanced uniform column width
      let max-nat = 0pt
      for pair in verses {
        let s-w = _measure-hemistich-natural(pair.at(0))
        let a-w = _measure-hemistich-natural(pair.at(1))
        if s-w > max-nat { max-nat = s-w }
        if a-w > max-nat { max-nat = a-w }
      }

      let num-w = if numbered { 22pt } else { 0pt }
      let num-gap = if numbered { 6pt } else { 0pt }
      let max-col-w = (avail.width - num-w - num-gap - gutter - 4pt) / 2

      // Target column width: natural longest hemistich + slight calligraphic breathing room, bounded cleanly
      let col-w = calc.min(calc.max(max-nat + 10pt, max-col-w * 0.72), max-col-w)

      let cells = ()
      for (idx, pair) in verses.enumerate() {
        if numbered {
          cells.push(
            align(right + horizon)[
              #text(size: 13pt, weight: "bold", fill: rgb("#334155"))[#stack(dir: rtl, [#(idx + 1)], [-])]
            ]
          )
        }
        cells.push(_render-justified-hemistich(pair.at(0), col-w, kashida-w))
        cells.push(_render-justified-hemistich(pair.at(1), col-w, kashida-w))
      }

      let cols = if numbered { (num-w, col-w, col-w) } else { (col-w, col-w) }
      let col-gaps = if numbered { (num-gap, gutter) } else { gutter }

      align(center)[
        #grid(
          columns: cols,
          column-gutter: col-gaps,
          row-gutter: row-gutter,
          align: horizon,
          ..cells
        )
      ]
    }
  })
}
