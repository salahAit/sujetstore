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
	const d = difficulty === 'easy' ? 13 : difficulty === 'medium' ? 29 : 47;
	return new SeededRng((((Math.trunc(seed) >>> 0) * 1009 + d * 89 + salt) >>> 0) || 1);
}

const KIDS = ['أَمِينُ', 'سَارَةُ', 'آدَمُ', 'مَرْيَمُ', 'رَائِدُ', 'إِيمَانُ', 'وَسِيمُ', 'لِينَا'] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Inhale & Exhale Chest Volume
// ═══════════════════════════════════════════════════════════════════════════════
const inhaleExhaleTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2ap_t1_inhale_exhale',
	grade: '2ap',
	trimesterId: 't1',
	domain: 'human_body',
	titleAr: 'مَظَاهِرُ التَّنَفُّسِ: الشَّهِيقُ وَالزَّفِيرُ',
	curriculumLessonId: 'sci_lesson_2ap_t1_breathing_movements',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 401);
		const kid = rng.pick(KIDS);
		const baseCm = rng.int(58, 63);
		const diffCm = rng.int(3, 5);
		const inhaleCm = baseCm + diffCm;
		const askInhale = seed % 2 === 0;

		const svg = wrapSciencesSvg(
			420,
			195,
			`<rect x="6" y="6" width="408" height="183" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="210" y="27" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">قِيَاسُ مُحِيطِ صَدْرِ ${esc(kid)} أَثْنَاءَ التَّنَفُّسِ</text>` +
				`<rect x="224" y="48" width="174" height="122" rx="10" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.8"/>` +
				`<text x="311" y="72" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0369a1">الحَالَةُ (أ)</text>` +
				`<ellipse cx="311" cy="106" rx="34" ry="20" fill="#7dd3fc" stroke="#0284c7" stroke-width="2"/>` +
				`<text x="311" y="110" text-anchor="middle" font-size="11" font-weight="bold" fill="#0c4a6e">${inhaleCm} سـم</text>` +
				`<text x="311" y="152" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#0369a1">ارْتِفَاعُ القَفَصِ الصَّدْرِيِّ</text>` +
				`<rect x="22" y="48" width="174" height="122" rx="10" fill="#fef2f2" stroke="#dc2626" stroke-width="1.8"/>` +
				`<text x="109" y="72" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#991b1b">الحَالَةُ (ب)</text>` +
				`<ellipse cx="109" cy="106" rx="24" ry="15" fill="#fca5a5" stroke="#dc2626" stroke-width="2"/>` +
				`<text x="109" y="110" text-anchor="middle" font-size="11" font-weight="bold" fill="#7f1d1d">${baseCm} سـم</text>` +
				`<text x="109" y="152" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#991b1b">انْخِفَاضُ القَفَصِ الصَّدْرِيِّ</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_2ap_t1_inhale_exhale_${difficulty}_s${seed}`, svg);

		const correctText = askInhale
			? 'حَرَكَةُ الشَّهِيقِ (دُخُولُ الهَوَاءِ إِلى الرِّئَتَيْنِ)'
			: 'حَرَكَةُ الزَّفِيرِ (خُرُوجُ الهَوَاءِ مِنَ الرِّئَتَيْنِ)';

		const mcq = buildUniqueMcqOptions(
			correctText,
			[
				{
					text: askInhale
						? 'حَرَكَةُ الزَّفِيرِ (خُرُوجُ الهَوَاءِ مِنَ الرِّئَتَيْنِ)'
						: 'حَرَكَةُ الشَّهِيقِ (دُخُولُ الهَوَاءِ إِلى الرِّئَتَيْنِ)',
					diagnosticFeedback: askInhale
						? 'عِنْدَ زِيَادَةِ مُحِيطِ الصَّدْرِ يَدْخُلُ الهَوَاءُ، وَهَذَا هُوَ الشَّهِيقُ وَلَيْسَ الزَّفِيرَ.'
						: 'عِنْدَ نُقْصَانِ مُحِيطِ الصَّدْرِ يَخْرُجُ الهَوَاءُ، وَهَذَا هُوَ الزَّفِيرُ وَلَيْسَ الشَّهِيقَ.'
				},
				{ text: 'حَرَكَةُ النَّبْضِ القَلْبِيِّ فَقَطْ', diagnosticFeedback: 'تَغَيُّرُ حَجْمِ القَفَصِ الصَّدْرِيِّ بِعِدَّةِ سَنْتِمِتْرَاتٍ نَاتِجٌ عَنِ التَّنَفُّسِ.' },
				{ text: 'تَوَقُّفُ التَّنَفُّسِ تَمَامًا', diagnosticFeedback: 'ارْتِفَاعُ وَانْخِفَاضُ الصَّدْرِ دَلِيلٌ عَلَى اسْتِمْرَارِ التَّنَفُّسِ.' }
			],
			rng
		);

		const qText = askInhale
			? `قَاسَ ${kid} مُحِيطَ صَدْرِهِ فَكَانَ فِي الحَالَةِ (أ) ${inhaleCm} سـم مَعَ ارْتِفَاعِ الصَّدْرِ. مَا اسْمُ هَذِهِ الحَرَكَةِ التَّنَفُّسِيَّةِ؟`
			: `قَاسَ ${kid} مُحِيطَ صَدْرِهِ فَكَانَ فِي الحَالَةِ (ب) ${baseCm} سـم مَعَ انْخِفَاضِ الصَّدْرِ. مَا اسْمُ هَذِهِ الحَرَكَةِ التَّنَفُّسِيَّةِ؟`;

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) سَمِّ الحَرَكَةَ التَّنَفُّسِيَّةَ فِي الحَالَةِ (أ) وَالحَالَةِ (ب).\n- الحَالَةُ (أ): ....................\n- الحَالَةُ (ب): ....................`,
						answer: 'الحَالَةُ (أ): الشَّهِيقُ (دُخُولُ الهَوَاءِ). الحَالَةُ (ب): الزَّفِيرُ (خُرُوجُ الهَوَاءِ).',
						mark: '1.5'
					},
					{
						type: 'image',
						src: imageUrl,
						caption: `مُحِيطُ صَدْرِ ${kid} أَثْنَاءَ التَّنَفُّسِ`
					}
				]
			},
			{
				type: 'text',
				content: `2) اُذْكُرْ قَاعِدَتَيْنِ لِلْحِفَاظِ عَلَى صِحَّةِ التَّنَفُّسِ.`,
				answer: '1) تَهْوِئَةُ الغُرْفَةِ وَالقِسْمِ وَاسْتِنْشَاقُ الهَوَاءِ النَّقِيِّ. 2) الاِبْتِعَادُ عَنِ الدُّخَانِ وَالغُبَارِ وَمُمَارَسَةُ الرِّيَاضَةِ.',
				mark: '1'
			}
		];

		return {
			templateId: 'sci_tpl_2ap_t1_inhale_exhale',
			seed,
			grade: '2ap',
			trimesterId: 't1',
			difficulty,
			domain: 'human_body',
			titleAr: 'مَظَاهِرُ التَّنَفُّسِ: الشَّهِيقُ وَالزَّفِيرُ',
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'مُقَارَنَةُ حَجْمِ الصَّدْرِ فِي الشَّهِيقِ وَالزَّفِيرِ',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `فِي الشَّهِيقِ يَدْخُلُ الهَوَاءُ فَيَزْدَادُ مُحِيطُ الصَّدْرِ (${inhaleCm} سـم)، وَفِي الزَّفِيرِ يَخْرُجُ الهَوَاءُ فَيَنْقُصُ (${baseCm} سـم).`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'لَاحِظْ قِيَاسَاتِ مُحِيطِ الصَّدْرِ فِي الرَّسْمِ ثُمَّ أَجِبْ:',
				content
			},
			hints: [
				'قَارِنْ بَيْنَ الرَّقْمَيْنِ: أَيُّهُمَا أَكْبَرُ (ارْتِفَاعُ الصَّدْرِ) وَأَيُّهُمَا أَصْغَرُ (انْخِفَاضُ الصَّدْرِ)؟',
				'الشَّهِيقُ = دُخُولُ الهَوَاءِ (حَجْمٌ أَكْبَرُ)، وَالزَّفِيرُ = خُرُوجُ الهَوَاءِ (حَجْمٌ أَصْغَرُ).',
				`الجَوَابُ: ${correctText}.`
			],
			solutionStepsAr: [
				`مُحِيطُ الصَّدْرِ فِي (أ) هُوَ ${inhaleCm} سـم (أَكْبَرُ ← شَهِيقٌ).`,
				`مُحِيطُ الصَّدْرِ فِي (ب) هُوَ ${baseCm} سـم (أَصْغَرُ ← زَفِيرٌ).`,
				`الجَوَابُ المَطْلُوبُ: ${correctText}.`
			],
			finalAnswer: askInhale ? 'الشَّهِيقُ' : 'الزَّفِيرُ'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Pulse & Muscular Effort
// ═══════════════════════════════════════════════════════════════════════════════
const pulseEffortTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2ap_t1_pulse_effort',
	grade: '2ap',
	trimesterId: 't1',
	domain: 'human_body',
	titleAr: 'نَبْضُ القَلْبِ قَبْلَ الجُهْدِ العَضَلِيِّ وَبَعْدَهُ',
	curriculumLessonId: 'sci_lesson_2ap_t1_pulse_and_exercise',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 402);
		const kid = rng.pick(KIDS);
		const restPulse = rng.int(72, 80);
		const walkPulse = restPulse + rng.int(16, 22);
		const runPulse = walkPulse + rng.int(26, 36);

		const svg = wrapSciencesSvg(
			420,
			195,
			`<rect x="6" y="6" width="408" height="183" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="210" y="27" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">عَدَدُ نَبَضَاتِ قَلْبِ ${esc(kid)} فِي دَقِيقَةٍ وَاحِدَةٍ</text>` +
				`<line x1="44" y1="154" x2="376" y2="154" stroke="#334155" stroke-width="1.8"/>` +
				`<rect x="280" y="98" width="68" height="56" rx="6" fill="#60a5fa" stroke="#1d4ed8" stroke-width="1.6"/>` +
				haloText(`x="314" y="90" text-anchor="middle" font-size="11" font-weight="bold"`, '#1e3a8a', `${restPulse}`) +
				`<text x="314" y="172" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#0f172a">الرَّاحَةُ</text>` +
				`<rect x="176" y="80" width="68" height="74" rx="6" fill="#fbbf24" stroke="#b45309" stroke-width="1.6"/>` +
				haloText(`x="210" y="72" text-anchor="middle" font-size="11" font-weight="bold"`, '#92400e', `${walkPulse}`) +
				`<text x="210" y="172" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#0f172a">المَشْيُ</text>` +
				`<rect x="72" y="52" width="68" height="102" rx="6" fill="#f87171" stroke="#b91c1c" stroke-width="1.6"/>` +
				haloText(`x="106" y="44" text-anchor="middle" font-size="11" font-weight="bold"`, '#991b1b', `${runPulse}`) +
				`<text x="106" y="172" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#0f172a">الجَرْيُ</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_2ap_t1_pulse_effort_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'كُلَّمَا زَادَ الجُهْدُ العَضَلِيُّ زَادَ عَدَدُ نَبَضَاتِ القَلْبِ وَسُرْعَةُ التَّنَفُّسِ',
			[
				{ text: 'يَنْقُصُ عَدَدُ نَبَضَاتِ القَلْبِ عِنْدَ الجَرْيِ', diagnosticFeedback: `لَاحِظْ أَنَّ النَّبْضَ ارْتَفَعَ مِنْ ${restPulse} إِلى ${runPulse} عِنْدَ الجَرْيِ!` },
				{ text: 'يَبْقَى عَدَدُ نَبَضَاتِ القَلْبِ ثَابِتًا لَا يَتَغَيَّرُ', diagnosticFeedback: `قَارِنِ الأَعْدَادَ: ${restPulse} ثُمَّ ${walkPulse} ثُمَّ ${runPulse}، فَهِيَ تَتَزَايَدُ.` },
				{ text: 'يَتَوَقَّفُ القَلْبُ أَثْنَاءَ الرَّاحَةِ', diagnosticFeedback: `فِي الرَّاحَةِ يَنْبُضُ القَلْبُ بِهُدُوءٍ (${restPulse} نَبْضَةً) وَلَا يَتَوَقَّفُ أَبَدًا.` }
			],
			rng
		);

		const qText = `قَاسَ ${kid} نَبْضَ قَلْبِهِ فِي دَقِيقَةٍ: فِي الرَّاحَةِ (${restPulse})، عِنْدَ المَشْيِ (${walkPulse})، وَبَعْدَ الجَرْيِ (${runPulse}). مَاذَا نَسْتَنْتِجُ؟`;

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) فِي أَيِّ حَالَةٍ كَانَ عَدَدُ نَبَضَاتِ قَلْبِ ${kid} أَكْبَرَ؟ وَكَمْ بَلَغَ؟`,
						answer: `فِي حَالَةِ الجَرْيِ، وَبَلَغَ ${runPulse} نَبْضَةً فِي الدَّقِيقَةِ.`,
						mark: '1'
					},
					{
						type: 'image',
						src: imageUrl,
						caption: `مُخَطَّطُ نَبْضِ قَلْبِ ${kid}`
					}
				]
			},
			{
				type: 'text',
				content: '2) أَيْنَ نَتَحَسَّسُ نَبْضَ القَلْبِ فِي جِسْمِنَا؟ (اذْكُرْ مَكَانَيْنِ)',
				answer: 'فِي الجِهَةِ اليُسْرَى مِنَ الصَّدْرِ، وَفِي المِعْصَمِ (أَوْ جَانِبِ الرَّقَبَةِ).',
				mark: '0.75'
			},
			{
				type: 'text',
				content: '3) مَاذَا يَحْدُثُ لِلنَّبْضِ عِنْدَمَا نَجْلِسُ لِنَسْتَرِيحَ بَعْدَ الجَرْيِ؟',
				answer: 'يَهْدَأُ النَّبْضُ تَدْرِيجِيًّا وَيَعُودُ إِلى حَالَتِهِ العَادِيَّةِ.',
				mark: '0.75'
			}
		];

		return {
			templateId: 'sci_tpl_2ap_t1_pulse_effort',
			seed,
			grade: '2ap',
			trimesterId: 't1',
			difficulty,
			domain: 'human_body',
			titleAr: 'نَبْضُ القَلْبِ قَبْلَ الجُهْدِ العَضَلِيِّ وَبَعْدَهُ',
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: `تَغَيُّرُ نَبْضِ ${kid} مَعَ الجُهْدِ`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `ارتفع النبض من ${restPulse} في الراحة إلى ${walkPulse} في المشي ثم ${runPulse} بعد الجري، مما يثبت أن الجهد العضلي يزيد سرعة النبض والتنفس.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'اِقْرَأِ المُخَطَّطَ التَّالِيَ جَيِّدًا ثُمَّ أَجِبْ:',
				content
			},
			hints: [
				`قَارِنْ بَيْنَ ${restPulse} وَ ${walkPulse} وَ ${runPulse}.`,
				'الجَرْيُ جُهْدٌ عَضَلِيٌّ أَقْوَى مِنَ المَشْيِ وَالرَّاحَةِ.',
				'كُلَّمَا زَادَ الجُهْدُ العَضَلِيُّ تَسَارَعَ النَّبْضُ وَالتَّنَفُّسُ.'
			],
			solutionStepsAr: [
				`فِي الرَّاحَةِ: ${restPulse} نَبْضَةً.`,
				`فِي المَشْيِ: ${walkPulse} نَبْضَةً، وَبَعْدَ الجَرْيِ: ${runPulse} نَبْضَةً.`,
				'نَسْتَنْتِجُ أَنَّ الجُهْدَ العَضَلِيَّ يَزِيدُ مِنْ عَدَدِ نَبَضَاتِ القَلْبِ وَسُرْعَةِ التَّنَفُّسِ.'
			],
			finalAnswer: 'يزداد عدد نبضات القلب مع الجهد العضلي'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Balanced Meal Choice
// ═══════════════════════════════════════════════════════════════════════════════
const healthyMealChoiceTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2ap_t1_healthy_meal_choice',
	grade: '2ap',
	trimesterId: 't1',
	domain: 'nutrition_digestion',
	titleAr: 'الغِذَاءُ الصِّحِّيُّ وَتَكْوِينُ وَجْبَةٍ مُتَوَازِنَةٍ',
	curriculumLessonId: 'sci_lesson_2ap_t1_balanced_nutrition',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 403);
		const balancedMeals = [
			'حَسَاءُ خُضَرٍ + دَجَاجٌ مَشْوِيٌّ + خُبْزٌ + تُفَّاحَةٌ + مَاءٌ',
			'سَلَطَةُ خُضَرٍ + سَمَكٌ + أَرُزٌّ + بُرْتُقَالَةٌ + مَاءٌ',
			'عَدَسٌ + بَيْضَةٌ + خُبْزٌ + مَوْزَةٌ + مَاءٌ نَقِيٌّ'
		] as const;
		const badMeals = [
			'بَطَاطَا مَقْلِيَّةٌ + مَشْرُوبٌ غَازِيٌّ + حَلْوَى',
			'شُوكُولَاطَةٌ + كَعْكٌ مُحَلًّى + عَصِيرٌ صِنَاعِيٌّ',
			'رَقَائِقُ مَالِحَةٌ + مُثَلَّجَاتٌ فَقَطْ',
			'عُلْبَةُ يَاغُورْتٍ مُنْتَهِيَةُ الصَّلَاحِيَةِ + حَلْوَى'
		] as const;

		const good = rng.pick(balancedMeals);
		const bads = rng.pickDistinct(badMeals, 3);
		const mcq = buildUniqueMcqOptions(
			good,
			bads.map((b) => ({
				text: b,
				diagnosticFeedback: 'هَذِهِ وَجْبَةٌ غَيْرُ صِحِّيَّةٍ أَوْ غَيْرُ مُتَوَازِنَةٍ (غَنِيَّةٌ بِالسُّكَّرِ أَوِ الدُّهُونِ أَوْ فَاسِدَةٌ).'
			})),
			rng
		);

		const svg = svgPlantAndPrimaryDiagram('balanced_diet', {
			title: 'مُكَوِّنَاتُ الوَجْبَةِ الصِّحِّيَّةِ المُتَوَازِنَةِ'
		});
		const imageUrl = saveSciencesSvgAsset(`sci_2ap_t1_healthy_meal_choice_${difficulty}_s${seed}`, svg);

		const qText = 'أَيُّ وَجْبَةٍ مِنَ الوَجَبَاتِ التَّالِيَةِ هِيَ **وَجْبَةٌ صِحِّيَّةٌ وَمُتَوَازِنَةٌ** لِتِلْمِيذِ السَّنَةِ الثَّانِيَةِ؟';

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) ${qText}\nالوَجْبَةُ الصِّحِّيَّةُ هِيَ: ........................................`,
						answer: good,
						mark: '1'
					},
					{
						type: 'image',
						src: imageUrl,
						caption: 'المَجْمُوعَاتُ الغِذَائِيَّةُ الصِّحِّيَّةُ'
					}
				]
			},
			{
				type: 'true_false',
				items: [
					{ q: 'أَتَأَكَّدُ مِنْ تَارِيخِ صَلَاحِيَةِ الأَغْذِيَةِ المُعَلَّبَةِ قَبْلَ تَنَاوُلِهَا.', a: 'صَحِيحٌ', mark: '0.75' },
					{ q: 'يَكْفِي تَنَاوُلُ الحَلَوِيَّاتِ فَقَطْ لِيَنْمُوَ جِسْمِي بِصِحَّةٍ جَيِّدَةٍ.', a: 'خَطَأٌ', c: 'يَحْتَاجُ الجِسْمُ إِلى أَغْذِيَةٍ مُتَنَوِّعَةٍ وَمُتَوَازِنَةٍ.', mark: '0.75' }
				]
			}
		];

		return {
			templateId: 'sci_tpl_2ap_t1_healthy_meal_choice',
			seed,
			grade: '2ap',
			trimesterId: 't1',
			difficulty,
			domain: 'nutrition_digestion',
			titleAr: 'الغِذَاءُ الصِّحِّيُّ وَتَكْوِينُ وَجْبَةٍ مُتَوَازِنَةٍ',
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'مُكَوِّنَاتُ الغِذَاءِ المُتَوَازِنِ',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الوَجْبَةُ المُتَوَازِنَةُ (${good}) تَجْمَعُ أَغْذِيَةَ البِنَاءِ وَالطَّاقَةِ وَالوِقَايَةِ وَالمَاءَ النَّقِيَّ.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'اِخْتَرِ الوَجْبَةَ الصِّحِّيَّةَ ثُمَّ أَجِبْ بِصَحِيحٍ أَوْ خَطَأٍ:',
				content
			},
			hints: [
				'الوَجْبَةُ المُتَوَازِنَةُ فِيهَا خُضَرٌ وَفَوَاكِهُ وَبُرُوتِينَاتٌ وَخُبْزٌ أَوْ حُبُوبٌ وَمَاءٌ.',
				'تَجَنَّبِ المَشْرُوبَاتِ الغَازِيَّةَ وَالمَقْلِيَّاتِ وَالأَغْذِيَةَ مُنْتَهِيَةَ الصَّلَاحِيَةِ.',
				`الوَجْبَةُ الصَّحِيحَةُ هِيَ: ${good}.`
			],
			solutionStepsAr: [
				'نَبْحَثُ عَنِ الوَجْبَةِ الَّتِي تَحْتَوِي عَلَى خُضَرٍ وَفَوَاكِهَ وَلُحُومٍ أَوْ بُقُولٍ وَمَاءٍ.',
				`الوَجْبَةُ الصِّحِّيَّةُ: ${good}.`
			],
			finalAnswer: good
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Dental Hygiene & Body Care Rules
// ═══════════════════════════════════════════════════════════════════════════════
const dentalHygieneRulesTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2ap_t1_dental_hygiene_rules',
	grade: '2ap',
	trimesterId: 't1',
	domain: 'human_body',
	titleAr: 'الحِفَاظُ عَلَى صِحَّةِ الأَسْنَانِ وَالجِسْمِ',
	curriculumLessonId: 'sci_lesson_2ap_t1_teeth_body_care',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 404);
		const kid = rng.pick(KIDS);
		const pool = [
			{ text: `يُنَظِّفُ ${kid} أَسْنَانَهُ بِالفُرْشَاةِ وَالمَعْجُونِ بَعْدَ كُلِّ وَجْبَةٍ وَقَبْلَ النَّوْمِ.`, ok: true },
			{ text: `يُقَلِّمُ ${kid} أَظَافِرَهُ بِانْتِظَامٍ وَيَسْتَحِمُّ لِلْحِفَاظِ عَلَى نَظَافَةِ جِسْمِهِ.`, ok: true },
			{ text: `يَكْسِرُ ${kid} حَبَّاتِ الجَوْزِ الصَّلْبَةِ بِأَسْنَانِهِ وَيُكْثِرُ مِنَ الحَلَوِيَّاتِ قَبْلَ النَّوْمِ.`, ok: false },
			{ text: `يَسْتَعْمِلُ ${kid} فُرْشَاةَ أَسْنَانِ صَدِيقِهِ وَلَا يَزُورُ طَبِيبَ الأَسْنَانِ أَبَدًا.`, ok: false }
		] as const;

		const chosen = rng.pick(pool);
		const svg = wrapSciencesSvg(
			420,
			190,
			`<rect x="6" y="6" width="408" height="178" rx="12" fill="${chosen.ok ? '#f0fdf4' : '#fef2f2'}" stroke="${chosen.ok ? '#16a34a' : '#dc2626'}" stroke-width="1.8"/>` +
				`<text x="210" y="30" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">قَوَاعِدُ صِحَّةِ الأَسْنَانِ وَالجِسْمِ</text>` +
				`<rect x="24" y="50" width="372" height="72" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="210" y="90" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${esc(chosen.text)}</text>` +
				`<text x="210" y="156" text-anchor="middle" font-size="11.5" font-weight="bold" fill="${chosen.ok ? '#166534' : '#991b1b'}">هَلْ هَذَا سُلُوكٌ صِحِّيٌّ سَلِيمٌ؟</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_2ap_t1_dental_hygiene_rules_${difficulty}_s${seed}`, svg);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: imageUrl,
				caption: 'سُلُوكٌ صِحِّيٌّ أَمْ خَاطِئٌ؟'
			},
			{
				type: 'true_false',
				items: [
					{ q: chosen.text, a: chosen.ok ? 'صَحِيحٌ' : 'خَطَأٌ', mark: '1' },
					{ q: 'الإِكْثَارُ مِنَ السُّكَّرِيَّاتِ وَإِهْمَالُ التَّنْظِيفِ يُسَبِّبَانِ تَسَوُّسَ الأَسْنَانِ.', a: 'صَحِيحٌ', mark: '0.75' },
					{ q: 'لِكُلِّ فَرْدٍ فُرْشَاةُ أَسْنَانٍ خَاصَّةٌ بِهِ لَا يُشَارِكُهَا مَعَ غَيْرِهِ.', a: 'صَحِيحٌ', mark: '0.75' }
				]
			}
		];

		return {
			templateId: 'sci_tpl_2ap_t1_dental_hygiene_rules',
			seed,
			grade: '2ap',
			trimesterId: 't1',
			difficulty,
			domain: 'human_body',
			titleAr: 'الحِفَاظُ عَلَى صِحَّةِ الأَسْنَانِ وَالجِسْمِ',
			onecRole: 'recall',
			quizQuestion: {
				type: 'true_false',
				questionText: `هَلْ هَذَا السُّلُوكُ صِحِّيٌّ وَيَحْمِي الأَسْنَانَ وَالجِسْمَ؟\n${chosen.text}`,
				questionTextAr: chosen.text,
				imageUrl,
				imageCaption: 'صِحَّةُ الأَسْنَانِ وَالجِسْمِ',
				questionData: {
					correctAnswer: chosen.ok
				},
				explanation: chosen.ok
					? 'صَحِيحٌ! التَّنْظِيفُ المُنْتَظَمُ وَالنَّظَافَةُ الشَّخْصِيَّةُ يَحْمِيَانِ الأَسْنَانَ وَالجِسْمَ مِنَ الأَمْرَاضِ.'
					: 'خَطَأٌ! كَسْرُ الأَشْيَاءِ الصَّلْبَةِ وَاسْتِعْمَالُ فُرْشَاةِ الغَيْرِ وَكَثْرَةُ السُّكَّرِيَّاتِ تَضُرُّ بِالأَسْنَانِ.'
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'أَجِبْ بِـ (صَحِيحٌ) أَوْ (خَطَأٌ) عَنِ السُّلُوكَاتِ التَّالِيَةِ:',
				content
			},
			hints: [
				'اقْرَأِ السُّلُوكَ وَتَحَقَّقْ هَلْ يَحْمِي الأَسْنَانَ وَالجِسْمَ أَمْ يُؤْذِيهِمَا.',
				'فُرْشَاةُ الأَسْنَانِ شَخْصِيَّةٌ، وَلَا نَكْسِرُ الأَشْيَاءَ الصَّلْبَةَ بِأَسْنَانِنَا.',
				`الإِجَابَةُ هِيَ: ${chosen.ok ? 'صَحِيحٌ' : 'خَطَأٌ'}.`
			],
			solutionStepsAr: [
				`نُحَلِّلُ السُّلُوكَ: ${chosen.text}`,
				`الحُكْمُ: ${chosen.ok ? 'صَحِيحٌ (سُلُوكٌ صِحِّيٌّ)' : 'خَطَأٌ (سُلُوكٌ مُضِرٌّ)'}.`
			],
			finalAnswer: chosen.ok ? 'صَحِيحٌ' : 'خَطَأٌ'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Integration: The Young Athlete
// ═══════════════════════════════════════════════════════════════════════════════
const integrationYoungAthleteTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2ap_t1_integration_young_athlete',
	grade: '2ap',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'وَضْعِيَّةٌ إِدْمَاجِيَّةٌ: الرِّيَاضِيُّ الصَّغِيرُ',
	curriculumLessonId: 'sci_lesson_2ap_t1_pulse_and_exercise',
	defaultPoints: 2.5,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 405);
		const kid = rng.pick(KIDS);

		const svg = wrapSciencesSvg(
			440,
			195,
			`<rect x="6" y="6" width="428" height="183" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="220" y="27" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">بِطَاقَةُ الرِّيَاضِيِّ الصَّغِيرِ (${esc(kid)})</text>` +
				`<rect x="300" y="48" width="120" height="118" rx="9" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.6"/>` +
				`<text x="360" y="76" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#0369a1">التَّنَفُّسُ</text>` +
				`<text x="360" y="106" text-anchor="middle" font-size="10" fill="#334155">شَهِيقٌ وَزَفِيرٌ</text>` +
				`<text x="360" y="128" text-anchor="middle" font-size="10" fill="#0369a1">فِي هَوَاءٍ نَقِيٍّ</text>` +
				`<rect x="160" y="48" width="120" height="118" rx="9" fill="#fef2f2" stroke="#dc2626" stroke-width="1.6"/>` +
				`<text x="220" y="76" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#991b1b">نَبْضُ القَلْبِ</text>` +
				`<text x="220" y="106" text-anchor="middle" font-size="10" fill="#334155">يَتَسَارَعُ عِنْدَ الجَرْيِ</text>` +
				`<text x="220" y="128" text-anchor="middle" font-size="10" fill="#dc2626">وَيَهْدَأُ فِي الرَّاحَةِ</text>` +
				`<rect x="20" y="48" width="120" height="118" rx="9" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.6"/>` +
				`<text x="80" y="76" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#166534">الغِذَاءُ وَالنَّظَافَةُ</text>` +
				`<text x="80" y="106" text-anchor="middle" font-size="10" fill="#334155">وَجْبَةٌ مُتَوَازِنَةٌ</text>` +
				`<text x="80" y="128" text-anchor="middle" font-size="10" fill="#15803d">تَنْظِيفُ الأَسْنَانِ</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_2ap_t1_integration_young_athlete_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'يَزْدَادُ تَنَفُّسُهُ وَنَبْضُ قَلْبِهِ، وَبَعْدَ الرَّاحَةِ يَتَنَاوَلُ غِذَاءً مُتَوَازِنًا وَيُنَظِّفُ أَسْنَانَهُ',
			[
				{ text: 'يَتَوَقَّفُ نَبْضُ قَلْبِهِ عِنْدَ الجَرْيِ وَيَأْكُلُ الحَلَوِيَّاتِ فَقَطْ', diagnosticFeedback: 'النَّبْضُ يَتَسَارَعُ عِنْدَ الجَرْيِ وَالرِّيَاضِيُّ يَأْكُلُ غِذَاءً صِحِّيًّا.' },
				{ text: 'يَنْخَفِضُ صَدْرُهُ عِنْدَ الشَّهِيقِ وَيَرْتَفِعُ عِنْدَ الزَّفِيرِ', diagnosticFeedback: 'العَكْسُ صَحِيحٌ: يَرْتَفِعُ الصَّدْرُ فِي الشَّهِيقِ وَيَنْخَفِضُ فِي الزَّفِيرِ.' },
				{ text: 'يَتَدَرَّبُ فِي غُرْفَةٍ مُغْلَقَةٍ مَلِيئَةٍ بِالدُّخَانِ', diagnosticFeedback: 'يَجِبُ مُمَارَسَةُ الرِّيَاضَةِ فِي الهَوَاءِ النَّقِيِّ.' }
			],
			rng
		);

		const qText = `شَارَكَ ${kid} فِي سِبَاقِ الجَرْيِ المَدْرَسِيِّ فِي الهَوَاءِ الطَّلْقِ. أَيُّ جُمْلَةٍ تَصِفُ حَالَةَ جِسْمِهِ وَسُلُوكَهُ الصِّحِّيَّ بِدِقَّةٍ؟`;

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: imageUrl,
				caption: `بِطَاقَةُ صِحَّةِ ${kid} أَثْنَاءَ السِّبَاقِ`
			},
			{
				type: 'text',
				content: `1) بَعْدَ الجَرْيِ، لاحَظَ ${kid} تَسَارُعَ تَنَفُّسِهِ وَدَقَّاتِ قَلْبِهِ. سَمِّ حَرَكَةَ دُخُولِ الهَوَاءِ وَحَرَكَةَ خُرُوجِهِ.`,
				answer: 'دُخُولُ الهَوَاءِ: الشَّهِيقُ. خُرُوجُ الهَوَاءِ: الزَّفِيرُ.',
				mark: '0.75'
			},
			{
				type: 'text',
				content: `2) اِقْتَرِحْ عَلَى ${kid} وَجْبَةَ غَدَاءٍ صِحِّيَّةً وَمُتَوَازِنَةً لِاسْتِعَادَةِ نَشَاطِهِ.`,
				answer: 'حَسَاءُ خُضَرٍ + دَجَاجٌ أَوْ سَمَكٌ + خُبْزٌ + فَاكِهَةٌ مَغْسُولَةٌ + مَاءٌ نَقِيٌّ.',
				mark: '1'
			},
			{
				type: 'text',
				content: `3) مَاذَا يَجِبُ أَنْ يَفْعَلَ ${kid} بَعْدَ الوَجْبَةِ لِلْحِفَاظِ عَلَى صِحَّةِ أَسْنَانِهِ وَجِسْمِهِ؟`,
				answer: 'يُنَظِّفُ أَسْنَانَهُ بِالفُرْشَاةِ وَالمَعْجُونِ، وَيَسْتَحِمُّ وَيَنَامُ بَاكِرًا.',
				mark: '0.75'
			}
		];

		return {
			templateId: 'sci_tpl_2ap_t1_integration_young_athlete',
			seed,
			grade: '2ap',
			trimesterId: 't1',
			difficulty,
			domain: 'integration',
			titleAr: 'وَضْعِيَّةٌ إِدْمَاجِيَّةٌ: الرِّيَاضِيُّ الصَّغِيرُ',
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: `بِطَاقَةُ الرِّيَاضِيِّ الصَّغِيرِ`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'عِنْدَ الرِّيَاضَةِ يَزْدَادُ التَّنَفُّسُ وَنَبْضُ القَلْبِ، وَيُحَافِظُ الرِّيَاضِيُّ عَلَى صِحَّتِهِ بِالغِذَاءِ المُتَوَازِنِ وَالنَّظَافَةِ.'
			},
			sujetExercise: {
				points: 2.5,
				customTitle: 'الوَضْعِيَّةُ الإِدْمَاجِيَّةُ',
				instruction: `شَارَكَ ${kid} فِي سِبَاقِ الجَرْيِ المَدْرَسِيِّ. سَاعِدْهُ بِالإِجَابَةِ عَنِ الأَسْئِلَةِ التَّالِيَةِ:`,
				content
			},
			hints: [
				'الشَّهِيقُ دُخُولُ الهَوَاءِ وَالزَّفِيرُ خُرُوجُهُ.',
				'الوَجْبَةُ المُتَوَازِنَةُ تَشْمَلُ خُضَرًا وَفَوَاكِهَ وَلُحُومًا وَحُبُوبًا وَمَاءً.',
				'تَنْظِيفُ الأَسْنَانِ وَالاِسْتِحْمَامُ وَالنَّوْمُ البَاكِرُ تُحَافِظُ عَلَى الصِّحَّةِ.'
			],
			solutionStepsAr: [
				'الشَّهِيقُ وَالزَّفِيرُ هُمَا الحَرَكَتَانِ التَّنَفُّسِيَّتَانِ.',
				'الوَجْبَةُ الصِّحِّيَّةُ تَضُمُّ خُضَرًا وَلَحْمًا أَوْ سَمَكًا وَخُبْزًا وَفَاكِهَةً وَمَاءً.',
				'نَظَافَةُ الأَسْنَانِ وَالجِسْمِ ضَرُورِيَّةٌ بَعْدَ الأَكْلِ وَاللَّعِبِ.'
			],
			finalAnswer: 'الشهيق والزفير — وجبة متوازنة — تنظيف الأسنان والجسم'
		};
	}
};

export const SCIENCES_TEMPLATES_2AP_T1: SciencesParameterizedTemplate[] = [
	inhaleExhaleTemplate,
	pulseEffortTemplate,
	healthyMealChoiceTemplate,
	dentalHygieneRulesTemplate,
	integrationYoungAthleteTemplate
];
