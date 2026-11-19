import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import {
	saveSciencesSvgAsset,
	svgBioCurvePlot,
	svgCellUltrastructure,
	svgGeneticsDiagram,
	svgMolecularBiology
} from '../../svg-sciences';

// ============================================================================
// 4 Shared Parameterized ONEC Templates — 2AS Trimester 2 (SE & MATH Core)
// ============================================================================

// [0] Recall (5 pts): Cell ultrastructure (Eukaryote vs Prokaryote unity)
export const tpl2asSharedT2CellUltrastructureRecall: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2as_shared_t2_cell_ultrastructure_recall',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'cell_molecular',
	titleAr: 'وحدة الكائنات الحية: فوق بنية الخلية بالمجهر الإلكتروني (حقيقيات وبدائيات النوى)',
	curriculumLessonId: 'sci_lesson_2as_shared_t2_cell_ultrastructure',
	defaultPoints: 5,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const isPlant = rng.pick([true, false]);
		const svg = svgCellUltrastructure(isPlant ? 'plant' : 'animal', {
			numbered: true,
			title: isPlant ? 'رسم تخطيطي مرقّم لفوق بنية الخلية النباتية' : 'رسم تخطيطي مرقّم لفوق بنية الخلية الحيوانية'
		});
		const svgUrl = saveSciencesSvgAsset(`sci_2as_shared_t2_cell_${isPlant ? 'plant' : 'animal'}_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			'تشترك الخلية الحيوانية والنباتية والبكتيرية في المخطط الأساسي (غشاء هيولي + هيولى وريبوزومات + ADN)، وتنفرد حقيقيات النوى بالغلاف النووي والبنية الحجيرية',
			[
				{
					text: 'تمتلك البكتيريا غلافاً نووياً وميتوكوندريا وجهاز غولجي تماماً كالخلية الحيوانية',
					diagnosticFeedback: 'البكتيريا من بدائيات النوى: تفتقر للغلاف النووي وللعضيات الغشائية الحجيرية.'
				},
				{
					text: 'الخلية النباتية لا تحتوي على غشاء هيولي ولا ميتوكوندريا بل جدار سليلوزي فقط',
					diagnosticFeedback: 'للخلية النباتية غشاء هيولي تحت الجدار السليلوزي وميتوكوندريا للتنفس الخلوي.'
				},
				{
					text: 'الخلية البكتيرية خالية تماماً من المادة الوراثية الـ ADN',
					diagnosticFeedback: 'تمتلك البكتيريا صبغياً حلقياً من الـ ADN يسبح مباشرة في الهيولى.'
				}
			],
			rng
		);

		const labelsAnswer = isPlant
			? '1: جدار بكتوسليلوزي | 2: فجوة عصارية ضخمة | 3: نواة + نوية (محاطة بغلاف نووي) | 4: صانعة خضراء | 5: ميتوكوندري | 6: غشاء هيولي.'
			: '1: نواة محاطة بغلاف نووي (مقر الـ ADN) | 2: شبكة هيولية فعالة (محببة) | 3: غشاء هيولي | 4: جهاز غولجي | 5: ميتوكوندري | 6: ريبوزومات.';

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: `الوثيقة (1): رسم تخطيطي مرقّم لفوق بنية ${isPlant ? 'الخلية النباتية' : 'الخلية الحيوانية'} كما تظهر بالمجهر الإلكتروني`,
				width: 350
			},
			{
				type: 'text',
				content: `1) تعرّف على البيانات المرقمة من 1 إلى 6 في الوثيقة (1)، ثم قارن في ثلاث نقاط جوهرية بين هذه الخلية (حقيقية النواة) وخلية بكتيرية (بدائية النواة).`,
				answer: `1) البيانات والمقارنة:\n- البيانات: ${labelsAnswer}\n- المقارنة مع البكتيريا:\n  • الغلاف النووي: موجود في هذه الخلية (نواة حقيقية) وغائب في البكتيريا (مادة وراثية حرة في الهيولى).\n  • البنية الحجيرية: توجد عضيات غشائية متعددة (ميتوكوندري، غولجي...) وتغيب تماماً في البكتيريا.\n  • العناصر المشتركة: الغشاء الهيولي، الهيولى والريبوزومات، وجزيئة الـ $upright("ADN")$.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) اكتب نصاً علمياً مهيكلاً توضّح فيه كيف أثبتت الدراسات بالمجهر الإلكتروني أن الخلية تمثّل الوحدة البنيوية والوظيفية المشتركة لجميع الكائنات الحية رغم تنوعها (حيوانية، نباتية، وبكتيرية).`,
				answer: `2) النص العلمي المهيكل:\n- المقدمة والإشكالية: رغم التنوع الهائل للكائنات الحية من بكتيريا ونباتات وحيوانات، كشف المجهر الإلكتروني عن وحدة عميقة في بنائها الخلوي. فما أوجه التشابه والاختلاف في فوق بنية الخلايا التي تثبت وحدة العالم الحي؟\n- العرض: تتألف جميع الكائنات الحية من خلية واحدة أو أكثر، وتشترك كل الخلايا دون استثناء في مخطط تنظيمي موحد يشمل غشاءً هيولياً يحدّ هيولى غنية بالريبوزومات ومادة وراثية من طبيعة $upright("ADN")$. غير أن المجهر الإلكتروني يميز نمطين: **حقيقيات النوى** (حيوانية ونباتية) تمتاز بنواة محاطة بغلاف نووي وبنية حجيرية تضم عضيات غشائية متخصصة (ميتوكوندري للأكسدة، شبكة هيولية وغولجي للبروتين، وتنفرد النباتية بالجدار البكتوسليلوزي والصانعات الخضراء والفجوة الضخمة)، و**بدائيات النوى** (البكتيريا) التي تخلو من الغلاف النووي والعضيات الغشائية وتحتفظ بنفس العناصر الأساسية للحياة.\n- الخاتمة: يؤكد المخطط البنيوي المشترك بين حقيقيات وبدائيات النوى أن الخلية هي الوحدة البنيوية والوظيفية لكل الكائنات الحية.`,
				mark: '3.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: `بالاعتماد على فحص ${isPlant ? 'الخلية النباتية' : 'الخلية الحيوانية'} (الوثيقة 1) ومقارنتها بالخلية البكتيرية بالمجهر الإلكتروني، ما العبارة العلمية الدقيقة؟`,
				questionTextAr: 'اختر العبارة الصحيحة حول وحدة بناء الكائنات الحية:',
				imageUrl: svgUrl,
				imageCaption: isPlant ? 'فوق بنية الخلية النباتية' : 'فوق بنية الخلية الحيوانية',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'المخطط التنظيمي المشترك (غشاء هيولي + هيولى وريبوزومات + ADN) يوحّد كل الخلايا، بينما تختص حقيقيات النوى بالغلاف النووي والبنية الحجيرية.'
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `سمح المجهر الإلكتروني بدراسة دقيقة لفوق بنية الخلايا الحيوانية والنباتية والبكتيرية. تمثل الوثيقة (1) رسماً تخطيطياً لخلية حقيقية النواة.`,
				content
			},
			hints: [
				'فرّق بين العناصر المشتركة لكل الخلايا وبين الميزات الخاصة بحقيقيات النوى.',
				isPlant ? 'تذكّر أن الجدار السليلوزي والصانعات والفجوة الضخمة تميز الخلية النباتية.' : 'تذكّر دور الشبكة الهيولية المحببة وغولجي والميتوكوندري في الخلية الحيوانية.',
				'احرص في النص العلمي على المقارنة المنهجية بين حقيقيات النوى وبدائيات النوى.'
			],
			solutionStepsAr: [
				'تسمية البيانات الستة في الوثيقة (1).',
				'المقارنة البنيوية مع البكتيريا (بدائية النواة).',
				'تحرير النص العلمي المهيكل حول وحدة بناء الكائنات الحية.'
			],
			finalAnswer: 'مخطط موحد (غشاء هيولي + هيولى + ADN) وبنية حجيرية لحقيقيات النوى'
		};
	}
};

// [1] Reasoning (7 pts): DNA chemical composition, Chargaff ratios & hydrogen bonds
export const tpl2asSharedT2DnaChargaffReasoning: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2as_shared_t2_dna_chargaff_reasoning',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'cell_molecular',
	titleAr: 'الاستدلال العلمي: التركيب الكيميائي للـ ADN وقواعد شارغاف والروابط الهيدروجينية',
	curriculumLessonId: 'sci_lesson_2as_shared_t2_dna_structure_universality',
	defaultPoints: 7,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const pctA = rng.pick(difficulty === 'easy' ? [20, 30] : [22, 26, 28, 30]);
		const pctT = pctA;
		const pctC = 50 - pctA;
		const pctG = pctC;
		const totalNuc = rng.pick(difficulty === 'easy' ? [200, 400] : [300, 400, 500]);
		const countA = Math.round((totalNuc * pctA) / 100);
		const countC = Math.round((totalNuc * pctC) / 100);
		const hBonds = 2 * countA + 3 * countC;
		const atCgRatio = roundTo((pctA + pctT) / (pctC + pctG), 2);
		const lengthNm = roundTo((totalNuc / 2) * 0.34, 1);

		const svg = svgMolecularBiology('dna_double_helix', {
			title: 'نموذج واطسون وكريك للتكامل القاعدي والروابط الهيدروجينية'
		});
		const svgUrl = saveSciencesSvgAsset(`sci_2as_shared_t2_dna_helix_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$A = T = ${countA}$، $C = G = ${countC}$، وعدد الروابط الهيدروجينية $H = 2(${countA}) + 3(${countC}) = ${hBonds}$ رابطة`,
			[
				{
					text: `$A = T = ${countA}$، $C = G = ${countC}$، وعدد الروابط الهيدروجينية $H = ${2 * (countA + countC)}$ رابطة`,
					diagnosticFeedback: 'يرتبط زوج (C≡G) بثلاث روابط هيدروجينية وليس رابطتين!'
				},
				{
					text: `$A = T = ${countC}$، $C = G = ${countA}$، وعدد الروابط الهيدروجينية $H = ${2 * countC + 3 * countA}$ رابطة`,
					diagnosticFeedback: `نسبة الأدنين المعطاة هي ${pctA}% أي ${countA} نيكليوتيدة، ونسبة السيتوزين هي ${pctC}% أي ${countC} نيكليوتيدة.`
				},
				{
					text: `عدد الروابط الهيدروجينية يساوي $${hBonds * 2}$ رابطة هيدروجينية`,
					diagnosticFeedback: 'ضربت في عدد القواعد المفردة (A+T و C+G) بدلاً من عدد الأزواج القاعدية!'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (3.5 نقاط): تمثل الوثيقة (1) رسماً تخطيطياً لبنية قطعة من جزيئة الـ $upright("ADN")$، ويعرض الجدول النسب المئوية للقواعد الأزوتية عند ثلاثة كائنات حية مختلفة.`
			},
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): نموذج البنية اللولبية المزدوجة للـ ADN (واطسون وكريك)',
				width: 350
			},
			{
				type: 'table',
				headers: ['الكائن الحي', 'A (%)', 'T (%)', 'C (%)', 'G (%)', '(A+T)/(C+G)'],
				cells: [],
				rows: [
					['الكائن (س) — المدروس', `${pctA}`, '؟', '؟', '؟', '؟'],
					['الإنسان', '30.9', '29.4', '19.8', '19.9', '1.52'],
					['بكتيريا عصية القولون', '24.7', '23.6', '25.7', '26.0', '0.93']
				]
			},
			{
				type: 'text',
				content: `1) بالاعتماد على قواعد شارغاف والوثيقة (1)، أكمل السطر الأول من الجدول للكائن (س) بحساب نسب $T$ و $C$ و $G$ والنسبة $(A+T)/(C+G)$، ثم فسّر تساوي $A/T approx 1$ و $C/G approx 1$ واختلاف $(A+T)/(C+G)$ بين الأنواع.`,
				answer: `1) إكمال الجدول والتفسير:\n- بما أن $A = T$ و $C = G$ ومجموع النسب $100 "%"$: إذن $T = ${pctT} "%"$، و $C + G = 100 - ${2 * pctA} = ${2 * pctC} "%"$ ومنه $C = G = ${pctC} "%"$.\n- النسبة: $frac(A + T, C + G) = frac(${2 * pctA}, ${2 * pctC}) = ${atCgRatio}$.\n- التفسير: يتساوى $A$ مع $T$ و $C$ مع $G$ لأن جزيئة الـ $upright("ADN")$ مكونة من **سلسلتين متكاملتين** ($A$ يرتبط بـ $T$ برابطتين هيدروجينيتين و $C$ بـ $G$ بثلاث روابط). أما اختلاف $(A+T)/(C+G)$ فيؤكد أن تتابع ونسب الأزواج القاعدية **مميز لكل نوع حي** رغم وحدة بنية الـ $upright("ADN")$.`,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `2) ما مكونات النيكليوتيدة الواحدة (ناتج الإماهة الجزئية للـ $upright("ADN")$)؟`,
				answer: `2) تتكون النيكليوتيدة من اتحاد: حمض الفوسفوريك ($upright("H")_3 upright("PO")_4$) + سكر ريبوز منقوص الأكسجين ($upright("C")_5 upright("H")_10 upright("O")_4$) + قاعدة أزوتية واحدة ($A$ أو $T$ أو $C$ أو $G$).`,
				mark: '1.0'
			},
			{
				type: 'text',
				content: `الجزء الثاني (3.5 نقاط): نأخذ من الكائن (س) قطعة $upright("ADN")$ مزدوجة السلسلة يبلغ مجموع نيكليوتيداتها $${totalNuc}$ نيكليوتيدة (حيث نسبة $A = ${pctA} "%"$).`
			},
			{
				type: 'text',
				content: `1) احسب عدد نيكليوتيدات كل من $A, T, C, G$ في هذه القطعة، ثم احسب العدد الإجمالي للروابط الهيدروجينية $H$ التي تضمن تماسك السلسلتين وطول القطعة بالنانومتر (علماً أن المسافة بين زوجين متتاليين تساوي $0.34" nm"$).`,
				answer: `1) الحسابات الجزيئية:\n- عدد القواعد: $A = T = frac(${pctA}, 100) times ${totalNuc} = ${countA}$ نيكليوتيدة؛ $C = G = frac(${pctC}, 100) times ${totalNuc} = ${countC}$ نيكليوتيدة.\n- عدد أزواج $(A = T)$ هو $${countA}$ وعدد أزواج $(C equiv G)$ هو $${countC}$.\n- عدد الروابط الهيدروجينية: $H = 2(${countA}) + 3(${countC}) = ${2 * countA} + ${3 * countC} = ${hBonds}$ رابطة هيدروجينية.\n- طول القطعة: عدد الأزواج القاعدية $= ${totalNuc / 2}$ زوجاً، ومنه الطول $L = ${totalNuc / 2} times 0.34 = ${lengthNm}" nm"$.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) أي قطعتين من الـ $upright("ADN")$ متساويتين في الطول تحتاج درجة حرارة أعلى لفصل سلسلتيها: قطعة الإنسان أم قطعة بكتيريا عصية القولون؟ علّل إجابتك انطلاقاً من الجدول والوثيقة (1).`,
				answer: `2) الاستدلال الحراري:\n- تحتاج قطعة **بكتيريا عصية القولون** درجة حرارة أعلى لفصل سلسلتيها؛ لأن نسبة أزواج $(C + G)$ فيها أعلى ($51.7 "%"$ مقابل $39.7 "%"$ في الإنسان، أي نسبتها $(A+T)/(C+G) = 0.93$ أصغر).\n- وبما أن كل زوج $(C equiv G)$ يرتبط بـ **ثلاث روابط هيدروجينية** مقابل رابطتين فقط في $(A = T)$، فإن كثرة أزواج $C equiv G$ تزيد تماسك السلسلتين وثباتهما الحراري.`,
				mark: '1.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `قطعة $\\text{ADN}$ مزدوجة السلسلة تحتوي على $${totalNuc}$ نيكليوتيدة إجمالاً، منها $${pctA}\\%$ قواعد أدنين ($A$).\nما عدد كل قاعدة أزوتية وما العدد الإجمالي للروابط الهيدروجينية $H$ بين سلسلتيها؟`,
				questionTextAr: 'اختر الحساب الصحيح لعدد القواعد والروابط الهيدروجينية:',
				imageUrl: svgUrl,
				imageCaption: 'التكامل القاعدي والروابط الهيدروجينية في الـ ADN',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نحسب $A = T = ${countA}$ و $C = G = ${countC}$، فتكون الروابط الهيدروجينية $H = 2(${countA}) + 3(${countC}) = ${hBonds}$ رابطة.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `أثبتت التحاليل الكيميائية وأعمال شارغاف وواطسون وكريك التماثل البنيوي لجزيئة الـ $upright("ADN")$ لدى جميع الكائنات الحية. لدراسة خصائص هذه الجزيئة نستغل الوثيقة (1) والمعطيات الجدولية.`,
				content
			},
			hints: [
				'في الـ ADN المزدوج: $A = T$ و $C = G$ و $A + C = 50\\%$.',
				'عدد الروابط الهيدروجينية $H = 2 \\times (\\text{عدد } A) + 3 \\times (\\text{عدد } C)$.',
				'زيادة نسبة $(C+G)$ ترفع عدد الروابط الهيدروجينية فتزيد تماسك جزيئة الـ ADN.'
			],
			solutionStepsAr: [
				`استنتاج النسب المئوية: $T = ${pctT}\\%$، $C = G = ${pctC}\\%$، و $(A+T)/(C+G) = ${atCgRatio}$.`,
				`حساب $A=T=${countA}$، $C=G=${countC}$، الروابط الهيدروجينية $H = ${hBonds}$، والطول $${lengthNm}\\text{ nm}$.`,
				'تعليل ثباتية الـ ADN الغني بـ (C≡G) لوجود 3 روابط هيدروجينية.'
			],
			finalAnswer: `A=T=${countA}\\; ;\\; C=G=${countC}\\; ;\\; H=${hBonds}`
		};
	}
};

// [2] Reasoning (7 pts): Meiosis DNA curve Q_ADN(t) & genetic diversity calculation
export const tpl2asSharedT2MeiosisDnaCurveReasoning: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2as_shared_t2_meiosis_dna_curve_reasoning',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'reproduction_genetics',
	titleAr: 'الاستدلال العلمي: تغير كمية الـ ADN خلال الانقسام المنصف والإلقاح والتنوع البيولوجي',
	curriculumLessonId: 'sci_lesson_2as_shared_t2_meiosis_diversity',
	defaultPoints: 7,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const species = rng.pick([
			{ name: 'ذبابة الخل', twoN: 8, q: 4 },
			{ name: 'النبات البري', twoN: 6, q: 6 },
			{ name: 'الفأر المخبري', twoN: 10, q: 8 }
		]);
		const n = species.twoN / 2;
		const gametesCount = Math.pow(2, n);
		const zygotesCount = Math.pow(2, 2 * n);
		const q2 = species.q * 2;
		const qHalf = species.q / 2;

		const svg = svgBioCurvePlot({
			xMin: 0,
			xMax: 16,
			yMin: 0,
			yMax: q2 + 2,
			xStep: 2,
			yStep: qHalf,
			xLabel: 't (h)',
			yLabel: 'Q (pg)',
			title: 'تطور كمية المادة الوراثية أثناء تشكل الأمشاج والإلقاح',
			shadedZones: [
				{ x1: 0, x2: 6, fill: 'rgba(59,130,246,0.1)', label: 'الطور البيني', textColor: '#1d4ed8' },
				{ x1: 6, x2: 12, fill: 'rgba(124,58,237,0.1)', label: 'انقسام منصف', textColor: '#6d28d9' },
				{ x1: 12, x2: 16, fill: 'rgba(22,163,74,0.12)', label: 'الإلقاح', textColor: '#15803d' }
			],
			curves: [
				{
					fn: (t) => {
						if (t < 2) return species.q;
						if (t < 4.5) return species.q + ((t - 2) / 2.5) * species.q;
						if (t < 8.5) return q2;
						if (t < 9.0) return q2 - ((t - 8.5) / 0.5) * species.q;
						if (t < 11.0) return species.q;
						if (t < 11.5) return species.q - ((t - 11.0) / 0.5) * qHalf;
						if (t < 13.5) return qHalf;
						if (t < 14.0) return qHalf + ((t - 13.5) / 0.5) * qHalf;
						return species.q;
					},
					color: '#7c3aed',
					label: 'كمية الـ ADN'
				}
			],
			points: [
				{ x: 3.2, y: species.q * 1.5, label: 'تضاعف S', color: '#1d4ed8' },
				{ x: 8.75, y: species.q * 1.5, label: 'انفصالية I', color: '#dc2626' },
				{ x: 11.25, y: qHalf * 1.5, label: 'انفصالية II', color: '#b45309' },
				{ x: 14.8, y: species.q, label: 'بيضة ملقحة', color: '#15803d' }
			]
		});
		const svgUrl = saveSciencesSvgAsset(`sci_2as_shared_t2_meiosis_curve_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`يعطي الاختلاط بين الصبغي وحده $2^{${n}} = ${gametesCount}$ نمطاً للأمشاج (كمية الـ ADN بكل مشيج $${qHalf}\\text{ pg}$) و $2^{${species.twoN}} = ${zygotesCount}$ تركيبة محتملة للبيضة الملقحة`,
			[
				{
					text: `يعطي الاختلاط بين الصبغي $${species.twoN}$ أنماط فقط للأمشاج وكمية الـ ADN في المشيج تبقى $${species.q}\\text{ pg}$`,
					diagnosticFeedback: `عدد أنماط الأمشاج يساوي 2 أس n (${gametesCount})، وتنخفض كمية الـ ADN في المشيج إلى النصف (${qHalf} pg).`
				},
				{
					text: `ينخفض الـ ADN في الانفصالية I من $${q2}\\text{ pg}$ إلى $${qHalf}\\text{ pg}$ دفعة واحدة`,
					diagnosticFeedback: `ينخفض الـ ADN على مرحلتين: الانقسام I (${q2} → ${species.q} pg) ثم الانقسام II (${species.q} → ${qHalf} pg).`
				},
				{
					text: 'يحدث الاختلاط داخل الصبغي (العبور) خلال عملية الإلقاح فقط',
					diagnosticFeedback: 'يحدث العبور الصبغي خلال المرحلة التمهيدية I من الانقسام المنصف.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (3.5 نقاط): تمثل الوثيقة (1) تطور كمية الـ $upright("ADN")$ في نواة خلية تناسلية لكائن حي (${species.name}، صيغته الصبغية $2n = ${species.twoN}$) انطلاقاً من الطور البيني مروراً بتشكل الأمشاج وحتى تشكل البيضة الملقحة.`
			},
			{
				type: 'image',
				src: svgUrl,
				caption: `الوثيقة (1): منحنى تطور كمية الـ ADN أثناء الانقسام المنصف والإلقاح عند ${species.name}`,
				width: 360
			},
			{
				type: 'text',
				content: `1) حلّل المنحنى في الوثيقة (1) بربط كل تغير في كمية الـ $upright("ADN")$ ($${species.q} arrow.r ${q2} arrow.r ${species.q} arrow.r ${qHalf} arrow.r ${species.q}" pg"$) بالمرحلة الخلوية الموافقة وبحالة الصبغيات.`,
				answer: `1) التحليل وربط المراحل:\n- $[0-2" h"]$ ($G_1$): كمية الـ $upright("ADN") = ${species.q}" pg"$ ($2n = ${species.twoN}$ صبغياً أحادي الكروماتيد).\n- $[2-4.5" h"]$ (المرحلة $S$): تضاعف الكمية من $${species.q}$ إلى $${q2}" pg"$ (تحوّل الصبغيات إلى مضاعفة بكروماتيدين).\n- $[8.5-9" h"]$ (الانفصالية الأولى I): انخفاض من $${q2}$ إلى $${species.q}" pg"$ بسبب **افتراق الصبغيات المتماثلة المضاعفة** ($2n arrow.r n = ${n}$ صبغيات مضاعفة).\n- $[11-11.5" h"]$ (الانفصالية الثانية II): انخفاض ثانٍ من $${species.q}$ إلى $${qHalf}" pg"$ بسبب **انشطار الجزء المركزي وانفصال الكروماتيدات الشقيقة** ($n = ${n}$ صبغيات بسيطة في 4 أمشاج).\n- $[13.5-14" h"]$ (الإلقاح): ارتفاع من $${qHalf}$ إلى $${species.q}" pg"$ باندماج نواتي مشيجين ($n + n = 2n = ${species.twoN}$).`,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `2) استنتج كيف يضمن تعاقب الانقسام المنصف والإلقاح ثبات الصيغة الصبغية ($2n = ${species.twoN}$) للنوع عبر الأجيال.`,
				answer: `2) الاستنتاج: يختزل الانقسام المنصف العدد الصبغي وكمية الـ $upright("ADN")$ إلى النصف ($2n arrow.r n$ و $${species.q} arrow.r ${qHalf}" pg"$), ثم يعيد الإلقاح مضاعفتهما بالاندماج ($n + n arrow.r 2n$ و $${qHalf} + ${qHalf} = ${species.q}" pg"$), فيحافظ على ثبات النوع.`,
				mark: '1.0'
			},
			{
				type: 'text',
				content: `الجزء الثاني (3.5 نقاط): يولّد التكاثر الجنسي تنوعاً وراثياً هائلاً للأفراد داخل النوع نفسه (${species.name}، $2n = ${species.twoN}$).`
			},
			{
				type: 'text',
				content: `1) احسب عدد الأنماط الصبغية المختلفة للأمشاج الناتجة عن **الاختلاط بين الصبغي** وحده (دون عبور)، ثم احسب عدد التراكيب الوراثية الممكنة للبيوض الملقحة الناتجة عن الإلقاح العشوائي.`,
				answer: `1) حساب التنوع الوراثي:\n- عدد أزواج الصبغيات المتماثلة: $n = ${n}$.\n- عدد أنماط الأمشاج بالاختلاط بين الصبغي: $2^n = 2^${n} = ${gametesCount}$ مشيجاً مختلفاً.\n- عدد التراكيب الوراثية الممكنة للبيضة الملقحة: $2^n times 2^n = 2^(2n) = 2^${species.twoN} = ${zygotesCount}$ تركيبة وراثية مختلفة.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) بيّن كيف يضاعف **الاختلاط داخل الصبغي (العبور)** هذا التنوع الوراثي، محدداً بدقة المرحلة التي يحدث فيها ومآل الصبغيات الناتجة عنه.`,
				answer: `2) دور العبور الصبغي:\n- يحدث في **المرحلة التمهيدية I** عند اقتران كل زوج من الصبغيات المتماثلة (رباعيات) وتصالب الكروماتيدات غير الشقيقة وتبادل قطع كروماتيدية بينها.\n- ينتج عن ذلك **توليفات أليلية جديدة** على نفس الصبغي (لم تكن موجودة عند الأبوين)، مما يرفع عدد أنماط الأمشاج إلى ما يفوق بكثير $${gametesCount}$ ويدعم التفرد الوراثي لكل فرد.`,
				mark: '1.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `في ${species.name} ($2n = ${species.twoN}$ وكمية الـ $\\text{ADN}$ في $G_1$ هي $${species.q}\\text{ pg}$)، ما عدد أنماط الأمشاج الممكنة بالاختلاط بين الصبغي وحده، وما كمية الـ $\\text{ADN}$ في كل مشيج، وما عدد التراكيب الممكنة للبيضة الملقحة؟`,
				questionTextAr: 'اختر القيم الصحيحة من منحنى الوثيقة (1):',
				imageUrl: svgUrl,
				imageCaption: 'تطور كمية الـ ADN أثناء الانقسام المنصف والإلقاح',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `بما أن $n = ${n}$، يعطي الاختلاط بين الصبغي $2^{${n}} = ${gametesCount}$ نمطاً للأمشاج (بكل مشيج $${qHalf}\\text{ pg}$ من الـ $\\text{ADN}$)، ويعطي الإلقاح $2^{${species.twoN}} = ${zygotesCount}$ تركيبة ممكنة.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يسمح التكاثر الجنسي بالحفاظ على ثبات الصيغة الصبغية للنوع مع إنتاج تنوع بيولوجي واسع للأفراد. لدراسة آليات ذلك نعتمد على منحنى الوثيقة (1) الخاص بـ ${species.name} ($2n = ${species.twoN}$).`,
				content
			},
			hints: [
				`انتبه للهبوطين المتتاليين في المنحنى: الانفصالية I ($${q2} \\rightarrow ${species.q}$) والانفصالية II ($${species.q} \\rightarrow ${qHalf}$).`,
				'عدد أنماط الأمشاج = $2^n$ وعدد البيوض الملقحة = $2^{2n}$.',
				'الاختلاط داخل الصبغي = العبور في التمهيدية I؛ والاختلاط بين الصبغي = الافتراق المستقل في الانفصالية I.'
			],
			solutionStepsAr: [
				`تحليل منحنى $Q_{\\text{ADN}}(t)$ عبر $G_1 \\rightarrow S \\rightarrow \\text{I} \\rightarrow \\text{II} \\rightarrow \\text{إلقاح}$.`,
				`حساب $2^{${n}} = ${gametesCount}$ مشيجاً و $2^{${species.twoN}} = ${zygotesCount}$ بيضة ملقحة.`,
				'توضيح أثر العبور الصبغي في التمهيدية I على مضاعفة التنوع.'
			],
			finalAnswer: `2^{${n}} = ${gametesCount}\\text{ أمشاج } (${qHalf}\\text{ pg})\\; ;\\; 2^{${species.twoN}} = ${zygotesCount}\\text{ تراكيب}`
		};
	}
};

// [3] Scientific Approach (8 pts): Proving Semi-Conservative DNA Replication (Meselson & Stahl)
export const tpl2asSharedT2ReplicationApproach: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2as_shared_t2_replication_approach',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'cell_molecular',
	titleAr: 'المسعى العلمي: إثبات آلية التضاعف نصف المحافظ للـ ADN (تجربة ميسلسون وستال)',
	curriculumLessonId: 'sci_lesson_2as_shared_t2_dna_replication',
	defaultPoints: 8,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const genK = rng.pick(difficulty === 'easy' ? [3, 4] : [3, 4, 5]);
		const totalMols = Math.pow(2, genK);
		const hybridPct = roundTo((2 / totalMols) * 100, 2);
		const lightPct = roundTo(100 - hybridPct, 2);
		const templateSeq = rng.pick(['5\'-ATG CCA GTA-3\'', '5\'-TAC GGC ATG-3\'', '5\'-GCT AAG CTA-3\'']);
		const compMap: Record<string, string> = { A: 'T', T: 'A', C: 'G', G: 'C' };
		const coreBases = templateSeq.slice(3, -3);
		const compSeq =
			'3\'-' +
			coreBases
				.split('')
				.map((ch) => compMap[ch] ?? ch)
				.join('') +
			'-5\'';

		const svg = svgBioCurvePlot({
			xMin: 0,
			xMax: 24,
			yMin: 0,
			yMax: 2.5,
			xStep: 4,
			yStep: 0.5,
			xLabel: 't (h)',
			yLabel: 'Q (u.a)',
			title: 'تطور كمية المادة الوراثية خلال دورة خلوية (الطور البيني والانقسام)',
			shadedZones: [
				{ x1: 0, x2: 6, fill: 'rgba(148,163,184,0.12)', label: 'G1', textColor: '#334155' },
				{ x1: 6, x2: 14, fill: 'rgba(37,99,235,0.12)', label: 'المرحلة S', textColor: '#1d4ed8' },
				{ x1: 18, x2: 22, fill: 'rgba(220,38,38,0.12)', label: 'انقسام M', textColor: '#dc2626' }
			],
			curves: [
				{
					fn: (t) => {
						if (t < 6) return 1.0;
						if (t < 14) return 1.0 + (t - 6) / 8;
						if (t < 20.5) return 2.0;
						if (t < 21.2) return 2.0 - (t - 20.5) / 0.7;
						return 1.0;
					},
					color: '#1d4ed8',
					label: 'كمية الـ ADN'
				}
			],
			points: [
				{ x: 10, y: 1.5, label: 'عيون التضاعف', color: '#1d4ed8' },
				{ x: 20.8, y: 1.5, label: 'انفصالية', color: '#dc2626' }
			]
		});
		const svgUrl = saveSciencesSvgAsset(`sci_2as_shared_t2_repl_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`التضاعف نصف محافظ؛ وفي الجيل $G_${genK}$ تكون النسبة $${hybridPct}\\%$ هجينة ($^{15}\\text{N}/^{14}\\text{N}$) و $${lightPct}\\%$ خفيفة ($^{14}\\text{N}/^{14}\\text{N}$)`,
			[
				{
					text: `التضاعف محافظ؛ وفي الجيل $G_${genK}$ تظهر $50\\%$ جزيئات ثقيلة ($^{15}\\text{N}/^{15}\\text{N}$) و $50\\%$ خفيفة`,
					diagnosticFeedback: 'اختفاء الشريط الثقيل تماماً في G₁ (100% هجين) يدحض النموذج المحافظ.'
				},
				{
					text: `في الجيل $G_${genK}$ تصبح $100\\%$ من الجزيئات هجينة دون ظهور أي شريط خفيف`,
					diagnosticFeedback: 'بقاء 100% هجين في كل الأجيال كان سيعني تضاعفاً تشتتياً؛ لكن في G₂ ظهر 50% خفيف.'
				},
				{
					text: `تختفي الجزيئات الهجينة كلياً ($0\\%$) ابتداءً من الجيل الثاني $G_2$`,
					diagnosticFeedback: 'يبقى دائماً جزيئان هجينان يحملان السلسلتين الأصليتين الثقيلتين، فنسبتهما في الجيل ' + genK + ' هي ' + hybridPct + '%.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (2.5 نقطتان): يُظهر منحنى الوثيقة (1) تضاعف كمية الـ $upright("ADN")$ في النواة من $q$ إلى $2q$ خلال المرحلة $S$ من الطور البيني قبل كل انقسام خيطي متساوٍ.`
			},
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): تطور كمية الـ ADN خلال دورة خلوية كاملة',
				width: 360
			},
			{
				type: 'text',
				content: `1) حلّل المنحنى في الوثيقة (1) محدّداً بدقة توقيت تضاعف الـ $upright("ADN")$، ثم اطرح المشكل العلمي حول آلية تشكل الجزيئتين البنتين انطلاقاً من الجزيئة الأم.`,
				answer: `1) التحليل والمشكل:\n- التحليل: تكون كمية الـ $upright("ADN")$ ثابتة عند $1" u.a"$ في $G_1$ ($0-6" h"$), ثم تتضاعف تدريجياً إلى $2" u.a"$ خلال المرحلة $S$ ($6-14" h"$), وتثبت في $G_2$ ($14-18" h"$), ثم تنقسم إلى النصف في انفصالية الانقسام الخيطي ($20.5-21.2" h"$).\n- المشكل العلمي: وفق أي آلية جزيئية تتضاعف جزيئة الـ $upright("ADN")$ الأم لتعطي جزيئتين بنتين متماثلتين خلال المرحلة $S$؟`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `2) اقترح فرضيتين (نموذجين) تفسّران كيفية توزيع سلسلتي الـ $upright("ADN")$ الأم بين الجزيئتين البنتين.`,
				answer: `2) الفرضيتان:\n- الفرضية 1 (النموذج نصف المحافظ): تنفصل سلسلتا الجزيئة الأم وتعمل كل سلسلة كقالب لبناء سلسلة جديدة مكملة، فتحتوي كل جزيئة بنت سلسلة قديمة وأخرى جديدة.\n- الفرضية 2 (النموذج المحافظ): تبقى الجزيئة الأم سليمة كما هي وتُصنع جزيئة بنت كاملة من سلسلتين جديدتين.`,
				mark: '1.0'
			},
			{
				type: 'text',
				content: `الجزء الثاني (3.5 نقاط): للتحقق من الفرضيتين، أجرى العالمان ميسلسون وستال تجربة وسم الـ $upright("ADN")$ بالآزوت الثقيل $""^15 upright("N")$ (كثافة $1.724$) ثم نقل البكتيريا إلى وسط عادي به آزوت خفيف $""^14 upright("N")$ (كثافة $1.710$) والطرد المركزي، فحَصلا على نتائج الجدول:`
			},
			{
				type: 'table',
				headers: ['الجيل البكتيري في الوسط الخفيف ¹⁴N', 'أشرطة الـ ADN المحصل عليها بالطرد المركزي', 'الكثافة والنسب'],
				cells: [],
				rows: [
					['G₀ (شاهد في ¹⁵N)', 'شريط واحد سفلي (ثقيل)', '100% ثقيل (1.724)'],
					['G₁ (بعد انقسام واحد)', 'شريط واحد وسطي (هجين)', '100% هجين (1.717)'],
					['G₂ (بعد انقسامين)', 'شريط وسطي (هجين) + شريط علوي (خفيف)', '50% هجين + 50% خفيف']
				]
			},
			{
				type: 'text',
				content: `1) استغل نتائج الجيلين $G_1$ و $G_2$ في الجدول لدحض إحدى الفرضيتين والمصادقة على الفرضية الصحيحة.`,
				answer: `1) الاستغلال والمصادقة:\n- في الجيل $G_1$: ظهور شريط وسطي وحيد ($100 "%"$ هجين بكثافة $1.717$) مع **الاختفاء التام للشريط الثقيل** يدحض الفرضية (2) (النموذج المحافظ الذي كان سيعطي $50 "%"$ ثقيلاً و $50 "%"$ خفيفاً).\n- في الجيل $G_2$: ظهور $50 "%"$ هجين و $50 "%"$ خفيف يؤكد انفصال السلسلتين وتكوين سلسلة خفيفة جديدة أمام كل سلسلة قديمة أو جديدة.\n- وعليه **نصادق على الفرضية (1): التضاعف نصف المحافظ للـ $upright("ADN")$**.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) احسب النسبة النظرية للجزيئات الهجينة والجزيئات الخفيفة في الجيل $G_${genK}$ (بعد $${genK}$ انقسامات في الوسط الخفيف)، ثم اكتب السلسلة الجديدة المكملة التي يبنيها إنزيم الـ $upright("ADN")$ بوليميراز أمام السلسلة القالب: ${templateSeq}.`,
				answer: `2) التنبؤ الكمي وبناء السلسلة المكملة:\n- في الجيل $G_${genK}$: يوجد $2^${genK} = ${totalMols}$ جزيئة، منها دائماً جزيئتان هجينتان فقط؛ فتكون نسبة الهجينة $frac(2, ${totalMols}) times 100 = ${hybridPct} "%"$ ونسبة الخفيفة $${lightPct} "%"$.\n- السلسلة المكملة التي يبنيها إنزيم الـ $upright("ADN")$ بوليميراز: ${compSeq}.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثالث (2.0 نقطتان): أنجز مخططاً تحصيلياً يوضح آلية تضاعف قطعة الـ $upright("ADN")$ على مستوى عين التضاعف خلال المرحلة $S$ وصولاً إلى تشكل كروماتيدين متماثلين.`,
				answer: `الجزء الثالث — المخطط التحصيلي:\n[جزيئة ADN أم في G₁ (سلسلتان متكاملتان)] --(انفتاح الروابط الهيدروجينية وتشكل عيون تضاعف في S)--> [سلسلتان أصليتان منفصلتان تعملان كقالبين] --(تدخل إنزيم ADN بوليميراز وربط نيكليوتيدات حرة بالتكامل A=T و C≡G)--> [جزيئتان بنتان متماثلتان تماماً (كل منهما سلسلة قديمة + سلسلة جديدة = تضاعف نصف محافظ)] $arrow.r$ [صبغي مضاعف بكروماتيدين متماثلين جاهز للانقسام].`,
				mark: '2.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'scientific_approach',
			quizQuestion: {
				type: 'mcq',
				questionText: `في تجربة ميسلسون وستال (نقل بكتيريا ذات $\\text{ADN}$ ثقيل $^{15}\\text{N}$ إلى وسط خفيف $^{14}\\text{N}$)، ظهرت $100\\%$ جزيئات هجينة في $G_1$ و $50\\%$ هجينة $+ 50\\%$ خفيفة في $G_2$.\nما نموذج التضاعف المصادق عليه، وما النسبتان في الجيل $G_${genK}$؟`,
				questionTextAr: 'اختر الإجابة المصادق عليها علمياً وحسابياً:',
				imageUrl: svgUrl,
				imageCaption: 'تطور كمية الـ ADN خلال الدورة الخلوية',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `أثبتت النتائج التضاعف نصف المحافظ؛ وفي الجيل $G_${genK}$ تتكون $2^{${genK}} = ${totalMols}$ جزيئة منها جزيئتان هجينتان دائماً ($${hybridPct}\\%$) و $${totalMols - 2}$ خفيفة ($${lightPct}\\%$).`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يُعدّ تضاعف الـ $upright("ADN")$ خلال الطور البيني شرطاً أساسياً لنقل المعلومة الوراثية كاملة ومتماثلة إلى الخلايا البنت. لإثبات آلية هذا التضاعف ندرس الوثيقة (1) وتجربة ميسلسون وستال.`,
				content
			},
			hints: [
				'ظهور 100% هجين في G₁ يُسقط فوراً النموذج المحافظ.',
				`في الجيل $G_k$ تبقى جزيئتان هجينتان فقط من أصل $2^k$، أي بنسبة $\\frac{2}{2^k} \\times 100$.`,
				'تذكّر أن إنزيم الـ ADN بوليميراز يبني سلسلة منقوصة الأكسجين تحوي T مقابل A (لا U!).'
			],
			solutionStepsAr: [
				'تحليل منحنى الدورة الخلوية وتحديد المرحلة S ثم صياغة المشكل والفرضيتين.',
				'استغلال نتائج G₁ و G₂ للمصادقة على التضاعف نصف المحافظ.',
				`حساب النسب في $G_${genK}$ ($${hybridPct}\\%$ هجين، $${lightPct}\\%$ خفيف) وكتابة السلسلة المكملة والمخطط التحصيلي.`
			],
			finalAnswer: `\\text{نصف محافظ } ;\\; G_${genK}: ${hybridPct}\\%\\text{ هجين } /\\; ${lightPct}\\%\\text{ خفيف}`
		};
	}
};

export const SHARED_SCIENCES_TEMPLATES_2AS_T2: SciencesParameterizedTemplate[] = [
	tpl2asSharedT2CellUltrastructureRecall,
	tpl2asSharedT2DnaChargaffReasoning,
	tpl2asSharedT2MeiosisDnaCurveReasoning,
	tpl2asSharedT2ReplicationApproach
];
