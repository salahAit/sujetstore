import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import {
	aminoAcidChargeAtPh,
	BIO_EQUATIONS,
	buildMiniCodonTableRows,
	transcribeAndTranslate
} from '../../bio-helpers';
import {
	saveSciencesSvgAsset,
	svgBioCurvePlot,
	svgBioFlowchart,
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
 * Shared Domain 1 Templates — T1 (Units 1, 2, 3: Protein Synthesis, Protein Structure, Enzymology)
 * Used in full (6 templates: 2 recall [5pt] + 2 reasoning [7pt] + 2 approach [8pt]) by 3AS SE T1,
 * and adapted with official 8pt/12pt BAC MATH weights by 3AS MATH T1 & T2.
 */
export function createSharedSciencesTemplates3asT1(
	track: TrackTag = '3as_shared'
): SciencesParameterizedTemplate[] {
	const { grade, isMath, lessonPrefix } = makeTrackMeta(track);

	// ─────────────────────────────────────────────────────────────────────────
	// 1. RECALL (5 pts SE / 8 pts MATH): Ribosome, Translation & Structured Scientific Text
	// ─────────────────────────────────────────────────────────────────────────
	const tplRecallTranslation: SciencesParameterizedTemplate = {
		id: 'sci_tpl_3as_shared_t1_recall_translation_ribosome',
		grade,
		trimesterId: 't1',
		domain: 'protein_synthesis',
		titleAr: 'استرجاع منظم: بنية الريبوزوم، آلية الترجمة، ونص علمي مهيكل حول التعبير المورثي',
		curriculumLessonId: `${lessonPrefix}_t1_translation_antibiotics`,
		defaultPoints: isMath ? 8 : 5,
		onecRole: 'recall',
		generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const genePool = [
				{ nameAr: 'الأنسولين البشري (جزء من السلسلة B)', template: 'TACCGGCTACGAATGACT' },
				{ nameAr: 'إنزيم الليزوزيم (جزء ابتدائي)', template: 'TACAAGTTCGGCCGTATT' },
				{ nameAr: 'بروتين الهيموغلوبين (جزء ابتدائي)', template: 'TACCACGTAGACTTAATC' },
				{ nameAr: 'هرمون النمو (قطعة معبّرة)', template: 'TACGCTAGTCCTGAAACT' }
			];
			const chosen = rng.pick(genePool);
			const seq = transcribeAndTranslate(chosen.template);
			const codonTable = buildMiniCodonTableRows(seq.codons);

			const svgDiag = svgMolecularBiology('translation', {
				numbered: true,
				title: 'رسم تخطيطي مرقم لآلية الترجمة',
				codons: [seq.codons[0] ?? 'AUG', seq.codons[1] ?? 'GCC', seq.codons[2] ?? 'GAU'],
				aminoAcids: [seq.peptide[0] ?? 'Met', seq.peptide[1] ?? 'Ala', seq.peptide[2] ?? 'Asp']
			});
			const imgUrl = saveSciencesSvgAsset(`sci_${track}_t1_recall_trans_${difficulty}_s${seed}`, svgDiag);

			const m1 = isMath ? '3' : '2';
			const m2 = isMath ? '5' : '3';

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = seq.codons.join(' - ');
				const wrongCoding = seq.coding5to3.match(/.{1,3}/g)?.join(' - ') ?? seq.coding5to3;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{
							text: wrongCoding,
							diagnosticFeedback: 'كتبت السلسلة غير المستنسخة للـ ADN (تحتوي على T بدل U).'
						},
						{
							text: seq.dnaTriplets.join(' - '),
							diagnosticFeedback: 'نسخت السلسلة المستنسخة للـ ADN كما هي دون إيجاد القواعد المتكاملة للـ ARNm.'
						},
						{
							text: [...seq.codons].reverse().join(' - '),
							diagnosticFeedback: 'عكست اتجاه قراءة الـ ARNm (5\' → 3\').'
						}
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `انطلاقاً من قطعة السلسلة المستنسخة للـ $\\text{ADN}$ ($3' \\to 5'$) الخاصة بـ ${chosen.nameAr}: \`${seq.dnaTriplets.join(' - ')}\`، ما هو تتابع رامزات الـ $\\text{ARNm}$ ($5' \\to 3'$)؟`,
					questionTextAr: 'اختر تتابع رامزات الـ ARNm الصحيح:',
					imageUrl: imgUrl,
					imageCaption: 'رسم تخطيطي لآلية الترجمة على مستوى الريبوزوم',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `بالتكامل مع السلسلة المستنسخة ($\\text{A}\\to\\text{U}, \\text{T}\\to\\text{A}, \\text{C}\\to\\text{G}, \\text{G}\\to\\text{C}$) نجد: \`${finalAnswer}\`.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = seq.peptideStr;
				const reversedPep = [...seq.peptide].reverse().join(' - ');
				const truncatedPep = seq.peptide.slice(0, Math.max(2, seq.peptide.length - 1)).join(' - ');
				const withStopPep = `${seq.peptideStr} - STOP`;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: withStopPep, diagnosticFeedback: 'رامزة التوقف لا تشفر لأي حمض أميني ولا تُكتب ضمن السلسلة الببتيدية.' },
						{ text: truncatedPep, diagnosticFeedback: 'توقفت قبل الوصول إلى رامزة التوقف.' },
						{ text: reversedPep, diagnosticFeedback: 'عكست ترتيب الأحماض الأمينية من النهاية 3\' نحو 5\'.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `تُستنسخ السلسلة \`${seq.dnaTriplets.join('-')}\` إلى $\\text{ARNm}$: \`${seq.codons.join('-')}\`. بالاستعانة بجدول الشفرة الوراثية، ما متتالية الأحماض الأمينية الناتجة؟`,
					questionTextAr: 'حدد متتالية متعدد الببتيد الصحيحة:',
					imageUrl: imgUrl,
					imageCaption: 'مرحلة الاستطالة على مستوى الريبوزوم',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `بترجمة كل رامزة دالة حتى رامزة التوقف \`${seq.codons[seq.codons.length - 1]}\` نتحصل على ${seq.peptide.length} أحماض أمينية: \`${finalAnswer}\`.`
				};
			} else {
				finalAnswer = `${seq.peptide.length}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `تتكون قطعة السلسلة المستنسخة لمورثة ${chosen.nameAr} من ${seq.template3to5.length} نيكليوتيدة (\`${seq.dnaTriplets.join('-')}\`). احسب عدد الأحماض الأمينية في السلسلة الببتيدية الناتجة عن ترجمة الـ $\\text{ARNm}$ الموافق.`,
					questionTextAr: 'أدخل عدد الأحماض الأمينية في السلسلة الببتيدية الناتجة:',
					imageUrl: imgUrl,
					imageCaption: 'بنية الريبوزوم ومراحل الترجمة',
					questionData: { answer: seq.peptide.length, displayTemplate: 'العدد = ?', variables: [], tolerance: 0 },
					explanation: `الـ ARNm يحوي ${seq.codons.length} رامزات؛ الرامزة الأخيرة \`${seq.codons[seq.codons.length - 1]}\` هي رامزة توقف، فتبقى ${seq.peptide.length} رامزات دالة تشفر لـ ${seq.peptide.length} أحماض أمينية (${seq.peptideStr}).`
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `تؤمّن البروتينات وظائف حيوية متخصصة في العضوية، ويتم تركيبها عبر آليتين دقيقتين ومتكاملتين انطلاقاً من المعلومة الوراثية المحمولة على جزيئة الـ $upright("ADN")$. تمثل الوثيقة المرفقة رسماً تخطيطياً لإحدى هاتين الآليتين، كما نُعطي قطعة من السلسلة المستنسخة ($3' arrow.r 5'$) لـ ${chosen.nameAr}: \`${seq.dnaTriplets.join(' - ')}\`.`,
				content: [
					{
						type: 'image',
						src: imgUrl,
						caption: 'الوثيقة: رسم تخطيطي مرقم لمرحلة الترجمة على مستوى الريبوزوم'
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
						content: `1) تعرّف على البيانات المرقمة (1، 2، 3) في الوثيقة، ثم استنتج تتابع رامزات الـ $upright("ARNm")$ ($5' arrow.r 3'$) ومتتالية الأحماض الأمينية الناتجة انطلاقاً من السلسلة المستنسخة وجدول الشفرة الوراثية المصغر.`,
						answer: `1) البيانات: (1) سلسلة ببتيدية في طور التشكل، (2) تحت وحدة ريبوزومية كبرى (تحوي الموقعين P و A)، (3) تحت وحدة ريبوزومية صغرى.\n- الـ $upright("ARNm")$ ($5' arrow.r 3'$): ${seq.codons.join(' - ')}.\n- متعدد الببتيد: ${seq.peptideStr} (${seq.peptide.length} أحماض أمينية لأن الرامزة الأخيرة ${seq.codons[seq.codons.length - 1]} هي رامزة توقف).`,
						mark: m1
					},
					{
						type: 'text',
						content: `2) انطلاقاً من الوثيقة ومكتسباتك، اكتب **نصاً علمياً مهيكلاً** (مقدمة وإشكالية، عرض، خاتمة) توضّح فيه كيف تضمن العضيات والعناصر الجزيئية الهيولية تحويل الرسالة الوراثية المحمولة على الـ $upright("ARNm")$ إلى سلسلة ببتيدية محددة.`,
						answer: `2) **نص علمي مهيكل**:\n- **المقدمة والإشكالية**: يُترجم التعبير المورثي المعلومة الوراثية المستنسخة على شكل $upright("ARNm")$ في الهيولى إلى بروتينات متخصصة بفضل عضيات وجزيئات نوعية. فكيف تتم آلية الترجمة لتحويل تتابع نيكليوتيدات الـ $upright("ARNm")$ إلى تتابع محدد من الأحماض الأمينية؟\n- **العرض**: تسبق الترجمة عملية **تنشيط الأحماض الأمينية** في الهيولى بتدخل إنزيم الربط النوعي (أمينوأسيل-ARNt سينتيتاز) وطاقة $upright("ATP")$ لتكوين معقدات (حمض أميني–$upright("ARNt")$). ثم تجري الترجمة عبر ثلاث مراحل: (أ) **البداية**: ارتباط تحت الوحدة الصغرى للريبوزوم برامزة الانطلاق $upright("AUG")$ وتوضع $upright("ARNt-Met")$ في الموقع P ثم التحام تحت الوحدة الكبرى؛ (ب) **الاستطالة**: دخول معقد $upright("ARNt")$ الموالي إلى الموقع A وفق تكامل الرامزة والرامزة المضادة، تشكل رابطة ببتيدية بين الحمضين الأمينيين وانتقال الريبوزوم برامزة واحدة في الاتجاه $5' arrow.r 3'$ مع تحرير $upright("ARNt")$ الفارغ؛ (جـ) **النهاية**: وصول الموقع A إلى إحدى رامزات التوقف ($upright("UAA, UAG, UGA")$) فتنفصل تحت وحدتي الريبوزوم وتتحرر السلسلة الببتيدية.\n- **الخاتمة**: يضمن التآزر بين الريبوزومات والـ $upright("ARNt")$ وإنزيمات التنشيط وطاقة الـ $upright("ATP")$ فك الشفرة الوراثية بدقة متناهية لبناء سلاسل ببتيدية محددة عدداً ونوعاً وترتيباً.`,
						mark: m2
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't1',
				difficulty,
				domain: 'protein_synthesis',
				titleAr: this.titleAr,
				onecRole: 'recall',
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكر تكامل القواعد أثناء الاستنساخ: A→U و T→A و C→G و G→C.',
					'رامزات التوقف (UAA, UAG, UGA) توقف الترجمة ولا تقابل أي حمض أميني.',
					'احرص في النص العلمي على الثلاثية الإجبارية: مقدمة + إشكالية، عرض منظم (تنشيط + بداية + استطالة + نهاية)، وخاتمة.'
				],
				solutionStepsAr: [
					`استخراج الـ ARNm بالتكامل من 3'→5': ${seq.codons.join(' - ')}.`,
					`ترجمة الرامزات الدالة حتى رامزة التوقف (${seq.codons[seq.codons.length - 1]}): ${seq.peptideStr}.`,
					'تحرير نص علمي مهيكل يبرز دور التنشيط ومراحل الترجمة الثلاث.'
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 2. REASONING (7 pts SE) / SCIENTIFIC APPROACH (12 pts MATH):
	//    Genetic Mutations, 3D Structure & Loss of Protein Function
	// ─────────────────────────────────────────────────────────────────────────
	const tplMutationsStructure: SciencesParameterizedTemplate = {
		id: 'sci_tpl_3as_shared_t1_reasoning_mutations_folding',
		grade,
		trimesterId: 't1',
		domain: 'protein_structure',
		titleAr: isMath
			? 'مسعى علمي: تأثير الطفرات الوراثية على البنية الفراغية وفقدان الوظيفة البروتينية'
			: 'استدلال علمي: تأثير الطفرات الوراثية على البنية الفراغية ووظيفة البروتين',
		curriculumLessonId: isMath
			? `${lessonPrefix}_t1_folding_mutations`
			: `${lessonPrefix}_t1_protein_structure_amphoteric`,
		defaultPoints: isMath ? 12 : 7,
		onecRole: isMath ? 'scientific_approach' : 'reasoning',
		generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const cases = [
				{
					diseaseAr: 'فقر الدم المنجلي (الهيموغلوبين HbS)',
					proteinAr: 'السلسلة β للهيموغلوبين',
					normal3to5: 'TGAGGACTCCTC',
					mutant3to5: 'TGAGGACACCTC',
					mutTypeAr: 'طفرة استبدال خاطئة المعنى (A بدل T)',
					bondEffectAr: 'استبدال حمض الغلوتاميك القطبي السالب (Glu) بالفالين الكاره للماء (Val)، مما يولّد تجاذبات كارهة للماء بين جزيئات HbS وتبلمرها على شكل ألياف صلبة تشوّه الكرية الحمراء',
					mutPos: 8
				},
				{
					diseaseAr: 'عوز إنزيم التيروزيناز (المهق الوراثي)',
					proteinAr: 'إنزيم التيروزيناز (الموقع الفعال)',
					normal3to5: 'TACCTTCGTTGGACT',
					mutant3to5: 'TACCTTCGTTAGACT',
					mutTypeAr: 'طفرة استبدال بدون معنى (توقف مبكر)',
					bondEffectAr: 'استبدال رامزة التريبتوفان (UGG) برامزة توقف مبكرة (UAG) قبل نهاية السلسلة، مما ينتج إنزيماً مبتوراً فاقداً لجزء من البنية الفراغية والموقع الفعال فيتعذر تركيب صبغة الميلانين',
					mutPos: 11
				},
				{
					diseaseAr: 'اعتلال الكولاجين النسيجي (هشاشة العظام الوراثية)',
					proteinAr: 'سلسلة بروتين الكولاجين',
					normal3to5: 'TACGGTCCTGAACTT',
					mutant3to5: 'TACGTTCCTGAACTT',
					mutTypeAr: 'طفرة استبدال خاطئة المعنى (T بدل G)',
					bondEffectAr: 'استبدال البرولين/الغليسين بحمض أميني ذي جذر ضخم يعيق تشكل الروابط الهيدروجينية الملتفة للبنية الحلزونية الثلاثية، فتتخرب البنية الفراغية ويفقد العظم صلابته',
					mutPos: 5
				}
			];
			const c = rng.pick(cases);
			const norm = transcribeAndTranslate(c.normal3to5);
			const mut = transcribeAndTranslate(c.mutant3to5);
			const miniTable = buildMiniCodonTableRows([...norm.codons, ...mut.codons]);

			const foldSvg = svgMolecularBiology('protein_folding', {
				title: 'تدرج مستويات البنية الفراغية للبروتين'
			});
			const foldUrl = saveSciencesSvgAsset(`sci_${track}_t1_mut_fold_${difficulty}_s${seed}`, foldSvg);
			const flowSvg = svgBioFlowchart({
				title: 'العلاقة السببية بين المورثة والبنية والوظيفة',
				orientation: 'horizontal',
				width: 470,
				steps: [
					{ label: 'طفرة في المورثة', sublabel: 'تغير نيكليوتيدة', color: '#dc2626', bg: '#fef2f2', arrowLabel: 'استنساخ' },
					{ label: 'تغير في الرسالة', sublabel: 'رامزة جديدة أو توقف', color: '#b45309', bg: '#fffbeb', arrowLabel: 'ترجمة' },
					{ label: 'اختلال الروابط', sublabel: 'تغير البنية الفراغية', color: '#7c3aed', bg: '#f5f3ff', arrowLabel: 'نتيجة' },
					{ label: 'فقدان الوظيفة', sublabel: 'ظهور النمط المرضي', color: '#1e293b', bg: '#f1f5f9' }
				]
			});
			const flowUrl = saveSciencesSvgAsset(`sci_${track}_t1_mut_flow_${difficulty}_s${seed}`, flowSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = mut.peptideStr;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: norm.peptideStr, diagnosticFeedback: 'هذه السلسلة الببتيدية الطبيعية قبل حدوث الطفرة.' },
						{ text: `${mut.peptideStr} - STOP`, diagnosticFeedback: 'رامزة التوقف لا تمثل حمضاً أمينياً في الببتيد.' },
						{ text: [...mut.peptide].reverse().join(' - '), diagnosticFeedback: 'عكست اتجاه قراءة الـ ARNm.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في دراسة ${c.diseaseAr}، تُعطى السلسلة المستنسخة ($3' \\to 5'$) للأليل الطافر: \`${mut.dnaTriplets.join('-')}\`. ما متتالية الأحماض الأمينية الناتجة؟`,
					questionTextAr: 'اختر السلسلة الببتيدية الطافرة الصحيحة:',
					imageUrl: foldUrl,
					imageCaption: 'تأثير البنية الأولية في اكتساب البنية الفراغية',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الـ ARNm الطافر هو \`${mut.codons.join('-')}\` ويُترجم إلى: \`${mut.peptideStr}\` (بينما الطبيعي هو \`${norm.peptideStr}\`).`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = c.mutTypeAr;
				const mcq = buildUniqueMcqOptions(
					c.mutTypeAr,
					[
						{ text: 'طفرة صامتة لا تغير الحمض الأميني', diagnosticFeedback: 'قارن الببتيد الطبيعي بالطافر: حدث تغير فعلي في الببتيد.' },
						{ text: 'تضاعف كامل للصبغي الجنسي', diagnosticFeedback: 'التغير يمس نيكليوتيدة واحدة فقط في المورثة.' },
						{ text: 'انعدام تام للاستنساخ داخل النواة', diagnosticFeedback: 'الاستنساخ يحدث وينتج ARNm طافراً.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `بمقارنة الأليل الطبيعي (\`${norm.dnaTriplets.join('-')}\` $\\to$ \`${norm.peptideStr}\`) بالأليل الطافر (\`${mut.dnaTriplets.join('-')}\` $\\to$ \`${mut.peptideStr}\`) في ${c.diseaseAr}، ما نوع الطفرة؟`,
					questionTextAr: 'حدد نوع الطفرة الوراثية:',
					imageUrl: foldUrl,
					imageCaption: 'مستويات البنية الفراغية للبروتين',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `حدثت ${c.mutTypeAr} عند الموقع النيكليوتيدي ${c.mutPos}، ما أدى إلى تحول الببتيد من \`${norm.peptideStr}\` إلى \`${mut.peptideStr}\`.`
				};
			} else {
				finalAnswer = `${mut.peptide.length}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `في ${c.diseaseAr}، تُترجم السلسلة المستنسخة الطافرة \`${mut.dnaTriplets.join('-')}\`. كم عدد الأحماض الأمينية التي تضمها هذه القطعة الطافرة؟`,
					questionTextAr: 'أدخل عدد الأحماض الأمينية في القطعة الطافرة:',
					imageUrl: flowUrl,
					imageCaption: 'السلسلة السببية من الطفرة إلى المرض',
					questionData: { answer: mut.peptide.length, displayTemplate: 'عدد الأحماض = ?', variables: [], tolerance: 0 },
					explanation: `الرامزات هي \`${mut.codons.join('-')}\` وتُنتج \`${mut.peptideStr}\` أي ${mut.peptide.length} أحماض أمينية.`
				};
			}

			const blocks: ExerciseBlock['content'] = [
				{
					type: 'image',
					src: foldUrl,
					caption: 'الوثيقة (1): مستويات البنية الفراغية للبروتين وعلاقتها بالروابط الكيميائية'
				},
				{
					type: 'table',
					headers: ['الأليل', 'السلسلة المستنسخة (3\' → 5\')', 'طول الببتيد / الحالة'],
					cells: [],
					rows: [
						['الأليل الطبيعي (شخص سليم)', norm.dnaTriplets.join(' - '), 'بروتين وظيفي طبيعي'],
						['الأليل الطافر (شخص مصاب)', mut.dnaTriplets.join(' - '), 'بروتين غير وظيفي']
					],
					headerBackground: true,
					borders: 'grid',
					width: 'full'
				},
				{
					type: 'table',
					headers: miniTable.headers,
					cells: [],
					rows: miniTable.rows,
					headerBackground: true,
					borders: 'grid',
					width: 'full'
				},
				{
					type: 'text',
					content: isMath
						? `**الجزء الأول**: 1) قدّم فرضيتين علميتين تفسّران بهما سبب فقدان وظيفة ${c.proteinAr} عند الشخص المصاب بـ ${c.diseaseAr}.`
						: `**الجزء الأول**: 1) قارن تتابع نيكليوتيدات السلسلة المستنسخة للأليل الطبيعي والأليل الطافر، ثم حدد موقع ونوع الطفرة الوراثية.`,
					answer: isMath
						? `1) الفرضيتان المقترحتان:\n- الفرضية 1: حدوث طفرة استبدال في مورثة ${c.proteinAr} أدت لتغير حمض أميني أساسي أو ظهور رامزة توقف مبكرة، مما أخلّ بالروابط المثبتة للبنية الفراغية الوظيفية.\n- الفرضية 2: خلل في آلية الترجمة الهيولية (تثبيط الريبوزومات أو الـ ARNt) يمنع تركيب ${c.proteinAr}.`
						: `1) المقارنة: تتماثل السلسلتان في جميع النيكليوتيدات عدا الموقع النيكليوتيدي ${c.mutPos}. إذن حدثت **${c.mutTypeAr}**.`,
					mark: isMath ? '2.25' : '1.5'
				},
				{
					type: 'text',
					content: `2) استخرج تتابع رامزات الـ $upright("ARNm")$ ومتتالية الأحماض الأمينية لكل من الأليل الطبيعي والأليل الطافر باستغلال جدول الشفرة الوراثية المصغر.`,
					answer: `2) الأليل الطبيعي:\n- $upright("ARNm")$: ${norm.codons.join(' - ')}\n- متعدد الببتيد: ${norm.peptideStr} (${norm.peptide.length} أحماض أمينية).\nالأليل الطافر:\n- $upright("ARNm")$: ${mut.codons.join(' - ')}\n- متعدد الببتيد: ${mut.peptideStr} (${mut.peptide.length} أحماض أمينية).`,
					mark: isMath ? '3' : '2'
				},
				{
					type: 'text',
					content: `**الجزء الثاني**: 3) باستغلال الوثيقة (1) ونتائجك السابقة ومكتسباتك حول تجربة أنفينسن، فسّر بدقة العلاقة السببية بين الطفرة المسجلة وتغير البنية الفراغية وفقدان وظيفة ${c.proteinAr}، ثم ${isMath ? 'صادق على الفرضية الصحيحة.' : 'استنتج القاعدة البيولوجية العامة.'}`,
					answer: `3) التفسير العلمي: أثبتت تجربة أنفينسن أن البنية الأولية (عدد ونوع وترتيب الأحماض الأمينية) تتحكم في مواضع تشكل الروابط الكيميائية المثبتة للبنية الفراغية. في هذه الحالة أدت ${c.mutTypeAr} إلى ${c.bondEffectAr}.\n${isMath ? 'ومنه نصادق على صحة الفرضية 1 وننفي الفرضية 2.' : 'الاستنتاج: التخصص الوظيفي للبروتين مرتبط حصراً ببنيته الفراغية ثلاثية الأبعاد المحددة وراثياً بالبنية الأولية.'}`,
					mark: isMath ? '4.5' : '3.5'
				}
			];

			if (isMath) {
				blocks.push({
					type: 'text',
					content: `**الجزء الثالث**: 4) أنجز مخططاً تحصيلياً وظيفياً يلخص التسلسل السببي من المورثة الطافرة حتى ظهور الأعراض المرضية لـ ${c.diseaseAr}.`,
					answer: `4) المخطط التحصيلي: مورثة طافرة (${c.mutTypeAr}) ← استنساخ $upright("ARNm")$ طافر ← ترجمة سلسلة ببتيدية متغيرة (${mut.peptideStr}) ← اختلال الروابط المثبتة للبنية الفراغية ← فقدان التخصص الوظيفي لـ ${c.proteinAr} ← ظهور النمط الظاهري المرضي (${c.diseaseAr}).`,
					mark: '2.25'
				});
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `ترتبط بعض الأمراض الوراثية النادرة والخطيرة مثل **${c.diseaseAr}** بخلل في التخصص الوظيفي لبروتين ${c.proteinAr}. لفهم الأصل الجزيئي للمرض، نعرض عليك معطيات الوثيقة (1) والجدولين أدناه اللذين يقدمان جزءاً من الأليل الطبيعي والأليل الطافر.`,
				content: blocks
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't1',
				difficulty,
				domain: 'protein_structure',
				titleAr: this.titleAr,
				onecRole: isMath ? 'scientific_approach' : 'reasoning',
				quizQuestion,
				sujetExercise,
				hints: [
					'قارن السلسلة المستنسخة الطبيعية والطافرة نيكليوتيدة بنيكليوتيدة لتحديد موقع الطفرة بدقة.',
					'استعمل جدول الشفرة الوراثية للترجمة وتحقق مما إذا ظهرت رامزة توقف مبكرة.',
					'اربط تغير الحمض الأميني بتغير الروابط المثبتة (هيدروجينية، شاردية، كبريتية، كارهة للماء) ثم بالبنية الفراغية فالوظيفة.'
				],
				solutionStepsAr: [
					`نوع الطفرة: ${c.mutTypeAr}.`,
					`الببتيد الطبيعي: ${norm.peptideStr} | الطافر: ${mut.peptideStr}.`,
					`التفسير البنيوي: ${c.bondEffectAr}.`
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 3. SCIENTIFIC APPROACH (8 pts SE / 12 pts MATH):
	//    Antibiotic Inhibition of Protein Synthesis (Alpha-amanitin / Rifampicin / Tetracycline / Ricin)
	// ─────────────────────────────────────────────────────────────────────────
	const tplApproachAntibiotics: SciencesParameterizedTemplate = {
		id: 'sci_tpl_3as_shared_t1_approach_antibiotics_synthesis',
		grade,
		trimesterId: 't1',
		domain: 'protein_synthesis',
		titleAr: 'مسعى علمي: تحديد آلية تأثير المضادات الحيوية والسموم على تركيب البروتين',
		curriculumLessonId: `${lessonPrefix}_t1_translation_antibiotics`,
		defaultPoints: isMath ? 12 : 8,
		onecRole: 'scientific_approach',
		generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const drugs = [
				{
					nameAr: 'الألفا-أمانيتين (سم فطر الأمانيت)',
					targetStage: 'الاستنساخ',
					mechanismAr: 'يرتبط بالموقع الفعال لإنزيم ARN بوليميراز II ويمنع استطالة الـ ARNm داخل النواة',
					mrnaAtMax: 12,
					protAtMax: 10,
					inVitroRescue: true,
					c50: rng.pick([2, 4])
				},
				{
					nameAr: 'الريفامبيسين (مضاد حيوي ضد السل)',
					targetStage: 'الاستنساخ',
					mechanismAr: 'يثبط إنزيم ARN بوليميراز البكتيري ويمنع انطلاق استنساخ الـ ARNm البكتيري',
					mrnaAtMax: 15,
					protAtMax: 12,
					inVitroRescue: true,
					c50: rng.pick([3, 5])
				},
				{
					nameAr: 'التتراسيكلين (مضاد حيوي واسع الطيف)',
					targetStage: 'الترجمة',
					mechanismAr: 'يثبت على تحت الوحدة الصغرى للريبوزوم البكتيري ويمنع توضع معقد ARNt–AA في الموقع A فتتوقف الاستطالة',
					mrnaAtMax: 96,
					protAtMax: 11,
					inVitroRescue: false,
					c50: rng.pick([4, 6])
				},
				{
					nameAr: 'سم الريسين (بذور نبات الخروع)',
					targetStage: 'الترجمة',
					mechanismAr: 'يخرب الـ ARNr لتحت الوحدة الكبرى للريبوزوم ويمنع تشكل الروابط الببتيدية وتوقف الترجمة',
					mrnaAtMax: 94,
					protAtMax: 8,
					inVitroRescue: false,
					c50: rng.pick([2, 3])
				}
			];
			const d = rng.pick(drugs);
			const isTranscription = d.targetStage === 'الاستنساخ';

			const curveSvg = svgBioCurvePlot({
				title: 'تأثير التركيز المتزايد للمادة المثبطة على التركيب',
				xMin: 0,
				xMax: 20,
				yMin: 0,
				yMax: 115,
				xStep: 5,
				yStep: 20,
				xLabel: 'C (ug/mL)',
				yLabel: 'Taux (%)',
				curves: [
					{
						fn: (c) =>
							isTranscription
								? d.mrnaAtMax + (100 - d.mrnaAtMax) * Math.exp(-c / d.c50)
								: 100 - ((100 - d.mrnaAtMax) * c) / 20,
						color: '#2563eb',
						label: 'ARNm'
					},
					{
						fn: (c) => d.protAtMax + (100 - d.protAtMax) * Math.exp(-c / d.c50),
						color: '#dc2626',
						dashed: true,
						label: 'البروتين'
					}
				],
				dashedGuides: [
					{ x1: 0, y1: 50, x2: 20, y2: 50, color: '#64748b', label: '50%', labelPos: 'top' }
				]
			});
			const curveUrl = saveSciencesSvgAsset(`sci_${track}_t1_abx_curve_${difficulty}_s${seed}`, curveSvg);

			const flowSvg = svgBioFlowchart({
				title: 'مخطط تحصيلي لموقع التثبيط الجزيئي',
				orientation: 'horizontal',
				width: 470,
				steps: isTranscription
					? [
							{ label: 'مورثة في النواة', sublabel: 'بداية الاستنساخ', color: '#1d4ed8', bg: '#eff6ff', arrowLabel: 'تثبيط' },
							{ label: 'توقف البلمرة', sublabel: 'كبح الإنزيم النووي', color: '#dc2626', bg: '#fef2f2', arrowLabel: 'نتيجة' },
							{ label: 'غياب الوسيط', sublabel: 'انعدام الترجمة', color: '#b45309', bg: '#fffbeb', arrowLabel: 'أثر' },
							{ label: 'توقف النمو', sublabel: 'انعدام البروتين', color: '#0f172a', bg: '#f1f5f9' }
						]
					: [
							{ label: 'استنساخ سليم', sublabel: 'تشكل الوسيط عادياً', color: '#16a34a', bg: '#f0fdf4', arrowLabel: 'هجرة' },
							{ label: 'تثبيط الريبوزوم', sublabel: 'منع استطالة الترجمة', color: '#dc2626', bg: '#fef2f2', arrowLabel: 'نتيجة' },
							{ label: 'غياب البروتين', sublabel: 'توقف البلمرة الببتيدية', color: '#b45309', bg: '#fffbeb', arrowLabel: 'أثر' },
							{ label: 'توقف التكاثر', sublabel: 'موت الخلية المستهدفة', color: '#0f172a', bg: '#f1f5f9' }
						]
			});
			const flowUrl = saveSciencesSvgAsset(`sci_${track}_t1_abx_flow_${difficulty}_s${seed}`, flowSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = d.targetStage;
				const mcq = buildUniqueMcqOptions(
					`مرحلة ${d.targetStage}`,
					[
						{
							text: isTranscription ? 'مرحلة الترجمة فقط دون الاستنساخ' : 'مرحلة الاستنساخ داخل النواة فقط',
							diagnosticFeedback: 'راجع منحنى دمج اليوريدين (ARNm) مقارنة بمنحنى دمج الأحماض الأمينية (البروتين).'
						},
						{ text: 'مرحلة الانطواء في جهاز غولجي فقط', diagnosticFeedback: 'انخفاض البروتين ناتج عن توقف التركيب نفسه.' },
						{ text: 'لا يؤثر في أي مرحلة من تركيب البروتين', diagnosticFeedback: 'المنحنى يظهر انخفاضاً حاداً في نسبة البروتين إلى قرابة 10%.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `عند معالجة خلايا بـ **${d.nameAr}** بتركيز $20\\text{ }\\mu\\text{g/mL}$، بلغت نسبة تشكل الـ $\\text{ARNm}$ نحو $${d.mrnaAtMax}\\%$ ونسبة تركيب البروتين نحو $${d.protAtMax}\\%$. ما المرحلة المستهدفة مباشرة؟`,
					questionTextAr: 'حدد المرحلة المستهدفة بالمادة المثبطة:',
					imageUrl: curveUrl,
					imageCaption: 'تطور نسبة الـ ARNm والبروتين بدلالة تركيز المثبط',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: isTranscription
						? `انخفاض الـ ARNm إلى ${d.mrnaAtMax}% يثبت أن ${d.nameAr} يستهدف مرحلة الاستنساخ مباشرة.`
						: `بقاء الـ ARNm مرتفعاً (${d.mrnaAtMax}%) مع انهيار البروتين (${d.protAtMax}%) يثبت أن ${d.nameAr} يستهدف مرحلة الترجمة.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = d.mechanismAr;
				const mcq = buildUniqueMcqOptions(
					d.mechanismAr,
					[
						{
							text: isTranscription
								? 'يمنع تثبت معقد ARNt في الموقع A للريبوزوم'
								: 'يثبط إنزيم ARN بوليميراز داخل النواة ويمنع تشكل الـ ARNm',
							diagnosticFeedback: 'تلك آلية مثبط المرحلة الأخرى! طابق مع منحنى الـ ARNm.'
						},
						{ text: 'يُفكك الجسور ثنائية الكبريت بعد انتهاء الترجمة', diagnosticFeedback: 'المادة توقف دمج الأحماض الأمينية في البروتين أصلاً.' },
						{ text: 'يحول رامزة AUG إلى رامزة توقف في الـ ADN', diagnosticFeedback: 'المادة مثبط كيميائي ولا تحدث طفرة في الـ ADN.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `أي آلية جزيئية تفسر بدقة نتائج المنحنى المرفق حول تأثير **${d.nameAr}**؟`,
					questionTextAr: 'اختر الآلية الجزيئية الدقيقة:',
					imageUrl: curveUrl,
					imageCaption: 'تأثير التركيز على نسبتي ARNm والبروتين',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: d.mechanismAr
				};
			} else {
				const mrnaHalf = roundTo(d.mrnaAtMax + (100 - d.mrnaAtMax) * Math.exp(-d.c50 / d.c50), 0);
				finalAnswer = isTranscription ? 'يعود تركيب البروتين طبيعياً' : 'يبقى تركيب البروتين متوقفاً';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{
							text: isTranscription ? 'يبقى تركيب البروتين متوقفاً تماماً' : 'يعود تركيب البروتين بنسبة 100%',
							diagnosticFeedback: 'فكر فيما إذا كانت الريبوزومات الهيولية سليمة أم مثبَّطة عند إضافة ARNm ناضج!'
						},
						{ text: 'يتضاعف الـ ADN داخل الوسط الخلوي', diagnosticFeedback: 'إضافة ARNm لا تسبب تضاعف الـ ADN.' },
						{ text: 'يتحول الـ ARNm المضاف إلى ADN', diagnosticFeedback: 'لا يوجد إنزيم استنساخ عكسي هنا.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في تجربة مكملة بوسط خلوي يحتوي على **${d.nameAr}** (حيث انخفض دمج اليوريدين عند $C = ${d.c50}\\text{ }\\mu\\text{g/mL}$ إلى قرابة $${isTranscription ? mrnaHalf : 98}\\%$)، نقوم بحقن جزيئات $\\text{ARNm}$ جاهزة وناضجة مع أحماض أمينية مشعة. ماذا نتوقع؟`,
					questionTextAr: 'توقع نتيجة إضافة ARNm جاهز في وجود المثبط:',
					imageUrl: flowUrl,
					imageCaption: 'مخطط المسار الجزيئي للتثبيط',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: isTranscription
						? 'بما أن المثبط يستهدف الاستنساخ فقط فإن آلية الترجمة سليمة، لذا إضافة ARNm جاهز تستعيد تركيب البروتين.'
						: 'بما أن المثبط يستهدف الريبوزوم (الترجمة)، فإن إضافة ARNm جاهز لا ترفع التثبيط ويبقى تركيب البروتين متوقفاً.'
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `تُستعمل بعض الجزيئات الحيوية الطبيعية والصيدلانية مثل **${d.nameAr}** للتحكم في تكاثر الخلايا أو البكتيريا عبر تعطيل إحدى خطوات التعبير المورثي. نرغب في تحديد مستوى وآلية تأثير هذه المادة بدقة وفق المسعى العلمي.`,
				content: [
					{
						type: 'text',
						content: `**الجزء الأول**: يُظهر تتبع تكاثر الخلايا المعالجة بـ **${d.nameAr}** توقفاً سريعاً في تركيب البروتينات الضرورية للحياة.\n1) اطرح المشكل العلمي الذي تعالجه الدراسة، ثم اقترح فرضيتين تفسيريتين حول مستوى تأثير ${d.nameAr}.`,
						answer: `1) **المشكل العلمي**: في أي مرحلة من مراحل تركيب البروتين وبأي آلية جزيئية يثبط ${d.nameAr} تركيب البروتين؟\n- **الفرضية 1**: يثبط ${d.nameAr} مرحلة الاستنساخ في النواة (تثبيط إنزيم $upright("ARN")$ بوليميراز).\n- **الفرضية 2**: يثبط ${d.nameAr} مرحلة الترجمة في الهيولى (تثبيط الريبوزومات أو تنشيط الأحماض الأمينية).`,
						mark: isMath ? '3' : '2'
					},
					{
						type: 'columns',
						widths: ['1.15fr', '1fr'],
						children: [
							{
								type: 'image',
								src: curveUrl,
								caption: 'الوثيقة (1-أ): تغير نسبة تشكل ARNm والبروتين بدلالة تركيز المثبط'
							},
							{
								type: 'table',
								headers: ['التجربة (بوجود المثبط)', 'نسبة البروتين المركّب'],
								cells: [],
								rows: [
									['وسط + مستخلص خلوي كامل', `${d.protAtMax}%`],
									['نفس الوسط + حقن ARNm جاهز', d.inVitroRescue ? '92%' : `${d.protAtMax}%`]
								],
								headerBackground: true,
								borders: 'grid',
								width: 'full'
							}
						]
					},
					{
						type: 'text',
						content: `**الجزء الثاني**: 2) باستغلال منهجي لمعطيات الوثيقة (1-أ) والجدول التجريبي (التحليل + الاستنتاج + التركيب)، اشرح بدقة الآلية الجزيئية لتأثير **${d.nameAr}** وصادق على الفرضية الصحيحة.`,
						answer: `2) **استغلال الوثيقة (1-أ)**: يمثّل المنحنى تغير نسبتي $upright("ARNm")$ والبروتين بدلالة تزايد تركيز ${d.nameAr}. نلاحظ أنه بزيادة التركيز من $0$ إلى $20 upright("µg/mL")$: ${isTranscription ? `تتناقص نسبة الـ $upright("ARNm")$ بشدة حتى $${d.mrnaAtMax}\\%$ ويتبعها تناقص مماثل للبروتين حتى $${d.protAtMax}\\%$` : `تبقى نسبة الـ $upright("ARNm")$ مرتفعة وثابتة تقريباً ($${d.mrnaAtMax}\\%$) بينما تنهار نسبة البروتين إلى $${d.protAtMax}\\%$`}.\n- **الاستنتاج**: يستهدف ${d.nameAr} مرحلة **${d.targetStage}**.\n- **استغلال الجدول**: عند حقن $upright("ARNm")$ جاهز ${d.inVitroRescue ? 'يرتفع تركيب البروتين إلى 92% مما يؤكد سلامة الريبوزومات ويثبت أن التثبيط يمس الاستنساخ فقط' : `يبقى تركيب البروتين منخفضاً جداً (${d.protAtMax}%) مما يؤكد أن التثبيط يمس مباشرة آلية الترجمة على مستوى الريبوزوم`}.\n- **التركيب والمصادقة**: ${d.mechanismAr}. ومنه **نصادق على صحة ${isTranscription ? 'الفرضية 1' : 'الفرضية 2'}** وننفي الأخرى.`,
						mark: isMath ? '6.75' : '4.5'
					},
					{
						type: 'text',
						content: `**الجزء الثالث**: 3) لخّص في **مخطط تحصيلي وظيفي** مراحل تركيب البروتين مع إبراز موقع وآلية تدخل **${d.nameAr}**.`,
						answer: `3) **المخطط التحصيلي**:\n${isTranscription ? `مورثة ($upright("ADN")$) ← [تثبيط إنزيم $upright("ARN")$ بوليميراز بواسطة ${d.nameAr} ⛔] ← توقف إنتاج $upright("ARNm")$ ← عدم حدوث الترجمة الهيولية ← توقف تركيب البروتين وموت الخلية.` : `مورثة ($upright("ADN")$) ← استنساخ سليم ($upright("ARNm")$) ← هجرة للهيولى ← [تثبيط الريبوزوم بواسطة ${d.nameAr} ⛔] ← توقف استطالة السلسلة الببتيدية ← انعدام البروتين وتوقف التكاثر.`}`,
						mark: isMath ? '2.25' : '1.5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't1',
				difficulty,
				domain: 'protein_synthesis',
				titleAr: this.titleAr,
				onecRole: 'scientific_approach',
				quizQuestion,
				sujetExercise,
				hints: [
					'قارن سلوك منحنى الـ ARNm بسلوك منحنى البروتين: هل تأثر الاستنساخ أم الترجمة؟',
					'نتيجة حقن ARNm ناضج هي الاختبار الحاسم للفصل بين الاستنساخ والترجمة.',
					'في الجزء 3 ارسم مخططاً تحصيلياً بإطارات متسلسلة وأسهم معنونة مع تحديد موضع الكبح بدقة.'
				],
				solutionStepsAr: [
					`تحليل المنحنى: عند 20 µg/mL، نسبة ARNm = ${d.mrnaAtMax}% ونسبة البروتين = ${d.protAtMax}%.`,
					`المرحلة المستهدفة: ${d.targetStage}.`,
					`الآلية الدقيقة: ${d.mechanismAr}.`
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 4. RECALL (5 pts SE / 8 pts MATH): Protein 3D Structure, Amphoteric & Electrophoresis
	// ─────────────────────────────────────────────────────────────────────────
	const tplRecallStructureElectrophoresis: SciencesParameterizedTemplate = {
		id: 'sci_tpl_3as_shared_t1_recall_structure_electrophoresis',
		grade,
		trimesterId: 't1',
		domain: 'protein_structure',
		titleAr: 'استرجاع منظم: الخاصية الأمفوتيرية، الهجرة الكهربائية، ومستويات البنية الفراغية (+ نص علمي)',
		curriculumLessonId: `${lessonPrefix}_t1_protein_structure_amphoteric`,
		defaultPoints: isMath ? 8 : 5,
		onecRole: 'recall',
		generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pH = rng.pick([5.8, 6.0, 6.2]);
			const aaList = [
				{ code: 'Lys', nameAr: 'الليزين', pHi: 9.7, color: '#2563eb' },
				{ code: 'Ala', nameAr: 'الألانين', pHi: 6.0, color: '#16a34a' },
				{ code: 'Glu', nameAr: 'حمض الغلوتاميك', pHi: 3.2, color: '#dc2626' }
			];
			const target = rng.pick([aaList[0], aaList[2]]);
			const chargeInfo = aminoAcidChargeAtPh(pH, target.pHi);
			const bands = aaList.map((a) => {
				const ch = aminoAcidChargeAtPh(pH, a.pHi);
				const pos: -1 | 0 | 1 = ch.sign === '-' ? 1 : ch.sign === '+' ? -1 : 0;
				return { label: `${a.code} (pHi=${a.pHi})`, pos, color: a.color };
			});

			const elecSvg = svgMolecularBiology('electrophoresis', {
				title: 'فصل خليط أحماض أمينية بالهجرة الكهربائية',
				electrophoresis: { pH, bands }
			});
			const elecUrl = saveSciencesSvgAsset(`sci_${track}_t1_recall_elec_${difficulty}_s${seed}`, elecSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = chargeInfo.directionAr;
				const mcq = buildUniqueMcqOptions(
					chargeInfo.directionAr,
					[
						{
							text: chargeInfo.sign === '+' ? 'يهاجر نحو القطب الموجب (الأنود)' : 'يهاجر نحو القطب السالب (الكاثود)',
							diagnosticFeedback: 'تذكر قاعدة الأضداد تتجاذب: الشحنة الموجبة تتجه للقطب السالب والسالبة للموجب!'
						},
						{ text: 'يبقى في المنتصف (لا يهاجر)', diagnosticFeedback: `بما أن pH = ${pH} لا يساوي pHi = ${target.pHi} فإن شحنته غير معدومة.` },
						{ text: 'يتفكك إلى ماء وغاز CO₂', diagnosticFeedback: 'الهجرة الكهربائية تفصل الأحماض الأمينية حسب شحنتها دون تفكيكها.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `نضع خليطاً يحتوي على **${target.nameAr} ($\\text{${target.code}}: \\text{pH}_i = ${target.pHi}$)** في جهاز هجرة كهربائية عند $\\text{pH} = ${pH}$. ما سلوك هذا الحمض الأميني؟`,
					questionTextAr: 'حدد اتجاه هجرة الحمض الأميني:',
					imageUrl: elecUrl,
					imageCaption: `نتائج الهجرة الكهربائية عند pH = ${pH}`,
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `لأن $\\text{pH} = ${pH} ${chargeInfo.sign === '+' ? '<' : '>'} \\text{pH}_i = ${target.pHi}$ فإن شحنته (${chargeInfo.sign})، ومنه ${chargeInfo.poleAr}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chargeInfo.sign === '+' ? 'قاعدة (يكتسب بروتوناً H⁺)' : 'حمض (يفقد بروتوناً H⁺)';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{
							text: chargeInfo.sign === '+' ? 'حمض (يفقد بروتوناً H⁺)' : 'قاعدة (يكتسب بروتوناً H⁺)',
							diagnosticFeedback: `قارن pH = ${pH} مع pHi = ${target.pHi}: في الوسط الحامضي نسبياً يسلك الحمض الأميني سلوك قاعدة، وفي القاعدي سلوك حمض.`
						},
						{ text: 'أيون ثنائي القطب متعادل كهربائياً', diagnosticFeedback: 'يكون متعادلاً فقط عند pH = pHi.' },
						{ text: 'لا يتأين إطلاقاً في الماء', diagnosticFeedback: 'الأحماض الأمينية مركبات أمفوتيرية تتأين حسب pH الوسط.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `عند $\\text{pH} = ${pH}$، يسلك **${target.nameAr} ($\\text{pH}_i = ${target.pHi}$)** سلوك:`,
					questionTextAr: 'اختر السلوك الأمفوتيري الصحيح:',
					imageUrl: elecUrl,
					imageCaption: 'الخاصية الأمفوتيرية والهجرة الكهربائية',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: chargeInfo.poleAr
				};
			} else {
				finalAnswer = '4 أنواع (جسور S-S، شاردية، هيدروجينية، كارهة للماء)';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'روابط ببتيدية فقط', diagnosticFeedback: 'الروابط الببتيدية تثبت البنية الأولية فقط.' },
						{ text: 'روابط هيدروجينية فقط بين CO و NH', diagnosticFeedback: 'تلك تثبت البنية الثانوية (حلزون α ووريقات β).' },
						{ text: 'روابط فوسفودياستر فقط', diagnosticFeedback: 'تلك تخص الأحماض النووية ADN و ARN.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: 'ما أنواع الروابط الكيميائية الناشئة بين الجذور الجانبية $-\\text{R}$ التي تثبت استقرار **البنية الثالثية** للبروتين؟',
					questionTextAr: 'اختر الإجابة الدقيقة:',
					imageUrl: elecUrl,
					imageCaption: 'تأثير الشحنة الكهربائية على الروابط البروتينية',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: 'تستقر البنية الثالثية بأربعة أنواع من الروابط بين الجذور: الجسور التكافؤية ثنائية الكبريت (S–S)، الروابط الشاردية، الروابط الهيدروجينية، وتجاذب الجذور الكارهة للماء.'
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `تكتسب البروتينات بنيتها الفراغية الوظيفية بفضل تنوع الخواص الكيميائية والكهربائية لجذور الأحماض الأمينية المكونة لها. تمثل الوثيقة المرفقة نتائج الهجرة الكهربائية عند $upright("pH") = ${pH}$ لخليط من ثلاثة أحماض أمينية: الليزين ($upright("Lys"): upright("pH")_i = 9.7$)، الألانين ($upright("Ala"): upright("pH")_i = 6.0$)، وحمض الغلوتاميك ($upright("Glu"): upright("pH")_i = 3.2$).`,
				content: [
					{
						type: 'image',
						src: elecUrl,
						caption: `الوثيقة: نتائج فصل خليط الأحماض الأمينية بالهجرة الكهربائية عند pH = ${pH}`
					},
					{
						type: 'text',
						content: `1) فسّر سلوك واتجاه هجرة كل حمض أميني في الوثيقة عند $upright("pH") = ${pH}$، ثم اكتب الصيغة الشاردية للخاصية الأمفوتيرية العامة لحمض أميني في الوسط الحامضي والمعتدل والقاعدي.`,
						answer: `1) التفسير:\n- **الليزين ($upright("pH") = ${pH} < 9.7$)**: يسلك سلوك قاعدة (يكتسب $upright("H")^+$) فتصبح شحنته موجبة ($+$) ويهاجر نحو القطب السالب (الكاثود).\n- **الألانين ($upright("pH") approx 6.0$)**: في نقطة تعادله الكهربائي ($upright("pH") approx upright("pH")_i$) فشحنته الإجمالية معدومة (أيون ثنائي القطب) فيبقى في المنتصف.\n- **حمض الغلوتاميك ($upright("pH") = ${pH} > 3.2$)**: يسلك سلوك حمض (يفقد $upright("H")^+$) فتصبح شحنته سالبة ($-$) ويهاجر نحو القطب الموجب (الأنود).\n- المعادلة الأمفوتيرية: ${BIO_EQUATIONS.zwitterion.typst}.`,
						mark: isMath ? '3' : '2'
					},
					{
						type: 'text',
						content: `2) اكتب **نصاً علمياً مهيكلاً** توضّح فيه مستويات البنية الفراغية الأربعة للبروتين، الروابط الكيميائية المثبتة لكل مستوى، وكيف يؤثر تغير $upright("pH")$ الوسط على استقرار البنية الوظيفية.`,
						answer: `2) **نص علمي مهيكل**:\n- **المقدمة والإشكالية**: تتوقف وظيفة كل بروتين على بنيته الفراغية الدقيقة التي تستقر بفضل روابط كيميائية متنوعة بين الأحماض الأمينية. فما هي مستويات هذه البنية، وما الروابط المثبتة لها، وكيف تتأثر بدرجة $upright("pH")$ الوسط؟\n- **العرض**: تتدرج البنية الفراغية عبر أربعة مستويات: (1) **البنية الأولية**: تتابع خطي للأحماض الأمينية مرتبطة بروابط ببتيدية؛ (2) **البنية الثانوية**: التفاف محلي على شكل حلزون $alpha$ أو وريقات مطوية $beta$ تثبتها روابط هيدروجينية بين $upright("-CO")$ و $upright("-NH")$؛ (3) **البنية الثالثية**: انطواء سلسلة واحدة عند مناطق الانعطاف وتثبتها أربعة روابط بين الجذور $upright("-R")$ هي الجسور ثنائية الكبريت ($upright("S-S")$ بين جذري $upright("Cys")$)، الروابط الشاردية ($upright("COO")^- dots.c upright("NH")_3^+$)، الروابط الهيدروجينية، وتجاذب الجذور الكارهة للماء؛ (4) **البنية الرابعية**: تجمع تحت وحدتين ببتيديتين أو أكثر. بفضل الخاصية الأمفوتيرية، يؤدي التغير الشديد في $upright("pH")$ الوسط إلى تغيير حالة تأين الجذور الحامضية والقاعدية، فتتكسر الروابط الشاردية وتفقد الجزيئة بنيتها الفراغية ووظيفتها.\n- **الخاتمة**: يرتبط التخصص الوظيفي للبروتين ارتباطاً وثيقاً باستقرار مستويات بنيته الفراغية والروابط الكيميائية المثبتة لها ضمن شروط $upright("pH")$ فيزيولوجية ملائمة.`,
						mark: isMath ? '5' : '3'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't1',
				difficulty,
				domain: 'protein_structure',
				titleAr: this.titleAr,
				onecRole: 'recall',
				quizQuestion,
				sujetExercise,
				hints: [
					`قارن pH الوسط (${pH}) بقيمة pHi لكل حمض أميني لتحديد شحنته (+، 0، −).`,
					'الأضداد تتجاذب: الموجب يتجه نحو الكاثود (−) والسالب نحو الأنود (+).',
					'اربط الخاصية الأمفوتيرية بكسر الروابط الشاردية عند تغير pH الوسط.'
				],
				solutionStepsAr: [
					`Lys (pHi=9.7 > ${pH}): موجب (+) ← الكاثود (−).`,
					`Ala (pHi=6.0 ≈ ${pH}): متعادل (0) ← يبقى في المنتصف.`,
					`Glu (pHi=3.2 < ${pH}): سالب (−) ← الأنود (+).`,
					'نص علمي مهيكل حول المستويات الأربعة والروابط وأثر pH.'
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 5. REASONING (7 pts SE) / RECALL (8 pts MATH when placed in MATH T2):
	//    Enzyme Kinetics v_i = f([S]), Vmax Saturation & pH / Temp Factors
	// ─────────────────────────────────────────────────────────────────────────
	const tplEnzymeKineticsPh: SciencesParameterizedTemplate = {
		id: 'sci_tpl_3as_shared_t1_reasoning_enzyme_kinetics_ph',
		grade,
		trimesterId: 't1',
		domain: 'enzymology',
		titleAr: isMath
			? 'استرجاع منظم: النوعية الإنزيمية، الموقع الفعال، الحركية وتأثير الـ pH والحرارة (+ نص علمي)'
			: 'استدلال علمي: الحركية الإنزيمية وتأثير تركيز الركيزة ودرجة الـ pH على النشاط الإنزيمي',
		curriculumLessonId: `${lessonPrefix}_t1_enzyme_specificity_kinetics`,
		defaultPoints: isMath ? 8 : 7,
		onecRole: isMath ? 'recall' : 'reasoning',
		generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const vmax = rng.pick([80, 100, 120]);
			const km = rng.pick([10, 15, 20]);
			const phOpt = rng.pick([6.5, 7.0, 7.5]);
			const sTest = km;
			const viAtKm = roundTo(vmax / 2, 1);

			const kinSvg = svgBioCurvePlot({
				title: 'تغيرات السرعة الابتدائية بدلالة تركيز الركيزة',
				xMin: 0,
				xMax: 100,
				yMin: 0,
				yMax: vmax + 20,
				xStep: 20,
				yStep: 20,
				xLabel: '[S] (mmol/L)',
				yLabel: 'Vi (UA)',
				curves: [{ fn: (s) => (vmax * s) / (km + s), color: '#2563eb', label: 'Vi = f([S])' }],
				dashedGuides: [
					{ x1: 0, y1: vmax, x2: 100, y2: vmax, color: '#dc2626', label: `Vmax = ${vmax}`, labelPos: 'top' },
					{ x1: 0, y1: viAtKm, x2: km, y2: viAtKm, color: '#0f766e' },
					{ x1: km, y1: 0, x2: km, y2: viAtKm, color: '#0f766e', label: `Km = ${km}`, labelPos: 'right' }
				],
				points: [{ x: km, y: viAtKm, label: `(${km}, ${viAtKm})`, color: '#0f766e' }]
			});
			const phSvg = svgBioCurvePlot({
				title: 'تأثير درجة الحموضة على النشاط الإنزيمي',
				xMin: 2,
				xMax: 12,
				yMin: 0,
				yMax: 115,
				xStep: 2,
				yStep: 20,
				xLabel: 'pH',
				yLabel: 'Vi (%)',
				curves: [{ fn: (p) => 100 * Math.exp(-Math.pow((p - phOpt) / 1.45, 2)), color: '#16a34a', label: 'الإنزيم المدروس' }],
				points: [{ x: phOpt, y: 100, label: `pH = ${phOpt}`, color: '#15803d' }]
			});
			const kinUrl = saveSciencesSvgAsset(`sci_${track}_t1_enz_kin_${difficulty}_s${seed}`, kinSvg);
			const phUrl = saveSciencesSvgAsset(`sci_${track}_t1_enz_ph_${difficulty}_s${seed}`, phSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = `${vmax}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `يمثل المنحنى المرفق تغيرات السرعة الابتدائية $v_i$ لإنزيم غلوكوز أوكسيداز بدلالة تركيز الركيزة $[\\text{S}]$. استخرج قيمة السرعة الأعظمية $V_{\\max}$ بوحدة $\\text{UA}$ من البيان.`,
					questionTextAr: 'أدخل قيمة السرعة الأعظمية Vmax (UA):',
					imageUrl: kinUrl,
					imageCaption: 'منحنى الحركية الإنزيمية',
					questionData: { answer: vmax, displayTemplate: 'Vmax = ? UA', variables: [], tolerance: 2 },
					explanation: `عند التراكيز العالية من الركيزة تثبت السرعة عند الخط المقارب الأفقي $V_{\\max} = ${vmax}\\text{ UA}$ بسبب تشبع جميع المواقع الفعالة للإنزيم.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = `${km}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `من منحنى الحركية الإنزيمية ($V_{\\max} = ${vmax}\\text{ UA}$)، ما قيمة تركيز الركيزة الموافق لنصف السرعة الأعظمية ($K_m$ بوحدة $\\text{mmol/L}$ حيث $v_i = ${viAtKm}\\text{ UA}$)?`,
					questionTextAr: 'أدخل قيمة Km بوحدة mmol/L:',
					imageUrl: kinUrl,
					imageCaption: 'تعيين Km عند Vmax/2',
					questionData: { answer: km, displayTemplate: 'Km = ? mmol/L', variables: [], tolerance: 1 },
					explanation: `بإسقاط نصف السرعة الأعظمية $V_{\\max}/2 = ${viAtKm}\\text{ UA}$ على المنحنى ثم على محور $[\\text{S}]$ نجد $K_m = ${km}\\text{ mmol/L}$.`
				};
			} else {
				finalAnswer = 'تغير الحالة الكهربائية لجذور الموقع الفعال فيمنع التكامل وتشكيل المعقد ES';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'انكسار الروابط الببتيدية وتفكك الإنزيم إلى أحماض أمينية حرة', diagnosticFeedback: 'الروابط الببتيدية لا تنكسر بمجرد تغير pH الفيزيولوجي.' },
						{ text: 'تشبع المواقع الفعالة بزيادة تركيز الركيزة', diagnosticFeedback: 'التشبع يسبب ثباتاً عند Vmax وليس انعدام النشاط.' },
						{ text: 'تحول الإنزيم إلى ركيزة جديدة', diagnosticFeedback: 'الإنزيم بروتين وسيط ولا يتحول إلى ركيزة.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `انطلاقاً من منحنى تأثير الـ $\\text{pH}$ ($\\text{pH}_{\\text{أمثل}} = ${phOpt}$)، كيف تفسّر انعدام النشاط الإنزيمي عند $\\text{pH} = 3$ أو $\\text{pH} = 11$؟`,
					questionTextAr: 'اختر التفسير البيوكيميائي الصحيح:',
					imageUrl: phUrl,
					imageCaption: 'منحنى تأثير pH على النشاط الإنزيمي',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: 'تؤثر درجة الحموضة المتطرفة في حالة تأين المجموعات الجانبية الحرة للأحماض الأمينية بالموقع الفعال، فتُكسر الروابط الشاردية ويفقد الموقع الفعال تكامله المحفّز مع الركيزة.'
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `الإنزيمات وسائط حيوية ذات طبيعة بروتينية تمتاز بالنوعية المزدوجة وحساسيتها الشديدة لعوامل الوسط (تركيز الركيزة، الـ $upright("pH")$، ودرجة الحرارة). تُمثّل الوثيقتان (1) و(2) نتائج قياس السرعة الابتدائية لإنزيم بتقنية $upright("ExAO")$ في تراكيز متزايدة من الركيزة ثم في قيم مختلفة للـ $upright("pH")$.`,
				content: [
					{
						type: 'columns',
						widths: ['1fr', '1fr'],
						children: [
							{ type: 'image', src: kinUrl, caption: 'الوثيقة (1): منحنى الحركية الإنزيمية' },
							{ type: 'image', src: phUrl, caption: 'الوثيقة (2): تأثير درجة الـ pH على النشاط' }
						]
					},
					{
						type: 'text',
						content: `1) حلّل منحنى الوثيقة (1) وحدد قيمتي $V_"max"$ و $K_m$ (التركيز الموافق لـ $V_"max"/2$)، ثم فسّر ثبات السرعة عند التراكيز العالية من الركيزة مع كتابة معادلة التفاعل الإنزيمي العام.`,
						answer: `1) **التحليل**: عند التراكيز الضعيفة من الركيزة ($[S] < ${km * 2} upright("mmol/L")$) تتزايد السرعة الابتدائية $v_i$ بسرعة مع تزايد $[S]$؛ وعند التراكيز المرتفعة تثبت السرعة عند قيمة عظمى $V_"max" = ${vmax} upright("UA")$، ويبلغ تركيز نصف السرعة $K_m = ${km} upright("mmol/L")$ (عند $v_i = ${viAtKm} upright("UA")$).\n- **التفسير**: في التراكيز المرتفعة تتشبع جميع المواقع الفعالة لجزيئات الإنزيم بجزيئات الركيزة (كل جزيئات الإنزيم في حالة معقد $upright("ES")$).\n- **معادلة التفاعل**: ${BIO_EQUATIONS.enzymeMechanism.typst}.`,
						mark: isMath ? '3' : '3.5'
					},
					{
						type: 'text',
						content: isMath
							? `2) باستغلال الوثيقة (2) ومكتسباتك، اكتب **نصاً علمياً مهيكلاً** تشرح فيه بنية الموقع الفعال، آلية التكامل المحفّز، وكيف يؤثر تغير الـ $upright("pH")$ ودرجة الحرارة على كفاءة النشاط الإنزيمي.`
							: `2) استخرج من الوثيقة (2) قيمة الـ $upright("pH")$ الأمثل، ثم فسّر مجهرياً انخفاض النشاط الإنزيمي عند الابتعاد عنه (في الأوساط الحامضية والقاعدية الشديدة) وقارن بين تأثير البرودة ($4 degree upright("C")$) والحرارة المرتفعة ($75 degree upright("C")$).`,
						answer: isMath
							? `2) **نص علمي مهيكل**:\n- **المقدمة والإشكالية**: تتوقف كفاءة الإنزيم كوسيط حيوي على بنية موقعه الفعال واستقرارها في شروط الوسط الفيزيولوجية. فما بنية الموقع الفعال وكيف يتأثر نشاطه بالـ $upright("pH")$ ودرجة الحرارة؟\n- **العرض**: يتكون الموقع الفعال من عدد محدود من الأحماض الأمينية المتقاربة فراغياً تشكل **موقع التثبيت** (يضمن النوعية تجاه الركيزة) و**موقع التحفيز** (يضمن النوعية تجاه نوع التفاعل). عند اقتراب الركيزة يحدث **تكامل بنيوي محفّز** لتشكيل المعقد $upright("ES")$ وتحويلها لناتج. يكون النشاط أعظمياً عند $upright("pH")$ أمثل ($${phOpt}$ في الوثيقة 2) وحرارة مثلى ($37 degree upright("C")$). الابتعاد عن $upright("pH")$ الأمثل يغير الشحنة الكهربائية لجذور الأحماض الأمينية بالموقع الفعال فيكسر الروابط الشاردية ويعيق تثبيت الركيزة. كما أن الحرارة المنخفضة تبطئ حركة الجزيئات (تثبيط عكوس)، بينما الحرارة المرتفعة تكسر الروابط الضعيفة فتخرب الموقع الفعال تخريباً غير عكوس.\n- **الخاتمة**: يشترط النشاط الإنزيمي الأمثل سلامة البنية الفراغية للموقع الفعال وتوفر الشروط المثلى للـ $upright("pH")$ ودرجة الحرارة.`
							: `2) الـ $upright("pH")$ الأمثل هو $${phOpt}$ (نشاط $100\%$). الابتعاد عنه يغيّر حالة تأين الوظائف الجانبية الحرة للأحماض الأمينية في الموقع الفعال ($upright("-COO")^-$ و $upright("-NH")_3^+$) فتتكسر الروابط الشاردية ويفقد الموقع الفعال تكامله البنيوي مع الركيزة.\n- المقارنة الحرارية: التبريد ($4 degree upright("C")$) يُبطئ حركة الجزيئات دون تخريب البنية (**تثبيط عكوس**)، بينما التسخين ($75 degree upright("C")$) يكسر الروابط الضعيفة المثبتة للبنية الفراغية (**تخريب غير عكوس**).`,
						mark: isMath ? '5' : '3.5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't1',
				difficulty,
				domain: 'enzymology',
				titleAr: this.titleAr,
				onecRole: isMath ? 'recall' : 'reasoning',
				quizQuestion,
				sujetExercise,
				hints: [
					`استخرج Vmax من الخط المقارب الأفقي (${vmax} UA) ثم أسقط Vmax/2 لإيجاد Km.`,
					'ثبات السرعة عند التراكيز العالية يُفسر بتشبع جميع المواقع الفعالة للإنزيم.',
					'اربط تأثير الـ pH بتغير الشحنة الكهربائية لجذور الأحماض الأمينية في الموقع الفعال.'
				],
				solutionStepsAr: [
					`Vmax = ${vmax} UA و Km = ${km} mmol/L (عند vi = ${viAtKm} UA).`,
					`التفسير: تشبع المواقع الفعالة في معقدات ES.`,
					`الـ pH الأمثل = ${phOpt}؛ التغير الشديد يخلّ بشحنة جذور الموقع الفعال ويمنع التكامل المحفّز.`
				],
				finalAnswer
			};
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// 6. SCIENTIFIC APPROACH (8 pts SE / 12 pts MATH):
	//    Drug Enzyme Inhibition (Oseltamivir / Statins / Non-competitive)
	// ─────────────────────────────────────────────────────────────────────────
	const tplApproachEnzymeInhibitors: SciencesParameterizedTemplate = {
		id: 'sci_tpl_3as_shared_t1_approach_enzyme_inhibitors',
		grade,
		trimesterId: 't1',
		domain: 'enzymology',
		titleAr: 'مسعى علمي: آلية عمل الأدوية المثبطة للإنزيمات (التثبيط التنافسي وغير التنافسي)',
		curriculumLessonId: `${lessonPrefix}_t1_enzyme_ph_temp_inhibition`,
		defaultPoints: isMath ? 12 : 8,
		onecRole: 'scientific_approach',
		generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const scenarios = [
				{
					drugAr: 'دواء الأوسيلتاميفير (تاميفلو)',
					enzymeAr: 'إنزيم النورامينيداز الفيروسي',
					substrateAr: 'حمض السياليك الغشائي',
					contextAr: 'منع تحرر فيروسات الإنفلونزا الجديدة من الخلايا المصابة',
					mode: 'competitive' as const,
					vmax0: 100,
					km0: 12,
					vmaxI: 100,
					kmI: 36
				},
				{
					drugAr: 'دواء الستاتين (الأتورفاستاتين)',
					enzymeAr: 'إنزيم HMG-CoA ريدوكتاز الكبدي',
					substrateAr: 'مركب HMG-CoA',
					contextAr: 'خفض الاصطناع الحيوي المفرط للكوليسترول لدى مرضى فرط كوليسترول الدم',
					mode: 'competitive' as const,
					vmax0: 120,
					km0: 15,
					vmaxI: 120,
					kmI: 45
				},
				{
					drugAr: 'مركب دوائي مثبط لا-تنافسي (I-24)',
					enzymeAr: 'إنزيم الكيناز الورمي',
					substrateAr: 'البروتين الركيزة S',
					contextAr: 'كبح الانقسام السريع للخلايا السرطانية عبر تعطيل نشاط الإنزيم',
					mode: 'noncompetitive' as const,
					vmax0: 100,
					km0: 15,
					vmaxI: 50,
					kmI: 15
				}
			];
			const sc = rng.pick(scenarios);
			const isComp = sc.mode === 'competitive';

			const curveSvg = svgBioCurvePlot({
				title: 'مقارنة الحركية الإنزيمية بوجود وغياب الدواء',
				xMin: 0,
				xMax: 120,
				yMin: 0,
				yMax: sc.vmax0 + 20,
				xStep: 20,
				yStep: 20,
				xLabel: '[S] (mmol/L)',
				yLabel: 'Vi (UA)',
				curves: [
					{ fn: (s) => (sc.vmax0 * s) / (sc.km0 + s), color: '#16a34a', label: 'بدون دواء' },
					{ fn: (s) => (sc.vmaxI * s) / (sc.kmI + s), color: '#dc2626', dashed: true, label: 'بوجود الدواء' }
				],
				dashedGuides: [
					{ x1: 0, y1: sc.vmax0, x2: 120, y2: sc.vmax0, color: '#15803d', label: `Vmax = ${sc.vmax0}`, labelPos: 'top' },
					...(isComp
						? []
						: [{ x1: 0, y1: sc.vmaxI, x2: 120, y2: sc.vmaxI, color: '#dc2626', label: `V'max = ${sc.vmaxI}`, labelPos: 'bottom' as const }])
				]
			});
			const inhibSvg = svgMolecularBiology('enzyme_inhibition', {
				title: 'النمذجة الجزيئية للتثبيط الإنزيمي'
			});
			const curveUrl = saveSciencesSvgAsset(`sci_${track}_t1_inh_curve_${difficulty}_s${seed}`, curveSvg);
			const inhibUrl = saveSciencesSvgAsset(`sci_${track}_t1_inh_mol_${difficulty}_s${seed}`, inhibSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = isComp ? 'تثبيط تنافسي' : 'تثبيط غير تنافسي';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{
							text: isComp ? 'تثبيط غير تنافسي' : 'تثبيط تنافسي',
							diagnosticFeedback: isComp
								? 'تذكر: بقاء Vmax ثابتة مع زيادة Km يميز التثبيط التنافسي!'
								: 'تذكر: انخفاض Vmax مع بقاء Km ثابتاً يميز التثبيط غير التنافسي!'
						},
						{ text: 'تخريب حراري غير عكوس للإنزيم', diagnosticFeedback: 'درجة الحرارة ثابتة ومثلى في التجربتين.' },
						{ text: 'تنشيط للإنزيم بزيادة الألفة للركيزة', diagnosticFeedback: 'المنحنى يظهر انخفاضاً في السرعة الابتدائية بوجود الدواء.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `عند دراسة تأثير **${sc.drugAr}** على **${sc.enzymeAr}**، سُجّل تغير الثوابت من ($V_{\\max} = ${sc.vmax0}, K_m = ${sc.km0}$) إلى ($V'_{\\max} = ${sc.vmaxI}, K'_m = ${sc.kmI}$). ما نمط هذا التثبيط؟`,
					questionTextAr: 'حدد نمط التثبيط الإنزيمي:',
					imageUrl: curveUrl,
					imageCaption: 'منحنيات الحركية بغياب وبوجود الدواء',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: isComp
						? `بما أن $V_{\\max}$ بقيت ثابتة ($${sc.vmax0}$) وارتفع $K_m$ من $${sc.km0}$ إلى $${sc.kmI}$ فالتثبيط تنافسي (عكوس برفع $[\\text{S}]$).`
						: `بما أن $V_{\\max}$ انخفضت من $${sc.vmax0}$ إلى $${sc.vmaxI}$ وبقي $K_m$ ثابتاً ($${sc.km0}$) فالتثبيط غير تنافسي.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = isComp
					? 'يشابه الركيزة فراغياً فينافسها على الموقع الفعال ويمنع تشكل المعقد ES'
					: 'يرتبط بموقع آخر غير الموقع الفعال فيشوه بنيته الفراغية ويمنع التحفيز';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{
							text: isComp
								? 'يرتبط بموقع بعيد عن الموقع الفعال ويغير Vmax'
								: 'يرتبط بالموقع الفعال ويُزاح تماماً برفع تركيز الركيزة',
							diagnosticFeedback: 'تحقق من منحنى الحركية: هل بلغت السرعة نفس Vmax عند التراكيز العالية؟'
						},
						{ text: 'يكسر الروابط الببتيدية للإنزيم', diagnosticFeedback: 'المثبط الدوائي لا يحلمه الإنزيم.' },
						{ text: 'يثبط استنساخ مورثة الإنزيم في النواة', diagnosticFeedback: 'التجربة أُجريت مخبرياً على إنزيم منقّى مع ركيزته.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما الآلية الجزيئية التي يعمل بها **${sc.drugAr}** لتعطيل **${sc.enzymeAr}**؟`,
					questionTextAr: 'اختر التفسير الجزيئي الصحيح:',
					imageUrl: inhibUrl,
					imageCaption: 'النمذجة الجزيئية لتثبيط الإنزيم',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: finalAnswer
				};
			} else {
				const sVal = sc.kmI;
				const viWithDrug = roundTo((sc.vmaxI * sVal) / (sc.kmI + sVal), 1);
				finalAnswer = `${viWithDrug}`;
				quizQuestion = {
					type: 'calculated',
					questionText: `في وجود **${sc.drugAr}** ($V'_{\\max} = ${sc.vmaxI}\\text{ UA}$ و $K'_m = ${sc.kmI}\\text{ mmol/L}$)، ما قيمة السرعة الابتدائية $v_i$ بوحدة $\\text{UA}$ عند التركيز $[\\text{S}] = ${sVal}\\text{ mmol/L}$؟`,
					questionTextAr: 'احسب السرعة الابتدائية Vi (UA):',
					imageUrl: curveUrl,
					imageCaption: 'حساب Vi من ثوابت المنحنى بوجود المثبط',
					questionData: { answer: viWithDrug, displayTemplate: 'Vi = ? UA', variables: [], tolerance: 1 },
					explanation: `بما أن $[\\text{S}] = K'_m = ${sVal}\\text{ mmol/L}$ فإن السرعة تساوي نصف السرعة الأعظمية: $v_i = \\frac{V'_{\\max}}{2} = \\frac{${sc.vmaxI}}{2} = ${viWithDrug}\\text{ UA}$.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `تعتمد الصيدلة الحديثة على تصميم أدوية نوعية تستهدف إنزيمات محددة للحد من تطور الأمراض. يُستعمل **${sc.drugAr}** بهدف ${sc.contextAr} عبر التأثير على **${sc.enzymeAr}** الذي يحفز تحويل **${sc.substrateAr}**.`,
				content: [
					{
						type: 'text',
						content: `**الجزء الأول**: 1) اقترح فرضيتين تفسّران بهما كيفية تثبيط **${sc.drugAr}** لنشاط **${sc.enzymeAr}**.`,
						answer: `1) الفرضيتان:\n- **الفرضية 1 (تثبيط تنافسي)**: يمتلك ${sc.drugAr} بنية فراغية مشابهة لـ ${sc.substrateAr} فينافسها على الموقع الفعال للإنزيم.\n- **الفرضية 2 (تثبيط غير تنافسي)**: يرتبط ${sc.drugAr} بموقع مغاير للموقع الفعال فيغيّر بنيته الفراغية ويمنع التحفيز.`,
						mark: isMath ? '2.25' : '1.5'
					},
					{
						type: 'columns',
						widths: ['1.15fr', '1fr'],
						children: [
							{ type: 'image', src: curveUrl, caption: 'الوثيقة (1): منحنيات الحركية الإنزيمية بغياب وبوجود الدواء' },
							{ type: 'image', src: inhibUrl, caption: 'الوثيقة (2): نمذجة جزيئية للتفاعل في الموقع الفعال' }
						]
					},
					{
						type: 'text',
						content: `**الجزء الثاني**: 2) حلّل مقارناً منحنيي الوثيقة (1) باستخراج قيمتي $V_"max"$ و $K_m$ في كل حالة، ثم حدد نمط التثبيط بدقة.`,
						answer: `2) **التحليل المقارن**: في غياب الدواء نجد $V_"max" = ${sc.vmax0} upright("UA")$ و $K_m = ${sc.km0} upright("mmol/L")$. أما بوجود ${sc.drugAr} فتصبح الثوابت $V'_"max" = ${sc.vmaxI} upright("UA")$ و $K'_m = ${sc.kmI} upright("mmol/L")$.\n- **الاستنتاج**: ${isComp ? 'بقاء $V_"max"$ ثابتة وارتفاع $K_m$ (تزايد التركيز اللازم لبلوغ نصف السرعة) يثبت أن الدواء **مثبط تنافسي**.' : 'انخفاض $V_"max"$ إلى النصف مع ثبات $K_m$ يثبت أن الدواء **مثبط غير تنافسي**.'}`,
						mark: isMath ? '3.75' : '2.5'
					},
					{
						type: 'text',
						content: `3) بدمج نتائجك مع الوثيقة (2)، اشرح الآلية الجزيئية الدقيقة لتأثير **${sc.drugAr}** وصادق على الفرضية الصحيحة، ثم وضّح لماذا ينصح الأطباء بالالتزام بجرعات منتظمة من الدواء.`,
						answer: `3) **الشرح والمصادقة**: ${isComp ? `يمتلك ${sc.drugAr} بنية فراغية مشابهة للركيزة ${sc.substrateAr} تسمح له بالتثبت داخل الموقع الفعال لـ ${sc.enzymeAr} وتشكيل معقد غير فعال ($upright("E-I")$) يمنع تشكل المعقد $upright("ES")$ ويوقف تشكل الناتج. وبذلك نصادق على **الفرضية 1**. ولأن التثبيط عكوس وتنافسي، يلزم الحفاظ على تركيز علاجي منتظم من الدواء لتفوقه على الركيزة الطبيعية في شغل المواقع الفعالة.` : `يرتبط ${sc.drugAr} بموقع مغاير للموقع الفعال على ${sc.enzymeAr} محدثاً تغيراً في البنية الفراغية للموقع الفعال يجعله عاجزاً عن التحفيز حتى بوجود تراكيز عالية من الركيزة، فتقل كمية الإنزيم الفعال وتنخفض $V_"max"$. وبذلك نصادق على **الفرضية 2**.`}`,
						mark: isMath ? '3.75' : '2.5'
					},
					{
						type: 'text',
						content: `**الجزء الثالث**: 4) أنجز مخططاً تحصيلياً يقارن بين مسار التفاعل الإنزيمي في غياب الدواء ومساره في وجود **${sc.drugAr}**.`,
						answer: `4) **المخطط التحصيلي**:\n- **بغياب الدواء**: إنزيم $upright("E")$ + ركيزة (${sc.substrateAr}) ← تكامل محفّز بالموقع الفعال ← معقد $upright("ES")$ ← تحرير الناتج $upright("P")$ ($V_"max" = ${sc.vmax0}$).\n- **بوجود ${sc.drugAr}**: ${isComp ? `تنافس الدواء مع الركيزة على الموقع الفعال ← تشكل معقد غير فعال ($upright("E-I")$) ← انخفاض المعقدات $upright("ES")$ ← تباطؤ التفاعل وتحقيق الأثر العلاجي (${sc.contextAr}).` : `ارتباط الدواء بموقع مغاير ← تشوه الموقع الفعال ← تعطيل التحفيز الإنزيمي ← انخفاض $V_"max"$ إلى $${sc.vmaxI}$ وتحقيق الأثر العلاجي.`}`,
						mark: isMath ? '2.25' : '1.5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't1',
				difficulty,
				domain: 'enzymology',
				titleAr: this.titleAr,
				onecRole: 'scientific_approach',
				quizQuestion,
				sujetExercise,
				hints: [
					'قارن قيمتي Vmax و Km بوجود المثبط وبغيابه لتصنيف نوع التثبيط بدقة.',
					'في التثبيط التنافسي تبقى Vmax ثابتة ويزداد Km؛ وفي غير التنافسي تنخفض Vmax ويبقى Km ثابتاً.',
					'اختم بمخطط تحصيلي مقارن بين الحالتين (غياب/وجود الدواء).'
				],
				solutionStepsAr: [
					`بدون دواء: Vmax=${sc.vmax0}, Km=${sc.km0} | بوجود الدواء: V'max=${sc.vmaxI}, K'm=${sc.kmI}.`,
					`نمط التثبيط: ${isComp ? 'تنافسي' : 'غير تنافسي'}.`,
					`الآلية: ${isComp ? 'تشابه بنيوي وحجب الموقع الفعال.' : 'ارتباط بموقع مغاير وتشويه الموقع الفعال.'}`
				],
				finalAnswer
			};
		}
	};

	return [
		tplRecallTranslation,
		tplMutationsStructure,
		tplApproachAntibiotics,
		tplRecallStructureElectrophoresis,
		tplEnzymeKineticsPh,
		tplApproachEnzymeInhibitors
	];
}

/**
 * Additional Domain 1 Scientific Approach Template (12 pts) for 3AS MATH T1:
 * Genetic Code + Electrophoresis Clinical Diagnosis of a Proteinopathy (Unit 1 + Unit 2)
 */
export function createMathElectrophoresisDiagnosisTemplate(
	track: TrackTag = '3as_math'
): SciencesParameterizedTemplate {
	const { grade, lessonPrefix } = makeTrackMeta(track);
	return {
		id: 'sci_tpl_3as_shared_t1_approach_electrophoresis_diagnosis',
		grade,
		trimesterId: 't1',
		domain: 'protein_structure',
		titleAr: 'مسعى علمي: استغلال الهجرة الكهربائية والشفرة الوراثية في تشخيص اعتلال بروتيني وراثي',
		curriculumLessonId: `${lessonPrefix}_t1_folding_mutations`,
		defaultPoints: 12,
		onecRole: 'scientific_approach',
		generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pH = rng.pick([8.4, 8.6]);
			// Authentic HbA vs HbS vs HbC (codons 4-7: Thr-Pro-Glu-Glu -> Thr-Pro-Val-Glu or Thr-Pro-Lys-Glu!)
			const variants = [
				{
					nameAr: 'الهيموغلوبين HbS (فقر الدم المنجلي)',
					normTemplate: 'TGAGGACTCCTC',
					mutTemplate: 'TGAGGACACCTC',
					replacedAa: 'Glu (حامضي، شحنة سالبة)',
					newAa: 'Val (معتدل غير قطبي)',
					normPos: 1 as const,
					mutPos: 0 as const,
					mutBandLabel: 'HbS (Val 0)'
				},
				{
					nameAr: 'الهيموغلوبين HbC (اعتلال كريات الدم الحمراء)',
					normTemplate: 'TGAGGACTCCTC',
					mutTemplate: 'TGAGGATTTCTC',
					replacedAa: 'Glu (حامضي، شحنة سالبة)',
					newAa: 'Lys (قاعدي، شحنة موجبة)',
					normPos: 1 as const,
					mutPos: -1 as const,
					mutBandLabel: 'HbC (Lys +)'
				}
			];
			const v = rng.pick(variants);
			const normSeq = transcribeAndTranslate(v.normTemplate);
			const mutSeq = transcribeAndTranslate(v.mutTemplate);
			const codonTable = buildMiniCodonTableRows([...normSeq.codons, ...mutSeq.codons]);
			const gluCharge = aminoAcidChargeAtPh(pH, 3.2);

			const elecSvg = svgMolecularBiology('electrophoresis', {
				title: 'تشخيص الهيموغلوبين بالهجرة الكهربائية',
				electrophoresis: {
					pH,
					bands: [
						{ label: 'HbA (Glu -)', pos: v.normPos, color: '#16a34a' },
						{ label: v.mutBandLabel, pos: v.mutPos, color: '#dc2626' }
					]
				}
			});
			const elecUrl = saveSciencesSvgAsset(`sci_${track}_t1_diag_elec_${difficulty}_s${seed}`, elecSvg);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = mutSeq.peptideStr;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: normSeq.peptideStr, diagnosticFeedback: 'هذه متتالية الهيموغلوبين الطبيعي HbA.' },
						{ text: [...mutSeq.peptide].reverse().join(' - '), diagnosticFeedback: 'عكست اتجاه الترجمة.' },
						{ text: 'Met - Ala - Asp - Val', diagnosticFeedback: 'راجع جدول الشفرة الوراثية للرامزات المعطاة.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في تشخيص **${v.nameAr}**، السلسلة المستنسخة الطافرة هي \`${mutSeq.dnaTriplets.join('-')}\`. ما متتالية الأحماض الأمينية الطافرة؟`,
					questionTextAr: 'اختر المتتالية الطافرة الصحيحة:',
					imageUrl: elecUrl,
					imageCaption: `الهجرة الكهربائية عند pH = ${pH}`,
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الـ ARNm الطافر هو \`${mutSeq.codons.join('-')}\` ويُترجم إلى \`${mutSeq.peptideStr}\` بدل \`${normSeq.peptideStr}\`.`
				};
			} else {
				finalAnswer = 'فقدان الشحنة السالبة لـ Glu عند pH القاعدي يقلل الهجرة نحو القطب الموجب (+)';
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'زيادة عدد السلاسل الببتيدية في الهيموغلوبين الطافر', diagnosticFeedback: 'يبقى عدد السلاسل (2α + 2β) ثابتاً.' },
						{ text: 'تحول الهيموغلوبين إلى أحماض نووية', diagnosticFeedback: 'الهيموغلوبين يبقى بروتيناً.' },
						{ text: 'تغير اتجاه التيار الكهربائي تلقائياً', diagnosticFeedback: 'التيار ثابت والفرق ناتج عن الشحنة الإجمالية للبروتين.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `لماذا هاجر الهيموغلوبين الطبيعي $\\text{HbA}$ أبعد نحو القطب الموجب ($+$) مقارنة بـ **${v.nameAr}** عند $\\text{pH} = ${pH}$؟`,
					questionTextAr: 'اختر التفسير الكهربائي الدقيق:',
					imageUrl: elecUrl,
					imageCaption: 'مقارنة الهجرة الكهربائية بين HbA والطافر',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `عند pH = ${pH} يكون Glu (${gluCharge.sign}) ذا شحنة سالبة قوية؛ استبداله بـ ${v.newAa} يقلل الشحنة السالبة الإجمالية للبروتين فيتراجع انجذابه للقطب الموجب (+).`
				};
			}

			const sujetExercise: ExerciseBlock = {
				points: 12,
				instruction: `تُستعمل تقنية الهجرة الكهربائية للبروتينات المصلية والدموية في المخابر الطبية لتشخيص اعتلالات الهيموغلوبين الوراثية مثل **${v.nameAr}**. لفهم العلاقة بين الطفرة الوراثية وتغير السلوك الكهربائي والبنيوي للبروتين، نقدم لك المعطيات الآتية.`,
				content: [
					{
						type: 'text',
						content: `**الجزء الأول**: يُظهر تحليل دم مريض شحوباً وفقر دم مزمناً مع تغير في هجرة الهيموغلوبين عند $upright("pH") = ${pH}$ مقارنة بشخص سليم.\n1) اطرح مشكلاً علمياً ثم اقترح فرضية تفسّر بها اختلاف موقع بقعة الهيموغلوبين الطافر عن الهيموغلوبين الطبيعي $upright("HbA")$.`,
						answer: `1) **المشكل العلمي**: ما هو السبب الجزيئي والكهربائي لاختلاف هجرة ${v.nameAr} عن $upright("HbA")$ وكيف يؤدي ذلك إلى اعتلال الكريات الحمراء؟\n- **الفرضية**: حدوث طفرة وراثية في مورثة السلسلة $beta$ استبدلت حمضاً أمينياً مشحوناً سالباً ($upright("Glu")$ أو $upright("Asp")$) بحمض أميني متعادل أو موجب، مما غيّر الشحنة الإجمالية والبنية الفراغية للبروتين.`,
						mark: '2.25'
					},
					{
						type: 'columns',
						widths: ['1.1fr', '1fr'],
						children: [
							{ type: 'image', src: elecUrl, caption: `الوثيقة (1): الهجرة الكهربائية عند pH = ${pH}` },
							{
								type: 'table',
								headers: ['الأليل', 'السلسلة المستنسخة (3\' → 5\')'],
								cells: [],
								rows: [
									['أليل HbA (سليم)', normSeq.dnaTriplets.join(' - ')],
									['أليل طافر (مصاب)', mutSeq.dnaTriplets.join(' - ')]
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
						content: `**الجزء الثاني**: 2) استخرج متتاليتي $upright("ARNm")$ والأحماض الأمينية للأليلين، ثم قارنهما لتحديد طبيعة الاستبدال البروتيني.`,
						answer: `2) أليل $upright("HbA")$: $upright("ARNm")$ = ${normSeq.codons.join(' - ')} ← الببتيد: **${normSeq.peptideStr}**.\n- الأليل الطافر: $upright("ARNm")$ = ${mutSeq.codons.join(' - ')} ← الببتيد: **${mutSeq.peptideStr}**.\n- المقارنة: استُبدل الحمض الأميني ${v.replacedAa} في الموضع الثالث من القطعة بالحمض الأميني ${v.newAa}.`,
						mark: '3.75'
					},
					{
						type: 'text',
						content: `3) باستغلال الوثيقة (1) والخاصية الأمفوتيرية (علماً أن $upright("pH")_i(upright("Glu")) = 3.2$)، فسّر اختلاف مسافة هجرة البروتينين عند $upright("pH") = ${pH}$ وصادق على فرضيتك.`,
						answer: `3) التفسير الكهربائي: عند $upright("pH") = ${pH} > 3.2$ يتأين جذر حمض الغلوتاميك ($upright("-COO")^-$) فتكون شحنة $upright("HbA")$ أكثر سلبية (${gluCharge.directionAr}). أما في ${v.nameAr} فاستبدال $upright("Glu")$ بـ ${v.newAa} ينقص الشحنة السالبة الإجمالية للبروتين، لذا تكون هجرته نحو القطب الموجب ($+$) أضعف (أو يتجه نحو القطب السالب في $upright("HbC")$). وهذا يثبت صحة الفرضية المقترحة.`,
						mark: '3.75'
					},
					{
						type: 'text',
						content: `**الجزء الثالث**: 4) أنجز مخططاً تحصيلياً يربط بين التغير الوراثي، الخاصية الكهربائية، البنية الفراغية، والتشخيص المخبري لـ ${v.nameAr}.`,
						answer: `4) المخطط التحصيلي: طفرة استبدال في مورثة $beta$-غلوبين ← تغير رامزة $upright("GAG")$ ← تعويض $upright("Glu")$ السالب بـ ${v.newAa} ← (1) نقص الشحنة السالبة ← اختلاف موقع البقعة في الهجرة الكهربائية (تشخيص مخبري)، و(2) تغير الروابط السطحية والبنية الفراغية ← تضرر الكرية الحمراء (مرض وراثي).`,
						mark: '2.25'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade,
				trimesterId: 't1',
				difficulty,
				domain: 'protein_structure',
				titleAr: this.titleAr,
				onecRole: 'scientific_approach',
				quizQuestion,
				sujetExercise,
				hints: [
					'ترجم السلسلتين المستنسختين بدقة لتحديد الحمض الأميني المستبدَل.',
					'قارن الشحنة الكهربائية لجذر Glu عند pH القاعدي مع شحنة الحمض البديل.',
					'اختم بمخطط تحصيلي يبرز التشخيص الكهربائي والبنيوي معاً.'
				],
				solutionStepsAr: [
					`HbA: ${normSeq.peptideStr} | الطافر: ${mutSeq.peptideStr}.`,
					`استبدال ${v.replacedAa} بـ ${v.newAa}.`,
					`فقدان الشحنة السالبة يغير الهجرة الكهربائية عند pH = ${pH} ويثبت الفرضية.`
				],
				finalAnswer
			};
		}
	};
}
