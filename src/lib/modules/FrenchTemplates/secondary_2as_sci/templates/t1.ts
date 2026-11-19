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

// ============================================================================
// 5 Parameterized Templates — 2AS Scientific & Management Shared — Trimester 1
// Projet 1 : Le discours objectivé et la démonstration scientifique
// Split (/20) : 2 comprehension (7 pts) + 2 text_exploration (7 pts) + 1 written_expression (6 pts)
// ============================================================================

// [1] Compréhension de l'écrit (7 pts) — Savants musulmans et démarche scientifique
export const tpl2asSciT1CompDemarcheSavants: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2as_sci_t1_comp_demarche_savants',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (7 نقاط): المنهج التجريبي وإسهامات العلماء المسلمين (ابن الهيثم، الخوارزمي، الزهراوي)',
	curriculumLessonId: 'fre_lesson_2as_sci_t1_procedes_explicatifs',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'Ibn Al-Haytham et la naissance de la méthode expérimentale',
				source: 'Revue Histoire des Sciences et Savoirs',
				paragraphs: [
					'Au XIe siècle, le savant musulman Ibn Al-Haytham a transformé durablement la manière de pratiquer la science. Dans son célèbre traité d’optique, le Kitab Al-Manazir, [[il]] refuse d’accepter une idée sans vérification matérielle. Pour lui, toute affirmation scientifique doit reposer sur l’observation attentive, la formulation d’une hypothèse et le contrôle par l’expérience.',
					'Pour démontrer que la lumière se propage en ligne droite, le savant utilise un dispositif appelé la chambre noire, c’est-à-dire un boîtier obscur percé d’une minuscule ouverture. En plaçant plusieurs bougies devant cet orifice, [[celui-ci]] permet d’observer une image inversée sur la paroi opposée. Il est ainsi prouvé que les rayons lumineux entrent dans l’œil et non l’inverse.',
					'Par cette démarche rigoureuse, Ibn Al-Haytham fonde l’optique moderne et établit les principes universels de la démonstration scientifique : observer, supposer, expérimenter et formuler une loi vérifiable par tous.'
				],
				glossary: [
					{ term: 'orifice', meaning: 'petite ouverture permettant le passage de la lumière' },
					{ term: 'paroi', meaning: 'face intérieure d’une boîte ou d’un mur' }
				],
				tfItems: [
					{
						q: 'a) Ibn Al-Haytham acceptait les anciennes théories sans les vérifier par l’expérience.',
						a: 'Faux',
						c: 'Il refuse d’accepter une idée sans vérification matérielle et exige le contrôle par l’expérience.',
						mark: '0.5'
					},
					{
						q: 'b) La chambre noire est un boîtier obscur percé d’une petite ouverture.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'c) L’expérience des bougies prouve que l’œil envoie des rayons vers les objets.',
						a: 'Faux',
						c: 'Elle prouve au contraire que les rayons lumineux entrent dans l’œil.',
						mark: '0.5'
					},
					{
						q: 'd) La démarche scientifique comprend l’observation, l’hypothèse, l’expérience et la loi.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) Sur quels trois piliers doit reposer toute affirmation scientifique selon Ibn Al-Haytham (§1) ?',
						a: 'Elle doit reposer sur l’observation attentive, la formulation d’une hypothèse et le contrôle par l’expérience.',
						mark: '1.0'
					},
					{
						q: 'b) Quel résultat l’expérience de la chambre noire permet-elle d’établir sur la lumière (§2) ?',
						a: 'Elle prouve que la lumière se propage en ligne droite et que les rayons lumineux entrent dans l’œil.',
						mark: '1.0'
					},
					{
						q: 'c) Relevez dans le deuxième paragraphe un procédé explicatif et nommez-le.',
						a: 'Reformulation : « c’est-à-dire un boîtier obscur percé d’une minuscule ouverture » (ou dénomination : « appelé la chambre noire »).',
						mark: '1.0'
					}
				],
				refPrompt: '3) À qui ou à quoi renvoient les termes soulignés dans le texte ? a) il (§1)   b) celui-ci (§2)',
				refAnswer: 'a) il (§1) : Ibn Al-Haytham.   b) celui-ci (§2) : ce dispositif / la chambre noire.',
				viseeHeader: '4) Quelle est la visée communicative principale de ce texte ?',
				viseeOptions: [
					'Informer et expliquer la démarche scientifique expérimentale d’Ibn Al-Haytham',
					'Raconter un voyage touristique au bord de la mer',
					'Critiquer l’usage des instruments scientifiques en physique'
				],
				viseeCorrect: 'Informer et expliquer la démarche scientifique expérimentale d’Ibn Al-Haytham',
				quizStem: 'Dans le texte sur Ibn Al-Haytham, quel procédé explicatif est introduit par « c’est-à-dire un boîtier obscur percé d’une minuscule ouverture » ?',
				quizCorrect: 'La reformulation',
				quizDistractors: [
					{
						text: 'L’énumération',
						diagnosticFeedback: 'L’énumération cite une suite d’éléments ; ici, « c’est-à-dire » clarifie un terme technique.'
					},
					{
						text: 'La comparaison',
						diagnosticFeedback: 'Aucune analogie avec « comme » ou « semblable à » n’est exprimée ici.'
					},
					{
						text: 'La concession',
						diagnosticFeedback: 'La concession relève de l’argumentation (bien que, malgré), non de l’explication.'
					}
				],
				quizExplanation: 'عبارة « c’est-à-dire » تشرح مصطلح « chambre noire » بصيغة أبسط، وهو أسلوب إعادة الصياغة (la reformulation).'
			},
			{
				title: 'Al-Khwarizmi, fondateur de l’algèbre et des algorithmes',
				source: 'Cahiers Scientifiques du Patrimoine',
				paragraphs: [
					'Au IXe siècle, le mathématicien musulman Al-Khwarizmi rédige un ouvrage fondamental qui donne naissance à une discipline autonome : l’algèbre, c’est-à-dire la science qui permet de résoudre des équations à l’aide de règles logiques générales. Jusqu’alors, les calculs se limitaient à des cas particuliers sans méthode unifiée.',
					'Dans [[son]] traité, Al-Khwarizmi classe méthodiquement les équations du premier et du second degré et démontre chaque solution étape par étape. [[Cette]] approche systématique, fondée sur la clarté du raisonnement et la vérification géométrique, sert à résoudre des problèmes concrets tels que le partage équitable des héritages, l’arpentage des terres agricoles et le commerce.',
					'De plus, ses travaux sur la numération décimale ont donné naissance au mot « algorithme », qui désigne aujourd’hui une suite finie et rigoureuse d’instructions permettant d’effectuer un calcul ou un programme informatique.'
				],
				glossary: [
					{ term: 'arpentage', meaning: 'mesure précise de la superficie d’un terrain' },
					{ term: 'numération décimale', meaning: 'système de calcul fondé sur la base dix et le zéro' }
				],
				tfItems: [
					{
						q: 'a) Avant Al-Khwarizmi, l’algèbre possédait déjà une méthode générale unifiée.',
						a: 'Faux',
						c: 'Les calculs se limitaient auparavant à des cas particuliers sans méthode unifiée.',
						mark: '0.5'
					},
					{
						q: 'b) Al-Khwarizmi a classé les équations du premier et du second degré.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'c) Ses méthodes algébriques n’avaient aucune application dans la vie quotidienne.',
						a: 'Faux',
						c: 'Elles servaient au partage des héritages, à l’arpentage des terres et au commerce.',
						mark: '0.5'
					},
					{
						q: 'd) Le terme « algorithme » tire son origine du nom d’Al-Khwarizmi.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) Quelle définition de l’algèbre est donnée dans le premier paragraphe ?',
						a: 'L’algèbre est la science qui permet de résoudre des équations à l’aide de règles logiques générales.',
						mark: '1.0'
					},
					{
						q: 'b) Citez deux domaines pratiques où la méthode d’Al-Khwarizmi était appliquée (§2).',
						a: 'Le partage équitable des héritages, l’arpentage des terres agricoles et le commerce (deux au choix).',
						mark: '1.0'
					},
					{
						q: 'c) Relevez dans le troisième paragraphe une définition et précisez le verbe introducteur utilisé.',
						a: '« le mot algorithme, qui désigne aujourd’hui une suite finie et rigoureuse d’instructions... » (verbe : désigne).',
						mark: '1.0'
					}
				],
				refPrompt: '3) À qui ou à quoi renvoient les termes soulignés dans le texte ? a) son (§2)   b) Cette (§2)',
				refAnswer: 'a) son (§2) : Al-Khwarizmi.   b) Cette (§2) : la classification méthodique et la démonstration des équations par Al-Khwarizmi.',
				viseeHeader: '4) Ce texte est de type :',
				viseeOptions: [
					'Explicatif à visée informative sur un apport scientifique majeur',
					'Polémique destiné à attaquer les mathématiques modernes',
					'Descriptif présentant un monument touristique'
				],
				viseeCorrect: 'Explicatif à visée informative sur un apport scientifique majeur',
				quizStem: 'Selon le passage sur Al-Khwarizmi, que désigne un algorithme aujourd’hui ?',
				quizCorrect: 'Une suite finie et rigoureuse d’instructions permettant d’effectuer un calcul ou un programme',
				quizDistractors: [
					{
						text: 'Un instrument d’optique utilisé pour mesurer les rayons lumineux',
						diagnosticFeedback: 'Les instruments d’optique relèvent des travaux d’Ibn Al-Haytham, non des algorithmes.'
					},
					{
						text: 'Un procédé aléatoire qui ne nécessite aucune vérification',
						diagnosticFeedback: 'Le texte souligne au contraire le caractère fini et rigoureux des instructions.'
					},
					{
						text: 'Une simple figure géométrique tracée sans calcul',
						diagnosticFeedback: 'Un algorithme est une procédure d’instructions logiques de calcul.'
					}
				],
				quizExplanation: 'الفقرة الثالثة تعرّف الخوارزمية (algorithme) بأنها سلسلة محدودة وصارمة من التعليمات لإنجاز حساب أو برنامج.'
			},
			{
				title: 'Al-Zahrawi et la rigueur scientifique en médecine',
				source: 'Bulletin d’Histoire Médicale',
				paragraphs: [
					'Au Xe siècle, le médecin et chirurgien musulman Al-Zahrawi a rédigé une encyclopédie médicale en trente volumes intitulée Al-Tasrif. [[Cet]] ouvrage de référence est consacré à l’observation clinique, à la pharmacologie et aux techniques chirurgicales fondées sur l’anatomie précise du corps humain.',
					'Al-Zahrawi a conçu et illustré plus de deux cents instruments médicaux, tels que les pinces chirurgicales, les sondes et les fils de suture résorbables. Il est établi que [[son]] insistance sur la propreté des outils et la prudence avant chaque intervention a réduit considérablement les infections postopératoires.',
					'En recommandant aux étudiants de n’opérer qu’après une étude approfondie des organes, ce savant a posé les bases d’une médecine objective, méthodique et respectueuse de la vie humaine.'
				],
				glossary: [
					{ term: 'résorbable', meaning: 'qui disparaît naturellement dans les tissus sans retrait' },
					{ term: 'clinique', meaning: 'fondé sur l’observation directe du patient' }
				],
				tfItems: [
					{
						q: 'a) Al-Tasrif est un court article de deux pages sur la botanique.',
						a: 'Faux',
						c: 'Al-Tasrif est une encyclopédie médicale en trente volumes.',
						mark: '0.5'
					},
					{
						q: 'b) Al-Zahrawi a conçu et dessiné plus de deux cents instruments médicaux.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'c) Le soin apporté à la propreté des outils a aidé à diminuer les infections.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'd) Al-Zahrawi encourageait les étudiants à opérer sans étudier l’anatomie.',
						a: 'Faux',
						c: 'Il recommandait de n’opérer qu’après une étude approfondie des organes.',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) Quels domaines médicaux sont traités dans l’encyclopédie Al-Tasrif (§1) ?',
						a: 'L’observation clinique, la pharmacologie et les techniques chirurgicales fondées sur l’anatomie.',
						mark: '1.0'
					},
					{
						q: 'b) Relevez dans le deuxième paragraphe un procédé d’illustration (exemple) et l’outil qui l’introduit.',
						a: '« tels que les pinces chirurgicales, les sondes et les fils de suture résorbables » (outil : tels que).',
						mark: '1.0'
					},
					{
						q: 'c) Pourquoi l’auteur emploie-t-il la tournure « Il est établi que » dans le deuxième paragraphe ?',
						a: 'Pour assurer l’objectivité du discours scientifique et présenter le fait comme prouvé et vérifié.',
						mark: '1.0'
					}
				],
				refPrompt: '3) À qui ou à quoi renvoient les termes soulignés dans le texte ? a) Cet (§1)   b) son (§2)',
				refAnswer: 'a) Cet (§1) : l’encyclopédie Al-Tasrif.   b) son (§2) : Al-Zahrawi.',
				viseeHeader: '4) Quelle est l’idée générale du texte ?',
				viseeOptions: [
					'Al-Zahrawi a établi une pratique médicale et chirurgicale rigoureuse et méthodique',
					'La médecine ancienne refusait l’usage de tout instrument',
					'L’anatomie n’est pas nécessaire pour former un chirurgien'
				],
				viseeCorrect: 'Al-Zahrawi a établi une pratique médicale et chirurgicale rigoureuse et méthodique',
				quizStem: 'Dans le texte consacré à Al-Zahrawi, quelle est la fonction de la tournure impersonnelle « Il est établi que... » ?',
				quizCorrect: 'Garantir l’objectivité scientifique en présentant un fait comme avéré',
				quizDistractors: [
					{
						text: 'Exprimer une émotion personnelle de l’auteur',
						diagnosticFeedback: 'Une tournure impersonnelle efface au contraire les émotions personnelles.'
					},
					{
						text: 'Formuler un ordre impératif adressé au lecteur',
						diagnosticFeedback: 'Il s’agit d’une constatation objective et non d’un ordre.'
					},
					{
						text: 'Introduire une comparaison poétique',
						diagnosticFeedback: 'Cette tournure appartient au registre scientifique neutre.'
					}
				],
				quizExplanation: 'التركيب غير الشخصي « Il est établi que » يعزّز الحياد والموضوعية في النص العلمي.'
			}
		];

		const v = difficulty === 'hard' ? variants[0] : rng.pick(variants);
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
			{ type: 'text', content: '2) Répondez avec précision aux questions suivantes à partir du texte :' },
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
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizStem,
				questionTextAr: 'اختر الإجابة الصحيحة وفق مضمون النص العلمي:',
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
				instruction: 'Lisez attentivement le texte scientifique ci-dessous puis répondez aux questions.',
				content
			},
			hints: [
				'اقرأ النص العلمي كاملا مع الملاحظات اللغوية (Lexique) قبل الإجابة عن أسئلة Vrai/Faux.',
				'عند استخراج أسلوب تفسيري، حدّد الأداة بدقة (c’est-à-dire, appelé, tels que, désigne).',
				'في مرجع الضمائر (Substituts)، راعِ الجنس والعدد والاسم الأقرب قبله في الفقرة.'
			],
			solutionStepsAr: [
				'التحقق من العبارات (Vrai / Faux) وتصحيح العبارات الخاطئة انطلاقا من النص.',
				'الإجابة الدقيقة والموجزة عن أسئلة الفهم واستخراج الأسلوب التفسيري.',
				'تحديد مرجع الضمائر المسطرة ثم اختيار الغاية التواصلية الصحيحة للنص.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [2] Compréhension de l'écrit (7 pts) — Énergie solaire, santé et technologie durable
export const tpl2asSciT1CompEnergieSante: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2as_sci_t1_comp_energie_sante',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (7 نقاط): الطاقة الشمسية، المناعة الصحية وتحلية المياه بأسلوب علمي موضوعي',
	curriculumLessonId: 'fre_lesson_2as_sci_t1_objectivite_scientifique',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'Comment fonctionne l’énergie solaire photovoltaïque ?',
				source: 'Revue Énergies Propres en Algérie',
				paragraphs: [
					'L’énergie solaire photovoltaïque désigne l’électricité produite directement à partir du rayonnement du soleil. Ce phénomène physique repose sur des cellules fabriquées en silicium, un matériau semi-conducteur abondant dans le sable. Lorsque les particules lumineuses frappent ces cellules, [[elles]] libèrent des électrons et génèrent un courant électrique continu.',
					'Ensuite, un appareil appelé onduleur sert à convertir ce courant continu en courant alternatif compatible avec le réseau domestique. Grâce à un ensoleillement dépassant trois mille heures par an dans le Sahara algérien, il est possible d’alimenter des villes entières en énergie propre et silencieuse.',
					'Par conséquent, le développement de centrales photovoltaïques permet de réduire la consommation d’énergies fossiles tout en diminuant les rejets de dioxyde de carbone. Si l’entretien régulier des panneaux est assuré face à la poussière, [[leur]] rendement reste performant pendant plus de vingt-cinq ans.'
				],
				glossary: [
					{ term: 'silicium', meaning: 'élément chimique extrait du quartz et du sable' },
					{ term: 'onduleur', meaning: 'dispositif électronique transformant le courant continu en courant alternatif' }
				],
				tfItems: [
					{
						q: 'a) Les cellules photovoltaïques sont fabriquées à partir de silicium.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'b) L’onduleur transforme le courant alternatif en énergie thermique.',
						a: 'Faux',
						c: 'Il convertit le courant continu en courant alternatif compatible avec le réseau domestique.',
						mark: '0.5'
					},
					{
						q: 'c) Le Sahara algérien bénéficie de plus de trois mille heures d’ensoleillement par an.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'd) L’énergie photovoltaïque augmente les émissions de dioxyde de carbone.',
						a: 'Faux',
						c: 'Elle permet au contraire de diminuer les rejets de dioxyde de carbone.',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) Comment un courant électrique continu est-il produit dans une cellule photovoltaïque (§1) ?',
						a: 'Lorsque les particules lumineuses frappent les cellules en silicium, elles libèrent des électrons et génèrent un courant continu.',
						mark: '1.0'
					},
					{
						q: 'b) À quelle condition les panneaux solaires conservent-ils un rendement performant pendant plus de vingt-cinq ans (§3) ?',
						a: 'À condition que leur entretien régulier soit assuré face à la poussière.',
						mark: '1.0'
					}
				],
				tableInstruction: '3) Classez les expressions suivantes dans le tableau ci-dessous : « désigne l’électricité produite... » | « sert à convertir ce courant... » | « appelé onduleur » | « permet de réduire la consommation... »',
				tableCols: [
					{
						header: 'Définition / Dénomination',
						items: ['désigne l’électricité produite...', 'appelé onduleur'],
						mark: '0.5'
					},
					{
						header: 'Fonction / Rôle',
						items: ['sert à convertir ce courant...', 'permet de réduire la consommation...'],
						mark: '0.5'
					}
				],
				refPrompt: '4) À quoi renvoient les pronoms soulignés dans le texte ? a) elles (§1)   b) leur (§3)',
				refAnswer: 'a) elles (§1) : les particules lumineuses.   b) leur (§3) : des panneaux (photovoltaïques).',
				viseeHeader: '5) Dans ce texte, l’auteur est :',
				viseeOptions: [
					'Objectif : il explique un mécanisme physique sans employer « je »',
					'Subjectif : il exprime ses sentiments personnels face au soleil',
					'Polémique : il dénonce l’utilisation de l’électricité'
				],
				viseeCorrect: 'Objectif : il explique un mécanisme physique sans employer « je »',
				quizStem: 'Dans le texte sur l’énergie photovoltaïque, quel est le rôle exact de l’onduleur ?',
				quizCorrect: 'Convertir le courant continu en courant alternatif compatible avec le réseau domestique',
				quizDistractors: [
					{
						text: 'Nettoyer automatiquement la poussière sur les panneaux',
						diagnosticFeedback: 'L’entretien contre la poussière est distinct du rôle électrique de l’onduleur.'
					},
					{
						text: 'Extraire le silicium directement du sable du Sahara',
						diagnosticFeedback: 'Le silicium sert à fabriquer les cellules ; l’onduleur transforme le courant.'
					},
					{
						text: 'Produire du dioxyde de carbone pour chauffer les maisons',
						diagnosticFeedback: 'L’énergie solaire est propre et réduit les rejets de CO2.'
					}
				],
				quizExplanation: 'الفقرة الثانية توضح أن المحوّل (onduleur) يحوّل التيار المستمر إلى تيار متناوب ملائم للشبكة المنزلية.'
			},
			{
				title: 'Le système immunitaire : une défense biologique organisée',
				source: 'Revue Santé et Biologie Moderne',
				paragraphs: [
					'Le système immunitaire est l’ensemble des organes, des cellules et des molécules qui protègent l’organisme humain contre les agents pathogènes, tels que les bactéries et les virus. Face à ces menaces invisibles, le corps humain déploie deux lignes de défense complémentaires.',
					'La première barrière est assurée par la peau et les muqueuses, qui empêchent la pénétration directe des microbes. Si un agent étranger franchit [[cet]] obstacle naturel, les globules blancs — appelés aussi leucocytes — interviennent immédiatement pour neutraliser l’intrus et produire des anticorps spécifiques.',
					'Il est prouvé qu’une hygiène rigoureuse, une alimentation équilibrée et un sommeil suffisant renforcent efficacement [[cette]] défense naturelle. En revanche, le manque de repos et la malnutrition affaiblissent les réponses immunitaires et exposent l’organisme aux infections.'
				],
				glossary: [
					{ term: 'agent pathogène', meaning: 'micro-organisme capable de provoquer une maladie' },
					{ term: 'anticorps', meaning: 'protéine produite pour neutraliser un microbe précis' }
				],
				tfItems: [
					{
						q: 'a) Le système immunitaire défend l’organisme contre les bactéries et les virus.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'b) La peau constitue une barrière naturelle contre l’entrée des microbes.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'c) Les leucocytes empêchent l’organisme de fabriquer des anticorps.',
						a: 'Faux',
						c: 'Les globules blancs (leucocytes) neutralisent l’intrus et produisent des anticorps spécifiques.',
						mark: '0.5'
					},
					{
						q: 'd) Une alimentation équilibrée et un bon sommeil renforcent l’immunité.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) Quel est le rôle des globules blancs lorsqu’un microbe franchit la première barrière (§2) ?',
						a: 'Ils interviennent immédiatement pour neutraliser l’intrus et produire des anticorps spécifiques.',
						mark: '1.0'
					},
					{
						q: 'b) Citez deux facteurs qui affaiblissent les réponses immunitaires selon le troisième paragraphe.',
						a: 'Le manque de repos (sommeil insuffisant) et la malnutrition.',
						mark: '1.0'
					}
				],
				tableInstruction: '3) Classez les facteurs suivants selon leur effet sur le système immunitaire : hygiène rigoureuse | malnutrition | sommeil suffisant | manque de repos',
				tableCols: [
					{
						header: 'Facteurs qui renforcent l’immunité',
						items: ['hygiène rigoureuse', 'sommeil suffisant'],
						mark: '0.5'
					},
					{
						header: 'Facteurs qui affaiblissent l’immunité',
						items: ['malnutrition', 'manque de repos'],
						mark: '0.5'
					}
				],
				refPrompt: '4) À quoi renvoient les expressions soulignées ? a) cet obstacle naturel (§2)   b) cette défense naturelle (§3)',
				refAnswer: 'a) cet obstacle naturel (§2) : la première barrière (la peau et les muqueuses).   b) cette défense naturelle (§3) : le système immunitaire.',
				viseeHeader: '5) Le temps verbal dominant dans ce texte est :',
				viseeOptions: [
					'Le présent de vérité générale, propre au discours scientifique',
					'Le passé simple, propre au conte merveilleux',
					'Le futur antérieur, propre au récit d’anticipation'
				],
				viseeCorrect: 'Le présent de vérité générale, propre au discours scientifique',
				quizStem: 'Dans le texte sur le système immunitaire, quel procédé explicatif relie « les globules blancs » à « appelés aussi leucocytes » ?',
				quizCorrect: 'La dénomination',
				quizDistractors: [
					{
						text: 'L’illustration par un exemple',
						diagnosticFeedback: 'Un exemple est introduit par « tels que » ou « par exemple ».'
					},
					{
						text: 'La cause',
						diagnosticFeedback: '« appelés aussi » donne le nom scientifique, non une cause.'
					},
					{
						text: 'L’opposition',
						diagnosticFeedback: 'Il n’y a aucune opposition entre globules blancs et leucocytes ; ce sont deux noms de la même réalité.'
					}
				],
				quizExplanation: 'العبارة « appelés aussi leucocytes » تقدّم الاسم العلمي لخلايا الدم البيضاء، وهو أسلوب التسمية (la dénomination).'
			},
			{
				title: 'Le dessalement de l’eau de mer par osmose inverse',
				source: 'Journal des Sciences Hydriques',
				paragraphs: [
					'Face à la baisse des précipitations dans les régions méditerranéennes, le dessalement de l’eau de mer représente une solution scientifique majeure pour assurer la sécurité hydrique. En Algérie, plusieurs stations côtières appliquent une technologie de pointe appelée l’osmose inverse.',
					'Ce procédé consiste à faire passer l’eau de mer, sous très haute pression, à travers des membranes semi-perméables extrêmement fines. [[Celles-ci]] retiennent les sels minéraux et les impuretés, tandis que seules les molécules d’eau pure parviennent à traverser le filtre. L’eau obtenue est ensuite reminéralisée afin qu’[[elle]] devienne saine et propre à la consommation humaine.',
					'Bien que ce processus exige une énergie électrique importante, le couplage progressif des stations de dessalement avec des centrales solaires permet aujourd’hui d’en réduire le coût énergétique et l’impact environnemental.'
				],
				glossary: [
					{ term: 'sécurité hydrique', meaning: 'disponibilité durable d’une eau potable en quantité suffisante' },
					{ term: 'reminéralisée', meaning: 'enrichie en sels minéraux indispensables à la santé' }
				],
				tfItems: [
					{
						q: 'a) L’osmose inverse utilise des membranes semi-perméables sous haute pression.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'b) Les membranes laissent passer librement tous les sels et les impuretés.',
						a: 'Faux',
						c: 'Elles retiennent les sels minéraux et les impuretés et ne laissent passer que les molécules d’eau pure.',
						mark: '0.5'
					},
					{
						q: 'c) L’eau dessalée est reminéralisée avant d’être distribuée aux consommateurs.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'd) Associer le dessalement à l’énergie solaire réduit son impact environnemental.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) Pourquoi l’Algérie recourt-elle au dessalement de l’eau de mer (§1) ?',
						a: 'Pour faire face à la baisse des précipitations et assurer la sécurité hydrique.',
						mark: '1.0'
					},
					{
						q: 'b) Comment les ingénieurs réduisent-ils le coût énergétique de ce procédé (§3) ?',
						a: 'En couplant progressivement les stations de dessalement avec des centrales solaires.',
						mark: '1.0'
					}
				],
				tableInstruction: '3) Classez ces étapes du dessalement selon leur ordre logique : reminéralisation de l’eau | passage sous haute pression dans la membrane | rétention des sels | eau potable distribuée',
				tableCols: [
					{
						header: 'Phase de filtration physique',
						items: ['passage sous haute pression dans la membrane', 'rétention des sels'],
						mark: '0.5'
					},
					{
						header: 'Phase finale de potabilisation',
						items: ['reminéralisation de l’eau', 'eau potable distribuée'],
						mark: '0.5'
					}
				],
				refPrompt: '4) À quoi renvoient les pronoms soulignés ? a) Celles-ci (§2)   b) elle (§2)',
				refAnswer: 'a) Celles-ci (§2) : les membranes semi-perméables.   b) elle (§2) : l’eau obtenue.',
				viseeHeader: '5) Quelle est la visée communicative de ce texte ?',
				viseeOptions: [
					'Expliquer objectivement le principe scientifique du dessalement par osmose inverse',
					'Convaincre les touristes de visiter une plage algérienne',
					'Raconter un souvenir de voyage en mer'
				],
				viseeCorrect: 'Expliquer objectivement le principe scientifique du dessalement par osmose inverse',
				quizStem: 'Dans le procédé d’osmose inverse décrit dans le texte, que laissent passer les membranes semi-perméables ?',
				quizCorrect: 'Uniquement les molécules d’eau pure, tout en retenant les sels et les impuretés',
				quizDistractors: [
					{
						text: 'Les sels minéraux et les grains de sable uniquement',
						diagnosticFeedback: 'Les membranes retiennent les sels et les impuretés ; elles filtrent l’eau pure.'
					},
					{
						text: 'L’électricité solaire directement vers les foyers',
						diagnosticFeedback: 'Les membranes filtrent l’eau de mer, elles ne transportent pas d’électricité.'
					},
					{
						text: 'Toutes les bactéries marines sans aucun filtrage',
						diagnosticFeedback: 'Les membranes ultra-fines bloquent les impuretés et les sels.'
					}
				],
				quizExplanation: 'الفقرة الثانية تبيّن أن الأغشية شبه النافذة تحجز الأملاح والشوائب ولا تسمح بمرور سوى جزيئات الماء النقي.'
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
				content: '1) Répondez par Vrai ou Faux selon le texte (corrigez les énoncés faux) :'
			},
			{ type: 'true_false', items: v.tfItems },
			{ type: 'text', content: '2) Répondez aux questions de compréhension suivantes :' },
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
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizStem,
				questionTextAr: 'اختر الإجابة الصحيحة انطلاقا من النص العلمي:',
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
				instruction: 'Lisez soigneusement le texte explicatif puis traitez les activités demandées.',
				content
			},
			hints: [
				'تحقق من كل معلومة بالعودة إلى رقم الفقرة المشار إليه في السؤال.',
				'في جدول التصنيف، صنّف كل عبارة بدقة في العمود المناسب دون ترك أي عنصر.',
				'تذكّر أن غياب ضمير المتكلم وحضور الحاضر العلمي دليلان على الموضوعية.'
			],
			solutionStepsAr: [
				'الإجابة بـ Vrai أو Faux مع تصحيح العبارات الخاطئة.',
				'استخراج الإجابات العلمية الدقيقة وتصنيف العناصر في الجدول.',
				'تحديد مرجع الضمائر ثم تمييز الطابع الموضوعي والغاية التواصلية للنص.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [3] Fonctionnement de la langue (7 pts) — Procédés explicatifs, objectivité, voix passive et lexique scientifique
export const tpl2asSciT1ExpObjectiviteProcedes: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2as_sci_t1_exp_objectivite_procedes',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'grammaire_syntaxe',
	titleAr: 'البناء اللغوي (7 نقاط): الأساليب التفسيرية، المبني للمجهول، التراكيب غير الشخصية وعائلة الكلمة العلمية',
	curriculumLessonId: 'fre_lesson_2as_sci_t1_objectivite_scientifique',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				procedesItems: [
					{
						q: 'a) La photosynthèse est le processus par lequel les plantes fabriquent leur matière organique.',
						a: 'La définition (verbe : est).',
						mark: '0.5'
					},
					{
						q: 'b) Les panneaux solaires servent à produire une électricité propre.',
						a: 'La fonction (expression : servent à).',
						mark: '0.5'
					},
					{
						q: 'c) Le rayonnement lumineux se propage de manière rectiligne, autrement dit en ligne droite.',
						a: 'La reformulation (expression : autrement dit).',
						mark: '0.5'
					},
					{
						q: 'd) Ce savant a étudié plusieurs phénomènes, tels que la réflexion, la réfraction et les ombres.',
						a: 'L’illustration / L’exemple et l’énumération (tels que + liste).',
						mark: '0.5'
					}
				],
				passiveItems: [
					{
						q: 'a) Les cellules en silicium captent les rayons solaires.\n   Transformez à la voix passive : Les rayons solaires ........',
						a: 'Les rayons solaires sont captés par les cellules en silicium.',
						mark: '0.5'
					},
					{
						q: 'b) Ibn Al-Haytham a démontré la loi de la réflexion.\n   Transformez à la voix passive : La loi de la réflexion ........',
						a: 'La loi de la réflexion a été démontrée par Ibn Al-Haytham.',
						mark: '0.5'
					},
					{
						q: 'c) Les ingénieurs contrôleront la qualité de l’eau filtrée.\n   Transformez à la voix passive : La qualité de l’eau filtrée ........',
						a: 'La qualité de l’eau filtrée sera contrôlée par les ingénieurs.',
						mark: '0.5'
					},
					{
						q: 'd) Je pense que cette expérience prouve la loi physique.\n   Rendez la phrase objective (tournure impersonnelle) : Il est ........',
						a: 'Il est prouvé (ou : Il est établi) que cette expérience confirme la loi physique.',
						mark: '0.5'
					}
				],
				wfRows: [
					{
						verbe: { given: true, value: 'observer' },
						nom: { value: 'observation', mark: '0.25' },
						adjectif: { value: 'observable / observateur', mark: '0.25' }
					},
					{
						verbe: { value: 'démontrer', mark: '0.25' },
						nom: { given: true, value: 'démonstration' },
						adjectif: { value: 'démontrable', mark: '0.25' }
					},
					{
						verbe: { value: 'expérimenter', mark: '0.25' },
						nom: { value: 'expérimentation / expérience', mark: '0.25' },
						adjectif: { given: true, value: 'expérimental' }
					}
				],
				presentPrompt:
					'4) Conjuguez les verbes entre parenthèses au présent de vérité générale :\na) L’eau pure (bouillir) ........ à 100 degrés Celsius sous pression normale.\nb) Les globules blancs (défendre) ........ l’organisme contre les microbes.\nc) La lumière (parcourir) ........ environ trois cent mille kilomètres par seconde.',
				presentAnswer: 'a) bout (0.5 pt) | b) défendent (0.5 pt) | c) parcourt (0.5 pt).',
				quizStem: 'Quelle est la transformation passive correcte de : « Le chercheur a vérifié les mesures expérimentales » ?',
				quizCorrect: 'Les mesures expérimentales ont été vérifiées par le chercheur.',
				quizDistractors: [
					{
						text: 'Les mesures expérimentales sont vérifiées par le chercheur.',
						diagnosticFeedback: 'La phrase active est au passé composé (a vérifié) ; le passif exige « ont été vérifiées ».'
					},
					{
						text: 'Les mesures expérimentales ont été vérifié par le chercheur.',
						diagnosticFeedback: 'Le participe passé s’accorde au féminin pluriel avec « les mesures » : vérifiées.'
					},
					{
						text: 'Les mesures expérimentales seront vérifiées par le chercheur.',
						diagnosticFeedback: 'Le futur modifie le temps d’origine (passé composé).'
					}
				],
				quizExplanation: 'في المبني للمجهول نحافظ على زمن الماضي المركب (ont été) ونطابق اسم المفعول مع الفاعل المؤنث الجمع (vérifiées).'
			},
			{
				procedesItems: [
					{
						q: 'a) Ce phénomène biologique s’appelle la cicatrisation.',
						a: 'La dénomination (verbe : s’appelle).',
						mark: '0.5'
					},
					{
						q: 'b) Un algorithme désigne une suite logique et finie d’opérations de calcul.',
						a: 'La définition (verbe : désigne).',
						mark: '0.5'
					},
					{
						q: 'c) La membrane semi-perméable permet de retenir les sels dissous dans l’eau de mer.',
						a: 'La fonction (expression : permet de).',
						mark: '0.5'
					},
					{
						q: 'd) L’hygiène préventive, c’est-à-dire l’ensemble des gestes de propreté, protège la santé.',
						a: 'La reformulation (expression : c’est-à-dire).',
						mark: '0.5'
					}
				],
				passiveItems: [
					{
						q: 'a) Les globules blancs neutralisent les bactéries.\n   Transformez à la voix passive : Les bactéries ........',
						a: 'Les bactéries sont neutralisées par les globules blancs.',
						mark: '0.5'
					},
					{
						q: 'b) Al-Khwarizmi a publié un traité d’algèbre.\n   Transformez à la voix passive : Un traité d’algèbre ........',
						a: 'Un traité d’algèbre a été publié par Al-Khwarizmi.',
						mark: '0.5'
					},
					{
						q: 'c) Les chercheurs testeront une nouvelle cellule solaire propre.\n   Transformez à la voix passive : Une nouvelle cellule solaire propre ........',
						a: 'Une nouvelle cellule solaire propre sera testée par les chercheurs.',
						mark: '0.5'
					},
					{
						q: 'd) Je constate qu’il manque d’eau dans les régions arides.\n   Rendez la phrase objective avec le pronom neutre « on » : On ........',
						a: 'On constate qu’il existe un manque d’eau dans les régions arides.',
						mark: '0.5'
					}
				],
				wfRows: [
					{
						verbe: { given: true, value: 'filtrer' },
						nom: { value: 'filtration / filtre', mark: '0.25' },
						adjectif: { value: 'filtrant / filtré', mark: '0.25' }
					},
					{
						verbe: { value: 'purifier', mark: '0.25' },
						nom: { given: true, value: 'purification' },
						adjectif: { value: 'pur / purifié', mark: '0.25' }
					},
					{
						verbe: { value: 'calculer', mark: '0.25' },
						nom: { value: 'calcul', mark: '0.25' },
						adjectif: { given: true, value: 'calculable' }
					}
				],
				presentPrompt:
					'4) Conjuguez les verbes entre parenthèses au présent de vérité générale :\na) La Terre (accomplir) ........ une rotation complète en vingt-quatre heures.\nb) Les plantes vertes (absorber) ........ le dioxyde de carbone le jour.\nc) Un matériau conducteur (transmettre) ........ rapidement le courant électrique.',
				presentAnswer: 'a) accomplit (0.5 pt) | b) absorbent (0.5 pt) | c) transmet (0.5 pt).',
				quizStem: 'Complétez au présent de vérité générale : « L’eau pure ........ à 100 °C et le son ........ dans l’air à 340 m/s. » (bouillir / se propager)',
				quizCorrect: 'bout / se propage',
				quizDistractors: [
					{
						text: 'bouille / se propagera',
						diagnosticFeedback: '« bouillir » au présent (3e sg.) donne « bout », et une vérité générale emploie le présent.'
					},
					{
						text: 'bouillit / se propageait',
						diagnosticFeedback: '« bouillit » est le passé simple et « se propageait » l’imparfait.'
					},
					{
						text: 'boud / se propagent',
						diagnosticFeedback: 'On écrit « bout » (de bouillir) et « le son » est singulier (se propage).'
					}
				],
				quizExplanation: 'الفعل bouillir في الحاضر مع المفرد الغائب هو « bout »، والفعل se propager هو « se propage ».'
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			{ type: 'text', content: '1) Identifiez le procédé explicatif utilisé dans chacune des phrases suivantes :' },
			...v.procedesItems.map((p) => ({
				type: 'text' as const,
				content: p.q,
				answer: p.a,
				mark: p.mark
			})),
			{ type: 'text', content: '2) Effectuez les transformations grammaticales demandées pour renforcer l’objectivité :' },
			...v.passiveItems.map((p) => ({
				type: 'text' as const,
				content: p.q,
				answer: p.a,
				mark: p.mark
			})),
			{ type: 'text', content: '3) Complétez le tableau de la famille de mots scientifiques suivant :' },
			buildFrenchWordFamilyTableBlock(v.wfRows),
			{ type: 'text', content: v.presentPrompt, answer: v.presentAnswer, mark: '1.5' }
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizStem,
				questionTextAr: 'اختر الإجابة اللغوية الصحيحة:',
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
				instruction: 'Traitez les activités de lexique, de syntaxe et de conjugaison scientifique ci-dessous.',
				content
			},
			hints: [
				'في المبني للمجهول حافظ دائما على نفس زمن الجملة الأصلية وطابق اسم المفعول مع الفاعل الجديد.',
				'فرّق بين التعريف (est / désigne) والتسمية (s’appelle) والوظيفة (sert à / permet de).',
				'في جدول عائلة الكلمة تحقق من الإملاء الصحيح للواحق (-tion, -able, -al).'
			],
			solutionStepsAr: [
				'تحديد كل أسلوب تفسيري مع ذكر مؤشره اللغوي.',
				'التحويل السليم للمبني للمجهول وللتراكيب غير الشخصية الموضوعية.',
				'إكمال جدول عائلة الكلمات وتصريف أفعال الحقيقة العلمية في الحاضر.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [4] Fonctionnement de la langue (7 pts) — Hypothèse, condition, cause et conséquence
export const tpl2asSciT1ExpHypotheseLogique: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2as_sci_t1_exp_hypothese_logique',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'conjugaison_temps',
	titleAr: 'البناء اللغوي (7 نقاط): الفرضية والشرط (si / au cas où / à condition que) وعلاقتا السبب والنتيجة',
	curriculumLessonId: 'fre_lesson_2as_sci_t1_hypothese_condition',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				hypItems: [
					{
						q: 'a) Si la température de l’eau (atteindre) ........ 0 degré Celsius, elle (geler) ........ . (vérité générale)',
						a: 'atteint / gèle.',
						mark: '0.5'
					},
					{
						q: 'b) Si les villes algériennes (installer) ........ davantage de capteurs solaires, la consommation de gaz (diminuer) ........ . (hypothèse éventuelle)',
						a: 'installaient (imparfait) / diminuerait (conditionnel présent).',
						mark: '0.5'
					},
					{
						q: 'c) Au cas où une panne électrique (survenir) ........ , les accumulateurs de secours prendraient le relais.',
						a: 'surviendrait (conditionnel présent après « au cas où »).',
						mark: '0.5'
					},
					{
						q: 'd) L’expérience réussira à condition que les mesures (être) ........ exactes.',
						a: 'soient (subjonctif présent après « à condition que »).',
						mark: '0.5'
					}
				],
				logicReplaceItems: [
					{
						q: 'a) Le rendement solaire est élevé parce que le ciel est dégagé.\n   Précisez le rapport exprimé puis remplacez « parce que » par « grâce à » (+ groupe nominal).',
						a: 'Rapport de cause. Réécriture : Le rendement solaire est élevé grâce au ciel dégagé (ou : à la clarté du ciel).',
						mark: '0.5'
					},
					{
						q: 'b) La poussière recouvre les cellules, si bien que la production électrique baisse.\n   Précisez le rapport exprimé puis remplacez « si bien que » par « par conséquent ».',
						a: 'Rapport de conséquence. Réécriture : La poussière recouvre les cellules ; par conséquent, la production électrique baisse.',
						mark: '0.5'
					},
					{
						q: 'c) Les récoltes diminuent parce qu’il manque d’eau.\n   Remplacez « parce qu’il manque d’eau » par « faute de » (+ nom).',
						a: 'Les récoltes diminuent faute d’eau.',
						mark: '0.5'
					}
				],
				invertItems: [
					{
						q: 'a) Transformez le rapport de cause en rapport de conséquence : « Le patient guérit vite parce que le diagnostic a été précoce. »',
						a: 'Le diagnostic a été précoce ; c’est pourquoi (ou : donc / par conséquent,) le patient guérit vite.',
						mark: '1.0'
					},
					{
						q: 'b) Transformez le rapport de conséquence en rapport de cause : « Les membranes retiennent les sels ; donc l’eau devient douce. »',
						a: 'L’eau devient douce parce que (ou : car) les membranes retiennent les sels.',
						mark: '1.0'
					}
				],
				classPrompt:
					'4) Classez les articulateurs logiques suivants dans le tableau : en raison de | c’est pourquoi | puisque | de sorte que | faute de | d’où',
				classCols: [
					{ header: 'Expression de la cause', items: ['en raison de', 'puisque', 'faute de'], mark: '0.75' },
					{ header: 'Expression de la conséquence', items: ['c’est pourquoi', 'de sorte que', 'd’où'], mark: '0.75' }
				],
				quizStem: 'Transformez en rapport de conséquence sans modifier le sens : « La vision est floue à cause de la déformation du cristallin. »',
				quizCorrect: 'Le cristallin est déformé ; par conséquent, la vision est floue.',
				quizDistractors: [
					{
						text: 'La vision est floue ; par conséquent, le cristallin se déforme.',
						diagnosticFeedback: 'Attention : cela inverse la cause réelle (déformation) et son effet (vision floue).'
					},
					{
						text: 'La vision est floue parce que le cristallin est déformé.',
						diagnosticFeedback: '« parce que » exprime toujours la cause et non la conséquence.'
					},
					{
						text: 'Grâce à la déformation du cristallin, la vision est floue.',
						diagnosticFeedback: '« grâce à » exprime une cause positive, non une conséquence.'
					}
				],
				quizExplanation: 'للتحويل من السبب إلى النتيجة نبدأ بالسبب (تشوّه البلورة) ثم رابط النتيجة (par conséquent) ثم النتيجة (ضبابية الرؤية).'
			},
			{
				hypItems: [
					{
						q: 'a) Si l’on (chauffer) ........ un métal, il se (dilater) ........ progressivement. (loi physique)',
						a: 'chauffe / dilate.',
						mark: '0.5'
					},
					{
						q: 'b) Si les élèves (vérifier) ........ chaque calcul, ils (éviter) ........ les erreurs expérimentales. (hypothèse éventuelle)',
						a: 'vérifiaient (imparfait) / éviteraient (conditionnel présent).',
						mark: '0.5'
					},
					{
						q: 'c) Au cas où le capteur (détecter) ........ une fuite de gaz, l’alarme se déclencherait aussitôt.',
						a: 'détecterait (conditionnel présent).',
						mark: '0.5'
					},
					{
						q: 'd) Le vaccin conserve son efficacité à condition qu’on le (garder) ........ au frais.',
						a: 'garde (subjonctif présent : qu’on le garde).',
						mark: '0.5'
					}
				],
				logicReplaceItems: [
					{
						q: 'a) L’infection a reculé parce que les chirurgiens ont respecté l’hygiène.\n   Remplacez la subordonnée par « grâce à » (+ groupe nominal).',
						a: 'L’infection a reculé grâce au respect de l’hygiène par les chirurgiens.',
						mark: '0.5'
					},
					{
						q: 'b) L’air pollué irrite les poumons ; c’est pourquoi les cas d’asthme augmentent.\n   Remplacez « c’est pourquoi » par « si bien que ».',
						a: 'L’air pollué irrite les poumons, si bien que les cas d’asthme augmentent.',
						mark: '0.5'
					},
					{
						q: 'c) Le moteur a cessé de fonctionner parce que la température était excessive.\n   Remplacez la subordonnée par « à cause de » (+ groupe nominal).',
						a: 'Le moteur a cessé de fonctionner à cause de la température excessive (ou : de l’excès de température).',
						mark: '0.5'
					}
				],
				invertItems: [
					{
						q: 'a) Transformez la cause en conséquence : « Les chercheurs obtiennent des résultats fiables comme ils répètent l’expérience. »',
						a: 'Les chercheurs répètent l’expérience ; par conséquent (ou : donc,) ils obtiennent des résultats fiables.',
						mark: '1.0'
					},
					{
						q: 'b) Transformez la conséquence en cause : « Les panneaux sont propres ; si bien que leur rendement augmente. »',
						a: 'Le rendement des panneaux augmente parce qu’ils sont propres (ou : grâce à leur propreté).',
						mark: '1.0'
					}
				],
				classPrompt:
					'4) Classez ces connecteurs dans le tableau : grâce à | tellement... que | car | par conséquent | à cause de | si bien que',
				classCols: [
					{ header: 'Expression de la cause', items: ['grâce à', 'car', 'à cause de'], mark: '0.75' },
					{ header: 'Expression de la conséquence', items: ['tellement... que', 'par conséquent', 'si bien que'], mark: '0.75' }
				],
				quizStem: 'Choisissez la phrase hypothétique grammaticalement irréprochable :',
				quizCorrect: 'Au cas où les précipitations diminueraient, le dessalement solaire assurerait l’eau potable.',
				quizDistractors: [
					{
						text: 'Si les précipitations diminueraient, le dessalement solaire assurerait l’eau potable.',
						diagnosticFeedback: 'On n’emploie jamais le conditionnel immédiatement après « si ».'
					},
					{
						text: 'Si les précipitations diminueront, le dessalement solaire assurera l’eau potable.',
						diagnosticFeedback: 'On n’emploie jamais le futur simple immédiatement après « si ».'
					},
					{
						text: 'À condition que les précipitations diminuent, le dessalement solaire assure l’eau (sens illogique et mode mal relié).',
						diagnosticFeedback: '« à condition que » introduit une condition exigée pour la réussite, ce qui ne correspond pas à la sécheresse.'
					}
				],
				quizExplanation: 'الرابط « au cas où » يتبعه دائما الشرطي الحاضر (diminueraient / assurerait)، بخلاف « si » التي يُمنع بعدها الشرطي والمستقبل.'
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			{ type: 'text', content: '1) Conjuguez les verbes entre parenthèses aux modes et temps qui conviennent dans ces phrases hypothétiques :' },
			...v.hypItems.map((item) => ({
				type: 'text' as const,
				content: item.q,
				answer: item.a,
				mark: item.mark
			})),
			{ type: 'text', content: '2) Identifiez le rapport logique et effectuez le remplacement demandé :' },
			...v.logicReplaceItems.map((item) => ({
				type: 'text' as const,
				content: item.q,
				answer: item.a,
				mark: item.mark
			})),
			{ type: 'text', content: '3) Inversez le rapport logique demandé sans altérer le sens scientifique :' },
			...v.invertItems.map((item) => ({
				type: 'text' as const,
				content: item.q,
				answer: item.a,
				mark: item.mark
			})),
			{ type: 'text', content: v.classPrompt },
			buildFrenchClassificationTableBlock({ columns: v.classCols })
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizStem,
				questionTextAr: 'اختر الجملة العلمية الصحيحة نحويا ومنطقيا:',
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
				instruction: 'Effectuez les exercices de concordance hypothétique et de rapports logiques ci-dessous.',
				content
			},
			hints: [
				'تذكر القاعدة الذهبية: لا يُستعمل المستقبل ولا الشرطي بعد أداة الشرط si أبدا.',
				'au cas où + conditionnel | à condition que + subjonctif.',
				'عند تحويل السبب إلى نتيجة (أو العكس) غيّر ترتيب الجملتين ليظل السبب سببا والنتيجة نتيجة.'
			],
			solutionStepsAr: [
				'تصريف الأفعال في الجمل الشرطية وفق توافق الأزمنة والصيغ.',
				'استبدال روابط السبب والنتيجة بالمجموعات الاسمية أو الروابط المطلوبة.',
				'عكس العلاقة المنطقية مع حفظ المعنى ثم تصنيف الروابط في الجدول.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [5] Production écrite (6 pts) — Sujet 1 : Compte rendu objectif + Sujet 2 : Production libre scientifique
export const tpl2asSciT1ProdCompteRenduScientifique: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2as_sci_t1_prod_compte_rendu_scientifique',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'production_ecrite',
	titleAr: 'الإنتاج الكتابي (6 نقاط): الموضوع 1 (تقرير موضوعي لنص علمي) أو الموضوع 2 (نص تفسيري موضوعي حر)',
	curriculumLessonId: 'fre_lesson_2as_sci_t1_compte_rendu_objectif',
	defaultPoints: 6,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				sujetUnTitle: 'Sujet 1 (Compte rendu objectif) :',
				sujetUnPrompt:
					'Faites le compte rendu objectif (environ 90 à 110 mots) du texte scientifique étudié sur la démarche expérimentale ou l’énergie solaire photovoltaïque, destiné au journal scientifique de votre lycée.',
				sujetUnNotes: [
					'Rédiger une accroche complète : type explicatif, titre, source, thème et visée informative',
					'Résumer les idées essentielles dans l’ordre du texte en reformulant avec vos propres mots',
					'Employer la troisième personne (l’auteur, il) et le présent de l’indicatif',
					'Utiliser des verbes rapporteurs précis : définit, explique, démontre, souligne, conclut',
					'Rester strictement objectif : aucun avis personnel et aucun recopiage intégral'
				],
				sujetDeuxPrompt:
					'Votre lycée organise une journée consacrée aux énergies renouvelables en Algérie. Rédigez un texte explicatif objectif (12 à 15 lignes) présentant le fonctionnement de l’énergie solaire et ses bienfaits pour la santé et l’environnement, en employant au moins deux procédés explicatifs, une tournure impersonnelle et un rapport de cause ou de conséquence.',
				modelAnswer:
					'Proposition pour le Sujet 1 (Compte rendu objectif — modèle sur l’énergie solaire) :\nCe texte explicatif intitulé « Comment fonctionne l’énergie solaire photovoltaïque ? », paru dans la Revue Énergies Propres en Algérie, traite de la production d’électricité à partir du soleil dans le but d’informer le lecteur et d’expliquer son fonctionnement.\nD’abord, l’auteur définit l’énergie photovoltaïque et montre comment les cellules en silicium transforment la lumière solaire en courant continu. Ensuite, il précise le rôle de l’onduleur, qui adapte ce courant au réseau domestique, tout en rappelant le fort potentiel d’ensoleillement du Sahara algérien. Enfin, il conclut que cette technologie propre diminue les émissions polluantes à condition d’assurer un entretien régulier des panneaux.',
				rubricSummary:
					'Respect du genre et de la consigne (1.5) | Pertinence et fidélité des idées / reformulation (1.5) | Cohérence et articulateurs (1.5) | Correction linguistique, objectivité et présentation (1.5).',
				quizStem: 'Dans un compte rendu objectif destiné au journal du lycée (Sujet 1), quel élément doit absolument être évité ?',
				quizCorrect: 'Exprimer un jugement personnel comme « Je trouve ce texte formidable »',
				quizDistractors: [
					{
						text: 'Mentionner le titre, la source et la visée informative dans l’accroche',
						diagnosticFeedback: 'Ces éléments paratextuels sont au contraire exigés dans l’accroche.'
					},
					{
						text: 'Employer la troisième personne (l’auteur explique que...)',
						diagnosticFeedback: 'La troisième personne est la norme du compte rendu objectif.'
					},
					{
						text: 'Enchaîner les idées essentielles avec D’abord, Ensuite et Enfin',
						diagnosticFeedback: 'Les articulateurs garantissent la cohérence du compte rendu.'
					}
				],
				quizExplanation: 'التقرير الموضوعي يلتزم بالحياد التام ويستبعد أي رأي أو تقييم شخصي.'
			},
			{
				sujetUnTitle: 'Sujet 1 (Compte rendu objectif) :',
				sujetUnPrompt:
					'Rédigez le compte rendu objectif (90 à 110 mots) d’un texte explicatif consacré à l’apport scientifique d’Ibn Al-Haytham (ou d’Al-Khwarizmi) afin de le publier dans la revue culturelle de votre établissement.',
				sujetUnNotes: [
					'Présenter le texte dans l’accroche : nature explicative, titre, source, thème et visée',
					'Synthétiser les étapes majeures de la démarche scientifique ou de la découverte présentée',
					'Maintenir la troisième personne (l’auteur rappelle, démontre, précise, conclut)',
					'Éviter les détails secondaires et les citations longues recopiées mot à mot',
					'Relire attentivement les accords, la conjugaison au présent et la ponctuation'
				],
				sujetDeuxPrompt:
					'À l’occasion de la Journée du Savoir (16 avril), rédigez un texte explicatif objectif (12 à 15 lignes) expliquant l’importance de l’hygiène et de la prévention pour renforcer le système immunitaire. Intégrez une définition, une tournure impersonnelle, une phrase à la voix passive et une hypothèse avec « si ».',
				modelAnswer:
					'Proposition pour le Sujet 2 (Texte explicatif objectif sur la prévention sanitaire) :\nLa prévention sanitaire désigne l’ensemble des mesures simples destinées à protéger l’organisme humain avant l’apparition des maladies. Il est établi par les médecins que la santé dépend étroitement de nos habitudes quotidiennes.\nD’abord, le lavage régulier des mains au savon sert à éliminer les microbes transmissibles, tels que les bactéries et les virus saisonniers. Ensuite, une alimentation variée et un sommeil suffisant permettent de renforcer les défenses immunitaires. En effet, les nutriments essentiels sont assimilés par l’organisme pour produire des cellules protectrices efficaces.\nPar conséquent, si chaque citoyen respecte ces règles d’hygiène et d’équilibre alimentaire, le risque d’infections diminue nettement. La prévention demeure ainsi le moyen le plus sûr de préserver la santé publique.',
				rubricSummary:
					'Pertinence et respect du discours objectif (1.5) | Organisation explicative et procédés (1.5) | Emploi exact des outils linguistiques demandés (1.5) | Orthographe, ponctuation et lisibilité (1.5).',
				quizStem: 'Dans un texte explicatif objectif sur la santé (Sujet 2), quelle phrase respecte à la fois l’objectivité et les procédés explicatifs ?',
				quizCorrect: 'La prévention désigne l’ensemble des gestes qui permettent de protéger l’organisme contre les infections.',
				quizDistractors: [
					{
						text: 'Moi, je pense vraiment que se laver les mains est super sympa !',
						diagnosticFeedback: 'Cette phrase est subjective (moi, je pense) et relève du registre familier.'
					},
					{
						text: 'Hier, j’ai couru dans la cour et j’ai pris froid.',
						diagnosticFeedback: 'Il s’agit d’un récit personnel au passé composé, non d’une explication scientifique.'
					},
					{
						text: 'Si les gens écouteraient mieux, ils ne seraient jamais malades.',
						diagnosticFeedback: 'Faute grammaticale grave : on ne met jamais le conditionnel après « si ».'
					}
				],
				quizExplanation: 'الجملة الصحيحة تخلو من الذاتية وتوظّف أسلوبي التعريف (désigne) والوظيفة (permettent de) بحاضر الحقيقة العامة.'
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
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizStem,
				questionTextAr: 'اختر التوجيه المنهجي الصحيح للإنتاج الكتابي:',
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
				instruction: 'Traitez au choix l’un des deux sujets proposés ci-dessous en soignant la langue et la présentation.',
				content
			},
			hints: [
				'اختر موضوعا واحدا فقط (Sujet 1 أو Sujet 2) وخصص مسودة لترتيب الأفكار قبل التحرير.',
				'في التقرير الموضوعي (Sujet 1): التزم بفقرتين (مقدمة باراتكستية + تلخيص بضمير الغائب دون رأي شخصي).',
				'في النص التفسيري الحر (Sujet 2): تجنب ضمير « je » ووظف الحاضر العلمي وأسلوبين تفسيريين على الأقل.'
			],
			solutionStepsAr: [
				'اختيار أحد الموضوعين وتحديد البنية المطلوبة (تقرير موضوعي أو نص تفسيري).',
				'توظيف الأدوات اللغوية المدروسة في المشروع الأول والروابط المنطقية.',
				'مراجعة سلامة الإملاء والتوافق النحوي وعلامات الترقيم وفق سلم التنقيط (6 نقاط).'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

export const TEMPLATES_2AS_SCI_T1: FrenchParameterizedTemplate[] = [
	tpl2asSciT1CompDemarcheSavants,
	tpl2asSciT1CompEnergieSante,
	tpl2asSciT1ExpObjectiviteProcedes,
	tpl2asSciT1ExpHypotheseLogique,
	tpl2asSciT1ProdCompteRenduScientifique
];
