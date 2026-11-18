import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { savePhysicsSvgAsset, svgPhysicsCurvePlot, wrapPhysicsSvg } from '../../svg-physics';

function esc(str: string): string {
	return str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function buildImmersionSvg(opts: {
	v1: number;
	v2: number;
	mass: number;
	objName: string;
}): string {
	return wrapPhysicsSvg(
		390,
		195,
		`<rect x="10" y="10" width="370" height="175" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="195" y="28" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">قياس الكتلة والحجم بطريقة الغمر (${esc(opts.objName)})</text>` +
			// Cylinder 1
			`<rect x="42" y="48" width="40" height="106" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>` +
			`<rect x="43" y="98" width="38" height="55" fill="#bae6fd"/>` +
			`<line x1="42" y1="98" x2="82" y2="98" stroke="#0284c7" stroke-width="1.6"/>` +
			`<text x="62" y="92" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0369a1">V₁=${opts.v1} mL</text>` +
			`<text x="62" y="170" text-anchor="middle" font-size="10" fill="#475569">قبل الغمر</text>` +
			`<text x="106" y="106" text-anchor="middle" font-size="16" font-weight="bold" fill="#dc2626">→</text>` +
			// Cylinder 2
			`<rect x="130" y="48" width="40" height="106" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>` +
			`<rect x="131" y="70" width="38" height="83" fill="#bae6fd"/>` +
			`<line x1="130" y1="70" x2="170" y2="70" stroke="#0284c7" stroke-width="1.6"/>` +
			`<polygon points="140,136 160,132 162,150 138,151" fill="#94a3b8" stroke="#334155" stroke-width="1.3"/>` +
			`<text x="150" y="64" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0369a1">V₂=${opts.v2} mL</text>` +
			`<text x="150" y="170" text-anchor="middle" font-size="10" fill="#475569">بعد الغمر</text>` +
			// Digital Balance
			`<rect x="206" y="68" width="154" height="86" rx="6" fill="#ffffff" stroke="#64748b" stroke-width="1.5"/>` +
			`<polygon points="245,92 321,92 315,108 251,108" fill="#cbd5e1" stroke="#334155" stroke-width="1.2"/>` +
			`<rect x="232" y="114" width="102" height="28" rx="4" fill="#0f172a"/>` +
			`<text x="283" y="133" text-anchor="middle" font-size="13" font-weight="bold" fill="#22c55e" direction="ltr">m = ${opts.mass} g</text>` +
			`<text x="283" y="170" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#475569">ميزان إلكتروني</text>`
	);
}

function buildParticleQuizSvg(stateKind: 'solid' | 'liquid' | 'gas'): string {
	const dots =
		stateKind === 'solid'
			? [0, 1, 2, 3].flatMap((r) => [0, 1, 2, 3].map((c) => [118 + c * 22, 56 + r * 22]))
			: stateKind === 'liquid'
				? [
						[115, 92],
						[138, 96],
						[161, 90],
						[185, 95],
						[118, 114],
						[142, 118],
						[166, 112],
						[188, 116],
						[116, 134],
						[140, 136],
						[164, 133],
						[187, 135]
					]
				: [
						[116, 56],
						[182, 62],
						[148, 86],
						[114, 114],
						[186, 120],
						[154, 134]
					];
	const col = stateKind === 'solid' ? '#2563eb' : stateKind === 'liquid' ? '#16a34a' : '#d97706';
	return wrapPhysicsSvg(
		300,
		180,
		`<rect x="10" y="10" width="280" height="160" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="150" y="28" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">النموذج الحبيبي لعينة مادة مجهولة</text>` +
			`<rect x="92" y="38" width="116" height="110" rx="5" fill="#ffffff" stroke="#334155" stroke-width="1.6"/>` +
			dots.map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="7.5" fill="${col}"/>`).join('') +
			`<text x="150" y="162" text-anchor="middle" font-size="10.5" fill="#475569">حدّد الحالة الفيزيائية الممثلة</text>`
	);
}

function buildSolutionBalanceSvg(opts: {
	mWater: number;
	mSolute: number;
	volMl: number;
	soluteName: string;
}): string {
	const totalM = opts.mWater + opts.mSolute;
	return wrapPhysicsSvg(
		400,
		185,
		`<rect x="10" y="10" width="380" height="165" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="200" y="28" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">تحضير محلول مائي (${esc(opts.soluteName)} + ماء)</text>` +
			`<rect x="34" y="46" width="84" height="72" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>` +
			`<rect x="35" y="70" width="82" height="47" fill="#dbeafe"/>` +
			`<text x="76" y="96" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e40af">ماء: ${opts.mWater} g</text>` +
			`<text x="132" y="92" font-size="15" font-weight="bold" fill="#0f172a">+</text>` +
			`<rect x="148" y="88" width="60" height="30" rx="4" fill="#fef3c7" stroke="#d97706"/>` +
			`<text x="178" y="107" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">${opts.mSolute} g ${esc(opts.soluteName)}</text>` +
			`<text x="224" y="92" font-size="16" font-weight="bold" fill="#16a34a">→</text>` +
			`<rect x="242" y="46" width="114" height="72" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>` +
			`<rect x="243" y="68" width="112" height="49" fill="#bfdbfe"/>` +
			`<text x="299" y="90" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">محلول متجانس</text>` +
			`<text x="299" y="108" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">V = ${opts.volMl} mL</text>` +
			`<rect x="242" y="128" width="114" height="26" rx="4" fill="#0f172a"/>` +
			`<text x="299" y="145" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#22c55e" direction="ltr">m_tot = ${totalM} g</text>` +
			`<text x="122" y="145" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#475569">الميزان يحقق انحفاظ الكتلة</text>`
	);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Measurements: Volume (Immersion & Regular), Mass, Density & Floating/Sinking
// ═══════════════════════════════════════════════════════════════════════════════
const measurementsVolumeDensityTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1am_t2_measurements_volume_density',
	grade: '1am',
	trimesterId: 't2',
	domain: 'matter',
	titleAr: 'قياس الحجم والكتلة وحساب الكتلة الحجمية والكثافة',
	curriculumLessonId: 'phy_lesson_1am_t2_measurements_length_volume_mass_density',
	defaultPoints: 6,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const materials = [
			{ name: 'قطعة ألمنيوم', rho: 2.7, floats: false },
			{ name: 'قطعة حديد', rho: 7.8, floats: false },
			{ name: 'قطعة خشب الصنوبر', rho: 0.6, floats: true },
			{ name: 'قطعة شمع', rho: 0.9, floats: true },
			{ name: 'قطعة نحاس', rho: 8.9, floats: false },
			{ name: 'قطعة فلين مضغوط', rho: 0.4, floats: true }
		];
		const mat = rng.pick(materials);
		const v1 = rng.pick([30, 40, 50, 60]);
		const vol = rng.pick([10, 20, 25, 30, 40, 50]);
		const v2 = v1 + vol;
		const mass = roundTo(mat.rho * vol, 1);
		const rhoKgM3 = Math.round(mat.rho * 1000);
		const dVal = mat.rho;

		// Regular solid dimensions for part 3 of sujet
		const L = rng.pick([4, 5, 6]);
		const W = rng.pick([2, 3]);
		const H = rng.pick([2, 3, 4]);
		const regVol = L * W * H;

		const svg = buildImmersionSvg({
			v1,
			v2,
			mass,
			objName: mat.name
		});
		const imageUrl = savePhysicsSvgAsset(`phy_1am_immersion_s${seed}`, svg);

		let quizQuestion: PhysicsGeneratedExerciseInstance['quizQuestion'];
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;

		if (difficulty === 'easy') {
			const wrongSum = v1 + v2;
			const mcq = buildUniqueMcqOptions(
				`$${vol}\\text{ cm}^3$`,
				[
					{
						text: `$${v2}\\text{ cm}^3$`,
						diagnosticFeedback: 'هذا هو الحجم النهائي للماء والجسم معاً $V_2$؛ يجب طرح $V_1$!'
					},
					{
						text: `$${v1}\\text{ cm}^3$`,
						diagnosticFeedback: 'هذا هو حجم الماء الابتدائي $V_1$ قبل غمر الجسم.'
					},
					{
						text: `$${wrongSum}\\text{ cm}^3$`,
						diagnosticFeedback: 'لحساب حجم الجسم المغمور نطرح $V_2 - V_1$ ولا نجمعهما.'
					}
				],
				rng
			);
			finalAnswer = `${vol} cm³`;
			quizQuestion = {
				type: 'mcq',
				questionText: `لقياس حجم **${mat.name}** بطريقة الغمر، استعملنا مخباراً مدرجاً كما في الرسم ($V_1 = ${v1}\\text{ mL}$ و $V_2 = ${v2}\\text{ mL}$). ما حجم هذه القطعة بوحدة $\\text{cm}^3$؟`,
				questionTextAr: `ما حجم القطعة المغمورة في المخبار ($V_1=${v1}\\text{ mL}$, $V_2=${v2}\\text{ mL}$)?`,
				imageUrl,
				imageCaption: 'تجربة قياس الحجم بطريقة الغمر',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نطبق قانون الغمر: $V = V_2 - V_1 = ${v2} - ${v1} = ${vol}\\text{ mL} = ${vol}\\text{ cm}^3$.`
			};
			hints = [
				'اقرأ الحجم الابتدائي $V_1$ قبل غمر الجسم والحجم النهائي $V_2$ بعد الغمر.',
				'تذكّر أن $1\\text{ mL} = 1\\text{ cm}^3$.',
				'احسب الفرق $V = V_2 - V_1$.'
			];
			solutionStepsAr = [
				`$V_1 = ${v1}\\text{ mL}$ و $V_2 = ${v2}\\text{ mL}$.`,
				`$V = V_2 - V_1 = ${v2} - ${v1} = ${vol}\\text{ cm}^3$.`
			];
		} else {
			const wrongDivV2 = roundTo(mass / v2, 2);
			const wrongInv = roundTo(vol / mass, 2);
			const mcq = buildUniqueMcqOptions(
				`$${mat.rho}\\text{ g/cm}^3$ (${mat.floats ? 'يطفو' : 'يغوص'})`,
				[
					{
						text: `$${mat.rho}\\text{ g/cm}^3$ (${mat.floats ? 'يغوص' : 'يطفو'})`,
						diagnosticFeedback: `قيمة الكتلة الحجمية صحيحة، لكن قارن الكثافة $d = ${dVal}$ مع $1$: ${mat.floats ? 'إذا كان $d < 1$ يطفو' : 'إذا كان $d > 1$ يغوص'}.`
					},
					{
						text: `$${wrongDivV2}\\text{ g/cm}^3$ (${wrongDivV2 < 1 ? 'يطفو' : 'يغوص'})`,
						diagnosticFeedback: 'قسمتَ الكتلة على $V_2$ مباشرة دون حساب $V = V_2 - V_1$!'
					},
					{
						text: `$${wrongInv}\\text{ g/cm}^3$ (${wrongInv < 1 ? 'يطفو' : 'يغوص'})`,
						diagnosticFeedback: 'عكست القانون! الكتلة الحجمية هي $\\rho = \\frac{m}{V}$ وليس $\\frac{V}{m}$.'
					}
				],
				rng
			);
			finalAnswer = `${mat.rho} g/cm³ (${mat.floats ? 'يطفو' : 'يغوص'})`;
			quizQuestion = {
				type: 'mcq',
				questionText: `في التجربة المبينة بالرسم، كتلة **${mat.name}** هي $m = ${mass}\\text{ g}$، وحجم الماء ارتفع من $V_1 = ${v1}\\text{ mL}$ إلى $V_2 = ${v2}\\text{ mL}$ (بفرض غمرها كلياً). ما الكتلة الحجمية $\\rho$ للقطعة، وهل تطفو أم تغوص في الماء؟`,
				questionTextAr: `احسب الكتلة الحجمية وحدد هل تطفو القطعة أم تغوص في الماء.`,
				imageUrl,
				imageCaption: 'قياس الحجم بالغمر وقياس الكتلة بالميزان',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `$V = ${v2} - ${v1} = ${vol}\\text{ cm}^3$، ومنه $\\rho = \\frac{${mass}}{${vol}} = ${mat.rho}\\text{ g/cm}^3$ و $d = ${dVal}$، وبما أن $d ${mat.floats ? '<' : '>'} 1$ فإنها ${mat.floats ? 'تطفو' : 'تغوص'}.`
			};
			hints = [
				`احسب أولاً حجم القطعة: $V = V_2 - V_1 = ${v2} - ${v1}$.`,
				'احسب الكتلة الحجمية بالقانون $\\rho = \\frac{m}{V}$.',
				'احسب الكثافة $d = \\frac{\\rho}{\\rho_{\\text{ماء}}}$ وقارنها مع $1$.'
			];
			solutionStepsAr = [
				`الحجم: $V = ${v2} - ${v1} = ${vol}\\text{ cm}^3$.`,
				`الكتلة الحجمية: $\\rho = \\frac{${mass}}{${vol}} = ${mat.rho}\\text{ g/cm}^3 = ${rhoKgM3}\\text{ kg/m}^3$.`,
				`الكثافة: $d = ${dVal}$، وبما أن $d ${mat.floats ? '<' : '>'} 1$ فإن القطعة **${mat.floats ? 'تطفو' : 'تغوص'}** في الماء.`
			];
		}

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `أراد تلميذ تعيين طبيعة جسم صلب (**${mat.name}**) باستعمال مخبار مدرج به ماء وميزان إلكتروني كما توضحه الوثيقة المقابلة:`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1.15fr'],
					children: [
						{
							type: 'text',
							content: `1) أ) سمّ الطريقة المستعملة لقياس حجم هذا الجسم، واذكر احتياطاً واحداً عند قراءة التدريجة في المخبار.\n\nب) احسب حجم الجسم $V$ بوحدة $"cm"^3$ ثم بوحدة $"mL"$.`,
							answer: `1) أ) طريقة *الغمر*. يجب أن تكون العين أفقية عند السطح السفلي لهلالة الماء.\n\nب) $V = V_2 - V_1 = ${v2} - ${v1} = ${vol} "mL" = ${vol} "cm"^3$.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'طريقة الغمر والميزان الإلكتروني'
						}
					]
				},
				{
					type: 'text',
					content: `2) احسب الكتلة الحجمية $rho$ لهذا الجسم بوحدة $"g/cm"^3$ ثم حوّلها إلى $"kg/m"^3$، ثم استنتج كثافته $d$ بالنسبة للماء ($rho_"ماء" = 1 "g/cm"^3$) وبيّن هل يطفو أم يغوص في الماء.`,
					answer: `2) $rho = frac(m, V) = frac(${mass}, ${vol}) = ${mat.rho} "g/cm"^3 = ${rhoKgM3} "kg/m"^3$.\n\nالكثافة: $d = frac(${mat.rho}, 1) = ${dVal}$ (بدون وحدة). بما أن $d ${mat.floats ? '<' : '>'} 1$ فإن الجسم ${mat.floats ? 'يطفو فوق' : 'يغوص في'} الماء.`,
					mark: '2.5'
				},
				{
					type: 'text',
					content: `3) لو كان لدينا متوازي مستطيلات منتظم أبعاده $L = ${L} "cm"$ و $l = ${W} "cm"$ و $h = ${H} "cm"$، ما حجمه الحسابي؟ وما الأداة الأنسب لقياس القطر الداخلي لأنبوب دقيق؟`,
					answer: `3) $V = L times l times h = ${L} times ${W} times ${H} = ${regVol} "cm"^3$. والأداة الأنسب لقياس القطر الداخلي لأنبوب دقيق هي *القدم القنوية*.`,
					mark: '1.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. States of Matter, Particle Model & Phase Changes
// ═══════════════════════════════════════════════════════════════════════════════
const statesParticlesChangesTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1am_t2_states_particles_changes',
	grade: '1am',
	trimesterId: 't2',
	domain: 'matter',
	titleAr: 'حالات المادة الثلاث، النموذج الحبيبي، وتحولات الحالة الفيزيائية',
	curriculumLessonId: 'phy_lesson_1am_t2_states_of_matter_phase_changes',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const stateKind: 'solid' | 'liquid' | 'gas' = rng.pick(['solid', 'liquid', 'gas']);
		const svg = buildParticleQuizSvg(stateKind);
		const imageUrl = savePhysicsSvgAsset(`phy_1am_particles_s${seed}`, svg);

		const transitions = [
			{ name: 'الانصهار', from: 'الصلبة', to: 'السائلة', factor: 'رفع درجة الحرارة (التسخين)' },
			{ name: 'التجمد', from: 'السائلة', to: 'الصلبة', factor: 'خفض درجة الحرارة (التبريد)' },
			{ name: 'التبخر', from: 'السائلة', to: 'الغازية', factor: 'التسخين' },
			{ name: 'التكاثف', from: 'الغازية', to: 'السائلة', factor: 'التبريد' },
			{ name: 'التسامي', from: 'الصلبة', to: 'الغازية مباشرة', factor: 'التسخين (دون المرور بالسائلة)' }
		];
		const tr = rng.pick(transitions);
		const iceMass = rng.pick([120, 150, 180, 250]);

		const stateLabelAr =
			stateKind === 'solid'
				? 'الحالة الصلبة (حبيبات متراصة ومنتظمة)'
				: stateKind === 'liquid'
					? 'الحالة السائلة (حبيبات متقاربة تنزلق فوق بعضها)'
					: 'الحالة الغازية (حبيبات متباعدة وسريعة الحركة)';

		const mcq = buildUniqueMcqOptions(
			stateLabelAr,
			[
				...(stateKind !== 'solid'
					? [
							{
								text: 'الحالة الصلبة (حبيبات متراصة ومنتظمة)',
								diagnosticFeedback: 'في الحالة الصلبة تكون الحبيبات متلاصقة ومرتبة في صفوف منتظمة.'
							}
						]
					: []),
				...(stateKind !== 'liquid'
					? [
							{
								text: 'الحالة السائلة (حبيبات متقاربة تنزلق فوق بعضها)',
								diagnosticFeedback: 'في الحالة السائلة تتقارب الحبيبات في أسفل الإناء دون انتظام ثابت.'
							}
						]
					: []),
				...(stateKind !== 'gas'
					? [
							{
								text: 'الحالة الغازية (حبيبات متباعدة وسريعة الحركة)',
								diagnosticFeedback: 'في الحالة الغازية تشغل الحبيبات كامل الحيز وتفصلها مسافات كبيرة.'
							}
						]
					: []),
				{
					text: 'حالة خليط غير متجانس فقط',
					diagnosticFeedback: 'النموذج الحبيبي هنا يمثل حالة فيزيائية نقية (صلبة، سائلة، أو غازية).'
				}
			],
			rng
		);

		const quizQuestion: PhysicsGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `تأمل تمثيل **النموذج الحبيبي** المقابل. أي حالة فيزيائية يمثلها هذا الترتيب للحبيبات؟`,
			questionTextAr: `أي حالة فيزيائية يمثلها النموذج الحبيبي المقابل؟`,
			imageUrl,
			imageCaption: 'النموذج الحبيبي لعينة مادة',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `يمثل الرسم **${stateLabelAr}**.`
		};

		const hints: [string, string, string] = [
			'راقب المسافات بين الحبيبات داخل الإناء.',
			'هل الحبيبات مرتبة ومتراصة (صلب)، أم متقاربة في الأسفل (سائل)، أم منتشرة في كل الإناء (غاز)؟',
			'اختر الوصف المطابق لترتيب الحبيبات وتباعدها.'
		];
		const solutionStepsAr = [
			`تظهر الحبيبات في الرسم ${stateKind === 'solid' ? 'متراصة ومنتظمة' : stateKind === 'liquid' ? 'متقاربة غير منتظمة في الأسفل' : 'متباعدة وتملأ كامل الحيز'}.`,
			`إذن الحالة الممثلة هي **${stateLabelAr}**.`
		];
		const finalAnswer = stateLabelAr;

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `ندرس خصائص حالات المادة الثلاث وتحولاتها الفيزيائية باستعمال النموذج الحبيبي كما يوضح الشكل المقابل:`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1.15fr'],
					children: [
						{
							type: 'text',
							content: `1) حدد الحالة الفيزيائية الممثلة في النموذج الحبيبي المقابل، ثم اذكر خاصيتين مميزتين لها (من حيث الشكل والحجم أو الانضغاط).`,
							answer: `1) الحالة الممثلة هي *${stateLabelAr}*. ${stateKind === 'solid' ? 'لها شكل ثابت وحجم ثابت ولا تنضغط.' : stateKind === 'liquid' ? 'لها حجم ثابت وشكل متغير وسطحها الحر مستوٍ وأفقي.' : 'ليس لها شكل ولا حجم ثابتان وقابلة للانضغاط والتمدد.'}`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'النموذج الحبيبي للمادة'
						}
					]
				},
				{
					type: 'table',
					headers: ['التحول الفيزيائي', 'من الحالة ...', 'إلى الحالة ...', 'العامل المسبب'],
					cells: [],
					rows: [
						[
							tr.name,
							{ content: '................', answer: tr.from, mark: '0.5' },
							{ content: '................', answer: tr.to, mark: '0.5' },
							{ content: '................', answer: tr.factor, mark: '0.5' }
						],
						[
							{ content: '................', answer: 'التكاثف', mark: '0.5' },
							'الغازية',
							'السائلة',
							'التبريد'
						]
					],
					headerBackground: true,
					borders: 'grid',
					width: 'full'
				},
				{
					type: 'text',
					content: `3) نضع $${iceMass} "g"$ من الجليد في إناء مغلق ونتركه ينصهر تماماً. ما هي كتلة الماء السائل الناتج؟ فسر ذلك بالنموذج الحبيبي. وما الفرق بين سطح الرمل (صلب مجزأ) وسطح الماء في كأس؟`,
					answer: `3) كتلة الماء السائل هي $${iceMass} "g"$ لأن عدد الحبيبات ونوعها لا يتغيران أثناء التحول الفيزيائي (الكتلة محفوظة). الرمل صلب مجزأ سطحه الحر مائل وغير أفقي، بينما سطح الماء السائل مستوٍ وأفقي.`,
					mark: '2'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Mixtures, Separation Techniques & Pure Water Heating Curve
// ═══════════════════════════════════════════════════════════════════════════════
const mixturesSeparationPurityTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1am_t2_mixtures_separation_purity',
	grade: '1am',
	trimesterId: 't2',
	domain: 'matter',
	titleAr: 'الخلائط وطرق فصلها ومعايير نقاوة الماء النقي',
	curriculumLessonId: 'phy_lesson_1am_t2_mixtures_separation_pure_water',
	defaultPoints: 6,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const isPure = seed % 2 === 0;
		const boilEnd = isPure ? 100 : rng.pick([104, 106, 108]);

		const curveSvg = svgPhysicsCurvePlot({
			title: 'منحنى تسخين عينة ماء عند الضغط العادي',
			xLabel: 't (min)',
			yLabel: 'T (°C)',
			xMin: 0,
			xMax: 10,
			yMin: 20,
			yMax: 120,
			xStep: 2,
			yStep: 20,
			curves: [
				{
					fn: (t) =>
						isPure
							? t <= 5
								? 20 + (t / 5) * 80
								: 100
							: t <= 5
								? 20 + (t / 5) * 80
								: 100 + ((t - 5) / 5) * (boilEnd - 100),
					color: isPure ? '#2563eb' : '#dc2626',
					label: 'عينة الماء'
				}
			],
			dashedGuides: [
				{ x1: 0, y1: 100, x2: 5, y2: 100, color: '#059669', label: '100°C', labelPos: 'left' }
			],
			width: 400,
			height: 215
		});
		const imageUrl = savePhysicsSvgAsset(`phy_1am_separation_s${seed}`, curveSvg);

		const scenarioMix = rng.pick([
			{ mix: 'ماء + زيت', kind: 'خليط غير متجانس', method: 'الإبانة' },
			{ mix: 'ماء + رمل', kind: 'خليط غير متجانس', method: 'التركيد ثم الترشيح' },
			{ mix: 'ماء + ملح منحل', kind: 'خليط متجانس', method: 'التقطير' }
		]);

		const mcq = buildUniqueMcqOptions(
			isPure
				? 'ماء نقي لأن درجة حرارة غليانه ثابتة عند 100°C'
				: 'خليط متجانس (ماء غير نقي) لأن درجة غليانه تزداد وتفوق 100°C',
			[
				{
					text: isPure
						? 'خليط غير متجانس لأن درجة الحرارة ارتفعت في البداية'
						: 'ماء نقي لأن الغليان بدأ عند 100°C',
					diagnosticFeedback: isPure
						? 'ارتفاع الحرارة قبل الغليان طبيعي أثناء التسخين، العبرة بثبات الدرجة عند 100°C أثناء الغليان!'
						: 'في الماء النقي تثبت درجة الحرارة تماماً عند 100°C طوال الغليان ولا تستمر في الارتفاع.'
				},
				{
					text: 'ماء معدني صافٍ ونقي كيميائياً',
					diagnosticFeedback: 'الماء المعدني خليط متجانس يحتوي على أملاح معدنية وليس ماءً نقياً.'
				},
				{
					text: 'حالة تجمد للماء عند 0°C',
					diagnosticFeedback: 'لاحظ محور درجة الحرارة: التحول يظهر عند 100°C فما فوق (غليان) وليس عند 0°C.'
				}
			],
			rng
		);

		const quizQuestion: PhysicsGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `يبيّن المنحنى المقابل تغيّر درجة حرارة عينة ماء أثناء تسخينها حتى الغليان. ماذا تستنتج حول نقاوة هذه العينة؟`,
			questionTextAr: `اعتماداً على منحنى التسخين المقابل، هل عينة الماء نقية أم خليط؟`,
			imageUrl,
			imageCaption: 'منحنى تغير درجة الحرارة بدلالة الزمن أثناء التسخين',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: isPure
				? 'تثبت درجة الحرارة عند $100^\\circ\\text{C}$ طوال الغليان، وهذا من معايير نقاوة الماء النقي.'
				: `تستمر درجة الحرارة في الارتفاع من $100^\\circ\\text{C}$ إلى $${boilEnd}^\\circ\\text{C}$، إذن العينة خليط متجانس (ماء يحتوي أملاحاً).`
		};

		const hints: [string, string, string] = [
			'راقب الجزء الأخير من المنحنى (بعد الدقيقة t = 5 min) عندما يبدأ الغليان.',
			'هل المنحنى أفقي ثابت عند 100°C أم مائل يتجاوز 100°C؟',
			'الماء النقي تثبت درجة غليانه عند 100°C عند الضغط العادي.'
		];
		const solutionStepsAr = [
			`من المنحنى، ابتداءً من $t = 5\\text{ min}$: ${isPure ? 'تثبت درجة الحرارة عند $100^\\circ\\text{C}$' : `ترتفع درجة الحرارة فوق $100^\\circ\\text{C}$ حتى $${boilEnd}^\\circ\\text{C}$`}.`,
			`الاستنتاج: العينة ${isPure ? '**ماء نقي**' : '**خليط متجانس (ماء غير نقي)**'}.`
		];
		const finalAnswer = isPure ? 'ماء نقي' : 'خليط متجانس (ماء غير نقي)';

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `قام تلاميذ المخبر بتسخين عينة من الماء الصافي لتفحص نقاوتها ورسموا المنحنى المقابل، كما أرادوا فصل عدة خلائط:`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1.15fr'],
					children: [
						{
							type: 'text',
							content: `1) بالاعتماد على المنحنى المقابل، هل هذه العينة *ماء نقي* أم *خليط متجانس*؟ علّل إجابتك، واذكر درجة تجمد الماء النقي عند الضغط العادي.`,
							answer: `1) العينة هي ${isPure ? '*ماء نقي* لأن درجة حرارة غليانها بقيت ثابتة عند $100°"C"$' : `*خليط متجانس (غير نقي)* لأن درجة حرارتها ارتفعت من $100°"C"$ إلى $${boilEnd}°"C"$ دون ثبات`}. يتجمد الماء النقي عند درجة ثابتة هي $0°"C"$.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'منحنى تسخين عينة الماء'
						}
					]
				},
				{
					type: 'table',
					headers: ['الخليط', 'نوع الخليط (متجانس / غير متجانس)', 'تقنية الفصل المناسبة'],
					cells: [],
					rows: [
						[
							'ماء + زيت',
							{ content: '................', answer: 'خليط غير متجانس', mark: '0.5' },
							{ content: '................', answer: 'الإبانة', mark: '0.5' }
						],
						[
							'ماء + طمي (رمل دقيق)',
							{ content: '................', answer: 'خليط غير متجانس', mark: '0.5' },
							{ content: '................', answer: 'التركيد ثم الترشيح', mark: '0.5' }
						],
						[
							'ماء + ملح منحل',
							{ content: '................', answer: 'خليط متجانس', mark: '0.5' },
							{ content: '................', answer: 'التقطير', mark: '0.5' }
						]
					],
					headerBackground: true,
					borders: 'grid',
					width: 'full'
				},
				{
					type: 'text',
					content: `3) لماذا لا تكفي عملية *الترشيح* وحدها لتحويل خليط (${scenarioMix.mix}) إلى ماء نقي؟ (أو اشرح دور المكثف في التقطير).`,
					answer: `3) الترشيح يحجز فقط المواد الصلبة العالقة غير المنحلة ويعطي ماءً صافياً، ولا يستطيع فصل الأملاح المنحلة أو السوائل؛ للحصول على ماء نقي نستعمل *التقطير* حيث يبرد المكثف البخار المتصاعد ليتكاثف ويعطي ماءً مقطراً نقياً.`,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Aqueous Solution, Mass Concentration (Cm = m/V) & Mass Conservation
// ═══════════════════════════════════════════════════════════════════════════════
const solutionConcentrationConservationTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1am_t2_solution_concentration_conservation',
	grade: '1am',
	trimesterId: 't2',
	domain: 'matter',
	titleAr: 'المحلول المائي، التركيز الكتلي، ومبدأ انحفاظ الكتلة',
	curriculumLessonId: 'phy_lesson_1am_t2_aqueous_solution_concentration_mass_conservation',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const soluteName = rng.pick(['الملح', 'السكر']);
		const volMl = rng.pick([200, 250, 400, 500]);
		const volL = roundTo(volMl / 1000, 2);
		const cmTarget = rng.pick([15, 20, 25, 30, 40, 50]);
		const mSolute = roundTo(cmTarget * volL, 1);
		const mWater = volMl; // 1 mL pure water = 1 g
		const mSolution = mWater + mSolute;
		const doubleVolL = roundTo(volL * 2, 2);
		const dilutedCm = roundTo(mSolute / doubleVolL, 2);

		const svg = buildSolutionBalanceSvg({
			mWater,
			mSolute,
			volMl,
			soluteName
		});
		const imageUrl = savePhysicsSvgAsset(`phy_1am_solution_s${seed}`, svg);

		const wrongNoConvert = roundTo(mSolute / volMl, 4);
		const wrongTotalDiv = roundTo(mSolution / volL, 1);
		const wrongMul = roundTo(mSolute * volL, 2);

		const mcq = buildUniqueMcqOptions(
			`$${cmTarget}\\text{ g/L}$`,
			[
				{
					text: `$${wrongNoConvert}\\text{ g/L}$`,
					diagnosticFeedback: 'نسيت تحويل الحجم من $\\text{mL}$ إلى $\\text{L}$ بالقسمة على $1000$!'
				},
				{
					text: `$${wrongTotalDiv}\\text{ g/L}$`,
					diagnosticFeedback: 'في قانون التركيز الكتلي $C_m = \\frac{m_{\\text{منحل}}}{V}$ نقسم كتلة *المنحل* فقط وليس كتلة المحلول كله.'
				},
				{
					text: `$${wrongMul}\\text{ g/L}$`,
					diagnosticFeedback: 'ضربت الكتلة في الحجم! القانون الصحيح هو $C_m = \\frac{m}{V}$.'
				}
			],
			rng
		);

		const quizQuestion: PhysicsGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `أذبنا $m = ${mSolute}\\text{ g}$ من **${soluteName}** تماماً في الماء للحصول على محلول مائي حجمه $V = ${volMl}\\text{ mL}$. ما هو **التركيز الكتلي** $C_m$ لهذا المحلول بوحدة $\\text{g/L}$؟`,
			questionTextAr: `أذبنا ${mSolute} g من ${soluteName} في محلول حجمه ${volMl} mL. ما التركيز الكتلي؟`,
			imageUrl,
			imageCaption: 'تحضير المحلول المائي على الميزان',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `نحوّل الحجم إلى اللتر: $V = ${volMl}\\text{ mL} = ${volL}\\text{ L}$، ثم نحسب $C_m = \\frac{${mSolute}}{${volL}} = ${cmTarget}\\text{ g/L}$.`
		};

		const hints: [string, string, string] = [
			'حوّل أولاً حجم المحلول من المليلتر (mL) إلى اللتر (L) بالقسمة على 1000.',
			'طبّق قانون التركيز الكتلي: $C_m = \\frac{m_{\\text{منحل}}}{V_{\\text{محلول}}}$.',
			`احسب $\\frac{${mSolute}}{${volL}}$.`
		];
		const solutionStepsAr = [
			`تحويل الحجم: $V = ${volMl}\\text{ mL} = ${volL}\\text{ L}$.`,
			`التركيز الكتلي: $C_m = \\frac{m}{V} = \\frac{${mSolute}}{${volL}} = ${cmTarget}\\text{ g/L}$.`,
			`كتلة المحلول الكلية محفوظة: $m_{\\text{محلول}} = ${mWater} + ${mSolute} = ${mSolution}\\text{ g}$.`
		];
		const finalAnswer = `${cmTarget} g/L`;

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `حضر التلميذ محلولاً مائياً بإذابة $${mSolute} "g"$ من ${soluteName} في $${mWater} "g"$ من الماء النقي، فحصل على محلول متجانس حجمه $V = ${volMl} "mL"$ كما في الشكل:`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1.15fr'],
					children: [
						{
							type: 'text',
							content: `1) حدد *المُحل* و *المُنحل* في هذا المحلول، ثم احسب كتلة المحلول الناتج مع ذكر المبدأ الفيزيائي المعتمد وتفسيره بالنموذج الحبيبي.`,
							answer: `1) المُحل هو الماء، والمُنحل هو ${soluteName}. كتلة المحلول: $m_"محلول" = ${mWater} + ${mSolute} = ${mSolution} "g"$. المبدأ هو *انحفاظ الكتلة*؛ لأن حبيبات ${soluteName} لا تختفي بل تنتشر بين حبيبات الماء دون تغير عددها.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'تحضير المحلول المائي'
						}
					]
				},
				{
					type: 'text',
					content: `2) حوّل الحجم $V$ إلى اللتر ($"L"$), ثم احسب التركيز الكتلي $C_m$ لهذا المحلول بوحدة $"g/L"$.`,
					answer: `2) $V = ${volMl} "mL" = ${volL} "L"$.\n\n$C_m = frac(m, V) = frac(${mSolute}, ${volL}) = ${cmTarget} "g/L"$.`,
					mark: '2.5'
				},
				{
					type: 'text',
					content: `3) نضيف الآن إلى هذا المحلول كمية من الماء النقي ليصبح حجمه الكلي $${doubleVolL} "L"$. كيف نسمي هذه العملية؟ واحسب التركيز الكتلي الجديد $C_m'$.`,
					answer: `3) تسمى هذه العملية *التمديد*. التركيز الكتلي الجديد: $C_m' = frac(${mSolute}, ${doubleVolL}) = ${dilutedCm} "g/L"$ (ينخفض التركيز).`,
					mark: '1.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Integration T2 #1: Treating Natural Water & Identifying Submerged Solid
// ═══════════════════════════════════════════════════════════════════════════════
const integrationWaterTreatmentTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1am_t2_integration_water_treatment',
	grade: '1am',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'وضعية إدماجية (1): معالجة وتنقية ماء طبيعي وتحليل جسم معدني',
	curriculumLessonId: 'phy_lesson_1am_t2_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const metal = rng.pick([
			{ name: 'الألمنيوم', rho: 2.7 },
			{ name: 'الحديد', rho: 7.8 },
			{ name: 'النحاس', rho: 8.9 }
		]);
		const vol = rng.pick([10, 20, 30]);
		const v1 = rng.pick([40, 50]);
		const v2 = v1 + vol;
		const mass = roundTo(metal.rho * vol, 1);
		const saltMass = rng.pick([10, 15, 20]);
		const waterVolL = rng.pick([0.5, 1]);
		const cm = roundTo(saltMass / waterVolL, 1);

		const svg = wrapPhysicsSvg(
			420,
			190,
			`<rect x="10" y="10" width="400" height="170" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
				`<text x="210" y="28" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">وثيقة (1): ماء بئر عكر (رمل + زيت + ملح) + قطعة معدنية في القاع</text>` +
				`<rect x="28" y="48" width="170" height="115" rx="6" fill="#ffffff" stroke="#0f172a" stroke-width="1.4"/>` +
				`<text x="113" y="68" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#92400e">عينة ماء البئر:</text>` +
				`<text x="113" y="88" text-anchor="middle" font-size="10" fill="#334155">1. طبقة زيت طافية</text>` +
				`<text x="113" y="106" text-anchor="middle" font-size="10" fill="#334155">2. ماء مالح عكر بالطمي</text>` +
				`<text x="113" y="124" text-anchor="middle" font-size="10" fill="#334155">3. قطعة معدن غائصة m=${mass}g</text>` +
				`<text x="113" y="144" text-anchor="middle" font-size="10" font-weight="bold" fill="#2563eb">V₁=${v1} mL → V₂=${v2} mL</text>` +
				`<rect x="218" y="48" width="174" height="115" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.4"/>` +
				`<text x="305" y="68" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e40af">جدول المرجع (ρ):</text>` +
				`<text x="305" y="92" text-anchor="middle" font-size="10.5" fill="#0f172a">الألمنيوم: 2.7 g/cm³</text>` +
				`<text x="305" y="114" text-anchor="middle" font-size="10.5" fill="#0f172a">الحديد: 7.8 g/cm³</text>` +
				`<text x="305" y="136" text-anchor="middle" font-size="10.5" fill="#0f172a">النحاس: 8.9 g/cm³</text>` +
				`<text x="305" y="154" text-anchor="middle" font-size="10" font-weight="bold" fill="#059669">غليان الماء النقي: 100°C</text>`
		);
		const imageUrl = savePhysicsSvgAsset(`phy_1am_t2_integ_water_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`${metal.name} (ρ = ${metal.rho} g/cm³)؛ ونفصل الماء النقي بالإبانة ثم الترشيح ثم التقطير`,
			[
				{
					text: `${metal.name} (ρ = ${metal.rho} g/cm³)؛ ونفصل الماء النقي بالترشيح فقط`,
					diagnosticFeedback: 'الترشيح لا يفصل الزيت بدقة ولا يفصل الملح المنحل! لا بد من الإبانة ثم الترشيح ثم التقطير.'
				},
				{
					text: `معدن مجهول (ρ = ${roundTo(mass / v2, 2)} g/cm³)؛ ونستعمل التقطير ثم الترشيح`,
					diagnosticFeedback: 'أخطأت في حساب الحجم (قسمت على $V_2$ بدلاً من $V_2 - V_1$) وفي ترتيب مراحل الفصل.'
				},
				{
					text: `${metal.name} ويطفو في الماء لأن كتلته الحجمية أكبر من 1`,
					diagnosticFeedback: 'عندما تكون الكثافة $d > 1$ فإن الجسم يغوص في الماء ولا يطفو.'
				}
			],
			rng
		);

		const quizQuestion: PhysicsGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `انظر إلى وثيقة الوضعية الإدماجية: قطعة معدن كتلتها $${mass}\\text{ g}$ وحجمها بالغمر ($V_1=${v1}\\text{ mL}, V_2=${v2}\\text{ mL}$). ما معدن القطعة، وما التسلسل الصحيح للحصول على **ماء نقي** من عينة البئر؟`,
			questionTextAr: `حدد معدن القطعة والتسلسل الصحيح للحصول على ماء نقي.`,
			imageUrl,
			imageCaption: 'سند الوضعية الإدماجية: تنقية ماء البئر',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `$V = ${v2} - ${v1} = ${vol}\\text{ cm}^3$، إذن $\\rho = \\frac{${mass}}{${vol}} = ${metal.rho}\\text{ g/cm}^3$ وهو **${metal.name}**. للحصول على ماء نقي نفصل الزيت بـ**الإبانة** ثم الطمي بـ**التركيد والترشيح** ثم الأملاح بـ**التقطير**.`
		};

		const hints: [string, string, string] = [
			`احسب حجم القطعة أولاً $V = V_2 - V_1$ ثم $\\rho = \\frac{m}{V}$ وقارنه بجدول المرجع.`,
			'لإزالة الزيت والملح والطمي بالترتيب: إبانة $\\to$ تركيد وترشيح $\\to$ تقطير.',
			'تحقق من نقاوة الماء المقطر بثبات درجة غليانه عند $100^\\circ\\text{C}$.'
		];
		const solutionStepsAr = [
			`حجم القطعة: $V = ${v2} - ${v1} = ${vol}\\text{ cm}^3$، ومنه $\\rho = \\frac{${mass}}{${vol}} = ${metal.rho}\\text{ g/cm}^3$، إذن المعدن هو **${metal.name}**.`,
			`مراحل التنقية: الإبانة (لفصل الزيت) $\\to$ التركيد والترشيح (لفصل الطمي) $\\to$ التقطير (للحصول على ماء نقي).`
		];
		const finalAnswer = `${metal.name} + إبانة ثم ترشيح ثم تقطير`;

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 8,
			instruction: `خلال خرجة علمية، أحضر تلاميذ السنة الأولى متوسط عينات من ماء بئر عكر مختلط بطبقة زيت ورمل وطمي وملح منحل، ووجدوا في قاع الدلو قطعة معدنية غير منتظمة الشكل. بالاعتماد على السند المقابل:`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1.15fr'],
					children: [
						{
							type: 'text',
							content: `1) صنّف خليط ماء البئر قبل المعالجة (متجانس أم غير متجانس)، ثم اشرح بالترتيب المراحل المخبرية اللازمة للحصول على *ماء نقي* انطلاقاً منه، وكيف تتحقق بالمحرار من نقاوته؟`,
							answer: `1) خليط *غير متجانس* (نميز الزيت والرمل بالعين). المراحل: (1) *الإبانة* لفصل الزيت، (2) *التركيد ثم الترشيح* لفصل الرمل والطمي فنحصل على رشاحة صافية (ماء مالح)، (3) *التقطير* لفصل الملح والحصول على ماء مقطر نقي. نتحقق بالمحرار من ثبات درجة الغليان عند $100°"C"$ ودرجة التجمد عند $0°"C"$.`,
							mark: '3'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'معطيات الوضعية الإدماجية'
						}
					]
				},
				{
					type: 'text',
					content: `2) احسب حجم القطعة المعدنية $V$، ثم كتلتها الحجمية $rho$ وكثافتها $d$ بالنسبة للماء. استنتج طبيعة المعدن من الجدول وفسر غوصها في قاع الدلو.`,
					answer: `2) $V = V_2 - V_1 = ${v2} - ${v1} = ${vol} "cm"^3$.\n\n$rho = frac(m, V) = frac(${mass}, ${vol}) = ${metal.rho} "g/cm"^3$، إذن المعدن هو *${metal.name}*. الكثافة $d = ${metal.rho} > 1$ ولذلك غاصت القطعة في الماء.`,
					mark: '3'
				},
				{
					type: 'text',
					content: `3) بعد الحصول على $${waterVolL} "L"$ من الماء النقي ($m_"ماء" = ${waterVolL * 1000} "g"$), أذبنا فيه $${saltMass} "g"$ من ملح الطعام لتحضير محلول معدني. احسب التركيز الكتلي $C_m$ للمحلول وكتلته الكلية.`,
					answer: `3) التركيز الكتلي: $C_m = frac(${saltMass}, ${waterVolL}) = ${cm} "g/L"$. والكتلة الكلية محفوظة: $m_"محلول" = ${waterVolL * 1000} + ${saltMass} = ${waterVolL * 1000 + saltMass} "g"$.`,
					mark: '2'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Integration T2 #2: Olive Oil Extraction / Brine Preparation & Density
// ═══════════════════════════════════════════════════════════════════════════════
const integrationKitchenLabMaterialsTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1am_t2_integration_kitchen_lab_materials',
	grade: '1am',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'وضعية إدماجية (2): تحضير محلول ملحي وفصل زيت الزيتون وتعيين الكثافة',
	curriculumLessonId: 'phy_lesson_1am_t2_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const oilVol = rng.pick([100, 200, 250]);
		const oilMass = roundTo(0.9 * oilVol, 1);
		const saltG = rng.pick([30, 40, 60]);
		const brineL = rng.pick([0.5, 1, 2]);
		const cmBrine = roundTo(saltG / brineL, 1);
		const waxSide = rng.pick([2, 3]);
		const waxVol = waxSide * waxSide * waxSide;
		const waxMass = roundTo(0.9 * waxVol, 1);

		const svg = wrapPhysicsSvg(
			420,
			190,
			`<rect x="10" y="10" width="400" height="170" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>` +
				`<text x="210" y="28" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">وثيقة: فصل زيت الزيتون عن الماء وتحضير محلول التخليل</text>` +
				// Funnel / Decantation shape
				`<polygon points="60,54 140,54 110,122 90,122" fill="#fef9c3" stroke="#0f172a" stroke-width="1.6"/>` +
				`<polygon points="72,88 128,88 110,122 90,122" fill="#bae6fd"/>` +
				`<line x1="100" y1="122" x2="100" y2="148" stroke="#0f172a" stroke-width="1.8"/>` +
				`<text x="100" y="74" text-anchor="middle" font-size="10" font-weight="bold" fill="#854d0e">زيت (${oilMass}g / ${oilVol}cm³)</text>` +
				`<text x="100" y="108" text-anchor="middle" font-size="10" font-weight="bold" fill="#0369a1">ماء</text>` +
				`<text x="100" y="166" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">أنبوبة الإبانة</text>` +
				// Right card
				`<rect x="180" y="48" width="212" height="118" rx="6" fill="#f8fafc" stroke="#94a3b8"/>` +
				`<text x="286" y="70" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">تحضير محلول التمليح:</text>` +
				`<text x="286" y="92" text-anchor="middle" font-size="10.5" fill="#0f172a">كتلة الملح المنحل: ${saltG} g</text>` +
				`<text x="286" y="112" text-anchor="middle" font-size="10.5" fill="#0f172a">حجم المحلول: ${brineL} L</text>` +
				`<text x="286" y="134" text-anchor="middle" font-size="10.5" fill="#b45309">مكعب صلب ضلعه a = ${waxSide} cm</text>` +
				`<text x="286" y="152" text-anchor="middle" font-size="10.5" fill="#b45309">كتلته m = ${waxMass} g</text>`
		);
		const imageUrl = savePhysicsSvgAsset(`phy_1am_t2_integ_oil_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`كثافة الزيت d = 0.9 < 1 فيطفو، والتركيز الكتلي للمحلول ${cmBrine} g/L`,
			[
				{
					text: `كثافة الزيت d = 1.11 > 1 فيغوص، والتركيز الكتلي ${cmBrine} g/L`,
					diagnosticFeedback: 'أخطأت في حساب الكثافة! $\\rho = \\frac{m}{V} = 0.9\\text{ g/cm}^3$، إذن $d = 0.9 < 1$ فيطفو.'
				},
				{
					text: `كثافة الزيت d = 0.9 < 1 فيطفو، والتركيز الكتلي ${roundTo(saltG * brineL, 1)} g/L`,
					diagnosticFeedback: 'راجع قانون التركيز الكتلي: $C_m = \\frac{m}{V}$ وليس $m \\times V$.'
				},
				{
					text: `نستعمل ورق الترشيح لفصل الزيت عن الماء لأن الزيت صلب`,
					diagnosticFeedback: 'الزيت والماء سائلان غير ممتزجين، لذا نستعمل أنبوبة الإبانة وليس الترشيح.'
				}
			],
			rng
		);

		const quizQuestion: PhysicsGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `في أنبوبة الإبانة المقابلة، كتلة $${oilVol}\\text{ cm}^3$ من زيت الزيتون هي $${oilMass}\\text{ g}$. وفي إناء آخر أُذيب $${saltG}\\text{ g}$ من الملح في محلول حجمه $${brineL}\\text{ L}$. ما الجواب الصحيح؟`,
			questionTextAr: `ما كثافة الزيت وما التركيز الكتلي للمحلول الملحي؟`,
			imageUrl,
			imageCaption: 'سند فصل الزيت وتحضير محلول التمليح',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `كثافة الزيت $d = \\frac{${oilMass} / ${oilVol}}{1} = 0.9 < 1$ لذا يطفو فوق الماء، والتركيز الكتلي للمحلول هو $C_m = \\frac{${saltG}}{${brineL}} = ${cmBrine}\\text{ g/L}$.`
		};

		const hints: [string, string, string] = [
			`احسب أولاً الكتلة الحجمية للزيت $\\rho = \\frac{${oilMass}}{${oilVol}}$ ثم كثافته $d$.`,
			'الزيت والماء سائلان غير ممتزجين يُفصلان بأنبوبة الإبانة.',
			`احسب التركيز الكتلي بالقانون $C_m = \\frac{m}{V}$.`
		];
		const solutionStepsAr = [
			`الكتلة الحجمية للزيت: $\\rho = \\frac{${oilMass}}{${oilVol}} = 0.9\\text{ g/cm}^3$، والكثافة $d = 0.9 < 1$ فيطفو.`,
			`التركيز الكتلي للمحلول الملحي: $C_m = \\frac{${saltG}}{${brineL}} = ${cmBrine}\\text{ g/L}$.`
		];
		const finalAnswer = `d_زيت = 0.9 (يطفو) ، C_m = ${cmBrine} g/L`;

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 8,
			instruction: `في موسم جني الزيتون بولاية بجاية، احتاجت عائلة لينا إلى فصل بقايا الماء عن زيت الزيتون وتحضير محلول ملحي لتمليح الزيتون، كما أرادت اختبار قطعة شمع مكعبة الشكل لإغلاق الدنان. بالاعتماد على السند المقابل:`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1.15fr'],
					children: [
						{
							type: 'text',
							content: `1) ما نوع خليط (الماء + زيت الزيتون)؟ وما اسم الأداة والتقنية المستعملة لفصلهما؟ احسب الكتلة الحجمية للزيت وكثافته لتبرير تموضعه في الأعلى.`,
							answer: `1) خليط *غير متجانس*. الأداة هي *أنبوبة الإبانة* والتقنية هي *الإبانة*. الكتلة الحجمية: $rho = frac(${oilMass}, ${oilVol}) = 0.9 "g/cm"^3$، والكثافة $d = 0.9 < 1$ ولذلك يطفو الزيت فوق الماء.`,
							mark: '3'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'أنبوبة الإبانة ومعطيات التمليح'
						}
					]
				},
				{
					type: 'text',
					content: `2) لتحضير محلول التمليح، أذابت الأم $${saltG} "g"$ من الملح في $${brineL * 1000} "g"$ من الماء النقي فحصلت على محلول حجمه $${brineL} "L"$.\n\nأ) احسب التركيز الكتلي $C_m$ لهذا المحلول.\n\nب) إذا أرادت تمديد المحلول لكونه مالحاً جداً، ماذا تضيف؟ وهل تنحفظ الكتلة أثناء ذوبان الملح؟`,
					answer: `2) أ) $C_m = frac(${saltG}, ${brineL}) = ${cmBrine} "g/L"$.\n\nب) لتمديده تضيف *الماء النقي* (المحل). نعم، تنحفظ الكتلة: $m_"محلول" = ${brineL * 1000} + ${saltG} = ${brineL * 1000 + saltG} "g"$.`,
					mark: '2.5'
				},
				{
					type: 'text',
					content: `3) احسب حجم مكعب الشمع الذي طول ضلعه $a = ${waxSide} "cm"$، ثم احسب كتلته الحجمية إذا كانت كتلته $m = ${waxMass} "g"$. هل يغوص هذا المكعب في الماء؟ علّل.`,
					answer: `3) $V = a^3 = ${waxSide}^3 = ${waxVol} "cm"^3$. الكتلة الحجمية: $rho = frac(${waxMass}, ${waxVol}) = 0.9 "g/cm"^3$، إذن $d = 0.9 < 1$ فلا يغوص بل *يطفو* فوق الماء.`,
					mark: '2.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

export const PHYSICS_TEMPLATES_1AM_T2: PhysicsParameterizedTemplate[] = [
	measurementsVolumeDensityTemplate,
	statesParticlesChangesTemplate,
	mixturesSeparationPurityTemplate,
	solutionConcentrationConservationTemplate,
	integrationWaterTreatmentTemplate,
	integrationKitchenLabMaterialsTemplate
];
