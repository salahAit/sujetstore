import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import { chemEquation, chemSpecies } from '../../chem-helpers';
import { savePhysicsSvgAsset, wrapPhysicsSvg } from '../../svg-physics';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';

function svgElectrolysis2am(volH2: number, volO2: number, labelH2 = '؟ (1)', labelO2 = '؟ (2)'): string {
	const body = `
		<text x="180" y="20" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">التحليل الكهربائي للماء (وعاء فولطا)</text>
		<rect x="85" y="74" width="190" height="86" rx="5" fill="#e0f2fe" stroke="#0f172a" stroke-width="1.8"/>
		<rect x="122" y="38" width="24" height="82" rx="4" fill="#ffffff" stroke="#1e293b" stroke-width="1.5"/>
		<rect x="214" y="38" width="24" height="82" rx="4" fill="#ffffff" stroke="#1e293b" stroke-width="1.5"/>
		<rect x="123" y="39" width="22" height="46" fill="#fef3c7"/>
		<rect x="215" y="39" width="22" height="23" fill="#dcfce7"/>
		<rect x="130" y="106" width="8" height="48" fill="#334155"/>
		<rect x="222" y="106" width="8" height="48" fill="#334155"/>
		<text x="112" y="58" text-anchor="end" font-size="11" font-weight="bold" fill="#b45309">${labelH2}</text>
		<text x="112" y="73" text-anchor="end" font-size="10.5" fill="#78350f">V₁ = ${volH2} mL</text>
		<text x="248" y="58" text-anchor="start" font-size="11" font-weight="bold" fill="#15803d">${labelO2}</text>
		<text x="248" y="73" text-anchor="start" font-size="10.5" fill="#166534">V₂ = ${volO2} mL</text>
		<text x="180" y="148" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1">ماء + صودا</text>
		<text x="134" y="176" text-anchor="middle" font-size="11" font-weight="bold" fill="#2563eb">المهبط (-)</text>
		<text x="226" y="176" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">المصعد (+)</text>
	`;
	return wrapPhysicsSvg(360, 190, body);
}

function svgBalanceFlask2am(mBefore: number, mAfterLabel: string, closed: boolean): string {
	const body = `
		<text x="180" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">${closed ? 'تفاعل في دورق مغلق بالبالون' : 'تفاعل في دورق مفتوح'}</text>
		<rect x="35" y="132" width="110" height="26" rx="4" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>
		<text x="90" y="149" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">${mBefore} g</text>
		<polygon points="65,132 115,132 100,82 80,82" fill="#dbeafe" stroke="#1e293b" stroke-width="1.6"/>
		<path d="M80 82 Q65 65 78 52 Q90 44 102 52 Q115 65 100 82 Z" fill="#fde68a" stroke="#b45309" stroke-width="1.4"/>
		<text x="90" y="173" text-anchor="middle" font-size="11" fill="#1e40af">قبل المزج</text>
		<path d="M160 105 L196 105" stroke="#16a34a" stroke-width="2.2"/>
		<polygon points="194,100 202,105 194,110" fill="#16a34a"/>
		<rect x="215" y="132" width="110" height="26" rx="4" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>
		<text x="270" y="149" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#15803d">${mAfterLabel}</text>
		<polygon points="245,132 295,132 280,82 260,82" fill="#bae6fd" stroke="#1e293b" stroke-width="1.6"/>
		${
			closed
				? `<ellipse cx="270" cy="58" rx="22" ry="22" fill="#fef08a" stroke="#b45309" stroke-width="1.5"/>
				   <text x="270" y="62" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#92400e">غاز CO₂</text>`
				: `<text x="270" y="64" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">↑ تصاعد الغاز</text>`
		}
		<text x="270" y="173" text-anchor="middle" font-size="11" fill="#166534">بعد التفاعل</text>
	`;
	return wrapPhysicsSvg(360, 188, body);
}

function svgMicroCarbonCombustion(): string {
	const body = `
		<text x="180" y="18" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">النموذج الجزيئي المتراص للتحول</text>
		<rect x="12" y="30" width="150" height="96" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>
		<text x="87" y="48" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">المتفاعلات</text>
		<circle cx="46" cy="82" r="14" fill="#1f2937"/>
		<text x="72" y="87" font-size="15" font-weight="bold" fill="#475569">+</text>
		<circle cx="106" cy="82" r="12" fill="#ef4444" stroke="#991b1b"/>
		<circle cx="130" cy="82" r="12" fill="#ef4444" stroke="#991b1b"/>
		<text x="87" y="114" text-anchor="middle" font-size="10.5" fill="#0f172a">كربون + أكسجين</text>
		<path d="M168 78 L192 78" stroke="#0f172a" stroke-width="2.2"/>
		<polygon points="190,73 198,78 190,83" fill="#0f172a"/>
		<rect x="202" y="30" width="146" height="96" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="1.4"/>
		<text x="275" y="48" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534">النواتج</text>
		<circle cx="250" cy="82" r="12" fill="#ef4444" stroke="#991b1b"/>
		<circle cx="275" cy="82" r="14" fill="#1f2937"/>
		<circle cx="300" cy="82" r="12" fill="#ef4444" stroke="#991b1b"/>
		<text x="275" y="114" text-anchor="middle" font-size="10.5" fill="#166534">ثنائي أكسيد الكربون</text>
	`;
	return wrapPhysicsSvg(360, 140, body);
}

function svgMicroWaterSynthesis(): string {
	const body = `
		<text x="180" y="18" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">نموذج التحليل الكهربائي للماء</text>
		<rect x="12" y="30" width="146" height="96" rx="8" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.4"/>
		<text x="85" y="48" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">المادة الابتدائية</text>
		<circle cx="62" cy="80" r="11" fill="#ef4444"/><circle cx="51" cy="90" r="6" fill="#fff" stroke="#334155"/><circle cx="73" cy="90" r="6" fill="#fff" stroke="#334155"/>
		<circle cx="108" cy="80" r="11" fill="#ef4444"/><circle cx="97" cy="90" r="6" fill="#fff" stroke="#334155"/><circle cx="119" cy="90" r="6" fill="#fff" stroke="#334155"/>
		<text x="85" y="114" text-anchor="middle" font-size="10.5" fill="#0f172a">جزيئا ماء</text>
		<path d="M164 78 L188 78" stroke="#0f172a" stroke-width="2.2"/>
		<polygon points="186,73 194,78 186,83" fill="#0f172a"/>
		<rect x="198" y="30" width="150" height="96" rx="8" fill="#fefce8" stroke="#fde047" stroke-width="1.4"/>
		<text x="273" y="48" text-anchor="middle" font-size="11" font-weight="bold" fill="#854d0e">المواد الناتجة</text>
		<circle cx="222" cy="74" r="6" fill="#fff" stroke="#334155"/><circle cx="234" cy="74" r="6" fill="#fff" stroke="#334155"/>
		<circle cx="222" cy="92" r="6" fill="#fff" stroke="#334155"/><circle cx="234" cy="92" r="6" fill="#fff" stroke="#334155"/>
		<text x="255" y="87" font-size="14" font-weight="bold" fill="#475569">+</text>
		<circle cx="288" cy="82" r="11" fill="#ef4444"/><circle cx="310" cy="82" r="11" fill="#ef4444"/>
		<text x="273" y="114" text-anchor="middle" font-size="10.5" fill="#854d0e">هيدروجين + أكسجين</text>
	`;
	return wrapPhysicsSvg(360, 140, body);
}

function svgIntegrationKitchenLab(mReact1: number, mReact2: number): string {
	const body = `
		<text x="180" y="18" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">سند الوضعية: احتراق الغاز وتسخين الماء</text>
		<rect x="16" y="32" width="156" height="106" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.4"/>
		<text x="94" y="52" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e40af">1) القدر المغلق</text>
		<text x="94" y="76" text-anchor="middle" font-size="11" fill="#0f172a">تبخر الماء وتكثفه</text>
		<text x="94" y="98" text-anchor="middle" font-size="10.5" fill="#1d4ed8">جزيئات H₂O محفوظة</text>
		<text x="94" y="120" text-anchor="middle" font-size="10.5" fill="#15803d">الكتلة ثابتة</text>
		<rect x="188" y="32" width="156" height="106" rx="8" fill="#fff7ed" stroke="#ea580c" stroke-width="1.4"/>
		<text x="266" y="52" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#9a3412">2) موقد الميثان</text>
		<text x="266" y="76" text-anchor="middle" font-size="11" fill="#0f172a">${mReact1} g ميثان + ${mReact2} g أكسجين</text>
		<text x="266" y="98" text-anchor="middle" font-size="10.5" fill="#c2410c">ينتج CO₂ + بخار ماء</text>
		<text x="266" y="120" text-anchor="middle" font-size="10.5" fill="#15803d">تعكر رائق الكلس</text>
	`;
	return wrapPhysicsSvg(360, 150, body);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Physical vs Chemical Changes & Water Electrolysis
// ═══════════════════════════════════════════════════════════════════════════════
const physicalChemicalChangesTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2am_t1_physical_chemical_changes',
	grade: '2am',
	trimesterId: 't1',
	domain: 'matter',
	titleAr: 'التحول الفيزيائي والتحول الكيميائي والتحليل الكهربائي للماء',
	curriculumLessonId: 'phy_lesson_2am_t1_physical_vs_chemical_changes',
	defaultPoints: 6,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const volO2 = difficulty === 'easy' ? rng.int(4, 8) * 2 : rng.int(7, 16);
		const volH2 = volO2 * 2;
		const pairs = [
			{ phys: 'انحلال الملح في الماء', chem: 'تفحم السكر بالتسخين', physReason: 'لأن الملح لم تتغير طبيعته ويمكن استرجاعه بتبخير الماء' },
			{ phys: 'انصهار قطعة شمع', chem: 'احتراق فتيل الشمعة', physReason: 'لأنه تغير في الحالة الفيزيائية فقط ويمكن إرجاعه بالتبريد' },
			{ phys: 'تبخر ماء البحر', chem: 'صدأ مسمار حديدي', physReason: 'لأن الماء يحتفظ بطبيعته ويمكن تكثيف بخاره' },
			{ phys: 'تقطيع سلك نحاسي', chem: 'تعفن ثمرة تفاح', physReason: 'لأن الشكل فقط تغير دون ظهور مواد جديدة' }
		];
		const pair = rng.pick(pairs);

		const svg = svgElectrolysis2am(volH2, volO2);
		const imageUrl = savePhysicsSvgAsset(`phy_2am_t1_changes_${difficulty}_s${seed}`, svg);
		const eqElectro = chemEquation([{ formula: 'H2O', state: 'l' }], [{ formula: 'H2', state: 'g' }, { formula: 'O2', state: 'g' }]);
		const h2Sp = chemSpecies('H2');
		const o2Sp = chemSpecies('O2');

		const askGas = difficulty === 'easy' ? 'H2' : 'O2';
		const correctText =
			askGas === 'H2'
				? `غاز الهيدروجين (${h2Sp.katex})، وحجمه $${volH2}\\text{ mL}$`
				: `غاز الأكسجين (${o2Sp.katex})، وحجمه $${volO2}\\text{ mL}$`;
		const wrongSwap =
			askGas === 'H2'
				? `غاز الأكسجين (${o2Sp.katex})، وحجمه $${volH2}\\text{ mL}$`
				: `غاز الهيدروجين (${h2Sp.katex})، وحجمه $${volO2}\\text{ mL}$`;
		const wrongVol =
			askGas === 'H2'
				? `غاز الهيدروجين (${h2Sp.katex})، وحجمه $${volO2}\\text{ mL}$`
				: `غاز الأكسجين (${o2Sp.katex})، وحجمه $${volH2}\\text{ mL}$`;

		const mcq = buildUniqueMcqOptions(
			correctText,
			[
				{
					text: wrongSwap,
					diagnosticFeedback:
						askGas === 'H2'
							? 'الغاز الذي يفرقع عند تقريب لهب هو الهيدروجين وليس الأكسجين!'
							: 'الغاز الذي يزيد توهج عود الثقاب هو الأكسجين وليس الهيدروجين!'
				},
				{
					text: wrongVol,
					diagnosticFeedback:
						'تذكر أن حجم غاز الهيدروجين الناتج يساوي ضعف حجم غاز الأكسجين ($V_{\\ce{H2}} = 2 V_{\\ce{O2}}$).'
				},
				{
					text: `غاز ثنائي أكسيد الكربون ($\\ce{CO2}$)، وحجمه $${volH2 + volO2}\\text{ mL}$`,
					diagnosticFeedback:
						'التحليل الكهربائي للماء ينتج الهيدروجين والأكسجين فقط، ولا ينتج $\\ce{CO2}$.'
				}
			],
			rng
		);

		const questionPrompt =
			askGas === 'H2'
				? `أثناء التحليل الكهربائي للماء، جمعنا غازين حجمهما $${volH2}\\text{ mL}$ و$${volO2}\\text{ mL}$. ما اسم الغاز الذي يُحدث فرقعة خفيفة بعود ثقاب مشتعل، وما حجمه؟`
				: `أثناء التحليل الكهربائي للماء، جمعنا غازين حجمهما $${volH2}\\text{ mL}$ و$${volO2}\\text{ mL}$. ما اسم الغاز الذي يزيد من توهج عود ثقاب متوهج، وما حجمه؟`;

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: questionPrompt,
				questionTextAr: questionPrompt,
				imageUrl,
				imageCaption: 'التحليل الكهربائي للماء في وعاء فولطا',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `في التحليل الكهربائي للماء، يكون حجم غاز الهيدروجين ضعف حجم غاز الأكسجين: $V(\\ce{H2}) = ${volH2}\\text{ mL}$ (يفرقع بعود ثقاب) و $V(\\ce{O2}) = ${volO2}\\text{ mL}$ (يزيد التوهج).`
			},
			sujetExercise: {
				points: 6,
				instruction: 'أجرى تلاميذ السنة الثانية متوسط في مخبر الفيزياء عدة تجارب لدراسة تحولات المادة.',
				content: [
					{
						type: 'columns',
						widths: ['1.4fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) صنّف التحولين التاليين إلى تحول فيزيائي أو تحول كيميائي مع التعليل:\n\n- التجربة (أ): ${pair.phys}.\n\n- التجربة (ب): ${pair.chem}.`,
								answer: `1) - التجربة (أ): تحول فيزيائي، ${pair.physReason}.\n\n- التجربة (ب): تحول كيميائي لأنه يؤدي إلى اختفاء المادة الابتدائية وظهور مواد جديدة بخصائص مختلفة ولا يمكن الرجوع للحالة الابتدائية.`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'تركيب التحليل الكهربائي للماء'
							}
						]
					},
					{
						type: 'text',
						content: `2) في التجربة الموضحة في الشكل (وعاء فولطا)، مرّ تيار كهربائي مستمر في ماء مقطر أُضيفت إليه قطرات من الصودا، فانطلق غازان: في الأنبوب (1) حجم قدره $${volH2}$ مل، وفي الأنبوب (2) حجم قدره $${volO2}$ مل.\n\nأ) ما نوع التحول الحادث للماء؟ علّل.\n\nب) سمّ الغاز المتصاعد في كل أنبوب وكيف نكشف عنهما تجريبياً؟`,
						answer: `2) أ) التحليل الكهربائي للماء تحول كيميائي لأن الماء يختفي وتتشكل مادتان جديدتان هما غازا الهيدروجين والأكسجين.\n\nب) الأنبوب (1) ذو الحجم الأكبر ($${volH2}$ مل): غاز الهيدروجين ${h2Sp.typst}، نكشف عنه بتقريب عود ثقاب مشتعل فيحدث فرقعة خفيفة.\n\nالأنبوب (2) ذو الحجم الأصغر ($${volO2}$ مل): غاز الأكسجين ${o2Sp.typst}، نكشف عنه بتقريب عود ثقاب متوهج فيزداد توهجه.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `3) ما دور الصودا المضافة للماء المقطر في هذه التجربة؟ ثم عبّر عن هذا التحول بالصيغ الكيميائية.`,
						answer: `3) دور الصودا هو تسهيل مرور التيار الكهربائي لأن الماء المقطر عازل.\n\nالتعبير الرمزي: ${eqElectro.typst}.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'التحول الفيزيائي يحافظ على طبيعة المادة ويمكن الرجوع للحالة الابتدائية، أما الكيميائي فينتج مواد جديدة.',
				`حجم غاز الهيدروجين يساوي ضعف حجم غاز الأكسجين ($${volH2} = 2 \\times ${volO2}$).`,
				'الهيدروجين يحدث فرقعة بعود الثقاب المشتعل، والأكسجين يزيد توهج عود الثقاب.'
			],
			solutionStepsAr: [
				`التجربة (أ) (${pair.phys}) تحول فيزيائي، والتجربة (ب) (${pair.chem}) تحول كيميائي.`,
				`التحليل الكهربائي للماء تحول كيميائي: ${eqElectro.katex}.`,
				`الأنبوب (1): غاز الهيدروجين $${volH2}\\text{ mL}$ (فرقعة)؛ الأنبوب (2): غاز الأكسجين $${volO2}\\text{ mL}$ (يزيد التوهج).`
			],
			finalAnswer: askGas === 'H2' ? `الهيدروجين (${volH2} mL)` : `الأكسجين (${volO2} mL)`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Conservation of Mass (Lavoisier)
// ═══════════════════════════════════════════════════════════════════════════════
const massConservationTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2am_t1_mass_conservation',
	grade: '2am',
	trimesterId: 't1',
	domain: 'matter',
	titleAr: 'انحفاظ الكتلة خلال التحولين الفيزيائي والكيميائي',
	curriculumLessonId: 'phy_lesson_2am_t1_mass_conservation',
	defaultPoints: 6,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const mFlask = rng.int(110, 150);
		const mVinegar = rng.int(40, 70);
		const mBicarb = rng.int(4, 12);
		const mTotalBefore = mFlask + mVinegar + mBicarb;

		const mGas = difficulty === 'easy' ? rng.int(2, 4) : rng.int(3, 6);
		const mAfterOpen = mTotalBefore - mGas;
		const mIce = rng.int(120, 240);
		const mSalt = rng.int(10, 25);

		const svg = svgBalanceFlask2am(mTotalBefore, `${mTotalBefore} g`, true);
		const imageUrl = savePhysicsSvgAsset(`phy_2am_t1_mass_${difficulty}_s${seed}`, svg);
		const co2Sp = chemSpecies('CO2');

		const askOpenLoss = difficulty === 'hard';
		const correctText = askOpenLoss
			? `$${mGas}\\text{ g}$`
			: `$${mTotalBefore}\\text{ g}$`;
		const distractors = askOpenLoss
			? [
					{
						text: `$${mTotalBefore}\\text{ g}$`,
						diagnosticFeedback: 'هذه الكتلة الكلية للجملة قبل التفاعل وليست كتلة الغاز المتصاعد!'
					},
					{
						text: `$${mAfterOpen}\\text{ g}$`,
						diagnosticFeedback: 'هذه قراءة الميزان بعد تسرب الغاز، نطرحها من الكتلة الابتدائية لإيجاد كتلة الغاز.'
					},
					{
						text: `$${mGas + mBicarb}\\text{ g}$`,
						diagnosticFeedback: 'احسب الفرق فقط: $m_{\\text{غاز}} = m_1 - m_2$.'
					}
			  ]
			: [
					{
						text: `$${mTotalBefore - mBicarb}\\text{ g}$`,
						diagnosticFeedback: 'الكتلة محفوظة في الإناء المغلق؛ كتلة البيكربونات تحولت إلى غاز محبوس داخل البالون ولم تختفِ.'
					},
					{
						text: `$${mTotalBefore + mBicarb}\\text{ g}$`,
						diagnosticFeedback: 'انتفاخ البالون بالغاز يزيد الحجم ولا يزيد الكتلة الإجمالية!'
					},
					{
						text: `$${mVinegar + mBicarb}\\text{ g}$`,
						diagnosticFeedback: 'لا تنسَ أن الميزان يقيس أيضاً كتلة الدورق والبالون الفارغين ($' + mFlask + '\\text{ g}$).'
					}
			  ];

		const mcq = buildUniqueMcqOptions(correctText, distractors, rng);
		const qText = askOpenLoss
			? `أُجري تفاعل بين الخل وبيكربونات الصوديوم في دورق **مفتوح** فوق ميزان، فكانت الكتلة الابتدائية $${mTotalBefore}\\text{ g}$ وأصبحت بعد توقف الفوران $${mAfterOpen}\\text{ g}$. ما كتلة غاز ${co2Sp.katex} المتصاعد؟`
			: `وضعنا $${mVinegar}\\text{ g}$ من الخل و$${mBicarb}\\text{ g}$ من البيكربونات داخل دورق مغلق ببالون كتلتهما فارغين $${mFlask}\\text{ g}$. بعد التفاعل وانتفاخ البالون، كم يشير إليه الميزان؟`;

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'التحقق من قانون انحفاظ الكتلة في إناء مغلق',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: askOpenLoss
					? `النقص في القراءة يعادل كتلة الغاز المتسرب: $m_{\\text{غاز}} = ${mTotalBefore} - ${mAfterOpen} = ${mGas}\\text{ g}$.`
					: `حسب مبدأ انحفاظ الكتلة في إناء مغلق: $m_2 = m_1 = ${mFlask} + ${mVinegar} + ${mBicarb} = ${mTotalBefore}\\text{ g}$.`
			},
			sujetExercise: {
				points: 6,
				instruction: 'لغرض التحقق من مبدأ انحفاظ الكتلة (أعمال العالم لافوازييه)، أنجز التلاميذ التجربتين التاليتين:',
				content: [
					{
						type: 'text',
						content: `التجربة الأولى: أذاب تلميذ $${mSalt}$ غ من الملح في $${mIce}$ غ من الماء السائل داخل كأس.\n\n1) ما نوع التحول الحادث؟ وما كتلة المحلول الملحي الناتج؟ علّل.`,
						answer: `1) ذوبان الملح تحول فيزيائي. بما أن الكتلة محفوظة خلال التحول الفيزيائي، فإن كتلة المحلول هي: $m = ${mIce} + ${mSalt} = ${mIce + mSalt}$ غ.`,
						mark: '2'
					},
					{
						type: 'columns',
						widths: ['1.4fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `التجربة الثانية: وضعنا في دورق وزنه مع البالون فارغين $${mFlask}$ غ كمية $${mVinegar}$ غ من الخل، ووضعنا في البالون $${mBicarb}$ غ من بيكربونات الصوديوم ثم أحكمنا تثبيته على الفوهة.\n\n2) احسب الكتلة $m_1$ التي يشير إليها الميزان قبل المزج، ثم استنتج الكتلة $m_2$ بعد انتفاخ البالون بالغاز مع التعليل.`,
								answer: `2) قبل المزج: $m_1 = ${mFlask} + ${mVinegar} + ${mBicarb} = ${mTotalBefore}$ غ.\n\nبعد انتفاخ البالون: تبقى القراءة $m_2 = ${mTotalBefore}$ غ، لأن الإناء مغلق والكتلة تبقى محفوظة خلال التحول الكيميائي ($m_1 = m_2$).`,
								mark: '2.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'تجربة الدورق والبالون'
							}
						]
					},
					{
						type: 'text',
						content: `3) لو نزعنا البالون وأجرينا التفاعل في دورق مفتوح، لأشار الميزان في النهاية إلى $${mAfterOpen}$ غ. فسّر سبب نقصان القراءة واحسب كتلة غاز ثنائي أكسيد الكربون ${co2Sp.typst} المنطلق.`,
						answer: `3) سبب نقصان القراءة هو تسرب الغاز الناتج نحو الهواء لكون الدورق مفتوحاً. كتلة الغاز المنطلق: $m("CO"_2) = ${mTotalBefore} - ${mAfterOpen} = ${mGas}$ غ.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'الكتلة محفوظة في كل من التحول الفيزيائي والكيميائي.',
				`اجمع كتلة الدورق والخل والبيكربونات: $${mFlask} + ${mVinegar} + ${mBicarb}$.`,
				'في الإناء المفتوح، الفرق بين الكتلة الابتدائية والنهائية يمثل كتلة الغاز المتسرب.'
			],
			solutionStepsAr: [
				`في التحول الفيزيائي: $m_{\\text{محلول}} = ${mIce} + ${mSalt} = ${mIce + mSalt}\\text{ g}$.`,
				`في الدورق المغلق: $m_1 = m_2 = ${mFlask} + ${mVinegar} + ${mBicarb} = ${mTotalBefore}\\text{ g}$.`,
				`في الدورق المفتوح: كتلة الغاز المنطلق $= ${mTotalBefore} - ${mAfterOpen} = ${mGas}\\text{ g}$.`
			],
			finalAnswer: askOpenLoss ? `${mGas} g` : `${mTotalBefore} g`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Microscopic Model (Atoms, Molecules, Compact Model)
// ═══════════════════════════════════════════════════════════════════════════════
const microscopicModelTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2am_t1_microscopic_model',
	grade: '2am',
	trimesterId: 't1',
	domain: 'matter',
	titleAr: 'النموذج المجهري المتراص وتفسير التحول الكيميائي',
	curriculumLessonId: 'phy_lesson_2am_t1_microscopic_model_atoms_molecules',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const useWater = difficulty === 'hard' || (difficulty === 'medium' && rng.int(0, 1) === 1);
		const svg = useWater ? svgMicroWaterSynthesis() : svgMicroCarbonCombustion();
		const imageUrl = savePhysicsSvgAsset(`phy_2am_t1_micro_${difficulty}_s${seed}`, svg);

		const correctText = 'نوع وعدد الذرات محفوظ، بينما نوع الجزيئات يتغير';
		const mcq = buildUniqueMcqOptions(
			correctText,
			[
				{
					text: 'نوع الجزيئات محفوظ، بينما عدد الذرات يتغير',
					diagnosticFeedback: 'العكس تماماً! في التحول الكيميائي تتفكك الجزيئات وتتشكل جزيئات جديدة، أما الذرات فمحفوظة.'
				},
				{
					text: 'كل من الذرات والجزيئات يتغيران معاً ولا يبقى أي شيء محفوظاً',
					diagnosticFeedback: 'لو تغير نوع وعدد الذرات لما تحقّق مبدأ انحفاظ الكتلة!'
				},
				{
					text: 'نوع الجزيئات وعددها محفوظان تماماً مثل التحول الفيزيائي',
					diagnosticFeedback: 'انحفاظ الجزيئات يحدث في التحول الفيزيائي فقط، لا في الكيميائي.'
				}
			],
			rng
		);

		const scenarioQ = useWater
			? 'يمثل الشكل تفكك جزيئي ماء بالتحليل الكهربائي إلى جزيئي هيدروجين وجزيء أكسجين. ماذا نستنتج عن حالة الذرات والجزيئات في هذا التحول الكيميائي؟'
			: 'يمثل الشكل احتراق ذرة كربون مع جزيء أكسجين لتشكيل جزيء ثنائي أكسيد الكربون. ماذا نستنتج عن حالة الذرات والجزيئات؟';

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: scenarioQ,
				questionTextAr: scenarioQ,
				imageUrl,
				imageCaption: 'النموذج الجزيئي المتراص للتحول الكيميائي',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'خلال التحول الكيميائي تتفكك جزيئات المتفاعلات وتُعاد ترتيب ذراتها لتشكيل جزيئات جديدة؛ لذا فنوع وعدد الذرات محفوظان بينما نوع الجزيئات غير محفوظ.'
			},
			sujetExercise: {
				points: 6,
				instruction: 'نريد تفسير التحول الكيميائي على المستوى المجهري باستعمال النموذج الجزيئي المتراص.',
				content: [
					{
						type: 'columns',
						widths: ['1.4fr', '1fr'],
						children: [
							{
								type: 'text',
								content: useWater
									? '1) يمثل الشكل المقابل التحليل الكهربائي للماء بالنموذج المتراص.\n\nأ) اذكر لون الكرية الممثلة لكل من ذرة الأكسجين وذرة الهيدروجين، وسمّ مكونات جزيء الماء الواحد.'
									: '1) يمثل الشكل المقابل احتراق الكربون في غاز الأكسجين بالنموذج المتراص.\n\nأ) اذكر لون الكرية الممثلة لكل من ذرة الكربون وذرة الأكسجين، وسمّ مكونات جزيء ثنائي أكسيد الكربون.',
								answer: useWater
									? '1) أ) ذرة الأكسجين: كرية حمراء، ذرة الهيدروجين: كرية بيضاء صغيرة. يتكون جزيء الماء الواحد من ذرة أكسجين واحدة وذرتي هيدروجين.'
									: '1) أ) ذرة الكربون: كرية سوداء، ذرة الأكسجين: كرية حمراء. يتكون جزيء ثنائي أكسيد الكربون من ذرة كربون واحدة وذرتي أكسجين.',
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'النموذج المتراص'
							}
						]
					},
					{
						type: 'text',
						content: useWater
							? '2) قارن بين نوع وعدد الذرات قبل التحول وبعده (في جزيئي الماء ثم في النواتج)، وبين نوع الجزيئات قبل التحول وبعده.'
							: '2) قارن بين نوع وعدد الذرات قبل التحول وبعده، وبين نوع الجزيئات قبل التحول وبعده.',
						answer: useWater
							? '2) - قبل التحول: 2 ذرة أكسجين + 4 ذرات هيدروجين (في جزيئي ماء).\n\n- بعد التحول: 2 ذرة أكسجين (في جزيء أكسجين) + 4 ذرات هيدروجين (في جزيئي هيدروجين).\n\nإذن نوع وعدد الذرات محفوظان، أما نوع الجزيئات فغير محفوظ (اختفت جزيئات الماء وتشكلت جزيئات الهيدروجين والأكسجين).'
							: '2) - قبل التحول: 1 ذرة كربون + 2 ذرة أكسجين.\n\n- بعد التحول: 1 ذرة كربون + 2 ذرة أكسجين (داخل جزيء ثنائي أكسيد الكربون).\n\nإذن نوع وعدد الذرات محفوظان، أما نوع الجزيئات فغير محفوظ.',
						mark: '2'
					},
					{
						type: 'text',
						content:
							'3) كيف يفسر هذا النموذج المجهري مبدأ انحفاظ الكتلة للعالم لافوازييه؟ وما الفرق مجهرياً بين تبخر الماء والتحليل الكهربائي للماء؟',
						answer:
							'3) بما أن الذرات نفسها لم تفنَ ولم تُستحدث وبقي عددها ونوعها محفوظاً، فإن مجموع كتلها يبقى ثابتاً وهذا ما يفسر انحفاظ الكتلة.\n\nالفرق: في تبخر الماء (تحول فيزيائي) تبقى جزيئات الماء محفوظة دون تفكك، أما في التحليل الكهربائي (تحول كيميائي) فتتفكك جزيئات الماء لتشكل جزيئات جديدة.',
						mark: '2'
					}
				]
			},
			hints: [
				'في النموذج المتراص: الهيدروجين أبيض صغير، الكربون أسود، والأكسجين أحمر.',
				'عُدّ الكرات من كل لون على يمين السهم ويساره.',
				'انحفاظ الكتلة سببه انحفاظ نوع وعدد الذرات.'
			],
			solutionStepsAr: [
				useWater
					? 'الأكسجين كرية حمراء والهيدروجين كرية بيضاء صغيرة؛ جزيء الماء به 1 أكسجين و2 هيدروجين.'
					: 'الكربون كرية سوداء والأكسجين كرية حمراء؛ جزيء ثنائي أكسيد الكربون به 1 كربون و2 أكسجين.',
				'الذرات محفوظة نوعاً وعدداً قبل التحول وبعده، بينما الجزيئات تتغير في التحول الكيميائي.',
				'تبقى الجزيئات محفوظة في التحول الفيزيائي وتتغير في التحول الكيميائي.'
			],
			finalAnswer: correctText
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Chemical Symbols, Molecular Formulas & Simple Reaction Expression
// ═══════════════════════════════════════════════════════════════════════════════
const symbolsFormulasTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2am_t1_symbols_formulas',
	grade: '2am',
	trimesterId: 't1',
	domain: 'matter',
	titleAr: 'الرموز والصيغ الكيميائية والتعبير عن التحول الكيميائي',
	curriculumLessonId: 'phy_lesson_2am_t1_chemical_symbols_formulas',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const molecules = [
			{
				nameAr: 'غاز الميثان',
				formula: 'CH4',
				compAr: 'ذرة كربون واحدة و$4$ ذرات هيدروجين',
				compTypst: 'ذرة كربون واحدة و 4 ذرات هيدروجين',
				wrong1: 'C4H',
				wrong2: 'CO2',
				wrong3: 'CH2'
			},
			{
				nameAr: 'غاز كلور الهيدروجين',
				formula: 'HCl',
				compAr: 'ذرة هيدروجين واحدة وذرة كلور واحدة',
				compTypst: 'ذرة هيدروجين واحدة وذرة كلور واحدة',
				wrong1: 'H2Cl',
				wrong2: 'HCL',
				wrong3: 'Cl2'
			},
			{
				nameAr: 'كبريت الحديد',
				formula: 'FeS',
				compAr: 'ذرة حديد واحدة وذرة كبريت واحدة',
				compTypst: 'ذرة حديد واحدة وذرة كبريت واحدة',
				wrong1: 'Fe2S',
				wrong2: 'FES',
				wrong3: 'CuS'
			},
			{
				nameAr: 'غاز ثنائي أكسيد الكربون',
				formula: 'CO2',
				compAr: 'ذرة كربون واحدة وذرتا أكسجين',
				compTypst: 'ذرة كربون واحدة وذرتا أكسجين',
				wrong1: 'CO',
				wrong2: 'C2O',
				wrong3: 'O2'
			}
		];
		const chosen = rng.pick(molecules);
		const sp = chemSpecies(chosen.formula);
		const reactionChoice =
			difficulty === 'easy'
				? {
						title: 'احتراق الكربون في غاز الأكسجين لإنتاج ثنائي أكسيد الكربون',
						lhs: [{ formula: 'C' }, { formula: 'O2' }],
						rhs: [{ formula: 'CO2' }],
						beforeAr: 'الكربون + ثنائي الأكسجين',
						afterAr: 'ثنائي أكسيد الكربون'
				  }
				: {
						title: 'تفاعل برادة الحديد مع مسحوق الكبريت بالتسخين لإنتاج كبريت الحديد',
						lhs: [{ formula: 'Fe' }, { formula: 'S' }],
						rhs: [{ formula: 'FeS' }],
						beforeAr: 'الحديد + الكبريت',
						afterAr: 'كبريت الحديد'
				  };
		const eq = chemEquation(reactionChoice.lhs, reactionChoice.rhs);

		const mcq = buildUniqueMcqOptions(
			sp.katex,
			[
				{
					text: `$\\ce{${chosen.wrong1}}$`,
					diagnosticFeedback: 'تحقق من عدد ذرات كل نوع وموضع الرقم السفلي!'
				},
				{
					text: `$\\ce{${chosen.wrong2}}$`,
					diagnosticFeedback: 'انتبه لكتابة الرموز الكيميائية: الحرف الثاني للذرة الواحدة صغير دائماً، واحذر الخلط بين الصيغ.'
				},
				{
					text: `$\\ce{${chosen.wrong3}}$`,
					diagnosticFeedback: 'راجع رموز الذرات المكونة لهذا الجزيء.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `ما الصيغة الكيميائية الصحيحة لجزيء **${chosen.nameAr}** الذي يتركب من ${chosen.compAr}؟`,
				questionTextAr: `ما الصيغة الكيميائية لجزيء ${chosen.nameAr}؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `يركب جزيء ${chosen.nameAr} من ${chosen.compAr}، لذا فصيغته الكيميائية هي ${sp.katex}.`
			},
			sujetExercise: {
				points: 6,
				instruction: 'يستعمل الكيميائيون الرموز والصيغ لتحديد مكونات الجزيئات والتعبير عن التحولات الكيميائية.',
				content: [
					{
						type: 'text',
						content: '1) أعط الرمز الكيميائي لكل ذرة من الذرات التالية: الهيدروجين، الأكسجين، الحديد، النحاس، الكلور، الآزوت.',
						answer: '1) الهيدروجين: $"H"$ | الأكسجين: $"O"$ | الحديد: $"Fe"$ | النحاس: $"Cu"$ | الكلور: $"Cl"$ | الآزوت: $"N"$.',
						mark: '1.5'
					},
					{
						type: 'table',
						headers: ['اسم الجزيء', 'الصيغة الكيميائية', 'تركيب الجزيء (نوع وعدد الذرات)'],
						cells: [],
						rows: [
							[
								chosen.nameAr,
								{ content: '................', answer: sp.typst },
								chosen.compTypst
							],
							[
								'غاز أحادي أكسيد الكربون',
								chemSpecies('CO').typst,
								{ content: '................', answer: 'ذرة كربون وذرة أكسجين' }
							],
							[
								'الماء',
								chemSpecies('H2O').typst,
								{ content: '................', answer: 'ذرتا هيدروجين وذرة أكسجين' }
							],
							[
								'غاز ثنائي الهيدروجين',
								{ content: '................', answer: chemSpecies('H2').typst },
								'ذرتا هيدروجين'
							]
						],
						headerBackground: true,
						borders: 'grid',
						width: 'full'
					},
					{
						type: 'text',
						content: '2) أكمل الجدول أعلاه بكتابة الصيغة الكيميائية أو تركيب كل جزيء.',
						answer: `2) الجدول مكتمل أعلاه: ${chosen.nameAr} صيغته ${sp.typst}، وغاز ثنائي الهيدروجين ${chemSpecies('H2').typst}.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) ننجز تجربة ${reactionChoice.title}.\n\nأ) لخّص المواد قبل التحول وبعده حرفياً.\n\nب) عبّر عن هذا التحول الكيميائي بالرموز والصيغ الكيميائية.`,
						answer: `3) أ) قبل التحول: ${reactionChoice.beforeAr} | بعد التحول: ${reactionChoice.afterAr}.\n\nب) التعبير بالصيغ والرموز: ${eq.typst}.`,
						mark: '2.5'
					}
				]
			},
			hints: [
				'يُكتب الرمز الكيميائي للذرة بحرف لاتيني كبير، وقد يتبعه حرف صغير عند تشابه الأحرف مثل Fe و Cl و Cu.',
				'الرقم الصغير أسفل يمين الرمز يدل على عدد ذرات ذلك النوع في الجزيء.',
				'في التعبير عن التحول الكيميائي: المتفاعلات قبل السهم والنواتج بعد السهم.'
			],
			solutionStepsAr: [
				'الرموز: $\\ce{H, O, Fe, Cu, Cl, N}$.',
				`الصيغة الكيميائية لـ ${chosen.nameAr} هي ${sp.katex}.`,
				`التعبير الرمزي للتحول: ${eq.katex}.`
			],
			finalAnswer: chosen.formula
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Integration 1: Kitchen Gas Stove & Heating Water (Combustion + Physical)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationT1CombustionTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2am_t1_integration_combustion',
	grade: '2am',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: تسخين الماء واحتراق الغاز الطبيعي',
	curriculumLessonId: 'phy_lesson_2am_t1_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		// CH4 + 2O2 -> CO2 + 2H2O mass ratio 16 : 64 -> 44 : 36
		const mult = difficulty === 'easy' ? rng.int(1, 2) : rng.int(2, 5);
		const mCH4 = 16 * mult;
		const mO2 = 64 * mult;
		const mCO2 = 44 * mult;
		const mH2O = 36 * mult;
		const mTotal = mCH4 + mO2;

		const svg = svgIntegrationKitchenLab(mCH4, mO2);
		const imageUrl = savePhysicsSvgAsset(`phy_2am_t1_integ1_${difficulty}_s${seed}`, svg);
		const ch4Sp = chemSpecies('CH4');
		const o2Sp = chemSpecies('O2');
		const co2Sp = chemSpecies('CO2');
		const h2oSp = chemSpecies('H2O');
		const coSp = chemSpecies('CO');

		const mcq = buildUniqueMcqOptions(
			`$${mH2O}\\text{ g}$`,
			[
				{
					text: `$${mTotal}\\text{ g}$`,
					diagnosticFeedback: 'هذه كتلة النواتج كلها معاً ($m(\\ce{CH4}) + m(\\ce{O2})$)، اطرح منها كتلة $\\ce{CO2}$.'
				},
				{
					text: `$${mO2 - mCO2}\\text{ g}$`,
					diagnosticFeedback: 'نسيت إضافة كتلة الميثان ($' + mCH4 + '\\text{ g}$) إلى كتلة المتفاعلات!'
				},
				{
					text: `$${mH2O + 10}\\text{ g}$`,
					diagnosticFeedback: 'تحقق من الحساب: $(' + mCH4 + ' + ' + mO2 + ') - ' + mCO2 + '$.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `خلال احتراق تام للغاز الطبيعي (الميثان ${ch4Sp.katex}) في موقد المطبخ، تفاعل $${mCH4}\\text{ g}$ من الميثان مع $${mO2}\\text{ g}$ من غاز الأكسجين، فنتج $${mCO2}\\text{ g}$ من ثنائي أكسيد الكربون وكمية من بخار الماء. ما كتلة بخار الماء الناتج؟`,
				questionTextAr: `تفاعل $${mCH4}\\text{ g}$ من الميثان مع $${mO2}\\text{ g}$ من الأكسجين فنتج $${mCO2}\\text{ g}$ من $\\ce{CO2}$ وبخار الماء. احسب كتلة بخار الماء.`,
				imageUrl,
				imageCaption: 'تحليل احتراق الغاز وتسخين الماء',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `حسب قانون انحفاظ الكتلة: $m(\\ce{H2O}) = m(\\ce{CH4}) + m(\\ce{O2}) - m(\\ce{CO2}) = (${mCH4} + ${mO2}) - ${mCO2} = ${mTotal} - ${mCO2} = ${mH2O}\\text{ g}$.`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction:
					'وضعت الأم قدراً مغلقاً به ماء بارد فوق موقد غاز المدينة (الذي يتكون أساساً من غاز الميثان) لتحضير الشاي، فلاحظ ابنها رضا غليان الماء وتكاثف قطرات على الغطاء الداخلي، كما لاحظ اشتعال الغاز بلهب أزرق.',
				content: [
					{
						type: 'columns',
						widths: ['1.45fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `السند: احترق $${mCH4}$ غ من غاز الميثان احتراقاً تاماً مع $${mO2}$ غ من غاز الأكسجين، فنتج $${mCO2}$ غ من غاز يعكّر رائق الكلس وبخار الماء.\n\n1) حدّد نوع كل تحول مع التعليل:\n\n- تبخر الماء وتكاثفه داخل القدر المغلق.\n\n- احتراق غاز الميثان في الموقد.`,
								answer: `1) - تبخر الماء وتكاثفه: تحول فيزيائي لأن طبيعة الماء لم تتغير وبقيت جزيئاته ${h2oSp.typst} محفوظة ويمكن استرجاعه بالتبريد.\n\n- احتراق غاز الميثان: تحول كيميائي لاختفاء المتفاعلات وتشكل مواد جديدة (ثنائي أكسيد الكربون وبخار الماء).`,
								mark: '2.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'القدر والموقد'
							}
						]
					},
					{
						type: 'text',
						content: `2) أ) سمّ الغاز الذي يعكّر رائق الكلس، واكتب الصيغة الكيميائية لكل من: الميثان، ثنائي الأكسجين، ثنائي أكسيد الكربون، والماء.\n\nب) فسّر التحول الكيميائي الحادث في الموقد مجهرياً (من حيث الذرات والجزيئات) وعلاقته بانحفاظ الكتلة.`,
						answer: `2) أ) الغاز الذي يعكر رائق الكلس هو ثنائي أكسيد الكربون.\n\nالصيغ الكيميائية: الميثان ${ch4Sp.typst}، ثنائي الأكسجين ${o2Sp.typst}، ثنائي أكسيد الكربون ${co2Sp.typst}، الماء ${h2oSp.typst}.\n\nب) مجهرياً: تتفكك جزيئات الميثان والأكسجين وتعاد ارتباط ذراتها لتشكيل جزيئات ثنائي أكسيد الكربون والماء؛ فنوع وعدد الذرات محفوظان (لذا تحفظ الكتلة) بينما نوع الجزيئات يتغير.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `3) احسب كتلة بخار الماء الناتج عن احتراق $${mCH4}$ غ من الميثان، ثم قدّم نصيحتين لتفادي تشكل الغاز السام القاتل ${coSp.typst} أثناء استخدام المدافئ والمواقد.`,
						answer: `3) حسب مبدأ انحفاظ الكتلة: $m("H"_2"O") = (${mCH4} + ${mO2}) - ${mCO2} = ${mTotal} - ${mCO2} = ${mH2O}$ غ.\n\nالنصائح: 1- توفير التهوية الجيدة داخل المطبخ لضمان احتراق تام غني بالأكسجين. 2- مراقبة لون اللهب (يجب أن يكون أزرق) وتنظيف فتحات الموقد دورياً لتفادي تشكل أحادي أكسيد الكربون ${coSp.typst}.`,
						mark: '2.5'
					}
				]
			},
			hints: [
				'ميّز بين التحول الفيزيائي للماء (تغير حالة) والتحول الكيميائي للغاز (احتراق).',
				'تذكّر صيغ الميثان CH4 والأكسجين O2 وثنائي أكسيد الكربون CO2 والماء H2O.',
				`اجمع كتلتي المتفاعلات (${mCH4} + ${mO2}) ثم اطرح كتلة ثنائي أكسيد الكربون (${mCO2}).`
			],
			solutionStepsAr: [
				'تبخر الماء تحول فيزيائي واحتراق الميثان تحول كيميائي.',
				`الصيغ: ${ch4Sp.katex}، ${o2Sp.katex}، ${co2Sp.katex}، ${h2oSp.katex}.`,
				`الكتلة: $m(\\ce{H2O}) = (${mCH4} + ${mO2}) - ${mCO2} = ${mH2O}\\text{ g}$.`
			],
			finalAnswer: `${mH2O} g`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Integration 2: Lab Investigation (Melting Ice + Sealed Acid/Chalk + Electrolysis)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationT1ElectrolysisLabTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2am_t1_integration_electrolysis_lab',
	grade: '2am',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: تحقيق مخبري حول التحولات وانحفاظ الكتلة والرموز',
	curriculumLessonId: 'phy_lesson_2am_t1_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const mWaterInitial = rng.int(40, 80);
		const mBottleTotal = rng.int(160, 220);
		const volO2 = difficulty === 'easy' ? rng.int(5, 9) : rng.int(8, 15);
		const volH2 = volO2 * 2;
		const mH2 = rng.int(2, 5);
		const mO2 = mH2 * 8;
		const mWaterReacted = mH2 + mO2;

		const svg = svgElectrolysis2am(volH2, volO2, 'الأنبوب A', 'الأنبوب B');
		const imageUrl = savePhysicsSvgAsset(`phy_2am_t1_integ2_${difficulty}_s${seed}`, svg);
		const eq = chemEquation(
			[{ formula: 'H2O', state: 'l' }],
			[{ formula: 'H2', state: 'g' }, { formula: 'O2', state: 'g' }]
		);

		const mcq = buildUniqueMcqOptions(
			`$${mWaterReacted}\\text{ g}$`,
			[
				{
					text: `$${mO2 - mH2}\\text{ g}$`,
					diagnosticFeedback: 'كتلة المتفاعلات تساوي مجموع كتل النواتج، لا الفرق بينها!'
				},
				{
					text: `$${mO2}\\text{ g}$`,
					diagnosticFeedback: 'نسيت إضافة كتلة غاز الهيدروجين الناتج ($' + mH2 + '\\text{ g}$).'
				},
				{
					text: `$${mWaterInitial}\\text{ g}$`,
					diagnosticFeedback: 'تلك كتلة الماء الأصلية قبل التحليل وليست الكتلة المتحللة بالضرورة.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `خلال التحليل الكهربائي لكمية من الماء، انطلق $${mH2}\\text{ g}$ من غاز الهيدروجين و$${mO2}\\text{ g}$ من غاز الأكسجين. ما كتلة الماء الذي تحلّل في هذه التجربة؟`,
				questionTextAr: `نتج عن تحليل ماء كهربائياً $${mH2}\\text{ g}$ من $\\ce{H2}$ و$${mO2}\\text{ g}$ من $\\ce{O2}$. ما كتلة الماء المتحلّل؟`,
				imageUrl,
				imageCaption: 'التحليل الكهربائي للماء في المخبر',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `حسب قانون انحفاظ الكتلة (لافوازييه): كتلة الماء المتحلّل تساوي مجموع كتلتي الغازين الناتجين: $${mH2} + ${mO2} = ${mWaterReacted}\\text{ g}$.`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction:
					'أثناء تحضير مسابقة علمية، أرادت خديجة إقناع زميلتها بأن الكتلة تبقى محفوظة دائماً رغم تغير شكل المادة أو نوعها، فأجرت ثلاث تجارب متتالية:',
				content: [
					{
						type: 'columns',
						widths: ['1.45fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `- التجربة 1: تركت $${mWaterInitial}$ غ من مكعبات الجليد تنصهر داخل كأس مغلق.\n\n- التجربة 2: وضعت قطعة طباشير وحمض كلور الماء داخل قارورة محكمة الإغلاق وزنها الإجمالي $${mBottleTotal}$ غ، فحدث فوران وانطلق غاز داخل القارورة المغلقة.\n\n- التجربة 3: أنجزت التحليل الكهربائي للماء، فجمعت $${volH2}$ مل من الغاز في الأنبوب (A) و$${volO2}$ مل في الأنبوب (B).\n\n1) صنّف التجارب الثلاث إلى تحولات فيزيائية وتحولات كيميائية مع التعليل.`,
								answer: `1) - التجربة 1 (انصهار الجليد): تحول فيزيائي لأن طبيعة الماء لم تتغير ويمكن إرجاعه جليداً بالتبريد.\n\n- التجربة 2 (تفاعل الطباشير والحمض) والتجربة 3 (التحليل الكهربائي للماء): تحولان كيميائيان لاختفاء المواد الابتدائية وظهور مواد جديدة.`,
								mark: '2.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'التجربة 3: وعاء فولطا'
							}
						]
					},
					{
						type: 'text',
						content: `2) أ) في التجربة 1، ما كتلة الماء السائل الناتج؟ وفي التجربة 2، كم يشير الميزان بعد توقف الفوران في القارورة المغلقة؟ علّل.\n\nب) إذا تحلّل ماء كتلته المجهولة لينتج $${mH2}$ غ من غاز الأنبوب (A) و$${mO2}$ غ من غاز الأنبوب (B)، فما كتلة الماء المتحلّل؟`,
						answer: `2) أ) في التجربة 1: كتلة الماء السائل هي $${mWaterInitial}$ غ (انحفاظ الكتلة في التحول الفيزيائي).\n\nفي التجربة 2: يشير الميزان إلى $${mBottleTotal}$ غ لأن القارورة محكمة الإغلاق ولم يتسرب الغاز (قانون لافوازييه).\n\nب) كتلة الماء المتحلّل: $m("H"_2"O") = ${mH2} + ${mO2} = ${mWaterReacted}$ غ.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `3) في التجربة 3، حدّد اسم الغاز في كل من الأنبوب (A) والأنبوب (B) وطريقة الكشف عنهما، ثم عبّر عن هذا التحول بالصيغ الكيميائية وفسّره مجهرياً.`,
						answer: `3) الأنبوب (A) ($${volH2}$ مل): غاز الهيدروجين ${chemSpecies('H2').typst} (يفرقع بعود ثقاب مشتعل).\n\nالأنبوب (B) ($${volO2}$ مل): غاز الأكسجين ${chemSpecies('O2').typst} (يزيد توهج عود الثقاب).\n\nالتعبير بالصيغ: ${eq.typst}.\n\nالتفسير المجهري: تتفكك جزيئات الماء وتُعاد ارتباط ذرات الهيدروجين والأكسجين لتكوين جزيئات غازي الهيدروجين والأكسجين، مع بقاء نوع وعدد الذرات محفوظاً.`,
						mark: '2.5'
					}
				]
			},
			hints: [
				'الانصهار تحول فيزيائي، بينما الفوران مع انطلاق غاز والتحليل الكهربائي تحولات كيميائية.',
				'في الإناء المغلق، قراءة الميزان تبقى ثابتة دائماً.',
				'تذكّر أن حجم غاز الهيدروجين ضعف حجم غاز الأكسجين.'
			],
			solutionStepsAr: [
				'التجربة 1 فيزيائية، التجربتان 2 و3 كيميائيتان.',
				`في التجربة 1 الكتلة $${mWaterInitial}\\text{ g}$، وفي التجربة 2 الكتلة $${mBottleTotal}\\text{ g}$، وفي التجربة 3 كتلة الماء المتحلّل $${mWaterReacted}\\text{ g}$.`,
				`الأنبوب (A) هيدروجين والأنبوب (B) أكسجين، والمعادلة الرمزية: ${eq.katex}.`
			],
			finalAnswer: `${mWaterReacted} g`
		};
	}
};

export const PHYSICS_TEMPLATES_2AM_T1: PhysicsParameterizedTemplate[] = [
	physicalChemicalChangesTemplate,
	massConservationTemplate,
	microscopicModelTemplate,
	symbolsFormulasTemplate,
	integrationT1CombustionTemplate,
	integrationT1ElectrolysisLabTemplate
];
