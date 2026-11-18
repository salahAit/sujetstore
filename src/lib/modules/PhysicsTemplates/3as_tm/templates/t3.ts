import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { buildIceTable, chemEquation, chemSpecies } from '../../chem-helpers';
import {
	savePhysicsSvgAsset,
	svgCircuitDiagram,
	svgPhysicsCurvePlot
} from '../../svg-physics';
import {
	adaptPhysicsTemplateForTrack,
	type Difficulty,
	type PhysicsGeneratedExerciseInstance,
	type PhysicsParameterizedTemplate,
	type QuizQuestionPayload
} from '../../types';
import { createSharedPhysicsTemplates3asT3 } from '../../secondary_shared_3as/templates/t3';
import {
	svgGalvanicCellDaniell,
	svgSpringPendulumHorizontal
} from '../lessons/t3';

export function buildMtmPhysicsTemplatesT3(
	track: '3as_tm' | '3as_math'
): PhysicsParameterizedTemplate[] {
	const isMathStream = track === '3as_math';
	const sharedT3 = createSharedPhysicsTemplates3asT3(track)
		.slice(0, 4)
		.map((tpl) => adaptPhysicsTemplateForTrack(tpl, track));

	// ─────────────────────────────────────────────────────────────────────────
	// 5. Stream-Exclusive (PHY-MTM): Galvanic Cell (الأعمدة الكهربائية) (4 pts)
	// ─────────────────────────────────────────────────────────────────────────
	const tplGalvanicCell: PhysicsParameterizedTemplate = {
		id: `phy_tpl_${track}_t3_galvanic_cell`,
		grade: track,
		trimesterId: 't3',
		domain: 'organic_chem',
		titleAr: 'دراسة العمود الكهربائي (التطور التلقائي، الجسر الملحي، وكمية الكهرباء)',
		curriculumLessonId: `phy_lesson_${track}_t3_cells_esterification_monitoring`,
		defaultPoints: 4,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const F = 96500; // C/mol
			const M_Cu = 63.5;
			const M_Zn = 65.4;
			const I_A = rng.pick([0.1, 0.2, 0.25, 0.4]);
			const dt_s = rng.pick([965, 1930, 3860]);
			const Q_C = roundTo(I_A * dt_s, 1);
			const n_e = roundTo(Q_C / F, 4);
			const x_mol = roundTo(n_e / 2, 5);
			const dm_Cu_mg = roundTo(x_mol * M_Cu * 1000, 1);
			const dm_Zn_mg = roundTo(x_mol * M_Zn * 1000, 1);
			const c1 = rng.pick([0.1, 0.2]);
			const c2 = rng.pick([0.1, 0.2]);
			const Qri = roundTo(c1 / c2, 2);

			const eqCell = chemEquation(
				[
					{ formula: 'Zn', state: 's' },
					{ formula: 'Cu^2+', state: 'aq' }
				],
				[
					{ formula: 'Zn^2+', state: 'aq' },
					{ formula: 'Cu', state: 's' }
				],
				{ reversible: true }
			);

			const iceCell = buildIceTable({
				equation: eqCell,
				speciesHeaders: [
					chemSpecies('Zn'),
					chemSpecies('Cu^2+'),
					chemSpecies('Zn^2+'),
					chemSpecies('Cu')
				],
				initial: [
					{ katex: '$n_0(\\ce{Zn})$', typst: '$n_0("Zn")$' },
					{ katex: `$${roundTo(c2 * 0.1, 3)}$`, typst: `$${roundTo(c2 * 0.1, 3)}$` },
					{ katex: `$${roundTo(c1 * 0.1, 3)}$`, typst: `$${roundTo(c1 * 0.1, 3)}$` },
					{ katex: '$n_0(\\ce{Cu})$', typst: '$n_0("Cu")$' }
				],
				intermediate: [
					{ katex: '$n_0(\\ce{Zn}) - x$', typst: '$n_0("Zn") - x$' },
					{ katex: `$${roundTo(c2 * 0.1, 3)} - x$`, typst: `$${roundTo(c2 * 0.1, 3)} - x$` },
					{ katex: `$${roundTo(c1 * 0.1, 3)} + x$`, typst: `$${roundTo(c1 * 0.1, 3)} + x$` },
					{ katex: '$n_0(\\ce{Cu}) + x$', typst: '$n_0("Cu") + x$' }
				],
				final: [
					{ katex: '$n_0(\\ce{Zn}) - x_f$', typst: '$........$' },
					{ katex: `$${roundTo(c2 * 0.1 - x_mol, 4)}$`, typst: '$........$' },
					{ katex: `$${roundTo(c1 * 0.1 + x_mol, 4)}$`, typst: '$........$' },
					{ katex: '$n_0(\\ce{Cu}) + x_f$', typst: '$........$' }
				],
				finalAnswers: [
					{ katex: '$n_0(\\ce{Zn}) - x_f$', typst: '$n_0("Zn") - x_f$' },
					{ katex: `$${roundTo(c2 * 0.1 - x_mol, 4)}$`, typst: `$${roundTo(c2 * 0.1 - x_mol, 4)}$` },
					{ katex: `$${roundTo(c1 * 0.1 + x_mol, 4)}$`, typst: `$${roundTo(c1 * 0.1 + x_mol, 4)}$` },
					{ katex: '$n_0(\\ce{Cu}) + x_f$', typst: '$n_0("Cu") + x_f$' }
				]
			});

			const cellUrl = savePhysicsSvgAsset(
				`phy_${track}_t3_cell_${difficulty}_s${seed}`,
				svgGalvanicCellDaniell
			);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${Q_C}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `يغذي عمود دانيال دارة خارجية بتيار كهربائي شدته الثابتة $I = ${I_A}\\text{ A}$ خلال مدة زمنية $\\Delta t = ${dt_s}\\text{ s}$. احسب كمية الكهرباء المنتجة $Q$ بوحدة الكولوم ($\\text{C}$).`,
					questionTextAr: 'احسب كمية الكهرباء $Q$ (بوحدة $\\text{C}$):',
					imageUrl: cellUrl,
					questionData: { answer: Q_C, displayTemplate: 'Q = ? C', variables: [], tolerance: 0.5 },
					explanation: `$Q = I \\cdot \\Delta t = ${I_A} \\times ${dt_s} = ${Q_C}\\text{ C}$.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${dm_Cu_mg}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `خلال اشتغال عمود الزنك-نحاس (${eqCell.katex}) مرت كمية كهرباء $Q = ${Q_C}\\text{ C}$. احسب كتلة النحاس المترسبة على المهبط بوحدة الميليغرام ($\\text{mg}$) ($F = 96\\,500\\text{ C/mol}$، $M(\\ce{Cu}) = 63.5\\text{ g/mol}$).`,
					questionTextAr: 'احسب كتلة النحاس المترسبة (بوحدة $\\text{mg}$):',
					imageUrl: cellUrl,
					questionData: { answer: dm_Cu_mg, displayTemplate: 'Δm(Cu) = ? mg', variables: [], tolerance: 1.0 },
					explanation: `$n(e^-) = \\frac{Q}{F} = ${n_e}\\text{ mol}$، وبما أن $\\ce{Cu^2+ + 2e- -> Cu}$ فإن $x = \\frac{n(e^-)}{2} = ${x_mol}\\text{ mol}$، ومنه $\\Delta m(\\ce{Cu}) = ${x_mol} \\times 63.5 = ${roundTo(dm_Cu_mg / 1000, 4)}\\text{ g} = ${dm_Cu_mg}\\text{ mg}$.`
				};
			} else {
				finalAnswer = '⊖ Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s) ⊕';
				const mcq = buildUniqueMcqOptions(
					'$\\ominus\\,\\ce{Zn(s) | Zn^2+(aq) || Cu^2+(aq) | Cu(s)}\\,\\oplus$',
					[
						{
							text: '$\\ominus\\,\\ce{Cu(s) | Cu^2+(aq) || Zn^2+(aq) | Zn(s)}\\,\\oplus$',
							diagnosticFeedback: 'بما أن $Q_{r,i} = ' + Qri + ' \\ll K = 10^{37}$ فالتفاعل يسير في الجهة المباشرة: الزنك هو المصعد ($-$) والنحاس هو المهبط ($+$).'
						},
						{
							text: '$\\oplus\\,\\ce{Zn(s) | Zn^2+(aq) || Cu^2+(aq) | Cu(s)}\\,\\ominus$',
							diagnosticFeedback: 'عكست الأقطاب: مسرى الزنك يتأكسد فهو القطب السالب ($-$) وليس الموجب.'
						},
						{
							text: '$\\ominus\\,\\ce{Zn^2+(aq) | Zn(s) || Cu(s) | Cu^2+(aq)}\\,\\oplus$',
							diagnosticFeedback: 'في الرمز الاصطلاحي يوضع المسرى الصلب في الطرفين الخارجيين.'
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `للتفاعل ${eqCell.katex} ثابت توازن $K = 10^{37}$ وكسر تفاعل ابتدائي $Q_{r,i} = ${Qri}$. ما الرمز الاصطلاحي الصحيح للعمود؟`,
					questionTextAr: 'اختر الرمز الاصطلاحي الصحيح للعمود:',
					imageUrl: cellUrl,
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `بما أن $Q_{r,i} = ${Qri} < K$ يتأكسد $\\ce{Zn}$ عند القطب السالب ($-$) وتُرجع $\\ce{Cu^2+}$ عند القطب الموجب ($+$).`
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `نركب عموداً كهربائياً يضم نصف عمود الزنك $"Zn"(s) / "Zn"^(2+)("aq")$ ($V_1 = 100 upright("mL"), C_1 = ${c1} upright("mol/L")$) ونصف عمود النحاس $"Cu"(s) / "Cu"^(2+)("aq")$ ($V_2 = 100 upright("mL"), C_2 = ${c2} upright("mol/L")$) موصولين بجسر ملحي من نترات البوتاسيوم $("K"^+ + "NO"_3^-)$.\nمعادلة التفاعل: ${eqCell.typst} ($K = 10^(37)$، $F = 96\\,500 upright("C/mol")$، $M("Cu") = 63.5 upright("g/mol")$، $M("Zn") = 65.4 upright("g/mol")$).`,
				content: [
					{
						type: 'columns',
						widths: ['1.25fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) احسب كسر التفاعل الابتدائي $Q_(r,i)$ وحدد جهة التطور التلقائي للعمود، ثم استنتج قطبية المسرَيين واكتب الرمز الاصطلاحي للعمود ووضّح دور الجسر الملحي.`,
								answer: `1) $Q_(r,i) = frac(["Zn"^(2+)]_0, ["Cu"^(2+)]_0) = frac(${c1}, ${c2}) = ${Qri} << K = 10^(37)$، فالجملة تتطور في الجهة المباشرة.\nالمصعد ($-$) هو مسرى الزنك (أكسدة: $"Zn" arrow.r "Zn"^(2+) + 2 e^-$)، والمهبط ($+$) هو مسرى النحاس (إرجاع: $"Cu"^(2+) + 2 e^- arrow.r "Cu"$).\nالرمز الاصطلاحي: $minus "Zn"(s) | "Zn"^(2+)("aq") || "Cu"^(2+)("aq") | "Cu"(s) plus$.\nالجسر الملحي يغلق الدارة ويضمن التعادل الكهربائي للمحلولين.`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: cellUrl,
								caption: 'مخطط العمود الكهربائي وجسره الملحي'
							}
						]
					},
					iceCell.typstBlock,
					{
						type: 'text',
						content: `2) يشتغل العمود لمدة $Delta t = ${dt_s} upright("s")$ مولداً تياراً شدته $I = ${I_A} upright("A")$. احسب كمية الكهرباء $Q$ وتقدم التفاعل $x$ خلال هذه المدة.`,
						answer: `2) $Q = I dot Delta t = ${I_A} times ${dt_s} = ${Q_C} upright("C")$.\n$n(e^-) = frac(Q, F) = frac(${Q_C}, 96500) = ${n_e} upright("mol")$، وبما أن $n(e^-) = 2 x$ فإن $x = ${x_mol} upright("mol")$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '3) استنتج تغير كتلة مسرى النحاس $Delta m("Cu")$ وتناقص كتلة مسرى الزنك $Delta m("Zn")$ بالميليغرام.',
						answer: `3) تترسب على المهبط كتلة $Delta m("Cu") = x dot M("Cu") = ${dm_Cu_mg} upright("mg")$، وتتآكل من المصعد كتلة $Delta m("Zn") = x dot M("Zn") = ${dm_Zn_mg} upright("mg")$.`,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: track,
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'قارن $Q_{r,i}$ مع $K$ لتحديد أي مسرى يتأكسد (المصعد $-$) وأيهما يُرجَع (المهبط $+$).',
					'اربط كمية الكهرباء بالتقدم: $Q = I\\Delta t = 2 x F$ لأن الإلكترونات المتبادلة عددها $2$.',
					'يزداد وزن المهبط (ترسّب النحاس) وينقص وزن المصعد (تآكل الزنك).'
				],
				solutionStepsAr: [
					`$Q_{r,i} = ${Qri} \\ll K \\implies$ تأكسد الزنك ($-$) وإرجاع النحاس ($+$).`,
					`$Q = ${Q_C}\\text{ C} \\implies x = ${x_mol}\\text{ mol}$.`,
					`$\\Delta m(\\ce{Cu}) = +${dm_Cu_mg}\\text{ mg}$ و $\\Delta m(\\ce{Zn}) = -${dm_Zn_mg}\\text{ mg}$.`
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 6. Stream-Exclusive (Unit 7): Mechanical Spring Pendulum (6 pts)
	// ─────────────────────────────────────────────────────────────────────────
	const tplMechanicalSpringPendulum: PhysicsParameterizedTemplate = {
		id: `phy_tpl_${track}_t3_mechanical_spring_pendulum`,
		grade: track,
		trimesterId: 't3',
		domain: 'oscillations',
		titleAr: 'الوحدة 7: الاهتزازات الميكانيكية الحرة (النواس المرن الأفقي)',
		curriculumLessonId: `phy_lesson_${track}_t3_mechanical_oscillations_pendulums`,
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const m_g = rng.pick([100, 200, 250, 400]);
			const m_kg = m_g / 1000;
			const k = rng.pick([10, 20, 25, 40]);
			const omega0 = roundTo(Math.sqrt(k / m_kg), 2);
			const T0 = roundTo((2 * Math.PI) / omega0, 3);
			const Xm_cm = rng.pick([4, 5, 6]);
			const Xm_m = Xm_cm / 100;
			const Em_mJ = roundTo(0.5 * k * Xm_m * Xm_m * 1000, 2);
			const vmax = roundTo(omega0 * Xm_m, 3);

			const springUrl = savePhysicsSvgAsset(
				`phy_${track}_t3_spring_diag_${difficulty}_s${seed}`,
				svgSpringPendulumHorizontal
			);
			const xtSvg = svgPhysicsCurvePlot({
				title: 'الاهتزاز الجيبي الحر x(t) = X_m cos(ω₀ t)',
				xMin: 0,
				xMax: roundTo(2 * T0, 2),
				yMin: -Xm_cm - 2,
				yMax: Xm_cm + 2,
				xStep: roundTo(T0 / 2, 2),
				yStep: 2,
				xLabel: 't (s)',
				yLabel: 'x (cm)',
				curves: [
					{
						fn: (t) => Xm_cm * Math.cos(omega0 * t),
						color: '#2563eb',
						label: 'x(t) (غير متخامد)'
					},
					{
						fn: (t) => Xm_cm * Math.exp(-0.5 * t) * Math.cos(omega0 * t),
						color: '#dc2626',
						dashed: true,
						label: 'x(t) (مع احتكاك)'
					}
				],
				points: [{ x: T0, y: Xm_cm, label: `T₀ = ${T0} s`, color: '#059669' }]
			});
			const xtUrl = savePhysicsSvgAsset(`phy_${track}_t3_spring_xt_${difficulty}_s${seed}`, xtSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${T0}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `نواس مرن أفقي كتلته $m = ${m_g}\\text{ g}$ وثابت مرونته $k = ${k}\\text{ N/m}$ يتحرك دون احتكاك. احسب دوره الخاص $T_0$ بالثانية ($\\text{s}$).`,
					questionTextAr: 'احسب الدور الخاص $T_0$ (بوحدة $\\text{s}$):',
					imageUrl: springUrl,
					questionData: { answer: T0, displayTemplate: 'T₀ = ? s', variables: [], tolerance: 0.03 },
					explanation: `$T_0 = 2\\pi\\sqrt{\\frac{m}{k}} = 2\\pi\\sqrt{\\frac{${m_kg}}{${k}}} \\approx ${T0}\\text{ s}$.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${Em_mJ}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `نزيح النواس المرن السابق ($k = ${k}\\text{ N/m}$) عن موضع توازنه بمقدار $X_m = ${Xm_cm}\\text{ cm}$ ونتركه بدون سرعة ابتدائية. احسب الطاقة الميكانيكية الكلية $E_m$ بوحدة الميليجول ($\\text{mJ}$).`,
					questionTextAr: 'احسب الطاقة الميكانيكية الكلية $E_m$ (بوحدة $\\text{mJ}$):',
					imageUrl: xtUrl,
					questionData: { answer: Em_mJ, displayTemplate: 'E_m = ? mJ', variables: [], tolerance: 0.2 },
					explanation: `$E_m = \\frac{1}{2} k X_m^2 = 0.5 \\times ${k} \\times (${Xm_m})^2 = ${roundTo(Em_mJ / 1000, 5)}\\text{ J} = ${Em_mJ}\\text{ mJ}$.`
				};
			} else {
				finalAnswer = `${vmax} m/s`;
				const mcq = buildUniqueMcqOptions(
					`$${vmax}\\text{ m/s}$`,
					[
						{
							text: `$${roundTo(vmax / 2, 3)}\\text{ m/s}$`,
							diagnosticFeedback: 'تذكّر أن $v_{\\max} = \\omega_0 X_m = \\sqrt{\\frac{k}{m}} X_m$.'
						},
						{
							text: `$${roundTo(omega0 * Xm_cm, 2)}\\text{ m/s}$`,
							diagnosticFeedback: 'نسيت تحويل السعة $X_m$ من السنتيمتر إلى المتر!'
						},
						{
							text: '$0\\text{ m/s}$',
							diagnosticFeedback: 'تنعدم السرعة عند الطرفين $\\pm X_m$ وتبلغ قيمتها العظمى عند $x = 0$.'
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما السرعة العظمى $v_{\\max}$ للنواس المرن ($m = ${m_g}\\text{ g}$, $k = ${k}\\text{ N/m}$, $X_m = ${Xm_cm}\\text{ cm}$) عند مروره بموضع التوازن $x = 0$؟`,
					questionTextAr: 'اختر قيمة السرعة العظمى $v_{\\max}$:',
					imageUrl: xtUrl,
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `$\\omega_0 = \\sqrt{\\frac{${k}}{${m_kg}}} = ${omega0}\\text{ rad/s}$، ومنه $v_{\\max} = \\omega_0 X_m = ${omega0} \\times ${Xm_m} = ${vmax}\\text{ m/s}$.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `نعتبر نواساً مرناً أفقياً يتكون من جسم صلب كتلته $m = ${m_g} upright("g")$ مثبت بنابض مرن ثابت مرونته $k = ${k} upright("N/m")$. نزيح الجسم عن موضع توازنه $O$ بمقدار $X_m = ${Xm_cm} upright("cm")$ ونحرره بدون سرعة ابتدائية عند $t = 0$.`,
				content: [
					{
						type: 'columns',
						widths: ['1fr', '1.1fr'],
						children: [
							{
								type: 'image',
								src: springUrl,
								caption: 'تمثيل النواس المرن الأفقي وقوة الإرجاع'
							},
							{
								type: 'image',
								src: xtUrl,
								caption: 'منحنى الفاصلة $x(t)$ (الحالتان الحرة والمتخامدة)'
							}
						]
					},
					{
						type: 'text',
						content: '1) بتطبيق القانون الثاني لنيوتن في حالة إهمال الاحتكاكات، أوجد المعادلة التفاضلية للحركة، ثم استنتج عبارة الدور الخاص $T_0$ واحسب قيمته والنبض الخاص $omega_0$.',
						answer: `1) $-k x = m dot.double(x) arrow.r.double dot.double(x) + frac(k, m) x = 0$.\n$omega_0 = sqrt(frac(k, m)) = ${omega0} upright("rad/s")$، و $T_0 = 2 pi sqrt(frac(m, k)) approx ${T0} upright("s")$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: '2) عيّن الحل الجيبي $x(t) = X_m cos(omega_0 t + phi)$ من الشروط الابتدائية، ثم استنتج السرعة العظمى $v_max$ عند المرور بموضع التوازن.',
						answer: `2) عند $t=0$: $x(0) = X_m cos phi = X_m$ و $v(0) = 0 arrow.r.double phi = 0$.\nإذن $x(t) = ${Xm_m} cos(${omega0} t) upright(" (m)")$.\n$v_max = omega_0 X_m = ${vmax} upright("m/s")$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: isMathStream
							? '3) أثبت تحليلياً أن الطاقة الميكانيكية $E_m = frac(1, 2) m dot(x)^2 + frac(1, 2) k x^2$ محفوظة باشتقاقها بالنسبة للزمن، ثم احسب قيمتها بـ $upright("mJ")$. وما أثر الاحتكاك على المنحنى؟'
							: '3) عبّر عن الطاقة الميكانيكية الكلية $E_m$ واحسب قيمتها بوحدة $upright("mJ")$، ثم فسّر تغيّر المنحنى المتقطع عند وجود احتكاك.',
						answer: isMathStream
							? `3) $frac(dif E_m, dif t) = m dot(x) dot.double(x) + k x dot(x) = dot(x)(m dot.double(x) + k x) = 0 arrow.r.double E_m = upright("cte")$.\n$E_m = frac(1, 2) k X_m^2 = ${Em_mJ} upright("mJ")$. بوجود احتكاك تتناقص السعة أسياً بفعل تبدد الطاقة الميكانيكية.`
							: `3) $E_m = frac(1, 2) k X_m^2 = ${Em_mJ} upright("mJ")$. عند وجود احتكاك تتناقص سعة الاهتزازات تدريجياً بفعل تبدد الطاقة إلى حرارة.`,
						mark: '2'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: track,
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكر تحويل الكتلة إلى الكيلوغرام ($\\text{kg}$) والسعة إلى المتر ($\\text{m}$).',
					'عند المرور بموضع التوازن ($x = 0$) تبلغ السرعة قيمتها العظمى $v_{\\max} = \\omega_0 X_m$.',
					'الطاقة الميكانيكية الكلية هي $E_m = \\frac{1}{2}k X_m^2 = \\frac{1}{2} m v_{\\max}^2$.'
				],
				solutionStepsAr: [
					`$\\omega_0 = ${omega0}\\text{ rad/s}$ و $T_0 \\approx ${T0}\\text{ s}$.`,
					`$v_{\\max} = ${vmax}\\text{ m/s}$.`,
					`$E_m = ${Em_mJ}\\text{ mJ}$.`
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 7. Stream-Exclusive (Unit 7): Electrical (R,L,C) Oscillations (6 pts, isExperimental)
	// ─────────────────────────────────────────────────────────────────────────
	const tplRlcOscillationsExp: PhysicsParameterizedTemplate = {
		id: `phy_tpl_${track}_t3_rlc_electrical_oscillations`,
		grade: track,
		trimesterId: 't3',
		domain: 'oscillations',
		titleAr: 'التمرين التجريبي (الوحدة 7): الدارة المهتزة (R, L, C) الحرة والقسرية',
		curriculumLessonId: `phy_lesson_${track}_t3_rlc_electrical_oscillations`,
		defaultPoints: 6,
		isExperimental: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const E = rng.pick([5, 6, 10]);
			const C_uF = rng.pick([4, 10, 25]);
			const L = rng.pick([0.1, 0.25, 0.4]);
			const Rtot = rng.pick([10, 15, 20]);
			const omega0 = 1 / Math.sqrt(L * C_uF * 1e-6);
			const T0_ms = roundTo((2 * Math.PI) / omega0 * 1000, 2);
			const f0_Hz = roundTo(omega0 / (2 * Math.PI), 1);
			const E0_mJ = roundTo(0.5 * C_uF * 1e-6 * E * E * 1000, 3);
			const alpha = Rtot / (2 * L); // s^-1
			const uPeak1 = roundTo(E * Math.exp(-alpha * (T0_ms / 1000)), 2);
			const E1_mJ = roundTo(0.5 * C_uF * 1e-6 * uPeak1 * uPeak1 * 1000, 3);
			const dE_mJ = roundTo(E0_mJ - E1_mJ, 3);
			const Qfactor = roundTo((1 / Rtot) * Math.sqrt(L / (C_uF * 1e-6)), 1);

			const rlcCircSvg = svgCircuitDiagram({
				kind: 'rlc',
				labels: {
					e: `E = ${E} V`,
					c: `C = ${C_uF} μF`,
					r: 'R',
					l: `(L=${L}H, r)`,
					switchLabel: 'K'
				}
			});
			const rlcPlotSvg = svgPhysicsCurvePlot({
				title: 'الاهتزاز شبه الدوري u_C(t) في الدارة (R, L, C)',
				xMin: 0,
				xMax: roundTo(5 * T0_ms, 1),
				yMin: -Math.ceil(E * 1.1),
				yMax: Math.ceil(E * 1.1),
				xStep: T0_ms,
				yStep: roundTo(E / 2, 1),
				xLabel: 't (ms)',
				yLabel: 'u_C (V)',
				curves: [
					{
						fn: (t) =>
							E * Math.exp(-alpha * (t / 1000)) * Math.cos((2 * Math.PI * t) / T0_ms),
						color: '#2563eb',
						label: 'u_C(t) شبه دوري'
					},
					{
						fn: (t) => E * Math.exp(-alpha * (t / 1000)),
						color: '#dc2626',
						dashed: true,
						label: 'الغلاف'
					}
				],
				points: [
					{ x: 0, y: E, label: `E = ${E} V`, color: '#dc2626' },
					{ x: T0_ms, y: uPeak1, label: `(T≈${T0_ms} ms, ${uPeak1} V)`, color: '#059669' }
				]
			});
			const rlcCircUrl = savePhysicsSvgAsset(`phy_${track}_t3_rlc_circ_${difficulty}_s${seed}`, rlcCircSvg);
			const rlcPlotUrl = savePhysicsSvgAsset(`phy_${track}_t3_rlc_plot_${difficulty}_s${seed}`, rlcPlotSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${T0_ms}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `تُفرغ مكثفة سعتها $C = ${C_uF}\\text{ }\\mu\\text{F}$ في وشيعة ذاتيتها $L = ${L}\\text{ H}$ ومقاومتها مهملة. احسب الدور الخاص $T_0$ بوحدة الميليثانية ($\\text{ms}$).`,
					questionTextAr: 'احسب الدور الخاص $T_0$ (بوحدة $\\text{ms}$):',
					imageUrl: rlcCircUrl,
					questionData: { answer: T0_ms, displayTemplate: 'T₀ = ? ms', variables: [], tolerance: 0.25 },
					explanation: `$T_0 = 2\\pi\\sqrt{LC} = 2\\pi\\sqrt{${L} \\times ${C_uF}\\times 10^{-6}} \\approx ${T0_ms}\\text{ ms}$.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${dE_mJ}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `في الدارة $(R, L, C)$ الموضحة ($C = ${C_uF}\\text{ }\\mu\\text{F}$)، ينخفض التوتر بين طرفي المكثفة من $E = ${E}\\text{ V}$ عند $t=0$ إلى $u_C(T) = ${uPeak1}\\text{ V}$ بعد شبه دور واحد. احسب الطاقة المتبددة بفعل جول $\\Delta E$ خلال شبه الدور الأول بوحدة الميليجول ($\\text{mJ}$).`,
					questionTextAr: 'احسب الطاقة المتبددة $\\Delta E$ (بوحدة $\\text{mJ}$):',
					imageUrl: rlcPlotUrl,
					questionData: { answer: dE_mJ, displayTemplate: '|ΔE| = ? mJ', variables: [], tolerance: 0.02 },
					explanation: `عند القمم $i = 0$ فتنحصر الطاقة في المكثفة: $|\\Delta E| = \\frac{1}{2} C (E^2 - u_C(T)^2) = ${E0_mJ} - ${E1_mJ} = ${dE_mJ}\\text{ mJ}$.`
				};
			} else {
				finalAnswer = `${Qfactor}`;
				const mcq = buildUniqueMcqOptions(
					`$Q = ${Qfactor}$ (وتردد التجاوب $f_0 = ${f0_Hz}\\text{ Hz}$)`,
					[
						{
							text: `$Q = ${roundTo(Qfactor * 2, 1)}$ (وتردد التجاوب $f_0 = ${f0_Hz}\\text{ Hz}$)`,
							diagnosticFeedback: 'راجع عبارة عامل الجودة: $Q = \\frac{1}{R_t}\\sqrt{\\frac{L}{C}}$.'
						},
						{
							text: `$Q = ${roundTo(1 / Qfactor, 3)}$ (وتردد التجاوب $f_0 = ${f0_Hz}\\text{ Hz}$)`,
							diagnosticFeedback: 'قلبت عبارة عامل الجودة $Q = \\frac{L\\omega_0}{R_t}$.'
						},
						{
							text: `$Q = ${Qfactor}$ (وتردد التجاوب $f_0 = ${roundTo(f0_Hz / 2, 1)}\\text{ Hz}$)`,
							diagnosticFeedback: 'تردد التجاوب $f_0 = \\frac{1}{T_0} = ${f0_Hz}\\text{ Hz}$.'
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `نُخضع نفس الدارة ($L = ${L}\\text{ H}$, $C = ${C_uF}\\text{ }\\mu\\text{F}$, مقاومة كلية $R_t = ${Rtot}\\text{ }\\Omega$) لتوتر جيبي قسري. ما قيمة عامل الجودة $Q$ وتردد التجاوب $f_0$؟`,
					questionTextAr: 'اختر عامل الجودة $Q$ وتردد التجاوب $f_0$:',
					imageUrl: rlcCircUrl,
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `$f_0 = \\frac{1}{2\\pi\\sqrt{LC}} \\approx ${f0_Hz}\\text{ Hz}$، و $Q = \\frac{1}{R_t}\\sqrt{\\frac{L}{C}} \\approx ${Qfactor}$.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `التمرين التجريبي: نشحن مكثفة سعتها $C = ${C_uF} mu upright("F")$ تحت توتر $E = ${E} upright("V")$، ثم نفرغها عند $t = 0$ في وشيعة $(L = ${L} upright("H"), r)$ وناقل أومي $R$ (المقاومة الكلية للدارة $R_t = R + r = ${Rtot} upright(" ") Omega$). نسجل التوتر $u_C(t)$ براسم اهتزاز ذي ذاكرة.`,
				content: [
					{
						type: 'columns',
						widths: ['1fr', '1.1fr'],
						children: [
							{
								type: 'image',
								src: rlcCircUrl,
								caption: 'الدارة الكهربائية المهتزة $(R, L, C)$'
							},
							{
								type: 'image',
								src: rlcPlotUrl,
								caption: 'منحنى الاهتزاز شبه الدوري $u_C(t)$'
							}
						]
					},
					{
						type: 'text',
						content: '1) سمِّ نظام الاهتزاز الظاهر في المنحنى، واذكر الشرط التجريبي للحصول على النظام اللادوري. ثم اكتب المعادلة التفاضلية للشحنة $q(t)$ والتوتر $u_C(t)$.',
						answer: '1) النظام الظاهر هو النظام **شبه الدوري** (لتخامد السعة تدريجياً). نحصل على النظام اللادوري عندما تتجاوز المقاومة الكلية القيمة الحرجة $R_t >= 2 sqrt(L/C)$.\nالمعادلة التفاضلية: $dot.double(q) + frac(R_t, L) dot(q) + frac(1, LC) q = 0$، وبالمثل $frac(dif^2 u_C, dif t^2) + frac(R_t, L) frac(dif u_C, dif t) + frac(1, LC) u_C = 0$.',
						mark: '2'
					},
					{
						type: 'text',
						content: `2) قارن الدور الخاص $T_0 = 2 pi sqrt(LC)$ مع شبه الدور $T$، ثم احسب الطاقة الكهربائية المتبددة $|Delta E|$ خلال شبه الدور الأول (من $E = ${E} upright("V")$ إلى $u_C(T) = ${uPeak1} upright("V")$).`,
						answer: `2) $T_0 = 2 pi sqrt(${L} times ${C_uF} times 10^(-6)) approx ${T0_ms} upright("ms") approx T$.\nعند $t=0$ و $t=T$ ينعدم التيار ($i=0$)، إذن $|Delta E| = frac(1, 2) C (E^2 - u_C(T)^2) = ${E0_mJ} - ${E1_mJ} = ${dE_mJ} upright("mJ")$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) كيف نغذي هذه الدارة للحصول على اهتزازات جيبية غير متخامدة؟ وما تردد التجاوب $f_0$ وعامل الجودة $Q$ في النظام القسري؟`,
						answer: `3) نغذي الدارة بدارة مقاومة سالبة (مضخم عملياتي) تولد توتراً $u_g = R_0 i$ مع $R_0 = R_t$ لتعويض الطاقة الضائعة بفعل جول.\nفي النظام القسري: $f_0 = frac(1, T_0) approx ${f0_Hz} upright("Hz")$، وعامل الجودة $Q = frac(1, R_t) sqrt(frac(L, C)) approx ${Qfactor}$.`,
						mark: '2'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: track,
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكّر التحويل $1\\text{ }\\mu\\text{F} = 10^{-6}\\text{ F}$ عند حساب $T_0 = 2\\pi\\sqrt{LC}$.',
					'عند القمم المحلية للمنحنى $u_C(t)$ ينعدم التيار $i = C\\frac{du_C}{dt} = 0$ فتكون الطاقة مغلفة في المكثفة فقط.',
					'عامل الجودة للدارة القسرية هو $Q = \\frac{f_0}{\\Delta f} = \\frac{1}{R_t}\\sqrt{\\frac{L}{C}}$.'
				],
				solutionStepsAr: [
					`$T_0 = 2\\pi\\sqrt{LC} \\approx ${T0_ms}\\text{ ms}$.`,
					`الطاقة المتبددة في شبه الدور الأول: $|\\Delta E| = ${dE_mJ}\\text{ mJ}$.`,
					`التجاوب القسري: $f_0 \\approx ${f0_Hz}\\text{ Hz}$ و $Q \\approx ${Qfactor}$.`
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 8. Stream-Exclusive (PHY-MTM): T3 BAC Integration (ONEC 4+4+6+6, 6 pts)
	// ─────────────────────────────────────────────────────────────────────────
	const tplMtmIntegrationBacT3: PhysicsParameterizedTemplate = {
		id: `phy_tpl_${track}_t3_integration_bac_mtm`,
		grade: track,
		trimesterId: 't3',
		domain: 'integration',
		titleAr:
			track === '3as_tm'
				? 'الموضوع الإدماجي للبكالوريا — تقني رياضي (الأعمدة + الوحدة 7 RLC والنواس المرن)'
				: 'الموضوع الإدماجي للبكالوريا — رياضيات (التحليل التفاضلي للاهتزازات + الأعمدة)',
		curriculumLessonId: `phy_lesson_${track}_t3_integration`,
		defaultPoints: 6,
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			// Analogy between Spring Pendulum and Ideal LC circuit
			const m_kg = rng.pick([0.2, 0.4]);
			const k = rng.pick([20, 40]);
			const L = rng.pick([0.1, 0.2]);
			const C_uF = rng.pick([10, 25]);
			const T0_mech = roundTo(2 * Math.PI * Math.sqrt(m_kg / k), 3);
			const T0_elec_ms = roundTo(2 * Math.PI * Math.sqrt(L * C_uF * 1e-6) * 1000, 2);
			const E_cap = rng.pick([6, 12]);
			const I_max = roundTo(E_cap * Math.sqrt((C_uF * 1e-6) / L), 3);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${I_max}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `دارة $(L, C)$ مثالية ذاتيتها $L = ${L}\\text{ H}$ وسعتها $C = ${C_uF}\\text{ }\\mu\\text{F}$، شُحنت المكثفة تحت $E = ${E_cap}\\text{ V}$ ثم أُغلقت الدارة. احسب شدة التيار الأعظمية $I_{\\max}$ بالأمبير ($\\text{A}$).`,
					questionTextAr: 'احسب شدة التيار الأعظمية $I_{\\max}$ (بوحدة $\\text{A}$):',
					questionData: { answer: I_max, displayTemplate: 'I_max = ? A', variables: [], tolerance: 0.01 },
					explanation: `بانحفاظ الطاقة الكلية: $\\frac{1}{2} L I_{\\max}^2 = \\frac{1}{2} C E^2 \\implies I_{\\max} = E\\sqrt{\\frac{C}{L}} = ${E_cap}\\sqrt{\\frac{${C_uF}\\times 10^{-6}}{${L}}} \\approx ${I_max}\\text{ A}$.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${T0_elec_ms}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `احسب الدور الخاص $T_0$ لدارة $(L, C)$ مثالية حيث $L = ${L}\\text{ H}$ و $C = ${C_uF}\\text{ }\\mu\\text{F}$ بوحدة الميليثانية ($\\text{ms}$).`,
					questionTextAr: 'احسب الدور الخاص $T_0$ (بوحدة $\\text{ms}$):',
					questionData: { answer: T0_elec_ms, displayTemplate: 'T₀ = ? ms', variables: [], tolerance: 0.2 },
					explanation: `$T_0 = 2\\pi\\sqrt{LC} = 2\\pi\\sqrt{${L} \\times ${C_uF}\\times 10^{-6}} \\approx ${T0_elec_ms}\\text{ ms}$.`
				};
			} else {
				finalAnswer = 'L ↔ m و 1/C ↔ k و i ↔ v';
				const mcq = buildUniqueMcqOptions(
					'توافق $L$ الكتلة $m$، وتوافق $\\frac{1}{C}$ ثابت المرونة $k$، ويوافق التيار $i$ السرعة $v$',
					[
						{
							text: 'توافق $C$ الكتلة $m$، وتوافق $L$ ثابت المرونة $k$',
							diagnosticFeedback: 'قارن المعادلتين $\\ddot{q} + \\frac{1}{LC}q = 0$ و $\\ddot{x} + \\frac{k}{m}x = 0$، والطاقتين $\\frac{1}{2}Li^2 \\leftrightarrow \\frac{1}{2}mv^2$.'
						},
						{
							text: 'توافق الشحنة $q$ السرعة $v$، ويوافق التيار $i$ الفاصلة $x$',
							diagnosticFeedback: 'بما أن $i = \\dot{q}$ و $v = \\dot{x}$ فإن $q \\leftrightarrow x$ و $i \\leftrightarrow v$.'
						},
						{
							text: 'توافق المقاومة $R$ ثابت المرونة $k$',
							diagnosticFeedback: 'المقاومة $R$ تبدد الطاقة فتوافق معامل الاحتكاك $\\lambda$ وليس ثابت المرونة $k$.'
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: 'في التطابق ميكانيك — كهرباء بين النواس المرن الأفقي والدارة $(R, L, C)$، ما المطابقة الصحيحة؟',
					questionTextAr: 'اختر المطابقة الصحيحة بين الميكانيك والكهرباء:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: 'من تماثل المعادلات التفاضلية وعبارات الطاقة: $x \\leftrightarrow q$، $v \\leftrightarrow i$، $m \\leftrightarrow L$، و $k \\leftrightarrow \\frac{1}{C}$.'
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: `الموضوع التكاملي الشامل — ${track === '3as_tm' ? 'تقني رياضي (معامل 5)' : 'رياضيات (معامل 6)'}`,
				points: this.defaultPoints,
				instruction: `تمرين بكالوريا متكامل (وفق هيكلة ONEC 4+4+6+6، المدة 4 سا و 30 د) يربط التطورات المهتزة الميكانيكية والكهربائية عبر التطابق ميكانيك-كهرباء.`,
				content: [
					{
						type: 'text',
						content: `*الجزء الأول (3 نقاط — الاهتزاز الكهربائي المثالي LC):* نشحن مكثفة $C = ${C_uF} mu upright("F")$ تحت توتر $E = ${E_cap} upright("V")$ ثم نصلها بوشيعة مثالية ذاتيتها $L = ${L} upright("H")$.\n1) اكتب المعادلة التفاضلية للشحنة $q(t)$ واستنتج عبارة الدور الخاص $T_0$ واحسبه بـ $upright("ms")$.\n2) بتطبيق انحفاظ الطاقة الكلية $E_t = E_C + E_L$، احسب الشدة العظمى للتيار $I_max$.`,
						answer: `1) $dot.double(q) + frac(1, LC) q = 0 arrow.r.double T_0 = 2 pi sqrt(LC) approx ${T0_elec_ms} upright("ms")$.\n2) $frac(1, 2) L I_max^2 = frac(1, 2) C E^2 arrow.r.double I_max = E sqrt(frac(C, L)) approx ${I_max} upright("A")$.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `*الجزء الثاني (3 نقاط — النواس المرن والتطابق):* ندرس نواساً مرناً أفقياً ($m = ${m_kg} upright("kg")$, $k = ${k} upright("N/m")$).\n1) اكتب المعادلة التفاضلية لحركته واحسب دوره الخاص $T_(0,"mech")$.\n2) شكّل جدول التطابق ميكانيك-كهرباء بين المقادير $(x, v, m, k)$ وما يوافقها في الدارة $(L, C)$${isMathStream ? '، مع إثبات أن الطاقة الكلية في النظامين تحقق $frac(dif E_t, dif t) = 0$.' : '.'}`,
						answer: `1) $dot.double(x) + frac(k, m) x = 0 arrow.r.double T_(0,"mech") = 2 pi sqrt(frac(m, k)) approx ${T0_mech} upright("s")$.\n2) التطابق: $x arrow.l.r q$، $v arrow.l.r i$، $m arrow.l.r L$، $k arrow.l.r frac(1, C)$.${isMathStream ? '\nالبرهان التحليلي: باشتقاق $E_t = frac(1, 2) L dot(q)^2 + frac(q^2, 2C)$ نجد $frac(dif E_t, dif t) = dot(q)(L dot.double(q) + frac(q, C)) = 0$.' : ''}`,
						mark: '3'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: track,
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكر انحفاظ الطاقة في الدارة المثالية $(L, C)$: $\\frac{1}{2}CE^2 = \\frac{1}{2}LI_{\\max}^2$.',
					'قارن معاملات المعادلتين التفاضليتين من الرتبة الثانية لاستنتاج التطابق.',
					'انتبه إلى وحدات الدور: $\\text{ms}$ في الكهرباء و $\\text{s}$ في الميكانيك.'
				],
				solutionStepsAr: [
					`الدور الكهربائي $T_0 \\approx ${T0_elec_ms}\\text{ ms}$ و $I_{\\max} \\approx ${I_max}\\text{ A}$.`,
					`الدور الميكانيكي $T_{0,\\text{mech}} \\approx ${T0_mech}\\text{ s}$.`,
					'التطابق: $x \\leftrightarrow q$، $v \\leftrightarrow i$، $m \\leftrightarrow L$، $k \\leftrightarrow 1/C$.'
				],
				finalAnswer
			};
		}
	};

	return [
		...sharedT3,
		tplGalvanicCell,
		tplMechanicalSpringPendulum,
		tplRlcOscillationsExp,
		tplMtmIntegrationBacT3
	];
}

export const PHYSICS_TEMPLATES_3AS_TM_T3: PhysicsParameterizedTemplate[] =
	buildMtmPhysicsTemplatesT3('3as_tm');
