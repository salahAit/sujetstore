import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';
import type { ManagementInteractiveLessonData } from '../../types';

// ═══════════════════════════════════════════════════════════════════════════════
// 3AS GE BAC Accounting & Finance (التسيير المحاسبي والمالي) — T3 Lessons
// 100% HALAL & RIBA-FREE: Investment appraisal via CAF & DR without usury!
// ═══════════════════════════════════════════════════════════════════════════════

export const LESSONS_3AS_ACC_T3: ManagementInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 9 (T3): المحاسبة التحليلية — التوزيع غير المباشر وتكلفة الشراء
	// MUST INCLUDE: mgt_05_cost_accounting_cycle
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_lesson_3as_acc_t3_cost_allocation_purchase',
		slug: 'mgt-3as-acc-t3-cost-allocation-purchase',
		grade: '3as_acc',
		yearSubjectId: 755,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المجال المفاهيمي الثالث: المحاسبة التحليلية وتقييم المشاريع الحلال',
		order: 9,
		titleAr: 'المحاسبة التحليلية: الأعباء المدمجة، توزيع الأعباء غير المباشرة وتكلفة الشراء',
		objectives: [
			'حساب الأعباء المدمجة في المحاسبة التحليلية انطلاقاً من أعباء المحاسبة العامة (طرح غير المعتبرة وإضافة العناصر الإضافية)',
			'إنجاز جدول توزيع الأعباء غير المباشرة (التوزيع الثانوي التبادلي بين الأقسام المساعدة) وحساب تكلفة وحدة القياس (C.U.O)',
			'حساب تكلفة الشراء للمواد الأولية واللوازم وإعداد بطاقة الجرد بالتكلفة المتوسطة المرجحة (CMUP)'
		],
		keywordsAr: [
			'المحاسبة التحليلية',
			'الأعباء المدمجة',
			'التوزيع الثانوي التبادلي',
			'تكلفة وحدة القياس CUO',
			'تكلفة الشراء',
			'التكلفة المتوسطة المرجحة CMUP'
		],
		discover: {
			scenarioAr:
				'تنتج مؤسسة «متيجة الصناعية» منتجاً باستعمال مادة أولية «م». بلغت أعباء المحاسبة العامة المعتبرة $1\\,400\\,000$ دج، بعد استبعاد أعباء غير معتبرة بـ $50\\,000$ دج وإضافة مكافأة رأس المال الخاص بـ $100\\,000$ دج. في جدول توزيع الأعباء غير المباشرة، يتبادل قسما الإدارة ($X = 85\\,000 + 0.1Y$) والصيانة ($Y = 130\\,000 + 0.2X$) الخدمات، ويحصل قسم التموين على $30\\%$ من $X$ و$20\\%$ من $Y$ فوق مجموعه الأولي ($90\\,000$ دج).',
			svg: renderLessonIllustration('mgt_05_cost_accounting_cycle', { pins: [], hideLegend: true }),
			steps: [
				{
					promptAr: 'احسب مجموع الأعباء المدمجة إذا كانت أعباء المحاسبة العامة الإجمالية $1\\,350\\,000$ دج (منها $50\\,000$ غير معتبرة) والعناصر الإضافية $100\\,000$ دج.',
					hintAr: 'الأعباء المدمجة $=$ أعباء المحاسبة العامة $-$ الأعباء غير المعتبرة $+$ العناصر الإضافية.',
					expectedInput: '1400000',
					revealAr:
						'الأعباء المدمجة $= 1\\,350\\,000 - 50\\,000 + 100\\,000 = 1\\,400\\,000$ دج.'
				},
				{
					promptAr: 'حل جملة المعادلتين لإيجاد مجموع قسمي الإدارة ($X$) والصيانة ($Y$) بعد التبادل.',
					hintAr: 'عوّض $Y = 130\\,000 + 0.2X$ في معادلة $X$ لتحصل على $0.98X = 98\\,000$.',
					expectedInput: 'X = 100000 و Y = 150000',
					revealAr:
						'$X = 85\\,000 + 0.1(130\\,000 + 0.2X) = 98\\,000 + 0.02X \\implies 0.98X = 98\\,000 \\implies X = 100\\,000$ دج؛ وبالتعويض: $Y = 130\\,000 + 0.2(100\\,000) = 150\\,000$ دج. وعليه يرتفع قسم التموين إلى $90\\,000 + 30\\,000 + 30\\,000 = 150\\,000$ دج.'
				},
				{
					promptAr: 'كيف تحسب تكلفة وحدة القياس ($C.U.O$) لقسم التموين وتكلفة الشراء للمادة الأولية «م»؟',
					hintAr: 'اقسم مجموع التوزيع الثانوي للتموين على عدد وحدات القياس (مثلاً $1\\,000$ كلغ مشترى أو $100$ دج من المشتريات).',
					expectedInput: 'مجموع التوزيع الثانوي تقسيم عدد وحدات القياس ثم إضافته لثمن الشراء',
					revealAr:
						'$C.U.O = \\frac{\\text{مجموع التوزيع الثانوي لقسم التموين}}{\\text{عدد وحدات القياس}}$؛ ثم $\\text{تكلفة الشراء} = \\text{ثمن الشراء} + \\text{مصاريف الشراء المباشرة} + \\text{أعباء التموين غير المباشرة}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الأعباء المدمجة في المحاسبة التحليلية: $\\text{الأعباء المدمجة} = \\text{أعباء المحاسبة العامة} - \\text{الأعباء غير المعتبرة (مثل حـ/ 67، 652، 68 غير الجارية)} + \\text{العناصر الإضافية (مكافأة رأس المال الخاص وأجرة المستغل)}$.',
				'جدول توزيع الأعباء غير المباشرة: يوزع الأعباء عبر الأقسام المساعدة (الإدارة، الصيانة) والأقسام الأساسية (التموين، الإنتاج، التوزيع). في **التوزيع الثانوي التبادلي** نحل جملة معادلتين لإيجاد $X$ و $Y$ ثم نوزعها على الأقسام الأساسية بحيث تصبح مجاميع الأقسام المساعدة صفراً.',
				'تكلفة وحدة القياس ($C.U.O$): $C.U.O = \\frac{\\text{مجموع التوزيع الثانوي للقسم الأساسي}}{\\text{عدد وحدات القياس}}$.',
				'تكلفة الشراء: $\\text{تكلفة الشراء} = \\text{ثمن الشراء الصافي} + \\text{مصاريف الشراء المباشرة (نقل، جمركة)} + \\text{أعباء التموين غير المباشرة}$.',
				'بطاقة جرد المخزونات ($CMUP$): $CMUP = \\frac{\\text{قيمة مخزون أول المدة} + \\text{قيمة الإدخالات (الشراء أو الإنتاج)}}{\\text{كمية أول المدة} + \\text{كمية الإدخالات}}$؛ وتُقوّم به كل الإخراجات ومخزون آخر المدة.'
			],
			visualSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 190" width="640" height="190" role="img" aria-label="سلم التكاليف في المحاسبة التحليلية">
  <rect width="640" height="190" rx="14" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1.4"/>
  <text x="320" y="26" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="14.5" font-weight="700" fill="#065f46">التوزيع التبادلي وحساب تكلفة الشراء و الـ CMUP</text>
  <rect x="425" y="45" width="190" height="100" rx="10" fill="#ffffff" stroke="#059669" stroke-width="1.7"/>
  <text x="520" y="70" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12.5" font-weight="700" fill="#047857">1. التوزيع التبادلي</text>
  <text x="520" y="96" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">X = أوّلي_X + a·Y</text>
  <text x="520" y="116" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">Y = أوّلي_Y + b·X</text>
  <text x="520" y="136" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="10.5" fill="#065f46">تصفير المساعدة ← الأساسية</text>
  <rect x="225" y="45" width="190" height="100" rx="10" fill="#ffffff" stroke="#1d4ed8" stroke-width="1.7"/>
  <text x="320" y="70" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12.5" font-weight="700" fill="#1e3a8a">2. تكلفة الشراء</text>
  <text x="320" y="96" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">ثمن الشراء + المباشرة</text>
  <text x="320" y="116" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">+ (وحدات التموين × C.U.O)</text>
  <text x="320" y="136" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="10.5" fill="#1d4ed8">إدخال إلى المخزن (حـ/ 31)</text>
  <rect x="25" y="45" width="190" height="100" rx="10" fill="#ffffff" stroke="#b45309" stroke-width="1.7"/>
  <text x="120" y="70" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12.5" font-weight="700" fill="#92400e">3. تقييم المخزون (CMUP)</text>
  <text x="120" y="96" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">(مخ1 + مشتريات) بالقيمة</text>
  <text x="120" y="116" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">÷ (مخ1 + مشتريات) بالكمية</text>
  <text x="120" y="136" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="10.5" fill="#b45309">يُقيّم به الاستعمال ومخ2</text>
  <text x="320" y="168" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" font-weight="700" fill="#0f172a">تُقرّب تكلفة وحدة القياس و الـ CMUP حسب دقة التمرين مع التحقق من التوازن الأفقي للجدول</text>
</svg>`,
			visualCaptionAr: 'المراحل الثلاث الأولى في المحاسبة التحليلية بالتكاليف الكلية',
			examples: [
				{
					problemAr:
						'مجموع التوزيع الأولي للإدارة $85\\,000$ دج وللصيانة $130\\,000$ دج. تعطي الإدارة $20\\%$ للصيانة، وتعطي الصيانة $10\\%$ للإدارة. أوجد القيمتين $X$ و $Y$ بعد التوزيع الثانوي.',
					solutionAr:
						'$X = 85\\,000 + 0.1Y$ و $Y = 130\\,000 + 0.2X$. بالتعويض: $X = 85\\,000 + 0.1(130\\,000 + 0.2X) = 98\\,000 + 0.02X \\implies 0.98X = 98\\,000 \\implies X = 100\\,000$ دج، وبالتعويض نجد $Y = 130\\,000 + 0.2(100\\,000) = 150\\,000$ دج.'
				},
				{
					problemAr:
						'مخزون أول المدة من المادة الأولية: $400$ كلغ بمبلغ $140\\,000$ دج. المشتريات خلال الشهر: $1\\,600$ كلغ بتكلفة شراء إجمالية $660\\,000$ دج. احسب CMUP.',
					solutionAr:
						'$CMUP = \\frac{140\\,000 + 660\\,000}{400 + 1\\,600} = \\frac{800\\,000}{2\\,000} = 400$ دج/كلغ.'
				}
			],
			watchOutAr:
				'عند كتابة معادلة التوزيع التبادلي، انتبه للاتجاه: «الإدارة تعطي $20\\%$ للصيانة» تعني إضافة $0.2X$ إلى معادلة $Y$، وليس إلى معادلة $X$!'
		},
		practice: [
			{
				questionAr: 'بلغت أعباء المحاسبة العامة $2\\,450\\,000$ دج (منها أعباء غير معتبرة $120\\,000$ دج)، وبلغت العناصر الإضافية $70\\,000$ دج. ما مجموع الأعباء المدمجة في المحاسبة التحليلية؟',
				options: ['$2\\,400\\,000$ دج', '$2\\,500\\,000$ دج', '$2\\,260\\,000$ دج', '$2\\,640\\,000$ دج'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'نسيت طرح الأعباء غير المعتبرة، أو عكست الإشارة.',
					'العناصر الإضافية تُضاف ولا تُطرح.',
					'الأعباء غير المعتبرة تُطرح من أعباء المحاسبة العامة.'
				],
				explanationAr: 'الأعباء المدمجة $= 2\\,450\\,000 - 120\\,000 + 70\\,000 = 2\\,400\\,000$ دج.'
			},
			{
				questionAr: 'مخزون أول المدة من مادة «م» هو $500$ كلغ بقيمة $220\\,000$ دج، ومشتريات الفترة $1\\,500$ كلغ بتكلفة شراء $780\\,000$ دج. كم يساوي CMUP؟',
				options: ['$500$ دج/كلغ', '$520$ دج/كلغ', '$440$ دج/كلغ', '$480$ دج/كلغ'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'$520$ هي تكلفة شراء المشتريات فقط دون دمج مخزون أول المدة.',
					'$440$ هي تكلفة وحدة مخزون أول المدة فقط.',
					'أعد حساب البسط ($1\\,000\\,000$) والمقام ($2\\,000$).'
				],
				explanationAr: '$CMUP = \\frac{220\\,000 + 780\\,000}{500 + 1\\,500} = \\frac{1\\,000\\,000}{2\\,000} = 500$ دج/كلغ.'
			},
			{
				questionAr: 'ما مجموع التوزيع الثانوي لقسم الإدارة ($X$) إذا كان مجموعه الأولي $85\\,000$ دج والصيانة ($Y$) أوليها $130\\,000$ دج، حيث تتبادل الإدارة $20\\%$ للصيانة والصيانة $10\\%$ للإدارة؟',
				options: ['$100\\,000$ دج', '$98\\,000$ دج', '$150\\,000$ دج', '$115\\,000$ دج'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'$98\\,000$ هو الطرف قبل القسمة على $0.98$.',
					'$150\\,000$ دج هو مجموع قسم الصيانة $Y$ لا الإدارة $X$.',
					'تحقق من حل المعادلة $0.98X = 98\\,000$.'
				],
				explanationAr: '$X = 85\\,000 + 0.1(130\\,000 + 0.2X) \\implies 0.98X = 98\\,000 \\implies X = 100\\,000$ دج.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 10 (T3): تكلفة الإنتاج وسعر التكلفة والنتيجة التحليلية الصافية
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_lesson_3as_acc_t3_production_cost_price_result',
		slug: 'mgt-3as-acc-t3-production-cost-price-result',
		grade: '3as_acc',
		yearSubjectId: 755,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المجال المفاهيمي الثالث: المحاسبة التحليلية وتقييم المشاريع الحلال',
		order: 10,
		titleAr: 'تكلفة الإنتاج وسعر التكلفة والنتيجة التحليلية الصافية',
		objectives: [
			'حساب تكلفة الإنتاج للمنتجات التامة مع إدراج الإنتاج الجاري أول وآخر المدة والفضلات القابلة للاستعمال أو البيع',
			'حساب سعر التكلفة للمنتجات المباعة (تكلفة إنتاج المباع بـ CMUP + أعباء التوزيع المباشرة وغير المباشرة)',
			'استنتاج النتيجة التحليلية الإجمالية ثم النتيجة التحليلية الصافية ومطابقتها مع نتيجة المحاسبة العامة'
		],
		keywordsAr: [
			'تكلفة الإنتاج',
			'الإنتاج الجاري',
			'الفضلات والمخلفات',
			'سعر التكلفة',
			'النتيجة التحليلية',
			'مطابقة المحاسبة العامة'
		],
		discover: {
			scenarioAr:
				'أنتجت مؤسسة «الأوراس» خلال الشهر $1\\,000$ وحدة من المنتج (P) باستهلاك مواد أولية بقيمة $500\\,000$ دج، ويد عاملة مباشرة $300\\,000$ دج، وأعباء إنتاج غير مباشرة $180\\,000$ دج، مع إنتاج جاري أول المدة $60\\,000$ دج وإنتاج جاري آخر المدة $40\\,000$ دج. بعد الجرد بـ CMUP (مخ1: $200$ وحدة بـ $200\\,000$ دج)، باعت المؤسسة $900$ وحدة بسعر $1\\,300$ دج للوحدة، مع أعباء توزيع قدرها $90\\,000$ دج.',
			svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 210" width="640" height="210" role="img" aria-label="سلم الإنتاج وسعر التكلفة والنتيجة">
  <rect width="640" height="210" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>
  <text x="320" y="26" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="14.5" font-weight="700" fill="#0f172a">مسار الإنتاج وسعر التكلفة والنتيجة التحليلية الصافية</text>
  <rect x="430" y="45" width="184" height="114" rx="10" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.7"/>
  <text x="522" y="70" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12.5" font-weight="700" fill="#1e3a8a">1. تكلفة الإنتاج</text>
  <text x="522" y="94" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">مواد مستعملة (CMUP)</text>
  <text x="522" y="114" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">+ يد مباشرة + قسم الإنتاج</text>
  <text x="522" y="136" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" font-weight="700" fill="#047857">+ جاري1 − جاري2 − فضلات</text>
  <rect x="228" y="45" width="184" height="114" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="1.7"/>
  <text x="320" y="70" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12.5" font-weight="700" fill="#065f46">2. سعر التكلفة</text>
  <text x="320" y="94" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">تكلفة إنتاج الكمية المباعة</text>
  <text x="320" y="114" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">(مقوّمة بـ CMUP المنتج التام)</text>
  <text x="320" y="136" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" font-weight="700" fill="#047857">+ أعباء التوزيع (مباشرة وغير)</text>
  <rect x="26" y="45" width="184" height="114" rx="10" fill="#fffbeb" stroke="#b45309" stroke-width="1.7"/>
  <text x="118" y="70" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12.5" font-weight="700" fill="#92400e">3. النتيجة التحليلية</text>
  <text x="118" y="94" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">الإجمالية = CA − سعر التكلفة</text>
  <text x="118" y="114" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">الصافية = ∑ نتائج المنتجات</text>
  <text x="118" y="136" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="10.5" font-weight="700" fill="#b45309">+ إضافية − غير معتبرة ± فروق</text>
  <text x="320" y="184" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" font-weight="700" fill="#0f172a">تطابق النتيجة التحليلية الصافية المعدلة مع النتيجة الصافية للمحاسبة العامة يثبت دقة الحسابات</text>
</svg>`,
			steps: [
				{
					promptAr: 'احسب تكلفة الإنتاج الإجمالية للمنتج (P) ثم تكلفة الوحدة المتوسطة المرجحة (CMUP) للمنتج التام.',
					hintAr: 'تكلفة الإنتاج $= 500\\,000 + 300\\,000 + 180\\,000 + 60\\,000 - 40\\,000$؛ ثم احسب CMUP مع مخزون أول المدة ($200$ وحدة بـ $200\\,000$).',
					expectedInput: '1000000 و 1000',
					revealAr:
						'تكلفة الإنتاج $= 1\\,000\\,000$ دج ($1\\,000$ وحدة). $CMUP = \\frac{200\\,000 + 1\\,000\\,000}{200 + 1\\,000} = \\frac{1\\,200\\,000}{1\\,200} = 1\\,000$ دج/وحدة.'
				},
				{
					promptAr: 'ما تكلفة إنتاج الـ $900$ وحدة المباعة وسعر التكلفة الإجمالي بعد إضافة أعباء التوزيع ($90\\,000$ دج)؟',
					hintAr: 'تكلفة إنتاج المباع $= 900 \\times 1\\,000 = 900\\,000$ دج.',
					expectedInput: '900000 و 990000',
					revealAr:
						'تكلفة إنتاج المباع $= 900 \\times 1\\,000 = 900\\,000$ دج. بإضافة أعباء التوزيع ($90\\,000$ دج)، يكون سعر التكلفة $= 900\\,000 + 90\\,000 = 990\\,000$ دج.'
				},
				{
					promptAr: 'احسب رقم الأعمال والنتيجة التحليلية المحققة من بيع الـ $900$ وحدة.',
					hintAr: 'رقم الأعمال $= 900 \\times 1\\,300 = 1\\,170\\,000$ دج.',
					expectedInput: '1170000 و 180000',
					revealAr:
						'رقم الأعمال $= 1\\,170\\,000$ دج. النتيجة التحليلية $= 1\\,170\\,000 - 990\\,000 = +180\\,000$ دج (ربح).'
				}
			]
		},
		summary: {
			rulesAr: [
				'معادلة تكلفة الإنتاج: $\\text{تكلفة الإنتاج} = \\text{تكلفة شراء المواد المستعملة (CMUP)} + \\text{اليد العاملة المباشرة} + \\text{أعباء الإنتاج غير المباشرة} + \\text{إنتاج جاري أول المدة} - \\text{إنتاج جاري آخر المدة} - \\text{قيمة الفضلات المباعة أو المسترجعة} + \\text{مصاريف التخلص من الفضلات التالفة}$.',
				'الإدخال والإخراج للمنتجات التامة: تدخل الكمية المنتجة إلى مخزن المنتجات التامة (حـ/ $355$) بتكلفة إنتاجها، ثم يُحسب $CMUP$ مع مخزون أول المدة، وتُخرج الكمية المباعة بالتكلفة المتوسطة المرجحة.',
				'سعر التكلفة: $\\text{سعر التكلفة} = \\text{تكلفة إنتاج الكمية المباعة} + \\text{مصاريف التوزيع المباشرة} + \\text{أعباء قسم التوزيع غير المباشرة}$.',
				'النتيجة التحليلية: لكل منتج $\\text{النتيجة التحليلية} = \\text{رقم الأعمال (المبيعات)} - \\text{سعر التكلفة}$. مجموع نتائج كل المنتجات يمثل النتيجة التحليلية الإجمالية.',
				'المطابقة مع المحاسبة العامة: $\\text{نتيجة المحاسبة العامة (قبل IBS)} = \\text{النتيجة التحليلية الإجمالية} + \\text{العناصر الإضافية} - \\text{الأعباء غير المعتبرة} \\pm \\text{فروق التحميل على الأقسام (الموجبة تُضاف والسالبة تُطرح)}$.'
			],
			visualSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 180" width="640" height="180" role="img" aria-label="الانتقال من النتيجة التحليلية إلى المحاسبة العامة">
  <rect width="640" height="180" rx="14" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.4"/>
  <text x="320" y="26" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="14.5" font-weight="700" fill="#1e3a8a">التوافق والانسجام بين النتيجة التحليلية ونتيجة المحاسبة العامة</text>
  <rect x="40" y="48" width="560" height="90" rx="10" fill="#ffffff" stroke="#1d4ed8" stroke-width="1.6"/>
  <text x="320" y="76" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="13" font-weight="700" fill="#0f172a">النتيجة التحليلية الصافية = مجموع النتائج التحليلية للمنتجات</text>
  <text x="320" y="104" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12" fill="#047857">+ العناصر الإضافية (مكافأة رأس المال وأجرة المستغل)  |  − الأعباء غير المعتبرة</text>
  <text x="320" y="126" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" fill="#b45309">± فروق التحميل (إن وجدت نتيجة تقريب تكلفة وحدة القياس)</text>
  <text x="320" y="160" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" font-weight="700" fill="#1e3a8a">= النتيجة الجارية للمحاسبة العامة قبل الضرائب (تطابق حساب النتائج حسب الطبيعة)</text>
</svg>`,
			visualCaptionAr: 'علاقة المطابقة المنهجية بين النتيجة التحليلية ونتيجة المحاسبة العامة',
			examples: [
				{
					problemAr:
						'نتيجة منتجين كانتا $+120\\,000$ دج و $-25\\,000$ دج، العناصر الإضافية $30\\,000$ دج، والأعباء غير المعتبرة $15\\,000$ دج. أوجد نتيجة المحاسبة العامة.',
					solutionAr:
						'النتيجة التحليلية الإجمالية $= 120\\,000 - 25\\,000 = 95\\,000$ دج. نتيجة المحاسبة العامة $= 95\\,000 + 30\\,000 - 15\\,000 = 110\\,000$ دج.'
				},
				{
					problemAr:
						'خلّفت ورشة الإنتاج فضلات بيعت بـ $18\\,000$ دج، وفضلات غير صالحة كلف نقلها خارج المصنع $4\\,000$ دج. كيف تؤثر على تكلفة الإنتاج؟',
					solutionAr:
						'تُطرح قيمة الفضلات المباعة ($-18\\,000$ دج) من تكلفة الإنتاج لأنها تخفضها، وتُضاف مصاريف التخلص من الفضلات التالفة ($+4\\,000$ دج) لأنها تزيدها؛ الصافي: $-14\\,000$ دج.'
				}
			],
			watchOutAr:
				'احذر من حساب سعر التكلفة على **الكمية المنتجة**؛ الصحيح أن سعر التكلفة يُحسب على **الكمية المباعة فقط**، أما الكمية المتبقية في المخزن فتظهر مخزوناً لآخر المدة!'
		},
		practice: [
			{
				questionAr: 'بلغت تكلفة استهلاك المواد والأعباء المباشرة وغير المباشرة لإنتاج منتج $850\\,000$ دج، الإنتاج الجاري أول المدة $50\\,000$ دج، الإنتاج الجاري آخر المدة $70\\,000$ دج، وبيعت فضلات بمبلغ $30\\,000$ دج. ما تكلفة الإنتاج؟',
				options: ['$800\\,000$ دج', '$860\\,000$ دج', '$840\\,000$ دج', '$900\\,000$ دج'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'قيمة الفضلات المباعة تُطرح من تكلفة الإنتاج لا تُضاف.',
					'الإنتاج الجاري أول المدة يُضاف وآخر المدة يُطرح (لا العكس).',
					'تحقق من إشارات الإنتاج الجاري والفضلات.'
				],
				explanationAr: 'تكلفة الإنتاج $= 850\\,000 + 50\\,000 - 70\\,000 - 30\\,000 = 800\\,000$ دج.'
			},
			{
				questionAr: 'أنتجت مؤسسة $1\\,000$ وحدة بتكلفة إنتاج إجمالية $600\\,000$ دج (دون مخزون أول المدة)، وباعت $800$ وحدة بمصاريف توزيع $40\\,000$ دج. ما سعر التكلفة للكمية المباعة؟',
				options: ['$520\\,000$ دج', '$640\\,000$ دج', '$480\\,000$ دج', '$600\\,000$ دج'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'لا نحمل الـ $200$ وحدة الباقية في المخزن داخل سعر التكلفة.',
					'$480\\,000$ دج هي تكلفة إنتاج المباع فقط قبل إضافة مصاريف التوزيع.',
					'$600\\,000$ دج هي تكلفة إنتاج $1\\,000$ وحدة كاملة.'
				],
				explanationAr: 'تكلفة الوحدة $= 600$ دج؛ تكلفة إنتاج المباع $= 800 \\times 600 = 480\\,000$ دج؛ سعر التكلفة $= 480\\,000 + 40\\,000 = 520\\,000$ دج.'
			},
			{
				questionAr: 'إذا كانت النتيجة التحليلية الإجمالية $+250\\,000$ دج، والعناصر الإضافية $40\\,000$ دج، والأعباء غير المعتبرة $15\\,000$ دج، فما نتيجة المحاسبة العامة؟',
				options: ['$275\\,000$ دج', '$225\\,000$ دج', '$305\\,000$ دج', '$195\\,000$ دج'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'عكست إشارتي العناصر الإضافية والأعباء غير المعتبرة.',
					'الأعباء غير المعتبرة تُطرح عند الانتقال للمحاسبة العامة.',
					'العناصر الإضافية أعباء وهمية أُنقِصت من التحليلية فيجب إعادتها هنا.'
				],
				explanationAr: 'نتيجة المحاسبة العامة $= 250\\,000 + 40\\,000 - 15\\,000 = 275\\,000$ دج.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 11 (T3): التكاليف المتغيرة وعتبة المردودية (MSCV, SR) وهامش الأمان
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_lesson_3as_acc_t3_variable_costing_breakeven',
		slug: 'mgt-3as-acc-t3-variable-costing-breakeven',
		grade: '3as_acc',
		yearSubjectId: 755,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المجال المفاهيمي الثالث: المحاسبة التحليلية وتقييم المشاريع الحلال',
		order: 11,
		titleAr: 'التكاليف المتغيرة وعتبة المردودية (MSCV، SR) وهامش الأمان',
		objectives: [
			'تصنيف الأعباء إلى متغيرة وثابتة وإعداد جدول تحليل الاستغلال التفاضلي (CA، CV، MSCV، CF، النتيجة)',
			'حساب عتبة المردودية بالقيمة (SR) وبالكمية (Q_SR) وتحديد تاريخ تحقيقها (نقطة الصفر)',
			'حساب هامش الأمان (MS) ومعدل الأمان (t_MS) واستعمالهما في اتخاذ قرارات التسعير والنشاط'
		],
		keywordsAr: [
			'الأعباء المتغيرة CV',
			'الأعباء الثابتة CF',
			'هامش التكلفة المتغيرة MSCV',
			'عتبة المردودية SR',
			'تاريخ نقطة الصفر',
			'هامش الأمان MS'
		],
		discover: {
			scenarioAr:
				'تنتج مؤسسة «تيبازة» وتبيع $5\\,000$ وحدة من منتج بسعر بيع وحدوي $800$ دج. تبلغ التكلفة المتغيرة للوحدة $520$ دج، بينما تبلغ الأعباء الثابتة السنوية $700\\,000$ دج (مع نشاط منتظم على مدار السنة $12$ شهراً). تريد الإدارة معرفة متى تبدأ المؤسسة بتحقيق الأرباح.',
			svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 215" width="640" height="215" role="img" aria-label="منحنى عتبة المردودية">
  <rect width="640" height="215" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>
  <text x="320" y="25" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="14.5" font-weight="700" fill="#0f172a">التمثيل البياني لعتبة المردودية (MSCV = CF ⇐ النتيجة = 0)</text>
  <line x1="90" y1="175" x2="340" y2="175" stroke="#334155" stroke-width="1.8"/>
  <line x1="90" y1="175" x2="90" y2="45" stroke="#334155" stroke-width="1.8"/>
  <line x1="90" y1="115" x2="320" y2="115" stroke="#dc2626" stroke-width="2" stroke-dasharray="5,4"/>
  <line x1="90" y1="175" x2="310" y2="55" stroke="#059669" stroke-width="2.5"/>
  <circle cx="200" cy="115" r="5" fill="#1d4ed8"/>
  <line x1="200" y1="115" x2="200" y2="175" stroke="#1d4ed8" stroke-width="1.5" stroke-dasharray="3,3"/>
  <text x="200" y="192" text-anchor="middle" font-family="'Cairo', sans-serif" font-size="11.5" font-weight="700" fill="#1d4ed8">SR</text>
  <text x="326" y="60" text-anchor="start" font-family="'Cairo', sans-serif" font-size="11" font-weight="700" fill="#059669">MSCV</text>
  <text x="326" y="118" text-anchor="start" font-family="'Cairo', sans-serif" font-size="11" font-weight="700" fill="#dc2626">CF</text>
  <rect x="370" y="48" width="245" height="145" rx="10" fill="#ffffff" stroke="#1d4ed8" stroke-width="1.6"/>
  <text x="492" y="72" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12.5" font-weight="700" fill="#1e3a8a">قوانين التحليل التفاضلي</text>
  <text x="492" y="96" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" fill="#334155">MSCV = CA − CV</text>
  <text x="492" y="116" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" fill="#334155">t_MSCV = MSCV ÷ CA</text>
  <text x="492" y="138" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" font-weight="700" fill="#059669">SR = CF ÷ t_MSCV</text>
  <text x="492" y="160" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" font-weight="700" fill="#b45309">هامش الأمان MS = CA − SR</text>
  <text x="492" y="180" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">معدل الأمان = MS ÷ CA</text>
</svg>`,
			steps: [
				{
					promptAr: 'أعد جدول تحليل الاستغلال التفاضلي بحساب رقم الأعمال (CA)، التكاليف المتغيرة (CV)، الهامش (MSCV)، معدله ($t_{MSCV}$)، والنتيجة ($R$).',
					hintAr: '$CA = 5\\,000 \\times 800 = 4\\,000\\,000$ دج؛ $CV = 5\\,000 \\times 520 = 2\\,600\\,000$ دج.',
					expectedInput: '1400000 و 35% و 700000',
					revealAr:
						'$CA = 4\\,000\\,000$ دج؛ $CV = 2\\,600\\,000$ دج؛ $MSCV = 4\\,000\\,000 - 2\\,600\\,000 = 1\\,400\\,000$ دج؛ $t_{MSCV} = \\frac{1\\,400\\,000}{4\\,000\\,000} = 35\\%$؛ النتيجة $R = 1\\,400\\,000 - 700\\,000 = 700\\,000$ دج.'
				},
				{
					promptAr: 'احسب عتبة المردودية بالقيمة ($SR$) وبالكمية ($Q_{SR}$)، ثم استنتج تاريخ تحقيقها.',
					hintAr: '$SR = \\frac{700\\,000}{0.35}$؛ وعدد الأشهر $= \\frac{SR}{CA} \\times 12$.',
					expectedInput: '2000000 و 2500 وحدة و 30 جوان',
					revealAr:
						'$SR = \\frac{700\\,000}{0.35} = 2\\,000\\,000$ دج؛ $Q_{SR} = \\frac{2\\,000\\,000}{800} = 2\\,500$ وحدة. عدد الأشهر $= \\frac{2\\,000\\,000}{4\\,000\\,000} \\times 12 = 6$ أشهر؛ أي يتحقق التوازن في $30$ جوان (أو $01$ جويلية).'
				},
				{
					promptAr: 'احسب هامش الأمان ($MS$) ومعدل الأمان ($t_{MS}$) ثم فسر معناهما.',
					hintAr: '$MS = CA - SR$.',
					expectedInput: '2000000 و 50%',
					revealAr:
						'$MS = 4\\,000\\,000 - 2\\,000\\,000 = 2\\,000\\,000$ دج، ومعدل الأمان $= \\frac{2\\,000\\,000}{4\\,000\\,000} = 50\\%$. يعني أن رقم الأعمال يمكن أن ينخفض حتى $50\\%$ قبل أن تدخل المؤسسة في منطقة الخسارة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الأعباء المتغيرة ($CV$) والثابتة ($CF$): تتغير $CV$ طردياً مع حجم النشاط (المبيعات أو الإنتاج)، بينما تبقى $CF$ ثابتة ضمن مجال إنتاجي معين (إيجار، اهتلاك خطي، تأمين، أجور إدارية ثابتة).',
				'جدول الاستغلال التفاضلي: $MSCV = CA - CV$؛ نسبة الهامش $t_{MSCV} = \\frac{MSCV}{CA}$؛ النتيجة الجارية $R = MSCV - CF$. (في المؤسسات الصناعية قد تُطرح منتوجات مالية أو تضاف إلى $CF$ للحصول على $CF$ الصافية).',
				'عتبة المردودية ($SR$): رقم الأعمال الذي يحقق نتيجة تساوي صفراً ($MSCV = CF$). تُحسب بالقيمة: $SR = \\frac{CF}{t_{MSCV}} = \\frac{CA \\times CF}{MSCV}$؛ وبالكمية: $Q_{SR} = \\frac{SR}{P_u} = \\frac{CF}{MSCV_u}$.',
				'تاريخ تحقيق عتبة المردودية (النشاط المنتظم): $\\text{المدة بالأشهر} = \\frac{SR}{CA} \\times 12$ (مع تحويل الجزء العشري إلى أيام بالضرب في $30$). إذا كانت للمؤسسة عطلة سنوية لشهر واحد يُضرب في $11$ بدل $12$ ثم يُراعى شهر التوقف.',
				'هامش الأمان ومعدله: $MS = CA - SR$، ومعدل الأمان $t_{MS} = \\frac{MS}{CA}$، وتربط النتيجة بهامش الأمان علاقة: $R = MS \\times t_{MSCV}$.'
			],
			visualSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 180" width="640" height="180" role="img" aria-label="العلاقة بين النتيجة وهامش الأمان">
  <rect width="640" height="180" rx="14" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1.4"/>
  <text x="320" y="26" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="14.5" font-weight="700" fill="#065f46">الروابط الجبرية السريعة في التكاليف المتغيرة (المراجعة للبكالوريا)</text>
  <rect x="335" y="45" width="275" height="90" rx="10" fill="#ffffff" stroke="#059669" stroke-width="1.6"/>
  <text x="472" y="70" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12.5" font-weight="700" fill="#047857">من عتبة المردودية إلى النتيجة</text>
  <text x="472" y="96" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" fill="#0f172a">CF = SR × t_MSCV</text>
  <text x="472" y="118" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" fill="#0f172a">R = (CA − SR) × t_MSCV = MS × t_MSCV</text>
  <rect x="30" y="45" width="275" height="90" rx="10" fill="#ffffff" stroke="#1d4ed8" stroke-width="1.6"/>
  <text x="167" y="70" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12.5" font-weight="700" fill="#1e3a8a">التحقق من رقم الأعمال والكمية</text>
  <text x="167" y="96" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" fill="#0f172a">t_MSCV + t_CV = 100%</text>
  <text x="167" y="118" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" fill="#0f172a">تاريخ العتبة = (SR ÷ CA) × 360 يوماً</text>
  <text x="320" y="158" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" font-weight="700" fill="#0f172a">كلما انخفضت عتبة المردودية SR، ارتفع هامش الأمان وزادت قدرة المؤسسة على تحمل تراجع المبيعات</text>
</svg>`,
			visualCaptionAr: 'العلاقات التحليلية المختصرة لربط عتبة المردودية بهامش الأمان والنتيجة',
			examples: [
				{
					problemAr:
						'إذا علمت أن $CA = 3\\,000\\,000$ دج، وتكلفة متغيرة بنسبة $60\\%$ من $CA$، والنتيجة $300\\,000$ دج. احسب $t_{MSCV}$ و $CF$ و $SR$.',
					solutionAr:
						'$t_{MSCV} = 100\\% - 60\\% = 40\\%$، $MSCV = 3\\,000\\,000 \\times 0.40 = 1\\,200\\,000$ دج. $CF = MSCV - R = 1\\,200\\,000 - 300\\,000 = 900\\,000$ دج. $SR = \\frac{900\\,000}{0.40} = 2\\,250\\,000$ دج.'
				},
				{
					problemAr:
						'تتوقف مؤسسة عن النشاط خلال شهر أوت كعطلة سنوية، وبلغت $SR = 1\\,800\\,000$ دج من أصل $CA = 3\\,300\\,000$ دج. متى تتحقق العتبة؟',
					solutionAr:
						'عدد أشهر النشاط الفعلي $= \\frac{1\\,800\\,000}{3\\,300\\,000} \\times 11 = 6$ أشهر نشاط فعلي (جانفي..جوان)؛ أي في $30$ جوان (قبل شهر أوت أصلاً).'
				}
			],
			watchOutAr:
				'في بعض التمارين يُعطى «رقم الأعمال الصافي» مضافاً إليه «تكاليف متغيرة للشراء» مطروحاً منه «تغير المخزون» و«تخفيضات محصلة 609»؛ احسب التكلفة المتغيرة للمبيعات أولاً ثم استنتج $MSCV$!'
		},
		practice: [
			{
				questionAr: 'مؤسسة حققت رقم أعمال $CA = 5\\,000\\,000$ دج، وتكاليفها المتغيرة $3\\,000\\,000$ دج، وتكاليفها الثابتة $1\\,200\\,000$ دج. كم تساوي عتبة المردودية (SR)؟',
				options: ['$3\\,000\\,000$ دج', '$2\\,000\\,000$ دج', '$1\\,200\\,000$ دج', '$4\\,000\\,000$ دج'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'$2\\,000\\,000$ دج هو هامش التكلفة المتغيرة (MSCV) وليس عتبة المردودية.',
					'$1\\,200\\,000$ دج هو التكاليف الثابتة فقط.',
					'نسبة الهامش هي $40\\%$ ($2M / 5M$) وليست $30\\%$.'
				],
				explanationAr: '$MSCV = 2\\,000\\,000$ دج $\\implies t_{MSCV} = 40\\%$؛ إذن $SR = \\frac{1\\,200\\,000}{0.40} = 3\\,000\\,000$ دج.'
			},
			{
				questionAr: 'إذا كان رقم الأعمال $4\\,000\\,000$ دج وعتبة المردودية $2\\,800\\,000$ دج، فما قيمة هامش الأمان ومعدله؟',
				options: [
					'$1\\,200\\,000$ دج و $30\\%$',
					'$1\\,200\\,000$ دج و $70\\%$',
					'$2\\,800\\,000$ دج و $70\\%$',
					'$1\\,400\\,000$ دج و $35\\%$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'$70\\%$ هي نسبة العتبة إلى رقم الأعمال وليست معدل الأمان.',
					'العتبة هي نقطة التعادل وليست هامش الأمان.',
					'تحقق من الفرق $4\\,000\\,000 - 2\\,800\\,000$.'
				],
				explanationAr: '$MS = 4\\,000\\,000 - 2\\,800\\,000 = 1\\,200\\,000$ دج؛ معدل الأمان $= \\frac{1\\,200\\,000}{4\\,000\\,000} = 30\\%$.'
			},
			{
				questionAr: 'في نشاط منتظم على $12$ شهراً، بلغ $SR = 2\\,700\\,000$ دج من أصل $CA = 3\\,600\\,000$ دج. في أي تاريخ تتحقق عتبة المردودية؟',
				options: ['30 سبتمبر (نهاية الشهر 9)', '30 جوان (نهاية الشهر 6)', '31 أكتوبر (نهاية الشهر 10)', '31 أوت (نهاية الشهر 8)'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'$6$ أشهر توافق نصف رقم الأعمال لا ثلاثة أرباعه.',
					'احسب $\\frac{2\\,700\\,000}{3\\,600\\,000} \\times 12 = 0.75 \\times 12 = 9$ أشهر.',
					'ثمانية أشهر توافق $\\frac{2}{3}$ من رقم الأعمال.'
				],
				explanationAr: 'المدة $= \\frac{2\\,700\\,000}{3\\,600\\,000} \\times 12 = 9$ أشهر كاملة، أي في نهاية الشهر التاسع ($30$ سبتمبر).'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 12 (T3): تقييم المشاريع الاستثمارية الحلال (CAF وفترة الاسترداد DR)
	// STRICT SHARIAH COMPLIANCE: Zero usurious interest rates / discounting!
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'mgt_lesson_3as_acc_t3_halal_investment_appraisal',
		slug: 'mgt-3as-acc-t3-halal-investment-appraisal',
		grade: '3as_acc',
		yearSubjectId: 755,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المجال المفاهيمي الثالث: المحاسبة التحليلية وتقييم المشاريع الحلال',
		order: 12,
		titleAr: 'تقييم المشاريع الاستثمارية الحلال (التدفق الصافي للخزينة CAF وفترة الاسترداد DR)',
		objectives: [
			'حساب تكلفة الاستثمار الأولي الحلال (I0) وتحديد التدفقات النقدية الصافية للخزينة (CAF) السنوية بعد الضريبة (IBS)',
			'حساب فترة الاسترداد (DR) عبر تراكم التدفقات النقدية الصافية والحكم على مردودية المشروع وقبوله',
			'حساب العائد الصافي التراكمي للمشروع والمفاضلة بين المشاريع الاستثمارية المشروعة اعتماداً على التدفقات الحقيقية دون الربا'
		],
		keywordsAr: [
			'الاستثمار الأولي I0',
			'التدفق الصافي للخزينة CAF',
			'فترة الاسترداد DR',
			'العائد الصافي التراكمي',
			'التمويل الاستثماري الحلال',
			'المفاضلة بين المشاريع'
		],
		discover: {
			scenarioAr:
				'تدرس مؤسسة «الشلف الصناعية» مشروعاً استثمارياً حلالاً لإنتاج مستلزمات التعبئة الورقية بتمويل ذاتي وشراكة استثمارية (دون أي اقتراض ربوي). تبلغ تكلفة اقتناء الآلات $I_0 = 2\\,000\\,000$ دج تهتلك خطياً على $4$ سنوات ($500\\,000$ دج سنوياً، دون قيمة متبقية). القيم المتوقعة سنوياً ثابتة على مدى $4$ سنوات: مقبوضات سنوية $1\\,500\\,000$ دج، ومدفوعات تشغيلية سنوية $600\\,000$ دج، ومعدل ضريبة الأرباح IBS هو $19\\%$.',
			svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 215" width="640" height="215" role="img" aria-label="تقييم المشاريع الحلال بـ CAF و DR">
  <rect width="640" height="215" rx="14" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1.4"/>
  <text x="320" y="26" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="14.5" font-weight="700" fill="#065f46">تقييم المشاريع الاستثمارية المشروعة (CAF، فترة الاسترداد DR، والعائد التراكمي)</text>
  <rect x="430" y="45" width="184" height="114" rx="10" fill="#ffffff" stroke="#059669" stroke-width="1.7"/>
  <text x="522" y="70" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12.5" font-weight="700" fill="#047857">1. حساب CAF السنوي</text>
  <text x="522" y="94" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">النتيجة قبل الضريبة = قبض − دفع − اهتلاك</text>
  <text x="522" y="114" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">النتيجة الصافية = النتيجة × (1 − IBS)</text>
  <text x="522" y="136" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" font-weight="700" fill="#065f46">CAF = النتيجة الصافية + الاهتلاك</text>
  <rect x="228" y="45" width="184" height="114" rx="10" fill="#ffffff" stroke="#1d4ed8" stroke-width="1.7"/>
  <text x="320" y="70" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12.5" font-weight="700" fill="#1e3a8a">2. فترة الاسترداد (DR)</text>
  <text x="320" y="94" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">نجمع CAF المتراكم سنة بسنة</text>
  <text x="320" y="114" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">حتى نبلغ رأس المال المستثمر I0</text>
  <text x="320" y="136" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" font-weight="700" fill="#1d4ed8">نفضل المشروع ذا أقصر DR</text>
  <rect x="26" y="45" width="184" height="114" rx="10" fill="#ffffff" stroke="#b45309" stroke-width="1.7"/>
  <text x="118" y="70" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="12.5" font-weight="700" fill="#92400e">3. العائد التراكمي الحلال</text>
  <text x="118" y="94" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">الفائض = ∑ CAF + VR − I0</text>
  <text x="118" y="114" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">يجب أن يكون موجباً (&gt; 0)</text>
  <text x="118" y="136" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11" font-weight="700" fill="#b45309">ونشاط المشروع مباحاً شرعاً</text>
  <text x="320" y="186" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" font-weight="700" fill="#0f172a">تتم المفاضلة بين المشاريع على أساس النشاط الحلال الفعلي، وفترة الاسترداد DR، والعائد الصافي التراكمي</text>
</svg>`,
			steps: [
				{
					promptAr: 'احسب النتيجة الصافية السنوية بعد الضريبة (IBS $19\\%$) ثم التدفق الصافي للخزينة ($CAF$) السنوي للمشروع.',
					hintAr: 'النتيجة قبل الضريبة $= 1\\,500\\,000 - 600\\,000 - 500\\,000 = 400\\,000$ دج.',
					expectedInput: '324000 و 824000',
					revealAr:
						'النتيجة قبل الضريبة $= 400\\,000$ دج؛ الضريبة $= 400\\,000 \\times 0.19 = 76\\,000$ دج؛ النتيجة الصافية $= 324\\,000$ دج. $CAF = 324\\,000 + 500\\,000 = 824\\,000$ دج سنوياً.'
				},
				{
					promptAr: 'احسب فترة الاسترداد ($DR$) بالسنوات والأشهر (علماً أن $CAF$ ثابت $= 824\\,000$ دج سنوياً وتكلفة الاستثمار $2\\,000\\,000$ دج).',
					hintAr: 'في نهاية السنة الثانية يسترد المشروع $1\\,648\\,000$ دج، ويتبقى $352\\,000$ دج من السنة الثالثة.',
					expectedInput: 'سنتان و 5 أشهر و 4 أيام',
					revealAr:
						'بعد سنتين: التراكم $= 1\\,648\\,000$ دج. المتبقي $= 2\\,000\\,000 - 1\\,648\\,000 = 352\\,000$ دج. الكسر من السنة الثالثة $= \\frac{352\\,000}{824\\,000} \\times 12 \\approx 5.126$ شهر (أي $5$ أشهر و$4$ أيام تقريباً). إذن $DR \\approx 2.43$ سنة (سنتان و$5$ أشهر و$4$ أيام).'
				},
				{
					promptAr: 'احسب العائد الصافي التراكمي للمشروع خلال $4$ سنوات ($\\sum CAF - I_0$) وهل يُعد المشروع مجدياً؟',
					hintAr: 'مجموع $CAF$ لأربع سنوات $= 824\\,000 \\times 4 = 3\\,296\\,000$ دج.',
					expectedInput: '1296000 مجدٍ ومربح',
					revealAr:
						'العائد الصافي التراكمي $= 3\\,296\\,000 - 2\\,000\\,000 = +1\\,296\\,000$ دج. المشروع مجدٍ ومقبول لأن نشاطه حلال، وعائده الصافي التراكمي موجب، وفترة استرداده أقل من عمره الإنتاجي.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الضوابط الشرعية في تقييم الاستثمار: يُشترط أن يكون نشاط المشروع إنتاجياً أو خدماتياً مباحاً شرعاً، وأن يعتمد على التمويل الذاتي أو التمويل الإسلامي المشروع (مرابحة، مشاركة، إجارة) مع الابتعاد التام عن القروض الربوية.',
				'مبلغ الاستثمار الأولي ($I_0$): يشمل تكلفة شراء الآلات والمعدات ومصاريف التركيب والتهيئة والتكوين المرتبطة بتشغيل المشروع.',
				'التدفق الصافي للخزينة ($CAF$): $CAF_t = (\\text{المقبوضات}_t - \\text{المدفوعات}_t - \\text{الاهتلاك}_t)(1 - t_{IBS}) + \\text{الاهتلاك}_t = \\text{النتيجة الصافية}_t + \\text{الاهتلاك}_t$.',
				'فترة الاسترداد ($DR$): المدة الزمنية اللازمة لاسترجاع رأس المال المستثمر $I_0$ من خلال تراكم $CAF$ السنوية: (1) إذا كان $CAF$ ثابتاً: $DR = \\frac{I_0}{CAF}$؛ (2) إذا كان $CAF$ متغيراً: نحسب التراكم السنوي ثم $DR = n + \\frac{I_0 - \\text{التراكم}_n}{CAF_{n+1}}$ بالسنوات.',
				'معيار الاختيار والمفاضلة: يُقبل المشروع إذا حقق $DR < \\text{العمر الإنتاجي}$ وكان العائد الصافي التراكمي ($\\sum CAF + VR - I_0$) موجباً؛ وعند المفاضلة بين مشروعين حلالين نختار المشروع الأعلى عائداً تراكمياً والأقصر فترة استرداد (DR).'
			],
			visualSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 180" width="640" height="180" role="img" aria-label="خط زمني للتدفقات وفترة الاسترداد">
  <rect width="640" height="180" rx="14" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.4"/>
  <text x="320" y="26" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="14.5" font-weight="700" fill="#1e3a8a">التمثيل الزمني للتدفقات النقدية وتراكم الاسترداد (DR)</text>
  <line x1="60" y1="100" x2="580" y2="100" stroke="#334155" stroke-width="2.5"/>
  <circle cx="540" cy="100" r="6" fill="#dc2626"/>
  <text x="540" y="80" text-anchor="middle" font-family="'Cairo', sans-serif" font-size="11.5" font-weight="700" fill="#dc2626">− I0</text>
  <text x="540" y="125" text-anchor="middle" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">السنة 0</text>
  <circle cx="410" cy="100" r="6" fill="#059669"/>
  <text x="410" y="80" text-anchor="middle" font-family="'Cairo', sans-serif" font-size="11.5" font-weight="700" fill="#059669">+ CAF1</text>
  <text x="410" y="125" text-anchor="middle" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">السنة 1</text>
  <circle cx="280" cy="100" r="6" fill="#059669"/>
  <text x="280" y="80" text-anchor="middle" font-family="'Cairo', sans-serif" font-size="11.5" font-weight="700" fill="#059669">+ CAF2</text>
  <text x="280" y="125" text-anchor="middle" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">السنة 2</text>
  <circle cx="150" cy="100" r="6" fill="#1d4ed8"/>
  <text x="150" y="80" text-anchor="middle" font-family="'Cairo', sans-serif" font-size="11.5" font-weight="700" fill="#1d4ed8">+ CAF3 (DR)</text>
  <text x="150" y="125" text-anchor="middle" font-family="'Cairo', sans-serif" font-size="11" fill="#334155">السنة 3</text>
  <text x="320" y="160" text-anchor="middle" direction="rtl" font-family="'Cairo', sans-serif" font-size="11.5" font-weight="700" fill="#065f46">الاستثمار الحلال الناجح يسترد تكلفته I0 سريعاً ويحقق فائضاً إنتاجياً حقيقياً مستداماً</text>
</svg>`,
			visualCaptionAr: 'التدفق الأولي الخارج (-I0) والتدفقات النقدية الداخلة (+CAF) حتى فترة الاسترداد',
			examples: [
				{
					problemAr:
						'مشروع استثماري تكلفته $I_0 = 1\\,500\\,000$ دج، يحقق تدفقات خزينة صافية متزايدة: السنة 1 ($400\\,000$)، السنة 2 ($500\\,000$)، السنة 3 ($750\\,000$)، السنة 4 ($800\\,000$). احسب فترة الاسترداد DR.',
					solutionAr:
						'التراكم: نهاية س1 = $400\\,000$؛ نهاية س2 = $900\\,000$؛ نهاية س3 = $1\\,650\\,000$ ($> 1\\,500\\,000$). إذن الاسترداد خلال السنة الثالثة: $DR = 2 + \\frac{1\\,500\\,000 - 900\\,000}{750\\,000} = 2 + 0.8 = 2.8$ سنة (سنتان و$9$ أشهر و$18$ يوماً).'
				},
				{
					problemAr:
						'مفاضلة بين مشروعين حلالين بنفس الكلفة $1\\,200\\,000$ دج لمدة $4$ سنوات: المشروع (أ) يسترد تكلفته في $2.2$ سنة وعائده الصافي التراكمي $+800\\,000$ دج؛ المشروع (ب) يسترد في $3.1$ سنة وعائده $+650\\,000$ دج. أيهما أفضل؟',
					solutionAr:
						'نختار المشروع (أ) لأنه يحقق فترة استرداد أقصر ($2.2 < 3.1$ سنة) مما يقلل المخاطر، وعائداً صافياً تراكمياً أعلى ($800\\,000 > 650\\,000$ دج).'
				}
			],
			watchOutAr:
				'انتبه إلى أن الاهتلاك السنوي يُطرح عند حساب **النتيجة الخاضعة للضريبة** لتخفيض مبلغ الضريبة (IBS)، ثم **يُعاد إضافته** للحصول على $CAF$ لأنه عبء غير مدفوع نقداً!'
		},
		practice: [
			{
				questionAr: 'مشروع استثماري حلال حقق مقبوضات سنوية $1\\,800\\,000$ دج، مدفوعات سنوية $700\\,000$ دج، واهتلاكاً سنوياً $300\\,000$ دج، بمعدل ضريبة IBS $19\\%$. كم يبلغ $CAF$ السنوي؟',
				options: ['$948\\,000$ دج', '$648\\,000$ دج', '$800\\,000$ دج', '$1\\,100\\,000$ دج'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'$648\\,000$ دج هي النتيجة الصافية قبل إعادة إضافة مخصص الاهتلاك ($300\\,000$ دج).',
					'$800\\,000$ دج هي النتيجة قبل الضريبة.',
					'$1\\,100\\,000$ دج هي الفارق النقدي قبل احتساب الضريبة على الأرباح.'
				],
				explanationAr: 'النتيجة قبل الضريبة $= 1\\,800\\,000 - 700\\,000 - 300\\,000 = 800\\,000$ دج؛ الصافية $= 800\\,000 \\times 0.81 = 648\\,000$ دج؛ $CAF = 648\\,000 + 300\\,000 = 948\\,000$ دج.'
			},
			{
				questionAr: 'مشروع تكلفته الأولية $I_0 = 2\\,400\\,000$ دج وتدفقاته النقدية الصافية السنوية ثابتة قدرها $CAF = 600\\,000$ دج لمدة $6$ سنوات. ما فترة الاسترداد ($DR$)؟',
				options: ['$4$ سنوات', '$3$ سنوات', '$5$ سنوات', '$2.5$ سنة'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'$3$ سنوات تسترد $1\\,800\\,000$ دج فقط.',
					'$5$ سنوات تعطي $3\\,000\\,000$ دج.',
					'اقسم $2\\,400\\,000$ على $600\\,000$.'
				],
				explanationAr: 'بما أن $CAF$ ثابت: $DR = \\frac{2\\,400\\,000}{600\\,000} = 4$ سنوات.'
			},
			{
				questionAr: 'عند المفاضلة بين مشروعين إنتاجيين مشروعين بنفس المدة والتكلفة، أي معيار يُرجّح اختيار المشروع الأفضل وفق التقييم الحلال؟',
				options: [
					'أقصر فترة استرداد (DR) وأعلى عائد صافي تراكمي (∑ CAF − I0) في نشاط مباح وممول بوسائل حلال',
					'أطول فترة استرداد (DR) وأقل تدفق نقدي',
					'التمويل بالقروض الربوية المحرمة من البنوك التقليدية',
					'إهمال ضريبة IBS ومخصصات الاهتلاك في حساب CAF'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'أطول فترة استرداد تزيد المخاطر المالية وتبطئ استرجاع رأس المال.',
					'القروض الربوية محرمة شرعاً ومرفوضة في المشاريع الحلال.',
					'الاهتلاك والضريبة عنصران حاسمان في تحديد CAF الفعلي.'
				],
				explanationAr: 'يفضل المستثمر المشروع المباح الذي يسترد تكلفته في أقصر مدة ممكنة ويحقق أعلى عائد صافي تراكمي.'
			}
		]
	}
];
