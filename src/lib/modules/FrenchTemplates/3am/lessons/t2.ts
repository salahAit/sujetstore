import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWordFormation,
	svgFrenchWritingBlueprint
} from '../../svg-french';

export const LESSONS_3AM_T2: FrenchInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// 1. Temps du récit historique & connecteurs chronologiques
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_3am_t2_temps_recit_historique',
		slug: 'fre-3am-t2-temps-recit-historique',
		grade: '3am',
		yearSubjectId: 635,
		trimesterId: 't2',
		sequenceId: 'proj2',
		sequenceTitleAr: 'المشروع الثاني: القصة التاريخية والذاكرة الوطنية (Le récit historique et la mémoire nationale)',
		order: 1,
		titleAr: 'أزمنة القصة التاريخية والروابط الزمنية (Imparfait, passé simple, plus-que-parfait et connecteurs)',
		objectives: [
			'التمييز بين دور الماضي الناقص (Imparfait) والماضي البسيط (Passé simple) والماضي الأسبق (Plus-que-parfait) في النص التاريخي',
			'استعمال الروابط والمؤشرات الزمنية (d’abord, ensuite, le 1er novembre 1954, enfin) لترتيب أحداث تاريخ الجزائر'
		],
		keywordsAr: ['récit historique', 'imparfait', 'passé simple', 'plus-que-parfait', 'connecteurs chronologiques'],
		discover: {
			scenarioAr:
				'اقرأ هذا المقطع التاريخي: « En 1954, le peuple algérien souffrait sous le joug colonial. Après qu’ils avaient soigneusement préparé le plan, les chefs révolutionnaires déclenchèrent la Guerre de Libération le 1er Novembre 1954. » لاحظ تداخل ثلاثة أزمنة ماضية في جملتين!',
			svg: svgFrenchTenseTimeline({
				title: 'Articulation des temps dans le récit historique',
				tenseName: 'Plus-que-parfait -> Imparfait / Passé simple',
				formula: 'Antériorité (PQP) + Décor (Imparfait) + Action brève (Passé simple)',
				activeZone: 'two_past',
				example: 'Ils avaient préparé le plan ; la nuit était calme quand l’appel retentit.',
				markers: 'Le 1er Novembre 1954, d’abord, ensuite, soudain, finalement'
			}),
			steps: [
				{
					promptAr: 'ما زمن الفعل (souffrait)؟ وما دوره في المشهد التاريخي؟',
					hintAr: 'نهايته (-ait) ويصف حالة ممتدة في الماضي.',
					expectedInput: 'Imparfait — لوصف الوضع والحالة الممتدة في الماضي',
					revealAr: 'الماضي الناقص (Imparfait) يُستعمل لوصف الإطار العام والمشاعر والأحداث المستمرة أو المتكررة في الماضي.'
				},
				{
					promptAr: 'ما زمن الفعل (déclenchèrent)؟ ولماذا لم نكتبه في الماضي الناقص؟',
					hintAr: 'إنه حدث تاريخي رئيسي مفاجئ ومحدّد بتاريخ دقيق.',
					expectedInput: 'Passé simple — للتعبير عن حدث رئيسي مكتمل ومحدّد زمنياً',
					revealAr: 'الماضي البسيط (Passé simple) هو زمن الأحداث البارزة المتعاقبة التي تصنع التاريخ (déclenchèrent, combattit, fonda).'
				},
				{
					promptAr: 'ما زمن الفعل (avaient préparé)؟ ولماذا سبق حدث الاندلاع؟',
					hintAr: 'مساعد في Imparfait + اسم المفعول.',
					expectedInput: 'Plus-que-parfait — يدلّ على حدث أسبق وقع قبل حدث ماضٍ آخر',
					revealAr: 'أحسنت! الـ Plus-que-parfait (avoir/être à l’imparfait + P.P) يعبّر عن الأسبقية (antériorité) في الماضي.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الماضي الناقص (L’imparfait : -ais, -ais, -ait, -ions, -iez, -aient): لوصف الخلفية التاريخية، الأماكن، الشخصيات، والعادات المستمرة.',
				'الماضي البسيط (Le passé simple): للأحداث التاريخية الرئيسية المحدّدة. نهايات الفوج الأول (-er): -ai, -as, -a, -âmes, -âtes, -èrent (مثل: il fonda, ils luttèrent). الفوج الثاني (-ir): -is, -is, -it, -îmes, -îtes, -irent (مثل: il choisit, ils unirent).',
				'الماضي الأسبق (Le plus-que-parfait = avoir/être à l’imparfait + P.P): يعبر عن فعل وقع واكتمل قبل فعل آخر في الماضي (مثل: Larbi Ben M’hidi avait organisé le réseau avant son arrestation).',
				'الروابط والمؤشرات الزمنية (Les connecteurs chronologiques): تحدّد تسلسل التاريخ بوضوح: Le 5 mai 1931، Le 1er Novembre 1954، d’abord، puis، ensuite، quelques années plus tard، enfin، le 5 juillet 1962.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Les 3 temps clés du récit historique (3AM)',
				subtitle: '3e personne du singulier et du pluriel (les plus fréquentes au brevet)',
				columns: [
					{
						header: 'Imparfait (Décor)',
						rule: 'Description / durée',
						examples: 'il luttait / ils résistaient',
						color: '#1d4ed8'
					},
					{
						header: 'Passé simple (Action)',
						rule: 'Fait historique clé',
						examples: 'il fonda / ils unirent / il fut',
						color: '#047857'
					},
					{
						header: 'Plus-que-parfait',
						rule: 'Action antérieure',
						examples: 'il avait préparé / ils étaient venus',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'التكامل بين الأزمنة الثلاثة الرئيسية في القصة التاريخية للثالثة متوسط',
			examples: [
				{
					problemAr: 'صرّف الفعلين بين قوسين في Imparfait و Passé simple: « Les montagnes des Aurès (être) ...... enneigées quand les moudjahidine (lancer) ...... l’offensive. »',
					solutionAr: 'étaient (imparfait — وصف الطبيعة) | lancèrent (passé simple — الحدث الرئيسي المفاجئ).'
				},
				{
					problemAr: 'صرّف الفعل في Plus-que-parfait: « Cheikh Ben Badis (ouvrir) ...... de nombreuses écoles avant 1940. »',
					solutionAr: 'avait ouvert.'
				}
			],
			watchOutAr:
				'احفظ جيداً تصريف الأفعال الشاذة الأكثر وروداً في الـ Passé simple مع ضمير الغائب: être (il fut / ils furent)، avoir (il eut / ils eurent)، faire (il fit / ils firent)، prendre (il prit / ils prirent)، venir (il vint / ils vinrent)، pouvoir (il put / ils purent).'
		},
		practice: [
			{
				questionAr: 'ما التصريف الصحيح للفعل (fonder) في الـ Passé simple في الجملة: « En 1931, Cheikh Abdelhamid Ben Badis ...... l’Association des Oulémas Musulmans Algériens. »؟',
				options: ['fondait', 'fonda', 'fonderait', 'avait fondé'],
				correctIndex: 1,
				diagnosticFeedback: [
					'fondait في الماضي الناقص، وهنا لدينا تاريخ محدد وحدث رئيسي.',
					'ممتاز! الفوج الأول مع il في الـ Passé simple يأخذ النهاية (-a): fonda.',
					'fonderait في الشرطي الحاضر.',
					'هنا الحدث الرئيسي لا يحتاج إلى أسبقية Plus-que-parfait.'
				],
				explanationAr: 'الحدث محدّد بسنة 1931 والفعل من الفوج الأول، فتصريفه في Passé simple مع il هو: fonda.'
			},
			{
				questionAr: 'اختر الزمن المناسب للوصف في الجملة: « Durant l’occupation, les paysans algériens ...... dans des conditions très difficiles. »',
				options: ['vécurent', 'vivaient', 'vivraient', 'eurent vécu'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الحدث ممتد طوال فترة الاحتلال وليس لحظياً.',
					'أحسنت! الـ Imparfait (vivaient) يصف حالة ممتدة طوال تلك الفترة.',
					'vivraient شرطي حاضر لا يناسب السرد التاريخي.',
					'الماضي الأسبق التام غير مناسب هنا.'
				],
				explanationAr: 'للوصف والحالات الممتدة في الماضي (Durant l’occupation) نستعمل الـ Imparfait.'
			},
			{
				questionAr: 'صرّف الفعل (être) في الـ Passé simple: « Didouche Mourad et Larbi Ben M’hidi ...... parmi les dirigeants du 1er Novembre 1954. »',
				options: ['étaient', 'furent', 'sont', 'seront'],
				correctIndex: 1,
				diagnosticFeedback: [
					'étaient في الـ Imparfait وليس الـ Passé simple.',
					'ممتاز! être في الـ Passé simple مع ils هو: furent.',
					'sont في الحاضر.',
					'seront في المستقبل.'
				],
				explanationAr: 'تصريف être في الماضي البسيط مع الضمير ils هو: ils furent.'
			},
			{
				questionAr: 'ما زمن الفعل المسطّر في الجملة: « Les moudjahidine exécutèrent le plan qu’ils avaient tracé dans les Aurès. »؟',
				options: ['Passé composé', 'Imparfait', 'Plus-que-parfait', 'Passé simple'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الماضي المركب يستعمل ont tracé وليس avaient tracé.',
					'الماضي الناقص فعل بسيط مثل traçaient.',
					'صحيح! avaient tracé هو Plus-que-parfait للدلالة على أن وضع الخطة سبق تنفيذها.',
					'Passé simple هو exécutèrent وليس avaient tracé.'
				],
				explanationAr: 'يتكوّن الـ Plus-que-parfait من المساعد في الـ Imparfait (avaient) + اسم المفعول (tracé).'
			},
			{
				questionAr: 'اختر التصريف الصحيح للفعل (combattre / réussir) في Passé simple مع (ils): « Les héros algériens ...... avec courage et ...... à libérer la patrie. »',
				options: [
					'combattirent / réussirent',
					'combattaient / réussissaient',
					'combattèrent / réussèrent',
					'ont combattu / ont réussi'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! combattre يعطي combattirent و réussir (فوج 2) يعطي réussirent.',
					'هذه صيغ الماضي الناقص (Imparfait).',
					'نهاية -èrent خاصة بأفعال الفوج الأول (-er) فقط.',
					'هذه صيغ الماضي المركّب (Passé composé).'
				],
				explanationAr: 'في الـ Passé simple مع ils: combattre يعطي combattirent، و réussir يعطي réussirent.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 2. Les substituts lexicaux et grammaticaux
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_3am_t2_substituts_lexicaux_grammaticaux',
		slug: 'fre-3am-t2-substituts-lexicaux-grammaticaux',
		grade: '3am',
		yearSubjectId: 635,
		trimesterId: 't2',
		sequenceId: 'proj2',
		sequenceTitleAr: 'المشروع الثاني: القصة التاريخية والذاكرة الوطنية (Le récit historique et la mémoire nationale)',
		order: 2,
		titleAr: 'البدائل اللغوية والنحوية لتفادي التكرار (Les substituts lexicaux et grammaticaux)',
		objectives: [
			'التمييز بين البدائل النحوية (Les substituts grammaticaux : pronoms) والبدائل المعجمية (Les substituts lexicaux : synonymes, périphrases)',
			'تحديد الاسم الذي يعود عليه الضمير المسطّر في النص وتوظيف البدائل لتحسين الفقرة التاريخية'
		],
		keywordsAr: ['substituts grammaticaux', 'substituts lexicaux', 'pronoms', 'périphrase', 'éviter la répétition'],
		discover: {
			scenarioAr:
				'اقرأ الفقرة عن الشهيد العربي بن مهيدي: « Larbi Ben M’hidi naquit en 1923 près d’Aïn M’lila. Ce stratège courageux organisa la lutte dans l’Oranie puis à Alger. Il affronta l’ennemi avec calme et dignité. Son souvenir reste vivant dans le cœur des Algériens. » كم عبارة عوضت اسم (Larbi Ben M’hidi) دون تكراره؟',
			svg: svgFrenchGrammarMap({
				title: 'Les deux familles de substituts (3AM)',
				rootLabel: 'Éviter la répétition dans le récit historique',
				rootSub: 'Ex. : Remplacer « Cheikh Abdelhamid Ben Badis »',
				branches: [
					{
						label: 'Substituts grammaticaux',
						rule: 'Pronoms personnels, relatifs, possessifs',
						example: 'il, lui, qui, son, ses, le',
						color: '#1d4ed8'
					},
					{
						label: 'Substituts lexicaux',
						rule: 'Synonymes, termes génériques, périphrases',
						example: 'le savant, le réformateur, cet érudit',
						color: '#047857'
					},
					{
						label: 'Rôle dans le texte',
						rule: 'Assurer la cohérence et enrichir',
						example: 'Précise les qualités du héros',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الكلمتان النحويتان (Substituts grammaticaux) اللتان عوّضتا (Larbi Ben M’hidi) في الفقرة؟',
					hintAr: 'ضمير فاعل وصفة ملكية.',
					expectedInput: 'Il / Son',
					revealAr: 'الضمائر الشخصية (il, elle, ils, le, la, lui, leur) وصفات وضمائر الملكية والإشارة (son, sa, celui-ci, qui) هي بدائل نحوية.'
				},
				{
					promptAr: 'ما العبارة المعجمية (Substitut lexical) التي عوّضت (Larbi Ben M’hidi) في الجملة الثانية؟',
					hintAr: 'تبدأ باسم الإشارة (Ce...).',
					expectedInput: 'Ce stratège courageux',
					revealAr: 'أحسنت! البديل المعجمي (Ce stratège courageux) لا يمنع التكرار فحسب، بل يضيف معلومة جديدة عن شجاعة الشهيد وذكائه العسكري.'
				},
				{
					promptAr: 'كيف تجيب بدقة عن سؤال الفهم الشائع: « À qui renvoie le pronom souligné dans le texte ? »؟',
					hintAr: 'تقرأ الجملة السابقة وتتحقق من التذكير والتأنيث والإفراد والجمع.',
					expectedInput: 'أطابق النوع والعدد مع الاسم السابق مباشرة ثم أتحقق من المعنى',
					revealAr: 'ممتاز! دائماً طابق النوع والعدد (مذكر/مؤنث، مفرد/جمع) مع أقرب اسم مناسب في المعنى.'
				}
			]
		},
		summary: {
			rulesAr: [
				'البدائل النحوية (Les substituts grammaticaux): تشمل الضمائر الشخصية (il, elle, ils, elles, le, la, les, lui, leur, en, y)، ضمائر الوصل (qui, que, dont, où)، ضمائر الإشارة (celui-ci, celle-ci, ceux-ci)، وصفات الملكية (son, sa, ses, leur).',
				'البدائل المعجمية (Les substituts lexicaux): تشمل المرادفات (héros / combattant)، الكلمات الأشمل (l’Algérie -> ce grand pays)، والتعابير الوصفية / الـ périphrases (Cheikh Ben Badis -> le fondateur de l’Association des Oulémas).',
				'وظيفة البدائل في النص التاريخي: 1) تفادي التكرار الممل (éviter la répétition)، 2) ضمان ترابط الجمل (assurer la cohérence textuelle)، 3) إبراز صفات البطل التاريخي.',
				'للإجابة عن سؤال « Que remplace le mot souligné ? »: نكتب الاسم الكامل الدقيق (مثال: Le pronom « ils » renvoie aux moudjahidine des Aurès).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Exemples de substituts pour les figures algériennes',
				subtitle: 'À réinvestir dans la compréhension et la production écrite',
				columns: [
					{
						header: 'Larbi Ben M’hidi',
						rule: 'Gramm. / Lexical',
						examples: 'il, lui / ce stratège, le martyr',
						color: '#1d4ed8'
					},
					{
						header: 'Cheikh Ben Badis',
						rule: 'Gramm. / Lexical',
						examples: 'il, son / l’érudit, le réformateur',
						color: '#047857'
					},
					{
						header: 'Hassiba Ben Bouali',
						rule: 'Gramm. / Lexical',
						examples: 'elle, la / cette héroïne, la jeune patriote',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'نماذج جاهزة من البدائل النحوية والمعجمية لتوظيفها في نصوص الذاكرة الوطنية',
			examples: [
				{
					problemAr: 'استبدل الاسم المكرر ببديل معجمي ثم ببديل نحوي: « Didouche Mourad aimait sa patrie. Didouche Mourad mourut au champ d’honneur en 1955. »',
					solutionAr: 'Didouche Mourad aimait sa patrie. Ce jeune chef courageux (أو Il) mourut au champ d’honneur en 1955.'
				},
				{
					problemAr: 'صنّف البدائل في الجملة: « L’Algérie résista longtemps ; ce pays fier arracha enfin son indépendance. »',
					solutionAr: 'Substitut lexical : ce pays fier | Substitut grammatical : son (déterminant possessif).'
				}
			],
			watchOutAr:
				'احذر الخلط في الجدول بين (Substitut lexical = اسم أو عبارة اسمية مثل le héros, ce savant) وبين (Substitut grammatical = ضمير مثل il, elle, qui, eux, lui)!'
		},
		practice: [
			{
				questionAr: 'في الجملة: « Cheikh Mohamed Bachir El-Ibrahimi rédigea de brillants articles ; cet éminent savant défendit la langue arabe. » ما نوع البديل (cet éminent savant)؟',
				options: ['Substitut grammatical', 'Substitut lexical', 'Connecteur chronologique', 'Verbe introducteur'],
				correctIndex: 1,
				diagnosticFeedback: [
					'البديل النحوي يكون ضميراً مثل il أو lui.',
					'ممتاز! (cet éminent savant) عبارة اسمية تعوّض الاسم، فهي بديل معجمي (Substitut lexical).',
					'لا يدل على الترتيب الزمني.',
					'ليس فعلاً.'
				],
				explanationAr: 'العبارة الاسمية الوصفية (cet éminent savant) هي بديل معجمي (Substitut lexical).'
			},
			{
				questionAr: 'على من يعود الضمير (leur) في الجملة: « Les enseignants de l’Association des Oulémas accueillaient les enfants et leur enseignaient l’histoire nationale. »؟',
				options: ['Les enseignants', 'L’Association des Oulémas', 'Les enfants', 'L’histoire nationale'],
				correctIndex: 2,
				diagnosticFeedback: [
					'المعلمون هم الفاعل، وليسوا المتلقّين للتعليم.',
					'الجمعية مفرد وليست جمعاً.',
					'أحسنت! leur (COI للجمع) يعود على les enfants (يُعلّمونهم).',
					'التاريخ هو الـ COD (المادة المُدرّسة).'
				],
				explanationAr: 'leur ضمير مفعول به غير مباشر للجمع يعود على les enfants.'
			},
			{
				questionAr: 'أيّ قائمة تحتوي على بدائل نحوية (Substituts grammaticaux) فقط؟',
				options: [
					'il, elle, lui, qui, celui-ci',
					'le héros, le martyr, le savant',
					'd’abord, ensuite, enfin',
					'courageux, libre, patriote'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! كلها ضمائر (شخصية، موصولة، وإشارة) أي بدائل نحوية.',
					'هذه أسماء أي بدائل معجمية.',
					'هذه روابط زمنية.',
					'هذه صفات.'
				],
				explanationAr: 'الضمائر بأنواعها (il, elle, lui, qui, celui-ci) تمثّل البدائل النحوية.'
			},
			{
				questionAr: 'اختر البديل المعجمي الأنسب لتفادي تكرار (La Casbah d’Alger) في جملة عن معركة الجزائر:',
				options: ['Cette vieille citadelle', 'Il', 'Eux', 'Leur'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! Cette vieille citadelle بديل معجمي دقيق ومناسب للمؤنث المفرد.',
					'Il ضمير نحوي مذكر.',
					'Eux ضمير نحوي مذكر جمع.',
					'Leur ضمير/محدّد نحوي للجمع.'
				],
				explanationAr: 'القصبة قلعة عريقة، لذا فإن (Cette vieille citadelle) بديل معجمي ملائم تماماً.'
			},
			{
				questionAr: 'ما الهدف الرئيسي من استعمال البدائل اللغوية والنحوية في النص التاريخي؟',
				options: [
					'تطويل الجمل دون فائدة',
					'تفادي التكرار وضمان تماسك النص',
					'تغيير زمن الأفعال إلى المستقبل',
					'إخفاء هوية الشخصيات التاريخية'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'البدائل تختصر النص وتحسّن أسلوبه.',
					'ممتاز! تفادي التكرار (éviter la répétition) وتحقيق الانسجام النصي (cohérence).',
					'البدائل لا تغيّر زمن الأفعال.',
					'البدائل تشير بوضوح إلى الشخصيات وتثري وصفها.'
				],
				explanationAr: 'تستعمل البدائل لتجنّب التكرار وتقوية تماسك الفقرات التاريخية.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 3. Le discours direct et le discours indirect (bases 3AM)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_3am_t2_discours_direct_indirect',
		slug: 'fre-3am-t2-discours-direct-indirect',
		grade: '3am',
		yearSubjectId: 635,
		trimesterId: 't2',
		sequenceId: 'proj2',
		sequenceTitleAr: 'المشروع الثاني: القصة التاريخية والذاكرة الوطنية (Le récit historique et la mémoire nationale)',
		order: 3,
		titleAr: 'الخطاب المباشر وغير المباشر — الأساسيات (Le discours direct et le discours indirect)',
		objectives: [
			'التعرّف إلى علامات الخطاب المباشر (النقطتان، المزدوجتان، أفعال القول) في الشهادات التاريخية',
			'تحويل جملة خبرية أو استفهامية أو أمرية بسيطة من الخطاب المباشر إلى غير المباشر مع فعل قول في الحاضر'
		],
		keywordsAr: ['discours direct', 'discours indirect', 'verbe introducteur', 'que', 'si', 'de + infinitif'],
		discover: {
			scenarioAr:
				'قارن بين نقل شهادة تاريخية بطريقتين: 1) Un ancien moudjahid déclare : « Je n’oublierai jamais le courage de nos compagnons. » (Discours direct) | 2) Un ancien moudjahid déclare qu’il n’oubliera jamais le courage de ses compagnons. (Discours indirect). ما التغييرات التي طرأت؟',
			svg: svgFrenchGrammarMap({
				title: 'Passer du Discours Direct au Discours Indirect (3AM)',
				rootLabel: 'Verbe introducteur au présent (dit, déclare, demande)',
				rootSub: 'Supprimer (: « »), ajouter le mot subordonnant, changer les pronoms',
				branches: [
					{
						label: 'Phrase déclarative',
						rule: 'Ajouter « que / qu’ »',
						example: 'Il dit qu’il défend sa patrie.',
						color: '#1d4ed8'
					},
					{
						label: 'Question (Oui/Non)',
						rule: 'Ajouter « si » (supprimer ?)',
						example: 'Il demande si tu connais cette date.',
						color: '#047857'
					},
					{
						label: 'Phrase impérative',
						rule: 'Ajouter « de + infinitif »',
						example: 'Il nous conseille de respecter l’histoire.',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما علامات الترقيم التي حذفناها عند الانتقال إلى الخطاب غير المباشر؟',
					hintAr: 'انظر حول جملة المقاتل في المثال الأول.',
					expectedInput: 'النقطتان (:) والمزدوجتان (« »)',
					revealAr: 'في الخطاب غير المباشر نحذف النقطتين (:) والمزدوجتين (« ») وعلامتي الاستفهام والتعجب (? !).'
				},
				{
					promptAr: 'ما الأداة التي استعملناها للربط بعد الفعل (déclare)؟ وكيف تحوّل (Je) و (nos)؟',
					hintAr: 'قبل حرف علة (il) تصبح que -> qu’.',
					expectedInput: 'qu’، وتحوّلت Je إلى il و nos إلى ses',
					revealAr: 'ممتاز! مع الجملة الخبرية نربط بـ (que / qu’)، ونغيّر الضمائر وصفات الملكية حسب المتكلم.'
				},
				{
					promptAr: 'هل تغيّر زمن الفعل (oubliera) عندما كان فعل القول (déclare) في الحاضر؟',
					hintAr: 'قارن بين n’oublierai و n’oubliera.',
					expectedInput: 'لا، بقي الفعل في نفس الزمن (المستقبل) مع تغيير الشخص فقط',
					revealAr: 'قاعدة ذهبية في 3AM: عندما يكون فعل القول (verbe introducteur) في الحاضر (dit, affirme, demande)، لا يتغيّر زمن الفعل داخل الكلام المنقول!'
				}
			]
		},
		summary: {
			rulesAr: [
				'الخطاب المباشر (Discours direct): ينقل الكلام حرفياً كما قيل، ويتميّز بوجود فعل قول (dire, déclarer, affirmer, témoigner, demander) + نقطتين (:) + مزدوجتين (« ... »).',
				'تحويل الجملة الخبرية (Déclarative): نحذف (: « ») ونربط بـ (que / qu’) مع تغيير الضمائر. مثال: Le professeur explique : « Je prépare une leçon sur Ben Badis. » تصبح: Le professeur explique qu’il prépare une leçon sur Ben Badis.',
				'تحويل السؤال الكلي (Est-ce que / inversion): نربط بـ (si) ونحذف (est-ce que) وعلامة الاستفهام (?). مثال: Il demande : « Connais-tu Didouche Mourad ? » تصبح: Il demande si je connais Didouche Mourad.',
				'تحويل الأمر (Impérative): نحوّل فعل الأمر إلى (de + infinitif). مثال: Le grand-père nous dit : « Préservez la mémoire des martyrs ! » تصبح: Le grand-père nous dit de préserver la mémoire des martyrs.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Changements clés au Discours Indirect (Verbe au présent)',
				subtitle: 'Choisir le bon outil de liaison selon le type de phrase',
				columns: [
					{
						header: 'Déclarative (.)',
						rule: 'verbe + que / qu’',
						examples: 'affirme que l’Algérie est libre',
						color: '#1d4ed8'
					},
					{
						header: 'Interrogative (?)',
						rule: 'si / ce que / où / quand',
						examples: 'demande si nous avons lu le texte',
						color: '#047857'
					},
					{
						header: 'Impérative (!)',
						rule: 'de / d’ + infinitif',
						examples: 'ordonne de protéger le village',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'الروابط الثلاثة الأساسية للتحويل إلى الخطاب غير المباشر في الثالثة متوسط',
			examples: [
				{
					problemAr: 'حوّل إلى الخطاب غير المباشر: « Le témoin raconte : “Nous étions unis dans le village.” »',
					solutionAr: 'Le témoin raconte qu’ils étaient unis dans le village.'
				},
				{
					problemAr: 'حوّل إلى الخطاب غير المباشر: « L’enseignante demande à l’élève : “As-tu lu la biographie de Larbi Ben M’hidi ?” »',
					solutionAr: 'L’enseignante demande à l’élève s’il a lu la biographie de Larbi Ben M’hidi.'
				}
			],
			watchOutAr:
				'انتبه لقاعدة الإلغاء الصوتي مع (si): تتحول (si) إلى (s’) فقط أمام (il / ils)، فنكتب (s’il) و (s’ils)، ولكن نكتب (si elle) و (si on) بدون حذف حرف i!'
		},
		practice: [
			{
				questionAr: 'حوّل إلى الخطاب غير المباشر: « L’historien affirme : “L’Association des Oulémas a défendu l’identité algérienne.” »',
				options: [
					'L’historien affirme si l’Association des Oulémas a défendu l’identité algérienne.',
					'L’historien affirme que l’Association des Oulémas a défendu l’identité algérienne.',
					'L’historien affirme de défendre l’identité algérienne.',
					'L’historien affirme : que l’Association des Oulémas a défendu l’identité algérienne.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'si تُستعمل للاستفهام وليس للجملة الخبرية.',
					'ممتاز! حذفنا النقطتين والمزدوجتين وربطنا بـ que مع بقاء الزمن كما هو.',
					'de + infinitif خاصة بجملة الأمر.',
					'يجب حذف النقطتين عند التحويل للخطاب غير المباشر.'
				],
				explanationAr: 'الجملة خبرية وفعل القول في الحاضر (affirme)، فنحذف النقطتين والمزدوجتين ونربط بـ que.'
			},
			{
				questionAr: 'حوّل السؤال إلى الخطاب غير المباشر: « Karim me demande : “Est-ce que tu visites le musée du Moudjahid ?” »',
				options: [
					'Karim me demande que je visite le musée du Moudjahid.',
					'Karim me demande si je visite le musée du Moudjahid.',
					'Karim me demande est-ce que je visite le musée du Moudjahid ?',
					'Karim me demande de visiter le musée du Moudjahid.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نربط الاستفهام بـ que.',
					'أحسنت! نحذف est-ce que وعلامة الاستفهام ونربط بـ si مع تحويل tu إلى je.',
					'في الخطاب غير المباشر نحذف est-ce que وعلامة الاستفهام.',
					'de + infinitif خاصة بصيغة الأمر.'
				],
				explanationAr: 'السؤال المبدوء بـ Est-ce que يتحوّل إلى (si) دون علامة استفهام.'
			},
			{
				questionAr: 'حوّل جملة الأمر إلى الخطاب غير المباشر: « Le grand-père conseille à ses petits-enfants : “Aimez votre patrie et servez-la !” »',
				options: [
					'Le grand-père conseille à ses petits-enfants qu’ils aiment votre patrie.',
					'Le grand-père conseille à ses petits-enfants d’aimer leur patrie et de la servir.',
					'Le grand-père conseille à ses petits-enfants si aiment leur patrie.',
					'Le grand-père conseille à ses petits-enfants aimer leur patrie.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'بقيت votre دون تحويل إلى leur.',
					'ممتاز! الأمر يتحول إلى (de / d’ + infinitif) وتحوّلت votre إلى leur.',
					'si للاستفهام وليس للأمر.',
					'ينقصها حرف الجر d’ قبل المصدر.'
				],
				explanationAr: 'جملة الأمر في الخطاب غير المباشر تصبح: de / d’ + infinitif مع تعديل صفة الملكية.'
			},
			{
				questionAr: 'اختر الكتابة الإملائية الصحيحة للجملة المنقولة:',
				options: [
					'Le professeur demande s’elle a fini son exposé.',
					'Le professeur demande si elle a fini son exposé.',
					'Le professeur demande si il a fini son exposé.',
					'Le professeur demande que elle a fini son exposé.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا تحذف i من si أمام elle أبداً.',
					'صحيح! نكتب (si elle) كاملة، بينما نكتب (s’il) مع المذكر.',
					'أمام il يجب كتابة s’il.',
					'هذا سؤال يتطلب si وليس que.'
				],
				explanationAr: 'تُختصر si إلى s’ أمام il و ils فقط، وتبقى كاملة أمام elle (si elle).'
			},
			{
				questionAr: 'ما التحويل الصحيح للجملة: « Mon camarade me demande : “Que lis-tu sur Cheikh Ben Badis ?” »؟',
				options: [
					'Mon camarade me demande que je lis sur Cheikh Ben Badis.',
					'Mon camarade me demande ce que je lis sur Cheikh Ben Badis.',
					'Mon camarade me demande si je lis sur Cheikh Ben Badis.',
					'Mon camarade me demande de lire sur Cheikh Ben Badis.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'أداة الاستفهام Que (ماذا) لا تبقى que بل تصبح ce que.',
					'ممتاز! (Que / Qu’est-ce que) تصبح في الخطاب غير المباشر (ce que).',
					'si تُستعمل فقط للسؤال الذي جوابه نعم أو لا.',
					'الجملة سؤال وليست أمراً.'
				],
				explanationAr: 'في الخطاب غير المباشر، تتحول أداة الاستفهام (Que ? / Qu’est-ce que ?) إلى (ce que).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 4. Le lexique de l’héroïsme, de la résistance et la famille de mots
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_3am_t2_lexique_heroisme_famille',
		slug: 'fre-3am-t2-lexique-heroisme-famille',
		grade: '3am',
		yearSubjectId: 635,
		trimesterId: 't2',
		sequenceId: 'proj2',
		sequenceTitleAr: 'المشروع الثاني: القصة التاريخية والذاكرة الوطنية (Le récit historique et la mémoire nationale)',
		order: 4,
		titleAr: 'معجم البطولة والمقاومة وعائلة الكلمات (Le lexique de l’héroïsme et la famille de mots)',
		objectives: [
			'استخراج الحقل المعجمي للبطولة والمقاومة الوطنية والذاكرة (Champ lexical de l’héroïsme et de la résistance)',
			'بناء عائلة الكلمات (Famille de mots : verbe, nom, adjectif, adverbe) انطلاقاً من الجذر المشترك'
		],
		keywordsAr: ['champ lexical', 'héroïsme', 'résistance', 'famille de mots', 'radical'],
		discover: {
			scenarioAr:
				'تأمّل الكلمات الأربع المستخرجة من نص عن 1 نوفمبر 1954: « libérer — la libération — libre — librement ». ثم قارنها بالمجموعة: « courage, sacrifice, patrie, martyr, indépendance ». ما الفرق بين (Famille de mots) و (Champ lexical)؟',
			svg: svgFrenchWordFormation({
				title: 'Construction d’une famille de mots (Résistance)',
				prefix: 'in-',
				root: 'dépend',
				suffix: '-ance',
				derivedWord: 'indépendance',
				meaningNote: 'Même radical (dépend-) : dépendre, indépendant, indépendance'
			}),
			steps: [
				{
					promptAr: 'ما الجذر المشترك (Le radical) بين الكلمات: (libérer, libération, libre, librement)؟',
					hintAr: 'الحروف الأولى المتكررة في كل كلمة.',
					expectedInput: 'libr- / libér-',
					revealAr: 'الكلمات التي تشترك في نفس الجذر والمعنى العام تُكوّن عائلة كلمات واحدة (une famille de mots).'
				},
				{
					promptAr: 'هل تشترك كلمات (courage, sacrifice, martyr, patrie) في نفس الجذر؟ وما الذي يجمعها؟',
					hintAr: 'تأمّل معناها العام وموضوعها.',
					expectedInput: 'لا تشترك في الجذر، بل يجمعها موضوع واحد هو البطولة والوطنية (Champ lexical)',
					revealAr: 'أحسنت! الحقل المعجمي (Le champ lexical) هو مجموعة كلمات تنتمي إلى نفس الموضوع، ولا يُشترط فيها نفس الجذر.'
				},
				{
					promptAr: 'أعطِ الاسم والصفة من الفعل (résister) ومن الفعل (courage / encourager).',
					hintAr: 'résister يعطي résistance و résistant.',
					expectedInput: 'résister -> résistance / résistant | courage -> courageux / courageusement',
					revealAr: 'ممتاز! إتقان التحويل بين الفعل والاسم والصفة يضمن لك نقاط أسئلة المعجم في الاختبار.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الحقل المعجمي (Le champ lexical): مجموعة من الكلمات (أسماء، أفعال، صفات) ترتبط بموضوع واحد، مثل الحقل المعجمي للمقاومة والبطولة: héros, martyr, moudjahid, courage, bravoure, patrie, liberté, indépendance, combattre, résister, se sacrifier.',
				'عائلة الكلمات (La famille de mots): كلمات مشتقة من نفس الجذر (radical) بإضافة سوابق (préfixes) أو لواحق (suffixes).',
				'عائلات كلمات أساسية في المشروع الثاني 3AM: 1) libérer / libération / liberté / libre / librement | 2) résister / résistance / résistant | 3) héroïsme / héros / héroïne / héroïque | 4) patrie / patriote / patriotisme / patriotique | 5) histoire / historien / historique.',
				'ملاحظة مهمة حول المتضادات (Antonymes): نكوّن الضد أحياناً بسابقة مثل: justice / injustice، dépendant / indépendant، oubli / mémoire.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Champ lexical vs Famille de mots (3AM)',
				rootLabel: 'Ne jamais confondre les deux notions à l’examen !',
				rootSub: 'Sens commun (Champ lexical) vs Radical commun (Famille de mots)',
				branches: [
					{
						label: 'Champ lexical',
						rule: 'Même thème (Guerre / Mémoire)',
						example: 'martyr, combat, liberté, patrie',
						color: '#1d4ed8'
					},
					{
						label: 'Famille de mots',
						rule: 'Même radical + affixes',
						example: 'patrie, patriote, patriotique',
						color: '#047857'
					},
					{
						label: 'Synonymes clés',
						rule: 'Sens proche (héroïsme)',
						example: 'courage = bravoure | lutte = combat',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'التمييز الدقيق بين الحقل المعجمي وعائلة الكلمات في أسئلة فهم النص ولغة النص',
			examples: [
				{
					problemAr: 'استخرج الكلمة الدخيلة (l’intrus) من العائلة: « terre — territoire — terrestre — terrible — enterrer ».',
					solutionAr: 'الكلمة الدخيلة هي (terrible) لأنها تعني (مخيف/رهيب) ولا ترتبط بمعنى الأرض (terre).'
				},
				{
					problemAr: 'أكمل الجدول: الفعل (lutter) / الاسم (......) | الفعل (sacrifier) / الاسم (......).',
					solutionAr: 'lutter -> la lutte | sacrifier -> le sacrifice.'
				}
			],
			watchOutAr:
				'في سؤال (Trouve l’intrus dans la famille de mots)، لا تكتفِ بالنظر إلى الحروف المتشابهة، بل تحقّق من المعنى! مثلاً (terrible) لا تنتمي لعائلة (terre)، و (courrier) لا تنتمي لعائلة (courage)!'
		},
		practice: [
			{
				questionAr: 'ما الكلمة الدخيلة (l’intrus) التي لا تنتمي إلى عائلة كلمة (patrie)؟',
				options: ['patriote', 'patriotisme', 'patriotique', 'patience'],
				correctIndex: 3,
				diagnosticFeedback: [
					'patriote تنتمي لعائلة patrie (وطني).',
					'patriotisme تعني الوطنية وتنتمي لنفس العائلة.',
					'patriotique صفة تعني وطني.',
					'ممتاز! patience تعني الصبر ولا علاقة لها بجذر patrie (الوطن).'
				],
				explanationAr: 'كلمة patience من جذر مختلف تماماً (patient) ولا تنتمي لعائلة patrie.'
			},
			{
				questionAr: 'أيّ مجموعة تمثّل حقلاً معجمياً (Champ lexical) للبطولة والمقاومة؟',
				options: [
					'bravoure, moudjahid, indépendance, résister',
					'cahier, stylo, tableau, cartable',
					'neige, pluie, nuage, vent',
					'route, feu rouge, trottoir, ceinture'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! كلها تدور حول موضوع البطولة والمقاومة الوطنية.',
					'هذا الحقل المعجمي للمدرسة.',
					'هذا الحقل المعجمي للطقس.',
					'هذا الحقل المعجمي للمرور.'
				],
				explanationAr: 'الكلمات (bravoure, moudjahid, indépendance, résister) تنتمي جميعها إلى الحقل المعجمي للبطولة.'
			},
			{
				questionAr: 'ما الصفة المشتقة (Adjectif) من الاسم (héros / héroïsme)؟',
				options: ['héroïquement', 'héroïque', 'hériter', 'héroïser'],
				correctIndex: 1,
				diagnosticFeedback: [
					'héroïquement ظرف حال (adverbe).',
					'أحسنت! héroïque هي الصفة (مثال: un combat héroïque).',
					'hériter فعل يعني يرث ومن عائلة أخرى.',
					'ليس الصفة المطلوبة.'
				],
				explanationAr: 'الصفة من كلمة héros هي héroïque (مثل: une résistance héroïque).'
			},
			{
				questionAr: 'ما مرادف (Synonyme) كلمة « la bravoure » في النص التاريخي؟',
				options: ['la peur', 'le courage', 'l’oubli', 'le silence'],
				correctIndex: 1,
				diagnosticFeedback: [
					'la peur (الخوف) هي الضد وليس المرادف.',
					'ممتاز! la bravoure ترادف le courage (الشجاعة والبسالة).',
					'l’oubli تعني النسيان.',
					'le silence تعني الصمت.'
				],
				explanationAr: 'La bravoure و le courage مترادفان شائعان جداً في نصوص الثورة التحريرية.'
			},
			{
				questionAr: 'ما الكلمة التي تنتمي إلى عائلة الفعل (libérer)؟',
				options: ['librairie', 'libération', 'livre', 'équilibre'],
				correctIndex: 1,
				diagnosticFeedback: [
					'librairie من جذر livre (كتاب) وليس libre (حر).',
					'صحيح! libérer / libération / liberté / libre كلها من جذر الحرية.',
					'livre تعني كتاب ولا علاقة لها بـ libérer.',
					'équilibre من جذر الميزان (libra) وليس الحرية.'
				],
				explanationAr: 'La libération (التحرير) مشتقة مباشرة من الفعل libérer.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 5. Rédiger un récit historique sur une figure algérienne
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_3am_t2_rediger_recit_historique',
		slug: 'fre-3am-t2-rediger-recit-historique',
		grade: '3am',
		yearSubjectId: 635,
		trimesterId: 't2',
		sequenceId: 'proj2',
		sequenceTitleAr: 'المشروع الثاني: القصة التاريخية والذاكرة الوطنية (Le récit historique et la mémoire nationale)',
		order: 5,
		titleAr: 'منهجية كتابة نص تاريخي عن أبطال الجزائر (Rédiger un récit historique)',
		objectives: [
			'تحويل بطاقة تاريخية (fiche chronologique) إلى نص تاريخي منسجم عن بطل جزائري (العربي بن مهيدي، ديدوش مراد، الشيخ بن باديس)',
			'توظيف Imparfait و Passé simple والروابط الزمنية والبدائل اللغوية والنحوية لإنتاج فقرة متكاملة (7/7)'
		],
		keywordsAr: ['récit historique', 'Larbi Ben M’hidi', 'Didouche Mourad', 'Cheikh Ben Badis', 'production écrite'],
		discover: {
			scenarioAr:
				'لديك بطاقة تاريخية حول الشهيد ديدوش مراد (1927–1955): ميلاده بالجزائر العاصمة، انخراطه المبكر في الحركة الوطنية، مشاركته في التحضير لـ 1 نوفمبر 1954، قيادته للولاية الثانية (الشمال القسنطيني)، واستشهاده في معركة دوار الصوادق بسمندو يوم 18 جانفي 1955. كيف تحوّل هذه النقاط إلى نص تاريخي مؤثر؟',
			svg: svgFrenchWritingBlueprint({
				title: 'Plan d’un récit historique réussi (3AM — 7/7 pts)',
				steps: [
					{ stage: '1. Introduction', detail: 'Présenter la figure, sa naissance et le contexte (imparfait / passé simple).' },
					{ stage: '2. Parcours', detail: 'Raconter ses actions avec des connecteurs (d’abord, ensuite, en 1954).' },
					{ stage: '3. Fait marquant', detail: 'Décrire un épisode héroïque avec des substituts pour éviter les répétitions.' },
					{ stage: '4. Hommage final', detail: 'Conclure au présent : l’Algérie garde sa mémoire vivante.' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الأزمنة التي نكتب بها وسط القصة التاريخية، وما الزمن المناسب لجملة التكريم الختامية اليوم؟',
					hintAr: 'الماضي لسرد الأحداث التاريخية، والحاضر لتخليد ذكراه اليوم.',
					expectedInput: 'Imparfait و Passé simple للأحداث، والحاضر (Présent) لخاتمة التكريم',
					revealAr: 'ممتاز! نسرد البطولات بـ Imparfait و Passé simple، ونختم بحاضر الذاكرة مثل: « Aujourd’hui, le peuple algérien lui rend un vibrant hommage. »'
				},
				{
					promptAr: 'ما البدائل المعجمية التي يمكن استعمالها لتفادي تكرار اسم (Didouche Mourad)؟',
					hintAr: 'فكّر في صفته الوطنية والعسكرية.',
					expectedInput: 'ce jeune héros, ce chef révolutionnaire, le vaillant combattant',
					revealAr: 'استعمال بديلين معجميين وبديلين نحويين (il, son) يرفع علامة التماسك والأسلوب مباشرة.'
				},
				{
					promptAr: 'هل ننسخ نقاط البطاقة التاريخية على شكل مطّات (-) في ورقة الامتحان؟',
					hintAr: 'المطلوب نص تاريخي مترابط (récit cohérent).',
					expectedInput: 'لا، نصوغ جملاً تامة مترابطة بروابط زمنية وفقرات منظمة',
					revealAr: 'صحيح! نربط المعطيات بـ (D’abord, En 1954, Ensuite, Enfin) ونحترم علامات الترقيم والفقرات.'
				}
			]
		},
		summary: {
			rulesAr: [
				'العناصر الأربعة للنص التاريخي الممتاز (8 إلى 12 سطراً): 1) عنوان مناسب، 2) مقدمة تعرّف بالشخصية وتاريخ ومكان ميلادها، 3) عرض مرتّب زمنياً لأبرز مواقفها وكفاحها، 4) خاتمة تمجّد تضحياتها وذكراها الخالدة.',
				'الرصيد اللغوي الإجباري في 3AM T2: أفعال في الـ Passé simple (naquit, grandit, rejoignit, fonda, combattit, tomba au champ d’honneur) وأفعال وصف في الـ Imparfait (était, luttait, défendait).',
				'أشهر الشخصيات المعتمدة للوضعية الإدماجية: Larbi Ben M’hidi (1923–1957)، Didouche Mourad (1927–1955)، Ahmed Zabana (1926–1956)، Hassiba Ben Bouali (1938–1957)، Cheikh Abdelhamid Ben Badis (1889–1940)، Cheikh Mohamed Bachir El-Ibrahimi (1889–1965).',
				'عبارات ختامية نموذجية: « Son sacrifice reste gravé dans la mémoire nationale. » / « Grâce à son courage, les jeunes générations comprennent le prix de la liberté. »'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Repères historiques vérifiés (3AM)',
				rootLabel: 'Figures algériennes de la mémoire nationale',
				rootSub: 'Dates et rôles clés à retenir sans erreur',
				branches: [
					{
						label: 'Cheikh Ben Badis',
						rule: 'Constantine (1889-1940)',
						example: 'Fonda l’Assoc. des Oulémas (1931)',
						color: '#1d4ed8'
					},
					{
						label: 'Didouche Mourad',
						rule: 'Alger (1927-1955)',
						example: 'Chef de la Wilaya II, martyr (1955)',
						color: '#047857'
					},
					{
						label: 'Larbi Ben M’hidi',
						rule: 'Aïn M’lila (1923-1957)',
						example: 'Stratège de la Révolution (1954)',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'المعالم الزمنية الدقيقة لأبرز الشخصيات الجزائرية في المشروع الثاني',
			examples: [
				{
					problemAr: 'صُغ مقدمة من جملتين عن الشهيد العربي بن مهيدي.',
					solutionAr: 'Larbi Ben M’hidi fut l’un des plus grands héros de la Révolution algérienne. Il naquit en 1923 près d’Aïn M’lila et se distingua très tôt par son intelligence et son patriotisme.'
				},
				{
					problemAr: 'صُغ جملة في العرض تربط بين نشاطه في 1954 وتضحيته باستعمال بديل معجمي.',
					solutionAr: 'En novembre 1954, ce stratège courageux participa activement au déclenchement de la Guerre de Libération avant de tomber en martyr en 1957.'
				}
			],
			watchOutAr:
				'تأكّد من كتابة الفعل (naître) في الماضي البسيط (il naquit / elle naquit) بدون خطأ، وتذكّر أن أسماء الأعلام والتواريخ والمدن الجزائرية تبدأ دائماً بحرف كبير (Majuscule).'
		},
		practice: [
			{
				questionAr: 'ما التصريف الصحيح للفعل (naître) في الـ Passé simple لبداية نص تاريخي عن الشيخ عبد الحميد بن باديس؟',
				options: ['Il naissait', 'Il naquit', 'Il naîtra', 'Il a naqui'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الميلاد حدث لحظي محدّد بتاريخ لا يأخذ Imparfait.',
					'ممتاز! il naquit هي الصيغة الصحيحة في الـ Passé simple.',
					'المستقبل لا يناسب حدثاً تاريخياً ماضياً.',
					'اسم المفعول من naître هو né ويُصرّف مع être (est né).'
				],
				explanationAr: 'الفعل naître في الماضي البسيط مع il/elle هو: naquit.'
			},
			{
				questionAr: 'في أيّ سنة أسّس الشيخ عبد الحميد بن باديس جمعية العلماء المسلمين الجزائريين؟',
				options: ['1954', '1931', '1962', '1945'],
				correctIndex: 1,
				diagnosticFeedback: [
					'1954 هي سنة اندلاع الثورة التحريرية.',
					'ممتاز! تأسست جمعية العلماء المسلمين الجزائريين يوم 5 ماي 1931.',
					'1962 هي سنة الاستقلال.',
					'1945 هي سنة مجازر 8 ماي.'
				],
				explanationAr: 'أُسّست جمعية العلماء المسلمين الجزائريين في 5 ماي 1931 بنادي الترقي في الجزائر العاصمة.'
			},
			{
				questionAr: 'أيّ عبارة فرنسية صحيحة ومناسبة للحديث عن استشهاد بطل في ساحة المعركة؟',
				options: [
					'Il tomba au champ d’honneur.',
					'Il est tombé sur la table.',
					'Il dormit pendant la bataille.',
					'Il oublia son pays.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! « tomber au champ d’honneur » عبارة فصيحة تعني استشهد في ميدان الشرف.',
					'عبارة غير مناسبة سياقياً إطلاقاً.',
					'تتناقض مع البطولة.',
					'تتناقض مع الوطنية.'
				],
				explanationAr: 'تعبير « Il tomba au champ d’honneur » هو التعبير الأدبي والتاريخي الدقيق للاستشهاد.'
			},
			{
				questionAr: 'أيّ ترتيب للفقرات يحترم بنية القصة التاريخية المطلوبة في 3AM؟',
				options: [
					'خاتمة التكريم ثم ميلاد البطل ثم كفاحه',
					'تعريف البطل وميلاده، ثم تسلسل كفاحه بالروابط الزمنية، ثم خاتمة تخليد ذكراه',
					'قائمة تواريخ متفرقة بدون أفعال',
					'مقارنة بين فصل الصيف وفصل الشتاء'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الترتيب الزمني يبدأ بالتعريف والميلاد وينتهي بالتكريم.',
					'أحسنت! هذا هو التصميم المنهجي المتكامل للنص التاريخي.',
					'يجب بناء جمل فعلية مترابطة وفقرات منظمة.',
					'خارج موضوع النص التاريخي.'
				],
				explanationAr: 'النص التاريخي يسير بترتيب زمني منطقي من التعريف والميلاد إلى الكفاح ثم الخاتمة.'
			},
			{
				questionAr: 'اختر الجملة الخالية من التكرار بفضل استعمال بديل معجمي مناسب:',
				options: [
					'Hassiba Ben Bouali était jeune. Hassiba Ben Bouali aida les moudjahidine.',
					'Hassiba Ben Bouali était jeune. Cette héroïne courageuse aida les moudjahidine.',
					'Hassiba Ben Bouali était jeune. Il aida les moudjahidine.',
					'Hassiba Ben Bouali était jeune. Ils aida les moudjahidine.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'تكرر الاسم الكامل مرتين متتاليتين.',
					'ممتاز! عوضنا الاسم ببديل معجمي مؤنث دقيق: Cette héroïne courageuse.',
					'الضمير Il للمذكر وليس للمؤنث.',
					'الضمير Ils للجمع المذكر والفعل مفرد.'
				],
				explanationAr: 'عبارة (Cette héroïne courageuse) بديل معجمي مناسب وتتفادى التكرار.'
			}
		]
	}
];
