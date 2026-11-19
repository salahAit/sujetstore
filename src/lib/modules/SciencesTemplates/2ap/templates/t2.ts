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
	const d = difficulty === 'easy' ? 17 : difficulty === 'medium' ? 31 : 53;
	return new SeededRng((((Math.trunc(seed) >>> 0) * 1009 + d * 73 + salt) >>> 0) || 1);
}

const KIDS = ['أَمِينُ', 'سَارَةُ', 'آدَمُ', 'مَرْيَمُ', 'رَائِدُ', 'إِيمَانُ', 'وَسِيمُ', 'لِينَا'] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Water & Mineral Salts Experiment
// ═══════════════════════════════════════════════════════════════════════════════
const waterMineralsExpTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2ap_t2_water_minerals_exp',
	grade: '2ap',
	trimesterId: 't2',
	domain: 'plant_biology',
	titleAr: 'حَاجَةُ النَّبَاتِ الأَخْضَرِ لِلْمَاءِ وَالأَمْلَاحِ المَعْدِنِيَّةِ',
	curriculumLessonId: 'sci_lesson_2ap_t2_plant_water_minerals',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 501);
		const askPath = seed % 2 === 0;
		const svg = svgPlantAndPrimaryDiagram('plant_anatomy', {
			title: 'أَجْزَاءُ النَّبَاتِ وَامْتِصَاصُ المَاءِ وَالأَمْلَاحِ المَعْدِنِيَّةِ'
		});
		const imageUrl = saveSciencesSvgAsset(`sci_2ap_t2_water_minerals_exp_${difficulty}_s${seed}`, svg);

		const correctText = askPath
			? 'التُّرْبَةُ ← الجُذُورُ ← السَّاقُ ← الأَوْرَاقُ'
			: 'يَضْعُفُ نُمُوُّ النَّبَاتِ وَتَصْفَرُّ أَوْرَاقُهُ لِغِيَابِ الأَمْلَاحِ المَعْدِنِيَّةِ';

		const distractors = askPath
			? [
					{ text: 'الأَوْرَاقُ ← السَّاقُ ← الجُذُورُ', diagnosticFeedback: 'المَاءُ يَصْعَدُ مِنَ التُّرْبَةِ عَبْرَ الجُذُورِ نَحْوَ الأَوْرَاقِ وَلَيْسَ العَكْسَ.' },
					{ text: 'الزَّهْرَةُ ← الجُذُورُ ← التُّرْبَةُ', diagnosticFeedback: 'البِدَايَةُ دَائِمًا مِنَ التُّرْبَةِ ثُمَّ الجُذُورِ.' },
					{ text: 'السَّاقُ ← التُّرْبَةُ ← الزَّهْرَةُ', diagnosticFeedback: 'الجُذُورُ هِيَ الَّتِي تَمْتَصُّ المَاءَ وَالأَمْلَاحَ أَوَّلًا.' }
				]
			: [
					{ text: 'يَنْمُو النَّبَاتُ بِشَكْلٍ أَقْوَى وَأَسْرَعَ', diagnosticFeedback: 'المَاءُ المُقَطَّرُ خَالٍ مِنَ الأَمْلَاحِ المَعْدِنِيَّةِ فَلَا يَكْفِي لِنُمُوٍّ قَوِيٍّ.' },
					{ text: 'لَا يَحْتَاجُ النَّبَاتُ إِلى الأَمْلَاحِ المَعْدِنِيَّةِ أَبَدًا', diagnosticFeedback: 'الأَمْلَاحُ المَعْدِنِيَّةُ ضَرُورِيَّةٌ جِدًّا مَعَ المَاءِ لِلنَّبَاتِ.' },
					{ text: 'تَتَحَوَّلُ الجُذُورُ إِلى أَزْهَارٍ', diagnosticFeedback: 'تَبْقَى الجُذُورُ تَحْتَ التُّرْبَةِ وَيَضْعُفُ النَّبَاتُ.' }
				];

		const mcq = buildUniqueMcqOptions(correctText, distractors, rng);
		const qText = askPath
			? 'مَا المَسَارُ الصَّحِيحُ لِلْمَاءِ وَالأَمْلَاحِ المَعْدِنِيَّةِ دَاخِلَ النَّبَاتِ الأَخْضَرِ؟'
			: 'سَقَيْنَا نَبْتَةً خَضْرَاءَ بِمَاءٍ مُقَطَّرٍ (خَالٍ مِنَ الأَمْلَاحِ المَعْدِنِيَّةِ) لِعِدَّةِ أَيَّامٍ. مَاذَا نُلَاحِظُ؟';

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
						caption: 'أَجْزَاءُ النَّبَاتِ الأَخْضَرِ'
					}
				]
			},
			{
				type: 'table',
				headers: ['الجُزْءُ مِنَ النَّبَاتِ', 'دَوْرُهُ الأَسَاسِيُّ'],
				cells: [],
				rows: [
					['الجُذُورُ', { content: '....................', answer: 'اِمْتِصَاصُ المَاءِ وَالأَمْلَاحِ وَتَثْبِيتُ النَّبَاتِ', mark: '0.5' }],
					['السَّاقُ', { content: '....................', answer: 'نَقْلُ المَاءِ وَالأَمْلَاحِ وَحَمْلُ الأَوْرَاقِ', mark: '0.5' }],
					['الأَوْرَاقُ', { content: '....................', answer: 'صُنْعُ غِذَاءِ النَّبَاتِ فِي الضَّوْءِ', mark: '0.5' }]
				]
			}
		];

		return {
			templateId: 'sci_tpl_2ap_t2_water_minerals_exp',
			seed,
			grade: '2ap',
			trimesterId: 't2',
			difficulty,
			domain: 'plant_biology',
			titleAr: 'حَاجَةُ النَّبَاتِ الأَخْضَرِ لِلْمَاءِ وَالأَمْلَاحِ المَعْدِنِيَّةِ',
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'النَّبَاتُ الأَخْضَرُ وَتَغْذِيَتُهُ المَعْدِنِيَّةُ',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'يَمْتَصُّ النَّبَاتُ الأَخْضَرُ المَاءَ وَالأَمْلَاحَ المَعْدِنِيَّةَ بِجُذُورِهِ فَتَصْعَدُ فِي السَّاقِ إِلى الأَوْرَاقِ لِيَنْمُوَ جَيِّدًا.'
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'لَاحِظْ رَسْمَ النَّبَاتِ الأَخْضَرِ ثُمَّ أَجِبْ وَأَكْمِلِ الجَدْوَلَ:',
				content
			},
			hints: [
				'الجُذُورُ فِي التُّرْبَةِ تَمْتَصُّ المَاءَ وَالأَمْلَاحَ المَعْدِنِيَّةَ.',
				'تَصْعَدُ المَوَادُّ عَبْرَ السَّاقِ نَحْوَ الأَوْرَاقِ.',
				`الإِجَابَةُ الصَّحِيحَةُ هِيَ: ${correctText}.`
			],
			solutionStepsAr: [
				'النَّبَاتُ يَحْتَاجُ المَاءَ وَالأَمْلَاحَ المَعْدِنِيَّةَ مَعًا.',
				`الجَوَابُ: ${correctText}.`
			],
			finalAnswer: correctText
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Seed Germination Stages
// ═══════════════════════════════════════════════════════════════════════════════
const seedGerminationTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2ap_t2_seed_germination_order',
	grade: '2ap',
	trimesterId: 't2',
	domain: 'plant_biology',
	titleAr: 'مَرَاحِلُ إِنْتَاشِ البَذْرَةِ وَشُرُوطُهُ',
	curriculumLessonId: 'sci_lesson_2ap_t2_seed_growth_repro',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 502);
		const seedType = rng.pick(['الفَاصُولْيَاءِ', 'الحِمَّصِ', 'العَدَسِ', 'الفُولِ']);
		const askCondition = difficulty === 'hard';

		const svg = svgPlantAndPrimaryDiagram('seed_germination', {
			title: `مَرَاحِلُ إِنْتَاشِ بَذْرَةِ ${seedType}`
		});
		const imageUrl = saveSciencesSvgAsset(`sci_2ap_t2_seed_germination_order_${difficulty}_s${seed}`, svg);

		const correctText = askCondition
			? 'بَذْرَةٌ سَلِيمَةٌ + المَاءُ (الرُّطُوبَةُ) + الدِّفْءُ (حَرَارَةٌ مُنَاسِبَةٌ)'
			: 'اِنْتِفَاخُ البَذْرَةِ ← بُرُوزُ الجُذَيْرِ ← نُمُوُّ السُّوَيْقَةِ ← ظُهُورُ الأَوْرَاقِ';

		const distractors = askCondition
			? [
					{ text: 'بَذْرَةٌ مَطْبُوخَةٌ + ثَلْجٌ بَارِدٌ', diagnosticFeedback: 'البَذْرَةُ المَطْبُوخَةُ لَا تَنْتُشُ، وَالبَرْدُ الشَّدِيدُ يَمْنَعُ الإِنْتَاشَ.' },
					{ text: 'قُطْنٌ جَافٌّ تَمَامًا دُونَ مَاءٍ', diagnosticFeedback: 'المَاءُ ضَرُورِيٌّ لِانْتِفَاخِ البَذْرَةِ وَبَدْءِ الإِنْتَاشِ.' },
					{ text: 'زَيْتٌ وَمِلْحٌ وَظَلَامٌ بَارِدٌ', diagnosticFeedback: 'الزَّيْتُ وَالبُرُودَةُ الشَّدِيدَةُ تَمْنَعُ إِنْتَاشَ البَذْرَةِ.' }
				]
			: [
					{ text: 'ظُهُورُ الأَوْرَاقِ ← بُرُوزُ الجُذَيْرِ ← اِنْتِفَاخُ البَذْرَةِ', diagnosticFeedback: 'تَبْدَأُ البَذْرَةُ أَوَّلًا بِالاِنْتِفَاخِ بِالمَاءِ، ثُمَّ يَبْرُزُ الجُذَيْرُ، ثُمَّ السُّوَيْقَةُ وَالأَوْرَاقُ.' },
					{ text: 'نُمُوُّ السُّوَيْقَةِ ← اِنْتِفَاخُ البَذْرَةِ ← بُرُوزُ الجُذَيْرِ', diagnosticFeedback: 'الجُذَيْرُ يَخْرُجُ قَبْلَ السُّوَيْقَةِ دَائِمًا.' },
					{ text: 'ظُهُورُ الثِّمَارِ ← ظُهُورُ الجُذَيْرِ ← بَذْرَةٌ جَافَّةٌ', diagnosticFeedback: 'التَّرْتِيبُ يَبْدَأُ مِنَ البَذْرَةِ المُنْتَفِخَةِ ثُمَّ الجُذَيْرِ ثُمَّ السُّوَيْقَةِ وَالأَوْرَاقِ.' }
				];

		const mcq = buildUniqueMcqOptions(correctText, distractors, rng);
		const qText = askCondition
			? `نُرِيدُ إِنْتَاشَ بَذْرَةِ **${seedType}** فِي القِسْمِ. مَا الشُّرُوطُ الضَّرُورِيَّةُ لِنَجَاحِ الإِنْتَاشِ؟`
			: `رَتِّبْ مَرَاحِلَ إِنْتَاشِ بَذْرَةِ **${seedType}** مِنْ البِدَايَةِ إِلى النِّهَايَةِ:`;

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: imageUrl,
				caption: `مَرَاحِلُ إِنْتَاشِ بَذْرَةِ ${seedType}`
			},
			{
				type: 'text',
				content: `1) رَتِّبْ مَرَاحِلَ إِنْتَاشِ البَذْرَةِ بِالأَرْقَامِ (1 إِلى 4): (.....) ظُهُورُ الأَوْرَاقِ — (.....) اِنْتِفَاخُ البَذْرَةِ — (.....) نُمُوُّ السُّوَيْقَةِ — (.....) بُرُوزُ الجُذَيْرِ.`,
				answer: '1: اِنْتِفَاخُ البَذْرَةِ ← 2: بُرُوزُ الجُذَيْرِ ← 3: نُمُوُّ السُّوَيْقَةِ ← 4: ظُهُورُ الأَوْرَاقِ.',
				mark: '1.5'
			},
			{
				type: 'text',
				content: '2) اُذْكُرْ شَرْطَيْنِ أَسَاسِيَّيْنِ لِكَيْ تَنْتُشَ البَذْرَةُ السَّلِيمَةُ.',
				answer: 'المَاءُ (الرُّطُوبَةُ) وَالحَرَارَةُ المُنَاسِبَةُ (الدِّفْءُ).',
				mark: '1'
			}
		];

		return {
			templateId: 'sci_tpl_2ap_t2_seed_germination_order',
			seed,
			grade: '2ap',
			trimesterId: 't2',
			difficulty,
			domain: 'plant_biology',
			titleAr: 'مَرَاحِلُ إِنْتَاشِ البَذْرَةِ وَشُرُوطُهُ',
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: `مَرَاحِلُ إِنْتَاشِ بَذْرَةِ ${seedType}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'تَنْتُشُ البَذْرَةُ السَّلِيمَةُ بِالمَاءِ وَالدِّفْءِ وَفْقَ التَّرْتِيبِ: اِنْتِفَاخٌ ← جُذَيْرٌ ← سُوَيْقَةٌ ← أَوْرَاقٌ.'
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'تَأَمَّلِ الرَّسْمَ ثُمَّ أَجِبْ عَنِ السُّؤَالَيْنِ:',
				content
			},
			hints: [
				'أَوَّلًا تَمْتَصُّ البَذْرَةُ المَاءَ فَتَنْتَفِخُ، ثُمَّ يَخْرُجُ الجُذَيْرُ نَحْوَ الأَسْفَلِ.',
				'بَعْدَ الجُذَيْرِ تَصْعَدُ السُّوَيْقَةُ وَتَظْهَرُ الأَوْرَاقُ الخَضْرَاءُ.',
				`الجَوَابُ الصَّحِيحُ: ${correctText}.`
			],
			solutionStepsAr: [
				'شُرُوطُ الإِنْتَاشِ: بَذْرَةٌ سَلِيمَةٌ + مَاءٌ + دِفْءٌ.',
				'المَرَاحِلُ: اِنْتِفَاخٌ ← جُذَيْرٌ ← سُوَيْقَةٌ ← أَوْرَاقٌ.'
			],
			finalAnswer: correctText
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Animal Locomotion & Habitats
// ═══════════════════════════════════════════════════════════════════════════════
const animalLocomotionTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2ap_t2_animal_locomotion',
	grade: '2ap',
	trimesterId: 't2',
	domain: 'ecology_environment',
	titleAr: 'أَنْمَاطُ تَنَقُّلِ الحَيَوَانَاتِ فِي أَوْسَاطِهَا',
	curriculumLessonId: 'sci_lesson_2ap_t2_animal_movement_diet',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 503);
		const pairs = [
			{ left: { text: 'السَّمَكَةُ (وَسَطٌ مَائِيٌّ)' }, right: { text: 'السِّبَاحَةُ بِالزَّعَانِفِ' } },
			{ left: { text: 'الحَمَامَةُ (وَسَطٌ هَوَائِيٌّ)' }, right: { text: 'الطَّيَرَانُ بِالأَجْنِحَةِ' } },
			{ left: { text: 'الأَرْنَبُ (وَسَطٌ بَرِّيٌّ)' }, right: { text: 'القَفْزُ بِالقَوَائِمِ الخَلْفِيَّةِ' } },
			{ left: { text: 'الأَفْعَى (وَسَطٌ بَرِّيٌّ)' }, right: { text: 'الزَّحْفُ عَلَى البَطْنِ' } }
		];
		const shuffledPairs = rng.shuffle(pairs);

		const svg = svgPlantAndPrimaryDiagram('animal_adaptation', {
			title: 'تَنَقُّلُ الحَيَوَانَاتِ وَتَكَيُّفُهَا مَعَ وَسَطِ عَيْشِهَا'
		});
		const imageUrl = saveSciencesSvgAsset(`sci_2ap_t2_animal_locomotion_${difficulty}_s${seed}`, svg);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: imageUrl,
				caption: 'تَكَيُّفُ الحَيَوَانَاتِ مَعَ أَوْسَاطِهَا'
			},
			{
				type: 'table',
				headers: ['الحَيَوَانُ وَوَسَطُ عَيْشِهِ', 'نَمَطُ التَّنَقُّلِ وَالعُضْوُ المُسَاعِدُ'],
				cells: [],
				rows: [
					['السَّمَكَةُ (مَائِيٌّ)', { content: '....................', answer: 'السِّبَاحَةُ بِالزَّعَانِفِ', mark: '0.5' }],
					['الحَمَامَةُ (هَوَائِيٌّ)', { content: '....................', answer: 'الطَّيَرَانُ بِالأَجْنِحَةِ', mark: '0.5' }],
					['الأَرْنَبُ (بَرِّيٌّ)', { content: '....................', answer: 'القَفْزُ بِالقَوَائِمِ', mark: '0.5' }],
					['الأَفْعَى (بَرِّيٌّ)', { content: '....................', answer: 'الزَّحْفُ عَلَى البَطْنِ', mark: '0.5' }],
					['الحِصَانُ (بَرِّيٌّ)', { content: '....................', answer: 'المَشْيُ وَالجَرْيُ بِالقَوَائِمِ', mark: '0.5' }]
				]
			}
		];

		return {
			templateId: 'sci_tpl_2ap_t2_animal_locomotion',
			seed,
			grade: '2ap',
			trimesterId: 't2',
			difficulty,
			domain: 'ecology_environment',
			titleAr: 'أَنْمَاطُ تَنَقُّلِ الحَيَوَانَاتِ فِي أَوْسَاطِهَا',
			onecRole: 'recall',
			quizQuestion: {
				type: 'matching',
				questionText: 'ارْبُطْ كُلَّ حَيَوَانٍ بِنَمَطِ تَنَقُّلِهِ وَالعُضْوِ الَّذِي يُسَاعِدُهُ فِي وَسَطِ عَيْشِهِ:',
				questionTextAr: 'ارْبُطْ كُلَّ حَيَوَانٍ بِنَمَطِ تَنَقُّلِهِ المُنَاسِبِ:',
				imageUrl,
				imageCaption: 'أَنْمَاطُ التَّنَقُّلِ عِنْدَ الحَيَوَانَاتِ',
				questionData: { pairs: shuffledPairs },
				explanation:
					'السَّمَكَةُ تَسْبَحُ بِالزَّعَانِفِ، الحَمَامَةُ تَطِيرُ بِالأَجْنِحَةِ، الأَرْنَبُ يَقْفِزُ بِقَوَائِمِهِ الخَلْفِيَّةِ، وَالأَفْعَى تَزْحَفُ.'
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'أَكْمِلِ الجَدْوَلَ بِذِكْرِ نَمَطِ التَّنَقُّلِ المُنَاسِبِ لِكُلِّ حَيَوَانٍ:',
				content
			},
			hints: [
				'فِي المَاءِ: السِّبَاحَةُ بِالزَّعَانِفِ. فِي الهَوَاءِ: الطَّيَرَانُ بِالأَجْنِحَةِ.',
				'عَلَى اليَابِسَةِ: المَشْيُ، الجَرْيُ، القَفْزُ، أَوِ الزَّحْفُ.',
				'الأَرْنَبُ يَقْفِزُ وَالأَفْعَى تَزْحَفُ.'
			],
			solutionStepsAr: [
				'السَّمَكَةُ ← السِّبَاحَةُ بِالزَّعَانِفِ.',
				'الحَمَامَةُ ← الطَّيَرَانُ بِالأَجْنِحَةِ.',
				'الأَرْنَبُ ← القَفْزُ، الأَفْعَى ← الزَّحْفُ، الحِصَانُ ← الجَرْيُ.'
			],
			finalAnswer: 'السباحة — الطيران — القفز — الزحف'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Simple Food Chain Builder
// ═══════════════════════════════════════════════════════════════════════════════
const foodChainBuilderTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2ap_t2_food_chain_builder',
	grade: '2ap',
	trimesterId: 't2',
	domain: 'ecology_environment',
	titleAr: 'بِنَاءُ وَقِرَاءَةُ سِلْسِلَةٍ غِذَائِيَّةٍ بَسِيطَةٍ',
	curriculumLessonId: 'sci_lesson_2ap_t2_simple_food_chain',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 504);
		const chains = [
			{ items: ['عُشْبٌ أَخْضَرُ', 'أَرْنَبٌ', 'ثَعْلَبٌ'], habitat: 'الغَابَةِ' },
			{ items: ['عُشْبٌ أَخْضَرُ', 'غَزَالٌ', 'أَسَدٌ'], habitat: 'السَّافَانَا' },
			{ items: ['حُبُوبُ قَمْحٍ', 'فَأْرٌ', 'قِطٌّ'], habitat: 'الحَقْلِ' },
			{ items: ['أَوْرَاقُ نَبَاتٍ', 'جَرَادَةٌ', 'ضِفْدَعٌ', 'أَفْعَى'], habitat: 'المَرْجِ' }
		] as const;

		const chain = difficulty === 'hard' ? chains[3] : rng.pick(chains.slice(0, 3));
		const correctChain = chain.items.join(' ← ');
		const reversedChain = [...chain.items].reverse().join(' ← ');
		const middleFirst = [chain.items[1], chain.items[0], ...chain.items.slice(2)].join(' ← ');
		const lastFirst = [chain.items[chain.items.length - 1], chain.items[0], chain.items[1]].join(' ← ');

		const mcq = buildUniqueMcqOptions(
			correctChain,
			[
				{ text: reversedChain, diagnosticFeedback: 'اِتِّجَاهُ السَّهْمِ مَعْكُوسٌ! السَّهْمُ (←) يَعْنِي "يُؤْكَلُ مِنْ طَرَفِ" فَنَبْدَأُ دَائِمًا بِالنَّبَاتِ الأَخْضَرِ.' },
				{ text: middleFirst, diagnosticFeedback: 'السِّلْسِلَةُ الغِذَائِيَّةُ تَبْدَأُ دَائِمًا بِالنَّبَاتِ الأَخْضَرِ وَلَيْسَ بِالحَيَوَانِ.' },
				{ text: lastFirst, diagnosticFeedback: 'الحَيَوَانُ اللَّاحِمُ يَأْتِي فِي آخِرِ السِّلْسِلَةِ وَلَيْسَ فِي أَوَّلِهَا.' }
			],
			rng
		);

		const svg = svgPlantAndPrimaryDiagram('food_chain', {
			title: `سِلْسِلَةٌ غِذَائِيَّةٌ فِي ${chain.habitat}`,
			items: [...chain.items]
		});
		const imageUrl = saveSciencesSvgAsset(`sci_2ap_t2_food_chain_builder_${difficulty}_s${seed}`, svg);

		const scrambled = rng.shuffle(chain.items).join(' — ');
		const qText = `كَوِّنْ سِلْسِلَةً غِذَائِيَّةً صَحِيحَةً مِنْ هَذِهِ الكَائِنَاتِ: (${scrambled}). تَذَكَّرْ أَنَّ السَّهْمَ (←) يَعْنِي "يُؤْكَلُ مِنْ طَرَفِ":`;

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: imageUrl,
				caption: `مُخَطَّطُ السِّلْسِلَةِ الغِذَائِيَّةِ`
			},
			{
				type: 'text',
				content: `1) اُكْتُبِ السِّلْسِلَةَ الغِذَائِيَّةَ مُرَتَّبَةً مِنْ: (${scrambled}).`,
				answer: correctChain,
				mark: '1'
			},
			{
				type: 'text',
				content: '2) بِمَاذَا تَبْدَأُ كُلُّ سِلْسِلَةٍ غِذَائِيَّةٍ دَائِمًا؟ وَمَا مَعْنَى السَّهْمِ (←)؟',
				answer: 'تَبْدَأُ دَائِمًا بِنَبَاتٍ أَخْضَرَ، وَالسَّهْمُ يَعْنِي: "يُؤْكَلُ مِنْ طَرَفِ".',
				mark: '1'
			},
			{
				type: 'text',
				content: `3) سَمِّ الحَيَوَانَ العَاشِبَ فِي هَذِهِ السِّلْسِلَةِ.`,
				answer: chain.items[1],
				mark: '0.5'
			}
		];

		return {
			templateId: 'sci_tpl_2ap_t2_food_chain_builder',
			seed,
			grade: '2ap',
			trimesterId: 't2',
			difficulty,
			domain: 'ecology_environment',
			titleAr: 'بِنَاءُ وَقِرَاءَةُ سِلْسِلَةٍ غِذَائِيَّةٍ بَسِيطَةٍ',
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: `سِلْسِلَةٌ غِذَائِيَّةٌ فِي ${chain.habitat}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `التَّرْتِيبُ الصَّحِيحُ يَبْدَأُ بِالنَّبَاتِ الأَخْضَرِ ثُمَّ العَاشِبِ ثُمَّ اللَّاحِمِ: ${correctChain}.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'اِسْتَعِنْ بِالسَّنَدِ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ:',
				content
			},
			hints: [
				'اِبْحَثْ أَوَّلًا عَنِ النَّبَاتِ الأَخْضَرِ لِتَضَعَهُ فِي البِدَايَةِ.',
				'ضَعْ بَعْدَهُ الحَيَوَانَ العَاشِبَ الَّذِي يَأْكُلُ النَّبَاتَ، ثُمَّ اللَّاحِمَ.',
				`السِّلْسِلَةُ الصَّحِيحَةُ هِيَ: ${correctChain}.`
			],
			solutionStepsAr: [
				`الحَلَقَةُ الأُولَى (النَّبَاتُ الأَخْضَرُ): ${chain.items[0]}.`,
				`الحَلَقَةُ الثَّانِيَةُ (الحَيَوَانُ العَاشِبُ): ${chain.items[1]}.`,
				`السِّلْسِلَةُ الكَامِلَةُ: ${correctChain}.`
			],
			finalAnswer: correctChain
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Integration: Life in the Meadow
// ═══════════════════════════════════════════════════════════════════════════════
const integrationMeadowLifeTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2ap_t2_integration_meadow_life',
	grade: '2ap',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'وَضْعِيَّةٌ إِدْمَاجِيَّةٌ: الحَيَاةُ فِي المَرْجِ الطَّبِيعِيِّ',
	curriculumLessonId: 'sci_lesson_2ap_t2_simple_food_chain',
	defaultPoints: 2.5,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 505);
		const kid = rng.pick(KIDS);

		const svg = wrapSciencesSvg(
			440,
			195,
			`<rect x="6" y="6" width="428" height="183" rx="12" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>` +
				`<text x="220" y="27" text-anchor="middle" font-size="13" font-weight="bold" fill="#166534">مَشْهَدٌ مِنَ المَرْجِ الطَّبِيعِيِّ</text>` +
				`<rect x="300" y="48" width="120" height="118" rx="9" fill="#ffffff" stroke="#16a34a" stroke-width="1.6"/>` +
				`<text x="360" y="74" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#166534">بُذُورٌ وَعُشْبٌ</text>` +
				`<text x="360" y="102" text-anchor="middle" font-size="10" fill="#334155">تَنْتُشُ بِالمَاءِ وَالدِّفْءِ</text>` +
				`<text x="360" y="124" text-anchor="middle" font-size="10" fill="#15803d">وَتَمْتَصُّ الأَمْلَاحَ</text>` +
				`<rect x="160" y="48" width="120" height="118" rx="9" fill="#ffffff" stroke="#d97706" stroke-width="1.6"/>` +
				`<text x="220" y="74" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#92400e">أَرْنَبٌ وَطَائِرٌ</text>` +
				`<text x="220" y="102" text-anchor="middle" font-size="10" fill="#334155">الأَرْنَبُ يَقْفِزُ</text>` +
				`<text x="220" y="124" text-anchor="middle" font-size="10" fill="#b45309">وَالطَّائِرُ يَطِيرُ</text>` +
				`<rect x="20" y="48" width="120" height="118" rx="9" fill="#ffffff" stroke="#dc2626" stroke-width="1.6"/>` +
				`<text x="80" y="74" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#991b1b">ثَعْلَبٌ لَاحِمٌ</text>` +
				`<text x="80" y="102" text-anchor="middle" font-size="10" fill="#334155">عُشْبٌ ← أَرْنَبٌ ← ثَعْلَبٌ</text>` +
				`<text x="80" y="124" text-anchor="middle" font-size="10" fill="#dc2626">سِلْسِلَةٌ غِذَائِيَّةٌ</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_2ap_t2_integration_meadow_life_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'تَنْتُشُ البُذُورُ بِالمَاءِ وَالدِّفْءِ، وَالأَرْنَبُ يَقْفِزُ وَيَأْكُلُ العُشْبَ ثُمَّ يَصْطَادُهُ الثَّعْلَبُ',
			[
				{ text: 'تَنْتُشُ البُذُورُ دُونَ مَاءٍ، وَالسِّلْسِلَةُ تَبْدَأُ بِالثَّعْلَبِ', diagnosticFeedback: 'البُذُورُ تَحْتَاجُ لِلْمَاءِ وَالسِّلْسِلَةُ تَبْدَأُ دَائِمًا بِالنَّبَاتِ الأَخْضَرِ.' },
				{ text: 'الأَرْنَبُ يَطِيرُ بِالأَجْنِحَةِ وَيَأْكُلُ اللَّحْمَ', diagnosticFeedback: 'الأَرْنَبُ حَيَوَانٌ عَاشِبٌ يَتَنَقَّلُ بِالقَفْزِ.' },
				{ text: 'النَّبَاتُ الأَخْضَرُ لَا يَحْتَاجُ لِلْأَمْلَاحِ المَعْدِنِيَّةِ', diagnosticFeedback: 'يَحْتَاجُ النَّبَاتُ الأَخْضَرُ لِلْمَاءِ وَالأَمْلَاحِ المَعْدِنِيَّةِ مَعًا.' }
			],
			rng
		);

		const qText = `فِي خَرْجَةٍ مَيْدَانِيَّةٍ إِلى المَرْجِ، لَاحَظَ ${kid} نَبَاتَاتٍ خَضْرَاءَ وَأَرْنَبًا يَقْفِزُ وَطَائِرًا يَطِيرُ وَثَعْلَبًا يَتَرَبَّصُ. أَيُّ خُلَاصَةٍ صَحِيحَةٌ؟`;

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: imageUrl,
				caption: 'الكَائِنَاتُ الحَيَّةُ فِي المَرْجِ'
			},
			{
				type: 'text',
				content: '1) إِلى مَاذَا تَحْتَاجُ نَبَاتَاتُ المَرْجِ لِتَنْمُوَ جَيِّدًا؟ وَكَيْفَ تَتَكَاثَرُ الفَاصُولْيَاءُ وَالقَمْحُ؟',
				answer: 'تَحْتَاجُ إِلى المَاءِ وَالأَمْلَاحِ المَعْدِنِيَّةِ، وَتَتَكَاثَرُ بِالبُذُورِ عَبْرَ الإِنْتَاشِ.',
				mark: '1'
			},
			{
				type: 'text',
				content: '2) حَدِّدْ نَمَطَ تَنَقُّلِ كُلٍّ مِنَ الأَرْنَبِ وَالطَّائِرِ.',
				answer: 'الأَرْنَبُ يَتَنَقَّلُ بِالقَفْزِ، وَالطَّائِرُ يَتَنَقَّلُ بِالطَّيَرَانِ بِالأَجْنِحَةِ.',
				mark: '0.75'
			},
			{
				type: 'text',
				content: '3) كَوِّنْ سِلْسِلَةً غِذَائِيَّةً بَسِيطَةً مِنَ العُشْبِ وَالأَرْنَبِ وَالثَّعْلَبِ.',
				answer: 'عُشْبٌ ← أَرْنَبٌ ← ثَعْلَبٌ.',
				mark: '0.75'
			}
		];

		return {
			templateId: 'sci_tpl_2ap_t2_integration_meadow_life',
			seed,
			grade: '2ap',
			trimesterId: 't2',
			difficulty,
			domain: 'integration',
			titleAr: 'وَضْعِيَّةٌ إِدْمَاجِيَّةٌ: الحَيَاةُ فِي المَرْجِ الطَّبِيعِيِّ',
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'الحَيَاةُ فِي المَرْجِ',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'تَنْمُو النَّبَاتَاتُ بِالمَاءِ وَالأَمْلَاحِ وَتَتَكَاثَرُ بِالبُذُورِ، وَيَقْفِزُ الأَرْنَبُ لِيَأْكُلَ العُشْبَ ثُمَّ يَصْطَادُهُ الثَّعْلَبُ.'
			},
			sujetExercise: {
				points: 2.5,
				customTitle: 'الوَضْعِيَّةُ الإِدْمَاجِيَّةُ',
				instruction: `رَاقَبَ ${kid} الكَائِنَاتِ الحَيَّةَ فِي المَرْجِ الطَّبِيعِيِّ. أَجِبْ عَنِ الأَسْئِلَةِ التَّالِيَةِ:`,
				content
			},
			hints: [
				'النَّبَاتُ الأَخْضَرُ يَحْتَاجُ لِلْمَاءِ وَالأَمْلَاحِ المَعْدِنِيَّةِ.',
				'الأَرْنَبُ يَقْفِزُ وَالطَّائِرُ يَطِيرُ.',
				'السِّلْسِلَةُ تَبْدَأُ بِالعُشْبِ: عُشْبٌ ← أَرْنَبٌ ← ثَعْلَبٌ.'
			],
			solutionStepsAr: [
				'حَاجَاتُ النَّبَاتِ: المَاءُ وَالأَمْلَاحُ المَعْدِنِيَّةُ، التَّكَاثُرُ بِالبُذُورِ.',
				'التَّنَقُّلُ: الأَرْنَبُ بِالقَفْزِ وَالطَّائِرُ بِالطَّيَرَانِ.',
				'السِّلْسِلَةُ الغِذَائِيَّةُ: عُشْبٌ ← أَرْنَبٌ ← ثَعْلَبٌ.'
			],
			finalAnswer: 'الماء والأملاح — القفز والطيران — عشب ← أرنب ← ثعلب'
		};
	}
};

export const SCIENCES_TEMPLATES_2AP_T2: SciencesParameterizedTemplate[] = [
	waterMineralsExpTemplate,
	seedGerminationTemplate,
	animalLocomotionTemplate,
	foodChainBuilderTemplate,
	integrationMeadowLifeTemplate
];
