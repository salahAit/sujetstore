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
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';

// ============================================================================
// 2AS GE (الاقتصاد والمناجمنت) — Trimester 1: 5 Parameterized Templates
// ============================================================================

// [1] المشكلة الاقتصادية وتصنيف الحاجات والخيرات (4 ن)
const tpl2asEcoT1EconomicProblemNeeds: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_2as_eco_t1_economic_problem_needs',
	grade: '2as_eco',
	trimesterId: 't1',
	domain: 'eco_micro',
	titleAr: 'المشكلة الاقتصادية وتصنيف الحاجات والخيرات',
	curriculumLessonId: 'mgt_lesson_2as_eco_t1_economic_problem',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const budgetM = difficulty === 'easy' ? rng.pick([40, 50, 60]) : rng.pick([75, 90, 120]);
		const schoolCost = Math.round(budgetM * 0.6);
		const clinicCost = Math.round(budgetM * 0.4);
		const parkCost = Math.round(budgetM * 0.35);

		const variants = [
			{
				docTitle: 'سند اقتصادي: الندرة النسبية وترتيب الأولويات في ميزانية محلية',
				docText: `خصصت بلدية ميزانية تجهيز قدرها ${budgetM} مليون دج للسنة المالية الحالية، وقدرت كلفة بناء مدرسة ابتدائية بـ ${schoolCost} مليون دج، وتجهيز قاعة علاج بـ ${clinicCost} مليون دج، وتهيئة حديقة ترفيهية بـ ${parkCost} مليون دج. اضطر المجلس البلدي إلى اعتماد [[المشكلة الاقتصادية]] في قراراته وتقديم التعليم والصحة على الترفيه، مع تحمّل [[تكلفة الفرصة البديلة]] للخيار المؤجّل.`,
				docSource: 'وثيقة تطبيقية في المبادئ الأساسية للاقتصاد — 2 تسيير واقتصاد',
				rows: [
					[
						{ label: 'أشعة الشمس في الطبيعة', bold: true },
						{ answer: 'خير حر (غير نادر مجاني)', mark: '0.5' },
						{ answer: 'لا يتطلب تكلفة إنتاج', mark: '0.25' }
					],
					[
						{ label: 'سيارة أجرة لنقل المسافرين', bold: true },
						{ answer: 'خير اقتصادي إنتاجي معمر', mark: '0.5' },
						{ answer: 'يستخدم في إنتاج خدمة النقل', mark: '0.25' }
					],
					[
						{ label: 'خبز مقتنى للاستهلاك العائلي', bold: true },
						{ answer: 'خير اقتصادي استهلاكي فانٍ', mark: '0.5' },
						{ answer: 'يفنى بأول استعمال لإشباع الجوع', mark: '0.25' }
					],
					[
						{ label: 'خدمة التعليم الثانوي', bold: true },
						{ answer: 'خير اقتصادي غير مادي (خدمة)', mark: '0.5' },
						{ answer: 'تلبية حاجة أساسية جماعية', mark: '0.25' }
					]
				],
				q3: `3) انطلاقاً من السند، فسّر سبب اضطرار البلدية لتأجيل الحديقة رغم منفعتها، ثم حدّد الأسئلة الاقتصادية الثلاثة التي يفرضها واقع الندرة (مع احتساب تكلفة الفرصة البديلة).`,
				a3: `3) اضطرت البلدية لتأجيل الحديقة لأن مجموع كلفة المشاريع الثلاثة (${schoolCost + clinicCost + parkCost} مليون دج) يتجاوز الميزانية المحدودة (${budgetM} مليون دج)، مما يجسد الندرة النسبية وترتيب الحاجات حسب الأولوية (الضروريات قبل التحسينيات). تكلفة الفرصة البديلة لاختيار المدرسة وقاعة العلاج هي منفعة الحديقة المؤجلة (${parkCost} مليون دج). الأسئلة الثلاثة هي: ماذا ننتج؟ كيف ننتج؟ ولمن ننتج؟`,
				ddCategories: ['خير اقتصادي استهلاكي', 'خير اقتصادي إنتاجي', 'خير حر'],
				ddItems: [
					{ text: 'الهواء الطبيعي غير المعبأ', category: 2 },
					{ text: 'آلة خياطة في مصنع ألبسة', category: 1 },
					{ text: 'جرار فلاحي في مزرعة', category: 1 },
					{ text: 'حصة غذاء عائلية', category: 0 }
				]
			},
			{
				docTitle: 'سند اقتصادي: خصائص الحاجات الإنسانية والنشاط الاقتصادي',
				docText: `تتزايد حاجات الأسرة باستمرار بين الغذاء والدواء والسكن والتكوين الرقمي، في حين يبقى الدخل الشهري محدوداً عند ${budgetM * 1000} دج. تدفع هذه الفجوة الأسرة والمجتمع إلى تنظيم [[النشاط الاقتصادي]] عبر الإنتاج والتوزيع والمبادلة والاستهلاك لإشباع [[الحاجات الإنسانية]] المتجددة بأقصى كفاءة ممكنة.`,
				docSource: 'ملف بيداغوجي — الحاجات والخيرات والنشاط الاقتصادي',
				rows: [
					[
						{ label: 'مياه البحر المفتوح', bold: true },
						{ answer: 'خير حر متاح بكميات غير نادرة', mark: '0.5' },
						{ answer: 'لا يخضع لتداول سعري', mark: '0.25' }
					],
					[
						{ label: 'فرن كهربائي في مخبزة تجارية', bold: true },
						{ answer: 'خير اقتصادي إنتاجي معمر', mark: '0.5' },
						{ answer: 'يساعد في إنتاج سلع أخرى', mark: '0.25' }
					],
					[
						{ label: 'هاتف شخصي للاستعمال العائلي', bold: true },
						{ answer: 'خير اقتصادي استهلاكي معمر', mark: '0.5' },
						{ answer: 'يدوم لعدة استخدامات عائلية', mark: '0.25' }
					],
					[
						{ label: 'دقيق مقتنى لتحضير الطعام بالمنزل', bold: true },
						{ answer: 'خير اقتصادي استهلاكي فانٍ', mark: '0.5' },
						{ answer: 'ينتهي باستهلاكه مرة واحدة', mark: '0.25' }
					]
				],
				q3: '3) بيّن خاصيتين من خصائص الحاجات الإنسانية، ثم عدّد أطوار النشاط الاقتصادي الأربعة بالترتيب المنهجي.',
				a3: '3) من خصائص الحاجات: القابلية للإشباع (تناقص حدة الحاجة مع تزايد الاستهلاك) والتعدد والتجدد والاستمرارية. أطوار النشاط الاقتصادي بالترتيب: الإنتاج (خلق المنفعة) ← التوزيع (تخصيص المداخيل) ← المبادلة (السوق) ← الاستهلاك النهائي.',
				ddCategories: ['خير اقتصادي استهلاكي', 'خير اقتصادي إنتاجي', 'خير حر'],
				ddItems: [
					{ text: 'أشعة الشمس في الطبيعة', category: 2 },
					{ text: 'مخرطة صناعية في ورشة', category: 1 },
					{ text: 'شاحنة نقل بضائع لشركة', category: 1 },
					{ text: 'ثلاجة في مطبخ عائلي', category: 0 }
				]
			}
		];

		const v = rng.pick(variants);

		const content: ContentBlock[] = [
			buildManagementDocumentBlock({
				title: v.docTitle,
				text: v.docText,
				source: v.docSource
			}),
			{
				type: 'text',
				content: '1) صنّف الخيرات الآتية في الجدول الموالي مبيناً نوع الخير وتعليله الاقتصادي:'
			},
			buildManagementTableBlock(['الخير / الخدمة', 'التصنيف الاقتصادي', 'التعليل الموجز'], v.rows),
			{
				type: 'text',
				content: v.q3,
				answer: v.a3,
				mark: '1'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_eco',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'drag_drop',
				questionText: 'صنّف كل عنصر في الخانة الاقتصادية المناسبة له:',
				questionTextAr: 'اسحب كل خير إلى فئته الصحيحة:',
				questionData: {
					categories: v.ddCategories,
					items: rng.shuffle(v.ddItems)
				},
				explanation:
					'يُميّز بين الخير الحر (غير النادر والمجاني) والخير الاقتصادي الاستهلاكي (لإشباع مباشر) والإنتاجي (لإنتاج سلع وخدمات أخرى).'
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'اقرأ السند الاقتصادي الآتي ثم أجب عن المطلوب بدقة:',
				content
			},
			hints: [
				'تنبع المشكلة الاقتصادية من الندرة النسبية للموارد مقارنة بتعدد الحاجات وتجددها.',
				'تُصنف السلعة إلى استهلاكية أو إنتاجية حسب غرض استعمالها الفعلي.',
				'رتّب الحاجات دائماً من الضروريات إلى الحاجيات ثم التحسينيات.'
			],
			solutionStepsAr: [
				'تحليل حالة الندرة النسبية في السند وتحديد تكلفة الفرصة البديلة.',
				'تصنيف الخيرات وفق معياري الندرة وغرض الاستخدام (استهلاكي/إنتاجي/حر).',
				'صياغة الأسئلة الاقتصادية الثلاثة وأطوار النشاط الاقتصادي.'
			],
			finalAnswer: v.ddItems.map((it) => `${it.text}: ${v.ddCategories[it.category]}`).join(' | ')
		};
	}
};

// [2] الأعوان الاقتصاديون والدورة الاقتصادية (4 ن) — يستخدم mgt_01_economic_circuit
const tpl2asEcoT1EconomicCircuitAgents: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_2as_eco_t1_economic_circuit_agents',
	grade: '2as_eco',
	trimesterId: 't1',
	domain: 'eco_macro',
	titleAr: 'الأعوان الاقتصاديون والتدفقات في الدورة الاقتصادية',
	curriculumLessonId: 'mgt_lesson_2as_eco_t1_economic_agents_circuit',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const salary = difficulty === 'easy' ? rng.pick([60000, 80000]) : rng.pick([75000, 90000, 110000]);
		const taxRate = 0.1;
		const tax = Math.round(salary * taxRate);
		const saveRate = rng.pick([0.2, 0.25]);
		const saving = Math.round(salary * saveRate);
		const consumption = salary - tax - saving;

		const rows: Array<Array<{ label?: string; answer?: string; mark?: string; bold?: boolean }>> = [
			[
				{ label: `أداء العمل الهندسي من العائلات للمؤسسة`, bold: true },
				{ answer: 'من العائلات إلى المؤسسات', mark: '0.25' },
				{ answer: 'تدفق حقيقي (عيني)', mark: '0.25' }
			],
			[
				{ label: `دفع الأجر الشهري (${formatDzd(salary)} دج) للعائلات`, bold: true },
				{ answer: 'من المؤسسات إلى العائلات', mark: '0.25' },
				{ answer: 'تدفق نقدي', mark: '0.25' }
			],
			[
				{ label: `شراء سلع استهلاكية بقيمة ${formatDzd(consumption)} دج`, bold: true },
				{ answer: 'من العائلات إلى المؤسسات (مقابل السلع)', mark: '0.25' },
				{ answer: 'تدفق نقدي يقابله تدفق حقيقي للسلع', mark: '0.25' }
			],
			[
				{ label: `دفع ضريبة الدخل (${formatDzd(tax)} دج)`, bold: true },
				{ answer: 'من العائلات إلى الإدارات العمومية', mark: '0.25' },
				{ answer: 'تدفق نقدي أحادي الجانب', mark: '0.25' }
			]
		];

		const mcq = buildUniqueMcqOptions(
			`${formatDzd(saving)} دج في حساب مشاركة إسلامي حلال`,
			[
				{
					text: `${formatDzd(saving + tax)} دج كأجور إضافية دون ضرائب`,
					diagnosticFeedback: 'انتبه: الضريبة تخرج للإدارات العمومية، والمتبقي بعد الاستهلاك والضريبة هو الادخار.'
				},
				{
					text: `${formatDzd(consumption)} دج للاكتناز المنزلي`,
					diagnosticFeedback: 'هذا هو الإنفاق الاستهلاكي وليس الادخار، والاكتناز يعطل الدورة.'
				},
				{
					text: `${formatDzd(Math.round(saving / 2))} دج في قرض ربوي`,
					diagnosticFeedback: 'الفائدة الربوية محرمة شرعاً، كما أخطأت في حساب قيمة الادخار المتبقي.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			buildIllustratedFigureBlock('mgt_01_economic_circuit', {
				title: 'مخطط الدورة الاقتصادية بين الأعوان الاقتصاديين',
				mode: 'image_only',
				pins: [],
				width: '64%',
				maxHeight: 132,
				caption: 'لاحظ التدفقات المتقابلة بين العائلات والمؤسسات والإدارات والمصارف'
			}),
			buildManagementDocumentBlock({
				title: 'وضعية: شبكة المعاملات في الدورة الاقتصادية',
				text: `يتقاضى موظف من عون العائلات راتباً شهرياً قدره ${formatDzd(salary)} دج من مؤسسة إنتاجية؛ يدفع ضريبة دخل بمبلغ ${formatDzd(tax)} دج للإدارات العمومية، وينفق ${formatDzd(consumption)} دج على السلع والخدمات، ويودع الباقي في بنك إسلامي بصيغة المضاربة الحلال لتمويل مشاريع حقيقية في المؤسسات.`
			}),
			{
				type: 'text',
				content: '1) بالاستعانة بالمخطط والسند، أكمل الجدول الآتي لتحديد اتجاه ونوع كل تدفق اقتصادي:'
			},
			buildManagementTableBlock(['العملية الاقتصادية', 'الأطراف واتجاه التدفق', 'نوع التدفق'], rows),
			{
				type: 'text',
				content:
					'2) احسب مبلغ الادخار العائلي المودع في البنك الإسلامي، ثم بيّن دور هذا الادخار الحلال في تحقيق توازن الدورة الاقتصادية دون ربا أو اكتناز.',
				answer: `2) الادخار العائلي الحلال = ${formatDzd(salary)} - ${formatDzd(tax)} - ${formatDzd(consumption)} = ${formatDzd(saving)} دج. يسهم إيداع هذا المبلغ في مصرف إسلامي في حقن السيولة مجدداً نحو الاستثمار الحقيقي للمؤسسات عبر عقود المشاركة والمرابحة، مما يمنع الاكتناز والربا ويحقق التوازن بين التسربات والحقن.`,
				mark: '2'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_eco',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `يتقاضى عامل من عون العائلات أجراً شهرياً قدره $${salary}\\text{ دج}$، يدفع منه $${tax}\\text{ دج}$ ضرائب للإدارات العمومية وينفق $${consumption}\\text{ دج}$ على الاستهلاك. ما مقدار المبلغ المتبقي وتوظيفه السليم؟`,
				questionTextAr: 'اختر المبلغ الصحيح للادخار وتوظيفه المشروع:',
				imageUrl: getIllustrationWebpUrl('mgt_01_economic_circuit'),
				imageCaption: 'الدورة الاقتصادية بين الأعوان الاقتصاديين',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الادخار = الأجر − الضرائب − الاستهلاك = $${salary} - ${tax} - ${consumption} = ${saving}\\text{ دج}$، ويُستثمر في حساب مشاركة أو مضاربة حلال.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'اعتمد على المخطط التوضيحي والسند الاقتصادي للإجابة عن الأسئلة الآتية:',
				content
			},
			hints: [
				'يمثّل انتقال العمل والسلع تدفقاً حقيقياً، بينما يمثّل انتقال الأجور والأثمان والضرائب تدفقاً نقدياً.',
				'الادخار = الدخل الإجمالي − (الضرائب المباشرة + الاستهلاك النهائي).',
				'يُحقن الادخار في الاقتصاد عبر التمويل الإسلامي المشروع لتجنب الاكتناز والربا.'
			],
			solutionStepsAr: [
				'تحديد اتجاه ونوع التدفقات الأربع في جدول الدورة الاقتصادية.',
				`حساب الادخار الحلال: $${salary} - ${tax} - ${consumption} = ${saving}\\text{ دج}$.`,
				'توضيح أثر إعادة حقن المدخرات في الاستثمار الحقيقي لتوازن الدورة.'
			],
			finalAnswer: `${formatDzd(saving)} دج في حساب مشاركة إسلامي حلال`
		};
	}
};

// [3] الإنتاج والقيمة المضافة وإنتاجية العمل ورأس المال (4 ن)
const tpl2asEcoT1ValueAddedProductivity: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_2as_eco_t1_value_added_productivity',
	grade: '2as_eco',
	trimesterId: 't1',
	domain: 'eco_micro',
	titleAr: 'حساب القيمة المضافة وإنتاجية عوامل الإنتاج',
	curriculumLessonId: 'mgt_lesson_2as_eco_t1_production_productivity',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const qA = difficulty === 'easy' ? rng.pick([400, 500]) : rng.pick([600, 750, 800]);
		const priceA = rng.pick([2000, 2500, 3000]);
		const prodValA = qA * priceA;
		const ciA = Math.round(prodValA * rng.pick([0.4, 0.5]));
		const vaA = prodValA - ciA;
		const workersA = rng.pick([20, 25]);
		const hoursPerWorker = 160;
		const totalHoursA = workersA * hoursPerWorker;
		const prodWorkerA = roundTo(vaA / workersA, 2);
		const prodHourA = roundTo(vaA / totalHoursA, 2);
		const qPerWorkerA = roundTo(qA / workersA, 2);

		const capitalA = vaA * rng.pick([2, 4]);
		const prodCapA = roundTo(vaA / capitalA, 2);

		const qB = Math.round(qA * 1.2);
		const priceB = priceA;
		const prodValB = qB * priceB;
		const ciB = Math.round(prodValB * 0.45);
		const vaB = prodValB - ciB;
		const workersB = workersA + 5;
		const prodWorkerB = roundTo(vaB / workersB, 2);

		const rows: Array<Array<{ label?: string; answer?: string; mark?: string; bold?: boolean }>> = [
			[
				{ label: 'قيمة الإنتاج $P$ (دج)', bold: true },
				{ label: `${formatDzd(prodValA)}` },
				{ label: `${formatDzd(prodValB)}` }
			],
			[
				{ label: 'الاستهلاك الوسيطي $"CI"$ (دج)', bold: true },
				{ label: `${formatDzd(ciA)}` },
				{ label: `${formatDzd(ciB)}` }
			],
			[
				{ label: 'عدد العمال $L$ (عامل)', bold: true },
				{ label: `${workersA}` },
				{ label: `${workersB}` }
			],
			[
				{ label: 'القيمة المضافة $"VA"$ (دج)', bold: true },
				{ answer: `${formatDzd(vaA)} دج`, mark: '0.5' },
				{ answer: `${formatDzd(vaB)} دج`, mark: '0.5' }
			],
			[
				{ label: 'إنتاجية العامل بالقيمة المضافة (دج/عامل)', bold: true },
				{ answer: `${formatDzd(prodWorkerA)} دج`, mark: '0.5' },
				{ answer: `${formatDzd(prodWorkerB)} دج`, mark: '0.5' }
			]
		];

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `تنتج مؤسستان صناعيتان متنافستان (أ) و(ب) سلعاً بلاستيكية، حيث يعمل كل عامل في المؤسسة (أ) $${hoursPerWorker}$ ساعة شهرياً، وتبلغ قيمة رأس المال الثابت المستثمر في المؤسسة (أ) مبلغ $${formatDzd(capitalA)}$ دج.\n1) أكمل جدول المعطيات والمؤشرات التالي مع كتابة القوانين في مسودتك:`
			},
			buildManagementTableBlock(['البيان الاقتصادي', 'المؤسسة (أ)', 'المؤسسة (ب)'], rows),
			{
				type: 'text',
				content:
					'2) احسب بالنسبة للمؤسسة (أ): أ) إنتاجية ساعة العمل الواحدة بالقيمة المضافة. ب) الإنتاجية العينية للعامل (وحدة/عامل) علماً أن الكمية المنتجة $Q_A = ' +
					`${qA}$ وحدة. ج) إنتاجية رأس المال $P_K$.`,
				answer: `2) بالنسبة للمؤسسة (أ):\n- مجموع ساعات العمل: $L_h = ${workersA} times ${hoursPerWorker} = ${totalHoursA}$ ساعة.\n- إنتاجية الساعة: $frac(${vaA}, ${totalHoursA}) = ${prodHourA}$ دج/ساعة.\n- الإنتاجية العينية للعامل: $frac(${qA}, ${workersA}) = ${qPerWorkerA}$ وحدة/عامل.\n- إنتاجية رأس المال: $P_K = frac("VA", K) = frac(${vaA}, ${capitalA}) = ${prodCapA}$.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content:
					'3) أي المؤسستين أكثر كفاءة في استغلال عامل العمل وفق مؤشر القيمة المضافة للعامل؟ واقترح عاملين لرفع الإنتاجية.',
				answer: `3) المؤسسة الأكثر كفاءة هي ${prodWorkerA >= prodWorkerB ? 'المؤسسة (أ)' : 'المؤسسة (ب)'} لأن إنتاجية العامل فيها (${formatDzd(Math.max(prodWorkerA, prodWorkerB))} دج) أكبر. من عوامل رفع الإنتاجية: التكوين المهني المستمر للعمال، وتحديث التجهيزات والتنظيم الجيد للعمل.`,
				mark: '0.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_eco',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `بلغت قيمة الإنتاج الإجمالي لمؤسسة $${prodValA}\\text{ دج}$، وبلغت قيمة المواد الأولية والطاقة والخدمات المستهلكة (الاستهلاك الوسيطي) $${ciA}\\text{ دج}$. احسب القيمة المضافة $VA$ (بالدينار الجزائري، أدخل الرقم فقط):`,
				questionTextAr: 'احسب القيمة المضافة $VA$ (دج):',
				questionData: {
					answer: vaA,
					displayTemplate: 'VA = ? DZD',
					variables: [],
					tolerance: 0
				},
				explanation: `القيمة المضافة تساوي قيمة الإنتاج مطروحاً منها الاستهلاك الوسيطي:\n$$VA = ${prodValA} - ${ciA} = ${vaA}\\text{ دج}$$`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'ادرس جدول بيانات المؤسستين وأجب عن الأسئلة المحاسبية والاقتصادية الآتية:',
				content
			},
			hints: [
				'القيمة المضافة تساوي دائماً: قيمة الإنتاج الإجمالي ناقص الاستهلاك الوسيطي ($VA = P - CI$).',
				'انتبه للوحدة المطلوبة في إنتاجية العمل: هل المطلوب بالقيمة المضافة لكل عامل أم لكل ساعة عمل؟',
				'إنتاجية رأس المال تقيس العائد المضاف لكل دينار من التجهيزات الثابتة: $P_K = \\frac{VA}{K}$.'
			],
			solutionStepsAr: [
				`حساب القيمة المضافة: $VA_A = ${prodValA} - ${ciA} = ${vaA}\\text{ دج}$، و $VA_B = ${prodValB} - ${ciB} = ${vaB}\\text{ دج}$.`,
				`حساب إنتاجية العامل: في (أ) $= ${prodWorkerA}\\text{ دج/عامل}$، وفي (ب) $= ${prodWorkerB}\\text{ دج/عامل}$.`,
				`حساب إنتاجية الساعة ($${prodHourA}\\text{ دج/ساعة}$) وإنتاجية رأس المال ($${prodCapA}$).`
			],
			finalAnswer: `${vaA}`
		};
	}
};

// [4] الدخل المتاح، الاستهلاك والادخار الحلال (4 ن)
const tpl2asEcoT1IncomeConsumptionSaving: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_2as_eco_t1_income_consumption_saving',
	grade: '2as_eco',
	trimesterId: 't1',
	domain: 'eco_macro',
	titleAr: 'الدخل المتاح والميل للاستهلاك والادخار الحلال',
	curriculumLessonId: 'mgt_lesson_2as_eco_t1_income_consumption_saving',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const yd1 = difficulty === 'easy' ? 100000 : rng.pick([80000, 100000, 120000]);
		const apc1 = rng.pick([0.75, 0.8]);
		const c1 = Math.round(yd1 * apc1);
		const s1 = yd1 - c1;
		const aps1 = roundTo(1 - apc1, 2);

		const deltaYd = rng.pick([20000, 40000]);
		const yd2 = yd1 + deltaYd;
		const mpc = rng.pick([0.6, 0.7]);
		const mps = roundTo(1 - mpc, 2);
		const deltaC = Math.round(deltaYd * mpc);
		const deltaS = deltaYd - deltaC;
		const c2 = c1 + deltaC;
		const s2 = s1 + deltaS;
		const apc2 = roundTo(c2 / yd2, 4);
		const aps2 = roundTo(s2 / yd2, 4);

		const rows: Array<Array<{ label?: string; answer?: string; mark?: string; bold?: boolean }>> = [
			[
				{ label: 'السنة 1', bold: true },
				{ label: `${formatDzd(yd1)}` },
				{ label: `${formatDzd(c1)}` },
				{ answer: `${formatDzd(s1)}`, mark: '0.5' },
				{ answer: `${apc1}`, mark: '0.25' },
				{ answer: `${aps1}`, mark: '0.25' }
			],
			[
				{ label: 'السنة 2', bold: true },
				{ label: `${formatDzd(yd2)}` },
				{ label: `${formatDzd(c2)}` },
				{ answer: `${formatDzd(s2)}`, mark: '0.5' },
				{ answer: `${roundTo(apc2, 2)}`, mark: '0.25' },
				{ answer: `${roundTo(aps2, 2)}`, mark: '0.25' }
			]
		];

		const content: ContentBlock[] = [
			{
				type: 'text',
				content:
					'1) يعطي الجدول الآتي تطور الدخل المتاح $Y_d$ والاستهلاك النهائي $C$ لأسرة جزائرية خلال سنتين (الوحدة: دج). أكمل حساب الادخار الحلال $S$ والميل المتوسط للاستهلاك $"APC"$ والميل المتوسط للادخار $"APS"$:'
			},
			buildManagementTableBlock(
				['الفترة', 'الدخل المتاح $Y_d$', 'الاستهلاك $C$', 'الادخار $S$', '$"APC"$', '$"APS"$'],
				rows
			),
			{
				type: 'text',
				content:
					'2) احسب الميل الحدي للاستهلاك $"MPC"$ والميل الحدي للادخار $"MPS"$ عند انتقال الدخل من السنة 1 إلى السنة 2، وتحقق من علاقتهما.',
				answer: `2) $Delta Y_d = ${yd2} - ${yd1} = ${deltaYd}$ دج، و $Delta C = ${c2} - ${c1} = ${deltaC}$ دج، و $Delta S = ${s2} - ${s1} = ${deltaS}$ دج.\n- $"MPC" = frac(${deltaC}, ${deltaYd}) = ${mpc}$.\n- $"MPS" = frac(${deltaS}, ${deltaYd}) = ${mps}$.\n- التحقق: $"MPC" + "MPS" = ${mpc} + ${mps} = 1$.`,
				mark: '1'
			},
			{
				type: 'text',
				content:
					'3) علّل تراجع نسبة الإنفاق الغذائي من دخل الأسرة في السنة 2 حسب قانون إنجل، ثم بيّن الفرق بين الادخار الحلال المستثمر وبين الاكتناز والربا.',
				answer:
					'3) حسب قانون إنجل، كلما ارتفع دخل الأسرة تراجعت النسبة المئوية للإنفاق الغذائي لبلوغ حدود الإشباع البيولوجي، وتزداد حصة الادخار والتعليم والخدمات. والادخار الحلال يُستثمر في مشاريع إنتاجية أو حسابات مضاربة ومشاركة شرعية لتنمية الثروة بعيداً عن الاكتناز الذي يعطل السيولة وعن الربا المحرم شرعاً.',
				mark: '1'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_eco',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `ارتفع الدخل المتاح لأسرة من $${yd1}\\text{ دج}$ إلى $${yd2}\\text{ دج}$، فزاد استهلاكها من $${c1}\\text{ دج}$ إلى $${c2}\\text{ دج}$. احسب الميل الحدي للاستهلاك $MPC$ (عدد عشري بين 0 و 1):`,
				questionTextAr: 'احسب الميل الحدي للاستهلاك $MPC$:',
				questionData: {
					answer: mpc,
					displayTemplate: 'MPC = ?',
					variables: [],
					tolerance: 0.01
				},
				explanation: `$$MPC = \\frac{\\Delta C}{\\Delta Y_d} = \\frac{${c2} - ${c1}}{${yd2} - ${yd1}} = \\frac{${deltaC}}{${deltaYd}} = ${mpc}$$`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'استثمر معطيات الجدول التالي وأجب عن الأسئلة المطلوبة:',
				content
			},
			hints: [
				'الادخار يساوي الدخل المتاح مطروحاً منه الاستهلاك ($S = Y_d - C$).',
				'الميل الحدي يقيس التغير الإضافي: $MPC = \\frac{\\Delta C}{\\Delta Y_d}$ و $MPS = \\frac{\\Delta S}{\\Delta Y_d}$.',
				'تذكّر دائماً: $APC + APS = 1$ و $MPC + MPS = 1$.'
			],
			solutionStepsAr: [
				`إكمال $S_1 = ${s1}$ و $S_2 = ${s2}$ وحساب $APC$ و $APS$.`,
				`حساب $MPC = \\frac{${deltaC}}{${deltaYd}} = ${mpc}$ و $MPS = ${mps}$.`,
				'تطبيق قانون إنجل وبيان ضوابط الادخار الاستثماري الحلال.'
			],
			finalAnswer: `${mpc}`
		};
	}
};

// [5] وضعية إدماجية: الدورة الاقتصادية والإنتاجية وتخصيص الدخل (8 ن)
const tpl2asEcoT1IntegrationCircuitProd: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_2as_eco_t1_integration_circuit_prod',
	grade: '2as_eco',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: الأعوان، القيمة المضافة والإنتاجية والادخار الحلال',
	curriculumLessonId: 'mgt_lesson_2as_eco_t1_income_consumption_saving',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const units = difficulty === 'easy' ? 1000 : rng.pick([1200, 1500]);
		const unitPrice = rng.pick([4000, 5000]);
		const pVal = units * unitPrice;
		const ciVal = Math.round(pVal * 0.45);
		const vaVal = pVal - ciVal;
		const workers = rng.pick([20, 25]);
		const vaPerWorker = roundTo(vaVal / workers, 2);

		const grossWage = rng.pick([70000, 80000]);
		const socialAndTax = Math.round(grossWage * 0.15);
		const familyAllowance = 4000;
		const yd = grossWage - socialAndTax + familyAllowance;
		const cons = Math.round(yd * 0.75);
		const sav = yd - cons;
		const aps = roundTo(sav / yd, 2);

		const content: ContentBlock[] = [
			buildManagementDocumentBlock({
				title: 'وضعية إدماجية شاملة: مؤسسة «الأطلس للصناعات الغذائية» وأسر العمال',
				text: `تنتج مؤسسة «الأطلس» ${formatDzd(units)} وحدة من المنتجات الغذائية بسعر بيع ${formatDzd(unitPrice)} دج للوحدة، وتستهلك مواد أولية زراعية وطاقة من مزارعين وموردين بقيمة ${formatDzd(ciVal)} دج، وتشغّل ${workers} عاملاً. يتقاضى أحد مهندسيها أجراً إجمالياً قدره ${formatDzd(grossWage)} دج شهرياً، يُقتطع منه للضرائب والضمان الاجتماعي مبلغ ${formatDzd(socialAndTax)} دج، ويستفيد من منحة عائلية قدرها ${formatDzd(familyAllowance)} دج، كما ينفق ${formatDzd(cons)} دج للاستهلاك النهائي ويودع الباقي في صندوق استثماري إسلامي للمضاربة الحلال.`,
				source: 'وضعية تقويمية للفصل الأول — 2 ثانوي تسيير واقتصاد'
			}),
			{
				type: 'text',
				content:
					'1) حدّد الأعوان الاقتصاديين الأربعة المتدخلين في هذه الوضعية، وميّز بين تدفق حقيقي وتدفق نقدي بين المؤسسة والمهندس.',
				answer:
					'1) الأعوان الأربعة هم: المؤسسات الاقتصادية (مؤسسة الأطلس والموردون)، العائلات (أسرة المهندس)، الإدارات العمومية (جباية الضرائب وصرف المنحة العائلية)، والمؤسسات المالية (صندوق الاستثمار الإسلامي). التدفق الحقيقي هو الجهد الهندسي المقدم للمؤسسة، والتدفق النقدي هو الأجر الشهري المدفوع للمهندس.',
				mark: '2'
			},
			{
				type: 'text',
				content:
					'2) احسب قيمة الإنتاج الإجمالي $P$ للمؤسسة، وقيمتها المضافة $"VA"$، وإنتاجية العامل الواحد بالقيمة المضافة.',
				answer: `2) $P = ${units} times ${unitPrice} = ${formatDzd(pVal)}$ دج.\n- $"VA" = P - "CI" = ${formatDzd(pVal)} - ${formatDzd(ciVal)} = ${formatDzd(vaVal)}$ دج.\n- إنتاجية العامل بالقيمة المضافة $= frac(${vaVal}, ${workers}) = ${formatDzd(vaPerWorker)}$ دج/عامل.`,
				mark: '2.5'
			},
			{
				type: 'text',
				content:
					'3) احسب الدخل المتاح الشهري $Y_d$ للمهندس، ومبلغ الادخار الحلال $S$، والميل المتوسط للادخار $"APS"$.',
				answer: `3) $Y_d = ${formatDzd(grossWage)} - ${formatDzd(socialAndTax)} + ${formatDzd(familyAllowance)} = ${formatDzd(yd)}$ دج.\n- الادخار الحلال: $S = Y_d - C = ${formatDzd(yd)} - ${formatDzd(cons)} = ${formatDzd(sav)}$ دج.\n- $"APS" = frac(${sav}, ${yd}) = ${aps}$ ($${roundTo(aps * 100, 1)}$%).`,
				mark: '2.5'
			},
			{
				type: 'text',
				content:
					'4) لماذا يُعد توظيف الادخار في صندوق المضاربة الإسلامية أفضل للدورة الاقتصادية والشرع من الإيداع الربوي أو الاكتناز؟',
				answer:
					'4) لأن المضاربة الإسلامية حلال شرعاً (تقوم على تقاسم الأرباح في مشاريع إنتاجية حقيقية بدلاً من الفائدة الربوية المحرمة)، كما تحرّك السيولة نحو الاستثمار والتشغيل بدلاً من حبسها في الاكتناز.',
				mark: '1'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_eco',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'true_false',
				questionText: `في الوضعية المقترحة: إذا بلغ الأجر الإجمالي $${grossWage}\\text{ دج}$ والاقتطاعات الضريبية والاجتماعية $${socialAndTax}\\text{ دج}$ والمنحة العائلية $${familyAllowance}\\text{ دج}$، فإن الدخل المتاح يساوي $${yd}\\text{ دج}$.`,
				questionTextAr: 'حدّد صحة أو خطأ الحساب الآتي للدخل المتاح:',
				questionData: {
					correctAnswer: true
				},
				explanation: `العبارة صحيحة؛ لأن الدخل المتاح يساوي الدخل الأولي مطروحاً منه الاقتطاعات مضافاً إليه التحويلات الاجتماعية: $${grossWage} - ${socialAndTax} + ${familyAllowance} = ${yd}\\text{ دج}$.`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية (08 نقاط)',
				points: this.defaultPoints,
				instruction: 'اقرأ الوضعية الاقتصادية الشاملة الآتية وأجب عن الأسئلة الأربعة بوضوح:',
				content
			},
			hints: [
				'لا تنسَ إدراج التحويلات الاجتماعية (المنحة العائلية) عند حساب الدخل المتاح $Y_d$.',
				'احسب القيمة المضافة أولاً ثم اقسمها على عدد العمال لإيجاد إنتاجية العامل.',
				'تذكّر أن المضاربة والمشاركة هما البديل الحلال عن الربا والاكتناز.'
			],
			solutionStepsAr: [
				'تصنيف الأعوان الأربعة والتدفقات الحقيقية والنقدية.',
				`حساب $P = ${formatDzd(pVal)}$، $VA = ${formatDzd(vaVal)}$، وإنتاجية العامل $= ${formatDzd(vaPerWorker)}\\text{ دج}$.`,
				`حساب الدخل المتاح $Y_d = ${formatDzd(yd)}\\text{ دج}$ والادخار $S = ${formatDzd(sav)}\\text{ دج}$ و $APS = ${aps}$.`
			],
			finalAnswer: 'صحيح'
		};
	}
};

export const TEMPLATES_2AS_ECO_T1: ManagementParameterizedTemplate[] = [
	tpl2asEcoT1EconomicProblemNeeds,
	tpl2asEcoT1EconomicCircuitAgents,
	tpl2asEcoT1ValueAddedProductivity,
	tpl2asEcoT1IncomeConsumptionSaving,
	tpl2asEcoT1IntegrationCircuitProd
];
