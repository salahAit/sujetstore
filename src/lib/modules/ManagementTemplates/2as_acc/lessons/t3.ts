import type { ManagementInteractiveLessonData } from '../../types';

// ═══════════════════════════════════════════════════════════════════════════════
// 2AS GE Accounting & Finance (التسيير المحاسبي والمالي) — T3 Lessons
// ═══════════════════════════════════════════════════════════════════════════════

export const LESSONS_2AS_ACC_T3: ManagementInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 9 (T3): أعباء المستخدمين وإعداد كشف الأجر
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_lesson_2as_acc_t3_payroll_irg',
		slug: 'mgt-2as-acc-t3-payroll-irg',
		grade: '2as_acc',
		yearSubjectId: 744,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المجال المفاهيمي الثالث: أعباء المستخدمين والنتائج الأولية والجرد العام',
		order: 9,
		titleAr: 'أعباء المستخدمين وإعداد كشف الأجر (الأجر القاعدي، الضمان الاجتماعي 9%، IRG)',
		objectives: [
			'التمييز بين عناصر الأجر الخاضعة لاشتراك الضمان الاجتماعي (أجر المنصب) والعناصر المعفاة (السلة، النقل، المنح العائلية)',
			'حساب اقتطاع الضمان الاجتماعي للعامل (9%)، والأجر الخاضع لضريبة الدخل الإجمالي (IRG)، والأجر الصافي للدفع',
			'حساب الأعباء الاجتماعية لرب العمل (26%) وتسجيل القيود المحاسبية للأجور والاشتراكات وتسديدها وفق (SCF)'
		],
		keywordsAr: [
			'أجر المنصب',
			'الضمان الاجتماعي 9%',
			'ضريبة الدخل IRG',
			'الأجر الصافي للدفع',
			'أعباء المستخدمين حـ/ 63',
			'كشف الأجر'
		],
		discover: {
			scenarioAr:
				'يعمل «أمين» محاسباً بمؤسسة «متيجة»، ويتضمن كشف أجره لشهر ماي المعطيات الآتية: الأجر القاعدي $42\\,000$ دج، تعويض الخبرة المهنية $4\\,000$ دج، منحة المردودية الفردية $4\\,000$ دج، تعويض السلة $3\\,500$ دج، تعويض النقل $2\\,500$ دج. بلغت ضريبة الدخل الإجمالي (IRG) المحددة حسب الجدول $5\\,400$ دج، وتحصل على تسبيق خلال الشهر بمبلغ $6\\,000$ دج.',
			svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 220" width="640" height="220" role="img" aria-label="هيكلة كشف الأجر الجزائري">
  <rect width="640" height="220" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>
  <text x="320" y="26" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="14.5" font-weight="700" fill="#0f172a">سلم حساب كشف الأجر وفق التشريع الجزائري (SCF حـ/ 63)</text>
  <rect x="435" y="45" width="180" height="72" rx="9" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.6"/>
  <text x="525" y="70" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12" font-weight="700" fill="#1e3a8a">1. أجر المنصب</text>
  <text x="525" y="92" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="10.5" fill="#334155">أجر قاعدي + خبرة + مردودية</text>
  <text x="525" y="108" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="10.5" font-weight="700" fill="#dc2626">− ضمان اجتماعي (9%)</text>
  <text x="415" y="85" text-anchor="middle" font-family="'Cairo', sans-serif" font-size="17" font-weight="700" fill="#334155">←</text>
  <rect x="230" y="45" width="170" height="72" rx="9" fill="#ecfdf5" stroke="#059669" stroke-width="1.6"/>
  <text x="315" y="70" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12" font-weight="700" fill="#065f46">2. الأجر الخاضع لـ IRG</text>
  <text x="315" y="92" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="10.5" fill="#334155">(أجر المنصب − 9%) + سلة + نقل</text>
  <text x="315" y="108" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="10.5" font-weight="700" fill="#dc2626">− اقتطاع IRG (حـ/ 442)</text>
  <text x="210" y="85" text-anchor="middle" font-family="'Cairo', sans-serif" font-size="17" font-weight="700" fill="#334155">←</text>
  <rect x="25" y="45" width="170" height="72" rx="9" fill="#fffbeb" stroke="#b45309" stroke-width="1.8"/>
  <text x="110" y="70" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12" font-weight="700" fill="#92400e">3. الصافي للدفع (421)</text>
  <text x="110" y="92" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="10.5" fill="#334155">+ منح عائلية (معفاة)</text>
  <text x="110" y="108" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="10.5" font-weight="700" fill="#dc2626">− التسبيقات (حـ/ 425)</text>
  <rect x="65" y="138" width="510" height="58" rx="9" fill="#ffffff" stroke="#0f766e" stroke-width="1.5"/>
  <text x="320" y="162" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12" font-weight="700" fill="#0f766e">الأعباء الإجمالية للمؤسسة = حـ/ 631 (الأجر الإجمالي الخام) + حـ/ 635 (اشتراكات رب العمل 26% × أجر المنصب)</text>
  <text x="320" y="182" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">ملاحظة: الأجر الإجمالي الخام = أجر المنصب + التعويضات (السلة والنقل) + المنح العائلية</text>
</svg>`,
			steps: [
				{
					promptAr: 'احسب أجر المنصب واقتطاع الضمان الاجتماعي للعامل ($9\\%$).',
					hintAr: 'أجر المنصب يشمل القاعدي + الخبرة + المردودية (ولا يشمل السلة والنقل).',
					expectedInput: '50000 و 4500',
					revealAr:
						'أجر المنصب $= 42\\,000 + 4\\,000 + 4\\,000 = 50\\,000$ دج. اشتراك الضمان الاجتماعي للعامل $= 50\\,000 \\times 0.09 = 4\\,500$ دج (حـ/ $431$).'
				},
				{
					promptAr: 'احسب الأجر الخاضع للضريبة (IRG) والأجر الصافي للدفع بعد خصم الضريبة والتسبيق.',
					hintAr: 'الأجر الخاضع = (أجر المنصب − $4\\,500$) + السلة + النقل؛ ثم نطرح IRG والتسبيق.',
					expectedInput: '40100',
					revealAr:
						'الأجر الخاضع للضريبة $= (50\\,000 - 4\\,500) + 3\\,500 + 2\\,500 = 51\\,500$ دج. الصافي للدفع $= 51\\,500 - 5\\,400 - 6\\,000 = 40\\,100$ دج (حـ/ $421$).'
				},
				{
					promptAr: 'ما مبلغ الأعباء الاجتماعية التي تتحملها المؤسسة (رب العمل بمعدل $26\\%$) على أجر المنصب؟',
					hintAr: 'تتحمل المؤسسة $26\\%$ من أجر المنصب ($50\\,000$ دج) في حـ/ $635$.',
					expectedInput: '13000',
					revealAr:
						'أعباء الضمان الاجتماعي لرب العمل $= 50\\,000 \\times 0.26 = 13\\,000$ دج (مدين حـ/ $635$ / دائن حـ/ $431$). ويكون الأجر الإجمالي الخام المسجل في حـ/ $631$ هو $50\\,000 + 3\\,500 + 2\\,500 = 56\\,000$ دج.'
				}
			]
		},
		summary: {
			rulesAr: [
				'أجر المنصب (Salaire de poste): مجموع العناصر الخاضعة لاشتراك الضمان الاجتماعي: $\\text{الأجر القاعدي} + \\text{الساعات الإضافية} + \\text{منح الخبرة والمردودية والضرر والعمل التناوبي}$.',
				'اشتراك الضمان الاجتماعي: يقتطع من العامل بنسبة $9\\%$ من أجر المنصب في دائن حـ/ $431$، وتتحمل المؤسسة (رب العمل) اشتراكاً بنسبة $26\\%$ من أجر المنصب ($25\\%$ ضمان اجتماعي + $1\\%$ خدمات/سكن حسب التوزيع التشريعي) في مدين حـ/ $635$ مقابل دائن حـ/ $431$.',
				'الأجر الخاضع لضريبة الدخل الإجمالي (IRG): $\\text{أجر المنصب} - \\text{الضمان الاجتماعي } (9\\%) + \\text{التعويضات المعفاة من الضمان الخاضعة للضريبة كالسلة والنقل}$. تُقتطع الـ IRG وفق السلم التصاعدي في دائن حـ/ $442$.',
				'الأجر الصافي للدفع (حـ/ $421$): $\\text{الأجر الإجمالي الخام} - \\text{الضمان الاجتماعي } (9\\%) - \\text{IRG} - \\text{التسبيقات على الأجور } (425) - \\text{الاعتراضات } (427)$.',
				'القيود المحاسبية للأجور: (1) إثبات الأجر: مدين حـ/ $631$ (الأجر الخام) / دائن حـ/ $431$، حـ/ $442$، حـ/ $425$، حـ/ $421$؛ (2) إثبات أعباء رب العمل: مدين حـ/ $635$ / دائن حـ/ $431$؛ (3) التسديد: ترصيد $421$ و$431$ و$442$ مقابل حـ/ $512$.'
			],
			visualSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 185" width="640" height="185" role="img" aria-label="توزيع الأجر الخام والاقتطاعات">
  <rect width="640" height="185" rx="14" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.4"/>
  <text x="320" y="26" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="14.5" font-weight="700" fill="#1e3a8a">التوازن المحاسبي لقيد إثبات الأجور (حـ/ 631 مدين = مجموع الدائنين)</text>
  <rect x="415" y="48" width="195" height="96" rx="10" fill="#ffffff" stroke="#059669" stroke-width="1.8"/>
  <text x="512" y="80" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="13" font-weight="700" fill="#065f46">الجانب المدين</text>
  <text x="512" y="106" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12" fill="#0f172a">حـ/ 631 أجور المستخدمين</text>
  <text x="512" y="128" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#475569">(الأجر الإجمالي الخام)</text>
  <text x="394" y="102" text-anchor="middle" font-family="'Cairo', sans-serif" font-size="22" font-weight="700" fill="#0f172a">=</text>
  <rect x="28" y="48" width="345" height="96" rx="10" fill="#ffffff" stroke="#1d4ed8" stroke-width="1.8"/>
  <text x="200" y="74" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="13" font-weight="700" fill="#1d4ed8">الجانب الدائن (توزيع الأجر الخام)</text>
  <text x="200" y="100" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" fill="#0f172a">حـ/ 431 هيئات اجتماعية (9%) + حـ/ 442 ضرائب IRG</text>
  <text x="200" y="124" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" fill="#0f172a">+ حـ/ 425 تسبيقات ممنوحة + حـ/ 421 الأجور المستحقة (الصافي)</text>
  <text x="320" y="168" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" font-weight="700" fill="#0f766e">تُسجل أعباء رب العمل في قيد مستقل: من حـ/ 635 إلى حـ/ 431 (26% × أجر المنصب)</text>
</svg>`,
			visualCaptionAr: 'معادلة التوازن بين الأجر الخام وتوزيعه المحاسبي في قيد الأجور',
			examples: [
				{
					problemAr:
						'عامل أجره القاعدي $36\\,000$ دج، منحة خبرة $4\\,000$ دج، سلة ونقل $5\\,000$ دج، وIRG $3\\,200$ دج. احسب الأجر الإجمالي الخام، اشتراك العامل، والأجر الصافي للدفع.',
					solutionAr:
						'أجر المنصب $= 36\\,000 + 4\\,000 = 40\\,000$ دج. الأجر الإجمالي الخام $= 40\\,000 + 5\\,000 = 45\\,000$ دج. الضمان الاجتماعي $9\\% = 40\\,000 \\times 0.09 = 3\\,600$ دج. الصافي للدفع $= 45\\,000 - 3\\,600 - 3\\,200 = 38\\,200$ دج.'
				},
				{
					problemAr:
						'منحت مؤسسة تسبيقاً نقدياً لعامل بمبلغ $10\\,000$ دج في منتصف الشهر. كيف يُسجل التسبيق وكيف يُرصد عند إعداد الأجر؟',
					solutionAr:
						'عند المنح: مدين حـ/ $425$ المستخدمون تسبيقات ($10\\,000$) / دائن حـ/ $53$ الصندوق ($10\\,000$). عند إثبات كشف الأجر في نهاية الشهر يُدرج حـ/ $425$ في الجانب الدائن بمبلغ $10\\,000$ دج فيُرصد.'
				}
			],
			watchOutAr:
				'يُحسب اشتراك الضمان الاجتماعي ($9\\%$ للعامل و$26\\%$ لرب العمل) على **أجر المنصب فقط** وليس على الأجر الإجمالي الخام الذي يتضمن السلة والنقل والمنح العائلية.'
		},
		practice: [
			{
				questionAr: 'عامل أجره القاعدي $45\\,000$ دج، منحة مردودية $5\\,000$ دج، وتعويض نقل $3\\,000$ دج. كم يساوي اشتراك الضمان الاجتماعي للعامل ($9\\%$)?',
				options: ['$4\\,500$ دج', '$4\\,770$ دج', '$4\\,050$ دج', '$13\\,000$ دج'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'تعويض النقل معفى من اشتراك الضمان الاجتماعي ولا يدخل في أجر المنصب.',
					'نسيت إدراج منحة المردودية ضمن أجر المنصب.',
					'$13\\,000$ دج تمثل اشتراك رب العمل ($26\\%$) لا اشتراك العامل.'
				],
				explanationAr: 'أجر المنصب = $45\\,000 + 5\\,000 = 50\\,000$ دج؛ اشتراك العامل $= 50\\,000 \\times 0.09 = 4\\,500$ دج.'
			},
			{
				questionAr: 'في أي حساب يُسجل مبلغ ضريبة الدخل الإجمالي (IRG) المقتطعة من أجور العمال قبل دفعها لمصالح الضرائب؟',
				options: ['دائن حـ/ 442', 'مدين حـ/ 631', 'دائن حـ/ 431', 'مدين حـ/ 421'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'حـ/ 631 يثبت الأجر الإجمالي الخام في المدين.',
					'حـ/ 431 خاص بهيئات الضمان الاجتماعي لا الضرائب.',
					'حـ/ 421 يسجل فيه الأجر الصافي للدفع في الدائن.'
				],
				explanationAr: 'الضرائب المقتطعة من المنبع (IRG) هي دين مستحق للخزينة العمومية يُثبت في دائن حـ/ 442.'
			},
			{
				questionAr: 'ما أثر التسبيقات المدفوعة للعمال (حـ/ 425) على الأجر الصافي للدفع في نهاية الشهر؟',
				options: [
					'تُطرح من الأجر الصافي المستحق لتحديد الصافي للدفع',
					'تُضاف إلى أجر المنصب وتزيد اشتراك 9%',
					'تُسجل في مدين حـ/ 635 كأعباء اجتماعية',
					'لا تؤثر في حساب حـ/ 421'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'التسبيق جزء من الأجر مُنح مسبقاً وليس منحة جديدة.',
					'حـ/ 635 خاص بأعباء الضمان الاجتماعي لرب العمل.',
					'طرح التسبيق ضروري حتى لا يأخذ العامل المبلغ مرتين.'
				],
				explanationAr: 'تُخصم التسبيقات (حـ/ 425) عند تسوية الأجر الصافي لكي يتسلم العامل الباقي فقط في حـ/ 421.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 10 (T3): القيمة المضافة والنتائج الأولية
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_lesson_2as_acc_t3_value_added_results',
		slug: 'mgt-2as-acc-t3-value_added_results',
		grade: '2as_acc',
		yearSubjectId: 744,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المجال المفاهيمي الثالث: أعباء المستخدمين والنتائج الأولية والجرد العام',
		order: 10,
		titleAr: 'القيمة المضافة والنتائج الأولية (حساب النتائج المبسط)',
		objectives: [
			'حساب إنتاج السنة المالية واستهلاك السنة المالية من أرصدة حسابات الصنفين 7 و6',
			'حساب القيمة المضافة للاستغلال (VA) وإجمالي فائض الاستغلال (EBE) وتفسير دلالتهما الاقتصادية',
			'استنتاج النتيجة العملياتية والنتيجة العادية قبل الضرائب ثم النتيجة الصافية للسنة المالية (حـ/ 120 أو 129)'
		],
		keywordsAr: [
			'إنتاج السنة المالية',
			'استهلاك السنة المالية',
			'القيمة المضافة VA',
			'إجمالي فائض الاستغلال EBE',
			'النتيجة العملياتية',
			'النتيجة الصافية'
		],
		discover: {
			scenarioAr:
				'قدّمت مؤسسة «الواحات الإنتاجية» في نهاية السنة الأرصدة الآتية: المبيعات والمنتوجات الملحقة (حـ/ $70$) $2\\,800\\,000$ دج، الإنتاج المخزن (حـ/ $72$ دائن) $200\\,000$ دج، المشتريات المستهلكة (حـ/ $60$) $1\\,400\\,000$ دج، الخدمات الخارجية الأخرى (حـ/ $61+62$) $300\\,000$ دج، أعباء المستخدمين (حـ/ $63$) $550\\,000$ دج، الضرائب والرسوم (حـ/ $64$) $150\\,000$ دج، مخصصات الاهتلاكات (حـ/ $68$) $200\\,000$ دج، ومعدل الضريبة على الأرباح (IBS) $19\\%$.',
			svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 215" width="640" height="215" role="img" aria-label="سلم القيمة المضافة والنتائج الأولية">
  <rect width="640" height="215" rx="14" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1.4"/>
  <text x="320" y="26" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="14.5" font-weight="700" fill="#065f46">تدرج حساب النتائج الأولية وفق النظام المحاسبي المالي (SCF)</text>
  <rect x="445" y="46" width="168" height="72" rx="9" fill="#ffffff" stroke="#059669" stroke-width="1.7"/>
  <text x="529" y="72" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12.5" font-weight="700" fill="#047857">1. القيمة المضافة VA</text>
  <text x="529" y="96" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">الإنتاج (70..74) − الاستهلاك (60..62)</text>
  <text x="426" y="86" text-anchor="middle" font-family="'Cairo', sans-serif" font-size="17" font-weight="700" fill="#334155">←</text>
  <rect x="236" y="46" width="170" height="72" rx="9" fill="#ffffff" stroke="#1d4ed8" stroke-width="1.7"/>
  <text x="321" y="72" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12.5" font-weight="700" fill="#1d4ed8">2. فائض الاستغلال EBE</text>
  <text x="321" y="96" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">VA − (حـ/ 63 + حـ/ 64)</text>
  <text x="217" y="86" text-anchor="middle" font-family="'Cairo', sans-serif" font-size="17" font-weight="700" fill="#334155">←</text>
  <rect x="26" y="46" width="172" height="72" rx="9" fill="#ffffff" stroke="#b45309" stroke-width="1.7"/>
  <text x="112" y="72" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12.5" font-weight="700" fill="#92400e">3. النتيجة العملياتية</text>
  <text x="112" y="96" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">EBE + 75 − 65 − 68 + 78</text>
  <rect x="95" y="136" width="450" height="58" rx="10" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>
  <text x="320" y="160" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12.5" font-weight="700" fill="#0f172a">4. النتيجة العادية قبل الضرائب − ضريبة الأرباح IBS (695) = النتيجة الصافية (120 / 129)</text>
  <text x="320" y="180" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#475569">تقيس القيمة المضافة الثروة الحقيقية التي أضافتها المؤسسة للاقتصاد الوطني</text>
</svg>`,
			steps: [
				{
					promptAr: 'احسب كلاً من إنتاج السنة المالية واستهلاك السنة المالية، ثم استنتج القيمة المضافة للاستغلال (VA).',
					hintAr: 'الإنتاج $= 70 + 72$، والاستهلاك $= 60 + 61 + 62$.',
					expectedInput: '1300000',
					revealAr:
						'إنتاج السنة المالية $= 2\\,800\\,000 + 200\\,000 = 3\\,000\\,000$ دج. استهلاك السنة المالية $= 1\\,400\\,000 + 300\\,000 = 1\\,700\\,000$ دج. القيمة المضافة $VA = 3\\,000\\,000 - 1\\,700\\,000 = 1\\,300\\,000$ دج.'
				},
				{
					promptAr: 'احسب إجمالي فائض الاستغلال (EBE) ثم النتيجة العملياتية (التي تساوي النتيجة العادية قبل الضرائب لغياب عناصر مالية).',
					hintAr: 'اطرح أعباء المستخدمين والضرائب من VA، ثم اطرح حـ/ 68.',
					expectedInput: '400000',
					revealAr:
						'$EBE = 1\\,300\\,000 - 550\\,000 - 150\\,000 = 600\\,000$ دج. النتيجة العملياتية $= 600\\,000 - 200\\,000 = 400\\,000$ دج.'
				},
				{
					promptAr: 'احسب الضريبة على الأرباح (IBS بنسبة $19\\%$) ثم النتيجة الصافية للسنة المالية.',
					hintAr: 'اضرب $400\\,000$ دج في $0.19$ واطرح الناتج.',
					expectedInput: '324000',
					revealAr:
						'$IBS = 400\\,000 \\times 0.19 = 76\\,000$ دج (حـ/ $695$). النتيجة الصافية للسنة المالية $= 400\\,000 - 76\\,000 = 324\\,000$ دج (ربح صافي حـ/ $120$).'
				}
			]
		},
		summary: {
			rulesAr: [
				'إنتاج السنة المالية: يجمع حـ/ $70$ (المبيعات) $\\pm$ حـ/ $72$ (الإنتاج المخزن أو المنتقص من المخزون) $+$ حـ/ $73$ (الإنتاج المثبت) $+$ حـ/ $74$ (إعانات الاستغلال).',
				'استهلاك السنة المالية: يجمع حـ/ $60$ (المشتريات المستهلكة) $+$ حـ/ $61$ و $62$ (الخدمات الخارجية والاستهلاكات الأخرى).',
				'القيمة المضافة للاستغلال ($VA$): $VA = \\text{إنتاج السنة المالية} - \\text{استهلاك السنة المالية}$، وتعبر عن الثروة المضافة التي تولدت بفضل جهد عمال المؤسسة وتجهيزاتها.',
				'إجمالي فائض الاستغلال ($EBE$): $EBE = VA - \\text{حـ/ } 63 (\\text{أعباء المستخدمين}) - \\text{حـ/ } 64 (\\text{الضرائب والرسوم})$، ويقيس المردود الاقتصادي الصرف لنشاط الاستغلال.',
				'النتيجة العملياتية والنتيجة الصافية: $\\text{النتيجة العملياتية} = EBE + 75 - 65 - 68 + 78$. وبعد إضافة أو طرح النتيجة المالية الحلال ($76 - 66$) وطرح الضرائب على النتائج (حـ/ $695$: $19\\%$ للإنتاج و$26\\%$ للتجارة والخدمات) نحصل على النتيجة الصافية للسنة المالية.'
			],
			visualSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 180" width="640" height="180" role="img" aria-label="توزيع القيمة المضافة">
  <rect width="640" height="180" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>
  <text x="320" y="26" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="14.5" font-weight="700" fill="#0f172a">توزيع الثروة المضافة (VA) بين الشركاء الاقتصاديين</text>
  <rect x="430" y="48" width="180" height="92" rx="10" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.6"/>
  <text x="520" y="78" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="13" font-weight="700" fill="#1e3a8a">العمال (حـ/ 63)</text>
  <text x="520" y="106" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" fill="#334155">أجور واشتراكات اجتماعية</text>
  <rect x="230" y="48" width="180" height="92" rx="10" fill="#fffbeb" stroke="#b45309" stroke-width="1.6"/>
  <text x="320" y="78" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="13" font-weight="700" fill="#92400e">الدولة (حـ/ 64 و 695)</text>
  <text x="320" y="106" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" fill="#334155">ضرائب ورسوم على النشاط والأرباح</text>
  <rect x="30" y="48" width="180" height="92" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="1.6"/>
  <text x="120" y="78" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="13" font-weight="700" fill="#065f46">المؤسسة (حـ/ 68 و 12)</text>
  <text x="120" y="106" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" fill="#334155">مخصصات التجهيز والربح الصافي</text>
  <text x="320" y="164" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" font-weight="700" fill="#0f172a">إجمالي فائض الاستغلال (EBE) هو نصيب المؤسسة والممولين المشروعين قبل الاهتلاك والضريبة</text>
</svg>`,
			visualCaptionAr: 'الأطراف المستفيدة من القيمة المضافة المتولدة في المؤسسة',
			examples: [
				{
					problemAr:
						'في مؤسسة تجارية: مبيعات البضائع $1\\,900\\,000$ دج، مشتريات البضائع المبيعة $1\\,100\\,000$ دج، الخدمات الخارجية $120\\,000$ دج، حـ/ $63$ يساوي $280\\,000$ دج، حـ/ $64$ يساوي $60\\,000$ دج. احسب VA وEBE.',
					solutionAr:
						'$VA = 1\\,900\\,000 - (1\\,100\\,000 + 120\\,000) = 680\\,000$ دج. $EBE = 680\\,000 - (280\\,000 + 60\\,000) = 340\\,000$ دج.'
				},
				{
					problemAr:
						'إذا كان رصيد حـ/ $72$ (الإنتاج المخزن) مديناً بمبلغ $45\\,000$ دج في مؤسسة صناعية، وكان حـ/ $701$ يساوي $850\\,000$ دج، فكم يبلغ إنتاج السنة المالية؟',
					solutionAr:
						'بما أن رصيد حـ/ $72$ مدين فهذا يعني انتقاصاً من المخزون (يُطرح)، وبالتالي: $\\text{إنتاج السنة المالية} = 850\\,000 - 45\\,000 = 805\\,000$ دج.'
				}
			],
			watchOutAr:
				'انتبه لطبيعة رصيد حـ/ $72$ (تغير مخزون المنتجات): إذا كان دائناً يُضاف إلى المبيعات، وإذا كان مديناً يُطرح منها.'
		},
		practice: [
			{
				questionAr: 'ما الصيغة الصحيحة لحساب القيمة المضافة للاستغلال (VA)؟',
				options: [
					'إنتاج السنة المالية − استهلاك السنة المالية',
					'إنتاج السنة المالية − أعباء المستخدمين',
					'إجمالي فائض الاستغلال − المشتريات المستهلكة',
					'المبيعات − الضريبة على الأرباح'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'أعباء المستخدمين تُطرح من VA للحصول على EBE.',
					'المشتريات المستهلكة تدخل في استهلاك السنة المالية.',
					'الضريبة على الأرباح تُطرح في المرحلة الأخيرة.'
				],
				explanationAr: 'القيمة المضافة للاستغلال $VA = \\text{الإنتاج (70 إلى 74)} - \\text{الاستهلاك (60 إلى 62)}$.'
			},
			{
				questionAr: 'إذا بلغت VA $950\\,000$ دج، وحـ/ $63$ $420\\,000$ دج، وحـ/ $64$ $80\\,000$ دج، فكم يساوي إجمالي فائض الاستغلال (EBE)؟',
				options: ['$450\\,000$ دج', '$530\\,000$ دج', '$500\\,000$ دج', '$1\\,450\\,000$ دج'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'نسيت طرح الضرائب والرسوم حـ/ $64$ ($80\\,000$ دج).',
					'تحقق من الحساب: $950\\,000 - 420\\,000 - 80\\,000$.',
					'الأعباء تُطرح من VA لا تُجمع معها.'
				],
				explanationAr: '$EBE = 950\\,000 - (420\\,000 + 80\\,000) = 450\\,000$ دج.'
			},
			{
				questionAr: 'ما معدل الضريبة على أرباح الشركات (IBS) المطبق على النشاط الإنتاجي (الصناعي) وعلى النشاط التجاري في الجزائر على التوالي؟',
				options: ['19% للإنتاجي و 26% للتجاري', '26% للإنتاجي و 19% للتجاري', '9% للإنتاجي و 19% للتجاري', '19% للجميع دون استثناء'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'عكست النسبتين: الإنتاج الصناعي يحظى بالمعدل المخفض 19%.',
					'معدل 9% يخص الـ TVA المخفضة لا الـ IBS.',
					'يميز القانون الجبائي بين الأنشطة الإنتاجية والتجارية والخدماتية.'
				],
				explanationAr: 'تخضع أرباح المؤسسات الإنتاجية لمعدل $19\\%$ بينما تخضع الأنشطة التجارية والخدماتية لمعدل $26\\%$ (و$23\\%$ لبعض أنشطة البناء والسياحة).'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 11 (T3): الجرد العام والميزانية الختامية
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_lesson_2as_acc_t3_general_inventory_closing',
		slug: 'mgt-2as-acc-t3-general-inventory-closing',
		grade: '2as_acc',
		yearSubjectId: 744,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المجال المفاهيمي الثالث: أعباء المستخدمين والنتائج الأولية والجرد العام',
		order: 11,
		titleAr: 'الجرد العام والميزانية الختامية',
		objectives: [
			'استيعاب مفهوم الجرد السنوي العام (المادي والمحاسبي) وهدفه في التأكد من الصورة الصادقة للذمة المالية',
			'إنجاز قيود تجميع وترصيد حسابات التسيير (الأعباء 6 والمنتوجات 7) لاستخراج النتيجة الصافية في حـ/ 12',
			'إعداد الميزانية الختامية المصنفة في 31 ديسمبر وإدراج النتيجة الصافية (120 ربح أو 129 خسارة) ضمن الأموال الخاصة'
		],
		keywordsAr: [
			'الجرد العام',
			'الجرد المادي',
			'إقفال حسابات التسيير',
			'تحديد النتيجة حـ/ 12',
			'الميزانية الختامية',
			'توازن 31 ديسمبر'
		],
		discover: {
			scenarioAr:
				'في $31$ ديسمبر أجرت مؤسسة «الشلف التجارية» جردها السنوي العام، وأظهر ميزان المراجعة الأرصدة الآتية: التثبيتات $1\\,800\\,000$ دج، المخزونات $420\\,000$ دج، الزبائن $180\\,000$ دج، البنك والصندوق $250\\,000$ دج؛ ورأس المال $1\\,900\\,000$ دج، الموردون $350\\,000$ دج، مجموع حسابات المنتوجات (حـ/ $7$) $1\\,250\\,000$ دج، ومجموع حسابات الأعباء (حـ/ $6$) $850\\,000$ دج.',
			svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 205" width="640" height="205" role="img" aria-label="إقفال الدورة والميزانية الختامية">
  <rect width="640" height="205" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>
  <text x="320" y="26" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="14.5" font-weight="700" fill="#0f172a">آلية إقفال حسابات التسيير وإعداد الميزانية الختامية في 31/12</text>
  <rect x="435" y="48" width="178" height="90" rx="10" fill="#fef2f2" stroke="#dc2626" stroke-width="1.6"/>
  <text x="524" y="75" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12.5" font-weight="700" fill="#991b1b">1. الجرد والترصيد (6 و 7)</text>
  <text x="524" y="99" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">قيد: حـ/ 7 مديناً ← حـ/ 12</text>
  <text x="524" y="119" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">قيد: حـ/ 12 مديناً ← حـ/ 6</text>
  <text x="415" y="96" text-anchor="middle" font-family="'Cairo', sans-serif" font-size="18" font-weight="700" fill="#334155">←</text>
  <rect x="232" y="48" width="172" height="90" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="1.6"/>
  <text x="318" y="75" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12.5" font-weight="700" fill="#065f46">2. استخراج حـ/ 12</text>
  <text x="318" y="99" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">إذا 7 &gt; 6: ربح (120 دائن)</text>
  <text x="318" y="119" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">إذا 6 &gt; 7: خسارة (129 مدين)</text>
  <text x="212" y="96" text-anchor="middle" font-family="'Cairo', sans-serif" font-size="18" font-weight="700" fill="#334155">←</text>
  <rect x="26" y="48" width="176" height="90" rx="10" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.8"/>
  <text x="114" y="75" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12.5" font-weight="700" fill="#1e3a8a">3. الميزانية الختامية</text>
  <text x="114" y="99" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">حسابات الميزانية (1 إلى 5)</text>
  <text x="114" y="119" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">+ النتيجة 12 في الأموال الخاصة</text>
  <text x="320" y="172" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" font-weight="700" fill="#0f172a">بعد ترصيد حـ/ 6 و حـ/ 7، تتساوى النتيجة المحسوبة من التسيير مع النتيجة المستخرجة من الميزانية الختامية</text>
</svg>`,
			steps: [
				{
					promptAr: 'احسب النتيجة الصافية بطريقتين: من حسابات التسيير (7 − 6)، ومن الميزانية (الأصول − رأس المال والموردين).',
					hintAr: 'يجب أن تتطابق النتيجة المحسوبة من الطريقتين تماماً ($400\\,000$ دج).',
					expectedInput: '400000',
					revealAr:
						'من التسيير: $1\\,250\\,000 - 850\\,000 = 400\\,000$ دج (ربح). من الميزانية: مجموع الأصول $= 1\\,800\\,000 + 420\\,000 + 180\\,000 + 250\\,000 = 2\\,650\\,000$ دج؛ الالتزامات ورأس المال $= 1\\,900\\,000 + 350\\,000 = 2\\,250\\,000$ دج؛ الفرق $= 2\\,650\\,000 - 2\\,250\\,000 = 400\\,000$ دج.'
				},
				{
					promptAr: 'كيف تُرصد حسابات المنتوجات (حـ/ 7) والأعباء (حـ/ 6) في دفتر اليومية يوم $31$ ديسمبر؟',
					hintAr: 'لتصفير حـ/ 7 نجعله مديناً، ولتصفير حـ/ 6 نجعله دائناً، والطرف المقابل هو حـ/ 12.',
					expectedInput: 'من 7 إلى 12 ثم من 12 إلى 6',
					revealAr:
						'القيد الأول: مدين حـ/ $7xx$ المنتوجات ($1\\,250\\,000$) / دائن حـ/ $120$ نتيجة السنة المالية ($1\\,250\\,000$). القيد الثاني: مدين حـ/ $120$ ($850\\,000$) / دائن حـ/ $6xx$ الأعباء ($850\\,000$). وهكذا يصبح رصيد حـ/ $120$ دائناً بـ $400\\,000$ دج.'
				},
				{
					promptAr: 'ما أهمية الجرد المادي الفعلي في المخزن والصندوق قبل إعداد الميزانية الختامية؟',
					hintAr: 'يتأكد المحاسب من مطابقة الواقع المادي للأرقام المسجلة في الدفاتر.',
					expectedInput: 'التحقق من الوجود الفعلي للأصول واكتشاف الفوارق والضياع',
					revealAr:
						'يكشف الجرد المادي الوجود الفعلي للبضائع والنقود والتثبيتات، فيمكّن من معالجة فوارق الجرد (تلف، سرقة، سهو) لتعبر الميزانية الختامية عن الصورة الصادقة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الجرد العام: التزام قانوني سنوي في $31$ ديسمبر يشمل: (1) الجرد المادي (عدّ ووزن وتقييم الممتلكات الفعلية في المخازن والورشات والصندوق)؛ (2) الجرد المحاسبي (التحقق من مطابقة الأرصدة الدفترية للواقع وتسوية الفروقات).',
				'إقفال حسابات التسيير: حسابات الصنفين $6$ و $7$ تخص دورة مالية واحدة فقط ويجب ترصيدها في $31$ ديسمبر لتصبح أرصدتها صفراً، ونقلها إلى حـ/ $12$ (نتيجة السنة المالية).',
				'النتيجة في حـ/ $12$: $\\text{النتيجة} = \\sum \\text{المنتوجات (7)} - \\sum \\text{الأعباء (6)}$. إذا كان الرصيد دائناً فالمؤسسة حققت ربحاً (حـ/ $120$)، وإذا كان مديناً فالمؤسسة تكبدت خسارة (حـ/ $129$).',
				'تطابق النتيجة: لا بد في نهاية الدورة أن يتساوى صافي النتيجة المستخرج من **حساب النتائج (7 − 6)** مع صافي النتيجة المستخرج من **الميزانية الختامية (الأصول − الأموال الخاصة الأولى − الديون)**.',
				'الميزانية الختامية: تُعد في $31$ ديسمبر باستعمال أرصدة حسابات الميزانية فقط (الأصناف $1$ إلى $5$)، ويظهر فيها حـ/ $120$ بإشارة موجبة (أو حـ/ $129$ بين قوسين سالباً) داخل كتلة رؤوس الأموال الخاصة.'
			],
			visualSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 185" width="640" height="185" role="img" aria-label="توازن النتيجة بين القائمتين">
  <rect width="640" height="185" rx="14" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.4"/>
  <text x="320" y="26" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="14.5" font-weight="700" fill="#1e3a8a">مبدأ وحدة النتيجة بين الميزانية الختامية وحساب النتائج</text>
  <rect x="338" y="48" width="272" height="92" rx="10" fill="#ffffff" stroke="#059669" stroke-width="1.8"/>
  <text x="474" y="76" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="13" font-weight="700" fill="#065f46">النتيجة من حساب التسيير</text>
  <text x="474" y="102" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12" fill="#0f172a">مجموع المنتوجات (صنف 7)</text>
  <text x="474" y="124" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12" fill="#dc2626">− مجموع الأعباء (صنف 6)</text>
  <text x="320" y="102" text-anchor="middle" font-family="'Cairo', sans-serif" font-size="24" font-weight="700" fill="#1d4ed8">=</text>
  <rect x="30" y="48" width="272" height="92" rx="10" fill="#ffffff" stroke="#1d4ed8" stroke-width="1.8"/>
  <text x="166" y="76" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="13" font-weight="700" fill="#1d4ed8">النتيجة من الميزانية الختامية</text>
  <text x="166" y="102" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12" fill="#0f172a">مجموع الأصول (أصناف 2 إلى 5)</text>
  <text x="166" y="124" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12" fill="#dc2626">− (رأس المال 101 + الديون)</text>
  <text x="320" y="164" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" font-weight="700" fill="#0f766e">تطابق النتيجتين دليل قاطع على صحة التسجيل المحاسبي طوال السنة المالية</text>
</svg>`,
			visualCaptionAr: 'التحقق المزدوج للنتيجة الصافية في نهاية السنة المالية',
			examples: [
				{
					problemAr:
						'إذا أظهر جرد الصندوق في $31/12$ وجود $48\\,500$ دج نقداً بينما يظهر الدفتر رصيداً قدره $50\\,000$ دج (عجز غير مبرر)، كيف نعالج الفرق في نهاية الدورة؟',
					solutionAr:
						'نثبت النقص المحاسبي (العجز) بقيد تسوية: مدين حـ/ $657$ أعباء استثنائية للتسيير الجاري ($1\\,500$) / دائن حـ/ $53$ الصندوق ($1\\,500$) ليطابق الدفتر الواقع ($48\\,500$ دج).'
				},
				{
					problemAr:
						'في مؤسسة كانت الأصول $1\\,500\\,000$ دج، رأس المال $1\\,400\\,000$ دج، والموردون $220\\,000$ دج. حدد النتيجة وموقعها في الميزانية الختامية.',
					solutionAr:
						'النتيجة $= 1\\,500\\,000 - (1\\,400\\,000 + 220\\,000) = -120\\,000$ دج (خسارة صافية حـ/ $129$) وتظهر في رؤوس الأموال الخاصة بقيمة سالبة $(120\\,000)$ ليصبح مجموع الخصوم $1\\,500\\,000$ دج.'
				}
			],
			watchOutAr:
				'في الميزانية الختامية لا تظهر حسابات الصنف 6 والصنف 7 أبداً؛ وإنما يظهر ملخصها الصافي في حساب واحد فقط هو حـ/ $12$ ضمن رؤوس الأموال الخاصة.'
		},
		practice: [
			{
				questionAr: 'ما مصير حسابات الأعباء (صنف 6) والمنتوجات (صنف 7) عند إقفال السنة المالية في 31 ديسمبر؟',
				options: [
					'تُرصد في حـ/ 12 ولا تنتقل أرصدتها إلى ميزانية السنة المقبلة',
					'تُدرج مباشرة في جانب الأصول من الميزانية الختامية',
					'تُرحل أرصدتها إلى رأس المال 101 دون ترصيد',
					'تُحذف من دفتر اليومية'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'حسابات التسيير لا تظهر في الميزانية.',
					'ترصيدها يتم أولاً في حـ/ 12 وليس مباشرة في حـ/ 101.',
					'الحذف يخل بقانون المحاسبة؛ بل تُقفل بقيود ترصيد نظامية.'
				],
				explanationAr: 'حسابات التسيير دورية (سنوية)، لذا ترصد في نهاية كل سنة في حـ/ 12 لتبدأ السنة الجديدة من الصفر.'
			},
			{
				questionAr: 'متى يكون حساب نتيجة السنة المالية (حـ/ 12) ذا رصيد مدين (حـ/ 129)؟',
				options: [
					'عندما يفوق مجموع الأعباء مجموع المنتوجات (حالة خسارة)',
					'عندما يفوق مجموع المنتوجات مجموع الأعباء (حالة ربح)',
					'عندما تتساوى الأصول مع الخصوم',
					'عند زيادة رأس المال'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'عندما تفوق المنتوجات الأعباء يكون الرصيد دائناً (حـ/ 120 ربح).',
					'الأصول تساوي الخصوم دائماً في كل الميزانيات.',
					'زيادة رأس المال تخص حـ/ 101.'
				],
				explanationAr: 'إذا زادت الأعباء على المنتوجات تحقق عجز (خسارة صافية)، ويسجل في حـ/ 129 بالجانب السالب للأموال الخاصة.'
			},
			{
				questionAr: 'إذا كان صافي الربح (حـ/ 120) $250\\,000$ دج، ورأس المال $1\\,000\\,000$ دج، والديون $350\\,000$ دج، فكم يساوي مجموع أصول الميزانية الختامية؟',
				options: ['$1\\,600\\,000$ دج', '$1\\,350\\,000$ دج', '$1\\,100\\,000$ دج', '$1\\,250\\,000$ دج'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'نسيت إدراج صافي الربح ($250\\,000$ دج) ضمن الأموال الخاصة.',
					'الربح يضاف إلى الأموال الخاصة لا يطرح منها.',
					'نسيت إدراج الديون ($350\\,000$ دج) في الخصوم.'
				],
				explanationAr: 'مجموع الأصول = مجموع الخصوم = رأس المال ($1\\,000\\,000$) + الربح ($250\\,000$) + الديون ($350\\,000$) = $1\\,600\\,000$ دج.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 12 (T3): تطبيقات شاملة حول الدورة المحاسبية الكاملة للمؤسسة
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_lesson_2as_acc_t3_comprehensive_integration',
		slug: 'mgt-2as-acc-t3-comprehensive-integration',
		grade: '2as_acc',
		yearSubjectId: 744,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المجال المفاهيمي الثالث: أعباء المستخدمين والنتائج الأولية والجرد العام',
		order: 12,
		titleAr: 'تطبيقات شاملة حول الدورة المحاسبية الكاملة للمؤسسة',
		objectives: [
			'الربط المنهجي بين جميع مراحل الدورة المحاسبية: من الميزانية الافتتاحية إلى الميزانية الختامية وحساب النتائج',
			'معالجة ملف محاسبي متكامل يضم الفواتير والـ TVA، الأوراق التجارية الحلال، حيازة التثبيتات بالمرابحة، وكشف الأجر',
			'التحقق من التوازنات الرأسية والأفقية عبر ميزان المراجعة قبل الإقفال وبعده'
		],
		keywordsAr: [
			'الدورة المحاسبية الكاملة',
			'وضعية إدماجية',
			'ميزان المراجعة',
			'الربط بين القوائم المالية',
			'الالتزام المحاسبي والشرعي'
		],
		discover: {
			scenarioAr:
				'خلال اختبار الفصل الثالث في التسيير المحاسبي والمالي، استلمت ملف مؤسسة «تيبازة» الذي يشمل: ميزانية افتتاحية برأس مال $2\\,000\\,000$ دج، عملية شراء بضاعة مع تخفيض $10\\%$ وTVA $19\\%$ ومستحقة بورقة تجارية تُحصل عند الاستحقاق، كشف أجر لموظف بأجر منصب $60\\,000$ دج، ومبيعات بضاعة بقيمة $900\\,000$ دج بتكلفة شراء $540\\,000$ دج.',
			svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 205" width="640" height="205" role="img" aria-label="الدورة المحاسبية الكاملة في 2AS">
  <rect width="640" height="205" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>
  <text x="320" y="26" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="14.5" font-weight="700" fill="#0f172a">الخريطة الشاملة للدورة المحاسبية الكاملة (برنامج السنة الثانية ثانوي)</text>
  <rect x="445" y="46" width="168" height="62" rx="9" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.6"/>
  <text x="529" y="72" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12" font-weight="700" fill="#1e3a8a">1. الافتتاح والعمليات</text>
  <text x="529" y="92" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="10.5" fill="#334155">الميزانية الافتتاحية + اليومية</text>
  <rect x="236" y="46" width="168" height="62" rx="9" fill="#ecfdf5" stroke="#059669" stroke-width="1.6"/>
  <text x="320" y="72" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12" font-weight="700" fill="#065f46">2. الجرد والتسوية</text>
  <text x="320" y="92" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="10.5" fill="#334155">الأجور + TVA + الترحيل</text>
  <rect x="27" y="46" width="168" height="62" rx="9" fill="#fffbeb" stroke="#b45309" stroke-width="1.6"/>
  <text x="111" y="72" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12" font-weight="700" fill="#92400e">3. القوائم الختامية</text>
  <text x="111" y="92" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="10.5" fill="#334155">حساب النتائج + الختامية</text>
  <text x="424" y="82" text-anchor="middle" font-family="'Cairo', sans-serif" font-size="18" font-weight="700" fill="#334155">←</text>
  <text x="215" y="82" text-anchor="middle" font-family="'Cairo', sans-serif" font-size="18" font-weight="700" fill="#334155">←</text>
  <rect x="65" y="128" width="510" height="58" rx="10" fill="#ffffff" stroke="#0f766e" stroke-width="1.6"/>
  <text x="320" y="152" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12" font-weight="700" fill="#0f766e">نقاط التحقق الذهبية في الامتحان:</text>
  <text x="320" y="172" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">(أ) توازن كل قيد (مدين = دائن)  |  (ب) توازن ميزان المراجعة  |  (ج) تطابق النتيجة بين القائمتين</text>
</svg>`,
			steps: [
				{
					promptAr: 'ما مجموع الأعباء الجارية والمصاريف المتعلقة بالبضاعة المباعة والأجر في هذا الملف (بافتراض أعباء رب العمل $26\\%$ فقط دون منح معفاة)؟',
					hintAr: 'اجمع تكلفة شراء البضاعة المباعة ($540\\,000$) + الأجر الخام ($60\\,000$) + أعباء رب العمل ($60\\,000 \\times 0.26$).',
					expectedInput: '615600',
					revealAr:
						'تكلفة البضاعة المباعة (حـ/ $600$) $= 540\\,000$ دج؛ الأجر الخام (حـ/ $631$) $= 60\\,000$ دج؛ أعباء رب العمل (حـ/ $635$) $= 60\\,000 \\times 0.26 = 15\\,600$ دج. مجموع الأعباء $= 540\\,000 + 60\\,000 + 15\\,600 = 615\\,600$ دج.'
				},
				{
					promptAr: 'احسب القيمة المضافة (VA) وإجمالي فائض الاستغلال (EBE) ثم النتيجة العادية قبل الضرائب.',
					hintAr: 'المبيعات $900\\,000$ والاستهلاك $540\\,000$ وأعباء المستخدمين $75\\,600$.',
					expectedInput: '284400',
					revealAr:
						'$VA = 900\\,000 - 540\\,000 = 360\\,000$ دج. $EBE = 360\\,000 - 75\\,600 = 284\\,400$ دج. وبغياب الاهتلاكات تساوي النتيجة العادية قبل الضرائب $284\\,400$ دج.'
				},
				{
					promptAr: 'احسب صافي الربح بعد ضريبة IBS للمؤسسة التجارية ($26\\%$) ثم قيمة الأصول الصافية في نهاية السنة.',
					hintAr: 'اطرح $26\\%$ من $284\\,400$، ثم أضف صافي الربح إلى رأس المال الافتتاحي ($2\\,000\\,000$).',
					expectedInput: '210456',
					revealAr:
						'$IBS = 284\\,400 \\times 0.26 = 73\\,944$ دج. النتيجة الصافية $= 284\\,400 - 73\\,944 = 210\\,456$ دج. إذن ترتفع الذمة المالية الصافية من $2\\,000\\,000$ دج إلى $2\\,210\\,456$ دج.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الربط العملي بين الوحدات: يبدأ التمرين الإدماجي إما بالميزانية الافتتاحية (حساب رأس المال $101$) أو بميزان مراجعة مرحلي، ثم تُسجل العمليات الجارية (فواتير شراء وبيع بالـ TVA، أوراق تجارية حلال بالاستحقاق، حيازة تثبيتات بتمويل ذاتي أو مرابحة، كشف أجر).',
				'قاعدة ترحيل الـ TVA في الجرد المستمر: تأكد دائماً من تسجيل قيد الإدخال للمخزون ($30 \\leftarrow 380$) بعد قيد شراء البضاعة، وقيد الإخراج ($600 \\leftarrow 30$) بتكلفة الشراء بعد قيد البيع ($411/512 \\leftarrow 700 + 4457$).',
				'تسلسل النتائج: إنتاج السنة $-$ استهلاك السنة $= VA$؛ ثم $VA - 63 - 64 = EBE$؛ ثم إدراج الأعباء والمنتوجات الأخرى وضريبة IBS لاستخراج النتيجة الصافية حـ/ $120$ أو $129$.',
				'فحص التوازن المزدوج: كل خطأ في ترحيل قيد يومية واحد يكشفه ميزان المراجعة، وكل خطأ في تصنيف أصل/عبء يكشفه تباين النتيجة بين حساب النتائج والميزانية الختامية.',
				'الالتزام الشرعي والمهني: المعاملات المحاسبية السليمة تقوم على الصدق والأمانة في الوثائق والتسجيل (لا فواتير وهمية ولا معاملات ربوية)، وتُعد مدخلاً أساسياً لبرنامج البكالوريا في السنة الثالثة.'
			],
			visualSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 185" width="640" height="185" role="img" aria-label="الربط المنهجي بين القوائم المالية">
  <rect width="640" height="185" rx="14" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1.4"/>
  <text x="320" y="26" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="14.5" font-weight="700" fill="#065f46">الانتقال المنهجي من ميزان المراجعة إلى القوائم المالية الختامية</text>
  <rect x="340" y="46" width="270" height="96" rx="10" fill="#ffffff" stroke="#059669" stroke-width="1.7"/>
  <text x="475" y="72" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12.5" font-weight="700" fill="#047857">الأصناف 1 إلى 5 (حسابات الميزانية)</text>
  <text x="475" y="96" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" fill="#334155">1: أموال خاصة وتمويلات  |  2: تثبيتات</text>
  <text x="475" y="118" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" fill="#334155">3: مخزونات  |  4: غير  |  5: خزينة</text>
  <text x="475" y="136" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="10.5" font-weight="700" fill="#065f46">← تُشكّل الميزانية الختامية</text>
  <rect x="30" y="46" width="270" height="96" rx="10" fill="#ffffff" stroke="#1d4ed8" stroke-width="1.7"/>
  <text x="165" y="72" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12.5" font-weight="700" fill="#1d4ed8">الصنفان 6 و 7 (حسابات التسيير)</text>
  <text x="165" y="96" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" fill="#334155">6: أعباء (60، 61، 62، 63، 64، 695)</text>
  <text x="165" y="118" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" fill="#334155">7: منتوجات (70، 72، 74، 75، 768)</text>
  <text x="165" y="136" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="10.5" font-weight="700" fill="#1e3a8a">← تُشكّل حساب النتائج (وتُغذي حـ/ 12)</text>
  <text x="320" y="166" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" font-weight="700" fill="#0f172a">توازن الميزانية الختامية يكتمل بإدراج حـ/ 12 الناتج عن حساب النتائج</text>
</svg>`,
			visualCaptionAr: 'تموضع حسابات المدونة المحاسبية (1 إلى 7) بين القائمتين الختاميتين',
			examples: [
				{
					problemAr:
						'إذا باعت مؤسسة تجارية بضاعة بمبلغ $500\\,000$ دج (HT) وكانت تكلفتها في المخزن $320\\,000$ دج، ما الهامش التجاري الإجمالي المحقق في هذه العملية؟',
					solutionAr:
						'الهامش التجاري الإجمالي $= \\text{حـ/ } 700 - \\text{حـ/ } 600 = 500\\,000 - 320\\,000 = 180\\,000$ دج.'
				},
				{
					problemAr:
						'عند تأسيس شركة بين شريكين بالمشاركة، قدم الأول عقاراً بـ $1\\,500\\,000$ دج وقدم الثاني مبلغاً نقدياً في البنك بـ $1\\,000\\,000$ دج. سجل قيد الافتتاح.',
					solutionAr:
						'مدين حـ/ $213$ البناءات ($1\\,500\\,000$) وحـ/ $512$ البنك ($1\\,000\\,000$) / دائن حـ/ $101$ رأس المال ($2\\,500\\,000$).'
				}
			],
			watchOutAr:
				'تذكّر أن حساب $600$ (مشتريات البضائع المبيعة) يظهر في حساب النتائج فقط بقيمة البضاعة التي بيعت فعلاً لا بقيمة كل المشتريات المخزنة في حـ/ $30$.'
		},
		practice: [
			{
				questionAr: 'في نهاية الدورة، إذا كان مجموع الأصول $4\\,000\\,000$ دج ورأس المال $3\\,100\\,000$ دج والخصوم $600\\,000$ دج، وكان مجموع المنتوجات $1\\,200\\,000$ دج، فكم يجب أن يكون مجموع الأعباء؟',
				options: ['$900\\,000$ دج', '$300\\,000$ دج', '$1\\,500\\,000$ دج', '$600\\,000$ دج'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'$300\\,000$ دج هي النتيجة الصافية (الربح)، والمطلوب هو مجموع الأعباء.',
					'الربح يتحقق عندما تكون الأعباء أقل من المنتوجات.',
					'$600\\,000$ دج تمثل الديون في الميزانية لا الأعباء.'
				],
				explanationAr: 'من الميزانية: النتيجة $= 4\\,000\\,000 - (3\\,100\\,000 + 600\\,000) = 300\\,000$ دج. إذن الأعباء $= 1\\,200\\,000 - 300\\,000 = 900\\,000$ دج.'
			},
			{
				questionAr: 'أي حساب من الحسابات الآتية يُصنف ضمن حسابات الميزانية لا حسابات التسيير؟',
				options: ['حـ/ 404 موردو التثبيتات', 'حـ/ 631 أجور المستخدمين', 'حـ/ 700 مبيعات البضائع', 'حـ/ 607 مشتريات غير مخزنة'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'حـ/ 631 من حسابات الأعباء (الصنف 6).',
					'حـ/ 700 من حسابات المنتوجات (الصنف 7).',
					'حـ/ 607 من حسابات الأعباء (الصنف 6).'
				],
				explanationAr: 'حسابات الصنف 1 إلى 5 هي حسابات ميزانية، لذا حـ/ 404 يظهر في الخصوم الجارية.'
			},
			{
				questionAr: 'عند اقتناء آلة عن طريق تمويل المرابحة الإسلامية، ما الذي يميز حساب هامش المرابحة المتفق عليه؟',
				options: [
					'مبلغ معلوم وثابت ومحدد في العقد ولا يزيد عند التأخير',
					'يتغير تبعاً لمعدلات الزيادة الربوية الشهرية',
					'يُتنازل عنه مسبقاً بعوض نقدي أقل في عقد ربوي',
					'يُسجل في مدين حـ/ 700 مبيعات'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'الربا والزيادات الربوية محرمة ومستبعدة تماماً في التمويل الإسلامي.',
					'المرابحة عقد بيع معلوم الثمن، وليست معاملة ربوية.',
					'حـ/ 700 خاص بمبيعات البضائع.'
				],
				explanationAr: 'تقوم المرابحة الإسلامية على ثمن بيع إجمالي ثابت ومعلوم عند التعاقد دون أي زيادة ربوية.'
			}
		]
	}
];
