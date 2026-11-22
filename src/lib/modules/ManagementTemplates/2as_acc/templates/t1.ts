import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildAccountingJournalTable,
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
// 2AS GE Accounting & Finance (التسيير المحاسبي والمالي) — T1 Templates (5)
// ═══════════════════════════════════════════════════════════════════════════════

const COMPANIES_2AS = [
	'مؤسسة الأوراس التجارية',
	'مؤسسة متيجة للتجهيز',
	'مؤسسة الصومام للتوزيع',
	'مؤسسة الونشريس الصناعية',
	'مؤسسة تيبازة للمواد'
];

export const TEMPLATES_2AS_ACC_T1: ManagementParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. تحليل التدفقات الاقتصادية (6 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_2as_acc_t1_economic_flows',
		grade: '2as_acc',
		trimesterId: 't1',
		domain: 'acc_basics',
		titleAr: 'تحليل التدفقات الاقتصادية (المصدر والاستخدام)',
		curriculumLessonId: 'mgt_lesson_2as_acc_t1_enterprise_flows',
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_2AS);
			const mult = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
			const m1 = rng.int(12, 28) * 10_000 * mult;
			const m2 = rng.int(15, 32) * 10_000 * mult;
			const m3 = rng.int(4, 12) * 10_000 * mult;
			const m4 = rng.int(8, 18) * 10_000 * mult;

			const docBlock = buildManagementDocumentBlock({
				title: `الوضعية التطبيقية — ${company}`,
				text: `خلال شهر جانفي قامت ${company} بالعمليات الأربع الآتية:\n1) شراء بضاعة من المورد «كريم» بمبلغ ${formatDzd(m1)} دج سُددت بشيك بنكي.\n2) بيع جزء من البضاعة للزبون «النجاح» بمبلغ ${formatDzd(m2)} دج على الحساب.\n3) تحويل مواد أولية من المخزن إلى ورشة الإنتاج بقيمة ${formatDzd(m3)} دج.\n4) دفع مصاريف الإيجار الشهري بمبلغ ${formatDzd(m4)} دج نقداً من الصندوق.`,
				source: 'دفتر المتابعة التجارية — المجال المفاهيمي الأول (SCF)'
			});

			const flowTable = buildManagementTableBlock(
				['رقم العملية', 'نوع التدفق (حقيقي / نقدي / مالي)', 'المصدر (نقطة الانطلاق)', 'الاستخدام (نقطة الوصول)', 'القيمة (دج)'],
				[
					[
						{ label: 'العملية 1 (حقيقي)' },
						{ label: '........', answer: 'تدفق حقيقي خارجي (بضاعة)', mark: '0.5' },
						{ label: '........', answer: 'المورد كريم', mark: '0.5' },
						{ label: '........', answer: `${company} (المخزن)` },
						{ label: formatDzd(m1) }
					],
					[
						{ label: 'العملية 1 (نقدي)' },
						{ label: '........', answer: 'تدفق نقدي خارجي', mark: '0.5' },
						{ label: '........', answer: `${company} (البنك)` },
						{ label: '........', answer: 'المورد كريم', mark: '0.5' },
						{ label: formatDzd(m1) }
					],
					[
						{ label: 'العملية 2 (حقيقي)' },
						{ label: '........', answer: 'تدفق حقيقي خارجي', mark: '0.5' },
						{ label: '........', answer: company },
						{ label: '........', answer: 'الزبون النجاح', mark: '0.5' },
						{ label: formatDzd(m2) }
					],
					[
						{ label: 'العملية 3 (داخلي)' },
						{ label: '........', answer: 'تدفق حقيقي داخلي', mark: '0.5' },
						{ label: '........', answer: 'مخزن المواد الأولية', mark: '0.5' },
						{ label: '........', answer: 'ورشة الإنتاج' },
						{ label: formatDzd(m3) }
					]
				]
			);

			const content: ContentBlock[] = [
				docBlock,
				{
					type: 'text',
					content: '1) عرّف كلاً من التدفق الحقيقي والتدفق النقدي، ثم بيّن الفرق بين التدفق الخارجي والتدفق الداخلي.',
					answer:
						'التدفق الحقيقي هو حركة السلع والمواد والخدمات، بينما التدفق النقدي هو حركة النقود والشيكات والتحويلات. التدفق الخارجي يتم بين المؤسسة وأحد متعامليها (مورد، زبون، بنك)، أما التدفق الداخلي فيتم بين مصالح المؤسسة نفسها دون طرف خارجي.',
					mark: '1'
				},
				{
					type: 'text',
					content: '2) أكمل جدول تحليل التدفقات الاقتصادية الآتي:'
				},
				flowTable,
				{
					type: 'text',
					content: `3) حدد مصدر واستخدام التدفقين في العملية (4) ثم احسب مجموع التدفقات النقدية الصادرة من ${company}.`,
					answer: `التدفق الحقيقي (خدمة الإيجار): المصدر المؤجر والاستخدام المؤسسة. التدفق النقدي: المصدر صندوق المؤسسة والاستخدام المؤجر. مجموع التدفقات النقدية الصادرة $= ${formatDzd(m1)} + ${formatDzd(m4)} = ${formatDzd(m1 + m4)}$ دج.`,
					mark: '1'
				}
			];

			const sujetExercise: ExerciseBlock = {
				points: 6,
				instruction: 'حلل التدفقات الاقتصادية للعمليات التالية وفق منهجية المصدر والاستخدام:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			const totalOut = m1 + m4;
			if (difficulty === 'easy') {
				finalAnswer = 'تدفق حقيقي داخلي';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'تدفق نقدي خارجي', diagnosticFeedback: 'لا توجد حركة نقود ولا طرف خارجي في تحويل المخزن للورشة.' },
						{ text: 'تدفق مالي آجل', diagnosticFeedback: 'لا ينشأ حق أو التزام مع الغير داخل نفس المؤسسة.' },
						{ text: 'تدفق نقدي داخلي', diagnosticFeedback: 'التحويل يخص مواد أولية عينية لا أموالاً نقدية.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما نوع التدفق في العملية: «تحويل مواد أولية بقيمة $${formatDzd(m3)}$ دج من المخزن إلى ورشة الإنتاج»؟`,
					questionTextAr: 'اختر التصنيف الصحيح للتدفق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: 'انتقال المواد من المخزن إلى ورشة التصنيع يتم داخل المؤسسة ويمس سلعاً مادية، فهو تدفق حقيقي داخلي.'
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(totalOut);
				quizQuestion = {
					type: 'calculated',
					questionText: `اشترت ${company} بضاعة بشيك بمبلغ $${formatDzd(m1)}$ دج، ودفعت إيجاراً نقداً بمبلغ $${formatDzd(m4)}$ دج، وباعت على الحساب بمبلغ $${formatDzd(m2)}$ دج. احسب مجموع التدفقات النقدية الخارجة من المؤسسة (بالدينار الجزائري).`,
					questionTextAr: 'احسب مجموع التدفقات النقدية الصادرة:',
					questionData: { answer: totalOut, displayTemplate: 'المجموع = ? دج', variables: [], tolerance: 0.01 },
					explanation: `البيع على الحساب لا يولّد تدفقاً نقدياً فورياً؛ إذن التدفقات النقدية الخارجة $= ${formatDzd(m1)} + ${formatDzd(m4)} = ${formatDzd(totalOut)}$ دج.`
				};
			} else {
				const pairs = rng.shuffle([
					{ left: 'شراء بضاعة بشيك (المصدر النقدي)', right: `${company} (حـ/ 512)` },
					{ left: 'بيع بضاعة على الحساب (الاستخدام الحقيقي)', right: 'الزبون النجاح' },
					{ left: 'تحويل مواد للورشة (المصدر)', right: 'مخزن المواد الأولية' },
					{ left: 'دفع الإيجار نقداً (الاستخدام النقدي)', right: 'المؤجر (صاحب العقار)' }
				]);
				finalAnswer = pairs.map((p) => `${p.left} ↔ ${p.right}`).join(' | ');
				quizQuestion = {
					type: 'matching',
					questionText: 'طابق كل تدفق اقتصادي بالعنصر المناسب له (المصدر أو الاستخدام):',
					questionTextAr: 'اربط كل وصف في اليمين بما يطابقه في اليسار:',
					questionData: { pairs },
					explanation: 'المصدر هو نقطة الانطلاق والاستخدام هو نقطة الوصول لكل تدفق حقيقي أو نقدي.'
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
					'تذكر أن التدفق الحقيقي يمثل السلع والخدمات، والتدفق النقدي يمثل الأموال والشيكات.',
					'البيع أو الشراء على الحساب يولد تدفقاً مالياً (حقاً أو التزاماً) بدل التدفق النقدي الفوري.',
					'المصدر هو الجهة التي يخرج منها التدفق، والاستخدام هو الجهة المستفيدة التي يدخل إليها.'
				],
				solutionStepsAr: [
					`العملية 1: تدفق حقيقي (من المورد للمؤسسة) يقابله تدفق نقدي (من البنك للمورد) بـ $${formatDzd(m1)}$ دج.`,
					`العملية 2: تدفق حقيقي (من المؤسسة للزبون) يقابله تدفق مالي/حق (على الزبون) بـ $${formatDzd(m2)}$ دج.`,
					`العملية 3: تدفق حقيقي داخلي (من المخزن إلى الورشة) بـ $${formatDzd(m3)}$ دج.`,
					`العملية 4: مجموع التدفقات النقدية الصادرة $= ${formatDzd(m1)} + ${formatDzd(m4)} = ${formatDzd(totalOut)}$ دج.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. الذمة المالية والميزانية الافتتاحية (6 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_2as_acc_t1_patrimony_opening_balance',
		grade: '2as_acc',
		trimesterId: 't1',
		domain: 'acc_basics',
		titleAr: 'حساب الذمة المالية وإعداد الميزانية الافتتاحية (SCF)',
		curriculumLessonId: 'mgt_lesson_2as_acc_t1_patrimony_balance_sheet',
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_2AS);
			const lands = rng.int(12, 22) * 100_000;
			const buildings = rng.int(18, 30) * 100_000;
			const transport = rng.int(6, 12) * 100_000;
			const goods = rng.int(3, 8) * 100_000;
			const customers = rng.int(1, 4) * 100_000;
			const bank = rng.int(2, 6) * 100_000;
			const cash = rng.int(5, 15) * 10_000;

			const islamicFinance = rng.int(4, 9) * 100_000;
			const suppliers = rng.int(2, 5) * 100_000;

			const nonCurrentAssets = lands + buildings + transport;
			const currentAssets = goods + customers + bank + cash;
			const totalAssets = nonCurrentAssets + currentAssets;
			const totalDebts = islamicFinance + suppliers;
			const capital = totalAssets - totalDebts;

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `عناصر الذمة المالية لـ ${company} بتاريخ 02 جانفي`,
					text: `قُدّمت لك عناصر الميزانية الافتتاحية الآتية: أراضٍ (حـ/ 211): ${formatDzd(lands)} دج، بناءات (حـ/ 213): ${formatDzd(buildings)} دج، معدات نقل (حـ/ 2182): ${formatDzd(transport)} دج، مخزونات بضائع (حـ/ 30): ${formatDzd(goods)} دج، زبائن (حـ/ 411): ${formatDzd(customers)} دج، بنوك حسابات جارية (حـ/ 512): ${formatDzd(bank)} دج، الصندوق (حـ/ 53): ${formatDzd(cash)} دج، تمويل استثماري إسلامي طويل الأجل (حـ/ 164): ${formatDzd(islamicFinance)} دج، موردو المخزونات (حـ/ 401): ${formatDzd(suppliers)} دج.`
				}),
				{
					type: 'text',
					content: '1) احسب مجموع الأصول (الممتلكات والحقوق) ومجموع الديون، ثم استنتج قيمة رأس المال الصادر (حـ/ 101).',
					answer: `مجموع الأصول $= ${formatDzd(nonCurrentAssets)} + ${formatDzd(currentAssets)} = ${formatDzd(totalAssets)}$ دج. مجموع الديون $= ${formatDzd(islamicFinance)} + ${formatDzd(suppliers)} = ${formatDzd(totalDebts)}$ دج. رأس المال $= ${formatDzd(totalAssets)} - ${formatDzd(totalDebts)} = ${formatDzd(capital)}$ دج.`,
					mark: '2'
				},
				{
					type: 'text',
					content: '2) أكمل الميزانية الافتتاحية المصنفة وفق (SCF) بتاريخ 02 جانفي:'
				},
				buildManagementTableBlock(
					['الأصول', 'المبلغ (دج)', 'الخصوم', 'المبلغ (دج)'],
					[
						[
							{ label: 'الأصول غير الجارية (211، 213، 2182)', bold: true },
							{ label: '........', answer: formatDzd(nonCurrentAssets), mark: '1' },
							{ label: 'رؤوس الأموال الخاصة: رأس المال (101)', bold: true },
							{ label: '........', answer: formatDzd(capital), mark: '1' }
						],
						[
							{ label: 'المخزونات والحقوق (30، 411)' },
							{ label: formatDzd(goods + customers) },
							{ label: 'الخصوم غير الجارية: تمويل إسلامي (164)' },
							{ label: '........', answer: formatDzd(islamicFinance), mark: '0.5' }
						],
						[
							{ label: 'الخزينة (512 + 53)' },
							{ label: '........', answer: formatDzd(bank + cash), mark: '0.5' },
							{ label: 'الخصوم الجارية: الموردون (401)' },
							{ label: formatDzd(suppliers) }
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
				instruction: 'أجب عن الأسئلة المحاسبية الآتية بدقة مع توضيح الحسابات:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(nonCurrentAssets);
				quizQuestion = {
					type: 'calculated',
					questionText: `تملك ${company} أراضٍ بمبلغ $${formatDzd(lands)}$ دج، بناءات بمبلغ $${formatDzd(buildings)}$ دج، ومعدات نقل بمبلغ $${formatDzd(transport)}$ دج، وبضائع بمبلغ $${formatDzd(goods)}$ دج. احسب مجموع الأصول غير الجارية (بالدج).`,
					questionTextAr: 'احسب مجموع الأصول غير الجارية:',
					questionData: { answer: nonCurrentAssets, displayTemplate: 'الأصول غير الجارية = ? دج', variables: [], tolerance: 0.01 },
					explanation: `الأصول غير الجارية تشمل التثبيتات فقط: $${formatDzd(lands)} + ${formatDzd(buildings)} + ${formatDzd(transport)} = ${formatDzd(nonCurrentAssets)}$ دج (البضائع أصول جارية).`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(capital);
				quizQuestion = {
					type: 'calculated',
					questionText: `بلغ مجموع أصول ${company} مبلغ $${formatDzd(totalAssets)}$ دج، وتتمثل ديونها في تمويل استثماري إسلامي بمبلغ $${formatDzd(islamicFinance)}$ دج وموردين بمبلغ $${formatDzd(suppliers)}$ دج. احسب رأس المال الصادر (حـ/ 101).`,
					questionTextAr: 'احسب قيمة رأس المال الصادر:',
					questionData: { answer: capital, displayTemplate: 'رأس المال = ? دج', variables: [], tolerance: 0.01 },
					explanation: `رأس المال $= \\text{مجموع الأصول} - \\text{مجموع الديون} = ${formatDzd(totalAssets)} - (${formatDzd(islamicFinance)} + ${formatDzd(suppliers)}) = ${formatDzd(capital)}$ دج.`
				};
			} else {
				const items = rng.shuffle([
					{ text: 'معدات نقل (2182)', category: 0 },
					{ text: 'بناءات (213)', category: 0 },
					{ text: 'مخزون بضائع (30)', category: 1 },
					{ text: 'زبائن (411)', category: 1 },
					{ text: 'تمويل استثماري إسلامي طويل الأجل (164)', category: 2 },
					{ text: 'موردو المخزونات (401)', category: 3 }
				]);
				const categories = ['أصول غير جارية', 'أصول جارية', 'خصوم غير جارية', 'خصوم جارية'];
				finalAnswer = items.map((it) => `${it.text} ← ${categories[it.category]}`).join(' | ');
				quizQuestion = {
					type: 'drag_drop',
					questionText: 'صنف عناصر الذمة المالية الآتية حسب كتل الميزانية في النظام المحاسبي المالي (SCF):',
					questionTextAr: 'اسحب كل عنصر إلى كتلته المناسبة في الميزانية:',
					questionData: { categories, items },
					explanation: 'التثبيتات في الأصول غير الجارية، المخزون والزبائن في الأصول الجارية، التمويل الطويل في الخصوم غير الجارية، والموردون في الخصوم الجارية.'
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
					'تُرتب الأصول إلى أصول غير جارية (صنف 2) وأصول جارية (أصناف 3، 41، 5).',
					'رأس المال الصادر = مجموع الأصول − (الخصوم غير الجارية + الخصوم الجارية).',
					'تحقق دائماً في نهاية الجدول من تساوي المجموع العام للأصول مع المجموع العام للخصوم.'
				],
				solutionStepsAr: [
					`الأصول غير الجارية $= ${formatDzd(lands)} + ${formatDzd(buildings)} + ${formatDzd(transport)} = ${formatDzd(nonCurrentAssets)}$ دج.`,
					`الأصول الجارية $= ${formatDzd(goods)} + ${formatDzd(customers)} + ${formatDzd(bank)} + ${formatDzd(cash)} = ${formatDzd(currentAssets)}$ دج، والمجموع العام للأصول $= ${formatDzd(totalAssets)}$ دج.`,
					`مجموع الديون $= ${formatDzd(islamicFinance)} + ${formatDzd(suppliers)} = ${formatDzd(totalDebts)}$ دج.`,
					`رأس المال الصادر $= ${formatDzd(totalAssets)} - ${formatDzd(totalDebts)} = ${formatDzd(capital)}$ دج.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. مبدأ القيد المزدوج والتسجيل في الحسابات T والترصيد (6 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_2as_acc_t1_t_accounts_balances',
		grade: '2as_acc',
		trimesterId: 't1',
		domain: 'acc_basics',
		titleAr: 'القيد المزدوج، التسجيل في الحسابات (T) والترصيد',
		curriculumLessonId: 'mgt_lesson_2as_acc_t1_double_entry_trial_balance',
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_2AS);
			const bankInit = rng.int(40, 80) * 10_000;
			const cashInit = rng.int(8, 18) * 10_000;
			const op1 = rng.int(6, 12) * 10_000; // سحب من البنك للصندوق
			const op2 = rng.int(10, 20) * 10_000; // تسديد للمورد بشيك
			const op3 = rng.int(12, 24) * 10_000; // تحصيل من الزبون بشيك
			const op4 = rng.int(3, 7) * 10_000; // دفع مصاريف صيانة نقداً

			const bankDebitTotal = bankInit + op3;
			const bankCreditTotal = op1 + op2;
			const bankBalance = bankDebitTotal - bankCreditTotal;

			const cashDebitTotal = cashInit + op1;
			const cashCreditTotal = op4;
			const cashBalance = cashDebitTotal - cashCreditTotal;

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `حركة حسابات الخزينة لدى ${company} (شهر فيفري)`,
					text: `بتاريخ 01 فيفري كان رصيد حساب البنك (حـ/ 512) مديناً بمبلغ ${formatDzd(bankInit)} دج، ورصيد الصندوق (حـ/ 53) مديناً بمبلغ ${formatDzd(cashInit)} دج. وخلال الشهر تمت العمليات الآتية:\n• 04 فيفري: تمويل الصندوق بسحب مبلغ ${formatDzd(op1)} دج من البنك.\n• 10 فيفري: تسديد دين للمورد بمبلغ ${formatDzd(op2)} دج بشيك بنكي.\n• 18 فيفري: تحصيل حق من الزبون بمبلغ ${formatDzd(op3)} دج بتحويل بنكي.\n• 25 فيفري: دفع مصاريف صيانة بمبلغ ${formatDzd(op4)} دج نقداً.`
				}),
				{
					type: 'text',
					content: '1) حدد قاعدة تسيير حسابات الأصول وحسابات الخصوم، وبيّن سبب طبيعة الرصيد العادي للبنك والصندوق.',
					answer:
						'حسابات الأصول (مثل 512 و53) تزيد في الجانب المدين وتنقص في الجانب الدائن ويكون رصيدها طبيعياً مديناً (أو مرصداً)؛ أما حسابات الخصوم (مثل 401) فتزيد في الدائن وتنقص في المدين.',
					mark: '1'
				},
				{
					type: 'text',
					content: '2) أكمل جدول حركة وترصيد حسابي البنك (حـ/ 512) والصندوق (حـ/ 53):'
				},
				buildManagementTableBlock(
					['الحساب', 'مجموع المدين (دج)', 'مجموع الدائن (دج)', 'قيمة الرصيد (دج)', 'طبيعة الرصيد'],
					[
						[
							{ label: 'حـ/ 512 البنوك الحسابات الجارية', bold: true },
							{ label: '........', answer: formatDzd(bankDebitTotal), mark: '0.75' },
							{ label: '........', answer: formatDzd(bankCreditTotal), mark: '0.75' },
							{ label: '........', answer: formatDzd(bankBalance), mark: '0.75' },
							{ label: '........', answer: 'رصيد مدين', mark: '0.25' }
						],
						[
							{ label: 'حـ/ 53 الصندوق', bold: true },
							{ label: '........', answer: formatDzd(cashDebitTotal), mark: '0.75' },
							{ label: '........', answer: formatDzd(cashCreditTotal), mark: '0.75' },
							{ label: '........', answer: formatDzd(cashBalance), mark: '0.75' },
							{ label: '........', answer: 'رصيد مدين', mark: '0.25' }
						]
					]
				)
			];

			const sujetExercise: ExerciseBlock = {
				points: 6,
				instruction: 'أنجز العمليات الحسابية والترصيد وفق مبدأ القيد المزدوج:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(cashBalance);
				quizQuestion = {
					type: 'calculated',
					questionText: `بلغ رصيد الصندوق الافتتاحي $${formatDzd(cashInit)}$ دج، ومُول من البنك بمبلغ $${formatDzd(op1)}$ دج، ودُفعت منه مصاريف صيانة بمبلغ $${formatDzd(op4)}$ دج. احسب رصيد الصندوق النهائي (بالدج).`,
					questionTextAr: 'احسب رصيد الصندوق النهائي:',
					questionData: { answer: cashBalance, displayTemplate: 'رصيد حـ/ 53 = ? دج', variables: [], tolerance: 0.01 },
					explanation: `الرصيد النهائي للصندوق $= (${formatDzd(cashInit)} + ${formatDzd(op1)}) - ${formatDzd(op4)} = ${formatDzd(cashBalance)}$ دج (مدين).`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(bankBalance);
				quizQuestion = {
					type: 'calculated',
					questionText: `بدأ حساب البنك برصيد مدين $${formatDzd(bankInit)}$ دج، وسُحب منه للصندوق $${formatDzd(op1)}$ دج، وسُدد للمورد $${formatDzd(op2)}$ دج بشيك، وتُحصّل من الزبون $${formatDzd(op3)}$ دج بتحويل بنكي. احسب رصيد البنك في نهاية الشهر.`,
					questionTextAr: 'احسب رصيد حـ/ 512 النهائي:',
					questionData: { answer: bankBalance, displayTemplate: 'رصيد حـ/ 512 = ? دج', variables: [], tolerance: 0.01 },
					explanation: `مجموع المدين $= ${formatDzd(bankInit)} + ${formatDzd(op3)} = ${formatDzd(bankDebitTotal)}$ دج؛ مجموع الدائن $= ${formatDzd(op1)} + ${formatDzd(op2)} = ${formatDzd(bankCreditTotal)}$ دج؛ الرصيد $= ${formatDzd(bankBalance)}$ دج.`
				};
			} else {
				finalAnswer = 'صحيح';
				quizQuestion = {
					type: 'true_false',
					questionText:
						'عند تسديد دين المورد (حـ/ 401) بشيك بنكي (حـ/ 512)، يُسجل المبلغ في الجانب المدين لحساب الموردين وفي الجانب الدائن لحساب البنك، وتنخفض بذلك قيمة كل من الأصول والخصوم بنفس المقدار.',
					questionTextAr: 'حدد صحة العبارة المحاسبية الآتية:',
					questionData: { correctAnswer: true },
					explanation: 'صحيح: الموردون (خصم) ينقصون في المدين، والبنك (أصل) ينقص في الدائن.'
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
					'حـ/ 512 وحـ/ 53 حسابا أصول: يزيدان في المدين بالمقبوضات وينقصان في الدائن بالمدفوعات.',
					'عملية سحب المال من البنك لإيداعه في الصندوق تنقص البنك (دائن) وتزيد الصندوق (مدين).',
					'الرصيد = مجموع المدين − مجموع الدائن عند تفوق المدين (رصيد مدين).'
				],
				solutionStepsAr: [
					`حـ/ 512 البنك: مجموع المدين $= ${formatDzd(bankInit)} + ${formatDzd(op3)} = ${formatDzd(bankDebitTotal)}$ دج.`,
					`حـ/ 512 البنك: مجموع الدائن $= ${formatDzd(op1)} + ${formatDzd(op2)} = ${formatDzd(bankCreditTotal)}$ دج، فالرصيد المدين $= ${formatDzd(bankBalance)}$ دج.`,
					`حـ/ 53 الصندوق: مجموع المدين $= ${formatDzd(cashInit)} + ${formatDzd(op1)} = ${formatDzd(cashDebitTotal)}$ دج، ومجموع الدائن $= ${formatDzd(cashCreditTotal)}$ دج.`,
					`الرصيد المدين للصندوق $= ${formatDzd(cashBalance)}$ دج.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. التسجيل في دفتر اليومية والترحيل إلى الدفتر الكبير وميزان المراجعة (8 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_2as_acc_t1_journal_to_trial_balance',
		grade: '2as_acc',
		trimesterId: 't1',
		domain: 'acc_basics',
		titleAr: 'التسجيل في دفتر اليومية وميزان المراجعة',
		curriculumLessonId: 'mgt_lesson_2as_acc_t1_journal_ledger',
		defaultPoints: 8,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_2AS);
			const cap = rng.int(15, 25) * 100_000;
			const bankInit = rng.int(8, 12) * 100_000;
			const equipInit = cap - bankInit;
			const amt1 = rng.int(12, 20) * 10_000; // شراء بضاعة على الحساب (مباشر للتبسيط التمهيدي T1: 30 إلى 401 أو 380 إلى 401)
			const amt2 = rng.int(5, 10) * 10_000; // سحب من البنك للصندوق
			const amt3 = rng.int(6, 11) * 10_000; // تسديد جزء من دين المورد بشيك
			const amt4 = rng.int(15, 25) * 10_000; // شراء معدات مكتب بشيك

			// Note: In T1 before T2 inventory perpetual lesson, SCF introduces simple journal entries; let's use 380->401 & 30->380 or clean asset/treasury entries:
			// Let's use clean T1 operations:
			// Op 1 (05/03): شراء تجهيزات مكتب بشيك (2183 -> 512)
			// Op 2 (12/03): سحب من البنك للصندوق (53 -> 512)
			// Op 3 (18/03): دفع إيجار المستودع نقداً (613 -> 53)
			// Op 4 (25/03): تحصيل دين من زبون بشيك (512 -> 411)
			const customersInit = rng.int(2, 4) * 100_000;
			const totalBankInit = bankInit;
			const totalEquipInit = cap - totalBankInit - customersInit;

			const bankDebitMoves = totalBankInit + amt4;
			const bankCreditMoves = amt1 + amt2;
			const bankBal = bankDebitMoves - bankCreditMoves;

			const cashDebitMoves = amt2;
			const cashCreditMoves = amt3;
			const cashBal = cashDebitMoves - cashCreditMoves;

			const custDebitMoves = customersInit;
			const custCreditMoves = amt4;
			const custBal = custDebitMoves - custCreditMoves;

			const totalMovements = cap + amt1 + amt2 + amt3 + amt4;
			const totalDebitBalances = totalEquipInit + amt1 + custBal + bankBal + cashBal + amt3;

			const journalTable = buildAccountingJournalTable([
				{
					dateLabel: '05/03',
					debitCode: '2183',
					creditCode: '512',
					debitName: 'معدات مكتب وإعلام آلي',
					creditName: 'البنوك الحسابات الجارية',
					amountStr: formatDzd(amt1),
					narrative: 'شراء حواسيب بشيك',
					isSolutionTarget: true,
					mark: '1'
				},
				{
					dateLabel: '12/03',
					debitCode: '53',
					creditCode: '512',
					debitName: 'الصندوق',
					creditName: 'البنوك الحسابات الجارية',
					amountStr: formatDzd(amt2),
					narrative: 'تمويل الصندوق من البنك',
					isSolutionTarget: true,
					mark: '1'
				},
				{
					dateLabel: '18/03',
					debitCode: '613',
					creditCode: '53',
					debitName: 'الإيجارات',
					creditName: 'الصندوق',
					amountStr: formatDzd(amt3),
					narrative: 'دفع إيجار المستودع نقداً',
					isSolutionTarget: true,
					mark: '1'
				},
				{
					dateLabel: '25/03',
					debitCode: '512',
					creditCode: '411',
					debitName: 'البنوك الحسابات الجارية',
					creditName: 'الزبائن',
					amountStr: formatDzd(amt4),
					narrative: 'تحصيل حق من الزبون بشيك',
					isSolutionTarget: true,
					mark: '1'
				}
			]);

			const trialBalance = buildManagementTableBlock(
				['رقم واسم الحساب', 'مجموع المدين', 'مجموع الدائن', 'رصيد مدين', 'رصيد دائن'],
				[
					[
						{ label: '101 رأس المال' },
						{ label: '0' },
						{ label: formatDzd(cap) },
						{ label: '0' },
						{ label: formatDzd(cap) }
					],
					[
						{ label: '2183 معدات مكتب وإعلام آلي' },
						{ label: formatDzd(totalEquipInit + amt1) },
						{ label: '0' },
						{ label: '........', answer: formatDzd(totalEquipInit + amt1), mark: '0.5' },
						{ label: '0' }
					],
					[
						{ label: '411 الزبائن' },
						{ label: formatDzd(custDebitMoves) },
						{ label: formatDzd(custCreditMoves) },
						{ label: '........', answer: formatDzd(custBal), mark: '0.5' },
						{ label: '0' }
					],
					[
						{ label: '512 البنوك الحسابات الجارية' },
						{ label: formatDzd(bankDebitMoves) },
						{ label: formatDzd(bankCreditMoves) },
						{ label: '........', answer: formatDzd(bankBal), mark: '1' },
						{ label: '0' }
					],
					[
						{ label: '53 الصندوق' },
						{ label: formatDzd(cashDebitMoves) },
						{ label: formatDzd(cashCreditMoves) },
						{ label: '........', answer: formatDzd(cashBal), mark: '0.5' },
						{ label: '0' }
					],
					[
						{ label: '613 الإيجارات' },
						{ label: formatDzd(amt3) },
						{ label: '0' },
						{ label: formatDzd(amt3) },
						{ label: '0' }
					],
					[
						{ label: 'المجاميع العامة', bold: true },
						{ label: '........', answer: formatDzd(totalMovements), mark: '0.75' },
						{ label: formatDzd(totalMovements) },
						{ label: '........', answer: formatDzd(totalDebitBalances), mark: '0.75' },
						{ label: formatDzd(cap) }
					]
				]
			);

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `بيانات الدورة الشهرية لـ ${company} (شهر مارس)`,
					text: `بتاريخ 01 مارس افتتحت ${company} حساباتها بالأرصدة الآتية: معدات مكتب (حـ/ 2183): ${formatDzd(totalEquipInit)} دج، زبائن (حـ/ 411): ${formatDzd(customersInit)} دج، بنك (حـ/ 512): ${formatDzd(totalBankInit)} دج، مقابل رأس مال (حـ/ 101): ${formatDzd(cap)} دج.\nوخلال شهر مارس قامت بالعمليات الآتية:\n• 05/03: شراء حواسيب للمكتب بمبلغ ${formatDzd(amt1)} دج بشيك بنكي.\n• 12/03: سحب مبلغ ${formatDzd(amt2)} دج من البنك لتمويل الصندوق.\n• 18/03: دفع إيجار المستودع بمبلغ ${formatDzd(amt3)} دج نقداً.\n• 25/03: تحصيل مبلغ ${formatDzd(amt4)} دج من الزبون بشيك.`
				}),
				{
					type: 'text',
					content: '1) سجل العمليات الأربع في دفتر اليومية (دون إعادة القيد الافتتاحي):'
				},
				journalTable,
				{
					type: 'text',
					content: '2) أكمل ميزان المراجعة بتاريخ 31 مارس بعد الترحيل والترصيد:'
				},
				trialBalance
			];

			const sujetExercise: ExerciseBlock = {
				points: 8,
				instruction: 'أنجز التسجيل في دفتر اليومية وأكمل ميزان المراجعة:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = 'من حـ/ 613 الإيجارات إلى حـ/ 53 الصندوق';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'من حـ/ 53 الصندوق إلى حـ/ 613 الإيجارات', diagnosticFeedback: 'حساب الأعباء (613) يزيد في المدين لا في الدائن.' },
						{ text: 'من حـ/ 613 الإيجارات إلى حـ/ 512 البنك', diagnosticFeedback: 'العملية سُددت نقداً من الصندوق لا بشيك بنكي.' },
						{ text: 'من حـ/ 213 البناءات إلى حـ/ 53 الصندوق', diagnosticFeedback: 'الكراء عبء خدمة خارجية (613) وليس شراء بناء.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما القيد المحاسبي الصحيح لدفع إيجار المستودع بمبلغ $${formatDzd(amt3)}$ دج نقداً في 18 مارس؟`,
					questionTextAr: 'اختر قيد اليومية الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: 'الإيجارات عبء (حـ/ 613 مديناً) والصندوق ينقص بالدفع (حـ/ 53 دائناً).'
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(bankBal);
				quizQuestion = {
					type: 'calculated',
					questionText: `انطلاقاً من رصيد بنكي ابتدائي قدره $${formatDzd(totalBankInit)}$ دج، بعد شراء حواسيب بشيك ($${formatDzd(amt1)}$ دج)، وسحب للصندوق ($${formatDzd(amt2)}$ دج)، وتحصيل من الزبون بشيك ($${formatDzd(amt4)}$ دج)، كم يبلغ الرصيد المدين لحساب البنك (حـ/ 512) في ميزان المراجعة؟`,
					questionTextAr: 'احسب رصيد حـ/ 512 في ميزان المراجعة:',
					questionData: { answer: bankBal, displayTemplate: 'الرصيد = ? دج', variables: [], tolerance: 0.01 },
					explanation: `$${formatDzd(totalBankInit)} + ${formatDzd(amt4)} - ${formatDzd(amt1)} - ${formatDzd(amt2)} = ${formatDzd(bankBal)}$ دج.`
				};
			} else {
				const orderedItems = [
					'جمع وتحليل الوثائق التبريرية (فواتير وشيكات)',
					'التسجيل الزمني للعمليات في دفتر اليومية',
					'الترحيل إلى الحسابات المفتوحة في الدفتر الكبير',
					'ترصيد الحسابات وإعداد ميزان المراجعة للتحقق من التوازن'
				];
				const shuffled = rng.shuffle(orderedItems);
				if (shuffled.every((x, i) => x === orderedItems[i])) {
					[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
				}
				const correctOrder = orderedItems.map((it) => shuffled.indexOf(it));
				finalAnswer = orderedItems.join(' ← ');
				quizQuestion = {
					type: 'ordering',
					questionText: 'رتب خطوات التنظيم المحاسبي للدورة الشهرية ترتيباً منهجياً صحيحاً:',
					questionTextAr: 'رتب المراحل من البداية إلى النهاية:',
					questionData: { items: shuffled, correctOrder },
					explanation: 'تبدأ الدورة بالوثائق التبريرية ثم دفتر اليومية ثم الدفتر الكبير ثم ميزان المراجعة.'
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
					'القيد المزدوج يضع دائماً الحساب المدين أولاً والحساب الدائن ثانياً بنفس القيمة.',
					'انتبه لإضافة الأرصدة الافتتاحية في أول الشهر عند حساب مجاميع وأرصدة ميزان المراجعة.',
					'تأكد أن مجموع عمود الأرصدة المدينة يساوي مجموع عمود الأرصدة الدائنة.'
				],
				solutionStepsAr: [
					`قيد 05/03: من حـ/ 2183 إلى حـ/ 512 بمبلغ $${formatDzd(amt1)}$ دج.`,
					`قيد 12/03: من حـ/ 53 إلى حـ/ 512 بمبلغ $${formatDzd(amt2)}$ دج.`,
					`قيد 18/03: من حـ/ 613 إلى حـ/ 53 بمبلغ $${formatDzd(amt3)}$ دج، وقيد 25/03: من حـ/ 512 إلى حـ/ 411 بمبلغ $${formatDzd(amt4)}$ دج.`,
					`في ميزان المراجعة: رصيد حـ/ 512 = $${formatDzd(bankBal)}$ دج، رصيد حـ/ 53 = $${formatDzd(cashBal)}$ دج، ومجموع المجاميع = $${formatDzd(totalMovements)}$ دج.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. وضعية إدماجية للثلاثي الأول (8 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_2as_acc_t1_integration_cycle',
		grade: '2as_acc',
		trimesterId: 't1',
		domain: 'integration',
		titleAr: 'وضعية إدماجية: من الميزانية الافتتاحية إلى اليومية وميزان المراجعة',
		curriculumLessonId: 'mgt_lesson_2as_acc_t1_journal_ledger',
		defaultPoints: 8,
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_2AS);
			const buildVal = rng.int(20, 30) * 100_000;
			const goodsVal = rng.int(4, 7) * 100_000;
			const bankVal = rng.int(6, 10) * 100_000;
			const cashVal = rng.int(1, 3) * 100_000;
			const suppVal = rng.int(2, 4) * 100_000;
			const totalAssetsInit = buildVal + goodsVal + bankVal + cashVal;
			const capitalInit = totalAssetsInit - suppVal;

			const paySupp = rng.int(8, 15) * 10_000; // تسديد للمورد بشيك
			const buySoft = rng.int(4, 9) * 10_000; // شراء برمجية محاسبية بشيك
			const payIns = rng.int(2, 5) * 10_000; // دفع تأمين نقداً

			const bankAfter = bankVal - paySupp - buySoft;
			const cashAfter = cashVal - payIns;
			const suppAfter = suppVal - paySupp;
			const totalMoves = totalAssetsInit + paySupp + buySoft + payIns;

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `وضعية إدماجية شاملة — ${company}`,
					text: `بتاريخ 02 جانفي تأسست ${company} بالعناصر الآتية: بناءات (213): ${formatDzd(buildVal)} دج، مخزون بضائع (30): ${formatDzd(goodsVal)} دج، بنك (512): ${formatDzd(bankVal)} دج، صندوق (53): ${formatDzd(cashVal)} دج، وموردو المخزونات (401): ${formatDzd(suppVal)} دج.\nخلال الأسبوع الأول قامت المؤسسة بالعمليات الآتية:\n1) في 04 جانفي: تسديد مبلغ ${formatDzd(paySupp)} دج للموردين بشيك بنكي.\n2) في 06 جانفي: اقتناء برمجية تسيير (حـ/ 204) بمبلغ ${formatDzd(buySoft)} دج بشيك بنكي.\n3) في 08 جانفي: دفع قسط تأمين سنوي (حـ/ 616) بمبلغ ${formatDzd(payIns)} دج نقداً.`
				}),
				{
					type: 'text',
					content: '1) احسب رأس المال الصادر (حـ/ 101) وأعدّ القيد الافتتاحي في 02 جانفي.',
					answer: `رأس المال $= ${formatDzd(totalAssetsInit)} - ${formatDzd(suppVal)} = ${formatDzd(capitalInit)}$ دج. القيد الافتتاحي: مدين حـ/ 213 (${formatDzd(buildVal)})، حـ/ 30 (${formatDzd(goodsVal)})، حـ/ 512 (${formatDzd(bankVal)})، حـ/ 53 (${formatDzd(cashVal)}) / دائن حـ/ 101 (${formatDzd(capitalInit)}) وحـ/ 401 (${formatDzd(suppVal)}).`,
					mark: '2'
				},
				{
					type: 'text',
					content: '2) سجل العمليات الثلاث (04، 06، 08 جانفي) في دفتر اليومية:'
				},
				buildAccountingJournalTable([
					{
						dateLabel: '04/01',
						debitCode: '401',
						creditCode: '512',
						debitName: 'موردو المخزونات والخدمات',
						creditName: 'البنوك الحسابات الجارية',
						amountStr: formatDzd(paySupp),
						narrative: 'تسديد جزء من دين المورد بشيك',
						isSolutionTarget: true,
						mark: '1'
					},
					{
						dateLabel: '06/01',
						debitCode: '204',
						creditCode: '512',
						debitName: 'برمجيات المعلوماتية',
						creditName: 'البنوك الحسابات الجارية',
						amountStr: formatDzd(buySoft),
						narrative: 'حيازة برمجية تسيير بشيك',
						isSolutionTarget: true,
						mark: '1'
					},
					{
						dateLabel: '08/01',
						debitCode: '616',
						creditCode: '53',
						debitName: 'أقساط التأمينات',
						creditName: 'الصندوق',
						amountStr: formatDzd(payIns),
						narrative: 'دفع تأمين نقداً',
						isSolutionTarget: true,
						mark: '1'
					}
				]),
				{
					type: 'text',
					content: '3) استخرج الأرصدة النهائية المطلوبة في ميزان المراجعة بتاريخ 10 جانفي:'
				},
				buildManagementTableBlock(
					['الحساب', 'طبيعة الرصيد', 'قيمة الرصيد النهائي (دج)'],
					[
						[
							{ label: 'حـ/ 512 البنوك الحسابات الجارية' },
							{ label: 'مدين' },
							{ label: '........', answer: formatDzd(bankAfter), mark: '1' }
						],
						[
							{ label: 'حـ/ 53 الصندوق' },
							{ label: 'مدين' },
							{ label: '........', answer: formatDzd(cashAfter), mark: '1' }
						],
						[
							{ label: 'حـ/ 401 موردو المخزونات والخدمات' },
							{ label: 'دائن' },
							{ label: '........', answer: formatDzd(suppAfter), mark: '1' }
						]
					]
				)
			];

			const sujetExercise: ExerciseBlock = {
				customTitle: 'الوضعية الإدماجية — الثلاثي الأول',
				points: 8,
				instruction: 'عالج الملف المحاسبي المتكامل وفق الخطوات التالية:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(capitalInit);
				quizQuestion = {
					type: 'calculated',
					questionText: `بلغ مجموع أصول ${company} عند التأسيس $${formatDzd(totalAssetsInit)}$ دج، وديونها تجاه الموردين $${formatDzd(suppVal)}$ دج. ما قيمة رأس المال الصادر (حـ/ 101)؟`,
					questionTextAr: 'احسب رأس المال الصادر:',
					questionData: { answer: capitalInit, displayTemplate: 'حـ/ 101 = ? دج', variables: [], tolerance: 0.01 },
					explanation: `رأس المال $= ${formatDzd(totalAssetsInit)} - ${formatDzd(suppVal)} = ${formatDzd(capitalInit)}$ دج.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(bankAfter);
				quizQuestion = {
					type: 'calculated',
					questionText: `انطلاقاً من رصيد بنكي ابتدائي $${formatDzd(bankVal)}$ دج، سددت المؤسسة للموردين $${formatDzd(paySupp)}$ دج بشيك، واشترت برمجية بمبلغ $${formatDzd(buySoft)}$ دج بشيك. احسب الرصيد النهائي للبنك (بالدج).`,
					questionTextAr: 'احسب الرصيد النهائي للبنك:',
					questionData: { answer: bankAfter, displayTemplate: 'رصيد حـ/ 512 = ? دج', variables: [], tolerance: 0.01 },
					explanation: `رصيد البنك $= ${formatDzd(bankVal)} - ${formatDzd(paySupp)} - ${formatDzd(buySoft)} = ${formatDzd(bankAfter)}$ دج.`
				};
			} else {
				const options = rng.shuffle(['204', '213', '401', '616']);
				const correctIndex = options.indexOf('204');
				finalAnswer = '204';
				quizQuestion = {
					type: 'cloze',
					questionText: 'أكمل العبارة برقم الحساب المناسب في (SCF):',
					questionTextAr: 'اختر رقم الحساب الصحيح:',
					questionData: {
						sentence: 'عند اقتناء المؤسسة لبرمجية محاسبية تُستعمل لعدة سنوات، تُسجل في الجانب المدين لحساب ___ ضمن التثبيتات المعنوية.',
						options,
						correctIndex
					},
					explanation: 'برمجيات المعلوماتية وما شابهها تُسجل في حـ/ 204 ضمن التثبيتات المعنوية.'
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
					'احسب أولاً مجموع الأصول ثم اطرح الموردين لإيجاد رأس المال (حـ/ 101).',
					'تُسجل البرمجية في حـ/ 204 (تثبيت معنوي) والتأمين في حـ/ 616 (عبء).',
					`تحقق أن مجموع حركات ميزان المراجعة يساوي $${formatDzd(totalMoves)}$ دج.`
				],
				solutionStepsAr: [
					`مجموع الأصول الافتتاحية $= ${formatDzd(totalAssetsInit)}$ دج؛ رأس المال $= ${formatDzd(capitalInit)}$ دج.`,
					`04/01: مدين 401 / دائن 512 ($${formatDzd(paySupp)}$)؛ 06/01: مدين 204 / دائن 512 ($${formatDzd(buySoft)}$)؛ 08/01: مدين 616 / دائن 53 ($${formatDzd(payIns)}$).`,
					`رصيد حـ/ 512 $= ${formatDzd(bankAfter)}$ دج؛ رصيد حـ/ 53 $= ${formatDzd(cashAfter)}$ دج؛ رصيد حـ/ 401 $= ${formatDzd(suppAfter)}$ دج.`
				],
				finalAnswer
			};
		}
	}
];
