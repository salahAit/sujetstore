import type { PhysicsInteractiveLessonData } from '../../types';
import { chemEquation, chemSpecies } from '../../chem-helpers';

function wrapSvg(width: number, height: number, body: string): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="background:#ffffff;font-family:'Arabic Transparent',Arial,sans-serif">${body}</svg>`;
}

// Chemical species & equations (KaTeX for interactive lessons)
const spCH4 = chemSpecies('CH4', 'g').katex;
const spC4H10 = chemSpecies('C4H10', 'g').katex;
const spC3H8 = chemSpecies('C3H8', 'g').katex;
const spO2 = chemSpecies('O2', 'g').katex;
const spCO2 = chemSpecies('CO2', 'g').katex;
const spCO = chemSpecies('CO', 'g').katex;
const spH2O_l = chemSpecies('H2O', 'l').katex;
const spH2O_g = chemSpecies('H2O', 'g').katex;
const spH2 = chemSpecies('H2', 'g').katex;
const spC = chemSpecies('C', 's').katex;
const spFe = chemSpecies('Fe', 's').katex;
const spS = chemSpecies('S', 's').katex;
const spFeS = chemSpecies('FeS', 's').katex;

const eqElectrolysis = chemEquation(
	[{ coeff: 2, formula: 'H2O', state: 'l' }],
	[
		{ coeff: 2, formula: 'H2', state: 'g' },
		{ coeff: 1, formula: 'O2', state: 'g' }
	]
).katex;

const eqFeS = chemEquation(
	[
		{ coeff: 1, formula: 'Fe', state: 's' },
		{ coeff: 1, formula: 'S', state: 's' }
	],
	[{ coeff: 1, formula: 'FeS', state: 's' }]
).katex;

const eqCH4Complete = chemEquation(
	[
		{ coeff: 1, formula: 'CH4', state: 'g' },
		{ coeff: 2, formula: 'O2', state: 'g' }
	],
	[
		{ coeff: 1, formula: 'CO2', state: 'g' },
		{ coeff: 2, formula: 'H2O', state: 'l' }
	]
).katex;

const eqCH4Incomplete = chemEquation(
	[
		{ coeff: 2, formula: 'CH4', state: 'g' },
		{ coeff: 3, formula: 'O2', state: 'g' }
	],
	[
		{ coeff: 2, formula: 'CO', state: 'g' },
		{ coeff: 4, formula: 'H2O', state: 'l' }
	]
).katex;

const eqC3H8Complete = chemEquation(
	[
		{ coeff: 1, formula: 'C3H8', state: 'g' },
		{ coeff: 5, formula: 'O2', state: 'g' }
	],
	[
		{ coeff: 3, formula: 'CO2', state: 'g' },
		{ coeff: 4, formula: 'H2O', state: 'l' }
	]
).katex;

const eqC4H10Complete = chemEquation(
	[
		{ coeff: 2, formula: 'C4H10', state: 'g' },
		{ coeff: 13, formula: 'O2', state: 'g' }
	],
	[
		{ coeff: 8, formula: 'CO2', state: 'g' },
		{ coeff: 10, formula: 'H2O', state: 'l' }
	]
).katex;

const eqC4H10Unbalanced = chemEquation(
	[
		{ coeff: 1, formula: 'C4H10', state: 'g' },
		{ coeff: 1, formula: 'O2', state: 'g' }
	],
	[
		{ coeff: 1, formula: 'CO2', state: 'g' },
		{ coeff: 1, formula: 'H2O', state: 'l' }
	]
).katex;

const eqFeO2 = chemEquation(
	[
		{ coeff: 3, formula: 'Fe', state: 's' },
		{ coeff: 2, formula: 'O2', state: 'g' }
	],
	[{ coeff: 1, formula: 'Fe3O4', state: 's' }]
).katex;

export const PHYSICS_LESSONS_3AM_T1: PhysicsInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// 1. التفاعل الكيميائي كنموذج للتحول الكيميائي
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'phy_lesson_3am_t1_chemical_reaction_model',
		slug: 'phy-3am-t1-chemical-reaction-model',
		grade: '3am',
		yearSubjectId: 638,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: التفاعل الكيميائي، معادلة التفاعل، والعوامل المؤثرة',
		order: 1,
		titleAr:
			'التفاعل الكيميائي كنموذج للتحول الكيميائي (الفرد والنوع والجملة الكيميائية، الاحتراق التام وغير التام)',
		objectives: [
			'التمييز بين الفرد الكيميائي (حبيبة مجهرية: ذرة أو جزيء) والنوع الكيميائي (مجموعة أفراد متماثلة على المستوى العياني) والجملة الكيميائية',
			'نمذجة تحول كيميائي بتفاعل كيميائي وتحديد المتفاعلات والنواتج في تحولات مألوفة (التحليل الكهربائي للماء، احتراق الكربون والحديد والفحوم الهيدروجينية)',
			'التمييز بين الاحتراق التام (لهب أزرق، نواتجه CO₂ و H₂O) والاحتراق غير التام (لهب أصفر، نواتج خطيرة مثل CO والهباب C) وكيفية الكشف عن النواتج'
		],
		keywordsAr: [
			'الفرد الكيميائي',
			'النوع الكيميائي',
			'الجملة الكيميائية',
			'التفاعل الكيميائي',
			'المتفاعلات والنواتج',
			'الاحتراق التام وغير التام'
		],
		discover: {
			scenarioAr: `في فصل الشتاء، لاحظت عائلة جزائرية أن لهب موقد الطبخ المغذى بغاز المدينة (الميثان ${spCH4}) قد تحوّل من اللون الأزرق إلى اللون الأصفر البرتقالي، مع ظهور طبقة سوداء أسفل القدر وتكوّن قطرات ماء على الزجاج البارد. ما الفرق بين هذا الاحتراق والاحتراق العادي؟ وكيف ننمذج هذا التحول الكيميائي علمياً؟`,
			svg: wrapSvg(
				560,
				210,
				`<rect x="10" y="10" width="540" height="190" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="34" text-anchor="middle" font-size="14" font-weight="bold" fill="#0f172a">مقارنة احتراق غاز الميثان في موقد المطبخ</text>
				<rect x="28" y="50" width="242" height="134" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
				<text x="149" y="72" text-anchor="middle" font-size="13" font-weight="bold" fill="#1d4ed8">احتراق تام (وفرة O₂)</text>
				<path d="M149,84 Q165,112 149,126 Q133,112 149,84 Z" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1.4"/>
				<rect x="137" y="126" width="24" height="10" rx="2" fill="#475569"/>
				<text x="149" y="154" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">لهب أزرق منتظم</text>
				<text x="149" y="173" text-anchor="middle" font-size="11" fill="#1e40af">النواتج: CO₂ + H₂O</text>
				<rect x="290" y="50" width="242" height="134" rx="10" fill="#fef2f2" stroke="#dc2626" stroke-width="1.5"/>
				<text x="411" y="72" text-anchor="middle" font-size="13" font-weight="bold" fill="#b91c1c">احتراق غير تام (نقص O₂)</text>
				<path d="M411,80 Q432,112 411,126 Q390,112 411,80 Z" fill="#f59e0b" stroke="#d97706" stroke-width="1.4"/>
				<rect x="399" y="126" width="24" height="10" rx="2" fill="#475569"/>
				<text x="411" y="154" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#7f1d1d">لهب أصفر منير + دخان</text>
				<text x="411" y="173" text-anchor="middle" font-size="11" fill="#b91c1c">نواتج خطيرة: CO (سام) + C (هباب)</text>`
			),
			steps: [
				{
					promptAr:
						'على المستوى المجهري، يتكوّن غاز الميثان من حبيبة واحدة صيغتها $\\text{CH}_4$. هل نسمي هذه الحبيبة المنفردة «فرداً كيميائياً» أم «نوعاً كيميائياً»؟',
					hintAr: 'الحبيبة المجهرية الواحدة (ذرة أو جزيء) تسمى فرداً كيميائياً، أما المجموعة العيانية فتسمى نوعاً كيميائياً.',
					expectedInput: 'فرد كيميائي',
					revealAr:
						'نسمي جزيء $\\text{CH}_4$ الواحد **فرداً كيميائياً** (مستوى مجهري)، بينما غاز الميثان المحجوز في الأنبوب (مليارات الجزيئات المتماثلة) هو **نوع كيميائي** (مستوى عياني).'
				},
				{
					promptAr:
						'لماذا تحوّل لون اللهب إلى الأصفر وظهرت طبقة سوداء أسفل القدر؟ ما العامل الذي نقص في الموقد؟',
					hintAr: 'الاحتراق يتطلب مادة محرقة من الهواء هي غاز ثنائي الأكسجين.',
					expectedInput: 'نقص ثنائي الأكسجين',
					revealAr:
						'حدث ذلك بسبب **نقص غاز ثنائي الأكسجين** ($\\text{O}_2$) نتيجة انسداد فتحات التهوية في الموقد، فحدث **احتراق غير تام**.'
				},
				{
					promptAr: `ما الغاز السام والخطير جداً (عديم اللون والرائحة) الذي ينتج في الاحتراق غير التام ويسبّب الاختناق داخل المنازل؟`,
					hintAr: 'صيغته الكيميائية $\\text{CO}$.',
					expectedInput: 'أحادي أكسيد الكربون',
					revealAr: `ينتج غاز **أحادي أكسيد الكربون** (${spCO}) السام والقاتل إلى جانب هباب الفحم (${spC}) وبخار الماء وثنائي أكسيد الكربون.`
				}
			]
		},
		summary: {
			rulesAr: [
				'**الفرد الكيميائي والنوع الكيميائي والجملة الكيميائية**:\n- **الفرد الكيميائي**: كل حبيبة مجهرية مكونة للمادة (ذرة مثل $\\text{Fe}, \\text{C}$ أو جزيء مثل $\\text{H}_2\\text{O}, \\text{CH}_4$).\n- **النوع الكيميائي**: مجموعة من الأفراد الكيميائية المتماثلة نتعامل معها على المستوى العياني (مثل الماء، غاز ثنائي الأكسجين، برادة الحديد).\n- **الجملة الكيميائية**: خليط من نوع كيميائي أو أكثر يمكن أن يطرأ عليه تحول كيميائي (تتكوّن من **متفاعلات** في الحالة الابتدائية و**نواتج** في الحالة النهائية).',
				'**التفاعل الكيميائي**: هو نموذج مبسط يصف التحول الكيميائي على المستوى العياني، يُعبّر عنه بالتحول من المتفاعلات إلى النواتج.',
				'**الاحتراق التام مقابل الاحتراق غير التام للفحوم الهيدروجينية**:\n- **الاحتراق التام** (بوفرة ${spO2}$): لهب **أزرق** وحرارة عالية، وينتج عنه نوعان فقط هما **ثنائي أكسيد الكربون** (${spCO2}$) و**الماء** (${spH2O_l}).\n- **الاحتراق غير التام** (بنقص ${spO2}$): لهب **أصفر منير**، وينتج عنه إضافة إلى ${spCO2}$ و${spH2O_l}$ نواتج ضارة هي **هباب الفحم** (${spC}$) وغاز **أحادي أكسيد الكربون** السام (${spCO}).',
				'**طرق الكشف عن النواتج**:\n- غاز ${spCO2}$: يعكّر **رائق الكلس** (ماء الجير).\n- الماء ${spH2O_l}$: يظهر كقطرات على جدار بارد أو يلوّن **كبريتات النحاس اللامائية** البيضاء باللون **الأزرق**.\n- غاز ${spH2}$ (في التحليل الكهربائي للماء): يحدث **فرقعة خفيفة** عند تقريب عود ثقاب مشتعل.\n- غاز ${spO2}$: يزيد من **توهج** عود ثقاب على وشك الانطفاء.'
			],
			visualSvg: wrapSvg(
				560,
				220,
				`<rect x="10" y="10" width="540" height="200" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="34" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#1e3a8a">التحول من المستوى المجهري إلى التفاعل الكيميائي وكشف النواتج</text>
				<rect x="24" y="48" width="160" height="72" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="1.3"/>
				<text x="104" y="68" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">فرد كيميائي (مجهري)</text>
				<text x="104" y="88" text-anchor="middle" font-size="11" fill="#0f172a">ذرة واحدة أو جزيء واحد</text>
				<text x="104" y="106" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">CH₄ ، O₂ ، Fe</text>
				<rect x="200" y="48" width="160" height="72" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.3"/>
				<text x="280" y="68" text-anchor="middle" font-size="12" font-weight="bold" fill="#166534">نوع كيميائي (عياني)</text>
				<text x="280" y="88" text-anchor="middle" font-size="11" fill="#0f172a">مجموعة أفراد متماثلة</text>
				<text x="280" y="106" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">غاز الميثان، ماء مقطر</text>
				<rect x="376" y="48" width="160" height="72" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.3"/>
				<text x="456" y="68" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">جملة كيميائية</text>
				<text x="456" y="88" text-anchor="middle" font-size="11" fill="#0f172a">متفاعلات ← نواتج</text>
				<text x="456" y="106" text-anchor="middle" font-size="11" font-weight="bold" fill="#b45309">الميثان + الأكسجين</text>
				<rect x="24" y="134" width="512" height="62" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2"/>
				<text x="280" y="155" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">الكشف عن النواتج الغازية والسائلة</text>
				<text x="280" y="177" text-anchor="middle" font-size="11.5" fill="#334155">CO₂: يعكر رائق الكلس  |  H₂O: يزرق كبريتات النحاس  |  H₂: فرقعة باللهب  |  O₂: يزيد التوهج</text>`
			),
			visualCaptionAr: 'التمييز بين الفرد والنوع والجملة الكيميائية وطرق الكشف عن النواتج الشائعة',
			examples: [
				{
					problemAr: `عند تسخين خليط من مسحوق الحديد (${spFe}) ومسحوق الكبريت (${spS}) يتكوّن جسم صلب رمادي داكن غير منجذب للمغناطيس هو كبريت الحديد (${spFeS}). حدّد المتفاعلات والنواتج ونوع هذا التحول.`,
					solutionAr: `المتفاعلات في الحالة الابتدائية هي الحديد (${spFe}) والكبريت (${spS})، والناتج في الحالة النهائية هو كبريت الحديد (${spFeS}). بما أنه ظهرت مادة جديدة لا تجذبها المغناطيس، فهو تحول كيميائي يُنمذج بالتفاعل: ${eqFeS}.`
				},
				{
					problemAr: `نمرّر تياراً كهربائياً في وعاء تحليل مملوء بالماء المقطر المضاف إليه الصودا، فينطلق غازان: أحدهما يحدث فرقعة عند تقريب عود ثقاب مشتعل، والآخر يزيد من توهج عود ثقاب. سمّ الغازين واكتب نموذج التفاعل.`,
					solutionAr: `الغاز الذي يحدث فرقعة هو ثنائي الهيدروجين (${spH2})، والذي يزيد التوهج هو ثنائي الأكسجين (${spO2}). يُنمذج التحليل الكهربائي للماء بالتفاعل: ${eqElectrolysis}.`
				}
			],
			watchOutAr:
				'احذر الخلط بين الفرد الكيميائي والنوع الكيميائي! جزيء الماء الواحد فرد كيميائي، أما الماء في الكأس فنوع كيميائي. كما أن غاز أحادي أكسيد الكربون $\\text{CO}$ سام وقاتل رغم أنه عديم اللون والرائحة، لذا يجب ضمان تهوية المنازل وتنظيف مواقد الغاز دورياً.'
		},
		practice: [
			{
				questionAr:
					'أثناء عملية التحليل الكهربائي للماء في المخبر، نقرّب عود ثقاب مشتعل من فوهة الأنبوب المتصل بالقطب السالب (المهبط)، فنسمع فرقعة خفيفة. ما الغاز الذي تم الكشف عنه؟',
				options: [
					`غاز ثنائي الأكسجين (${spO2})`,
					`غاز ثنائي الهيدروجين (${spH2})`,
					`غاز ثنائي أكسيد الكربون (${spCO2})`,
					`غاز أحادي أكسيد الكربون (${spCO})`
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ثنائي الأكسجين يزيد من اشتعال وتوهج عود الثقاب دون أن يحدث فرقعة.',
					'أحسنت! غاز ثنائي الهيدروجين يشتعل محدثاً فرقعة خفيفة عند تقريب اللهب.',
					'ثنائي أكسيد الكربون يعكر رائق الكلس ولا يشتعل بل يطفئ اللهب.',
					'التحليل الكهربائي للماء ينتج فقط الهيدروجين والأكسجين، ولا يحتوي الماء على الكربون.'
				],
				explanationAr:
					'التحليل الكهربائي للماء يفكك جزيئات الماء إلى غازي ثنائي الهيدروجين (يُكشف عنه بالفرقعة) وثنائي الأكسجين (يزيد التوهج).'
			},
			{
				questionAr: `احتراق غاز البوتان (${spC4H10}) في قارورة غاز داخل مطبخ مغلق أعطى لهباً أصفر وطبقة سوداء أسفل الإناء. ما السبب وما الناتجان الخطيران الناتجان؟`,
				options: [
					`احتراق تام لوفرة الأكسجين، وينتج ${spCO2} و ${spH2O_l}`,
					`احتراق غير تام لنقص الأكسجين، وينتج ${spCO} و ${spC}`,
					`احتراق غير تام لوفرة الأكسجين، وينتج ${spH2} و ${spO2}`,
					`تحول فيزيائي فقط لتغيّر لون اللهب`
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الاحتراق التام يعطي لهباً أزرق دون دخان أو طبقة سوداء.',
					'ممتاز! اللهب الأصفر وهباب الفحم يدلان على نقص الأكسجين وحدوث احتراق غير تام يُنتج هباب الفحم وأحادي أكسيد الكربون السام.',
					'نقص الأكسجين هو سبب الاحتراق غير التام، وليس وفرته.',
					'الاحتراق تحول كيميائي تظهر فيه أنواع كيميائية جديدة.'
				],
				explanationAr:
					'عند نقص غاز ثنائي الأكسجين، يصبح احتراق الفحوم الهيدروجينية غير تام، فيظهر اللهب الأصفر وهباب الفحم ($\\text{C}$) ويتشكل غاز $\\text{CO}$ السام.'
			},
			{
				questionAr: 'أي العبارات التالية تميّز بدقة بين «الفرد الكيميائي» و«النوع الكيميائي»؟',
				options: [
					'الفرد الكيميائي نراه بالعين المجردة، والنوع الكيميائي لا يُرى إلا بالمجهر',
					'ذرة الحديد $\\text{Fe}$ فرد كيميائي، ومسمار الحديد يتكوّن من نوع كيميائي هو الحديد',
					'الجملة الكيميائية هي فرد واحد فقط من الماء',
					'كلاهما مصطلحان مترادفان لنفس المفهوم'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'العكس هو الصحيح: الفرد الكيميائي مجهري (ذرة أو جزيء)، والنوع الكيميائي عياني.',
					'صحيح! ذرة الحديد فرد كيميائي مجهري، أما الحديد العياني فهو نوع كيميائي.',
					'الجملة الكيميائية هي خليط عياني من نوع كيميائي أو أكثر.',
					'يختلف الفرد (مستوى مجهري) عن النوع (مستوى عياني).'
				],
				explanationAr:
					'الفرد الكيميائي هو الحبيبة المجهرية (ذرة أو جزيء)، بينما النوع الكيميائي هو تجمع عياني لأفراد كيميائية متماثلة.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 2. معادلة التفاعل الكيميائي وموازنتها وفق مبدأ انحفاظ الذرات
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'phy_lesson_3am_t1_balancing_chemical_equations',
		slug: 'phy-3am-t1-balancing-chemical-equations',
		grade: '3am',
		yearSubjectId: 638,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: التفاعل الكيميائي، معادلة التفاعل، والعوامل المؤثرة',
		order: 2,
		titleAr: 'معادلة التفاعل الكيميائي وموازنتها وفق مبدأ انحفاظ الذرات',
		objectives: [
			'كتابة معادلة التفاعل الكيميائي مع إرفاق الحالة الفيزيائية لكل نوع كيميائي (s, l, g, aq)',
			'موازنة معادلة التفاعل الكيميائي بضبط المعاملات الستوكيوميترية لتحقيق مبدأ انحفاظ الذرات نوعا وعددا'
		],
		keywordsAr: ['معادلة التفاعل الكيميائي', 'موازنة المعادلة', 'انحفاظ الذرات', 'الحالة الفيزيائية'],
		discover: {
			scenarioAr: `كتب تلميذ معادلة الاحتراق التام لغاز البوتان (${spC4H10}) المستعمل في ولاعات السجائر وقارورات الغاز كما يلي: ${eqC4H10Unbalanced}. عندما قام الأستاذ بإحصاء الذرات في الطرفين، لاحظ أن عدد ذرات الكربون والهيدروجين والأكسجين غير متساوٍ! كيف نضبط هذه المعادلة دون تغيير الصيغ الكيميائية للجزيئات؟`,
			svg: wrapSvg(
				560,
				210,
				`<rect x="10" y="10" width="540" height="190" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="34" text-anchor="middle" font-size="14" font-weight="bold" fill="#0f172a">مبدأ انحفاظ الذرات في معادلة احتراق الميثان: CH₄ + 2O₂ → CO₂ + 2H₂O</text>
				<rect x="28" y="52" width="225" height="118" rx="9" fill="#eff6ff" stroke="#2563eb" stroke-width="1.4"/>
				<text x="140" y="72" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#1d4ed8">المتفاعلات (قبل التحول)</text>
				<circle cx="80" cy="108" r="11" fill="#1e293b"/><circle cx="62" cy="94" r="6" fill="#e2e8f0" stroke="#475569"/><circle cx="98" cy="94" r="6" fill="#e2e8f0" stroke="#475569"/><circle cx="62" cy="122" r="6" fill="#e2e8f0" stroke="#475569"/><circle cx="98" cy="122" r="6" fill="#e2e8f0" stroke="#475569"/>
				<text x="80" y="148" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">1 CH₄</text>
				<circle cx="170" cy="96" r="9" fill="#dc2626"/><circle cx="188" cy="96" r="9" fill="#dc2626"/>
				<circle cx="170" cy="122" r="9" fill="#dc2626"/><circle cx="188" cy="122" r="9" fill="#dc2626"/>
				<text x="179" y="148" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">2 O₂</text>
				<text x="280" y="114" text-anchor="middle" font-size="22" font-weight="bold" fill="#0f172a">→</text>
				<rect x="307" y="52" width="225" height="118" rx="9" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.4"/>
				<text x="419" y="72" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#166534">النواتج (بعد التحول)</text>
				<circle cx="355" cy="108" r="9" fill="#dc2626"/><circle cx="373" cy="108" r="11" fill="#1e293b"/><circle cx="391" cy="108" r="9" fill="#dc2626"/>
				<text x="373" y="148" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">1 CO₂</text>
				<circle cx="465" cy="95" r="9" fill="#dc2626"/><circle cx="450" cy="102" r="6" fill="#e2e8f0" stroke="#475569"/><circle cx="480" cy="102" r="6" fill="#e2e8f0" stroke="#475569"/>
				<circle cx="465" cy="123" r="9" fill="#dc2626"/><circle cx="450" cy="130" r="6" fill="#e2e8f0" stroke="#475569"/><circle cx="480" cy="130" r="6" fill="#e2e8f0" stroke="#475569"/>
				<text x="465" y="148" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">2 H₂O</text>
				<text x="280" y="189" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">انحفاظ تام: الكربون (1 = 1) ، الهيدروجين (4 = 4) ، الأكسجين (4 = 4)</text>`
			),
			steps: [
				{
					promptAr: `في المعادلة غير المتوازنة ${eqC4H10Unbalanced}، لدينا $4$ ذرات كربون في المتفاعلات. كم جزيء ${spCO2} نحتاج في النواتج لموازنة الكربون؟`,
					hintAr: 'كل جزيء $\\text{CO}_2$ يحتوي على ذرة كربون واحدة.',
					expectedInput: '4',
					revealAr: `نضع المعامل $4$ أمام ${spCO2} فيصبح لدينا $4$ ذرات كربون في الطرفين.`
				},
				{
					promptAr: `الآن نلاحظ وجود $10$ ذرات هيدروجين في جزيء ${spC4H10}. كم جزيء ماء ${spH2O_l} نحتاج في النواتج لموازنة الهيدروجين؟`,
					hintAr: 'كل جزيء ماء $\\text{H}_2\\text{O}$ يحتوي على ذرتي هيدروجين، فاقسم $10$ على $2$.',
					expectedInput: '5',
					revealAr: `نضع المعامل $5$ أمام ${spH2O_l} لأن $5 \\times 2 = 10$ ذرات هيدروجين.`
				},
				{
					promptAr: `أصبح لدينا في النواتج $4\\text{CO}_2 + 5\\text{H}_2\\text{O}$ ما مجموعه $4\\times 2 + 5\\times 1 = 13$ ذرة أكسجين. لأن ${spO2} يأتي أزواجاً (عدد فردي على 2 يعطي كسراً $\\frac{13}{2}$)، نضرب جميع معاملات المعادلة في $2$. ما المعامل الذي يصبح أمام ${spO2}؟`,
					hintAr: 'نضرب $\\frac{13}{2}$ في $2$.',
					expectedInput: '13',
					revealAr: `بعد الضرب في $2$ تصبح المعادلة المتوازنة بأعداد طبيعية: ${eqC4H10Complete}.`
				}
			]
		},
		summary: {
			rulesAr: [
				'**معادلة التفاعل الكيميائي**: كتابة رمزية موجزة تُظهر المتفاعلات على اليسار والنواتج على اليمين يفصل بينهما سهم ($\\rightarrow$)، مع إرفاق **الحالة الفيزيائية** بين قوسين أسفل يمين كل نوع: صلب $(s)$، سائل $(l)$، غاز $(g)$، محلول مائي $(aq)$.',
				'**مبدأ انحفاظ الذرات**: خلال التفاعل الكيميائي لا تتلف الذرات ولا تُخلق من العدم، بل يُعاد ترتيبها؛ لذلك تبقى الذرات **محفوظة نوعاً وعدداً** بين المتفاعلات والنواتج.',
				'**قواعد الموازنة**:\n1. نكتب الصيغ الكيميائية الصحيحة للمتفاعلات والنواتج ولا **نغيّر أبداً** الأرقام السفلية داخل الصيغة.\n2. نُضيف **معاملات ستوكيوميترية** (أعداد صحيحة طبيعية أصغر ما يمكن) أمام الصيغ فقط.\n3. في احتراق الفحوم الهيدروجينية، نوازن بالترتيب: الكربون ($\\text{C}$) ثم الهيدروجين ($\\text{H}$) ثم الأكسجين ($\\text{O}$)، وإذا ظهر كسر $\\frac{n}{2}$ أمام $\\text{O}_2$ نضرب كل المعاملات في $2$.'
			],
			visualSvg: wrapSvg(
				560,
				195,
				`<rect x="10" y="10" width="540" height="175" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="34" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#1e3a8a">خطوات موازنة معادلة التفاعل والحالات الفيزيائية</text>
				<rect x="24" y="48" width="120" height="58" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="1.3"/>
				<text x="84" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">(s) صلب</text>
				<text x="84" y="90" text-anchor="middle" font-size="11" fill="#0f172a">Fe(s), C(s)</text>
				<rect x="156" y="48" width="120" height="58" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.3"/>
				<text x="216" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#0369a1">(l) سائل</text>
				<text x="216" y="90" text-anchor="middle" font-size="11" fill="#0f172a">H₂O(l)</text>
				<rect x="288" y="48" width="120" height="58" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.3"/>
				<text x="348" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#166534">(g) غاز</text>
				<text x="348" y="90" text-anchor="middle" font-size="11" fill="#0f172a">O₂(g), CO₂(g)</text>
				<rect x="420" y="48" width="116" height="58" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.3"/>
				<text x="478" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">(aq) محلول</text>
				<text x="478" y="90" text-anchor="middle" font-size="11" fill="#0f172a">محلول مائي</text>
				<rect x="24" y="120" width="512" height="52" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2"/>
				<text x="280" y="142" text-anchor="middle" font-size="12" font-weight="bold" fill="#b91c1c">ترتيب موازنة احتراق الفحوم الهيدروجينية: C أولاً ← ثم H ← ثم O</text>
				<text x="280" y="162" text-anchor="middle" font-size="11.5" fill="#0f172a">مثال البروبان: C₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(l)</text>`
			),
			visualCaptionAr: 'دلالات الحالات الفيزيائية ومنهجية موازنة معادلة الاحتراق',
			examples: [
				{
					problemAr: `اكتب ووازن معادلة الاحتراق التام لغاز البروبان (${spC3H8}) في غاز ثنائي الأكسجين (${spO2}) علماً أنه ينتج ${spCO2} و ${spH2O_l}.`,
					solutionAr: `نبدأ بموازنة $\\text{C}$ ($3$ في المتفاعلات $\\leftarrow$ $3\\text{CO}_2$)، ثم $\\text{H}$ ($8$ في المتفاعلات $\\leftarrow$ $4\\text{H}_2\\text{O}$). نحسب ذرات $\\text{O}$ في النواتج: $3\\times 2 + 4\\times 1 = 10$ ذرات، إذن نحتاج $5\\text{O}_2$ في المتفاعلات:\n${eqC3H8Complete}.`
				},
				{
					problemAr: `عند احتراق الحديد (${spFe}) في غاز ثنائي الأكسجين (${spO2}) يتكوّن أكسيد الحديد المغناطيسي (${chemSpecies('Fe3O4', 's').katex}). وازن هذه المعادلة.`,
					solutionAr: `لدينا $3$ ذرات $\\text{Fe}$ و $4$ ذرات $\\text{O}$ في الناتج $\\text{Fe}_3\\text{O}_4$. نضع $3$ أمام $\\text{Fe}$ و $2$ أمام $\\text{O}_2$ فتتوازن المعادلة:\n${eqFeO2}.`
				}
			],
			watchOutAr:
				'خطأ قاتل في الموازنة: تغيير الأرقام الصغيرة أسفل الصيغ (مثل تحويل $\\text{H}_2\\text{O}$ إلى $\\text{H}_2\\text{O}_2$)! تغيير الصيغة يعني تغيير النوع الكيميائي تماماً (الماء غير الماء الأكسجيني). نغيّر فقط الأرقام الكبيرة (المعاملات) التي تسبق الصيغة.'
		},
		practice: [
			{
				questionAr: `ما المعادلة المتوازنة الصحيحة للاحتراق التام لغاز الميثان (${spCH4})؟`,
				options: [
					eqCH4Complete,
					chemEquation(
						[
							{ coeff: 1, formula: 'CH4', state: 'g' },
							{ coeff: 1, formula: 'O2', state: 'g' }
						],
						[
							{ coeff: 1, formula: 'CO2', state: 'g' },
							{ coeff: 2, formula: 'H2O', state: 'l' }
						]
					).katex,
					chemEquation(
						[
							{ coeff: 1, formula: 'CH4', state: 'g' },
							{ coeff: 2, formula: 'O2', state: 'g' }
						],
						[
							{ coeff: 1, formula: 'CO2', state: 'g' },
							{ coeff: 1, formula: 'H2O', state: 'l' }
						]
					).katex,
					chemEquation(
						[
							{ coeff: 1, formula: 'CH4', state: 'g' },
							{ coeff: 2, formula: 'O2', state: 'g' }
						],
						[
							{ coeff: 2, formula: 'CO2', state: 'g' },
							{ coeff: 2, formula: 'H2O', state: 'l' }
						]
					).katex
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! في الطرفين: 1 ذرة كربون، 4 ذرات هيدروجين، و 4 ذرات أكسجين.',
					'الأكسجين غير متوازن: في اليسار ذرتان، وفي اليمين 4 ذرات.',
					'الهيدروجين والأكسجين غير متوازنين: في اليسار 4 ذرات هيدروجين، وفي اليمين ذرتان فقط.',
					'الكربون غير متوازن: في اليسار ذرة واحدة، وفي اليمين ذرتان.'
				],
				explanationAr: `بموازنة C (1) ثم H (4 $\\leftarrow 2\\text{H}_2\\text{O}$) يصبح عدد ذرات O في اليمين $2 + 2 = 4$، فنضع $2$ أمام $\\text{O}_2$: ${eqCH4Complete}.`
			},
			{
				questionAr: `في معادلة التحليل الكهربائي للماء: $a\\text{H}_2\\text{O}(l) \\rightarrow b\\text{H}_2(g) + c\\text{O}_2(g)$، ما قيم المعاملات الصحيحة $(a, b, c)$؟`,
				options: ['(1, 1, 1)', '(2, 2, 1)', '(2, 1, 2)', '(4, 2, 2)'],
				correctIndex: 1,
				diagnosticFeedback: [
					'ذرات الأكسجين غير متوازنة (1 في اليسار و 2 في اليمين).',
					'أحسنت! $2\\text{H}_2\\text{O}(l) \\rightarrow 2\\text{H}_2(g) + \\text{O}_2(g)$ تحقق انحفاظ الهيدروجين (4) والأكسجين (2).',
					'هنا 4 ذرات هيدروجين في اليسار و 2 فقط في اليمين.',
					'هذه المعاملات تقبل الاختزال بالقسمة على 2؛ نختار أصغر أعداد صحيحة طبيعية.'
				],
				explanationAr: `للحصول على عدد زوجي من ذرات الأكسجين في اليسار نضرب الماء في 2، فينتج 4 ذرات هيدروجين أي $2\\text{H}_2$ و $\\text{O}_2$ واحدة: ${eqElectrolysis}.`
			},
			{
				questionAr: `أي معادلة تعبّر عن احتراق غير تام لغاز الميثان ينتج عنه غاز أحادي أكسيد الكربون (${spCO}) بشكل متوازن؟`,
				options: [
					eqCH4Incomplete,
					chemEquation(
						[
							{ coeff: 1, formula: 'CH4', state: 'g' },
							{ coeff: 2, formula: 'O2', state: 'g' }
						],
						[
							{ coeff: 1, formula: 'CO', state: 'g' },
							{ coeff: 2, formula: 'H2O', state: 'l' }
						]
					).katex,
					chemEquation(
						[
							{ coeff: 2, formula: 'CH4', state: 'g' },
							{ coeff: 4, formula: 'O2', state: 'g' }
						],
						[
							{ coeff: 2, formula: 'CO', state: 'g' },
							{ coeff: 4, formula: 'H2O', state: 'l' }
						]
					).katex,
					eqCH4Complete
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! ذرات C (2=2)، ذرات H (8=8)، وذرات O (6=2+4).',
					'الأكسجين غير متوازن: في اليسار 4 ذرات، وفي اليمين 3 ذرات فقط.',
					'الأكسجين غير متوازن: في اليسار 8 ذرات، وفي اليمين 6 ذرات فقط.',
					'هذه معادلة الاحتراق التام (تُنتج $\\text{CO}_2$ وليس $\\text{CO}$).'
				],
				explanationAr: `في ${eqCH4Incomplete} لدينا في الطرفين: ذرتا C، 8 ذرات H، و6 ذرات O.`
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 3. بعض العوامل المؤثرة في التحول الكيميائي
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'phy_lesson_3am_t1_chemical_reaction_factors',
		slug: 'phy-3am-t1-chemical-reaction-factors',
		grade: '3am',
		yearSubjectId: 638,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: التفاعل الكيميائي، معادلة التفاعل، والعوامل المؤثرة',
		order: 3,
		titleAr:
			'بعض العوامل المؤثرة في التحول الكيميائي (درجة الحرارة، سطح التلامس، كمية المتفاعلات)',
		objectives: [
			'إبراز تأثير درجة الحرارة وسطح التلامس وتركيب/كمية المتفاعلات الابتدائية على سرعة ونتائج التحول الكيميائي',
			'احترام قواعد الأمن المخبري عند التعامل مع المواد الكيميائية والزجاجيات'
		],
		keywordsAr: ['درجة الحرارة', 'سطح التلامس', 'كمية المتفاعلات', 'العوامل المؤثرة'],
		discover: {
			scenarioAr:
				'أصيب تلميذ بصداع فأراد تحضير كوب من قرص فيتامين فوار. لاحظ في تجربة أولى أن القرص الفوار ينحلّ أسرع بكثير في الماء الدافئ مقارنة بالماء البارد، وفي تجربة ثانية أن القرص المسحوق (المطحون) ينتهي تفاعله أسرع من القرص الكامل في نفس درجة الحرارة! ما العوامل الفيزيائية والكيميائية التي تحكمت في سرعة هذا التحول؟',
			svg: wrapSvg(
				560,
				200,
				`<rect x="10" y="10" width="540" height="180" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="32" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#0f172a">تجربتا القرص الفوار: أثر درجة الحرارة وسطوح التلامس</text>
				<g transform="translate(26,44)">
					<rect x="0" y="0" width="246" height="134" rx="8" fill="#ffffff" stroke="#93c5fd" stroke-width="1.3"/>
					<text x="123" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#1d4ed8">1) عامل درجة الحرارة</text>
					<polyline fill="none" stroke="#0f172a" stroke-width="1.8" points="35,40 35,108 95,108 95,40"/>
					<rect x="36" y="62" width="58" height="45" fill="#dbeafe"/>
					<circle cx="65" cy="96" r="7" fill="#fef08a" stroke="#ca8a04"/>
					<text x="65" y="124" text-anchor="middle" font-size="10.5" fill="#1e40af">ماء بارد (بطيء)</text>
					<polyline fill="none" stroke="#0f172a" stroke-width="1.8" points="145,40 145,108 205,108 205,40"/>
					<rect x="146" y="62" width="58" height="45" fill="#fee2e2"/>
					<circle cx="175" cy="96" r="7" fill="#fef08a" stroke="#ca8a04"/>
					<circle cx="164" cy="78" r="3" fill="#ffffff"/><circle cx="182" cy="72" r="3" fill="#ffffff"/><circle cx="173" cy="68" r="2.5" fill="#ffffff"/>
					<text x="175" y="124" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">ماء ساخن (سريع)</text>
				</g>
				<g transform="translate(288,44)">
					<rect x="0" y="0" width="246" height="134" rx="8" fill="#ffffff" stroke="#86efac" stroke-width="1.3"/>
					<text x="123" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#15803d">2) عامل سطح التلامس</text>
					<polyline fill="none" stroke="#0f172a" stroke-width="1.8" points="35,40 35,108 95,108 95,40"/>
					<rect x="36" y="62" width="58" height="45" fill="#e0f2fe"/>
					<rect x="53" y="92" width="24" height="10" rx="2" fill="#fde047" stroke="#ca8a04"/>
					<text x="65" y="124" text-anchor="middle" font-size="10.5" fill="#0369a1">قرص كامل (سطح أصغر)</text>
					<polyline fill="none" stroke="#0f172a" stroke-width="1.8" points="145,40 145,108 205,108 205,40"/>
					<rect x="146" y="62" width="58" height="45" fill="#e0f2fe"/>
					<circle cx="160" cy="99" r="2" fill="#ca8a04"/><circle cx="170" cy="100" r="2" fill="#ca8a04"/><circle cx="180" cy="98" r="2" fill="#ca8a04"/><circle cx="190" cy="100" r="2" fill="#ca8a04"/>
					<circle cx="168" cy="78" r="3" fill="#ffffff"/><circle cx="180" cy="70" r="3" fill="#ffffff"/>
					<text x="175" y="124" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#16a34a">مسحوق (سطح أكبر)</text>
				</g>`
			),
			steps: [
				{
					promptAr:
						'عند رفع درجة حرارة الماء، هل يزداد أم ينقص زمن استغراق التفاعل الكيميائي؟',
					hintAr: 'التفاعل السريع يستغرق وقتاً أقل.',
					expectedInput: 'ينقص',
					revealAr:
						'**ينقص** زمن التفاعل (أي **تزداد سرعة التفاعل**) كلما ارتفعت درجة الحرارة، ولذلك نضع الأطعمة في الثلاجة لإبطاء تحولاتها الكيميائية.'
				},
				{
					promptAr:
						'لماذا يتفاعل القرص المسحوق أو برادة الحديد أسرع من القرص السليم أو قطعة الحديد الصلبة؟',
					hintAr: 'تفتيت الجسم الصلب يزيد من المساحة المعرّضة للتفاعل.',
					expectedInput: 'زيادة سطح التلامس',
					revealAr:
						'بسبب **زيادة سطح التلامس** بين المتفاعلات، مما يسمح بعدد أكبر من التصادمات في الثانية الواحدة.'
				},
				{
					promptAr:
						'إذا أضفنا كمية قليلة من الهواء لموقد الغاز حدث احتراق غير تام، وإذا زدنا تدفق الهواء صار الاحتراق تاماً. ما العامل المؤثر هنا؟',
					hintAr: 'يتعلق بنسب المواد الموجودة في بداية التفاعل.',
					expectedInput: 'تركيب المزيج الابتدائي',
					revealAr:
						'إنه عامل **تركيب المزيج الابتدائي (كمية المتفاعلات)**؛ فنقص أو زيادة أحد المتفاعلات يغيّر نواتج التفاعل أو كميتها.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**العوامل المؤثرة في التحول الكيميائي** هي مقادير تتحكم في **سرعة** التحول أو **توجيه نواتجه**:',
				'1. **درجة الحرارة**: ارتفاع درجة الحرارة يسرّع التحول الكيميائي (مثل طهي الطعام في قدر الضغط)، بينما انخفاضها يبطئه (حفظ الأغذية في الثلاجة).',
				'2. **سطح التلامس**: كلما كان الجسم الصلب مجزّأً أو مسحوقاً زاد سطح التلامس مع المتفاعل الآخر، فزادت سرعة التحول (تفاعل برادة الحديد مع حمض كلور الماء أسرع من قطعة حديد لها نفس الكتلة).',
				'3. **تركيب المزيج الابتدائي (كمية المتفاعلات)**: تغيير كمية أحد المتفاعلات قد يغيّر طبيعة النواتج أو كميتها (مثل تأثير كمية ${spO2}$ على احتراق الفحوم الهيدروجينية بين تام وغير تام).',
				'**الأمن المخبري**: ارتداء النظارات الواقية والقفازات عند التعامل مع الأحماض، وعدم تسخين الأنابيب في اتجاه الأشخاص، وتهوية المخبر جيداً.'
			],
			visualSvg: wrapSvg(
				560,
				180,
				`<rect x="10" y="10" width="540" height="160" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="34" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#0f172a">ملخص العوامل المؤثرة في التحول الكيميائي</text>
				<rect x="24" y="48" width="160" height="104" rx="9" fill="#fee2e2" stroke="#dc2626" stroke-width="1.3"/>
				<text x="104" y="70" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#b91c1c">درجة الحرارة</text>
				<text x="104" y="94" text-anchor="middle" font-size="11" fill="#0f172a">↑ الحرارة ⇐ تسريع التحول</text>
				<text x="104" y="114" text-anchor="middle" font-size="11" fill="#0f172a">↓ الحرارة ⇐ إبطاء التحول</text>
				<text x="104" y="136" text-anchor="middle" font-size="10.5" fill="#7f1d1d">مثال: التبريد في الثلاجة</text>
				<rect x="200" y="48" width="160" height="104" rx="9" fill="#dcfce7" stroke="#16a34a" stroke-width="1.3"/>
				<text x="280" y="70" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#166534">سطح التلامس</text>
				<text x="280" y="94" text-anchor="middle" font-size="11" fill="#0f172a">مسحوق / برادة ⇐ سطح أكبر</text>
				<text x="280" y="114" text-anchor="middle" font-size="11" fill="#0f172a">⇐ تفاعل أسرع</text>
				<text x="280" y="136" text-anchor="middle" font-size="10.5" fill="#14532d">مثال: برادة الحديد والقرص</text>
				<rect x="376" y="48" width="160" height="104" rx="9" fill="#dbeafe" stroke="#2563eb" stroke-width="1.3"/>
				<text x="456" y="70" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#1d4ed8">كمية المتفاعلات</text>
				<text x="456" y="94" text-anchor="middle" font-size="11" fill="#0f172a">وفرة O₂ ⇐ احتراق تام</text>
				<text x="456" y="114" text-anchor="middle" font-size="11" fill="#0f172a">نقص O₂ ⇐ احتراق غير تام</text>
				<text x="456" y="136" text-anchor="middle" font-size="10.5" fill="#1e3a8a">مثال: فتحة تهوية الموقد</text>`
			),
			visualCaptionAr: 'العوامل الثلاثة المؤثرة في سرعة التحول الكيميائي ونواتجه',
			examples: [
				{
					problemAr:
						'نضع $5\\text{ g}$ من مسمار حديد في كأس به حمض كلور الماء عند $20^\\circ\\text{C}$، ونضع $5\\text{ g}$ من برادة الحديد في كأس مماثل عند $20^\\circ\\text{C}$. أيهما يتفاعل أسرع، ولماذا؟',
					solutionAr:
						'تتفاعل **برادة الحديد** أسرع لأن تفتيت الحديد إلى برادة يزيد من **سطح التلامس** بين الحديد والحمض مع بقاء الكتلة ودرجة الحرارة ثابتتين.'
				},
				{
					problemAr:
						'لماذا نُشعل حطب الشواء باستعمال نشارة الخشب أو أغصان صغيرة أولاً بدلاً من جذع شجرة ضخم؟',
					solutionAr:
						'لأن الأغصان الصغيرة ونشارة الخشب تمتلك **سطح تلامس** أكبر بكثير مع غاز ثنائي الأكسجين، مما يسرّع عملية الاحتراق.'
				}
			],
			watchOutAr:
				'عند مقارنة تأثير عامل واحد في تجربتين مخبريتين، يجب تثبيت جميع العوامل الأخرى (مثلاً لدراسة تأثير درجة الحرارة، نستعمل نفس كتلة القرص الكامل ونفس حجم الماء!).'
		},
		practice: [
			{
				questionAr:
					'أراد تلميذ دراسة تأثير **درجة الحرارة** فقط على سرعة انحلال قرص فوار في الماء. أي التجربتين يجب أن يقارن بينهما؟',
				options: [
					'قرص سليم في ماء بارد ($10^\\circ\\text{C}$) مع قرص مسحوق في ماء ساخن ($50^\\circ\\text{C}$)',
					'قرص سليم في ماء بارد ($10^\\circ\\text{C}$) مع قرص سليم مماثل في نفس حجم الماء الساخن ($50^\\circ\\text{C}$)',
					'قرص مسحوق في $50\\text{ mL}$ ماء مع قرص سليم في $200\\text{ mL}$ ماء عند نفس الحرارة',
					'قرصان سليمان في كأسين من الماء عند $25^\\circ\\text{C}$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هنا غيّرت عاملين معاً (الحرارة وسطوح التلامس) فلا يمكن عزل أثر الحرارة.',
					'ممتاز! ثبتنا شكل القرص وحجم الماء وغيّرنا درجة الحرارة فقط.',
					'هنا غيّرت سطح التلامس وحجم الماء مع تثبيت الحرارة!',
					'جميع الشروط متطابقة فلا يوجد متغير للمقارنة.'
				],
				explanationAr:
					'لدراسة أثر عامل واحد نغيّر هذا العامل فقط (درجة الحرارة) ونثبّت بقية الشروط (حالة القرص وحجم الماء).'
			},
			{
				questionAr:
					'لماذا تفسد الأغذية بسرعة في فصل الصيف بينما تحفظ لمدة أطول داخل الثلاجة؟',
				options: [
					'لأن انخفاض درجة الحرارة في الثلاجة يبطئ التحولات الكيميائية للفساد',
					'لأن الثلاجة تزيد من سطح التلامس بين الطعام والهواء',
					'لأن الأكسجين يختفي تماماً داخل الثلاجة',
					'لأن التبريد يوقف الجاذبية'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! درجة الحرارة المنخفضة تقلل من سرعة التحولات الكيميائية المسببة لفساد الغذاء.',
					'التبريد لا يغير سطح التلامس.',
					'الهواء والأكسجين موجودان داخل الثلاجة.',
					'لا علاقة للجاذبية بسرعة التحولات الكيميائية.'
				],
				explanationAr:
					'درجة الحرارة عامل حركي: خفضها يبطئ التفاعلات الكيميائية ورفعها يسرّعها.'
			},
			{
				questionAr:
					'من قواعد السلامة المخبرية عند التعامل مع محلول حمض كلور الماء في تجربة الحديد، أي سلوك يعد **خاطئاً** وخطيراً؟',
				options: [
					'ارتداء القفازات والنظارات الواقية',
					'استعمال أنابيب اختبار نظيفة ومثبتة في حامل',
					'توجيه فوهة أنبوب الاختبار نحو وجه الزميل أثناء التفاعل',
					'غسل اليدين جيداً بعد انتهاء التجربة'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'ارتداء القفازات والنظارات سلوك وقائي واجب.',
					'استعمال الحامل يمنع سقوط الأنبوب وانكساره.',
					'أحسنت في رصد الخطأ! قد تتطاير قطرات الحمض أو الغازات الساخنة من الفوهة، لذا لا نوجهها أبداً نحو أي شخص.',
					'غسل اليدين بعد التجربة من أساسيات السلامة.'
				],
				explanationAr:
					'في المخبر يجب توجيه فوهة أنابيب الاختبار بعيداً عن الوجه والأشخاص لتجنب تطاير المواد الكيميائية.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 4. السلسلة الوظيفية
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'phy_lesson_3am_t1_functional_chain',
		slug: 'phy-3am-t1-functional-chain',
		grade: '3am',
		yearSubjectId: 638,
		trimesterId: 't1',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: السلسلة الوظيفية وإدماج الفصل الأول',
		order: 4,
		titleAr: 'السلسلة الوظيفية (مفهوم الجملة والتركيبة الوظيفية، أفعال الحالة وأفعال الأداء)',
		objectives: [
			'تحديد العناصر الأساسية المشكلة لتركيبة وظيفية تحقق فعلا نهائيا مطلوبا',
			'رسم نموذج السلسلة الوظيفية باستعمال الفقاعات والأسهم مع توظيف أفعال الحالة تحت الفقاعات وأفعال الأداء فوق الأسهم'
		],
		keywordsAr: ['السلسلة الوظيفية', 'التركيبة الوظيفية', 'أفعال الحالة', 'أفعال الأداء', 'الجملة'],
		discover: {
			scenarioAr:
				'في مخبر الفيزياء، ركّب الأستاذ نظاماً لإشعال مصباح دون بطارية: ربط حجراً بخيط ملفوف حول بكرة متصلة بمحور منوبة (دينامو)، ووصل المنوبة بمصباح. بمجرد ترك الحجر يسقط، يضيء المصباح! كيف نصف مراحل اشتغال هذه التركيبة التكنولوجية بنموذج علمي متسلسل؟',
			svg: wrapSvg(
				560,
				195,
				`<rect x="10" y="10" width="540" height="175" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="34" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#0f172a">السلسلة الوظيفية لتركيبة: سقوط حجر لإشعال مصباح</text>
				<defs><marker id="fArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#2563eb"/></marker></defs>
				<ellipse cx="75" cy="95" rx="46" ry="24" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/>
				<text x="75" y="100" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">الحجر</text>
				<text x="75" y="140" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">يسقط</text>
				<line x1="123" y1="95" x2="159" y2="95" stroke="#2563eb" stroke-width="2" marker-end="url(#fArr)"/>
				<text x="142" y="82" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#059669">يدير</text>
				<ellipse cx="208" cy="95" rx="46" ry="24" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/>
				<text x="208" y="100" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">البكرة</text>
				<text x="208" y="140" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">تدور</text>
				<line x1="256" y1="95" x2="292" y2="95" stroke="#2563eb" stroke-width="2" marker-end="url(#fArr)"/>
				<text x="275" y="82" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#059669">تدير</text>
				<ellipse cx="342" cy="95" rx="48" ry="24" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/>
				<text x="342" y="100" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">المنوبة</text>
				<text x="342" y="140" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">تدور</text>
				<line x1="392" y1="95" x2="428" y2="95" stroke="#2563eb" stroke-width="2" marker-end="url(#fArr)"/>
				<text x="411" y="82" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#059669">تغذي</text>
				<ellipse cx="480" cy="95" rx="48" ry="24" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>
				<text x="480" y="100" text-anchor="middle" font-size="13" font-weight="bold" fill="#92400e">المصباح</text>
				<text x="480" y="140" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">يتوهج</text>
				<text x="280" y="168" text-anchor="middle" font-size="11" fill="#475569">أفعال الحالة (تحت الفقاعة باللون الأحمر)  |  أفعال الأداء (فوق السهم باللون الأخضر)</text>`
			),
			steps: [
				{
					promptAr:
						'ما الجمل الميكانيكية والكهربائية الأساسية التي تشارك فعلياً في تحقيق الفعل النهائي (توهج المصباح) دون العناصر الثانوية كالحامل أو الأسلاك؟',
					hintAr: 'اذكر بالترتيب: الجسم الساقط، العجلة، المولّد، والمصباح.',
					expectedInput: 'الحجر، البكرة، المنوبة، المصباح',
					revealAr:
						'الجمل الأساسية بالترتيب هي: **الحجر ← البكرة ← المنوبة (الدينامو) ← المصباح** (نهمل أسلاك التوصيل والخيط لأنها مجرد روابط).'
				},
				{
					promptAr:
						'تحت كل فقاعة نكتب فعلَ «حالة» يصف الجملة. ما فعل الحالة المناسب تحت فقاعة «المنوبة» وتحت فقاعة «المصباح»؟',
					hintAr: 'ماذا تفعل المنوبة؟ وماذا يحدث للمصباح في النهاية؟',
					expectedInput: 'تدور، يتوهج',
					revealAr:
						'المنوبة **تدور** (فعل حالة)، والمصباح **يتوهج** (فعل حالة نهائي مطلوب).'
				},
				{
					promptAr:
						'فوق كل سهم نكتب فعلَ «أداء» يصف تأثير جملة على الجملة التي تليها. ما فعل الأداء المناسب بين «المنوبة» و«المصباح»؟',
					hintAr: 'المنوبة ترسل تياراً كهربائياً إلى المصباح.',
					expectedInput: 'تغذي',
					revealAr: 'المنوبة **تغذّي** المصباح (أو تُنير المصباح، والأصح علمياً **تغذّي**).'
				}
			]
		},
		summary: {
			rulesAr: [
				'**التركيبة الوظيفية**: مجموعة جمل مترابطة فيما بينها لتحقيق فعل نهائي مطلوب (مثل إشعال مصباح، تحريك عربة، تسخين ماء...).',
				'**السلسلة الوظيفية**: تمثيل رمزي مختصر لمراحل اشتغال تركيبة وظيفية، يتكون من:\n- **فقاعات (بيضاوية)**: يُكتب داخلها اسم **الجملة** الأساسية فقط (نهمل الأسلاك والخيوط والحوامل ما لم تلعب دوراً تخزينياً).\n- **أسهم**: تربط بين كل جملتين متتاليتين في اتجاه الفعل.\n- **أفعال الحالة**: تُكتب **تحت** كل فقاعة (فعل مضارع لازم يصف حالة الجملة، مثل: *يسقط، يتدفق، تدور، تتفرغ، يحترق، يتوهج، يسخن*).\n- **أفعال الأداء**: تُكتب **فوق** كل سهم (فعل مضارع متعدٍّ يصف دور الجملة في تشغيل الجملة الموالية، مثل: *يدير، يسحب، يغذي، يسخن، يضيء*).'
			],
			visualSvg: wrapSvg(
				560,
				170,
				`<rect x="10" y="10" width="540" height="150" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="34" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#1e3a8a">مثال السلسلة الوظيفية لتوليد الكهرباء من سدّ مائي</text>
				<defs><marker id="fArr2" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#2563eb"/></marker></defs>
				<ellipse cx="75" cy="84" rx="44" ry="22" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.6"/>
				<text x="75" y="89" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0369a1">الماء</text>
				<text x="75" y="126" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#dc2626">يتدفق</text>
				<line x1="121" y1="84" x2="157" y2="84" stroke="#2563eb" stroke-width="2" marker-end="url(#fArr2)"/>
				<text x="140" y="72" text-anchor="middle" font-size="11" font-weight="bold" fill="#059669">يدير</text>
				<ellipse cx="206" cy="84" rx="44" ry="22" fill="#eff6ff" stroke="#2563eb" stroke-width="1.6"/>
				<text x="206" y="89" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#1e3a8a">العنفة</text>
				<text x="206" y="126" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#dc2626">تدور</text>
				<line x1="252" y1="84" x2="288" y2="84" stroke="#2563eb" stroke-width="2" marker-end="url(#fArr2)"/>
				<text x="271" y="72" text-anchor="middle" font-size="11" font-weight="bold" fill="#059669">تدير</text>
				<ellipse cx="340" cy="84" rx="46" ry="22" fill="#eff6ff" stroke="#2563eb" stroke-width="1.6"/>
				<text x="340" y="89" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#1e3a8a">المنوبة</text>
				<text x="340" y="126" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#dc2626">تدور</text>
				<line x1="388" y1="84" x2="424" y2="84" stroke="#2563eb" stroke-width="2" marker-end="url(#fArr2)"/>
				<text x="407" y="72" text-anchor="middle" font-size="11" font-weight="bold" fill="#059669">تغذي</text>
				<ellipse cx="478" cy="84" rx="46" ry="22" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>
				<text x="478" y="89" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#92400e">المصباح</text>
				<text x="478" y="126" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#dc2626">يتوهج ويسخن</text>`
			),
			visualCaptionAr: 'السلسلة الوظيفية لمحطة كهرومائية (الماء ← العنفة ← المنوبة ← المصباح)',
			examples: [
				{
					problemAr:
						'أنشئ السلسلة الوظيفية لتشغيل مروحة صغيرة باستعمال بطارية ومحرك كهربائي.',
					solutionAr:
						'الفقاعات: **البطارية** $\\rightarrow$ **المحرك** $\\rightarrow$ **المروحة**.\nأفعال الحالة (تحت الفقاعات): تتفرغ | يدور | تدور.\nأفعال الأداء (فوق الأسهم): تغذي (البطارية تغذي المحرك) | يدير (المحرك يدير المروحة).'
				},
				{
					problemAr:
						'أنشئ السلسلة الوظيفية لتحريك عربة لعبة مزودة بنابض (أو شريط مطاطي مشدود).',
					solutionAr:
						'الفقاعات: **النابض** $\\rightarrow$ **العجلات (أو العربة)**.\nتحت الفقاعات: يتمدد (يسترخي) | تدور (تتقدم).\nفوق السهم: يدير (أو يسحب).'
				}
			],
			watchOutAr:
				'احذر من أخطاء شائعة في السلسلة الوظيفية: (1) وضع أسلاك التوصيل أو الخيط كفقاعات مستقلة (فهي مجرد روابط). (2) عكس مكان الأفعال: أفعال **الحالة** تحت الفقاعات وأفعال **الأداء** فوق الأسهم. (3) نسيان أن فعل الحالة للمصباح هو «يتوهج» وليس «يضيء الغرفة».'
		},
		practice: [
			{
				questionAr:
					'في السلسلة الوظيفية لتحريك عربة صغيرة بواسطة خلايا شمسية (لوح شمسي) ومحرك: `الشمس ← اللوح الشمسي ← المحرك ← العربة`. ما أفعال الحالة المناسبة تحت `الشمس` و`اللوح الشمسي` على الترتيب؟',
				options: [
					'تضيء — يغذي',
					'تشع — يستقبل (أو يُثار)',
					'تحترق — يدور',
					'تتفرغ — يتوهج'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'«تضيء» و«يغذي» أفعال أداء تُكتب فوق الأسهم وليس تحت الفقاعات.',
					'ممتاز! الشمس تشع (فعل حالة)، وتضيء اللوح الشمسي الذي يستقبل الإشعاع ويغذي المحرك.',
					'اللوح الشمسي لا يدور بل ثابت.',
					'البطارية هي التي تتفرغ، والمصباح هو الذي يتوهج.'
				],
				explanationAr:
					'أفعال الحالة تصف حالة الجملة نفسها: الشمس تشع، اللوح الشمسي يُثار (يستقبل)، المحرك يدور، العربة تتقدم.'
			},
			{
				questionAr:
					'في تركيبة مائية (`الماء ← العنفة ← المنوبة ← المصباح`)، ما فعل الأداء الذي نكتبه فوق السهم بين `العنفة` و`المنوبة`؟',
				options: ['تغذي', 'تسخن', 'تدير', 'تنير'],
				correctIndex: 2,
				diagnosticFeedback: [
					'«تغذي» فعل أداء كهربائي يربط المنوبة بالمصباح.',
					'العنفة لا تسخن المنوبة بل تحركها ميكانيكياً.',
					'صحيح! العنفة تدور فتُدير محور المنوبة.',
					'الإنارة من وظيفة المصباح أو الشمس.'
				],
				explanationAr:
					'العنفة تدور بفعل تدفق الماء، وبدورها **تُدير** المنوبة (فعل أداء ميكانيكي).'
			},
			{
				questionAr:
					'عند إنشاء السلسلة الوظيفية لإضاءة مصباح ببطارية عبر أسلاك توصيل وقاطعة مغلقة، ما الفقاعات الصحيحة التي نرسمها؟',
				options: [
					'البطارية ← القاطعة ← الأسلاك ← المصباح',
					'البطارية ← المصباح',
					'الأسلاك ← المصباح',
					'المصباح ← البطارية'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الأسلاك والقاطعة عناصر ربط وتمرير وليست جملاً وظيفية في السلسلة.',
					'أحسنت! نختصر التركيبة في الجملتين الأساسيتين: البطارية (تتفرغ) تغذي المصباح (يتوهج ويسخن).',
					'الأسلاك ليست منبعاً ولا مستقبلاً وظيفياً.',
					'الاتجاه يبدأ من الجملة المحركة (البطارية) نحو الجملة النهائية (المصباح).'
				],
				explanationAr:
					'تضم السلسلة الوظيفية الجمل الأساسية فقط دون الأسلاك والقاطعات التي تلعب دور روابط التوصيل.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 5. إدماج تعلمات الفصل الأول
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'phy_lesson_3am_t1_integration',
		slug: 'phy-3am-t1-integration',
		grade: '3am',
		yearSubjectId: 638,
		trimesterId: 't1',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: السلسلة الوظيفية وإدماج الفصل الأول',
		order: 5,
		titleAr: 'إدماج تعلمات الفصل الأول: التفاعل الكيميائي والسلسلة الوظيفية',
		objectives: [
			'حل تمارين ووضعيات إدماجية تتعلق بموازنة معادلات الاحتراق والعوامل المؤثرة في التفاعل وبناء السلاسل الوظيفية لتركيبات تكنولوجية'
		],
		keywordsAr: ['وضعية إدماجية', 'معادلة التفاعل', 'السلسلة الوظيفية'],
		discover: {
			scenarioAr:
				'في مخيم كشفي بولاية تمنراست، استخدم الكشافون مولداً كهربائياً صغيراً يشتغل بغاز البوتان (أو البنزين) لتشغيل مصابيح الإنارة ليلاً، كما لاحظوا أن موقد الطهي المخصص للشاي يطلق دخاناً أسود عند إغلاق فتحة الهواء! كيف ندمج معارف المادة وتحولاتها مع السلسلة الوظيفية لتفسير اشتغال هذا المخيم ومعالجة الخلل؟',
			svg: wrapSvg(
				560,
				185,
				`<rect x="10" y="10" width="540" height="165" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="34" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#0f172a">إدماج الفصل الأول: الاحتراق الكيميائي + السلسلة الوظيفية</text>
				<rect x="24" y="50" width="244" height="110" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="1.3"/>
				<text x="146" y="72" text-anchor="middle" font-size="12" font-weight="bold" fill="#b91c1c">ميدان المادة وتحولاتها</text>
				<text x="146" y="94" text-anchor="middle" font-size="11" fill="#0f172a">احتراق البوتان / الميثان (تام وغير تام)</text>
				<text x="146" y="114" text-anchor="middle" font-size="11" fill="#0f172a">موازنة المعادلة بالحالات (s, l, g)</text>
				<text x="146" y="134" text-anchor="middle" font-size="11" fill="#0f172a">أثر كمية O₂ والحرارة وسطوح التلامس</text>
				<rect x="292" y="50" width="244" height="110" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.3"/>
				<text x="414" y="72" text-anchor="middle" font-size="12" font-weight="bold" fill="#1d4ed8">ميدان الطاقة (السلسلة الوظيفية)</text>
				<text x="414" y="94" text-anchor="middle" font-size="11" fill="#0f172a">الغاز+الهواء ← الماء ← العنفة ← المنوبة</text>
				<text x="414" y="114" text-anchor="middle" font-size="11" fill="#0f172a">تحديد الجمل في فقاعات</text>
				<text x="414" y="134" text-anchor="middle" font-size="11" fill="#0f172a">أفعال الحالة (تحت) وأفعال الأداء (فوق)</text>`
			),
			steps: [
				{
					promptAr:
						'ما الإجراء الواجب اتخاذه لإصلاح موقد الشاي الذي يعطي لهباً أصفر ودخاناً أسود؟',
					hintAr: 'تذكّر عامل كمية المتفاعلات في الاحتراق.',
					expectedInput: 'فتح فتحة التهوية لزيادة الأكسجين',
					revealAr:
						'يجب **فتح فتحة التهوية** وتنظيف الحاقن لزيادة نسبة غاز ثنائي الأكسجين (${spO2}$) حتى يتحوّل الاحتراق إلى **احتراق تام** بلهب أزرق.'
				},
				{
					promptAr:
						'إذا استُعمل احتراق الغاز في محطة حرارية لتسخين ماء ينطلق بخاره لتدوير عنفة متصلة بمنوبة تغذي مصباحاً، ما أول فقاعتين في السلسلة الوظيفية؟',
					hintAr: 'المزيج المتفاعل ثم السائل الذي يُسخّن.',
					expectedInput: 'غاز+هواء ← ماء',
					revealAr:
						'السلسلة الوظيفية: **غاز+هواء** (يحترقان) $\\xrightarrow{\\text{يسخّن}}$ **ماء** (يتبخر) $\\xrightarrow{\\text{يدير}}$ **عنفة** (تدور) $\\xrightarrow{\\text{تدير}}$ **منوبة** (تدور) $\\xrightarrow{\\text{تغذي}}$ **مصباح** (يتوهج).'
				}
			]
		},
		summary: {
			rulesAr: [
				'**منهجية حل الوضعية الإدماجية في 3AM**:\n1. **الوجاهة**: قراءة السندات، تحديد التحول الكيميائي (تام أم غير تام) أو الجمل الفيزيائية للتركيبة.\n2. **الاستعمال السليم لأدوات المادة**: كتابة المعادلة متوازنة مع الحالات الفيزيائية $(s, l, g)$، وذكر طرق الكشف، ورسم السلسلة الوظيفية بالفقاعات والأسهم مع احترام موضع أفعال الحالة وأفعال الأداء.\n3. **الانسجام والإتقان**: تقديم نصائح أمنية واقعية (التهوية عند احتراق الغاز، صيانة المواقد، تركيب كاشف غاز $\\text{CO}$).'
			],
			visualSvg: wrapSvg(
				560,
				155,
				`<rect x="10" y="10" width="540" height="135" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="34" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">ربط الاحتراق بالتركيبة الوظيفية لمحطة حرارية</text>
				<defs><marker id="fArr3" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#2563eb"/></marker></defs>
				<ellipse cx="70" cy="84" rx="48" ry="20" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
				<text x="70" y="88" text-anchor="middle" font-size="11" font-weight="bold" fill="#991b1b">غاز + O₂</text>
				<text x="70" y="122" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">يحترقان</text>
				<line x1="120" y1="84" x2="148" y2="84" stroke="#2563eb" stroke-width="1.8" marker-end="url(#fArr3)"/>
				<text x="134" y="72" text-anchor="middle" font-size="10" font-weight="bold" fill="#059669">يسخن</text>
				<ellipse cx="188" cy="84" rx="36" ry="20" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
				<text x="188" y="88" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0369a1">ماء</text>
				<text x="188" y="122" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">يتبخر</text>
				<line x1="226" y1="84" x2="254" y2="84" stroke="#2563eb" stroke-width="1.8" marker-end="url(#fArr3)"/>
				<text x="240" y="72" text-anchor="middle" font-size="10" font-weight="bold" fill="#059669">يدير</text>
				<ellipse cx="294" cy="84" rx="36" ry="20" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
				<text x="294" y="88" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">عنفة</text>
				<text x="294" y="122" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">تدور</text>
				<line x1="332" y1="84" x2="360" y2="84" stroke="#2563eb" stroke-width="1.8" marker-end="url(#fArr3)"/>
				<text x="346" y="72" text-anchor="middle" font-size="10" font-weight="bold" fill="#059669">تدير</text>
				<ellipse cx="400" cy="84" rx="36" ry="20" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
				<text x="400" y="88" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">منوبة</text>
				<text x="400" y="122" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">تدور</text>
				<line x1="438" y1="84" x2="464" y2="84" stroke="#2563eb" stroke-width="1.8" marker-end="url(#fArr3)"/>
				<text x="451" y="72" text-anchor="middle" font-size="10" font-weight="bold" fill="#059669">تغذي</text>
				<ellipse cx="504" cy="84" rx="36" ry="20" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
				<text x="504" y="88" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#92400e">مصباح</text>
				<text x="504" y="122" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">يتوهج</text>`
			),
			visualCaptionAr: 'السلسلة الوظيفية لمحطة حرارية تعمل بالغاز الطبيعي',
			examples: [
				{
					problemAr: `تشتكي عائلة من صداع ودوار كلما شغّلت سخان الماء الذي يعمل بغاز المدينة (${spCH4}) في حمام مغلق دون مهوئة، مع اصفرار اللهب. قدّم تفسيراً علمياً، واكتب معادلة الاحتراق التام المرجوة، واقترح حلّين وقائيين.`,
					solutionAr: `التفسير: نقص التهوية سبب نقص ${spO2} فحدث احتراق غير تام أنتج غاز ${spCO} السام المسبب للاختناق.\nمعادلة الاحتراق التام: ${eqCH4Complete}.\nالحلول: (1) توفير التهوية الكافية وتنظيف منافذ الموقد. (2) تركيب كاشف غاز أحادي أكسيد الكربون وإخراج المدخنة للخارج.`
				},
				{
					problemAr: `بماذا نكشف عن غاز ${spCO2} الناتج عن احتراق الفحم الخشبي (${spC})، وكيف تتغير سرعة اشتعال الفحم عند التهوية بمروحة يدوية؟`,
					solutionAr: `نكشف عن ${spCO2} بتمريره في **رائق الكلس** فيتعكر. عند التهوية تزداد كمية ${spO2} المتوفرة (عامل تركيب المتفاعلات) فيزداد توهج الفحم وتسرع عملية الاحتراق.`
				}
			],
			watchOutAr:
				'في الوضعية الإدماجية، اربط دائماً الإجابة بالسندات المرفقة في التمرين ولا تنسَ كتابة الحالة الفيزيائية في المعادلات الكيميائية، والتمييز بين فقاعات السلسلة الوظيفية.'
		},
		practice: [
			{
				questionAr: `في مدفأة تعمل بغاز البوتان (${spC4H10})، ما المعادلة المتوازنة للاحتراق التام بعد تنظيف فتحة التهوية؟`,
				options: [
					eqC4H10Unbalanced,
					eqC4H10Complete,
					chemEquation(
						[
							{ coeff: 1, formula: 'C4H10', state: 'g' },
							{ coeff: 6, formula: 'O2', state: 'g' }
						],
						[
							{ coeff: 4, formula: 'CO2', state: 'g' },
							{ coeff: 5, formula: 'H2O', state: 'l' }
						]
					).katex,
					chemEquation(
						[
							{ coeff: 2, formula: 'C4H10', state: 'g' },
							{ coeff: 9, formula: 'O2', state: 'g' }
						],
						[
							{ coeff: 8, formula: 'CO', state: 'g' },
							{ coeff: 10, formula: 'H2O', state: 'l' }
						]
					).katex
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'المعادلة غير متوازنة إطلاقاً.',
					`أحسنت! ${eqC4H10Complete} تحقق انحفاظ C (8)، H (20)، و O (26).`,
					'في اليسار 12 ذرة أكسجين، بينما في اليمين 13 ذرة أكسجين.',
					'هذه معادلة احتراق غير تام لأنها تنتج CO وليس CO₂.'
				],
				explanationAr: `بموازنة $\\text{C}_4\\text{H}_{10} + \\frac{13}{2}\\text{O}_2 \\rightarrow 4\\text{CO}_2 + 5\\text{H}_2\\text{O}$ ثم الضرب في 2 نحصل على ${eqC4H10Complete}.`
			},
			{
				questionAr:
					'في السلسلة الوظيفية لمولد كهربائي محمول يعمل بالبنزين: `بنزين + هواء ← محرك حراري ← منوبة ← مصباح`. ما فعلا الحالة والأداء الخاصان بـ `محرك حراري`؟',
				options: [
					'الحالة: يتوهج | الأداء نحو المنوبة: يغذي',
					'الحالة: يدور | الأداء نحو المنوبة: يدير',
					'الحالة: يحترق | الأداء نحو المنوبة: يسخن',
					'الحالة: يتدفق | الأداء نحو المنوبة: يضيء'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'التوهج والتغذية من خصائص المصباح والمنوبة.',
					'ممتاز! المحرك الحراري يدور بفعل احتراق البنزين والهواء، ثم يدير محور المنوبة.',
					'البنزين والهواء هما اللذان يحترقان وليس المحرك.',
					'الماء يتدفق والمصباح يضيء.'
				],
				explanationAr:
					'داخل المحرك الحراري يحترق المزيج فيدور المحرك (فعل حالة)، ثم يُدير المنوبة (فعل أداء).'
			},
			{
				questionAr:
					'أي إجراء يومي يساعد في زيادة سرعة اشتعال الخشب في مدفأة تقليدية اعتماداً على عامل «سطح التلامس»؟',
				options: [
					'رش الخشب بالماء البارد',
					'تقطيع جذوع الخشب الكبيرة إلى شظايا رقيقة قبل إشعالها',
					'إغلاق باب الموقد لمنع دخول الهواء',
					'وضع جذع واحد كبير مبلل'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الماء البارد يخفض الحرارة ويعيق الاحتراق.',
					'صحيح! التقطيع يزيد من سطح التلامس بين الخشب وغاز ثنائي الأكسجين فيتسارع الاحتراق.',
					'إغلاق الهواء ينقص الأكسجين ويؤدي لاحتراق غير تام.',
					'الجذع الكبير له سطح تلامس أصغر.'
				],
				explanationAr:
					'تجزئة المادة الصلبة تزيد من سطح التلامس مع المتفاعل الغازي ($\\text{O}_2$) مما يرفع سرعة التحول الكيميائي.'
			}
		]
	}
];
