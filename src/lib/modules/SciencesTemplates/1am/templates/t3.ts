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
	svgCellUltrastructure,
	svgLabExperiment,
	svgPhysiologyDiagram,
	wrapSciencesSvg
} from '../../svg-sciences';

// ═══════════════════════════════════════════════════════════════════════════════
// Custom 1AM T3 SVG Builders (Urinary, Flower Numbered, Smoker Alveolus)
// ═══════════════════════════════════════════════════════════════════════════════

function buildUrinaryNumberedSvg(): string {
	return wrapSciencesSvg(
		460,
		235,
		`<rect x="6" y="6" width="448" height="223" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">رسم تخطيطي مرقّم للجهاز البولي عند الإنسان</text>` +
			`<line x1="224" y1="48" x2="224" y2="140" stroke="#dc2626" stroke-width="5.5"/>` +
			`<line x1="236" y1="48" x2="236" y2="140" stroke="#2563eb" stroke-width="5.5"/>` +
			`<line x1="184" y1="88" x2="276" y2="88" stroke="#dc2626" stroke-width="3"/>` +
			`<line x1="184" y1="96" x2="276" y2="96" stroke="#2563eb" stroke-width="3"/>` +
			`<ellipse cx="168" cy="92" rx="22" ry="28" fill="#b91c1c" stroke="#7f1d1d" stroke-width="2"/>` +
			`<ellipse cx="292" cy="92" rx="22" ry="28" fill="#b91c1c" stroke="#7f1d1d" stroke-width="2"/>` +
			`<path d="M 180 116 Q 198 152 218 172" fill="none" stroke="#d97706" stroke-width="3.4"/>` +
			`<path d="M 280 116 Q 262 152 242 172" fill="none" stroke="#d97706" stroke-width="3.4"/>` +
			`<ellipse cx="230" cy="182" rx="26" ry="18" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>` +
			`<line x1="230" y1="200" x2="230" y2="220" stroke="#ca8a04" stroke-width="4.2"/>` +
			// Numbered callouts
			`<line x1="312" y1="84" x2="366" y2="72" stroke="#334155" stroke-width="1.2"/>` +
			calloutBadge(378, 72, '1', '#b91c1c') +
			`<line x1="272" y1="138" x2="366" y2="138" stroke="#334155" stroke-width="1.2"/>` +
			calloutBadge(378, 138, '2', '#d97706') +
			`<line x1="256" y1="182" x2="366" y2="182" stroke="#334155" stroke-width="1.2"/>` +
			calloutBadge(378, 182, '3', '#ca8a04') +
			`<line x1="230" y1="210" x2="108" y2="210" stroke="#334155" stroke-width="1.2"/>` +
			calloutBadge(94, 210, '4', '#1d4ed8') +
			`<text x="94" y="102" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">أوعية دموية كلوية</text>`
	);
}

function buildNumberedFlowerSvg(): string {
	return wrapSciencesSvg(
		460,
		235,
		`<rect x="6" y="6" width="448" height="223" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">رسم تخطيطي مرقّم لمكونات الزهرة ثنائية الجنس</text>` +
			`<rect x="224" y="182" width="12" height="32" fill="#15803d"/>` +
			`<path d="M 192 182 Q 230 196 268 182 Q 248 166 230 174 Q 212 166 192 182 Z" fill="#4ade80" stroke="#166534" stroke-width="1.6"/>` +
			`<ellipse cx="170" cy="116" rx="30" ry="50" fill="#fbcfe8" stroke="#db2777" stroke-width="1.8" transform="rotate(-24 170 116)"/>` +
			`<ellipse cx="290" cy="116" rx="30" ry="50" fill="#fbcfe8" stroke="#db2777" stroke-width="1.8" transform="rotate(24 290 116)"/>` +
			`<line x1="200" y1="166" x2="188" y2="96" stroke="#ca8a04" stroke-width="3"/>` +
			`<ellipse cx="188" cy="90" rx="10" ry="6" fill="#facc15" stroke="#a16207" stroke-width="1.5"/>` +
			`<line x1="260" y1="166" x2="272" y2="96" stroke="#ca8a04" stroke-width="3"/>` +
			`<ellipse cx="272" cy="90" rx="10" ry="6" fill="#facc15" stroke="#a16207" stroke-width="1.5"/>` +
			`<ellipse cx="230" cy="152" rx="22" ry="25" fill="#dcfce7" stroke="#15803d" stroke-width="2"/>` +
			`<circle cx="226" cy="148" r="5" fill="#fef08a" stroke="#b45309"/><circle cx="236" cy="158" r="5" fill="#fef08a" stroke="#b45309"/>` +
			`<rect x="224" y="88" width="12" height="42" fill="#86efac" stroke="#15803d" stroke-width="1.5"/>` +
			`<ellipse cx="230" cy="84" rx="14" ry="7" fill="#4ade80" stroke="#15803d" stroke-width="1.5"/>` +
			`<line x1="274" y1="90" x2="352" y2="72" stroke="#334155" stroke-width="1.2"/>` +
			calloutBadge(366, 72, '1', '#b45309') +
			`<line x1="308" y1="128" x2="352" y2="128" stroke="#334155" stroke-width="1.2"/>` +
			calloutBadge(366, 128, '2', '#db2777') +
			`<line x1="260" y1="182" x2="352" y2="182" stroke="#334155" stroke-width="1.2"/>` +
			calloutBadge(366, 182, '3', '#15803d') +
			`<line x1="224" y1="84" x2="108" y2="72" stroke="#334155" stroke-width="1.2"/>` +
			calloutBadge(94, 72, '4', '#0f766e') +
			`<line x1="210" y1="152" x2="108" y2="152" stroke="#334155" stroke-width="1.2"/>` +
			calloutBadge(94, 152, '5', '#2563eb')
	);
}

function buildSmokerVsHealthyLungSvg(): string {
	return wrapSciencesSvg(
		460,
		225,
		`<rect x="6" y="6" width="448" height="213" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">السند 2: مقارنة سنخ رئوي لشخص سليم وسنخ رئوي لشخص مدخن</text>` +
			// Healthy (right)
			`<rect x="242" y="42" width="198" height="164" rx="9" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.8"/>` +
			`<text x="341" y="64" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#166534">سنخ رئوي سليم (غير مدخن)</text>` +
			`<circle cx="341" cy="122" r="38" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.2"/>` +
			`<text x="341" y="126" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#0369a1">جدار رقيق ونظيف</text>` +
			`<text x="341" y="182" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">مبادلات غازية سريعة وفعالة</text>` +
			// Smoker (left)
			`<rect x="20" y="42" width="198" height="164" rx="9" fill="#fef2f2" stroke="#dc2626" stroke-width="1.8"/>` +
			`<text x="119" y="64" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#991b1b">سنخ رئوي متضرر (مدخن)</text>` +
			`<circle cx="119" cy="122" r="38" fill="#cbd5e1" stroke="#334155" stroke-width="5.5" stroke-dasharray="6,3"/>` +
			`<text x="119" y="126" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#1e293b">طبقة قطران وتخريب</text>` +
			`<text x="119" y="182" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">تقلص سطح التبادل ونقص الأكسجين</text>`
	);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Template 1: Alveolar Gas Exchange (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const alveolarGasExchangeTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1am_t3_alveolar_gas_exchange',
	grade: '1am',
	trimesterId: 't3',
	domain: 'human_body',
	titleAr: 'المبادلات الغازية التنفسية على مستوى الأسناخ الرئوية',
	curriculumLessonId: 'sci_lesson_1am_t3_respiration_alveoli_hygiene',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const restO2 = rng.pick([14, 15, 16]);
		const runO2 = restO2 * 5;

		const svg = svgPhysiologyDiagram('alveolus_gas', {
			title: 'المبادلات الغازية التنفسية على مستوى السنخ الرئوي'
		});
		const imageUrl = saveSciencesSvgAsset(`sci_1am_t3_alveolus_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'يمتص الدم غاز O₂ من السنخ الرئوي ويطرح فيه غاز CO₂، والهدف إنتاج الطاقة',
			[
				{
					text: 'يمتص الدم غاز CO₂ ويطرح غاز O₂، وتنخفض نسبة الآزوت إلى الصفر',
					diagnosticFeedback: 'في التنفس يمتص الدم O₂ ويطرح CO₂، أما الآزوت فتبقى نسبته ثابتة (79%).'
				},
				{
					text: 'تتم المبادلات الغازية على مستوى الأنف والرغامى فقط',
					diagnosticFeedback: 'الأنف والرغامى مجارٍ تنفسية، أما مقر المبادلات فهو الأسناخ الرئوية.'
				},
				{
					text: 'يقل استهلاك الأكسجين أثناء الجري والنشاط الرياضي',
					diagnosticFeedback: 'كلما زاد النشاط البدني زادت حاجة العضلات للطاقة فارتفع استهلاك O₂ والغلوكوز.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `يستهلك رياضي في حالة راحة $${restO2}\\text{ L/h}$ من غاز $\\text{O}_2$، ويرتفع استهلاكه أثناء الجري إلى $${runO2}\\text{ L/h}$. بالاعتماد على الوثيقة المقابلة، ماذا يحدث على مستوى السنخ الرئوي وما الغاية من التنفس؟`,
			questionTextAr: `ماذا يحدث على مستوى السنخ الرئوي وما الهدف من التنفس؟`,
			imageUrl,
			imageCaption: 'المبادلات الغازية التنفسية بين هواء السنخ والدم',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `ينتقل **$\\text{O}_2$** من السنخ إلى الدم وينتقل **$\\text{CO}_2$** من الدم إلى السنخ، ويُستعمل $\\text{O}_2$ مع الغلوكوز لـ **إنتاج الطاقة** اللازمة للعضلات.`
		};

		const hints: [string, string, string] = [
			'هواء الشهيق يحتوي على 21% من O₂ و 0.03% من CO₂، وهواء الزفير 16% من O₂ و 4% من CO₂.',
			'تتم المبادلات بفضل الجدار الرقيق وكثرة الشعيرات الدموية حول الأسناخ.',
			'الهدف من التنفس هو إنتاج الطاقة للنشاط العضلي.'
		];
		const solutionStepsAr = [
			'في السنخ الرئوي: دخول $\\text{O}_2$ إلى الدم وخروج $\\text{CO}_2$ وبخار الماء إلى هواء الزفير.',
			`أثناء الجري يرتفع الاستهلاك من $${restO2}$ إلى $${runO2}\\text{ L/h}$ لأن العضلات تحتاج طاقة أكبر.`,
			'نسبة الآزوت تبقى ثابتة ($79\\%$) في الشهيق والزفير.'
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `يتنفس الإنسان باستمرار لتزويد خلايا جسمه بالغازات الضرورية لإنتاج الطاقة، ويمثل الجدول والرسم المقابل معطيات حول هذه الوظيفة:`,
			content: [
				{
					type: 'columns',
					widths: ['1.15fr', '1.35fr'],
					children: [
						{
							type: 'table',
							headers: ['الغاز في 100 مل هواء', 'هواء الشهيق', 'هواء الزفير'],
							cells: [],
							rows: [
								['غاز الأكسجين', '21 مل', '16 مل'],
								['غاز ثنائي أكسيد الكربون', '0.03 مل', '4 مل'],
								['غاز الآزوت', '79 مل', '79 مل']
							],
							headerBackground: true,
							borders: 'grid',
							width: 'full'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'المبادلات الغازية على مستوى السنخ الرئوي'
						}
					]
				},
				{
					type: 'text',
					content: `1) قارن بين تركيب هواء الشهيق وهواء الزفير، وحدد مقر المبادلات الغازية التنفسية وميزتين بنيويتين لهذا المقر.`,
					answer: `1) يقل غاز الأكسجين في الزفير (من 21 إلى 16 مل) لأن الجسم يمتصه، ويزداد غاز ثنائي أكسيد الكربون (من 0.03 إلى 4 مل) لأن الجسم يطرحه، بينما يبقى الآزوت ثابتاً (79 مل). *المقر:* الأسناخ الرئوية. *ميزتان:* جدران رقيقة جداً، غناها بشبكة كثيفة من الشعيرات الدموية، ومساحة سطح تبادل واسعة.`,
					mark: '2.5'
				},
				{
					type: 'text',
					content: `2) ارتفع استهلاك هذا الشخص للأكسجين من $${restO2}$ لتر في الساعة أثناء الراحة إلى $${runO2}$ لتر في الساعة أثناء الجري. فسّر ذلك وعرّف المعنى البيولوجي للتنفس.`,
					answer: `2) ارتفع استهلاك الأكسجين أثناء الجري لزيادة حاجة العضلات إلى *الطاقة*. *تعريف التنفس:* هو إنتاج الطاقة اللازمة لنشاط العضوية باستعمال المغذيات (الغلوكوز) في وجود غاز الأكسجين، ويرافق ذلك طرح غاز الفحم وبخار الماء.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) اذكر ثلاث قواعد صحية للحفاظ على سلامة الجهاز التنفسي.`,
					answer: `3) تجنب التدخين والأماكن الملوثة، تهوية الغرف والأقسام باستمرار، ممارسة الرياضة، التنفس عبر الأنف، والتلقيح ضد أمراض الجهاز التنفسي (كالسل).`,
					mark: '1.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: 'الأسناخ الرئوية — امتصاص O₂ وطرح CO₂ لإنتاج الطاقة'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 2: Yeast Respiration vs Fermentation (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const yeastRespirationFermentationTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1am_t3_yeast_respiration_fermentation',
	grade: '1am',
	trimesterId: 't3',
	domain: 'bioenergetics',
	titleAr: 'مقارنة التنفس والتخمر الكحولي عند خميرة الخبز',
	curriculumLessonId: 'sci_lesson_1am_t3_respiration_vs_fermentation',
	defaultPoints: 6,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sugarInit = rng.pick([100, 150, 200]);
		const sugarFermUsed = Math.round(sugarInit * 0.3);
		const yeastResp = rng.pick([1.8, 2.2, 2.5]);
		const yeastFerm = 0.2;

		const svg = svgLabExperiment('respiration_fermentation', {
			title: 'مقارنة نشاط خميرة الخبز في الوسط الهوائي والوسط اللاهوائي'
		});
		const imageUrl = saveSciencesSvgAsset(`sci_1am_t3_yeast_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'التخمر الكحولي: هدم جزئي للسكر في غياب O₂ ينتج كحولاً إيثيلياً و CO₂ وطاقة ضئيلة',
			[
				{
					text: 'التنفس: يحدث في غياب O₂ وينتج طاقة ضئيلة وكحولاً',
					diagnosticFeedback: 'التنفس يحدث في وجود O₂ وينتج طاقة كبيرة ولا ينتج كحولاً!'
				},
				{
					text: 'التركيب الضوئي: تصنع الخميرة السكر من الضوء',
					diagnosticFeedback: 'الخميرة فطر مجهري عديم اليخضور لا يقوم بالتركيب الضوئي.'
				},
				{
					text: 'التخمر الكحولي ينتج طاقة أكبر وتكاثراً أسرع من التنفس',
					diagnosticFeedback: 'انظر لكتلة الخميرة المتشكلة: في التنفس (' + yeastResp + ' غ) أكبر بكثير من التخمر (' + yeastFerm + ' غ)!'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `وضعنا خميرة الخبز في محلول به $${sugarInit}\\text{ g}$ سكر في وسطين: في الوسط الهوائي استُهلك السكر كلياً وتشكلت $${yeastResp}\\text{ g}$ خميرة، وفي الوسط اللاهوائي استُهلك $${sugarFermUsed}\\text{ g}$ فقط وتشكلت $${yeastFerm}\\text{ g}$ خميرة مع ظهور رائحة كحول وتعكر رائق الكلس. ما الظاهرة الحادثة في الوسط اللاهوائي؟`,
			questionTextAr: `سمّ الظاهرة الحادثة للخميرة في الوسط اللاهوائي وحدد نواتجها.`,
			imageUrl,
			imageCaption: 'مقارنة التنفس والتخمر عند خميرة الخبز',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `في الوسط اللاهوائي تقوم الخميرة بـ **التخمر الكحولي** (استهلاك جزئي للغلوكوز $\\leftarrow$ كحول إيثيلي + $\\text{CO}_2$ + طاقة ضئيلة وتكاثر قليل).`
		};

		const hints: [string, string, string] = [
			'الوسط الهوائي = وجود O₂ ← ظاهرة التنفس (طاقة كبيرة وتكاثر كبير).',
			'الوسط اللاهوائي = غياب O₂ ← ظاهرة التخمر الكحولي (طاقة ضئيلة وكحول + CO₂).',
			'تعكر رائق الكلس يدل على طرح غاز CO₂.'
		];
		const solutionStepsAr = [
			`الوسط الهوائي: استهلاك كلي للسكر ($${sugarInit}\\text{ g}$) وتكاثر كبير ($${yeastResp}\\text{ g}$) $\\leftarrow$ **التنفس**.`,
			`الوسط اللاهوائي: استهلاك جزئي ($${sugarFermUsed}\\text{ g}$) وتكاثر ضئيل ($${yeastFerm}\\text{ g}$) مع كحول و $\\text{CO}_2$ $\\leftarrow$ **التخمر الكحولي**.`,
			`يستفيد الإنسان من غاز $\\text{CO}_2$ الناتج عن التخمر في انتفاخ عجينة الخبز.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `زرعنا خميرة الخبز في وسطين يحتوي كل منهما على $${sugarInit}$ غ من الغلوكوز، أحدهما هوائي والآخر مغلق (لاهوائي)، ويمثل الجدول والوثيقة النتائج المسجلة:`,
			content: [
				{
					type: 'columns',
					widths: ['1.15fr', '1.35fr'],
					children: [
						{
							type: 'table',
							headers: ['النتائج', 'وسط هوائي', 'وسط لاهوائي'],
							cells: [],
							rows: [
								['السكر المستهلك', `${sugarInit} غ (كلي)`, `${sugarFermUsed} غ (جزئي)`],
								['الخميرة المتشكلة', `${yeastResp} غ (كبير)`, `${yeastFerm} غ (ضئيل)`],
								['النواتج المطروحة', 'غاز الفحم + بخار ماء', 'غاز الفحم + كحول إيثيلي']
							],
							headerBackground: true,
							borders: 'grid',
							width: 'full'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'مقارنة التنفس والتخمر عند الخميرة'
						}
					]
				},
				{
					type: 'text',
					content: `1) سمِّ الظاهرة الحيوية التي قامت بها الخميرة في الوسط الهوائي، والتي قامت بها في الوسط اللاهوائي.`,
					answer: `1) في الوسط الهوائي: *التنفس*؛ في الوسط اللاهوائي: *التخمر الكحولي*.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `2) فسّر لماذا كان تكاثر الخميرة كبيراً في الوسط الهوائي (${yeastResp} غ) وضعيفاً في الوسط اللاهوائي (${yeastFerm} غ).`,
					answer: `2) في الوسط الهوائي هدمت الخميرة الغلوكوز كلياً فنتجت *طاقة كبيرة* سمحت بتكاثرها بشدة، بينما في الوسط اللاهوائي كان الهدم جزئياً (بقي جزء من الطاقة في الكحول) فنتجت *طاقة ضئيلة* فقط أدت لتكاثر ضعيف.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) كيف يستغل الخباز ظاهرة التخمر في صناعة الخبز؟ وما الغاز المسؤول عن انتفاخ العجين؟`,
					answer: `3) يضيف الخباز خميرة الخبز للعجين فتقوم بـ *التخمر الكحولي* وتطرح *غاز ثنائي أكسيد الكربون* ($upright("CO")_2$) الذي ينفخ العجين ويجعله خفيفاً وإسفنجياً.`,
					mark: '2'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: 'التخمر الكحولي (كحول إيثيلي + CO₂ + طاقة ضئيلة)'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 3: Urinary System & Blood/Urine/Sweat Analysis (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const urinaryExcretionTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1am_t3_urinary_excretion_analysis',
	grade: '1am',
	trimesterId: 't3',
	domain: 'human_body',
	titleAr: 'الجهاز البولي ومقارنة تركيب الدم والبول والعرق',
	curriculumLessonId: 'sci_lesson_1am_t3_excretion_urinary_sweat',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const askGlucose = seed % 2 === 0;

		const svg = buildUrinaryNumberedSvg();
		const imageUrl = saveSciencesSvgAsset(`sci_1am_t3_urinary_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			askGlucose
				? 'الكليتان تصفيان الدم من البولة، وظهور الغلوكوز في البول مؤشر على داء السكري'
				: 'الكليتان تصفيان الدم من البولة، والعرق بول مخفف تفرزه الغدد العرقية في الجلد',
			[
				{
					text: 'المثانة هي العضو الذي يصفي الدم ويصنع البولة',
					diagnosticFeedback: 'المثانة تجمع البول مؤقتاً فقط؛ أما تصفية الدم فتتم في الكليتين!'
				},
				{
					text: 'وجود البروتين والغلوكوز في البول حالة طبيعية عند كل إنسان سليم',
					diagnosticFeedback: 'البول الطبيعي خالٍ تماماً من البروتينات والغلوكوز!'
				},
				{
					text: 'العرق يحتوي على الماء المقطر فقط ولا يشارك في الإطراح',
					diagnosticFeedback: 'العرق يحتوي على ماء وأملاح وبولة بتركيز أقل من البول، لذا يشارك في الإطراح.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `يبين الرسم المقابل مكونات الجهاز البولي (1: الكلية، 2: الحالب، 3: المثانة، 4: الإحليل). أيّ عبارة صحيحة علمياً حول وظيفة الإطراح وتركيب البول والعرق؟`,
			questionTextAr: `اختر العبارة الصحيحة حول الجهاز البولي والإطراح.`,
			imageUrl,
			imageCaption: 'رسم تخطيطي مرقّم للجهاز البولي عند الإنسان',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `تقوم **الكليتان (1)** بتصفية الدم من الفضلات السامة كالبولة للحفاظ على **توازن الوسط الداخلي**، ويكون البول الطبيعي خالياً من البروتين والغلوكوز.`
		};

		const hints: [string, string, string] = [
			'البيانات: 1 الكلية، 2 الحالب، 3 المثانة البولية، 4 الإحليل.',
			'البول الطبيعي يحتوي على ماء + أملاح معدنية + بولة، ويخلو من البروتين والغلوكوز.',
			'العرق تفرزه الغدد العرقية في أدمة الجلد وهو بول مخفف.'
		];
		const solutionStepsAr = [
			'البيانات المرقمة: 1- كلية، 2- حالب، 3- مثانة بولية، 4- إحليل.',
			'دور الكلية: تصفية الدم من الفضلات الآزوتية السامة (البولة وحمض البول) وفائض الماء والأملاح.',
			'الإطراح البولي والعرقي يضمنان ثبات وتوازن الوسط الداخلي للجسم.'
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `يتخلص جسم الإنسان يومياً من الفضلات السامة عبر الجهاز البولي الممثل في الوثيقة المقابلة وعبر الجلد:`,
			content: [
				{
					type: 'columns',
					widths: ['1.2fr', '1.3fr'],
					children: [
						{
							type: 'text',
							content: `1) سمِّ البيانات المرقمة من 1 إلى 4 في الوثيقة، وحدد دور العنصر رقم 1.`,
							answer: `1) البيانات: 1- *كلية*، 2- *حالب*، 3- *مثانة بولية*، 4- *إحليل*. *دور الكلية:* تصفية الدم من الفضلات السامة (البولة) والماء والأملاح الزائدة وتشكيل البول.`,
							mark: '2.5'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'الجهاز البولي عند الإنسان'
						}
					]
				},
				{
					type: 'table',
					headers: ['المكونات (غ/لتر)', 'الدم (البلازما)', 'البول الطبيعي', 'العرق'],
					cells: [],
					rows: [
						['الماء', '900', '950', '990'],
						['البروتينات والغلوكوز', '81', '0', '0'],
						['البولة (فضلة سامة)', '0.3', '20', '0.7']
					],
					headerBackground: true,
					borders: 'grid',
					width: 'full'
				},
				{
					type: 'text',
					content: `2) بالاعتماد على الجدول: لماذا نعتبر العرق *بولاً مخففاً*؟ وماذا نستنتج لو وجدنا الغلوكوز في بول شخص مريض؟`,
					answer: `2) نعتبر العرق *بولاً مخففاً* لأن له نفس مكونات البول (ماء + أملاح + بولة) ولكن بتركيز أقل للبولة (0.7 غ/ل مقابل 20 غ/ل). ووجود الغلوكوز في البول يدل على الإصابة بـ *داء السكري* (اختلال توازن الوسط الداخلي).`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) قدّم ثلاث قواعد صحية للمحافظة على سلامة الجهاز البولي والوقاية من حصى الكلى.`,
					answer: `3) شرب كمية كافية من الماء يومياً، تجنب الإفراط في الملح والبروتينات، عدم حبس البول لمدة طويلة، والاهتمام بالنظافة الجسدية.`,
					mark: '1.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: '1 كلية، 2 حالب، 3 مثانة، 4 إحليل — تصفية الدم وتوازن الوسط الداخلي'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 4: Animal vs Plant Cell Structure (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const cellStructureTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1am_t3_cell_structure',
	grade: '1am',
	trimesterId: 't3',
	domain: 'cell_molecular',
	titleAr: 'الخلية كوحدة بنائية للكائنات الحية (الخلية الحيوانية والنباتية)',
	curriculumLessonId: 'sci_lesson_1am_t3_cell_and_sexual_reproduction',
	defaultPoints: 6,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const isPlant = seed % 2 === 0;
		const rng = new SeededRng(seed);

		const svg = svgCellUltrastructure(isPlant ? 'plant' : 'animal', {
			numbered: true,
			title: isPlant ? 'رسم تخطيطي مرقّم لخلية نباتية' : 'رسم تخطيطي مرقّم لخلية حيوانية'
		});
		const imageUrl = saveSciencesSvgAsset(`sci_1am_t3_cell_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			isPlant
				? 'خلية نباتية — تتميز بجدار سليلوزي وفجوة كبيرة وصانعات خضراء'
				: 'خلية حيوانية — تشترك مع النباتية في الغشاء الهيولي والهيولى والنواة وتفتقر للجدار السليلوزي',
			[
				{
					text: isPlant
						? 'خلية حيوانية — لا تحتوي على نواة ولا هيولى'
						: 'خلية نباتية — تحتوي على جدار سليلوزي سميك وصانعات خضراء',
					diagnosticFeedback: 'لاحظ شكل الخلية في الوثيقة: الخلية النباتية هندسية ذات جدار سميك وفجوة كبيرة، والحيوانية دائرية/بيضاوية.'
				},
				{
					text: 'بكتيريا لا تحتوي على أي غشاء أو هيولى',
					diagnosticFeedback: 'الخلية الظاهرة تحتوي بوضوح على نواة وهيولى وغشاء.'
				},
				{
					text: 'خلية نباتية خالية تماماً من النواة',
					diagnosticFeedback: 'كل من الخلية الحيوانية والنباتية تمتلك نواة!'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `تُظهر الوثيقة المقابلة ملاحظة مجهرية لخلية كائن حي. تعرف على نوع هذه الخلية والخاصية البنيوية الصحيحة لها:`,
			questionTextAr: `تعرّف على نوع الخلية في الوثيقة وخاصيتها المميزة.`,
			imageUrl,
			imageCaption: 'رسم تخطيطي مرقّم لبنية الخلية',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: isPlant
				? 'الشكل الهندسي المنتظم، **الجدار السليلوزي**، **الفجوة النامية**، و**الصانعات الخضراء** تؤكد أنها **خلية نباتية**.'
				: 'الشكل المستدير غير الهندسي وغياب الجدار السليلوزي والصانعات الخضراء يؤكد أنها **خلية حيوانية**.'
		};

		const hints: [string, string, string] = [
			'انظر للشكل الخارجي: مضلع/هندسي = خلية نباتية، مستدير/غير منتظم = خلية حيوانية.',
			'العناصر المشتركة بين كل الخلايا: غشاء هيولي + هيولى + نواة.',
			'العناصر الخاصة بالنباتية: جدار سليلوزي + فجوة عصارية نامية + صانعات خضراء.'
		];
		const solutionStepsAr = [
			`نوع الخلية في الوثيقة: **${isPlant ? 'خلية نباتية' : 'خلية حيوانية'}**.`,
			'الوحدة البنائية المشتركة: غشاء هيولي، هيولى (سيتوبلازم)، ونواة.',
			'تتميز الخلية النباتية بجدار سليلوزي وفجوة كبيرة وصانعات خضراء.'
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `فحص تلاميذ السنة الأولى متوسط بالمجهر الضوئي عينة نسيج حي، فحصلوا على الرسم التخطيطي المرقّم المقابل:`,
			content: [
				{
					type: 'columns',
					widths: ['1.15fr', '1.35fr'],
					children: [
						{
							type: 'text',
							content: `1) حدد نوع هذه الخلية (حيوانية أم نباتية) مع التعليل من خلال شكلها ومكوناتها.`,
							answer: isPlant
								? `1) هذه *خلية نباتية*، والتعليل: لها شكل هندسي منتظم لوجود *جدار سليلوزي* سميك، وتحتوي على *فجوة عصارية نامية* و*صانعات خضراء*.`
								: `1) هذه *خلية حيوانية*، والتعليل: لها شكل غير هندسي يحيط بها *غشاء هيولي* فقط، وتخلو من الجدار السليلوزي ومن الصانعات الخضراء.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'بنية الخلية الملاحَظة بالمجهر'
						}
					]
				},
				{
					type: 'text',
					content: isPlant
						? `2) سمِّ البيانات المرقمة: 1 (الجدار الخارجي)، 2 (الكيس المركزي الكبير)، 3 (البنية الكروية الجانبية)، 4 (العضية الخضراء).`
						: `2) سمِّ العناصر الأساسية الثلاثة المشتركة بين كل خلية حيوانية وكل خلية نباتية، واذكر البيان رقم 1 والبيان رقم 3 في الرسم.`,
					answer: isPlant
						? `2) 1: *جدار بكتوسليلوزي*، 2: *فجوة عصارية نامية*، 3: *نواة*، 4: *صانعة خضراء*.`
						: `2) العناصر المشتركة الثلاثة هي: *الغشاء الهيولي*، *الهيولى*، و*النواة*. في الرسم: 1- *النواة*، 3- *الغشاء الهيولي*.`,
					mark: '2'
				},
				{
					type: 'table',
					headers: ['المعيار', 'الخلية الحيوانية', 'الخلية النباتية'],
					cells: [],
					rows: [
						[
							'الجدار السليلوزي',
							{ content: '............', answer: 'غائب', mark: '0.5' },
							{ content: '............', answer: 'موجود', mark: '0.5' }
						],
						[
							'النواة والهيولى والغشاء',
							{ content: '............', answer: 'موجودة', mark: '0.5' },
							{ content: '............', answer: 'موجودة', mark: '0.5' }
						]
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
			grade: '1am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: isPlant ? 'خلية نباتية' : 'خلية حيوانية'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 5: Sexual Reproduction in Flowering Plants & Humans (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const flowerSexualReproTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1am_t3_flower_sexual_reproduction',
	grade: '1am',
	trimesterId: 't3',
	domain: 'reproduction_genetics',
	titleAr: 'التكاثر الجنسي عند النبات الزهري وعند الإنسان',
	curriculumLessonId: 'sci_lesson_1am_t3_cell_and_sexual_reproduction',
	defaultPoints: 6,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const askHuman = seed % 2 === 1;

		const svg = buildNumberedFlowerSvg();
		const imageUrl = saveSciencesSvgAsset(`sci_1am_t3_flower_s${seed}`, svg);

		const correctOpt = askHuman
			? 'الخصيتان تنتجان النطاف والمبيضان ينتجان البويضات، واتحادهما يسمى الإلقاح'
			: 'السداة (1) تنتج حبوب الطلع، والمدقة (4 و 5) بها المبيض الذي يتحول بعد الإلقاح إلى ثمرة';

		const mcq = buildUniqueMcqOptions(
			correctOpt,
			[
				{
					text: 'البويضة تتحول بعد الإلقاح إلى ثمرة والمبيض يتحول إلى بذرة',
					diagnosticFeedback: 'انتبه للترتيب الصحيح: المبيض ← ثمرة، والبويضة ← بذرة!'
				},
				{
					text: 'السبلات والبتلات هي الأعضاء المنتجة للأمشاج الذكرية والأنثوية',
					diagnosticFeedback: 'السبلات والبتلات أعضاء حماية وجذب للحشرات فقط، أما الأعضاء التكاثرية فهي الأسدية والمدقة.'
				},
				{
					text: 'الإلقاح هو انفصال النطفة عن البويضة دون اتحاد',
					diagnosticFeedback: 'الإلقاح هو اتحاد نواة مشيج ذكري مع نواة مشيج أنثوي لتشكيل البيضة الملقحة.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `تُظهر الوثيقة المقابلة مكونات الزهرة ثنائية الجنس (1: سداة، 2: بتلة، 3: سبلة، 4: ميسم المدقة، 5: مبيض). أيّ عبارة صحيحة علمياً حول التكاثر الجنسي؟`,
			questionTextAr: `اختر العبارة الصحيحة حول التكاثر الجنسي عند النبات الزهري والإنسان.`,
			imageUrl,
			imageCaption: 'مكونات الزهرة ثنائية الجنس',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `${correctOpt}، وبعد الإلقاح تتطور البويضة إلى بذرة والمبيض إلى ثمرة.`
		};

		const hints: [string, string, string] = [
			'في الزهرة: 1 سداة (ذكرية)، 2 بتلة، 3 سبلة، 4 ميسم/مدقة (أنثوية)، 5 مبيض به بويضات.',
			'عند الإنسان: المناسل هي الخصيتان (نطاف) والمبيضان (بويضات).',
			'الإلقاح هو اتحاد المشيج الذكري بالمشيج الأنثوي لتشكيل البيضة الملقحة.'
		];
		const solutionStepsAr = [
			'البيانات: 1- سداة، 2- بتلة، 3- سبلة، 4- ميسم (مدقة)، 5- مبيض.',
			'بعد الإلقاح في الزهرة: البويضة $\\leftarrow$ بذرة، المبيض $\\leftarrow$ ثمرة.',
			'عند الإنسان: اتحاد نطفة (من الخصية) مع بويضة (من المبيض) $\\leftarrow$ بيضة ملقحة.'
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `يتكاثر النبات الزهري والإنسان تكاثراً جنسياً لضمان استمرار النوع. تمثل الوثيقة المقابلة رسماً تخطيطياً لزهرة ثنائية الجنس:`,
			content: [
				{
					type: 'columns',
					widths: ['1.2fr', '1.3fr'],
					children: [
						{
							type: 'text',
							content: `1) سمِّ البيانات المرقمة من 1 إلى 5، وصنّفها إلى *أعضاء حماية* و*أعضاء تكاثر*.`,
							answer: `1) 1- *سداة*، 2- *بتلة*، 3- *سبلة*، 4- *ميسم (المدقة)*، 5- *مبيض (به بويضات)*. *أعضاء الحماية:* البتلات والسبلات (2 و 3). *أعضاء التكاثر:* الأسدية والمدقة (1 و 4 و 5).`,
							mark: '2.5'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'مقطع طولي في زهرة ثنائية الجنس'
						}
					]
				},
				{
					type: 'table',
					headers: ['الكائن الحي', 'المناسل الذكرية ← المشيج الذكري', 'المناسل الأنثوية ← المشيج الأنثوي'],
					cells: [],
					rows: [
						[
							'الإنسان',
							{ content: '................', answer: 'الخصيتان ← النطاف', mark: '1' },
							{ content: '................', answer: 'المبيضان ← البويضات', mark: '1' }
						],
						[
							'النبات الزهري',
							{ content: '................', answer: 'الأسدية (المئبر) ← حبوب الطلع', mark: '0.5' },
							{ content: '................', answer: 'المدقة (المبيض) ← البويضات', mark: '0.5' }
						]
					],
					headerBackground: true,
					borders: 'grid',
					width: 'full'
				},
				{
					type: 'text',
					content: `3) عرّف *الإلقاح*، ثم حدد مصير كل من *المبيض* و*البويضة* في الزهرة بعد الإلقاح.`,
					answer: `3) *الإلقاح:* اتحاد نواة مشيج ذكري مع نواة مشيج أنثوي لتشكيل بيضة ملقحة. وبعد الإلقاح في الزهرة يتحول *المبيض إلى ثمرة* وتتحول *البويضة إلى بذرة*.`,
					mark: '0.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 6: OFFICIAL ALGERIAN INTEGRATION SITUATION (8 pts — الوضعية الإدماجية)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationRespirationExcretionTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1am_t3_integration_respiration_excretion',
	grade: '1am',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: مخاطر التدخين على الأسناخ الرئوية وإنتاج الطاقة',
	curriculumLessonId: 'sci_lesson_1am_t3_respiration_alveoli_hygiene',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const person = rng.pick(['العم مراد', 'العم عمر', 'العم نبيل']);
		const years = rng.pick([15, 20, 25]);

		const svg = buildSmokerVsHealthyLungSvg();
		const imageUrl = saveSciencesSvgAsset(`sci_1am_t3_integ_smoke_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'ترسب القطران وتخريب الأسناخ الرئوية يقلل امتصاص O₂ ويضعف إنتاج الطاقة في العضلات',
			[
				{
					text: 'التدخين يزيد من مساحة الأسناخ الرئوية وكمية الأكسجين الممتص',
					diagnosticFeedback: 'القطران يغطي ويخرب جدران الأسناخ الرئوية فيقلص سطح التبادل الغازي.'
				},
				{
					text: 'ضيق التنفس ناتج عن كثرة شرب الماء وممارسة الرياضة',
					diagnosticFeedback: 'شرب الماء والرياضة من القواعد الصحية المفيدة للجسم!'
				},
				{
					text: 'التدخين لا يؤثر على الجهاز التنفسي وإنما يؤثر على الأظافر فقط',
					diagnosticFeedback: 'دخان التبغ يحتوي على القطران والنيكوتين وأحادي أكسيد الكربون وهي مواد سامة جداً للرئتين.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `يدخّن ${person} منذ $${years}$ سنة، فأصبح يعاني من سعال مزمن وضيق شديد في التنفس وتعب سريع عند صعود الدرج. بالاعتماد على السند 2 (السنخ الرئوي المتضرر)، ما التفسير العلمي لأعراضه؟`,
			questionTextAr: `فسّر ضيق التنفس وسرعة التعب عند ${person} المدخن.`,
			imageUrl,
			imageCaption: 'السند 2: مقارنة السنخ الرئوي السليم والمتضرر بالتدخين',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `تراكم **القطران** وتلف جدران **الأسناخ الرئوية** يقلل انتقال غاز **$\\text{O}_2$** إلى الدم، وبالتالي ينخفض **إنتاج الطاقة** في العضلات فيشعر بتعب شديد وضيق تنفس.`
		};

		const hints: [string, string, string] = [
			'قارن في السند 1 و 2 بين الشخص السليم والمدخن من حيث حجم O₂ الممتص وسلامة الأسناخ.',
			'اربط نقص الأكسجين بوظيفة التنفس (إنتاج الطاقة من الغلوكوز و O₂).',
			'اذكر 3 قواعد صحية عملية للوقاية من أخطار التدخين وتلوث الهواء.'
		];
		const solutionStepsAr = [
			'تحليل السند 1 و 2: ترسب القطران وتخريب الأسناخ الرئوية أدى لانخفاض كمية O₂ المار للدم.',
			'ربط نقص O₂ بنقص إنتاج الطاقة في الخلايا العضلية (سبب التعب السريع).',
			'اقتراح 3 نصائح صحية: الإقلاع الفوري عن التدخين، تجنب التدخين السلبي، ممارسة الرياضة والتهوية.'
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 8,
			instruction: `*السياق:* ${person} مدخّن شره منذ ${years} سنة (علبتان يومياً). في الآونة الأخيرة أصبح يشكو من سعال مزمن، ضيق شديد في التنفس، وتعب كبير بمجرد صعود بضع درجات. عند مراجعة الطبيب المختص أجرى له فحوصات طبية ملخصة في السندات الآتية:`,
			content: [
				{
					type: 'columns',
					widths: ['1.15fr', '1.35fr'],
					children: [
						{
							type: 'table',
							headers: ['السند 1: الفحوصات الطبية', `حالة ${person}`, 'شخص سليم'],
							cells: [],
							rows: [
								['نسبة الأكسجين المار للدم', 'منخفضة (12%)', 'طبيعية (20%)'],
								['حالة الأسناخ الرئوية', 'متآكلة ومغطاة بالقطران', 'سليمة ورقيقة'],
								['السعة التنفسية للرئتين', 'ضعيفة جداً', 'مرتفعة']
							],
							headerBackground: true,
							borders: 'grid',
							width: 'full'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'السند 2: مقارنة سنخ رئوي سليم وسنخ مدخن'
						}
					]
				},
				{
					type: 'text',
					content: `*السند 3:* يحتوي دخان السجائر على أكثر من 4000 مادة سامة أخطرها *القطران* (يخرب الأسناخ الرئوية ويسبب السرطان)، *النيكوتين* (يسبب الإدمان)، و*غاز أحادي أكسيد الكربون* السام.\n\n*التعليمات:* بالاعتماد على السياق والسندات ومكتسباتك القبلية:`
				},
				{
					type: 'text',
					content: `1) فسّر سبب *ضيق التنفس* وانخفاض نسبة الأكسجين في دم ${person}.`,
					answer: `1) اعتماداً على السياق والسندين 1 و 2 و 3 ومكتسباتي القبلية: يرجع ضيق التنفس ونقص الأكسجين إلى *ترسب مادة القطران* السامة على جدران *الأسناخ الرئوية* وتآكلها، مما قلّص مساحة سطح التبادل الغازي وأعاق مرور غاز الأكسجين من هواء الأسناخ إلى الدم.`,
					mark: '3'
				},
				{
					type: 'text',
					content: `2) اشرح العلاقة بين نقص الأكسجين في الدم وبين *التعب السريع* الذي يشعر به ${person} عند صعود الدرج.`,
					answer: `2) اعتماداً على السند 1 ومكتسباتي القبلية: تحتاج العضلات أثناء صعود الدرج إلى *طاقة* تنتجها بعملية *التنفس* (استعمال الغلوكوز في وجود الأكسجين). وبما أن كمية الأكسجين الواصلة للعضلات منخفضة (12% بدل 20%)، فإن إنتاج الطاقة يضعف بشدة فيشعر بالتعب السريع.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) قدّم ثلاث نصائح صحية وجيهة لـ ${person} ولأفراد عائلته لحماية جهازهم التنفسي.`,
					answer: `3) اعتماداً على السندات ومكتسباتي القبلية، أنصح بـ:\n- *الإقلاع الفوري عن التدخين* وطلب المساعدة الطبية للتخلص من إدمان النيكوتين.\n- *تجنب التدخين السلبي* وتهوية غرف المنزل باستمرار وتفادي الأماكن الملوثة.\n- *ممارسة الرياضة بانتظام* في الهواء النقي والتغذية الصحية وشرب الماء الكافي.`,
					mark: '3'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'integration',
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: 'ترسب القطران وتلف الأسناخ ← نقص O₂ ← ضعف إنتاج الطاقة'
		};
	}
};

export const SCIENCES_TEMPLATES_1AM_T3: SciencesParameterizedTemplate[] = [
	alveolarGasExchangeTemplate,
	yeastRespirationFermentationTemplate,
	urinaryExcretionTemplate,
	cellStructureTemplate,
	flowerSexualReproTemplate,
	integrationRespirationExcretionTemplate
];
