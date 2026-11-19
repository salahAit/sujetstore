import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import {
	esc,
	haloText,
	saveSciencesSvgAsset,
	svgBioCurvePlot,
	svgGeologyDiagram,
	wrapSciencesSvg
} from '../../svg-sciences';

function svgIsoseismalMap(opts: { cityA: string; cityB: string; cityC: string; iMax: string; iMid: string; iOut: string }): string {
	let body = `<rect x="6" y="6" width="448" height="234" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">الوثيقة: خريطة المنحنيات متساوية الشدة للزلزال</text>`;

	// Concentric isoseismal ellipses centered at (230, 134)
	body += `<ellipse cx="230" cy="134" rx="174" ry="86" fill="#fef9c3" stroke="#ca8a04" stroke-width="1.6" stroke-dasharray="5,3"/>`;
	body += `<ellipse cx="230" cy="134" rx="116" ry="58" fill="#fed7aa" stroke="#ea580c" stroke-width="1.8"/>`;
	body += `<ellipse cx="230" cy="134" rx="58" ry="30" fill="#fecaca" stroke="#dc2626" stroke-width="2.2"/>`;

	// Cities
	body += `<circle cx="230" cy="134" r="5" fill="#b91c1c"/>`;
	body += `<circle cx="318" cy="116" r="4.5" fill="#c2410c"/>`;
	body += `<circle cx="92" cy="160" r="4.5" fill="#854d0e"/>`;

	body += haloText(`x="230" y="122" text-anchor="middle" font-size="11" font-weight="bold"`, '#991b1b', opts.cityA);
	body += haloText(`x="230" y="154" text-anchor="middle" font-size="10.2" font-weight="bold"`, '#dc2626', opts.iMax);
	body += haloText(`x="318" y="106" text-anchor="middle" font-size="10.5" font-weight="bold"`, '#9a3412', opts.cityB);
	body += haloText(`x="318" y="138" text-anchor="middle" font-size="9.8" font-weight="bold"`, '#c2410c', opts.iMid);
	body += haloText(`x="92" y="148" text-anchor="middle" font-size="10.5" font-weight="bold"`, '#713f12', opts.cityC);
	body += haloText(`x="92" y="180" text-anchor="middle" font-size="9.8" font-weight="bold"`, '#854d0e', opts.iOut);

	return wrapSciencesSvg(460, 246, body);
}

function svgTectonicCompression(): string {
	let body = `<rect x="6" y="6" width="448" height="228" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">الوثيقة: تشوهات القشرة الأرضية تحت تأثير قوى الانضغاط</text>`;

	// Right: Fold (A)
	body += `<rect x="238" y="42" width="200" height="176" rx="8" fill="#fffbeb" stroke="#d97706" stroke-width="1.6"/>`;
	body += `<text x="338" y="62" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#92400e">الشكل (1): صخور مرنة</text>`;
	body += `<path d="M 252 146 Q 296 86 338 142 Q 380 194 424 136" fill="none" stroke="#b45309" stroke-width="11" stroke-linecap="round"/>`;
	body += `<path d="M 252 162 Q 296 102 338 158 Q 380 210 424 152" fill="none" stroke="#f59e0b" stroke-width="7" stroke-linecap="round"/>`;
	body += `<text x="338" y="206" text-anchor="middle" font-size="10" font-weight="bold" fill="#78350f">التواء الطبقات دون انكسار</text>`;

	// Left: Fault (B)
	body += `<rect x="22" y="42" width="200" height="176" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="1.6"/>`;
	body += `<text x="122" y="62" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#991b1b">الشكل (2): صخور صلبة</text>`;
	body += `<polygon points="36,108 112,108 100,140 36,140" fill="#fca5a5" stroke="#991b1b" stroke-width="1.4"/>`;
	body += `<polygon points="124,132 208,132 208,164 112,164" fill="#fca5a5" stroke="#991b1b" stroke-width="1.4"/>`;
	body += `<line x1="128" y1="84" x2="88" y2="188" stroke="#7f1d1d" stroke-width="3.2"/>`;
	body += `<text x="122" y="206" text-anchor="middle" font-size="10" font-weight="bold" fill="#991b1b">انكسار مصحوب بإزاحة الكتلتين</text>`;

	return wrapSciencesSvg(460, 240, body);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Earthquake Properties, Isoseismals & Richter vs Mercalli (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const earthquakePropertiesTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3am_t1_earthquake_properties',
	grade: '3am',
	trimesterId: 't1',
	domain: 'geology_earth',
	titleAr: 'دراسة خصائص زلزال في شمال الجزائر (المركز السطحي، البؤرة، المقدار والشدة)',
	curriculumLessonId: 'sci_lesson_3am_t1_earthquakes_properties',
	defaultPoints: 6,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cases = [
			{ cityA: 'زموري (بومرداس)', cityB: 'الجزائر العاصمة', cityC: 'البويرة', mag: 6.8, depth: 10, iMax: 'الشدة IX', iMid: 'الشدة VII', iOut: 'الشدة V' },
			{ cityA: 'الأصنام (الشلف)', cityB: 'عين الدفلى', cityC: 'تيارت', mag: 7.3, depth: 12, iMax: 'الشدة X', iMid: 'الشدة VIII', iOut: 'الشدة V' },
			{ cityA: 'بني ورتيلان (سطيف)', cityB: 'برج بوعريريج', cityC: 'المسيلة', mag: 5.5, depth: 8, iMax: 'الشدة VII', iMid: 'الشدة V', iOut: 'الشدة III' }
		];
		const sc = rng.pick(cases);
		const deepDepth = sc.depth * 6;
		const svg = svgIsoseismalMap(sc);
		const imageUrl = saveSciencesSvgAsset(`sci_3am_t1_eq_prop_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`المركز السطحي هو ${sc.cityA} لأنها تقع في مركز المنحنيات متساوية الشدة وبها أكبر شدة (${sc.iMax})`,
			[
				{
					text: `المركز السطحي هو ${sc.cityC} لأن الشدة فيها هي الأضعف`,
					diagnosticFeedback: 'المركز السطحي يسجل **أكبر شدة** وليس أضعفها.'
				},
				{
					text: `مقدار الزلزال يتغير من ${sc.cityA} إلى ${sc.cityC} حسب سلم ريشتر`,
					diagnosticFeedback: 'الذي يتغير حسب المسافة هو **الشدة (سلم ميركالي)**، أما المقدار على سلم ريشتر فثابت للزلزال الواحد.'
				},
				{
					text: `البؤرة تقع على سطح الأرض في ${sc.cityA}`,
					diagnosticFeedback: 'البؤرة تقع في **باطن الأرض** على عمق $' + sc.depth + '\\text{ km}$، أما النقطة السطحية فوقها فهي المركز السطحي.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: `ضرب زلزال بمقدار $${sc.mag}$ على سلم ريشتر وعمق بؤرة $${sc.depth}\\text{ km}$ المنطقة المبينة في خريطة المنحنيات متساوية الشدة. أي عبارة صحيحة؟`,
				questionTextAr: `من خريطة المنحنيات متساوية الشدة لزلزال ${sc.cityA} ($M = ${sc.mag}$)، حدد العبارة الصحيحة:`,
				imageUrl,
				imageCaption: 'خريطة المنحنيات متساوية الشدة',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `تقع ${sc.cityA} في مركز المنحنيات متساوية الشدة وسجلت أعلى شدة (${sc.iMax}) فهي **المركز السطحي**، بينما تقع البؤرة شاقولياً أسفلها على عمق $${sc.depth}\\text{ km}$.`
			},
			sujetExercise: {
				points: 6,
				instruction: `ضرب زلزال منطقة في شمال الجزائر بمقدار $${sc.mag}$ على سلم ريشتر، وقُدّر عمق بؤرته بـ $${sc.depth} " km"$، وتبعته عدة هزات أضعف. تمثل الوثيقة المقابلة خريطة المنحنيات متساوية الشدة لهذا الزلزال.`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) حدّد *المركز السطحي* لهذا الزلزال مع التعليل، ثم عرّف كلاً من *البؤرة الزلزالية* و*الهزات الارتدادية*.`,
								answer: `1) *المركز السطحي*: هو مدينة ${sc.cityA} لأنها تقع في مركز المنحنيات متساوية الشدة وسجلت بها أكبر شدة (${sc.iMax}).\n\n- *البؤرة*: نقطة انطلاق الأمواج الزلزالية في عمق القشرة الأرضية ($${sc.depth} " km"$ هنا).\n- *الهزات الارتدادية*: هزات أرضية أضعف تتبع الهزة الرئيسية نتيجة إعادة توازن الكتل الصخرية.`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: خريطة المنحنيات متساوية الشدة'
							}
						]
					},
					{
						type: 'text',
						content: `2) فسّر لماذا كانت الخسائر في ${sc.cityB} أكبر من الخسائر في ${sc.cityC} رغم أنهما تعرضتا لنفس الزلزال ($${sc.mag}$ ريشتر).`,
						answer: `2) لأن مدينة ${sc.cityB} أقرب إلى المركز السطحي (${sc.cityA}) من مدينة ${sc.cityC}، وكلما ابتعدنا عن المركز السطحي تضعف طاقة الأمواج الزلزالية فتتناقص *الشدة* وحجم الخسائر.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) ميّز في جملة دقيقة بين ما يقيسه *سلم ريشتر* وما يقيسه *سلم ميركالي (EMS-98)*، واذكر اسم الجهاز المستعمل لتسجيل الأمواج الزلزالية.`,
						answer: `3) *سلم ريشتر* يقيس *المقدار* (كمية الطاقة المحررة في البؤرة وهو ثابت للزلزال)، بينما *سلم ميركالي* يقدّر *الشدة* (حجم الخسائر المادية والبشرية على السطح). الجهاز المسجل هو *المسجل الزلزالي (السيسموغراف)*.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) لو كان عمق بؤرة هذا الزلزال $${deepDepth} " km"$ بدلاً من $${sc.depth} " km"$ بنفس المقدار، كيف ستكون الخسائر في المركز السطحي؟ علّل.`,
						answer: `4) ستكون الخسائر *أقل بكثير*، لأنه كلما زاد عمق البؤرة تقطعت الأمواج الزلزالية مسافة أطول فتفقد جزءاً أكبر من طاقتها قبل بلوغ السطح.`,
						mark: '1'
					}
				]
			},
			hints: [
				'المركز السطحي هو مركز المنحنيات متساوية الشدة حيث تسجل أعلى شدة.',
				'المقدار (سلم ريشتر) يقيس طاقة البؤرة، والشدة (ميركالي) تقيس الخسائر وتتناقص بالابتعاد عن المركز السطحي.',
				'كلما كانت البؤرة أقل عمقاً (قريبة من السطح) كانت الخسائر أشد.'
			],
			solutionStepsAr: [
				`المركز السطحي هو ${sc.cityA} (${sc.iMax}) وتقع البؤرة أسفلها على عمق $${sc.depth}\\text{ km}$.`,
				`تتناقص الشدة بالابتعاد عن المركز السطحي لذا ${sc.cityB} أشد تضرراً من ${sc.cityC}.`,
				'ريشتر يقيس المقدار (بالسيسموغراف) وميركالي يقدر الشدة.',
				`زيادة عمق البؤرة إلى $${deepDepth}\\text{ km}$ يقلّص شدة الخسائر على السطح.`
			],
			finalAnswer: sc.cityA
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Tectonic Compression, Faults & Folds (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const faultsFoldsTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3am_t1_faults_folds_compression',
	grade: '3am',
	trimesterId: 't1',
	domain: 'geology_earth',
	titleAr: 'أسباب الزلازل في شمال الجزائر: قوى الانضغاط، الطيات والفوالق',
	curriculumLessonId: 'sci_lesson_3am_t1_earthquake_causes_faults_folds',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const regions = [
			{ name: 'الأطلس التلي (الشلف)', shiftM: 3, rockSoft: 'الغضار والكلس المرن', rockHard: 'الصخور الصلبة العميقة' },
			{ name: 'سلسلة جبال جرجرة', shiftM: 2.5, rockSoft: 'الطبقات الرسوبية المرنة', rockHard: 'القاعدة الصخرية الصلبة' }
		];
		const reg = rng.pick(regions);
		const svg = svgTectonicCompression();
		const imageUrl = saveSciencesSvgAsset(`sci_3am_t1_fault_fold_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'الشكل (1) طية في صخور مرنة، والشكل (2) فالق في صخور صلبة وكلاهما ناتج عن قوى الانضغاط',
			[
				{
					text: 'الشكل (1) فالق في صخور صلبة، والشكل (2) طية في صخور مرنة',
					diagnosticFeedback: 'الطية هي الالتواء دون انكسار (صخور مرنة)، والفالق هو الانكسار مع إزاحة (صخور صلبة).'
				},
				{
					text: 'كلا الشكلين ناتج عن عوامل الحت الريحي والمائي فقط',
					diagnosticFeedback: 'الطيات والفوالق تشوهات تكتونية داخلية ناتجة عن قوى الانضغاط في باطن الأرض.'
				},
				{
					text: 'الطيات هي التي تسبب الانكسار المفاجئ والزلازل المباشرة',
					diagnosticFeedback: 'الزلزال ينجم عن الانكسار المفاجئ في الصخور الصلبة على مستوى **الفوالق**.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `تخضع منطقة ${reg.name} لقوى تكتونية مستمرة أدت إلى ظهور البنيتين (1) و(2) في الوثيقة. ما التشخيص الصحيح لهما؟`,
				questionTextAr: 'تعرّف على التشوهين الصخريين في الشكلين (1) و(2) والسبب المشترك لهما:',
				imageUrl,
				imageCaption: 'التشوهات الصخرية التكتونية',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'تؤدي قوى الانضغاط إلى تشكل **طيات** (الشكل 1) في الصخور المرنة و**فوالق** (الشكل 2) في الصخور الصلبة.'
			},
			sujetExercise: {
				points: 6,
				instruction: `تتميز منطقة ${reg.name} بشمال الجزائر بنشاط زلزالي متكرر وبوجود سلاسل جبلية حديثة تكثر فيها البنيتان الجيولوجيتان الممثلتان في الوثيقة المقابلة (حيث سُجلت إزاحة عمودية قدرها $${reg.shiftM} " m"$ على مستوى البنية 2).`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) سمِّ البنية الجيولوجية في الشكل (1) والبنية في الشكل (2)، وحدّد القوة الباطنية المشتركة المسؤولة عن تشكل كلتيهما.`,
								answer: `1) - الشكل (1): *طية* (محدبة ومقعرة).\n- الشكل (2): *فالق* (انكسار مصحوب بإزاحة).\n- القوة المشتركة: *قوى الانضغاط التكتونية* الناتجة عن تقارب الصفيحة الإفريقية والأوراسية.`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: تشوهات القشرة الأرضية'
							}
						]
					},
					{
						type: 'text',
						content: `2) فسّر اختلاف استجابة ${reg.rockSoft} (الشكل 1) عن ${reg.rockHard} (الشكل 2) رغم تعرضهما لنفس القوى التكتونية.`,
						answer: `2) يعود الاختلاف إلى *الطبيعة الفيزيائية للصخور*: الصخور المرنة تستجيب لقوى الانضغاط بالالتواء دون انكسار فتتشكل *طيات*، أما الصخور الصلبة فلا تتحمل الضغط فتنكسر وتنزاح مشكّلة *فوالق*.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) اشرح كيف يؤدي الشكل (2) مباشرة إلى حدوث زلزال في شمال الجزائر.`,
						answer: `3) تتراكم الطاقة في الصخور الصلبة تحت تأثير قوى الانضغاط، وعندما تفوق حد مقاومتها يحدث *انكسار مفاجئ* أو تحرك على طول الفالق، فتتحرر الطاقة المخزنة فجأة على شكل *أمواج زلزالية* تنتشر من البؤرة نحو السطح.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) علّل تركز الزلازل في شمال الجزائر (الأطلس التلي) وندرتها في الصحراء الجزائرية.`,
						answer: `4) لأن شمال الجزائر يقع في منطقة تصادم وانضغاط تكتوني نشطة بين الصفيحة الإفريقية والأوراسية حيث تكثر الفوالق النشطة والسلاسل الجبلية الحديثة، بينما تقع الصحراء بعيداً عن حدود الصفائح النشطة.`,
						mark: '1'
					}
				]
			},
			hints: [
				'الالتواء دون كسر يسمى طية (صخور مرنة)، والانكسار مع إزاحة يسمى فالقاً (صخور صلبة).',
				'القوة المسببة للتشوهات في شمال الجزائر هي قوى الانضغاط التكتونية.',
				'انكسار الصخور الصلبة في العمق يحرر الطاقة فجأة على شكل أمواج زلزالية.'
			],
			solutionStepsAr: [
				'الشكل (1) طية، الشكل (2) فالق، والسبب قوى الانضغاط.',
				'المرونة تسبب الالتواء (طية) والصلابة تسبب الانكسار (فالق).',
				'الانكسار المفاجئ على الفالق يحرر الطاقة الكامنة كأمواج زلزالية.',
				'شمال الجزائر منطقة تقارب صفائح نشطة تكتونياً عكس الصحراء المستقرة.'
			],
			finalAnswer: 'طية (1) وفالق (2) بفعل قوى الانضغاط'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Oceanic Ridge, Seafloor Spreading & Velocity Calculation (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const oceanicRidgeTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3am_t1_oceanic_ridge_expansion',
	grade: '3am',
	trimesterId: 't1',
	domain: 'plate_tectonics',
	titleAr: 'الظهرة المحيطية، توسع قاع المحيط وحساب سرعة تباعد الصفائح',
	curriculumLessonId: 'sci_lesson_3am_t1_plate_tectonics_ridge',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const datasets = [
			{ distKm: 400, ageMa: 20, vHalfKmMa: 20, vHalfCm: 2, vTotalCm: 4 },
			{ distKm: 750, ageMa: 30, vHalfKmMa: 25, vHalfCm: 2.5, vTotalCm: 5 },
			{ distKm: 900, ageMa: 60, vHalfKmMa: 15, vHalfCm: 1.5, vTotalCm: 3 }
		];
		const d = rng.pick(datasets);
		const svg = svgGeologyDiagram('oceanic_ridge', { numbered: true, title: 'الوثيقة: نشاط الظهرة المحيطية وتباعد الصفائح' });
		const imageUrl = saveSciencesSvgAsset(`sci_3am_t1_ridge_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`سرعة حركة جانب واحد $${d.vHalfCm}\\text{ cm/an}$ وسرعة تباعد القارتين $${d.vTotalCm}\\text{ cm/an}$`,
			[
				{
					text: `سرعة تباعد القارتين $${d.vHalfCm}\\text{ cm/an}$ فقط لأن التوسع يحدث في جهة واحدة`,
					diagnosticFeedback: 'التوسع متناظر على **جانبي** الظهرة المحيطية، لذا تضرب سرعة الجانب الواحد في 2.'
				},
				{
					text: `سرعة تباعد القارتين $${roundTo(d.vTotalCm * 10, 1)}\\text{ cm/an}$`,
					diagnosticFeedback: 'تذكّر التحويل الصحيح: $10\\text{ km/Ma} = 1\\text{ cm/an}$.'
				},
				{
					text: 'لا تتباعد القارتان لأن قاع المحيط ثابت العمر',
					diagnosticFeedback: 'ازدياد عمر البازلت بانتظام كلما ابتعدنا عن الظهرة يثبت توسع قاع المحيط وتباعد القارتين.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `تقع عينة بازلت من قاع المحيط الأطلسي على مسافة $${d.distKm}\\text{ km}$ شرق محور الظهرة المحيطية وقدّر عمرها بـ $${d.ageMa}\\text{ Ma}$ (مليون سنة). ما سرعة تباعد إفريقيا وأمريكا الجنوبية؟ (علماً أن $10\\text{ km/Ma} = 1\\text{ cm/an}$)`,
				questionTextAr: `بازلت يبعد $${d.distKm}\\text{ km}$ عن محور الظهرة وعمره $${d.ageMa}\\text{ Ma}$. احسب سرعة التباعد الكلية:`,
				imageUrl,
				imageCaption: 'الظهرة المحيطية وتوسع قاع المحيط',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `سرعة جانب واحد: $v_1 = \\frac{${d.distKm}}{${d.ageMa}} = ${d.vHalfKmMa}\\text{ km/Ma} = ${d.vHalfCm}\\text{ cm/an}$. وبما أن التوسع متناظر على الجانبين فإن سرعة التباعد الكلية $= 2 \\times ${d.vHalfCm} = ${d.vTotalCm}\\text{ cm/an}$.`
			},
			sujetExercise: {
				points: 6,
				instruction: `أظهرت قياسات عمر الصخور البازلتية في قاع المحيط الأطلسي أن عينة تقع على مسافة $${d.distKm} " km"$ شرق محور الظهرة المحيطية يبلغ عمرها $${d.ageMa}$ مليون سنة ($"Ma"$), وتماثلها عينة أخرى بنفس العمر على نفس المسافة غرب المحور.`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) استبدل الرقمين (1) و(2) في الوثيقة المقابلة بالبيانات العلمية المناسبة، واذكر شاهدين اعتمد عليهما العالم فيغنر لصياغة نظرية زحزحة القارات.`,
								answer: `1) - البيان (1): *رفت الظهرة المحيطية* (صعود الماغما البازلتية).\n- البيان (2): *تيارات الحمل الحراري* في الرداء (الأستينوسفير).\n- شاهدا فيغنر: *الشاهد المورفولوجي* (تطابق حواف إفريقيا وأمريكا الجنوبية)، و*الشاهد المستحاثي* (وجود نفس مستحاثات الميزوصور والغلوسوبتيريس) أو *الشاهد الجيولوجي*.`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: نشاط الظهرة المحيطية'
							}
						]
					},
					{
						type: 'text',
						content: `2) فسّر التماثل في عمر صخور البازلت على جانبي محور الظهرة المحيطية وازدياد عمرها كلما اقتربنا من القارتين.`,
						answer: `2) تتدفق الماغما البازلتية باستمرار من رفت الظهرة وتتبرد مشكّلة قشرة محيطية جديدة تدفع القشرة الأقدم بشكل متناظر نحو الجانبين، مما يثبت *توسع قاع المحيط* وتباعد الصفيحتين.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) احسب سرعة ابتعاد الصفيحة الإفريقية عن محور الظهرة بـ $"km/Ma"$ ثم بـ $"cm/an"$ (علماً أن $10 " km/Ma" = 1 " cm/an"$), واستنتج *سرعة التباعد الكلية* بين إفريقيا وأمريكا الجنوبية.`,
						answer: `3) سرعة جانب واحد: $v_1 = frac(${d.distKm}, ${d.ageMa}) = ${d.vHalfKmMa} " km/Ma" = ${d.vHalfCm} " cm/an"$.\n\nسرعة التباعد الكلية (المتناظرة على الجانبين): $v_"tot" = 2 times ${d.vHalfCm} = ${d.vTotalCm} " cm/an"$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) حدّد المحرك الباطني المسؤول عن حركة الصفائح التكتونية فوق طبقة الأستينوسفير.`,
						answer: `4) المحرك هو *تيارات الحمل الحراري* في الرداء الناتجة عن الفارق الحراري الشديد في باطن الأرض.`,
						mark: '1'
					}
				]
			},
			hints: [
				'الظهرة المحيطية تبني قشرة بازلتية جديدة في المحور وتدفع الأقدم بالتناظر نحو الجانبين.',
				'استعمل العلاقة $v = d / t$ ثم حوّل بقسمة $\\text{km/Ma}$ على $10$ للحصول على $\\text{cm/an}$.',
				'سرعة التباعد بين القارتين تساوي ضعف سرعة ابتعاد جانب واحد عن محور الظهرة.'
			],
			solutionStepsAr: [
				'البيان (1) رفت الظهرة، البيان (2) تيارات الحمل الحراري؛ وشواهد فيغنر: المورفولوجي، الجيولوجي، والمستحاثي.',
				'صعود الماغما المتواصل يدفع البازلت الأقدم بالتناظر نحو الجانبين.',
				`$v_1 = ${d.vHalfCm}\\text{ cm/an}$ ومنه $v_{\\text{تباعد}} = ${d.vTotalCm}\\text{ cm/an}$.`,
				'المحرك هو تيارات الحمل الحراري الناتجة عن الحرارة الداخلية للأرض.'
			],
			finalAnswer: `${d.vTotalCm} cm/an`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Subduction, Volcanism & Seismic Velocity Graph of Earth's Interior (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const subductionInteriorTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3am_t1_subduction_volcanism_interior',
	grade: '3am',
	trimesterId: 't1',
	domain: 'plate_tectonics',
	titleAr: 'ظاهرة الغوص، النمط البركاني، والبنية الداخلية للكرة الأرضية',
	curriculumLessonId: 'sci_lesson_3am_t1_subduction_volcanoes_earth_structure',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const svgPlot = svgBioCurvePlot({
			title: 'تغيرات سرعة الأمواج الزلزالية الأولية بدلالة العمق في باطن الأرض',
			xMin: 0,
			xMax: 6000,
			yMin: 0,
			yMax: 15,
			xStep: 1000,
			yStep: 3,
			xLabel: 'العمق (km)',
			yLabel: 'السرعة (km/s)',
			shadedZones: [
				{ x1: 2900, x2: 5100, fill: '#fef9c3', label: 'النواة الخارجية (سائلة)', textColor: '#854d0e' }
			],
			eventArrows: [
				{ x: 2900, label: 'غوتنبرغ', color: '#dc2626' },
				{ x: 5100, label: 'ليمان', color: '#1d4ed8' }
			],
			curves: [
				{
					fn: (x) => {
						if (x < 30) return 6.2;
						if (x < 2900) return 8.0 + ((x - 30) / 2870) * 5.6;
						if (x < 5100) return 8.1 + ((x - 2900) / 2200) * 2.2;
						return 11.2;
					},
					color: '#dc2626',
					label: 'سرعة الموجة P'
				}
			]
		});
		const imageUrl = saveSciencesSvgAsset(`sci_3am_t1_interior_vp_${difficulty}_s${seed}`, svgPlot);

		const focusQ = rng.pick([
			{
				prompt: 'انخفاض سرعة الموجة P فجأة عند عمق $2900\\text{ km}$ مع اختفاء الموجة S يثبت أن:',
				correct: 'الطبقة التي تبدأ عند $2900\\text{ km}$ (النواة الخارجية) في حالة سائلة عند انقطاع غوتنبرغ',
				d1: 'القشرة الأرضية تمتد حتى عمق $2900\\text{ km}$',
				f1: 'سمك القشرة الأرضية يتراوح بين 7 و30 كم فقط وينتهي عند انقطاع موهو.',
				d2: 'الرداء السفلي في حالة غازية تماماً',
				f2: 'الرداء السفلي صلب بدليل الارتفاع المستمر لسرعة الأمواج حتى عمق $2900\\text{ km}$.',
				d3: 'الأرض متجانسة التركيب من السطح إلى المركز',
				f3: 'التغيرات المفاجئة للسرعة (الانقطاعات) تثبت أن الأرض مكونة من طبقات مختلفة الكثافة والحالة.'
			},
			{
				prompt: 'تتميّز مناطق الغوص (مثل سلسلة جبال الأنديز) ببراكين:',
				correct: 'انفجارية ذات ماغما لزجة غنية بالغازات ناتجة عن انصهار جزئي للرداء بفعل غوص الصفيحة المحيطية',
				d1: 'طفحية هادئة ذات ماغما مائعة خالية من الغازات',
				f1: 'البراكين الطفحية تميّز الظهرات المحيطية (مناطق التباعد) وليس مناطق الغوص.',
				d2: 'باردة لا تصعد فيها الماغما مطلقاً',
				f2: 'صعود الماغما اللزجة هو ما يولّد البركنة الانفجارية في مناطق الغوص.',
				d3: 'مرتبطة بالحت الريحي السطحي فقط',
				f3: 'البركنة الانفجارية ظاهرة باطنية ناتجة عن تكتونية الصفائح.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			focusQ.correct,
			[
				{ text: focusQ.d1, diagnosticFeedback: focusQ.f1 },
				{ text: focusQ.d2, diagnosticFeedback: focusQ.f2 },
				{ text: focusQ.d3, diagnosticFeedback: focusQ.f3 }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: focusQ.prompt,
				questionTextAr: focusQ.prompt,
				imageUrl,
				imageCaption: 'تغيرات سرعة الأمواج الزلزالية P بدلالة العمق',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: focusQ.correct
			},
			sujetExercise: {
				points: 6,
				instruction: `سمحت دراسة انتشار الأمواج الزلزالية ($P$) في باطن الكرة الأرضية بإنشاء المنحنى البياني الموضح في الوثيقة المقابلة. كما أظهرت الدراسات أن توسع المحيطات عند الظهرات يقابله استهلاك للقشرة المحيطية في مناطق أخرى تُسمى *مناطق الغوص*.`,
				content: [
					{
						type: 'columns',
						widths: ['1.25fr', '1.15fr'],
						children: [
							{
								type: 'text',
								content: `1) انطلاقاً من المنحنى البياني، فسّر سبب التغير المفاجئ في سرعة الأمواج الزلزالية عند عمق $2900 " km"$ (انقطاع غوتنبرغ) وعمق $5100 " km"$ (انقطاع ليمان)، واستنتج الحالة الفيزيائية للنواة الخارجية والنواة الداخلية.`,
								answer: `1) يدل التغير المفاجئ للسرعة على الانتقال بين طبقتين مختلفتي الحالة الفيزيائية والتركيب:\n- عند $2900 " km"$ (غوتنبرغ): تنخفض سرعة $P$ فجأة من الرداء الصلب إلى *النواة الخارجية السائلة*.\n- عند $5100 " km"$ (ليمان): ترتفع السرعة مجدداً عند الدخول إلى *النواة الداخلية (البذرة) الصلبة*.`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: تغير سرعة الأمواج P مع العمق'
							}
						]
					},
					{
						type: 'text',
						content: `2) حدّد الفرق البنيوي بين *الليتوسفير* و*الأستينوسفير*.`,
						answer: `2) *الليتوسفير* غلاف صخري صلب يتكون من القشرة الأرضية + الجزء العلوي الصلب من الرداء العلوي؛ أما *الأستينوسفير* فيقع تحته وهو جزء مرن (مطاطي) من الرداء العلوي تتحرك فوقه الصفائح التكتونية.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) فسّر *ظاهرة الغوص* (لماذا تغوص الصفيحة المحيطية تحت الصفيحة القارية؟) وبيّن دورها في ثبات حجم الكرة الأرضية.`,
						answer: `3) تغوص الصفيحة المحيطية تحت القارية عند الخندق المحيطي لأنها *أكثر كثافة (أثقل)*. وتسمح هذه الظاهرة باستهلاك القشرة المحيطية القديمة وانصهارها في الرداء لتعويض البناء المستمر في الظهرات، فيبقى حجم الأرض ثابتاً.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) اذكر نمط البراكين المميزة لمناطق الغوص وخاصيتين لماغمتها.`,
						answer: `4) براكين *انفجارية*؛ تتميز بماغما *لزجة* و*غنية بالغازات وبخار الماء* فتقذف سحب الرماد والقذائف البركانية بعنف.`,
						mark: '1'
					}
				]
			},
			hints: [
				'التغيرات المفاجئة في سرعة الأمواج الزلزالية تحدد الانقطاعات بين طبقات الأرض.',
				'النواة الخارجية سائلة (2900 إلى 5100 كم) والنواة الداخلية صلبة.',
				'الصفيحة المحيطية أثقل (أكثر كثافة) فتغوص تحت القارية مسببة براكين انفجارية.'
			],
			solutionStepsAr: [
				'عند غوتنبرغ (2900 كم) تنخفض السرعة لدخول النواة الخارجية السائلة، وعند ليمان (5100 كم) ترتفع في النواة الداخلية الصلبة.',
				'الليتوسفير صلب (قشرة + أعلى الرداء) والأستينوسفير مرن تحته.',
				'غوص الصفيحة المحيطية الأكثر كثافة يوازن التوسع عند الظهرات فيثبت حجم الأرض.',
				'براكين مناطق الغوص انفجارية ذات ماغما لزجة غنية بالغازات.'
			],
			finalAnswer: 'النواة الخارجية سائلة والداخلية صلبة؛ وبراكين الغوص انفجارية'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Integration Situation 1 (8 pts): Algerian Seismic Hazard & Urban Safety
// ═══════════════════════════════════════════════════════════════════════════════
const integrationSeismicHazardTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3am_t1_integration_algeria_seismic_hazard',
	grade: '3am',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: تفسير النشاط الزلزالي بشمال الجزائر وخطة الوقاية العمرانية',
	curriculumLessonId: 'sci_lesson_3am_t1_seismic_prevention_integration',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cases = [
			{ wilaya: 'بجاية', mag: 6.1, depth: 9, oldCollapse: '75%', rpaCollapse: '0%' },
			{ wilaya: 'بومرداس', mag: 6.8, depth: 10, oldCollapse: '82%', rpaCollapse: '2%' },
			{ wilaya: 'ميلة', mag: 5.4, depth: 7, oldCollapse: '68%', rpaCollapse: '0%' }
		];
		const c = rng.pick(cases);
		const svgFault = svgGeologyDiagram('earthquake_fault', {
			title: 'الوثيقة 1: بؤرة وفالق نشط تحت مدينة في شمال الجزائر'
		});
		const imgFault = saveSciencesSvgAsset(`sci_3am_t1_int1_${difficulty}_s${seed}`, svgFault);

		const mcq = buildUniqueMcqOptions(
			'تقارب الصفيحة الإفريقية نحو الأوراسية يولد قوى انضغاط وفوالق، والوقاية الأساسية هي البناء المضاد للزلازل',
			[
				{
					text: 'السبب هو تباعد إفريقيا عن أوروبا، والحل هو التنبؤ الدقيق بساعة الزلزال قبل أسبوع',
					diagnosticFeedback: 'إفريقيا وأوراسيا في حركة **تقارب** وليس تباعداً، كما لا يمكن التنبؤ الدقيق بزمن الزلزال حالياً.'
				},
				{
					text: 'سبب انهيار البنايات القديمة هو عمق البؤرة الكبير فقط دون علاقة بنوعية البناء',
					diagnosticFeedback: 'توضح الوثيقة (2) أن البنايات المطابقة للمعايير المضادة للزلازل صمدت تماماً رغم نفس الهزة.'
				},
				{
					text: 'يجب الفرار نحو المصاعد الكهربائية فور الشعور بالهزة الأرضية',
					diagnosticFeedback: 'استعمال المصعد أثناء الزلزال خطر شديد لاحتمال انقطاع الكهرباء وتعطله.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: 'integration',
			titleAr: this.titleAr,
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: `ضرب زلزال بمقدار $${c.mag}$ وعمق بؤرة $${c.depth}\\text{ km}$ ولاية ${c.wilaya}، فانهارت نسبة ${c.oldCollapse} من البنايات الفوضوية بينما صمدت البنايات المضادة للزلازل. ما التفسير والحل الأمثل؟`,
				questionTextAr: `ما السبب الجيولوجي لزلزال ${c.wilaya} وما الإجراء الوقائي الأنجع لتقليل الخسائر؟`,
				imageUrl: imgFault,
				imageCaption: 'الوثيقة 1: مقطع في منطقة الفالق النشط',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'ينتج النشاط الزلزالي بشمال الجزائر عن **تقارب الصفيحتين الإفريقية والأوراسية** وقوى الانضغاط على الفوالق، وأنجع وقاية هي **البناء المضاد للزلازل** والتوعية.'
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `*السياق*: شهدت ولاية ${c.wilaya} بشمال الجزائر هزة أرضية قوية بمقدار $${c.mag}$ على سلم ريشتر وبعمق بؤرة قدره $${c.depth} " km"$، تسببت في تشقق الطرق وانهيار عدد كبير من البنايات القديمة والفوضوية، بينما بقيت العمارات الحديثة المبنية وفق المعايير المضادة للزلازل سليمة. أُصيب بعض السكان بالذعر فركضوا نحو السلالم والمصاعد أثناء الهزة. لفهم سبب هذا الزلزال وكيفية حماية السكان، تُقدَّم لك الوثيقتان الآتيتان:`,
				content: [
					{
						type: 'columns',
						widths: ['1.15fr', '1.1fr'],
						children: [
							{
								type: 'table',
								headers: ['المعيار (الوثيقة 2)', 'حي قديم / فوضوي', 'حي حديث (مضاد للزلازل)'],
								cells: [],
								rows: [
									['طبيعة التربة المدروسة', 'غير مدروسة / هشة', 'مدروسة ومستقرة'],
									['مقاومة الهيكل الخرساني', 'ضعيفة دون تسليح كافٍ', 'خرسانة مسلحة مرنة (RPA)'],
									['نسبة المباني المتضررة بشدة', c.oldCollapse, c.rpaCollapse]
								],
								headerBackground: true,
								borders: 'grid',
								width: 'full'
							},
							{
								type: 'image',
								src: imgFault,
								caption: 'الوثيقة 1: بؤرة وفالق نشط بالمنطقة'
							}
						]
					},
					{
						type: 'text',
						content: `*التعليمات*: بالاعتماد على السياق والوثيقتين (1 و 2) ومكتسباتك القبلية:\n\n1) قدّم تفسيراً علمياً دقيقاً لأصل هذا الزلزال في ولاية ${c.wilaya}، مبيّناً علاقة عمق البؤرة ($${c.depth} " km"$) بحجم الشدة المسجلة على السطح.`,
						answer: `1) *بالاعتماد على الوثيقة (1) ومكتسباتي القبلية*: تقع ولاية ${c.wilaya} في شمال الجزائر (الأطلس التلي) الخاضع لـ*قوى انضغاط تكتونية* ناتجة عن تقارب الصفيحة الإفريقية نحو الصفيحة الأوراسية. أدت هذه القوى إلى *انكسار مفاجئ* للصخور الصلبة على مستوى *فالق* في العمق فتحررت الطاقة كأمواج زلزالية.\n\nوبما أن عمق البؤرة ضعيف جداً ($${c.depth} " km"$ — بؤرة سطحية)، وصلت الأمواج الزلزالية إلى المركز السطحي بطاقة كبيرة جداً فكانت *الشدة مرتفعة*.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `2) فسّر اختلاف حجم الأضرار بين الحي القديم والحي الحديث رغم تعرضهما لنفس المقدار ($${c.mag}$ ريشتر).`,
						answer: `2) *بالاعتماد على الوثيقة (2)*: سجل الحي القديم نسبة تضرر عالية (${c.oldCollapse}) بسبب ضعف البناء وغياب دراسة التربة وعدم احترام معايير البناء المقاوم، بينما صمد الحي الحديث (${c.rpaCollapse} أضرار) لأنه مبني على تربة مدروسة بهياكل خرسانية مسلحة مطابقة لقواعد *البناء المضاد للزلازل* التي تمتص الاهتزازات.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `3) صحّح السلوك الخاطئ الذي قام به بعض السكان، وقدّم *ثلاثة إجراءات وقائية* منظمة (قبل، أثناء، وبعد الزلزال) للحد من الخسائر البشرية مستقبلاً.`,
						answer: `3) *تصحيح السلوك*: الركض الفوضوي واستعمال المصاعد أثناء الهزة خطر قاتل (احتمال انقطاع الكهرباء أو سقوط الحطام في السلالم).\n\n*الإجراءات الوقائية الثلاثة*:\n- *قبل الزلزال*: تطبيق معايير البناء المضاد للزلازل وتثبيت الأثاث الثقيل وتوعية السكان.\n- *أثناء الزلزال*: المحافظة على الهدوء، الاحتماء تحت طاولة متينة وحماية الرأس والابتعاد عن النوافذ.\n- *بعد الزلزال*: قطع الغاز والكهرباء، الإخلاء الهادئ إلى ساحة مفتوحة عبر السلالم، والحذر من *الهزات الارتدادية*.`,
						mark: '2.5'
					}
				]
			},
			hints: [
				'اربط موقع شمال الجزائر بتقارب الصفيحة الإفريقية والأوراسية وقوى الانضغاط والفوالق.',
				'استغل الوثيقة (2) للمقارنة الدقيقة بين الحي الفوضوي والحي المضاد للزلازل.',
				'نظّم نصائحك الوقائية في ثلاث مراحل: قبل، أثناء، وبعد الزلزال.'
			],
			solutionStepsAr: [
				`تفسير زلزال ${c.wilaya} بقوى الانضغاط على فالق نشط وبؤرة سطحية ($${c.depth}\\text{ km}$).`,
				`ربط فارق الخسائر (${c.oldCollapse} مقابل ${c.rpaCollapse}) باحترام معايير البناء المضاد للزلازل.`,
				'رفض استعمال المصاعد والهلع، وتقديم 3 إجراءات وقائية (قبل، أثناء، بعد).'
			],
			finalAnswer: 'قوى انضغاط + فالق نشط + ضرورة البناء المضاد للزلازل والسلوك الوقائي'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Integration Situation 2 (8 pts): Subduction & Explosive Mediterranean Volcanism
// ═══════════════════════════════════════════════════════════════════════════════
const integrationVolcanismTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3am_t1_integration_mediterranean_volcanism',
	grade: '3am',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: تفسير بركان انفجاري في حوض المتوسط وعلاقته بالغوص وتكتونية الصفائح',
	curriculumLessonId: 'sci_lesson_3am_t1_subduction_volcanoes_earth_structure',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const volcanoes = [
			{ name: 'بركان إتنا / فيزوف (إيطاليا)', ashKm: 12, gasPct: '6% غازات وبخار ماء' },
			{ name: 'بركان سترومبولي (المتوسط)', ashKm: 9, gasPct: '5.5% غازات وبخار ماء' }
		];
		const v = rng.pick(volcanoes);
		const svgSub = svgGeologyDiagram('plate_subduction', {
			title: 'الوثيقة 1: غوص صفيحة محيطية وتشكل البركنة الانفجارية'
		});
		const imgSub = saveSciencesSvgAsset(`sci_3am_t1_int2_sub_${difficulty}_s${seed}`, svgSub);

		const mcq = buildUniqueMcqOptions(
			'بركان انفجاري ناتج عن ظاهرة غوص الصفيحة الإفريقية تحت الأوراسية، وتتميز ماغمته باللزوجة والغنى بالغازات',
			[
				{
					text: 'بركان طفحي ناتج عن تباعد الصفائح في ظهرة محيطية، وماغمته مائعة دون غازات',
					diagnosticFeedback: 'قذف أعمدة الرماد والغازات لمسافة كيلومترات يميز **البركان الانفجاري** المرتبط بمناطق الغوص.'
				},
				{
					text: 'ظاهرة جوية ناتجة عن الحت الريحي للجبال',
					diagnosticFeedback: 'البراكين ظاهرة جيولوجية داخلية ناتجة عن انصهار الصخور في العمق.'
				},
				{
					text: 'لا يمكن أبداً التنبؤ المسبق بثوران البراكين لغياب أي علامات إنذارية',
					diagnosticFeedback: 'على عكس الزلازل، تسبق الثوران البركاني علامات إنذارية قابلة للرصد كالغازات والهزات الدقيقة وانتفاخ البركان.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: 'integration',
			titleAr: this.titleAr,
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: `ثار ${v.name} قاذفاً سحابة رماد وغازات بلغ ارتفاعها $${v.ashKm}\\text{ km}$ مع انفجارات عنيفة. ما نمط هذا البركان وما الظاهرة الجيولوجية المسببة له؟`,
				questionTextAr: `ما نمط ${v.name} وما الظاهرة التكتونية المفسرة لنشاطه؟`,
				imageUrl: imgSub,
				imageCaption: 'الوثيقة 1: ظاهرة الغوص والبركنة الانفجارية',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'سحب الرماد الكثيفة والانفجارات العنيفة تميّز **البركان الانفجاري** الناتج عن **ظاهرة الغوص** وماغمته اللزجة الغنية بالغازات.'
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `*السياق*: شهد حوض البحر الأبيض المتوسط ثوراناً عنيفاً لـ${v.name} مصحوباً بهزات أرضية متصاعدة وقذف سحب كثيفة من الرماد والغازات السامة على ارتفاع $${v.ashKm} " km"$، مما دفع السلطات إلى إجلاء السكان المجاورين قبل ذروة الانفجار بيومين. في المقابل، تسجّل براكين إيسلندا وسط المحيط الأطلسي تدفقات حمم سائلة وهادئة دون انفجارات ضخمة. تُقدَّم لك الوثيقتان الآتيتان:`,
				content: [
					{
						type: 'columns',
						widths: ['1.15fr', '1.1fr'],
						children: [
							{
								type: 'table',
								headers: ['الخاصية (الوثيقة 2)', v.name, 'براكين إيسلندا (الأطلسي)'],
								cells: [],
								rows: [
									['طبيعة الماغما', 'لزجة جداً (غنية بالسيليس)', 'مائعة جداً (بازلتية)'],
									['نسبة الغازات وبخار الماء', v.gasPct, 'أقل من 1%'],
									['النشاط السطحي', 'انفجارات وسحب رماد حارقة', 'تدفقات لافا طويلة هادئة']
								],
								headerBackground: true,
								borders: 'grid',
								width: 'full'
							},
							{
								type: 'image',
								src: imgSub,
								caption: 'الوثيقة 1: مقطع في منطقة الغوص'
							}
						]
					},
					{
						type: 'text',
						content: `*التعليمات*: بالاعتماد على السياق والوثيقتين (1 و 2) ومكتسباتك القبلية:\n\n1) حدّد *نمط* كل من ${v.name} وبراكين إيسلندا، وفسّر سبب عنف ثوران ${v.name} مقارنة ببراكين إيسلندا.`,
						answer: `1) *بالاعتماد على الوثيقة (2)*:\n- ${v.name}: *بركان انفجاري*؛ يعود عنفه إلى أن ماغمته *لزجة جداً وغنية بالغازات وبخار الماء* (${v.gasPct})، فتحتبس الغازات تحت ضغط شديد حتى تنفجر بعنف قاذفة الرماد والصخور.\n- براكين إيسلندا: *براكين طفحية*؛ لأن ماغمتها *مائعة وفقيرة بالغازات* فتتحرر الغازات بسهولة وتنساب اللافا بهدوء.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `2) اشرح الظاهرة التكتونية الممثلة في الوثيقة (1) التي أدت إلى تشكل ${v.name} في حوض المتوسط.`,
						answer: `2) *بالاعتماد على الوثيقة (1) ومكتسباتي*: الظاهرة هي *الغوص*، حيث تنزلق الصفيحة المحيطية الأكثر كثافة تحت الصفيحة القارية الأقل كثافة عند الخندق المحيطي؛ ومع ازدياد العمق والحرارة تحرر الصفيحة الغائصة ماءً يسبب *انصهاراً جزئياً للرداء* فتتشكل ماغما لزجة غنية بالغازات تصعد عبر شقوق القشرة مكونة براكين انفجارية.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `3) كيف تمكنت السلطات من التنبؤ بالثوران وإجلاء السكان قبل يومين من ذروته؟ اقترح إجراءين للوقاية من الأخطار البركانية.`,
						answer: `3) تمكنت السلطات من *التنبؤ بالثوران البركاني* بفضل مراقبة العلامات الإنذارية المسبقة: تسجيل هزات أرضية خفيفة متكررة، رصد انتفاخ فوهة البركان، ارتفاع حرارة المياه والتربة، وتصاعد الغازات.\n\n*إجراءان للوقاية*: (1) إقامة محطات مراقبة دائمة ووضع خطط إجلاء مسبقة للسكان، (2) منع التوسع العمراني في الممرات القريبة من الفوهة وإنشاء حواجز لتحويل مسار الحمم عند اللزوم.`,
						mark: '2.5'
					}
				]
			},
			hints: [
				'قارن في الوثيقة (2) بين لزوجة الماغما ونسبة الغازات في البركان الانفجاري والطفحي.',
				'استغل الوثيقة (1) لشرح غوص الصفيحة المحيطية وانصهار الرداء الجزئي.',
				'اذكر مؤشرات التنبؤ بالثوران البركاني (هزات دقيقة، انتفاخ، غازات، حرارة).'
			],
			solutionStepsAr: [
				`${v.name} بركان انفجاري (ماغما لزجة غنية بالغازات) وإيسلندا طفحي (ماغما مائعة).`,
				'شرح ظاهرة الغوص (صفيحة محيطية أثقل تغوص تحت قارية ← انصهار جزئي ← ماغما).',
				'ذكر علامات التنبؤ البركاني وإجراءين للوقاية وحماية السكان.'
			],
			finalAnswer: 'بركان انفجاري ناتج عن ظاهرة الغوص؛ ويمكن التنبؤ به عبر العلامات الإنذارية'
		};
	}
};

export const SCIENCES_TEMPLATES_3AM_T1: SciencesParameterizedTemplate[] = [
	earthquakePropertiesTemplate,
	faultsFoldsTemplate,
	oceanicRidgeTemplate,
	subductionInteriorTemplate,
	integrationSeismicHazardTemplate,
	integrationVolcanismTemplate
];
