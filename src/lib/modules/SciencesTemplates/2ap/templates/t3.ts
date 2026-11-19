import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import type { ContentBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	esc,
	haloText,
	saveSciencesSvgAsset,
	svgPlantAndPrimaryDiagram,
	wrapSciencesSvg
} from '../../svg-sciences';

function makeRng(seed: number, difficulty: Difficulty, salt: number): SeededRng {
	const d = difficulty === 'easy' ? 19 : difficulty === 'medium' ? 37 : 59;
	return new SeededRng((((Math.trunc(seed) >>> 0) * 1009 + d * 67 + salt) >>> 0) || 1);
}

const KIDS = ['أَمِينُ', 'سَارَةُ', 'آدَمُ', 'مَرْيَمُ', 'رَائِدُ', 'إِيمَانُ', 'وَسِيمُ', 'لِينَا'] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// 1. States of Matter, Melting & Freezing
// ═══════════════════════════════════════════════════════════════════════════════
const meltingFreezingTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2ap_t3_melting_freezing',
	grade: '2ap',
	trimesterId: 't3',
	domain: 'matter_tech_primary',
	titleAr: 'حَالَاتُ المَادَّةِ وَظَاهِرَتَا الاِنْصِهَارِ وَالتَّجَمُّدِ',
	curriculumLessonId: 'sci_lesson_2ap_t3_matter_melting_freezing',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 601);
		const cases = [
			{
				desc: 'تَرَكْنَا مُكَعَّبَاتِ جَلِيدٍ فِي صَحْنٍ دَافِئٍ فَتَحَوَّلَتْ إِلى مَاءٍ سَائِلٍ',
				process: 'الاِنْصِهَارُ (مِنْ صَلْبٍ إِلى سَائِلٍ بِالحَرَارَةِ)',
				short: 'الاِنْصِهَارُ',
				isMelt: true
			},
			{
				desc: 'وَضَعْنَا قِطْعَةَ زُبْدَةٍ صَلْبَةً فِي مِقْلَاةٍ سَاخِنَةٍ فَسَالَتْ',
				process: 'الاِنْصِهَارُ (مِنْ صَلْبٍ إِلى سَائِلٍ بِالحَرَارَةِ)',
				short: 'الاِنْصِهَارُ',
				isMelt: true
			},
			{
				desc: 'وَضَعْنَا كَأْسَ مَاءٍ سَائِلٍ فِي المُجَمِّدِ البَارِدِ فَتَحَوَّلَ إِلى جَلِيدٍ صَلْبٍ',
				process: 'التَّجَمُّدُ (مِنْ سَائِلٍ إِلى صَلْبٍ بِالبُرُودَةِ)',
				short: 'التَّجَمُّدُ',
				isMelt: false
			},
			{
				desc: 'وَضَعْنَا عَصِيرًا سَائِلًا فِي قَوَالِبَ دَاخِلَ المُجَمِّدِ فَصَارَ مُثَلَّجَاتٍ صَلْبَةً',
				process: 'التَّجَمُّدُ (مِنْ سَائِلٍ إِلى صَلْبٍ بِالبُرُودَةِ)',
				short: 'التَّجَمُّدُ',
				isMelt: false
			}
		] as const;

		const c = rng.pick(cases);
		const mcq = buildUniqueMcqOptions(
			c.process,
			[
				{
					text: c.isMelt
						? 'التَّجَمُّدُ (مِنْ سَائِلٍ إِلى صَلْبٍ بِالبُرُودَةِ)'
						: 'الاِنْصِهَارُ (مِنْ صَلْبٍ إِلى سَائِلٍ بِالحَرَارَةِ)',
					diagnosticFeedback: c.isMelt
						? 'الحَرَارَةُ تُحَوِّلُ الصَّلْبَ إِلى سَائِلٍ، وَهَذَا يُسَمَّى الاِنْصِهَارَ وَلَيْسَ التَّجَمُّدَ.'
						: 'البُرُودَةُ تُحَوِّلُ السَّائِلَ إِلى صَلْبٍ، وَهَذَا يُسَمَّى التَّجَمُّدَ وَلَيْسَ الاِنْصِهَارَ.'
				},
				{ text: 'الذَّوَبَانُ فِي الرَّمْلِ', diagnosticFeedback: 'تَغَيُّرُ الحَالَةِ بِالحَرَارَةِ أَوِ البُرُودَةِ يُسَمَّى انْصِهَارًا أَوْ تَجَمُّدًا.' },
				{ text: 'تَحَوُّلُ الهَوَاءِ إِلى حَجَرٍ', diagnosticFeedback: 'نَحْنُ نَدْرُسُ التَّحَوُّلَ بَيْنَ الحَالَتَيْنِ الصَّلْبَةِ وَالسَّائِلَةِ.' }
			],
			rng
		);

		const svg = svgPlantAndPrimaryDiagram('states_of_matter', {
			title: 'حَالَاتُ المَادَّةِ الثَّلَاثُ وَالاِنْصِهَارُ وَالتَّجَمُّدُ'
		});
		const imageUrl = saveSciencesSvgAsset(`sci_2ap_t3_melting_freezing_${difficulty}_s${seed}`, svg);

		const qText = `${c.desc}. مَا اسْمُ هَذَا التَّحَوُّلِ؟`;

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) ${qText}\nالجَوَابُ: ....................`,
						answer: c.process,
						mark: '1'
					},
					{
						type: 'image',
						src: imageUrl,
						caption: 'حَالَاتُ المَادَّةِ الثَّلَاثُ'
					}
				]
			},
			{
				type: 'table',
				headers: ['المَادَّةُ', 'حَالَتُهَا (صَلْبَةٌ / سَائِلَةٌ / غَازِيَّةٌ)'],
				cells: [],
				rows: [
					['مُكَعَّبُ الجَلِيدِ', { content: '....................', answer: 'صَلْبَةٌ', mark: '0.5' }],
					['المَاءُ وَالحَلِيبُ', { content: '....................', answer: 'سَائِلَةٌ', mark: '0.5' }],
					['الهَوَاءُ', { content: '....................', answer: 'غَازِيَّةٌ', mark: '0.5' }]
				]
			}
		];

		return {
			templateId: 'sci_tpl_2ap_t3_melting_freezing',
			seed,
			grade: '2ap',
			trimesterId: 't3',
			difficulty,
			domain: 'matter_tech_primary',
			titleAr: 'حَالَاتُ المَادَّةِ وَظَاهِرَتَا الاِنْصِهَارِ وَالتَّجَمُّدِ',
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'حَالَاتُ المَادَّةِ الثَّلَاثُ',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `التَّحَوُّلُ مِنْ صَلْبٍ إِلى سَائِلٍ بِالحَرَارَةِ هُوَ الاِنْصِهَارُ، وَمِنْ سَائِلٍ إِلى صَلْبٍ بِالبُرُودَةِ هُوَ التَّجَمُّدُ.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'أَجِبْ عَنِ السُّؤَالِ ثُمَّ صَنِّفْ حَالَةَ كُلِّ مَادَّةٍ فِي الجَدْوَلِ:',
				content
			},
			hints: [
				'الحَرَارَةُ تُحَوِّلُ الصَّلْبَ إِلى سَائِلٍ (اِنْصِهَارٌ).',
				'البُرُودَةُ تُحَوِّلُ السَّائِلَ إِلى صَلْبٍ (تَجَمُّدٌ).',
				`الجَوَابُ: ${c.short}.`
			],
			solutionStepsAr: [
				`نُحَدِّدُ الحَالَةَ الأُولَى وَالحَالَةَ الثَّانِيَةَ.`,
				`التَّحَوُّلُ هُوَ: ${c.process}.`
			],
			finalAnswer: c.short
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Air Around Us Properties
// ═══════════════════════════════════════════════════════════════════════════════
const airPropertiesTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2ap_t3_air_properties',
	grade: '2ap',
	trimesterId: 't3',
	domain: 'matter_tech_primary',
	titleAr: 'الهَوَاءُ مَوْجُودٌ حَوْلَنَا وَخَصَائِصُهُ',
	curriculumLessonId: 'sci_lesson_2ap_t3_air_around_us',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 602);
		const stmts = [
			{ text: 'القَارُورَةُ الَّتِي نَظُنُّهَا فَارِغَةً مَمْلُوءَةٌ بِالهَوَاءِ، وَنُثْبِتُ ذَلِكَ بِخُرُوجِ فُقَاعَاتٍ عِنْدَ غَمْرِهَا فِي المَاءِ.', ok: true },
			{ text: 'الهَوَاءُ جِسْمٌ غَازِيٌّ لَا نَرَاهُ بِالعَيْنِ وَلَكِنَّنَا نُحِسُّ بِحَرَكَتِهِ وَنَرَى أَثَرَهُ فِي تَحْرِيكِ الأَشْجَارِ.', ok: true },
			{ text: 'الهَوَاءُ مَادَّةٌ صَلْبَةٌ يُمْكِنُ إِمْسَاكُهَا بِالأَصَابِعِ مِثْلَ الحَجَرِ.', ok: false },
			{ text: 'لَا يُوجَدُ هَوَاءٌ دَاخِلَ القِسْمِ لِأَنَّنَا لَا نَرَاهُ بِأَعْيُنِنَا.', ok: false }
		] as const;

		const item = rng.pick(stmts);
		const svg = wrapSciencesSvg(
			420,
			190,
			`<rect x="6" y="6" width="408" height="178" rx="12" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.6"/>` +
				`<text x="210" y="28" text-anchor="middle" font-size="13" font-weight="bold" fill="#0369a1">تَجْرِبَةُ وُجُودِ الهَوَاءِ حَوْلَنَا</text>` +
				`<rect x="44" y="48" width="160" height="86" rx="8" fill="#bae6fd" stroke="#0284c7" stroke-width="1.8"/>` +
				`<rect x="86" y="76" width="76" height="32" rx="6" fill="#ffffff" stroke="#334155" stroke-width="1.5" transform="rotate(-14 124 92)"/>` +
				`<circle cx="72" cy="74" r="5" fill="#ffffff" stroke="#0284c7" stroke-width="1.5"/>` +
				`<circle cx="66" cy="58" r="6" fill="#ffffff" stroke="#0284c7" stroke-width="1.5"/>` +
				`<ellipse cx="318" cy="88" rx="34" ry="38" fill="#4ade80" stroke="#15803d" stroke-width="2"/>` +
				`<text x="318" y="92" text-anchor="middle" font-size="11" font-weight="bold" fill="#14532d">بَالُونُ هَوَاءٍ</text>` +
				`<text x="210" y="164" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#0f172a">فُقَاعَاتُ الهَوَاءِ فِي المَاءِ وَانْتِفَاخُ البَالُونِ</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_2ap_t3_air_properties_${difficulty}_s${seed}`, svg);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: imageUrl,
				caption: 'تَجَارِبُ إِثْبَاتِ وُجُودِ الهَوَاءِ'
			},
			{
				type: 'true_false',
				items: [
					{ q: item.text, a: item.ok ? 'صَحِيحٌ' : 'خَطَأٌ', mark: '1' },
					{ q: 'الرِّيَاحُ هِيَ هَوَاءٌ مُتَحَرِّكٌ يُدِيرُ المِرْوَحَةَ الوَرَقِيَّةَ.', a: 'صَحِيحٌ', mark: '0.75' },
					{ q: 'الهَوَاءُ النَّقِيُّ ضَرُورِيٌّ لِتَنَفُّسِ الإِنْسَانِ وَالحَيَوَانِ.', a: 'صَحِيحٌ', mark: '0.75' }
				]
			}
		];

		return {
			templateId: 'sci_tpl_2ap_t3_air_properties',
			seed,
			grade: '2ap',
			trimesterId: 't3',
			difficulty,
			domain: 'matter_tech_primary',
			titleAr: 'الهَوَاءُ مَوْجُودٌ حَوْلَنَا وَخَصَائِصُهُ',
			onecRole: 'recall',
			quizQuestion: {
				type: 'true_false',
				questionText: `صَحِيحٌ أَمْ خَطَأٌ؟\n${item.text}`,
				questionTextAr: item.text,
				imageUrl,
				imageCaption: 'وُجُودُ الهَوَاءِ حَوْلَنَا',
				questionData: {
					correctAnswer: item.ok
				},
				explanation:
					'الهَوَاءُ جِسْمٌ غَازِيٌّ مَوْجُودٌ فِي كُلِّ مَكَانٍ حَوْلَنَا؛ لَا نَرَاهُ وَلَكِنَّنَا نُثْبِتُ وُجُودَهُ بِالفُقَاعَاتِ وَالبَالُونِ وَحَرَكَةِ الرِّيَاحِ.'
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'لَاحِظِ الرَّسْمَ ثُمَّ أَجِبْ بِـ (صَحِيحٌ) أَوْ (خَطَأٌ):',
				content
			},
			hints: [
				'الهَوَاءُ غَازٌ شَفَّافٌ لَا نَرَاهُ لَكِنَّهُ يَمْلَأُ كُلَّ مَكَانٍ.',
				'خُرُوجُ الفُقَاعَاتِ مِنَ القَارُورَةِ الفَارِغَةِ دَلِيلٌ عَلَى وُجُودِ الهَوَاءِ.',
				`الإِجَابَةُ هِيَ: ${item.ok ? 'صَحِيحٌ' : 'خَطَأٌ'}.`
			],
			solutionStepsAr: [
				`نَفْحَصُ العِبَارَةَ: ${item.text}`,
				`الحُكْمُ: ${item.ok ? 'صَحِيحٌ' : 'خَطَأٌ'}.`
			],
			finalAnswer: item.ok ? 'صَحِيحٌ' : 'خَطَأٌ'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Balance Scale Comparison (Dynamic Tilted / Balanced SVG!)
// ═══════════════════════════════════════════════════════════════════════════════
const balanceComparisonTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2ap_t3_balance_comparison',
	grade: '2ap',
	trimesterId: 't3',
	domain: 'matter_tech_primary',
	titleAr: 'مُقَارَنَةُ الكُتَلِ بِاسْتِعْمَالِ المِيزَانِ ذِي الكَفَّتَيْنِ',
	curriculumLessonId: 'sci_lesson_2ap_t3_balance_measuring',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 603);
		const pairs = [
			{ right: 'البَطِّيخَةُ', left: 'التُّفَّاحَةُ', state: 'right_heavier' as const },
			{ right: 'القَلَمُ', left: 'الكِتَابُ الكَبِيرُ', state: 'left_heavier' as const },
			{ right: 'كِيسُ السُّكَّرِ', left: 'عِيَارُ 1 كغ', state: 'equal' as const },
			{ right: 'قَارُورَةُ المَاءِ', left: 'المِمْحَاةُ', state: 'right_heavier' as const },
			{ right: 'الرِّيشَةُ', left: 'الحَجَرُ', state: 'left_heavier' as const }
		];
		const chosen = rng.pick(pairs);

		const leftY = chosen.state === 'left_heavier' ? 114 : chosen.state === 'right_heavier' ? 84 : 99;
		const rightY = chosen.state === 'right_heavier' ? 114 : chosen.state === 'left_heavier' ? 84 : 99;

		const svg = wrapSciencesSvg(
			420,
			200,
			`<rect x="6" y="6" width="408" height="188" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="210" y="27" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">مُقَارَنَةُ الكُتَلِ عَلَى المِيزَانِ</text>` +
				`<rect x="160" y="168" width="100" height="14" rx="4" fill="#475569"/>` +
				`<rect x="205" y="96" width="10" height="72" fill="#64748b"/>` +
				`<line x1="100" y1="${leftY}" x2="320" y2="${rightY}" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>` +
				`<circle cx="210" cy="99" r="6.5" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>` +
				// Left pan
				`<line x1="100" y1="${leftY}" x2="100" y2="${leftY + 26}" stroke="#475569" stroke-width="2"/>` +
				`<rect x="52" y="${leftY + 26}" width="96" height="10" rx="4" fill="#94a3b8"/>` +
				`<rect x="62" y="${leftY + 2}" width="76" height="24" rx="6" fill="#dbeafe" stroke="#2563eb" stroke-width="1.6"/>` +
				`<text x="100" y="${leftY + 18}" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#1e3a8a">${esc(chosen.left)}</text>` +
				// Right pan
				`<line x1="320" y1="${rightY}" x2="320" y2="${rightY + 26}" stroke="#475569" stroke-width="2"/>` +
				`<rect x="272" y="${rightY + 26}" width="96" height="10" rx="4" fill="#94a3b8"/>` +
				`<rect x="282" y="${rightY + 2}" width="76" height="24" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="1.6"/>` +
				`<text x="320" y="${rightY + 18}" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#166534">${esc(chosen.right)}</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_2ap_t3_balance_comparison_${difficulty}_s${seed}`, svg);

		const correctText =
			chosen.state === 'right_heavier'
				? `${chosen.right} أَثْقَلُ مِنْ ${chosen.left}`
				: chosen.state === 'left_heavier'
					? `${chosen.left} أَثْقَلُ مِنْ ${chosen.right}`
					: `${chosen.right} لَهُ نَفْسُ كُتْلَةِ ${chosen.left} (حَالَةُ تَوَازُنٍ)`;

		const mcq = buildUniqueMcqOptions(
			correctText,
			[
				{
					text:
						chosen.state === 'right_heavier'
							? `${chosen.left} أَثْقَلُ مِنْ ${chosen.right}`
							: `${chosen.right} أَثْقَلُ مِنْ ${chosen.left}`,
					diagnosticFeedback: 'انْظُرْ إِلى الكَفَّةِ النَّازِلَةِ إِلى الأَسْفَلِ: هِيَ الَّتِي تَحْمِلُ الجِسْمَ الأَثْقَلَ!'
				},
				{
					text:
						chosen.state === 'equal'
							? `${chosen.left} أَثْقَلُ بِكَثِيرٍ مِنْ ${chosen.right}`
							: `${chosen.right} لَهُ نَفْسُ كُتْلَةِ ${chosen.left}`,
					diagnosticFeedback: chosen.state === 'equal' ? 'الكَفَّتَانِ فِي نَفْسِ المُسْتَوَى الأُفُقِيِّ فَهُمَا مُتَسَاوِيَتَانِ.' : 'المِيزَانُ مَائِلٌ وَلَيْسَ فِي حَالَةِ تَوَازُنٍ.'
				},
				{ text: 'لَا يُمْكِنُ المُقَارَنَةُ بِالمِيزَانِ', diagnosticFeedback: 'المِيزَانُ هُوَ الأَدَاةُ المُنَاسِبَةُ لِمُقَارَنَةِ الكُتَلِ.' }
			],
			rng
		);

		const qText = `تَأَمَّلْ وَضْعِيَّةَ كَفَّتَيِ المِيزَانِ فِي الصُّورَةِ. مَا الجُمْلَةُ الصَّحِيحَةُ؟`;

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) تَأَمَّلِ المِيزَانَ وَأَكْمِلِ الجُمْلَةَ بِـ (أَثْقَلُ مِنْ / أَخَفُّ مِنْ / لَهُ نَفْسُ كُتْلَةِ):\n- ${chosen.right} .............................. ${chosen.left}.`,
						answer: correctText,
						mark: '1.5'
					},
					{
						type: 'image',
						src: imageUrl,
						caption: 'المِيزَانُ ذُو الكَفَّتَيْنِ'
					}
				]
			},
			{
				type: 'text',
				content: '2) كَيْفَ نَعْرِفُ الجِسْمَ الأَثْقَلَ عَلَى المِيزَانِ ذِي الكَفَّتَيْنِ؟',
				answer: 'الجِسْمُ الأَثْقَلُ يُوجَدُ دَائِمًا فِي الكَفَّةِ النَّازِلَةِ إِلى الأَسْفَلِ.',
				mark: '1'
			}
		];

		return {
			templateId: 'sci_tpl_2ap_t3_balance_comparison',
			seed,
			grade: '2ap',
			trimesterId: 't3',
			difficulty,
			domain: 'matter_tech_primary',
			titleAr: 'مُقَارَنَةُ الكُتَلِ بِاسْتِعْمَالِ المِيزَانِ ذِي الكَفَّتَيْنِ',
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'مُقَارَنَةُ كُتْلَتَيْنِ بِالمِيزَانِ',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `فِي المِيزَانِ ذِي الكَفَّتَيْنِ، الكَفَّةُ النَّازِلَةُ تَحْمِلُ الأَثْقَلَ وَالتَّوَازُنُ يَعْنِي تَسَاوِيَ الكُتْلَتَيْنِ. إِذَنْ: ${correctText}.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'لَاحِظْ صُورَةَ المِيزَانِ ثُمَّ أَجِبْ:',
				content
			},
			hints: [
				'اُنْظُرْ أَيُّ كَفَّةٍ نَزَلَتْ إِلى الأَسْفَلِ، أَوْ هَلْ هُمَا مُتَسَاوِيَتَانِ؟',
				'الكَفَّةُ النَّازِلَةُ تَحْمِلُ الجِسْمَ الأَثْقَلَ.',
				`النَّتِيجَةُ: ${correctText}.`
			],
			solutionStepsAr: [
				'نُرَاقِبُ مَيْلَ كَفَّتَيِ المِيزَانِ.',
				`نَسْتَنْتِجُ أَنَّ: ${correctText}.`
			],
			finalAnswer: correctText
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Clock & Calendar Reading (Dynamic Analog Clock SVG!)
// ═══════════════════════════════════════════════════════════════════════════════
const clockCalendarReadTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2ap_t3_clock_calendar_read',
	grade: '2ap',
	trimesterId: 't3',
	domain: 'matter_tech_primary',
	titleAr: 'قِرَاءَةُ السَّاعَةِ وَالرَّزْنَامَةِ',
	curriculumLessonId: 'sci_lesson_2ap_t3_clock_calendar',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 604);
		const hourWords: Record<number, string> = {
			2: 'الثَّانِيَةُ',
			3: 'الثَّالِثَةُ',
			4: 'الرَّابِعَةُ',
			5: 'الخَامِسَةُ',
			7: 'السَّابِعَةُ',
			8: 'الثَّامِنَةُ',
			9: 'التَّاسِعَةُ',
			10: 'العَاشِرَةُ',
			11: 'الحَادِيَةَ عَشْرَةَ'
		};
		const hours = [2, 3, 4, 5, 7, 8, 9, 10, 11];
		const h = rng.pick(hours);
		const isHalf = difficulty !== 'easy' && seed % 2 === 1;

		// Compute hand endpoints
		const cx = 210;
		const cy = 104;
		const minAngleDeg = isHalf ? 180 : 0; // 0 deg = 12 o'clock
		const hourAngleDeg = ((h % 12) + (isHalf ? 0.5 : 0)) * 30;
		const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
		const mx = cx + 44 * Math.cos(toRad(minAngleDeg));
		const my = cy + 44 * Math.sin(toRad(minAngleDeg));
		const hx = cx + 28 * Math.cos(toRad(hourAngleDeg));
		const hy = cy + 28 * Math.sin(toRad(hourAngleDeg));

		let numsSvg = '';
		for (let n = 1; n <= 12; n++) {
			const rad = toRad(n * 30);
			const nx = cx + 52 * Math.cos(rad);
			const ny = cy + 52 * Math.sin(rad) + 4;
			numsSvg += `<text x="${nx.toFixed(1)}" y="${ny.toFixed(1)}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">${n}</text>`;
		}

		const svg = wrapSciencesSvg(
			420,
			200,
			`<rect x="6" y="6" width="408" height="188" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="210" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">كَمِ السَّاعَةُ الَّتِي تُشِيرُ إِلَيْهَا العَقَارِبُ؟</text>` +
				`<circle cx="${cx}" cy="${cy}" r="66" fill="#ffffff" stroke="#1d4ed8" stroke-width="3"/>` +
				numsSvg +
				`<line x1="${cx}" y1="${cy}" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}" stroke="#2563eb" stroke-width="2.8" stroke-linecap="round"/>` +
				`<line x1="${cx}" y1="${cy}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="#dc2626" stroke-width="4.2" stroke-linecap="round"/>` +
				`<circle cx="${cx}" cy="${cy}" r="4" fill="#0f172a"/>` +
				`<text x="210" y="186" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#475569">العَقْرَبُ الأَحْمَرُ القَصِيرُ لِلسَّاعَاتِ — العَقْرَبُ الأَزْرَقُ الطَّوِيلُ لِلدَّقَائِقِ</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_2ap_t3_clock_calendar_read_${difficulty}_s${seed}`, svg);

		const formatClock = (hr: number, half: boolean) =>
			`${hourWords[hr] ?? String(hr)} ${half ? 'وَالنِّصْفُ' : 'تَمَامًا'} (${String(hr).padStart(2, '0')}:${half ? '30' : '00'})`;

		const correctText = formatClock(h, isHalf);
		const altHours = rng.pickDistinct(
			hours.filter((x) => x !== h),
			2
		);
		const mcq = buildUniqueMcqOptions(
			correctText,
			[
				{ text: formatClock(h, !isHalf), diagnosticFeedback: isHalf ? 'العَقْرَبُ الكَبِيرُ يُشِيرُ إِلى 6 (وَالنِّصْفُ) وَلَيْسَ إِلى 12.' : 'العَقْرَبُ الكَبِيرُ يُشِيرُ إِلى 12 (تَمَامًا) وَلَيْسَ إِلى 6.' },
				{ text: formatClock(altHours[0], isHalf), diagnosticFeedback: `انْظُرْ إِلى العَقْرَبِ الصَّغِيرِ الأَحْمَرِ، إِنَّهُ يَدُلُّ عَلَى السَّاعَةِ ${h}.` },
				{ text: formatClock(altHours[1], !isHalf), diagnosticFeedback: 'تَأَكَّدْ مِنْ مَوْضِعِ العَقْرَبِ الصَّغِيرِ وَالعَقْرَبِ الكَبِيرِ مَعًا.' }
			],
			rng
		);

		const qText = 'اِقْرَأِ السَّاعَةَ المُوَضَّحَةَ فِي الرَّسْمِ ثُمَّ اخْتَرِ الإِجَابَةَ الصَّحِيحَةَ:';

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: '1) اُكْتُبِ السَّاعَةَ الَّتِي تُشِيرُ إِلَيْهَا العَقَارِبُ بِالحُرُوفِ وَالأَرْقَامِ:\nالسَّاعَةُ هِيَ: ........................................',
						answer: correctText,
						mark: '1.5'
					},
					{
						type: 'image',
						src: imageUrl,
						caption: 'السَّاعَةُ ذَاتُ العَقَارِبِ'
					}
				]
			},
			{
				type: 'text',
				content: '2) أَكْمِلْ بِالعَدَدِ المُنَاسِبِ مِنَ الرَّزْنَامَةِ:\n- فِي السَّنَةِ ..... شَهْرًا، وَ ..... فُصُولٍ (الشِّتَاءُ، الرَّبِيعُ، الصَّيْفُ، الخَرِيفُ).',
				answer: '12 شَهْرًا، وَ 4 فُصُولٍ.',
				mark: '1'
			}
		];

		return {
			templateId: 'sci_tpl_2ap_t3_clock_calendar_read',
			seed,
			grade: '2ap',
			trimesterId: 't3',
			difficulty,
			domain: 'matter_tech_primary',
			titleAr: 'قِرَاءَةُ السَّاعَةِ وَالرَّزْنَامَةِ',
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'قِرَاءَةُ السَّاعَةِ ذَاتِ العَقَارِبِ',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `العَقْرَبُ الصَّغِيرُ يَدُلُّ عَلَى السَّاعَةِ ${h}، وَالعَقْرَبُ الكَبِيرُ عَلَى ${isHalf ? '6 (النِّصْفُ)' : '12 (تَمَامًا)'}، إِذَنْ: ${correctText}.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'اِقْرَأِ السَّاعَةَ ثُمَّ أَكْمِلِ الفَرَاغَاتِ:',
				content
			},
			hints: [
				'العَقْرَبُ القَصِيرُ الأَحْمَرُ يُشِيرُ إِلى السَّاعَاتِ.',
				'العَقْرَبُ الطَّوِيلُ الأَزْرَقُ عَلَى 12 يَعْنِي "تَمَامًا"، وَعَلَى 6 يَعْنِي "وَالنِّصْفُ".',
				`السَّاعَةُ هِيَ: ${correctText}.`
			],
			solutionStepsAr: [
				`عَقْرَبُ السَّاعَاتِ القَصِيرُ يُشِيرُ إِلى ${h}.`,
				`عَقْرَبُ الدَّقَائِقِ الطَّوِيلُ يُشِيرُ إِلى ${isHalf ? '6 (30 دَقِيقَةً)' : '12 (00 دَقِيقَةً)'}.`,
				`السَّاعَةُ: ${correctText}.`
			],
			finalAnswer: correctText
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Integration: In the Family Kitchen
// ═══════════════════════════════════════════════════════════════════════════════
const integrationKitchenLabTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2ap_t3_integration_kitchen_lab',
	grade: '2ap',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'وَضْعِيَّةٌ إِدْمَاجِيَّةٌ: تَجَارِبُ وَأَدَوَاتٌ فِي مَطْبَخِ العَائِلَةِ',
	curriculumLessonId: 'sci_lesson_2ap_t3_matter_melting_freezing',
	defaultPoints: 2.5,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 605);
		const kid = rng.pick(KIDS);

		const svg = wrapSciencesSvg(
			440,
			195,
			`<rect x="6" y="6" width="428" height="183" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="220" y="27" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">تَحْضِيرُ الكَعْكَةِ فِي مَطْبَخِ عَائِلَةِ ${esc(kid)}</text>` +
				`<rect x="300" y="48" width="120" height="118" rx="9" fill="#fffbeb" stroke="#d97706" stroke-width="1.6"/>` +
				`<text x="360" y="76" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#92400e">1. المِيزَانُ</text>` +
				`<text x="360" y="106" text-anchor="middle" font-size="10" fill="#334155">قِيَاسُ كُتْلَةِ الدَّقِيقِ</text>` +
				`<text x="360" y="128" text-anchor="middle" font-size="10" fill="#b45309">وَالسُّكَّرِ وَالزُّبْدَةِ</text>` +
				`<rect x="160" y="48" width="120" height="118" rx="9" fill="#fef2f2" stroke="#dc2626" stroke-width="1.6"/>` +
				`<text x="220" y="76" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#991b1b">2. الاِنْصِهَارُ</text>` +
				`<text x="220" y="106" text-anchor="middle" font-size="10" fill="#334155">الزُّبْدَةُ الصَّلْبَةُ</text>` +
				`<text x="220" y="128" text-anchor="middle" font-size="10" fill="#dc2626">تَصِيرُ سَائِلَةً بِالحَرَارَةِ</text>` +
				`<rect x="20" y="48" width="120" height="118" rx="9" fill="#eff6ff" stroke="#2563eb" stroke-width="1.6"/>` +
				`<text x="80" y="76" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#1e3a8a">3. السَّاعَةُ</text>` +
				`<text x="80" y="106" text-anchor="middle" font-size="10" fill="#334155">مُرَاقَبَةُ وَقْتِ الطَّهْيِ</text>` +
				`<text x="80" y="128" text-anchor="middle" font-size="10" fill="#1d4ed8">نِصْفُ سَاعَةٍ</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_2ap_t3_integration_kitchen_lab_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'تَقِيسُ الأُمُّ الكُتَلَ بِالمِيزَانِ، وَتَنْصَهِرُ الزُّبْدَةُ بِالحَرَارَةِ، وَتُرَاقِبُ الوَقْتَ بِالسَّاعَةِ',
			[
				{ text: 'تَقِيسُ الأُمُّ الكُتْلَةَ بِالسَّاعَةِ وَتَقِيسُ الوَقْتَ بِالمِيزَانِ', diagnosticFeedback: 'المِيزَانُ لِلْكُتْلَةِ وَالسَّاعَةُ لِلْوَقْتِ (الزَّمَنِ).' },
				{ text: 'تَتَجَمَّدُ الزُّبْدَةُ عِنْدَمَا نُسَخِّنُهَا فَوْقَ النَّارِ', diagnosticFeedback: 'التَّسْخِينُ يُسَبِّبُ الاِنْصِهَارَ وَلَيْسَ التَّجَمُّدَ.' },
				{ text: 'الهَوَاءُ فِي المَطْبَخِ مَادَّةٌ صَلْبَةٌ', diagnosticFeedback: 'الهَوَاءُ مَادَّةٌ غَازِيَّةٌ.' }
			],
			rng
		);

		const qText = `سَاعَدَ ${kid} أُمَّهُ فِي تَحْضِيرِ كَعْكَةٍ، فَاسْتَعْمَلَا المِيزَانَ وَالسَّاعَةَ وَأَذَابَا الزُّبْدَةَ الصَّلْبَةَ بِالحَرَارَةِ. أَيُّ جُمْلَةٍ صَحِيحَةٌ؟`;

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: imageUrl,
				caption: 'تَحْضِيرُ الكَعْكَةِ فِي المَطْبَخِ'
			},
			{
				type: 'text',
				content: '1) سَمِّ الأَدَاةَ المُسْتَعْمَلَةَ لِقِيَاسِ كُتْلَةِ الدَّقِيقِ، وَالأَدَاةَ المُسْتَعْمَلَةَ لِمُرَاقَبَةِ وَقْتِ طَهْيِ الكَعْكَةِ.',
				answer: 'لِقِيَاسِ الكُتْلَةِ: المِيزَانُ. لِمُرَاقَبَةِ الوَقْتِ: السَّاعَةُ.',
				mark: '1'
			},
			{
				type: 'text',
				content: '2) تَحَوَّلَتِ الزُّبْدَةُ الصَّلْبَةُ إِلى سَائِلَةٍ بِالحَرَارَةِ. مَا اسْمُ هَذَا التَّحَوُّلِ؟',
				answer: 'الاِنْصِهَارُ.',
				mark: '0.75'
			},
			{
				type: 'text',
				content: '3) وَضَعَ ${kid} كَأْسَ عَصِيرٍ فِي المُجَمِّدِ لِيَصْنَعَ مُثَلَّجَاتٍ. مَا اسْمُ تَحَوُّلِ العَصِيرِ مِنْ سَائِلٍ إِلى صَلْبٍ؟',
				answer: 'التَّجَمُّدُ.',
				mark: '0.75'
			}
		];
		// Replace ${kid} cleanly inside content[3]
		content[3] = {
			type: 'text',
			content: `3) وَضَعَ ${kid} كَأْسَ عَصِيرٍ فِي المُجَمِّدِ لِيَصْنَعَ مُثَلَّجَاتٍ. مَا اسْمُ تَحَوُّلِ العَصِيرِ مِنْ سَائِلٍ إِلى صَلْبٍ؟`,
			answer: 'التَّجَمُّدُ.',
			mark: '0.75'
		};

		return {
			templateId: 'sci_tpl_2ap_t3_integration_kitchen_lab',
			seed,
			grade: '2ap',
			trimesterId: 't3',
			difficulty,
			domain: 'integration',
			titleAr: 'وَضْعِيَّةٌ إِدْمَاجِيَّةٌ: تَجَارِبُ وَأَدَوَاتٌ فِي مَطْبَخِ العَائِلَةِ',
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'أَدَوَاتُ القِيَاسِ وَتَحَوُّلُ المَادَّةِ فِي المَطْبَخِ',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'المِيزَانُ لِقِيَاسِ الكُتَلِ، وَالسَّاعَةُ لِقِيَاسِ الزَّمَنِ، وَتَنْصَهِرُ الزُّبْدَةُ بِالحَرَارَةِ بَيْنَمَا يَتَجَمَّدُ العَصِيرُ بِالبُرُودَةِ.'
			},
			sujetExercise: {
				points: 2.5,
				customTitle: 'الوَضْعِيَّةُ الإِدْمَاجِيَّةُ',
				instruction: `سَاعَدَ ${kid} أُمَّهُ فِي المَطْبَخِ. أَجِبْ عَنِ الأَسْئِلَةِ التَّالِيَةِ:`,
				content
			},
			hints: [
				'المِيزَانُ يَقِيسُ الكُتْلَةَ وَالسَّاعَةُ تَقِيسُ الوَقْتَ.',
				'مِنْ صَلْبٍ إِلى سَائِلٍ بِالحَرَارَةِ = اِنْصِهَارٌ.',
				'مِنْ سَائِلٍ إِلى صَلْبٍ بِالبُرُودَةِ = تَجَمُّدٌ.'
			],
			solutionStepsAr: [
				'الأَدَاتَانِ: المِيزَانُ وَالسَّاعَةُ.',
				'تَحَوُّلُ الزُّبْدَةِ بِالحَرَارَةِ: الاِنْصِهَارُ.',
				'تَحَوُّلُ العَصِيرِ فِي المُجَمِّدِ: التَّجَمُّدُ.'
			],
			finalAnswer: 'الميزان والساعة — الانصهار — التجمد'
		};
	}
};

export const SCIENCES_TEMPLATES_2AP_T3: SciencesParameterizedTemplate[] = [
	meltingFreezingTemplate,
	airPropertiesTemplate,
	balanceComparisonTemplate,
	clockCalendarReadTemplate,
	integrationKitchenLabTemplate
];
