import { buildUniqueMcqOptions, SeededRng } from '../../rng';
import { saveSvgAsset, svgCountingObjects, svgShapesStrip } from '../../svg-helpers';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate
} from '../../types';
import type { ContentBlock } from '../../../SujetBuilder/types';

const ONES_WORDS_1AP = [
	'صِفْرٌ',
	'واحِدٌ',
	'اثْنانِ',
	'ثَلاثَةٌ',
	'أَرْبَعَةٌ',
	'خَمْسَةٌ',
	'سِتَّةٌ',
	'سَبْعَةٌ',
	'ثَمانِيَةٌ',
	'تِسْعَةٌ'
] as const;

type ObjectKind = 'apple' | 'star' | 'ball' | 'pencil';

interface CountableItemMeta {
	kind: ObjectKind;
	sing: string;
	dual: string;
	plur: string;
	titleWord: string;
}

const COUNTABLE_ITEMS: readonly CountableItemMeta[] = [
	{
		kind: 'apple',
		sing: 'تُفّاحَةً واحِدَةً',
		dual: 'تُفّاحَتَيْنِ اثْنَتَيْنِ',
		plur: 'تُفّاحاتٍ',
		titleWord: 'التُّفّاحاتِ'
	},
	{
		kind: 'star',
		sing: 'نَجْمَةً واحِدَةً',
		dual: 'نَجْمَتَيْنِ اثْنَتَيْنِ',
		plur: 'نُجُومٍ',
		titleWord: 'النُّجُومِ'
	},
	{
		kind: 'ball',
		sing: 'كُرَةً واحِدَةً',
		dual: 'كُرَتَيْنِ اثْنَتَيْنِ',
		plur: 'كُراتٍ',
		titleWord: 'الكُراتِ'
	},
	{
		kind: 'pencil',
		sing: 'قَلَمًا واحِدًا',
		dual: 'قَلَمَيْنِ اثْنَيْنِ',
		plur: 'أَقْلامٍ',
		titleWord: 'الأَقْلامِ'
	}
] as const;

const CHILDREN_1AP = [
	{ name: 'أَمِينُ', nameGen: 'أَمِينَ', fem: false },
	{ name: 'سارَةُ', nameGen: 'سارَةَ', fem: true },
	{ name: 'آدَمُ', nameGen: 'آدَمَ', fem: false },
	{ name: 'مَرْيَمُ', nameGen: 'مَرْيَمَ', fem: true },
	{ name: 'رائِدُ', nameGen: 'رائِدٍ', fem: false },
	{ name: 'إِيمانُ', nameGen: 'إِيمانَ', fem: true }
] as const;

function createRng(seed: number, difficulty: Difficulty, salt: number): SeededRng {
	const s = Math.trunc(seed) >>> 0;
	const diffCode = difficulty === 'easy' ? 11 : difficulty === 'medium' ? 23 : 37;
	return new SeededRng(((s * 1009 + diffCode * 97 + salt) >>> 0) || 1);
}

function formatCountedPhrase(n: number, item: CountableItemMeta): string {
	if (n === 0) return `لا يُوجَدُ أَيُّ شَيْءٍ ($0$)`;
	if (n === 1) return item.sing;
	if (n === 2) return item.dual;
	return `$${n}$ ${item.plur}`;
}

function pickDistinctDigits0To9(
	correct: number,
	preferred: number[],
	rng: SeededRng
): number[] {
	const picked: number[] = [];
	const seen = new Set<number>([correct]);
	for (const d of preferred) {
		if (Number.isInteger(d) && d >= 0 && d <= 9 && !seen.has(d)) {
			seen.add(d);
			picked.push(d);
			if (picked.length === 3) return picked;
		}
	}
	const rest = rng.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((x) => !seen.has(x)));
	for (const d of rest) {
		picked.push(d);
		if (picked.length === 3) break;
	}
	return picked;
}

function svgDecompBeads(a: number, b: number): string {
	const left = Math.max(0, Math.min(9, a));
	const right = Math.max(0, Math.min(9, b));
	const step = 28;
	const padX = 20;
	const gap = 24;
	const w = Math.max(220, padX * 2 + (left + right) * step + gap);
	const h = 72;
	const cy = 36;
	const parts: string[] = [
		`<rect x="8" y="8" width="${w - 16}" height="${h - 16}" rx="12" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.6"/>`
	];

	let cursorX = padX + 12;
	for (let i = 0; i < left; i++) {
		parts.push(
			`<circle cx="${cursorX}" cy="${cy}" r="10" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1.6"/>`
		);
		cursorX += step;
	}

	const divX = cursorX - 2;
	parts.push(
		`<line x1="${divX}" y1="18" x2="${divX}" y2="${h - 18}" stroke="#64748b" stroke-width="1.8" stroke-dasharray="4 3"/>`
	);
	cursorX += gap;

	for (let i = 0; i < right; i++) {
		parts.push(
			`<circle cx="${cursorX}" cy="${cy}" r="10" fill="#fb923c" stroke="#c2410c" stroke-width="1.6"/>`
		);
		cursorX += step;
	}

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Arial,sans-serif">${parts.join('')}</svg>`;
}

function svgCompareLengths(
	ribbons: { num: number; widthPx: number; fill: string; stroke: string }[]
): string {
	const w = 340;
	const h = 136;
	const startX = 56;
	const ys = [26, 60, 94];
	const parts: string[] = [
		`<rect x="8" y="8" width="${w - 16}" height="${h - 16}" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>`,
		`<line x1="${startX}" y1="16" x2="${startX}" y2="120" stroke="#dc2626" stroke-width="2.4" stroke-dasharray="5 4"/>`
	];

	ribbons.forEach((rb, idx) => {
		const y = ys[idx] ?? 26 + idx * 34;
		parts.push(
			`<circle cx="30" cy="${y + 9}" r="11" fill="${rb.stroke}"/>`,
			`<text x="30" y="${y + 13}" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">${rb.num}</text>`,
			`<rect x="${startX}" y="${y}" width="${rb.widthPx}" height="18" rx="4" fill="${rb.fill}" stroke="${rb.stroke}" stroke-width="1.5"/>`
		);
	});

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Arial,sans-serif">${parts.join('')}</svg>`;
}

function svgSpatialScene(opts: {
	ballPos: 'above' | 'under';
	starPos: 'inside' | 'outside';
}): string {
	const w = 380;
	const h = 152;
	const parts: string[] = [
		`<rect x="8" y="8" width="174" height="136" rx="10" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.5"/>`,
		`<rect x="198" y="8" width="174" height="136" rx="10" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>`,
		// Table in left panel
		`<rect x="38" y="84" width="114" height="10" rx="3" fill="#92400e"/>`,
		`<rect x="48" y="94" width="9" height="40" fill="#92400e"/>`,
		`<rect x="133" y="94" width="9" height="40" fill="#92400e"/>`
	];

	const ballCy = opts.ballPos === 'above' ? 68 : 119;
	parts.push(
		`<circle cx="95" cy="${ballCy}" r="14" fill="#2563eb" stroke="#1e3a8a" stroke-width="1.8"/>`,
		`<path d="M 84 ${ballCy} Q 95 ${ballCy - 9} 106 ${ballCy}" fill="none" stroke="#dbeafe" stroke-width="1.8"/>`
	);

	// Box in right panel
	parts.push(
		`<rect x="216" y="42" width="94" height="72" rx="8" fill="#ffffff" stroke="#15803d" stroke-width="2.4"/>`
	);

	const sx = opts.starPos === 'inside' ? 263 : 338;
	const sy = 78;
	parts.push(
		`<polygon points="${sx},${sy - 14} ${sx + 4},${sy - 4} ${sx + 15},${sy - 4} ${sx + 7},${sy + 3} ${sx + 10},${sy + 13} ${sx},${sy + 7} ${sx - 10},${sy + 13} ${sx - 7},${sy + 3} ${sx - 15},${sy - 4} ${sx - 4},${sy - 4}" fill="#facc15" stroke="#b45309" stroke-width="1.6"/>`
	);

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Arial,sans-serif">${parts.join('')}</svg>`;
}

// ---------------------------------------------------------------------------
// 1. Counting & Writing Numbers 0..9 (with svgCountingObjects)
// ---------------------------------------------------------------------------
const templateCounting0To9: ParameterizedTemplate = {
	id: '1ap_t1_counting_0_9',
	grade: '1ap',
	trimesterId: 't1',
	domain: 'numeric',
	curriculumLessonId: 'lesson_1ap_t1_numbers_6_to_9',
	titleAr: 'عَدُّ وَكِتابَةُ الأَعْدادِ مِنْ 0 إِلى 9',
	defaultPoints: 2,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 1);

		const pool =
			difficulty === 'easy'
				? [0, 1, 2, 3, 4, 5]
				: difficulty === 'medium'
					? [0, 4, 5, 6, 7, 8]
					: [0, 6, 7, 8, 9];
		const n = rng.pick(pool);
		const item = rng.pick(COUNTABLE_ITEMS);
		const wordAr = ONES_WORDS_1AP[n];

		const svg = svgCountingObjects({
			count: n,
			kind: item.kind,
			perRow: 5
		});
		const svgPath = saveSvgAsset(`1ap_t1_count_s${cleanSeed}_${difficulty}`, svg);

		const variant = rng.int(0, 2);
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer = '';

		if (variant === 0) {
			const qText = `تَأَمَّلِ الصُّورَةَ جَيِّدًا: عُدَّ ${item.titleWord} وَاكْتُبِ العَدَدَ بِالأَرْقامِ.`;
			quizQuestion = {
				type: 'fill_blank',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: `مَجْمُوعَةُ ${item.titleWord}`,
				questionData: {
					sentence: `عَدَدُ ${item.titleWord} في الصُّورَةِ هُوَ: ___`,
					acceptedAnswers: [String(n)]
				},
				explanation:
					n === 0
						? 'الصُّنْدُوقُ فارِغٌ لا يُوجَدُ فِيهِ أَيُّ شَيْءٍ، إِذَنِ العَدَدُ هُوَ $0$.'
						: `نَعُدُّ كُلَّ عُنْصُرٍ مَرَّةً واحِدَةً فَنَجِدُ $${n}$ (${wordAr}).`
			};
			finalAnswer = String(n);
		} else if (variant === 1) {
			const cap = difficulty === 'easy' ? 5 : 9;
			const nearDistractors = pickDistinctDigits0To9(
				n,
				[n + 1, n - 1, n + 2, n - 2, 0, 1, 2, 3, 4, 5].filter((x) => x >= 0 && x <= cap),
				rng
			);
			const askWords = rng.int(0, 1) === 0;
			const correctText = askWords ? wordAr : `$${n}$`;
			const built = buildUniqueMcqOptions(
				correctText,
				nearDistractors.map((d) => ({
					text: askWords ? ONES_WORDS_1AP[d] : `$${d}$`,
					diagnosticFeedback:
						n === 0
							? 'المَجْمُوعَةُ الفارِغَةُ يُعَبِّرُ عَنْها العَدَدُ صِفْرٌ ($0$).'
							: `أَشِرْ بِإِصْبَعِكَ إِلى كُلِّ عُنْصُرٍ وَعُدَّ بِتَأَنٍّ حَتّى تَصِلَ إِلى $${n}$.`
				})),
				rng
			);
			const qText = askWords
				? `عُدَّ ${item.titleWord} في الصُّورَةِ، ثُمَّ اخْتَرِ اسْمَ العَدَدِ بِالحُرُوفِ:`
				: `عُدَّ ${item.titleWord} في الصُّورَةِ، ثُمَّ اخْتَرِ العَدَدَ الصَّحِيحَ:`;
			quizQuestion = {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: `مَجْمُوعَةُ ${item.titleWord}`,
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation:
					n === 0
						? 'عِنْدَما تَكُونُ المَجْمُوعَةُ فارِغَةً يَكُونُ العَدَدُ $0$ (صِفْرٌ).'
						: `بَعْدَ عَدِّ ${item.titleWord} نَجِدُ $${n}$ (${wordAr}).`
			};
			finalAnswer = askWords ? wordAr : String(n);
		} else {
			// Successor / predecessor within 0..9 based on counted image
			const askNext = n <= 8;
			const targetAns = askNext ? n + 1 : n - 1;
			const distractors = pickDistinctDigits0To9(
				targetAns,
				[n, askNext ? n + 2 : n - 2, askNext ? Math.max(0, n - 1) : 0],
				rng
			);
			const built = buildUniqueMcqOptions(
				`$${targetAns}$`,
				distractors.map((d) => ({
					text: `$${d}$`,
					diagnosticFeedback: askNext
						? `عُدَّ أَوَّلًا ما في الصُّورَةِ ($${n}$)، ثُمَّ ابْحَثْ عَنِ العَدَدِ الَّذِي يَلِيهِ مُباشَرَةً ($${targetAns}$).`
						: `عُدَّ أَوَّلًا ما في الصُّورَةِ ($${n}$)، ثُمَّ ابْحَثْ عَنِ العَدَدِ الَّذِي يَسْبِقُهُ مُباشَرَةً ($${targetAns}$).`
				})),
				rng
			);
			const qText = askNext
				? `عُدَّ ${item.titleWord} في الصُّورَةِ، ثُمَّ اخْتَرِ العَدَدَ الَّذِي يَأْتي مُباشَرَةً بَعْدَهُ:`
				: `عُدَّ ${item.titleWord} في الصُّورَةِ، ثُمَّ اخْتَرِ العَدَدَ الَّذِي يَسْبِقُهُ مُباشَرَةً:`;
			quizQuestion = {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: `مَجْمُوعَةُ ${item.titleWord}`,
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: askNext
					? `في الصُّورَةِ يُوجَدُ $${n}$، وَالعَدَدُ المُوالِي لَهُ هُوَ $${targetAns}$.`
					: `في الصُّورَةِ يُوجَدُ $${n}$، وَالعَدَدُ السّابِقُ لَهُ هُوَ $${targetAns}$.`
			};
			finalAnswer = String(targetAns);
		}

		let secondPrompt = '';
		let secondAnswer = '';
		if (n === 0) {
			secondPrompt = '2) أَكْمِلِ الشَّرِيطَ العَدَدِيَّ التّالِيَ:  $0$ ، ..... ، $2$ ، ..... ، $4$';
			secondAnswer = '$0$ ، $1$ ، $2$ ، $3$ ، $4$';
		} else if (n <= 8) {
			secondPrompt = `2) اكْتُبِ العَدَدَ السّابِقَ وَالعَدَدَ المُوالِيَ لِلْعَدَدِ $${n}$:\nالسّابِقُ: .....      المُوالِي: .....`;
			secondAnswer = `السّابِقُ: $${n - 1}$، المُوالِي: $${n + 1}$.`;
		} else {
			secondPrompt = '2) اكْتُبِ العَدَدَيْنِ السّابِقَيْنِ مُباشَرَةً لِلْعَدَدِ $9$:  ..... ، ..... ، $9$';
			secondAnswer = '$7$ ، $8$ ، $9$';
		}

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.3fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) عُدَّ ${item.titleWord} في الصُّورَةِ وَاكْتُبِ العَدَدَ بِالأَرْقامِ وَالحُرُوفِ: .....`,
						answer: `العَدَدُ بِالأَرْقامِ: $${n}$، وَبِالحُرُوفِ: ${wordAr}.`,
						mark: '1'
					},
					{
						type: 'image',
						src: svgPath,
						caption: `عُدَّ ${item.titleWord}`
					}
				]
			},
			{
				type: 'text',
				content: secondPrompt,
				answer: secondAnswer,
				mark: '1'
			}
		];

		return {
			templateId: '1ap_t1_counting_0_9',
			seed: cleanSeed,
			grade: '1ap',
			trimesterId: 't1',
			difficulty,
			domain: 'numeric',
			titleAr: 'عَدُّ وَكِتابَةُ الأَعْدادِ مِنْ 0 إِلى 9',
			quizQuestion,
			sujetExercise: {
				points: 2,
				instruction: 'تَأَمَّلِ الصُّورَةَ جَيِّدًا، ثُمَّ أَجِبْ عَنِ السُّؤالَيْنِ:',
				content
			},
			hints: [
				'أَشِرْ بِإِصْبَعِكَ إِلى كُلِّ عُنْصُرٍ مَرَّةً واحِدَةً فَقَطْ عِنْدَ العَدِّ.',
				'إِذا كانَتِ المَجْمُوعَةُ فارِغَةً لا شَيْءَ فِيها، نَكْتُبُ العَدَدَ $0$ (صِفْرٌ).',
				'تَذَكَّرْ تَرْتِيبَ الأَعْدادِ: $0$، $1$، $2$، $3$، $4$، $5$، $6$، $7$، $8$، $9$.'
			],
			solutionStepsAr: [
				n === 0
					? 'المَجْمُوعَةُ في الصُّورَةِ فارِغَةٌ، إِذَنْ عَدَدُ عَناصِرِها هُوَ $0$ (صِفْرٌ).'
					: `نَعُدُّ عَناصِرَ الصُّورَةِ واحِدًا واحِدًا فَنَجِدُ $${n}$ (${wordAr}).`,
				n === 0
					? 'بَعْدَ $0$ يَأْتي $1$، وَبَعْدَ $2$ يَأْتي $3$.'
					: n <= 8
						? `العَدَدُ الَّذِي يَسْبِقُ $${n}$ هُوَ $${n - 1}$، وَالَّذِي يَلِيهِ هُوَ $${n + 1}$.`
						: 'العَدَدانِ السّابِقانِ لِلْعَدَدِ $9$ هُما $7$ ثُمَّ $8$.'
			],
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// 2. Comparing Quantities & > / < / = up to 9 (with svgCountingObjects)
// ---------------------------------------------------------------------------
const templateCompareQuantities: ParameterizedTemplate = {
	id: '1ap_t1_compare_quantities',
	grade: '1ap',
	trimesterId: 't1',
	domain: 'numeric',
	curriculumLessonId: 'lesson_1ap_t1_compare_quantities',
	titleAr: 'مُقارَنَةُ كَمِّيّاتٍ وَأَعْدادٍ حَتّى 9',
	defaultPoints: 2,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 2);
		const item = rng.pick(COUNTABLE_ITEMS);

		const minV = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 4;
		const maxV = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 8 : 9;
		const makeEqual = rng.int(0, 4) === 0;

		const a = rng.int(minV, maxV);
		let b = a;
		if (!makeEqual) {
			if (difficulty === 'hard') {
				const candidates = [a - 1, a + 1].filter((x) => x >= minV && x <= maxV);
				b = candidates.length > 0 ? rng.pick(candidates) : a === maxV ? a - 1 : a + 1;
			} else {
				const candidates: number[] = [];
				for (let x = minV; x <= maxV; x++) {
					if (x !== a) candidates.push(x);
				}
				b = rng.pick(candidates);
			}
		}

		const sym = a > b ? '>' : a < b ? '<' : '=';
		const phraseAr =
			a > b
				? `أَكْثَرُ مِنَ المَجْمُوعَةِ اليُمْنى`
				: a < b
					? `أَقَلُّ مِنَ المَجْمُوعَةِ اليُمْنى`
					: `بِقَدْرِ المَجْمُوعَةِ اليُمْنى`;

		const svg = svgCountingObjects({
			count: a,
			secondGroupCount: b,
			operatorLabel: '؟',
			kind: item.kind,
			perRow: 5
		});
		const svgPath = saveSvgAsset(`1ap_t1_cmp_s${cleanSeed}_${difficulty}`, svg);

		const variant = rng.int(0, 2);
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer = '';

		if (variant === 0) {
			const correctText = `$${a} ${sym} ${b}$`;
			let distractors: { text: string; diagnosticFeedback: string }[];
			if (a !== b) {
				const opp = a > b ? '<' : '>';
				distractors = [
					{
						text: `$${a} ${opp} ${b}$`,
						diagnosticFeedback: `انْتَبِهْ لِاتِّجاهِ الرَّمْزِ: فَمُ التِّمْساحِ ($>$ أَوْ $<$) يَتَّجِهُ دائِمًا نَحْوَ العَدَدِ الأَكْبَرِ.`
					},
					{
						text: `$${a} = ${b}$`,
						diagnosticFeedback: `العَدَدانِ $${a}$ وَ $${b}$ غَيْرُ مُتَساوِيَيْنِ.`
					},
					{
						text: `$${b} ${sym} ${a}$`,
						diagnosticFeedback: `المَجْمُوعَةُ اليُسْرى فِيها $${a}$ وَاليُمْنى فِيها $${b}$؛ تَأَكَّدْ مِنَ التَّرْتِيبِ وَالمُقارَنَةِ.`
					}
				];
			} else {
				const falseCmp = a < 9 ? `$${a} > ${a + 1}$` : '$8 > 9$';
				distractors = [
					{
						text: `$${a} > ${a}$`,
						diagnosticFeedback: 'في المَجْمُوعَتَيْنِ نَفْسُ العَدَدِ، لِذا نَسْتَعْمِلُ الرَّمْزَ ($=$).'
					},
					{
						text: `$${a} < ${a}$`,
						diagnosticFeedback: 'في المَجْمُوعَتَيْنِ نَفْسُ العَدَدِ، فَالْمُقارَنَةُ هِيَ المُساواةُ ($=$).'
					},
					{
						text: falseCmp,
						diagnosticFeedback: `عُدَّ كُلَّ مَجْمُوعَةٍ بِدِقَّةٍ: كِلاهُما تَحْتَوِي عَلى $${a}$.`
					}
				];
			}

			const built = buildUniqueMcqOptions(correctText, distractors, rng);
			const qText = `تَأَمَّلِ الصُّورَةَ: عُدَّ ${item.titleWord} في المَجْمُوعَةِ اليُسْرى ثُمَّ اليُمْنى، وَاخْتَرِ المُقارَنَةَ الصَّحِيحَةَ:`;
			quizQuestion = {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: 'مُقارَنَةُ كَمِّيَّتَيْنِ',
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `في المَجْمُوعَةِ اليُسْرى $${a}$ وَفي اليُمْنى $${b}$، إِذَنِ المُقارَنَةُ الصَّحِيحَةُ هِيَ: $${a} ${sym} ${b}$.`
			};
			finalAnswer = `${a} ${sym} ${b}`;
		} else if (variant === 1) {
			const isTrue = rng.int(0, 1) === 1;
			let claimedRel = '';
			if (isTrue) {
				claimedRel =
					a > b
						? 'أَكْثَرُ مِنْ عَدَدِ العَناصِرِ في المَجْمُوعَةِ اليُمْنى'
						: a < b
							? 'أَقَلُّ مِنْ عَدَدِ العَناصِرِ في المَجْمُوعَةِ اليُمْنى'
							: 'بِقَدْرِ عَدَدِ العَناصِرِ في المَجْمُوعَةِ اليُمْنى';
			} else {
				claimedRel =
					a > b
						? 'أَقَلُّ مِنْ عَدَدِ العَناصِرِ في المَجْمُوعَةِ اليُمْنى'
						: a < b
							? 'أَكْثَرُ مِنْ عَدَدِ العَناصِرِ في المَجْمُوعَةِ اليُمْنى'
							: 'أَكْثَرُ مِنْ عَدَدِ العَناصِرِ في المَجْمُوعَةِ اليُمْنى';
			}
			const qText = `تَأَمَّلِ الصُّورَةَ وَأَجِبْ بِصَحِيحٍ أَوْ خَطَإٍ: عَدَدُ ${item.titleWord} في المَجْمُوعَةِ اليُسْرى ${claimedRel}.`;
			quizQuestion = {
				type: 'true_false',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: 'مُقارَنَةُ كَمِّيَّتَيْنِ',
				questionData: {
					correctAnswer: isTrue
				},
				explanation: `المَجْمُوعَةُ اليُسْرى فِيها $${a}$ وَاليُمْنى فِيها $${b}$؛ إِذَنْ المَجْمُوعَةُ اليُسْرى ${phraseAr}.`
			};
			finalAnswer = isTrue ? 'صَحِيحٌ' : 'خَطَأٌ';
		} else {
			const optMore = 'المَجْمُوعَةُ اليُسْرى أَكْثَرُ مِنَ اليُمْنى';
			const optLess = 'المَجْمُوعَةُ اليُسْرى أَقَلُّ مِنَ اليُمْنى';
			const optEqual = 'المَجْمُوعَةُ اليُسْرى بِقَدْرِ اليُمْنى';
			const optZero = 'المَجْمُوعَتانِ فارِغَتانِ ($0$)';

			const correctPhrase = a > b ? optMore : a < b ? optLess : optEqual;
			const allCandidates = [
				{
					text: optMore,
					diagnosticFeedback: `المَجْمُوعَةُ اليُسْرى فِيها $${a}$ وَاليُمْنى فِيها $${b}$؛ قارِنِ العَدَدَيْنِ.`
				},
				{
					text: optLess,
					diagnosticFeedback: `المَجْمُوعَةُ اليُسْرى فِيها $${a}$ وَاليُمْنى فِيها $${b}$؛ قارِنِ العَدَدَيْنِ.`
				},
				{
					text: optEqual,
					diagnosticFeedback: `تَكُونُ الكَمِّيَّتانِ بِقَدْرِ بَعْضِهِما عِنْدَما يَتَساوى العَدَدانِ فَقَطْ.`
				},
				{
					text: optZero,
					diagnosticFeedback: 'انْظُرْ إِلى الصُّورَةِ: هُناكَ عَناصِرُ داخِلَ الصُّنْدُوقَيْنِ.'
				}
			].filter((d) => d.text !== correctPhrase);

			const built = buildUniqueMcqOptions(correctPhrase, allCandidates, rng);
			const qText = `انْظُرْ إِلى الصُّورَةِ وَقارِنْ بَيْنَ المَجْمُوعَةِ اليُسْرى وَالمَجْمُوعَةِ اليُمْنى:`;
			quizQuestion = {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: 'أَكْثَرُ مِنْ / أَقَلُّ مِنْ / بِقَدْرِ',
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `عَدَدُ المَجْمُوعَةِ اليُسْرى $${a}$ وَعَدَدُ اليُمْنى $${b}$، لِذا: ${correctPhrase}.`
			};
			finalAnswer = correctPhrase;
		}

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.3fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) عُدَّ ${item.titleWord} في كُلِّ مَجْمُوعَةٍ، ثُمَّ أَكْمِلْ بِـ (أَكْثَرُ مِنْ / أَقَلُّ مِنْ / بِقَدْرِ):\nالمَجْمُوعَةُ اليُسْرى: .....      المَجْمُوعَةُ اليُمْنى: .....\nالمَجْمُوعَةُ اليُسْرى .................... المَجْمُوعَةِ اليُمْنى.`,
						answer: `المَجْمُوعَةُ اليُسْرى: $${a}$، المَجْمُوعَةُ اليُمْنى: $${b}$.\nالمَجْمُوعَةُ اليُسْرى ${phraseAr}.`,
						mark: '1'
					},
					{
						type: 'image',
						src: svgPath,
						caption: 'مُقارَنَةُ مَجْمُوعَتَيْنِ'
					}
				]
			},
			{
				type: 'text',
				content: `2) قارِنْ باستِعْمالِ الرَّمْزِ المُنَاسِبِ ($<$ أَوْ $>$ أَوْ $=$):   $${a}$ ..... $${b}$`,
				answer: `$ ${a} ${sym} ${b} $`,
				mark: '1'
			}
		];

		return {
			templateId: '1ap_t1_compare_quantities',
			seed: cleanSeed,
			grade: '1ap',
			trimesterId: 't1',
			difficulty,
			domain: 'numeric',
			titleAr: 'مُقارَنَةُ كَمِّيّاتٍ وَأَعْدادٍ حَتّى 9',
			quizQuestion,
			sujetExercise: {
				points: 2,
				instruction: 'لاحِظِ الصُّورَةَ جَيِّدًا، ثُمَّ أَجِبْ:',
				content
			},
			hints: [
				'عُدَّ العَناصِرَ في المَجْمُوعَةِ اليُسْرى أَوَّلًا، ثُمَّ في المَجْمُوعَةِ اليُمْنى.',
				'تَذَكَّرْ: الرَّمْزُ $>$ يَعْنِي أَكْبَرُ مِنْ، وَ $<$ يَعْنِي أَصْغَرُ مِنْ، وَ $=$ يَعْنِي يُساوِي.',
				'فُتْحَةُ الرَّمْزِ تَتَّجِهُ دائِمًا نَحْوَ العَدَدِ الأَكْبَرِ.'
			],
			solutionStepsAr: [
				`نَعُدُّ عَناصِرَ المَجْمُوعَةِ اليُسْرى فَنَجِدُ $${a}$، وَعَناصِرَ اليُمْنى فَنَجِدُ $${b}$.`,
				`المُقارَنَةُ هِيَ: $${a} ${sym} ${b}$، أَيِ المَجْمُوعَةُ اليُسْرى ${phraseAr}.`
			],
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// 3. Additive Decompositions of 5..9
// ---------------------------------------------------------------------------
const templateAdditiveDecomp: ParameterizedTemplate = {
	id: '1ap_t1_additive_decomp_5_9',
	grade: '1ap',
	trimesterId: 't1',
	domain: 'numeric',
	curriculumLessonId: 'lesson_1ap_t1_addition_symbols_to_9',
	titleAr: 'التَّفْكِيكُ الجَمْعِيُّ لِلْأَعْدادِ مِنْ 5 إِلى 9',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 3);

		const targetPool =
			difficulty === 'easy'
				? [5, 6]
				: difficulty === 'medium'
					? [6, 7, 8]
					: [8, 9];
		const target = rng.pick(targetPool);

		const allPairs: [number, number][] = [];
		for (let x = 1; x <= Math.floor(target / 2); x++) {
			allPairs.push([x, target - x]);
		}
		const shuffledPairs = rng.shuffle(allPairs);
		const [rawA1, rawB1] = shuffledPairs[0];
		const [rawA2, rawB2] = shuffledPairs[1] ?? [rawB1, rawA1];
		const swap1 = rng.int(0, 1) === 1;
		const a1 = swap1 ? rawB1 : rawA1;
		const b1 = swap1 ? rawA1 : rawB1;
		const a2 = rawA2;
		const b2 = rawB2;

		const svg = svgDecompBeads(a1, b1);
		const svgPath = saveSvgAsset(`1ap_t1_decomp_s${cleanSeed}_${difficulty}`, svg);

		const variant = rng.int(0, 2);
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer = '';

		if (variant === 0) {
			const qText = `تَأَمَّلْ تَمْثِيلَ العَدَدِ $${target}$ في الصُّورَةِ ($${a1}$ زَرْقاءُ وَالبَقِيَّةُ بُرْتُقالِيَّةٌ). أَكْمِلْ تَفْكِيكَ العَدَدِ $${target}$:`;
			quizQuestion = {
				type: 'fill_blank',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: `تَفْكِيكُ العَدَدِ ${target}`,
				questionData: {
					sentence: `لِتَكْوِينِ العَدَدِ ${target} نَضُمُّ ${a1} إِلى العَدَدِ ___`,
					acceptedAnswers: [String(b1)]
				},
				explanation: `لَدَيْنا $${a1}$ أَقْراصٍ زَرْقاءَ وَ $${b1}$ أَقْراصٍ بُرْتُقالِيَّةٍ، لِأَنَّ $${a1} + ${b1} = ${target}$.`
			};
			finalAnswer = String(b1);
		} else if (variant === 1) {
			const correctText = `$${a1} + ${b1}$`;
			const wrongPairs: { text: string; diagnosticFeedback: string }[] = [];
			const seenExpr = new Set<string>([`${a1}+${b1}`]);

			const candidatePairs: [number, number][] = [
				[a1, b1 > 0 ? b1 - 1 : b1 + 1],
				[a2, b2 > 0 ? b2 - 1 : b2 + 1],
				[Math.max(0, a1 - 1), Math.max(0, b1 - 1)],
				[Math.min(9, a1 + 1), Math.max(0, b1 - 2)],
				[1, Math.max(0, target - 2)],
				[0, Math.max(1, target - 1)]
			];

			for (const [x, y] of candidatePairs) {
				if (x >= 0 && x <= 9 && y >= 0 && y <= 9 && x + y <= 9 && x + y !== target) {
					const key = `${x}+${y}`;
					if (!seenExpr.has(key)) {
						seenExpr.add(key);
						wrongPairs.push({
							text: `$${x} + ${y}$`,
							diagnosticFeedback: `احْسُبْ $${x} + ${y} = ${x + y}$، وَهَذا لا يُساوِي $${target}$.`
						});
					}
				}
				if (wrongPairs.length === 3) break;
			}
			for (let x = 1; x <= 8 && wrongPairs.length < 3; x++) {
				for (let y = 0; y <= 9 - x && wrongPairs.length < 3; y++) {
					const key = `${x}+${y}`;
					if (x + y !== target && !seenExpr.has(key)) {
						seenExpr.add(key);
						wrongPairs.push({
							text: `$${x} + ${y}$`,
							diagnosticFeedback: `احْسُبْ $${x} + ${y} = ${x + y}$، وَهَذا لا يُساوِي $${target}$.`
						});
					}
				}
			}

			const built = buildUniqueMcqOptions(correctText, wrongPairs, rng);
			const qText = `أَيُّ كِتابَةٍ جَمْعِيَّةٍ تُساوِي العَدَدَ $${target}$؟`;
			quizQuestion = {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: `أَقْراصُ العَدَدِ ${target}`,
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `الكِتابَةُ الصَّحِيحَةُ هِيَ $${a1} + ${b1}$ لِأَنَّ $${a1} + ${b1} = ${target}$.`
			};
			finalAnswer = `${a1} + ${b1}`;
		} else {
			const isTrue = rng.int(0, 1) === 1;
			const wrongB = b1 >= 2 ? b1 - 1 : b1 + 1;
			const shownB = isTrue ? b1 : a1 + wrongB <= 9 && a1 + wrongB !== target ? wrongB : Math.max(0, b1 - 1);
			const actualSum = a1 + shownB;
			const qText = `أَجِبْ بِصَحِيحٍ أَوْ خَطَإٍ: الكِتابَةُ $${a1} + ${shownB}$ هِيَ تَفْكِيكٌ لِلْعَدَدِ $${target}$.`;
			quizQuestion = {
				type: 'true_false',
				questionText: qText,
				questionTextAr: qText,
				questionData: {
					correctAnswer: isTrue
				},
				explanation: isTrue
					? `صَحِيحٌ، لِأَنَّ $${a1} + ${shownB} = ${target}$.`
					: `خَطَأٌ، لِأَنَّ $${a1} + ${shownB} = ${actualSum}$ وَلَيْسَ $${target}$.`
			};
			finalAnswer = isTrue ? 'صَحِيحٌ' : 'خَطَأٌ';
		}

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.3fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) لاحِظِ الأَقْراصَ في الصُّورَةِ ثُمَّ أَكْمِلْ تَفْكِيكَ العَدَدِ $${target}$:\n$${target} = ${a1} +$ .....`,
						answer: `$ ${target} = ${a1} + ${b1} $`,
						mark: '1'
					},
					{
						type: 'image',
						src: svgPath,
						caption: `تَمْثِيلُ العَدَدِ ${target}`
					}
				]
			},
			{
				type: 'text',
				content: `2) أَكْمِلِ الكِتابَةَ الجَمْعِيَّةَ الثّانِيَةَ لِلْعَدَدِ $${target}$:   $${target} = ${a2} +$ .....`,
				answer: `$ ${target} = ${a2} + ${b2} $`,
				mark: '1'
			},
			{
				type: 'text',
				content: `3) اكْتُبْ تَفْكِيكًا جَمْعِيًّا ثالِثًا لِلْعَدَدِ $${target}$ باستِعْمالِ الصِّفْرِ ($0$):   $${target} =$ ..... $+$ .....`,
				answer: `$ ${target} = ${target} + 0 $`,
				mark: '1'
			}
		];

		return {
			templateId: '1ap_t1_additive_decomp_5_9',
			seed: cleanSeed,
			grade: '1ap',
			trimesterId: 't1',
			difficulty,
			domain: 'numeric',
			titleAr: 'التَّفْكِيكُ الجَمْعِيُّ لِلْأَعْدادِ مِنْ 5 إِلى 9',
			quizQuestion,
			sujetExercise: {
				points: 3,
				instruction: `فَكِّكِ العَدَدَ $${target}$ إِلى مَجْمُوعِ عَدَدَيْنِ بِطَرِيقَتَيْنِ أَوْ أَكْثَرَ:`,
				content
			},
			hints: [
				`عُدَّ الأَقْراصَ الزَّرْقاءَ ($${a1}$) ثُمَّ عُدَّ الأَقْراصَ البُرْتُقالِيَّةَ لِتَصِلَ إِلى $${target}$.`,
				`كُلُّ عَدَدٍ يُمْكِنُ كِتابَتُهُ عَلى شَكْلِ عِدَّةِ مَجامِيعَ مُخْتَلِفَةٍ، مِثْلَ $${target} = ${a1} + ${b1}$.`,
				`عِنْدَ جَمْعِ أَيِّ عَدَدٍ مَعَ الصِّفْرِ ($0$) يَبْقى العَدَدُ نَفْسُهُ: $${target} + 0 = ${target}$.`
			],
			solutionStepsAr: [
				`التَّفْكِيكُ الأَوَّلُ مِنْ خِلالِ الصُّورَةِ هُوَ: $${target} = ${a1} + ${b1}$.`,
				`التَّفْكِيكُ الثّانِي هُوَ: $${target} = ${a2} + ${b2}$.`,
				`باستِعْمالِ الصِّفْرِ نَكْتُبُ: $${target} = ${target} + 0$.`
			],
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// 4. Spatial Orientation & Direct Length Comparison
// ---------------------------------------------------------------------------
const templateSpatialAndLengths: ParameterizedTemplate = {
	id: '1ap_t1_spatial_and_lengths',
	grade: '1ap',
	trimesterId: 't1',
	domain: 'geometry',
	curriculumLessonId: 'lesson_1ap_t1_compare_lengths_direct',
	titleAr: 'التَّمَوْقُعُ في الفَضاءِ وَمُقارَنَةُ الأَطْوالِ مُباشَرَةً',
	defaultPoints: 2,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 4);
		const mode = rng.int(0, 2);

		if (mode === 0) {
			// Direct comparison of 3 lengths starting from the same baseline
			const palette = [
				{ fill: '#3b82f6', stroke: '#1d4ed8', colorAr: 'الأَزْرَقُ' },
				{ fill: '#22c55e', stroke: '#15803d', colorAr: 'الأَخْضَرُ' },
				{ fill: '#f97316', stroke: '#c2410c', colorAr: 'البُرْتُقالِيُّ' }
			];

			if (difficulty === 'medium' && rng.int(0, 1) === 0) {
				// Two equal ribbons + one distinct ribbon
				const makeThirdLonger = rng.int(0, 1) === 0;
				const widths = rng.shuffle(
					makeThirdLonger ? [130, 130, 235] : [185, 185, 85]
				);
				const ribbons = [0, 1, 2].map((i) => ({
					num: i + 1,
					widthPx: widths[i],
					fill: palette[i].fill,
					stroke: palette[i].stroke
				}));
				const svgPath = saveSvgAsset(
					`1ap_t1_len_s${cleanSeed}_${difficulty}`,
					svgCompareLengths(ribbons)
				);

				const equalPair = ribbons.filter((r) => r.widthPx === (makeThirdLonger ? 130 : 185));
				const oddOne = ribbons.find((r) => r.widthPx !== (makeThirdLonger ? 130 : 185))!;
				const eqA = equalPair[0].num;
				const eqB = equalPair[1].num;
				const correctPairStr = `$${eqA}$ وَ $${eqB}$`;

				const allPairStrs = ['$1$ وَ $2$', '$1$ وَ $3$', '$2$ وَ $3$'].filter(
					(s) => s !== correctPairStr
				);
				const built = buildUniqueMcqOptions(
					correctPairStr,
					[
						...allPairStrs.map((s) => ({
							text: s,
							diagnosticFeedback:
								'انْظُرْ إِلى نِهايَةِ كُلِّ شَرِيطٍ في اليَمِينِ؛ الشَّرِيطانِ اللّذانِ يَنْتَهِيانِ عِنْدَ نَفْسِ الحَدِّ لَهُما نَفْسُ الطُّولِ.'
						})),
						{
							text: 'كُلُّها مُخْتَلِفَةٌ في الطُّولِ',
							diagnosticFeedback: `يُوجَدُ شَرِيطانِ بَدَآ مَعًا وَانْتَهَيا مَعًا (${eqA} وَ ${eqB}).`
						}
					],
					rng
				);

				const qText = 'انْطَلَقَتِ الأَشْرِطَةُ الثَّلاثَةُ مِنْ نَفْسِ خَطِّ البِدايَةِ. أَيُّ شَرِيطَيْنِ لَهُما نَفْسُ الطُّولِ؟';
				const content: ContentBlock[] = [
					{
						type: 'columns',
						widths: ['1.25fr', '1fr'],
						children: [
							{
								type: 'text',
								content: '1) انْطَلَقَتِ الأَشْرِطَةُ الثَّلاثَةُ مِنْ نَفْسِ خَطِّ البِدايَةِ. ما رَقْما الشَّرِيطَيْنِ اللّذَيْنِ لَهُما نَفْسُ الطُّولِ؟',
								answer: `الشَّرِيطانِ $${eqA}$ وَ $${eqB}$ لَهُما نَفْسُ الطُّولِ.`,
								mark: '1'
							},
							{
								type: 'image',
								src: svgPath,
								caption: 'مُقارَنَةُ أَطْوالِ الأَشْرِطَةِ'
							}
						]
					},
					{
						type: 'text',
						content: `2) أَكْمِلْ بِـ (أَطْوَلُ مِنْ / أَقْصَرُ مِنْ): الشَّرِيطُ $${oddOne.num}$ .................... الشَّرِيطِ $${eqA}$.`,
						answer: `الشَّرِيطُ $${oddOne.num}$ ${makeThirdLonger ? 'أَطْوَلُ مِنَ' : 'أَقْصَرُ مِنَ'} الشَّرِيطِ $${eqA}$.`,
						mark: '1'
					}
				];

				return {
					templateId: '1ap_t1_spatial_and_lengths',
					seed: cleanSeed,
					grade: '1ap',
					trimesterId: 't1',
					difficulty,
					domain: 'geometry',
					titleAr: 'التَّمَوْقُعُ في الفَضاءِ وَمُقارَنَةُ الأَطْوالِ مُباشَرَةً',
					quizQuestion: {
						type: 'mcq',
						questionText: qText,
						questionTextAr: qText,
						imageUrl: svgPath,
						imageCaption: 'مُقارَنَةُ أَطْوالٍ مُباشَرَةً',
						questionData: {
							options: built.options,
							correctIndices: built.correctIndices,
							correctIndexes: built.correctIndices
						},
						explanation: `الشَّرِيطانِ $${eqA}$ وَ $${eqB}$ يَبْدَآنِ مِنْ نَفْسِ الخَطِّ وَيَنْتَهِيانِ في نَفْسِ المَكانِ، إِذَنْ لَهُما نَفْسُ الطُّولِ.`
					},
					sujetExercise: {
						points: 2,
						instruction: 'لاحِظِ الأَشْرِطَةَ الثَّلاثَةَ المُنْطَلِقَةَ مِنْ نَفْسِ البِدايَةِ، ثُمَّ أَجِبْ:',
						content
					},
					hints: [
						'تَبدأُ الأَشْرِطَةُ كُلُّها مِنْ نَفْسِ الخَطِّ الأَحْمَرِ في اليَسارِ.',
						'راقِبْ أَيْنَ يَنْتَهِي كُلُّ شَرِيطٍ في الجِهَةِ اليُمْنى.',
						'الشَّرِيطانِ اللّذانِ يَنْتَهِيانِ عِنْدَ نَفْسِ الحَدِّ لَهُما نَفْسُ الطُّولِ.'
					],
					solutionStepsAr: [
						`بِمُقارَنَةِ الأَشْرِطَةِ انْطِلاقًا مِنْ خَطِّ البِدايَةِ، نَجِدُ أَنَّ الشَّرِيطَيْنِ $${eqA}$ وَ $${eqB}$ يَنْتَهِيانِ مَعًا.`,
						`الشَّرِيطُ $${oddOne.num}$ ${makeThirdLonger ? 'يَتَجاوَزُهُما فَهُوَ أَطْوَلُ مِنْهُما' : 'يَنْتَهِي قَبْلَهُما فَهُوَ أَقْصَرُ مِنْهُما'}.`
					],
					finalAnswer: `${eqA} و ${eqB}`
				};
			}

			// 3 distinct lengths
			const widths = rng.shuffle([75, 160, 245]);
			const ribbons = [0, 1, 2].map((i) => ({
				num: i + 1,
				widthPx: widths[i],
				fill: palette[i].fill,
				stroke: palette[i].stroke
			}));
			const svgPath = saveSvgAsset(
				`1ap_t1_len_s${cleanSeed}_${difficulty}`,
				svgCompareLengths(ribbons)
			);

			const sortedAsc = [...ribbons].sort((x, y) => x.widthPx - y.widthPx);
			const shortest = sortedAsc[0];
			const middle = sortedAsc[1];
			const longest = sortedAsc[2];

			let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
			let finalAnswer = '';

			if (difficulty === 'hard') {
				const askAsc = rng.int(0, 1) === 0;
				const correctArr = askAsc ? [shortest.num, middle.num, longest.num] : [longest.num, middle.num, shortest.num];
				const fmtOrder = (arr: number[]) => `$${arr[0]}$ ، ثُمَّ $${arr[1]}$ ، ثُمَّ $${arr[2]}$`;
				const correctStr = fmtOrder(correctArr);

				const perms: number[][] = [
					[1, 2, 3],
					[1, 3, 2],
					[2, 1, 3],
					[2, 3, 1],
					[3, 1, 2],
					[3, 2, 1]
				].filter((p) => p.join(',') !== correctArr.join(','));
				const pickedWrong = rng.pickDistinct(perms, 3);
				const built = buildUniqueMcqOptions(
					correctStr,
					pickedWrong.map((p) => ({
						text: fmtOrder(p),
						diagnosticFeedback: askAsc
							? `التَّرْتِيبُ المَطْلُوبُ مِنَ الأَقْصَرِ ($${shortest.num}$) إِلى الأَطْوَلِ ($${longest.num}$).`
							: `التَّرْتِيبُ المَطْلُوبُ مِنَ الأَطْوَلِ ($${longest.num}$) إِلى الأَقْصَرِ ($${shortest.num}$).`
					})),
					rng
				);
				const qText = askAsc
					? 'انْطَلَقَتِ الأَشْرِطَةُ الثَّلاثَةُ مِنْ نَفْسِ البِدايَةِ. ما تَرْتِيبُها مِنَ الأَقْصَرِ إِلى الأَطْوَلِ؟'
					: 'انْطَلَقَتِ الأَشْرِطَةُ الثَّلاثَةُ مِنْ نَفْسِ البِدايَةِ. ما تَرْتِيبُها مِنَ الأَطْوَلِ إِلى الأَقْصَرِ؟';
				quizQuestion = {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: 'تَرْتِيبُ الأَشْرِطَةِ حَسَبَ الطُّولِ',
					questionData: {
						options: built.options,
						correctIndices: built.correctIndices,
						correctIndexes: built.correctIndices
					},
					explanation: `الأَقْصَرُ هُوَ $${shortest.num}$، ثُمَّ الأَوْسَطُ $${middle.num}$، ثُمَّ الأَطْوَلُ $${longest.num}$.`
				};
				finalAnswer = correctArr.join(' ، ');
			} else {
				const askLongest = rng.int(0, 1) === 0;
				const targetR = askLongest ? longest : shortest;
				const others = ribbons.filter((r) => r.num !== targetR.num);
				const built = buildUniqueMcqOptions(
					`الشَّرِيطُ $${targetR.num}$`,
					[
						...others.map((o) => ({
							text: `الشَّرِيطُ $${o.num}$`,
							diagnosticFeedback: askLongest
								? `الشَّرِيطُ $${targetR.num}$ يَصِلُ أَبْعَدَ في الجِهَةِ اليُمْنى، فَهُوَ الأَطْوَلُ.`
								: `الشَّرِيطُ $${targetR.num}$ يَنْتَهِي قَبْلَ البَقِيَّةِ، فَهُوَ الأَقْصَرُ.`
						})),
						{
							text: 'لَها نَفْسُ الطُّولِ',
							diagnosticFeedback: 'انْظُرْ إِلى نِهاياتِ الأَشْرِطَةِ؛ أَطْوالُها مُخْتَلِفَةٌ.'
						}
					],
					rng
				);
				const qText = askLongest
					? 'انْطَلَقَتِ الأَشْرِطَةُ الثَّلاثَةُ مِنْ نَفْسِ البِدايَةِ. ما رَقْمُ الشَّرِيطِ الأَطْوَلِ؟'
					: 'انْطَلَقَتِ الأَشْرِطَةُ الثَّلاثَةُ مِنْ نَفْسِ البِدايَةِ. ما رَقْمُ الشَّرِيطِ الأَقْصَرِ؟';
				quizQuestion = {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: 'مُقارَنَةُ أَطْوالٍ مُباشَرَةً',
					questionData: {
						options: built.options,
						correctIndices: built.correctIndices,
						correctIndexes: built.correctIndices
					},
					explanation: askLongest
						? `الشَّرِيطُ $${longest.num}$ يَتَجاوَزُ البَقِيَّةَ فَهُوَ الأَطْوَلُ.`
						: `الشَّرِيطُ $${shortest.num}$ يَنْتَهِي قَبْلَ البَقِيَّةِ فَهُوَ الأَقْصَرُ.`
				};
				finalAnswer = String(targetR.num);
			}

			const content: ContentBlock[] = [
				{
					type: 'columns',
					widths: ['1.25fr', '1fr'],
					children: [
						{
							type: 'text',
							content: '1) ما رَقْمُ الشَّرِيطِ الأَطْوَلِ، وَما رَقْمُ الشَّرِيطِ الأَقْصَرِ؟\nالأَطْوَلُ: .....      الأَقْصَرُ: .....',
							answer: `الأَطْوَلُ: $${longest.num}$، الأَقْصَرُ: $${shortest.num}$.`,
							mark: '1'
						},
						{
							type: 'image',
							src: svgPath,
							caption: 'مُقارَنَةُ أَطْوالِ الأَشْرِطَةِ'
						}
					]
				},
				{
					type: 'text',
					content: '2) رَتِّبِ الأَشْرِطَةَ مِنَ الأَقْصَرِ إِلى الأَطْوَلِ:   ..... ، ..... ، .....',
					answer: `$${shortest.num}$ ، $${middle.num}$ ، $${longest.num}$`,
					mark: '1'
				}
			];

			return {
				templateId: '1ap_t1_spatial_and_lengths',
				seed: cleanSeed,
				grade: '1ap',
				trimesterId: 't1',
				difficulty,
				domain: 'geometry',
				titleAr: 'التَّمَوْقُعُ في الفَضاءِ وَمُقارَنَةُ الأَطْوالِ مُباشَرَةً',
				quizQuestion,
				sujetExercise: {
					points: 2,
					instruction: 'لاحِظِ الأَشْرِطَةَ الثَّلاثَةَ المُنْطَلِقَةَ مِنْ نَفْسِ البِدايَةِ، ثُمَّ أَجِبْ:',
					content
				},
				hints: [
					'تَبْدَأُ الأَشْرِطَةُ كُلُّها مِنْ نَفْسِ خَطِّ البِدايَةِ الأَحْمَرِ.',
					'الشَّرِيطُ الَّذِي يَمْتَدُّ أَبْعَدَ في اليَمِينِ هُوَ الأَطْوَلُ.',
					'لِلتَّرْتِيبِ مِنَ الأَقْصَرِ إِلى الأَطْوَلِ نَبْدَأُ بِالأَقْصَرِ ($' + shortest.num + '$) وَنَنْتَهِي بِالأَطْوَلِ ($' + longest.num + '$).'
				],
				solutionStepsAr: [
					`مِنْ خَطِّ البِدايَةِ نُلاحِظُ أَنَّ الشَّرِيطَ $${shortest.num}$ هُوَ الأَقْصَرُ، وَالشَّرِيطَ $${longest.num}$ هُوَ الأَطْوَلُ.`,
					`التَّرْتِيبُ مِنَ الأَقْصَرِ إِلى الأَطْوَلِ هُوَ: $${shortest.num}$ ثُمَّ $${middle.num}$ ثُمَّ $${longest.num}$.`
				],
				finalAnswer
			};
		}

		if (mode === 1) {
			// Spatial scene: above/under table + inside/outside box
			const ballPos: 'above' | 'under' = rng.int(0, 1) === 0 ? 'above' : 'under';
			const starPos: 'inside' | 'outside' = rng.int(0, 1) === 0 ? 'inside' : 'outside';
			const svgPath = saveSvgAsset(
				`1ap_t1_spatial_s${cleanSeed}_${difficulty}`,
				svgSpatialScene({ ballPos, starPos })
			);

			const askBall = rng.int(0, 1) === 0;
			const ballPhrase = ballPos === 'above' ? 'فَوْقَ الطّاوِلَةِ' : 'تَحْتَ الطّاوِلَةِ';
			const starPhrase = starPos === 'inside' ? 'داخِلَ الصُّنْدُوقِ' : 'خارِجَ الصُّنْدُوقِ';
			const useTf = rng.int(0, 1) === 0;

			let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
			let finalAnswer = '';

			if (useTf) {
				const isTrue = rng.int(0, 1) === 1;
				const claimedBall = isTrue
					? ballPhrase
					: ballPos === 'above'
						? 'تَحْتَ الطّاوِلَةِ'
						: 'فَوْقَ الطّاوِلَةِ';
				const claimedStar = isTrue
					? starPhrase
					: starPos === 'inside'
						? 'خارِجَ الصُّنْدُوقِ'
						: 'داخِلَ الصُّنْدُوقِ';
				const qText = askBall
					? `لاحِظِ الصُّورَةَ وَأَجِبْ بِصَحِيحٍ أَوْ خَطَإٍ: الكُرَةُ الزَّرْقاءُ تَقَعُ ${claimedBall}.`
					: `لاحِظِ الصُّورَةَ وَأَجِبْ بِصَحِيحٍ أَوْ خَطَإٍ: النَّجْمَةُ الصَّفْراءُ تَقَعُ ${claimedStar}.`;
				quizQuestion = {
					type: 'true_false',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: 'التَّمَوْقُعُ في الفَضاءِ',
					questionData: {
						correctAnswer: isTrue
					},
					explanation: askBall
						? `الكُرَةُ الزَّرْقاءُ تَقَعُ ${ballPhrase}.`
						: `النَّجْمَةُ الصَّفْراءُ تَقَعُ ${starPhrase}.`
				};
				finalAnswer = isTrue ? 'صَحِيحٌ' : 'خَطَأٌ';
			} else {
				const correctLoc = askBall ? ballPhrase : starPhrase;
				const allLocs = [
					'فَوْقَ الطّاوِلَةِ',
					'تَحْتَ الطّاوِلَةِ',
					'داخِلَ الصُّنْدُوقِ',
					'خارِجَ الصُّنْدُوقِ'
				];
				const distractors = allLocs
					.filter((loc) => loc !== correctLoc)
					.map((loc) => ({
						text: loc,
						diagnosticFeedback: askBall
							? `انْظُرْ إِلى الجِهَةِ اليُسْرى مِنَ الصُّورَةِ حَيْثُ الطّاوِلَةُ؛ الكُرَةُ ${ballPhrase}.`
							: `انْظُرْ إِلى الجِهَةِ اليُمْنى مِنَ الصُّورَةِ حَيْثُ الصُّنْدُوقُ؛ النَّجْمَةُ ${starPhrase}.`
					}));
				const built = buildUniqueMcqOptions(correctLoc, distractors, rng);
				const qText = askBall
					? 'تَأَمَّلِ الصُّورَةَ: أَيْنَ تَقَعُ الكُرَةُ الزَّرْقاءُ؟'
					: 'تَأَمَّلِ الصُّورَةَ: أَيْنَ تَقَعُ النَّجْمَةُ الصَّفْراءُ؟';
				quizQuestion = {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: 'التَّمَوْقُعُ في الفَضاءِ',
					questionData: {
						options: built.options,
						correctIndices: built.correctIndices,
						correctIndexes: built.correctIndices
					},
					explanation: askBall
						? `تَظْهَرُ الكُرَةُ الزَّرْقاءُ ${ballPhrase}.`
						: `تَظْهَرُ النَّجْمَةُ الصَّفْراءُ ${starPhrase}.`
				};
				finalAnswer = correctLoc;
			}

			const content: ContentBlock[] = [
				{
					type: 'columns',
					widths: ['1.25fr', '1fr'],
					children: [
						{
							type: 'text',
							content: '1) أَكْمِلْ بِـ (فَوْقَ أَوْ تَحْتَ):\nتَقَعُ الكُرَةُ الزَّرْقاءُ .................... الطّاوِلَةِ.',
							answer: `تَقَعُ الكُرَةُ الزَّرْقاءُ ${ballPos === 'above' ? 'فَوْقَ' : 'تَحْتَ'} الطّاوِلَةِ.`,
							mark: '1'
						},
						{
							type: 'image',
							src: svgPath,
							caption: 'مَواقِعُ الأَشْياءِ'
						}
					]
				},
				{
					type: 'text',
					content: '2) أَكْمِلْ بِـ (داخِلَ أَوْ خارِجَ):\nتَقَعُ النَّجْمَةُ الصَّفْراءُ .................... الصُّنْدُوقِ.',
					answer: `تَقَعُ النَّجْمَةُ الصَّفْراءُ ${starPos === 'inside' ? 'داخِلَ' : 'خارِجَ'} الصُّنْدُوقِ.`,
					mark: '1'
				}
			];

			return {
				templateId: '1ap_t1_spatial_and_lengths',
				seed: cleanSeed,
				grade: '1ap',
				trimesterId: 't1',
				difficulty,
				domain: 'geometry',
				titleAr: 'التَّمَوْقُعُ في الفَضاءِ وَمُقارَنَةُ الأَطْوالِ مُباشَرَةً',
				quizQuestion,
				sujetExercise: {
					points: 2,
					instruction: 'لاحِظِ الصُّورَةَ ثُمَّ حَدِّدْ مَوْقِعَ كُلِّ شَيْءٍ:',
					content
				},
				hints: [
					'«فَوْقَ» تَعْني في الأَعْلى، وَ«تَحْتَ» تَعْني في الأَسْفَلِ.',
					'«داخِلَ» تَعْني في وَسَطِ الحُدودِ، وَ«خارِجَ» تَعْني بَعِيدًا عَنِ الحُدودِ.',
					`انْظُرْ أَوَّلًا إِلى الكُرَةِ مَعَ الطّاوِلَةِ، ثُمَّ إِلى النَّجْمَةِ مَعَ الصُّنْدُوقِ.`
				],
				solutionStepsAr: [
					`في الجِهَةِ اليُسْرى، الكُرَةُ الزَّرْقاءُ ${ballPhrase}.`,
					`في الجِهَةِ اليُمْنى، النَّجْمَةُ الصَّفْراءُ ${starPhrase}.`
				],
				finalAnswer
			};
		}

		// Mode 2: Left / Right / Order on svgShapesStrip
		const shapes = rng.shuffle(['square', 'rectangle', 'triangle', 'circle'] as const);
		const labels = ['1', '2', '3', '4'];
		const hiIdx = rng.int(1, 2); // 1 -> shape '2', 2 -> shape '3'
		const hiLabel = labels[hiIdx];
		const rightLabel = labels[hiIdx + 1];
		const leftLabel = labels[hiIdx - 1];

		const svgPath = saveSvgAsset(
			`1ap_t1_strip_s${cleanSeed}_${difficulty}`,
			svgShapesStrip({
				shapes: [...shapes],
				highlightIndex: hiIdx,
				labels
			})
		);

		const askRight = rng.int(0, 1) === 0;
		const ansLabel = askRight ? rightLabel : leftLabel;
		const wrongLabels = labels.filter((l) => l !== ansLabel);
		const built = buildUniqueMcqOptions(
			`الشَّكْلُ $${ansLabel}$`,
			wrongLabels.map((lbl) => ({
				text: `الشَّكْلُ $${lbl}$`,
				diagnosticFeedback: askRight
					? `الشَّكْلُ الأَصْفَرُ هُوَ $${hiLabel}$؛ انْظُرْ مُباشَرَةً إِلى يَمِينِهِ لِتَجِدَ $${ansLabel}$.`
					: `الشَّكْلُ الأَصْفَرُ هُوَ $${hiLabel}$؛ انْظُرْ مُباشَرَةً إِلى يَسارِهِ لِتَجِدَ $${ansLabel}$.`
			})),
			rng
		);

		const qText = askRight
			? `تَأَمَّلْ شَرِيطَ الأَشْكالِ المُرَقَّمَةِ: ما رَقْمُ الشَّكْلِ المَوْجُودِ مُباشَرَةً عَلى يَمِينِ الشَّكْلِ الأَصْفَرِ ($${hiLabel}$)؟`
			: `تَأَمَّلْ شَرِيطَ الأَشْكالِ المُرَقَّمَةِ: ما رَقْمُ الشَّكْلِ المَوْجُودِ مُباشَرَةً عَلى يَسارِ الشَّكْلِ الأَصْفَرِ ($${hiLabel}$)؟`;

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.25fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) ما رَقْمُ الشَّكْلِ المَوْجُودِ مُباشَرَةً عَلى يَمِينِ الشَّكْلِ الأَصْفَرِ ($${hiLabel}$)؟ .....`,
						answer: `الشَّكْلُ المَوْجُودُ عَلى يَمِينِهِ هُوَ $${rightLabel}$.`,
						mark: '1'
					},
					{
						type: 'image',
						src: svgPath,
						caption: 'شَرِيطُ الأَشْكالِ'
					}
				]
			},
			{
				type: 'text',
				content: `2) ما رَقْمُ الشَّكْلِ المَوْجُودِ مُباشَرَةً عَلى يَسارِ الشَّكْلِ الأَصْفَرِ ($${hiLabel}$)؟ .....`,
				answer: `الشَّكْلُ المَوْجُودُ عَلى يَسارِهِ هُوَ $${leftLabel}$.`,
				mark: '1'
			}
		];

		return {
			templateId: '1ap_t1_spatial_and_lengths',
			seed: cleanSeed,
			grade: '1ap',
			trimesterId: 't1',
			difficulty,
			domain: 'geometry',
			titleAr: 'التَّمَوْقُعُ في الفَضاءِ وَمُقارَنَةُ الأَطْوالِ مُباشَرَةً',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: 'شَرِيطُ الأَشْكالِ',
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `الشَّكْلُ الأَصْفَرُ هُوَ $${hiLabel}$؛ عَلى يَمِينِهِ الشَّكْلُ $${rightLabel}$ وَعَلى يَسارِهِ الشَّكْلُ $${leftLabel}$.`
			},
			sujetExercise: {
				points: 2,
				instruction: 'لاحِظْ شَرِيطَ الأَشْكالِ المُرَقَّمَةِ مِنَ اليَسارِ إِلى اليَمِينِ، ثُمَّ أَجِبْ:',
				content
			},
			hints: [
				`ابْحَثْ أَوَّلًا عَنِ الشَّكْلِ المُلَوَّنِ بِالأَصْفَرِ (رَقْمُهُ $${hiLabel}$).`,
				'جِهَةُ اليَمِينِ هِيَ الَّتِي نَحْوَ يَدِكَ اليُمْنى، وَجِهَةُ اليَسارِ نَحْوَ يَدِكَ اليُسْرى.',
				`الشَّكْلُ الَّذِي عَلى يَمِينِ $${hiLabel}$ هُوَ $${rightLabel}$، وَالَّذِي عَلى يَسارِهِ هُوَ $${leftLabel}$.`
			],
			solutionStepsAr: [
				`الشَّكْلُ الأَصْفَرُ رَقْمُهُ $${hiLabel}$.`,
				`عَلى يَمِينِ $${hiLabel}$ يَقَعُ الشَّكْلُ $${rightLabel}$، وَعَلى يَسارِهِ يَقَعُ الشَّكْلُ $${leftLabel}$.`
			],
			finalAnswer: ansLabel
		};
	}
};

// ---------------------------------------------------------------------------
// 5. Simple Addition Sums <= 9
// ---------------------------------------------------------------------------
const templateAdditionUnder10: ParameterizedTemplate = {
	id: '1ap_t1_addition_sums_under_10',
	grade: '1ap',
	trimesterId: 't1',
	domain: 'numeric',
	curriculumLessonId: 'lesson_1ap_t1_addition_symbols_to_9',
	titleAr: 'الجَمْعُ باستِعْمالِ الرَّمْزَيْنِ (+) وَ(=) حَتّى 9',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 5);

		const pickAddPair = (minSum: number, maxSum: number, allowZero = false): [number, number] => {
			const pairs: [number, number][] = [];
			const start = allowZero ? 0 : 1;
			for (let x = start; x <= maxSum; x++) {
				for (let y = start; y <= maxSum - x; y++) {
					if (x + y >= minSum && x + y <= maxSum) {
						pairs.push([x, y]);
					}
				}
			}
			return pairs.length > 0 ? rng.pick(pairs) : [2, 3];
		};

		const [minSum, maxSum] =
			difficulty === 'easy'
				? [2, 5]
				: difficulty === 'medium'
					? [5, 8]
					: [6, 9];

		const [a, b] = pickAddPair(minSum, maxSum, false);
		const sum = a + b;
		const [c, d] = pickAddPair(minSum, maxSum, difficulty === 'hard');
		const [e, f] = pickAddPair(minSum, maxSum, false);

		const item = rng.pick(COUNTABLE_ITEMS);
		const svgPath = saveSvgAsset(
			`1ap_t1_add_s${cleanSeed}_${difficulty}`,
			svgCountingObjects({
				count: a,
				secondGroupCount: b,
				operatorLabel: '+',
				kind: item.kind,
				perRow: 5
			})
		);

		const variant = rng.int(0, 2);
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer = '';

		if (variant === 0) {
			const qText = `تَأَمَّلِ الصُّورَةَ ثُمَّ احْسُبِ المَجْمُوعَ: $${a} + ${b} = ?$`;
			quizQuestion = {
				type: 'calculated',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: `${a} + ${b}`,
				questionData: {
					answer: sum,
					displayTemplate: `${a} + ${b} = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `نَضُمُّ $${a}$ إِلى $${b}$ فَنَحْصُلُ عَلى $${sum}$، أَيْ: $${a} + ${b} = ${sum}$.`
			};
			finalAnswer = String(sum);
		} else if (variant === 1) {
			const askMissing = difficulty === 'hard';
			if (askMissing) {
				const distractors = pickDistinctDigits0To9(
					b,
					[b + 1, b - 1, sum, a],
					rng
				);
				const built = buildUniqueMcqOptions(
					`$${b}$`,
					distractors.map((x) => ({
						text: `$${x}$`,
						diagnosticFeedback: `جَرِّبْ: $${a} + ${x} = ${a + x}$، وَلَيْسَ $${sum}$.`
					})),
					rng
				);
				const qText = `ما هُوَ العَدَدُ المَنْقُوصُ لِتَكُونَ المَساواةُ صَحِيحَةً: $${a} + ? = ${sum}$؟`;
				quizQuestion = {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					questionData: {
						options: built.options,
						correctIndices: built.correctIndices,
						correctIndexes: built.correctIndices
					},
					explanation: `لِأَنَّ $${a} + ${b} = ${sum}$، فَالْعَدَدُ المَنْقُوصُ هُوَ $${b}$.`
				};
				finalAnswer = String(b);
			} else {
				const distractors = pickDistinctDigits0To9(
					sum,
					[sum - 1, sum + 1, sum - 2, a, b],
					rng
				);
				const built = buildUniqueMcqOptions(
					`$${sum}$`,
					distractors.map((x) => ({
						text: `$${x}$`,
						diagnosticFeedback: `ابْدَأْ مِنَ العَدَدِ الأَكْبَرِ وَأَضِفِ العَدَدَ الثّانِيَ خُطْوَةً بِخُطْوَةٍ لِتَجِدَ $${sum}$.`
					})),
					rng
				);
				const qText = `تَأَمَّلِ الصُّورَةَ وَاخْتَرِ النّاتِجَ الصَّحِيحَ لِلْعَمَلِيَّةِ: $${a} + ${b} = ?$`;
				quizQuestion = {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: `${a} + ${b}`,
					questionData: {
						options: built.options,
						correctIndices: built.correctIndices,
						correctIndexes: built.correctIndices
					},
					explanation: `نَجْمَعُ المَجْمُوعَتَيْنِ مَعًا: $${a} + ${b} = ${sum}$.`
				};
				finalAnswer = String(sum);
			}
		} else {
			const isTrue = rng.int(0, 1) === 1;
			const claimed = isTrue ? sum : sum < 9 ? sum + 1 : sum - 1;
			const qText = `أَجِبْ بِصَحِيحٍ أَوْ خَطَإٍ: $${a} + ${b} = ${claimed}$.`;
			quizQuestion = {
				type: 'true_false',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: `${a} + ${b}`,
				questionData: {
					correctAnswer: isTrue
				},
				explanation: `ناتِجُ جَمْعِ $${a}$ وَ $${b}$ هُوَ $${sum}$.`
			};
			finalAnswer = isTrue ? 'صَحِيحٌ' : 'خَطَأٌ';
		}

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.25fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) احْسُبِ المَجْمُوعَ المُمَثَّلَ في الصُّورَةِ:   $${a} + ${b} =$ .....`,
						answer: `$ ${a} + ${b} = ${sum} $`,
						mark: '1'
					},
					{
						type: 'image',
						src: svgPath,
						caption: 'ضَمُّ مَجْمُوعَتَيْنِ'
					}
				]
			},
			{
				type: 'text',
				content: `2) احْسُبْ ما يَلي:   $${c} + ${d} =$ .....`,
				answer: `$ ${c} + ${d} = ${c + d} $`,
				mark: '1'
			},
			{
				type: 'text',
				content: `3) أَكْمِلْ بِالْعَدَدِ المُنَاسِبِ:   $${e} +$ ..... $= ${e + f}$`,
				answer: `$ ${e} + ${f} = ${e + f} $`,
				mark: '1'
			},
			buildIllustratedFigureBlock('pri_math_01_apple_baskets', {
				maxHeight: 112,
				width: '58%',
				mode: 'image_only',
				title: 'تَذْكِيرٌ بَصَرِيٌّ: الضَّمُّ وَالجَمْعُ فِي السَّلَّتَيْنِ'
			})
		];

		return {
			templateId: '1ap_t1_addition_sums_under_10',
			seed: cleanSeed,
			grade: '1ap',
			trimesterId: 't1',
			difficulty,
			domain: 'numeric',
			titleAr: 'الجَمْعُ باستِعْمالِ الرَّمْزَيْنِ (+) وَ(=) حَتّى 9',
			quizQuestion,
			sujetExercise: {
				points: 3,
				instruction: 'أَنْجِزْ عَمَلِيّاتِ الجَمْعِ التّالِيَةَ بِدِقَّةٍ:',
				content
			},
			hints: [
				'الرَّمْزُ $+$ يَعْني الضَّمَّ وَالإِضافَةَ، وَالرَّمْزُ $=$ يَعْني النّاتِجَ.',
				`ابْدَأْ مِنَ العَدَدِ الأَكْبَرِ ($${Math.max(a, b)}$) وَعُدَّ صاعِدًا بِقَدْرِ $${Math.min(a, b)}$.`,
				`عُدَّ كُلَّ العَناصِرِ في الصُّورَةِ مَعًا لِلتَّحَقُّقِ: $${a} + ${b} = ${sum}$.`
			],
			solutionStepsAr: [
				`نَجْمَعُ المَجْمُوعَتَيْنِ في الصُّورَةِ: $${a} + ${b} = ${sum}$.`,
				`المَجْمُوعُ الثّانِي: $${c} + ${d} = ${c + d}$.`,
				`لِلْوُصُولِ مِنْ $${e}$ إِلى $${e + f}$ نُضِيفُ $${f}$، إِذَنْ $${e} + ${f} = ${e + f}$.`
			],
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// 6. Integration Word Problem (isIntegration: true, customTitle: 'الوضعية الإدماجية', points: 4)
// ---------------------------------------------------------------------------
const templateIntegration1ApT1: ParameterizedTemplate = {
	id: '1ap_t1_integration_word',
	grade: '1ap',
	trimesterId: 't1',
	domain: 'integration',
	curriculumLessonId: 'lesson_1ap_t1_integration',
	titleAr: 'وَضْعِيَّةٌ إِدْماجِيَّةٌ: العَدُّ وَالمُقارَنَةُ وَالجَمْعُ إِلى 9',
	defaultPoints: 4,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 6);

		const pairPeople = rng.pickDistinct(CHILDREN_1AP, 2);
		const p1 = pairPeople[0];
		const p2 = pairPeople[1];

		const [minSum, maxSum] =
			difficulty === 'easy'
				? [3, 5]
				: difficulty === 'medium'
					? [5, 8]
					: [7, 9];

		const pairs: [number, number][] = [];
		for (let x = 1; x <= maxSum - 1; x++) {
			for (let y = 1; y <= maxSum - x; y++) {
				if (x + y >= minSum && x + y <= maxSum) {
					if (difficulty === 'hard' && x === y) continue;
					pairs.push([x, y]);
				}
			}
		}
		const [a, b] = pairs.length > 0 ? rng.pick(pairs) : [3, 4];
		const total = a + b;
		const cmpSym = a > b ? '>' : a < b ? '<' : '=';

		const storyVariant = rng.int(0, 2);
		let kind: ObjectKind = 'apple';
		let itemPlur = 'تُفّاحاتٍ';
		let storyText = '';
		let questionText = '';

		if (storyVariant === 0) {
			kind = 'apple';
			itemPlur = 'تُفّاحاتٍ';
			const vCollected = p1.fem ? 'جَمَعَتْ' : 'جَمَعَ';
			const vCollected2 = p2.fem ? 'وَجَمَعَتْ' : 'وَجَمَعَ';
			storyText = `في البُسْتانِ، ${vCollected} ${p1.name} ${formatCountedPhrase(a, COUNTABLE_ITEMS[0])}، ${vCollected2} ${p2.name} ${formatCountedPhrase(b, COUNTABLE_ITEMS[0])}.`;
			questionText = `في البُسْتانِ، ${vCollected} ${p1.name} $${a}$ ${itemPlur}، ${vCollected2} ${p2.name} $${b}$ ${itemPlur}. ما هُوَ العَدَدُ الكُلِّيُّ لِلتُّفّاحاتِ مَعًا؟`;
		} else if (storyVariant === 1) {
			kind = 'pencil';
			itemPlur = 'أَقْلامٍ';
			const vHas = p1.fem ? 'تَمْلِكُ' : 'يَمْلِكُ';
			const vHas2 = p2.fem ? 'وَتَمْلِكُ' : 'وَيَمْلِكُ';
			storyText = `في القِسْمِ، ${vHas} ${p1.name} ${formatCountedPhrase(a, COUNTABLE_ITEMS[3])}، ${vHas2} ${p2.name} ${formatCountedPhrase(b, COUNTABLE_ITEMS[3])}.`;
			questionText = `في القِسْمِ، ${vHas} ${p1.name} $${a}$ ${itemPlur}، ${vHas2} ${p2.name} $${b}$ ${itemPlur}. كَمْ قَلَمًا عِنْدَهُما مَعًا؟`;
		} else {
			kind = 'ball';
			itemPlur = 'كُراتٍ';
			const vBrought = p1.fem ? 'أَحْضَرَتْ' : 'أَحْضَرَ';
			const vBrought2 = p2.fem ? 'وَأَحْضَرَتْ' : 'وَأَحْضَرَ';
			storyText = `في ساحَةِ المَدْرَسَةِ، ${vBrought} ${p1.name} ${formatCountedPhrase(a, COUNTABLE_ITEMS[2])}، ${vBrought2} ${p2.name} ${formatCountedPhrase(b, COUNTABLE_ITEMS[2])}.`;
			questionText = `في ساحَةِ المَدْرَسَةِ، ${vBrought} ${p1.name} $${a}$ ${itemPlur}، ${vBrought2} ${p2.name} $${b}$ ${itemPlur}. ما هُوَ مَجْمُوعُ الكُراتِ كُلِّها؟`;
		}

		const svgPath = saveSvgAsset(
			`1ap_t1_integ_s${cleanSeed}_${difficulty}`,
			svgCountingObjects({
				count: a,
				secondGroupCount: b,
				operatorLabel: '+',
				kind,
				perRow: 5
			})
		);

		const useCalc = rng.int(0, 1) === 0;
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer = '';

		if (useCalc) {
			quizQuestion = {
				type: 'calculated',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: 'تَمْثِيلُ الوَضْعِيَّةِ الإِدْماجِيَّةِ',
				questionData: {
					answer: total,
					displayTemplate: `${a} + ${b} = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `نَجْمَعُ الكَمِّيَّتَيْنِ مَعًا باستِعْمالِ (+) وَ (=): $${a} + ${b} = ${total}$.`
			};
			finalAnswer = String(total);
		} else {
			const wrongSums = pickDistinctDigits0To9(
				total,
				[total - 1, total + 1, total - 2, total + 2, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(
					(s) => s >= 1 && s <= 9 && s !== total
				),
				rng
			);
			const wrongA = a < 8 ? a + 1 : a - 1;
			const wrongTotalA = wrongA + b;

			const correctExpr = `$${a} + ${b} = ${total}$`;
			const distractors = [
				{
					text: `$${a} + ${b} = ${wrongSums[0]}$`,
					diagnosticFeedback: `الأَعْدادُ في العَمَلِيَّةِ صَحِيحَةٌ، لَكِنْ راجِعِ المَجْمُوعَ: $${a} + ${b} = ${total}$.`
				},
				{
					text: `$${a} + ${b} = ${wrongSums[1]}$`,
					diagnosticFeedback: `عُدَّ كُلَّ العَناصِرِ في الصُّورَةِ لِلتَّأَكُّدِ مِنْ ناتِجِ $${a} + ${b}$.`
				},
				{
					text:
						wrongTotalA <= 9 && wrongA !== a
							? `$${wrongA} + ${b} = ${wrongTotalA}$`
							: `$${a} + ${b} = ${wrongSums[2]}$`,
					diagnosticFeedback: `تَأَكَّدْ مِنَ العَدَدِ الأَوَّلِ ($${a}$) وَالعَدَدِ الثّانِي ($${b}$) في نَصِّ الوَضْعِيَّةِ.`
				}
			];
			const built = buildUniqueMcqOptions(correctExpr, distractors, rng);
			quizQuestion = {
				type: 'mcq',
				questionText: `${storyText} ما هِيَ العَمَلِيَّةُ الصَّحِيحَةُ لِحِسابِ المَجْمُوعِ؟`,
				questionTextAr: `${storyText} ما هِيَ العَمَلِيَّةُ الصَّحِيحَةُ لِحِسابِ المَجْمُوعِ؟`,
				imageUrl: svgPath,
				imageCaption: 'تَمْثِيلُ الوَضْعِيَّةِ الإِدْماجِيَّةِ',
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `نَضُمُّ $${a}$ إِلى $${b}$، فَتَكُونُ العَمَلِيَّةُ هِيَ: $${a} + ${b} = ${total}$.`
			};
			finalAnswer = `${a} + ${b} = ${total}`;
		}

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.3fr', '1fr'],
				children: [
					{
						type: 'text',
						content: storyText
					},
					{
						type: 'image',
						src: svgPath,
						caption: 'تَمْثِيلُ الوَضْعِيَّةِ'
					}
				]
			},
			{
				type: 'text',
				content: `1) قارِنْ بَيْنَ عَدَدَيْ ${p1.nameGen} وَ${p2.nameGen} باستِعْمالِ ($<$ أَوْ $>$ أَوْ $=$):   $${a}$ ..... $${b}$`,
				answer: `$ ${a} ${cmpSym} ${b} $`,
				mark: '1'
			},
			{
				type: 'text',
				content: '2) اكْتُبْ عَمَلِيَّةَ الجَمْعِ لِحِسابِ المَجْمُوعِ الكُلِّيِّ:   ..... $+$ ..... $=$ .....',
				answer: `$ ${a} + ${b} = ${total} $`,
				mark: '2'
			},
			{
				type: 'text',
				content: '3) أَكْمِلْ جُمْلَةَ الإِجابَةِ: المَجْمُوعُ الكُلِّيُّ هُوَ .....',
				answer: `المَجْمُوعُ الكُلِّيُّ هُوَ $${total}$ ${itemPlur}.`,
				mark: '1'
			}
		];

		return {
			templateId: '1ap_t1_integration_word',
			seed: cleanSeed,
			grade: '1ap',
			trimesterId: 't1',
			difficulty,
			domain: 'integration',
			titleAr: 'وَضْعِيَّةٌ إِدْماجِيَّةٌ: العَدُّ وَالمُقارَنَةُ وَالجَمْعُ إِلى 9',
			quizQuestion,
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 4,
				instruction: 'اقْرَأِ الوَضْعِيَّةَ جَيِّدًا وَلاحِظِ الصُّورَةَ، ثُمَّ أَجِبْ:',
				content
			},
			hints: [
				'اقْرَأِ القِصَّةَ القَصِيرَةَ وَعُدَّ المَجْمُوعَتَيْنِ في الصُّورَةِ.',
				'لِمَعْرِفَةِ المَجْمُوعِ الكُلِّيِّ مَعًا، نَسْتَعْمِلُ عَمَلِيَّةَ الجَمْعِ ($+$).',
				`اجْمَعْ $${a} + ${b}$ بِالعَدِّ مِنَ العَدَدِ الأَكْبَرِ لِتَجِدَ $${total}$.`
			],
			solutionStepsAr: [
				`نُقارِنُ الكَمِّيَّتَيْنِ: $${a} ${cmpSym} ${b}$.`,
				`نَكْتُبُ عَمَلِيَّةَ الجَمْعِ: $${a} + ${b} = ${total}$.`,
				`الجَوابُ: المَجْمُوعُ الكُلِّيُّ هُوَ $${total}$ ${itemPlur}.`
			],
			finalAnswer
		};
	}
};

export const TEMPLATES_1AP_T1: ParameterizedTemplate[] = [
	templateCounting0To9,
	templateCompareQuantities,
	templateAdditiveDecomp,
	templateSpatialAndLengths,
	templateAdditionUnder10,
	templateIntegration1ApT1
];
