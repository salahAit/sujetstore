import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	esc,
	haloText,
	saveSciencesSvgAsset,
	svgBioCurvePlot,
	svgGeologyDiagram,
	wrapSciencesSvg
} from '../../svg-sciences';

function svgOilTrapLabeled(numbered = false): string {
	let body = `<rect x="6" y="6" width="448" height="236" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">الوثيقة: مقطع تخطيطي لمكمن بترولي في الصحراء الجزائرية</text>`;

	body += `<path d="M 38 144 Q 230 56 422 144 L 422 170 Q 230 82 38 170 Z" fill="#94a3b8" stroke="#334155" stroke-width="1.6"/>`;
	body += `<path d="M 38 170 Q 230 82 422 170 L 422 220 L 38 220 Z" fill="#fde68a" stroke="#92400e" stroke-width="1.5"/>`;
	body += `<path d="M 164 128 Q 230 98 296 128 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="1.2"/>`;
	body += `<path d="M 118 152 L 164 128 L 296 128 L 342 152 Z" fill="#1e293b"/>`;
	body += `<path d="M 80 178 L 380 178 L 422 220 L 38 220 Z" fill="#38bdf8" opacity="0.58"/>`;
	body += `<line x1="230" y1="42" x2="230" y2="144" stroke="#dc2626" stroke-width="2.6"/>`;

	body += haloText(`x="230" y="122" text-anchor="middle" font-size="10.5" font-weight="bold"`, '#854d0e', numbered ? '1' : 'غاز طبيعي');
	body += haloText(`x="230" y="145" text-anchor="middle" font-size="10.5" font-weight="bold"`, '#0f172a', numbered ? '2' : 'بترول خام');
	body += haloText(`x="230" y="202" text-anchor="middle" font-size="10.5" font-weight="bold"`, '#0c4a6e', numbered ? '3' : 'ماء مالح');
	body += haloText(`x="362" y="92" text-anchor="middle" font-size="10.2" font-weight="bold"`, '#334155', numbered ? '4' : 'صخرة غطاء كتيمة');
	body += haloText(`x="88" y="164" text-anchor="middle" font-size="10" font-weight="bold"`, '#92400e', 'صخرة خازنة مسامية');

	return wrapSciencesSvg(460, 248, body);
}

function svgSoilFiltrationLab(opts: { vA: number; vB: number; vC: number }): string {
	let body = `<rect x="6" y="6" width="448" height="232" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">الوثيقة: تجربة مقارنة النفاذية والاحتفاظ بالماء لثلاث عينات تربة</text>`;

	const cols = [
		{ x: 356, name: 'التربة (أ)', vOut: opts.vA, fill: '#fde047', col: '#a16207' },
		{ x: 230, name: 'التربة (ب)', vOut: opts.vB, fill: '#92400e', col: '#78350f' },
		{ x: 104, name: 'التربة (ج)', vOut: opts.vC, fill: '#94a3b8', col: '#475569' }
	];
	for (const c of cols) {
		body += `<text x="${c.x}" y="52" text-anchor="middle" font-size="11.2" font-weight="bold" fill="${c.col}">${esc(c.name)}</text>`;
		// Funnel with soil
		body += `<polygon points="${c.x - 32},62 ${c.x + 32},62 ${c.x + 8},106 ${c.x - 8},106" fill="${c.fill}" opacity="0.65" stroke="#334155" stroke-width="1.6"/>`;
		body += `<line x1="${c.x}" y1="106" x2="${c.x}" y2="128" stroke="#334155" stroke-width="2"/>`;
		// Beaker below with water level proportional to vOut
		body += `<rect x="${c.x - 24}" y="130" width="48" height="62" rx="4" fill="#ffffff" stroke="#334155" stroke-width="1.6"/>`;
		const wh = Math.max(6, Math.round((c.vOut / 100) * 54));
		body += `<rect x="${c.x - 22}" y="${190 - wh}" width="44" height="${wh}" fill="#38bdf8" opacity="0.72"/>`;
		body += `<text x="${c.x}" y="212" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#0369a1">${c.vOut} mL</text>`;
	}
	body += `<text x="230" y="230" text-anchor="middle" font-size="9.8" font-weight="bold" fill="#334155">حجم الماء المسكوب في كل قمع: 100 مل (القراءة أسفل كل قمع تمثل الماء النافذ)</text>`;
	return wrapSciencesSvg(460, 242, body);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Petroleum Properties, Formation & Trap (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const petroleumTrapTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3am_t3_petroleum_formation_trap',
	grade: '3am',
	trimesterId: 't3',
	domain: 'geology_earth',
	titleAr: 'البترول الخام: خصائصه، مراحل تشكله، وبنية المكمن البترولي',
	curriculumLessonId: 'sci_lesson_3am_t3_underground_resources_petroleum',
	defaultPoints: 6,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const field = rng.pick(['حاسي مسعود', 'عين أميناس', 'بركاوي (ورقلة)']);
		const svg = svgOilTrapLabeled(true);
		const imageUrl = saveSciencesSvgAsset(`sci_3am_t3_oil_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'(1) غاز طبيعي، (2) بترول خام، (3) ماء مالح، (4) صخرة غطاء كتيمة',
			[
				{
					text: '(1) ماء مالح، (2) بترول خام، (3) غاز طبيعي، (4) صخرة نفاذة',
					diagnosticFeedback: 'الماء المالح هو الأثقل فيستقر في الأسفل (3)، والغاز هو الأخف في الأعلى (1).'
				},
				{
					text: '(1) بترول خام، (2) غاز طبيعي، (3) غضار، (4) رمل',
					diagnosticFeedback: 'الغاز الطبيعي أخف من البترول فيحتل قمة المكمن (1) فوق البترول (2).'
				},
				{
					text: '(1) غاز طبيعي، (2) ماء عذب، (3) بترول، (4) كلس نفاذ',
					diagnosticFeedback: 'البترول أقل كثافة من الماء فيطفو فوقه، كما يجب أن تكون الطبقة العلوية (4) كتيمة.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: `يمثل الرسم التخطيطي المقابل مكمناً بترولياً في حقل ${field}. ما الترتيب الصحيح للبيانات (1، 2، 3، 4)؟`,
				questionTextAr: 'تعرّف على البيانات المرقمة (1، 2، 3، 4) في المكمن البترولي:',
				imageUrl,
				imageCaption: 'مقطع في مكمن بترولي',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'تترتب الموائع حسب الكثافة من الأعلى للأسفل: (1) غاز طبيعي، (2) بترول خام، (3) ماء مالح، وتعلوها (4) صخرة غطاء كتيمة.'
			},
			sujetExercise: {
				points: 6,
				instruction: `تزخر الصحراء الجزائرية بثروة هامة من المحروقات كما في حقل ${field}. يمثل المقطع المقابل بنية مكمن بترولي في طية محدبة.`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) سمِّ البيانات المرقمة (1)، (2)، (3)، و(4) في الوثيقة المقابلة، وفسّر ترتيب الطبقات (1، 2، 3) من الأعلى إلى الأسفل.`,
								answer: `1) (1) غاز طبيعي، (2) بترول خام، (3) ماء مالح، (4) صخرة غطاء كتيمة (مثل الغضار).\n\n*التفسير*: يترتب الغاز ثم البترول ثم الماء المالح بسبب *اختلاف الكثافة* (الغاز أخف من البترول، والبترول أخف من الماء المالح فيطفو فوقه).`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: مقطع تخطيطي لمكمن بترولي'
							}
						]
					},
					{
						type: 'text',
						content: `2) اذكر خاصيتين فيزيوكيميائيتين للبترول الخام، وبيّن الدليل التجريبي الذي يثبت أنه ذو *أصل عضوي*.`,
						answer: `2) - خاصيتان: سائل لزج أسود أخف من الماء (يطفو فوقه ولا يمتزج به)، وقابل للاحتراق محرراً حرارة.\n- الدليل على أصله العضوي: عند احتراقه يتصاعد *دخان أسود (فحم/كربون)* وغاز $upright("CO")_2$، مما يثبت أنه يحتوي عنصر الكربون الناتج عن بقايا العوالق البحرية.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) لخّص في ثلاث مراحل مرتبة كيفية تشكل البترول وتجمعه في هذا المكمن عبر ملايين السنين.`,
						answer: `3) (1) *الترسب*: موت وترسب العوالق البحرية الدقيقة في قاع بحر قديم.\n(2) *التحول*: دفن المادة العضوية وتعرضها للحرارة والضغط ونشاط بكتيريا لاهوائية في *الصخرة الأم* لتتحول إلى بترول وغاز.\n(3) *الهجرة والتجمع*: صعود البترول عبر الصخور المسامية حتى يُحبس في *صخرة خازنة* تحت *صخرة غطاء كتيمة (4)*.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) اذكر المراحل الأربع الكبرى لاستغلال البترول من باطن الأرض حتى وصوله إلى المستهلك.`,
						answer: `4) التنقيب والبحث $arrow.r$ الحفر والاستخراج $arrow.r$ النقل (أنابيب وبواخر) $arrow.r$ التكرير لفصل مشتقاته.`,
						mark: '1'
					}
				]
			},
			hints: [
				'الأخف كثافة يصعد للأعلى (الغاز) والأثقل في الأسفل (الماء المالح).',
				'الدخان الأسود عند الاحتراق يدل على وجود الكربون (أصل عضوي من العوالق البحرية).',
				'مراحل التشكل: ترسب العوالق ← دفن وتحول لاهوائي ← هجرة وتجمع تحت غطاء كتيم.'
			],
			solutionStepsAr: [
				'تسمية البيانات (غاز، بترول، ماء مالح، صخرة كتيمة) وتفسير الترتيب بالكثافة.',
				'إبراز خصائص البترول ودليل أصله العضوي (الكربون والدخان الأسود).',
				'ترتيب مراحل التشكل الثلاث ومراحل الاستغلال الأربع.'
			],
			finalAnswer: '(1) غاز، (2) بترول، (3) ماء مالح، (4) صخرة كتيمة'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Groundwater Table, Drawdown Curve & Water Cycle (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const groundwaterCycleTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3am_t3_groundwater_water_cycle',
	grade: '3am',
	trimesterId: 't3',
	domain: 'geology_earth',
	titleAr: 'الجيب المائي الجوفي، دورة الماء، وأثر الاستغلال المفرط للآبار',
	curriculumLessonId: 'sci_lesson_3am_t3_groundwater_minerals_renewables',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const region = rng.pick(['منطقة الوادي', 'هضبة بسكرة', 'سهل غرداية']);
		const svgPlot = svgBioCurvePlot({
			title: 'تطور عمق منسوب المياه الجوفية في آبار المنطقة خلال 20 سنة',
			xMin: 2005,
			xMax: 2025,
			yMin: 0,
			yMax: 100,
			xStep: 5,
			yStep: 20,
			xLabel: 'السنة',
			yLabel: 'عمق الماء (m)',
			shadedZones: [{ x1: 2015, x2: 2025, fill: '#fef2f2', label: 'فترة الضخ المفرط والجفاف', textColor: '#b91c1c' }],
			curves: [
				{
					fn: (x) => (x < 2015 ? 25 + (x - 2005) * 1.5 : 40 + (x - 2015) * 4.5),
					color: '#0284c7',
					label: 'عمق منسوب البئر'
				}
			],
			points: [
				{ x: 2005, y: 25, label: '25 m', color: '#15803d' },
				{ x: 2025, y: 85, label: '85 m', color: '#dc2626' }
			]
		});
		const imageUrl = saveSciencesSvgAsset(`sci_3am_t3_water_${difficulty}_s${seed}`, svgPlot);

		const mcq = buildUniqueMcqOptions(
			'ازداد عمق الوصول للماء من 25 m إلى 85 m بسبب استنزاف الجيب المائي (الضخ المفرط يفوق التغذية الطبيعية)',
			[
				{
					text: 'ارتفع منسوب الماء الجوفي واقترب من سطح الأرض بفضل الجفاف',
					diagnosticFeedback: 'ازدياد العمق من 25 م إلى 85 م يعني **هبوط** مستوى الماء وابتعاده عن السطح!'
				},
				{
					text: 'يتجمع الجيب المائي فوق طبقة رملية نفاذة تماماً',
					diagnosticFeedback: 'يتجمع الماء الجوفي داخل طبقة نفاذة لكن **فوق طبقة كتيمة غير نفاذة** كالغضار.'
				},
				{
					text: 'السقي بالغمر هو أفضل وسيلة للحفاظ على المياه الجوفية',
					diagnosticFeedback: 'السقي بالغمر يبذر الماء بالتبخر؛ الأفضل هو **الري بالتقطير**.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `يوضح المنحنى تغير عمق منسوب الماء في آبار ${region} بين 2005 ($25\\text{ m}$) و2025 ($85\\text{ m}$). ما التفسير العلمي الصحيح؟`,
				questionTextAr: 'حلل وفسر تطور عمق منسوب المياه الجوفية في المنحنى:',
				imageUrl,
				imageCaption: 'تطور عمق منسوب المياه الجوفية',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'زيادة العمق تعني هبوطاً حاداً في مستوى الجيب المائي بسبب تجاوز الضخ العشوائي لمعدل تجدد المياه بالأمطار.'
			},
			sujetExercise: {
				points: 6,
				instruction: `يعتمد الفلاحون في ${region} على مياه الآبار الجوفية لسقي محاصيلهم. يُظهر المنحنى المقابل تغير *عمق الوصول إلى الماء* في آبار المنطقة خلال 20 سنة.`,
				content: [
					{
						type: 'columns',
						widths: ['1.25fr', '1.15fr'],
						children: [
							{
								type: 'text',
								content: `1) حلّل المنحنى البياني (من 2005 إلى 2025)، ثم فسّر سبب التغير المسجل خاصة بعد سنة 2015.`,
								answer: `1) *التحليل*: ارتفع عمق منسوب الماء تدريجياً من $25 " m"$ سنة 2005 إلى $40 " m"$ سنة 2015، ثم قفز بسرعة ليبلغ $85 " m"$ سنة 2025 (هبوط حاد في مستوى الجيب المائي).\n\n*التفسير*: يعود ذلك إلى *الضخ المفرط وحفر الآبار العشوائي* بالتزامن مع سنوات الجفاف، بحيث فاق الاستهلاك معدل التغذية الطبيعية بالأمطار.`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: عمق منسوب المياه الجوفية'
							}
						]
					},
					{
						type: 'text',
						content: `2) اشرح باختصار كيف يتشكل الجيب المائي الجوفي ويتجدد عبر *دورة الماء في الطبيعة*.`,
						answer: `2) يتبخر ماء البحار فيتكاثف سحباً ويسقط أمطاراً وثلوجاً؛ يتسرب جزء من مياه الأمطار عبر التربة والصخور *النفاذة* (كالرمل) حتى يتجمع فوق صخرة *كتيمة غير نفاذة* (كالغضار) مشكّلاً الجيب المائي.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) ما الأخطار المترتبة على استمرار هذا الاستغلال غير العقلاني للمياه الجوفية؟`,
						answer: `3) نضوب الآبار وجفاف الينابيع، ارتفاع تكلفة الضخ، زيادة ملوحة المياه، وتهديد الفلاحة والأمن المائي للأجيال القادمة.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) اقترح ثلاثة حلول عملية للاستغلال العقلاني والمستدام للموارد المائية في الجزائر.`,
						answer: `4) (1) تعميم *تقنية الري بالتقطير* بدل الغمر، (2) مراقبة ومنع حفر الآبار العشوائي، (3) تجميع مياه الأمطار في السدود وتصفية المياه المستعملة لإعادة استعمالها في السقي.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'انتبه للمحور العمودي: زيادة "عمق الماء" تعني انخفاض وهبوط مستوى الخزان الجوفي!',
				'يتطلب الجيب المائي طبقة نفاذة فوق طبقة كتيمة.',
				'من أهم حلول الاستغلال العقلاني: الري بالتقطير وتصفية المياه المستعملة.'
			],
			solutionStepsAr: [
				'تحليل المنحنى (زيادة العمق من 25 إلى 85 م) وتفسيرها بالضخ المفرط والجفاف.',
				'شرح دورة الماء والطبقة النفاذة فوق الكتيمة.',
				'ذكر أخطار النضوب واقتراح 3 حلول للترشيد المستدام.'
			],
			finalAnswer: 'هبوط منسوب الجيب المائي (عمق 85 m) بسبب الاستنزاف؛ والحل هو الري بالتقطير والترشيد'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Soil Composition, Granulometry & Water Retention Lab (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const soilCompositionTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3am_t3_soil_composition_formation',
	grade: '3am',
	trimesterId: 't3',
	domain: 'ecology_environment',
	titleAr: 'خصائص التربة (النفاذية والاحتفاظ بالماء) ومراحل تشكلها من الصخرة الأم',
	curriculumLessonId: 'sci_lesson_3am_t3_soil_living_medium_formation',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{ vA: 84, vB: 48, vC: 12 },
			{ vA: 80, vB: 52, vC: 10 },
			{ vA: 88, vB: 45, vC: 15 }
		];
		const s = rng.pick(sets);
		const retA = 100 - s.vA;
		const retB = 100 - s.vB;
		const retC = 100 - s.vC;

		const svg = svgSoilFiltrationLab(s);
		const imageUrl = saveSciencesSvgAsset(`sci_3am_t3_soil_lab_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`التربة (ب) الدبالية المتوازنة هي الأنسب للزراعة لأنها تحتفظ بكمية متوازنة من الماء ($${retB}\\text{ mL}$) وتبقى مهوّاة`,
			[
				{
					text: `التربة (أ) الرملية هي الأنسب لأنها تحتفظ بـ $${s.vA}\\text{ mL}$ من الماء`,
					diagnosticFeedback: `$${s.vA}\\text{ mL}$ هو الماء **النافذ**، أما المحتفظ به في (أ) فهو $${retA}\\text{ mL}$ فقط (ضعيف جداً)!'`
				},
				{
					text: `التربة (ج) الغضارية هي الأنسب لأن الماء يغمرها بالكامل ويمنع دخول الهواء`,
					diagnosticFeedback: 'التربة الغضارية تحتفظ بكمية زائدة ($' + retC + '\\text{ mL}$) فتخنق جذور النباتات.'
				},
				{
					text: 'التربة وسط غير حي لا يحتوي إلا على حبيبات معدنية',
					diagnosticFeedback: 'التربة **وسط حي** يحتوي دبالاً وكائنات حية مهوّية ومحلّلة كديدان الأرض والبكتيريا.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `سكبنا $100\\text{ mL}$ من الماء فوق 3 عينات تربة فجمعت المخابير: (أ) $${s.vA}\\text{ mL}$، (ب) $${s.vB}\\text{ mL}$، (ج) $${s.vC}\\text{ mL}$. أي تربة هي الأنسب للزراعة ولماذا؟`,
				questionTextAr: 'انطلاقاً من نتائج الترشيح في الوثيقة، حدّد التربة الأنسب للزراعة:',
				imageUrl,
				imageCaption: 'تجربة قياس نفاذية وقدرة الاحتفاظ بالماء للتربة',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `التربة (ب) احتفظت بـ $${retB}\\text{ mL}$ (قدرة متوازنة وتهوية جيدة) فهي **تربة دبالية متوازنة** مناسبة للزراعة، عكس (أ) الرملية (${retA}\\text{ mL}$) و(ج) الغضارية الخانقة (${retC}\\text{ mL}$).`
			},
			sujetExercise: {
				points: 6,
				instruction: `لفهم اختلاف مردود المحاصيل الزراعية بين ثلاث قطع أرضية، أجرى فلاح التجربة المبينة في الوثيقة المقابلة بسكب $100 " mL"$ من الماء فوق كتل متساوية من التربات (أ)، (ب)، و(ج).`,
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) احسب *حجم الماء المحتفظ به* في كل عينة تربة ($V_"محتفظ" = 100 - V_"نافذ"$), ثم حدّد نوع كل تربة (رملية، دبالية متوازنة، غضارية).`,
								answer: `1) - التربة (أ): احتفظت بـ $100 - ${s.vA} = ${retA} " mL"$ $arrow.r$ *تربة رملية* (نفاذية عالية جداً).\n- التربة (ب): احتفظت بـ $100 - ${s.vB} = ${retB} " mL"$ $arrow.r$ *تربة دبالية متوازنة*.\n- التربة (ج): احتفظت بـ $100 - ${s.vC} = ${retC} " mL"$ $arrow.r$ *تربة غضارية* (نفاذية ضعيفة جداً).`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: تجربة الترشيح على 3 عينات تربة'
							}
						]
					},
					{
						type: 'text',
						content: `2) حدّد التربة *الأنسب للزراعة* مع التعليل، وبيّن دور *الدبال* و*الكائنات الحية* في جعل التربة وسطاً حياً وخصباً.`,
						answer: `2) الأنسب للزراعة هي *التربة (ب) الدبالية المتوازنة* لأنها توفر قدرة متوسطة على الاحتفاظ بالماء مع تهوية جيدة للجذور (عكس الرملية الجافة والغضارية الخانقة).\n\nتقوم الكائنات الحية (ديدان الأرض والبكتيريا المحللة) بتهوية التربة وتحويل البقايا العضوية إلى *دبال* وأملاح معدنية يمتصها النبات.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) رتّب باختصار المراحل الثلاث الكبرى لتشكل التربة الزراعية انطلاقاً من *الصخرة الأم*.`,
						answer: `3) (1) تفكك وتجوية *الصخرة الأم* بالعوامل المناخية، (2) استيطان النباتات الرائدة وتراكم بقايا عضوية تتحول إلى *دبال*، (3) تعمّق الآفاق وتكوّن تربة ناضجة خصبة عبر مئات السنين.`,
						mark: '2'
					}
				]
			},
			hints: [
				'حجم الماء المحتفظ به = 100 مل ناقص حجم الماء النافذ في الكأس السفلي.',
				'التربة الزراعية المثالية ليست شديدة النفاذية (رمل) ولا كتيمة (غضار)، بل دبالية متوازنة.',
				'تتشكل التربة ببطء شديد من تفكك الصخرة الأم وتدخل الكائنات الحية لتكوين الدبال.'
			],
			solutionStepsAr: [
				`الاحتفاظ بالماء: (أ) $${retA}\\text{ mL}$ رملية، (ب) $${retB}\\text{ mL}$ دبالية، (ج) $${retC}\\text{ mL}$ غضارية.`,
				'التربة (ب) أنسب للزراعة؛ والدبال والكائنات المحللة تجدد خصوبتها وتهويتها.',
				'ترتيب مراحل تشكل التربة من الصخرة الأم.'
			],
			finalAnswer: `التربة (ب) الدبالية (${retB} mL محتفظ به)`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Soil Degradation Threats & Protection Measures (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const soilProtectionTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3am_t3_soil_erosion_protection',
	grade: '3am',
	trimesterId: 't3',
	domain: 'ecology_environment',
	titleAr: 'العوامل المهددة للتربة الزراعية واستراتيجيات حمايتها في الجزائر',
	curriculumLessonId: 'sci_lesson_3am_t3_soil_threats_protection',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const area = rng.pick(['سهل متيجة', 'جبال الونشريس', 'الهضاب العليا (الجلفة والأغواط)']);
		const svg = svgGeologyDiagram('soil_water_table', { title: 'الوثيقة: آفاق التربة والطبقة الدبالية السطحية الهشة' });
		const imageUrl = saveSciencesSvgAsset(`sci_3am_t3_soil_prot_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'التشجير (السد الأخضر)، المدرجات الزراعية، الحرث المتعامد مع الميل، والدورة الزراعية',
			[
				{
					text: 'الحرث في اتجاه الميل والرعي الجائر لإزالة الأعشاب',
					diagnosticFeedback: 'الحرث في اتجاه الميل والرعي الجائر يُسرّعان انجراف التربة وتدهورها!'
				},
				{
					text: 'الإفراط في المبيدات الكيميائية والبناء على السهول الخصبة',
					diagnosticFeedback: 'المبيدات تقتل الكائنات الحية للتربة، والبناء العشوائي يقضي على الأراضي الفلاحية.'
				},
				{
					text: 'قطع الغابات الجبلية لتوسيع الطرق الترابية',
					diagnosticFeedback: 'إزالة الغابات تفقد التربة جذورها المثبتة فتتعرض للانجراف الشديد.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `تواجه التربة الزراعية في ${area} تهديدات مستمرة بالانجراف والتصحر. ما المجموعة الصحيحة من إجراءات حماية التربة؟`,
				questionTextAr: 'اختر الإجراءات السليمة لحماية التربة الزراعية واستصلاحها:',
				imageUrl,
				imageCaption: 'آفاق التربة وطبقاتها',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'تُحمى التربة بـ**التشجير (السد الأخضر)**، **المدرجات والحرث المتعامد مع الميل**، و**الدورة الزراعية** وتنظيم الرعي.'
			},
			sujetExercise: {
				points: 6,
				instruction: `رغم أن تشكل طبقة صغيرة من التربة الخصبة يستغرق قروناً، فإن التربة في ${area} تفقد مساحات هامة سنوياً بسبب عوامل طبيعية وممارسات بشرية خاطئة.`,
				content: [
					{
						type: 'text',
						content: `1) علّل وصف التربة بأنها *وسط هش ومحدود* يجب حمايته.`,
						answer: `1) لأن سمك الطبقة الدبالية الخصبة رقيق جداً واستغرق تشكله من الصخرة الأم *قروناً طويلة*، بينما يمكن أن ينجرف ويتدهور في بضع سنوات فقط، كما أن مساحة الأراضي الصالحة للزراعة محدودة جداً في الجزائر.`,
						mark: '1.5'
					},
					{
						type: 'table',
						headers: ['الممارسة السلبية المهددة للتربة', 'الخطر الناتج عنها', 'الإجراء الوقائي المقابل'],
						cells: [],
						rows: [
							['حرائق الغابات وقطع الأشجار', { content: '............', answer: 'تعرية وانجراف مائي سريع', mark: '0.5' }, { content: '................', answer: 'إعادة التشجير ومكافحة الحرائق', mark: '0.5' }],
							['الحرث في اتجاه ميل المنحدر', { content: '............', answer: 'تشكل أخاديد وجرف الدبال', mark: '0.5' }, { content: '................', answer: 'الحرث الأفقي وإنجاز المدرجات', mark: '0.5' }],
							['الرعي الجائر في السهوب', { content: '............', answer: 'زحف الرمال والتصحر', mark: '0.5' }, { content: '................', answer: 'تنظيم الرعي والسد الأخضر', mark: '0.5' }]
						],
						headerBackground: true,
						borders: 'grid',
						width: 'full'
					},
					{
						type: 'text',
						content: `3) اشرح فائدة *الدورة الزراعية* وتقليل *المبيدات الكيميائية* في الحفاظ على خصوبة التربة الحية.`,
						answer: `3) *الدورة الزراعية* (تناوب المزروعات خاصة البقوليات) تمنع استنزاف نفس الأملاح المعدنية وتجدد خصوبة التربة؛ وتقليل المبيدات يحفظ *ديدان الأرض والبكتيريا المحللة* الضرورية لتهوية التربة وتشكيل الدبال.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'التربة هشة لبطء تشكلها وسرعة تدهورها ومحدودية مساحتها.',
				'قابل كل سلوك سلبي بحله المباشر: قطع الأشجار ← التشجير؛ الميل ← المدرجات؛ التصحر ← السد الأخضر.',
				'الدورة الزراعية تجدد الأملاح المعدنية والمبيدات المفرطة تقتل الكائنات المحللة.'
			],
			solutionStepsAr: [
				'تعليل هشاشة التربة ببطء تشكلها وسرعة انجرافها.',
				'ملء جدول المخاطر والإجراءات الوقائية المقابلة لها.',
				'توضيح دور الدورة الزراعية وحماية الكائنات المحللة من المبيدات.'
			],
			finalAnswer: 'التشجير، المدرجات، تنظيم الرعي، والدورة الزراعية'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Integration Situation 1 (8 pts): Rational Exploitation & Energy Transition
// ═══════════════════════════════════════════════════════════════════════════════
const integrationEnergyTransitionTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3am_t3_integration_energy_transition_algeria',
	grade: '3am',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: الاستغلال العقلاني للثروات الباطنية والانتقال نحو الطاقات المتجددة في الجزائر',
	curriculumLessonId: 'sci_lesson_3am_t3_groundwater_minerals_renewables',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sunHours = rng.pick([3000, 3200, 3500]);
		const svgOil = svgOilTrapLabeled(false);
		const imgOil = saveSciencesSvgAsset(`sci_3am_t3_int1_energy_${difficulty}_s${seed}`, svgOil);

		const mcq = buildUniqueMcqOptions(
			'البترول مورد غير متجدد وملوث (CO₂)، لذا يجب ترشيد استغلاله والانتقال التدريجي للطاقات المتجددة كالشمسية والريحية',
			[
				{
					text: 'البترول مورد متجدد يتشكل في بضع سنوات ولا يلوث الجو',
					diagnosticFeedback: 'تشكل البترول يتطلب **ملايين السنين**، واحتراقه يطرح كميات ضخمة من $\\text{CO}_2$ الملوث.'
				},
				{
					text: 'الجزائر لا تملك مؤهلات للطاقة الشمسية أو الريحية',
					diagnosticFeedback: `تتمتع الجزائر بـ $${sunHours}$ ساعة إشعاع شمسي سنوياً ما يجعلها مؤهلة بقوة للطاقة الشمسية.`
				},
				{
					text: 'المعادن كالحديد والفوسفات طاقات متجددة لا تنفد أبداً',
					diagnosticFeedback: 'المعادن موارد باطنية **غير متجددة** تتطلب ترشيداً وإعادة تدوير.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: 'integration',
			titleAr: this.titleAr,
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: `تعتمد الجزائر بدرجة عالية على المحروقات رغم امتلاكها $${sunHours}$ ساعة إشعاع شمسي سنوياً. ما القرار البيئي والاقتصادي السليم؟`,
				questionTextAr: 'ما التوجه المستدام لاستغلال الموارد الطاقوية في الجزائر؟',
				imageUrl: imgOil,
				imageCaption: 'الوثيقة 1: مكمن بترولي في باطن الأرض',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'البترول والغاز موارد أحفورية **غير متجددة وملوثة**، لذا يفرض الاستغلال العقلاني ترشيدها والاستثمار في **الطاقات المتجددة النظيفة** (الشمسية والريحية).'
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `*السياق*: في ندوة علمية حول *مستقبل الطاقة في الجزائر*، أشار الخبراء إلى أن الاعتماد الكلي على البترول والغاز الطبيعي يطرح تحديين كبيرين: خطر نفاذ المكامن مستقبلاً وتزايد انبعاثات غاز $upright("CO")_2$ المسبب للاحتباس الحراري، في وقت تملك فيه الجزائر إمكانات هائلة من الطاقة الشمسية ($${sunHours}$ ساعة شمس سنوياً) ومناجم هامة (كحديد غار جبيلات وفوسفات تبسة). لدراسة هذا الموضوع تُقدَّم لك الوثيقتان الآتيتان:`,
				content: [
					{
						type: 'columns',
						widths: ['1.15fr', '1.1fr'],
						children: [
							{
								type: 'table',
								headers: ['المعيار (الوثيقة 2)', 'البترول والغاز الطبيعي', 'الطاقة الشمسية والريحية'],
								cells: [],
								rows: [
									['مدة التشكل والتجدد', 'ملايين السنين (غير متجدد)', 'دائمة التجدد (غير قابلة للنفاذ)'],
									['انبعاث غاز CO₂ والتلوث', 'مرتفع جداً (احتباس حراري)', 'شبه معدوم (طاقة نظيفة)'],
									['التوفر في الجزائر', 'مكامن محدودة بالصحراء', `${sunHours} ساعة إشعاع + رياح دائمة`]
								],
								headerBackground: true,
								borders: 'grid',
								width: 'full'
							},
							{
								type: 'image',
								src: imgOil,
								caption: 'الوثيقة 1: بنية مكمن بترولي'
							}
						]
					},
					{
						type: 'text',
						content: `*التعليمات*: بالاعتماد على السياق والوثيقتين (1 و 2) ومكتسباتك القبلية:\n\n1) بالاعتماد على الوثيقة (1) ومكتسباتك، بيّن *الأصل البيولوجي للبترول* وفسّر لماذا يُعد *مورداً غير متجدد* مقارنة بالطاقات المتجددة.`,
						answer: `1) *بالاعتماد على الوثيقتين (1 و 2)*: يتشكل البترول من ترسب وتحول *العوالق البحرية الدقيقة* في وسط لاهوائي عبر *ملايين السنين* ثم هجرته وتجمعه تحت صخرة غطاء كتيمة.\n\nيُعد *مورداً غير متجدد* لأن سرعة استهلاكه البشرية تفوق بملايين المرات سرعة تشكله البطيئة، ما يعرّض مكامنه للنفاذ عكس الطاقة الشمسية والريحية دائمة التجدد.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `2) استخرج من الوثيقة (2) ميزتين رئيسيتين تبرران ضرورة *الانتقال الطاقوي* في الجزائر نحو الطاقة الشمسية والريحية.`,
						answer: `2) *بالاعتماد على الوثيقة (2)*:\n- *الاستدامة وعدم النفاذ*: طاقات متجددة دائمة ومتوفرة بغزارة في الجزائر ($${sunHours}$ ساعة إشعاع شمسي سنوياً).\n- *حماية البيئة والصحة*: طاقات نظيفة لا تطرح غازات دفيئة ($upright("CO")_2$) فتحد من التلوث الجوي والاحتباس الحراري.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `3) اقترح *ثلاثة سلوكات وتدابير* ملموسة تجسد *الاستغلال العقلاني* للموارد الباطنية (محروقات، معادن، ومياه) لضمان حق الأجيال القادمة.`,
						answer: `3) - *ترشيد استهلاك الطاقة* في المنازل والنقل (مصابيح اقتصادية، النقل العمومي، العزل الحراري).\n- *الاستثمار في محطات الطاقة الشمسية والريحية* بالهضاب والصحراء لتوليد الكهرباء النظيفة.\n- *إعادة تدوير المعادن* (الحديد، الألمنيوم، البلاستيك) وترشيد استهلاك المياه الجوفية بالري بالتقطير.`,
						mark: '3'
					}
				]
			},
			hints: [
				'اربط الأصل العضوي للبترول بمدة تشكله (ملايين السنين) لتبرير كونه غير متجدد.',
				'استخرج مباشرة من الوثيقة (2) ميزتي التجدد والنظافة البيئية.',
				'نوّع الحلول بين الترشيد الفردي، الانتقال للطاقات النظيفة، وإعادة تدوير المعادن.'
			],
			solutionStepsAr: [
				'توضيح الأصل العضوي للبترول وتبرير كونه غير متجدد.',
				'استخلاص ميزتي الطاقة الشمسية والريحية من الوثيقة (2).',
				'اقتراح 3 تدابير عملية للاستغلال العقلاني والتنمية المستدامة.'
			],
			finalAnswer: 'الترشيد + الانتقال للطاقات المتجددة النظيفة + إعادة التدوير'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Integration Situation 2 (8 pts): Revitalizing Algeria's Green Dam (السد الأخضر)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationGreenDamTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3am_t3_integration_green_dam_soil_conservation',
	grade: '3am',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: إعادة بعث مشروع السد الأخضر ومكافحة التصحر وانجراف التربة',
	curriculumLessonId: 'sci_lesson_3am_t3_soil_threats_protection',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const wilaya = rng.pick(['الجلفة', 'المسيلة', 'النعامة', 'البيض']);
		const svgSoil = svgGeologyDiagram('soil_water_table', {
			title: 'الوثيقة 1: بنية التربة الخصبة وأهمية الغطاء الدبالي السطحي'
		});
		const imgSoil = saveSciencesSvgAsset(`sci_3am_t3_int2_greendam_${difficulty}_s${seed}`, svgSoil);

		const mcq = buildUniqueMcqOptions(
			'الرعي الجائر وقطع الأشجار عرّيا التربة فانجرف الدبال وتراجع احتفاظها بالماء؛ وإعادة بعث السد الأخضر يثبت التربة ويوقف التصحر',
			[
				{
					text: 'تزداد نسبة الدبال في الأرض العارية أكثر منها في الأرض المشجّرة',
					diagnosticFeedback: 'تشير الوثيقة (2) بوضوح إلى انخفاض شديد في الدبال بالأرض العارية بسبب غياب الأوراق وانجراف السطح.'
				},
				{
					text: 'لا يؤثر الغطاء النباتي على قدرة التربة على الاحتفاظ بالماء',
					diagnosticFeedback: 'الغطاء النباتي والدبال يضاعفان قدرة التربة على الاحتفاظ بالماء وتغذية الجيب المائي.'
				},
				{
					text: 'الحل لمكافحة التصحر هو تكثيف الرعي الجائر وحرق الأعشاب',
					diagnosticFeedback: 'الرعي الجائر والحرائق هما السببان الرئيسيان في تسريع التصحر!'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: 'integration',
			titleAr: this.titleAr,
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: `في منطقة سهبية بولاية ${wilaya}، قُورنت قطعة مشجّرة (ضمن السد الأخضر) بقطعة عارية تعرضت للرعي الجائر. ما الاستنتاج العلمي والحل المناسب؟`,
				questionTextAr: 'ما أثر تدهور الغطاء النباتي على خصوبة التربة وما دور مشروع السد الأخضر؟',
				imageUrl: imgSoil,
				imageCaption: 'الوثيقة 1: طبقات التربة والغلاف الدبالي',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'تدمير الغطاء النباتي يُفقد التربة الدبال ويعرضها للانجراف والتصحر، بينما يُثبت **السد الأخضر (التشجير)** التربة ويحفظ خصوبتها ورطوبتها.'
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `*السياق*: شهدت مناطق سهبية بولاية ${wilaya} تراجعاً مقلقاً للمراعي وزحفاً للرمال وتدهوراً للأراضي الفلاحية نتيجة توالي سنوات الجفاف، الرعي الجائر، وقطع الأشجار. وفي إطار مشروع إعادة بعث *السد الأخضر*، أجرى باحثون مقارنة ميدانية بين قطعة أرض مشجّرة وأخرى مجاورة عارية. إليك نتائج الدراسة في الوثيقتين الآتيتين:`,
				content: [
					{
						type: 'columns',
						widths: ['1.15fr', '1.1fr'],
						children: [
							{
								type: 'table',
								headers: ['المؤشر (الوثيقة 2)', 'أرض مشجّرة (السد الأخضر)', 'أرض عارية (رعي جائر)'],
								cells: [],
								rows: [
									['نسبة الدبال (مادة عضوية)', 'مرتفعة (8%)', 'ضئيلة جداً (0.8%)'],
									['كمية الماء المحتفظ به', '55 mL / 100 mL', '14 mL / 100 mL'],
									['كمية التربة المنجرفة سنوياً', 'ضئيلة جداً (0.3 طن/هـ)', 'مرتفعة جداً (18 طن/هـ)']
								],
								headerBackground: true,
								borders: 'grid',
								width: 'full'
							},
							{
								type: 'image',
								src: imgSoil,
								caption: 'الوثيقة 1: طبقات التربة والجيب المائي'
							}
						]
					},
					{
						type: 'text',
						content: `*التعليمات*: بالاعتماد على السياق والوثيقتين (1 و 2) ومكتسباتك القبلية:\n\n1) قارن من خلال الوثيقة (2) بين الأرض المشجّرة والأرض العارية من حيث نسبة الدبال والاحتفاظ بالماء وكمية التربة المنجرفة.`,
						answer: `1) *بالاعتماد على الوثيقة (2)*: نلاحظ أن الأرض المشجّرة أغنى بـ 10 أضعاف في *الدبال* ($8\%$ مقابل $0.8\%$), وأعلى قدرة على *الاحتفاظ بالماء* ($55 " mL"$ مقابل $14 " mL"$), بينما تفقد الأرض العارية كمية هائلة من التربة بالانجراف ($18$ طن/هكتار مقابل $0.3$ طن/هكتار فقط في المشجّرة).`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `2) فسّر سبب تدهور التربة وتصحر الأرض العارية بولاية ${wilaya}، مبيّناً دور الأشجار وجذورها وكائنات التربة في حماية الأرض المشجّرة.`,
						answer: `2) *بالاعتماد على السياق والوثيقتين (1 و 2)*: أدى الرعي الجائر وقطع الأشجار إلى إزالة الغطاء النباتي، فانكشفت الطبقة الدبالية السطحية مباشرة للأمطار والرياح وانجرفت ($18$ طن/هـ) فتراجعت قدرتها على الاحتفاظ بالماء وتحولت لتربة قاحلة (*تصحر*).\n\nأما في الأرض المشجّرة فـ*تثبّت الجذور* التربة، وتكسر الأشجار الرياح، وتزود الأوراق المتساقطة الكائنات المحللة بالمادة العضوية لتجديد *الدبال* الخصب والحافظ للماء.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `3) قدّم *ثلاثة مقترحات عملية* للمساهمة كمواطن وفلاح في إنجاح إعادة بعث السد الأخضر ومكافحة التصحر.`,
						answer: `3) - *المشاركة في حملات التشجير* بغرس أشجار مثمرة ومقاومة للجفاف (الصنوبر الحلبي، الفستق الأطلسي، الزيتون، الخروب) ضمن شريط السد الأخضر.\n- *تنظيم الرعي* وترك فترات راحة للغطاء النباتي السهبي حتى يتجدد طبيعياً، ومنع قطع الأشجار والحرائق.\n- *إنجاز المدرجات ومصدات الرياح* واعتماد الري بالتقطير والأسمدة العضوية الطبيعية.`,
						mark: '2.5'
					}
				]
			},
			hints: [
				'استعمل الأرقام الدقيقة من الوثيقة (2) في المقارنة (8% مقابل 0.8%، 18 طن/هـ مقابل 0.3 طن/هـ).',
				'اربط بين غياب الجذور والدبال وبين تسارع الانجراف وضعف الاحتفاظ بالماء.',
				'اقترح حلولاً واقعية ملائمة للمنطقة السهبية الجزائرية (غرس أشجار مقاومة للجفاف وتنظيم الرعي).'
			],
			solutionStepsAr: [
				'مقارنة رقمية دقيقة بين الأرض المشجّرة والعارية من الوثيقة (2).',
				'تفسير التصحر والانجراف بزوال الغطاء النباتي والدبال، وتبيان دور الجذور والأشجار.',
				'تقديم 3 مقترحات عملية لإنجاح السد الأخضر وحماية التربة.'
			],
			finalAnswer: 'السد الأخضر يحفظ الدبال (8%) والماء (55 mL) ويقلص الانجراف 60 مرة'
		};
	}
};

export const SCIENCES_TEMPLATES_3AM_T3: SciencesParameterizedTemplate[] = [
	petroleumTrapTemplate,
	groundwaterCycleTemplate,
	soilCompositionTemplate,
	soilProtectionTemplate,
	integrationEnergyTransitionTemplate,
	integrationGreenDamTemplate
];
