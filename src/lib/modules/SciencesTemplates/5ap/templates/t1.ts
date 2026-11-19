import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	calloutBadge,
	esc,
	haloText,
	saveSciencesSvgAsset,
	svgBioCurvePlot,
	svgBioFlowchart,
	wrapSciencesSvg
} from '../../svg-sciences';

function buildAirVolumeSvg5ap(volumeL: number, oxygenL: number, nitrogenL: number): string {
	return wrapSciencesSvg(
		440,
		220,
		`<rect x="6" y="6" width="428" height="208" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="220" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">توزيع غازات الهواء داخل وعاء أو غرفة</text>` +
			// Left jar with 1/5 water rise
			`<rect x="24" y="44" width="166" height="154" rx="8" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.6"/>` +
			`<rect x="64" y="64" width="86" height="100" rx="8" fill="#ffffff" stroke="#334155" stroke-width="2"/>` +
			`<rect x="65" y="144" width="84" height="20" fill="#38bdf8" opacity="0.75"/>` +
			`<line x1="64" y1="84" x2="76" y2="84" stroke="#475569" stroke-width="1.2"/>` +
			`<line x1="64" y1="104" x2="76" y2="104" stroke="#475569" stroke-width="1.2"/>` +
			`<line x1="64" y1="124" x2="76" y2="124" stroke="#475569" stroke-width="1.2"/>` +
			`<line x1="64" y1="144" x2="150" y2="144" stroke="#0284c7" stroke-width="1.8"/>` +
			`<text x="107" y="185" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#0369a1">صعود الماء بمقدار 1/5</text>` +
			// Right composition bar
			`<rect x="206" y="44" width="212" height="154" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>` +
			`<text x="312" y="68" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#0f172a">الحجم الكلي للهواء: ${volumeL} لتر</text>` +
			`<rect x="224" y="84" width="176" height="32" rx="4" fill="#93c5fd" stroke="#1d4ed8" stroke-width="1.6"/>` +
			`<rect x="362" y="84" width="38" height="32" fill="#86efac" stroke="#15803d" stroke-width="1.6"/>` +
			`<text x="293" y="104" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#1e3a8a">آزوت (78%)</text>` +
			`<text x="381" y="104" text-anchor="middle" font-size="9" font-weight="bold" fill="#14532d">21%</text>` +
			`<text x="312" y="142" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#15803d">الأكسجين (خُمس الحجم): ${oxygenL} لتر</text>` +
			`<text x="312" y="164" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1d4ed8">الآزوت (أربعة أخماس): ${nitrogenL} لتر</text>` +
			`<text x="312" y="186" text-anchor="middle" font-size="9.5" fill="#475569">تقريب مدرسي: 1/5 أكسجين و 4/5 آزوت</text>`
	);
}

function buildFlameDiagnosticSvg5ap(isComplete: boolean, appliance: string): string {
	return wrapSciencesSvg(
		440,
		220,
		`<rect x="6" y="6" width="428" height="208" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="220" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">فحص لون اللهب في جهاز منزلي (${esc(appliance)})</text>` +
			`<rect x="234" y="44" width="184" height="154" rx="9" fill="${isComplete ? '#eff6ff' : '#fef2f2'}" stroke="${isComplete ? '#2563eb' : '#dc2626'}" stroke-width="2"/>` +
			`<rect x="316" y="128" width="20" height="24" rx="3" fill="#475569"/>` +
			(isComplete
				? `<path d="M 326 74 C 340 94, 342 118, 326 128 C 310 118, 312 94, 326 74 Z" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1.6"/>` +
					`<path d="M 326 94 C 333 106, 333 118, 326 125 C 319 118, 319 106, 326 94 Z" fill="#93c5fd"/>`
				: `<path d="M 326 74 C 342 94, 344 118, 326 128 C 308 118, 310 94, 326 74 Z" fill="#f59e0b" stroke="#ea580c" stroke-width="1.6"/>` +
					`<path d="M 326 94 C 333 106, 333 118, 326 125 C 319 118, 319 106, 326 94 Z" fill="#fef08a"/>` +
					`<circle cx="326" cy="64" r="5" fill="#1e293b" opacity="0.7"/>`) +
			`<text x="326" y="172" text-anchor="middle" font-size="11" font-weight="bold" fill="${isComplete ? '#1d4ed8' : '#b91c1c'}">${isComplete ? 'لهب أزرق صافٍ' : 'لهب أصفر ودخان أسود'}</text>` +
			`<text x="326" y="190" text-anchor="middle" font-size="9.8" fill="#334155">${isComplete ? 'منافذ التهوية مفتوحة' : 'منافذ التهوية مسدودة'}</text>` +
			`<rect x="22" y="44" width="194" height="154" rx="9" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>` +
			`<text x="119" y="72" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">التشخيص العلمي</text>` +
			`<text x="119" y="104" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${isComplete ? '#15803d' : '#dc2626'}">${isComplete ? 'احتراق تام (آمن)' : 'احتراق غير تام (خطير)'}</text>` +
			`<text x="119" y="134" text-anchor="middle" font-size="10" fill="#334155">${isComplete ? 'وفرة غاز الأكسجين' : 'نقص غاز الأكسجين'}</text>` +
			`<text x="119" y="160" text-anchor="middle" font-size="10" font-weight="bold" fill="${isComplete ? '#1e40af' : '#991b1b'}">${isComplete ? 'لا ينتج هباب فحم ولا CO' : 'ينتج هباب الفحم وغاز CO'}</text>`
	);
}

function buildProtectionDeviceSvg5ap(highlightDevice: 'ground' | 'fuse' | 'breaker'): string {
	const box = (x: number, title: string, sub: string, active: boolean, num: string) =>
		`<rect x="${x}" y="48" width="124" height="148" rx="9" fill="${active ? '#fef2f2' : '#ffffff'}" stroke="${active ? '#dc2626' : '#94a3b8'}" stroke-width="${active ? 2.4 : 1.5}"/>` +
		calloutBadge(x + 62, 68, num, active ? '#dc2626' : '#2563eb') +
		`<text x="${x + 62}" y="106" text-anchor="middle" font-size="11.2" font-weight="bold" fill="${active ? '#991b1b' : '#0f172a'}">${esc(title)}</text>` +
		`<text x="${x + 62}" y="138" text-anchor="middle" font-size="9.8" fill="#334155">${esc(sub)}</text>` +
		`<text x="${x + 62}" y="176" text-anchor="middle" font-size="10" font-weight="bold" fill="${active ? '#dc2626' : '#64748b'}">${active ? 'العنصر المعني بالسؤال' : 'عنصر حماية منزلي'}</text>`;
	return wrapSciencesSvg(
		440,
		215,
		`<rect x="6" y="6" width="428" height="203" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="220" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">وسائل الحماية في الشبكة الكهربائية المنزلية</text>` +
			box(296, 'القاطع التفاضلي', 'عند مدخل شبكة المنزل', highlightDevice === 'breaker', '1') +
			box(158, 'المنصهرة', 'بسلك رقيق قابل للانصهار', highlightDevice === 'fuse', '2') +
			box(20, 'المأخذ الأرضي', 'مربط موصول بالأرض', highlightDevice === 'ground', '3')
	);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Air Composition & Candle Experiment (2 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const airCompositionTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_5ap_t1_air_composition',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'matter_tech_primary',
	titleAr: 'الهواء والغازات المكونة له (الأكسجين والآزوت)',
	curriculumLessonId: 'sci_lesson_5ap_t1_air_composition_gases',
	defaultPoints: 2,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const volumeL = rng.pick([10, 15, 20, 25, 50]);
		const oxygenL = volumeL / 5;
		const nitrogenL = (volumeL * 4) / 5;
		const askOxygen = seed % 2 === 0;
		const svg = buildAirVolumeSvg5ap(volumeL, oxygenL, nitrogenL);
		const imageUrl = saveSciencesSvgAsset(`sci_5ap_t1_air_s${seed}`, svg);

		const correctAnswer = askOxygen
			? `حوالي $${oxygenL}\\text{ L}$ لأن غاز الأكسجين يمثل خُمس حجم الهواء ($21\\%$)`
			: `حوالي $${nitrogenL}\\text{ L}$ لأن غاز الآزوت يمثل أربعة أخماس حجم الهواء ($78\\%$)`;

		const mcq = buildUniqueMcqOptions(
			correctAnswer,
			[
				{
					text: askOxygen
						? `حوالي $${nitrogenL}\\text{ L}$ لأن الأكسجين يمثل أربعة أخماس الهواء`
						: `حوالي $${oxygenL}\\text{ L}$ لأن الآزوت يمثل خُمس الهواء`,
					diagnosticFeedback: 'انتبه: الأكسجين هو الخُمس (21%) بينما الآزوت هو أربعة الأخماس (78%)!'
				},
				{
					text: `حوالي $${volumeL / 2}\\text{ L}$ لأن الأكسجين والآزوت متساويان في الهواء`,
					diagnosticFeedback: 'الغازان غير متساويين؛ الآزوت يعادل أربعة أضعاف الأكسجين تقريباً.'
				},
				{
					text: `$${volumeL}\\text{ L}$ لأن الهواء يتكون كله من غاز واحد نقي`,
					diagnosticFeedback: 'الهواء خليط غازات (أكسجين 21% + آزوت 78% + غازات أخرى 1%).'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `يحتوي حوض زجاجي مغلق على **$${volumeL}\\text{ L}$** من الهواء الجاف. ما الحجم التقريبي لـ**${askOxygen ? 'غاز ثنائي الأكسجين ($\\text{O}_2$)' : 'غاز الآزوت ($\\text{N}_2$)'}** الموجود داخله؟`,
			questionTextAr: `احسب الحجم التقريبي لـ${askOxygen ? 'الأكسجين' : 'الآزوت'} في ${volumeL} لتر من الهواء.`,
			imageUrl,
			imageCaption: 'تجربة الشمعة وتوزيع غازات الهواء',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `يمثل الأكسجين خُمس حجم الهواء ($\\frac{1}{5} \\approx 21\\%$) أي $${oxygenL}\\text{ L}$، ويمثل الآزوت أربعة أخماس ($\\frac{4}{5} \\approx 78\\%$) أي $${nitrogenL}\\text{ L}$.`
		};

		const hints: [string, string, string] = [
			'تذكّر نسب مكونات الهواء: الأكسجين ≈ الخُمس (21%)، الآزوت ≈ أربعة أخماس (78%).',
			`اقسم الحجم الكلي $${volumeL}\\text{ L}$ على $5$ لإيجاد حجم الأكسجين ($${oxygenL}\\text{ L}$).`,
			`اضرب الخُمس في $4$ لإيجاد الحجم التقريبي لغاز الآزوت ($${nitrogenL}\\text{ L}$).`
		];

		const solutionStepsAr = [
			`الحجم الكلي للهواء هو $${volumeL}\\text{ L}$.`,
			`حجم ثنائي الأكسجين ($\\frac{1}{5}$): $${volumeL} \\div 5 = ${oxygenL}\\text{ L}$.`,
			`حجم غاز الآزوت ($\\frac{4}{5}$): $${oxygenL} \\times 4 = ${nitrogenL}\\text{ L}$.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 2,
			instruction: `في تجربة الشمعة المشتعلة تحت ناقوس مدرج، استنتجنا تركيب الهواء الجاف. استعن بالسند المقابل الذي يمثل وعاءً به ${volumeL} لتراً من الهواء، ثم أجب:`,
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: '1) لماذا تنطفئ الشمعة ويصعد الماء الملون بمقدار خُمس الناقوس فقط؟ وما هما الغازان الرئيسيان في الهواء مع نسبتيهما المئويتين؟',
							answer: '1) تنطفئ الشمعة بسبب *نفاد غاز الأكسجين* فيصعد الماء ليعوّض حجمه (الخُمس). الغازان هما: *ثنائي الأكسجين* ($upright("O")_2$ بنسبة 21%) و*الآزوت* ($upright("N")_2$ بنسبة 78%)، وغازات أخرى (1%).',
							mark: '1'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'تركيب الهواء وتجربة الشمعة'
						}
					]
				},
				{
					type: 'text',
					content: `2) احسب الحجم التقريبي لكل من غاز الأكسجين وغاز الآزوت داخل هذا الوعاء (${volumeL} لتر هواء).`,
					answer: `2) حجم الأكسجين (خُمس الحجم) = ${volumeL} ÷ 5 = *${oxygenL} لتر*. حجم الآزوت (أربعة أخماس) = ${oxygenL} × 4 = *${nitrogenL} لتر*.`,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: askOxygen ? `${oxygenL} L` : `${nitrogenL} L`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Complete vs Incomplete Combustion & CO Gas Safety (2 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const combustionCoSafetyTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_5ap_t1_combustion_co_safety',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'matter_tech_primary',
	titleAr: 'الاحتراق التام وغير التام وخطر أحادي أكسيد الكربون وقواعد الأمن الغازي',
	curriculumLessonId: 'sci_lesson_5ap_t1_combustion_co_gas_safety',
	defaultPoints: 2,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const isComplete = seed % 3 === 0;
		const appliance = rng.pick(['مدفأة الغاز', 'سخان الماء', 'موقد المطبخ']);
		const svg = buildFlameDiagnosticSvg5ap(isComplete, appliance);
		const imageUrl = saveSciencesSvgAsset(`sci_5ap_t1_comb_s${seed}`, svg);

		const correctAnswer = isComplete
			? 'احتراق تام بسبب وفرة غاز الأكسجين، وهو آمن ولا ينتج هباب الفحم ولا غاز CO'
			: 'احتراق غير تام بسبب نقص الأكسجين، وينتج هباب الفحم وغاز أحادي أكسيد الكربون CO القاتل';

		const mcq = buildUniqueMcqOptions(
			correctAnswer,
			[
				{
					text: isComplete
						? 'احتراق غير تام ينتج عنه غاز أحادي أكسيد الكربون القاتل'
						: 'احتراق تام آمن يدل على وفرة غاز الأكسجين في الغرفة',
					diagnosticFeedback: isComplete
						? 'اللهب الأزرق الصافي يدل على الاحتراق التام الآمن وليس غير التام!'
						: 'اللهب الأصفر مع السواد علامة خطر (احتراق غير تام) وليس احتراقاً تاماً!'
				},
				{
					text: 'احتراق يحدث بفضل غاز الآزوت وحده دون حاجة للأكسجين',
					diagnosticFeedback: 'الآزوت لا يساعد على الاحتراق؛ الأكسجين هو الغاز المساعد على الاحتراق.'
				},
				{
					text: 'ظاهرة عادية تزول تلقائياً إذا أغلقنا جميع نوافذ الغرفة ومنافذ التهوية',
					diagnosticFeedback: 'غلق النوافذ يقلل الأكسجين أكثر ويزيد خطر الاختناق بغاز CO!'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `عند فحص **${appliance}** في المنزل، لاحظنا أن اللهب **${isComplete ? 'أزرق صافٍ ومنافذ التهوية مفتوحة' : 'أصفر برتقالي وتشكّل سواد (هباب الفحم) مع غلق منافذ التهوية'}**. ما التشخيص العلمي الصحيح؟`,
			questionTextAr: `شخّص نوع الاحتراق في ${appliance} بناءً على لون اللهب.`,
			imageUrl,
			imageCaption: `ملاحظة لون اللهب في ${appliance}`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `${correctAnswer}. للوقاية يجب ضمان التهوية الدائمة ومراقبة زرقة اللهب وصيانة الأجهزة.`
		};

		const hints: [string, string, string] = [
			'انظر إلى لون اللهب في الوثيقة: الأزرق يعني وفرة الأكسجين، والأصفر يعني نقص الأكسجين.',
			'الاحتراق غير التام يطلق غازاً ساماً عديم اللون والرائحة يُسمى أحادي أكسيد الكربون (CO).',
			'اختر التشخيص الموافق للون اللهب المبيّن في الرسم.'
		];

		const solutionStepsAr = [
			`لون اللهب في ${appliance}: **${isComplete ? 'أزرق' : 'أصفر مع هباب الفحم'}**.`,
			`نوع الاحتراق: **${isComplete ? 'احتراق تام (وفرة الأكسجين)' : 'احتراق غير تام (نقص الأكسجين)'}**.`,
			`الحكم العلمي: ${correctAnswer}.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 2,
			instruction: `لاحظ الوثيقة المقابلة التي تبيّن حالة لهب *${appliance}* في منزل عائلي، ثم أجب:`,
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: `1) حدّد نوع الاحتراق الظاهر في الوثيقة وسببه، واذكر نواتج *الاحتراق غير التام* الخطيرة.`,
							answer: `1) نوع الاحتراق في الوثيقة: *${isComplete ? 'احتراق تام بسبب وفرة الأكسجين' : 'احتراق غير تام بسبب نقص الأكسجين'}*. نواتج الاحتراق غير التام الخطيرة هي: *هباب الفحم* وغاز *أحادي أكسيد الكربون* ($upright("CO")$) السام عديم اللون والرائحة.`,
							mark: '1'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: `حالة اللهب في ${appliance}`
						}
					]
				},
				{
					type: 'text',
					content: '2) اذكر *قاعدتين* من قواعد الأمن الغازي لتجنب الاختناق والانفجار داخل المنزل.',
					answer: '2) *تهوية الغرف باستمرار وعدم سد فتحات التهوية*، *صيانة المدافئ وسخانات الماء والتأكد من زرقة اللهب*، وعدم إشعال النار أو الكهرباء عند شم رائحة الغاز.',
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: isComplete ? 'احتراق تام' : 'احتراق غير تام (خطر CO)'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Electrical Supply & Protection (Ground, Fuse, Breaker) (2 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const electricalProtectionTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_5ap_t1_electrical_protection',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'matter_tech_primary',
	titleAr: 'التغذية الكهربائية والأمن الكهربائي (المأخذ الأرضي، المنصهرة، القاطع)',
	curriculumLessonId: 'sci_lesson_5ap_t1_electrical_supply_safety',
	defaultPoints: 2,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cases = [
			{
				key: 'ground' as const,
				device: 'المأخذ الأرضي',
				situation: 'شعرت الأم بصعقة كهربائية خفيفة عند لمس الهيكل المعدني للغسالة',
				role: 'تفريغ التسرب الكهربائي من الهيكل المعدني نحو الأرض لحماية الإنسان من الصعق'
			},
			{
				key: 'fuse' as const,
				device: 'المنصهرة',
				situation: 'حدث ارتفاع مفاجئ في شدة التيار المار نحو جهاز التلفاز فتوقف عن العمل لحمايته من الاحتراق',
				role: 'انصهار سلكها الرقيق لفتح الدارة وحماية الجهاز الكهربائي من التلف والحريق'
			},
			{
				key: 'breaker' as const,
				device: 'القاطع الرئيسي (التفاضلي)',
				situation: 'حدث استقصار مفاجئ في شبكة المنزل فانقطعت الكهرباء آلياً عن جميع الغرف في آن واحد',
				role: 'قطع التيار الكهربائي آلياً عن كامل الشبكة المنزلية عند الاستقصار أو التسرب الكهربائي'
			}
		];
		const chosen = rng.pick(cases);
		const svg = buildProtectionDeviceSvg5ap(chosen.key);
		const imageUrl = saveSciencesSvgAsset(`sci_5ap_t1_elecprot_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			chosen.device,
			cases
				.filter((c) => c.key !== chosen.key)
				.map((c) => ({
					text: c.device,
					diagnosticFeedback: `انتبه: دور ${c.device} هو (${c.role})، وليس المطلوب في هذه الحالة.`
				}))
				.concat([
					{
						text: 'سلك نحاسي عارٍ دون تغليف بلاستيكي',
						diagnosticFeedback: 'السلك العاري مصدر خطر صعق وليس وسيلة حماية!'
					}
				]),
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `في الموقف المنزلي الآتي: **«${chosen.situation}»**. ما وسيلة الحماية الكهربائية المعنية بهذا الموقف؟`,
			questionTextAr: `حدّد وسيلة الحماية الكهربائية المناسبة للموقف.`,
			imageUrl,
			imageCaption: 'وسائل الحماية في التغذية الكهربائية المنزلية',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `وسيلة الحماية المعنية هي **${chosen.device}**، ودورها: ${chosen.role}.`
		};

		const hints: [string, string, string] = [
			'ميّز بين الوسائل الثلاث: المأخذ الأرضي (الهيكل المعدني)، المنصهرة (حماية جهاز بسلك ينصهر)، القاطع التفاضلي (قطع التيار عن كامل المنزل).',
			'انظر إلى البطاقة المميزة بالإطار الأحمر في السند المقابل.',
			`اربط الموقف بوظيفة (${chosen.device}).`
		];

		const solutionStepsAr = [
			`تحليل الموقف: ${chosen.situation}.`,
			`الوسيلة المعنية: **${chosen.device}**.`,
			`الوظيفة الوقائية: ${chosen.role}.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 2,
			instruction: `لاحظ وسائل الحماية الثلاث في السند المقابل، ثم حلّل الموقف: (${chosen.situation}):`,
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: '1) سمِّ وسيلة الحماية المعنية بهذا الموقف واشرح دورها الوقائي.',
							answer: `1) وسيلة الحماية هي: *${chosen.device}*، ودورها: *${chosen.role}*.`,
							mark: '1'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'وسائل الحماية الكهربائية في المنزل'
						}
					]
				},
				{
					type: 'table',
					headers: ['وسيلة الحماية', 'دورها في التغذية الكهربائية المنزلية'],
					cells: [],
					rows: [
						['المأخذ الأرضي', { content: '.............................................', answer: 'يفرّغ التسرب الكهربائي نحو الأرض ويحمي الإنسان من الصعق', mark: '0.5' }],
						['المنصهرة', { content: '.............................................', answer: 'ينصهر سلكها فتفتح الدارة وتحمي الأجهزة من التلف', mark: '0.5' }]
					],
					headerBackground: true,
					borders: 'grid',
					width: 'full'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: chosen.device
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Body Adaptation During Muscular Effort (2.5 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const effortAdaptationTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_5ap_t1_effort_adaptation',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'human_body',
	titleAr: 'تكيّف العضوية أثناء الجهد العضلي (الوتيرتان التنفسية والقلبية)',
	curriculumLessonId: 'sci_lesson_5ap_t1_body_adaptation_effort',
	defaultPoints: 2.5,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const hrRest = rng.pick([70, 72, 76, 80]);
		const hrPeak = hrRest + rng.pick([55, 60, 65]);
		const brRest = rng.pick([15, 16, 18]);
		const brPeak = brRest + rng.pick([16, 18, 20]);

		const svg = svgBioCurvePlot({
			title: 'تغير الوتيرة القلبية لتلميذ قبل وأثناء وبعد الجري',
			xMin: 0,
			xMax: 10,
			yMin: 0,
			yMax: 160,
			xStep: 2,
			yStep: 40,
			xLabel: 'الزمن (دقيقة)',
			yLabel: 'النبض / دقيقة',
			shadedZones: [
				{ x1: 0, x2: 3, fill: '#f0fdf4', label: 'راحة', textColor: '#166534' },
				{ x1: 3, x2: 7, fill: '#fef2f2', label: 'جهد عضلي', textColor: '#b91c1c' },
				{ x1: 7, x2: 10, fill: '#eff6ff', label: 'راحة واسترجاع', textColor: '#1d4ed8' }
			],
			curves: [
				{
					color: '#dc2626',
					label: 'الوتيرة القلبية',
					fn: (x) => {
						if (x <= 3) return hrRest;
						if (x <= 7) return hrRest + (hrPeak - hrRest) * Math.sin(((x - 3) / 4) * (Math.PI / 2));
						return hrPeak - (hrPeak - hrRest - 8) * ((x - 7) / 3);
					}
				}
			],
			points: [
				{ x: 1.5, y: hrRest, label: `${hrRest}`, color: '#15803d' },
				{ x: 6.8, y: hrPeak, label: `${hrPeak}`, color: '#dc2626', dx: -30, dy: -8 }
			]
		});
		const imageUrl = saveSciencesSvgAsset(`sci_5ap_t1_effort_s${seed}`, svg);

		const correctAnswer =
			'تتسارع الوتيرتان القلبية والتنفسية لتزويد العضلات النشطة بكمية أكبر من الأكسجين والمغذيات';

		const mcq = buildUniqueMcqOptions(
			correctAnswer,
			[
				{
					text: 'تنخفض الوتيرتان أثناء الجري لأن العضلات لا تحتاج إلى الأكسجين عند الحركة',
					diagnosticFeedback: 'المنحنى يظهر ارتفاعاً واضحاً في الوتيرة القلبية وليس انخفاضاً!'
				},
				{
					text: 'ترتفع الوتيرة القلبية فقط وتبقى الوتيرة التنفسية ثابتة لا تتغير',
					diagnosticFeedback: 'تتسارع كلتا الوتيرتين (التنفسية والقلبية) معاً أثناء الجهد العضلي.'
				},
				{
					text: 'يرتفع النبض بسبب توقف الدم عن الدوران داخل الأوعية الدموية',
					diagnosticFeedback: 'العكس تماماً: يسرّع القلب ضخ الدم لتوزيع الأكسجين والمغذيات بسرعة أكبر.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `يمثل المنحنى المقابل تغير الوتيرة القلبية لتلميذ (من $${hrRest}$ إلى $${hrPeak}$ نبضة/دقيقة)، كما ارتفعت وتيرته التنفسية من $${brRest}$ إلى $${brPeak}$ حركة/دقيقة أثناء الجري. كيف تفسّر هذا التغيّر؟`,
			questionTextAr: `فسّر ارتفاع الوتيرتين القلبية والتنفسية أثناء الجهد العضلي.`,
			imageUrl,
			imageCaption: 'منحنى تطور الوتيرة القلبية أثناء الجهد العضلي',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `أثناء الجهد العضلي ترتفع حاجة العضلات للأكسجين والمغذيات لإنتاج الطاقة، لذا تتكيّف العضوية بتسريع الوتيرتين القلبية والتنفسية معاً.`
		};

		const hints: [string, string, string] = [
			'اقرأ قيمتي النبض في الراحة وأثناء الجهد العضلي على المنحنى.',
			'قارن تغير الوتيرة القلبية والتنفسية: كلاهما يتسارع معاً.',
			'اربط التسارع بحاجة العضلة النشطة إلى الأكسجين والمغذيات وطرح غاز الفحم.'
		];

		const solutionStepsAr = [
			`في الراحة: النبض $${hrRest}$ نبضة/د، التنفس $${brRest}$ حركة/د.`,
			`أثناء الجهد: ارتفع النبض إلى $${hrPeak}$ نبضة/د والتنفس إلى $${brPeak}$ حركة/د.`,
			`التفسير: **${correctAnswer}**.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 2.5,
			instruction: `يمثل الجدول والمنحنى المقابلان قياسات الوتيرة القلبية والتنفسية لتلميذ قبل وأثناء الجري:`,
			content: [
				{
					type: 'columns',
					widths: ['1.2fr', '1.3fr'],
					children: [
						{
							type: 'table',
							headers: ['الحالة', 'الوتيرة القلبية', 'الوتيرة التنفسية'],
							cells: [],
							rows: [
								['الراحة', `${hrRest} نبضة/د`, `${brRest} حركة/د`],
								['الجهد العضلي', `${hrPeak} نبضة/د`, `${brPeak} حركة/د`]
							],
							headerBackground: true,
							borders: 'grid',
							width: 'full'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'منحنى الوتيرة القلبية'
						}
					]
				},
				{
					type: 'text',
					content: '1) قارن بين الوتيرتين القلبية والتنفسية في الراحة وأثناء الجهد العضلي، ثم فسّر سبب هذا التكيّف.',
					answer: `1) تتسارع الوتيرة القلبية (من ${hrRest} إلى ${hrPeak}) والوتيرة التنفسية (من ${brRest} إلى ${brPeak}) أثناء الجهد، وذلك لـ*تزويد العضلات النشطة بكمية أكبر من الأكسجين والمغذيات لإنتاج الطاقة وطرح غاز الفحم*.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: '2) اذكر *قاعدتين صحيتين* يجب احترامهما عند ممارسة الرياضة.',
					answer: '2) *القيام بالإحماء التدريجي قبل الجهد*، و*شرب الماء بانتظام لتعويض العرق*، وتجنب الرياضة الشاقة مباشرة بعد الأكل.',
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: correctAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Integration Situation: Winter Safety & Sport Effort (4 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationWinterHomeTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_5ap_t1_integration_winter_home',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: الأمن الغازي والكهربائي وتكيّف العضوية في الشتاء',
	curriculumLessonId: 'sci_lesson_5ap_t1_body_adaptation_effort',
	defaultPoints: 4,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const wilaya = rng.pick(['سطيف', 'باتنة', 'المدية', 'برج بوعريريج']);
		const child = rng.pick(['سفيان', 'ملاك', 'آدم', 'إسراء']);

		const svg = svgBioFlowchart({
			title: 'ثلاثية السلامة والصحة المنزلية في فصل الشتاء',
			orientation: 'horizontal',
			width: 470,
			steps: [
				{ label: 'الأمن الغازي', sublabel: 'تهوية + لهب أزرق ضد CO', color: '#dc2626', bg: '#fef2f2' },
				{ label: 'الأمن الكهربائي', sublabel: 'مأخذ أرضي + منصهرة + قاطع', color: '#2563eb', bg: '#eff6ff' },
				{ label: 'الجهد العضلي', sublabel: 'تسارع التنفس والنبض', color: '#d97706', bg: '#fffbeb' },
				{ label: 'عائلة آمنة', sublabel: 'وقاية وصحة سليمة', color: '#16a34a', bg: '#f0fdf4' }
			]
		});
		const imageUrl = saveSciencesSvgAsset(`sci_5ap_t1_integ_winter_s${seed}`, svg);

		const correctAnswer =
			'فتح النوافذ وصيانة المدفأة لمنع غاز CO + توصيل الغسالة بالمأخذ الأرضي + تكيّف طبيعي للعضوية أثناء الرياضة';

		const mcq = buildUniqueMcqOptions(
			correctAnswer,
			[
				{
					text: 'غلق النوافذ للحفاظ على الدفء + نزع المنصهرة واستبدالها بسلك نحاسي غليظ',
					diagnosticFeedback: 'خطأ خطير! غلق النوافذ يسبب التسمم بـCO واستبدال المنصهرة بسلك غليظ يسبب حريقاً.'
				},
				{
					text: 'إشعال قاطعة الكهرباء فور شم رائحة الغاز + منع الطفل من شرب الماء بعد الجري',
					diagnosticFeedback: 'شرارة القاطعة تفجر الغاز المتسرب، وشرب الماء ضروري بعد الجري لتعويض العرق.'
				},
				{
					text: 'اللهب الأصفر يدل على وفرة الأكسجين وتتسارع دقات القلب بسبب نقص الحاجة للغذاء',
					diagnosticFeedback: 'اللهب الأصفر يدل على نقص الأكسجين، وتسارع القلب سببه زيادة حاجة العضلات للأكسجين والغذاء.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `في يوم شتوي بولاية **${wilaya}**، لاحظت عائلة **${child}** تحوّل لهب المدفأة إلى الأصفر في غرفة مغلقة، وشعرت الأم بصعقة خفيفة عند لمس الغسالة المعدنية، كما عاد ${child} من الجري بنبض وتنفس متسارعين. ما التفسير والحل المتكامل للمشكلات الثلاث؟`,
			questionTextAr: `ما الحل العلمي المتكامل لمواقف عائلة ${child} الثلاثة؟`,
			imageUrl,
			imageCaption: 'مخطط الأمن الغازي والكهربائي وتكيّف العضوية',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `للمدفأة: تهوية وصيانة لمنع الاختناق بغاز $\\text{CO}$؛ للغسالة: تركيب المأخذ الأرضي؛ وللجري: تسارع الوتيرتين تكيّف طبيعي لتزويد العضلات بالأكسجين والمغذيات.`
		};

		const hints: [string, string, string] = [
			'اربط اللهب الأصفر في غرفة مغلقة بالاحتراق غير التام وغاز CO.',
			'اربط صعق الهيكل المعدني للغسالة بغياب المأخذ الأرضي.',
			'اربط تسارع النبض والتنفس بعد الجري بحاجة العضلات النشطة.'
		];

		const solutionStepsAr = [
			'المدفأة: احتراق غير تام (نقص الأكسجين) ← خطر غاز CO ← التهوية والصيانة.',
			'الغسالة: تسرب كهربائي في الهيكل المعدني ← الحل: تركيب المأخذ الأرضي مع القاطع التفاضلي.',
			'الجهد العضلي: تكيّف طبيعي بتسريع الوتيرتين لتزويد العضلات بالأكسجين والمغذيات.'
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 4,
			instruction: `في يوم شتوي بارد بولاية ${wilaya}، أغلقت عائلة ${child} جميع نوافذ الغرفة فأصبح لهب مدفأة الغاز *أصفر برتقالياً* وظهر سواد حولها. وفي المطبخ، شعرت الأم *بصعقة خفيفة* عند لمس الغسالة المعدنية. في هذه الأثناء، عاد ${child} من حصة الجري وقلبه ينبض بسرعة ويتنفس بسرعة ويتعرق. استعن بالسند وأجب:`,
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: '1) ما نوع الاحتراق في المدفأة؟ وما الغاز القاتل الذي يهدد العائلة؟ اقترح *إجراءين* فوريين للوقاية.',
							answer: '1) *احتراق غير تام* بسبب نقص الأكسجين. الغاز القاتل هو *أحادي أكسيد الكربون* ($upright("CO")$). الإجراءان: *فتح النوافذ فوراً للتهوية* و*إطفاء المدفأة وصيانتها حتى يصبح اللهب أزرق*.',
							mark: '1.5'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'السند: ثلاثية الأمن والصحة'
						}
					]
				},
				{
					type: 'text',
					content: '2) ما سبب شعور الأم بصعقة كهربائية عند لمس الغسالة؟ وما وسيلة الحماية الواجب تركيبها في المأخذ الكهربائي؟',
					answer: '2) السبب هو *تسرب كهربائي* نحو الهيكل المعدني للغسالة مع غياب التأريض. الوسيلة الواجب تركيبها هي *المأخذ الأرضي* (إضافةً إلى القاطع التفاضلي).',
					mark: '1.25'
				},
				{
					type: 'text',
					content: `3) فسّر تسارع تنفس ونبض ${child} بعد الجري، وقدّم له نصيحة صحية بعد التعرق.`,
					answer: `3) تسارعت الوتيرتان التنفسية والقلبية لـ*تزويد العضلات النشطة بكمية أكبر من الأكسجين والمغذيات* (تكيّف طبيعي). النصيحة: *شرب الماء بانتظام لتعويض ما فُقد بالتعرق وأخذ قسط من الراحة*.`,
					mark: '1.25'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: correctAnswer
		};
	}
};

export const SCIENCES_TEMPLATES_5AP_T1: SciencesParameterizedTemplate[] = [
	airCompositionTemplate,
	combustionCoSafetyTemplate,
	electricalProtectionTemplate,
	effortAdaptationTemplate,
	integrationWinterHomeTemplate
];
