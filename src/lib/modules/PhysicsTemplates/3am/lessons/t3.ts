import type { PhysicsInteractiveLessonData } from '../../types';

function wrapSvg(width: number, height: number, body: string): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="background:#ffffff;font-family:'Arabic Transparent',Arial,sans-serif">${body}</svg>`;
}

export const PHYSICS_LESSONS_3AM_T3: PhysicsInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// 12. قانون أوم والقوة المحركة الكهربائية والتحويل الطاقوي الكهربائي
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'phy_lesson_3am_t3_ohms_law_emf_electric_power',
		slug: 'phy-3am-t3-ohms-law-emf-electric-power',
		grade: '3am',
		yearSubjectId: 638,
		trimesterId: 't3',
		sequenceId: 'seq5',
		sequenceTitleAr:
			'المقطع الخامس: قانون أوم، القوة المحركة الكهربائية، والتحويل الطاقوي الكهربائي',
		order: 12,
		titleAr:
			'قانون أوم (U = R·I)، القوة المحركة الكهربائية للمولد (e)، والتحويل الطاقوي الكهربائي (P = U·I)',
		objectives: [
			'التحقق من قانون أوم لناقل أومي (U = R·I) وتطبيقه في حساب U أو R أو I',
			'التعرف على القوة المحركة الكهربائية (e) لمولد وتأثير المقاومة الكلية للدارة على شدة التيار (I = e / R_t)',
			'حساب استطاعة التحويل الطاقوي الكهربائي (P = U·I) والطاقة المحولة (E = U·I·t) والتحقق من انحفاظ الاستطاعة والطاقة في الدارة'
		],
		keywordsAr: [
			'قانون أوم',
			'القوة المحركة الكهربائية',
			'الاستطاعة الكهربائية',
			'الطاقة الكهربائية',
			'انحفاظ الاستطاعة'
		],
		discover: {
			scenarioAr:
				'أوصل تلميذ ناقلاً أومياً مجهول المقاومة $R$ بمولد متغير التوتر، وقاس التوتر $U$ بين طرفيه وشدة التيار $I$ المار فيه، فسجل القيم: $(0.1\\text{ A}, 2.2\\text{ V})$، $(0.2\\text{ A}, 4.4\\text{ V})$، $(0.3\\text{ A}, 6.6\\text{ V})$. لاحظ أن النسبة $\\frac{U}{I}$ تبقى ثابتة دائماً! ما اسم هذا القانون، وكيف نربطه بالقوة المحركة للمولد $e$ والاستطاعة الكهربائية $P$؟',
			svg: wrapSvg(
				560,
				210,
				`<rect x="10" y="10" width="540" height="190" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="32" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#0f172a">منحنى مميزة الناقل الأومي U = f(I) ودارة التحقق من قانون أوم</text>
				<g transform="translate(26,46)">
					<line x1="40" y1="126" x2="235" y2="126" stroke="#1e293b" stroke-width="1.6"/>
					<line x1="40" y1="126" x2="40" y2="12" stroke="#1e293b" stroke-width="1.6"/>
					<text x="235" y="142" text-anchor="end" font-size="11" font-weight="bold">I (A)</text>
					<text x="34" y="18" text-anchor="end" font-size="11" font-weight="bold">U (V)</text>
					<line x1="40" y1="126" x2="210" y2="24" stroke="#2563eb" stroke-width="2.4"/>
					<circle cx="97" cy="92" r="3.5" fill="#dc2626"/><text x="97" y="140" text-anchor="middle" font-size="10">0.1</text><text x="34" y="96" text-anchor="end" font-size="10">2.2</text>
					<circle cx="153" cy="58" r="3.5" fill="#dc2626"/><text x="153" y="140" text-anchor="middle" font-size="10">0.2</text><text x="34" y="62" text-anchor="end" font-size="10">4.4</text>
					<circle cx="210" cy="24" r="3.5" fill="#dc2626"/><text x="210" y="140" text-anchor="middle" font-size="10">0.3</text><text x="34" y="28" text-anchor="end" font-size="10">6.6</text>
					<text x="140" y="42" font-size="11.5" font-weight="bold" fill="#1d4ed8">R = U / I = 22 Ω</text>
				</g>
				<g transform="translate(290,46)">
					<rect x="0" y="0" width="244" height="142" rx="9" fill="#eff6ff" stroke="#2563eb" stroke-width="1.4"/>
					<text x="122" y="22" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e3a8a">العلاقات الأساسية في الدارة</text>
					<text x="122" y="48" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">قانون أوم: U = R × I</text>
					<text x="122" y="74" text-anchor="middle" font-size="12" font-weight="bold" fill="#059669">الشدة والقوة المحركة: I = e / R_t</text>
					<text x="122" y="100" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">الاستطاعة الكهربائية: P = U × I</text>
					<text x="122" y="126" text-anchor="middle" font-size="12" font-weight="bold" fill="#7c3aed">الطاقة الكهربائية: E = U × I × t</text>
				</g>`
			),
			steps: [
				{
					promptAr:
						'احسب النسبة الثابتة $\\frac{U}{I}$ من قياسات التلميذ ($U = 4.4\\text{ V}$ و $I = 0.2\\text{ A}$). ما قيمة مقاومة الناقل الأومي $R$؟',
					hintAr: 'اقسم $4.4$ على $0.2$.',
					expectedInput: '22',
					revealAr: '$R = \\frac{U}{I} = \\frac{4.4}{0.2} = 22\\,\\Omega$.'
				},
				{
					promptAr:
						'إذا ربطنا هذا الناقل الأومي ($R = 22\\,\\Omega$) مع مقاومة أخرى $R_2 = 18\\,\\Omega$ على التسلسل مع مولد قوته المحركة $e = 12\\text{ V}$، فما المقاومة الكلية $R_t = R + R_2$ وما شدة التيار $I = \\frac{e}{R_t}$؟',
					hintAr: 'احسب أولاً $R_t = 22 + 18$، ثم اقسم $e = 12$ على $R_t$.',
					expectedInput: '0.3',
					revealAr:
						'$R_t = 22 + 18 = 40\\,\\Omega$، ومنه $I = \\frac{12}{40} = 0.3\\text{ A}$.'
				},
				{
					promptAr:
						'ما استطاعة التحويل الكهربائي $P = U \\times I$ عندما يكون التوتر $U = 6\\text{ V}$ والشدة $I = 0.5\\text{ A}$؟',
					hintAr: 'اضرب $6 \\times 0.5$.',
					expectedInput: '3',
					revealAr: '$P = U \\times I = 6 \\times 0.5 = 3\\text{ W}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**قانون أوم**: يتناسب التوتر الكهربائي $U$ بين طرفي ناقل أومي طردياً مع شدة التيار المار فيه $I$، ويكون البيان $U = f(I)$ خطاً مستقيماً يمر بالمبدأ ميله يساوي المقاومة $R$:\n$$U = R \\times I \\iff R = \\frac{U}{I} \\iff I = \\frac{U}{R}$$\n($U$ بالفولط $\\text{V}$، $R$ بالأوم $\\Omega$، $I$ بالأمبير $\\text{A}$).',
				'**القوة المحركة الكهربائية للمولد ($e$)**: تمثّل التوتر الكهربائي بين قطبي المولد عندما يكون في دارة مفتوحة. في دارة مغلقة مقاومتها الكلية $R_t$، تتحدد شدة التيار بالعلاقة: $I = \\frac{e}{R_t}$ (تنقص شدة التيار كلما زادت المقاومة الكلية $R_t$).',
				'**الاستطاعة والطاقة الكهربائية في التيار المستمر**:\n- استطاعة التحويل الكهربائي لجهاز بين طرفيه توتر $U$ ويمر فيه تيار $I$: $P = U \\times I$ (بالواط $\\text{W}$).\n- الطاقة الكهربائية المحولة خلال مدة $t$: $E = P \\times t = U \\times I \\times t$ (بالجول $\\text{J}$ إذا كان $t$ بالثانية، أو $\\text{Wh}$ إذا كان $t$ بالساعة).\n- **انحفاظ الاستطاعة**: استطاعة المولد الكلية تساوي مجموع استطاعات الأجهزة المغذاة في الدارة ($P = P_1 + P_2 + \\dots$).'
			],
			visualSvg: wrapSvg(
				560,
				175,
				`<rect x="10" y="10" width="540" height="155" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="34" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#1e3a8a">مثلث قانون أوم (U = R·I) ومثلث الاستطاعة الكهربائية (P = U·I)</text>
				<polygon points="145,52 75,148 215,148" fill="#dbeafe" stroke="#2563eb" stroke-width="1.8"/>
				<line x1="110" y1="100" x2="180" y2="100" stroke="#1d4ed8" stroke-width="1.5"/>
				<line x1="145" y1="100" x2="145" y2="148" stroke="#1d4ed8" stroke-width="1.5"/>
				<text x="145" y="88" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e3a8a">U (V)</text>
				<text x="118" y="132" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">R (Ω)</text>
				<text x="172" y="132" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">I (A)</text>
				<polygon points="415,52 345,148 485,148" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>
				<line x1="380" y1="100" x2="450" y2="100" stroke="#b45309" stroke-width="1.5"/>
				<line x1="415" y1="100" x2="415" y2="148" stroke="#b45309" stroke-width="1.5"/>
				<text x="415" y="88" text-anchor="middle" font-size="14" font-weight="bold" fill="#92400e">P (W)</text>
				<text x="388" y="132" text-anchor="middle" font-size="13" font-weight="bold" fill="#92400e">U (V)</text>
				<text x="442" y="132" text-anchor="middle" font-size="13" font-weight="bold" fill="#92400e">I (A)</text>`
			),
			visualCaptionAr: 'المثلثان التذكيريان لقانون أوم والاستطاعة الكهربائية',
			examples: [
				{
					problemAr:
						'ناقل أومي مقاومته $R = 150\\,\\Omega$ يمر فيه تيار مستمر شدته $I = 80\\text{ mA}$. احسب التوتر $U$ بين طرفيه واستطاعته الكهربائية $P$.',
					solutionAr:
						'نحوّل الشدة إلى الأمبير: $I = 80\\text{ mA} = 0.08\\text{ A}$.\nحسب قانون أوم: $U = R \\times I = 150 \\times 0.08 = 12\\text{ V}$.\nالاستطاعة: $P = U \\times I = 12 \\times 0.08 = 0.96\\text{ W}$.'
				},
				{
					problemAr:
						'يغذي مولد قوته المحركة $e = 12\\text{ V}$ مصباحين على التفرع استطاعتهما $P_1 = 3.6\\text{ W}$ و $P_2 = 2.4\\text{ W}$ لمدة $10\\text{ min}$. احسب الاستطاعة الكلية $P$، والشدة الكلية $I$، والطاقة المحولة $E$ بالجول.',
					solutionAr:
						'انحفاظ الاستطاعة: $P = P_1 + P_2 = 3.6 + 2.4 = 6\\text{ W}$.\nالشدة الكلية: $I = \\frac{P}{U} = \\frac{6}{12} = 0.5\\text{ A}$.\nالمدة بالثواني: $t = 10 \\times 60 = 600\\text{ s}$، إذن الطاقة: $E = P \\times t = 6 \\times 600 = 3600\\text{ J}$ (أي $1\\text{ Wh}$).'
				}
			],
			watchOutAr:
				'احذر من تطبيق قانون أوم قبل تحويل الوحدات! إذا كانت الشدة بالميلي أمبير ($\\text{mA}$) اقسم على $1000$ للتحويل إلى الأمبير ($\\text{A}$)، وإذا كانت المقاومة بالكيلوأوم ($\\text{k}\\Omega$) اضرب في $1000$ للتحويل إلى الأوم ($\\Omega$).'
		},
		practice: [
			{
				questionAr:
					'يمر تيار شدته $I = 250\\text{ mA}$ في ناقل أومي مقاومته $R = 40\\,\\Omega$. ما قيمة التوتر الكهربائي $U$ بين طرفيه؟',
				options: ['$10000\\text{ V}$', '$10\\text{ V}$', '$160\\text{ V}$', '$6.25\\text{ V}$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'نسيت تحويل $250\\text{ mA}$ إلى الأمبير ($0.25\\text{ A}$)!',
					'ممتاز! $I = 0.25\\text{ A}$ و $U = R \\times I = 40 \\times 0.25 = 10\\text{ V}$.',
					'قسمت $R$ على $I$ بدلاً من ضربهما.',
					'راجع التحويل والضرب: $40 \\times 0.25 = 10$.'
				],
				explanationAr:
					'$I = 250\\text{ mA} = 0.25\\text{ A}$، وبقانون أوم: $U = R \\times I = 40 \\times 0.25 = 10\\text{ V}$.'
			},
			{
				questionAr:
					'مصباح دراجة يشتغل تحت توتر $U = 6\\text{ V}$ وتمر فيه شدة تيار $I = 0.5\\text{ A}$ لمدة $20\\text{ min}$. ما استطاعته $P$ وما الطاقة المحولة $E$ بالجول؟',
				options: [
					'$P = 3\\text{ W}$ و $E = 60\\text{ J}$',
					'$P = 3\\text{ W}$ و $E = 3600\\text{ J}$',
					'$P = 12\\text{ W}$ و $E = 14400\\text{ J}$',
					'$P = 3\\text{ W}$ و $E = 1\\text{ J}$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ضربت الاستطاعة في الدقائق ($20$) بدلاً من الثواني ($1200\\text{ s}$).',
					'أحسنت! $P = 6 \\times 0.5 = 3\\text{ W}$ و $t = 20 \\times 60 = 1200\\text{ s}$، إذن $E = 3 \\times 1200 = 3600\\text{ J}$.',
					'الاستطاعة هي $U \\times I$ وليس $U / I$.',
					'$1\\text{ Wh}$ تساوي $3600\\text{ J}$ وليس $1\\text{ J}$.'
				],
				explanationAr:
					'$P = U \\times I = 6 \\times 0.5 = 3\\text{ W}$، و $E = P \\times t = 3 \\times (20 \\times 60) = 3600\\text{ J}$.'
			},
			{
				questionAr:
					'مولد قوته المحركة الكهربائية $e = 9\\text{ V}$ يغذي دارة على التسلسل تضم مقاومتين $R_1 = 20\\,\\Omega$ و $R_2 = 40\\,\\Omega$. ما شدة التيار المارة في الدارة؟',
				options: ['$0.15\\text{ A}$', '$0.45\\text{ A}$', '$0.225\\text{ A}$', '$540\\text{ A}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! $R_t = 20 + 40 = 60\\,\\Omega$، إذن $I = \\frac{9}{60} = 0.15\\text{ A}$.',
					'قسمت على $R_1$ فقط ونسيت جمع المقاومتين على التسلسل.',
					'قسمت على $R_2$ فقط بدلاً من المقاومة الكلية $R_t$.',
					'العلاقة هي القسمة $I = e / R_t$ وليس الضرب.'
				],
				explanationAr:
					'المقاومة الكلية في التسلسل: $R_t = R_1 + R_2 = 60\\,\\Omega$، ومنه $I = \\frac{e}{R_t} = \\frac{9}{60} = 0.15\\text{ A}$.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 13. طيف الضوء الأبيض ونموذج التركيب الجمعي للألوان (RVB)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'phy_lesson_3am_t3_white_light_spectrum_additive_mixing',
		slug: 'phy-3am-t3-white-light-spectrum-additive-mixing',
		grade: '3am',
		yearSubjectId: 638,
		trimesterId: 't3',
		sequenceId: 'seq6',
		sequenceTitleAr: 'المقطع السادس: الظواهر الضوئية (طيف الضوء الأبيض ونموذجا التركيب الجمعي والطرحي)',
		order: 13,
		titleAr: 'طيف الضوء الأبيض ونموذج التركيب الجمعي للألوان (RVB)',
		objectives: [
			'تحليل الضوء الأبيض بواسطة الموشور وإعادة تركيبه بقرص نيوتن والتعرف على ألوان الطيف المرئي',
			'توظيف نموذج التركيب الجمعي للألوان الأساسية الثلاثة (الأحمر R، الأخضر V، الأزرق B) للحصول على الألوان الثانوية (الأصفر J، السماوي C، الوردي M) والضوء الأبيض'
		],
		keywordsAr: [
			'طيف الضوء الأبيض',
			'الموشور',
			'قرص نيوتن',
			'التركيب الجمعي',
			'الألوان الأساسية RVB',
			'الألوان الثانوية CMJ'
		],
		discover: {
			scenarioAr:
				'بعد سقوط المطر في مدينة قسنطينة، ظهر قوس قزح رائع في السماء، وفي المساء شاهد تلاميذ أضواء مسرح تتقاطع فيها ثلاث كشافات فقط (أحمر $R$، أخضر $V$، أزرق $B$) لتنتج ألواناً جديدة من بينها الأصفر والأبيض! كيف يتركّب الضوء الأبيض من ألوان، وما سر الألوان التي تظهر على شاشات التلفاز والهواتف الذكية؟',
			svg: wrapSvg(
				560,
				210,
				`<rect x="10" y="10" width="540" height="190" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="32" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#0f172a">تحليل الضوء الأبيض بالموشور والتركيب الجمعي (RVB)</text>
				<g transform="translate(20,44)">
					<rect x="0" y="0" width="248" height="144" rx="9" fill="#0f172a"/>
					<text x="124" y="18" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#f8fafc">الموشور الزجاجي</text>
					<line x1="16" y1="82" x2="88" y2="70" stroke="#ffffff" stroke-width="3"/>
					<polygon points="80,115 118,40 156,115" fill="#bae6fd" fill-opacity="0.35" stroke="#38bdf8" stroke-width="1.8"/>
					<line x1="138" y1="74" x2="232" y2="48" stroke="#ef4444" stroke-width="2.2"/>
					<line x1="139" y1="77" x2="232" y2="59" stroke="#f97316" stroke-width="2.2"/>
					<line x1="140" y1="80" x2="232" y2="70" stroke="#eab308" stroke-width="2.2"/>
					<line x1="141" y1="83" x2="232" y2="81" stroke="#22c55e" stroke-width="2.2"/>
					<line x1="142" y1="86" x2="232" y2="92" stroke="#3b82f6" stroke-width="2.2"/>
					<line x1="143" y1="89" x2="232" y2="103" stroke="#6366f1" stroke-width="2.2"/>
					<line x1="144" y1="92" x2="232" y2="114" stroke="#a855f7" stroke-width="2.2"/>
					<text x="124" y="135" text-anchor="middle" font-size="10.5" fill="#e2e8f0">أحمر (أقل انحراف) ← بنفسجي (أكثر انحراف)</text>
				</g>
				<g transform="translate(286,44)">
					<rect x="0" y="0" width="250" height="144" rx="9" fill="#0f172a"/>
					<text x="125" y="18" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#f8fafc">التركيب الجمعي (RVB → CMJ + Blanc)</text>
					<circle cx="105" cy="68" r="36" fill="#ff0000" fill-opacity="0.72"/>
					<circle cx="145" cy="68" r="36" fill="#00ff00" fill-opacity="0.72"/>
					<circle cx="125" cy="100" r="36" fill="#0000ff" fill-opacity="0.72"/>
					<text x="84" y="58" font-size="12" font-weight="bold" fill="#ffffff">R</text>
					<text x="160" y="58" font-size="12" font-weight="bold" fill="#ffffff">V</text>
					<text x="125" y="126" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">B</text>
					<text x="125" y="54" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">J</text>
					<text x="96" y="92" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">M</text>
					<text x="154" y="92" font-size="11" font-weight="bold" fill="#0f172a">C</text>
					<text x="125" y="82" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">أبيض</text>
				</g>`
			),
			steps: [
				{
					promptAr:
						'عند تمرير حزمة ضوء أبيض عبر موشور زجاجي، كم لوناً رئيسياً يظهر في طيف الضوء المرئي؟ وما أقلها انحرافاً وما أكثرها انحرافاً؟',
					hintAr: 'تذكّر ألوان قوس قزح السبعة، يبدأ من الأحمر وينتهي بالبنفسجي.',
					expectedInput: '7 ألوان: الأحمر أقل انحرافا والبنفسجي أكثر انحرافا',
					revealAr:
						'يتحلل الضوء الأبيض إلى طيف مستمر يضم **7 ألوان رئيسية** (أحمر، برتقالي، أصفر، أخضر، أزرق، نيلي، بنفسجي)؛ **الأحمر** أقلها انحرافاً و**البنفسجي** أكثرها انحرافاً.'
				},
				{
					promptAr:
						'عند تدوير «قرص نيوتن» الملون بألوان الطيف بسرعة كبيرة، ما اللون الذي تراه العين؟',
					hintAr: 'إنه عكس التحليل بالموشور (تركيب الضوء).',
					expectedInput: 'الأبيض',
					revealAr: 'تدرك العين **اللون الأبيض** (أو أبيض رمادياً)، مما يثبت أن الضوء الأبيض مركّب من ألوان الطيف.'
				},
				{
					promptAr:
						'في التركيب الجمعي للألوان الأساسية الثلاثة ($R$ أحمر، $V$ أخضر، $B$ أزرق)، ما اللون الثانوي الناتج عن مزج الضوء **الأحمر ($R$) + الضوء الأخضر ($V$)**؟',
					hintAr: 'انتبه: في الضوء (وليس الصباغة!) الأحمر + الأخضر يعطيان لوناً لامعاً مثل الليمون.',
					expectedInput: 'الأصفر (J)',
					revealAr:
						'في التركيب الجمعي للأضواء: $R + V = J$ (**الأصفر**)، $V + B = C$ (**السماوي**)، $R + B = M$ (**الوردي/الأرجواني**)، و $R + V + B = \\text{Blanc}$ (**الأبيض**).'
				}
			]
		},
		summary: {
			rulesAr: [
				'**تحليل الضوء الأبيض وتركيبه**:\n- الضوء الأبيض ضوء **مركّب** وليس بسيطاً؛ يحلله **الموشور الزجاجي** إلى **طيف مستمر** من $7$ ألوان رئيسية (من الأحمر الأقل انحرافاً إلى البنفسجي الأكثر انحرافاً).\n- يُثبت **قرص نيوتن** عند دورانه السريع إعادة تركيب هذه الألوان لإعطاء الضوء الأبيض.',
				'**نموذج التركيب الجمعي للألوان (RVB)**:\n- الألوان الأساسية الثلاثة للضوء هي: **الأحمر ($R$)**، **الأخضر ($V$)**، **الأزرق ($B$)** (وتعتمد عليها شاشات التلفاز والهواتف).\n- جمع ضوءين أساسيين يعطي لوناً **ثانوياً**:\n  - $R + V = J$ (**أصفر** Jaune)\n  - $V + B = C$ (**سماوي** Cyan)\n  - $R + B = M$ (**وردي / أرجواني** Magenta)\n- جمع الأضواء الأساسية الثلاثة يعطي **الضوء الأبيض**: $R + V + B = \\text{أبيض}$.',
				'**الألوان المتكاملة**: كل لونين يعطي جمعهما ضوءاً أبيض يسميان متكاملين (مثل: الأصفر $J$ والأزرق $B$ لأن $J + B = (R+V)+B = \\text{أبيض}$؛ وكذلك $C$ مع $R$، و $M$ مع $V$).'
			],
			visualSvg: wrapSvg(
				560,
				175,
				`<rect x="10" y="10" width="540" height="155" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="34" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#1e3a8a">معادلات التركيب الجمعي للأضواء (RVB)</text>
				<rect x="26" y="48" width="160" height="48" rx="8" fill="#fef08a" stroke="#ca8a04"/><text x="106" y="77" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">R + V = J (أصفر)</text>
				<rect x="200" y="48" width="160" height="48" rx="8" fill="#a5f3fc" stroke="#0891b2"/><text x="280" y="77" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">V + B = C (سماوي)</text>
				<rect x="374" y="48" width="160" height="48" rx="8" fill="#f5d0fe" stroke="#c026d3"/><text x="454" y="77" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">R + B = M (وردي)</text>
				<rect x="90" y="110" width="380" height="40" rx="8" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>
				<text x="280" y="135" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">R + V + B = ضوء أبيض  |  المتكاملة: J+B = C+R = M+V = أبيض</text>`
			),
			visualCaptionAr: 'قواعد التركيب الجمعي للألوان الأساسية RVB والثانوية CMJ',
			examples: [
				{
					problemAr:
						'نسلط في غرفة مظلمة ضوءين: أزرق ($B$) وأصفر ($J$) على نفس الموضع من شاشة بيضاء. ما اللون الظاهر على الشاشة؟',
					solutionAr:
						'الضوء الأصفر مكوّن جمعياً من $R + V$. عند إضافة الأزرق $B$ يصبح المجموع $R + V + B$، فتظهر بقعة **بيضاء** (فالأصفر والأزرق لونان متكاملان).'
				},
				{
					problemAr:
						'ما الألوان الأساسية التي تُضاء في بيكسل شاشة هاتف ذكي ليظهر للمستخدم باللون **الوردي (Magenta)**؟',
					solutionAr: 'يُضاء المصباحان الدقيقان **الأحمر ($R$)** و**الأزرق ($B$)** معاً، مع إطفاء الأخضر ($V$).'
				}
			],
			watchOutAr:
				'احذر الخلط بين مزج **الأضواء** (التركيب الجمعي) ومزج **الطلاء/الأصباغ**! في الرسم بالطلاء يعطي الأحمر+الأخضر لوناً داكناً، أما في تسليط الأضواء على شاشة بيضاء فإن الأحمر + الأخضر يعطي **الأصفر**!'
		},
		practice: [
			{
				questionAr:
					'عند تقاطع حزمة ضوء **أخضر ($V$)** مع حزمة ضوء **أزرق ($B$)** على شاشة بيضاء في قاعة مظلمة، ما اللون الناتج؟',
				options: ['الأصفر ($J$)', 'السماوي ($C$)', 'الوردي ($M$)', 'الأسود'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الأصفر ($J$) ينتج من الأحمر + الأخضر ($R + V$).',
					'ممتاز! $V + B = C$ (السماوي Cyan).',
					'الوردي ($M$) ينتج من الأحمر + الأزرق ($R + B$).',
					'التركيب الجمعي للأضواء يضيف إضاءة ولا يعطي أسود.'
				],
				explanationAr:
					'حسب نموذج التركيب الجمعي: أخضر ($V$) + أزرق ($B$) = سماوي ($C$).'
			},
			{
				questionAr:
					'عند مرور الضوء الأبيض عبر موشور زجاجي، أي لون من ألوان الطيف يعاني **أكبر انحراف** وأيّها يعاني **أقل انحراف**؟',
				options: [
					'الأحمر أكثر انحرافاً والبنفسجي أقل انحرافاً',
					'البنفسجي أكثر انحرافاً والأحمر أقل انحرافاً',
					'الأخضر أكثر انحرافاً والأصفر أقل انحرافاً',
					'تنحرف جميع الألوان بنفس الزاوية'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'عكست الترتيب: الأحمر هو الأقل انحرافاً.',
					'صحيح! يترتب الطيف من الأقل انحرافاً (الأحمر) نحو الأكثر انحرافاً (البنفسجي).',
					'الأصفر والأخضر يتوسطان الطيف.',
					'الموشور يفصل الألوان تحديداً لأن زوايا انحرافها مختلفة.'
				],
				explanationAr:
					'في الموشور الزجاجي، ينحرف الضوء البنفسجي بأكبر زاوية بينما ينحرف الضوء الأحمر بأصغر زاوية.'
			},
			{
				questionAr:
					'أيّ ثنائية من الأضواء التالية تعطي **الضوء الأبيض** عند جمعهما على شاشة بيضاء؟',
				options: [
					'الأحمر ($R$) والأصفر ($J$)',
					'السماوي ($C$) والأحمر ($R$)',
					'الأخضر ($V$) والسماوي ($C$)',
					'الأزرق ($B$) والوردي ($M$)'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'$R + J = R + (R+V)$ ينقصه الأزرق $B$ ليكتمل الأبيض.',
					'أحسنت! السماوي $C = V + B$، وعند جمعه مع الأحمر $R$ نحصل على $R + V + B$ أي الضوء الأبيض.',
					'$V + C = V + (V+B)$ ينقصه الأحمر $R$.',
					'$B + M = B + (R+B)$ ينقصه الأخضر $V$.'
				],
				explanationAr:
					'يتكون الأبيض من $R + V + B$. وبما أن $C = V + B$، فإن $C + R = V + B + R = \\text{أبيض}$.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 14. نموذج التركيب الطرحي ورؤية الأجسام بالألوان
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'phy_lesson_3am_t3_subtractive_mixing_color_vision',
		slug: 'phy-3am-t3-subtractive-mixing-color-vision',
		grade: '3am',
		yearSubjectId: 638,
		trimesterId: 't3',
		sequenceId: 'seq6',
		sequenceTitleAr: 'المقطع السادس: الظواهر الضوئية (طيف الضوء الأبيض ونموذجا التركيب الجمعي والطرحي)',
		order: 14,
		titleAr: 'نموذج التركيب الطرحي وترشيح الألوان ورؤية جسم بلون الضوء النافذ إلى العين',
		objectives: [
			'تفسير دور المرشحات اللونية في امتصاص ونفوذ مركبات الضوء الأبيض باستعمال نموذج التركيب الطرحي',
			'التنبؤ باللون الذي يُرى به جسم عند إضاءته بالضوء الأبيض أو بأضواء ملونة (الضوء الساقط، الضوء الممتص، الضوء النافذ إلى العين)'
		],
		keywordsAr: [
			'التركيب الطرحي',
			'المرشح اللوني',
			'الضوء الساقط',
			'الضوء الممتص',
			'الضوء النافذ للعين',
			'رؤية الأجسام بالألوان'
		],
		discover: {
			scenarioAr:
				'أثناء حفل مدرسي لإحياء يوم العلم، أُضيئت قاعة العرض بكشاف ضوئي **أزرق ($B$)** فقط، فنظر التلاميذ إلى العلم الوطني الجزائري (أخضر، أبيض، أحمر) فلاحظوا أن القسم الأبيض صار أزرق، بينما بدا القسمان الأخضر والأحمر **أسودين**! كيف نفسّر هذا التغير العجيب باستعمال نموذج التركيب الطرحي، وكيف تعمل المرشحات اللونية؟',
			svg: wrapSvg(
				560,
				210,
				`<rect x="10" y="10" width="540" height="190" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="32" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#0f172a">ترشيح الضوء الأبيض ورؤية الأجسام في التركيب الطرحي</text>
				<g transform="translate(22,46)">
					<rect x="0" y="0" width="250" height="142" rx="9" fill="#1e293b"/>
					<text x="125" y="18" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#f8fafc">عمل المرشح اللوني الأصفر (J = R + V)</text>
					<line x1="16" y1="62" x2="96" y2="62" stroke="#ef4444" stroke-width="2.5"/>
					<line x1="16" y1="74" x2="96" y2="74" stroke="#22c55e" stroke-width="2.5"/>
					<line x1="16" y1="86" x2="96" y2="86" stroke="#3b82f6" stroke-width="2.5"/>
					<text x="54" y="48" text-anchor="middle" font-size="10.5" fill="#ffffff">ضوء أبيض (R+V+B)</text>
					<rect x="98" y="38" width="16" height="72" rx="3" fill="#facc15" stroke="#ca8a04"/>
					<line x1="116" y1="62" x2="225" y2="62" stroke="#ef4444" stroke-width="2.5"/>
					<line x1="116" y1="74" x2="225" y2="74" stroke="#22c55e" stroke-width="2.5"/>
					<text x="175" y="104" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#fde047">يمتص B ويمرّر R+V = J</text>
				</g>
				<g transform="translate(288,46)">
					<rect x="0" y="0" width="250" height="142" rx="9" fill="#ffffff" stroke="#94a3b8" stroke-width="1.3"/>
					<text x="125" y="20" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">إضاءة العلم الوطني بضوء أزرق (B)</text>
					<rect x="28" y="34" width="64" height="58" fill="#0f172a"/><text x="60" y="67" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#ffffff">أخضر→أسود</text>
					<rect x="92" y="34" width="66" height="58" fill="#2563eb"/><text x="125" y="67" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#ffffff">أبيض→أزرق</text>
					<rect x="158" y="34" width="64" height="58" fill="#0f172a"/><text x="190" y="67" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#ffffff">أحمر→أسود</text>
					<text x="125" y="114" text-anchor="middle" font-size="10.5" fill="#334155">الصبغة الحمراء والخضراء تمتص الأزرق B</text>
					<text x="125" y="131" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1d4ed8">الأبيض ينثر جميع الأضواء التي تسقط عليه!</text>
				</g>`
			),
			steps: [
				{
					promptAr:
						'ماذا يفعل مرشح لوني **أحمر ($R$)** عند سقوط الضوء الأبيض ($R + V + B$) عليه؟',
					hintAr: 'المرشح يسمح بمرور لونه فقط ويمتص البقية.',
					expectedInput: 'يمرر الأحمر ويمتص الأخضر والأزرق',
					revealAr:
						'المرشح الأحمر **يمتص** اللونين الأخضر ($V$) والأزرق ($B$) و**يمرّر** اللون الأحمر ($R$) فقط.'
				},
				{
					promptAr:
						'وماذا يفعل مرشح لوني ثانوي **سماوي ($C = V + B$)** عند سقوط الضوء الأبيض عليه؟',
					hintAr: 'يتكون السماوي من $V + B$، فما اللون الذي ينقصه ويمتصه؟',
					expectedInput: 'يمتص الأحمر ويمرر الأخضر والأزرق',
					revealAr:
						'المرشح السماوي **يمتص** اللون المكمل له وهو الأحمر ($R$) و**يمرّر** المركبتين الأخضر ($V$) والأزرق ($B$).'
				},
				{
					promptAr:
						'لماذا بدا الجزء الأحمر من العلم الوطني **أسوداً** عند إضاءته بالضوء الأزرق ($B$) فقط؟',
					hintAr: 'الجسم الأحمر يمتص كل الأضواء ما عدا الأحمر.',
					expectedInput: 'لأنه امتص الضوء الأزرق ولم ينثر أي ضوء للعين',
					revealAr:
						'الجسم الأحمر ينثر الأحمر فقط ويمتص الأخضر والأزرق؛ وبما أنه أُضيء بالأزرق فقط فقد **امتصه كله** ولم يصل للعين أي ضوء، فنراه **أسود**!'
				}
			]
		},
		summary: {
			rulesAr: [
				'**المرشح اللوني (التركيب الطرحي)**: هو صفيحة شفافة ملونة **تمتص** جزءاً من أضواء الطيف وتسمح **بنفوذ** المركبات الموافقة للونها فقط:\n- مرشح أساسي ($R$ أو $V$ أو $B$): يمرّر لونه فقط ويمتص اللونين الآخرين.\n- مرشح ثانوي: الأصفر $J$ يمرّر $(R+V)$ ويمتص $B$؛ السماوي $C$ يمرّر $(V+B)$ ويمتص $R$؛ الوردي $M$ يمرّر $(R+B)$ ويمتص $V$.',
				'**رؤية جسم بلون الضوء النافذ إلى العين**:\n- تُرى العينُ الجسمَ بلون الضوء الذي **ينثره** الجسم نحوها.\n- **الجسم الأبيض**: ينثر جميع الأضواء الساقطة عليه (فيظهر أبيض في الضوء الأبيض، وأحمر في الضوء الأحمر...).\n- **الجسم الأسود**: يمتص جميع الأضواء الساقطة عليه ولا ينثر شيئاً.\n- **الجسم الملون (مثل طماطم حمراء $R$)**: ينثر مركبته الخاصة فقط إذا كانت موجودة في الضوء الساقط؛ أما إذا أُضيئت الطماطم بضوء أخضر $V$ أو أزرق $B$ فتمتصه وتُرى **سوداء**!'
			],
			visualSvg: wrapSvg(
				560,
				185,
				`<rect x="10" y="10" width="540" height="165" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="34" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#0f172a">قاعدة ترشيح الألوان المتتالية ورؤية الأجسام</text>
				<rect x="26" y="48" width="246" height="110" rx="9" fill="#eff6ff" stroke="#2563eb" stroke-width="1.3"/>
				<text x="149" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#1d4ed8">مثال تتابع مرشحين في طريق الضوء الأبيض</text>
				<text x="149" y="94" text-anchor="middle" font-size="11.5" fill="#0f172a">أبيض (R+V+B) ← مرشح أصفر J (يمرر R+V)</text>
				<text x="149" y="116" text-anchor="middle" font-size="11.5" fill="#0f172a">← مرشح سماوي C (يمتص R ويمرر V+B)</text>
				<text x="149" y="140" text-anchor="middle" font-size="12" font-weight="bold" fill="#15803d">الضوء النافذ النهائي = الأخضر (V) فقط!</text>
				<rect x="288" y="48" width="246" height="110" rx="9" fill="#fef2f2" stroke="#dc2626" stroke-width="1.3"/>
				<text x="411" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#b91c1c">قاعدة رؤية جسم لونه (X) تحت ضوء (Y)</text>
				<text x="411" y="96" text-anchor="middle" font-size="11.5" fill="#0f172a">اللون المرئي = المركبة المشتركة بين X و Y</text>
				<text x="411" y="118" text-anchor="middle" font-size="11.5" fill="#0f172a">إن وجدت ⇐ يُرى الجسم بلونها</text>
				<text x="411" y="140" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">إن لم توجد ⇐ يمتص الضوء ويُرى أسود!</text>`
			),
			visualCaptionAr: 'آلية التركيب الطرحي عبر المرشحات المتتالية وقاعدة تقاطع مركبات الضوء مع لون الجسم',
			examples: [
				{
					problemAr:
						'نسلط ضوءاً **أصفر ($J = R + V$)** على كراس لونه **سماوي ($C = V + B$)** في الضوء الأبيض. بأي لون نرى الكراس؟',
					solutionAr:
						'الضوء الساقط يحمل المركبتين $(R + V)$. الكراس السماوي يستطيع أن ينثر $(V + B)$ ويمتص $R$. المركبة المشتركة التي ينثرها للعين هي **الأخضر ($V$)** فقط، إذن يُرى الكراس **أخضر**.'
				},
				{
					problemAr:
						'نضع مرشحاً أحمر ($R$) وخلفه مرشحاً أخضر ($V$) أمام مصباح أبيض. ماذا نرى على الشاشة خلف المرشح الثاني؟',
					solutionAr:
						'يمرر المرشح الأحمر الضوء الأحمر ($R$) فقط. عندما يصل $R$ إلى المرشح الأخضر يقوم الأخير بامتصاصه كلياً، فلا ينفذ أي ضوء وتظهر الشاشة **سوداء (مظلمة)**.'
				}
			],
			watchOutAr:
				'احذر أن تظن أن الجسم الأحمر يخلق ضوءاً أحمر! بل هو يمتص المركبات الأخرى وينثر الأحمر فقط؛ فإن لم يحتوِ الضوء الساقط أصلاً على اللون الأحمر (مثل الضوء الأزرق أو الأخضر أو السماوي $C$) يبدو الجسم الأحمر **أسود**!'
		},
		practice: [
			{
				questionAr:
					'أُضيئت ورقة نبات خضراء ($V$) في حجرة مظلمة بضوء **أصفر ($J = R + V$)**. بأي لون تبدو الورقة للعين؟',
				options: ['أصفر', 'أخضر', 'أحمر', 'أسود'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الورقة الخضراء تمتص المركبة الحمراء من الضوء الأصفر ولا تعيد إلا الأخضر.',
					'ممتاز! الضوء الأصفر يحتوي على $R + V$؛ تمتص الورقة $R$ وتنثر $V$ فتُرى خضراء.',
					'الورقة الخضراء تمتص الأحمر ولا تنثره.',
					'الضوء الأصفر يحتوي على الأخضر $V$ فلا تبدو سوداء.'
				],
				explanationAr:
					'الضوء الأصفر ($R+V$) يحمل المركبة الخضراء $V$؛ تنثرها الورقة الخضراء نحو العين فتُرى **خضراء**.'
			},
			{
				questionAr:
					'إذا مرّ ضوء أبيض عبر مرشح **وردي ($M = R + B$)** ثم عبر مرشح **أزرق ($B$)**، ما لون الضوء النافذ نحو العين؟',
				options: ['وردي', 'أحمر', 'أزرق', 'أسود'],
				correctIndex: 2,
				diagnosticFeedback: [
					'المرشح الأزرق الثاني يمتص المركبة الحمراء من الوردي.',
					'الأحمر يُمتص في المرشح الأزرق.',
					'أحسنت! يمرّر المرشح الوردي $(R+B)$، ثم يمتص المرشح الأزرق $R$ ويمرّر **الأزرق ($B$)** فقط.',
					'المركبة الزرقاء مشتركة بين المرشحين فتنفذ ولا تنعدم.'
				],
				explanationAr:
					'المرشح الوردي يمرر $(R+B)$، والمرشح الأزرق يمرر $B$ فقط ويمتص $R$، فتكون النتيجة ضوءاً أزرق.'
			},
			{
				questionAr:
					'ننظر إلى حبة موز **صفراء ($J = R + V$)** مضاءة بضوء **أحمر ($R$)** فقط. بأي لون نراها؟',
				options: ['صفراء', 'خضراء', 'حمراء', 'سوداء'],
				correctIndex: 2,
				diagnosticFeedback: [
					'رؤيتها صفراء يتطلب سقوط الأحمر والأخضر معاً، وهنا سقط الأحمر فقط.',
					'لا يوجد ضوء أخضر ساقط أصلاً!',
					'صحيح! الموزة الصفراء تنثر $R$ و $V$، وبما أن الضوء الساقط هو $R$ فقط فإنها تنثره فتُرى **حمراء**.',
					'تبدو سوداء فقط لو أُضيئت بضوء أزرق ($B$).'
				],
				explanationAr:
					'الجسم الأصفر ($R+V$) ينثر ما يسقط عليه من $R$ أو $V$؛ تحت إضاءة حمراء ($R$) ينثر الأحمر فيُرى أحمر.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 15. إدماج تعلمات الفصل الثالث
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'phy_lesson_3am_t3_integration',
		slug: 'phy-3am-t3-integration',
		grade: '3am',
		yearSubjectId: 638,
		trimesterId: 't3',
		sequenceId: 'seq6',
		sequenceTitleAr: 'المقطع السادس: الظواهر الضوئية (طيف الضوء الأبيض ونموذجا التركيب الجمعي والطرحي)',
		order: 15,
		titleAr: 'إدماج تعلمات الفصل الثالث: الدارات الكهربائية والألوان',
		objectives: [
			'تجنيد قانون أوم واستطاعة التحويل الكهربائي ونموذجي التركيب الجمعي والطرحي للألوان في حل وضعيات إدماجية مركبة'
		],
		keywordsAr: ['وضعية إدماجية', 'قانون أوم', 'التركيب الجمعي والطرحي'],
		discover: {
			scenarioAr:
				'في احتفال نهاية السنة الدراسية، أشرف تلاميذ 3AM على تجهيز إضاءة المسرح المدرسي: استخدموا ثلاثة كشافات ضوئية ($R$ و $V$ و $B$) مربوطة على التفرع بمولد $e = 12\\text{ V}$، وأرادوا خفض شدة التيار في كشاف LED لحمايته باستعمال ناقل أومي $R_p$، ثم تسليط أضواء ملونة على ديكور القاعة! كيف نوفّق بين الحسابات الكهربائية وقواعد التركيب الجمعي والطرحي للألوان؟',
			svg: wrapSvg(
				560,
				185,
				`<rect x="10" y="10" width="540" height="165" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="34" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#0f172a">إدماج الفصل الثالث: الدارة الكهربائية لإضاءة المسرح والألوان</text>
				<rect x="24" y="50" width="244" height="110" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.3"/>
				<text x="146" y="72" text-anchor="middle" font-size="12" font-weight="bold" fill="#1d4ed8">الظواهر الكهربائية</text>
				<text x="146" y="94" text-anchor="middle" font-size="11" fill="#0f172a">قانون أوم: U = R × I</text>
				<text x="146" y="114" text-anchor="middle" font-size="11" fill="#0f172a">المقاومة الكلية و e: I = e / R_t</text>
				<text x="146" y="134" text-anchor="middle" font-size="11" fill="#0f172a">الاستطاعة والطاقة: P = U·I و E = P·t</text>
				<rect x="292" y="50" width="244" height="110" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.3"/>
				<text x="414" y="72" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">الظواهر الضوئية</text>
				<text x="414" y="94" text-anchor="middle" font-size="11" fill="#0f172a">التركيب الجمعي للكشافات (RVB → CMJ)</text>
				<text x="414" y="114" text-anchor="middle" font-size="11" fill="#0f172a">التركيب الطرحي للمرشحات اللونية</text>
				<text x="414" y="134" text-anchor="middle" font-size="11" fill="#0f172a">اللون المرئي للأزياء والديكور</text>`
			),
			steps: [
				{
					promptAr:
						'إذا احتاج كشاف المسرح الأحمر ($R$) إلى حماية بمقاومة يمر فيها تيار $I = 0.4\\text{ A}$ ويكون التوتر بين طرفيها $U = 8\\text{ V}$، فما قيمة المقاومة $R_p$ اللازمة؟',
					hintAr: 'طبّق قانون أوم: $R = U / I$.',
					expectedInput: '20',
					revealAr: '$R_p = \\frac{U}{I} = \\frac{8}{0.4} = 20\\,\\Omega$.'
				},
				{
					promptAr:
						'شغّل التلاميذ الكشافين **الأحمر ($R$)** و**الأخضر ($V$)** معاً على المسرح، وسلّطوا الضوء الناتج على بدلة ممثل **زرقاء ($B$)**. بأي لون تبدو البدلة للجمهور؟',
					hintAr: 'احسب أولاً لون الضوء الناتج عن $R + V$، ثم ابحث عن تقاطعه مع $B$.',
					expectedInput: 'سوداء',
					revealAr:
						'الضوء الساقط هو الأصفر ($R + V$). البدلة الزرقاء ($B$) تمتص الأحمر والأخضر معاً ولا تجد ضوءاً أزرق لتنثره، فتبدو **سوداء**!'
				}
			]
		},
		summary: {
			rulesAr: [
				'**منهجية دمج الكهرباء والضوء في 3AM**:\n- في جزء **الكهرباء**: نميّز نوع الربط (تسلسل أو تفرع)، نحسب المقاومة بـ $R = \\frac{U}{I}$ (أو بشفرة الألوان)، نستعمل $I = \\frac{e}{R_t}$، ثم نحسب الاستطاعة $P = U \\cdot I$ والطاقة $E = P \\cdot t$.\n- في جزء **الضوء**: نطبّق أولاً **التركيب الجمعي** لتحديد لون الإضاءة الناتجة عن الكشافات، ثم **التركيب الطرحي** لتحديد الضوء النافذ عبر المرشحات أو المنثور من الأجسام نحو العين.'
			],
			visualSvg: wrapSvg(
				560,
				155,
				`<rect x="10" y="10" width="540" height="135" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="34" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">سلسلة التحليل في مسرح الإضاءة الملونة</text>
				<rect x="24" y="54" width="150" height="72" rx="8" fill="#dbeafe" stroke="#2563eb"/><text x="99" y="82" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">1. تغذية الكشافات</text><text x="99" y="104" text-anchor="middle" font-size="10.5" fill="#0f172a">U = R·I  |  P = U·I</text>
				<text x="190" y="94" font-size="18" font-weight="bold" fill="#475569">←</text>
				<rect x="206" y="54" width="150" height="72" rx="8" fill="#dcfce7" stroke="#16a34a"/><text x="281" y="82" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#166534">2. جمع الأضواء</text><text x="281" y="104" text-anchor="middle" font-size="10.5" fill="#0f172a">RVB ⇐ ضوء ساقط</text>
				<text x="372" y="94" font-size="18" font-weight="bold" fill="#475569">←</text>
				<rect x="388" y="54" width="148" height="72" rx="8" fill="#fee2e2" stroke="#dc2626"/><text x="462" y="82" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#b91c1c">3. ترشيح ورؤية</text><text x="462" y="104" text-anchor="middle" font-size="10.5" fill="#0f172a">طرح الممتص ⇐ اللون المرئي</text>`
			),
			visualCaptionAr: 'التكامل بين حسابات الدارة الكهربائية وقوانين التركيب الجمعي والطرحي للألوان',
			examples: [
				{
					problemAr:
						'تشتغل ثلاثة كشافات ($R, V, B$) على التفرع تحت توتر $U = 12\\text{ V}$ وتمر في كل منها شدة $I_0 = 0.5\\text{ A}$. احسب الاستطاعة الكلية والطاقة المستهلكة بالواط ساعي خلال $2\\text{ h}$.',
					solutionAr:
						'الشدة الكلية في التفرع: $I = 3 \\times 0.5 = 1.5\\text{ A}$.\nالاستطاعة الكلية: $P = U \\times I = 12 \\times 1.5 = 18\\text{ W}$ (أو $3 \\times (12 \\times 0.5) = 18\\text{ W}$).\nالطاقة: $E = P \\times t = 18 \\times 2 = 36\\text{ Wh}$.'
				},
				{
					problemAr:
						'أُضيئت ستارة مسرح بيضاء بكشافين: أحمر ($R$) وأزرق ($B$) معاً، ووضع أمام أعين المشاهدين مرشح أصفر ($J$). بأي لون يرى المشاهدون الستارة؟',
					solutionAr:
						'الستارة البيضاء تنثر الضوء الوردي ($M = R + B$). عند مروره عبر المرشح الأصفر ($J = R + V$) يمتص المرشح الأزرق $B$ ويمرر الأحمر $R$ فقط، فيرى المشاهدون الستارة **حمراء**.'
				}
			],
			watchOutAr:
				'في الوضعية الإدماجية، افحص جيداً هل الكشافات مشغلة على التسلسل أم على التفرع قبل حساب $P$ و $I$، ولا تخلط بين التركيب الجمعي (عند جمع كشافين معاً) والتركيب الطرحي (عند مرور الضوء عبر مرشح أو سقوطه على جسم ملون).'
		},
		practice: [
			{
				questionAr:
					'يُغذّى ناقل أومي مقاومته $R = 30\\,\\Omega$ بتوتر $U = 9\\text{ V}$. ما شدة التيار $I$ المارة فيه، وما استطاعة التحويل الكهربائي $P$؟',
				options: [
					'$I = 0.3\\text{ A}$ و $P = 2.7\\text{ W}$',
					'$I = 3.33\\text{ A}$ و $P = 30\\text{ W}$',
					'$I = 0.3\\text{ A}$ و $P = 30\\text{ W}$',
					'$I = 270\\text{ A}$ و $P = 2430\\text{ W}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! $I = \\frac{9}{30} = 0.3\\text{ A}$، ثم $P = U \\times I = 9 \\times 0.3 = 2.7\\text{ W}$.',
					'قسمت المقاومة على التوتر ($R/U$) بدلاً من $U/R$.',
					'حسبت $I$ صحيحاً لكن $P = U \\times I = 9 \\times 0.3 = 2.7\\text{ W}$ وليس $30\\text{ W}$.',
					'قانون أوم هو $I = U / R$ وليس $U \\times R$.'
				],
				explanationAr:
					'من قانون أوم: $I = \\frac{U}{R} = \\frac{9}{30} = 0.3\\text{ A}$. ومن علاقة الاستطاعة: $P = U \\times I = 9 \\times 0.3 = 2.7\\text{ W}$.'
			},
			{
				questionAr:
					'أُضيئت قاعة بكشافين **أخضر ($V$)** و**أزرق ($B$)** معاً. سقط هذا الضوء على وردة **حمراء ($R$)**. بأي لون تظهر الوردة؟',
				options: ['سماوية', 'صفراء', 'سوداء', 'حمراء'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الضوء الساقط نفسه سماوي ($V+B$)، لكن الوردة الحمراء تمتصه!',
					'لا يوجد أحمر في الضوء الساقط.',
					'ممتاز! الضوء الناتج هو السماوي $(V+B)$ الخالي من الأحمر؛ تمتص الوردة الحمراء كلتي المركبتين فتبدو **سوداء**.',
					'تبدو حمراء فقط إذا احتوى الضوء الساقط على المركبة الحمراء $R$.'
				],
				explanationAr:
					'الكشافان $V$ و $B$ ينتجان ضوءاً سماوياً ($V+B$). تمتصه الوردة الحمراء كلياً لعدم وجود الأحمر فيه فتظهر سوداء.'
			},
			{
				questionAr:
					'في تركيبة ضوئية، مرّ الضوء الأبيض عبر مرشح **أصفر ($J$)** ثم أُضيء به قميص **أبيض**. بأي لون يرى المراقب القميص؟',
				options: ['أبيض', 'أصفر', 'أسود', 'أخضر'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الضوء بعد المرشح لم يعد أبيض بل صار أصفر ($R+V$).',
					'صحيح! يمرّر المرشح الأصفر $(R+V)$، والقميص الأبيض ينثر كل ما يسقط عليه أي $(R+V)$ فيُرى **أصفر**.',
					'القميص الأبيض لا يمتص الأضواء بل ينثرها.',
					'المرشح الأصفر يمرّر الأحمر والأخضر معاً وليس الأخضر وحده.'
				],
				explanationAr:
					'ينفذ من المرشح الأصفر ضوء أصفر ($R+V$)، وبما أن القميص الأبيض ينثر جميع المركبات الساقطة عليه، يظهر باللون الأصفر.'
			}
		]
	}
];
