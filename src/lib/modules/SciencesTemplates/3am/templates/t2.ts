import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import { esc, haloText, saveSciencesSvgAsset, wrapSciencesSvg } from '../../svg-sciences';

function svgRockLabTubes(opts: { rock1: string; rock2: string; rock3: string }): string {
	let body = `<rect x="6" y="6" width="448" height="224" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">الوثيقة: تجارب التمييز المخبري بين ثلاث عينات صخرية</text>`;
	const cols = [
		{ x: 356, name: opts.rock1, col: '#b45309', bg: '#fffbeb', note: 'فوران شديد مع الحمض' },
		{ x: 230, name: opts.rock2, col: '#0f766e', bg: '#f0fdfa', note: 'يشكّل عجينة وكتيم للماء' },
		{ x: 104, name: opts.rock3, col: '#334155', bg: '#f1f5f9', note: 'صلب جداً وغير نفاذ' }
	];
	for (const c of cols) {
		body += `<rect x="${c.x - 56}" y="44" width="112" height="166" rx="8" fill="${c.bg}" stroke="${c.col}" stroke-width="1.7"/>`;
		body += `<text x="${c.x}" y="68" text-anchor="middle" font-size="11.5" font-weight="bold" fill="${c.col}">${esc(c.name)}</text>`;
		// Stylized rock block
		body += `<polygon points="${c.x - 24},134 ${c.x - 16},96 ${c.x + 18},92 ${c.x + 28},132" fill="${c.col}" opacity="0.28" stroke="${c.col}" stroke-width="1.6"/>`;
		body += `<text x="${c.x}" y="168" text-anchor="middle" font-size="9.8" font-weight="bold" fill="#0f172a">${esc(c.note)}</text>`;
	}
	return wrapSciencesSvg(460, 236, body);
}

function svgKarstAndQuarry(): string {
	let body = `<rect x="6" y="6" width="448" height="232" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">الوثيقة 1: تآكل جبل كلسي بالأمطار الحمضية وأثر المقلع العشوائي</text>`;
	// Limestone hill with cave on right & quarry cut on left
	body += `<polygon points="36,204 120,124 120,152 170,152 248,66 368,66 426,204" fill="#fde68a" stroke="#92400e" stroke-width="1.8"/>`;
	// Underground cave (karst) inside right limestone block
	body += `<ellipse cx="322" cy="148" rx="46" ry="26" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.8"/>`;
	body += `<line x1="322" y1="66" x2="322" y2="122" stroke="#0284c7" stroke-width="2" stroke-dasharray="4,3"/>`;
	// Rain above limestone hill
	for (const rx of [286, 314, 344]) {
		body += `<line x1="${rx}" y1="38" x2="${rx - 4}" y2="58" stroke="#2563eb" stroke-width="2"/>`;
	}
	// Quarry cut warning
	body += `<rect x="116" y="136" width="52" height="16" fill="#fca5a5" stroke="#dc2626" stroke-width="1.4"/>`;
	body += haloText(`x="322" y="152" text-anchor="middle" font-size="10.2" font-weight="bold"`, '#0369a1', 'مغارة كلسية (حت كيميائي)');
	body += haloText(`x="322" y="96" text-anchor="middle" font-size="9.8" font-weight="bold"`, '#1d4ed8', 'أمطار حمضية تتسرب');
	body += haloText(`x="140" y="108" text-anchor="middle" font-size="10.2" font-weight="bold"`, '#dc2626', 'مقلع حجارة عشوائي');
	body += haloText(`x="140" y="188" text-anchor="middle" font-size="9.8" font-weight="bold"`, '#991b1b', 'تشويه وتسريع الانجراف');
	return wrapSciencesSvg(460, 244, body);
}

function svgWindErosionAndOasis(): string {
	let body = `<rect x="6" y="6" width="448" height="228" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">الوثيقة 1: الحت الريحي وزحف الكثبان الرملية نحو الواحة</text>`;
	// Mushroom rock on right (wind abrasion)
	body += `<rect x="336" y="116" width="32" height="72" fill="#d97706" stroke="#78350f" stroke-width="1.6"/>`;
	body += `<ellipse cx="352" cy="108" rx="46" ry="22" fill="#f59e0b" stroke="#78350f" stroke-width="1.6"/>`;
	// Sand dune moving left
	body += `<path d="M 154 188 Q 222 108 286 188 Z" fill="#fde047" stroke="#ca8a04" stroke-width="1.8"/>`;
	// Wind arrows RTL
	body += `<defs><marker id="wArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626"/></marker></defs>`;
	body += `<line x1="396" y1="68" x2="180" y2="68" stroke="#dc2626" stroke-width="2.2" marker-end="url(#wArr)"/>`;
	// Oasis palms & windbreak trees on left
	body += `<rect x="30" y="168" width="110" height="20" fill="#86efac" stroke="#15803d" stroke-width="1.5"/>`;
	for (const tx of [54, 88, 122]) {
		body += `<line x1="${tx}" y1="168" x2="${tx}" y2="128" stroke="#78350f" stroke-width="3.5"/>`;
		body += `<ellipse cx="${tx}" cy="124" rx="16" ry="9" fill="#16a34a"/>`;
	}
	body += haloText(`x="286" y="58" text-anchor="middle" font-size="10.2" font-weight="bold"`, '#dc2626', 'رياح محملة بحبات الرمل');
	body += haloText(`x="352" y="206" text-anchor="middle" font-size="9.8" font-weight="bold"`, '#78350f', 'صخرة منحوتة (حت ريحي)');
	body += haloText(`x="220" y="206" text-anchor="middle" font-size="9.8" font-weight="bold"`, '#a16207', 'كثيب رملي (ترسيب)');
	body += haloText(`x="86" y="206" text-anchor="middle" font-size="9.8" font-weight="bold"`, '#15803d', 'واحة + مصدات رياح');
	return wrapSciencesSvg(460, 240, body);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Landscape Components & Outcrops (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const landscapeOutcropsTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3am_t2_landscape_outcrops',
	grade: '3am',
	trimesterId: 't2',
	domain: 'geology_earth',
	titleAr: 'مكونات المنظر الطبيعي وأصل تنوع المناظر في الجزائر',
	curriculumLessonId: 'sci_lesson_3am_t2_landscape_components',
	defaultPoints: 6,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const pairs = [
			{ north: 'منظر جبلي في جرجرة', south: 'منظر صحراوي في العرق الكبير', strata: 'مطوية ومائلة' },
			{ north: 'منظر ساحلي في جيجل', south: 'منظر الهضاب العليا في الجلفة', strata: 'مائلة ومشوهة' }
		];
		const p = rng.pick(pairs);
		const svg = svgKarstAndQuarry();
		const imageUrl = saveSciencesSvgAsset(`sci_3am_t2_land_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'تنوع المناظر يعود إلى طبيعة الصخور وتوضع طبقاتها والعوامل المناخية ونشاط الإنسان',
			[
				{
					text: 'تتشابه جميع المناظر الطبيعية في الجزائر لأن صخورها واحدة كلها',
					diagnosticFeedback: 'تتنوع صخور الجزائر بين غرانيت وبازلت وكلس وغضار ورمل مما ينوّع مناظرها.'
				},
				{
					text: 'لا يُعد نشاط الإنسان ضمن مكونات المنظر الطبيعي',
					diagnosticFeedback: 'نشاط الإنسان (السدود، المزارع، المدن، الطرق) أحد المكونات الخمسة للمنظر الطبيعي.'
				},
				{
					text: 'المكاشف الصخرية هي الجذور العميقة للنباتات فقط',
					diagnosticFeedback: 'المكاشف الصخرية هي الصخور الظاهرة مباشرة على سطح الأرض دون غطاء نباتي.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: `عند المقارنة بين ${p.north} و${p.south} نلاحظ اختلافاً كبيراً في الشكل العام. ما السبب العلمي الدقيق لاختلاف المناظر الطبيعية؟`,
				questionTextAr: 'ما العوامل الرئيسية المسؤولة عن اختلاف المناظر الطبيعية من منطقة لأخرى؟',
				imageUrl,
				imageCaption: 'مكاشف صخرية وتطور المنظر الطبيعي',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'تختلف المناظر الطبيعية بسبب اختلاف **طبيعة الصخور وتوضع طبقاتها (التكتونية)** و**العوامل المناخية** و**الغطاء النباتي ونشاط الإنسان**.'
			},
			sujetExercise: {
				points: 6,
				instruction: `خلال رحلة علمية من الشمال نحو الجنوب، عاين التلاميذ منظرين مختلفين هما: ${p.north} (حيث تظهر مكاشف صخرية ${p.strata}) و${p.south}.`,
				content: [
					{
						type: 'text',
						content: `1) عدّد *المركبات الخمسة الأساسية* التي يتكون منها أي منظر طبيعي.`,
						answer: `1) التضاريس، المكاشف الصخرية، الغطاء النباتي، المجاري/الموارد المائية، ومظاهر نشاط الإنسان.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) عرّف *المكاشف الصخرية*، ثم فسّر سبب ظهور الطبقات الصخرية ${p.strata} في الشمال بينما تظهر أفقية في مناطق أخرى مستقرة.`,
						answer: `2) *المكاشف الصخرية*: هي الصخور الظاهرة مباشرة على سطح الأرض دون تربة أو غطاء نباتي.\n\nتترسب الطبقات الرسوبية أفقياً في الأصل؛ وبقاؤها أفقية يدل على عدم تعرضها لقوى تكتونية، أما ظهورها ${p.strata} فيثبت تعرضها لـ*قوى انضغاط تكتونية* باطنية.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) اذكر الأنماط الأربعة الكبرى للمناظر الطبيعية في الجزائر (من الشمال إلى الجنوب).`,
						answer: `3) المناظر الساحلية، المناظر التلية (الجبلية)، مناظر الهضاب العليا (السهوب)، والمناظر الصحراوية (عرق، رق، حمادة، واحات).`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) بيّن بعبارة موجزة كيف يغيّر نشاط الإنسان شكل المنظر الطبيعي.`,
						answer: `4) يغيره إيجاباً (التشجير، السدود، الزراعة المنظمة) أو سلباً (قطع الغابات، المقالع العشوائية، الزحف العمراني).`,
						mark: '1'
					}
				]
			},
			hints: [
				'احفظ المكونات الخمسة للمنظر الطبيعي: تضاريس، مكاشف، نبات، ماء، وإنسان.',
				'الطبقات المائلة والمطوية ناتجة عن قوى الانضغاط الداخلية.',
				'تتدرج الجزائر من الساحل ← التل ← الهضاب العليا ← الصحراء.'
			],
			solutionStepsAr: [
				'تعداد المركبات الخمسة للمنظر الطبيعي.',
				'تعريف المكشف الصخري وربط الطبقات المائلة والمطوية بقوى الانضغاط.',
				'تصنيف المناظر الجزائرية الأربعة الكبرى.',
				'توضيح الأثر الإيجابي والسلبي لنشاط الإنسان.'
			],
			finalAnswer: 'طبيعة الصخور وتوضعها + المناخ + نشاط الإنسان'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Rock Physicochemical Properties Lab (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const rockPropertiesLabTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3am_t2_rock_properties_lab',
	grade: '3am',
	trimesterId: 't2',
	domain: 'geology_earth',
	titleAr: 'دراسة الخواص الفيزيوكيميائية للصخور مخبرياً (الصلابة، التماسك، النفاذية، HCl)',
	curriculumLessonId: 'sci_lesson_3am_t2_rock_physicochemical_properties',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const hardRock = rng.pick(['الغرانيت', 'البازلت']);
		const svg = svgRockLabTubes({ rock1: 'العينة (أ)', rock2: 'العينة (ب)', rock3: 'العينة (ج)' });
		const imageUrl = saveSciencesSvgAsset(`sci_3am_t2_rocks_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`(أ) الكلس، (ب) الغضار، (ج) ${hardRock}`,
			[
				{
					text: `(أ) ${hardRock}، (ب) الرمل، (ج) الكلس`,
					diagnosticFeedback: `${hardRock} لا يُحدث فوراناً مع حمض كلور الماء، والرمل مفكك ونفاذ لا يشكّل عجينة كتيمة.`
				},
				{
					text: '(أ) الغضار، (ب) الكلس، (ج) الرمل',
					diagnosticFeedback: 'الفوران مع $\\text{HCl}$ يميز **الكلس** حصراً، والصلابة الشديدة تميز الصخر الماغماتي.'
				},
				{
					text: `(أ) الرمل، (ب) ${hardRock}، (ج) الغضار`,
					diagnosticFeedback: 'راجع خواص كل صخرة: الكلس يفور مع الحمض، الغضار كتيم قابل للتفتت، و' + hardRock + ' صلب متماسك.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `أُجريت اختبارات مخبرية على 3 عينات: (أ) أحدثت فوراناً مع $\\text{HCl}$، (ب) قابلة للتفتت وتشكل عجينة غير نفاذة مع الماء، (ج) صخر ماغماتي متماسك وصلب جداً وغير نفاذ. ما أسماء العينات (أ، ب، ج) بالترتيب؟`,
				questionTextAr: 'تعرّف على الصخور الثلاث (أ)، (ب)، (ج) انطلاقاً من نتائج الوثيقة:',
				imageUrl,
				imageCaption: 'نتائج الاختبارات المخبرية للصخور',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الفوران مع $\\text{HCl}$ يحدد **الكلس** (أ)، التفتت وعدم النفاذية وتشكيل العجينة تحدد **الغضار** (ب)، والصلابة الشديدة والأصل الماغماتي يحددان **${hardRock}** (ج).`
			},
			sujetExercise: {
				points: 6,
				instruction: `لفهم أصل اختلاف مقاومة التضاريس للتعرية، أنجز تلاميذ السنة الثالثة متوسط تجارب على أربع عينات صخرية: (أ)، (ب)، (ج)، وعينة رابعة (د) حبيباتها مفككة ونفاذة جداً للماء ولا تفور مع حمض كلور الماء.`,
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) تعرّف على أسماء الصخور الأربعة: (أ)، (ب)، (ج — صخر ماغماتي)، و(د)، مع تعليل اختيارك للصخرتين (أ) و(ب).`,
								answer: `1) - (أ): *الكلس* (لحدوث فوران شديد مع حمض كلور الماء وانطلاق $upright("CO")_2$).\n- (ب): *الغضار* (قابل للتفتت، يشكل عجينة مع الماء وغير نفاذ/كتيم).\n- (ج): *${hardRock}* (صخر ماغماتي صلب جداً ومتماسك وغير نفاذ).\n- (د): *الرمل* (مفكك وشديد النفاذية).`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: التجارب المخبرية على الصخور'
							}
						]
					},
					{
						type: 'table',
						headers: ['الصخرة', 'الأصل الجيولوجي', 'التماسك', 'النفاذية للماء'],
						cells: [],
						rows: [
							['الكلس (أ)', { content: '..........', answer: 'رسوبي', mark: '0.25' }, { content: '..........', answer: 'متماسك', mark: '0.25' }, { content: '..........', answer: 'نفاذ عبر الشقوق', mark: '0.25' }],
							['الغضار (ب)', { content: '..........', answer: 'رسوبي', mark: '0.25' }, { content: '..........', answer: 'قابل للتفتت', mark: '0.25' }, { content: '..........', answer: 'غير نفاذ (كتيم)', mark: '0.25' }],
							[`${hardRock} (ج)`, { content: '..........', answer: 'ماغماتي', mark: '0.25' }, { content: '..........', answer: 'متماسك وصلب جداً', mark: '0.25' }, { content: '..........', answer: 'غير نفاذ', mark: '0.25' }],
							['الرمل (د)', { content: '..........', answer: 'رسوبي', mark: '0.25' }, { content: '..........', answer: 'مفكك', mark: '0.25' }, { content: '..........', answer: 'شديد النفاذية', mark: '0.25' }]
						],
						headerBackground: true,
						borders: 'grid',
						width: 'full'
					},
					{
						type: 'text',
						content: `3) أي الصخرتين (ب) أم (ج) تقاوم العوامل المناخية (الأمطار والسيول) بشكل أفضل؟ علّل.`,
						answer: `3) الصخرة (ج: *${hardRock}*) تقاوم التعرية بشكل أكبر بكثير لأنها صلبة جداً ومتماسكة وغير نفاذة، بينما الغضار (ب) لين وقابل للتفتت والانزلاق عند التشبع بالماء.`,
						mark: '1'
					}
				]
			},
			hints: [
				'الكلس وحده يحدث فوراناً فورياً مع حمض كلور الماء المخفف.',
				'الغضار قابل للتفتت وكتيم، والرمل مفكك وشديد النفاذية.',
				'الغرانيت والبازلت صخور ماغماتية شديدة الصلابة تقاوم التعرية طويلاً.'
			],
			solutionStepsAr: [
				`تحديد الصخور الأربعة: الكلس، الغضار، ${hardRock}، والرمل.`,
				'إكمال جدول الخواص الفيزيوكيميائية بدقة.',
				`تبرير مقاومة ${hardRock} للتعرية بصلابته وتماسكه الشديد.`
			],
			finalAnswer: `الكلس، الغضار، ${hardRock}، الرمل`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Weathering, Erosion, Transport & Deposition (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const weatheringErosionTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3am_t2_weathering_erosion_processes',
	grade: '3am',
	trimesterId: 't2',
	domain: 'geology_earth',
	titleAr: 'آليات تأثير العوامل المناخية: التجوية، الحت، النقل والترسيب',
	curriculumLessonId: 'sci_lesson_3am_t2_climatic_erosion_transport_deposition',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cases = [
			{ climate: 'جبال الأوراس الباردة شتاءً', mech: 'تجمد الماء داخل الشقوق الصخرية وزيادة حجمه', caveSite: 'الكهوف العجيبة بجيجل' },
			{ climate: 'صحراء تمنراست ذات التباين الحراري الشديد', mech: 'التمدد نهاراً والتقلص ليلاً مما يفجر الصخور', caveSite: 'مغارة بني عاد بتلمسان' }
		];
		const sc = rng.pick(cases);
		const svg = svgWindErosionAndOasis();
		const imageUrl = saveSciencesSvgAsset(`sci_3am_t2_erosion_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'تفتيت الصخور (تجوية وحت) ← نقل الفتات بالماء أو الريح ← ترسيب الفتات في الأحواض أو الكثبان',
			[
				{
					text: 'ترسيب الفتات ← نقل الصخر ← تجوية الصخر الأصلي',
					diagnosticFeedback: 'الترسيب هو المرحلة الأخيرة بعد تفكك الصخر ونقله.'
				},
				{
					text: 'تتكون الكهوف الكلسية بفعل الرياح المحملة بالرمال فقط',
					diagnosticFeedback: 'تتكون الكهوف الكلسية بفضل **الحت الكيميائي** لمياه الأمطار الحمضية المحملة بـ $\\text{CO}_2$.'
				},
				{
					text: 'يؤدي انخفاض سرعة تيار الماء في الوادي إلى زيادة قوة الحت',
					diagnosticFeedback: 'انخفاض سرعة الماء أو الريح يؤدي إلى **الترسيب** وليس الحت.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: 'ما التسلسل العلمي الصحيح لمراحل تغير المنظر الطبيعي وتشكل الرسوبيات بفعل العوامل المناخية؟',
				questionTextAr: 'رتّب المراحل الثلاث لديناميكية تطور المنظر الطبيعي الخارجي:',
				imageUrl,
				imageCaption: 'الحت الريحي والنقل والترسيب في الصحراء',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'تتعاقب مراحل الديناميكية الخارجية بالترتيب: **التجوية والحت ← النقل ← الترسيب**.'
			},
			sujetExercise: {
				points: 6,
				instruction: `تؤثر العوامل المناخية باستمرار في نحت التضاريس وتغيير شكل المنظر الطبيعي في مختلف مناطق الجزائر (مثل ${sc.climate}، و${sc.caveSite}، والصحراء المبينة في الوثيقة).`,
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) اشرح آلية تأثير *درجة الحرارة* على تشقق وتفتت الصخور الصلبة في ${sc.climate}.`,
								answer: `1) يؤدي الفارق الحراري إلى *${sc.mech}*، مما يوسّع الشقوق ويفكك الصخور ميكانيكياً إلى قطع أصغر (التجوية الميكانيكية).`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة: فعل الرياح في المنظر الصحراوي'
							}
						]
					},
					{
						type: 'text',
						content: `2) فسّر كيفية تشكل المغارات والتجاويف في الصخور الكلسية في ${sc.caveSite}، وحدّد نوع هذا الحت.`,
						answer: `2) تمتص مياه الأمطار غاز $upright("CO")_2$ الجوي فتصبح *أمطاراً حمضية* تتفاعل كيميائياً مع كربونات الكالسيوم في الصخور الكلسية وتُذيبها تدريجياً مشكّلة كهوفاً ومغارات. إنه *حت كيميائي*.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) بالاعتماد على الوثيقة، اشرح كيف تشكّلت *الصخرة المنحوتة (على شكل فطر)* و*الكثيب الرملي*، مع تسمية المراحل الثلاث لتشكل الرسوبيات بالترتيب.`,
						answer: `3) تحمل الرياح حبات الرمل قرب الأرض فتصطدم بقاعدة الصخرة وتنحتها (*حت ريحي*)، ثم تنقل الرمل (*نقل*) وعندما تضعف سرعتها أو تصادف حاجزاً تترسب الحبيبات مشكّلة *كثيباً رملياً (ترسيب)*.\n\nالترتيب: *التجوية والحت* $arrow.r$ *النقل* $arrow.r$ *الترسيب*.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `4) عند مصب وادٍ جبلي، رتب العناصر التالية حسب تسلسل ترسبها من الأعالي نحو السهل المنخفض: الغضار، الحصى، الرمل.`,
						answer: `4) يترسب *الحصى* أولاً (الأثقل)، يليه *الرمل*، ثم *الغضار* أخيراً (الأخف) عندما تضعف سرعة تيار الماء.`,
						mark: '1'
					}
				]
			},
			hints: [
				'فرّق بين التجوية الميكانيكية (حرارة، جليد، رياح) والحت الكيميائي (أمطار حمضية + كلس).',
				'في الوثيقة، نحت قاعدة الصخرة هو حت ريحي، وتراكم الكثيب هو ترسيب.',
				'تترسب العناصر الأثقل (الحصى) قبل الأخف (الرمل فالغضار).'
			],
			solutionStepsAr: [
				`تفسير التفكك الحراري الميكانيكي في ${sc.climate}.`,
				'شرح الحت الكيميائي للكلس بالأمطار الحمضية المحملة بـ CO₂.',
				'تفسير الصخرة الفطرية والكثيب الرملي وتحديد تسلسل (حت ← نقل ← ترسيب).',
				'ترتيب الترسيب: حصى ← رمل ← غضار.'
			],
			finalAnswer: 'التجوية والحت ← النقل ← الترسيب'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Landscape Evolution Over Geological Time (Tassili) (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const landscapeTimeTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3am_t2_landscape_geological_time',
	grade: '3am',
	trimesterId: 't2',
	domain: 'ecology_environment',
	titleAr: 'تطور المنظر الطبيعي عبر الزمن الجيولوجي (الطاسيلي ناجر وتدخلات الإنسان)',
	curriculumLessonId: 'sci_lesson_3am_t2_landscape_evolution_human_impact',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const animalSet = rng.pick(['الزرافات والأبقار وأفراس النهر', 'التماسيح والأبقار والغزلان والسباحين']);
		const svg = svgWindErosionAndOasis();
		const imageUrl = saveSciencesSvgAsset(`sci_3am_t2_tassili_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'تثبت النقوش الصخرية أن الطاسيلي كانت منطقة رطبة غنية بالمياه والمراعي ثم جفّت بفعل التغير المناخي',
			[
				{
					text: 'تثبت النقوش أن أفراس النهر كانت تعيش فوق الكثبان الرملية الجافة',
					diagnosticFeedback: 'أفراس النهر تحتاج لمياه وأنهار ومناخ رطب ولا تعيش في الصحراء القاحلة.'
				},
				{
					text: 'المناظر الطبيعية ثابتة لا تتغير عبر ملايين السنين',
					diagnosticFeedback: 'المنظر الطبيعي في تطور مستمر بفعل العوامل المناخية والجيولوجية والإنسان.'
				},
				{
					text: 'جميع تدخلات الإنسان في المنظر الطبيعي سلبية دائماً',
					diagnosticFeedback: 'للإنسان تدخلات إيجابية مهمة كالتشجير وبناء السدود وإنجاز المدرجات والمحميات.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: `وُجدت في صحراء الطاسيلي ناجر نقوش صخرية قديمة تُصوّر ${animalSet}. ماذا نستنتج علمياً حول تاريخ هذا المنظر الطبيعي؟`,
				questionTextAr: `ما الاستنتاج الجيولوجي والمناخي من نقوش ${animalSet} في الطاسيلي ناجر؟`,
				imageUrl,
				imageCaption: 'المنظر الصحراوي الحالي للطاسيلي والواحات',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'وجود نقوش لحيوانات السافانا والمياه يثبت أن الطاسيلي عرفت **مناخاً رطباً ومياهاً وفيرة** قبل أن تتصحر تدريجياً.'
			},
			sujetExercise: {
				points: 6,
				instruction: `رغم أن منطقة الطاسيلي ناجر (جنوب شرق الجزائر) صحراوية قاحلة اليوم، فقد كشفت الأبحاث عن رسومات صخرية عمرها آلاف السنين تُصوّر ${animalSet}، إلى جانب مجاري أودية جافة ومستحاثات بحرية أقدم في صخورها.`,
				content: [
					{
						type: 'text',
						content: `1) استنتج صفات المناخ والغطاء النباتي اللذين سادا منطقة الطاسيلي في زمن إنجاز تلك النقوش الصخرية.`,
						answer: `1) كان المناخ *رطباً ومعتدلاً كثير الأمطار*، وساد غطاء نباتي كثيف (مروج وسافانا خضراء) وأنهار وبحيرات سمحت بعيش ${animalSet}.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) فسّر تحول منظر الطاسيلي من منطقة خضراء إلى صحراء جافة ذات صخور منحوتة وكثبان رملية حالياً.`,
						answer: `2) بفعل *التغير المناخي التدريجي نحو الجفاف* وقلة الأمطار عبر آلاف السنين، جفّت الأنهار وتراجع الغطاء النباتي، فسيطرت عوامل *التجوية الحرارية والحت والترسيب الريحي* لتشكل المنظر الصحراوي الحالي.`,
						mark: '1.5'
					},
					{
						type: 'table',
						headers: ['تدخل الإنسان في المنظر الطبيعي', 'التصنيف (إيجابي / سلبي)', 'الأثر البيئي'],
						cells: [],
						rows: [
							['التشجير وإقامة مصدات الرياح', { content: '............', answer: 'تدخل إيجابي', mark: '0.5' }, { content: '................', answer: 'تثبيت التربة ووقف زحف الرمال', mark: '0.5' }],
							['حرق الغابات والمقالع العشوائية', { content: '............', answer: 'تدخل سلبي', mark: '0.5' }, { content: '................', answer: 'تعرية التربة وتسريع الانجراف', mark: '0.5' }],
							['بناء السدود وإنشاء المحميات', { content: '............', answer: 'تدخل إيجابي', mark: '0.5' }, { content: '................', answer: 'حفظ المياه والتنوع البيولوجي', mark: '0.5' }]
						],
						headerBackground: true,
						borders: 'grid',
						width: 'full'
					}
				]
			},
			hints: [
				'اربط حاجات الحيوانات المرسومة (أبقار، أفراس نهر) بوفرة المياه والمراعي.',
				'التغير المناخي نحو الجفاف سمح للرياح والحرارة بتشكيل المنظر الصحراوي.',
				'صنّف تدخلات الإنسان حسب أثرها في حماية أو تدهور التربة والغطاء النباتي.'
			],
			solutionStepsAr: [
				'استنتاج مناخ رطب ومراعٍ ومياه وفيرة قديماً.',
				'تفسير التصحر بالتغير المناخي نحو الجفاف وسيطرة الحت الحراري والريحي.',
				'تصنيف التدخلات الإيجابية والسلبية للإنسان في الجدول.'
			],
			finalAnswer: 'تحول الطاسيلي من مناخ رطب إلى صحراوي جاف عبر الزمن الجيولوجي'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Integration Situation 1 (8 pts): Karst Limestone Degradation & Illegal Quarry
// ═══════════════════════════════════════════════════════════════════════════════
const integrationKarstQuarryTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3am_t2_integration_karst_erosion_quarry',
	grade: '3am',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: تدهور منظر جبلي كلسي وتشكل الكهوف وأثر المقالع العشوائية',
	curriculumLessonId: 'sci_lesson_3am_t2_climatic_erosion_transport_deposition',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const region = rng.pick(['منطقة جبلية بولاية تلمسان', 'منطقة جبلية بولاية جيجل', 'منطقة جبلية بولاية بجاية']);
		const svgKarst = svgKarstAndQuarry();
		const imgKarst = saveSciencesSvgAsset(`sci_3am_t2_int1_karst_${difficulty}_s${seed}`, svgKarst);

		const mcq = buildUniqueMcqOptions(
			'الصخرة (أ) هي الكلس (تفور مع HCl وتذوب بالأمطار الحمضية فتشكل المغارات)، والمقلع العشوائي يسرّع تدهور المنظر',
			[
				{
					text: 'الصخرة (أ) هي الغرانيت الذي يذوب بسهولة في الأمطار الحمضية',
					diagnosticFeedback: 'الغرانيت صخر ماغماتي شديد الصلابة لا يفور مع الحمض ولا يذوب بالأمطار الحمضية.'
				},
				{
					text: 'المقالع العشوائية وقطع الأشجار يحميان الجبل من الانجراف',
					diagnosticFeedback: 'المقالع العشوائية وقطع الأشجار تدخلات سلبية تشوّه الجبل وتُسرّع الانجراف المائي.'
				},
				{
					text: 'الصخرة (ب) الكتيمة القابلة للتفتت هي الرمل المفكك',
					diagnosticFeedback: 'الرمل شديد النفاذية؛ أما الصخر القابل للتفتت والكتيم فهو **الغضار**.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: 'integration',
			titleAr: this.titleAr,
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: `في ${region}، تتشكل مغارات داخل صخر (أ) يفور مع $\\text{HCl}$، بينما تنجرف طبقة (ب) كتيمة قابلة للتفتت، وتدهور المنظر بسبب فتح مقلع عشوائي. ما التشخيص الصحيح؟`,
				questionTextAr: 'تعرّف على طبيعة الصخرة (أ) وسبب تشكل المغارات وتأثير المقلع:',
				imageUrl: imgKarst,
				imageCaption: 'الوثيقة 1: الجبل الكلسي والمغارة والمقلع العشوائي',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'الفوران مع $\\text{HCl}$ يثبت أن الصخرة (أ) هي **الكلس** الذي يتآكل بالحت الكيميائي للأمطار الحمضية، والمقلع العشوائي تدخل بشري سلبي.'
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `*السياق*: تشتهر ${region} بمناظر طبيعية خلابة ومغارات جوفية رائعة تستقطب السياح، لكن في السنوات الأخيرة لاحظ السكان تشوهاً خطيراً في سفح الجبل وانجرافاً للأتربة والوحل نحو السد المجاور بعد قطع الأشجار وفتح مقلع عشوائي لاستخراج الحجارة. لدراسة هذه الظواهر وحماية المنظر الطبيعي، أُجريت التحاليل الموضحة في الوثيقتين الآتيتين:`,
				content: [
					{
						type: 'columns',
						widths: ['1.15fr', '1.1fr'],
						children: [
							{
								type: 'table',
								headers: ['العينة (الوثيقة 2)', 'التماسك', 'النفاذية', 'التفاعل مع HCl'],
								cells: [],
								rows: [
									['صخرة القمة (أ)', 'متماسكة', 'نفاذة عبر الشقوق', 'فوران شديد (+ CO₂)'],
									['صخرة السفح (ب)', 'قابلة للتفتت', 'غير نفاذة (كتيمة)', 'لا يحدث فوران']
								],
								headerBackground: true,
								borders: 'grid',
								width: 'full'
							},
							{
								type: 'image',
								src: imgKarst,
								caption: 'الوثيقة 1: مقطع الجبل والمقلع'
							}
						]
					},
					{
						type: 'text',
						content: `*التعليمات*: بالاعتماد على السياق والوثيقتين (1 و 2) ومكتسباتك القبلية:\n\n1) تعرّف على اسم كل من صخرة القمة (أ) وصخرة السفح (ب) مع التعليل من الوثيقة (2).`,
						answer: `1) *بالاعتماد على الوثيقة (2)*:\n- صخرة القمة (أ) هي *الكلس*، لأنها متماسكة ونفاذة عبر الشقوق وتُحدث فوراناً شديداً مع حمض كلور الماء $upright("HCl")$ مع انطلاق $upright("CO")_2$.\n- صخرة السفح (ب) هي *الغضار*، لأنها قابلة للتفتت، كتيمة (غير نفاذة) للماء ولا تفور مع الحمض.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `2) فسّر علمياً كيف تشكلت *المغارة الجوفية* داخل صخرة القمة (أ)، وفسّر سبب تسارع انجراف السفح وامتلاء السد بالأوحال.`,
						answer: `2) *بالاعتماد على الوثيقتين (1 و 2)*:\n- *تشكل المغارة*: تتسرب مياه الأمطار المحملة بغاز $upright("CO")_2$ (أمطار حمضية) عبر شقوق الكلس فتذيبه كيميائياً (*حت كيميائي*) مكونة تجاويف ومغارات.\n- *انجراف السفح وتوحّل السد*: قطع الأشجار وفتح المقلع العشوائي عرّى الطبقة *الغضارية اللينة (ب)* من الجذور المثبتة، فجرفتها السيول (*حت ميكانيكي ونقل*) وترسبت كأوحال في حوض السد (*ترسيب*).`,
						mark: '3'
					},
					{
						type: 'text',
						content: `3) اقترح *ثلاثة إجراءات عملية* لإعادة تأهيل هذا المنظر الطبيعي وحماية السد من التوحل.`,
						answer: `3) - *غلق المقلع العشوائي* وتنظيم استغلال المقالع بعيداً عن المناطق الغابية والسياحية.\n- *تشجير السفوح* وإعادة الغطاء النباتي لتثبيت التربة والغضار بالجذور.\n- *إنجاز مدرجات وحواجز حجرية* على المنحدرات لتقليل سرعة جريان السيول ومنع وصول الأوحال إلى السد، وتصنيف المغارة *محمية طبيعية*.`,
						mark: '2.5'
					}
				]
			},
			hints: [
				'استخرج خاصية الفوران مع HCl لتحديد الكلس، والكتامة والتفتت لتحديد الغضار.',
				'فرّق في التفسير بين الحت الكيميائي (المغارة الكلسية) والحت الميكانيكي (انجراف الغضار بسبب قطع الأشجار والمقلع).',
				'قدّم 3 حلول متكاملة: قانونية/عمرانية (المقلع) وبيئية (التشجير والمدرجات).'
			],
			solutionStepsAr: [
				'تحديد الصخرة (أ) كلساً والصخرة (ب) غضاراً من الوثيقة (2).',
				'تفسير المغارة بالحت الكيميائي وتوحّل السد بقطع الأشجار والمقلع على الغضار.',
				'اقتراح غلق المقلع، التشجير، المدرجات وحماية المغارة.'
			],
			finalAnswer: 'الكلس (حت كيميائي) + الغضار (انجراف) + التشجير والمدرجات'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Integration Situation 2 (8 pts): Tassili History & Oasis Protection from Dunes
// ═══════════════════════════════════════════════════════════════════════════════
const integrationTassiliOasisTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3am_t2_integration_tassili_desertification',
	grade: '3am',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: تاريخ منظر الطاسيلي ناجر وحماية الواحات من زحف الكثبان الرملية',
	curriculumLessonId: 'sci_lesson_3am_t2_landscape_evolution_human_impact',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const oasis = rng.pick(['واحة جانت', 'واحة تاغيت', 'واحة تيميمون']);
		const duneAdvanceM = rng.pick([8, 12, 15]);
		const svgOasis = svgWindErosionAndOasis();
		const imgOasis = saveSciencesSvgAsset(`sci_3am_t2_int2_oasis_${difficulty}_s${seed}`, svgOasis);

		const mcq = buildUniqueMcqOptions(
			'يتعرض الرمل للنقل والترسيب الريحي نحو الواحة، والحل هو تثبيت الكثبان بالتشجير وإقامة مصدات الرياح',
			[
				{
					text: 'الكثبان الرملية صخور متماسكة لا تتحرك أبداً',
					diagnosticFeedback: 'الرمل صخر **مفكك** تنقله الرياح بسهولة فتشكل كثباناً زاحفة تهدد الواحات.'
				},
				{
					text: 'كانت الصحراء الجزائرية جافة تماماً ولم تشهد يوماً مناخاً رطباً',
					diagnosticFeedback: 'نقوش الطاسيلي للأبقار وأفراس النهر والأودية الجافة تثبت أن الصحراء كانت رطبة وخضراء.'
				},
				{
					text: 'يُوقف زحف الرمال بقطع أشجار النخيل حول الواحة',
					diagnosticFeedback: 'قطع الأشجار يسرّع زحف الرمال؛ بل يجب تكثيف الأحزمة الخضراء ومصدات الرياح.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: 'integration',
			titleAr: this.titleAr,
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: `تتقدم الكثبان الرملية نحو ${oasis} بمعدل $${duneAdvanceM}\\text{ m}$ سنوياً بسبب الرياح القوية. ما التفسير الجيولوجي والحل المستدام لحماية الواحة؟`,
				questionTextAr: `كيف نفسر زحف الرمال نحو ${oasis} وكيف نحميها؟`,
				imageUrl: imgOasis,
				imageCaption: 'الوثيقة 1: الحت والترسيب الريحي نحو الواحة',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'الرمل صخر مفكك تنقله الرياح وتُرسّبه على شكل كثبان متحركة؛ وتُحمى الواحة بـ**تثبيت الكثبان بالتشجير ومصدات الرياح**.'
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `*السياق*: خلال زيارة إلى ${oasis} ومنطقة الطاسيلي ناجر، لاحظ مهندسو البيئة أن الكثبان الرملية تزحف نحو بساتين النخيل بمعدل $${duneAdvanceM} " m"$ في السنة، بينما تشهد الصخور القريبة تآكلاً عند قاعدتها. كما وقفوا أمام رسومات صخرية قديمة توثق ماضي المنطقة. إليك الوثيقتين الآتيتين:`,
				content: [
					{
						type: 'columns',
						widths: ['1.15fr', '1.1fr'],
						children: [
							{
								type: 'table',
								headers: ['العنصر (الوثيقة 2)', 'الطاسيلي منذ 8000 سنة', 'الطاسيلي حالياً'],
								cells: [],
								rows: [
									['المناخ والتساقط', 'رطب ومعتدل، أمطار غزيرة', 'صحراوي جاف، تباين حراري كبير'],
									['المياه والنبات', 'أنهار، بحيرات، مروج كثيفة', 'أودية جافة، واحات متفرقة'],
									['الكائنات والنشاط', 'زرافات، أبقار، أفراس نهر', 'جمال، نباتات شوكية، كثبان زاحفة']
								],
								headerBackground: true,
								borders: 'grid',
								width: 'full'
							},
							{
								type: 'image',
								src: imgOasis,
								caption: 'الوثيقة 1: الحت والترسيب الريحي'
							}
						]
					},
					{
						type: 'text',
						content: `*التعليمات*: بالاعتماد على السياق والوثيقتين (1 و 2) ومكتسباتك القبلية:\n\n1) قارن بين منظر الطاسيلي قديماً وحالياً، واستنتج العامل الرئيسي الذي غيّر هذا المنظر الطبيعي عبر الزمن الجيولوجي.`,
						answer: `1) *بالاعتماد على الوثيقة (2)*: كانت الطاسيلي قبل 8000 سنة منطقة رطبة غنية بالأنهار والمروج وحيوانات السافانا (زرافات وأبقار وأفراس نهر)، بينما أصبحت حالياً صحراء جافة تكسوها الكثبان الرملية والنباتات الشوكية.\n\n*العامل الرئيسي*: *التغير المناخي التدريجي نحو الجفاف* الذي قضى على المروج وأفسح المجال لفعل الحرارة والرياح.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `2) فسّر تشكل الصخور المنحوتة (على شكل فطر) وسبب زحف الكثبان الرملية نحو ${oasis} ($${duneAdvanceM} " m"$ سنوياً) بالاعتماد على خاصية تماسك الرمل.`,
						answer: `2) *بالاعتماد على الوثيقة (1) ومكتسباتي*: *الرمل صخر رسوبي مفكك* الحبيبات، فتلتقطه الرياح القوية وتحمله قريباً من سطح الأرض (*نقل*) فتصطدم حبيباته بقاعدة الصخور وتنحتها أكثر من قمتها (*حت ريحي* يعطي شكل فطر). وعندما تصادف الرياح عائقاً أو تضعف سرعتها تترسب الرمال (*ترسيب*) مكونة كثباناً متحركة تزحف باستمرار نحو ${oasis}.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `3) اقترح *خطة وقائية من ثلاث خطوات* لحماية ${oasis} من زحف الرمال والحفاظ على التراث الطبيعي للطاسيلي.`,
						answer: `3) - *تثبيت الكثبان الرملية ميكانيكياً* بإقامة مصدات الرياح (جريد النخيل وشباك حاجزة) عمودياً على اتجاه الرياح السائدة.\n- *التشجير الحيوي* بغرس أحزمة من الأشجار والنباتات المقاومة للجفاف (كالأثل والسنط) حول الواحة لتثبيت الرمال بالجذور.\n- *الحماية البيئية والتوعية*: حماية الحظيرة الوطنية للطاسيلي ومنع الرعي الجائر وقطع الأشجار الصحراوية، واعتماد السقي بالتقطير في الواحة.`,
						mark: '2.5'
					}
				]
			},
			hints: [
				'استغل الجدول (الوثيقة 2) لإبراز الانتقال من المناخ الرطب إلى الصحراوي الجاف.',
				'اربط خاصية تفكك الرمل بمراحل الحت الريحي والنقل والترسيب في الوثيقة (1).',
				'قدّم حلولاً مزدوجة: مصدات رياح ميكانيكية + تثبيت حيوي بالأشجار الصحراوية.'
			],
			solutionStepsAr: [
				'مقارنة الطاسيلي قديماً وحديثاً واستنتاج التغير المناخي نحو الجفاف.',
				'تفسير الصخرة الفطرية وزحف الكثبان بكون الرمل مفككاً ينقل ويحتّ بالرياح.',
				'اقتراح مصدات الرياح، الأحزمة الشجرية المقاومة للجفاف، وحماية الواحة.'
			],
			finalAnswer: 'التغير المناخي + الحت والترسيب الريحي للرمل المفكك + مصدات الرياح والتشجير'
		};
	}
};

export const SCIENCES_TEMPLATES_3AM_T2: SciencesParameterizedTemplate[] = [
	landscapeOutcropsTemplate,
	rockPropertiesLabTemplate,
	weatheringErosionTemplate,
	landscapeTimeTemplate,
	integrationKarstQuarryTemplate,
	integrationTassiliOasisTemplate
];
