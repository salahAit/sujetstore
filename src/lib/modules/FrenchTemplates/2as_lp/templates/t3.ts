import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	FrenchGeneratedExerciseInstance,
	FrenchParameterizedTemplate
} from '../../types';
import {
	buildFrenchClassificationTableBlock,
	buildFrenchPassageBlock,
	buildFrenchWordFamilyTableBlock,
	buildFrenchWrittenProductionBlock
} from '../../french-helpers';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';

export const TEMPLATES_2AS_LP_T3: FrenchParameterizedTemplate[] = [
	{
		id: 'fre_tpl_2as_lp_t3_comp_reportage_algerie',
		grade: '2as_lp',
		trimesterId: 't3',
		domain: 'comprehension_ecrit',
		titleAr: 'I. Compréhension de l’écrit — A) Étude du texte : Reportage sur le patrimoine algérien (7 pts)',
		curriculumLessonId: 'fre_lesson_2as_lp_t3_reportage_patrimoine',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			if (variant === 0) {
				const passage = buildFrenchPassageBlock({
					title: 'Carnet de reportage dans la vallée du M’Zab : une architecture de sagesse',
					paragraphs: [
						'À six cents kilomètres au sud d’Alger, au cœur d’un plateau rocheux aride, surgissent les cinq cités fortifiées de la vallée du M’Zab. Dès l’entrée de Ghardaïa, le regard embrasse un amphithéâtre lumineux de maisons cubiques peintes à la chaux, serrées les unes contre les autres autour de la mosquée centrale qui couronne la colline.',
						'En parcourant les ruelles étroites et sinueuses, on découvre une urbanistique pensée pour résister à la chaleur saharienne. Les passages couverts ménagent une ombre fraîche, tandis que les murs épais en pierre locale et en plâtre naturel isolent les pièces intérieures. Plus bas, au pied de la cité, s’étend la palmeraie irriguée par un ingénieux système de partage des crues. Un habitant âgé nous confie avec fierté : « Nos ancêtres ont bâti chaque maison de manière à ne jamais priver le voisin de lumière ni d’air pur. »',
						'Classée au patrimoine mondial, [[cette]] vallée millénaire n’est pas un simple décor figé pour les visiteurs : [[elle]] offre aux architectes contemporains une leçon vivante de sobriété, d’égalité sociale et de respect du climat.'
					],
					source: 'D’après un reportage culturel sur l’Algérie saharienne (texte adapté)',
					glossary: [
						{ term: 'amphithéâtre', meaning: 'disposition en gradins étagés sur le flanc d’une colline' },
						{ term: 'crue', meaning: 'montée passagère des eaux d’un oued après de fortes pluies' }
					]
				});

				const content: ContentBlock[] = [
					passage,
					{
						type: 'text',
						content:
							'1. Quel est le genre de ce texte et quel site patrimonial algérien met-il en valeur ? Précisez sa visée communicative.',
						answer:
							'Genre : Un reportage culturel (à dominante descriptive valorisante). Site : La vallée du M’Zab (notamment Ghardaïa). Visée communicative : Faire découvrir ce patrimoine architectural, en valoriser la sagesse écologique et sensibiliser à son caractère exemplaire.',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'2. Comment l’architecture du M’Zab s’adapte-t-elle au climat saharien et aux valeurs de voisinage ? Relevez deux éléments du texte.',
						answer:
							'Adaptation au climat : ruelles étroites et passages couverts offrant de l’ombre ; murs épais en pierre et plâtre isolant de la chaleur ; irrigation ingénieuse de la palmeraie. Valeurs de voisinage : aucune maison ne prive le voisin de lumière ni d’air pur.',
						mark: '2.0'
					},
					{
						type: 'text',
						content:
							'3. Relevez dans le texte :\n  a) Deux localisateurs spatiaux et deux adjectifs mélioratifs.\n  b) Une phrase au discours direct et son verbe introducteur.',
						answer:
							'a) Localisateurs spatiaux : « au cœur d’un plateau », « Dès l’entrée de Ghardaïa », « Plus bas, au pied de la cité » (deux au choix). Adjectifs mélioratifs : lumineux, ingénieux, millénaire, vivante (deux au choix).\n  b) Discours direct : « Nos ancêtres ont bâti chaque maison de manière à ne jamais priver le voisin de lumière ni d’air pur. » | Verbe introducteur : « confie ».',
						mark: '2.0'
					},
					{
						type: 'text',
						content:
							'4. À quoi renvoient « cette » et « elle » (§3) ? Quelle est la valeur du présent employé dans les deux premiers paragraphes ?',
						answer:
							'« cette » (cette vallée millénaire) et « elle » renvoient toutes deux à la vallée du M’Zab. Valeur du présent : présent de reportage (ou présent descriptif d’actualité) qui rend la visite vivante et immédiate pour le lecteur.',
						mark: '1.5'
					}
				];

				const mcq = buildUniqueMcqOptions(
					'Rendre la visite vivante et immerger le lecteur dans la découverte directe du site (présent de reportage)',
					[
						{
							text: 'Située dans un futur lointain, l’architecture du M’Zab n’existe pas encore',
							diagnosticFeedback: 'خطأ: الحاضر هنا يصف مشاهدات واقعية حية في الموقع.'
						},
						{
							text: 'Remplacer totalement l’emploi des localisateurs spatiaux',
							diagnosticFeedback: 'خطأ: النص مليء بالمؤشرات المكانية إلى جانب الحاضر.'
						},
						{
							text: 'Rendre le texte purement polémique contre les architectes',
							diagnosticFeedback: 'خطأ: النص تثميني إيجابي لا سجالي.'
						}
					],
					rng
				);

				return {
					templateId: this.id,
					seed,
					grade: '2as_lp',
					trimesterId: 't3',
					difficulty,
					domain: this.domain,
					titleAr: this.titleAr,
					examRole: 'comprehension',
					quizQuestion: {
						type: 'mcq',
						questionText: 'Quel effet produit l’emploi dominant du présent de l’indicatif dans ce reportage sur la vallée du M’Zab ?',
						questionTextAr: 'ما الأثر الذي يحدثه توظيف الحاضر الإخباري (Présent de reportage) في روبورتاج وادي ميزاب؟',
						questionData: {
							options: mcq.options,
							correctIndex: mcq.correctIndices[0],
							correctIndices: mcq.correctIndices,
							correctIndexes: mcq.correctIndices
						},
						explanation: 'يمنح حاضر الروبورتاج حيوية ومباشرة تجعل القارئ يعيش الجولة الميدانية مع المراسل.'
					},
					sujetExercise: {
						customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
						points: 7,
						instruction: 'Lisez attentivement ce reportage puis répondez aux questions :',
						content
					},
					hints: [
						'ابحث في الفقرة الثانية عن الحلول المناخية (الأزقة الضيقة، الجدران السميكة) وعن شهادة الساكن المسن.',
						'ميز بين المؤشرات المكانية (Au cœur de, Plus bas, Au pied de) والنعوت التمجيدية.',
						'لاحظ أن « cette vallée millénaire » بديل معجمي يعود على وادي ميزاب.'
					],
					solutionStepsAr: [
						'تحديد النوع النصي والمعلم والغاية التواصلية (1.5 نقطة).',
						'شرح تكيف العمارة مع المناخ وقيم الجوار (2.0 نقطة).',
						'استخراج المؤشرات المكانية والنعوت والكلام المباشر وفعل القول (2.0 نقطة).',
						'تعيين الإحالتين وقيمة حاضر الروبورتاج (1.5 نقطة).'
					],
					finalAnswer: 'Étude du texte (7 pts) : Reportage sur le M’Zab ; adaptation climatique et sociale ; repères + discours direct ; présent de reportage.'
				};
			}

			const passage = buildFrenchPassageBlock({
				title: 'Dans les ateliers de la Casbah d’Alger : mémoire vivante des artisans',
				paragraphs: [
					'En gravissant les ruelles en escalier de la haute Casbah d’Alger, le visiteur laisse derrière lui le tumulte des boulevards modernes pour pénétrer dans une cité séculaire au charme singulier. De part et d’autre des passages voûtés, des façades blanchies à la chaux encadrent de lourdes portes en bois de cèdre ornées de clous en bronze.',
					'Au détour d’une placette, le tintement régulier du marteau guide nos pas vers l’échoppe de maître Youcef, dinandier depuis quarante ans. Penché sur un grand plateau de cuivre, l’artisan grave avec une patience admirable des motifs géométriques hérités de ses aïeux. Interrogé sur l’avenir de son métier, [[il]] répond avec sérénité : « Tant que nous formerons des apprentis passionnés, cet art raffiné ne disparaîtra jamais de notre vieille médina. »',
					'Plus loin, des menuisiers et des céramistes poursuivent le même travail minutieux. Sauvegarder [[ce]] patrimoine vivant, c’est préserver bien plus que des pierres anciennes : c’est transmettre aux jeunes Algériens la fierté d’un savoir-faire authentique.'
				],
				source: 'D’après un reportage sur l’artisanat algérois (texte adapté)',
				glossary: [
					{ term: 'dinandier', meaning: 'artisan spécialisé dans le travail artistique du cuivre et du laiton' },
					{ term: 'échoppe', meaning: 'petite boutique ou atelier traditionnel d’artisan' }
				]
			});

			const content: ContentBlock[] = [
				passage,
				{
					type: 'text',
					content:
						'1. Quel lieu historique algérien et quels métiers traditionnels ce reportage met-il en lumière ?',
					answer:
						'Le reportage présente la Casbah d’Alger et met en lumière ses métiers artisanaux traditionnels : la dinanderie (travail du cuivre), la menuiserie et la céramique.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'2. Quels détails sensoriels (vue et ouïe) le journaliste mobilise-t-il pour rendre la promenade vivante ?',
					answer:
						'La vue : ruelles en escalier, passages voûtés, façades blanchies à la chaux, portes en bois de cèdre ornées de clous en bronze, motifs géométriques sur cuivre. L’ouïe : le tumulte des boulevards (qu’on quitte) et le tintement régulier du marteau du dinandier.',
					mark: '2.0'
				},
				{
					type: 'text',
					content:
						'3. Relevez dans le deuxième paragraphe le témoignage au discours direct, son verbe introducteur, puis précisez la condition qui garantira la survie de ce métier.',
					answer:
						'Témoignage : « Tant que nous formerons des apprentis passionnés, cet art raffiné ne disparaîtra jamais de notre vieille médina. » | Verbe introducteur : « répond ». | Condition : la formation d’apprentis passionnés.',
					mark: '2.0'
				},
				{
					type: 'text',
					content:
						'4. À qui ou à quoi renvoient « il » (§2) et « ce » (§3) ? Quelle est la visée communicative de ce texte ?',
					answer:
						'« il » renvoie à maître Youcef (l’artisan dinandier) ; « ce » renvoie au patrimoine vivant (les métiers artisanaux et l’architecture de la Casbah). Visée communicative : faire découvrir et valoriser l’artisanat de la Casbah et sensibiliser à sa sauvegarde.',
					mark: '1.5'
				}
			];

			const mcq = buildUniqueMcqOptions(
				'La formation continue de jeunes apprentis passionnés par ce métier artisanal',
				[
					{
						text: 'La fermeture complète de toutes les ruelles anciennes au public',
						diagnosticFeedback: 'خطأ: بل يؤكد الحرفي يوسف على تكوين المتدربين الشباب لضمان الاستمرارية.'
					},
					{
						text: 'Le remplacement total du travail manuel par des machines industrielles',
						diagnosticFeedback: 'خطأ: النص يثمن المهارة اليدوية الأصيلة ونقلها للأجيال.'
					},
					{
						text: 'La vente exclusive des plateaux de cuivre à l’étranger',
						diagnosticFeedback: 'خطأ: لم يُذكر هذا في شهادة المعلم يوسف.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Selon le témoignage de maître Youcef, quelle condition assurera la survie de la dinanderie à la Casbah ?',
					questionTextAr: 'بحسب شهادة المعلم يوسف، ما الشرط الذي يضمن بقاء حرفة النحاس في القصبة؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'أكد المعلم يوسف في كلامه المباشر أن تكوين متعلمين شغوفين هو الضامن لعدم اندثار هذا الفن.'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
					points: 7,
					instruction: 'Lisez attentivement ce reportage puis répondez aux questions :',
					content
				},
				hints: [
					'تأمل تفاصيل البصر والسمع في الفقرتين الأولى والثانية (الواجهات البيضاء، رنين المطرقة).',
					'استخرج الكلام المحصور بين مزدوجتين في الفقرة الثانية وحدد فعل القول الذي سبقه.',
					'انظر إلى الفقرة الأخيرة لصياغة الغاية التواصلية التراثية بدقة.'
				],
				solutionStepsAr: [
					'تحديد المعلم التراثي والحرف المذكورة (1.5 نقطة).',
					'استخراج التفاصيل الحسية البصرية والسمعية (2.0 نقطة).',
					'استخراج الشهادة وفعل القول وشرط بقاء الحرفة (2.0 نقطة).',
					'تحديد الإحالتين والغاية التواصلية (1.5 نقطة).'
				],
				finalAnswer: 'Étude du texte (7 pts) : Casbah d’Alger et dinanderie ; détails sensoriels ; témoignage + condition ; référents et visée patrimoniale.'
			};
		}
	},
	{
		id: 'fre_tpl_2as_lp_t3_comp_dialogue_civique',
		grade: '2as_lp',
		trimesterId: 't3',
		domain: 'comprehension_ecrit',
		titleAr: 'I. Compréhension de l’écrit — A) Étude du texte : Dialogue argumentatif civique et patrimonial (7 pts)',
		curriculumLessonId: 'fre_lesson_2as_lp_t3_dialogue_ecrit',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			if (variant === 0) {
				const passage = buildFrenchPassageBlock({
					title: 'Débat au lycée de Tlemcen : quel avenir pour nos bibliothèques de quartier ?',
					paragraphs: [
						'Dans le cadre d’une table ronde culturelle organisée au lycée, une élève, Inès, s’adresse au directeur de la bibliothèque communale, M. Belkacem : « Monsieur, à l’heure où presque tous les manuels existent en format numérique, croyez-vous vraiment que les bibliothèques de quartier ont encore une utilité ? demanda-t-elle avec franchise. »',
						'— « C’est une question légitime, répondit M. Belkacem avec un sourire calme. Toutefois, réduire la bibliothèque à un simple entrepôt de papier serait une erreur. Ici, les jeunes trouvent le silence nécessaire à l’étude, des ouvrages vérifiés par des spécialistes et des conseils méthodologiques que nul moteur de recherche ne remplace. »',
						'— « Pourtant, objecta Inès, beaucoup de lycéens trouvent les horaires trop courts et les rayonnages parfois anciens. »',
						'— « Vous avez raison sur [[ce]] point, reconnut le directeur. C’est précisément pourquoi nous modernisons [[nos]] salles de lecture, prolongeons l’ouverture jusqu’en soirée et créons des clubs de résumé et de débat scientifique. Une bibliothèque vivante unit l’héritage du livre imprimé et les outils d’aujourd’hui ! »'
					],
					source: 'D’après une rencontre éducative à Tlemcen (texte adapté)',
					glossary: [
						{ term: 'rayonnages', meaning: 'ensemble des étagères où sont rangés les livres d’une bibliothèque' },
						{ term: 'légitime', meaning: 'justifié, raisonnable et digne d’attention' }
					]
				});

				const content: ContentBlock[] = [
					passage,
					{
						type: 'text',
						content:
							'1. Qui sont les deux interlocuteurs de ce dialogue, où se déroule l’échange et quel en est le thème central ?',
						answer:
							'Interlocuteurs : Inès (une lycéenne) et M. Belkacem (directeur de la bibliothèque communale). Lieu : une table ronde culturelle organisée au lycée de Tlemcen. Thème : l’utilité et l’avenir des bibliothèques de quartier à l’ère numérique.',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'2. Quels arguments M. Belkacem avance-t-il pour défendre la bibliothèque de quartier, et quelle objection formule Inès ?',
						answer:
							'Arguments de M. Belkacem : la bibliothèque offre le silence propice à l’étude, des ouvrages vérifiés par des spécialistes et des conseils méthodologiques irremplaçables. Objection d’Inès : les horaires sont trop courts et les rayonnages parfois anciens.',
						mark: '2.0'
					},
					{
						type: 'text',
						content:
							'3. Relevez quatre verbes introducteurs de parole employés dans ce dialogue et précisez le registre de langue dominant.',
						answer:
							'Verbes introducteurs : « demanda », « répondit », « objecta », « reconnut » (et « s’adresse »). Registre de langue : registre courant soigné / soutenu (respectueux et courtois).',
						mark: '2.0'
					},
					{
						type: 'text',
						content:
							'4. À quoi ou à qui renvoient « ce » et « nos » (§4) ? Quelles mesures concrètes le directeur annonce-t-il pour moderniser la bibliothèque ?',
						answer:
							'« ce » renvoie à l’objection d’Inès (horaires courts et rayonnages anciens) ; « nos » renvoie à la bibliothèque communale / l’équipe de M. Belkacem. Mesures : modernisation des salles de lecture, ouverture prolongée jusqu’en soirée, création de clubs de résumé et de débat scientifique.',
						mark: '1.5'
					}
				];

				const mcq = buildUniqueMcqOptions(
					'Il reconnaît la justesse de la remarque puis présente des mesures concrètes de modernisation',
					[
						{
							text: 'Il refuse d’écouter la lycéenne et quitte immédiatement la table ronde',
							diagnosticFeedback: 'خطأ: بل تحاور معها بهدوء واعترف بصحة ملاحظتها (« Vous avez raison sur ce point »).'
						},
						{
							text: 'Il propose de fermer définitivement la bibliothèque communale',
							diagnosticFeedback: 'خطأ: بالعكس، يعلن تمديد ساعات الفتح وتحديث القاعات.'
						},
						{
							text: 'Il interdit aux lycéens d’utiliser tout outil numérique',
							diagnosticFeedback: 'خطأ: يختم بدعوة إلى الجمع بين الكتاب المطبوع وأدوات اليوم.'
						}
					],
					rng
				);

				return {
					templateId: this.id,
					seed,
					grade: '2as_lp',
					trimesterId: 't3',
					difficulty,
					domain: this.domain,
					titleAr: this.titleAr,
					examRole: 'comprehension',
					quizQuestion: {
						type: 'mcq',
						questionText: 'Comment M. Belkacem réagit-il à l’objection d’Inès sur les horaires et les rayonnages ?',
						questionTextAr: 'كيف يتعامل السيد بلقاسم مع اعتراض التلميذة إيناس حول أوقات الفتح والرفوف؟',
						questionData: {
							options: mcq.options,
							correctIndex: mcq.correctIndices[0],
							correctIndices: mcq.correctIndices,
							correctIndexes: mcq.correctIndices
						},
						explanation: 'يجسد الحوار أدب النقاش المدني: الاعتراف بصحة النقد (reconnut) ثم تقديم حلول عملية للتحسين.'
					},
					sujetExercise: {
						customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
						points: 7,
						instruction: 'Lisez attentivement ce dialogue argumentatif puis répondez aux questions :',
						content
					},
					hints: [
						'لاحظ علامات الترقيم الحوارية (« » و —) وتنوع أفعال القول في الجمل المعترضة.',
						'انتبه للرد الثالث المبدوء بـ « Pourtant » لاستخراج اعتراض التلميذة بدقة.',
						'في السؤال الرابع استخرج الإجراءات الثلاثة المذكورة في الجملة قبل الأخيرة.'
					],
					solutionStepsAr: [
						'تحديد المتحاورين والمكان والموضوع المحوري (1.5 نقطة).',
						'استخراج حجج المدير واعتراض التلميذة (2.0 نقطة).',
						'استخراج أفعال القول الأربعة وتحديد مستوى اللغة (2.0 نقطة).',
						'تعيين الإحالتين والتدابير العملية للتحديث (1.5 نقطة).'
					],
					finalAnswer: 'Étude du texte (7 pts) : Débat sur les bibliothèques ; arguments + objection ; 4 verbes introducteurs + registre courant/soutenu ; 3 mesures.'
				};
			}

			const passage = buildFrenchPassageBlock({
				title: 'Entretien à Constantine : restaurer la pierre sans trahir l’histoire',
				paragraphs: [
					'Sur une terrasse dominant les gorges du Rhumel, notre reporter interroge Nadia Mansouri, architecte spécialisée dans la restauration du patrimoine constantinois : « Madame, pourquoi la réhabilitation des demeures anciennes exige-t-elle autant de temps que de nouvelles constructions ? questionna-t-il. »',
					'— « Parce que restaurer ne signifie pas démolir pour refaire à neuf, expliqua l’architecte. Nous devons analyser la composition exacte de la chaux ancienne, respecter les boiseries sculptées et consulter les archives historiques afin de préserver l’âme du bâtiment. »',
					'— « Mais certains citoyens estiment que ces chantiers coûtent cher et avancent lentement, répliqua le journaliste. »',
					'— « Je comprends [[leur]] impatience, concéda-t-elle. Néanmoins, un travail précipité avec du ciment inadapté dégrade les murs en quelques années. En revanche, une restauration soignée protège durablement [[notre]] mémoire urbaine et attire un tourisme culturel bénéfique pour toute la ville. »'
				],
				source: 'D’après un entretien culturel sur la restauration à Constantine (texte adapté)',
				glossary: [
					{ term: 'réhabilitation', meaning: 'remise en état respectueuse d’un édifice ancien' },
					{ term: 'chaux', meaning: 'liant minéral naturel traditionnellement utilisé pour enduire les murs' }
				]
			});

			const content: ContentBlock[] = [
				passage,
				{
					type: 'text',
					content:
						'1. Identifiez les deux intervenants de cet entretien, la ville concernée et le problème débattu.',
					answer:
						'Intervenants : un journaliste (reporter) et Nadia Mansouri (architecte spécialiste de la restauration). Ville : Constantine. Problème débattu : pourquoi la restauration du patrimoine ancien demande du temps, de la rigueur et des matériaux authentiques.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'2. Pourquoi l’architecte refuse-t-elle l’emploi précipité de ciment inadapté ? Quels sont les avantages d’une restauration soignée ?',
					answer:
						'Refus du ciment inadapté : un travail précipité dégrade les murs anciens en quelques années. Avantages d’une restauration soignée : elle préserve l’âme du bâtiment, protège durablement la mémoire urbaine et attire un tourisme culturel bénéfique.',
					mark: '2.0'
				},
				{
					type: 'text',
					content:
						'3. Relevez quatre verbes introducteurs de parole dans ce dialogue et expliquez l’ordre des mots dans « expliqua l’architecte ».',
					answer:
						'Verbes introducteurs : « questionna », « expliqua », « répliqua », « concéda » (et « interroge »). Ordre des mots : inversion obligatoire du sujet après le verbe dans une proposition incise.',
					mark: '2.0'
				},
				{
					type: 'text',
					content:
						'4. À qui renvoient « leur » et « notre » (§4) ? Quel rapport logique introduisent « Néanmoins » et « En revanche » ?',
					answer:
						'« leur » renvoie à certains citoyens ; « notre » renvoie à tous les habitants de Constantine / aux Algériens (inclusif). Rapport logique : opposition / concession (réfutation nuancée).',
					mark: '1.5'
				}
			];

			const mcq = buildUniqueMcqOptions(
				'Une proposition incise exigeant l’inversion obligatoire du verbe et du sujet',
				[
					{
						text: 'Une faute d’accord qui doit être corrigée en « l’architecte expliqua »',
						diagnosticFeedback: 'خطأ: بالعكس، قلب الفاعل واجب نحوياً في الجملة المعترضة.'
					},
					{
						text: 'Une interrogation directe adressée au lecteur',
						diagnosticFeedback: 'خطأ: الجملة خبرية معترضة لتحديد المتكلم.'
					},
					{
						text: 'Une phrase au discours indirect libre',
						diagnosticFeedback: 'خطأ: الكلام هنا مباشر بين مزدوجتين.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Quelle règle syntaxique explique l’ordre des mots dans « , expliqua l’architecte. » ?',
					questionTextAr: 'ما القاعدة النحوية التي تفسر تقديم الفعل على الفاعل في « , expliqua l’architecte. »؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'في الجملة المعترضة (Proposition incise) أثناء الحوار يجب دائماً تقديم فعل القول على الفاعل.'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
					points: 7,
					instruction: 'Lisez attentivement cet entretien puis répondez aux questions :',
					content
				},
				hints: [
					'تأمل أفعال القول المتنوعة في المقابلة: questionna, expliqua, répliqua, concéda.',
					'قارن في الفقرة الرابعة بين نتيجة الترميم المتسرع بالإسمنت ونتيجة الترميم المتقن.',
					'انتبه إلى قيمة الرابطين « Néanmoins » و « En revanche ».'
				],
				solutionStepsAr: [
					'تحديد المتحاورين والمدينة والإشكالية (1.5 نقطة).',
					'تعليل رفض الإسمنت غير الملائم وإبراز فوائد الترميم المتقن (2.0 نقطة).',
					'استخراج أفعال القول الأربعة وتفسير قلب الفاعل (2.0 نقطة).',
					'تحديد الإحالتين والعلاقة المنطقية (1.5 نقطة).'
				],
				finalAnswer: 'Étude du texte (7 pts) : Entretien à Constantine ; restauration rigoureuse vs ciment ; 4 verbes + incise ; leur = citoyens, opposition/concession.'
			};
		}
	},
	{
		id: 'fre_tpl_2as_lp_t3_exp_discours_rapporte',
		grade: '2as_lp',
		trimesterId: 't3',
		domain: 'grammaire_syntaxe',
		titleAr: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue : Discours rapporté et registres de langue (6 pts)',
		curriculumLessonId: 'fre_lesson_2as_lp_t3_discours_rapporte',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const regTable = buildFrenchClassificationTableBlock(
				variant === 0
					? {
							columns: [
								{
									header: 'Registre familier',
									items: ['bouquin', 'baraque', 'bosser'],
									mark: '0.5'
								},
								{
									header: 'Registre courant',
									items: ['livre', 'maison', 'travailler'],
									mark: '0.5'
								},
								{
									header: 'Registre soutenu',
									items: ['ouvrage', 'demeure', 'œuvrer'],
									mark: '0.5'
								}
							]
						}
					: {
							columns: [
								{
									header: 'Registre familier',
									items: ['copain', 'bagnole', 'boulot'],
									mark: '0.5'
								},
								{
									header: 'Registre courant',
									items: ['ami', 'voiture', 'métier'],
									mark: '0.5'
								},
								{
									header: 'Registre soutenu',
									items: ['compagnon', 'véhicule', 'profession'],
									mark: '0.5'
								}
							]
						}
			);

			const regWords =
				variant === 0
					? '(ouvrage, bouquin, maison, œuvrer, baraque, livre, travailler, demeure, bosser)'
					: '(véhicule, copain, métier, compagnon, bagnole, ami, profession, voiture, boulot)';

			const transPrompt =
				variant === 0
					? '2. Transposez les phrases suivantes au discours indirect (attention à la concordance des temps) :\n  a) L’artisan a déclaré : « Je grave ce plateau aujourd’hui et je le livrerai demain. »\n  b) Le reporter demanda à l’architecte : « Est-ce que ces voûtes résistent à la chaleur ? »\n  c) Le guide nous a recommandé : « Observez la finesse du mihrab et respectez le calme des lieux ! »'
					: '2. Transposez les phrases suivantes au discours indirect (attention à la concordance des temps) :\n  a) Le directeur a annoncé : « Nous avons modernisé la salle hier et nous ouvrirons un club demain. »\n  b) Inès demanda au bibliothécaire : « Qu’est-ce que les lycéens empruntent le plus ici ? »\n  c) L’architecte a conseillé aux jeunes : « Apprenez les techniques de la chaux traditionnelle ! »';

			const transAnswer =
				variant === 0
					? 'a) L’artisan a déclaré qu’il gravait ce plateau ce jour-là et qu’il le livrerait le lendemain.\n  b) Le reporter demanda à l’architecte si ces voûtes résistaient à la chaleur.\n  c) Le guide nous a recommandé d’observer la finesse du mihrab et de respecter le calme des lieux.'
					: 'a) Le directeur a annoncé qu’ils avaient modernisé la salle la veille et qu’ils ouvriraient un club le lendemain.\n  b) Inès demanda au bibliothécaire ce que les lycéens empruntaient le plus là.\n  c) L’architecte a conseillé aux jeunes d’apprendre les techniques de la chaux traditionnelle.';

			const presentCheckPrompt =
				variant === 0
					? '3. Transposez au discours indirect en faisant attention au temps du verbe introducteur : « Le conservateur affirme : "Nous préparons une exposition sur Tlemcen." » Puis donnez un verbe introducteur précis remplaçant « dire » pour introduire une objection.'
					: '3. Transposez au discours indirect en faisant attention au temps du verbe introducteur : « Le reporter écrit : "La Casbah fascine toujours ses visiteurs." » Puis donnez deux verbes introducteurs précis remplaçant « dire » pour poser une question ou émettre un doute.';

			const presentCheckAnswer =
				variant === 0
					? 'Discours indirect (verbe au présent : pas de changement de temps) : Le conservateur affirme qu’ils préparent une exposition sur Tlemcen. | Verbe d’objection : objecter, rétorquer, contester (un au choix).'
					: 'Discours indirect (verbe au présent : pas de changement de temps) : Le reporter écrit que la Casbah fascine toujours ses visiteurs. | Verbes précis : interroger / questionner (question) ; hésiter / douter / supposer (doute).';

			const content: ContentBlock[] = [
				{
					type: 'text',
					content: `1. Classez les neuf mots suivants selon leur registre de langue dans le tableau : ${regWords}`,
					mark: ''
				},
				regTable,
				{
					type: 'text',
					content: transPrompt,
					answer: transAnswer,
					mark: '3.0'
				},
				{
					type: 'text',
					content: presentCheckPrompt,
					answer: presentCheckAnswer,
					mark: '1.5'
				}
			];

			const mcq =
				variant === 0
					? buildUniqueMcqOptions(
							'L’artisan a déclaré qu’il gravait ce plateau ce jour-là et qu’il le livrerait le lendemain.',
							[
								{
									text: 'L’artisan a déclaré qu’il grave ce plateau aujourd’hui et qu’il le livrera demain.',
									diagnosticFeedback: 'خطأ: فعل القول ماضٍ (a déclaré) فلا بد من تحويل الأزمنة وظروف الزمان.'
								},
								{
									text: 'L’artisan a déclaré qu’il gravait ce plateau la veille et qu’il le livrait le lendemain.',
									diagnosticFeedback: 'خطأ: « aujourd’hui » تصبح « ce jour-là »، و « livrerai » (مستقبل) يصبح « livrerait » (شرطي).'
								},
								{
									text: 'L’artisan a déclaré si il gravait ce plateau ce jour-là et qu’il le livrerait demain.',
									diagnosticFeedback: 'خطأ: الجملة خبرية تأخذ « que » لا « si »، و « demain » تصبح « le lendemain ».'
								}
							],
							rng
						)
					: buildUniqueMcqOptions(
							'Le directeur a annoncé qu’ils avaient modernisé la salle la veille et qu’ils ouvriraient un club le lendemain.',
							[
								{
									text: 'Le directeur a annoncé qu’ils ont modernisé la salle hier et qu’ils ouvriront un club demain.',
									diagnosticFeedback: 'خطأ: يجب تطبيق تطابق الأزمنة لأن فعل القول ماضٍ (a annoncé).'
								},
								{
									text: 'Le directeur a annoncé qu’ils modernisaient la salle la veille et qu’ils ouvraient un club le lendemain.',
									diagnosticFeedback: 'خطأ: الماضي المركب يتحول إلى Plus-que-parfait (avaient modernisé) والمستقبل إلى Conditionnel présent (ouvriraient).'
								},
								{
									text: 'Le directeur a annoncé qu’ils avaient modernisé la salle le lendemain et qu’ils ouvriraient un club la veille.',
									diagnosticFeedback: 'خطأ: عكست الظرفين! hier -> la veille، و demain -> le lendemain.'
								}
							],
							rng
						);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Choisissez la transposition au discours indirect parfaitement conforme à la concordance des temps :',
					questionTextAr: 'اختر التحويل الصحيح إلى الخطاب غير المباشر مع احترام تطابق الأزمنة والظروف:',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'مع فعل قول ماضٍ: Présent -> Imparfait، Passé composé -> Plus-que-parfait، Futur -> Conditionnel présent، و aujourd’hui -> ce jour-là / hier -> la veille / demain -> le lendemain.'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue',
					points: 6,
					instruction: 'Traitez les exercices suivants sur les registres de langue et le discours rapporté :',
					content
				},
				hints: [
					'تحقق أولاً من زمن فعل القول: إذا كان في المضارع لا تغيّر أزمنة الأفعال الداخلية.',
					'الاستفهام الكلي (Est-ce que) يأخذ « si »، و « Qu’est-ce que » تصبح « ce que »، والأمر يصبح « de + infinitif ».',
					'احفظ التحويلات الثلاثة للزمن: aujourd’hui -> ce jour-là | hier -> la veille | demain -> le lendemain.'
				],
				solutionStepsAr: [
					'تصنيف الكلمات التسع في جدول مستويات اللغة (1.5 نقطة).',
					'تحويل الجمل الثلاث (خبر، استفهام، أمر) إلى الخطاب غير المباشر (3.0 نقاط).',
					'التحويل مع فعل قول في المضارع واقتراح فعل قول دقيق (1.5 نقطة).'
				],
				finalAnswer: 'Fonctionnement de la langue (6 pts) : Registres de langue (1.5 pt) + Discours indirect passé (3.0 pts) + Verbe introducteur présent (1.5 pt).'
			};
		}
	},
	{
		id: 'fre_tpl_2as_lp_t3_exp_description_coherence',
		grade: '2as_lp',
		trimesterId: 't3',
		domain: 'vocabulaire_lexique',
		titleAr: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue : Caractérisation valorisante et cohérence (6 pts)',
		curriculumLessonId: 'fre_lesson_2as_lp_t3_coherence_visee',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const wfTable = buildFrenchWordFamilyTableBlock(
				variant === 0
					? [
							{
								verbe: { given: true, value: 'restaurer' },
								nom: { value: 'restauration', mark: '0.5' },
								adjectif: { value: 'restauré(e)', mark: '0.5' }
							},
							{
								verbe: { value: 'harmoniser', mark: '0.5' },
								nom: { given: true, value: 'harmonie' },
								adjectif: { value: 'harmonieux(se)', mark: '0.5' }
							}
						]
					: [
							{
								verbe: { given: true, value: 'transmettre' },
								nom: { value: 'transmission', mark: '0.5' },
								adjectif: { value: 'transmissible', mark: '0.5' }
							},
							{
								verbe: { value: 'valoriser', mark: '0.5' },
								nom: { given: true, value: 'valorisation' },
								adjectif: { value: 'valorisant(e)', mark: '0.5' }
							}
						]
			);

			const subPrompt =
				variant === 0
					? '2. Évitez les répétitions dans les deux phrases suivantes à l’aide de substituts grammaticaux (y, en, dont) ou lexicaux :\n  a) Tlemcen possède des monuments séculaires. Les visiteurs admirent les façades sculptées de ces monuments.\n  b) La Kalâa des Béni Hammad domine les collines du Hodna ; les historiens mènent encore des recherches à la Kalâa des Béni Hammad.'
					: '2. Évitez les répétitions dans les deux phrases suivantes à l’aide de substituts grammaticaux (y, en, dont) ou lexicaux :\n  a) Les ponts de Constantine surplombent un ravin profond. Les voyageurs gardent un souvenir durable de ces ponts.\n  b) Le Jardin d’Essai du Hamma abrite des espèces végétales rares ; de nombreuses familles se promènent au Jardin d’Essai du Hamma.';

			const subAnswer =
				variant === 0
					? 'a) Tlemcen possède des monuments séculaires dont les visiteurs admirent les façades sculptées. (ou : Les visiteurs en admirent les façades sculptées.)\n  b) La Kalâa des Béni Hammad domine les collines du Hodna ; les historiens y mènent encore des recherches.'
					: 'a) Les ponts de Constantine surplombent un ravin profond ; les voyageurs en gardent un souvenir durable. (ou : ...dont les voyageurs gardent un souvenir durable.)\n  b) Le Jardin d’Essai du Hamma abrite des espèces végétales rares ; de nombreuses familles s’y promènent.';

			const orderPrompt =
				variant === 0
					? '3. Remettez en ordre ces quatre phrases pour reconstituer le début d’un reportage sur Constantine :\n  a) Plus bas, les eaux du Rhumel grondent au fond de gorges vertigineuses.\n  b) Perché sur un impressionnant promontoire rocheux, le vieux centre de Constantine fascine dès l’arrivée.\n  c) En parcourant ces ouvrages audacieux, le visiteur mesure la grandeur séculaire de la cité.\n  d) Reliée aux quartiers voisins par de célèbres ponts suspendus, cette ville millénaire offre un panorama saisissant.'
					: '3. Remettez en ordre ces quatre phrases pour reconstituer le début d’un reportage sur Tlemcen :\n  a) À l’intérieur, une forêt d’arches finement ciselées baigne dans une lumière paisible.\n  b) Au cœur de la médina de Tlemcen se dresse la Grande Mosquée, témoin prestigieux du XIe siècle.\n  c) Quitter ce sanctuaire harmonieux, c’est emporter l’image d’un art architectural d’une rare sobriété.\n  d) Son minaret élancé domine une cour dallée d’onyx où résonne la sérénité des lieux.';

			const orderAnswer =
				variant === 0
					? 'Ordre cohérent : b - d - a - c.'
					: 'Ordre cohérent : b - d - a - c.';

			const content: ContentBlock[] = [
				{
					type: 'text',
					content: '1. Complétez le tableau de dérivation (famille de mots du patrimoine) :',
					mark: ''
				},
				wfTable,
				{
					type: 'text',
					content: subPrompt,
					answer: subAnswer,
					mark: '2.0'
				},
				{
					type: 'text',
					content: orderPrompt,
					answer: orderAnswer,
					mark: '2.0'
				}
			];

			const mcq = buildUniqueMcqOptions(
				'b - d - a - c',
				[
					{
						text: 'a - b - d - c',
						diagnosticFeedback: 'خطأ: « Plus bas / À l’intérieur » تفترض ذكر المكان الرئيسي أولاً في الجملة (b).'
					},
					{
						text: 'b - c - d - a',
						diagnosticFeedback: 'خطأ: الجملة (c) تحمل نبرة ختامية وتحيل على الجسور أو المعلم الموصوف قبلاً.'
					},
					{
						text: 'd - b - a - c',
						diagnosticFeedback: 'خطأ: الضمير الملكي أو البديل المعجمي في (d) يحيل إلى الاسم الصريح المقدم في (b).'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Quel ordre reconstitue un extrait de reportage patrimonial parfaitement cohérent ?',
					questionTextAr: 'ما الترتيب المتسق الذي يعيد بناء مقطع الروبورتاج التراثي بصورة سليمة؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'نبدأ بتقديم المعلم باسمه الصريح (b)، ثم نظرة عامة خارجية (d)، فالتفاصيل المكانية الأدق (a)، ثم الانطباع الختامي (c).'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue',
					points: 6,
					instruction: 'Complétez les exercices suivants sur la dérivation, les substituts et la cohérence textuelle :',
					content
				},
				hints: [
					'تذكر: « en / dont » يعوضان مفعولاً مسبوقاً بـ « de »، و « y » يعوض ظرف المكان.',
					'في إعادة الترتيب، ابحث أولاً عن الجملة التي تقدم اسم المدينة أو المعلم صراحةً.',
					'تتبع مسار الوصف من النظرة العامة إلى التفاصيل المكانية ثم الخلاصة.'
				],
				solutionStepsAr: [
					'إكمال جدول عائلة الكلمات التراثية (2.0 نقطة).',
					'تفادي التكرار بضمائر الإحالة الدقيقة y و en / dont (2.0 نقطة).',
					'إعادة ترتيب فقرة الروبورتاج بترتيب b - d - a - c (2.0 نقطة).'
				],
				finalAnswer: 'Fonctionnement de la langue (6 pts) : Famille de mots (2 pts) + Substituts dont/en/y (2 pts) + Ordre b-d-a-c (2 pts).'
			};
		}
	},
	{
		id: 'fre_tpl_2as_lp_t3_writing_reportage_patrimoine',
		grade: '2as_lp',
		trimesterId: 't3',
		domain: 'production_ecrite',
		titleAr: 'II. Production écrite : Reportage culturel patrimonial ou compte rendu objectif (7 pts — format LP)',
		curriculumLessonId: 'fre_lesson_2as_lp_t3_rediger_reportage_cr',
		defaultPoints: 7,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const sujetUnPrompt =
				variant === 0
					? 'Rédigez le compte rendu objectif (100 à 120 mots) du reportage intitulé « Carnet de reportage dans la vallée du M’Zab : une architecture de sagesse » pour la rubrique « Patrimoine d’Algérie » du journal de votre lycée.'
					: 'Rédigez le compte rendu objectif (100 à 120 mots) du dialogue intitulé « Débat au lycée de Tlemcen : quel avenir pour nos bibliothèques de quartier ? » en restituant fidèlement les arguments au discours indirect.';

			const sujetUnNotes =
				variant === 0
					? [
							'Accroche complète : genre (reportage culturel), titre, thème (l’architecture du M’Zab) et visée valorisante.',
							'Développement à la 3e personne et au présent : décrire comment le reporter présente le site de Ghardaïa, son adaptation climatique, sa palmeraie et la parole de l’habitant au discours indirect.',
							'Conclure sur la portée universelle de ce patrimoine classé, sans insérer votre opinion personnelle.'
						]
					: [
							'Accroche complète : genre (dialogue argumentatif), lieu (table ronde au lycée de Tlemcen), interlocuteurs (Inès et M. Belkacem) et thème.',
							'Résumer au discours indirect les questions et objections d’Inès ainsi que les réponses et mesures de modernisation annoncées par le directeur.',
							'Respecter la 3e personne, les verbes introducteurs variés et l’objectivité totale.'
						];

			const sujetDeuxPrompt =
				variant === 0
					? 'À l’occasion du Mois du Patrimoine, rédigez un reportage culturel valorisant (140 à 180 mots) consacré à une ville historique algérienne de votre choix (la Casbah d’Alger, Tlemcen, Constantine ou la vallée du M’Zab). Votre article comportera un titre, un chapeau, des repères spatiaux, des adjectifs mélioratifs et un court témoignage au discours direct.'
					: 'Votre club culturel édite un livret intitulé « Trésors d’Algérie ». Rédigez un reportage vivant (140 à 180 mots) présentant un monument ou un artisanat traditionnel de votre région (Grande Mosquée de Tlemcen, Ponts de Constantine, dinanderie ou poterie) en intégrant un titre, un chapeau, une description sensorielle et la parole d’un artisan.';

			const modelAnswer =
				variant === 0
					? 'Constantine : la citadelle suspendue entre ciel et histoire\n\nPerchée sur son impressionnant rocher calcaire au-dessus des gorges vertigineuses du Rhumel, Constantine offre au visiteur un spectacle architectural inoubliable. Immersion dans une cité millénaire où la pierre raconte des siècles de savoir et de mémoire.\n\nDès l’arrivée sur le pont Sidi M’Cid, le regard plonge dans le ravin escarpé avant d’embrasser les toits de tuiles anciennes qui s’accrochent à la falaise. En descendant vers la vieille médina, des ruelles animées mènent aux ateliers des maîtres dinandiers, où résonne le tintement patient du marteau sur le cuivre ciselé. Penché sur un plateau finement gravé, maître Rachid nous confie avec fierté : « Chaque dessin perpétue l’héritage de nos aïeux ; transmettre ce métier aux jeunes, c’est garder vivante l’âme de Constantine. »\n\nQuitter la ville des ponts, c’est emporter la conviction profonde que ce joyau patrimonial mérite d’être découvert, admiré et préservé pour les générations futures.'
					: 'La Grande Mosquée de Tlemcen : un chef-d’œuvre séculaire de lumière et de sérénité\n\nAu cœur de la vieille cité de Tlemcen se dresse depuis près d’un millénaire un monument d’une sobriété admirable. Visite d’un haut lieu de spiritualité et d’architecture qui témoigne du rayonnement historique du Maghreb.\n\nDès que l’on franchit le seuil de l’édifice, le tumulte des rues voisines s’efface devant la fraîcheur d’une vaste cour dallée d’onyx. Au-dessus des galeries harmonieuses s’élève un minaret carré en brique finement ouvragée. À l’intérieur de la salle de prière, une forêt d’arches outrepassées conduit le regard vers le célèbre mihrab sculpté, véritable dentelle de plâtre ajouré. Un jeune guide passionné nous explique : « Ce monument prouve que nos bâtisseurs savaient unir rigueur géométrique et beauté apaisante. »\n\nPréserver ce joyau architectural de Tlemcen, c’est honorer la mémoire savante de l’Algérie et transmettre aux jeunes générations la fierté de leur patrimoine authentique.';

			const block = buildFrenchWrittenProductionBlock({
				sujetUnTitle: 'Sujet 1 (Compte rendu objectif) :',
				sujetUnPrompt,
				sujetUnNotes,
				sujetDeuxPrompt,
				modelAnswer,
				rubricSummary:
					'Pertinence, respect du genre (reportage culturel ou compte rendu objectif) (2.0 pts) | Structure journalistique : titre, chapeau, paragraphes organisés par repères spatiaux et chute (2.0 pts) | Qualité de la langue, caractérisation valorisante, ponctuation du discours direct/indirect (2.0 pts) | Richesse lexicale, orthographe et présentation (1.0 pt)',
				mark: '7.0'
			});

			const mcq = buildUniqueMcqOptions(
				'Inclure un titre évocateur, un chapeau, une description organisée par repères spatiaux, un court témoignage bien ponctué et une chute valorisante',
				[
					{
						text: 'Rédiger uniquement une liste sèche de dates historiques sans aucune description du lieu',
						diagnosticFeedback: 'خطأ: الروبورتاج الثقافي يتطلب معاينة حية ووصفاً حسياً تثمينياً لا مجرد قائمة تواريخ.'
					},
					{
						text: 'Employer le registre familier et répéter constamment l’expression « il y a »',
						diagnosticFeedback: 'خطأ: يجب استخدام أفعال تموضع حية ومستوى لغوي قياسي أو راقٍ.'
					},
					{
						text: 'Omettre le titre et le chapeau en rédigeant un seul bloc sans paragraphes',
						diagnosticFeedback: 'خطأ: الهيكلة الصحفية الواضحة شرط رئيسي في تنقيط الروبورتاج.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Quels composants garantissent un reportage culturel patrimonial réussi (7/7) en 2AS LP ?',
					questionTextAr: 'ما العناصر التي تضمن نجاح الروبورتاج الثقافي التراثي (7/7) في 2AS LP؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'يقوم الروبورتاج الناجح على عنوان جذاب، وافتتاحية (Chapeau)، ووصف مكاني تثميني، وشهادة مضبوطة الترقيم، وخاتمة بليغة.'
				},
				sujetExercise: {
					customTitle: 'II. Production écrite',
					points: 7,
					instruction: 'Traitez l’UN des deux sujets au choix en soignant la mise en page et l’expression :',
					content: [block]
				},
				hints: [
					'في الروبورتاج لا تنسَ العنوان الاسمي المعبر والافتتاحية الموجزة (Chapeau) قبل فقرات الوصف.',
					'استعمل أفعال التموضع الحية (se dresse, s’élève, domine, s’étend) والمؤشرات المكانية.',
					'في التقرير الموضوعي عن حوار، انقل الأقوال بالخطاب غير المباشر بضمير الغائب دون رأي شخصي.'
				],
				solutionStepsAr: [
					'اختيار الموضوع وتخطيط الفقرات (عنوان + Chapeau + وصف وشهادة + خاتمة).',
					'توظيف المعجم التمجيدي والبدائل المعجمية وعلامات الترقيم الحوارية بدقة.',
					'مراجعة الإملاء والاتفاقات النحوية والزمن الحاضر للروبورتاج.'
				],
				finalAnswer: 'Production écrite (7 pts) : Reportage patrimonial complet (ou compte rendu objectif) avec corrigé modèle et barème.'
			};
		}
	}
];
