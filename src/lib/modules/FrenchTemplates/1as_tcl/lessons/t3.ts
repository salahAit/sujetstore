import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchWritingBlueprint
} from '../../svg-french';

// ============================================================================
// 5 Interactive Lessons — 1AS TCL Trimester 3
// Projet 3 : La nouvelle réaliste morale et le fait divers algérien
// ============================================================================

export const LESSONS_1AS_TCL_T3: FrenchInteractiveLessonData[] = [
	// 1. Le schéma narratif et le point de vue du narrateur
	{
		id: 'fre_lesson_1as_tcl_t3_schema_narratif_focalisation',
		slug: 'fre-1as-tcl-t3-schema-narratif-focalisation',
		grade: '1as_tcl',
		yearSubjectId: 665,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع 3: القصة القصيرة الواقعية الهادفة والخبر المتنوع الجزائري',
		order: 1,
		titleAr: 'البنية السردية ووجهات نظر الراوي (Le schéma narratif et les points de vue / focalisations)',
		objectives: [
			'التمييز بين الكاتب (l’auteur) والراوي (le narrateur) والشخصية (le personnage)',
			'تحديد وضعية الراوي (داخلي / خارجي) وزوايا السرد الثلاث: التبئير الصفر (omniscient)، الداخلي (interne)، والخارجي (externe)',
			'تحليل مراحل البنية السردية في القصة القصيرة الواقعية الهادفة'
		],
		keywordsAr: [
			'Narrateur',
			'Point de vue',
			'Focalisation zéro',
			'Focalisation interne',
			'Focalisation externe',
			'Nouvelle réaliste'
		],
		discover: {
			scenarioAr:
				'تأمل هذه الصياغات الثلاث للمشهد نفسه في قصة واقعية عن طالب أمين: (1) « Othmane ramassa le portefeuille ; il ignorait encore que son propriétaire le cherchait déjà dans la rue voisine, le cœur rempli d’inquiétude. » (2) « Je marchais vite quand j’aperçus un portefeuille sur le banc ; je ressentis aussitôt le devoir de le rendre. » (3) « Un jeune homme vêtu d’un manteau bleu s’arrêta devant le banc, ramassa un objet et entra au commissariat. » ما الفرق في معرفة الراوي بين الجمل الثلاث؟',
			svg: svgFrenchGrammarMap({
				title: 'Les 3 points de vue du narrateur (Focalisations)',
				rootLabel: 'Ce que sait et voit le narrateur',
				branches: [
					{
						label: 'Omniscient (Zéro)',
						rule: 'Narrateur > Personnage',
						example: 'Sait pensées, passé et futur'
					},
					{
						label: 'Interne',
						rule: 'Narrateur = Personnage',
						example: 'Voit et sent par un seul regard'
					},
					{
						label: 'Externe',
						rule: 'Narrateur < Personnage',
						example: 'Comme une caméra : gestes seuls'
					}
				]
			}),
			steps: [
				{
					promptAr: 'في الجملة (1)، لماذا نسمي الراوي « عالما بكل شيء » (omniscient / focalisation zéro)؟',
					hintAr: 'لاحظ أنه يعرف ما يجهله عثمان وما يشعر به صاحب المحفظة في شارع آخر!',
					expectedInput: 'لأنه يعرف أفكار ومشاعر جميع الشخصيات وما يقع في أماكن مختلفة في آن واحد',
					revealAr: 'في التبئير الصفر (point de vue omniscient)، يعرف الراوي أكثر من الشخصيات: يدخل قلوبها ويعرف ماضيها ومستقبلها وما يجري في أماكن متفرقة.'
				},
				{
					promptAr: 'في الجملة (2)، ما الضمير المستعمل وما نوع وجهة النظر؟',
					hintAr: 'الراوي يشارك في القصة بـ « Je » ويعبّر عن إحساسه الخاص فقط.',
					expectedInput: 'الضمير Je -> وجهة نظر داخلية (point de vue interne)',
					revealAr: 'عندما يرى القارئ الأحداث بعيون شخصية واحدة (بضمير Je أو أحيانا Il عبر أفعال الإحساس: il sentit, il pensa)، فهذا تبئير داخلي (focalisation interne).'
				},
				{
					promptAr: 'في الجملة (3)، هل يدخل الراوي إلى أفكار الشاب أم يكتفي بوصف ما تراه العين من الخارج؟',
					hintAr: 'شبّه الأمر بكاميرا تسجّل الحركات واللباس فقط.',
					expectedInput: 'يكتفي بالوصف الظاهري فقط -> وجهة نظر خارجية (point de vue externe)',
					revealAr: 'التبئير الخارجي (focalisation externe) يصف المظهر والحركات بحياد تام مثل عدسة الكاميرا دون كشف الأفكار والمشاعر الداخلية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'لا تخلط أبدا بين الكاتب (L’auteur: الشخص الحقيقي الذي ألّف النص) والراوي (Le narrateur: الصوت الذي يحكي القصة داخل النص).',
				'الراوي المشارك في الأحداث (Narrateur personnage / présent) يستعمل « je / nous »، والراوي الغائب عن الأحداث (Narrateur extérieur) يستعمل « il / elle / ils / elles ».',
				'وجهات النظر الثلاث (Les points de vue / Focalisations):',
				'1) التبئير الصفر / العالم بكل شيء (Omniscient / Zéro): الراوي يعرف كل شيء (المشاعر، الأفكار، الأماكن المختلفة، الماضي والمستقبل). 2) التبئير الداخلي (Interne): نرى المشهد عبر وعي وحواس شخصية واحدة (أفعال الإدراك والشعور: voir, entendre, sentir, penser). 3) التبئير الخارجي (Externe): الراوي يلاحظ من الخارج فقط ككاميرا (اللباس، الملامح، الحركات) دون معرفة الباطن.',
				'القصة القصيرة الواقعية (La nouvelle réaliste) قصة موجزة تركز على شخصيات قليلة وحدث واقعي واحد يبلغ ذروته نحو نهاية معبّرة ذات مغزى أخلاقي.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Indices textuels des 3 focalisations',
				subtitle: 'Repérer rapidement le point de vue dans un extrait',
				columns: [
					{
						header: 'Omniscient',
						rule: 'Tout savoir partout',
						examples: 'il ignorait que son voisin...'
					},
					{
						header: 'Interne',
						rule: 'Verbes de perception',
						examples: 'il aperçut, il lui sembla'
					},
					{
						header: 'Externe',
						rule: 'Faits visibles neutres',
						examples: 'un homme entra, posa son sac'
					}
				]
			}),
			visualCaptionAr: 'المؤشرات النصية لتمييز وجهات نظر الراوي الثلاث في النصوص الأدبية',
			examples: [
				{
					problemAr: 'حدّد وجهة النظر في: « Un vieil artisan s’assit sur un tabouret en bois, saisit un pinceau fin et commença à tracer une ligne géométrique. »',
					solutionAr: 'Point de vue externe (تبئير خارجي: وصف حركات ومظهر خارجي فقط كالكاميرا دون ذكر مشاعر).'
				},
				{
					problemAr: 'حدّد وجهة النظر في: « En entrant dans la salle d’examen, Ines sentit son cœur battre vite ; les questions lui semblèrent d’abord difficiles. »',
					solutionAr: 'Point de vue interne (تبئير داخلي: نعيش الموقف عبر إحساس إيناس ورؤيتها « sentit, lui semblèrent »).'
				}
			],
			watchOutAr:
				'احذر! وجود الضمير « il » لا يعني دائما تبئيرا خارجيا؛ فقد يكون الراوي بـ « il » عالما بكل شيء (omniscient) أو يتبنى وجهة نظر شخصية واحدة (interne). العبرة بما يعرفه الراوي لا بالضمير وحده!'
		},
		practice: [
			{
				questionAr: 'ما وجهة النظر الموظفة في: « Pendant que Karim réparait patiemment l’horloge, son père, dans la pièce voisine, se souvenait avec émotion de son propre père qui lui avait appris ce métier trente ans plus tôt. »؟',
				options: [
					'Point de vue externe',
					'Point de vue omniscient (focalisation zéro)',
					'Point de vue purement scientifique',
					'Absence de narrateur'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الراوي يعرف المشاعر والذكريات في غرفتين مختلفتين، فليس خارجيا.',
					'أحسنت! الراوي يطلع على مكانين في آن واحد ويعرف الماضي والمشاعر الداخلية، فهو عالم بكل شيء (omniscient).',
					'هذا نص سردي أدبي لا علمي.',
					'لا يوجد سرد بلا راوٍ.'
				],
				explanationAr: 'معرفة ما يدور في عدة أذهان وأماكن وأزمنة علامة قاطعة على التبئير الصفر (omniscient).'
			},
			{
				questionAr: 'في أي وجهة نظر يكتفي الراوي بنقل الحركات والملابس والأقوال المسموعة كعدسة كاميرا دون كشف الأفكار الداخلية؟',
				options: [
					'Focalisation zéro',
					'Focalisation interne',
					'Focalisation externe',
					'Narration autobiographique'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'التبئير الصفر يكشف كل الخبايا الداخلية.',
					'التبئير الداخلي يكشف مشاعر وإدراكات شخصية واحدة.',
					'ممتاز! التبئير الخارجي (focalisation externe) يرصد الظاهر فقط بحياد كالكاميرا.',
					'السيرة الذاتية تكشف مشاعر الراوي.'
				],
				explanationAr: 'التبئير الخارجي يعني أن الراوي يعرف أقل من الشخصيات ويكتفي بالمشاهد الظاهرة.'
			},
			{
				questionAr: 'ما الفرق بين « l’auteur » و« le narrateur »؟',
				options: [
					'الكاتب هو الشخص الحقيقي الذي كتب النص، والراوي هو الصوت الذي يروي القصة داخل النص',
					'الراوي هو القارئ دائما',
					'الكاتب هو البطل دائما في كل قصة',
					'لا فرق بينهما إطلاقا'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! التمييز بين الكاتب الحقيقي والراوي داخل النص قاعدة ذهبية في دراسة القصة.',
					'القارئ هو المتلقي لا الراوي.',
					'قد يكتب الكاتب قصة عن شخصية لا تشبهه إطلاقا.',
					'هما مفهومان مختلفان في النقد الأدبي.'
				],
				explanationAr: 'الكاتب ينتمي للعالم الواقعي، أما الراوي فكائن ورقي يروي الأحداث داخل النص.'
			},
			{
				questionAr: 'ما المقصود بالقصة القصيرة الواقعية (la nouvelle réaliste)؟',
				options: [
					'رواية طويلة من خمسمائة صفحة عن الفضاء الخارجي',
					'سرد موجز لشخصيات قليلة وأحداث واقعية قريبة من الحياة اليومية تنتهي بخاتمة معبرة',
					'مقال صحفي يشرح معادلات كيميائية',
					'رسالة إدارية رسمية'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'القصة القصيرة موجزة وواقعية.',
					'أحسنت! تجمع « la nouvelle réaliste » بين الإيجاز، الواقعية، وتركيز الحبكة.',
					'هذا نص علمي.',
					'هذه مراسلة رسمية.'
				],
				explanationAr: 'تتميز القصة القصيرة الواقعية بالإيجاز، قلة الشخصيات، وصدق تصوير الواقع.'
			},
			{
				questionAr: 'في الجملة: « Je regardais la pluie tomber sur les tuiles rouges et j’éprouvais une grande sérénité. » ما نوع الراوي ووجهة نظره؟',
				options: [
					'Narrateur extérieur — point de vue externe',
					'Narrateur personnage — point de vue interne',
					'Narrateur absent — point de vue omniscient',
					'Narrateur journaliste — discours scientifique'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'استعمال « Je » يثبت أنه راوٍ مشارك لا خارجي.',
					'إجابة موفقة! الراوي شخصية مشاركة (Je) ويعبّر عن رؤيته وإحساسه الشخصي (point de vue interne).',
					'الراوي حاضر بوضوح.',
					'نص سردي أدبي لا علمي.'
				],
				explanationAr: 'ضمير المتكلم « Je » مع أفعال الإدراك والشعور يحدد الراوي المشارك والتبئير الداخلي.'
			}
		]
	},

	// 2. La description dans le récit (portrait physique et moral)
	{
		id: 'fre_lesson_1as_tcl_t3_description_portrait',
		slug: 'fre-1as-tcl-t3-description-portrait',
		grade: '1as_tcl',
		yearSubjectId: 665,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع 3: القصة القصيرة الواقعية الهادفة والخبر المتنوع الجزائري',
		order: 2,
		titleAr: 'الوصف في السرد: البورتريه الجسدي والأخلاقي (La description : portrait physique et moral)',
		objectives: [
			'التمييز بين الوصف الخارجي/الجسدي (portrait physique) والوصف المعنوي/الأخلاقي (portrait moral)',
			'معرفة وظائف الوصف في القصة الواقعية (الواقعية، الكشف عن نفسية الشخصية، وخلق الجو العام)',
			'توظيف معجم الوصف والماضي الناقص والنعوت لرسم صورة حية ومتوازنة لشخصية أو مكان'
		],
		keywordsAr: [
			'Description',
			'Portrait physique',
			'Portrait moral',
			'Imparfait descriptif',
			'Portrait valorisant'
		],
		discover: {
			scenarioAr:
				'اقرأ هذا البورتريه لأحد الحرفيين التقليديين في قصة واقعية: « Maître Ahmed était un homme âgé à la barbe blanche soigneusement taillée. Ses mains habiles portaient les traces de quarante années de travail du bois, et son regard vif brillait sous des lunettes rondes. D’un caractère calme, patient et généreux, il accueillait chaque apprenti avec bienveillance et transmettait son art sans jamais compter ses heures. »',
			svg: svgFrenchGrammarMap({
				title: 'Réussir un portrait dans un récit réaliste',
				rootLabel: 'Décrire un personnage de façon vivante',
				branches: [
					{
						label: 'Portrait physique',
						rule: 'Visage, taille, regard, habits',
						example: 'barbe blanche, regard vif'
					},
					{
						label: 'Portrait moral',
						rule: 'Qualités, caractère, valeurs',
						example: 'calme, patient et généreux'
					},
					{
						label: 'Outils linguistiques',
						rule: 'Imparfait + adjectifs + verbes',
						example: 'était, portait, brillait'
					}
				]
			}),
			steps: [
				{
					promptAr: 'صنّف العبارات الآتية إلى بورتريه جسدي (physique) وبورتريه أخلاقي (moral): « barbe blanche »، « caractère calme »، « regard vif »، « patient et généreux ».',
					hintAr: 'الجسدي يُرى بالعين، والأخلاقي يتعلق بالطباع والسلوك.',
					expectedInput: 'جسدي: barbe blanche, regard vif — أخلاقي: caractère calme, patient et généreux',
					revealAr: 'البورتريه الجسدي يصف الملامح الظاهرة (barbe blanche, mains habiles, regard vif)، والأخلاقي يصف الطباع والقيم (calme, patient, généreux, bienveillance).'
				},
				{
					promptAr: 'هل هذا البورتريه إيجابي مُثمِّن (valorisant / mélioratif) أم سلبي مُنفِّر (dévalorisant)؟',
					hintAr: 'انظر إلى دلالة الصفات: soigneusement, habiles, vif, généreux, bienveillance.',
					expectedInput: 'بورتريه إيجابي مُثمِّن (portrait valorisant)',
					revealAr: 'يبرز الكاتب خصال الحرفي ونبله عبر معجم استحساني إيجابي، فهو بورتريه مُثمِّن (valorisant).'
				},
				{
					promptAr: 'ما الزمن المهيمن في هذا المقطع الوصفي؟',
					hintAr: 'تأمل الأفعال: était, portaient, brillait, accueillait, transmettait.',
					expectedInput: 'الماضي الناقص الوصفي (L’imparfait descriptif)',
					revealAr: 'يُعدّ الماضي الناقص (l’imparfait) الزمن الأساسي للوصف داخل السرد في الماضي.'
				}
			]
		},
		summary: {
			rulesAr: [
				'البورتريه الجسدي (Le portrait physique): يشمل القامة (silhouette, taille)، الوجه والملامح (visage, front, regard, sourire)، الشعر واللباس (vêtements)، والحركات (démarche, gestes).',
				'البورتريه الأخلاقي/النفسي (Le portrait moral): يصف الطباع والسلوك والقيم (honnête, modeste, courageux, persévérant, bienveillant, sérieux, réservé).',
				'تنظيم الوصف المكاني والجسدي: يتدرج الوصف غالبا من العام إلى الخاص (du général au particulier) أو من الأعلى إلى الأسفل (de haut en bas) باستعمال محددات المكان (au premier plan, à gauche, au fond, sous, devant).',
				'أدوات الوصف: الماضي الناقص (imparfait)، أفعال الحالة والإدراك (être, paraître, sembler, avoir l’air, porter)، النعوت (adjectifs, compléments du nom, relatives)، والتشبيه.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Outils lexicaux du portrait réaliste',
				subtitle: 'Enrichir ses descriptions en 1AS TCL',
				columns: [
					{
						header: 'Physique',
						rule: 'Trait visible',
						examples: 'sourire franc, mains agiles'
					},
					{
						header: 'Moral',
						rule: 'Qualité intérieure',
						examples: 'intègre, persévérant, discret'
					},
					{
						header: 'Verbes d’état',
						rule: 'Éviter de répéter « être »',
						examples: 'paraissait, inspirait, dégageait'
					}
				]
			}),
			visualCaptionAr: 'وسائل إغناء البورتريه الجسدي والأخلاقي في القصة القصيرة الواقعية',
			examples: [
				{
					problemAr: 'حوّل الجملة البسيطة « Nadia était une bonne élève » إلى جملة وصفية غنية تجمع بين الجسدي والأخلاقي.',
					solutionAr: 'Nadia, au visage serein et au regard attentif, se distinguait par son sérieux, sa modestie et son goût sincère pour l’étude.'
				},
				{
					problemAr: 'اذكر وظيفتين للوصف داخل القصة القصيرة الواقعية.',
					solutionAr: '1) ترسيخ الطابع الواقعي للقصة (effet de réel) — 2) الكشف عن شخصية البطل وتمهيد فهم تصرفاته الأخلاقية.'
				}
			],
			watchOutAr:
				'تجنب تكرار « Il avait... Il avait... Il était... Il était... » في الوصف! نوّع الأفعال باستعمال: « se distinguait par, dégageait, arborait, inspirait confiance, paraissait ».'
		},
		practice: [
			{
				questionAr: 'أي عبارة تنتمي إلى البورتريه الأخلاقي (portrait moral)؟',
				options: [
					'Un front large et des cheveux gris',
					'Une grande honnêteté et un sens profond du devoir',
					'Un manteau sombre en laine épaisse',
					'Une démarche rapide et assurée'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذا وصف جسدي للوجه والشعر.',
					'أحسنت! الأمانة والإحساس بالواجب خصال داخلية (portrait moral).',
					'هذا وصف للباس (خارجي).',
					'هذا وصف للحركة والمشية (خارجي).'
				],
				explanationAr: 'البورتريه الأخلاقي يصف الصفات النفسية والقيم السلوكية للشخصية.'
			},
			{
				questionAr: 'ما الزمن الرئيسي المستعمل في المقاطع الوصفية داخل قصة في الماضي؟',
				options: ['Le futur antérieur', 'L’imparfait', 'L’impératif présent', 'Le subjonctif'],
				correctIndex: 1,
				diagnosticFeedback: [
					'المستقبل الأسبق لا يُستعمل للوصف الماضي.',
					'ممتاز! الماضي الناقص هو زمن الوصف بامتياز في السرد الماضي.',
					'الأمر ليس زمن وصف.',
					'المنصوب ليس زمن وصف.'
				],
				explanationAr: 'تأتي أوصاف الأشخاص والأماكن في الماضي الناقص (imparfait descriptif).'
			},
			{
				questionAr: 'في الجملة: « Le vieil homme inspirait immédiatement le respect par sa voix posée et sa grande générosité. » ما طبيعة هذا الوصف؟',
				options: [
					'Portrait dévalorisant (سلبي)',
					'Portrait valorisant (إيجابي مُثمِّن)',
					'Description purement technique',
					'Énumération scientifique'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الصفات كلها إيجابية ولا تنتقص من الشخصية.',
					'صحيح! « respect, voix posée, générosité » ترسم صورة مشرقة ومُثمّنة (valorisant).',
					'ليس وصفا تقنيا لآلة.',
					'ليس تعدادا علميا.'
				],
				explanationAr: 'استعمال الصفات الاستحسانية يكوّن بورتريه إيجابيا (portrait valorisant).'
			},
			{
				questionAr: 'ما وظيفة الوصف الواقعي لدكان أو حي جزائري في بداية القصة القصيرة؟',
				options: [
					'Créer un effet de réel et situer l’action dans un cadre crédible',
					'Remplacer totalement les événements de l’histoire',
					'Expliquer une règle de chimie',
					'Donner l’adresse postale du lecteur'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! يخلق الوصف الواقعي « أثر الواقع » (effet de réel) ويجعل القارئ يصدّق الإطار المكاني.',
					'الوصف يكمل السرد ولا يلغي الأحداث.',
					'لا علاقة له بالكيمياء.',
					'غير صحيح.'
				],
				explanationAr: 'الوصف يرسّخ مصداقية الإطار الواقعي (fonction réaliste) ويمهّد للأحداث.'
			},
			{
				questionAr: 'أي جملة تتجنب تكرار الفعل « être » وتستخدم فعلا وصفيا أدق؟',
				options: [
					'Le calligraphe était grand, il était calme et il était patient.',
					'Le calligraphe dégageait une calme sérénité et se distinguait par sa patience remarquable.',
					'Le calligraphe est ici et il est là.',
					'Le calligraphe avait un être patient.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'فيها تكرار رتيب للفعل était ثلاث مرات.',
					'إجابة موفقة! الأفعال « dégageait » و« se distinguait par » ترتقي بأسلوب الوصف الأدبي.',
					'جملة فقيرة جدا.',
					'تركيب خاطئ بالفرنسية.'
				],
				explanationAr: 'تنويع الأفعال الوصفية (dégager, se distinguer par, paraître, inspirer) يثري التعبير.'
			}
		]
	},

	// 3. Le discours direct, indirect et les verbes de parole
	{
		id: 'fre_lesson_1as_tcl_t3_discours_direct_indirect',
		slug: 'fre-1as-tcl-t3-discours-direct-indirect',
		grade: '1as_tcl',
		yearSubjectId: 665,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع 3: القصة القصيرة الواقعية الهادفة والخبر المتنوع الجزائري',
		order: 3,
		titleAr: 'الكلام المباشر وغير المباشر وأفعال القول (Discours direct, indirect et verbes de parole)',
		objectives: [
			'توظيف علامات الترقيم الدقيقة للكلام المباشر (النقطتان، المزدوجتان، والعارضة لتغيير المتحدث) وإدراج جملة القول المعترضة (incise)',
			'تنويع أفعال القول (verbes de parole) حسب النبرة والمعنى بدل تكرار « dire » (répondre, demander, murmurer, s’exclamer, conseiller, assurer)',
			'التحويل السليم بين الكلام المباشر وغير المباشر مع ضبط تغيّر الضمائر والأزمنة ومؤشرات الزمان والمكان'
		],
		keywordsAr: [
			'Discours direct',
			'Discours indirect',
			'Verbes de parole',
			'Proposition incise',
			'Concordance des temps'
		],
		discover: {
			scenarioAr:
				'في قصة واقعية حول الأمانة، دار هذا الحوار القصير: « Avez-vous perdu ce carnet hier dans le bus ? demanda poliment Amine. — Oui, merci infiniment, mon fils ! s’exclama le professeur soulagé. Je le cherchais depuis ce matin. » وعندما روى الكاتب المشهد بالكلام غير المباشر كتب: « Amine demanda poliment au professeur s’il avait perdu ce carnet la veille dans le bus. Le professeur s’exclama avec soulagement qu’il le cherchait depuis ce matin-là. »',
			svg: svgFrenchGrammarMap({
				title: 'Rapporter des paroles dans un récit',
				rootLabel: 'Direct (vivant) <-> Indirect (intégré au récit)',
				branches: [
					{
						label: 'Discours direct',
						rule: ': « ... » et tirets (—)',
						example: '« Merci ! » s’exclama-t-il.'
					},
					{
						label: 'Discours indirect',
						rule: 'que / si / de + inf. (pas de « »)',
						example: 'Il demanda s’il avait...'
					},
					{
						label: 'Verbes de parole',
						rule: 'Préciser le ton et l’intention',
						example: 'murmurer, affirmer, conseiller'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما التغييرات الأربعة التي طرأت عند تحويل « Avez-vous perdu ce carnet hier ? » إلى « s’il avait perdu ce carnet la veille »؟',
					hintAr: 'لاحظ: أداة الربط، الضمير، الزمن، وظرف الزمان.',
					expectedInput: 'إضافة si، تحوّل vous -> il، تحوّل الماضي المركب -> plus-que-parfait، وتحوّل hier -> la veille',
					revealAr: 'عندما يكون فعل القول في الماضي (demanda)، يتغير كل من: الترقيم (حذف « » و؟)، الضمير (vous -> il)، الزمن (passé composé -> plus-que-parfait)، وظرف الزمان (hier -> la veille).'
				},
				{
					promptAr: 'ماذا نسمي العبارة « demanda poliment Amine » الواقعة بعد القول المباشر مع قلب الفاعل والفعل؟',
					hintAr: 'إنها الجملة المعترضة التي تحدد المتكلم ونبرته.',
					expectedInput: 'الجملة المعترضة (La proposition incise)',
					revealAr: 'تُسمى « proposition incise »، وفيها يُقلب الفاعل والفعل دائما: « ... » répondit le vieil homme / murmura-t-elle.'
				},
				{
					promptAr: 'لماذا اختار الكاتب الفعلين « demanda » و« s’exclama » بدل تكرار الفعل « dit » مرتين؟',
					hintAr: 'كل فعل ينقل نبرة وشعورا محددا (السؤال / الدهشة والفرح).',
					expectedInput: 'لأن أفعال القول المتنوعة توضح نبرة الصوت والمشاعر وتُثري أسلوب الحوار',
					revealAr: 'أفعال القول الدقيقة (demander, répondre, murmurer, protester, rassurer, s’exclamer, avouer) تجعل الحوار واقعيا ومعبّرا.'
				}
			]
		},
		summary: {
			rulesAr: [
				'قواعد الكلام المباشر (Discours direct): يضفي حيوية وواقعية على القصة؛ يُقدّم بنقطتين ومزدوجتين ( : « ... » )، ونضع عارضة ( — ) عند بداية السطر كلما تغيّر المتحدث. وفي الجملة المعترضة (incise) نقلب الفاعل: « C’est votre sac », annonça Bilal.',
				'تصنيف أفعال القول (Les verbes de parole): للسؤال (demander, interroger, s’enquérir)، للإجابة (répondre, répliquer, préciser)، للنبرة الهادئة أو المرتفعة (murmurer, chuchoter / s’écrier, s’exclamer)، للنصيحة والتوجيه (conseiller, recommander, encourager)، للتأكيد (affirmer, assurer, déclarer).',
				'تطابق الأزمنة في الكلام غير المباشر (عندما يكون فعل القول في الماضي مثل il dit / il a dit / il demanda):',
				'- Présent -> Imparfait | Passé composé -> Plus-que-parfait | Futur simple -> Conditionnel présent | Impératif -> de + Infinitif.',
				'- المؤشرات: ici -> là | aujourd’hui -> ce jour-là | hier -> la veille | demain -> le lendemain.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Concordance des temps (Verbe introducteur au passé)',
				subtitle: 'Passer du discours direct au discours indirect sans erreur',
				columns: [
					{
						header: 'Présent -> Imparfait',
						rule: 'je lis -> qu’il lisait',
						examples: 'est -> était / a -> avait'
					},
					{
						header: 'Passé comp. -> PQP',
						rule: 'j’ai vu -> qu’il avait vu',
						examples: 'hier -> la veille'
					},
					{
						header: 'Futur -> Conditionnel',
						rule: 'je viendrai -> viendrait',
						examples: 'demain -> le lendemain'
					}
				]
			}),
			visualCaptionAr: 'جدول تطابق الأزمنة والمؤشرات عند التحويل إلى الكلام غير المباشر في السرد الماضي',
			examples: [
				{
					problemAr: 'حوّل إلى الكلام غير المباشر: « Le libraire promit à l’élève : "Demain, je te prêterai ce dictionnaire." »',
					solutionAr: 'Le libraire promit à l’élève que le lendemain, il lui prêterait ce dictionnaire.'
				},
				{
					problemAr: 'حوّل إلى الكلام المباشر: « La mère conseilla à son fils de persévérer dans ses études. »',
					solutionAr: 'La mère conseilla à son fils : « Persévère dans tes études ! »'
				}
			],
			watchOutAr:
				'في الجملة المعترضة (incise) لا تنسَ قلب الفاعل والفعل ولا تنسَ حرف t الصوتي عند الحاجة: « dit-il », « murmura-t-elle », « répondit l’artisan » (خطأ: « il dit » بعد القول بين مزدوجتين).'
		},
		practice: [
			{
				questionAr: 'حوّل إلى الكلام غير المباشر: « L’artisan expliqua à son apprenti : "J’ai appris ce métier ici." »',
				options: [
					'L’artisan expliqua à son apprenti qu’il a appris ce métier ici.',
					'L’artisan expliqua à son apprenti qu’il avait appris ce métier là.',
					'L’artisan expliqua à son apprenti si il avait appris ce métier là.',
					'L’artisan expliqua à son apprenti qu’il apprendra ce métier là.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'بما أن فعل القول في الماضي (expliqua)، يجب تحويل الماضي المركب إلى plus-que-parfait وici إلى là.',
					'أحسنت! تحوّل الضمير (J’ -> il) والزمن (ai appris -> avait appris) والمكان (ici -> là).',
					'« si » للاستفهام الكلي لا للجملة الإخبارية.',
					'لا يتحول الماضي إلى مستقبل.'
				],
				explanationAr: 'مع فعل قول في الماضي: Passé composé -> Plus-que-parfait، وici -> là.'
			},
			{
				questionAr: 'أي فعل قول يناسب التعبير عن الكلام بصوت خافت وهادئ؟',
				options: ['s’écrier', 'murmurer', 'ordonner', 'protester'],
				correctIndex: 1,
				diagnosticFeedback: [
					'« s’écrier » يعني الصياح بصوت عالٍ.',
					'ممتاز! « murmurer » (همس) يعبر عن الصوت الخافت الهادئ.',
					'« ordonner » يدل على الأمر.',
					'« protester » يدل على الاحتجاج.'
				],
				explanationAr: '« murmurer » و« chuchoter » فعلان يدلان على الصوت الخافت.'
			},
			{
				questionAr: 'اختر الصياغة السليمة للجملة المعترضة (proposition incise) في الكلام المباشر:',
				options: [
					'« Merci pour votre aide », il répondit.',
					'« Merci pour votre aide », répondit-il.',
					'« Merci pour votre aide », répondait il.',
					'« Merci pour votre aide » que répondit-il.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'في الجملة المعترضة يجب قلب الفاعل والفعل (répondit-il).',
					'صحيح! قلب الفعل والضمير مع الشرطة « répondit-il » هو القاعدة القياسية.',
					'تنقص الشرطة بين الفعل والضمير (trait d’union).',
					'لا نضع « que » قبل الجملة المعترضة.'
				],
				explanationAr: 'في الجملة المعترضة نقلب الفاعل والفعل دائما: « ... », répondit-il / s’exclama-t-elle.'
			},
			{
				questionAr: 'حوّل إلى الكلام غير المباشر: « Le vieil homme demanda au passant : "Pouvez-vous m’indiquer la mosquée ?" »',
				options: [
					'Le vieil homme demanda au passant s’il pouvait lui indiquer la mosquée.',
					'Le vieil homme demanda au passant qu’il peut lui indiquer la mosquée.',
					'Le vieil homme demanda au passant s’il peut m’indiquer la mosquée ?',
					'Le vieil homme demanda au passant ce qu’il pouvait indiquer la mosquée.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! استفهام كلي -> « si »، ومضارع -> « imparfait » (pouvait)، والضمير « m’ » -> « lui » مع حذف علامة الاستفهام.',
					'لا نستعمل « que » للسؤال الكلي ولم يتغير الزمن.',
					'بقيت علامة الاستفهام والضمير m’ والمضارع دون تغيير.',
					'« ce que » خاصة بـ Que لا بالسؤال الكلي.'
				],
				explanationAr: 'السؤال الكلي بعد فعل قول ماضٍ يأخذ « si + imparfait » مع تعديل الضمائر.'
			},
			{
				questionAr: 'ما وظيفة العارضة ( — ) في بداية السطر داخل الحوار السردي؟',
				options: [
					'الإعلان عن تغيير المتكلم داخل الحوار (changement d’interlocuteur)',
					'إنهاء القصة تماما',
					'استبدال النقطة في آخر كل جملة سردية',
					'الدلالة على الكلام غير المباشر'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة موفقة! نضع عارضة في بداية السطر كلما انتقل الكلام إلى متحدث جديد.',
					'لا تنهي القصة.',
					'لا تحل محل النقطة.',
					'تُستعمل في الكلام المباشر لا غير المباشر.'
				],
				explanationAr: 'في الحوار المباشر نفتح المزدوجتين في بداية الحوار ونستخدم العارضة عند كل تبديل للمتكلم.'
			}
		]
	},

	// 4. Les figures de style simples (comparaison, métaphore, énumération)
	{
		id: 'fre_lesson_1as_tcl_t3_figures_de_style',
		slug: 'fre-1as-tcl-t3-figures-de-style',
		grade: '1as_tcl',
		yearSubjectId: 665,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع 3: القصة القصيرة الواقعية الهادفة والخبر المتنوع الجزائري',
		order: 4,
		titleAr: 'الصور البلاغية البسيطة: التشبيه، الاستعارة، والتعداد (Comparaison, métaphore, énumération)',
		objectives: [
			'التمييز الدقيق بين التشبيه (la comparaison: بوجود أداة تشبيه) والاستعارة (la métaphore: بدون أداة تشبيه)',
			'تحديد عناصر التشبيه الأربعة: المشبّه (comparé)، المشبّه به (comparant)، أداة التشبيه (outil)، ووجه الشبه (point commun)',
			'التعرف على أسلوب التعداد (l’énumération) وأثره الجمالي والوصفي داخل القصة الواقعية'
		],
		keywordsAr: [
			'Figures de style',
			'Comparaison',
			'Métaphore',
			'Énumération',
			'Comparé et comparant'
		],
		discover: {
			scenarioAr:
				'تأمل هذه الجمل الأدبية الثلاث من قصة واقعية حول طلب العلم والعمل في الجزائر: (1) « La patience est comme une graine qui finit toujours par donner des fruits. » (2) « La bibliothèque du quartier était un phare silencieux au cœur de la ville. » (3) « Sur la table du calligraphe s’alignaient des roseaux taillés, des flacons d’encre noire, des feuilles épaisses et des règles en bois. » لاحظ كيف أضفت كل جملة صورة معبّرة على المعنى.',
			svg: svgFrenchGrammarMap({
				title: 'Les 3 figures de style au programme (1AS TCL)',
				rootLabel: 'Donner de l’éclat et de la force au récit',
				branches: [
					{
						label: 'Comparaison',
						rule: 'Comparé + OUTIL + Comparant',
						example: 'calme comme un lac d’eau claire'
					},
					{
						label: 'Métaphore',
						rule: 'Comparaison SANS outil',
						example: 'Le livre est un phare fidèle.'
					},
					{
						label: 'Énumération',
						rule: 'Suite de termes (accumulation)',
						example: 'livres, cahiers, encres, plumes'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما أداة التشبيه في الجملة (1)، وما المشبّه والمشبّه به؟',
					hintAr: 'ابحث عن كلمة « comme ».',
					expectedInput: 'الأداة: comme | المشبّه: La patience | المشبّه به: une graine',
					revealAr: 'هذه صورة التشبيه (la comparaison): المشبّه « La patience »، الأداة « comme »، المشبّه به « une graine ».'
				},
				{
					promptAr: 'قارن بين الجملة (1) والجملة (2): « La bibliothèque était un phare silencieux. » هل توجد أداة تشبيه في الجملة (2)؟',
					hintAr: 'تم الربط مباشرة بالفعل « était » دون comme أو tel que.',
					expectedInput: 'لا توجد أداة تشبيه -> إنها استعارة (une métaphore)',
					revealAr: 'الاستعارة (la métaphore) هي تشبيه بليغ حُذفت منه أداة التشبيه لتقوية الصورة ودمج المشبّه بالمشبّه به.'
				},
				{
					promptAr: 'ما الصورة الأسلوبية في الجملة (3)؟ وما أثرها في وصف ورشة الخطاط؟',
					hintAr: 'عُدّ العناصر المذكورة على الطاولة.',
					expectedInput: 'التعداد (L’énumération) — يبرز غنى وتنوع أدوات الحرفي ودقة المشهد',
					revealAr: 'تتابع العناصر الأربعة (roseaux, flacons d’encre, feuilles, règles) يمثّل التعداد (l’énumération) ويمنح القارئ انطباعا بالوفرة والواقعية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'التشبيه (La comparaison): يجمع بين عنصرين (comparé وcomparant) بوجود أداة تشبيه واضحة: comme, tel(le), semblable à, pareil à, ressembler à, aussi ... que, plus ... que.',
				'الاستعارة (La métaphore): تقرّب بين عنصرين دون أي أداة تشبيه، فتمنح النص قوة إيحائية وجمالية أعلى (مثال: « Le savoir est une lumière qui guide les pas »، « Une mer de dunes dorées »).',
				'التعداد (L’énumération): سرد متتابع لثلاثة عناصر فأكثر من نفس الفئة النحوية تفصلها فواصل، ويُستخدم لخلق تأثير الوفرة أو الدقة الواقعية في الوصف أو الحماس في السرد.',
				'عند تحليل صورة بلاغية في الامتحان نذكر خطوتين: (1) تسمية الصورة (comparaison / métaphore / énumération)، (2) بيان أثرها المعنوي في السياق (إبراز قيمة العلم، تصوير الهدوء، تأكيد الكثرة...).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Transformer une comparaison en métaphore',
				subtitle: 'Supprimer simplement l’outil de comparaison',
				columns: [
					{
						header: 'Comparaison',
						rule: 'Avec outil (comme / tel)',
						examples: 'Le livre est comme un trésor.'
					},
					{
						header: 'Métaphore',
						rule: 'Sans outil (directe)',
						examples: 'Le livre est un trésor.'
					},
					{
						header: 'Énumération',
						rule: '3 éléments et plus',
						examples: 'calme, courage et droiture'
					}
				]
			}),
			visualCaptionAr: 'العلاقة المباشرة بين التشبيه والاستعارة وكيفية تمييز التعداد',
			examples: [
				{
					problemAr: 'حدّد الصورة البلاغية في كل جملة: (1) « Ses paroles douces ressemblaient à un baume apaisant. » (2) « La générosité est un pont entre les cœurs. »',
					solutionAr: '(1) Comparaison (لوجود أداة التشبيه « ressemblaient à »). (2) Métaphore (تشبيه مباشر بدون أداة).'
				},
				{
					problemAr: 'حوّل التشبيه التالي إلى استعارة: « Le temps file vite comme un fleuve. »',
					solutionAr: '« Le temps est un fleuve rapide » أو « Le fleuve du temps s’écoule sans cesse. »'
				}
			],
			watchOutAr:
				'انتبه! لا تظن أن « comme » هي أداة التشبيه الوحيدة؛ فالأفعال والصفات مثل « ressembler à, pareil à, semblable à, tel que » كلها أدوات تشبيه (comparaison) وليست استعارة!'
		},
		practice: [
			{
				questionAr: 'ما الصورة البلاغية في الجملة: « Les ponts de Constantine se dressent tels des géants de pierre au-dessus du Rhumel. »؟',
				options: ['Une métaphore', 'Une comparaison', 'Une énumération', 'Une négation'],
				correctIndex: 1,
				diagnosticFeedback: [
					'توجد أداة تشبيه صريحة هي « tels »، لذا ليست استعارة.',
					'أحسنت! وجود أداة التشبيه « tels » يحدّد بوضوح صورة التشبيه (la comparaison).',
					'لا يوجد تعداد لعدة عناصر.',
					'لا يوجد نفي.'
				],
				explanationAr: '« tel / telle / tels / telles » من أشهر أدوات التشبيه الأدبي.'
			},
			{
				questionAr: 'ما الصورة البلاغية في: « L’école est un jardin où grandissent les esprits curieux. »؟',
				options: ['Une comparaison', 'Une métaphore', 'Une énumération', 'Une interrogation'],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا توجد أي أداة تشبيه (مثل comme أو tel).',
					'ممتاز! شبّه الكاتب المدرسة بالحديقة مباشرة بدون أداة، فهذه استعارة (métaphore).',
					'لا يوجد تعداد.',
					'جملة إخبارية لا استفهامية.'
				],
				explanationAr: 'الربط المباشر بين المشبّه والمشبّه به دون أداة يشكّل الاستعارة (métaphore).'
			},
			{
				questionAr: 'حدّد الصورة الأسلوبية في: « Les habitants apportèrent des couvertures, des vivres, des remèdes et du bois de chauffage aux familles isolées par la neige. »',
				options: ['Une comparaison', 'Une métaphore', 'Une énumération', 'Une répétition d’un seul mot'],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا يوجد تشبيه.',
					'لا توجد استعارة.',
					'صحيح! توالي أربعة أسماء (couvertures, vivres, remèdes, bois) يمثل التعداد (énumération) ويبرز حجم التضامن.',
					'الكلمات مختلفة وليست تكرارا لكلمة واحدة.'
				],
				explanationAr: 'سرد عدة عناصر متلاحقة لإبراز الكثرة والتضامن هو أسلوب التعداد (énumération).'
			},
			{
				questionAr: 'حوّل التشبيه التالي إلى استعارة: « Ce vieux sage était comme une boussole pour les jeunes du village. »',
				options: [
					'Ce vieux sage ressemblait à une boussole pour les jeunes du village.',
					'Ce vieux sage était une boussole pour les jeunes du village.',
					'Ce vieux sage était pareil à une boussole.',
					'Ce vieux sage avait une boussole, une carte et un livre.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'« ressemblait à » أداة تشبيه، فبقيت الجملة تشبيها.',
					'أحسنت! بحذف الأداة « comme » تحول التشبيه مباشرة إلى استعارة معبرة.',
					'« pareil à » أداة تشبيه أيضا.',
					'هنا أصبحت الجملة تعدادا واقعيا لا استعارة.'
				],
				explanationAr: 'الانتقال من التشبيه إلى الاستعارة يتم بحذف أداة التشبيه.'
			},
			{
				questionAr: 'في التشبيه « Son sourire lumineux était aussi chaleureux que le soleil d’hiver », ما هو المشبّه به (le comparant)؟',
				options: ['Son sourire lumineux', 'aussi ... que', 'le soleil d’hiver', 'chaleureux'],
				correctIndex: 2,
				diagnosticFeedback: [
					'هذا هو المشبّه (le comparé).',
					'هذه أداة التشبيه (l’outil de comparaison).',
					'إجابة دقيقة! « le soleil d’hiver » هو المشبّه به (le comparant).',
					'« chaleureux » هو وجه الشبه (le point commun).'
				],
				explanationAr: 'أركان التشبيه: المشبّه (son sourire)، الأداة (aussi... que)، وجه الشبه (chaleureux)، والمشبّه به (le soleil d’hiver).'
			}
		]
	},

	// 5. Rédiger un récit réaliste moral ou le compte rendu d'un texte narratif
	{
		id: 'fre_lesson_1as_tcl_t3_rediger_recit_compte_rendu',
		slug: 'fre-1as-tcl-t3-rediger-recit-compte-rendu',
		grade: '1as_tcl',
		yearSubjectId: 665,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع 3: القصة القصيرة الواقعية الهادفة والخبر المتنوع الجزائري',
		order: 5,
		titleAr: 'تحرير قصة واقعية هادفة أو تقرير موضوعي لنص سردي (Récit réaliste moral ou compte rendu narratif)',
		objectives: [
			'تحرير قصة قصيرة واقعية ذات مغزى أخلاقي (14 إلى 18 سطرا) تدمج البنية السردية، البورتريه، حوارا موجزا، وصورة بلاغية',
			'معرفة منهجية التقرير الموضوعي لنص سردي أو خبر متنوع (تقديم القصة/الخبر، تلخيص الأحداث بضمير الغائب، وإبراز العبرة دون إبداء رأي شخصي)',
			'اختيار الموضوع الأنسب في اختبار شعبة الآداب (السؤال الاختياري /7 نقاط) وإدارة الوقت بدقة'
		],
		keywordsAr: [
			'Production écrite',
			'Récit réaliste moral',
			'Compte rendu narratif',
			'Dialogue bref',
			'Portrait intégré'
		],
		discover: {
			scenarioAr:
				'في اختبار الفصل الثالث للأولى ثانوي آداب، يُمنح للتلميذ خياران في الإنتاج الكتابي (7 نقاط): إما تحرير تقرير موضوعي (Compte rendu objectif) للنص السردي/الخبر المتنوع المدروس، أو كتابة قصة واقعية هادفة تضم وصفا لشخصية وحوارا قصيرا وعبرة أخلاقية. كيف تتقن الخيارين معا؟',
			svg: svgFrenchWritingBlueprint({
				title: 'Réussir la Production Écrite Narrative (1AS TCL /7 pts)',
				steps: [
					{
						stage: 'Option 1 : Compte rendu',
						detail: 'Accroche (récit/fait divers) + résumé fidèle au présent + morale.'
					},
					{
						stage: 'Option 2 : Récit (Début)',
						detail: 'Cadre algérien + bref portrait physique et moral (Imparfait).'
					},
					{
						stage: 'Option 2 : Action + Dialogue',
						detail: 'Soudain... (Passé simple) + 2 répliques vivantes + 1 métaphore.'
					},
					{
						stage: 'Option 2 : Fin + Morale',
						detail: 'Résolution heureuse + leçon morale claire et mémorable.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما العناصر التي تميز التقرير الموضوعي لنص سردي عن التقرير الموضوعي لنص علمي؟',
					hintAr: 'في النص السردي نذكر النوع (récit réaliste / fait divers)، الشخصيات، الزمان والمكان، الحدث الرئيسي، والعبرة.',
					expectedInput: 'نوع النص سردي، غايته السرد والتوعية الأخلاقية، وتلخيص مراحل القصة بالمضارع بضمير الغائب',
					revealAr: 'في مقدمة التقرير الموضوعي لنص سردي نكتب: « Ce récit réaliste (ou fait divers), intitulé "...", écrit par ... et extrait de ..., raconte l’histoire de ... afin d’informer / de transmettre une leçon d’honnêteté (ou de solidarité). » ثم نلخص الأحداث بالمضارع.'
				},
				{
					promptAr: 'ما العناصر الأدبية الثلاثة التي تجعل قصتك الواقعية في 1AS TCL مميزة ومقنعة؟',
					hintAr: 'تذكّر دروس هذا الفصل: البورتريه، الحوار، والصور البلاغية.',
					expectedInput: 'بورتريه جسدي وأخلاقي موجز + حوار قصير بعلاماته + تشبيه أو استعارة معبّرة',
					revealAr: 'إدراج بورتريه موجز بالماضي الناقص، ومقطعين من الحوار المباشر بفعل قول دقيق، وصورة بلاغية (تشبيه أو استعارة) يرفع مستوى التحرير الأدبي بشكل لافت.'
				},
				{
					promptAr: 'بأي زمن نلخص أحداث القصة داخل التقرير الموضوعي (Compte rendu objectif)؟',
					hintAr: 'انتبه: القصة الأصلية بالماضي، لكن التقرير الموضوعي يُكتب دائما بـ...',
					expectedInput: 'بالمضارع الدلالي (Le présent de l’indicatif)',
					revealAr: 'حتى لو كانت القصة الأصلية بالماضي البسيط، فإن التقرير الموضوعي يُكتب دائما بالمضارع (L’auteur raconte... Le héros découvre... Il décide de... Enfin, il reçoit...).'
				}
			]
		},
		summary: {
			rulesAr: [
				'خطة الموضوع 1 — التقرير الموضوعي لنص سردي / خبر متنوع: (1) المقدمة (Accroche): النوع (récit réaliste / fait divers)، العنوان، الكاتب، المصدر، الإطار، والغاية (raconter un fait réel / sensibiliser à une valeur morale). (2) العرض بالمضارع: D’abord, l’auteur présente le personnage et le lieu... Ensuite, il relate l’événement inattendu... Puis, il montre comment... Enfin, le récit s’achève sur une morale qui rappelle que...',
				'خطة الموضوع 2 — كتابة قصة واقعية هادفة (14-18 سطرا):',
				'- فقرة 1 (الوضعية الابتدائية + البورتريه): المكان والزمان الواقعيان + وصف موجز جسدي وأخلاقي للشخصية بالماضي الناقص.',
				'- فقرة 2 (العنصر المخل + الأحداث + الحوار): بداية بـ « Un matin / Soudain » مع الماضي البسيط + إدراج جملتين من الكلام المباشر بفعل قول متنوع + تشبيه أو استعارة.',
				'- فقرة 3 (الانفراج + النهاية والعبرة): حل منطقي واقعي وعبرة أخلاقية راقية تبرز قيمة الأمانة أو التعاون أو احترام الكبار أو المثابرة.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Équilibre d’une nouvelle réaliste réussie',
				rootLabel: 'Raconter + Décrire + Faire parler',
				branches: [
					{
						label: 'Narration',
						rule: 'Schéma narratif complet',
						example: 'Imparfait + Passé simple'
					},
					{
						label: 'Description & Style',
						rule: 'Portrait + Comparaison',
						example: 'regard vif, cœur d’or'
					},
					{
						label: 'Dialogue bref',
						rule: '2 répliques + verbe de parole',
						example: '« Tenez ! » dit-il poliment.'
					}
				]
			}),
			visualCaptionAr: 'التكامل بين السرد والوصف والحوار في القصة القصيرة الواقعية لشعبة الآداب',
			examples: [
				{
					problemAr: 'اكتب مقدمة تقرير موضوعي لخبر متنوع بعنوان « Solidarité exemplaire à Sétif » مقتبس من جريدة يومية.',
					solutionAr: 'Ce fait divers, intitulé « Solidarité exemplaire à Sétif » et extrait d’un quotidien national, relate un élan d’entraide des citoyens lors d’une vague de neige hivernale. Le journaliste vise à informer les lecteurs et à valoriser l’esprit de solidarité.'
				},
				{
					problemAr: 'اكتب فقرة حوار قصيرة مع استعارة لقصة واقعية عن احترام المعلم أو الحرفي.',
					solutionAr: '« Maître, votre patience est une véritable école pour nous », déclara respectueusement le jeune apprenti. — « Le savoir se transmet avec le cœur, mon fils », répondit l’artisan avec un sourire lumineux.'
				}
			],
			watchOutAr:
				'في التقرير الموضوعي لقصة، لا تنسخ الحوارات المباشرة كما هي بين مزدوجتين! حوّل مضمونها بإيجاز إلى كلام غير مباشر بالمضارع (Il remercie le lycéen de son honnêteté).'
		},
		practice: [
			{
				questionAr: 'بأي زمن يُحرّر التقرير الموضوعي لنص سردي مكتوب أصلا في الماضي البسيط؟',
				options: [
					'Le futur simple',
					'Le présent de l’indicatif',
					'Le passé antérieur',
					'L’impératif'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'المستقبل لا يناسب التقرير.',
					'أحسنت! نكتب التقرير الموضوعي دائما بالمضارع (L’auteur raconte, le personnage aide...).',
					'الماضي الأسبق التام زمن أدبي نادر لا يستعمل للتقرير.',
					'الأمر لا يناسب التقرير.'
				],
				explanationAr: 'المضارع الدلالي هو الزمن المعتمد لتحرير جميع أنواع التقارير الموضوعية.'
			},
			{
				questionAr: 'كيف نتعامل مع الحوار المباشر الموجود في القصة عند كتابة التقرير الموضوعي؟',
				options: [
					'ننسخه كاملا بعلاماته ومزدوجتيه',
					'نختصر مضمونه الأساسي بأسلوب غير مباشر بالمضارع',
					'نحذف القصة كلها ونبقي الحوار فقط',
					'نترجمه إلى لغة أخرى'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'نسخ الحوار المباشر يطيل التقرير ويخالف منهجية إعادة الصياغة.',
					'ممتاز! ننقل فكرة الحوار بإيجاز في الكلام غير المباشر (Il conseille à son fils de...).',
					'لا يصح حذف أحداث القصة.',
					'غير صحيح.'
				],
				explanationAr: 'في التقرير الموضوعي نُدمج مضمون الحوار بإيجاز في الكلام غير المباشر.'
			},
			{
				questionAr: 'ما الغاية التواصلية لقصة واقعية هادفة (nouvelle réaliste à portée morale)؟',
				options: [
					'Raconter un événement vraisemblable pour transmettre une valeur morale',
					'Expliquer la composition chimique de l’air',
					'Vendre un produit électronique',
					'Énumérer des dates sans personnages'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! تجمع بين السرد الواقعي القابل للتصديق ونقل قيمة أخلاقية نبيلة.',
					'هذا نص علمي.',
					'هذا إشهار تجاري.',
					'السرد يحتاج شخصيات وأحداثا.'
				],
				explanationAr: 'الغاية المزدوجة للقصة الواقعية الهادفة هي السرد والتوعية الأخلاقية.'
			},
			{
				questionAr: 'ما العناصر التي ينبغي توفرها في قصة واقعية متكاملة لشعبة الآداب؟',
				options: [
					'ترويسة رسالة وتوقيع فقط',
					'بنية سردية واضحة + بورتريه موجز + حوار قصير + صورة بلاغية + عبرة أخلاقية',
					'تعريفات علمية وجداول إحصائية',
					'جملة واحدة بدون أفعال ماضية'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الترويسة والتوقيع للرسالة المفتوحة.',
					'أحسنت! هذه العناصر تبرهن على استيعاب كل دروس المشروع الثالث في 1AS TCL.',
					'هذه خصائص النص العلمي.',
					'القصة تتطلب فقرات متماسكة وأزمنة سردية.'
				],
				explanationAr: 'الدمج الذكي بين السرد والوصف والحوار والبلاغة يصنع قصة واقعية راقية.'
			},
			{
				questionAr: 'اختر جملة البداية الأنسب لتقرير موضوعي عن قصة واقعية حول المثابرة:',
				options: [
					'Je vais vous raconter une très belle histoire que j’ai adorée.',
					'Ce récit réaliste, intitulé « La persévérance récompensée » et extrait d’un recueil éducatif, relate le parcours d’une élève déterminée afin de valoriser l’effort.',
					'Il était une fois une élève qui aimait étudier.',
					'Monsieur le Proviseur, nous vous écrivons cette histoire.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'تحتوي على « Je » وحكم ذاتي « très belle / adorée ».',
					'إجابة موفقة! مقدمة تقرير موضوعي مكتملة العناصر ومحايدة تماما.',
					'هذه بداية قصة وليست مقدمة تقرير موضوعي.',
					'هذا خلط بين الرسالة والقصة.'
				],
				explanationAr: 'المقدمة الجيدة للتقرير الموضوعي تعرّف بالنوع والعنوان والمصدر والموضوع والغاية بموضوعية.'
			}
		]
	}
];
