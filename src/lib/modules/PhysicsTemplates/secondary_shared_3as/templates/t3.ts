import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import {
	buildIceTable,
	chemEquation,
	chemSpecies,
	nuclearEquation,
	nuclide,
	nuclideInner
} from '../../chem-helpers';
import {
	savePhysicsSvgAsset,
	svgNuclearEnergyDiagram,
	svgPhysicsCurvePlot
} from '../../svg-physics';
import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate,
	PhysicsSecondaryTrackId,
	QuizQuestionPayload
} from '../../types';

type TrackTag = PhysicsSecondaryTrackId | '3as_shared';

function makeTrackMeta(track: TrackTag) {
	const grade: PhysicsSecondaryTrackId = track === '3as_shared' ? '3as_se' : track;
	const lessonPrefix = `phy_lesson_${track === '3as_shared' ? '3as_shared' : track}`;
	return { grade, lessonPrefix };
}

export function createSharedPhysicsTemplates3asT3(
	track: TrackTag = '3as_shared'
): PhysicsParameterizedTemplate[] {
	const { grade, lessonPrefix } = makeTrackMeta(track);
	const nuclearLessonId =
		track === '3as_tm' || track === '3as_math'
			? `${lessonPrefix}_t3_nuclear_radioactivity_energy`
			: `${lessonPrefix}_t3_radioactivity_decay_law`;
	const nuclearEnergyLessonId =
		track === '3as_tm' || track === '3as_math'
			? `${lessonPrefix}_t3_nuclear_radioactivity_energy`
			: `${lessonPrefix}_t3_nuclear_fission_fusion_energy`;
	const esterLessonId =
		track === '3as_tm' || track === '3as_math'
			? `${lessonPrefix}_t3_cells_esterification_monitoring`
			: `${lessonPrefix}_t3_spontaneous_evolution_esterification`;

	// ─────────────────────────────────────────────────────────────────────────
	// 1. Radioactive Decay Law & Carbon-14 Dating (6 pts)
	// ─────────────────────────────────────────────────────────────────────────
	const tplNuclearDecayDating: PhysicsParameterizedTemplate = {
		id: `phy_tpl_3as_shared_t3_nuclear_decay_dating`,
		grade,
		trimesterId: 't3',
		domain: 'nuclear',
		titleAr: 'النشاط الإشعاعي، قانون التناقص، والتأريخ بالكربون 14',
		curriculumLessonId: nuclearLessonId,
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const tHalf = 5730; // years for C-14
			const lambdaPerYear = Math.LN2 / tHalf;
			const A0 = rng.pick([16, 20, 24, 32]); // Bq
			const ratioChoice = rng.pick([
				{ factor: 0.25, label: '25%', age: 2 * tHalf },
				{ factor: 0.125, label: '12.5%', age: 3 * tHalf },
				{ factor: 0.4, label: '40%', age: Math.round((tHalf / Math.LN2) * Math.log(1 / 0.4)) },
				{ factor: 0.3, label: '30%', age: Math.round((tHalf / Math.LN2) * Math.log(1 / 0.3)) }
			]);
			const At = roundTo(A0 * ratioChoice.factor, 2);
			const age = ratioChoice.age;
			const tauYears = Math.round(1 / lambdaPerYear);

			const eqC14 = nuclearEquation(
				[{ A: 14, Z: 6, symbol: 'C' }],
				[
					{ A: 14, Z: 7, symbol: 'N' },
					{ A: 0, Z: -1, symbol: 'e' }
				]
			);

			const decaySvg = svgPhysicsCurvePlot({
				title: 'منحنى التناقص الإشعاعي للنشاط A(t) لعينة من ¹⁴C',
				xMin: 0,
				xMax: 24,
				yMin: 0,
				yMax: Math.ceil(A0 * 1.15),
				xStep: 4,
				yStep: roundTo(A0 / 4, 1),
				xLabel: 't (10³ ans)',
				yLabel: 'A (Bq)',
				curves: [
					{
						fn: (t) => A0 * Math.exp((-Math.LN2 * t) / 5.73),
						color: '#2563eb',
						label: 'A(t)'
					}
				],
				dashedGuides: [
					{ x1: 0, y1: A0 / 2, x2: 5.73, y2: A0 / 2, color: '#059669' },
					{ x1: 5.73, y1: 0, x2: 5.73, y2: A0 / 2, color: '#059669' },
					{ x1: 0, y1: At, x2: roundTo(age / 1000, 2), y2: At, color: '#dc2626' },
					{ x1: roundTo(age / 1000, 2), y1: 0, x2: roundTo(age / 1000, 2), y2: At, color: '#dc2626' }
				],
				points: [
					{ x: 5.73, y: A0 / 2, label: 't₁/₂ = 5730 ans', color: '#059669' },
					{ x: roundTo(age / 1000, 2), y: At, label: `t ≈ ${age} ans`, color: '#dc2626' }
				]
			});
			const decayUrl = savePhysicsSvgAsset(`phy_${track}_t3_c14_${difficulty}_s${seed}`, decaySvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${tauYears}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `نصف عمر الكربون المشع ${nuclide(14, 6, 'C').katex} هو $t_{1/2} = ${tHalf}\\text{ ans}$. احسب ثابت الزمن $\\tau$ بالسنوات (مقرباً إلى أقرب عدد صحيح، $\\ln 2 = 0.693$).`,
					questionTextAr: 'احسب ثابت الزمن $\\tau$ (بالسنوات):',
					imageUrl: decayUrl,
					questionData: { answer: tauYears, displayTemplate: 'τ = ? ans', variables: [], tolerance: 20 },
					explanation: `$\\tau = \\frac{t_{1/2}}{\\ln 2} = \\frac{5730}{0.693} \\approx ${tauYears}\\text{ ans}$.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${age}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `قاس مخبر آثار نشاط عينة خشبية قديمة فوجد $A(t) = ${At}\\text{ Bq}$، بينما يبلغ نشاط عينة حديثة مماثلة $A_0 = ${A0}\\text{ Bq}$ ($t_{1/2} = ${tHalf}\\text{ ans}$). احسب عمر العينة الخشبية بالسنوات.`,
					questionTextAr: 'احسب عمر العينة $t$ (بالسنوات):',
					imageUrl: decayUrl,
					questionData: { answer: age, displayTemplate: 't = ? ans', variables: [], tolerance: 120 },
					explanation: `$A(t) = A_0 e^{-\\lambda t} \\implies t = \\frac{t_{1/2}}{\\ln 2}\\ln\\left(\\frac{A_0}{A}\\right) = \\frac{5730}{\\ln 2}\\ln\\left(\\frac{${A0}}{${At}}\\right) \\approx ${age}\\text{ ans}$.`
				};
			} else {
				finalAnswer = eqC14.katex;
				const eqWrongBetaPlus = nuclearEquation(
					[{ A: 14, Z: 6, symbol: 'C' }],
					[
						{ A: 14, Z: 5, symbol: 'B' },
						{ A: 0, Z: 1, symbol: 'e' }
					]
				);
				const eqWrongAlpha = nuclearEquation(
					[{ A: 14, Z: 6, symbol: 'C' }],
					[
						{ A: 10, Z: 4, symbol: 'Be' },
						{ A: 4, Z: 2, symbol: 'He' }
					]
				);
				const eqWrongMass = nuclearEquation(
					[{ A: 14, Z: 6, symbol: 'C' }],
					[
						{ A: 13, Z: 7, symbol: 'N' },
						{ A: 0, Z: -1, symbol: 'e' }
					]
				);
				const mcq = buildUniqueMcqOptions(
					eqC14.katex,
					[
						{ text: eqWrongBetaPlus.katex, diagnosticFeedback: 'الكربون 14 يصدر إشعاعاً من النمط $\\beta^-$ وليس $\\beta^+$.' },
						{ text: eqWrongAlpha.katex, diagnosticFeedback: 'التفكك $\\alpha$ يميز الأنوية الثقيلة فقط ($A > 200$).' },
						{ text: eqWrongMass.katex, diagnosticFeedback: 'راجع قانون انحفاظ العدد الكتلي لصودي: $14 = 14 + 0$.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `يتفكك الكربون ${nuclide(14, 6, 'C').katex} إشعاعياً وفق النمط $\\beta^-$ ليعطي الآزوت ${nuclide(14, 7, 'N').katex}. ما معادلة التفكك الصحيحة؟`,
					questionTextAr: 'اختر معادلة التفكك الإشعاعي الصحيحة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `بتطبيق قانوني صودي للانحفاظ في التفكك $\\beta^-$: ${eqC14.katex}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `يستعمل الكربون المشع ${nuclide(14, 6, 'C').typst} ($t_(1/2) = ${tHalf} upright("ans")$) لتأريخ المخلوقات العضوية القديمة. تتفكك نواة ${nuclide(14, 6, 'C').typst} وفق النمط $beta^-$ لتعطي نواة الآزوت ${nuclide(14, 7, 'N').typst}.`,
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1fr'],
						children: [
							{
								type: 'text',
								content: '1) اكتب معادلة التفكك الإشعاعي محدداً القوانين المطبقة، وعرّف النشاط الإشعاعي $A(t)$ ووحدته الدولية.',
								answer: `1) بتطبيق قانوني صودي (انحفاظ العدد الكتلي $A$ والعدد الشحني $Z$): ${eqC14.typst}.\nالنشاط الإشعاعي $A(t) = -frac(dif N, dif t) = lambda N(t)$ يمثل عدد التفككات في الثانية ووحدته البيكريل ($upright("Bq")$).`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: decayUrl,
								caption: 'منحنى تناقص النشاط $A(t)$ بدلالة الزمن'
							}
						]
					},
					{
						type: 'text',
						content: '2) أثبت العلاقة $t_(1/2) = frac(ln 2, lambda)$، ثم احسب ثابت التفكك $lambda$ بوحدة $upright("ans")^(-1)$ وثابت الزمن $tau$.',
						answer: `2) عند $t = t_(1/2)$: $N(t_(1/2)) = frac(N_0, 2) arrow.r.double e^(-lambda t_(1/2)) = frac(1, 2) arrow.r.double t_(1/2) = frac(ln 2, lambda)$.\n$lambda = frac(ln 2, ${tHalf}) approx 1.21 times 10^(-4) upright("ans")^(-1)$، و $tau = frac(1, lambda) approx ${tauYears} upright("ans")$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) أعطى قياس نشاط قطعة خشب قديمة القيمة $A(t) = ${At} upright("Bq")$، بينما نشاط عينة حديثة مماثلة هو $A_0 = ${A0} upright("Bq")$. احسب عمر هذه القطعة الخشبية.`,
						answer: `3) $A(t) = A_0 e^(-lambda t) arrow.r.double t = frac(t_(1/2), ln 2) ln(frac(A_0, A(t))) = frac(${tHalf}, ln 2) ln(frac(${A0}, ${At})) approx ${age} upright("ans")$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: '4) لماذا نعتبر نسبة ${}^14 upright("C")$ في الغلاف الجوي ثابتة خلال حياة الكائن الحي، وما هي حدود صلاحية التأريخ بالكربون 14؟',
						answer: '4) أثناء حياة الكائن الحي يتجدد الكربون 14 عبر التبادل مع الغلاف الجوي فتبقى نسبته ثابتة؛ وبعد الموت يتوقف التبادل ويبدأ بالتناقص. لا يصلح التأريخ بـ ${}^14 upright("C")$ للأعمار التي تفوق نحو $50\\,000$ سنة لأن النشاط يصبح ضعيفاً جداً يصعب قياسه.',
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكر انحفاظ $A$ و $Z$ في معادلة التفكك $\\beta^-$ بانبعاث ${}^{0}_{-1}\\mathrm{e}$.',
					'استخرج الزمن $t$ من اللوغاريتم الطبيعي: $t = \\frac{t_{1/2}}{\\ln 2}\\ln\\left(\\frac{A_0}{A(t)}\\right)$.',
					'ثابت الزمن $\\tau = \\frac{1}{\\lambda} = \\frac{t_{1/2}}{\\ln 2} > t_{1/2}$.'
				],
				solutionStepsAr: [
					`معادلة التفكك: ${eqC14.katex}.`,
					`$\\tau = \\frac{t_{1/2}}{\\ln 2} \\approx ${tauYears}\\text{ ans}$.`,
					`عمر العينة: $t = \\frac{${tHalf}}{\\ln 2}\\ln\\left(\\frac{${A0}}{${At}}\\right) \\approx ${age}\\text{ ans}$.`
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 2. Binding Energy, Aston Curve, Fission & Fusion (6 pts)
	// ─────────────────────────────────────────────────────────────────────────
	const tplNuclearBindingFission: PhysicsParameterizedTemplate = {
		id: `phy_tpl_3as_shared_t3_nuclear_binding_fission_fusion`,
		grade,
		trimesterId: 't3',
		domain: 'nuclear',
		titleAr: 'طاقة الربط، منحنى أستون، والطاقة المحررة في الانشطار والاندماج',
		curriculumLessonId: nuclearEnergyLessonId,
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const isFusion = rng.pick([true, false]);

			// Fission: U-235 + n -> Sr-94 + Xe-139 + 3n OR La-148 + Br-85 + 3n
			// Fusion: H-2 + H-3 -> He-4 + n
			const MeV_per_u = 931.5;
			const MeV_to_J = 1.6e-13;
			let reactionEq = nuclearEquation(
				[
					{ A: 2, Z: 1, symbol: 'H' },
					{ A: 3, Z: 1, symbol: 'H' }
				],
				[
					{ A: 4, Z: 2, symbol: 'He' },
					{ A: 1, Z: 0, symbol: 'n' }
				]
			);
			let reactLabel = '²H + ³H';
			let prodLabel = '⁴He + ¹n';
			let dm_u = 0.01888; // 2.01410 + 3.01605 - (4.00260 + 1.00866)
			let eLib_MeV = roundTo(dm_u * MeV_per_u, 2); // 17.59 MeV
			let elTargetName = '${}^{4}_{2}\\mathrm{He}$';
			let elTargetTypst = nuclideInner(4, 2, 'He').typst;
			let elTargetValue = 28.3;
			let elPerNucleon = 7.075;
			let A_target = 4;

			if (!isFusion) {
				reactionEq = nuclearEquation(
					[
						{ A: 235, Z: 92, symbol: 'U' },
						{ A: 1, Z: 0, symbol: 'n' }
					],
					[
						{ A: 94, Z: 38, symbol: 'Sr' },
						{ A: 139, Z: 54, symbol: 'Xe' },
						{ coeff: 3, A: 1, Z: 0, symbol: 'n' }
					]
				);
				reactLabel = '²³⁵U + ¹n';
				prodLabel = '⁹⁴Sr + ¹³⁹Xe + 3¹n';
				dm_u = 0.19248;
				eLib_MeV = roundTo(dm_u * MeV_per_u, 1); // 179.3 MeV
				elTargetName = '${}^{235}_{92}\\mathrm{U}$';
				elTargetTypst = nuclideInner(235, 92, 'U').typst;
				elTargetValue = 1783.8;
				A_target = 235;
				elPerNucleon = roundTo(elTargetValue / A_target, 2); // 7.59
			}

			const eLib_pJ = roundTo((eLib_MeV * MeV_to_J) * 1e12, 2); // in pJ (10^-12 J)
			const energySvg = svgNuclearEnergyDiagram({
				topLabel: 'نويات منفصلة (Z p + N n)',
				reactantsLabel: reactLabel,
				productsLabel: prodLabel,
				deltaELabel: `E_lib ≈ ${eLib_MeV} MeV`
			});
			const energyUrl = savePhysicsSvgAsset(`phy_${track}_t3_nuc_energy_${difficulty}_s${seed}`, energySvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${elPerNucleon}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `طاقة الربط لنواة ${elTargetName} تساوي $E_\\ell = ${elTargetValue}\\text{ MeV}$. احسب طاقة الربط لكل نوية $\\frac{E_\\ell}{A}$ بوحدة $\\text{MeV/nucléon}$.`,
					questionTextAr: 'احسب طاقة الربط لكل نوية $E_\\ell / A$:',
					imageUrl: energyUrl,
					questionData: { answer: elPerNucleon, displayTemplate: 'E_ℓ/A = ? MeV/nucl', variables: [], tolerance: 0.05 },
					explanation: `$\\frac{E_\\ell}{A} = \\frac{${elTargetValue}}{${A_target}} \\approx ${elPerNucleon}\\text{ MeV/nucléon}$.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${eLib_MeV}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `في التفاعل النووي ${reactionEq.katex}، النقص الكتلي بين المتفاعلات والنواتج هو $|\\Delta m| = ${dm_u}\\text{ u}$. احسب الطاقة المحررة $E_{\\text{lib}}$ بوحدة $\\text{MeV}$ ($1\\text{ u}\\cdot c^2 = 931.5\\text{ MeV}$).`,
					questionTextAr: 'احسب الطاقة المحررة $E_{\\text{lib}}$ (بوحدة $\\text{MeV}$):',
					imageUrl: energyUrl,
					questionData: { answer: eLib_MeV, displayTemplate: 'E_lib = ? MeV', variables: [], tolerance: 0.3 },
					explanation: `$E_{\\text{lib}} = |\\Delta m|\\cdot c^2 = ${dm_u} \\times 931.5 \\approx ${eLib_MeV}\\text{ MeV}$.`
				};
			} else {
				finalAnswer = `${eLib_pJ} pJ`;
				const mcq = buildUniqueMcqOptions(
					`$${eLib_pJ}\\times 10^{-12}\\text{ J}$`,
					[
						{
							text: `$${roundTo(eLib_pJ * 10, 2)}\\times 10^{-12}\\text{ J}$`,
							diagnosticFeedback: 'تحقق من الأس عند الضرب في $1\\text{ MeV} = 1.6\\times 10^{-13}\\text{ J}$.'
						},
						{
							text: `$${roundTo(eLib_MeV / 1.6, 2)}\\times 10^{-12}\\text{ J}$`,
							diagnosticFeedback: 'قسمت على $1.6$ بدلاً من الضرب فيها.'
						},
						{
							text: `$${roundTo(eLib_pJ / 2, 2)}\\times 10^{-12}\\text{ J}$`,
							diagnosticFeedback: 'راجع الجداء $${eLib_MeV} \\times 1.6\\times 10^{-13}$.'
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `حرر تفاعل نووي طاقة قدرها $E_{\\text{lib}} = ${eLib_MeV}\\text{ MeV}$. ما قيمتها بالجول ($1\\text{ MeV} = 1.6\\times 10^{-13}\\text{ J}$)?`,
					questionTextAr: 'اختر قيمة الطاقة المحررة بوحدة الجول ($\\text{J}$):',
					imageUrl: energyUrl,
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `$E_{\\text{lib}} = ${eLib_MeV} \\times 1.6\\times 10^{-13} = ${eLib_pJ}\\times 10^{-12}\\text{ J}$.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `ندرس التحول النووي المنمذج بالمعادلة: ${reactionEq.typst}.\nنُعطي: $|Delta m| = ${dm_u} upright("u")$، طاقة الربط $E_ell(${elTargetTypst}) = ${elTargetValue} upright("MeV")$، $1 upright("u") dot c^2 = 931.5 upright("MeV")$، و $1 upright("MeV") = 1.6 times 10^(-13) upright("J")$.`,
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) حدد نوع هذا التفاعل النووي (${isFusion ? 'اندماج أم انشطار' : 'انشطار أم اندماج'})، وعرّف طاقة الربط $E_ell$ لنواة، ثم احسب طاقة الربط لكل نوية للنواة $${elTargetTypst}$.`,
								answer: `1) هذا التفاعل هو **${isFusion ? 'اندماج نووي' : 'انشطار نووي'}**.\nطاقة الربط $E_ell$ هي الطاقة الواجب تقديمها لنواة ساكنة لتفكيكها إلى نوياتها الحرة الساكنة.\n$frac(E_ell, A) = frac(${elTargetValue}, ${A_target}) approx ${elPerNucleon} upright("MeV/nucléon")$.`,
								mark: '2'
							},
							{
								type: 'image',
								src: energyUrl,
								caption: 'المخطط الطاقوي للحصيلة الكتلية-الطاقوية'
							}
						]
					},
					{
						type: 'text',
						content: '2) بالاعتماد على منحنى أستون، فسّر لماذا يحرر هذا التفاعل طاقة هائلة.',
						answer: '2) تتجه الأنوية المتفاعلة نحو إنتاج أنوية تقع أقرب إلى قاع منحنى أستون، أي ذات طاقة ربط لكل نوية أكبر (أكثر استقراراً)، ويُحرَّر الفرق في الطاقة على شكل طاقة حركية وإشعاعية.',
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) احسب الطاقة المحررة $E_"lib"$ خلال تحول واحد بوحدة $upright("MeV")$ ثم بوحدة الجول ($upright("J")$).`,
						answer: `3) $E_"lib" = |Delta m| dot c^2 = ${dm_u} times 931.5 approx ${eLib_MeV} upright("MeV")$.\nبالجول: $E_"lib" = ${eLib_MeV} times 1.6 times 10^(-13) approx ${eLib_pJ} times 10^(-12) upright("J")$.`,
						mark: '2.5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'الانشطار يقسم نواة ثقيلة، أما الاندماج فيجمع نواتين خفيفتين.',
					'طاقة الربط لكل نوية تقاس بقسمة $E_\\ell$ على العدد الكتلي $A$.',
					'تحويل الطاقة: اضرب بـ $931.5$ من $\\text{u}$ إلى $\\text{MeV}$، وبـ $1.6\\times 10^{-13}$ إلى $\\text{J}$.'
				],
				solutionStepsAr: [
					`$\\frac{E_\\ell}{A} = ${elPerNucleon}\\text{ MeV/nucléon}$.`,
					`$E_{\\text{lib}} = ${dm_u} \\times 931.5 \\approx ${eLib_MeV}\\text{ MeV}$.`,
					`$E_{\\text{lib}}(\\text{J}) \\approx ${eLib_pJ}\\times 10^{-12}\\text{ J}$.`
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 3. Experimental Esterification & Yield Control (6 pts, isExperimental)
	// ─────────────────────────────────────────────────────────────────────────
	const tplEsterificationExp: PhysicsParameterizedTemplate = {
		id: `phy_tpl_3as_shared_t3_esterification_yield_exp`,
		grade,
		trimesterId: 't3',
		domain: 'organic_chem',
		titleAr: 'التمرين التجريبي: الأسترة، المردود، ومراقبة التطور الكيميائي',
		curriculumLessonId: esterLessonId,
		defaultPoints: 6,
		isExperimental: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const n0 = rng.pick([0.3, 0.6, 0.9, 1.2]); // mol equimolar
			const K = 4; // primary alcohol
			// x_f / (n0 - x_f) = 2 => x_f = 2/3 * n0
			const xf = roundTo((2 * n0) / 3, 2);
			const yieldPct = 66.7;
			const nAcidRem = roundTo(n0 - xf, 2);

			const eqEst = chemEquation(
				[
					{ formula: 'CH3COOH', state: 'l' },
					{ formula: 'C2H5OH', state: 'l' }
				],
				[
					{ formula: 'CH3COOC2H5', state: 'l' },
					{ formula: 'H2O', state: 'l' }
				],
				{ reversible: true }
			);

			const iceEst = buildIceTable({
				equation: eqEst,
				speciesHeaders: [
					chemSpecies('CH3COOH'),
					chemSpecies('C2H5OH'),
					chemSpecies('CH3COOC2H5'),
					chemSpecies('H2O')
				],
				initial: [
					{ katex: `$${n0}$`, typst: `$${n0}$` },
					{ katex: `$${n0}$`, typst: `$${n0}$` },
					{ katex: '$0$', typst: '$0$' },
					{ katex: '$0$', typst: '$0$' }
				],
				intermediate: [
					{ katex: `$${n0} - x$`, typst: `$${n0} - x$` },
					{ katex: `$${n0} - x$`, typst: `$${n0} - x$` },
					{ katex: '$x$', typst: '$x$' },
					{ katex: '$x$', typst: '$x$' }
				],
				final: [
					{ katex: `$${nAcidRem}$`, typst: '$........$' },
					{ katex: `$${nAcidRem}$`, typst: '$........$' },
					{ katex: `$${xf}$`, typst: '$........$' },
					{ katex: `$${xf}$`, typst: '$........$' }
				],
				finalAnswers: [
					{ katex: `$${nAcidRem}$`, typst: `$${nAcidRem}$` },
					{ katex: `$${nAcidRem}$`, typst: `$${nAcidRem}$` },
					{ katex: `$${xf}$`, typst: `$${xf}$` },
					{ katex: `$${xf}$`, typst: `$${xf}$` }
				]
			});

			const estSvg = svgPhysicsCurvePlot({
				title: 'تطور كمية مادة الأستر المتشكل n_ester(t)',
				xMin: 0,
				xMax: 10,
				yMin: 0,
				yMax: roundTo(n0 * 1.1, 2),
				xStep: 2,
				yStep: roundTo(n0 / 3, 2),
				xLabel: 't (h)',
				yLabel: 'n_ester (mol)',
				curves: [
					{ fn: (t) => xf * (1 - Math.exp(-t / 1.5)), color: '#2563eb', label: 'بدون وسيط' },
					{ fn: (t) => xf * (1 - Math.exp(-t / 0.6)), color: '#059669', dashed: true, label: 'مع H₂SO₄ + تسخين' }
				],
				dashedGuides: [
					{ x1: 0, y1: xf, x2: 10, y2: xf, color: '#dc2626', label: `n_f = ${xf} mol`, labelPos: 'top' }
				],
				points: [{ x: 0, y: xf, label: `${xf}`, color: '#dc2626' }]
			});
			const estUrl = savePhysicsSvgAsset(`phy_${track}_t3_ester_${difficulty}_s${seed}`, estSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${xf}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `نمزج $n_0 = ${n0}\\text{ mol}$ من حمض الإيثانويك مع $n_0 = ${n0}\\text{ mol}$ من الإيثانول ($K = 4$). احسب كمية مادة الأستر عند التوازن $x_f$ بوحدة $\\text{mol}$.`,
					questionTextAr: 'احسب التقدم النهائي $x_f$ (بوحدة $\\text{mol}$):',
					imageUrl: estUrl,
					questionData: { answer: xf, displayTemplate: 'x_f = ? mol', variables: [], tolerance: 0.02 },
					explanation: `$\\frac{x_f^2}{(${n0} - x_f)^2} = 4 \\implies \\frac{x_f}{${n0} - x_f} = 2 \\implies x_f = \\frac{2}{3} \\times ${n0} = ${xf}\\text{ mol}$.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${nAcidRem}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `في مزيج متساوي المولات ($n_0 = ${n0}\\text{ mol}$) من حمض الإيثانويك وكحول أولي ($K = 4$)، نعاير الحمض المتبقي عند التوازن. ما كمية مادة الحمض المتبقية بوحدة $\\text{mol}$؟`,
					questionTextAr: 'احسب كمية الحمض المتبقية عند التوازن (بوحدة $\\text{mol}$):',
					imageUrl: estUrl,
					questionData: { answer: nAcidRem, displayTemplate: 'n_acid,f = ? mol', variables: [], tolerance: 0.02 },
					explanation: `بما أن $x_f = ${xf}\\text{ mol}$ فإن كمية الحمض المتبقية هي $n_0 - x_f = ${n0} - ${xf} = ${nAcidRem}\\text{ mol}$.`
				};
			} else {
				finalAnswer = 'استعمال كلور الإيثانويل CH₃COCl أو نزع الماء/الأستر أثناء التفاعل';
				const mcq = buildUniqueMcqOptions(
					'إضافة زيادة من أحد المتفاعلين أو نزع الماء أو استبدال الحمض بكلور الإيثانويل',
					[
						{
							text: 'إضافة كمية إضافية من حمض الكبريت المركز $\\ce{H2SO4}$ كوسيط',
							diagnosticFeedback: 'الوسيط يسرّع بلوغ التوازن فقط ولا يرفع مردود الأسترة.'
						},
						{
							text: 'رفع درجة الحرارة أثناء التسخين المرتد',
							diagnosticFeedback: 'الأسترة تفاعل لا حراري فدرجة الحرارة تسرع التفاعل ولا تغير المردود.'
						},
						{
							text: 'إضافة الماء المقطر إلى الوسط التفاعلي',
							diagnosticFeedback: 'الماء ناتج؛ إضافته تدفع التوازن في الجهة العكسية وتنقص المردود!'
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: 'أيّ إجراء تجريبي يرفع فعلياً مردود تصنيع إيثانوات الإيثيل إلى أكثر من $67\\%$؟',
					questionTextAr: 'اختر الإجراء الذي يرفع مردود الأسترة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: 'لرفع المردود نزيح التوازن (زيادة متفاعل أو نزع ناتج كالماء) أو نستبدل الحمض بكلور الأسيل لجعل التفاعل تاماً.'
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `التمرين التجريبي: نضع في حوجلة التسخين المرتد مزيجاً ابتدائياً يتكون من $n_0 = ${n0} upright("mol")$ من حمض الإيثانويك و $n_0 = ${n0} upright("mol")$ من الإيثانول مع بضع قطرات من حمض الكبريت المركز، فينمذج التفاعل بـ: ${eqEst.typst} (ثابت التوازن $K = 4$).`,
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1fr'],
						children: [
							{
								type: 'text',
								content: '1) سمِّ الأستر الناتج، واذكر خصائص تفاعل الأسترة الأربعة، وما دور التسخين المرتد وحمض الكبريت؟',
								answer: '1) اسم الأستر: إيثانوات الإيثيل.\nالخصائص: بطيء، محدود (غير تام)، عكوس، ولا حراري.\nالتسخين المرتد يمنع ضياع المتفاعلات والنواتج المتطايرة بالتكثيف؛ وحمض الكبريت وسيط يسرع التفاعل دون تغيير المردود.',
								mark: '1.5'
							},
							{
								type: 'image',
								src: estUrl,
								caption: 'منحنى تشكل الأستر مع وبدون وسيط'
							}
						]
					},
					{
						type: 'text',
						content: '2) أكمل جدول التقدم، ثم احسب كمية مادة الأستر المتشكلة عند التوازن $x_f$ والمردود $r$.',
						answer: `2) $K = frac(x_f^2, (${n0} - x_f)^2) = 4 arrow.r.double frac(x_f, ${n0} - x_f) = 2 arrow.r.double x_f = ${xf} upright("mol")$.\nالمردود: $r = frac(x_f, n_0) times 100 = ${yieldPct} %$.`,
						mark: '2'
					},
					iceEst.typstBlock,
					{
						type: 'text',
						content: '3) كيف نتحقق تجريبياً في المخبر من قيمة $x_f$؟ اذكر الخطوات بإيجاز.',
						answer: '3) نسقي المزيج في الماء المثلج لتوقيف التفاعل، ثم نعاير الحمض المتبقي بمحلول الصودا $"NaOH"$ ذي التركيز المعلوم بحضور الفينول فتالين، ونستنتج $x_f = n_0 - n_("acid", f)$.',
						mark: '1.5'
					},
					{
						type: 'text',
						content: '4) اذكر طريقتين للرفع من مردود هذا التحول.',
						answer: '4) (أ) استعمال أحد المتفاعلين بزيادة أو نزع الماء المتشكل؛ (ب) استبدال الحمض الكربوكسيلي بكلور الإيثانويل $"CH"_3"COCl"$.',
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'بما أن الإيثانول كحول أولي والمزيج متساوي المولات، فإن $K = 4 \\implies x_f = \\frac{2}{3}n_0$.',
					'الوسيط ودرجة الحرارة يسرعان التفاعل دون التأثير على المردود النهائي.',
					'لرفع المردود نزيح التوازن أو نستعمل كلور الأسيل.'
				],
				solutionStepsAr: [
					`$x_f = \\frac{2}{3}(${n0}) = ${xf}\\text{ mol}$ والمردود $r = 66.7\\%$.`,
					`كمية الحمض المتبقية عند التوازن: $${nAcidRem}\\text{ mol}$.`,
					'طرق رفع المردود: زيادة أحد المتفاعلات، نزع الماء، أو استعمال كلور الأسيل.'
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 4. Spontaneous Evolution (Q_r,i vs K) & Saponification (6 pts)
	// ─────────────────────────────────────────────────────────────────────────
	const tplSaponificationSpontaneous: PhysicsParameterizedTemplate = {
		id: `phy_tpl_3as_shared_t3_saponification_spontaneous_evolution`,
		grade,
		trimesterId: 't3',
		domain: 'organic_chem',
		titleAr: 'التطور التلقائي لجملة كيميائية (Q_r مقابل K) وتفاعل التصبن',
		curriculumLessonId: esterLessonId,
		defaultPoints: 6,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const nAcid = rng.pick([0.2, 0.3]);
			const nAlc = rng.pick([0.2, 0.3]);
			const nEst = rng.pick([0.6, 0.8]);
			const nWater = rng.pick([0.6, 0.8]);
			const Qri = roundTo((nEst * nWater) / (nAcid * nAlc), 2);
			const K = 4;
			const direction = Qri > K ? 'العكسية (إماهة الأستر)' : Qri < K ? 'المباشرة (الأسترة)' : 'توازن';

			// Saponification of ethyl ethanoate (M = 88 g/mol) with NaOH -> CH3COONa (M = 82 g/mol)
			const mEster_g = rng.pick([8.8, 17.6, 26.4]);
			const nEster_mol = roundTo(mEster_g / 88, 2);
			const yieldSap = rng.pick([80, 90, 100]);
			const mSoap_g = roundTo(nEster_mol * 82 * (yieldSap / 100), 2);

			const eqSap = chemEquation(
				[
					{ formula: 'CH3COOC2H5', state: 'l' },
					{ formula: 'OH-', state: 'aq' }
				],
				[
					{ formula: 'CH3COO-', state: 'aq' },
					{ formula: 'C2H5OH', state: 'aq' }
				]
			);

			const iceSap = buildIceTable({
				equation: eqSap,
				speciesHeaders: [
					chemSpecies('CH3COOC2H5'),
					chemSpecies('OH-'),
					chemSpecies('CH3COO-'),
					chemSpecies('C2H5OH')
				],
				initial: [
					{ katex: `$${nEster_mol}$`, typst: `$${nEster_mol}$` },
					{ katex: `$${nEster_mol}$`, typst: `$${nEster_mol}$` },
					{ katex: '$0$', typst: '$0$' },
					{ katex: '$0$', typst: '$0$' }
				],
				intermediate: [
					{ katex: `$${nEster_mol} - x$`, typst: `$${nEster_mol} - x$` },
					{ katex: `$${nEster_mol} - x$`, typst: `$${nEster_mol} - x$` },
					{ katex: '$x$', typst: '$x$' },
					{ katex: '$x$', typst: '$x$' }
				],
				final: [
					{ katex: '$0$', typst: '$........$' },
					{ katex: '$0$', typst: '$........$' },
					{ katex: `$${nEster_mol}$`, typst: '$........$' },
					{ katex: `$${nEster_mol}$`, typst: '$........$' }
				],
				finalAnswers: [
					{ katex: '$0$', typst: '$0$' },
					{ katex: '$0$', typst: '$0$' },
					{ katex: `$${nEster_mol}$`, typst: `$${nEster_mol}$` },
					{ katex: `$${nEster_mol}$`, typst: `$${nEster_mol}$` }
				]
			});

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${Qri}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `في مزيج أسترة ($K = 4$) نضع $n(\\ce{CH3COOH}) = ${nAcid}\\text{ mol}$، $n(\\ce{C2H5OH}) = ${nAlc}\\text{ mol}$، $n(\\ce{CH3COOC2H5}) = ${nEst}\\text{ mol}$، و $n(\\ce{H2O}) = ${nWater}\\text{ mol}$. احسب كسر التفاعل الابتدائي $Q_{r,i}$.`,
					questionTextAr: 'احسب كسر التفاعل الابتدائي $Q_{r,i}$:',
					questionData: { answer: Qri, displayTemplate: 'Q_{r,i} = ?', variables: [], tolerance: 0.1 },
					explanation: `$Q_{r,i} = \\frac{n(\\text{ester})\\cdot n(\\ce{H2O})}{n(\\text{acid})\\cdot n(\\text{alcohol})} = \\frac{${nEst} \\times ${nWater}}{${nAcid} \\times ${nAlc}} = ${Qri}$.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${mSoap_g}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `نسخن $m = ${mEster_g}\\text{ g}$ من إيثانوات الإيثيل ($M = 88\\text{ g/mol}$) مع كمية متكافئة من هيدروكسيد الصوديوم $\\ce{NaOH}$ بمردود تصبن عملي $r = ${yieldSap}\\%$. احسب كتلة الصابون $\\ce{CH3COONa}$ ($M = 82\\text{ g/mol}$) المتحصل عليها بالغرام.`,
					questionTextAr: 'احسب كتلة الصابون الناتجة (بالغرام):',
					questionData: { answer: mSoap_g, displayTemplate: 'm_soap = ? g', variables: [], tolerance: 0.2 },
					explanation: `$n(\\text{ester}) = \\frac{${mEster_g}}{88} = ${nEster_mol}\\text{ mol}$، ومنه $m_{\\text{soap}} = ${nEster_mol} \\times 82 \\times \\frac{${yieldSap}}{100} = ${mSoap_g}\\text{ g}$.`
				};
			} else {
				finalAnswer = direction;
				const mcq = buildUniqueMcqOptions(
					`يتطور التفاعل تلقائياً في الجهة ${direction} لأن $Q_{r,i} = ${Qri} > K = 4$`,
					[
						{
							text: `يتطور التفاعل تلقائياً في الجهة المباشرة لأن $Q_{r,i} = ${Qri} > K = 4$`,
							diagnosticFeedback: 'عندما يكون $Q_{r,i} > K$ يتناقص $Q_r$ ليبلغ $K$، أي يسير التفاعل في الجهة العكسية.'
						},
						{
							text: 'الجملة في حالة توازن ولا تتطور',
							diagnosticFeedback: 'التوازن يتحقق فقط إذا كان $Q_{r,i} = K = 4$.'
						},
						{
							text: 'يتوقف التفاعل نهائياً لاستهلاك الماء كمذيب',
							diagnosticFeedback: 'في الأسترة لا يُعدّ الماء مذيباً بل فرداً مشاركاً في عبارة $Q_r$.'
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `حُسب كسر التفاعل الابتدائي لجملة أسترة فوجد $Q_{r,i} = ${Qri}$ بينما ثابت التوازن $K = 4$. كيف تتطور الجملة تلقائياً؟`,
					questionTextAr: 'حدد جهة التطور التلقائي للجملة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `بما أن $Q_{r,i} = ${Qri} > K = 4$، تتطور الجملة تلقائياً في الجهة العكسية (إماهة الأستر).`
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: 'يتكون هذا التمرين من جزأين حول معيار التطور التلقائي وتفاعل التصبن.',
				content: [
					{
						type: 'text',
						content: `*الجزء الأول (3 نقاط):* نمزج عند درجة حرارة ثابتة $n("CH"_3"COOH") = ${nAcid} upright("mol")$، $n("C"_2"H"_5"OH") = ${nAlc} upright("mol")$، $n("CH"_3"COOC"_2"H"_5) = ${nEst} upright("mol")$، و $n("H"_2"O") = ${nWater} upright("mol")$ (حيث ثابت التوازن للأسترة $K = 4$).\n1) اكتب عبارة كسر التفاعل الابتدائي $Q_(r,i)$ واحسب قيمته.\n2) استنتج جهة التطور التلقائي لهذه الجملة الكيميائية.`,
						answer: `1) $Q_(r,i) = frac(n("ester") dot n("H"_2"O"), n("acid") dot n("alcohol")) = frac(${nEst} times ${nWater}, ${nAcid} times ${nAlc}) = ${Qri}$.\n2) بما أن $Q_(r,i) = ${Qri} > K = 4$، تتطور الجملة تلقائياً في الجهة العكسية (تفاعل إماهة الأستر).`,
						mark: '3'
					},
					{
						type: 'text',
						content: `*الجزء الثاني (3 نقاط):* نسخن كتلة $m = ${mEster_g} upright("g")$ من إيثانوات الإيثيل ($M = 88 upright("g/mol")$) مع كمية متكافئة من هيدروكسيد الصوديوم $("Na"^+ + "OH"^-)$.\n1) اكتب معادلة تفاعل التصبن وأنشئ جدول التقدم له.\n2) اذكر خصائص هذا التفاعل، ثم احسب كتلة الصابون $"CH"_3"COONa"$ ($M = 82 upright("g/mol")$) المحصل عليها بمردود تجريبي $r = ${yieldSap} %$.`,
						answer: `1) ${eqSap.typst}.\n2) التصبن تفاعل بطيء (أو سريع بالتسخين) و**تام**.\n$n("ester") = frac(${mEster_g}, 88) = ${nEster_mol} upright("mol") arrow.r.double m_"soap" = ${nEster_mol} times 82 times frac(${yieldSap}, 100) = ${mSoap_g} upright("g")$.`,
						mark: '3'
					},
					iceSap.typstBlock
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكّر أن الماء يدخل في عبارة $Q_r$ في تفاعل الأسترة.',
					'إذا كان $Q_{r,i} > K$ يسير التفاعل في الجهة العكسية.',
					'تفاعل التصبن تفاعل تام لإنتاج كحول وملح الكربوكسيلات (صابون).'
				],
				solutionStepsAr: [
					`$Q_{r,i} = ${Qri} > K = 4 \\implies$ الجهة العكسية.`,
					`تفاعل التصبن تام: $n(\\text{ester}) = ${nEster_mol}\\text{ mol}$.`,
					`كتلة الصابون الناتجة: $m_{\\text{soap}} = ${mSoap_g}\\text{ g}$.`
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 5. Experimental Activity & Linearization ln A(t) (7 pts, isExperimental)
	// ─────────────────────────────────────────────────────────────────────────
	const tplNuclearActivityExp: PhysicsParameterizedTemplate = {
		id: `phy_tpl_3as_shared_t3_nuclear_activity_exp`,
		grade,
		trimesterId: 't3',
		domain: 'nuclear',
		titleAr: 'التمرين التجريبي: المتابعة المخبرية للنشاط الإشعاعي والبيان ln A(t)',
		curriculumLessonId: nuclearLessonId,
		defaultPoints: 7,
		isExperimental: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			// Iodine-131 (t_1/2 = 8 days) or Technetium-99m (t_1/2 = 6 hours)
			const tHalf_h = rng.pick([6, 8, 12]);
			const lambda_h = roundTo(Math.LN2 / tHalf_h, 4);
			const lnA0 = rng.pick([14, 15, 16]);
			const A0_MBq = roundTo(Math.exp(lnA0) / 1e6, 2);
			const hours = [0, 4, 8, 12, 16];
			const lnValues = hours.map((h) => roundTo(lnA0 - lambda_h * h, 2));

			const lnSvg = svgPhysicsCurvePlot({
				title: 'البيان التجريبي ln A(t) بدلالة الزمن t',
				xMin: 0,
				xMax: 20,
				yMin: Math.floor(lnValues[4]) - 1,
				yMax: lnA0 + 1,
				xStep: 4,
				yStep: 1,
				xLabel: 't (h)',
				yLabel: 'ln A(t)',
				curves: [{ fn: (t) => lnA0 - lambda_h * t, color: '#2563eb', label: 'ln A = ln A₀ − λt' }],
				points: [
					{ x: 0, y: lnA0, label: `(0 ; ${lnA0})`, color: '#dc2626' },
					{ x: 16, y: lnValues[4], label: `(16 ; ${lnValues[4]})`, color: '#059669' }
				]
			});
			const lnUrl = savePhysicsSvgAsset(`phy_${track}_t3_lnA_exp_${difficulty}_s${seed}`, lnSvg);

			const lambda_s = (Math.LN2 / (tHalf_h * 3600));
			const N0 = Math.exp(lnA0) / lambda_s;
			const m0_ug = roundTo((N0 / 6.02e23) * 99 * 1e6, 3); // ug for A=99

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${lambda_h}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `يمر البيان الخطي $\\ln A(t)$ بدلالة $t$ بالنقطتين $(0\\text{ h}; ${lnA0})$ و $(16\\text{ h}; ${lnValues[4]})$. احسب ثابت التفكك $\\lambda$ بوحدة $\\text{h}^{-1}$.`,
					questionTextAr: 'احسب ثابت التفكك $\\lambda$ (بوحدة $\\text{h}^{-1}$):',
					imageUrl: lnUrl,
					questionData: { answer: lambda_h, displayTemplate: 'λ = ? h⁻¹', variables: [], tolerance: 0.005 },
					explanation: `ميل المستقيم هو $-\\lambda = \\frac{${lnValues[4]} - ${lnA0}}{16 - 0} = -${lambda_h}\\text{ h}^{-1} \\implies \\lambda = ${lambda_h}\\text{ h}^{-1}$.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${tHalf_h}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `ثابت التفكك لعينة طبية مشعة هو $\\lambda = ${lambda_h}\\text{ h}^{-1}$. احسب زمن نصف عمرها $t_{1/2}$ بالساعات ($\\text{h}$).`,
					questionTextAr: 'احسب زمن نصف العمر $t_{1/2}$ (بالساعات):',
					imageUrl: lnUrl,
					questionData: { answer: tHalf_h, displayTemplate: 't_{1/2} = ? h', variables: [], tolerance: 0.25 },
					explanation: `$t_{1/2} = \\frac{\\ln 2}{\\lambda} = \\frac{0.69315}{${lambda_h}} \\approx ${tHalf_h}\\text{ h}$.`
				};
			} else {
				finalAnswer = `${A0_MBq} MBq`;
				const mcq = buildUniqueMcqOptions(
					`$${A0_MBq}\\text{ MBq}$`,
					[
						{
							text: `$${lnA0}\\text{ MBq}$`,
							diagnosticFeedback: '$${lnA0}$ هو قيمة $\\ln A_0$ وليس النشاط الابتدائي $A_0 = e^{${lnA0}}\\text{ Bq}$.'
						},
						{
							text: `$${roundTo(A0_MBq * 2, 2)}\\text{ MBq}$`,
							diagnosticFeedback: 'راجع الدالة الأسية $A_0 = e^{${lnA0}}$ وتحويل الميغابيكريل ($1\\text{ MBq} = 10^6\\text{ Bq}$).'
						},
						{
							text: `$${roundTo(A0_MBq / 10, 2)}\\text{ MBq}$`,
							diagnosticFeedback: 'تحقق من الأس في التحويل من $\\text{Bq}$ إلى $\\text{MBq}$.'
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `إذا كان الترتيب عند المبدأ للمنحنى $\\ln A(t)$ (حيث $A$ بالبيكريل) يساوي $${lnA0}$، فما قيمة النشاط الابتدائي $A_0$ بوحدة الميغابيكريل ($\\text{MBq}$)؟`,
					questionTextAr: 'اختر قيمة النشاط الابتدائي $A_0$:',
					imageUrl: lnUrl,
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `$\\ln A_0 = ${lnA0} \\implies A_0 = e^{${lnA0}} \\approx ${Math.round(Math.exp(lnA0))}\\text{ Bq} = ${A0_MBq}\\text{ MBq}$.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `التمرين التجريبي: يُحقن مريض بجرعة من نظير التكنيسيوم المشع ${nuclide(99, 43, 'Tc').typst} ($M = 99 upright("g/mol")$). قيس نشاط العينة $A(t)$ بوحدة البيكريل عبر عداد جيجر-مولر فحُسب $ln A(t)$ في الجدول التالي:`,
				content: [
					{
						type: 'table',
						headers: ['$t (upright("h"))$', ...hours.map((h) => `$${h}$`)],
						cells: [],
						rows: [['$ln A(t)$', ...lnValues.map((v) => `$${v}$`)]],
						headerBackground: true,
						borders: 'grid',
						width: 'full'
					},
					{
						type: 'columns',
						widths: ['1.25fr', '1fr'],
						children: [
							{
								type: 'text',
								content: '1) انطلاقاً من قانون التناقص للنشاط $A(t) = A_0 e^(-lambda t)$، أوجد العلاقة النظرية لـ $ln A(t)$ بدلالة $t$.',
								answer: '1) بأخذ اللوغاريتم النيبيري للطرفين: $ln A(t) = ln A_0 - lambda t$، وهي معادلة خط مستقيم ميله $-lambda$ وترتيبه عند المبدأ $ln A_0$.',
								mark: '1.5'
							},
							{
								type: 'image',
								src: lnUrl,
								caption: 'المنحنى التجريبي $ln A = f(t)$'
							}
						]
					},
					{
						type: 'text',
						content: `2) استنتج من البيان قيمة ثابت التفكك $lambda$ بوحدة $upright("h")^(-1)$ ثم بوحدة $upright("s")^(-1)$، واحسب زمن نصف العمر $t_(1/2)$.`,
						answer: `2) الميل: $-lambda = frac(${lnValues[4]} - ${lnA0}, 16 - 0) = -${lambda_h} upright("h")^(-1) arrow.r.double lambda = ${lambda_h} upright("h")^(-1) approx ${lambda_s.toExponential(2)} upright("s")^(-1)$.\n$t_(1/2) = frac(ln 2, lambda) approx ${tHalf_h} upright("h")$.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `3) عيّن النشاط الابتدائي $A_0$ بالبيكريل وبالميغابيكريل ($upright("MBq")$)، ثم احسب الكتلة الابتدائية $m_0$ للنظير المشع المحقون ($N_A = 6.02 times 10^(23) upright("mol")^(-1)$).`,
						answer: `3) من الترتيب عند المبدأ: $ln A_0 = ${lnA0} arrow.r.double A_0 = e^(${lnA0}) approx ${A0_MBq} upright("MBq")$.\n$N_0 = frac(A_0, lambda("s"^(-1))) arrow.r.double m_0 = frac(N_0 M, N_A) approx ${m0_ug} mu upright("g")$.`,
						mark: '3'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تحقق من المعادلة الخطية $\\ln A(t) = \\ln A_0 - \\lambda t$: الميل يساوي $-\\lambda$.',
					'لحساب $N_0 = \\frac{A_0}{\\lambda}$ يجب تحويل $\\lambda$ إلى $\\text{s}^{-1}$ بقسمتها على $3600$.',
					'الكتلة الابتدائية تعطى بـ $m_0 = \\frac{N_0}{N_A} M$.'
				],
				solutionStepsAr: [
					`$\\lambda = ${lambda_h}\\text{ h}^{-1} \\implies t_{1/2} = ${tHalf_h}\\text{ h}$.`,
					`$A_0 = e^{${lnA0}} \\approx ${A0_MBq}\\text{ MBq}$.`,
					`$m_0 \\approx ${m0_ug}\\text{ }\\mu\\text{g}$.`
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 6. T3 BAC Integration Synthesis — Units 5 & 6 (7 pts, isIntegration)
	// ─────────────────────────────────────────────────────────────────────────
	const tplIntegrationBacT3: PhysicsParameterizedTemplate = {
		id: `phy_tpl_3as_shared_t3_integration_bac_se`,
		grade,
		trimesterId: 't3',
		domain: 'integration',
		titleAr: 'الموضوع التكاملي الشامل للبكالوريا (التحولات النووية ومراقبة جملة كيميائية)',
		curriculumLessonId: `${lessonPrefix}_t3_integration`,
		defaultPoints: 7,
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			// Nuclear: D-T fusion -> 17.6 MeV per reaction; compute energy for m = 1 g or 2 g of Deuterium
			const mDeut_g = rng.pick([1, 2, 4]);
			const NA = 6.02e23;
			const N_nuclei = (mDeut_g / 2) * NA;
			const ePerFusion_MeV = 17.6;
			const eTotal_J = N_nuclei * ePerFusion_MeV * 1.6e-13;
			const eTotal_1e11_J = roundTo(eTotal_J / 1e11, 2); // in 10^11 J

			// Chemistry: Esterification with excess alcohol (n_acid = 0.5, n_alc = 1.5, K = 4)
			const nAcid0 = 0.5;
			const nAlc0 = rng.pick([1.0, 1.5]);
			// x_f^2 / ((nAcid0 - x_f)(nAlc0 - x_f)) = 4 => 3 x_f^2 - 4(nAcid0+nAlc0) x_f + 4*nAcid0*nAlc0 = 0
			const aQ = 3;
			const bQ = -4 * (nAcid0 + nAlc0);
			const cQ = 4 * nAcid0 * nAlc0;
			const xf = roundTo((-bQ - Math.sqrt(bQ * bQ - 4 * aQ * cQ)) / (2 * aQ), 3);
			const yieldPct = roundTo((xf / nAcid0) * 100, 1);

			const eqDT = nuclearEquation(
				[
					{ A: 2, Z: 1, symbol: 'H' },
					{ A: 3, Z: 1, symbol: 'H' }
				],
				[
					{ A: 4, Z: 2, symbol: 'He' },
					{ A: 1, Z: 0, symbol: 'n' }
				]
			);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${eTotal_1e11_J}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `يحرر تفاعل الاندماج ${eqDT.katex} طاقة قدرها $17.6\\text{ MeV}$ للنواة. احسب الطاقة الكلية المحررة من اندماج كتلة $m = ${mDeut_g}\\text{ g}$ من الديتيريوم ${nuclide(2, 1, 'H').katex} بوحدة $10^{11}\\text{ J}$ ($N_A = 6.02\\times 10^{23}\\text{ mol}^{-1}$، $1\\text{ MeV} = 1.6\\times 10^{-13}\\text{ J}$).`,
					questionTextAr: 'احسب الطاقة الكلية المحررة (بوحدة $10^{11}\\text{ J}$):',
					questionData: { answer: eTotal_1e11_J, displayTemplate: 'E_tot = ? × 10¹¹ J', variables: [], tolerance: 0.2 },
					explanation: `$N = \\frac{m}{M}N_A = \\frac{${mDeut_g}}{2}\\times 6.02\\times 10^{23}$ نواة، ومنه $E_{\\text{tot}} = N \\times 17.6 \\times 1.6\\times 10^{-13} \\approx ${eTotal_1e11_J}\\times 10^{11}\\text{ J}$.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${yieldPct}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `نمزج $n_1 = ${nAcid0}\\text{ mol}$ من حمض كربوكسيلي مع زيادة $n_2 = ${nAlc0}\\text{ mol}$ من كحول أولي ($K = 4$). إذا بلغ التقدم النهائي $x_f = ${xf}\\text{ mol}$، احسب مردود الأسترة $r$ بالمائة ($\\%$).`,
					questionTextAr: 'احسب المردود $r$ (بوحدة $\\%$):',
					questionData: { answer: yieldPct, displayTemplate: 'r = ? %', variables: [], tolerance: 0.5 },
					explanation: `المتفاعل المحد هو الحمض ($x_{\\max} = ${nAcid0}\\text{ mol}$)، ومنه $r = \\frac{x_f}{x_{\\max}}\\times 100 = \\frac{${xf}}{${nAcid0}}\\times 100 = ${yieldPct}\\%$.`
				};
			} else {
				finalAnswer = 'ترفع زيادة أحد المتفاعلات المردود إلى أكثر من 67%';
				const mcq = buildUniqueMcqOptions(
					`يرتفع المردود فوق $67\\%$ إلى $${yieldPct}\\%$ باستعمال الكحول بزيادة`,
					[
						{
							text: 'يبقى المردود ثابتاً عند $67\\%$ ما دام الكحول أولياً',
							diagnosticFeedback: '$67\\%$ خاص بالمزيج المتساوي المولات فقط ($n_1 = n_2$).'
						},
						{
							text: 'ينخفض المردود لأن الكحول يزيح التوازن عكسياً',
							diagnosticFeedback: 'إضافة متفاعل يزيح التوازن في الجهة المباشرة ويرفع المردود.'
						},
						{
							text: 'ينعدم التفاعل لتغير ثابت التوازن $K$',
							diagnosticFeedback: '$K = 4$ لا يتغير إلا بدرجة الحرارة.'
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `عند مضاعفة كمية الكحول الأولي لتصبح $n_2 = ${nAlc0}\\text{ mol}$ مقابل $n_1 = ${nAcid0}\\text{ mol}$ من الحمض، ماذا يحدث لمردود الأسترة مقارنة بالمزيج المتساوي المولات ($67\\%$)؟`,
					questionTextAr: 'اختر أثر الزيادة في كمية الكحول على المردود:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `زيادة أحد المتفاعلات ($n_2 > n_1$) يزيح التوازن نحو تشكل الأستر فيرتفع المردود من $67\\%$ إلى $${yieldPct}\\%$.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'الموضوع الإدماجي الشامل للبكالوريا — الفصل الثالث',
				points: this.defaultPoints,
				instruction: 'يتكون هذا التمرين الشامل من جزأين مستقلين في الفيزياء النووية والكيمياء العضوية.',
				content: [
					{
						type: 'text',
						content: `*الجزء الأول (3.5 نقاط — التحولات النووية):* ننمذج تفاعل الاندماج النووي بـ: ${eqDT.typst}، حيث تبلغ الطاقة المحررة لتفاعل واحد $E_"lib" = 17.6 upright("MeV")$.\n1) اذكر مبدأ الاندماج النووي والشرط اللازم لتحققه، وموقعه على منحنى أستون.\n2) احسب الطاقة الكلية المحررة بالجول من اندماج كتلة $m = ${mDeut_g} upright("g")$ من الديتيريوم ${nuclide(2, 1, 'H').typst} ($N_A = 6.02 times 10^(23) upright("mol")^(-1)$، $1 upright("MeV") = 1.6 times 10^(-13) upright("J")$).`,
						answer: `1) الاندماج هو اتحاد نواتين خفيفتين لتكوين نواة أثقل وأكثر استقراراً (أكبر $E_ell/A$)، ويتطلب حرارة وضغطاً هائلين لتغلب الأنوية على التنافر الكولومي.\n2) $N = frac(m, M) N_A = frac(${mDeut_g}, 2) times 6.02 times 10^(23)$، ومنه $E_"tot" = N times 17.6 times 1.6 times 10^(-13) approx ${eTotal_1e11_J} times 10^(11) upright("J")$.`,
						mark: '3.5'
					},
					{
						type: 'text',
						content: `*الجزء الثاني (3.5 نقاط — مراقبة تطور جملة كيميائية):* نمزج $n_1 = ${nAcid0} upright("mol")$ من حمض الإيثانويك مع $n_2 = ${nAlc0} upright("mol")$ من كحول أولي ($K = 4$).\n1) حدد المتفاعل المحد و $x_max$، ثم اكتب معادلة التوازن $K = 4$ بدلالة $x_f$ وتحقّق أن $x_f approx ${xf} upright("mol")$.\n2) احسب المردود $r$ وقارنه بمردود المزيج المتساوي المولات ($67 %$). ماذا تستنتج؟`,
						answer: `1) $x_max = ${nAcid0} upright("mol")$. من $frac(x_f^2, (${nAcid0} - x_f)(${nAlc0} - x_f)) = 4$ نجد $3 x_f^2 - ${4 * (nAcid0 + nAlc0)} x_f + ${4 * nAcid0 * nAlc0} = 0$ وبما أن $x_f < ${nAcid0}$ يكون $x_f approx ${xf} upright("mol")$.\n2) $r = frac(${xf}, ${nAcid0}) times 100 = ${yieldPct} % > 67 %$. الاستنتاج: استعمال أحد المتفاعلين بزيادة يرفع مردود الأسترة.`,
						mark: '3.5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'عدد أنوية الديتيريوم في كتلة $m$ هو $N = \\frac{m}{2} N_A$.',
					'المتفاعل المحد هو الحمض لأن $n_1 = 0.5 < n_2$.',
					'استعمال متفاعل بزيادة يرفع المردود فوق $67\\%$.'
				],
				solutionStepsAr: [
					`الطاقة الكلية للاندماج: $E_{\\text{tot}} \\approx ${eTotal_1e11_J}\\times 10^{11}\\text{ J}$.`,
					`التقدم النهائي للأسترة: $x_f \\approx ${xf}\\text{ mol}$.`,
					`المردود الجديد: $r = ${yieldPct}\\% > 67\\%$.`
				],
				finalAnswer
			};
		}
	};

	return [
		tplNuclearDecayDating,
		tplNuclearBindingFission,
		tplEsterificationExp,
		tplSaponificationSpontaneous,
		tplNuclearActivityExp,
		tplIntegrationBacT3
	];
}

export const SHARED_PHYSICS_TEMPLATES_3AS_T3: PhysicsParameterizedTemplate[] =
	createSharedPhysicsTemplates3asT3('3as_shared');
