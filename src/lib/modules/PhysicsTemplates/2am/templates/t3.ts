import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import { savePhysicsSvgAsset, wrapPhysicsSvg } from '../../svg-physics';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';

function svgMagnetsInteraction2am(leftLeft: 'N' | 'S', leftRight: 'N' | 'S', interact: 'تنافر' | 'تجاذب'): string {
	const colLL = leftLeft === 'N' ? '#dc2626' : '#2563eb';
	const colLR = leftRight === 'N' ? '#dc2626' : '#2563eb';
	const body = `
		<text x="180" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">تحديد قطبي مغناطيس مجهول (ظاهرة: ${interact})</text>
		<rect x="26" y="60" width="52" height="28" fill="${colLL}" stroke="#0f172a"/>
		<rect x="78" y="60" width="52" height="28" fill="${colLR}" stroke="#0f172a"/>
		<text x="52" y="79" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">${leftLeft}</text>
		<text x="104" y="79" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">${leftRight}</text>
		<text x="78" y="106" text-anchor="middle" font-size="10.5" fill="#334155">مغناطيس معلوم</text>
		<text x="180" y="79" text-anchor="middle" font-size="12" font-weight="bold" fill="${interact === 'تنافر' ? '#dc2626' : '#16a34a'}">${interact === 'تنافر' ? '◄──  ──►' : '──►  ◄──'}</text>
		<text x="180" y="100" text-anchor="middle" font-size="11" font-weight="bold" fill="${interact === 'تنافر' ? '#dc2626' : '#16a34a'}">${interact}</text>
		<rect x="230" y="60" width="52" height="28" fill="#cbd5e1" stroke="#0f172a"/>
		<rect x="282" y="60" width="52" height="28" fill="#cbd5e1" stroke="#0f172a"/>
		<text x="256" y="79" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">A</text>
		<text x="308" y="79" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">B</text>
		<text x="282" y="106" text-anchor="middle" font-size="10.5" fill="#334155">مغناطيس مجهول AB</text>
	`;
	return wrapPhysicsSvg(360, 128, body);
}

function svgMagnetization2am(method: 'stroke' | 'touch' | 'current'): string {
	let body = `<text x="180" y="18" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">تجربة تمغنط قضيب معدني</text>`;
	if (method === 'stroke') {
		body += `
			<rect x="85" y="96" width="190" height="14" rx="2" fill="#64748b" stroke="#0f172a"/>
			<text x="180" y="128" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">قضيب فولاذي</text>
			<rect x="155" y="42" width="24" height="38" fill="#dc2626" stroke="#0f172a"/>
			<text x="167" y="66" text-anchor="middle" font-size="11" font-weight="bold" fill="#fff">N</text>
			<path d="M120 62 Q180 34 245 62" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#mgArr)"/>
			<text x="180" y="34" text-anchor="middle" font-size="10.5" fill="#991b1b">الدلك في جهة واحدة</text>
		`;
	} else if (method === 'touch') {
		body += `
			<rect x="145" y="34" width="70" height="22" fill="#dc2626" stroke="#0f172a"/>
			<text x="180" y="50" text-anchor="middle" font-size="11" font-weight="bold" fill="#fff">مغناطيس (N)</text>
			<rect x="168" y="58" width="24" height="42" fill="#94a3b8" stroke="#0f172a"/>
			<text x="236" y="82" font-size="10.5" font-weight="bold" fill="#334155">مسمار حديدي</text>
			<circle cx="180" cy="112" r="7" fill="#cbd5e1" stroke="#334155"/>
			<text x="236" y="116" font-size="10.5" font-weight="bold" fill="#16a34a">مشبك ورقي</text>
		`;
	} else {
		body += `
			<rect x="115" y="64" width="130" height="18" rx="3" fill="#94a3b8" stroke="#0f172a"/>
			<path d="M126 60 Q135 48 144 73 Q153 98 162 73 Q171 48 180 73 Q189 98 198 73 Q207 48 216 73 Q225 98 234 73" fill="none" stroke="#b45309" stroke-width="2.4"/>
			<text x="180" y="114" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">وشيعة يمر بها تيار مستمر + نواة حديدية</text>
		`;
	}
	body += `<defs><marker id="mgArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#dc2626"/></marker></defs>`;
	return wrapPhysicsSvg(360, 140, body);
}

function svgFieldLines2am(leftPole: 'N' | 'S', rightPole: 'N' | 'S'): string {
	const colL = leftPole === 'N' ? '#dc2626' : '#2563eb';
	const colR = rightPole === 'N' ? '#dc2626' : '#2563eb';
	const arrowX = leftPole === 'N' ? 'M176,34 L186,38 L176,42' : 'M184,34 L174,38 L184,42';
	const arrowX2 = leftPole === 'N' ? 'M176,134 L186,138 L176,142' : 'M184,134 L174,138 L184,142';
	const body = `
		<text x="180" y="18" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">الحقل المغناطيسي لمغناطيس مستقيم</text>
		<rect x="115" y="74" width="65" height="28" fill="${colL}" stroke="#0f172a"/>
		<rect x="180" y="74" width="65" height="28" fill="${colR}" stroke="#0f172a"/>
		<text x="147" y="93" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">${leftPole}</text>
		<text x="212" y="93" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">${rightPole}</text>
		<path d="M122 74 C90 26, 270 26, 238 74" fill="none" stroke="#475569" stroke-width="1.6" stroke-dasharray="4,2"/>
		<path d="M122 102 C90 150, 270 150, 238 102" fill="none" stroke="#475569" stroke-width="1.6" stroke-dasharray="4,2"/>
		<path d="${arrowX} Z" fill="#dc2626"/>
		<path d="${arrowX2} Z" fill="#dc2626"/>
		<circle cx="180" cy="38" r="9" fill="#fff" stroke="#0f172a" stroke-width="1.3"/>
		<text x="180" y="28" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">إبرة ممغنطة</text>
	`;
	return wrapPhysicsSvg(360, 160, body);
}

function svgLaplaceRail2am(topPole: 'N' | 'S', botPole: 'N' | 'S', dirRight: boolean): string {
	const topCol = topPole === 'N' ? '#dc2626' : '#2563eb';
	const botCol = botPole === 'N' ? '#dc2626' : '#2563eb';
	const body = `
		<text x="180" y="18" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">تجربة سكة لابلاص (ناقل + حقل مغناطيسي)</text>
		<line x1="65" y1="78" x2="295" y2="78" stroke="#475569" stroke-width="2.4"/>
		<line x1="65" y1="114" x2="295" y2="114" stroke="#475569" stroke-width="2.4"/>
		<rect x="155" y="34" width="50" height="20" fill="${topCol}"/><text x="180" y="48" text-anchor="middle" font-size="11" font-weight="bold" fill="#fff">${topPole}</text>
		<rect x="155" y="128" width="50" height="20" fill="${botCol}"/><text x="180" y="142" text-anchor="middle" font-size="11" font-weight="bold" fill="#fff">${botPole}</text>
		<line x1="180" y1="70" x2="180" y2="122" stroke="#b45309" stroke-width="4.5"/>
		<text x="180" y="64" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#92400e">ساق نحاسية</text>
		${
			dirRight
				? `<path d="M192 96 L245 96" stroke="#16a34a" stroke-width="2.4"/><polygon points="243,91 251,96 243,101" fill="#16a34a"/><text x="272" y="100" font-size="11" font-weight="bold" fill="#15803d">حركة</text>`
				: `<path d="M168 96 L115 96" stroke="#16a34a" stroke-width="2.4"/><polygon points="117,91 109,96 117,101" fill="#16a34a"/><text x="86" y="100" font-size="11" font-weight="bold" fill="#15803d">حركة</text>`
		}
	`;
	return wrapPhysicsSvg(360, 158, body);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Magnets, Magnetic Materials, Poles & Attraction/Repulsion
// ═══════════════════════════════════════════════════════════════════════════════
const magnetsPolesTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2am_t3_magnets_poles',
	grade: '2am',
	trimesterId: 't3',
	domain: 'electromagnetism',
	titleAr: 'المغانط والأقطاب والتجاذب والتنافر والمواد المغناطيسية',
	curriculumLessonId: 'phy_lesson_2am_t3_magnets_magnetization',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const leftRight: 'N' | 'S' = rng.pick(['N', 'S']);
		const leftLeft: 'N' | 'S' = leftRight === 'N' ? 'S' : 'N';
		const interact: 'تنافر' | 'تجاذب' = difficulty === 'easy' ? 'تنافر' : rng.pick(['تنافر', 'تجاذب']);

		const poleA: 'N' | 'S' = interact === 'تنافر' ? leftRight : leftRight === 'N' ? 'S' : 'N';
		const poleB: 'N' | 'S' = poleA === 'N' ? 'S' : 'N';
		const poleName = (p: 'N' | 'S') => (p === 'N' ? 'شمالي ($N$)' : 'جنوبي ($S$)');
		const poleNamePlain = (p: 'N' | 'S') => (p === 'N' ? 'شمالي (N)' : 'جنوبي (S)');

		const svg = svgMagnetsInteraction2am(leftLeft, leftRight, interact);
		const imageUrl = savePhysicsSvgAsset(`phy_2am_t3_poles_${difficulty}_s${seed}`, svg);

		const correctText = `الطرف $A$ قطب ${poleName(poleA)} والطرف $B$ قطب ${poleName(poleB)}`;
		const wrongSwap = `الطرف $A$ قطب ${poleName(poleB)} والطرف $B$ قطب ${poleName(poleA)}`;

		const mcq = buildUniqueMcqOptions(
			correctText,
			[
				{
					text: wrongSwap,
					diagnosticFeedback:
						interact === 'تنافر'
							? `التنافر يحدث بين القطبين المتماثلين! بما أن القطب المقابل هو ${leftRight}، فإن $A$ يجب أن يكون ${leftRight} أيضاً.`
							: `التجاذب يحدث بين القطبين المختلفين! بما أن القطب المقابل هو ${leftRight}، فإن $A$ يجب أن يكون ${poleA}.`
				},
				{
					text: 'كلا الطرفين $A$ و $B$ قطب شمالي ($N$)',
					diagnosticFeedback: 'كل مغناطيس يملك قطباً شمالياً وآخر جنوبياً مختلفين حتماً.'
				},
				{
					text: 'المغناطيس $AB$ لا يملك أقطاباً محددة',
					diagnosticFeedback: 'لكل مغناطيس قطبان ثابتان $N$ و $S$.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `نقرّب القطب (${leftRight}) لمغناطيس معلوم من الطرف $A$ لمغناطيس مجهول $AB$ كما في الشكل، فنلاحظ حدوث **${interact}**. ما نوع كل من القطبين $A$ و $B$؟`,
				questionTextAr: `قرّبنا قطباً ${leftRight} من الطرف A فحدث ${interact}. حدّد القطبين A و B.`,
				imageUrl,
				imageCaption: 'التفاعل بين قطبي مغناطيسين',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `القطبان المتماثلان يتنافران والمختلفان يتجاذبان؛ بما أنه حدث ${interact} مع القطب ${leftRight} فإن $A$ هو ${poleName(poleA)} وبالتالي $B$ هو ${poleName(poleB)}.`
			},
			sujetExercise: {
				points: 6,
				instruction: 'أجرى أستاذ الفيزياء نشاطاً مخبرياً حول تصنيف المواد وخواص المغانط.',
				content: [
					{
						type: 'table',
						headers: ['الجسم', 'الحديد', 'النحاس', 'الفولاذ', 'الألمنيوم', 'النيكل', 'الزجاج'],
						cells: [],
						rows: [
							[
								'التصنيف (مغناطيسي / لا مغناطيسي)',
								{ content: '........', answer: 'مغناطيسي' },
								{ content: '........', answer: 'لا مغناطيسي' },
								{ content: '........', answer: 'مغناطيسي' },
								{ content: '........', answer: 'لا مغناطيسي' },
								{ content: '........', answer: 'مغناطيسي' },
								{ content: '........', answer: 'لا مغناطيسي' }
							]
						],
						headerBackground: true,
						borders: 'grid',
						width: 'full'
					},
					{
						type: 'text',
						content: '1) صنّف المواد المذكورة في الجدول أعلاه إلى مواد مغناطيسية ومواد لا مغناطيسية.',
						answer: '1) المواد المغناطيسية: الحديد، الفولاذ، النيكل (والكوبالت). المواد اللا مغناطيسية: النحاس، الألمنيوم، الزجاج.',
						mark: '2'
					},
					{
						type: 'columns',
						widths: ['1.4fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `2) قرّبنا القطب ($${leftRight}$) لمغناطيس معلوم من الطرف $A$ لمغناطيس مجهول $A B$ كما في الشكل، فلاحظنا حدوث **${interact}**.\n\nحدّد نوع كل من القطب $A$ والقطب $B$ مع التعليل.`,
								answer: `2) القطب $A$ هو قطب ${poleNamePlain(poleA)}، والقطب $B$ هو قطب ${poleNamePlain(poleB)}. التعليل: ${interact === 'تنافر' ? 'القطبان المتماثلان يتنافران' : 'القطبان المختلفان يتجاذبان'}.`,
								mark: '2.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'اختبار قطبي المغناطيس AB'
							}
						]
					},
					{
						type: 'text',
						content: '3) إذا انكسر المغناطيس المجهول $A B$ إلى نصفين من منتصفه، هل نحصل على قطب شمالي منفرد وقطب جنوبي منفرد؟ علّل.',
						answer: '3) لا، لا يمكن فصل قطبي المغناطيس؛ بل نحصل على مغناطيسين جديدين كاملين، لكل منهما قطب شمالي (N) وقطب جنوبي (S).',
						mark: '1.5'
					}
				]
			},
			hints: [
				'المواد المغناطيسية هي الحديد، الفولاذ، النيكل، والكوبالت فقط.',
				'القطبان المتماثلان يتنافران والقطبان المختلفان يتجاذبان.',
				'عند كسر مغناطيس يظهر قطبان جديدان في موضع الكسر.'
			],
			solutionStepsAr: [
				'الحديد والفولاذ والنيكل مواد مغناطيسية، بينما النحاس والألمنيوم والزجاج لا مغناطيسية.',
				`بما أنه حدث ${interact} مع ${leftRight} فإن $A$ هو ${poleName(poleA)} و$B$ هو ${poleName(poleB)}.`,
				'كل جزء من مغناطيس مكسور يصبح مغناطيساً كاملاً بقطبين N و S.'
			],
			finalAnswer: `A: ${poleA}, B: ${poleB}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Magnetization Methods & Temporary vs Permanent Magnets
// ═══════════════════════════════════════════════════════════════════════════════
const magnetizationMethodsTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2am_t3_magnetization_methods',
	grade: '2am',
	trimesterId: 't3',
	domain: 'electromagnetism',
	titleAr: 'طرق التمغنط والتمييز بين الحديد اللين والفولاذ',
	curriculumLessonId: 'phy_lesson_2am_t3_magnets_magnetization',
	defaultPoints: 6,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const methods: Array<{
			kind: 'stroke' | 'touch' | 'current';
			nameAr: string;
			material: 'الفولاذ' | 'الحديد اللين';
			tempPerm: 'دائم' | 'مؤقت';
			detail: string;
		}> = [
			{
				kind: 'stroke',
				nameAr: 'التمغنط بالدلك',
				material: 'الفولاذ',
				tempPerm: 'دائم',
				detail: 'يُدلك القضيب الفولاذي في جهة واحدة وبانتظام بقطب مغناطيس، فيكتسب تمغنطاً دائماً'
			},
			{
				kind: 'touch',
				nameAr: 'التمغنط باللمس',
				material: 'الحديد اللين',
				tempPerm: 'مؤقت',
				detail: 'عند إبعاد المغناطيس عن مسمار الحديد اللين يفقد تمغنطه وتسقط المشابك بسرعة'
			},
			{
				kind: 'current',
				nameAr: 'التمغنط بالتيار الكهربائي',
				material: 'الحديد اللين',
				tempPerm: 'مؤقت',
				detail: 'يتمغنط قلب الحديد اللين عند غلق دارة الوشيعة ويفقد تمغنطه فور فتح القاطعة'
			}
		];
		const chosen =
			difficulty === 'easy' ? methods[0] : difficulty === 'hard' ? methods[2] : rng.pick(methods);
		const svg = svgMagnetization2am(chosen.kind);
		const imageUrl = savePhysicsSvgAsset(`phy_2am_t3_magmethod_${difficulty}_s${seed}`, svg);

		const correctText = `${chosen.nameAr} — وتمغنط ${chosen.material} يكون ${chosen.tempPerm}اً`;
		const mcq = buildUniqueMcqOptions(
			correctText,
			[
				{
					text: `${chosen.nameAr} — وتمغنط ${chosen.material} يكون ${chosen.tempPerm === 'دائم' ? 'مؤقت' : 'دائم'}اً`,
					diagnosticFeedback:
						chosen.material === 'الفولاذ'
							? 'الفولاذ يحتفظ بمغنطته مدة طويلة (مغناطيس دائم)!'
							: 'الحديد اللين يفقد مغنطته سريعاً بزوال المؤثر (مغناطيس مؤقت)!'
				},
				{
					text: `${chosen.kind === 'stroke' ? 'التمغنط بالتيار الكهربائي' : 'التمغنط بالدلك'} — وتمغنط ${chosen.material} يكون ${chosen.tempPerm}اً`,
					diagnosticFeedback: 'تأمل الصورة التجريبية لتحديد طريقة التمغنط المستعملة بدقة.'
				},
				{
					text: 'لا يمكن مغنطة الحديد أو الفولاذ بهذه الطريقة',
					diagnosticFeedback: 'طرق التمغنط الثلاث المقررة هي: اللمس، الدلك، والتيار الكهربائي.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `تُظهر التجربة الموضحة في الشكل عملية مغنطة قضيب من **${chosen.material}**. ما اسم طريقة التمغنط ونوع التمغنط الناتج؟`,
				questionTextAr: `حدّد طريقة التمغنط ونوعه لقضيب من ${chosen.material}.`,
				imageUrl,
				imageCaption: 'تجربة التمغنط',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `${chosen.detail}.`
			},
			sujetExercise: {
				points: 6,
				instruction: 'أردنا مغنطة قضيبين معدنيين متماثلين في الشكل: الأول من الحديد اللين والثاني من الفولاذ.',
				content: [
					{
						type: 'columns',
						widths: ['1.4fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) سمّ طريقة التمغنط الممثلة في الشكل المقابل، واذكر الطريقتين الأخريين لمغنطة الحديد والفولاذ.`,
								answer: `1) الطريقة الممثلة هي: ${chosen.nameAr}.\n\nالطريقتان الأخريان: ${methods.filter((m) => m.kind !== chosen.kind).map((m) => m.nameAr).join('، و')}.`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: chosen.nameAr
							}
						]
					},
					{
						type: 'text',
						content: '2) بعد إزالة المؤثر المغناطيسي (المغناطيس أو التيار)، احتفظ قضيب الفولاذ بقدرته على جذب المسامير بينما فقد قضيب الحديد اللين هذه القدرة فوراً.\n\nأ) حدّد نوع التمغنط (دائم / مؤقت) في كل من الحديد اللين والفولاذ.\n\nب) إذا استعملنا طريقة الدلك، فما الشرط الواجب احترامه أثناء الدلك؟',
						answer: '2) أ) الحديد اللين: تمغنط مؤقت. الفولاذ: تمغنط دائم.\n\nب) يجب دلك القضيب في جهة واحدة فقط وبانتظام عدة مرات.',
						mark: '2.5'
					},
					{
						type: 'text',
						content: '3) لصناعة رافعة كهرومغناطيسية ترفع السيارات الحديدية ثم تتركها عند قطع التيار، أيّ المعدنين نختار لنواتها: الحديد اللين أم الفولاذ؟ علّل.',
						answer: '3) نختار الحديد اللين لأنه يتمغنط بسرعة عند مرور التيار ويفقد تمغنطه فور انقطاع التيار فتسقط السيارات المرفوعة.',
						mark: '1.5'
					}
				]
			},
			hints: [
				'طرق التمغنط هي: باللمس، بالدلك، وبالتيار الكهربائي.',
				'عند الدلك نحرّك المغناطيس في جهة واحدة فقط.',
				'الحديد اللين تمغنطه مؤقت، والفولاذ تمغنطه دائم.'
			],
			solutionStepsAr: [
				`الطريقة: ${chosen.nameAr}.`,
				'الحديد اللين يكتسب تمغنطاً مؤقتاً، والفولاذ يكتسب تمغنطاً دائماً.',
				'الرافعة الكهرومغناطيسية تستعمل الحديد اللين ليفقد تمغنطه عند قطع التيار.'
			],
			finalAnswer: correctText
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Magnetic Field of a Magnet, Spectrum & Compass / Earth Field
// ═══════════════════════════════════════════════════════════════════════════════
const magneticFieldCompassTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2am_t3_magnetic_field_compass',
	grade: '2am',
	trimesterId: 't3',
	domain: 'electromagnetism',
	titleAr: 'الحقل المغناطيسي والطيف المغناطيسي والبوصلة',
	curriculumLessonId: 'phy_lesson_2am_t3_magnetic_field_magnet',
	defaultPoints: 6,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const leftPole: 'N' | 'S' = difficulty === 'easy' ? 'N' : rng.pick(['N', 'S']);
		const rightPole: 'N' | 'S' = leftPole === 'N' ? 'S' : 'N';
		const svg = svgFieldLines2am(leftPole, rightPole);
		const imageUrl = savePhysicsSvgAsset(`phy_2am_t3_field_${difficulty}_s${seed}`, svg);

		const arrowDirAr = leftPole === 'N' ? 'من اليسار إلى اليمين (نحو القطب S)' : 'من اليمين إلى اليسار (نحو القطب S)';
		const wrongDirAr = leftPole === 'N' ? 'من اليمين إلى اليسار (نحو القطب N)' : 'من اليسار إلى اليمين (نحو القطب N)';

		const mcq = buildUniqueMcqOptions(
			arrowDirAr,
			[
				{
					text: wrongDirAr,
					diagnosticFeedback: 'خطوط الحقل المغناطيسي تخرج من القطب الشمالي ($N$) وتدخل في القطب الجنوبي ($S$) خارج المغناطيس، لا العكس!'
				},
				{
					text: 'تتجه الخطوط نحو منتصف المغناطيس دائماً',
					diagnosticFeedback: 'الحقل أشد عند القطبين، والخطوط تمتد من $N$ إلى $S$.'
				},
				{
					text: 'خطوط الحقل المغناطيسي ليس لها جهة محددة',
					diagnosticFeedback: 'اتفق الفيزيائيون على جهة محددة لخطوط الحقل تكشف عنها الإبرة الممغنطة.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `يوضح الشكل خطوط الطيف المغناطيسي لمغناطيس مستقيم قطبه الأيسر (${leftPole}) وقطبه الأيمن (${rightPole}). إلى أي جهة يشير القطب الشمالي للإبرة الممغنطة الموضوعة فوق المغناطيس؟`,
				questionTextAr: `إلى أي جهة يشير القطب الشمالي للإبرة الممغنطة خارج المغناطيس (${leftPole} - ${rightPole})؟`,
				imageUrl,
				imageCaption: 'الطيف المغناطيسي وجهة خطوط الحقل',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `خارج المغناطيس، تتجه خطوط الحقل من القطب الشمالي ($N$) إلى القطب الجنوبي ($S$)، أي ${arrowDirAr}.`
			},
			sujetExercise: {
				points: 6,
				instruction: 'لدراسة الحقل المغناطيسي لمغناطيس مستقيم، نضع فوقه ورقاً مقوّى وننثر عليه مسحوقاً معدنياً ثم نضع إبرة ممغنطة.',
				content: [
					{
						type: 'columns',
						widths: ['1.4fr', '1fr'],
						children: [
							{
								type: 'text',
								content: '1) ما المادة المعدنية المنثورة فوق الورق المقوّى؟ وماذا نسمّي الشكل المنتظم الذي تصطف وفقه؟ وأين يكون الحقل أشد؟',
								answer: '1) المادة هي برادة الحديد. يُسمى الشكل الطيف المغناطيسي. يكون الحقل أشد عند القطبين حيث تتكثف البرادة.',
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'خطوط الحقل المغناطيسي'
							}
						]
					},
					{
						type: 'text',
						content: `2) بناءً على الشكل (حيث القطب الأيسر ${leftPole} والأيمن ${rightPole})، حدّد جهة خطوط الحقل المغناطيسي خارج المغناطيس، واذكر كيف نتحقق من ذلك باستعمال الإبرة الممغنطة.`,
						answer: `2) تتجه خطوط الحقل خارج المغناطيس من القطب الشمالي (N) نحو القطب الجنوبي (S)، أي ${arrowDirAr}. نتحقق من ذلك بوضع إبرة ممغنطة فتصطف مماسة للخط ويشير قطبها الشمالي في جهة الخط.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: '3) بعيداً عن أي مغناطيس، لماذا تتخذ إبرة البوصلة اتجاهاً ثابتاً؟ وما القاعدة الواجب احترامها عند استعمال البوصلة لتحديد الشمال الجغرافي؟',
						answer: '3) بسبب وجود الحقل المغناطيسي الأرضي (تتصرف الأرض كمغناطيس ضخم). يجب إبعاد البوصلة عن المغانط وقطع الحديد والأجهزة الكهربائية حتى لا تنحرف.',
						mark: '1.5'
					}
				]
			},
			hints: [
				'تُستخدم برادة الحديد لإظهار الطيف المغناطيسي.',
				'تخرج خطوط الحقل من القطب N وتدخل في القطب S خارج المغناطيس.',
				'الأرض تمتلك حقلاً مغناطيسياً يوجّه إبرة البوصلة نحو الشمال الجغرافي.'
			],
			solutionStepsAr: [
				'برادة الحديد تظهر الطيف المغناطيسي وتتركز عند القطبين.',
				`جهة خطوط الحقل من N إلى S (${arrowDirAr}).`,
				'البوصلة تتوجه بالحقل المغناطيسي الأرضي ويجب إبعادها عن المعادن المغناطيسية.'
			],
			finalAnswer: arrowDirAr
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Oersted, Solenoid/Electromagnet, Laplace Force & Electric Motor Principle
// ═══════════════════════════════════════════════════════════════════════════════
const oerstedCoilLaplaceTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2am_t3_oersted_coil_laplace',
	grade: '2am',
	trimesterId: 't3',
	domain: 'electromagnetism',
	titleAr: 'تجربة أورستد والوشيعة وقوة لابلاص ومبدأ المحرك الكهربائي',
	curriculumLessonId: 'phy_lesson_2am_t3_magnetic_field_current_motor',
	defaultPoints: 6,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const topPole: 'N' | 'S' = rng.pick(['N', 'S']);
		const botPole: 'N' | 'S' = topPole === 'N' ? 'S' : 'N';
		const dirRight = rng.pick([true, false]);
		const initialDir = dirRight ? 'نحو اليمين' : 'نحو اليسار';
		const reversedDir = dirRight ? 'نحو اليسار' : 'نحو اليمين';

		const svg = svgLaplaceRail2am(topPole, botPole, dirRight);
		const imageUrl = savePhysicsSvgAsset(`phy_2am_t3_laplace_${difficulty}_s${seed}`, svg);

		const reverseBoth = difficulty === 'hard';
		const correctText = reverseBoth
			? `تتحرك الساق في نفس الجهة الأولى (${initialDir})`
			: `تنعكس جهة حركة الساق وتتحرك ${reversedDir}`;

		const mcq = buildUniqueMcqOptions(
			correctText,
			reverseBoth
				? [
						{
							text: `تنعكس جهة حركة الساق وتتحرك ${reversedDir}`,
							diagnosticFeedback: 'انتبه: عكسنا جهة التيار وَعكسنا قطبي المغناطيس معاً! عكس عاملين معاً يرجع الحركة للجهة الأصلية.'
						},
						{
							text: 'تتوقف الساق عن الحركة تماماً',
							diagnosticFeedback: 'الدارة ما زالت مغلقة والمغناطيس موجود؛ فتستمر قوة لابلاص في تحريك الساق.'
						},
						{
							text: 'تصعد الساق شاقولياً نحو القطب العلوي',
							diagnosticFeedback: 'النحاس لا ينجذب للمغناطيس، والساق تتدحرج أفقياً على السكة.'
						}
				  ]
				: [
						{
							text: `تستمر الساق في التحرك ${initialDir} نفسها`,
							diagnosticFeedback: 'عكس قطبي البطارية يعكس جهة التيار، وبالتالي يعكس جهة قوة لابلاص!'
						},
						{
							text: 'تتوقف الساق عن الحركة لأن التيار انعكس',
							diagnosticFeedback: 'عكس التيار يغيّر جهة القوة لا يلغيها.'
						},
						{
							text: 'تنجذب الساق وتلتصق بقطب المغناطيس',
							diagnosticFeedback: 'الساق من النحاس وهي مادة لا مغناطيسية لا تنجذب للمغناطيس.'
						}
				  ],
			rng
		);

		const qPrompt = reverseBoth
			? `في تجربة سكة لابلاص الموضحة، تدحرجت الساق النحاسية **${initialDir}**. إذا عكسنا قطبي المولد وقلبنا قطبي المغناطيس ($N$ مكان $S$) **في الوقت نفسه**، كيف تتحرك الساق؟`
			: `في تجربة سكة لابلاص الموضحة، تدحرجت الساق النحاسية **${initialDir}** عند غلق القاطعة. ماذا يحدث إذا عكسنا توصيل قطبي المولد الكهربائي فقط؟`;

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qPrompt,
				questionTextAr: qPrompt,
				imageUrl,
				imageCaption: 'تجربة سكة لابلاص',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: reverseBoth
					? `عكس جهة التيار وعكس قطبي المغناطيس معاً يلغيان أثر بعضهما في الاتجاه، فتبقى الحركة ${initialDir}.`
					: `عند عكس جهة التيار وحدها تنعكس جهة قوة لابلاص، فتتحرك الساق ${reversedDir}.`
			},
			sujetExercise: {
				points: 6,
				instruction: 'أنجز التلاميذ تجربتين لإبراز العلاقة بين التيار الكهربائي المستمر والحقل المغناطيسي.',
				content: [
					{
						type: 'text',
						content: 'التجربة 1 (تجربة أورستد): وضعنا سلكاً نحيلاً مستقيماً فوق إبرة ممغنطة، وعند غلق القاطعة ومرور تيار مستمر انحرفت الإبرة.\n\n1) ماذا يثبت انحراف الإبرة؟ وماذا يحدث إذا فتحنا القاطعة؟ وإذا عكسنا جهة التيار؟',
						answer: '1) يثبت أن التيار الكهربائي المستمر يولّد حقلاً مغناطيسياً حول السلك. عند فتح القاطعة تعود الإبرة لوضعها الأصلي (يزول الحقل). وعند عكس جهة التيار تنعكس جهة انحراف الإبرة.',
						mark: '2'
					},
					{
						type: 'columns',
						widths: ['1.4fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `التجربة 2 (سكة لابلاص): نضع ساقاً نحاسية على قضيبين متوازيين بين قطبي مغناطيس U، وعند غلق الدارة تتدحرج الساق ${initialDir}.\n\n2) سمّ القوة المسؤولة عن حركة الساق النحاسية، واذكر الشرطين اللازمين لحدوثها. هل تدحرجت الساق لأنها منجذبة للمغناطيس؟ علّل.`,
								answer: '2) تُسمى قوة لابلاص. الشرطان هما: وجود ناقل يجتازه تيار كهربائي، ووجود حقل مغناطيسي. لا، لم تنجذب لأن النحاس مادة لا مغناطيسية، بل تحركت بفعل قوة لابلاص.',
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'تركيب سكة لابلاص'
							}
						]
					},
					{
						type: 'text',
						content: `3) كيف يصبح اتجاه حركة الساق إذا:\n\nأ) عكسنا قطبي البطارية فقط؟\n\nب) عكسنا قطبي البطارية وقطبي المغناطيس معاً؟ ثم اذكر تطبيقاً تكنولوجياً شائعاً لهذه الظاهرة.`,
						answer: `3) أ) تنعكس جهة الحركة وتتدحرج الساق ${reversedDir}.\n\nب) تبقى الساق تتدحرج في نفس الجهة الأولى (${initialDir}).\n\nالتطبيق التكنولوجي: المحرك الكهربائي البسيط (في المروحة، الخلاط، أو ألعاب الأطفال).`,
						mark: '2'
					}
				]
			},
			hints: [
				'في تجربة أورستد، مرور التيار يولّد حقلاً مغناطيسياً.',
				'النحاس لا ينجذب للمغناطيس؛ تتحرك الساق بفعل قوة لابلاص.',
				'عكس عامل واحد يعكس الحركة، وعكس العاملين معاً يُبقي الحركة في نفس الجهة.'
			],
			solutionStepsAr: [
				'أورستد: التيار المستمر يولّد حقلاً مغناطيسياً ينعكس بعكس جهة التيار.',
				'سكة لابلاص: قوة لابلاص تنشأ عن تأثير الحقل المغناطيسي على ناقل يمر به تيار.',
				`عكس التيار وحده يعكس الحركة (${reversedDir})، وعكس العاملين معاً يُبقي الجهة (${initialDir}).`
			],
			finalAnswer: correctText
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Integration 1: Scrapyard Electromagnet Crane & Electric Bell
// ═══════════════════════════════════════════════════════════════════════════════
const integrationT3ElectromagnetCraneTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2am_t3_integration_electromagnet_crane',
	grade: '2am',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: الرافعة الكهرومغناطيسية والجرس الكهربائي',
	curriculumLessonId: 'phy_lesson_2am_t3_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const askMaterial = difficulty === 'easy';
		const svg = svgMagnetization2am('current');
		const imageUrl = savePhysicsSvgAsset(`phy_2am_t3_integ1_${difficulty}_s${seed}`, svg);

		const correctText = askMaterial
			? 'الحديد اللين لأنه يتمغنط مؤقتاً ويفقد مغنطته فور قطع التيار'
			: 'تجذب الرافعة قطع الحديد والفولاذ فقط ولا تجذب النحاس والألمنيوم';

		const mcq = buildUniqueMcqOptions(
			correctText,
			askMaterial
				? [
						{
							text: 'الفولاذ لأنه يحتفظ بتمغنطه دائماً حتى بعد قطع التيار',
							diagnosticFeedback: 'لو استعملنا الفولاذ لبقيت القطع ملتصقة بالرافعة بعد قطع التيار!'
						},
						{
							text: 'النحاس لأنه ناقل ممتاز للكهرباء ولا يتمغنط',
							diagnosticFeedback: 'النواة يجب أن تكون مادة مغناطيسية تقبل التمغنط المؤقت لتقوية الحقل!'
						},
						{
							text: 'البلاستيك لأنه عازل خفيف الوزن',
							diagnosticFeedback: 'البلاستيك لا يتمغنط ولا يقوي الحقل المغناطيسي للوشيعة.'
						}
				  ]
				: [
						{
							text: 'تجذب الرافعة جميع المعادن (الحديد والنحاس والألمنيوم)',
							diagnosticFeedback: 'النحاس والألمنيوم معادن لا مغناطيسية لا تتأثر بالمغناطيس!'
						},
						{
							text: 'تجذب النحاس فقط وتترك الحديد',
							diagnosticFeedback: 'الحديد مادة مغناطيسية والنحاس مادة لا مغناطيسية.'
						},
						{
							text: 'لا تجذب أي قطعة لأن الكهرومغناطيس ضعيف',
							diagnosticFeedback: 'وجود النواة الحديدية داخل الوشيعة يقوي الحقل المغناطيسي بشكل كبير.'
						}
				  ],
			rng
		);

		const qPrompt = askMaterial
			? 'لصناعة نواة كهرومغناطيس في رافعة لفرز الخردة (ترفع الحديد ثم تُفْلِته)، أيّ مادة نختار ولماذا؟'
			: 'في ورشة فرز النفايات المعدنية المختلطة (قطع حديد، فولاذ، نحاس، وألمنيوم)، مُرّرت رافعة كهرومغناطيسية مشغّلة فوقها. أيّ قطع ستلتقطها الرافعة؟';

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qPrompt,
				questionTextAr: qPrompt,
				imageUrl,
				imageCaption: 'مبدأ الكهرومغناطيس بنواة حديدية',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: askMaterial
					? 'نواة الكهرومغناطيس تُصنع من الحديد اللين لأن تمغنطه مؤقت يزول عند فتح القاطعة.'
					: 'يجذب الكهرومغناطيس المواد المغناطيسية فقط (الحديد والفولاذ)، ويترك النحاس والألمنيوم.'
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction:
					'في مصنع لإعادة تدوير المعادن، تُستعمل رافعة كهربائية لفرز مخلفات مختلطة تحتوي على قطع من الحديد والفولاذ والنحاس والألمنيوم والبلاستيك، وتحتوي الرافعة على وشيعة ملفوفة حول نواة معدنية ومزودة بمولد تيار مستمر وقاطعة.',
				content: [
					{
						type: 'columns',
						widths: ['1.45fr', '1fr'],
						children: [
							{
								type: 'text',
								content: '1) عند غلق القاطعة واقتراب الرافعة من كومة المخلفات، أيّ المواد ستنجذب إلى الرافعة وأيّها ستبقى في الأرض؟ علّل إجابتك.',
								answer: '1) تنجذب قطع الحديد والفولاذ فقط لأنها مواد مغناطيسية. أما النحاس والألمنيوم والبلاستيك فتبقى في الأرض لأنها مواد لا مغناطيسية.',
								mark: '2.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الكهرومغناطيس في الرافعة'
							}
						]
					},
					{
						type: 'text',
						content: '2) أ) كيف تُسمى هذه الأداة (وشيعة + نواة معدنية يمر بها تيار مستمر)؟ ولماذا نفضّل أن تكون النواة من الحديد اللين وليس من الفولاذ؟\n\nب) لو قرّبنا إبرة بوصلة من أحد وجهي الوشيعة أثناء اشتغالها فتنافر القطب الشمالي للإبرة مع هذا الوجه، فما اسم هذا الوجه؟ وما اسم الوجه الآخر؟',
						answer: '2) أ) تُسمى كهرومغناطيس. نفضّل الحديد اللين لأن تمغنطه مؤقت (يتمغنط عند غلق القاطعة لرفع الحديد ويفقد مغنطته فور فتحها لإفلاته في مكانه)، بعكس الفولاذ ذي التمغنط الدائم.\n\nب) بما أنه حدث تنافر مع القطب الشمالي للإبرة، فهذا الوجه هو وجه شمالي (N)، والوجه الآخر وجه جنوبي (S).',
						mark: '3'
					},
					{
						type: 'text',
						content: '3) إذا عكس العامل توصيل قطبي البطارية المغذية للرافعة، فهل تظل الرافعة قادرة على جذب الحديد؟ وما الذي يتغير في وجهي الوشيعة؟ ثم اذكر جهازاً منزلياً يعتمد على الكهرومغناطيس والحديد اللين.',
						answer: '3) نعم، تظل الرافعة تجذب الحديد لأن كلا القطبين N و S يجذبان الحديد. الذي يتغير هو تبادل وجهي الوشيعة (الوجه الشمالي يصبح جنوبياً والعكس).\n\nالجهاز المنزلي: الجرس الكهربائي.',
						mark: '2.5'
					}
				]
			},
			hints: [
				'الحديد والفولاذ مواد مغناطيسية، أما النحاس والألمنيوم والبلاستيك فلا.',
				'الكهرومغناطيس يحتاج الحديد اللين لكي يفقد مغنطته عند قطع التيار.',
				'تنافر القطب الشمالي للبوصلة مع وجه الوشيعة يدل على أنه وجه شمالي.'
			],
			solutionStepsAr: [
				'تنجذب المواد المغناطيسية (حديد وفولاذ) وتبقى المواد اللا مغناطيسية.',
				'الكهرومغناطيس يستعمل الحديد اللين ذي التمغنط المؤقت، والوجه المتنافر مع N هو وجه N.',
				'عكس التيار يبدل وجهي الوشيعة دون أن يلغي جذب الحديد؛ ومثال ذلك الجرس الكهربائي.'
			],
			finalAnswer: correctText
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Integration 2: Electric Motor & Laplace Rail Diagnostic
// ═══════════════════════════════════════════════════════════════════════════════
const integrationT3ElectricMotorTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2am_t3_integration_electric_motor',
	grade: '2am',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: تحليل اشتغال المحرك الكهربائي وسكة لابلاص',
	curriculumLessonId: 'phy_lesson_2am_t3_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const dirRight = difficulty !== 'easy';
		const svg = svgLaplaceRail2am('N', 'S', dirRight);
		const imageUrl = savePhysicsSvgAsset(`phy_2am_t3_integ2_${difficulty}_s${seed}`, svg);

		const correctText = 'وجود تيار كهربائي في الوشيعة ووجود حقل مغناطيسي (قوة لابلاص)';
		const mcq = buildUniqueMcqOptions(
			correctText,
			[
				{
					text: 'تجاذب الأسلاك النحاسية للمغناطيس مباشرة حتى دون تيار',
					diagnosticFeedback: 'النحاس لا ينجذب للمغناطيس أبداً!'
				},
				{
					text: 'وجود وشيعة فقط دون الحاجة لأي مغناطيس',
					diagnosticFeedback: 'المحرك البسيط يحتاج مغناطيساً دائماً يولّد حقلاً مغناطيسياً يؤثر في تيار الوشيعة.'
				},
				{
					text: 'تمغنط البلاستيك الموجود في هيكل المروحة',
					diagnosticFeedback: 'البلاستيك مادة عازلة ولا مغناطيسية.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: 'فكّك أمين لعبة سيارة كهربائية فوجد داخل محركها الصغير مغناطيساً منحنياً ووشيعة نحاسية تدور عند ربطها بالبطارية. ما السبب الفيزيائي لدوران هذه الوشيعة؟',
				questionTextAr: 'ما السبب الفيزيائي لدوران وشيعة المحرك الكهربائي البسيط؟',
				imageUrl,
				imageCaption: 'مبدأ قوة لابلاص في المحرك الكهربائي',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'يدور المحرك الكهربائي بفعل قوة لابلاص التي تنشأ عند مرور تيار كهربائي في وشيعة موضوعة داخل حقل مغناطيسي.'
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction:
					'اشترى سامي مروحة يدوية صغيرة تشتغل ببطارية $4.5$ فولط، وعندما فتح غطاءها الخلفي لاستبدال المحرك المعطّل لاحظ وجود مغناطيس ثابت يحيط بوشيعة نحاسية قابلة للدوران.',
				content: [
					{
						type: 'columns',
						widths: ['1.45fr', '1fr'],
						children: [
							{
								type: 'text',
								content: '1) اشرح مبدأ عمل المحرك الكهربائي البسيط بربطه بتجربة سكة لابلاص (اذكر العنصرين الأساسيين اللازمين لتوليد الحركة، ونوع التحول في المحرك).',
								answer: '1) يعتمد المحرك الكهربائي على قوة لابلاص (فعل الحقل المغناطيسي على ناقل يجتازه تيار كهربائي): عند مرور تيار مستمر في الوشيعة الموضوعة داخل حقل المغناطيس الثابت، تنشأ قوة تدورها، فيحول المحرك الكهرباء إلى حركة دورانية.',
								mark: '2.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'تمثيل قوة لابلاص'
							}
						]
					},
					{
						type: 'text',
						content: '2) بعد تركيب محرك جديد، لاحظ سامي أن المروحة تدفع الهواء إلى الخلف بدلاً من الأمام (أي تدور في الجهة المعاكسة!).\n\nاقترح عليه حلّين عمليين مختلفين لعكس جهة دوران المروحة، مفسّراً لماذا يفشل الحل إذا طبّق الحلين معاً في نفس الوقت؟',
						answer: '2) الحل الأول: عكس توصيل قطبي البطارية (+ و -) لتغيير جهة التيار الكهربائي.\n\nالحل الثاني: قلب قطبي المغناطيس (N مكان S) داخل المحرك لعكس جهة الحقل المغناطيسي.\n\nإذا طبّق الحلين معاً في نفس الوقت، تبقى المروحة تدور في نفس الجهة الخاطئة لأن العكسين يلغيان أثر بعضهما.',
						mark: '3'
					},
					{
						type: 'text',
						content: '3) كيف يستطيع سامي التأكد عملياً من أن السلك الموصول بالبطارية يمر به تيار كهربائي حتى بدون مصباح، باستعمال بوصلة فقط؟ سمّ التجربة المرجعية التي يعتمد عليها.',
						answer: '3) يضع السلك مستقيماً فوق إبرة البوصلة ويغلق القاطعة: إذا انحرفت إبرة البوصلة فذلك دليل على مرور تيار كهربائي يولّد حقلاً مغناطيسياً حول السلك. التجربة المرجعية هي تجربة أورستد.',
						mark: '2.5'
					}
				]
			},
			hints: [
				'المحرك يطبق قوة لابلاص (تيار في وشيعة + حقل مغناطيس).',
				'لعكس الدوران نعكس جهة التيار أو أقطاب المغناطيس فقط (لا كليهما معاً).',
				'انحراف البوصلة بجوار سلك ناقل للتيار هو تجربة أورستد.'
			],
			solutionStepsAr: [
				'قوة لابلاص هي تأثير الحقل المغناطيسي للمغناطيس على الوشيعة التي يجتازها التيار.',
				'عكس البطارية أو قلب المغناطيس يعكس الدوران؛ عكسهما معاً يُبقي نفس الجهة.',
				'الكشف عن التيار بالبوصلة يستند إلى تجربة أورستد.'
			],
			finalAnswer: correctText
		};
	}
};

export const PHYSICS_TEMPLATES_2AM_T3: PhysicsParameterizedTemplate[] = [
	magnetsPolesTemplate,
	magnetizationMethodsTemplate,
	magneticFieldCompassTemplate,
	oerstedCoilLaplaceTemplate,
	integrationT3ElectromagnetCraneTemplate,
	integrationT3ElectricMotorTemplate
];
