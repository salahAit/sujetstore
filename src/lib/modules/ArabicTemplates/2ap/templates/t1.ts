import type {
	ArabicGeneratedExerciseInstance,
	ArabicParameterizedTemplate,
	Difficulty
} from '../../types';
import type { ContentBlock } from '../../../SujetBuilder/types';
import { buildProsePassageBlock, buildWrittenProductionBlock } from '../../arabic-helpers';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildIllustratedFigureBlock,
	type IllustrationId
} from '../../../VisualAssets/illustrations-registry';

function makeRng(seed: number, difficulty: Difficulty, salt: number): SeededRng {
	const d = difficulty === 'easy' ? 11 : difficulty === 'medium' ? 23 : 41;
	return new SeededRng((((Math.trunc(seed) >>> 0) * 1009 + d * 89 + salt) >>> 0) || 1);
}

// ---------------------------------------------------------------------------
// 1. Intellectual Building: Reading Passage (Family & School)
// ---------------------------------------------------------------------------
const tplReadingFamilySchool2ap: ArabicParameterizedTemplate = {
	id: 'arb_tpl_2ap_t1_reading_family_school',
	grade: '2ap',
	trimesterId: 't1',
	domain: 'reading_comprehension',
	titleAr: 'البِنَاءُ الفِكْرِيُّ: فَهْمُ نَصٍّ حَوْلَ الأُسْرَةِ وَالمَدْرَسَةِ',
	curriculumLessonId: 'arb_lesson_2ap_t1_verbal_nominal_sentence',
	defaultPoints: 3,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 401);
		const passages = [
			{
				title: 'يَوْمُ العَوْدَةِ إِلَى المَدْرَسَةِ',
				text: 'فِي صَبَاحٍ جَمِيلٍ، تَوَجَّهَ أَمِينُ وَأُخْتُهُ خَدِيجَةُ إِلَى المَدْرَسَةِ فَرِحَيْنِ. فِي السَّاحَةِ، سَلَّمَ التَّلَامِيذُ عَلَى المُعَلِّمِينَ، ثُمَّ وَقَفُوا فِي صُفُوفٍ مُنَظَّمَةٍ لِتَحِيَّةِ العَلَمِ الوَطَنِيِّ. بَعْدَ ذَلِكَ دَخَلُوا إِلَى الأَقْسَامِ لِطَلَبِ العِلْمِ النَّافِعِ.',
				q1: 'كَيْفَ تَوَجَّهَ أَمِينُ وَأُخْتُهُ خَدِيجَةُ إِلَى المَدْرَسَةِ؟',
				a1: 'تَوَجَّهَ أَمِينُ وَخَدِيجَةُ إِلَى المَدْرَسَةِ فَرِحَيْنِ.',
				q2: 'لِمَاذَا وَقَفَ التَّلَامِيذُ فِي صُفُوفٍ مُنَظَّمَةٍ فِي السَّاحَةِ؟',
				a2: 'وَقَفُوا لِتَحِيَّةِ العَلَمِ الوَطَنِيِّ.',
				q3: 'اسْتَخْرِجْ مِنَ النَّصِّ مُرَادِفَ كَلِمَةِ «مَسْرُورَيْنِ».',
				a3: 'مُرَادِفُ «مَسْرُورَيْنِ» مِنَ النَّصِّ هُوَ: «فَرِحَيْنِ».',
				mcqPrompt: 'لِمَاذَا دَخَلَ التَّلَامِيذُ إِلَى الأَقْسَامِ بَعْدَ تَحِيَّةِ العَلَمِ حَسَبَ النَّصِّ؟',
				correct: 'لِطَلَبِ العِلْمِ النَّافِعِ',
				distractors: [
					{ text: 'لِلَّعِبِ بِالكُرَةِ', diagnosticFeedback: 'اقْرَأْ آخِرَ جُمْلَةٍ فِي النَّصِّ بِتَأَنٍّ.' },
					{ text: 'لِتَنَاوُلِ الغَدَاءِ', diagnosticFeedback: 'لَمْ يُذْكَرِ الغَدَاءُ فِي النَّصِّ.' },
					{ text: 'لِلنَّوْمِ وَالرَّاحَةِ', diagnosticFeedback: 'القِسْمُ مَكَانٌ لِلتَّعَلُّمِ، ارْجِعْ إِلى النَّصِّ.' }
				]
			},
			{
				title: 'تَعَاوُنُ الأُسْرَةِ فِي البَيْتِ',
				text: 'أُسْرَةُ يُوسُفَ أُسْرَةٌ مُتَحَابَّةٌ وَمُتَعَاوِنَةٌ. الأَبُ يَعْمَلُ بِجِدٍّ، وَالأُمُّ تَعْتَنِي بِالبَيْتِ وَتُعِدُّ الطَّعَامَ الصِّحِّيَّ. أَمَّا يُوسُفُ وَمَرْيَمُ فَيُرَتِّبَانِ غُرْفَتَهُمَا وَيُسَاعِدَانِ أُمَّهُمَا، فَيَدْعُو لَهُمَا الوَالِدَانِ بِالتَّوْفِيقِ وَالبَرَكَةِ.',
				q1: 'كَيْفَ وَصَفَ النَّصُّ أُسْرَةَ يُوسُفَ؟',
				a1: 'أُسْرَةُ يُوسُفَ أُسْرَةٌ مُتَحَابَّةٌ وَمُتَعَاوِنَةٌ.',
				q2: 'مَاذَا يَفْعَلُ يُوسُفُ وَمَرْيَمُ فِي البَيْتِ؟',
				a2: 'يُرَتِّبَانِ غُرْفَتَهُمَا وَيُسَاعِدَانِ أُمَّهُمَا.',
				q3: 'بِمَاذَا يَدْعُو الوَالِدَانِ لِيُوسُفَ وَمَرْيَمَ؟',
				a3: 'يَدْعُو لَهُمَا الوَالِدَانِ بِالتَّوْفِيقِ وَالبَرَكَةِ.',
				mcqPrompt: 'بِمَاذَا يَدْعُو الوَالِدَانِ لِيُوسُفَ وَمَرْيَمَ فِي نِهَايَةِ النَّصِّ؟',
				correct: 'بِالتَّوْفِيقِ وَالبَرَكَةِ',
				distractors: [
					{ text: 'بِالسَّفَرِ البَعِيدِ', diagnosticFeedback: 'لَمْ يُذْكَرِ السَّفَرُ فِي النَّصِّ.' },
					{ text: 'بِاللَّعِبِ الطَّوِيلِ', diagnosticFeedback: 'اقْرَأِ الجُمْلَةَ الأَخِيرَةَ مِنَ النَّصِّ.' },
					{ text: 'بِالرَّاحَةِ فَقَطْ', diagnosticFeedback: 'ارْجِعْ إِلى الكَلِمَتَيْنِ الأَخِيرَتَيْنِ فِي النَّصِّ.' }
				]
			},
			{
				title: 'مَكْتَبَةُ القِسْمِ',
				text: 'فِي قِسْمِنَا مَكْتَبَةٌ صَغِيرَةٌ تَضُمُّ قِصَصًا هَادِفَةً وَكُتُبًا مُفِيدَةً. تَقْرَأُ سَارَةُ كُلَّ أُسْبُوعٍ قِصَّةً عَنِ الصِّدْقِ وَالأَمَانَةِ، ثُمَّ تُعِيدُ الكِتَابَ نَظِيفًا إِلَى الرَّفِّ. القِرَاءَةُ تَزِيدُنَا عِلْمًا وَأَدَبًا.',
				q1: 'مَاذَا تَضُمُّ مَكْتَبَةُ القِسْمِ؟',
				a1: 'تَضُمُّ قِصَصًا هَادِفَةً وَكُتُبًا مُفِيدَةً.',
				q2: 'كَيْفَ تُعِيدُ سَارَةُ الكِتَابَ إِلَى الرَّفِّ؟',
				a2: 'تُعِيدُهُ نَظِيفًا إِلَى الرَّفِّ.',
				q3: 'مَا فَائِدَةُ القِرَاءَةِ كَمَا جَاءَ فِي آخِرِ النَّصِّ؟',
				a3: 'القِرَاءَةُ تَزِيدُنَا عِلْمًا وَأَدَبًا.',
				mcqPrompt: 'مَا فَائِدَةُ القِرَاءَةِ الَّتِي ذَكَرَهَا النَّصُّ فِي نِهَايَتِهِ؟',
				correct: 'تَزِيدُنَا عِلْمًا وَأَدَبًا',
				distractors: [
					{ text: 'تُضِيعُ الوَقْتَ', diagnosticFeedback: 'القِرَاءَةُ نَافِعَةٌ جِدًّا لِلتِّلْمِيذِ!' },
					{ text: 'تُتْعِبُ التِّلْمِيذَ دُونَ فَائِدَةٍ', diagnosticFeedback: 'اقْرَأْ آخِرَ جُمْلَةٍ فِي النَّصِّ.' },
					{ text: 'تَمْنَعُ التَّعَاوُنَ', diagnosticFeedback: 'ارْجِعْ إِلى الجُمْلَةِ الأَخِيرَةِ: «القِرَاءَةُ تَزِيدُنَا...».' }
				]
			}
		] as const;

		const p = rng.pick(passages);
		const mcq = buildUniqueMcqOptions(p.correct, [...p.distractors], rng);
		const illustrationId: IllustrationId =
			p.title === 'تَعَاوُنُ الأُسْرَةِ فِي البَيْتِ'
				? 'pri_ara_02_warm_algerian_home'
				: 'pri_ara_01_school_bag_supplies';

		const content: ContentBlock[] = [
			buildIllustratedFigureBlock(illustrationId, {
				mode: 'image_only',
				title: p.title,
				maxHeight: 112,
				width: '58%'
			}),
			buildProsePassageBlock({
				title: p.title,
				paragraphs: [p.text]
			}),
			{
				type: 'text',
				content: `1) ${p.q1}\n................................................................`,
				answer: p.a1,
				mark: '1'
			},
			{
				type: 'text',
				content: `2) ${p.q2}\n................................................................`,
				answer: p.a2,
				mark: '1'
			},
			{
				type: 'text',
				content: `3) ${p.q3}\n................................................................`,
				answer: p.a3,
				mark: '1'
			}
		];

		return {
			templateId: 'arb_tpl_2ap_t1_reading_family_school',
			seed,
			grade: '2ap',
			trimesterId: 't1',
			difficulty,
			domain: 'reading_comprehension',
			titleAr: 'البِنَاءُ الفِكْرِيُّ: فَهْمُ نَصٍّ حَوْلَ الأُسْرَةِ وَالمَدْرَسَةِ',
			onecRole: 'intellectual_building',
			passageKind: 'prose',
			quizQuestion: {
				type: 'mcq',
				questionText: `اقْرَأِ النَّصَّ: «${p.text}»\n${p.mcqPrompt}`,
				questionTextAr: `اقْرَأِ النَّصَّ: «${p.text}»\n${p.mcqPrompt}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نَسْتَخْرِجُ الإِجَابَةَ مُبَاشَرَةً مِنَ النَّصِّ: ${p.correct}.`
			},
			sujetExercise: {
				customTitle: 'البِنَاءُ الفِكْرِيُّ (القِرَاءَةُ وَالفَهْمُ)',
				points: 3,
				instruction: 'اقْرَأِ النَّصَّ جَيِّدًا ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ التَّالِيَةِ:',
				content
			},
			hints: [
				'اقْرَأِ النَّصَّ مَرَّتَيْنِ بِتَأَنٍّ وَافْهَمْ مَعَانِيَ كَلِمَاتِهِ.',
				'أَجِبْ بِجُمْلَةٍ تَامَّةٍ انْطِلَاقًا مِنَ النَّصِّ.',
				`الإِجَابَةُ الصَّحِيحَةُ هِيَ: ${p.correct}.`
			],
			solutionStepsAr: [p.a1, p.a2, p.a3],
			finalAnswer: p.correct
		};
	}
};

// ---------------------------------------------------------------------------
// 2. Linguistic Building 1: Sun/Moon Lam & Open/Tied Taa
// ---------------------------------------------------------------------------
const tplLamAndTaa: ArabicParameterizedTemplate = {
	id: 'arb_tpl_2ap_t1_lam_and_taa',
	grade: '2ap',
	trimesterId: 't1',
	domain: 'spelling_imla',
	titleAr: 'ال الشَّمْسِيَّةُ وَالقَمَرِيَّةُ — التَّاءُ المَفْتُوحَةُ وَالمَرْبُوطَةُ',
	curriculumLessonId: 'arb_lesson_2ap_t1_open_tied_taa',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 402);
		const taaCases = [
			{
				stem: 'مَدْرَسَـ...',
				full: 'مَدْرَسَةٌ',
				kind: 'تَاءٌ مَرْبُوطَةٌ (ة)',
				reason: 'اسْمٌ مُفْرَدٌ مُؤَنَّثٌ'
			},
			{
				stem: 'كَتَبَـ...',
				full: 'كَتَبَتْ',
				kind: 'تَاءٌ مَفْتُوحَةٌ (ت)',
				reason: 'فِعْلٌ'
			},
			{
				stem: 'مُعَلِّمَا...',
				full: 'مُعَلِّمَاتٌ',
				kind: 'تَاءٌ مَفْتُوحَةٌ (ت)',
				reason: 'جَمْعُ مُؤَنَّثٍ سَالِمٌ'
			},
			{
				stem: 'بَيْـ...',
				full: 'بَيْتٌ',
				kind: 'تَاءٌ مَفْتُوحَةٌ (ت)',
				reason: 'اسْمٌ ثُلَاثِيٌّ سَاكِنُ الوَسَطِ'
			},
			{
				stem: 'مَكْتَبَـ...',
				full: 'مَكْتَبَةٌ',
				kind: 'تَاءٌ مَرْبُوطَةٌ (ة)',
				reason: 'اسْمٌ مُفْرَدٌ مُؤَنَّثٌ'
			}
		] as const;

		const lamPool = [
			{ word: 'الْوَالِدَانِ', kind: 'ال القَمَرِيَّةُ' },
			{ word: 'الْعِلْمُ', kind: 'ال القَمَرِيَّةُ' },
			{ word: 'التَّعَاوُنُ', kind: 'ال الشَّمْسِيَّةُ' },
			{ word: 'الصِّدْقُ', kind: 'ال الشَّمْسِيَّةُ' }
		] as const;

		const taaPair = rng.pickDistinct(taaCases, 2);
		const lamPair = [
			rng.pick(lamPool.filter((x) => x.kind === 'ال القَمَرِيَّةُ')),
			rng.pick(lamPool.filter((x) => x.kind === 'ال الشَّمْسِيَّةُ'))
		];
		const shuffledLam = rng.shuffle(lamPair);
		const target = taaPair[0];

		const mcq = buildUniqueMcqOptions(
			target.full,
			[
				{
					text: target.full.endsWith('ةٌ') ? target.full.replace('ةٌ', 'تٌ') : target.full.replace(/ت[ٌْ]$/, 'ةٌ'),
					diagnosticFeedback: `تَذَكَّرْ: «${target.full}» (${target.reason}) تَنْتَهِي بِـ ${target.kind}.`
				},
				{
					text: target.full.replace(/[ةت][ٌْ]?$/, 'ه'),
					diagnosticFeedback: 'لَا نَكْتُبُهَا هَاءً مَحْضَةً، بَلْ تَاءً!'
				},
				{
					text: target.full.replace(/[ةت][ٌْ]?$/, 'ن'),
					diagnosticFeedback: 'الحَرْفُ الأَخِيرُ تَاءٌ وَلَيْسَ نُونًا.'
				}
			],
			rng
		);

		const qText = `اخْتَرِ الكِتَابَةَ الإِمْلَائِيَّةَ الصَّحِيحَةَ لِلكَلِمَةِ: «${target.stem}»`;

		const content: ContentBlock[] = [
			{
				type: 'table',
				headers: ['الكَلِمَةُ', 'نَوْعُ «ال» (قَمَرِيَّةٌ / شَمْسِيَّةٌ)'],
				cells: [],
				rows: shuffledLam.map((x) => [
					{ content: x.word, bold: true },
					{ content: '................................', answer: x.kind, mark: '0.5' }
				]),
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			},
			{
				type: 'table',
				headers: ['أَكْمِلْ بِتَاءٍ مَفْتُوحَةٍ (ت) أَوْ مَرْبُوطَةٍ (ة)', 'التَّعْلِيلُ المُبَسَّطُ'],
				cells: [],
				rows: taaPair.map((t) => [
					{ content: t.stem, answer: t.full, mark: '0.5' },
					{ content: t.reason }
				]),
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			}
		];

		return {
			templateId: 'arb_tpl_2ap_t1_lam_and_taa',
			seed,
			grade: '2ap',
			trimesterId: 't1',
			difficulty,
			domain: 'spelling_imla',
			titleAr: 'ال الشَّمْسِيَّةُ وَالقَمَرِيَّةُ — التَّاءُ المَفْتُوحَةُ وَالمَرْبُوطَةُ',
			onecRole: 'linguistic_building',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نَكْتُبُ «${target.full}» بِـ ${target.kind} لِأَنَّهَا ${target.reason}.`
			},
			sujetExercise: {
				customTitle: 'البِنَاءُ اللُّغَوِيُّ (الإِمْلَاءُ)',
				points: 2,
				instruction: 'أَجِبْ عَنِ الجَدْوَلَيْنِ الإِمْلَائِيَّيْنِ التَّالِيَيْنِ:',
				content
			},
			hints: [
				'قِفْ عَلَى الكَلِمَةِ بِالسُّكُونِ: إِنْ نُطِقَتْ هَاءً فَهِيَ تَاءٌ مَرْبُوطَةٌ (ة)، وَإِنْ بَقِيَتْ تَاءً فَهِيَ مَفْتُوحَةٌ (ت).',
				'فِي الأَفْعَالِ وَجَمْعِ المُؤَنَّثِ السَّالِمِ وَالثُّلَاثِيِّ سَاكِنِ الوَسَطِ تُكْتَبُ التَّاءُ مَفْتُوحَةً.',
				`الكِتَابَةُ الصَّحِيحَةُ هِيَ: «${target.full}».`
			],
			solutionStepsAr: [
				`«${shuffledLam[0].word}»: ${shuffledLam[0].kind}، «${shuffledLam[1].word}»: ${shuffledLam[1].kind}.`,
				`«${taaPair[0].full}» (${taaPair[0].kind})، وَ«${taaPair[1].full}» (${taaPair[1].kind}).`
			],
			finalAnswer: target.full
		};
	}
};

// ---------------------------------------------------------------------------
// 3. Linguistic Building 2: Detached Pronouns & Verbal vs Nominal Sentence
// ---------------------------------------------------------------------------
const tplPronounsSentenceType: ArabicParameterizedTemplate = {
	id: 'arb_tpl_2ap_t1_pronouns_sentence_type',
	grade: '2ap',
	trimesterId: 't1',
	domain: 'grammar_irab',
	titleAr: 'الضَّمَائِرُ المُنْفَصِلَةُ وَالجُمْلَةُ الفِعْلِيَّةُ وَالاِسْمِيَّةُ',
	curriculumLessonId: 'arb_lesson_2ap_t1_detached_pronouns',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 403);
		const pronItems = [
			{ blank: '...... يَشْرَحُ الدَّرْسَ بِوُضُوحٍ.', correct: 'هُوَ', wrongs: ['هِيَ', 'نَحْنُ', 'أَنَا'] },
			{ blank: '...... تُسَاعِدُ أُمَّهَا فِي البَيْتِ.', correct: 'هِيَ', wrongs: ['هُوَ', 'نَحْنُ', 'أَنَا'] },
			{ blank: '...... نَحْتَرِمُ وَالِدَيْنَا وَمُعَلِّمِينَا.', correct: 'نَحْنُ', wrongs: ['أَنَا', 'هُوَ', 'هِيَ'] },
			{ blank: '...... تِلْمِيذَةٌ مُجْتَهِدَةٌ يَا مَرْيَمُ.', correct: 'أَنْتِ', wrongs: ['أَنْتَ', 'هُوَ', 'نَحْنُ'] }
		] as const;

		const convertCases = [
			{
				verbal: 'يَقْرَأُ بِلَالٌ القِصَّةَ.',
				nominal: 'بِلَالٌ يَقْرَأُ القِصَّةَ.'
			},
			{
				verbal: 'تُرَتِّبُ سَارَةُ كُتُبَهَا.',
				nominal: 'سَارَةُ تُرَتِّبُ كُتُبَهَا.'
			},
			{
				verbal: 'يَحْفَظُ آدَمُ السُّورَةَ.',
				nominal: 'آدَمُ يَحْفَظُ السُّورَةَ.'
			}
		] as const;

		const pron = rng.pick(pronItems);
		const conv = rng.pick(convertCases);

		const mcq = buildUniqueMcqOptions(
			pron.correct,
			pron.wrongs.map((w) => ({
				text: w,
				diagnosticFeedback: `اقْرَأِ الفِعْلَ أَوِ الاِسْمَ فِي «${pron.blank}» لِتَعْرِفَ الضَّمِيرَ المُنَاسِبَ: «${pron.correct}».`
			})),
			rng
		);

		const qText = `اخْتَرِ الضَّمِيرَ المُنْفَصِلَ المُنَاسِبَ: «${pron.blank}»`;

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) أَكْمِلْ بِالضَّمِيرِ المُنَاسِبِ (أَنَا — نَحْنُ — أَنْتَ — أَنْتِ — هُوَ — هِيَ):\n${pron.blank}`,
				answer: pron.blank.replace('......', pron.correct),
				mark: '1'
			},
			{
				type: 'text',
				content: `2) حَوِّلِ الجُمْلَةَ الفِعْلِيَّةَ التَّالِيَةَ إِلَى جُمْلَةٍ اسْمِيَّةٍ:\n«${conv.verbal}»\n................................................................`,
				answer: conv.nominal,
				mark: '1'
			}
		];

		return {
			templateId: 'arb_tpl_2ap_t1_pronouns_sentence_type',
			seed,
			grade: '2ap',
			trimesterId: 't1',
			difficulty,
			domain: 'grammar_irab',
			titleAr: 'الضَّمَائِرُ المُنْفَصِلَةُ وَالجُمْلَةُ الفِعْلِيَّةُ وَالاِسْمِيَّةُ',
			onecRole: 'linguistic_building',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نَسْتَعْمِلُ الضَّمِيرَ «${pron.correct}»: «${pron.blank.replace('......', pron.correct)}»`
			},
			sujetExercise: {
				customTitle: 'البِنَاءُ اللُّغَوِيُّ (الضَّمَائِرُ وَأَنْوَاعُ الجُمْلَةِ)',
				points: 2,
				instruction: 'أَكْمِلْ بِالضَّمِيرِ المُنَاسِبِ ثُمَّ حَوِّلِ الجُمْلَةَ:',
				content
			},
			hints: [
				'ضَمَائِرُ الغَائِبِ هُمَا «هُوَ» لِلْمُذَكَّرِ وَ«هِيَ» لِلْمُؤَنَّثِ.',
				'الجُمْلَةُ الاِسْمِيَّةُ تَبْدَأُ بِالاِسْمِ، وَالفِعْلِيَّةُ تَبْدَأُ بِالفِعْلِ.',
				`الضَّمِيرُ المَطْلُوبُ هُوَ «${pron.correct}»، وَالجُمْلَةُ الاِسْمِيَّةُ هِيَ «${conv.nominal}».`
			],
			solutionStepsAr: [
				`الجُمْلَةُ بِالضَّمِيرِ: ${pron.blank.replace('......', pron.correct)}`,
				`التَّحْوِيلُ إِلى جُمْلَةٍ اسْمِيَّةٍ بِتَقْدِيمِ الاِسْمِ: ${conv.nominal}`
			],
			finalAnswer: pron.correct
		};
	}
};

// ---------------------------------------------------------------------------
// 4. Integration: Order Sentences into a Coherent Paragraph
// ---------------------------------------------------------------------------
const tplIntegrationOrderParagraph2apT1: ArabicParameterizedTemplate = {
	id: 'arb_tpl_2ap_t1_integration_order_paragraph',
	grade: '2ap',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'الوَضْعِيَّةُ الإِدْمَاجِيَّةُ: تَرْتِيبُ جُمَلٍ لِتَكْوِينِ فِقْرَةٍ',
	curriculumLessonId: 'arb_lesson_2ap_t1_verbal_nominal_sentence',
	defaultPoints: 3,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 404);
		const sets = [
			{
				context: 'يَحْكِي أَنَسٌ عَنْ صَبَاحِهِ قَبْلَ الذَّهَابِ إِلَى المَدْرَسَةِ.',
				ordered: [
					'اسْتَيْقَظَ أَنَسٌ بَاكِرًا وَغَسَلَ وَجْهَهُ.',
					'تَنَاوَلَ فُطُورَهُ وَقَالَ: «الحَمْدُ لِلَّهِ».',
					'حَمَلَ مِحْفَظَتَهُ وَذَهَبَ مَسْرُورًا إِلَى المَدْرَسَةِ.'
				],
				paragraph: 'اسْتَيْقَظَ أَنَسٌ بَاكِرًا وَغَسَلَ وَجْهَهُ، ثُمَّ تَنَاوَلَ فُطُورَهُ وَقَالَ: «الحَمْدُ لِلَّهِ»، وَبَعْدَ ذَلِكَ حَمَلَ مِحْفَظَتَهُ وَذَهَبَ مَسْرُورًا إِلَى المَدْرَسَةِ.'
			},
			{
				context: 'تَحْكِي خَدِيجَةُ عَنْ تَنْظِيفِ غُرْفَتِهَا يَوْمَ العُطْلَةِ.',
				ordered: [
					'دَخَلَتْ خَدِيجَةُ غُرْفَتَهَا صَبَاحَ الجُمُعَةِ.',
					'رَتَّبَتْ سَرِيرَهَا وَنَظَّمَتْ كُتُبَهَا فَوْقَ المَكْتَبِ.',
					'فَرِحَتْ أُمُّهَا وَشَكَرَتْهَا عَلَى نِظَامِهَا.'
				],
				paragraph: 'دَخَلَتْ خَدِيجَةُ غُرْفَتَهَا صَبَاحَ الجُمُعَةِ، فَرَتَّبَتْ سَرِيرَهَا وَنَظَّمَتْ كُتُبَهَا فَوْقَ المَكْتَبِ، فَفَرِحَتْ أُمُّهَا وَشَكَرَتْهَا عَلَى نِظَامِهَا.'
			}
		] as const;

		const item = rng.pick(sets);
		const numbered = [
			`(أ) ${item.ordered[1]}`,
			`(ب) ${item.ordered[2]}`,
			`(ج) ${item.ordered[0]}`
		];
		const correctOrder = '(ج) — (أ) — (ب)';
		const mcq = buildUniqueMcqOptions(
			correctOrder,
			[
				{ text: '(أ) — (ب) — (ج)', diagnosticFeedback: 'ابْحَثْ أَوَّلًا عَنْ جُمْلَةِ البِدَايَةِ الَّتِي تَذْكُرُ الوَقْتَ وَأَوَّلَ حَدَثٍ.' },
				{ text: '(ب) — (أ) — (ج)', diagnosticFeedback: 'الجُمْلَةُ (ب) هِيَ النِّهَايَةُ وَلَيْسَتِ البِدَايَةَ.' },
				{ text: '(ج) — (ب) — (أ)', diagnosticFeedback: 'قَارِنْ بَيْنَ الحَدَثِ الثَّانِي (أ) وَالنِّهَايَةِ (ب).' }
			],
			rng
		);

		const qText = `${item.context}\nرَتِّبِ الجُمَلَ التَّالِيَةَ لِتَكْوِينَ فِقْرَةٍ مُفِيدَةٍ:\n${numbered.join('\n')}`;

		const content: ContentBlock[] = [
			buildWrittenProductionBlock({
				context: item.context,
				supportQuote: numbered.join('  |  '),
				instruction: 'رَتِّبِ الجُمَلَ الثَّلَاثَ المَذْكُورَةَ فِي السَّنَدِ وَاكْتُبْهَا فِي شَكْلِ فِقْرَةٍ قَصِيرَةٍ مُتَرَابِطَةٍ بِخَطٍّ جَمِيلٍ وَوَاضِحٍ.',
				rubricCriteria: [
					'التَّرْتِيبُ المَنْطِقِيُّ السَّلِيمُ لِلْجُمَلِ الثَّلَاثِ (1.5 ن)',
					'الرَّبْطُ وَكِتَابَتُهَا فِي شَكْلِ فِقْرَةٍ بِلَا أَرْقَامٍ (1 ن)',
					'نَظَافَةُ الوَرَقَةِ وَسَلَامَةُ الإِمْلَاءِ وَالشَّكْلِ (0.5 ن)'
				],
				modelOutline: item.paragraph,
				mark: '3'
			})
		];

		return {
			templateId: 'arb_tpl_2ap_t1_integration_order_paragraph',
			seed,
			grade: '2ap',
			trimesterId: 't1',
			difficulty,
			domain: 'integration',
			titleAr: 'الوَضْعِيَّةُ الإِدْمَاجِيَّةُ: تَرْتِيبُ جُمَلٍ لِتَكْوِينِ فِقْرَةٍ',
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `التَّرْتِيبُ الصَّحِيحُ هُوَ ${correctOrder}؛ فَنَحْصُلُ عَلَى الفِقْرَةِ: «${item.paragraph}»`
			},
			sujetExercise: {
				customTitle: 'الوَضْعِيَّةُ الإِدْمَاجِيَّةُ (الإِنْتَاجُ الكِتَابِيُّ)',
				points: 3,
				instruction: 'اقْرَأِ الجُمَلَ المُشَوَّشَةَ ثُمَّ كَوِّنْ مِنْهَا فِقْرَةً قَصِيرَةً مُتَرَابِطَةً:',
				content
			},
			hints: [
				'ابْحَثْ عَنِ الجُمْلَةِ الَّتِي تَبْدَأُ بِهَا الأَحْدَاثُ فِي الصَّبَاحِ.',
				'رَتِّبِ الأَفْعَالَ حَسَبَ تَتَابُعِهَا فِي الزَّمَنِ.',
				`التَّرْتِيبُ الصَّحِيحُ هُوَ: ${correctOrder}.`
			],
			solutionStepsAr: [
				`نُحَدِّدُ البِدَايَةَ: ${item.ordered[0]}`,
				`ثُمَّ الحَدَثَ الثَّانِيَ: ${item.ordered[1]}`,
				`ثُمَّ الخَاتِمَةَ: ${item.ordered[2]}`
			],
			finalAnswer: correctOrder
		};
	}
};

export const TEMPLATES_2AP_T1: ArabicParameterizedTemplate[] = [
	tplReadingFamilySchool2ap,
	tplLamAndTaa,
	tplPronounsSentenceType,
	tplIntegrationOrderParagraph2apT1
];
