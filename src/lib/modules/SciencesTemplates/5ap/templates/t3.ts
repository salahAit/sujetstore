import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	calloutBadge,
	esc,
	haloText,
	saveSciencesSvgAsset,
	svgBioFlowchart,
	wrapSciencesSvg
} from '../../svg-sciences';

function buildAnimalReproSvg5ap(animal: string, typeLabel: string, fertLabel: string, careLabel: string): string {
	return wrapSciencesSvg(
		440,
		215,
		`<rect x="6" y="6" width="428" height="203" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="220" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">بطاقة علمية: التكاثر وتطور الجنين عند (${esc(animal)})</text>` +
			`<rect x="294" y="48" width="124" height="142" rx="8" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.8"/>` +
			`<text x="356" y="74" text-anchor="middle" font-size="11" font-weight="bold" fill="#5b21b6">نوع الإلقاح</text>` +
			`<text x="356" y="120" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#0f172a">${esc(fertLabel)}</text>` +
			`<rect x="158" y="48" width="124" height="142" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/>` +
			`<text x="220" y="74" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">تطور الجنين</text>` +
			`<text x="220" y="120" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#0f172a">${esc(typeLabel)}</text>` +
			`<rect x="22" y="48" width="124" height="142" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.8"/>` +
			`<text x="84" y="74" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534">حماية الصغار</text>` +
			`<text x="84" y="120" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#0f172a">${esc(careLabel)}</text>`
	);
}

function buildPollutionCaseSvg5ap(pollType: string, cause: string, solution: string): string {
	return wrapSciencesSvg(
		440,
		215,
		`<rect x="6" y="6" width="428" height="203" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="220" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">تشخيص تلوث بيئي واقتراح حلول الفرز وإعادة التدوير</text>` +
			`<rect x="232" y="46" width="186" height="146" rx="9" fill="#fef2f2" stroke="#dc2626" stroke-width="1.8"/>` +
			`<text x="325" y="72" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#991b1b">${esc(pollType)}</text>` +
			`<text x="325" y="114" text-anchor="middle" font-size="10.2" fill="#7f1d1d">السبب: ${esc(cause)}</text>` +
			`<text x="325" y="160" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">يُخلّ بالتوازن البيئي ✕</text>` +
			`<rect x="22" y="46" width="186" height="146" rx="9" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.8"/>` +
			`<text x="115" y="72" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#166534">الحل البيئي السليم</text>` +
			`<text x="115" y="114" text-anchor="middle" font-size="10.2" fill="#14532d">${esc(solution)}</text>` +
			`<text x="115" y="160" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">حماية البيئة والموارد ✓</text>`
	);
}

function buildTaqyimMasterSvg5ap(wilaya: string): string {
	return wrapSciencesSvg(
		460,
		235,
		`<rect x="6" y="6" width="448" height="223" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
			`<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">سند امتحان تقييم المكتسبات — المزرعة البيئية بولاية ${esc(wilaya)}</text>` +
			// 3 competency cards
			`<rect x="312" y="44" width="128" height="134" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="1.8"/>` +
			calloutBadge(376, 62, '1', '#dc2626') +
			`<text x="376" y="88" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#991b1b">الأمن الغازي والكهربائي</text>` +
			`<text x="376" y="114" text-anchor="middle" font-size="9.5" fill="#7f1d1d">مدفأة بلهب أصفر</text>` +
			`<text x="376" y="134" text-anchor="middle" font-size="9.5" fill="#7f1d1d">ومضخة بلا مأخذ أرضي</text>` +
			`<text x="376" y="162" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#b91c1c">كفاءة المادة والطاقة</text>` +
			`<rect x="166" y="44" width="128" height="134" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/>` +
			calloutBadge(230, 62, '2', '#2563eb') +
			`<text x="230" y="88" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#1e3a8a">الإنسان والصحة</text>` +
			`<text x="230" y="114" text-anchor="middle" font-size="9.5" fill="#1e40af">جهد عضلي وحركة ذراع</text>` +
			`<text x="230" y="134" text-anchor="middle" font-size="9.5" fill="#1e40af">وتسارع النبض والتنفس</text>` +
			`<text x="230" y="162" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#1d4ed8">كفاءة الحفاظ على الصحة</text>` +
			`<rect x="20" y="44" width="128" height="134" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.8"/>` +
			calloutBadge(84, 62, '3', '#16a34a') +
			`<text x="84" y="88" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#166534">المحيط والفلاحة</text>` +
			`<text x="84" y="114" text-anchor="middle" font-size="9.5" fill="#14532d">سقي بالتقطير وفرز نفايات</text>` +
			`<text x="84" y="134" text-anchor="middle" font-size="9.5" fill="#14532d">وتربية الدجاج والأبقار</text>` +
			`<text x="84" y="162" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#15803d">كفاءة حماية المحيط</text>` +
			`<rect x="20" y="188" width="420" height="30" rx="6" fill="#1e3a8a"/>` +
			`<text x="230" y="207" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#ffffff">معايير التقييم: التملك الأقصى (أ) • التملك المقبول (ب) • التملك الجزئي (ج) • التملك المحدود (د)</text>`
	);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Animal Fertilization, Embryo Development & Offspring Care (2 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const animalReproductionEmbryoTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_5ap_t3_animal_reproduction_embryo',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'reproduction_genetics',
	titleAr: 'الإلقاح وتطور الجنين وحماية صغار الحيوانات (بيوضة وولودة)',
	curriculumLessonId: 'sci_lesson_5ap_t3_animal_fertilization_embryo_care',
	defaultPoints: 2,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const animals = [
			{
				name: 'البقرة',
				type: 'حيوان ولود (ينمو في الرحم)',
				fert: 'إلقاح داخلي',
				care: 'إرضاع وحراسة الصغير',
				summary: 'إلقاح داخلي، حيوان ولود يتغذى جنينه عبر الحبل السري وترضعه أمه'
			},
			{
				name: 'الدجاجة',
				type: 'حيوان بيوض (ينمو في البيضة)',
				fert: 'إلقاح داخلي',
				care: 'حضن البيض ورعاية الكتاكيت',
				summary: 'إلقاح داخلي، حيوان بيوض يتغذى جنينه من مدخرات البيضة وتحضنه أمه'
			},
			{
				name: 'سمك السردين والضفدع',
				type: 'حيوان بيوض (في الماء)',
				fert: 'إلقاح خارجي (مائي)',
				care: 'إنتاج آلاف البيوض لضمان البقاء',
				summary: 'إلقاح خارجي في الماء، حيوان بيوض يعوّض غياب الرعاية بكثرة البيوض'
			}
		];
		const chosen = rng.pick(animals);
		const svg = buildAnimalReproSvg5ap(chosen.name, chosen.type, chosen.fert, chosen.care);
		const imageUrl = saveSciencesSvgAsset(`sci_5ap_t3_repro_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			chosen.summary,
			animals
				.filter((a) => a.name !== chosen.name)
				.map((a) => ({
					text: a.summary,
					diagnosticFeedback: `هذه الصفات تخص (${a.name}) وليس (${chosen.name}).`
				}))
				.concat([
					{
						text: 'يتكاثر خضرياً بالدرنات والأبصال دون حدوث إلقاح',
						diagnosticFeedback: 'الدرنات والأبصال خاصة بالتكاثر الخضري للنباتات وليس الحيوانات!'
					}
				]),
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `ما التوصيف العلمي الدقيق لنمط التكاثر وتطور الجنين وحماية الصغار عند **${chosen.name}**؟`,
			questionTextAr: `حدّد خصائص التكاثر وتطور الجنين عند ${chosen.name}.`,
			imageUrl,
			imageCaption: `بطاقة التكاثر عند ${chosen.name}`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `يتميّز **${chosen.name}** بـ: **${chosen.summary}**.`
		};

		const hints: [string, string, string] = [
			'ميّز أولاً: هل الإلقاح داخلي (داخل جسم الأنثى) أم خارجي (في الماء)؟',
			'حدّد مكان تطور الجنين: داخل الرحم (ولود) أم داخل البيضة (بيوض).',
			'انظر كيف يحمي هذا الحيوان نوعه (حضن وإرضاع أم إنتاج آلاف البيوض).'
		];

		const solutionStepsAr = [
			`نوع الإلقاح عند ${chosen.name}: **${chosen.fert}**.`,
			`مكان تطور الجنين: **${chosen.type}**.`,
			`استراتيجية حماية الصغار: **${chosen.care}**.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 2,
			instruction: 'أكمل الجدول الآتي للمقارنة بين أنماط التكاثر وتطور الجنين وحماية الصغار عند الحيوانات، مستعيناً بالبطاقة المقابلة:',
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: `1) كيف يتغذى الجنين عند *الحيوانات البيوضة* وكيف يتغذى عند *الحيوانات الولودة*؟ وما الفرق بين الإلقاح الداخلي والخارجي؟`,
							answer: '1) عند *البيوضة* يتغذى من *مدخرات البيضة* خارج جسم الأم؛ وعند *الولودة* يتغذى من دم أمه داخل الرحم عبر *الحبل السري*. *الإلقاح الداخلي* يحدث داخل جسم الأنثى و*الخارجي* في الماء.',
							mark: '1'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: `بطاقة التكاثر (${chosen.name})`
						}
					]
				},
				{
					type: 'table',
					headers: ['الحيوان', 'نوع الإلقاح', 'بيوض أم ولود', 'طريقة حماية الصغار'],
					cells: [],
					rows: [
						[
							'الدجاجة',
							{ content: '............', answer: 'داخلي', mark: '0.25' },
							{ content: '............', answer: 'بيوض', mark: '0.25' },
							'حضن البيض ورعاية الكتاكيت'
						],
						[
							'الضفدع',
							{ content: '............', answer: 'خارجي (في الماء)', mark: '0.25' },
							'بيوض',
							{ content: '........................', answer: 'إنتاج عدد كبير من البيوض', mark: '0.25' }
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
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: chosen.summary
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Pollution, Ecological Balance & Recycling (2 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const pollutionRecyclingTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_5ap_t3_pollution_recycling',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'ecology_environment',
	titleAr: 'حماية البيئة والتوازن البيئي، التلوث وإعادة التدوير',
	curriculumLessonId: 'sci_lesson_5ap_t3_environment_pollution_recycling',
	defaultPoints: 2,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cases = [
			{
				pollType: 'تلوث الماء',
				cause: 'رمي مياه الصرف الصحي وزيوت المصانع في الوادي',
				solution: 'معالجة المياه المستعملة وعدم رمي النفايات في الأودية',
				impact: 'موت الأسماك وتسمم المياه واختلال السلسلة الغذائية'
			},
			{
				pollType: 'تلوث التربة',
				cause: 'تراكم القارورات البلاستيكية والبطاريات في الغابة والحقول',
				solution: 'الفرز الانتقائي للنفايات وإعادة التدوير',
				impact: 'تدهور خصوبة التربة وموت الكائنات الحية'
			},
			{
				pollType: 'تلوث الهواء',
				cause: 'دخان المصانع وعوادم السيارات وحرق النفايات البلاستيكية',
				solution: 'التشجير المكثف واستعمال الطاقات المتجددة وفرز النفايات بدل حرقها',
				impact: 'أمراض تنفسية كالربو وتغير المناخ'
			}
		];
		const chosen = rng.pick(cases);
		const svg = buildPollutionCaseSvg5ap(chosen.pollType, chosen.cause, chosen.solution);
		const imageUrl = saveSciencesSvgAsset(`sci_5ap_t3_poll_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`${chosen.pollType}: ${chosen.solution}`,
			[
				{
					text: 'حرق جميع القارورات البلاستيكية وسط الغابة للتخلص منها بسرعة',
					diagnosticFeedback: 'حرق البلاستيك يطلق غازات سامة تلوث الهواء وقد يشعل حريقاً في الغابة!'
				},
				{
					text: 'رمي النفايات الصلبة والزيوت في البحر حتى تختفي عن الأنظار',
					diagnosticFeedback: 'رمي النفايات في البحر يقتل الكائنات البحرية ويلوث الماء.'
				},
				{
					text: 'قطع جميع الأشجار حول المدينة لمنع سقوط الأوراق في الخريف',
					diagnosticFeedback: 'الأشجار تنقي الهواء وتحمي التوازن البيئي؛ قطعها كارثة بيئية!'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `شاهد تلاميذ النادي البيئي المشكلة الآتية: **«${chosen.cause}»** مما أدى إلى **(${chosen.impact})**. ما نوع هذا التلوث وما الحل البيئي السليم؟`,
			questionTextAr: `حدّد نوع التلوث والحل البيئي السليم.`,
			imageUrl,
			imageCaption: `${chosen.pollType} والحل البيئي المقترح`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `هذا **${chosen.pollType}**، والحل البيئي الصحيح هو: **${chosen.solution}** للحفاظ على التوازن البيئي.`
		};

		const hints: [string, string, string] = [
			'حدّد الوسط المتضرر (الهواء أم الماء أم التربة).',
			'استبعد كل الحلول التي تنقل التلوث لوسط آخر (كالحرق أو الرمي في البحر).',
			'الفرز الانتقائي وإعادة التدوير والتشجير ومعالجة المياه هي الحلول المستدامة.'
		];

		const solutionStepsAr = [
			`نوع التلوث: **${chosen.pollType}**.`,
			`أثره البيئي: ${chosen.impact}.`,
			`الحل السليم: **${chosen.solution}**.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 2,
			instruction: `في حملة بيئية مدرسية رصد التلاميذ حالة (${chosen.cause}). استعن بالسند المقابل وأجب:`,
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: '1) سمِّ نوع التلوث الملاحَظ، واذكر عاقبة واحدة له على التوازن البيئي، ثم اقترح الحل المناسب.',
							answer: `1) النوع: *${chosen.pollType}*. العاقبة: *${chosen.impact}*. الحل: *${chosen.solution}*.`,
							mark: '1'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'تشخيص التلوث والحل البيئي'
						}
					]
				},
				{
					type: 'text',
					content: '2) ماذا نعني بـ*الفرز الانتقائي* و*إعادة التدوير*؟ اذكر ثلاث مواد قابلة لإعادة التدوير.',
					answer: '2) *الفرز الانتقائي* هو فصل النفايات في حاويات مخصصة حسب نوعها لتسهيل *إعادة التدوير* (إعادة تصنيعها لمنتجات جديدة). أمثلة: *الورق والكرتون، البلاستيك، الزجاج، والمعادن*.',
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: `${chosen.pollType} — ${chosen.solution}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Sustainable Agriculture Conditions (2 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const sustainableAgricultureTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_5ap_t3_sustainable_agriculture',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'ecology_environment',
	titleAr: 'شروط الفلاحة المستدامة وترشيد الموارد الطبيعية',
	curriculumLessonId: 'sci_lesson_5ap_t3_sustainable_agriculture',
	defaultPoints: 2,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const practices = [
			{
				name: 'السقي بالتقطير',
				benefit: 'اقتصاد الماء وتقليل التبخر وإيصال الماء مباشرة لجذور النبات'
			},
			{
				name: 'الدورة الزراعية (تناوب المحاصيل)',
				benefit: 'تجديد خصوبة التربة ومنع استنزاف أملاحها المعدنية'
			},
			{
				name: 'المكافحة البيولوجية',
				benefit: 'القضاء على الحشرات الضارة بكائنات نافعة دون تسميم الثمار أو قتل النحل'
			},
			{
				name: 'التشجير ومشروع السد الأخضر',
				benefit: 'مكافحة التصحر وتثبيت التربة ضد الانجراف وحماية الأراضي الفلاحية'
			}
		];
		const chosen = rng.pick(practices);

		const svg = svgBioFlowchart({
			title: 'دعامات الفلاحة المستدامة وترشيد الموارد',
			orientation: 'horizontal',
			width: 470,
			steps: [
				{ label: 'السقي بالتقطير', sublabel: 'حفظ المورد المائي', color: '#0284c7', bg: '#f0f9ff' },
				{ label: 'الدورة الزراعية', sublabel: 'وأسمدة عضوية طبيعية', color: '#d97706', bg: '#fffbeb' },
				{ label: 'مكافحة بيولوجية', sublabel: 'حماية النحل والغذاء', color: '#7c3aed', bg: '#f5f3ff' },
				{ label: 'السد الأخضر', sublabel: 'مقاومة التصحر والانجراف', color: '#16a34a', bg: '#f0fdf4' }
			]
		});
		const imageUrl = saveSciencesSvgAsset(`sci_5ap_t3_sustagri_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			chosen.name,
			practices
				.filter((p) => p.name !== chosen.name)
				.map((p) => ({
					text: p.name,
					diagnosticFeedback: `فائدة (${p.name}) هي: ${p.benefit}.`
				})),
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `أيّ شرط من شروط **الفلاحة المستدامة** يحقّق الفائدة الآتية: **«${chosen.benefit}»**؟`,
			questionTextAr: `حدّد ممارسة الفلاحة المستدامة التي تحقق: ${chosen.benefit}`,
			imageUrl,
			imageCaption: 'شروط الفلاحة المستدامة في الجزائر',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الممارسة المطلوبة هي **${chosen.name}** لأنها تحقق: ${chosen.benefit}.`
		};

		const hints: [string, string, string] = [
			'اقرأ الفائدة المذكورة بعناية: هل تتعلق بالماء، أم بالتربة، أم بالآفات، أم بالتصحر؟',
			'استعن بالمخطط التلخيصي لدعامات الفلاحة المستدامة المقابل.',
			`اربط الفائدة بـ(${chosen.name}).`
		];

		const solutionStepsAr = [
			`الفلاحة المستدامة تحفظ الموارد الطبيعية للأجيال القادمة.`,
			`الممارسة التي تحقق (${chosen.benefit}) هي: **${chosen.name}**.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 2,
			instruction: 'لاحظ مخطط دعامات الفلاحة المستدامة المقابل، ثم أجب:',
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: `1) سمِّ الممارسة الفلاحية المستدامة التي تحقق: *${chosen.benefit}*، ثم عرّف *الفلاحة المستدامة*.`,
							answer: `1) الممارسة هي: *${chosen.name}*. *الفلاحة المستدامة* هي فلاحة تنتج غذاءً صحياً ووفيراً مع الحفاظ على التربة والماء والتنوع البيولوجي للأجيال القادمة.`,
							mark: '1'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'دعامات الفلاحة المستدامة'
						}
					]
				},
				{
					type: 'true_false',
					items: [
						{
							q: 'السقي بالغمر وقت الظهيرة أفضل طريقة لاقتصاد الماء في الفلاحة المستدامة.',
							a: 'خاطئ',
							c: 'السقي بالتقطير صباحاً أو مساءً هو الطريقة المثلى لاقتصاد الماء وتقليل التبخر.',
							mark: '0.5'
						},
						{
							q: 'الإفراط في المبيدات الكيميائية يقتل النحل ويؤثر سلباً على تلقيح الأزهار وإنتاج الثمار.',
							a: 'صحيح',
							c: 'العبارة صحيحة؛ لذا نعتمد المكافحة البيولوجية.',
							mark: '0.5'
						}
					]
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: chosen.name
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Taqyeem Prep: Health & Safe Matter/Energy Competency (2.5 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const taqyimHealthEnergyTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_5ap_t3_taqyim_health_energy',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'matter_tech_primary',
	titleAr: 'تهيئة لتقييم المكتسبات: كفاءتا الأمن الغازي والكهربائي وصحة العضوية',
	curriculumLessonId: 'sci_lesson_5ap_t3_taqyim_maktasabat_synthesis',
	defaultPoints: 2.5,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scenarios = [
			{
				title: 'مدفأة بلهب أصفر وغرفة مغلقة + سخان كهربائي بلا مأخذ أرضي',
				correct: 'احتراق غير تام ينتج غاز CO السام (الحل: التهوية والصيانة) + خطر صعق كهربائي (الحل: تركيب المأخذ الأرضي والقاطع التفاضلي)',
				shortAns: 'التهوية وصيانة المدفأة + تركيب المأخذ الأرضي'
			},
			{
				title: 'تلميذ يمارس الجري السريع ويتعرق ثم يشرب الماء الكافي لحماية جسمه',
				correct: 'تتسارع الوتيرتان القلبية والتنفسية لتزويد العضلات بالأكسجين والمغذيات، وشرب الماء يعوض العرق ويساعد الكليتين على ترشيح الدم',
				shortAns: 'تسارع الوتيرتين للعضلات + شرب الماء للترشيح الكلوي'
			}
		];
		const chosen = rng.pick(scenarios);

		const svg = svgBioFlowchart({
			title: 'تقييم المكتسبات: الربط بين الصحة والأمن الغازي والكهربائي',
			orientation: 'horizontal',
			width: 470,
			steps: [
				{ label: 'تحليل السند', sublabel: 'قراءة الأعراض والمؤشرات', color: '#0284c7', bg: '#f0f9ff' },
				{ label: 'التعليل العلمي', sublabel: 'توظيف المفاهيم العلمية بدقة', color: '#7c3aed', bg: '#f5f3ff' },
				{ label: 'الإجراء الوقائي', sublabel: 'تأمين المنزل والجسم', color: '#d97706', bg: '#fffbeb' },
				{ label: 'تملك أقصى', sublabel: 'إجابة كاملة ومنسجمة', color: '#16a34a', bg: '#f0fdf4' }
			]
		});
		const imageUrl = saveSciencesSvgAsset(`sci_5ap_t3_taqprep_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			chosen.correct,
			[
				{
					text: 'غلق النوافذ تماماً عند اصفرار اللهب ونزع المأخذ الأرضي لتقليل استهلاك الكهرباء',
					diagnosticFeedback: 'تصرفات شديدة الخطورة تعرض العائلة للاختناق بـCO والصعق الكهربائي!'
				},
				{
					text: 'الامتناع عن شرب الماء أثناء الرياضة لأن الكليتين لا تحتاجان للماء لترشيح الدم',
					diagnosticFeedback: 'الماء أساسي لتعويض العرق ومساعدة الكليتين على تصفية الدم.'
				},
				{
					text: 'الهواء يتكون من الأكسجين بنسبة 78% والآزوت بنسبة 21% ولا يتأثر الاحتراق بنقص الهواء',
					diagnosticFeedback: 'النسب معكوسة! الآزوت 78% والأكسجين 21%، ونقص الأكسجين يسبب احتراقاً غير تام.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `في تدريب على **امتحان تقييم المكتسبات**، عُرضت الحالة الآتية: **«${chosen.title}»**. أيّ إجابة تحقق مستوى **التملك الأقصى (أ)**؟`,
			questionTextAr: `اختر إجابة التملك الأقصى للحالة المعروضة.`,
			imageUrl,
			imageCaption: 'منهجية تحقيق التملك الأقصى في تقييم المكتسبات',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `تحقق الإجابة **التملك الأقصى** لأنها تجمع بين التفسير العلمي الدقيق والحل الوقائي السليم: **${chosen.correct}**.`
		};

		const hints: [string, string, string] = [
			'لتحقيق التملك الأقصى يجب أن تتضمن الإجابة: السبب العلمي + النتيجة + القاعدة الوقائية.',
			'تحقق من صحة نسب الهواء (21% أكسجين، 78% آزوت) ودور المأخذ الأرضي والكليتين.',
			'اختر الإجابة الشاملة والخالية من الأخطاء العلمية.'
		];

		const solutionStepsAr = [
			`الحالة المدروسة: ${chosen.title}.`,
			`إجابة التملك الأقصى: **${chosen.correct}**.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 2.5,
			instruction: `في إطار التحضير لـ*امتحان تقييم المكتسبات*، اقرأ الوضعية القصيرة الآتية واستعن بالمخطط المنهجي المقابل: (${chosen.title}).`,
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: '1) قدّم تفسيراً علمياً دقيقاً لما يحدث في هذه الحالة (معيار التفسير العلمي).',
							answer: `1) *${chosen.correct}*.`,
							mark: '1.5'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'منهجية الإجابة في تقييم المكتسبات'
						}
					]
				},
				{
					type: 'text',
					content: '2) اقترح *قاعدتين وقائيتين* وجيهتين مرتبطتين بالوضعية لتحقيق مستوى *التملك الأقصى*.',
					answer: '2) *تهوية الغرف ومراقبة زرقة اللهب وتركيب المأخذ الأرضي والقاطع التفاضلي* للأمن المنزلي، و*الإحماء وشرب الماء بانتظام* لسلامة العضلات والكليتين.',
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: chosen.shortAns
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Comprehensive Integration: امتحان تقييم المكتسبات الشامل (4 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationTaqyimMaktasabatTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_5ap_t3_integration_taqyim_maktasabat',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'وضعية تقييم المكتسبات الشاملة (نهاية الطور الابتدائي 5AP)',
	curriculumLessonId: 'sci_lesson_5ap_t3_taqyim_maktasabat_synthesis',
	defaultPoints: 4,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const wilaya = rng.pick(['المدية', 'تلمسان', 'سطيف', 'جيجل', 'بسكرة']);
		const pupil = rng.pick(['أنس', 'سلسبيل', 'معاذ', 'لجين']);

		const svg = buildTaqyimMasterSvg5ap(wilaya);
		const imageUrl = saveSciencesSvgAsset(`sci_5ap_t3_taqyim_master_s${seed}`, svg);

		const correctMastery =
			'تهوية البيت وصيانة المدفأة ضد CO وتأريض المضخة + تسارع الوتيرتين وتقلص القابضة أثناء العمل + السقي بالتقطير والفرز الانتقائي لحماية البيئة';

		const mcq = buildUniqueMcqOptions(
			correctMastery,
			[
				{
					text: 'غلق النوافذ عند اصفرار اللهب + السقي بالغمر ظهراً + حرق النفايات البلاستيكية وسط المزرعة',
					diagnosticFeedback: 'جميع هذه الحلول خاطئة وخطيرة (تسمم بـCO، تبذير الماء، وتلوث الهواء) — تملك محدود!'
				},
				{
					text: 'الدجاجة حيوان ولود والبقرة حيوان بيوض، ولا علاقة للمأخذ الأرضي بالوقاية من الصعق الكهربائي',
					diagnosticFeedback: 'معكوسة! الدجاجة بيوضة والبقرة ولودة، والمأخذ الأرضي أساسي للحماية من الصعق.'
				},
				{
					text: 'تتوقف الكليتان عن ترشيح الدم أثناء العمل، وتسترخي العضلتان القابضة والباسطة معاً عند رفع الدلو',
					diagnosticFeedback: 'الكليتان ترشحان الدم باستمرار، ورفع الدلو (ثني الساعد) يتطلب تقلص القابضة واسترخاء الباسطة.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `**وضعية امتحان تقييم المكتسبات (نهاية الطور الابتدائي)**: قضى **${pupil}** عطلة الربيع في مزرعة عائلية بيئية بولاية **${wilaya}** تضم بيتاً ريفياً بمدفأة غاز ومضخة ماء كهربائية، وحقولاً مسقية بالتقطير، وحظيرة أبقار ودجاج. أيّ حزمة إجابات تحقق **التملك الأقصى (أ)** عبر الكفاءات الختامية الثلاث معاً؟`,
			questionTextAr: `اختر الإجابة التي تحقق التملك الأقصى في وضعية تقييم المكتسبات الشاملة.`,
			imageUrl,
			imageCaption: `سند امتحان تقييم المكتسبات — المزرعة البيئية (${wilaya})`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `تدمج هذه الوضعية كفاءات السنة الخامسة الثلاث: 1) **الأمن الغازي والكهربائي** (ضد $\\text{CO}$ وبالمأخذ الأرضي)، 2) **الصحة والعضوية** (تكيّف الجهد والعضلات المتضادة)، 3) **حماية المحيط والفلاحة المستدامة** (السقي بالتقطير والفرز وإعادة التدوير).`
		};

		const hints: [string, string, string] = [
			'تحقق من المعيار 1 (المادة والطاقة): لهب أصفر ← احتراق غير تام وغاز CO؛ مضخة كهربائية معدنية ← مأخذ أرضي.',
			'تحقق من المعيار 2 (الإنسان والصحة): جهد عضلي ← تسارع الوتيرتين القلبية والتنفسية؛ رفع دلو ← تقلص القابضة واسترخاء الباسطة.',
			'تحقق من المعيار 3 (حماية المحيط): فلاحة مستدامة ← سقي بالتقطير وأسمدة عضوية وفرز انتقائي وإعادة تدوير.'
		];

		const solutionStepsAr = [
			'الكفاءة 1 (المادة والطاقة): فتح النوافذ وصيانة المدفأة ضد غاز CO + توصيل المضخة بالمأخذ الأرضي والقاطع التفاضلي.',
			'الكفاءة 2 (الإنسان والصحة): تسارع الوتيرتين لتزويد العضلات بالأكسجين والمغذيات + عمل العضلتين المتضادتين + شرب الماء لحماية الكليتين.',
			'الكفاءة 3 (حماية المحيط): السقي بالتقطير والأسمدة العضوية والمكافحة البيولوجية + الفرز الانتقائي وإعادة التدوير + التمييز بين البيوض (الدجاج) والولود (البقر).'
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'وضعية تقييم المكتسبات الشاملة',
			points: 4,
			instruction: `خلال عطلة الربيع بولاية ${wilaya}، زار ${pupil} مزرعة جده البيئية؛ فلاحظ ثلاثة مواقف مترابطة (كما في السند المقابل): (1) في البيت الريفي تحوّل لهب المدفأة إلى الأصفر بسبب غلق النوافذ، وكانت مضخة الماء المعدنية تسبب وخزاً كهربائياً عند لمسها. (2) ساعد ${pupil} جده في رفع صناديق الخضر فتسارعت دقات قلبه وتنفسه وتعرّق. (3) في المزرعة يعتمد الجد السقي بالتقطير والسماد العضوي وفرز النفايات، ويربي الدجاج والأبقار. أجب بدقة لتحقيق *التملك الأقصى*:`,
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: '1) *معيار الاستعمال الآمن للمادة والطاقة*: فسّر سبب اصفرار لهب المدفأة واذكر الغاز السام الناتج، ثم اقترح *حلاً للأمن الغازي* و*وسيلة حماية كهربائية* لمضخة الماء.',
							answer: '1) اصفرّ اللهب لحدوث *احتراق غير تام* بسبب نقص الأكسجين، فينتج غاز *أحادي أكسيد الكربون* ($upright("CO")$) القاتل. الحل الغازي: *فتح النوافذ للتهوية وصيانة المدفأة*. الحماية الكهربائية: *تركيب المأخذ الأرضي مع القاطع التفاضلي*.',
							mark: '1.5'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'سند امتحان تقييم المكتسبات الشامل'
						}
					]
				},
				{
					type: 'text',
					content: `2) *معيار الحفاظ على الصحة*: فسّر تسارع تنفس ونبض ${pupil} أثناء العمل، وحدّد حالة العضلتين القابضة والباسطة عند *ثني* ساعده لرفع الصندوق، واذكر أهمية شرب الماء لـ*الكليتين*.`,
					answer: '2) تسارعت الوتيرتان لـ*تزويد العضلات النشطة بالأكسجين والمغذيات*. عند ثني الساعد *تتقلص القابضة وتسترخي الباسطة*. شرب الماء يعوض العرق ويساعد *الكليتين* على *ترشيح الدم* وطرح الفضلات في البول.',
					mark: '1.25'
				},
				{
					type: 'text',
					content: '3) *معيار حماية المحيط والتنمية المستدامة*: بيّن كيف يحقق الجد شروط *الفلاحة المستدامة* وحماية البيئة، ثم صنّف *الدجاجة* و*البقرة* (بيوض/ولود ومكان تطور الجنين).',
					answer: '3) يحقق الجد الفلاحة المستدامة بـ*السقي بالتقطير* (اقتصاد الماء)، *السماد العضوي* (حماية التربة والمياه الجوفية)، و*الفرز الانتقائي وإعادة التدوير*. *الدجاجة*: حيوان بيوض (الجنين في البيضة)، *البقرة*: حيوان ولود (الجنين في رحم الأم).',
					mark: '1.25'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: correctMastery
		};
	}
};

export const SCIENCES_TEMPLATES_5AP_T3: SciencesParameterizedTemplate[] = [
	animalReproductionEmbryoTemplate,
	pollutionRecyclingTemplate,
	sustainableAgricultureTemplate,
	taqyimHealthEnergyTemplate,
	integrationTaqyimMaktasabatTemplate
];
