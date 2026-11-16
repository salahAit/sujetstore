/**
 * Deterministic PRNG (Mulberry32) and Algerian pedagogical math helpers.
 */

export class SeededRng {
	private state: number;

	constructor(seed: number) {
		this.state = (Math.floor(seed) >>> 0) || 1;
	}

	/** Returns float in [0, 1). */
	next(): number {
		let t = (this.state += 0x6d2b79f5);
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	}

	/** Returns integer in [min, max] inclusive. */
	int(min: number, max: number): number {
		const lo = Math.ceil(min);
		const hi = Math.floor(max);
		if (hi <= lo) return lo;
		return Math.floor(this.next() * (hi - lo + 1)) + lo;
	}

	/** Picks one random item from non-empty array. */
	pick<T>(items: readonly T[]): T {
		if (!items.length) throw new Error('SeededRng.pick called with empty array');
		return items[this.int(0, items.length - 1)];
	}

	/** Picks `count` distinct items from array without mutation. */
	pickDistinct<T>(items: readonly T[], count: number): T[] {
		const copy = this.shuffle(items);
		return copy.slice(0, Math.min(count, copy.length));
	}

	/** Fisher-Yates shuffle returning a new array. */
	shuffle<T>(items: readonly T[]): T[] {
		const arr = [...items];
		for (let i = arr.length - 1; i > 0; i--) {
			const j = this.int(0, i);
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}

	/** Generates a realistic Algerian price in DA (multiple of 5 or 10). */
	priceDA(min: number, max: number, step = 5): number {
		const lo = Math.ceil(min / step);
		const hi = Math.floor(max / step);
		return this.int(lo, Math.max(lo, hi)) * step;
	}
}

export function gcd(a: number, b: number): number {
	let x = Math.abs(Math.trunc(a));
	let y = Math.abs(Math.trunc(b));
	while (y !== 0) {
		[x, y] = [y, x % y];
	}
	return x || 1;
}

export function lcm(a: number, b: number): number {
	return Math.abs((a * b) / gcd(a, b));
}

export function simplifyFraction(num: number, den: number): [number, number] {
	if (den === 0) throw new Error('Zero denominator');
	const sign = den < 0 ? -1 : 1;
	const g = gcd(num, den);
	return [(sign * num) / g, Math.abs(den) / g];
}

export function roundTo(value: number, decimals: number): number {
	const factor = Math.pow(10, decimals);
	return Math.round((value + Number.EPSILON) * factor) / factor;
}

/**
 * Perturb a numeric literal inside a math/KaTeX option without touching
 * exponents (^n), subscripts (_n), or TeX command prefixes.
 */
function perturbNumberInOptionText(text: string, bump: number): string | null {
	const tokenRe = /(?<![a-zA-Z0-9_.^\\])(-?\d+(?:\.\d+)?)(?![a-zA-Z0-9_.])/g;
	const matches: Array<{ index: number; raw: string; val: number }> = [];
	let m: RegExpExecArray | null;
	while ((m = tokenRe.exec(text)) !== null) {
		const num = Number(m[1]);
		if (Number.isFinite(num)) {
			matches.push({ index: m.index, raw: m[1], val: num });
		}
	}
	if (matches.length === 0) return null;
	const chosen = matches[matches.length - 1];
	let nextVal = roundTo(chosen.val + bump, 2);
	if (chosen.index > 0 && text[chosen.index - 1] === '{' && nextVal === 0) {
		nextVal = bump > 0 ? bump + 1 : bump - 1;
	}
	return (
		text.slice(0, chosen.index) +
		String(nextVal) +
		text.slice(chosen.index + chosen.raw.length)
	);
}

/** Ensures all MCQ options are unique strings and returns updated correctIndex. */
export function buildUniqueMcqOptions(
	correctText: string,
	distractors: { text: string; diagnosticFeedback: string }[],
	rng: SeededRng
): {
	options: { text: string; diagnosticFeedback?: string }[];
	correctIndices: [number];
} {
	const seen = new Set<string>([correctText.trim()]);
	const uniqueDistractors: { text: string; diagnosticFeedback: string }[] = [];
	for (const d of distractors) {
		const t = d.text.trim();
		if (t && !seen.has(t)) {
			seen.add(t);
			uniqueDistractors.push({ text: t, diagnosticFeedback: d.diagnosticFeedback });
		}
		if (uniqueDistractors.length === 3) break;
	}
	// Safety fallback if numeric distractors collided
	let bump = 1;
	let guard = 0;
	while (uniqueDistractors.length < 3 && guard < 40) {
		guard++;
		const trimmed = correctText.trim();
		const num = Number(trimmed);
		let candidate: string;
		if (Number.isFinite(num)) {
			candidate = String(roundTo(num + bump, 2));
		} else {
			const perturbed = perturbNumberInOptionText(trimmed, bump);
			candidate = perturbed && !seen.has(perturbed) ? perturbed : `${trimmed} + ${Math.abs(bump)}`;
		}
		if (!seen.has(candidate)) {
			seen.add(candidate);
			uniqueDistractors.push({
				text: candidate,
				diagnosticFeedback: 'راجع خطوات الحساب وتحقق من النتيجة.'
			});
		}
		bump = bump > 0 ? -bump : -bump + 1;
	}

	const entries = rng.shuffle([
		{ text: correctText.trim(), isCorrect: true as const },
		...uniqueDistractors.map((d) => ({ text: d.text, diagnosticFeedback: d.diagnosticFeedback, isCorrect: false as const }))
	]);
	const correctIdx = entries.findIndex((e) => e.isCorrect);
	return {
		options: entries.map((e) =>
			e.isCorrect ? { text: e.text } : { text: e.text, diagnosticFeedback: e.diagnosticFeedback }
		),
		correctIndices: [correctIdx]
	};
}
