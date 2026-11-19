import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	FrenchGeneratedExerciseInstance,
	FrenchParameterizedTemplate
} from '../../types';
import {
	buildFrenchClassificationTableBlock,
	buildFrenchPassageBlock,
	buildFrenchWrittenProductionBlock
} from '../../french-helpers';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';

// ============================================================================
// 5 Parameterized Templates — 2AS Scientific & Management Shared — Trimester 3
// Projet 3 : Le reportage scientifique/touristique sur l’Algérie & l’anticipation éthique
// Split (/20) : 2 comprehension (7 pts) + 2 text_exploration (7 pts) + 1 written_expression (6 pts)
// ============================================================================

// [1] Compréhension de l'écrit (7 pts) — Reportage scientifique/écologique en Algérie
export const tpl2asSciT3CompReportageAlgerie: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2as_sci_t3_comp_reportage_algerie',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (7 نقاط): ريبورتاج علمي وبيئي حول الجزائر (السد الأخضر، وادي ميزاب، الطاقة الشمسية بالصحراء)',
	curriculumLessonId: 'fre_lesson_2as_sci_t3_caracteristiques_reportage',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'Hauts Plateaux : le Barrage Vert reprend vie',
				source: 'Reportage — Magazine Algérie Nature et Sciences',
				paragraphs: [
					'Sur plus de mille cinq cents kilomètres, de la frontière ouest à l’est du pays, le Barrage Vert connaît aujourd’hui un nouvel élan scientifique. Ce matin de printemps, dans la wilaya de Djelfa, des équipes d’ingénieurs forestiers et de jeunes volontaires parcourent la steppe pour planter de nouveaux arbustes résistants à la sécheresse.',
					'Contrairement aux plantations anciennes composées presque uniquement de pins d’Alep, [[cette]] nouvelle phase privilégie la biodiversité. Un ingénieur agronome nous explique sur le terrain : « Nous associons désormais le pistachier de l’Atlas, l’olivier et le caroubier. Ces espèces locales retiennent les sols, freinent l’avancée du sable et offrent des revenus durables aux familles rurales. »',
					'À quelques centaines de mètres, des techniciens installent de petits bassins de rétention d’eau de pluie afin d’irriguer [[les]] jeunes plants durant leurs deux premiers étés. D’ici quelques années, cette muraille écologique protègera efficacement les terres agricoles du Nord et redonnera un équilibre précieux à toute la région.'
				],
				glossary: [
					{ term: 'steppe', meaning: 'vaste plaine semi-aride située entre le Tell et le Sahara' },
					{ term: 'biodiversité', meaning: 'diversité des espèces végétales et animales d’un milieu' }
				],
				tfItems: [
					{
						q: 'a) Le reportage se déroule dans la wilaya de Djelfa, sur les Hauts Plateaux.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'b) La nouvelle phase du Barrage Vert plante uniquement des pins d’Alep.',
						a: 'Faux',
						c: 'Elle privilégie la biodiversité en associant le pistachier de l’Atlas, l’olivier et le caroubier.',
						mark: '0.5'
					},
					{
						q: 'c) Les nouvelles espèces locales contribuent aussi aux revenus des familles rurales.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'd) Des bassins de rétention d’eau de pluie aident à irriguer les jeunes plants.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) Relevez dans le premier paragraphe un indicateur de lieu et un indicateur de temps.',
						a: 'Indicateur de lieu : dans la wilaya de Djelfa (ou : sur les Hauts Plateaux / la steppe). Indicateur de temps : Ce matin de printemps (ou : aujourd’hui).',
						mark: '1.0'
					},
					{
						q: 'b) Quels sont les trois avantages des espèces locales citées par l’ingénieur agronome (§2) ?',
						a: 'Elles retiennent les sols, freinent l’avancée du sable et offrent des revenus durables aux familles rurales.',
						mark: '1.0'
					},
					{
						q: 'c) Pourquoi l’auteur intègre-t-il les paroles directes d’un ingénieur agronome dans son texte ?',
						a: 'Pour apporter un témoignage authentique du terrain, rendre le reportage plus vivant et renforcer la crédibilité scientifique.',
						mark: '1.0'
					}
				],
				refPrompt: '3) À quoi renvoient les termes soulignés ? a) cette nouvelle phase (§2)   b) les jeunes plants (§3) — puis relevez un substitut lexical du « Barrage Vert » dans le §3.',
				refAnswer: 'a) cette nouvelle phase (§2) : la relance actuelle du Barrage Vert.   b) les jeunes plants (§3) : les nouveaux arbustes plantés. Substitut lexical (§3) : « cette muraille écologique ».',
				viseeHeader: '4) Ce texte appartient au genre du :',
				viseeOptions: [
					'Reportage écologique à visée informative et valorisante',
					'Réquisitoire dénonçant la plantation d’arbres en Algérie',
					'Compte rendu critique d’un roman policier'
				],
				viseeCorrect: 'Reportage écologique à visée informative et valorisante',
				quizStem: 'Dans le reportage sur le Barrage Vert, comment la relance actuelle se distingue-t-elle des plantations anciennes ?',
				quizCorrect: 'Elle privilégie la biodiversité avec des espèces locales utiles comme le pistachier de l’Atlas, l’olivier et le caroubier',
				quizDistractors: [
					{
						text: 'Elle remplace tous les arbres par des bâtiments industriels',
						diagnosticFeedback: 'Le projet vise au contraire le reboisement écologique et la protection des sols.'
					},
					{
						text: 'Elle utilise exclusivement une seule variété d’arbre importée',
						diagnosticFeedback: 'Le texte souligne précisément la fin de la monoculture au profit d’espèces locales variées.'
					},
					{
						text: 'Elle interdit toute irrigation des jeunes plants',
						diagnosticFeedback: 'Des bassins de rétention d’eau de pluie irriguent les jeunes plants durant leurs deux premiers étés.'
					}
				],
				quizExplanation: 'الفقرة الثانية توضح أن المرحلة الجديدة تعطي الأولوية للتنوع البيولوجي بغرس أشجار محلية نافعة (الفستق الأطلسي والزيتون والخروب).'
			},
			{
				title: 'Vallée du M’Zab : le génie hydraulique au cœur du désert',
				source: 'Reportage — Carnets du Patrimoine Algérien',
				paragraphs: [
					'À six cents kilomètres au sud d’Alger, les cinq ksour de la Vallée du M’Zab dominent une palmeraie étonnamment verdoyante au milieu d’un plateau rocheux aride. Dès l’aube, sur les hauteurs de Béni Isguen, nous accompagnons un spécialiste du patrimoine hydraulique qui vérifie l’état des anciens canaux.',
					'Depuis des siècles, les habitants ont conçu un système ingénieux de digues, de rigoles et de répartiteurs en pierre afin de capter la moindre crue de l’oued. Le spécialiste nous confie avec fierté : « Ici, pas une goutte de pluie ne se perd. L’eau est répartie équitablement entre tous les jardins, puis [[elle]] recharge la nappe phréatique souterraine. »',
					'Aujourd’hui encore, des ingénieurs universitaires viennent observer [[ce]] modèle ancestral qui associe solidarité communautaire et architecture bioclimatique. À l’avenir, ces savoirs traditionnels inspireront des solutions durables pour la gestion de l’eau dans toutes les régions sahariennes.'
				],
				glossary: [
					{ term: 'crue', meaning: 'montée rapide des eaux d’un oued après de fortes pluies' },
					{ term: 'nappe phréatique', meaning: 'réserve naturelle d’eau douce stockée dans le sous-sol' }
				],
				tfItems: [
					{
						q: 'a) La Vallée du M’Zab se situe à environ six cents kilomètres au sud d’Alger.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'b) Le système hydraulique du M’Zab laisse l’eau des crues se perdre dans le désert.',
						a: 'Faux',
						c: 'Des digues, rigoles et répartiteurs captent la moindre crue pour irriguer les jardins et recharger la nappe.',
						mark: '0.5'
					},
					{
						q: 'c) Le partage de l’eau entre les jardins obéit à une règle d’équité communautaire.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'd) Des ingénieurs modernes s’intéressent toujours à ce savoir-faire traditionnel.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) Relevez deux éléments qui assurent l’ancrage spatio-temporel dans le premier paragraphe.',
						a: 'Lieu : À six cents kilomètres au sud d’Alger / Vallée du M’Zab / sur les hauteurs de Béni Isguen. Temps : Dès l’aube.',
						mark: '1.0'
					},
					{
						q: 'b) Quelles sont les deux fonctions de l’eau de crue captée par les canaux du M’Zab (§2) ?',
						a: 'Elle est répartie équitablement entre tous les jardins, puis elle recharge la nappe phréatique souterraine.',
						mark: '1.0'
					},
					{
						q: 'c) Quelle est la valeur du présent employé dans « nous accompagnons un spécialiste qui vérifie l’état des anciens canaux » (§1) ?',
						a: 'C’est le présent de reportage (d’actualisation), qui plonge le lecteur directement au cœur de la scène observée.',
						mark: '1.0'
					}
				],
				refPrompt: '3) À quoi renvoient les termes soulignés ? a) elle (§2)   b) ce modèle ancestral (§3)',
				refAnswer: 'a) elle (§2) : l’eau (de crue).   b) ce modèle ancestral (§3) : le système hydraulique traditionnel de la Vallée du M’Zab.',
				viseeHeader: '4) Quelle est la visée communicative principale de ce reportage ?',
				viseeOptions: [
					'Faire découvrir et valoriser le génie hydraulique et écologique de la Vallée du M’Zab',
					'Démontrer que le Sahara ne possède aucun patrimoine architectural',
					'Expliquer uniquement les règles de la géométrie dans l’espace'
				],
				viseeCorrect: 'Faire découvrir et valoriser le génie hydraulique et écologique de la Vallée du M’Zab',
				quizStem: 'Dans le reportage sur la Vallée du M’Zab, pourquoi des ingénieurs universitaires étudient-ils encore ce système ancien ?',
				quizCorrect: 'Parce qu’il combine partage équitable, gestion durable de l’eau et architecture bioclimatique inspirante pour l’avenir',
				quizDistractors: [
					{
						text: 'Parce qu’ils veulent détruire les palmeraies pour construire des usines',
						diagnosticFeedback: 'Au contraire, ils admirent et étudient ce modèle écologique durable.'
					},
					{
						text: 'Parce que la région reçoit de la pluie chaque semaine de l’année',
						diagnosticFeedback: 'Le plateau est aride, ce qui rend justement ce système de captage des crues si ingénieux.'
					},
					{
						text: 'Parce que les canaux fonctionnent uniquement grâce au pétrole',
						diagnosticFeedback: 'Il s’agit d’un système hydraulique gravitaire ancestral en pierre.'
					}
				],
				quizExplanation: 'الفقرة الثالثة تبيّن أن هذا النموذج التراثي يجمع التضامن الاجتماعي والعمارة البيئية وإدارة الماء المستدامة.'
			},
			{
				title: 'Adrar : au cœur d’une centrale solaire saharienne',
				source: 'Reportage — Journal des Technologies Vertes',
				paragraphs: [
					'À la sortie d’Adrar, sous un ciel d’un bleu limpide, des milliers de panneaux photovoltaïques s’étendent à perte de vue comme un miroir géométrique face au soleil. En cette matinée d’automne, l’équipe de maintenance inspecte attentivement les rangées de capteurs qui alimentent le réseau électrique régional.',
					'Dans la salle de contrôle climatisée, des écrans affichent en temps réel la puissance produite. La chef de station précise aux visiteurs : « Grâce à l’ensoleillement exceptionnel de notre région, [[cette]] installation fournit une électricité propre à des milliers de foyers tout en économisant chaque jour d’importantes quantités de gaz naturel. »',
					'Des jeunes diplômés des universités algériennes assurent désormais l’entretien et le suivi numérique de [[la]] centrale. Bientôt, de nouveaux parcs hybrides associeront solaire et stockage intelligent pour accompagner durablement le développement du Grand Sud.'
				],
				glossary: [
					{ term: 'limpide', meaning: 'parfaitement clair et sans nuage' },
					{ term: 'hybride', meaning: 'qui combine deux sources ou deux technologies complémentaires' }
				],
				tfItems: [
					{
						q: 'a) La centrale solaire décrite dans le reportage est implantée près d’Adrar.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'b) La centrale consomme de grandes quantités de charbon pour fonctionner.',
						a: 'Faux',
						c: 'Elle utilise l’ensoleillement pour produire une électricité propre et économise du gaz naturel.',
						mark: '0.5'
					},
					{
						q: 'c) Des écrans permettent de suivre la production électrique en temps réel.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'd) De jeunes diplômés algériens assurent la maintenance et le suivi numérique du site.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) Relevez dans le premier paragraphe l’ancrage spatio-temporel du reportage.',
						a: 'Lieu : À la sortie d’Adrar. Temps : En cette matinée d’automne.',
						mark: '1.0'
					},
					{
						q: 'b) Quel double avantage écologique et énergétique souligne la chef de station (§2) ?',
						a: 'Fournir une électricité propre à des milliers de foyers et économiser chaque jour d’importantes quantités de gaz naturel.',
						mark: '1.0'
					},
					{
						q: 'c) Quelle perspective d’avenir est annoncée dans la dernière phrase du reportage (§3) ?',
						a: 'De nouveaux parcs hybrides associeront l’énergie solaire et le stockage intelligent pour le développement durable du Grand Sud.',
						mark: '1.0'
					}
				],
				refPrompt: '3) À quoi renvoient les termes soulignés ? a) cette installation (§2)   b) la centrale (§3)',
				refAnswer: 'a) cette installation (§2) : la centrale solaire photovoltaïque d’Adrar.   b) la centrale (§3) : la centrale solaire d’Adrar.',
				viseeHeader: '4) La visée communicative de ce reportage est de :',
				viseeOptions: [
					'Informer sur une réalisation énergétique propre et valoriser les compétences algériennes',
					'Critiquer la formation des jeunes ingénieurs universitaires',
					'Raconter un voyage imaginaire vers une planète lointaine'
				],
				viseeCorrect: 'Informer sur une réalisation énergétique propre et valoriser les compétences algériennes',
				quizStem: 'Dans le reportage sur la centrale solaire d’Adrar, quel temps verbal est employé dans la chute finale pour évoquer les futurs parcs hybrides ?',
				quizCorrect: 'Le futur simple (associeront)',
				quizDistractors: [
					{
						text: 'L’imparfait de l’indicatif',
						diagnosticFeedback: 'La phrase finale projette le projet dans l’avenir avec « Bientôt... associeront ».'
					},
					{
						text: 'Le plus-que-parfait',
						diagnosticFeedback: 'Le plus-que-parfait marque une antériorité dans le passé.'
					},
					{
						text: 'Le passé simple',
						diagnosticFeedback: 'Le reportage n’emploie pas le passé simple dans sa conclusion d’avenir.'
					}
				],
				quizExplanation: 'الخاتمة (la chute) تستعمل المستقبل البسيط (associeront) مع المؤشر (Bientôt) لإبراز آفاق المشروع.'
			}
		];

		const v = difficulty === 'hard' ? variants[1] : rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			buildFrenchPassageBlock({
				title: v.title,
				paragraphs: v.paragraphs,
				source: v.source,
				glossary: v.glossary
			}),
			{
				type: 'text',
				content: '1) Répondez par Vrai ou Faux selon le reportage (corrigez les affirmations fausses) :'
			},
			{ type: 'true_false', items: v.tfItems },
			{ type: 'text', content: '2) Répondez avec précision aux questions de compréhension :' },
			...v.compQuestions.map((item) => ({
				type: 'text' as const,
				content: item.q,
				answer: item.a,
				mark: item.mark
			})),
			{ type: 'text', content: v.refPrompt, answer: v.refAnswer, mark: '1.0' },
			{
				type: 'multiple_choice',
				groups: [
					{
						header: v.viseeHeader,
						options: v.viseeOptions,
						correct: v.viseeCorrect,
						mark: '1.0'
					}
				]
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizStem,
				questionTextAr: 'اختر الإجابة الصحيحة وفق مضمون الريبورتاج:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.quizExplanation
			},
			sujetExercise: {
				customTitle: 'I. Compréhension de l’écrit',
				points: 7,
				instruction: 'Lisez attentivement ce reportage puis répondez aux questions proposées.',
				content
			},
			hints: [
				'في الريبورتاج ابحث في الفقرة الأولى عن مؤشرات المكان والزمان (ancrage spatio-temporel).',
				'انتبه للفقرة التي تضم الشهادة المباشرة داخل المزدوجتين « ... » ودورها في المصداقية.',
				'تذكّر الفرق بين البديل النحوي (ضمير) والبديل المعجمي (عبارة وصفية كـ cette muraille écologique).'
			],
			solutionStepsAr: [
				'التحقق من العبارات (Vrai / Faux) وتصحيح العبارات الخاطئة.',
				'استخراج المؤشرات الزمانية والمكانية ومضمون الشهادات ووظيفة حاضر الريبورتاج.',
				'تحديد مرجع البدائل الإحالية ثم اختيار النوع والغاية التواصلية للريبورتاج.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [2] Compréhension de l'écrit (7 pts) — Récit d'anticipation scientifique éthique (original algérien halal)
export const tpl2asSciT3CompAnticipationEthique: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2as_sci_t3_comp_anticipation_ethique',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (7 نقاط): قصة الاستشراف العلمي الأخلاقي (واحة 2050، الأقمار الزراعية، الطب الأخلاقي)',
	curriculumLessonId: 'fre_lesson_2as_sci_t3_temps_anticipation',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'Oasis Verte 2050 : la cité solaire autonome',
				source: 'Recueil de récits d’anticipation scientifique — Jeunes Plumes d’Algérie',
				paragraphs: [
					'En 2050, aux portes du Sahara algérien, la jeune ingénieure Amina contemple depuis la terrasse d’observation la cité écologique de « Noor-El-Waha ». Conçue selon les principes de l’architecture bioclimatique du M’Zab et équipée de façades solaires intelligentes, [[cette]] ville de cinquante mille habitants produira bientôt plus d’énergie propre qu’elle n’en consommera.',
					'Sous les allées ombragées, des serres hydroponiques cultivent des légumes frais avec quatre-vingt-dix pour cent d’eau en moins. Dès que les capteurs souterrains auront détecté la moindre variation d’humidité, le réseau d’irrigation s’ajustera automatiquement. Selon les chercheurs du centre local, ce modèle urbain pourrait inspirer de nombreuses cités arides à travers le continent.',
					'Toutefois, les fondateurs ont gravé sur l’entrée de l’institut scientifique une charte morale claire : aucune machine ne remplacera la solidarité humaine ni le respect de la création. Amina sourit : dans [[ce]] futur apaisé, la science reste fidèlement au service de l’homme et de la nature.'
				],
				glossary: [
					{ term: 'hydroponique', meaning: 'culture des plantes hors sol dans une eau riche en nutriments recyclés' },
					{ term: 'bioclimatique', meaning: 'architecture conçue pour tirer profit du climat naturel sans gaspiller d’énergie' }
				],
				tfItems: [
					{
						q: 'a) L’histoire se déroule en 2050 dans une cité écologique aux portes du Sahara algérien.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'b) Les serres hydroponiques consomment beaucoup plus d’eau que l’agriculture classique.',
						a: 'Faux',
						c: 'Elles cultivent des légumes frais avec quatre-vingt-dix pour cent d’eau en moins.',
						mark: '0.5'
					},
					{
						q: 'c) Le réseau d’irrigation s’ajuste automatiquement grâce à des capteurs souterrains.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'd) Dans cette cité, les machines remplacent entièrement les valeurs humaines.',
						a: 'Faux',
						c: 'Une charte morale précise qu’aucune machine ne remplacera la solidarité humaine ni le respect de la création.',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) De quelles deux sources d’inspiration la cité « Noor-El-Waha » tire-t-elle son efficacité énergétique (§1) ?',
						a: 'Elle associe les principes de l’architecture bioclimatique du M’Zab et des façades solaires intelligentes.',
						mark: '1.0'
					},
					{
						q: 'b) Quel principe éthique fondamental est gravé à l’entrée de l’institut scientifique (§3) ?',
						a: 'Aucune machine ne remplacera la solidarité humaine ni le respect de la création : la science reste au service de l’homme et de la nature.',
						mark: '1.0'
					}
				],
				tableInstruction: '3) Classez les formes verbales relevées du texte selon leur temps : produira | auront détecté | pourrait | s’ajustera',
				tableCols: [
					{
						header: 'Futur simple (projection certaine)',
						items: ['produira', 's’ajustera'],
						mark: '0.5'
					},
					{
						header: 'Futur antérieur / Conditionnel présent',
						items: ['auront détecté (futur ant.)', 'pourrait (cond. prés.)'],
						mark: '0.5'
					}
				],
				refPrompt: '4) À quoi renvoient les expressions soulignées ? a) cette ville (§1)   b) ce futur apaisé (§3)',
				refAnswer: 'a) cette ville (§1) : la cité écologique de « Noor-El-Waha ».   b) ce futur apaisé (§3) : l’avenir écologique et éthique imaginé en 2050.',
				viseeHeader: '5) Ce texte est :',
				viseeOptions: [
					'Un récit d’anticipation scientifique éthique imaginant un avenir durable',
					'Un article historique racontant le Moyen Âge',
					'Un compte rendu objectif d’une expérience de chimie'
				],
				viseeCorrect: 'Un récit d’anticipation scientifique éthique imaginant un avenir durable',
				quizStem: 'Dans « Dès que les capteurs souterrains auront détecté la variation, le réseau s’ajustera », quelle relation temporelle relie les deux verbes ?',
				quizCorrect: 'L’action au futur antérieur (auront détecté) s’accomplit avant l’action au futur simple (s’ajustera)',
				quizDistractors: [
					{
						text: 'L’irrigation s’ajuste avant que les capteurs ne détectent quoi que ce soit',
						diagnosticFeedback: 'Le futur antérieur exprime toujours une action antérieure (qui se produit en premier).'
					},
					{
						text: 'Les deux actions appartiennent au passé lointain',
						diagnosticFeedback: 'Il s’agit de deux temps du futur dans un récit d’anticipation.'
					},
					{
						text: 'Le futur antérieur exprime ici un regret du passé',
						diagnosticFeedback: 'Un regret du passé s’exprime au conditionnel passé, non au futur antérieur.'
					}
				],
				quizExplanation: 'الـ futur antérieur (auront détecté) يعبّر عن الحدث الأول الذي يكتمل قبل وقوع الحدث الثاني في الـ futur simple (s’ajustera).'
			},
			{
				title: 'Alsat-Agri 2045 : des yeux orbitaux pour protéger les forêts',
				source: 'Nouvelles Scientifiques du Futur — Édition Lycéenne',
				paragraphs: [
					'En juillet 2045, depuis le centre spatial d’Oran, l’ingénieur Karim suit en silence la trajectoire d’Alsat-Agri, une constellation de microsatellites conçue par des chercheurs algériens. Grâce à des capteurs thermiques très fins, [[elle]] surveille en continu les massifs forestiers de l’Atlas et les plaines céréalières du pays.',
					'Dès qu’un satellite aura repéré une hausse anormale de température dans un bois, un signal chiffré parviendra en moins de cinq secondes aux gardes forestiers locaux. Des drones d’observation pourraient également cartographier la zone afin de guider rapidement les secours et sauver des milliers d’hectares de cèdres et de chênes-lièges.',
					'Pour Karim et [[son]] équipe, la haute technologie n’a de sens véritable que lorsqu’elle protège la vie et préserve le bien commun. En 2045, l’espace n’est plus une course orgueilleuse, mais un bouclier bienveillant au service de la terre.'
				],
				glossary: [
					{ term: 'constellation', meaning: 'ici, ensemble coordonné de plusieurs satellites en orbite' },
					{ term: 'chiffré', meaning: 'codé numériquement pour garantir la sécurité des données' }
				],
				tfItems: [
					{
						q: 'a) Le récit se déroule en 2045 au centre spatial d’Oran.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'b) Les microsatellites Alsat-Agri servent uniquement à observer d’autres galaxies.',
						a: 'Faux',
						c: 'Ils surveillent les massifs forestiers de l’Atlas et les plaines céréalières du pays.',
						mark: '0.5'
					},
					{
						q: 'c) Le signal d’alerte atteint les gardes forestiers en moins de cinq secondes.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'd) Pour Karim, la technologie doit protéger la vie et préserver le bien commun.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) Comment le système Alsat-Agri permet-il de prévenir les incendies de forêt (§2) ?',
						a: 'Dès qu’un satellite repère une hausse anormale de température, il envoie en moins de cinq secondes un signal chiffré aux gardes forestiers, aidés par des drones d’observation.',
						mark: '1.0'
					},
					{
						q: 'b) Quelle conception éthique de la technologie spatiale se dégage du dernier paragraphe ?',
						a: 'La technologie spatiale doit être un bouclier bienveillant qui protège la vie et le bien commun, non une course orgueilleuse.',
						mark: '1.0'
					}
				],
				tableInstruction: '3) Classez les expressions suivantes du texte : aura repéré | parviendra | pourraient cartographier | juillet 2045',
				tableCols: [
					{
						header: 'Ancrage futur / Action future directe',
						items: ['juillet 2045', 'parviendra'],
						mark: '0.5'
					},
					{
						header: 'Antériorité future / Hypothèse prudente',
						items: ['aura repéré (futur ant.)', 'pourraient cartographier (cond.)'],
						mark: '0.5'
					}
				],
				refPrompt: '4) À qui ou à quoi renvoient les termes soulignés ? a) elle (§1)   b) son (§3)',
				refAnswer: 'a) elle (§1) : la constellation de microsatellites Alsat-Agri.   b) son (§3) : l’ingénieur Karim.',
				viseeHeader: '5) Quelle est la visée de ce récit d’anticipation ?',
				viseeOptions: [
					'Imaginer une innovation scientifique future au service de l’écologie et de l’éthique',
					'Prouver que les forêts algériennes n’ont plus besoin de protection',
					'Critiquer la formation des chercheurs algériens'
				],
				viseeCorrect: 'Imaginer une innovation scientifique future au service de l’écologie et de l’éthique',
				quizStem: 'Dans le récit « Alsat-Agri 2045 », pourquoi l’auteur emploie-t-il le conditionnel présent dans « Des drones pourraient cartographier la zone » ?',
				quizCorrect: 'Pour exprimer une possibilité technologique prudente et non une certitude absolue',
				quizDistractors: [
					{
						text: 'Pour raconter une habitude ancienne du siècle dernier',
						diagnosticFeedback: 'Une habitude passée s’exprime à l’imparfait, non au conditionnel présent.'
					},
					{
						text: 'Pour donner un ordre strict aux gardes forestiers',
						diagnosticFeedback: 'Un ordre s’exprime à l’impératif.'
					},
					{
						text: 'Pour indiquer que l’action a déjà échoué dans le passé',
						diagnosticFeedback: 'Le conditionnel présent exprime ici une éventualité future.'
					}
				],
				quizExplanation: 'الشرطي الحاضر (pourraient) في الاستشراف العلمي يعبّر عن إمكانية مستقبلية محتملة وحذرة.'
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			buildFrenchPassageBlock({
				title: v.title,
				paragraphs: v.paragraphs,
				source: v.source,
				glossary: v.glossary
			}),
			{
				type: 'text',
				content: '1) Dites si les affirmations suivantes sont Vraies ou Fausses selon le texte (justifiez les réponses fausses) :'
			},
			{ type: 'true_false', items: v.tfItems },
			{ type: 'text', content: '2) Répondez aux questions suivantes à partir du texte :' },
			...v.compQuestions.map((item) => ({
				type: 'text' as const,
				content: item.q,
				answer: item.a,
				mark: item.mark
			})),
			{ type: 'text', content: v.tableInstruction },
			buildFrenchClassificationTableBlock({ columns: v.tableCols }),
			{ type: 'text', content: v.refPrompt, answer: v.refAnswer, mark: '1.0' },
			{
				type: 'multiple_choice',
				groups: [
					{
						header: v.viseeHeader,
						options: v.viseeOptions,
						correct: v.viseeCorrect,
						mark: '1.0'
					}
				]
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizStem,
				questionTextAr: 'اختر الإجابة الصحيحة وفق مضمون قصة الاستشراف العلمي:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.quizExplanation
			},
			sujetExercise: {
				customTitle: 'I. Compréhension de l’écrit',
				points: 7,
				instruction: 'Lisez attentivement ce récit d’anticipation scientifique puis répondez aux questions.',
				content
			},
			hints: [
				'قصة الاستشراف العلمي (anticipation) تحدد تاريخا مستقبليا (2045 / 2050) وتدمج معطيات علمية مع بعد أخلاقي.',
				'ميّز في جدول الأزمنة بين المستقبل البسيط (توقع مباشر) والمستقبل الأسبق (الحدث الأول) والشرطي الحاضر (احتمال حذر).',
				'استخرج القيم الأخلاقية من الفقرة الأخيرة بعبارات واضحة وموجزة.'
			],
			solutionStepsAr: [
				'فحص عبارات Vrai / Faux مع تبرير الخاطئة منها من النص.',
				'استخراج العناصر العلمية والأخلاقية وتصنيف أزمنة الاستشراف في الجدول.',
				'تحديد مرجع البدائل المسطرة ثم اختيار نوع النص وغايته.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [3] Fonctionnement de la langue (7 pts) — Discours rapporté (direct/indirect) et verbes introducteurs
export const tpl2asSciT3ExpDiscoursRapporte: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2as_sci_t3_exp_discours_rapporte',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'grammaire_syntaxe',
	titleAr: 'البناء اللغوي (7 نقاط): الكلام المنقول (المباشر وغير المباشر)، مطابقة الأزمنة وأفعال التقديم',
	curriculumLessonId: 'fre_lesson_2as_sci_t3_discours_rapporte',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				transposeItems: [
					{
						q: 'a) L’ingénieur forestier a déclaré : « Aujourd’hui, nous plantons deux mille oliviers sur cette parcelle. »\n   Transposez au discours indirect :',
						a: 'L’ingénieur forestier a déclaré que ce jour-là, ils plantaient deux mille oliviers sur cette parcelle.',
						mark: '0.75'
					},
					{
						q: 'b) La technicienne a affirmé : « La centrale solaire produira davantage d’électricité demain. »\n   Transposez au discours indirect :',
						a: 'La technicienne a affirmé que la centrale solaire produirait davantage d’électricité le lendemain.',
						mark: '0.75'
					},
					{
						q: 'c) Le journaliste a demandé au guide : « Avez-vous restauré les anciens canaux l’an dernier ? »\n   Transposez au discours indirect :',
						a: 'Le journaliste a demandé au guide s’il avait (ou : s’ils avaient) restauré les anciens canaux l’année précédente.',
						mark: '0.75'
					},
					{
						q: 'd) Le responsable a conseillé aux visiteurs : « Respectez la propreté de l’oasis ! »\n   Transposez au discours indirect :',
						a: 'Le responsable a conseillé aux visiteurs de respecter la propreté de l’oasis.',
						mark: '0.75'
					}
				],
				verbsItems: [
					{
						q: 'a) « Quand ce parc solaire sera-t-il inauguré ? », dit le reporter. (remplacez « dit » par : interroge / affirme / recommande)',
						a: 'interroge (ou : demande).',
						mark: '0.5'
					},
					{
						q: 'b) « N’oubliez jamais de vérifier la pression des membranes », dit l’ingénieur. (remplacez « dit » par : nie / recommande / s’étonne)',
						a: 'recommande (ou : conseille).',
						mark: '0.5'
					},
					{
						q: 'c) « Quelle oasis verdoyante au milieu du désert ! », dit le voyageur. (remplacez « dit » par : s’exclame / ordonne / murmure)',
						a: 's’exclame.',
						mark: '0.5'
					},
					{
						q: 'd) « Les capteurs fonctionnent avec une précision remarquable », dit le chercheur. (remplacez « dit » par : questionne / affirme / supplie)',
						a: 'affirme (ou : précise).',
						mark: '0.5'
					}
				],
				reversePrompt:
					'3) Transposez les deux phrases suivantes du discours INDIRECT au discours DIRECT (soignez la ponctuation) :\na) Le chercheur a expliqué qu’ils avaient achevé les mesures la veille.\nb) L’étudiante a demandé à son professeur ce qu’elle devait préparer pour le reportage.',
				reverseAnswer:
					'a) Le chercheur a expliqué : « Nous avons achevé les mesures hier. » (1.0 pt)\nb) L’étudiante a demandé à son professeur : « Que dois-je (ou : Qu’est-ce que je dois) préparer pour le reportage ? » (1.0 pt)',
				quizStem: 'Transposez au discours indirect : Le guide a expliqué aux lycéens : « Nous avons capté une forte crue hier ici. »',
				quizCorrect: 'Le guide a expliqué aux lycéens qu’ils avaient capté une forte crue la veille là-bas.',
				quizDistractors: [
					{
						text: 'Le guide a expliqué aux lycéens qu’ils ont capté une forte crue hier ici.',
						diagnosticFeedback: 'Le verbe introducteur est au passé (a expliqué) : il faut transformer le passé composé en plus-que-parfait et adapter « hier / ici ».'
					},
					{
						text: 'Le guide a expliqué aux lycéens s’ils avaient capté une forte crue la veille là-bas.',
						diagnosticFeedback: 'La phrase est déclarative et non interrogative : il faut « que » et non « si ».'
					},
					{
						text: 'Le guide a expliqué aux lycéens qu’ils capteraient une forte crue le lendemain là-bas.',
						diagnosticFeedback: '« avons capté » est un passé composé (devenant plus-que-parfait), pas un futur.'
					}
				],
				quizExplanation: 'مع فعل التقديم الماضي (a expliqué): الماضي المركب يصبح plus-que-parfait (avaient capté)، و hier تصبح la veille، و ici تصبح là-bas.'
			},
			{
				transposeItems: [
					{
						q: 'a) Le chercheur a précisé : « Notre satellite transmet des images précises aujourd’hui. »\n   Transposez au discours indirect :',
						a: 'Le chercheur a précisé que leur satellite transmettait des images précises ce jour-là.',
						mark: '0.75'
					},
					{
						q: 'b) Le maire a annoncé : « Nous inaugurerons un nouveau bassin de rétention demain. »\n   Transposez au discours indirect :',
						a: 'Le maire a annoncé qu’ils inaugureraient un nouveau bassin de rétention le lendemain.',
						mark: '0.75'
					},
					{
						q: 'c) Le reporter a demandé à l’architecte : « Qu’est-ce que vous admirez dans les maisons du M’Zab ? »\n   Transposez au discours indirect :',
						a: 'Le reporter a demandé à l’architecte ce qu’il admirait dans les maisons du M’Zab.',
						mark: '0.75'
					},
					{
						q: 'd) Le médecin a recommandé à l’équipe : « Vérifiez toujours les données avec discernement ! »\n   Transposez au discours indirect :',
						a: 'Le médecin a recommandé à l’équipe de vérifier toujours les données avec discernement.',
						mark: '0.75'
					}
				],
				verbsItems: [
					{
						q: 'a) « Cette technique économise la moitié de l’eau », dit l’agronome. (remplacez « dit » par : précise / interdit / doute)',
						a: 'précise.',
						mark: '0.5'
					},
					{
						q: 'b) « Pouvons-nous visiter la salle de contrôle ? », dit l’élève. (remplacez « dit » par : affirme / demande / conclut)',
						a: 'demande.',
						mark: '0.5'
					},
					{
						q: 'c) « Protégez ces jeunes arbustes contre le bétail ! », dit le garde forestier. (remplacez « dit » par : ordonne / s’interroge / avoue)',
						a: 'ordonne (ou : conseille).',
						mark: '0.5'
					},
					{
						q: 'd) « Non, ce projet ne rejette aucun gaz polluant », dit la directrice. (remplacez « dit » par : dément / chuchote / supplie)',
						a: 'dément (ou : réfute).',
						mark: '0.5'
					}
				],
				reversePrompt:
					'3) Transposez ces phrases du discours INDIRECT au discours DIRECT :\na) L’ingénieure a assuré que les accumulateurs stockeraient l’énergie solaire le lendemain.\nb) Le professeur a demandé aux élèves s’ils connaissaient le tracé du Barrage Vert.',
				reverseAnswer:
					'a) L’ingénieure a assuré : « Les accumulateurs stockeront l’énergie solaire demain. » (1.0 pt)\nb) Le professeur a demandé aux élèves : « Connaissez-vous (ou : Est-ce que vous connaissez) le tracé du Barrage Vert ? » (1.0 pt)',
				quizStem: 'Transposez au discours indirect : Le journaliste a demandé à l’ingénieure : « Qu’est-ce qui protège les panneaux contre le vent de sable ? »',
				quizCorrect: 'Le journaliste a demandé à l’ingénieure ce qui protégeait les panneaux contre le vent de sable.',
				quizDistractors: [
					{
						text: 'Le journaliste a demandé à l’ingénieure ce que protégeait les panneaux contre le vent de sable.',
						diagnosticFeedback: '« Qu’est-ce qui » (sujet) devient « ce qui », et non « ce que » (objet).'
					},
					{
						text: 'Le journaliste a demandé à l’ingénieure qu’est-ce qui protégeait les panneaux ?',
						diagnosticFeedback: 'On supprime « qu’est-ce qui » et le point d’interrogation au discours indirect.'
					},
					{
						text: 'Le journaliste a demandé à l’ingénieure si protégeait les panneaux contre le vent de sable.',
						diagnosticFeedback: '« si » introduit une interrogation totale (oui/non), pas « qu’est-ce qui ».'
					}
				],
				quizExplanation: 'الاستفهام عن الفاعل « Qu’est-ce qui » يتحول في الكلام غير المباشر إلى « ce qui » مع تحويل الحاضر إلى imparfait.'
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			{ type: 'text', content: '1) Transposez les témoignages suivants du discours direct au discours indirect :' },
			...v.transposeItems.map((item) => ({
				type: 'text' as const,
				content: item.q,
				answer: item.a,
				mark: item.mark
			})),
			{ type: 'text', content: '2) Remplacez le verbe « dit » par le verbe introducteur le plus précis parmi les choix proposés :' },
			...v.verbsItems.map((item) => ({
				type: 'text' as const,
				content: item.q,
				answer: item.a,
				mark: item.mark
			})),
			{ type: 'text', content: v.reversePrompt, answer: v.reverseAnswer, mark: '2.0' }
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizStem,
				questionTextAr: 'اختر التحويل الصحيح إلى الكلام غير المباشر:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.quizExplanation
			},
			sujetExercise: {
				customTitle: 'II. Fonctionnement de la langue',
				points: 7,
				instruction: 'Traitez les activités sur le discours rapporté et les verbes introducteurs.',
				content
			},
			hints: [
				'تحقق أولا من زمن فعل التقديم: إذا كان في الماضي تتغير الأزمنة والظروف الزمانية والمكانية.',
				'الجملة الأمرية تتحول إلى (de + infinitif) والاستفهام الكلي إلى (si) دون علامة استفهام.',
				'عند التحويل العكسي إلى الكلام المباشر لا تنسَ النقطتين « : » والمزدوجتين وعلامة الاستفهام إن وجدت.'
			],
			solutionStepsAr: [
				'تحويل الجمل الأربعة من المباشر إلى غير المباشر مع مراعاة الرابط والضمائر ومطابقة الأزمنة.',
				'اختيار فعل التقديم الأدق دلاليا بدل الفعل العام « dire ».',
				'إجراء التحويل العكسي إلى الكلام المباشر مع إرجاع الأزمنة والترقيم الأصلي.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [4] Fonctionnement de la langue (7 pts) — Temps de l'anticipation, substituts anaphoriques et cohérence textuelle
export const tpl2asSciT3ExpAnticipationCoherence: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2as_sci_t3_exp_anticipation_coherence',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'conjugaison_temps',
	titleAr: 'البناء اللغوي (7 نقاط): أزمنة الاستشراف (المستقبل البسيط، الشرطي، المستقبل الأسبق) والبدائل الإحالية والاتساق النصي',
	curriculumLessonId: 'fre_lesson_2as_sci_t3_temps_anticipation',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				tenseItems: [
					{
						q: 'a) En 2050, les cités sahariennes (produire) ........ toute leur électricité grâce au soleil. (futur simple)',
						a: 'produiront.',
						mark: '0.75'
					},
					{
						q: 'b) Selon les projections, de nouveaux accumulateurs propres (pouvoir) ........ stocker l’énergie pendant une semaine. (conditionnel présent — hypothèse)',
						a: 'pourraient.',
						mark: '0.75'
					},
					{
						q: 'c) Dès que les capteurs (détecter) ........ un départ de feu, les secours recevront l’alerte. (futur antérieur)',
						a: 'auront détecté.',
						mark: '0.75'
					},
					{
						q: 'd) Quand les équipes d’ingénieurs (arriver) ........ sur le site, les tests commenceront. (futur antérieur — attention à l’accord)',
						a: 'seront arrivées.',
						mark: '0.75'
					}
				],
				anaphoraItems: [
					{
						q: 'a) Les touristes visitent la Vallée du M’Zab ; les touristes admirent la gestion de l’eau de la Vallée du M’Zab.\n   Évitez les répétitions grâce aux pronoms « ils » et « en » :',
						a: 'Les touristes visitent la Vallée du M’Zab ; ils en admirent la gestion de l’eau.',
						mark: '0.5'
					},
					{
						q: 'b) Les forestiers se rendent sur les Hauts Plateaux ; les forestiers plantent des oliviers sur les Hauts Plateaux.\n   Évitez les répétitions grâce à « ils » et « y » :',
						a: 'Les forestiers se rendent sur les Hauts Plateaux ; ils y plantent des oliviers.',
						mark: '0.5'
					},
					{
						q: 'c) Le médecin contrôle le robot chirurgical ; le robot chirurgical assure une grande précision.\n   Remplacez le second groupe par « ce dernier » :',
						a: 'Le médecin contrôle le robot chirurgical ; ce dernier assure une grande précision.',
						mark: '0.5'
					},
					{
						q: 'd) Le Barrage Vert protège les sols. Remplacez « Le Barrage Vert » dans la phrase suivante par un substitut lexical : « ........ s’étend d’ouest en est. »',
						a: 'Cette muraille végétale (ou : Cette ceinture forestière / Ce rempart écologique) s’étend d’ouest en est.',
						mark: '0.5'
					}
				],
				classPrompt:
					'3) Classez les substituts suivants dans le tableau : celui-ci | cette perle saharienne | en | cet engin spatial',
				classCols: [
					{ header: 'Substituts grammaticaux', items: ['celui-ci', 'en'], mark: '0.5' },
					{ header: 'Substituts lexicaux', items: ['cette perle saharienne', 'cet engin spatial'], mark: '0.5' }
				],
				reorderPrompt:
					'4) Réordonnez les phrases suivantes pour reconstituer un extrait cohérent de reportage :\na) Un ingénieur local y explique comment cette eau est partagée équitablement entre les jardins.\nb) Dès l’aube, nous arrivons dans la palmeraie de Béni Isguen, au cœur du M’Zab.\nc) En quittant cette oasis exemplaire, nous mesurons combien ce patrimoine inspirera les villes durables de demain.\nd) Sur place, nous découvrons d’ingénieux canaux en pierre destinés à capter les crues.',
				reorderAnswer: 'Ordre cohérent : b - d - a - c.',
				quizStem: 'Complétez correctement les deux verbes : « Lorsque la station ........ l’eau de mer, le réseau ........ les villages voisins. » (filtrer / alimenter)',
				quizCorrect: 'aura filtré / alimentera',
				quizDistractors: [
					{
						text: 'filtrera / aura alimenté',
						diagnosticFeedback: 'La filtration se produit en premier (futur antérieur : aura filtré), puis l’alimentation (futur simple : alimentera).'
					},
					{
						text: 'avait filtré / alimenterait',
						diagnosticFeedback: 'Ces temps ne conviennent pas à une projection directe introduite par « Lorsque » au futur.'
					},
					{
						text: 'sera filtrée / alimenterait',
						diagnosticFeedback: 'Le verbe « filtrer » ici est actif avec COD (l’eau de mer) : auxiliaire avoir -> aura filtré.'
					}
				],
				quizExplanation: 'التصفية تقع أولا فتُصرف في الـ futur antérieur (aura filtré)، والتزويد يقع بعدها فيُصرف في الـ futur simple (alimentera).'
			},
			{
				tenseItems: [
					{
						q: 'a) D’ici vingt ans, les chercheurs algériens (voir) ........ naître des fermes solaires intelligentes. (futur simple)',
						a: 'verront.',
						mark: '0.75'
					},
					{
						q: 'b) La télémédecine (permettre) ........ probablement d’accompagner chaque village isolé en quelques minutes. (conditionnel présent)',
						a: 'permettrait.',
						mark: '0.75'
					},
					{
						q: 'c) Aussitôt que le satellite (transmettre) ........ la carte thermique, les équipes interviendront. (futur antérieur)',
						a: 'aura transmis.',
						mark: '0.75'
					},
					{
						q: 'd) Quand les pluies d’automne (tomber) ........ sur le plateau, les bassins se rempliront. (futur antérieur — attention à l’accord)',
						a: 'seront tombées.',
						mark: '0.75'
					}
				],
				anaphoraItems: [
					{
						q: 'a) Les ingénieurs travaillent à Adrar ; les ingénieurs mesurent le rendement solaire à Adrar.\n   Évitez les répétitions avec « ils » et « y » :',
						a: 'Les ingénieurs travaillent à Adrar ; ils y mesurent le rendement solaire.',
						mark: '0.5'
					},
					{
						q: 'b) La pépinière fournit des oliviers ; les volontaires plantent des milliers d’oliviers.\n   Évitez la répétition avec le pronom « en » :',
						a: 'La pépinière fournit des oliviers ; les volontaires en plantent des milliers.',
						mark: '0.5'
					},
					{
						q: 'c) Le guide accompagne la chercheuse ; la chercheuse étudie les digues anciennes.\n   Remplacez le second nom par « cette dernière » :',
						a: 'Le guide accompagne la chercheuse ; cette dernière étudie les digues anciennes.',
						mark: '0.5'
					},
					{
						q: 'd) Alsat-Agri surveille les forêts. Proposez un substitut lexical pour compléter : « ........ envoie des alertes rapides. »',
						a: 'Ce satellite algérien (ou : Cet œil orbital / Cet engin spatial) envoie des alertes rapides.',
						mark: '0.5'
					}
				],
				classPrompt:
					'3) Classez les substituts suivants dans le tableau : leur | ce rempart vert | y | cette cité solaire',
				classCols: [
					{ header: 'Substituts grammaticaux', items: ['leur', 'y'], mark: '0.5' },
					{ header: 'Substituts lexicaux', items: ['ce rempart vert', 'cette cité solaire'], mark: '0.5' }
				],
				reorderPrompt:
					'4) Réordonnez les phrases suivantes pour obtenir un paragraphe d’anticipation cohérent :\na) Dès qu’elles auront stocké le surplus d’électricité, le quartier s’éclairera toute la nuit sans aucune pollution.\nb) En 2048, cette nouvelle école écologique de Tamanrasset fonctionnera entièrement grâce à l’énergie propre.\nc) Ainsi, les élèves apprendront les sciences dans un lieu respectueux de l’environnement.\nd) Ses toitures couvertes de cellules solaires alimenteront les laboratoires et les bornes de stockage souterraines.',
				reorderAnswer: 'Ordre cohérent : b - d - a - c.',
				quizStem: 'Dans « Les volontaires visitent la pépinière de Djelfa ; ils ........ choisissent des arbustes adaptés et ........ plantent des centaines », quels pronoms complètent exactement les deux vides ?',
				quizCorrect: 'y / en',
				quizDistractors: [
					{
						text: 'en / y',
						diagnosticFeedback: 'On choisit DANS la pépinière (lieu -> y), et on plante des centaines D’arbustes (de + nom -> en).'
					},
					{
						text: 'leur / les',
						diagnosticFeedback: '« leur » renvoie à des personnes (à + personnes) et « les » ne se combine pas avec « des centaines ».'
					},
					{
						text: 'y / les',
						diagnosticFeedback: 'Avec une quantité indéterminée (des centaines), on emploie « en » et non « les ».'
					}
				],
				quizExplanation: 'الضمير « y » يعوّض المكان (dans la pépinière)، والضمير « en » يعوّض المعدود المسبوق بكمية (des centaines d’arbustes).'
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			{ type: 'text', content: '1) Conjuguez les verbes entre parenthèses au temps demandé (futur simple, conditionnel présent ou futur antérieur) :' },
			...v.tenseItems.map((item) => ({
				type: 'text' as const,
				content: item.q,
				answer: item.a,
				mark: item.mark
			})),
			{ type: 'text', content: '2) Assurez la cohérence textuelle en remplaçant les répétitions par le substitut demandé :' },
			...v.anaphoraItems.map((item) => ({
				type: 'text' as const,
				content: item.q,
				answer: item.a,
				mark: item.mark
			})),
			{ type: 'text', content: v.classPrompt },
			buildFrenchClassificationTableBlock({ columns: v.classCols }),
			{ type: 'text', content: v.reorderPrompt, answer: v.reorderAnswer, mark: '1.0' }
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizStem,
				questionTextAr: 'اختر الإجابة النحوية والصرفية الصحيحة:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.quizExplanation
			},
			sujetExercise: {
				customTitle: 'II. Fonctionnement de la langue',
				points: 7,
				instruction: 'Effectuez les exercices de conjugaison (anticipation) et de cohérence textuelle (substituts et ordre logique).',
				content
			},
			hints: [
				'في الـ futur antérieur مع المساعد être (arriver, tomber)، لا تنسَ مطابقة اسم المفعول مع الفاعل.',
				'الضمير y يعوّض المكان أو (à + شيء)، والضمير en يعوّض (de + شيء) أو اسما مسبوقا بكمية.',
				'في ترتيب الجمل استعن بالمؤشر الزمني الافتتاحي (Dès l’aube / En 2048) والبدائل الإحالية والرابط الختامي.'
			],
			solutionStepsAr: [
				'تصريف أزمنة الاستشراف الثلاثة مع ضبط الجذور غير المنتظمة والتوافق.',
				'استعمال البدائل النحوية (y, en, ce dernier) والمعجمية لتفادي التكرار.',
				'تصنيف البدائل في الجدول ثم ترتيب الجمل لتشكيل فقرة متسقة.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [5] Production écrite (6 pts) — Sujet 1 (Reportage sur l'Algérie) + Sujet 2 (Récit d'anticipation scientifique éthique)
export const tpl2asSciT3ProdReportageAnticipation: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2as_sci_t3_prod_reportage_anticipation',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'production_ecrite',
	titleAr: 'الإنتاج الكتابي (6 نقاط): تحرير ريبورتاج علمي/بيئي حول الجزائر أو قصة استشراف علمي أخلاقي',
	curriculumLessonId: 'fre_lesson_2as_sci_t3_rediger_reportage_algerie',
	defaultPoints: 6,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				sujetUnTitle: 'Sujet 1 (Reportage guidé sur un projet écologique en Algérie) :',
				sujetUnPrompt:
					'Rédigez un court reportage scientifique et écologique (12 à 16 lignes) pour la revue de votre lycée afin de faire découvrir la relance du Barrage Vert sur les Hauts Plateaux algériens.',
				sujetUnNotes: [
					'Donner un titre accrocheur et un chapeau de deux phrases (Qui, Quoi, Où, Quand)',
					'Situer la scène sur le terrain (ancrage spatio-temporel) et décrire au présent de reportage',
					'Intégrer le témoignage d’un ingénieur forestier au discours direct ou indirect',
					'Employer des substituts anaphoriques variés pour éviter la répétition de « Barrage Vert »',
					'Terminer par une chute optimiste au futur simple sur l’impact durable du projet'
				],
				sujetDeuxPrompt:
					'Imaginez et rédigez un récit d’anticipation scientifique éthique (12 à 16 lignes) décrivant une cité écologique algérienne en 2050 alimentée à l’énergie solaire et guidée par la solidarité humaine. Employez le futur simple, le conditionnel présent et un futur antérieur.',
				modelAnswer:
					'Proposition pour le Sujet 1 (Reportage sur la relance du Barrage Vert) :\nHauts Plateaux : la renaissance verte contre le désert\nDe l’ouest à l’est de l’Algérie, la réhabilitation du Barrage Vert mobilise aujourd’hui chercheurs, forestiers et jeunes citoyens. Ce matin, sur les hauteurs de Djelfa, nous assistons à une vaste opération de reboisement durable.\nSous un vent frais de printemps, les équipes creusent soigneusement les sillons et mettent en terre des milliers de jeunes plants de pistachiers de l’Atlas et d’oliviers. Cette muraille végétale renouvelée ne vise plus seulement à arrêter le sable : elle crée un véritable écosystème productif. Sur place, un ingénieur agronome nous confie : « En choisissant des espèces locales résistantes, nous protégeons les sols tout en aidant les agriculteurs de la région. »\nPlus loin, des techniciens vérifient des bassins de récupération d’eau de pluie qui soutiennent les jeunes arbres durant l’été. D’ici quelques années, ce rempart écologique redonnera vitalité aux terres steppiques et illustrera la réussite d’une écologie scientifique au service du pays.',
				rubricSummary:
					'Respect du genre reportage (titre, chapeau, ancrage, témoignage) (1.5) | Pertinence scientifique et richesse descriptive (1.5) | Cohérence textuelle et substituts anaphoriques (1.5) | Correction des temps, du discours rapporté et de l’orthographe (1.5).',
				quizStem: 'Dans la rédaction d’un reportage sur le Barrage Vert (Sujet 1), quelle structure garantit le respect intégral du genre journalistique ?',
				quizCorrect: 'Un titre accrocheur, un chapeau résumant l’essentiel, une description au présent de reportage, un témoignage de terrain et une chute au futur',
				quizDistractors: [
					{
						text: 'Un texte sans titre ni paragraphe rédigé uniquement au plus-que-parfait',
						diagnosticFeedback: 'Un reportage exige une mise en page journalistique (titre + chapeau) et un présent vivant.'
					},
					{
						text: 'Une simple liste de cinq définitions recopiées d’un manuel de chimie',
						diagnosticFeedback: 'Un reportage raconte et décrit une réalité observée sur le terrain avec des voix vivantes.'
					},
					{
						text: 'Un dialogue imaginaire entre animaux sans ancrage géographique',
						diagnosticFeedback: 'L’ancrage spatio-temporel réel en Algérie est indispensable au reportage.'
					}
				],
				quizExplanation: 'الريبورتاج المتكامل يجمع العنوان الجذاب، التمهيد (chapeau)، الحاضر الميداني، الشهادة الحية، والخاتمة المستشرفة.'
			},
			{
				sujetUnTitle: 'Sujet 1 (Reportage guidé sur les énergies renouvelables ou les oasis du M’Zab) :',
				sujetUnPrompt:
					'Pour la rubrique « Découvrir l’Algérie durable » du site de votre lycée, rédigez un reportage (12 à 16 lignes) consacré soit à une centrale solaire photovoltaïque du Sahara (Adrar), soit au génie hydraulique des oasis de la Vallée du M’Zab (Ghardaïa).',
				sujetUnNotes: [
					'Rédiger un titre valorisant et un chapeau situant précisément la région algérienne choisie',
					'Décrire le site et le travail des ingénieurs ou des habitants au présent de reportage',
					'Rapporter les propos d’un spécialiste ou d’un habitant (discours direct ou indirect avec verbe introducteur précis)',
					'Assurer la cohérence textuelle grâce à des substituts grammaticaux et lexicaux',
					'Conclure sur l’avenir prometteur de ce patrimoine écologique ou énergétique au futur simple'
				],
				sujetDeuxPrompt:
					'Rédigez un récit d’anticipation scientifique éthique (12 à 16 lignes) montrant comment la télémédecine et des satellites écologiques algériens aideront, en 2045, les habitants des zones rurales tout en respectant la dignité humaine.',
				modelAnswer:
					'Proposition pour le Sujet 2 (Récit d’anticipation scientifique éthique — 2045) :\nLa science bienveillante de 2045\nEn octobre 2045, dans un village paisible des Aurès, le docteur Youssef ouvre la station de télémédecine alimentée par des panneaux solaires discrets. Grâce à une connexion satellitaire algérienne à très haut débit, les habitants des zones isolées bénéficieront désormais de diagnostics rapides sans devoir parcourir des centaines de kilomètres.\nDès que les capteurs médicaux auront transmis les analyses d’un patient âgé au centre hospitalier universitaire, une équipe de spécialistes établira en quelques minutes le suivi adapté. Selon les chercheurs du centre national de télémédecine, des assistants robotisés pourraient également préparer les examens techniques courants avec une fiabilité remarquable.\nToutefois, au cœur de ce progrès, la décision finale et l’écoute compatissante resteront toujours humaines. Le docteur Youssef rappelle volontiers à ses jeunes stagiaires que la technologie la plus avancée n’accomplit sa noble mission que lorsqu’elle sert la dignité et le bien-être de chacun.',
				rubricSummary:
					'Respect du genre (reportage ou anticipation éthique) et de la consigne (1.5) | Richesse des idées scientifiques et valeur éthique (1.5) | Emploi exact des temps (futur simple, conditionnel, futur antérieur ou présent de reportage) (1.5) | Cohérence, substituts et maîtrise de la langue (1.5).',
				quizStem: 'Dans un récit d’anticipation scientifique éthique (Sujet 2), quelle combinaison de temps verbaux permet d’exprimer à la fois une certitude future, une antériorité future et une hypothèse prudente ?',
				quizCorrect: 'Le futur simple, le futur antérieur et le conditionnel présent',
				quizDistractors: [
					{
						text: 'L’imparfait, le passé simple et le passé antérieur',
						diagnosticFeedback: 'Ces temps servent à la narration du passé, non à la projection dans le futur.'
					},
					{
						text: 'L’impératif présent et le subjonctif imparfait uniquement',
						diagnosticFeedback: 'Ces modes ne permettent pas d’exprimer une chronologie future complète.'
					},
					{
						text: 'Uniquement l’infinitif passé',
						diagnosticFeedback: 'Un récit d’anticipation exige des verbes conjugués aux temps du futur et du conditionnel.'
					}
				],
				quizExplanation: 'الاستشراف العلمي يوظف المستقبل البسيط (للتوقع المباشر)، والمستقبل الأسبق (للحدث السابق مستقبلا)، والشرطي الحاضر (للاحتمال الحذر).'
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			buildFrenchWrittenProductionBlock({
				sujetUnTitle: v.sujetUnTitle,
				sujetUnPrompt: v.sujetUnPrompt,
				sujetUnNotes: v.sujetUnNotes,
				sujetDeuxPrompt: v.sujetDeuxPrompt,
				modelAnswer: v.modelAnswer,
				rubricSummary: v.rubricSummary,
				mark: '6.0'
			})
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizStem,
				questionTextAr: 'اختر الجواب المنهجي الصحيح للإنتاج الكتابي في المشروع الثالث:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.quizExplanation
			},
			sujetExercise: {
				customTitle: 'III. Production écrite',
				points: 6,
				instruction: 'Traitez au choix l’un des deux sujets proposés en respectant le genre demandé (12 à 16 lignes).',
				content
			},
			hints: [
				'في الريبورتاج (Sujet 1): لا تنسَ العنوان والتمهيد (chapeau) وحاضر الميدان وشهادة مختص وخاتمة بالمستقبل.',
				'في الاستشراف العلمي (Sujet 2): حدد سنة مستقبلية ووظف أزمنة الاستشراف الثلاثة مع إبراز القيمة الأخلاقية للعلم.',
				'تجنب التكرار باستعمال البدائل النحوية والمعجمية وراجع الإملاء وعلامات الترقيم.'
			],
			solutionStepsAr: [
				'اختيار أحد الموضوعين وتنظيم الأفكار وفق خصائص الريبورتاج أو قصة الاستشراف.',
				'دمج الشهادة أو أزمنة الاستشراف والبدائل الإحالية لضمان الاتساق النصي.',
				'مراجعة سلامة اللغة والتنقيط وفق سلم التقييم (6 نقاط).'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

export const TEMPLATES_2AS_SCI_T3: FrenchParameterizedTemplate[] = [
	tpl2asSciT3CompReportageAlgerie,
	tpl2asSciT3CompAnticipationEthique,
	tpl2asSciT3ExpDiscoursRapporte,
	tpl2asSciT3ExpAnticipationCoherence,
	tpl2asSciT3ProdReportageAnticipation
];
