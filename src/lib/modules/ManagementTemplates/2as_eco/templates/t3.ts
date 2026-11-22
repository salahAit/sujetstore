import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	ManagementGeneratedExerciseInstance,
	ManagementParameterizedTemplate
} from '../../types';
import {
	buildCaseStudyBlocks,
	buildManagementDocumentBlock,
	buildManagementTableBlock,
	formatDzd
} from '../../management-helpers';
import {
	buildIllustratedFigureBlock,
	getIllustrationWebpUrl
} from '../../../VisualAssets/illustrations-registry';
import { roundTo, SeededRng } from '../../../MathTemplates/rng';

// ============================================================================
// 2AS GE (الاقتصاد والمناجمنت) — Trimester 3: 5 Parameterized Templates
// ============================================================================

function scrambleOrdering(
	orderedItems: string[],
	rng: SeededRng
): { items: string[]; correctOrder: number[] } {
	const n = orderedItems.length;
	const indices = Array.from({ length: n }, (_, i) => i);
	let perm = rng.shuffle(indices);
	if (perm.every((v, i) => v === i) && n >= 2) {
		perm = [...indices.slice(1), indices[0]];
	}
	const items = perm.map((i) => orderedItems[i]);
	const correctOrder = indices.map((orig) => perm.indexOf(orig));
	return { items, correctOrder };
}

// [1] مفهوم المناجمنت وتطور الفكر التسييري (4 ن)
const tpl2asEcoT3ManagementSchools: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_2as_eco_t3_management_schools',
	grade: '2as_eco',
	trimesterId: 't3',
	domain: 'man_functions',
	titleAr: 'المناجمنت: الكفاءة والفاعلية ومدارس الفكر التسييري',
	curriculumLessonId: 'mgt_lesson_2as_eco_t3_management_evolution',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const targetUnits = difficulty === 'easy' ? 1000 : rng.pick([1200, 1500]);
		const stdCost = 500;
		const actualCost = rng.pick([475, 580]);
		const isEfficient = actualCost <= stdCost;
		const costDiff = actualCost - stdCost;

		const variants = [
			{
				docTitle: 'سند إداري: من الإدارة العلمية الكلاسيكية إلى العلاقات الإنسانية والنظم',
				docText: `انطلق تطور الفكر التسييري مطلع القرن العشرين مع المدرسة الكلاسيكية التي ركزت على التخصص ودراسة الحركة والزمن لدى تايلور، والمبادئ الأربعة عشر لدى فايول، والتنظيم القانوني لدى فيبر؛ ثم برزت مدرسة العلاقات الإنسانية مع تجارب هوثورن لإلتون مايو وهرم الحاجات لماسلو، وصولاً إلى مدرسة النظم المفتوحة والمقاربة الظرفية الحديثة.`,
				rows: [
					[
						{ label: 'فريدريك تايلور', bold: true },
						{ answer: 'المدرسة الكلاسيكية (الإدارة العلمية)', mark: '0.5' },
						{ answer: 'دراسة الحركة والزمن وتقسيم العمل', mark: '0.25' }
					],
					[
						{ label: 'هنري فايول', bold: true },
						{ answer: 'المدرسة الكلاسيكية (التسيير الإداري)', mark: '0.5' },
						{ answer: 'الوظائف الإدارية والمبادئ الـ 14 (وحدة الأمر)', mark: '0.25' }
					],
					[
						{ label: 'إلتون مايو', bold: true },
						{ answer: 'مدرسة العلاقات الإنسانية', mark: '0.5' },
						{ answer: 'تجارب هوثورن وأهمية الجماعة والروح المعنوية', mark: '0.25' }
					],
					[
						{ label: 'المدرسة الموقفية (الظرفية)', bold: true },
						{ answer: 'المدارس الحديثة', mark: '0.5' },
						{ answer: 'ملاءمة أسلوب التسيير مع خصائص الموقف والبيئة', mark: '0.25' }
					]
				],
				ddCategories: ['المدرسة الكلاسيكية', 'مدرسة العلاقات الإنسانية', 'المدارس الحديثة'],
				ddItems: [
					{ text: 'دراسة الحركة والزمن (تايلور)', category: 0 },
					{ text: 'المبادئ الإدارية الـ 14 (فايول)', category: 0 },
					{ text: 'تجارب هوثورن (إلتون مايو)', category: 1 },
					{ text: 'المؤسسة كنظام مفتوح وموقفي', category: 2 }
				]
			},
			{
				docTitle: 'سند إداري: قياس الكفاءة والفاعلية وتطور التسيير',
				docText: `لا تقتصر مهمة المسير المعاصر على إتمام المهام المبرمجة فحسب، بل عليه التوفيق بين الفاعلية (بلوغ الأهداف الكمية والنوعية) والكفاءة (اقتصاد الموارد وتقليص الهدر)، مستفيداً من تطور الفكر التسييري الذي جمع بين الصرامة التنظيمية الكلاسيكية، وتقدير الإنسان في مدرسة العلاقات الإنسانية، والتحليل الكمي الحديث.`,
				rows: [
					[
						{ label: 'ماكس فيبر', bold: true },
						{ answer: 'المدرسة الكلاسيكية (النموذج البيروقراطي)', mark: '0.5' },
						{ answer: 'القواعد المكتوبة والتدرج الهرمي والكفاءة', mark: '0.25' }
					],
					[
						{ label: 'أبراهام ماسلو', bold: true },
						{ answer: 'مدرسة العلاقات الإنسانية والسلوكية', mark: '0.5' },
						{ answer: 'ترتيب الحاجات الإنسانية في هرم من 5 درجات', mark: '0.25' }
					],
					[
						{ label: 'مدرسة النظم', bold: true },
						{ answer: 'المدارس الحديثة', mark: '0.5' },
						{ answer: 'النظر للمؤسسة كنظام مفتوح يتبادل المدخلات والمخرجات', mark: '0.25' }
					],
					[
						{ label: 'المدرسة الكمية', bold: true },
						{ answer: 'المدارس الحديثة', mark: '0.5' },
						{ answer: 'تطبيق النماذج الرياضية وبحوث العمليات في القرار', mark: '0.25' }
					]
				],
				ddCategories: ['المدرسة الكلاسيكية', 'مدرسة العلاقات الإنسانية', 'المدارس الحديثة'],
				ddItems: [
					{ text: 'النموذج البيروقراطي الرشيد (فيبر)', category: 0 },
					{ text: 'فصل التخطيط عن التنفيذ (تايلور)', category: 0 },
					{ text: 'هرم الحاجات الخماسي (ماسلو)', category: 1 },
					{ text: 'النماذج الكمية وبحوث العمليات', category: 2 }
				]
			}
		];

		const v = rng.pick(variants);
		const content: ContentBlock[] = [
			buildManagementDocumentBlock({
				title: v.docTitle,
				text: v.docText,
				source: 'نصوص في الفكر التسييري المعاصر — 2 تسيير واقتصاد'
			}),
			{ type: 'text', content: '1) أكمل جدول رواد ومدارس الفكر التسييري الموالي:' },
			buildManagementTableBlock(['الرائد / المقاربة', 'المدرسة التسييرية', 'أبرز إسهام علمي'], v.rows),
			{
				type: 'text',
				content: `2) حققت ورشة إنتاج هدفها السنوي بإنتاج $${targetUnits}$ وحدة، لكن بتكلفة فعلية للوحدة قدرها $${actualCost}$ دج مقارنة بالتكلفة القياسية $${stdCost}$ دج (فارق $${costDiff > 0 ? `+${costDiff}` : costDiff}$ دج). قيّم أداء الورشة من حيث الفاعلية والكفاءة.`,
				answer: `2) من حيث الفاعلية: الورشة فعالة لأنها حققت الهدف الكمي ($${targetUnits}$ وحدة). ومن حيث الكفاءة: الورشة ${isEfficient ? 'كفؤة لأنها خفضت التكلفة عن المعيار بـ ' + Math.abs(costDiff) + ' دج للوحدة' : 'غير كفؤة لأنها تجاوزت التكلفة المعيارية بـ ' + costDiff + ' دج نتيجة هدر في الموارد'}.`,
				mark: '1'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_eco',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'drag_drop',
				questionText: 'صنّف كل إسهام تسييري ضمن مدرسته الإدارية الصحيحة:',
				questionTextAr: 'اسحب كل عنصر إلى مدرسته الفكرية:',
				questionData: {
					categories: v.ddCategories,
					items: rng.shuffle(v.ddItems)
				},
				explanation:
					'انتقل الفكر التسييري من التركيز الكلاسيكي على العمل والهيكل، إلى العلاقات الإنسانية والتحفيز، ثم النظرة النظمية والموقفية الحديثة.'
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'ادرس السند والموقف العملي الآتيين ثم أجب عن الأسئلة:',
				content
			},
			hints: [
				'الفاعلية = بلوغ الهدف المسطر؛ الكفاءة = حسن استغلال الموارد وتقليص التكاليف.',
				'المدرسة الكلاسيكية تضم تايلور وفايول وفيبر.',
				'مدرسة العلاقات الإنسانية تضم إلتون مايو وماسلو.'
			],
			solutionStepsAr: [
				'نسب كل رائد إلى مدرسته وتلخيص مساهمته في الفكر الإداري.',
				`تقييم الفاعلية (تحقق $${targetUnits}$ وحدة) والكفاءة (مقارنة $${actualCost}$ بـ $${stdCost}\\text{ دج}$).`
			],
			finalAnswer: v.ddItems.map((it) => `${it.text}: ${v.ddCategories[it.category]}`).join(' | ')
		};
	}
};

// [2] وظائف التسيير: التخطيط والتنظيم (4 ن) — يستخدم mgt_03_management_functions
const tpl2asEcoT3PlanningOrganizing: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_2as_eco_t3_planning_organizing',
	grade: '2as_eco',
	trimesterId: 't3',
	domain: 'man_functions',
	titleAr: 'وظائف التسيير: التخطيط وأنواعه ومبادئ التنظيم',
	curriculumLessonId: 'mgt_lesson_2as_eco_t3_planning_organizing',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const growthPct = difficulty === 'easy' ? 15 : rng.pick([20, 25]);
		const years = rng.pick([3, 5]);

		const orderedSteps = [
			'دراسة الوضع الراهن والتنبؤ بالبيئة',
			'تحديد الأهداف القابلة للقياس',
			'وضع البدائل الممكنة وتقييمها',
			'اختيار الخطة المثلى وتفصيلها بموازنات'
		];
		const scrambled = scrambleOrdering(orderedSteps, rng);

		const rows: Array<Array<{ label?: string; answer?: string; mark?: string; bold?: boolean }>> = [
			[
				{ label: `خطة رفع الصادرات بـ ${growthPct}% خلال ${years} سنوات`, bold: true },
				{ answer: 'التخطيط الاستراتيجي (الإدارة العليا)', mark: '0.5' }
			],
			[
				{ label: 'خطة تطوير مصلحة التغليف خلال 18 شهراً', bold: true },
				{ answer: 'التخطيط التكتيكي (الإدارة الوسطى)', mark: '0.5' }
			],
			[
				{ label: 'جدول المناوبات الأسبوعي لعمال الورشة', bold: true },
				{ answer: 'التخطيط التشغيلي (الإدارة التنفيذية)', mark: '0.5' }
			],
			[
				{ label: 'تلقي كل عامل أوامره من مشرف مباشر واحد', bold: true },
				{ answer: 'مبدأ وحدة الأمر (في التنظيم)', mark: '0.5' }
			]
		];

		const content: ContentBlock[] = [
			buildIllustratedFigureBlock('mgt_03_management_functions', {
				title: 'وظائف التسيير الأربع في المؤسسة (التخطيط، التنظيم، التوجيه، الرقابة)',
				mode: 'image_only',
				pins: [],
				width: '62%',
				maxHeight: 130,
				caption: 'تتكامل الوظائف الأربع لضمان كفاءة وفاعلية المؤسسة'
			}),
			{
				type: 'text',
				content: '1) صنّف الخطط والمبادئ التنظيمية الآتية في الجدول المرفق:'
			},
			buildManagementTableBlock(['النشاط أو القرار الإداري', 'نوع التخطيط أو المبدأ التنظيمي'], rows),
			{
				type: 'text',
				content:
					'2) اشرح معنى «تفويض السلطة» وبين أثره على سرعة الإنجاز، مع توضيح مصير المسؤولية النهائية للمدير المفوِّض.',
				answer:
					'2) تفويض السلطة هو منح المدير جزءاً من صلاحيات اتخاذ القرار إلى المرؤوسين لإنجاز مهام محددة بسرعة ومرونة وتخفيف العبء عن الإدارة العليا. غير أن المسؤولية النهائية عن نتائج العمل تبقى قائمة على المدير المفوِّض أمام المستوى الأعلى.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'3) ميّز بين «نطاق الإشراف الضيق» و«نطاق الإشراف الواسع»، واذكر حالة تستدعي تضييق نطاق الإشراف.',
				answer:
					'3) نطاق الإشراف هو عدد المرؤوسين الذين يشرف عليهم مدير واحد مباشرة؛ يضيق النطاق (عدد قليل) عندما تكون المهام معقدة أو دقيقة أو العمال جدداً يحتاجون لتوجيه مستمر، ويتسع عندما تكون المهام روتينية والعمال ذوي خبرة عالية.',
				mark: '1'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_eco',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'ordering',
				questionText: 'رتّب المراحل المنهجية لعملية التخطيط الإداري من الخطوة الأولى إلى الأخيرة:',
				questionTextAr: 'رتّب خطوات التخطيط بالترتيب الصحيح:',
				imageUrl: getIllustrationWebpUrl('mgt_03_management_functions'),
				imageCaption: 'وظائف التسيير الأربع',
				questionData: {
					items: scrambled.items,
					correctOrder: scrambled.correctOrder
				},
				explanation:
					'يبدأ التخطيط بتشخيص الوضع والتنبؤ، ثم تحديد الأهداف، فطرح البدائل وتقييمها، وأخيراً اختيار الخطة وتفصيلها.'
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'بالاستعانة بالشكل التوضيحي ومكتسباتك في التخطيط والتنظيم، أجب عن الآتي:',
				content
			},
			hints: [
				'المدى الزمني والمستوى الإداري يميزان بين الاستراتيجي والتكتيكي والتشغيلي.',
				'السلطة تُفوَّض أما المسؤولية النهائية فلا تسقط عن المفوِّض.',
				'يتحدد نطاق الإشراف بتعقيد العمل وكفاءة المرؤوسين.'
			],
			solutionStepsAr: [
				'تصنيف الخطط الثلاث ومبدأ وحدة الأمر في الجدول.',
				'تعريف تفويض السلطة وبقاء المسؤولية النهائية.',
				'التمييز بين نطاق الإشراف الواسع والضيق.'
			],
			finalAnswer: orderedSteps.join(' ← ')
		};
	}
};

// [3] التوجيه والاتصال والتحفيز (4 ن)
const tpl2asEcoT3DirectingCommunication: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_2as_eco_t3_directing_communication',
	grade: '2as_eco',
	trimesterId: 't3',
	domain: 'man_leadership_control',
	titleAr: 'التوجيه الإداري وشبكة الاتصال والتحفيز المشروع',
	curriculumLessonId: 'mgt_lesson_2as_eco_t3_directing_communication',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const delayPct = difficulty === 'easy' ? 25 : rng.pick([30, 35, 40]);

		const caseBlocks = buildCaseStudyBlocks({
			title: 'دراسة حالة: خلل الاتصال في مؤسسة «الوفاق للبناء»',
			facts: `أصدر مدير مشروع في مؤسسة «الوفاق للبناء» تعميماً ورقياً مقتضباً بمصطلحات هندسية غير مألوفة يطلب تعديل مواعيد صب الخرسانة، دون شرحه شفهياً أو انتظار ردّ وتأكيد من رؤساء الفرق. وفي اليوم الموالي، أظهرت المعطيات تأخر ${delayPct}% من الفرق عن الموعد الجديد، بينما بعث رؤساء الورشات تقريراً يشكون فيه من غياب التنسيق مع مصلحة التموين، كما اقترحوا نظام تحفيز يجمع بين مكافأة مالية حلال عن كل شهر خالٍ من التأخير ولوحة تقدير أسبوعية.`,
			questions: [
				{
					q: '1) حدّد عنصر الاتصال المفقود في التعميم الأول، وميّز بين اتجاهي الاتصال الظاهرين (تعميم المدير، وتقرير رؤساء الورشات).',
					a: '1) العنصر المفقود هو التغذية الراجعة (Feedback). تعميم المدير للفرق هو اتصال رسمي نازل، أما التقرير المرفوع من الورشات للإدارة فهو اتصال رسمي صاعد.',
					mark: '1.5'
				},
				{
					q: '2) استخرج معيقين اثنين من معيقات الاتصال في هذه الحالة، واقترح نوع الاتصال المناسب لحل مشكل التنسيق بين الورشات ومصلحة التموين.',
					a: '2) المعيقات: استخدام مصطلحات تقنية غامضة (معيق لغوي وإدراكي)، والاقتصار على قناة كتابية جافة دون تغذية راجعة. ولحل التنسيق مع مصلحة التموين يجب تفعيل الاتصال الأفقي المباشر بين الوحدات المتوازية.',
					mark: '1.5'
				},
				{
					q: '3) صنّف الحافزين المقترحين من رؤساء الورشات، وبيّن صلتهما بركائز وظيفة التوجيه.',
					a: '3) المكافأة المرتبطة بالالتزام بالمواعيد حافز مادي حلال، ولوحة التقدير الأسبوعية حافز معنوي؛ وكلاهما يجسّد ركيزة التحفيز إلى جانب القيادة والاتصال ضمن وظيفة التوجيه.',
					mark: '1'
				}
			]
		});

		const clozeOptions = rng.shuffle(['التغذية الراجعة', 'الاتصال الأفقي', 'التشويش اللغوي', 'الاتصال النازل']);
		const correctIndex = clozeOptions.indexOf('التغذية الراجعة');

		return {
			templateId: this.id,
			seed,
			grade: '2as_eco',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'cloze',
				questionText: 'أكمل العبارة الإدارية بالمفهوم الصحيح:',
				questionTextAr: 'اختر المصطلح المناسب لإكمال الفراغ:',
				questionData: {
					sentence: 'تُسمّى استجابة المستقبل التي تؤكد للمرسل استلام الرسالة وفهمها بدقة بـ ___ .',
					options: clozeOptions,
					correctIndex
				},
				explanation:
					'التغذية الراجعة هي رد الفعل أو الإشارة العكسية التي تغلق حلقة الاتصال وتمنع سوء الفهم.'
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'ادرس الحالة الإدارية الآتية وأجب عن الأسئلة الثلاثة:',
				content: caseBlocks
			},
			hints: [
				'الاتصال من أعلى إلى أسفل نازل، ومن أسفل إلى أعلى صاعد، وبين المصالح المتساوية أفقي.',
				'تحقق الرسالة غايتها فقط عند وجود تغذية راجعة.',
				'وظيفة التوجيه ترتكز على: القيادة والتحفيز والاتصال.'
			],
			solutionStepsAr: [
				'تشخيص غياب التغذية الراجعة وتصنيف الاتصال النازل والصاعد.',
				'تحديد المعيق اللغوي واقتراح الاتصال الأفقي مع التموين.',
				'تصنيف الحوافز المادية الحلال والمعنوية في إطار وظيفة التوجيه.'
			],
			finalAnswer: 'التغذية الراجعة'
		};
	}
};

// [4] الرقابة وحساب الانحرافات وتصحيحها (4 ن)
const tpl2asEcoT3ControlDeviations: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_2as_eco_t3_control_deviations',
	grade: '2as_eco',
	trimesterId: 't3',
	domain: 'man_leadership_control',
	titleAr: 'وظيفة الرقابة وحساب وتحليل الانحرافات',
	curriculumLessonId: 'mgt_lesson_2as_eco_t3_controlling_deviations',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const planProd = difficulty === 'easy' ? 1000 : rng.pick([1000, 2000]);
		const devProdPct = rng.pick([-10, 10]);
		const actualProd = Math.round(planProd * (1 + devProdPct / 100));
		const devProd = actualProd - planProd;

		const planCost = rng.pick([2000000, 4000000]);
		const devCostPct = rng.pick([-5, 10]);
		const actualCost = Math.round(planCost * (1 + devCostPct / 100));
		const devCost = actualCost - planCost;

		const planDefects = 20;
		const actualDefects = rng.pick([15, 30]);
		const devDefects = actualDefects - planDefects;
		const devDefectsPct = roundTo((devDefects / planDefects) * 100, 1);

		const rows: Array<Array<{ label?: string; answer?: string; mark?: string; bold?: boolean }>> = [
			[
				{ label: 'كمية الإنتاج (وحدة)', bold: true },
				{ label: `${formatDzd(planProd)}` },
				{ label: `${formatDzd(actualProd)}` },
				{ answer: `${devProd > 0 ? `+${devProd}` : devProd} (${devProdPct > 0 ? `+${devProdPct}` : devProdPct}%)`, mark: '0.5' },
				{ answer: devProd >= 0 ? 'ملائم (إيجابي)' : 'غير ملائم (سلبي)', mark: '0.5' }
			],
			[
				{ label: 'التكاليف الإجمالية (دج)', bold: true },
				{ label: `${formatDzd(planCost)}` },
				{ label: `${formatDzd(actualCost)}` },
				{ answer: `${devCost > 0 ? `+${formatDzd(devCost)}` : formatDzd(devCost)} (${devCostPct > 0 ? `+${devCostPct}` : devCostPct}%)`, mark: '0.5' },
				{ answer: devCost <= 0 ? 'ملائم (وفر في التكلفة)' : 'غير ملائم (تجاوز)', mark: '0.5' }
			],
			[
				{ label: 'عدد الوحدات المعيبة (وحدة)', bold: true },
				{ label: `${planDefects}` },
				{ label: `${actualDefects}` },
				{ answer: `${devDefects > 0 ? `+${devDefects}` : devDefects} (${devDefectsPct > 0 ? `+${devDefectsPct}` : devDefectsPct}%)`, mark: '0.5' },
				{ answer: devDefects <= 0 ? 'ملائم (تحسن الجودة)' : 'غير ملائم (تراجع الجودة)', mark: '0.5' }
			]
		];

		const content: ContentBlock[] = [
			{
				type: 'text',
				content:
					'1) يبيّن الجدول الموالي معايير الأداء المخططة والإنجازات الفعلية لإحدى الورشات الإنتاجية. احسب الانحراف المطلق والنسبي ($Delta = "الفعلي" - "المخطط"$) وحدّد طبيعته (ملائم أو غير ملائم):'
			},
			buildManagementTableBlock(
				['المؤشر الرقابي', 'المعيار المخطط', 'الأداء الفعلي', 'الانحراف المطلق والنسبي', 'طبيعة الانحراف'],
				rows
			),
			{
				type: 'text',
				content:
					'2) حدّد الفرق بين الرقابة القبلية والرقابة المتزامنة والرقابة البعدية مع إعطاء مثال تطبيقي على كل نوع في هذه الورشة.',
				answer:
					'2) الرقابة القبلية (الوقائية): تسبق الإنتاج كفحص المواد الأولية وصيانة الآلة قبل التشغيل؛ الرقابة المتزامنة: ترافق التنفيذ لحظياً كمتابعة المشرف لجودة الضبط أثناء العمل؛ الرقابة البعدية: تتم بعد انتهاء الفترة كإعداد جدول الانحرافات أعلاه لتقييم النتائج وتصحيح خطط الشهر المقبل.',
				mark: '1'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_eco',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'true_false',
				questionText: `إذا كانت التكلفة المخططة لورشة هي $${formatDzd(planCost)}\\text{ دج}$ والتكلفة الفعلية المحققة هي $${formatDzd(actualCost)}\\text{ دج}$ بنفس الجودة المطلوبة، فإن هذا الانحراف يُعد انحرافاً ملائماً للمؤسسة.`,
				questionTextAr: 'حدّد صحة أو خطأ الحكم على انحراف التكلفة:',
				questionData: {
					correctAnswer: devCost <= 0
				},
				explanation:
					devCost <= 0
						? `صحيح؛ لأن التكلفة الفعلية أقل من المخططة بمقدار $${Math.abs(devCost)}\\text{ دج}$، وهو وفر إيجابي ملائم.`
						: `خطأ؛ لأن التكلفة الفعلية تجاوزت المخططة بمقدار $${devCost}\\text{ دج}$، مما يجعل الانحراف غير ملائم.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'ادرس جدول المقارنة الرقابية التالي وأجب عن المطلوب:',
				content
			},
			hints: [
				'الانحراف = الفعلي − المخطط، والنسبي = (الانحراف ÷ المخطط) × 100.',
				'زيادة الإنتاج عن المخطط ملائمة، بينما زيادة التكاليف أو العيوب غير ملائمة.',
				'انخفاض التكاليف عن المعيار مع حفظ الجودة يُعد انحرافاً ملائماً.'
			],
			solutionStepsAr: [
				`انحراف الإنتاج: $${devProd}$ ($${devProdPct}\\%$).`,
				`انحراف التكاليف: $${formatDzd(devCost)}\\text{ دج}$ ($${devCostPct}\\%$).`,
				`انحراف العيوب: $${devDefects}$ ($${devDefectsPct}\\%$)، وتصنيف أنواع الرقابة الثلاثة.`
			],
			finalAnswer: devCost <= 0 ? 'صحيح' : 'خطأ'
		};
	}
};

// [5] مسألة إدماجية شاملة لنهاية السنة الثانية (8 ن)
const tpl2asEcoT3IntegrationComprehensive: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_2as_eco_t3_integration_comprehensive',
	grade: '2as_eco',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'مسألة إدماجية شاملة: الاقتصاد والمناجمنت (نهاية السنة 2AS)',
	curriculumLessonId: 'mgt_lesson_2as_eco_t3_controlling_deviations',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const qUnits = difficulty === 'easy' ? 2000 : rng.pick([2500, 3000]);
		const price = rng.pick([1000, 1200]);
		const prodVal = qUnits * price;
		const ciVal = Math.round(prodVal * 0.4);
		const vaVal = prodVal - ciVal;
		const workers = 25;
		const prodWorker = roundTo(vaVal / workers, 2);

		const planSales = qUnits;
		const actualSales = Math.round(planSales * 0.9); // -10%
		const salesDev = actualSales - planSales;

		const content: ContentBlock[] = [
			buildManagementDocumentBlock({
				title: 'مسألة إدماجية شاملة: مؤسسة «المنار للتجهيزات المكتبية»',
				text: `تعتزم مؤسسة «المنار» الخاصة والمصغرة سابقاً والتي تطورت لتشغل اليوم ${workers} عاملاً تنفيذ خطة توسع لمدة 4 سنوات. خلال الشهر الجاري أنتجت ${formatDzd(qUnits)} وحدة بسعر بيع ${formatDzd(price)} دج للوحدة، باستهلاك وسيطي قدره ${formatDzd(ciVal)} دج. غير أن تقرير المتابعة كشف عن بيع ${formatDzd(actualSales)} وحدة فقط بدلاً من ${formatDzd(planSales)} وحدة المخططة بسبب ضعف التنسيق الأفقي بين الإنتاج والتسويق، ولذلك دعا المدير العام إلى مراجعة نظام التحفيز وتفعيل الرقابة.`,
				source: 'مسألة إدماجية ختامية — 2 ثانوي تسيير واقتصاد'
			}),
			{
				type: 'text',
				content: `1) احسب القيمة المضافة $"VA"$ للمؤسسة وإنتاجية العامل الواحد بالقيمة المضافة، ثم صنّف المؤسسة حسب الحجم والنشاط والملكية.`,
				answer: `1) $P = ${qUnits} times ${price} = ${formatDzd(prodVal)}$ دج.\n- $"VA" = ${formatDzd(prodVal)} - ${formatDzd(ciVal)} = ${formatDzd(vaVal)}$ دج.\n- إنتاجية العامل $= frac(${vaVal}, ${workers}) = ${formatDzd(prodWorker)}$ دج/عامل.\n- التصنيف: مؤسسة خاصة، صناعية (القطاع الثانوي)، وصغيرة الحجم (${workers} عاملاً ضمن المجال 10 إلى 49 عاملاً).`,
				mark: '2.5'
			},
			{
				type: 'text',
				content:
					'2) احسب الانحراف الكمي والنسبي للمبيعات، وحدّد نوع التخطيط في خطة الـ 4 سنوات ونوع الرقابة التي كشفت هذا التراجع.',
				answer: `2) انحراف المبيعات $= ${actualSales} - ${planSales} = ${salesDev}$ وحدة ($-10$%)، وهو انحراف غير ملائم. خطة الـ 4 سنوات تمثل تخطيطاً استراتيجياً، وكشف التراجع عبر التقرير الشهري يمثل رقابة بعدية.`,
				mark: '2'
			},
			{
				type: 'text',
				content:
					'3) اقترح حلين في التوجيه والاتصال لمعالجة ضعف التنسيق ورفع الروح المعنوية (باستعمال حوافز حلال).',
				answer:
					'3) تفعيل الاتصال الأفقي باجتماعات تنسيق أسبوعية بين الإنتاج والتسويق مع تغذية راجعة مستمرة، واعتماد نظام تحفيز يجمع بين الحوافز المادية الحلال (مكافأة مرتبطة بتحقيق أهداف البيع والجودة) والحوافز المعنوية كالتقدير والتكوين.',
				mark: '2'
			},
			{
				type: 'text',
				content:
					'4) إذا أرادت المؤسسة مستقبلاً تخفيض سعرها بنسبة 10% لتسويق المخزون المتبقي وكانت مرونة الطلب السعرية $E_p = -1.8$، فهل سيزداد رقم أعمالها؟ علّل إجابتك.',
				answer:
					'4) نعم، سيزداد رقم الأعمال؛ لأن $|E_p| = 1.8 > 1$ (طلب مرن)، مما يعني أن تخفيض السعر بـ 10% سيرفع الكمية المطلوبة بنسبة 18%، وهي زيادة تفوق نسبة التخفيض السعري فترتفع الإيرادات.',
				mark: '1.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_eco',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `في مسألة مؤسسة «المنار»: إذا كانت قيمة الإنتاج $${prodVal}\\text{ دج}$ والاستهلاك الوسيطي $${ciVal}\\text{ دج}$ وعدد العمال $${workers}$، فما قيمة إنتاجية العامل الواحد بالقيمة المضافة (بالدينار الجزائري)؟`,
				questionTextAr: 'احسب إنتاجية العامل بالقيمة المضافة (دج/عامل):',
				questionData: {
					answer: prodWorker,
					displayTemplate: 'P_L = ? DZD',
					variables: [],
					tolerance: 1
				},
				explanation: `$$VA = ${prodVal} - ${ciVal} = ${vaVal}\\text{ دج} \\implies P_L = \\frac{${vaVal}}{${workers}} = ${prodWorker}\\text{ دج/عامل}$$`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية الشاملة (08 نقاط)',
				points: this.defaultPoints,
				instruction: 'اقرأ المسألة الإدماجية الشاملة الآتية وأجب عن الأسئلة الأربعة بالتسلسل:',
				content
			},
			hints: [
				'استخرج القيمة المضافة أولاً ($VA = P - CI$) قبل حساب إنتاجية العامل.',
				'خطة تمتد لـ 4 سنوات هي تخطيط استراتيجي، ومقارنة نهاية الشهر رقابة بعدية.',
				'استخدم علاقة المرونة السعرية برقم الأعمال عند $|E_p| > 1$.'
			],
			solutionStepsAr: [
				`حساب $VA = ${formatDzd(vaVal)}$ دج وإنتاجية العامل $= ${formatDzd(prodWorker)}$ دج، وتصنيف المؤسسة.`,
				`حساب انحراف المبيعات ($${salesDev}$ وحدة، $-10\\%$) وتحديد التخطيط والرقابة.`,
				'تقديم حلول الاتصال الأفقي والتحفيز الحلال وحساب أثر المرونة $E_p = -1.8$.'
			],
			finalAnswer: `${prodWorker}`
		};
	}
};

export const TEMPLATES_2AS_ECO_T3: ManagementParameterizedTemplate[] = [
	tpl2asEcoT3ManagementSchools,
	tpl2asEcoT3PlanningOrganizing,
	tpl2asEcoT3DirectingCommunication,
	tpl2asEcoT3ControlDeviations,
	tpl2asEcoT3IntegrationComprehensive
];
