import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import type { ContentBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	esc,
	haloText,
	saveSciencesSvgAsset,
	svgPlantAndPrimaryDiagram,
	wrapSciencesSvg
} from '../../svg-sciences';

function makeRng(seed: number, difficulty: Difficulty, salt: number): SeededRng {
	const d = difficulty === 'easy' ? 17 : difficulty === 'medium' ? 31 : 53;
	return new SeededRng((((Math.trunc(seed) >>> 0) * 1009 + d * 83 + salt) >>> 0) || 1);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Animal Respiration Modes (Pulmonary, Gill, Cutaneous)
// ═══════════════════════════════════════════════════════════════════════════════
const respirationModesTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3ap_t2_respiration_modes',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'ecology_environment',
	titleAr: 'أنماط التنفس عند الحيوانات (رئوي، غلصمي، جلدي)',
	curriculumLessonId: 'sci_lesson_3ap_t2_animal_respiration_modes',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 801);
		const cases = [
			{ animal: 'سمكة السردين', habitat: 'الماء', mode: 'تنفس غلصمي (بواسطة الغلاصم)' },
			{ animal: 'دودة الأرض', habitat: 'التربة الرطبة', mode: 'تنفس جلدي (عبر الجلد الرطب)' },
			{ animal: 'الضفدع', habitat: 'البر والماء (برمائي)', mode: 'تنفس رئوي وجلدي معاً' },
			{ animal: 'الدولفين', habitat: 'البحر (يصعد للسطح)', mode: 'تنفس رئوي (بواسطة الرئتين)' },
			{ animal: 'الحمامة', habitat: 'البر والهواء', mode: 'تنفس رئوي (بواسطة الرئتين)' }
		] as const;

		const pool = difficulty === 'easy' ? [cases[0], cases[1], cases[4]] : cases;
		const chosen = rng.pick(pool);
		const distinctModes = [
			'تنفس غلصمي (بواسطة الغلاصم)',
			'تنفس جلدي (عبر الجلد الرطب)',
			'تنفس رئوي وجلدي معاً',
			'تنفس رئوي (بواسطة الرئتين)'
		];

		const mcq = buildUniqueMcqOptions(
			chosen.mode,
			distinctModes
				.filter((m) => m !== chosen.mode)
				.map((m) => ({
					text: m,
					diagnosticFeedback: `راجع نمط تنفس ${chosen.animal}: يعيش في ${chosen.habitat} وله ${chosen.mode}.`
				})),
			rng
		);

		const svg = wrapSciencesSvg(
			420,
			190,
			`<rect x="6" y="6" width="408" height="178" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="210" y="28" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">أنماط التنفس وتكيف الحيوانات مع أوساطها</text>` +
				`<rect x="282" y="50" width="116" height="92" rx="9" fill="#eff6ff" stroke="#2563eb" stroke-width="1.6"/>` +
				`<text x="340" y="80" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#1e3a8a">رئوي</text>` +
				`<text x="340" y="108" text-anchor="middle" font-size="9.8" fill="#334155">الرئتان</text>` +
				`<text x="340" y="128" text-anchor="middle" font-size="9.2" fill="#1d4ed8">خروف، حمامة، دولفين</text>` +
				`<rect x="152" y="50" width="116" height="92" rx="9" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.6"/>` +
				`<text x="210" y="80" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#0369a1">غلصمي</text>` +
				`<text x="210" y="108" text-anchor="middle" font-size="9.8" fill="#334155">الغلاصم</text>` +
				`<text x="210" y="128" text-anchor="middle" font-size="9.2" fill="#0284c7">الأسماك (السردين)</text>` +
				`<rect x="22" y="50" width="116" height="92" rx="9" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.6"/>` +
				`<text x="80" y="80" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#166534">جلدي</text>` +
				`<text x="80" y="108" text-anchor="middle" font-size="9.8" fill="#334155">الجلد الرطب</text>` +
				`<text x="80" y="128" text-anchor="middle" font-size="9.2" fill="#15803d">دودة الأرض والضفدع</text>` +
				`<text x="210" y="168" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">الحيوان المعني بالسؤال: ${esc(chosen.animal)} (${esc(chosen.habitat)})</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_3ap_t2_respiration_modes_${difficulty}_s${seed}`, svg);

		const qText = `ما نمط التنفس وعضو التنفس عند **${chosen.animal}** (${chosen.habitat})؟`;

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: imageUrl,
				caption: 'أنماط التنفس عند الحيوانات'
			},
			{
				type: 'table',
				headers: ['الحيوان', 'وسط العيش', 'نمط التنفس والعضو'],
				cells: [],
				rows: [
					['سمكة السردين', 'مائي', { content: '....................', answer: 'غلصمي (الغلاصم)', mark: '0.5' }],
					['دودة الأرض', 'التربة الرطبة', { content: '....................', answer: 'جلدي (الجلد الرطب)', mark: '0.5' }],
					['الضفدع', 'برمائي', { content: '....................', answer: 'رئوي وجلدي معاً', mark: '0.75' }],
					['الدولفين', 'البحر (ثديي مائي)', { content: '....................', answer: 'رئوي (الرئتان)', mark: '0.75' }]
				]
			}
		];

		return {
			templateId: 'sci_tpl_3ap_t2_respiration_modes',
			seed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: 'ecology_environment',
			titleAr: 'أنماط التنفس عند الحيوانات (رئوي، غلصمي، جلدي)',
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'أنماط التنفس الثلاثة عند الحيوانات',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `يتنفس ${chosen.animal} بـ ${chosen.mode}.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'أكمل الجدول بتحديد نمط التنفس وعضو التنفس لكل حيوان:',
				content
			},
			hints: [
				'الأسماك تتنفس بالغلاصم، ودودة الأرض بالجلد الرطب.',
				'الضفدع برمائي (رئوي وجلدي)، والدولفين ثديي مائي يتنفس بالرئتين.',
				`الإجابة لـ ${chosen.animal}: ${chosen.mode}.`
			],
			solutionStepsAr: [
				`الحيوان: ${chosen.animal} في وسط: ${chosen.habitat}.`,
				`نمط التنفس: ${chosen.mode}.`
			],
			finalAnswer: chosen.mode
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Seed Parts & Germination
// ═══════════════════════════════════════════════════════════════════════════════
const seedPartsGerminationTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3ap_t2_seed_parts_germination',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'plant_biology',
	titleAr: 'مكونات البذرة ومراحل الإنتاش',
	curriculumLessonId: 'sci_lesson_3ap_t2_plant_repro_seeds',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 802);
		const parts = [
			{ num: '1', name: 'اللحافة', role: 'غلاف خارجي يحمي البذرة' },
			{ num: '2', name: 'الفلقتان', role: 'تخزين الغذاء اللازم للرشيم أثناء الإنتاش' },
			{ num: '3', name: 'الرشيم (جذير + سويقة + وريقتان)', role: 'النبتة المصغرة التي تنمو لتعطي نباتاً جديداً' }
		] as const;

		const target = rng.pick(parts);
		const mcq = buildUniqueMcqOptions(
			target.name,
			[
				...parts
					.filter((p) => p.name !== target.name)
					.map((o) => ({
						text: o.name,
						diagnosticFeedback: `${o.name} دورها هو: ${o.role}.`
					})),
				{ text: 'الثمرة الناضجة', diagnosticFeedback: 'الثمرة تحيط بالبذور وليست جزءاً داخل البذرة.' }
			],
			rng
		);

		const svg = wrapSciencesSvg(
			420,
			195,
			`<rect x="6" y="6" width="408" height="183" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="210" y="27" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">مقطع مفتوح لبذرة الفاصولياء (بيانات مرقّمة)</text>` +
				`<ellipse cx="210" cy="112" rx="76" ry="52" fill="#fef3c7" stroke="#92400e" stroke-width="4.5"/>` +
				`<ellipse cx="210" cy="112" rx="68" ry="44" fill="#fef9c3" stroke="#ca8a04" stroke-width="1.4"/>` +
				`<path d="M 248 98 Q 260 116 250 136" fill="none" stroke="#16a34a" stroke-width="4.5" stroke-linecap="round"/>` +
				`<ellipse cx="242" cy="94" rx="9" ry="5" fill="#4ade80" stroke="#15803d"/>` +
				`<ellipse cx="256" cy="94" rx="9" ry="5" fill="#4ade80" stroke="#15803d"/>` +
				// Callouts 1, 2, 3
				`<line x1="146" y1="80" x2="94" y2="66" stroke="#334155" stroke-width="1.3"/>` +
				`<circle cx="82" cy="64" r="11" fill="#92400e"/><text x="82" y="68" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">1</text>` +
				`<line x1="184" y1="126" x2="94" y2="142" stroke="#334155" stroke-width="1.3"/>` +
				`<circle cx="82" cy="144" r="11" fill="#ca8a04"/><text x="82" y="148" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">2</text>` +
				`<line x1="258" y1="112" x2="322" y2="104" stroke="#334155" stroke-width="1.3"/>` +
				`<circle cx="334" cy="102" r="11" fill="#15803d"/><text x="334" y="106" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">3</text>` +
				`<text x="210" y="180" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#475569">حدّد اسم العنصر رقم (${target.num}) ودوره أثناء الإنتاش</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_3ap_t2_seed_parts_germination_${difficulty}_s${seed}`, svg);

		const qText = `في رسم بذرة الفاصولياء، ما اسم الجزء المشار إليه بالرقم **(${target.num})** والذي يتمثل دوره في: **${target.role}**؟`;

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: '1) سمّ البيانات المرقّمة على رسم بذرة الفاصولياء:\n1: ....................   2: ....................   3: ....................',
						answer: '1: اللحافة، 2: الفلقتان، 3: الرشيم (جذير + سويقة + وريقتان).',
						mark: '1.5'
					},
					{
						type: 'image',
						src: imageUrl,
						caption: 'مكونات بذرة الفاصولياء'
					}
				]
			},
			{
				type: 'text',
				content: '2) لماذا تضمر الفلقتان وتصغران تدريجياً أثناء إنتاش البذرة؟',
				answer: 'لأن الرشيم يستهلك الغذاء المخزن داخل الفلقتين في بداية نموه.',
				mark: '1'
			}
		];

		return {
			templateId: 'sci_tpl_3ap_t2_seed_parts_germination',
			seed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: 'plant_biology',
			titleAr: 'مكونات البذرة ومراحل الإنتاش',
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'مقطع بذرة الفاصولياء',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `العنصر رقم (${target.num}) هو ${target.name}، ودوره: ${target.role}.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'لاحظ مقطع بذرة الفاصولياء ثم أجب عن السؤالين:',
				content
			},
			hints: [
				'الرقم 1 يشير للغلاف الخارجي، والرقم 2 للنصفين الداخليين، والرقم 3 للنبتة المصغرة.',
				'اللحافة للحماية، الفلقتان للغذاء، والرشيم يعطي النبيتة.',
				`الإجابة: ${target.name}.`
			],
			solutionStepsAr: [
				'1: اللحافة، 2: الفلقتان، 3: الرشيم.',
				`العنصر رقم (${target.num}) هو ${target.name}.`
			],
			finalAnswer: target.name
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Vegetative Propagation Matching
// ═══════════════════════════════════════════════════════════════════════════════
const vegetativePropagationTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3ap_t2_vegetative_propagation',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'plant_biology',
	titleAr: 'طرق التكاثر عند النباتات (بذور، فسائل، درنات، أبصال)',
	curriculumLessonId: 'sci_lesson_3ap_t2_plant_repro_vegetative',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 803);
		const pairs = [
			{ left: { text: 'النخيل والموز' }, right: { text: 'التكاثر بالفسائل' } },
			{ left: { text: 'البطاطا' }, right: { text: 'التكاثر بالدرنات' } },
			{ left: { text: 'البصل والثوم' }, right: { text: 'التكاثر بالأبصال' } },
			{ left: { text: 'القمح والفاصولياء' }, right: { text: 'التكاثر بالبذور' } }
		];

		const svg = wrapSciencesSvg(
			420,
			185,
			`<rect x="6" y="6" width="408" height="173" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="210" y="28" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">تنوع طرق التكاثر عند النباتات ذات الأزهار</text>` +
				[
					{ x: 314, t: 'البذور', sub: 'قمح، حمص', col: '#2563eb', bg: '#eff6ff' },
					{ x: 214, t: 'الفسائل', sub: 'نخيل، موز', col: '#16a34a', bg: '#f0fdf4' },
					{ x: 114, t: 'الدرنات', sub: 'البطاطا', col: '#d97706', bg: '#fffbeb' },
					{ x: 14, t: 'الأبصال', sub: 'بصل، ثوم', col: '#7c3aed', bg: '#f5f3ff' }
				]
					.map(
						(c) =>
							`<rect x="${c.x}" y="52" width="92" height="96" rx="9" fill="${c.bg}" stroke="${c.col}" stroke-width="1.7"/>` +
							`<text x="${c.x + 46}" y="86" text-anchor="middle" font-size="11.5" font-weight="bold" fill="${c.col}">${c.t}</text>` +
							`<text x="${c.x + 46}" y="118" text-anchor="middle" font-size="10" fill="#334155">${c.sub}</text>`
					)
					.join('') +
				`<text x="210" y="168" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#475569">إضافة إلى الافتسال بغرس الأغصان (مثل الورد والعنب)</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_3ap_t2_vegetative_propagation_${difficulty}_s${seed}`, svg);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: imageUrl,
				caption: 'طرق التكاثر عند النباتات'
			},
			{
				type: 'table',
				headers: ['النبات', 'طريقة التكاثر (بذور / فسائل / درنات / أبصال / افتسال)'],
				cells: [],
				rows: [
					['النخيل', { content: '....................', answer: 'الفسائل', mark: '0.5' }],
					['البطاطا', { content: '....................', answer: 'الدرنات', mark: '0.5' }],
					['البصل والثوم', { content: '....................', answer: 'الأبصال', mark: '0.5' }],
					['الفاصولياء والقمح', { content: '....................', answer: 'البذور', mark: '0.5' }],
					['شجيرة الورد والعنب', { content: '....................', answer: 'الافتسال (غرس الأغصان)', mark: '0.5' }]
				]
			}
		];

		return {
			templateId: 'sci_tpl_3ap_t2_vegetative_propagation',
			seed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: 'plant_biology',
			titleAr: 'طرق التكاثر عند النباتات (بذور، فسائل، درنات، أبصال)',
			onecRole: 'recall',
			quizQuestion: {
				type: 'matching',
				questionText: 'اربط كل نبات بطريقة التكاثر المناسبة له:',
				questionTextAr: 'اربط كل نبات بطريقة تكاثره:',
				imageUrl,
				imageCaption: 'طرق تكاثر النباتات',
				questionData: { pairs: rng.shuffle(pairs) },
				explanation: 'يتكاثر النخيل بالفسائل، والبطاطا بالدرنات، والبصل والثوم بالأبصال، والقمح والفاصولياء بالبذور.'
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'أكمل الجدول بذكر طريقة تكاثر كل نبات:',
				content
			},
			hints: [
				'النخيل في الواحات يُغرس بالفسائل، والبطاطا بالدرنات.',
				'البصل والثوم بالأبصال، والقمح والفاصولياء بالبذور.',
				'غرس غصن من الورد أو العنب يسمى الافتسال.'
			],
			solutionStepsAr: [
				'النخيل ← الفسائل، البطاطا ← الدرنات.',
				'البصل ← الأبصال، القمح ← البذور، الورد ← الافتسال.'
			],
			finalAnswer: 'الفسائل — الدرنات — الأبصال — البذور'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Plant Light & Water Controlled Experiment
// ═══════════════════════════════════════════════════════════════════════════════
const plantLightWaterExpTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3ap_t2_plant_light_water_exp',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'plant_biology',
	titleAr: 'تحليل تجربة حاجة النبات الأخضر للماء والضوء',
	curriculumLessonId: 'sci_lesson_3ap_t2_plant_water_light_needs',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 804);
		const cases = [
			{
				potName: 'الأصيص (أ)',
				setup: 'موضوع قرب النافذة (ضوء) ويُسقى بانتظام بالماء والأملاح المعدنية',
				result: 'نمو جيد وبقاء الأوراق خضراء نضرة',
				reason: 'لتوفر الماء والأملاح المعدنية والضوء معاً',
				col: '#16a34a',
				bg: '#f0fdf4'
			},
			{
				potName: 'الأصيص (ب)',
				setup: 'موضوع في الضوء قرب النافذة لكنه لا يُسقى بالماء أبداً',
				result: 'ذبول النبتة وجفافها ثم موتها',
				reason: 'بسبب غياب الماء الضروري لحياة النبات',
				col: '#dc2626',
				bg: '#fef2f2'
			},
			{
				potName: 'الأصيص (ج)',
				setup: 'يُسقى بالماء بانتظام لكنه مغطى بصندوق عاتم (في الظلام التام)',
				result: 'اصفرار الأوراق وضعف النمو ثم الذبول',
				reason: 'بسبب غياب الضوء الضروري للنبات الأخضر',
				col: '#d97706',
				bg: '#fffbeb'
			}
		] as const;

		const target = rng.pick(cases);
		const mcq = buildUniqueMcqOptions(
			target.result,
			[
				...cases
					.filter((c) => c.result !== target.result)
					.map((o) => ({
						text: o.result,
						diagnosticFeedback: `تلك هي نتيجة ${o.potName} (${o.setup}).`
					})),
				{ text: 'يتحول النبات إلى شجرة مثمرة في يوم واحد', diagnosticFeedback: 'النبات يحتاج للماء والضوء معاً وينمو تدريجياً.' }
			],
			rng
		);

		const svg = wrapSciencesSvg(
			420,
			195,
			`<rect x="6" y="6" width="408" height="183" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="210" y="26" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">تجربة مقارنة: شروط نمو النبات الأخضر</text>` +
				cases
					.map((c, i) => {
						const x = 286 - i * 132;
						const active = c.potName === target.potName;
						return (
							`<rect x="${x}" y="44" width="120" height="128" rx="9" fill="${c.bg}" stroke="${c.col}" stroke-width="${active ? '2.8' : '1.4'}"/>` +
							`<text x="${x + 60}" y="68" text-anchor="middle" font-size="11.2" font-weight="bold" fill="${c.col}">${c.potName}</text>` +
							`<text x="${x + 60}" y="98" text-anchor="middle" font-size="9.5" fill="#0f172a">${i === 0 ? 'ضوء + ماء' : i === 1 ? 'ضوء دون ماء' : 'ماء في الظلام'}</text>` +
							`<text x="${x + 60}" y="136" text-anchor="middle" font-size="10.2" font-weight="bold" fill="${c.col}">${active ? 'ما النتيجة؟' : 'تجربة مقارنة'}</text>`
						);
					})
					.join('') +
				`<text x="210" y="184" text-anchor="middle" font-size="10" font-weight="bold" fill="#475569">نراقب حالة النباتات الثلاث بعد مرور أسبوعين</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_3ap_t2_plant_light_water_exp_${difficulty}_s${seed}`, svg);

		const qText = `في تجربة نمو النبات الأخضر، **${target.potName}** ${target.setup}. ماذا نلاحظ بعد أسبوعين؟`;

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: imageUrl,
				caption: 'تجربة حاجة النبات للماء والضوء'
			},
			{
				type: 'table',
				headers: ['الأصيص وشروط التجربة', 'النتيجة بعد أسبوعين', 'التفسير العلمي'],
				cells: [],
				rows: cases.map((c) => [
					`${c.potName}: ${c.setup}`,
					{ content: '....................', answer: c.result, mark: '0.4' },
					{ content: '....................', answer: c.reason, mark: '0.4' }
				])
			},
			{
				type: 'text',
				content: 'استنتج الحاجات الأساسية لنمو النبات الأخضر نمواً سليماً.',
				answer: 'يحتاج النبات الأخضر إلى الماء والأملاح المعدنية وإلى الضوء معاً.',
				mark: '0.1'
			}
		];
		// Make marks sum cleanly to 2.5: 3 rows × (0.5 + 0.25) = 2.25? Better: 3 rows × 0.5 = 1.5 + conclusion 1.0 = 2.5!
		content[1] = {
			type: 'table',
			headers: ['الأصيص', 'النتيجة الملاحظة بعد أسبوعين'],
			cells: [],
			rows: cases.map((c) => [
				`${c.potName} (${c.potName === 'الأصيص (أ)' ? 'ضوء + ماء' : c.potName === 'الأصيص (ب)' ? 'ضوء دون ماء' : 'ماء في الظلام'})`,
				{ content: '....................', answer: `${c.result} (${c.reason})`, mark: '0.5' }
			])
		};
		content[2] = {
			type: 'text',
			content: '2) ماذا تستنتج من هذه التجربة حول حاجات النبات الأخضر؟',
			answer: 'يحتاج النبات الأخضر لينمو نمواً سليماً إلى الماء والأملاح المعدنية وإلى الضوء معاً.',
			mark: '1'
		};

		return {
			templateId: 'sci_tpl_3ap_t2_plant_light_water_exp',
			seed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: 'plant_biology',
			titleAr: 'تحليل تجربة حاجة النبات الأخضر للماء والضوء',
			onecRole: 'scientific_approach',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'تجربة حاجة النبات للماء والضوء',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `في ${target.potName} يحدث (${target.result}) وذلك ${target.reason}.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'أكمل جدول نتائج التجربة ثم اكتب الاستنتاج العلمي:',
				content
			},
			hints: [
				'الماء والضوء معاً = نمو جيد.',
				'دون ماء = ذبول وموت؛ دون ضوء = اصفرار الأوراق وضعفها.',
				`النتيجة في ${target.potName}: ${target.result}.`
			],
			solutionStepsAr: [
				`شروط ${target.potName}: ${target.setup}.`,
				`النتيجة: ${target.result}.`,
				`التفسير: ${target.reason}.`
			],
			finalAnswer: target.result
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Integration: School Garden & Aquarium Project
// ═══════════════════════════════════════════════════════════════════════════════
const integrationSchoolGardenTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3ap_t2_integration_school_garden',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: مشروع حديقة المدرسة وحوض الأسماك',
	curriculumLessonId: 'sci_lesson_3ap_t2_plant_water_light_needs',
	defaultPoints: 2.5,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 805);

		const svg = wrapSciencesSvg(
			440,
			195,
			`<rect x="6" y="6" width="428" height="183" rx="12" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>` +
				`<text x="220" y="27" text-anchor="middle" font-size="13" font-weight="bold" fill="#166534">المشروع البيئي لمدرسة الحي</text>` +
				`<rect x="298" y="48" width="122" height="118" rx="9" fill="#ffffff" stroke="#16a34a" stroke-width="1.6"/>` +
				`<text x="359" y="74" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#166534">غرس النباتات</text>` +
				`<text x="359" y="102" text-anchor="middle" font-size="9.8" fill="#334155">فاصولياء (بذور)</text>` +
				`<text x="359" y="124" text-anchor="middle" font-size="9.8" fill="#15803d">بطاطا (درنات) ونخيل</text>` +
				`<rect x="159" y="48" width="122" height="118" rx="9" fill="#ffffff" stroke="#d97706" stroke-width="1.6"/>` +
				`<text x="220" y="74" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#92400e">العناية بالحديقة</text>` +
				`<text x="220" y="102" text-anchor="middle" font-size="9.8" fill="#334155">سقي بالماء بانتظام</text>` +
				`<text x="220" y="124" text-anchor="middle" font-size="9.8" fill="#b45309">مكان مضيء ومشمس</text>` +
				`<rect x="20" y="48" width="122" height="118" rx="9" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.6"/>` +
				`<text x="81" y="74" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#0369a1">حوض الأسماك</text>` +
				`<text x="81" y="102" text-anchor="middle" font-size="9.8" fill="#334155">أسماك الزينة</text>` +
				`<text x="81" y="124" text-anchor="middle" font-size="9.8" fill="#0284c7">تنفس غلصمي</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_3ap_t2_integration_school_garden_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'تتنفس الأسماك بالغلاصم، وتُغرس البطاطا بالدرنات، وتحتاج النباتات للماء والأملاح والضوء',
			[
				{ text: 'تتنفس الأسماك بالرئتين، وتُوضع النباتات في غرفة مظلمة', diagnosticFeedback: 'الأسماك تتنفس بالغلاصم، والنباتات الخضراء تصفرّ في الظلام.' },
				{ text: 'تتكاثر البطاطا بالفسائل والنخيل بالأبصال', diagnosticFeedback: 'البطاطا بالدرنات، والنخيل بالفسائل، والبصل بالأبصال.' },
				{ text: 'لا تحتاج البذور للماء عند الإنتاش', diagnosticFeedback: 'الماء والدفء شرطان أساسيان لإنتاش البذور.' }
			],
			rng
		);

		const qText = 'في مشروع حديقة المدرسة وحوض الأسماك، أيّ جملة علمية صحيحة بالكامل؟';

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: imageUrl,
				caption: 'مشروع حديقة المدرسة وحوض الأسماك'
			},
			{
				type: 'text',
				content: '1) غرس التلاميذ الفاصولياء والبطاطا وفسيلة نخيل. حدّد طريقة تكاثر كل نبات.',
				answer: 'الفاصولياء: بالبذور، البطاطا: بالدرنات، النخيل: بالفسائل.',
				mark: '1'
			},
			{
				type: 'text',
				content: '2) وضع التلاميذ أصيصاً داخل خزانة مظلمة فاصفرّت أوراقه. ما السبب وكيف ننقذ النبتة؟',
				answer: 'السبب: غياب الضوء؛ ننقذها بنقلها إلى مكان مضيء وسقيها باعتدال.',
				mark: '0.75'
			},
			{
				type: 'text',
				content: '3) راقب التلاميذ أسماك الحوض ودودة أرض في تربة الحديقة. حدّد نمط التنفس عند كل منهما.',
				answer: 'السمكة: تنفس غلصمي (الغلاصم). دودة الأرض: تنفس جلدي (الجلد الرطب).',
				mark: '0.75'
			}
		];

		return {
			templateId: 'sci_tpl_3ap_t2_integration_school_garden',
			seed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: 'integration',
			titleAr: 'وضعية إدماجية: مشروع حديقة المدرسة وحوض الأسماك',
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'حديقة المدرسة وحوض الأسماك',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'تتنفس الأسماك بالغلاصم، وتُغرس البطاطا بالدرنات، وتحتاج النباتات للماء والأملاح المعدنية والضوء معاً.'
			},
			sujetExercise: {
				points: 2.5,
				customTitle: 'الوضعية الإدماجية',
				instruction: 'أنجز تلاميذ السنة الثالثة مشروع حديقة المدرسة وحوض الأسماك. أجب عن الأسئلة:',
				content
			},
			hints: [
				'الفاصولياء بالبذور، البطاطا بالدرنات، النخيل بالفسائل.',
				'غياب الضوء يسبب اصفرار الأوراق.',
				'السمكة تنفسها غلصمي ودودة الأرض تنفسها جلدي.'
			],
			solutionStepsAr: [
				'التكاثر: بذور (فاصولياء)، درنات (بطاطا)، فسائل (نخيل).',
				'سبب الاصفرار: غياب الضوء، والحل نقلها للضوء.',
				'التنفس: السمكة غلصمي، دودة الأرض جلدي.'
			],
			finalAnswer: 'بذور ودرنات وفسائل — غياب الضوء — غلصمي وجلدي'
		};
	}
};

export const SCIENCES_TEMPLATES_3AP_T2: SciencesParameterizedTemplate[] = [
	respirationModesTemplate,
	seedPartsGerminationTemplate,
	vegetativePropagationTemplate,
	plantLightWaterExpTemplate,
	integrationSchoolGardenTemplate
];
