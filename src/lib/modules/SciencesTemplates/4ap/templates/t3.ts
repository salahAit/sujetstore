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
	svgBioFlowchart,
	svgPlantAndPrimaryDiagram,
	wrapSciencesSvg
} from '../../svg-sciences';

function buildCircuitTestSvg4ap(sampleName: string, isConductor: boolean, switchClosed: boolean): string {
	const lit = isConductor && switchClosed;
	return wrapSciencesSvg(
		440,
		220,
		`<rect x="6" y="6" width="428" height="208" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="220" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">دارة اختبار النواقل والعوازل الكهربائية</text>` +
			`<rect x="86" y="56" width="268" height="122" fill="none" stroke="#0f172a" stroke-width="2.2"/>` +
			// Battery left
			`<rect x="70" y="96" width="32" height="44" rx="5" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.8"/>` +
			`<text x="86" y="112" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">+</text>` +
			`<text x="86" y="132" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">−</text>` +
			// Lamp right
			`<circle cx="354" cy="118" r="17" fill="${lit ? '#fde047' : '#e2e8f0'}" stroke="#0f172a" stroke-width="1.8"/>` +
			`<line x1="343" y1="107" x2="365" y2="129" stroke="#0f172a" stroke-width="1.5"/>` +
			`<line x1="343" y1="129" x2="365" y2="107" stroke="#0f172a" stroke-width="1.5"/>` +
			`<text x="394" y="122" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${lit ? '#b45309' : '#475569'}">${lit ? 'مضيء' : 'منطفئ'}</text>` +
			// Tested sample top
			`<rect x="166" y="44" width="108" height="24" rx="5" fill="${isConductor ? '#dcfce7' : '#fee2e2'}" stroke="${isConductor ? '#16a34a' : '#dc2626'}" stroke-width="1.6"/>` +
			`<text x="220" y="60" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#0f172a">${esc(sampleName)}</text>` +
			// Switch bottom
			`<rect x="190" y="168" width="60" height="20" fill="#f8fafc"/>` +
			`<circle cx="196" cy="178" r="3" fill="#0f172a"/><circle cx="244" cy="178" r="3" fill="#0f172a"/>` +
			(switchClosed
				? `<line x1="196" y1="178" x2="244" y2="178" stroke="#16a34a" stroke-width="2.5"/>`
				: `<line x1="196" y1="178" x2="238" y2="162" stroke="#dc2626" stroke-width="2.5"/>`) +
			`<text x="220" y="202" text-anchor="middle" font-size="10.8" font-weight="bold" fill="${switchClosed ? '#166534' : '#dc2626'}">${switchClosed ? 'القاطعة مغلقة' : 'القاطعة مفتوحة'}</text>`
	);
}

function buildSafetySceneSvg4ap(hazardTitle: string, ruleTitle: string): string {
	return wrapSciencesSvg(
		440,
		215,
		`<rect x="6" y="6" width="428" height="203" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="220" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">تشخيص خطر كهربائي منزلي والوقاية منه</text>` +
			`<rect x="230" y="46" width="188" height="142" rx="9" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>` +
			`<polygon points="324,62 346,102 302,102" fill="#fde047" stroke="#dc2626" stroke-width="2"/>` +
			`<text x="324" y="96" text-anchor="middle" font-size="18" font-weight="bold" fill="#dc2626">!</text>` +
			`<text x="324" y="130" text-anchor="middle" font-size="11" font-weight="bold" fill="#991b1b">سلوك خطير</text>` +
			`<text x="324" y="156" text-anchor="middle" font-size="10.2" fill="#7f1d1d">${esc(hazardTitle)}</text>` +
			`<rect x="22" y="46" width="188" height="142" rx="9" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>` +
			`<circle cx="116" cy="82" r="20" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>` +
			`<text x="116" y="89" text-anchor="middle" font-size="18" font-weight="bold" fill="#15803d">✓</text>` +
			`<text x="116" y="130" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534">السلوك الآمن</text>` +
			`<text x="116" y="156" text-anchor="middle" font-size="10.2" fill="#14532d">${esc(ruleTitle)}</text>`
	);
}

function buildEarthMotionSvg4ap(motion: 'rotation' | 'revolution'): string {
	const isRot = motion === 'rotation';
	if (isRot) {
		return svgPlantAndPrimaryDiagram('day_night_earth', {
			title: 'دوران الأرض حول نفسها (تعاقب الليل والنهار — 24 ساعة)'
		});
	}
	return wrapSciencesSvg(
		440,
		225,
		`<rect x="6" y="6" width="428" height="213" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="220" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">دوران الأرض حول الشمس (تعاقب الفصول الأربعة)</text>` +
			`<ellipse cx="220" cy="118" rx="136" ry="58" fill="none" stroke="#64748b" stroke-width="1.8" stroke-dasharray="6,4"/>` +
			`<circle cx="220" cy="118" r="22" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>` +
			`<text x="220" y="122" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#713f12">الشمس</text>` +
			`<circle cx="356" cy="118" r="13" fill="#38bdf8" stroke="#0369a1" stroke-width="1.6"/>` +
			`<circle cx="84" cy="118" r="13" fill="#38bdf8" stroke="#0369a1" stroke-width="1.6"/>` +
			`<circle cx="220" cy="60" r="13" fill="#38bdf8" stroke="#0369a1" stroke-width="1.6"/>` +
			`<circle cx="220" cy="176" r="13" fill="#38bdf8" stroke="#0369a1" stroke-width="1.6"/>` +
			calloutBadge(390, 118, '1', '#dc2626') +
			calloutBadge(50, 118, '2', '#1d4ed8') +
			haloText(`x="220" y="42" text-anchor="middle" font-size="10.5" font-weight="bold"`, '#15803d', 'الربيع') +
			haloText(`x="220" y="204" text-anchor="middle" font-size="10.5" font-weight="bold"`, '#d97706', 'الخريف')
	);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Water States, Transformations & Water Cycle (2 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const waterChangesCycleTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4ap_t3_water_changes_cycle',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'matter_tech_primary',
	titleAr: 'حالات الماء وتحولاتها ودورة الماء في الطبيعة',
	curriculumLessonId: 'sci_lesson_4ap_t3_water_states_cycle',
	defaultPoints: 2,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const transitions = [
			{
				name: 'التبخر',
				desc: 'تحوّل الماء السائل في البحار والأنهار إلى بخار ماء بفعل حرارة الشمس',
				cause: 'التسخين'
			},
			{
				name: 'التكاثف',
				desc: 'تحوّل بخار الماء المتصاعد إلى قطيرات ماء دقيقة تشكّل السحب في الأجواء الباردة',
				cause: 'التبريد'
			},
			{
				name: 'الانصهار',
				desc: 'تحوّل الثلج أو الجليد الصلب إلى ماء سائل عند ارتفاع درجة الحرارة فوق $0^\\circ\\text{C}$',
				cause: 'التسخين'
			},
			{
				name: 'التجمد',
				desc: 'تحوّل الماء السائل إلى جليد صلب عندما تنخفض درجة الحرارة إلى $0^\\circ\\text{C}$',
				cause: 'التبريد'
			}
		];
		const chosen = rng.pick(transitions);
		const svg = svgPlantAndPrimaryDiagram('water_cycle');
		const imageUrl = saveSciencesSvgAsset(`sci_4ap_t3_water_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			chosen.name,
			transitions
				.filter((t) => t.name !== chosen.name)
				.map((t) => ({
					text: t.name,
					diagnosticFeedback: `انتبه: ${t.name} هو ${t.desc.replaceAll('$0^\\circ\\text{C}$', '0°C')} وليس المطلوب هنا.`
				})),
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `بالاعتماد على مخطط دورة الماء في الطبيعة المقابل، ماذا نسمي التحول الفيزيائي التالي: **«${chosen.desc}»**؟`,
			questionTextAr: `سمِّ التحول الفيزيائي الموصوف للماء.`,
			imageUrl,
			imageCaption: 'مراحل دورة الماء في الطبيعة',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `هذا التحول يُسمى **${chosen.name}** ويحدث بفعل **${chosen.cause}**.`
		};

		const hints: [string, string, string] = [
			'حدّد أولاً الحالة الابتدائية للماء والحالة النهائية (صلب / سائل / غاز).',
			`تحقق هل يحدث هذا التحول بـ${chosen.cause}.`,
			'تذكّر التحولات الأربعة: انصهار، تجمد، تبخر، تكاثف.'
		];

		const solutionStepsAr = [
			`التحول الموصوف يحدث بفعل **${chosen.cause}**.`,
			`اسمه العلمي هو: **${chosen.name}**.`,
			'مراحل دورة الماء: التبخر ← التكاثف ← التساقط ← الجريان والتسرب.'
		];

		const sujetDesc = chosen.desc.replaceAll('$0^\\circ\\text{C}$', '0°C');
		const sujetExercise: ExerciseBlock = {
			points: 2,
			instruction: 'لاحظ مخطط دورة الماء في الطبيعة المقابل، ثم أجب:',
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: `1) ماذا نسمي التحول المتمثل في: *${sujetDesc}*؟ وهل يحدث بالتسخين أم بالتبريد؟`,
							answer: `1) يُسمى *${chosen.name}* ويحدث بفعل *${chosen.cause}*.`,
							mark: '1'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'دورة الماء في الطبيعة'
						}
					]
				},
				{
					type: 'table',
					headers: ['حالة الماء', 'مثال من الطبيعة', 'درجة التحول المرجعية'],
					cells: [],
					rows: [
						['الحالة الصلبة', { content: '................', answer: 'الثلج أو الجليد', mark: '0.5' }, 'التجمد والانصهار عند 0°C'],
						['الحالة الغازية', { content: '................', answer: 'بخار الماء', mark: '0.5' }, 'الغليان عند 100°C']
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
			grade: '4ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: chosen.name
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Simple Circuit & Conductors/Insulators (2 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const circuitConductorsTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4ap_t3_circuit_conductors',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'matter_tech_primary',
	titleAr: 'الدارة الكهربائية البسيطة والنواقل والعوازل',
	curriculumLessonId: 'sci_lesson_4ap_t3_electric_circuit_conductors',
	defaultPoints: 2,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const samples = [
			{ name: 'مسمار حديدي', isConductor: true, mat: 'الحديد' },
			{ name: 'سلك نحاسي', isConductor: true, mat: 'النحاس' },
			{ name: 'ورق ألمنيوم', isConductor: true, mat: 'الألمنيوم' },
			{ name: 'مسطرة بلاستيكية', isConductor: false, mat: 'البلاستيك' },
			{ name: 'خشب جاف', isConductor: false, mat: 'الخشب الجاف' },
			{ name: 'ممحاة مطاطية', isConductor: false, mat: 'المطاط' }
		];
		const chosen = rng.pick(samples);
		const switchClosed = difficulty === 'hard' ? seed % 3 !== 0 : true;
		const lit = chosen.isConductor && switchClosed;
		const svg = buildCircuitTestSvg4ap(chosen.name, chosen.isConductor, switchClosed);
		const imageUrl = saveSciencesSvgAsset(`sci_4ap_t3_circ_s${seed}`, svg);

		const correctAnswer = !switchClosed
			? 'لا يتوهج المصباح لأن القاطعة مفتوحة (الدارة مفتوحة)'
			: chosen.isConductor
				? `يتوهج المصباح لأن ${chosen.mat} ناقل كهربائي يغلق الدارة`
				: `لا يتوهج المصباح لأن ${chosen.mat} عازل كهربائي يمنع مرور الكهرباء`;

		const mcq = buildUniqueMcqOptions(
			correctAnswer,
			[
				{
					text: chosen.isConductor
						? `لا يتوهج المصباح لأن ${chosen.mat} عازل كهربائي`
						: `يتوهج المصباح لأن ${chosen.mat} ناقل كهربائي`,
					diagnosticFeedback: chosen.isConductor
						? `${chosen.mat} معدن ناقل للكهرباء وليس عازلاً!`
						: `${chosen.mat} مادة عازلة للكهرباء لا تسمح بمرور التيار!`
				},
				{
					text: 'يتوهج المصباح دائماً حتى لو كانت القاطعة مفتوحة',
					diagnosticFeedback: 'في الدارة المفتوحة لا يمر التيار الكهربائي فلا يتوهج المصباح.'
				},
				{
					text: 'تحترق البطارية فوراً عند وضع أي جسم في الدارة',
					diagnosticFeedback: 'وجود المصباح في الدارة يمنع استقصار البطارية وتلفها.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `في الدارة الكهربائية البسيطة المقابلة، وضعنا **${chosen.name}** والقاطعة **${switchClosed ? 'مغلقة' : 'مفتوحة'}**. ماذا يحدث للمصباح ولماذا؟`,
			questionTextAr: `ماذا يحدث للمصباح عند وضع ${chosen.name}؟`,
			imageUrl,
			imageCaption: `تجربة اختبار (${chosen.name}) في دارة كهربائية بسيطة`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `لكي يتوهج المصباح يجب أن تكون الدارة مغلقة بالكامل بمواد ناقلة. وهنا: **${correctAnswer}**.`
		};

		const hints: [string, string, string] = [
			'تحقق أولاً من حالة القاطعة في أسفل الرسم (هل هي مغلقة أم مفتوحة؟).',
			`صنّف مادة (${chosen.mat}): هل هي من المعادن الناقلة أم من العوازل؟`,
			'يضيء المصباح فقط إذا كانت القاطعة مغلقة والمادة ناقلة معاً.'
		];

		const solutionStepsAr = [
			`حالة القاطعة: **${switchClosed ? 'مغلقة' : 'مفتوحة'}**.`,
			`تصنيف ${chosen.mat}: **${chosen.isConductor ? 'ناقل كهربائي' : 'عازل كهربائي'}**.`,
			`النتيجة: **${correctAnswer}**.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 2,
			instruction: `لاحظ الدارة الكهربائية المقابلة التي تحتوي على بطارية، مصباح، قاطعة (${switchClosed ? 'مغلقة' : 'مفتوحة'})، وعينة من *${chosen.name}*، ثم أجب:`,
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: `1) هل يتوهج المصباح في هذه الحالة؟ علّل إجابتك، وصنّف مادة *${chosen.mat}* (ناقل أم عازل).`,
							answer: `1) *${lit ? 'نعم، يتوهج المصباح' : 'لا، لا يتوهج المصباح'}*. التعليل: *${correctAnswer}*. مادة ${chosen.mat}: *${chosen.isConductor ? 'ناقل كهربائي' : 'عازل كهربائي'}*.`,
							mark: '1'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'دارة اختبار النواقل والعوازل'
						}
					]
				},
				{
					type: 'text',
					content: '2) لماذا تُغلف أسلاك النحاس الكهربائية من الخارج بمادة البلاستيك؟',
					answer: '2) لأن *النحاس ناقل كهربائي* ينقل التيار، أما *البلاستيك فعازل كهربائي* يحمي الإنسان من الصعق عند لمس الأسلاك.',
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't3',
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
// 3. Home Electrical Safety (2 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const electricalSafetyTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4ap_t3_electrical_safety',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'matter_tech_primary',
	titleAr: 'الكهرباء المنزلية وقواعد الأمن الكهربائي',
	curriculumLessonId: 'sci_lesson_4ap_t3_home_electrical_safety',
	defaultPoints: 2,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cases = [
			{
				hazard: 'لمس مجفف الشعر بيدين مبللتين في الحمام',
				rule: 'تجفيف اليدين وإبعاد الأجهزة عن الماء',
				reason: 'الماء العادي ناقل للكهرباء فيسبب الصعق الكهربائي'
			},
			{
				hazard: 'إدخال مسمار حديدي داخل مأخذ الكهرباء',
				rule: 'عدم إدخال أي معدن ووضع غطاء بلاستيكي',
				reason: 'الحديد ناقل كهربائي ويؤدي لمس كهرباء القطاع لصعق مميت'
			},
			{
				hazard: 'تغيير مصباح منزلي دون قطع القاطع الرئيسي',
				rule: 'قطع القاطع الكهربائي الرئيسي قبل الصيانة',
				reason: 'قطع القاطع يمنع مرور التيار الكهربائي أثناء التغيير'
			}
		];
		const chosen = rng.pick(cases);
		const svg = buildSafetySceneSvg4ap(chosen.hazard, chosen.rule);
		const imageUrl = saveSciencesSvgAsset(`sci_4ap_t3_safety_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`${chosen.rule} لأن ${chosen.reason}`,
			[
				{
					text: 'متابعة العمل بسرعة لأن كهرباء المنزل ضعيفة مثل البطارية الصغيرة',
					diagnosticFeedback: 'خطأ خطير! كهرباء القطاع المنزلية قوية ومميتة وليست مثل البطارية الصغيرة.'
				},
				{
					text: 'رش الماء على المأخذ الكهربائي لتبريده قبل الاستعمال',
					diagnosticFeedback: 'الماء ناقل للكهرباء ويزيد خطر الصعق والحريق بشكل كبير!'
				},
				{
					text: 'جذب القابس من السلك النحاسي المكشوف بقوة',
					diagnosticFeedback: 'لمس السلك المكشوف يعرض الشخص للصعق؛ نمسك القابس البلاستيكي دائماً.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `شاهدت في المنزل الموقف الخطير الآتي: **«${chosen.hazard}»**. ما التصرف الآمن الصحيح ولماذا؟`,
			questionTextAr: `ما التصرف الوقائي الصحيح تجاه: ${chosen.hazard}؟`,
			imageUrl,
			imageCaption: 'قاعدة الأمن الكهربائي المنزلي',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `يجب تطبيق قاعدة الأمن الكهربائي: **${chosen.rule}**، لأن **${chosen.reason}**.`
		};

		const hints: [string, string, string] = [
			'تذكّر أن كهرباء القطاع المنزلية خطيرة جداً تسبب الصعق والحرائق.',
			'الماء والمعادن نواقل للكهرباء، بينما البلاستيك والمطاط عوازل.',
			`ابحث عن الإجراء الذي يمنع الخطر (${chosen.rule}).`
		];

		const solutionStepsAr = [
			`الخطر الملاحظ: ${chosen.hazard}.`,
			`السبب العلمي: ${chosen.reason}.`,
			`القاعدة الوقائية: **${chosen.rule}**.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 2,
			instruction: 'في إطار حملة التوعية حول قواعد الأمن الكهربائي في المنزل، تأمل السند المقابل ثم أجب:',
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: `1) لماذا يُعدّ (${chosen.hazard}) خطراً شديداً؟ وما القاعدة الوقائية الواجب اتباعها؟`,
							answer: `1) لأنه يسبب الصعق الكهربائي حيث إن *${chosen.reason}*. القاعدة الوقائية: *${chosen.rule}*.`,
							mark: '1'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'السلوك الخطير والسلوك الآمن'
						}
					]
				},
				{
					type: 'true_false',
					items: [
						{
							q: 'يمكن استعمال كهرباء القطاع المنزلي لإجراء تجارب الدارة البسيطة في المنزل.',
							a: 'خاطئ',
							c: 'نستعمل البطاريات ذات الجهد المنخفض فقط لأن كهرباء القطاع خطيرة ومميتة.',
							mark: '0.5'
						},
						{
							q: 'عند تغليف سلك كهربائي متآكل نضع شريطاً لاصقاً عازلاً بعد فصل القابس عن الكهرباء.',
							a: 'صحيح',
							c: 'العبارة صحيحة.',
							mark: '0.5'
						}
					]
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: chosen.rule
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Shadows, Earth Rotation & Seasons (2.5 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const shadowsEarthMotionsTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4ap_t3_shadows_earth_motions',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'geology_earth',
	titleAr: 'الظل والنور، ودوران الأرض حول نفسها وحول الشمس',
	curriculumLessonId: 'sci_lesson_4ap_t3_shadow_earth_rotation_seasons',
	defaultPoints: 2.5,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const isRotation = seed % 2 === 0;
		const svg = buildEarthMotionSvg4ap(isRotation ? 'rotation' : 'revolution');
		const imageUrl = saveSciencesSvgAsset(`sci_4ap_t3_earth_s${seed}`, svg);

		const correctAnswer = isRotation
			? 'تدور الأرض حول نفسها خلال 24 ساعة فينتج تعاقب الليل والنهار'
			: 'تدور الأرض حول الشمس خلال 365 يوماً وربع اليوم فينتج تعاقب الفصول الأربعة';

		const mcq = buildUniqueMcqOptions(
			correctAnswer,
			[
				{
					text: isRotation
						? 'تدور الأرض حول نفسها خلال 365 يوماً فينتج تعاقب الفصول الأربعة'
						: 'تدور الأرض حول الشمس خلال 24 ساعة فينتج تعاقب الليل والنهار',
					diagnosticFeedback: 'انتبه للخلط بين الحركتين! حول نفسها (24 ساعة ← ليل ونهار)، حول الشمس (سنة ← فصول أربعة).'
				},
				{
					text: 'تدور الشمس حول الأرض كل 24 ساعة بينما تبقى الأرض ثابتة تماماً',
					diagnosticFeedback: 'خطأ! الأرض هي التي تدور حول نفسها، مما يجعلنا نرى الشمس تتحرك ظاهرياً فقط.'
				},
				{
					text: 'يبقى طول ظل الأجسام العاتمة ثابتاً لا يتغير من الصباح إلى المساء',
					diagnosticFeedback: 'يتغير طول الظل واتجاهه خلال النهار: طويل صباحاً ومساءً وقصير عند منتصف النهار.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `تأمّل الوثيقة الفلكية المقابلة التي تمثّل إحدى حركتي كوكب الأرض. أيّ تفسير علمي **صحيح** للظاهرة الممثَّلة؟`,
			questionTextAr: `ما التفسير العلمي الصحيح لحركة الأرض في الرسم؟`,
			imageUrl,
			imageCaption: isRotation ? 'دوران الأرض حول محورها' : 'مدار الأرض حول الشمس',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `**${correctAnswer}**. كما يتشكل الظل خلف الأجسام العاتمة ويتغير طوله من الصباح إلى المساء بسبب دوران الأرض حول نفسها.`
		};

		const hints: [string, string, string] = [
			'انظر هل الرسم يظهر الأرض مقسمة إلى نهار وليل أم تدور في مدار بيضوي حول الشمس.',
			'دوران الأرض حول نفسها مدته 24 ساعة ويعطي الليل والنهار.',
			'دوران الأرض حول الشمس مدته 365 يوماً وربع ويعطي الفصول الأربعة.'
		];

		const solutionStepsAr = [
			`الحركة الممثلة هي: ${isRotation ? 'دوران الأرض حول نفسها' : 'دوران الأرض حول الشمس'}.`,
			`المدة الزمنية: ${isRotation ? '$24$ ساعة (يوم واحد)' : '$365$ يوماً وربع اليوم (سنة)'}.`,
			`النتيجة الفلكية: **${isRotation ? 'تعاقب الليل والنهار' : 'تعاقب الفصول الأربعة'}**.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 2.5,
			instruction: 'لاحظ الرسم الفلكي المقابل لحركة الأرض، ثم أجب عن الأسئلة الآتية:',
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: '1) سمِّ حركة الأرض الممثلة في الرسم، وحدّد مدتها الزمنية والظاهرة الناتجة عنها.',
							answer: `1) *${correctAnswer}*.`,
							mark: '1.5'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'حركة الأرض أمام الشمس'
						}
					]
				},
				{
					type: 'text',
					content: '2) وقف تلميذ في ساحة المدرسة صباحاً فتشكل له ظلّ طويل. كيف يتشكل الظل؟ ومتى يكون ظلّ التلميذ أقصر ما يمكن؟',
					answer: '2) يتشكل الظل لأن جسم التلميذ *عاتم* يعترض أشعة الضوء فيتشكل الظل في الجهة المقابلة للشمس. ويكون الظل أقصر ما يمكن عند *منتصف النهار (الزوال)*.',
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't3',
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
// 5. Integration Situation: Rainy Winter Day at Home (4 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationHomeNatureTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4ap_t3_integration_home_nature',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: يوم شتوي ماطر (دورة الماء، الأمن الكهربائي، والفصول)',
	curriculumLessonId: 'sci_lesson_4ap_t3_shadow_earth_rotation_seasons',
	defaultPoints: 4,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const familyCity = rng.pick(['تيزي وزو', 'جيجل', 'قسنطينة', 'سطيف']);
		const svg = svgBioFlowchart({
			title: 'ظواهر طبيعية وقواعد أمنية في فصل الشتاء',
			orientation: 'horizontal',
			width: 470,
			steps: [
				{ label: 'فصل الشتاء', sublabel: 'دوران الأرض حول الشمس', color: '#7c3aed', bg: '#f5f3ff' },
				{ label: 'دورة الماء', sublabel: 'تكاثف السحب والأمطار', color: '#0284c7', bg: '#f0f9ff' },
				{ label: 'انقطاع النور', sublabel: 'مصباح ببطارية آمنة', color: '#d97706', bg: '#fffbeb' },
				{ label: 'الأمن الكهربائي', sublabel: 'إبعاد الماء وعزل الأسلاك', color: '#16a34a', bg: '#f0fdf4' }
			]
		});
		const imageUrl = saveSciencesSvgAsset(`sci_4ap_t3_integ_winter_s${seed}`, svg);

		const correctAnswer =
			'تكاثف بخار الماء سحباً ثم تساقطه مطراً، واستعمال مصباح البطارية الآمن مع إبعاد الماء عن المآخذ';

		const mcq = buildUniqueMcqOptions(
			correctAnswer,
			[
				{
					text: 'تتجمد السحب عند 100 درجة مئوية، ونلمس القاطع الكهربائي بأيدٍ مبللة بالمطر',
					diagnosticFeedback: 'خطأ! التجمد عند 0°C والغليان عند 100°C، ولمس الكهرباء بأيدٍ مبللة خطير جداً.'
				},
				{
					text: 'يحدث فصل الشتاء بسبب دوران الأرض حول نفسها خلال 24 ساعة فقط',
					diagnosticFeedback: 'الشتاء وبقية الفصول الأربعة تنتج عن دوران الأرض حول الشمس خلال سنة مع ميل محورها.'
				},
				{
					text: 'الماء السائل عازل كهربائي لذلك لا خطر من وصوله للأسلاك الكهربائية العارية',
					diagnosticFeedback: 'ماء المطر والصنبور ناقل للكهرباء ويسبب خطراً كبيراً مع الأسلاك العارية.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `في أمسية شتوية باردة وماطرة بولاية **${familyCity}**، غربت الشمس مبكراً (نهار قصير) وتساقطت الأمطار الغزيرة، ثم انقطعت كهرباء المنزل فأشعل الأب مصباحاً يشتغل ببطارية. أيّ تحليل علمي يجمع بين دورة الماء والأمن الكهربائي بشكل صحيح؟`,
			questionTextAr: `ما التحليل العلمي الصحيح لموقف الأمسية الشتوية؟`,
			imageUrl,
			imageCaption: 'الربط بين الفصول ودورة الماء والأمن الكهربائي',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `في الشتاء (الناتج عن دوران الأرض حول الشمس) يتكاثف بخار الماء مكوناً السحب ثم يتساقط مطراً، وعند انقطاع التيار نستعمل البطارية الآمنة ونحرص على إبعاد الماء عن الكهرباء.`
		};

		const hints: [string, string, string] = [
			'اربط تساقط المطر بمراحل دورة الماء (تبخر ← تكاثف ← تساقط).',
			'اربط فصل الشتاء وقصر النهار بدوران الأرض حول الشمس (سنة كاملة).',
			'تذكّر الفرق بين أمان البطارية وخطورة كهرباء القطاع قرب الماء.'
		];

		const solutionStepsAr = [
			'فصل الشتاء وقصر النهار ناتجان عن دوران الأرض حول الشمس وميل محورها.',
			'المطر يتكون بعد تبخر الماء وتكاثفه في طبقات الجو الباردة.',
			'مصباح البطارية آمن، بينما كهرباء القطاع خطيرة جداً خاصة مع البلل والماء.'
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 4,
			instruction: `في يوم شتوي ممطر بولاية ${familyCity}، لاحظ التلميذ حمزة أن النهار قصير وأن الثلوج غطّت قمم الجبال بينما تساقطت الأمطار في المدينة. وعند عودته مبللاً إلى المنزل، أراد تشغيل المدفأة الكهربائية ويداه مبللتان، كما لاحظ سلكاً عارياً خلفها. استعن بالسند المقابل وأجب:`,
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: '1) فسّر سبب حلول *فصل الشتاء* وقصر النهار، واذكر التحول الذي حوّل الماء السائل إلى ثلج صلب في أعالي الجبال.',
							answer: '1) يحل فصل الشتاء بسبب *دوران الأرض حول الشمس* خلال سنة مع ميل محورها. التحول هو *التجمد* (عند درجة 0°C).',
							mark: '1.5'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'السند: الفصول ودورة الماء والأمن الكهربائي'
						}
					]
				},
				{
					type: 'text',
					content: '2) اذكر حالتي الماء المذكورتين في النص (الثلج والمطر)، ورتّب المراحل الثلاث الأولى من *دورة الماء* التي أدت إلى تساقط المطر.',
					answer: '2) الثلج: *حالة صلبة*، المطر: *حالة سائلة*. المراحل: *التبخر ← التكاثف (تشكل السحب) ← التساقط*.',
					mark: '1'
				},
				{
					type: 'text',
					content: '3) حدّد *خطرين كهربائيين* في تصرف حمزة داخل المنزل، واقترح لكل خطر *قاعدة أمن كهربائي* مناسبة.',
					answer: '3) الخطر 1: *لمس المدفأة بيدين مبللتين* (الماء ناقل) ← الحل: *تجفيف اليدين جيداً قبل لمس أي جهاز*. الخطر 2: *السلك العاري* ← الحل: *قطع القاطع الرئيسي وتغليف السلك بشريط عازل أو تغييره بواسطة الكبار*.',
					mark: '1.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't3',
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

export const SCIENCES_TEMPLATES_4AP_T3: SciencesParameterizedTemplate[] = [
	waterChangesCycleTemplate,
	circuitConductorsTemplate,
	electricalSafetyTemplate,
	shadowsEarthMotionsTemplate,
	integrationHomeNatureTemplate
];
