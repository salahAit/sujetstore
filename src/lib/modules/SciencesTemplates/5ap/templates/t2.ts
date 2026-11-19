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
	wrapSciencesSvg
} from '../../svg-sciences';

function buildMovementActionSvg5ap(action: 'flexion' | 'extension'): string {
	const isFlex = action === 'flexion';
	return wrapSciencesSvg(
		440,
		225,
		`<rect x="6" y="6" width="428" height="213" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="220" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${isFlex ? 'حركة ثني الساعد وعمل العضلات المتضادة' : 'حركة بسط الساعد وعمل العضلات المتضادة'}</text>` +
			`<rect x="234" y="42" width="184" height="162" rx="9" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>` +
			(isFlex
				? `<line x1="344" y1="62" x2="344" y2="140" stroke="#cbd5e1" stroke-width="9" stroke-linecap="round"/>` +
					`<line x1="344" y1="140" x2="274" y2="112" stroke="#cbd5e1" stroke-width="8" stroke-linecap="round"/>` +
					`<circle cx="344" cy="140" r="6" fill="#f59e0b" stroke="#92400e"/>` +
					`<ellipse cx="328" cy="100" rx="13" ry="23" fill="#ef4444" stroke="#991b1b" stroke-width="1.6"/>` +
					`<ellipse cx="358" cy="102" rx="6" ry="25" fill="#fda4af" stroke="#be123c" stroke-width="1.4"/>`
				: `<line x1="326" y1="58" x2="326" y2="118" stroke="#cbd5e1" stroke-width="9" stroke-linecap="round"/>` +
					`<line x1="326" y1="118" x2="326" y2="174" stroke="#cbd5e1" stroke-width="8" stroke-linecap="round"/>` +
					`<circle cx="326" cy="118" r="6" fill="#f59e0b" stroke="#92400e"/>` +
					`<ellipse cx="312" cy="88" rx="6" ry="22" fill="#fda4af" stroke="#be123c" stroke-width="1.4"/>` +
					`<ellipse cx="342" cy="88" rx="12" ry="20" fill="#ef4444" stroke="#991b1b" stroke-width="1.6"/>`) +
			calloutBadge(262, 68, '1', '#dc2626') +
			`<text x="276" y="72" font-size="9.5" font-weight="bold" fill="#0f172a">القابضة</text>` +
			calloutBadge(388, 68, '2', '#2563eb') +
			`<text x="388" y="92" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#0f172a">الباسطة</text>` +
			`<rect x="22" y="42" width="194" height="162" rx="9" fill="${isFlex ? '#eff6ff' : '#f0fdf4'}" stroke="${isFlex ? '#2563eb' : '#16a34a'}" stroke-width="1.8"/>` +
			`<text x="119" y="72" text-anchor="middle" font-size="11.5" font-weight="bold" fill="${isFlex ? '#1d4ed8' : '#166534'}">${isFlex ? 'حركة الثني' : 'حركة البسط'}</text>` +
			`<text x="119" y="108" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#0f172a">الأوتار تربط العضلة بالعظم</text>` +
			`<text x="119" y="136" text-anchor="middle" font-size="10.2" fill="#334155">المرفق يسمح بانثناء العظمين</text>` +
			`<text x="119" y="170" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#dc2626">تتقلص عضلة وتسترخي ضدّها</text>`
	);
}

function buildExcretionGasSvg5ap(focus: 'lungs' | 'kidneys'): string {
	return wrapSciencesSvg(
		440,
		220,
		`<rect x="6" y="6" width="428" height="208" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="220" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">المبادلات الغازية في الرئتين والترشيح الدموي في الكليتين</text>` +
			`<rect x="232" y="44" width="186" height="156" rx="9" fill="${focus === 'lungs' ? '#e0f2fe' : '#ffffff'}" stroke="${focus === 'lungs' ? '#0284c7' : '#94a3b8'}" stroke-width="${focus === 'lungs' ? 2.2 : 1.4}"/>` +
			`<text x="325" y="68" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0369a1">1. الرئتان (مبادلات غازية)</text>` +
			`<circle cx="325" cy="112" r="24" fill="#bae6fd" stroke="#0284c7" stroke-width="1.8"/>` +
			`<text x="325" y="116" text-anchor="middle" font-size="10" font-weight="bold" fill="#0c4a6e">حويصل رئوي</text>` +
			`<text x="325" y="158" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">دخول الأكسجين إلى الدم</text>` +
			`<text x="325" y="178" text-anchor="middle" font-size="10" font-weight="bold" fill="#2563eb">خروج غاز الفحم في الزفير</text>` +
			`<rect x="22" y="44" width="186" height="156" rx="9" fill="${focus === 'kidneys' ? '#fef3c7' : '#ffffff'}" stroke="${focus === 'kidneys' ? '#d97706' : '#94a3b8'}" stroke-width="${focus === 'kidneys' ? 2.2 : 1.4}"/>` +
			`<text x="115" y="68" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#92400e">2. الكليتان (ترشيح الدم)</text>` +
			`<ellipse cx="96" cy="112" rx="14" ry="20" fill="#fca5a5" stroke="#991b1b" stroke-width="1.8"/>` +
			`<ellipse cx="134" cy="112" rx="14" ry="20" fill="#fca5a5" stroke="#991b1b" stroke-width="1.8"/>` +
			`<text x="115" y="158" text-anchor="middle" font-size="10" font-weight="bold" fill="#991b1b">تصفية الدم من الفضلات السامة</text>` +
			`<text x="115" y="178" text-anchor="middle" font-size="10" font-weight="bold" fill="#b45309">تكوين البول وطرحه عبر المثانة</text>`
	);
}

function buildFertilizerPlotSvg5ap(mode: 'organic' | 'excess_chem'): string {
	const isOrg = mode === 'organic';
	return wrapSciencesSvg(
		440,
		215,
		`<rect x="6" y="6" width="428" height="203" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="220" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">تغذية النبات بالأملاح المعدنية وأثر التسميد في التربة</text>` +
			`<rect x="232" y="46" width="186" height="146" rx="9" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.8"/>` +
			`<text x="325" y="70" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#166534">الحقل (أ): تسميد عقلاني</text>` +
			`<text x="325" y="102" text-anchor="middle" font-size="10.2" fill="#14532d">سماد عضوي طبيعي (روث + دبال)</text>` +
			`<text x="325" y="128" text-anchor="middle" font-size="10.2" fill="#14532d">مع مقدار مدروس من الأملاح</text>` +
			`<text x="325" y="164" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#15803d">محصول وفير ومياه نقية ✓</text>` +
			`<rect x="22" y="46" width="186" height="146" rx="9" fill="${isOrg ? '#fffbeb' : '#fef2f2'}" stroke="${isOrg ? '#d97706' : '#dc2626'}" stroke-width="1.8"/>` +
			`<text x="115" y="70" text-anchor="middle" font-size="11.2" font-weight="bold" fill="${isOrg ? '#92400e' : '#991b1b'}">${isOrg ? 'الحقل (ب): دون تسميد' : 'الحقل (ب): إفراط في السماد'}</text>` +
			`<text x="115" y="106" text-anchor="middle" font-size="10.2" fill="#334155">${isOrg ? 'تربة فقيرة من الأزوت والفوسفور' : 'كمية مفرطة من السماد الكيميائي'}</text>` +
			`<text x="115" y="136" text-anchor="middle" font-size="10.2" fill="#334155">${isOrg ? 'نمو ضعيف واصفرار الأوراق' : 'ذبول النبات وتلوث المياه الجوفية'}</text>` +
			`<text x="115" y="168" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${isOrg ? '#b45309' : '#dc2626'}">${isOrg ? 'نقص الأملاح المعدنية !' : 'خطر بيئي وزراعي ✕'}</text>`
	);
}

function buildPollinationAridSvg5ap(desertPlant: string, adaptation: string): string {
	return wrapSciencesSvg(
		440,
		220,
		`<rect x="6" y="6" width="428" height="208" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="220" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">التلقيح والإلقاح في الزهرة وتكيف النباتات مع الجفاف</text>` +
			`<rect x="232" y="44" width="186" height="156" rx="9" fill="#fdf2f8" stroke="#db2777" stroke-width="1.8"/>` +
			`<text x="325" y="68" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#9d174d">تكاثر النبات الزهري</text>` +
			`<text x="325" y="98" text-anchor="middle" font-size="10" fill="#831843">1. التلقيح: انتقال حبوب الطلع</text>` +
			`<text x="325" y="122" text-anchor="middle" font-size="10" fill="#831843">2. الإلقاح: اتحاد مع البويضة</text>` +
			`<text x="325" y="150" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#15803d">البويضة ← بذرة</text>` +
			`<text x="325" y="174" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#d97706">المبيض ← ثمرة</text>` +
			`<rect x="22" y="44" width="186" height="156" rx="9" fill="#fffbeb" stroke="#d97706" stroke-width="1.8"/>` +
			`<text x="115" y="68" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#92400e">تكيف نبات: ${esc(desertPlant)}</text>` +
			`<circle cx="115" cy="112" r="24" fill="#dcfce7" stroke="#15803d" stroke-width="1.8"/>` +
			`<text x="115" y="116" text-anchor="middle" font-size="10" font-weight="bold" fill="#14532d">وسط جاف</text>` +
			`<text x="115" y="162" text-anchor="middle" font-size="10" font-weight="bold" fill="#78350f">${esc(adaptation)}</text>`
	);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Movement & Antagonistic Muscles (2 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const antagonisticMusclesTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_5ap_t2_antagonistic_muscles',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'human_body',
	titleAr: 'الحركة وتقلص العضلات (المفاصل والأوتار والعضلات المتضادة)',
	curriculumLessonId: 'sci_lesson_5ap_t2_movement_antagonistic_muscles',
	defaultPoints: 2,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const isFlex = seed % 2 === 0;
		const svg = buildMovementActionSvg5ap(isFlex ? 'flexion' : 'extension');
		const imageUrl = saveSciencesSvgAsset(`sci_5ap_t2_muscle_s${seed}`, svg);

		const correctAnswer = isFlex
			? 'تتقلص العضلة القابضة (تقصر وتنتفخ) وتسترخي العضلة الباسطة'
			: 'تتقلص العضلة الباسطة (تقصر وتنتفخ) وتسترخي العضلة القابضة';

		const mcq = buildUniqueMcqOptions(
			correctAnswer,
			[
				{
					text: isFlex
						? 'تتقلص العضلة الباسطة وتسترخي العضلة القابضة'
						: 'تتقلص العضلة القابضة وتسترخي العضلة الباسطة',
					diagnosticFeedback: isFlex
						? 'هذا ما يحدث عند بسط الساعد وليس عند ثنيه!'
						: 'هذا ما يحدث عند ثني الساعد وليس عند بسطه!'
				},
				{
					text: 'تتقلص العضلتان القابضة والباسطة معاً في نفس اللحظة',
					diagnosticFeedback: 'العضلتان المتضادتان تعملان بالتعاكس ولا تتقلصان معاً في حركة الثني أو البسط.'
				},
				{
					text: 'تتحرك العظام وحدها دون تدخل العضلات أو الأوتار',
					diagnosticFeedback: 'العظام أعضاء سلبية لا تتحرك إلا بشدّ العضلات لها عبر الأوتار.'
				}
			],
			rng
		);

		const actionAr = isFlex ? 'ثني الساعد' : 'بسط الساعد';
		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `تأمّل الوثيقة المقابلة التي تبيّن **حركة ${actionAr}**. كيف تعمل العضلتان المتضادتان (القابضة والباسطة) خلال هذه الحركة؟`,
			questionTextAr: `ما حالة العضلتين القابضة والباسطة أثناء ${actionAr}؟`,
			imageUrl,
			imageCaption: `آلية ${actionAr}`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `تعمل القابضة والباسطة بالتضاد: أثناء **${actionAr}**، **${correctAnswer}**، وتنقل الأوتار قوة التقلص إلى العظم عند مفصل المرفق.`
		};

		const hints: [string, string, string] = [
			'انظر إلى العضلة المنتفخة باللون الأحمر الداكن في الرسم (المتقلصة) والعضلة الرقيقة الوردية (المسترخية).',
			'عند الثني تنقبض القابضة الأمامية، وعند البسط تنقبض الباسطة الخلفية.',
			'تذكّر أن الأوتار تربط العضلات بالعظام.'
		];

		const solutionStepsAr = [
			`الحركة الممثلة في الوثيقة هي: **${actionAr}**.`,
			`عمل العضلات المتضادة: **${correctAnswer}**.`,
			'العناصر الأربعة للحركة هي: العظام، المفاصل، العضلات، والأوتار.'
		];

		const sujetExercise: ExerciseBlock = {
			points: 2,
			instruction: `لاحظ الوثيقة المقابلة التي تمثّل حركة *${actionAr}*، ثم أجب:`,
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: `1) صف حالة كل من *العضلة القابضة* (1) و*العضلة الباسطة* (2) أثناء حركة *${actionAr}*.`,
							answer: `1) أثناء ${actionAr}: *${correctAnswer}*.`,
							mark: '1'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: `حركة ${actionAr}`
						}
					]
				},
				{
					type: 'text',
					content: '2) حدّد دور كل من *الأوتار* و*المفاصل* في إحداث الحركة، واذكر نصيحة لحماية الجهاز الحركي.',
					answer: '2) *الأوتار* تربط العضلات بالعظام وتنقل قوة التقلص؛ *المفاصل* (كالمرفق والركبة) تسمح بحركة العظام بسهولة. النصيحة: *الإحماء قبل الرياضة، الجلوس المستقيم، وتناول أغذية غنية بالكالسيوم*.',
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
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
// 2. Gas Exchange in Lungs & Kidney Filtration (2 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const gasExchangeExcretionTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_5ap_t2_gas_exchange_excretion',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'human_body',
	titleAr: 'التنفس والمبادلات الغازية وترشيح الدم في الكليتين',
	curriculumLessonId: 'sci_lesson_5ap_t2_breathing_gas_exchange_filtration',
	defaultPoints: 2,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const focusLungs = seed % 2 === 0;
		const svg = buildExcretionGasSvg5ap(focusLungs ? 'lungs' : 'kidneys');
		const imageUrl = saveSciencesSvgAsset(`sci_5ap_t2_excr_s${seed}`, svg);

		const correctAnswer = focusLungs
			? 'في الرئتين يتزود الدم بالأكسجين ويطرح غاز الفحم وبخار الماء في الزفير'
			: 'ترشّح الكليتان الدم باستمرار لتخليصه من الفضلات السامة والماء الزائد على شكل بول';

		const mcq = buildUniqueMcqOptions(
			correctAnswer,
			[
				{
					text: focusLungs
						? 'في الرئتين يطرح الدم الأكسجين ويمتص غاز الفحم السام'
						: 'تضخ الكليتان الهواء النقي إلى العضلات أثناء الجري',
					diagnosticFeedback: focusLungs
						? 'العكس هو الصحيح! الدم يمتص O₂ ويطرح CO₂ في الرئتين.'
						: 'الكليتان تصفيان الدم وتكوّنان البول ولا تضخان الهواء.'
				},
				{
					text: 'يتخلص الجسم من البول عبر الرغامى ويتخلص من غاز الفحم عبر المثانة',
					diagnosticFeedback: 'خطأ في الأعضاء: غاز الفحم يُطرح عبر الرئتين، والبول يُطرح عبر الجهاز البولي.'
				},
				{
					text: 'الإكثار من الملح وقلة شرب الماء يساعدان الكليتين على ترشيح الدم',
					diagnosticFeedback: 'قلة الماء وكثرة الملح تضر الكليتين وتسبب الحصى والقصور الكلوي.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `بالاعتماد على الوثيقة المقابلة، أيّ عبارة علمية تصف بدقة وظيفة **${focusLungs ? 'الرئتين (المبادلات الغازية)' : 'الكليتين (الترشيح الكلوي)'}**؟`,
			questionTextAr: `ما الوظيفة الصحيحة لـ${focusLungs ? 'الرئتين' : 'الكليتين'}؟`,
			imageUrl,
			imageCaption: 'المبادلات الغازية الرئوية وترشيح الدم في الكليتين',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `**${correctAnswer}**. كما يساهم الجلد عبر العرق في التخلص من جزء من الماء والأملاح وتبريد الجسم.`
		};

		const hints: [string, string, string] = [
			'انظر إلى البطاقة المميزة في الرسم المقابل.',
			'الرئتان تتبادلان الغازات (O₂ و CO₂) مع الدم، والكليتان ترشحان الدم وتكونان البول.',
			'تذكّر أهمية شرب الماء والاعتدال في الملح لحماية الكليتين.'
		];

		const solutionStepsAr = [
			'الرئتان: دخول الأكسجين إلى الدم وطرح ثنائي أكسيد الكربون وبخار الماء.',
			'الكليتان: ترشيح الدم من الفضلات السامة لتشكيل البول.',
			`الإجابة الصحيحة: **${correctAnswer}**.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 2,
			instruction: 'لاحظ السند المقابل حول دور الرئتين والكليتين في تنقية الدم وتبادل الغازات، ثم أجب:',
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: '1) قارن بين عمل *الرئتين* وعمل *الكليتين* بالنسبة للدم (ما الذي يأخذه أو يتخلص منه الدم في كل عضو؟).',
							answer: '1) في *الرئتين*: يتزود الدم بغاز الأكسجين ($upright("O")_2$) ويطرح غاز الفحم ($upright("CO")_2$) وبخار الماء. في *الكليتين*: يُرشّح الدم ويُصفّى من الفضلات السامة والماء الزائد لتشكيل البول.',
							mark: '1'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'عمل الرئتين والكليتين'
						}
					]
				},
				{
					type: 'text',
					content: '2) اذكر عضواً ثالثاً يطرح جزءاً من الفضلات السائلة، ثم قدّم *قاعدتين صحيتين* للمحافظة على سلامة الكليتين.',
					answer: '2) العضو الثالث هو *الجلد* (يطرح العرق عبر الغدد العرقية). القاعدتان: *شرب كمية كافية من الماء النقي يومياً، والتقليل من الملح، وعدم حبس البول*.',
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
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
// 3. Plant Mineral Nutrition & Fertilizers (2 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const plantFertilizersNpkTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_5ap_t2_plant_fertilizers_npk',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'plant_biology',
	titleAr: 'تغذية النباتات بالأملاح المعدنية والأسمدة والتربة',
	curriculumLessonId: 'sci_lesson_5ap_t2_plant_mineral_fertilizers_soil',
	defaultPoints: 2,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const isExcess = seed % 2 === 0;
		const svg = buildFertilizerPlotSvg5ap(isExcess ? 'excess_chem' : 'organic');
		const imageUrl = saveSciencesSvgAsset(`sci_5ap_t2_fert_s${seed}`, svg);

		const correctAnswer = isExcess
			? 'ذبول النباتات وتلوث التربة والمياه الجوفية بسبب الإفراط في الأسمدة الكيميائية'
			: 'ضعف النمو واصفرار الأوراق بسبب نقص الأملاح المعدنية (الأزوت والفوسفور والبوتاسيوم) في التربة';

		const mcq = buildUniqueMcqOptions(
			correctAnswer,
			[
				{
					text: isExcess
						? 'تضاعف الإنتاج وتنقية المياه الجوفية بفضل كثرة الأسمدة الكيميائية'
						: 'موت النباتات بسبب كثرة السماد العضوي الطبيعي',
					diagnosticFeedback: isExcess
						? 'الإفراط في الأسمدة الكيميائية يضر النبات ويلوث المياه الجوفية!'
						: 'في الحقل (ب) لم يُضف سماد أصلاً، فالسبب هو نقص الأملاح المعدنية.'
				},
				{
					text: 'لا يحتاج النبات الأخضر إلى أي أملاح معدنية من التربة',
					diagnosticFeedback: 'النبات الأخضر بحاجة ماسة للأملاح المعدنية الأساسية (NPK).'
				},
				{
					text: 'الأسمدة العضوية (الروث والدبال) سامة وتلوث المياه أكثر من البلاستيك',
					diagnosticFeedback: 'الأسمدة العضوية الطبيعية آمنة وتحسّن خصوبة التربة بأمان.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `تأمّل مقارنة الحقلين (أ) و(ب) في السند المقابل. كيف تفسّر النتيجة السلبية الملاحَظة في الحقل (ب)؟`,
			questionTextAr: `فسّر النتيجة السلبية في الحقل (ب).`,
			imageUrl,
			imageCaption: 'مقارنة التسميد العقلاني بحالة النقص أو الإفراط',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `**${correctAnswer}**؛ والحل هو اعتماد التسميد العقلاني (الأسمدة العضوية الطبيعية ومقادير مدروسة من الأملاح المعدنية).`
		};

		const hints: [string, string, string] = [
			'قارن معطيات الحقل (أ) والحقل (ب) في الوثيقة.',
			'الأملاح الأساسية للنبات هي: الأزوت (N)، الفوسفور (P)، البوتاسيوم (K).',
			'النقص يسبب الاصفرار وضعف النمو، والإفراط يسبب الذبول وتلوث المياه الجوفية.'
		];

		const solutionStepsAr = [
			'الحقل (أ): تسميد عقلاني ← محصول وفير وبيئة سليمة.',
			`الحقل (ب): **${correctAnswer}**.`,
			'يفضّل الفلاح الأسمدة العضوية (الروث والدبال) ومقادير مدروسة من الأسمدة المعدنية.'
		];

		const sujetExercise: ExerciseBlock = {
			points: 2,
			instruction: 'تأمل الوثيقة المقابلة التي تقارن بين حقلين زراعيين، ثم أجب:',
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: '1) فسّر سبب النتيجة السلبية في الحقل (ب)، واذكر الأملاح المعدنية الثلاثة الأساسية لنمو النبات.',
							answer: `1) السبب: *${correctAnswer}*. الأملاح الثلاثة هي: *الأزوت، الفوسفور، والبوتاسيوم*.`,
							mark: '1'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'أثر التسميد على النبات والتربة'
						}
					]
				},
				{
					type: 'text',
					content: '2) ميّز بين *الأسمدة العضوية* و*الأسمدة المعدنية*، ولماذا يُنصح الفلاحون بتجنب الإفراط في الأسمدة الكيميائية؟',
					answer: '2) *الأسمدة العضوية* طبيعية (روث الحيوانات والدبال) وتغني التربة بأمان؛ *الأسمدة المعدنية* مصنعة غنية بالأملاح الجاهزة. يجب تجنب الإفراط فيها لأنها *تتلف النباتات وتتسرب لتلوث التربة والمياه الجوفية*.',
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
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
// 4. Pollination, Fertilization & Arid Plant Adaptation (2.5 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const pollinationAridPlantsTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_5ap_t2_pollination_arid_plants',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'plant_biology',
	titleAr: 'التلقيح والإلقاح وتشكل البذور، وتكيف النباتات مع الجفاف',
	curriculumLessonId: 'sci_lesson_5ap_t2_pollination_fertilization_arid_adaptation',
	defaultPoints: 2.5,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const plants = [
			{
				name: 'الصبار والتين الشوكي',
				adaptation: 'أشواك لتقليص النتح وساق لحمية لتخزين الماء',
				reason: 'تقليل فقدان الماء وتخزينه لفترات الجفاف الطويلة'
			},
			{
				name: 'الشيح والنخيل',
				adaptation: 'جذور عميقة وممتدة للبحث عن المياه الجوفية',
				reason: 'امتصاص الماء من الأعماق البعيدة في التربة الصحراوية'
			},
			{
				name: 'الحلفاء',
				adaptation: 'أوراق ملتفة شريطية مغطاة بطبقة شمعية',
				reason: 'حماية المسام وتقليل تبخر الماء بالنتح تحت الشمس الحارة'
			}
		];
		const chosen = rng.pick(plants);
		const svg = buildPollinationAridSvg5ap(chosen.name, chosen.adaptation);
		const imageUrl = saveSciencesSvgAsset(`sci_5ap_t2_pollarid_s${seed}`, svg);

		const correctAnswer = `بعد الإلقاح تتحول البويضة إلى بذرة والمبيض إلى ثمرة، ويتكيف ${chosen.name} بـ(${chosen.adaptation})`;

		const mcq = buildUniqueMcqOptions(
			correctAnswer,
			[
				{
					text: `بعد الإلقاح يتحول المبيض إلى بذرة والبويضة إلى ورقة، ويعيش ${chosen.name} بأوراق عريضة جداً`,
					diagnosticFeedback: 'خطأ! المبيض يتحول إلى ثمرة والبويضة إلى بذرة، والنبات الصحراوي لا يملك أوراقاً عريضة.'
				},
				{
					text: 'يحدث الإلقاح دون انتقال حبوب الطلع ولا دور للنحل والرياح في تكاثر النباتات الزهرية',
					diagnosticFeedback: 'التلقيح (بنقل حبوب الطلع عبر النحل أو الرياح) شرط أساسي لحدوث الإلقاح وتشكل البذور.'
				},
				{
					text: 'تتخلص النباتات الصحراوية من جذورها لتعيش فوق الرمال الجافة دون ماء',
					diagnosticFeedback: 'بل تطوّر النباتات الصحراوية جذوراً عميقة أو ممتدة لامتصاص أقل كمية ماء.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `تأمّل الوثيقة المقابلة حول التكاثر الزهري وتكيف نبات **${chosen.name}** مع الوسط الصحراوي قليل الماء. ما العبارة العلمية **الصحيحة**؟`,
			questionTextAr: `حدّد العبارة الصحيحة حول التلقيح وتكيف ${chosen.name}.`,
			imageUrl,
			imageCaption: `التلقيح والإلقاح وتكيف ${chosen.name}`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `في الزهرة ينتقل الطلع بالتلقيح ثم يحدث الإلقاح فتتحول البويضة إلى بذرة والمبيض إلى ثمرة؛ ويتكيف ${chosen.name} بـ(${chosen.adaptation}) من أجل ${chosen.reason}.`
		};

		const hints: [string, string, string] = [
			'فرّق بين التلقيح (انتقال حبوب الطلع) والإلقاح (اتحاد حبة الطلع مع البويضة).',
			'تذكّر: البويضة ← بذرة، والمبيض ← ثمرة.',
			`اربط نبات (${chosen.name}) بتحوره المذكور في السند (${chosen.adaptation}).`
		];

		const solutionStepsAr = [
			'التلقيح: انتقال حبوب الطلع من السداة إلى المدقة بواسطة النحل أو الرياح.',
			'بعد الإلقاح: تتحول البويضة إلى بذرة ويتحول المبيض إلى ثمرة.',
			`تكيف ${chosen.name}: **${chosen.adaptation}** (${chosen.reason}).`
		];

		const sujetExercise: ExerciseBlock = {
			points: 2.5,
			instruction: `تأمل الوثيقة المقابلة حول تكاثر النباتات الزهرية وتكيف نبات *${chosen.name}* مع الوسط قليل الماء، ثم أجب:`,
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: '1) عرّف *التلقيح*، واذكر عاملين يساعدان على حدوثه، ثم بيّن إلى ماذا تتحول *البويضة* و*المبيض* بعد الإلقاح.',
							answer: '1) *التلقيح* هو انتقال حبوب الطلع من الأسدية إلى ميسم المدقة بمساعدة *الحشرات (النحل)* أو *الرياح*. بعد الإلقاح: *البويضة ← بذرة*، و*المبيض ← ثمرة*.',
							mark: '1.5'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'التكاثر الزهري وتكيف النباتات'
						}
					]
				},
				{
					type: 'text',
					content: `2) كيف يتكيف نبات *${chosen.name}* مع قلة الماء في الوسط الصحراوي؟ وما الفائدة من هذا التكيف؟`,
					answer: `2) يتكيف بـ*${chosen.adaptation}*، والفائدة هي: *${chosen.reason}*.`,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
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
// 5. Integration Situation: Biskra Oasis Farm (4 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationOasisFarmTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_5ap_t2_integration_oasis_farm',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: مزرعة في واحة بسكرة (النبات والعضوية)',
	curriculumLessonId: 'sci_lesson_5ap_t2_pollination_fertilization_arid_adaptation',
	defaultPoints: 4,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const oasis = rng.pick(['بسكرة', 'غرداية', 'الوادي', 'ورقلة']);

		const svg = svgBioFlowchart({
			title: 'تكامل الحياة في الواحة الصحراوية الجزائرية',
			orientation: 'horizontal',
			width: 470,
			steps: [
				{ label: 'تلقيح النخيل', sublabel: 'حبوب الطلع ← ثمار التمر', color: '#db2777', bg: '#fdf2f8' },
				{ label: 'تكيف صحراوي', sublabel: 'جذور عميقة وتسميد عضوي', color: '#16a34a', bg: '#f0fdf4' },
				{ label: 'حركة الفلاح', sublabel: 'ثني وبسط بالعضلات المتضادة', color: '#dc2626', bg: '#fef2f2' },
				{ label: 'شرب الماء', sublabel: 'تعويض العرق وحماية الكلى', color: '#0284c7', bg: '#f0f9ff' }
			]
		});
		const imageUrl = saveSciencesSvgAsset(`sci_5ap_t2_integ_oasis_s${seed}`, svg);

		const correctAnswer =
			'تلقيح أزهار النخيل لتشكيل الثمار + تسميد عضوي معتدل + تقلص العضلة القابضة لرفع السلة وشرب الماء لحماية الكليتين';

		const mcq = buildUniqueMcqOptions(
			correctAnswer,
			[
				{
					text: 'إفراط في الأسمدة الكيميائية + منع شرب الماء في الصحراء لتوفير عمل الكليتين',
					diagnosticFeedback: 'الإفراط يلوث المياه الجوفية ويذبل النبات، وقلة الماء تضر الكليتين!'
				},
				{
					text: 'إزالة حبوب الطلع من النخيل + استرخاء كلتا العضلتين القابضة والباسطة عند رفع السلة',
					diagnosticFeedback: 'بدون حبوب الطلع لا يحدث تلقيح ولا إلقاح، ورفع السلة (ثني) يتطلب تقلص القابضة.'
				},
				{
					text: 'النخيل والصبار يملكان أوراقاً عريضة تزيد من فقدان الماء بالنتح',
					diagnosticFeedback: 'النباتات الصحراوية تقلص النتح بأوراق شوكية أو جلدية وتمتد جذورها عميقاً.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `خلال زيارة لواحة نخيل في **${oasis}**، شاهد التلاميذ الفلاح يلقّح عراجين النخيل بحبوب الطلع، ويضيف سماداً عضوياً، ثم يثني ذراعه لرفع سلة التمر ويشرب الماء البارد تحت الشمس الحارة. أيّ تحليل علمي يربط هذه الأفعال الأربعة بشكل صحيح؟`,
			questionTextAr: `ما التحليل العلمي الصحيح لأفعال الفلاح في الواحة؟`,
			imageUrl,
			imageCaption: 'الربط بين تكاثر وتكيف النباتات وحركة وترشيح جسم الفلاح',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `تتكامل معارف الفصل الثاني هنا: التلقيح والإلقاح يعطيان التمور، والتسميد العضوي يحمي التربة والمياه، وثني الذراع يتم بتقلص القابضة واسترخاء الباسطة، وشرب الماء يحمي الكليتين.`
		};

		const hints: [string, string, string] = [
			'اربط نقل حبوب الطلع في النخيل بالتلقيح والإلقاح وتشكل الثمار.',
			'اربط رفع السلة (ثني الساعد) بتقلص العضلة القابضة واسترخاء الباسطة.',
			'اربط شرب الماء في الجو الحار بتعويض العرق ومساعدة الكليتين على ترشيح الدم.'
		];

		const solutionStepsAr = [
			'تلقيح النخيل: ينقل حبوب الطلع لحدوث الإلقاح وتحول المبيض إلى ثمرة (تمر) والبويضة إلى بذرة (نواة).',
			'التسميد العضوي المعتدل يغني التربة بالأملاح المعدنية دون تلويث المياه الجوفية.',
			'رفع السلة: ثني الساعد بتقلص القابضة واسترخاء الباسطة. شرب الماء: يعوض العرق ويحافظ على الكليتين.'
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 4,
			instruction: `زار تلاميذ السنة الخامسة مزرعة نخيل وتين شوكي في واحة *${oasis}*. لاحظوا أن الفلاح يضع حبوب الطلع في أزهار النخيل الأنثوية، ويسمد التربة بسماد عضوي طبيعي، ثم يثني ساعده لرفع سلة التمر ويكثر من شرب الماء. استعن بالسند المقابل وأجب:`,
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: '1) سمِّ العملية التي قام بها الفلاح عند وضع حبوب الطلع، وماذا ينتج بعد الإلقاح؟ وكيف يتكيف التين الشوكي والنخيل مع قلة الماء؟',
							answer: '1) العملية هي *التلقيح*. بعد الإلقاح يتحول *المبيض إلى ثمرة* و*البويضة إلى بذرة*. يتكيف النخيل بـ*جذور عميقة* والتين الشوكي بـ*أشواك لتقليل النتح وساق لحمية لتخزين الماء*.',
							mark: '1.5'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'السند: مظاهر الحياة في الواحة'
						}
					]
				},
				{
					type: 'text',
					content: '2) لماذا فضّل الفلاح *السماد العضوي* على الإفراط في الأسمدة الكيميائية؟',
					answer: '2) لأن السماد العضوي يغني التربة بالأملاح المعدنية بأمان، بينما الإفراط في الأسمدة الكيميائية *يؤدي إلى ذبول النبات وتلوث التربة والمياه الجوفية*.',
					mark: '1'
				},
				{
					type: 'text',
					content: '3) اشرح عمل العضلتين المتضادتين عند *ثني* الفلاح ساعده لرفع السلة، ثم بيّن أهمية شرب الماء لـ*الكليتين* في الجو الحار.',
					answer: '3) عند ثني الساعد *تتقلص العضلة القابضة* و*تسترخي العضلة الباسطة* وتنقل الأوتار الحركة للعظم عند المرفق. شرب الماء يعوض ما فُقد بالتعرق ويساعد *الكليتين* على *ترشيح الدم* وطرح الفضلات السامة في البول.',
					mark: '1.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
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

export const SCIENCES_TEMPLATES_5AP_T2: SciencesParameterizedTemplate[] = [
	antagonisticMusclesTemplate,
	gasExchangeExcretionTemplate,
	plantFertilizersNpkTemplate,
	pollinationAridPlantsTemplate,
	integrationOasisFarmTemplate
];
