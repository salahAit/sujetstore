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
// 3AS GE BAC Accounting & Finance (التسيير المحاسبي والمالي) — T3 Templates (5)
// 100% HALAL & RIBA-FREE: Project evaluation via CAF & DR ONLY!
// ═══════════════════════════════════════════════════════════════════════════════

const COMPANIES_3AS_T3 = [
	'مؤسسة الونشريس الصناعية',
	'مؤسسة متيجة للتحويل',
	'مؤسسة الصومام الغذائية',
	'مؤسسة الأوراس للتغليف',
	'مؤسسة تيبازة للمنتجات'
];

export const TEMPLATES_3AS_ACC_T3: ManagementParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. جدول توزيع الأعباء غير المباشرة والتوزيع التبادلي (6 ن)
	// MUST INCLUDE: buildIllustratedFigureBlock('mgt_05_cost_accounting_cycle', { pins: [], mode: 'image_only' })
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_3as_acc_t3_indirect_costs_table',
		grade: '3as_acc',
		trimesterId: 't3',
		domain: 'acc_cost_analysis',
		titleAr: 'جدول توزيع الأعباء غير المباشرة (التوزيع التبادلي وتكلفة وحدة القياس)',
		curriculumLessonId: 'mgt_lesson_3as_acc_t3_cost_allocation_purchase',
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_3AS_T3);

			// Reverse-engineer X and Y so they are ALWAYS clean multiples of 50,000!
			// Admin (X) gives 20% to Maint (Y); Maint (Y) gives 10% to Admin (X).
			const X = rng.int(2, 5) * 50_000;
			const Y = rng.int(3, 6) * 50_000;
			const primX = X - 0.1 * Y;
			const primY = Y - 0.2 * X;

			// Shares from X (20% to Y, 30% Supply, 30% Prod, 20% Dist)
			const xToY = 0.2 * X;
			const xToSup = 0.3 * X;
			const xToProd = 0.3 * X;
			const xToDist = 0.2 * X;

			// Shares from Y (10% to X, 20% Supply, 50% Prod, 20% Dist)
			const yToX = 0.1 * Y;
			const yToSup = 0.2 * Y;
			const yToProd = 0.5 * Y;
			const yToDist = 0.2 * Y;

			// Choose primary totals for Basic centers so Secondary Totals divide cleanly by units!
			const uoSup = 1_000; // كلغ مادة أولية مشتراة
			const uoProd = 500; // ساعة عمل مباشرة
			const uoDist = 2_000; // 100 دج من رقم الأعمال

			const remSup = (xToSup + yToSup) % uoSup;
			const primSup = rng.int(60, 120) * 1_000 - remSup;
			const secSup = primSup + xToSup + yToSup;
			const cuoSup = secSup / uoSup;

			const remProd = (xToProd + yToProd) % uoProd;
			const primProd = rng.int(120, 220) * 1_000 - remProd;
			const secProd = primProd + xToProd + yToProd;
			const cuoProd = secProd / uoProd;

			const remDist = (xToDist + yToDist) % uoDist;
			const primDist = rng.int(70, 130) * 1_000 - remDist;
			const secDist = primDist + xToDist + yToDist;
			const cuoDist = secDist / uoDist;

			const content: ContentBlock[] = [
				buildIllustratedFigureBlock('mgt_05_cost_accounting_cycle', {
					pins: [],
					mode: 'image_only',
					width: '68%',
					maxHeight: 132
				}),
				buildManagementDocumentBlock({
					title: `بيانات جدول الأعباء غير المباشرة — ${company}`,
					text: `توزع الأعباء غير المباشرة لـ ${company} على قسمين مساعدين (الإدارة والصيانة) وثلاثة أقسام أساسية (التموين، الإنتاج، التوزيع):\n• التوزيع الأولي: الإدارة (${formatDzd(primX)} دج)، الصيانة (${formatDzd(primY)} دج)، التموين (${formatDzd(primSup)} دج)، الإنتاج (${formatDzd(primProd)} دج)، التوزيع (${formatDzd(primDist)} دج).\n• التبادل الثانوي: تتوزع الإدارة بنسبة 20% للصيانة، 30% للتموين، 30% للإنتاج، 20% للتوزيع؛ وتتوزع الصيانة بنسبة 10% للإدارة، 20% للتموين، 50% للإنتاج، 20% للتوزيع.\n• عدد وحدات القياس: التموين (${formatDzd(uoSup)} كلغ)، الإنتاج (${formatDzd(uoProd)} ساعة)، التوزيع (${formatDzd(uoDist)} وحدة مبيعات).`
				}),
				{
					type: 'text',
					content: '1) اكتب جملة معادلتي التوزيع التبادلي ثم أوجد مجموع قسم الإدارة ($X$) وقسم الصيانة ($Y$).',
					answer: `$X = ${formatDzd(primX)} + 0.1 Y$ و $Y = ${formatDzd(primY)} + 0.2 X$. بالتعويض: $0.98 X = ${formatDzd(primX + 0.1 * primY)} ==> X = ${formatDzd(X)}$ دج، ومنه $Y = ${formatDzd(Y)}$ دج.`,
					mark: '2'
				},
				{
					type: 'text',
					content: '2) أكمل جدول توزيع الأعباء غير المباشرة واحسب تكلفة وحدة القياس ($"CUO"$):'
				},
				buildManagementTableBlock(
					['البيان', 'الإدارة', 'الصيانة', 'التموين', 'الإنتاج', 'التوزيع'],
					[
						[
							{ label: 'مجموع التوزيع الأولي' },
							{ label: formatDzd(primX) },
							{ label: formatDzd(primY) },
							{ label: formatDzd(primSup) },
							{ label: formatDzd(primProd) },
							{ label: formatDzd(primDist) }
						],
						[
							{ label: 'توزيع الإدارة (X)' },
							{ label: `(${formatDzd(X)})` },
							{ label: formatDzd(xToY) },
							{ label: formatDzd(xToSup) },
							{ label: formatDzd(xToProd) },
							{ label: formatDzd(xToDist) }
						],
						[
							{ label: 'توزيع الصيانة (Y)' },
							{ label: formatDzd(yToX) },
							{ label: `(${formatDzd(Y)})` },
							{ label: formatDzd(yToSup) },
							{ label: formatDzd(yToProd) },
							{ label: formatDzd(yToDist) }
						],
						[
							{ label: 'مجموع التوزيع الثانوي', bold: true },
							{ label: '0' },
							{ label: '0' },
							{ label: '........', answer: formatDzd(secSup), mark: '0.75' },
							{ label: '........', answer: formatDzd(secProd), mark: '0.75' },
							{ label: '........', answer: formatDzd(secDist), mark: '0.5' }
						],
						[
							{ label: 'عدد وحدات القياس' },
							{ label: '—' },
							{ label: '—' },
							{ label: formatDzd(uoSup) },
							{ label: formatDzd(uoProd) },
							{ label: formatDzd(uoDist) }
						],
						[
							{ label: 'تكلفة وحدة القياس (C.U.O)', bold: true },
							{ label: '—' },
							{ label: '—' },
							{ label: '........', answer: formatDzd(cuoSup), mark: '0.75' },
							{ label: '........', answer: formatDzd(cuoProd), mark: '0.75' },
							{ label: '........', answer: formatDzd(cuoDist), mark: '0.5' }
						]
					]
				)
			];

			const sujetExercise: ExerciseBlock = {
				points: 6,
				instruction: 'أنجز التوزيع الثانوي التبادلي وأتمم جدول الأعباء غير المباشرة:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(X);
				quizQuestion = {
					type: 'calculated',
					questionText: `في جدول توزيع الأعباء غير المباشرة: التوزيع الأولي للإدارة $${formatDzd(primX)}$ دج وللصيانة $${formatDzd(primY)}$ دج. تعطي الإدارة $20\\%$ للصيانة وتعطي الصيانة $10\\%$ للإدارة. احسب المجموع التبادلي لقسم الإدارة ($X$).`,
					questionTextAr: 'احسب مجموع قسم الإدارة X:',
					questionData: { answer: X, displayTemplate: 'X = ? دج', variables: [], tolerance: 0.5 },
					explanation: `$X = ${formatDzd(primX)} + 0.1(${formatDzd(primY)} + 0.2X) \\implies 0.98X = ${formatDzd(primX + 0.1 * primY)} \\implies X = ${formatDzd(X)}$ دج.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(secProd);
				quizQuestion = {
					type: 'calculated',
					questionText: `المجموع الأولي لقسم الإنتاج $${formatDzd(primProd)}$ دج، ويأخذ $30\\%$ من قسم الإدارة ($X = ${formatDzd(X)}$ دج) و$50\\%$ من قسم الصيانة ($Y = ${formatDzd(Y)}$ دج). احسب مجموع التوزيع الثانوي لقسم الإنتاج.`,
					questionTextAr: 'احسب مجموع التوزيع الثانوي للإنتاج:',
					questionData: { answer: secProd, displayTemplate: 'المجموع الثانوي = ? دج', variables: [], tolerance: 0.5 },
					explanation: `المجموع الثانوي $= ${formatDzd(primProd)} + ${formatDzd(xToProd)} + ${formatDzd(yToProd)} = ${formatDzd(secProd)}$ دج.`
				};
			} else {
				finalAnswer = String(cuoProd);
				quizQuestion = {
					type: 'calculated',
					questionText: `بلغ مجموع التوزيع الثانوي لقسم الإنتاج $${formatDzd(secProd)}$ دج، وعدد وحدات القياس (ساعات العمل المباشرة) يساوي $${formatDzd(uoProd)}$ ساعة. احسب تكلفة وحدة القياس ($C.U.O$) لقسم الإنتاج.`,
					questionTextAr: 'احسب تكلفة وحدة القياس (CUO):',
					questionData: { answer: cuoProd, displayTemplate: 'CUO = ? دج', variables: [], tolerance: 0.01 },
					explanation: `$C.U.O = \\frac{${formatDzd(secProd)}}{${formatDzd(uoProd)}} = ${formatDzd(cuoProd)}$ دج للساعة.`
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
					'في التبادل: كل قسم مساعد يتلقى نسبة من الآخر، لذا نكتب X = أولي_X + نسبة×Y.',
					'بعد إيجاد X و Y يوزع كل منهما على الأقسام ليصبح رصيد الأقسام المساعدة صفراً.',
					'تكلفة وحدة القياس = مجموع التوزيع الثانوي ÷ عدد وحدات القياس.'
				],
				solutionStepsAr: [
					`بحل جملة المعادلتين نجد $X = ${formatDzd(X)}$ دج و $Y = ${formatDzd(Y)}$ دج.`,
					`مجاميع التوزيع الثانوي: التموين $= ${formatDzd(secSup)}$، الإنتاج $= ${formatDzd(secProd)}$، التوزيع $= ${formatDzd(secDist)}$ دج.`,
					`تكلفة وحدة القياس: التموين $= ${formatDzd(cuoSup)}$، الإنتاج $= ${formatDzd(cuoProd)}$، التوزيع $= ${formatDzd(cuoDist)}$ دج.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. التكاليف الكلية: تكلفة الشراء، CMUP، الإنتاج، سعر التكلفة، والنتيجة التحليلية (8 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_3as_acc_t3_full_costing_cmup',
		grade: '3as_acc',
		trimesterId: 't3',
		domain: 'acc_cost_analysis',
		titleAr: 'التكاليف الكلية: الشراء، CMUP، الإنتاج، سعر التكلفة، والنتيجة التحليلية',
		curriculumLessonId: 'mgt_lesson_3as_acc_t3_production_cost_price_result',
		defaultPoints: 8,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_3AS_T3);

			// Raw material M:
			const qInitM = 400;
			const puInitM = rng.int(2, 4) * 100;
			const valInitM = qInitM * puInitM;

			const qPurchM = 1_600;
			const puPurchM = puInitM + 50;
			const buyDirect = qPurchM * puPurchM;
			const supIndirect = 40_000; // guarantees clean CMUP! (400+1600=2000, 40000/2000 = +20)
			const totalPurchCostM = buyDirect + supIndirect;
			const cmupM = (valInitM + totalPurchCostM) / (qInitM + qPurchM); // exact integer!

			// Production of Product P:
			const qUsedM = 1_500;
			const valUsedM = qUsedM * cmupM;
			const directLabor = rng.int(2, 4) * 100_000;
			const prodIndirect = rng.int(15, 25) * 10_000;
			const wipInit = 50_000;
			const wipEnd = 30_000;
			const totalProdCost = valUsedM + directLabor + prodIndirect + wipInit - wipEnd;
			const qProducedP = 1_000;
			const unitProdCostP = totalProdCost / qProducedP; // exact integer because all terms divisible by 1000!

			// Finished goods inventory P (assume 0 opening stock or clean stock matching unitProdCostP)
			const qSoldP = rng.pick([800, 900]);
			const costOfSoldP = qSoldP * unitProdCostP;
			const distCost = rng.int(6, 10) * 10_000;
			const costPriceP = costOfSoldP + distCost;

			const sellPriceUnit = unitProdCostP + rng.int(3, 6) * 100;
			const revenueP = qSoldP * sellPriceUnit;
			const analyticalRes = revenueP - costPriceP;

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `سلسلة التكاليف الكلية للمنتج (P) — ${company}`,
					text: `تنتج ${company} المنتج (P) باستعمال المادة الأولية (M). توفرت المعطيات الآتية لشهر ماي:\n1) المادة الأولية (M): مخزون أول المدة ${formatDzd(qInitM)} كلغ بمبلغ ${formatDzd(valInitM)} دج؛ مشتريات الشهر ${formatDzd(qPurchM)} كلغ بسعر ${formatDzd(puPurchM)} دج/كلغ بالإضافة إلى أعباء تموين غير مباشرة قدرها ${formatDzd(supIndirect)} دج. استعملت الورشة ${formatDzd(qUsedM)} كلغ لإنتاج ${formatDzd(qProducedP)} وحدة من (P).\n2) الإنتاج: اليد العاملة المباشرة ${formatDzd(directLabor)} دج، أعباء الإنتاج غير المباشرة ${formatDzd(prodIndirect)} دج، الإنتاج الجاري أول المدة ${formatDzd(wipInit)} دج، الإنتاج الجاري آخر المدة ${formatDzd(wipEnd)} دج (لا يوجد مخزون أول المدة للمنتج P).\n3) التوزيع والمبيعات: بيعت ${formatDzd(qSoldP)} وحدة بسعر ${formatDzd(sellPriceUnit)} دج/وحدة، وبلغت أعباء التوزيع ${formatDzd(distCost)} دج.`
				}),
				{
					type: 'text',
					content: '1) احسب تكلفة شراء المادة الأولية (M)، والتكلفة المتوسطة المرجحة (CMUP)، وقيمة المادة المستعملة في الإنتاج.',
					answer: `تكلفة الشراء $= (${formatDzd(qPurchM)} times ${formatDzd(puPurchM)}) + ${formatDzd(supIndirect)} = ${formatDzd(totalPurchCostM)}$ دج. $"CMUP" = frac(${formatDzd(valInitM)} + ${formatDzd(totalPurchCostM)}, ${formatDzd(qInitM)} + ${formatDzd(qPurchM)}) = ${formatDzd(cmupM)}$ دج/كلغ. قيمة المستعمل $= ${formatDzd(qUsedM)} times ${formatDzd(cmupM)} = ${formatDzd(valUsedM)}$ دج.`,
					mark: '2'
				},
				{
					type: 'text',
					content: '2) أكمل جدول حساب تكلفة الإنتاج وسعر التكلفة والنتيجة التحليلية للمنتج (P):'
				},
				buildManagementTableBlock(
					['العنصر', 'الكمية', 'سعر الوحدة (دج)', 'المبلغ الإجمالي (دج)'],
					[
						[{ label: 'مادة أولية مستعملة (M)' }, { label: formatDzd(qUsedM) }, { label: formatDzd(cmupM) }, { label: formatDzd(valUsedM) }],
						[{ label: 'يد عاملة مباشرة + أعباء إنتاج غير مباشرة' }, { label: '—' }, { label: '—' }, { label: formatDzd(directLabor + prodIndirect) }],
						[{ label: 'إنتاج جاري أول المدة (+) وإنتاج جاري آخر المدة (−)' }, { label: '—' }, { label: '—' }, { label: `+${formatDzd(wipInit)} − ${formatDzd(wipEnd)}` }],
						[{ label: 'تكلفة الإنتاج التام (P)', bold: true }, { label: formatDzd(qProducedP) }, { label: '........', answer: formatDzd(unitProdCostP), mark: '1' }, { label: '........', answer: formatDzd(totalProdCost), mark: '1.5' }],
						[{ label: 'تكلفة إنتاج الكمية المباعة + أعباء التوزيع' }, { label: formatDzd(qSoldP) }, { label: formatDzd(unitProdCostP) }, { label: `${formatDzd(costOfSoldP)} + ${formatDzd(distCost)}` }],
						[{ label: 'سعر التكلفة للكمية المباعة', bold: true }, { label: formatDzd(qSoldP) }, { label: formatDzd(roundTo(costPriceP / qSoldP, 2)) }, { label: '........', answer: formatDzd(costPriceP), mark: '1.5' }],
						[{ label: 'رقم الأعمال (المبيعات)' }, { label: formatDzd(qSoldP) }, { label: formatDzd(sellPriceUnit) }, { label: formatDzd(revenueP) }],
						[{ label: 'النتيجة التحليلية للمنتج (P)', bold: true }, { label: formatDzd(qSoldP) }, { label: '—' }, { label: '........', answer: formatDzd(analyticalRes), mark: '2' }]
					]
				)
			];

			const sujetExercise: ExerciseBlock = {
				points: 8,
				instruction: 'أنجز حساب مراحل التكاليف الكلية للمنتج (P) من الشراء إلى النتيجة التحليلية:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(cmupM);
				quizQuestion = {
					type: 'calculated',
					questionText: `مخزون أول المدة من المادة الأولية $${formatDzd(qInitM)}$ كلغ بقيمة $${formatDzd(valInitM)}$ دج، ومشتريات الفترة $${formatDzd(qPurchM)}$ كلغ بتكلفة شراء إجمالية $${formatDzd(totalPurchCostM)}$ دج. احسب $CMUP$ للمادة الأولية.`,
					questionTextAr: 'احسب CMUP للمادة الأولية (دج/كلغ):',
					questionData: { answer: cmupM, displayTemplate: 'CMUP = ? دج/كلغ', variables: [], tolerance: 0.01 },
					explanation: `$CMUP = \\frac{${formatDzd(valInitM)} + ${formatDzd(totalPurchCostM)}}{${formatDzd(qInitM)} + ${formatDzd(qPurchM)}} = ${formatDzd(cmupM)}$ دج/كلغ.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(totalProdCost);
				quizQuestion = {
					type: 'calculated',
					questionText: `في إنتاج $${formatDzd(qProducedP)}$ وحدة: المواد المستعملة $${formatDzd(valUsedM)}$ دج، اليد العاملة المباشرة $${formatDzd(directLabor)}$ دج، أعباء الإنتاج غير المباشرة $${formatDzd(prodIndirect)}$ دج، الإنتاج الجاري أول المدة $${formatDzd(wipInit)}$ دج، وآخر المدة $${formatDzd(wipEnd)}$ دج. احسب تكلفة الإنتاج الإجمالية.`,
					questionTextAr: 'احسب تكلفة الإنتاج (بالدج):',
					questionData: { answer: totalProdCost, displayTemplate: 'تكلفة الإنتاج = ? دج', variables: [], tolerance: 0.01 },
					explanation: `تكلفة الإنتاج $= ${formatDzd(valUsedM)} + ${formatDzd(directLabor)} + ${formatDzd(prodIndirect)} + ${formatDzd(wipInit)} - ${formatDzd(wipEnd)} = ${formatDzd(totalProdCost)}$ دج.`
				};
			} else {
				finalAnswer = String(analyticalRes);
				quizQuestion = {
					type: 'calculated',
					questionText: `بيعت $${formatDzd(qSoldP)}$ وحدة بسعر $${formatDzd(sellPriceUnit)}$ دج/وحدة، وكانت تكلفة إنتاج الوحدة الواحدة $${formatDzd(unitProdCostP)}$ دج، ومصاريف التوزيع الإجمالية $${formatDzd(distCost)}$ دج. احسب النتيجة التحليلية للمنتج (P).`,
					questionTextAr: 'احسب النتيجة التحليلية (بالدج):',
					questionData: { answer: analyticalRes, displayTemplate: 'النتيجة التحليلية = ? دج', variables: [], tolerance: 0.5 },
					explanation: `رقم الأعمال $= ${formatDzd(revenueP)}$ دج؛ سعر التكلفة $= ${formatDzd(costOfSoldP)} + ${formatDzd(distCost)} = ${formatDzd(costPriceP)}$ دج؛ النتيجة $= ${formatDzd(analyticalRes)}$ دج.`
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
					'تُضاف أعباء التموين غير المباشرة إلى ثمن الشراء قبل حساب الـ CMUP.',
					'في تكلفة الإنتاج: يضاف الإنتاج الجاري أول المدة ويُطرح الإنتاج الجاري آخر المدة.',
					'سعر التكلفة يحسب للكمية المباعة فقط (وليس المنتجة)، والنتيجة = رقم الأعمال − سعر التكلفة.'
				],
				solutionStepsAr: [
					`تكلفة شراء المادة M $= ${formatDzd(totalPurchCostM)}$ دج؛ $CMUP = ${formatDzd(cmupM)}$ دج/كلغ.`,
					`تكلفة إنتاج ${formatDzd(qProducedP)} وحدة $= ${formatDzd(totalProdCost)}$ دج (بواقع ${formatDzd(unitProdCostP)} دج للوحدة).`,
					`سعر تكلفة ${formatDzd(qSoldP)} وحدة $= ${formatDzd(costPriceP)}$ دج؛ النتيجة التحليلية $= ${formatDzd(analyticalRes)}$ دج.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. التكاليف المتغيرة وعتبة المردودية (MSCV, SR) وهامش الأمان (6 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_3as_acc_t3_variable_costing_breakeven',
		grade: '3as_acc',
		trimesterId: 't3',
		domain: 'acc_cost_analysis',
		titleAr: 'التكاليف المتغيرة، جدول الاستغلال التفاضلي، وعتبة المردودية (SR)',
		curriculumLessonId: 'mgt_lesson_3as_acc_t3_variable_costing_breakeven',
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_3AS_T3);

			const qty = rng.pick([4_000, 5_000, 6_000]);
			const unitPrice = rng.pick([800, 1_000]);
			const ca = qty * unitPrice;
			const cvRatePct = rng.pick([60, 65, 70]); // so t_MSCV is 40%, 35%, 30%!
			const cv = (ca * cvRatePct) / 100;
			const mscv = ca - cv;
			const tMscvPct = 100 - cvRatePct;

			// Choose CF so SR = CF / tMscv is a clean fraction of CA (say 60% or 75% of CA -> month 7.2 or month 9)
			const srPctOfCa = difficulty === 'hard' ? 75 : 60;
			const sr = (ca * srPctOfCa) / 100;
			const cf = (sr * tMscvPct) / 100;
			const result = mscv - cf;
			const qSr = sr / unitPrice;
			const monthsSr = (sr / ca) * 12; // 7.2 months (7m 6d) or 9 months (30/09)
			const safetyMargin = ca - sr;
			const safetyRatePct = 100 - srPctOfCa;

			const monthsInt = Math.floor(monthsSr);
			const daysRem = Math.round((monthsSr - monthsInt) * 30);
			const dateStr =
				daysRem === 0
					? `نهاية الشهر ${monthsInt} (${monthsInt === 9 ? '30 سبتمبر' : 'نهاية جوان'})`
					: `${daysRem} من الشهر ${monthsInt + 1}`;

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `بيانات الاستغلال التفاضلي لسنة 2024 — ${company}`,
					text: `باعت ${company} خلال سنة 2024 المنتظمة على 12 شهراً ${formatDzd(qty)} وحدة بسعر بيع ${formatDzd(unitPrice)} دج للوحدة. مثلت التكاليف المتغيرة ${cvRatePct}% من رقم الأعمال، وبلغت التكاليف الثابتة السنوية ${formatDzd(cf)} دج.`
				}),
				{
					type: 'text',
					content: '1) أكمل جدول تحليل الاستغلال التفاضلي:'
				},
				buildManagementTableBlock(
					['البيان', 'المبلغ (دج)', 'النسبة من CA %'],
					[
						[{ label: 'رقم الأعمال (CA)' }, { label: formatDzd(ca) }, { label: '100%' }],
						[{ label: 'التكاليف المتغيرة (CV)' }, { label: '........', answer: formatDzd(cv), mark: '0.75' }, { label: `${cvRatePct}%` }],
						[{ label: 'هامش التكلفة المتغيرة (MSCV)', bold: true }, { label: '........', answer: formatDzd(mscv), mark: '1' }, { label: '........', answer: `${tMscvPct}%`, mark: '0.5' }],
						[{ label: 'التكاليف الثابتة (CF)' }, { label: formatDzd(cf) }, { label: '—' }],
						[{ label: 'النتيجة الجارية', bold: true }, { label: '........', answer: formatDzd(result), mark: '0.75' }, { label: '—' }]
					]
				),
				{
					type: 'text',
					content: '2) احسب عتبة المردودية بالقيمة ($"SR"$) وبالكمية ($Q_"SR"$), وحدد تاريخ تحقيقها.',
					answer: `$"SR" = frac(${formatDzd(cf)}, ${tMscvPct / 100}) = ${formatDzd(sr)}$ دج. $Q_"SR" = frac(${formatDzd(sr)}, ${formatDzd(unitPrice)}) = ${formatDzd(qSr)}$ وحدة. المدة $= frac(${formatDzd(sr)}, ${formatDzd(ca)}) times 12 = ${monthsSr}$ شهراً، أي تتحقق في ${dateStr}.`,
					mark: '2'
				},
				{
					type: 'text',
					content: '3) احسب هامش الأمان ($"MS"$) ومعدله ($t_"MS"$).',
					answer: `$"MS" = "CA" - "SR" = ${formatDzd(ca)} - ${formatDzd(sr)} = ${formatDzd(safetyMargin)}$ دج، ومعدل الأمان $= frac(${formatDzd(safetyMargin)}, ${formatDzd(ca)}) times 100 = ${safetyRatePct}%$.`,
					mark: '1'
				}
			];

			const sujetExercise: ExerciseBlock = {
				points: 6,
				instruction: 'أعد جدول تحليل الاستغلال التفاضلي واحسب عتبة المردودية وهامش الأمان:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(mscv);
				quizQuestion = {
					type: 'calculated',
					questionText: `حققت ${company} رقم أعمال قدره $${formatDzd(ca)}$ دج، ومثلت التكاليف المتغيرة $${cvRatePct}\\%$ من رقم الأعمال. احسب هامش التكلفة المتغيرة ($MSCV$).`,
					questionTextAr: 'احسب هامش التكلفة المتغيرة MSCV:',
					questionData: { answer: mscv, displayTemplate: 'MSCV = ? دج', variables: [], tolerance: 0.01 },
					explanation: `$t_{MSCV} = ${tMscvPct}\\%$؛ ومنه $MSCV = ${formatDzd(ca)} \\times ${tMscvPct / 100} = ${formatDzd(mscv)}$ دج.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(sr);
				quizQuestion = {
					type: 'calculated',
					questionText: `تبلغ التكاليف الثابتة لمؤسسة $${formatDzd(cf)}$ دج، ومعدل هامش التكلفة المتغيرة ($t_{MSCV}$) يساوي $${tMscvPct}\\%$. احسب عتبة المردودية بالقيمة ($SR$).`,
					questionTextAr: 'احسب عتبة المردودية SR (بالدج):',
					questionData: { answer: sr, displayTemplate: 'SR = ? دج', variables: [], tolerance: 0.5 },
					explanation: `$SR = \\frac{${formatDzd(cf)}}{${tMscvPct / 100}} = ${formatDzd(sr)}$ دج.`
				};
			} else {
				finalAnswer = String(safetyMargin);
				quizQuestion = {
					type: 'calculated',
					questionText: `بلغ رقم أعمال مؤسسة $${formatDzd(ca)}$ دج، وعتبة المردودية $${formatDzd(sr)}$ دج. احسب هامش الأمان ($MS$).`,
					questionTextAr: 'احسب هامش الأمان MS (بالدج):',
					questionData: { answer: safetyMargin, displayTemplate: 'MS = ? دج', variables: [], tolerance: 0.01 },
					explanation: `$MS = CA - SR = ${formatDzd(ca)} - ${formatDzd(sr)} = ${formatDzd(safetyMargin)}$ دج (أي يمكن تراجع المبيعات بنسبة $${safetyRatePct}\\%$ قبل الدخول في الخسارة).`
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
					'MSCV = CA − CV، وتقسم على CA للحصول على معدل الهامش.',
					'عتبة المردودية SR = CF ÷ t_MSCV، وبقسمتها على سعر بيع الوحدة نجد Q_SR.',
					'هامش الأمان MS = CA − SR، وتاريخ العتبة = (SR ÷ CA) × 12 شهراً.'
				],
				solutionStepsAr: [
					`$CV = ${formatDzd(cv)}$ دج؛ $MSCV = ${formatDzd(mscv)}$ دج ($${tMscvPct}\\%$)؛ النتيجة $= ${formatDzd(result)}$ دج.`,
					`$SR = ${formatDzd(sr)}$ دج؛ $Q_{SR} = ${formatDzd(qSr)}$ وحدة؛ التاريخ: ${dateStr}.`,
					`هامش الأمان $MS = ${formatDzd(safetyMargin)}$ دج ($${safetyRatePct}\\%$).`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. تقييم المشاريع الاستثمارية الحلال (CAF وفترة الاسترداد DR) (6 ن)
	// STRICT SHARIAH COMPLIANCE: ZERO usurious interest rates / discounting!
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_3as_acc_t3_halal_project_caf_dr',
		grade: '3as_acc',
		trimesterId: 't3',
		domain: 'acc_cost_analysis',
		titleAr: 'تقييم المشاريع الاستثمارية الحلال: التدفق الصافي للخزينة (CAF) وفترة الاسترداد (DR)',
		curriculumLessonId: 'mgt_lesson_3as_acc_t3_halal_investment_appraisal',
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_3AS_T3);

			// Project A (4 years, linear depreciation, halal self/Musharaka financing)
			const i0 = rng.int(4, 8) * 400_000; // divisible by 4 -> clean annual dep
			const life = 4;
			const dep = i0 / life;
			const receipts = i0 * 0.75; // constant annual receipts
			const payments = i0 * 0.3; // constant annual cash expenses
			const ebt = receipts - payments - dep; // = 0.45*i0 - 0.25*i0 = 0.20*i0
			const ibsRate = 19;
			const ibs = roundTo(ebt * (ibsRate / 100), 2);
			const netInc = roundTo(ebt - ibs, 2);
			const caf = roundTo(netInc + dep, 2); // = 0.162*i0 + 0.25*i0 = 0.412 * i0

			const cum2 = roundTo(caf * 2, 2); // 0.824 * i0 < i0
			const cum3 = roundTo(caf * 3, 2); // 1.236 * i0 > i0
			const cum4 = roundTo(caf * 4, 2);
			const netSurplus = roundTo(cum4 - i0, 2);

			// Payback DR: between year 2 and 3!
			const remAfter2 = roundTo(i0 - cum2, 2);
			const drYearsExact = roundTo(2 + remAfter2 / caf, 4); // = 2.4272 years (constant ratio 1 / 0.412 = 2.42718 years!)
			const drMonthsTotal = roundTo((drYearsExact - 2) * 12, 2); // ~ 5.13 months
			const drMonths = Math.floor(drMonthsTotal); // 5
			const drDays = Math.round((drMonthsTotal - drMonths) * 30); // ~ 4 days

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `دراسة الجدوى الحلال لمشروع صناعي جديد — ${company}`,
					text: `تدرس ${company} مشروعاً إنتاجياً حلالاً (بتمويل ذاتي ومشاركة إسلامية، دون أي قرض ربوي). تبلغ تكلفة الاستثمار الأولي ${formatDzd(i0)} دج لآلة تُهتلك خطياً على ${life} سنوات (دون قيمة متبقية). القيم السنوية المتوقعة ثابتة خلال السنوات الأربع:\n• المقبوضات السنوية: ${formatDzd(receipts)} دج.\n• المدفوعات التشغيلية السنوية: ${formatDzd(payments)} دج.\n• معدل الضريبة على أرباح الشركات (IBS): ${ibsRate}%.`
				}),
				{
					type: 'text',
					content: '1) أكمل جدول حساب التدفق الصافي للخزينة السنوي ($"CAF"$) والتدفق التراكمي للسنوات الأربع:'
				},
				buildManagementTableBlock(
					['البيان', 'السنة 1', 'السنة 2', 'السنة 3', 'السنة 4'],
					[
						[{ label: 'المقبوضات − المدفوعات' }, { label: formatDzd(receipts - payments) }, { label: formatDzd(receipts - payments) }, { label: formatDzd(receipts - payments) }, { label: formatDzd(receipts - payments) }],
						[{ label: 'مخصص الاهتلاك السنوي' }, { label: '........', answer: formatDzd(dep), mark: '0.75' }, { label: formatDzd(dep) }, { label: formatDzd(dep) }, { label: formatDzd(dep) }],
						[{ label: 'النتيجة قبل الضريبة' }, { label: formatDzd(ebt) }, { label: formatDzd(ebt) }, { label: formatDzd(ebt) }, { label: formatDzd(ebt) }],
						[{ label: 'الضريبة IBS (19%)' }, { label: '........', answer: formatDzd(ibs), mark: '0.75' }, { label: formatDzd(ibs) }, { label: formatDzd(ibs) }, { label: formatDzd(ibs) }],
						[{ label: 'النتيجة الصافية' }, { label: formatDzd(netInc) }, { label: formatDzd(netInc) }, { label: formatDzd(netInc) }, { label: formatDzd(netInc) }],
						[{ label: 'التدفق الصافي للخزينة (CAF)', bold: true }, { label: '........', answer: formatDzd(caf), mark: '1' }, { label: formatDzd(caf) }, { label: formatDzd(caf) }, { label: formatDzd(caf) }],
						[{ label: 'التدفق التراكمي لـ CAF', bold: true }, { label: formatDzd(caf) }, { label: '........', answer: formatDzd(cum2), mark: '0.5' }, { label: formatDzd(cum3) }, { label: '........', answer: formatDzd(cum4), mark: '0.5' }]
					]
				),
				{
					type: 'text',
					content: '2) احسب فترة الاسترداد ($"DR"$) بالسنوات والأشهر والأيام، ثم احسب العائد الصافي التراكمي للمشروع وبيّن قرار القبول.',
					answer: `بما أن $"CAF"$ ثابت: $"DR" = frac(${formatDzd(i0)}, ${formatDzd(caf)}) approx 2.43$ سنة، أي سنتان و${drMonths} أشهر و${drDays} أيام. العائد الصافي التراكمي $= ${formatDzd(cum4)} - ${formatDzd(i0)} = +${formatDzd(netSurplus)}$ دج. يُقبل المشروع لأنه حلال ويسترد تكلفته قبل نهاية عمره الإنتاجي (${life} سنوات) بعائد تراكمي إيجابي.`,
					mark: '2.5'
				}
			];

			const sujetExercise: ExerciseBlock = {
				points: 6,
				instruction: 'أجرِ الدراسة المالية الحلال للمشروع باستعمال CAF وفترة الاسترداد DR:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(caf);
				quizQuestion = {
					type: 'calculated',
					questionText: `مشروع استثماري حلال تكلفته $I_0 = ${formatDzd(i0)}$ دج (يهتلك خطياً على $4$ سنوات بمقدار $${formatDzd(dep)}$ دج سنوياً). يحقق مقبوضات سنوية $${formatDzd(receipts)}$ دج، مدفوعات $${formatDzd(payments)}$ دج، ومعدل IBS $19\\%$. احسب التدفق الصافي للخزينة السنوي ($CAF$).`,
					questionTextAr: 'احسب CAF السنوي (بالدج):',
					questionData: { answer: caf, displayTemplate: 'CAF = ? دج', variables: [], tolerance: 1 },
					explanation: `النتيجة قبل الضريبة $= ${formatDzd(ebt)}$ دج؛ الصافية $= ${formatDzd(netInc)}$ دج؛ $CAF = ${formatDzd(netInc)} + ${formatDzd(dep)} = ${formatDzd(caf)}$ دج.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(netSurplus);
				quizQuestion = {
					type: 'calculated',
					questionText: `مشروع تكلفته الأولية $I_0 = ${formatDzd(i0)}$ دج، ويحقق تدفقاً صافياً سنوياً للخزينة قدره $CAF = ${formatDzd(caf)}$ دج لمدة $4$ سنوات. احسب العائد الصافي التراكمي ($\\sum CAF - I_0$).`,
					questionTextAr: 'احسب العائد الصافي التراكمي:',
					questionData: { answer: netSurplus, displayTemplate: 'الفائض = ? دج', variables: [], tolerance: 1 },
					explanation: `مجموع $CAF = ${formatDzd(cum4)}$ دج؛ العائد الصافي التراكمي $= ${formatDzd(cum4)} - ${formatDzd(i0)} = ${formatDzd(netSurplus)}$ دج.`
				};
			} else {
				finalAnswer = '2.43';
				quizQuestion = {
					type: 'calculated',
					questionText: `مشروع استثماري تكلفته $I_0 = ${formatDzd(i0)}$ دج وتدفقاته السنوية الصافية ثابتة تساوي $CAF = ${formatDzd(caf)}$ دج. احسب فترة الاسترداد ($DR$) بالسنوات (مقرّبة إلى رقمين عشريين).`,
					questionTextAr: 'احسب فترة الاسترداد DR (بالسنوات):',
					questionData: { answer: roundTo(i0 / caf, 2), displayTemplate: 'DR = ? سنة', variables: [], tolerance: 0.05 },
					explanation: `$DR = \\frac{${formatDzd(i0)}}{${formatDzd(caf)}} \\approx 2.43$ سنة (سنتان و${drMonths} أشهر و${drDays} أيام).`
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
					'النتيجة الخاضعة للضريبة = المقبوضات − المدفوعات − الاهتلاك.',
					'التدفق الصافي للخزينة CAF = النتيجة الصافية + مخصص الاهتلاك (لأنه عبء غير نقدي).',
					'فترة الاسترداد DR = I0 ÷ CAF عند ثبات التدفقات، ويقاس التراكم حتى يساوي I0.'
				],
				solutionStepsAr: [
					`الاهتلاك السنوي $= ${formatDzd(dep)}$ دج؛ النتيجة قبل الضريبة $= ${formatDzd(ebt)}$ دج؛ الضريبة ($19\\%$) $= ${formatDzd(ibs)}$ دج.`,
					`النتيجة الصافية $= ${formatDzd(netInc)}$ دج؛ $CAF = ${formatDzd(caf)}$ دج سنوياً.`,
					`فترة الاسترداد $DR \\approx 2.43$ سنة (سنتان و${drMonths} أشهر و${drDays} أيام)؛ الفائض التراكمي $= +${formatDzd(netSurplus)}$ دج.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. وضعية بكالوريا شاملة في المحاسبة التحليلية والمطابقة (8 ن)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_tpl_3as_acc_t3_analytical_bac_integration',
		grade: '3as_acc',
		trimesterId: 't3',
		domain: 'integration',
		titleAr: 'وضعية بكالوريا شاملة: المحاسبة التحليلية، التكاليف الكلية، والمطابقة مع المحاسبة العامة',
		curriculumLessonId: 'mgt_lesson_3as_acc_t3_production_cost_price_result',
		defaultPoints: 8,
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const company = rng.pick(COMPANIES_3AS_T3);

			// Product A and Product B analytical results + reconciliation
			const qSoldA = 500;
			const puSaleA = rng.int(12, 18) * 100;
			const caA = qSoldA * puSaleA;
			const prodCostA = qSoldA * (puSaleA - 300);
			const distA = 50_000;
			const costPriceA = prodCostA + distA;
			const resA = caA - costPriceA; // +100,000

			const qSoldB = 400;
			const puSaleB = rng.int(10, 15) * 100;
			const caB = qSoldB * puSaleB;
			const prodCostB = qSoldB * (puSaleB - 100);
			const distB = 60_000;
			const costPriceB = prodCostB + distB;
			const resB = caB - costPriceB; // -20,000

			const netAnalyticalRes = resA + resB; // +80,000
			const suppElements = rng.int(3, 6) * 10_000; // مكافأة رأس المال الخاص وأجرة المستغل
			const nonIncExp = rng.int(1, 2) * 10_000; // أعباء غير معتبرة
			const genAccResBeforeTax = netAnalyticalRes + suppElements - nonIncExp;

			const content: ContentBlock[] = [
				buildManagementDocumentBlock({
					title: `وضعية بكالوريا تحليلية شاملة — ${company}`,
					text: `تنتج وتبيع ${company} منتجين (A) و(B). أظهرت بطاقات التكاليف لشهر ديسمبر المعطيات الآتية:\n• المنتج (A): الكمية المباعة ${formatDzd(qSoldA)} وحدة بسعر ${formatDzd(puSaleA)} دج/وحدة؛ تكلفة إنتاج الكمية المباعة ${formatDzd(prodCostA)} دج؛ أعباء التوزيع ${formatDzd(distA)} دج.\n• المنتج (B): الكمية المباعة ${formatDzd(qSoldB)} وحدة بسعر ${formatDzd(puSaleB)} دج/وحدة؛ تكلفة إنتاج الكمية المباعة ${formatDzd(prodCostB)} دج؛ أعباء التوزيع ${formatDzd(distB)} دج.\n• معطيات إضافية للمطابقة مع المحاسبة العامة: العناصر الإضافية المدمجة (مكافأة رأس المال الخاص وأجرة المستغل) ${formatDzd(suppElements)} دج، والأعباء غير المعتبرة في التكاليف ${formatDzd(nonIncExp)} دج (لا توجد فروق تحميل).`
				}),
				{
					type: 'text',
					content: '1) أكمل جدول حساب سعر التكلفة والنتيجة التحليلية لكل من المنتجين (A) و(B):'
				},
				buildManagementTableBlock(
					['البيان', 'المنتج (A)', 'المنتج (B)', 'المجموع'],
					[
						[
							{ label: 'رقم الأعمال (المبيعات)' },
							{ label: '........', answer: formatDzd(caA), mark: '0.75' },
							{ label: '........', answer: formatDzd(caB), mark: '0.75' },
							{ label: formatDzd(caA + caB) }
						],
						[
							{ label: 'تكلفة إنتاج الكمية المباعة' },
							{ label: formatDzd(prodCostA) },
							{ label: formatDzd(prodCostB) },
							{ label: formatDzd(prodCostA + prodCostB) }
						],
						[
							{ label: 'أعباء التوزيع' },
							{ label: formatDzd(distA) },
							{ label: formatDzd(distB) },
							{ label: formatDzd(distA + distB) }
						],
						[
							{ label: 'سعر التكلفة', bold: true },
							{ label: '........', answer: formatDzd(costPriceA), mark: '1' },
							{ label: '........', answer: formatDzd(costPriceB), mark: '1' },
							{ label: formatDzd(costPriceA + costPriceB) }
						],
						[
							{ label: 'النتيجة التحليلية', bold: true },
							{ label: '........', answer: formatDzd(resA), mark: '1' },
							{ label: '........', answer: formatDzd(resB), mark: '1' },
							{ label: '........', answer: formatDzd(netAnalyticalRes), mark: '0.5' }
						]
					]
				),
				{
					type: 'text',
					content: '2) احسب نتيجة المحاسبة العامة (قبل الضريبة)، ثم علّق على مردودية المنتجين.',
					answer: `نتيجة المحاسبة العامة $= ${formatDzd(netAnalyticalRes)} + ${formatDzd(suppElements)} - ${formatDzd(nonIncExp)} = ${formatDzd(genAccResBeforeTax)}$ دج. التعليق: المنتج (A) مربح ($+${formatDzd(resA)}$ دج)، أما المنتج (B) فيحقق خسارة ($${formatDzd(resB)}$ دج) لذا يجب مراجعة تكاليف توزيعه أو تسعيره دون إغفال أثره في تغطية الأعباء الثابتة المشتركة.`,
					mark: '2'
				}
			];

			const sujetExercise: ExerciseBlock = {
				customTitle: 'الوضعية الإدماجية — الثلاثي الثالث (المحاسبة التحليلية)',
				points: 8,
				instruction: 'احسب سعر التكلفة والنتائج التحليلية وطابقها مع نتيجة المحاسبة العامة:',
				content
			};

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = String(resA);
				quizQuestion = {
					type: 'calculated',
					questionText: `باعت ${company} من المنتج (A) $${formatDzd(qSoldA)}$ وحدة بسعر $${formatDzd(puSaleA)}$ دج للوحدة، وبلغت تكلفة إنتاج المباع $${formatDzd(prodCostA)}$ دج وأعباء التوزيع $${formatDzd(distA)}$ دج. احسب النتيجة التحليلية للمنتج (A).`,
					questionTextAr: 'احسب النتيجة التحليلية للمنتج (A):',
					questionData: { answer: resA, displayTemplate: 'النتيجة (A) = ? دج', variables: [], tolerance: 0.01 },
					explanation: `رقم الأعمال $= ${formatDzd(caA)}$ دج؛ سعر التكلفة $= ${formatDzd(costPriceA)}$ دج؛ النتيجة $= ${formatDzd(resA)}$ دج.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = String(netAnalyticalRes);
				quizQuestion = {
					type: 'calculated',
					questionText: `حققت المؤسسة نتيجة تحليلية موجبة للمنتج (A) قدرها $+${formatDzd(resA)}$ دج، وخسارة للمنتج (B) قدرها $${formatDzd(resB)}$ دج. ما مجموع النتيجة التحليلية الصافية للمؤسسة؟`,
					questionTextAr: 'احسب النتيجة التحليلية الإجمالية:',
					questionData: { answer: netAnalyticalRes, displayTemplate: 'النتيجة التحليلية = ? دج', variables: [], tolerance: 0.01 },
					explanation: `النتيجة الإجمالية $= ${formatDzd(resA)} + (${formatDzd(resB)}) = ${formatDzd(netAnalyticalRes)}$ دج.`
				};
			} else {
				finalAnswer = String(genAccResBeforeTax);
				quizQuestion = {
					type: 'calculated',
					questionText: `بلغت النتيجة التحليلية الصافية للمؤسسة $+${formatDzd(netAnalyticalRes)}$ دج، والعناصر الإضافية المدمجة $${formatDzd(suppElements)}$ دج، والأعباء غير المعتبرة $${formatDzd(nonIncExp)}$ دج. استنتج نتيجة المحاسبة العامة قبل الضرائب.`,
					questionTextAr: 'احسب نتيجة المحاسبة العامة:',
					questionData: { answer: genAccResBeforeTax, displayTemplate: 'نتيجة المحاسبة العامة = ? دج', variables: [], tolerance: 0.01 },
					explanation: `نتيجة المحاسبة العامة $= ${formatDzd(netAnalyticalRes)} + ${formatDzd(suppElements)} - ${formatDzd(nonIncExp)} = ${formatDzd(genAccResBeforeTax)}$ دج.`
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
					'سعر التكلفة = تكلفة إنتاج الكمية المباعة + أعباء التوزيع.',
					'النتيجة التحليلية الصافية للمؤسسة = مجموع نتائج كل المنتجات المباعة.',
					'نتيجة المحاسبة العامة = النتيجة التحليلية الصافية + العناصر الإضافية − الأعباء غير المعتبرة.'
				],
				solutionStepsAr: [
					`المنتج A: سعر التكلفة $= ${formatDzd(costPriceA)}$ دج والنتيجة $= +${formatDzd(resA)}$ دج.`,
					`المنتج B: سعر التكلفة $= ${formatDzd(costPriceB)}$ دج والنتيجة $= ${formatDzd(resB)}$ دج.`,
					`النتيجة التحليلية الإجمالية $= ${formatDzd(netAnalyticalRes)}$ دج؛ نتيجة المحاسبة العامة $= ${formatDzd(genAccResBeforeTax)}$ دج.`
				],
				finalAnswer
			};
		}
	}
];
