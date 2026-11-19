import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { buildMiniCodonTableRows, transcribeAndTranslate } from '../../bio-helpers';
import {
	saveSciencesSvgAsset,
	svgBioCurvePlot,
	svgBioFlowchart,
	svgImmunologyDiagram
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
	const grade: SciencesSecondaryTrackId = track === '3as_shared' ? '3as_math' : track;
	const lessonPrefix = `sci_lesson_${track === '3as_shared' ? '3as_shared' : track}`;
	return { grade, lessonPrefix };
}

/**
 * Shared Domain 1 T3 Templates (Exclusively Domain 1 — Comprehensive BAC MATH Synthesis!)
 * Strictly ZERO Bioenergetics and ZERO Plate Tectonics!
 * Provides:
 *   1. Recall (8 pts): Functional unity of proteins across all 5 units of Domain 1
 *   2. Scientific Approach (12 pts): Ion channelopathy mutation (Unit 1 + Unit 2 + Unit 5)
 *   3. Scientific Approach (12 pts): Myasthenia Gravis & Neostigmine (Unit 4 + Unit 3 + Unit 5)
 */
export function createSharedSciencesTemplates3asDomain1T3(
	track: TrackTag = '3as_math'
): SciencesParameterizedTemplate[] {
	const { grade, lessonPrefix } = makeTrackMeta(track);

	// ─────────────────────────────────────────────────────────────────────────
	// 1. RECALL (8 pts): Functional Unity & Structural Complementarity across Domain 1
	// ─────────────────────────────────────────────────────────────────────────
	const tplRecallDomain1Unity: SciencesParameterizedTemplate = {
		id: 'sci_tpl_3as_shared_t3_recall_domain1_unity',
		grade,
		trimesterId: 't3',
		domain: 'integration',
		titleAr: 'استرجاع منظم: التكامل البنيوي والتخصص الوظيفي للبروتينات في وحدات المجال الأول (+ نص علمي)',
		curriculumLessonId: `${lessonPrefix}_t3_domain1_bac_synthesis`,
		defaultPoints: 8,
		onecRole: 'recall',
		generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const proteinCards = [
				{ prot: 'إنزيم غلوكوز أوكسيداز', partner: 'الغلوكوز (الركيزة)', unit: 'النشاط الإنزيمي', role: 'التكامل المحفّز بالموقع الفعال وتسريع الأكسدة' },
				{ prot: 'الجسم المضاد (IgG)', partner: 'المحدد المستضدي', unit: 'الدفاع عن الذات', role: 'تشكيل معقد مناعي يبطل مفعول المستضد ويسهل البلعمـة' },
				{ prot: 'مستقبل TCR على LTc', partner: 'معقد (CMH I – ببتيد مستضدي)', unit: 'الدفاع عن الذات', role: 'التعرف المزدوج وتحفيز إفراز البرفورين' },
				{ prot: 'المستقبل القنوي للأستيل كولين', partner: 'الأستيل كولين (ACh)', unit: 'الاتصال العصبي', role: 'انفتاح القناة الكيميائية ودخول Na⁺ وتوليد PPSE' }
			];
			const focus = rng.pick(proteinCards);

			const flowSvg = svgBioFlowchart({
				title: 'وحدة التخصص الوظيفي للبروتينات في المجال الأول',
				orientation: 'horizontal',
				width: 470,
				steps: [
					{ label: 'التعبير المورثي', sublabel: 'استنساخ وترجمة', color: '#1d4ed8', bg: '#eff6ff', arrowLabel: 'انطواء' },
					{ label: 'بنية فراغية', sublabel: 'روابط مثبتة نوعية', color: '#0f766e', bg: '#f0fdfa', arrowLabel: 'تكامل' },
					{ label: 'تحفيز ومناعة', sublabel: 'إنزيمات وأجسام مضادة', color: '#b45309', bg: '#fffbeb', arrowLabel: 'تواصل' },
					{ label: 'اتصال عصبي', sublabel: 'قنوات ومستقبلات', color: '#7c3aed', bg: '#f5f3ff' }
				]
			});
			const flowUrl = saveSciencesSvgAsset(`sci_${track}_t3_dom1_unity_${difficulty}_s${seed}`, flowSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = focus.partner;
				const others = proteinCards.filter((p) => p.prot !== focus.prot).map((p) => ({
					text: p.partner,
					diagnosticFeedback: `هذا الجزيء يرتبط تكاملياً بـ ${p.prot} في وحدة ${p.unit} وليس بـ ${focus.prot}.`
				}));
				const mcq = buildUniqueMcqOptions(finalAnswer, others, rng);
				quizQuestion = {
					type: 'mcq',
					questionText: `في إطار التخصص الوظيفي للبروتينات، ما هو الجزيء الذي يتكامل بنيوياً ونوعياً مع **${focus.prot}**؟`,
					questionTextAr: 'اختر الجزيء المتكامل بنيوياً:',
					imageUrl: flowUrl,
					imageCaption: 'التكامل البنيوي أساس التخصص الوظيفي للبروتينات',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `يرتبط ${focus.prot} تكاملياً بـ ${focus.partner} لأداء دوره: ${focus.role}.`
				};
			} else {
				finalAnswer = 'التكامل البنيوي النوعي الناتج عن البنية الفراغية ثلاثية الأبعاد المحددة وراثياً';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'امتلاك جميع البروتينات لنفس عدد الأحماض الأمينية', diagnosticFeedback: 'تختلف البروتينات كثيراً في عدد ونوع وترتيب أحماضها الأمينية.' },
						{ text: 'عمل جميع البروتينات في وسط حامضي pH = 2', diagnosticFeedback: 'لكل بروتين مجال pH فيزيولوجي خاص به.' },
						{ text: 'ارتباط جميع البروتينات بالـ ADN داخل النواة', diagnosticFeedback: 'معظم هذه البروتينات تعمل في الهيولى أو الغشاء أو البلازما.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: 'ما المبدأ الجزيئي الموحِّد الذي يجمع عمل الإنزيمات، الأجسام المضادة، مستقبلات الـ $\\text{TCR}$، والمستقبلات المشبكية؟',
					questionTextAr: 'اختر المبدأ العلمي الجامع للمجال الأول:',
					imageUrl: flowUrl,
					imageCaption: 'وحدة التخصص الوظيفي للبروتينات',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: finalAnswer
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: 8,
				instruction: `تضطلع البروتينات بأدوار حيوية بالغة التنوع في العضوية (تحفيز كيميائي، دفاع مناعي، واتصال عصبي)، غير أن جميع هذه الوظائف تشترك في أساس جزيئي موحَّد يربط المعلومة الوراثية بالبنية الفراغية.`,
				content: [
					{
						type: 'image',
						src: flowUrl,
						caption: 'الوثيقة: تسلسل اكتساب التخصص الوظيفي للبروتينات عبر وظائفها'
					},
					{
						type: 'table',
						headers: ['البروتين الوظيفي', 'الجزيء المتكامل معه', 'الوحدة / الوظيفة الحيوية'],
						cells: [],
						rows: proteinCards.map((p) => [
							p.prot,
							{ content: '........', answer: p.partner },
							{ content: '........', answer: `${p.unit}: ${p.role}` }
						]),
						headerBackground: true,
						borders: 'grid',
						width: 'full'
					},
					{
						type: 'text',
						content: `1) أكمل الجدول المقارن أعلاه بتحديد الجزيء المتكامل بنيوياً والوظيفة الحيوية لكل بروتين.`,
						answer: `1) إكمال الجدول: (1) غلوكوز أوكسيداز ← الغلوكوز (تحفيز الأكسدة بالتكامل المحفّز)؛ (2) الجسم المضاد ← المحدد المستضدي (معقد مناعي يبطل المفعول ويسهل البلعمة)؛ (3) مستقبل $upright("TCR")$ ← معقد $upright("CMH I")$–ببتيد (تعرف مزدوج وتحفيز إفراز البرفورين)؛ (4) مستقبل الأستيل كولين ← الأستيل كولين (فتح القناة الكيميائية ودخول $upright("Na")^+$ وتوليد $upright("PPSE")$).`,
						mark: '3'
					},
					{
						type: 'text',
						content: `2) اكتب **نصاً علمياً مهيكلاً** تبيّن فيه كيف تنشأ العلاقة الدقيقة بين التعبير المورثي، البنية الفراغية ثلاثية الأبعاد، والتكامل البنيوي الذي يضمن التخصص الوظيفي للبروتينات في التحفيز الإنزيمي والدفاع عن الذات والاتصال العصبي.`,
						answer: `2) **نص علمي مهيكل**:\n- **المقدمة والإشكالية**: تتنوع وظائف البروتينات في العضوية بين إنزيمات ومستقبلات مناعية وقنوات عصبية، ومع ذلك تخضع كلها لمبدأ التخصص الوظيفي الدقيق. فكيف يُكسب التعبير المورثي البروتينات بنيتها الفراغية التي تسمح لها بأداء وظائفها النوعية في مختلف الأجهزة؟\n- **العرض**: ينطلق بناء كل بروتين من التعبير المورثي (الاستنساخ في النواة عبر $upright("ARN")$ بوليميراز ثم الترجمة في الهيولى عبر الريبوزومات والـ $upright("ARNt")$) لتشكيل **بنية أولية** محددة عدداً ونوعاً وترتيباً. تتحكم هذه البنية الأولية في نشوء روابط كيميائية محددة (هيدروجينية في الثانوية، وجسور $upright("S-S")$ وروابط شاردية وهيدروجينية وكارهة للماء في الثالثية والرابعية) تُكسب البروتين **بنية فراغية مستقرة** تحتوي على مواقع ارتباط نوعية. يُتجلى هذا التخصص عبر **التكامل البنيوي**: (أ) في **الإنزيمات**: تكامل محفّز بين الموقع الفعال والركيزة؛ (ب) في **المناعة**: تكامل $upright("BCR")$ والأجسام المضادة مع المحددات المستضدية، والتعرف المزدوج لـ $upright("TCR")$ مع معقد $upright("CMH")$–ببتيد؛ (جـ) في **الاتصال العصبي**: تكامل المبلغات العصبية ($upright("ACh")$, $upright("GABA")$) مع القنوات المبوبة كيميائياً وانفتاح القنوات الفولطية النوعية للشوارد. وأي طفرة وراثية أو تغير متطرف في الـ $upright("pH")$ أو الحرارة يخرب البنية الفراغية فيفقد البروتين وظيفته.\n- **الخاتمة**: يشكل التكامل البنيوي المنبثق عن البنية الفراغية المحددة وراثياً حجر الأساس للتخصص الوظيفي للبروتينات واستمرارية الحياة.`,
						mark: '5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't3',
				difficulty,
				domain: 'integration',
				titleAr: this.titleAr,
				onecRole: 'recall',
				quizQuestion,
				sujetExercise,
				hints: [
					'اربط كل بروتين في الجدول بالجزيء النوعي الذي يتكامل معه فراغياً.',
					'ابنِ النص العلمي حول الخيط الناظم: مورثة ← بنية أولية ← روابط ← بنية فراغية ← تكامل بنيوي ← تخصص وظيفي.',
					'اذكر مثالاً دقيقاً لكل مجال وظيفي (الإنزيمات، المناعة، الاتصال العصبي).'
				],
				solutionStepsAr: [
					'إكمال الجدول المقارن بدقة للأربعة بروتينات.',
					'نص علمي مهيكل يدمج الوحدات الخمس للمجال الأول حول مفهوم التكامل البنيوي.'
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 2. SCIENTIFIC APPROACH (12 pts): Genetic Ion Channelopathy (Unit 1 + Unit 2 + Unit 5)
	// ─────────────────────────────────────────────────────────────────────────
	const tplApproachChannelopathy: SciencesParameterizedTemplate = {
		id: 'sci_tpl_3as_shared_t3_approach_channelopathy_mutation',
		grade,
		trimesterId: 't3',
		domain: 'integration',
		titleAr: 'مسعى علمي شامل: طفرة وراثية في قناة عصبية (دمج تركيب البروتين + البنية + الاتصال العصبي)',
		curriculumLessonId: `${lessonPrefix}_t3_domain1_bac_synthesis`,
		defaultPoints: 12,
		isIntegration: true,
		onecRole: 'scientific_approach',
		generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			// Authentic-style channelopathy variants computed with transcribeAndTranslate!
			const cases = [
				{
					diseaseAr: 'الصرع الوراثي المقاوم (خلل القناة الكيميائية لـ Cl⁻)',
					channelAr: 'المستقبل القنوي للـ GABA (قناة Cl⁻)',
					norm3to5: 'TACGCTGGACTACGAACT',
					mut3to5: 'TACGCTGGACATCGAACT',
					ionAr: 'Cl⁻',
					effectAr: 'توقف دخول شوارد Cl⁻ عند ارتباط الـ GABA فيغيب الكمون المثبط PPSI وترتفع الاستثارية العصبية محدثة نوبات صرع',
					ppsiNorm: -79,
					ppsiMut: -71
				},
				{
					diseaseAr: 'التوتر العضلي الوراثي (خلل القناة الفولطية لـ Na⁺)',
					channelAr: 'القناة الفولطية لـ Na⁺',
					norm3to5: 'TACTTCCGAATGGACACT',
					mut3to5: 'TACTTCCGAATTGACACT',
					ionAr: 'Na⁺',
					effectAr: 'تأخر انغلاق (تثبيط) القناة الفولطية لـ Na⁺ مما يطيل دخول Na⁺ ويولّد تواتراً مفرطاً لكمونات العمل وتشنجات عضلية',
					ppsiNorm: -70,
					ppsiMut: -48
				}
			];
			const c = rng.pick(cases);
			const isGaba = c.ionAr === 'Cl⁻';
			const normSeq = transcribeAndTranslate(c.norm3to5);
			const mutSeq = transcribeAndTranslate(c.mut3to5);
			const codonTable = buildMiniCodonTableRows([...normSeq.codons, ...mutSeq.codons]);

			const recSvg = svgBioCurvePlot({
				title: 'مقارنة التسجيل الكهربائي بين الشخص السليم والمصاب',
				xMin: 0,
				xMax: 8,
				yMin: -85,
				yMax: 40,
				xStep: 2,
				yStep: 20,
				xLabel: 't (ms)',
				yLabel: 'ddp (mV)',
				curves: isGaba
					? [
							{ fn: (t) => -70 - 9 * Math.exp(-Math.pow((t - 3) / 0.85, 2)), color: '#16a34a', label: 'شخص سليم' },
							{ fn: (t) => -70 - 1 * Math.exp(-Math.pow((t - 3) / 0.85, 2)), color: '#dc2626', dashed: true, label: 'شخص مصاب' }
						]
					: [
							{
								fn: (t) => (t < 1.2 ? -70 : t < 2.0 ? -70 + 100 * Math.sin(((t - 1.2) / 0.8) * (Math.PI / 2)) : t < 3.2 ? 30 - 105 * ((t - 2.0) / 1.2) : -70),
								color: '#16a34a',
								label: 'شخص سليم'
							},
							{
								fn: (t) => (t < 1.2 ? -70 : -15 + 42 * Math.sin((t - 1.2) * 4.2)),
								color: '#dc2626',
								dashed: true,
								label: 'شخص مصاب'
							}
						],
				dashedGuides: [{ x1: 0, y1: -55, x2: 8, y2: -55, color: '#6d28d9', label: '-55 mV', labelPos: 'top' }]
			});
			const recUrl = saveSciencesSvgAsset(`sci_${track}_t3_chanmut_${difficulty}_s${seed}`, recSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = mutSeq.peptideStr;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: normSeq.peptideStr, diagnosticFeedback: 'هذه متتالية القناة السليمة قبل الطفرة.' },
						{ text: [...mutSeq.peptide].reverse().join(' - '), diagnosticFeedback: 'عكست اتجاه قراءة الـ ARNm.' },
						{ text: `${mutSeq.peptideStr} - STOP`, diagnosticFeedback: 'رامزة التوقف لا تشفر لحمض أميني.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في دراسة **${c.diseaseAr}**، السلسلة المستنسخة الطافرة لمورثة ${c.channelAr} هي \`${mutSeq.dnaTriplets.join('-')}\`. ما متتالية الأحماض الأمينية الطافرة؟`,
					questionTextAr: 'اختر المتتالية الببتيدية الطافرة:',
					imageUrl: recUrl,
					imageCaption: 'التسجيلات الكهربائية العصبية',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الـ ARNm الطافر \`${mutSeq.codons.join('-')}\` يعطي \`${mutSeq.peptideStr}\` بينما الطبيعي \`${normSeq.codons.join('-')}\` يعطي \`${normSeq.peptideStr}\`.`
				};
			} else {
				finalAnswer = c.effectAr;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{
							text: isGaba
								? 'انفتاح مفرط لقنوات Cl⁻ وحدوث فرط استقطاب دائم (−90 mV)'
								: 'انغلاق دائم لقنوات Na⁺ الفولطية وغياب تام لأي كمون عمل',
							diagnosticFeedback: 'طابق مع التسجيل الكهربائي للمصاب في الوثيقة!'
						},
						{ text: 'تخريب الأجسام المضادة في البلازما', diagnosticFeedback: 'الخلل وراثي يمس قناة عصبية وليس مناعياً.' },
						{ text: 'انعدام مضخة Na⁺/K⁺ في الكريات الحمراء', diagnosticFeedback: 'الطفرة في مورثة قناة عصبية.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `انطلاقاً من مقارنة التسجيلين الكهربائيين في **${c.diseaseAr}**، كيف تفسّر الاضطراب العصبي؟`,
					questionTextAr: 'اختر التفسير الفيزيولوجي الدقيق:',
					imageUrl: recUrl,
					imageCaption: 'مقارنة التسجيل الكهربائي بين السليم والمصاب',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: c.effectAr
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: 12,
				instruction: `تُسبب بعض الطفرات الوراثية أمراضاً عصبية تُعرف باعتلالات القنوات الأيونية مثل **${c.diseaseAr}**، مما يبرهن على العلاقة الوثيقة بين المعلومة الوراثية والبنية الفراغية للبروتينات الغشائية ووظيفة الاتصال العصبي.`,
				content: [
					{
						type: 'text',
						content: `**الجزء الأول**: 1) حلّل التسجيلين الكهربائيين في الوثيقة (1) ثم اقترح فرضية تفسّر بها الأصل الجزيئي لـ **${c.diseaseAr}**.`,
						answer: `1) **التحليل**: ${isGaba ? `عند السليم يولّد تنبيه المشبك التثبيطي فرط استقطاب ($upright("PPSI")$ يبلغ $${c.ppsiNorm} upright("mV")$)؛ بينما عند المصاب يكاد الـ $upright("PPSI")$ ينعدم ($${c.ppsiMut} upright("mV")$).` : `عند السليم يولّد التنبيه كمون عمل واحداً عادياً يعود للراحة ($-70 upright("mV")$)؛ بينما عند المصاب تتوالى كمونات عمل مفرطة دون عودة سريعة للراحة.`}\n- **الفرضية**: حدوث طفرة في مورثة **${c.channelAr}** أدت لتغير بنيتها الفراغية واختلال تدفق شوارد **$${c.ionAr}$**.`,
						mark: '3'
					},
					{
						type: 'columns',
						widths: ['1.15fr', '1fr'],
						children: [
							{ type: 'image', src: recUrl, caption: 'الوثيقة (1): التسجيل الكهربائي عند السليم والمصاب' },
							{
								type: 'table',
								headers: ['الأليل', 'السلسلة المستنسخة (3\' → 5\')'],
								cells: [],
								rows: [
									['أليل سليم', normSeq.dnaTriplets.join(' - ')],
									['أليل طافر', mutSeq.dnaTriplets.join(' - ')]
								],
								headerBackground: true,
								borders: 'grid',
								width: 'full'
							}
						]
					},
					{
						type: 'table',
						headers: codonTable.headers,
						cells: [],
						rows: codonTable.rows,
						headerBackground: true,
						borders: 'grid',
						width: 'full'
					},
					{
						type: 'text',
						content: `**الجزء الثاني**: 2) باستغلال الجدولين (الأليلين وجدول الشفرة الوراثية)، استخرج متتاليتي $upright("ARNm")$ والأحماض الأمينية ثم حدد نوع الطفرة الوراثية بدقة.`,
						answer: `2) الأليل السليم: $upright("ARNm")$ = ${normSeq.codons.join(' - ')} ← الببتيد: **${normSeq.peptideStr}**.\n- الأليل الطافر: $upright("ARNm")$ = ${mutSeq.codons.join(' - ')} ← الببتيد: **${mutSeq.peptideStr}**.\n- نوع الطفرة: **طفرة استبدال خاطئة المعنى** في الرامزة الرابعة أدت لتغيير حمض أميني في الجزء الوظيفي للقناة.`,
						mark: '3.75'
					},
					{
						type: 'text',
						content: `3) بدمج نتائجك (الوحدات 1 و2 و5)، فسّر السلسلة السببية الكاملة من الطفرة الوراثية إلى ظهور أعراض **${c.diseaseAr}**، وصادق على الفرضية.`,
						answer: `3) أدت طفرة الاستبدال إلى تغيير حمض أميني نوعي في **${c.channelAr}**، مما غيّر الروابط المثبتة لبنيتها الفراغية وشوّه تجويف القناة (أو بوابة التثبيط). ونتيجة لذلك: ${c.effectAr}. وهذا يصادق تماماً على صحة الفرضية المقترحة.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `**الجزء الثالث**: 4) أنجز مخططاً تحصيلياً يدمج المعلومة الوراثية، بنية القناة الغشائية، وآلية الخلل العصبي في **${c.diseaseAr}**.`,
						answer: `4) **المخطط التحصيلي**: طفرة استبدال في مورثة ${c.channelAr} ← استنساخ وترجمة سلسلة ببتيدية متغيرة (${mutSeq.peptideStr}) ← تغير الروابط والبنية الفراغية للقناة ← خلل تدفق شوارد ${c.ionAr} ← ${isGaba ? 'غياب PPSI وفقدان الكبح العصبي ← نوبات الصرع' : 'تواتر مفرط لكمونات العمل ← التوتر والتشنج العضلي'}.`,
						mark: '2.25'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't3',
				difficulty,
				domain: 'integration',
				titleAr: this.titleAr,
				onecRole: 'scientific_approach',
				quizQuestion,
				sujetExercise,
				hints: [
					'قارن التسجيلين الكهربائيين لتحديد القناة والشاردة المتأثرة (Cl⁻ أم Na⁺).',
					'استخرج الـ ARNm والببتيد للأليلين بدقة باستغلال جدول الشفرة الوراثية.',
					'اربط الوحدات الثلاث في التفسير والمخطط: طفرة ← بنية القناة ← خلل كهربائي.'
				],
				solutionStepsAr: [
					`الببتيد السليم: ${normSeq.peptideStr} | الطافر: ${mutSeq.peptideStr}.`,
					`الطفرة غيّرت البنية الفراغية لـ ${c.channelAr}.`,
					`النتيجة العصبية: ${c.effectAr}.`
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 3. SCIENTIFIC APPROACH (12 pts): Myasthenia Gravis & Neostigmine
	//    (ICONIC BAC INTEGRATION: Unit 4 Immunology + Unit 3 Enzymes + Unit 5 Neurobiology!)
	// ─────────────────────────────────────────────────────────────────────────
	const tplApproachMyastheniaGravis: SciencesParameterizedTemplate = {
		id: 'sci_tpl_3as_shared_t3_approach_myasthenia_gravis',
		grade,
		trimesterId: 't3',
		domain: 'integration',
		titleAr: 'مسعى علمي شامل: داء الوهن العضلي الوخيم وعلاجه بالنيوستيغمين (المناعة + الإنزيمات + الاتصال العصبي)',
		curriculumLessonId: `${lessonPrefix}_t3_domain1_bac_synthesis`,
		defaultPoints: 12,
		isIntegration: true,
		onecRole: 'scientific_approach',
		generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const recPctPatient = rng.pick([22, 26, 30]);
			const ppsePatient = rng.pick([-64, -62, -61]);
			const ppseTreated = rng.pick([-46, -42, -38]);

			const mgCurve = svgBioCurvePlot({
				title: 'الكمون بعد المشبكي في اللوحة المحركة قبل وبعد العلاج',
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
						fn: (t) => -70 + (ppsePatient + 70) * Math.exp(-Math.pow((t - 2.6) / 0.8, 2)),
						color: '#dc2626',
						label: 'مريض بدون علاج'
					},
					{
						fn: (t) => {
							if (t < 1.6) return -70;
							if (t < 2.4) return -70 + 100 * Math.sin(((t - 1.6) / 0.8) * (Math.PI / 2));
							if (t < 3.6) return 30 - 106 * ((t - 2.4) / 1.2);
							if (t < 4.7) return -76 + 6 * ((t - 3.6) / 1.1);
							return -70;
						},
						color: '#16a34a',
						dashed: true,
						label: 'مريض + نيوستيغمين'
					}
				],
				dashedGuides: [
					{ x1: 0, y1: -55, x2: 8, y2: -55, color: '#6d28d9', label: '-55 mV', labelPos: 'top' }
				]
			});
			const abSvg = svgImmunologyDiagram('antibody_complex', {
				title: 'ارتباط الأجسام المضادة الذاتية بالمستقبلات الغشائية'
			});
			const curveUrl = saveSciencesSvgAsset(`sci_${track}_t3_mg_curve_${difficulty}_s${seed}`, mgCurve);
			const abUrl = saveSciencesSvgAsset(`sci_${track}_t3_mg_ab_${difficulty}_s${seed}`, abSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = 'أجسام مضادة ذاتية ترتبط بمستقبلات الأستيل كولين القنوية فتحجبها وتقلص سعة PPSE دون العتبة';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'غياب تحرير الأستيل كولين من الحويصلات قبل المشبكية', diagnosticFeedback: 'كمية الأستيل كولين المحررة طبيعية 100%؛ المشكلة في المستقبلات بعد المشبكية.' },
						{ text: 'طفرة في إنزيم ARN بوليميراز العضلي', diagnosticFeedback: 'الوهن العضلي مرض مناعي ذاتي مكتسب بالأجسام المضادة.' },
						{ text: 'زيادة نشاط قنوات Cl⁻ في العضلة', diagnosticFeedback: 'المشبك العصبي-العضلي مشبك تنبيهي كولينيرجي فقط.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في داء الوهن العضلي الوخيم، تنخفض نسبة مستقبلات الأستيل كولين الوظيفية إلى $${recPctPatient}\\%$ ويبلغ $\\text{PPSE} = ${ppsePatient}\\text{ mV}$. ما السبب المناعي المباشر لهذا الضعف العضلي؟`,
					questionTextAr: 'اختر السبب الجزيئي لداء الوهن العضلي:',
					imageUrl: abUrl,
					imageCaption: 'الأجسام المضادة الذاتية الموجهة ضد مستقبلات ACh',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: 'تنتج العضوية أجساماً مضادة ذاتية تتثبت على المستقبلات القنوية للأستيل كولين في الغشاء بعد المشبكي للعضلة فتمنع ارتباط ACh وتخفض PPSE دون العتبة (−55 mV).'
				};
			} else if (difficulty === 'medium') {
				finalAnswer = 'مثبط تنافسي لإنزيم AChE يطيل بقاء الأستيل كولين في الشق لرفع احتمالية ارتباطه بالمستقبلات المتبقية';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'يقوم بتفكيك الأستيل كولين بسرعة أكبر', diagnosticFeedback: 'تفكيك ACh بسرعة يفاقم الشلل ولا يعالجه!' },
						{ text: 'يغلق قنوات Ca²⁺ في النهاية قبل المشبكية', diagnosticFeedback: 'إغلاق قنوات Ca²⁺ يمنع تحرير ACh ويسبب شللاً كاملاً.' },
						{ text: 'يُنتج أليافاً عضلية جديدة خلال دقائق', diagnosticFeedback: 'التحسن السريع ناتج عن تثبيط إنزيم AChE في الشق المشبكي.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: 'كيف يُعيد دواء **النيوستيغمين** توليد كمون العمل العضلي وتحسن قوة المريض المصاب بالوهن العضلي الوخيم؟',
					questionTextAr: 'اختر آلية العلاج بالنيوستيغمين:',
					imageUrl: curveUrl,
					imageCaption: 'استعادة كمون العمل العضلي بعد إعطاء النيوستيغمين',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: 'يعمل النيوستيغمين كمثبط تنافسي لإنزيم الأستيل كولين إستيراز (AChE)، فيبقى الأستيل كولين لمدة أطول وبتركيز أعلى في الشق المشبكي ويرتبط بالمستقبلات السليمة المتبقية فتبلغ سعة PPSE العتبة.'
				};
			} else {
				const deltaPpse = roundTo(ppseTreated - ppsePatient, 1);
				finalAnswer = `${deltaPpse}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `ارتفع الكمون بعد المشبكي في اللوحة المحركة بفضل النيوستيغمين من $${ppsePatient}\\text{ mV}$ إلى قيمة تتجاوز العتبة ($${ppseTreated}\\text{ mV}$ قبل انطلاق كمون العمل). احسب مقدار هذا الارتفاع ($\\Delta V$ بوحدة $\\text{mV}$).`,
					questionTextAr: 'احسب مقدار الارتفاع ΔV بوحدة mV:',
					imageUrl: curveUrl,
					imageCaption: 'أثر النيوستيغمين على سعة PPSE',
					questionData: { answer: deltaPpse, displayTemplate: 'ΔV = ? mV', variables: [], tolerance: 0.2 },
					explanation: `$\\Delta V = (${ppseTreated}) - (${ppsePatient}) = +${deltaPpse}\\text{ mV}$ مما مكن الغشاء العضلي من تجاوز العتبة ($-55\\text{ mV}$) وتوليد كمون عمل وتقلص عضلي.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: 12,
				instruction: `يُعد **داء الوهن العضلي الوخيم (Myasthénie)** نموذجاً طبياً فريداً يبرز التكامل بين **المناعة والإنزيمات والاتصال العصبي**؛ إذ يعاني المصاب من إرهاق وارتخاء شديد في العضلات الهيكلية رغم سلامة الأعصاب المحركة والألياف العضلية، وتتحسن أعراضه مؤقتاً بتناول دواء **النيوستيغمين**.`,
				content: [
					{
						type: 'text',
						content: `**الجزء الأول**: يُظهر تحليل مصل المريض ارتفاعاً ملحوظاً في نوع من الغلوبيولينات المناعية ($upright("IgG")$)، كما يُسجَّل في المشبك العصبي-العضلي $upright("PPSE")$ ضعيف لا يتجاوز $${ppsePatient} upright("mV")$ (دون عتبة $-55 upright("mV")$).\n1) اطرح مشكلاً علمياً ثم اقترح فرضية تفسّر بها سبب الضعف العضلي لدى المصاب.`,
						answer: `1) **المشكل العلمي**: كيف تسبّب الغلوبيولينات المناعية ضعف النقل العصبي-العضلي، وكيف يعالجه دواء النيوستيغمين؟\n- **الفرضية**: تُنتج العضوية أجساماً مضادة ذاتية ترتبط تكاملياً بالمستقبلات القنوية للأستيل كولين في الغشاء بعد المشبكي فتحجبها وتمنع تشكل $upright("PPSE")$ يبلغ العتبة.`,
						mark: '2.25'
					},
					{
						type: 'columns',
						widths: ['1.15fr', '1fr'],
						children: [
							{ type: 'image', src: curveUrl, caption: 'الوثيقة (1): التسجيل الكهربائي العضلي قبل وبعد النيوستيغمين' },
							{ type: 'image', src: abUrl, caption: 'الوثيقة (2): بنية الجسم المضاد وارتباطه بالمستضد الذاتي' }
						]
					},
					{
						type: 'table',
						headers: ['المؤشر البيولوجي في المشبك العصبي-العضلي', 'شخص سليم', 'مريض بدون علاج', 'مريض + نيوستيغمين'],
						cells: [],
						rows: [
							['كمية الأستيل كولين المحرّرة من الزر', '100%', '100%', '100%'],
							['نسبة مستقبلات ACh القنوية الحرة والوظيفية', '100%', `${recPctPatient}%`, `${recPctPatient}%`],
							['نشاط إنزيم الأستيل كولين إستيراز (AChE)', '100%', '100%', '18% (مثبّط تنافسياً)'],
							['تقلص العضلة إثر التنبيه', 'طبيعي قوي', 'ضعيف جداً / غائب', 'استعادة التقلص']
						],
						headerBackground: true,
						borders: 'grid',
						width: 'full'
					},
					{
						type: 'text',
						content: `**الجزء الثاني**: 2) باستغلال الوثيقتين (1) و(2) ومعطيات الجدول، برهن على الطبيعة المناعية الذاتية للمرض واشرح بدقة سبب غياب التقلص العضلي عند المريض غير المعالج، ثم صادق على فرضيتك.`,
						answer: `2) **الاستغلال والشرح**: يُظهر الجدول أن كمية الأستيل كولين المحرّرة طبيعية ($100\%$) مما يبرّئ النهاية قبل المشبكية؛ في المقابل انخفضت نسبة مستقبلات $upright("ACh")$ الحرة إلى $${recPctPatient}\\%$ بسبب ارتباط **أجسام مضادة ذاتية** (الوثيقة 2) بمستقبلات الأستيل كولين القنوية (تشكيل معقدات مناعية تحجب الموقع وتسرّع تخريبها). يقلّ بذلك عدد قنوات $upright("Na")^+$ المفتوحة فلا تتجاوز سعة $upright("PPSE")$ قيمة $${ppsePatient} upright("mV")$ (دون عتبة $-55 upright("mV")$)، فلا يتولد كمون عمل عضلي ويحدث الوهن العضلي. ومنه **نصادق على صحة الفرضية**.`,
						mark: '3.75'
					},
					{
						type: 'text',
						content: `3) اشرح الآلية الإنزيمية والعصبية التي يمكّن بها دواء **النيوستيغمين** المريض من استعادة تقلص عضلاته رغم بقاء نسبة المستقبلات الحرة عند $${recPctPatient}\\%$.`,
						answer: `3) يعمل دواء **النيوستيغمين** كـ **مثبط إنزيمي تنافسي** لإنزيم الأستيل كولين إستيراز ($upright("AChE")$)، فينخفض نشاط التفكيك إلى $18\%$. يؤدي ذلك إلى إطالة مدة بقاء الأستيل كولين وارتفاع تركيزه في الشق المشبكي، فتزداد فرص ارتباطه بأكبر عدد ممكن من المستقبلات المتبقية ($${recPctPatient}\\%$) وتدخل كمية كافية من $upright("Na")^+$ لرفع سعة $upright("PPSE")$ فوق العتبة ($-55 upright("mV")$) وتوليد كمون عمل عضلي ($+30 upright("mV")$) واستعادة التقلص.`,
						mark: '3.75'
					},
					{
						type: 'text',
						content: `**الجزء الثالث**: 4) أنجز **مخططاً تحصيلياً وظيفياً** يدمج آلية مرض الوهن العضلي (مناعة + اتصال عصبي) وآلية العلاج بالنيوستيغمين (إنزيمات + اتصال عصبي).`,
						answer: `4) **المخطط التحصيلي**:\n- **المرض**: اختلال مناعي ذاتي ← أجسام مضادة ضد مستقبلات $upright("ACh")$ ← حجب ${100 - recPctPatient}% من القنوات الكيميائية ← دخول ضعيف لـ $upright("Na")^+$ ← $upright("PPSE")$ دون العتبة ← وهن عضلي.\n- **العلاج**: دواء النيوستيغمين ← تثبيط تنافسي لإنزيم $upright("AChE")$ ← تراكم وإطالة بقاء $upright("ACh")$ في الشق ← تنشيط أعظمي للمستقبلات المتبقية ($${recPctPatient}\\%$) ← بلوغ العتبة وتوليد كمون عمل عضلي ← استعادة التقلص.`,
						mark: '2.25'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't3',
				difficulty,
				domain: 'integration',
				titleAr: this.titleAr,
				onecRole: 'scientific_approach',
				quizQuestion,
				sujetExercise,
				hints: [
					'تحقق من الجدول: تحرير ACh سليم 100% لكن المستقبلات الحرة انخفضت بسبب الأجسام المضادة الذاتية.',
					'النيوستيغمين يثبط إنزيم AChE (وحدة الإنزيمات) فيرفع تركيز وبقاء ACh في الشق (وحدة الاتصال العصبي).',
					'اختم بمخطط تحصيلي بفرعين: آلية المرض وآلية العلاج.'
				],
				solutionStepsAr: [
					`تحرير ACh = 100% لكن الأجسام المضادة الذاتية تحجب مستقبلاته (تبقى ${recPctPatient}%) ← PPSE = ${ppsePatient} mV < −55 mV.`,
					'النيوستيغمين مثبط تنافسي لـ AChE (ينخفض نشاطه إلى 18%) ← تراكم ACh ← استعادة كمون العمل العضلي (+30 mV).'
				],
				finalAnswer
			};
		}
	};

	return [tplRecallDomain1Unity, tplApproachChannelopathy, tplApproachMyastheniaGravis];
}
