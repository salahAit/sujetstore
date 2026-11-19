import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import type { ContentBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import { esc, haloText, saveSciencesSvgAsset, wrapSciencesSvg } from '../../svg-sciences';

function makeRng(seed: number, difficulty: Difficulty, salt: number): SeededRng {
	const d = difficulty === 'easy' ? 19 : difficulty === 'medium' ? 37 : 59;
	return new SeededRng((((Math.trunc(seed) >>> 0) * 1009 + d * 71 + salt) >>> 0) || 1);
}

const KIDS = ['أَمِينُ', 'سَارَةُ', 'آدَمُ', 'مَرْيَمُ', 'رَائِدُ', 'إِيمَانُ', 'وَسِيمُ', 'لِينَا'] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Solid vs Liquid Materials
// ═══════════════════════════════════════════════════════════════════════════════
const solidVsLiquidTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1ap_t3_solid_vs_liquid',
	grade: '1ap',
	trimesterId: 't3',
	domain: 'matter_tech_primary',
	titleAr: 'التَّمْيِيزُ بَيْنَ المَادَّةِ الصَّلْبَةِ وَالمَادَّةِ السَّائِلَةِ',
	curriculumLessonId: 'sci_lesson_1ap_t3_solids_liquids',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 301);
		const solids = ['قِطْعَةُ خَشَبٍ', 'مِسْطَرَةٌ', 'حَجَرٌ', 'مِفْتَاحٌ حَدِيدِيٌّ', 'مِمْحَاةٌ'];
		const liquids = ['المَاءُ', 'الحَلِيبُ', 'الزَّيْتُ', 'عَصِيرُ البُرْتُقَالِ', 'العَسَلُ السَّائِلُ'];

		const askLiquid = seed % 2 === 0;
		const correctItem = askLiquid ? rng.pick(liquids) : rng.pick(solids);
		const wrongItems = askLiquid ? rng.pickDistinct(solids, 3) : rng.pickDistinct(liquids, 3);
		const all4 = rng.shuffle([correctItem, ...wrongItems]);

		const mcq = buildUniqueMcqOptions(
			correctItem,
			wrongItems.map((w) => ({
				text: w,
				diagnosticFeedback: askLiquid
					? `${w} مَادَّةٌ صَلْبَةٌ نُمْسِكُهَا بِاليَدِ وَلَا تَسِيلُ.`
					: `${w} مَادَّةٌ سَائِلَةٌ تَسِيلُ وَتَأْخُذُ شَكْلَ الإِنَاءِ.`
			})),
			rng
		);

		const svg = wrapSciencesSvg(
			420,
			190,
			`<rect x="6" y="6" width="408" height="178" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="210" y="28" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">صَنِّفِ المَوَادَّ: صَلْبَةٌ أَمْ سَائِلَةٌ؟</text>` +
				all4
					.map((m, idx) => {
						const x = 316 - idx * 98;
						const isLiq = liquids.includes(m);
						return (
							`<rect x="${x}" y="52" width="86" height="68" rx="9" fill="${isLiq ? '#f0f9ff' : '#fffbeb'}" stroke="${isLiq ? '#0284c7' : '#d97706'}" stroke-width="1.7"/>` +
							`<text x="${x + 43}" y="90" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#0f172a">${esc(m)}</text>`
						);
					})
					.join('') +
				haloText(`x="210" y="156" text-anchor="middle" font-size="10.8" font-weight="bold"`, '#1e3a8a', 'الصَّلْبُ لَهُ شَكْلٌ ثَابِتٌ — السَّائِلُ يَسِيلُ وَيَأْخُذُ شَكْلَ الإِنَاءِ')
		);
		const imageUrl = saveSciencesSvgAsset(`sci_1ap_t3_solid_vs_liquid_${difficulty}_s${seed}`, svg);

		const qText = askLiquid
			? 'أَيُّ مَادَّةٍ مِنَ المَوَادِّ التَّالِيَةِ هِيَ **مَادَّةٌ سَائِلَةٌ** تَسِيلُ وَتَأْخُذُ شَكْلَ الإِنَاءِ؟'
			: 'أَيُّ مَادَّةٍ مِنَ المَوَادِّ التَّالِيَةِ هِيَ **مَادَّةٌ صَلْبَةٌ** نُمْسِكُهَا بِأَصَابِعِنَا وَلَهَا شَكْلٌ ثَابِتٌ؟';

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) ${qText}\nالجَوَابُ: ....................`,
						answer: correctItem,
						mark: '0.5'
					},
					{
						type: 'image',
						src: imageUrl,
						caption: 'عَيِّنَاتٌ مِنْ مَوَادِّ المُحِيطِ'
					}
				]
			},
			{
				type: 'table',
				headers: ['المَادَّةُ', 'الحَالَةُ (صَلْبَةٌ / سَائِلَةٌ)'],
				cells: [],
				rows: all4.map((m) => [
					m,
					{ content: '....................', answer: liquids.includes(m) ? 'سَائِلَةٌ' : 'صَلْبَةٌ', mark: '0.5' }
				])
			}
		];

		return {
			templateId: 'sci_tpl_1ap_t3_solid_vs_liquid',
			seed,
			grade: '1ap',
			trimesterId: 't3',
			difficulty,
			domain: 'matter_tech_primary',
			titleAr: 'التَّمْيِيزُ بَيْنَ المَادَّةِ الصَّلْبَةِ وَالمَادَّةِ السَّائِلَةِ',
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'المَوَادُّ الصَّلْبَةُ وَالسَّائِلَةُ',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `${correctItem} مَادَّةٌ ${askLiquid ? 'سَائِلَةٌ تَسِيلُ وَتَأْخُذُ شَكْلَ الإِنَاءِ' : 'صَلْبَةٌ نُمْسِكُهَا بِاليَدِ وَلَهَا شَكْلٌ ثَابِتٌ'}.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'أَجِبْ عَنِ السُّؤَالِ ثُمَّ صَنِّفْ كُلَّ مَادَّةٍ فِي الجَدْوَلِ:',
				content
			},
			hints: [
				'هَلْ تَسْتَطِيعُ إِمْسَاكَ المَادَّةِ بِأَصَابِعِكَ؟ إِذَنْ هِيَ صَلْبَةٌ.',
				'إِذَا كَانَتْ تَسِيلُ عِنْدَ سَكْبِهَا فَهِيَ سَائِلَةٌ.',
				`الإِجَابَةُ الصَّحِيحَةُ هِيَ: ${correctItem}.`
			],
			solutionStepsAr: [
				'نُقَارِنُ بَيْنَ خَصَائِصِ الصَّلْبِ وَالسَّائِلِ.',
				`${correctItem} هِيَ المَادَّةُ المَطْلُوبَةُ.`
			],
			finalAnswer: correctItem
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Dissolving in Water
// ═══════════════════════════════════════════════════════════════════════════════
const solubleInsolubleTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1ap_t3_soluble_insoluble',
	grade: '1ap',
	trimesterId: 't3',
	domain: 'matter_tech_primary',
	titleAr: 'تَجْرِبَةُ الذَّوَبَانِ فِي المَاءِ',
	curriculumLessonId: 'sci_lesson_1ap_t3_dissolving_water',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 302);
		const kid = rng.pick(KIDS);
		const samples = [
			{ name: 'السُّكَّرُ', dissolves: true, detail: 'يَخْتَفِي فِي المَاءِ وَيُصْبِحُ الطَّعْمُ حُلْوًا' },
			{ name: 'المِلْحُ', dissolves: true, detail: 'يَخْتَفِي فِي المَاءِ وَيُصْبِحُ الطَّعْمُ مَالِحًا' },
			{ name: 'مَسْحُوقُ العَصِيرِ', dissolves: true, detail: 'يَخْتَفِي وَيُلَوِّنُ المَاءَ' },
			{ name: 'الرَّمْلُ', dissolves: false, detail: 'يَتَرَسَّبُ فِي قَاعِ الكَأْسِ وَلَا يَخْتَفِي' },
			{ name: 'الزَّيْتُ', dissolves: false, detail: 'يَطْفُو فَوْقَ سَطْحِ المَاءِ وَلَا يَمْتَزِجُ بِهِ' },
			{ name: 'الحَصَى الصَّغِيرُ', dissolves: false, detail: 'يَبْقَى صَلْبًا فِي قَاعِ الكَأْسِ' }
		] as const;

		const target = rng.pick(samples);
		const svg = wrapSciencesSvg(
			420,
			195,
			`<rect x="6" y="6" width="408" height="183" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="210" y="27" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">تَجْرِبَةُ ${esc(kid)}: وَضْعُ ${esc(target.name)} فِي المَاءِ</text>` +
				// Beaker
				`<rect x="158" y="48" width="104" height="96" rx="8" fill="#ffffff" stroke="#0284c7" stroke-width="2.2"/>` +
				`<rect x="160" y="76" width="100" height="66" rx="6" fill="#bae6fd"/>` +
				(!target.dissolves && target.name === 'الزَّيْتُ'
					? `<rect x="160" y="72" width="100" height="14" fill="#fde047"/>`
					: !target.dissolves
						? `<rect x="160" y="124" width="100" height="18" rx="4" fill="#b45309"/>`
						: '') +
				`<line x1="210" y1="36" x2="210" y2="112" stroke="#475569" stroke-width="3" stroke-linecap="round"/>` +
				haloText(`x="210" y="106" text-anchor="middle" font-size="11" font-weight="bold"`, '#0c4a6e', `مَاءٌ + ${target.name}`) +
				haloText(`x="210" y="170" text-anchor="middle" font-size="11" font-weight="bold"`, '#1e3a8a', 'بَعْدَ التَّحْرِيكِ بِالمِلْعَقَةِ: هَلْ يَذُوبُ أَمْ لَا يَذُوبُ؟')
		);
		const imageUrl = saveSciencesSvgAsset(`sci_1ap_t3_soluble_insoluble_${difficulty}_s${seed}`, svg);

		const correctText = target.dissolves
			? `يَذُوبُ فِي المَاءِ (${target.detail})`
			: `لَا يَذُوبُ فِي المَاءِ (${target.detail})`;

		const mcq = buildUniqueMcqOptions(
			correctText,
			[
				{
					text: target.dissolves ? 'لَا يَذُوبُ فِي المَاءِ وَيَبْقَى فِي القَاعِ' : 'يَذُوبُ وَيَخْتَفِي تَمَامًا فِي المَاءِ',
					diagnosticFeedback: `${target.name} ${target.dissolves ? 'يَذُوبُ فِي المَاءِ' : 'لَا يَذُوبُ فِي المَاءِ'}.`
				},
				{ text: 'يَتَحَوَّلُ المَاءُ إِلى جَلِيدٍ صَلْبٍ', diagnosticFeedback: 'التَّحْرِيكُ فِي المَاءِ لَا يُجَمِّدُ المَاءَ.' },
				{ text: 'يَطِيرُ الإِنَاءُ فِي الهَوَاءِ', diagnosticFeedback: 'تَأَمَّلِ التَّجْرِبَةَ جَيِّدًا؛ نَحْنُ نَخْتَبِرُ الذَّوَبَانَ فِي المَاءِ.' }
			],
			rng
		);

		const qText = `وَضَعَ ${kid} مِلْعَقَةً مِنْ **${target.name}** فِي كَأْسِ مَاءٍ وَحَرَّكَهُ جَيِّدًا. مَاذَا يَحْدُثُ؟`;

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) ${qText}\nالجَوَابُ: ........................................`,
						answer: correctText,
						mark: '1'
					},
					{
						type: 'image',
						src: imageUrl,
						caption: `تَجْرِبَةُ الذَّوَبَانِ (${target.name})`
					}
				]
			},
			{
				type: 'table',
				headers: ['المَادَّةُ', 'تَذُوبُ فِي المَاءِ / لَا تَذُوبُ'],
				cells: [],
				rows: [
					['السُّكَّرُ', { content: '....................', answer: 'تَذُوبُ فِي المَاءِ', mark: '0.5' }],
					['الرَّمْلُ', { content: '....................', answer: 'لَا تَذُوبُ فِي المَاءِ', mark: '0.5' }],
					['المِلْحُ', { content: '....................', answer: 'تَذُوبُ فِي المَاءِ', mark: '0.5' }]
				]
			}
		];

		return {
			templateId: 'sci_tpl_1ap_t3_soluble_insoluble',
			seed,
			grade: '1ap',
			trimesterId: 't3',
			difficulty,
			domain: 'matter_tech_primary',
			titleAr: 'تَجْرِبَةُ الذَّوَبَانِ فِي المَاءِ',
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: `مَاءٌ وَ${target.name}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `${target.name} ${target.dissolves ? 'يَذُوبُ فِي المَاءِ' : 'لَا يَذُوبُ فِي المَاءِ'}؛ ${target.detail}.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'لَاحِظِ التَّجْرِبَةَ ثُمَّ أَجِبْ وَأَكْمِلِ الجَدْوَلَ:',
				content
			},
			hints: [
				'السُّكَّرُ وَالمِلْحُ يَذُوبَانِ فِي المَاءِ وَيَخْتَفِيَانِ عَنِ العَيْنِ.',
				'الرَّمْلُ وَالحَصَى وَالزَّيْتُ لَا تَذُوبُ فِي المَاءِ.',
				`النَّتِيجَةُ هِيَ: ${correctText}.`
			],
			solutionStepsAr: [
				`نَخْتَبِرُ مَادَّةَ: ${target.name}.`,
				`النَّتِيجَةُ بَعْدَ التَّحْرِيكِ: ${correctText}.`
			],
			finalAnswer: target.dissolves ? 'يَذُوبُ فِي المَاءِ' : 'لَا يَذُوبُ فِي المَاءِ'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Day, Night & Days of the Week
// ═══════════════════════════════════════════════════════════════════════════════
const dayNightWeekTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1ap_t3_day_night_week',
	grade: '1ap',
	trimesterId: 't3',
	domain: 'matter_tech_primary',
	titleAr: 'اللَّيْلُ وَالنَّهَارُ وَأَيَّامُ الأُسْبُوعِ',
	curriculumLessonId: 'sci_lesson_1ap_t3_time_day_week',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 303);
		const days = ['الأَحَدُ', 'الاِثْنَيْنِ', 'الثُّلَاثَاءُ', 'الأَرْبِعَاءُ', 'الخَمِيسُ', 'الجُمُعَةُ', 'السَّبْتُ'] as const;
		const idx = rng.int(1, 5);
		const today = days[idx];
		const yesterday = days[idx - 1];
		const tomorrow = days[idx + 1];
		const askTomorrow = seed % 2 === 0;
		const targetDay = askTomorrow ? tomorrow : yesterday;

		const svg = wrapSciencesSvg(
			440,
			190,
			`<rect x="6" y="6" width="428" height="178" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="220" y="27" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">شَرِيطُ أَيَّامِ الأُسْبُوعِ السَّبْعَةِ</text>` +
				days
					.map((d, i) => {
						const x = 374 - i * 58;
						const isToday = i === idx;
						const isHidden = (askTomorrow && i === idx + 1) || (!askTomorrow && i === idx - 1);
						return (
							`<rect x="${x}" y="52" width="54" height="44" rx="7" fill="${isToday ? '#dbeafe' : isHidden ? '#fef3c7' : '#ffffff'}" stroke="${isToday ? '#2563eb' : isHidden ? '#d97706' : '#94a3b8'}" stroke-width="${isToday || isHidden ? '2' : '1.4'}"/>` +
							`<text x="${x + 27}" y="78" text-anchor="middle" font-size="9.8" font-weight="bold" fill="${isToday ? '#1e3a8a' : isHidden ? '#92400e' : '#0f172a'}">${isHidden ? '؟' : d}</text>`
						);
					})
					.join('') +
				`<rect x="28" y="116" width="384" height="50" rx="8" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.4"/>` +
				`<text x="220" y="138" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e40af">اليَوْمَ هُوَ: ${today}</text>` +
				`<text x="220" y="156" text-anchor="middle" font-size="10.5" fill="#334155">أَبْحَثُ عَنْ يَوْمِ: ${askTomorrow ? 'غَدًا (اليَوْمُ التَّالِي)' : 'أَمْسِ (اليَوْمُ السَّابِقُ)'}</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_1ap_t3_day_night_week_${difficulty}_s${seed}`, svg);

		const wrongDays = rng.pickDistinct(
			days.filter((d) => d !== targetDay && d !== today),
			3
		);
		const mcq = buildUniqueMcqOptions(
			targetDay,
			wrongDays.map((w) => ({
				text: w,
				diagnosticFeedback: `رَاجِعْ تَرْتِيبَ أَيَّامِ الأُسْبُوعِ: قَبْلَ ${today} هُوَ ${yesterday}، وَبَعْدَهُ هُوَ ${tomorrow}.`
			})),
			rng
		);

		const qText = askTomorrow
			? `إِذَا كَانَ اليَوْمَ هُوَ **${today}**، فَمَا هُوَ يَوْمُ **غَدٍ**؟`
			: `إِذَا كَانَ اليَوْمَ هُوَ **${today}**، فَمَا هُوَ يَوْمُ **أَمْسِ**؟`;

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: imageUrl,
				caption: 'شَرِيطُ أَيَّامِ الأُسْبُوعِ'
			},
			{
				type: 'text',
				content: `1) اليَوْمَ هُوَ ${today}.\n- أَمْسِ كَانَ: ....................    غَدًا سَيَكُونُ: ....................`,
				answer: `أَمْسِ: ${yesterday} — غَدًا: ${tomorrow}.`,
				mark: '1'
			},
			{
				type: 'text',
				content: '2) كَمْ عَدَدُ أَيَّامِ الأُسْبُوعِ؟ ....................',
				answer: '7 أَيَّامٍ.',
				mark: '0.5'
			},
			{
				type: 'true_false',
				items: [
					{ q: 'تُشْرِقُ الشَّمْسُ فِي النَّهَارِ وَيَظْهَرُ القَمَرُ وَالنُّجُومُ فِي اللَّيْلِ.', a: 'صَحِيحٌ', mark: '0.5' },
					{ q: 'أَذْهَبُ إِلى المَدْرَسَةِ فِي الصَّبَاحِ وَأَنَامُ بَاكِرًا فِي اللَّيْلِ.', a: 'صَحِيحٌ', mark: '0.5' }
				]
			}
		];

		return {
			templateId: 'sci_tpl_1ap_t3_day_night_week',
			seed,
			grade: '1ap',
			trimesterId: 't3',
			difficulty,
			domain: 'matter_tech_primary',
			titleAr: 'اللَّيْلُ وَالنَّهَارُ وَأَيَّامُ الأُسْبُوعِ',
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'أَيَّامُ الأُسْبُوعِ السَّبْعَةُ',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `التَّرْتِيبُ هُوَ: ${yesterday} ← ${today} ← ${tomorrow}. إِذَنْ الإِجَابَةُ هِيَ: ${targetDay}.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'اِسْتَعِنْ بِشَرِيطِ أَيَّامِ الأُسْبُوعِ ثُمَّ أَجِبْ:',
				content
			},
			hints: [
				'أَيَّامُ الأُسْبُوعِ هِيَ: الأَحَدُ، الاِثْنَيْنِ، الثُّلَاثَاءُ، الأَرْبِعَاءُ، الخَمِيسُ، الجُمُعَةُ، السَّبْتُ.',
				'أَمْسِ هُوَ اليَوْمُ السَّابِقُ، وَغَدًا هُوَ اليَوْمُ التَّالِي.',
				`الإِجَابَةُ هِيَ: ${targetDay}.`
			],
			solutionStepsAr: [
				`اليَوْمَ: ${today}.`,
				`${askTomorrow ? 'اليَوْمُ التَّالِي (غَدًا)' : 'اليَوْمُ السَّابِقُ (أَمْسِ)'} هُوَ: ${targetDay}.`
			],
			finalAnswer: targetDay
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Clean Environment & Hygiene
// ═══════════════════════════════════════════════════════════════════════════════
const cleanEnvironmentTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1ap_t3_clean_environment',
	grade: '1ap',
	trimesterId: 't3',
	domain: 'ecology_environment',
	titleAr: 'النَّظَافَةُ وَحِمَايَةُ البِيئَةِ',
	curriculumLessonId: 'sci_lesson_1ap_t3_hygiene_environment',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 304);
		const kid = rng.pick(KIDS);
		const statements = [
			{ text: `يَرْمِي ${kid} أَوْرَاقَ اللُّمْجَةِ فِي سَلَّةِ المُهْمَلَاتِ وَيُغْلِقُ الحَنَفِيَّةَ بَعْدَ غَسْلِ يَدَيْهِ.`, ok: true },
			{ text: `يَغْرِسُ ${kid} شُجَيْرَةً فِي حَدِيقَةِ المَدْرَسَةِ وَيَسْقِيهَا بِالمَاءِ.`, ok: true },
			{ text: `يَرْمِي ${kid} القُمَامَةَ عَلَى أَرْضِ السَّاحَةِ وَيَتْرُكُ حَنَفِيَّةَ المَاءِ مَفْتُوحَةً.`, ok: false },
			{ text: `يَكْسِرُ ${kid} أَغْصَانَ الأَشْجَارِ وَيَقْطِفُ أَزْهَارَ الحَدِيقَةِ العَامَّةِ.`, ok: false }
		] as const;

		const item = rng.pick(statements);
		const svg = wrapSciencesSvg(
			420,
			190,
			`<rect x="6" y="6" width="408" height="178" rx="12" fill="${item.ok ? '#f0fdf4' : '#fef2f2'}" stroke="${item.ok ? '#16a34a' : '#dc2626'}" stroke-width="1.8"/>` +
				`<text x="210" y="30" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">تَصَرُّفٌ تِجَاهَ البِيئَةِ وَالنَّظَافَةِ</text>` +
				`<rect x="26" y="50" width="368" height="72" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>` +
				`<text x="210" y="90" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${esc(item.text)}</text>` +
				`<text x="210" y="156" text-anchor="middle" font-size="11.5" font-weight="bold" fill="${item.ok ? '#166534' : '#991b1b'}">هَلْ هَذَا سُلُوكٌ صَحِيحٌ يَحْمِي البِيئَةَ؟</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_1ap_t3_clean_environment_${difficulty}_s${seed}`, svg);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: imageUrl,
				caption: 'سُلُوكٌ تِجَاهَ البِيئَةِ'
			},
			{
				type: 'true_false',
				items: [
					{ q: item.text, a: item.ok ? 'صَحِيحٌ' : 'خَطَأٌ', mark: '1' },
					{ q: 'أَغْسِلُ يَدَيَّ بِالمَاءِ وَالصَّابُونِ قَبْلَ الأَكْلِ وَبَعْدَ اللَّعِبِ.', a: 'صَحِيحٌ', mark: '0.75' },
					{ q: 'تَبْذِيرُ المَاءِ سُلُوكٌ جَيِّدٌ لَا يَضُرُّ بِأَحَدٍ.', a: 'خَطَأٌ', c: 'المَاءُ ثَرْوَةٌ ثَمِينَةٌ يَجِبُ عَدَمُ تَبْذِيرِهَا.', mark: '0.75' }
				]
			}
		];

		return {
			templateId: 'sci_tpl_1ap_t3_clean_environment',
			seed,
			grade: '1ap',
			trimesterId: 't3',
			difficulty,
			domain: 'ecology_environment',
			titleAr: 'النَّظَافَةُ وَحِمَايَةُ البِيئَةِ',
			onecRole: 'recall',
			quizQuestion: {
				type: 'true_false',
				questionText: `هَلْ هَذَا السُّلُوكُ صَحِيحٌ وَيَحْمِي البِيئَةَ؟\n${item.text}`,
				questionTextAr: item.text,
				imageUrl,
				imageCaption: 'سُلُوكُ النَّظَافَةِ وَالبِيئَةِ',
				questionData: {
					correctAnswer: item.ok
				},
				explanation: item.ok
					? 'نَعَمْ، هَذَا سُلُوكٌ حَسَنٌ يَحْمِي البِيئَةَ وَيُحَافِظُ عَلَى النَّظَافَةِ وَالمَاءِ.'
					: 'لَا، هَذَا سُلُوكٌ خَاطِئٌ يُلَوِّثُ المُحِيطَ وَيَضُرُّ بِالبِيئَةِ وَالمَاءِ.'
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'ضَعْ (صَحِيحٌ) أَوْ (خَطَأٌ) أَمَامَ كُلِّ سُلُوكٍ:',
				content
			},
			hints: [
				'فَكِّرْ: هَلْ هَذَا السُّلُوكُ يُنَظِّفُ البِيئَةَ أَمْ يُلَوِّثُهَا؟',
				'نَحْنُ نَرْمِي الأَوْسَاخَ فِي السَّلَّةِ وَنَحْمِي الأَشْجَارَ وَالمَاءَ.',
				`الإِجَابَةُ هِيَ: ${item.ok ? 'صَحِيحٌ' : 'خَطَأٌ'}.`
			],
			solutionStepsAr: [
				`نَقْرَأُ السُّلُوكَ: ${item.text}`,
				`التَّقْيِيمُ: ${item.ok ? 'سُلُوكٌ صَحِيحٌ صَدِيقٌ لِلْبِيئَةِ' : 'سُلُوكٌ خَاطِئٌ يَضُرُّ بِالبِيئَةِ'}.`
			],
			finalAnswer: item.ok ? 'صَحِيحٌ' : 'خَطَأٌ'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Integration: School Clean-up & Water Day
// ═══════════════════════════════════════════════════════════════════════════════
const integrationSchoolCleanTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1ap_t3_integration_school_clean',
	grade: '1ap',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'وَضْعِيَّةٌ إِدْمَاجِيَّةٌ: حَمْلَةُ النَّظَافَةِ فِي مَدْرَسَتِنَا',
	curriculumLessonId: 'sci_lesson_1ap_t3_hygiene_environment',
	defaultPoints: 2.5,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 305);
		const kid = rng.pick(KIDS);

		const svg = wrapSciencesSvg(
			440,
			195,
			`<rect x="6" y="6" width="428" height="183" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="220" y="27" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">يَوْمُ السَّبْتِ: حَمْلَةُ تَنْظِيفِ حَدِيقَةِ المَدْرَسَةِ</text>` +
				`<rect x="298" y="48" width="122" height="118" rx="9" fill="#eff6ff" stroke="#2563eb" stroke-width="1.6"/>` +
				`<text x="359" y="76" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#1e3a8a">مَوَادُّ صَلْبَةٌ وَسَائِلَةٌ</text>` +
				`<text x="359" y="106" text-anchor="middle" font-size="10" fill="#334155">دَلْوُ مَاءٍ (سَائِلٌ)</text>` +
				`<text x="359" y="128" text-anchor="middle" font-size="10" fill="#334155">مِكْنَسَةٌ وَحَجَرٌ (صَلْبٌ)</text>` +
				`<rect x="159" y="48" width="122" height="118" rx="9" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.6"/>` +
				`<text x="220" y="76" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#166534">الذَّوَبَانُ</text>` +
				`<text x="220" y="106" text-anchor="middle" font-size="10" fill="#334155">سُكَّرٌ فِي المَاءِ يَذُوبُ</text>` +
				`<text x="220" y="128" text-anchor="middle" font-size="10" fill="#334155">رَمْلُ السَّاحَةِ لَا يَذُوبُ</text>` +
				`<rect x="20" y="48" width="122" height="118" rx="9" fill="#fffbeb" stroke="#d97706" stroke-width="1.6"/>` +
				`<text x="81" y="76" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#92400e">حِمَايَةُ البِيئَةِ</text>` +
				`<text x="81" y="106" text-anchor="middle" font-size="10" fill="#334155">نَرْمِي النُّفَايَاتِ</text>` +
				`<text x="81" y="128" text-anchor="middle" font-size="10" fill="#334155">فِي سَلَّةِ المُهْمَلَاتِ</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_1ap_t3_integration_school_clean_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'المَاءُ سَائِلٌ وَالمِكْنَسَةُ صَلْبَةٌ، وَنَرْمِي النُّفَايَاتِ فِي السَّلَّةِ',
			[
				{ text: 'المَاءُ صَلْبٌ وَالمِكْنَسَةُ سَائِلَةٌ', diagnosticFeedback: 'العَكْسُ صَحِيحٌ: المَاءُ سَائِلٌ وَالمِكْنَسَةُ صَلْبَةٌ.' },
				{ text: 'الرَّمْلُ يَذُوبُ فِي المَاءِ مِثْلَ السُّكَّرِ', diagnosticFeedback: 'الرَّمْلُ لَا يَذُوبُ فِي المَاءِ، بَيْنَمَا السُّكَّرُ يَذُوبُ.' },
				{ text: 'نَتْرُكُ النُّفَايَاتِ فِي السَّاحَةِ بَعْدَ الحَمْلَةِ', diagnosticFeedback: 'نَجْمَعُ النُّفَايَاتِ فِي سَلَّةِ المُهْمَلَاتِ لِحِمَايَةِ البِيئَةِ.' }
			],
			rng
		);

		const qText = `فِي يَوْمِ السَّبْتِ، شَارَكَ ${kid} فِي حَمْلَةِ تَنْظِيفِ المَدْرَسَةِ بِاسْتِعْمَالِ المَاءِ وَالمِكْنَسَةِ، ثُمَّ أَعَدَّ عَصِيرًا بِالسُّكَّرِ. أَيُّ عِبَارَةٍ صَحِيحَةٌ؟`;

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: imageUrl,
				caption: 'حَمْلَةُ تَنْظِيفِ حَدِيقَةِ المَدْرَسَةِ'
			},
			{
				type: 'text',
				content: '1) صَنِّفِ المَاءَ وَالمِكْنَسَةَ إِلى صَلْبٍ وَسَائِلٍ.',
				answer: 'المَاءُ سَائِلٌ، وَالمِكْنَسَةُ صَلْبَةٌ.',
				mark: '0.75'
			},
			{
				type: 'text',
				content: '2) حَضَّرَ التَّلَامِيذُ عَصِيرًا بِالمَاءِ وَالسُّكَّرِ. هَلْ يَذُوبُ السُّكَّرُ فِي المَاءِ؟ وَهَلْ يَذُوبُ الرَّمْلُ فِي المَاءِ؟',
				answer: 'السُّكَّرُ يَذُوبُ فِي المَاءِ، أَمَّا الرَّمْلُ فَلَا يَذُوبُ.',
				mark: '0.75'
			},
			{
				type: 'text',
				content: '3) نُظِّمَتِ الحَمْلَةُ يَوْمَ السَّبْتِ. مَا اليَوْمُ الَّذِي يَأْتِي بَعْدَ السَّبْتِ لِلْعَوْدَةِ إِلى الدِّرَاسَةِ؟ وَأَيْنَ نَرْمِي النُّفَايَاتِ؟',
				answer: 'اليَوْمُ التَّالِي هُوَ الأَحَدُ، وَنَرْمِي النُّفَايَاتِ فِي سَلَّةِ المُهْمَلَاتِ.',
				mark: '1'
			}
		];

		return {
			templateId: 'sci_tpl_1ap_t3_integration_school_clean',
			seed,
			grade: '1ap',
			trimesterId: 't3',
			difficulty,
			domain: 'integration',
			titleAr: 'وَضْعِيَّةٌ إِدْمَاجِيَّةٌ: حَمْلَةُ النَّظَافَةِ فِي مَدْرَسَتِنَا',
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'حَمْلَةُ نَظَافَةِ المَدْرَسَةِ',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'المَاءُ سَائِلٌ وَالمِكْنَسَةُ صَلْبَةٌ، وَالسُّكَّرُ يَذُوبُ فِي المَاءِ، وَنَرْمِي النُّفَايَاتِ فِي السَّلَّةِ.'
			},
			sujetExercise: {
				points: 2.5,
				customTitle: 'الوَضْعِيَّةُ الإِدْمَاجِيَّةُ',
				instruction: `شَارَكَ ${kid} مَعَ زُمَلَائِهِ فِي حَمْلَةِ تَنْظِيفِ المَدْرَسَةِ يَوْمَ السَّبْتِ. أَجِبْ عَنِ الأَسْئِلَةِ:`,
				content
			},
			hints: [
				'المَاءُ يَسِيلُ فَهُوَ سَائِلٌ، وَالمِكْنَسَةُ صَلْبَةٌ.',
				'السُّكَّرُ يَذُوبُ وَالرَّمْلُ لَا يَذُوبُ.',
				'بَعْدَ السَّبْتِ يَأْتِي الأَحَدُ، وَالنُّفَايَاتُ تُوضَعُ فِي سَلَّةِ المُهْمَلَاتِ.'
			],
			solutionStepsAr: [
				'المَاءُ سَائِلٌ وَالمِكْنَسَةُ صَلْبَةٌ.',
				'السُّكَّرُ يَذُوبُ فِي المَاءِ وَالرَّمْلُ لَا يَذُوبُ.',
				'بَعْدَ السَّبْتِ يَأْتِي يَوْمُ الأَحَدِ، وَنَرْمِي الأَوْسَاخَ فِي السَّلَّةِ.'
			],
			finalAnswer: 'الماء سائل والمكنسة صلبة — السكر يذوب — الأحد — سلة المهملات'
		};
	}
};

export const SCIENCES_TEMPLATES_1AP_T3: SciencesParameterizedTemplate[] = [
	solidVsLiquidTemplate,
	solubleInsolubleTemplate,
	dayNightWeekTemplate,
	cleanEnvironmentTemplate,
	integrationSchoolCleanTemplate
];
