import type {
	ArabicGeneratedExerciseInstance,
	ArabicParameterizedTemplate,
	Difficulty
} from '../../types';
import type { ContentBlock } from '../../../SujetBuilder/types';
import { buildProsePassageBlock, buildWrittenProductionBlock } from '../../arabic-helpers';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';

function makeRng(seed: number, difficulty: Difficulty, salt: number): SeededRng {
	const d = difficulty === 'easy' ? 17 : difficulty === 'medium' ? 31 : 47;
	return new SeededRng((((Math.trunc(seed) >>> 0) * 1009 + d * 79 + salt) >>> 0) || 1);
}

// ---------------------------------------------------------------------------
// 1. Intellectual Building: Homeland & Science Reading Passage
// ---------------------------------------------------------------------------
const tplReadingHomelandScience: ArabicParameterizedTemplate = {
	id: 'arb_tpl_2ap_t3_reading_homeland_science',
	grade: '2ap',
	trimesterId: 't3',
	domain: 'reading_comprehension',
	titleAr: 'البِنَاءُ الفِكْرِيُّ: فَهْمُ نَصٍّ حَوْلَ الوَطَنِ وَالعِلْمِ',
	curriculumLessonId: 'arb_lesson_2ap_t3_order_sentences_paragraph',
	defaultPoints: 3,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 601);
		const passages = [
			{
				title: 'وَطَنِي الجَزَائِرُ الجَمِيلُ',
				text: 'الجَزَائِرُ وَطَنٌ وَاسِعٌ وَجَمِيلٌ، يَتَنَوَّعُ فِيهِ البَحْرُ الأَزْرَقُ وَالجِبَالُ الشَّامِخَةُ وَالصَّحْرَاءُ الذَّهَبِيَّةُ. نَحْنُ التَّلَامِيذُ نُحِبُّ وَطَنَنَا كَثِيرًا، وَنَجْتَهِدُ فِي دِرَاسَتِنَا لِنَبْنِيَهُ بِالعِلْمِ وَالأَخْلَاقِ الفَاضِلَةِ. مَا أَرْوَعَ بِلَادِي الجَزَائِرَ!',
				q1: 'مَا المَنَاظِرُ الطَّبِيعِيَّةُ الَّتِي تَتَنَوَّعُ فِي الجَزَائِرِ؟',
				a1: 'البَحْرُ الأَزْرَقُ وَالجِبَالُ الشَّامِخَةُ وَالصَّحْرَاءُ الذَّهَبِيَّةُ.',
				q2: 'كَيْفَ يَبْنِي التَّلَامِيذُ وَطَنَهُمْ كَمَا جَاءَ فِي النَّصِّ؟',
				a2: 'يَبْنُونَهُ بِالاِجْتِهَادِ فِي الدِّرَاسَةِ وَبِالعِلْمِ وَالأَخْلَاقِ الفَاضِلَةِ.',
				q3: 'اسْتَخْرِجْ مِنَ النَّصِّ جُمْلَةَ تَعَجُّبٍ.',
				a3: 'جُمْلَةُ التَّعَجُّبِ هِيَ: «مَا أَرْوَعَ بِلَادِي الجَزَائِرَ!».',
				mcqPrompt: 'بِمَاذَا نَبْنِي وَطَنَنَا الجَزَائِرَ حَسَبَ النَّصِّ؟',
				correct: 'بِالعِلْمِ وَالأَخْلَاقِ الفَاضِلَةِ',
				distractors: [
					{ text: 'بِالكَسَلِ وَاللَّعِبِ فَقَطْ', diagnosticFeedback: 'اقْرَأِ الجُمْلَةَ الثَّانِيَةَ مِنَ النَّصِّ جَيِّدًا.' },
					{ text: 'بِإِهْمَالِ الدُّرُوسِ', diagnosticFeedback: 'بَلْ نَجْتَهِدُ فِي دِرَاسَتِنَا.' },
					{ text: 'بِالتَّفَرُّقِ بَيْنَ النَّاسِ', diagnosticFeedback: 'ارْجِعْ إِلى النَّصِّ وَاقْرَأْ مَا بَعْدَ «لِنَبْنِيَهُ...».' }
				]
			},
			{
				title: 'شَجَرَةُ الزَّيْتُونِ المُبَارَكَةُ',
				text: 'شَجَرَةُ الزَّيْتُونِ هِيَ الشَّجَرَةُ المُبَارَكَةُ الَّتِي تَزِينُ جِبَالَ الجَزَائِرِ وَسُهُولَهَا. يَعْتَنِي الفَلَّاحُ بِهَا فَيَسْقِيهَا وَيُقَلِّمُ أَغْصَانَهَا، وَفِي فَصْلِ الخَرِيفِ تَجْتَمِعُ الأُسْرَةُ لِجَنْيِ حَبَّاتِ الزَّيْتُونِ وَعَصْرِ الزَّيْتِ الطَّيِّبِ. مَا أَنْفَعَ هَذِهِ الشَّجَرَةَ!',
				q1: 'مَتَى تَجْتَمِعُ الأُسْرَةُ لِجَنْيِ الزَّيْتُونِ؟',
				a1: 'تَجْتَمِعُ فِي فَصْلِ الخَرِيفِ.',
				q2: 'كَيْفَ يَعْتَنِي الفَلَّاحُ بِشَجَرَةِ الزَّيْتُونِ؟',
				a2: 'يَسْقِيهَا وَيُقَلِّمُ أَغْصَانَهَا.',
				q3: 'اسْتَخْرِجْ مِنَ النَّصِّ جُمْلَةَ تَعَجُّبٍ.',
				a3: 'جُمْلَةُ التَّعَجُّبِ هِيَ: «مَا أَنْفَعَ هَذِهِ الشَّجَرَةَ!».',
				mcqPrompt: 'فِي أَيِّ فَصْلٍ تَجْتَمِعُ الأُسْرَةُ لِجَنْيِ حَبَّاتِ الزَّيْتُونِ حَسَبَ النَّصِّ؟',
				correct: 'فَصْلُ الخَرِيفِ',
				distractors: [
					{ text: 'فَصْلُ الصَّيْفِ', diagnosticFeedback: 'اقْرَأِ الجُمْلَةَ الثَّانِيَةَ مِنَ النَّصِّ بِتَأَنٍّ.' },
					{ text: 'فَصْلُ الرَّبِيعِ', diagnosticFeedback: 'لَمْ يُذْكَرْ فَصْلُ الرَّبِيعِ فِي النَّصِّ.' },
					{ text: 'فَصْلُ الشِّتَاءِ', diagnosticFeedback: 'ابْحَثْ عَنْ كَلِمَةِ «فَصْلِ» دَاخِلَ النَّصِّ.' }
				]
			},
			{
				title: 'العِلْمُ نُورٌ',
				text: 'قَالَ الإِمَامُ عَبْدُ الحَمِيدِ بْنُ بَادِيسَ رَحِمَهُ اللَّهُ يَدْعُو أَبْنَاءَ الجَزَائِرِ إِلَى طَلَبِ العِلْمِ وَالتَّمَسُّكِ بِالإِسْلَامِ وَاللُّغَةِ العَرَبِيَّةِ. فَهَذَا العَالِمُ الجَلِيلُ هُوَ الَّذِي فَتَحَ المَدَارِسَ لِتَعْلِيمِ الأَطْفَالِ. مَا أَجْمَلَ طَلَبَ العِلْمِ النَّافِعِ!',
				q1: 'إِلَى مَاذَا دَعَا الإِمَامُ عَبْدُ الحَمِيدِ بْنُ بَادِيسَ أَبْنَاءَ الجَزَائِرِ؟',
				a1: 'دَعَاهُمْ إِلَى طَلَبِ العِلْمِ وَالتَّمَسُّكِ بِالإِسْلَامِ وَاللُّغَةِ العَرَبِيَّةِ.',
				q2: 'لِمَاذَا فَتَحَ الإِمَامُ بْنُ بَادِيسَ المَدَارِسَ؟',
				a2: 'فَتَحَهَا لِتَعْلِيمِ الأَطْفَالِ.',
				q3: 'اسْتَخْرِجْ مِنَ النَّصِّ جُمْلَةَ تَعَجُّبٍ.',
				a3: 'جُمْلَةُ التَّعَجُّبِ هِيَ: «مَا أَجْمَلَ طَلَبَ العِلْمِ النَّافِعِ!».',
				mcqPrompt: 'مَنْ العَالِمُ الجَزَائِرِيُّ الَّذِي تَحَدَّثَ عَنْهُ النَّصُّ؟',
				correct: 'الإِمَامُ عَبْدُ الحَمِيدِ بْنُ بَادِيسَ رَحِمَهُ اللَّهُ',
				distractors: [
					{ text: 'طَبِيبٌ فِي القَرْيَةِ', diagnosticFeedback: 'اقْرَأِ السَّطْرَ الأَوَّلَ مِنَ النَّصِّ.' },
					{ text: 'بَحَّارٌ فِي المِينَاءِ', diagnosticFeedback: 'لَمْ يُذْكَرِ البَحَّارُ فِي النَّصِّ.' },
					{ text: 'فَلَّاحٌ فِي البُسْتَانِ', diagnosticFeedback: 'ارْجِعْ إِلى أَوَّلِ النَّصِّ لِتَجِدَ اسْمَ العَالِمِ الجَلِيلِ.' }
				]
			}
		] as const;

		const p = rng.pick(passages);
		const mcq = buildUniqueMcqOptions(p.correct, [...p.distractors], rng);

		const content: ContentBlock[] = [
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
			templateId: 'arb_tpl_2ap_t3_reading_homeland_science',
			seed,
			grade: '2ap',
			trimesterId: 't3',
			difficulty,
			domain: 'reading_comprehension',
			titleAr: 'البِنَاءُ الفِكْرِيُّ: فَهْمُ نَصٍّ حَوْلَ الوَطَنِ وَالعِلْمِ',
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
				explanation: `نَجِدُ الجَوَابَ وَاضِحًا فِي النَّصِّ: ${p.correct}.`
			},
			sujetExercise: {
				customTitle: 'البِنَاءُ الفِكْرِيُّ (القِرَاءَةُ وَالفَهْمُ)',
				points: 3,
				instruction: 'اقْرَأِ النَّصَّ المَشْكُولَ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ التَّالِيَةِ:',
				content
			},
			hints: [
				'اقْرَأِ النَّصَّ بِتَمَعُّنٍ مَرَّتَيْنِ قَبْلَ الإِجَابَةِ.',
				'جُمْلَةُ التَّعَجُّبِ تَبْدَأُ بِـ «مَا أَفْعَلَ...» وَتَنْتَهِي بِعَلَامَةِ (!).',
				`الإِجَابَةُ الصَّحِيحَةُ هِيَ: ${p.correct}.`
			],
			solutionStepsAr: [p.a1, p.a2, p.a3],
			finalAnswer: p.correct
		};
	}
};

// ---------------------------------------------------------------------------
// 2. Linguistic Building 1: Demonstratives & Relative Pronouns
// ---------------------------------------------------------------------------
const tplRelativesDemonstratives: ArabicParameterizedTemplate = {
	id: 'arb_tpl_2ap_t3_relatives_demonstratives',
	grade: '2ap',
	trimesterId: 't3',
	domain: 'grammar_irab',
	titleAr: 'أَسْمَاءُ الإِشَارَةِ وَالأَسْمَاءُ المَوْصُولَةُ (الَّذِي — الَّتِي)',
	curriculumLessonId: 'arb_lesson_2ap_t3_demonstratives_relatives',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 602);
		const demoItems = [
			{ sentence: '...... تَلَامِيذُ مُجْتَهِدُونَ يَحْتَرِمُونَ المُعَلِّمَ.', correct: 'هَؤُلَاءِ' },
			{ sentence: '...... أَشْجَارٌ مُثْمِرَةٌ فِي البُسْتَانِ.', correct: 'هَذِهِ' },
			{ sentence: '...... وَطَنِي الغَالِي الجَزَائِرُ.', correct: 'هَذَا' }
		] as const;

		const relItems = [
			{
				sentence: 'نَجَحَ التِّلْمِيذُ ...... اجْتَهَدَ فِي دُرُوسِهِ.',
				correct: 'الَّذِي',
				wrongs: ['الَّتِي', 'هَؤُلَاءِ', 'هَذِهِ']
			},
			{
				sentence: 'شَكَرْتُ المُعَلِّمَةَ ...... عَلَّمَتْنَا القِرَاءَةَ.',
				correct: 'الَّتِي',
				wrongs: ['الَّذِي', 'هَؤُلَاءِ', 'هَذَا']
			},
			{
				sentence: 'أُحِبُّ القِصَّةَ ...... تَتَحَدَّثُ عَنِ الأَمَانَةِ.',
				correct: 'الَّتِي',
				wrongs: ['الَّذِي', 'هَؤُلَاءِ', 'هُوَ']
			},
			{
				sentence: 'أَحْتَرِمُ الفَلَّاحَ ...... يَغْرِسُ الأَشْجَارَ.',
				correct: 'الَّذِي',
				wrongs: ['الَّتِي', 'هَؤُلَاءِ', 'هِيَ']
			}
		] as const;

		const demo = rng.pick(demoItems);
		const rel = rng.pick(relItems);

		const mcq = buildUniqueMcqOptions(
			rel.correct,
			rel.wrongs.map((w) => ({
				text: w,
				diagnosticFeedback: `تَأَمَّلِ الاِسْمَ قَبْلَ الفَرَاغِ فِي «${rel.sentence}»؛ المَوْصُولُ المُنَاسِبُ هُوَ «${rel.correct}».`
			})),
			rng
		);

		const qText = `اخْتَرِ الاِسْمَ المَوْصُولَ المُنَاسِبَ: «${rel.sentence}»`;

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) أَكْمِلْ بِاسْمِ الإِشَارَةِ المُنَاسِبِ (هَذَا — هَذِهِ — هَؤُلَاءِ):\n${demo.sentence}`,
				answer: demo.sentence.replace('......', demo.correct),
				mark: '1'
			},
			{
				type: 'text',
				content: `2) أَكْمِلْ بِـ «الَّذِي» أَوْ «الَّتِي»:\n${rel.sentence}`,
				answer: rel.sentence.replace('......', rel.correct),
				mark: '1'
			}
		];

		return {
			templateId: 'arb_tpl_2ap_t3_relatives_demonstratives',
			seed,
			grade: '2ap',
			trimesterId: 't3',
			difficulty,
			domain: 'grammar_irab',
			titleAr: 'أَسْمَاءُ الإِشَارَةِ وَالأَسْمَاءُ المَوْصُولَةُ (الَّذِي — الَّتِي)',
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
				explanation: `نَخْتَارُ «${rel.correct}»: «${rel.sentence.replace('......', rel.correct)}»`
			},
			sujetExercise: {
				customTitle: 'البِنَاءُ اللُّغَوِيُّ (الإِشَارَةُ وَالمَوْصُولُ)',
				points: 2,
				instruction: 'أَكْمِلِ الجُمْلَتَيْنِ بِاسْمِ الإِشَارَةِ وَالاِسْمِ المَوْصُولِ المُنَاسِبَيْنِ:',
				content
			},
			hints: [
				'«هَؤُلَاءِ» لِجَمْعِ العَاقِلِ، وَ«هَذِهِ» لِلْمُفْرَدَةِ المُؤَنَّثَةِ وَجَمْعِ غَيْرِ العَاقِلِ.',
				'«الَّذِي» لِلْمُفْرَدِ المُذَكَّرِ وَ«الَّتِي» لِلْمُفْرَدِ المُؤَنَّثِ.',
				`الاِسْمُ المَوْصُولُ الصَّحِيحُ هُوَ: «${rel.correct}».`
			],
			solutionStepsAr: [
				`الجُمْلَةُ الأُولَى: ${demo.sentence.replace('......', demo.correct)}`,
				`الجُمْلَةُ الثَّانِيَةُ: ${rel.sentence.replace('......', rel.correct)}`
			],
			finalAnswer: rel.correct
		};
	}
};

// ---------------------------------------------------------------------------
// 3. Linguistic Building 2: Interrogative/Exclamation Styles & Punctuation
// ---------------------------------------------------------------------------
const tplStylesPunctuation: ArabicParameterizedTemplate = {
	id: 'arb_tpl_2ap_t3_styles_punctuation',
	grade: '2ap',
	trimesterId: 't3',
	domain: 'spelling_imla',
	titleAr: 'الاِسْتِفْهَامُ وَالتَّعَجُّبُ وَعَلَامَاتُ التَّرْقِيمِ',
	curriculumLessonId: 'arb_lesson_2ap_t3_punctuation_marks',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 603);
		const exclItems = [
			{ plain: 'الحَدِيقَةُ جَمِيلَةٌ.', excl: 'مَا أَجْمَلَ الحَدِيقَةَ!' },
			{ plain: 'البَحْرُ وَاسِعٌ.', excl: 'مَا أَوْسَعَ البَحْرَ!' },
			{ plain: 'القِسْمُ نَظِيفٌ.', excl: 'مَا أَنْظَفَ القِسْمَ!' }
		] as const;

		const punctCases = [
			{
				sentence: 'مَتَى نَذْهَبُ إِلَى زِيَارَةِ جَدِّي (...)',
				correct: 'عَلَامَةُ الاِسْتِفْهَامِ (؟)',
				symbol: '؟',
				wrongs: ['عَلَامَةُ التَّعَجُّبِ (!)', 'النُّقْطَتَانِ (:)', 'الفَاصِلَةُ (،)']
			},
			{
				sentence: 'مَا أَعْذَبَ مَاءَ اليَنْبُوعِ (...)',
				correct: 'عَلَامَةُ التَّعَجُّبِ (!)',
				symbol: '!',
				wrongs: ['عَلَامَةُ الاِسْتِفْهَامِ (؟)', 'النُّقْطَتَانِ (:)', 'الفَاصِلَةُ (،)']
			},
			{
				sentence: 'قَالَ المُعَلِّمُ (...) الصِّدْقُ يُنْجِي صَاحِبَهُ.',
				correct: 'النُّقْطَتَانِ (:)',
				symbol: ':',
				wrongs: ['عَلَامَةُ الاِسْتِفْهَامِ (؟)', 'عَلَامَةُ التَّعَجُّبِ (!)', 'النُّقْطَةُ (.)']
			}
		] as const;

		const excl = rng.pick(exclItems);
		const punct = rng.pick(punctCases);

		const mcq = buildUniqueMcqOptions(
			punct.correct,
			punct.wrongs.map((w) => ({
				text: w,
				diagnosticFeedback: `اقْرَأْ جُمْلَةَ «${punct.sentence}» بِتَأَنٍّ؛ العَلَامَةُ المُنَاسِبَةُ هِيَ ${punct.correct}.`
			})),
			rng
		);

		const qText = `مَا عَلَامَةُ التَّرْقِيمِ المُنَاسِبَةُ مَكَانَ النُّقَطِ فِي الجُمْلَةِ: «${punct.sentence}»؟`;

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) حَوِّلِ الجُمْلَةَ التَّالِيَةَ إِلَى أُسْلُوبِ تَعَجُّبٍ:\n«${excl.plain}»\n................................................................`,
				answer: excl.excl,
				mark: '1'
			},
			{
				type: 'text',
				content: `2) ضَعْ عَلَامَةَ التَّرْقِيمِ المُنَاسِبَةَ (. ، ؟ ! :) مَكَانَ النُّقَطِ:\n${punct.sentence}`,
				answer: punct.sentence.replace('(...)', punct.symbol),
				mark: '1'
			}
		];

		return {
			templateId: 'arb_tpl_2ap_t3_styles_punctuation',
			seed,
			grade: '2ap',
			trimesterId: 't3',
			difficulty,
			domain: 'spelling_imla',
			titleAr: 'الاِسْتِفْهَامُ وَالتَّعَجُّبُ وَعَلَامَاتُ التَّرْقِيمِ',
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
				explanation: `نَضَعُ ${punct.correct}: «${punct.sentence.replace('(...)', punct.symbol)}»`
			},
			sujetExercise: {
				customTitle: 'البِنَاءُ اللُّغَوِيُّ (الأَسَالِيبُ وَالتَّرْقِيمُ)',
				points: 2,
				instruction: 'صُغْ أُسْلُوبَ التَّعَجُّبِ ثُمَّ ضَعْ عَلَامَةَ التَّرْقِيمِ الصَّحِيحَةَ:',
				content
			},
			hints: [
				'صِيغَةُ التَّعَجُّبِ هِيَ: مَا أَفْعَلَ ...! (مِثْلَ: مَا أَجْمَلَ ...!).',
				'السُّؤَالُ يَنْتَهِي بِـ (؟)، التَّعَجُّبُ بِـ (!)، وَبَعْدَ القَوْلِ نَضَعُ (:).',
				`العَلَامَةُ الصَّحِيحَةُ هِيَ: ${punct.correct}.`
			],
			solutionStepsAr: [
				`التَّحْوِيلُ إِلى تَعَجُّبٍ: ${excl.excl}`,
				`وَضْعُ عَلَامَةِ التَّرْقِيمِ: ${punct.sentence.replace('(...)', punct.symbol)}`
			],
			finalAnswer: punct.correct
		};
	}
};

// ---------------------------------------------------------------------------
// 4. Integration: Order Sentences & Produce Short Paragraph with Punctuation
// ---------------------------------------------------------------------------
const tplIntegrationShortParagraph2apT3: ArabicParameterizedTemplate = {
	id: 'arb_tpl_2ap_t3_integration_short_paragraph',
	grade: '2ap',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'الوَضْعِيَّةُ الإِدْمَاجِيَّةُ: إِنْتَاجُ فِقْرَةٍ قَصِيرَةٍ عَنْ رِحْلَةٍ فِي وَطَنِي',
	curriculumLessonId: 'arb_lesson_2ap_t3_order_sentences_paragraph',
	defaultPoints: 3,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 604);
		const trips = [
			{
				context: 'ذَهَبْتَ مَعَ أُسْرَتِكَ فِي رِحْلَةٍ إِلَى بُسْتَانٍ أَخْضَرَ فِي فَصْلِ الرَّبِيعِ.',
				ordered: [
					'فِي فَصْلِ الرَّبِيعِ، ذَهَبْنَا مَعَ أُسْرَتِي إِلَى بُسْتَانٍ جَمِيلٍ.',
					'شَاهَدْنَا الأَشْجَارَ الخَضْرَاءَ وَسَمِعْنَا زَقْزَقَةَ العَصَافِيرِ.',
					'حَمِدْنَا اللَّهَ وَقُلْنَا: مَا أَجْمَلَ طَبِيعَةَ وَطَنِنَا الجَزَائِرِ!'
				],
				paragraph: 'فِي فَصْلِ الرَّبِيعِ، ذَهَبْنَا مَعَ أُسْرَتِي إِلَى بُسْتَانٍ جَمِيلٍ، فَشَاهَدْنَا الأَشْجَارَ الخَضْرَاءَ وَسَمِعْنَا زَقْزَقَةَ العَصَافِيرِ، ثُمَّ حَمِدْنَا اللَّهَ وَقُلْنَا: مَا أَجْمَلَ طَبِيعَةَ وَطَنِنَا الجَزَائِرِ!'
			},
			{
				context: 'زُرْتَ مَكْتَبَةَ المَدِينَةِ مَعَ وَالِدِكَ لِاقْتِنَاءِ كُتُبٍ وَقِصَصٍ مُفِيدَةٍ.',
				ordered: [
					'يَوْمَ السَّبْتِ، ذَهَبْتُ مَعَ أَبِي إِلَى مَكْتَبَةِ المَدِينَةِ.',
					'تَجَوَّلْتُ بَيْنَ الرُّفُوفِ وَاخْتَرْتُ قِصَّةً عَنِ الصِّدْقِ وَالأَمَانَةِ.',
					'عُدْتُ مَسْرُورًا وَقُلْتُ: مَا أَنْفَعَ القِرَاءَةَ وَالمُطَالَعَةَ!'
				],
				paragraph: 'يَوْمَ السَّبْتِ، ذَهَبْتُ مَعَ أَبِي إِلَى مَكْتَبَةِ المَدِينَةِ، فَتَجَوَّلْتُ بَيْنَ الرُّفُوفِ وَاخْتَرْتُ قِصَّةً عَنِ الصِّدْقِ وَالأَمَانَةِ، ثُمَّ عُدْتُ مَسْرُورًا وَقُلْتُ: مَا أَنْفَعَ القِرَاءَةَ وَالمُطَالَعَةَ!'
			}
		] as const;

		const tr = rng.pick(trips);
		const shuffledLines = [
			`(1) ${tr.ordered[2]}`,
			`(2) ${tr.ordered[0]}`,
			`(3) ${tr.ordered[1]}`
		];
		const correctSeq = '(2) — (3) — (1)';
		const mcq = buildUniqueMcqOptions(
			correctSeq,
			[
				{ text: '(1) — (2) — (3)', diagnosticFeedback: 'الجُمْلَةُ (1) تُمَثِّلُ الخَاتِمَةَ وَالتَّعَجُّبَ فِي النِّهَايَةِ.' },
				{ text: '(3) — (2) — (1)', diagnosticFeedback: 'نَبْدَأُ أَوَّلًا بِذِكْرِ الزَّمَانِ وَالذَّهَابِ إِلَى المَكَانِ.' },
				{ text: '(2) — (1) — (3)', diagnosticFeedback: 'نَذْكُرُ مَا شَاهَدْنَاهُ أَوْ فَعَلْنَاهُ قَبْلَ الخَاتِمَةِ.' }
			],
			rng
		);

		const qText = `${tr.context}\nمَا التَّرْتِيبُ الصَّحِيحُ لِلْجُمَلِ التَّالِيَةِ لِتَكْوِينَ فِقْرَةٍ مُتَرَابِطَةٍ؟\n${shuffledLines.join('\n')}`;

		const content: ContentBlock[] = [
			buildWrittenProductionBlock({
				context: tr.context,
				supportQuote: shuffledLines.join('  |  '),
				instruction: 'رَتِّبِ الجُمَلَ الثَّلَاثَ فِي شَكْلِ فِقْرَةٍ قَصِيرَةٍ مُتَرَابِطَةٍ مُسْتَعْمِلًا حُرُوفَ الرَّبْطِ (فَـ / ثُمَّ) وَعَلَامَاتِ التَّرْقِيمِ (، : !).',
				rubricCriteria: [
					'تَرْتِيبُ الأَحْدَاثِ تَرْتِيبًا زَمَنِيًّا سَلِيمًا (1 ن)',
					'الرَّبْطُ بَيْنَ الجُمَلِ بِـ «فَـ» وَ«ثُمَّ» وَكِتَابَتُهَا فِي فِقْرَةٍ مُتَّصِلَةٍ (1 ن)',
					'تَوْظِيفُ عَلَامَاتِ التَّرْقِيمِ (، : !) وَسَلَامَةُ الإِمْلَاءِ وَالشَّكْلِ (1 ن)'
				],
				modelOutline: tr.paragraph,
				mark: '3'
			})
		];

		return {
			templateId: 'arb_tpl_2ap_t3_integration_short_paragraph',
			seed,
			grade: '2ap',
			trimesterId: 't3',
			difficulty,
			domain: 'integration',
			titleAr: 'الوَضْعِيَّةُ الإِدْمَاجِيَّةُ: إِنْتَاجُ فِقْرَةٍ قَصِيرَةٍ عَنْ رِحْلَةٍ فِي وَطَنِي',
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
				explanation: `التَّرْتِيبُ المَنْطِقِيُّ هُوَ ${correctSeq}؛ لِنُكَوِّنَ الفِقْرَةَ: «${tr.paragraph}»`
			},
			sujetExercise: {
				customTitle: 'الوَضْعِيَّةُ الإِدْمَاجِيَّةُ (الإِنْتَاجُ الكِتَابِيُّ)',
				points: 3,
				instruction: 'رَتِّبِ الجُمَلَ المَعْرُوضَةَ ثُمَّ اكْتُبْهَا فِي فِقْرَةٍ قَصِيرَةٍ مُتَرَابِطَةٍ:',
				content
			},
			hints: [
				'ابْحَثْ عَنْ جُمْلَةِ البِدَايَةِ الَّتِي تَذْكُرُ الزَّمَانَ وَالوِجْهَةَ.',
				'ضَعْ جُمْلَةَ التَّعَجُّبِ وَحَمْدِ اللَّهِ فِي الخَاتِمَةِ.',
				`التَّرْتِيبُ الصَّحِيحُ هُوَ: ${correctSeq}.`
			],
			solutionStepsAr: [
				`البِدَايَةُ: ${tr.ordered[0]}`,
				`الأَحْدَاثُ: ${tr.ordered[1]}`,
				`الخَاتِمَةُ: ${tr.ordered[2]}`
			],
			finalAnswer: correctSeq
		};
	}
};

export const TEMPLATES_2AP_T3: ArabicParameterizedTemplate[] = [
	tplReadingHomelandScience,
	tplRelativesDemonstratives,
	tplStylesPunctuation,
	tplIntegrationShortParagraph2apT3
];
