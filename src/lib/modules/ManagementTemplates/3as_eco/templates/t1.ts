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
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';

// ============================================================================
// 3AS GE BAC (الاقتصاد والمناجمنت) — Trimester 1: 5 Parameterized Templates
// ============================================================================

// [1] النقود والكتلة النقدية M1 و M2 (4 ن)
const tpl3asEcoT1MoneyMassM1M2: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_3as_eco_t1_money_mass_m1_m2',
	grade: '3as_eco',
	trimesterId: 't1',
	domain: 'eco_trade_money',
	titleAr: 'النقود ومكونات الكتلة النقدية $M_1$ و $M_2$',
	curriculumLessonId: 'mgt_lesson_3as_eco_t1_money_mass',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cashOutsideBanks = difficulty === 'easy' ? 4000 : rng.pick([4500, 5000, 5600]);
		const bankSightDeposits = rng.pick([2400, 3000, 3200]);
		const ccpTreasuryDeposits = rng.pick([600, 1000, 1200]);
		const totalSight = bankSightDeposits + ccpTreasuryDeposits;
		const m1 = cashOutsideBanks + totalSight;

		const quasiMoney = rng.pick([2000, 2500, 3000]);
		const m2 = m1 + quasiMoney;
		const cashShareM2 = roundTo((cashOutsideBanks / m2) * 100, 2);
		const m1ShareM2 = roundTo((m1 / m2) * 100, 2);

		const rows: Array<Array<{ label?: string; answer?: string; mark?: string; bold?: boolean }>> = [
			[
				{ label: 'الأوراق والقطع النقدية المتداولة خارج البنوك', bold: true },
				{ label: `${formatDzd(cashOutsideBanks)} مليار دج` },
				{ answer: 'جزء من المجمع النقدي $M_1$', mark: '0.25' }
			],
			[
				{ label: 'الودائع الجارية بالبنوك والخزينة والبريد (CCP)', bold: true },
				{ label: `${formatDzd(bankSightDeposits)} + ${formatDzd(ccpTreasuryDeposits)} = ${formatDzd(totalSight)} مليار دج` },
				{ answer: 'نقود خطية ضمن $M_1$', mark: '0.25' }
			],
			[
				{ label: 'أشباه النقود (ودائع ادخارية ومضاربة إسلامية لأجل)', bold: true },
				{ label: `${formatDzd(quasiMoney)} مليار دج` },
				{ answer: 'مكوّن $M_2 - M_1$', mark: '0.25' }
			],
			[
				{ label: 'الكتلة النقدية بالمعنى الضيق $M_1$', bold: true },
				{ answer: `${formatDzd(m1)} مليار دج`, mark: '0.75' },
				{ answer: 'سيولة فورية للدفع', mark: '0.25' }
			],
			[
				{ label: 'الكتلة النقدية بالمعنى الواسع $M_2$', bold: true },
				{ answer: `${formatDzd(m2)} مليار دج`, mark: '0.75' },
				{ answer: `يمثل $M_1$ نسبة ${m1ShareM2}% من $M_2$`, mark: '0.5' }
			]
		];

		const content: ContentBlock[] = [
			{
				type: 'text',
				content:
					'1) يعطي الجدول الآتي مكونات السيولة النقدية في الاقتصاد الوطني خلال سنة مالية معينة. أكمل الحسابات والتصنيفات المطلوبة:'
			},
			buildManagementTableBlock(['مكوّن السيولة النقدية', 'القيمة / الحساب (مليار دج)', 'التصنيف والدلالة'], rows),
			{
				type: 'text',
				content: `2) احسب نسبة النقد القانوني المتداول خارج البنوك من إجمالي $M_2$، ثم فسّر خطورة ارتفاع هذه النسبة نتيجة الاكتناز وكيف تسهم النقود الإلكترونية في معالجتها.`,
				answer: `2) نسبة النقد خارج البنوك = $frac(${cashOutsideBanks}, ${m2}) times 100 = ${cashShareM2}$%. ارتفاع التداول النقدي خارج البنوك (الاكتناز) يضعف قدرة المصارف على التمويل الحقيقي؛ وتسهم النقود الإلكترونية والتحويلات البنكية في استقطاب السيولة إلى النظام المصرفي وتعزيز الشفافية.`,
				mark: '1'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '3as_eco',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `بلغت العملة المتداولة خارج البنوك $${cashOutsideBanks}\\text{ مليار دج}$، والودائع الجارية تحت الطلب $${totalSight}\\text{ مليار دج}$، وأشباه النقود (ودائع ادخارية لأجل) $${quasiMoney}\\text{ مليار دج}$. احسب الكتلة النقدية بالمعنى الواسع $M_2$ (بمليار دج):`,
				questionTextAr: 'احسب الكتلة النقدية $M_2$ (مليار دج):',
				questionData: {
					answer: m2,
					displayTemplate: 'M_2 = ? Mrd DZD',
					variables: [],
					tolerance: 0
				},
				explanation: `$$M_1 = ${cashOutsideBanks} + ${totalSight} = ${m1}\\text{ مليار دج} \\implies M_2 = ${m1} + ${quasiMoney} = ${m2}\\text{ مليار دج}$$`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'استثمر معطيات جدول الكتلة النقدية الآتي وأجب عن الأسئلة بدقة:',
				content
			},
			hints: [
				'يضم المجمع $M_1$ العملة الورقية والمعدنية المتداولة + جميع الودائع الجارية بالبنوك والخزينة والبريد.',
				'المجمع $M_2 = M_1 + \\text{أشباه النقود}$.',
				'احسب النسب بقسمة المكوّن على $M_2$ وضرب الناتج في $100$.'
			],
			solutionStepsAr: [
				`حساب $M_1 = ${cashOutsideBanks} + ${totalSight} = ${m1}\\text{ مليار دج}$.`,
				`حساب $M_2 = ${m1} + ${quasiMoney} = ${m2}\\text{ مليار دج}$.`,
				`حساب نسبة $M_1$ ($${m1ShareM2}\\%$) ونسبة النقد المتداول ($${cashShareM2}\\%$) وتحليل الاكتناز.`
			],
			finalAnswer: `${m2}`
		};
	}
};

// [2] النظام المصرفي والبنك المركزي والمالية الإسلامية البديلة عن الربا (4 ن)
const tpl3asEcoT1CentralBankIslamicFinance: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_3as_eco_t1_central_bank_islamic_finance',
	grade: '3as_eco',
	trimesterId: 't1',
	domain: 'eco_trade_money',
	titleAr: 'البنك المركزي وضبط السيولة والمالية الإسلامية البديلة عن الربا',
	curriculumLessonId: 'mgt_lesson_3as_eco_t1_banking_islamic_finance',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const deposits = difficulty === 'easy' ? 200 : rng.pick([250, 300, 400]);
		const oldReservePct = 5;
		const newReservePct = rng.pick([9, 10, 12]);
		const absorbedLiquidity = roundTo(deposits * ((newReservePct - oldReservePct) / 100), 2);

		const assetCost = rng.pick([10000000, 12000000]);
		const marginPct = rng.pick([10, 15, 20]);
		const profitMargin = Math.round(assetCost * (marginPct / 100));
		const murabahaTotal = assetCost + profitMargin;

		const mcq = buildUniqueMcqOptions(
			`$${absorbedLiquidity}\\text{ مليار دج}$ عبر تجميدها في البنك المركزي دون فائدة ربوية`,
			[
				{
					text: `$${roundTo(deposits * (newReservePct / 100), 2)}\\text{ مليار دج}$ كسيولة إضافية جديدة`,
					diagnosticFeedback: 'هذا هو إجمالي الاحتياطي الجديد بعد الرفع وليس مقدار الزيادة الممتصة فقط.'
				},
				{
					text: `$${roundTo(deposits * (oldReservePct / 100), 2)}\\text{ مليار دج}$ من الأرباح الربوية`,
					diagnosticFeedback: 'الاحتياطي الإلزامي يقتطع نسبة من الودائع لدى البنك المركزي ولا يرتب ربا.'
				},
				{
					text: `$${roundTo(absorbedLiquidity * 2, 2)}\\text{ مليار دج}$ عبر طباعة نقود ورقية`,
					diagnosticFeedback: 'رفع الاحتياطي الإلزامي يمتص السيولة الزائدة ولا يطبع نقوداً جديدة.'
				}
			],
			rng
		);

		const caseBlocks = buildCaseStudyBlocks({
			title: 'سند مصرفي ومالي: ضبط السيولة النقدية والبديل التمويلي الإسلامي',
			facts: `لضبط الاستقرار النقدي ومواجهة فائض السيولة، قرّر البنك المركزي رفع نسبة الاحتياطي الإلزامي على الودائع المصرفية البالغة ${deposits} مليار دج من ${oldReservePct}% إلى ${newReservePct}%، بالتوازي مع إصدار صكوك سيادية إسلامية مدعومة بأصول حقيقية. في الأثناء، رفضت مؤسسة صناعية عرض قرض ربوي محرم شرعاً، ووقّعت مع مصرف إسلامي عقد مرابحة لشراء تجهيز بقيمة أصلية ${formatDzd(assetCost)} دج وبهامش ربح متفق عليه قدره ${marginPct}%.`,
			questions: [
				{
					q: '1) احسب مقدار السيولة الإضافية التي يمتصها البنك المركزي بقرار رفع الاحتياطي الإلزامي، واذكر وظيفتين أخريين للبنك المركزي.',
					a: `1) مقدار السيولة الإضافية المحتجزة $= ${deposits} times frac(${newReservePct} - ${oldReservePct}, 100) = ${absorbedLiquidity}$ مليار دج.\nمن وظائف البنك المركزي الأخرى: احتكار إصدار العملة الوطنية، بنك الدولة وحافظ حسابات الخزينة، وإدارة احتياطيات الصرف والمقاصة بين البنوك.`,
					mark: '1.5'
				},
				{
					q: '2) احسب هامش ربح المرابحة وثمن البيع الإجمالي في العقد الإسلامي للمؤسسة.',
					a: `2) هامش ربح المرابحة $= ${formatDzd(assetCost)} times frac(${marginPct}, 100) = ${formatDzd(profitMargin)}$ دج.\nثمن البيع الكلي الثابت $= ${formatDzd(assetCost)} + ${formatDzd(profitMargin)} = ${formatDzd(murabahaTotal)}$ دج.`,
					mark: '1.5'
				},
				{
					q: '3) بيّن الفارق الجوهري بين المرابحة أو المشاركة الإسلامية وبين القرض الربوي المحرم شرعاً.',
					a: '3) القرض الربوي مبادلة نقود بنقود مع اشتراط زيادة مضمونة محرمة شرعاً دون ارتباط بأصل حقيقي؛ أما المرابحة فتقوم على تملك المصرف للتجهيز الحقيقي ثم بيعه بثمن وربح معلومين، والمشاركة تقوم على الاستثمار المباشر وتقاسم الأرباح والخسائر.',
					mark: '1'
				}
			]
		});

		return {
			templateId: this.id,
			seed,
			grade: '3as_eco',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `تبلغ ودائع الزبائن لدى بنك تجاري $${deposits}\\text{ مليار دج}$. إذا رفع البنك المركزي نسبة الاحتياطي الإلزامي من $${oldReservePct}\\%$ إلى $${newReservePct}\\%$، فكم تبلغ السيولة الإضافية الممتصة من هذا البنك؟`,
				questionTextAr: 'احسب أثر رفع نسبة الاحتياطي الإلزامي على السيولة:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الزيادة في الاحتياطي الإلزامي = $${deposits} \\times (${newReservePct}\\% - ${oldReservePct}\\%) = ${absorbedLiquidity}\\text{ مليار دج}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'ادرس السند المصرفي الآتي وأجب عن الأسئلة الثلاثة بوضوح:',
				content: caseBlocks
			},
			hints: [
				'السيولة الممتصة الإضافية = الودائع × (النسبة الجديدة − النسبة القديمة).',
				'ثمن بيع المرابحة ثابت ولا تضاف إليه غرامات ربوية.',
				'استحضر حرمة الفائدة الربوية مقارنة بالتمويل المرتبط بالأصول الحقيقية.'
			],
			solutionStepsAr: [
				`حساب السيولة المحتجزة الإضافية $= ${absorbedLiquidity}\\text{ مليار دج}$.`,
				`حساب هامش المرابحة ($${formatDzd(profitMargin)}\\text{ دج}$) وثمن البيع ($${formatDzd(murabahaTotal)}\\text{ دج}$).`,
				'المقارنة الشرعية والاقتصادية بين التمويل الإسلامي والتمويل الربوي المحرم.'
			],
			finalAnswer: `${absorbedLiquidity} مليار دج | المرابحة: ${formatDzd(murabahaTotal)} دج`
		};
	}
};

// [3] التجارة الخارجية وميزان المدفوعات (4 ن)
const tpl3asEcoT1ForeignTradeBop: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_3as_eco_t1_foreign_trade_bop',
	grade: '3as_eco',
	trimesterId: 't1',
	domain: 'eco_trade_money',
	titleAr: 'التجارة الخارجية وحساب أرصدة ميزان المدفوعات ومعدل التغطية',
	curriculumLessonId: 'mgt_lesson_3as_eco_t1_foreign_trade_bop',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const xGoods = difficulty === 'easy' ? 48 : rng.pick([48, 54, 60]);
		const mGoods = difficulty === 'easy' ? 40 : rng.pick([40, 45, 50]);
		const bc = xGoods - mGoods;
		const tc = roundTo((xGoods / mGoods) * 100, 2);

		const xServ = rng.pick([4, 5]);
		const mServ = rng.pick([7, 8]);
		const bServ = xServ - mServ;
		const netTransfers = rng.pick([2, 3]);
		const currentAccount = bc + bServ + netTransfers;

		const capFinNet = rng.pick([-4, -3, 2]);
		const overallBop = currentAccount + capFinNet;

		const rows: Array<Array<{ label?: string; answer?: string; mark?: string; bold?: boolean }>> = [
			[
				{ label: 'صادرات السلع $X$ / واردات السلع $M$', bold: true },
				{ label: `${xGoods} / ${mGoods} مليار دولار` },
				{ answer: `رصيد الميزان التجاري: ${bc > 0 ? `+${bc}` : bc} مليار دولار`, mark: '0.75' }
			],
			[
				{ label: 'معدل تغطية الواردات بالصادرات $T_c$', bold: true },
				{ label: `$T_c = frac(X, M) times 100$` },
				{ answer: `${tc}% (تغطية تفوق 100%)`, mark: '0.5' }
			],
			[
				{ label: 'ميزان الخدمات ($4$ أو $5$ صادرات مقابل $7$ أو $8$ واردات)', bold: true },
				{ label: `${xServ} دائن / ${mServ} مدين` },
				{ answer: `${bServ} مليار دولار (عجز خدمات)`, mark: '0.5' }
			],
			[
				{ label: 'صافي التحويلات الجارية (من طرف واحد)', bold: true },
				{ label: `+${netTransfers} مليار دولار` },
				{ answer: `رصيد الحساب الجاري: ${currentAccount > 0 ? `+${currentAccount}` : currentAccount} مليار دولار`, mark: '0.75' }
			],
			[
				{ label: 'صافي حساب رأس المال والعمليات المالية', bold: true },
				{ label: `${capFinNet > 0 ? `+${capFinNet}` : capFinNet} مليار دولار` },
				{ answer: `الرصيد الكلي لميزان المدفوعات: ${overallBop > 0 ? `+${overallBop}` : overallBop} مليار دولار`, mark: '0.75' }
			]
		];

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: '1) بالاعتماد على المعطيات الخارجية لبلدٍ ما في الجدول الآتي، احسب الأرصدة ومعدل التغطية:'
			},
			buildManagementTableBlock(['البيان في ميزان المدفوعات', 'التدفقات / القانون', 'الرصيد المحسوب والتفسير'], rows),
			{
				type: 'text',
				content:
					'2) متى تفضّل الدولة تطبيق سياسة الحماية الجمركية بدلاً من التبادل الحر المطلق؟ وما أداتان رئيستان للحماية؟',
				answer:
					'2) تلجأ الدولة للحماية الجمركية لحماية الصناعات الوطنية الناشئة، وصون الأمن الغذائي والاستراتيجي، ومنع سياسات الإغراق التجاري. ومن أدواتها: الرسوم (التعريفة) الجمركية، ونظام الحصص الكمية (الكوتا).',
				mark: '0.75'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '3as_eco',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `بلغت صادرات السلع لبلد $${xGoods}\\text{ مليار دولار}$ ووارداته السلعية $${mGoods}\\text{ مليار دولار}$. احسب معدل التغطية $T_c$ (بالنسبة المئوية، أدخل الرقم فقط):`,
				questionTextAr: 'احسب معدل التغطية $T_c$ (%):',
				questionData: {
					answer: tc,
					displayTemplate: 'T_c = ? %',
					variables: [],
					tolerance: 0.2
				},
				explanation: `$$T_c = \\frac{X}{M} \\times 100 = \\frac{${xGoods}}{${mGoods}} \\times 100 = ${tc}\\%$$`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'ادرس جدول بيانات المعاملات الخارجية الآتي وأجب عن الأسئلة:',
				content
			},
			hints: [
				'رصيد الميزان التجاري $BC = X - M$ ومعدل التغطية $T_c = \\frac{X}{M} \\times 100$.',
				'الحساب الجاري = الميزان التجاري + ميزان الخدمات + صافي التحويلات الجارية.',
				'الرصيد العام لميزان المدفوعات = الحساب الجاري + حساب رأس المال والعمليات المالية.'
			],
			solutionStepsAr: [
				`حساب الميزان التجاري $BC = ${bc}$ مليار دولار و $T_c = ${tc}\\%$.`,
				`حساب ميزان الخدمات ($${bServ}$) والحساب الجاري ($${currentAccount}$).`,
				`حساب الرصيد الكلي لميزان المدفوعات ($${overallBop}$ مليار دولار).`
			],
			finalAnswer: `${tc}`
		};
	}
};

// [4] الصرف وأنظمة سعر الصرف وتوازن ميزان المدفوعات (4 ن)
const tpl3asEcoT1ExchangeRateSystems: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_3as_eco_t1_exchange_rate_systems',
	grade: '3as_eco',
	trimesterId: 't1',
	domain: 'eco_trade_money',
	titleAr: 'سعر الصرف وأنظمته وتأثيره على ميزان المدفوعات',
	curriculumLessonId: 'mgt_lesson_3as_eco_t1_exchange_rate_equilibrium',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const rate1 = difficulty === 'easy' ? 140 : rng.pick([135, 140, 145]);
		const rate2 = rate1 + 14;
		const pctDepr = roundTo(((rate2 - rate1) / rate1) * 100, 2);
		const invRate1 = roundTo(1 / rate1, 4);

		const expEuro = rng.pick([50000, 100000]);
		const impEuro = rng.pick([30000, 60000]);
		const expDzd1 = expEuro * rate1;
		const expDzd2 = expEuro * rate2;
		const impDzd1 = impEuro * rate1;
		const impDzd2 = impEuro * rate2;

		const mcq = buildUniqueMcqOptions(
			`انخفضت قيمة العملة الوطنية بنسبة ${pctDepr}%، مما شجّع الصادرات ورفع كلفة الواردات`,
			[
				{
					text: `ارتفعت قيمة العملة الوطنية بنسبة ${pctDepr}%، مما شجّع الواردات`,
					diagnosticFeedback: 'انتبه: الحاجة لوحدات وطنية أكثر مقابل نفس اليورو تعني انخفاض قيمة العملة الوطنية لا ارتفاعها.'
				},
				{
					text: 'توقف التبادل الخارجي وعاد البلد إلى نظام المقايضة',
					diagnosticFeedback: 'تغير سعر الصرف ظاهرة طبيعية في سوق الصرف المدار أو المرن.'
				},
				{
					text: 'انخفضت كلفة الواردات المقومة بالدينار تلقائياً',
					diagnosticFeedback: 'عند ارتفاع سعر اليورو بالدينار تصبح السلع المستوردة باليورو أغلى بالدينار.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			buildManagementDocumentBlock({
				title: 'وضعية في سوق الصرف: تغير سعر الصرف المباشر وأثره التجاري',
				text: `تصدّر مؤسسة وطنية سلعاً بقيمة ${formatDzd(expEuro)} يورو، وتستورد مدخلات صناعية بقيمة ${formatDzd(impEuro)} يورو. انتقل سعر الصرف المباشر في سوق الصرف المدار من 1 يورو = ${rate1} دج في بداية السنة إلى 1 يورو = ${rate2} دج في نهايتها.`
			}),
			{
				type: 'text',
				content: `1) احسب سعر الصرف غير المباشر لـ $1$ دج باليورو في بداية السنة، ثم حدّد اتجاه تغيّر قيمة العملة الوطنية ونسبته.`,
				answer: `1) التسعير غير المباشر لـ 1 دج في البداية = $frac(1, ${rate1}) approx ${invRate1}$ يورو. وبما أن شراء 1 يورو أصبح يتطلب ${rate2} دج بدلاً من ${rate1} دج، فقد انخفضت قيمة العملة الوطنية بنسبة $frac(${rate2} - ${rate1}, ${rate1}) times 100 = ${pctDepr}$%.`,
				mark: '1.25'
			},
			{
				type: 'text',
				content:
					'2) احسب قيمة الصادرات وقيمة الواردات بالدينار قبل تغيّر السعر وبعده، واستنتج الأثر على عجز ميزان المدفوعات.',
				answer: `2) قبل التغير: الصادرات $= ${formatDzd(expDzd1)}$ دج، والواردات $= ${formatDzd(impDzd1)}$ دج.\nبعد التغير: الصادرات $= ${formatDzd(expDzd2)}$ دج (ارتفاع الإيرادات بالدينار للمصدر)، والواردات $= ${formatDzd(impDzd2)}$ دج (زيادة كلفة الاستيراد مما يكبحه)، وهو ما يساعد في تقليص عجز الميزان التجاري.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content:
					'3) قارن بإيجاز بين نظام الصرف الثابت ونظام الصرف المرن ونظام الصرف المدار، واذكر الضابط الشرعي الأساسي في عمليات الصرف.',
				answer:
					'3) الثابت: يحدده البنك المركزي ويثبّته عبر الاحتياطي؛ المرن: يتحدد حراً بالعرض والطلب؛ المدار: يتفاعل سوقياً مع تدخل البنك المركزي لمنع التقلبات الحادة. الضابط الشرعي: التقابض الفوري (يداً بيد أو قيداً بنكياً حالاً) وتحريم المضاربة الوهمية في العملات.',
				mark: '1.25'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '3as_eco',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في التسعير المباشر، انتقل سعر الصرف من $1\\text{ يورو} = ${rate1}\\text{ دج}$ إلى $1\\text{ يورو} = ${rate2}\\text{ دج}$. ما التفسير الاقتصادي الصحيح لهذا التطور؟`,
				questionTextAr: 'اختر التفسير الصحيح لتغير سعر الصرف:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `يتطلب اليورو الواحد دنانير أكثر ($${rate2}$ بدل $${rate1}$)، أي انخفضت قيمة الدينار بنسبة $${pctDepr}\\%$ مما يدعم الصادرات ويرفع كلفة الواردات.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'ادرس معطيات سوق الصرف التالية وأجب عن الأسئلة الثلاثة:',
				content
			},
			hints: [
				'التسعير غير المباشر هو مقلوب التسعير المباشر.',
				'في التسعير المباشر، ارتفاع الرقم يعني انخفاض قيمة العملة الوطنية.',
				'تتحقق مشروعية الصرف بالتقابض الفوري وتجنب المضاربة الصورية.'
			],
			solutionStepsAr: [
				`التسعير غير المباشر $= ${invRate1}$ يورو، ونسبة تغير السعر $= ${pctDepr}\\%$.`,
				`عائد الصادرات بالدينار ارتفع من $${formatDzd(expDzd1)}$ إلى $${formatDzd(expDzd2)}$ دج.`,
				'المقارنة بين الصرف الثابت والمرن والمدار وذكر شرط التقابض.'
			],
			finalAnswer: `انخفاض العملة الوطنية بـ ${pctDepr}%`
		};
	}
};

// [5] وضعية إدماجية: النقود والمالية الإسلامية والتجارة الخارجية والصرف (8 ن)
const tpl3asEcoT1IntegrationMoneyTrade: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_3as_eco_t1_integration_money_trade',
	grade: '3as_eco',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'وضعية إدماجية للبكالوريا (T1): الكتلة النقدية والمالية الإسلامية وميزان المدفوعات',
	curriculumLessonId: 'mgt_lesson_3as_eco_t1_exchange_rate_equilibrium',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const mCash = rng.pick([4200, 4800]);
		const mSight = rng.pick([3800, 4200]);
		const m1 = mCash + mSight;
		const mQuasi = rng.pick([2000, 3000]);
		const m2 = m1 + mQuasi;

		const expS = difficulty === 'easy' ? 45 : rng.pick([50, 60]);
		const impS = difficulty === 'easy' ? 50 : rng.pick([55, 48]);
		const bc = expS - impS;
		const tc = roundTo((expS / impS) * 100, 2);

		const costEquip = 20000000;
		const rateEur = 145;
		const equipEuro = roundTo(costEquip / rateEur, 2);

		const content: ContentBlock[] = [
			buildManagementDocumentBlock({
				title: 'وضعية إدماجية لبكالوريا الاقتصاد والمناجمنت — الفصل الأول',
				text: `في اقتصاد وطنٍ ما، بلغت العملة المتداولة خارج البنوك ${formatDzd(mCash)} مليار دج، والودائع الجارية ${formatDzd(mSight)} مليار دج، والودائع الادخارية والاستثمارية الحلال لأجل ${formatDzd(mQuasi)} مليار دج. وفي التجارة الخارجية، بلغت الصادرات السلعية ${expS} مليار دولار والواردات السلعية ${impS} مليار دولار. ولمواجهة الضغط التضخمي، رفع البنك المركزي نسبة الاحتياطي الإلزامي وأصدر صكوكاً حكومية إسلامية، كما سعت مؤسسة صناعية مصدرة لتمويل اقتناء معدات بقيمة ${formatDzd(costEquip)} دج عبر صيغ إسلامية مشروعة بسعر صرف 1 يورو = ${rateEur} دج.`,
				source: 'وضعية إدماجية نموذجية للبكالوريا — الفصل الأول'
			}),
			{
				type: 'text',
				content: `1) احسب الكتلة النقدية $M_1$ والكتلة النقدية $M_2$، ثم حدّد وزن أشباه النقود من $M_2$.`,
				answer: `1) $M_1 = ${mCash} + ${mSight} = ${formatDzd(m1)}$ مليار دج.\n$M_2 = ${m1} + ${mQuasi} = ${formatDzd(m2)}$ مليار دج.\nوزن أشباه النقود $= frac(${mQuasi}, ${m2}) times 100 = ${roundTo((mQuasi / m2) * 100, 2)}$%.`,
				mark: '2'
			},
			{
				type: 'text',
				content:
					'2) احسب رصيد الميزان التجاري $"BC"$ ومعدل التغطية $T_c$، وعلّق على الوضعية التجارية للبلد.',
				answer: `2) $"BC" = ${expS} - ${impS} = ${bc > 0 ? `+${bc}` : bc}$ مليار دولار (${bc >= 0 ? 'فائض تجاري' : 'عجز تجاري'}).\n$T_c = frac(${expS}, ${impS}) times 100 = ${tc}$%. ${bc >= 0 ? 'تغطي الصادرات كامل الواردات وتحقق فائضاً يدعم احتياطي الصرف.' : 'لا تغطي الصادرات كامل الواردات مما يتطلب ترشيد الاستيراد وتنويع الصادرات.'}`,
				mark: '2'
			},
			{
				type: 'text',
				content:
					'3) اقترح للمؤسسة المصدرة صيغتي تمويل إسلامي بديلتين عن القروض الربوية المحرمة لاقتناء معداتها، مع حساب قيمة المعدات باليورو عند سعر الصرف المذكور.',
				answer: `3) قيمة المعدات باليورو $= frac(${costEquip}, ${rateEur}) approx ${formatDzd(equipEuro)}$ يورو.\nالصيغتان الإسلاميتان البديلتان عن الربا: (أ) عقد المرابحة للآمر بالشراء (يشتري المصرف المعدات ويبيعها للمؤسسة بأقساط وهامش ربح معلوم)، أو (ب) عقد الإجارة المنتهية بالتمليك، أو المشاركة التمويلية في الأرباح والخسائر.`,
				mark: '2.5'
			},
			{
				type: 'text',
				content:
					'4) فسّر كيف يعالج البنك المركزي اختلال السيولة النقدية وحماية احتياطي الصرف دون توسيع التعاملات الربوية.',
				answer:
					'4) يضبط البنك المركزي السيولة عبر رفع نسبة الاحتياطي الإلزامي وسقوف إعادة التمويل وإصدار صكوك إسلامية مرتبطة بأصول حقيقية لامتصاص الفائض النقدي وتوجيهه للاستثمار الإنتاجي التصديري الذي يدعم احتياطي الصرف واستقرار العملة.',
				mark: '1.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '3as_eco',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'matching',
				questionText: 'اربط كل مؤشر أو أداة اقتصادية بتفسيرها الصحيح في الوضعية الإدماجية:',
				questionTextAr: 'صل بين المفهوم ودلالته:',
				questionData: {
					pairs: [
						{ left: `المجمع النقدي $M_1 = ${m1}$ مليار دج`, right: 'العملة المتداولة + الودائع الجارية تحت الطلب' },
						{ left: `معدل التغطية $T_c = ${tc}\\%$`, right: 'نسبة تغطية الصادرات السلعية للواردات' },
						{ left: 'الصكوك الإسلامية والاحتياطي الإلزامي', right: 'أدوات ضبط السيولة دون ربا محرم' },
						{ left: 'المرابحة والإجارة المنتهية بالتمليك', right: 'تمويل المعدات الحقيقية بديلاً عن الربا' }
					]
				},
				explanation:
					'تدمج هذه الوضعية محاور النقود والنظام المصرفي الإسلامي والتجارة الخارجية والصرف.'
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية للبكالوريا (08 نقاط)',
				points: this.defaultPoints,
				instruction: 'ادرس السند الإحصائي الاقتصادي الآتي وأجب عن الأسئلة الأربعة بدقة:',
				content
			},
			hints: [
				'افصل بوضوح بين $M_1$ (سيولة فورية) وأشباه النقود للوصول إلى $M_2$.',
				'قارن رصيد الميزان التجاري ومعدل التغطية بـ $100\\%$.',
				'استحضر الصيغ الإسلامية المعتمدة على الأصول الحقيقية وتقاسم المخاطر.'
			],
			solutionStepsAr: [
				`حساب $M_1 = ${formatDzd(m1)}$ و $M_2 = ${formatDzd(m2)}\\text{ مليار دج}$.`,
				`حساب $BC = ${bc}$ مليار دولار و $T_c = ${tc}\\%$.`,
				`تحويل قيمة المعدات (${formatDzd(equipEuro)}\\text{ يورو}$) وتقديم المرابحة والإجارة وأدوات ضبط السيولة.`
			],
			finalAnswer: `M1=${m1}, M2=${m2}, Tc=${tc}%`
		};
	}
};

export const TEMPLATES_3AS_ECO_T1: ManagementParameterizedTemplate[] = [
	tpl3asEcoT1MoneyMassM1M2,
	tpl3asEcoT1CentralBankIslamicFinance,
	tpl3asEcoT1ForeignTradeBop,
	tpl3asEcoT1ExchangeRateSystems,
	tpl3asEcoT1IntegrationMoneyTrade
];
