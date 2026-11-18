import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import {
	savePhysicsSvgAsset,
	svgCircuitDiagram,
	svgOscilloscopeTrace,
	wrapPhysicsSvg
} from '../../svg-physics';

function buildPendulumElectroscopeSvg(opts: {
	rodName: string;
	rodSign: '+' | '-';
	clothName: string;
	mode: 'pendulum' | 'electroscope';
	extraRodLabel?: string;
}): string {
	let body = '';
	body += `<rect x="8" y="8" width="344" height="194" rx="8" fill="#f8fafc" stroke="#334155" stroke-width="1.5"/>`;
	if (opts.mode === 'pendulum') {
		body += `<text x="180" y="28" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">تجربة النواس الكهربائي</text>`;
		body += `<line x1="150" y1="45" x2="230" y2="45" stroke="#334155" stroke-width="2.5"/>`;
		body += `<line x1="190" y1="45" x2="190" y2="140" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4,3"/>`;
		body += `<line x1="190" y1="45" x2="225" y2="132" stroke="#475569" stroke-width="1.6"/>`;
		body += `<circle cx="228" cy="142" r="13" fill="#fde047" stroke="#854d0e" stroke-width="1.8"/>`;
		body += `<text x="228" y="146" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">B</text>`;
		body += `<rect x="42" y="132" width="110" height="20" rx="4" fill="${opts.rodSign === '-' ? '#334155' : '#bfdbfe'}" stroke="#1e293b" stroke-width="1.4"/>`;
		body += `<text x="97" y="146" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${opts.rodSign === '-' ? '#ffffff' : '#1e3a8a'}">${opts.rodName} (${opts.rodSign})</text>`;
		body += `<text x="180" y="184" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e40af">مدلوك بـ: ${opts.clothName}</text>`;
	} else {
		body += `<text x="180" y="28" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">الكاشف الكهربائي وقضيب مشحون</text>`;
		body += `<rect x="45" y="44" width="104" height="16" rx="4" fill="${opts.rodSign === '-' ? '#334155' : '#bfdbfe'}" stroke="#1e293b" stroke-width="1.4"/>`;
		body += `<text x="97" y="56" text-anchor="middle" font-size="10" font-weight="bold" fill="${opts.rodSign === '-' ? '#ffffff' : '#1e3a8a'}">${opts.rodName} (${opts.rodSign})</text>`;
		body += `<ellipse cx="215" cy="72" rx="26" ry="6" fill="#94a3b8" stroke="#334155" stroke-width="1.4"/>`;
		body += `<line x1="215" y1="78" x2="215" y2="128" stroke="#334155" stroke-width="2.2"/>`;
		body += `<circle cx="215" cy="128" r="32" fill="none" stroke="#64748b" stroke-width="1.5"/>`;
		body += `<line x1="215" y1="128" x2="198" y2="152" stroke="#d97706" stroke-width="2.2"/>`;
		body += `<line x1="215" y1="128" x2="232" y2="152" stroke="#d97706" stroke-width="2.2"/>`;
		body += `<text x="215" y="182" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#166534">${opts.extraRodLabel ?? 'انفراج الوريقتين'}</text>`;
	}
	return wrapPhysicsSvg(360, 210, body);
}

function buildConductorElectroscopeSvg(rodMaterial: string, isConductor: boolean): string {
	let body = '';
	body += `<rect x="8" y="8" width="344" height="194" rx="8" fill="#f8fafc" stroke="#334155" stroke-width="1.5"/>`;
	body += `<text x="180" y="28" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">نقل الشحنات عبر قضيب (${rodMaterial})</text>`;
	// Left charged sphere A
	body += `<circle cx="72" cy="96" r="24" fill="#fee2e2" stroke="#dc2626" stroke-width="1.8"/>`;
	body += `<text x="72" y="100" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">A (−)</text>`;
	body += `<rect x="64" y="120" width="16" height="52" fill="#e2e8f0" stroke="#475569" stroke-width="1.3"/>`;
	body += `<text x="72" y="186" text-anchor="middle" font-size="9.5" fill="#475569">حامل عازل</text>`;
	// Connecting rod
	body += `<rect x="96" y="89" width="144" height="14" rx="3" fill="${isConductor ? '#f59e0b' : '#cbd5e1'}" stroke="#334155" stroke-width="1.4"/>`;
	body += `<text x="168" y="81" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">${rodMaterial}</text>`;
	// Right electroscope B
	body += `<ellipse cx="262" cy="96" rx="22" ry="6" fill="#94a3b8" stroke="#334155" stroke-width="1.4"/>`;
	body += `<line x1="262" y1="102" x2="262" y2="146" stroke="#334155" stroke-width="2.2"/>`;
	if (isConductor) {
		body += `<line x1="262" y1="146" x2="246" y2="170" stroke="#d97706" stroke-width="2.2"/>`;
		body += `<line x1="262" y1="146" x2="278" y2="170" stroke="#d97706" stroke-width="2.2"/>`;
	} else {
		body += `<line x1="262" y1="146" x2="259" y2="174" stroke="#d97706" stroke-width="2.2"/>`;
		body += `<line x1="262" y1="146" x2="265" y2="174" stroke="#d97706" stroke-width="2.2"/>`;
	}
	body += `<text x="262" y="190" text-anchor="middle" font-size="10" font-weight="bold" fill="#0f172a">كاشف كهربائي (B)</text>`;
	return wrapPhysicsSvg(360, 210, body);
}

function buildFaultyHouseholdSvg(faultLabel1: string, faultLabel2: string, deviceName: string): string {
	let body = '';
	body += `<rect x="8" y="8" width="364" height="204" rx="8" fill="#ffffff" stroke="#334155" stroke-width="1.4"/>`;
	body += `<text x="30" y="52" font-size="11.5" font-weight="bold" fill="#dc2626">Ph</text>`;
	body += `<text x="30" y="106" font-size="11.5" font-weight="bold" fill="#2563eb">N</text>`;
	body += `<text x="30" y="160" font-size="11.5" font-weight="bold" fill="#059669">T</text>`;
	body += `<line x1="52" y1="48" x2="345" y2="48" stroke="#dc2626" stroke-width="2"/>`;
	body += `<line x1="52" y1="102" x2="345" y2="102" stroke="#2563eb" stroke-width="2"/>`;
	body += `<line x1="52" y1="156" x2="245" y2="156" stroke="#059669" stroke-width="1.8" stroke-dasharray="5,3"/>`;
	// Switch placed wrongly on N
	body += `<rect x="135" y="95" width="34" height="14" fill="#ffffff"/>`;
	body += `<circle cx="138" cy="102" r="2.5" fill="#0f172a"/><circle cx="166" cy="102" r="2.5" fill="#0f172a"/>`;
	body += `<line x1="138" y1="102" x2="162" y2="90" stroke="#dc2626" stroke-width="2"/>`;
	body += `<text x="152" y="122" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#dc2626">${faultLabel1}</text>`;
	// Lamp
	body += `<line x1="186" y1="48" x2="186" y2="102" stroke="#0f172a" stroke-width="1.6"/>`;
	body += `<circle cx="186" cy="75" r="11" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>`;
	body += `<line x1="179" y1="68" x2="193" y2="82" stroke="#0f172a" stroke-width="1.4"/>`;
	body += `<line x1="179" y1="82" x2="193" y2="68" stroke="#0f172a" stroke-width="1.4"/>`;
	// Appliance without earth connected
	body += `<rect x="260" y="60" width="68" height="50" rx="4" fill="#fef2f2" stroke="#dc2626" stroke-width="1.6"/>`;
	body += `<text x="294" y="89" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${deviceName}</text>`;
	body += `<line x1="274" y1="48" x2="274" y2="60" stroke="#dc2626" stroke-width="1.6"/>`;
	body += `<line x1="312" y1="102" x2="312" y2="110" stroke="#2563eb" stroke-width="1.6"/>`;
	body += `<text x="294" y="142" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#dc2626">${faultLabel2}</text>`;
	body += `<text x="190" y="196" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">مخطط الشبكة الكهربائية قبل الإصلاح (220V - 50Hz)</text>`;
	return wrapPhysicsSvg(380, 220, body);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Electrification Modes & Interactions (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const electrificationTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_4am_t1_electrification',
	grade: '4am',
	trimesterId: 't1',
	domain: 'electricity',
	titleAr: 'طرق التكهرب والفعلان المتبادلان (النواس والكاشف الكهربائي)',
	curriculumLessonId: 'phy_lesson_4am_t1_electric_charge_electrification',
	defaultPoints: 6,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scenarios = [
			{ rod: 'قضيب إيبونيت', cloth: 'قطعة صوف', sign: '-' as const, signAr: 'سالبة', oppositeRod: 'قضيب زجاجي مدلوك بالحرير', oppSignAr: 'موجبة' },
			{ rod: 'مسطرة بلاستيكية', cloth: 'قطعة فرو', sign: '-' as const, signAr: 'سالبة', oppositeRod: 'قضيب زجاجي مدلوك بالحرير', oppSignAr: 'موجبة' },
			{ rod: 'قضيب زجاجي', cloth: 'قطعة حرير', sign: '+' as const, signAr: 'موجبة', oppositeRod: 'قضيب إيبونيت مدلوك بالصوف', oppSignAr: 'سالبة' }
		];
		const sc = rng.pick(scenarios);
		const mode = difficulty === 'easy' ? 'pendulum' : rng.pick(['pendulum', 'electroscope'] as const);
		const svg = buildPendulumElectroscopeSvg({
			rodName: sc.rod,
			rodSign: sc.sign,
			clothName: sc.cloth,
			mode
		});
		const imageUrl = savePhysicsSvgAsset(`phy_4am_t1_elec_${difficulty}_s${seed}`, svg);

		const sameRod = sc.sign === '-' ? 'قضيب بلاستيكي مدلوك بالفرو' : 'قضيب زجاجي آخر مدلوك بالحرير';
		const correctText = `يتكهرب بالدلك وتكون شحنته ${sc.signAr}، ثم يحدث تنافر مع ${sameRod}`;
		const mcq = buildUniqueMcqOptions(
			correctText,
			[
				{
					text: `يتكهرب بالتأثير وتكون شحنته ${sc.oppSignAr}، ثم يحدث تجاذب مع ${sameRod}`,
					diagnosticFeedback: 'الاحتكاك بين جسمين يمثل تكهرباً **بالدلك** وليس بالتأثير، كما أن الشحنات المتماثلة تتنافر.'
				},
				{
					text: `يتكهرب بالدلك وتكون شحنته ${sc.oppSignAr}، ثم يحدث تجاذب مع ${sameRod}`,
					diagnosticFeedback: `تذكّر إشارة التكهرب بالدلك: الزجاج بالحرير يشحن موجباً ($+$) والإيبونيت/البلاستيك بالصوف يشحن سالباً ($-$).`
				},
				{
					text: `يتكهرب باللمس ولا تتغير شحنته الكهربائية`,
					diagnosticFeedback: 'الدلك يسبب انتقال الإلكترونات واكتساب شحنة كهربائية صافية.'
				}
			],
			rng
		);

		const isPendulum = mode === 'pendulum';
		const q2Prompt = isPendulum
			? `نقرّب ${sc.rod} المدلوك من كرية نواس كهربائي خفيفة متعادلة $(B)$ حتى تلامسه ثم نلاحظ ابتعادها عنه. سمّ طريقتي التكهرب الحادثتين على الترتيب للكرية $(B)$ وفسّر سبب تنافرها.`
			: `نقرّب ${sc.rod} المدلوك من قرص كاشف كهربائي متعادل دون لمسه فتنفرج وريقتاه، ثم نلامسه للقرص. سمّ طريقة التكهرب في كل مرحلة وحدّد شحنة الوريقتين.`;
		const q2Ans = isPendulum
			? `عند التقريب تتكهرب الكرية بالتأثير فتنجذب، وعند التلامس تتكهرب باللمس وتكتسب نفس الشحنة (${sc.signAr}) فحدث تنافر لأن الشحنتين من نفس النوع.`
			: `قبل اللمس: تكهرب بالتأثير حيث تظهر شحنة ${sc.signAr} على الوريقتين فتتنافران. عند اللمس: تكهرب باللمس فتنتقل شحنة ${sc.signAr} إلى كامل الكاشف وتبقى الوريقتان منفرجتين.`;

		const q3Prompt = isPendulum
			? `نقرّب الآن من الكرية $(B)$ بعد تلامسها السابق ${sc.oppositeRod}. ماذا يحدث للكرية؟ علّل.`
			: `بعد شحن الكاشف السابق باللمس، نقرّب من قرصه دون لمسه ${sc.oppositeRod}. ماذا يحدث لانفراج الوريقتين؟ علّل.`;
		const q3Ans = isPendulum
			? `تنجذب الكرية نحو ${sc.oppositeRod} لأن شحنته (${sc.oppSignAr}) معاكسة لشحنة الكرية (${sc.signAr})، والشحنتان المختلفتان تتجاذبان.`
			: `ينقص انفراج الوريقتين (أو تنطبقان مؤقتاً) لأن شحنة ${sc.oppositeRod} (${sc.oppSignAr}) تجذب الشحنات المخالفة نحو القرص فتقل الشحنة على الوريقتين.`;

		const q4Prompt =
			difficulty === 'hard'
				? `ماذا يحدث لوريقتي الكاشف (أو شحنة الكرية) لو لمسناه بيدنا ونحن واقفون على الأرض دون عازل؟ برّر فيزيائياً.`
				: `حدد نوع الشحنة الكهربائية التي تكتسبها قطعة الـ${sc.cloth} بعد الدلك. علّل إجابتك.`;
		const q4Ans =
			difficulty === 'hard'
				? `تتعادل الكرية (أو تنطبق وريقتا الكاشف) لأن جسم الإنسان والأرض ناقلان للكهرباء فتتفرغ الشحنة الكهربائية عبرهما إلى الأرض.`
				: `تكتسب قطعة ${sc.cloth} شحنة ${sc.oppSignAr} مساوية في القيمة المطلقة لشحنة ${sc.rod} ومعاكسة لها في الإشارة وفق مبدأ انحفاظ الشحنة.`;

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `دُلك ${sc.rod} بـ${sc.cloth}. ما طريقة تكهربه وما نوع شحنته، وماذا يحدث عند تقريبه من ${sameRod}؟`,
				questionTextAr: `دُلك ${sc.rod} بـ${sc.cloth}. ما طريقة تكهربه وما نوع شحنته؟`,
				imageUrl,
				imageCaption: 'تجربة التكهرب',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `يتكهرب ${sc.rod} بالدلك وتكون شحنته ${sc.signAr}، لذا يتنافر مع ${sameRod} لأن لهما نفس نوع الشحنة.`
			},
			sujetExercise: {
				points: 6,
				instruction: `دلك تلميذ ${sc.rod} بـ${sc.cloth}، ثم حقّق التجربة المبينة في الشكل المقابل:`,
				content: [
					{
						type: 'columns',
						widths: ['1.45fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) حدّد طريقة تكهرب ${sc.rod} ونوع الشحنة الكهربائية التي يكتسبها.`,
								answer: `1) تكهرب بالدلك، ويكتسب شحنة كهربائية ${sc.signAr} (${sc.sign}).`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'التركيب التجريبي'
							}
						]
					},
					{
						type: 'text',
						content: `2) ${q2Prompt}`,
						answer: `2) ${q2Ans}`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) ${q3Prompt}`,
						answer: `3) ${q3Ans}`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) ${q4Prompt}`,
						answer: `4) ${q4Ans}`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'الإيبونيت والبلاستيك المدلوكان بالصوف يشحنان سلباً ($-$)، والزجاج المدلوك بالحرير يشحن موجباً ($+$).',
				'الشحنتان المتماثلتان تتنافران والشحنتان المختلفتان تتجاذبان.',
				'عند اللمس يكتسب الجسم المتعادل نفس إشارة الجسم المشحون، أما بالتأثير فيحدث تموضع مؤقت للشحنات.'
			],
			solutionStepsAr: [
				`تكهرب ${sc.rod} بالدلك وحمل شحنة ${sc.signAr}.`,
				q2Ans,
				q3Ans,
				q4Ans
			],
			finalAnswer: sc.signAr
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Planetary Atomic Model, Conductors & q = ± n·e (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const atomicChargeTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_4am_t1_atomic_charge',
	grade: '4am',
	trimesterId: 't1',
	domain: 'electricity',
	titleAr: 'النموذج الكوكبي للذرة، النواقل والعوازل، وحساب الشحنة الكهربائية',
	curriculumLessonId: 'phy_lesson_4am_t1_atomic_model_conductors_insulators',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const zList = [
			{ name: 'الألمنيوم', sym: 'Al', Z: 13 },
			{ name: 'الصوديوم', sym: 'Na', Z: 11 },
			{ name: 'النحاس', sym: 'Cu', Z: 29 },
			{ name: 'الكربون', sym: 'C', Z: 6 }
		];
		const elem = rng.pick(zList);
		const nCoef = difficulty === 'easy' ? rng.pick([2, 3, 4, 5]) : rng.pick([1.5, 2.5, 3.5, 4.5, 6]);
		const exp = difficulty === 'easy' ? 12 : difficulty === 'medium' ? 13 : 14;
		const isLoss = seed % 2 === 0;
		// q = ± n * 1.6e-19
		const nVal = nCoef * Math.pow(10, exp);
		const qMantissa = roundTo(nCoef * 1.6, 2);
		const qExp = exp - 19;
		const qSignStr = isLoss ? '+' : '-';
		const rodMaterial = rng.pick([
			{ name: 'ساق من النحاس', isConductor: true },
			{ name: 'قضيب من الألمنيوم', isConductor: true },
			{ name: 'مسطرة من البلاستيك', isConductor: false },
			{ name: 'قضيب من الخشب الجاف', isConductor: false }
		]);

		const svg = buildConductorElectroscopeSvg(rodMaterial.name, rodMaterial.isConductor);
		const imageUrl = savePhysicsSvgAsset(`phy_4am_t1_atom_${difficulty}_s${seed}`, svg);

		const correctOpt = `$q = ${qSignStr}${qMantissa} \\times 10^{${qExp}}\\text{ C}$`;
		const mcq = buildUniqueMcqOptions(
			correctOpt,
			[
				{
					text: `$q = ${isLoss ? '-' : '+'}${qMantissa} \\times 10^{${qExp}}\\text{ C}$`,
					diagnosticFeedback: isLoss
						? 'فقدان الإلكترونات السالبة يجعل الجسم مشحوناً بشحنة **موجبة** وليست سالبة.'
						: 'اكتساب الإلكترونات السالبة يجعل الجسم مشحوناً بشحنة **سالبة** وليست موجبة.'
				},
				{
					text: `$q = ${qSignStr}${qMantissa} \\times 10^{${qExp - 1}}\\text{ C}$`,
					diagnosticFeedback: 'راجع جمع أسس العشرة: $10^{' + exp + '} \\times 10^{-19} = 10^{' + qExp + '}$.'
				},
				{
					text: `$q = ${qSignStr}${roundTo(nCoef / 1.6, 2)} \\times 10^{${qExp}}\\text{ C}$`,
					diagnosticFeedback: 'العلاقة هي الضرب $q = \\pm n \\cdot e$ وليس القسمة.'
				}
			],
			rng
		);

		const actionAr = isLoss ? 'فقد' : 'اكتسب';
		const conductExplain = rodMaterial.isConductor
			? 'تنفرج وريقتا الكاشف (B) لأن ' + rodMaterial.name + ' ناقل كهربائي يحتوي على إلكترونات حرة تسمح بانتقال الشحنات السالبة من الكرية (A) إلى الكاشف.'
			: 'لا تنفرج وريقتا الكاشف (B) لأن ' + rodMaterial.name + ' عازل كهربائي لا يسمح بحركة الإلكترونات الحرة عبره.';

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `${actionAr} جسم مشحون بالدلك عدداً قدره $n = ${nCoef} \\times 10^{${exp}}$ إلكتروناً. ما قيمة شحنته الكهربائية $q$ علماً أن $e = 1.6 \\times 10^{-19}\\text{ C}$؟`,
				questionTextAr: `${actionAr} جسم $n = ${nCoef} \\times 10^{${exp}}$ إلكتروناً. احسب شحنته $q$:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `بما أن الجسم ${actionAr} إلكترونات: $q = ${qSignStr} n \\cdot e = ${qSignStr}(${nCoef} \\times 10^{${exp}}) \\times (1.6 \\times 10^{-19}) = ${qSignStr}${qMantissa} \\times 10^{${qExp}}\\text{ C}$.`
			},
			sujetExercise: {
				points: 6,
				instruction: `تعطى الشحنة العنصرية $e = 1.6 times 10^(-19) " C"$.`,
				content: [
					{
						type: 'text',
						content: `1) تحتوي نواة ذرة ${elem.name} ($"${elem.sym}"$) في حالتها المتعادلة على $${elem.Z}$ شحنة موجبة. ما عدد الإلكترونات التي تدور حول نواتها؟ واحسب الشحنة الإجمالية للذرة مع التعليل.`,
						answer: `1) عدد الإلكترونات هو $${elem.Z}$ إلكتروناً، والشحنة الإجمالية للذرة معدومة ($q = 0 " C"$) لأن الذرة متعادلة كهربائياً (مجموع الشحنات الموجبة للنواة يساوي مجموع الشحنات السالبة للإلكترونات).`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) بعد دلك جسم متعادل بقطعة قماش، ${actionAr} الجسم $n = ${nCoef} times 10^${exp}$ إلكتروناً. احسب الشحنة الكهربائية $q$ التي يحملها الجسم محدداً إشارتها، ثم استنتج شحنة قطعة القماش.`,
						answer: `2) بما أن الجسم ${actionAr} إلكترونات فإن شحنته ${isLoss ? 'موجبة' : 'سالبة'}: $q = ${qSignStr} n times e = ${qSignStr}(${nCoef} times 10^${exp}) times (1.6 times 10^(-19)) = ${qSignStr}${qMantissa} times 10^(${qExp}) " C"$. شحنة قطعة القماش معاكسة ومساوية بالقيمة المطلقة: $${isLoss ? '-' : '+'}${qMantissa} times 10^(${qExp}) " C"$.`,
						mark: '1.5'
					},
					{
						type: 'columns',
						widths: ['1.4fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `3) نصل كرية معدنية $(A)$ مشحونة سلباً وموضوعة على حامل عازل بقرص كاشف كهربائي متعادل $(B)$ بواسطة ${rodMaterial.name} كما في الشكل.\n\nأ) صف ماذا يحدث لوريقتي الكاشف $(B)$ مع التعليل المجهري.\n\nب) لو عوّضنا ${rodMaterial.name} بمعدن ${rodMaterial.isConductor ? 'بلاستيكي (عازل)' : 'النحاس (ناقل)'} فماذا تتوقع أن يحدث؟`,
								answer: `3) أ) ${conductExplain}\n\nب) عند التعويض ${rodMaterial.isConductor ? 'بالبلاستيك العازل لا تنفرج الوريقتان لأن الإلكترونات لا تنتقل عبر العوازل.' : 'بالنحاس الناقل تنفرج الوريقتان لانتقال الإلكترونات الحرة عبره إلى الكاشف.'}`,
								mark: '3'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: `التوصيل بـ ${rodMaterial.name}`
							}
						]
					}
				]
			},
			hints: [
				'الذرة متعادلة كهربائياً: عدد البروتونات الموجبة في النواة = عدد الإلكترونات السالبة.',
				'فقدان الإلكترونات يعطي شحنة موجبة ($q = +n\\cdot e$)، واكتسابها يعطي شحنة سالبة ($q = -n\\cdot e$).',
				'النواقل تسمح بانتقال الإلكترونات الحرة أما العوازل فتمنع انتقالها.'
			],
			solutionStepsAr: [
				`في الذرة المتعادلة عدد الإلكترونات يساوي $${elem.Z}$ وشحنتها الكلية $0\\text{ C}$.`,
				`$q = ${qSignStr} n \\cdot e = ${qSignStr}${qMantissa} \\times 10^{${qExp}}\\text{ C}$ (حيث $n = ${nVal.toExponential(1)}$).`,
				conductExplain
			],
			finalAnswer: `${qSignStr}${qMantissa}×10^(${qExp}) C`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. AC Alternator & Oscilloscope (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const oscilloscopeAcTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_4am_t1_oscilloscope_ac',
	grade: '4am',
	trimesterId: 't1',
	domain: 'electricity',
	titleAr: 'التيار المتناوب وقراءة منحنى راسم الاهتزاز المهبطي',
	curriculumLessonId: 'phy_lesson_4am_t1_alternating_current_oscilloscope',
	defaultPoints: 6,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const nv = difficulty === 'easy' ? rng.pick([2, 3]) : rng.pick([2, 2.5, 3, 3.5]);
		const sv = rng.pick([2, 3, 4, 5, 6]);
		const nh = rng.pick([4, 5]);
		const shMs = nh === 4 ? rng.pick([5, 10]) : rng.pick([2, 4, 5, 10]);

		const uMax = roundTo(nv * sv, 2);
		const uEff = roundTo(uMax / Math.SQRT2, 2);
		const tMs = nh * shMs;
		const tSec = roundTo(tMs / 1000, 4);
		const freq = roundTo(1 / tSec, 1);

		const svg = svgOscilloscopeTrace({
			amplitudeDivs: nv,
			periodDivs: nh,
			svLabel: `Sv = ${sv} V/div`,
			shLabel: `Sh = ${shMs} ms/div`
		});
		const imageUrl = savePhysicsSvgAsset(`phy_4am_t1_osc_${difficulty}_s${seed}`, svg);

		const correctOpt = `$U_{\\max} = ${uMax}\\text{ V}$ و $f = ${freq}\\text{ Hz}$`;
		const mcq = buildUniqueMcqOptions(
			correctOpt,
			[
				{
					text: `$U_{\\max} = ${roundTo(uMax * 2, 2)}\\text{ V}$ و $f = ${freq}\\text{ Hz}$`,
					diagnosticFeedback: 'انتبه: نعد تدريجات $n_v$ من المحور الأفقي الوسطي إلى القمة وليس من القاع إلى القمة!'
				},
				{
					text: `$U_{\\max} = ${uMax}\\text{ V}$ و $f = ${roundTo(1 / tMs, 4)}\\text{ Hz}$`,
					diagnosticFeedback: 'نسيت تحويل الدور $T$ من $\\text{ms}$ إلى الثانية $\\text{s}$ قبل حساب $f = 1/T$.'
				},
				{
					text: `$U_{\\max} = ${uEff}\\text{ V}$ و $f = ${tMs}\\text{ Hz}$`,
					diagnosticFeedback: `$${uEff}\\text{ V}$ هو التوتر المنتج $U_{\\text{eff}}$، و$${tMs}\\text{ ms}$ هو الدور $T$ وليس التواتر.`
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `يمثل الشكل شاشة راسم الاهتزاز المهبطي المربوط بمنوب ($S_v = ${sv}\\text{ V/div}$، $S_h = ${shMs}\\text{ ms/div}$). ما قيمة التوتر الأعظمي $U_{\\max}$ والتواتر $f$؟`,
				questionTextAr: `من شاشة راسم الاهتزاز ($S_v = ${sv}\\text{ V/div}$، $S_h = ${shMs}\\text{ ms/div}$)، حدد $U_{\\max}$ و $f$:`,
				imageUrl,
				imageCaption: 'منحنى التوتر المتناوب على راسم الاهتزاز',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `$U_{\\max} = ${nv} \\times ${sv} = ${uMax}\\text{ V}$، والدور $T = ${nh} \\times ${shMs} = ${tMs}\\text{ ms} = ${tSec}\\text{ s}$، ومنه $f = \\frac{1}{${tSec}} = ${freq}\\text{ Hz}$.`
			},
			sujetExercise: {
				points: 6,
				instruction: `ربط تلميذ منوباً كهربائياً (دينامو) بمدخل راسم الاهتزاز المهبطي وضبطه على الحساسية العمودية $S_v = ${sv} " V/div"$ والحساسية الأفقية $S_h = ${shMs} " ms/div"$، فظهر المنحنى المبين في الشكل:`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) ما طبيعة التوتر الكهربائي المعاين؟ علّل إجابتك انطلاقاً من المنحنى، واذكر العنصرين الأساسيين المكونين للمنوب.`,
								answer: `1) توتر كهربائي متناوب جيبي لأنه يتغير دورياً بين قيم موجبة وسالبة حول المحور الزمني. يتكون المنوب أساساً من مغناطيس (محرّض) ووشيعة (متحرّض).`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'شاشة راسم الاهتزاز المهبطي'
							}
						]
					},
					{
						type: 'text',
						content: `2) احسب التوتر الأعظمي $U_"max"$، ثم استنتج التوتر المنتج $U_"eff"$ الذي يقيسه جهاز الفولطمتر (نأخذ $sqrt(2) approx 1.414$).`,
						answer: `2) نقرأ $n_v = ${nv} " div"$، إذن $U_"max" = n_v times S_v = ${nv} times ${sv} = ${uMax} " V"$.\n\n$U_"eff" = frac(U_"max", sqrt(2)) = frac(${uMax}, 1.414) approx ${uEff} " V"$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) احسب الدور $T$ بالثانية ($"s"$), ثم استنتج التواتر $f$ بالهرتز ($"Hz"$).`,
						answer: `3) نقرأ لدورة كاملة $n_h = ${nh} " div"$، ومنه $T = n_h times S_h = ${nh} times ${shMs} = ${tMs} " ms" = ${tSec} " s"$.\n\nالتواتر: $f = frac(1, T) = frac(1, ${tSec}) = ${freq} " Hz"$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) لو استبدلنا المنوب ببطارية كهربائية مستمرة توترها $${uMax} " V"$، فصف شكل المنحنى الذي سيظهر على الشاشة مع نفس الحساسية $S_v$.`,
						answer: `4) يظهر خط أفقي مستقيم وموازٍ لمحور الأزمنة على ارتفاع $${nv} " div"$ فوق الصفر لأن التوتر المستمر ثابت الشدة والجهة.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'التوتر الأعظمي يُقاس من محور الزمن الوسطي إلى القمة: $U_{\\max} = n_v \\times S_v$.',
				'حوّل الدور $T = n_h \\times S_h$ من الملّي ثانية إلى الثانية بالقسمة على $1000$.',
				'الفولطمتر يقيس التوتر المنتج $U_{\\text{eff}} = U_{\\max} / \\sqrt{2}$.'
			],
			solutionStepsAr: [
				'التوتر متناوب جيبي ناتج عن ظاهرة التحريض الكهرومغناطيسي بين المغناطيس والوشيعة.',
				`$U_{\\max} = ${nv} \\times ${sv} = ${uMax}\\text{ V}$ و$U_{\\text{eff}} = ${uEff}\\text{ V}$.`,
				`$T = ${tMs}\\text{ ms} = ${tSec}\\text{ s}$ ومنه $f = ${freq}\\text{ Hz}$.`,
				`البطارية تعطي خطاً أفقياً مستقيماً على ارتفاع ${nv} تدريجات.`
			],
			finalAnswer: `Umax = ${uMax} V, f = ${freq} Hz`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Household Electrical Safety & Fuse Sizing (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const householdSafetyTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_4am_t1_household_safety',
	grade: '4am',
	trimesterId: 't1',
	domain: 'electricity',
	titleAr: 'الأمن الكهربائي: المآخذ، المنصهرة، وحماية الدارة والأشخاص',
	curriculumLessonId: 'phy_lesson_4am_t1_electrical_safety',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const appliances = [
			{ name: 'غسالة', power: 2200, current: 10, fuseGood: 12 },
			{ name: 'مدفأة كهربائية', power: 1980, current: 9, fuseGood: 10 },
			{ name: 'فرن كهربائي', power: 2640, current: 12, fuseGood: 16 },
			{ name: 'مكواة', power: 1100, current: 5, fuseGood: 6 }
		];
		const app = rng.pick(appliances);
		const svg = buildFaultyHouseholdSvg('قاطعة على N', 'هيكل بلا أرضي', app.name);
		const imageUrl = savePhysicsSvgAsset(`phy_4am_t1_safe_${difficulty}_s${seed}`, svg);

		const correctOpt = `$I = ${app.current}\\text{ A}$ وعيار المنصهرة $${app.fuseGood}\\text{ A}$ على سلك الطور`;
		const mcq = buildUniqueMcqOptions(
			correctOpt,
			[
				{
					text: `$I = ${app.current}\\text{ A}$ وعيار المنصهرة $${app.fuseGood}\\text{ A}$ على السلك الحيادي`,
					diagnosticFeedback: 'المنصهرة تُركَّب دائماً على سلك الطور ($Ph$) وليس على الحيادي ($N$).'
				},
				{
					text: `$I = ${roundTo(app.current / 2, 1)}\\text{ A}$ وعيار المنصهرة $${app.fuseGood}\\text{ A}$ على سلك الطور`,
					diagnosticFeedback: 'احسب شدة التيار بالقانون $I = \\frac{P}{U}$ حيث $U = 220\\text{ V}$.'
				},
				{
					text: `$I = ${app.current}\\text{ A}$ وعيار المنصهرة $${Math.max(2, app.current - 3)}\\text{ A}$ على سلك الطور`,
					diagnosticFeedback: 'إذا كان عيار المنصهرة أصغر من تيار التشغيل العادي ستنصهر المنصهرة فور تشغيل الجهاز.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `يعمل جهاز (${app.name}) استطاعته $P = ${app.power}\\text{ W}$ تحت توتر منزلي $U = 220\\text{ V}$. ما شدة التيار المار فيه وما المنصهرة المناسبة لحمايته؟`,
				questionTextAr: `ما شدة تيار (${app.name}) استطاعته $${app.power}\\text{ W}$ تحت $220\\text{ V}$ وما المنصهرة المناسبة؟`,
				imageUrl,
				imageCaption: 'مخطط دارة منزلية',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `$I = \\frac{P}{U} = \\frac{${app.power}}{220} = ${app.current}\\text{ A}$، لذا نختار منصهرة عيارها $${app.fuseGood}\\text{ A}$ تُركَّب على سلك الطور ($Ph$).`
			},
			sujetExercise: {
				points: 6,
				instruction: `يمثّل المخطط المقابل جزءاً من شبكة كهربائية منزلية تغذي مصباحاً وجهاز (${app.name}) استطاعته $P = ${app.power} " W"$ تحت توتر $U = 220 " V"$:`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) اذكر طريقتين عمليتين للتمييز بين سلك الطور ($"Ph"$) والسلك الحيادي ($"N"$) في مأخذ كهربائي.`,
								answer: `1) بمفك البراغي الكاشف (يتوهج مصباحه عند الطور فقط)، أو باستعمال الألوان النظامية (الأحمر/البني للطور والأزرق للحيادي) أو الفولطمتر ($U_"Ph-T" = 220 " V"$ و$U_"N-T" = 0 " V"$).`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'المخطط المعطى'
							}
						]
					},
					{
						type: 'text',
						content: `2) استخرج من المخطط خطأين متعلقين بالأمن الكهربائي وحدّد الخطر الناجم عن كل خطأ.`,
						answer: `2) الخطأ الأول: القاطعة مركبة على السلك الحيادي ($"N"$)، وخطره التكهرب عند استبدال المصباح رغم فتح القاطعة.\n\nالخطأ الثاني: غياب التوصيل الأرضي ($"T"$) في هيكل جهاز ${app.name} وغياب المنصهرة والقاطع التفاضلي، وخطره التكهرب عند لمس الهيكل إذا لامس سلك الطور.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) احسب شدة التيار $I$ اللازمة لتشغيل جهاز (${app.name})، ثم اقترح عيار المنصهرة الأنسب من بين: $${Math.max(2, app.current - 3)} " A"$، $${app.fuseGood} " A"$، $${app.fuseGood + 15} " A"$.`,
						answer: `3) $I = frac(P, U) = frac(${app.power}, 220) = ${app.current} " A"$. المنصهرة الأنسب هي $${app.fuseGood} " A"$ لأنها أكبر بقليل من تيار التشغيل العادي وتنصهر عند أي زيادة خطيرة.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) اذكر التعديلات الواجب إنجازها على المخطط ليصبح آمناً ومطابقاً لقواعد الأمن الكهربائي.`,
						answer: `4) نقل القاطعة إلى سلك الطور ($"Ph"$), إضافة منصهرة عيارها $${app.fuseGood} " A"$ على سلك الطور، توصيل الهيكل المعدني بالمأخذ الأرضي ($"T"$), وتركيب قاطع تفاضلي في بداية الشبكة.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'يتوهج مفك البراغي الكاشف عند لمس سلك الطور ($Ph$) فقط.',
				'القاطعة والمنصهرة توصلان دائماً على سلك الطور ($Ph$)، والمأخذ الأرضي يحمي الأشخاص مع القاطع التفاضلي.',
				'احسب $I = P / U$ ثم اختر عيار المنصهرة الأكبر بقليل من $I$.'
			],
			solutionStepsAr: [
				'التمييز بمفك البراغي الكاشف والألوان النظامية أو الفولطمتر.',
				'الأخطاء: القاطعة على الحيادي وغياب المأخذ الأرضي/المنصهرة.',
				`$I = \\frac{${app.power}}{220} = ${app.current}\\text{ A}$ والمنصهرة المناسبة ${app.fuseGood}\\text{ A}$.`,
				'إصلاح المخطط بوضع القاطعة والمنصهرة على $Ph$ وتوصيل الأرضي والقاطع التفاضلي.'
			],
			finalAnswer: `I = ${app.current} A, fuse = ${app.fuseGood} A`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Integration 1: Household Electrical Installation Diagnosis (8 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationSafetyTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_4am_t1_integration_safety',
	grade: '4am',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: تشخيص وإصلاح أعطال شبكة كهربائية منزلية (BEM)',
	curriculumLessonId: 'phy_lesson_4am_t1_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cases = [
			{ dev1: 'غسالة ملابس', p1: 2200, i1: 10, dev2: 'مسخن ماء', p2: 2640, i2: 12, breaker: 20, fuse: 12 },
			{ dev1: 'ثلاجة وموقد', p1: 1760, i1: 8, dev2: 'مدفأة كهربائية', p2: 2860, i2: 13, breaker: 20, fuse: 10 },
			{ dev1: 'غسالة أطباق', p1: 2420, i1: 11, dev2: 'فرن كهربائي', p2: 2420, i2: 11, breaker: 20, fuse: 12 }
		];
		const c = rng.pick(cases);
		const iTotal = c.i1 + c.i2;
		const pTotal = c.p1 + c.p2;

		const svgFault = buildFaultyHouseholdSvg('قاطعة على N', 'تماس الطور بالهيكل', c.dev1);
		const svgFixed = svgCircuitDiagram({ kind: 'household_safety' });
		const imgFault = savePhysicsSvgAsset(`phy_4am_t1_int1_fault_${difficulty}_s${seed}`, svgFault);
		savePhysicsSvgAsset(`phy_4am_t1_int1_fix_${difficulty}_s${seed}`, svgFixed);

		const mcq = buildUniqueMcqOptions(
			`ينقطع القاطع التفاضلي لأن التيار الكلي ($${iTotal}\\text{ A}$) يفوق عياره ($${c.breaker}\\text{ A}$)`,
			[
				{
					text: `ينقطع القاطع التفاضلي لأن التوتر الكلي يصبح $440\\text{ V}$`,
					diagnosticFeedback: 'التوصيل المنزلي على التفرع يحافظ على ثبات التوتر $220\\text{ V}$، بينما تتجمع شدات التيار.'
				},
				{
					text: `لا ينقطع القاطع التفاضلي لأن التيار الكلي ($${iTotal - 6}\\text{ A}$) أصغر من $${c.breaker}\\text{ A}$`,
					diagnosticFeedback: `احسب بدقة: $I_{\\text{tot}} = \\frac{${pTotal}}{220} = ${iTotal}\\text{ A} > ${c.breaker}\\text{ A}$.`
				},
				{
					text: `يتلف الجهاز الأول فقط بسبب غياب السلك الحيادي`,
					diagnosticFeedback: 'الحمولة الزائدة تفصل القاطع الرئيسي لحماية جميع الأسلاك والأجهزة.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: 'integration',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في شبكة منزلية ($220\\text{ V}$) مضبوط قاطعها على $${c.breaker}\\text{ A}$، شُغّلت ${c.dev1} ($${c.p1}\\text{ W}$) و${c.dev2} ($${c.p2}\\text{ W}$) في آن واحد. ماذا يحدث؟`,
				questionTextAr: `تشغيل ${c.dev1} ($${c.p1}\\text{ W}$) و${c.dev2} ($${c.p2}\\text{ W}$) معاً على قاطع $${c.breaker}\\text{ A}$:`,
				imageUrl: imgFault,
				imageCaption: 'مخطط الشبكة المنزلية',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الاستطاعة الكلية $P = ${pTotal}\\text{ W}$، ومنه $I_{\\text{tot}} = \\frac{${pTotal}}{220} = ${iTotal}\\text{ A} > ${c.breaker}\\text{ A}$ فيفصل القاطع بسبب الحمولة الزائدة.`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `انتقلت عائلة إلى مسكن جديد مزوّد بتوتر القطاع المنزلي ($220 " V" - 50 " Hz"$) وقاطع تفاضلي عياره $${c.breaker} " A"$. عند استعمال الأجهزة، لاحظت الأم ثلاثة حوادث:\n- الحادث (1): شعورها بصدمة كهربائية عند لمس هيكل الـ${c.dev1} ($${c.p1} " W"$).\n- الحادث (2): انقطاع التيار عن كامل المنزل عند تشغيل الـ${c.dev1} والـ${c.dev2} ($${c.p2} " W"$) معاً.\n- الحادث (3): تكهرب الأب عند استبداله لمصباح الغرفة رغم أن القاطعة كانت مفتوحة.`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `اعتماداً على السند المرفق ومعارفك:\n\n1) قدّم تفسيراً علمياً دقيقاً لسبب كل حادث من الحوادث الثلاثة.`,
								answer: `1) الحادث (1): تماس سلك الطور ($"Ph"$) بالهيكل المعدني للـ${c.dev1} مع غياب التوصيل الأرضي ($"T"$).\n\nالحادث (2): الزيادة في الحمولة، حيث تجاوزت شدة التيار الكلية عيار القاطع التفاضلي ($${c.breaker} " A"$).\n\nالحادث (3): تركيب القاطعة على السلك الحيادي ($"N"$) بدلاً من سلك الطور ($"Ph"$), مما أبقي التوتر الخطير في غمد المصباح.`,
								mark: '2'
							},
							{
								type: 'image',
								src: imgFault,
								caption: 'الوثيقة: مخطط الشبكة قبل التصحيح'
							}
						]
					},
					{
						type: 'text',
						content: `2) برّر حسابياً سبب الحادث (2) بحساب شدة التيار في كل جهاز والشدة الكلية، ثم حدّد عيار المنصهرة اللازمة لحماية الـ${c.dev1} وحدها.`,
						answer: `2) $I_1 = frac(${c.p1}, 220) = ${c.i1} " A"$، و$I_2 = frac(${c.p2}, 220) = ${c.i2} " A"$.\n\nالشدة الكلية: $I_"tot" = ${c.i1} + ${c.i2} = ${iTotal} " A" > ${c.breaker} " A"$، لذا يفصل القاطع تلقائياً.\n\nالمنصهرة المناسبة للـ${c.dev1}: عيار $${c.fuse} " A"$ (أو أكبر بقليل من $${c.i1} " A"$).`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) اقترح حلاً تقنياً مناسباً لكل حادث لضمان سلامة الأشخاص وحماية التجهيزات الكهربائية.`,
						answer: `3) - عزل سلك الطور عن هيكل الـ${c.dev1} وتوصيل هيكلها بالمأخذ الأرضي ($"T"$).\n- عدم تشغيل الجهازين عاليي الاستطاعة في وقت واحد (أو رفع عيار الاشتراك).\n- نقل القاطعة والمنصهرة إلى سلك الطور ($"Ph"$).`,
						mark: '2'
					},
					{
						type: 'text',
						content: `4) صف بدقة كيف يجب إعادة رسم المخطط النظامي الصحيح للشبكة الكهربائية المنزلية (موضع القاطع التفاضلي، القاطعة، المنصهرة، المأخذ الأرضي، والتفرع).`,
						answer: `4) في المخطط المصحح: يوضع القاطع التفاضلي في بداية الدارة، تفرّع دارة المصباح ودارة المأخذ على التوازي بين $"Ph"$ و$"N"$، توضع القاطعة والمنصهرة ($${c.fuse} " A"$) على سلك الطور $"Ph"$، ويوصل المأخذ الثلاثي بسلك التأريض $"T"$ المتصل بالأرض وبإطار الـ${c.dev1}.`,
						mark: '2'
					}
				]
			},
			hints: [
				'اربط كل حادث بالظاهرة المباشرة: التماس + غياب الأرضي، الحمولة الزائدة، وموضع القاطعة على الحيادي.',
				'احسب $I_1 = P_1/U$ و$I_2 = P_2/U$ ثم قارن $I_1 + I_2$ بعيار القاطع.',
				'تذكّر شروط الشبكة المنزلية السليمة: القاطعة والمنصهرة على الطور $Ph$، الأرضي على الهياكل المعدنية، والقاطع التفاضلي في المدخل.'
			],
			solutionStepsAr: [
				'تحديد الأسباب الثلاثة بدقة وفق قواعد الأمن الكهربائي.',
				`حساب الشدات: $I_1 = ${c.i1}\\text{ A}$، $I_2 = ${c.i2}\\text{ A}$، $I_{\\text{tot}} = ${iTotal}\\text{ A} > ${c.breaker}\\text{ A}$.`,
				'اقتراح الحلول العملية: التأريض، تنظيم التشغيل، ونقل القاطعة والمنصهرة للطور.',
				'وصف المخطط النظامي المصحح بمراعاة التفرع وحماية الأشخاص والأجهزة.'
			],
			finalAnswer: `I_tot = ${iTotal} A > ${c.breaker} A`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Integration 2: Electrostatic Tank Hazard + Backup AC Generator (8 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationAcStaticTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_4am_t1_integration_ac_static',
	grade: '4am',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: التكهرب في ورشة صناعية ومعاينة مولد متناوب (BEM)',
	curriculumLessonId: 'phy_lesson_4am_t1_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const nExp = rng.pick([4, 5, 6]);
		const nCoef = rng.pick([2, 3, 5]);
		// q = - nCoef * 10^nExp * 1.6e-19
		const qMant = roundTo(nCoef * 1.6, 2);
		const qExp = nExp - 19;

		const nv = rng.pick([2, 3, 4]);
		const sv = nv === 2 ? 155.5 : nv === 3 ? 104 : 78;
		const uMax = roundTo(nv * sv, 1);
		const uEff = roundTo(uMax / Math.SQRT2, 1);
		const nh = 4;
		const shMs = 5;
		const tMs = nh * shMs; // 20 ms
		const freq = 50;

		const svgOsc = svgOscilloscopeTrace({
			amplitudeDivs: nv,
			periodDivs: nh,
			svLabel: `Sv = ${sv} V/div`,
			shLabel: `Sh = ${shMs} ms/div`
		});
		const imgOsc = savePhysicsSvgAsset(`phy_4am_t1_int2_osc_${difficulty}_s${seed}`, svgOsc);

		const mcq = buildUniqueMcqOptions(
			`$U_{\\text{eff}} \\approx ${uEff}\\text{ V}$ و $f = ${freq}\\text{ Hz}$`,
			[
				{
					text: `$U_{\\text{eff}} \\approx ${uMax}\\text{ V}$ و $f = ${freq}\\text{ Hz}$`,
					diagnosticFeedback: `$${uMax}\\text{ V}$ هو التوتر الأعظمي $U_{\\max}$ وليس المنتج $U_{\\text{eff}}$.`
				},
				{
					text: `$U_{\\text{eff}} \\approx ${uEff}\\text{ V}$ و $f = ${tMs}\\text{ Hz}$`,
					diagnosticFeedback: `$${tMs}\\text{ ms}$ هو الدور $T$ وليس التواتر $f = 1/T$.`
				},
				{
					text: `$U_{\\text{eff}} \\approx ${roundTo(uMax * 1.414, 1)}\\text{ V}$ و $f = 25\\text{ Hz}$`,
					diagnosticFeedback: 'لإيجاد التوتر المنتج نقسم $U_{\\max}$ على $\\sqrt{2}$ ولا نضرب.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: 'integration',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `لتشغيل آلة تعبئة ($220\\text{ V}, 50\\text{ Hz}$) استُعمل مولد متناوب عُوين براسم الاهتزاز ($S_v = ${sv}\\text{ V/div}$، $S_h = ${shMs}\\text{ ms/div}$). ما قيمة $U_{\\text{eff}}$ و $f$؟`,
				questionTextAr: `من منحنى المولد الاحتياطي ($S_v = ${sv}\\text{ V/div}$، $S_h = ${shMs}\\text{ ms/div}$)، احسب $U_{\\text{eff}}$ و $f$:`,
				imageUrl: imgOsc,
				imageCaption: 'منحنى المولد الاحتياطي',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `$U_{\\max} = ${nv} \\times ${sv} = ${uMax}\\text{ V}$ ومنه $U_{\\text{eff}} = \\frac{${uMax}}{\\sqrt{2}} \\approx ${uEff}\\text{ V}$، والدور $T = ${tMs}\\text{ ms} = 0.02\\text{ s}$ أي $f = 50\\text{ Hz}$.`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `في ورشة تعبئة وتغليف، تنساب حبيبات بلاستيكية بسرعة داخل أنبوب معدني معزول عن الأرض، فتظهر شرارات كهربائية مزعجة كلما لمس العامل الأنبوب. ومن جهة أخرى، عند انقطاع كهرباء الشبكة ($220 " V" - 50 " Hz"$), يُشغَّل مولد متناوب احتياطي تمت معاينة توتره براسم الاهتزاز المهبطي كما في الشكل ($S_v = ${sv} " V/div"$ و$S_h = ${shMs} " ms/div"$).`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) الجزء الأول (التكهرب والوقاية): فسّر سبب ظهور شحنة كهربائية سالبة على الأنبوب المعدني، ثم احسب الشحنة $q$ التي يكتسبها الأنبوب إذا انتقل إليه $n = ${nCoef} times 10^${nExp}$ إلكتروناً ($e = 1.6 times 10^(-19) " C"$).`,
								answer: `1) السبب هو التكهرب بالدلك (احتكاك الحبيبات البلاستيكية بجدار الأنبوب يؤدي إلى انتقال الإلكترونات إلى الأنبوب).\n\nحساب الشحنة: $q = -n times e = -(${nCoef} times 10^${nExp}) times (1.6 times 10^(-19)) = -${qMant} times 10^(${qExp}) " C"$.`,
								mark: '2'
							},
							{
								type: 'image',
								src: imgOsc,
								caption: 'الوثيقة: معاينة المولد المتناوب'
							}
						]
					},
					{
						type: 'text',
						content: `2) اقترح حلاً عملياً بسيطاً لتفادي تراكم الشحنات الكهربائية على الأنبوب المعدني وحماية العامل، مفسراً مبدأ عمل هذا الحل مجهرياً.`,
						answer: `2) الحل هو تأريض الأنبوب المعدني بتوصيله بسلك ناقل إلى الأرض؛ لأن الأرض ناقل ضخم يسمح بتسرب الإلكترونات الزائدة باستمرار من الأنبوب نحو الأرض فلا تتراكم الشحنات.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) الجزء الثاني (توافق المولد الاحتياطي): انطلاقاً من منحنى راسم الاهتزاز المهبطي، احسب التوتر الأعظمي $U_"max"$، التوتر المنتج $U_"eff"$، الدور $T$، والتواتر $f$.`,
						answer: `3) $U_"max" = ${nv} times ${sv} = ${uMax} " V"$.\n\n$U_"eff" = frac(${uMax}, sqrt(2)) approx ${uEff} " V"$.\n\n$T = ${nh} times ${shMs} = ${tMs} " ms" = 0.02 " s"$.\n\n$f = frac(1, 0.02) = ${freq} " Hz"$.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `4) هل يمكن تشغيل آلة التعبئة ($220 " V" - 50 " Hz"$) بأمان باستعمال هذا المولد؟ وكيف نحميها من الزيادة المفاجئة في شدة التيار؟`,
						answer: `4) نعم، لأن التوتر المنتج للمولد ($approx ${uEff} " V"$) وتواتره ($${freq} " Hz"$) يوافقان مواصفات الآلة ($220 " V" - 50 " Hz"$). لحمايتها نركّب منصهرة مناسبة على سلك الطور ($"Ph"$) وقاطعاً تفاضلياً ومأخذاً أرضياً لهيكل الآلة.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'احتكاك البلاستيك بالمعدن يسبب التكهرب بالدلك، والتأريض يسرب الشحنات للأرض.',
				'استخرج $n_v$ و$n_h$ من شبكة الشاشة ثم احسب $U_{\\max}, U_{\\text{eff}}, T, f$.',
				'قارن $U_{\\text{eff}}$ و$f$ مع مواصفات القطاع ($220\\text{ V}, 50\\text{ Hz}$).'
			],
			solutionStepsAr: [
				`تكهرب بالدلك، $q = -${qMant} \\times 10^{${qExp}}\\text{ C}$.`,
				'توصيل الأنبوب بالأرض لتسريب الإلكترونات الزائدة.',
				`$U_{\\max} = ${uMax}\\text{ V}$, $U_{\\text{eff}} \\approx ${uEff}\\text{ V}$, $T = 0.02\\text{ s}$, $f = ${freq}\\text{ Hz}$.`,
				'المولد موافق، والحماية بالمنصهرة على الطور والمأخذ الأرضي والقاطع التفاضلي.'
			],
			finalAnswer: `Ueff ≈ ${uEff} V, f = ${freq} Hz`
		};
	}
};

export const PHYSICS_TEMPLATES_4AM_T1: PhysicsParameterizedTemplate[] = [
	electrificationTemplate,
	atomicChargeTemplate,
	oscilloscopeAcTemplate,
	householdSafetyTemplate,
	integrationSafetyTemplate,
	integrationAcStaticTemplate
];
