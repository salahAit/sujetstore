import type { ContentBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../rng';
import {
	saveSvgAsset,
	svgBaseTenBlocks,
	svgCoinsDinar,
	svgGridPoints
} from '../../svg-helpers';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate
} from '../../types';

const ONES_WORDS = [
	'صِفْرٌ',
	'واحِدٌ',
	'اثْنانِ',
	'ثَلاثَةٌ',
	'أَرْبَعَةٌ',
	'خَمْسَةٌ',
	'سِتَّةٌ',
	'سَبْعَةٌ',
	'ثَمانِيَةٌ',
	'تِسْعَةٌ'
] as const;

const TEENS_WORDS = [
	'عَشَرَةٌ',
	'أَحَدَ عَشَرَ',
	'اثْنا عَشَرَ',
	'ثَلاثَةَ عَشَرَ',
	'أَرْبَعَةَ عَشَرَ',
	'خَمْسَةَ عَشَرَ',
	'سِتَّةَ عَشَرَ',
	'سَبْعَةَ عَشَرَ',
	'ثَمانِيَةَ عَشَرَ',
	'تِسْعَةَ عَشَرَ'
] as const;

const TENS_WORDS = [
	'',
	'',
	'عِشْرُونَ',
	'ثَلاثُونَ',
	'أَرْبَعُونَ',
	'خَمْسُونَ',
	'سِتُّونَ',
	'سَبْعُونَ',
	'ثَمانُونَ',
	'تِسْعُونَ'
] as const;

const CHILDREN = [
	{ name: 'أَمِينُ', gen: 'أَمِينٍ', fem: false },
	{ name: 'سارَةُ', gen: 'سارَةَ', fem: true },
	{ name: 'ياسِرُ', gen: 'ياسِرٍ', fem: false },
	{ name: 'مَرْيَمُ', gen: 'مَرْيَمَ', fem: true },
	{ name: 'آدَمُ', gen: 'آدَمَ', fem: false },
	{ name: 'لَيْلى', gen: 'لَيْلى', fem: true }
] as const;

function createRng(seed: number, difficulty: Difficulty, salt: number): SeededRng {
	const s = Math.trunc(seed) >>> 0;
	const diffCode = difficulty === 'easy' ? 11 : difficulty === 'medium' ? 23 : 37;
	return new SeededRng(((s * 1009 + diffCode * 97 + salt) >>> 0) || 1);
}

function numberToArabicWords(n: number): string {
	const val = Math.max(0, Math.min(99, Math.trunc(n)));
	if (val < 10) return ONES_WORDS[val];
	if (val < 20) return TEENS_WORDS[val - 10];
	const t = Math.floor(val / 10);
	const u = val % 10;
	if (u === 0) return TENS_WORDS[t];
	return `${ONES_WORDS[u]} وَ${TENS_WORDS[t]}`;
}

function stepsLabelAr(count: number): string {
	if (count === 1) return 'خانَةً واحِدَةً';
	if (count === 2) return 'خانَتَيْنِ';
	return `$${count}$ خاناتٍ`;
}

function pickNoCarryPair(
	rng: SeededRng,
	minSum: number,
	maxSum: number,
	minPart = 11
): [number, number] {
	const cappedMax = Math.min(99, maxSum);
	const pairs: [number, number][] = [];
	for (let a = minPart; a <= cappedMax - minPart; a++) {
		const ta = Math.floor(a / 10);
		const ua = a % 10;
		if (ua === 0) continue;
		for (let b = minPart; b <= cappedMax - a; b++) {
			const tb = Math.floor(b / 10);
			const ub = b % 10;
			if (ub === 0) continue;
			if (ua + ub <= 9 && ta + tb <= 9 && a + b >= minSum && a + b <= cappedMax) {
				pairs.push([a, b]);
			}
		}
	}
	if (pairs.length === 0) return [21, 14];
	return rng.pick(pairs);
}

function pickNoBorrowPair(
	rng: SeededRng,
	minTotal: number,
	maxTotal: number,
	minSub = 11
): [number, number] {
	const cappedMax = Math.min(99, maxTotal);
	const pairs: [number, number][] = [];
	for (let total = minTotal; total <= cappedMax; total++) {
		const tt = Math.floor(total / 10);
		const ut = total % 10;
		for (let sub = minSub; sub <= total - 11; sub++) {
			const ts = Math.floor(sub / 10);
			const us = sub % 10;
			if (us === 0) continue;
			if (ut >= us && tt >= ts && total - sub >= 11) {
				pairs.push([total, sub]);
			}
		}
	}
	if (pairs.length === 0) return [58, 23];
	return rng.pick(pairs);
}

function coinsForAmount(amount: number): number[] {
	const coins: number[] = [];
	let rem = Math.max(1, Math.min(99, Math.trunc(amount)));
	for (const d of [50, 20, 10, 5, 2, 1]) {
		while (rem >= d) {
			coins.push(d);
			rem -= d;
		}
	}
	return coins;
}

// ---------------------------------------------------------------------------
// 1. Numbers 40..99: Tens & Units + Bounding Between Two Consecutive Tens
// ---------------------------------------------------------------------------
const templateNumbers40To99: ParameterizedTemplate = {
	id: '1ap_t3_numbers_40_99',
	grade: '1ap',
	trimesterId: 't3',
	domain: 'numeric',
	curriculumLessonId: 'lesson_1ap_t3_numbers_70_to_99',
	titleAr: 'الأعداد من 40 إلى 99: العشرات والوحدات والحصر',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 1);

		const minN = difficulty === 'easy' ? 41 : difficulty === 'medium' ? 61 : 71;
		const maxN = difficulty === 'easy' ? 59 : difficulty === 'medium' ? 79 : 98;
		const candidates: number[] = [];
		for (let x = minN; x <= maxN; x++) {
			const t = Math.floor(x / 10);
			const u = x % 10;
			if (u !== 0 && t !== u) candidates.push(x);
		}
		const n = rng.pick(candidates);
		const tens = Math.floor(n / 10);
		const ones = n % 10;
		const wordsAr = numberToArabicWords(n);

		// Keep bounded target strictly <= 89 so upper ten t1 <= 90 (< 100)
		const bracketN = n < 90 ? n : 80 + ones;
		const t0 = Math.floor(bracketN / 10) * 10;
		const t1 = t0 + 10;

		const svg = svgBaseTenBlocks(0, tens, ones);
		const svgPath = saveSvgAsset(`1ap_t3_b10_${difficulty}_s${cleanSeed}`, svg);

		const variant = rng.int(0, 2);
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer = '';

		if (variant === 0) {
			const questionText = 'عُدَّ أَعْمِدَةَ الْعَشَراتِ وَمُرَبَّعاتِ الْوَحَداتِ فِي الصُّورَةِ، ثُمَّ اكْتُبِ الْعَدَدَ بِالْأَرْقامِ:';
			finalAnswer = String(n);
			quizQuestion = {
				type: 'fill_blank',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: 'تَمْثِيلُ الْعَشَراتِ وَالْوَحَداتِ',
				questionData: {
					sentence: 'الْعَدَدُ الْمُمَثَّلُ فِي الصُّورَةِ هُوَ: ___',
					acceptedAnswers: [String(n)]
				},
				explanation: `يُوجَدُ $${tens}$ عَشَراتٍ ($${tens * 10}$) وَ $${ones}$ وَحَداتٍ، إِذَنِ الْعَدَدُ هُوَ $${n}$ (${wordsAr}).`
			};
		} else if (variant === 1) {
			const questionText = `تَأَمَّلْ تَمْثِيلَ الْعَدَدِ $${n}$ فِي الصُّورَةِ. ما هُوَ التَّفْكِيكُ الصَّحِيحُ لِلْعَدَدِ $${n}$؟`;
			const correctDecomp = `$${tens * 10} + ${ones}$`;
			const altOnes = ones === 9 ? 8 : ones + 1;
			const built = buildUniqueMcqOptions(
				correctDecomp,
				[
					{
						text: `$${tens} + ${ones}$`,
						diagnosticFeedback: `انْتَبِهْ! رَقْمُ الْعَشَراتِ $${tens}$ يُساوِي $${tens * 10}$ وَلَيْسَ $${tens}$.`
					},
					{
						text: `$${ones * 10} + ${tens}$`,
						diagnosticFeedback: `عَكَسْتَ الْمَنازِلَ: في $${n}$ يُوجَدُ $${tens}$ عَشَراتٍ وَ $${ones}$ وَحَداتٍ.`
					},
					{
						text: `$${tens * 10} + ${altOnes}$`,
						diagnosticFeedback: `عُدَّ مُرَبَّعاتِ الْوَحَداتِ جَيِّدًا: يُوجَدُ $${ones}$ وَلَيْسَ $${altOnes}$.`
					}
				],
				rng
			);
			finalAnswer = `${tens * 10} + ${ones}`;
			quizQuestion = {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: 'تَمْثِيلُ الْعَشَراتِ وَالْوَحَداتِ',
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `الْعَدَدُ $${n}$ فِيهِ $${tens}$ عَشَراتٍ قِيمَتُها $${tens * 10}$ وَ $${ones}$ وَحَداتٍ، إِذَنْ $${n} = ${tens * 10} + ${ones}$.`
			};
		} else {
			const questionText = `ما هُوَ الْحَصْرُ الصَّحِيحُ لِلْعَدَدِ $${bracketN}$ بَيْنَ عَشَرَتَيْنِ مُتَتالِيَتَيْنِ؟`;
			const correctBracket = `$${t0} < ${bracketN} < ${t1}$`;
			const prevTen = Math.max(10, t0 - 10);
			const thirdWrong =
				t1 + 10 <= 90
					? `$${t1} < ${bracketN} < ${t1 + 10}$`
					: `$${t0} < ${bracketN} < ${t1 - 1}$`;
			const thirdFeedback =
				t1 + 10 <= 90
					? `الْعَدَدُ $${bracketN}$ أَصْغَرُ مِنْ $${t1}$ وَلَيْسَ أَكْبَرَ مِنْهُ.`
					: `الْعَدَدُ $${t1 - 1}$ لَيْسَ عَشَرَةً كامِلَةً؛ الْعَشَرَةُ الْمُوالِيَةُ هِيَ $${t1}$.`;
			const built = buildUniqueMcqOptions(
				correctBracket,
				[
					{
						text: `$${prevTen} < ${bracketN} < ${t0}$`,
						diagnosticFeedback: `الْعَدَدُ $${bracketN}$ عَشَراتُهُ $${Math.floor(bracketN / 10)}$، فَهُوَ أَكْبَرُ مِنْ $${t0}$.`
					},
					{
						text: `$${bracketN - 1} < ${bracketN} < ${bracketN + 1}$`,
						diagnosticFeedback: `الْمَطْلُوبُ حَصْرُهُ بَيْنَ عَشَرَتَيْنِ مُتَتالِيَتَيْنِ ($${t0}$ وَ $${t1}$) وَلَيْسَ بَيْنَ عَدَدَيْنِ مُتَتالِيَيْنِ.`
					},
					{
						text: thirdWrong,
						diagnosticFeedback: thirdFeedback
					}
				],
				rng
			);
			finalAnswer = `${t0} < ${bracketN} < ${t1}`;
			quizQuestion = {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `عَشَراتُ الْعَدَدِ $${bracketN}$ هِيَ $${t0}$ وَالْعَشَرَةُ الْمُوالِيَةُ هِيَ $${t1}$، إِذَنْ $${t0} < ${bracketN} < ${t1}$.`
			};
		}

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.25fr', '1fr'],
				children: [
					{
						type: 'text',
						content: '1) اُكْتُبِ الْعَدَدَ الْمُمَثَّلَ فِي الصُّورَةِ بِالْأَرْقامِ وَبِالْحُرُوفِ، ثُمَّ فَكِّكْهُ:',
						answer: `الْعَدَدُ: $${n}$ (${wordsAr})\n\nالتَّفْكِيكُ:\n$ ${n} = ${tens * 10} + ${ones} $`,
						mark: '1'
					},
					{
						type: 'image',
						src: svgPath,
						caption: 'تَمْثِيلُ الْعَشَراتِ وَالْوَحَداتِ'
					}
				]
			},
			{
				type: 'text',
				content: `2) اُحْصُرِ الْعَدَدَ $${bracketN}$ بَيْنَ عَشَرَتَيْنِ مُتَتالِيَتَيْنِ:  $"....." < ${bracketN} < "....."$`,
				answer: `الْحَصْرُ:\n$ ${t0} < ${bracketN} < ${t1} $`,
				mark: '0.5'
			}
		];

		return {
			templateId: '1ap_t3_numbers_40_99',
			seed: cleanSeed,
			grade: '1ap',
			trimesterId: 't3',
			difficulty,
			domain: 'numeric',
			titleAr: 'الأعداد من 40 إلى 99: العشرات والوحدات والحصر',
			quizQuestion,
			sujetExercise: {
				points: 1.5,
				instruction: 'تَأَمَّلْ تَمْثِيلَ الْعَشَراتِ وَالْوَحَداتِ فِي الصُّورَةِ، ثُمَّ أَجِبْ:',
				content
			},
			hints: [
				'كُلُّ عَمُودٍ أَخْضَرَ يُمَثِّلُ عَشَرَةً واحِدَةً ($10$)، وَكُلُّ مُرَبَّعٍ أَصْفَرَ يُمَثِّلُ وَحْدَةً واحِدَةً ($1$).',
				'اُكْتُبْ رَقْمَ الْعَشَراتِ عَلى الْيَسارِ وَرَقْمَ الْوَحَداتِ عَلى الْيَمِينِ.',
				`لِحَصْرِ الْعَدَدِ $${bracketN}$ بَيْنَ عَشَرَتَيْنِ، خُذْ عَشَرَتَهُ $${t0}$ وَالْعَشَرَةَ الْمُوالِيَةَ $${t1}$.`
			],
			solutionStepsAr: [
				`نَعُدُّ أَعْمِدَةَ الْعَشَراتِ ($${tens}$ أي $${tens * 10}$) وَالْوَحَداتِ ($${ones}$)، فَالْعَدَدُ هُوَ $${n}$ (${wordsAr}).`,
				`التَّفْكِيكُ هُوَ: $${n} = ${tens * 10} + ${ones}$.`,
				`حَصْرُ الْعَدَدِ $${bracketN}$ بَيْنَ عَشَرَتَيْنِ مُتَتالِيَتَيْنِ هُوَ: $${t0} < ${bracketN} < ${t1}$.`
			],
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// 2. Grid Locating & Navigation on المرصوفة
// ---------------------------------------------------------------------------
const templateGridLocation: ParameterizedTemplate = {
	id: '1ap_t3_grid_location',
	grade: '1ap',
	trimesterId: 't3',
	domain: 'geometry',
	curriculumLessonId: 'lesson_1ap_t3_grid_location_navigation',
	titleAr: 'التعليم والتنقل على المرصوفة',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 2);

		const cols = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
		const rows = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 3 : 4;
		const colLabels = ['A', 'B', 'C', 'D', 'E'].slice(0, cols);
		const rowLabels = Array.from({ length: rows }, (_, i) => String(rows - i));

		const allCells: { col: number; row: number }[] = [];
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				allCells.push({ col: c, row: r });
			}
		}

		const startCell = rng.pick(allCells);
		const targetCandidates = allCells.filter((c) => c.col !== startCell.col && c.row !== startCell.row);
		const targetCell = rng.pick(targetCandidates);
		const thirdCandidates = allCells.filter(
			(c) =>
				(c.col !== startCell.col || c.row !== startCell.row) &&
				(c.col !== targetCell.col || c.row !== targetCell.row)
		);
		const thirdCell = rng.pick(thirdCandidates);

		const markers = [
			{ ...targetCell, label: 'K', color: '#dc2626', bg: '#fee2e2' },
			{ ...startCell, label: 'M', color: '#2563eb', bg: '#dbeafe' },
			{ ...thirdCell, label: 'N', color: '#15803d', bg: '#dcfce7' }
		];

		const svg = svgGridPoints({
			cols,
			rows,
			colLabels,
			rowLabels,
			shadedCells: markers.map((m) => ({ col: m.col, row: m.row, color: m.bg })),
			points: markers.map((m) => ({
				col: m.col + 0.5,
				row: m.row + 0.5,
				label: m.label,
				color: m.color
			}))
		});
		const svgPath = saveSvgAsset(`1ap_t3_grid_${difficulty}_s${cleanSeed}`, svg);

		const kColLbl = colLabels[targetCell.col];
		const kRowLbl = rowLabels[targetCell.row];
		const mColLbl = colLabels[startCell.col];
		const mRowLbl = rowLabels[startCell.row];
		const nColLbl = colLabels[thirdCell.col];
		const nRowLbl = rowLabels[thirdCell.row];

		const dx = targetCell.col - startCell.col;
		const dy = startCell.row - targetCell.row; // positive => moving UP in rowLabels
		const absDx = Math.abs(dx);
		const absDy = Math.abs(dy);
		const dirHAr = dx > 0 ? 'يَمِينًا' : 'يَسارًا';
		const dirVAr = dy > 0 ? 'إِلَى الْأَعْلى' : 'إِلَى الْأَسْفَلِ';
		const katexArrowH = dx > 0 ? '\\rightarrow' : '\\leftarrow';
		const katexArrowV = dy > 0 ? '\\uparrow' : '\\downarrow';
		const typstArrowH = dx > 0 ? '→' : '←';
		const typstArrowV = dy > 0 ? '↑' : '↓';

		const correctCoord = `$(${kColLbl}, ${kRowLbl})$`;
		const variant = rng.int(0, 1);

		let questionText = '';
		let built: ReturnType<typeof buildUniqueMcqOptions>;
		let explanation = '';

		if (variant === 0) {
			questionText = 'تَأَمَّلِ الْمَرْصُوفَةَ فِي الصُّورَةِ. ما هِيَ إِحْداثِيّاتُ الْخانَةِ الَّتِي يَقَعُ فِيها الرَّمْزُ $K$؟';
			built = buildUniqueMcqOptions(
				correctCoord,
				[
					{
						text: `$(${kRowLbl}, ${kColLbl})$`,
						diagnosticFeedback: 'نَكْتُبُ حَرْفَ الْعَمُودِ أَوَّلًا ثُمَّ رَقْمَ السَّطْرِ.'
					},
					{
						text: `$(${mColLbl}, ${mRowLbl})$`,
						diagnosticFeedback: 'هَذِهِ إِحْداثِيّاتُ الرَّمْزِ $M$ وَلَيْسَتْ إِحْداثِيّاتِ الرَّمْزِ $K$.'
					},
					{
						text: `$(${colLabels[(targetCell.col + 1) % cols]}, ${kRowLbl})$`,
						diagnosticFeedback: `انْظُرْ أَعْلى خانَةِ الرَّمْزِ $K$ لِتَجِدَ الْعَمُودَ الصَّحِيحَ (${kColLbl}).`
					}
				],
				rng
			);
			explanation = `يَقَعُ الرَّمْزُ $K$ فِي الْعَمُودِ $${kColLbl}$ وَالسَّطْرِ $${kRowLbl}$، أَيْ $(${kColLbl}, ${kRowLbl})$.`;
		} else {
			questionText = `انْطَلَقَ أَمِينُ مِنَ الْخانَةِ $M$ فِي الْمَوْقِعِ $(${mColLbl}, ${mRowLbl})$، وَتَحَرَّكَ ${stepsLabelAr(absDx)} ${dirHAr} ($${katexArrowH}$)، ثُمَّ ${stepsLabelAr(absDy)} ${dirVAr} ($${katexArrowV}$). فِي أَيِّ خانَةٍ تَوَقَّفَ؟`;
			built = buildUniqueMcqOptions(
				correctCoord,
				[
					{
						text: `$(${kColLbl}, ${mRowLbl})$`,
						diagnosticFeedback: `هَذِهِ الْخانَةُ بَعْدَ التَّحَرُّكِ الْأُفُقِيِّ فَقَطْ! لا تَنْسَ التَّحَرُّكَ ${dirVAr}.`
					},
					{
						text: `$(${mColLbl}, ${kRowLbl})$`,
						diagnosticFeedback: 'بَدَأْتَ بِالصُّعُودِ أَوِ النُّزُولِ وَنَسِيتَ التَّحَرُّكَ أُفُقِيًّا.'
					},
					{
						text: `$(${nColLbl}, ${nRowLbl})$`,
						diagnosticFeedback: `عُدَّ الْخَطَواتِ بِدِقَّةٍ مِنَ الْخانَةِ $M$ دُونَ عَدِّ خانَةِ الِانْطِلاقِ.`
					}
				],
				rng
			);
			explanation = `مِنْ $(${mColLbl}, ${mRowLbl})$ نَتَحَرَّكُ ${stepsLabelAr(absDx)} ${dirHAr} لِنَصِلَ إِلَى $(${kColLbl}, ${mRowLbl})$، ثُمَّ ${stepsLabelAr(absDy)} ${dirVAr} لِنَصِلَ إِلَى $(${kColLbl}, ${kRowLbl})$ عِنْدَ $K$.`;
		}

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: '1) عَيِّنْ إِحْداثِيَّيْ كُلٍّ مِنَ الرَّمْزَيْنِ $K$ وَ $N$ عَلى الْمَرْصُوفَةِ:',
						answer: `الرَّمْزُ $K$ فِي $(${kColLbl}, ${kRowLbl})$، وَالرَّمْزُ $N$ فِي $(${nColLbl}, ${nRowLbl})$.`,
						mark: '0.5'
					},
					{
						type: 'image',
						src: svgPath,
						caption: 'الْمَرْصُوفَةُ'
					}
				]
			},
			{
				type: 'text',
				content: `2) لِلْوُصُولِ مِنَ الرَّمْزِ $M$ فِي الْخانَةِ $(${mColLbl}, ${mRowLbl})$ إِلَى الرَّمْزِ $K$، أَكْمِلْ وَصْفَ الْمَسْلَكِ:\nعَدَدُ الْخَطَواتِ ${dirHAr} ($${typstArrowH}$): ..... ، ثُمَّ عَدَدُ الْخَطَواتِ ${dirVAr} ($${typstArrowV}$): .....`,
				answer: `يَتَحَرَّكُ ${stepsLabelAr(absDx)} ${dirHAr} ($${typstArrowH}$) ثُمَّ ${stepsLabelAr(absDy)} ${dirVAr} ($${typstArrowV}$).`,
				mark: '1'
			}
		];

		return {
			templateId: '1ap_t3_grid_location',
			seed: cleanSeed,
			grade: '1ap',
			trimesterId: 't3',
			difficulty,
			domain: 'geometry',
			titleAr: 'التعليم والتنقل على المرصوفة',
			quizQuestion: {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: 'الْمَرْصُوفَةُ',
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation
			},
			sujetExercise: {
				points: 1.5,
				instruction: 'تَأَمَّلِ الْمَرْصُوفَةَ الْمُقابِلَةَ ثُمَّ أَجِبْ:',
				content
			},
			hints: [
				'لِتَعْيِينِ خانَةٍ عَلى الْمَرْصُوفَةِ، نَذْكُرُ حَرْفَ الْعَمُودِ أَوَّلًا ثُمَّ رَقْمَ السَّطْرِ.',
				'عِنْدَ عَدِّ الْخُطُواتِ، لا تَعُدَّ خانَةَ الِانْطِلاقِ نَفْسَها، بَلْ عُدَّ القَفَزاتِ.',
				`اِنْطَلِقْ مِنْ $M$ ($(${mColLbl}, ${mRowLbl})$) واتَّبِعِ الْعَمُودَ وَالسَّطْرَ نَحْوَ $K$.`
			],
			solutionStepsAr: [
				`إِحْداثِيّاتُ الرَّمْزِ $K$ هِيَ $(${kColLbl}, ${kRowLbl})$، وإِحْداثِيّاتُ $M$ هِيَ $(${mColLbl}, ${mRowLbl})$.`,
				`الْمَسْلَكُ مِنْ $M$ إِلَى $K$: ${stepsLabelAr(absDx)} ${dirHAr} ($${katexArrowH}$) ثُمَّ ${stepsLabelAr(absDy)} ${dirVAr} ($${katexArrowV}$).`,
				`عَدَدُ الْخَطَواتِ الْكُلِّيُّ هُوَ $${absDx} + ${absDy} = ${absDx + absDy}$ خاناتٍ.`
			],
			finalAnswer: `(${kColLbl}, ${kRowLbl})`
		};
	}
};

// ---------------------------------------------------------------------------
// 3. Algerian Dinar Coins (1..50 DA) Sum & Forming Amounts (< 100 DA)
// ---------------------------------------------------------------------------
const templateCoinsDinar: ParameterizedTemplate = {
	id: '1ap_t3_coins_dinar',
	grade: '1ap',
	trimesterId: 't3',
	domain: 'measurement',
	curriculumLessonId: 'lesson_1ap_t3_algerian_coins_da',
	titleAr: 'العملة الجزائرية: عد وتشكيل مبالغ بالقطع النقدية',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 3);

		const minA = difficulty === 'easy' ? 23 : difficulty === 'medium' ? 53 : 76;
		const maxA = difficulty === 'easy' ? 49 : difficulty === 'medium' ? 79 : 98;
		const validAmounts: number[] = [];
		for (let a = minA; a <= maxA; a++) {
			const c = coinsForAmount(a);
			if (c.length >= 3 && c.length <= 6) {
				validAmounts.push(a);
			}
		}
		const total = rng.pick(validAmounts);
		const coins = coinsForAmount(total);
		const coinSumExpr = coins.join(' + ');

		const svg = svgCoinsDinar(coins);
		const svgPath = saveSvgAsset(`1ap_t3_coins_${difficulty}_s${cleanSeed}`, svg);

		const otherCandidates: number[] = [];
		for (let x = minA; x <= maxA; x++) {
			if (x !== total && coinsForAmount(x).length >= 3 && coinsForAmount(x).length <= 5) {
				otherCandidates.push(x);
			}
		}
		const formTarget = rng.pick(otherCandidates);
		const formCoins = coinsForAmount(formTarget);

		const variant = rng.int(0, 1);
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];

		if (variant === 0) {
			const lastCoin = coins[coins.length - 1];
			const d1 = Math.max(1, total - lastCoin);
			const d2 = total + 10 <= 99 ? total + 10 : total - 10;
			const d3 = total >= 31 ? total - 10 : total + 5;

			const built = buildUniqueMcqOptions(
				`$${total}\\text{ DA}$`,
				[
					{
						text: `$${d1}\\text{ DA}$`,
						diagnosticFeedback: 'انْتَبِهْ! نَسِيتَ إِضافَةَ إِحْدَى الْقِطَعِ النَّقْدِيَّةِ الصَّغِيرَةِ.'
					},
					{
						text: `$${d2}\\text{ DA}$`,
						diagnosticFeedback: 'تَحَقَّقْ مِنْ جَمْعِ الْقِطَعِ الْكَبِيرَةِ ($50$ وَ $20$ وَ $10$) جَيِّدًا.'
					},
					{
						text: `$${d3}\\text{ DA}$`,
						diagnosticFeedback: 'أَعِدْ عَدَّ الْقِطَعِ النَّقْدِيَّةِ مِنَ الْقِطْعَةِ الْأَكْبَرِ إِلَى الْأَصْغَرِ.'
					}
				],
				rng
			);

			quizQuestion = {
				type: 'mcq',
				questionText: 'عُدَّ الْقِطَعَ النَّقْدِيَّةَ الْجَزائِرِيَّةَ فِي الصُّورَةِ. ما هُوَ الْمَبْلَغُ الْكُلِّيُّ؟',
				questionTextAr: 'عُدَّ الْقِطَعَ النَّقْدِيَّةَ الْجَزائِرِيَّةَ فِي الصُّورَةِ. ما هُوَ الْمَبْلَغُ الْكُلِّيُّ؟',
				imageUrl: svgPath,
				imageCaption: 'قِطَعٌ نَقْدِيَّةٌ جَزائِرِيَّةٌ (DA)',
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `نَجْمَعُ قِيَمَ الْقِطَعِ مِنَ الْأَكْبَرِ إِلَى الْأَصْغَرِ: $${coinSumExpr} = ${total}\\text{ DA}$.`
			};
		} else {
			quizQuestion = {
				type: 'fill_blank',
				questionText: 'تَأَمَّلِ الْقِطَعَ النَّقْدِيَّةَ فِي الصُّورَةِ، ثُمَّ اكْتُبِ الْمَبْلَغَ الْكُلِّيَّ بِالْأَرْقامِ:',
				questionTextAr: 'تَأَمَّلِ الْقِطَعَ النَّقْدِيَّةَ فِي الصُّورَةِ، ثُمَّ اكْتُبِ الْمَبْلَغَ الْكُلِّيَّ بِالْأَرْقامِ:',
				imageUrl: svgPath,
				imageCaption: 'قِطَعٌ نَقْدِيَّةٌ جَزائِرِيَّةٌ (DA)',
				questionData: {
					sentence: 'الْمَبْلَغُ الْكُلِّيُّ هُوَ: ___ DA',
					acceptedAnswers: [String(total), `${total} DA`, `${total}DA`]
				},
				explanation: `مَجْمُوعُ الْقِطَعِ النَّقْدِيَّةِ هُوَ: $${coinSumExpr} = ${total}\\text{ DA}$.`
			};
		}

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: '1) اُحْسُبِ الْمَبْلَغَ الْمُمَثَّلَ بِالْقِطَعِ النَّقْدِيَّةِ فِي الصُّورَةِ:',
						answer: `الْعَمَلِيَّةُ:\n$ ${coinSumExpr} = ${total} $\n\nالْمَبْلَغُ هُوَ \u2066${total} DA\u2069`,
						mark: '0.75'
					},
					{
						type: 'image',
						src: svgPath,
						caption: 'الْقِطَعُ النَّقْدِيَّةُ (DA)'
					}
				]
			},
			{
				type: 'text',
				content: `2) شَكِّلْ مَبْلَغَ \u2066${formTarget} DA\u2069 بِاسْتِعْمالِ أَقَلِّ عَدَدٍ مِنَ الْقِطَعِ النَّقْدِيَّةِ ($50$، $20$، $10$، $5$، $2$، $1$ DA):`,
				answer: `الْقِطَعُ الْمُناسِبَةُ:\n$ ${formCoins.join(' + ')} = ${formTarget} $\n\nالْمَبْلَغُ: \u2066${formTarget} DA\u2069`,
				mark: '0.75'
			}
		];

		return {
			templateId: '1ap_t3_coins_dinar',
			seed: cleanSeed,
			grade: '1ap',
			trimesterId: 't3',
			difficulty,
			domain: 'measurement',
			titleAr: 'العملة الجزائرية: عد وتشكيل مبالغ بالقطع النقدية',
			quizQuestion,
			sujetExercise: {
				points: 1.5,
				instruction: 'عُدَّ النُّقُودَ ثُمَّ شَكِّلِ الْمَبْلَغَ الْمَطْلُوبَ:',
				content
			},
			hints: [
				'اقْرَأْ قِيمَةَ كُلِّ قِطْعَةٍ نَقْدِيَّةٍ بِوُضُوحٍ قَبْلَ الْجَمْعِ.',
				'اِبْدَأْ بِجَمْعِ الْقِطَعِ الْكَبِيرَةِ ($50$، $20$، $10$) ثُمَّ أَضِفِ الْقِطَعَ الصَّغِيرَةَ ($5$، $2$، $1$).',
				`الْجَمْعُ: $${coinSumExpr}$.`
			],
			solutionStepsAr: [
				`الْقِطَعُ النَّقْدِيَّةُ الْمَوْجُودَةُ هِيَ: ${coins.map((c) => `$${c}\\text{ DA}$`).join('، ')}.`,
				`الْمَبْلَغُ الْكُلِّيُّ: $${coinSumExpr} = ${total}\\text{ DA}$.`,
				`لِتَشْكِيلِ $${formTarget}\\text{ DA}$ بِأَقَلِّ قِطَعٍ نَسْتَعْمِلُ: $${formCoins.join(' + ')} = ${formTarget}\\text{ DA}$.`
			],
			finalAnswer: `${total} DA`
		};
	}
};

// ---------------------------------------------------------------------------
// 4. Mental Math: Complements to 10 / Next Ten & Doubles < 100
// ---------------------------------------------------------------------------
const templateMentalComplementsDoubles: ParameterizedTemplate = {
	id: '1ap_t3_mental_complements_doubles',
	grade: '1ap',
	trimesterId: 't3',
	domain: 'numeric',
	curriculumLessonId: 'lesson_1ap_t3_mental_math_doubles_complements',
	titleAr: 'الحساب بتمعّن: المتمم إلى العشرة والضعف',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 4);

		// Complement to 10 or next ten (nextTen <= 90, strictly < 100)
		let compTargetBase = 6;
		let nextTen = 10;
		if (difficulty === 'easy') {
			compTargetBase = rng.int(2, 8);
			nextTen = 10;
		} else if (difficulty === 'medium') {
			const t = rng.int(4, 6);
			const u = rng.int(2, 8);
			compTargetBase = t * 10 + u;
			nextTen = (t + 1) * 10;
		} else {
			const t = rng.int(7, 8);
			const u = rng.int(1, 9);
			compTargetBase = t * 10 + u;
			nextTen = (t + 1) * 10;
		}
		const comp = nextTen - compTargetBase;

		// Secondary next-ten item for easy Sujet exercise variety
		const sujetTenBase =
			difficulty === 'easy' ? rng.int(2, 4) * 10 + rng.int(2, 8) : compTargetBase;
		const sujetNextTen = Math.ceil(sujetTenBase / 10) * 10;
		const sujetComp = sujetNextTen - sujetTenBase;

		// Doubles strictly < 100 (without carry on 2-digit numbers)
		const doublePool =
			difficulty === 'easy'
				? [3, 4, 5, 6, 7, 8, 9, 10, 20]
				: difficulty === 'medium'
					? [11, 12, 13, 14, 21, 22, 23, 24, 30]
					: [31, 32, 33, 34, 40, 41, 42, 43, 44];
		const dBase = rng.pick(doublePool);
		const dRes = dBase + dBase;

		// Near double: k + (k + 1)
		const nearPool = difficulty === 'easy' ? [3, 4, 5, 6] : [6, 7, 8, 9];
		const k = rng.pick(nearPool);
		const kDouble = k + k;
		const nearRes = kDouble + 1;

		const variant = rng.int(0, 2);
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer = '';

		if (variant === 0) {
			const targetLabel = nextTen === 10 ? 'إِلَى $10$' : `إِلَى الْعَشَرَةِ الْمُوالِيَةِ ($${nextTen}$)`;
			const questionText = `ما هُوَ مُتَمِّمُ الْعَدَدِ $${compTargetBase}$ ${targetLabel}؟ ($${compTargetBase} + \\dots = ${nextTen}$)`;
			const d1 = compTargetBase % 10;
			const d2 = comp + 10 <= 99 ? comp + 10 : comp + 2;
			const d3 = comp > 1 ? comp - 1 : comp + 3;
			const built = buildUniqueMcqOptions(
				`$${comp}$`,
				[
					{
						text: `$${d1}$`,
						diagnosticFeedback: `انْتَبِهْ! نَطْلُبُ ما يَنْقُصُ لِلْوُصُولِ إِلَى $${nextTen}$ وَلَيْسَ رَقْمَ الْوَحَداتِ.`
					},
					{
						text: `$${d2}$`,
						diagnosticFeedback: `إِذا أَضَفْنا $${d2}$ إِلَى $${compTargetBase}$ نَتَجاوَزُ $${nextTen}$!`
					},
					{
						text: `$${d3}$`,
						diagnosticFeedback: `تَأَكَّدْ: $${compTargetBase} + ${d3} = ${compTargetBase + d3}$ وَلَيْسَ $${nextTen}$.`
					}
				],
				rng
			);
			finalAnswer = String(comp);
			quizQuestion = {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `مُتَمِّمُ $${compTargetBase % 10}$ إِلَى $10$ هُوَ $${comp}$، إِذَنْ $${compTargetBase} + ${comp} = ${nextTen}$.`
			};
		} else if (variant === 1) {
			const isTrue = rng.int(0, 1) === 1;
			const wrongVal = dBase + 2 !== dRes && dBase + 2 < 100 ? dBase + 2 : dRes + 10;
			const claimed = isTrue ? dRes : wrongVal;
			finalAnswer = isTrue ? 'صَحِيحٌ' : 'خَطَأٌ';
			const questionText = `أَجِبْ بِصَحِيحٍ أَوْ خَطَأٍ: ضِعْفُ الْعَدَدِ $${dBase}$ هُوَ $${claimed}$.`;
			quizQuestion = {
				type: 'true_false',
				questionText,
				questionTextAr: questionText,
				questionData: {
					correctAnswer: isTrue
				},
				explanation: `ضِعْفُ الْعَدَدِ يَعْنِي جَمْعَهُ مَعَ نَفْسِهِ: $${dBase} + ${dBase} = ${dRes}$.`
			};
		} else {
			finalAnswer = String(nearRes);
			const questionText = `بِالِارْتِكازِ عَلى الضِّعْفِ ($${k} + ${k} = ${kDouble}$)، اُحْسُبْ بِتَمَعُّنٍ:`;
			quizQuestion = {
				type: 'fill_blank',
				questionText,
				questionTextAr: questionText,
				questionData: {
					sentence: `${k} + ${k + 1} = ___`,
					acceptedAnswers: [String(nearRes)]
				},
				explanation: `بِما أَنَّ $${k} + ${k} = ${kDouble}$، نُضِيفُ $1$ لِنَجِدَ $${k} + ${k + 1} = ${kDouble} + 1 = ${nearRes}$.`
			};
		}

		const c10 = difficulty === 'easy' ? compTargetBase : rng.int(2, 8);
		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) أَوْجِدِ الْمُتَمِّمَ:  $${c10} + "....." = 10$    وَ    $${sujetTenBase} + "....." = ${sujetNextTen}$`,
				answer: `1) الْمُتَمِّمُ:\n$ ${c10} + ${10 - c10} = 10 $\n\n$ ${sujetTenBase} + ${sujetComp} = ${sujetNextTen} $`,
				mark: '0.75'
			},
			{
				type: 'text',
				content: `2) أَكْمِلْ بِالضِّعْفِ:  ضِعْفُ $${dBase}$ هُوَ ..... ، وَبِالِارْتِكازِ عَلى $${k} + ${k} = ${kDouble}$ فَإِنَّ $${k} + ${k + 1} = "....."$`,
				answer: `2) ضِعْفُ $${dBase}$ هُوَ $${dRes}$، أَيْ $${dBase} + ${dBase} = ${dRes}$، وَ $${k} + ${k + 1} = ${nearRes}$`,
				mark: '0.75'
			}
		];

		return {
			templateId: '1ap_t3_mental_complements_doubles',
			seed: cleanSeed,
			grade: '1ap',
			trimesterId: 't3',
			difficulty,
			domain: 'numeric',
			titleAr: 'الحساب بتمعّن: المتمم إلى العشرة والضعف',
			quizQuestion,
			sujetExercise: {
				points: 1.5,
				instruction: 'اِحْسُبْ بِتَمَعُّنٍ وَأَكْمِلِ الْفَراغاتِ:',
				content
			},
			hints: [
				'لِإِيجادِ الْمُتَمِّمِ إِلَى الْعَشَرَةِ الْمُوالِيَةِ، نَبْحَثُ عَنْ مُتَمِّمِ رَقْمِ الْوَحَداتِ إِلَى $10$.',
				`ضِعْفُ عَدَدٍ هُوَ جَمْعُ الْعَدَدِ مَعَ نَفْسِهِ: مِثْلَ $${dBase} + ${dBase}$.`,
				`لِحِسابِ $${k} + ${k + 1}$، نَحْسُبُ ضِعْفَ $${k}$ ($${kDouble}$) ثُمَّ نُضِيفُ $1$.`
			],
			solutionStepsAr: [
				`مُتَمِّمُ $${c10}$ إِلَى $10$ هُوَ $${10 - c10}$، وَمُتَمِّمُ $${sujetTenBase}$ إِلَى $${sujetNextTen}$ هُوَ $${sujetComp}$.`,
				`ضِعْفُ الْعَدَدِ $${dBase}$ هُوَ $${dBase} + ${dBase} = ${dRes}$.`,
				`بِالِارْتِكازِ عَلى الضِّعْفِ: $${k} + ${k + 1} = ${kDouble} + 1 = ${nearRes}$.`
			],
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// 5. Simple Addition Without Carry & Subtraction Without Borrow (< 100)
// ---------------------------------------------------------------------------
const templateAddSubNoCarry: ParameterizedTemplate = {
	id: '1ap_t3_add_sub_no_carry',
	grade: '1ap',
	trimesterId: 't3',
	domain: 'numeric',
	curriculumLessonId: 'lesson_1ap_t3_add_sub_within_99',
	titleAr: 'الجمع دون احتفاظ والطرح البسيط',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 5);

		const [a1, a2] =
			difficulty === 'easy'
				? pickNoCarryPair(rng, 24, 59, 11)
				: difficulty === 'medium'
					? pickNoCarryPair(rng, 44, 79, 11)
					: pickNoCarryPair(rng, 64, 99, 12);
		const sum = a1 + a2;

		const [s1, s2] =
			difficulty === 'easy'
				? pickNoBorrowPair(rng, 33, 59, 11)
				: difficulty === 'medium'
					? pickNoBorrowPair(rng, 54, 79, 12)
					: pickNoBorrowPair(rng, 74, 99, 21);
		const diff = s1 - s2;

		const variant = rng.int(0, 2);
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer = '';

		if (variant === 0) {
			const uSum = sum % 10;
			const tSum = Math.floor(sum / 10);
			const swapped = uSum !== 0 && tSum !== uSum ? uSum * 10 + tSum : sum - 1;
			const offTen = sum + 10 <= 99 ? sum + 10 : sum - 10;
			const forgotTens = a1 + (a2 % 10);

			const built = buildUniqueMcqOptions(
				`$${sum}$`,
				[
					{
						text: `$${swapped}$`,
						diagnosticFeedback: 'انْتَبِهْ لِتَرْتِيبِ الْمَراتِبِ: الْوَحَداتُ عَلى الْيَمِينِ وَالْعَشَراتُ عَلى الْيَسارِ.'
					},
					{
						text: `$${offTen}$`,
						diagnosticFeedback: `تَحَقَّقْ مِنْ جَمْعِ رَقْمَيِ الْعَشَراتِ: $${Math.floor(a1 / 10)} + ${Math.floor(a2 / 10)} = ${tSum}$.`
					},
					{
						text: `$${forgotTens}$`,
						diagnosticFeedback: `لا تَنْسَ جَمْعَ عَشَراتِ الْعَدَدِ $${a2}$ وَلَيْسَ وَحَداتِهِ فَقَطْ.`
					}
				],
				rng
			);
			finalAnswer = String(sum);
			quizQuestion = {
				type: 'mcq',
				questionText: `اُحْسُبِ الْمَجْمُوعَ (دُونَ احْتِفاظٍ): $${a1} + ${a2} = ?$`,
				questionTextAr: `اُحْسُبِ الْمَجْمُوعَ (دُونَ احْتِفاظٍ): $${a1} + ${a2} = ?$`,
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `نَجْمَعُ الْوَحَداتِ ($${a1 % 10} + ${a2 % 10} = ${uSum}$) ثُمَّ الْعَشَراتِ ($${Math.floor(a1 / 10)} + ${Math.floor(a2 / 10)} = ${tSum}$)، فَنَجِدُ $${sum}$.`
			};
		} else if (variant === 1) {
			const uDiff = diff % 10;
			const tDiff = Math.floor(diff / 10);
			const offTen = diff + 10 <= 99 ? diff + 10 : Math.max(1, diff - 10);
			const offOne = diff + 1 <= 99 ? diff + 1 : diff - 1;
			const swapped = uDiff !== 0 && tDiff !== uDiff ? uDiff * 10 + tDiff : Math.max(1, diff - 2);

			const built = buildUniqueMcqOptions(
				`$${diff}$`,
				[
					{
						text: `$${offTen}$`,
						diagnosticFeedback: `راجِعْ طَرْحَ الْعَشَراتِ: $${Math.floor(s1 / 10)} - ${Math.floor(s2 / 10)} = ${tDiff}$.`
					},
					{
						text: `$${offOne}$`,
						diagnosticFeedback: `راجِعْ طَرْحَ الْوَحَداتِ: $${s1 % 10} - ${s2 % 10} = ${uDiff}$.`
					},
					{
						text: `$${swapped}$`,
						diagnosticFeedback: 'تَأَكَّدْ مِنْ كِتابَةِ الْوَحَداتِ يَمِينًا وَالْعَشَراتِ يَسارًا.'
					}
				],
				rng
			);
			finalAnswer = String(diff);
			quizQuestion = {
				type: 'mcq',
				questionText: `اُحْسُبِ الْفَرْقَ (دُونَ اسْتِلافٍ): $${s1} - ${s2} = ?$`,
				questionTextAr: `اُحْسُبِ الْفَرْقَ (دُونَ اسْتِلافٍ): $${s1} - ${s2} = ?$`,
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `نَطْرَحُ الْوَحَداتِ ($${s1 % 10} - ${s2 % 10} = ${uDiff}$) ثُمَّ الْعَشَراتِ ($${Math.floor(s1 / 10)} - ${Math.floor(s2 / 10)} = ${tDiff}$)، فَنَجِدُ $${diff}$.`
			};
		} else {
			finalAnswer = String(sum);
			quizQuestion = {
				type: 'calculated',
				questionText: `أَنْجِزِ الْجَمْعَ الْبَسِيطَ دُونَ احْتِفاظٍ: $${a1} + ${a2} = ?$`,
				questionTextAr: `أَنْجِزِ الْجَمْعَ الْبَسِيطَ دُونَ احْتِفاظٍ: $${a1} + ${a2} = ?$`,
				questionData: {
					answer: sum,
					displayTemplate: '= ?',
					variables: [],
					tolerance: 0
				},
				explanation: `الْوَحَداتُ: $${a1 % 10} + ${a2 % 10} = ${sum % 10}$، وَالْعَشَراتُ: $${Math.floor(a1 / 10)} + ${Math.floor(a2 / 10)} = ${Math.floor(sum / 10)}$، إِذَنْ $${a1} + ${a2} = ${sum}$.`
			};
		}

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1fr', '1fr'],
				children: [
					{
						type: 'table',
						headers: ['و', 'ع', 'الْجَمْعُ'],
						cells: [],
						rows: [
							[`$${a1 % 10}$`, `$${Math.floor(a1 / 10)}$`, ''],
							[`$${a2 % 10}$`, `$${Math.floor(a2 / 10)}$`, '$+$'],
							[
								{ content: '.....', answer: `$${sum % 10}$`, mark: '0.75' },
								{ content: '.....', answer: `$${Math.floor(sum / 10)}$` },
								'$=$'
							]
						],
						align: 'center',
						borders: 'grid',
						headerBackground: true,
						width: 'full'
					},
					{
						type: 'table',
						headers: ['و', 'ع', 'الطَّرْحُ'],
						cells: [],
						rows: [
							[`$${s1 % 10}$`, `$${Math.floor(s1 / 10)}$`, ''],
							[`$${s2 % 10}$`, `$${Math.floor(s2 / 10)}$`, '$-$'],
							[
								{ content: '.....', answer: `$${diff % 10}$`, mark: '0.75' },
								{ content: '.....', answer: `$${Math.floor(diff / 10)}$` },
								'$=$'
							]
						],
						align: 'center',
						borders: 'grid',
						headerBackground: true,
						width: 'full'
					}
				]
			},
			{
				type: 'text',
				content: `أَكْمِلْ أُفُقِيًّا:  $${a1} + ${a2} = "....."$    وَ    $${s1} - ${s2} = "....."$`,
				answer: `الْجَوابُ:\n$ ${a1} + ${a2} = ${sum} $\n\n$ ${s1} - ${s2} = ${diff} $`
			}
		];

		return {
			templateId: '1ap_t3_add_sub_no_carry',
			seed: cleanSeed,
			grade: '1ap',
			trimesterId: 't3',
			difficulty,
			domain: 'numeric',
			titleAr: 'الجمع دون احتفاظ والطرح البسيط',
			quizQuestion,
			sujetExercise: {
				points: 1.5,
				instruction: 'أَنْجِزِ الْعَمَلِيَّتَيْنِ عَمُودِيًّا وَأُفُقِيًّا (دُونَ احْتِفاظٍ وَدُونَ اسْتِلافٍ):',
				content
			},
			hints: [
				'في الْعَمَلِيَّةِ الْعَمُودِيَّةِ، نَضَعُ الْوَحَداتِ تَحْتَ الْوَحَداتِ (و) وَالْعَشَراتِ تَحْتَ الْعَشَراتِ (ع).',
				'نَبْدَأُ دائِمًا بِحِسابِ رَقْمَيِ الْوَحَداتِ، ثُمَّ رَقْمَيِ الْعَشَراتِ.',
				`جَرِّبْ: $${a1 % 10} + ${a2 % 10}$ فِي الْجَمْعِ، وَ $${s1 % 10} - ${s2 % 10}$ فِي الطَّرْحِ.`
			],
			solutionStepsAr: [
				`الْجَمْعُ: الْوَحَداتُ $${a1 % 10} + ${a2 % 10} = ${sum % 10}$، وَالْعَشَراتُ $${Math.floor(a1 / 10)} + ${Math.floor(a2 / 10)} = ${Math.floor(sum / 10)}$، إِذَنْ $${a1} + ${a2} = ${sum}$.`,
				`الطَّرْحُ: الْوَحَداتُ $${s1 % 10} - ${s2 % 10} = ${diff % 10}$، وَالْعَشَراتُ $${Math.floor(s1 / 10)} - ${Math.floor(s2 / 10)} = ${Math.floor(diff / 10)}$، إِذَنْ $${s1} - ${s2} = ${diff}$.`
			],
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// 6. Integration Problem (الوضعية الإدماجية): Purchasing Items Using Coins <= 50 DA, Sum < 100
// ---------------------------------------------------------------------------
const SHOP_SCENARIOS = [
	{
		placeAcc: 'الْمَكْتَبَةَ',
		items: [
			{ acc: 'كُرّاسًا', nom: 'كُرّاسٌ', defGen: 'الْكُرّاسِ' },
			{ acc: 'قَلَمًا', nom: 'قَلَمٌ', defGen: 'الْقَلَمِ' },
			{ acc: 'مِمْحاةً', nom: 'مِمْحاةٌ', defGen: 'الْمِمْحاةِ' }
		]
	},
	{
		placeAcc: 'الْمَتْجَرَ',
		items: [
			{ acc: 'عَصِيرًا', nom: 'عَصِيرٌ', defGen: 'الْعَصِيرِ' },
			{ acc: 'كَعْكَةً', nom: 'كَعْكَةٌ', defGen: 'الْكَعْكَةِ' },
			{ acc: 'حَلْوَى', nom: 'حَلْوَى', defGen: 'الْحَلْوَى' }
		]
	},
	{
		placeAcc: 'سُوقَ الْفَواكِهِ',
		items: [
			{ acc: 'تُفّاحًا', nom: 'تُفّاحٌ', defGen: 'التُّفّاحِ' },
			{ acc: 'مَوْزًا', nom: 'مَوْزٌ', defGen: 'الْمَوْزِ' },
			{ acc: 'إِجاصًا', nom: 'إِجاصٌ', defGen: 'الْإِجاصِ' }
		]
	}
] as const;

const templateIntegrationShop: ParameterizedTemplate = {
	id: '1ap_t3_integration_shop',
	grade: '1ap',
	trimesterId: 't3',
	domain: 'integration',
	curriculumLessonId: 'lesson_1ap_t3_integration',
	titleAr: 'وضعية إدماجية: الشراء بالقطع النقدية الجزائرية',
	defaultPoints: 4,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 6);

		const person = rng.pick(CHILDREN);
		const child = person.name;
		const childGen = person.gen;
		const verbHas = person.fem ? 'تَمْلِكُ' : 'يَمْلِكُ';
		const verbVisited = person.fem ? 'زارَتْ' : 'زارَ';
		const verbBought = person.fem ? 'اِشْتَرَتْ' : 'اِشْتَرَى';
		const pronAt = person.fem ? 'عِنْدَها' : 'عِنْدَهُ';

		const shop = rng.pick(SHOP_SCENARIOS);
		const [item1, item2, item3] = shop.items;

		const [p1, p2] =
			difficulty === 'easy'
				? pickNoCarryPair(rng, 22, 46, 11)
				: difficulty === 'medium'
					? pickNoCarryPair(rng, 34, 66, 12)
					: pickNoCarryPair(rng, 44, 77, 14);
		const totalCost = p1 + p2;
		const costT = Math.floor(totalCost / 10);
		const costU = totalCost % 10;

		const budgetCandidates: number[] = [];
		for (let b = totalCost + 10; b <= 98; b++) {
			const bt = Math.floor(b / 10);
			const bu = b % 10;
			if (bu >= costU && bt >= costT + 1) {
				const c = coinsForAmount(b);
				if (c.length >= 3 && c.length <= 6) {
					budgetCandidates.push(b);
				}
			}
		}
		const budget = budgetCandidates.length > 0 ? rng.pick(budgetCandidates) : 89;
		const coins = coinsForAmount(budget);
		const remaining = budget - totalCost;
		const remAfterOne = budget - p1;

		let p3 = rng.int(11, 39);
		while (p3 === p1 || p3 === p2) {
			p3 = p3 + 1 <= 48 ? p3 + 1 : 12;
		}

		const svg = svgCoinsDinar(coins);
		const svgPath = saveSvgAsset(`1ap_t3_int_${difficulty}_s${cleanSeed}`, svg);

		const variant = rng.int(0, 2);
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer = '';

		if (variant === 0) {
			const questionText = `تَأَمَّلِ الْقِطَعَ النَّقْدِيَّةَ الَّتِي ${verbHas}ها ${child} فِي الصُّورَةِ. ${verbBought} ${item1.acc} ثَمَنُهُ $${p1}$ DA. كَمْ دِينارًا بَقِيَ ${pronAt}؟`;
			finalAnswer = `${remAfterOne} DA`;
			quizQuestion = {
				type: 'calculated',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: `نُقُودُ ${childGen} (DA)`,
				questionData: {
					answer: remAfterOne,
					displayTemplate: '? DA',
					variables: [],
					tolerance: 0
				},
				explanation: `نَعُدُّ الْقِطَعَ أَوَّلًا فَنَجِدُ $${budget}\\text{ DA}$، ثُمَّ نَطْرَحُ ثَمَنَ ${item1.nom}: $${budget} - ${p1} = ${remAfterOne}\\text{ DA}$.`
			};
		} else if (variant === 1) {
			const questionText = `تَأَمَّلِ الْقِطَعَ النَّقْدِيَّةَ الَّتِي ${verbHas}ها ${child} فِي الصُّورَةِ. ${verbBought} ${item1.acc} ثَمَنُهُ $${p1}$ DA وَ${item2.acc} ثَمَنُهُ $${p2}$ DA. كَمْ دِينارًا بَقِيَ ${pronAt}؟`;
			const d1 = remaining + 10 <= 99 ? remaining + 10 : Math.max(1, remaining - 10);
			const d2 = totalCost;
			const d3 = remaining + 1 <= 99 ? remaining + 1 : remaining - 1;
			const built = buildUniqueMcqOptions(
				`$${remaining}\\text{ DA}$`,
				[
					{
						text: `$${d1}\\text{ DA}$`,
						diagnosticFeedback: 'تَأَكَّدْ مِنْ عَدِّ الْقِطَعِ النَّقْدِيَّةِ وَطَرْحِ الْعَشَراتِ بِدِقَّةٍ.'
					},
					{
						text: `$${d2}\\text{ DA}$`,
						diagnosticFeedback: `هَذا ثَمَنُ الْمُشْتَرَياتِ ($${p1} + ${p2}$) وَلَيْسَ الْمَبْلَغُ الْمُتَبَقِّي!`
					},
					{
						text: `$${d3}\\text{ DA}$`,
						diagnosticFeedback: 'راجِعْ طَرْحَ رَقْمَيِ الْوَحَداتِ بِدِقَّةٍ.'
					}
				],
				rng
			);
			finalAnswer = `${remaining} DA`;
			quizQuestion = {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: `نُقُودُ ${childGen} (DA)`,
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `نُقُودُ ${childGen}: $${budget}\\text{ DA}$. ثَمَنُ الْمُشْتَرَياتِ: $${p1} + ${p2} = ${totalCost}\\text{ DA}$. الْباقِي: $${budget} - ${totalCost} = ${remaining}\\text{ DA}$.`
			};
		} else {
			const questionText = `تَأَمَّلْ نُقُودَ ${childGen} فِي الصُّورَةِ. ${verbBought} ${item1.acc} بِـ $${p1}$ DA وَ${item2.acc} بِـ $${p2}$ DA. اُحْسُبْ كَمْ بَقِيَ ${pronAt}:`;
			finalAnswer = `${remaining} DA`;
			quizQuestion = {
				type: 'fill_blank',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: `نُقُودُ ${childGen} (DA)`,
				questionData: {
					sentence: `بَقِيَ ${pronAt}: ___ DA`,
					acceptedAnswers: [String(remaining), `${remaining} DA`, `${remaining}DA`]
				},
				explanation: `مَجْمُوعُ النُّقُودِ $${budget}\\text{ DA}$، وَثَمَنُ الْمُشْتَرَياتِ $${p1} + ${p2} = ${totalCost}\\text{ DA}$، فَيَبْقَى $${budget} - ${totalCost} = ${remaining}\\text{ DA}$.`
			};
		}

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.25fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `${verbHas} ${child} الْقِطَعَ النَّقْدِيَّةَ الْمُبَيَّنَةَ فِي الصُّورَةِ. ${verbVisited} ${shop.placeAcc} وَ${verbBought} ${item1.acc} وَ${item2.acc} مِنْ جَدْوَلِ الْأَسْعارِ التّالِي:`
					},
					{
						type: 'image',
						src: svgPath,
						caption: `نُقُودُ ${childGen} (DA)`
					}
				]
			},
			{
				type: 'table',
				headers: [item1.nom, item2.nom, item3.nom],
				cells: [],
				rows: [[`\u2066${p1} DA\u2069`, `\u2066${p2} DA\u2069`, `\u2066${p3} DA\u2069`]],
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			},
			{
				type: 'text',
				content: `1) اُحْسُبِ الْمَبْلَغَ الَّذِي ${verbHas}هُ ${child} مِنَ الصُّورَةِ:`,
				answer: `الْعَمَلِيَّةُ:\n$ ${coins.join(' + ')} = ${budget} $\n\nالْجَوابُ: ${verbHas} ${child} مَبْلَغَ \u2066${budget} DA\u2069`,
				mark: '1'
			},
			{
				type: 'text',
				content: `2) اُحْسُبْ ثَمَنَ ${item1.defGen} وَ${item2.defGen} مَعًا:`,
				answer: `الْعَمَلِيَّةُ:\n$ ${p1} + ${p2} = ${totalCost} $\n\nالْجَوابُ: ثَمَنُ الْمُشْتَرَياتِ هُوَ \u2066${totalCost} DA\u2069`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `3) كَمْ دِينارًا بَقِيَ ${pronAt} بَعْدَ الشِّراءِ؟`,
				answer: `الْعَمَلِيَّةُ:\n$ ${budget} - ${totalCost} = ${remaining} $\n\nالْجَوابُ: بَقِيَ ${pronAt} مَبْلَغُ \u2066${remaining} DA\u2069`,
				mark: '1.5'
			}
		];

		return {
			templateId: '1ap_t3_integration_shop',
			seed: cleanSeed,
			grade: '1ap',
			trimesterId: 't3',
			difficulty,
			domain: 'integration',
			titleAr: 'وضعية إدماجية: الشراء بالقطع النقدية الجزائرية',
			quizQuestion,
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 4,
				instruction: 'اِقْرَأِ الْوَضْعِيَّةَ جَيِّدًا وَاسْتَعْمِلِ الصُّورَةَ وَالْجَدْوَلَ لِلْإِجابَةِ:',
				content
			},
			hints: [
				`عُدَّ أَوَّلًا الْقِطَعَ النَّقْدِيَّةَ فِي الصُّورَةِ ($${coins.join(' + ')}$).`,
				`اِجْمَعْ ثَمَنَ الْمُشْتَرَياتِ دُونَ احْتِفاظٍ ($${p1} + ${p2}$).`,
				'اِطْرَحْ ثَمَنَ الْمُشْتَرَياتِ مِنَ الْمَبْلَغِ الَّذِي تَمْلِكُهُ لِإِيجادِ الْباقِي.'
			],
			solutionStepsAr: [
				`نَعُدُّ الْقِطَعَ النَّقْدِيَّةَ: $${coins.join(' + ')} = ${budget}\\text{ DA}$.`,
				`نَحْسُبُ ثَمَنَ ${item1.nom} وَ ${item2.nom} مَعًا: $${p1} + ${p2} = ${totalCost}\\text{ DA}$.`,
				`نَحْسُبُ الْمَبْلَغَ الْمُتَبَقِّيَ: $${budget} - ${totalCost} = ${remaining}\\text{ DA}$.`
			],
			finalAnswer
		};
	}
};

export const TEMPLATES_1AP_T3: ParameterizedTemplate[] = [
	templateNumbers40To99,
	templateGridLocation,
	templateCoinsDinar,
	templateMentalComplementsDoubles,
	templateAddSubNoCarry,
	templateIntegrationShop
];
