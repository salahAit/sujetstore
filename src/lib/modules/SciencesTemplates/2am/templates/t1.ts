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
	svgPlantAndPrimaryDiagram,
	wrapSciencesSvg
} from '../../svg-sciences';

// ═══════════════════════════════════════════════════════════════════════════════
// Custom 2AM T1 SVG Builders (Pure Arabic / Separate Badges, Zero paint-order)
// ═══════════════════════════════════════════════════════════════════════════════

function buildHabitatElementsSvg(habitatName: string, biotics: string[], abiotics: string[]): string {
	return wrapSciencesSvg(
		460,
		225,
		`<rect x="6" y="6" width="448" height="213" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${esc(`عناصر ملاحَظة في ${habitatName}`)}</text>` +
			`<rect x="242" y="42" width="198" height="164" rx="9" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.7"/>` +
			`<text x="341" y="64" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#166534">مجموعة العناصر (أ)</text>` +
			biotics
				.map(
					(b, i) =>
						`<rect x="260" y="${78 + i * 38}" width="162" height="28" rx="5" fill="#dcfce7"/>` +
						`<text x="341" y="${96 + i * 38}" text-anchor="middle" font-size="10.6" font-weight="bold" fill="#14532d">${esc(b)}</text>`
				)
				.join('') +
			`<rect x="20" y="42" width="198" height="164" rx="9" fill="#eff6ff" stroke="#2563eb" stroke-width="1.7"/>` +
			`<text x="119" y="64" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e40af">مجموعة العناصر (ب)</text>` +
			abiotics
				.map(
					(a, i) =>
						`<rect x="38" y="${78 + i * 38}" width="162" height="28" rx="5" fill="#dbeafe"/>` +
						`<text x="119" y="${96 + i * 38}" text-anchor="middle" font-size="10.6" font-weight="bold" fill="#1e3a8a">${esc(a)}</text>`
				)
				.join('')
	);
}

function buildDynamicBiomassPyramidSvg(opts: {
	producer: string;
	c1: string;
	c2: string;
	c3: string;
	m0: number;
	m1: number;
	m2: number;
	m3: number;
	hideTop?: boolean;
}): string {
	return wrapSciencesSvg(
		460,
		245,
		`<rect x="6" y="6" width="448" height="233" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">هرم الكتلة الحية المتنقلة عبر مستويات السلسلة الغذائية</text>` +
			`<rect x="170" y="44" width="120" height="36" rx="5" fill="#fee2e2" stroke="#dc2626" stroke-width="1.8"/>` +
			`<text x="230" y="66" text-anchor="middle" font-size="10.4" font-weight="bold" fill="#991b1b">${esc(`${opts.c3}: ${opts.hideTop ? '؟ كغ' : `${opts.m3} كغ`}`)}</text>` +
			`<rect x="130" y="88" width="200" height="36" rx="5" fill="#fed7aa" stroke="#ea580c" stroke-width="1.8"/>` +
			`<text x="230" y="110" text-anchor="middle" font-size="10.4" font-weight="bold" fill="#9a3412">${esc(`${opts.c2}: ${opts.hideTop ? '؟ كغ' : `${opts.m2} كغ`}`)}</text>` +
			`<rect x="90" y="132" width="280" height="36" rx="5" fill="#dbeafe" stroke="#2563eb" stroke-width="1.8"/>` +
			`<text x="230" y="154" text-anchor="middle" font-size="10.4" font-weight="bold" fill="#1e40af">${esc(`${opts.c1}: ${opts.hideTop ? '؟ كغ' : `${opts.m1} كغ`}`)}</text>` +
			`<rect x="48" y="176" width="364" height="38" rx="5" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>` +
			`<text x="230" y="199" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534">${esc(`${opts.producer} (منتج): ${opts.m0} كغ`)}</text>` +
			haloText(`x="418" y="128" text-anchor="middle" font-size="9.6" font-weight="bold"`, '#dc2626', 'ضياع 90%') +
			haloText(`x="42" y="128" text-anchor="middle" font-size="9.6" font-weight="bold"`, '#15803d', 'انتقال 10%') +
			`<text x="230" y="230" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#334155">لإنتاج 1 كغ من الكتلة الحية يلزم استهلاك 10 كغ من الغذاء</text>`
	);
}

function buildNutrientCycleSvg(): string {
	return wrapSciencesSvg(
		460,
		235,
		`<rect x="6" y="6" width="448" height="223" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">دور الكائنات المحللة في دورة المادة داخل النظام البيئي</text>` +
			`<rect x="164" y="44" width="132" height="40" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.8"/>` +
			`<text x="230" y="68" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#166534">المنتج الأولي (نبات أخضر)</text>` +
			`<rect x="30" y="106" width="136" height="44" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/>` +
			`<text x="98" y="132" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">المستهلكون (حيوانات)</text>` +
			`<rect x="150" y="172" width="160" height="44" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>` +
			`<text x="230" y="191" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#92400e">الكائنات المحللة في التربة</text>` +
			`<text x="230" y="207" text-anchor="middle" font-size="9.5" fill="#78350f">(بكتيريا، فطريات، ديدان)</text>` +
			`<rect x="294" y="106" width="136" height="44" rx="8" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.8"/>` +
			`<text x="362" y="125" text-anchor="middle" font-size="10.6" font-weight="bold" fill="#5b21b6">أملاح معدنية ودبال</text>` +
			`<text x="362" y="141" text-anchor="middle" font-size="9.4" fill="#4c1d95">(تغني التربة من جديد)</text>` +
			// Arrows
			`<path d="M 164 64 Q 98 68 98 104" fill="none" stroke="#334155" stroke-width="2"/>` +
			`<path d="M 98 150 Q 108 192 148 194" fill="none" stroke="#334155" stroke-width="2"/>` +
			`<path d="M 310 194 Q 362 192 362 152" fill="none" stroke="#334155" stroke-width="2"/>` +
			`<path d="M 362 104 Q 362 68 298 64" fill="none" stroke="#16a34a" stroke-width="2"/>` +
			haloText(`x="104" y="182" text-anchor="middle" font-size="9.2" font-weight="bold"`, '#78350f', 'بقايا ميتة') +
			haloText(`x="362" y="78" text-anchor="middle" font-size="9.2" font-weight="bold"`, '#15803d', 'امتصاص جذري')
	);
}

function buildFoodWebIntegrationSvg(predator: string, prey: string, crop: string): string {
	return wrapSciencesSvg(
		460,
		225,
		`<rect x="6" y="6" width="448" height="213" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">السند 1: مخطط الشبكة الغذائية في المنطقة الفلاحية</text>` +
			`<rect x="336" y="94" width="102" height="52" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>` +
			`<text x="387" y="117" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534">${esc(crop)}</text>` +
			`<text x="387" y="135" text-anchor="middle" font-size="9.4" fill="#14532d">(منتج أولي)</text>` +
			`<rect x="180" y="54" width="104" height="46" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="1.8"/>` +
			`<text x="232" y="75" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#1e40af">${esc(prey)}</text>` +
			`<text x="232" y="92" text-anchor="middle" font-size="9.2" fill="#1e3a8a">(مستهلك 1)</text>` +
			`<rect x="180" y="140" width="104" height="46" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>` +
			`<text x="232" y="161" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#92400e">حشرة المنّ</text>` +
			`<text x="232" y="178" text-anchor="middle" font-size="9.2" fill="#78350f">(مستهلك 1)</text>` +
			`<rect x="22" y="54" width="106" height="46" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="1.8"/>` +
			`<text x="75" y="75" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#991b1b">${esc(predator)}</text>` +
			`<text x="75" y="92" text-anchor="middle" font-size="9.2" fill="#7f1d1d">(مستهلك 2 — صُيد)</text>` +
			`<rect x="22" y="140" width="106" height="46" rx="8" fill="#f0fdf4" stroke="#15803d" stroke-width="1.8"/>` +
			`<text x="75" y="161" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#15803d">الدعسوقة</text>` +
			`<text x="75" y="178" text-anchor="middle" font-size="9.2" fill="#14532d">(مفترس طبيعي)</text>` +
			// Arrows RTL (eaten by)
			`<line x1="336" y1="108" x2="288" y2="82" stroke="#334155" stroke-width="2"/>` +
			`<line x1="336" y1="132" x2="288" y2="158" stroke="#334155" stroke-width="2"/>` +
			`<line x1="180" y1="77" x2="132" y2="77" stroke="#dc2626" stroke-width="2"/>` +
			`<line x1="180" y1="163" x2="132" y2="163" stroke="#15803d" stroke-width="2"/>` +
			`<text x="230" y="206" text-anchor="middle" font-size="10" font-weight="bold" fill="#475569">السهم المتجه يساراً يعني: "يُؤكل من طرف"</text>`
	);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Template 1: Biotic & Abiotic Elements (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const bioticAbioticTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2am_t1_biotic_abiotic_elements',
	grade: '2am',
	trimesterId: 't1',
	domain: 'ecology_environment',
	titleAr: 'عناصر الوسط الحي: الوحدة الحياتية والمدى الحيوي الجغرافي',
	curriculumLessonId: 'sci_lesson_2am_t1_living_environment_elements',
	defaultPoints: 6,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const habitats = [
			{
				name: 'غابة الشريعة (وسط غابي)',
				type: 'وسط غابي (بري)',
				biotics: ['أشجار الأرز والبلوط', 'قردة المكاك والطيور', 'فطريات وبكتيريا التربة'],
				abiotics: ['تربة دبالية وصخور', 'ماء الأمطار والهواء', 'الحرارة والإضاءة']
			},
			{
				name: 'بحيرة طونغا (وسط مائي)',
				type: 'وسط مائي',
				biotics: ['أسماك وطيور مائية', 'نباتات مائية وطحالب', 'كائنات مجهرية مائية'],
				abiotics: ['ماء البحيرة العذب', 'رمل وطين القاع', 'ضوء الشمس والهواء']
			},
			{
				name: 'واحة في صحراء الهقار (وسط صحراوي)',
				type: 'وسط صحراوي (بري)',
				biotics: ['نخيل ونبات الصبار', 'الجمل والفنك والعقرب', 'كائنات دقيقة في التربة'],
				abiotics: ['رمال وصخور صحراوية', 'حرارة مرتفعة وضوء قوي', 'ماء الواحة الجوفي']
			}
		];
		const h = rng.pick(habitats);

		const svg = buildHabitatElementsSvg(h.name, h.biotics, h.abiotics);
		const imageUrl = saveSciencesSvgAsset(`sci_2am_t1_habitat_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`المجموعة (أ) تمثل الوحدة الحياتية، والمجموعة (ب) تمثل المدى الحيوي الجغرافي`,
			[
				{
					text: 'المجموعة (أ) تمثل المدى الحيوي الجغرافي، والمجموعة (ب) تمثل الوحدة الحياتية',
					diagnosticFeedback: 'انتبه: الكائنات الحية تشكل الوحدة الحياتية، والعناصر اللاحية (ماء، تربة، صخور) تشكل المدى الحيوي الجغرافي.'
				},
				{
					text: 'كلتا المجموعتين تمثلان عناصر لاحية فقط',
					diagnosticFeedback: 'الأشجار والحيوانات والكائنات الدقيقة تقوم بالوظائف الحيوية فهي عناصر حية!'
				},
				{
					text: 'الماء والتربة عنصران حيان لأنهما ضروريان للحياة',
					diagnosticFeedback: 'الماء والتربة ضروريان للحياة لكنهما لا يتغذيان ولا يتكاثران، فهما عناصر لاحية!'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `في خرجة علمية إلى **${h.name}**، صنّف التلاميذ العناصر الملاحَظة في مجموعتين (أ) و (ب) كما في الوثيقة المقابلة. ما التسمية العلمية الصحيحة لكل مجموعة؟`,
			questionTextAr: `سمّ المجموعتين (أ) و (ب) في الوسط الحي الموضح في الوثيقة.`,
			imageUrl,
			imageCaption: `تصنيف عناصر ${h.name}`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `العناصر الحية تشكل **الوحدة الحياتية** (المجموعة أ)، والعناصر اللاحية الفيزيوكيميائية تشكل **المدى الحيوي الجغرافي** (المجموعة ب).`
		};

		const hints: [string, string, string] = [
			'الوسط الحي = الوحدة الحياتية (عناصر حية) + المدى الحيوي الجغرافي (عناصر لاحية).',
			'العناصر الحية تقوم بالتغذية والتنفس والنمو والتكاثر.',
			'الماء والتربة والضوء والحرارة عناصر لاحية.'
		];
		const solutionStepsAr = [
			`المجموعة (أ): كائنات حية (${h.biotics.join('، ')}) $\\leftarrow$ **الوحدة الحياتية**.`,
			`المجموعة (ب): عناصر لاحية (${h.abiotics.join('، ')}) $\\leftarrow$ **المدى الحيوي الجغرافي**.`,
			`نوع الوسط الحي: **${h.type}**.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `خلال خرجة ميدانية إلى *${h.name}*، أحصى التلاميذ مجموعة من العناصر المصنفة في الوثيقة المقابلة:`,
			content: [
				{
					type: 'columns',
					widths: ['1.15fr', '1.35fr'],
					children: [
						{
							type: 'text',
							content: `1) حدد نوع الوسط الحي المدروس، ثم سمِّ علمياً كلاً من المجموعة (أ) والمجموعة (ب).`,
							answer: `1) نوع الوسط الحي: *${h.type}*. المجموعة (أ) تمثل *الوحدة الحياتية (عناصر حية)*، والمجموعة (ب) تمثل *المدى الحيوي الجغرافي (عناصر لاحية)*.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: `عناصر ${h.name}`
						}
					]
				},
				{
					type: 'text',
					content: `2) اذكر أربع خصائص حيوية تميّز عناصر المجموعة (أ) عن عناصر المجموعة (ب).`,
					answer: `2) تتميز الكائنات الحية بقيامها بالوظائف الحيوية: *التغذية، التنفس، النمو، والتكاثر* (إضافة إلى الموت).`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) اكتب المعادلة البنائية لمفهوم *الوسط الحي*، وأعط مثالين آخرين لأنواع الأوساط الحية في الجزائر.`,
					answer: `3) *الوسط الحي = الوحدة الحياتية + المدى الحيوي الجغرافي*. أمثلة أخرى: وسط غابي، وسط مائي، وسط صحراوي، وسط سهبي (يُقبل أي مثالين مغايرين).`,
					mark: '2'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: 'المجموعة أ: الوحدة الحياتية — المجموعة ب: المدى الحيوي الجغرافي'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 2: Ecological Relationships & Bee Society (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const ecologicalRelationshipsTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2am_t1_ecological_relationships',
	grade: '2am',
	trimesterId: 't1',
	domain: 'ecology_environment',
	titleAr: 'العلاقات القائمة بين الكائنات الحية وتنظيم مجتمع النحل',
	curriculumLessonId: 'sci_lesson_2am_t1_relationships_between_organisms',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const pairs = [
			{
				desc: 'نبات الجعفيل عديم اليخضور يمتص النسغ الجاهز من جذور الفول ويُضعفه',
				rel: 'علاقة تطفل (بينوعية)',
				kind: 'تطفل',
				scope: 'بينوعية'
			},
			{
				desc: 'الفطر يزود الطحلب بالماء والأملاح والطحلب يزود الفطر بالمواد العضوية (الأشنات)',
				rel: 'علاقة تعايش (بينوعية)',
				kind: 'تعايش',
				scope: 'بينوعية'
			},
			{
				desc: 'تشكّل ثيران المسك دائرة لحماية صغارها من هجوم الذئاب',
				rel: 'علاقة حماية ودفاع (ضمنوعية)',
				kind: 'حماية ودفاع',
				scope: 'ضمنوعية'
			},
			{
				desc: 'تعاون الملكة والذكور والعاملات داخل خلية النحل وتقاسم المهام',
				rel: 'علاقة تعاون اجتماعي (ضمنوعية)',
				kind: 'تعاون',
				scope: 'ضمنوعية'
			}
		];
		const chosen = rng.pick(pairs);
		const others = pairs.filter((p) => p.kind !== chosen.kind);

		const svg = wrapSciencesSvg(
			460,
			225,
			`<rect x="6" y="6" width="448" height="213" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
				`<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">أمثلة للعلاقات الحيوية وتنظيم مجتمع النحل</text>` +
				`<rect x="24" y="44" width="412" height="58" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.6"/>` +
				`<text x="230" y="66" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">المثال المدروس:</text>` +
				`<text x="230" y="88" text-anchor="middle" font-size="10.4" font-weight="bold" fill="#0f172a">${esc(chosen.desc)}</text>` +
				// Bee society mini-strip below
				`<rect x="304" y="118" width="132" height="86" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="1.5"/>` +
				`<text x="370" y="142" text-anchor="middle" font-size="11" font-weight="bold" fill="#991b1b">ملكة النحل</text>` +
				`<text x="370" y="166" text-anchor="middle" font-size="9.6" fill="#334155">واحدة خصبة</text>` +
				`<text x="370" y="186" text-anchor="middle" font-size="9.6" font-weight="bold" fill="#7f1d1d">وضع البيض</text>` +
				`<rect x="164" y="118" width="132" height="86" rx="8" fill="#fffbeb" stroke="#d97706" stroke-width="1.5"/>` +
				`<text x="230" y="142" text-anchor="middle" font-size="11" font-weight="bold" fill="#b45309">العاملات</text>` +
				`<text x="230" y="166" text-anchor="middle" font-size="9.6" fill="#334155">إناث عقيمة</text>` +
				`<text x="230" y="186" text-anchor="middle" font-size="9.6" font-weight="bold" fill="#78350f">جمع الرحيق والحراسة</text>` +
				`<rect x="24" y="118" width="132" height="86" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>` +
				`<text x="90" y="142" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">الذكور</text>` +
				`<text x="90" y="166" text-anchor="middle" font-size="9.6" fill="#334155">بضع مئات</text>` +
				`<text x="90" y="186" text-anchor="middle" font-size="9.6" font-weight="bold" fill="#1e3a8a">تلقيح الملكة</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_2am_t1_rel_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			chosen.rel,
			others.slice(0, 3).map((o) => ({
				text: o.rel,
				diagnosticFeedback: `انتبه: ${o.rel} تنطبق على مثال مثل (${o.desc}) وليس المثال المذكور في السؤال.`
			})),
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `ادرس العلاقة التالية في الوسط الحي: **«${chosen.desc}»**. ما نوع هذه العلاقة؟`,
			questionTextAr: `حدّد نوع العلاقة: ${chosen.desc}.`,
			imageUrl,
			imageCaption: 'بطاقة العلاقات الحيوية ومجتمع النحل',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `هذه العلاقة هي **${chosen.rel}** لأنها تتميز بـ ${chosen.kind}.`
		};

		const hints: [string, string, string] = [
			'تحقق أولاً هل الكائنان من نفس النوع (ضمنوعية) أم من نوعين مختلفين (بينوعية).',
			'التعايش = استفادة متبادلة، التطفل = استفادة طرف وتضرر الآخر.',
			'في مجتمع النحل: الملكة للبيض، الذكور للتلقيح، العاملات للعمل والحراسة.'
		];
		const solutionStepsAr = [
			`تحليل العلاقة: ${chosen.desc}.`,
			`تصنيفها: **${chosen.rel}**.`,
			`أهم علاقة تنظم استقرار الوسط الحي هي **العلاقة الغذائية**.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `تربط الكائنات الحية في أوساط عيشها علاقات متنوعة تضمن بقاءها واستقرار الوسط، كما يظهر في الوثيقة المقابلة:`,
			content: [
				{
					type: 'columns',
					widths: ['1.15fr', '1.35fr'],
					children: [
						{
							type: 'text',
							content: `1) حدد نوع العلاقة المذكورة في بطاقة *المثال المدروس*، وبيّن هل هي ضمنوعية أم بينوعية مع التعليل.`,
							answer: `1) نوع العلاقة: *${chosen.rel}*. التعليل: لأنها ${chosen.scope === 'ضمنوعية' ? 'تربط أفراداً من نفس النوع' : 'تربط كائنين من نوعين مختلفين'}.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'أمثلة للعلاقات الحيوية وتقسيم المهام في خلية النحل'
						}
					]
				},
				{
					type: 'table',
					headers: ['المثال الحيوي', 'نوع العلاقة'],
					cells: [],
					rows: [
						[others[0].desc, { content: '................', answer: others[0].kind, mark: '1' }],
						[others[1].desc, { content: '................', answer: others[1].kind, mark: '1' }],
						['تنافس أشجار الغابة الكثيفة على أشعة الشمس', { content: '................', answer: 'تنافس', mark: '1' }]
					],
					headerBackground: true,
					borders: 'grid',
					width: 'full'
				},
				{
					type: 'text',
					content: `3) كيف تتواصل النحلات العاملات فيما بينها داخل الخلية لتحديد موقع الزهور ومصدر الرحيق؟`,
					answer: `3) تتواصل النحلات عبر *إشارات كيميائية* و*حركات راقصة* (رقصة دائرية أو اهتزازية) تدل على اتجاه ومسافة مصدر الغذاء.`,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: chosen.rel
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 3: Food Chains, Food Webs & Disruption (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const foodChainDisruptionTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2am_t1_food_chain_web_disruption',
	grade: '2am',
	trimesterId: 't1',
	domain: 'ecology_environment',
	titleAr: 'السلاسل الغذائية ومستوياتها وأثر اختفاء إحدى حلقاتها',
	curriculumLessonId: 'sci_lesson_2am_t1_food_chains_webs_biomass',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const chains = [
			{
				items: ['عشب أخضر (منتج)', 'جرادة (مستهلك 1)', 'ضفدع (مستهلك 2)', 'أفعى (مستهلك 3)'],
				removed: 'الضفادع (مستهلك 2)',
				effect: 'يتكاثر الجراد بكثرة فيتلف العشب، وتتناقص الأفاعي لقلة غذائها'
			},
			{
				items: ['عوالق نباتية (منتج)', 'قريدس (مستهلك 1)', 'سردين (مستهلك 2)', 'تونة (مستهلك 3)'],
				removed: 'السردين (مستهلك 2)',
				effect: 'يتكاثر القريدس بكثرة فتتناقص العوالق النباتية، وتتناقص التونة لقلة غذائها'
			},
			{
				items: ['قمح (منتج)', 'فأر الحقل (مستهلك 1)', 'أفعى (مستهلك 2)', 'نسر (مستهلك 3)'],
				removed: 'الأفاعي (مستهلك 2)',
				effect: 'تتكاثر فئران الحقل بكثرة فتتلف محصول القمح، وتتناقص النسور لقلة غذائها'
			}
		];
		const ch = rng.pick(chains);

		const svg = svgPlantAndPrimaryDiagram('food_chain', {
			title: 'سلسلة غذائية في وسط حي متوازن',
			items: ch.items
		});
		const imageUrl = saveSciencesSvgAsset(`sci_2am_t1_chain_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			ch.effect,
			[
				{
					text: 'لا تتأثر بقية الكائنات الحية إطلاقاً باختفاء هذه الحلقة',
					diagnosticFeedback: 'جميع حلقات السلسلة الغذائية مترابطة؛ اختفاء حلقة يسبب اختلالاً متسلسلاً.'
				},
				{
					text: 'يتضاعف عدد المستهلك الثالث فوراً ويختفي المستهلك الأول',
					diagnosticFeedback: 'المستهلك الثالث يتغذى على المستهلك الثاني، فاختفاء غذائه يسبب تناقصه لا تضاعفه!'
				},
				{
					text: 'يصبح المستهلك الأول منتجاً أولياً يقوم بالتركيب الضوئي',
					diagnosticFeedback: 'الحيوانات كائنات مستهلكة غير ذاتية التغذية لا تقوم بالتركيب الضوئي أبداً.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `في السلسلة الغذائية المقابلة، ماذا يحدث إذا اختفت **${ch.removed}** من هذا الوسط الحي؟`,
			questionTextAr: `توقّع أثر اختفاء ${ch.removed} في السلسلة الغذائية.`,
			imageUrl,
			imageCaption: 'سلسلة غذائية من أربعة مستويات غذائية',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `اختفاء **${ch.removed}** يؤدي إلى اختلال التوازن: **${ch.effect}**.`
		};

		const hints: [string, string, string] = [
			'انظر إلى الحلقة التي قبل الحلقة المختفية (فريستها) والحلقة التي بعدها (مفترسها).',
			'عند غياب المفترس تتكاثر الفريسة، وعند غياب الغذاء يقل عدد المفترس الأعلى.',
			'النتيجة: اختلال التوازن في النظام البيئي.'
		];
		const solutionStepsAr = [
			`تبدأ السلسلة دائماً بـ **المنتج الأولي** (${ch.items[0]}) لأنه ذاتي التغذية.`,
			`اختفاء ${ch.removed} يزيل المفترس عن المستهلك 1 فيتكاثر، ويحرم المستهلك 3 من غذائه فيتناقص.`,
			`النتيجة النهائية: ${ch.effect}.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `تمثل الوثيقة المقابلة سلسلة غذائية متكونة من أربع حلقات في وسط حي طبيعي:`,
			content: [
				{
					type: 'columns',
					widths: ['1.15fr', '1.35fr'],
					children: [
						{
							type: 'text',
							content: `1) ماذا يعني السهم (←) في السلسلة الغذائية؟ ولماذا تبدأ دائماً بـ *النبات الأخضر*؟`,
							answer: `1) يعني السهم (←): *"يُؤكل من طرف"*. وتبدأ السلسلة دائماً بالنبات الأخضر لأنه *المنتج الأولي* الكائن الوحيد *ذاتي التغذية* الذي يصنع المادة العضوية بعملية التركيب الضوئي.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'السلسلة الغذائية المدروسة'
						}
					]
				},
				{
					type: 'text',
					content: `2) ماذا يحدث في هذا الوسط الحي لو اختفت حلقة *${ch.removed}* بسبب الصيد أو التلوث؟ علل إجابتك.`,
					answer: `2) عند اختفاء *${ch.removed}* يحدث اختلال في التوازن البيئي: *${ch.effect}*.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) عرّف *الشبكة الغذائية*، واذكر دور الكائنات الحية الدقيقة (المحللة) بعد موت هذه الكائنات.`,
					answer: `3) *الشبكة الغذائية:* هي تقاطع وتداخل عدة سلاسل غذائية في نفس الوسط الحي. وتقوم *الكائنات المحللة* بتحليل الجثث والبقايا العضوية إلى أملاح معدنية تعود للتربة ليستعملها المنتج الأولي من جديد.`,
					mark: '2'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: ch.effect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 4: Biomass Transfer 10% Rule Calculation (6 pts — SIGNATURE 2AM MATH-BIO!)
// ═══════════════════════════════════════════════════════════════════════════════
const biomass10PercentTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2am_t1_biomass_10_percent',
	grade: '2am',
	trimesterId: 't1',
	domain: 'ecology_environment',
	titleAr: 'حساب انتقال الكتلة الحية عبر السلسلة الغذائية (قاعدة 10%)',
	curriculumLessonId: 'sci_lesson_2am_t1_food_chains_webs_biomass',
	defaultPoints: 6,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const m0 = rng.pick([2000, 3000, 5000, 6000, 8000, 12000]);
		const m1 = m0 / 10;
		const m2 = m1 / 10;
		const m3 = m2 / 10;
		const lost1 = m0 - m1;

		const chains = [
			{ producer: 'نبات أخضر', c1: 'جراد (م 1)', c2: 'ضفدع (م 2)', c3: 'أفعى (م 3)' },
			{ producer: 'عوالق نباتية', c1: 'عوالق حيوانية (م 1)', c2: 'سردين (م 2)', c3: 'تونة (م 3)' },
			{ producer: 'عشب بري', c1: 'أرنب (م 1)', c2: 'ثعلب (م 2)', c3: 'نسر (م 3)' }
		];
		const ch = rng.pick(chains);

		const svg = buildDynamicBiomassPyramidSvg({
			producer: ch.producer,
			c1: ch.c1,
			c2: ch.c2,
			c3: ch.c3,
			m0,
			m1,
			m2,
			m3,
			hideTop: true
		});
		const imageUrl = saveSciencesSvgAsset(`sci_2am_t1_biomass_s${seed}`, svg);

		const askTarget = difficulty === 'easy' ? 'c2' : 'c3';
		const targetVal = askTarget === 'c2' ? m2 : m3;
		const targetName = askTarget === 'c2' ? ch.c2 : ch.c3;

		const mcq = buildUniqueMcqOptions(
			`$${targetVal}\\text{ kg}$`,
			[
				{
					text: `$${targetVal * 10}\\text{ kg}$`,
					diagnosticFeedback: 'لقد نسيت القسمة على 10 في الانتقال الأخير!'
				},
				{
					text: `$${m1}\\text{ kg}$`,
					diagnosticFeedback: `$${m1}\\text{ kg}$ هي الكتلة الحية للمستهلك الأول (${ch.c1}) فقط.`
				},
				{
					text: `$${m0 / 2}\\text{ kg}$`,
					diagnosticFeedback: 'تنتقل نسبة 10% فقط (نقسم على 10) عند كل مستوى، وليس 50% (النصف)!'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `في السلسلة الغذائية: **${ch.producer} $\\leftarrow$ ${ch.c1} $\\leftarrow$ ${ch.c2} $\\leftarrow$ ${ch.c3}**. إذا كانت كتلة المنتج الأولي تساوي **$${m0}\\text{ kg}$**، فما هي الكتلة الحية المتنقلة إلى **${targetName}** علماً أن $10\\text{ kg}$ غذاء تعطي $1\\text{ kg}$ كتلة حية؟`,
			questionTextAr: `كتلة المنتج ${m0} كغ. احسب الكتلة الحية المتنقلة إلى ${targetName} (قاعدة 10%).`,
			imageUrl,
			imageCaption: `هرم انتقال الكتلة الحية انطلاقاً من ${m0} كغ من ${ch.producer}`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `بتطبيق قاعدة $10\\%$ عند كل انتقال: ${ch.c1} $= ${m1}\\text{ kg}$، ${ch.c2} $= ${m2}\\text{ kg}$، ${ch.c3} $= ${m3}\\text{ kg}$.`
		};

		const hints: [string, string, string] = [
			'قاعدة 10%: كلما صعدنا مستوى غذائياً نقسم الكتلة الحية على 10 (أو نضرب في 0.1).',
			`كتلة المستهلك 1 = ${m0} ÷ 10 = ${m1} كغ.`,
			`تابع القسمة على 10: المستهلك 2 = ${m2} كغ، والمستهلك 3 = ${m3} كغ.`
		];
		const solutionStepsAr = [
			`المنتج الأولي (${ch.producer}): $m_0 = ${m0}\\text{ kg}$.`,
			`المستهلك 1 (${ch.c1}): $m_1 = ${m0} \\times \\frac{10}{100} = ${m1}\\text{ kg}$.`,
			`المستهلك 2 (${ch.c2}): $m_2 = ${m1} \\div 10 = ${m2}\\text{ kg}$.`,
			`المستهلك 3 (${ch.c3}): $m_3 = ${m2} \\div 10 = ${m3}\\text{ kg}$، والكتلة الضائعة في الانتقال الأول هي $${lost1}\\text{ kg}$ ($90\\%$).`
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `لإنتاج $1$ كغ من الكتلة الحية، يلزم استهلاك $10$ كغ من الغذاء (قاعدة $10%$). إليك السلسلة الغذائية: *${ch.producer} ← ${ch.c1} ← ${ch.c2} ← ${ch.c3}*، علماً أن كتلة المنتج الأولي هي $${m0}$ كغ:`,
			content: [
				{
					type: 'columns',
					widths: ['1.15fr', '1.35fr'],
					children: [
						{
							type: 'text',
							content: `1) احسب الكتلة الحية المتنقلة إلى كل مستهلك مع كتابة مراحل الحساب بدقة، ثم أكمل الجدول الآتي.`,
							answer: `1) نقسم الكتلة على 10 عند كل مستوى: المستهلك 1 = $${m0} div 10 = ${m1}$ كغ؛ المستهلك 2 = $${m1} div 10 = ${m2}$ كغ؛ المستهلك 3 = $${m2} div 10 = ${m3}$ كغ.`,
							mark: '1.5'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'هرم الكتلة الحية للسلسلة الغذائية'
						}
					]
				},
				{
					type: 'table',
					headers: ['المستوى الغذائي', 'الكائن الحي', 'الكتلة الحية المتنقلة (كغ)'],
					cells: [],
					rows: [
						['المنتج الأولي', ch.producer, `${m0} كغ`],
						['المستهلك 1', ch.c1, { content: '................', answer: `${m1} كغ`, mark: '1' }],
						['المستهلك 2', ch.c2, { content: '................', answer: `${m2} كغ`, mark: '1' }],
						['المستهلك 3', ch.c3, { content: '................', answer: `${m3} كغ`, mark: '1' }]
					],
					headerBackground: true,
					borders: 'grid',
					width: 'full'
				},
				{
					type: 'text',
					content: `2) احسب *الكتلة الضائعة* عند انتقال المادة من المنتج الأولي إلى المستهلك الأول، وفسّر أين ذهبت هذه النسبة الكبيرة ($90%$).`,
					answer: `2) الكتلة الضائعة = $${m0} - ${m1} = ${lost1}$ كغ. *التفسير:* تضيع $90%$ من الغذاء على شكل *فضلات مطروحة* (بول وبراز) وطاقة مستهلكة في *التنفس والحركة والحرارة*.`,
					mark: '1.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: `${targetVal} كغ`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 5: Decomposers & Soil Nutrient Cycle (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const decomposersCycleTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2am_t1_decomposers_soil_cycle',
	grade: '2am',
	trimesterId: 't1',
	domain: 'ecology_environment',
	titleAr: 'دور الكائنات المحللة في دورة المادة والمكافحة البيولوجية',
	curriculumLessonId: 'sci_lesson_2am_t1_ecosystem_balance_human_impact',
	defaultPoints: 6,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const askBiocontrol = seed % 2 === 1;

		const svg = buildNutrientCycleSvg();
		const imageUrl = saveSciencesSvgAsset(`sci_2am_t1_cycle_s${seed}`, svg);

		const correctOpt = askBiocontrol
			? 'المكافحة البيولوجية: استعمال الدعسوقة لافتراس حشرة المنّ دون تلويث البيئة'
			: 'تحويل البقايا العضوية الميتة إلى أملاح معدنية ودبال يعيد النبات الأخضر امتصاصه';

		const mcq = buildUniqueMcqOptions(
			correctOpt,
			[
				{
					text: 'تدمير جذور النباتات الخضراء ومنع امتصاص الأملاح المعدنية',
					diagnosticFeedback: 'الكائنات المحللة تُغني التربة بالأملاح المعدنية وتُخصبها لصالح النبات الأخضر!'
				},
				{
					text: 'رش كميات ضخمة من المبيدات الكيميائية لقتل جميع الحشرات بما فيها النحل',
					diagnosticFeedback: 'المبيدات الكيميائية تلوث البيئة وتخل بالتوازن البيئي، والبديل السليم هو المكافحة البيولوجية.'
				},
				{
					text: 'تحويل الأملاح المعدنية إلى صخور بركانية صلبة',
					diagnosticFeedback: 'المحللات تفكك المواد العضوية الميتة إلى أملاح معدنية ذائبة ودبال.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: askBiocontrol
				? 'ما المقصود بـ **المكافحة البيولوجية** كبديل آمن للمبيدات الكيميائية في حماية النظام البيئي؟'
				: 'بالاعتماد على مخطط دورة المادة المقابل، ما الدور الأساسي لـ **الكائنات المحللة** في التربة؟',
			questionTextAr: askBiocontrol ? 'عرّف المكافحة البيولوجية.' : 'ما دور الكائنات المحللة في النظام البيئي؟',
			imageUrl,
			imageCaption: 'دورة المادة ودور الكائنات المحللة في التربة',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: correctOpt + '.'
		};

		const hints: [string, string, string] = [
			'المحللات: بكتيريا، فطريات مجهرية، وديدان الأرض.',
			'دورها: تمعدن المادة العضوية الميتة إلى أملاح معدنية للنبات.',
			'المكافحة البيولوجية: توظيف مفترس طبيعي كالدعسوقة للقضاء على حشرة المنّ.'
		];
		const solutionStepsAr = [
			'الكائنات المحللة تفكك الجثث وأوراق الشجر الميتة.',
			'تحوّلها إلى دبال وأملاح معدنية يمتصها النبات الأخضر فتكتمل دورة المادة.',
			'للمحافظة على التوازن البيئي نستعمل المكافحة البيولوجية والتشجير (السد الأخضر).'
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `في الغابة تتساقط أطنان من الأوراق الميتة وبقايا الحيوانات كل خريف، لكنها سرعان ما تختفي وتتحول إلى تربة خصبة كما يوضح المخطط المقابل:`,
			content: [
				{
					type: 'columns',
					widths: ['1.15fr', '1.35fr'],
					children: [
						{
							type: 'text',
							content: `1) سمِّ الكائنات المسؤولة عن اختفاء البقايا العضوية في التربة، وأعط ثلاثة أمثلة لها.`,
							answer: `1) تُسمّى *الكائنات المحللة*، ومن أمثلتها: *البكتيريا، الفطريات المجهرية، وديدان الأرض* (وحشرات التربة).`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'دور الكائنات المحللة في دورة المادة'
						}
					]
				},
				{
					type: 'text',
					content: `2) اشرح دور هذه الكائنات في توازن النظام البيئي وإعادة تغذية النبات الأخضر.`,
					answer: `2) تقوم الكائنات المحللة بتحليل البقايا العضوية الميتة وتحويلها إلى *دبال وأملاح معدنية* تُغني التربة وتُمتص من جديد من طرف النبات الأخضر (المنتج الأولي)، وبذلك تكتمل *دورة المادة* وتُنظَّف الطبيعة.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) عرّف *المكافحة البيولوجية* مع إعطاء مثال معروف، واذكر إجراءً إيجابياً آخر للإنسان لحماية الأنظمة البيئية في الجزائر.`,
					answer: `3) *المكافحة البيولوجية:* استعمال كائن حي مفترس طبيعي للقضاء على كائن ضار بدل المبيدات الكيميائية (مثال: *الدعسوقة* ضد *حشرة المنّ*). إجراء آخر: *التشجير (مشروع السد الأخضر)* أو إنشاء *الحظائر الوطنية* كحظيرة جرجرة والقالة.`,
					mark: '2'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't1',
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
const integrationEcosystemCrisisTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2am_t1_integration_ecosystem_crisis',
	grade: '2am',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: اختلال النظام البيئي الفلاحي وحساب الكتلة الحية والمكافحة البيولوجية',
	curriculumLessonId: 'sci_lesson_2am_t1_ecosystem_balance_human_impact',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const crop = rng.pick(['القمح', 'الشعير', 'أشجار التفاح']);
		const prey = 'فئران الحقل';
		const predator = rng.pick(['الثعالب والبوم', 'الأفاعي والبوم']);
		const mCrop = rng.pick([4000, 5000, 6000]);
		const mPrey = mCrop / 10;
		const mPred = mPrey / 10;

		const svg = buildFoodWebIntegrationSvg(predator, prey, crop);
		const imageUrl = saveSciencesSvgAsset(`sci_2am_t1_integ_eco_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`صيد ${predator} أدى لتكاثر ${prey} وإتلاف ${crop}، وكتلة ${predator} المتنقلة من ${mCrop} كغ محصول هي ${mPred} كغ`,
			[
				{
					text: `صيد ${predator} زاد من محصول ${crop}، وكتلة ${predator} هي ${mPrey} كغ`,
					diagnosticFeedback: 'غياب المفترس يسبب تكاثر الفرائس وتدمير المحصول، كما يجب القسمة على 10 مرتين للوصول للمستهلك الثاني!'
				},
				{
					text: `رش المبيدات الكيميائية السامة هو الحل الوحيد والآمن لحشرة المنّ`,
					diagnosticFeedback: 'الحل البيئي الآمن هو المكافحة البيولوجية بواسطة الدعسوقة الموجودة في السند 1!'
				},
				{
					text: `الكتلة الحية المتنقلة إلى ${predator} تساوي ${mCrop} كغ دون أي ضياع`,
					diagnosticFeedback: 'تضيع 90% من الكتلة عند كل انتقال ولا تنتقل سوى 10%!'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `في منطقة فلاحية يمثلها السند 1، قام سكان بصيد جائر لـ **${predator}** فتضاعف عدد **${prey}** وتلف محصول **${crop}**. إذا استهلكت الفئران $${mCrop}\\text{ kg}$ من ${crop}، ما التفسير الصحيح وكتلة **${predator}** المتنقلة (قاعدة $10\\%$)؟`,
			questionTextAr: `فسّر تلف ${crop} واحسب الكتلة الحية المتنقلة إلى ${predator} من ${mCrop} كغ.`,
			imageUrl,
			imageCaption: 'السند 1: الشبكة الغذائية في المنطقة الفلاحية',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `صيد **${predator}** أخلّ بالتوازن فزاد عدد **${prey}** وأتلف المحصول؛ وحسب قاعدة $10\\%$: كتلة ${prey} $= ${mPrey}\\text{ kg}$، وكتلة ${predator} $= ${mPred}\\text{ kg}$.`
		};

		const hints: [string, string, string] = [
			'استخرج السلسلة الغذائية من السند 1: محصول ← فئران الحقل ← المفترس.',
			`احسب بقاعدة 10%: ${mCrop} ÷ 10 = ${mPrey} كغ ثم ${mPrey} ÷ 10 = ${mPred} كغ.`,
			'للحد من حشرة المنّ اقترح المكافحة البيولوجية (الدعسوقة) ومنع الصيد الجائر.'
		];
		const solutionStepsAr = [
			`التفسير (السند 1 و 2): صيد ${predator} أزال مفترس ${prey} فتكاثرت وأتلفت ${crop}.`,
			`حساب الكتلة الحية: ${prey} $= ${mPrey}\\text{ kg}$، ${predator} $= ${mPred}\\text{ kg}$.`,
			'الحلول البيئية: منع الصيد الجائر وإعادة المفترسات + المكافحة البيولوجية بالدعسوقة ضد المنّ.'
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 8,
			instruction: `*السياق:* اشتكى فلاحو إحدى المناطق الزراعية من تراجع حاد في محصول *${crop}* بعد قيامهم خلال سنتين بـ *صيد جائر* لـ *${predator}*، كما لاحظوا انتشار *حشرة المنّ* على النباتات، فأراد أحدهم رش مبيدات كيميائية قوية. لمساعدتهم على استعادة توازن مزارعهم، نقدم لك السندات التالية:`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1.15fr'],
					children: [
						{
							type: 'image',
							src: imageUrl,
							caption: 'السند 1: الشبكة الغذائية في المزرعة'
						},
						{
							type: 'table',
							headers: ['السند 2: السنة', `عدد ${predator}`, `عدد ${prey}`, `مردود ${crop}`],
							cells: [],
							rows: [
								['2023 (توازن)', 'مرتفع', 'قليل', 'وفير'],
								['2024 (صيد)', 'قليل', 'متزايد', 'متوسط'],
								['2025 (اختفاء)', 'منعدم', 'كبير جداً', 'ضعيف جداً']
							],
							headerBackground: true,
							borders: 'grid',
							width: 'full'
						}
					]
				},
				{
					type: 'text',
					content: `*السند 3:* تنتقل الكتلة الحية في السلسلة الغذائية بنسبة $10%$ فقط من مستوى إلى آخر (كل 10 كغ غذاء تنتج 1 كغ كتلة حية)، كما تتغذى *الدعسوقة* على عشرات الأفراد من حشرة المنّ يومياً دون أي ضرر للبيئة.\n\n*التعليمات:* بالاعتماد على السياق والسندات ومكتسباتك القبلية:`
				},
				{
					type: 'text',
					content: `1) استخرج من السند 1 سلسلة غذائية تحتوي على *${prey}* وحدد مستوياتها، ثم فسّر سبب تراجع محصول *${crop}* سنة 2025.`,
					answer: `1) اعتماداً على السندين 1 و 2 ومكتسباتي القبلية:\n- السلسلة الغذائية: *${crop}* (منتج أولي) ← *${prey}* (مستهلك 1) ← *${predator}* (مستهلك 2).\n- *التفسير:* أدى الصيد الجائر لـ ${predator} إلى اختفائها سنة 2025، مما سمح بتكاثر مفرط لـ ${prey} لغياب مفترسها، فالتهمت محصول ${crop} وأحدثت اختلالاً في توازن النظام البيئي.`,
					mark: '3'
				},
				{
					type: 'text',
					content: `2) إذا استهلكت ${prey} كمية $${mCrop}$ كغ من محصول ${crop}، احسب الكتلة الحية المتنقلة إلى *${prey}* ثم إلى *${predator}* مع توضيح سبب تناقصها.`,
					answer: `2) اعتماداً على السند 3 ومكتسباتي القبلية (قاعدة 10%):\n- الكتلة الحية المتنقلة إلى ${prey} (مستهلك 1): $${mCrop} div 10 = ${mPrey}$ كغ.\n- الكتلة الحية المتنقلة إلى ${predator} (مستهلك 2): $${mPrey} div 10 = ${mPred}$ كغ.\n- *سبب التناقص:* ضياع $90%$ من الكتلة الغذائية على شكل فضلات مطروحة وطاقة مستهلكة في التنفس والحرارة.`,
					mark: '2.5'
				},
				{
					type: 'text',
					content: `3) اقترح حلين بيئيين سليمين لمساعدة الفلاحين على استعادة توازن مزارعهم والقضاء على *حشرة المنّ* دون استعمال المبيدات الكيميائية.`,
					answer: `3) اعتماداً على السندين 1 و 3 ومكتسباتي القبلية، أقترح:\n- *منع الصيد الجائر* وحماية ${predator} لإعادة ضبط أعداد ${prey} طبيعياً.\n- تطبيق *المكافحة البيولوجية* بتربية وإطلاق حشرة *الدعسوقة* لتفترس حشرة المنّ بأمان دون تلويث التربة والماء والمحاصيل.`,
					mark: '2.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'integration',
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: `اختلال بسبب صيد ${predator} — كتلة المفترس ${mPred} كغ — مكافحة بيولوجية`
		};
	}
};

export const SCIENCES_TEMPLATES_2AM_T1: SciencesParameterizedTemplate[] = [
	bioticAbioticTemplate,
	ecologicalRelationshipsTemplate,
	foodChainDisruptionTemplate,
	biomass10PercentTemplate,
	decomposersCycleTemplate,
	integrationEcosystemCrisisTemplate
];
