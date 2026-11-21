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
	const d = difficulty === 'easy' ? 19 : difficulty === 'medium' ? 37 : 59;
	return new SeededRng((((Math.trunc(seed) >>> 0) * 1009 + d * 71 + salt) >>> 0) || 1);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Water Cycle & Distribution
// ═══════════════════════════════════════════════════════════════════════════════
const waterCycleStatesTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3ap_t3_water_cycle_states',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'matter_tech_primary',
	titleAr: 'الماء في الطبيعة: التبخر والتكاثف ودورة الماء',
	curriculumLessonId: 'sci_lesson_3ap_t3_water_cycle_sources',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 901);
		const phenomena = [
			{
				scene: 'تجفّ الملابس المبللة المنشورة تحت أشعة الشمس الحارة',
				answer: 'التبخر (تحول الماء السائل إلى بخار ماء بالحرارة)',
				short: 'التبخر'
			},
			{
				scene: 'تتشكل السحب في السماء الباردة وقطرات الماء على غطاء القدر البارد',
				answer: 'التكاثف (تحول بخار الماء إلى قطرات ماء بالبرودة)',
				short: 'التكاثف'
			},
			{
				scene: 'تتساقط الأمطار والثلوج من السحب الكثيفة نحو الجبال والأودية',
				answer: 'التساقط (المرحلة الثالثة في دورة الماء)',
				short: 'التساقط'
			},
			{
				scene: 'يتحول الماء السائل إلى جليد صلب في قمم الجبال الباردة شتاءً',
				answer: 'التجمد (تحول السائل إلى صلب بالبرودة)',
				short: 'التجمد'
			}
		] as const;

		const target = rng.pick(phenomena);
		const mcq = buildUniqueMcqOptions(
			target.answer,
			phenomena
				.filter((p) => p.short !== target.short)
				.map((o) => ({
					text: o.answer,
					diagnosticFeedback: `انتبه: ${o.short} يحدث عندما (${o.scene}).`
				})),
			rng
		);

		const svg = svgPlantAndPrimaryDiagram('water_cycle', {
			title: 'مراحل دورة الماء في الطبيعة'
		});
		const imageUrl = saveSciencesSvgAsset(`sci_3ap_t3_water_cycle_states_${difficulty}_s${seed}`, svg);

		const qText = `في الملاحظة التالية: **${target.scene}**. ما اسم هذه الظاهرة؟`;

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) ${qText}\nالجواب: ....................`,
						answer: target.answer,
						mark: '1'
					},
					{
						type: 'image',
						src: imageUrl,
						caption: 'دورة الماء في الطبيعة'
					}
				]
			},
			{
				type: 'text',
				content: '2) رتّب مراحل دورة الماء: (التساقط — التبخر — الجريان — التكاثف).',
				answer: '1. التبخر ← 2. التكاثف ← 3. التساقط ← 4. الجريان والمياه الجوفية.',
				mark: '0.75'
			},
			{
				type: 'text',
				content: '3) لماذا نضع الخزان المائي للحي في مكان مرتفع؟ وما دور العداد في المنزل؟',
				answer: 'ليصل الماء بسهولة عبر الأنابيب إلى المنازل، والعداد يقيس كمية الماء المستهلكة.',
				mark: '0.75'
			}
		];

		return {
			templateId: 'sci_tpl_3ap_t3_water_cycle_states',
			seed,
			grade: '3ap',
			trimesterId: 't3',
			difficulty,
			domain: 'matter_tech_primary',
			titleAr: 'الماء في الطبيعة: التبخر والتكاثف ودورة الماء',
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'دورة الماء في الطبيعة',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `هذه الظاهرة هي ${target.answer}.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'استعن برسم دورة الماء في الطبيعة ثم أجب:',
				content
			},
			hints: [
				'التبخر = سائل إلى بخار بالحرارة؛ التكاثف = بخار إلى قطرات بالبرودة.',
				'دورة الماء: تبخر ← تكاثف ← تساقط ← جريان.',
				`الإجابة: ${target.short}.`
			],
			solutionStepsAr: [
				`المشهد: ${target.scene}.`,
				`الظاهرة: ${target.answer}.`
			],
			finalAnswer: target.short
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Simple Electric Circuit & Conductors/Insulators
// ═══════════════════════════════════════════════════════════════════════════════
const electricCircuitConductorsTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3ap_t3_electric_circuit_conductors',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'matter_tech_primary',
	titleAr: 'الدارة الكهربائية البسيطة والنواقل والعوازل',
	curriculumLessonId: 'sci_lesson_3ap_t3_simple_electric_circuit',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 902);
		const samples = [
			{ name: 'مفتاح حديدي', material: 'الحديد', conductive: true },
			{ name: 'سلك نحاسي', material: 'النحاس', conductive: true },
			{ name: 'قطعة ألمنيوم', material: 'الألمنيوم', conductive: true },
			{ name: 'مسطرة بلاستيكية', material: 'البلاستيك', conductive: false },
			{ name: 'قطعة خشب جاف', material: 'الخشب الجاف', conductive: false },
			{ name: 'لوح زجاجي', material: 'الزجاج', conductive: false }
		] as const;

		const tested = rng.pick(samples);
		const svg = wrapSciencesSvg(
			420,
			195,
			`<rect x="6" y="6" width="408" height="183" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="210" y="26" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">تجربة الدارة الكهربائية البسيطة (${esc(tested.name)})</text>` +
				`<rect x="74" y="54" width="272" height="106" rx="8" fill="none" stroke="#0f172a" stroke-width="2.4"/>` +
				// Battery on left
				`<rect x="52" y="84" width="44" height="46" rx="6" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>` +
				`<text x="74" y="102" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">+</text>` +
				`<text x="74" y="122" text-anchor="middle" font-size="12" font-weight="bold" fill="#2563eb">−</text>` +
				// Lamp on right
				`<circle cx="346" cy="107" r="18" fill="${tested.conductive ? '#fde047' : '#e2e8f0'}" stroke="#0f172a" stroke-width="2"/>` +
				`<line x1="335" y1="96" x2="357" y2="118" stroke="#0f172a" stroke-width="1.6"/>` +
				`<line x1="335" y1="118" x2="357" y2="96" stroke="#0f172a" stroke-width="1.6"/>` +
				// Sample gap on top
				`<rect x="148" y="42" width="124" height="24" rx="6" fill="${tested.conductive ? '#dcfce7' : '#fee2e2'}" stroke="${tested.conductive ? '#16a34a' : '#dc2626'}" stroke-width="1.8"/>` +
				`<text x="210" y="58" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#0f172a">${esc(tested.name)}</text>` +
				// Closed switch on bottom
				`<rect x="184" y="150" width="52" height="20" fill="#f8fafc"/>` +
				`<circle cx="188" cy="160" r="3.5" fill="#0f172a"/><circle cx="232" cy="160" r="3.5" fill="#0f172a"/>` +
				`<line x1="188" y1="160" x2="232" y2="160" stroke="#16a34a" stroke-width="2.8"/>` +
				`<text x="210" y="182" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#166534">القاطعة مغلقة — هل يضيء المصباح ولماذا؟</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_3ap_t3_electric_circuit_conductors_${difficulty}_s${seed}`, svg);

		const correctText = tested.conductive
			? `يضيء المصباح لأن ${tested.material} ناقل كهربائي`
			: `لا يضيء المصباح لأن ${tested.material} عازل كهربائي`;

		const mcq = buildUniqueMcqOptions(
			correctText,
			[
				{
					text: tested.conductive
						? `لا يضيء المصباح لأن ${tested.material} عازل كهربائي`
						: `يضيء المصباح لأن ${tested.material} ناقل كهربائي`,
					diagnosticFeedback: tested.conductive
						? `${tested.material} معدن يسمح بمرور الكهرباء فهو ناقل.`
						: `${tested.material} لا يسمح بمرور الكهرباء فهو عازل.`
				},
				{ text: 'ينفجر المصباح فوراً عند غلق القاطعة', diagnosticFeedback: 'البطارية الصغيرة آمنة للتجارب المدرسية ولا تفجر المصباح.' },
				{ text: 'يضيء المصباح حتى لو كانت الدارة مفتوحة', diagnosticFeedback: 'لا يضيء المصباح إلا عندما تكون الدارة مغلقة عبر مواد ناقلة.' }
			],
			rng
		);

		const qText = `في الدارة الكهربائية البسيطة (القاطعة مغلقة)، وضعنا **${tested.name}** في مسار الأسلاك. ماذا يحدث ولماذا؟`;

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) ${qText}\nالجواب: ........................................`,
						answer: correctText,
						mark: '1'
					},
					{
						type: 'image',
						src: imageUrl,
						caption: `دارة اختبار الناقلية (${tested.name})`
					}
				]
			},
			{
				type: 'table',
				headers: ['المادة', 'التصنيف (ناقل / عازل)'],
				cells: [],
				rows: [
					['النحاس والحديد', { content: '....................', answer: 'ناقل كهربائي', mark: '0.5' }],
					['البلاستيك والخشب الجاف', { content: '....................', answer: 'عازل كهربائي', mark: '0.5' }],
					['الألمنيوم', { content: '....................', answer: 'ناقل كهربائي', mark: '0.5' }]
				]
			}
		];

		return {
			templateId: 'sci_tpl_3ap_t3_electric_circuit_conductors',
			seed,
			grade: '3ap',
			trimesterId: 't3',
			difficulty,
			domain: 'matter_tech_primary',
			titleAr: 'الدارة الكهربائية البسيطة والنواقل والعوازل',
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: `تجربة اختبار ${tested.name}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `المعادن كالنحاس والحديد والألمنيوم نواقل، أما البلاستيك والخشب والزجاج فعوازل. إذن: ${correctText}.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'لاحظ الدارة الكهربائية البسيطة ثم أجب وأكمل الجدول:',
				content
			},
			hints: [
				'الناقل الكهربائي يسمح بمرور الكهرباء فيضيء المصباح.',
				'العازل الكهربائي يمنع مرور الكهرباء فلا يضيء المصباح.',
				`الإجابة: ${correctText}.`
			],
			solutionStepsAr: [
				`العينة الموضوعة: ${tested.name} (${tested.material}).`,
				`تصنيفها: ${tested.conductive ? 'ناقل كهربائي' : 'عازل كهربائي'}.`,
				`النتيجة: ${correctText}.`
			],
			finalAnswer: tested.conductive ? 'يضيء (ناقل كهربائي)' : 'لا يضيء (عازل كهربائي)'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Graduated Thermometer Reading (Dynamic Temperature SVG!)
// ═══════════════════════════════════════════════════════════════════════════════
const thermometerReadingTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3ap_t3_thermometer_reading',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'matter_tech_primary',
	titleAr: 'المحرار وقراءة درجة الحرارة',
	curriculumLessonId: 'sci_lesson_3ap_t3_thermometer_temperature',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 903);
		const temps =
			difficulty === 'easy'
				? [10, 20, 30, 40]
				: difficulty === 'medium'
					? [15, 25, 35, 37]
					: [12, 24, 38, 42];
		const temp = rng.pick(temps);

		// Horizontal or vertical crisp graduated thermometer from 0 to 50
		const minT = 0;
		const maxT = 50;
		const x0 = 96;
		const barW = 270;
		const px = (t: number) => x0 + ((t - minT) / (maxT - minT)) * barW;
		const fillW = px(temp) - x0;

		let ticksSvg = '';
		for (let t = 0; t <= 50; t += 5) {
			const tx = px(t);
			const major = t % 10 === 0;
			ticksSvg += `<line x1="${tx.toFixed(1)}" y1="88" x2="${tx.toFixed(1)}" y2="${major ? 74 : 80}" stroke="#334155" stroke-width="${major ? 1.8 : 1.2}"/>`;
			if (major) {
				ticksSvg += `<text x="${tx.toFixed(1)}" y="68" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${t}</text>`;
			}
		}

		const svg = wrapSciencesSvg(
			420,
			190,
			`<rect x="6" y="6" width="408" height="178" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="210" y="28" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">قراءة درجة الحرارة على المحرار (بالدرجة المئوية)</text>` +
				// Thermometer horizontal body
				`<rect x="86" y="88" width="292" height="24" rx="12" fill="#ffffff" stroke="#334155" stroke-width="2"/>` +
				`<circle cx="74" cy="100" r="18" fill="#dc2626" stroke="#991b1b" stroke-width="2"/>` +
				`<rect x="86" y="95" width="${(fillW + 10).toFixed(1)}" height="10" fill="#dc2626"/>` +
				ticksSvg +
				`<line x1="${px(temp).toFixed(1)}" y1="114" x2="${px(temp).toFixed(1)}" y2="132" stroke="#dc2626" stroke-width="2" stroke-dasharray="3,2"/>` +
				`<text x="74" y="138" text-anchor="middle" font-size="10" font-weight="bold" fill="#991b1b">الخزان</text>` +
				`<text x="210" y="162" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">التدريجة الكبرى كل 10 درجات، والتدريجة المتوسطة كل 5 درجات</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_3ap_t3_thermometer_reading_${difficulty}_s${seed}`, svg);

		const useFillBlank = difficulty === 'easy' || seed % 2 === 0;
		let quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'];
		const qText = 'اقرأ درجة الحرارة التي يشير إليها السائل الأحمر على المحرار المقابل (بالدرجة المئوية):';

		if (useFillBlank) {
			quizQuestion = {
				type: 'fill_blank',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'محرار سائل مدرّج من 0 إلى 50',
				questionData: {
					sentence: 'درجة الحرارة المقروءة على المحرار هي: ___ درجة مئوية',
					acceptedAnswers: [String(temp), `${temp}°`, `${temp} درجة`]
				},
				explanation: `ينتهي عمود السائل الأحمر عند التدريجة ${temp}، إذن درجة الحرارة هي ${temp} درجة مئوية.`
			};
		} else {
			const wrongVals = [temp + 5, temp - 5, temp + 10].map((v) => Math.max(0, Math.min(50, v)));
			const mcq = buildUniqueMcqOptions(
				`${temp} درجة مئوية`,
				wrongVals.map((v) => ({
					text: `${v} درجة مئوية`,
					diagnosticFeedback: `تتبّع نهاية السائل الأحمر بدقة بين التدريجات؛ السائل متوقف عند ${temp}.`
				})),
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'محرار سائل مدرّج',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `يشير مستوى السائل المحراري إلى التدريجة ${temp} درجة مئوية.`
			};
		}

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: imageUrl,
				caption: 'قراءة درجة الحرارة بالمحرار'
			},
			{
				type: 'text',
				content: '1) اكتب درجة الحرارة التي يشير إليها المحرار: .......... درجة مئوية.',
				answer: `${temp} درجة مئوية.`,
				mark: '1'
			},
			{
				type: 'table',
				headers: ['الحالة المرجعية', 'درجة الحرارة بالدرجة المئوية'],
				cells: [],
				rows: [
					['تجمد الماء النقي', { content: '..........', answer: '0 درجة مئوية', mark: '0.5' }],
					['حرارة جسم الإنسان السليم', { content: '..........', answer: '37 درجة مئوية', mark: '0.5' }],
					['غليان الماء النقي', { content: '..........', answer: '100 درجة مئوية', mark: '0.5' }]
				]
			}
		];

		return {
			templateId: 'sci_tpl_3ap_t3_thermometer_reading',
			seed,
			grade: '3ap',
			trimesterId: 't3',
			difficulty,
			domain: 'matter_tech_primary',
			titleAr: 'المحرار وقراءة درجة الحرارة',
			onecRole: 'recall',
			quizQuestion,
			sujetExercise: {
				points: 2.5,
				instruction: 'اقرأ التدريجة على المحرار ثم أكمل جدول الدرجات المرجعية:',
				content
			},
			hints: [
				'كل تدريجة كبرى تمثل 10 درجات، والتدريجة التي في منتصفها تمثل 5 درجات.',
				'انظر أين يتوقف السائل الأحمر بدقة.',
				`القراءة الصحيحة هي: ${temp} درجة مئوية.`
			],
			solutionStepsAr: [
				`نحدد موقع نهاية السائل الأحمر على الأنبوب المدرج.`,
				`درجة الحرارة المقروءة = ${temp} درجة مئوية.`
			],
			finalAnswer: `${temp} درجة مئوية`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Waste Sorting Bins
// ═══════════════════════════════════════════════════════════════════════════════
const wasteSortingBinsTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3ap_t3_waste_sorting_bins',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'ecology_environment',
	titleAr: 'الفرز الانتقائي للنفايات وحماية المحيط',
	curriculumLessonId: 'sci_lesson_3ap_t3_waste_sorting_environment',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 904);
		const items = [
			{ waste: 'قارورة ماء بلاستيكية', bin: 'حاوية البلاستيك (الصفراء)', kind: 'نفايات بلاستيكية' },
			{ waste: 'جرائد وعلب كرتون وكراريس قديمة', bin: 'حاوية الورق والكرتون (الزرقاء)', kind: 'نفايات ورقية' },
			{ waste: 'قنينة عصير زجاجية فارغة', bin: 'حاوية الزجاج (الخضراء)', kind: 'نفايات زجاجية' },
			{ waste: 'قشور الخضر والفواكه وبقايا الطعام', bin: 'حاوية النفايات العضوية (البنية)', kind: 'نفايات عضوية (لصنع السماد)' }
		] as const;

		const target = rng.pick(items);
		const mcq = buildUniqueMcqOptions(
			target.bin,
			items
				.filter((x) => x.bin !== target.bin)
				.map((o) => ({
					text: o.bin,
					diagnosticFeedback: `${o.bin} مخصصة لـ ${o.kind} وليس لـ (${target.waste}).`
				})),
			rng
		);

		const svg = svgPlantAndPrimaryDiagram('recycling_solar', {
			title: 'حاويات الفرز الانتقائي وحماية المحيط'
		});
		const imageUrl = saveSciencesSvgAsset(`sci_3ap_t3_waste_sorting_bins_${difficulty}_s${seed}`, svg);

		const qText = `أثناء الفرز الانتقائي للنفايات في المدرسة، في أي حاوية نضع **${target.waste}**؟`;

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: imageUrl,
				caption: 'حاويات الفرز الانتقائي'
			},
			{
				type: 'table',
				headers: ['النفاية', 'الحاوية المناسبة للفرز الانتقائي'],
				cells: [],
				rows: items.map((x) => [
					x.waste,
					{ content: '....................', answer: x.bin, mark: '0.5' }
				])
			},
			{
				type: 'text',
				content: '2) اذكر فائدة واحدة لإعادة تدوير النفايات المفروزة.',
				answer: 'حماية المحيط من التلوث، تقليل كمية القمامة، وحماية الأشجار والموارد الطبيعية.',
				mark: '0.5'
			}
		];

		return {
			templateId: 'sci_tpl_3ap_t3_waste_sorting_bins',
			seed,
			grade: '3ap',
			trimesterId: 't3',
			difficulty,
			domain: 'ecology_environment',
			titleAr: 'الفرز الانتقائي للنفايات وحماية المحيط',
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'الفرز الانتقائي للنفايات',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نضع ${target.waste} في ${target.bin} لأنها من فئة ${target.kind}.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'صنّف كل نفاية في حاويتها المناسبة ثم أجب:',
				content
			},
			hints: [
				'الصفراء للبلاستيك، الزرقاء للورق، الخضراء للزجاج، والبنية للنفايات العضوية.',
				`فكّر في المادة المصنوع منها (${target.waste}).`,
				`الحاوية المناسبة: ${target.bin}.`
			],
			solutionStepsAr: [
				`نوع النفاية: ${target.kind}.`,
				`الحاوية المناسبة: ${target.bin}.`
			],
			finalAnswer: target.bin
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Integration: The Eco-Friendly Home
// ═══════════════════════════════════════════════════════════════════════════════
const integrationEcoHomeTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3ap_t3_integration_eco_home',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: المنزل الصديق للبيئة',
	curriculumLessonId: 'sci_lesson_3ap_t3_waste_sorting_environment',
	defaultPoints: 2.5,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 905);

		const svg = wrapSciencesSvg(
			440,
			195,
			`<rect x="6" y="6" width="428" height="183" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="220" y="27" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">مشروع المنزل الصديق للبيئة والآمن</text>` +
				`<rect x="300" y="48" width="120" height="118" rx="9" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.6"/>` +
				`<text x="360" y="74" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1">ترشيد الماء</text>` +
				`<text x="360" y="102" text-anchor="middle" font-size="9.6" fill="#334155">إصلاح الحنفيات</text>` +
				`<text x="360" y="124" text-anchor="middle" font-size="9.6" fill="#0284c7">ومراقبة العداد</text>` +
				`<rect x="160" y="48" width="120" height="118" rx="9" fill="#fefce8" stroke="#ca8a04" stroke-width="1.6"/>` +
				`<text x="220" y="74" text-anchor="middle" font-size="11" font-weight="bold" fill="#854d0e">الكهرباء والحرارة</text>` +
				`<text x="220" y="102" text-anchor="middle" font-size="9.6" fill="#334155">أسلاك معزولة</text>` +
				`<text x="220" y="124" text-anchor="middle" font-size="9.6" fill="#a16207">ومحرار لقياس الحرارة</text>` +
				`<rect x="20" y="48" width="120" height="118" rx="9" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.6"/>` +
				`<text x="80" y="74" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534">فرز النفايات</text>` +
				`<text x="80" y="102" text-anchor="middle" font-size="9.6" fill="#334155">فرز انتقائي</text>` +
				`<text x="80" y="124" text-anchor="middle" font-size="9.6" fill="#15803d">لإعادة التدوير</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_3ap_t3_integration_eco_home_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'إغلاق الحنفيات وترشيد الماء، تغليف الأسلاك بالعوازل، قياس الحرارة بالمحرار، والفرز الانتقائي للنفايات',
			[
				{ text: 'ترك الحنفيات مفتوحة ولمس الأسلاك العارية بيد مبللة', diagnosticFeedback: 'هذان سلوكان خطيران يبذّران الماء ويسببان الصعق الكهربائي.' },
				{ text: 'حرق البلاستيك في فناء المنزل للتخلص من القمامة', diagnosticFeedback: 'حرق البلاستيك يلوث الهواء بغازات سامة؛ الحل هو الفرز الانتقائي.' },
				{ text: 'تغليف الأسلاك الكهربائية بالحديد بدل البلاستيك', diagnosticFeedback: 'الحديد ناقل كهربائي ويشكل خطراً، بينما البلاستيك عازل يحمينا.' }
			],
			rng
		);

		const qText = 'أيّ مجموعة من السلوكات تجعل منزلنا آمناً وصديقاً للبيئة؟';

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: imageUrl,
				caption: 'المنزل الآمن والصديق للبيئة'
			},
			{
				type: 'text',
				content: '1) لاحظ الأب ارتفاع فاتورة الماء ففحص العداد وأصلح حنفية تسيل. ما دور العداد، وكيف نرشد استهلاك الماء؟',
				answer: 'العداد يقيس كمية الماء المستهلكة، ونرشد الاستهلاك بإصلاح التسربات وإغلاق الحنفية بعد الاستعمال.',
				mark: '0.75'
			},
			{
				type: 'text',
				content: '2) لماذا تكون أسلاك الكهرباء في المنزل مغلفة بالبلاستيك، وما قاعدة الأمن الأساسية عند استعمال كهرباء المنزل؟',
				answer: 'لأن البلاستيك عازل يحمينا من الصعق الكهربائي، ولا نلمس المآخذ أو الأسلاك العارية أبداً خاصة بيدين مبللتين.',
				mark: '1'
			},
			{
				type: 'text',
				content: '3) كيف تتخلص العائلة بطريقة صديقة للبيئة من القارورات البلاستيكية وقشور الخضر؟',
				answer: 'بالفرز الانتقائي: البلاستيك في حاوية البلاستيك لإعادة التدوير، وقشور الخضر في النفايات العضوية لصنع سماد.',
				mark: '0.75'
			}
		];

		return {
			templateId: 'sci_tpl_3ap_t3_integration_eco_home',
			seed,
			grade: '3ap',
			trimesterId: 't3',
			difficulty,
			domain: 'integration',
			titleAr: 'وضعية إدماجية: المنزل الصديق للبيئة',
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'سلوكات المنزل الصديق للبيئة',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'المنزل الصديق للبيئة يجمع بين ترشيد الماء، احترام قواعد الأمن الكهربائي، والفرز الانتقائي للنفايات.'
			},
			sujetExercise: {
				points: 2.5,
				customTitle: 'الوضعية الإدماجية',
				instruction: 'قررت عائلتك تطبيق قواعد الأمن وحماية البيئة في المنزل. أجب عن الأسئلة:',
				content
			},
			hints: [
				'العداد يقيس استهلاك الماء، والبلاستيك عازل كهربائي.',
				'لا نلمس كهرباء المنزل أبداً بيدين مبللتين.',
				'الفرز الانتقائي يفصل البلاستيك عن النفايات العضوية لإعادة التدوير.'
			],
			solutionStepsAr: [
				'العداد يقيس كمية الماء؛ نصلح الحنفيات لعدم التبذير.',
				'البلاستيك عازل كهربائي يحمينا من الصعق.',
				'الفرز الانتقائي يحمي المحيط ويسهّل إعادة التدوير.'
			],
			finalAnswer: 'ترشيد الماء — العزل والأمن الكهربائي — الفرز الانتقائي'
		};
	}
};

export const SCIENCES_TEMPLATES_3AP_T3: SciencesParameterizedTemplate[] = [
	waterCycleStatesTemplate,
	electricCircuitConductorsTemplate,
	thermometerReadingTemplate,
	wasteSortingBinsTemplate,
	integrationEcoHomeTemplate
];
