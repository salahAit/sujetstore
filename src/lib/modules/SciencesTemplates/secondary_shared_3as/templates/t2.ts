import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import {
	saveSciencesSvgAsset,
	svgBioCurvePlot,
	svgBioFlowchart,
	svgCellUltrastructure,
	svgImmunologyDiagram,
	svgMolecularBiology
} from '../../svg-sciences';
import type {
	Difficulty,
	QuizQuestionPayload,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate,
	SciencesSecondaryTrackId
} from '../../types';

type TrackTag = SciencesSecondaryTrackId | '3as_shared';

function makeTrackMeta(track: TrackTag) {
	const grade: SciencesSecondaryTrackId = track === '3as_shared' ? '3as_se' : track;
	const isMath = track === '3as_math';
	const lessonPrefix = `sci_lesson_${track === '3as_shared' ? '3as_shared' : track}`;
	return { grade, isMath, lessonPrefix };
}

/**
 * Shared Domain 1 Templates — T2 (Units 4 & 5: Immunology & Neurobiology)
 * Used in full (6 templates: 2 recall [5pt] + 2 reasoning [7pt] + 2 approach [8pt]) by 3AS SE T2,
 * and selectively adapted with official 8pt/12pt BAC MATH weights by 3AS MATH T2 (Immunology) & T3 (Neurobiology).
 */
export function createSharedSciencesTemplates3asT2(
	track: TrackTag = '3as_shared'
): SciencesParameterizedTemplate[] {
	const { grade, isMath, lessonPrefix } = makeTrackMeta(track);

	// ─────────────────────────────────────────────────────────────────────────
	// 1. RECALL (5 pts SE / 8 pts MATH): Antibody Structure, Immune Complex & Ouchterlony
	// ─────────────────────────────────────────────────────────────────────────
	const tplRecallAntibody: SciencesParameterizedTemplate = {
		id: 'sci_tpl_3as_shared_t2_recall_antibody_ouchterlony',
		grade,
		trimesterId: 't2',
		domain: 'immunology',
		titleAr: 'استرجاع منظم: بنية الجسم المضاد، المعقد المناعي، واختبار أوشتيرلوني (+ نص علمي)',
		curriculumLessonId: `${lessonPrefix}_t2_humoral_antibodies`,
		defaultPoints: isMath ? 8 : 5,
		onecRole: 'recall',
		generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const antigens = [
				{ agA: 'الألبومين البقري (SAB)', agB: 'غلوبيولين الماعز', agC: 'ألبومين بقري نقي' },
				{ agA: 'التوكسين الكزازي (أناتوكسين)', agB: 'التوكسين الخناقي', agC: 'توكسين كزازي مخفف' },
				{ agA: 'بروتين سطحي بكتيري X', agB: 'بروتين سطحي بكتيري Y', agC: 'مستخلص بكتيري حاوٍ على X' }
			];
			const ag = rng.pick(antigens);

			const abSvg = svgImmunologyDiagram('antibody_complex', {
				numbered: true,
				title: 'رسم تخطيطي مرقم لبنية الجسم المضاد'
			});
			const ouchSvg = svgImmunologyDiagram('ouchterlony', {
				title: 'نتائج اختبار الانتشار المناعي'
			});
			const abUrl = saveSciencesSvgAsset(`sci_${track}_t2_ab_struct_${difficulty}_s${seed}`, abSvg);
			const ouchUrl = saveSciencesSvgAsset(`sci_${track}_t2_ouch_${difficulty}_s${seed}`, ouchSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = 'المنطقتان المتغيرتان في نهايتي السلسلتين الثقيلة والخفيفة';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'المنطقة الثابتة للسلسلتين الثقيلتين (الجزء Fc)', diagnosticFeedback: 'الجزء الثابت Fc مخصص للتثبت على مستقبلات البالعة الكبيرة وليس على المستضد.' },
						{ text: 'الجسور ثنائية الكبريت الوسطى فقط', diagnosticFeedback: 'الجسور الكبريتية تربط السلاسل ببعضها ولا ترتبط بالمستضد.' },
						{ text: 'السلسلتان الخفيفتان في منطقتهما الثابتة', diagnosticFeedback: 'موقع تثبيت المستضد يتشكل حصراً في المنطقتين المتغيرتين.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: 'اعتماداً على الوثيقة المرقمة لبنية الجسم المضاد (غلوبيولين مناعي)، أين يقع موقعا تثبيت المحدد المستضدي؟',
					questionTextAr: 'حدد موقع تثبيت المحدد المستضدي على الجسم المضاد:',
					imageUrl: abUrl,
					imageCaption: 'بنية الجسم المضاد وتشكيل المعقد المناعي',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: 'يتشكل موقعا تثبيت المحدد المستضدي في المنطقتين المتغيرتين للنهايتين الأمينيتين للسلسلتين الثقيلة والخفيفة مما يمنح الجسم المضاد نوعيته العالية.'
				};
			} else if (difficulty === 'medium') {
				finalAnswer = 'إبطال مفعول المستضد ومنع انتشاره ثم تسهيل بلعمته عبر البالعات الكبيرة';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'إفراز البرفورين لثقب غشاء البكتيريا مباشرة', diagnosticFeedback: 'إفراز البرفورين هو آلية الخلية اللمفاوية LTc في المناعة الخلوية.' },
						{ text: 'تحليل الـ ADN الخاص بالمستضد داخل البلازما', diagnosticFeedback: 'الجسم المضاد ليس إنزيماً حالّاً للـ ADN.' },
						{ text: 'تحويل المستضد إلى خلية بلازمية', diagnosticFeedback: 'الخلية البلازمية تنتج عن تمايز LB وليس عن المستضد.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في اختبار أوشتيرلوني، يدل ظهور قوس ترسيب بين المصل والمستضد A (${ag.agA}) على تشكل معقد مناعي. ما الدور الفيزيولوجي للمعقد المناعي داخل العضوية؟`,
					questionTextAr: 'اختر الدور الحقيقي للمعقد المناعي:',
					imageUrl: ouchUrl,
					imageCaption: 'اختبار أوشتيرلوني للانتشار المناعي',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: 'المعقد المناعي يبطل مفعول المستضد ويمنع انتشاره، ثم يُتخلص منه نهائياً بالبلعمة بفضل تثبت الجزء الثابت Fc على مستقبلات البالعة الكبيرة.'
				};
			} else {
				finalAnswer = '4 سلاسل (ثقيلتان H وخفيفتان L) مرتبطة بجسور ثنائية الكبريت — بنية رابعية';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'سلسلة ببتيدية واحدة ذات بنية ثالثية', diagnosticFeedback: 'الجسم المضاد يتكون من أربع سلاسل ببتيدية (بنية رابعية).' },
						{ text: 'سلسلتان فقط من النيكليوتيدات (ADN)', diagnosticFeedback: 'الأجسام المضادة غليكوبروتينات وليست أحماضاً نووية.' },
						{ text: 'ست سلاسل بدون جسور ثنائية الكبريت', diagnosticFeedback: 'الجسور الكبريتية أساسية لربط السلسلتين الثقيلتين ببعضهما وبكل سلسلة خفيفة.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: 'ما مستوى البنية الفراغية للجسم المضاد وما تركيبه السلسلي الدقيق؟',
					questionTextAr: 'اختر الوصف البنيوي الدقيق للجسم المضاد:',
					imageUrl: abUrl,
					imageCaption: 'السلاسل الببتيدية والجسور الكبريتية في الجسم المضاد',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: 'يتألف الجسم المضاد من 4 سلاسل ببتيدية (سلسلتين ثقيلتين وسلسلتين خفيفتين) مثبتة بجسور ثنائية الكبريت، مما يمنحه بنية رابعية على شكل Y.'
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `تتدخل في الاستجابة المناعية النوعية ذات الوساطة الخلطية جزيئات بروتينية متخصصة تُدعى الأجسام المضادة. تُمثّل الوثيقة (1) رسماً تخطيطياً مرقماً لبنية الجسم المضاد، بينما تبيّن الوثيقة (2) نتائج اختبار أوشتيرلوني لمصل فأر محصَّن ضد **${ag.agA}** موضوع في الحفرة المركزية مقابل الحفر المحيطية: A (**${ag.agA}**)، B (**${ag.agB}**)، و C (**${ag.agC}**).`,
				content: [
					{
						type: 'columns',
						widths: ['1fr', '1fr'],
						children: [
							{ type: 'image', src: abUrl, caption: 'الوثيقة (1): رسم تخطيطي مرقم لبنية الجسم المضاد' },
							{ type: 'image', src: ouchUrl, caption: 'الوثيقة (2): نتائج اختبار أوشتيرلوني' }
						]
					},
					{
						type: 'text',
						content: `1) تعرّف على البيانات المرقمة (1 إلى 6) في الوثيقة (1)، ثم فسّر نتائج اختبار أوشتيرلوني في الوثيقة (2) واستخلص الخاصية الأساسية للأجسام المضادة.`,
						answer: `1) **البيانات**: (1) محدد مستضدي، (2) سلسلة خفيفة، (3) موقع التثبيت على مستقبلات البالعة الكبيرة، (4) منطقة متغيرة (موقع تثبيت المستضد)، (5) سلسلة ثقيلة + جسور ثنائية الكبريت، (6) منطقة ثابتة.\n- **تفسير أوشتيرلوني**: ظهور قوسي ترسيب مع A و C يدل على تشكل معقدات مناعية غير ذائبة لتكامل موقع التثبيت المتغير مع محددات ${ag.agA}؛ وغياب القوس مع B (${ag.agB}) لعدم وجود تكامل بنيوي.\n- **الاستنتاج**: تمتاز الأجسام المضادة بـ **النوعية العالية** تجاه المستضد الذي حرض إنتاجها.`,
						mark: isMath ? '3' : '2'
					},
					{
						type: 'text',
						content: `2) باستغلال الوثيقتين ومكتسباتك، اكتب **نصاً علمياً مهيكلاً** تشرح فيه منشأ الأجسام المضادة، مراحل الاستجابة الخلطية المنتجة لها (من الانتقاء النسيلي إلى البلاسموسيت)، وآلية التخلص النهائي من المستضد.`,
						answer: `2) **نص علمي مهيكل**:\n- **المقدمة والإشكالية**: تُقصي العضوية المستضدات خارج-خلوية عبر استجابة مناعية خلطية تتوج بإنتاج أجسام مضادة نوعية. فكيف تنشأ الخلايا المنتجة للأجسام المضادة وكيف تُبطل هذه الأخيرة مفعول المستضد وتُقصيه؟\n- **العرض**: تنشأ اللمفاويات $upright("LB")$ وتنضج في نخاع العظم الأحمر مكتسبةً مستقبلات غشائية ($upright("BCR")$). عند دخول المستضد، ينتقي اللمة الوحيدة من $upright("LB")$ ذات الـ $upright("BCR")$ المتكامل بنيوياً مع محدداته (**الانتقاء النسيلي**). وبفضل تحفيز الأنترلوكين $upright("IL-2")$ المفرز من $upright("LTh")$، تتكاثر لمة $upright("LB")$ المنتقاة وتتمايز إلى خلايا ذاكرة ($upright("LB")_m$) وإلى **خلايا بلازمية (بلاسموسيت)** غنية بالشبكة الهيولية المحببة وجهاز غولجي لتفرز كميات كبيرة من الأجسام المضادة السارية في المصل. ترتبط الأجسام المضادة نوعياً بالمستضد عبر منطقتيها المتغيرتين مشكلةً **معقداً مناعياً** يبطل مفعول المستضد ويمنع انتشاره، ثم يتثبت الجزء الثابت ($upright("Fc")$) على مستقبلات غشائية للبالعات الكبيرة مما يسرّع بلعمته وهضمه بالليزوزومات.\n- **الخاتمة**: يضمن التكامل البنيوي بين المستضد والـ $upright("BCR")$ ثم الجسم المضاد، وبالتعاون مع البالعات الكبيرة، إقصاءً نوعياً وفعالاً للمستضدات.`,
						mark: isMath ? '5' : '3'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't2',
				difficulty,
				domain: 'immunology',
				titleAr: this.titleAr,
				onecRole: 'recall',
				quizQuestion,
				sujetExercise,
				hints: [
					'تأكد من التمييز بين المنطقة المتغيرة (تثبيت المستضد) والمنطقة الثابتة (تثبيت على البالعة).',
					'أقواس الترسيب في أوشتيرلوني هي معقدات مناعية تثبت النوعية العالية للأجسام المضادة.',
					'في النص العلمي: لا تنسَ دور الانتقاء النسيلي، IL-2، البلاسموسيت، وتسهيل البلعمة.'
				],
				solutionStepsAr: [
					'البيانات 1-6 لبنية الجسم المضاد الرابعية (2H + 2L + جسور S-S).',
					'تفسير أوشتيرلوني: تكامل بنيوي مع A و C ← قوس ترسيب؛ غياب التكامل مع B.',
					'نص علمي مهيكل يشمل منشأ LB، الانتقاء النسيلي، التمايز لبلاسموسيت، المعقد المناعي والبلعمة.'
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 2. REASONING (7 pts SE) / SCIENTIFIC APPROACH (12 pts MATH):
	//    Immune Cooperation (CPA – LT4 – IL-2) & HIV Targeting of LT4
	// ─────────────────────────────────────────────────────────────────────────
	const tplCoopHiv: SciencesParameterizedTemplate = {
		id: 'sci_tpl_3as_shared_t2_reasoning_coop_hiv_lt4',
		grade,
		trimesterId: 't2',
		domain: 'immunology',
		titleAr: isMath
			? 'مسعى علمي: التعاون المناعي وآلية استهداف فيروس VIH للخلايا LT4 والعجز المناعي'
			: 'استدلال علمي: التعاون المناعي (IL-2) وتطور العدوى بفيروس فقدان المناعة المكتسبة VIH',
		curriculumLessonId: `${lessonPrefix}_t2_cellular_hiv_coop`,
		defaultPoints: isMath ? 12 : 7,
		onecRole: isMath ? 'scientific_approach' : 'reasoning',
		generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const lt4Init = rng.pick([950, 1000, 1100]);
			const yrSida = rng.pick([7, 8, 9]);
			const dropRate = roundTo((lt4Init - 180) / yrSida, 1);

			const hivCurve = svgBioCurvePlot({
				title: 'تطور الشحنة الفيروسية والخلايا التائية بمرور السنوات',
				xMin: 0,
				xMax: 10,
				yMin: 0,
				yMax: 1200,
				xStep: 2,
				yStep: 200,
				xLabel: 't (ans)',
				yLabel: 'LT4 (/mm3)',
				shadedZones: [
					{ x1: 0, x2: 1.0, fill: 'rgba(254,226,226,0.5)', label: 'إصابة أولية', textColor: '#991b1b' },
					{ x1: yrSida, x2: 10, fill: 'rgba(254,215,170,0.55)', label: 'عجز مناعي', textColor: '#9a3412' }
				],
				curves: [
					{
						fn: (t) => Math.max(40, lt4Init - dropRate * t),
						color: '#2563eb',
						label: 'LT4'
					},
					{
						fn: (t) => {
							const p1 = 860 * Math.exp(-Math.pow((t - 0.5) / 0.35, 2));
							const late = t > yrSida - 1.5 ? 125 * Math.pow(t - (yrSida - 1.5), 1.8) : 0;
							return Math.min(1150, p1 + 120 + late);
						},
						color: '#dc2626',
						label: 'VIH'
					},
					{
						fn: (t) => (t < 0.3 ? 0 : t < yrSida ? 540 * (1 - Math.exp(-(t - 0.3) / 0.5)) : Math.max(90, 540 - 160 * (t - yrSida))),
						color: '#16a34a',
						dashed: true,
						label: 'Anti-VIH'
					}
				],
				dashedGuides: [
					{ x1: 0, y1: 200, x2: 10, y2: 200, color: '#991b1b', label: '200 /mm3', labelPos: 'top' }
				]
			});
			const hivCycleSvg = svgImmunologyDiagram('hiv_cycle', { title: 'دورة استهداف الفيروس للخلية التائية' });
			const curveUrl = saveSciencesSvgAsset(`sci_${track}_t2_hiv_curve_${difficulty}_s${seed}`, hivCurve);
			const cycleUrl = saveSciencesSvgAsset(`sci_${track}_t2_hiv_cycle_${difficulty}_s${seed}`, hivCycleSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = 'التكامل البنيوي بين البروتين الغلافي gp120 ومستقبل CD4 على غشاء LT4';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'ارتباط الفيروس بمستقبل BCR على الخلايا LB', diagnosticFeedback: 'فيروس VIH لا يرتبط بمستقبل BCR بل بـ CD4.' },
						{ text: 'غياب جزيئات CMH I على غشاء LT4', diagnosticFeedback: 'LT4 خلايا منواة تحمل CMH I بشكل طبيعي.' },
						{ text: 'إفراز LT4 لإنزيم الاستنساخ العكسي', diagnosticFeedback: 'إنزيم الاستنساخ العكسي يحمله فيروس VIH نفسه داخل محفظته.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: 'ما السبب الجزيئي لاستهداف فيروس $\\text{VIH}$ للخلايا اللمفاوية $\\text{LT4}$ دون الخلايا $\\text{LB}$ و $\\text{LT8}$؟',
					questionTextAr: 'اختر التفسير الجزيئي الصحيح:',
					imageUrl: cycleUrl,
					imageCaption: 'مراحل إصابة الخلية LT4 بفيروس VIH',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: 'يتثبت فيروس VIH نوعياً بفضل التكامل البنيوي بين الغليكوبروتين الفيروسي gp120 والمؤشر الغشائي CD4 المميز لـ LT4.'
				};
			} else if (difficulty === 'medium') {
				finalAnswer = 'انهيار إفراز الأنترلوكين IL-2 الضروري لتحفيز تكاثر وتمايز كل من LB و LT8';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'لأن LT4 هي التي تفرز الأجسام المضادة والبرفورين معاً', diagnosticFeedback: 'الأجسام المضادة تفرزها البلاسموسيت (من LB) والبرفورين تفرزه LTc (من LT8).' },
						{ text: 'لأن فيروس VIH يدمر نخاع العظم الأحمر مباشرة', diagnosticFeedback: 'السبب المباشر للعجز هو فقدان LT4 المحورية في التعاون المناعي.' },
						{ text: 'لأن الكريات الحمراء تتوقف عن نقل الأكسجين', diagnosticFeedback: 'العجز المناعي يتعلق باللمفاويات وليس بالكريات الحمراء.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في السنة ${yrSida} ينزل عدد $\\text{LT4}$ دون عتبة $200\\text{ خلية/mm}^3$، فينهار معها تركيز الأجسام المضادة وتنشط الأمراض الانتهازية. كيف تفسّر ذلك؟`,
					questionTextAr: 'اختر سبب الانهيار المزدوج للمناعتين الخلطية والخلوية:',
					imageUrl: curveUrl,
					imageCaption: 'تطور LT4 والشحنة الفيروسية والأجسام المضادة',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: 'تُعد LT4 (بعد تمايزها إلى LTh) الخلية المحورية التي تفرز IL-2 المحفز لتكاثر وتمايز كل من LB وLT8؛ لذا فتخريبها يشلّ الاستجابتين معاً.'
				};
			} else {
				finalAnswer = `${yrSida}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `انطلاقاً من المنحنى المرفق ($\\text{LT4}_0 = ${lt4Init}\\text{ /mm}^3$ بمعدل تناقص سنوي قرابة $${dropRate}\\text{ /mm}^3$), ابتداءً من أي سنة تقريباً يبلغ المريض مرحلة العجز المناعي (تحت عتبة $200\\text{ خلية/mm}^3$)?`,
					questionTextAr: 'أدخل السنة التقريبية لبلوغ عتبة العجز المناعي:',
					imageUrl: curveUrl,
					imageCaption: 'تحديد سنة بلوغ عتبة 200 خلية/mm³',
					questionData: { answer: yrSida, displayTemplate: 'السنة ≈ ?', variables: [], tolerance: 0.6 },
					explanation: `بحل ${lt4Init} - ${dropRate} t = 200 نجد t ≈ ${yrSida} سنوات (كما يبيّن تقاطع منحنى LT4 مع الخط المتقطع عند 200).`
				};
			}

			const blocks: ExerciseBlock['content'] = [
				{
					type: 'columns',
					widths: ['1.15fr', '1fr'],
					children: [
						{ type: 'image', src: curveUrl, caption: 'الوثيقة (1): تطور عدد LT4 والشحنة الفيروسية والأجسام المضادة' },
						{ type: 'image', src: cycleUrl, caption: 'الوثيقة (2): آلية استهداف VIH للخلايا LT4' }
					]
				},
				{
					type: 'table',
					headers: ['الوسط التجريبي (غرفة ماربروك)', 'الخلايا الموضوعة + المستضد', 'عدد البلاسموسيت المنتجة (وحدة اعتبارية)'],
					cells: [],
					rows: [
						['الوسط 1', 'LB وحدها', '8'],
						['الوسط 2', 'LT4 وحدها', '0'],
						['الوسط 3', 'LB + LT4 (يفصلهما غشاء نفوذ للجزيئات)', '185'],
						['الوسط 4', 'LB + LT4 مصابة بـ VIH', '14']
					],
					headerBackground: true,
					borders: 'grid',
					width: 'full'
				},
				{
					type: 'text',
					content: isMath
						? `**الجزء الأول**: 1) حلّل منحنيات الوثيقة (1) محدداً المراحل الثلاث للعدوى وسنة بلوغ عتبة العجز المناعي ($200 upright("خلية/mm")^3$)، ثم اقترح فرضية تفسّر بها انهيار الأجسام المضادة رغم أن الفيروس لا يصيب $upright("LB")$.`
						: `**الجزء الأول**: 1) حلّل منحنيات الوثيقة (1) محدداً المراحل الثلاث لتطور العدوى بـ $upright("VIH")$، ثم استخرج من الوثيقة (2) سبب الاستهداف النوعي للخلايا $upright("LT4")$.`,
					answer: isMath
						? `1) **التحليل**: (أ) **الإصابة الأولية (السنة 0–1)**: ارتفاع حاد للشحنة الفيروسية وانخفاض عابر لـ $upright("LT4")$ يتبعه ظهور الأجسام المضادة $upright("Anti-VIH")$ وتراجع الفيروس؛ (ب) **مرحلة الكمون (السنة 1–${yrSida})**: تناقص تدريجي لـ $upright("LT4")$ من $${lt4Init}$ نحو عتبة $200 upright("/mm")^3$؛ (جـ) **مرحلة العجز المناعي (بعد السنة ${yrSida})**: هبوط $upright("LT4")$ تحت $200$، انفجار الشحنة الفيروسية وانهيار الأجسام المضادة.\n- **الفرضية**: تحتاج الخلايا $upright("LB")$ إلى تحفيز كيميائي تفرزه $upright("LT4")$؛ وتخريب $upright("LT4")$ يوقف تمايز $upright("LB")$ إلى بلاسموسيت.`
						: `1) **التحليل**: المراحل الثلاث هي الإصابة الأولية (السنة 0–1)، الكمون بدون أعراض (حتى السنة ${yrSida} مع تناقص تدريجي لـ $upright("LT4")$)، ومرحلة السيدا/العجز المناعي (دون $200 upright("LT4/mm")^3$ مع ارتفاع هائل للشحنة الفيروسية وانهيار الأجسام المضادة).\n- **سبب الاستهداف النوعي**: التكامل البنيوي بين الغليكوبروتين الغلافي الفيروسي $upright("gp120")$ والمستقبل الغشائي $upright("CD4")$ الموجود على سطح $upright("LT4")$.`,
					mark: isMath ? '3.75' : '3'
				},
				{
					type: 'text',
					content: `**الجزء الثاني**: 2) باستغلال نتائج جدول تجربة غرفة ماربروك والوثيقتين (1) و(2)، بيّن آلية التعاون المناعي بين $upright("LT4")$ و $upright("LB")$ (و $upright("LT8")$)، ثم فسّر سبب العجز المناعي الشامل عند المصابين بالـ $upright("VIH")$.`,
					answer: `2) **استغلال الجدول**: في غياب $upright("LT4")$ (الوسط 1) يكون إنتاج البلاسموسيت ضعيفاً جداً ($8$)، وفي وجود $upright("LT4")$ وحدها ينعدم ($0$) لأن $upright("LB")$ وحدها تتمايز لبلاسموسيت. أما بوجودهما معاً مفصولين بغشاء نفوذ للجزيئات (الوسط 3) فيقفز العدد إلى $185$، مما يثبت أن التعاون يتم عبر **وسيط كيميائي ذائب هو الأنترلوكين 2 ($upright("IL-2")$)** الذي تفرزه $upright("LTh")$ الناتجة عن تمايز $upright("LT4")$. وفي الوسط 4 يؤدي تخريب $upright("LT4")$ بالـ $upright("VIH")$ إلى انهيار إفراز $upright("IL-2")$ وهبوط البلاسموسيت إلى $14$.\n- **تفسير العجز المناعي**: تدمير $upright("LT4")$ عبر $upright("gp120-CD4")$ والاستنساخ العكسي يحرم كلاً من $upright("LB")$ و $upright("LT8")$ المنتقاة من $upright("IL-2")$، فتتعطل المناعتان الخلطية والخلوية معاً وتظهر الأمراض الانتهازية.`,
					mark: isMath ? '6' : '4'
				}
			];

			if (isMath) {
				blocks.push({
					type: 'text',
					content: `**الجزء الثالث**: 3) أنجز مخططاً تحصيلياً يبرز الدور المحوري للخلايا $upright("LT4")$ في التعاون المناعي، وموضع تدخل فيروس $upright("VIH")$ المسبب للعجز المناعي.`,
					answer: `3) **المخطط التحصيلي**: $upright("CPA")$ (عرض المستضد مع $upright("CMH II")$ + $upright("IL-1")$) ← تنشيط $upright("LT4")$ [⛔ يستهدفها $upright("VIH")$ عبر $upright("gp120/CD4")$ ويخربها] ← في الحالة السليمة: تمايز إلى $upright("LTh")$ وإفراز $upright("IL-2")$ ← (1) تحفيز $upright("LB")$ ← بلاسموسيت ← أجسام مضادة (مناعة خلطية)، و(2) تحفيز $upright("LT8")$ ← $upright("LTc")$ ← برفورين وغرانزيم (مناعة خلوية). وفي حالة الـ $upright("VIH")$: غياب $upright("IL-2")$ ← شلل المسارين وعجز مناعي مكتسب.`,
					mark: '2.25'
				});
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `تتطلب الاستجابة المناعية النوعية الفعالة تعاوناً وثيقاً بين مختلف الخلايا اللمفاوية، إلا أن إصابة العضوية بفيروس فقدان المناعة المكتسبة ($upright("VIH")$) تُحدث انهياراً شاملاً في هذا النظام الدفاعي. لدراسة آلية التعاون المناعي وسبب العجز المناعي، نقدم لك الوثيقتين والجدول التجريبي أدناه.`,
				content: blocks
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't2',
				difficulty,
				domain: 'immunology',
				titleAr: this.titleAr,
				onecRole: isMath ? 'scientific_approach' : 'reasoning',
				quizQuestion,
				sujetExercise,
				hints: [
					'حدّد المراحل الثلاث في المنحنى (إصابة أولية، كمون، عجز مناعي دون 200 خلية/mm³).',
					'غشاء ماربروك يسمح بنفاذ الجزيئات (IL-2) ويمنع تماس الخلايا.',
					'اربط فقدان LT4 بغياب IL-2 الذي يشلّ كلاً من المناعة الخلطية والخلوية.'
				],
				solutionStepsAr: [
					`استهداف نوعي لـ LT4 عبر التكامل gp120 – CD4.`,
					`تجربة ماربروك تثبت التعاون عبر وسيط كيميائي ذائب (IL-2 من LTh).`,
					`عند هبوط LT4 دون 200/mm³ (قرابة السنة ${yrSida}) ينعدم IL-2 فتنهار المناعتان الخلطية والخلوية.`
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 3. SCIENTIFIC APPROACH (8 pts SE / 12 pts MATH):
	//    Cancer Immunotherapy (Monoclonal Antibodies Anti-PD-1 / LTc Cytolysis)
	// ─────────────────────────────────────────────────────────────────────────
	const tplApproachCancerImmunotherapy: SciencesParameterizedTemplate = {
		id: 'sci_tpl_3as_shared_t2_approach_cancer_immunotherapy',
		grade,
		trimesterId: 't2',
		domain: 'immunology',
		titleAr: 'مسعى علمي: العلاج المناعي للسرطان بالأجسام المضادة وحيدة النسيلة وتنشيط LTc',
		curriculumLessonId: `${lessonPrefix}_t2_cellular_hiv_coop`,
		defaultPoints: isMath ? 12 : 8,
		onecRole: 'scientific_approach',
		generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const therapies = [
				{
					mabAr: 'أجسام مضادة وحيدة النسيلة ضد PD-1 (نيفولوماب)',
					receptorAr: 'المستقبل المثبط PD-1 على غشاء LTc',
					ligandAr: 'البروتين السرطاني PD-L1',
					lysisNoDrug: rng.pick([12, 15, 18]),
					lysisWithDrug: rng.pick([82, 86, 90])
				},
				{
					mabAr: 'أجسام مضادة وحيدة النسيلة ضد PD-L1 (أتيزوليزوماب)',
					receptorAr: 'المستقبل المثبط PD-1 على LTc',
					ligandAr: 'البروتين الغشائي السرطاني PD-L1',
					lysisNoDrug: rng.pick([10, 14, 16]),
					lysisWithDrug: rng.pick([80, 85, 88])
				}
			];
			const th = rng.pick(therapies);

			const tumorCurve = svgBioCurvePlot({
				title: 'تطور نسبة انحلال الخلايا السرطانية بدلالة الزمن',
				xMin: 0,
				xMax: 24,
				yMin: 0,
				yMax: 105,
				xStep: 4,
				yStep: 20,
				xLabel: 't (h)',
				yLabel: 'Lyse (%)',
				curves: [
					{
						fn: (t) => th.lysisWithDrug * (1 - Math.exp(-t / 6)),
						color: '#16a34a',
						label: 'LTc + دواء مناعي'
					},
					{
						fn: (t) => th.lysisNoDrug * (1 - Math.exp(-t / 7)),
						color: '#dc2626',
						dashed: true,
						label: 'LTc وحدها'
					}
				],
				points: [
					{ x: 24, y: th.lysisWithDrug, label: `${th.lysisWithDrug}%`, color: '#15803d', dx: -10, dy: 15 },
					{ x: 24, y: th.lysisNoDrug, label: `${th.lysisNoDrug}%`, color: '#dc2626', dx: -10, dy: -8 }
				]
			});
			const cytoSvg = svgImmunologyDiagram('cellular_cytolysis', { title: 'آلية تخريب الخلية المستهدفة بواسطة الخلايا السامة' });
			const curveUrl = saveSciencesSvgAsset(`sci_${track}_t2_canc_curve_${difficulty}_s${seed}`, tumorCurve);
			const cytoUrl = saveSciencesSvgAsset(`sci_${track}_t2_canc_cyto_${difficulty}_s${seed}`, cytoSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = 'التعرف المزدوج (TCR+CD8 مع CMH I–ببتيد ورمي) ثم إفراز البرفورين والغرانزيم';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'إفراز أجسام مضادة تبتلع الخلية السرطانية', diagnosticFeedback: 'الـ LTc لا تفرز أجساماً مضادة ولا تبتلع الخلايا.' },
						{ text: 'إفراز الأستيل كولين في غشاء الخلية السرطانية', diagnosticFeedback: 'الأستيل كولين مبلغ عصبي وليس مناعياً.' },
						{ text: 'التعرف على CMH II فقط دون ببتيد', diagnosticFeedback: 'الخلايا السرطانية الجسمية تعرض ببتيداتها رفقة CMH I وليس CMH II.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: 'كيف تُخرِّب الخلية اللمفاوية السامة $\\text{LTc}$ الخلية السرطانية بعد رفع التثبيط عنها بالعلاج المناعي؟',
					questionTextAr: 'اختر آلية التخريب الخلوي بواسطة LTc:',
					imageUrl: cytoUrl,
					imageCaption: 'آلية الاستجابة الخلوية عبر LTc',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: 'بعد التعرف المزدوج عبر TCR+CD8 على معقد (CMH I–ببتيد سرطاني)، تفرز LTc البرفورين (يشكل قنوات حلولية) والغرانزيم فيتحلل الورم.'
				};
			} else if (difficulty === 'medium') {
				finalAnswer = 'ترتبط نوعياً فتمنع تفاعل PD-1/PD-L1 وتزيل الكبح عن LTc فتستعيد إفراز البرفورين';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'تخرب الخلايا اللمفاوية LTc لتمنع الالتهاب', diagnosticFeedback: 'الأجسام المضادة العلاجية تُنشِّط LTc ولا تخربها.' },
						{ text: 'تحول الخلايا السرطانية إلى بالعات كبيرة', diagnosticFeedback: 'الهدف هو تدمير الخلايا السرطانية وليس تحويلها.' },
						{ text: 'تمنع عرض المعقد CMH I–ببتيد ورمي', diagnosticFeedback: 'منع عرض CMH I يحمي الورم من LTc بدلاً من تدميره!' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في التجربة، ارتفعت نسبة انحلال الخلايا السرطانية من $${th.lysisNoDrug}\\%$ إلى $${th.lysisWithDrug}\\%$ بوجود **${th.mabAr}**. ما آلية عمل هذا الدواء المناعي؟`,
					questionTextAr: 'اختر آلية العلاج المناعي:',
					imageUrl: curveUrl,
					imageCaption: 'أثر الأجسام المضادة وحيدة النسيلة على انحلال الورم',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `يمنع الدواء ارتباط ${th.ligandAr} بـ ${th.receptorAr}، فيرفع التثبيط عن LTc ويسمح لها بإفراز البرفورين وتدمير الخلايا السرطانية.`
				};
			} else {
				const ratio = roundTo(th.lysisWithDrug / th.lysisNoDrug, 1);
				finalAnswer = `${ratio}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `انطلاقاً من المنحنى بعد $24\\text{ h}$، ارتفعت نسبة انحلال الخلايا السرطانية من $${th.lysisNoDrug}\\%$ بدون دواء إلى $${th.lysisWithDrug}\\%$ بوجود العلاج المناعي. كم مرة تقريباً تضاعفت فعالية التخريب (مقرباً لرقم عشري واحد)؟`,
					questionTextAr: 'احسب معامل تضاعف فعالية التخريب:',
					imageUrl: curveUrl,
					imageCaption: 'مقارنة نسب الانحلال الخلوي عند 24 ساعة',
					questionData: { answer: ratio, displayTemplate: 'المعامل ≈ ?', variables: [], tolerance: 0.2 },
					explanation: `$\\frac{${th.lysisWithDrug}}{${th.lysisNoDrug}} \\approx ${ratio}$ مرة، مما يؤكد الفعالية العالية للعلاج المناعي في رفع الكبح عن LTc.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `رغم قدرة الجهاز المناعي على التعرف على الخلايا السرطانية عبر الاستجابة الخلوية ($upright("LTc")$)، إلا أن بعض الأورام تفلت من التدمير وتستمر في التكاثر. في السنوات الأخيرة، أحدث العلاج المناعي باستعمال **${th.mabAr}** ثورة طبية في علاج السرطان.`,
				content: [
					{
						type: 'text',
						content: `**الجزء الأول**: تُبيّن تحاليل خزعة ورمية وجود خلايا $upright("LTc")$ نوعية محيطة بالورم لكنها خاملة غير قادرة على إفراز البرفورين، كما تُظهر تحاليل غشاء الخلية السرطانية تعبيراً كثيفاً لبروتين غشائي يُدعى $upright("PD-L1")$.\n1) اقترح فرضيتين تفسّران بهما إفلات الخلايا السرطانية من التدمير بواسطة $upright("LTc")$.`,
						answer: `1) الفرضيتان:\n- **الفرضية 1**: يرتبط البروتين السرطاني ${th.ligandAr} بمستقبل مثبط (${th.receptorAr}) على سطح $upright("LTc")$ مما يكبح نشاطها وإفرازها للبرفورين.\n- **الفرضية 2**: فقدت الخلايا السرطانية جزيئات $upright("CMH I")$ فلا يحدث التعرف المزدوج مع $upright("LTc")$.`,
						mark: isMath ? '2.25' : '1.5'
					},
					{
						type: 'columns',
						widths: ['1.15fr', '1fr'],
						children: [
							{ type: 'image', src: curveUrl, caption: 'الوثيقة (1): تطور نسبة انحلال الخلايا السرطانية بوجود وغياب الدواء' },
							{ type: 'image', src: cytoUrl, caption: 'الوثيقة (2): آلية التخريب الخلوي بواسطة LTc' }
						]
					},
					{
						type: 'table',
						headers: ['الوسط التجريبي (خلايا سرطانية + LTc نوعية)', 'تثبت PD-L1 على PD-1', 'إفراز البرفورين والغرانزيم'],
						cells: [],
						rows: [
							['بدون دواء (شاهد)', 'مرتفع (+++)', 'ضعيف جداً (+)'],
							[`بإضافة ${th.mabAr}`, 'معدوم (−)', 'مرتفع جداً (+++)']
						],
						headerBackground: true,
						borders: 'grid',
						width: 'full'
					},
					{
						type: 'text',
						content: `**الجزء الثاني**: 2) باستغلال الوثيقتين (1) و(2) والجدول التجريبي، فسّر سبب إفلات الخلايا السرطانية من المناعة الخلوية، واشرح الآلية الجزيئية الدقيقة لـ **${th.mabAr}** في علاج الورم، ثم صادق على الفرضية الصحيحة.`,
						answer: `2) **استغلال الوثيقة (1) والجدول**: في غياب الدواء يرتبط ${th.ligandAr} بقوة مع ${th.receptorAr} فيكون إفراز البرفورين ضعيفاً جداً ولا تتجاوز نسبة انحلال الخلايا السرطانية $${th.lysisNoDrug}\\%$ بعد $24 upright("h")$. أما عند إضافة **${th.mabAr}** فينعدم ارتباط $upright("PD-L1")$ بـ $upright("PD-1")$، فيرتفع إفراز البرفورين والغرانزيم وتقفز نسبة انحلال الورم إلى $${th.lysisWithDrug}\\%$.\n- **الآلية والمصادقة**: ترتبط الأجسام المضادة وحيدة النسيلة تكاملياً بالهدف الجزيئي فتحجب التفاعل المثبط $upright("PD-1/PD-L1")$؛ وبذلك يزول الكبح عن $upright("LTc")$ التي تتعرف تعرفاً مزدوجاً ($upright("TCR+CD8")$ مع $upright("CMH I")$–ببتيد ورمي) وتفرز البرفورين (قنوات حلولية) والغرانزيم فتتحلل الخلية السرطانية بالصدمة الحلولية. ومنه نصادق على **الفرضية 1** وننفي الفرضية 2 (لأن التعرف المزدوج تم بنجاح بمجرد إضافة الدواء).`,
						mark: isMath ? '7.5' : '5'
					},
					{
						type: 'text',
						content: `**الجزء الثالث**: 3) أنجز **مخططاً تحصيلياً وظيفياً** يوضّح آلية استعادة تخريب الخلايا السرطانية بفضل العلاج المناعي بـ **${th.mabAr}**.`,
						answer: `3) **المخطط التحصيلي**: جسم مضاد وحيد النسيلة ← تثبت نوعي يمنع ارتباط $upright("PD-L1")$ بـ $upright("PD-1")$ ← رفع الكبح عن $upright("LTc")$ ← تعرف مزدوج مع معقد ($upright("CMH I")$–ببتيد سرطاني) ← إطراح البرفورين والغرانزيم ← تشكيل قنوات حلولية ودخول الماء والأملاح ← انحلال الخلية السرطانية وتراجع الورم.`,
						mark: isMath ? '2.25' : '1.5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't2',
				difficulty,
				domain: 'immunology',
				titleAr: this.titleAr,
				onecRole: 'scientific_approach',
				quizQuestion,
				sujetExercise,
				hints: [
					'قارن نسبة انحلال الورم وإفراز البرفورين بغياب وبوجود الأجسام المضادة العلاجية.',
					'الدواء لا يقتل الورم بنفسه بل يرفع الكبح (PD-1/PD-L1) عن خلايا LTc لتقوم بالتعرف المزدوج وإفراز البرفورين.',
					'اختم بمخطط تحصيلي متسلسل يبرز رفع الكبح ثم الصدمة الحلولية.'
				],
				solutionStepsAr: [
					`بدون دواء: انحلال ${th.lysisNoDrug}% بسبب كبح PD-1/PD-L1.`,
					`بوجود ${th.mabAr}: منع الارتباط المثبط ← ارتفاع البرفورين وانحلال ${th.lysisWithDrug}%.`,
					'المصادقة على الفرضية 1 وشرح آلية التعرف المزدوج والبرفورين.'
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 4. RECALL (5 pts SE / 8 pts MATH): Synapse Ultrastructure, Channels & Scientific Text
	// ─────────────────────────────────────────────────────────────────────────
	const tplRecallSynapseChannels: SciencesParameterizedTemplate = {
		id: 'sci_tpl_3as_shared_t2_recall_synapse_channels',
		grade,
		trimesterId: 't2',
		domain: 'neurobiology',
		titleAr: 'استرجاع منظم: بنية المشبك الكيميائي والقنوات الغشائية في النقل العصبي (+ نص علمي)',
		curriculumLessonId: `${lessonPrefix}_t2_synapse_integration_toxins`,
		defaultPoints: isMath ? 8 : 5,
		onecRole: 'recall',
		generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const synSvg = svgCellUltrastructure('synapse', {
				numbered: true,
				title: 'رسم تخطيطي مرقم للمشبك الكيميائي'
			});
			const chanSvg = svgMolecularBiology('membrane_channels', {
				title: 'القنوات الغشائية ومضخة الصوديوم والبوتاسيوم'
			});
			const synUrl = saveSciencesSvgAsset(`sci_${track}_t2_syn_num_${difficulty}_s${seed}`, synSvg);
			const chanUrl = saveSciencesSvgAsset(`sci_${track}_t2_chan_${difficulty}_s${seed}`, chanSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = 'قنوات Ca²⁺ الفولطية في الغشاء قبل المشبكي';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'قنوات Cl⁻ المبوبة كيميائياً في الغشاء بعد المشبكي', diagnosticFeedback: 'تلك تسبب PPSI في الغشاء بعد المشبكي.' },
						{ text: 'مضخة Na⁺/K⁺ ATPase', diagnosticFeedback: 'المضخة تحافظ على كمون الراحة ولا تطلق الحويصلات.' },
						{ text: 'قنوات تسرب K⁺', diagnosticFeedback: 'قنوات التسرب مفتوحة دوماً للراحة.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: 'أي بروتين غشائي (الرقم 2 في الوثيقة) ينفتح فور وصول كمون العمل إلى الزر قبل المشبكي ليُحرّض هجرة الحويصلات المشبكية وتحرير الأستيل كولين؟',
					questionTextAr: 'اختر البروتين الغشائي المسؤول عن تحرير المبلغ:',
					imageUrl: synUrl,
					imageCaption: 'رسم تخطيطي مرقم للمشبك الكيميائي',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: 'يؤدي زوال الاستقطاب إلى فتح القنوات الفولطية لـ Ca²⁺؛ دخول شوارد Ca²⁺ يحرض التحام الحويصلات بالغشاء وتحرير المبلغ بالإطراح الخلوي.'
				};
			} else if (difficulty === 'medium') {
				finalAnswer = 'قنوات مبوبة كيميائياً لـ Na⁺ (تُفتح بتثبت الأستيل كولين فتولد PPSE)';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'قنوات فولطية لـ Na⁺ تُفتح مباشرة بالكهرباء في الشق المشبكي', diagnosticFeedback: 'الشق المشبكي ينقل إشارة كيميائية (مبلغ عصبي) والمستقبلات في الغشاء بعد المشبكي مبوبة كيميائياً.' },
						{ text: 'قنوات تسرب K⁺ دائمة الانفتاح', diagnosticFeedback: 'قنوات التسرب لا ترتبط بالأستيل كولين.' },
						{ text: 'إنزيمات ARN بوليميراز غشائية', diagnosticFeedback: 'ARN بوليميراز إنزيم نووي للاستنساخ.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: 'ما طبيعة البروتينات الغشائية المرقمة بـ (3) على الغشاء بعد المشبكي في مشبك تنبيهي كولينيرجي؟',
					questionTextAr: 'حدد طبيعة ودور العنصر (3):',
					imageUrl: synUrl,
					imageCaption: 'المستقبلات القنوية في الغشاء بعد المشبكي',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: 'هي مستقبلات قنوية مبوبة كيميائياً للأستيل كولين؛ ارتباط جزيئتي ACh يفتح القناة فتدخل شوارد Na⁺ مولّدة زوال استقطاب (PPSE).'
				};
			} else {
				finalAnswer = 'قنوات التسرب (K⁺ و Na⁺) ومضخة Na⁺/K⁺ ATPase المستهلكة للـ ATP';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'القنوات الفولطية لـ Na⁺ و Ca²⁺ فقط', diagnosticFeedback: 'القنوات الفولطية مغلقة أثناء الراحة (−70 mV).' },
						{ text: 'المستقبلات القنوية للـ GABA فقط', diagnosticFeedback: 'كمون الراحة خاصية لجميع الألياف العصبية بفضل قنوات التسرب والمضخة.' },
						{ text: 'إنزيم الأستيل كولين إستيراز', diagnosticFeedback: 'هذا الإنزيم يفكك ACh في الشق المشبكي فقط.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: 'ما البروتينات الغشائية التي تضمن نشأة وثبات **كمون الراحة ($-70\\text{ mV}$)** على جانبي غشاء الليف العصبي؟',
					questionTextAr: 'اختر البروتينات المسؤولة عن كمون الراحة:',
					imageUrl: chanUrl,
					imageCaption: 'القنوات الغشائية ومضخة Na⁺/K⁺',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: 'تولد قنوات التسرب المفتوحة دوماً (خاصة لـ K⁺) فرق الكمون، وتحافظ مضخة Na⁺/K⁺ ATPase على ثبات التدرج الشاردي بنقل فعال (3Na⁺ خارجاً / 2K⁺ داخلاً).'
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `تؤمّن البروتينات الغشائية (قنوات تسرب، قنوات فولطية، قنوات مبوبة كيميائياً، ومضخات شاردية) توليد ونقل الرسالة العصبية عبر الألياف والمشابك الكيميائية. تُمثّل الوثيقتان (1) و(2) فوق بنية مشبك كيميائي تنبيهي والبروتينات الغشائية للّيف العصبي.`,
				content: [
					{
						type: 'columns',
						widths: ['1fr', '1fr'],
						children: [
							{ type: 'image', src: synUrl, caption: 'الوثيقة (1): رسم تخطيطي مرقم لمشبك كيميائي تنبيهي' },
							{ type: 'image', src: chanUrl, caption: 'الوثيقة (2): القنوات الفولطية ومضخة Na⁺/K⁺' }
						]
					},
					{
						type: 'text',
						content: `1) تعرّف على البيانات المرقمة من (1) إلى (6) في الوثيقة (1)، ثم حدّد اتجاه انتقال الرسالة العصبية في المشبك مع التعليل البنيوي.`,
						answer: `1) **البيانات**: (1) حويصلات مشبكية حاوية على المبلغ العصبي (الأستيل كولين)، (2) قنوات فولطية لـ $upright("Ca")^(2+)$، (3) مستقبلات قنوية مبوبة كيميائياً لـ $upright("Na")^+$، (4) نهاية محورية قبل مشبكية، (5) شق مشبكي + جزيئات المبلغ العصبي، (6) خلية بعد مشبكية.\n- **اتجاه النقل**: أحادي الاتجاه من العنصر قبل المشبكي إلى العنصر بعد المشبكي، لأن الحويصلات المشبكية توجد حصراً في النهاية قبل المشبكية والمستقبلات القنوية النوعية توجد حصراً على الغشاء بعد المشبكي.`,
						mark: isMath ? '3' : '2'
					},
					{
						type: 'text',
						content: `2) اكتب **نصاً علمياً مهيكلاً** تشرح فيه الدور المتكامل للبروتينات الغشائية في الحفاظ على كمون الراحة ($-70 upright("mV")$)، توليد كمون العمل، وضمان النقل المشبكي الكيميائي حتى عودة الغشاء إلى حالة الراحة.`,
						answer: `2) **نص علمي مهيكل**:\n- **المقدمة والإشكالية**: تعتمد وظيفة الاتصال العصبي على بروتينات غشائية عالية التخصص تحوّل وتنقل السيالات العصبية بدقة. فكيف تتكامل هذه البروتينات في كمون الراحة وكمون العمل والنقل المشبكي؟\n- **العرض**: أثناء **كمون الراحة ($-70 upright("mV")$)** تعمل **قنوات التسرب** المفتوحة دوماً (نفاذية أكبر لـ $upright("K")^+$) وتضمن **مضخة $upright("Na")^+/upright("K")^+ upright("ATPase")$** ثبات التوزع الشاردي بإخراج $3 upright("Na")^+$ وإدخال $2 upright("K")^+$ باستهلاك $upright("ATP")$. عند تنبيه فعال يبلغ العتبة ($-55 upright("mV")$) يتولد **كمون عمل**: تنفتح **القنوات الفولطية لـ $upright("Na")^+$** (دخول سريع لـ $upright("Na")^+$ وزوال استقطاب حتى $+30 upright("mV")$) ثم تنغلق وتنفتح **القنوات الفولطية لـ $upright("K")^+$** (خروج $upright("K")^+$ لعودة وفرط الاستقطاب). وعند وصول السيالة للنهاية قبل المشبكية تنفتح **القنوات الفولطية لـ $upright("Ca")^(2+)$** فيدخل الكالسيوم ويحرض هجرة الحويصلات وإطراح الأستيل كولين في الشق المشبكي. يرتبط هذا الأخير بـ **القنوات المبوبة كيميائياً لـ $upright("Na")^+$** على الغشاء بعد المشبكي فتدخل شوارد $upright("Na")^+$ مولدة $upright("PPSE")$ (قد يبلغ العتبة ليولد كمون عمل جديداً). ثم يفكك إنزيم **الأستيل كولين إستيراز** المبلغ العصبي فتُغلق القنوات الكيميائية ويعود الغشاء للراحة.\n- **الخاتمة**: يضمن التتابع المنسّق للبروتينات الغشائية (قنوات تسرب، مضخات، قنوات فولطية وكيميائية وإنزيمات) تشفير ونقل الرسالة العصبية بسرعة ودقة.`,
						mark: isMath ? '5' : '3'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't2',
				difficulty,
				domain: 'neurobiology',
				titleAr: this.titleAr,
				onecRole: 'recall',
				quizQuestion,
				sujetExercise,
				hints: [
					'اتجاه النقل المشبكي دوماً من الجهة الحاملة للحويصلات إلى الجهة الحاملة للمستقبلات القنوية.',
					'اذكر الأنواع الأربعة للبروتينات الغشائية بالترتيب: قنوات التسرب + المضخة، القنوات الفولطية (Na⁺/K⁺ ثم Ca²⁺)، القنوات المبوبة كيميائياً، وإنزيم التفكيك AChE.',
					'تأكد من كتابة قيم الكمون الدقيقة (−70 / −55 / +30 mV).'
				],
				solutionStepsAr: [
					'تسمية البيانات 1-6 وتبرير أحادية اتجاه النقل المشبكي.',
					'نص علمي مهيكل يغطي الراحة (−70 mV)، العمل (+30 mV)، النقل المشبكي، والتفكيك بـ AChE.'
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 5. REASONING (7 pts SE): Action Potential (-70/-55/+30 mV) & PPSE/PPSI Integration
	// ─────────────────────────────────────────────────────────────────────────
	const tplReasoningNeuroIntegration: SciencesParameterizedTemplate = {
		id: 'sci_tpl_3as_shared_t2_reasoning_ap_integration',
		grade,
		trimesterId: 't2',
		domain: 'neurobiology',
		titleAr: 'استدلال علمي: مصدر كمون العمل (−70 / −55 / +30 mV) والإدماج العصبي (PPSE / PPSI)',
		curriculumLessonId: `${lessonPrefix}_t2_resting_action_potential`,
		defaultPoints: 7,
		onecRole: 'reasoning',
		generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const ppse1 = rng.pick([8, 10, 12]);
			const ppse2 = rng.pick([9, 10, 11]);
			const ppsi = rng.pick([6, 8, 10]);
			const vSum12 = -70 + ppse1 + ppse2; // > -55 => fires!
			const vSumAll = -70 + ppse1 + ppse2 - ppsi;
			const firesAll = vSumAll >= -55;

			const apSvg = svgBioCurvePlot({
				title: 'تسجيل كمون العمل لليف عصبي بوجود المثبطات',
				xMin: 0,
				xMax: 6,
				yMin: -90,
				yMax: 45,
				xStep: 1,
				yStep: 20,
				xLabel: 't (ms)',
				yLabel: 'ddp (mV)',
				eventArrows: [{ x: 0.8, label: 'تنبيه فعال', color: '#dc2626' }],
				curves: [
					{
						fn: (t) => {
							if (t < 1.0) return -70;
							if (t < 1.9) return -70 + 100 * Math.sin(((t - 1.0) / 0.9) * (Math.PI / 2));
							if (t < 3.2) return 30 - 110 * Math.pow((t - 1.9) / 1.3, 1.3);
							if (t < 4.7) return -80 + 10 * ((t - 3.2) / 1.5);
							return -70;
						},
						color: '#dc2626',
						label: 'شاهد طبيعي'
					},
					{
						fn: (t) => {
							if (t < 1.0) return -70;
							if (t < 1.9) return -70 + 100 * Math.sin(((t - 1.0) / 0.9) * (Math.PI / 2));
							return 30 - 38 * (1 - Math.exp(-(t - 1.9) / 1.8));
						},
						color: '#2563eb',
						dashed: true,
						label: 'بوجود TEA'
					}
				],
				dashedGuides: [
					{ x1: 0, y1: -55, x2: 6, y2: -55, color: '#6d28d9', label: '-55 mV', labelPos: 'top' },
					{ x1: 0, y1: -70, x2: 6, y2: -70, color: '#475569', label: '-70 mV', labelPos: 'bottom' }
				],
				points: [{ x: 1.9, y: 30, label: '+30 mV', color: '#dc2626' }]
			});
			const apUrl = saveSciencesSvgAsset(`sci_${track}_t2_ap_int_${difficulty}_s${seed}`, apSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${vSum12}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `يستقبل عصبون محرك (كمون الراحة $-70\\text{ mV}$ وعتبة التوليد $-55\\text{ mV}$) في نفس اللحظة كمونين تنبيهيين: $\\text{PPSE}_1 = +${ppse1}\\text{ mV}$ و $\\text{PPSE}_2 = +${ppse2}\\text{ mV}$. احسب المحصلة الجبرية للكمون الغشائي في القطعة الابتدائية ($\\text{mV}$).`,
					questionTextAr: 'احسب الكمون الناتج بالتجميع الفضائي (mV):',
					imageUrl: apUrl,
					imageCaption: 'كمون العمل وعتبة زوال الاستقطاب',
					questionData: { answer: vSum12, displayTemplate: 'V = ? mV', variables: [], tolerance: 0.2 },
					explanation: `$V = -70 + ${ppse1} + ${ppse2} = ${vSum12}\\text{ mV} \\ge -55\\text{ mV}$، فتُبلغ العتبة ويتولد كمون عمل.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${vSumAll}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `نضيف في نفس اللحظة السابقة مشبكاً تثبيطياً يولد $\\text{PPSI} = -${ppsi}\\text{ mV}$ إلى جانب $\\text{PPSE}_1 = +${ppse1}\\text{ mV}$ و $\\text{PPSE}_2 = +${ppse2}\\text{ mV}$ (كمون الراحة $-70\\text{ mV}$). ما قيمة المحصلة الجبرية الجديدة بوحدة $\\text{mV}$؟`,
					questionTextAr: 'احسب المحصلة الجديدة بوحدة mV:',
					imageUrl: apUrl,
					imageCaption: 'التجميع الجبري بين PPSE و PPSI',
					questionData: { answer: vSumAll, displayTemplate: 'V = ? mV', variables: [], tolerance: 0.2 },
					explanation: `$V = -70 + ${ppse1} + ${ppse2} - ${ppsi} = ${vSumAll}\\text{ mV}$ (${firesAll ? 'يبلغ العتبة −55 mV فيتولد كمون عمل' : 'أقل من العتبة −55 mV فلا يتولد كمون عمل'}).`
				};
			} else {
				finalAnswer = 'غلق القنوات الفولطية لـ K⁺ فيتعطل خروج K⁺ وتختفي عودة وفرط الاستقطاب';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'غلق القنوات الفولطية لـ Na⁺ فيختفي طور زوال الاستقطاب', diagnosticFeedback: 'تلك هي نتيجة TTX؛ أما المنحنى المتقطع (TEA) فأظهر زوال استقطاب كاملاً حتى +30 mV.' },
						{ text: 'تخريب مضخة Na⁺/K⁺ قبل التنبيه', diagnosticFeedback: 'كمون الراحة قبل التنبيه سليم (−70 mV).' },
						{ text: 'زيادة دخول شوارد Cl⁻', diagnosticFeedback: 'دخول Cl⁻ يخفض الكمون نحو −80 mV وليس بقاءه مرتفعاً.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: 'اعتماداً على مقارنة المنحنى المتقطع (بوجود مادة $\\text{TEA}$) بالشاهد الطبيعي في الوثيقة، كيف تفسّر بقاء الكمون مرتفعاً وتأخر عودة الاستقطاب؟',
					questionTextAr: 'اختر التفسير الدقيق لأثر TEA:',
					imageUrl: apUrl,
					imageCaption: 'مقارنة كمون العمل بالشاهد وبوجود TEA',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: 'تغلق مادة TEA القنوات الفولطية لـ K⁺، فتتوقف التدفقات الخارجة لـ K⁺ المسؤولة عن عودة الاستقطاب وفرط الاستقطاب.'
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: 7,
				instruction: `يدمج العصبون المحرك في النخاع الشوكي عدداً كبيراً من الرسائل التنبيهية والتثبيطية ليصدر أو لا يصدر كمون عمل ينتشر عبر محوره الأسطواني. لدراسة مصدر أطوار كمون العمل وآلية الإدماج العصبي، نقدم لك الوثيقة والجدول أدناه.`,
				content: [
					{
						type: 'columns',
						widths: ['1.15fr', '1fr'],
						children: [
							{ type: 'image', src: apUrl, caption: 'الوثيقة (1): تسجيل كمون عمل طبيعي وبوجود TEA' },
							{
								type: 'table',
								headers: ['التنبيهات المتزامنة (الراحة −70 mV، العتبة −55 mV)', 'السعات الواردة للقطعة SI'],
								cells: [],
								rows: [
									['الحالة أ: مشبك تنبيهي 1 وحده', `PPSE₁ = +${ppse1} mV`],
									['الحالة ب: مشبكان تنبيهيان (1 + 2) معاً', `+${ppse1} mV و +${ppse2} mV`],
									['الحالة جـ: مشبكان تنبيهيان (1 + 2) + مشبك تثبيطي 3', `+${ppse1} mV، +${ppse2} mV، −${ppsi} mV`]
								],
								headerBackground: true,
								borders: 'grid',
								width: 'full'
							}
						]
					},
					{
						type: 'text',
						content: `**الجزء الأول**: 1) حلّل مقارناً منحنيي الوثيقة (1) وحدد القيم المميزة لكمون العمل الطبيعي، ثم استنتج القناة الغشائية المستهدفة بمادة $upright("TEA")$ ودورها الشاردي، وميّزها عن تأثير مادة $upright("TTX")$.`,
						answer: `1) **التحليل المقارن**: في الشاهد يسجَّل كمون راحة $-70 upright("mV")$؛ إثر تنبيه فعال يتجاوز العتبة ($-55 upright("mV")$) يحدث زوال استقطاب سريع حتى $+30 upright("mV")$ ثم عودة استقطاب ففرط استقطاب ($-80 upright("mV")$) والعودة للراحة. أما بوجود $upright("TEA")$ فيحدث زوال الاستقطاب عادياً حتى $+30 upright("mV")$ لكن تتباطأ وتتعطل عودة الاستقطاب ويغيب فرط الاستقطاب.\n- **الاستنتاج**: تستهدف $upright("TEA")$ **القنوات الفولطية لـ $upright("K")^+$** (المسؤولة عن خروج $upright("K")^+$ في عودة وفرط الاستقطاب)، بينما تغلق $upright("TTX")$ **القنوات الفولطية لـ $upright("Na")^+$** فتمنع زوال الاستقطاب كلياً.`,
						mark: '3.5'
					},
					{
						type: 'text',
						content: `**الجزء الثاني**: 2) احسب المحصلة الجبرية للكمون الغشائي في القطعة الابتدائية ($upright("SI")$) في الحالات الثلاث (أ، ب، جـ) من الجدول، محدداً في كل حالة هل يتولد كمون عمل أم لا، ثم عرّف نوع التجميع المبرَز واذكر الشاردتين المسؤولتين عن $upright("PPSE")$ و $upright("PPSI")$.`,
						answer: `2) **الحساب والاستنتاج**:\n- **الحالة أ**: $-70 + ${ppse1} = ${-70 + ppse1} upright("mV") < -55 upright("mV")$ ← لا يتولد كمون عمل.\n- **الحالة ب**: $-70 + ${ppse1} + ${ppse2} = ${vSum12} upright("mV") >= -55 upright("mV")$ ← تُبلغ العتبة ويتولد كمون عمل (+30 mV).\n- **الحالة جـ**: $-70 + ${ppse1} + ${ppse2} - ${ppsi} = ${vSumAll} upright("mV")$ ← ${firesAll ? 'تُبلغ العتبة ($>= -55 upright("mV")$) فيتولد كمون عمل.' : 'دون العتبة ($< -55 upright("mV")$) فلا يتولد كمون عمل (كبح بالتثبيط).'}\n- **النوع والشوارد**: هذا **تجميع فضائي** (وصول كمونات في آنٍ واحد من عدة مشابك). ينتج $upright("PPSE")$ عن دخول $upright("Na")^+$ (مشبك أستيل كولين) وينتج $upright("PPSI")$ عن دخول $upright("Cl")^-$ (مشبك $upright("GABA")$).`,
						mark: '3.5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't2',
				difficulty,
				domain: 'neurobiology',
				titleAr: this.titleAr,
				onecRole: 'reasoning',
				quizQuestion,
				sujetExercise,
				hints: [
					'TEA يثبط قنوات K⁺ الفولطية (عودة وفرط الاستقطاب)، وTTX يثبط قنوات Na⁺ الفولطية (زوال الاستقطاب).',
					'اجمع الكمونات جبرياً انطلاقاً من كمون الراحة (−70 mV) وقارن النتيجة بالعتبة (−55 mV).',
					'وصول تنبيهات في نفس الوقت من مشابك مختلفة هو تجميع فضائي.'
				],
				solutionStepsAr: [
					'تحليل كمون العمل وتحديد أثر TEA (غلق قنوات K⁺) مقارنة بـ TTX (غلق قنوات Na⁺).',
					`الحالة أ: ${-70 + ppse1} mV (لا عمل) | ب: ${vSum12} mV (كمون عمل) | جـ: ${vSumAll} mV (${firesAll ? 'كمون عمل' : 'كبح'}).`,
					'التجميع الفضائي: Na⁺ للـ PPSE و Cl⁻ للـ PPSI.'
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 6. SCIENTIFIC APPROACH (8 pts SE / 12 pts MATH):
	//    Neurotoxins & Drugs on Synaptic Transmission (Botox / Curare / Morphine / Strychnine / Organophosphate)
	// ─────────────────────────────────────────────────────────────────────────
	const tplApproachNeurotoxins: SciencesParameterizedTemplate = {
		id: 'sci_tpl_3as_shared_t2_approach_neurotoxins_synapse',
		grade,
		trimesterId: 't2',
		domain: 'neurobiology',
		titleAr: 'مسعى علمي: آلية تأثير السموم العصبية والمخدرات والمبيدات على النقل المشبكي',
		curriculumLessonId: `${lessonPrefix}_t2_synapse_integration_toxins`,
		defaultPoints: isMath ? 12 : 8,
		onecRole: 'scientific_approach',
		generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const toxins = [
				{
					nameAr: 'توكسين البوتوكس (البوتولينوم)',
					symptomAr: 'شلل عضلي رخو وارتخاء العضلات',
					levelAr: 'قبل مشبكي (منع إطراح الأستيل كولين)',
					mechanismAr: 'يخرب البروتينات المسؤولة عن التحام الحويصلات المشبكية بالغشاء قبل المشبكي (SNARE)، فيتوقف تحرير الأستيل كولين في الشق المشبكي رغم دخول Ca²⁺، فتغيب الـ PPSE وتسترخي العضلة',
					achCleft: 8,
					directAchWorks: true,
					postAmp: -68
				},
				{
					nameAr: 'سم الكورار (ألفا-بنغاروتوكسين)',
					symptomAr: 'شلل عضلي رخو سريع',
					levelAr: 'بعد مشبكي (حجب مستقبلات الأستيل كولين القنوية)',
					mechanismAr: 'يمتلك تشابهاً بنيوياً مع الأستيل كولين فيتثبت على مستقبلاته القنوية في الغشاء بعد المشبكي دون فتحها، مما يمنع تثبت الأستيل كولين ودخول Na⁺ فلا يتولد PPSE ولا كمون عمل عضلي',
					achCleft: 98,
					directAchWorks: false,
					postAmp: -66
				},
				{
					nameAr: 'المبيد الفوسفوري العضوي (السارين / باراثيون)',
					symptomAr: 'تشنجات عضلية حادة وتكزز خطير',
					levelAr: 'الشق المشبكي (تثبيط إنزيم الأستيل كولين إستيراز AChE)',
					mechanismAr: 'يثبط إنزيم AChE المسؤول عن تفكيك الأستيل كولين في الشق المشبكي، فيتراكم الأستيل كولين ويدوم انفتاح قنوات Na⁺ الكيميائية، مما يولد تواتراً مفرطاً لكمونات العمل وتشنجاً مستمراً',
					achCleft: 240,
					directAchWorks: true,
					postAmp: 30
				},
				{
					nameAr: 'المورفين (مسكن ألم أفيوني)',
					symptomAr: 'تسكين قوي للآلام الحادة في النخاع الشوكي',
					levelAr: 'قبل مشبكي في مشبك الألم (كبح تحرير المادة P)',
					mechanismAr: 'يحاكي الأنسيفالين الداخلي ويرتبط بمستقبلاته على النهاية قبل المشبكية للعصبون الحسي للألم، فيخفض دخول Ca²⁺ ويكبح إطراح المادة P، ما يمنع انتقال الرسالة العصبية للألم نحو الدماغ',
					achCleft: 15,
					directAchWorks: true,
					postAmp: -67
				}
			];
			const tx = rng.pick(toxins);
			const isSpasm = tx.postAmp > 0;

			const recSvg = svgBioCurvePlot({
				title: 'التسجيل الكهربائي بعد المشبكي بغياب وبوجود المادة',
				xMin: 0,
				xMax: 8,
				yMin: -80,
				yMax: 42,
				xStep: 2,
				yStep: 20,
				xLabel: 't (ms)',
				yLabel: 'ddp (mV)',
				curves: [
					{
						fn: (t) => {
							if (t < 1.5) return -70;
							if (t < 2.2) return -70 + 100 * Math.sin(((t - 1.5) / 0.7) * (Math.PI / 2));
							if (t < 3.4) return 30 - 106 * ((t - 2.2) / 1.2);
							if (t < 4.4) return -76 + 6 * ((t - 3.4) / 1.0);
							return -70;
						},
						color: '#16a34a',
						label: 'شاهد طبيعي'
					},
					{
						fn: (t) => {
							if (isSpasm) {
								if (t < 1.5) return -70;
								return -20 + 48 * Math.sin((t - 1.5) * 4.5);
							}
							return -70 + (tx.postAmp + 70) * Math.exp(-Math.pow((t - 2.3) / 0.8, 2));
						},
						color: '#dc2626',
						dashed: true,
						label: 'بوجود المادة'
					}
				],
				dashedGuides: [
					{ x1: 0, y1: -55, x2: 8, y2: -55, color: '#6d28d9', label: '-55 mV', labelPos: 'top' }
				]
			});
			const recUrl = saveSciencesSvgAsset(`sci_${track}_t2_tox_rec_${difficulty}_s${seed}`, recSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = tx.levelAr;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: tx.levelAr.includes('قبل مشبكي') ? 'بعد مشبكي (حجب المستقبلات القنوية)' : 'قبل مشبكي (منع دخول Ca²⁺)', diagnosticFeedback: 'راجع تركيز المبلغ في الشق ونتيجة حقن المبلغ مباشرة في الشق!' },
						{ text: 'تثبيط مضخة Na⁺/K⁺ في الكريات الحمراء', diagnosticFeedback: 'التأثير يقع على مستوى المشبك العصبي.' },
						{ text: 'تخريب الـ ADN في نواة العصبون', diagnosticFeedback: 'الأثر سريع ومباشر على النقل المشبكي.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `تسبب مادة **${tx.nameAr}** عرض «${tx.symptomAr}». تُبيّن القياسات أن نسبة المبلغ في الشق المشبكي تبلغ $${tx.achCleft}\\%$ من الشاهد، وأن حقن المبلغ مباشرة في الشق ${tx.directAchWorks ? 'يُحدث استجابة طبيعية' : 'لا يُحدث أي استجابة'}. ما مستوى تأثير هذه المادة؟`,
					questionTextAr: 'حدد مستوى تأثير المادة على المشبك:',
					imageUrl: recUrl,
					imageCaption: 'التسجيلات الكهربائية في العنصر بعد المشبكي',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `مستوى التأثير هو **${tx.levelAr}** لأن ${tx.mechanismAr}.`
				};
			} else {
				finalAnswer = tx.mechanismAr;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{
							text: isSpasm
								? 'يمنع تحرير الأستيل كولين من الحويصلات فيسبب شللاً رخواً'
								: 'يثبط إنزيم التفكيك AChE فيتراكم المبلغ ويحدث تشنجاً مستمراً',
							diagnosticFeedback: 'طابق النتيجة السريرية والمنحنى الكهربائي (تشنج مفرط أم غياب كمون عمل؟).'
						},
						{ text: 'يحول المشبك الكيميائي إلى مشبك كهربائي', diagnosticFeedback: 'المادة تؤثر في أحد البروتينات المشبكية فقط.' },
						{ text: 'يمنع استنساخ مورثة الأستيل كولين في الشق المشبكي', diagnosticFeedback: 'لا يوجد استنساخ في الشق المشبكي.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `أي آلية جزيئية تفسّر بدقة تأثير **${tx.nameAr}** كما تبرزه الوثيقة المرفقة؟`,
					questionTextAr: 'اختر الآلية الجزيئية الصحيحة:',
					imageUrl: recUrl,
					imageCaption: 'التسجيل الكهربائي بعد المشبكي',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: tx.mechanismAr
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `تؤثر العديد من السموم الطبيعية والأدوية والمبيدات على عمل المشابك الكيميائية، مسبّبةً اضطرابات عصبية قد تكون مميتة أو تُستثمر في الطب (التخدير، التسكين، أو التجميل). نهدف إلى تحديد آلية تأثير **${tx.nameAr}** الذي يسبّب **${tx.symptomAr}**.`,
				content: [
					{
						type: 'text',
						content: `**الجزء الأول**: 1) اقترح ثلاث فرضيات منطقية تحدّد فيها المستويات الممكنة لتأثير **${tx.nameAr}** على النقل المشبكي.`,
						answer: `1) الفرضيات الثلاث:\n- **الفرضية 1 (مستوى قبل مشبكي)**: تؤثر المادة على دخول $upright("Ca")^(2+)$ أو إطراح الحويصلات المشبكية.\n- **الفرضية 2 (مستوى الشق المشبكي)**: تؤثر المادة على نشاط إنزيم تفكيك المبلغ العصبي ($upright("AChE")$).\n- **الفرضية 3 (مستوى بعد مشبكي)**: ترتبط المادة بالمستقبلات القنوية بعد المشبكية فتحجبها أو تنشطها بشكل غير طبيعي.`,
						mark: isMath ? '2.25' : '1.5'
					},
					{
						type: 'columns',
						widths: ['1.15fr', '1fr'],
						children: [
							{ type: 'image', src: recUrl, caption: 'الوثيقة (1): التسجيل الكهربائي بعد المشبكي إثر تنبيه فعال' },
							{
								type: 'table',
								headers: ['المؤشر المقاس في المشبك', 'الشاهد الطبيعي', `بوجود ${tx.nameAr}`],
								cells: [],
								rows: [
									['كمون العمل قبل المشبكي', 'طبيعي (+30 mV)', 'طبيعي (+30 mV)'],
									['كمية المبلغ في الشق (% من الشاهد)', '100%', `${tx.achCleft}%`],
									['الاستجابة عند حقن المبلغ مباشرة في الشق', 'موجبة (+)', tx.directAchWorks ? 'موجبة (+)' : 'منعدمة (−)']
								],
								headerBackground: true,
								borders: 'grid',
								width: 'full'
							}
						]
					},
					{
						type: 'text',
						content: `**الجزء الثاني**: 2) باستغلال منهجي للوثيقة (1) ومعطيات الجدول التجريبي، حدد بدقة موقع تأثير **${tx.nameAr}** واشرح آليته الجزيئية المسبّبة لـ «${tx.symptomAr}»، ثم صادق على الفرضية الصحيحة.`,
						answer: `2) **استغلال الوثيقة (1) والجدول**:\n- كمون العمل قبل المشبكي طبيعي ($+30 upright("mV")$) ← الليف قبل المشبكي سليم.\n- كمية المبلغ في الشق تبلغ $${tx.achCleft}\\%$ من الشاهد، وعند حقن المبلغ مباشرة في الشق تكون الاستجابة ${tx.directAchWorks ? 'موجبة (+) مما يثبت سلامة المستقبلات القنوية بعد المشبكية' : 'منعدمة (−) مما يثبت أن المستقبلات القنوية بعد المشبكية محجوبة'}.\n- يُظهر التسجيل بعد المشبكي ${isSpasm ? 'تواتراً مفرطاً ومستمراً لكمونات العمل' : `غياب كمون العمل (انخفاض شديد في سعة $upright("PPSE")$ عند ${tx.postAmp} mV دون العتبة)`}.\n- **الآلية والمصادقة**: مستوى التأثير هو **${tx.levelAr}** حيث ${tx.mechanismAr}. ومنه نصادق على الفرضية الموافقة وننفي الفرضيتين الأخريين.`,
						mark: isMath ? '7.5' : '5'
					},
					{
						type: 'text',
						content: `**الجزء الثالث**: 3) أنجز **مخططاً تحصيلياً وظيفياً** يوضّح مسار النقل المشبكي مع تحديد موضع وأثر **${tx.nameAr}**.`,
						answer: `3) **المخطط التحصيلي**: وصول كمون عمل قبل مشبكي ← انفتاح قنوات $upright("Ca")^(2+)$ ← إطراح المبلغ العصبي ← تثبته على المستقبلات القنوية بعد المشبكية ← تفكيكه بإنزيم $upright("AChE")$ ← في وجود **${tx.nameAr}** يتعطل المستوى (${tx.levelAr}) ← ${tx.symptomAr}.`,
						mark: isMath ? '2.25' : '1.5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't2',
				difficulty,
				domain: 'neurobiology',
				titleAr: this.titleAr,
				onecRole: 'scientific_approach',
				quizQuestion,
				sujetExercise,
				hints: [
					'افحص الجدول خطوة بخطوة: سلامة كمون العمل قبل المشبكي، نسبة المبلغ في الشق، والاستجابة للحقن المباشر.',
					'الحقن المباشر للمبلغ في الشق يفصل فوراً بين التأثير قبل المشبكي وبعد المشبكي.',
					'اربط الخلل الجزيئي بالعرض السريري (شلل رخو أو تشنج أو تسكين ألم).'
				],
				solutionStepsAr: [
					`كمية المبلغ في الشق: ${tx.achCleft}% | الحقن المباشر: ${tx.directAchWorks ? 'موجب' : 'منعدم'}.`,
					`المستوى: ${tx.levelAr}.`,
					`الآلية: ${tx.mechanismAr}.`
				],
				finalAnswer
			};
		}
	};

	return [
		tplRecallAntibody,
		tplCoopHiv,
		tplApproachCancerImmunotherapy,
		tplRecallSynapseChannels,
		tplReasoningNeuroIntegration,
		tplApproachNeurotoxins
	];
}
