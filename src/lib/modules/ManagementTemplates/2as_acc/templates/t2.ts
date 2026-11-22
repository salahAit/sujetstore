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
// 2AS GE Accounting & Finance (التسيير المحاسبي والمالي) — T2 Templates (5)
// 100% HALAL & RIBA-FREE: NO usurious discounting of commercial papers!
// ═══════════════════════════════════════════════════════════════════════════════

const COMPANIES_T2 = [
	'مؤسسة الهضاب التجارية',
	'مؤسسة تلمسان للتجهيز',
	'مؤسسة سطيف الصناعية',
	'مؤسسة الواحات للتوزيع',
	'مؤسسة جرجرة للتوريد'
];

export const TEMPLATES_2AS_ACC_T2: ManagementParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. الفاتورة العادية بالتخفيضات المتتالية والـ TVA والجرد الدائم (6 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_2as_acc_t2_invoice_discounts_vat',
		grade: '2as_acc',
		trimesterId: 't2',
		domain: 'acc_operations',
		titleAr: 'الفاتورة العادية: التخفيضات المتتالية، الـ TVA، وقيود الجرد الدائم',
		curriculumLessonId: 'mgt_lesson_2as_acc_t2_purchases_sales_vat',
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const seller = rng.pick(COMPANIES_T2);
			const mb = rng.int(2, 6) * 200_000;
			const r1Pct = rng.pick([5, 10]);
			const r2Pct = difficulty === 'easy' ? 0 : rng.pick([5, 4]);
			const escPct = difficulty === 'hard' ? 2 : 0;
			const tvaPct = 19;

			const rab1 = roundTo(mb * (r1Pct / 100), 2);
			const nc1 = roundTo(mb - rab1, 2);
			const rab2 = roundTo(nc1 * (r2Pct / 100), 2);
			const ncFinal = roundTo(nc1 - rab2, 2);
			const escompte = roundTo(ncFinal * (escPct / 100), 2);
			const ht = roundTo(ncFinal - escompte, 2);
			const tva = roundTo(ht * (tvaPct / 100), 2);
			const ttc = roundTo(ht + tva, 2);
			const cogs = roundTo(mb * 0.6, 2);

			const invoiceRows: Array<Array<{ label?: string; answer?: string; mark?: string; bold?: boolean }>> = [
				[{ label: 'المبلغ الخام للبضاعة (MB)' }, { label: formatDzd(mb) }],
				[{ label: `التخفيض التجاري الأول (${r1Pct}%)` }, { label: formatDzd(rab1) }],
				[{ label: 'الصافي التجاري الأول' }, { label: '........', answer: formatDzd(nc1), mark: '0.5' }]
			];
			if (r2Pct > 0) {
				invoiceRows.push([
					{ label: `التخفيض التجاري الثاني (${r2Pct}%)` },
					{ label: formatDzd(rab2) }
				]);
				invoiceRows.push([
					{ label: 'الصافي التجاري النهائي (NC)' },
					{ label: '........', answer: formatDzd(ncFinal), mark: '0.5' }
				]);
			} else {
				invoiceRows.push([
					{ label: 'الصافي التجاري النهائي (المسجل في حـ/ 700)' },
					{ label: '........', answer: formatDzd(ncFinal), mark: '0.5' }
				]);
			}
			if (escPct > 0) {
				invoiceRows.push([
					{ label: `حسم تعجيل الدفع (${escPct}%)` },
					{ label: formatDzd(escompte) }
				]);
			}
			invoiceRows.push([
				{ label: 'الصافي خارج الرسم (HT)' },
				{ label: '........', answer: formatDzd(ht), mark: '0.5' }
			]);
			invoiceRows.push([
				{ label: `الرسم على القيمة المضافة TVA (${tvaPct}%)` },
				{ label: '........', answer: formatDzd(tva), mark: '0.5' }
			]);
			invoiceRows.push([
				{ label: 'المبلغ الصافي للدفع متضمن الرسم (TTC)', bold: true },
				{ label: '........', answer: formatDzd(ttc), mark: '0.5' }
			]);

			// Marks in invoiceRows = 0.5 * 5 = 2.5? Wait: let's check both branches of r2Pct!
			// In both branches: NC1 (0.5) + NCFinal (0.5) + HT (0.5) + TVA (0.5) + TTC (0.5) = 2.5!
			// Let's add 1.5 for seller invoice journal + 1 for seller COGS exit journal + 1 for buyer stock entry Q = 6.0!

			const journalRows: Array<Array<{ label?: string; answer?: string; mark?: string; bold?: boolean }>> = [
				[
					{ label: '........', answer: escPct > 0 ? '512 / 668' : '411', mark: '0.5' },
					{ label: '' },
					{
						label: escPct > 0 ? 'من حـ/ البنك وحـ/ 668 حسم ممنوح' : 'من حـ/ الزبائن',
						answer: escPct > 0 ? `512 (${formatDzd(ttc)}) + 668 (${formatDzd(escompte)})` : `الزبائن (${formatDzd(ttc)})`
					},
					{ label: '........', answer: formatDzd(escPct > 0 ? ttc + escompte : ttc), mark: '0.5' },
					{ label: '' }
				],
				[
					{ label: '' },
					{ label: '........', answer: '700 / 4457', mark: '0.5' },
					{
						label: 'إلى حـ/ مبيعات البضائع وTVA محصلة',
						answer: `700 (${formatDzd(ncFinal)}) + 4457 (${formatDzd(tva)})`
					},
					{ label: '' },
					{ label: formatDzd(ncFinal + tva) }
				]
			];

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `فاتورة بيع بضاعة — ${seller}`,
					text: `بتاريخ 14 أفريل باعت ${seller} بضاعة لزبونها بمبلغ خام ${formatDzd(mb)} دج، بتخفيض تجاري أول ${r1Pct}%${r2Pct > 0 ? `، وتخفيض تجاري ثانٍ ${r2Pct}%` : ''}${escPct > 0 ? `، وحسم تعجيل دفع فوري ${escPct}% (سُددت بشيك)` : ' (على الحساب)'}، ومعدل الـ TVA ${tvaPct}%. علماً أن تكلفة شراء البضاعة المباعة لدى ${seller} هي ${formatDzd(cogs)} دج.`
				}),
				{
					type: 'text',
					content: '1) أكمل جدول عناصر الفاتورة الآتي:'
				},
				buildManagementTableBlock(['البيان', 'المبلغ (دج)'], invoiceRows, 'center'),
				{
					type: 'text',
					content: `2) سجل قيد الفاتورة في يومية المورد (${seller}):`
				},
				buildManagementTableBlock(
					['رقم الحساب (مدين)', 'رقم الحساب (دائن)', 'البيان / اسم الحساب', 'المبلغ المدين (دج)', 'المبلغ الدائن (دج)'],
					journalRows
				),
				{
					type: 'text',
					content: `3) سجل قيد إخراج البضاعة من مخزن المورد (${seller}) وفق الجرد الدائم:`,
					answer: `مدين حـ/ 600 مشتريات البضائع المبيعة ($${formatDzd(cogs)}$ دج) / دائن حـ/ 30 مخزونات البضائع ($${formatDzd(cogs)}$ دج).`,
					mark: '1'
				},
				{
					type: 'text',
					content: '4) ما القيمة التي يُدخل بها الزبون هذه البضاعة إلى مخزنه (حـ/ 30)؟ برّر إجابتك.',
					answer: `يُدخل الزبون البضاعة إلى حـ/ 30 بالصافي التجاري ($${formatDzd(ncFinal)}$ دج) لأن كلاً من حسم تعجيل الدفع (حـ/ 768) والـ TVA القابلة للاسترجاع (حـ/ 4456) لا يدخلان في تكلفة الشراء.`,
					mark: '1'
				}
			];

			const sujetExercise: ExerciseBlock = {
				points: 6,
				instruction: 'أتمم الفاتورة وسجل القيود المحاسبية وفق الجرد الدائم:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(ncFinal);
				quizQuestion = {
					type: 'calculated',
					questionText: `باعت ${seller} بضاعة بمبلغ خام $${formatDzd(mb)}$ دج مع تخفيض تجاري $${r1Pct}\\%$. احسب الصافي التجاري المسجل في حـ/ 700.`,
					questionTextAr: 'احسب الصافي التجاري (بالدج):',
					questionData: { answer: ncFinal, displayTemplate: 'NC = ? دج', variables: [], tolerance: 0.01 },
					explanation: `$NC = ${formatDzd(mb)} - (${formatDzd(mb)} \\times ${r1Pct / 100}) = ${formatDzd(ncFinal)}$ دج.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(ttc);
				quizQuestion = {
					type: 'calculated',
					questionText: `بلغ الصافي التجاري (خارج الرسم) لفاتورة بضاعة $${formatDzd(ht)}$ دج بمعدل TVA قدره $19\\%$. احسب المبلغ الصافي للدفع متضمن الرسم (TTC).`,
					questionTextAr: 'احسب المبلغ متضمن الرسم TTC:',
					questionData: { answer: ttc, displayTemplate: 'TTC = ? دج', variables: [], tolerance: 0.5 },
					explanation: `$TTC = ${formatDzd(ht)} \\times 1.19 = ${formatDzd(ttc)}$ دج.`
				};
			} else {
				finalAnswer = String(ht);
				quizQuestion = {
					type: 'calculated',
					questionText: `بضاعة بمبلغ خام $${formatDzd(mb)}$ دج، خضعت لتخفيضين تجاريين متتاليين $${r1Pct}\\%$ ثم $${r2Pct}\\%$، ثم حسم تعجيل الدفع $${escPct}\\%$. احسب الصافي المالي خارج الرسم (HT).`,
					questionTextAr: 'احسب الصافي خارج الرسم HT:',
					questionData: { answer: ht, displayTemplate: 'HT = ? دج', variables: [], tolerance: 0.5 },
					explanation: `الصافي التجاري الأول $= ${formatDzd(nc1)}$، الصافي التجاري الثاني $= ${formatDzd(ncFinal)}$، وبعد طرح حسم التعجيل ($${formatDzd(escompte)}$) نجد $HT = ${formatDzd(ht)}$ دج.`
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
					'التخفيضات التجارية تحسب متتالية: كل نسبة تطبق على الصافي السابق لا على المبلغ الخام.',
					'حسم تعجيل الدفع يطبق على آخر صافي تجاري، وتُحسب TVA على الصافي المالي (HT).',
					'في الجرد الدائم: قيد البيع بسعر البيع يتبعه فوراً قيد إخراج المخزون بتكلفة الشراء (600 إلى 30).'
				],
				solutionStepsAr: [
					`الصافي التجاري النهائي $= ${formatDzd(ncFinal)}$ دج.`,
					escPct > 0
						? `حسم تعجيل الدفع $= ${formatDzd(escompte)}$ دج؛ الصافي خارج الرسم $= ${formatDzd(ht)}$ دج.`
						: `الصافي خارج الرسم $= ${formatDzd(ht)}$ دج.`,
					`مبلغ الـ TVA ($19\\%$) $= ${formatDzd(tva)}$ دج؛ المبلغ المتضمن للرسم $TTC = ${formatDzd(ttc)}$ دج.`,
					`قيد إخراج المخزون: من حـ/ 600 إلى حـ/ 30 بمبلغ $${formatDzd(cogs)}$ دج.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. تسوية الـ TVA والتغليفات التجارية المسترجعة (6 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_2as_acc_t2_vat_settlement_packaging',
		grade: '2as_acc',
		trimesterId: 't2',
		domain: 'acc_operations',
		titleAr: 'تسوية الرسم على القيمة المضافة (TVA) والتغليفات المتداولة',
		curriculumLessonId: 'mgt_lesson_2as_acc_t2_packaging_commercial_papers',
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_T2);
			const isCreditTva = difficulty === 'hard';
			const tvaCollected = rng.int(12, 24) * 10_000;
			const tvaRecoverable = isCreditTva
				? tvaCollected + rng.int(2, 6) * 10_000
				: tvaCollected - rng.int(3, 8) * 10_000;
			const vatDiff = Math.abs(tvaCollected - tvaRecoverable);

			const totalConsign = rng.int(4, 9) * 10_000; // أمانات التغليفات
			const returnedPct = rng.pick([60, 75, 80]);
			const returnedAmt = (totalConsign * returnedPct) / 100;
			const keptAmt = totalConsign - returnedAmt;
			const keptTva = roundTo(keptAmt * 0.19, 2);

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `العمليات الجبائية والتغليفات — ${company}`,
					text: `أولاً (تسوية TVA شهر مارس): بلغت الـ TVA المحصلة (حـ/ 4457) ${formatDzd(tvaCollected)} دج، وبلغت الـ TVA القابلة للاسترجاع (حـ/ 4456) ${formatDzd(tvaRecoverable)} دج.\nثانياً (التغليفات المتداولة): أودعت ${company} لدى موردها مبلغ ${formatDzd(totalConsign)} دج كأمانة عن صناديق تغليف متداولة (حـ/ 4096). في نهاية الشهر أرجعت ${returnedPct}% منها بحالة سليمة واحتفظت بالباقي نهائياً (يخضع للـ TVA بمعدل 19%).`
				}),
				{
					type: 'text',
					content: '1) احسب مبلغ الـ TVA واجبة الدفع (أو قرض TVA) لشهر مارس وسجل قيد التسوية:'
				},
				buildManagementTableBlock(
					['العنصر المحاسبي', 'الحساب المدين', 'الحساب الدائن', 'المبلغ (دج)'],
					[
						[
							{ label: isCreditTva ? 'قرض TVA مرحل (44567)' : 'TVA واجبة الدفع (4455)' },
							{ label: '........', answer: isCreditTva ? '4457 و 44567' : '4457', mark: '0.5' },
							{ label: '........', answer: isCreditTva ? '4456' : '4456 و 4455', mark: '0.5' },
							{ label: '........', answer: formatDzd(vatDiff), mark: '1' }
						]
					]
				),
				{
					type: 'text',
					content: '2) احسب قيمة الصناديق المرجعة وقيمة الصناديق المحتفظ بها وTVA المطبقة عليها، ثم أتمم جدول التسوية لدى المؤسسة:'
				},
				buildManagementTableBlock(
					['البيان', 'الحسابات المتدخلة', 'المبلغ (دج)'],
					[
						[
							{ label: `إرجاع ${returnedPct}% من التغليفات للمورد` },
							{ label: '........', answer: 'مدين حـ/ 401 / دائن حـ/ 4096', mark: '1' },
							{ label: '........', answer: formatDzd(returnedAmt), mark: '0.5' }
						],
						[
							{ label: 'الاحتفاظ بباقي التغليفات (تكلفة حـ/ 6026)' },
							{ label: '........', answer: 'مدين حـ/ 6026 وحـ/ 4456 / دائن حـ/ 4096 وحـ/ 401', mark: '1' },
							{ label: '........', answer: formatDzd(keptAmt), mark: '1' }
						],
						[
							{ label: 'الـ TVA على التغليفات المحتفظ بها (19%)' },
							{ label: 'تُسجل في مدين حـ/ 4456 ودائن حـ/ 401' },
							{ label: '........', answer: formatDzd(keptTva), mark: '0.5' }
						]
					]
				)
			];

			const sujetExercise: ExerciseBlock = {
				points: 6,
				instruction: 'أنجز التسوية المحاسبية لكل من الرسم على القيمة المضافة والتغليفات المسترجعة:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(returnedAmt);
				quizQuestion = {
					type: 'calculated',
					questionText: `أودعت ${company} أمانة تغليفات مسترجعة بقيمة $${formatDzd(totalConsign)}$ دج ثم أرجعت $${returnedPct}\\%$ منها بحالة سليمة. ما قيمة الأمانة المستردة (بالدج)؟`,
					questionTextAr: 'احسب قيمة التغليفات المرجعة:',
					questionData: { answer: returnedAmt, displayTemplate: 'القيمة المرجعة = ? دج', variables: [], tolerance: 0.01 },
					explanation: `القيمة المرجعة $= ${formatDzd(totalConsign)} \\times \\frac{${returnedPct}}{100} = ${formatDzd(returnedAmt)}$ دج.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(vatDiff);
				quizQuestion = {
					type: 'calculated',
					questionText: `بلغت الـ TVA المحصلة خلال الشهر $${formatDzd(tvaCollected)}$ دج، والـ TVA القابلة للاسترجاع $${formatDzd(tvaRecoverable)}$ دج. احسب قيمة ${isCreditTva ? 'قرض الـ TVA' : 'الـ TVA واجبة الدفع'} (بالدج).`,
					questionTextAr: 'احسب رصيد تسوية الـ TVA:',
					questionData: { answer: vatDiff, displayTemplate: 'الفرق = ? دج', variables: [], tolerance: 0.01 },
					explanation: `الفرق بين المحصلة والقابلة للاسترجاع يساوي $${formatDzd(vatDiff)}$ دج.`
				};
			} else {
				finalAnswer = String(keptTva);
				quizQuestion = {
					type: 'calculated',
					questionText: `من أمانة تغليفات قدرها $${formatDzd(totalConsign)}$ دج، احتفظ الزبون بنسبة $${100 - returnedPct}\\%$ نهائياً وتخضع للـ TVA بمعدل $19\\%$. احسب مبلغ الـ TVA الواجب إثباته عند تحويل التغليفات إلى شراء نهائي.`,
					questionTextAr: 'احسب مبلغ الـ TVA على التغليفات المحتفظ بها:',
					questionData: { answer: keptTva, displayTemplate: 'TVA = ? دج', variables: [], tolerance: 0.5 },
					explanation: `قيمة التغليفات المحتفظ بها $= ${formatDzd(keptAmt)}$ دج؛ الـ TVA $= ${formatDzd(keptAmt)} \\times 0.19 = ${formatDzd(keptTva)}$ دج.`
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
					'عند تفوق 4457 على 4456 يكون الفرق TVA واجبة الدفع (4455 دائن)؛ والعكس يعطي قرض TVA (44567 مدين).',
					'الأمانات المدفوعة عن التغليفات تسجل في حـ/ 4096 عند المشتري ولا تخضع للـ TVA عند الإيداع.',
					'عند عدم إرجاع التغليفات تتحول إلى شراء نهائي (حـ/ 6026) وتخضع لقيمة الـ TVA.'
				],
				solutionStepsAr: [
					isCreditTva
						? `بما أن $4456 > 4457$، ينشأ قرض TVA (حـ/ 44567) بمبلغ $${formatDzd(vatDiff)}$ دج.`
						: `بما أن $4457 > 4456$، تنشأ TVA واجبة الدفع (حـ/ 4455) بمبلغ $${formatDzd(vatDiff)}$ دج.`,
					`التغليفات المرجعة $= ${formatDzd(returnedAmt)}$ دج (من حـ/ 401 إلى حـ/ 4096).`,
					`التغليفات المحتفظ بها $= ${formatDzd(keptAmt)}$ دج والـ TVA عليها $= ${formatDzd(keptTva)}$ دج.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. الأوراق التجارية المشروعة: الإنشاء والتحصيل عند الاستحقاق دون خصم ربوي (6 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_2as_acc_t2_commercial_papers_maturity',
		grade: '2as_acc',
		trimesterId: 't2',
		domain: 'acc_operations',
		titleAr: 'الأوراق التجارية (الكمبيالة): الإنشاء والتحصيل عند الاستحقاق دون خصم ربوي',
		curriculumLessonId: 'mgt_lesson_2as_acc_t2_packaging_commercial_papers',
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const seller = rng.pick(COMPANIES_T2);
			const nominal = rng.int(15, 40) * 10_000;
			const commHt = rng.pick([400, 500, 600, 800]);
			const commTva = roundTo(commHt * 0.19, 2);
			const netCollected = roundTo(nominal - commHt - commTva, 2);

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `معاملة بالكمبيالة (السفتجة) وفق الضوابط الشرعية — ${seller}`,
					text: `بتاريخ 05 ماي قبل الزبون «سعيد» كمبيالة رقم 18 سحبتها عليه ${seller} بمبلغ ${formatDzd(nominal)} دج تستحق بتاريخ 30 جوان، وذلك لتسديد فاتورة بيع سابقة. ولتحصيل الورقة عند أجلها دون اللجوء إلى أي خصم ربوي محرم:\n• بتاريخ 26 جوان: أرسلت ${seller} الكمبيالة إلى بنكها لتحصيلها عند الاستحقاق.\n• بتاريخ 02 جويلية: استلمت ${seller} إشعاراً بنكياً يفيد بتحصيل الكمبيالة بقيمتها الاسمية، واقتطاع عمولة خدمة التحصيل المصرفية بمبلغ ${formatDzd(commHt)} دج (خاضعة للـ TVA 19%).`
				}),
				{
					type: 'text',
					content: '1) سجل قيود إنشاء الكمبيالة (05/05) وإرسالها للتحصيل (26/06) في يومية المورد، وقيد قبولها ودفعها في يومية الزبون:'
				},
				buildAccountingJournalTable([
					{
						dateLabel: '05/05 (المورد)',
						debitCode: '413',
						creditCode: '411',
						debitName: 'زبائن سندات للتحصيل',
						creditName: 'الزبائن',
						amountStr: formatDzd(nominal),
						narrative: 'قبول الكمبيالة رقم 18',
						isSolutionTarget: true,
						mark: '1'
					},
					{
						dateLabel: '26/06 (المورد)',
						debitCode: '5113',
						creditCode: '413',
						debitName: 'سندات مقبوضة برسم التحصيل',
						creditName: 'زبائن سندات للتحصيل',
						amountStr: formatDzd(nominal),
						narrative: 'إرسال الكمبيالة للبنك للتحصيل عند الاستحقاق',
						isSolutionTarget: true,
						mark: '1'
					},
					{
						dateLabel: '05/05 (الزبون)',
						debitCode: '401',
						creditCode: '403',
						debitName: 'موردو المخزونات والخدمات',
						creditName: 'موردون سندات للدفع',
						amountStr: formatDzd(nominal),
						narrative: 'قبول كمبيالة المورد',
						isSolutionTarget: true,
						mark: '1'
					},
					{
						dateLabel: '30/06 (الزبون)',
						debitCode: '403',
						creditCode: '512',
						debitName: 'موردون سندات للدفع',
						creditName: 'البنوك الحسابات الجارية',
						amountStr: formatDzd(nominal),
						narrative: 'تسديد الكمبيالة عند الاستحقاق',
						isSolutionTarget: true,
						mark: '1'
					}
				]),
				{
					type: 'text',
					content: `2) احسب صافي المبلغ المحول إلى الحساب البنكي لـ ${seller} يوم 02 جويلية وسجل قيد التحصيل النهائي:`,
					answer: `عمولة البنك $= ${formatDzd(commHt)}$ دج (حـ/ 627)، والـ TVA $= ${formatDzd(commTva)}$ دج (حـ/ 4456). الصافي المحصل $= ${formatDzd(nominal)} - (${formatDzd(commHt)} + ${formatDzd(commTva)}) = ${formatDzd(netCollected)}$ دج. القيد: مدين حـ/ 512 ($${formatDzd(netCollected)}$)، حـ/ 627 ($${formatDzd(commHt)}$)، حـ/ 4456 ($${formatDzd(commTva)}$) / دائن حـ/ 5113 ($${formatDzd(nominal)}$).`,
					mark: '2'
				}
			];

			const sujetExercise: ExerciseBlock = {
				points: 6,
				instruction: 'عالج الكمبيالة محاسبياً عند الإنشاء وعند التحصيل المشروع في تاريخ الاستحقاق:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = '413';
				const mcq = buildUniqueMcqOptions(
					'413 (زبائن سندات للتحصيل)',
					[
						{ text: '403 (موردون سندات للدفع)', diagnosticFeedback: 'حـ/ 403 يخص الزبون المسحوب عليه الذي التزم بالدفع.' },
						{ text: '5113 (سندات برسم التحصيل)', diagnosticFeedback: 'حـ/ 5113 يُفتح لاحقاً عند إرسال الورقة للبنك لتحصيلها.' },
						{ text: '411 (الزبائن العاديون)', diagnosticFeedback: 'حـ/ 411 يُرصد في الدائن عند إنشاء الورقة التجارية.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `عند قبول الزبون لكمبيالة بقيمة $${formatDzd(nominal)}$ دج لصالح المورد، ما رقم الحساب المدين في دفاتر المورد؟`,
					questionTextAr: 'اختر رقم الحساب الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: 'المورد يثبت حقه الثابت بالورقة التجارية في مدين حـ/ 413 (أوراق قبض).'
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(netCollected);
				quizQuestion = {
					type: 'calculated',
					questionText: `تم تحصيل كمبيالة بقيمتها الاسمية $${formatDzd(nominal)}$ دج عند تاريخ الاستحقاق عبر البنك، الذي اقتطع عمولة خدمة تحصيل قدرها $${formatDzd(commHt)}$ دج (TVA $19\\%$). احسب الصافي المدخل في الحساب البنكي (حـ/ 512).`,
					questionTextAr: 'احسب الصافي المحول للبنك (بالدج):',
					questionData: { answer: netCollected, displayTemplate: 'الصافي = ? دج', variables: [], tolerance: 0.5 },
					explanation: `$${formatDzd(nominal)} - ${formatDzd(commHt)} - ${formatDzd(commTva)} = ${formatDzd(netCollected)}$ دج.`
				};
			} else {
				const orderedItems = [
					'نشوء الدين التجاري عند بيع البضاعة على الحساب (411 ← 700)',
					'إنشاء الكمبيالة وقبولها من الزبون (413 ← 411)',
					'إرسال الكمبيالة إلى البنك للتحصيل عند الاستحقاق (5113 ← 413)',
					'تحصيل القيمة الاسمية في الحساب البنكي (512 + 627 + 4456 ← 5113)'
				];
				const shuffled = rng.shuffle(orderedItems);
				if (shuffled.every((x, i) => x === orderedItems[i])) {
					[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
				}
				const correctOrder = orderedItems.map((it) => shuffled.indexOf(it));
				finalAnswer = orderedItems.join(' ← ');
				quizQuestion = {
					type: 'ordering',
					questionText: 'رتب المراحل الزمنية المشروعة لمعالجة الكمبيالة لدى المورد من البيع إلى التحصيل عند الاستحقاق:',
					questionTextAr: 'رتب المراحل ترتيباً صحيحاً:',
					questionData: { items: shuffled, correctOrder },
					explanation: 'تبدأ العملية بالبيع (411)، ثم قبول الورقة (413)، ثم الإرسال للتحصيل (5113)، وأخيراً التحصيل الفعلي (512).'
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
					'حـ/ 413 للمورد (ورقة قبض أصل)، وحـ/ 403 للزبون (ورقة دفع خصم).',
					'عند إرسال الورقة للبنك عند الاستحقاق نستعمل الحساب الوسيط حـ/ 5113.',
					'تحصل الورقة بقيمتها الاسمية عند الاستحقاق مقابل أجر خدمة التحصيل الفعلي (627) فقط، دون أي خصم ربوي.'
				],
				solutionStepsAr: [
					`إنشاء الكمبيالة (05/05): عند المورد 413 ← 411 بمبلغ $${formatDzd(nominal)}$ دج؛ عند الزبون 401 ← 403.`,
					`إرسالها للتحصيل (26/06): 5113 ← 413 بمبلغ $${formatDzd(nominal)}$ دج.`,
					`تسديد الزبون (30/06): 403 ← 512 بمبلغ $${formatDzd(nominal)}$ دج.`,
					`التحصيل في 02/07: عمولة 627 ($${formatDzd(commHt)}$) + TVA ($${formatDzd(commTva)}$) + صافي 512 ($${formatDzd(netCollected)}$) = $${formatDzd(nominal)}$ دج.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. حيازة التثبيتات وتسبيقاتها (6 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_2as_acc_t2_fixed_assets_acquisition',
		grade: '2as_acc',
		trimesterId: 't2',
		domain: 'acc_operations',
		titleAr: 'حيازة التثبيتات العينية وتسبيقاتها (215 / 238 / 404)',
		curriculumLessonId: 'mgt_lesson_2as_acc_t2_fixed_assets_acquisition',
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_T2);
			const adv = rng.int(15, 30) * 10_000;
			const rawPrice = rng.int(12, 20) * 100_000;
			const discPct = 5;
			const discAmt = (rawPrice * discPct) / 100;
			const netPrice = rawPrice - discAmt;
			const installCost = rng.int(4, 10) * 10_000;
			const acqCost = netPrice + installCost;
			const tvaAmt = roundTo(acqCost * 0.19, 2);
			const ttc = roundTo(acqCost + tvaAmt, 2);
			const remDue = roundTo(ttc - adv, 2);

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `طلب وحيازة آلة إنتاجية — ${company}`,
					text: `لتعزيز قدراتها الإنتاجية، قامت ${company} بالعمليات الآتية:\n• 02 أفريل: دفعت تسبيقاً لمورد التجهيزات الصناعية بمبلغ ${formatDzd(adv)} دج بشيك بنكي (طلب شراء رقم 09).\n• 20 أفريل: استلمت الآلة مع فاتورة تتضمن: السعر الخام ${formatDzd(rawPrice)} دج، تخفيض تجاري ${discPct}%، مصاريف النقل والتركيب والتهيئة ${formatDzd(installCost)} دج، وTVA بمعدل 19%، والباقي على الحساب يُسدد بعد 45 يوماً.\n• 04 جوان: سُدد الرصيد المتبقي لمورد التثبيتات بتحويل بنكي.`
				}),
				{
					type: 'text',
					content: '1) احسب تكلفة حيازة الآلة (المسجلة في حـ/ 215)، ومبلغ الـ TVA القابلة للاسترجاع، وصافي المستحق لمورد التثبيتات (حـ/ 404).',
					answer: `الصافي التجاري $= ${formatDzd(rawPrice)} - ${formatDzd(discAmt)} = ${formatDzd(netPrice)}$ دج. تكلفة الحيازة $= ${formatDzd(netPrice)} + ${formatDzd(installCost)} = ${formatDzd(acqCost)}$ دج. $"TVA" = ${formatDzd(acqCost)} times 0.19 = ${formatDzd(tvaAmt)}$ دج؛ $"TTC" = ${formatDzd(ttc)}$ دج. الباقي لمورد التثبيتات $= ${formatDzd(ttc)} - ${formatDzd(adv)} = ${formatDzd(remDue)}$ دج.`,
					mark: '2'
				},
				{
					type: 'text',
					content: '2) أكمل جدول التسجيل المحاسبي للعمليات الثلاث في دفتر اليومية:'
				},
				buildManagementTableBlock(
					['التاريخ والبيان', 'الحساب المدين والمبلغ', 'الحساب الدائن والمبلغ'],
					[
						[
							{ label: '02/04: دفع التسبيق بشيك' },
							{ label: '........', answer: `حـ/ 238 (${formatDzd(adv)})`, mark: '0.75' },
							{ label: '........', answer: `حـ/ 512 (${formatDzd(adv)})`, mark: '0.5' }
						],
						[
							{ label: '20/04: استلام الآلة والفاتورة' },
							{
								label: '........',
								answer: `حـ/ 215 (${formatDzd(acqCost)}) + حـ/ 4456 (${formatDzd(tvaAmt)})`,
								mark: '1'
							},
							{
								label: '........',
								answer: `حـ/ 238 (${formatDzd(adv)}) + حـ/ 404 (${formatDzd(remDue)})`,
								mark: '1'
							}
						],
						[
							{ label: '04/06: تسديد مورد التثبيتات' },
							{ label: '........', answer: `حـ/ 404 (${formatDzd(remDue)})`, mark: '0.5' },
							{ label: '........', answer: `حـ/ 512 (${formatDzd(remDue)})`, mark: '0.25' }
						]
					]
				)
			];

			const sujetExercise: ExerciseBlock = {
				points: 6,
				instruction: 'احسب تكلفة الحيازة وأتمم قيود التثبيتات في دفتر اليومية:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(acqCost);
				quizQuestion = {
					type: 'calculated',
					questionText: `اقتنت ${company} آلة إنتاجية بسعر خام $${formatDzd(rawPrice)}$ دج، مع تخفيض تجاري $${discPct}\\%$ ومصاريف نقل وتركيب $${formatDzd(installCost)}$ دج (خارج الرسم). احسب تكلفة الحيازة المسجلة في حـ/ 215.`,
					questionTextAr: 'احسب تكلفة حيازة الآلة (بالدج):',
					questionData: { answer: acqCost, displayTemplate: 'تكلفة الحيازة = ? دج', variables: [], tolerance: 0.01 },
					explanation: `تكلفة الحيازة $= (${formatDzd(rawPrice)} \\times 0.95) + ${formatDzd(installCost)} = ${formatDzd(acqCost)}$ دج.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(remDue);
				quizQuestion = {
					type: 'calculated',
					questionText: `بلغت تكلفة حيازة آلة إنتاجية $${formatDzd(acqCost)}$ دج خارج الرسم (TVA $19\\%$)، وسبق دفع تسبيق قدره $${formatDzd(adv)}$ دج. ما المبلغ المتبقي الواجب إثباته في دائن حـ/ 404 (موردو التثبيتات)؟`,
					questionTextAr: 'احسب الباقي المستحق لحـ/ 404:',
					questionData: { answer: remDue, displayTemplate: 'حـ/ 404 = ? دج', variables: [], tolerance: 0.5 },
					explanation: `$TTC = ${formatDzd(acqCost)} \\times 1.19 = ${formatDzd(ttc)}$ دج؛ الباقي $= ${formatDzd(ttc)} - ${formatDzd(adv)} = ${formatDzd(remDue)}$ دج.`
				};
			} else {
				const pairs = rng.shuffle([
					{ left: 'برمجيات المعلوماتية', right: 'حـ/ 204 (تثبيتات معنوية)' },
					{ left: 'آلات ومعدات صناعية', right: 'حـ/ 215 (تثبيتات عينية)' },
					{ left: 'تسبيقات على طلبات التثبيتات', right: 'حـ/ 238' },
					{ left: 'ديون شراء تثبيتات على الحساب', right: 'حـ/ 404 (موردو التثبيتات)' }
				]);
				finalAnswer = pairs.map((p) => `${p.left} ↔ ${p.right}`).join(' | ');
				quizQuestion = {
					type: 'matching',
					questionText: 'اربط كل عنصر تثبيت برقم الحساب المطابق له في (SCF):',
					questionTextAr: 'طابق بين البيان ورقم الحساب:',
					questionData: { pairs },
					explanation: 'تصنف التثبيتات في الصنف 2 (204، 215، 238) وديونها في حـ/ 404.'
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
					'تكلفة الحيازة تشمل الصافي التجاري + مصاريف النقل والتركيب الضرورية لتشغيل الآلة.',
					'الـ TVA القابلة للاسترجاع تحسب على تكلفة الحيازة الكلية وتُسجل في حـ/ 4456.',
					'التسبيق المدفوع مسبقاً في مدين حـ/ 238 يُرصد في الدائن عند استلام فاتورة الحيازة.'
				],
				solutionStepsAr: [
					`تكلفة الحيازة (حـ/ 215) $= ${formatDzd(netPrice)} + ${formatDzd(installCost)} = ${formatDzd(acqCost)}$ دج.`,
					`الـ TVA ($19\\%$) $= ${formatDzd(tvaAmt)}$ دج؛ الإجمالي $TTC = ${formatDzd(ttc)}$ دج.`,
					`بعد خصم التسبيق ($${formatDzd(adv)}$ دج) يبقى في حـ/ 404 مبلغ $${formatDzd(remDue)}$ دج.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. الأعباء والمنتوجات والتمويل الإسلامي المشروع بالمرابحة والمشاركة (8 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_2as_acc_t2_islamic_finance_murabaha',
		grade: '2as_acc',
		trimesterId: 't2',
		domain: 'acc_operations',
		titleAr: 'الأعباء والمنتوجات والخزينة والتمويل الإسلامي (المرابحة والمشاركة)',
		curriculumLessonId: 'mgt_lesson_2as_acc_t2_expenses_revenues_islamic_finance',
		defaultPoints: 8,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_T2);
			const truckCost = rng.int(12, 20) * 100_000;
			const murabahaMargin = roundTo(truckCost * 0.15, 0);
			const totalMurabaha = truckCost + murabahaMargin;
			const years = 5;
			const annualInstallment = totalMurabaha / years;

			const elecAmt = rng.int(15, 30) * 1_000;
			const elecTva = roundTo(elecAmt * 0.19, 2);
			const insAmt = rng.int(25, 45) * 1_000;
			const subAmt = rng.int(20, 40) * 10_000;

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `ملف التمويل الحلال والعمليات الجارية — ${company}`,
					text: `لاقتناء شاحنة نقل (حـ/ 2182) تكلفتها النقدية ${formatDzd(truckCost)} دج دون اللجوء إلى التمويل الربوي المحرم، أبرمت ${company} بتاريخ 02 ماي عقد مرابحة إسلامية مع مصرف تشاركي بهامش ربح معلوم وثابت قدره ${formatDzd(murabahaMargin)} دج يسدد الإجمالي على ${years} أقساط سنوية متساوية.\nوخلال الشهر نفسه قامت بالعمليات الآتية:\n1) 10 ماي: دفع فاتورة الكهرباء والغاز بمبلغ ${formatDzd(elecAmt)} دج (HT، TVA 19%) عبر الحساب البريدي الجاري (CCP 517).\n2) 15 ماي: دفع قسط التأمين السنوي على الشاحنة بمبلغ ${formatDzd(insAmt)} دج بشيك بنكي.\n3) 22 ماي: استلام إعانة استغلال من الولاية بمبلغ ${formatDzd(subAmt)} دج بتحويل بنكي.`
				}),
				{
					type: 'text',
					content: '1) احسب الثمن الإجمالي لعقد المرابحة وقيمة القسط السنوي الثابت، وبيّن الضابط الشرعي الذي يميز المرابحة عن القرض الربوي.',
					answer: `الثمن الإجمالي للمرابحة $= ${formatDzd(truckCost)} + ${formatDzd(murabahaMargin)} = ${formatDzd(totalMurabaha)}$ دج. القسط السنوي الثابت $= frac(${formatDzd(totalMurabaha)}, ${years}) = ${formatDzd(annualInstallment)}$ دج. الضابط الشرعي: يتملك المصرف الشاحنة أولاً ثم يبيعها بثمن معلوم وهامش ربح ثابت لا يزيد عند التأخير.`,
					mark: '2'
				},
				{
					type: 'text',
					content: '2) سجل العمليات الجارية (10، 15، 22 ماي) وعملية اقتناء الشاحنة بالمرابحة (02 ماي) في دفتر اليومية:'
				},
				buildManagementTableBlock(
					['التاريخ والعملية', 'الحساب المدين والمبلغ', 'الحساب الدائن والمبلغ'],
					[
						[
							{ label: '02/05: استلام الشاحنة بعقد المرابحة' },
							{ label: '........', answer: `حـ/ 2182 (${formatDzd(truckCost)}) + حـ/ 668/486 هامش مؤجل (${formatDzd(murabahaMargin)})`, mark: '1' },
							{ label: '........', answer: `حـ/ 168 تمويلات مرابحة (${formatDzd(totalMurabaha)})`, mark: '1' }
						],
						[
							{ label: '10/05: فاتورة الكهرباء والغاز عبر CCP' },
							{ label: '........', answer: `حـ/ 607 (${formatDzd(elecAmt)}) + حـ/ 4456 (${formatDzd(elecTva)})`, mark: '1' },
							{ label: '........', answer: `حـ/ 517 (${formatDzd(elecAmt + elecTva)})`, mark: '1' }
						],
						[
							{ label: '15/05: دفع تأمين الشاحنة بشيك' },
							{ label: '........', answer: `حـ/ 616 (${formatDzd(insAmt)})`, mark: '0.5' },
							{ label: '........', answer: `حـ/ 512 (${formatDzd(insAmt)})`, mark: '0.5' }
						],
						[
							{ label: '22/05: استلام إعانة استغلال بالبنك' },
							{ label: '........', answer: `حـ/ 512 (${formatDzd(subAmt)})`, mark: '0.5' },
							{ label: '........', answer: `حـ/ 74 (${formatDzd(subAmt)})`, mark: '0.5' }
						]
					]
				)
			];

			const sujetExercise: ExerciseBlock = {
				points: 8,
				instruction: 'حلل عقد المرابحة الإسلامية وسجل العمليات في دفتر اليومية:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(annualInstallment);
				quizQuestion = {
					type: 'calculated',
					questionText: `اقتنت ${company} شاحنة بتكلفة نقدية $${formatDzd(truckCost)}$ دج عبر عقد مرابحة إسلامية بهامش ربح معلوم وثابت قدره $${formatDzd(murabahaMargin)}$ دج، تُسدد على $${years}$ أقساط سنوية متساوية. احسب قيمة القسط السنوي (بالدج).`,
					questionTextAr: 'احسب القسط السنوي للمرابحة:',
					questionData: { answer: annualInstallment, displayTemplate: 'القسط = ? دج', variables: [], tolerance: 0.01 },
					explanation: `الثمن الإجمالي $= ${formatDzd(truckCost)} + ${formatDzd(murabahaMargin)} = ${formatDzd(totalMurabaha)}$ دج؛ القسط السنوي $= \\frac{${formatDzd(totalMurabaha)}}{${years}} = ${formatDzd(annualInstallment)}$ دج.`
				};
			} else if (difficulty === 'medium') {
				const totalElecTtc = roundTo(elecAmt + elecTva, 2);
				finalAnswer = String(totalElecTtc);
				quizQuestion = {
					type: 'calculated',
					questionText: `سددت ${company} عبر الحساب البريدي الجاري (حـ/ 517) فاتورة كهرباء وغاز بمبلغ $${formatDzd(elecAmt)}$ دج خارج الرسم (TVA $19\\%$). ما المبلغ الإجمالي المقتطع من حـ/ 517؟`,
					questionTextAr: 'احسب المبلغ المقتطع من CCP:',
					questionData: { answer: totalElecTtc, displayTemplate: 'TTC = ? دج', variables: [], tolerance: 0.5 },
					explanation: `$TTC = ${formatDzd(elecAmt)} \\times 1.19 = ${formatDzd(totalElecTtc)}$ دج.`
				};
			} else {
				const items = rng.shuffle([
					{ text: 'المرابحة للآمر بالشراء', category: 0 },
					{ text: 'المشاركة في رأس المال والربح والخسارة', category: 0 },
					{ text: 'الإجارة المنتهية بالتمليك', category: 0 },
					{ text: 'القرض الربوي المشروط بالزيادة', category: 1 },
					{ text: 'بيع الورقة التجارية قبل الاستحقاق بعوض أقل (ربا)', category: 1 }
				]);
				const categories = ['تمويل إسلامي مشروع', 'معاملة ربوية محظورة'];
				finalAnswer = items.map((it) => `${it.text} ← ${categories[it.category]}`).join(' | ');
				quizQuestion = {
					type: 'drag_drop',
					questionText: 'صنف صيغ التمويل والمعاملات المالية الآتية حسب مشروعيتها:',
					questionTextAr: 'صنف كل صيغة في الخانة المناسبة:',
					questionData: { categories, items },
					explanation: 'المرابحة والمشاركة والإجارة صيغ تمويل إسلامي مشروع؛ أما القروض الربوية وبيع الورقة التجارية بعقد ربوي فمحرمة شرعاً.'
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
					'قسط المرابحة السنوي = (التكلفة النقدية + هامش الربح المعلوم) ÷ عدد السنوات.',
					'الكهرباء والغاز تُسجل في حـ/ 607، والتأمين في حـ/ 616، وإعانات الاستغلال في دائن حـ/ 74.',
					'في عقد المرابحة يتملك المصرف السلعة فعلاً ويُحدد الثمن نهائياً دون زيادة ربوية.'
				],
				solutionStepsAr: [
					`ثمن المرابحة الإجمالي $= ${formatDzd(totalMurabaha)}$ دج، والقسط السنوي $= ${formatDzd(annualInstallment)}$ دج.`,
					`فاتورة الكهرباء عبر CCP: مدين حـ/ 607 ($${formatDzd(elecAmt)}$) وحـ/ 4456 ($${formatDzd(elecTva)}$) / دائن حـ/ 517 ($${formatDzd(elecAmt + elecTva)}$).`,
					`التأمين: حـ/ 616 ← حـ/ 512 ($${formatDzd(insAmt)}$)؛ إعانة الاستغلال: حـ/ 512 ← حـ/ 74 ($${formatDzd(subAmt)}$).`
				],
				finalAnswer
			};
		}
	}
];
