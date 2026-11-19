import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWritingBlueprint
} from '../../svg-french';

// ============================================================================
// 5 Interactive Lessons — 1AS TCST Trimester 1
// Projet 1 : Texte de vulgarisation scientifique
// ============================================================================

export const LESSONS_1AS_TCST_T1: FrenchInteractiveLessonData[] = [
	// 1. Les procédés explicatifs
	{
		id: 'fre_lesson_1as_tcst_t1_procedes_explicatifs',
		slug: 'fre-1as-tcst-t1-procedes-explicatifs',
		grade: '1as_tcst',
		yearSubjectId: 657,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: نص التبسيط العلمي (Le texte de vulgarisation scientifique)',
		order: 1,
		titleAr: 'الأساليب التفسيرية في النص العلمي (Les procédés explicatifs)',
		objectives: [
			'التعرف على أهم الأساليب التفسيرية في نص التبسيط العلمي: التعريف، التسمية، إعادة الصياغة، التمثيل، والوظيفة',
			'استخراج المؤشرات اللغوية وعلامات الترقيم الدالة على كل أسلوب تفسيري داخل النص',
			'توظيف الأساليب التفسيرية لصياغة شرح علمي واضح ودقيق'
		],
		keywordsAr: [
			'Procédés explicatifs',
			'Définition',
			'Dénomination',
			'Reformulation',
			'Illustration',
			'Fonction'
		],
		discover: {
			scenarioAr:
				'في حصة اللغة الفرنسية بثانوية بالبليدة، قرأ التلاميذ مقالا علميا عن الطاقة الشمسية جاء فيه: « Le panneau photovoltaïque est un dispositif qui transforme la lumière du soleil en électricité. Ce phénomène s’appelle l’effet photovoltaïque. Autrement dit, les rayons solaires produisent un courant électrique utile. Il sert à alimenter les habitations, par exemple les écoles et les fermes isolées. » لاحظ كيف سهّل الكاتب فهم المفهوم العلمي بوسائل متنوعة.',
			svg: svgFrenchGrammarMap({
				title: 'Les principaux procédés explicatifs',
				rootLabel: 'Expliquer un phénomène scientifique',
				rootSub: 'Rendre le savoir clair et accessible',
				branches: [
					{
						label: 'Définition',
						rule: 'est / désigne / consiste à',
						example: 'L’eau est un liquide vital.'
					},
					{
						label: 'Dénomination',
						rule: 's’appelle / est nommé',
						example: 'On appelle cela l’osmose.'
					},
					{
						label: 'Reformulation',
						rule: 'c’est-à-dire / autrement dit',
						example: 'Autrement dit, il se filtre.'
					},
					{
						label: 'Illustration',
						rule: 'par exemple / tel que / ( )',
						example: 'Des gaz tels que l’azote.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الأسلوب التفسيري المستعمل في الجملة: « Le panneau photovoltaïque est un dispositif qui transforme la lumière en électricité »؟',
					hintAr: 'الجملة تعطي معنى المصطلح باستعمال الفعل est un dispositif qui...',
					expectedInput: 'التعريف (La définition)',
					revealAr: 'إنه أسلوب التعريف (La définition)، إذ يبيّن الكاتب ماهية المصطلح العلمي باستعمال « est un... qui... ».'
				},
				{
					promptAr: 'على أي أسلوب يدل الرابط « Autrement dit » في الفقرة؟',
					hintAr: 'الكاتب يعيد شرح الفكرة نفسها بكلمات أبسط.',
					expectedInput: 'إعادة الصياغة (La reformulation)',
					revealAr: 'يدل « Autrement dit » (وبعبارة أخرى / أي) على أسلوب إعادة الصياغة (La reformulation)، ومثله « c’est-à-dire » و« en d’autres termes ».'
				},
				{
					promptAr: 'استخرج من الفقرة الجملة التي تبيّن أسلوب الوظيفة (La fonction) وأسلوب التمثيل (L’illustration).',
					hintAr: 'ابحث عن العبارتين « sert à » و« par exemple ».',
					expectedInput: 'sert à alimenter (fonction) / par exemple les écoles (illustration)',
					revealAr: 'العبارة « Il sert à alimenter... » تبيّن الوظيفة (La fonction)، بينما « par exemple les écoles et les fermes isolées » تمثل أسلوب التمثيل (L’illustration).'
				}
			]
		},
		summary: {
			rulesAr: [
				'التعريف (La définition): يحدّد معنى المصطلح العلمي باستعمال أفعال مثل: est, désigne, consiste à, représente.',
				'التسمية (La dénomination): تعطي اسما علميا دقيقا للظاهرة باستعمال: s’appelle, est appelé, se nomme, est désigné sous le nom de.',
				'إعادة الصياغة (La reformulation): تعيد التعبير عن الفكرة بأسلوب أبسط باستخدام: c’est-à-dire, autrement dit, soit, en d’autres termes.',
				'التمثيل (L’illustration / L’exemple): يقدّم مثالا ملموسا باستعمال: par exemple, tel que, comme, notamment, ainsi que أو بين قوسين.',
				'الوظيفة (La fonction): تبيّن دور العنصر أو الجهاز باستعمال: sert à, permet de, a pour rôle de, assure.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Repérer les procédés explicatifs à l’examen',
				subtitle: 'Associer chaque indice linguistique au bon procédé',
				columns: [
					{
						header: 'Définition / Nom',
						rule: 'est un... / s’appelle',
						examples: 'est nommé, désigne'
					},
					{
						header: 'Reformulation',
						rule: 'dire plus simplement',
						examples: 'c’est-à-dire, autrement dit'
					},
					{
						header: 'Exemple / Fonction',
						rule: 'illustrer / rôle utile',
						examples: 'par exemple / sert à'
					}
				]
			}),
			visualCaptionAr: 'المؤشرات السريعة لتمييز الأساليب التفسيرية في أسئلة البكالوريا والأولى ثانوي',
			examples: [
				{
					problemAr: 'حدّد الأسلوب التفسيري في: « La photosynthèse, c’est-à-dire la fabrication de matière organique grâce à la lumière, est essentielle aux plantes. »',
					solutionAr: 'La reformulation (إعادة الصياغة) لوجود المؤشر « c’est-à-dire ».'
				},
				{
					problemAr: 'حدّد الأسلوب التفسيري في: « Le rein a pour rôle de filtrer le sang et d’éliminer les déchets. »',
					solutionAr: 'La fonction (الوظيفة) لوجود العبارة « a pour rôle de ».'
				}
			],
			watchOutAr:
				'لا تخلط بين التعريف (La définition: L’atome est la plus petite partie...) والتسمية (La dénomination: Cette couche s’appelle l’atmosphère). فالتعريف يشرح المعنى، بينما التسمية تمنح المصطلح اسمه.'
		},
		practice: [
			{
				questionAr: 'ما الأسلوب التفسيري الموظف في: « Le dessalement consiste à retirer le sel de l’eau de mer pour la rendre potable. »؟',
				options: ['La définition', 'L’illustration', 'La dénomination', 'La comparaison'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! الفعل « consiste à » يقدم تعريفا دقيقا للعملية العلمية.',
					'لا يوجد مثال ملموس (par exemple / tel que) في هذه الجملة.',
					'الجملة لا تعطي اسما جديدا للظاهرة بل تعرّفها.',
					'لا توجد أداة مقارنة (comme / plus que) في الجملة.'
				],
				explanationAr: 'الفعل « consiste à » من أشهر مؤشرات أسلوب التعريف (La définition).'
			},
			{
				questionAr: 'أي مؤشر لغوي يدل على أسلوب إعادة الصياغة (La reformulation)؟',
				options: ['sert à', 'autrement dit', 's’appelle', 'par exemple'],
				correctIndex: 1,
				diagnosticFeedback: [
					'« sert à » يدل على الوظيفة (La fonction).',
					'ممتاز! « autrement dit » يعني بعبارة أخرى ويدل على إعادة الصياغة.',
					'« s’appelle » يدل على التسمية (La dénomination).',
					'« par exemple » يدل على التمثيل (L’illustration).'
				],
				explanationAr: 'مؤشرات إعادة الصياغة هي: c’est-à-dire, autrement dit, en d’autres termes, soit.'
			},
			{
				questionAr: 'في الجملة: « Les énergies renouvelables, telles que l’énergie solaire et l’énergie éolienne, ne polluent pas. » ما الأسلوب التفسيري؟',
				options: ['La fonction', 'La dénomination', 'L’illustration', 'La reformulation'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الجملة لا تذكر وظيفة جهاز معيّن.',
					'لا توجد تسمية لمصطلح علمي جديد.',
					'صحيح! العبارة « telles que » تقدم أمثلة ملموسة، وهو أسلوب التمثيل (L’illustration).',
					'ليس هناك إعادة صياغة للفكرة بل ذكر أمثلة.'
				],
				explanationAr: '« tel que / telle que / tels que / telles que » مؤشر واضح لأسلوب التمثيل.'
			},
			{
				questionAr: 'حدّد الأسلوب في الجملة: « L’ensemble des nerfs du corps humain est appelé le système nerveux. »',
				options: ['La dénomination', 'La fonction', 'L’illustration', 'La reformulation'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! العبارة « est appelé » تقدم الاسم العلمي للظاهرة، وهي التسمية (La dénomination).',
					'لم تذكر الجملة دور الجهاز العصبي.',
					'لا توجد أمثلة في الجملة.',
					'لم تُعَد صياغة عبارة سابقة بمؤشر مثل c’est-à-dire.'
				],
				explanationAr: 'الأفعال « s’appelle, est appelé, se nomme » تدل على التسمية (La dénomination).'
			},
			{
				questionAr: 'ما الأسلوب في: « Les globules blancs permettent de défendre l’organisme contre les microbes. »؟',
				options: ['La dénomination', 'La fonction', 'La reformulation', 'L’énumération'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الجملة لا تسمي الكريات البيضاء باسم آخر.',
					'إجابة موفقة! العبارة « permettent de » تبيّن وظيفة ودور الكريات البيضاء (La fonction).',
					'لا يوجد رابط لإعادة الصياغة.',
					'لا يوجد تعداد لعدة عناصر.'
				],
				explanationAr: 'بيان الدور أو المنفعة بعبارات مثل « permet de / sert à / a pour rôle de » يمثل أسلوب الوظيفة.'
			}
		]
	},

	// 2. L'objectivité et l'effacement de l'énonciateur
	{
		id: 'fre_lesson_1as_tcst_t1_objectivite_effacement',
		slug: 'fre-1as-tcst-t1-objectivite-effacement',
		grade: '1as_tcst',
		yearSubjectId: 657,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: نص التبسيط العلمي (Le texte de vulgarisation scientifique)',
		order: 2,
		titleAr: 'الموضوعية وغياب الكاتب في النص العلمي (L’objectivité et l’effacement de l’énonciateur)',
		objectives: [
			'فهم سبب غياب ضمائر المتكلم (je / nous) وحضور الحياد والموضوعية في النص العلمي',
			'التحويل السليم من المبني للمعلوم إلى المبني للمجهول (La voix passive) مع مراعاة الزمن ومطابقة اسم المفعول',
			'استعمال الصيغة غير الشخصية (La tournure impersonnelle) والضمير المحايد (on)'
		],
		keywordsAr: [
			'Objectivité',
			'Effacement de l’énonciateur',
			'Voix passive',
			'Tournure impersonnelle',
			'Pronom on'
		],
		discover: {
			scenarioAr:
				'قارن بين هاتين الجملتين عن تصفية المياه: الجملة الأولى: « Je filtre l’eau dans mon laboratoire et je trouve cette expérience merveilleuse. » والجملة الثانية: « L’eau est filtrée par des membranes spéciales. Il existe plusieurs étapes. On observe alors une diminution des impuretés. » أيهما تنتمي إلى نص التبسيط العلمي الموضوعي؟',
			svg: svgFrenchGrammarMap({
				title: 'Les marques d’objectivité scientifique',
				rootLabel: 'Effacement de l’énonciateur',
				rootSub: 'L’auteur s’efface devant les faits',
				branches: [
					{
						label: 'Voix passive',
						rule: 'Sujet + être + Participe passé',
						example: 'L’eau est purifiée.'
					},
					{
						label: 'Tournure impersonnelle',
						rule: 'Il (neutre) + verbe 3e pers.',
						example: 'Il existe / Il faut / Il s’agit'
					},
					{
						label: 'Pronom indéfini ON',
						rule: 'Valeur générale et neutre',
						example: 'On constate une hausse.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'لماذا تغيب الضمائر « je / mon / moi » في الجملة الثانية؟',
					hintAr: 'هل يريد العالم التحدث عن مشاعره أم عن الحقيقة العلمية؟',
					expectedInput: 'لتحقيق الموضوعية وإبراز الحقيقة العلمية (L’objectivité)',
					revealAr: 'يُخفي الكاتب ذاته (effacement de l’énonciateur) ليكون النص موضوعيا (objectif) وموثوقا علميا، فيركز على الظاهرة لا على رأيه الشخصي.'
				},
				{
					promptAr: 'حوّل الجملة الآتية إلى المبني للمجهول: « Les chercheurs utilisent l’énergie solaire. »',
					hintAr: 'المفعول به يصبح فاعلا، ونصرف فعل être في زمن المضارع نفسه ثم نطابق اسم المفعول.',
					expectedInput: 'L’énergie solaire est utilisée par les chercheurs.',
					revealAr: 'نكتب: « L’énergie solaire est utilisée par les chercheurs. » لاحظ إضافة e إلى utilisée لأن الفاعل مؤنث مفرد.'
				},
				{
					promptAr: 'هل الضمير « Il » في « Il existe plusieurs types de roches » يعود على شخص أو شيء معيّن؟',
					hintAr: 'جرّب تعويض Il باسم شخص؛ هل يصح المعنى؟',
					expectedInput: 'لا، هو ضمير غير شخصي محايد (Il impersonnel)',
					revealAr: 'الضمير « Il » في الصيغة غير الشخصية (il existe, il faut, il s’agit de, il est prouvé que) لا يعود على أحد ويُستخدم لتقديم المعلومة بموضوعية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'في نص التبسيط العلمي يغيب الكاتب تماما (absence de je / nous / jugements personnels) ليكون الخطاب موضوعيا ومحايدا.',
				'المبني للمجهول (La voix passive): المفعول به المباشر (COD) يصبح فاعلا + الفعل المساعد être في نفس زمن الجملة المعلومة + اسم المفعول (Participe passé) مطابقا للفاعل في الجنس والعدد + (par + الفاعل الأصلي).',
				'الصيغة غير الشخصية (La tournure impersonnelle): تبدأ بـ Il المحايد: il existe, il faut, il est nécessaire de, il s’agit de, il convient de.',
				'الضمير المحايد « on » بمعنى عام (الناس / العلماء عموما) واستعمال ضمائر الغائب (il, elle, ils, elles) والجمل الإخبارية (phrases déclaratives) تعزّز الموضوعية.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Transformation : Voix active -> Voix passive',
				subtitle: 'L’auxiliaire ÊTRE prend toujours le temps du verbe actif',
				columns: [
					{
						header: 'Présent',
						rule: 'est / sont + P.P.',
						examples: 'traite -> est traité(e)'
					},
					{
						header: 'Passé composé',
						rule: 'a été / ont été + P.P.',
						examples: 'a découvert -> a été découvert'
					},
					{
						header: 'Futur simple',
						rule: 'sera / seront + P.P.',
						examples: 'produira -> sera produit(e)'
					}
				]
			}),
			visualCaptionAr: 'قاعدة تصريف الفعل المساعد être عند التحويل إلى المبني للمجهول',
			examples: [
				{
					problemAr: 'حوّل إلى المبني للمجهول: « Les plantes absorbent le dioxyde de carbone. »',
					solutionAr: 'Le dioxyde de carbone est absorbé par les plantes.'
				},
				{
					problemAr: 'حوّل إلى المبني للمعلوم: « De nouvelles stations solaires ont été construites par des ingénieurs algériens. »',
					solutionAr: 'Des ingénieurs algériens ont construit de nouvelles stations solaires.'
				}
			],
			watchOutAr:
				'احذر عند وجود الضمير « on » في المبني للمعلوم: « On mesure la température avec un thermomètre » تصبح في المجهول: « La température est mesurée avec un thermomètre » ولا نكتب « par on » أبدا!'
		},
		practice: [
			{
				questionAr: 'اختر التحويل الصحيح للمبني للمجهول: « Les stations filtrent les eaux usées. »',
				options: [
					'Les eaux usées est filtrée par les stations.',
					'Les eaux usées sont filtrées par les stations.',
					'Les eaux usées ont été filtrés par les stations.',
					'Les stations sont filtrées par les eaux usées.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ في المطابقة؛ les eaux usées جمع مؤنث ويحتاج sont filtrées.',
					'أحسنت! الزمن مضارع (sont) واسم المفعول مطابق للجمع المؤنث (filtrées).',
					'غيّرت الزمن إلى الماضي المركب كما أخطأت في مطابقة الجمع المؤنث.',
					'لم تعكس الفاعل والمفعول به ففسد المعنى.'
				],
				explanationAr: '« filtrent » في المضارع و« les eaux usées » جمع مؤنث، لذا نكتب: sont filtrées.'
			},
			{
				questionAr: 'أي جملة تحتوي على صيغة غير شخصية (tournure impersonnelle)؟',
				options: [
					'Il analyse les résultats au laboratoire.',
					'Il existe trois états physiques de la matière.',
					'Il a rédigé un rapport complet.',
					'Il protège l’environnement.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هنا Il ضمير شخصي يعود على باحث أو شخص معيّن.',
					'ممتاز! « Il existe » صيغة غير شخصية محايدة لا يعود فيها Il على شخص.',
					'هنا Il يعود على شخص قام بالكتابة.',
					'هنا Il ضمير شخصي يعود على فاعل محدد.'
				],
				explanationAr: 'العبارة « Il existe » صيغة غير شخصية خالصة من علامات الموضوعية.'
			},
			{
				questionAr: 'لماذا يختفي ضمير المتكلم « je » في نصوص التبسيط العلمي؟',
				options: [
					'لأن الكاتب يريد التعبير عن حزنه وغضبه',
					'لإضفاء الطابع الموضوعي والحيادي على المعلومات العلمية',
					'لأن النص العلمي مكتوب في زمن المستقبل فقط',
					'لإقناع القارئ بشراء منتج تجاري'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'النص العلمي لا يعبّر عن المشاعر الشخصية.',
					'صحيح! إخفاء الذات يضمن الحياد والموضوعية ويضع الحقائق في الصدارة.',
					'النص العلمي يغلب عليه المضارع العام لا المستقبل.',
					'النص التفسيري يشرح ولا يقوم بالإشهار التجاري.'
				],
				explanationAr: 'غياب الكاتب (l’effacement de l’énonciateur) غايته ضمان الموضوعية العلمية.'
			},
			{
				questionAr: 'حوّل إلى المبني للمجهول: « On observe les cellules grâce au microscope. »',
				options: [
					'Les cellules sont observées par on grâce au microscope.',
					'Les cellules sont observées grâce au microscope.',
					'Les cellules est observée grâce au microscope.',
					'Les cellules étaient observés grâce au microscope.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ فادح! لا يُكتب « par on » إطلاقا عند التحويل للمجهول.',
					'أحسنت! نحذف الفاعل المبهم on ونطابق اسم المفعول للجمع المؤنث (observées).',
					'les cellules جمع مؤنث فلا يناسبها est.',
					'الزمن الأصلي هو المضارع وليس الماضي الناقص.'
				],
				explanationAr: 'عندما يكون الفاعل « on » يُحذف في المبني للمجهول دون كتابة par on.'
			},
			{
				questionAr: 'اختر الجملة الموضوعية المناسبة لنص علمي:',
				options: [
					'À mon avis, je trouve que l’électricité est magnifique.',
					'L’électricité est produite à partir de diverses sources d’énergie.',
					'Je pense que nous devons aimer la physique.',
					'Quelle merveilleuse invention incroyable !'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'تحتوي على رأي شخصي (À mon avis / je) وصفة ذاتية (magnifique).',
					'ممتاز! جملة إخبارية مبنية للمجهول خالية من الذاتية والمشاعر.',
					'تحتوي على « Je pense » و« nous » وهو أسلوب ذاتي.',
					'جملة تعجبية ذاتية لا تناسب الموضوعية العلمية.'
				],
				explanationAr: 'الجملة الثانية تعتمد المبني للمجهول والأسلوب الإخباري المحايد.'
			}
		]
	},

	// 3. La progression thématique et la substitution
	{
		id: 'fre_lesson_1as_tcst_t1_progression_substitution',
		slug: 'fre-1as-tcst-t1-progression-substitution',
		grade: '1as_tcst',
		yearSubjectId: 657,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: نص التبسيط العلمي (Le texte de vulgarisation scientifique)',
		order: 3,
		titleAr: 'التدرّج الموضوعاتي والتعويض اللغوي (La progression thématique et la substitution)',
		objectives: [
			'التمييز بين التعويض النحوي (substitution grammaticale) والتعويض المعجمي (substitution lexicale)',
			'تحديد المرجع الذي يعود عليه الضمير داخل النص العلمي بدقة (سؤال أساسي في الفروض والاختبارات)',
			'التعرف على أنواع التدرج الموضوعاتي: الموضوع الثابت، الخطي، والمتفرع'
		],
		keywordsAr: [
			'Substitution grammaticale',
			'Substitution lexicale',
			'Anaphore',
			'Progression thématique',
			'Cohérence'
		],
		discover: {
			scenarioAr:
				'اقرأ هذه الفقرة العلمية: « Le cœur est un muscle creux. Il pompe le sang vers tous les organes. Cet organe vital se compose de quatre cavités : deux oreillettes et deux ventricules. Les oreillettes reçoivent le sang ; les ventricules le propulsent dans les artères. » لاحظ كيف تفادى الكاتب تكرار كلمة Le cœur بوسائل متعددة، وكيف تطورت المعلومة من جملة إلى أخرى.',
			svg: svgFrenchGrammarMap({
				title: 'Assurer la cohérence du texte scientifique',
				rootLabel: 'Éviter les répétitions (Reprises)',
				rootSub: 'Deux types de substituts essentiels',
				branches: [
					{
						label: 'Substitut grammatical',
						rule: 'Pronoms / déterminants',
						example: 'il, elle, le, leur, celui-ci, qui'
					},
					{
						label: 'Substitut lexical',
						rule: 'Synonyme / hyperonyme',
						example: 'le cœur -> cet organe vital'
					},
					{
						label: 'Progression',
						rule: 'Constante / Linéaire / Éclatée',
						example: 'Thème -> Propos organisé'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الكلمة التي عوّضها الضمير « Il » ثم العبارة « Cet organe vital » في الفقرة؟',
					hintAr: 'عُد إلى بداية الجملة الأولى في الفقرة.',
					expectedInput: 'Le cœur',
					revealAr: 'كلاهما يعود على « Le cœur »: الضمير « Il » تعويض نحوي (substitut grammatical)، والعبارة « Cet organe vital » تعويض معجمي (substitut lexical).'
				},
				{
					promptAr: 'على ماذا يعود الضمير « le » في الجملة: « les ventricules le propulsent dans les artères »؟',
					hintAr: 'اسأل نفسك: ماذا يدفع البطينان في الشرايين؟',
					expectedInput: 'le sang',
					revealAr: 'يعود الضمير المفعول « le » على « le sang » (الدم)، وهو تعويض نحوي مفرد مذكر.'
				},
				{
					promptAr: 'لماذا قسّم الكاتب الجملة الأخيرة إلى « Les oreillettes » ثم « les ventricules »؟',
					hintAr: 'ذكر قبلهما أربعة تجاويف ثم فرّع الحديث إلى جزأين.',
					expectedInput: 'هذا تدرج موضوعاتي متفرع (progression à thème éclaté)',
					revealAr: 'عندما يُذكر موضوع شامل (quatre cavités) ثم يُشرح كل جزء منه على حدة، نسمي هذا تدرجا موضوعاتيا متفرعا (à thème éclaté).'
				}
			]
		},
		summary: {
			rulesAr: [
				'التعويض النحوي (La substitution grammaticale): يستعمل الضمائر الشخصية (il, elle, ils, elles, le, la, les, lui, leur, en, y)، وضمائر الإشارة (celui-ci, celle-là)، والضمائر الموصولة (qui, que, dont)، وصفات الملكية (son, sa, ses, leur).',
				'التعويض المعجمي (La substitution lexicale): يستبدل الكلمة بمرادف (synonyme)، أو اسم أشمل (hyperonyme: l’eau -> ce liquide)، أو عبارة وصفية (périphrase: le soleil -> l’astre du jour).',
				'التدرج ذو الموضوع الثابت (Progression à thème constant): يبقى الموضوع (Thème) نفسه في عدة جمل متتابعة مع معلومات جديدة (Propos).',
				'التدرج الخطي (Progression linéaire): المعلومة الجديدة (Propos) في الجملة الأولى تصبح هي الموضوع (Thème) في الجملة الثانية.',
				'التدرج المتفرع (Progression à thème éclaté): يتفرع موضوع عام إلى مواضيع فرعية متتالية.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Les 3 progressions thématiques',
				subtitle: 'T = Thème (ce dont on parle) | P = Propos (info nouvelle)',
				columns: [
					{
						header: 'Thème constant',
						rule: 'T1->P1 | T1->P2 | T1->P3',
						examples: 'Le fer... Il... Ce métal...'
					},
					{
						header: 'Linéaire',
						rule: 'T1->P1 | T2(=P1)->P2',
						examples: 'Soleil->plantes->oxygène'
					},
					{
						header: 'Thème éclaté',
						rule: 'T global -> T1, T2, T3',
						examples: 'Air -> azote + oxygène'
					}
				]
			}),
			visualCaptionAr: 'التمييز البصري بين أنواع التدرج الموضوعاتي الثلاثة',
			examples: [
				{
					problemAr: 'استبدل التكرار بتعويض نحوي مناسب: « Le microscope agrandit les cellules. Le microscope permet d’étudier les cellules. »',
					solutionAr: 'Le microscope agrandit les cellules. Il permet de les étudier.'
				},
				{
					problemAr: 'ما نوع التدرج في: « L’atmosphère comprend plusieurs couches. La troposphère est la plus basse. La stratosphère contient la couche d’ozone. »؟',
					solutionAr: 'Progression à thème éclaté (تدرج موضوعاتي متفرع من الغلاف الجوي إلى طبقاته).'
				}
			],
			watchOutAr:
				'في الامتحان، عند سؤال « À qui ou à quoi renvoient les pronoms soulignés ? » راعِ دائما الجنس (مذكر/مؤنث) والعدد (مفرد/جمع) والمعنى داخل الجملة السابقة، ولا تخمّن أول اسم في الفقرة!'
		},
		practice: [
			{
				questionAr: 'في الجملة: « Les satellites observent le climat. Ils transmettent des données précises aux météorologues. » ما نوع التعويض الذي يمثله « Ils »؟',
				options: [
					'Substitut lexical',
					'Substitut grammatical',
					'Procédé de définition',
					'Connecteur logique'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'التعويض المعجمي يكون باسم أو مرادف وليس بضمير.',
					'أحسنت! الضمائر الشخصية (Ils) من التعويض النحوي (substitut grammatical).',
					'ليس أسلوب تعريف.',
					'Ils ضمير فاعل وليس رابطا منطقيا.'
				],
				explanationAr: 'الضمير « Ils » يعوّض « Les satellites » وهو تعويض نحوي.'
			},
			{
				questionAr: 'أي عبارة تمثل تعويضا معجميا (substitut lexical) لكلمة « l’énergie solaire »؟',
				options: ['elle', 'celle-ci', 'cette ressource propre', 'en'],
				correctIndex: 2,
				diagnosticFeedback: [
					'« elle » ضمير، أي تعويض نحوي.',
					'« celle-ci » ضمير إشارة، أي تعويض نحوي.',
					'ممتاز! « cette ressource propre » عبارة اسمية تعوّض المعنى معجميا.',
					'« en » ضمير نحوي.'
				],
				explanationAr: 'التعويض المعجمي يستخدم اسما أو مرادفا أو عبارة اسمية مثل « cette ressource propre ».'
			},
			{
				questionAr: 'على ماذا يعود الضمير « y » في الجملة: « Les chercheurs visitent la centrale solaire d’Adrar ; ils y mesurent le rendement quotidien. »؟',
				options: ['Les chercheurs', 'la centrale solaire d’Adrar', 'le rendement quotidien', 'les panneaux'],
				correctIndex: 1,
				diagnosticFeedback: [
					'« y » لا يعود على الأشخاص الفاعلين.',
					'صحيح تماما! الضمير « y » يعوّض ظرف المكان (à la centrale solaire d’Adrar).',
					'le rendement مفعول مباشر موجود بالفعل بعد الفعل.',
					'كلمة panneaux لم تُذكر في الجملة.'
				],
				explanationAr: 'الضمير « y » يعوّض مكمّلا مكانيا أو مسبوقا بـ à (في محطة أدرار الشمسية).'
			},
			{
				questionAr: 'ما نوع التدرج الموضوعاتي في: « Le soleil chauffe les océans. Cette chaleur provoque l’évaporation. L’évaporation forme les nuages. »؟',
				options: [
					'Progression à thème constant',
					'Progression linéaire',
					'Progression à thème éclaté',
					'Progression descriptive'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الموضوع يتغير من جملة لأخرى ولا يبقى ثابتا.',
					'أحسنت! كل معلومة جديدة (chaleur ثم évaporation) تصبح موضوع الجملة الموالية، وهذا هو التدرج الخطي (linéaire).',
					'لا يوجد تقسيم لموضوع عام إلى أجزاء متوازية.',
					'ليست هذه تسمية نوع تدرج موضوعاتي.'
				],
				explanationAr: 'التسلسل (A -> B ثم B -> C) يمثل التدرج الخطي (Progression linéaire).'
			},
			{
				questionAr: 'على ماذا يعود الضمير « leur » في: « Les vaccins protègent les enfants ; ils leur offrent une immunité durable. »؟',
				options: ['Les vaccins', 'les enfants', 'une immunité durable', 'les médecins'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الضمير « ils » هو الذي يعود على les vaccins.',
					'إجابة دقيقة! « leur » يعود على « aux enfants » (مفعول به غير مباشر جمع).',
					'une immunité مفرد مؤنث وموجود في الجملة.',
					'لم تُذكر كلمة médecins.'
				],
				explanationAr: '« offrir à quelqu’un »: الضمير « leur » يعوّض « aux enfants ».'
			}
		]
	},

	// 4. Le présent atemporel (vérité générale) et le lexique scientifique
	{
		id: 'fre_lesson_1as_tcst_t1_present_atemporel_lexique',
		slug: 'fre-1as-tcst-t1-present-atemporel-lexique',
		grade: '1as_tcst',
		yearSubjectId: 657,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: نص التبسيط العلمي (Le texte de vulgarisation scientifique)',
		order: 4,
		titleAr: 'المضارع العام (الحقيقة العلمية) والمعجم العلمي (Le présent atemporel et le lexique scientifique)',
		objectives: [
			'التمييز بين المضارع العام للحقيقة العلمية (présent de vérité générale / atemporel) ومضارع الآنية (présent d’énonciation)',
			'تصريف أفعال المجموعات الثلاث في المضارع الدلالي بدقة داخل جمل علمية',
			'استخراج الحقل المعجمي العلمي (le champ lexical) وتكوين عائلة الكلمة (famille de mots)'
		],
		keywordsAr: [
			'Présent atemporel',
			'Vérité générale',
			'Champ lexical',
			'Famille de mots',
			'Lexique scientifique'
		],
		discover: {
			scenarioAr:
				'قالت الأستاذة لتلاميذ الأولى ثانوي علوم: « L’eau bout à 100 degrés Celsius et la Terre tourne autour du Soleil. » ثم أضافت: « Maintenant, nous observons cette expérience en classe. » هل للفعلين « bout / tourne » نفس القيمة الزمنية للفعل « observons »؟',
			svg: svgFrenchTenseTimeline({
				title: 'Valeur dominante du texte scientifique',
				tenseName: 'Présent atemporel (vérité générale)',
				formula: 'Valable hier, aujourd’hui et toujours',
				activeZone: 'present',
				example: 'L’eau gèle à 0 degré Celsius.',
				markers: 'lois physiques, définitions, phénomènes permanents'
			}),
			steps: [
				{
					promptAr: 'هل تغلي المياه عند 100 درجة اليوم فقط أم في كل زمان ومكان؟',
					hintAr: 'فكّر في طبيعة القوانين الفيزيائية الثابتة.',
					expectedInput: 'في كل زمان ومكان (Présent de vérité générale / atemporel)',
					revealAr: 'هذه حقيقة علمية ثابتة لا تتغير بالزمن، لذلك يُسمى زمنها المضارع اللامحدود بالزمن أو مضارع الحقيقة العامة (présent atemporel / de vérité générale).'
				},
				{
					promptAr: 'ما القيمة الزمنية للفعل « observons » مع الظرف « Maintenant »؟',
					hintAr: 'الفعل يقع لحظة الكلام فقط.',
					expectedInput: 'مضارع الآنية أو لحظة الكلام (Présent d’énonciation / actuel)',
					revealAr: 'وجود « Maintenant » يدل على أن الفعل يحدث لحظة النطق به (présent d’énonciation / d’actualité).'
				},
				{
					promptAr: 'أعطِ الاسم والصفة من الفعل العلمي « filtrer ».',
					hintAr: 'تذكّر عائلة الكلمة (Verbe / Nom / Adjectif).',
					expectedInput: 'Nom : filtration / filtre — Adjectif : filtrant / filtré',
					revealAr: 'من عائلة الفعل « filtrer »: الاسم « la filtration » أو « le filtre »، والصفة « filtrant(e) » أو « filtré(e) ».'
				}
			]
		},
		summary: {
			rulesAr: [
				'المضارع العام (Le présent atemporel / de vérité générale) هو الزمن الغالب في نص التبسيط العلمي لأنه يعبّر عن حقائق وقوانين وتعريفات صالحة في كل زمان.',
				'تذكير بتصريف المضارع الدلالي: أفعال المجموعة 1 (-er): -e, -es, -e, -ons, -ez, -ent | أفعال المجموعة 2 (-ir -> -issons): -is, -is, -it, -issons, -issez, -issent | أفعال المجموعة 3 الشائعة علميا: produire (produit/produisent), contenir (contient/contiennent), permettre (permet/permettent).',
				'الحقل المعجمي (Le champ lexical): مجموعة كلمات (أسماء، أفعال، صفات) ترتبط بموضوع علمي واحد، مثل حقل الطب: cellule, vaccin, diagnostic, soigner, immunitaire.',
				'عائلة الكلمة (La famille de mots): كلمات تشترك في الجذر نفسه (radical)، مثل: produire -> production -> productif.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Verbes fréquents au présent scientifique',
				subtitle: '3e personne du singulier (il/elle) et du pluriel (ils/elles)',
				columns: [
					{
						header: '1er groupe (-er)',
						rule: '-e / -ent',
						examples: 'absorbe / absorbent'
					},
					{
						header: '2e groupe (-ir)',
						rule: '-it / -issent',
						examples: 'réagit / réagissent'
					},
					{
						header: '3e groupe',
						rule: 'radicaux variés',
						examples: 'contient / contiennent'
					}
				]
			}),
			visualCaptionAr: 'تصريف أكثر الأفعال العلمية شيوعا مع الغائب المفرد والجمع',
			examples: [
				{
					problemAr: 'صرّف الفعلين في المضارع العام: « Les panneaux solaires (produire) de l’électricité et (fournir) une énergie propre. »',
					solutionAr: 'Les panneaux solaires produisent de l’électricité et fournissent une énergie propre.'
				},
				{
					problemAr: 'استخرج 4 كلمات تنتمي إلى الحقل المعجمي للماء (l’eau): « Les nappes phréatiques alimentent les oasis en liquide potable après filtration. »',
					solutionAr: 'nappes phréatiques ; alimentent ; liquide ; potable ; filtration.'
				}
			],
			watchOutAr:
				'انتبه لعدم الخلط بين الحقل المعجمي (champ lexical: كلمات من نفس الموضوع حتى لو اختلفت جذورها مثل eau, pluie, mer) وعائلة الكلمة (famille de mots: كلمات لها نفس الجذر مثل eau, aqueux أو pur, purifier, purification).'
		},
		practice: [
			{
				questionAr: 'ما القيمة الزمنية للمضارع في: « La lumière parcourt environ 300 000 kilomètres par seconde. »؟',
				options: [
					'Présent d’énonciation (حالي)',
					'Présent de vérité générale (حقيقة علمية عامة)',
					'Présent de narration (سردي)',
					'Présent d’habitude personnelle'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'سرعة الضوء ليست حدثا مؤقتا يقع هذه اللحظة فقط.',
					'أحسنت! إنه قانون فيزيائي ثابت في كل زمان: présent de vérité générale (atemporel).',
					'لا يوجد سرد لقصة ماضية هنا.',
					'ليست عادة شخصية يومية.'
				],
				explanationAr: 'القوانين العلمية الثابتة تُصاغ في المضارع العام (présent atemporel / de vérité générale).'
			},
			{
				questionAr: 'اختر التصريف الصحيح: « Les océans .......... une grande quantité de dioxyde de carbone. » (contenir)',
				options: ['contient', 'contiennent', 'contenent', 'contenaient'],
				correctIndex: 1,
				diagnosticFeedback: [
					'Les océans جمع، لذا لا يصح المفرد contient.',
					'ممتاز! الفعل contenir في الجمع بالمضارع هو « contiennent » (بتضعيف n).',
					'إملاء خاطئ؛ ينقصه الحرف i وتضعيف n.',
					'هذا زمن الماضي الناقص وليس المضارع العام.'
				],
				explanationAr: 'الفعل contenir يُصرّف مع ils/elles في المضارع: contiennent.'
			},
			{
				questionAr: 'اختر التصريف الصحيح للفعل من المجموعة الثانية: « Les bactéries .......... rapidement à la chaleur. » (réagir)',
				options: ['réagient', 'réagissent', 'réagit', 'réagirent'],
				correctIndex: 1,
				diagnosticFeedback: [
					'أفعال المجموعة الثانية تأخذ -issent في الجمع.',
					'صحيح! réagir فعل من المجموعة الثانية: elles réagissent.',
					'الفاعل جمع مؤنث (Les bactéries) وليس مفردا.',
					'réagirent في الماضي البسيط.'
				],
				explanationAr: 'أفعال المجموعة الثانية تأخذ النهاية -issent مع الغائب الجمع في المضارع.'
			},
			{
				questionAr: 'أي مجموعة كلمات تنتمي إلى نفس عائلة الكلمة (famille de mots)؟',
				options: [
					'soleil — rayon — chaleur — lumière',
					'purifier — purification — pureté — pur',
					'médecin — hôpital — vaccin — santé',
					'terre — océan — nuage — pluie'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه كلمات من حقل معجمي واحد لكن جذورها مختلفة.',
					'أحسنت! كلها تشترك في الجذر نفسه « pur- » فهي عائلة كلمة واحدة.',
					'هذا حقل معجمي للطب وليس عائلة كلمة.',
					'هذا حقل معجمي للطبيعة وليس عائلة كلمة.'
				],
				explanationAr: 'عائلة الكلمة تشترك في الجذر نفسه (pur -> purifier, purification, pureté).'
			},
			{
				questionAr: 'أكمل تصريف الفعل « produire »: « Cette centrale .......... de l’énergie renouvelable. »',
				options: ['produis', 'produit', 'produisent', 'produira'],
				correctIndex: 1,
				diagnosticFeedback: [
					'produis مع الضمير je أو tu.',
					'صحيح! مع الفاعل المفرد (Cette centrale) نكتب produit.',
					'produisent للجمع فقط.',
					'produira في المستقبل وليس المضارع العام.'
				],
				explanationAr: 'تصريف produire مع المفرد الغائب في المضارع هو « produit ».'
			}
		]
	},

	// 5. Le compte rendu objectif d'un texte explicatif
	{
		id: 'fre_lesson_1as_tcst_t1_compte_rendu_objectif',
		slug: 'fre-1as-tcst-t1-compte-rendu-objectif',
		grade: '1as_tcst',
		yearSubjectId: 657,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: نص التبسيط العلمي (Le texte de vulgarisation scientifique)',
		order: 5,
		titleAr: 'منهجية التقرير الموضوعي لنص تفسيري (Le compte rendu objectif d’un texte explicatif)',
		objectives: [
			'معرفة البنية الرسمية للتقرير الموضوعي (Introduction / Développement / Résumé fidèle)',
			'صياغة فقرة التقديم (Accroche) بعناصرها الخمسة: الكاتب، المصدر، النوع، الموضوع، والغاية التواصلية',
			'تلخيص الأفكار الأساسية بأسلوب شخصي محايد في المضارع وبضمير الغائب دون إبداء الرأي الشخصي'
		],
		keywordsAr: [
			'Compte rendu objectif',
			'Accroche',
			'Visée communicative',
			'Reformulation',
			'Third-person neutral'
		],
		discover: {
			scenarioAr:
				'في موضوع الاختبار، يُطلب من تلميذ الأولى ثانوي علوم وتكنولوجيا: « Faites le compte rendu objectif de ce texte. » تساءل بلال: هل أكتب رأيي الشخصي في النهاية؟ وهل أنسخ جمل النص حرفيا؟ تعلّم القواعد الرسمية الدقيقة لكتابة تقرير موضوعي يحصد العلامة الكاملة.',
			svg: svgFrenchWritingBlueprint({
				title: 'Plan du Compte Rendu Objectif (1AS TCST)',
				steps: [
					{
						stage: '1. Accroche',
						detail: 'Titre, auteur, source, type explicatif, thème et visée.'
					},
					{
						stage: '2. Idée 1',
						detail: 'D’abord, l’auteur définit / présente le phénomène...'
					},
					{
						stage: '3. Idées 2 et 3',
						detail: 'Ensuite, il explique les causes / étapes / rôles...'
					},
					{
						stage: '4. Clôture',
						detail: 'Enfin, il conclut en soulignant l’importance... (sans avis!)'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما العناصر الواجب ذكرها في مقدمة التقرير الموضوعي (L’accroche)؟',
					hintAr: 'تذكّر: من كتب النص؟ من أين أُخذ؟ ما نوعه؟ عمّ يتحدث؟ وما هدفه؟',
					expectedInput: 'النوع، العنوان، الكاتب، المصدر، الموضوع، والغاية التفسيرية',
					revealAr: 'تتضمن المقدمة: نوع النص (texte explicatif / article de vulgarisation scientifique)، العنوان، الكاتب، المصدر، الفكرة العامة، والغاية (informer et expliquer).'
				},
				{
					promptAr: 'هل نكتب رأينا الشخصي (À mon avis / Je trouve que...) في التقرير الموضوعي؟',
					hintAr: 'تأمل كلمة « objectif » في اسم التمرين.',
					expectedInput: 'لا، يُمنع الرأي الشخصي في التقرير الموضوعي',
					revealAr: 'التقرير الموضوعي (compte rendu objectif) خالٍ تماما من الرأي الشخصي ومن ضمير المتكلم « je »، ونستعمل فيه ضمير الغائب (L’auteur explique / Il montre).'
				},
				{
					promptAr: 'كم ينبغي أن يكون طول التقرير الموضوعي مقارنة بطول النص الأصلي؟',
					hintAr: 'التقرير هو تكثيف مركز للنص، ليس نسخة كاملة ولا سطرا واحدا.',
					expectedInput: 'حوالي ثلث طول النص الأصلي (environ le tiers du texte)',
					revealAr: 'يكون طول التقرير الموضوعي نحو ثلث النص الأصلي تقريبا (من 8 إلى 12 سطرا في نصوص 1AS)، مع إعادة صياغة الأفكار بأسلوبك الخاص.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الفقرة الأولى (L’accroche / المقدمة): « Ce texte explicatif, intitulé "...", écrit par ... et extrait de ..., traite du thème de ... L’auteur vise à informer le lecteur et à expliquer ... »',
				'الفقرة الثانية (Le développement / العرض): نلخص أفكار كل فقرة بترتيب منطقي باستخدام أفعال القول والشرح في المضارع: D’abord, l’auteur définit... Ensuite, il explique... Puis, il cite / précise... Enfin, il conclut en montrant que...',
				'الالتزام بالحياد التام: لا نستخدم « je / nous / à mon avis »، ولا نضيف معلومات غير موجودة في النص، ولا ننسخ جملا كاملة حرفيا.',
				'الاستغناء عن الأمثلة التفصيلية الطويلة والأرقام الثانوية، والاحتفاظ فقط بالأفكار الأساسية وبأسلوب واضح سليم من الأخطاء الإملائية.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Verbes introducteurs utiles pour le compte rendu',
				rootLabel: 'L’auteur + verbe au présent',
				rootSub: 'Rester fidèle et neutre',
				branches: [
					{
						label: 'Début',
						rule: 'présente / définit / aborde',
						example: 'D’abord, il définit l’ozone.'
					},
					{
						label: 'Explication',
						rule: 'explique / décrit / montre',
						example: 'Ensuite, il explique son rôle.'
					},
					{
						label: 'Fin',
						rule: 'précise / conclut / souligne',
						example: 'Enfin, il souligne son utilité.'
					}
				]
			}),
			visualCaptionAr: 'أفعال التقديم المناسبة لربط أفكار الكاتب في التقرير الموضوعي',
			examples: [
				{
					problemAr: 'اكتب مقدمة تقرير موضوعي لنص بعنوان « Le dessalement de l’eau de mer » مقتبس من مجلة « Science et Vie Pratique ».',
					solutionAr: 'Ce texte explicatif, intitulé « Le dessalement de l’eau de mer » et extrait de la revue Science et Vie Pratique, porte sur les techniques de transformation de l’eau salée en eau potable. L’auteur vise à informer le lecteur sur ce procédé scientifique.'
				},
				{
					problemAr: 'حوّل جملة منسوخة: « L’énergie solaire transforme la lumière grâce aux cellules de silicium, par exemple à Adrar et à Tamanrasset » إلى صياغة مختصرة للتقرير.',
					solutionAr: 'L’auteur explique que l’énergie solaire convertit la lumière en électricité à l’aide de capteurs spécifiques.'
				}
			],
			watchOutAr:
				'أكبر خطأ يضيع النقاط في التقرير الموضوعي هو نسخ جمل النص كما هي (le recopiage) أو إضافة فقرة نقدية برأي شخصي (فالنقد يخص التقرير النقدي critique وليس الموضوعي objectif).'
		},
		practice: [
			{
				questionAr: 'ما الغاية التواصلية (la visée communicative) لنص التبسيط العلمي؟',
				options: [
					'Convaincre et persuader le lecteur par des sentiments',
					'Informer et expliquer un phénomène scientifique',
					'Raconter une histoire imaginaire',
					'Donner des ordres stricts au lecteur'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الإقناع العاطفي يخص النص الحجاجي لا العلمي.',
					'أحسنت! غاية نص التبسيط العلمي هي الإعلام والشرح (informer et expliquer).',
					'السرد الخيالي يخص القصة والرواية.',
					'إعطاء الأوامر يخص النص الإيعازي (injonctif).'
				],
				explanationAr: 'يهدف نص التبسيط العلمي دائما إلى الإعلام وتفسير ظاهرة علمية بأسلوب مبسط.'
			},
			{
				questionAr: 'أي جملة ممنوعة تماما في التقرير الموضوعي (compte rendu objectif)؟',
				options: [
					'D’abord, l’auteur définit le phénomène de la photosynthèse.',
					'Ensuite, le journaliste explique les étapes du filtrage.',
					'Personnellement, je trouve que ce texte est formidable et très bien écrit.',
					'Enfin, l’auteur souligne l’importance de préserver l’eau potable.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'جملة ممتازة وموضوعية.',
					'جملة صحيحة ومحايدة.',
					'أحسنت! هذه الجملة تحتوي على رأي شخصي ذاتي (Personnellement, je trouve) وهو ممنوع في التقرير الموضوعي.',
					'جملة ختامية موضوعية وسليمة.'
				],
				explanationAr: 'التقرير الموضوعي يلتزم بالحياد التام ولا يتضمن أي حكم شخصي.'
			},
			{
				questionAr: 'ما الزمن الرئيسي الذي نكتب به التقرير الموضوعي؟',
				options: [
					'Le futur antérieur',
					'Le présent de l’indicatif',
					'Le plus-que-parfait',
					'L’impératif présent'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'المستقبل الأسبق لا يُستخدم لكتابة التقرير.',
					'صحيح! نكتب التقرير الموضوعي في المضارع الدلالي (l’auteur présente, explique, montre).',
					'الماضي الأسبق خاص بالسرد في الماضي.',
					'صيغة الأمر لا تناسب التقرير.'
				],
				explanationAr: 'يُحرّر التقرير الموضوعي دائما بزمن المضارع الدلالي وبضمير الغائب.'
			},
			{
				questionAr: 'ما العناصر التي تضمّها مقدمة التقرير الموضوعي (l’accroche)؟',
				options: [
					'اسم التلميذ ورقم القسم فقط',
					'نوع النص، العنوان، الكاتب، المصدر، الموضوع، والغاية',
					'الأمثلة والأرقام التفصيلية للفقرة الأخيرة فقط',
					'الرأي الشخصي للتلميذ في النص'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذا غير صحيح.',
					'ممتاز! هذه هي بطاقة الهوية الكاملة للنص في مقدمة التقرير.',
					'الأمثلة التفصيلية لا تُذكر في المقدمة.',
					'الرأي الشخصي غير مسموح به في التقرير الموضوعي.'
				],
				explanationAr: 'المقدمة تعرّف بالنص تعريفا دقيقا (type, titre, auteur, source, thème, visée).'
			},
			{
				questionAr: 'عند تلخيص فقرة علمية في التقرير الموضوعي، ما الطريقة الصحيحة؟',
				options: [
					'نسخ الفقرة حرفيا كلمة بكلمة',
					'إعادة صياغة الفكرة الأساسية بأسلوبك الخاص مع حذف التفاصيل الثانوية',
					'إضافة معلومات من الإنترنت غير موجودة في النص',
					'كتابة رؤوس أقلام غير مترابطة بدون جمل كاملة'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'النسخ الحرفي يُفقد التلميذ نقاط إعادة الصياغة.',
					'إجابة موفقة! التقرير الموضوعي يعيد صياغة الأفكار الأساسية بإيجاز ووضوح.',
					'يجب الالتزام بما ورد في النص الأصلي فقط.',
					'يجب كتابة فقرة متماسكة بجمل كاملة وروابط منطقية.'
				],
				explanationAr: 'تقوم منهجية التقرير على إعادة الصياغة (la reformulation) والأمانة لمضمون النص.'
			}
		]
	}
];
