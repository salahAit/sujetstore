import type {
	Difficulty,
	HistoryGeneratedExerciseInstance,
	HistoryParameterizedTemplate
} from '../../types';
import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';
import { buildHistoricalDocumentBlock, buildHistoryTableBlock } from '../../history-helpers';

// ═══════════════════════════════════════════════════════════════════════════════
// قوالب التمارين — السنة الثالثة ابتدائي — التاريخ والجغرافيا — الفصل الأول
// ═══════════════════════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────────────────────────
// 1. التاريخ (5 نقاط): الحدث المكاني والزماني
// ───────────────────────────────────────────────────────────────────────────────
const tplHistEventTimePlace: HistoryParameterizedTemplate = {
	id: 'his_tpl_3ap_t1_hist_event_time_place',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'hist_ancient',
	titleAr: 'التاريخ: الحدث المكاني والزماني',
	curriculumLessonId: 'his_lesson_3ap_t1_event_time_place',
	defaultPoints: 5,
	onecRole: 'pri_history',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				label: 'أحداث الحياة المدرسية والوطنية',
				docTitle: 'سند تاريخي: يوم العلم في مدرستنا',
				docText:
					'في يوم 16 أفريل من كل سنة، تجتمع تلميذات وتلاميذ مدرسة العربي بن مهيدي في الساحة الرئيسية للاحتفال بيوم العلم، وتُلقى كلمات عن طلب العلم والاجتهاد.',
				tableRows: [
					[{ label: 'الحدث (ماذا وقع؟)' }, { answer: 'الاحتفال بيوم العلم', mark: '1' }],
					[{ label: 'الزمان (متى وقع؟)' }, { answer: 'يوم 16 أفريل من كل سنة', mark: '1' }],
					[{ label: 'المكان (أين وقع؟)' }, { answer: 'ساحة مدرسة العربي بن مهيدي', mark: '1' }]
				],
				tfItems: [
					{
						q: 'نسأل عن زمان وقوع الحدث بأداة الاستفهام (متى؟).',
						a: 'صحيح',
						c: 'العبارة صحيحة.',
						mark: '1'
					},
					{
						q: 'تُعد ساحة المدرسة زمانا للحدث التاريخي.',
						a: 'خطأ',
						c: 'ساحة المدرسة مكان للحدث وليست زمانا.',
						mark: '1'
					}
				],
				pairs: [
					{ left: 'الحدث', right: 'ماذا وقع؟' },
					{ left: 'الزمان', right: 'متى وقع؟' },
					{ left: 'المكان', right: 'أين وقع؟' },
					{ left: 'يوم العلم', right: '16 أفريل' }
				]
			},
			{
				label: 'الدخول المدرسي والذاكرة الشخصية',
				docTitle: 'سند تاريخي: أول يوم في القسم الثالث',
				docText:
					'التحق التلميذ ياسين بمدرسة الحرية الابتدائية يوم 21 سبتمبر في الصباح الباكر، فالتقى بمعلمته الجديدة واستلم كتبه المدرسية في القسم.',
				tableRows: [
					[{ label: 'الحدث (ماذا وقع؟)' }, { answer: 'الدخول المدرسي واستلام الكتب', mark: '1' }],
					[{ label: 'الزمان (متى وقع؟)' }, { answer: 'يوم 21 سبتمبر صباحا', mark: '1' }],
					[{ label: 'المكان (أين وقع؟)' }, { answer: 'مدرسة الحرية الابتدائية', mark: '1' }]
				],
				tfItems: [
					{
						q: 'التحاق التلميذ بالمدرسة حدث شخصي يرتبط بزمان ومكان محددين.',
						a: 'صحيح',
						c: 'العبارة صحيحة.',
						mark: '1'
					},
					{
						q: 'تساعدنا الصور والشهادات القديمة على تذكر الأحداث الماضية.',
						a: 'صحيح',
						c: 'العبارة صحيحة.',
						mark: '1'
					}
				],
				pairs: [
					{ left: 'الدخول المدرسي لياسين', right: 'حدث شخصي' },
					{ left: 'يوم 21 سبتمبر', right: 'الزمان' },
					{ left: 'مدرسة الحرية الابتدائية', right: 'المكان' },
					{ left: 'عيد الاستقلال 5 جويلية', right: 'حدث وطني' }
				]
			},
			{
				label: 'رحلة إلى متحف المجاهد',
				docTitle: 'سند تاريخي: زيارة متحف المجاهد',
				docText:
					'بمناسبة ذكرى أول نوفمبر، نظمت البلدية رحلة لتلاميذ المدرسة إلى متحف المجاهد بوسط المدينة، حيث شاهد التلاميذ صورا ووثائق عن ثورة التحرير.',
				tableRows: [
					[{ label: 'الحدث (ماذا وقع؟)' }, { answer: 'زيارة متحف المجاهد', mark: '1' }],
					[{ label: 'الزمان (متى وقع؟)' }, { answer: 'ذكرى أول نوفمبر', mark: '1' }],
					[{ label: 'المكان (أين وقع؟)' }, { answer: 'متحف المجاهد بوسط المدينة', mark: '1' }]
				],
				tfItems: [
					{
						q: 'نسأل عن مكان وقوع الحدث بأداة الاستفهام (أين؟).',
						a: 'صحيح',
						c: 'العبارة صحيحة.',
						mark: '1'
					},
					{
						q: 'يمكن أن يقع الحدث التاريخي من غير زمان ولا مكان.',
						a: 'خطأ',
						c: 'كل حدث يرتبط حتما بزمان وقوعه ومكان وقوعه.',
						mark: '1'
					}
				],
				pairs: [
					{ left: 'متحف المجاهد', right: 'المكان' },
					{ left: 'ذكرى أول نوفمبر', right: 'الزمان' },
					{ left: 'زيارة المتحف', right: 'الحدث' },
					{ left: '5 جويلية 1962', right: 'استقلال الجزائر' }
				]
			}
		];

		const v = rng.pick(variants);
		const shuffledPairs = rng.shuffle(v.pairs);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة التاريخ',
			points: 5,
			instruction: 'اقرأ السند الآتي ثم أجب عن الأسئلة بدقة:',
			content: [
				buildHistoricalDocumentBlock({
					title: v.docTitle,
					text: v.docText
				}),
				{ type: 'text', content: '1) استخرج من السند أركان الحدث الثلاثة بملء الجدول:' },
				buildHistoryTableBlock(['العنصر المطلوب', 'الإجابة من السند'], v.tableRows),
				{ type: 'text', content: '2) ضع كلمة (صحيح) أو (خطأ) أمام كل عبارة مع تصحيح الخطأ:' },
				{ type: 'true_false', items: v.tfItems }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: 'hist_ancient',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_history',
			quizQuestion: {
				type: 'matching',
				questionText: 'اربط كل عنصر في العمود الأيمن بما يناسبه من أركان الحدث في العمود الأيسر:',
				questionTextAr: 'اربط كل عنصر بما يناسبه:',
				questionData: { pairs: shuffledPairs },
				explanation: 'الحدث يجيب عن (ماذا وقع؟)، والزمان عن (متى؟)، والمكان عن (أين؟).'
			},
			sujetExercise,
			hints: [
				'الحدث هو الواقعة التي جرت، والزمان يحدد التاريخ، والمكان يحدد الموضع.',
				'استعمل أداة «متى؟» للزمان وأداة «أين؟» للمكان.',
				'تذكّر أن الأحداث الوطنية تخص كل الجزائريين مثل 1 نوفمبر و5 جويلية.'
			],
			solutionStepsAr: [
				v.tableRows.map((r) => `${r[0].label}: ${r[1].answer}`).join(' — '),
				v.tfItems.map((it) => `${it.q} -> ${it.a}`).join(' | ')
			],
			finalAnswer: String(v.tableRows[0][1].answer)
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 2. التاريخ (5 نقاط): الخط الزمني وترتيب الأحداث
// ───────────────────────────────────────────────────────────────────────────────
const tplHistTimeline: HistoryParameterizedTemplate = {
	id: 'his_tpl_3ap_t1_hist_timeline',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'hist_ancient',
	titleAr: 'التاريخ: الخط الزمني وترتيب الأحداث',
	curriculumLessonId: 'his_lesson_3ap_t1_timeline',
	defaultPoints: 5,
	onecRole: 'pri_history',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				label: 'مراحل حياة التلميذ على الخط الزمني',
				eventsText: 'التحقت التلميذة سلمى بالسنة الثالثة سنة 2024، وولدت سنة 2016، ودخلت القسم التحضيري سنة 2021، والسنة الأولى سنة 2022.',
				sorted: [
					{ year: '2016', event: 'ولادة سلمى' },
					{ year: '2021', event: 'القسم التحضيري' },
					{ year: '2022', event: 'السنة الأولى ابتدائي' },
					{ year: '2024', event: 'السنة الثالثة ابتدائي' }
				],
				q2: 'من أي جهة نبدأ كتابة الأحداث على الخط الزمني باللغة العربية: من اليمين أم من اليسار؟',
				a2: 'نبدأ من اليمين (الحدث الأقدم) نحو اليسار (الحدث الأحدث).',
				q3: 'ما أقدم حدث في حياة سلمى وما أحدث حدث؟',
				a3: 'أقدم حدث هو الولادة سنة 2016، وأحدث حدث هو الالتحاق بالسنة الثالثة سنة 2024.'
			},
			{
				label: 'ترتيب تواريخ وطنية في تاريخ الجزائر',
				eventsText: 'تأسست جمعية العلماء المسلمين سنة 1931، واستقلت الجزائر سنة 1962، واندلعت ثورة التحرير سنة 1954، وبدأت المقاومة الشعبية سنة 1830.',
				sorted: [
					{ year: '1830', event: 'بداية المقاومة الشعبية' },
					{ year: '1931', event: 'تأسيس جمعية العلماء المسلمين' },
					{ year: '1954', event: 'اندلاع ثورة التحرير' },
					{ year: '1962', event: 'استقلال الجزائر' }
				],
				q2: 'إلى ماذا يشير السهم المرسوم في نهاية الخط الزمني؟',
				a2: 'يشير إلى تواصل الزمن واستمراره من الماضي نحو الحاضر والمستقبل.',
				q3: 'كم سنة تفصل بين اندلاع الثورة (1954) والاستقلال (1962)؟',
				a3: 'تفصل بينهما ثماني سنوات (أو سبع سنوات ونصف من الكفاح المسلح).'
			},
			{
				label: 'أحداث العام الدراسي للتلميذ أمين',
				eventsText: 'شارك أمين في حفل نهاية السنة في جوان، ودخل المدرسة في سبتمبر، واحتفل بيوم العلم في أفريل، وبدأ امتحانات الفصل الأول في ديسمبر.',
				sorted: [
					{ year: 'سبتمبر', event: 'الدخول المدرسي' },
					{ year: 'ديسمبر', event: 'امتحانات الفصل الأول' },
					{ year: 'أفريل', event: 'الاحتفال بيوم العلم' },
					{ year: 'جوان', event: 'حفل نهاية السنة' }
				],
				q2: 'لماذا نستعمل الخط الزمني في دراسة التاريخ؟',
				a2: 'نستعمله لترتيب الأحداث من الأقدم إلى الأحدث وفهم تسلسلها الزمني بسهولة.',
				q3: 'أين نضع حدث شهر سبتمبر على الخط الزمني العربي؟',
				a3: 'نضعه في بداية الخط الزمني من جهة اليمين لأنه الأقدم.'
			}
		];

		const v = rng.pick(variants);
		const orderedLabels = v.sorted.map((e) => `${e.event} (${e.year})`);
		const indexed = orderedLabels.map((label, rank) => ({ label, rank }));
		const shuffled = rng.shuffle(indexed);
		if (shuffled.every((e, i) => e.rank === i)) {
			[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
		}
		const items = shuffled.map((e) => e.label);
		const correctOrder = orderedLabels.map((_, rank) => shuffled.findIndex((e) => e.rank === rank));

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة التاريخ',
			points: 5,
			instruction: 'تأمّل لوحة الخط الزمني الآتية واقرأ المعطيات، ثم أجب عن الأسئلة:',
			content: [
				buildIllustratedFigureBlock('hg_01_timeline_historical_sources', {
					title: 'الخط الزمني لتنظيم الأحداث حسب تسلسلها الزمني',
					maxHeight: 112,
					width: '62%',
					mode: 'labeled',
					pins: []
				}),
				buildHistoricalDocumentBlock({
					title: 'معطيات زمنية للترتيب',
					text: v.eventsText
				}),
				{ type: 'text', content: '1) رتّب هذه الأحداث من الأقدم إلى الأحدث في الجدول الآتي (من 1 إلى 4):' },
				buildHistoryTableBlock(
					['الترتيب', 'التاريخ / الزمن', 'الحدث'],
					v.sorted.map((s, idx) => [
						{ label: `الحدث (${idx + 1})`, bold: true },
						{ content: '................', answer: s.year, mark: '0.25' },
						{ content: '....................................', answer: s.event, mark: '0.5' }
					]),
					'center'
				),
				{ type: 'text', content: `2) ${v.q2}`, answer: `2) ${v.a2}`, mark: '1' },
				{ type: 'text', content: `3) ${v.q3}`, answer: `3) ${v.a3}`, mark: '1' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: 'hist_ancient',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_history',
			quizQuestion: {
				type: 'ordering',
				questionText: 'رتّب الأحداث الآتية على الخط الزمني من الأقدم (الأول) إلى الأحدث (الأخير):',
				questionTextAr: 'رتّب الأحداث من الأقدم إلى الأحدث:',
				imageUrl: '/documents/illustrations/history_geo/hg_01_timeline_historical_sources.webp',
				imageCaption: 'مراحل التسلسل الزمني',
				questionData: {
					items,
					correctOrder
				},
				explanation: `الترتيب الصحيح من الأقدم إلى الأحدث: ${orderedLabels.join(' ← ')}.`
			},
			sujetExercise,
			hints: [
				'قارن التواريخ أو الشهور أولا لمعرفة الأقدم (الأصغر عددا) والأحدث (الأكبر عددا).',
				'يُقرأ الخط الزمني العربي من اليمين إلى اليسار.',
				'السهم في نهاية الخط يدل على استمرار الزمن نحو المستقبل.'
			],
			solutionStepsAr: [
				`الترتيب الزمني: ${orderedLabels.join(' ← ')}`,
				v.a2,
				v.a3
			],
			finalAnswer: orderedLabels.join(' ← ')
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 3. الجغرافيا (5 نقاط): التموقع في المحيط القريب
// ───────────────────────────────────────────────────────────────────────────────
const tplGeoNearEnvironment: HistoryParameterizedTemplate = {
	id: 'his_tpl_3ap_t1_geo_near_environment',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'geo_tools_relief',
	titleAr: 'الجغرافيا: التموقع في المحيط القريب والمعالم المكانية',
	curriculumLessonId: 'his_lesson_3ap_t1_near_environment_directions',
	defaultPoints: 5,
	onecRole: 'pri_geography',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				label: 'طريق المدرسة والمعالم الثابتة',
				docText:
					'يخرج التلميذ رشيد صباحا من بيته فيتجه يمينا نحو المسجد الكبير، ثم يمر أمام الحديقة العمومية، وتقع مدرسته مباشرة خلف دار البلدية.',
				tableRows: [
					[{ label: 'الحديقة العمومية' }, { answer: 'أمام مسار رشيد', mark: '1' }],
					[{ label: 'المدرسة الابتدائية' }, { answer: 'خلف دار البلدية', mark: '1' }],
					[{ label: 'المسجد الكبير' }, { answer: 'عن يمين بيت رشيد', mark: '1' }]
				],
				tfItems: [
					{
						q: 'تُعد دار البلدية معلما مكانيا ثابتا نعتمد عليه في تحديد المواقع.',
						a: 'صحيح',
						c: 'العبارة صحيحة.',
						mark: '1'
					},
					{
						q: 'السيارة المارة في الشارع تصلح معلما دائما للتموقع في الحي.',
						a: 'خطأ',
						c: 'السيارة متحركة ولا تصلح معلما ثابتا، بل نعتمد على المباني كالمسجد والمدرسة.',
						mark: '1'
					}
				],
				quizQ: 'تصلح السيارة الواقفة في الشارع لتكون معلما مكانيا ثابتا دائما لوصف طريق المدرسة.',
				quizTrue: false,
				quizExp: 'المعلم المكاني يجب أن يكون ثابتا كالمسجد والبلدية والمدرسة، أما السيارة فتغادر مكانها.'
			},
			{
				label: 'مرافق المدرسة وتحديد الموقع',
				docText:
					'تقع ساحة العلم في وسط المدرسة، ويقع قسم السنة الثالثة عن يمين الإدارة، بينما توجد المكتبة المدرسية أمام الساحة وبجانب المطعم المدرسي.',
				tableRows: [
					[{ label: 'ساحة العلم' }, { answer: 'في وسط المدرسة', mark: '1' }],
					[{ label: 'قسم السنة الثالثة' }, { answer: 'عن يمين الإدارة', mark: '1' }],
					[{ label: 'المكتبة المدرسية' }, { answer: 'أمام الساحة وبجانب المطعم', mark: '1' }]
				],
				tfItems: [
					{
						q: 'نستعمل مؤشرات التموقع مثل (أمام، خلف، يمين، يسار) لوصف الأماكن بدقة.',
						a: 'صحيح',
						c: 'العبارة صحيحة.',
						mark: '1'
					},
					{
						q: 'لا يحتاج المسافر أو التلميذ إلى معالم مكانية لتحديد طريقه.',
						a: 'خطأ',
						c: 'نحتاج إلى المعالم المكانية الثابتة كي نتموقع بدقة ولا نتيه.',
						mark: '1'
					}
				],
				quizQ: 'تُعد البنايات الثابتة مثل المسجد والبلدية والمستشفى معالم مكانية تساعدنا على التموقع في الحي.',
				quizTrue: true,
				quizExp: 'المعالم المكانية الثابتة تسهل علينا تحديد مواقعنا ومواقع المؤسسات في الحي.'
			},
			{
				label: 'مخطط الحي السكني',
				docText:
					'في حي النصر، يوجد المستوصف بين الصيدلية والبريد، وتقابل محطة الحافلات حديقة الحي الخضراء من الجهة الشمالية.',
				tableRows: [
					[{ label: 'المستوصف' }, { answer: 'بين الصيدلية والبريد', mark: '1' }],
					[{ label: 'محطة الحافلات' }, { answer: 'تقابل حديقة الحي', mark: '1' }],
					[{ label: 'الحديقة الخضراء' }, { answer: 'في الجهة المقابلة للمحطة', mark: '1' }]
				],
				tfItems: [
					{
						q: 'إذا وقفنا بين مرفقين يمكننا وصف موقعنا بكلمة (بين).',
						a: 'صحيح',
						c: 'العبارة صحيحة.',
						mark: '1'
					},
					{
						q: 'يتغير مكان المسجد والمستوصف من يوم لآخر في الخريطة.',
						a: 'خطأ',
						c: 'المسجد والمستوصف معلمان ثابتان لا يتغير موقعهما.',
						mark: '1'
					}
				],
				quizQ: 'يُستعمل مؤشر (بين) عندما يكون المكان واقعا في الوسط بين معلمين آخرين.',
				quizTrue: true,
				quizExp: 'من مؤشرات التموقع المكانية: أمام، خلف، يمين، يسار، بين، بجانب.'
			}
		];

		const v = rng.pick(variants);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة الجغرافيا',
			points: 5,
			instruction: 'اقرأ السند الجغرافي الآتي حول التموقع في المحيط القريب ثم أجب:',
			content: [
				buildHistoricalDocumentBlock({
					title: 'سند جغرافي: معالم محيطي القريب',
					text: v.docText
				}),
				{ type: 'text', content: '1) حدد موقع كل معلم من السند بملء الجدول:' },
				buildHistoryTableBlock(['المعلم المكاني', 'موقعه حسب السند'], v.tableRows),
				{ type: 'text', content: '2) أجب بـ (صحيح) أو (خطأ) مع تصحيح الخطأ:' },
				{ type: 'true_false', items: v.tfItems }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: 'geo_tools_relief',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_geography',
			quizQuestion: {
				type: 'true_false',
				questionText: `حدد صحة أو خطأ العبارة الآتية:\n\n**«${v.quizQ}»**`,
				questionTextAr: v.quizQ,
				questionData: {
					correctAnswer: v.quizTrue,
					correct: v.quizTrue
				},
				explanation: v.quizExp
			},
			sujetExercise,
			hints: [
				'اقرأ النص وابحث عن الكلمات التي تحدد المكان: أمام، خلف، يمين، يسار، بين، وسط.',
				'المعلم المكاني الثابت لا يتحرك من مكانه مثل المسجد والمدرسة والبلدية.',
				'تحقق من كل جملة في السؤال الثاني قبل الحكم عليها بالصحة أو الخطأ.'
			],
			solutionStepsAr: [
				v.tableRows.map((r) => `${r[0].label}: ${r[1].answer}`).join(' — '),
				v.tfItems.map((it) => `${it.q} -> ${it.a}`).join(' | ')
			],
			finalAnswer: v.quizTrue ? 'صحيح' : 'خطأ'
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 4. الجغرافيا (5 نقاط): الجهات الأربع الأساسية والشمس والبوصلة
// ───────────────────────────────────────────────────────────────────────────────
const tplGeoCardinalDirections: HistoryParameterizedTemplate = {
	id: 'his_tpl_3ap_t1_geo_cardinal_directions',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'geo_tools_relief',
	titleAr: 'الجغرافيا: الجهات الأربع الأساسية والبوصلة',
	curriculumLessonId: 'his_lesson_3ap_t1_near_environment_directions',
	defaultPoints: 5,
	onecRole: 'pri_geography',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				label: 'تحديد الجهات عند شروق الشمس',
				q1: '1) اذكر الجهات الأربع الأساسية مرتبة.',
				a1: '1) الجهات الأربع الأساسية هي: الشمال، الجنوب، الشرق، والغرب.',
				tableRows: [
					[{ label: 'جهة شروق الشمس صباحا' }, { answer: 'الشرق', mark: '0.75' }],
					[{ label: 'جهة غروب الشمس مساء' }, { answer: 'الغرب', mark: '0.75' }],
					[{ label: 'الجهة التي تشير إليها إبرة البوصلة' }, { answer: 'الشمال', mark: '0.75' }],
					[{ label: 'الجهة المقابلة للشمال' }, { answer: 'الجنوب', mark: '0.75' }]
				],
				q3: '3) إذا استقبلت الشمس عند شروقها صباحا، فأين تقع جهة الشمال بالنسبة لك؟',
				a3: '3) تقع جهة الشمال عن يساري، وجهة الجنوب عن يميني.',
				quizQ: 'إذا وقفت صباحا متجها بوجهك نحو شروق الشمس، فما الجهة التي تكون خلف ظهرك؟',
				correctOpt: 'جهة الغرب',
				distractors: [
					{ text: 'جهة الشمال', diagnosticFeedback: 'الشمال يكون عن يسارك عندما تتجه نحو الشرق.' },
					{ text: 'جهة الجنوب', diagnosticFeedback: 'الجنوب يكون عن يمينك عندما تتجه نحو الشرق.' },
					{ text: 'جهة الشرق', diagnosticFeedback: 'الشرق هو الجهة التي تشرق منها الشمس أمام وجهك.' }
				]
			},
			{
				label: 'وردة الرياح والبوصلة على الخريطة',
				q1: '1) ما الأداة التي يستعملها البحار والرحالة لتحديد جهة الشمال في أي وقت؟',
				a1: '1) يستعمل البوصلة التي تشير إبرتها دائما نحو جهة الشمال.',
				tableRows: [
					[{ label: 'السهم المتجه نحو أعلى الخريطة' }, { answer: 'الشمال', mark: '0.75' }],
					[{ label: 'السهم المتجه نحو أسفل الخريطة' }, { answer: 'الجنوب', mark: '0.75' }],
					[{ label: 'الجهة الواقعة على يمين الناظر للخريطة' }, { answer: 'الشرق', mark: '0.75' }],
					[{ label: 'الجهة الواقعة على يسار الناظر للخريطة' }, { answer: 'الغرب', mark: '0.75' }]
				],
				q3: '3) كيف تتأكد من اتجاه الشرق والغرب في يوم غائم لا تظهر فيه الشمس؟',
				a3: '3) أستعمل البوصلة لتحديد الشمال، ومنه أعرف الشرق عن يميني والغرب عن يساري والجنوب خلفي.',
				quizQ: 'إلى أي جهة من الجهات الأربع يشير السهم العلوي في وردة الرياح على الخريطة؟',
				correctOpt: 'جهة الشمال',
				distractors: [
					{ text: 'جهة الجنوب', diagnosticFeedback: 'الجنوب يكون في الأسفل مقابل الشمال.' },
					{ text: 'جهة الشرق', diagnosticFeedback: 'الشرق يكون في جهة اليمين على الخريطة.' },
					{ text: 'جهة الغرب', diagnosticFeedback: 'الغرب يكون في جهة اليسار على الخريطة.' }
				]
			},
			{
				label: 'الاتجاهات المتقابلة في المحيط',
				q1: '1) ما الفرق بين الشروق والغروب في تحديد الجهات؟',
				a1: '1) تشرق الشمس من الشرق وتغرب في الغرب، فهما جهتان متقابلتان.',
				tableRows: [
					[{ label: 'الجهة المقابلة للشرق' }, { answer: 'الغرب', mark: '0.75' }],
					[{ label: 'الجهة المقابلة للجنوب' }, { answer: 'الشمال', mark: '0.75' }],
					[{ label: 'الجهة التي يطل عليها شمال الجزائر (البحر المتوسط)' }, { answer: 'الشمال', mark: '0.75' }],
					[{ label: 'الجهة التي تمتد فيها الصحراء الجزائرية الكبرى' }, { answer: 'الجنوب', mark: '0.75' }]
				],
				q3: '3) تقع البلدية شرق المدرسة، أين تقع المدرسة بالنسبة للبلدية؟',
				a3: '3) تقع المدرسة غرب البلدية لأن الغرب يقابل الشرق.',
				quizQ: 'تقع مكتبة الحي شمال المدرسة؛ أين تقع المدرسة بالنسبة للمكتبة؟',
				correctOpt: 'جنوب المكتبة',
				distractors: [
					{ text: 'شمال المكتبة', diagnosticFeedback: 'الشمال هي الجهة التي تقع فيها المكتبة بالنسبة للمدرسة لا العكس.' },
					{ text: 'شرق المكتبة', diagnosticFeedback: 'الشرق يقابل الغرب وليس الشمال.' },
					{ text: 'غرب المكتبة', diagnosticFeedback: 'الغرب يقابل الشرق؛ أما الجهة المقابلة للشمال فهي الجنوب.' }
				]
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.correctOpt, v.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة الجغرافيا',
			points: 5,
			instruction: 'لاحظ لوحة وردة الرياح وعناصر الخريطة ثم أجب عن الأسئلة:',
			content: [
				buildIllustratedFigureBlock('hg_02_compass_directions_map_key', {
					title: 'وردة الرياح والجهات الأربع الأساسية',
					maxHeight: 118,
					width: '62%',
					mode: 'labeled',
					pins: []
				}),
				{ type: 'text', content: v.q1, answer: v.a1, mark: '1' },
				{ type: 'text', content: '2) أكمل الجدول بكتابة الجهة الأساسية المناسبة:' },
				buildHistoryTableBlock(['الوصف الجغرافي', 'الجهة الأساسية'], v.tableRows),
				{ type: 'text', content: v.q3, answer: v.a3, mark: '1' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: 'geo_tools_relief',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_geography',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizQ,
				questionTextAr: v.quizQ,
				imageUrl: '/documents/illustrations/history_geo/hg_02_compass_directions_map_key.webp',
				imageCaption: 'وردة الرياح والجهات الأساسية',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الإجابة الصحيحة: ${v.correctOpt}.`
			},
			sujetExercise,
			hints: [
				'تذكّر الجهات الأساسية الأربع: الشمال، الجنوب، الشرق، الغرب.',
				'الشمال يقابل الجنوب، والشرق يقابل الغرب.',
				'تشير إبرة البوصلة دائما إلى جهة الشمال.'
			],
			solutionStepsAr: [v.a1, ...v.tableRows.map((r) => `${r[0].label}: ${r[1].answer}`), v.a3],
			finalAnswer: v.correctOpt
		};
	}
};

export const TEMPLATES_3AP_T1: HistoryParameterizedTemplate[] = [
	tplHistEventTimePlace,
	tplHistTimeline,
	tplGeoNearEnvironment,
	tplGeoCardinalDirections
];
