import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import {
	chemEquation,
	chemSpecies,
	typstChemFormula,
	type ChemState,
	type DualText
} from '../../chem-helpers';
import { savePhysicsSvgAsset, svgElectrolysisCell, wrapPhysicsSvg } from '../../svg-physics';

function ionicSolutionDual(
	cationCoeff: number,
	cationFormula: string,
	anionCoeff: number,
	anionFormula: string,
	state: ChemState = 'aq'
): DualText {
	const cPre = cationCoeff > 1 ? `${cationCoeff}` : '';
	const aPre = anionCoeff > 1 ? `${anionCoeff}` : '';
	const katex = `$(\\ce{${cPre}${cationFormula} + ${aPre}${anionFormula}})_{(${state})}$`;
	const typst = `$(${cPre ? `${cPre} ` : ''}${typstChemFormula(cationFormula)} + ${aPre ? `${aPre} ` : ''}${typstChemFormula(anionFormula)})_("${state}")$`;
	return { katex, typst };
}

function buildConductivityCircuitSvg(solAName: string, solBName: string): string {
	let body = '';
	body += `<rect x="8" y="8" width="344" height="194" rx="8" fill="#f8fafc" stroke="#334155" stroke-width="1.5"/>`;
	body += `<text x="180" y="28" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">اختبار الناقلية الكهربائية للمحاليل</text>`;
	// Beaker 1 (Molecular - unlit)
	body += `<rect x="26" y="88" width="136" height="72" fill="#ffffff" stroke="#334155" stroke-width="1.5"/>`;
	body += `<rect x="27" y="114" width="134" height="45" fill="#f1f5f9"/>`;
	body += `<rect x="58" y="98" width="8" height="46" fill="#334155"/>`;
	body += `<rect x="122" y="98" width="8" height="46" fill="#334155"/>`;
	body += `<polyline fill="none" stroke="#0f172a" stroke-width="1.5" points="62,98 62,56 86,56"/>`;
	body += `<polyline fill="none" stroke="#0f172a" stroke-width="1.5" points="126,98 126,56 102,56"/>`;
	body += `<circle cx="94" cy="56" r="10" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.5"/>`;
	body += `<text x="94" y="78" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#dc2626">المصباح منطفيء</text>`;
	body += `<text x="94" y="142" text-anchor="middle" font-size="10" font-weight="bold" fill="#334155">${solAName}</text>`;
	body += `<text x="94" y="182" text-anchor="middle" font-size="10" font-weight="bold" fill="#b91c1c">وعاء (1)</text>`;

	// Beaker 2 (Ionic - lit)
	body += `<rect x="198" y="88" width="136" height="72" fill="#ffffff" stroke="#334155" stroke-width="1.5"/>`;
	body += `<rect x="199" y="114" width="134" height="45" fill="#dbeafe"/>`;
	body += `<rect x="230" y="98" width="8" height="46" fill="#334155"/>`;
	body += `<rect x="294" y="98" width="8" height="46" fill="#334155"/>`;
	body += `<polyline fill="none" stroke="#0f172a" stroke-width="1.5" points="234,98 234,56 258,56"/>`;
	body += `<polyline fill="none" stroke="#0f172a" stroke-width="1.5" points="298,98 298,56 274,56"/>`;
	body += `<circle cx="266" cy="56" r="10" fill="#fde047" stroke="#ca8a04" stroke-width="1.8"/>`;
	body += `<text x="266" y="78" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#15803d">المصباح متوهج</text>`;
	body += `<text x="266" y="142" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e3a8a">${solBName}</text>`;
	body += `<text x="266" y="182" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">وعاء (2)</text>`;

	return wrapPhysicsSvg(360, 210, body);
}

function buildReactionAndTestsSvg(metalName: string, acidOrSalt: string, gasOrPrecip: string, colorFill: string): string {
	let body = '';
	body += `<rect x="8" y="8" width="344" height="194" rx="8" fill="#f8fafc" stroke="#334155" stroke-width="1.5"/>`;
	body += `<text x="180" y="28" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">تفاعل ${metalName} مع ${acidOrSalt}</text>`;
	// Left test tube: reaction
	body += `<rect x="64" y="54" width="46" height="114" rx="20" fill="#ffffff" stroke="#334155" stroke-width="1.8"/>`;
	body += `<rect x="65" y="102" width="44" height="64" rx="14" fill="${colorFill}"/>`;
	body += `<rect x="78" y="146" width="18" height="10" rx="2" fill="#475569"/>`;
	body += `<circle cx="82" cy="128" r="2.5" fill="#ffffff"/><circle cx="92" cy="116" r="2.5" fill="#ffffff"/>`;
	body += `<text x="87" y="186" text-anchor="middle" font-size="10" font-weight="bold" fill="#0f172a">${metalName} + ${acidOrSalt}</text>`;

	// Right test tube: ion test
	body += `<rect x="234" y="54" width="46" height="114" rx="20" fill="#ffffff" stroke="#334155" stroke-width="1.8"/>`;
	body += `<rect x="235" y="102" width="44" height="64" rx="14" fill="#e2e8f0"/>`;
	body += `<rect x="239" y="138" width="36" height="24" rx="8" fill="${colorFill}" stroke="#334155" stroke-width="1"/>`;
	body += `<text x="257" y="47" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">رائز الكشف ↓</text>`;
	body += `<text x="257" y="186" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e3a8a">${gasOrPrecip}</text>`;

	return wrapPhysicsSvg(360, 210, body);
}

function buildWeightEquilibriumSvg(mode: 'hanging' | 'table', massLabel: string, pLabel: string): string {
	let body = '';
	body += `<defs><marker id="wR" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626"/></marker><marker id="wG" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#059669"/></marker></defs>`;
	body += `<rect x="8" y="8" width="324" height="194" rx="8" fill="#f8fafc" stroke="#334155" stroke-width="1.5"/>`;
	if (mode === 'hanging') {
		body += `<text x="170" y="28" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">توازن جسم معلق (m = ${massLabel})</text>`;
		body += `<line x1="115" y1="44" x2="225" y2="44" stroke="#334155" stroke-width="2.5"/>`;
		body += `<rect x="161" y="44" width="18" height="28" rx="3" fill="#e2e8f0" stroke="#334155" stroke-width="1.4"/>`;
		body += `<line x1="170" y1="72" x2="170" y2="100" stroke="#475569" stroke-width="1.8"/>`;
		body += `<rect x="145" y="100" width="50" height="36" rx="4" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.6"/>`;
		body += `<circle cx="170" cy="118" r="3" fill="#dc2626"/>`;
		body += `<text x="180" y="122" font-size="10.5" font-weight="bold">G</text>`;
		body += `<line x1="170" y1="118" x2="170" y2="170" stroke="#dc2626" stroke-width="2.2" marker-end="url(#wR)"/>`;
		body += `<text x="180" y="168" font-size="11" font-weight="bold" fill="#dc2626">P = ${pLabel}</text>`;
		body += `<line x1="170" y1="100" x2="170" y2="52" stroke="#059669" stroke-width="2.2" marker-end="url(#wG)"/>`;
		body += `<text x="185" y="66" font-size="11" font-weight="bold" fill="#059669">T</text>`;
	} else {
		body += `<text x="170" y="28" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">توازن جسم على طاولة أفقية (m = ${massLabel})</text>`;
		body += `<line x1="65" y1="136" x2="275" y2="136" stroke="#334155" stroke-width="2.8"/>`;
		body += `<rect x="140" y="96" width="60" height="40" rx="4" fill="#fde68a" stroke="#b45309" stroke-width="1.6"/>`;
		body += `<circle cx="170" cy="116" r="3" fill="#dc2626"/>`;
		body += `<text x="180" y="120" font-size="10.5" font-weight="bold">G</text>`;
		body += `<line x1="170" y1="116" x2="170" y2="172" stroke="#dc2626" stroke-width="2.2" marker-end="url(#wR)"/>`;
		body += `<text x="180" y="170" font-size="11" font-weight="bold" fill="#dc2626">P = ${pLabel}</text>`;
		body += `<line x1="170" y1="136" x2="170" y2="76" stroke="#059669" stroke-width="2.2" marker-end="url(#wG)"/>`;
		body += `<text x="180" y="80" font-size="11" font-weight="bold" fill="#059669">R</text>`;
	}
	return wrapPhysicsSvg(340, 210, body);
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. Ionic vs Molecular Solutions & Formulas (6 pts)
// ═══════════════════════════════════════════════════════════════════════════
const ionicFormulasTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_4am_t2_ionic_formulas',
	grade: '4am',
	trimesterId: 't2',
	domain: 'matter',
	titleAr: 'المحلول الشاردي والجزيئي والصيغة الشاردية والإحصائية',
	curriculumLessonId: 'phy_lesson_4am_t2_ions_ionic_solutions',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const salts = [
			{
				name: 'كلور الحديد الثنائي',
				catCoeff: 1,
				cat: 'Fe^2+',
				anCoeff: 2,
				an: 'Cl-',
				stat: 'FeCl2',
				wrongIon: '(\\ce{Fe^2+ + Cl-})_{(aq)}'
			},
			{
				name: 'كلور الألمنيوم',
				catCoeff: 1,
				cat: 'Al^3+',
				anCoeff: 3,
				an: 'Cl-',
				stat: 'AlCl3',
				wrongIon: '(\\ce{Al^3+ + Cl-})_{(aq)}'
			},
			{
				name: 'كبريتات النحاس الثنائي',
				catCoeff: 1,
				cat: 'Cu^2+',
				anCoeff: 1,
				an: 'SO4^2-',
				stat: 'CuSO4',
				wrongIon: '(\\ce{Cu^2+ + 2SO4^2-})_{(aq)}'
			},
			{
				name: 'كلور الزنك',
				catCoeff: 1,
				cat: 'Zn^2+',
				anCoeff: 2,
				an: 'Cl-',
				stat: 'ZnCl2',
				wrongIon: '(\\ce{2Zn^2+ + Cl-})_{(aq)}'
			},
			{
				name: 'كبريتات الحديد الثلاثي',
				catCoeff: 2,
				cat: 'Fe^3+',
				anCoeff: 3,
				an: 'SO4^2-',
				stat: 'Fe2(SO4)3',
				wrongIon: '(\\ce{Fe^3+ + SO4^2-})_{(aq)}'
			}
		];
		const pool = difficulty === 'easy' ? salts.slice(0, 4) : salts;
		const salt = rng.pick(pool);
		const solDual = ionicSolutionDual(salt.catCoeff, salt.cat, salt.anCoeff, salt.an, 'aq');
		const statDual = chemSpecies(salt.stat, 's');
		const catDual = chemSpecies(salt.cat);
		const anDual = chemSpecies(salt.an);

		const molName = rng.pick(['الماء المقطر + السكر', 'محلول الغلوكوز', 'الماء المقطر النقي']);
		const svg = buildConductivityCircuitSvg(molName, salt.name);
		const imageUrl = savePhysicsSvgAsset(`phy_4am_t2_ion_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`${solDual.katex} و ${statDual.katex}`,
			[
				{
					text: `$${salt.wrongIon}$ و ${statDual.katex}`,
					diagnosticFeedback: 'تحقق من مبدأ التعادل الكهربائي: مجموع الشحنات الموجبة يجب أن يساوي مجموع الشحنات السالبة بالقيمة المطلقة.'
				},
				{
					text: `${solDual.katex} و $\\ce{${salt.stat.replace(/[0-9]/g, '')}(s)}$`,
					diagnosticFeedback: 'في الصيغة الإحصائية لا بد من كتابة الأعداد السفلية التي تحقق التعادل الكهربائي.'
				},
				{
					text: `${statDual.katex} و ${solDual.katex}`,
					diagnosticFeedback: 'عكست الترتيب: الصيغة الشاردية تُبرز الشوارد الموجبة والسالبة، أما الصيغة الإحصائية فتُكتب دون شحنات.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `ما هما الصيغتان الشاردية والإحصائية على الترتيب لمحلول وملح **${salt.name}** المتعادل كهربائياً؟`,
				questionTextAr: `حدد الصيغتين الشاردية والإحصائية لـ ${salt.name}:`,
				imageUrl,
				imageCaption: 'اختبار الناقلية الكهربائية',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `يتكوّن ${salt.name} من شاردتي ${catDual.katex} و${anDual.katex}، وبالتعادل الكهربائي تكون الصيغة الشاردية ${solDual.katex} والإحصائية ${statDual.katex}.`
			},
			sujetExercise: {
				points: 6,
				instruction: `أنجز تلميذ دارة كهربائية لاختبار الناقلية الكهربائية لوعاءين: الوعاء (1) يحتوي على (${molName})، والوعاء (2) يحتوي على محلول (${salt.name})، كما يوضح الشكل المقابل:`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) صنّف محتوى الوعاء (1) والوعاء (2) إلى محلول جزيئي ومحلول شاردي، وفسّر سبب توهج المصباح في الوعاء (2) فقط.`,
								answer: `1) الوعاء (1) محلول جزيئي (يحتوي على جزيئات متعادلة كهربائياً لا تنقل التيار).\n\nالوعاء (2) محلول شاردي يتوهج فيه المصباح بسبب الهجرة المزدوجة للشوارد الموجبة والسالبة الحرة نحو المسريين.`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'التركيب التجريبي للناقلية'
							}
						]
					},
					{
						type: 'text',
						content: `2) اكتب الصيغة الشاردية لمحلول (${salt.name}) المكون من الشاردتين ${catDual.typst} و${anDual.typst} مبرزاً تحقق مبدأ التعادل الكهربائي.`,
						answer: `2) الصيغة الشاردية هي ${solDual.typst}؛ ويتحقق التعادل الكهربائي لأن مجموع الشحنات الموجبة يساوي مجموع الشحنات السالبة بالقيمة المطلقة ($0$).`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) استنتج الصيغة الإحصائية لملح (${salt.name}) الصلب.`,
						answer: `3) الصيغة الإحصائية هي: ${statDual.typst}.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) حدّد جهة انتقال كل من الشوارد الموجبة ${catDual.typst} والشوارد السالبة ${anDual.typst} داخل الوعاء (2) عند غلق القاطعة.`,
						answer: `4) تهاجر الشوارد الموجبة ${catDual.typst} نحو المهبط (المتصل بالقطب السالب)، وتهاجر الشوارد السالبة ${anDual.typst} نحو المصعد (المتصل بالقطب الموجب).`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'المحلول الجزيئي لا يحتوي على شوارد حرة فلا ينقل التيار؛ الشاردي ينقل التيار بهجرة الشوارد.',
				'مبدأ التعادل الكهربائي: $n_+ \\cdot q_+ + n_- \\cdot q_- = 0$.',
				'في الصيغة الإحصائية تحذف الشحنات وتكتب الأعداد كدلائل سفلية.'
			],
			solutionStepsAr: [
				'الوعاء (1) جزيئي، والوعاء (2) شاردي ناقل للتيار.',
				`الصيغة الشاردية: ${solDual.katex}.`,
				`الصيغة الإحصائية: ${statDual.katex}.`,
				`هجرة ${catDual.katex} للمهبط وهجرة ${anDual.katex} للمصعد.`
			],
			finalAnswer: `${salt.stat}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════
// 2. Simple Electrolysis (6 pts)
// ═══════════════════════════════════════════════════════════════════════════
const electrolysisTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_4am_t2_electrolysis',
	grade: '4am',
	trimesterId: 't2',
	domain: 'matter',
	titleAr: 'التحليل الكهربائي البسيط لمحلول شاردي',
	curriculumLessonId: 'phy_lesson_4am_t2_simple_electrolysis',
	defaultPoints: 6,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cells = [
			{
				name: 'كلور الزنك',
				catCoeff: 1,
				cat: 'Zn^2+',
				anCoeff: 2,
				an: 'Cl-',
				stat: 'ZnCl2',
				cathodeProd: 'Zn',
				cathodeState: 's' as const,
				cathodeObs: 'ترسّب شعيرات معدنية رمادية لمعدن الزنك',
				cathodeEqK: '$\\ce{Zn^2+(aq) + 2e- -> Zn(s)}$',
				cathodeEqT: '$"Zn"^(2+) ("aq") + 2 e^- arrow.r "Zn" ("s")$',
				overallK: chemEquation(
					[{ formula: 'Zn^2+', state: 'aq' }, { coeff: 2, formula: 'Cl-', state: 'aq' }],
					[{ formula: 'Zn', state: 's' }, { formula: 'Cl2', state: 'g' }]
				).katex,
				overallT: `$("Zn"^(2+) + 2 "Cl"^-)_("aq") arrow.r "Zn" ("s") + "Cl"_2 ("g")$`,
				overallStatT: `$"ZnCl"_2 ("aq") arrow.r "Zn" ("s") + "Cl"_2 ("g")$`,
				solLabel: '(Zn²⁺ + 2Cl⁻)',
				cathLabel: 'ترسب Zn'
			},
			{
				name: 'كلور النحاس الثنائي',
				catCoeff: 1,
				cat: 'Cu^2+',
				anCoeff: 2,
				an: 'Cl-',
				stat: 'CuCl2',
				cathodeProd: 'Cu',
				cathodeState: 's' as const,
				cathodeObs: 'ترسّب طبقة حمراء لمعدن النحاس',
				cathodeEqK: '$\\ce{Cu^2+(aq) + 2e- -> Cu(s)}$',
				cathodeEqT: '$"Cu"^(2+) ("aq") + 2 e^- arrow.r "Cu" ("s")$',
				overallK: chemEquation(
					[{ formula: 'Cu^2+', state: 'aq' }, { coeff: 2, formula: 'Cl-', state: 'aq' }],
					[{ formula: 'Cu', state: 's' }, { formula: 'Cl2', state: 'g' }]
				).katex,
				overallT: `$("Cu"^(2+) + 2 "Cl"^-)_("aq") arrow.r "Cu" ("s") + "Cl"_2 ("g")$`,
				overallStatT: `$"CuCl"_2 ("aq") arrow.r "Cu" ("s") + "Cl"_2 ("g")$`,
				solLabel: '(Cu²⁺ + 2Cl⁻)',
				cathLabel: 'ترسب Cu'
			},
			{
				name: 'حمض كلور الماء',
				catCoeff: 1,
				cat: 'H+',
				anCoeff: 1,
				an: 'Cl-',
				stat: 'HCl',
				cathodeProd: 'H2',
				cathodeState: 'g' as const,
				cathodeObs: 'انطلاق فقاعات غاز ثنائي الهيدروجين (يحدث فرقعة)',
				cathodeEqK: '$\\ce{2H+(aq) + 2e- -> H2(g)}$',
				cathodeEqT: '$2 "H"^+ ("aq") + 2 e^- arrow.r "H"_2 ("g")$',
				overallK: '$\\ce{2(H+ + Cl-)(aq) -> H2(g) + Cl2(g)}$',
				overallT: `$2("H"^+ + "Cl"^-)_("aq") arrow.r "H"_2 ("g") + "Cl"_2 ("g")$`,
				overallStatT: `$2 "HCl" ("aq") arrow.r "H"_2 ("g") + "Cl"_2 ("g")$`,
				solLabel: '(H⁺ + Cl⁻)',
				cathLabel: 'غاز H₂ ↑'
			}
		];
		const c = difficulty === 'easy' ? cells[0] : rng.pick(cells);
		const solDual = ionicSolutionDual(c.catCoeff, c.cat, c.anCoeff, c.an, 'aq');
		const svg = svgElectrolysisCell({
			solutionLabel: c.solLabel,
			anodeGas: 'غاز Cl₂ ↑',
			cathodeLabel: c.cathLabel
		});
		const imageUrl = savePhysicsSvgAsset(`phy_4am_t2_elec_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			c.cathodeEqK,
			[
				{
					text: '$\\ce{2Cl-(aq) -> Cl2(g) + 2e-}$',
					diagnosticFeedback: 'هذه المعادلة النصفية تحدث عند **المصعد** (القطب الموجب) وليس عند المهبط!'
				},
				{
					text: c.cathodeEqK.replace('+ 2e-', '->').replace('->', '+ 2e-'),
					diagnosticFeedback: 'الشوارد الموجبة تكتسب إلكترونات عند المهبط ولا تفقدها.'
				},
				{
					text: '$\\ce{C(s) + 2e- -> C^2-(aq)}$',
					diagnosticFeedback: 'مسريا الغرافيت (الفحم) لا يتآكلان ولا يشاركان في التحليل الكهربائي البسيط.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `ننجز التحليل الكهربائي البسيط لمحلول **${c.name}** ${solDual.katex} بمسريين من الغرافيت. ما المعادلة النصفية الصحيحة عند **المهبط**؟`,
				questionTextAr: `ما المعادلة النصفية عند المهبط في التحليل الكهربائي لمحلول ${c.name}؟`,
				imageUrl,
				imageCaption: 'وعاء التحليل الكهربائي البسيط',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `عند المهبط (المتصل بالقطب السالب) تهاجر الشوارد الموجبة وتكتسب إلكترونات وفق: ${c.cathodeEqK}.`
			},
			sujetExercise: {
				points: 6,
				instruction: `نضع في وعاء تحليل كهربائي مسرياه من الغرافيت محلولاً مائياً لـ (${c.name}) صيغته الشاردية ${solDual.typst}، ثم نغلق القاطعة الموصولة بمولد تيار مستمر:`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) صف ما يحدث بجوار كل من المهبط (المتصل بالقطب السالب) والمصعد (المتصل بالقطب الموجب)، وكيف نكشف عن الغاز المنطلق عند المصعد؟`,
								answer: `1) عند المهبط: ${c.cathodeObs}.\n\nعند المصعد: انطلاق فقاعات غاز ثنائي الكلور $"Cl"_2$ ذي اللون الأصفر المخضر، ونكشف عنه بإزالة لون كاشف أزرق النيلة.`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'وعاء التحليل الكهربائي'
							}
						]
					},
					{
						type: 'text',
						content: `2) اكتب المعادلة الكيميائية النصفية عند كل مسرى مبرزاً انحفاظ الشحنة الكهربائية.`,
						answer: `2) عند المهبط: ${c.cathodeEqT}\n\nعند المصعد: $2 "Cl"^- ("aq") arrow.r "Cl"_2 ("g") + 2 e^-$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) استنتج المعادلة الإجمالية للتحليل الكهربائي البسيط بالصيغة الشاردية ثم بالصيغة الإحصائية.`,
						answer: `3) بالصيغة الشاردية: ${c.overallT}\n\nبالصيغة الإحصائية: ${c.overallStatT}`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) لماذا نستعمل مسريين من الغرافيت وتياراً مستمراً في هذه التجربة؟`,
						answer: `4) نستعمل مسريين من الغرافيت لأنهما ناقلان خاملان لا يتآكلان ولا يتفاعلان مع المحلول، ونستعمل تياراً مستمراً لتثبيت قطبية المهبط والمصعد وفصل النواتج عند كل مسرى.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'المهبط متصل بالقطب السالب فتتجه إليه الشوارد الموجبة، والمصعد متصل بالموجب فتتجه إليه الشوارد السالبة.',
				'عند المصعد تفقد شاردتا $\\text{Cl}^-$ إلكترونين لتعطي غاز $\\text{Cl}_2$ الذي يزيل لون أزرق النيلة.',
				'في المعادلة الإجمالية تختزل الإلكترونات بين المعادلتين النصفيتين.'
			],
			solutionStepsAr: [
				`عند المهبط: ${c.cathodeObs}، وعند المصعد: انطلاق غاز $\\text{Cl}_2$ الذي يزيل أزرق النيلة.`,
				`المعادلتان النصفيتان: ${c.cathodeEqK} و$\\ce{2Cl-(aq) -> Cl2(g) + 2e-}$.`,
				`المعادلة الإجمالية: ${c.overallK}.`,
				'الغرافيت خامل لا يتآكل، والتيار المستمر يثبت القطبين.'
			],
			finalAnswer: c.cathodeProd
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════
// 3. Chemical Reactions in Ionic Solutions & Ion Detection (6 pts)
// ═══════════════════════════════════════════════════════════════════════════
const reactionsIonTestsTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_4am_t2_reactions_ion_tests',
	grade: '4am',
	trimesterId: 't2',
	domain: 'matter',
	titleAr: 'التفاعلات الكيميائية في المحاليل الشاردية والكشف عن الشوارد',
	curriculumLessonId: 'phy_lesson_4am_t2_chemical_reactions_ionic_solutions',
	defaultPoints: 6,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const rxns = [
			{
				metal: 'الحديد',
				metalSym: 'Fe',
				reactantName: 'حمض كلور الماء',
				colorFill: '#86efac',
				gasOrPrecip: 'راسب أخضر (Fe²⁺)',
				reagent: 'هيدروكسيد الصوديوم NaOH',
				testRes: 'راسب أخضر يدل على شوارد الحديد الثنائي Fe²⁺',
				gasName: 'غاز ثنائي الهيدروجين H₂ (فرقعة بلهب)',
				eqK: '$\\ce{Fe(s) + 2(H+ + Cl-)(aq) -> (Fe^2+ + 2Cl-)(aq) + H2(g)}$',
				eqT: `$"Fe" ("s") + 2("H"^+ + "Cl"^-)_("aq") arrow.r ("Fe"^(2+) + 2 "Cl"^-)_("aq") + "H"_2 ("g")$`,
				statT: `$"Fe" ("s") + 2 "HCl" ("aq") arrow.r "FeCl"_2 ("aq") + "H"_2 ("g")$`,
				secondTest: 'نترات الفضة AgNO₃ → راسب أبيض يسود في الضوء (Cl⁻)'
			},
			{
				metal: 'الزنك',
				metalSym: 'Zn',
				reactantName: 'حمض كلور الماء',
				colorFill: '#e2e8f0',
				gasOrPrecip: 'راسب أبيض هلامي (Zn²⁺)',
				reagent: 'هيدروكسيد الصوديوم NaOH',
				testRes: 'راسب أبيض هلامي يدل على شوارد الزنك Zn²⁺',
				gasName: 'غاز ثنائي الهيدروجين H₂ (فرقعة بلهب)',
				eqK: '$\\ce{Zn(s) + 2(H+ + Cl-)(aq) -> (Zn^2+ + 2Cl-)(aq) + H2(g)}$',
				eqT: `$"Zn" ("s") + 2("H"^+ + "Cl"^-)_("aq") arrow.r ("Zn"^(2+) + 2 "Cl"^-)_("aq") + "H"_2 ("g")$`,
				statT: `$"Zn" ("s") + 2 "HCl" ("aq") arrow.r "ZnCl"_2 ("aq") + "H"_2 ("g")$`,
				secondTest: 'نترات الفضة AgNO₃ → راسب أبيض يسود في الضوء (Cl⁻)'
			},
			{
				metal: 'الحديد',
				metalSym: 'Fe',
				reactantName: 'كبريتات النحاس الثنائي',
				colorFill: '#86efac',
				gasOrPrecip: 'راسب أخضر + نحاس أحمر',
				reagent: 'هيدروكسيد الصوديوم NaOH',
				testRes: 'راسب أخضر يدل على تشكل شوارد Fe²⁺',
				gasName: 'ترسب معدن النحاس الأحمر Cu واختفاء اللون الأزرق',
				eqK: '$\\ce{Fe(s) + (Cu^2+ + SO4^2-)(aq) -> (Fe^2+ + SO4^2-)(aq) + Cu(s)}$',
				eqT: `$"Fe" ("s") + ("Cu"^(2+) + "SO"_4^(2-))_("aq") arrow.r ("Fe"^(2+) + "SO"_4^(2-))_("aq") + "Cu" ("s")$`,
				statT: `$"Fe" ("s") + "CuSO"_4 ("aq") arrow.r "FeSO"_4 ("aq") + "Cu" ("s")$`,
				secondTest: 'كلور الباريوم BaCl₂ → راسب أبيض يدل على الكبريتات SO₄²⁻'
			},
			{
				metal: 'كربونات الكالسيوم',
				metalSym: 'CaCO₃',
				reactantName: 'حمض كلور الماء',
				colorFill: '#e2e8f0',
				gasOrPrecip: 'راسب أبيض يسود (Cl⁻)',
				reagent: 'نترات الفضة AgNO₃',
				testRes: 'راسب أبيض يسود في الضوء يدل على شوارد الكلور Cl⁻',
				gasName: 'غاز ثنائي أكسيد الكربون CO₂ (يعكّر رائق الكلس)',
				eqK: '$\\ce{CaCO3(s) + 2(H+ + Cl-)(aq) -> (Ca^2+ + 2Cl-)(aq) + H2O(l) + CO2(g)}$',
				eqT: `$"CaCO"_3 ("s") + 2("H"^+ + "Cl"^-)_("aq") arrow.r ("Ca"^(2+) + 2 "Cl"^-)_("aq") + "H"_2 "O" ("l") + "CO"_2 ("g")$`,
				statT: `$"CaCO"_3 ("s") + 2 "HCl" ("aq") arrow.r "CaCl"_2 ("aq") + "H"_2 "O" ("l") + "CO"_2 ("g")$`,
				secondTest: 'تعكير رائق الكلس يؤكد انطلاق غاز CO₂'
			}
		];
		const r = difficulty === 'easy' ? rxns[0] : rng.pick(rxns);
		const svg = buildReactionAndTestsSvg(r.metal, r.reactantName, r.gasOrPrecip, r.colorFill);
		const imageUrl = savePhysicsSvgAsset(`phy_4am_t2_rxn_${difficulty}_s${seed}`, svg);

		const wrongPool = rxns.filter((x) => x.eqK !== r.eqK);
		const mcq = buildUniqueMcqOptions(
			r.eqK,
			[
				{
					text: wrongPool[0].eqK,
					diagnosticFeedback: 'تحقق من المتفاعلات المعطاة في نص التمرين!'
				},
				{
					text: wrongPool[1].eqK,
					diagnosticFeedback: 'انتبه لنوع المعدن أو الملح المشارك في التفاعل.'
				},
				{
					text: r.eqK.replace('2(', '(').replace('H2(g)', 'H(g)'),
					diagnosticFeedback: 'المعادلة غير متوازنة في عدد الذرات والشحنة الكهربائية.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `نضع كمية من **${r.metal}** في أنبوب يحتوي على محلول **${r.reactantName}**. ما المعادلة الكيميائية المتوازنة بالصيغة الشاردية؟`,
				questionTextAr: `اختر المعادلة الشاردية المتوازنة لتفاعل ${r.metal} مع ${r.reactantName}:`,
				imageUrl,
				imageCaption: 'تجربة التفاعل والكشف عن الشوارد',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `بتحقيق انحفاظ الذرات والشحنة، تكتب المعادلة بالصيغة الشاردية: ${r.eqK}.`
			},
			sujetExercise: {
				points: 6,
				instruction: `في حصة الأعمال المخبرية، وضع تلميذ عينة من ${r.metal} في أنبوب اختبار يحتوي على كمية كافية من ${r.reactantName}:`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) صف الملاحظات العيانية أثناء التفاعل، واذكر طريقة الكشف عن الناتج الغازي أو المعدني المترسب (${r.gasName.split(' ')[0]}).`,
								answer: `1) نلاحظ تآكلاً تدريجياً للـ${r.metal} و${r.gasName}.`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الأنبوب والكشف عن الشوارد'
							}
						]
					},
					{
						type: 'text',
						content: `2) اكتب معادلة التفاعل الكيميائي الحادث بالصيغة الشاردية ثم بالصيغة الإحصائية.`,
						answer: `2) الصيغة الشاردية: ${r.eqT}\n\nالصيغة الإحصائية: ${r.statT}`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) بعد نهاية التفاعل، أضفنا إلى عينة من المحلول الناتج قطرات من (${r.reagent}). ما لون الراسب المتشكل وما الشاردة المكشوف عنها؟`,
						answer: `3) يتكوّن ${r.testRes}.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) اذكر كاشفاً إضافياً للتحقق من الشاردة أو الغاز الآخر الناتج في التجربة.`,
						answer: `4) ${r.secondTest}.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'تحقق من توازن الذرات (الكتلة) ومجموع الشحنات في طرفي المعادلة.',
				'تذكّر: $\\text{H}_2$ يحدث فرقعة، و$\\text{CO}_2$ يعكّر رائق الكلس.',
				'نترات الفضة يكشف عن $\\text{Cl}^-$، كلور الباريوم عن $\\text{SO}_4^{2-}$، وهيدروكسيد الصوديوم عن الشوارد المعدنية.'
			],
			solutionStepsAr: [
				r.gasName,
				`المعادلة الشاردية: ${r.eqK}`,
				r.testRes,
				r.secondTest
			],
			finalAnswer: r.testRes
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════
// 4. Weight P = m*g & Two-Force Equilibrium (6 pts)
// ═══════════════════════════════════════════════════════════════════════════
const weightTwoForcesTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_4am_t2_weight_two_forces',
	grade: '4am',
	trimesterId: 't2',
	domain: 'mechanics',
	titleAr: 'الثقل (P = m·g) وتوازن جسم صلب خاضع لقوتين',
	curriculumLessonId: 'phy_lesson_4am_t2_weight_gravity_two_forces_equilibrium',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const mode = seed % 2 === 0 ? 'hanging' : 'table';
		const gVal = difficulty === 'hard' ? 9.8 : 10;
		const massGrams = rng.pick([200, 300, 400, 500, 600, 800, 1200]);
		const massKg = roundTo(massGrams / 1000, 2);
		const weightN = roundTo(massKg * gVal, 2);
		const scaleNPerCm = difficulty === 'hard' ? roundTo(weightN / 2.5, 2) : roundTo(weightN / 2, 2);
		const vecLenCm = roundTo(weightN / scaleNPerCm, 1);

		const svg = buildWeightEquilibriumSvg(mode, `${massGrams} g`, `${weightN} N`);
		const imageUrl = savePhysicsSvgAsset(`phy_4am_t2_wt_${difficulty}_s${seed}`, svg);
		const otherForceSym = mode === 'hanging' ? 'T' : 'R';
		const otherForceName = mode === 'hanging' ? 'توتر الخيط' : 'رد فعل الطاولة';

		const mcq = buildUniqueMcqOptions(
			`$P = ${weightN}\\text{ N}$ و $${otherForceSym} = ${weightN}\\text{ N}$ (نفس الحامل وجهتان متعاكستان)`,
			[
				{
					text: `$P = ${roundTo(massGrams * gVal, 0)}\\text{ N}$ و $${otherForceSym} = ${roundTo(massGrams * gVal, 0)}\\text{ N}$`,
					diagnosticFeedback: 'نسيت تحويل الكتلة من الغرام ($\\text{g}$) إلى الكيلوغرام ($\\text{kg}$) قبل حساب $P = m \\cdot g$!'
				},
				{
					text: `$P = ${weightN}\\text{ N}$ و $${otherForceSym} = ${roundTo(weightN / 2, 2)}\\text{ N}$`,
					diagnosticFeedback: 'في توازن جسم خاضع لقوتين، شدتا القوتين متساويتان تماماً ($P = ' + otherForceSym + '$).'
				},
				{
					text: `$P = ${massKg}\\text{ N}$ و $${otherForceSym} = ${massKg}\\text{ N}$`,
					diagnosticFeedback: `$${massKg}\\text{ kg}$ هي الكتلة؛ يجب ضربها في الجاذبية $g = ${gVal}\\text{ N/kg}$ لإيجاد الثقل بالنيوتن.`
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `جسم صلب $(S)$ كتلته $m = ${massGrams}\\text{ g}$ ${mode === 'hanging' ? 'معلق بخيط شاقولي' : 'موضوع على طاولة أفقية'} في حالة توازن ($g = ${gVal}\\text{ N/kg}$). ما شدة ثقله $P$ وشدة قوة ${otherForceName} $${otherForceSym}$؟`,
				questionTextAr: `جسم كتلته $${massGrams}\\text{ g}$ متوازن ($g = ${gVal}\\text{ N/kg}$). احسب $P$ و$${otherForceSym}$:`,
				imageUrl,
				imageCaption: 'جسم في حالة توازن تحت فعل قوتين',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نحوّل الكتلة: $m = ${massKg}\\text{ kg}$، ومنه $P = m \\cdot g = ${massKg} \\times ${gVal} = ${weightN}\\text{ N}$. وبما أن الجسم متوازن تحت فعل قوتين، فإن $${otherForceSym} = P = ${weightN}\\text{ N}$.`
			},
			sujetExercise: {
				points: 6,
				instruction: `نعتبر جسماً صلباً $(S)$ متجانساً كتلته $m = ${massGrams} " g"$، ${mode === 'hanging' ? 'معلقاً في طرف خيط شاقولي عديم الامتطاط' : 'موضوعاً فوق سطح طاولة أفقية'} في حالة سكون وتوازن. تعطى الجاذبية الأرضية $g = ${gVal} " N/kg"$.`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) احسب شدة ثقل الجسم $P$ بالنيوتن (مع التحويل اللازم للكتلة).`,
								answer: `1) نحوّل الكتلة: $m = ${massGrams} " g" = ${massKg} " kg"$.\n\n$P = m times g = ${massKg} times ${gVal} = ${weightN} " N"$.`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'تمثيل الجملة الميكانيكية'
							}
						]
					},
					{
						type: 'text',
						content: `2) اذكر القوتين المؤثرتين على الجسم $(S)$ وصنّف كل فعل منهما إلى تلامسي أو بعدي.`,
						answer: `2) - ثقل الجسم $arrow(P)$: فعل بعدي (جذب الأرض للجسم).\n- ${otherForceName} $arrow(${otherForceSym})$: فعل تلامسي (${mode === 'hanging' ? 'موضعي' : 'موزع'}).`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) اذكر شرطي توازن الجسم $(S)$ واستنتج خصائص شعاع قوة ${otherForceName} $arrow(${otherForceSym})$.`,
						answer: `3) شرطا التوازن: للقوتين نفس الحامل، ونفس الشدة ومتعاكستان في الجهة ($arrow(P) + arrow(${otherForceSym}) = arrow(0)$).\n\nخصائص $arrow(${otherForceSym})$: المبدأ نقطة ${mode === 'hanging' ? 'ربط الخيط بالجسم' : 'مركز سطح التلامس'}، الحامل شاقولي، الجهة نحو الأعلى، والشدة $${otherForceSym} = P = ${weightN} " N"$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) احسب طول كل من الشعاعين $arrow(P)$ و$arrow(${otherForceSym})$ لتمثيلهما وفق سلم الرسم $1 " cm" arrow.r ${scaleNPerCm} " N"$.`,
						answer: `4) طول كل شعاع هو $L = frac(${weightN}, ${scaleNPerCm}) = ${vecLenCm} " cm"$ (شاقولياً نحو الأسفل لـ $arrow(P)$ ونحو الأعلى لـ $arrow(${otherForceSym})$).`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'حوّل الكتلة دائماً من الغرام إلى الكيلوغرام ($1\\text{ kg} = 1000\\text{ g}$) قبل ضربها في $g$.',
				'في التوازن تحت قوتين: $\\vec{P} + \\vec{' + otherForceSym + '} = \\vec{0}$.',
				'احسب الطول على الرسم بقسمة الشدة بالنيوتن على قيمة السلم.'
			],
			solutionStepsAr: [
				`$m = ${massKg}\\text{ kg}$ ومنه $P = ${weightN}\\text{ N}$.`,
				`الثقل فعل بعدي و${otherForceName} فعل تلامسي.`,
				`شرطا التوازن: نفس الحامل، $${otherForceSym} = P = ${weightN}\\text{ N}$، جهتان متعاكستان.`,
				`طول الشعاعين على الرسم: $${vecLenCm}\\text{ cm}$.`
			],
			finalAnswer: `P = ${weightN} N`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════
// 5. Integration 1: Pipe Corrosion & Ion Identification (8 pts)
// ═══════════════════════════════════════════════════════════════════════════
const integrationPipeCorrosionTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_4am_t2_integration_pipe_corrosion',
	grade: '4am',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: تآكل أنابيب معدنية وكشف الشوارد في المحاليل (BEM)',
	curriculumLessonId: 'phy_lesson_4am_t2_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cases = [
			{
				pipeMetal: 'الحديد',
				metalSym: 'Fe',
				acidOrSalt: 'حمض كلور الماء',
				colorFill: '#86efac',
				reagent1: 'هيدروكسيد الصوديوم NaOH (راسب أخضر)',
				reagent2: 'نترات الفضة AgNO₃ (راسب أبيض يسود في الضوء)',
				ionsAr: 'شوارد الحديد الثنائي Fe²⁺ وشوارد الكلور Cl⁻',
				gasAr: 'غاز ثنائي الهيدروجين H₂ (فرقعة عند تقريب لهب)',
				eqK: '$\\ce{Fe(s) + 2(H+ + Cl-)(aq) -> (Fe^2+ + 2Cl-)(aq) + H2(g)}$',
				eqT: `$"Fe" ("s") + 2("H"^+ + "Cl"^-)_("aq") arrow.r ("Fe"^(2+) + 2 "Cl"^-)_("aq") + "H"_2 ("g")$`,
				statT: `$"Fe" ("s") + 2 "HCl" ("aq") arrow.r "FeCl"_2 ("aq") + "H"_2 ("g")$`,
				solName: 'كلور الحديد الثنائي'
			},
			{
				pipeMetal: 'الزنك (أنبوب مجلفن)',
				metalSym: 'Zn',
				acidOrSalt: 'حمض كلور الماء',
				colorFill: '#e2e8f0',
				reagent1: 'هيدروكسيد الصوديوم NaOH (راسب أبيض هلامي)',
				reagent2: 'نترات الفضة AgNO₃ (راسب أبيض يسود في الضوء)',
				ionsAr: 'شوارد الزنك Zn²⁺ وشوارد الكلور Cl⁻',
				gasAr: 'غاز ثنائي الهيدروجين H₂ (فرقعة عند تقريب لهب)',
				eqK: '$\\ce{Zn(s) + 2(H+ + Cl-)(aq) -> (Zn^2+ + 2Cl-)(aq) + H2(g)}$',
				eqT: `$"Zn" ("s") + 2("H"^+ + "Cl"^-)_("aq") arrow.r ("Zn"^(2+) + 2 "Cl"^-)_("aq") + "H"_2 ("g")$`,
				statT: `$"Zn" ("s") + 2 "HCl" ("aq") arrow.r "ZnCl"_2 ("aq") + "H"_2 ("g")$`,
				solName: 'كلور الزنك'
			}
		];
		const c = rng.pick(cases);
		const svg = buildReactionAndTestsSvg(c.metalSym, 'HCl', c.solName, c.colorFill);
		const imageUrl = savePhysicsSvgAsset(`phy_4am_t2_int1_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`${c.ionsAr} والمحلول الناتج هو ${c.solName}`,
			[
				{
					text: 'شوارد النحاس الثنائي Cu²⁺ وشوارد الكبريتات SO₄²⁻',
					diagnosticFeedback: 'النحاس يعطي راسباً أزرق مع NaOH والكبريتات تتفاعل مع BaCl₂.'
				},
				{
					text: 'شوارد الحديد الثلاثي Fe³⁺ وشوارد الكلور Cl⁻',
					diagnosticFeedback: 'شاردة Fe³⁺ تعطي راسباً أحمر صدئاً مع NaOH.'
				},
				{
					text: 'جزيئات متعادلة لا تحتوي على شوارد',
					diagnosticFeedback: 'الرواسب المتشكلة مع الكواشف تثبت وجود شوارد معدنية وشوارد الكلور.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: 'integration',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `تآكل أنبوب مصنوع من **${c.pipeMetal}** بسبب محلول حمضي، فأعطت عينة من السائل الناتج مع ${c.reagent1}، ومع ${c.reagent2}. ما الشاردتان الموجودتان في المحلول الناتج؟`,
				questionTextAr: `حدّد الشاردتين الناتجتين من تآكل أنبوب ${c.pipeMetal}:`,
				imageUrl,
				imageCaption: 'تحليل سائل التآكل',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نتائج الكواشف تثبت وجود ${c.ionsAr}، وبالتالي فإن المحلول الناتج هو ${c.solName}.`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `استخدم عمال صيانة محلولاً منظفاً قوياً لتسليك قناة صرف مصنوعة من ${c.pipeMetal}، وبعد دقائق لاحظوا فوراناً وتصاعد غاز وبدء تآكل الأنبوب وظهور سائل جديد.\nللتعرف على طبيعة المنظف والمحلول الناتج، أُجريت الروائز الآتية:\n- الرائز (1): تقريب عود ثقاب مشتعل من الغاز المنطلق أحدث فرقعة خفيفة.\n- الرائز (2): إضافة ${c.reagent1} إلى عينة من السائل الناتج.\n- الرائز (3): إضافة ${c.reagent2} إلى عينة ثانية.`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) انطلاقاً من الرائز (1)، حدّد اسم الغاز المنطلق وصيغته الكيميائية، وفسّر سبب خطورة إشعال لهب قرب القناة.`,
								answer: `1) الغاز المنطلق هو ${c.gasAr}. وخطورة اللهب تكمن في قابلية غاز الهيدروجين للانفجار عند اختلاطه بالهواء.`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: تآكل الأنبوب والكشف'
							}
						]
					},
					{
						type: 'text',
						content: `2) بالاعتماد على الرائزين (2) و(3)، استنتج الشوارد الموجودة في المحلول الناتج، ثم استنتج اسم المحلول الحمضي المستعمل في التنظيف.`,
						answer: `2) يدل الرائزان على وجود ${c.ionsAr}، أي محلول ${c.solName}. وبما أن شوارد الكلور لم تتغير والمعدن تآكل، فإن المنظف هو ${c.acidOrSalt} ($("H"^+ + "Cl"^-)_("aq")$).`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) نمذج التحول الكيميائي الحادث بمعادلة كيميائية متوازنة بالصيغة الشاردية ثم بالصيغة الإحصائية.`,
						answer: `3) بالصيغة الشاردية: ${c.eqT}\n\nبالصيغة الإحصائية: ${c.statT}`,
						mark: '2'
					},
					{
						type: 'text',
						content: `4) قدّم نصيحتين تقنيتين لعمال الصيانة لتجنب تآكل الأنابيب المعدنية مستقلاً، مع ذكر مواد بديلة لا تتأثر بهذا الحمض.`,
						answer: `4) - عدم سكب الأحماض المركزة (مثل حمض كلور الماء) داخل القنوات المصنوعة من ${c.pipeMetal}.\n- استبدال الأنابيب بأنابيب بلاستيكية ("PVC") أو نحاسية (فالنحاس لا يتفاعل مع حمض كلور الماء) أو تغليفها بطلاء عازل مقاوم للأحماض.`,
						mark: '2'
					}
				]
			},
			hints: [
				'الفرقعة عند اللهب تميّز غاز الهيدروجين $\\text{H}_2$.',
				'نترات الفضة يكشف عن $\\text{Cl}^-$، وهيدروكسيد الصوديوم عن الشاردة المعدنية.',
				'تذكّر أن البلاستيك والزجاج والنحاس لا تتفاعل مع حمض كلور الماء.'
			],
			solutionStepsAr: [
				`الغاز المنطلق هو ${c.gasAr}.`,
				`الشوارد الناتجة: ${c.ionsAr}، والمنظف هو ${c.acidOrSalt}.`,
				`المعادلة الشاردية: ${c.eqK}`,
				'استعمال أنابيب PVC أو النحاس أو الطلاء الواقي.'
			],
			finalAnswer: c.solName
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════
// 6. Integration 2: Suspended Block Equilibrium + Chemical Cleaning (8 pts)
// ═══════════════════════════════════════════════════════════════════════════
const integrationLabMechanicsMatterTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_4am_t2_integration_lab_mechanics_matter',
	grade: '4am',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: توازن جسم صلب والتحولات الكيميائية في المخبر (BEM)',
	curriculumLessonId: 'phy_lesson_4am_t2_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const massG = rng.pick([300, 450, 600, 750]);
		const massKg = roundTo(massG / 1000, 2);
		const gVal = 10;
		const weightN = roundTo(massKg * gVal, 2);
		const scaleN = roundTo(weightN / 3, 2);

		const svg = buildWeightEquilibriumSvg('hanging', `${massG} g`, `${weightN} N`);
		const imageUrl = savePhysicsSvgAsset(`phy_4am_t2_int2_${difficulty}_s${seed}`, svg);

		const eqIonic = chemEquation(
			[{ formula: 'Fe', state: 's' }, { formula: 'Cu^2+', state: 'aq' }, { formula: 'SO4^2-', state: 'aq' }],
			[{ formula: 'Fe^2+', state: 'aq' }, { formula: 'SO4^2-', state: 'aq' }, { formula: 'Cu', state: 's' }]
		);
		const solCuSO4 = ionicSolutionDual(1, 'Cu^2+', 1, 'SO4^2-', 'aq');
		const solFeSO4 = ionicSolutionDual(1, 'Fe^2+', 1, 'SO4^2-', 'aq');

		const mcq = buildUniqueMcqOptions(
			`توازن الجسم ($T = ${weightN}\\text{ N}$)، وترسب النحاس الأحمر على الحديد وتغير اللون إلى الأخضر`,
			[
				{
					text: `توازن الجسم ($T = ${massG}\\text{ N}$)، وترسب الحديد على النحاس`,
					diagnosticFeedback: 'حوّل الكتلة إلى $\\text{kg}$ لإيجاد الثقل بالنيوتن ($P = ${weightN}\\text{ N}$).'
				},
				{
					text: `توازن الجسم ($T = ${weightN}\\text{ N}$)، ولا يحدث أي تفاعل كيميائي`,
					diagnosticFeedback: 'الحديد يتفاعل مع محلول كبريتات النحاس فيترسب معدن النحاس الأحمر وتتشكل شوارد الحديد الثنائي الخضراء.'
				},
				{
					text: `سقوط الجسم ($P > T$) وانطلاق غاز الهيدروجين`,
					diagnosticFeedback: 'الجسم معلق متوازن في الهواء، والتفاعل مع كبريتات النحاس لا يُنتج غاز الهيدروجين.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: 'integration',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `كتلة حديدية $m = ${massG}\\text{ g}$ معلقة بخيط متوازنة ($g = 10\\text{ N/kg}$)، ثم غُمرت في محلول كبريتات النحاس الأزرق. ماذا يحدث؟`,
				questionTextAr: `كتلة حديدية $${massG}\\text{ g}$ متوازنة ثم مغمورة في كبريتات النحاس:`,
				imageUrl,
				imageCaption: 'القطعة الحديدية المعلقة',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `في التوازن: $T = P = ${massKg} \\times 10 = ${weightN}\\text{ N}$. وعند الغمر يتفاعل الحديد مع شوارد النحاس فيترسب النحاس الأحمر ويخضر المحلول.`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `علّق مخبري قطعة من معدن الحديد النقي كتلتها $m = ${massG} " g"$ بطرف ربيعة شاقولية ($g = 10 " N/kg"$) كما في الشكل، ثم غمرها داخل حوض زجاجي به محلول كبريتات النحاس الثنائي الأزرق ${solCuSO4.typst} وتركها لمدة زمنية:`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) الجزء الأول (الميكانيك): احسب ثقل القطعة الحديدية في الهواء $P$، واستنتج شدة قوة توتر خيط الربيعة $T$ في حالة التوازن مع ذكر الشرطين.`,
								answer: `1) $m = ${massKg} " kg"$، إذن $P = ${massKg} times 10 = ${weightN} " N"$. في حالة التوازن (قوتان): لهما نفس الحامل الشاقولي، ونفس الشدة ($T = P = ${weightN} " N"$), وجهتان متعاكستان ($arrow(P) + arrow(T) = arrow(0)$).`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'القطعة الحديدية المعلقة'
							}
						]
					},
					{
						type: 'text',
						content: `2) احسب طول كل من الشعاعين $arrow(P)$ و$arrow(T)$ للتمثيل وفق السلم $1 " cm" arrow.r ${scaleN} " N"$.`,
						answer: `2) طول كل شعاع هو $L = frac(${weightN}, ${scaleN}) = 3 " cm"$ ($arrow(P)$ شاقولياً نحو الأسفل من $G$، و$arrow(T)$ شاقولياً نحو الأعلى من نقطة الربط).`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) الجزء الثاني (التحول الكيميائي): صف الملاحظتين المسجلتين بعد غمر الحديد في كبريتات النحاس، واكتب معادلة التفاعل بالصيغة الشاردية والإحصائية.`,
						answer: `3) الملاحظات: ترسب طبقة حمراء من النحاس على الحديد، وزوال اللون الأزرق تدريجياً ليصبح المحلول أخضر فاتحاً.\n\nالشاردية: $"Fe" ("s") + ("Cu"^(2+) + "SO"_4^(2-))_("aq") arrow.r ("Fe"^(2+) + "SO"_4^(2-))_("aq") + "Cu" ("s")$.\n\nالإحصائية: $"Fe" ("s") + "CuSO"_4 ("aq") arrow.r "FeSO"_4 ("aq") + "Cu" ("s")$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `4) كيف نكشف تجريبياً عن الشاردة المعدنية الجديدة وعن شاردة الكبريتات في المحلول الناتج ${solFeSO4.typst}؟`,
						answer: `4) نأخذ عينتين من المحلول الناتج: نضيف للأولى محلول هيدروكسيد الصوديوم ($"NaOH"$) فيتشكل راسب أخضر (شوارد $"Fe"^(2+)$)، ونضيف للثانية محلول كلور الباريوم ($"BaCl"_2$) فيتشكل راسب أبيض (شوارد $"SO"_4^(2-)$).`,
						mark: '2'
					}
				]
			},
			hints: [
				'حوّل الكتلة من $\\text{g}$ إلى $\\text{kg}$ لحساب $P = m \\cdot g$.',
				'في تفاعل الحديد مع كبريتات النحاس، تبقى شاردة الكبريتات $\\text{SO}_4^{2-}$ متفرجة.',
				'استعمل $\\text{NaOH}$ للكشف عن $\\text{Fe}^{2+}$ و$\\text{BaCl}_2$ للكشف عن $\\text{SO}_4^{2-}$.'
			],
			solutionStepsAr: [
				`$P = ${weightN}\\text{ N}$ و$T = ${weightN}\\text{ N}$.`,
				`طول كل شعاع بالسلم هو $3\\text{ cm}$.`,
				`معادلة التفاعل: ${eqIonic.katex}.`,
				'الكشف بـ $\\text{NaOH}$ (راسب أخضر) وبـ $\\text{BaCl}_2$ (راسب أبيض).'
			],
			finalAnswer: `P = T = ${weightN} N`
		};
	}
};

export const PHYSICS_TEMPLATES_4AM_T2: PhysicsParameterizedTemplate[] = [
	ionicFormulasTemplate,
	electrolysisTemplate,
	reactionsIonTestsTemplate,
	weightTwoForcesTemplate,
	integrationPipeCorrosionTemplate,
	integrationLabMechanicsMatterTemplate
];
