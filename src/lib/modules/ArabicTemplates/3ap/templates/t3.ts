import type {
	ArabicGeneratedExerciseInstance,
	ArabicParameterizedTemplate,
	Difficulty
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildIrabTableBlock,
	buildProsePassageBlock,
	buildWrittenProductionBlock
} from '../../arabic-helpers';
import {
	buildIllustratedFigureBlock,
	type IllustrationId
} from '../../../VisualAssets/illustrations-registry';

// ═══════════════════════════════════════════════════════════════════════════════
// 1. البناء الفكري (3 ن) — الرياضة والصحة وطلب العلم
// ═══════════════════════════════════════════════════════════════════════════════
const readingComp3apT3: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3ap_t3_reading_comprehension',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'reading_comprehension',
	titleAr: 'السند والبناء الفكري: الصحة وطلب العلم والعمل',
	curriculumLessonId: 'arb_lesson_3ap_t3_kana_sisters_basic',
	defaultPoints: 3,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const passages = [
			{
				title: 'العَقْلُ السَّلِيمُ فِي الجِسْمِ السَّلِيمِ',
				paragraphs: [
					'يُحَافِظُ المُسْلِمُ عَلَى صِحَّتِهِ بِتَنَاوُلِ الغِذَاءِ الصِّحِّيِّ وَمُمَارَسَةِ الرِّيَاضَةِ المُنْتَظِمَةِ. فَقَدْ [[أَصْبَحَ]] [[التِّلْمِيذُ]] النَّشِيطُ قَادِراً عَلَى الفَهْمِ وَالاِسْتِيعَابِ بِسُهُولَةٍ.',
					'لِذَلِكَ يَجِبُ عَلَيْنَا غَسْلُ اليَدَيْنِ قَبْلَ الأَكْلِ وَبَعْدَهُ، وَتَجَنُّبُ الأَطْعِمَةِ المَكْشُوفَةِ، وَالنَّوْمُ البَاكِرُ حَتَّى تَبْقَى أَجْسَامُنَا قَوِيَّةً وَسَلِيمَةً.'
				],
				author: 'نص تربوي في الصحة والرياضة',
				vocabulary: [
					{ word: 'المُنْتَظِمَةِ', meaning: 'المستمرة بانتظام' },
					{ word: 'المَكْشُوفَةِ', meaning: 'غير المغطاة والمعرضة للغبار' }
				],
				bestTitle: 'كيف نحافظ على صحتنا',
				wrongTitles: [
					{ text: 'رحلة إلى الصحراء الكبرى', diagnosticFeedback: 'النص يتحدث عن التغذية والرياضة والصحة.' },
					{ text: 'أنواع الطيور المهاجرة', diagnosticFeedback: 'لم تُذكر الطيور في هذا النص.' },
					{ text: 'صناعة السفن القديمة', diagnosticFeedback: 'الموضوع الأساسي هو المحافظة على الصحة.' }
				],
				compQ: 'كَيْفَ يُحَافِظُ المُسْلِمُ عَلَى صِحَّتِهِ حَسَبَ النَّصِّ؟',
				compA: 'بتناول الغذاء الصحي، وممارسة الرياضة المنتظمة، وغسل اليدين، وتجنب الأطعمة المكشوفة، والنوم الباكر.',
				vocabQ: 'هَاتِ مِنَ النَّصِّ مُرَادِفَ كَلِمَةِ «الاِبْتِعَادُ عَنْ»، وَضِدَّ كَلِمَةِ «ضَعِيفَةً».',
				vocabA: 'مرادف «الاِبْتِعَادُ عَنْ»: تَجَنُّبُ — ضدّ «ضَعِيفَةً»: قَوِيَّةً.'
			},
			{
				title: 'طَلَبُ العِلْمِ وَالمُطَالَعَةُ',
				paragraphs: [
					'المُطَالَعَةُ غِذَاءُ العَقْلِ وَمِفْتَاحُ التَّفَوُّقِ. كَانَ [[العُلَمَاءُ]] الجَزَائِرِيُّونَ مِثْلُ الإِمَامِ عَبْدِ الحَمِيدِ بْنِ بَادِيسَ يَحُثُّونَ النَّاشِئَةَ عَلَى [[القِرَاءَةِ]] وَطَلَبِ العِلْمِ النَّافِعِ.',
					'اِجْعَلْ لَكَ وَقْتاً يَوْمِيّاً تَقْرَأُ فِيهِ كِتَاباً مُفِيداً؛ فَالقِرَاءَةُ تُثْرِي لُغَتَكَ العَرَبِيَّةَ وَتُعَلِّمُكَ الأَخْلَاقَ الحَسَنَةَ.'
				],
				author: 'نص تربوي في طلب العلم',
				vocabulary: [
					{ word: 'النَّاشِئَةَ', meaning: 'الصغار والشباب' },
					{ word: 'تُثْرِي', meaning: 'تُغني وتزيد' }
				],
				bestTitle: 'أهمية المطالعة وطلب العلم',
				wrongTitles: [
					{ text: 'أدوات النجار في الورشة', diagnosticFeedback: 'النص يتحدث عن القراءة والعلم.' },
					{ text: 'فصل الربيع في القرية', diagnosticFeedback: 'لا يتناول النص فصل الربيع.' },
					{ text: 'لعبة كرة السلة', diagnosticFeedback: 'موضوع النص هو المطالعة والكتب المفيدة.' }
				],
				compQ: 'عَلَامَ كَانَ الإِمَامُ ابْنُ بَادِيسَ يَحُثُّ النَّاشِئَةَ؟ وَمَا فَائِدَةُ القِرَاءَةِ؟',
				compA: 'كان يحثّ الناشئة على القراءة وطلب العلم النافع، والقراءة تُثري لغتنا العربية وتعلّمنا الأخلاق الحسنة.',
				vocabQ: 'هَاتِ مِنَ النَّصِّ مُرَادِفَ كَلِمَةِ «تُغْنِي»، وَضِدَّ كَلِمَةِ «السَّيِّئَةَ».',
				vocabA: 'مرادف «تُغْنِي»: تُثْرِي — ضدّ «السَّيِّئَةَ»: الحَسَنَةَ.'
			},
			{
				title: 'قِيمَةُ العَمَلِ وَالإِتْقَانِ',
				paragraphs: [
					'يَبْدَأُ الفَلَّاحُونَ وَالعُمَّالُ يَوْمَهُمْ بِنَشَاطٍ مُنْذُ الفَجْرِ، وَيُتْقِنُونَ أَعْمَالَهُمْ بِإِخْلَاصٍ. وَبِفَضْلِ جُهُودِهِمْ [[صَارَ]] [[المُجْتَمَعُ]] مُزْدَهِراً وَمُتَقَدِّماً.',
					'إِنَّ العَمَلَ الشَّرِيفَ عِبَادَةٌ وَشَرَفٌ لِلإِنْسَانِ، وَلَيْسَ الكَسَلُ مِنْ صِفَاتِ المُؤْمِنِ النَّاجِحِ.'
				],
				author: 'نص تربوي في قيمة العمل',
				vocabulary: [
					{ word: 'يُتْقِنُونَ', meaning: 'يُحسنون ويجيدون العمل' },
					{ word: 'مُزْدَهِراً', meaning: 'متطوراً وغنياً بالخير' }
				],
				bestTitle: 'العمل وإتقانه أساس التقدم',
				wrongTitles: [
					{ text: 'حكاية الأرنب والسلحفاة', diagnosticFeedback: 'النص يتحدث عن العمال وإتقان العمل.' },
					{ text: 'الطقس الممطر في الشتاء', diagnosticFeedback: 'لا علاقة للنص بالطقس.' },
					{ text: 'زيارة متحف المجاهد', diagnosticFeedback: 'النص يعالج قيمة العمل ونبذ الكسل.' }
				],
				compQ: 'مَتَى يَبْدَأُ الفَلَّاحُونَ وَالعُمَّالُ يَوْمَهُمْ؟ وَمَاذَا يُحَقِّقُ العَمَلُ المُتْقَنُ لِلمُجْتَمَعِ؟',
				compA: 'يبدؤون يومهم منذ الفجر بنشاط، والعمل المتقن يجعل المجتمع مزدهراً ومتقدماً.',
				vocabQ: 'هَاتِ مِنَ النَّصِّ مُرَادِفَ كَلِمَةِ «يُجِيدُونَ»، وَضِدَّ كَلِمَةِ «النَّشَاطُ».',
				vocabA: 'مرادف «يُجِيدُونَ»: يُتْقِنُونَ — ضدّ «النَّشَاطُ»: الكَسَلُ.'
			}
		];

		const p = rng.pick(passages);
		const mcq = buildUniqueMcqOptions(p.bestTitle, p.wrongTitles, rng);
		const plainPassage = p.paragraphs.join(' ').replace(/\[\[|\]\]/g, '');

		const quizQuestion: ArabicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `اقرأ السند الآتي ثم اختر العنوان الأنسب له:\n«${plainPassage}»`,
			questionTextAr: 'ما العنوان الأنسب للنص؟',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `العنوان المناسب هو «${p.bestTitle}» لأنه يلخّص الفكرة الأساسية في النص.`
		};

		const illustrationId: IllustrationId =
			p.title === 'العَقْلُ السَّلِيمُ فِي الجِسْمِ السَّلِيمِ'
				? 'pri_ara_05_fresh_fruits_honey_basket'
				: p.title === 'طَلَبُ العِلْمِ وَالمُطَالَعَةُ'
					? 'pri_ara_07_science_library_telescope'
					: 'pri_ara_03_algerian_village_orchard';

		const sujetExercise: ExerciseBlock = {
			customTitle: 'السند والبناء الفكري',
			points: 3,
			instruction: 'اقرأ السند بعناية ثم أجب عن الأسئلة الآتية:',
			content: [
				buildIllustratedFigureBlock(illustrationId, {
					mode: 'image_only',
					title: p.title,
					maxHeight: 112,
					width: '58%'
				}),
				buildProsePassageBlock({
					title: p.title,
					paragraphs: p.paragraphs,
					author: p.author,
					vocabulary: p.vocabulary
				}),
				{
					type: 'text',
					content: '1) ضع عنواناً مناسباً للنص.',
					answer: `العنوان المناسب: «${p.bestTitle}».`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) ${p.compQ}`,
					answer: p.compA,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) ${p.vocabQ}`,
					answer: p.vocabA,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			passageKind: 'prose',
			quizQuestion,
			sujetExercise,
			hints: [
				'اقرأ النص جيداً وحدد الفكرة المحورية التي يدور حولها.',
				'أجب عن سؤال الفهم بجملة كاملة ومفيدة من النص.',
				'تأكّد أن المرادف والضد موجودان في النص نفسه.'
			],
			solutionStepsAr: [
				`العنوان: «${p.bestTitle}».`,
				`الفهم: ${p.compA}`,
				`المفردات: ${p.vocabA}`
			],
			finalAnswer: p.bestTitle
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. البناء اللغوي 1 (2 ن) — كان وأخواتها المبسطة + إعراب نموذجي
// ═══════════════════════════════════════════════════════════════════════════════
const kanaPlurals3apT3: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3ap_t3_kana_plurals',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي: كان وأخواتها وإعرابها المبسط',
	curriculumLessonId: 'arb_lesson_3ap_t3_kana_sisters_basic',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cases = [
			{
				nominal: 'العِلْمُ نَافِعٌ.',
				sister: 'أَصْبَحَ',
				after: 'أَصْبَحَ العِلْمُ نَافِعاً.',
				irabEntries: [
					{ target: 'أَصْبَحَ', irab: 'فعلٌ ماضٍ ناقصٌ (من أخوات كان) مبنيٌّ على الفتح.', mark: '0.5' },
					{ target: 'العِلْمُ', irab: 'اسمُ «أَصْبَحَ» مرفوعٌ وعلامةُ رفعه الضمّةُ الظاهرةُ على آخره.', mark: '0.5' },
					{ target: 'نَافِعاً', irab: 'خبرُ «أَصْبَحَ» منصوبٌ وعلامةُ نصبه الفتحةُ الظاهرةُ على آخره.', mark: '0.5' }
				],
				mcqQ: 'أدخلْ «أَصْبَحَ» على الجملة «العِلْمُ نَافِعٌ». ما الضبطُ الصحيحُ؟',
				mcqCorrect: 'أَصْبَحَ العِلْمُ نَافِعاً.',
				mcqDistractors: [
					{ text: 'أَصْبَحَ العِلْمَ نَافِعٌ.', diagnosticFeedback: 'أخوات كان ترفع الأول وتنصب الثاني، وليس العكس.' },
					{ text: 'أَصْبَحَ العِلْمُ نَافِعٌ.', diagnosticFeedback: 'يجب نصب الخبر بالفتحة «نَافِعاً».' },
					{ text: 'أَصْبَحَ العِلْمَ نَافِعاً.', diagnosticFeedback: 'اسم «أَصْبَحَ» يكون مرفوعاً بالضمة لا منصوباً.' }
				]
			},
			{
				nominal: 'التِّلْمِيذُ مُجْتَهِدٌ.',
				sister: 'كَانَ',
				after: 'كَانَ التِّلْمِيذُ مُجْتَهِداً.',
				irabEntries: [
					{ target: 'كَانَ', irab: 'فعلٌ ماضٍ ناقصٌ مبنيٌّ على الفتح.', mark: '0.5' },
					{ target: 'التِّلْمِيذُ', irab: 'اسمُ «كَانَ» مرفوعٌ وعلامةُ رفعه الضمّةُ الظاهرةُ على آخره.', mark: '0.5' },
					{ target: 'مُجْتَهِداً', irab: 'خبرُ «كَانَ» منصوبٌ وعلامةُ نصبه الفتحةُ الظاهرةُ على آخره.', mark: '0.5' }
				],
				mcqQ: 'ما إعرابُ كلمةِ «مُجْتَهِداً» في جملة «كَانَ التِّلْمِيذُ مُجْتَهِداً»؟',
				mcqCorrect: 'خبرُ «كَانَ» منصوبٌ وعلامةُ نصبه الفتحةُ',
				mcqDistractors: [
					{ text: 'اسمُ «كَانَ» مرفوعٌ بالضمةِ', diagnosticFeedback: 'اسم «كان» هو «التِّلْمِيذُ»، أما «مُجْتَهِداً» فخبرها.' },
					{ text: 'فاعلٌ مرفوعٌ بالضمةِ', diagnosticFeedback: '«كان» فعل ناقص يأخذ اسماً وخبراً.' },
					{ text: 'اسمٌ مجرورٌ بالكسرةِ', diagnosticFeedback: 'لا يوجد حرف جرّ، والكلمة منصوبة بالفتحة.' }
				]
			},
			{
				nominal: 'الغِذَاءُ صِحِّيٌّ.',
				sister: 'صَارَ',
				after: 'صَارَ الغِذَاءُ صِحِّيّاً.',
				irabEntries: [
					{ target: 'صَارَ', irab: 'فعلٌ ماضٍ ناقصٌ (من أخوات كان) مبنيٌّ على الفتح.', mark: '0.5' },
					{ target: 'الغِذَاءُ', irab: 'اسمُ «صَارَ» مرفوعٌ وعلامةُ رفعه الضمّةُ الظاهرةُ على آخره.', mark: '0.5' },
					{ target: 'صِحِّيّاً', irab: 'خبرُ «صَارَ» منصوبٌ وعلامةُ نصبه الفتحةُ الظاهرةُ على آخره.', mark: '0.5' }
				],
				mcqQ: 'أدخلْ «صَارَ» على الجملة «الغِذَاءُ صِحِّيٌّ». ما الكتابةُ المضبوطةُ الصحيحةُ؟',
				mcqCorrect: 'صَارَ الغِذَاءُ صِحِّيّاً.',
				mcqDistractors: [
					{ text: 'صَارَ الغِذَاءُ صِحِّيٌّ.', diagnosticFeedback: 'يجب نصب الكلمة الثانية (الخبر) بعد «صَارَ».' },
					{ text: 'صَارَ الغِذَاءَ صِحِّيٌّ.', diagnosticFeedback: 'اسم «صار» يبقى مرفوعاً بالضمة.' },
					{ text: 'صَارَ الغِذَاءِ صِحِّيٍّ.', diagnosticFeedback: '«صار» لا تجرّ الأسماء.' }
				]
			}
		];

		const c = rng.pick(cases);
		const mcq = buildUniqueMcqOptions(c.mcqCorrect, c.mcqDistractors, rng);

		const quizQuestion: ArabicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: c.mcqQ,
			questionTextAr: c.mcqQ,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `تدخل «${c.sister}» على الجملة الاسمية فترفع الأول وتنصب الثاني: «${c.after}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'البناء اللغوي (كان وأخواتها)',
			points: 2,
			instruction: 'طبّق قاعدة كان وأخواتها وأعرب الجملة:',
			content: [
				{
					type: 'text',
					content: `1) أدخل «${c.sister}» على الجملة الاسمية الآتية واضبطها بالشكل التام: «${c.nominal}»`,
					answer: c.after,
					mark: '0.5'
				},
				{
					type: 'text',
					content: `2) أعرب كلمات الجملة «${c.after}» إعراباً نموذجياً:`
				},
				buildIrabTableBlock(c.irabEntries)
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'كان وأخواتها تدخل على الجملة الاسمية.',
				'يبقى الاسم الأول مرفوعاً بالضمة، ويتحوّل الثاني منصوباً بالفتحة.',
				'أعرب الناسخ: فعل ماضٍ ناقص مبني على الفتح.'
			],
			solutionStepsAr: [
				`بعد إدخال «${c.sister}»: ${c.after}`,
				...c.irabEntries.map((e) => `${e.target}: ${e.irab}`)
			],
			finalAnswer: c.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. البناء اللغوي 2 (2 ن) — همزة القطع والوصل + أنواع الجموع
// ═══════════════════════════════════════════════════════════════════════════════
const hamzaPlurals3apT3: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3ap_t3_hamza_plurals_spelling',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'spelling_imla',
	titleAr: 'الإملاء والصرف: همزة القطع والوصل وأنواع الجموع',
	curriculumLessonId: 'arb_lesson_3ap_t3_plural_types',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const banks = [
			{
				hamzaRows: [
					{ word: 'أَحْمَدُ', kind: 'همزة قطع' },
					{ word: 'اُكْتُبْ', kind: 'همزة وصل' },
					{ word: 'إِسْلَامٌ', kind: 'همزة قطع' },
					{ word: 'اِسْمٌ', kind: 'همزة وصل' }
				],
				pluralRows: [
					{ word: 'مُخْتَرِعُونَ', kind: 'جمع مذكر سالم' },
					{ word: 'طَبِيبَاتٌ', kind: 'جمع مؤنث سالم' },
					{ word: 'أَقْلَامٌ', kind: 'جمع تكسير' },
					{ word: 'مُعَلِّمُونَ', kind: 'جمع مذكر سالم' }
				],
				mcqQ: 'أيُّ كلمةٍ ممّا يلي هي **جمعُ تكسيرٍ**؟',
				mcqCorrect: 'أَقْلَامٌ',
				mcqDistractors: [
					{ text: 'مُخْتَرِعُونَ', diagnosticFeedback: '«مُخْتَرِعُونَ» جمع مذكر سالم ينتهي بـ (ونَ).' },
					{ text: 'طَبِيبَاتٌ', diagnosticFeedback: '«طَبِيبَاتٌ» جمع مؤنث سالم ينتهي بـ (ات).' },
					{ text: 'مُعَلِّمُونَ', diagnosticFeedback: '«مُعَلِّمُونَ» جمع مذكر سالم.' }
				]
			},
			{
				hamzaRows: [
					{ word: 'أُسْرَةٌ', kind: 'همزة قطع' },
					{ word: 'اِقْرَأْ', kind: 'همزة وصل' },
					{ word: 'إِلَى', kind: 'همزة قطع' },
					{ word: 'العِلْمُ', kind: 'همزة وصل' }
				],
				pluralRows: [
					{ word: 'مُجْتَهِدُونَ', kind: 'جمع مذكر سالم' },
					{ word: 'مُسْلِمَاتٌ', kind: 'جمع مؤنث سالم' },
					{ word: 'عُلَمَاءُ', kind: 'جمع تكسير' },
					{ word: 'كُتُبٌ', kind: 'جمع تكسير' }
				],
				mcqQ: 'ما نوعُ الهمزةِ في فعلِ الأمرِ «اِقْرَأْ»؟',
				mcqCorrect: 'همزةُ وصلٍ',
				mcqDistractors: [
					{ text: 'همزةُ قطعٍ فوق الألف', diagnosticFeedback: 'عند وضع الواو نقول «وَاقْرَأْ» فتسقط الهمزة في النطق.' },
					{ text: 'همزةُ قطعٍ تحت الألف', diagnosticFeedback: 'أمر الفعل الثلاثي همزته دائماً همزة وصل بلا همزة.' },
					{ text: 'همزةٌ متوسطةٌ', diagnosticFeedback: 'الهمزة في أول الكلمة إما وصل أو قطع.' }
				]
			},
			{
				hamzaRows: [
					{ word: 'أَكْرَمَ', kind: 'همزة قطع' },
					{ word: 'اِجْلِسْ', kind: 'همزة وصل' },
					{ word: 'أُمِّي', kind: 'همزة قطع' },
					{ word: 'اِبْنٌ', kind: 'همزة وصل' }
				],
				pluralRows: [
					{ word: 'فَلَّاحُونَ', kind: 'جمع مذكر سالم' },
					{ word: 'تِلْمِيذَاتٌ', kind: 'جمع مؤنث سالم' },
					{ word: 'مَسَاجِدُ', kind: 'جمع تكسير' },
					{ word: 'مُهَنْدِسَاتٌ', kind: 'جمع مؤنث سالم' }
				],
				mcqQ: 'أيُّ كلمةٍ ممّا يلي تبدأُ بـ**همزةِ وصلٍ**؟',
				mcqCorrect: 'اِبْنٌ',
				mcqDistractors: [
					{ text: 'أَكْرَمَ', diagnosticFeedback: '«أَكْرَمَ» همزة قطع تظهر بعد الواو (وَأَكْرَمَ).' },
					{ text: 'أُمِّي', diagnosticFeedback: '«أُمِّي» همزة قطع (وَأُمِّي).' },
					{ text: 'إِحْسَانٌ', diagnosticFeedback: '«إِحْسَانٌ» همزة قطع (وَإِحْسَانٌ).' }
				]
			}
		];

		const b = rng.pick(banks);
		const mcq = buildUniqueMcqOptions(b.mcqCorrect, b.mcqDistractors, rng);

		const quizQuestion: ArabicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: b.mcqQ,
			questionTextAr: b.mcqQ,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي: «${b.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الإملاء والصرف (الهمزة والجموع)',
			points: 2,
			instruction: 'صنّف الكلمات الآتية في الجدولين:',
			content: [
				{
					type: 'text',
					content: '1) بيّن نوع الهمزة (همزة قطع / همزة وصل) في الكلمات الآتية:'
				},
				{
					type: 'table',
					headers: ['الكلمة', 'نوع الهمزة'],
					cells: [],
					rows: b.hamzaRows.map((r) => [
						{ content: r.word, bold: true },
						{ content: '........................', answer: r.kind, mark: '0.25' }
					]),
					align: 'right',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				},
				{
					type: 'text',
					content: '2) حدّد نوع الجمع (مذكر سالم / مؤنث سالم / تكسير) لكل كلمة:'
				},
				{
					type: 'table',
					headers: ['الجمع', 'نوعه'],
					cells: [],
					rows: b.pluralRows.map((r) => [
						{ content: r.word, bold: true },
						{ content: '........................', answer: r.kind, mark: '0.25' }
					]),
					align: 'right',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'ضع حرف «وَ» قبل الكلمة: إذا نُطِقَت الهمزة فهي قطع، وإذا سقطت فهي وصل.',
				'جمع المذكر السالم ينتهي بـ (ونَ / ينَ)، وجمع المؤنث السالم بـ (ات).',
				'إذا تغيّرت صورة المفرد عند الجمع فهو جمع تكسير.'
			],
			solutionStepsAr: [
				...b.hamzaRows.map((r) => `${r.word}: ${r.kind}`),
				...b.pluralRows.map((r) => `${r.word}: ${r.kind}`)
			],
			finalAnswer: b.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. الوضعية الإدماجية (3 ن) — فقرة مترابطة من 4 إلى 6 أسطر
// ═══════════════════════════════════════════════════════════════════════════════
const integration3apT3: ArabicParameterizedTemplate = {
	id: 'arb_tpl_3ap_t3_written_integration',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: فقرة مترابطة عن العلم أو الصحة',
	curriculumLessonId: 'arb_lesson_3ap_t3_paragraph_writing_steps',
	defaultPoints: 3,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const topics = [
			{
				context: 'نصحك أستاذك بممارسة الرياضة وتناول الغذاء الصحي للمحافظة على جسمك وعقلك.',
				supportQuote: 'المؤمنُ القويُّ خيرٌ وأحبُّ إلى الله من المؤمنِ الضعيفِ، وفي كلٍّ خيرٌ.',
				instruction: 'اكتب فقرة مترابطة من 4 إلى 6 أسطر تتحدث فيها عن فوائد الرياضة والغذاء الصحي، وتقدّم نصائح لزملائك، موظفاً «أصبح» أو «كان» وجمع تكسير.',
				rubricCriteria: [
					'الملاءمة (موضوع الرياضة والغذاء الصحي في 4-6 أسطر): 1 ن',
					'الانسجام (مقدمة وعرض وخاتمة وأدوات ربط): 0.75 ن',
					'سلامة اللغة وتوظيف ناسخ من أخوات كان وجمع تكسير: 0.75 ن',
					'جودة الخط وعلامات الوقف: 0.5 ن'
				],
				modelOutline:
					'الصحة تاج على رؤوس الأصحاء، لذلك يجب أن نحافظ على أجسامنا كل يوم. فأنا أتناول الخضر والفواكه الطازجة، وأمارس رياضة الجري مع أصدقائي في الصباح. وبفضل ذلك أصبح الجسم نشيطاً والعقل مستعداً لطلب العلم. أنصحكم يا أصدقائي بالابتعاد عن الكسل والأطعمة الضارة.',
				mcqQ: 'أيُّ أداةِ ربطٍ تناسبُ الفراغَ: «مَارَسَ أَمِينٌ الرِّيَاضَةَ بِانْتِظَامٍ ....... أَصْبَحَ جِسْمُهُ قَوِيّاً»؟',
				mcqCorrect: 'فَـ (فَأَصْبَحَ)',
				mcqDistractors: [
					{ text: 'هَلْ', diagnosticFeedback: '«هَلْ» للاستفهام لا للربط بين السبب والنتيجة.' },
					{ text: 'أَوْ', diagnosticFeedback: '«أَوْ» للتخيير، وهنا الجملة الثانية نتيجة للأولى.' },
					{ text: 'لَكِنَّ', diagnosticFeedback: '«لَكِنَّ» للاستدراك بين معنيين مختلفين.' }
				]
			},
			{
				context: 'شاركتَ مع زملائك في مسابقة للمطالعة بمكتبة المدرسة، واستفدتَ كثيراً من قراءة القصص والكتب النافعة.',
				supportQuote: 'العلمُ نورٌ يرفعُ الإنسانَ، والكتابُ خيرُ جليسٍ في كلِّ زمانٍ.',
				instruction: 'اكتب فقرة مترابطة من 4 إلى 6 أسطر تذكر فيها أهمية المطالعة وما تعلمته من الكتب، موظفاً كلمة تبدأ بهمزة قطع وجمع مذكر سالماً.',
				rubricCriteria: [
					'الملاءمة (فوائد المطالعة في 4-6 أسطر): 1 ن',
					'الانسجام (ترابط الجمل وتدرج الأفكار): 0.75 ن',
					'سلامة اللغة وتوظيف همزة قطع وجمع مذكر سالم: 0.75 ن',
					'وضوح الخط وعلامات الوقف: 0.5 ن'
				],
				modelOutline:
					'أحبُّ المطالعة كثيراً لأنها تفتح أمامي أبواب المعرفة. أذهب مع زملائي المجتهدين إلى مكتبة المدرسة، ونختار قصصاً نافعة وكتباً علمية. بفضل القراءة صرتُ أكتب بخطٍّ جميلٍ وتعبيرٍ سليمٍ. فما أروع أن يكون الكتاب صديقنا الدائم!',
				mcqQ: 'ما الجملةُ التي تحتوي على **همزةِ قطعٍ** و**جمعِ مذكرٍ سالمٍ** معاً؟',
				mcqCorrect: 'أَذْهَبُ مَعَ زُمَلَائِي المُجْتَهِدِينَ إِلَى المَكْتَبَةِ.',
				mcqDistractors: [
					{ text: 'ذَهَبَ التَّلَامِيذُ مَعَ الأُسْتَاذِ.', diagnosticFeedback: '«التَّلَامِيذُ» جمع تكسير، و«ذَهَبَ» لا تبدأ بهمزة.' },
					{ text: 'قَرَأْتُ الكُتُبَ النَّافِعَةَ.', diagnosticFeedback: '«الكُتُبَ» جمع تكسير، وتبدأ بهمزة وصل.' },
					{ text: 'اِجْتَهِدْ فِي قِرَاءَةِ القِصَصِ.', diagnosticFeedback: '«اِجْتَهِدْ» همزة وصل، و«القِصَصِ» جمع تكسير.' }
				]
			}
		];

		const t = rng.pick(topics);
		const mcq = buildUniqueMcqOptions(t.mcqCorrect, t.mcqDistractors, rng);

		const quizQuestion: ArabicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: t.mcqQ,
			questionTextAr: t.mcqQ,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي: «${t.mcqCorrect}».`
		};

		const tIllustrationId: IllustrationId = t.context.includes('مكتبة')
			? 'pri_ara_07_science_library_telescope'
			: 'pri_ara_05_fresh_fruits_honey_basket';

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 3,
			content: [
				buildIllustratedFigureBlock(tIllustrationId, {
					mode: 'labeled',
					maxHeight: 112,
					width: '58%'
				}),
				buildWrittenProductionBlock({
					context: t.context,
					supportQuote: t.supportQuote,
					instruction: t.instruction,
					rubricCriteria: t.rubricCriteria,
					modelOutline: t.modelOutline,
					mark: '3'
				})
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'ابدأ ببياض ومقدمة قصيرة تعرّف بالموضوع.',
				'استعمل أدوات الربط وعلامات الوقف (، . !).',
				'راجع التوظيف المطلوب والإملاء قبل تسليم ورقتك.'
			],
			solutionStepsAr: [
				'الالتزام بعدد الأسطر (4 إلى 6 أسطر) وبنية الفقرة (مقدمة، عرض، خاتمة).',
				'مراجعة التوظيف النحوي والإملائي المطلوب.',
				`نموذج مقترح: ${t.modelOutline}`
			],
			finalAnswer: t.mcqCorrect
		};
	}
};

export const TEMPLATES_3AP_T3: ArabicParameterizedTemplate[] = [
	readingComp3apT3,
	kanaPlurals3apT3,
	hamzaPlurals3apT3,
	integration3apT3
];
