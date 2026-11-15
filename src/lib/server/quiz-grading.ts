/**
 * Server-side deterministic grading engine for all 14 SujetStore QuizBuilder question types.
 * Never trusts client-submitted scores or `correct` booleans.
 */

export interface GradableQuestion {
	id: number;
	questionId?: number;
	type: string;
	points: number;
	questionData: any;
	explanation?: string | null;
}

export interface GradedQuestionResult {
	questionId: number;
	quizQuestionId: number;
	type: string;
	correct: boolean;
	pointsEarned: number;
	maxPoints: number;
	userAnswerDisplay: string;
	correctAnswerDisplay: string;
}

type Token =
	| { kind: 'num'; value: number }
	| { kind: 'op'; value: string }
	| { kind: 'lparen' }
	| { kind: 'rparen' };

function tokenizeMath(expr: string): Token[] | null {
	const tokens: Token[] = [];
	let i = 0;
	while (i < expr.length) {
		const ch = expr[i];
		if (/\s/.test(ch)) {
			i++;
			continue;
		}
		if (/[0-9.]/.test(ch)) {
			let start = i;
			let dotSeen = false;
			while (i < expr.length && (/[0-9]/.test(expr[i]) || (expr[i] === '.' && !dotSeen))) {
				if (expr[i] === '.') dotSeen = true;
				i++;
			}
			const num = Number(expr.slice(start, i));
			if (!Number.isFinite(num)) return null;
			tokens.push({ kind: 'num', value: num });
			continue;
		}
		if (ch === '*' && expr[i + 1] === '*') {
			tokens.push({ kind: 'op', value: '^' });
			i += 2;
			continue;
		}
		if ('+-*/%^'.includes(ch)) {
			tokens.push({ kind: 'op', value: ch });
			i++;
			continue;
		}
		if (ch === '(') {
			tokens.push({ kind: 'lparen' });
			i++;
			continue;
		}
		if (ch === ')') {
			tokens.push({ kind: 'rparen' });
			i++;
			continue;
		}
		return null;
	}
	return tokens;
}

/** Safe recursive-descent arithmetic evaluator (never uses eval or Function). */
export function evaluateSafeFormula(formula: string, vars: Record<string, number> = {}): number | null {
	if (!formula || typeof formula !== 'string') return null;
	let expr = formula;
	for (const [key, val] of Object.entries(vars)) {
		if (!Number.isFinite(val)) return null;
		expr = expr.replaceAll(`{${key}}`, `(${val})`);
	}
	if (/\{[^}]+\}/.test(expr)) return null;

	const tokens = tokenizeMath(expr);
	if (!tokens || tokens.length === 0) return null;

	let pos = 0;
	const peek = () => tokens[pos];
	const consume = () => tokens[pos++];

	function parseExpr(): number | null {
		let left = parseTerm();
		if (left === null) return null;
		while (peek()?.kind === 'op' && ((peek() as any).value === '+' || (peek() as any).value === '-')) {
			const op = (consume() as any).value;
			const right = parseTerm();
			if (right === null) return null;
			left = op === '+' ? left + right : left - right;
		}
		return left;
	}

	function parseTerm(): number | null {
		let left = parsePower();
		if (left === null) return null;
		while (
			peek()?.kind === 'op' &&
			((peek() as any).value === '*' || (peek() as any).value === '/' || (peek() as any).value === '%')
		) {
			const op = (consume() as any).value;
			const right = parsePower();
			if (right === null) return null;
			if (op === '*') left *= right;
			else if (op === '/') {
				if (right === 0) return null;
				left /= right;
			} else {
				if (right === 0) return null;
				left %= right;
			}
		}
		return left;
	}

	function parsePower(): number | null {
		const base = parseUnary();
		if (base === null) return null;
		if (peek()?.kind === 'op' && (peek() as any).value === '^') {
			consume();
			const exp = parsePower();
			if (exp === null) return null;
			return Math.pow(base, exp);
		}
		return base;
	}

	function parseUnary(): number | null {
		if (peek()?.kind === 'op' && ((peek() as any).value === '+' || (peek() as any).value === '-')) {
			const op = (consume() as any).value;
			const val = parseUnary();
			if (val === null) return null;
			return op === '-' ? -val : val;
		}
		return parsePrimary();
	}

	function parsePrimary(): number | null {
		const tok = peek();
		if (!tok) return null;
		if (tok.kind === 'num') {
			consume();
			return tok.value;
		}
		if (tok.kind === 'lparen') {
			consume();
			const val = parseExpr();
			if (val === null || peek()?.kind !== 'rparen') return null;
			consume();
			return val;
		}
		return null;
	}

	const result = parseExpr();
	if (result === null || pos !== tokens.length || !Number.isFinite(result)) return null;
	return result;
}

function normalizeQuestionData(qd: any) {
	if (typeof qd === 'string') {
		try {
			return JSON.parse(qd);
		} catch {
			return {};
		}
	}
	return qd || {};
}

function itemLabel(item: any): string {
	return typeof item === 'string' ? item : String(item?.text ?? '');
}

export function formatCorrectAnswer(question: Pick<GradableQuestion, 'type' | 'questionData'>): string {
	const qd = normalizeQuestionData(question.questionData);
	switch (question.type) {
		case 'mcq': {
			const opts = qd.options || [];
			const explicit =
				qd.correctIndexes ??
				qd.correctIndices ??
				(qd.correctIndex !== undefined && qd.correctIndex !== null ? [Number(qd.correctIndex)] : undefined);
			if (Array.isArray(explicit) && explicit.length > 0) {
				return explicit.map((i: number) => itemLabel(opts[i])).filter(Boolean).join('، ');
			}
			return opts
				.filter((o: any) => typeof o === 'object' && o?.isCorrect)
				.map((o: any) => itemLabel(o))
				.join('، ');
		}
		case 'true_false':
			return (qd.correctAnswer ?? qd.correct) ? 'صحيح ✓' : 'خطأ ✗';
		case 'fill_blank': {
			const list = qd.answers || qd.acceptedAnswers || [];
			return Array.isArray(list) ? list.join(' أو ') : '';
		}
		case 'ordering': {
			const items = qd.items || [];
			if (Array.isArray(qd.correctOrder)) {
				return qd.correctOrder.map((i: number) => itemLabel(items[i])).join(' ← ');
			}
			return items.map(itemLabel).join(' ← ');
		}
		case 'short_answer': {
			const kws = qd.keywords || qd.acceptedKeywords || [];
			return Array.isArray(kws) ? kws.join('، ') : '';
		}
		case 'cloze':
			return qd.options?.[Number(qd.correctIndex)] ?? '';
		case 'calculated':
			return qd.formula
				? `الصيغة: ${qd.formula}`
				: qd.answer !== undefined && qd.answer !== null
					? String(qd.answer)
					: 'يتم حسابه تلقائياً';
		case 'sentence_reorder':
			return (qd.correctOrder || []).map((i: number) => qd.words?.[i] ?? '').join(' ');
		case 'hotspot':
			return qd.zones?.[qd.correctZone]?.label || `المنطقة ${Number(qd.correctZone ?? 0) + 1}`;
		case 'drag_to_image':
			return (qd.labels || []).map((l: any) => l.text).join('، ');
		case 'matrix':
			return (qd.statements || [])
				.map((s: string, i: number) => `${s}: ${qd.columns?.[qd.correctAnswers?.[i]] ?? ''}`)
				.join(' | ');
		case 'essay': {
			const kws = qd.keywords || [];
			return kws.length ? `الكلمات المطلوبة: ${kws.join('، ')}` : 'إجابة مقالية';
		}
		case 'drag_drop':
			return (qd.items || [])
				.map((item: any) => `${item.text} → ${typeof item.category === 'number' ? (qd.categories?.[item.category] ?? item.category) : item.category}`)
				.join(' | ');
		case 'matching':
			return (qd.pairs || []).map((p: any) => `${itemLabel(p.left)} ↔ ${itemLabel(p.right)}`).join(' | ');
		default:
			return '';
	}
}

export function formatUserAnswer(question: Pick<GradableQuestion, 'type' | 'questionData'>, answer: any): string {
	if (!answer || typeof answer !== 'object') return 'لم تتم الإجابة';
	const qd = normalizeQuestionData(question.questionData);
	switch (question.type) {
		case 'mcq': {
			const opts = qd.options || [];
			if (Array.isArray(answer.selectedIndexes) && answer.selectedIndexes.length > 0) {
				return answer.selectedIndexes.map((i: number) => itemLabel(opts[i])).join('، ');
			}
			return 'لم تتم الإجابة';
		}
		case 'true_false':
			return answer.value === true ? 'صحيح ✓' : answer.value === false ? 'خطأ ✗' : 'لم تتم الإجابة';
		case 'fill_blank':
		case 'short_answer':
			return typeof answer.text === 'string' && answer.text.trim() ? answer.text.trim() : 'لم تتم الإجابة';
		case 'ordering':
			return Array.isArray(answer.order) && answer.order.length ? answer.order.map(itemLabel).join(' ← ') : 'لم تتم الإجابة';
		case 'cloze':
			return answer.selectedIndex !== undefined && answer.selectedIndex !== null
				? String(qd.options?.[Number(answer.selectedIndex)] ?? 'لم تتم الإجابة')
				: 'لم تتم الإجابة';
		case 'calculated':
			return answer.value !== undefined && answer.value !== null && answer.value !== ''
				? String(answer.value)
				: 'لم تتم الإجابة';
		case 'sentence_reorder':
			return Array.isArray(answer.order) && answer.order.length
				? answer.order.map((i: number) => qd.words?.[i] ?? '').join(' ')
				: 'لم تتم الإجابة';
		case 'hotspot':
			return answer.zone !== undefined && answer.zone !== null
				? (qd.zones?.[Number(answer.zone)]?.label || `المنطقة ${Number(answer.zone) + 1}`)
				: 'لم تتم الإجابة';
		case 'drag_to_image': {
			const count = Object.keys(answer.placements || {}).length;
			return count > 0 ? `تم وضع ${count} تسمية` : 'لم تتم الإجابة';
		}
		case 'matrix': {
			const keys = Object.keys(answer.answers || {});
			if (keys.length === 0) return 'لم تتم الإجابة';
			return (qd.statements || [])
				.map((s: string, i: number) => `${s}: ${qd.columns?.[answer.answers?.[i]] ?? '—'}`)
				.join(' | ');
		}
		case 'essay':
			return typeof answer.text === 'string' && answer.text.trim()
				? `${answer.text.trim().slice(0, 80)}${answer.text.trim().length > 80 ? '...' : ''}`
				: 'لم تتم الإجابة';
		case 'drag_drop': {
			const assigned = Object.entries(answer.assignments || {}).filter(([_, v]) => v !== null && v !== undefined);
			return assigned.length > 0
				? assigned.map(([item, catIdx]) => `${item} → ${qd.categories?.[catIdx as number] ?? catIdx}`).join(' | ')
				: 'لم تتم الإجابة';
		}
		case 'matching': {
			const pairs = qd.pairs || [];
			const entries = Object.entries(answer.matches || {});
			return entries.length > 0
				? entries.map(([l, r]) => `${itemLabel(pairs[Number(l)]?.left)} ↔ ${itemLabel(pairs[Number(r)]?.right)}`).join(' | ')
				: 'لم تتم الإجابة';
		}
		default:
			return 'لم تتم الإجابة';
	}
}

export function gradeQuestion(question: GradableQuestion, answer: any): GradedQuestionResult {
	const qd = normalizeQuestionData(question.questionData);
	const maxPoints = Number(question.points ?? 1) || 1;
	const canonicalQid = Number(question.questionId ?? question.id);
	let correct = false;
	let computedCorrectDisplay: string | null = null;

	if (answer && typeof answer === 'object') {
		switch (question.type) {
			case 'mcq': {
				const opts = qd.options || [];
				const explicit =
					qd.correctIndexes ??
					qd.correctIndices ??
					(qd.correctIndex !== undefined && qd.correctIndex !== null ? [Number(qd.correctIndex)] : undefined);
				const expected: number[] =
					Array.isArray(explicit) && explicit.length > 0
						? explicit.map(Number)
						: opts
								.map((o: any, i: number) => (typeof o === 'object' && o?.isCorrect ? i : -1))
								.filter((i: number) => i >= 0);
				const picked: number[] = Array.isArray(answer.selectedIndexes)
					? [...new Set<number>(answer.selectedIndexes.map((n: unknown) => Number(n)))].filter(Number.isInteger)
					: [];
				const sortedExpected = [...new Set(expected)].sort((a, b) => a - b);
				const sortedPicked = [...picked].sort((a, b) => a - b);
				correct =
					sortedExpected.length > 0 &&
					sortedPicked.length === sortedExpected.length &&
					sortedExpected.every((v, i) => v === sortedPicked[i]);
				break;
			}
			case 'true_false': {
				correct = typeof answer.value === 'boolean' && answer.value === Boolean(qd.correctAnswer ?? qd.correct);
				break;
			}
			case 'ordering': {
				const items: string[] = (qd.items || []).map(itemLabel);
				const expectedOrder: string[] = Array.isArray(qd.correctOrder)
					? qd.correctOrder.map((idx: number) => items[idx])
					: items;
				if (Array.isArray(answer.order) && expectedOrder.length > 0) {
					const userOrder = answer.order.map((v: any) =>
						typeof v === 'number' ? items[v] : itemLabel(v)
					);
					correct =
						userOrder.length === expectedOrder.length &&
						expectedOrder.every((val, i) => userOrder[i] === val);
				}
				break;
			}
			case 'drag_drop': {
				const items = qd.items || [];
				const categories = qd.categories || [];
				if (answer.assignments && typeof answer.assignments === 'object' && items.length > 0) {
					correct = items.every((item: any) => {
						const assignedIdx = answer.assignments[item.text];
						if (assignedIdx === null || assignedIdx === undefined) return false;
						if (typeof item.category === 'number') {
							return Number(assignedIdx) === item.category;
						}
						return categories[Number(assignedIdx)] === item.category;
					});
				}
				break;
			}
			case 'matching': {
				const pairs = qd.pairs || [];
				if (answer.matches && typeof answer.matches === 'object' && pairs.length > 0) {
					const entries = Object.entries(answer.matches);
					correct =
						entries.length === pairs.length &&
						entries.every(([left, right]) => Number(left) === Number(right));
				}
				break;
			}
			case 'fill_blank': {
				const accepted: string[] = qd.answers || qd.acceptedAnswers || [];
				if (typeof answer.text === 'string' && accepted.length > 0) {
					const norm = answer.text.trim().toLowerCase();
					correct = accepted.some((a) => String(a).trim().toLowerCase() === norm);
				}
				break;
			}
			case 'short_answer': {
				const kws: string[] = qd.keywords || qd.acceptedKeywords || [];
				if (typeof answer.text === 'string' && answer.text.trim() && kws.length > 0) {
					const haystack = answer.text.toLowerCase();
					const hits = kws.filter((kw) => haystack.includes(String(kw).toLowerCase())).length;
					correct = hits >= Math.max(1, Number(qd.minKeywords ?? 1));
				}
				break;
			}
			case 'cloze': {
				correct =
					answer.selectedIndex !== undefined &&
					answer.selectedIndex !== null &&
					Number(answer.selectedIndex) === Number(qd.correctIndex);
				break;
			}
			case 'calculated': {
				const val = answer.value !== '' && answer.value !== null ? Number(answer.value) : NaN;
				if (Number.isFinite(val)) {
					let expected: number | null = null;
					if (qd.formula) {
						const declVars: { name: string; min: number; max: number }[] = qd.variables || [];
						const suppliedVars: Record<string, number> = answer.vars || {};
						let varsValid = true;
						const safeVars: Record<string, number> = {};
						for (const v of declVars) {
							const num = Number(suppliedVars[v.name]);
							if (!Number.isFinite(num) || num < Number(v.min) || num > Number(v.max)) {
								varsValid = false;
								break;
							}
							safeVars[v.name] = num;
						}
						if (varsValid) {
							expected = evaluateSafeFormula(qd.formula, safeVars);
						}
					} else if (qd.answer !== undefined && qd.answer !== null && Number.isFinite(Number(qd.answer))) {
						expected = Number(qd.answer);
					}
					if (expected !== null) {
						computedCorrectDisplay = String(Math.round(expected * 1000) / 1000);
						const tol = Math.max(0, Number(qd.tolerance ?? 0));
						correct = Math.abs(val - expected) <= tol;
					}
				}
				break;
			}
			case 'sentence_reorder': {
				const expected = qd.correctOrder || [];
				correct =
					Array.isArray(answer.order) &&
					expected.length > 0 &&
					answer.order.length === expected.length &&
					answer.order.every((v: any, i: number) => Number(v) === Number(expected[i]));
				break;
			}
			case 'hotspot': {
				correct =
					answer.zone !== undefined &&
					answer.zone !== null &&
					Number(answer.zone) === Number(qd.correctZone);
				break;
			}
			case 'drag_to_image': {
				const labels = qd.labels || [];
				if (answer.placements && typeof answer.placements === 'object' && labels.length > 0) {
					correct = labels.every((lbl: any, idx: number) => {
						const pos = answer.placements[idx] ?? answer.placements[String(idx)];
						if (!pos) return false;
						const cx = Number(lbl.correctX ?? lbl.x);
						const cy = Number(lbl.correctY ?? lbl.y);
						return Math.hypot(Number(pos.x) - cx, Number(pos.y) - cy) <= 15;
					});
				}
				break;
			}
			case 'matrix': {
				const stmts = qd.statements || [];
				const expected = qd.correctAnswers || [];
				if (answer.answers && typeof answer.answers === 'object' && stmts.length > 0) {
					correct = stmts.every((_: any, i: number) => {
						const picked = answer.answers[i] ?? answer.answers[String(i)];
						return picked !== undefined && picked !== null && Number(picked) === Number(expected[i]);
					});
				}
				break;
			}
			case 'essay': {
				const text = typeof answer.text === 'string' ? answer.text.trim() : '';
				const words = text ? text.split(/\s+/).length : 0;
				const minWords = Number(qd.minWords ?? 0);
				const maxWords = Number(qd.maxWords ?? 0);
				const kws: string[] = qd.keywords || [];
				const withinBounds = words >= Math.max(1, minWords) && (maxWords <= 0 || words <= maxWords);
				if (withinBounds) {
					if (kws.length > 0) {
						const haystack = text.toLowerCase();
						const found = kws.filter((kw) => haystack.includes(String(kw).toLowerCase())).length;
						correct = found >= Math.max(1, Number(qd.minKeywords ?? 1));
					} else {
						correct = true;
					}
				}
				break;
			}
		}
	}

	return {
		questionId: canonicalQid,
		quizQuestionId: Number(question.id),
		type: question.type,
		correct,
		pointsEarned: correct ? maxPoints : 0,
		maxPoints,
		userAnswerDisplay: formatUserAnswer({ type: question.type, questionData: qd }, answer),
		correctAnswerDisplay: computedCorrectDisplay ?? formatCorrectAnswer({ type: question.type, questionData: qd })
	};
}

export function gradeQuizSubmission(
	questions: GradableQuestion[],
	answersByQuestionId: Record<string | number, any>
) {
	const gradedDetails = questions.map((q) => {
		const ans =
			answersByQuestionId[q.id] ??
			(q.questionId !== undefined ? answersByQuestionId[q.questionId] : undefined) ??
			null;
		return {
			result: gradeQuestion(q, ans),
			rawAnswer: ans
		};
	});

	const score = gradedDetails.reduce((s, d) => s + d.result.pointsEarned, 0);
	const totalPoints = gradedDetails.reduce((s, d) => s + d.result.maxPoints, 0);
	const percentage = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;

	return {
		score,
		totalPoints,
		percentage,
		gradedDetails
	};
}
