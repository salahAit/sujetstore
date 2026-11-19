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
	svgGeneticsDiagram,
	wrapSciencesSvg
} from '../../svg-sciences';

function svgNuclearCloningExercise(opts: { donorNuc: string; donorEgg: string; surrogate: string }): string {
	let body = `<rect x="6" y="6" width="448" height="224" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">الوثيقة: تجربة زرع النواة لإثبات مقر المعلومة الوراثية</text>`;

	body += `<rect x="308" y="44" width="132" height="68" rx="8" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.6"/>`;
	body += `<text x="374" y="68" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">${esc(opts.donorNuc)}</text>`;
	body += `<text x="374" y="92" text-anchor="middle" font-size="9.8" fill="#2563eb">أخذ النواة (2n)</text>`;

	body += `<rect x="308" y="132" width="132" height="68" rx="8" fill="#f1f5f9" stroke="#334155" stroke-width="1.6"/>`;
	body += `<text x="374" y="156" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">${esc(opts.donorEgg)}</text>`;
	body += `<text x="374" y="180" text-anchor="middle" font-size="9.8" fill="#dc2626">بويضة منزوعة النواة</text>`;

	body += `<rect x="164" y="84" width="118" height="78" rx="8" fill="#fefce8" stroke="#ca8a04" stroke-width="1.8"/>`;
	body += `<text x="223" y="108" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#854d0e">دمج النواة والهيولى</text>`;
	body += `<text x="223" y="132" text-anchor="middle" font-size="9.5" fill="#713f12">زرع الجنين في رحم:</text>`;
	body += `<text x="223" y="150" text-anchor="middle" font-size="9.8" font-weight="bold" fill="#92400e">${esc(opts.surrogate)}</text>`;

	body += `<rect x="18" y="76" width="122" height="94" rx="8" fill="#f0fdf4" stroke="#15803d" stroke-width="2"/>`;
	body += `<text x="79" y="104" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534">المولود الناتج:</text>`;
	body += `<text x="79" y="130" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#15803d">مطابق تماماً لـ</text>`;
	body += `<text x="79" y="152" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">${esc(opts.donorNuc)}</text>`;

	body += `<line x1="308" y1="78" x2="282" y2="112" stroke="#1d4ed8" stroke-width="2"/>`;
	body += `<line x1="308" y1="166" x2="282" y2="136" stroke="#334155" stroke-width="2"/>`;
	body += `<line x1="164" y1="122" x2="140" y2="122" stroke="#15803d" stroke-width="2.2"/>`;

	return wrapSciencesSvg(460, 236, body);
}

function svgBemMock1Composite(opts: { patient: string; group: string; hb: number }): string {
	let body = `<rect x="6" y="6" width="448" height="236" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="230" y="25" text-anchor="middle" font-size="12.8" font-weight="bold" fill="#0f172a">الوثيقة 1: نتائج فحص الزمرة الدموية والالتهاب الموضعي لدى ${esc(opts.patient)}</text>`;

	// Right half: ABO/Rh test (O-)
	body += `<rect x="236" y="42" width="204" height="184" rx="8" fill="#ffffff" stroke="#1d4ed8" stroke-width="1.6"/>`;
	body += `<text x="338" y="62" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">اختبار الزمرة الدموية</text>`;
	const drops = [
		{ x: 400, lbl: 'Anti-A', agg: opts.group.startsWith('A') },
		{ x: 338, lbl: 'Anti-B', agg: opts.group.startsWith('B') },
		{ x: 276, lbl: 'Anti-D', agg: opts.group.includes('+') }
	];
	for (const d of drops) {
		body += `<text x="${d.x}" y="90" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#334155">${esc(d.lbl)}</text>`;
		body += `<circle cx="${d.x}" cy="126" r="20" fill="${d.agg ? '#fee2e2' : '#ef4444'}" stroke="#991b1b" stroke-width="1.5"/>`;
		if (d.agg) {
			for (const [dx, dy] of [[-7, -5], [6, -6], [-4, 7], [7, 6], [0, 0]]) {
				body += `<circle cx="${d.x + dx}" cy="${126 + dy}" r="3.4" fill="#991b1b"/>`;
			}
		}
		body += `<text x="${d.x}" y="166" text-anchor="middle" font-size="9.2" font-weight="bold" fill="${d.agg ? '#dc2626' : '#15803d'}">${d.agg ? 'ارتصاص' : 'دون ارتصاص'}</text>`;
	}
	body += `<text x="338" y="202" text-anchor="middle" font-size="10" font-weight="bold" fill="#b91c1c">نقص الهيموغلوبين بعد النزيف</text>`;

	// Left half: Reflex & Nerve injury note
	body += `<rect x="20" y="42" width="202" height="184" rx="8" fill="#f0fdf4" stroke="#15803d" stroke-width="1.6"/>`;
	body += `<text x="121" y="62" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534">الفحص العصبي والجرح الملوث</text>`;
	body += `<rect x="34" y="78" width="174" height="58" rx="6" fill="#ffffff" stroke="#16a34a" stroke-width="1.3"/>`;
	body += `<text x="121" y="98" text-anchor="middle" font-size="10" font-weight="bold" fill="#0f172a">فقدان الإحساس والحركة بالقدم اليمنى</text>`;
	body += `<text x="121" y="118" text-anchor="middle" font-size="9.5" fill="#dc2626">الأشعة: قطع العصب الوركي الأيمن</text>`;
	body += `<rect x="34" y="148" width="174" height="62" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="1.3"/>`;
	body += `<text x="121" y="168" text-anchor="middle" font-size="10" font-weight="bold" fill="#991b1b">جرح عميق ملوث + التهاب</text>`;
	body += `<text x="121" y="186" text-anchor="middle" font-size="9.4" fill="#1e293b">احمرار، انتفاخ، ألم وبلعميات</text>`;
	body += `<text x="121" y="202" text-anchor="middle" font-size="9.4" font-weight="bold" fill="#b91c1c">لقاح الكزاز غير محيّن منذ 14 سنة</text>`;

	return wrapSciencesSvg(460, 248, body);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Gametes, Meiosis, Fertilization & Sex Determination (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const gametesFertilizationTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4am_t3_gametes_fertilization_sex',
	grade: '4am',
	trimesterId: 't3',
	domain: 'reproduction_genetics',
	titleAr: 'تشكل الأمشاج بالانقسام المنصف، الإلقاح واستعادة الصيغة الصبغية (BEM)',
	curriculumLessonId: 'sci_lesson_4am_t3_gametes_meiosis_fertilization',
	defaultPoints: 6,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const babySex = rng.pick([
			{ sperm: '22 + Y', zygote: '44 + XY', sexAr: 'ذكر' },
			{ sperm: '22 + X', zygote: '44 + XX', sexAr: 'أنثى' }
		]);
		const svg = svgGeneticsDiagram('meiosis_stages', {
			title: 'الوثيقة: مراحل الانقسام المنصف أثناء تشكل الأمشاج (2n ← n)'
		});
		const imageUrl = saveSciencesSvgAsset(`sci_4am_t3_meiosis_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`تُنتج البيضة الملقحة (${babySex.zygote} ← ${babySex.sexAr})، ويحدد الأب جنس المولود باحتمال 50% لكون نطافه نوعين (X أو Y)`,
			[
				{
					text: 'تحدد الأم جنس المولود لأنها تنتج نوعين من البويضات (22+X و 22+Y)',
					diagnosticFeedback: 'جميع بويضات الأم متماثلة ($22 + X$)؛ **الأب** هو من ينتج نوعين من النطاف ($22 + X$ و $22 + Y$).'
				},
				{
					text: 'تحتوي النطفة والبويضة على 46 صبغياً قبل الإلقاح',
					diagnosticFeedback: 'يختزل الانقسام المنصف الصبغيات إلى النصف فتحتوي كل من النطفة والبويضة على **$n = 23$ صبغياً** فقط.'
				},
				{
					text: 'يؤدي الإلقاح إلى اختزال الصبغيات من 46 إلى 23 صبغياً',
					diagnosticFeedback: 'العكس: **الانقسام المنصف** هو من يختزل الصبغيات ($2n \\to n$)، أما **الإلقاح** فيستعيد الصيغة الثنائية ($n + n \\to 2n = 46$).'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: `التقت بويضة ($22 + X$) بنطفة صيغتها الصبغية ($${babySex.sperm}$). ما الصيغة الصبغية للبيضة الملقحة، ومن يحدد جنس المولود بيولوجياً؟`,
				questionTextAr: `ما ناتج التقاء بويضة ($22 + X$) مع نطفة ($${babySex.sperm}$) ومن يحدد جنس المولود؟`,
				imageUrl,
				imageCaption: 'مراحل الانقسام المنصف في تشكل الأمشاج',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الاندماج يعطي بيضة ملقحة ($${babySex.zygote}$ ← **${babySex.sexAr}**)، ويحدد الأب الجنس لأن نطافه نوعان ($22+X$ أو $22+Y$) بنسبة $50\\%$.`
			},
			sujetExercise: {
				points: 6,
				instruction: `رغم أن الخلايا الجسمية للإنسان تحتوي على $46$ صبغياً ($2n = 46$)، يبقى عدد الصبغيات ثابتاً عبر الأجيال بفضل تعاقب ظاهرتين بيولوجيتين أساسيتين: *الانقسام المنصف* (الموضح في الوثيقة) و*الإلقاح*.`,
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) حدّد مقر تشكل كل من *النطاف* و*البويضات*، واذكر المراحل الأربع لتشكل النطاف بالترتيب، مع إبراز دور *الانقسام المنصف*.`,
								answer: `1) تتشكل النطاف في *الأنابيب المنوية بالخصيتين*، وتتشكل البويضات في *المبيضين*.\n\nمراحل تشكل النطاف: (1) التكاثر، (2) النمو، (3) *النضج* (يحدث فيه *الانقسام المنصف* الذي يختزل الصبغيات من $2n = 46$ إلى $n = 23$)، (4) التمايز (اكتساب السوط).`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: مراحل الانقسام المنصف'
							}
						]
					},
					{
						type: 'text',
						content: `2) اكتب الصيغة الصبغية التفصيلية لكل من: *خلية جسمية لأنثى*، *خلية جسمية لذكر*، *بويضة*، و*نوعي النطاف*.`,
						answer: `2) - خلية جسمية لأنثى: $2n = 44 + "XX"$.\n- خلية جسمية لذكر: $2n = 44 + "XY"$.\n- البويضة: نوع واحد $n = 22 + "X"$.\n- النطاف: نوعان بنسب متساوية $n = 22 + "X"$ أو $n = 22 + "Y"$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) عرّف *الإلقاح*، وحدّد الصيغة الصبغية وجنس البيضة الملقحة الناتجة عن التقاء بويضة ($22 + "X"$) بنطفة ($${babySex.sperm}$), مبيّناً لماذا يُعد *الأب* (النطفة) هو المحدد البيولوجي لجنس المولود.`,
						answer: `3) *الإلقاح*: اندماج نواة النطفة ($n = 23$) مع نواة البويضة ($n = 23$) لتشكيل *بيضة ملقحة* تستعيد الصيغة الصبغية الثنائية للنوع ($2n = 46$).\n\nناتج الالتقاء: بيضة ملقحة *$${babySex.zygote}$* (جنين *${babySex.sexAr}*). ويحدد الأب الجنس لأن الأم لا تنتج إلا بويضات ($22 + "X"$), بينما ينتج الأب نوعين متساويي الاحتمال ($50\%$) من النطاف ($22+"X"$ للأنثى أو $22+"Y"$ للذكر).`,
						mark: '2'
					}
				]
			},
			hints: [
				'المراحل الأربع لتشكل النطاف: تكاثر ← نمو ← نضج (انقسام منصف) ← تمايز.',
				'الخلية الجسمية 2n = 46 (44 + XX أو XY)، والمشيج n = 23 (22 + X أو Y).',
				'الإلقاح يستعيد الصيغة الثنائية 2n = 46 ويحدد الجنس حسب نوع النطفة.'
			],
			solutionStepsAr: [
				'مقر تشكل الأمشاج ومراحل تشكل النطاف ودور الانقسام المنصف.',
				'كتابة الصيغ الصبغية للخلايا الجسمية والأمشاج.',
				`تعريف الإلقاح واستنتاج البيضة الملقحة (${babySex.zygote} — ${babySex.sexAr}) وتبرير دور الأب.`
			],
			finalAnswer: `${babySex.zygote} (${babySex.sexAr})`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Nuclear Transfer Experiment & Genetic Support (DNA/Genes) (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const nuclearTransferTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4am_t3_nuclear_transfer_dna',
	grade: '4am',
	trimesterId: 't3',
	domain: 'reproduction_genetics',
	titleAr: 'الدعامة الوراثية للصفات: تجربة زرع النواة، الصبغيات، والـ ADN (BEM)',
	curriculumLessonId: 'sci_lesson_4am_t3_genetic_support_karyotype',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const exp = rng.pick([
			{ donorNuc: 'بقرة بيضاء مرقطة', donorEgg: 'بقرة سوداء', surrogate: 'بقرة حاضنة بنية', offspring: 'عجل أبيض مرقط' },
			{ donorNuc: 'فأرة رمادية', donorEgg: 'فأرة بيضاء', surrogate: 'فأرة حاضنة سوداء', offspring: 'فأر رمادي' }
		]);
		const svg = svgNuclearCloningExercise(exp);
		const imageUrl = saveSciencesSvgAsset(`sci_4am_t3_nuc_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`تثبت التجربة أن النواة هي مقر المعلومة الوراثية (المحمولة على الصبغيات المكونة من ADN والمورثات)`,
			[
				{
					text: 'تثبت التجربة أن هيولى البويضة هي مقر الصفات الوراثية',
					diagnosticFeedback: `لو كانت الهيولى هي مقر الصفات الوراثية لشابه المولود ${exp.donorEgg} وليس ${exp.donorNuc}!`
				},
				{
					text: 'تثبت التجربة أن الأم الحاضنة تنقل صفاتها الوراثية عبر الدم',
					diagnosticFeedback: `الأم الحاضنة (${exp.surrogate}) تغذي الجنين وتحميه في الرحم فقط ولم تنقل له لونها.`
				},
				{
					text: 'الصفات المكتسبة كالوشم وتقوية العضلات تنتقل عبر الـ ADN للأبناء',
					diagnosticFeedback: 'الصفات **المكتسبة** لا تغيّر الـ ADN ولا تُورَّث أبداً.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `في تجربة زرع نواة من ${exp.donorNuc} في بويضة منزوعة النواة من ${exp.donorEgg} ثم زرعها في ${exp.surrogate}، وُلد ${exp.offspring}. ماذا تستنتج علمياً؟`,
				questionTextAr: 'ما الاستنتاج العلمي المستخلص من تجربة زرع النواة المبينة في الوثيقة؟',
				imageUrl,
				imageCaption: 'تجربة زرع النواة',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `مماثلة المولود لمانحة النواة (${exp.donorNuc}) تثبت أن **النواة** هي مقر البرنامج الوراثي المحمول على الصبغيات والـ **ADN**.`
			},
			sujetExercise: {
				points: 6,
				instruction: `لتحديد مقر المعلومة الوراثية داخل الخلية، أنجز العلماء تجربة *زرع النواة* الموضحة في الوثيقة المقابلة، حيث وُلد *${exp.offspring}* يحمل تماماً صفات *${exp.donorNuc}*.`,
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) فسّر سبب تشابه المولود الناتج مع *${exp.donorNuc}* وعدم تشابهه مع *${exp.donorEgg}* ولا مع *${exp.surrogate}*، ثم استنتج مقر المعلومة الوراثية.`,
								answer: `1) جاء المولود (${exp.offspring}) مطابقاً لـ${exp.donorNuc} لأنها هي التي قدّمت *النواة*، بينما قدّمت ${exp.donorEgg} الهيولى فقط وقدّمت ${exp.surrogate} الرحم والتغذية.\n\n*الاستنتاج*: *النواة* هي مقر المعلومة الوراثية المسؤولة عن نقل الصفات الوراثية.`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: بروتوكول تجربة زرع النواة'
							}
						]
					},
					{
						type: 'text',
						content: `2) حدّد الدعامة الخيطية الموجودة داخل النواة، وممّ تتكون كيميائياً، مع ترتيب المصطلحات الآتية من الأكبر إلى الأصغر: *مورثة، خلية، جزيئة $upright("ADN")$، نواة، صبغي*.`,
						answer: `2) الدعامة هي *الصبغيات*، وتتكون كيميائياً من جزيئة *الـ $upright("ADN")$* (الحمض النووي الريبي منقوص الأكسجين) التي تحمل *المورثات*.\n\nالترتيب من الأكبر للأصغر: *خلية $arrow.r$ نواة $arrow.r$ صبغي $arrow.r$ جزيئة $upright("ADN")$ $arrow.r$ مورثة*.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) ميّز بين *الصفة الوراثية* و*الصفة المكتسبة*، وصنّف الصفات التالية: *فصيلة الدم، لون العيون، إتقان اللغة الإنجليزية، ندبة جرح في اليد*.`,
						answer: `3) الصفة الوراثية محمولة على المورثات وتنتقل عبر الأجيال؛ أما الصفة المكتسبة فتنتج عن البيئة والتدريب ولا تُورَّث.\n- *صفات وراثية*: فصيلة الدم، لون العيون.\n- *صفات مكتسبة*: إتقان اللغة الإنجليزية، ندبة الجرح.`,
						mark: '2'
					}
				]
			},
			hints: [
				'تطابق المولود مع مانحة النواة يثبت أن النواة هي مقر البرنامج الوراثي.',
				'رتّب البنى من الأكبر للأصغر: خلية ← نواة ← صبغي ← ADN ← مورثة.',
				'الصفات الوراثية كفصيلة الدم ولون العيون تورث، والمكتسبة كاللغة والندوب لا تورث.'
			],
			solutionStepsAr: [
				'تفسير نتيجة تجربة زرع النواة واستنتاج أن النواة مقر المعلومة الوراثية.',
				'تحديد الصبغيات والـ ADN وترتيب البنى الوراثية.',
				'التمييز بين الصفات الوراثية والمكتسبة وتصنيف الأمثلة.'
			],
			finalAnswer: 'النواة ← الصبغيات ← الـ ADN ← المورثات'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Karyotype Analysis & Trisomy 21 (Down Syndrome) (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const trisomy21KaryotypeTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4am_t3_trisomy21_karyotype',
	grade: '4am',
	trimesterId: 't3',
	domain: 'reproduction_genetics',
	titleAr: 'تحليل الطابع النووي وتشخيص الشذوذ الصبغي: تناذر داون (ثلاثية الصبغي 21)',
	curriculumLessonId: 'sci_lesson_4am_t3_chromosomal_hereditary_diseases',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sex = rng.pick(['XY', 'XX'] as const);
		const sexAr = sex === 'XY' ? 'ذكر (طفل)' : 'أنثى (طفلة)';
		const formula = sex === 'XY' ? '45 + XY' : '45 + XX';
		const svg = svgGeneticsDiagram('karyotype', {
			trisomy21: true,
			sex,
			title: 'الوثيقة: الطابع النووي لخلية جسمية لمولود مصاب بشذوذ صبغي'
		});
		const imageUrl = saveSciencesSvgAsset(`sci_4am_t3_tri21_${sex}_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`جنسه ${sexAr}، صيغته الصبغية $2n + 1 = 47$ (${formula})، وهو مصاب بتناذر داون (ثلاثية الصبغي 21)`,
			[
				{
					text: `صيغته الصبغية طبيعية $2n = 46$ (${sex === 'XY' ? '44 + XY' : '44 + XX'})`,
					diagnosticFeedback: 'دقّق في الموقع رقم 21 بالوثيقة: توجد **3 صبغيات** بدلاً من زوج واحد، فالمجموع $47$ صبغياً!'
				},
				{
					text: `جنسه ${sex === 'XY' ? 'أنثى' : 'ذكر'} ومصاب بالهيموفيليا`,
					diagnosticFeedback: `انظر للزوج الأخير (23): إنه **${sex}** (${sexAr})، كما أن وجود 3 صبغيات في الموقع 21 هو **تناذر داون** وليس الهيموفيليا.`
				},
				{
					text: 'خلية جنسية (مشيج) بها 23 صبغياً مفرداً',
					diagnosticFeedback: 'الصبغيات مرتبة في أزواج (مع ثلاثية في 21) فهي **خلية جسمية** وليست مشيجاً.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: 'انطلاقاً من تحليل الطابع النووي الموضح في الوثيقة، حدّد جنس المولود، صيغته الصبغية، واسم الشذوذ الصبغي:',
				questionTextAr: 'حلل الطابع النووي في الوثيقة واختر التشخيص الصحيح:',
				imageUrl,
				imageCaption: 'الطابع النووي لشخص مصاب بثلاثية 21',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `وجود 3 نسخ من الصبغي 21 يجعل الصيغة **$2n + 1 = 47$ (${formula})** ← **تناذر داون** عند **${sexAr}**.`
			},
			sujetExercise: {
				points: 6,
				instruction: `أجرى طبيب الأطفال فحص *الطابع النووي* لخلية جسمية لمولود ظهرت عليه ملامح مميزة وتأخر في النمو العقلي، فحصل على الوثيقة المقابلة.`,
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) حدّد *نوع الخلية* المدروسة و*جنس المولود* مع التعليل الدقيق من الوثيقة.`,
								answer: `1) - نوع الخلية: *خلية جسمية* لأن الصبغيات مرتبة في أزواج متماثلة.\n- جنس المولود: *${sexAr}* لأن الزوج الصبغي الجنسي رقم 23 هو *${sex}* (${sex === 'XY' ? 'مختلفا الشكل والحجم' : 'متماثلان'}).`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: الطابع النووي للمولود'
							}
						]
					},
					{
						type: 'text',
						content: `2) استخرج *الشذوذ الصبغي* الملاحظ في الطابع النووي، وسمِّ هذه الحالة المرضية، ثم اكتب *الصيغة الصبغية* الكاملة لهذا المولود.`,
						answer: `2) - الشذوذ الصبغي: وجود *ثلاثة صبغيات في الموقع 21* بدلاً من زوج (صبغي جسمي إضافي).\n- اسم الحالة: *تناذر داون (ثلاثية الصبغي 21)*.\n- الصيغة الصبغية: *$2n + 1 = 47$* وتكتب تفصيلياً: *$${formula}$*.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) فسّر الأصل البيولوجي لهذا الشذوذ أثناء *تشكل الأمشاج* و*الإلقاح* (حدد عدد الصبغيات في المشيجين الملتقيين).`,
						answer: `3) حدث خلل أثناء *الانقسام المنصف* عند أحد الأبوين حيث *لم ينفصل زوج الصبغيات رقم 21*، فنتج مشيج شاذ يحمل $24$ صبغياً ($n + 1$، به نسختان من الصبغي 21) وعند التقائه أثناء الإلقاح بمشيج طبيعي يحمل $23$ صبغياً ($n$) تشكلت بيضة ملقحة بها $24 + 23 = 47$ صبغياً.`,
						mark: '2'
					}
				]
			},
			hints: [
				'الصبغيات المرتبة في أزواج تدل على خلية جسمية، والزوج 23 (XX أو XY) يحدد الجنس.',
				'في ثلاثية 21 يصبح عدد الصبغيات الجسمية 45 بدلاً من 44 (المجموع 47).',
				'السبب هو عدم افتراق الصبغيين 21 أثناء الانقسام المنصف (مشيج 24 + مشيج 23 = 47).'
			],
			solutionStepsAr: [
				`خلية جسمية وجنسها ${sexAr} (الزوج ${sex}).`,
				`شذوذ ثلاثية 21 (تناذر داون)، الصيغة الصبغية $2n + 1 = 47$ (${formula}).`,
				'تفسير الشذوذ بعدم افتراق الزوج 21 أثناء الانقسام المنصف (24 + 23 = 47).'
			],
			finalAnswer: `تناذر داون (ثلاثية 21) — ${formula} (${sexAr})`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Hereditary Diseases, Pedigree Chart & Danger of Consanguinity (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const pedigreeConsanguinityTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4am_t3_hereditary_pedigree_consanguinity',
	grade: '4am',
	trimesterId: 't3',
	domain: 'reproduction_genetics',
	titleAr: 'تحليل شجرة النسب، الأمراض الوراثية وخطورة زواج الأقارب (BEM)',
	curriculumLessonId: 'sci_lesson_4am_t3_chromosomal_hereditary_diseases',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const disease = rng.pick([
			{ name: 'الهيموفيليا (عدم تخثر الدم)', detail: 'نزيف دموي مستمر عند أبسط جرح' },
			{ name: 'الثلاسيميا (فقر الدم الوراثي)', detail: 'تشوه الهيموغلوبين وفقر دم حاد مزمن' },
			{ name: 'المهق (الألبينيزم)', detail: 'غياب صبغة الميلانين في الجلد والشعر والعيون' }
		]);
		const svg = svgGeneticsDiagram('pedigree_chart', {
			title: `الوثيقة: شجرة نسب عائلة (أبوان ابنا عم) ظهر بها مرض ${disease.name}`
		});
		const imageUrl = saveSciencesSvgAsset(`sci_4am_t3_ped_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`المرض وراثي متنحٍ؛ الأبوان السليمان (I) حاملان خفيان لمورثة المرض وبحكم قرابتهما التقت النسختان لدى الطفلة المصابة (II-2)`,
			[
				{
					text: 'المرض معدي انتقل للطفلة عن طريق بكتيريا من الجو',
					diagnosticFeedback: `${disease.name} مرض **وراثي** ينتقل عبر المورثات والصبغيات وليس مرضاً بكتيرياً معدياً.`
				},
				{
					text: 'زواج الأقارب يقلل من احتمال ظهور الأمراض الوراثية المتنحية',
					diagnosticFeedback: 'العكس تماماً: **زواج الأقارب يرفع بشدة** احتمال التقاء المورثات الممرضة المتنحية.'
				},
				{
					text: 'عدد صبغيات الطفلة المصابة يصبح حتماً 47 صبغياً مثل تناذر داون',
					diagnosticFeedback: `${disease.name} مرض **مورثي** (خلل في مورثة واحدة) بينما يبقى عدد الصبغيات طبيعياً ($2n = 46$).`
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `تُظهر شجرة النسب زواج أبناء عم سليمين ظاهرياً (الجيل I) أنجبا طفلة مصابة بمرض ${disease.name} (الجيل II). كيف نفسّر ظهور المرض؟`,
				questionTextAr: `فسّر ظهور مرض ${disease.name} لدى الطفلة رغم سلامة والديها في شجرة النسب:`,
				imageUrl,
				imageCaption: 'شجرة نسب عائلة مصابة بمرض وراثي متنحٍ',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'الأبوان **ناقلان (حاملان خفيان)** لنفس المورثة الممرضة المتنحية بحكم القرابة، والتقت النسختان الممرضتان عند الإلقاح فظهر المرض لدى الطفلة.'
			},
			sujetExercise: {
				points: 6,
				instruction: `تزوّج أبوان سليمان ظاهرياً (ابنا عم) فأنجبا ثلاثة أطفال؛ كان الطفل الأول والثالث سليمين بينما وُلدت الطفلة الثانية مصابة بمرض *${disease.name}* (يتميّز بـ${disease.detail})، كما توضح شجرة النسب المقابلة.`,
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) فسّر علمياً كيف وُلدت الطفلة (الجيل $upright("II")$) مصابة بمرض ${disease.name} رغم أن كلا أبويها (الجيل $upright("I")$) سليمان ظاهرياً.`,
								answer: `1) لأن مورثة المرض *متنحية (مستترة)*؛ فكلا الأبوين *سليمان ظاهرياً لكنهما حاملان (ناقلان)* خفيان لنفس المورثة الممرضة الموروثة عن الجد المشترك؛ وعند الإلقاح اجتمعت المورثة الممرضة من الأب والأم معاً في البيضة الملقحة فظهر المرض لدى الطفلة.`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: شجرة نسب العائلة'
							}
						]
					},
					{
						type: 'text',
						content: `2) حدّد الفرق بين *المرض الوراثي المورثي* (مثل ${disease.name} أو عمى الألوان) و*الشذوذ الصبغي* (مثل تناذر داون) من حيث عدد الصبغيات.`,
						answer: `2) في *المرض الوراثي المورثي* يكون عدد الصبغيات *طبيعياً* ($2n = 46$) ولكن الخلل يمس *مورثة* واحدة محمولة على أحد الصبغيات؛ أما في *الشذوذ الصبغي* (كتناذر داون) فيتغير *عدد الصبغيات* ($2n + 1 = 47$).`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) بيّن خطورة *زواج الأقارب* في هذه العائلة، واقترح *إجراءين وقائيين* لتجنب ولادة أطفال مصابين بالأمراض الوراثية.`,
						answer: `3) يرفع *زواج الأقارب* بشكل كبير احتمال اجتماع نفس المورثات الممرضة المتنحية الموروثة عن سلف مشترك فتظهر أمراض وراثية مزمنة.\n\n*إجراءان وقائيان*: (1) *تجنب زواج الأقارب* خاصة عند وجود سوابق مرضية وراثية بالعائلة، (2) إجراء *الفحص الطبي والتحاليل الوراثية قبل الزواج* وتجنب تعرض الحامل للإشعاعات والمواد الكيميائية.`,
						mark: '2'
					}
				]
			},
			hints: [
				'ظهور مرض عند طفل من أبوين سليمين يثبت أنه متنحٍ والأبوان ناقلان خفيان.',
				'المرض المورثي يحافظ على 46 صبغياً، أما الشذوذ الصبغي فيغير العدد (47).',
				'الحل الوقائي: تجنب زواج الأقارب وإجراء الفحص الطبي قبل الزواج.'
			],
			solutionStepsAr: [
				'تفسير ظهور المرض بتلاقي مورثتين متنحيتين من أبوين ناقلين بحكم القرابة.',
				'التمييز بين المرض المورثي (46 صبغياً) والشذوذ الصبغي (47 صبغياً).',
				'بيان خطورة زواج الأقارب واقتراح الفحص الطبي قبل الزواج وتفادي الإشعاعات.'
			],
			finalAnswer: 'مرض وراثي متنحٍ يرتفع احتماله في زواج الأقارب ← الوقاية بتجنبه والفحص قبل الزواج'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. FULL COMPREHENSIVE BEM MOCK INTEGRATION 1 (8 pts): Nutrition + Neuro + Immunity
// ═══════════════════════════════════════════════════════════════════════════════
const integrationBemMock1Template: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4am_t3_integration_bem_mock_1_nutrition_neuro_immunity',
	grade: '4am',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'وضعية إدماجية شاملة — امتحان تجريبي BEM (1): دمج التغذية والاتصال العصبي والمناعة',
	curriculumLessonId: 'sci_lesson_4am_t3_bem_comprehensive_review',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const profiles = [
			{ patient: 'أمين (15 سنة)', group: 'O⁻', hb: 8.2, donorGood: 'المتبرع 1 (O⁻)', donorBad: 'المتبرع 2 (O⁺) والمتبرع 3 (A⁻)' },
			{ patient: 'رشيد (16 سنة)', group: 'A⁻', hb: 8.6, donorGood: 'المتبرع 1 (O⁻)', donorBad: 'المتبرع 2 (A⁺) والمتبرع 3 (B⁻)' }
		];
		const p = rng.pick(profiles);
		const svgComp = svgBemMock1Composite({ patient: p.patient, group: p.group, hb: p.hb });
		const imgComp = saveSciencesSvgAsset(`sci_4am_t3_bem_mock1_${difficulty}_s${seed}`, svgComp);

		const mcq = buildUniqueMcqOptions(
			`قطع العصب الوركي المختلط يمنع نقل الرسائل الحسية والحركية، وزمرة المصاب ${p.group} تتطلب ${p.donorGood}، مع مصل + لقاح للكزاز وتغذية غنية بالحديد`,
			[
				{
					text: `فقدان الإحساس والحركة بالقدم سببه تلف الساحة البصرية في المخ`,
					diagnosticFeedback: 'توضح الوثيقة (1) أن السبب المباشر هو **قطع العصب الوركي الأيمن** (عصب مختلط ينقل الرسائل الحسية والحركية للطرف السفلي).'
				},
				{
					text: `يمكن نقل دم من متبرع موجب الريزوس (Rh⁺) إلى ${p.patient} دون أي خطر`,
					diagnosticFeedback: `زمرة ${p.patient} سالبة الريزوس (${p.group})، ونقل دم موجب الريزوس محظور تماماً!`
				},
				{
					text: 'يكفي إعطاء اللقاح وحده للجرح الملوث بالكزاز دون الحاجة إلى المصل',
					diagnosticFeedback: 'لأن لقاحه غير محيّن منذ 14 سنة، يحتاج فوراً إلى **المصل** لحماية عاجلة ثم **اللقاح** لحماية دائمة.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: 'integration',
			titleAr: this.titleAr,
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: `في وضعية شاملة من نمط BEM، تعرض ${p.patient} لحادث دراجة (نزيف خفّض الهيموغلوبين إلى $${p.hb}\\text{ g/dL}$، قطع العصب الوركي الأيمن، وجرح ملوث دون تذكير بلقاح الكزاز). ما التحليل الإدماجي الصحيح؟`,
				questionTextAr: `اختر التشخيص الشامل الصحيح لحالة ${p.patient} من الوثيقة (1):`,
				imageUrl: imgComp,
				imageCaption: `الوثيقة 1: الفحص الدموي والعصبي والمناعي لـ${p.patient}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'يدمج الحل الصحيح بين **الاتصال العصبي** (العصب الوركي مختلط)، **التغذية** (نقص Hb ← نقص O₂ والتنفس الخلوي)، و**المناعة** (زمرة ' + p.group + ' + مصل ولقاح للكزاز).'
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `*السياق (نموذج شامل لشهادة التعليم المتوسط BEM)*: تعرض المراهق ${p.patient} لحادث سقوط خطير بالدراجة على طريق ترابي؛ فنُقل للمستشفى وهو يعاني من *نزيف دموي حاد* وشحوب وتعب شديد، *فقدان الإحساس والحركة معاً في القدم اليمنى*، وجرح عميق ملوث بالتراب ظهرت حوله أعراض التهاب. أُنجز له الملف الطبي المتكامل الموضح في الوثيقتين (1 و 2):`,
				content: [
					{
						type: 'columns',
						widths: ['1.1fr', '1.15fr'],
						children: [
							{
								type: 'table',
								headers: ['الفحص (الوثيقة 2)', `النتيجة عند ${p.patient}`, 'المرجعي'],
								cells: [],
								rows: [
									['الهيموغلوبين (Hb)', `${p.hb} g/dL`, '13–16 g/dL'],
									['الكريات البيضاء', '16500 / mm³ (مرتفعة)', '6000–9000'],
									['حالة العضلات والمخ', 'سليمة تماماً', 'سليمة'],
									['المتبرعون المتوفرون', `${p.donorGood} ، ${p.donorBad}`, '—']
								],
								headerBackground: true,
								borders: 'grid',
								width: 'full'
							},
							{
								type: 'image',
								src: imgComp,
								caption: 'الوثيقة 1: اختبار الزمرة والفحص العصبي والجرح'
							}
						]
					},
					{
						type: 'text',
						content: `*التعليمات*: بالاعتماد على السياق والوثيقتين (1 و 2) ومكتسباتك القبلية:\n\n1) قدّم تفسيراً علمياً دقيقاً لـ:\n(أ) فقدان *الإحساس والحركة معاً* في القدم اليمنى رغم سلامة المخ والعضلات.\n(ب) التعب الشديد والشحوب بعد النزيف، وارتفاع عدد الكريات البيضاء ($16500/"mm"^3$).`,
						answer: `1) *بالاعتماد على الوثيقتين (1 و 2) ومكتسباتي*:\n- (أ) *فقدان الإحساس والحركة*: سببه قطع *العصب الوركي الأيمن* (الوثيقة 1)، وهو *عصب مختلط* يحتوي أليافاً عصبية حسية (تنقل الرسالة الحسية للمخ) وأليافاً حركية (تنقل الأوامر الحركية للعضلات)، فقطعه أوقف الوظيفتين معاً رغم سلامة المخ والعضلات.\n- (ب) *التعب والشحوب*: النزيف خفّض الهيموغلوبين إلى $${p.hb} " g/dL"$ (فقر دم حاد)، فنقص نقل $upright("O")_2$ إلى الخلايا العضلية وتراجع *التنفس الخلوي* وإنتاج الطاقة.\n- *ارتفاع الكريات البيضاء*: دليل على استجابة مناعية (*تفاعل التهابي وبلعمة*) ضد الميكروبات التي اخترقت الحاجز الجلدي عبر الجرح الملوث.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `2) حدّد *الزمرة الدموية* لـ${p.patient} من الوثيقة (1) وسمِّ *المتبرع الآمن الوحيد* من الوثيقة (2) مع التعليل، ثم برّر الإجراء المناعي المزدوج (*مصل + لقاح*) الذي طبّقه الطبيب ضد خطر الكزاز.`,
						answer: `2) *بالاعتماد على الوثيقتين (1 و 2)*:\n- زمرة ${p.patient} هي *${p.group}* (توافق نتائج الارتصاص مع الأمصال Anti-A وAnti-B وعدم الارتصاص مع Anti-D).\n- *المتبرع الآمن هو ${p.donorGood}* لخلو كرياته من مولدات الضد المخالفة وعامل الريزوس الموجب فلا يحدث ارتصاص، بينما يُرفض ${p.donorBad} لتفادي ارتصاص ABO أو Rh.\n- *تبرير المصل + اللقاح*: لأن لقاحه غير محيّن منذ 14 سنة، يوفر *المصل* أجساماً مضادة جاهزة فورية مؤقتة لإبطال سم الكزاز فوراً، ويحفز *اللقاح* تشكيل مناعة نشطة دائمة وذاكرة مناعية.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `3) اقترح *ثلاث نصائح صحية* شاملة لمرحلة النقاهة لتعويض الدم المفقود والوقاية من الحوادث والمخاطر الميكروبية مستقبلاً.`,
						answer: `3) - *تغذية متوازنة غنية بالحديد والبروتينات والفيتامينات* (الكبد، العدس، السبانخ، اللحوم، الخضر) لتنشيط تجديد الكريات الحمراء والهيموغلوبين والتئام الجروح.\n- *احترام روزنامة التلقيح وتحديث الجرعات التذكيرية* (الكزاز كل 10 سنوات) وتطهير الجروح فور حدوثها.\n- *ارتداء الخوذة ووسائل الحماية* أثناء قيادة الدراجة والالتزام بقواعد السلامة المرورية، ومتابعة التأهيل الحركي العصبي.`,
						mark: '2'
					}
				]
			},
			hints: [
				'العصب الوركي عصب مختلط (حسي + حركي)، فقطعه يلغي الإحساس والحركة معاً.',
				'اربط نقص Hb (الوثيقة 2) بنقص O₂ والتنفس الخلوي، وارتفاع الكريات البيضاء بالالتهاب والبلعمة.',
				'استخرج الزمرة من الوثيقة (1) وبرّر المصل (فوري) + اللقاح (دائم) ثم قدّم 3 نصائح شاملة.'
			],
			solutionStepsAr: [
				'تفسير الشلل وفقدان الإحساس بقطع العصب الوركي المختلط، والتعب بنقص Hb وO₂، وارتفاع البيضاء بالالتهاب.',
				`تحديد زمرة ${p.group} واختيار ${p.donorGood}، وتبرير المصل واللقاح للكزاز.`,
				'تقديم 3 نصائح شاملة (غذاء غني بالحديد والبروتين، التذكير باللقاح، ووسائل الوقاية).'
			],
			finalAnswer: `عصب وركي مختلط + زمرة ${p.group} (${p.donorGood}) + مصل ولقاح للكزاز`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. FULL COMPREHENSIVE BEM MOCK INTEGRATION 2 (8 pts): Genetics + Immunity + Nutrition
// ═══════════════════════════════════════════════════════════════════════════════
const integrationBemMock2Template: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4am_t3_integration_bem_mock_2_genetics_immunity_nutrition',
	grade: '4am',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'وضعية إدماجية شاملة — امتحان تجريبي BEM (2): الوراثة (زواج الأقارب والهيموفيليا)، نقل الدم والتغذية',
	curriculumLessonId: 'sci_lesson_4am_t3_bem_comprehensive_review',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const fam = rng.pick([
			{ child: 'إيمان', group: 'B⁻', goodDonor: 'الخال (O⁻)', badDonor: 'الأب (B⁺) والأم (AB⁻)', hb: 7.9, platelets: 'طبيعية لكن عوامل التخثر ناقصة وراثياً' },
			{ child: 'مريم', group: 'A⁻', goodDonor: 'العم (O⁻)', badDonor: 'الأب (A⁺) والأم (AB⁻)', hb: 8.1, platelets: 'طبيعية لكن عوامل التخثر ناقصة وراثياً' }
		]);
		const svgPed = svgGeneticsDiagram('pedigree_chart', {
			title: `الوثيقة 1: شجرة نسب عائلة ${fam.child} (زواج أبناء عم وظهور مرض الهيموفيليا)`
		});
		const imgPed = saveSciencesSvgAsset(`sci_4am_t3_bem_mock2_${difficulty}_s${seed}`, svgPed);

		const mcq = buildUniqueMcqOptions(
			`مرض وراثي متنحٍ ظهر بسبب زواج الأقارب (أبوان حاملان خفيان)، ويتطلب نقل دم من ${fam.goodDonor} لتفادي الارتصاص مع حمية غنية بالحديد`,
			[
				{
					text: `يمكن نقل دم من ${fam.badDonor} لأنهم والدا الطفلة فلا يحدث ارتصاص أبداً`,
					diagnosticFeedback: 'القرابة العائلية لا تضمن توافق الزمر! يجب دوماً احترام نظامي **ABO و Rh** لتفادي الارتصاص المميت.'
				},
				{
					text: 'الهيموفيليا مرض معدي ينتقل عن طريق الأكل الملوث بالغلوتين',
					diagnosticFeedback: 'الهيموفيليا مرض **وراثي مورثي** (نقص عوامل تخثر الدم) وليس مرضاً معدياً ولا داء سيلياك.'
				},
				{
					text: 'لا فائدة من الفحص الطبي قبل الزواج لأنه لا يكشف الأمراض الوراثية والزمر',
					diagnosticFeedback: 'الفحص الطبي قبل الزواج أساسي لتقييم مخاطر الأمراض الوراثية وتوافق الزمر (خصوصاً عامل Rh).'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: 'integration',
			titleAr: this.titleAr,
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: `وُلدت ${fam.child} (زمرتها ${fam.group}) مصابة بـ**الهيموفيليا** لأبوين سليمين ظاهرياً هما ابنا عم، وبعد نزيف انخفض الهيموغلوبين لديها إلى $${fam.hb}\\text{ g/dL}$. ما التشخيص الإدماجي الصحيح؟`,
				questionTextAr: `اختر التحليل الطبي الصحيح لملف ${fam.child} (الوراثة + المناعة + التغذية):`,
				imageUrl: imgPed,
				imageCaption: `الوثيقة 1: شجرة نسب عائلة ${fam.child}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الهيموفيليا مرض وراثي متنحٍ زاد احتماله بـ**زواج الأقارب**؛ ولإنقاذ ${fam.child} (${fam.group}) يُختار **${fam.goodDonor}** مع تغذية غنية بالحديد لتعويض الهيموغلوبين.`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `*السياق (نموذج شامل لشهادة التعليم المتوسط BEM)*: أُدخلت الطفلة ${fam.child} (الطفلة $upright("II")-2$ في شجرة النسب) إلى مصلحة الاستعجالات إثر نزيف أنفي وفموي متواصل صعب التوقف، مرفوق بشحوب شديد وهزال وتعب عند أقل مجهود. استغرب الأبوان (ابنا عم وسليمان ظاهرياً) كيف أُصيبت ابنتهما بهذا المرض! وعند الحاجة إلى نقل دم عاجل تطوّع الأب والأم وأحد الأقارب. إليك معطيات الملف الطبي في الوثيقتين الآتيتين:`,
				content: [
					{
						type: 'columns',
						widths: ['1.15fr', '1.1fr'],
						children: [
							{
								type: 'table',
								headers: ['الفحص الطبي (الوثيقة 2)', `النتيجة عند ${fam.child}`],
								cells: [],
								rows: [
									['التشخيص الجيني', 'مرض الهيموفيليا (الناعور) — عدد الصبغيات 46'],
									['حالة التخثر', fam.platelets],
									['الهيموغلوبين (Hb)', `${fam.hb} g/dL (الطبيعي 12–15 g/dL)`],
									['زمرة الطفلة والمتبرعون', `زمرة ${fam.child}: ${fam.group} | المتوفرون: ${fam.goodDonor}، ${fam.badDonor}`]
								],
								headerBackground: true,
								borders: 'grid',
								width: 'full'
							},
							{
								type: 'image',
								src: imgPed,
								caption: `الوثيقة 1: شجرة نسب عائلة ${fam.child}`
							}
						]
					},
					{
						type: 'text',
						content: `*التعليمات*: بالاعتماد على السياق والوثيقتين (1 و 2) ومكتسباتك القبلية:\n\n1) أزِل استغراب الأبوين بتفسير علمي دقيق لسبب ولادة ${fam.child} مصابة بمرض *الهيموفيليا* رغم سلامة والديها ظاهرياً، وحدّد هل هو شذوذ صبغي أم مرض وراثي مورثي مع التعليل من الوثيقة (2).`,
						answer: `1) *بالاعتماد على الوثيقتين (1 و 2) ومكتسباتي*: الهيموفيليا *مرض وراثي مورثي* (وليس شذوذاً صبغياً لأن عدد الصبغيات طبيعي $2n = 46$، والخلل يمس مورثة مسؤولة عن عوامل تخثر الدم).\n\nبما أن الأبوين (الجيل $upright("I")$) *ابنا عم*، فهما *سليمان ظاهرياً لكنهما حاملان خفيان (ناقلان)* لنفس المورثة الممرضة المتنحية الموروثة عن الجد المشترك؛ وعند الإلقاح اجتمعت النسختان الممرضتان لدى ${fam.child} فظهر المرض.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `2) حدّد *المتبرع المناسب الوحيد* لإنقاذ ${fam.child} مع تعليل رفض والديها رغم القرابة، ثم فسّر سبب *الشحوب والتعب الشديد* الذي تعاني منه الطفلة.`,
						answer: `2) *بالاعتماد على الوثيقة (2) ومكتسباتي*:\n- *المتبرع المناسب هو ${fam.goodDonor}* لأن زمرة $O^-$ معطي عام مطلق خالٍ من مولدات الضد $A$ و$B$ و$D$، فلا يحدث أي ارتصاص في دم ${fam.child} (${fam.group}).\n- *رفض الأبوين (${fam.badDonor})*: القرابة لا تغني عن قواعد نقل الدم؛ فالأب موجب الريزوس ($upright("Rh")^+$ لا يعطي لـ $upright("Rh")^-$)، والأم ($upright("AB")^-$) تحمل مولد ضد غريب سيتفاعل مع الأجسام المضادة في بلازما الطفلة مسبباً ارتصاصاً مميتاً.\n- *تفسير التعب والشحوب*: أدى النزيف إلى *فقر دم حاد* (انخفاض الهيموغلوبين إلى $${fam.hb} " g/dL"$), فانخفض نقل $upright("O")_2$ إلى الخلايا وتراجع *التنفس الخلوي* وإنتاج الطاقة.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `3) قدّم للعائلة وللمجتمع *ثلاث نصائح وقائية وصحية* شاملة (وراثية، مناعية، وتغذوية) بناءً على حالة ${fam.child}.`,
						answer: `3) - *وقاية وراثية*: *تجنب زواج الأقارب* وإجراء *الفحص الطبي والاستشارة الوراثية قبل الزواج* للحد من الأمراض الوراثية المتنحية وتفادي مشاكل توافق عامل الريزوس.\n- *وقاية طبية ومناعية*: حمل بطاقة تعريف بالزمرة الدموية والمرض، وتلقي عوامل التخثر والالتزام الدقيق بقواعد $upright("ABO")$ و$upright("Rh")$ عند كل نقل دم.\n- *وقاية تغذوية*: اعتماد راتب غذائي متوازن غني بـ*الحديد والبروتينات والفيتامينات* (العدس، السبانخ، الكبد، الخضر) لدعم تجديد الهيموغلوبين والكريات الحمراء.`,
						mark: '2'
					}
				]
			},
			hints: [
				'استغل شجرة النسب (الوثيقة 1) وعدد الصبغيات 46 (الوثيقة 2) لتفسير الهيموفيليا كمرض وراثي متنحٍ زاد احتماله بزواج الأقارب.',
				'القرابة العائلية لا تضمن توافق نقل الدم! طبّق قواعد ABO و Rh بدقة ثم اربط Hb بالتنفس الخلوي.',
				'وزّع النصائح الثلاث على المجالات الثلاثة: الوراثة، المناعة/نقل الدم، والتغذية.'
			],
			solutionStepsAr: [
				'تفسير ظهور الهيموفيليا (مرض مورثي 46 صبغياً) بتلاقي مورثتين متنحيتين بسبب زواج الأقارب.',
				`اختيار ${fam.goodDonor} وتعليل رفض ${fam.badDonor} بقواعد ABO و Rh، وتفسير التعب بنقص Hb وO₂.`,
				'تقديم 3 نصائح متكاملة (تجنب زواج الأقارب والفحص قبل الزواج + قواعد نقل الدم + تغذية غنية بالحديد).'
			],
			finalAnswer: `هيموفيليا (مرض وراثي متنحٍ بزواج الأقارب) + المتبرع ${fam.goodDonor} + تغذية بالحديد`
		};
	}
};

export const SCIENCES_TEMPLATES_4AM_T3: SciencesParameterizedTemplate[] = [
	gametesFertilizationTemplate,
	nuclearTransferTemplate,
	trisomy21KaryotypeTemplate,
	pedigreeConsanguinityTemplate,
	integrationBemMock1Template,
	integrationBemMock2Template
];
