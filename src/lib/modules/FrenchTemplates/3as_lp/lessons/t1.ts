import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWordFormation,
	svgFrenchWritingBlueprint
} from '../../svg-french';
import type { FrenchInteractiveLessonData } from '../../types';

/**
 * 3AS BAC Lettres et Philosophie (آداب وفلسفة — yearSubjectId: 769, coeff 3, 02h30, 7+6+7=20)
 * Interactive Lessons — Trimestre 1 : Projet 1 « Textes et documents d’histoire » (5 lessons)
 */
export const LESSONS_3AS_LP_T1: FrenchInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 1: Énonciation et degré d’implication de l’historien
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_lp_t1_enonciation_historien',
		slug: 'fre-3as-lp-t1-enonciation-historien',
		grade: '3as_lp',
		yearSubjectId: 769,
		trimesterId: 't1',
		sequenceId: 'projet1',
		sequenceTitleAr: 'المشروع 1: Textes et documents d’histoire (النص التاريخي والذاكرة الجزائرية)',
		order: 1,
		titleAr: 'الإسناد التلفظي ودرجة حضور المؤرخ (Objectivité et subjectivité)',
		objectives: [
			'التمييز الدقيق بين النص التاريخي الموضوعي (Effacement énonciatif) والنص الذي يتجلى فيه حضور الكاتب أو الشاهد',
			'استخراج مؤشرات الذاتية والموضوعية من النص (الضمائر، الألفاظ التقييمية، الموجهات التعبيرية)',
			'تحديد الغاية التواصلية للنص التاريخي (Informer, commémorer, rendre hommage, témoigner)'
		],
		keywordsAr: ['Énonciation', 'Objectivité', 'Subjectivité', 'Modalisateurs', 'Témoignage', 'Visée communicative'],
		discover: {
			scenarioAr:
				'في بكالوريا آداب وفلسفة، يكثر السؤال المحوري: « L’auteur est-il objectif ou subjectif ? Justifiez votre réponse. » تأمل نصين حول تأسيس جمعية العلماء المسلمين الجزائريين سنة 1931 على يد الشيخ عبد الحميد بن باديس: الأول يسرد الوقائع بدقة محايدة، والثاني يمجّد همّة العلماء بعبارات تقديرية واضحة.',
			svg: svgFrenchGrammarMap({
				title: 'Présence de l’auteur dans le texte historique',
				rootLabel: 'L’énonciation historique',
				rootSub: 'Comment repérer l’attitude de l’historien ?',
				branches: [
					{
						label: 'Objectivité (Effacement)',
						rule: '3e personne (il/ils), dates, lieux, passif',
						example: 'Le 5 mai 1931, l’association fut fondée.'
					},
					{
						label: 'Subjectivité explicite',
						rule: 'Pronoms je / nous, avis direct',
						example: 'Nous admirons le courage des martyrs.'
					},
					{
						label: 'Subjectivité implicite',
						rule: 'Lexique mélioratif/péjoratif, modalisateurs',
						example: 'Une lutte héroïque face à un régime injuste.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'في الجملة: « Le 5 mai 1931, Cheikh Abdelhamid Ben Badis fonda l’Association des Oulémas à Alger. » هل الكاتب حاضر أم متوارٍ؟',
					hintAr: 'ابحث عن ضمائر المتكلم (je, nous) أو الصفات التقييمية (héroïque, cruel).',
					expectedInput: 'متوارٍ / موضوعي (Objectif — effacement de l’énonciateur)',
					revealAr: 'الكاتب موضوعي (objectif) لأنه استعمل ضمير الغائب (il) وذكر تاريخاً ومكاناً وحدثاً موثقاً دون أي حكم قيمي أو ضمير متكلم.'
				},
				{
					promptAr: 'كيف نعرف أن الجملة « Cette résistance admirable brisa le projet colonial arbitraire. » تحمل ذاتية ضمنية رغم غياب الضمير je؟',
					hintAr: 'لاحظ الصفتين admirable و arbitraire.',
					expectedInput: 'بواسطة المعجم التقييمي (lexique mélioratif / péjoratif)',
					revealAr: 'الذاتية الضمنية (subjectivité implicite) تظهر عبر المعجم الإيجابي (admirable, glorieux) أو السلبي (arbitraire, féroce) والظروف التقييمية (héroïquement).'
				},
				{
					promptAr: 'ما الفرق في الغاية التواصلية (Visée communicative) بين مؤرخ محايد وكاتب يشيد بالشيخ محمد البشير الإبراهيمي؟',
					hintAr: 'المحايد يهدف إلى الإخبار، أما المشيد فيضيف التكريم وتخليد الذكرى.',
					expectedInput: 'Informer d’un fait historique / Rendre hommage et commémorer',
					revealAr: 'الغاية الأساسية للنص التاريخي هي الإخبار (informer)، وتُضاف إليها غاية التكريم (rendre hommage) أو التنديد بالاستعمار (dénoncer) أو الشهادة (témoigner) حين يظهر التقييم.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الموضوعية (L’objectivité / L’effacement de l’énonciateur): يختفي الكاتب خلف الوقائع باستعمال ضمير الغائب (il, elle, ils, on)، والجمل الخبرية، والمبني للمجهول، والتسمية (nominalisation)، والتواريخ الدقيقة.',
				'الذاتية الصريحة (Subjectivité explicite): يظهر الكاتب مباشرة عبر ضمائر المتكلم (je, nous, mon, notre) خاصة إذا كان شاهداً (témoin) عاش الحدث.',
				'الذاتية الضمنية (Subjectivité implicite): يغيب الضمير je لكن يتجلى موقف الكاتب عبر الصفات الممدوحة (héroïque, mémorable, légitime) أو المذمومة (injuste, oppresseur, barbare) والموجهات (certes, sans doute, malheureusement).',
				'في إجابة البكالوريا، لا نكتفي بقول « L’auteur est subjectif »؛ بل يجب التبرير بمثالين مستخرجين من النص مع تحديد نوع المؤشر (pronom, adjectif mélioratif/péjoratif, adverbe).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Repères de l’énonciation au BAC LP',
				subtitle: 'Tableau de justification rapide dans le texte historique',
				columns: [
					{
						header: 'Objectif',
						rule: 'Faits, dates, 3e pers., passif',
						examples: 'En 1954, le front fut créé.'
					},
					{
						header: 'Témoin (Je/Nous)',
						rule: 'Présence explicite vécue',
						examples: 'Je me souviens de ce jour.'
					},
					{
						header: 'Engagé (Implicite)',
						rule: 'Lexique évaluatif / jugement',
						examples: 'Un combat noble et juste.'
					}
				]
			}),
			visualCaptionAr: 'مقارنة المؤشرات التلفظية الثلاثة في النصوص التاريخية بالبكالوريا.',
			examples: [
				{
					problemAr: 'Relevez deux indices qui montrent que l’auteur est objectif dans : « En 1936, le Congrès musulman algérien se réunit à Alger. »',
					solutionAr: '1) Emploi de la 3e personne (le Congrès ... se réunit) ; 2) Précision chronologique et géographique (En 1936, à Alger) sans lexique évaluatif.'
				},
				{
					problemAr: 'L’auteur marque-t-il sa présence dans : « L’action lumineuse de Cheikh Ben Badis éveilla les consciences opprimées. » ?',
					solutionAr: 'Oui, de manière implicite, grâce aux adjectifs évaluatifs : « lumineuse » (mélioratif) et « opprimées » (péjoratif).'
				},
				{
					problemAr: 'Quelle est la visée communicative d’un texte consacré au sacrifice de Larbi Ben M’hidi ?',
					solutionAr: 'Informer sur le parcours du martyr et lui rendre un vibrant hommage tout en préservant la mémoire nationale.'
				}
			],
			watchOutAr: 'انتبه في البكالوريا: غياب الضمير « je » لا يعني بالضرورة أن الكاتب موضوعي! افحص دائماً الصفات والظروف والأسماء التقييمية قبل الحكم بالموضوعية.'
		},
		practice: [
			{
				questionAr: 'Quel indice relève de l’objectivité (effacement énonciatif) dans un texte d’histoire ?',
				options: [
					'L’emploi de la troisième personne, des dates exactes et de la tournure impersonnelle',
					'L’emploi répété du pronom personnel « je » et d’exclamations',
					'L’utilisation d’adjectifs comme « héroïque » et « tyrannique »',
					'L’usage de l’impératif pour interpeller le lecteur'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: غياب ضمائر المتكلم وتقديم الوقائع بضمير الغائب والتواريخ الدقيقة هي علامات الموضوعية.',
					'خطأ: ضمير المتكلم « je » وعلامات التعجب من أبرز علامات الذاتية الصريحة.',
					'خطأ: الصفات التقييمية (ممدوحة أو مذمومة) تدل على ذاتية ضمنية.',
					'خطأ: صيغة الأمر سمة لنص النداء لا للنص التاريخي الموضوعي.'
				],
				explanationAr: 'يتميز النص التاريخي الموضوعي بالتركيز على الحدث عبر ضمير الغائب والتواريخ والوقائع الموثقة.'
			},
			{
				questionAr: 'Dans la phrase : « Le 1er Novembre 1954 marqua le début d’une épopée glorieuse contre une domination injuste », l’auteur est :',
				options: [
					'Totalement objectif car il n’emploie pas le pronom « je »',
					'Subjectif de manière implicite grâce au lexique évaluatif',
					'Un narrateur de fiction sans rapport avec l’histoire',
					'Un journaliste qui interdit toute opinion'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: غياب « je » لا يمنع الذاتية ما دامت الكلمات التقييمية حاضرة.',
					'ممتاز: الكلمات « épopée glorieuse » (ممدوحة) و« injuste » (مذمومة) تعكس ذاتية ضمنية واضحة.',
					'خطأ: النص يتناول حدثاً تاريخياً حقيقياً وموثقاً.',
					'خطأ: الموقف التقييمي واضح في اختيار الصفات.'
				],
				explanationAr: 'المعجم التقييمي الإيجابي والسلبي يكشف موقف الكاتب الضمني حتى دون استعمال ضمير المتكلم.'
			},
			{
				questionAr: 'Dans un témoignage sur la Casbah d’Alger en 1957, l’emploi de « nous avons vu » révèle :',
				options: [
					'Un effacement total de l’énonciateur',
					'Une voix passive impersonnelle',
					'Une implication explicite de l’auteur comme témoin des faits',
					'Une simple définition scientifique'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: وجود الضمير « nous » ينفي تواري الكاتب.',
					'خطأ: الفعل « avons vu » في المبني للمعلوم لا للمجهول.',
					'صحيح: استعمال « nous » يثبت حضور الكاتب الصريح بصفته شاهداً على الحدث.',
					'خطأ: العبارة شهادة تاريخية وليست تعريفاً علمياً.'
				],
				explanationAr: 'استعمال ضمائر المتكلم (je, nous) في نص تاريخي يدل على الشهادة المباشرة والذاتية الصريحة.'
			},
			{
				questionAr: 'Laquelle de ces expressions appartient au lexique péjoratif (dévalorisant) ?',
				options: [
					'Un enseignement fécond',
					'Une détermination exemplaire',
					'Un héritage précieux',
					'Une répression impitoyable'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: « fécond » صفة إيجابية (méliorative).',
					'خطأ: « exemplaire » صفة تقديرية إيجابية.',
					'خطأ: « précieux » صفة إيجابية تدل على القيمة.',
					'أحسنت: « répression impitoyable » تعبير ذمّي سلبي (péjoratif) يدين القمع.'
				],
				explanationAr: 'المعجم القدحي (péjoratif) يُستعمل لإدانة الظلم أو القمع الاستعماري.'
			},
			{
				questionAr: 'Si un historien publie un article retraçant l’œuvre éducative de Cheikh Mohamed Bachir El-Ibrahimi avec admiration, sa visée est :',
				options: [
					'Informer sur son parcours et lui rendre hommage',
					'Donner une recette technique d’imprimerie',
					'Exhorter uniquement à planter des arbres',
					'Critiquer la lecture et l’instruction'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: يجمع النص بين الإخبار التاريخي وتكريم شخصية إصلاحية جزائرية.',
					'خطأ: ليس نصاً إرشادياً تقنياً.',
					'خطأ: هذا موضوع نص نداء بيئي لا نص تاريخي.',
					'خطأ: النص يشيد بالتعليم والإصلاح.'
				],
				explanationAr: 'تُحدّد الغاية التواصلية بجمع الوظيفة الإخبارية (informer) مع موقف الكاتب (rendre hommage / commémorer).'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 2: Nominalisation, voix passive et focalisation sur l’événement
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_lp_t1_nominalisation_passif',
		slug: 'fre-3as-lp-t1-nominalisation-passif',
		grade: '3as_lp',
		yearSubjectId: 769,
		trimesterId: 't1',
		sequenceId: 'projet1',
		sequenceTitleAr: 'المشروع 1: Textes et documents d’histoire (النص التاريخي والذاكرة الجزائرية)',
		order: 2,
		titleAr: 'التسمية (Nominalisation) والمبني للمجهول والتركيز على الحدث التاريخي',
		objectives: [
			'تحويل الجمل الفعلية إلى جمل اسمية باستعمال لواحق التسمية (-tion, -ment, -age, -ure, -ance)',
			'التحويل السليم من المبني للمعلوم (Voix active) إلى المبني للمجهول (Voix passive) مع احترام زمن الفعل ومطابقة اسم المفعول',
			'فهم الأثر الدلالي للتسمية والمبني للمجهول في إبراز الحدث التاريخي بدل الفاعل'
		],
		keywordsAr: ['Nominalisation', 'Voix passive', 'Focalisation', 'Suffixes', 'Participe passé', 'Complément d’agent'],
		discover: {
			scenarioAr:
				'يعتمد المؤرخون على التسمية (La nominalisation) والمبني للمجهول (La voix passive) لصياغة عناوين مكثفة أو لتسليط الضوء على الحدث التاريخي نفسه. مثلاً: بدل « On a déclenché la Révolution » يكتب المؤرخ « Le déclenchement de la Révolution » أو « La Révolution a été déclenchée ».',
			svg: svgFrenchWordFormation({
				title: 'Formation des noms d’action (Nominalisation)',
				prefix: 'dé- / ré- / in-',
				root: 'déclench / libér / proclam',
				suffix: '-ment / -ation / -age',
				derivedWord: 'déclenchement / libération / proclamation',
				meaningNote: 'La nominalisation résume l’événement et renforce l’objectivité.'
			}),
			steps: [
				{
					promptAr: 'حوّل الجملة التالية إلى عنوان اسمي: « On a proclamé l’indépendance de l’Algérie en juillet 1962. »',
					hintAr: 'استخرج الاسم من الفعل « proclamer » وأكمل العبارة الاسمية.',
					expectedInput: 'La proclamation de l’indépendance de l’Algérie en juillet 1962.',
					revealAr: 'الفعل « proclamer » يعطي الاسم « proclamation »؛ فنحصل على جملة اسمية موجزة تبرز الحدث.'
				},
				{
					promptAr: 'حوّل إلى المبني للمجهول: « Les moudjahidine organisèrent le Congrès de la Soummam. »',
					hintAr: 'الفعل « organisèrent » في Passé simple، إذن نضع المساعد être في Passé simple: fut + organisé.',
					expectedInput: 'Le Congrès de la Soummam fut organisé par les moudjahidine.',
					revealAr: 'في التحويل إلى المبني للمجهول نحافظ بدقة على زمن الفعل الأصلي في المساعد être: organisèrent (PS) يعطي fut organisé.'
				},
				{
					promptAr: 'ماذا ننتبه إليه في اسم المفعول (participe passé) عند التحويل إلى المبني للمجهول مع فاعل مؤنث مثل « La déclaration »؟',
					hintAr: 'اسم المفعول مع المساعد être يطابق الفاعل دائماً.',
					expectedInput: 'المطابقة في النوع والعدد (La déclaration fut rédigée).',
					revealAr: 'مع المساعد être في المبني للمجهول، يطابق اسم المفعول الفاعل دائماً: La déclaration fut rédigée ; les écoles furent ouvertes.'
				}
			]
		},
		summary: {
			rulesAr: [
				'التسمية (La nominalisation) هي تحويل فعل أو صفة إلى اسم باستعمال اللواحق: -tion / -ation (libérer -> libération، fonder -> fondation)، -ment (déclencher -> déclenchement، rassembler -> rassemblement)، -ance / -ence (résister -> résistance)، -age (partager -> partage)، -ure (ouvrir -> ouverture).',
				'فائدة التسمية في النص التاريخي: تكثيف المعلومة، صياغة العناوين، وتقوية الطابع الموضوعي والملخص للحدث.',
				'المبني للمجهول (La voix passive): المفعول به (COD) يصبح فاعلاً، ونصرف المساعد être في نفس زمن الفعل الأصلي + اسم المفعول (participe passé) مطابقاً للفاعل + par + الفاعل الأصلي (إن لم يكن on).',
				'جدول الأزمنة في المبني للمجهول: Présent -> est + PP | Imparfait -> était + PP | Passé simple -> fut + PP | Passé composé -> a été + PP | Futur simple -> sera + PP. ملاحظة: إذا كان الفاعل « on » نحذف « par on »!'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Transformation passive selon le temps',
				rootLabel: 'Sujet + ÊTRE (au temps actif) + PP',
				rootSub: 'Le participe passé s’accorde avec le sujet passif',
				branches: [
					{
						label: 'Présent',
						rule: 'fonde -> est fondée',
						example: 'Une école est fondée.'
					},
					{
						label: 'Passé simple',
						rule: 'fonda -> fut fondée',
						example: 'L’école fut fondée en 1931.'
					},
					{
						label: 'Passé composé',
						rule: 'a fondé -> a été fondée',
						example: 'L’école a été fondée.'
					},
					{
						label: 'Avec « on »',
						rule: 'On supprime « par on »',
						example: 'On libéra le pays -> Le pays fut libéré.'
					}
				]
			}),
			visualCaptionAr: 'قاعدة التحويل إلى المبني للمجهول في أبرز أزمنة النص التاريخي.',
			examples: [
				{
					problemAr: 'Nominalisez : « Les savants algériens ont créé des écoles libres. »',
					solutionAr: 'La création d’écoles libres par les savants algériens.'
				},
				{
					problemAr: 'Mettez à la voix passive : « Cheikh Ben Badis dirigea la revue Al-Chihab. »',
					solutionAr: 'La revue Al-Chihab fut dirigée par Cheikh Ben Badis.'
				},
				{
					problemAr: 'Mettez à la voix passive : « On a préservé les archives historiques. »',
					solutionAr: 'Les archives historiques ont été préservées. (Sans « par on » !)'
				}
			],
			watchOutAr: 'خطآن شائعان في البكالوريا: كتابة « par on » عند التحويل من جملة تبدأ بـ « On »، ونسيان مطابقة اسم المفعول (المؤنث والجمع) مع الفاعل الجديد مثل « Les écoles furent construites ».'
		},
		practice: [
			{
				questionAr: 'Quel est le nom dérivé du verbe « rassembler » ?',
				options: ['rassemblation', 'rassemblement', 'rassemblure', 'rassemblance'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: اللاحقة -ation لا تناسب الفعل rassembler.',
					'صحيح: الفعل rassembler يأخذ اللاحقة -ment ليعطي rassemblement.',
					'خطأ: صيغة غير موجودة في الفرنسية.',
					'خطأ: لاحقة غير صحيحة لهذا الفعل.'
				],
				explanationAr: 'الاسم المشتق من الفعل rassembler هو le rassemblement.'
			},
			{
				questionAr: 'Transformez correctement à la voix passive : « On a diffusé la Déclaration du 1er Novembre. »',
				options: [
					'La Déclaration du 1er Novembre a été diffusée.',
					'La Déclaration du 1er Novembre a été diffusé par on.',
					'La Déclaration du 1er Novembre fut diffusée par on.',
					'La Déclaration du 1er Novembre était diffusée.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: حافظنا على زمن Passé composé (a été)، طابقنا اسم المفعول (diffusée) وحذفنا « par on ».',
					'خطأ: يجب حذف « par on » ومطابقة اسم المفعول مع المؤنث.',
					'خطأ: تغير الزمن إلى Passé simple مع بقاء « par on ».',
					'خطأ: تغير الزمن إلى Imparfait.'
				],
				explanationAr: 'Passé composé مبني للمجهول = a été + participe passé مطابق، مع حذف الفاعل المبهم on.'
			},
			{
				questionAr: 'Choisissez la bonne transformation passive de : « Les historiens rédigèrent ces ouvrages. »',
				options: [
					'Ces ouvrages sont rédigés par les historiens.',
					'Ces ouvrages ont été rédigés par les historiens.',
					'Ces ouvrages furent rédigés par les historiens.',
					'Ces ouvrages étaient rédigés par les historiens.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: هذا مضارع وليس passé simple.',
					'خطأ: هذا passé composé وليس passé simple.',
					'صحيح: الفعل rédigèrent في passé simple، فيُصرف être في passé simple جمع: furent rédigés.',
					'خطأ: هذا imparfait.'
				],
				explanationAr: 'عندما يكون الفعل المعلوم في passé simple نضع être في passé simple (fut / furent).'
			},
			{
				questionAr: 'Quelle nominalisation résume le mieux : « Les citoyens résistent courageusement. » ?',
				options: [
					'Le résistement des citoyens',
					'La résisterie des citoyens',
					'Le résister des citoyens',
					'La résistance courageuse des citoyens'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: لا توجد كلمة résistement.',
					'خطأ: صيغة خاطئة.',
					'خطأ: نحتاج اسماً مشتقاً لا مصدراً.',
					'أحسنت: الاسم من résister هو la résistance، والظرف يصبح صفة مطابقة (courageuse).'
				],
				explanationAr: 'عند التسمية يتحول الفعل résister إلى الاسم la résistance ويتحول الظرف courageusement إلى صفة courageuse.'
			},
			{
				questionAr: 'Pourquoi l’historien privilégie-t-il la voix passive sans complément d’agent dans certains passages ?',
				options: [
					'Pour mettre en valeur l’événement lui-même plutôt que son auteur',
					'Pour raconter un rêve personnel',
					'Pour donner un ordre direct au lecteur',
					'Pour supprimer la concordance des temps'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: المبني للمجهول يسلط الضوء على الحدث (focalisation sur l’événement) ويعزز الموضوعية.',
					'خطأ: لا علاقة له بالسرد الشخصي.',
					'خطأ: الأمر يُصاغ بـ l’impératif.',
					'خطأ: المبني للمجهول يحترم الأزمنة بدقة.'
				],
				explanationAr: 'يسمح المبني للمجهول بالتركيز على الواقعة التاريخية وتحييد الفاعل حين يكون معلوماً أو غير محدد.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 3: Discours rapporté et insertion du témoignage historique
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_lp_t1_discours_rapporte_temoignage',
		slug: 'fre-3as-lp-t1-discours-rapporte-temoignage',
		grade: '3as_lp',
		yearSubjectId: 769,
		trimesterId: 't1',
		sequenceId: 'projet1',
		sequenceTitleAr: 'المشروع 1: Textes et documents d’histoire (النص التاريخي والذاكرة الجزائرية)',
		order: 3,
		titleAr: 'الخطاب المنقول (Discours direct / indirect) وتوظيف الشهادة التاريخية',
		objectives: [
			'إتقان التحويل بين الخطاب المباشر (Discours direct) والخطاب غير المباشر (Discours indirect)',
			'تطبيق قواعد توافق الأزمنة والضمائر والمؤشرات الزمانية عند كون فعل القول في الماضي',
			'إدراك وظيفة إدراج الشهادات والاقتباسات (Citations / témoignages) في إثبات مصداقية النص التاريخي'
		],
		keywordsAr: ['Discours direct', 'Discours indirect', 'Verbe introducteur', 'Concordance des temps', 'Témoignage'],
		discover: {
			scenarioAr:
				'لإثبات صدق روايته، يدرج المؤرخ أقوال الفاعلين والشهود، إما حرفياً بين مزدوجتين (discours direct) أو مدمجة في جملته (discours indirect). لاحظ التحولات الدقيقة التي تطرأ حين يكون فعل القول في الماضي (a déclaré / affirma).',
			svg: svgFrenchGrammarMap({
				title: 'Concordance des temps au Discours Indirect',
				rootLabel: 'Verbe introducteur au PASSÉ',
				rootSub: 'déclara / a affirmé / expliquait que...',
				branches: [
					{
						label: 'Présent -> Imparfait',
						rule: 'je défends -> il défendait',
						example: 'Il dit qu’il défendait la justice.'
					},
					{
						label: 'Passé comp. -> PQP',
						rule: 'nous avons ouvert -> ils avaient ouvert',
						example: 'Il déclara qu’ils avaient ouvert.'
					},
					{
						label: 'Futur -> Cond. présent',
						rule: 'elle vaincra -> elle vaincrait',
						example: 'Il affirma qu’elle vaincrait.'
					},
					{
						label: 'Impératif -> de + Inf.',
						rule: 'Unissez-vous -> de s’unir',
						example: 'Il demanda de s’unir.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'إذا كان فعل القول في المضارع (L’historien affirme : « Le peuple a résisté. »)، هل تتغير أزمنة الأفعال عند التحويل إلى غير المباشر؟',
					hintAr: 'فعل القول « affirme » في الحاضر (présent).',
					expectedInput: 'لا، تبقى الأزمنة كما هي: L’historien affirme que le peuple a résisté.',
					revealAr: 'عندما يكون فعل القول في المضارع أو المستقبل، نحذف المزدوجتين ونضيف que دون تغيير زمن الفعل المنقول.'
				},
				{
					promptAr: 'حوّل إلى غير المباشر مع فعل قول ماضٍ: Le témoin déclara : « Nous défendons notre dignité. »',
					hintAr: 'حوّل الضمير (nous -> ils)، والصفة الملكية (notre -> leur)، والمضارع (défendons -> Imparfait).',
					expectedInput: 'Le témoin déclara qu’ils défendaient leur dignité.',
					revealAr: 'المضارع يتحول إلى imparfait (défendaient) والضمير nous إلى ils والملكية notre إلى leur.'
				},
				{
					promptAr: 'كيف ننقل السؤال المباشر الكلي (المجاب عنه بـ oui / non): Il demanda : « Avez-vous lu le journal El-Bassaïr ? »',
					hintAr: 'استعمل أداة الربط « si » بدل « que ».',
					expectedInput: 'Il demanda s’ils avaient lu le journal El-Bassaïr.',
					revealAr: 'السؤال الكلي يُنقل بـ « si » مع تحويل الزمن (Passé composé -> Plus-que-parfait) وحذف علامة الاستفهام وقلب الفاعل.'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة الأولى (فعل القول في المضارع/المستقبل): نحذف النقطتين والمزدوجتين، ونربط بـ que (للخبر)، أو si (للسؤال الكلي)، أو de + infinitif (للأمر)، دون تغيير أزمنة الأفعال.',
				'القاعدة الثانية (فعل القول في الماضي — الأكثر وروداً في البكالوريا): تتغير الأزمنة كالتالي: Présent -> Imparfait | Passé composé -> Plus-que-parfait | Futur simple -> Conditionnel présent | Impératif -> de + Infinitif.',
				'تغير المؤشرات الزمانية عند النقل في الماضي: aujourd’hui -> ce jour-là | hier -> la veille | demain -> le lendemain | ici -> là.',
				'وظيفة الشهادة التاريخية (Valeur du témoignage): تضفي المصداقية (crédibilité) والحيوية (authenticité) على السرد التاريخي، وتنقل التجربة المعيشة من داخل الحدث.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Repères spatio-temporels au Discours Indirect',
				subtitle: 'Quand le verbe introducteur est au passé',
				columns: [
					{
						header: 'Temps présent',
						rule: 'aujourd’hui / maintenant',
						examples: 'ce jour-là / à ce moment-là'
					},
					{
						header: 'Temps passé',
						rule: 'hier / la semaine dernière',
						examples: 'la veille / la semaine précédente'
					},
					{
						header: 'Temps futur',
						rule: 'demain / l’an prochain',
						examples: 'le lendemain / l’année suivante'
					}
				]
			}),
			visualCaptionAr: 'تحولات الظروف الزمانية عند التحويل من الخطاب المباشر إلى غير المباشر في الماضي.',
			examples: [
				{
					problemAr: 'Mettez au discours indirect : Cheikh Ben Badis affirma : « L’instruction libérera la jeunesse algérienne. »',
					solutionAr: 'Cheikh Ben Badis affirma que l’instruction libérerait la jeunesse algérienne.'
				},
				{
					problemAr: 'Mettez au discours indirect : Le responsable ordonna aux étudiants : « Préservez ces manuscrits ! »',
					solutionAr: 'Le responsable ordonna aux étudiants de préserver ces manuscrits.'
				},
				{
					problemAr: 'Mettez au discours direct : Le témoin a rappelé que la veille ils avaient entendu le premier appel.',
					solutionAr: 'Le témoin a rappelé : « Hier, nous avons entendu le premier appel. »'
				}
			],
			watchOutAr: 'احذر أن تكتب « si il » بل اكتب دائماً « s’il »! ولا تترك علامة الاستفهام « ? » في نهاية الجملة الاستفهامية غير المباشرة.'
		},
		practice: [
			{
				questionAr: 'Transformez au discours indirect : L’ancien combattant déclara : « Je garderai ce souvenir vivant. »',
				options: [
					'L’ancien combattant déclara qu’il gardera ce souvenir vivant.',
					'L’ancien combattant déclara qu’il garderait ce souvenir vivant.',
					'L’ancien combattant déclara que je garderais ce souvenir vivant.',
					'L’ancien combattant déclara qu’il gardait ce souvenir vivant.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: بقي الفعل في Futur simple رغم أن فعل القول في الماضي (déclara).',
					'أحسنت: يتحول Futur simple (garderai) إلى Conditionnel présent (garderait) والضمير je إلى il.',
					'خطأ: لم يتحول الضمير je إلى il.',
					'خطأ: gardait ماضٍ ناقص لا يقابل المستقبل.'
				],
				explanationAr: 'مع فعل قول ماضٍ، يتحول Futur simple إلى Conditionnel présent.'
			},
			{
				questionAr: 'Choisissez la bonne transposition : Le journaliste demanda : « Qu’est-ce qui a motivé votre engagement ? »',
				options: [
					'Le journaliste demanda ce qui avait motivé leur engagement.',
					'Le journaliste demanda qu’est-ce qui avait motivé leur engagement.',
					'Le journaliste demanda si avait motivé leur engagement.',
					'Le journaliste demanda ce que avait motivé leur engagement.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: تتحول « qu’est-ce qui » إلى « ce qui » ويتحول Passé composé إلى Plus-que-parfait.',
					'خطأ: لا نحتفظ بـ « qu’est-ce qui » في الخطاب غير المباشر.',
					'خطأ: « si » للسؤال الكلي فقط.',
					'خطأ: « ce qui » للفاعل وليس « ce que ».'
				],
				explanationAr: 'في السؤال غير المباشر: qu’est-ce qui -> ce qui، و qu’est-ce que -> ce que.'
			},
			{
				questionAr: 'Comment transpose-t-on l’adverbe « hier » lorsque le verbe introducteur est au passé ?',
				options: ['le lendemain', 'ce jour-là', 'la veille', 'plus tard'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: le lendemain يقابل demain.',
					'خطأ: ce jour-là يقابل aujourd’hui.',
					'صحيح: hier يتحول إلى la veille.',
					'خطأ: تحويل غير دقيق.'
				],
				explanationAr: 'جدول التحول القياسي: hier -> la veille، aujourd’hui -> ce jour-là، demain -> le lendemain.'
			},
			{
				questionAr: 'Mettez au discours indirect : Cheikh El-Ibrahimi conseilla aux élèves : « Travaillez avec persévérance ! »',
				options: [
					'Cheikh El-Ibrahimi conseilla aux élèves qu’ils travaillent avec persévérance.',
					'Cheikh El-Ibrahimi conseilla aux élèves si travailler avec persévérance.',
					'Cheikh El-Ibrahimi conseilla aux élèves que travailler avec persévérance.',
					'Cheikh El-Ibrahimi conseilla aux élèves de travailler avec persévérance.'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: الصيغة القياسية لنقل الأمر المباشر هي de + infinitif.',
					'خطأ: « si » للاستفهام الكلي فقط.',
					'خطأ: نربط بـ « de » لا بـ « que » قبل المصدر.',
					'ممتاز: يتحول فعل الأمر (Travaillez) إلى de + infinitif (de travailler).'
				],
				explanationAr: 'الجملة الأمرية في الخطاب المباشر تتحول دائماً إلى « de + مصدر الفعل » في الخطاب غير المباشر.'
			},
			{
				questionAr: 'Quel est le rôle principal de l’insertion de témoignages dans un texte d’histoire ?',
				options: [
					'Authentifier les faits et donner plus de crédibilité au récit',
					'Remplacer toutes les dates historiques',
					'Rendre le texte purement imaginaire',
					'Supprimer les paragraphes explicatifs'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الشهادة الحية تعزز مصداقية النص التاريخي وتقرب القارئ من الحدث.',
					'خطأ: الشهادة تكمل التواريخ ولا تلغيها.',
					'خطأ: النص التاريخي يوثّق الواقع لا الخيال.',
					'خطأ: الشهادة تدعم الشرح التاريخي.'
				],
				explanationAr: 'يستعين المؤرخ بالشهادات والاقتباسات لإثبات صحة الوقائع وإضفاء الطابع الإنساني الموثق.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 4: Valeurs des temps du passé et présent historique
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_lp_t1_temps_passe_present_historique',
		slug: 'fre-3as-lp-t1-temps-passe-present-historique',
		grade: '3as_lp',
		yearSubjectId: 769,
		trimesterId: 't1',
		sequenceId: 'projet1',
		sequenceTitleAr: 'المشروع 1: Textes et documents d’histoire (النص التاريخي والذاكرة الجزائرية)',
		order: 4,
		titleAr: 'قيم أزمنة الماضي والمضارع التاريخي (Passé simple, Imparfait, Présent historique)',
		objectives: [
			'التمييز بين القيم الدلالية للماضي البسيط (Passé simple) والماضي الناقص (Imparfait) والماضي المركب (Passé composé)',
			'تحديد قيمة المضارع التاريخي / السردي (Présent historique / de narration) وأثره في إحياء الحدث',
			'توظيف التوافق الزمني الدقيق في سرد الوقائع التاريخية وتلخيصها'
		],
		keywordsAr: ['Passé simple', 'Imparfait', 'Passé composé', 'Présent historique', 'Chronologie', 'Antériorité'],
		discover: {
			scenarioAr:
				'عندما تقرأ نصاً تاريخياً في البكالوريا، تلاحظ تنقّل المؤرخ بين Imparfait لوصف الوضع السائد، و Passé simple للأحداث الحاسمة المفاجئة، وأحياناً يوظف Présent de l’indicatif رغم أن الحديث عن سنة 1954! لماذا يفعل ذلك؟',
			svg: svgFrenchTenseTimeline({
				title: 'Temps du récit historique',
				tenseName: 'Passé simple / Imparfait / Présent historique',
				formula: 'Imparfait (décor) + Passé simple (action clé) / Présent (actualisation)',
				activeZone: 'two_past',
				example: 'Le pays subissait l’oppression ; le 1er Novembre 1954, le peuple se soulève.',
				markers: 'en 1931, dès lors, soudain, durant des décennies, ce jour-là'
			}),
			steps: [
				{
					promptAr: 'ما القيمة الدلالية للزمن Imparfait في الجملة: « Les écoles coraniques accueillaient chaque matin des dizaines d’enfants. »؟',
					hintAr: 'لاحظ العبارة « chaque matin » التي تدل على التكرار والاستمرار.',
					expectedInput: 'وصف وعادة متكررة في الماضي (Description et habitude)',
					revealAr: 'يُستعمل Imparfait لوصف الإطار والأحوال أو الأفعال الطويلة والمتكررة في خلفية الحدث (arrière-plan).'
				},
				{
					promptAr: 'ما وظيفة Passé simple في: « Le 19 juin 1956, Ahmed Zabana affronta la mort avec une fermeté exemplaire. »؟',
					hintAr: 'هل هو حدث متكرر أم حدث رئيسي محدد ومكتمل في الماضي؟',
					expectedInput: 'حدث رئيسي محدد ومنتهٍ في الماضي (Action de premier plan, brève et achevée)',
					revealAr: 'يعبّر Passé simple عن الأحداث الجوهرية المتعاقبة والمنتهية في السرد التاريخي (premier plan).'
				},
				{
					promptAr: 'لماذا استعمل الكاتب المضارع في: « En mai 1931, Ben Badis crée l’Association des Oulémas et lance le journal Al-Chihab. »؟',
					hintAr: 'يسمى هذا الزمن في البكالوريا le présent historique (أو de narration).',
					expectedInput: 'لإحياء الحدث وتقريبه من القارئ كأنه يقع الآن (Actualiser et rendre le récit plus vivant)',
					revealAr: 'المضارع التاريخي (présent historique) يجعل القارئ يعيش الواقعة الماضية وكأنها تجري أمام عينيه (actualisation).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الماضي الناقص (L’imparfait): يُستعمل للوصف (description)، والأوضاع المستمرة، والعادات المتكررة في الماضي (خلفية الحدث — arrière-plan).',
				'الماضي البسيط (Le passé simple): يُستعمل للأحداث الرئيسية الحاسمة، المحددة زمنياً، والمتعاقبة في التاريخ (واجهة الحدث — premier plan).',
				'الماضي المركب (Le passé composé): يُستعمل كثيراً في المقالات الصحفية التاريخية والشهادات الحية لربط الحدث الماضي بأثره في الحاضر.',
				'الماضي الأسبق (Le plus-que-parfait): يعبر عن حدث وقع قبل حدث ماضٍ آخر (antériorité). مثال: Il publia le texte qu’il avait rédigé la veille.',
				'المضارع التاريخي (Le présent historique / de narration): يرد في سياق ماضٍ (مع تواريخ مثل En 1954) لإضفاء الحيوية وتقريب الحدث من القارئ (actualiser les faits).'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Valeurs des temps au BAC Histoire',
				rootLabel: 'Système temporel historique',
				rootSub: 'Chaque temps porte une fonction précise',
				branches: [
					{
						label: 'Imparfait',
						rule: 'Décor, durée, habitude',
						example: 'Le peuple souffrait en silence.'
					},
					{
						label: 'Passé simple',
						rule: 'Événement clé, succession',
						example: 'La Révolution éclata en 1954.'
					},
					{
						label: 'Plus-que-parfait',
						rule: 'Action antérieure au passé',
						example: 'Ils avaient préparé l’appel.'
					},
					{
						label: 'Présent historique',
						rule: 'Vivacité et actualisation',
						example: 'En 1962, l’Algérie retrouve sa liberté.'
					}
				]
			}),
			visualCaptionAr: 'خريطة القيم الدلالية لأزمنة النص التاريخي في امتحان البكالوريا.',
			examples: [
				{
					problemAr: 'Quelle est la valeur du présent dans : « Le 5 juillet 1962, les rues d’Alger s’illuminent de joie. » ?',
					solutionAr: 'C’est un présent historique (ou de narration) : il actualise l’événement passé et le rend plus vivant aux yeux du lecteur.'
				},
				{
					problemAr: 'Justifiez l’emploi de l’imparfait et du passé simple : « La censure frappait la presse quand parut El-Bassaïr. »',
					solutionAr: '« frappait » (imparfait) décrit une situation durable d’arrière-plan ; « parut » (passé simple) marque l’événement soudain de premier plan.'
				},
				{
					problemAr: 'Quel temps exprime l’antériorité dans : « Cheikh El-Mili publia l’ouvrage qu’il avait patiemment documenté. » ?',
					solutionAr: 'Le plus-que-parfait (« avait documenté ») exprime une action antérieure à « publia ».'
				}
			],
			watchOutAr: 'لا تخلط بين المضارع التاريخي (Présent historique — يرتبط بتاريخ ماضٍ مثل En 1954) ومضارع الحقيقة العامة (Présent de vérité générale — مثل L’histoire éclaire le présent)!'
		},
		practice: [
			{
				questionAr: 'Dans la phrase : « Le 1er Novembre 1954, les patriotes lancent l’offensive décisive », quelle est la valeur du présent ?',
				options: [
					'Présent d’habitude quotidienne',
					'Présent historique (de narration)',
					'Présent de vérité scientifique',
					'Présent d’énonciation immédiate'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الحدث وقع مرة واحدة في تاريخ محدد.',
					'صحيح: ورود المضارع مع تاريخ ماضٍ (1er Novembre 1954) يعطي قيمة المضارع التاريخي لتقريب الحدث.',
					'خطأ: ليس قانوناً علمياً عاماً.',
					'خطأ: الحدث ليس لحظة الكلام الحالية.'
				],
				explanationAr: 'المضارع التاريخي يروي واقعة ماضية بزمن الحاضر لإضفاء الحيوية والإثارة.'
			},
			{
				questionAr: 'Quel temps est utilisé pour décrire le contexte durable ou les habitudes dans un récit historique au passé ?',
				options: ['L’imparfait', 'Le passé simple', 'Le futur antérieur', 'L’impératif présent'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: الماضي الناقص (Imparfait) يختص بالوصف والمدة والعادة في الماضي.',
					'خطأ: الماضي البسيط للأحداث الحاسمة المحددة.',
					'خطأ: المستقبل الأسبق ليس للوصف الماضي.',
					'خطأ: الأمر لا يُستخدم للوصف التاريخي.'
				],
				explanationAr: 'يمثل Imparfait خلفية السرد (décor, description, durée).'
			},
			{
				questionAr: 'Dans : « Après qu’ils eurent préparé les tracts, les militants distribuèrent l’appel », quel temps marque l’événement principal ?',
				options: [
					'Le présent',
					'Le conditionnel',
					'Le passé simple (distribuèrent)',
					'L’imparfait'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: لا يوجد فعل في المضارع.',
					'خطأ: لا يوجد شرطي هنا.',
					'صحيح: الفعل distribuèrent مصرف في passé simple للحدث الرئيسي المكتمل.',
					'خطأ: لا يوجد imparfait في الجملة.'
				],
				explanationAr: 'Passé simple (distribuèrent) يعبر عن الحدث الرئيسي التالي في السرد التاريخي.'
			},
			{
				questionAr: 'Quelle est la valeur du présent dans : « La mémoire collective unit toujours les générations » ?',
				options: [
					'Présent historique',
					'Présent de futur proche',
					'Présent de passé récent',
					'Présent de vérité générale'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: لا يرتبط بتاريخ ماضٍ محدد.',
					'خطأ: لا يدل على مستقبل وشيك.',
					'خطأ: لا يدل على ماضٍ قريب.',
					'أحسنت: يعبر عن حقيقة عامة دائمة صالحة في كل زمان.'
				],
				explanationAr: 'المضارع الذي يقرر حكمة أو قاعدة عامة دائمة يُسمى présent de vérité générale.'
			},
			{
				questionAr: 'Quel temps emploie-t-on pour un fait survenu AVANT un autre fait déjà exprimé au passé composé ou à l’imparfait ?',
				options: ['Le plus-que-parfait', 'Le futur simple', 'Le subjonctif présent', 'L’impératif'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: Plus-que-parfait يعبر عن الأسبقية الزمنية (antériorité) في الماضي.',
					'خطأ: Futur simple للمستقبل.',
					'خطأ: Subjonctif ليس للتسلسل الزمني الماضي.',
					'خطأ: Impératif للأمر.'
				],
				explanationAr: 'لبيان أن حدثاً وقع قبل حدث ماضٍ آخر نستعمل Le plus-que-parfait.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 5: Le Compte Rendu Critique (Spécifique BAC LP)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_lp_t1_compte_rendu_critique',
		slug: 'fre-3as-lp-t1-compte-rendu-critique',
		grade: '3as_lp',
		yearSubjectId: 769,
		trimesterId: 't1',
		sequenceId: 'projet1',
		sequenceTitleAr: 'المشروع 1: Textes et documents d’histoire (النص التاريخي والذاكرة الجزائرية)',
		order: 5,
		titleAr: 'منهجية التقرير النقدي (Le Compte Rendu Critique — خاص بشعبة آداب وفلسفة)',
		objectives: [
			'التمييز الحاسم بين التقرير الموضوعي (الشعب العلمية) والتقرير النقدي (آداب وفلسفة ولغات: المقدمة + الملخص + الوقفة النقدية)',
			'صياغة فقرة التقديم (Accroche) بعناصرها الكاملة: العنوان، الكاتب، المصدر، النوع، الموضوع والغاية التواصلية',
			'كتابة فقرة نقدية بناءة ومعلّلة (Critique constructive) تتناول الشكل والمضمون بأسلوب راقٍ يضمن علامة ممتازة على 7 نقاط'
		],
		keywordsAr: ['Compte rendu critique', 'Accroche', 'Résumé objectif', 'Critique constructive', 'BAC LP 7 pts'],
		discover: {
			scenarioAr:
				'في بكالوريا شعبة آداب وفلسفة (7 نقاط للتعبير الكتابي)، يُطلب في الموضوع الأول تحرير Compte rendu critique وليس مجرد Compte rendu objectif! يتميز التقرير النقدي بإضافة فقرة ثالثة تقويمية (la critique) تعبّر فيها برأي معلّل حول قيمة النص وأسلوبه ووضوحه.',
			svg: svgFrenchWritingBlueprint({
				title: 'Architecture du Compte Rendu Critique (BAC LP — 7 pts)',
				steps: [
					{
						stage: '1. Accroche',
						detail: 'Titre, auteur, source, type, thème et visée communicative'
					},
					{
						stage: '2. Résumé objectif',
						detail: 'Idées essentielles reformulées à la 3e pers. (L’auteur montre que...)'
					},
					{
						stage: '3. Critique constructive',
						detail: 'Jugement argumenté : richesse historique, clarté, objectivité, portée'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما العناصر الستة التي لا بد من ذكرها في فقرة التقديم (L’accroche)؟',
					hintAr: 'تذكر البطاقة الفنية للنص: من كتب؟ ماذا؟ أين؟ ما نوعه؟ عمّ يتحدث؟ ولماذا؟',
					expectedInput: 'النوع، العنوان، الكاتب، المصدر/التاريخ، الموضوع العام، والغاية التواصلية',
					revealAr: 'في 3 أو 4 أسطر ندمج: Ce texte historique intitulé « ... », écrit par ..., extrait de ..., traite de ... dans le but d’informer / rendre hommage...'
				},
				{
					promptAr: 'ما الضمير والأفعال التي نستخدمها في الفقرة الثانية (التلخيص الموضوعي)؟',
					hintAr: 'نبتعد عن « je » وننسب الأفكار لصاحب النص.',
					expectedInput: 'ضمير الغائب (L’auteur / Il) مع أفعال التقرير (explique, souligne, rappelle, conclut)',
					revealAr: 'في التلخيص نستعمل الغائب والمضارع: L’auteur commence par rappeler que..., ensuite il souligne que..., enfin il conclut que... مع إعادة الصياغة دون نسخ حرفي!'
				},
				{
					promptAr: 'ما الذي نُقيّمه في الفقرة الثالثة (La critique) لكي تكون نقداً حقيقياً لا مجرد جملة « Ce texte est bien »؟',
					hintAr: 'نقيّم المضمون (الأفكار، التوثيق، الأهمية) والشكل (الأسلوب، وضوح اللغة، الموضوعية).',
					expectedInput: 'تقييم المضمون (ثراء الوقائع والشهادات) والشكل (سلاسة الأسلوب ووضوح البناء) مع تعليل وإضافة لمسة شخصية متزنة',
					revealAr: 'نستعمل عبارات راقية: À mon avis, ce document revêt une grande valeur historique car... Sur le plan stylistique, l’auteur utilise un lexique précis et accessible. Toutefois, on aurait souhaité davantage de détails sur...'
				}
			]
		},
		summary: {
			rulesAr: [
				'الفقرة 1 — التقديم (Introduction / Accroche): فقرة موجزة مترابطة تتضمن نوع النص، العنوان، اسم الكاتب، المصدر، الموضوع العام، والغاية التواصلية (visée).',
				'الفقرة 2 — العرض الموضوعي (Développement / Résumé): إعادة صياغة الأفكار الرئيسية للنص (حوالي ثلث طول النص الأصلي) باستعمال ضمير الغائب (L’auteur, l’historien)، وزمن المضارع، والروابط المنطقية (D’abord, Ensuite, Par ailleurs, Enfin)، مع حذف الأمثلة الثانوية والتكرار.',
				'الفقرة 3 — النقد البنّاء (Partie critique — سر التميز في آداب وفلسفة): إبداء رأي شخصي معلّل (À mon avis / Pour ma part) يتناول جانبين: قيمة المضمون (ثراء المعلومات، صدق الشهادات، حفظ الذاكرة) وجودة الشكل (وضوح الأسلوب، التنظيم الزمني، درجة الموضوعية)، ويمكن إضافة ملاحظة لطيفة مقترَحة (Toutefois, il aurait été intéressant d’ajouter...).',
				'محظورات التقرير النقدي: ممنوع النسخ الحرفي لفقرات النص (recopiage)، وممنوع استعمال « je » داخل فقرة التلخيص (يُسمح بها فقط في الفقرة النقدية الأخيرة!).'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Boîte à outils du Compte Rendu Critique',
				rootLabel: 'Verbes et formules clés',
				rootSub: 'À maîtriser pour obtenir 6 à 7/7 au BAC LP',
				branches: [
					{
						label: 'Pour présenter',
						rule: 'Ce texte historique intitulé...',
						example: 'vise à informer et commémorer.'
					},
					{
						label: 'Pour résumer',
						rule: 'rappelle, explique, précise',
						example: 'Ensuite, l’auteur souligne que...'
					},
					{
						label: 'Pour critiquer (+)',
						rule: 'style clair, riche en dates',
						example: 'Ce texte réussit à éclairer...'
					},
					{
						label: 'Pour nuancer',
						rule: 'Toutefois, on aurait souhaité...',
						example: 'un témoignage direct en plus.'
					}
				]
			}),
			visualCaptionAr: 'صندوق العبارات الجاهزة لصياغة تقرير نقدي متكامل في بكالوريا آداب وفلسفة.',
			examples: [
				{
					problemAr: 'Rédigez une accroche modèle pour un texte d’Abou El-Kacem Saadallah intitulé « La presse réformiste en Algérie ».',
					solutionAr: 'Ce texte historique intitulé « La presse réformiste en Algérie », rédigé par l’historien Abou El-Kacem Saadallah, met en lumière le rôle éducatif des journaux de l’Association des Oulémas dans le but d’informer les lecteurs et de valoriser ce patrimoine intellectuel.'
				},
				{
					problemAr: 'Comment passer de la 1re idée à la 2e idée dans le résumé ?',
					solutionAr: '« Dans un premier temps, l’historien rappelle que... Par la suite, il démontre que... »'
				},
				{
					problemAr: 'Formulez une phrase de critique constructive nuancée sur le fond et la forme.',
					solutionAr: '« À mon sens, ce texte mérite d’être lu pour la précision de ses repères chronologiques et la clarté de son style. Toutefois, l’insertion d’un extrait de journal d’époque aurait rendu l’exposé encore plus vivant. »'
				}
			],
			watchOutAr: 'في التقرير النقدي، لا تخلط الرأي الشخصي مع التلخيص! اجعل التلخيص في الفقرة الثانية موضوعياً تماماً بضمير الغائب، وخصّص الفقرة الثالثة فقط للتقويم والنقد الشخصي.'
		},
		practice: [
			{
				questionAr: 'Quelle partie distingue le « compte rendu critique » (BAC LP/LE) du simple « compte rendu objectif » ?',
				options: [
					'La recopie intégrale du dernier paragraphe',
					'L’ajout d’une troisième partie contenant une évaluation argumentée du fond et de la forme',
					'La suppression du titre et du nom de l’auteur',
					'L’emploi exclusif du passé simple dans tout le devoir'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: النسخ الحرفي مرفوض تماماً في التقرير.',
					'ممتاز: التقرير النقدي يضيف فقرة نقدية معللة تقيّم المضمون والأسلوب.',
					'خطأ: العنوان والكاتب عنصران أساسيان في المقدمة.',
					'خطأ: يُكتب التقرير النقدي بزمن المضارع (présent).'
				],
				explanationAr: 'يتميز التقرير النقدي بفقرته الثالثة التي يقيّم فيها المترشح قيمة النص ومضمونه وأسلوبه بحجج واضحة.'
			},
			{
				questionAr: 'Dans quelle partie du compte rendu critique le candidat est-il autorisé à utiliser « À mon avis » ou « Pour ma part » ?',
				options: [
					'Uniquement dans la troisième partie (la critique)',
					'Au milieu de chaque phrase du résumé objectif',
					'À la place du titre du texte source',
					'Nulle part dans le compte rendu critique'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: يظل التلخيص موضوعياً، ويظهر الرأي الشخصي فقط في الفقرة النقدية الثالثة.',
					'خطأ: يجب ألا يتدخل الكاتب برأيه داخل فقرة التلخيص.',
					'خطأ: لا يحل الرأي محل التقديم الفني للنص.',
					'خطأ: الرأي المعلل مطلوب صراحة في الفقرة النقدية.'
				],
				explanationAr: 'نلتزم بالحياد وضمير الغائب في التلخيص، ثم نعبّر عن التقييم الشخصي في الفقرة النقدية.'
			},
			{
				questionAr: 'Quel temps verbal privilégie-t-on pour rédiger le résumé dans un compte rendu critique ?',
				options: [
					'Le futur antérieur',
					'L’impératif présent',
					'Le présent de l’indicatif',
					'Le plus-que-parfait exclusivement'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: المستقبل الأسبق لا يناسب التقرير.',
					'خطأ: الأمر لا يُستعمل في التقرير.',
					'صحيح: يُكتب التقرير النقدي بالمضارع (L’auteur explique, démontre, souligne).',
					'خطأ: لا يُستخدم الماضي الأسبق وحده في التقرير.'
				],
				explanationAr: 'المضارع (présent de l’indicatif) هو الزمن المعتمد في التقرير الموضوعي والنقدي.'
			},
			{
				questionAr: 'Laquelle de ces formulations est une véritable critique constructive pour un texte historique ?',
				options: [
					'Ce texte est super et j’aime bien.',
					'Le texte a trois paragraphes et vingt lignes.',
					'Je n’ai rien à ajouter sur ce texte.',
					'Ce texte est instructif grâce à ses repères précis et son style fluide, même si un témoignage direct l’aurait enrichi.'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: عبارة سطحية وعامية غير معلّلة.',
					'خطأ: هذا وصف كمّي شكلي لا يتضمن تقويماً.',
					'خطأ: غياب التقييم يفقدك نقاط النقد.',
					'أحسنت: تقويم راقٍ يجمع بين المضمون والأسلوب مع ملاحظة بناءة ومعللة.'
				],
				explanationAr: 'النقد البناء يعلّل الحكم بمؤشرات من المضمون (دقة المعطيات) والشكل (وضوح الأسلوب) ويقترح إضافة وجيهة.'
			},
			{
				questionAr: 'Que doit absolument éviter le candidat lors de la rédaction du résumé dans le compte rendu critique ?',
				options: [
					'Recopier mot à mot des phrases entières du texte original',
					'Employer des verbes rapporteurs comme « souligne » ou « explique »',
					'Utiliser des articulateurs logiques comme « d’abord » et « ensuite »',
					'Reformuler les idées essentielles dans son propre style'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: النسخ الحرفي (le recopiage) يُضعف العلامة؛ المطلوب هو إعادة الصياغة.',
					'خطأ: أفعال التقرير ضرورية لنسبة الأفكار للكاتب.',
					'خطأ: الروابط المنطقية أساسية لتماسك التقرير.',
					'خطأ: إعادة الصياغة هي المهارة المطلوبة أساساً.'
				],
				explanationAr: 'إعادة الصياغة الشخصية للأفكار الأساسية دون نسخ حرفي هي المعيار الأهم في تقييم التقرير.'
			}
		]
	}
];
