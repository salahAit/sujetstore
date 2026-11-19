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
	svgImmunologyDiagram,
	svgPhysiologyDiagram,
	wrapSciencesSvg
} from '../../svg-sciences';

function svgAboAgglutinationSlide(opts: {
	patientName: string;
	aggA: boolean;
	aggB: boolean;
	aggD: boolean;
}): string {
	let body = `<rect x="6" y="6" width="448" height="218" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="230" y="26" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">الوثيقة 1: نتائج اختبار الارتصاص لتحديد زمرة دم ${esc(opts.patientName)}</text>`;

	const drops = [
		{ x: 356, label: 'Anti-A', agg: opts.aggA },
		{ x: 230, label: 'Anti-B', agg: opts.aggB },
		{ x: 104, label: 'Anti-D (Rh)', agg: opts.aggD }
	];
	for (const d of drops) {
		body += `<rect x="${d.x - 54}" y="46" width="108" height="156" rx="8" fill="#ffffff" stroke="#334155" stroke-width="1.6"/>`;
		body += `<text x="${d.x}" y="68" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#1d4ed8">${esc(d.label)}</text>`;
		body += `<circle cx="${d.x}" cy="120" r="32" fill="${d.agg ? '#fee2e2' : '#ef4444'}" stroke="#991b1b" stroke-width="1.8"/>`;
		if (d.agg) {
			// Clumped agglutination granules
			for (const [dx, dy] of [[-12, -10], [10, -8], [-8, 12], [12, 10], [0, 0], [-16, 2], [4, -15]]) {
				body += `<circle cx="${d.x + dx}" cy="${120 + dy}" r="4.8" fill="#991b1b"/>`;
			}
			body += `<text x="${d.x}" y="182" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">حدوث ارتصاص (+)</text>`;
		} else {
			body += `<text x="${d.x}" y="182" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#15803d">عدم حدوث ارتصاص (−)</text>`;
		}
	}
	return wrapSciencesSvg(460, 230, body);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Nervous Pathways, Cortical Lesions & Reflex Arc (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const nervousPathwaysTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4am_t2_nervous_pathways_cortex_reflex',
	grade: '4am',
	trimesterId: 't2',
	domain: 'nervous_regulation',
	titleAr: 'القوس الانعكاسية وتشخيص إصابات الجهاز العصبي (الحس، الإرادية، واللاإرادية)',
	curriculumLessonId: 'sci_lesson_4am_t2_sensation_voluntary_reflex_arc',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cases = [
			{ sideParalyzed: 'الطرف العلوي الأيمن', cortexSide: 'الساحة الحركية لنصف الكرة المخية الأيسر', blindRegion: 'الساحة البصرية بالفص القفوي' },
			{ sideParalyzed: 'الطرف العلوي الأيسر', cortexSide: 'الساحة الحركية لنصف الكرة المخية الأيمن', blindRegion: 'الساحة البصرية بالفص القفوي' }
		];
		const c = rng.pick(cases);
		const svg = svgPhysiologyDiagram('reflex_arc', {
			numbered: true,
			title: 'الوثيقة: القوس الانعكاسية للحركة اللاإرادية'
		});
		const imageUrl = saveSciencesSvgAsset(`sci_4am_t2_reflex_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`الإصابة في ${c.cortexSide} لأن التحكم الحركي للقشرة المخية متعاكس`,
			[
				{
					text: 'الإصابة في الساحة البصرية للفص القفوي',
					diagnosticFeedback: 'إصابة الساحة البصرية تسبب العمى رغم سلامة العينين، وليس شلل الأطراف.'
				},
				{
					text: 'الإصابة في المستقبلات الحسية للجلد فقط',
					diagnosticFeedback: 'تلف المستقبلات الحسية يمنع الإحساس في الجلد لكنه لا يسبب شلل الحركة الإرادية.'
				},
				{
					text: 'النخاع الشوكي هو مركز نشأة الحركة الإرادية',
					diagnosticFeedback: 'الحركة الإرادية تنشأ في **الساحة الحركية للقشرة المخية**، أما النخاع الشوكي فمركز الحركة **اللاإرادية** وممر للإرادية.'
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
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `أصيب مريض بشلل في **${c.sideParalyzed}** بعد جلطة دماغية، مع سلامة العضلات والأعصاب والنخاع الشوكي. أين تقع الإصابة بدقة؟`,
				questionTextAr: `حدّد بدقة موقع الإصابة المسببة لشلل ${c.sideParalyzed}:`,
				imageUrl,
				imageCaption: 'القوس الانعكاسية',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `يتحكم كل نصف كرة مخية في الجهة المعاكسة من الجسم، لذا فشلل ${c.sideParalyzed} ينتج عن إصابة **${c.cortexSide}**.`
			},
			sujetExercise: {
				points: 6,
				instruction: `عند لمس جسم ساخن جداً تسحب يدك بسرعة فائقة دون تفكير (فعل منعكس)، كما تستطيع إرادياً التقاط قلم والكتابة به. تُظهر الوثيقة المقابلة العناصر المتدخلة في الفعل المنعكس.`,
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) سمِّ البيانات المرقمة (1)، (2)، و(3) في الوثيقة المقابلة، واذكر دور كل عنصر في القوس الانعكاسية.`,
								answer: `1) - (1) *عصبون (ناقل) حسي* (عبر الجذر الخلفي): ينقل الرسالة العصبية الحسية الجابذة من الجلد نحو المركز.\n- (2) *عصبون (ناقل) حركي* (عبر الجذر الأمامي): ينقل الرسالة العصبية الحركية النابذة نحو العضلة.\n- (3) *النخاع الشوكي* (مركز عصبي): يعالج الرسالة الحسية ويحولها إلى رسالة حركية.`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: القوس الانعكاسية المرقمة'
							}
						]
					},
					{
						type: 'text',
						content: `2) حدّد الموقع الدقيق للإصابة في كل حالة طبية مما يلي (مع سلامة العينين والعضلات):\n- الحالة (أ): فقدان البصر التام بعد صدمة في مؤخرة الرأس.\n- الحالة (ب): شلل إرادي في *${c.sideParalyzed}*.`,
						answer: `2) - الحالة (أ): تلف *${c.blindRegion}* المسؤولة عن ترجمة الرسائل البصرية.\n- الحالة (ب): تلف *${c.cortexSide}* لأن التحكم الحركي للقشرة المخية متعاكس.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) فسّر لماذا يُصاب شخص تعرّض لقطع تام في *النخاع الشوكي* بالظهر بشلل الساقين إرادياً، بينما تبقى ساقاه تنسحبان لاإرادياً عند وخز القدم.`,
						answer: `3) في *الحركة الإرادية* يعمل النخاع الشوكي *كناقل (ممر)* للألياف الحركية القادمة من القشرة المخية، فقطعه يمنع وصول الأمر الإرادي للساقين؛ أما في *الحركة اللاإرادية* فيبقى الجزء السفلي من النخاع الشوكي سليماً ويعمل *كمركز عصبي* للفعل المنعكس.`,
						mark: '2'
					}
				]
			},
			hints: [
				'الجذر الخلفي (ذي العقدة الشوكية) يحمل العصبون الحسي، والجذر الأمامي يحمل العصبون الحركي.',
				'القشرة المخية تتحكم بشكل متعاكس (الأيسر يتحكم في الأيمن والعكس)، وساحة الرؤية تقع في الفص القفوي.',
				'فرّق بين دور النخاع الشوكي كممر في الحركة الإرادية وكمركز في الحركة اللاإرادية.'
			],
			solutionStepsAr: [
				'تسمية البيانات (1) عصبون حسي، (2) عصبون حركي، (3) نخاع شوكي ودور كل منها.',
				`تشخيص الحالة (أ) بتلف ${c.blindRegion} والحالة (ب) بتلف ${c.cortexSide}.`,
				'تفسير الشلل الإرادي وبقاء المنعكس بالتمييز بين دور النخاع كناقل ومركز.'
			],
			finalAnswer: c.cortexSide
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Alcohol & Drugs Effect on Reaction Time & Synapses (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const alcoholSynapseTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4am_t2_alcohol_drugs_synapse',
	grade: '4am',
	trimesterId: 't2',
	domain: 'nervous_regulation',
	titleAr: 'تأثير الكحول والمخدرات على النقل المشبكي وزمن الاستجابة العصبية',
	curriculumLessonId: 'sci_lesson_4am_t2_drugs_alcohol_nervous_health',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const speedMs = rng.pick([20, 25, 30]);
		const tSober = 0.7;
		const tDrunk = 1.8;
		const dSober = roundTo(speedMs * tSober, 1);
		const dDrunk = roundTo(speedMs * tDrunk, 1);

		const svgPlot = svgBioCurvePlot({
			title: 'تأثير تركيز الكحول في الدم على زمن الاستجابة',
			xMin: 0,
			xMax: 1.2,
			yMin: 0,
			yMax: 2.5,
			xStep: 0.2,
			yStep: 0.5,
			xLabel: 'الكحول (g/L)',
			yLabel: 'زمن الاستجابة (s)',
			shadedZones: [{ x1: 0.5, x2: 1.2, fill: '#fef2f2', label: 'منطقة خطر شديد', textColor: '#b91c1c' }],
			curves: [
				{
					fn: (x) => 0.7 + 1.15 * x * x + 0.45 * x,
					color: '#dc2626',
					label: 'زمن الاستجابة'
				}
			],
			points: [
				{ x: 0, y: 0.7, label: '0.7 s', color: '#15803d' },
				{ x: 0.8, y: 1.8, label: '1.8 s', color: '#dc2626' }
			]
		});
		const imageUrl = saveSciencesSvgAsset(`sci_4am_t2_alc_${difficulty}_s${seed}`, svgPlot);

		const mcq = buildUniqueMcqOptions(
			`يُطيل الكحول زمن الاستجابة إلى $1.8\\text{ s}$ بتعطيل النقل المشبكي فتقطع السيارة $${dDrunk}\\text{ m}$ قبل الكبح مقابل $${dSober}\\text{ m}$ فقط للسليم`,
			[
				{
					text: `يُقصّر الكحول زمن الاستجابة فتتوقف السيارة بعد $${dSober}\\text{ m}$ فقط`,
					diagnosticFeedback: 'تُظهر الوثيقة ارتفاع زمن الاستجابة من $0.7\\text{ s}$ إلى $1.8\\text{ s}$ مع الكحول!'
				},
				{
					text: 'يؤثر الكحول على الأمعاء فقط ولا يصل إلى الدماغ والمشابك',
					diagnosticFeedback: 'يمتص الكحول سريعاً نحو الدم ويصل إلى الدماغ ليُخلّ بـ**النقل المشبكي** ويُخرّب الخلايا العصبية.'
				},
				{
					text: 'تتجدد الخلايا العصبية المخربة بالمخدرات والكحول خلال أسبوعين',
					diagnosticFeedback: 'الخلايا العصبية (العصبونات) **لا تنقسم ولا تتجدد** بعد تلفها.'
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
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `تسير سيارة بسرعة $${speedMs}\\text{ m/s}$ فظهر عائق مفاجئ. بالاعتماد على المنحنى (سليم $0.7\\text{ s}$، وكحول $0.8\\text{ g/L}$ يعطي $1.8\\text{ s}$)، ما النتيجة والتفسير الصحيحان؟`,
				questionTextAr: `ما أثر الكحول ($0.8\\text{ g/L}$) على زمن الاستجابة والمسافة المقطوعة قبل الكبح ($v = ${speedMs}\\text{ m/s}$)?`,
				imageUrl,
				imageCaption: 'تأثير الكحول على زمن الاستجابة',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `المسافة قبل الكبح $d = v \\times t$: للسليم $${dSober}\\text{ m}$ وللمخمور $${dDrunk}\\text{ m}$ لأن الكحول يُبطئ **النقل المشبكي** ويُطيل زمن الاستجابة.`
			},
			sujetExercise: {
				points: 6,
				instruction: `يوضح المنحنى المقابل تغير *زمن الاستجابة* للضغط على مكابح سيارة بدلالة تركيز الكحول في دم السائق. نسير بسرعة $${speedMs} " m/s"$ في طريق مستقيم.`,
				content: [
					{
						type: 'columns',
						widths: ['1.25fr', '1.15fr'],
						children: [
							{
								type: 'text',
								content: `1) *حلّل* المنحنى البياني، ثم احسب المسافة المقطوعة خلال زمن الاستجابة ($d = v times t$) قبل الكبح لكل من: سائق سليم ($0 " g/L"$، $t = 0.7 " s"$) وسائق مخمور ($0.8 " g/L"$، $t = 1.8 " s"$).`,
								answer: `1) *التحليل*: كلما ارتفع تركيز الكحول في الدم ارتفع زمن الاستجابة بشدة (من $0.7 " s"$ عند $0 " g/L"$ إلى $1.8 " s"$ عند $0.8 " g/L"$).\n\n- مسافة السائق السليم: $d_1 = ${speedMs} times 0.7 = ${dSober} " m"$.\n- مسافة السائق المخمور: $d_2 = ${speedMs} times 1.8 = ${dDrunk} " m"$ (زيادة خطيرة قدرها $${roundTo(dDrunk - dSober, 1)} " m"$ قبل بدء الكبح!).`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: علاقة الكحول بزمن الاستجابة'
							}
						]
					},
					{
						type: 'text',
						content: `2) فسّر على المستوى المجهري للعصبونات كيف يؤدي الكحول والمخدرات إلى إطالة زمن الاستجابة واضطراب التنسيق الحركي.`,
						answer: `2) ينتقل الكحول والمخدرات عبر الدم إلى الدماغ، فتتداخل على مستوى *المشابك العصبية* وتعرقل عمل الوسائط الكيميائية مما *يُبطئ النقل المشبكي* ويُخل بمعالجة الرسائل الحسية والحركية، كما يسبب الإدمان *تخريباً دائماً للخلايا العصبية* (التي لا تتجدد).`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) قدّم *أربع قواعد صحية* للحفاظ على سلامة الجهاز العصبي والوقاية من حوادث المرور والآفات الاجتماعية.`,
						answer: `3) (1) الامتناع التام عن الكحول والمخدرات والتدخين، (2) النوم الكافي والمنتظم ($8$ ساعات) وتجنب السهر المفرط، (3) ممارسة الرياضة والتغذية المتوازنة، (4) تجنب المنبهات المفرطة والأدوية المهدئة دون وصفة طبية.`,
						mark: '2'
					}
				]
			},
			hints: [
				'استعمل $d = v \\times t$ لحساب المسافة المقطوعة قبل بدء الكبح في الحالتين.',
				'تؤثر الكحول والمخدرات على مستوى المشابك العصبية وتخرّب العصبونات التي لا تتجدد.',
				'اذكر 4 قواعد صحية دقيقة لحماية الجهاز العصبي.'
			],
			solutionStepsAr: [
				`تحليل المنحنى وحساب $d_1 = ${dSober}\\text{ m}$ و$d_2 = ${dDrunk}\\text{ m}$.`,
				'تفسير إطالة زمن الاستجابة باضطراب النقل المشبكي وتخريب العصبونات.',
				'ذكر 4 قواعد صحية لسلامة الجهاز العصبي.'
			],
			finalAnswer: `d1 = ${dSober} m مقابل d2 = ${dDrunk} m (اضطراب النقل المشبكي)`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Inflammation & Phagocytosis (Non-Specific Immunity) (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const inflammationPhagocytosisTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4am_t2_inflammation_phagocytosis',
	grade: '4am',
	trimesterId: 't2',
	domain: 'immunology',
	titleAr: 'الخطان الدفاعيان الأول والثاني: التفاعل الالتهابي ومراحل البلعمة (BEM)',
	curriculumLessonId: 'sci_lesson_4am_t2_nonspecific_immunity_phagocytosis',
	defaultPoints: 6,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const injury = rng.pick(['وخز شوكة ملوثة في إصبعه', 'جرح بمسمار ملوث أثناء اللعب', 'خدش بقطعة زجاج ملوثة']);
		const svg = svgImmunologyDiagram('phagocytosis');
		const imageUrl = saveSciencesSvgAsset(`sci_4am_t2_phago_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'(1) الانجذاب والالتصاق ← (2) الإحاطة والابتلاع ← (3) الهضم بالليزوزومات ← (4) طرح الفضلات، وهي استجابة لانوعية',
			[
				{
					text: '(1) الهضم ← (2) طرح الفضلات ← (3) الابتلاع ← (4) الالتصاق، وهي استجابة نوعية',
					diagnosticFeedback: 'لا يمكن هضم الميكروب قبل الالتصاق به وابتلاعه، كما أن البلعمة **لانوعية**.'
				},
				{
					text: 'تقوم بها الكريات الدموية الحمراء لإنتاج الأجسام المضادة',
					diagnosticFeedback: 'تقوم بالبلعمة **الكريات البيضاء البلعمية** دون إنتاج أجسام مضادة.'
				},
				{
					text: 'البلعمة تنتمي إلى الخط الدفاعي الأول مثل الجلد والدموع',
					diagnosticFeedback: 'الجلد والدموع خط دفاعي أول، أما التفاعل الالتهابي والبلعمة فهما **الخط الدفاعي الثاني**.'
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
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: `بعد ${injury} ظهرت أعراض التفاعل الالتهابي وتدخلت الخلايا البلعمية كما في الوثيقة. ما الترتيب الصحيح لمراحل البلعمة وطبيعتها؟`,
				questionTextAr: 'رتّب المراحل الأربع للبلعمة وحدّد نوع هذه الاستجابة المناعية:',
				imageUrl,
				imageCaption: 'مراحل البلعمة (الخط الدفاعي الثاني)',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'تتم البلعمة في 4 مراحل: الانجذاب والالتصاق ← الإحاطة والابتلاع ← الهضم ← طرح الفضلات، وهي استجابة مناعية **لانوعية**.'
			},
			sujetExercise: {
				points: 6,
				instruction: `تعرض طفل لـ${injury} دون تطهير الجرح؛ وبعد بضع ساعات ظهرت في مكان الإصابة أعراض *التفاعل الالتهابي* (احمرار، حرارة موضعية، انتفاخ، ألم، ثم قيح). وتمثل الوثيقة المقابلة الظاهرة الدفاعية التي حدثت في موضع الإصابة.`,
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) حدّد *الخط الدفاعي الأول* الذي تم اختراقه، وصنّف الحواجز التالية إلى ميكانيكية وكيميائية: *الجلد، الدموع، الأهداب التنفسية، العصارة المعدية*.`,
								answer: `1) تم اختراق *الجلد* (الخط الدفاعي الأول).\n- *حواجز ميكانيكية*: الجلد، الأهداب التنفسية.\n- *حواجز كيميائية*: الدموع، العصارة المعدية الحامضية.`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: مراحل البلعمة الخلوية'
							}
						]
					},
					{
						type: 'text',
						content: `2) فسّر مجهرياً سبب ظهور كل عرض من أعراض التفاعل الالتهابي التالية: *الاحمرار والحرارة*، *الانتفاخ*، و*الألم*.`,
						answer: `2) - *الاحمرار والحرارة*: تمدد الشعيرات الدموية وتدفق أكبر للدم وتباطؤ جريانه في موضع الجرح.\n- *الانتفاخ*: خروج البلازما وانسلال الكريات البيضاء (*البلعميات*) نحو مكان البكتيريا.\n- *الألم*: تنبيه وضغط السوائل والسموم على النهايات العصبية الحرة في الجلد.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) سمِّ الظاهرة الممثلة في الوثيقة ومراحلها الأربع (1، 2، 3، 4)، وعلّل تصنيفها ضمن *الاستجابة المناعية اللانوعية*.`,
						answer: `3) الظاهرة: *البلعمة* (الخط الدفاعي الثاني).\nالمراحل: (1) الانجذاب والالتصاق، (2) الإحاطة والابتلاع (أرجل كاذبة وفجوة بالعة)، (3) الهضم (بإنزيمات الليزوزومات)، (4) طرح الفضلات.\n\n*التعليل*: هي استجابة *لانوعية* لأنها فطرية وفورية وموجهة ضد *جميع أنواع الميكروبات* بنفس الطريقة دون تمييز.`,
						mark: '2.5'
					}
				]
			},
			hints: [
				'الجلد والأهداب حواجز ميكانيكية، والدموع والعصارة المعدية حواجز كيميائية.',
				'اربط الاحمرار بتمدد الأوعية، والانتفاخ بانسلال البلعميات والبلازما، والألم بتبيه النهايات العصبية.',
				'مراحل البلعمة: انجذاب والتصاق ← إحاطة وابتلاع ← هضم ← طرح فضلات.'
			],
			solutionStepsAr: [
				'تحديد الجلد وتصنيف الحواجز الميكانيكية والكيميائية.',
				'التفسير المجهري للاحمرار والحرارة والانتفاخ والألم.',
				'تسمية البلعمة ومراحلها الأربع وتعليل كونها لانوعية.'
			],
			finalAnswer: 'التفاعل الالتهابي والبلعمة (استجابة مناعية لانوعية)'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Specific Immunity (Primary/Secondary Antibody Curve + Vaccine vs Serum) (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const specificImmunityTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4am_t2_specific_immunity_vaccine_serum',
	grade: '4am',
	trimesterId: 't2',
	domain: 'immunology',
	titleAr: 'الاستجابة المناعية النوعية الخلطية والذاكرة المناعية (اللقاح والمصل — BEM)',
	curriculumLessonId: 'sci_lesson_4am_t2_specific_immunity_self_allergy',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const disease = rng.pick([
			{ name: 'الكزاز (التيتانوس)', anatoxin: 'الأناتوكسين الكزازي' },
			{ name: 'الدفتيريا (الخناق)', anatoxin: 'الأناتوكسين الدفتيري' }
		]);
		const svgPlot = svgBioCurvePlot({
			title: `تطور تركيز الأجسام المضادة بعد التماس الأول والثاني مع ${disease.anatoxin}`,
			xMin: 0,
			xMax: 50,
			yMin: 0,
			yMax: 100,
			xStep: 10,
			yStep: 20,
			xLabel: 'الزمن (أيام)',
			yLabel: 'الأجسام المضادة (و.إ)',
			eventArrows: [
				{ x: 5, label: 'حقن 1 (تماس 1)', color: '#1d4ed8' },
				{ x: 28, label: 'حقن 2 (تذكير)', color: '#dc2626' }
			],
			curves: [
				{
					fn: (x) => {
						const p1 = x > 10 ? 22 * Math.exp(-Math.pow((x - 17) / 4.5, 2)) : 0;
						const p2 = x > 29 ? 90 * Math.exp(-Math.pow((x - 36) / 7.5, 2)) : 0;
						return Math.min(100, p1 + p2);
					},
					color: '#1d4ed8',
					label: 'أجسام مضادة نوعية'
				}
			]
		});
		const imageUrl = saveSciencesSvgAsset(`sci_4am_t2_ab_curve_${difficulty}_s${seed}`, svgPlot);

		const mcq = buildUniqueMcqOptions(
			'استجابة مناعية نوعية خلطية (LB + أجسام مضادة)، وتكون الاستجابة الثانوية أسرع وأقوى وأطول مدة بفضل الذاكرة المناعية (LBm)',
			[
				{
					text: 'استجابة مناعية لانوعية بالبلعمة وتكون الاستجابة الثانوية أضعف من الأولية',
					diagnosticFeedback: 'إنتاج الأجسام المضادة يميز **الاستجابة النوعية الخلطية**، والثانوية أقوى وأسرع بكثير.'
				},
				{
					text: 'المصل يمنح مناعة دائمة ويشكل ذاكرة مناعية مثل اللقاح تماماً',
					diagnosticFeedback: 'المصل علاجي فوري و**مؤقت** ولا يُشكل ذاكرة مناعية؛ أما **اللقاح** فوقائي ودائم ويشكل ذاكرة.'
				},
				{
					text: 'تحمي الأجسام المضادة ضد الكزاز من مرض الدفتيريا أيضاً',
					diagnosticFeedback: 'الأجسام المضادة **نوعية**؛ فمضادات الكزاز تبطل سم الكزاز فقط ولا تحمي من الدفتيريا.'
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
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `يمثل المنحنى تغير كمية الأجسام المضادة بعد حقنتين من ${disease.anatoxin}. ما نوع الاستجابة المناعية وما سبب اختلاف الاستجابتين؟`,
				questionTextAr: 'حلل وفسّر الفرق بين الاستجابة الأولية والثانوية في المنحنى:',
				imageUrl,
				imageCaption: 'الاستجابة الأولية والثانوية للأجسام المضادة',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'إنها **استجابة نوعية خلطية** (اللمفاويات B والأجسام المضادة)، والسرعة والقوة في الاستجابة الثانوية تعودان إلى **الذاكرة المناعية ($\\text{LB}_m$)**.'
			},
			sujetExercise: {
				points: 6,
				instruction: `لحماية الأطفال من مرض ${disease.name} القاتل، يُحقن الجسم بـ*${disease.anatoxin}* (توكسين فاقد للسمية ومحتفظ بقدرته على تنبيه المناعة) على جرعتين. يُظهر المنحنى المقابل تطور كمية الأجسام المضادة في دم شخص بعد الحقنة الأولى والحقنة التذكيرية.`,
				content: [
					{
						type: 'columns',
						widths: ['1.25fr', '1.15fr'],
						children: [
							{
								type: 'text',
								content: `1) حدّد *نوع الاستجابة المناعية* المبرزة في الوثيقة والخلايا اللمفاوية المسؤولة عن إنتاج الأجسام المضادة، واشرح كيف تُبطل هذه الأجسام المضادة مفعول السم.`,
								answer: `1) *استجابة مناعية نوعية ذات وساطة خلطية*؛ تتدخل فيها *اللمفاويات B ($upright("LB")$)* التي تنتج أجساماً مضادة نوعية ترتبط بسم ${disease.name} لتشكيل *معقد مناعي (جسم مضاد – مولد ضد)* يبطل مفعوله وتسهل بلعمته.`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: تطور الأجسام المضادة بعد الحقن 1 و 2'
							}
						]
					},
					{
						type: 'text',
						content: `2) قارن من المنحنى بين الاستجابة بعد *الحقن الأول* والاستجابة بعد *الحقن الثاني (التذكيري)*، وفسّر هذا الفرق العلمي مع بيان أهمية *الجرعات التذكيرية* في روزنامة التلقيح.`,
						answer: `2) - *الاستجابة الأولية*: بطيئة (تأخر عدة أيام)، ضعيفة الكمية ($approx 22$ و.إ)، وقصيرة المدة.\n- *الاستجابة الثانوية*: سريعة جداً (فورية تقريباً)، قوية جداً ($approx 90$ و.إ)، وأطول مدة.\n\n*التفسير*: يعود ذلك لتشكل *الذاكرة المناعية* (*لمفاويات B ذات ذاكرة $upright("LB")_m$*) خلال التماس الأول؛ وتعمل *الجرعات التذكيرية* على تنشيط الذاكرة وإبقاء الحماية مرتفعة ومستمرة.`,
						mark: '2'
					},
					{
						type: 'table',
						headers: ['وجه المقارنة', 'اللقاح (التلقيح)', 'المصل (الاستمصال)'],
						cells: [],
						rows: [
							['الهدف (وقائي أم علاجي)', { content: '............', answer: 'وقائي', mark: '0.5' }, { content: '............', answer: 'علاجي مستعجل', mark: '0.5' }],
							['نوع المناعة وسرعتها ومدتها', { content: '................', answer: 'نشطة، بطيئة، دائمة (ذاكرة)', mark: '0.5' }, { content: '................', answer: 'منقولة جاهزة، فورية، مؤقتة', mark: '0.5' }]
						],
						headerBackground: true,
						borders: 'grid',
						width: 'full'
					}
				]
			},
			hints: [
				'وجود الأجسام المضادة يدل على استجابة نوعية خلطية باللمفاويات B وتشكيل معقد مناعي.',
				'الاستجابة الثانوية أسرع وأقوى وأطول مدة بفضل الخلايا اللمفاوية ذات الذاكرة LBm.',
				'قارن في الجدول بين اللقاح (وقائي نشط دائم) والمصل (علاجي فوري مؤقت).'
			],
			solutionStepsAr: [
				'تحديد الاستجابة النوعية الخلطية (LB) وتشكيل المعقد المناعي.',
				'مقارنة الاستجابة الأولية والثانوية وتفسيرها بالذاكرة المناعية وأهمية التذكير.',
				'إكمال جدول المقارنة بين اللقاح والمصل.'
			],
			finalAnswer: 'استجابة نوعية خلطية + ذاكرة مناعية LBm + مقارنة اللقاح والمصل'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. BEM Integration Situation 1 (8 pts): Traffic Accident — Alcohol, Paralysis & ABO/Rh
// ═══════════════════════════════════════════════════════════════════════════════
const integrationTrafficNeuroAboTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4am_t2_integration_traffic_accident_neuro_abo_bem',
	grade: '4am',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'وضعية إدماجية (نمط BEM): حادث مرور (الكحول، الشلل الحركي، وتحديد الزمرة لنقل الدم)',
	curriculumLessonId: 'sci_lesson_4am_t2_specific_immunity_self_allergy',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const profiles = [
			{ driver: 'فريد', aggA: true, aggB: false, aggD: false, group: 'A⁻', goodDonor: 'المتبرع 2 (O⁻)', bad1: 'المتبرع 1 (A⁺)', bad2: 'المتبرع 3 (B⁻)', alc: 0.9 },
			{ driver: 'عمر', aggA: false, aggB: true, aggD: false, group: 'B⁻', goodDonor: 'المتبرع 2 (O⁻)', bad1: 'المتبرع 1 (B⁺)', bad2: 'المتبرع 3 (A⁻)', alc: 1.1 }
		];
		const p = rng.pick(profiles);
		const svgAbo = svgAboAgglutinationSlide({
			patientName: p.driver,
			aggA: p.aggA,
			aggB: p.aggB,
			aggD: p.aggD
		});
		const imgAbo = saveSciencesSvgAsset(`sci_4am_t2_int1_abo_${difficulty}_s${seed}`, svgAbo);

		const mcq = buildUniqueMcqOptions(
			`زمرة ${p.driver} هي ${p.group}، والمتبرع الآمن الوحيد هو ${p.goodDonor} لتفادي ارتصاص ABO وعامل الريزوس`,
			[
				{
					text: `زمرة ${p.driver} هي ${p.group.replace('⁻', '⁺')}، ويمكنه استقبال الدم من ${p.bad1}`,
					diagnosticFeedback: 'عدم حدوث ارتصاص مع Anti-D يثبت أن الريزوس **سالب (−)** فلا يجوز أبداً نقل دم **موجب (+)** إليه!'
				},
				{
					text: `يمكن لـ${p.driver} استقبال الدم من ${p.bad2} لأن كليهما سالب الريزوس`,
					diagnosticFeedback: `رغم توافق الريزوس السالب، تختلف الزمرة في نظام ABO فتحدث عملية **ارتصاص مميتة** مع الأجسام المضادة في بلازما ${p.driver}!`
				},
				{
					text: 'لا علاقة لنسبة الكحول في الدم بوقوع حادث المرور',
					diagnosticFeedback: `نسبة الكحول المرتفعة ($${p.alc}\\text{ g/L}$) تُبطئ النقل المشبكي وتطيل زمن الاستجابة مما تسبب مباشرة في الحادث.`
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
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: `تعرّض السائق ${p.driver} (كحول الدم $${p.alc}\\text{ g/L}$) لحادث مرور أدى لنزيف حاد وشلل في طرفيه السفليين. من اختبار الارتصاص في الوثيقة (1)، ما زمرته الدموية وما المتبرع الآمن؟`,
				questionTextAr: `حدّد زمرة دم ${p.driver} والمتبرع المناسب من الوثيقة (1):`,
				imageUrl: imgAbo,
				imageCaption: `الوثيقة 1: اختبار الارتصاص لدم ${p.driver}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `زمرة ${p.driver} هي **${p.group}**، لذا فالمتبرع الآمن الوحيد من القائمة هو **${p.goodDonor}** (معطي عام مطلق دون مولدات ضد A أو B أو D).`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `*السياق*: تسبّب السائق ${p.driver} في حادث مرور خطير بعد فشله في الضغط على المكابح في الوقت المناسب عند منعرج، فنُقل على جناح السرعة إلى المستشفى وهو يعاني من *نزيف دموي حاد* وعجز تام عن تحريك *طرفيه السفليين إرادياً* رغم سلامة الدماغ وعضلات الساقين. أُجريت له تحاليل طبية وفحوصات مصورة لخّصت في الوثيقتين الآتيتين:`,
				content: [
					{
						type: 'columns',
						widths: ['1.15fr', '1.1fr'],
						children: [
							{
								type: 'table',
								headers: ['الفحص الطبي (الوثيقة 2)', `النتيجة عند ${p.driver}`],
								cells: [],
								rows: [
									['نسبة الكحول في الدم', `${p.alc} g/L (الحد الأقصى 0.2 g/L)`],
									['تصوير العمود الفقري', 'قطع في النخاع الشوكي بالمنطقة الظهرية'],
									['المتبرعون المتوفرون', `${p.bad1} ، ${p.goodDonor} ، ${p.bad2}`]
								],
								headerBackground: true,
								borders: 'grid',
								width: 'full'
							},
							{
								type: 'image',
								src: imgAbo,
								caption: `الوثيقة 1: اختبار الارتصاص لدم ${p.driver}`
							}
						]
					},
					{
						type: 'text',
						content: `*التعليمات*: بالاعتماد على السياق والوثيقتين (1 و 2) ومكتسباتك القبلية:\n\n1) فسّر علمياً: (أ) سبب وقوع حادث المرور رغم سلامة عيني ${p.driver}، (ب) سبب *شلل طرفيه السفليين إرادياً* رغم سلامة دماغه وعضلات ساقيه.`,
						answer: `1) *بالاعتماد على الوثيقة (2) ومكتسباتي*:\n- (أ) *سبب الحادث*: ارتفاع تركيز الكحول في دم ${p.driver} ($${p.alc} " g/L"$)، مما أدى إلى *اضطراب وتباطؤ النقل المشبكي* في الدماغ و*إطالة زمن الاستجابة* وضعف التنسيق الحركي، فتأخر ضغطه على المكابح.\n- (ب) *سبب شلل الطرفين السفليين*: أدى القطع في *النخاع الشوكي* بالمنطقة الظهرية (الوثيقة 2) إلى انقطاع مرور الرسالة العصبية الحركية الإرادية الناشئة في الساحة الحركية بالقشرة المخية نحو عضلات الساقين (لأن النخاع الشوكي يعمل *كناقل/ممر* في الحركة الإرادية).`,
						mark: '3'
					},
					{
						type: 'text',
						content: `2) بالاعتماد على الوثيقة (1)، حدّد *الزمرة الدموية* لـ${p.driver} مع التعليل، ثم اختر *المتبرع المناسب* من الوثيقة (2) لإنقاذ حياته وعلّل رفض المتبرعين الآخرين.`,
						answer: `2) *بالاعتماد على الوثيقتين (1 و 2)*:\n- زمرة ${p.driver} هي *${p.group}* لأن دمه أحدث ارتصاصاً مع ${p.aggA ? 'Anti-A' : 'Anti-B'} فقط (وجود مولد الضد ${p.aggA ? 'A' : 'B'}) ولم يرتص مع ${p.aggA ? 'Anti-B' : 'Anti-A'} ولا مع Anti-D (ريزوس سالب).\n- *المتبرع المناسب هو ${p.goodDonor}* لأن كرياته الحمراء خالية من مولدات الضد $A$ و$B$ و$D$ فلا يحدث أي ارتصاص مع أجسام مضادة في بلازما ${p.driver}.\n- *رفض ${p.bad1}*: يحمل عامل الريزوس الموجب ($D$) المحظور نقله لشخص سالب الريزوس.\n- *رفض ${p.bad2}*: يحمل مولد ضد مخالف يرتص مع الأجسام المضادة الموجودة في بلازما ${p.driver} مما يسبب انسداد الأوعية والموت.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `3) قدّم *نصيحتين وقائيتين* مبرّرتين لتفادي مثل هذه الحوادث والمساهمة في إنقاذ أرواح المصابين.`,
						answer: `3) - *الامتناع التام عن الكحول والمخدرات* خاصة أثناء السياقة للحفاظ على سرعة الاستجابة العصبية وسلامة الأرواح.\n- *نشر ثقافة التبرع بالدم* (خصوصاً الزمر النادرة كـ $O^-$) واحترام التحاليل الدقيقة لنظامي $upright("ABO")$ و$upright("Rh")$ قبل كل عملية نقل دم.`,
						mark: '2'
					}
				]
			},
			hints: [
				'اربط الوثيقة (2) بالكحول (إطالة زمن الاستجابة) وبقطع النخاع الشوكي (انقطاع نقل الرسالة الحركية الإرادية).',
				'استخرج الزمرة من الارتصاص في الوثيقة (1) وتذكّر أن Rh⁻ لا يأخذ أبداً من Rh⁺!',
				'اختم بنصيحتين مرتبطتين مباشرة بالوقاية من الكحول وثقافة التبرع بالدم الآمن.'
			],
			solutionStepsAr: [
				`تفسير الحادث بالكحول (${p.alc} g/L) والشلل بقطع النخاع الشوكي (الوثيقة 2).`,
				`تحديد زمرة ${p.driver} (${p.group}) واختيار ${p.goodDonor} مع تعليل رفض الآخرين.`,
				'تقديم نصيحتين وقائيتين حول تجنب الكحول والتبرع الآمن بالدم.'
			],
			finalAnswer: `زمرة ${p.group} + المتبرع ${p.goodDonor} + شلل بسبب قطع النخاع الشوكي`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. BEM Integration Situation 2 (8 pts): Tetanus Emergency (Serotherapy + Vaccine)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationTetanusSeroVaccBemTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4am_t2_integration_tetanus_allergy_bem',
	grade: '4am',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'وضعية إدماجية (نمط BEM): جرح ملوث وخطر الكزاز (التدخل المزدوج بالمصل واللقاح)',
	curriculumLessonId: 'sci_lesson_4am_t2_specific_immunity_self_allergy',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const worker = rng.pick(['العم صالح (فلاح)', 'العامل مراد (بنّاء)']);
		const svgPlot = svgBioCurvePlot({
			title: 'الوثيقة 1: تطور مضادات التوكسين الكزازي بعد المصل ثم اللقاح',
			xMin: 0,
			xMax: 35,
			yMin: 0,
			yMax: 100,
			xStep: 5,
			yStep: 20,
			xLabel: 'الزمن (أيام)',
			yLabel: 'مضادات الكزاز (و.إ)',
			dashedGuides: [
				{ x1: 0, y1: 20, x2: 35, y2: 20, color: '#15803d', label: 'عتبة الحماية', labelPos: 'top' }
			],
			curves: [
				{
					fn: (x) => 82 * Math.exp(-0.11 * x),
					color: '#dc2626',
					label: 'أجسام المصل (فورية ومؤقتة)'
				},
				{
					fn: (x) => (x < 7 ? 0 : Math.min(86, 86 * (1 - Math.exp(-0.15 * (x - 7))))),
					color: '#1d4ed8',
					label: 'أجسام اللقاح (بطيئة ودائمة)',
					dashed: true
				}
			]
		});
		const imgPlot = saveSciencesSvgAsset(`sci_4am_t2_int2_tet_${difficulty}_s${seed}`, svgPlot);

		const mcq = buildUniqueMcqOptions(
			'يُحقن المصل لتوفير حماية علاجية فورية ومؤقتة بأجسام مضادة جاهزة، واللقاح لتكوين مناعة نشطة دائمة وذاكرة مناعية بعد زوال المصل',
			[
				{
					text: 'يُحقن اللقاح وحده لأنه يوفر أجساماً مضادة فورية خلال ساعة واحدة',
					diagnosticFeedback: 'الوثيقة (1) تُظهر أن أجسام اللقاح تحتاج أكثر من 7–10 أيام للوصول إلى عتبة الحماية!'
				},
				{
					text: 'يُحقن المصل وحده لأنه يكسب المصاب مناعة مدى الحياة وذاكرة مناعية',
					diagnosticFeedback: 'الوثيقة (1) تُبيّن تناقص أجسام المصل سريعاً وهبوطها دون عتبة الحماية بعد نحو أسبوعين.'
				},
				{
					text: 'عصيات الكزاز تقضي عليها الحمية الخالية من الغلوتين',
					diagnosticFeedback: 'الكزاز مرض بكتيري خطير يُعالج بالمصل ويُوقى منه باللقاح وتطهير الجروح.'
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
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: `أُصيب ${worker} بجرح عميق بمسمار صدئ ملوث بالتراب، وتبيّن من دفتره الصحي أنه لم يجدد لقاح الكزاز منذ 15 سنة، فحقنه الطبيب بـ**المصل واللقاح معاً**. ما التفسير العلمي من الوثيقة (1)؟`,
				questionTextAr: 'لماذا جمع الطبيب بين المصل واللقاح في آن واحد لإنقاذ المصاب؟',
				imageUrl: imgPlot,
				imageCaption: 'الوثيقة 1: مقارنة فعالية المصل واللقاح بمرور الزمن',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'المصل يحمي **فوراً وبشكل مؤقت** (قبل أن يفتك السم بالجسم)، واللقاح يضمن **حماية نشطة ودائمة** تتجاوز عتبة الحماية عندما تتناقص أجسام المصل.'
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `*السياق*: أثناء عمله، جُرحت يد ${worker} بآلة حديدية صدئة ملوثة بالتراب؛ وبعد فحص دفتره الصحي تبيّن أنه *لم يتلقَّ التذكير بلقاح الكزاز منذ أكثر من 15 سنة*، وظهرت في الجرح علامات التهاب وتكاثر لعصيات الكزاز المنتجة لسم خطير. فبادر الطبيب بتطهير الجرح وحقنه فوراً بـ*مصل مضاد للكزاز* في ذراع وبـ*لقاح مضاد للكزاز (الأناتوكسين)* في الذراع الأخرى. إليك الوثيقتين الآتيتين:`,
				content: [
					{
						type: 'columns',
						widths: ['1.1fr', '1.15fr'],
						children: [
							{
								type: 'table',
								headers: ['المعلومة (الوثيقة 2)', 'التفصيل الطبي'],
								cells: [],
								rows: [
									['الميكروب المسبب', 'عصيات الكزاز (تفرز توكسيناً في الدم)'],
									['محتوى المصل المحقون', 'أجسام مضادة جاهزة ضد توكسين الكزاز'],
									['محتوى اللقاح المحقون', 'أناتوكسين كزازي (سم مضعّف غير ضار)']
								],
								headerBackground: true,
								borders: 'grid',
								width: 'full'
							},
							{
								type: 'image',
								src: imgPlot,
								caption: 'الوثيقة 1: تطور مضادات الكزاز بعد الحقنين'
							}
						]
					},
					{
						type: 'text',
						content: `*التعليمات*: بالاعتماد على السياق والوثيقتين (1 و 2) ومكتسباتك القبلية:\n\n1) حدّد نوع الاستجابة المناعية النوعية اللازمة لإبطال سم الكزاز (التوكسين)، واشرح آلية عمل الأجسام المضادة ضد هذا السم.`,
						answer: `1) *بالاعتماد على الوثيقة (2) ومكتسباتي*: إنها *استجابة مناعية نوعية ذات وساطة خلطية* (بتخل اللمفاويات $upright("B")$ وإفراز أجسام مضادة نوعية).\n\n*الآلية*: ترتبط الأجسام المضادة نوعياً بتوكسين الكزاز لتشكّل *معقداً مناعياً (جسم مضاد – توكسين)* يُبطل مفعوله السام ويمنعه من إصابة الجهاز العصبي، ثم تبتلعه البالعات.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `2) بالاعتماد على منحنى الوثيقة (1)، فسّر لماذا اضطر الطبيب إلى حقن *المصل* و*اللقاح* معاً لـ${worker} ولم يكتفِ بأحدهما فقط.`,
						answer: `2) *بالاعتماد على الوثيقتين (1 و 2)*:\n- *دور المصل*: يوفر *أجساماً مضادة جاهزة فوراً* تتجاوز عتبة الحماية منذ اليوم الأول لتعطيل السم ومنع وفاة المصاب، لكن مفعوله *مؤقت* يتناقص ويهبط تحت عتبة الحماية بعد نحو أسبوعين (لا يكوّن ذاكرة مناعية).\n- *دور اللقاح*: يُحفّز اللمفاويات $upright("B")$ لدى المصاب لإنتاج أجسامه المضادة الخاصة و*ذاكرة مناعية دائمة*، لكنه *بطيء* (لا يبلغ عتبة الحماية إلا بعد اليوم العاشر). لذلك فإن الجمع بينهما يضمن *حماية متواصلة دون انقطاع*: فورية بالمصل ثم دائمة باللقاح.`,
						mark: '3.5'
					},
					{
						type: 'text',
						content: `3) قدّم *نصيحتين وقائيتين* للعمال والمواطنين لتفادي خطر الإصابة بالكزاز والأمراض الميكروبية الخطيرة.`,
						answer: `3) - *احترام روزنامة التلقيح والجرعات التذكيرية* الدورية (كل 10 سنوات للكزاز) لإبقاء الذاكرة المناعية نشطة وتفادي اللجوء للمصل الاستعجالي.\n- *تطهير الجروح فوراً* بالمطهرات الطبية وارتداء القفازات والأحذية الواقية أثناء العمل في الحقول وورشات البناء.`,
						mark: '2'
					}
				]
			},
			hints: [
				'التوكسين (السم) المذاب في الدم يُبطل باستجابة نوعية خلطية عبر المعقد المناعي.',
				'استغل خط "عتبة الحماية" في الوثيقة (1) لتوضيح تكامل المصل (فوري مؤقت) مع اللقاح (بطيء دائم).',
				'قدّم نصيحتين مرتبطتين مباشرة بروزنامة التلقيح وتطهير الجروح والوقاية في العمل.'
			],
			solutionStepsAr: [
				'تحديد الاستجابة النوعية الخلطية وآلية تشكيل المعقد المناعي ضد التوكسين.',
				'تفسير الجمع بين المصل (فوري ومؤقت) واللقاح (بطيء ودائم بذاكرة) من الوثيقة (1).',
				'تقديم نصيحتين وقائيتين (التذكير باللقاح وتطهير الجروح).'
			],
			finalAnswer: 'المصل للحماية الفورية المؤقتة واللقاح للحماية الدائمة (استجابة نوعية خلطية)'
		};
	}
};

export const SCIENCES_TEMPLATES_4AM_T2: SciencesParameterizedTemplate[] = [
	nervousPathwaysTemplate,
	alcoholSynapseTemplate,
	inflammationPhagocytosisTemplate,
	specificImmunityTemplate,
	integrationTrafficNeuroAboTemplate,
	integrationTetanusSeroVaccBemTemplate
];
