import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';
import {
	buildManagementDocumentBlock,
	buildManagementTableBlock,
	formatDzd
} from '../../management-helpers';
import type {
	Difficulty,
	ManagementGeneratedExerciseInstance,
	ManagementParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';

// ═══════════════════════════════════════════════════════════════════════════════
// 3AS GE BAC Accounting & Finance (التسيير المحاسبي والمالي) — T2 Templates (5)
// 100% HALAL & RIBA-FREE: No usurious interest in bank reconciliation or SIG!
// ═══════════════════════════════════════════════════════════════════════════════

const COMPANIES_3AS_T2 = [
	'مؤسسة تيبازة الصناعية',
	'مؤسسة الأوراس للتجارة',
	'مؤسسة الصومام للإنتاج',
	'مؤسسة الباهية للتوزيع',
	'مؤسسة الهضاب للمعدات'
];

export const TEMPLATES_3AS_ACC_T2: ManagementParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. مؤونات الأعباء وتقارب البنك وتسوية الأعباء والمنتوجات (6 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_3as_acc_t2_provisions_reconciliation_accruals',
		grade: '3as_acc',
		trimesterId: 't2',
		domain: 'acc_year_end',
		titleAr: 'مؤونات الأعباء (151)، حالة التقارب البنكي، واستقلالية الدورات (486/487)',
		curriculumLessonId: 'mgt_lesson_3as_acc_t2_provisions_bank_reconciliation',
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_3AS_T2);

			// 1. Provision 151
			const provOld = rng.int(6, 12) * 10_000;
			const provIsUp = difficulty !== 'hard';
			const provNew = provIsUp ? provOld + rng.int(2, 4) * 10_000 : provOld - rng.int(2, 4) * 10_000;
			const provDelta = provNew - provOld;

			// 2. Bank Reconciliation (512 vs Bank Statement)
			const book512Before = rng.int(35, 65) * 10_000;
			const custTransfer = rng.int(3, 8) * 10_000;
			const bankServiceFee = rng.pick([2_000, 3_000, 4_000]); // عمولة خدمات مسك الحساب فقط (حلال)
			const reconciledBal = book512Before + custTransfer - bankServiceFee;
			const suppChequeUnpresented = rng.int(4, 9) * 10_000;
			const bankStmtBefore = reconciledBal + suppChequeUnpresented;

			// 3. Accrual 486 (insurance paid 01/10/2024 for 12 months => 9 months for 2025)
			const insAnnual = rng.int(8, 16) * 12_000; // divisible by 12
			const insPrepaid = (insAnnual * 9) / 12;

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `التسويات الجردية المتممة بتاريخ 31/12/2024 — ${company}`,
					text: `1) مؤونات الأخطار (حـ/ 151): بلغ رصيد مؤونة نزاع قضائي في 31/12/2023 مبلغ ${formatDzd(provOld)} دج، وقدّر المحامي في نهاية 2024 أن التعويض المحتمل يبلغ ${formatDzd(provNew)} دج.\n2) التقارب البنكي: أظهر حـ/ 512 لدى المؤسسة رصيداً مديناً بمبلغ ${formatDzd(book512Before)} دج، بينما أظهر كشف البنك رصيداً دائناً بمبلغ ${formatDzd(bankStmtBefore)} دج. عند المراجعة اتضح: تحصيل تحويل مباشر من زبون بـ ${formatDzd(custTransfer)} دج، اقتطاع عمولة خدمة مسك الحساب المصرفي بـ ${formatDzd(bankServiceFee)} دج (معفاة)، وشيك للمورد بـ ${formatDzd(suppChequeUnpresented)} دج لم يقدمه المورد للبنك بعد.\n3) استقلالية الدورات: سُجل في حـ/ 616 قسط تأمين سنوي بمبلغ ${formatDzd(insAnnual)} دج دُفع في 01/10/2024 يغطي 12 شهراً.`
				}),
				{
					type: 'text',
					content: '1) أكمل جدول التقارب البنكي لحساب الرصيد المتقارب الصحيح في 31/12/2024:'
				},
				buildManagementTableBlock(
					['البيان — حساب حـ/ 512 لدى المؤسسة', 'المبلغ (دج)', 'البيان — كشف البنك', 'المبلغ (دج)'],
					[
						[
							{ label: 'الرصيد قبل التسوية (مدين)' },
							{ label: formatDzd(book512Before) },
							{ label: 'الرصيد قبل التسوية (دائن)' },
							{ label: formatDzd(bankStmtBefore) }
						],
						[
							{ label: '+ تحويل مباشر من الزبون' },
							{ label: formatDzd(custTransfer) },
							{ label: '− شيك للمورد لم يُصرف بعد' },
							{ label: `(${formatDzd(suppChequeUnpresented)})` }
						],
						[
							{ label: '− عمولة خدمة مسك الحساب (627)' },
							{ label: `(${formatDzd(bankServiceFee)})` },
							{ label: '' },
							{ label: '' }
						],
						[
							{ label: 'الرصيد المتقارب (مدين)', bold: true },
							{ label: '........', answer: formatDzd(reconciledBal), mark: '1' },
							{ label: 'الرصيد المتقارب (دائن)', bold: true },
							{ label: '........', answer: formatDzd(reconciledBal), mark: '0.5' }
						]
					]
				),
				{
					type: 'text',
					content: '2) سجل في دفتر اليومية بتاريخ 31/12/2024 قيود التسوية لجميع الحالات (المؤونة، عمليات حـ/ 512 من التقارب، وقسط التأمين المعاين مسبقاً):'
				},
				buildManagementTableBlock(
					['البيان', 'الحساب المدين والمبلغ', 'الحساب الدائن والمبلغ'],
					[
						[
							{ label: provIsUp ? 'رفع مؤونة الأخطار (151)' : 'إنقاص مؤونة الأخطار (151)' },
							{ label: '........', answer: provIsUp ? `حـ/ 683 (${formatDzd(provDelta)})` : `حـ/ 151 (${formatDzd(Math.abs(provDelta))})`, mark: '0.75' },
							{ label: '........', answer: provIsUp ? `حـ/ 151 (${formatDzd(provDelta)})` : `حـ/ 783 (${formatDzd(Math.abs(provDelta))})`, mark: '0.75' }
						],
						[
							{ label: 'تحويل الزبون في التقارب' },
							{ label: '........', answer: `حـ/ 512 (${formatDzd(custTransfer)})`, mark: '0.5' },
							{ label: '........', answer: `حـ/ 411 (${formatDzd(custTransfer)})`, mark: '0.5' }
						],
						[
							{ label: 'عمولة مسك الحساب المصرفي' },
							{ label: '........', answer: `حـ/ 627 (${formatDzd(bankServiceFee)})`, mark: '0.5' },
							{ label: '........', answer: `حـ/ 512 (${formatDzd(bankServiceFee)})`, mark: '0.5' }
						],
						[
							{ label: 'أعباء التأمين المعاينة مسبقاً (9 أشهر)' },
							{ label: '........', answer: `حـ/ 486 (${formatDzd(insPrepaid)})`, mark: '0.5' },
							{ label: '........', answer: `حـ/ 616 (${formatDzd(insPrepaid)})`, mark: '0.5' }
						]
					]
				)
			];

			const sujetExercise: ExerciseBlock = {
				points: 6,
				instruction: 'أنجز حالة التقارب البنكي وسجل قيود التسوية في 31 ديسمبر:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(insPrepaid);
				quizQuestion = {
					type: 'calculated',
					questionText: `دفعت ${company} بتاريخ $01/10/2024$ قسط تأمين سنوي بمبلغ $${formatDzd(insAnnual)}$ دج يغطي $12$ شهراً. احسب مبلغ الأعباء المعاينة مسبقاً (حـ/ 486) الواجب استبعاده من سنة $2024$.`,
					questionTextAr: 'احسب مبلغ حـ/ 486 (بالدج):',
					questionData: { answer: insPrepaid, displayTemplate: 'حـ/ 486 = ? دج', variables: [], tolerance: 0.01 },
					explanation: `تخص سنة $2025$ تسعة أشهر ($9/12$): $${formatDzd(insAnnual)} \\times \\frac{9}{12} = ${formatDzd(insPrepaid)}$ دج.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(reconciledBal);
				quizQuestion = {
					type: 'calculated',
					questionText: `كان رصيد حـ/ 512 قبل التسوية $${formatDzd(book512Before)}$ دج مديناً، وورد في كشف البنك تحويل من زبون بمبلغ $${formatDzd(custTransfer)}$ دج وعمولة خدمة مسك الحساب بمبلغ $${formatDzd(bankServiceFee)}$ دج. احسب الرصيد البنكي المتقارب الصحيح.`,
					questionTextAr: 'احسب الرصيد البنكي المتقارب:',
					questionData: { answer: reconciledBal, displayTemplate: 'الرصيد = ? دج', variables: [], tolerance: 0.01 },
					explanation: `الرصيد المتقارب $= ${formatDzd(book512Before)} + ${formatDzd(custTransfer)} - ${formatDzd(bankServiceFee)} = ${formatDzd(reconciledBal)}$ دج.`
				};
			} else {
				finalAnswer = String(Math.abs(provDelta));
				quizQuestion = {
					type: 'calculated',
					questionText: `رصيد مؤونة أخطار (حـ/ 151) في $2023$ يساوي $${formatDzd(provOld)}$ دج، وفي $31/12/2024$ قدّر المحامي الخطر بمبلغ $${formatDzd(provNew)}$ دج. احسب مبلغ الاسترجاع المسجل في دائن حـ/ 783.`,
					questionTextAr: 'احسب مبلغ الاسترجاع لحـ/ 783:',
					questionData: { answer: Math.abs(provDelta), displayTemplate: 'حـ/ 783 = ? دج', variables: [], tolerance: 0.01 },
					explanation: `الاسترجاع $= ${formatDzd(provOld)} - ${formatDzd(provNew)} = ${formatDzd(Math.abs(provDelta))}$ دج.`
				};
			}

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'في التقارب البنكي: الشيك المسلم للمورد ولم يصرف بعد يُطرح في جانب كشف البنك ولا يُسجل له قيد في اليومية.',
					'الأعباء المعاينة مسبقاً تخص أشهر السنة المقبلة (حـ/ 486 مديناً / حـ/ 6xx دائناً).',
					'رفع المؤونة يسجل في حـ/ 683، وإنقاصها أو إلغاؤها يسجل في حـ/ 783.'
				],
				solutionStepsAr: [
					`تعديل المؤونة $= ${formatDzd(Math.abs(provDelta))}$ دج (${provIsUp ? '683 إلى 151' : '151 إلى 783'}).`,
					`الرصيد البنكي المتقارب $= ${formatDzd(reconciledBal)}$ دج؛ وتسجل في اليومية عمليتا التحويل والعمولة.`,
					`التأمين المعاين مسبقاً ($9$ أشهر) $= ${formatDzd(insPrepaid)}$ دج (486 إلى 616).`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. حساب النتائج حسب الطبيعة (SIG) وقدرة التمويل الذاتي CAF (8 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_3as_acc_t2_income_statement_nature_caf',
		grade: '3as_acc',
		trimesterId: 't2',
		domain: 'acc_financial_statements',
		titleAr: 'حساب النتائج حسب الطبيعة (SIG) وقدرة التمويل الذاتي (CAF)',
		curriculumLessonId: 'mgt_lesson_3as_acc_t2_income_statement_nature_function',
		defaultPoints: 8,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_3AS_T2);

			const c70 = rng.int(30, 50) * 100_000;
			const c72 = rng.int(2, 5) * 100_000;
			const prodEx = c70 + c72;

			const c60 = rng.int(14, 22) * 100_000;
			const c61_62 = rng.int(3, 5) * 100_000;
			const consEx = c60 + c61_62;

			const va = prodEx - consEx;
			const c63 = rng.int(5, 8) * 100_000;
			const c64 = rng.int(1, 2) * 100_000;
			const ebe = va - c63 - c64;

			const c75 = rng.int(4, 8) * 10_000; // منها 752 = 20,000 فائض تنازل عن تثبيت
			const c752 = 20_000;
			const c65 = rng.int(2, 5) * 10_000; // منها 652 = 10,000 ناقص تنازل
			const c652 = 10_000;
			const c68 = rng.int(2, 4) * 100_000;
			const c78 = rng.int(3, 7) * 10_000;
			const opRes = ebe + c75 - c65 - c68 + c78;

			const c76 = 30_000; // عوائد مساهمات حلال وحسم تعجيل مكتسب 768
			const c66 = 10_000; // حسم تعجيل ممنوح 668
			const finRes = c76 - c66;

			const ordBeforeTax = opRes + finRes;
			const ibs = roundTo(ordBeforeTax * 0.19, 2); // صناعية 19%
			const netRes = roundTo(ordBeforeTax - ibs, 2);

			// CAF = netRes + c68 - c78 + c652 - c752
			const caf = roundTo(netRes + c68 - c78 + c652 - c752, 2);

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `معطيات حساب النتائج حسب الطبيعة (مؤسسة صناعية، IBS 19%) — ${company}`,
					text: `قدّمت ${company} أرصدة حسابات التسيير في 31/12/2024 كالآتي (بالدج):\n• حـ/ 70 المبيعات: ${formatDzd(c70)} | حـ/ 72 الإنتاج المخزن (دائن): ${formatDzd(c72)}\n• حـ/ 60 المشتريات المستهلكة: ${formatDzd(c60)} | حـ/ 61 و62 الخدمات الخارجية الأخرى: ${formatDzd(c61_62)}\n• حـ/ 63 أعباء المستخدمين: ${formatDzd(c63)} | حـ/ 64 الضرائب والرسوم: ${formatDzd(c64)}\n• حـ/ 75 منتوجات عملياتية أخرى: ${formatDzd(c75)} (منها حـ/ 752 = ${formatDzd(c752)}) | حـ/ 65 أعباء عملياتية أخرى: ${formatDzd(c65)} (منها حـ/ 652 = ${formatDzd(c652)})\n• حـ/ 68 مخصصات الاهتلاك: ${formatDzd(c68)} | حـ/ 78 استرجاعات الاستغلال: ${formatDzd(c78)}\n• حـ/ 76 (عوائد مساهمات وحسم مكتسب): ${formatDzd(c76)} | حـ/ 66 (حسم ممنوح): ${formatDzd(c66)} (معاملات مالية حلال ولا توجد عناصر غير عادية).`
				}),
				{
					type: 'text',
					content: '1) أكمل جدول حساب النتائج حسب الطبيعة (SIG):'
				},
				buildManagementTableBlock(
					['البيان', 'المبلغ (دج)'],
					[
						[{ label: '1. إنتاج السنة المالية (70 + 72)' }, { label: '........', answer: formatDzd(prodEx), mark: '0.5' }],
						[{ label: '2. استهلاك السنة المالية (60 + 61 + 62)' }, { label: '........', answer: formatDzd(consEx), mark: '0.5' }],
						[{ label: '3. القيمة المضافة للاستغلال (VA)', bold: true }, { label: '........', answer: formatDzd(va), mark: '1' }],
						[{ label: '4. إجمالي فائض الاستغلال (EBE)', bold: true }, { label: '........', answer: formatDzd(ebe), mark: '1' }],
						[{ label: '5. النتيجة العملياتية', bold: true }, { label: '........', answer: formatDzd(opRes), mark: '1' }],
						[{ label: '6. النتيجة المالية' }, { label: formatDzd(finRes) }],
						[{ label: '7. النتيجة العادية قبل الضرائب' }, { label: '........', answer: formatDzd(ordBeforeTax), mark: '0.5' }],
						[{ label: '8. الضرائب على النتائج (19%)' }, { label: '........', answer: formatDzd(ibs), mark: '0.75' }],
						[{ label: '9. النتيجة الصافية للسنة المالية', bold: true }, { label: '........', answer: formatDzd(netRes), mark: '0.75' }]
					]
				),
				{
					type: 'text',
					content: '2) احسب قدرة التمويل الذاتي (CAF) انطلاقاً من النتيجة الصافية ثم تحقق منها انطلاقاً من إجمالي فائض الاستغلال (EBE):',
					answer: `بطريقة النتيجة الصافية: $"CAF" = ${formatDzd(netRes)} + ${formatDzd(c68)} - ${formatDzd(c78)} + ${formatDzd(c652)} - ${formatDzd(c752)} = ${formatDzd(caf)}$ دج.\nبطريقة $"EBE"$: $"CAF" = ${formatDzd(ebe)} + (${formatDzd(c75)} - ${formatDzd(c752)}) - (${formatDzd(c65)} - ${formatDzd(c652)}) + ${formatDzd(c76)} - ${formatDzd(c66)} - ${formatDzd(ibs)} = ${formatDzd(caf)}$ دج.`,
					mark: '2'
				}
			];

			const sujetExercise: ExerciseBlock = {
				points: 8,
				instruction: 'أعد جدول حساب النتائج حسب الطبيعة واحسب قدرة التمويل الذاتي بطريقتين:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(ebe);
				quizQuestion = {
					type: 'calculated',
					questionText: `بلغت القيمة المضافة لمؤسسة $${formatDzd(va)}$ دج، وأعباء المستخدمين $${formatDzd(c63)}$ دج، والضرائب والرسوم $${formatDzd(c64)}$ دج. احسب إجمالي فائض الاستغلال ($EBE$).`,
					questionTextAr: 'احسب إجمالي فائض الاستغلال (EBE):',
					questionData: { answer: ebe, displayTemplate: 'EBE = ? دج', variables: [], tolerance: 0.01 },
					explanation: `$EBE = ${formatDzd(va)} - ${formatDzd(c63)} - ${formatDzd(c64)} = ${formatDzd(ebe)}$ دج.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(opRes);
				quizQuestion = {
					type: 'calculated',
					questionText: `انطلاقاً من $EBE = ${formatDzd(ebe)}$ دج، وبمعلومية: حـ/ $75 = ${formatDzd(c75)}$، حـ/ $65 = ${formatDzd(c65)}$، حـ/ $68 = ${formatDzd(c68)}$، وحـ/ $78 = ${formatDzd(c78)}$ دج. احسب النتيجة العملياتية.`,
					questionTextAr: 'احسب النتيجة العملياتية (بالدج):',
					questionData: { answer: opRes, displayTemplate: 'النتيجة العملياتية = ? دج', variables: [], tolerance: 0.01 },
					explanation: `النتيجة العملياتية $= ${formatDzd(ebe)} + ${formatDzd(c75)} - ${formatDzd(c65)} - ${formatDzd(c68)} + ${formatDzd(c78)} = ${formatDzd(opRes)}$ دج.`
				};
			} else {
				finalAnswer = String(caf);
				quizQuestion = {
					type: 'calculated',
					questionText: `النتيجة الصافية لمؤسسة هي $${formatDzd(netRes)}$ دج، حـ/ $68 = ${formatDzd(c68)}$، حـ/ $78 = ${formatDzd(c78)}$، حـ/ $652 = ${formatDzd(c652)}$، وحـ/ $752 = ${formatDzd(c752)}$ دج. احسب قدرة التمويل الذاتي ($CAF$).`,
					questionTextAr: 'احسب قدرة التمويل الذاتي (CAF):',
					questionData: { answer: caf, displayTemplate: 'CAF = ? دج', variables: [], tolerance: 0.5 },
					explanation: `$CAF = ${formatDzd(netRes)} + ${formatDzd(c68)} - ${formatDzd(c78)} + ${formatDzd(c652)} - ${formatDzd(c752)} = ${formatDzd(caf)}$ دج.`
				};
			}

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تدرج المستويات: إنتاج السنة، استهلاك السنة، VA، EBE، النتيجة العملياتية، المالية، العادية، IBS، الصافية.',
					'لإيجاد CAF من النتيجة الصافية: نضيف 68 و652 ونطرح 78 و752.',
					'لإيجاد CAF من EBE: نأخذ التدفقات النقدية التشغيلية والمالية المتبقية فقط بعد EBE.'
				],
				solutionStepsAr: [
					`إنتاج السنة $= ${formatDzd(prodEx)}$؛ الاستهلاك $= ${formatDzd(consEx)}$؛ $VA = ${formatDzd(va)}$ دج.`,
					`$EBE = ${formatDzd(ebe)}$؛ النتيجة العملياتية $= ${formatDzd(opRes)}$؛ العادية قبل الضرائب $= ${formatDzd(ordBeforeTax)}$ دج.`,
					`الضريبة ($19\\%$) $= ${formatDzd(ibs)}$؛ النتيجة الصافية $= ${formatDzd(netRes)}$ دج؛ $CAF = ${formatDzd(caf)}$ دج.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. حساب النتائج حسب الوظيفة (6 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_3as_acc_t2_income_statement_function',
		grade: '3as_acc',
		trimesterId: 't2',
		domain: 'acc_financial_statements',
		titleAr: 'جدول توزيع الأعباء وحساب النتائج حسب الوظيفة (كلفة المبيعات والهامش الإجمالي)',
		curriculumLessonId: 'mgt_lesson_3as_acc_t2_income_statement_nature_function',
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_3AS_T2);

			const sales70 = rng.int(25, 45) * 100_000;
			const c600 = rng.int(12, 20) * 100_000;
			const poolExp = rng.int(6, 10) * 100_000; // مجموع الأعباء الموزعة (602..68)
			// Allocation keys: Purchase 20%, Commercial 50%, Admin 30% (commercial enterprise)
			const buyFunc = (poolExp * 20) / 100;
			const commFunc = (poolExp * 50) / 100;
			const adminFunc = (poolExp * 30) / 100;

			const costOfSales = c600 + buyFunc;
			const grossMargin = sales70 - costOfSales;
			const otherOpInc75 = rng.int(3, 7) * 10_000;
			const otherOpExp65 = rng.int(1, 3) * 10_000;
			const opResult = grossMargin + otherOpInc75 - commFunc - adminFunc - otherOpExp65;

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `بيانات حساب النتائج حسب الوظيفة (مؤسسة تجارية) — ${company}`,
					text: `قدّمت ${company} المعطيات الآتية لسنة 2024:\n• حـ/ 700 مبيعات البضائع: ${formatDzd(sales70)} دج.\n• حـ/ 600 مشتريات البضائع المبيعة: ${formatDzd(c600)} دج.\n• مجموع الأعباء الموزعة (حـ/ 602 إلى 68): ${formatDzd(poolExp)} دج، تتوزع على الوظائف بنسبة: 20% لوظيفة الشراء، 50% للوظيفة التجارية، 30% للوظيفة الإدارية.\n• حـ/ 75 منتوجات عملياتية أخرى: ${formatDzd(otherOpInc75)} دج | حـ/ 65 أعباء عملياتية أخرى: ${formatDzd(otherOpExp65)} دج.`
				}),
				{
					type: 'text',
					content: '1) أكمل جدول إعادة ترتيب الأعباء حسب الوظائف:'
				},
				buildManagementTableBlock(
					['البيان', 'المجموع الموزع', 'وظيفة الشراء (20%)', 'الوظيفة التجارية (50%)', 'الوظيفة الإدارية (30%)'],
					[
						[
							{ label: 'الأعباء حسب الوظائف (602 إلى 68)' },
							{ label: formatDzd(poolExp) },
							{ label: '........', answer: formatDzd(buyFunc), mark: '0.75' },
							{ label: '........', answer: formatDzd(commFunc), mark: '0.75' },
							{ label: '........', answer: formatDzd(adminFunc), mark: '0.5' }
						]
					]
				),
				{
					type: 'text',
					content: '2) أكمل مستخرج جدول حساب النتائج حسب الوظيفة:'
				},
				buildManagementTableBlock(
					['البيان', 'المبلغ (دج)'],
					[
						[{ label: 'رقم الأعمال (مبيعات البضائع 700)' }, { label: formatDzd(sales70) }],
						[{ label: 'كلفة المبيعات (حـ/ 600 + أعباء وظيفة الشراء)' }, { label: '........', answer: formatDzd(costOfSales), mark: '1' }],
						[{ label: 'الهامش الإجمالي', bold: true }, { label: '........', answer: formatDzd(grossMargin), mark: '1' }],
						[{ label: 'منتوجات عملياتية أخرى (75)' }, { label: formatDzd(otherOpInc75) }],
						[{ label: 'التكاليف التجارية' }, { label: `(${formatDzd(commFunc)})` }],
						[{ label: 'الأعباء الإدارية' }, { label: `(${formatDzd(adminFunc)})` }],
						[{ label: 'أعباء عملياتية أخرى (65)' }, { label: `(${formatDzd(otherOpExp65)})` }],
						[{ label: 'النتيجة العملياتية', bold: true }, { label: '........', answer: formatDzd(opResult), mark: '2' }]
					]
				)
			];

			const sujetExercise: ExerciseBlock = {
				points: 6,
				instruction: 'وزّع الأعباء وأتمم حساب النتائج حسب الوظيفة:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(costOfSales);
				quizQuestion = {
					type: 'calculated',
					questionText: `بلغ حساب مشتريات البضائع المبيعة (حـ/ 600) $${formatDzd(c600)}$ دج، وأعباء وظيفة الشراء ($20\\%$ من $${formatDzd(poolExp)}$ دج) هي $${formatDzd(buyFunc)}$ دج. احسب كلفة المبيعات في حساب النتائج حسب الوظيفة.`,
					questionTextAr: 'احسب كلفة المبيعات (بالدج):',
					questionData: { answer: costOfSales, displayTemplate: 'كلفة المبيعات = ? دج', variables: [], tolerance: 0.01 },
					explanation: `كلفة المبيعات $= ${formatDzd(c600)} + ${formatDzd(buyFunc)} = ${formatDzd(costOfSales)}$ دج.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(grossMargin);
				quizQuestion = {
					type: 'calculated',
					questionText: `رقم الأعمال يساوي $${formatDzd(sales70)}$ دج، ومشتريات البضائع المبيعة $${formatDzd(c600)}$ دج، وأعباء وظيفة الشراء $${formatDzd(buyFunc)}$ دج. احسب الهامش الإجمالي.`,
					questionTextAr: 'احسب الهامش الإجمالي (بالدج):',
					questionData: { answer: grossMargin, displayTemplate: 'الهامش الإجمالي = ? دج', variables: [], tolerance: 0.01 },
					explanation: `كلفة المبيعات $= ${formatDzd(costOfSales)}$ دج؛ الهامش الإجمالي $= ${formatDzd(sales70)} - ${formatDzd(costOfSales)} = ${formatDzd(grossMargin)}$ دج.`
				};
			} else {
				finalAnswer = String(opResult);
				quizQuestion = {
					type: 'calculated',
					questionText: `الهامش الإجمالي لمؤسسة تجارية $${formatDzd(grossMargin)}$ دج، حـ/ $75 = ${formatDzd(otherOpInc75)}$، التكاليف التجارية $${formatDzd(commFunc)}$، الأعباء الإدارية $${formatDzd(adminFunc)}$، وحـ/ $65 = ${formatDzd(otherOpExp65)}$ دج. احسب النتيجة العملياتية.`,
					questionTextAr: 'احسب النتيجة العملياتية:',
					questionData: { answer: opResult, displayTemplate: 'النتيجة العملياتية = ? دج', variables: [], tolerance: 0.01 },
					explanation: `النتيجة العملياتية $= ${formatDzd(grossMargin)} + ${formatDzd(otherOpInc75)} - ${formatDzd(commFunc)} - ${formatDzd(adminFunc)} - ${formatDzd(otherOpExp65)} = ${formatDzd(opResult)}$ دج.`
				};
			}

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'في المؤسسة التجارية: كلفة المبيعات = حـ/ 600 + أعباء وظيفة الشراء.',
					'الهامش الإجمالي = رقم الأعمال (700) − كلفة المبيعات.',
					'النتيجة العملياتية = الهامش الإجمالي + 75 − التكاليف التجارية − الأعباء الإدارية − 65.'
				],
				solutionStepsAr: [
					`توزيع الأعباء: الشراء $= ${formatDzd(buyFunc)}$، التجاري $= ${formatDzd(commFunc)}$، الإداري $= ${formatDzd(adminFunc)}$ دج.`,
					`كلفة المبيعات $= ${formatDzd(costOfSales)}$ دج؛ الهامش الإجمالي $= ${formatDzd(grossMargin)}$ دج.`,
					`النتيجة العملياتية $= ${formatDzd(opResult)}$ دج.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. الميزانية الوظيفية ومؤشرات التوازن المالي (8 ن)
	// MUST INCLUDE: buildIllustratedFigureBlock('mgt_04_functional_balance_sheet', { pins: [], mode: 'image_only' })
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_3as_acc_t2_functional_balance_indicators',
		grade: '3as_acc',
		trimesterId: 't2',
		domain: 'acc_financial_statements',
		titleAr: 'الميزانية الوظيفية، مؤشرات التوازن المالي (FRNG, BFR, TN) ونسب الهيكلة',
		curriculumLessonId: 'mgt_lesson_3as_acc_t2_functional_balance_sheet',
		defaultPoints: 8,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_3AS_T2);

			const es = rng.int(22, 32) * 100_000;
			const ace = rng.int(10, 16) * 100_000;
			const ache = rng.int(2, 4) * 100_000;
			const ta = rng.int(3, 6) * 100_000;
			const ac = ace + ache + ta;
			const totalFunc = es + ac;

			const ownFunds = rng.int(20, 28) * 100_000;
			const finDebt16 = rng.int(6, 10) * 100_000; // تمويل استثماري إسلامي
			const rs = ownFunds + finDebt16;

			const pce = rng.int(8, 12) * 100_000;
			const pche = rng.int(1, 3) * 100_000;
			const tp = totalFunc - (rs + pce + pche) > 0 ? totalFunc - (rs + pce + pche) : 100_000;
			// Ensure totalFunc == rs + pce + pche + tp cleanly!
			const adjustedPce = totalFunc - rs - pche - tp;
			const pc = adjustedPce + pche + tp;

			const frng = rs - es;
			const bfrE = ace - adjustedPce;
			const bfrHe = ache - pche;
			const bfr = bfrE + bfrHe;
			const tn = frng - bfr; // equals ta - tp!

			const ratioCoverEs = roundTo(rs / es, 2);
			const ratioDebt = roundTo((finDebt16 + tp) / ownFunds, 2);

			const content: ContentBlock[] = [
				buildIllustratedFigureBlock('mgt_04_functional_balance_sheet', {
					pins: [],
					mode: 'image_only',
					width: '68%',
					maxHeight: 132
				}),
				buildManagementDocumentBlock({
					title: `بيانات الميزانية الوظيفية — ${company} (31/12/2024)`,
					text: `من الميزانية الختامية وجدول الاهتلاكات والمؤونات، استُخرجت القيم الوظيفية الآتية (بالدج):\n• الاستخدامات المستقرة (ES): ${formatDzd(es)} | أصول متداولة للاستغلال (ACE): ${formatDzd(ace)} | أصول متداولة خارج الاستغلال (ACHE): ${formatDzd(ache)} | خزينة الأصول (TA): ${formatDzd(ta)}.\n• الموارد الخاصة (تشمل ∑ الاهتلاكات والمؤونات): ${formatDzd(ownFunds)} | ديون مالية طويلة الأجل (تمويل استثماري إسلامي حـ/ 164): ${formatDzd(finDebt16)} | خصوم متداولة للاستغلال (PCE): ${formatDzd(adjustedPce)} | خصوم متداولة خارج الاستغلال (PCHE): ${formatDzd(pche)} | خزينة الخصوم (TP حـ/ 519): ${formatDzd(tp)}.`
				}),
				{
					type: 'text',
					content: '1) أكمل الميزانية الوظيفية المختصرة (بالقيم المطلقة والنسب المئوية):'
				},
				buildManagementTableBlock(
					['الاستخدامات (الأصول)', 'المبلغ (دج)', 'النسبة %', 'الموارد (الخصوم)', 'المبلغ (دج)', 'النسبة %'],
					[
						[
							{ label: 'الاستخدامات المستقرة (ES)' },
							{ label: formatDzd(es) },
							{ label: `${roundTo((es / totalFunc) * 100, 1)}%` },
							{ label: 'الموارد الثابتة (RS)' },
							{ label: '........', answer: formatDzd(rs), mark: '1' },
							{ label: `${roundTo((rs / totalFunc) * 100, 1)}%` }
						],
						[
							{ label: 'الأصول المتداولة (AC)' },
							{ label: '........', answer: formatDzd(ac), mark: '1' },
							{ label: `${roundTo((ac / totalFunc) * 100, 1)}%` },
							{ label: 'الخصوم المتداولة (PC)' },
							{ label: '........', answer: formatDzd(pc), mark: '1' },
							{ label: `${roundTo((pc / totalFunc) * 100, 1)}%` }
						],
						[
							{ label: 'المجموع العام', bold: true },
							{ label: formatDzd(totalFunc), bold: true },
							{ label: '100%', bold: true },
							{ label: 'المجموع العام', bold: true },
							{ label: formatDzd(totalFunc), bold: true },
							{ label: '100%', bold: true }
						]
					]
				),
				{
					type: 'text',
					content: '2) احسب مؤشرات التوازن المالي الثلاثة ($"FRNG"$، $"BFR"$، $"TN"$) وتحقق من تطابق $"TN"$ بطريقتين.',
					answer: `$"FRNG" = "RS" - "ES" = ${formatDzd(rs)} - ${formatDzd(es)} = ${formatDzd(frng)}$ دج.\n$"BFR" = ("ACE" - "PCE") + ("ACHE" - "PCHE") = ${formatDzd(bfrE)} + (${formatDzd(bfrHe)}) = ${formatDzd(bfr)}$ دج.\n$"TN" = "FRNG" - "BFR" = ${formatDzd(frng)} - (${formatDzd(bfr)}) = ${formatDzd(tn)}$ دج، وتساوي $"TA" - "TP" = ${formatDzd(ta)} - ${formatDzd(tp)} = ${formatDzd(tn)}$ دج.`,
					mark: '3'
				},
				{
					type: 'text',
					content: '3) احسب نسبة تمويل الاستخدامات المستقرة ونسبة الاستدانة المالية، ثم علّق على الوضعية المالية للمؤسسة.',
					answer: `نسبة تمويل الاستخدامات المستقرة $= frac(${formatDzd(rs)}, ${formatDzd(es)}) = ${ratioCoverEs}$. نسبة الاستدانة $= frac(${formatDzd(finDebt16 + tp)}, ${formatDzd(ownFunds)}) = ${ratioDebt}$. التعليق: ${frng >= 0 && tn >= 0 ? 'المؤسسة متوازنة مالياً حيث غطت الموارد الثابتة استخداماتها المستقرة وحققت خزينة موجبة.' : 'المؤسسة في ضائقة خزينة ويجب تحسين تغطية رأس المال العامل.'}`,
					mark: '2'
				}
			];

			const sujetExercise: ExerciseBlock = {
				points: 8,
				instruction: 'أتمم الميزانية الوظيفية واحسب مؤشرات التوازن المالي ونسب الهيكلة:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(frng);
				quizQuestion = {
					type: 'calculated',
					questionText: `بلغت الموارد الثابتة لمؤسسة $${formatDzd(rs)}$ دج، والاستخدامات المستقرة $${formatDzd(es)}$ دج. احسب رأس المال العامل الصافي الإجمالي ($FRNG$).`,
					questionTextAr: 'احسب قيمة FRNG (بالدج):',
					questionData: { answer: frng, displayTemplate: 'FRNG = ? دج', variables: [], tolerance: 0.01 },
					explanation: `$FRNG = RS - ES = ${formatDzd(rs)} - ${formatDzd(es)} = ${formatDzd(frng)}$ دج.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(bfr);
				quizQuestion = {
					type: 'calculated',
					questionText: `في الميزانية الوظيفية لـ ${company}: $ACE = ${formatDzd(ace)}$، $PCE = ${formatDzd(adjustedPce)}$، $ACHE = ${formatDzd(ache)}$، و$PCHE = ${formatDzd(pche)}$ دج. احسب احتياجات رأس المال العامل ($BFR$).`,
					questionTextAr: 'احسب قيمة BFR (بالدج):',
					questionData: { answer: bfr, displayTemplate: 'BFR = ? دج', variables: [], tolerance: 0.01 },
					explanation: `$BFR = (${formatDzd(ace)} - ${formatDzd(adjustedPce)}) + (${formatDzd(ache)} - ${formatDzd(pche)}) = ${formatDzd(bfr)}$ دج.`
				};
			} else {
				finalAnswer = String(tn);
				quizQuestion = {
					type: 'calculated',
					questionText: `إذا كان $FRNG = ${formatDzd(frng)}$ دج و$BFR = ${formatDzd(bfr)}$ دج، احسب الخزينة الصافية ($TN$).`,
					questionTextAr: 'احسب الخزينة الصافية TN:',
					questionData: { answer: tn, displayTemplate: 'TN = ? دج', variables: [], tolerance: 0.01 },
					explanation: `$TN = FRNG - BFR = ${formatDzd(frng)} - (${formatDzd(bfr)}) = ${formatDzd(tn)}$ دج.`
				};
			}

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تُحسب الموارد الثابتة بجمع الموارد الخاصة (مع الاهتلاكات والمؤونات) والديون المالية طويلة الأجل.',
					'FRNG = RS − ES، وBFR = (ACE − PCE) + (ACHE − PCHE).',
					'تحقق دائماً من أن TN = FRNG − BFR تطابق تماماً TA − TP.'
				],
				solutionStepsAr: [
					`الموارد الثابتة $RS = ${formatDzd(rs)}$ دج؛ الأصول المتداولة $AC = ${formatDzd(ac)}$ دج؛ الخصوم المتداولة $PC = ${formatDzd(pc)}$ دج.`,
					`$FRNG = ${formatDzd(frng)}$ دج؛ $BFR = ${formatDzd(bfr)}$ دج؛ $TN = ${formatDzd(tn)}$ دج.`,
					`نسبة تمويل $ES = ${ratioCoverEs}$؛ نسبة الاستدانة $= ${ratioDebt}$.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. وضعية بكالوريا شاملة في الميزانية الوظيفية ونسب الدوران (8 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_3as_acc_t2_financial_statements_integration',
		grade: '3as_acc',
		trimesterId: 't2',
		domain: 'integration',
		titleAr: 'وضعية بكالوريا: استخراج مجاهيل الميزانية الوظيفية ونسب الدوران والتشخيص المالي',
		curriculumLessonId: 'mgt_lesson_3as_acc_t2_financial_analysis_ratios',
		defaultPoints: 8,
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_3AS_T2);

			const totalFunc = rng.int(4, 8) * 1_000_000;
			const es = totalFunc * 0.55;
			const ac = totalFunc * 0.45;
			const frng = totalFunc * 0.1; // RS - ES = 10% of total
			const rs = es + frng; // 65%
			const pc = totalFunc - rs; // 35%
			const ta = totalFunc * 0.08;
			const tp = totalFunc * 0.03;
			const tn = ta - tp; // +5% of total
			const bfr = frng - tn; // +5% of total

			// Turnover ratios (360 days)
			const salesTtc = rng.int(6, 10) * 1_200_000;
			const avgCust = (salesTtc / 360) * 45; // exactly 45 days!
			const purchTtc = rng.int(4, 8) * 900_000;
			const avgSupp = (purchTtc / 360) * 30; // exactly 30 days!
			const custDays = 45;
			const suppDays = 30;

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `وضعية تشخيص مالي للثلاثي الثاني — ${company}`,
					text: `بلغ مجموع الميزانية الوظيفية لـ ${company} في 31/12/2024 مبلغ ${formatDzd(totalFunc)} دج، حيث:\n• الاستخدامات المستقرة (ES) تمثل 55% من المجموع، ورأس المال العامل الصافي الإجمالي (FRNG) يساوي ${formatDzd(frng)} دج.\n• خزينة الأصول (TA) تساوي ${formatDzd(ta)} دج، وخزينة الخصوم (TP) تساوي ${formatDzd(tp)} دج.\n• بيانات الدوران خلال السنة (360 يوماً): المبيعات السنوية (TTC) ${formatDzd(salesTtc)} دج ومتوسط الزبائن ${formatDzd(avgCust)} دج؛ المشتريات السنوية (TTC) ${formatDzd(purchTtc)} دج ومتوسط الموردين ${formatDzd(avgSupp)} دج.`
				}),
				{
					type: 'text',
					content: '1) أوجد مبالغ كل من: الاستخدامات المستقرة ($"ES"$), الأصول المتداولة ($"AC"$), الموارد الثابتة ($"RS"$), الخصوم المتداولة ($"PC"$), الخزينة الصافية ($"TN"$), واحتياجات رأس المال العامل ($"BFR"$).',
					answer: `$"ES" = ${formatDzd(es)}$ دج؛ $"AC" = ${formatDzd(ac)}$ دج. $"RS" = "ES" + "FRNG" = ${formatDzd(rs)}$ دج؛ $"PC" = ${formatDzd(totalFunc)} - ${formatDzd(rs)} = ${formatDzd(pc)}$ دج. $"TN" = ${formatDzd(ta)} - ${formatDzd(tp)} = ${formatDzd(tn)}$ دج؛ $"BFR" = "FRNG" - "TN" = ${formatDzd(frng)} - ${formatDzd(tn)} = ${formatDzd(bfr)}$ دج.`,
					mark: '3'
				},
				{
					type: 'text',
					content: '2) أكمل جدول نسب الهيكلة والدوران المالي:'
				},
				buildManagementTableBlock(
					['المؤشر / النسبة', 'الصيغة المطبقة', 'القيمة المحسوبة'],
					[
						[
							{ label: 'نسبة تمويل الاستخدامات المستقرة' },
							{ label: 'RS ÷ ES' },
							{ label: '........', answer: String(roundTo(rs / es, 2)), mark: '1' }
						],
						[
							{ label: 'مدة تحصيل الزبائن (بالأيام)' },
							{ label: '(متوسط الزبائن × 360) ÷ مبيعات TTC' },
							{ label: '........', answer: `${custDays} يوماً`, mark: '1.5' }
						],
						[
							{ label: 'مدة تسديد الموردين (بالأيام)' },
							{ label: '(متوسط الموردين × 360) ÷ مشتريات TTC' },
							{ label: '........', answer: `${suppDays} يوماً`, mark: '1.5' }
						]
					]
				),
				{
					type: 'text',
					content: '3) قدم تشخيصاً موجزاً حول علاقة آجال الزبائن والموردين بوضعية الخزينة الصافية مع اقتراح عملي.',
					answer: `تسدد المؤسسة للموردين بعد ${suppDays} يوماً قبل أن تحصل أموالها من الزبائن (${custDays} يوماً)، ما يرفع احتياجات رأس المال العامل. رغم أن الخزينة موجبة حالياً (${formatDzd(tn)} دج)، يُنصح بتقليص آجال تحصيل الزبائن أو تقديم حسم تعجيل دفع تجاري لتحسين السيولة.`,
					mark: '1'
				}
			];

			const sujetExercise: ExerciseBlock = {
				customTitle: 'الوضعية الإدماجية — الثلاثي الثاني (التشخيص المالي)',
				points: 8,
				instruction: 'استخرج مجاهيل الميزانية الوظيفية واحسب نسب الدوران وقدّم تشخيصاً مالياً:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(rs);
				quizQuestion = {
					type: 'calculated',
					questionText: `بلغ مجموع الميزانية الوظيفية لـ ${company} مبلغ $${formatDzd(totalFunc)}$ دج، تمثل الاستخدامات المستقرة $55\\%$ منه، ويبلغ $FRNG = ${formatDzd(frng)}$ دج. احسب قيمة الموارد الثابتة ($RS$).`,
					questionTextAr: 'احسب الموارد الثابتة RS (بالدج):',
					questionData: { answer: rs, displayTemplate: 'RS = ? دج', variables: [], tolerance: 0.01 },
					explanation: `$ES = ${formatDzd(es)}$ دج؛ $RS = ES + FRNG = ${formatDzd(es)} + ${formatDzd(frng)} = ${formatDzd(rs)}$ دج.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(bfr);
				quizQuestion = {
					type: 'calculated',
					questionText: `في ميزانية ${company}، بلغ $FRNG = ${formatDzd(frng)}$ دج، وخزينة الأصول $TA = ${formatDzd(ta)}$ دج، وخزينة الخصوم $TP = ${formatDzd(tp)}$ دج. استنتج قيمة احتياجات رأس المال العامل ($BFR$).`,
					questionTextAr: 'احسب قيمة BFR (بالدج):',
					questionData: { answer: bfr, displayTemplate: 'BFR = ? دج', variables: [], tolerance: 0.01 },
					explanation: `$TN = TA - TP = ${formatDzd(tn)}$ دج؛ $BFR = FRNG - TN = ${formatDzd(frng)} - ${formatDzd(tn)} = ${formatDzd(bfr)}$ دج.`
				};
			} else {
				finalAnswer = String(custDays);
				quizQuestion = {
					type: 'calculated',
					questionText: `بلغت المبيعات السنوية متضمنة الرسم ($TTC$) مبلغ $${formatDzd(salesTtc)}$ دج، ومتوسط رصيد الزبائن $${formatDzd(avgCust)}$ دج (السنة $360$ يوماً). احسب مدة تحصيل الزبائن بالأيام.`,
					questionTextAr: 'احسب مدة تحصيل الزبائن (بالأيام):',
					questionData: { answer: custDays, displayTemplate: 'المدة = ? يوماً', variables: [], tolerance: 0.1 },
					explanation: `المدة $= \\frac{${formatDzd(avgCust)} \\times 360}{${formatDzd(salesTtc)}} = ${custDays}$ يوماً.`
				};
			}

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'استخرج ES أولاً (55% من المجموع العام) ثم احسب RS = ES + FRNG.',
					'TN = TA − TP، ومن العلاقة TN = FRNG − BFR نستنتج BFR = FRNG − TN.',
					'مدة دوران الزبائن < مدة الموردين هي الحالة المثالية لسيولة المؤسسة.'
				],
				solutionStepsAr: [
					`$ES = ${formatDzd(es)}$ دج، $AC = ${formatDzd(ac)}$ دج، $RS = ${formatDzd(rs)}$ دج، $PC = ${formatDzd(pc)}$ دج.`,
					`$TN = ${formatDzd(tn)}$ دج، $BFR = ${formatDzd(bfr)}$ دج، ونسبة تمويل $ES = ${roundTo(rs / es, 2)}$.`,
					`مدة الزبائن $= ${custDays}$ يوماً، ومدة الموردين $= ${suppDays}$ يوماً.`
				],
				finalAnswer
			};
		}
	}
];
