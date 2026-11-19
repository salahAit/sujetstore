import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	esc,
	haloText,
	saveSciencesSvgAsset,
	svgBioCurvePlot,
	svgPlantAndPrimaryDiagram,
	wrapSciencesSvg
} from '../../svg-sciences';

// ═══════════════════════════════════════════════════════════════════════════════
// Custom 1AM T2 SVG Builders (Knop, Root Hairs, Starch Leaf Test, Greenhouse)
// ═══════════════════════════════════════════════════════════════════════════════

function buildKnopTubesSvg(
	tubes: Array<{ num: string; medium: string; result: string; healthy: boolean }>
): string {
	const xs = [382, 280, 178, 76];
	const cards = tubes
		.slice(0, 4)
		.map((t, i) => {
			const x = xs[i];
			const stemH = t.healthy ? 50 : 24;
			const col = t.healthy ? '#16a34a' : '#ca8a04';
			return (
				`<rect x="${x - 44}" y="40" width="88" height="178" rx="8" fill="#ffffff" stroke="${t.healthy ? '#15803d' : '#d97706'}" stroke-width="1.5"/>` +
				`<text x="${x}" y="58" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">${esc(t.num)}</text>` +
				`<text x="${x}" y="74" text-anchor="middle" font-size="9.4" font-weight="bold" fill="#1e40af">${esc(t.medium)}</text>` +
				`<rect x="${x - 13}" y="128" width="26" height="54" rx="10" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>` +
				`<path d="M ${x} 132 L ${x} 166 M ${x} 142 L ${x - 7} 160 M ${x} 144 L ${x + 7} 160" stroke="#78350f" stroke-width="1.5"/>` +
				`<line x1="${x}" y1="130" x2="${x}" y2="${130 - stemH}" stroke="${col}" stroke-width="3"/>` +
				`<ellipse cx="${x - 9}" cy="${134 - stemH}" rx="9" ry="4.5" fill="${col}" transform="rotate(-22 ${x - 9} ${134 - stemH})"/>` +
				`<ellipse cx="${x + 9}" cy="${134 - stemH}" rx="9" ry="4.5" fill="${col}" transform="rotate(22 ${x + 9} ${134 - stemH})"/>` +
				`<text x="${x}" y="204" text-anchor="middle" font-size="9.4" font-weight="bold" fill="${t.healthy ? '#15803d' : '#b91c1c'}">${esc(t.result)}</text>`
			);
		})
		.join('');

	return wrapSciencesSvg(
		460,
		232,
		`<rect x="6" y="6" width="448" height="220" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">نتائج استنبات نبات أخضر في أوساط معدنية مختلفة (محلول كنوب)</text>` +
			cards
	);
}

function buildRootOilWaterSvg(): string {
	const tubes = [
		{ x: 362, title: 'الأنبوب 1', oilTop: false, hairsInWater: true, alive: true, desc: 'الأوبار في الماء' },
		{ x: 230, title: 'الأنبوب 2', oilTop: true, hairsInWater: true, alive: true, desc: 'الأوبار في الماء' },
		{ x: 98, title: 'الأنبوب 3', oilTop: true, hairsInWater: false, alive: false, desc: 'الأوبار في الزيت' }
	];
	const html = tubes
		.map((t) => {
			const x = t.x;
			const col = t.alive ? '#16a34a' : '#ca8a04';
			return (
				`<rect x="${x - 54}" y="42" width="108" height="176" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="${x}" y="60" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${esc(t.title)}</text>` +
				// Tube
				`<rect x="${x - 16}" y="106" width="32" height="72" rx="10" fill="#bae6fd" stroke="#0284c7" stroke-width="1.7"/>` +
				(t.oilTop
					? `<rect x="${x - 15}" y="108" width="30" height="${t.hairsInWater ? 18 : 42}" fill="#fde047" opacity="0.88"/>`
					: '') +
				// Root + hairs
				`<line x1="${x}" y1="106" x2="${x}" y2="168" stroke="#78350f" stroke-width="2.4"/>` +
				`<line x1="${x - 8}" y1="136" x2="${x + 8}" y2="136" stroke="#b45309" stroke-width="1.6"/>` +
				`<line x1="${x - 8}" y1="142" x2="${x + 8}" y2="142" stroke="#b45309" stroke-width="1.6"/>` +
				// Shoot
				`<line x1="${x}" y1="106" x2="${x}" y2="76" stroke="${col}" stroke-width="3"/>` +
				`<ellipse cx="${x - 10}" cy="82" rx="10" ry="5" fill="${col}"/>` +
				`<ellipse cx="${x + 10}" cy="82" rx="10" ry="5" fill="${col}"/>` +
				`<text x="${x}" y="194" text-anchor="middle" font-size="9.6" fill="#334155">${esc(t.desc)}</text>` +
				`<text x="${x}" y="210" text-anchor="middle" font-size="10" font-weight="bold" fill="${t.alive ? '#15803d' : '#dc2626'}">${t.alive ? 'نمو جيد' : 'ذبول وموت'}</text>`
			);
		})
		.join('');

	return wrapSciencesSvg(
		460,
		232,
		`<rect x="6" y="6" width="448" height="220" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">تجربة تحديد مقر الامتصاص في الجذر (طبقة زيت فوق الماء)</text>` +
			html
	);
}

function buildLeafStarchExperimentSvg(conditionName: string, bluePart: string, yellowPart: string): string {
	return wrapSciencesSvg(
		460,
		220,
		`<rect x="6" y="6" width="448" height="208" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="230" y="26" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${esc(`نتيجة الكشف بماء اليود عن التركيب الضوئي (${conditionName})`)}</text>` +
			// Control leaf on right
			`<rect x="242" y="44" width="196" height="154" rx="8" fill="#ffffff" stroke="#15803d" stroke-width="1.6"/>` +
			`<text x="340" y="64" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534">الورقة الشاهدة (كل الشروط)</text>` +
			`<ellipse cx="340" cy="118" rx="54" ry="28" fill="#1e3a8a" stroke="#0f172a" stroke-width="1.6"/>` +
			`<text x="340" y="170" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#1e3a8a">تلون أزرق بنفسجي كامل</text>` +
			`<text x="340" y="188" text-anchor="middle" font-size="9.6" fill="#475569">${esc(bluePart)}</text>` +
			// Experimental leaf on left
			`<rect x="22" y="44" width="196" height="154" rx="8" fill="#ffffff" stroke="#d97706" stroke-width="1.6"/>` +
			`<text x="120" y="64" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e">الورقة التجريبية</text>` +
			`<ellipse cx="120" cy="118" rx="54" ry="28" fill="#fef08a" stroke="#0f172a" stroke-width="1.6"/>` +
			`<text x="120" y="170" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#b45309">لون بني مصفر (عدم تلون)</text>` +
			`<text x="120" y="188" text-anchor="middle" font-size="9.6" fill="#475569">${esc(yellowPart)}</text>`
	);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Template 1: Knop Mineral Nutrition (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const knopMineralsTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1am_t2_knop_minerals',
	grade: '1am',
	trimesterId: 't2',
	domain: 'plant_biology',
	titleAr: 'الحاجات المعدنية للنبات الأخضر وتجارب محلول كنوب',
	curriculumLessonId: 'sci_lesson_1am_t2_plant_mineral_nutrition',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const missingOptions = [
			{ symbol: 'N', name: 'الآزوت', rem: 'PK', symptom: 'نمو ضعيف وأوراق مصفرة' },
			{ symbol: 'P', name: 'الفوسفور', rem: 'NK', symptom: 'نمو بطيء وأوراق داكنة' },
			{ symbol: 'K', name: 'البوتاسيوم', rem: 'NP', symptom: 'نمو هزيل وحواف أوراق جافة' }
		];
		const miss = rng.pick(missingOptions);

		const tubes = [
			{ num: 'أنبوب 1', medium: 'كنوب كامل 2‰', result: 'نمو جيد وقوي', healthy: true },
			{ num: 'أنبوب 2', medium: 'ماء مقطر', result: 'ذبول وموت', healthy: false },
			{ num: 'أنبوب 3', medium: `منقوص ${miss.name}`, result: miss.symptom, healthy: false },
			{ num: 'أنبوب 4', medium: 'كنوب مركز 20‰', result: 'ذبول وموت', healthy: false }
		];

		const svg = buildKnopTubesSvg(tubes);
		const imageUrl = saveSciencesSvgAsset(`sci_1am_t2_knop_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`نقص عنصر ${miss.name} (${miss.symbol})، والتركيز المفرط يسبب ذبول وموت النبات`,
			[
				{
					text: 'نقص الضوء فقط، وزيادة تركيز الأملاح تزيد النمو دائماً',
					diagnosticFeedback: 'الأنابيب كلها معرضة للضوء! والتركيز المفرط للأملاح (20‰) قاتل للنبات.'
				},
				{
					text: 'غياب الماء تماماً في الأنبوب 3 و 4',
					diagnosticFeedback: 'جميع الأنابيب تحتوي على الماء، لكن الخلل في نقص ملح معدني أو ارتفاع تركيزه.'
				},
				{
					text: 'وجود النشاء في الماء المقطر',
					diagnosticFeedback: 'الماء المقطر خالٍ تماماً من الأملاح المعدنية والمواد العضوية.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `في تجارب محلول كنوب الموضحة في الوثيقة (الأنبوب 3 يحتوي على **$${miss.rem}$** فقط، والأنبوب 4 يحتوي على محلول كنوب بتركيز **$20\\text{‰}$**)، كيف تفسّر ضعف النبات في الأنبوب 3 وموته في الأنبوب 4؟`,
			questionTextAr: `فسّر نتيجة الأنبوب 3 (${miss.rem}) والأنبوب 4 (تركيز 20‰).`,
			imageUrl,
			imageCaption: 'نتائج استنبات نبات أخضر في 4 أوساط معدنية',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `ضعف النمو في الأنبوب 3 ناتج عن نقص **${miss.name} ($\\text{${miss.symbol}}$)**، وموت النبات في الأنبوب 4 ناتج عن **الإفراط في تركيز الأملاح المعدنية**.`
		};

		const hints: [string, string, string] = [
			'يتكون محلول كنوب الكامل من العناصر الثلاثة الأساسية: N (آزوت)، P (فوسفور)، K (بوتاسيوم).',
			`قارن الأنبوب 3 (${miss.rem}) مع الأنبوب 1 الشاهد (NPK) لتحديد العنصر الناقص.`,
			'الإفراط في الأملاح المعدنية (20‰) يؤدي إلى ذبول النبات وموته.'
		];
		const solutionStepsAr = [
			`الأنبوب 1 (شاهد): ينمو جيداً لتوفر الماء والأملاح المعدنية $\\text{N, P, K}$ بتركيز مناسب ($2\\text{‰}$).`,
			`الأنبوب 3: ينقصه عنصر **${miss.name} ($\\text{${miss.symbol}}$)** فظهر عليه ${miss.symptom}.`,
			`الأنبوب 4: أدى التركيز المفرط ($20\\text{‰}$) إلى ذبول وموت النبات.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `لتحديد الشروط المعدنية لنمو النبات الأخضر، نضع أربع نبيتات قمح متماثلة في أربعة أنابيب معرضة للضوء كما في الوثيقة المقابلة:`,
			content: [
				{
					type: 'columns',
					widths: ['1.2fr', '1.3fr'],
					children: [
						{
							type: 'text',
							content: `1) فسّر سبب نمو النبات جيداً في الأنبوب 1، وسبب ذبوله وموته في الأنبوب 2 (الماء المقطر).`,
							answer: `1) نما النبات جيداً في الأنبوب 1 لتوفر *الماء والأملاح المعدنية الأساسية (الآزوت والفوسفور والبوتاسيوم)* بتركيز مناسب (2 في الألف)، وذبل ومات في الأنبوب 2 لخلوّ الماء المقطر من *الأملاح المعدنية*.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'تجارب محلول كنوب على نبيتات القمح'
						}
					]
				},
				{
					type: 'text',
					content: `2) حدد العنصر المعدني الناقص في الأنبوب 3، ثم فسّر سبب موت النبات في الأنبوب 4 رغم توفر جميع الأملاح المعدنية فيه.`,
					answer: `2) العنصر الناقص في الأنبوب 3 هو *${miss.name} (${miss.symbol})* مما سبب ${miss.symptom}. أما في الأنبوب 4 فمات النبات بسبب *التركيز المفرط للأملاح المعدنية* (20 في الألف).`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) استنتج شروط التغذية المعدنية السليمة للنبات الأخضر، وما النصيحة التي تقدمها لفلاح يفرط في استعمال الأسمدة الكيميائية؟`,
					answer: `3) يحتاج النبات الأخضر إلى الماء والأملاح المعدنية الأساسية (*الآزوت، الفوسفور، البوتاسيوم*) بـ *تركيز مناسب*. أنصح الفلاح باستعمال الأسمدة بكميات معتدلة ومناسبة دون إفراط لتفادي حرق وذبول المحاصيل.`,
					mark: '2'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: `نقص ${miss.name} (${miss.symbol}) + خطر الإفراط في التركيز`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 2: Root Hairs Absorption Zone (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const rootHairsAbsorptionTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1am_t2_root_hairs_absorption',
	grade: '1am',
	trimesterId: 't2',
	domain: 'plant_biology',
	titleAr: 'بنية الجذر وتحديد مقر امتصاص المحلول المعدني',
	curriculumLessonId: 'sci_lesson_1am_t2_plant_mineral_nutrition',
	defaultPoints: 6,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const plantName = rng.pick(['نبيتة فاصولياء', 'نبيتة قمح', 'نبيتة عدس', 'نبيتة فول']);

		const svg = buildRootOilWaterSvg();
		const imageUrl = saveSciencesSvgAsset(`sci_1am_t2_roothairs_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'المنطقة الوبرية (الأوبار الماصة) هي مقر امتصاص المحلول المعدني',
			[
				{
					text: 'القلنسوة هي المسؤولة عن امتصاص الماء والأملاح',
					diagnosticFeedback: 'في الأنبوب 3 كانت القلنسوة في الماء ومع ذلك مات النبات! القلنسوة للحماية فقط.'
				},
				{
					text: 'المنطقة الفلينية هي التي تمتص الماء',
					diagnosticFeedback: 'المنطقة الفلينية غير نفوذة للماء ولا تمتص المحلول المعدني.'
				},
				{
					text: 'الزيت يُغذي النبات الأخضر بدل الماء',
					diagnosticFeedback: 'الزيت طبقة عازلة غير نفوذة تمنع وصول الماء إلى المنطقة المغمورة فيها.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `وضعنا ثلاث عينات من **${plantName}** في أنابيب بها ماء وطبقة زيت عازلة (الوثيقة المقابلة). ذبلت النبتة في الأنبوب 3 فقط حيث كانت **المنطقة الوبرية في الزيت** والقلنسوة في الماء. ماذا تستنتج؟`,
			questionTextAr: `ذبلت ${plantName} عندما غُمرت المنطقة الوبرية في الزيت. ما الاستنتاج؟`,
			imageUrl,
			imageCaption: 'تجربة روزين بالماء والزيت لتحديد مقر الامتصاص الجذري',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `عدم ذبول النبتة في الأنبوب 2 وذبولها في الأنبوب 3 يثبت أن **الأوبار الماصة** في **المنطقة الوبرية** هي مقر امتصاص المحلول المعدني.`
		};

		const hints: [string, string, string] = [
			'الزيت يمنع مرور الماء إلى الجزء المغمور فيه من الجذر.',
			'قارن موقع المنطقة الوبرية في الأنبوب 2 (نمو جيد) وفي الأنبوب 3 (ذبول).',
			'إذن مقر امتصاص الماء والأملاح هو الأوبار الماصة.'
		];
		const solutionStepsAr = [
			'في الأنبوب 1 و 2: المنطقة الوبرية مغمورة في الماء $\\leftarrow$ تمتص المحلول المعدني فتنمو النبتة.',
			'في الأنبوب 3: المنطقة الوبرية معزولة في الزيت $\\leftarrow$ يتوقف الامتصاص فتذبل النبتة.',
			'الاستنتاج: يمتص النبات الأخضر المحلول المعدني عبر **الأوبار الماصة**.'
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `قصد تحديد المنطقة المسؤولة عن امتصاص الماء والأملاح المعدنية في جذر *${plantName}*، أنجزنا التجربة الموضحة في الوثيقة المقابلة:`,
			content: [
				{
					type: 'columns',
					widths: ['1.2fr', '1.3fr'],
					children: [
						{
							type: 'text',
							content: `1) فسّر سبب بقاء النبتة حية في الأنبوب 2، وسبب ذبولها وموتها في الأنبوب 3 رغم وجود طرف الجذر (القلنسوة) في الماء.`,
							answer: `1) بقيت النبتة حية في الأنبوب 2 لأن *المنطقة الوبرية (الأوبار الماصة)* مغمورة في الماء فتقوم بالامتصاص. أما في الأنبوب 3 فقد عُزلت الأوبار الماصة في طبقة الزيت العازلة فلم تمتص الماء، لأن *القلنسوة* دورها الحماية فقط ولا تمتص الماء.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'تجربة الماء والزيت على جذر النبتة'
						}
					]
				},
				{
					type: 'text',
					content: `2) رتب مناطق الجذر الأربع من الأعلى (قرب الساق) نحو الأسفل (قمة الجذر).`,
					answer: `2) ترتيب مناطق الجذر من الأعلى إلى الأسفل: 1- *المنطقة الفلينية*، 2- *المنطقة الوبرية*، 3- *منطقة النمو*، 4- *القلنسوة*.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) ما النتيجة التي نستخلصها من هذه التجربة حول مقر الامتصاص الجذري عند النبات الأخضر؟`,
					answer: `3) نستنتج أن النبات الأخضر يمتص المحلول المعدني (الماء والأملاح المعدنية) من التربة بواسطة *الأوبار الماصة* الموجودة في *المنطقة الوبرية* للجذر.`,
					mark: '2'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: 'الأوبار الماصة (المنطقة الوبرية)'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 3: Elodea Gas Exchange & Light Intensity Curve (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const elodeaGasExchangeTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1am_t2_elodea_photosynthesis_gas',
	grade: '1am',
	trimesterId: 't2',
	domain: 'plant_biology',
	titleAr: 'المبادلات الغازية اليخضورية وتجربة نبات الإيلوديا والثغور',
	curriculumLessonId: 'sci_lesson_1am_t2_chlorophyll_gas_exchange_stomata',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const maxBubbles = rng.pick([36, 42, 48, 54]);
		const midBubbles = Math.round(maxBubbles * 0.5);
		const lowBubbles = Math.round(maxBubbles * 0.25);

		const svg = svgBioCurvePlot({
			title: 'تغير عدد فقاعات الأكسجين المنطلقة من نبات الإيلوديا حسب بعد المصباح',
			xMin: 0,
			xMax: 50,
			xStep: 10,
			yMin: 0,
			yMax: 60,
			yStep: 10,
			xLabel: 'بعد المصباح (سم)',
			yLabel: 'عدد الفقاعات / د',
			curves: [
				{
					fn: (x) => Math.max(0, maxBubbles * Math.exp(-0.055 * (x - 10)) * (x < 10 ? 1 : 1)),
					color: '#16a34a',
					label: 'طرح الأكسجين'
				}
			],
			points: [
				{ x: 10, y: maxBubbles, label: `${maxBubbles} فقاعة`, color: '#15803d' },
				{ x: 25, y: midBubbles, label: `${midBubbles} فقاعة`, color: '#2563eb' },
				{ x: 40, y: lowBubbles, label: `${lowBubbles} فقاعة`, color: '#dc2626' }
			]
		});
		const imageUrl = saveSciencesSvgAsset(`sci_1am_t2_elodea_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'غاز الأكسجين (O₂)، وتزداد شدة المبادلات الغازية اليخضورية كلما زادت شدة الإضاءة',
			[
				{
					text: 'غاز الفحم (CO₂)، ويزداد طرحه في الظلام فقط',
					diagnosticFeedback: 'في وجود الضوء يمتص النبات CO₂ ويطرح O₂! وتتناقص الفقاعات بالابتعاد عن المصباح.'
				},
				{
					text: 'غاز الأكسجين (O₂)، ولا تتأثر شدة طرحه بالضوء إطلاقاً',
					diagnosticFeedback: 'لاحظ المنحنى: انخفض عدد الفقاعات من ' + maxBubbles + ' إلى ' + lowBubbles + ' عند إبعاد المصباح!'
				},
				{
					text: 'بخار الماء فقط عبر الأوبار الماصة',
					diagnosticFeedback: 'الفقاعات المتصاعدة من نبات الإيلوديا المغمور في الماء هي فقاعات غاز O₂.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `يمثل المنحنى المقابل تغير عدد الفقاعات الغازية المنطلقة من **نبات الإيلوديا المائي** في الدقيقة حسب بعد المصباح الضوئي (على بعد $10\\text{ cm}$ انطلقت $${maxBubbles}$ فقاعة، وعلى بعد $40\\text{ cm}$ انخفضت إلى $${lowBubbles}$ فقاعة). ما طبيعة الغاز المنطلق وماذا نستنتج؟`,
			questionTextAr: `ما الغاز المنطلق من نبات الإيلوديا وما تأثير شدة الإضاءة عليه؟`,
			imageUrl,
			imageCaption: 'تأثير شدة الإضاءة على انطلاق الفقاعات من الإيلوديا',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الغاز المنطلق هو **غاز ثنائي الأكسجين ($\\text{O}_2$)**، وكلما اقترب المصباح (زادت الإضاءة) ارتفع عدد الفقاعات لأن الضوء شرط أساسي للمبادلات الغازية اليخضورية.`
		};

		const hints: [string, string, string] = [
			'في الضوء، يمتص النبات الأخضر CO₂ ويطرح O₂.',
			'انظر إلى المنحنى: كلما زاد بعد المصباح قلت شدة الإضاءة وقل عدد الفقاعات.',
			'مقر المبادلات الغازية على مستوى الأوراق هو الثغور (المسامات).'
		];
		const solutionStepsAr = [
			`الغاز المنطلق هو **غاز ثنائي الأكسجين ($\\text{O}_2$)**، ونكشف عنه بزيادة توهج عود ثقاب مشتعل.`,
			`عند $10\\text{ cm}$ (إضاءة قوية): $${maxBubbles}$ فقاعة/د؛ وعند $40\\text{ cm}$ (إضاءة ضعيفة): $${lowBubbles}$ فقاعة/د.`,
			`الاستنتاج: كلما زادت شدة الإضاءة زادت شدة المبادلات الغازية اليخضورية.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `وضعنا نبات الإيلوديا المائي في ماء غني بغاز ثنائي أكسيد الكربون وقمنا بتغيير مسافة المصباح الضوئي وعددنا الفقاعات الغازية المنطلقة في الدقيقة كما يوضحه المنحنى:`,
			content: [
				{
					type: 'columns',
					widths: ['1.15fr', '1.35fr'],
					children: [
						{
							type: 'text',
							content: `1) سمِّ الغاز المنطلق على شكل فقاعات، واذكر كيف نكشف عنه مخبرياً.`,
							answer: `1) الغاز المنطلق هو *غاز ثنائي الأكسجين* ($upright("O")_2$). نكشف عنه بتقريب عود ثقاب متوهج من فوهة الأنبوب فيزداد اشتعاله وتوهجه.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'تطور عدد الفقاعات بدلالة بعد المصباح'
						}
					]
				},
				{
					type: 'text',
					content: `2) حلّل المنحنى، ثم استنتج أثر الإضاءة على المبادلات الغازية اليخضورية. وماذا يحدث لو استبدلنا الماء الغني بغاز الفحم بـ *ماء مغلي ومبرد*؟`,
					answer: `2) نلاحظ أنه كلما زاد بعد المصباح (نقصت الإضاءة) تناقص عدد الفقاعات من ${maxBubbles} إلى ${lowBubbles} فقاعة في الدقيقة؛ نستنتج أن *الضوء شرط ضروري* وتزداد شدة المبادلات الغازية بزيادة الإضاءة. وعند استعمال ماء مغلي ومبرد (خالٍ من غاز الفحم) *يتوقف انطلاق الفقاعات* لأن غاز الفحم شرط ضروري كذلك.`,
					mark: '2.5'
				},
				{
					type: 'text',
					content: `3) سمِّ البنيات المجهرية الموجودة على الوجه السفلي للأوراق والتي تمثل مقر هذه المبادلات الغازية.`,
					answer: `3) تُسمّى هذه البنيات المجهرية *الثغور (المسامات)*.`,
					mark: '1.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: 'غاز O₂ — تزداد شدة المبادلات بزيادة الإضاءة'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 4: Photosynthesis Starch Leaf Test (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const photosynthesisStarchTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1am_t2_photosynthesis_starch_test',
	grade: '1am',
	trimesterId: 't2',
	domain: 'plant_biology',
	titleAr: 'شروط عملية التركيب الضوئي والكشف عن النشاء في الورقة',
	curriculumLessonId: 'sci_lesson_1am_t2_photosynthesis_conditions_products',
	defaultPoints: 6,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const tests = [
			{
				condName: 'تغطية الورقة بغلاف أسود عاتم',
				missingCond: 'الضوء',
				blueDesc: 'تشكّل النشاء في وجود الضوء',
				yellowDesc: 'غياب النشاء في غياب الضوء'
			},
			{
				condName: 'ورقة داخل كيس به محلول البوتاس (يمتص غاز الفحم)',
				missingCond: 'غاز ثنائي أكسيد الكربون (CO₂)',
				blueDesc: 'تشكّل النشاء في وجود غاز الفحم',
				yellowDesc: 'غياب النشاء لامتصاص البوتاس لغاز الفحم'
			},
			{
				condName: 'الجزء الأبيض من ورقة مبرقشة معرضة للضوء',
				missingCond: 'اليخضور (الصبغة الخضراء)',
				blueDesc: 'تشكّل النشاء في الجزء الأخضر اليخضوري',
				yellowDesc: 'غياب النشاء في الجزء عديم اليخضور'
			}
		];
		const t = rng.pick(tests);

		const svg = buildLeafStarchExperimentSvg(t.condName, t.blueDesc, t.yellowDesc);
		const imageUrl = saveSciencesSvgAsset(`sci_1am_t2_starch_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`شرط ${t.missingCond} ضروري لتركيب النشاء (عملية التركيب الضوئي)`,
			[
				{
					text: 'النبات الأخضر لا يركب النشاء في الأوراق إطلاقاً',
					diagnosticFeedback: 'الورقة الشاهدة تلوّنت بالأزرق البنفسجي، مما يثبت تركيب النشاء في الأوراق.'
				},
				{
					text: 'ماء اليود يكشف عن وجود البروتين في الورقة',
					diagnosticFeedback: 'ماء اليود هو الكاشف النوعي للنشاء (لون أزرق بنفسجي).'
				},
				{
					text: `شرط ${t.missingCond} غير ضروري للتركيب الضوئي`,
					diagnosticFeedback: 'عدم تلون الورقة التجريبية بالأزرق البنفسجي يثبت أن الشرط الغائب ضروري جداً!'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `بعد معالجة ورقتين بالكحول الساخن ثم بماء اليود (**${t.condName}**)، تلوّنت الورقة الشاهدة بالأزرق البنفسجي بينما بقيت الورقة التجريبية صفراء بنية. ماذا تثبت هذه التجربة؟`,
			questionTextAr: `ما الشرط الذي تثبت تجربته في حالة: ${t.condName}؟`,
			imageUrl,
			imageCaption: `تجربة الكشف عن النشاء (${t.condName})`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `غياب اللون الأزرق البنفسجي (غياب النشاء) في الورقة التجريبية يثبت أن **${t.missingCond}** شرط ضروري لعملية التركيب الضوئي.`
		};

		const hints: [string, string, string] = [
			'ماء اليود يعطي لوناً أزرق بنفسجياً في وجود النشاء.',
			`حدد ما الشرط الوحيد الذي غاب في التجربة: (${t.condName}).`,
			'إذن الشرط المثبت هو ' + t.missingCond + '.'
		];
		const solutionStepsAr = [
			`تلوّن الورقة الشاهدة بالأزرق البنفسجي يثبت تركيب **النشاء** لتوفر كل الشروط.`,
			`عدم تلوّن الورقة التجريبية يثبت عدم تشكل النشاء لغياب **${t.missingCond}**.`,
			`الاستنتاج: **${t.missingCond}** شرط أساسي لعملية التركيب الضوئي.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `لإظهار أحد شروط عملية التركيب الضوئي، عالجنا ورقة شاهدة وورقة تجريبية (*${t.condName}*) بالماء المغلي ثم الكحول الساخن ثم ماء اليود، فحصلنا على النتائج الموضحة في الوثيقة:`,
			content: [
				{
					type: 'columns',
					widths: ['1.15fr', '1.35fr'],
					children: [
						{
							type: 'text',
							content: `1) لماذا نغمر الورقتين في *الكحول الساخن* قبل إضافة ماء اليود؟ وما المادة العضوية التي نكشف عنها بماء اليود؟`,
							answer: `1) نغمر الورقتين في الكحول الساخن لـ *إزالة صبغة اليخضور (اللون الأخضر)* حتى يظهر التلون بماء اليود بوضوح. والمادة العضوية المكشوف عنها هي *النشاء*.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: `مقارنة الورقة الشاهدة والتجريبية بعد ماء اليود`
						}
					]
				},
				{
					type: 'text',
					content: `2) فسّر اختلاف اللون بين الورقة الشاهدة والورقة التجريبية، ثم استنتج الشرط الذي تبرزه هذه التجربة.`,
					answer: `2) تلوّنت الورقة الشاهدة بالأزرق البنفسجي لتركيبها *النشاء* لتوفر جميع الشروط، ولم تتلوّن الورقة التجريبية لعدم تركيب النشاء بسبب غياب *${t.missingCond}*. نستنتج أن *${t.missingCond}* شرط ضروري للتركيب الضوئي.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) اذكر الشروط الأربعة الكاملة لعملية التركيب الضوئي، ومثالين لمواد عضوية أخرى يركبها النبات الأخضر.`,
					answer: `3) الشروط الأربعة: *الضوء، اليخضور، غاز ثنائي أكسيد الكربون، والماء والأملاح المعدنية*. مواد عضوية أخرى: *السكريات البسيطة، البروتينات، والدسم*.`,
					mark: '2'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: `شرط ${t.missingCond}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 5: Raw Sap, Elaborated Sap & Transpiration (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const sapTranspirationTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1am_t2_sap_transpiration',
	grade: '1am',
	trimesterId: 't2',
	domain: 'plant_biology',
	titleAr: 'النسغ الناقص والنسغ الكامل وظاهرة النتح عند النبات الأخضر',
	curriculumLessonId: 'sci_lesson_1am_t2_sap_circulation_transpiration',
	defaultPoints: 6,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const askRaw = seed % 2 === 0;
		const absorbed = rng.pick([80, 100, 120]);
		const transpired = Math.round(absorbed * 0.9);

		const svg = svgPlantAndPrimaryDiagram('stomata_sap', {
			title: 'مخطط مسار النسغ الناقص والنسغ الكامل في النبات الأخضر'
		});
		const imageUrl = saveSciencesSvgAsset(`sci_1am_t2_sap_s${seed}`, svg);

		const correctOpt = askRaw
			? 'النسغ الناقص: ماء وأملاح معدنية، ينتقل في الأوعية الخشبية من الجذور إلى الأوراق'
			: 'النسغ الكامل: نسغ ناقص ومواد عضوية، ينتقل في الأوعية اللحائية إلى كافة الأعضاء';

		const mcq = buildUniqueMcqOptions(
			correctOpt,
			[
				{
					text: askRaw
						? 'النسغ الناقص: مواد عضوية فقط، ينتقل في الأوعية اللحائية نحو الجذور'
						: 'النسغ الكامل: ماء وأملاح فقط، يصعد في الأوعية الخشبية نحو الأوراق',
					diagnosticFeedback: 'انتبه: لا تخلط بين النسغ الناقص (الأوعية الخشبية) والنسغ الكامل (الأوعية اللحائية)!'
				},
				{
					text: 'ينتقل عبر الثغور الورقية إلى التربة مباشرة',
					diagnosticFeedback: 'الثغور مقر المبادلات الغازية والنتح وليست أوعية ناقلة للنسغ داخل الساق.'
				},
				{
					text: 'لا يتأثر صعود النسغ بظاهرة النتح إطلاقاً',
					diagnosticFeedback: 'ظاهرة النتح هي المحرك الأساسي لامتصاص الماء وصعود النسغ الناقص!'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `امتص نبات أخضر $${absorbed}\\text{ mL}$ من المحلول المعدني وطرح $${transpired}\\text{ mL}$ منه كبخار ماء بظاهرة النتح. ما الوصف الدقيق لـ **${askRaw ? 'النسغ الناقص' : 'النسغ الكامل'}** في الوثيقة المقابلة؟`,
			questionTextAr: `حدد تركيب وأوعية ومسار ${askRaw ? 'النسغ الناقص' : 'النسغ الكامل'}.`,
			imageUrl,
			imageCaption: 'دوران النسغ الناقص والكامل عند النبات الأخضر',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: correctOpt + '، وتعمل ظاهرة **النتح** كمحرك لامتصاص وصعود النسغ الناقص.'
		};

		const hints: [string, string, string] = [
			'النسغ الناقص = ماء + أملاح معدنية (أوعية خشبية، صاعد من الجذور للأوراق).',
			'النسغ الكامل = نسغ ناقص + مواد عضوية (أوعية لحائية، يتوزع لكل الأعضاء).',
			'ظاهرة النتح هي طرح بخار الماء عبر الثغور، وهي المسؤولة عن دوران النسغ.'
		];
		const solutionStepsAr = [
			`تركيب النسغ الناقص: ماء + أملاح معدنية في الأوعية الخشبية (من الجذور للأوراق).`,
			`تركيب النسغ الكامل: ماء + أملاح + مواد عضوية في الأوعية اللحائية (من الأوراق لكافة الأعضاء).`,
			`النتح طرح $${transpired}\\text{ mL}$ من الماء الممتص ($${absorbed}\\text{ mL}$) مما يولد قوة سحب لضمان دوران النسغ.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `يتحرك داخل النبات الأخضر سائلان مغذيان يضمنان حياته ونموه كما توضحه الوثيقة المقابلة، وقد امتص هذا النبات $${absorbed}$ مل من الماء وطرح $${transpired}$ مل على شكل بخار ماء:`,
			content: [
				{
					type: 'columns',
					widths: ['1.15fr', '1.35fr'],
					children: [
						{
							type: 'text',
							content: `1) سمِّ الظاهرة التي طرح بها النبات $${transpired}$ مل من الماء على شكل بخار، وحدد مقرها ودورها في دوران النسغ.`,
							answer: `1) الظاهرة هي *النتح*، ومقرها *الثغور* الموجودة على الأوراق. دورها: تُحدث فراغاً في الأوعية الخشبية مما ينشّط *امتصاص* الماء والأملاح ويضمن *صعود ودوران النسغ*.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'دوران النسغ الناقص والكامل'
						}
					]
				},
				{
					type: 'table',
					headers: ['وجه المقارنة', 'النسغ الناقص', 'النسغ الكامل'],
					cells: [],
					rows: [
						[
							'التركيب',
							{ content: '................', answer: 'ماء + أملاح معدنية', mark: '1' },
							{ content: '................', answer: 'نسغ ناقص + مواد عضوية', mark: '1' }
						],
						[
							'الأوعية الناقلة',
							{ content: '................', answer: 'الأوعية الخشبية', mark: '0.5' },
							{ content: '................', answer: 'الأوعية اللحائية', mark: '0.5' }
						],
						[
							'المسار والاتجاه',
							{ content: '................', answer: 'من الجذور إلى الأوراق (صاعد)', mark: '0.5' },
							{ content: '................', answer: 'من الأوراق إلى كافة الأعضاء', mark: '0.5' }
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
			trimesterId: 't2',
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
const integrationGreenhouseTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1am_t2_integration_greenhouse',
	grade: '1am',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: تحسين مردود البيوت البلاستيكية وشروط تغذية النبات الأخضر',
	curriculumLessonId: 'sci_lesson_1am_t2_photosynthesis_conditions_products',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const crop = rng.pick(['الطماطم', 'الفلفل', 'البطاطا المبكرة']);
		const farmer = rng.pick(['عمي صالح', 'عمي رابح', 'عمي محمود']);

		const svg = wrapSciencesSvg(
			460,
			230,
			`<rect x="6" y="6" width="448" height="218" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
				`<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">السند 2: مقارنة بيتين بلاستيكيين لزراعة ${esc(crop)}</text>` +
				// Right: Greenhouse A (Problematic)
				`<rect x="242" y="44" width="198" height="168" rx="9" fill="#fef2f2" stroke="#dc2626" stroke-width="1.8"/>` +
				`<text x="341" y="66" text-anchor="middle" font-size="11.8" font-weight="bold" fill="#991b1b">البيت البلاستيكي أ (مردود ضعيف)</text>` +
				`<text x="341" y="96" text-anchor="middle" font-size="10" fill="#0f172a">• غطاء متسخ يحجب الضوء</text>` +
				`<text x="341" y="122" text-anchor="middle" font-size="10" fill="#0f172a">• سماد مركز جداً (20 في الألف)</text>` +
				`<text x="341" y="148" text-anchor="middle" font-size="10" fill="#0f172a">• مغلق كلياً دون تهوية</text>` +
				`<text x="341" y="182" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">أوراق صفراء وثمار صغيرة</text>` +
				// Left: Greenhouse B (Optimal)
				`<rect x="20" y="44" width="198" height="168" rx="9" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.8"/>` +
				`<text x="119" y="66" text-anchor="middle" font-size="11.8" font-weight="bold" fill="#166534">البيت البلاستيكي ب (مردود وفير)</text>` +
				`<text x="119" y="96" text-anchor="middle" font-size="10" fill="#0f172a">• غطاء شفاف نظيف (إضاءة جيدة)</text>` +
				`<text x="119" y="122" text-anchor="middle" font-size="10" fill="#0f172a">• سماد متوازن (2 في الألف)</text>` +
				`<text x="119" y="148" text-anchor="middle" font-size="10" fill="#0f172a">• تهوية منتظمة لتجديد الهواء</text>` +
				`<text x="119" y="182" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#15803d">نمو قوي وثمار كبيرة وحلوة</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_1am_t2_integ_gh_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'ضعف الضوء، نقص غاز CO₂ لقلة التهوية، والإفراط في تركيز السماد المعدني',
			[
				{
					text: 'نقص البروتينات الحيوانية في التربة فقط',
					diagnosticFeedback: 'النبات الأخضر يتغذى على مواد معدنية فقط ولا يمتص البروتينات الحيوانية.'
				},
				{
					text: 'كثرة الإضاءة ونظافة الغطاء البلاستيكي',
					diagnosticFeedback: 'الضوء شرط ضروري للتركيب الضوئي، والمشكلة في البيت (أ) هي اتساخ الغطاء وحجب الضوء.'
				},
				{
					text: 'وجود الأوبار الماصة في جذور النبات',
					diagnosticFeedback: 'الأوبار الماصة هي المسؤولة عن الامتصاص الجيد وليست سبباً للمشكلة.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `لاحظ الفلاح ${farmer} ذبول نباتات **${crop}** وضعف ثمارها في البيت البلاستيكي (أ) مقارنة بالبيت (ب) (انظر السند 2). ما الأسباب العلمية التي تفسر تدهور المحصول في البيت (أ)؟`,
			questionTextAr: `ما الأسباب العلمية لضعف محصول ${crop} في البيت البلاستيكي (أ)؟`,
			imageUrl,
			imageCaption: `السند 2: مقارنة بيتين بلاستيكيين لزراعة ${crop}`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `في البيت (أ) اجتمعت ثلاثة أخطاء: حجب الضوء، غياب التهوية (نقص $\\text{CO}_2$)، والإفراط في تركيز الأملاح المعدنية ($20\\text{‰}$)، مما عرقل الامتصاص والتركيب الضوئي.`
		};

		const hints: [string, string, string] = [
			'قارن كل معطى بين البيت البلاستيكي (أ) والبيت (ب) في السندين 1 و 2.',
			'اربط بين شروط التركيب الضوئي (الضوء، CO₂، المحلول المعدني المناسب) وتكوين النسغ الكامل المغذي للثمار.',
			'قدّم 3 حلول عملية مباشرة لإصلاح البيت البلاستيكي (أ).'
		];
		const solutionStepsAr = [
			'استخراج الأخطاء الثلاثة من السند 1 و 2: إضاءة ضعيفة، نقص التهوية (CO₂)، وإفراط في السماد (20‰).',
			'تفسير صغر الثمار بتوقف/ضعف التركيب الضوئي وقلة إنتاج المواد العضوية (النسغ الكامل).',
			'تقديم 3 نصائح زراعية: تنظيف الغطاء، تعديل تركيز السماد لـ 2‰، والتهوية المنتظمة.'
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 8,
			instruction: `*السياق:* يملك الفلاح ${farmer} بيتين بلاستيكيين (أ) و (ب) لزراعة *${crop}* في فصل الشتاء. لاحظ أن نباتات البيت (ب) نمت بقوة وأعطت ثماراً وفيرة وحلوة، بينما اصفرت أوراق نباتات البيت (أ) وذبلت وأعطت ثماراً صغيرة وهزيلة. لمساعدة ${farmer} على فهم المشكل وحله، نقدم لك السندات الآتية:`,
			content: [
				{
					type: 'columns',
					widths: ['1.15fr', '1.35fr'],
					children: [
						{
							type: 'table',
							headers: ['السند 1: العامل المدروس', 'البيت أ', 'البيت ب'],
							cells: [],
							rows: [
								['شدة الإضاءة', 'ضعيفة (غبار)', 'قوية ومناسبة'],
								['تركيز سماد NPK', '20 في الألف', '2 في الألف'],
								['نسبة غاز الفحم (التهوية)', 'منخفضة جداً', 'مناسبة ومتجددة'],
								['متوسط كتلة الثمرة', '35 غ', '160 غ']
							],
							headerBackground: true,
							borders: 'grid',
							width: 'full'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: `السند 2: مقارنة شروط النمو في البيتين أ و ب`
						}
					]
				},
				{
					type: 'text',
					content: `*السند 3:* تسمح البيوت البلاستيكية بالتحكم في شروط *التركيب الضوئي* (الضوء، الحرارة، الرطوبة، غاز ثنائي أكسيد الكربون، والأملاح المعدنية) لإنتاج خضر مبكرة ذات جودة عالية.\n\n*التعليمات:* بالاعتماد على السياق والسندات ومكتسباتك القبلية:`
				},
				{
					type: 'text',
					content: `1) فسّر سبب ذبول واصفرار نباتات البيت البلاستيكي (أ) وضعف حجم ثمار *${crop}* فيه مقارنة بالبيت (ب).`,
					answer: `1) اعتماداً على السياق والسندين 1 و 2 ومكتسباتي القبلية: يرجع ذبول النباتات وضعف حجم ثمار ${crop} في البيت (أ) إلى ثلاثة أسباب:\n- *الإفراط في تركيز السماد المعدني* (20 في الألف بدل 2 في الألف)، مما أضر بالأوبار الماصة وسبب ذبول النبات.\n- *ضعف الإضاءة* بسبب اتساخ الغطاء، و*نقص غاز ثنائي أكسيد الكربون* لقلة التهوية، وهما شرطان أساسيان لعملية *التركيب الضوئي*، فتراجع تركيب المواد العضوية وتخزينها في الثمار عبر النسغ الكامل.`,
					mark: '3'
				},
				{
					type: 'text',
					content: `2) حدد مصدر المواد العضوية المخزنة في ثمار ${crop} الحلوة في البيت (ب)، وسمِّ الأوعية التي نقلتها من الأوراق إلى الثمار.`,
					answer: `2) اعتماداً على السند 3 ومكتسباتي القبلية: مصدر المواد العضوية هو عملية *التركيب الضوئي* التي تمت على مستوى الأوراق الخضراء، ثم نُقلت مع *النسغ الكامل* عبر *الأوعية اللحائية* إلى الثمار لتخزينها.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) قدّم ثلاث نصائح عملية للفلاح ${farmer} لتحسين مردود البيت البلاستيكي (أ)، واذكر فائدة واحدة للبيوت البلاستيكية.`,
					answer: `3) اعتماداً على السندات ومكتسباتي، أنصح الفلاح بـ:\n- تنظيف الغطاء البلاستيكي الشفاف لتوفير *إضاءة كافية*.\n- تهوية البيت البلاستيكي بانتظام لتجديد *غاز ثنائي أكسيد الكربون* وتعديل الحرارة والرطوبة.\n- استعمال سماد معدني بتركيز معتدل ومناسب (2 في الألف) وسقي النباتات بانتظام لتخفيف الأملاح الزائدة.\n*فائدة البيوت البلاستيكية:* إنتاج الخضر والفواكه في غير موسمها وبجودة ووفرة عالية.`,
					mark: '3'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'integration',
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: 'إفراط في السماد + نقص الإضاءة + غياب التهوية (نقص CO₂)'
		};
	}
};

export const SCIENCES_TEMPLATES_1AM_T2: SciencesParameterizedTemplate[] = [
	knopMineralsTemplate,
	rootHairsAbsorptionTemplate,
	elodeaGasExchangeTemplate,
	photosynthesisStarchTemplate,
	sapTranspirationTemplate,
	integrationGreenhouseTemplate
];
