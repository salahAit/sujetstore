import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildArudScansionBlock,
	buildIrabTableBlock,
	buildPoetryPassageBlock
} from '../../arabic-helpers';
import type {
	ArabicGeneratedExerciseInstance,
	ArabicParameterizedTemplate,
	Difficulty,
	QuizQuestionPayload
} from '../../types';

/**
 * 3AS BAC Foreign Languages (لغات أجنبية — ARB-LE, coeff 5, 4h00, 10+6+4=20)
 * Parameterized Exam & Quiz Templates — Trimester 2 (4 templates)
 * Roles: intellectual_building (10 pts) + linguistic_building (6 pts with Tafila) + critical_evaluation (4 pts) + critical_evaluation alt (4 pts)
 */
export const TEMPLATES_3AS_LE_T2: ArabicParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. INTELLECTUAL BUILDING (10 pts — Poetry): الالتزام (الجزائر وفلسطين) والنزعة الإنسانية
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'arb_tpl_3as_le_t2_ib_iltizam_humanitarian',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'reading_comprehension',
		titleAr: 'البناء الفكري (شعر): الالتزام (الجزائر وفلسطين) والنزعة الإنسانية الحضارية',
		curriculumLessonId: 'arb_lesson_3as_le_t2_iltizam_algeria_palestine',
		defaultPoints: 10,
		onecRole: 'intellectual_building',
		generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'ملحمة الجزائر ووفاء الأجيال',
					author: 'الشاعر مفدي زكرياء رحمه الله',
					source: 'الإلياذة الجزائرية واللهب المقدس (مختارات)',
					verses: [
						['جَزَائِرُ يَا مَطْلَعَ [[المُعْجِزَاتْ]]', 'وَيَا حُجَّةَ اللهِ فِي الكَائِنَاتْ'],
						['وَيَا قِصَّةً ((خَطَّهَا بِالدِّمَاءِ))', 'شَهِيدٌ تَسَامَى عَلَى العَادِيَاتْ'],
						['بِحَقِّ الشَّهِيدِ وَصَوْتِ الوَطَنْ', 'نَصُونُ العُهُودَ وَنَبْنِي الزَّمَنْ'],
						['نَسِيرُ إِلَى المَجْدِ صَفّاً [[مَنِيعاً]]', 'فَأَوْرَاسُ يَشْهَدُ أَنَّا الوُفَاةُ']
					] as Array<[string, string]>,
					vocabulary: [
						{ word: 'العاديات', meaning: 'نوائب الزمن وقوى العدوان' },
						{ word: 'منيعاً', meaning: 'قوياً عصياً على الانكسار' }
					],
					theme: 'تمجيد الجزائر وتخليد بطولات الشهداء والعهد على مواصلة البناء وصون الاستقلال',
					tendency: 'النزعة الوطنية الثورية التحررية الممتزجة بالإيمان',
					values: 'قيمة تاريخية (تخليد الثورة والأوراس)، قيمة سياسية (السيادة ورفض الاستعمار)، وقيمة إنسانية (حق الحرية)',
					summaryModel:
						'يتغنى الشاعر بوطنه الجزائر وتضحيات شهدائها الأبرار، مؤكداً عزم الشعب المتحد على الوفاء لرسالة نوفمبر ومواصلة مسيرة المجد والبناء.',
					quizEasyCorrect: 'النزعة الوطنية الثورية التحررية في شعر الثورة الجزائرية',
					quizMediumCorrect: 'توظيف ضمير الجمع ورمز الأوراس والشهيد دليلاً على الالتزام',
					quizHardCorrect: 'قيمة تاريخية وسياسية وإنسانية تمجد الفداء والسيادة الوطنية'
				},
				{
					title: 'الفداء والصمود من أجل فلسطين والأقصى',
					author: 'إبراهيم طوقان وعبد الرحيم محمود (نموذج من شعر المقاومة)',
					source: 'مختارات شعر القضية الفلسطينية',
					verses: [
						['سَأَحْمِلُ [[رُوحِي]] عَلَى رَاحَتِي', 'وَأُلْقِي بِهَا فِي مَهَاوِي الرَّدَى'],
						['فَإِمَّا حَيَاةٌ ((تَسُرُّ الصَّدِيقَ))', 'وَإِمَّا مَمَاتٌ يَغِيظُ العِدَا'],
						['لَا تَسَلْ عَنْ سَلَامَتِهْ فِي الكِفَاحِ', 'رُوحُهُ فَوْقَ رَاحَتِهْ لِلْفَلَاحِ'],
						['لِقُدْسٍ [[عَزِيزٍ]] وَأَقْصَى شَرِيفٍ', 'نَصُونُ الحُقُوقَ بِعَزْمِ الكِفَاحِ']
					] as Array<[string, string]>,
					vocabulary: [
						{ word: 'مهاوي الردى', meaning: 'مواطن الخطر والشهادة' },
						{ word: 'الفلاح', meaning: 'النصر والنجاة والنجاح' }
					],
					theme: 'تمجيد شجاعة الفدائي الفلسطيني واستعداده للشهادة دفاعاً عن القدس والمسجد الأقصى',
					tendency: 'النزعة الوطنية الفلسطينية والدينية والتحررية',
					values: 'قيمة دينية (الذود عن المسجد الأقصى)، قيمة سياسية تحررية (مقاومة الاحتلال)، وقيمة إنسانية (الكرامة ورفض الذل)',
					summaryModel:
						'يجسد النص بطولة الفدائي الذي يقدم روحه طائعاً دفاعاً عن فلسطين والأقصى، رافضاً الاستسلام ومخيّراً نفسه بين حياة عزيزة أو شهادة مشرفة.',
					quizEasyCorrect: 'شعر المقاومة والفداء في القضية الفلسطينية',
					quizMediumCorrect: 'المقابلة الحاسمة بين الحياة الكريمة والشهادة لإبراز الإقدام والالتزام',
					quizHardCorrect: 'امتزاج النزعة الوطنية الفلسطينية بالنزعة الدينية والتحررية الإنسانية'
				},
				{
					title: 'الأخوة الإنسانية ونداء البناء الحضاري',
					author: 'الشاعر محمد العيد آل خليفة والشيخ أحمد سحنون (نموذج تربوي إنساني)',
					source: 'من الشعر الجزائري الإصلاحي الإنساني',
					verses: [
						['قُمْ يَا أَخِي نَزْرَعْ بِأَرْضِ العَالَمِ', 'خَيْراً وَعَدْلاً ((يَمْسَحَانِ الأَلَمَا))'],
						['إِنَّ الحَيَاةَ عَطَاءُ نَفْسٍ حُرَّةٍ', 'تَسْمُو بِإِيمَانٍ وَتَبْنِي [[القِيَمَا]]'],
						['لَا تَيْأَسَنْ إِنْ طَالَ لَيْلُ الغَافِلِ', 'فَالفَجْرُ يَبْسِمُ لِلَّذِي قَدْ أَقْدَمَا'],
						['بِالعِلْمِ وَالإِخْلَاصِ يَرْتَقِي البَشَرُ', 'وَيُزْهِرُ الكَوْنُ سَلَاماً [[وَهِمَمَا]]']
					] as Array<[string, string]>,
					vocabulary: [
						{ word: 'أقدما', meaning: 'بادر بشجاعة نحو العمل الصالح' },
						{ word: 'الغافل', meaning: 'المتكاسل المعرض عن الوعي والعمل' }
					],
					theme: 'الدعوة إلى الأخوة الإنسانية ونشر العدل والعلم والتفاؤل الإيماني لبناء الحضارة',
					tendency: 'النزعة الإنسانية والتأملية التفاؤلية والإصلاحية',
					values: 'قيمة إنسانية (التآخي والرحمة والعدل)، وقيمة حضارية وتربوية (العلم والإخلاص والأمل الفاعل)',
					summaryModel:
						'يدعو الشاعر الإنسان إلى زرع الخير والعدل ونبذ اليأس، مؤكداً أن رقي البشرية وازدهار الحضارة يتحققان بالعلم والإخلاص والإيمان والعطاء.',
					quizEasyCorrect: 'شعر النزعة الإنسانية والقيم الحضارية والتفاؤل الإيماني',
					quizMediumCorrect: 'تشخيص الطبيعة (الفجر يبسم) وتوظيف النداء والأمر لبعث الأمل',
					quizHardCorrect: 'تحقق الوحدة العضوية وتكامل النزعة الإنسانية مع القيم الحضارية الإيمانية'
				}
			];
			const chosen = rng.pick(pool);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = chosen.quizEasyCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'شعر اللهو والوصف العابث', diagnosticFeedback: 'النص جاد ورسالي يعالج قضايا وطنية أو إنسانية سامية.' },
						{ text: 'النثر العلمي المتأدب في عصر الضعف', diagnosticFeedback: 'النص شعر حديث موزون وليس نثراً.' },
						{ text: 'القصة القصيرة الساخرة', diagnosticFeedback: 'النص قصيدة شعرية وليس قصة نثرية.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما الاتجاه الفكري أو النزعة الرئيسة في نص «${chosen.title}» (${chosen.author})؟`,
					questionTextAr: 'اختر الاتجاه أو النزعة الصحيحة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `ينتمي النص إلى: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.quizMediumCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'البدء بالمقدمة الطللية والغزل التقليدي', diagnosticFeedback: 'النص يدخل مباشرة في موضوعه بروح معاصرة.' },
						{ text: 'الحياد السلبي والابتعاد عن قضايا الواقع', diagnosticFeedback: 'النص منخرط بقوة في قضايا الوطن والإنسان.' },
						{ text: 'تعمد الغموض والألغاز المعجمية', diagnosticFeedback: 'لغة النص مشرقة وموحية وواضحة المقصد.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما أبرز مظهر فني أو أسلوبي في أبيات «${chosen.title}»؟`,
					questionTextAr: 'اختر المظهر الأدق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `المظهر الأبرز هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.quizHardCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'تفكك الأبيات وتعدد الأغراض المتنافرة', diagnosticFeedback: 'تتمتع الأبيات بوحدة الموضوع والجو النفسي.' },
						{ text: 'قيمة اقتصادية تجارية صرفة', diagnosticFeedback: 'يحمل النص قيماً وطنية وتاريخية وإنسانية وحضارية.' },
						{ text: 'الدعوة إلى اليأس والاستسلام للواقع', diagnosticFeedback: 'النص يفيض بالأمل والعزم والثبات.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما القيم أو الخصائص النقدية العميقة المستخلصة من نص «${chosen.title}»؟`,
					questionTextAr: 'اختر الاستنتاج النقدي الأعمق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `القيم والاستنتاج الدقيق: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'البناء الفكري',
				points: 10,
				instruction: 'اقرأ السند الشعري الآتي قراءة متعمقة ثم أجب عن أسئلة البناء الفكري:',
				content: [
					buildPoetryPassageBlock({
						title: chosen.title,
						verses: chosen.verses,
						author: chosen.author,
						source: chosen.source,
						vocabulary: chosen.vocabulary
					}),
					{
						type: 'text',
						content: '1) ما القضية المحورية في النص؟ وما الموقف الوجداني والفكري للشاعر تجاهها؟',
						answer: `1) يدور النص حول ${chosen.theme}، وموقف الشاعر موقف التزام صادق وإيجابية تدعو للثبات والعطاء.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: '2) حدّد النزعة البارزة في النص، واستخرج قيمتين مختلفتين مع توضيحهما.',
						answer: `2) النزعة: ${chosen.tendency}. القيم: ${chosen.values}.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: '3) هل تحققت الوحدة العضوية في الأبيات؟ علّل إجابتك.',
						answer: '3) نعم، تحققت الوحدة العضوية لتناول القصيدة موضوعاً واحداً، وسيطرة جو نفسي متجانس، وترابط الأبيات ترابطاً معنوياً يمنع الحذف أو التقديم.',
						mark: '2'
					},
					{
						type: 'text',
						content: '4) لخّص مضمون القصيدة في فقرة مركزة بأسلوبك الخاص.',
						answer: `4) التلخيص المقترح: ${chosen.summaryModel}`,
						mark: '3'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't2',
				difficulty,
				domain: 'reading_comprehension',
				titleAr: this.titleAr,
				onecRole: 'intellectual_building',
				passageKind: 'poetry',
				quizQuestion,
				sujetExercise,
				hints: [
					'ميّز بدقة بين النزعة الوطنية والقومية والدينية والإنسانية حسب السند.',
					'لإثبات الوحدة العضوية اذكر أركانها الثلاثة: وحدة الموضوع + وحدة الجو النفسي + الترابط البنائي.',
					'حرر التلخيص بأسلوبك الشخصي في نحو ثلث حجم النص.'
				],
				solutionStepsAr: [
					`تحديد القضية المحورية: ${chosen.theme}.`,
					`استخراج النزعة (${chosen.tendency}) والقيم.`,
					'التحقق من الوحدة العضوية وتعليلها.',
					`صياغة التلخيص: ${chosen.summaryModel}`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. LINGUISTIC BUILDING (6 pts — Irab + Majaz + Cohesion + Simplified Tafila)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'arb_tpl_3as_le_t2_lb_irab_majaz_arud_le',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'rhetoric_balagha',
		titleAr: 'البناء اللغوي: الجمل التي لا محل لها، البدل والتمييز، المجاز، الاتساق، والتفعيلة المبسطة',
		curriculumLessonId: 'arb_lesson_3as_le_t2_qawaid_majaz_cohesion',
		defaultPoints: 6,
		onecRole: 'linguistic_building',
		generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					sentence: 'هَذَا [[البَطَلُ]] الَّذِي ((صَمَدَ فِي الأَوْرَاسِ)) أَكْثَرُ النَّاسِ [[وَفَاءً]] لِعَهْدِهِ.',
					irabRows: [
						{
							target: 'البَطَلُ / وَفَاءً',
							irab: 'البطلُ: بدل مطابق (أو عطف بيان) مرفوع بالضمة. وفاءً: تمييز نسبة منصوب بالفتحة (بعد أفعل التفضيل).',
							mark: '1'
						},
						{
							target: '((صَمَدَ فِي الأَوْرَاسِ))',
							irab: 'جملة صلة الموصول لا محل لها من الإعراب (بعد الاسم الموصول «الذي»).',
							mark: '1'
						}
					],
					majazAndCohesionQ:
						'2) حدّد نوع المجاز وعلاقته وسر بلاغته في «أَطْلَقَ القَائِدُ عَيْناً فِي المَدِينَةِ»، ثم استخرج مظهرين للاتساق من الجملة الأولى.',
					majazAndCohesionA:
						'2) «عيناً»: مجاز مرسل علاقته الجزئية (ذكر العين وأراد الجاسوس)، وأثره الإيجاز والدقة وتأكيد اليقظة. ومن مظاهر الاتساق في الجملة الأولى: اسم الإشارة «هذا»، الاسم الموصول «الذي»، والإحالة القبلية بالضمير المتصل «الهاء» في «عهده».',
					arud: {
						verseSadr: 'وَقَفْنَا عَلَى قِمَّةِ الفَجْرِ نَشْدُو',
						verseAjuz: 'وَنَمْضِي',
						arudWriting: 'وَقَفْنَا - عَلَى قِمْ - مَتِلْفَجْ - رِنَشْدُو — وَنَمْضِي',
						symbols: '||0|0 - ||0|0 - ||0|0 - ||0|0 — ||0|0',
						tafilat: 'فَعُولُنْ - فَعُولُنْ - فَعُولُنْ - فَعُولُنْ (4 تفعيلات) — فَعُولُنْ (تفعيلة واحدة)',
						meterName: 'شعر التفعيلة على بحر المتقارب الصافي (فَعُولُنْ)'
					},
					quizEasyCorrect: 'مجاز مرسل علاقته الجزئية (أطلق الجزء وأراد الجاسوس كله)',
					quizMediumCorrect: 'جملة صلة الموصول لا محل لها من الإعراب',
					quizHardCorrect: 'شعر التفعيلة على بحر المتقارب الصافي (تفعيلة فَعُولُنْ ||0|0)'
				},
				{
					sentence: 'وَقَفَ المُجَاهِدُ [[صَامِداً]]، إِنَّ القُدْسَ — ((حَفِظَهَا اللهُ)) — تَسْكُنُ فِي ضَمِيرِ الأُمَّةِ.',
					irabRows: [
						{
							target: 'صَامِداً',
							irab: 'حال منصوبة وعلامة نصبها الفتحة الظاهرة (مشتق يبين هيئة الفاعل عند الوقوف).',
							mark: '1'
						},
						{
							target: '((حَفِظَهَا اللهُ))',
							irab: 'جملة اعتراضية دعائية لا محل لها من الإعراب (وقعت بين اسم إنّ وخبرها).',
							mark: '1'
						}
					],
					majazAndCohesionQ:
						'2) حدّد نوع المجاز وعلاقته وسر بلاغته في «بَنَى الأَمِيرُ المَدْرَسَةَ»، ثم اذكر قرينة اتساق من الجملة الأولى.',
					majazAndCohesionA:
						'2) «بنى الأمير المدرسة»: مجاز عقلي علاقته السببية (أُسند البناء للآمر به لا للمباشرين بيدهم)، وأثره الإيجاز والتعظيم. ومن قرائن الاتساق: الإحالة القبلية بالضمير المتصل «ها» في «حفظها» والضمير المستتر في «تسكن» العائدين على «القدس».',
					arud: {
						verseSadr: 'وَتَضِيءُ فِي أُفُقِ الكَرَامَةِ شَمْسُنَا',
						verseAjuz: 'لَا تَنْحَنِي',
						arudWriting: 'وَتَضِيءُفِي - أُفُقِلْكَرَا - مَتِشَمْسُنَا — لَاتَنْحَنِي',
						symbols: '|||0||0 - |||0||0 - |||0||0 — |0|0||0',
						tafilat: 'مُتَفَاعِلُنْ - مُتَفَاعِلُنْ - مُتَفَاعِلُنْ (3 تفعيلات) — مُتْفَاعِلُنْ (تفعيلة واحدة)',
						meterName: 'شعر التفعيلة على بحر الكامل الصافي (مُتَفَاعِلُنْ)'
					},
					quizEasyCorrect: 'مجاز عقلي علاقته السببية (إسناد البناء إلى الآمر والسبب)',
					quizMediumCorrect: 'جملة اعتراضية لا محل لها من الإعراب',
					quizHardCorrect: 'شعر التفعيلة على بحر الكامل الصافي (تفعيلة مُتَفَاعِلُنْ |||0||0)'
				},
				{
					sentence: 'لَوْ تَآخَى النَّاسُ ((لَزَالَ الشَّقَاءُ))، وَامْتَلَأَتِ القُلُوبُ [[سَكِينَةً]] وَاطْمِئْنَاناً.',
					irabRows: [
						{
							target: 'سَكِينَةً',
							irab: 'تمييز نسبة منصوب وعلامة نصبه الفتحة الظاهرة (بعد فعل الامتلاء «امتلأت»).',
							mark: '1'
						},
						{
							target: '((لَزَالَ الشَّقَاءُ))',
							irab: 'جملة جواب الشرط غير الجازم «لو» لا محل لها من الإعراب.',
							mark: '1'
						}
					],
					majazAndCohesionQ:
						'2) حدّد نوع المجاز وعلاقته وسر بلاغته في «وَاسْأَلِ القَرْيَةَ»، ثم اذكر رابطين حققا اتساق الجملة الأولى.',
					majazAndCohesionA:
						'2) «اسأل القرية»: مجاز مرسل علاقته المحلية (ذُكر المحل وأُريد أهله)، وأثره الإيجاز وتأكيد شمول الخبر. ومن روابط الاتساق: أداة الشرط «لو» واللام الواقعة في جوابها، وحرف العطف «الواو» الذي ربط بين الجملتين والمعطوفين.',
					arud: {
						verseSadr: 'سِرْنَا عَلَى دَرْبِ العُلَا لَا نَنْثَنِي',
						verseAjuz: 'نَحْوَ المُنَى',
						arudWriting: 'سِرْنَاعَلَى - دَرْبِلْعُلَا - لَانَنْثَنِي — نَحْوَلْمُنَى',
						symbols: '|0|0||0 - |0|0||0 - |0|0||0 — |0|0||0',
						tafilat: 'مُسْتَفْعِلُنْ - مُسْتَفْعِلُنْ - مُسْتَفْعِلُنْ (3 تفعيلات) — مُسْتَفْعِلُنْ (تفعيلة واحدة)',
						meterName: 'شعر التفعيلة على بحر الرجز الصافي (مُسْتَفْعِلُنْ)'
					},
					quizEasyCorrect: 'مجاز مرسل علاقته المحلية (ذكر المحل وإرادة أهله)',
					quizMediumCorrect: 'جملة جواب الشرط غير الجازم لو لا محل لها من الإعراب',
					quizHardCorrect: 'شعر التفعيلة على بحر الرجز الصافي (تفعيلة مُسْتَفْعِلُنْ |0|0||0)'
				}
			];
			const chosen = rng.pick(pool);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = chosen.quizEasyCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'تشبيه مفصل ذُكرت فيه جميع الأركان', diagnosticFeedback: 'لا توجد أداة تشبيه ولا وجه شبه في العبارة.' },
						{ text: 'جناس تام بين كلمتين متشابهتين في اللفظ', diagnosticFeedback: 'المطلوب تحليل صورة مجازية في علم البيان لا الجناس.' },
						{ text: 'طباق سلب بين الإثبات والنفي', diagnosticFeedback: 'لا يوجد طباق سلب في العبارة.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما التحليل البياني الصحيح للصورة المجازية المطلوبة في: «${chosen.majazAndCohesionQ.slice(3, 62)}...»؟`,
					questionTextAr: 'اختر نوع المجاز وعلاقته:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `${chosen.majazAndCohesionA}`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.quizMediumCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'جملة فعلية في محل نصب مفعول به', diagnosticFeedback: 'الجملة هنا من الجمل التي لا محل لها من الإعراب.' },
						{ text: 'جملة فعلية في محل جر مضاف إليه', diagnosticFeedback: 'لم تُسبق الجملة بظرف مضاف مثل إذا أو إذ.' },
						{ text: 'جملة فعلية في محل رفع خبر المبتدأ', diagnosticFeedback: 'راجع موقع الجملة بدقة.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما المحل الإعرابي للجملة بين قوسين في: «${chosen.sentence.replace(/\[\[|\]\]/g, '')}»؟`,
					questionTextAr: 'اختر المحل الإعرابي الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة الدقيقة: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.quizHardCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'البحر الطويل الممتزج (فعولن مفاعيلن)', diagnosticFeedback: 'السطران متفاوتا الطول ومبنيان على تفعيلة صافية واحدة.' },
						{ text: 'البحر البسيط الممتزج (مستفعلن فاعلن)', diagnosticFeedback: 'البسيط بحر ممتزج لا يُبنى عليه شعر التفعيلة.' },
						{ text: 'نثر مرسل خالٍ من الوزن تماماً', diagnosticFeedback: 'السطران موزونان بدقة على بحر صافٍ.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `عند تقطيع السطرين: «${chosen.arud.verseSadr}» / «${chosen.arud.verseAjuz}»، ما النظام الموسيقي والبحر الصافي؟`,
					questionTextAr: 'اختر الإجابة العروضية الصحيحة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التفعيلات: ${chosen.arud.tafilat} — ${chosen.arud.meterName}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'البناء اللغوي',
				points: 6,
				instruction: 'أجب عن أسئلة البناء اللغوي (إعراب، مجاز واتساق، وتقطيع مبسط لشعر التفعيلة):',
				content: [
					{
						type: 'text',
						content: `1) أعرب المفردات والجملة المبينة في: «${chosen.sentence.replace(/\[\[|\]\]/g, '')}»`
					},
					buildIrabTableBlock(chosen.irabRows),
					{
						type: 'text',
						content: chosen.majazAndCohesionQ,
						answer: chosen.majazAndCohesionA,
						mark: '2'
					},
					buildArudScansionBlock({
						...chosen.arud,
						mark: '2'
					})
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't2',
				difficulty,
				domain: 'rhetoric_balagha',
				titleAr: this.titleAr,
				onecRole: 'linguistic_building',
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكر الجمل التي لا محل لها: صلة الموصول، الاعتراضية، وجواب الشرط غير الجازم.',
					'فرّق بين المجاز العقلي (في إسناد الفعل) والمرسل (في اللفظ المفرد لعلاقة غير المشابهة).',
					'في شعر التفعيلة ضع الرموز (| و0) واستخرج التفعيلة المكررة واسم البحر الصافي.'
				],
				solutionStepsAr: [
					'إعراب البدل والحال والتمييز والجمل التي لا محل لها.',
					'تحليل المجاز ومظاهر الاتساق النصي.',
					`التقطيع العروضي: ${chosen.arud.tafilat} — ${chosen.arud.meterName}.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. CRITICAL EVALUATION (4 pts — Primary): الالتزام والثورة الجزائرية وفلسطين
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'arb_tpl_3as_le_t2_ce_iltizam_le',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'literary_criticism',
		titleAr: 'التقييم النقدي (4ن — أساسي): الالتزام وشعر الثورة الجزائرية والقضية الفلسطينية',
		curriculumLessonId: 'arb_lesson_3as_le_t2_iltizam_algeria_palestine',
		defaultPoints: 4,
		onecRole: 'critical_evaluation',
		generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					quote: '«كان الشعر الجزائري الملتزم صوتاً صادقاً لثورة نوفمبر المجيدة وملازماً لكفاح الشعب حتى الاستقلال»',
					prompt:
						'حرر تقييماً نقدياً محكماً تجيب فيه عن: (أ) تعريف الالتزام والفرق بينه وبين الإلزام، (ب) ثلاث مظاهر للالتزام في شعر الثورة الجزائرية، (جـ) ذكر أربعة شعراء جزائريين جسدوا هذا الالتزام.',
					answer:
						'تمهيد (0.5ن): أدى الشعر الجزائري المعاصر دوراً محورياً في توثيق ثورة نوفمبر وتعبئة الوجدان الوطني.\n1) التعريف والفرق (1ن): الالتزام تسخير الأديب قلمه لقضايا أمته بحرية وقناعة صادقة، بينما الإلزام فرض خارجي قسري يفقد الأدب صدقه الفني.\n2) مظاهر الالتزام (1.5ن): ضمير الجمع (نحن)، تخليد الشهداء ورموز الأوراس ونوفمبر، فضح جرائم المستعمر، والدعوة للصمود والتحرر.\n3) الأعلام والمنهجية (1ن): مفدي زكرياء، محمد العيد آل خليفة، الشيخ أحمد سحنون، ومحمد الأخضر السائحي.',
					quizEasyCorrect: 'مشاركة الأديب الواعية والحرة في قضايا أمته المصيرية بصدق ووجدان',
					quizMediumCorrect: 'توظيف ضمير الجمع وتمجيد الشهداء ورموز الأوراس ونوفمبر وفضح الاحتلال',
					quizHardCorrect: 'مفدي زكرياء ومحمد العيد آل خليفة والشيخ أحمد سحنون ومحمد الأخضر السائحي'
				},
				{
					quote: '«التقت الجزائر وفلسطين في القصيدة العربية المعاصرة باعتبارهما رمزاً لوحدة المصير والكفاح التحرري»',
					prompt:
						'في فقرة نقدية منظمة: (أ) علّل مكانة القضية الفلسطينية في الشعر العربي المعاصر، (ب) ميّز بين النزعة الوطنية والقومية والدينية في شعر فلسطين، (جـ) اذكر أربعة شعراء تغنوا بالقدس والمقاومة.',
					answer:
						'تمهيد (0.5ن): شكلت فلسطين المحور الأعمق في شعر الالتزام العربي والإسلامي المعاصر.\n1) التعليل (1ن): لقدسية المسجد الأقصى أولى القبلتين ومسرى النبي صلى الله عليه وسلم، ولعدالة قضية شعب مظلوم يتعرض للاحتلال والتهجير.\n2) التمييز بين النزعات (1.5ن): الوطنية حين يكتب الشاعر الفلسطيني عن أرضه، والقومية حين ينتصر لها شاعر عربي من بلد آخر، والدينية حين تستحضر قدسية الأقصى والشهادة.\n3) الأعلام والمنهجية (1ن): إبراهيم طوقان، عبد الرحيم محمود، هاشم الرفاعي، عبد الرحمن العشماوي، ومفدي زكرياء.',
					quizEasyCorrect: 'قدسية المسجد الأقصى وعدالة القضية ورفض الاحتلال والتهجير',
					quizMediumCorrect: 'وطنية للفلسطيني، وقومية للشاعر العربي المتضامن، ودينية لتعظيم الأقصى',
					quizHardCorrect: 'إبراهيم طوقان وعبد الرحيم محمود وهاشم الرفاعي وعبد الرحمن العشماوي'
				},
				{
					quote: '«حمل شعر الالتزام قيماً تاريخية وسياسية ودينية وإنسانية جعلته وثيقة حية لذاكرة الأمة»',
					prompt:
						'حرر فقرة نقدية تبيّن فيها: (أ) أبرز القيم التي يرسخها شعر الثورة الجزائرية وفلسطين، (ب) أبرز الرموز المشتركة في قصائد الالتزام ودلالاتها، (جـ) دور العاطفة الصادقة واللغة الإيحائية في نجاح القصيدة الملتزمة.',
					answer:
						'تمهيد (0.5ن): يرتقي شعر الالتزام عن الخطاب العابر بفضل عمق قيمه وصدق وجدانه.\n1) القيم (1.5ن): قيمة تاريخية (توثيق الأحداث)، سياسية تحررية (رفض الاحتلال)، دينية (الجهاد والشهادة وحماية المقدسات)، وإنسانية (الحق في الحرية والكرامة).\n2) الرموز (1ن): الشهيد رمز الفداء، الفجر رمز الحرية، الليل رمز الاستعمار، الأوراس والقدس رمزا الصمود.\n3) العاطفة واللغة والمنهجية (1ن): الصدق الشعوري واللغة الموحية يحفظان للقصيدة الملتزمة قيمتها الفنية وتأثيرها الخالد.',
					quizEasyCorrect: 'قيم تاريخية وسياسية تحررية ودينية وإنسانية متكاملة',
					quizMediumCorrect: 'الشهيد والفجر والأوراس والقدس رموزاً للصمود والانتصار مقابل الليل للاحتلال',
					quizHardCorrect: 'الصدق العاطفي وجمال اللغة الإيحائية هما ما يصون القيمة الفنية لشعر الالتزام'
				}
			];
			const chosen = rng.pick(pool);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = chosen.quizEasyCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'التزام السجع المتكلف والألغاز اللغوية', diagnosticFeedback: 'تلك سمة عصر الضعف لا شعر الالتزام المعاصر.' },
						{ text: 'الهروب من قضايا الواقع نحو العزلة التامة', diagnosticFeedback: 'الالتزام هو الانخراط الواعي في قضايا الواقع والأمة.' },
						{ text: 'نظم القواعد النحوية في أبيات تعليمية', diagnosticFeedback: 'هذا يسمى الشعر التعليمي لا شعر الالتزام.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في التقييم النقدي حول الالتزام: ${chosen.quote}، ما الإجابة التأسيسية الأدق؟`,
					questionTextAr: 'اختر الإجابة الدقيقة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة الدقيقة: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.quizMediumCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'اعتماد الإرشادات المسرحية وتعدد الفصول', diagnosticFeedback: 'تلك من خصائص المسرحية لا القصيدة الملتزمة.' },
						{ text: 'الإجمال ثم التفصيل في النثر العلمي المتأدب', diagnosticFeedback: 'تلك خاصية نثر ابن خلدون.' },
						{ text: 'الحياد البارد وتجنب ضمير الجمع تماماً', diagnosticFeedback: 'ضمير الجمع «نحن» وحرارة العاطفة من أبرز مظاهر الالتزام.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: 'أي عنصر تحليلي يُعد أساسياً في إجابة هذا التقييم النقدي؟',
					questionTextAr: 'اختر العنصر الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `العنصر الصحيح: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.quizHardCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'عبد الرحمن بن خلدون وابن الوردي فقط', diagnosticFeedback: 'هما من أعلام عصر الضعف في الفصل الأول.' },
						{ text: 'الإمام ابن باديس وأحمد رضا حوحو فقط', diagnosticFeedback: 'هما من أعلام المقال والقصة النثرية في الفصل الثالث.' },
						{ text: 'الجاحظ وعبد الحميد الكاتب فقط', diagnosticFeedback: 'هما من أعلام النثر القديم.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: 'ما التوثيق أو الاستنتاج النقدي الأصوب لهذا الموضوع؟',
					questionTextAr: 'اختر الإجابة التوثيقية الصحيحة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التوثيق الدقيق: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'التقييم النقدي',
				points: 4,
				instruction: `السند النقدي: ${chosen.quote}.`,
				content: [
					{
						type: 'text',
						content: `المطلوب: ${chosen.prompt}`,
						answer: chosen.answer,
						mark: '4'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't2',
				difficulty,
				domain: 'literary_criticism',
				titleAr: this.titleAr,
				onecRole: 'critical_evaluation',
				quizQuestion,
				sujetExercise,
				hints: [
					'فرّق بدقة بين الالتزام الحر والإلزام القسري.',
					'ميّز النزعات الثلاث (وطنية، قومية، دينية) واربطها بأمثلة وأعلام موثوقين.',
					'احرص على التنظيم وسلامة الأسلوب العربي الفصيح.'
				],
				solutionStepsAr: [
					'تأطير ظاهرة الالتزام ومكانتها في الشعر المعاصر.',
					'عرض المظاهر والنزعات والقيم والرموز بدقة.',
					'توثيق الإجابة بأعلام الثورة الجزائرية وفلسطين.'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. CRITICAL EVALUATION (4 pts — Alt): النزعة الإنسانية والقيم الحضارية وموسيقى التفعيلة
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'arb_tpl_3as_le_t2_ce_humanitarian_tafila_alt',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'literary_criticism',
		titleAr: 'التقييم النقدي (4ن — بديل): النزعة الإنسانية والقيم الحضارية وموسيقى شعر التفعيلة',
		curriculumLessonId: 'arb_lesson_3as_le_t2_humanitarian_values',
		defaultPoints: 4,
		onecRole: 'critical_evaluation',
		generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					quote: '«اتسعت آفاق الشعر المعاصر لتحتضن النزعة الإنسانية والقيم الحضارية في إطار الوحدة العضوية واللغة الموحية»',
					prompt:
						'حرر فقرة نقدية منظمة تجيب فيها عن: (أ) مفهوم النزعة الإنسانية والتأملية في الشعر الحديث، (ب) الفرق بين وحدة البيت والوحدة العضوية، (جـ) ثلاث سمات للغة والطبيعة عند الشعراء المجددين المنضبطين (آل خليفة، سحنون، السائحي، العشماوي).',
					answer:
						'تمهيد (0.5ن): ارتقى الشعر المعاصر بوظيفته نحو خطاب الإنسان وبناء القيم الحضارية.\n1) النزعة الإنسانية والتأملية (1ن): توجه شعري يدعو إلى الرحمة والعدل والتآخي والتفاؤل الفاعل ورفض اليأس والظلم.\n2) وحدة البيت مقابل الوحدة العضوية (1.5ن): وحدة البيت تجعل كل بيت مستقلاً بمعناه، أما الوحدة العضوية فتقوم على وحدة الموضوع والجو النفسي والترابط الوثيق بين الأبيات كالجسد الواحد.\n3) اللغة والطبيعة والمنهجية (1ن): لغة سهلة موحية بعيدة عن الغرابة، وتشخيص الطبيعة لبعث الأمل والحكمة كما عند محمد العيد آل خليفة والشيخ أحمد سحنون ومحمد الأخضر السائحي وعبد الرحمن العشماوي.',
					quizEasyCorrect: 'خطاب الإنسان بقيم الرحمة والعدل والتآخي والتفاؤل الفاعل البناء',
					quizMediumCorrect: 'وحدة الموضوع والجو النفسي وترابط الأبيات ترابطاً لا يقبل الحذف أو التقديم',
					quizHardCorrect: 'لغة سهلة موحية وتشخيص الطبيعة لبعث الأمل عند آل خليفة وسحنون والسائحي'
				},
				{
					quote: '«جاء شعر التفعيلة (الشعر الحر) تجديداً موسيقياً موزوناً يطاوع الدفقة الشعورية دون التخلي عن الإيقاع العربي الأصيل»',
					prompt:
						'في فقرة نقدية مركزة: (أ) عرّف شعر التفعيلة وبيّن علاقته بالوزن العروضي، (ب) قارن بين البنية الموسيقية للشعر العمودي وشعر التفعيلة في ثلاث نقاط، (جـ) اذكر أربعة بحور صافية مع تفعيلاتها الأساسية.',
					answer:
						'تمهيد (0.5ن): أحدث شعر التفعيلة تحولاً مهماً في الإيقاع الشعري العربي في النصف الثاني من القرن العشرين.\n1) التعريف وعلاقته بالوزن (1ن): شعر موزون يستبدل بالبيت ذي الشطرين «السطر الشعري» المرن، ويعتمد تكرار تفعيلة واحدة من بحر صافٍ وفق الدفقة الشعورية.\n2) المقارنة بالعمودي (1.5ن): العمودي يقوم على شطرين متساويين وبحور تامة وقافية موحدة؛ أما شعر التفعيلة فيقوم على السطر متفاوت الطول، والبحور الصافية، وتنويع القافية والروي.\n3) البحور الصافية والمنهجية (1ن): المتقارب (فعولن)، الكامل (متفاعلن)، الرجز (مستفعلن)، الرمل (فاعلاتن)، والمتدارك (فاعلن).',
					quizEasyCorrect: 'شعر موزون يعتمد السطر الشعري وتكرار تفعيلة واحدة من بحر صافٍ',
					quizMediumCorrect: 'تفاوت طول الأسطر حسب الدفقة الشعورية وتنوع القافية والروي بدل وحدة الشطرين',
					quizHardCorrect: 'المتقارب (فعولن)، الكامل (متفاعلن)، الرجز (مستفعلن)، والرمل (فاعلاتن)'
				},
				{
					quote: '«يمتزج التجديد الفني بعمق الرسالة الأخلاقية حين يوظف الشاعر الحديث الرمز والطبيعة لخدمة قضايا الإنسان والأمة»',
					prompt:
						'اكتب فقرة نقدية تجيب فيها عن: (أ) وظيفة الرمز والطبيعة في القصيدة المعاصرة، (ب) الفرق بين التفاؤل الإيماني الإيجابي والتشاؤم السلبي في الشعر الحديث، (جـ) كيف يحقق الشاعر التوازن بين الأصالة اللغوية والتجديد الفني.',
					answer:
						'تمهيد (0.5ن): لا يكتمل جمال التجديد الشعري إلا حين يقترن بسمو المعنى وصفاء اللغة.\n1) الرمز والطبيعة (1.5ن): يكثف الرمز الدلالة ويعمق الإيحاء، وتشارك الطبيعة الحية وجدان الشاعر فتغدو مرآة للأمل والتجدد وعظمة الخالق.\n2) التفاؤل الإيجابي مقابل التشاؤم (1ن): يدعو التفاؤل الإيماني للعمل والنهوض والثقة بنصر الله، بينما يفضي التشاؤم إلى العزلة والانهزام.\n3) التوازن والمنهجية (1ن): يتحقق التوازن بالحفاظ على سلامة الفصحى وجمال الإيقاع العربي مع توظيف الوحدة العضوية واللغة الموحية.',
					quizEasyCorrect: 'تكثيف الدلالة والإيحاء وجعل الطبيعة الحية مرآة للأمل والوجدان',
					quizMediumCorrect: 'التفاؤل الإيماني يحفز على العمل والبناء، والتشاؤم يورث العزلة والانهزام',
					quizHardCorrect: 'الجمع بين سلامة الفصحى والإيقاع الموزون وبين الوحدة العضوية واللغة الموحية'
				}
			];
			const chosen = rng.pick(pool);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = chosen.quizEasyCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'كتابة نثرية حرة تخلو تماماً من أي إيقاع أو تفعيلة', diagnosticFeedback: 'شعر التفعيلة موزون وليس نثراً، والشعر الإنساني له رسالة وقيم.' },
						{ text: 'الإغراق في الألغاز البديعية كما في عصر الانحطاط', diagnosticFeedback: 'الشعر الحديث تحرر من التكلف البديعي.' },
						{ text: 'الاقتصار على السرد القصصي والعقدة والحل', diagnosticFeedback: 'تلك من خصائص القصة النثرية.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في التقييم النقدي البديل: ${chosen.quote}، ما الفكرة الرئيسة الصحيحة؟`,
					questionTextAr: 'اختر الفكرة الرئيسة الصحيحة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الفكرة الدقيقة: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.quizMediumCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'استقلال كل بيت عن غيره وتعدد الأغراض في القصيدة', diagnosticFeedback: 'تلك سمة وحدة البيت في القصيدة التقليدية.' },
						{ text: 'استعمال البحر الطويل والبسيط في شعر التفعيلة', diagnosticFeedback: 'الطويل والبسيط بحران ممتزجان لا ينتميان للبحور الصافية.' },
						{ text: 'تغليب اليأس المطلق والانعزال عن قضايا الإنسان', diagnosticFeedback: 'الشعر الإنساني المنضبط متفائل وبناء.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: 'ما المقارنة أو الخاصية النقدية الأدق في عرض هذا الموضوع؟',
					questionTextAr: 'اختر الإجابة الأدق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة الدقيقة: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.quizHardCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'الطويل والبسيط والمديد والخفيف فقط', diagnosticFeedback: 'هذه كلها بحور ممتزجة وليست بحوراً صافية.' },
						{ text: 'ابن خلدون وابن الوردي فقط', diagnosticFeedback: 'هما من أعلام عصر الضعف في الفصل الأول.' },
						{ text: 'إلغاء النحو العربي والفصحى باسم التجديد', diagnosticFeedback: 'الأصالة اللغوية وسلامة الفصحى ركن ثابت في الشعر العربي الصحيح.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: 'ما التوثيق أو الخلاصة النقدية الصحيحة لهذا التقييم؟',
					questionTextAr: 'اختر الخلاصة الصحيحة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة الدقيقة: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'التقييم النقدي',
				points: 4,
				instruction: `السند النقدي: ${chosen.quote}.`,
				content: [
					{
						type: 'text',
						content: `المطلوب: ${chosen.prompt}`,
						answer: chosen.answer,
						mark: '4'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't2',
				difficulty,
				domain: 'literary_criticism',
				titleAr: this.titleAr,
				onecRole: 'critical_evaluation',
				quizQuestion,
				sujetExercise,
				hints: [
					'أكد دائماً أن شعر التفعيلة شعر موزون على البحور الصافية وليس كلاماً مرسلاً.',
					'فرّق بوضوح بين وحدة البيت (القديمة) والوحدة العضوية (الحديثة).',
					'اربط النزعة الإنسانية بالقيم الحضارية والتفاؤل الفاعل وبأعلامها المنضبطين.'
				],
				solutionStepsAr: [
					'تأطير التجديد الوجداني والموسيقي في الشعر المعاصر.',
					'تفصيل الفروق والخصائص والبحور الصافية المطلوبة.',
					'توثيق الإجابة بالأعلام وخاتمة مركزة.'
				],
				finalAnswer
			};
		}
	}
];
