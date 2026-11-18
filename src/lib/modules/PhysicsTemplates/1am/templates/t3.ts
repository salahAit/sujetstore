import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { savePhysicsSvgAsset, wrapPhysicsSvg } from '../../svg-physics';

function esc(str: string): string {
	return str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function buildPinholeExperimentSvg(aligned: boolean, mediumName: string): string {
	const midOffset = aligned ? 0 : 28;
	return wrapPhysicsSvg(
		400,
		180,
		`<rect x="10" y="10" width="380" height="160" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="200" y="27" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">تجربة اللوحات المثقوبة (${aligned ? 'الثقوب على استقامة واحدة' : 'إزاحة اللوحة الثانية'})</text>` +
			`<circle cx="44" cy="95" r="10" fill="#fde047" stroke="#ca8a04" stroke-width="1.6"/>` +
			`<text x="44" y="124" text-anchor="middle" font-size="10" font-weight="bold" fill="#854d0e">منبع</text>` +
			// Screen 1
			`<rect x="105" y="48" width="8" height="41" fill="#334155"/><rect x="105" y="101" width="8" height="41" fill="#334155"/>` +
			// Screen 2 (shifted if not aligned)
			`<rect x="180" y="${48 + midOffset}" width="8" height="41" fill="#dc2626"/><rect x="180" y="${101 + midOffset}" width="8" height="41" fill="#dc2626"/>` +
			// Screen 3
			`<rect x="260" y="48" width="8" height="41" fill="#334155"/><rect x="260" y="101" width="8" height="41" fill="#334155"/>` +
			// Ray
			`<defs><marker id="t3Ray" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626"/></marker></defs>` +
			(aligned
				? `<line x1="54" y1="95" x2="322" y2="95" stroke="#dc2626" stroke-width="2" marker-end="url(#t3Ray)"/>`
				: `<line x1="54" y1="95" x2="178" y2="95" stroke="#dc2626" stroke-width="2" marker-end="url(#t3Ray)"/>`) +
			// Eye
			`<ellipse cx="345" cy="95" rx="15" ry="9" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>` +
			`<circle cx="341" cy="95" r="4" fill="#1d4ed8"/>` +
			`<text x="345" y="124" text-anchor="middle" font-size="10" font-weight="bold" fill="#0f172a">العين</text>` +
			`<text x="200" y="160" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#475569">الوسط المحيط: ${esc(mediumName)}</text>`
	);
}

function buildShadowDiagramSvg(sourceKind: 'point' | 'extended', observerRegion: 'umbra' | 'penumbra' | 'lit'): string {
	const obsY = observerRegion === 'umbra' ? 100 : observerRegion === 'penumbra' ? 72 : 44;
	const obsLabel = observerRegion === 'umbra' ? 'M (الظل التام)' : observerRegion === 'penumbra' ? 'M (الظليل)' : 'M (منطقة مضاءة)';
	return wrapPhysicsSvg(
		400,
		190,
		`<rect x="10" y="10" width="380" height="170" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1.3"/>` +
			`<text x="200" y="27" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#f8fafc">${sourceKind === 'point' ? 'منبع ضوئي نقطي + كرة عاتمة' : 'منبع ضوئي واسع + كرة عاتمة'}</text>` +
			(sourceKind === 'point'
				? `<circle cx="48" cy="100" r="5" fill="#fde047"/>`
				: `<ellipse cx="48" cy="100" rx="7" ry="24" fill="#fde047"/>`) +
			`<text x="48" y="140" text-anchor="middle" font-size="10" fill="#fde047">S</text>` +
			// Screen
			`<rect x="315" y="38" width="10" height="124" fill="#fef9c3"/>` +
			(sourceKind === 'point'
				? `<rect x="315" y="74" width="10" height="52" fill="#1e293b"/>` +
					`<line x1="48" y1="100" x2="315" y2="74" stroke="#facc15" stroke-width="1.3" stroke-dasharray="4,3"/>` +
					`<line x1="48" y1="100" x2="315" y2="126" stroke="#facc15" stroke-width="1.3" stroke-dasharray="4,3"/>`
				: `<rect x="315" y="60" width="10" height="80" fill="#94a3b8"/>` +
					`<rect x="315" y="84" width="10" height="32" fill="#1e293b"/>` +
					`<line x1="48" y1="76" x2="315" y2="84" stroke="#facc15" stroke-width="1.2" stroke-dasharray="4,3"/>` +
					`<line x1="48" y1="124" x2="315" y2="116" stroke="#facc15" stroke-width="1.2" stroke-dasharray="4,3"/>` +
					`<line x1="48" y1="76" x2="315" y2="140" stroke="#fb923c" stroke-width="1.2" stroke-dasharray="4,3"/>` +
					`<line x1="48" y1="124" x2="315" y2="60" stroke="#fb923c" stroke-width="1.2" stroke-dasharray="4,3"/>`) +
			// Opaque sphere
			`<circle cx="165" cy="100" r="22" fill="#64748b" stroke="#cbd5e1" stroke-width="1.4"/>` +
			`<path d="M 165 78 A 22 22 0 0 1 165 122 Z" fill="#1e293b"/>` +
			// Observer point M
			`<circle cx="295" cy="${obsY}" r="4.5" fill="#ef4444" stroke="#ffffff" stroke-width="1.2"/>` +
			`<text x="332" y="${obsY + 4}" font-size="10.5" font-weight="bold" fill="#fca5a5">${esc(obsLabel)}</text>`
	);
}

function buildSolarDistanceSvg(planetName: string, auDist: number): string {
	return wrapPhysicsSvg(
		400,
		175,
		`<rect x="10" y="10" width="380" height="155" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1.3"/>` +
			`<text x="200" y="28" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#f8fafc">البعد الفلكي في المجموعة الشمسية (1 UA = 150 مليون km)</text>` +
			`<circle cx="56" cy="96" r="22" fill="#facc15"/>` +
			`<text x="56" y="135" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#fde047">الشمس</text>` +
			`<circle cx="165" cy="96" r="10" fill="#3b82f6"/>` +
			`<text x="165" y="125" text-anchor="middle" font-size="10.5" fill="#93c5fd">الأرض (1 UA)</text>` +
			`<circle cx="318" cy="96" r="14" fill="#fb923c"/>` +
			`<text x="318" y="128" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#fdba74">${esc(planetName)} (${auDist} UA)</text>` +
			`<line x1="78" y1="96" x2="304" y2="96" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="5,3"/>` +
			`<text x="240" y="76" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#e2e8f0">سرعة الضوء: 300 000 km/s</text>`
	);
}

function buildEclipseDiagramSvg(kind: 'solar' | 'lunar', partial: boolean): string {
	return wrapPhysicsSvg(
		400,
		180,
		`<rect x="10" y="10" width="380" height="160" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1.3"/>` +
			`<text x="200" y="27" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#f8fafc">ظاهرة ${kind === 'solar' ? 'كسوف الشمس' : 'خسوف القمر'} (${partial ? 'جزئي' : 'كلي'})</text>` +
			`<circle cx="54" cy="98" r="20" fill="#facc15"/>` +
			`<text x="54" y="135" text-anchor="middle" font-size="10" fill="#fde047">الشمس</text>` +
			(kind === 'solar'
				? `<polygon points="54,78 185,90 185,106 54,118" fill="#fef08a" opacity="0.22"/>` +
					`<polygon points="185,90 278,98 185,106" fill="#020617" opacity="0.85"/>` +
					`<circle cx="185" cy="98" r="8" fill="#94a3b8"/>` +
					`<text x="185" y="128" text-anchor="middle" font-size="10" fill="#cbd5e1">القمر</text>` +
					`<circle cx="282" cy="98" r="16" fill="#3b82f6"/>` +
					`<text x="282" y="135" text-anchor="middle" font-size="10" fill="#93c5fd">الأرض</text>` +
					`<circle cx="272" cy="${partial ? 88 : 98}" r="3.5" fill="#ef4444"/>` +
					`<text x="334" y="96" font-size="10" font-weight="bold" fill="#fca5a5">${partial ? 'منطقة الظليل' : 'الظل التام'}</text>`
				: `<polygon points="180,82 325,92 325,104 180,114" fill="#020617" opacity="0.85"/>` +
					`<circle cx="180" cy="98" r="16" fill="#3b82f6"/>` +
					`<text x="180" y="135" text-anchor="middle" font-size="10" fill="#93c5fd">الأرض</text>` +
					`<circle cx="278" cy="${partial ? 86 : 98}" r="7.5" fill="#b91c1c"/>` +
					`<text x="278" y="128" text-anchor="middle" font-size="10" fill="#fca5a5">القمر</text>`)
	);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Light Sources, Optical Media & Rectilinear Propagation
// ═══════════════════════════════════════════════════════════════════════════════
const sourcesMediaRectilinearTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1am_t3_sources_media_rectilinear',
	grade: '1am',
	trimesterId: 't3',
	domain: 'optics',
	titleAr: 'المنابع والأوساط الضوئية والانتشار المستقيم للضوء',
	curriculumLessonId: 'phy_lesson_1am_t3_light_sources_media_rectilinear_propagation',
	defaultPoints: 6,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const aligned = seed % 2 === 0;
		const medium = rng.pick([
			{ name: 'الهواء النقي', kind: 'وسط شفاف' },
			{ name: 'الزجاج الأملس', kind: 'وسط شفاف' }
		]);
		const svg = buildPinholeExperimentSvg(aligned, medium.name);
		const imageUrl = savePhysicsSvgAsset(`phy_1am_rectilinear_s${seed}`, svg);

		const correctAnswer = aligned
			? 'ترى العين المنبع لأن الثقوب على استقامة واحدة والضوء ينتشر في خطوط مستقيمة'
			: 'لا ترى العين المنبع لأن اللوحة المزاحة عاتمة وتمنع الانتشار المستقيم للضوء';

		const mcq = buildUniqueMcqOptions(
			correctAnswer,
			[
				{
					text: aligned
						? 'لا ترى العين المنبع لأن الهواء وسط عاتم'
						: 'ترى العين المنبع لأن الضوء ينحني عبر اللوحة الثانية',
					diagnosticFeedback: aligned
						? 'الهواء النقي وسط شفاف، والثقوب الثلاثة على استقامة واحدة!'
						: 'الضوء لا ينحني في الوسط الشفاف المتجانس بل ينتشر في خطوط مستقيمة.'
				},
				{
					text: 'ترى العين صورة مقلوبة للمصباح فقط',
					diagnosticFeedback: 'في الرؤية المباشرة عبر ثقوب متحاذية، يصل الشعاع مباشرة من المنبع للعين.'
				},
				{
					text: 'يتوقف المنبع عن إصدار الضوء عند إزاحة اللوحة',
					diagnosticFeedback: 'المنبع يواصل إصدار الضوء في كل الاتجاهات؛ اللوحة العاتمة هي التي تحجب الشعاع عن العين.'
				}
			],
			rng
		);

		const quizQuestion: PhysicsGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `في تجربة اللوحات الثلاث العاتمة المثقوبة المبينة بالرسم، ${aligned ? 'الثقوب الثلاثة على استقامة واحدة' : 'أزحنا اللوحة الوسطى جانباً عن الاستقامة'}. هل ترى العين المنبع الضوئي؟ ولماذا؟`,
			questionTextAr: `هل ترى العين المنبع الضوئي في التركيبة المقابلة؟`,
			imageUrl,
			imageCaption: 'تجربة الانتشار المستقيم للضوء',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: correctAnswer
		};

		const hints: [string, string, string] = [
			'تحقق من استقامة الثقوب الثلاثة مع المنبع والعين.',
			'تذكّر مبدأ الانتشار المستقيم للضوء في الوسط الشفاف المتجانس.',
			aligned ? 'الثقوب متراصة على خط واحد.' : 'إزاحة اللوحة الوسطى يعترض المسار المستقيم للضوء.'
		];
		const solutionStepsAr = [
			`اللوحات الثلاث مصنوعة من الورق المقوى (وسط عاتم).`,
			aligned
				? 'بما أن الثقوب على استقامة واحدة والوسط شفاف، يصل الشعاع المستقيم إلى العين فترى المنبع.'
				: 'بما أن اللوحة الثانية أُزيحت، تعترض مسار الشعاع المستقيم ولا يصل الضوء إلى العين.'
		];
		const finalAnswer = aligned ? 'ترى العين المنبع' : 'لا ترى العين المنبع';

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `أنجز تلاميذ المخبر التجربة الممثلة في الشكل المقابل باستعمال منبع ضوئي، ثلاث لوحات مثقوبة من الورق المقوى، وأوساط مختلفة:`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1.15fr'],
					children: [
						{
							type: 'text',
							content: `1) حدد هل ترى العين المنبع الضوئي في الوضعية المرسومة؟ علّل إجابتك بذكر المبدأ الفيزيائي، وبيّن شرط الرؤية المباشرة لجسم.`,
							answer: `1) ${correctAnswer}. شرط الرؤية المباشرة: وصول الضوء من الجسم إلى العين في خط مستقيم عبر وسط شفاف.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'تجربة اللوحات المثقوبة'
						}
					]
				},
				{
					type: 'table',
					headers: ['الجسم أو الوسط', 'التصنيف (مضيء / مضاء أو شفاف / شاف / عاتم)'],
					cells: [],
					rows: [
						['القمر', { content: '................', answer: 'جسم مضاء (يعكس ضوء الشمس)', mark: '0.75' }],
						['النجوم المشتعلة', { content: '................', answer: 'جسم مضيء طبيعي', mark: '0.75' }],
						['الورق المزيت / الزجاج المصنفر', { content: '................', answer: 'وسط شاف', mark: '0.75' }],
						['الخشب / الورق المقوى', { content: '................', answer: 'وسط عاتم', mark: '0.75' }]
					],
					headerBackground: true,
					borders: 'grid',
					width: 'full'
				},
				{
					type: 'text',
					content: `3) ما المقصود بـ *الشعاع الضوئي* و *الحزمة الضوئية*؟ وما نوع الحزمة الصادرة عن مصباح سيارة في الليل؟`,
					answer: `3) *الشعاع الضوئي* هو خط مستقيم مزود بسهم يبين جهة انتشار الضوء، ومجموعة الأشعة تسمى *حزمة ضوئية*. حزمة مصباح السيارة تكون متباعدة (أو متوازية في بعض الكشافات).`,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Shadow & Penumbra (الظل والظليل)
// ═══════════════════════════════════════════════════════════════════════════════
const shadowPenumbraTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1am_t3_shadow_penumbra',
	grade: '1am',
	trimesterId: 't3',
	domain: 'optics',
	titleAr: 'الظل الذاتي، الظل المحمول، ومنطقة الظليل',
	curriculumLessonId: 'phy_lesson_1am_t3_shadow_penumbra',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sourceKind: 'point' | 'extended' = difficulty === 'easy' ? 'point' : 'extended';
		const observerRegion: 'umbra' | 'penumbra' | 'lit' =
			sourceKind === 'point'
				? seed % 2 === 0
					? 'umbra'
					: 'lit'
				: rng.pick(['umbra', 'penumbra', 'lit']);

		const svg = buildShadowDiagramSvg(sourceKind, observerRegion);
		const imageUrl = savePhysicsSvgAsset(`phy_1am_shadow_s${seed}`, svg);

		const correctView =
			observerRegion === 'umbra'
				? 'لا يرى المنبع الضوئي إطلاقاً (منطقة الظل التام)'
				: observerRegion === 'penumbra'
					? 'يرى جزءاً من المنبع الضوئي فقط (رؤية جزئية — منطقة الظليل)'
					: 'يرى المنبع الضوئي كاملاً (منطقة مضاءة)';

		const mcq = buildUniqueMcqOptions(
			correctView,
			[
				...(observerRegion !== 'umbra'
					? [
							{
								text: 'لا يرى المنبع الضوئي إطلاقاً (منطقة الظل التام)',
								diagnosticFeedback: 'النقطة M هنا خارج مخروط الظل التام!'
							}
						]
					: []),
				...(observerRegion !== 'penumbra'
					? [
							{
								text: 'يرى جزءاً من المنبع الضوئي فقط (رؤية جزئية — منطقة الظليل)',
								diagnosticFeedback:
									sourceKind === 'point'
										? 'المنبع نقطي! لا توجد منطقة ظليل مع المنبع النقطي.'
										: 'تحقق من موقع M: هل هو داخل مخروط الظل التام أم في المنطقة المضاءة كلياً؟'
							}
						]
					: []),
				...(observerRegion !== 'lit'
					? [
							{
								text: 'يرى المنبع الضوئي كاملاً (منطقة مضاءة)',
								diagnosticFeedback: 'الكرة العاتمة تحجب كل أو جزءاً من أشعة المنبع عن النقطة M.'
							}
						]
					: []),
				{
					text: 'يرى المنبع مقلوباً وأصغر حجماً',
					diagnosticFeedback: 'الظل والظليل ينتجان عن حجب الأشعة المستقيمة وليس عن قلب الصور.'
				}
			],
			rng
		);

		const quizQuestion: PhysicsGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `نضيء كرة عاتمة أمام شاشة بواسطة **${sourceKind === 'point' ? 'منبع ضوئي نقطي' : 'منبع ضوئي واسع'}** $S$. ماذا يرى مراقب عينه في الموضع $M$ المبيّن في المخطط؟`,
			questionTextAr: `ماذا يرى المراقب من النقطة M باتجاه المنبع S؟`,
			imageUrl,
			imageCaption: 'مناطق الظل والظليل خلف كرة عاتمة',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: correctView
		};

		const hints: [string, string, string] = [
			'لاحظ نوع المنبع الضوئي S (نقطي أم واسع).',
			'ارسم خطوطاً مستقيمة من النقطة M نحو المنبع S: هل تعترضها الكرة العاتمة كلياً أم جزئياً أم لا تعترضها؟',
			'الظل التام = انعدام الرؤية؛ الظليل = رؤية جزئية؛ المنطقة المضاءة = رؤية كلية.'
		];
		const solutionStepsAr = [
			`المنبع في الشكل هو ${sourceKind === 'point' ? 'منبع نقطي' : 'منبع واسع'}.`,
			`تقع النقطة $M$ في ${observerRegion === 'umbra' ? 'منطقة الظل التام' : observerRegion === 'penumbra' ? 'منطقة الظليل' : 'المنطقة المضاءة'}.`,
			`لذلك: ${correctView}.`
		];
		const finalAnswer = correctView;

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `في مخبر الظواهر الضوئية، أضأنا كرة عاتمة موضوعة أمام شاشة بواسطة **${sourceKind === 'point' ? 'منبع ضوئي نقطي' : 'منبع ضوئي واسع'}** $S$ كما في المخطط:`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1.15fr'],
					children: [
						{
							type: 'text',
							content: `1) سمِّ المنطقة المظلمة على سطح الكرة غير المواجهة للمنبع، والبقعة المظلمة التي تتشكل على الشاشة.\n\n2) ماذا يشاهد المراقب في النقطة $M$ عند النظر نحو المنبع $S$؟ علّل.`,
							answer: `1) على سطح الكرة: *الظل الذاتي*. على الشاشة: *الظل المحمول (الظل التام)*${sourceKind === 'extended' ? ' ويحيط به *الظليل*' : ''}.\n\n2) ${correctView}.`,
							mark: '2.5'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'مخطط الظل والظليل'
						}
					]
				},
				{
					type: 'text',
					content: `3) ما الفرق بين الظل المتشكل باستعمال منبع ضوئي نقطي والظل المتشكل باستعمال منبع ضوئي واسع؟`,
					answer: `3) المنبع النقطي يعطي ظلاً محمولاً حاد الحواف فقط (دون ظليل)، أما المنبع الواسع فيعطي منطقة *ظل تام* محاطة بمنطقة *ظليل* تتلقى جزءاً من الضوء فقط.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `4) كيف يتغير حجم الظل المحمول على الشاشة إذا قرّبنا الكرة العاتمة من المنبع الضوئي $S$؟`,
					answer: `4) *يزداد* حجم الظل المحمول على الشاشة لأن الأشعة المماسة للكرة تنفرج بزاوية أكبر وفق الانتشار المستقيم للضوء.`,
					mark: '1.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Solar System, Astronomical Units & Earth Rotation/Revolution
// ═══════════════════════════════════════════════════════════════════════════════
const solarSystemAstronomicalUnitsTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1am_t3_solar_system_astronomical_units',
	grade: '1am',
	trimesterId: 't3',
	domain: 'optics',
	titleAr: 'المجموعة الشمسية، الوحدات الفلكية، وحركتا الأرض',
	curriculumLessonId: 'phy_lesson_1am_t3_solar_system_earth_rotation_moon_eclipses',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const planets = [
			{ name: 'المريخ', au: 1.5, lightMin: 12.5 },
			{ name: 'المشتري', au: 5.2, lightMin: 43 },
			{ name: 'زحل', au: 9.5, lightMin: 79 },
			{ name: 'الزهرة', au: 0.7, lightMin: 6 }
		];
		const planet = rng.pick(planets);
		const distMillionKm = roundTo(planet.au * 150, 1);

		const svg = buildSolarDistanceSvg(planet.name, planet.au);
		const imageUrl = savePhysicsSvgAsset(`phy_1am_solar_s${seed}`, svg);

		const wrongAdd = roundTo(planet.au + 150, 1);
		const wrongDiv = roundTo(150 / planet.au, 1);
		const wrongHundred = roundTo(planet.au * 100, 1);

		const mcq = buildUniqueMcqOptions(
			`${distMillionKm} مليون كيلومتر`,
			[
				{
					text: `${wrongHundred} مليون كيلومتر`,
					diagnosticFeedback: 'انتبه: $1\\text{ UA} \\approx 150$ مليون $\\text{km}$ وليس $100$ مليون $\\text{km}$!'
				},
				{
					text: `${wrongAdd} مليون كيلومتر`,
					diagnosticFeedback: 'لتحويل المسافة من $\\text{UA}$ إلى مليون $\\text{km}$ نضرب في $150$ ولا نجمع.'
				},
				{
					text: `${wrongDiv} مليون كيلومتر`,
					diagnosticFeedback: 'عكست العملية! المسافة بالكيلومتر تساوي $d_{\\text{UA}} \\times 150$ مليون $\\text{km}$.'
				}
			],
			rng
		);

		const quizQuestion: PhysicsGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `يبعد كوكب **${planet.name}** عن الشمس بمقدار $${planet.au}\\text{ UA}$. علماً أن الوحدة الفلكية $1\\text{ UA} \\approx 150$ مليون $\\text{km}$، ما هي المسافة بين الشمس وكوكب ${planet.name} بملايين الكيلومترات؟`,
			questionTextAr: `ما المسافة بين الشمس وكوكب ${planet.name} (${planet.au} UA) بملايين الكيلومترات؟`,
			imageUrl,
			imageCaption: 'تقدير المسافات الفلكية بالوحدة الفلكية UA',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `المسافة تساوي $${planet.au} \\times 150 = ${distMillionKm}$ مليون كيلومتر.`
		};

		const hints: [string, string, string] = [
			'تذكّر أن $1\\text{ UA}$ هي المسافة المتوسطة بين الشمس والأرض وتساوي $150$ مليون $\\text{km}$.',
			`اضرب عدد الوحدات الفلكية ($${planet.au}$) في $150$.`,
			`احسب $${planet.au} \\times 150$.`
		];
		const solutionStepsAr = [
			`معطى: $1\\text{ UA} = 150$ مليون $\\text{km}$.`,
			`المسافة: $d = ${planet.au} \\times 150 = ${distMillionKm}$ مليون $\\text{km}$.`
		];
		const finalAnswer = `${distMillionKm} مليون كيلومتر`;

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `في إطار مشروع علمي حول المجموعة الشمسية والوحدات الفلكية وحركتي الأرض، أجب عن الأسئلة التالية بالاعتماد على السند المقابل:`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1.15fr'],
					children: [
						{
							type: 'text',
							content: `1) عرّف *الوحدة الفلكية* ($"UA"$) و *السنة الضوئية* ($"a.l."$)، ثم احسب بملايين الكيلومترات بعد كوكب **${planet.name}** عن الشمس ($${planet.au} "UA"$).`,
							answer: `1) الوحدة الفلكية هي متوسط المسافة بين الشمس والأرض ($1 "UA" approx 150$ مليون $"km"$). السنة الضوئية هي المسافة التي يقطعها الضوء في الفراغ خلال سنة واحدة. بعد ${planet.name}: $${planet.au} times 150 = ${distMillionKm}$ مليون $"km"$.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'الوحدة الفلكية في المجموعة الشمسية'
						}
					]
				},
				{
					type: 'true_false',
					items: [
						{
							q: 'ينتج تعاقب الليل والنهار عن دوران الأرض حول نفسها خلال 24 ساعة تقريباً.',
							a: 'صحيح',
							c: 'العبارة صحيحة.',
							mark: '1'
						},
						{
							q: 'ينتج تعاقب الفصول الأربعة عن اقتراب الأرض وابتعادها الكبير عن الشمس فقط.',
							a: 'خاطئ',
							c: 'ينتج تعاقب الفصول عن دوران الأرض حول الشمس مع ميلان محور دورانها.',
							mark: '1'
						}
					]
				},
				{
					type: 'text',
					content: `3) يستغرق ضوء الشمس حوالي $500$ ثانية للوصول إلى الأرض. إذا كانت سرعة الضوء في الفراغ هي $300\\,000 "km/s"$، فتحقق حسابياً أن المسافة بين الشمس والأرض تساوي $150$ مليون كيلومتر.`,
					answer: `3) $d = c times t = 300\\,000 times 500 = 150\\,000\\,000 "km" = 150$ مليون كيلومتر.`,
					mark: '2'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Moon Phases & Solar / Lunar Eclipses
// ═══════════════════════════════════════════════════════════════════════════════
const moonPhasesEclipsesTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1am_t3_moon_phases_eclipses',
	grade: '1am',
	trimesterId: 't3',
	domain: 'optics',
	titleAr: 'أطوار القمر وظاهرتا خسوف القمر وكسوف الشمس',
	curriculumLessonId: 'phy_lesson_1am_t3_solar_system_earth_rotation_moon_eclipses',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const kind: 'solar' | 'lunar' = seed % 2 === 0 ? 'solar' : 'lunar';
		const partial = difficulty === 'hard';

		const svg = buildEclipseDiagramSvg(kind, partial);
		const imageUrl = savePhysicsSvgAsset(`phy_1am_eclipse_s${seed}`, svg);

		const correctAns =
			kind === 'solar'
				? `كسوف ${partial ? 'جزئي' : 'كلي'} للشمس — القمر في طور المحاق`
				: `خسوف ${partial ? 'جزئي' : 'كلي'} للقمر — القمر في طور البدر`;

		const mcq = buildUniqueMcqOptions(
			correctAns,
			[
				{
					text:
						kind === 'solar'
							? `خسوف ${partial ? 'جزئي' : 'كلي'} للقمر — القمر في طور البدر`
							: `كسوف ${partial ? 'جزئي' : 'كلي'} للشمس — القمر في طور المحاق`,
					diagnosticFeedback:
						kind === 'solar'
							? 'في المخطط، القمر هو الذي يقع بين الشمس والأرض ويحجب الشمس، وهذا كسوف الشمس وليس خسوف القمر!'
							: 'في المخطط، الأرض هي التي تقع بين الشمس والقمر فتحجب الضوء عن القمر، وهذا خسوف القمر!'
				},
				{
					text:
						kind === 'solar'
							? `كسوف ${partial ? 'كلي' : 'جزئي'} للشمس — القمر في طور البدر`
							: `خسوف ${partial ? 'كلي' : 'جزئي'} للقمر — القمر في طور المحاق`,
					diagnosticFeedback:
						kind === 'solar'
							? 'أثناء كسوف الشمس يكون وجه القمر المظلم متجهاً للأرض (طور المحاق)، وتحقق من موقع الراصد (ظل تام أم ظليل)!'
							: 'أثناء خسوف القمر يكون القمر خلف الأرض مواجهاً للشمس (طور البدر).'
				},
				{
					text: 'انعدام أطوار القمر بسبب دوران الأرض حول نفسها',
					diagnosticFeedback: 'الظاهرة الممثلة هي اصطفاف الأجرام الثلاثة (كسوف أو خسوف).'
				}
			],
			rng
		);

		const quizQuestion: PhysicsGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `تأمّل المخطط الفلكي المقابل الذي يبيّن اصطفاف الشمس والأرض والقمر على استقامة واحدة. ما اسم الظاهرة الظاهرة في الرسم وما طور القمر خلالها؟`,
			questionTextAr: `ما اسم الظاهرة الفلكية الممثلة في المخطط وما طور القمر؟`,
			imageUrl,
			imageCaption: 'اصطفاف الشمس والأرض والقمر',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation:
				kind === 'solar'
					? `يقع القمر بين الشمس والأرض (طور المحاق)؛ والموقع داخل ${partial ? 'الظليل فيكون كسوفاً جزئياً' : 'الظل التام فيكون كسوفاً كلياً'}.`
					: `تقع الأرض بين الشمس والقمر (طور البدر)؛ ويدخل القمر ${partial ? 'جزئياً في ظل الأرض فيكون خسوفاً جزئياً' : 'كلياً في ظل الأرض فيكون خسوفاً كلياً'}.`
		};

		const hints: [string, string, string] = [
			'حدّد أي جرم يقع في المنتصف بين الجرمين الآخرين: القمر أم الأرض؟',
			'إذا كان القمر في الوسط فهو كسوف الشمس (طور المحاق)، وإذا كانت الأرض في الوسط فهو خسوف القمر (طور البدر).',
			'تحقق هل النقطة/القمر في منطقة الظل التام (كلي) أم في منطقة الظليل/الحافة (جزئي).'
		];
		const solutionStepsAr = [
			`الترتيب في الرسم: ${kind === 'solar' ? 'شمس – قمر – أرض' : 'شمس – أرض – قمر'}.`,
			`الظاهرة هي **${correctAns}**.`
		];
		const finalAnswer = correctAns;

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `يمثل المخطط المقابل ظاهرة فلكية ناتجة عن الانتشار المستقيم للضوء وتشكل الظل والظليل عند اصطفاف الشمس والأرض والقمر:`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1.15fr'],
					children: [
						{
							type: 'text',
							content: `1) سمِّ الظاهرة الفلكية الممثلة (مع تحديد هل هي كلية أم جزئية)، واذكر طور القمر أثناء حدوثها.\n\n2) فسّر كيفية حدوث هذه الظاهرة باستعمال مفهومي *الانتشار المستقيم للضوء* و *الظل والظليل*.`,
							answer: `1) *${correctAns}*.\n\n2) ${kind === 'solar' ? 'ينتشر ضوء الشمس في خطوط مستقيمة فيحجب القمر العاتم أشعتها، ويسقط ظله التام (كسوف كلي) وظليله (كسوف جزئي) على الأرض.' : 'ينتشر ضوء الشمس في خطوط مستقيمة فتحجب الأرض العاتمة أشعتها عن القمر، فيدخل القمر في منطقة ظل الأرض.'}`,
							mark: '2.5'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'مخطط اصطفاف الشمس والأرض والقمر'
						}
					]
				},
				{
					type: 'text',
					content: `3) رتّب أطوار القمر الأربعة الأساسية الآتية بدءاً من بداية الشهر القمري: (البدر، المحاق، الربع الأول، الهلال الأول).`,
					answer: `3) الترتيب: المحاق $arrow.r$ الهلال الأول $arrow.r$ الربع الأول $arrow.r$ البدر.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `4) ما الاحتياط الضروري لسلامة العين عند مشاهدة *كسوف الشمس*؟ وهل نحتاج لنفس الاحتياط عند مشاهدة *خسوف القمر*؟`,
					answer: `4) عند كسوف الشمس يجب استعمال نظارات خاصة برصد الكسوف وتجنب النظر المباشر للشمس لتفادي تلف العين. أما خسوف القمر فيُشاهد بالعين المجردة بأمان لأن القمر جسم مضاء لا يؤذي العين.`,
					mark: '1.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Integration T3 #1: Astronomy Club Observation Night & Eclipses
// ═══════════════════════════════════════════════════════════════════════════════
const integrationEclipsesAstronomyTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1am_t3_integration_eclipses_astronomy',
	grade: '1am',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'وضعية إدماجية (1): رصد ظاهرة فلكية ومجسم الظل والظليل في نادي الفلك',
	curriculumLessonId: 'phy_lesson_1am_t3_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const isSolar = seed % 2 === 0;
		const distAu = rng.pick([1.5, 5.2, 9.5]);
		const distMillion = roundTo(distAu * 150, 1);

		const svg = wrapPhysicsSvg(
			420,
			190,
			`<rect x="10" y="10" width="400" height="170" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1.3"/>` +
				`<text x="210" y="27" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#f8fafc">وثيقة نادي الفلك: محاكاة ${isSolar ? 'الكسوف' : 'الخسوف'} ومسافات المجموعة الشمسية</text>` +
				`<circle cx="55" cy="96" r="20" fill="#facc15"/>` +
				`<text x="55" y="132" text-anchor="middle" font-size="10" fill="#fde047">منبع واسع (الشمس)</text>` +
				(isSolar
					? `<circle cx="170" cy="96" r="9" fill="#94a3b8"/>` +
						`<text x="170" y="128" text-anchor="middle" font-size="10" fill="#cbd5e1">القمر (كرة صغيرة)</text>` +
						`<circle cx="275" cy="96" r="17" fill="#3b82f6"/>` +
						`<text x="275" y="132" text-anchor="middle" font-size="10" fill="#93c5fd">الأرض (كرة كبيرة)</text>` +
						`<polygon points="170,87 275,96 170,105" fill="#020617" opacity="0.85"/>`
					: `<circle cx="175" cy="96" r="17" fill="#3b82f6"/>` +
						`<text x="175" y="132" text-anchor="middle" font-size="10" fill="#93c5fd">الأرض</text>` +
						`<circle cx="272" cy="96" r="8" fill="#b91c1c"/>` +
						`<text x="272" y="128" text-anchor="middle" font-size="10" fill="#fca5a5">القمر</text>` +
						`<polygon points="175,79 325,90 325,102 175,113" fill="#020617" opacity="0.85"/>`) +
				`<rect x="298" y="46" width="102" height="106" rx="5" fill="#1e293b" stroke="#475569"/>` +
				`<text x="349" y="68" text-anchor="middle" font-size="10" font-weight="bold" fill="#fde047">بطاقة معطيات:</text>` +
				`<text x="349" y="90" text-anchor="middle" font-size="10" fill="#e2e8f0">1 UA = 150M km</text>` +
				`<text x="349" y="110" text-anchor="middle" font-size="10" fill="#e2e8f0">بعد الكوكب: ${distAu} UA</text>` +
				`<text x="349" y="132" text-anchor="middle" font-size="10" fill="#93c5fd">الزجاج: وسط شفاف</text>`
		);
		const imageUrl = savePhysicsSvgAsset(`phy_1am_t3_integ_eclipse_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`${isSolar ? 'كسوف الشمس (القمر محاق)' : 'خسوف القمر (القمر بدر)'}، وبعد الكوكب ${distMillion} مليون km`,
			[
				{
					text: `${isSolar ? 'خسوف القمر (القمر بدر)' : 'كسوف الشمس (القمر محاق)'}، وبعد الكوكب ${distMillion} مليون km`,
					diagnosticFeedback: 'راجع ترتيب الأجرام الثلاثة في الوثيقة لتحديد الظاهرة الصحيحة!'
				},
				{
					text: `${isSolar ? 'كسوف الشمس' : 'خسوف القمر'}، وبعد الكوكب ${roundTo(distAu * 100, 1)} مليون km`,
					diagnosticFeedback: 'تذكر أن 1 UA تساوي 150 مليون كيلومتر وليس 100 مليون!'
				},
				{
					text: 'لا تحدث الظاهرة إلا إذا كانت الأرض مسطحة لا تدور',
					diagnosticFeedback: 'الظاهرة ناتجة عن الانتشار المستقيم للضوء واصطفاف الشمس والأرض والقمر.'
				}
			],
			rng
		);

		const quizQuestion: PhysicsGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `انطلاقاً من وثيقة نادي الفلك المقابلة، ما اسم الظاهرة الممثلة وطور القمر فيها، وما بعد الكوكب المذكور بالبطاقة بملايين الكيلومترات؟`,
			questionTextAr: `حدد الظاهرة الفلكية في الوثيقة وبعد الكوكب بملايين الكيلومترات.`,
			imageUrl,
			imageCaption: 'وثيقة نادي الفلك',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الظاهرة هي ${isSolar ? 'كسوف الشمس (القمر في طور المحاق)' : 'خسوف القمر (القمر في طور البدر)'}، والمسافة هي $${distAu} \\times 150 = ${distMillion}$ مليون $\\text{km}$.`
		};

		const hints: [string, string, string] = [
			'انظر للجرم الواقع في الوسط بين الشمس والجرم الآخر.',
			'صنف المنبع (الشمس = مضيء) والأوساط/الكواكب (الأرض والقمر = مضاءة وعتمة).',
			`اضرب $${distAu}$ في $150$ مليون $\\text{km}$.`
		];
		const solutionStepsAr = [
			`في الرسم: ${isSolar ? 'القمر بين الشمس والأرض (كسوف الشمس، طور المحاق)' : 'الأرض بين الشمس والقمر (خسوف القمر، طور البدر)'}.`,
			`بعد الكوكب: $${distAu} \\times 150 = ${distMillion}$ مليون $\\text{km}$.`
		];
		const finalAnswer = `${isSolar ? 'كسوف الشمس' : 'خسوف القمر'} ، ${distMillion} مليون km`;

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 8,
			instruction: `نظّم نادي الفلك بمتوسطة في بسكرة سهرة علمية لمحاكاة الظواهر الفلكية وحساب المسافات في المجموعة الشمسية باستعمال مصباح قوي وكرتين مختلفتي الحجم أمام حائط القاعة، كما توضحه الوثيقة المقابلة:`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1.15fr'],
					children: [
						{
							type: 'text',
							content: `1) صنّف كلاً من (الشمس، القمر، والهواء النقي، والزجاج المصنفر لتلسكوب مغشى) من حيث المنابع والأوساط الضوئية.`,
							answer: `1) الشمس: *جسم مضيء طبيعي*. القمر: *جسم مضاء*. الهواء النقي: *وسط شفاف*. الزجاج المصنفر: *وسط شاف*.`,
							mark: '2.5'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'وثيقة محاكاة الظاهرة الفلكية'
						}
					]
				},
				{
					type: 'text',
					content: `2) ما الظاهرة الفلكية التي تمثلها هذه المحاكاة؟ حدد طور القمر خلالها، وفسّر كيف يرى شخص يقع في منطقة *الظل التام* وشخص يقع في منطقة *الظليل* هذه الظاهرة${isSolar ? ' مع ذكر قاعدة الأمان عند رصدها' : ''}.`,
					answer: `2) الظاهرة هي *${isSolar ? 'كسوف الشمس* ويكون القمر في طور *المحاق*' : 'خسوف القمر* ويكون القمر في طور *البدر*'}. في منطقة *الظل التام* يُرى ${isSolar ? 'كسوفاً كلياً' : 'خسوفاً كلياً'} لانعدام وصول أشعة الشمس، وفي منطقة *الظليل* يُرى ${isSolar ? 'كسوفاً جزئياً' : 'خسوفاً جزئياً'}.${isSolar ? ' القاعدة الأمنية: استعمال نظارات خاصة بالكسوف وعدم النظر مباشرة للشمس.' : ''}`,
					mark: '3'
				},
				{
					type: 'text',
					content: `3) احسب بملايين الكيلومترات بعد الكوكب المذكور في البطاقة ($${distAu} "UA"$). ثم اذكر ماذا ينتج عن دوران الأرض حول نفسها ودورانها حول الشمس.`,
					answer: `3) المسافة: $d = ${distAu} times 150 = ${distMillion}$ مليون $"km"$. ينتج عن دوران الأرض حول نفسها *تعاقب الليل والنهار*، وعن دورانها حول الشمس مع ميلان محورها *تعاقب الفصول الأربعة*.`,
					mark: '2.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Integration T3 #2: Solar Water Heater & Courtyard Shadow Applications
// ═══════════════════════════════════════════════════════════════════════════════
const integrationSolarEnergyShadowsTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1am_t3_integration_solar_energy_shadows',
	grade: '1am',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'وضعية إدماجية (2): السخان الشمسي وظل ساحة المدرسة والطاقة الشمسية',
	curriculumLessonId: 'phy_lesson_1am_t3_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const wallDist = rng.pick(['قريب من الجدار', 'موضوع في منتصف الساحة']);
		const darkColor = seed % 2 === 0 ? 'الأسود' : 'الأبيض';

		const svg = wrapPhysicsSvg(
			420,
			190,
			`<rect x="10" y="10" width="400" height="170" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
				`<text x="210" y="27" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">وثيقة: تجربة السخان الشمسي ومراقبة الظل في ساحة المتوسطة</text>` +
				// Solar heater left
				`<rect x="26" y="48" width="176" height="118" rx="6" fill="#ffffff" stroke="#0f172a" stroke-width="1.4"/>` +
				`<text x="114" y="66" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">السخان الشمسي</text>` +
				`<rect x="44" y="76" width="140" height="46" rx="4" fill="${darkColor === 'الأسود' ? '#1e293b' : '#f1f5f9'}" stroke="#334155" stroke-width="1.5"/>` +
				`<line x1="44" y1="76" x2="184" y2="76" stroke="#38bdf8" stroke-width="3"/>` +
				`<text x="114" y="103" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${darkColor === 'الأسود' ? '#f8fafc' : '#0f172a'}">خزان مطلي باللون ${darkColor}</text>` +
				`<text x="114" y="142" text-anchor="middle" font-size="10" fill="#0369a1">غطاء علوي: زجاج أملس</text>` +
				`<text x="114" y="158" text-anchor="middle" font-size="10" fill="#ca8a04">أشعة الشمس (منبع واسع)</text>` +
				// Shadow pole right
				`<rect x="218" y="48" width="176" height="118" rx="6" fill="#ffffff" stroke="#0f172a" stroke-width="1.4"/>` +
				`<text x="306" y="66" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">ظل السارية في الساحة</text>` +
				`<circle cx="244" cy="88" r="11" fill="#facc15"/>` +
				`<line x1="254" y1="92" x2="364" y2="146" stroke="#f59e0b" stroke-width="1.4" stroke-dasharray="4,3"/>` +
				`<rect x="304" y="108" width="6" height="38" fill="#334155"/>` +
				`<line x1="304" y1="146" x2="366" y2="146" stroke="#1e293b" stroke-width="4"/>` +
				`<text x="336" y="160" text-anchor="middle" font-size="10" font-weight="bold" fill="#475569">ظل السارية (${esc(wallDist)})</text>`
		);
		const imageUrl = savePhysicsSvgAsset(`phy_1am_t3_integ_solar_s${seed}`, svg);

		const correctOption =
			darkColor === 'الأسود'
				? 'يسخن الماء بكفاءة لأن الزجاج شفاف واللون الأسود يمتص أكبر قدر من الطاقة الشمسية'
				: 'يسخن الماء ببطء لأن اللون الأبيض يعكس معظم أشعة الشمس، والأفضل طلاؤه بالأسود';

		const mcq = buildUniqueMcqOptions(
			correctOption,
			[
				{
					text:
						darkColor === 'الأسود'
							? 'لا يسخن الماء لأن اللون الأسود يعكس كل الضوء'
							: 'يسخن الماء بسرعة قصوى لأن اللون الأبيض يمتص كل الحرارة',
					diagnosticFeedback:
						'تذكّر: الأجسام الداكنة (السوداء) تمتص الطاقة الضوئية أكثر، بينما الفاتحة (البيضاء) تعكس معظمها!'
				},
				{
					text: 'الزجاج الأملس وسط عاتم يمنع دخول الضوء إلى الخزان',
					diagnosticFeedback: 'الزجاج الأملس وسط شفاف يسمح بنفاذ أشعة الشمس.'
				},
				{
					text: 'ظل السارية يظل ثابت الطول والاتجاه طوال اليوم لأن الأرض ساكنة',
					diagnosticFeedback: 'الأرض تدور حول نفسها، لذا يتغير موضع الشمس الظاهري ويتغير طول واتجاه الظل.'
				}
			],
			rng
		);

		const quizQuestion: PhysicsGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `في سخان شمسي مغطى بزجاج أملس، طُلي الخزان باللون **${darkColor}**. ما التفسير الفيزيائي الصحيح لنجاعة هذا التسخين؟`,
			questionTextAr: `ما أثر طلاء خزان السخان الشمسي باللون ${darkColor} وتغطيته بزجاج أملس؟`,
			imageUrl,
			imageCaption: 'سخان شمسي وظل السارية',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: correctOption
		};

		const hints: [string, string, string] = [
			'صنّف الزجاج الأملس كوسط ضوئي (شفاف، شاف، أم عاتم).',
			'قارن بين امتصاص اللون الأسود واللون الأبيض لأشعة الشمس.',
			'فكّر في سبب تغير طول الظل بين الصباح والزوال (دوران الأرض، الانتشار المستقيم).'
		];
		const solutionStepsAr = [
			`الزجاج الأملس **وسط شفاف** يمرر أشعة الشمس.`,
			`اللون **الأسود** يمتص قدراً أكبر من الطاقة الشمسية مقارنة باللون **الأبيض** الذي يعكسها.`,
			`لذا: ${correctOption}.`
		];
		const finalAnswer = correctOption;

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 8,
			instruction: `في ولاية أدرار المشمسة، صمّم تلاميذ السنة الأولى متوسط نموذج سخان شمسي بسيط، وراقبوا في الوقت نفسه تغير ظل سارية العلم في ساحة المتوسطة كما في السند المقابل:`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1.15fr'],
					children: [
						{
							type: 'text',
							content: `1) صنّف الغطاء الزجاجي الأملس وجدران السارية الخشبية من حيث الأوساط الضوئية، والشمس من حيث المنابع الضوئية. ثم بيّن لماذا تعدّ الشمس مصدراً أساسياً للطاقة على الأرض.`,
							answer: `1) الزجاج الأملس: *وسط شفاف*. السارية الخشبية: *وسط عاتم*. الشمس: *جسم مضيء طبيعي*. تعدّ الشمس مصدراً أساسياً للطاقة لأنها تزود الأرض بالضوء والحرارة اللازمين للحياة ويمكن تحويل طاقتها إلى حرارة أو كهرباء.`,
							mark: '2.5'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'السخان الشمسي وظل السارية'
						}
					]
				},
				{
					type: 'text',
					content: `2) طُلي الخزان في التجربة باللون **${darkColor}**. هل هذا الاختيار مثالي لتسخين الماء بسرعة؟ علّل إجابتك علمياً، واقترح تحسيناً إذا لزم الأمر.`,
					answer: `2) ${darkColor === 'الأسود' ? 'نعم، اختيار مثالي؛ لأن الأجسام الداكنة (السوداء) تمتص أكبر قدر من طاقة أشعة الشمس وتحولها إلى حرارة فيسخن الماء بسرعة.' : 'لا، هذا الاختيار غير مثالي؛ لأن اللون الأبيض يعكس معظم أشعة الشمس. التحسين المقترح: طلاء الخزان باللون *الأسود* لزيادة امتصاص الطاقة الشمسية.'}`,
					mark: '2.5'
				},
				{
					type: 'text',
					content: `3) لاحظ التلاميذ أن ظل سارية العلم يتغير طوله واتجاهه من الصباح إلى المساء، وأن محيط الظل يحتوي على حافة خفيفة رمادية. فسّر هاتين الملاحظتين اعتماداً على دوران الأرض، الانتشار المستقيم للضوء، ونوع المنبع الضوئي (الشمس).`,
					answer: `3) يتغير طول واتجاه الظل بسبب *دوران الأرض حول نفسها* (تغير زاوية سقوط أشعة الشمس المستقيمة خلال النهار). وتظهر الحافة الرمادية (*الظليل*) حول الظل التام لأن الشمس *منبع ضوئي واسع*.`,
					mark: '3'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

export const PHYSICS_TEMPLATES_1AM_T3: PhysicsParameterizedTemplate[] = [
	sourcesMediaRectilinearTemplate,
	shadowPenumbraTemplate,
	solarSystemAstronomicalUnitsTemplate,
	moonPhasesEclipsesTemplate,
	integrationEclipsesAstronomyTemplate,
	integrationSolarEnergyShadowsTemplate
];
