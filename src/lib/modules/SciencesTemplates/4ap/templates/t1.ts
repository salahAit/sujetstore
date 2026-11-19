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
	svgPlantAndPrimaryDiagram,
	wrapSciencesSvg
} from '../../svg-sciences';

function buildRespiratoryExerciseSvg(direction: 'inhale' | 'exhale', numbered: boolean): string {
	const isInhale = direction === 'inhale';
	const arrowColor = isInhale ? '#2563eb' : '#dc2626';
	return wrapSciencesSvg(
		440,
		235,
		`<rect x="6" y="6" width="428" height="223" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="220" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${esc(isInhale ? 'رسم تخطيطي لمسلك الهواء أثناء الشهيق' : 'رسم تخطيطي لمسلك الهواء أثناء الزفير')}</text>` +
			`<ellipse cx="220" cy="54" rx="20" ry="11" fill="#fde68a" stroke="#b45309" stroke-width="1.8"/>` +
			`<rect x="211" y="65" width="18" height="54" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.8"/>` +
			`<path d="M 216 119 L 178 148 M 224 119 L 262 148" stroke="#0284c7" stroke-width="5" stroke-linecap="round"/>` +
			`<path d="M 184 124 C 138 122, 126 194, 162 208 C 186 216, 198 190, 194 152 Z" fill="#fecdd3" stroke="#e11d48" stroke-width="1.9"/>` +
			`<path d="M 256 124 C 302 122, 314 194, 278 208 C 254 216, 242 190, 246 152 Z" fill="#fecdd3" stroke="#e11d48" stroke-width="1.9"/>` +
			// Motion arrow
			(isInhale
				? `<line x1="196" y1="68" x2="196" y2="110" stroke="${arrowColor}" stroke-width="2.4"/><polygon points="191,106 201,106 196,116" fill="${arrowColor}"/>`
				: `<line x1="196" y1="112" x2="196" y2="70" stroke="${arrowColor}" stroke-width="2.4"/><polygon points="191,74 201,74 196,64" fill="${arrowColor}"/>`) +
			`<line x1="240" y1="54" x2="322" y2="54" stroke="#475569" stroke-width="1.1"/>` +
			calloutBadge(334, 54, '1', '#b45309') +
			`<text x="348" y="58" font-size="10.8" font-weight="bold" fill="#0f172a">${numbered ? '..........' : 'الأنف'}</text>` +
			`<line x1="229" y1="92" x2="322" y2="92" stroke="#475569" stroke-width="1.1"/>` +
			calloutBadge(334, 92, '2', '#0284c7') +
			`<text x="348" y="96" font-size="10.8" font-weight="bold" fill="#0f172a">${numbered ? '..........' : 'الرغامى'}</text>` +
			`<line x1="256" y1="142" x2="322" y2="142" stroke="#475569" stroke-width="1.1"/>` +
			calloutBadge(334, 142, '3', '#0369a1') +
			`<text x="348" y="146" font-size="10.8" font-weight="bold" fill="#0f172a">${numbered ? '..........' : 'قصبة هوائية'}</text>` +
			`<line x1="292" y1="186" x2="322" y2="186" stroke="#475569" stroke-width="1.1"/>` +
			calloutBadge(334, 186, '4', '#e11d48') +
			`<text x="348" y="190" font-size="10.8" font-weight="bold" fill="#0f172a">${numbered ? '..........' : 'الرئتان'}</text>` +
			`<rect x="18" y="96" width="96" height="58" rx="8" fill="${isInhale ? '#eff6ff' : '#fef2f2'}" stroke="${arrowColor}" stroke-width="1.6"/>` +
			`<text x="66" y="118" text-anchor="middle" font-size="11" font-weight="bold" fill="${arrowColor}">${isInhale ? 'دخول الهواء' : 'خروج الهواء'}</text>` +
			`<text x="66" y="138" text-anchor="middle" font-size="10" fill="#334155">${isInhale ? 'يرتفع الصدر' : 'ينخفض الصدر'}</text>`
	);
}

function buildDigestiveExerciseSvg(highlightIdx: number): string {
	const items = [
		{ y: 54, num: '1', name: 'الفم', col: '#d97706' },
		{ y: 90, num: '2', name: 'المرئ', col: '#ea580c' },
		{ y: 128, num: '3', name: 'المعدة', col: '#dc2626' },
		{ y: 170, num: '4', name: 'المعي الدقيق', col: '#ca8a04' },
		{ y: 208, num: '5', name: 'المعي الغليظ', col: '#15803d' }
	];
	let labels = '';
	items.forEach((it, idx) => {
		const isHl = idx === highlightIdx;
		labels += `<line x1="252" y1="${it.y}" x2="318" y2="${it.y}" stroke="${isHl ? '#dc2626' : '#475569'}" stroke-width="${isHl ? 2 : 1.1}"/>`;
		labels += calloutBadge(330, it.y, it.num, isHl ? '#dc2626' : it.col);
		labels += `<text x="345" y="${it.y + 4}" font-size="10.8" font-weight="bold" fill="${isHl ? '#dc2626' : '#0f172a'}">${isHl ? 'عضو مطلوب (؟)' : it.name}</text>`;
	});
	return wrapSciencesSvg(
		440,
		240,
		`<rect x="6" y="6" width="428" height="228" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="220" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">محطات الهضم في الأنبوب الهضمي</text>` +
			`<ellipse cx="215" cy="54" rx="20" ry="10" fill="#fde68a" stroke="#d97706" stroke-width="1.8"/>` +
			`<rect x="208" y="64" width="14" height="38" rx="4" fill="#fed7aa" stroke="#ea580c" stroke-width="1.6"/>` +
			`<path d="M 208 102 C 186 106, 178 140, 210 146 C 240 150, 246 118, 222 102 Z" fill="#fca5a5" stroke="#dc2626" stroke-width="2"/>` +
			`<rect x="182" y="152" width="66" height="40" rx="12" fill="#fef08a" stroke="#ca8a04" stroke-width="1.8"/>` +
			`<path d="M 172 212 L 172 150 L 258 150 L 258 212 L 215 212" fill="none" stroke="#15803d" stroke-width="6.5" stroke-linejoin="round" stroke-linecap="round"/>` +
			labels +
			`<rect x="18" y="88" width="128" height="72" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>` +
			`<text x="82" y="112" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">مسار الغذاء</text>` +
			`<text x="82" y="132" text-anchor="middle" font-size="10" fill="#334155">من الفم إلى المعي الغليظ</text>` +
			`<text x="82" y="149" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">المغذيات تنتقل للدم</text>`
	);
}

function buildCirculationExerciseSvg(pulseRest: number, pulseRun: number): string {
	return wrapSciencesSvg(
		440,
		235,
		`<rect x="6" y="6" width="428" height="223" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="220" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">دوران الدم في الجسم ومضخة القلب</text>` +
			`<rect x="155" y="42" width="130" height="34" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.8"/>` +
			`<text x="220" y="63" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1">الرئتان (تزود بالأكسجين)</text>` +
			`<ellipse cx="220" cy="122" rx="38" ry="24" fill="#fee2e2" stroke="#dc2626" stroke-width="2.2"/>` +
			`<text x="220" y="126" text-anchor="middle" font-size="12" font-weight="bold" fill="#991b1b">القلب</text>` +
			`<rect x="145" y="176" width="150" height="36" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.8"/>` +
			`<text x="220" y="198" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534">أعضاء الجسم (العضلات)</text>` +
			`<path d="M 258 124 C 330 124, 330 194, 295 194" fill="none" stroke="#dc2626" stroke-width="3"/>` +
			`<path d="M 145 194 C 110 194, 110 124, 182 124" fill="none" stroke="#2563eb" stroke-width="3"/>` +
			haloText(`x="366" y="156" text-anchor="middle" font-size="10.5" font-weight="bold"`, '#dc2626', 'شرايين (1)') +
			haloText(`x="74" y="156" text-anchor="middle" font-size="10.5" font-weight="bold"`, '#2563eb', 'أوردة (2)') +
			`<rect x="18" y="42" width="114" height="58" rx="7" fill="#fffbeb" stroke="#d97706" stroke-width="1.4"/>` +
			`<text x="75" y="62" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">نبض الراحة: ${pulseRest}</text>` +
			`<text x="75" y="84" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">نبض الجري: ${pulseRun}</text>`
	);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Respiratory Path & Hygiene (2 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const respiratoryPathTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4ap_t1_respiratory_path',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'human_body',
	titleAr: 'مسلك الهواء في الجهاز التنفسي والقواعد الصحية للتنفس',
	curriculumLessonId: 'sci_lesson_4ap_t1_respiratory_path_hygiene',
	defaultPoints: 2,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const isInhale = seed % 2 === 0;
		const pupil = rng.pick(['أمين', 'سارة', 'يوسف', 'مريم', 'ريان']);
		const svg = buildRespiratoryExerciseSvg(isInhale ? 'inhale' : 'exhale', difficulty !== 'easy');
		const imageUrl = saveSciencesSvgAsset(`sci_4ap_t1_resp_s${seed}`, svg);

		const correctPath = isInhale
			? 'الأنف ← الرغامى ← القصبتان الهوائيتان ← الرئتان'
			: 'الرئتان ← القصبتان الهوائيتان ← الرغامى ← الأنف';

		const mcq = buildUniqueMcqOptions(
			correctPath,
			[
				{
					text: isInhale
						? 'الرئتان ← القصبتان الهوائيتان ← الرغامى ← الأنف'
						: 'الأنف ← الرغامى ← القصبتان الهوائيتان ← الرئتان',
					diagnosticFeedback: isInhale
						? 'هذا هو مسلك هواء الزفير (الخارج) وليس الشهيق (الداخل).'
						: 'هذا هو مسلك هواء الشهيق (الداخل) وليس الزفير (الخارج).'
				},
				{
					text: 'الفم ← المرئ ← المعدة ← الرئتان',
					diagnosticFeedback: 'المرئ والمعدة ينتميان للجهاز الهضمي ولا يمر عبرهما الهواء.'
				},
				{
					text: 'الأنف ← القصبتان الهوائيتان ← الرغامى ← الرئتان',
					diagnosticFeedback: 'تسبق الرغامى القصبتين الهوائيتين لأنها هي التي تتفرع إليهما.'
				}
			],
			rng
		);

		const movementAr = isInhale ? 'الشهيق (دخول الهواء)' : 'الزفير (خروج الهواء)';
		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `أثناء حصة التربية البدنية، قام التلميذ **${pupil}** بحركة **${movementAr}** كما يظهر في الرسم المقابل. ما هو المسلك الصحيح للهواء خلال هذه الحركة؟`,
			questionTextAr: `ما مسلك الهواء الصحيح أثناء ${movementAr}؟`,
			imageUrl,
			imageCaption: `مخطط الجهاز التنفسي أثناء ${isInhale ? 'الشهيق' : 'الزفير'}`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `أثناء **${movementAr}** يسلك الهواء الطريق: **${correctPath}**، و${isInhale ? 'يرتفع القفص الصدري ويكون الهواء غنياً بالأكسجين' : 'ينخفض القفص الصدري ويكون الهواء غنياً بغاز الفحم وبخار الماء'}.`
		};

		const hints: [string, string, string] = [
			`حدّد أولاً هل السهم في الرسم يشير إلى دخول الهواء (شهيق) أم خروجه (زفير).`,
			'تذكّر أعضاء الجهاز التنفسي بالترتيب: الأنف، الرغامى، القصبتان الهوائيتان، الرئتان.',
			isInhale
				? 'في الشهيق يبدأ المسلك من الأنف وينتهي في الرئتين.'
				: 'في الزفير يبدأ المسلك من الرئتين وينتهي بالخروج من الأنف أو الفم.'
		];

		const solutionStepsAr = [
			`نوع الحركة التنفسية الممثلة هو: **${movementAr}**.`,
			`المسلك الصحيح للهواء هو: **${correctPath}**.`,
			`القاعدة الصحية: يجب التنفس من الأنف وتهوية الغرفة والابتعاد عن التدخين والغبار.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 2,
			instruction: `لاحظ الرسم التخطيطي المقابل الذي يمثل حركة *${movementAr}* عند التلميذ ${pupil}، ثم أجب:`,
			content: [
				{
					type: 'columns',
					widths: ['1.3fr', '1.2fr'],
					children: [
						{
							type: 'text',
							content: `1) سمِّ الأعضاء المرقمة في الرسم (1، 2، 3، 4)، ثم اكتب مسلك الهواء أثناء *${isInhale ? 'الشهيق' : 'الزفير'}*.`,
							answer: `1) البيانات: 1- *الأنف*، 2- *الرغامى*، 3- *قصبة هوائية*، 4- *الرئتان*. مسلك الهواء: *${correctPath}*.`,
							mark: '1'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'الجهاز التنفسي ومسلك الهواء'
						}
					]
				},
				{
					type: 'true_false',
					items: [
						{
							q: 'أثناء الشهيق يرتفع القفص الصدري ويدخل هواء غني بغاز الأكسجين.',
							a: 'صحيح',
							c: 'العبارة صحيحة.',
							mark: '0.5'
						},
						{
							q: 'التنفس من الفم في الأماكن المغبرة سلوك صحي يحمي الرئتين.',
							a: 'خاطئ',
							c: 'يجب التنفس من الأنف لأنه ينقي الهواء ويدفئه ويرطبه، وتجنب الأماكن المغبرة.',
							mark: '0.5'
						}
					]
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: correctPath
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Digestive Stations & Food Transformation (2 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const digestiveStationsTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4ap_t1_digestive_stations',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'nutrition_digestion',
	titleAr: 'مسلك الغذاء في الجهاز الهضمي وهضم الأغذية',
	curriculumLessonId: 'sci_lesson_4ap_t1_digestive_path_digestion',
	defaultPoints: 2,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const stations = [
			{
				idx: 0,
				organ: 'الفم',
				role: 'تقطيع الغذاء وطحنه بالأسنان وتبليله باللعاب',
				distractors: ['المرئ', 'المعي الغليظ', 'الرغامى']
			},
			{
				idx: 2,
				organ: 'المعدة',
				role: 'خلط الغذاء وتحويله إلى عصيدة ليّنة',
				distractors: ['المرئ', 'الفم', 'المعي الغليظ']
			},
			{
				idx: 3,
				organ: 'المعي الدقيق',
				role: 'إتمام الهضم وانتقال المغذيات الذائبة إلى الدم',
				distractors: ['المرئ', 'المعي الغليظ', 'الفم']
			},
			{
				idx: 4,
				organ: 'المعي الغليظ',
				role: 'تجميع البقايا غير المهضومة لطرحها كفضلات عبر الشرج',
				distractors: ['المعدة', 'الفم', 'المرئ']
			}
		];
		const chosen = rng.pick(stations);
		const svg = buildDigestiveExerciseSvg(chosen.idx);
		const imageUrl = saveSciencesSvgAsset(`sci_4ap_t1_digest_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			chosen.organ,
			chosen.distractors.map((d) => ({
				text: d,
				diagnosticFeedback: `انتبه: ليس ${d} هو المسؤول عن (${chosen.role}). راجع دور كل محطة في الأنبوب الهضمي.`
			})),
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `في الرسم التخطيطي للجهاز الهضمي المقابل، ما هو العضو المشار إليه باللون الأحمر والذي تتم فيه الوظيفة الآتية: **«${chosen.role}»**؟`,
			questionTextAr: `ما العضو الهضمي المسؤول عن: ${chosen.role}؟`,
			imageUrl,
			imageCaption: 'أعضاء الأنبوب الهضمي بالترتيب',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `العضو المطلوب هو **${chosen.organ}**، حيث يتم فيه: ${chosen.role}.`
		};

		const hints: [string, string, string] = [
			'تذكّر ترتيب أعضاء الأنبوب الهضمي من الأعلى إلى الأسفل: الفم، المرئ، المعدة، المعي الدقيق، المعي الغليظ.',
			'انظر إلى موقع الرقم الملوّن بالأحمر في الرسم التخطيطي.',
			`اربط بين الوظيفة المذكورة (${chosen.role}) واسم المحطة الهضمية الموافقة.`
		];

		const solutionStepsAr = [
			`تحديد موقع العضو رقم ${chosen.idx + 1} في الأنبوب الهضمي.`,
			`الوظيفة الموصوفة (${chosen.role}) تخص **${chosen.organ}**.`,
			`إذن الإجابة الصحيحة هي: **${chosen.organ}**.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 2,
			instruction: 'تأمل مخطط الأنبوب الهضمي المقابل، ثم أجب عن السؤالين الآتيين:',
			content: [
				{
					type: 'columns',
					widths: ['1.3fr', '1.2fr'],
					children: [
						{
							type: 'text',
							content: `1) سمِّ العضو المشار إليه باللون الأحمر في المخطط (الرقم ${chosen.idx + 1})، واذكر وظيفته أثناء الهضم.`,
							answer: `1) العضو هو: *${chosen.organ}*، ووظيفته: *${chosen.role}*.`,
							mark: '1'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'مخطط الأنبوب الهضمي'
						}
					]
				},
				{
					type: 'table',
					headers: ['محطة الهضم', 'التحول الذي يطرأ على الغذاء أو مصيره'],
					cells: [],
					rows: [
						['المعدة', { content: '............................................', answer: 'يتحول الغذاء إلى عصيدة ليّنة', mark: '0.5' }],
						['المعي الدقيق', { content: '............................................', answer: 'يكتمل الهضم وتنتقل المغذيات إلى الدم', mark: '0.5' }]
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
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: chosen.organ
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Blood Circulation (Heart, Arteries, Veins, Pulse) (2 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const bloodCirculationTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4ap_t1_blood_circulation',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'human_body',
	titleAr: 'دوران الدم في الجسم (القلب والأوعية الدموية)',
	curriculumLessonId: 'sci_lesson_4ap_t1_blood_circulation',
	defaultPoints: 2,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const pulseRest = rng.pick([70, 72, 75, 78]);
		const pulseRun = pulseRest + rng.pick([40, 45, 50]);
		const askArtery = seed % 2 === 0;
		const svg = buildCirculationExerciseSvg(pulseRest, pulseRun);
		const imageUrl = saveSciencesSvgAsset(`sci_4ap_t1_circ_s${seed}`, svg);

		const correctText = askArtery
			? 'تنقل الشرايين الدم من القلب إلى الأعضاء حاملاً الأكسجين والمغذيات'
			: 'تعيد الأوردة الدم من الأعضاء إلى القلب في دورة مغلقة لا تتوقف';

		const mcq = buildUniqueMcqOptions(
			correctText,
			[
				{
					text: askArtery
						? 'تعيد الشرايين الدم من الأعضاء إلى المعدة لهضمه'
						: 'تنقل الأوردة الهواء من الأنف إلى الرئتين',
					diagnosticFeedback: 'انتبه: الأوعية الدموية (الشرايين والأوردة) تنقل الدم فقط داخل دورة مغلقة يضخها القلب.'
				},
				{
					text: 'يتوقف دوران الدم تماماً عندما ينام الإنسان ليلاً',
					diagnosticFeedback: 'خطأ! القلب ينبض باستمرار ليلاً ونهاراً، وتقل سرعته قليلاً أثناء الراحة والنوم فقط.'
				},
				{
					text: 'يدور الدم في اتجاهين متعاكسين داخل نفس الوعاء الدموي',
					diagnosticFeedback: 'يدور الدم في اتجاه واحد ثابت داخل دورة مغلقة.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `قاس تلميذ نبضه فوجد $${pulseRest}$ نبضة في الدقيقة أثناء الراحة و$${pulseRun}$ نبضة في الدقيقة بعد الجري. بالاعتماد على مخطط جهاز الدوران المقابل، أيّ عبارة علمية **صحيحة** حول ${askArtery ? '**الشرايين**' : '**الأوردة**'} ودوران الدم؟`,
			questionTextAr: `ما العبارة الصحيحة حول ${askArtery ? 'الشرايين' : 'الأوردة'} ودوران الدم؟`,
			imageUrl,
			imageCaption: 'مخطط الدورة المغلقة للدم وقياس النبض',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `القلب مضخة عضلية تدفع الدم في دورة مغلقة؛ فـ**الشرايين** تنقل الدم من القلب إلى الأعضاء (غني بالأكسجين والمغذيات) و**الأوردة** تعيده إلى القلب.`
		};

		const hints: [string, string, string] = [
			'تأمل اتجاه الأسهم الحمراء (الشرايين) والزرقاء (الأوردة) في المخطط.',
			'الشريان يخرج من القلب نحو الأعضاء، والوريد يعود من الأعضاء نحو القلب.',
			'ينقل الدم الأكسجين والمغذيات إلى الأعضاء ويخلّصها من الفضلات باستمرار.'
		];

		const solutionStepsAr = [
			`القلب هو المضخة التي تحافظ على دوران الدم في اتجاه واحد.`,
			`نبض الراحة ($${pulseRest}$) يرتفع أثناء الجري ($${pulseRun}$) لأن العضلات تحتاج مزيداً من الأكسجين والمغذيات.`,
			`العبارة الصحيحة: **${correctText}**.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 2,
			instruction: `قاس تلميذ عدد دقات قلبه (النبض) فوجد ${pulseRest} نبضة في الدقيقة أثناء الراحة، و${pulseRun} نبضة في الدقيقة بعد الجري. استعن بالمخطط المقابل وأجب:`,
			content: [
				{
					type: 'columns',
					widths: ['1.3fr', '1.2fr'],
					children: [
						{
							type: 'text',
							content: '1) ما دور *القلب* في الجسم؟ وما الفرق بين *الشرايين* (1) و*الأوردة* (2)؟',
							answer: '1) *القلب* مضخة عضلية تضخ الدم باستمرار في دورة مغلقة. *الشرايين* تنقل الدم من القلب إلى الأعضاء، و*الأوردة* تعيد الدم من الأعضاء إلى القلب.',
							mark: '1'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'دوران الدم بين القلب والرئتين والأعضاء'
						}
					]
				},
				{
					type: 'text',
					content: '2) ماذا ينقل الدم إلى أعضاء الجسم؟ ولماذا ارتفع عدد النبضات من ' + pulseRest + ' إلى ' + pulseRun + ' بعد الجري؟',
					answer: '2) ينقل الدم *الأكسجين والمغذيات* إلى الأعضاء ويخلصها من الفضلات. ارتفع النبض بعد الجري لتزويد العضلات النشطة بكمية أكبر من الأكسجين والمغذيات.',
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: correctText
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Healthy Nutrition & Malnutrition Prevention (2.5 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const healthyDietTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4ap_t1_healthy_diet',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'nutrition_digestion',
	titleAr: 'القواعد الصحية للتغذية والوجبة المتوازنة',
	curriculumLessonId: 'sci_lesson_4ap_t1_healthy_nutrition_rules',
	defaultPoints: 2.5,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cases = [
			{
				child: 'وليد',
				habit: 'يكثر يومياً من تناول الحلويات والبطاطا المقلية والمشروبات الغازية دون ممارسة الرياضة',
				disease: 'السمنة وتسوس الأسنان',
				advice: 'الاعتدال في السكريات والدهون وتناول الخضر والفواكه وممارسة الرياضة وتنظيف الأسنان'
			},
			{
				child: 'نور',
				habit: 'اشترت شطيرة مكشوفة معرضة للغبار والحشرات من بائع متجول وأكلتها دون غسل يديها',
				disease: 'التسمم الغذائي',
				advice: 'غسل اليدين قبل الأكل وتجنب الأغذية المكشوفة ومراقبة تاريخ الصلاحية'
			},
			{
				child: 'إسلام',
				habit: 'يهمل فطور الصباح ويتناول وجبات فقيرة جداً خالية من اللحوم والبقول والخضر',
				disease: 'الهزال وفقر الدم والضعف العام',
				advice: 'تناول وجبات منتظمة ومتوازنة تحتوي على أغذية البناء والطاقة والوقاية'
			}
		];
		const chosen = rng.pick(cases);
		const svg = svgPlantAndPrimaryDiagram('balanced_diet');
		const imageUrl = saveSciencesSvgAsset(`sci_4ap_t1_diet_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			chosen.disease,
			cases
				.filter((c) => c.disease !== chosen.disease)
				.map((c) => ({
					text: c.disease,
					diagnosticFeedback: `هذا المرض ناتج عن سلوك مختلف (${c.habit}).`
				}))
				.concat([
					{
						text: 'تحسّن سريع في النمو واللياقة البدنية',
						diagnosticFeedback: 'السلوكات الغذائية الخاطئة تضر الصحة ولا تحسن النمو.'
					}
				]),
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `لاحظنا أن التلميذ(ة) **${chosen.child}** ${chosen.habit}. ما الخطر الصحي الأرجح الذي يهدّد ${chosen.child}؟`,
			questionTextAr: `ما المرض الناتج عن السلوك الغذائي المذكور لـ ${chosen.child}؟`,
			imageUrl,
			imageCaption: 'المجموعات الغذائية الأساسية الثلاث',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `بسبب هذا السلوك (${chosen.habit}) يتعرض ${chosen.child} لـ**${chosen.disease}**؛ والوقاية تكون عبر: ${chosen.advice}.`
		};

		const hints: [string, string, string] = [
			'اقرأ السلوك الغذائي بعناية: هل هو إفراط، أم نقص، أم غياب نظافة؟',
			'الإفراط في الدهون والسكريات يسبب السمنة والتسوس، والغذاء الملوث يسبب التسمم، والنقص يسبب الهزال.',
			'اربط كل سلوك خاطئ بالعاقبة الصحية الموافقة له.'
		];

		const solutionStepsAr = [
			`تحليل سلوك ${chosen.child}: ${chosen.habit}.`,
			`الخطر الصحي الناتج: **${chosen.disease}**.`,
			`النصيحة الوقائية: ${chosen.advice}.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 2.5,
			instruction: `استعن بوثيقة المجموعات الغذائية المقابلة، ثم حلّل حالة التلميذ(ة) ${chosen.child} الذي ${chosen.habit}:`,
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: `1) ما المرض أو الخطر الصحي الذي يهدد ${chosen.child}؟ قدّم له نصيحتين صحيتين لتجنبه.`,
							answer: `1) الخطر الصحي: *${chosen.disease}*. النصيحتان: *${chosen.advice}*.`,
							mark: '1'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'المجموعات الغذائية للوجبة المتوازنة'
						}
					]
				},
				{
					type: 'table',
					headers: ['الغذاء', 'المجموعة الغذائية (بناء / طاقة / وقاية)'],
					cells: [],
					rows: [
						['البيض والعدس والحليب', { content: '............................', answer: 'أغذية البناء والنمو', mark: '0.5' }],
						['الخبز والكسكس وزيت الزيتون', { content: '............................', answer: 'أغذية الطاقة', mark: '0.5' }],
						['البرتقال والسلطة والماء', { content: '............................', answer: 'أغذية الوقاية', mark: '0.5' }]
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
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: chosen.disease
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Integration Situation: Health & Vital Functions of a Primary Pupil (4 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationBodyHealthTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4ap_t1_integration_body_health',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: تكامل التنفس والهضم ودوران الدم لصحة التلميذ',
	curriculumLessonId: 'sci_lesson_4ap_t1_healthy_nutrition_rules',
	defaultPoints: 4,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const pupil = rng.pick(['بلال', 'إيمان', 'أيمن', 'هبة']);
		const wilaya = rng.pick(['الجزائر العاصمة', 'وهران', 'تلمسان', 'سطيف']);

		const svg = svgBioFlowchart({
			title: 'تكامل الوظائف الحيوية الثلاث في جسم الإنسان',
			orientation: 'horizontal',
			width: 470,
			steps: [
				{ label: 'الجهاز التنفسي', sublabel: 'يدخل الأكسجين للدم', color: '#0284c7', bg: '#f0f9ff' },
				{ label: 'الجهاز الهضمي', sublabel: 'يهضم الغذاء لمغذيات', color: '#d97706', bg: '#fffbeb' },
				{ label: 'جهاز الدوران', sublabel: 'القلب يضخ الدم للأعضاء', color: '#dc2626', bg: '#fef2f2' },
				{ label: 'أعضاء نشطة', sublabel: 'صحة ونمو وطاقة', color: '#16a34a', bg: '#f0fdf4' }
			]
		});
		const imageUrl = saveSciencesSvgAsset(`sci_4ap_t1_integ_health_s${seed}`, svg);

		const correctAnswer =
			'يزود الجهاز التنفسي الدم بالأكسجين ويزوده الهضمي بالمغذيات ثم يضخهما القلب إلى العضلات';

		const mcq = buildUniqueMcqOptions(
			correctAnswer,
			[
				{
					text: 'يتولى الجهاز الهضمي وحده ضخ الهواء والغذاء مباشرة إلى العضلات دون دور للدم',
					diagnosticFeedback: 'لا تصل المغذيات ولا الأكسجين للعضلات إلا عبر الدم الذي يضخه القلب.'
				},
				{
					text: 'يكفي تناول المشروبات الغازية والجلوس في غرفة مغلقة للحصول على الطاقة',
					diagnosticFeedback: 'المشروبات الغازية وغلق الغرف سلوكان غير صحيين يضعفان الجسم.'
				},
				{
					text: 'يدخل الغذاء عبر الرغامى والهواء عبر المرئ ليصلا معاً إلى القلب',
					diagnosticFeedback: 'خطأ! الهواء يمر بالرغامى نحو الرئتين، والغذاء يمر بالمرئ نحو المعدة.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `يستعد التلميذ(ة) **${pupil}** من ولاية ${wilaya} لسباق مدرسي للعدو الريفي؛ فتناول فطوراً متوازناً وتنفس هواءً نقياً من أنفه، وأحسّ بتسارع دقات قلبه أثناء الجري. كيف تتعاون أجهزته الحيوية لإنجاح نشاطه؟`,
			questionTextAr: `كيف يتعاون الجهاز التنفسي والهضمي وجهاز الدوران أثناء نشاط ${pupil}؟`,
			imageUrl,
			imageCaption: 'مخطط تعاون الأجهزة الحيوية في الجسم',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `تتعاون الأجهزة الثلاثة بتكامل تام: يوفر **الجهاز التنفسي** الأكسجين، ويهضم **الجهاز الهضمي** الغذاء إلى مغذيات في المعي الدقيق، وينقلهما **الدم** بفضل مضخة **القلب** إلى العضلات.`
		};

		const hints: [string, string, string] = [
			'حدّد ما يقدمه كل جهاز: الرئتان (الأكسجين)، المعي الدقيق (المغذيات)، القلب والأوعية (النقل).',
			'تذكّر أن التنفس من الأنف والتهوية والوجبة المتوازنة شروط أساسية للنشاط البدني.',
			'اختر الإجابة التي تجمع دور الأجهزة الثلاثة بشكل علمي متكامل.'
		];

		const solutionStepsAr = [
			'الجهاز التنفسي يزود الدم بغاز الأكسجين عبر الرئتين.',
			'الجهاز الهضمي يحوّل الفطور المتوازن إلى مغذيات تنتقل إلى الدم في المعي الدقيق.',
			'القلب يضخ الدم عبر الشرايين لإيصال الأكسجين والمغذيات إلى العضلات.'
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 4,
			instruction: `قبل المشاركة في دورة رياضية مدرسية بولاية ${wilaya}، لاحظ التلميذ(ة) ${pupil} أن زميله يشعر بالتعب وضيق التنفس لأنه لم يتناول فطور الصباح وأكثر من الحلويات بالأمس، كما يتنفس من فمه في قاعة غير مهوّاة. استعن بالسند المقابل وأجب:`,
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: '1) اشرح كيف يستفيد جسم التلميذ من *فطور الصباح* (اذكر مسلك الغذاء والعضو الذي تنتقل منه المغذيات إلى الدم).',
							answer: '1) يسلك الغذاء: *الفم ← المرئ ← المعدة ← المعي الدقيق*، وفي *المعي الدقيق* يكتمل هضمه وتنتقل المغذيات إلى الدم.',
							mark: '1.5'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'السند: تكامل الأجهزة الحيوية'
						}
					]
				},
				{
					type: 'text',
					content: '2) ما دور *القلب* و*الشرايين* في تزويد عضلات التلميذ بما تحتاجه أثناء الرياضة؟',
					answer: '2) يعمل *القلب* كمضخة تدفع الدم في دورة مغلقة، وتنقل *الشرايين* الدم المحمّل بالأكسجين والمغذيات من القلب إلى العضلات.',
					mark: '1'
				},
				{
					type: 'text',
					content: '3) قدّم لزميل ${pupil} *ثلاث نصائح صحية* (واحدة للتنفس، واثنتين للتغذية) ليحافظ على صحته ونشاطه.'.replace(
						'${pupil}',
						pupil
					),
					answer: '3) للتنفس: *التنفس من الأنف وتهوية القاعة والابتعاد عن الدخان والغبار*. للتغذية: *تناول فطور صباح متوازن بانتظام، وتجنب الإفراط في الحلويات مع شرب الماء وتنظيف الأسنان*.',
					mark: '1.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: correctAnswer
		};
	}
};

export const SCIENCES_TEMPLATES_4AP_T1: SciencesParameterizedTemplate[] = [
	respiratoryPathTemplate,
	digestiveStationsTemplate,
	bloodCirculationTemplate,
	healthyDietTemplate,
	integrationBodyHealthTemplate
];
