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
	svgLabExperiment,
	svgPhysiologyDiagram,
	wrapSciencesSvg
} from '../../svg-sciences';

import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';

function svgBloodSmearLabeled(numbered = false): string {
	if (numbered) {
		return renderLessonIllustration('sci_17_blood_smear_cells', {
			title: 'سحبة دموية ملونة تحت المجهر الضوئي',
			hideLegend: true,
			pins: [
				{ num: '1', xPct: 58, yPct: 21, color: '#b91c1c' },
				{ num: '2', xPct: 35, yPct: 34, color: '#1d4ed8' },
				{ num: '3', xPct: 49, yPct: 12, color: '#b45309' },
				{ num: '4', xPct: 74, yPct: 56, color: '#6d28d9' }
			]
		});
	}
	return renderLessonIllustration('sci_17_blood_smear_cells', {
		title: 'سحبة دموية ملونة تحت المجهر الضوئي'
	});
}

function svgCeliacBiopsyComparison(): string {
	let body = `<rect x="6" y="6" width="448" height="232" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">الوثيقة 1: مقارنة الجدار الداخلي للمعي الدقيق (سليم مقابل المريض)</text>`;

	body += `<rect x="238" y="42" width="202" height="178" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.7"/>`;
	body += `<text x="339" y="62" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">شخص سليم (شاهد)</text>`;
	body += `<path d="M 254 162 L 254 96 Q 268 74 282 96 L 282 150 L 298 150 L 298 96 Q 312 74 326 96 L 326 150 L 342 150 L 342 96 Q 356 74 370 96 L 370 150 L 386 150 L 386 96 Q 400 74 414 96 L 414 162 Z" fill="#fde68a" stroke="#b45309" stroke-width="2"/>`;
	body += `<text x="339" y="186" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#14532d">زغابات معوية كثيرة وطويلة</text>`;
	body += `<text x="339" y="206" text-anchor="middle" font-size="9.6" fill="#166534">امتصاص معوي طبيعي وكافٍ</text>`;

	body += `<rect x="20" y="42" width="202" height="178" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="1.7"/>`;
	body += `<text x="121" y="62" text-anchor="middle" font-size="11" font-weight="bold" fill="#b91c1c">الطفل المريض (قبل الحمية)</text>`;
	body += `<path d="M 36 162 L 36 144 Q 80 136 121 146 Q 164 136 204 144 L 204 162 Z" fill="#fca5a5" stroke="#991b1b" stroke-width="2"/>`;
	body += `<text x="121" y="114" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#dc2626">تسطح وضمور الزغابات</text>`;
	body += `<text x="121" y="186" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#7f1d1d">سطح امتصاص ضعيف جداً</text>`;
	body += `<text x="121" y="206" text-anchor="middle" font-size="9.6" fill="#991b1b">بسبب حساسية بروتين الغلوتين</text>`;

	return wrapSciencesSvg(460, 244, body);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Enzyme Digestion Curves & Specificity Lab (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const enzymeDigestionTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4am_t1_enzyme_digestion_lab',
	grade: '4am',
	trimesterId: 't1',
	domain: 'enzymology',
	titleAr: 'التحولات الكيميائية للأغذية: تجربة هضم النشاء والنوعية الإنزيمية (BEM)',
	curriculumLessonId: 'sci_lesson_4am_t1_digestion_enzymes',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const tempBad = rng.pick([
			{ t: 100, status: 'تخرب الإنزيم نهائياً بالغليان', reversible: false },
			{ t: 0, status: 'توقف مؤقت لنشاط الإنزيم بالبرودة', reversible: true }
		]);
		const svgPlot = svgBioCurvePlot({
			title: 'تطور تركيز النشاء والمالتوز بوجود اللعاب عند 37°C',
			xMin: 0,
			xMax: 15,
			yMin: 0,
			yMax: 100,
			xStep: 3,
			yStep: 20,
			xLabel: 'الزمن (دقيقة)',
			yLabel: 'التركيز (%)',
			curves: [
				{
					fn: (x) => Math.max(0, 100 * Math.exp(-0.26 * x)),
					color: '#1d4ed8',
					label: 'تركيز النشاء'
				},
				{
					fn: (x) => Math.min(100, 100 * (1 - Math.exp(-0.26 * x))),
					color: '#dc2626',
					label: 'تركيز المالتوز',
					dashed: true
				}
			],
			points: [
				{ x: 0, y: 100, label: 'نشاء 100%', color: '#1d4ed8' },
				{ x: 15, y: 98, label: 'مالتوز', color: '#dc2626' }
			]
		});
		const imageUrl = saveSciencesSvgAsset(`sci_4am_t1_enz_${difficulty}_s${seed}`, svgPlot);

		const mcq = buildUniqueMcqOptions(
			'يتناقص النشاء تدريجياً ويتزايد المالتوز بفضل إنزيم الأميلاز اللعابي الذي يعمل نوعياً على النشاء عند 37°C',
			[
				{
					text: 'يتحول النشاء في الفم مباشرة إلى أحماض أمينية بواسطة البروتياز',
					diagnosticFeedback: 'النشاء غلوسيد يتحول في الفم إلى **مالتوز** بواسطة **الأميلاز اللعابي**، أما البروتياز فيؤثر على البروتينات فقط.'
				},
				{
					text: 'يؤثر الأميلاز اللعابي على النشاء والبروتين والدسم معاً بنفس الفعالية',
					diagnosticFeedback: 'الإنزيمات تتميز بـ**النوعية**؛ فالأميلاز يفكك النشاء فقط ولا يؤثر على البروتين أو الدسم.'
				},
				{
					text: 'يكشف ماء اليود عن المالتوز بإعطاء راسب أحمر آجوري',
					diagnosticFeedback: 'ماء اليود يكشف عن **النشاء** (أزرق بنفسجي)، أما السكر المرجع (المالتوز) فيُكشف عنه بـ**محلول فهلنغ + تسخين** (أحمر آجوري).'
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
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: 'يُمثل المنحنى البياني نتائج هضم مطبوخ النشاء بوجود اللعاب عند $37^\\circ\\text{C}$. ما التحليل والتفسير الصحيحان؟',
				questionTextAr: 'انطلاقاً من منحنى هضم النشاء باللعاب عند $37^\\circ\\text{C}$، اختر الإجابة الصحيحة:',
				imageUrl,
				imageCaption: 'تطور تركيز النشاء والمالتوز في وجود اللعاب',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'يفكك **الأميلاز اللعابي** النشاء نوعياً عند $37^\\circ\\text{C}$ إلى سكر ثنائي هو **المالتوز** (يتناقص النشاء ويتزايد المالتوز).'
			},
			sujetExercise: {
				points: 6,
				instruction: `لمتابعة التحول الكيميائي للنشاء مخبرياً، وُضع مطبوخ النشاء مع اللعاب الطازج في حمام مائي درجة حرارته $37^circle "C"$ ومُثّلت النتائج في المنحنى المقابل. وبالموازاة وُضع زلال البيض (بروتين) مع اللعاب في نفس الشروط فلم يحدث أي تحول.`,
				content: [
					{
						type: 'columns',
						widths: ['1.25fr', '1.15fr'],
						children: [
							{
								type: 'text',
								content: `1) *حلّل* ثم *فسّر* المنحنيين البيانيين الممثلين في الوثيقة المقابلة، مع ذكر اسم الإنزيم المتدخل.`,
								answer: `1) *التحليل*: عند الزمن $t = 0$ يكون تركيز النشاء $100\%$ والمالتوز $0\%$؛ ومع مرور الزمن (من 0 إلى 15 دقيقة) يتناقص تركيز النشاء تدريجياً حتى ينعدم تقريباً، وفي المقابل يتزايد تركيز المالتوز حتى يقارب $100\%$.\n\n*التفسير*: قام إنزيم *الأميلاز اللعابي* بتفكيك (إماهة) النشاء كيميائياً إلى سكر الشعير (*المالتوز*) عند الحرارة المثلى $37^circle "C"$.`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: هضم النشاء باللعاب عند 37°C'
							}
						]
					},
					{
						type: 'text',
						content: `2) حدّد *الكاشف الكيميائي* والنتيجة اللونية التي نتحصل عليها في نهاية التجربة ($t = 15 " min"$) لإثبات: (أ) اختفاء النشاء، (ب) ظهور المالتوز.`,
						answer: `2) (أ) نضيف *ماء اليود*: لا يظهر اللون الأزرق البنفسجي (يبقى بني مصفر) مما يثبت اختفاء النشاء.\n(ب) نضيف *محلول فهلنغ مع التسخين*: يظهر *راسب أحمر آجوري* مما يثبت تشكل سكر مرجع (المالتوز).`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) ماذا تستنتج من عدم تفكك *زلال البيض* باللعاب، وماذا يحدث لو أُجريت تجربة النشاء واللعاب عند درجة حرارة $${tempBad.t}^circle "C"$؟`,
						answer: `3) عدم تأثير اللعاب على البروتين يثبت *خاصية النوعية الإنزيمية* (الأميلاز يفكك النشاء فقط، والبروتين يفككه البروتياز).\n\nعند $${tempBad.t}^circle "C"$ لا يُهضم النشاء بسبب *${tempBad.status}* (${tempBad.reversible ? 'ويستعيد نشاطه عند إرجاعه إلى 37°C' : 'ولا يستعيد نشاطه حتى لو أُعيد إلى 37°C'}).`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) أين وعلى يد أي إنزيم يتحول *المالتوز* لاحقاً إلى مغذٍ بسيط نهائي؟ سمّ هذا المغذي.`,
						answer: `4) يتحول المالتوز في *المعي الدقيق* بواسطة إنزيم *المالتاز* إلى *غلوكوز* (سكر عنب) جاهز للامتصاص.`,
						mark: '1'
					}
				]
			},
			hints: [
				'في التحليل صف تناقص النشاء وتزايد المالتوز مع الأرقام، ثم فسّر بعمل الأميلاز اللعابي.',
				'ماء اليود يكشف عن النشاء (أزرق بنفسجي)، ومحلول فهلنغ + تسخين يكشف عن السكر المرجع (أحمر آجوري).',
				'تُخرب الحرارة المرتفعة (100°C) الإنزيم نهائياً، بينما توقفه البرودة (0°C) مؤقتاً.'
			],
			solutionStepsAr: [
				'تحليل وتفسير تناقص النشاء وتزايد المالتوز بفعل الأميلاز اللعابي عند 37°C.',
				'كاشفا النشاء (ماء اليود) والمالتوز (فهلنغ + تسخين).',
				`إثبات النوعية الإنزيمية وتأثير درجة الحرارة $${tempBad.t}^\\circ\\text{C}$.`,
				'المالتوز يتحول في المعي الدقيق بإنزيم المالتاز إلى غلوكوز.'
			],
			finalAnswer: 'الأميلاز اللعابي يحول النشاء نوعياً إلى مالتوز ثم المالتاز إلى غلوكوز'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Intestinal Villus Structure & Dual Absorption Routes + Liver (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const villusAbsorptionTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4am_t1_villus_absorption_routes',
	grade: '4am',
	trimesterId: 't1',
	domain: 'nutrition_digestion',
	titleAr: 'بنية الزغابة المعوية، طريقا الامتصاص، ودور الكبد في تنظيم الغلوكوز (BEM)',
	curriculumLessonId: 'sci_lesson_4am_t1_intestinal_absorption_villus',
	defaultPoints: 6,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const gluPortal = rng.pick([2.1, 2.4, 2.6]);
		const gluHepatic = 1.0;
		const svg = svgPhysiologyDiagram('digestive_villus', {
			numbered: true,
			title: 'الوثيقة: رسم تخطيطي لبنية الزغابة المعوية'
		});
		const imageUrl = saveSciencesSvgAsset(`sci_4am_t1_villus_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'الغلوكوز والأحماض الأمينية تسلك الطريق الدموي (مروراً بالكبد)، والأحماض الدسمة والغليسيرول تسلك الطريق اللمفاوي',
			[
				{
					text: 'الأحماض الدسمة والغليسيرول تسلك الطريق الدموي وتمر عبر الكبد',
					diagnosticFeedback: 'نواتج هضم الدسم تمر عبر **الوعاء البلغمي المركزي (الطريق اللمفاوي)**.'
				},
				{
					text: 'الغلوكوز والأحماض الأمينية تسلك الطريق اللمفاوي فقط',
					diagnosticFeedback: 'الغلوكوز والأحماض الأمينية تسلك **الطريق الدموي** وتمر عبر الكبد.'
				},
				{
					text: 'الماء والأملاح المعدنية لا تُمتص في الزغابة المعوية',
					diagnosticFeedback: 'الماء والأملاح المعدنية تسلك **كلا الطريقين** (الدموي واللمفاوي).'
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
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: `بُعيد تناول وجبة كاملة، تنتقل المغذيات عبر الزغابة المعوية المبينة في الوثيقة. أي توزيع صحيح لطريقي الامتصاص؟`,
				questionTextAr: 'حدّد مسار كل نوع من المغذيات عبر الزغابة المعوية:',
				imageUrl,
				imageCaption: 'بنية الزغابة المعوية المرقمة',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'يسلك **الغلوكوز والأحماض الأمينية** الطريق الدموي (مروراً بالكبد)، وتسلك **الأحماض الدسمة والغليسيرول** الطريق اللمفاوي، والماء والأملاح كلا الطريقين.'
			},
			sujetExercise: {
				points: 6,
				instruction: `يمثل الرسم المقابل بنية مجهرية تبطن الجدار الداخلي للمعي الدقيق وتؤمن ظاهرة حيوية أساسية. وبعد وجبة غذائية غنية، قِيس تركيز الغلوكوز في الوريد البابي الكبدي فبلغ $${gluPortal} " g/L"$ بينما بلغ في الوريد فوق الكبدي $${gluHepatic} " g/L"$.`,
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) سمِّ البنية الممثلة في الوثيقة والظاهرة التي تحدث على مستواها، ثم استبدل الأرقام (1، 3، 4، 6) بالبيانات المناسبة.`,
								answer: `1) البنية: *الزغابة المعوية*؛ الظاهرة: *الامتصاص المعوي*.\n- (1) ظهارة معوية (صف واحد من الخلايا).\n- (3) الطريق الدموي (شعيرات دموية).\n- (4) وعاء بلغمي (لمفاوي) مركزي.\n- (6) الطريق اللمفاوي (البلغمي).`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: رسم تخطيطي للزغابة المعوية'
							}
						]
					},
					{
						type: 'text',
						content: `2) اذكر *ثلاث خصائص بنيوية* لجدار المعي الدقيق والزغابة المعوية تجعلها سطح تبادل وامتصاص فعالاً.`,
						answer: `2) (1) *كثرة عدد الزغابات المعوية* والطيات الداخلية ما يضاعف مساحة سطح الامتصاص.\n(2) *رقة جدار الزغابة* (صف واحد من الخلايا) لتسهيل مرور المغذيات.\n(3) *غناها بشبكة كثيفة من الشعيرات الدموية* ووعاء بلغمي مركزي.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) صنّف المغذيات الآتية حسب الطريق الذي تسلكه: *غلوكوز، أحماض دسمة، أحماض أمينية، غليسيرول، ماء وأملاح معدنية*، وحدّد العضو الذي يلتقي فيه الطريقان.`,
						answer: `3) - *الطريق الدموي*: غلوكوز، أحماض أمينية، ماء وأملاح معدنية.\n- *الطريق اللمفاوي*: أحماض دسمة، غليسيرول، ماء وأملاح معدنية.\n- يلتقي الطريقان في *القلب* (ليوزع المغذيات نحو كل خلايا الجسم).`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) فسّر انخفاض تركيز الغلوكوز من $${gluPortal} " g/L"$ قبل الكبد إلى $${gluHepatic} " g/L"$ بعد خروجه من الكبد.`,
						answer: `4) قام *الكبد* بتنظيم نسبة السكر في الدم (تحلون الدم $approx 1 " g/L"$) حيث خزّن فائض الغلوكوز الممتص على شكل سكر معقد ادخاري هو *الغليكوجين*.`,
						mark: '1'
					}
				]
			},
			hints: [
				'الأرقام (1) ظهارة رقيقة، (3) طريق دموي، (4) وعاء بلغمي مركزي، (6) طريق لمفاوي.',
				'الدسم (أحماض دسمة + غليسيرول) تسلك الطريق اللمفاوي، والغلوكوز والأحماض الأمينية الطريق الدموي.',
				'الكبد يخزن فائض الغلوكوز على شكل غليكوجين ليحافظ على ثبات السكر حول 1 g/L.'
			],
			solutionStepsAr: [
				'الزغابة المعوية والامتصاص المعوي + تسمية البيانات المرقمة.',
				'خصائص الزغابة: العدد الهائل، رقة الجدار، والغنى بالأوعية الدموية واللمفاوية.',
				'توزيع المغذيات بين الطريقين الدموي واللمفاوي والتقاؤهما في القلب.',
				'تخزين الكبد لفائض الغلوكوز على شكل غليكوجين.'
			],
			finalAnswer: 'الزغابة المعوية + الطريقان الدموي واللمفاوي + تخزين الغليكوجين بالكبد'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Blood Smear, Hemoglobin Gas Transport & Internal Medium (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const bloodTransportTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4am_t1_blood_transport_hemoglobin',
	grade: '4am',
	trimesterId: 't1',
	domain: 'nutrition_digestion',
	titleAr: 'مكونات الدم، دور الهيموغلوبين في نقل الغازات، وعلاقة الوسط الداخلي بالخلايا',
	curriculumLessonId: 'sci_lesson_4am_t1_blood_internal_medium',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const svg = svgBloodSmearLabeled(true);
		const imageUrl = saveSciencesSvgAsset(`sci_4am_t1_blood_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'(1) كرية حمراء لنقل الغازات عبر الهيموغلوبين، (2) كرية بيضاء للدفاع المناعي، (3) بلازما لنقل المغذيات، (4) صفائح لتخثر الدم',
			[
				{
					text: '(1) كرية حمراء لنقل الغلوكوز، (2) كرية بيضاء لتخثر الدم، (3) بلازما لإفراز الأنسولين',
					diagnosticFeedback: 'تنقل الكريات الحمراء **الغازات التنفسية** لا الغلوكوز، وتنقل **البلازما** المغذيات.'
				},
				{
					text: 'يتغير لون الدم في الرئتين إلى أحمر قاتم بسبب تشكل المركب $\\text{HbO}_8$',
					diagnosticFeedback: 'المركب $\\text{HbO}_8$ يعطي الدم لوناً **أحمر قانياً (فاتحاً)**، أما القاتم فيعود لـ $\\text{HbCO}_2$.'
				},
				{
					text: 'الدم يلامس خلايا الجسم مباشرة دون أي سائل وسيط',
					diagnosticFeedback: 'يجري الدم في أوعية مغلقة؛ والسائل الوسيط المباشر الذي يغمر الخلايا هو **السائل البيني**.'
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
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: 'اعتماداً على السحبة الدموية المجهرية المرقمة في الوثيقة، ما التسمية والدور الصحيحان لكل مكون دموي؟',
				questionTextAr: 'تعرّف على عناصر السحبة الدموية (1، 2، 3، 4) ودور كل منها:',
				imageUrl,
				imageCaption: 'سحبة دموية تحت المجهر الضوئي',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: '(1) الكريات الحمراء تنقل $\\text{O}_2$ و$\\text{CO}_2$ عبر الهيموغلوبين، (2) الكريات البيضاء تدافع عن الجسم، (3) البلازما تنقل المغذيات والفضلات، (4) الصفائح توقف النزيف بتخثر الدم.'
			},
			sujetExercise: {
				points: 6,
				instruction: `يمثل الدم العنصر الأساسي في *الوسط الداخلي* لربط أعضاء التزويد (المعي الدقيق والرئتين) بخلايا الأعضاء. تُظهر الوثيقة المقابلة ملاحظة مجهرية لسحبة دموية ملونة عند إنسان سليم.`,
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) سمِّ العناصر المرقمة (1، 2، 3، 4) وحدّد بدقة *الدور الأساسي* لكل عنصر في العضوية.`,
								answer: `1) - (1) *كريات دموية حمراء* (عديمة النواة): نقل الغازات التنفسية ($upright("O")_2$ و$upright("CO")_2$) بفضل صبغة الهيموغلوبين.\n- (2) *كريات دموية بيضاء* (بها نواة): الدفاع عن العضوية ضد الميكروبات.\n- (3) *البلازما (المصورة)*: نقل المغذيات والفضلات السائلة وجزء من الغازات.\n- (4) *الصفائح الدموية*: المساهمة في تخثر الدم ووقف النزيف.`,
								mark: '2.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: سحبة دموية مجهرية'
							}
						]
					},
					{
						type: 'text',
						content: `2) فسّر *بمعادلتين كيميائيتين* سبب كون الدم الخارج من الرئتين لونه *أحمر قانياً*، بينما الدم الخارج من العضلات لونه *أحمر قاتماً*.`,
						answer: `2) تحتوي الكريات الحمراء صبغة *الهيموغلوبين* ($upright("Hb")$):\n- على مستوى الأسناخ الرئوية يرتبط بـ $upright("O")_2$: $upright("Hb") + 4 upright("O")_2 arrow.r upright("HbO")_8$ (أوكسي هيموغلوبين ذو لون *أحمر قانٍ*).\n- على مستوى الخلايا يتخلى عن $upright("O")_2$ ويرتبط بجزء من $upright("CO")_2$: $upright("Hb") + upright("CO")_2 arrow.r upright("HbCO")_2$ (ذو لون *أحمر قاتم*).`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) اذكر المكونات الثلاثة للـ*وسط الداخلي*، وبيّن دور *السائل البيني* في تزويد الخلايا بالمغذيات وثنائي الأكسجين.`,
						answer: `3) مكونات الوسط الداخلي: *الدم*، *السائل البيني*، و*اللمف*.\n\nيتشكل *السائل البيني* بترشيح البلازما عبر جدران الشعيرات الدموية ويغمر جميع الخلايا مباشرة، فيعمل كوسيط ينقل إليها المغذيات و$upright("O")_2$ ويخلصها من $upright("CO")_2$ والفضلات نحو الدم واللمف.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'الكريات الحمراء عديمة النواة وتنقل الغازات، والبيضاء لها نواة وتدافع عن الجسم.',
				'اكتب معادلتي الهيموغلوبين: Hb + 4O₂ → HbO₈ (أحمر قانٍ) و Hb + CO₂ → HbCO₂ (أحمر قاتم).',
				'الوسط الداخلي = دم + سائل بيني + لمف.'
			],
			solutionStepsAr: [
				'تسمية العناصر الدموية الأربعة وذكر وظيفة كل منها.',
				'كتابة معادلتي ارتباط الهيموغلوبين بالأكسجين وثنائي أكسيد الكربون وربطها بلون الدم.',
				'تعريف الوسط الداخلي وإبراز دور السائل البيني كوسيط مباشر مع الخلايا.'
			],
			finalAnswer: 'بلازما (مغذيات) + كريات حمراء/Hb (غازات) + كريات بيضاء + صفائح + السائل البيني'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Cellular Respiration vs Fermentation & Muscle Metabolism (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const respirationFermentationTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4am_t1_respiration_vs_fermentation',
	grade: '4am',
	trimesterId: 't1',
	domain: 'bioenergetics',
	titleAr: 'استعمال المغذيات في الخلايا: التنفس الخلوي في العضلة ومقارنته بالتخمر (BEM)',
	curriculumLessonId: 'sci_lesson_4am_t1_cellular_respiration_fermentation',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{ o2In: 20, o2Rest: 15, o2Work: 7, gluIn: 90, gluRest: 80, gluWork: 50 },
			{ o2In: 20, o2Rest: 14, o2Work: 8, gluIn: 100, gluRest: 88, gluWork: 55 }
		];
		const d = rng.pick(sets);
		const o2UsedRest = d.o2In - d.o2Rest;
		const o2UsedWork = d.o2In - d.o2Work;
		const gluUsedRest = d.gluIn - d.gluRest;
		const gluUsedWork = d.gluIn - d.gluWork;

		const svg = svgLabExperiment('respiration_fermentation');
		const imageUrl = saveSciencesSvgAsset(`sci_4am_t1_resp_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`استهلكت العضلة أثناء النشاط $${o2UsedWork}\\text{ mL}$ من $\\text{O}_2$ و$${gluUsedWork}\\text{ mg}$ من الغلوكوز لإنتاج طاقة أكبر بالتنفس الخلوي`,
			[
				{
					text: `استهلكت العضلة أثناء النشاط $${d.o2Work}\\text{ mL}$ من $\\text{O}_2$ فقط`,
					diagnosticFeedback: `$${d.o2Work}\\text{ mL}$ هي الكمية **المتبقية في الدم الخارج**؛ المستهلكة = الداخل − الخارج = $${d.o2In} - ${d.o2Work} = ${o2UsedWork}\\text{ mL}$.`
				},
				{
					text: 'يُنتج التخمر الكحولي طاقة أكبر بكثير من التنفس الخلوي',
					diagnosticFeedback: 'التنفس الخلوي (هدم كلي بوجود $\\text{O}_2$) ينتج طاقة كبيرة جداً مقارنة بالتخمر (هدم جزئي بغياب $\\text{O}_2$).'
				},
				{
					text: 'تُستعمل الأحماض الأمينية كمصدر أول للغازات التنفسية',
					diagnosticFeedback: 'الأحماض الأمينية تُستعمل أساساً في **البناء الحيوي والنمو وتجديد الخلايا**.'
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
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `يدخل $100\\text{ mL}$ من الدم إلى عضلة حاملاً $${d.o2In}\\text{ mL}$ من $\\text{O}_2$ و$${d.gluIn}\\text{ mg}$ غلوكوز، ويخرج منها أثناء النشاط بـ $${d.o2Work}\\text{ mL}$ من $\\text{O}_2$ و$${d.gluWork}\\text{ mg}$ غلوكوز. ما الاستنتاج الصحيح؟`,
				questionTextAr: 'احسب الكميات المستهلكة في العضلة أثناء النشاط واختر التفسير الصحيح:',
				imageUrl,
				imageCaption: 'مقارنة التنفس الخلوي والتخمر الكحولي',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `المستهلك أثناء النشاط: $\\text{O}_2 = ${d.o2In} - ${d.o2Work} = ${o2UsedWork}\\text{ mL}$ والغلوكوز $= ${d.gluIn} - ${d.gluWork} = ${gluUsedWork}\\text{ mg}$ لإنتاج الطاقة بالتنفس الخلوي.`
			},
			sujetExercise: {
				points: 6,
				instruction: `لدراسة كيفية استعمال الخلايا للمغذيات، قِيسَت كميات $upright("O")_2$ والغلوكوز في $100 " mL"$ من الدم الداخل والخارج من عضلة في حالتي الراحة والنشاط (الجدول)، كما دُرست خلايا خميرة الخبز في وسط هوائي ووسط لاهوائي (الوثيقة).`,
				content: [
					{
						type: 'columns',
						widths: ['1.15fr', '1.1fr'],
						children: [
							{
								type: 'table',
								headers: ['في 100 mL دم', 'دم داخل للعضلة', 'دم خارج (راحة)', 'دم خارج (نشاط)'],
								cells: [],
								rows: [
									['ثنائي الأكسجين (mL)', `${d.o2In}`, `${d.o2Rest}`, `${d.o2Work}`],
									['الغلوكوز (mg)', `${d.gluIn}`, `${d.gluRest}`, `${d.gluWork}`]
								],
								headerBackground: true,
								borders: 'grid',
								width: 'full'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: التنفس الخلوي والتخمر'
							}
						]
					},
					{
						type: 'text',
						content: `1) احسب كمية $upright("O")_2$ وكمية الغلوكوز المستهلكتين من طرف العضلة في *حالة الراحة* وفي *حالة النشاط*، ثم فسّر الفرق المسجل.`,
						answer: `1) - *في الراحة*: استهلكت $${d.o2In} - ${d.o2Rest} = ${o2UsedRest} " mL"$ من $upright("O")_2$ و$${d.gluIn} - ${d.gluRest} = ${gluUsedRest} " mg"$ من الغلوكوز.\n- *في النشاط*: استهلكت $${d.o2In} - ${d.o2Work} = ${o2UsedWork} " mL"$ من $upright("O")_2$ و$${d.gluIn} - ${d.gluWork} = ${gluUsedWork} " mg"$ من الغلوكوز.\n\n*التفسير*: يزداد استهلاك $upright("O")_2$ والغلوكوز أثناء النشاط لأن العضلة تحتاج إلى *طاقة أكبر* تنتجها عبر هدم الغلوكوز بوجود $upright("O")_2$ (*التنفس الخلوي*).`,
						mark: '2'
					},
					{
						type: 'text',
						content: `2) اكتب *المعادلة الإجمالية* للتنفس الخلوي الهوائي.`,
						answer: `2) $upright("C")_6 upright("H")_12 upright("O")_6 + 6 upright("O")_2 arrow.r 6 upright("CO")_2 + 6 upright("H")_2 upright("O") + upright("طاقة كبيرة")$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) بالاعتماد على الوثيقة، قارن بين *التنفس الخلوي* و*التخمر الكحولي* عند الخميرة من حيث: شروط الوسط، نوع الهدم، النواتج، والمردود الطاقوي.`,
						answer: `3) - *التنفس*: وسط هوائي ($upright("O")_2$)، هدم *كلي* للغلوكوز، نواتج معدنية ($upright("CO")_2 + upright("H")_2 upright("O")$)، *طاقة كبيرة* وتكاثر كبير.\n- *التخمر*: وسط لاهوائي (غياب $upright("O")_2$)، هدم *جزئي* للغلوكوز، نواتج ($upright("CO")_2$ + كحول إيثيلي)، *طاقة ضئيلة* وتكاثر قليل.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) حدّد الدور الأساسي لـ*الأحماض الأمينية* داخل خلايا العضلة والطفل في طور النمو.`,
						answer: `4) تُستعمل الأحماض الأمينية في *البناء الحيوي* (تركيب البروتينات الجديدة) من أجل *النمو وتجديد الخلايا التالفة والصيانة*.`,
						mark: '1'
					}
				]
			},
			hints: [
				'الكمية المستهلكة = الكمية في الدم الداخل − الكمية في الدم الخارج.',
				'التنفس هدم كلي هوائي بطاقة كبيرة، والتخمر هدم جزئي لاهوائي بطاقة ضئيلة وكحول إيثيلي.',
				'الأحماض الأمينية مسؤولة عن البناء والنمو وتجديد الخلايا.'
			],
			solutionStepsAr: [
				`الراحة: ${o2UsedRest} mL O₂ و${gluUsedRest} mg غلوكوز؛ النشاط: ${o2UsedWork} mL O₂ و${gluUsedWork} mg غلوكوز.`,
				'كتابة معادلة التنفس الخلوي الهوائي.',
				'مقارنة التنفس والتخمر (شرط الوسط، الهدم، النواتج، الطاقة).',
				'الأحماض الأمينية للبناء الحيوي والنمو وتجديد الخلايا.'
			],
			finalAnswer: `استهلاك النشاط: ${o2UsedWork} mL O₂ و ${gluUsedWork} mg غلوكوز`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. BEM Integration Situation 1 (8 pts): Celiac Disease Clinical Diagnosis
// ═══════════════════════════════════════════════════════════════════════════════
const integrationCeliacBemTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4am_t1_integration_celiac_disease_bem',
	grade: '4am',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'وضعية إدماجية (نمط BEM): تشخيص حالة داء السيلياك وضمور الزغابات المعوية',
	curriculumLessonId: 'sci_lesson_4am_t1_nutritional_balance_diseases',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const patients = [
			{ child: 'أمينة', age: 11, hb: 8.4, gluPortal: 0.95, antiGluten: 'إيجابية مرتفعة جداً' },
			{ child: 'ياسين', age: 13, hb: 8.8, gluPortal: 0.9, antiGluten: 'إيجابية مرتفعة جداً' }
		];
		const p = rng.pick(patients);
		const svgCeliac = svgCeliacBiopsyComparison();
		const imgCeliac = saveSciencesSvgAsset(`sci_4am_t1_int1_celiac_${difficulty}_s${seed}`, svgCeliac);

		const mcq = buildUniqueMcqOptions(
			'يعاني الطفل من داء السيلياك (حساسية للغلوتين أدت لضمور الزغابات ونقص الامتصاص المعوي)، والحل حمية خالية تماماً من الغلوتين',
			[
				{
					text: 'يعاني من زيادة مفرطة في الامتصاص المعوي ويجب زيادة تناول خبز القمح والعجائن',
					diagnosticFeedback: 'تُظهر الوثيقة (1) **ضمور وتسطح الزغابات المعوية**، وخبز القمح غني بالغلوتين المسبب للمرض!'
				},
				{
					text: 'يعاني من انسداد في القصبة الهوائية ولا علاقة للجهاز الهضمي بالأعراض',
					diagnosticFeedback: 'الوثيقتان (1 و 2) تثبتان أن المشكل في المعي الدقيق وحساسية الغلوتين.'
				},
				{
					text: 'المضادات الحيوية وحدها تشفي من داء السيلياك مع الاستمرار في أكل القمح',
					diagnosticFeedback: 'العلاج الوحيد الفعّال لداء السيلياك هو **الحمية الخالية من الغلوتين** (ذرة، أرز، بطاطا، خضر، لحوم).'
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
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: `عانى الطفل ${p.child} (${p.age} سنة) من إسهال مزمن وهزال وشحوب (الهيموغلوبين $${p.hb}\\text{ g/dL}$)، وكشف المنظار ضمور الزغابات المعوية وإيجابية مضادات الغلوتين. ما التشخيص والعلاج المناسب؟`,
				questionTextAr: `ما تشخيص حالة ${p.child} وما العلاج الغذائي الواجب اتباعه؟`,
				imageUrl: imgCeliac,
				imageCaption: 'الوثيقة 1: مقارنة الزغابات المعوية السليمة والمريضة',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'تسطح الزغابات وإيجابية مضادات الغلوتين يؤكدان **داء السيلياك**؛ وعلاجه الصارم هو **حمية خالية من الغلوتين** لتتجدد الزغابات.'
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `*السياق*: نُقل الطفل ${p.child} (${p.age} سنة) إلى المستشفى وهو يعاني منذ أشهر من إسهال مزمن، انتفاخ البطن، هزال شديد وتأخر في النمو، إضافة إلى تعب سريع وشحوب في الوجه رغم تناوله وجبات يومية غنية بخبز القمح والكسكس والمعكرونة. قام الطبيب بفحص جدار المعي الدقيق بالمنظار وأجرى تحاليل دموية لخّصت نتائجها في الوثيقتين الآتيتين:`,
				content: [
					{
						type: 'columns',
						widths: ['1.15fr', '1.1fr'],
						children: [
							{
								type: 'table',
								headers: ['التحليل (الوثيقة 2)', `عند ${p.child}`, 'القيمة المرجعية'],
								cells: [],
								rows: [
									['الغلوكوز بالوريد البابي بعد وجبة', `${p.gluPortal} g/L`, '2.2 إلى 2.5 g/L'],
									['نسبة الهيموغلوبين (Hb)', `${p.hb} g/dL`, '12 إلى 15 g/dL'],
									['مضادات بروتين الغلوتين', p.antiGluten, 'سلبية (غائبة)']
								],
								headerBackground: true,
								borders: 'grid',
								width: 'full'
							},
							{
								type: 'image',
								src: imgCeliac,
								caption: 'الوثيقة 1: جدار المعي الدقيق بالمنظار'
							}
						]
					},
					{
						type: 'text',
						content: `*التعليمات*: بالاعتماد على السياق والوثيقتين (1 و 2) ومكتسباتك القبلية:\n\n1) شخّص بدقة المرض الذي يعاني منه ${p.child} وحدّد المادة الغذائية المسؤولة عنه.`,
						answer: `1) *بالاعتماد على السياق والوثيقتين (1 و 2)*: يعاني ${p.child} من *داء السيلياك (الداء البطني / حساسية الغلوتين)*. المادة المسؤولة هي بروتين *الغلوتين* الموجود في القمح ومشتقاته (الخبز، الكسكس، المعكرونة) بدليل إيجابية مضادات الغلوتين في الوثيقة (2) وضمور الزغابات في الوثيقة (1).`,
						mark: '2'
					},
					{
						type: 'text',
						content: `2) قدّم تفسيراً علمياً متسلسلاً لظهور كل من: (أ) الهزال وتأخر النمو، (ب) التعب السريع والشحوب لدى ${p.child}.`,
						answer: `2) *بالاعتماد على الوثيقتين (1 و 2) ومكتسباتي*:\n- تسببت حساسية الغلوتين في *ضمور وتخريب الزغابات المعوية* (الوثيقة 1)، مما قلّص بشدة *سطح الامتصاص المعوي* (بدليل ضعف الغلوكوز في الوريد البابي بعد الوجبة: $${p.gluPortal} " g/L"$ مقابل $2.5 " g/L"$ في الوثيقة 2).\n- (أ) *الهزال وتأخر النمو*: ناتجان عن نقص امتصاص *الأحماض الأمينية* الضرورية للبناء الحيوي والنمو والمغذيات الطاقوية.\n- (ب) *التعب والشحوب*: ناتجان عن نقص امتصاص *الحديد* والغلوكوز؛ فنقص الحديد سبّب *فقر الدم* (انخفاض الهيموغلوبين إلى $${p.hb} " g/dL"$ في الوثيقة 2) مما قلّل نقل $upright("O")_2$ إلى الخلايا فانخفض *التنفس الخلوي* وإنتاج الطاقة.`,
						mark: '3.5'
					},
					{
						type: 'text',
						content: `3) اقترح *ثلاث نصائح تغذوية وصحية* دقيقة ومبرّرة لتحسين الحالة الصحية لـ${p.child} واستعادة نموه الطبيعي.`,
						answer: `3) - *اتباع حمية غذائية صارمة خالية تماماً من الغلوتين* (الامتناع عن القمح والشعير ومشتقاتهما) لوقف تخريب الزغابات والسماح لها بالتجدد واستعادة وظيفة الامتصاص.\n- *استبدال الحبوب الممنوعة بأغذية طبيعية خالية من الغلوتين* مثل: الأرز، الذرة، البطاطا، الخضر، الفواكه، واللحوم.\n- *تقديم أغذية غنية بالحديد والبروتينات* (الكبد، العدس، السبانخ، البيض) لعلاج فقر الدم ورفع الهيموغلوبين واستدراك تأخر النمو، مع المتابعة الطبية الدورية.`,
						mark: '2.5'
					}
				]
			},
			hints: [
				'استشهد صراحة بالوثيقة (1) لضمور الزغابات والوثيقة (2) لمضادات الغلوتين ونقص الغلوكوز وHb.',
				'اربط نقص الامتصاص بالأحماض الأمينية (هزال ونمو) والحديد والغلوكوز (فقر دم ونقص تنفس خلوي وتعب).',
				'الحل الجوهري هو الحمية الخالية من الغلوتين (أرز، ذرة، بطاطا، خضر، لحوم) وأغذية غنية بالحديد.'
			],
			solutionStepsAr: [
				`تشخيص داء السيلياك بسبب الغلوتين (الوثيقتان 1 و 2).`,
				'ربط ضمور الزغابات بنقص الامتصاص ← هزال وتأخر نمو (أحماض أمينية) + فقر دم وتعب (حديد/Hb/غلوكوز/تنفس خلوي).',
				'تقديم 3 نصائح غذائية مبررة (حمية خالية من الغلوتين + بدائل + أغذية غنية بالحديد).'
			],
			finalAnswer: 'داء السيلياك (حساسية الغلوتين وضمور الزغابات) ← حمية خالية من الغلوتين'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. BEM Integration Situation 2 (8 pts): Adolescent Anemia & Fast-Food Imbalance
// ═══════════════════════════════════════════════════════════════════════════════
const integrationAnemiaDietBemTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4am_t1_integration_obesity_anemia_effort_bem',
	grade: '4am',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'وضعية إدماجية (نمط BEM): فقر الدم وسوء التغذية وأثرهما على الأداء العضلي والهضمي',
	curriculumLessonId: 'sci_lesson_4am_t1_nutritional_balance_diseases',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cases = [
			{ name: 'كريم', rbc: 3.1, hb: 9.0, o2Bound: 12 },
			{ name: 'سارة', rbc: 2.9, hb: 8.5, o2Bound: 11 }
		];
		const c = rng.pick(cases);
		const svgPlot = svgBioCurvePlot({
			title: 'الوثيقة 1: كمية ثنائي الأكسجين المنقولة بدلالة تركيز الهيموغلوبين',
			xMin: 6,
			xMax: 16,
			yMin: 0,
			yMax: 24,
			xStep: 2,
			yStep: 4,
			xLabel: 'الهيموغلوبين (g/dL)',
			yLabel: 'ثنائي الأكسجين (mL)',
			curves: [
				{
					fn: (x) => 1.34 * x,
					color: '#dc2626',
					label: 'ثنائي الأكسجين المنقول'
				}
			],
			points: [
				{ x: c.hb, y: c.o2Bound, label: `عند ${c.name}`, color: '#dc2626' },
				{ x: 15, y: 20.1, label: 'شخص سليم', color: '#15803d' }
			]
		});
		const imgPlot = saveSciencesSvgAsset(`sci_4am_t1_int2_anemia_${difficulty}_s${seed}`, svgPlot);

		const mcq = buildUniqueMcqOptions(
			`نقص الكريات الحمراء والهيموغلوبين (${c.hb} g/dL) يُقلّل نقل O₂ إلى العضلات فينخفض التنفس الخلوي وإنتاج الطاقة مما يسبب التعب السريع`,
			[
				{
					text: 'نقص الكريات الحمراء يزيد من سرعة نقل ثنائي الأكسجين للعضلات',
					diagnosticFeedback: 'تُظهر الوثيقة (1) تناسباً طردياً: كلما نقص الهيموغلوبين نقصت كمية $\\text{O}_2$ المنقولة.'
				},
				{
					text: 'الإمساك المزمن سببه الإكثار من تناول الخضر والفواكه والماء',
					diagnosticFeedback: 'العكس تماماً: الخضر والفواكه الغنية بألياف السيليلوز تقي من الإمساك، بينما الوجبات السريعة الفقيرة بالألياف تسببه.'
				},
				{
					text: 'المشروبات الغازية والبطاطا المقلية توفر كل الحديد اللازم للوقاية من فقر الدم',
					diagnosticFeedback: 'الوجبات السريعة فقيرة جداً بالحديد والفيتامينات والألياف وغنية بالسكريات والدهون غير الصحية.'
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
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: `أظهرت تحاليل ${c.name} نقص الكريات الحمراء ($${c.rbc}$ مليون/$\\text{mm}^3$) والهيموغلوبين ($${c.hb}\\text{ g/dL}$)، مع اعتماد يومي على الوجبات السريعة والحلويات. ما التفسير البيولوجي الدقيق لتعبه العضلي السريع؟`,
				questionTextAr: `فسّر سبب التعب العضلي السريع لدى ${c.name} انطلاقاً من الوثيقة (1):`,
				imageUrl: imgPlot,
				imageCaption: 'الوثيقة 1: علاقة الهيموغلوبين بكمية O₂ المنقولة',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نقص الهيموغلوبين (${c.hb} g/dL) قلّل كمية $\\text{O}_2$ المنقولة إلى $${c.o2Bound}\\text{ mL}$ فقط، مما أضعف **التنفس الخلوي** وإنتاج الطاقة في العضلات.`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `*السياق*: لاحظ أستاذ التربية البدنية أن التلميذ ${c.name} (السنة الرابعة متوسط) يعاني من لهثان وتعب عضلي شديد بعد بضع دقائق من الجري، وشحوب واضح في الوجه، كما يشتكي من إمساك متكرر. كشف استجواب التلميذ أنه لا يتناول فطور الصباح، ويعتمد يومياً على الوجبات السريعة (شطائر مقلية، رقائق البطاطا، مشروبات غازية) ويكره العدس والسبانخ والخضر. إليك نتائج فحوصاته الطبية في الوثيقتين الآتيتين:`,
				content: [
					{
						type: 'columns',
						widths: ['1.15fr', '1.1fr'],
						children: [
							{
								type: 'table',
								headers: ['المؤشر الدموي (الوثيقة 2)', `عند ${c.name}`, 'القيمة المرجعية'],
								cells: [],
								rows: [
									['عدد الكريات الحمراء', `${c.rbc} مليون/mm³`, '4.5 إلى 5.5 مليون/mm³'],
									['تركيز الهيموغلوبين (Hb)', `${c.hb} g/dL`, '12 إلى 16 g/dL'],
									['كمية O₂ في 100 mL دم', `${c.o2Bound} mL`, '20 mL'],
									['نسبة الحديد والألياف بغذائه', 'منخفضة جداً', 'متوازنة وكافية']
								],
								headerBackground: true,
								borders: 'grid',
								width: 'full'
							},
							{
								type: 'image',
								src: imgPlot,
								caption: 'الوثيقة 1: علاقة Hb بكمية O₂ المنقولة'
							}
						]
					},
					{
						type: 'text',
						content: `*التعليمات*: بالاعتماد على السياق والوثيقتين (1 و 2) ومكتسباتك القبلية:\n\n1) استخرج من الوثيقة (2) الخلل الدموي الذي يعاني منه ${c.name} وسمِّ هذه الحالة المرضية.`,
						answer: `1) *بالاعتماد على الوثيقة (2)*: نلاحظ انخفاضاً واضحاً في عدد *الكريات الدموية الحمراء* ($${c.rbc}$ مليون/$"mm"^3$ مقارنة بالمرجعي $4.5 - 5.5$) وانخفاضاً في تركيز *الهيموغلوبين* ($${c.hb} " g/dL"$ مقابل $12 - 16 " g/dL"$). يدل ذلك على إصابة ${c.name} بـ*فقر الدم (الأنيميا)* الناتج عن نقص عنصر الحديد في غذائه.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `2) قدّم تفسيراً علمياً دقيقاً لـ: (أ) التعب العضلي السريع واللهثان أثناء الجري، (ب) الإمساك المتكرر لدى ${c.name}.`,
						answer: `2) *بالاعتماد على السياق والوثيقتين (1 و 2) ومكتسباتي*:\n- (أ) *التعب السريع واللهثان*: وفق الوثيقة (1)، كلما نقص الهيموغلوبين نقصت كمية $upright("O")_2$ المنقولة في الدم (انخفضت عند ${c.name} إلى $${c.o2Bound} " mL"$ بدل $20 " mL"$). وبما أن الخلايا العضلية تحتاج إلى $upright("O")_2$ والغلوكوز للقيام بـ*التنفس الخلوي* وإنتاج الطاقة (خاصة مع إهمال فطور الصباح)، فإن نقصهما يؤدي إلى *ضعف إنتاج الطاقة* وظهور التعب السريع وزيادة وتيرة التنفس (اللهثان) لمحاولة التعويض.\n- (ب) *الإمساك المتكرر*: يعود إلى افتقار الوجبات السريعة لـ*ألياف السيليلوز* (الخضر والفواكه) الضرورية لتنشيط حركة الأمعاء وتسهيل طرح الفضلات.`,
						mark: '3.5'
					},
					{
						type: 'text',
						content: `3) قدّم لـ${c.name} *ثلاث نصائح سلوكية وتغذوية* مبرّرة لتصحيح توازنه الغذائي واستعادة لياقته البدنية.`,
						answer: `3) - *الإكثار من الأغذية الغنية بالحديد والبروتينات* (العدس، السبانخ، الكبد، اللحوم الحمراء، البقوليات) لرفع تركيب الهيموغلوبين وعلاج فقر الدم.\n- *الالتزام بوجبة فطور الصباح وتناول وجبات منتظمة ومتوازنة* لتزويد العضلات بالغلوكوز اللازم لإنتاج الطاقة أثناء النشاط.\n- *تناول الخضر والفواكه والماء بكثرة* (ألياف السيليلوز للوقاية من الإمساك) وتجنب الوجبات السريعة والمشروبات الغازية للوقاية من السمنة.`,
						mark: '2.5'
					}
				]
			},
			hints: [
				'استخرج الأرقام من الوثيقة (2) لتشخيص فقر الدم (نقص الكريات الحمراء والهيموغلوبين).',
				'اربط الوثيقة (1) بنقص O₂ الواصل للعضلة ← نقص التنفس الخلوي وإنتاج الطاقة ← تعب ولهثان.',
				'فسّر الإمساك بنقص ألياف السيليلوز في الوجبات السريعة، وقدّم 3 نصائح مطابقة للمشكل.'
			],
			solutionStepsAr: [
				`تشخيص فقر الدم من الوثيقة (2): كريات حمراء ${c.rbc} وHb = ${c.hb} g/dL.`,
				`ربط نقص Hb بنقص O₂ (${c.o2Bound} mL) ونقص التنفس الخلوي (تعب) ونقص السيليلوز (إمساك).`,
				'تقديم 3 نصائح غذائية مبررة (أغذية غنية بالحديد، فطور الصباح، خضر وألياف وترك الوجبات السريعة).'
			],
			finalAnswer: 'فقر الدم (نقص الحديد والهيموغلوبين) ← ضعف نقل O₂ والتنفس الخلوي'
		};
	}
};

export const SCIENCES_TEMPLATES_4AM_T1: SciencesParameterizedTemplate[] = [
	enzymeDigestionTemplate,
	villusAbsorptionTemplate,
	bloodTransportTemplate,
	respirationFermentationTemplate,
	integrationCeliacBemTemplate,
	integrationAnemiaDietBemTemplate
];
