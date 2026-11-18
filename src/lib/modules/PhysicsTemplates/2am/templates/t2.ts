import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import {
	savePhysicsSvgAsset,
	svgPhysicsCurvePlot,
	wrapPhysicsSvg
} from '../../svg-physics';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';

function svgTrainReference2am(passengerName: string, observerName: string, vehicleName: string): string {
	const body = `
		<text x="180" y="18" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">نسبية الحركة والسكون</text>
		<line x1="15" y1="126" x2="345" y2="126" stroke="#334155" stroke-width="2.2"/>
		<rect x="28" y="58" width="185" height="56" rx="8" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.6"/>
		<circle cx="62" cy="119" r="7" fill="#1e293b"/><circle cx="178" cy="119" r="7" fill="#1e293b"/>
		<rect x="46" y="70" width="44" height="24" rx="3" fill="#fff" stroke="#60a5fa"/>
		<rect x="108" y="70" width="44" height="24" rx="3" fill="#fff" stroke="#60a5fa"/>
		<circle cx="68" cy="82" r="7" fill="#f59e0b"/>
		<text x="68" y="48" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">${passengerName}</text>
		<text x="155" y="48" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">${vehicleName} ──►</text>
		<circle cx="272" cy="95" r="7" fill="#16a34a"/>
		<line x1="272" y1="102" x2="272" y2="126" stroke="#16a34a" stroke-width="2.2"/>
		<text x="272" y="82" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">${observerName}</text>
		<rect x="315" y="92" width="8" height="34" fill="#78350f"/>
		<circle cx="319" cy="78" r="16" fill="#22c55e" stroke="#15803d"/>
		<text x="319" y="54" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#166534">شجرة</text>
	`;
	return wrapPhysicsSvg(360, 145, body);
}

function svgWheelTrajectory2am(): string {
	const body = `
		<text x="180" y="18" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">مسار النقطة A (المركز) والنقطة B (الحافة)</text>
		<line x1="20" y1="130" x2="340" y2="130" stroke="#334155" stroke-width="2"/>
		<circle cx="110" cy="86" r="42" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2"/>
		<circle cx="110" cy="86" r="4.5" fill="#dc2626"/>
		<text x="110" y="76" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">A</text>
		<circle cx="152" cy="86" r="4.5" fill="#16a34a"/>
		<text x="163" y="90" font-size="11" font-weight="bold" fill="#16a34a">B</text>
		<line x1="110" y1="86" x2="310" y2="86" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="5,3"/>
		<path d="M152 86 Q200 32 250 128 Q295 45 330 86" fill="none" stroke="#16a34a" stroke-width="1.8" stroke-dasharray="5,3"/>
		<text x="235" y="150" text-anchor="middle" font-size="10.5" fill="#334155">المساران مرئيان بالنسبة لمرجع الطريق</text>
	`;
	return wrapPhysicsSvg(360, 162, body);
}

function svgTransmissionSystem2am(kind: 'gears3' | 'belt_crossed' | 'belt_straight' | 'chain'): string {
	let inner = '';
	if (kind === 'gears3') {
		inner = `
			<text x="180" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">نقل الحركة بالتعشيق (3 مسننات)</text>
			<circle cx="95" cy="88" r="30" fill="#dbeafe" stroke="#1d4ed8" stroke-width="3" stroke-dasharray="6,3"/>
			<circle cx="162" cy="88" r="24" fill="#fef3c7" stroke="#d97706" stroke-width="3" stroke-dasharray="5,3"/>
			<circle cx="232" cy="88" r="32" fill="#dcfce7" stroke="#16a34a" stroke-width="3" stroke-dasharray="6,3"/>
			<text x="95" y="92" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e3a8a">A (قائد)</text>
			<text x="162" y="92" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e">B (وسيط)</text>
			<text x="232" y="92" text-anchor="middle" font-size="12" font-weight="bold" fill="#166534">C (مقتاد)</text>
			<path d="M80 48 A22 22 0 0 1 112 48" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#tArr)"/>
			<text x="180" y="142" text-anchor="middle" font-size="10.5" fill="#475569">يدور القائد A في جهة عقارب الساعة</text>
		`;
	} else if (kind === 'belt_crossed') {
		inner = `
			<text x="180" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">نقل الحركة بالسيور (ربط متصالب)</text>
			<circle cx="100" cy="86" r="28" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
			<circle cx="260" cy="86" r="28" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
			<line x1="100" y1="58" x2="260" y2="114" stroke="#0f172a" stroke-width="2.2"/>
			<line x1="100" y1="114" x2="260" y2="58" stroke="#0f172a" stroke-width="2.2"/>
			<text x="100" y="90" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">A (قائد)</text>
			<text x="260" y="90" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#166534">B (مقتاد)</text>
			<path d="M84 48 A22 22 0 0 1 116 48" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#tArr)"/>
			<text x="180" y="142" text-anchor="middle" font-size="10.5" fill="#475569">البكرة A تدور مع عقارب الساعة</text>
		`;
	} else if (kind === 'belt_straight') {
		inner = `
			<text x="180" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">نقل الحركة بالسيور (ربط مستقيم)</text>
			<circle cx="100" cy="86" r="28" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
			<circle cx="260" cy="86" r="22" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
			<line x1="100" y1="58" x2="260" y2="64" stroke="#0f172a" stroke-width="2.2"/>
			<line x1="100" y1="114" x2="260" y2="108" stroke="#0f172a" stroke-width="2.2"/>
			<text x="100" y="90" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">A (قائد)</text>
			<text x="260" y="90" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534">B (مقتاد)</text>
			<path d="M84 48 A22 22 0 0 1 116 48" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#tArr)"/>
			<text x="180" y="142" text-anchor="middle" font-size="10.5" fill="#475569">ربط مستقيم — البكرة A تدور مع عقارب الساعة</text>
		`;
	} else {
		inner = `
			<text x="180" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">نقل الحركة بالسلسلة (دراجة هوائية)</text>
			<circle cx="105" cy="86" r="28" fill="#fef08a" stroke="#ca8a04" stroke-width="2.6" stroke-dasharray="5,2"/>
			<circle cx="255" cy="86" r="18" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.6" stroke-dasharray="4,2"/>
			<line x1="105" y1="58" x2="255" y2="68" stroke="#334155" stroke-width="2.4" stroke-dasharray="4,2"/>
			<line x1="105" y1="114" x2="255" y2="104" stroke="#334155" stroke-width="2.4" stroke-dasharray="4,2"/>
			<text x="105" y="90" text-anchor="middle" font-size="11" font-weight="bold" fill="#854d0e">الدواسة (قائد)</text>
			<text x="255" y="124" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">العجلة (مقتاد)</text>
		`;
	}
	const body = `<defs><marker id="tArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#dc2626"/></marker></defs>${inner}`;
	return wrapPhysicsSvg(360, 155, body);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Motion, Rest & Reference Frame
// ═══════════════════════════════════════════════════════════════════════════════
const motionRestReferenceTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2am_t2_motion_rest_reference',
	grade: '2am',
	trimesterId: 't2',
	domain: 'mechanics',
	titleAr: 'الحركة والسكون، المرجع، ونسبية الحركة',
	curriculumLessonId: 'phy_lesson_2am_t2_motion_rest_reference_frame',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scenarios = [
			{ passenger: 'أمين', companion: 'حقيبته', observer: 'مراد', vehicle: 'الحافلة', fixedObj: 'شجرة' },
			{ passenger: 'ليلى', companion: 'كتابها', observer: 'سامي', vehicle: 'القطار', fixedObj: 'عمود الإنارة' },
			{ passenger: 'يوسف', companion: 'أخيه الجالس بجانبه', observer: 'الشرطي', vehicle: 'السيارة', fixedObj: 'إشارة المرور' }
		];
		const sc = rng.pick(scenarios);
		const svg = svgTrainReference2am(sc.passenger, sc.observer, sc.vehicle);
		const imageUrl = savePhysicsSvgAsset(`phy_2am_t2_ref_${difficulty}_s${seed}`, svg);

		const askTreeRelPassenger = difficulty === 'hard';
		const correctText = askTreeRelPassenger
			? `في حالة حركة لأن موضع ال${sc.fixedObj} يتغير بالنسبة لـ${sc.passenger}`
			: `ساكن بالنسبة لـ${sc.vehicle} ومتحرك بالنسبة لـ${sc.observer}`;

		const mcq = buildUniqueMcqOptions(
			correctText,
			askTreeRelPassenger
				? [
						{
							text: `في حالة سكون دائماً لأن ال${sc.fixedObj} مغروسة في الأرض`,
							diagnosticFeedback: 'الأشجار ساكنة بالنسبة للأرض فقط، لكنها متحركة بالنسبة لمسافر يبتعد عنها!'
						},
						{
							text: `ساكنة بالنسبة لـ${sc.passenger} ومتحركة بالنسبة لـ${sc.observer}`,
							diagnosticFeedback: 'العكس تماماً: هي ساكنة بالنسبة لـ' + sc.observer + ' الواقف على الأرض ومتحركة بالنسبة لـ' + sc.passenger + '.'
						},
						{
							text: 'لا يمكن دراسة حالة جسم ثابت بالنسبة للأرض',
							diagnosticFeedback: 'يمكن دراسة الحالة الحركية لأي جسم بمجرد اختيار المرجع.'
						}
				  ]
				: [
						{
							text: `متحرك بالنسبة لـ${sc.vehicle} وساكن بالنسبة لـ${sc.observer}`,
							diagnosticFeedback: `راجع المرجع: ${sc.passenger} جالس لا يغير موضعه داخل ${sc.vehicle}!`
						},
						{
							text: 'متحرك بالنسبة للجميع ولا يوجد أي مرجع يكون فيه ساكناً',
							diagnosticFeedback: 'الحركة والسكون مفهومان نسبيان؛ هو ساكن بالنسبة لمقعده!'
						},
						{
							text: 'ساكن بالنسبة للجميع لأنّه جالس في مقعده',
							diagnosticFeedback: `جلوسه لا يمنعه من تغيير موضعه بالنسبة لـ${sc.observer} الواقف على الرصيف.`
						}
				  ],
			rng
		);

		const qText = askTreeRelPassenger
			? `يركب ${sc.passenger} داخل ${sc.vehicle} تسير على طريق مستقيم أمام ${sc.fixedObj} و${sc.observer} الواقف على الرصيف. ما الحالة الحركية لـ${sc.fixedObj} بالنسبة لـ${sc.passenger}؟`
			: `يجلس ${sc.passenger} داخل ${sc.vehicle} تسير على طريق مستقيم بينما يقف ${sc.observer} على الرصيف. صف الحالة الحركية لـ${sc.passenger}.`;

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'نسبية الحركة والسكون',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: askTreeRelPassenger
					? `يتغير موضع ال${sc.fixedObj} بالنسبة لـ${sc.passenger} مع مرور الزمن، لذا فهي في حالة حركة بالنسبة له.`
					: `لا يتغير موضع ${sc.passenger} بالنسبة لـ${sc.vehicle} فهو ساكن بالنسبة لها، بينما يتغير موضعه بالنسبة لـ${sc.observer} فهو متحرك بالنسبة له.`
			},
			sujetExercise: {
				points: 6,
				instruction: `يسافر ${sc.passenger} ومعه ${sc.companion} على متن ${sc.vehicle} تسير على طريق مستقيم أمام ${sc.observer} الواقف بجانب ${sc.fixedObj} على الرصيف.`,
				content: [
					{
						type: 'columns',
						widths: ['1.4fr', '1fr'],
						children: [
							{
								type: 'text',
								content: '1) عرّف المرجع، واذكر متى نقول عن جسم إنه في حالة حركة ومتى يكون في حالة سكون.',
								answer: '1) المرجع هو جسم صلب ننسب إليه دراسة الحركة. يكون الجسم متحركاً إذا تغير موضعه بالنسبة للمرجع مع مرور الزمن، وساكناً إذا لم يتغير موضعه بالنسبة له.',
								mark: '1.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'المشهد المرجعي'
							}
						]
					},
					{
						type: 'table',
						headers: ['الجسم المدروس', `المرجع: ${sc.passenger}`, `المرجع: ${sc.observer}`],
						cells: [],
						rows: [
							[
								sc.companion,
								{ content: '................', answer: 'ساكن' },
								{ content: '................', answer: 'متحرك' }
							],
							[
								sc.vehicle,
								{ content: '................', answer: 'ساكن' },
								{ content: '................', answer: 'متحرك' }
							],
							[
								sc.fixedObj,
								{ content: '................', answer: 'متحرك' },
								{ content: '................', answer: 'ساكن' }
							]
						],
						headerBackground: true,
						borders: 'grid',
						width: 'full'
					},
					{
						type: 'text',
						content: `2) أكمل الجدول أعلاه بتحديد الحالة الحركية (ساكن / متحرك) لكل جسم بالنسبة للمرجعين ${sc.passenger} و${sc.observer}.`,
						answer: `2) الجدول مكتمل أعلاه: بالنسبة لـ${sc.passenger} كل من ${sc.companion} و${sc.vehicle} ساكن بينما ${sc.fixedObj} متحرك؛ والعكس بالنسبة لـ${sc.observer}.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `3) هل يمكن لـ${sc.passenger} أن يكون متحركاً وساكناً في الوقت نفسه؟ ماذا تستنتج عن طبيعة الحركة والسكون؟`,
						answer: `3) نعم، ${sc.passenger} ساكن بالنسبة لـ${sc.vehicle} ومتحرك بالنسبة لـ${sc.observer} في اللحظة نفسها. نستنتج أن الحركة والسكون مفهومان نسبيان يتعلقان بالمرجع المختار.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'اسأل نفسك: هل تتغير المسافة أو الموضع بين الجسم المدروس والمرجع مع مرور الزمن؟',
				`بالنسبة لـ${sc.passenger}، ${sc.fixedObj} تبتعد أو تقترب منه فتبدو متحركة!`,
				'يمكن للجسم نفسه أن يكون ساكناً بالنسبة لمرجع ومتحركاً بالنسبة لمرجع آخر.'
			],
			solutionStepsAr: [
				'الحركة والسكون يتحددان بتغير الموضع أو ثباته بالنسبة لمرجع معين.',
				`${sc.passenger} و${sc.companion} ساكنان بالنسبة لـ${sc.vehicle} ومتحركان بالنسبة لـ${sc.observer}.`,
				'نستنتج أن الحركة والسكون نسبيان.'
			],
			finalAnswer: correctText
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Trajectory, Relativity of Trajectory, Translation vs Rotation
// ═══════════════════════════════════════════════════════════════════════════════
const trajectoryTranslationRotationTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2am_t2_trajectory_translation_rotation',
	grade: '2am',
	trimesterId: 't2',
	domain: 'mechanics',
	titleAr: 'المسار ونسبية المسار والحركة الانسحابية والدورانية',
	curriculumLessonId: 'phy_lesson_2am_t2_trajectory_translation_rotation',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const svg = svgWheelTrajectory2am();
		const imageUrl = savePhysicsSvgAsset(`phy_2am_t2_traj_${difficulty}_s${seed}`, svg);

		const examplesPool = [
			{ obj: 'مصعد يتحرك شاقولياً نحو الأعلى', type: 'انسحابية مستقيمة' },
			{ obj: 'مقصورة العجلة الكبيرة في مدينة الألعاب', type: 'انسحابية دائرية' },
			{ obj: 'عقرب الثواني في ساعة الحائط', type: 'دورانية' },
			{ obj: 'سيارة تسير في طريق منعرج', type: 'انسحابية منحنية' }
		];
		const ex = rng.pick(examplesPool);

		const askRelTraj = difficulty === 'easy';
		const correctText = askRelTraj
			? 'مسار B دائري بالنسبة لراكب الدراجة ومنحني بالنسبة للطريق'
			: `حركة ${ex.type}`;

		const mcq = buildUniqueMcqOptions(
			correctText,
			askRelTraj
				? [
						{
							text: 'مسار B دائري بالنسبة لجميع المراجع دائماً',
							diagnosticFeedback: 'المسار نسبي! العجلة تدور وتتقدم في آنٍ واحد بالنسبة للطريق.'
						},
						{
							text: 'مسار B مستقيم بالنسبة لراكب الدراجة ودائري بالنسبة للطريق',
							diagnosticFeedback: 'الراكب يرى حافة العجلة تدور حول محورها في دائرة!'
						},
						{
							text: 'النقطة B ساكنة بالنسبة للطريق',
							diagnosticFeedback: 'الموضع يتغير باستمرار فالنقطة B متحركة.'
						}
				  ]
				: [
						{
							text: ex.type === 'دورانية' ? 'حركة انسحابية دائرية' : 'حركة دورانية',
							diagnosticFeedback: 'تذكر الفرق: في الانسحابية تبقى كل قطعة من الجسم موازية لنفسها ومسارات النقاط متطابقة، أما في الدورانية فيدور الجسم حول محور.'
						},
						{
							text: ex.type === 'انسحابية مستقيمة' ? 'حركة انسحابية منحنية' : 'حركة انسحابية مستقيمة',
							diagnosticFeedback: 'لاحظ شكل مسارات نقاط الجسم عند حركته.'
						},
						{
							text: 'حالة سكون بالنسبة للأرض',
							diagnosticFeedback: 'الجسم يغير موضعه بالنسبة للأرض فهو متحرك.'
						}
				  ],
			rng
		);

		const qText = askRelTraj
			? 'تتدحرج عجلة دراجة على طريق أفقي مستقيم. ما شكل مسار النقطة $B$ الواقعة على حافة العجلة؟'
			: `ما نوع حركة الجسم التالي بالنسبة للأرض: **${ex.obj}**؟`;

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'نسبية مسار نقطة على عجلة متحركة',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: askRelTraj
					? 'بالنسبة للراكب مسار النقطة B دائري، أما بالنسبة للطريق فيكون مسارها منحنياً؛ فالمسار نسبي يتعلق بالمرجع.'
					: `حركة "${ex.obj}" هي ${correctText}.`
			},
			sujetExercise: {
				points: 6,
				instruction: 'أثناء سير دراجة هوائية على طريق أفقي مستقيم، نراقب حركة نقطتين من عجلتها: المركز $A$ ونقطة $B$ على الحافة (انظر الشكل).',
				content: [
					{
						type: 'columns',
						widths: ['1.4fr', '1fr'],
						children: [
							{
								type: 'text',
								content: '1) عرّف المسار، ثم حدّد شكل مسار كل من النقطتين $A$ و $B$ بالنسبة لراكب الدراجة ثم بالنسبة لمراقب واقف على الطريق.',
								answer: '1) المسار هو الخط الواصل بين المواضع المتتالية التي يشغلها المتحرك.\n\n- بالنسبة للراكب: $A$ ساكنة، ومسار $B$ دائري.\n\n- بالنسبة للمراقب على الطريق: مسار $A$ مستقيم، ومسار $B$ منحني.',
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'مسارا النقطتين A و B'
							}
						]
					},
					{
						type: 'text',
						content: '2) ماذا تستنتج بخصوص شكل المسار عندما يتغير المرجع؟ ثم اشرح الفرق بين الحركة الانسحابية والحركة الدورانية.',
						answer: '2) نستنتج أن المسار نسبي يتغير شكله بتغير المرجع.\n\nالفرق: في الحركة الانسحابية ترسم جميع نقاط الجسم مسارات متطابقة (مستقيمة أو منحنية أو دائرية)، أما في الحركة الدورانية فترسم النقاط دوائر غير متطابقة حول محور دوران ثابت.',
						mark: '2'
					},
					{
						type: 'true_false',
						items: [
							{
								q: 'حركة عقارب الساعة بالنسبة لميناها هي حركة انسحابية دائرية.',
								a: 'خاطئ',
								c: 'حركة دورانية لأنها تدور حول محور ثابت ونقاطها ترسم دوائر غير متطابقة.',
								mark: '1'
							},
							{
								q: `حركة (${ex.obj}) هي ${ex.type}.`,
								a: 'صحيح',
								c: 'صحيح.',
								mark: '1'
							}
						]
					}
				]
			},
			hints: [
				'المسار نسبي يتغير بتغير المرجع المختار.',
				'في الحركة الانسحابية تبقى كل قطعة مستقيمة من الجسم موازية لنفسها.',
				'في الحركة الدورانية يدور الجسم حول محور ثابت فتختلف أنصاف أقطار الدوائر.'
			],
			solutionStepsAr: [
				'بالنسبة للراكب $A$ ساكنة و$B$ مسارها دائري؛ بالنسبة للطريق $A$ مسارها مستقيم و$B$ مسارها منحني.',
				'المسار نسبي بتغير المرجع.',
				'الحركة الانسحابية تحفظ توازي القطع وتطابق المسارات، بينما الدورانية تدور حول محور.'
			],
			finalAnswer: correctText
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Average Speed (v = d / t), Unit Conversions & Speed-Time Graph v = f(t)
// ═══════════════════════════════════════════════════════════════════════════════
const speedVelocityDiagramsTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2am_t2_speed_velocity_diagrams',
	grade: '2am',
	trimesterId: 't2',
	domain: 'mechanics',
	titleAr: 'السرعة المتوسطة وتحويل الوحدات وقراءة مخطط السرعة',
	curriculumLessonId: 'phy_lesson_2am_t2_speed_velocity_diagrams',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const vMs = difficulty === 'easy' ? rng.pick([10, 15, 20, 25]) : rng.pick([12, 15, 20, 25, 30]);
		const vKmh = roundTo(vMs * 3.6, 1);
		const t1 = rng.pick([10, 15, 20]);
		const t2 = t1 + rng.pick([20, 30, 40]);
		const t3 = t2 + rng.pick([10, 15, 20]);
		const tMax = t3 + 10;

		const uniformDuration = t2 - t1;
		const dUniform = vMs * uniformDuration;

		const speedFn = (t: number): number => {
			if (t <= t1) return (vMs / t1) * t;
			if (t <= t2) return vMs;
			if (t <= t3) return vMs * (1 - (t - t2) / (t3 - t2));
			return 0;
		};

		const svg = svgPhysicsCurvePlot({
			xMax: tMax,
			yMax: vMs + 5,
			xLabel: 't (s)',
			yLabel: 'v (m/s)',
			xStep: 10,
			yStep: 5,
			title: 'مخطط سرعة سيارة v = f(t)',
			curves: [{ fn: speedFn, color: '#2563eb', strokeWidth: 2.5 }],
			dashedGuides: [
				{ x1: t1, y1: 0, x2: t1, y2: vMs, color: '#94a3b8' },
				{ x1: t2, y1: 0, x2: t2, y2: vMs, color: '#94a3b8' },
				{ x1: 0, y1: vMs, x2: t1, y2: vMs, color: '#dc2626' }
			],
			points: [
				{ x: t1, y: vMs, label: `(${t1}, ${vMs})`, color: '#16a34a' },
				{ x: t2, y: vMs, label: `(${t2}, ${vMs})`, color: '#2563eb' }
			]
		});
		const imageUrl = savePhysicsSvgAsset(`phy_2am_t2_speed_${difficulty}_s${seed}`, svg);

		const askDist = difficulty === 'hard';
		const correctText = askDist ? `$${dUniform}\\text{ m}$` : `$${vKmh}\\text{ km/h}$`;
		const distractors = askDist
			? [
					{
						text: `$${vMs * t2}\\text{ m}$`,
						diagnosticFeedback: `انتبه: المدة الزمنية للمرحلة المنتظمة هي $t_2 - t_1 = ${t2} - ${t1} = ${uniformDuration}\\text{ s}$ وليس ${t2}\\text{ s}!`
					},
					{
						text: `$${roundTo(dUniform / 2, 1)}\\text{ m}$`,
						diagnosticFeedback: 'في المرحلة المنتظمة نطبق $d = v \\times \\Delta t$ مباشرة.'
					},
					{
						text: `$${vMs + uniformDuration}\\text{ m}$`,
						diagnosticFeedback: 'المسافة تساوي جداء السرعة في الزمن، لا مجموعهما!'
					}
			  ]
			: [
					{
						text: `$${roundTo(vMs / 3.6, 2)}\\text{ km/h}$`,
						diagnosticFeedback: 'لقد قسمت على $3.6$ بدلاً من الضرب! تذكر: $1\\text{ m/s} = 3.6\\text{ km/h}$.'
					},
					{
						text: `$${vMs * 60}\\text{ km/h}$`,
						diagnosticFeedback: 'لا تضرب في $60$ فقط؛ عامل التحويل بين $\\text{m/s}$ و $\\text{km/h}$ هو $3.6$.'
					},
					{
						text: `$${vKmh + 10}\\text{ km/h}$`,
						diagnosticFeedback: `تحقق من الحساب: $${vMs} \\times 3.6 = ${vKmh}$.`
					}
			  ];

		const mcq = buildUniqueMcqOptions(correctText, distractors, rng);
		const qText = askDist
			? `يمثل المخطط تغيرات سرعة سيارة بدلالة الزمن. احسب المسافة التي قطعتها السيارة خلال مرحلة **الحركة المنتظمة** (بين $t = ${t1}\\text{ s}$ و $t = ${t2}\\text{ s}$).`
			: `تتحرك سيارة خلال مرحلة الحركة المنتظمة في المخطط بسرعة ثابتة قدرها $${vMs}\\text{ m/s}$. ما قيمة هذه السرعة بوحدة $\\text{km/h}$؟`;

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'مخطط السرعة بدلالة الزمن',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: askDist
					? `المدة في المرحلة المنتظمة: $\\Delta t = ${t2} - ${t1} = ${uniformDuration}\\text{ s}$، والسرعة ثابتة $v = ${vMs}\\text{ m/s}$. إذن $d = v \\times \\Delta t = ${vMs} \\times ${uniformDuration} = ${dUniform}\\text{ m}$.`
					: `للتحويل من $\\text{m/s}$ إلى $\\text{km/h}$ نضرب في $3.6$: $v = ${vMs} \\times 3.6 = ${vKmh}\\text{ km/h}$.`
			},
			sujetExercise: {
				points: 6,
				instruction: 'يمثل المنحنى البياني المقابل تغيرات سرعة سيارة تسير على طريق مستقيم بدلالة الزمن $v = f(t)$.',
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) حدّد مراحل الحركة وطبيعتها انطلاقاً من المخطط:\n\n- من $t = 0$ إلى $t = ${t1}$ ثانية.\n\n- من $t = ${t1}$ إلى $t = ${t2}$ ثانية.\n\n- من $t = ${t2}$ إلى $t = ${t3}$ ثانية.\n\n- بعد $t = ${t3}$ ثانية.`,
								answer: `1) - $[0, ${t1}]$ ث: السرعة تتزايد، إذن حركة متسارعة.\n\n- $[${t1}, ${t2}]$ ث: السرعة ثابتة ($v = ${vMs} "m/s"$)، إذن حركة منتظمة.\n\n- $[${t2}, ${t3}]$ ث: السرعة تتناقص حتى تنعدم، إذن حركة متباطئة.\n\n- بعد $${t3}$ ث: $v = 0$، إذن السيارة في حالة سكون.`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'مخطط السرعة'
							}
						]
					},
					{
						type: 'text',
						content: `2) أ) اقرأ من البيان قيمة السرعة الثابتة خلال المرحلة الثانية بوحدة $"m/s"$، ثم حوّلها إلى وحدة $"km/h"$.\n\nب) احسب المسافة المقطوعة خلال مرحلة الحركة المنتظمة (بين $${t1}$ ث و $${t2}$ ث).`,
						answer: `2) أ) السرعة الثابتة: $v = ${vMs} "m/s"$. بالتحويل: $v = ${vMs} times 3.6 = ${vKmh} "km/h"$.\n\nب) المدة الزمنية: $Delta t = ${t2} - ${t1} = ${uniformDuration}$ ث.\n\nالمسافة: $d = v times Delta t = ${vMs} times ${uniformDuration} = ${dUniform}$ م.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `3) في رحلة أخرى على الطريق السريع، قطعت هذه السيارة مسافة $${vKmh * 2}$ كلم خلال ساعتين ($2 "h"$). احسب سرعتها المتوسطة بوحدة $"km/h"$ ثم بوحدة $"m/s"$.`,
						answer: `3) السرعة المتوسطة: $v = frac(${vKmh * 2}, 2) = ${vKmh} "km/h"$.\n\nبوحدة $"m/s"$: $v = frac(${vKmh}, 3.6) = ${vMs} "m/s"$.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'الخط الصاعد يدل على حركة متسارعة، الأفقي غير المعدوم على حركة منتظمة، والنازل على حركة متباطئة.',
				'للتحويل من m/s إلى km/h نضرب في 3.6، وللعكس نقسم على 3.6.',
				`لحساب المسافة في المرحلة المنتظمة: $d = v \\times (t_2 - t_1)$.`
			],
			solutionStepsAr: [
				`المراحل: متسارعة $[0,${t1}]$، منتظمة $[${t1},${t2}]$، متباطئة $[${t2},${t3}]$، سكون $[${t3},${tMax}]$.`,
				`التحويل: $${vMs} \\times 3.6 = ${vKmh}\\text{ km/h}$.`,
				`المسافة المنتظمة: $d = ${vMs} \\times (${t2} - ${t1}) = ${dUniform}\\text{ m}$.`
			],
			finalAnswer: askDist ? `${dUniform} m` : `${vKmh} km/h`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Motion Transmission (Driver/Driven, 4 Methods, Rotation Direction, Pros/Cons)
// ═══════════════════════════════════════════════════════════════════════════════
const motionTransmissionTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2am_t2_motion_transmission',
	grade: '2am',
	trimesterId: 't2',
	domain: 'mechanics',
	titleAr: 'نقل الحركة: العناصر والطرق وجهة الدوران',
	curriculumLessonId: 'phy_lesson_2am_t2_motion_transmission',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const modes: Array<{
			kind: 'gears3' | 'belt_crossed' | 'belt_straight' | 'chain';
			title: string;
			methodAr: string;
			drivenDir: string;
			advantage: string;
			disadvantage: string;
		}> = [
			{
				kind: 'gears3',
				title: 'التعشيق بثلاثة مسننات',
				methodAr: 'نقل الحركة بالتعشيق',
				drivenDir: 'في نفس جهة القائد (مع عقارب الساعة)',
				advantage: 'لا يحدث انزلاق ودقيق في نقل الحركة',
				disadvantage: 'يحدث ضجيجاً ويتطلب التشحيم المستمر'
			},
			{
				kind: 'belt_crossed',
				title: 'السيور بربط متصالب',
				methodAr: 'نقل الحركة بالسيور (ربط متصالب)',
				drivenDir: 'في عكس جهة القائد (عكس عقارب الساعة)',
				advantage: 'هادئ وينقل الحركة لمسافات متباعدة ويعكس الجهة',
				disadvantage: 'قد ينزلق السير أو يتمدد مع الزمن'
			},
			{
				kind: 'belt_straight',
				title: 'السيور بربط مستقيم',
				methodAr: 'نقل الحركة بالسيور (ربط مستقيم)',
				drivenDir: 'في نفس جهة القائد (مع عقارب الساعة)',
				advantage: 'هادئ وسهل التركيب وينقل لمسافات متباعدة',
				disadvantage: 'إمكانية انزلاق السير أو انقطاعه'
			},
			{
				kind: 'chain',
				title: 'السلاسل المسننة',
				methodAr: 'نقل الحركة بالسلاسل',
				drivenDir: 'في نفس جهة القائد (مع عقارب الساعة)',
				advantage: 'لا ينزلق ويتحمل جهداً كبيراً وينقل لمسافات متباعدة',
				disadvantage: 'يحتاج إلى تشحيم دوري ويصدر بعض الضجيج'
			}
		];

		const chosen =
			difficulty === 'easy'
				? modes[2]
				: difficulty === 'hard'
					? modes[0]
					: rng.pick(modes);
		const svg = svgTransmissionSystem2am(chosen.kind);
		const imageUrl = savePhysicsSvgAsset(`phy_2am_t2_trans_${difficulty}_s${seed}`, svg);

		const correctText = chosen.drivenDir;
		const oppDir = chosen.drivenDir.includes('نفس جهة')
			? 'في عكس جهة القائد (عكس عقارب الساعة)'
			: 'في نفس جهة القائد (مع عقارب الساعة)';

		const mcq = buildUniqueMcqOptions(
			correctText,
			[
				{
					text: oppDir,
					diagnosticFeedback:
						chosen.kind === 'gears3'
							? 'انتبه لوجود مسنن وسيط ثالث (B): القائد يدير الوسيط بالعكس، والوسيط يدير المقتاد في نفس جهة القائد!'
							: chosen.kind === 'belt_crossed'
								? 'الربط المتصالب يعكس جهة دوران البكرة المقتادة مقارنة بالقائدة.'
								: 'الربط المستقيم بالسيور (أو السلسلة) يحافظ على نفس جهة الدوران!'
				},
				{
					text: 'يتوقف العنصر المقتاد عن الدوران',
					diagnosticFeedback: 'التركيبة تنقل الحركة الدورانية من القائد إلى المقتاد.'
				},
				{
					text: 'يدور ذهاباً وإياباً بصورة متناوبة',
					diagnosticFeedback: 'دوران القائد المستمر في جهة واحدة يولد دوراناً مستمراً في جهة محددة.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في تركيبة **${chosen.title}** الموضحة في الشكل، يدور العنصر القائد في جهة عقارب الساعة. في أي جهة يدور العنصر المقتاد؟`,
				questionTextAr: `يدور القائد مع عقارب الساعة في تركيبة ${chosen.title}. كيف يدور المقتاد؟`,
				imageUrl,
				imageCaption: chosen.methodAr,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `في ${chosen.methodAr}، يدور العنصر المقتاد ${chosen.drivenDir}.`
			},
			sujetExercise: {
				points: 6,
				instruction: 'ندرس آلة ميكانيكية تعتمد على نقل الحركة الدورانية كما هو مبين في الشكل المقابل.',
				content: [
					{
						type: 'columns',
						widths: ['1.4fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) سمّ طريقة نقل الحركة الممثلة في الشكل، وحدّد فيها اسم كل من العنصر القائد والعنصر المقتاد.`,
								answer: `1) الطريقة: ${chosen.methodAr}.\n\nالعنصر القائد هو المحرك الأول للحركة (${chosen.kind === 'chain' ? 'مسنن الدواسة' : 'العنصر A'})، والعنصر المقتاد هو المستقبل للحركة (${chosen.kind === 'chain' ? 'مسنن العجلة' : chosen.kind === 'gears3' ? 'المسنن C' : 'البكرة B'}).`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'تركيبة نقل الحركة'
							}
						]
					},
					{
						type: 'text',
						content: `2) إذا دار العنصر القائد في جهة عقارب الساعة، فحدد جهة دوران العنصر المقتاد مع التعليل.${chosen.kind === 'gears3' ? ' (اذكر أولاً جهة دوران المسنن الوسيط B).' : ''}`,
						answer: `2) ${chosen.kind === 'gears3' ? 'المسنن الوسيط B يتعشق مع A فيدور عكس عقارب الساعة، ثم يتعشق C مع B فيدور ' : 'يدور المقتاد '}${chosen.drivenDir}.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) اذكر ميزة واحدة وعيب واحد لهذه الطريقة في نقل الحركة، واذكر طريقة أخرى من طرق نقل الحركة التي درستها.`,
						answer: `3) الميزة: ${chosen.advantage}.\n\nالعيب: ${chosen.disadvantage}.\n\nطريقة أخرى: نقل الحركة بالاحتكاك (أو بالتعشيق / بالسيور / بالسلاسل).`,
						mark: '2'
					}
				]
			},
			hints: [
				'العنصر القائد ينقل الحركة، والعنصر المقتاد يستقبلها.',
				'في التعشيق بين مسننين تنعكس الجهة، وفي السير المتصالب تنعكس الجهة، أما في السير المستقيم والسلسلة فتبقى نفس الجهة.',
				'تذكّر مقارنة الطرق الأربع من حيث الانزلاق والضجيج والتشحيم.'
			],
			solutionStepsAr: [
				`الطريقة: ${chosen.methodAr}.`,
				`يدور المقتاد ${chosen.drivenDir}.`,
				`الميزة: ${chosen.advantage}؛ العيب: ${chosen.disadvantage}.`
			],
			finalAnswer: correctText
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Integration 1: Bicycle Trip (Reference + Trajectory + Chain + Speed Graph)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationT2BicycleTripTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2am_t2_integration_bicycle_trip',
	grade: '2am',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: تحليل حركة دراجة هوائية وسرعتها ونقل حركتها',
	curriculumLessonId: 'phy_lesson_2am_t2_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const vMs = difficulty === 'easy' ? 10 : rng.pick([8, 10, 12, 15]);
		const vKmh = roundTo(vMs * 3.6, 1);
		const tRun = rng.pick([20, 30, 40]);
		const dRun = vMs * tRun;
		const svg = svgTransmissionSystem2am('chain');
		const imageUrl = savePhysicsSvgAsset(`phy_2am_t2_integ1_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$${vKmh}\\text{ km/h}$`,
			[
				{
					text: `$${roundTo(vMs / 3.6, 2)}\\text{ km/h}$`,
					diagnosticFeedback: 'انتبه: للتحويل من $\\text{m/s}$ إلى $\\text{km/h}$ نضرب في $3.6$ لا نقسم!'
				},
				{
					text: `$${vMs}\\text{ km/h}$`,
					diagnosticFeedback: `$${vMs}$ هي السرعة بوحدة $\\text{m/s}$؛ حوّلها بضربها في $3.6$.`
				},
				{
					text: `$${dRun}\\text{ km/h}$`,
					diagnosticFeedback: 'احسب $v = d / t$ أولاً ثم حوّل إلى $\\text{km/h}$.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `سار دراج في مرحلة منتظمة مسافة $${dRun}\\text{ m}$ خلال زمن قدره $${tRun}\\text{ s}$. ما سرعته المتوسطة بوحدة $\\text{km/h}$؟`,
				questionTextAr: `قطع دراج مسافة $${dRun}\\text{ m}$ في $${tRun}\\text{ s}$. ما سرعته بوحدة $\\text{km/h}$؟`,
				imageUrl,
				imageCaption: 'نظام نقل الحركة في الدراجة الهوائية',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نحسب السرعة أولاً بـ $\\text{m/s}$: $v = \\frac{${dRun}}{${tRun}} = ${vMs}\\text{ m/s}$، ثم نحوّل: $${vMs} \\times 3.6 = ${vKmh}\\text{ km/h}$.`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction:
					'شارك تلميذ في سباق مدرسي للدراجات الهوائية على طريق مستقيم أمام مراقب واقف على الرصيف. قطع الدراج مسافة $' +
					dRun +
					'$ متراً خلال مدة زمنية قدرها $' +
					tRun +
					'$ ثانية بسرعة ثابتة.',
				content: [
					{
						type: 'columns',
						widths: ['1.45fr', '1fr'],
						children: [
							{
								type: 'text',
								content: '1) حدّد الحالة الحركية للدراج (ساكن / متحرك) بالنسبة لهيكل الدراجة ثم بالنسبة للمراقب على الرصيف، وحدّد نوع حركة هيكل الدراجة ونوع حركة العجلة بالنسبة لمحورها.',
								answer: '1) الدراج ساكن بالنسبة لهيكل الدراجة ومتحرك بالنسبة للمراقب على الرصيف.\n\nنوع حركة هيكل الدراجة: حركة انسحابية مستقيمة.\n\nنوع حركة العجلة حول محورها: حركة دورانية.',
								mark: '2.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'نقل الحركة في الدراجة'
							}
						]
					},
					{
						type: 'text',
						content: `2) أ) ما طريقة نقل الحركة بين الدواسة والعجلة الخلفية؟ حدّد العنصر القائد والعنصر المقتاد.\n\nب) إذا دارت الدواسة في جهة عقارب الساعة، فكيف تدور العجلة الخلفية؟ واذكر ميزتين لهذه الطريقة.`,
						answer: `2) أ) طريقة نقل الحركة هي السلاسل المسننة. القائد: مسنن الدواسة؛ المقتاد: مسنن العجلة الخلفية.\n\nب) تدور العجلة الخلفية في نفس جهة الدواسة (مع عقارب الساعة). الميزتان: عدم حدوث انزلاق، ونقل الحركة لمسافة متباعدة مع تحمل جهد كبير.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `3) احسب السرعة المتوسطة للدراج بوحدة $"m/s"$ ثم حوّلها إلى وحدة $"km/h"$. وإذا واصل السير بهذه السرعة مدة $1 "min"$ إضافية، فما المسافة الإضافية التي يقطعها؟`,
						answer: `3) السرعة: $v = frac(${dRun}, ${tRun}) = ${vMs} "m/s"$. بالتحويل: $v = ${vMs} times 3.6 = ${vKmh} "km/h"$.\n\nالمسافة في $t = 1 "min" = 60 "s"$: $d' = ${vMs} times 60 = ${vMs * 60}$ م.`,
						mark: '2.5'
					}
				]
			},
			hints: [
				'الهيكل ينسحب على الطريق بينما العجلة تدور حول محورها.',
				'في نقل الحركة بالسلاسل يدور القائد والمقتاد في نفس الجهة.',
				'حوّل الدقيقة الواحدة إلى 60 ثانية قبل حساب المسافة الإضافية.'
			],
			solutionStepsAr: [
				'الدراج ساكن بالنسبة للهيكل ومتحرك بالنسبة للرصيف؛ الهيكل انسحابي مستقيم والعجلة دورانية.',
				'نقل الحركة بالسلاسل: القائد مسنن الدواسة، المقتاد مسنن العجلة، ويدوران في نفس الجهة.',
				`السرعة $v = ${vMs}\\text{ m/s} = ${vKmh}\\text{ km/h}$، والمسافة في دقيقة $= ${vMs * 60}\\text{ m}$.`
			],
			finalAnswer: `${vKmh} km/h`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Integration 2: Factory Conveyor & Highway Transport (Speed Graph + Pulleys)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationT2FactoryConveyorTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2am_t2_integration_factory_conveyor',
	grade: '2am',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: شاحنة النقل ومخطط سرعتها ونظام السيور بالورشة',
	curriculumLessonId: 'phy_lesson_2am_t2_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const vMax = rng.pick([15, 20, 25]);
		const vKmh = roundTo(vMax * 3.6, 1);
		const tA = 10;
		const tB = difficulty === 'easy' ? 30 : 40;
		const tC = tB + 10;
		const durUniform = tB - tA;
		const dUniform = vMax * durUniform;

		const speedFn = (t: number): number => {
			if (t <= tA) return (vMax / tA) * t;
			if (t <= tB) return vMax;
			if (t <= tC) return vMax * (1 - (t - tB) / (tC - tB));
			return 0;
		};
		const svg = svgPhysicsCurvePlot({
			xMax: tC + 10,
			yMax: vMax + 5,
			xLabel: 't (s)',
			yLabel: 'v (m/s)',
			xStep: 10,
			yStep: 5,
			title: 'مخطط سرعة الشاحنة v = f(t)',
			curves: [{ fn: speedFn, color: '#16a34a', strokeWidth: 2.5 }],
			dashedGuides: [
				{ x1: tA, y1: 0, x2: tA, y2: vMax, color: '#94a3b8' },
				{ x1: tB, y1: 0, x2: tB, y2: vMax, color: '#94a3b8' }
			]
		});
		const imageUrl = savePhysicsSvgAsset(`phy_2am_t2_integ2_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$${dUniform}\\text{ m}$`,
			[
				{
					text: `$${vMax * tB}\\text{ m}$`,
					diagnosticFeedback: `احسب مدة المرحلة المنتظمة فقط: $\\Delta t = ${tB} - ${tA} = ${durUniform}\\text{ s}$.`
				},
				{
					text: `$${vMax * 10}\\text{ m}$`,
					diagnosticFeedback: 'تلك مدة المرحلة الأولى وليس المرحلة المنتظمة.'
				},
				{
					text: `$${roundTo(vKmh * durUniform, 1)}\\text{ m}$`,
					diagnosticFeedback: 'بما أن الزمن بالثانية، يجب ضربه في السرعة بوحدة $\\text{m/s}$ لا $\\text{km/h}$!'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `تحمل شاحنة صناديق على طريق مستقيم وفق مخطط السرعة الموضح. ما المسافة المقطوعة خلال مرحلة الحركة المنتظمة (بين $t = ${tA}\\text{ s}$ و $t = ${tB}\\text{ s}$)؟`,
				questionTextAr: `احسب المسافة المقطوعة في المرحلة المنتظمة من المخطط بين $${tA}\\text{ s}$ و $${tB}\\text{ s}$.`,
				imageUrl,
				imageCaption: 'مخطط سرعة الشاحنة',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `السرعة الثابتة $v = ${vMax}\\text{ m/s}$ خلال $\\Delta t = ${tB} - ${tA} = ${durUniform}\\text{ s}$، ومنه $d = ${vMax} \\times ${durUniform} = ${dUniform}\\text{ m}$.`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction:
					'نقلت شاحنة بضائع إلى مصنع يشتغل به بساط ناقل يُدار بمحرك كهربائي متصل ببكرة البساط عبر سير مطاطي مستقيم، وسُجّل مخطط سرعة الشاحنة أثناء دخولها المستودع وفق المنحنى المقابل.',
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) بالاعتماد على مخطط السرعة، حدّد المراحل الثلاث لحركة الشاحنة (المجال الزمني + نوع الحركة في كل مرحلة)، ثم احسب سرعتها الثابتة بوحدة $"km/h"$ وهل تتجاوز الحد الأقصى المسموح داخل المصنع ($60 "km/h"$)؟`,
								answer: `1) - $[0, ${tA}]$ ث: حركة متسارعة.\n\n- $[${tA}, ${tB}]$ ث: حركة منتظمة.\n\n- $[${tB}, ${tC}]$ ث: حركة متباطئة (ثم سكون بعد $${tC}$ ث).\n\nالسرعة الثابتة: $v = ${vMax} times 3.6 = ${vKmh} "km/h"$. ${vKmh > 60 ? 'نعم، تتجاوز السرعة المسموحة 60 كلم/سا ويجب تخفيضها!' : 'لا، فهي تحترم السرعة المسموحة.'}`,
								mark: '3'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'مخطط سرعة الشاحنة'
							}
						]
					},
					{
						type: 'text',
						content: `2) احسب المسافة التي قطعتها الشاحنة خلال المرحلة المنتظمة (من $${tA}$ ث إلى $${tB}$ ث). وإذا وضعت الشاحنة صندوقاً على البساط الناقل الذي يتحرك حركة انسحابية مستقيمة، فما الحالة الحركية للصندوق بالنسبة للبساط وبالنسبة لجدران المصنع؟`,
						answer: `2) المسافة: $d = ${vMax} times (${tB} - ${tA}) = ${vMax} times ${durUniform} = ${dUniform}$ م.\n\nالصندوق ساكن بالنسبة للبساط الناقل (لا يتغير موضعه عليه)، ومتحرك بالنسبة لجدران المصنع.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: '3) داخل آلة البساط الناقل، يدير المحرك بكرة (قائد) متصلة ببكرة البساط (مقتاد) بسير مطاطي مستقيم. دارت بكرة المحرك عكس عقارب الساعة.\n\nأ) في أي جهة تدور بكرة البساط؟\n\nب) كيف يمكن عكس جهة دوران بكرة البساط دون عكس دوران المحرك؟ وما العيب الشائع في نقل الحركة بالسيور؟',
						answer: '3) أ) تدور بكرة البساط في نفس جهة بكرة المحرك (عكس عقارب الساعة) لأن الربط مستقيم.\n\nب) لعكس جهة الدوران نستعمل الربط المتصالب للسير. العيب الشائع للسيور هو إمكانية انزلاق السير أو تمدده وتلفه مع الزمن.',
						mark: '2.5'
					}
				]
			},
			hints: [
				'اقرأ قيمة السرعة الثابتة في المرحلة الأفقية واضربها في 3.6 للتحويل إلى km/h.',
				'المسافة في المرحلة المنتظمة تساوي جداء السرعة في مدة المرحلة ($t_B - t_A$).',
				'الربط المستقيم بالسيور يحفظ جهة الدوران، بينما الربط المتصالب يعكسها.'
			],
			solutionStepsAr: [
				`السرعة الثابتة $v = ${vMax}\\text{ m/s} = ${vKmh}\\text{ km/h}$.`,
				`المسافة في المرحلة المنتظمة $d = ${dUniform}\\text{ m}$، والصندوق ساكن بالنسبة للبساط ومتحرك بالنسبة للجدران.`,
				'يدور المقتاد في نفس جهة القائد بالربط المستقيم، وللعكس نستعمل الربط المتصالب.'
			],
			finalAnswer: `${dUniform} m`
		};
	}
};

export const PHYSICS_TEMPLATES_2AM_T2: PhysicsParameterizedTemplate[] = [
	motionRestReferenceTemplate,
	trajectoryTranslationRotationTemplate,
	speedVelocityDiagramsTemplate,
	motionTransmissionTemplate,
	integrationT2BicycleTripTemplate,
	integrationT2FactoryConveyorTemplate
];
