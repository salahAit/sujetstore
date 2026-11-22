import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
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
// 2AS GE Accounting & Finance (التسيير المحاسبي والمالي) — T3 Templates (5)
// ═══════════════════════════════════════════════════════════════════════════════

const COMPANIES_T3 = [
	'مؤسسة متيجة الصناعية',
	'مؤسسة الأوراس للتوزيع',
	'مؤسسة الصومام الغذائية',
	'مؤسسة الونشريس التجارية',
	'مؤسسة تيبازة للإنتاج'
];

export const TEMPLATES_2AS_ACC_T3: ManagementParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. أعباء المستخدمين وكشف الأجر والقيود المحاسبية (6 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_2as_acc_t3_payroll_slip_journal',
		grade: '2as_acc',
		trimesterId: 't3',
		domain: 'acc_operations',
		titleAr: 'إعداد كشف الأجر وتسجيل أعباء المستخدمين (الضمان 9% و IRG)',
		curriculumLessonId: 'mgt_lesson_2as_acc_t3_payroll_irg',
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_T3);
			const baseWage = rng.int(35, 55) * 1_000;
			const iep = rng.int(3, 7) * 1_000;
			const pri = rng.int(2, 6) * 1_000;
			const basket = rng.int(2, 4) * 1_000;
			const transport = rng.int(15, 30) * 100;
			const advance = difficulty === 'easy' ? 0 : rng.int(4, 8) * 1_000;

			const posteWage = baseWage + iep + pri;
			const grossWage = posteWage + basket + transport;
			const ssWorker = roundTo(posteWage * 0.09, 2);
			const taxableWage = roundTo(posteWage - ssWorker + basket + transport, 2);
			const irg = roundTo(Math.max(0, (taxableWage - 30_000) * 0.2), 2);
			const netPayable = roundTo(grossWage - ssWorker - irg - advance, 2);
			const ssEmployer = roundTo(posteWage * 0.26, 2);

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `بيانات كشف الأجر الشهري — ${company}`,
					text: `يتقاضى موظف لدى ${company} العناصر الآتية لشهر ماي:\n• الأجر القاعدي: ${formatDzd(baseWage)} دج | تعويض الخبرة المهنية (IEP): ${formatDzd(iep)} دج | منحة المردودية (PRI): ${formatDzd(pri)} دج.\n• تعويض السلة: ${formatDzd(basket)} دج | تعويض النقل: ${formatDzd(transport)} دج.\n• اقتطاع ضريبة الدخل الإجمالي (IRG): ${formatDzd(irg)} دج.${advance > 0 ? ` | التسبيق الممنوح خلال الشهر: ${formatDzd(advance)} دج.` : ''}\n(معدل الضمان الاجتماعي للعامل 9% ومعدل اشتراك رب العمل 26%).`
				}),
				{
					type: 'text',
					content: '1) أكمل جدول عناصر كشف الأجر الآتي:'
				},
				buildManagementTableBlock(
					['البيان', 'القيمة (دج)'],
					[
						[{ label: 'أجر المنصب (القاعدي + IEP + PRI)', bold: true }, { label: '........', answer: formatDzd(posteWage), mark: '1' }],
						[{ label: 'اشتراك الضمان الاجتماعي للعامل (9% × أجر المنصب)' }, { label: '........', answer: formatDzd(ssWorker), mark: '0.75' }],
						[{ label: 'الأجر الإجمالي الخام (حـ/ 631)' }, { label: '........', answer: formatDzd(grossWage), mark: '0.75' }],
						[{ label: 'الأجر الخاضع للضريبة (IRG)' }, { label: formatDzd(taxableWage) }],
						[{ label: 'ضريبة الدخل الإجمالي (IRG حـ/ 442)' }, { label: formatDzd(irg) }],
						...(advance > 0 ? [[{ label: 'التسبيقات على الأجور (حـ/ 425)' }, { label: formatDzd(advance) }]] : []),
						[{ label: 'الأجر الصافي للدفع (حـ/ 421)', bold: true }, { label: '........', answer: formatDzd(netPayable), mark: '1' }],
						[{ label: 'أعباء الضمان الاجتماعي لرب العمل (26% × أجر المنصب)' }, { label: '........', answer: formatDzd(ssEmployer), mark: '0.75' }]
					]
				),
				{
					type: 'text',
					content: '2) سجل قيد إثبات الأجر وقيد إثبات أعباء رب العمل في نهاية الشهر:',
					answer: `قيد الأجر: مدين حـ/ 631 (${formatDzd(grossWage)}) / دائن حـ/ 431 (${formatDzd(ssWorker)})، حـ/ 442 (${formatDzd(irg)})${advance > 0 ? `، حـ/ 425 (${formatDzd(advance)})` : ''}، حـ/ 421 (${formatDzd(netPayable)}).\nقيد أعباء رب العمل: مدين حـ/ 635 (${formatDzd(ssEmployer)}) / دائن حـ/ 431 (${formatDzd(ssEmployer)}).`,
					mark: '1.75'
				}
			];

			const sujetExercise: ExerciseBlock = {
				points: 6,
				instruction: 'أنجز الحسابات الخاصة بكشف الأجر وسجل القيود المحاسبية الموافقة:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(ssWorker);
				quizQuestion = {
					type: 'calculated',
					questionText: `أجر المنصب لموظف يساوي $${formatDzd(posteWage)}$ دج، ويتقاضى تعويض سلة ونقل قدرهما $${formatDzd(basket + transport)}$ دج. احسب اشتراك الضمان الاجتماعي المقتطع من العامل ($9\\%$).`,
					questionTextAr: 'احسب اشتراك الضمان الاجتماعي للعامل:',
					questionData: { answer: ssWorker, displayTemplate: 'الضمان الاجتماعي = ? دج', variables: [], tolerance: 0.5 },
					explanation: `يطبق معدل $9\\%$ على أجر المنصب فقط: $${formatDzd(posteWage)} \\times 0.09 = ${formatDzd(ssWorker)}$ دج.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(netPayable);
				quizQuestion = {
					type: 'calculated',
					questionText: `بلغ الأجر الإجمالي الخام لعامل $${formatDzd(grossWage)}$ دج، واقتطاع الضمان الاجتماعي $${formatDzd(ssWorker)}$ دج، وضريبة IRG $${formatDzd(irg)}$ دج، والتسبيق $${formatDzd(advance)}$ دج. احسب الأجر الصافي للدفع (حـ/ 421).`,
					questionTextAr: 'احسب الأجر الصافي للدفع (بالدج):',
					questionData: { answer: netPayable, displayTemplate: 'الصافي للدفع = ? دج', variables: [], tolerance: 0.5 },
					explanation: `الصافي للدفع $= ${formatDzd(grossWage)} - ${formatDzd(ssWorker)} - ${formatDzd(irg)} - ${formatDzd(advance)} = ${formatDzd(netPayable)}$ دج.`
				};
			} else {
				finalAnswer = String(grossWage + ssEmployer);
				quizQuestion = {
					type: 'calculated',
					questionText: `إذا كان أجر المنصب لعامل $${formatDzd(posteWage)}$ دج، والأجر الإجمالي الخام (حـ/ 631) يساوي $${formatDzd(grossWage)}$ دج، ونسبة اشتراك رب العمل $26\\%$ من أجر المنصب. احسب مجموع أعباء المستخدمين الإجمالية (حـ/ 63 = 631 + 635) التي تتحملها المؤسسة.`,
					questionTextAr: 'احسب مجموع أعباء المستخدمين حـ/ 63:',
					questionData: { answer: grossWage + ssEmployer, displayTemplate: 'حـ/ 63 = ? دج', variables: [], tolerance: 0.5 },
					explanation: `حـ/ 635 $= ${formatDzd(posteWage)} \\times 0.26 = ${formatDzd(ssEmployer)}$ دج؛ المجموع $= ${formatDzd(grossWage)} + ${formatDzd(ssEmployer)} = ${formatDzd(grossWage + ssEmployer)}$ دج.`
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
					'أجر المنصب = الأجر القاعدي + الخبرة + المردودية (تستثنى السلة والنقل والمنح العائلية).',
					'اشتراك الضمان الاجتماعي للعامل (9%) ورب العمل (26%) يحسبان على أجر المنصب.',
					'الصافي للدفع (421) = الأجر الإجمالي الخام − الضمان (9%) − IRG − التسبيقات.'
				],
				solutionStepsAr: [
					`أجر المنصب $= ${formatDzd(posteWage)}$ دج؛ الضمان للعامل ($9\\%$) $= ${formatDzd(ssWorker)}$ دج.`,
					`الأجر الإجمالي الخام $= ${formatDzd(grossWage)}$ دج؛ الصافي للدفع $= ${formatDzd(netPayable)}$ دج.`,
					`أعباء رب العمل ($26\\%$) $= ${formatDzd(ssEmployer)}$ دج في مدين حـ/ 635 مقابل دائن حـ/ 431.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. القيمة المضافة والنتائج الأولية (6 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_2as_acc_t3_value_added_ebe',
		grade: '2as_acc',
		trimesterId: 't3',
		domain: 'acc_financial_statements',
		titleAr: 'حساب القيمة المضافة (VA) وإجمالي فائض الاستغلال (EBE) والنتيجة الصافية',
		curriculumLessonId: 'mgt_lesson_2as_acc_t3_value_added_results',
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_T3);
			const sales = rng.int(22, 36) * 100_000;
			const invProd = rng.int(1, 4) * 100_000;
			const cogs = rng.int(10, 15) * 100_000;
			const extServ = rng.int(2, 4) * 100_000;
			const staff = rng.int(4, 6) * 100_000;
			const taxes = rng.int(1, 2) * 100_000;
			const dep = rng.int(1, 2) * 100_000;
			const ibsRate = 19;

			const prodExercise = sales + invProd;
			const consExercise = cogs + extServ;
			const va = prodExercise - consExercise;
			const ebe = va - staff - taxes;
			const opRes = ebe - dep;
			const ibs = roundTo(opRes * (ibsRate / 100), 2);
			const netRes = roundTo(opRes - ibs, 2);

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `أرصدة حسابات التسيير (قبل الجرد الختامي) — ${company}`,
					text: `قدّمت ${company} (مؤسسة صناعية تخضع للضريبة على الأرباح IBS بمعدل 19%) أرصدة حسابات التسيير الآتية في 31 ديسمبر:\n• حـ/ 701 مبيعات المنتجات التامة: ${formatDzd(sales)} دج | حـ/ 72 الإنتاج المخزن (دائن): ${formatDzd(invProd)} دج.\n• حـ/ 60 المشتريات المستهلكة: ${formatDzd(cogs)} دج | حـ/ 61 و62 الخدمات الخارجية الأخرى: ${formatDzd(extServ)} دج.\n• حـ/ 63 أعباء المستخدمين: ${formatDzd(staff)} دج | حـ/ 64 الضرائب والرسوم: ${formatDzd(taxes)} دج | حـ/ 68 مخصصات الاهتلاك: ${formatDzd(dep)} دج.`
				}),
				{
					type: 'text',
					content: '1) أكمل جدول حساب النتائج حسب الطبيعة (النتائج الأولية والنتيجة الصافية):'
				},
				buildManagementTableBlock(
					['البيان (حساب النتائج المبسط)', 'طريقة الحساب / الرمز', 'المبلغ (دج)'],
					[
						[{ label: '1. إنتاج السنة المالية' }, { label: '701 + 72' }, { label: '........', answer: formatDzd(prodExercise), mark: '0.75' }],
						[{ label: '2. استهلاك السنة المالية' }, { label: '60 + 61 + 62' }, { label: '........', answer: formatDzd(consExercise), mark: '0.75' }],
						[{ label: '3. القيمة المضافة للاستغلال (VA)', bold: true }, { label: 'الإنتاج − الاستهلاك' }, { label: '........', answer: formatDzd(va), mark: '1' }],
						[{ label: '4. إجمالي فائض الاستغلال (EBE)', bold: true }, { label: 'VA − (63 + 64)' }, { label: '........', answer: formatDzd(ebe), mark: '1' }],
						[{ label: '5. النتيجة العملياتية (والعادية قبل الضريبة)' }, { label: 'EBE − 68' }, { label: '........', answer: formatDzd(opRes), mark: '1' }],
						[{ label: '6. الضرائب على الأرباح IBS (19%)' }, { label: 'حـ/ 695' }, { label: '........', answer: formatDzd(ibs), mark: '0.75' }],
						[{ label: '7. النتيجة الصافية للسنة المالية', bold: true }, { label: 'حـ/ 120' }, { label: '........', answer: formatDzd(netRes), mark: '0.75' }]
					]
				)
			];

			const sujetExercise: ExerciseBlock = {
				points: 6,
				instruction: 'احسب النتائج الأولية واستنتج النتيجة الصافية للسنة المالية:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(va);
				quizQuestion = {
					type: 'calculated',
					questionText: `بلغ إنتاج السنة المالية لمؤسسة $${formatDzd(prodExercise)}$ دج، واستهلاكها من المواد والخدمات الخارجية $${formatDzd(consExercise)}$ دج. احسب القيمة المضافة للاستغلال (VA).`,
					questionTextAr: 'احسب القيمة المضافة (VA):',
					questionData: { answer: va, displayTemplate: 'VA = ? دج', variables: [], tolerance: 0.01 },
					explanation: `$VA = ${formatDzd(prodExercise)} - ${formatDzd(consExercise)} = ${formatDzd(va)}$ دج.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(ebe);
				quizQuestion = {
					type: 'calculated',
					questionText: `حققت ${company} قيمة مضافة (VA) قدرها $${formatDzd(va)}$ دج، وبلغت أعباء المستخدمين $${formatDzd(staff)}$ دج والضرائب والرسوم $${formatDzd(taxes)}$ دج. احسب إجمالي فائض الاستغلال (EBE).`,
					questionTextAr: 'احسب إجمالي فائض الاستغلال (EBE):',
					questionData: { answer: ebe, displayTemplate: 'EBE = ? دج', variables: [], tolerance: 0.01 },
					explanation: `$EBE = ${formatDzd(va)} - (${formatDzd(staff)} + ${formatDzd(taxes)}) = ${formatDzd(ebe)}$ دج.`
				};
			} else {
				finalAnswer = String(netRes);
				quizQuestion = {
					type: 'calculated',
					questionText: `بلغت النتيجة العادية قبل الضرائب لمؤسسة صناعية $${formatDzd(opRes)}$ دج وتخضع لضريبة الأرباح IBS بمعدل $19\\%$. احسب النتيجة الصافية للسنة المالية (حـ/ 120).`,
					questionTextAr: 'احسب النتيجة الصافية (بالدج):',
					questionData: { answer: netRes, displayTemplate: 'النتيجة الصافية = ? دج', variables: [], tolerance: 0.5 },
					explanation: `$IBS = ${formatDzd(opRes)} \\times 0.19 = ${formatDzd(ibs)}$ دج؛ النتيجة الصافية $= ${formatDzd(opRes)} - ${formatDzd(ibs)} = ${formatDzd(netRes)}$ دج.`
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
					'الإنتاج = 701 + 72 (دائن)، والاستهلاك = 60 + 61 + 62.',
					'القيمة المضافة VA = الإنتاج − الاستهلاك؛ وفائض الاستغلال EBE = VA − 63 − 64.',
					'للانتقال من النتيجة العادية قبل الضرائب إلى الصافية، نطرح الـ IBS (19% للمؤسسة الصناعية).'
				],
				solutionStepsAr: [
					`إنتاج السنة $= ${formatDzd(prodExercise)}$ دج؛ استهلاك السنة $= ${formatDzd(consExercise)}$ دج.`,
					`القيمة المضافة $VA = ${formatDzd(va)}$ دج؛ إجمالي فائض الاستغلال $EBE = ${formatDzd(ebe)}$ دج.`,
					`النتيجة العملياتية $= ${formatDzd(opRes)}$ دج؛ ضريبة IBS ($19\\%$) $= ${formatDzd(ibs)}$ دج؛ النتيجة الصافية $= ${formatDzd(netRes)}$ دج.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. الجرد العام والميزانية الختامية (6 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_2as_acc_t3_closing_balance_sheet',
		grade: '2as_acc',
		trimesterId: 't3',
		domain: 'acc_financial_statements',
		titleAr: 'الجرد العام وإعداد الميزانية الختامية في 31 ديسمبر',
		curriculumLessonId: 'mgt_lesson_2as_acc_t3_general_inventory_closing',
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_T3);
			const build = rng.int(16, 26) * 100_000;
			const equip = rng.int(4, 8) * 100_000;
			const inv = rng.int(3, 6) * 100_000;
			const cust = rng.int(2, 4) * 100_000;
			const bank = rng.int(3, 6) * 100_000;
			const cashBook = rng.int(5, 12) * 10_000;
			const cashDiff = difficulty === 'hard' ? 5_000 : 0; // عجز نقدي مكتشف عند الجرد المادي
			const cashActual = cashBook - cashDiff;

			const cap = rng.int(20, 28) * 100_000;
			const murabahaDebt = rng.int(4, 7) * 100_000;
			const supp = rng.int(2, 5) * 100_000;

			const nonCurrent = build + equip;
			const current = inv + cust + bank + cashActual;
			const totalAssets = nonCurrent + current;
			const result = totalAssets - (cap + murabahaDebt + supp);
			const isProfit = result >= 0;

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `بيانات الجرد العام في 31 ديسمبر — ${company}`,
					text: `بعد الجرد العام في 31 ديسمبر، ظهرت أرصدة حسابات الميزانية لـ ${company} كالآتي: البناءات (213): ${formatDzd(build)} دج، المعدات الصناعية (215): ${formatDzd(equip)} دج، المخزونات (30): ${formatDzd(inv)} دج، الزبائن (411): ${formatDzd(cust)} دج، البنك (512): ${formatDzd(bank)} دج، الصندوق بعد الجرد المادي الفعلي (53): ${formatDzd(cashActual)} دج${cashDiff > 0 ? ` (علماً أن رصيده الدفتري قبل الجرد كان ${formatDzd(cashBook)} دج وتمت تسوية العجز غير المبرر)` : ''}، رأس المال (101): ${formatDzd(cap)} دج، التمويل الإسلامي طويل الأجل (164): ${formatDzd(murabahaDebt)} دج، وموردو المخزونات (401): ${formatDzd(supp)} دج.`
				}),
				...(cashDiff > 0
					? [
							{
								type: 'text' as const,
								content: '1) سجل قيد تسوية عجز الصندوق المكتشف عند الجرد المادي:',
								answer: `مدين حـ/ 657 أعباء استثنائية للتسيير الجاري ($${formatDzd(cashDiff)}$ دج) / دائن حـ/ 53 الصندوق ($${formatDzd(cashDiff)}$ دج).`,
								mark: '1'
							}
						]
					: [
							{
								type: 'text' as const,
								content: '1) اذكر الغرض الأساسي من إجراء الجرد المادي في نهاية كل دورة مالية.',
								answer: 'التأكد من الوجود الفعلي للأصول واكتشاف الفوارق أو التلف لمطابقة المحاسبة مع الواقع وإظهار الصورة الصادقة.',
								mark: '1'
							}
						]),
				{
					type: 'text',
					content: '2) أكمل الميزانية الختامية بتاريخ 31 ديسمبر وحدد نتيجة السنة المالية:'
				},
				buildManagementTableBlock(
					['الأصول', 'المبلغ (دج)', 'الخصوم', 'المبلغ (دج)'],
					[
						[
							{ label: 'الأصول غير الجارية (213 + 215)' },
							{ label: '........', answer: formatDzd(nonCurrent), mark: '0.75' },
							{ label: 'رأس المال الصادر (101)' },
							{ label: formatDzd(cap) }
						],
						[
							{ label: 'المخزونات والزبائن (30 + 411)' },
							{ label: formatDzd(inv + cust) },
							{ label: isProfit ? 'نتيجة السنة المالية — ربح (120)' : 'نتيجة السنة المالية — خسارة (129)' },
							{ label: '........', answer: formatDzd(result), mark: '1.25' }
						],
						[
							{ label: 'خزينة الأصول (512 + 53)' },
							{ label: '........', answer: formatDzd(bank + cashActual), mark: '1' },
							{ label: 'الخصوم غير الجارية (164) والجارية (401)' },
							{ label: '........', answer: formatDzd(murabahaDebt + supp), mark: '1' }
						],
						[
							{ label: 'المجموع العام للأصول', bold: true },
							{ label: '........', answer: formatDzd(totalAssets), mark: '0.5' },
							{ label: 'المجموع العام للخصوم', bold: true },
							{ label: '........', answer: formatDzd(totalAssets), mark: '0.5' }
						]
					]
				)
			];

			const sujetExercise: ExerciseBlock = {
				points: 6,
				instruction: 'أنجز الميزانية الختامية بتاريخ 31 ديسمبر واستخرج النتيجة الصافية:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(totalAssets);
				quizQuestion = {
					type: 'calculated',
					questionText: `في 31 ديسمبر بلغت الأصول غير الجارية لمؤسسة $${formatDzd(nonCurrent)}$ دج والأصول الجارية $${formatDzd(current)}$ دج. ما المجموع العام للأصول في الميزانية الختامية؟`,
					questionTextAr: 'احسب المجموع العام للأصول:',
					questionData: { answer: totalAssets, displayTemplate: 'الأصول = ? دج', variables: [], tolerance: 0.01 },
					explanation: `المجموع العام $= ${formatDzd(nonCurrent)} + ${formatDzd(current)} = ${formatDzd(totalAssets)}$ دج.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(result);
				quizQuestion = {
					type: 'calculated',
					questionText: `بلغ مجموع أصول ${company} في 31 ديسمبر $${formatDzd(totalAssets)}$ دج، بينما كان رأس المال $${formatDzd(cap)}$ دج ومجموع الخصوم غير الجارية والجارية $${formatDzd(murabahaDebt + supp)}$ دج. احسب نتيجة السنة المالية (حـ/ 12).`,
					questionTextAr: 'احسب نتيجة السنة المالية:',
					questionData: { answer: result, displayTemplate: 'النتيجة = ? دج', variables: [], tolerance: 0.01 },
					explanation: `النتيجة $= ${formatDzd(totalAssets)} - (${formatDzd(cap)} + ${formatDzd(murabahaDebt + supp)}) = ${formatDzd(result)}$ دج.`
				};
			} else {
				finalAnswer = isProfit ? 'حـ/ 120 (ربح صافي دائن)' : 'حـ/ 129 (خسارة صافية مدينة)';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{
							text: isProfit ? 'حـ/ 129 (خسارة صافية مدينة)' : 'حـ/ 120 (ربح صافي دائن)',
							diagnosticFeedback: isProfit
								? 'النتيجة موجبة لأن الأصول فاقت الأموال الخاصة الأولية والديون.'
								: 'النتيجة سالبة لأن الأصول أقل من رأس المال والديون.'
						},
						{ text: 'حـ/ 101 (رأس المال الصادر)', diagnosticFeedback: 'حـ/ 101 ثابت ولا يُدمج فيه ربح الدورة مباشرة قبل التوزيع.' },
						{ text: 'حـ/ 401 (موردو المخزونات)', diagnosticFeedback: 'حـ/ 401 يخص ديون الموردين لا نتيجة الدورة.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `بعد تسوية جرد الصندوق في 31 ديسمبر كانت النتيجة المحسوبة $${formatDzd(result)}$ دج. في أي حساب تُدرج ضمن رؤوس الأموال الخاصة؟`,
					questionTextAr: 'اختر حساب النتيجة الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: isProfit
						? 'النتيجة الموجبة تُسجل في حـ/ 120 (ربح السنة المالية).'
						: 'النتيجة السالبة تُسجل في حـ/ 129 (خسارة السنة المالية).'
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
					'تُستعمل الأرصدة الفعلية بعد الجرد (وليس قبل الجرد) في الميزانية الختامية.',
					'النتيجة = مجموع الأصول − (رأس المال + الخصوم غير الجارية + الخصوم الجارية).',
					'تدرج النتيجة في كتلة رؤوس الأموال الخاصة بالميزانية الختامية.'
				],
				solutionStepsAr: [
					`الأصول غير الجارية $= ${formatDzd(nonCurrent)}$ دج، الأصول الجارية $= ${formatDzd(current)}$ دج، المجموع العام $= ${formatDzd(totalAssets)}$ دج.`,
					`الديون (164 + 401) $= ${formatDzd(murabahaDebt + supp)}$ دج.`,
					`النتيجة الصافية $= ${formatDzd(totalAssets)} - (${formatDzd(cap)} + ${formatDzd(murabahaDebt + supp)}) = ${formatDzd(result)}$ دج.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. إقفال حسابات التسيير ومطابقة النتيجة (8 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_2as_acc_t3_trial_balance_to_income',
		grade: '2as_acc',
		trimesterId: 't3',
		domain: 'acc_year_end',
		titleAr: 'ترصيد حسابات التسيير وإقفال الدورة ومطابقة النتيجة',
		curriculumLessonId: 'mgt_lesson_2as_acc_t3_general_inventory_closing',
		defaultPoints: 8,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_T3);
			const rev700 = rng.int(18, 28) * 100_000;
			const rev75 = rng.int(1, 3) * 100_000;
			const rev768 = rng.int(2, 6) * 10_000;
			const totalRev = rev700 + rev75 + rev768;

			const exp600 = rng.int(10, 14) * 100_000;
			const exp61_62 = rng.int(2, 3) * 100_000;
			const exp63 = rng.int(3, 5) * 100_000;
			const exp64 = rng.int(5, 10) * 10_000;
			const totalExpBeforeTax = exp600 + exp61_62 + exp63 + exp64;
			const resBeforeTax = totalRev - totalExpBeforeTax;
			const ibs = roundTo(resBeforeTax * 0.26, 2); // نشاط تجاري 26%
			const netRes = roundTo(resBeforeTax - ibs, 2);

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `ميزان حسابات التسيير في 31 ديسمبر — ${company} (مؤسسة تجارية)`,
					text: `ظهرت أرصدة حسابات الصنفين 6 و7 في نهاية السنة كالآتي:\n• حـ/ 700 مبيعات البضائع: ${formatDzd(rev700)} دج | حـ/ 75 منتوجات عملياتية أخرى: ${formatDzd(rev75)} دج | حـ/ 768 منتوجات مالية (حسم تعجيل دفع مكتسب): ${formatDzd(rev768)} دج.\n• حـ/ 600 مشتريات البضائع المبيعة: ${formatDzd(exp600)} دج | حـ/ 61 و62 الخدمات الخارجية: ${formatDzd(exp61_62)} دج | حـ/ 63 أعباء المستخدمين: ${formatDzd(exp63)} دج | حـ/ 64 الضرائب والرسوم: ${formatDzd(exp64)} دج.\n(معدل الضريبة على الأرباح IBS للنشاط التجاري: 26%).`
				}),
				{
					type: 'text',
					content: '1) احسب مجموع المنتوجات (حـ/ 7) ومجموع الأعباء قبل الضرائب، ثم استخرج النتيجة قبل الضرائب وضريبة IBS (حـ/ 695) والنتيجة الصافية (حـ/ 120).',
					answer: `مجموع المنتوجات $= ${formatDzd(totalRev)}$ دج. مجموع الأعباء قبل الضرائب $= ${formatDzd(totalExpBeforeTax)}$ دج. النتيجة قبل الضرائب $= ${formatDzd(resBeforeTax)}$ دج. $"IBS" = ${formatDzd(resBeforeTax)} times 0.26 = ${formatDzd(ibs)}$ دج. النتيجة الصافية $= ${formatDzd(netRes)}$ دج.`,
					mark: '3'
				},
				{
					type: 'text',
					content: '2) أكمل جدول قيود تجميع وترصيد حسابات التسيير في 31 ديسمبر:'
				},
				buildManagementTableBlock(
					['المرحلة / القيد', 'الحساب المدين والمبلغ', 'الحساب الدائن والمبلغ'],
					[
						[
							{ label: 'أ) إثبات الضريبة على الأرباح (IBS)' },
							{ label: '........', answer: `حـ/ 695 (${formatDzd(ibs)})`, mark: '1' },
							{ label: '........', answer: `حـ/ 444 الدولة ضرائب على النتائج (${formatDzd(ibs)})`, mark: '1' }
						],
						[
							{ label: 'ب) ترصيد حسابات المنتوجات (7)' },
							{ label: '........', answer: `حـ/ 700 و75 و768 (${formatDzd(totalRev)})`, mark: '1' },
							{ label: '........', answer: `حـ/ 120 (${formatDzd(totalRev)})`, mark: '0.5' }
						],
						[
							{ label: 'ج) ترصيد حسابات الأعباء (6 بما فيها 695)' },
							{ label: '........', answer: `حـ/ 120 (${formatDzd(totalExpBeforeTax + ibs)})`, mark: '0.5' },
							{ label: '........', answer: `حـ/ 600، 61/62، 63، 64، 695 (${formatDzd(totalExpBeforeTax + ibs)})`, mark: '1' }
						]
					]
				)
			];

			const sujetExercise: ExerciseBlock = {
				points: 8,
				instruction: 'أقفل حسابات التسيير واستخرج النتيجة الصافية:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(totalRev);
				quizQuestion = {
					type: 'calculated',
					questionText: `بلغت مبيعات البضائع $${formatDzd(rev700)}$ دج، والمنتوجات العملياتية الأخرى $${formatDzd(rev75)}$ دج، وحسم تعجيل الدفع المكتسب $${formatDzd(rev768)}$ دج. احسب مجموع حسابات المنتوجات (صنف 7).`,
					questionTextAr: 'احسب مجموع المنتوجات (بالدج):',
					questionData: { answer: totalRev, displayTemplate: 'مجموع حـ/ 7 = ? دج', variables: [], tolerance: 0.01 },
					explanation: `$${formatDzd(rev700)} + ${formatDzd(rev75)} + ${formatDzd(rev768)} = ${formatDzd(totalRev)}$ دج.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(ibs);
				quizQuestion = {
					type: 'calculated',
					questionText: `حققت ${company} (مؤسسة تجارية تخضع لمعدل $26\\%$) نتيجة قبل الضرائب قدرها $${formatDzd(resBeforeTax)}$ دج. احسب مبلغ الضريبة على الأرباح (حـ/ 695).`,
					questionTextAr: 'احسب ضريبة الأرباح IBS:',
					questionData: { answer: ibs, displayTemplate: 'IBS = ? دج', variables: [], tolerance: 0.5 },
					explanation: `$IBS = ${formatDzd(resBeforeTax)} \\times 0.26 = ${formatDzd(ibs)}$ دج.`
				};
			} else {
				finalAnswer = String(netRes);
				quizQuestion = {
					type: 'calculated',
					questionText: `بلغ مجموع منتوجات مؤسسة تجارية $${formatDzd(totalRev)}$ دج، ومجموع أعبائها قبل الضرائب $${formatDzd(totalExpBeforeTax)}$ دج، وتخضع لمعدل $26\\%$ IBS. ما الرصيد النهائي الدائن لحساب النتيجة (حـ/ 120) بعد إثبات الضريبة والترصيد؟`,
					questionTextAr: 'احسب الرصيد النهائي لحـ/ 120:',
					questionData: { answer: netRes, displayTemplate: 'حـ/ 120 = ? دج', variables: [], tolerance: 0.5 },
					explanation: `النتيجة قبل الضريبة $= ${formatDzd(resBeforeTax)}$ دج؛ بعد طرح $26\\%$ ($${formatDzd(ibs)}$ دج) يبقى رصيد حـ/ 120 دائناً بمبلغ $${formatDzd(netRes)}$ دج.`
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
					'تُثبت الضريبة على الأرباح أولاً (من حـ/ 695 إلى حـ/ 444) قبل ترصيد حسابات الأعباء.',
					'لترصيد حـ/ 7 (دائن بطبيعته) نضعه في المدين؛ ولترصيد حـ/ 6 (مدين بطبيعته) نضعه في الدائن.',
					'الفرق بين رصيد حـ/ 120 في الدائن والمدين يساوي النتيجة الصافية.'
				],
				solutionStepsAr: [
					`مجموع المنتوجات $= ${formatDzd(totalRev)}$ دج؛ الأعباء قبل الضرائب $= ${formatDzd(totalExpBeforeTax)}$ دج.`,
					`النتيجة قبل الضرائب $= ${formatDzd(resBeforeTax)}$ دج؛ الضريبة ($26\\%$) $= ${formatDzd(ibs)}$ دج.`,
					`النتيجة الصافية في حـ/ 120 $= ${formatDzd(netRes)}$ دج.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. وضعية إدماجية شاملة لنهاية السنة 2AS (8 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_2as_acc_t3_full_cycle_integration',
		grade: '2as_acc',
		trimesterId: 't3',
		domain: 'integration',
		titleAr: 'وضعية إدماجية شاملة: المبيعات بـ TVA، الأجور، النتائج الأولية، والميزانية الختامية',
		curriculumLessonId: 'mgt_lesson_2as_acc_t3_comprehensive_integration',
		defaultPoints: 8,
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_T3);
			const goodsHt = rng.int(10, 18) * 100_000;
			const tvaGoods = roundTo(goodsHt * 0.19, 2);
			const cogs = roundTo(goodsHt * 0.6, 2);

			const posteWage = rng.int(40, 60) * 1_000;
			const basket = 4_000;
			const grossWage = posteWage + basket;
			const ssWorker = roundTo(posteWage * 0.09, 2);
			const ssEmployer = roundTo(posteWage * 0.26, 2);
			const totalStaffCost = roundTo(grossWage + ssEmployer, 2);

			const va = goodsHt - cogs;
			const ebe = roundTo(va - totalStaffCost, 2);

			const cap = rng.int(15, 22) * 100_000;
			const assetsEnd = rng.int(22, 30) * 100_000;
			const debtsEnd = rng.int(3, 6) * 100_000;
			const closingResult = assetsEnd - (cap + debtsEnd);

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `وضعية إدماجية ختامية للثلاثي الثالث — ${company}`,
					text: `إليك خلاصة عمليات ${company} (مؤسسة تجارية):\n1) باعت بضاعة بمبلغ ${formatDzd(goodsHt)} دج (HT، TVA 19%) على الحساب، علماً أن تكلفة شرائها المسجلة في المخزن هي ${formatDzd(cogs)} دج.\n2) بلغت أجور شهر ديسمبر لعامل واحد: أجر المنصب ${formatDzd(posteWage)} دج وتعويض السلة ${formatDzd(basket)} دج (ضمان العامل 9%، رب العمل 26%).\n3) عند الجرد الختامي في 31 ديسمبر أظهرت الميزانية: مجموع الأصول ${formatDzd(assetsEnd)} دج، رأس المال ${formatDzd(cap)} دج، ومجموع الديون ${formatDzd(debtsEnd)} دج.`
				}),
				{
					type: 'text',
					content: '1) احسب مبلغ الـ TVA المحصلة على المبيعات، ثم القيمة المضافة (VA) المحققة من عملية البيع.',
					answer: `$"TVA" = ${formatDzd(goodsHt)} times 0.19 = ${formatDzd(tvaGoods)}$ دج (حـ/ 4457). $"VA" = ${formatDzd(goodsHt)} - ${formatDzd(cogs)} = ${formatDzd(va)}$ دج.`,
					mark: '2'
				},
				{
					type: 'text',
					content: '2) احسب كلاً من اشتراك الضمان الاجتماعي للعامل، والأجر الخام (حـ/ 631)، وأعباء رب العمل (حـ/ 635)، وإجمالي أعباء المستخدمين (حـ/ 63):'
				},
				buildManagementTableBlock(
					['العنصر', 'الحساب في SCF', 'المبلغ (دج)'],
					[
						[{ label: 'اشتراك الضمان الاجتماعي للعامل (9%)' }, { label: 'دائن حـ/ 431' }, { label: '........', answer: formatDzd(ssWorker), mark: '1' }],
						[{ label: 'الأجر الإجمالي الخام' }, { label: 'مدين حـ/ 631' }, { label: '........', answer: formatDzd(grossWage), mark: '1' }],
						[{ label: 'اشتراك الضمان الاجتماعي لرب العمل (26%)' }, { label: 'مدين حـ/ 635' }, { label: '........', answer: formatDzd(ssEmployer), mark: '1' }],
						[{ label: 'إجمالي أعباء المستخدمين (631 + 635)', bold: true }, { label: 'حـ/ 63' }, { label: '........', answer: formatDzd(totalStaffCost), mark: '1' }]
					]
				),
				{
					type: 'text',
					content: '3) استنتج إجمالي فائض الاستغلال (EBE) للعملية، ثم احسب النتيجة الصافية المستخرجة من الميزانية الختامية في 31 ديسمبر.',
					answer: `$"EBE" = "VA" - ("حساب 63") = ${formatDzd(va)} - ${formatDzd(totalStaffCost)} = ${formatDzd(ebe)}$ دج. النتيجة الصافية من الميزانية الختامية $= ${formatDzd(assetsEnd)} - (${formatDzd(cap)} + ${formatDzd(debtsEnd)}) = ${formatDzd(closingResult)}$ دج (${closingResult >= 0 ? 'ربح حـ/ 120' : 'خسارة حـ/ 129'}).`,
					mark: '2'
				}
			];

			const sujetExercise: ExerciseBlock = {
				customTitle: 'الوضعية الإدماجية — الثلاثي الثالث',
				points: 8,
				instruction: 'أجب عن الأسئلة المحاسبية المتكاملة بدقة مع إظهار خطوات الحساب:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(va);
				quizQuestion = {
					type: 'calculated',
					questionText: `باعت ${company} بضاعة بمبلغ $${formatDzd(goodsHt)}$ دج (HT) بتكلفة شراء $${formatDzd(cogs)}$ دج. احسب القيمة المضافة المحققة (VA).`,
					questionTextAr: 'احسب القيمة المضافة (بالدج):',
					questionData: { answer: va, displayTemplate: 'VA = ? دج', variables: [], tolerance: 0.01 },
					explanation: `$VA = ${formatDzd(goodsHt)} - ${formatDzd(cogs)} = ${formatDzd(va)}$ دج.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(ebe);
				quizQuestion = {
					type: 'calculated',
					questionText: `بلغت القيمة المضافة لعملية بيع $${formatDzd(va)}$ دج، وبلغ مجموع أعباء المستخدمين (حـ/ 631 + حـ/ 635) $${formatDzd(totalStaffCost)}$ دج (دون ضرائب أخرى). احسب إجمالي فائض الاستغلال (EBE).`,
					questionTextAr: 'احسب إجمالي فائض الاستغلال (EBE):',
					questionData: { answer: ebe, displayTemplate: 'EBE = ? دج', variables: [], tolerance: 0.5 },
					explanation: `$EBE = ${formatDzd(va)} - ${formatDzd(totalStaffCost)} = ${formatDzd(ebe)}$ دج.`
				};
			} else {
				finalAnswer = String(closingResult);
				quizQuestion = {
					type: 'calculated',
					questionText: `في الميزانية الختامية في 31 ديسمبر لـ ${company}، بلغت الأصول $${formatDzd(assetsEnd)}$ دج، ورأس المال $${formatDzd(cap)}$ دج، والديون $${formatDzd(debtsEnd)}$ دج. احسب نتيجة السنة المالية (حـ/ 12).`,
					questionTextAr: 'احسب نتيجة الميزانية الختامية:',
					questionData: { answer: closingResult, displayTemplate: 'النتيجة = ? دج', variables: [], tolerance: 0.01 },
					explanation: `النتيجة $= ${formatDzd(assetsEnd)} - (${formatDzd(cap)} + ${formatDzd(debtsEnd)}) = ${formatDzd(closingResult)}$ دج.`
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
					'تحسب الـ TVA المحصلة على السعر خارج الرسم (HT)، وتُحسب القيمة المضافة بالفرق بين البيع وتكلفة الشراء.',
					'حـ/ 63 يشمل الأجر الخام (حـ/ 631) مضافاً إليه اشتراكات رب العمل (حـ/ 635 = 26% × أجر المنصب).',
					'في الميزانية الختامية: النتيجة = مجموع الأصول − (رأس المال + مجموع الديون).'
				],
				solutionStepsAr: [
					`$\\text{TVA} = ${formatDzd(tvaGoods)}$ دج؛ $VA = ${formatDzd(va)}$ دج.`,
					`الضمان للعامل $= ${formatDzd(ssWorker)}$ دج؛ الأجر الخام $= ${formatDzd(grossWage)}$ دج؛ رب العمل $= ${formatDzd(ssEmployer)}$ دج؛ إجمالي حـ/ 63 $= ${formatDzd(totalStaffCost)}$ دج.`,
					`$EBE = ${formatDzd(ebe)}$ دج؛ النتيجة الختامية $= ${formatDzd(closingResult)}$ دج.`
				],
				finalAnswer
			};
		}
	}
];
