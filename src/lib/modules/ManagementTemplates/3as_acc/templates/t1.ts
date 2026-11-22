import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
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
// 3AS GE BAC Accounting & Finance (التسيير المحاسبي والمالي) — T1 Templates (5)
// ═══════════════════════════════════════════════════════════════════════════════

const COMPANIES_3AS_T1 = [
	'مؤسسة الأوراس الصناعية',
	'مؤسسة متيجة للإنتاج',
	'مؤسسة الصومام للتجهيز',
	'مؤسسة الونشريس التجارية',
	'مؤسسة الهضاب للميكانيك'
];

export const TEMPLATES_3AS_ACC_T1: ManagementParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. الاهتلاكات (الخطي، المتناقص، المتزايد وجدول الاهتلاك) (6 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_3as_acc_t1_depreciation_schedules',
		grade: '3as_acc',
		trimesterId: 't1',
		domain: 'acc_year_end',
		titleAr: 'الاهتلاكات: الخطي، المتناقص، المتزايد وجدول الاهتلاك',
		curriculumLessonId: 'mgt_lesson_3as_acc_t1_depreciation_methods',
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_3AS_T1);
			// Choose clean base values
			const v0 = rng.int(4, 9) * 300_000; // divisible by 3, 4, 5, 10, 12, 15
			const nYears = difficulty === 'hard' ? 4 : 5;
			const linearRate = 100 / nYears; // 20% for 5y, 25% for 4y

			let methodLabel: string;
			let rows: Array<{ year: number; base: number; ann: number; acc: number; vnc: number }>;
			let qYearLabel: string;

			if (difficulty === 'easy') {
				// الاهتلاك الخطي مع تناسب زمني (01/04/2023 -> 9 أشهر)
				methodLabel = 'الاهتلاك الخطي (الثابت) مع التناسب الزمني من 01/04/2023';
				const fullAnn = v0 * (linearRate / 100);
				const a1 = (fullAnn * 9) / 12;
				const a2 = fullAnn;
				const a3 = fullAnn;
				const acc1 = a1;
				const acc2 = a1 + a2;
				const acc3 = acc2 + a3;
				rows = [
					{ year: 2023, base: v0, ann: a1, acc: acc1, vnc: v0 - acc1 },
					{ year: 2024, base: v0, ann: a2, acc: acc2, vnc: v0 - acc2 },
					{ year: 2025, base: v0, ann: a3, acc: acc3, vnc: v0 - acc3 }
				];
				qYearLabel = 'قسط سنة 2023 (9 أشهر) وسنة 2024';
			} else if (difficulty === 'medium') {
				// الاهتلاك المتناقص على 5 سنوات (معامل 2 => معدل 40%، تحول للخطي في السنة 4)
				methodLabel = 'الاهتلاك المتناقص (معامل ضريبي 2، معدل 40%) من 02/01/2022';
				const td = 0.4;
				const b1 = v0;
				const a1 = b1 * td;
				const v1 = b1 - a1;
				const a2 = v1 * td;
				const v2 = v1 - a2;
				const a3 = v2 * td;
				const v3 = v2 - a3;
				rows = [
					{ year: 2022, base: b1, ann: a1, acc: a1, vnc: v1 },
					{ year: 2023, base: v1, ann: a2, acc: a1 + a2, vnc: v2 },
					{ year: 2024, base: v2, ann: a3, acc: a1 + a2 + a3, vnc: v3 }
				];
				qYearLabel = 'الأقساط الثلاثة الأولى (2022، 2023، 2024)';
			} else {
				// الاهتلاك المتزايد على 4 سنوات (المجموع S = 10)
				methodLabel = 'الاهتلاك المتزايد على 4 سنوات (S = 10) من 02/01/2022';
				const a1 = (v0 * 1) / 10;
				const a2 = (v0 * 2) / 10;
				const a3 = (v0 * 3) / 10;
				const a4 = (v0 * 4) / 10;
				rows = [
					{ year: 2022, base: v0, ann: a1, acc: a1, vnc: v0 - a1 },
					{ year: 2023, base: v0, ann: a2, acc: a1 + a2, vnc: v0 - a1 - a2 },
					{ year: 2024, base: v0, ann: a3, acc: a1 + a2 + a3, vnc: v0 - a1 - a2 - a3 },
					{ year: 2025, base: v0, ann: a4, acc: v0, vnc: 0 }
				];
				qYearLabel = 'جدول الاهتلاك المتزايد الكامل (4 سنوات)';
			}

			const tableRows = rows.map((r, idx) => [
				{ label: String(r.year) },
				{ label: formatDzd(r.base) },
				idx === 0 || idx === 2
					? { label: '........', answer: formatDzd(r.ann), mark: '0.75' }
					: { label: formatDzd(r.ann) },
				idx === 1
					? { label: '........', answer: formatDzd(r.acc), mark: '0.75' }
					: { label: formatDzd(r.acc) },
				idx === 0 || idx === 1
					? { label: '........', answer: formatDzd(r.vnc), mark: '0.5' }
					: { label: formatDzd(r.vnc) }
			]);
			// Wait: check exact mark count in tableRows!
			// idx=0: ann(0.75) + vnc(0.5) = 1.25
			// idx=1: acc(0.75) + vnc(0.5) = 1.25
			// idx=2: ann(0.75) = 0.75
			// idx=3 (only in hard): none! Total in tableRows = 1.25 + 1.25 + 0.75 = 3.25!
			// Let's make marks super crisp and equal across all difficulties: 3.5 in table + 1.5 in Q1 + 1 in Q3 = 6!
			const cleanTableRows = rows.map((r, idx) => {
				if (idx === 0) {
					return [
						{ label: String(r.year) },
						{ label: formatDzd(r.base) },
						{ label: '........', answer: formatDzd(r.ann), mark: '0.75' },
						{ label: formatDzd(r.acc) },
						{ label: '........', answer: formatDzd(r.vnc), mark: '0.5' }
					];
				}
				if (idx === 1) {
					return [
						{ label: String(r.year) },
						{ label: formatDzd(r.base) },
						{ label: '........', answer: formatDzd(r.ann), mark: '0.5' },
						{ label: '........', answer: formatDzd(r.acc), mark: '0.5' },
						{ label: '........', answer: formatDzd(r.vnc), mark: '0.5' }
					];
				}
				if (idx === 2) {
					return [
						{ label: String(r.year) },
						{ label: formatDzd(r.base) },
						{ label: '........', answer: formatDzd(r.ann), mark: '0.75' },
						{ label: formatDzd(r.acc) },
						{ label: formatDzd(r.vnc) }
					];
				}
				return [
					{ label: String(r.year) },
					{ label: formatDzd(r.base) },
					{ label: formatDzd(r.ann) },
					{ label: formatDzd(r.acc) },
					{ label: formatDzd(r.vnc) }
				];
			});
			// Sum of table marks: (0.75 + 0.5) + (0.5 + 0.5 + 0.5) + 0.75 = 1.25 + 1.50 + 0.75 = 3.50!

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `مخطط اهتلاك معدة صناعية (حـ/ 215) — ${company}`,
					text: `اقتنت ${company} آلة إنتاجية بتكلفة حيازة ${formatDzd(v0)} دج (خارج الرسم)، مدتها النفعية ${nYears} سنوات، وتُهتلك وفق طريقة: ${methodLabel}.`
				}),
				{
					type: 'text',
					content: `1) احسب معدل الاهتلاك المطبق، ثم حدد ${qYearLabel}.`,
					answer:
						difficulty === 'easy'
							? `المعدل الخطي $t = frac(100, ${nYears}) = ${linearRate}%$. قسط 2023 $= ${formatDzd(v0)} times ${linearRate}% times frac(9, 12) = ${formatDzd(rows[0].ann)}$ دج، وقسط 2024 $= ${formatDzd(rows[1].ann)}$ دج.`
							: difficulty === 'medium'
								? `المعدل الخطي $= ${linearRate}%$، المعامل الضريبي $= 2$، إذن المعدل المتناقص $t_d = 40%$. الأقساط: 2022 $= ${formatDzd(rows[0].ann)}$ دج، 2023 $= ${formatDzd(rows[1].ann)}$ دج، 2024 $= ${formatDzd(rows[2].ann)}$ دج.`
								: `مجموع رتب السنوات $S = frac(4 times 5, 2) = 10$. قسط 2022 $= ${formatDzd(rows[0].ann)}$، 2023 $= ${formatDzd(rows[1].ann)}$، 2024 $= ${formatDzd(rows[2].ann)}$، 2025 $= ${formatDzd(rows[3].ann)}$ دج.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: '2) أكمل مستخرج جدول الاهتلاك الآتي:'
				},
				buildManagementTableBlock(
					['السنة', 'القاعدة القابلة للاهتلاك', 'قسط الاهتلاك السنوي', 'الاهتلاك المتراكم', 'القيمة الصافية VNC'],
					cleanTableRows
				),
				{
					type: 'text',
					content: `3) سجل قسط اهتلاك سنة ${rows[1].year} في دفتر اليومية بتاريخ 31/12/${rows[1].year}:`,
					answer: `مدين حـ/ 681 مخصصات الاهتلاكات والمؤونات وخسائر القيمة — أصول غير جارية ($${formatDzd(rows[1].ann)}$ دج) / دائن حـ/ 2815 اهتلاك المنشآت التقنية ($${formatDzd(rows[1].ann)}$ دج).`,
					mark: '1'
				}
			];

			const sujetExercise: ExerciseBlock = {
				points: 6,
				instruction: 'أنجز الحسابات وأتمم جدول الاهتلاك وسجل قيد التسوية:',
				content
			};

			const targetRow = rows[1];
			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(rows[0].ann);
				quizQuestion = {
					type: 'calculated',
					questionText: `اقتنيت آلة بمبلغ $V_0 = ${formatDzd(v0)}$ دج بتاريخ $01/04/2023$ وتهتلك خطياً على $${nYears}$ سنوات. احسب قسط اهتلاك سنة $2023$ (9 أشهر).`,
					questionTextAr: 'احسب قسط سنة 2023 (بالدج):',
					questionData: { answer: rows[0].ann, displayTemplate: 'A_2023 = ? دج', variables: [], tolerance: 0.5 },
					explanation: `القسط السنوي الكامل $= ${formatDzd(rows[1].ann)}$ دج؛ قسط $2023 = ${formatDzd(rows[1].ann)} \\times \\frac{9}{12} = ${formatDzd(rows[0].ann)}$ دج.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(targetRow.vnc);
				quizQuestion = {
					type: 'calculated',
					questionText: `آلة قيمتها $V_0 = ${formatDzd(v0)}$ دج تُهتلك بالطريقة المتناقصة بمعدل $40\\%$ ابتداءً من $02/01/2022$. احسب القيمة المحاسبية الصافية ($VNC$) في نهاية سنة $2023$ (بعد سنتين).`,
					questionTextAr: 'احسب VNC في نهاية سنة 2023:',
					questionData: { answer: targetRow.vnc, displayTemplate: 'VNC_2023 = ? دج', variables: [], tolerance: 0.5 },
					explanation: `$VNC_{2022} = ${formatDzd(rows[0].vnc)}$ دج؛ قسط $2023 = ${formatDzd(rows[1].ann)}$ دج؛ إذن $VNC_{2023} = ${formatDzd(targetRow.vnc)}$ دج.`
				};
			} else {
				finalAnswer = String(rows[2].ann);
				quizQuestion = {
					type: 'calculated',
					questionText: `معدة صناعية قيمتها $V_0 = ${formatDzd(v0)}$ دج تهتلك بالطريقة المتزايدة على $4$ سنوات. احسب قسط اهتلاك السنة الثالثة ($2024$).`,
					questionTextAr: 'احسب قسط السنة الثالثة (بالدج):',
					questionData: { answer: rows[2].ann, displayTemplate: 'A_3 = ? دج', variables: [], tolerance: 0.5 },
					explanation: `$S = \\frac{4 \\times 5}{2} = 10$؛ قسط السنة الثالثة $= ${formatDzd(v0)} \\times \\frac{3}{10} = ${formatDzd(rows[2].ann)}$ دج.`
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
					'في الاهتلاك الخطي: إذا تم الاقتناء خلال السنة يُحسب القسط بالتناسب بالشهر من أول شهر الحيازة.',
					'في الاهتلاك المتناقص: نطبق المعدل على VNC بداية كل سنة، وعندما يصبح 100 ÷ السنوات المتبقية أكبر أو يساوي المعدل المتناقص ننتقل للخطي.',
					'في الاهتلاك المتزايد: مجموع السنوات 1 إلى 4 يساوي 10.'
				],
				solutionStepsAr: [
					`القسط الأول $= ${formatDzd(rows[0].ann)}$ دج و $VNC_1 = ${formatDzd(rows[0].vnc)}$ دج.`,
					`القسط الثاني $= ${formatDzd(rows[1].ann)}$ دج والاهتلاك المتراكم $= ${formatDzd(rows[1].acc)}$ دج و $VNC_2 = ${formatDzd(rows[1].vnc)}$ دج.`,
					`القسط الثالث $= ${formatDzd(rows[2].ann)}$ دج، ويُسجل القيد السنوي في مدين حـ/ 681 ودائن حـ/ 2815.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. خسائر القيمة عن التثبيتات والتنازل عنها (8 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_3as_acc_t1_asset_impairment_disposal',
		grade: '3as_acc',
		trimesterId: 't1',
		domain: 'acc_year_end',
		titleAr: 'تحديد المجهول، خسائر القيمة (291)، والتنازل عن التثبيتات (652 / 752)',
		curriculumLessonId: 'mgt_lesson_3as_acc_t1_impairment_disposal_assets',
		defaultPoints: 8,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_3AS_T1);
			// Machine acquired 01/01/2022, N=5 years (20%), linear
			const v0 = rng.int(5, 10) * 200_000;
			const annOrig = v0 * 0.2;
			const accBefore2024 = annOrig * 2; // 2022 + 2023 (40% of v0)
			const vncEnd2023 = v0 - accBefore2024; // 60% of v0
			// Impairment at 31/12/2023: PVN = 45% of v0 -> PV = 15% of v0
			const pvn2023 = v0 * 0.45;
			const pv2023 = vncEnd2023 - pvn2023;
			// New annual depreciation starting 2024 (3 years left: 2024, 2025, 2026):
			const annNew = pvn2023 / 3; // 15% of v0! Exact integer!
			// Disposal on 30/09/2024 (9 months)
			const compDep2024 = (annNew * 9) / 12; // 11.25% of v0 (since v0 is multiple of 200,000, wait: 200,000 * 0.1125 = 22,500 exact!)
			const totalAccAtDisposal = accBefore2024 + compDep2024;
			const vncAtDisposal = v0 - totalAccAtDisposal - pv2023;

			const isGain = difficulty !== 'hard';
			const salePrice = isGain ? vncAtDisposal + rng.int(2, 6) * 10_000 : vncAtDisposal - rng.int(2, 5) * 10_000;
			const disposalResult = salePrice - vncAtDisposal; // + for 752, - for 652

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `مستخرج وضعية التثبيتات — ${company}`,
					text: `بتاريخ 31/12/2024 وقبل الجرد، أظهر ميزان المراجعة لـ ${company} معدات نقل (حـ/ 2182) تكلفتها الأصلية ${formatDzd(v0)} دج، واهتلاكها المتراكم حتى 31/12/2023 يساوي ${formatDzd(accBefore2024)} دج، وخسارة قيمة مسجلة في 31/12/2023 (حـ/ 29182) بمبلغ ${formatDzd(pv2023)} دج. تُهتلك الشاحنة خطياً بمعدل 20% سنوياً.\nوبتاريخ 30/09/2024 تنازلت المؤسسة عن الشاحنة بشيك بنكي بمبلغ ${formatDzd(salePrice)} دج، ولم يسجل المحاسب قيود التنازل بعد.`
				}),
				{
					type: 'text',
					content: '1) حدد تاريخ حيازة الشاحنة (علماً أنها اقتنيت في أول الشهر)، ثم احسب القيمة القابلة للتحصيل (PVN) في 31/12/2023.',
					answer: `لدينا $sum A = V_0 times t times n ==> ${formatDzd(accBefore2024)} = ${formatDzd(v0)} times 0.20 times n ==> n = 2$ سنة قبل 31/12/2023؛ إذن تاريخ الحيازة هو 01/01/2022. $"VNC"_2023 = ${formatDzd(vncEnd2023)}$ دج؛ ومنه $"PVN" = "VNC"_2023 - "PV" = ${formatDzd(vncEnd2023)} - ${formatDzd(pv2023)} = ${formatDzd(pvn2023)}$ دج.`,
					mark: '2'
				},
				{
					type: 'text',
					content: '2) احسب القسط السنوي المعدل ابتداءً من 2024، ثم احسب قسط الاهتلاك المكمل حتى تاريخ التنازل (30/09/2024) ونتيجة التنازل.',
					answer: `القسط السنوي المعدل $= frac(${formatDzd(pvn2023)}, 3) = ${formatDzd(annNew)}$ دج. القسط المكمل لـ 9 أشهر $= ${formatDzd(annNew)} times frac(9, 12) = ${formatDzd(compDep2024)}$ دج. الاهتلاك المتراكم يوم التنازل $= ${formatDzd(totalAccAtDisposal)}$ دج؛ $"VNC"$ يوم التنازل $= ${formatDzd(vncAtDisposal)}$ دج. نتيجة التنازل $= ${formatDzd(salePrice)} - ${formatDzd(vncAtDisposal)} = ${disposalResult >= 0 ? '+' : ''}${formatDzd(disposalResult)}$ دج (${isGain ? 'فائض قيمة حـ/ 752' : 'ناقص قيمة حـ/ 652'}).`,
					mark: '2.5'
				},
				{
					type: 'text',
					content: '3) أكمل قيود التسوية بتاريخ 31/12/2024 في دفتر اليومية:'
				},
				buildManagementTableBlock(
					['البيان', 'الحساب المدين والمبلغ', 'الحساب الدائن والمبلغ'],
					[
						[
							{ label: 'أ) إثبات الاهتلاك المكمل (9 أشهر من 2024)' },
							{ label: '........', answer: `حـ/ 681 (${formatDzd(compDep2024)})`, mark: '0.75' },
							{ label: '........', answer: `حـ/ 28182 (${formatDzd(compDep2024)})`, mark: '0.75' }
						],
						[
							{ label: 'ب) تسجيل التنازل عن الشاحنة بشيك' },
							{
								label: '........',
								answer: `512 (${formatDzd(salePrice)}) + 28182 (${formatDzd(totalAccAtDisposal)}) + 29182 (${formatDzd(pv2023)})${!isGain ? ` + 652 (${formatDzd(Math.abs(disposalResult))})` : ''}`,
								mark: '1'
							},
							{
								label: '........',
								answer: `2182 (${formatDzd(v0)})${isGain ? ` + 752 (${formatDzd(disposalResult)})` : ''}`,
								mark: '1'
							}
						]
					]
				)
			];

			const sujetExercise: ExerciseBlock = {
				points: 8,
				instruction: 'أجب عن الأسئلة المحاسبية بدقة وسجل قيود التسوية والتنازل:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(compDep2024);
				quizQuestion = {
					type: 'calculated',
					questionText: `تبلغ $VNC$ المعدلة لشاحنة في نهاية $2023$ (بعد خسارة القيمة) مبلغ $${formatDzd(pvn2023)}$ دج وتوزع على $3$ سنوات متبقية. إذا تم التنازل عنها في $30/09/2024$ (9 أشهر)، احسب قسط الاهتلاك المكمل لسنة $2024$.`,
					questionTextAr: 'احسب قسط الاهتلاك المكمل (بالدج):',
					questionData: { answer: compDep2024, displayTemplate: 'القسط المكمل = ? دج', variables: [], tolerance: 0.5 },
					explanation: `القسط المعدل $= \\frac{${formatDzd(pvn2023)}}{3} = ${formatDzd(annNew)}$ دج؛ قسط $9$ أشهر $= ${formatDzd(annNew)} \\times \\frac{9}{12} = ${formatDzd(compDep2024)}$ دج.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(disposalResult);
				quizQuestion = {
					type: 'calculated',
					questionText: `شاحنة تكلفتها $${formatDzd(v0)}$ دج، مجموع اهتلاكها يوم التنازل $${formatDzd(totalAccAtDisposal)}$ دج، وخسارة قيمتها السابقة $${formatDzd(pv2023)}$ دج، بِيعَت بمبلغ $${formatDzd(salePrice)}$ دج. احسب نتيجة التنازل ($R_c$).`,
					questionTextAr: 'احسب نتيجة التنازل (بالدج):',
					questionData: { answer: disposalResult, displayTemplate: 'R_c = ? دج', variables: [], tolerance: 0.5 },
					explanation: `$VNC = ${formatDzd(v0)} - ${formatDzd(totalAccAtDisposal)} - ${formatDzd(pv2023)} = ${formatDzd(vncAtDisposal)}$ دج؛ $R_c = ${formatDzd(salePrice)} - ${formatDzd(vncAtDisposal)} = +${formatDzd(disposalResult)}$ دج (فائض حـ/ 752).`
				};
			} else {
				finalAnswer = String(disposalResult);
				quizQuestion = {
					type: 'calculated',
					questionText: `في حالة التنازل بمبلغ $${formatDzd(salePrice)}$ دج عندما تكون $VNC_{\\text{يوم التنازل}} = ${formatDzd(vncAtDisposal)}$ دج، احسب نتيجة التنازل (اكتبها بإشارة سالبة لأنها ناقص قيمة حـ/ 652).`,
					questionTextAr: 'احسب نتيجة التنازل (بإشارتها):',
					questionData: { answer: disposalResult, displayTemplate: 'R_c = ? دج', variables: [], tolerance: 0.5 },
					explanation: `$R_c = ${formatDzd(salePrice)} - ${formatDzd(vncAtDisposal)} = ${formatDzd(disposalResult)}$ دج (ناقص قيمة في مدين حـ/ 652 بمبلغ $${formatDzd(Math.abs(disposalResult))}$ دج).`
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
					'استعمل قانون مجموع الاهتلاكات المتراكمة لإيجاد مدة الاستعمال السابقة وتاريخ الحيازة.',
					'بعد خسارة القيمة يصبح الأساس الجديد للاهتلاك هو PVN مقسماً على السنوات المتبقية.',
					'في قيد التنازل نرصد حـ/ 2182 في الدائن، ونضع 512 و28182 و29182 في المدين.'
				],
				solutionStepsAr: [
					`تاريخ الحيازة 01/01/2022؛ $PVN_{2023} = ${formatDzd(pvn2023)}$ دج.`,
					`القسط السنوي المعدل $= ${formatDzd(annNew)}$ دج؛ القسط المكمل لـ 9 أشهر $= ${formatDzd(compDep2024)}$ دج.`,
					`الاهتلاك المتراكم يوم التنازل $= ${formatDzd(totalAccAtDisposal)}$ دج؛ $VNC = ${formatDzd(vncAtDisposal)}$ دج؛ النتيجة $= ${formatDzd(disposalResult)}$ دج.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. تسوية المخزونات (فروقات الجرد وخسائر القيمة 39) (6 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_3as_acc_t1_inventory_differences_pvn',
		grade: '3as_acc',
		trimesterId: 't1',
		domain: 'acc_year_end',
		titleAr: 'تسوية المخزونات (فروقات الجرد، خسائر القيمة 39x، والمشتريات 38/408)',
		curriculumLessonId: 'mgt_lesson_3as_acc_t1_inventories_settlement',
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_3AS_T1);
			const book30 = rng.int(40, 70) * 10_000;
			const diff30 = rng.int(2, 5) * 5_000; // سالب مبرر
			const phys30 = book30 - diff30;
			const pvn30 = phys30 - rng.int(3, 6) * 5_000;
			const pv30New = phys30 - pvn30;
			const pv30Prev = difficulty === 'hard' ? pv30New + 10_000 : pv30New - 5_000;
			const pv30Delta = pv30New - pv30Prev; // + تكوين إضافي 685/390، - استرجاع 390/785

			const book31 = rng.int(25, 45) * 10_000;
			const diff31 = rng.int(1, 3) * 4_000; // غير مبرر
			const phys31 = difficulty === 'easy' ? book31 + diff31 : book31 - diff31;
			const isSurplus31 = phys31 > book31;
			const uninvAmt = rng.int(4, 9) * 10_000; // 380 -> 408

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `وضعية المخزونات عند الجرد في 31/12/2024 — ${company}`,
					text: `أظهر ميزان المراجعة قبل الجرد وبطاقات الجرد المادي المعطيات الآتية:\n1) مخزون البضائع (حـ/ 30): الجرد المحاسبي ${formatDzd(book30)} دج، الجرد المادي ${formatDzd(phys30)} دج (الفرق مبرر)، وسعر السوق الصافي (PVN) ${formatDzd(pvn30)} دج، وخسارة القيمة السابقة (حـ/ 390) تساوي ${formatDzd(pv30Prev)} دج.\n2) المواد الأولية (حـ/ 31): الجرد المحاسبي ${formatDzd(book31)} دج، الجرد المادي ${formatDzd(phys31)} دج (الفرق غير مبرر).\n3) رصيد حـ/ 380 مشتريات البضائع دائن بمبلغ ${formatDzd(uninvAmt)} دج بسبب استلام بضاعة دون وصول فاتورتها بعد.`
				}),
				{
					type: 'text',
					content: '1) احسب فروقات الجرد وخسارة القيمة الجديدة للبضائع وتعديلها، ثم أكمل جدول التسويات:'
				},
				buildManagementTableBlock(
					['العنصر', 'الحساب المدين', 'الحساب الدائن', 'المبلغ (دج)'],
					[
						[
							{ label: 'فرق جرد البضائع (مبرر)' },
							{ label: '........', answer: 'حـ/ 600', mark: '0.5' },
							{ label: '........', answer: 'حـ/ 30', mark: '0.5' },
							{ label: '........', answer: formatDzd(diff30), mark: '0.5' }
						],
						[
							{ label: pv30Delta >= 0 ? 'رفع خسارة قيمة البضائع (390)' : 'استرجاع خسارة قيمة البضائع (390)' },
							{ label: '........', answer: pv30Delta >= 0 ? 'حـ/ 685' : 'حـ/ 390', mark: '0.5' },
							{ label: '........', answer: pv30Delta >= 0 ? 'حـ/ 390' : 'حـ/ 785', mark: '0.5' },
							{ label: '........', answer: formatDzd(Math.abs(pv30Delta)), mark: '1' }
						],
						[
							{ label: `فرق جرد المواد الأولية (${isSurplus31 ? 'موجب' : 'سالب'} غير مبرر)` },
							{ label: '........', answer: isSurplus31 ? 'حـ/ 31' : 'حـ/ 657', mark: '0.5' },
							{ label: '........', answer: isSurplus31 ? 'حـ/ 757' : 'حـ/ 31', mark: '0.5' },
							{ label: '........', answer: formatDzd(diff31), mark: '0.5' }
						],
						[
							{ label: 'تسوية بضاعة مستلمة لم تصل فاتورتها' },
							{ label: 'حـ/ 380' },
							{ label: '........', answer: 'حـ/ 408 موردو الفواتير التي لم تصل', mark: '0.5' },
							{ label: '........', answer: formatDzd(uninvAmt), mark: '0.5' }
						]
					]
				)
			];

			const sujetExercise: ExerciseBlock = {
				points: 6,
				instruction: 'أجرِ الحسابات اللازمة وأكمل جدول تسوية المخزونات بتاريخ 31/12/2024:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(pv30New);
				quizQuestion = {
					type: 'calculated',
					questionText: `بلغ الجرد المادي لمخزون بضاعة $${formatDzd(phys30)}$ دج، وسعر بيعه الصافي المحتمل $PVN = ${formatDzd(pvn30)}$ دج. احسب خسارة القيمة اللازمة في نهاية السنة (بالدج).`,
					questionTextAr: 'احسب خسارة القيمة المطلوبة للمخزون:',
					questionData: { answer: pv30New, displayTemplate: 'PV = ? دج', variables: [], tolerance: 0.01 },
					explanation: `$PV = ${formatDzd(phys30)} - ${formatDzd(pvn30)} = ${formatDzd(pv30New)}$ دج.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(pv30Delta);
				quizQuestion = {
					type: 'calculated',
					questionText: `خسارة القيمة اللازمة لمخزون بضاعة هي $${formatDzd(pv30New)}$ دج، بينما كانت خسارته السابقة في حـ/ 390 تساوي $${formatDzd(pv30Prev)}$ دج. احسب مبلغ الزيادة في الخسارة المسجل في حـ/ 685.`,
					questionTextAr: 'احسب مبلغ الزيادة في حـ/ 390:',
					questionData: { answer: pv30Delta, displayTemplate: 'الزيادة = ? دج', variables: [], tolerance: 0.01 },
					explanation: `الزيادة $= ${formatDzd(pv30New)} - ${formatDzd(pv30Prev)} = ${formatDzd(pv30Delta)}$ دج (مدين 685 / دائن 390).`
				};
			} else {
				finalAnswer = String(Math.abs(pv30Delta));
				quizQuestion = {
					type: 'calculated',
					questionText: `تقدّر خسارة القيمة الجديدة للبضائع بمبلغ $${formatDzd(pv30New)}$ دج، بينما يظهر ميزان المراجعة خسارة سابقة في حـ/ 390 بمبلغ $${formatDzd(pv30Prev)}$ دج. احسب مبلغ الاسترجاع المسجل في حـ/ 785.`,
					questionTextAr: 'احسب مبلغ الاسترجاع (بالدج):',
					questionData: { answer: Math.abs(pv30Delta), displayTemplate: 'الاسترجاع = ? دج', variables: [], tolerance: 0.01 },
					explanation: `بما أن الخسارة الحالية أقل من السابقة، نسترجع الفرق: $${formatDzd(pv30Prev)} - ${formatDzd(pv30New)} = ${formatDzd(Math.abs(pv30Delta))}$ دج في دائن حـ/ 785.`
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
					'فرق الجرد = الجرد المادي − الجرد المحاسبي. نسويه أولاً ثم نقارن الجرد المادي مع PVN.',
					'الفرق غير المبرر يسجل في 657 (سالب) أو 757 (موجب).',
					'عند عدم وصول الفاتورة مع استلام المخزون نرصد حـ/ 380 مع حـ/ 408.'
				],
				solutionStepsAr: [
					`فرق جرد البضائع $= ${formatDzd(phys30)} - ${formatDzd(book30)} = -${formatDzd(diff30)}$ دج (مبرر: 600 إلى 30).`,
					`خسارة القيمة الجديدة $= ${formatDzd(pv30New)}$ دج، التعديل $= ${formatDzd(Math.abs(pv30Delta))}$ دج.`,
					`فرق جرد المواد الأولية غير مبرر $= ${formatDzd(diff31)}$ دج؛ وتسوية 380 إلى 408 بـ $${formatDzd(uninvAmt)}$ دج.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. تسوية حسابات الزبائن (6 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_3as_acc_t1_customers_receivables',
		grade: '3as_acc',
		trimesterId: 't1',
		domain: 'acc_year_end',
		titleAr: 'تسوية حسابات الزبائن (المشكوك فيهم 416/491 والمعدومون 654)',
		curriculumLessonId: 'mgt_lesson_3as_acc_t1_customers_settlement',
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_3AS_T1);
			// Customer 1 (doubtful): initial TTC multiple of 119,000
			const c1HtInit = rng.int(2, 4) * 100_000;
			const c1TtcInit = c1HtInit * 1.19;
			const c1PvPrevPct = 20;
			const c1PvPrev = c1HtInit * (c1PvPrevPct / 100);
			const c1PaidTtc = 100_000 * 1.19; // paid 119,000 TTC
			const c1TtcRem = c1TtcInit - c1PaidTtc;
			const c1HtRem = c1TtcRem / 1.19;
			const c1PvNewPct = difficulty === 'easy' ? 40 : 15; // easy: increase; med/hard: decrease
			const c1PvNew = c1HtRem * (c1PvNewPct / 100);
			const c1Delta = c1PvNew - c1PvPrev;

			// Customer 2 (bankrupt/uncollectible, formerly doubtful)
			const c2HtRem = rng.int(1, 3) * 100_000;
			const c2TvaRem = c2HtRem * 0.19;
			const c2TtcRem = c2HtRem + c2TvaRem;
			const c2PvPrev = c2HtRem * 0.4;
			const c2Loss654 = c2HtRem - c2PvPrev;

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `وضعية الزبائن المشكوك فيهم بتاريخ 31/12/2024 — ${company} (TVA 19%)`,
					text: `إليك وضعية زبونين مشكوك فيهما في 31/12/2024:\n• الزبون «سالم»: دينه المتضمن للرسم في بداية السنة ${formatDzd(c1TtcInit)} دج، خسارته السابقة ${c1PvPrevPct}%، سدد خلال السنة ${formatDzd(c1PaidTtc)} دج، ويُنتظر عدم تحصيل ${c1PvNewPct}% من رصيده المتبقي.\n• الزبون «رياض»: دينه المتبقي ${formatDzd(c2TtcRem)} دج (TTC)، وخسارته السابقة ${formatDzd(c2PvPrev)} دج، وقد أُعلن إفلاسه النهائي ولن يسدد شيئاً.`
				}),
				{
					type: 'text',
					content: '1) أكمل جدول دراسة وضعية الزبونين (المبالغ بالدج):'
				},
				buildManagementTableBlock(
					['الزبون', 'الرصيد المتبقي TTC', 'الرصيد خارج الرسم HT', 'الخسارة السابقة 491', 'الخسارة الجديدة', 'التعديل / المعالجة'],
					[
						[
							{ label: 'سالم' },
							{ label: formatDzd(c1TtcRem) },
							{ label: '........', answer: formatDzd(c1HtRem), mark: '0.5' },
							{ label: '........', answer: formatDzd(c1PvPrev), mark: '0.5' },
							{ label: '........', answer: formatDzd(c1PvNew), mark: '0.5' },
							{
								label: '........',
								answer: c1Delta >= 0 ? `تكوين إضافي ${formatDzd(c1Delta)}` : `استرجاع ${formatDzd(Math.abs(c1Delta))}`,
								mark: '1'
							}
						],
						[
							{ label: 'رياض (معدوم)' },
							{ label: formatDzd(c2TtcRem) },
							{ label: '........', answer: formatDzd(c2HtRem), mark: '0.5' },
							{ label: formatDzd(c2PvPrev) },
							{ label: '0 (معدوم)' },
							{ label: '........', answer: `خسارة نهائية 654 = ${formatDzd(c2Loss654)}`, mark: '1' }
						]
					]
				),
				{
					type: 'text',
					content: '2) سجل قيود تسوية الزبون «سالم» والزبون «رياض» في دفتر اليومية بتاريخ 31/12/2024:'
				},
				buildManagementTableBlock(
					['الزبون', 'الحساب المدين والمبلغ', 'الحساب الدائن والمبلغ'],
					[
						[
							{ label: 'تسوية الزبون سالم' },
							{ label: '........', answer: c1Delta >= 0 ? `حـ/ 685 (${formatDzd(c1Delta)})` : `حـ/ 491 (${formatDzd(Math.abs(c1Delta))})`, mark: '0.5' },
							{ label: '........', answer: c1Delta >= 0 ? `حـ/ 491 (${formatDzd(c1Delta)})` : `حـ/ 785 (${formatDzd(Math.abs(c1Delta))})`, mark: '0.5' }
						],
						[
							{ label: 'إفلاس الزبون رياض' },
							{ label: '........', answer: `491 (${formatDzd(c2PvPrev)}) + 4457 (${formatDzd(c2TvaRem)}) + 654 (${formatDzd(c2Loss654)})`, mark: '0.5' },
							{ label: '........', answer: `حـ/ 416 (${formatDzd(c2TtcRem)})`, mark: '0.5' }
						]
					]
				)
			];

			const sujetExercise: ExerciseBlock = {
				points: 6,
				instruction: 'أكمل جدول الزبائن وسجل قيود التسوية في 31 ديسمبر:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(c1Delta);
				quizQuestion = {
					type: 'calculated',
					questionText: `زبون مشكوك فيه دينه الأول $${formatDzd(c1TtcInit)}$ دج (TTC، TVA $19\\%$) وخسارته السابقة $20\\%$. سدد خلال السنة $${formatDzd(c1PaidTtc)}$ دج، ويُتوقع عدم تحصيل $40\\%$ من رصيده المتبقي. احسب مبلغ الزيادة في الخسارة (حـ/ 685).`,
					questionTextAr: 'احسب الزيادة في خسارة الزبون:',
					questionData: { answer: c1Delta, displayTemplate: 'الزيادة = ? دج', variables: [], tolerance: 0.5 },
					explanation: `الخسارة السابقة $= ${formatDzd(c1PvPrev)}$ دج؛ الرصيد المتبقي $HT = ${formatDzd(c1HtRem)}$ دج؛ الخسارة الجديدة $= ${formatDzd(c1PvNew)}$ دج؛ الزيادة $= ${formatDzd(c1Delta)}$ دج.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(c2Loss654);
				quizQuestion = {
					type: 'calculated',
					questionText: `زبون مشكوك فيه دينه المتبقي $${formatDzd(c2TtcRem)}$ دج (TTC، TVA $19\\%$) وخسارته السابقة في حـ/ 491 تساوي $${formatDzd(c2PvPrev)}$ دج، وأُعلن إفلاسه نهائياً. ما المبلغ المسجل في حـ/ 654 (خسائر عن حسابات دائنة غير قابلة للتحصيل)؟`,
					questionTextAr: 'احسب قيمة حـ/ 654 (بالدج):',
					questionData: { answer: c2Loss654, displayTemplate: 'حـ/ 654 = ? دج', variables: [], tolerance: 0.5 },
					explanation: `$HT = ${formatDzd(c2HtRem)}$ دج؛ حـ/ $654 = HT - PV_{\\text{سابقة}} = ${formatDzd(c2HtRem)} - ${formatDzd(c2PvPrev)} = ${formatDzd(c2Loss654)}$ دج.`
				};
			} else {
				finalAnswer = String(Math.abs(c1Delta));
				quizQuestion = {
					type: 'calculated',
					questionText: `بلغت الخسارة السابقة للزبون «سالم» $${formatDzd(c1PvPrev)}$ دج، بينما الخسارة المطلوبة في نهاية السنة هي $${formatDzd(c1PvNew)}$ دج. احسب مبلغ الاسترجاع المسجل في حـ/ 785.`,
					questionTextAr: 'احسب مبلغ الاسترجاع لحـ/ 785:',
					questionData: { answer: Math.abs(c1Delta), displayTemplate: 'الاسترجاع = ? دج', variables: [], tolerance: 0.5 },
					explanation: `الاسترجاع $= ${formatDzd(c1PvPrev)} - ${formatDzd(c1PvNew)} = ${formatDzd(Math.abs(c1Delta))}$ دج.`
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
					'الخسارة السابقة والخسارة الجديدة تُحسبان على المبالغ خارج الرسم (HT = TTC ÷ 1.19).',
					'عند إفلاس الزبون المشكوك فيه نضع 491 و4457 و654 في المدين، وحـ/ 416 بـ TTC في الدائن.',
					'إذا نقصت الخسارة الجديدة عن السابقة، نسترجع الفرق عبر حـ/ 491 مديناً وحـ/ 785 دائناً.'
				],
				solutionStepsAr: [
					`الزبون سالم: $HT$ المتبقي $= ${formatDzd(c1HtRem)}$ دج، الخسارة السابقة $= ${formatDzd(c1PvPrev)}$، الجديدة $= ${formatDzd(c1PvNew)}$، الفرق $= ${formatDzd(Math.abs(c1Delta))}$ دج.`,
					`الزبون رياض: $HT = ${formatDzd(c2HtRem)}$، $TVA = ${formatDzd(c2TvaRem)}$، الخسارة النهائية $654 = ${formatDzd(c2Loss654)}$ دج.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. وضعية إدماجية لأعمال نهاية السنة (8 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_3as_acc_t1_year_end_integration',
		grade: '3as_acc',
		trimesterId: 't1',
		domain: 'integration',
		titleAr: 'وضعية بكالوريا لأعمال نهاية السنة: التثبيتات، المخزونات، والزبائن',
		curriculumLessonId: 'mgt_lesson_3as_acc_t1_customers_settlement',
		defaultPoints: 8,
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_3AS_T1);

			// 1. Building 213: V0, linear 4% (25y), acquired 01/01/2020 -> 4 years before 2024
			const bldgV0 = rng.int(4, 7) * 1_000_000;
			const bldgRate = 4;
			const bldgAcc2023 = bldgV0 * 0.04 * 4;
			const bldgAnn2024 = bldgV0 * 0.04;

			// 2. Inventory 30: book vs phys (unjustified), PVN
			const invBook = rng.int(3, 6) * 100_000;
			const invDiff = 10_000;
			const invPhys = invBook - invDiff;
			const invPvn = invPhys - 25_000;
			const invPvNew = 25_000;

			// 3. Ordinary customer 411 turns doubtful (TTC -> HT, 30% impairment)
			const custHt = rng.int(2, 4) * 100_000;
			const custTtc = custHt * 1.19;
			const custPv = custHt * 0.3;

			const total681 = bldgAnn2024;
			const total685 = invPvNew + custPv;

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `موضوع تطبيقي شامل لأعمال نهاية السنة (31/12/2024) — ${company}`,
					text: `من ميزان المراجعة قبل الجرد لـ ${company} بتاريخ 31/12/2024 والمعلومات الجردية استُخرجت المعطيات الآتية:\n1) البناءات (حـ/ 213): قيمتها الأصلية ${formatDzd(bldgV0)} دج، اهتلاكها المتراكم في حـ/ 2813 يساوي ${formatDzd(bldgAcc2023)} دج (مقتناة في 01/01/2020، تهتلك خطياً).\n2) مخزون البضائع (حـ/ 30): الرصيد المحاسبي ${formatDzd(invBook)} دج، الجرد المادي ${formatDzd(invPhys)} دج (فرق غير مبرر)، القيمة القابلة للتحصيل ${formatDzd(invPvn)} دج (لا توجد خسارة سابقة).\n3) الزبون العادي «حسام» دينه ${formatDzd(custTtc)} دج (TTC، TVA 19%) يُتوقع عدم تحصيل 30% من دينه.`
				}),
				{
					type: 'text',
					content: '1) احسب معدل الاهتلاك الخطي للبناءات ثم قسط اهتلاك سنة 2024.',
					answer: `عدد السنوات حتى 31/12/2023 هو $4$ سنوات؛ إذن $t = frac(${formatDzd(bldgAcc2023)}, ${formatDzd(bldgV0)} times 4) times 100 = ${bldgRate}%$ (أي $N = 25$ سنة). قسط سنة 2024 $= ${formatDzd(bldgV0)} times 0.04 = ${formatDzd(bldgAnn2024)}$ دج.`,
					mark: '2'
				},
				{
					type: 'text',
					content: '2) سجل قيود التسوية بتاريخ 31/12/2024 في دفتر اليومية لجميع العناصر الثلاثة:'
				},
				buildAccountingJournalTable([
					{
						dateLabel: '31/12 (البناءات)',
						debitCode: '681',
						creditCode: '2813',
						debitName: 'مخصصات الاهتلاك — أصول غير جارية',
						creditName: 'اهتلاك البناءات',
						amountStr: formatDzd(bldgAnn2024),
						narrative: 'قسط اهتلاك البناءات 2024',
						isSolutionTarget: true,
						mark: '1'
					},
					{
						dateLabel: '31/12 (فرق الجرد)',
						debitCode: '657',
						creditCode: '30',
						debitName: 'أعباء استثنائية للتسيير الجاري',
						creditName: 'مخزونات البضائع',
						amountStr: formatDzd(invDiff),
						narrative: 'تسوية فرق الجرد السالب غير المبرر',
						isSolutionTarget: true,
						mark: '1'
					},
					{
						dateLabel: '31/12 (خسارة 30)',
						debitCode: '685',
						creditCode: '390',
						debitName: 'مخصصات خسائر القيمة — أصول جارية',
						creditName: 'خسائر قيمة عن البضائع',
						amountStr: formatDzd(invPvNew),
						narrative: 'تكوين خسارة قيمة البضائع',
						isSolutionTarget: true,
						mark: '1'
					},
					{
						dateLabel: '31/12 (تصنيف الزبون)',
						debitCode: '416',
						creditCode: '411',
						debitName: 'الزبائن المشكوك فيهم',
						creditName: 'الزبائن',
						amountStr: formatDzd(custTtc),
						narrative: 'تحويل الزبون حسام لمشكوك فيه',
						isSolutionTarget: true,
						mark: '1'
					},
					{
						dateLabel: '31/12 (خسارة الزبون)',
						debitCode: '685',
						creditCode: '491',
						debitName: 'مخصصات خسائر القيمة — أصول جارية',
						creditName: 'خسائر قيمة عن حسابات الزبائن',
						amountStr: formatDzd(custPv),
						narrative: 'تكوين خسارة 30% على HT للزبون حسام',
						isSolutionTarget: true,
						mark: '1'
					}
				]),
				{
					type: 'text',
					content: '3) حدد القيمة الصافية التي يظهر بها كل من البناءات (حـ/ 213) والبضائع (حـ/ 30) في الميزانية الختامية في 31/12/2024.',
					answer: `البناءات الصافية $= ${formatDzd(bldgV0)} - (${formatDzd(bldgAcc2023)} + ${formatDzd(bldgAnn2024)}) = ${formatDzd(bldgV0 - bldgAcc2023 - bldgAnn2024)}$ دج؛ البضائع الصافية $= ${formatDzd(invPhys)} - ${formatDzd(invPvNew)} = ${formatDzd(invPvn)}$ دج.`,
					mark: '1'
				}
			];

			const sujetExercise: ExerciseBlock = {
				customTitle: 'الوضعية الإدماجية — الثلاثي الأول (أعمال نهاية السنة)',
				points: 8,
				instruction: 'أنجز التسويات الجردية وأجب عن الأسئلة المحاسبية:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(bldgAnn2024);
				quizQuestion = {
					type: 'calculated',
					questionText: `بناءات تكلفتها $${formatDzd(bldgV0)}$ دج مقتناة في $01/01/2020$، وبلغ اهتلاكها المتراكم حتى $31/12/2023$ (4 سنوات) مبلغ $${formatDzd(bldgAcc2023)}$ دج. احسب قسط اهتلاكها السنوي لسنة $2024$.`,
					questionTextAr: 'احسب قسط اهتلاك سنة 2024:',
					questionData: { answer: bldgAnn2024, displayTemplate: 'القسط = ? دج', variables: [], tolerance: 0.01 },
					explanation: `القسط السنوي الثابت $= \\frac{${formatDzd(bldgAcc2023)}}{4} = ${formatDzd(bldgAnn2024)}$ دج (بمعدل $4\\%$).`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(total685);
				quizQuestion = {
					type: 'calculated',
					questionText: `في تسويات نهاية السنة، كُوّنت خسارة قيمة للبضائع بمبلغ $${formatDzd(invPvNew)}$ دج، وخسارة للزبون حسام ($30\\%$ من دينه خارج الرسم البالغ $${formatDzd(custHt)}$ دج). احسب مجموع مخصصات الأصول الجارية المسجلة في حـ/ 685.`,
					questionTextAr: 'احسب مجموع حـ/ 685 (بالدج):',
					questionData: { answer: total685, displayTemplate: 'حـ/ 685 = ? دج', variables: [], tolerance: 0.01 },
					explanation: `خسارة الزبون $= ${formatDzd(custHt)} \\times 0.30 = ${formatDzd(custPv)}$ دج؛ مجموع حـ/ $685 = ${formatDzd(invPvNew)} + ${formatDzd(custPv)} = ${formatDzd(total685)}$ دج.`
				};
			} else {
				finalAnswer = String(total681 + total685);
				quizQuestion = {
					type: 'calculated',
					questionText: `احسب مجموع مخصصات الاهتلاك وخسائر القيمة الإجمالي (حـ/ 681 + حـ/ 685) الناتج عن قسط البناءات ($${formatDzd(bldgAnn2024)}$ دج)، وخسارة البضائع ($${formatDzd(invPvNew)}$ دج)، وخسارة الزبون ($${formatDzd(custPv)}$ دج).`,
					questionTextAr: 'احسب مجموع حـ/ 68:',
					questionData: { answer: total681 + total685, displayTemplate: 'حـ/ 68 = ? دج', variables: [], tolerance: 0.01 },
					explanation: `$${formatDzd(total681)} + ${formatDzd(total685)} = ${formatDzd(total681 + total685)}$ دج.`
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
					'لإيجاد قسط البناءات اقسم الاهتلاك المتراكم قبل الجرد على عدد السنوات السابقة ($4$ سنوات).',
					'فرق الجرد غير المبرر للمخزون يُسوى بحساب 657، ثم تقاس خسارة 390 مقارنة بالجرد المادي.',
					'حول الزبون العادي بكامل TTC (416 إلى 411) ثم احسب الخسارة على الرصيد HT.'
				],
				solutionStepsAr: [
					`البناءات: المعدل $4\\%$، قسط $2024 = ${formatDzd(bldgAnn2024)}$ دج.`,
					`البضائع: فرق غير مبرر $= ${formatDzd(invDiff)}$ دج (657 ← 30)؛ خسارة $390 = ${formatDzd(invPvNew)}$ دج (685 ← 390).`,
					`الزبون حسام: تحويل بـ $${formatDzd(custTtc)}$ دج (416 ← 411)؛ خسارة $30\\%$ على $HT = ${formatDzd(custPv)}$ دج (685 ← 491).`
				],
				finalAnswer
			};
		}
	}
];
