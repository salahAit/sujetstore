import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildFrenchClassificationTableBlock,
	buildFrenchPassageBlock,
	buildFrenchWordFamilyTableBlock,
	buildFrenchWrittenProductionBlock
} from '../../french-helpers';
import type {
	Difficulty,
	FrenchGeneratedExerciseInstance,
	FrenchParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';

// ═══════════════════════════════════════════════════════════════════════════════
// 3AS BAC Scientific & Management Shared (3as_se, 3as_tm, 3as_math, 3as_ge) — T1
// Projet 1 : Textes et documents d'histoire (Révolution 1954-1962 & Oulémas)
// 5 Modèles BAC : 2 Compréhension (7 pts) + 2 Fonctionnement langue (7 pts) + 1 Production écrite (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════

export const TEMPLATES_3AS_SCI_T1: FrenchParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPRÉHENSION (7 pts) — 1er Novembre 1954, Congrès de la Soummam, Oulémas
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_sci_t1_comp_novembre_soummam',
		grade: '3as_se',
		trimesterId: 't1',
		domain: 'comprehension_ecrit',
		titleAr: 'فهم المكتوب (7 ن): ثورة أول نوفمبر ومؤتمر الصومام وجمعية العلماء المسلمين',
		curriculumLessonId: 'fre_lesson_3as_sci_t1_objectivite_subjectivite',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					title: 'Le 1er novembre 1954 : une nuit décisive',
					source: 'D’après une synthèse documentaire sur la Guerre de Libération nationale',
					paragraphs: [
						'Dans la nuit du 31 octobre au 1er novembre 1954, des opérations coordonnées éclatent simultanément dans plusieurs régions d’Algérie, notamment dans les Aurès, en Kabylie et dans le Nord-Constantinois. Conduite par des dirigeants déterminés comme Didouche Mourad et Larbi Ben M’hidi, [[cette insurrection]] marque la naissance officielle du Front de Libération Nationale.',
						'Le même jour, la Proclamation du 1er Novembre est diffusée afin d’expliquer les objectifs politiques de la lutte. Ce texte fondateur affirme clairement la volonté de restaurer un État algérien souverain, indépendant et attaché à ses principes islamiques et nationaux. [[Il]] appelle tous les patriotes à s’unir au-delà des divergences partisanes.',
						'Malgré la faiblesse initiale de leurs moyens matériels, les moudjahidine font preuve d’un courage remarquable et bénéficient progressivement du soutien massif de la population. Ainsi, le 1er novembre 1954 ouvre une étape irréversible qui conduira l’Algérie vers son indépendance le 5 juillet 1962.'
					],
					glossary: [
						{ term: 'insurrection', meaning: 'soulèvement armé contre une autorité oppressive' },
						{ term: 'irréversible', meaning: 'qui ne peut plus revenir en arrière' }
					],
					tfItems: [
						{ q: 'Les opérations du 1er novembre 1954 se limitèrent à une seule ville algérienne.', a: 'Faux', c: 'Elles éclatèrent simultanément dans plusieurs régions (Aurès, Kabylie, Nord-Constantinois).', mark: '0.5' },
						{ q: 'La Proclamation du 1er Novembre fixe comme but la restauration d’un État algérien souverain.', a: 'Vrai', mark: '0.5' },
						{ q: 'Les moudjahidine disposaient dès 1954 d’un armement supérieur à celui de l’armée coloniale.', a: 'Faux', c: 'Le texte souligne la faiblesse initiale de leurs moyens matériels.', mark: '0.5' },
						{ q: 'La révolution lancée en novembre 1954 aboutit à l’indépendance le 5 juillet 1962.', a: 'Vrai', mark: '0.5' }
					],
					tableIntro: '2. Classez les expressions suivantes dans le tableau ci-dessous : « le 1er novembre 1954 », « courage remarquable », « le 5 juillet 1962 », « déterminés » :',
					tableCols: [
						{ header: 'Indices d’objectivité (repères)', items: ['le 1er novembre 1954', 'le 5 juillet 1962'], mark: '0.75' },
						{ header: 'Indices de subjectivité (mélioratifs)', items: ['courage remarquable', 'déterminés'], mark: '0.75' }
					],
					whQ: '3. Répondez aux questions suivantes à partir du texte :\na) Quel document historique est diffusé le 1er novembre 1954 et dans quel but ?\nb) Qu’est-ce qui a permis aux moudjahidine de surmonter la faiblesse de leurs moyens matériels ?',
					whA: '3. a) La Proclamation du 1er Novembre est diffusée afin d’expliquer les objectifs politiques de la lutte et d’appeler les patriotes à l’union.\nb) Leur courage remarquable et le soutien massif de la population algérienne.',
					refQ: '4. a) À quoi renvoient les expressions soulignées dans le texte : « cette insurrection » (§1) et « Il » (§2) ?\nb) Quelle est la visée communicative de ce texte ?',
					refA: '4. a) « cette insurrection » : les opérations coordonnées du 1er novembre 1954 | « Il » : ce texte fondateur (la Proclamation du 1er Novembre).\nb) Visée informative et commémorative : informer le lecteur sur le déclenchement de la Révolution et rendre hommage aux patriotes.',
					easyQ: 'Selon le texte « Le 1er novembre 1954 : une nuit décisive », quel est l’objectif principal énoncé dans la Proclamation du 1er Novembre ?',
					easyCorrect: 'Restaurer un État algérien souverain et indépendant',
					easyDistractors: [
						{ text: 'Diviser le mouvement national en partis rivaux', diagnosticFeedback: 'البيان دعا إلى وحدة جميع الوطنيين وتجاوز الخلافات الحزبية.' },
						{ text: 'Reporter la lutte armée à une date ultérieure', diagnosticFeedback: 'البيان واكب اندلاع الثورة مباشرة يوم أول نوفمبر 1954.' },
						{ text: 'Décrire les richesses agricoles du pays uniquement', diagnosticFeedback: 'البيان وثيقة سياسية تحدد أهداف الكفاح التحرري.' }
					],
					medQ: 'Dans le paragraphe 2 du texte « Le 1er novembre 1954 : une nuit décisive », à quoi renvoie le pronom « Il » ?',
					medCorrect: 'Ce texte fondateur (la Proclamation du 1er Novembre)',
					medDistractors: [
						{ text: 'Didouche Mourad', diagnosticFeedback: 'ذُكر ديدوش مراد في الفقرة الأولى لا الثانية.' },
						{ text: 'Le 5 juillet 1962', diagnosticFeedback: 'ورد هذا التاريخ في آخر الفقرة الثالثة.' },
						{ text: 'Le Nord-Constantinois', diagnosticFeedback: 'الجملة الثانية تتحدث عن بيان أول نوفمبر.' }
					],
					hardQ: 'Dans « Le 1er novembre 1954 : une nuit décisive », quelle est la valeur du présent employé dans « éclatent » et « ouvre » ?',
					hardCorrect: 'Présent historique (de narration) servant à actualiser les faits passés',
					hardDistractors: [
						{ text: 'Présent d’habitude répétée chaque année', diagnosticFeedback: 'اندلاع الثورة حدث تاريخي فريد في 1954 وليس عادة.' },
						{ text: 'Présent futur proche annonçant un projet à venir', diagnosticFeedback: 'الأحداث وقعت فعليا سنة 1954.' },
						{ text: 'Présent de vérité scientifique universelle', diagnosticFeedback: 'الواقعة مرتبطة بتاريخ محدد (1954) فهي مضارع تاريخي.' }
					]
				},
				{
					title: 'Le Congrès de la Soummam : organiser la Révolution',
					source: 'D’après les archives historiques sur la Révolution algérienne',
					paragraphs: [
						'Le 20 août 1956, en pleine guerre de libération, les responsables de la révolution algérienne se réunissent secrètement dans le village d’Ifri, au cœur de la vallée de la Soummam. Malgré l’encerclement militaire colonial, [[cette rencontre historique]] rassemble des cadres déterminés venus coordonner la lutte à l’échelle nationale.',
						'À l’issue de débats approfondis, le Congrès adopte la Plateforme de la Soummam, un document politique et militaire majeur. [[Elle]] établit deux principes directeurs essentiels : la primauté du politique sur le militaire et la primauté de l’intérieur sur l’extérieur. En outre, le territoire est découpé en six wilayas structurées.',
						'Grâce à ces décisions lucides, la Révolution algérienne se dote d’institutions claires, notamment le Conseil National de la Révolution Algérienne (CNRA). Ce tournant décisif renforce la discipline des combattants et accroît la crédibilité de la cause algérienne sur la scène internationale.'
					],
					glossary: [
						{ term: 'primauté', meaning: 'caractère prioritaire, place la plus importante' },
						{ term: 'crédibilité', meaning: 'confiance et reconnaissance accordées à une cause' }
					],
					tfItems: [
						{ q: 'Le Congrès de la Soummam s’est tenu publiquement au centre d’Alger en 1954.', a: 'Faux', c: 'Il s’est tenu secrètement le 20 août 1956 dans le village d’Ifri (vallée de la Soummam).', mark: '0.5' },
						{ q: 'La Plateforme de la Soummam affirme la primauté du politique sur le militaire.', a: 'Vrai', mark: '0.5' },
						{ q: 'Le Congrès a organisé le territoire algérien en six wilayas structurées.', a: 'Vrai', mark: '0.5' },
						{ q: 'Les décisions de la Soummam ont affaibli l’image internationale de la Révolution.', a: 'Faux', c: 'Elles ont accru la crédibilité de la cause algérienne sur la scène internationale.', mark: '0.5' }
					],
					tableIntro: '2. Relevez et classez dans le tableau deux informations sur l’organisation militaire/territoriale et deux sur les institutions/principes politiques :',
					tableCols: [
						{ header: 'Organisation territoriale / lutte', items: ['découpage en six wilayas', 'discipline des combattants'], mark: '0.75' },
						{ header: 'Principes et institutions politiques', items: ['primauté du politique sur le militaire', 'création du CNRA'], mark: '0.75' }
					],
					whQ: '3. Répondez aux questions suivantes selon le texte :\na) Où et quand le Congrès de la Soummam a-t-il eu lieu ?\nb) Quels sont les deux principes directeurs adoptés dans la Plateforme de la Soummam ?',
					whA: '3. a) Il a eu lieu le 20 août 1956 dans le village d’Ifri, dans la vallée de la Soummam.\nb) La primauté du politique sur le militaire et la primauté de l’intérieur sur l’extérieur.',
					refQ: '4. a) À quoi renvoient « cette rencontre historique » (§1) et « Elle » (§2) ?\nb) L’auteur est-il totalement neutre ? Justifiez par deux indices du texte.',
					refA: '4. a) « cette rencontre historique » : la réunion du Congrès de la Soummam | « Elle » : la Plateforme de la Soummam.\nb) Non, il s’implique implicitement par un lexique mélioratif : « cadres déterminés », « document majeur », « décisions lucides », « tournant décisif ».',
					easyQ: 'Dans le texte « Le Congrès de la Soummam », en combien de wilayas le territoire a-t-il été découpé ?',
					easyCorrect: 'En six wilayas structurées',
					easyDistractors: [
						{ text: 'En deux wilayas seulement', diagnosticFeedback: 'الفقرة الثانية تذكر صراحة تقسيم التراب الوطني إلى ست ولايات.' },
						{ text: 'En douze provinces coloniales', diagnosticFeedback: 'مؤتمر الصومام أنشأ ست ولايات ثورية منظمة.' },
						{ text: 'En une seule zone militaire', diagnosticFeedback: 'تم تنظيم البلاد في ست ولايات متكاملة.' }
					],
					medQ: 'Dans le paragraphe 2 de « Le Congrès de la Soummam », à quoi renvoie le pronom « Elle » ?',
					medCorrect: 'La Plateforme de la Soummam',
					medDistractors: [
						{ text: 'La vallée de la Soummam', diagnosticFeedback: 'الوادي ذُكر في الفقرة الأولى، أما هنا فالحديث عن وثيقة الصومام.' },
						{ text: 'L’armée coloniale', diagnosticFeedback: 'ميثاق الصومام هو الذي أقر المبدأين الأساسيين.' },
						{ text: 'La scène internationale', diagnosticFeedback: 'وردت في ختام الفقرة الثالثة.' }
					],
					hardQ: 'Comment se manifeste la position de l’auteur dans « Le Congrès de la Soummam » ?',
					hardCorrect: 'Il s’efface formellement (3e pers.) mais marque une subjectivité implicite par des adjectifs mélioratifs',
					hardDistractors: [
						{ text: 'Il utilise constamment le pronom « je » pour raconter sa vie', diagnosticFeedback: 'ضمير المتكلم « je » غائب تماما عن النص.' },
						{ text: 'Il condamne les décisions du Congrès avec un lexique péjoratif', diagnosticFeedback: 'بالعكس، الكاتب يشيد بحكمة القرارات (décisions lucides, tournant décisif).' },
						{ text: 'Il rédige un dialogue imaginaire entre deux personnages', diagnosticFeedback: 'النص تاريخي تفسيري متماسك وليس حوارا.' }
					]
				},
				{
					title: 'L’Association des Oulémas Musulmans Algériens et la défense de l’identité',
					source: 'D’après les études de l’historien Abou El-Kacem Saadallah',
					paragraphs: [
						'Le 5 mai 1931, à Alger, Cheikh Abdelhamid Ben Badis, entouré de savants tels que Cheikh Mohamed Bachir El-Ibrahimi et Cheikh Moubarek El-Mili, fonde l’Association des Oulémas Musulmans Algériens. Face à la politique coloniale d’assimilation, [[cette institution réformiste]] se fixe une mission vitale : préserver la religion islamique authentique, la langue arabe et la personnalité algérienne.',
						'Pour atteindre cet objectif, les Oulémas ouvrent des dizaines d’écoles libres (médersas) dans les villes et les villages, publient des journaux engagés et organisent des cercles culturels. [[Ils]] forment ainsi une jeunesse instruite, consciente de son histoire et fière de sa patrie, malgré les fermetures répétées imposées par l’administration coloniale.',
						'L’œuvre éducative de l’Association a préparé moralement et intellectuellement le peuple algérien à l’heure de l’indépendance. Par le savoir et la réforme des mœurs, ces savants ont prouvé que la renaissance culturelle constituait un rempart solide contre l’oubli et la soumission.'
					],
					glossary: [
						{ term: 'assimilation', meaning: 'politique visant à effacer l’identité culturelle d’un peuple' },
						{ term: 'rempart', meaning: 'protection solide contre une menace' }
					],
					tfItems: [
						{ q: 'L’Association des Oulémas Musulmans Algériens fut fondée le 5 mai 1931 à Alger.', a: 'Vrai', mark: '0.5' },
						{ q: 'Cheikh Ben Badis travailla seul sans le concours d’autres savants algériens.', a: 'Faux', c: 'Il était entouré de savants comme Cheikh Mohamed Bachir El-Ibrahimi et Cheikh Moubarek El-Mili.', mark: '0.5' },
						{ q: 'Les Oulémas ont fondé des écoles libres et publié des journaux pour éveiller la jeunesse.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’administration coloniale soutenait financièrement l’ouverture des médersas libres.', a: 'Faux', c: 'Elle imposait au contraire des fermetures répétées aux écoles libres.', mark: '0.5' }
					],
					tableIntro: '2. Classez les éléments suivants selon qu’ils relèvent des « Moyens d’action des Oulémas » ou des « Objectifs visés » : ouvrir des écoles libres, préserver la langue arabe, publier des journaux, défendre la personnalité algérienne.',
					tableCols: [
						{ header: 'Moyens d’action des Oulémas', items: ['ouvrir des écoles libres', 'publier des journaux'], mark: '0.75' },
						{ header: 'Objectifs visés', items: ['préserver la langue arabe', 'défendre la personnalité algérienne'], mark: '0.75' }
					],
					whQ: '3. Répondez aux questions suivantes d’après le texte :\na) Contre quelle politique coloniale l’Association des Oulémas a-t-elle été créée ?\nb) Quel rôle l’œuvre éducative des Oulémas a-t-elle joué dans le chemin vers l’indépendance ?',
					whA: '3. a) Elle a été créée face à la politique coloniale d’assimilation qui menaçait la religion, la langue et l’identité.\nb) Elle a préparé moralement et intellectuellement le peuple algérien à l’indépendance en formant une jeunesse instruite et patriote.',
					refQ: '4. a) À quoi renvoient « cette institution réformiste » (§1) et « Ils » (§2) ?\nb) Quelle est la visée communicative de ce document historique ?',
					refA: '4. a) « cette institution réformiste » : l’Association des Oulémas Musulmans Algériens | « Ils » : les Oulémas.\nb) Informer le lecteur sur l’action culturelle et patriotique des Oulémas et rendre hommage à leur rôle dans la sauvegarde de l’identité nationale.',
					easyQ: 'Selon le texte sur l’Association des Oulémas Musulmans Algériens, en quelle année cette association a-t-elle été fondée ?',
					easyCorrect: 'En 1931 (le 5 mai 1931)',
					easyDistractors: [
						{ text: 'En 1956 (le 20 août)', diagnosticFeedback: '20 أوت 1956 هو تاريخ مؤتمر الصومام.' },
						{ text: 'En 1962 (le 5 juillet)', diagnosticFeedback: '5 جويلية 1962 هو تاريخ الاستقلال.' },
						{ text: 'En 1954 (le 1er novembre)', diagnosticFeedback: 'أول نوفمبر 1954 هو تاريخ اندلاع الثورة التحريرية.' }
					],
					medQ: 'Dans le paragraphe 1 du texte sur l’Association des Oulémas, quel type de substitut est « cette institution réformiste » ?',
					medCorrect: 'Un substitut lexical renvoyant à l’Association des Oulémas Musulmans Algériens',
					medDistractors: [
						{ text: 'Un substitut grammatical pronominal', diagnosticFeedback: 'العبارة الاسمية « cette institution réformiste » بديل معجمي وليس ضميرا.' },
						{ text: 'Un indicateur de temps chronologique', diagnosticFeedback: 'إنها تحيل على الجمعية وليست ظرف زمان.' },
						{ text: 'Un connecteur logique de conséquence', diagnosticFeedback: 'ليست أداة ربط للنتيجة.' }
					],
					hardQ: 'Pourquoi l’auteur qualifie-t-il la renaissance culturelle de « rempart solide contre l’oubli et la soumission » ?',
					hardCorrect: 'Parce que l’éducation et la langue ont protégé l’identité algérienne face à l’assimilation coloniale',
					hardDistractors: [
						{ text: 'Parce que les écoles construisaient des murailles en pierre autour des villages', diagnosticFeedback: 'كلمة « rempart » مستعملة هنا مجازيا للدلالة على الحماية الثقافية والفكرية.' },
						{ text: 'Parce que les Oulémas refusaient tout enseignement de l’histoire', diagnosticFeedback: 'العلماء حرصوا على تعليم التاريخ واللغة العربية.' },
						{ text: 'Parce que l’administration coloniale encourageait les journaux réformistes', diagnosticFeedback: 'السلطات الاستعمارية ضيّقت على المدارس الحرة وأغلقتها مرارا.' }
					]
				}
			];

			const v = rng.pick(variants);
			const qMap =
				difficulty === 'easy'
					? { q: v.easyQ, ans: v.easyCorrect, dist: v.easyDistractors }
					: difficulty === 'medium'
						? { q: v.medQ, ans: v.medCorrect, dist: v.medDistractors }
						: { q: v.hardQ, ans: v.hardCorrect, dist: v.hardDistractors };

			const mcq = buildUniqueMcqOptions(qMap.ans, qMap.dist, rng);
			const quizQuestion: QuizQuestionPayload = {
				type: 'mcq',
				questionText: qMap.q,
				questionTextAr: qMap.q,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `Réponse exacte : ${qMap.ans}. Vérifiez toujours les repères et substituts dans le paragraphe concerné.`
			};

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — Analyse du texte',
				points: 7,
				instruction: 'Lisez attentivement le texte historique puis répondez aux questions ci-dessous.',
				content: [
					buildFrenchPassageBlock({
						title: v.title,
						paragraphs: v.paragraphs,
						source: v.source,
						glossary: v.glossary,
						numberedParagraphs: true
					}),
					{ type: 'text', content: '1. Répondez par « Vrai » ou « Faux » en justifiant les réponses fausses :' },
					{ type: 'true_false', items: v.tfItems },
					{ type: 'text', content: v.tableIntro },
					buildFrenchClassificationTableBlock({ columns: v.tableCols }),
					{ type: 'text', content: v.whQ, answer: v.whA, mark: '2' },
					{ type: 'text', content: v.refQ, answer: v.refA, mark: '1.5' }
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'Repérez d’abord les dates, lieux et personnages historiques clés dans chaque paragraphe.',
					'Pour Vrai/Faux, méfiez-vous des mots restrictifs comme « seule », « aucun » ou « uniquement ».',
					'Pour les substituts soulignés, relisez la phrase précédente en vérifiant le genre et le nombre.'
				],
				solutionStepsAr: [
					`Vrai/Faux : ${v.tfItems.map((t) => t.a).join(' / ')}`,
					v.whA,
					v.refA
				],
				finalAnswer: qMap.ans
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. COMPRÉHENSION (7 pts) — Moufdi Zakaria, Témoignages (Zabana / Ben Bouali), Écoles libres
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_sci_t1_comp_oulemas_patrimoine',
		grade: '3as_se',
		trimesterId: 't1',
		domain: 'comprehension_ecrit',
		titleAr: 'فهم المكتوب (7 ن): مفدي زكريا وشهادات الأبطال والمدرسة الجزائرية الحرة',
		curriculumLessonId: 'fre_lesson_3as_sci_t1_temoignage_discours_rapporte',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					title: 'Moufdi Zakaria : la plume au service de la liberté',
					source: 'D’après une notice biographique sur les poètes de la Révolution algérienne',
					paragraphs: [
						'Né en 1908 à Béni Isguen, dans la vallée du M’Zab, Moufdi Zakaria s’est très tôt imposé comme le poète engagé de la cause nationale algérienne. Formé à l’école de la culture arabe classique, [[il]] met sa plume lucide au service du réveil patriotique et de la dignité de son peuple.',
						'Arrêté en 1955 par les autorités coloniales et incarcéré à la prison de Barberousse à Alger, le poète ne renonce jamais à son combat. Dans sa cellule, il rédige les vers célèbres de « Kassaman », qui deviendra l’hymne national algérien. Un compagnon de détention témoigna plus tard : « Ses paroles nous donnaient une force morale inébranlable face à l’épreuve. »',
						'À travers ses poèmes patriotiques publiés durant la guerre et après 1962, Moufdi Zakaria a immortalisé le sacrifice des martyrs. [[Son œuvre]] demeure aujourd’hui un témoignage précieux qui unit la mémoire historique à l’amour sincère de la patrie.'
					],
					glossary: [
						{ term: 'incarcéré', meaning: 'emprisonné, mis en prison' },
						{ term: 'inébranlable', meaning: 'très solide, que rien ne peut faire céder' }
					],
					tfItems: [
						{ q: 'Moufdi Zakaria est né dans la vallée du M’Zab en 1908.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’emprisonnement à Barberousse mit fin à l’engagement poétique de Moufdi Zakaria.', a: 'Faux', c: 'En prison, il ne renonça jamais à son combat et rédigea les vers de « Kassaman ».', mark: '0.5' },
						{ q: 'Les vers de « Kassaman » sont devenus l’hymne national de l’Algérie.', a: 'Vrai', mark: '0.5' },
						{ q: 'Le texte ne comporte aucun témoignage rapporté au discours direct.', a: 'Faux', c: 'Le paragraphe 2 cite le témoignage direct d’un compagnon de détention.', mark: '0.5' }
					],
					tableIntro: '2. Classez ces éléments dans le tableau : « 1908 », « 1955 », « Béni Isguen (M’Zab) », « prison de Barberousse (Alger) » :',
					tableCols: [
						{ header: 'Repères temporels', items: ['1908', '1955'], mark: '0.75' },
						{ header: 'Repères spatiaux (lieux)', items: ['Béni Isguen (M’Zab)', 'prison de Barberousse (Alger)'], mark: '0.75' }
					],
					whQ: '3. Répondez aux questions suivantes :\na) Dans quelles circonstances Moufdi Zakaria a-t-il écrit les vers de « Kassaman » ?\nb) Pourquoi l’auteur insère-t-il le témoignage d’un compagnon de détention dans le paragraphe 2 ?',
					whA: '3. a) Il les a rédigés dans sa cellule alors qu’il était incarcéré à la prison de Barberousse à Alger après son arrestation en 1955.\nb) Pour authentifier les faits et montrer concrètement l’impact moral des vers du poète sur les détenus.',
					refQ: '4. a) À quoi renvoient « il » (§1) et « Son œuvre » (§3) ?\nb) Quelle est la visée communicative de ce texte ?',
					refA: '4. a) « il » : Moufdi Zakaria | « Son œuvre » : les poèmes patriotiques de Moufdi Zakaria (dont « Kassaman »).\nb) Informer le lecteur sur le parcours du poète Moufdi Zakaria et rendre hommage à son rôle dans la Révolution algérienne.',
					easyQ: 'Selon le texte sur Moufdi Zakaria, où le poète a-t-il rédigé les vers de « Kassaman » ?',
					easyCorrect: 'Dans sa cellule à la prison de Barberousse à Alger',
					easyDistractors: [
						{ text: 'Dans une bibliothèque de Constantine en 1962', diagnosticFeedback: 'النص يذكر بوضوح أنه كتبها وهو معتقل بسجن بربروس بالجزائر.' },
						{ text: 'À Béni Isguen à l’âge de dix ans', diagnosticFeedback: 'بني يزقن هي مسقط رأسه عام 1908 وليست مكان كتابة النشيد.' },
						{ text: 'Après la signature de l’indépendance', diagnosticFeedback: 'كتبها في السجن إثر اعتقاله عام 1955.' }
					],
					medQ: 'Quel est le rôle du témoignage cité au paragraphe 2 du texte sur Moufdi Zakaria ?',
					medCorrect: 'Authentifier les faits et montrer la force morale inspirée par ses vers',
					medDistractors: [
						{ text: 'Contredire la date de naissance du poète', diagnosticFeedback: 'الشهادة تؤكد أثر قصائده ولا تناقض التواريخ.' },
						{ text: 'Critiquer le style littéraire de la poésie classique', diagnosticFeedback: 'الشهادة تشيد بقوة كلماته المعنوية.' },
						{ text: 'Introduire une thèse adverse dans un débat', diagnosticFeedback: 'النص تاريخي تكريمي لا مناظرة أفكار.' }
					],
					hardQ: 'Si l’on rapporte la parole du compagnon de détention au discours indirect (« Un compagnon témoigna que... »), quelle forme obtient-on ?',
					hardCorrect: 'Un compagnon témoigna que ses paroles leur donnaient une force morale inébranlable.',
					hardDistractors: [
						{ text: 'Un compagnon témoigna que ses paroles nous donnent une force morale inébranlable.', diagnosticFeedback: 'يجب تحويل الضمير (nous -> leur) والحفاظ على الناقص.' },
						{ text: 'Un compagnon témoigna si ses paroles leur donnaient une force morale.', diagnosticFeedback: 'الجملة خبرية فتُربط بـ « que » لا « si ».' },
						{ text: 'Un compagnon témoigna de donner une force morale inébranlable.', diagnosticFeedback: 'ليست جملة أمرية بل جملة خبرية.' }
					]
				},
				{
					title: 'Ahmed Zabana et Hassiba Ben Bouali : visages du courage',
					source: 'D’après les chroniques de la mémoire nationale algérienne',
					paragraphs: [
						'La guerre de libération nationale a révélé le dévouement exemplaire d’une jeunesse algérienne prête à tout sacrifier pour la liberté. Parmi ces figures marquantes, Ahmed Zabana, né en 1926 près de Mascara, s’engage très jeune dans l’action patriotique. Capturé lors d’un affrontement en novembre 1954, [[il]] affronte la condamnation coloniale avec une dignité admirable le 19 juin 1956.',
						'À Alger, la jeune militante Hassiba Ben Bouali, née en 1938 à Chlef, choisit elle aussi la voie du sacrifice. Infirmière dévouée et agente de liaison dans la Casbah d’Alger, [[elle]] aide les blessés et soutient la résistance urbaine jusqu’à sa mort en martyr le 8 octobre 1957 aux côtés de ses compagnons.',
						'Les témoignages recueillis auprès des survivants insistent tous sur la sérénité et la foi profonde de ces jeunes héros. L’historien rappelle que leur engagement dépasse les générations et enseigne aux lycéens d’aujourd’hui le véritable sens du devoir envers la patrie.'
					],
					glossary: [
						{ term: 'dévouement', meaning: 'engagement total et désintéressé pour une noble cause' },
						{ term: 'sérénité', meaning: 'calme intérieur face à l’adversité' }
					],
					tfItems: [
						{ q: 'Ahmed Zabana a été capturé lors d’un affrontement en novembre 1954.', a: 'Vrai', mark: '0.5' },
						{ q: 'Hassiba Ben Bouali refusait de soigner les blessés de la résistance.', a: 'Faux', c: 'Infirmière dévouée, elle aidait les blessés et soutenait la résistance urbaine.', mark: '0.5' },
						{ q: 'Hassiba Ben Bouali est tombée en martyr dans la Casbah d’Alger le 8 octobre 1957.', a: 'Vrai', mark: '0.5' },
						{ q: 'Selon l’auteur, l’exemple de ces héros n’a plus aucun enseignement pour les jeunes actuels.', a: 'Faux', c: 'Leur engagement enseigne aux lycéens d’aujourd’hui le véritable sens du devoir envers la patrie.', mark: '0.5' }
					],
					tableIntro: '2. Complétez le tableau biographique à partir du texte (année de naissance + date du martyre) :',
					tableCols: [
						{ header: 'Ahmed Zabana', items: ['né en 1926', 'martyr le 19 juin 1956'], mark: '0.75' },
						{ header: 'Hassiba Ben Bouali', items: ['née en 1938', 'martyre le 8 octobre 1957'], mark: '0.75' }
					],
					whQ: '3. Répondez aux questions suivantes à partir du texte :\na) Quels rôles Hassiba Ben Bouali a-t-elle assumés dans la Casbah d’Alger ?\nb) Quelles qualités morales communes les témoignages des survivants mettent-ils en avant chez ces deux héros ?',
					whA: '3. a) Elle a travaillé comme infirmière dévouée pour soigner les blessés et comme agente de liaison dans la résistance urbaine.\nb) Leur sérénité, leur foi profonde et leur dévouement exemplaire pour la patrie.',
					refQ: '4. a) À qui renvoient « il » (§1) et « elle » (§2) ?\nb) Relevez deux adjectifs mélioratifs qui traduisent l’admiration de l’auteur.',
					refA: '4. a) « il » : Ahmed Zabana | « elle » : Hassiba Ben Bouali.\nb) Exemples acceptés : « exemplaire », « marquantes », « admirable », « dévouée », « profonde » (deux au choix).',
					easyQ: 'Selon le texte sur Ahmed Zabana et Hassiba Ben Bouali, quel rôle médical Hassiba Ben Bouali remplissait-elle dans la Casbah ?',
					easyCorrect: 'Elle était infirmière et soignait les blessés',
					easyDistractors: [
						{ text: 'Elle dirigeait un journal imprimé à Oran', diagnosticFeedback: 'النص يذكر أنها عملت ممرضة وضابطة اتصال في القصبة.' },
						{ text: 'Elle enseignait les mathématiques à Mascara', diagnosticFeedback: 'معسكر مرتبطة بولادة أحمد زبانة.' },
						{ text: 'Elle négociait les accords de 1962', diagnosticFeedback: 'استشهدت رحمها الله عام 1957 في القصبة.' }
					],
					medQ: 'À quelle date Ahmed Zabana est-il tombé en martyr selon le paragraphe 1 ?',
					medCorrect: 'Le 19 juin 1956',
					medDistractors: [
						{ text: 'Le 8 octobre 1957', diagnosticFeedback: 'هذا تاريخ استشهاد حسيبة بن بوعلي.' },
						{ text: 'Le 5 juillet 1962', diagnosticFeedback: 'هذا تاريخ استقلال الجزائر.' },
						{ text: 'Le 5 mai 1931', diagnosticFeedback: 'هذا تاريخ تأسيس جمعية العلماء المسلمين.' }
					],
					hardQ: 'Dans le paragraphe 3 (« L’historien rappelle que leur engagement dépasse les générations »), quel type de discours est utilisé ?',
					hardCorrect: 'Le discours indirect introduit par un verbe au présent',
					hardDistractors: [
						{ text: 'Le discours direct avec guillemets', diagnosticFeedback: 'لا توجد مزدوجتان بل جملة موصولة بـ « que ».' },
						{ text: 'Une phrase impérative d’appel', diagnosticFeedback: 'الجملة خبرية تنقل قول المؤرخ بصيغة غير مباشرة.' },
						{ text: 'Une interrogation directe', diagnosticFeedback: 'لا توجد أداة أو علامة استفهام.' }
					]
				},
				{
					title: 'Cheikh El-Ibrahimi et Cheikh Larbi Tebessi : l’école face à l’ignorance',
					source: 'D’après les archives culturelles de l’Association des Oulémas',
					paragraphs: [
						'Après la disparition de Cheikh Abdelhamid Ben Badis en avril 1940, Cheikh Mohamed Bachir El-Ibrahimi prend la présidence de l’Association des Oulémas Musulmans Algériens, épaulé par Cheikh Larbi Tebessi. Malgré les restrictions sévères de la période coloniale, [[ces deux savants]] poursuivent avec constance l’édification d’un réseau d’écoles algériennes libres.',
						'L’Institut Ben Badis de Constantine, inauguré en 1947, accueille bientôt des centaines d’élèves venus de toutes les régions du pays. [[Il]] assure une formation solide en langue arabe, en sciences religieuses et en histoire nationale. Les enseignants y travaillaient souvent avec des ressources modestes mais avec une conviction admirable.',
						'Lorsque la Révolution éclate en 1954, de nombreux anciens élèves de ces médersas rejoignent les rangs de la lutte pour l’indépendance. Cheikh Larbi Tebessi, enlevé par les forces coloniales en avril 1957, reste le symbole de l’engagement total du savant au service de sa nation.'
					],
					glossary: [
						{ term: 'édification', meaning: 'construction progressive et durable' },
						{ term: 'constance', meaning: 'persévérance fidèle malgré les obstacles' }
					],
					tfItems: [
						{ q: 'Cheikh Mohamed Bachir El-Ibrahimi a présidé l’Association des Oulémas après avril 1940.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’Institut Ben Badis de Constantine n’accueillait que les élèves d’un seul quartier.', a: 'Faux', c: 'Il accueillait des centaines d’élèves venus de toutes les régions du pays.', mark: '0.5' },
						{ q: 'De nombreux anciens élèves des médersas ont rejoint la Révolution après 1954.', a: 'Vrai', mark: '0.5' },
						{ q: 'Cheikh Larbi Tebessi a été enlevé par les forces coloniales en avril 1957.', a: 'Vrai', mark: '0.5' }
					],
					tableIntro: '2. Classez les matières et les lieux/dates mentionnés dans le texte :',
					tableCols: [
						{ header: 'Matières enseignées à l’Institut', items: ['langue arabe', 'sciences religieuses et histoire nationale'], mark: '0.75' },
						{ header: 'Dates clés du texte', items: ['avril 1940 et 1947', '1954 et avril 1957'], mark: '0.75' }
					],
					whQ: '3. Répondez aux questions suivantes :\na) Quel établissement majeur a été inauguré à Constantine en 1947 ?\nb) Quel lien historique le paragraphe 3 établit-il entre les médersas des Oulémas et la Révolution de 1954 ?',
					whA: '3. a) L’Institut Ben Badis de Constantine.\nb) De nombreux anciens élèves formés dans ces médersas ont rejoint les rangs de la Révolution de 1954 pour libérer le pays.',
					refQ: '4. a) À qui ou à quoi renvoient « ces deux savants » (§1) et « Il » (§2) ?\nb) Quelle est la visée communicative de ce texte ?',
					refA: '4. a) « ces deux savants » : Cheikh Mohamed Bachir El-Ibrahimi et Cheikh Larbi Tebessi | « Il » : l’Institut Ben Badis de Constantine.\nb) Informer sur le rôle éducatif et patriotique de Cheikh El-Ibrahimi et Cheikh Larbi Tebessi et honorer leur mémoire.',
					easyQ: 'Selon le texte sur Cheikh El-Ibrahimi et Cheikh Larbi Tebessi, en quelle année l’Institut Ben Badis de Constantine a-t-il été inauguré ?',
					easyCorrect: 'En 1947',
					easyDistractors: [
						{ text: 'En 1940', diagnosticFeedback: 'أفريل 1940 هو تاريخ وفاة الشيخ ابن باديس وتولي الشيخ الإبراهيمي الرئاسة.' },
						{ text: 'En 1957', diagnosticFeedback: 'أفريل 1957 هو تاريخ اختطاف الشيخ العربي التبسي.' },
						{ text: 'En 1931', diagnosticFeedback: '1931 هو تاريخ تأسيس الجمعية.' }
					],
					medQ: 'Dans le paragraphe 2, à quoi renvoie le pronom « Il » dans « Il assure une formation solide » ?',
					medCorrect: 'L’Institut Ben Badis de Constantine',
					medDistractors: [
						{ text: 'Cheikh Larbi Tebessi', diagnosticFeedback: 'الجملة السابقة مباشرة تعرف بمعهد ابن باديس بقسنطينة.' },
						{ text: 'Le mois d’avril 1940', diagnosticFeedback: 'لا يتطابق مع المعنى التربوي للفعل « assure une formation ».' },
						{ text: 'Le réseau colonial', diagnosticFeedback: 'المعهد تابع لجمعية العلماء المسلمين الجزائريين.' }
					],
					hardQ: 'Quelle est la valeur de l’imparfait « travaillaient » dans « Les enseignants y travaillaient souvent avec des ressources modestes » ?',
					hardCorrect: 'Imparfait d’habitude et de description d’une situation durable dans le passé',
					hardDistractors: [
						{ text: 'Action soudaine et unique achevée en une seconde', diagnosticFeedback: 'وجود الظرف « souvent » يؤكد التكرار والاستمرارية.' },
						{ text: 'Hypothèse irréelle portant sur le futur', diagnosticFeedback: 'الجملة تصف واقعا تاريخيا حقيقيا.' },
						{ text: 'Ordre adressé aux élèves actuels', diagnosticFeedback: 'الماضي الناقص لا يعبر عن الأمر.' }
					]
				}
			];

			const v = rng.pick(variants);
			const qMap =
				difficulty === 'easy'
					? { q: v.easyQ, ans: v.easyCorrect, dist: v.easyDistractors }
					: difficulty === 'medium'
						? { q: v.medQ, ans: v.medCorrect, dist: v.medDistractors }
						: { q: v.hardQ, ans: v.hardCorrect, dist: v.hardDistractors };

			const mcq = buildUniqueMcqOptions(qMap.ans, qMap.dist, rng);
			const quizQuestion: QuizQuestionPayload = {
				type: 'mcq',
				questionText: qMap.q,
				questionTextAr: qMap.q,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `Bonne réponse : ${qMap.ans}.`
			};

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — Analyse du texte',
				points: 7,
				instruction: 'Lisez soigneusement le document historique puis traitez les questions suivantes.',
				content: [
					buildFrenchPassageBlock({
						title: v.title,
						paragraphs: v.paragraphs,
						source: v.source,
						glossary: v.glossary,
						numberedParagraphs: true
					}),
					{ type: 'text', content: '1. Dites si les affirmations suivantes sont « Vrai » ou « Faux » (justifiez les énoncés faux) :' },
					{ type: 'true_false', items: v.tfItems },
					{ type: 'text', content: v.tableIntro },
					buildFrenchClassificationTableBlock({ columns: v.tableCols }),
					{ type: 'text', content: v.whQ, answer: v.whA, mark: '2' },
					{ type: 'text', content: v.refQ, answer: v.refA, mark: '1.5' }
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'Distinguez bien les dates de naissance, d’action et de commémoration.',
					'Un témoignage direct est reconnaissable aux deux-points et aux guillemets.',
					'Pour la visée communicative d’un texte historique, pensez toujours à « informer » et « rendre hommage ».'
				],
				solutionStepsAr: [
					`Vrai/Faux : ${v.tfItems.map((t) => t.a).join(' / ')}`,
					v.whA,
					v.refA
				],
				finalAnswer: qMap.ans
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. FONCTIONNEMENT DE LA LANGUE (7 pts) — Nominalisation, Passif, Objectivité
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_sci_t1_expl_nominalisation_passif',
		grade: '3as_se',
		trimesterId: 't1',
		domain: 'grammaire_syntaxe',
		titleAr: 'البناء اللغوي (7 ن): الاسمية والمبني للمجهول ومؤشرات الموضوعية والذاتية',
		curriculumLessonId: 'fre_lesson_3as_sci_t1_nominalisation_passif',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					lexQ: '1. Relevez dans la liste suivante quatre mots appartenant au champ lexical de la « lutte de libération » :\n(indépendance - souveraineté - récolte - moudjahidine - tourisme - révolution - météo)',
					lexA: '1. Champ lexical de la lutte de libération : indépendance, souveraineté, moudjahidine, révolution.',
					wordRows: [
						{ verbe: { given: true, value: 'libérer' }, nom: { value: 'libération', mark: '0.25' }, adjectif: { value: 'libre / libéré', mark: '0.25' } },
						{ verbe: { value: 'organiser', mark: '0.25' }, nom: { given: true, value: 'organisation' }, adjectif: { value: 'organisé', mark: '0.25' } },
						{ verbe: { value: 'résister', mark: '0.25' }, nom: { value: 'résistance', mark: '0.25' }, adjectif: { given: true, value: 'résistant' } }
					],
					rewriteQ:
						'3. Effectuez les transformations demandées :\na) Nominalisez la phrase : « Les dirigeants algériens déclenchèrent la révolution le 1er novembre 1954. »\nb) Mettez à la voix passive : « Le Congrès de la Soummam adopta une plateforme politique en 1956. »\nc) Mettez à la voix active : « Des écoles libres ont été fondées par l’Association des Oulémas. »',
					rewriteA:
						'3. a) Le déclenchement de la révolution par les dirigeants algériens le 1er novembre 1954.\nb) Une plateforme politique fut adoptée par le Congrès de la Soummam en 1956.\nc) L’Association des Oulémas a fondé des écoles libres.',
					objQ: '4. Indiquez pour chacune des deux phrases si l’énonciateur est « objectif » ou « subjectif » (justifiez brièvement) :\na) « L’indépendance de l’Algérie fut proclamée le 5 juillet 1962. »\nb) « Heureusement, un peuple courageux et digne a triomphé de l’injustice. »',
					objA: '4. a) Objectif : fait daté, 3e personne, voix passive, vocabulaire neutre.\nb) Subjectif (implicite) : adverbe modalisateur « Heureusement » et lexique évaluatif « courageux, digne, injustice ».',
					gapQ: '5. Complétez le paragraphe avec les mots suivants : (mémoire - souveraineté - sacrifice - histoire)\nL’étude de notre (1) ........ nationale permet aux jeunes de comprendre le prix de la (2) ........ . Préserver la (3) ........ des martyrs honore leur (4) ........ exemplaire.',
					gapA: '5. (1) histoire | (2) souveraineté | (3) mémoire | (4) sacrifice',
					easyQ: 'Quelle est la nominalisation correcte de la phrase : « Le Congrès organise la lutte nationale » ?',
					easyCorrect: 'L’organisation de la lutte nationale par le Congrès',
					easyDistractors: [
						{ text: 'L’organisement de la lutte nationale par le Congrès', diagnosticFeedback: 'اللاحقة الصحيحة للفعل « organiser » هي « -ation ».' },
						{ text: 'L’organiser de la lutte nationale par le Congrès', diagnosticFeedback: 'نحتاج اسما مشتقا وليس فعلا في المصدر.' },
						{ text: 'L’organisant de la lutte nationale par le Congrès', diagnosticFeedback: 'هذه صيغة اسم فاعل لا اسم الحدث.' }
					],
					medQ: 'Mettez à la voix passive : « Le Congrès de la Soummam adopta une plateforme politique en 1956. »',
					medCorrect: 'Une plateforme politique fut adoptée par le Congrès de la Soummam en 1956.',
					medDistractors: [
						{ text: 'Une plateforme politique est adoptée par le Congrès de la Soummam en 1956.', diagnosticFeedback: 'الفعل الأصلي في الماضي البسيط (adopta) فنستعمل « fut » لا « est ».' },
						{ text: 'Une plateforme politique fut adopté par le Congrès de la Soummam en 1956.', diagnosticFeedback: 'يجب مطابقة اسم المفعول مع المؤنث « plateforme » -> adoptée.' },
						{ text: 'Une plateforme politique était adoptée par le Congrès de la Soummam en 1956.', diagnosticFeedback: '« était » للماضي الناقص لا الماضي البسيط.' }
					],
					hardQ: 'Mettez à la voix passive : « On a diffusé la Déclaration du 1er Novembre dans toutes les régions. »',
					hardCorrect: 'La Déclaration du 1er Novembre a été diffusée dans toutes les régions.',
					hardDistractors: [
						{ text: 'La Déclaration du 1er Novembre a été diffusée dans toutes les régions par on.', diagnosticFeedback: 'نحذف الفاعل غير المحدد « on » تماما عند التحويل للمبني للمجهول.' },
						{ text: 'La Déclaration du 1er Novembre fut diffusée dans toutes les régions.', diagnosticFeedback: 'الفعل الأصلي في الماضي المركب (a diffusé) فنستعمل « a été diffusée ».' },
						{ text: 'La Déclaration du 1er Novembre a été diffusé dans toutes les régions.', diagnosticFeedback: 'الفاعل الجديد مؤنث فتجب المطابقة: diffusée.' }
					]
				},
				{
					lexQ: '1. Relevez les quatre termes appartenant au champ lexical de la « culture réformiste des Oulémas » :\n(médersa - savoir - identité - journal - usine - sport - autoroute)',
					lexA: '1. Champ lexical : médersa, savoir, identité, journal.',
					wordRows: [
						{ verbe: { given: true, value: 'proclamer' }, nom: { value: 'proclamation', mark: '0.25' }, adjectif: { value: 'proclamé', mark: '0.25' } },
						{ verbe: { value: 'fonder', mark: '0.25' }, nom: { given: true, value: 'fondation' }, adjectif: { value: 'fondateur / fondé', mark: '0.25' } },
						{ verbe: { value: 'unir', mark: '0.25' }, nom: { value: 'union / unité', mark: '0.25' }, adjectif: { given: true, value: 'uni' } }
					],
					rewriteQ:
						'3. Effectuez les transformations suivantes :\na) Nominalisez : « Les Oulémas créèrent des écoles libres dans toute l’Algérie. »\nb) Mettez à la voix passive : « Cheikh Ben Badis dirigeait le journal Al-Bassaïr. »\nc) Mettez à la voix passive : « On célèbre la Journée du Savoir chaque 16 avril. »',
					rewriteA:
						'3. a) La création d’écoles libres dans toute l’Algérie par les Oulémas.\nb) Le journal Al-Bassaïr était dirigé par Cheikh Ben Badis.\nc) La Journée du Savoir est célébrée chaque 16 avril.',
					objQ: '4. Pourquoi l’auteur emploie-t-il la tournure passive sans complément d’agent dans « La Journée du Savoir est célébrée chaque 16 avril » ?',
					objA: '4. Pour mettre en valeur l’événement lui-même (la Journée du Savoir) et conférer un ton objectif et général à l’information.',
					gapQ: '5. Complétez avec les mots convenables : (écoles - identité - jeunesse - langue)\nLes Oulémas ont défendu la (1) ........ arabe et l’(2) ........ nationale en ouvrant des (3) ........ libres destinées à éclairer la (4) ........ algérienne.',
					gapA: '5. (1) langue | (2) identité | (3) écoles | (4) jeunesse',
					easyQ: 'Quel nom dérive correctement du verbe « fonder » ?',
					easyCorrect: 'La fondation',
					easyDistractors: [
						{ text: 'Le fondementation', diagnosticFeedback: 'كلمة غير صحيحة؛ الاسم المشتق هو « la fondation ».' },
						{ text: 'La fondage', diagnosticFeedback: 'اللاحقة « -age » لا تناسب « fonder » هنا.' },
						{ text: 'La fonderie historique', diagnosticFeedback: '« fonderie » تعني مصهر المعادن لا تأسيس مؤسسة.' }
					],
					medQ: 'Mettez à la voix passive : « Cheikh Ben Badis dirigeait le journal Al-Bassaïr. »',
					medCorrect: 'Le journal Al-Bassaïr était dirigé par Cheikh Ben Badis.',
					medDistractors: [
						{ text: 'Le journal Al-Bassaïr fut dirigé par Cheikh Ben Badis.', diagnosticFeedback: 'الفعل « dirigeait » في الماضي الناقص فنستعمل « était dirigé ».' },
						{ text: 'Le journal Al-Bassaïr est dirigé par Cheikh Ben Badis.', diagnosticFeedback: 'لا نغيّر الزمن إلى الحاضر.' },
						{ text: 'Le journal Al-Bassaïr avait été dirigé par Cheikh Ben Badis.', diagnosticFeedback: '« avait été » تخص الـ plus-que-parfait.' }
					],
					hardQ: 'Mettez à la voix active : « De nombreux témoignages historiques sont conservés par les archives nationales. »',
					hardCorrect: 'Les archives nationales conservent de nombreux témoignages historiques.',
					hardDistractors: [
						{ text: 'Les archives nationales conservaient de nombreux témoignages historiques.', diagnosticFeedback: 'المساعد « sont » في الحاضر، فالفعل المعلوم يبقى في الحاضر (conservent).' },
						{ text: 'Les archives nationales ont conservé de nombreux témoignages historiques.', diagnosticFeedback: 'لا نغيّر الحاضر إلى الماضي المركب.' },
						{ text: 'Les archives nationales conserve de nombreux témoignages historiques.', diagnosticFeedback: 'الفاعل « Les archives nationales » جمع فيأخذ « conservent ».' }
					]
				},
				{
					lexQ: '1. Trouvez l’intrus dans chacune de ces deux séries lexicales :\na) martyr - patriote - combattant - vacancier\nb) chronologie - archive - témoignage - publicité',
					lexA: '1. a) Intrus : vacancier | b) Intrus : publicité',
					wordRows: [
						{ verbe: { given: true, value: 'commémorer' }, nom: { value: 'commémoration', mark: '0.25' }, adjectif: { value: 'commémoratif', mark: '0.25' } },
						{ verbe: { value: 'témoigner', mark: '0.25' }, nom: { given: true, value: 'témoignage' }, adjectif: { value: 'témoin', mark: '0.25' } },
						{ verbe: { value: 'construire', mark: '0.25' }, nom: { value: 'construction', mark: '0.25' }, adjectif: { given: true, value: 'constructif' } }
					],
					rewriteQ:
						'3. Réécrivez les phrases suivantes selon la consigne :\na) Nominalisez : « Les accords d’Évian sont signés en mars 1962. »\nb) Mettez à la voix passive : « Les historiens recueillent les témoignages des moudjahidine. »\nc) Mettez à la voix active : « La lutte armée fut soutenue par tout le peuple algérien. »',
					rewriteA:
						'3. a) La signature des accords d’Évian en mars 1962.\nb) Les témoignages des moudjahidine sont recueillis par les historiens.\nc) Tout le peuple algérien soutint la lutte armée.',
					objQ: '4. Relevez dans la phrase suivante un indice de subjectivité et précisez s’il est mélioratif ou péjoratif :\n« Le régime colonial imposa des mesures arbitraires à la population algérienne. »',
					objA: '4. L’adjectif « arbitraires » est un indice de subjectivité implicite à valeur péjorative (dénonciation de l’injustice).',
					gapQ: '5. Complétez ce court bilan avec les mots proposés : (dates - passif - nominalisation - objectif)\nDans un texte historique (1) ........, l’auteur utilise souvent des (2) ........ précises, la voix (3) ........ pour mettre en valeur les faits et la (4) ........ dans les titres.',
					gapA: '5. (1) objectif | (2) dates | (3) passif (tournure passive) | (4) nominalisation',
					easyQ: 'Quelle est la forme nominale du verbe « signer » dans « Les accords sont signés » ?',
					easyCorrect: 'La signature des accords',
					easyDistractors: [
						{ text: 'Le signement des accords', diagnosticFeedback: 'الاسم الصحيح هو « la signature ».' },
						{ text: 'La signation des accords', diagnosticFeedback: 'كلمة غير موجودة في اللغة الفرنسية.' },
						{ text: 'Le signant des accords', diagnosticFeedback: 'هذه ليست صيغة nominalisation صحيحة.' }
					],
					medQ: 'Mettez à la voix active : « La lutte armée fut soutenue par tout le peuple algérien. »',
					medCorrect: 'Tout le peuple algérien soutint la lutte armée.',
					medDistractors: [
						{ text: 'Tout le peuple algérien soutient la lutte armée.', diagnosticFeedback: 'المساعد « fut » في الماضي البسيط فالفعل يصبح « soutint ».' },
						{ text: 'Tout le peuple algérien soutenait la lutte armée.', diagnosticFeedback: '« soutenait » ماضٍ ناقص وليس ماضيا بسيطا.' },
						{ text: 'Tout le peuple algérien soutiendra la lutte armée.', diagnosticFeedback: 'لا نحوّل الماضي البسيط إلى مستقبل.' }
					],
					hardQ: 'Mettez à la voix passive : « Les historiens recueillent les témoignages des moudjahidine. »',
					hardCorrect: 'Les témoignages des moudjahidine sont recueillis par les historiens.',
					hardDistractors: [
						{ text: 'Les témoignages des moudjahidine sont recueilli par les historiens.', diagnosticFeedback: 'نسيت حرف « s » لمطابقة الجمع المذكر « Les témoignages ».' },
						{ text: 'Les témoignages des moudjahidine furent recueillis par les historiens.', diagnosticFeedback: 'الفعل الأصلي في الحاضر (recueillent) فنستعمل « sont ».' },
						{ text: 'Les témoignages des moudjahidine étaient recueillis par les historiens.', diagnosticFeedback: 'لا نغيّر الحاضر إلى الماضي الناقص.' }
					]
				}
			];

			const v = rng.pick(variants);
			const qMap =
				difficulty === 'easy'
					? { q: v.easyQ, ans: v.easyCorrect, dist: v.easyDistractors }
					: difficulty === 'medium'
						? { q: v.medQ, ans: v.medCorrect, dist: v.medDistractors }
						: { q: v.hardQ, ans: v.hardCorrect, dist: v.hardDistractors };

			const mcq = buildUniqueMcqOptions(qMap.ans, qMap.dist, rng);
			const quizQuestion: QuizQuestionPayload = {
				type: 'mcq',
				questionText: qMap.q,
				questionTextAr: qMap.q,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `Réponse correcte : ${qMap.ans}`
			};

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — Fonctionnement de la langue',
				points: 7,
				instruction: 'Traitez avec précision les activités lexicales, syntaxiques et discursives suivantes.',
				content: [
					{ type: 'text', content: v.lexQ, answer: v.lexA, mark: '1' },
					{ type: 'text', content: '2. Complétez le tableau de la famille de mots ci-dessous :' },
					buildFrenchWordFamilyTableBlock(v.wordRows),
					{ type: 'text', content: v.rewriteQ, answer: v.rewriteA, mark: '2.5' },
					{ type: 'text', content: v.objQ, answer: v.objA, mark: '1' },
					{ type: 'text', content: v.gapQ, answer: v.gapA, mark: '1' }
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'En nominalisation, transformez le verbe conjugué en nom abstrait (-tion, -ment, -ance, -ure).',
					'À la voix passive, conservez exactement le temps du verbe actif dans l’auxiliaire être et accordez le participe passé.',
					'Supprimez toujours le sujet indéfini « on » lors du passage au passif.'
				],
				solutionStepsAr: [v.lexA, v.rewriteA, v.objA, v.gapA],
				finalAnswer: qMap.ans
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. FONCTIONNEMENT DE LA LANGUE (7 pts) — Temps historiques & Discours rapporté
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_sci_t1_expl_temps_discours_rapporte',
		grade: '3as_se',
		trimesterId: 't1',
		domain: 'conjugaison_temps',
		titleAr: 'البناء اللغوي (7 ن): أزمنة النص التاريخي والكلام المنقول والمؤشرات الزمنية',
		curriculumLessonId: 'fre_lesson_3as_sci_t1_temps_histoire_chronologie',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					lexQ: '1. Relevez deux synonymes possibles pour chacun des mots suivants tirés du récit historique :\na) patriote   b) témoignage',
					lexA: '1. a) patriote : nationaliste, défenseur de la patrie | b) témoignage : récit vécu, déclaration de témoin',
					tableIntro: '2. Classez les verbes soulignés selon leur valeur temporelle : « Le peuple vivait dans la privation. » | « Soudain, l’insurrection éclata en 1954. » | « En 1956, la Soummam organise la lutte. »',
					tableCols: [
						{ header: 'Imparfait (décor / durée)', items: ['vivait'], mark: '0.5' },
						{ header: 'Passé simple (action brève)', items: ['éclata'], mark: '0.5' },
						{ header: 'Présent historique (actualisation)', items: ['organise'], mark: '0.5' }
					],
					rewriteQ:
						'3. Transposez les paroles suivantes au discours indirect :\na) Un ancien combattant affirma : « Nous avons défendu notre terre avec honneur. »\nb) Le journaliste demanda au témoin : « Avez-vous participé aux événements d’hier ? »\nc) Le responsable ordonna aux militants : « Préservez l’unité du mouvement ! »',
					rewriteA:
						'3. a) Un ancien combattant affirma qu’ils avaient défendu leur terre avec honneur.\nb) Le journaliste demanda au témoin s’il avait participé aux événements de la veille.\nc) Le responsable ordonna aux militants de préserver l’unité du mouvement.',
					tenseQ: '4. Conjuguez les verbes entre parenthèses à l’imparfait ou au passé simple selon le contexte :\n« Les habitants (attendre) la liberté depuis longtemps quand la bonne nouvelle (arriver) enfin en juillet 1962. »',
					tenseA: '4. attendaient (imparfait : durée) / arriva (passé simple : action soudaine et achevée).',
					gapQ: '5. Complétez avec les repères chronologiques convenables : (D’abord - Deux ans plus tard - Enfin - En 1954)\n(1) ........, la Révolution éclate dans tout le pays. (2) ........, les militants diffusent la Proclamation. (3) ........, le Congrès de la Soummam structure les wilayas. (4) ........, l’indépendance est acquise en 1962.',
					gapA: '5. (1) En 1954 | (2) D’abord | (3) Deux ans plus tard | (4) Enfin',
					easyQ: 'Dans le discours indirect avec un verbe introducteur au passé (Il déclara...), que devient l’indicateur temporel « hier » ?',
					easyCorrect: 'la veille',
					easyDistractors: [
						{ text: 'le lendemain', diagnosticFeedback: '« le lendemain » تقابل كلمة « demain » (غدا).' },
						{ text: 'ce jour-là', diagnosticFeedback: '« ce jour-là » تقابل كلمة « aujourd’hui » (اليوم).' },
						{ text: 'hier', diagnosticFeedback: 'لا تبقى « hier » كما هي مع فعل قول في الماضي.' }
					],
					medQ: 'Transposez au discours indirect : Un moudjahid affirma : « Nous avons défendu notre terre avec honneur. »',
					medCorrect: 'Un moudjahid affirma qu’ils avaient défendu leur terre avec honneur.',
					medDistractors: [
						{ text: 'Un moudjahid affirma qu’ils ont défendu leur terre avec honneur.', diagnosticFeedback: 'فعل القول في الماضي (affirma)، فيتحول الـ passé composé إلى plus-que-parfait.' },
						{ text: 'Un moudjahid affirma que nous avions défendu notre terre avec honneur.', diagnosticFeedback: 'يجب تحويل ضمير المتكلم « nous » إلى « ils » و « notre » إلى « leur ».' },
						{ text: 'Un moudjahid affirma s’ils avaient défendu leur terre avec honneur.', diagnosticFeedback: 'الجملة خبرية فتُربط بـ « que » لا « si ».' }
					],
					hardQ: 'Transposez au discours indirect : Le responsable ordonna aux jeunes : « Préservez l’unité du mouvement ! »',
					hardCorrect: 'Le responsable ordonna aux jeunes de préserver l’unité du mouvement.',
					hardDistractors: [
						{ text: 'Le responsable ordonna aux jeunes qu’ils préservaient l’unité du mouvement.', diagnosticFeedback: 'فعل الأمر يتحول في الكلام غير المباشر إلى « de + infinitif ».' },
						{ text: 'Le responsable ordonna aux jeunes de préservez l’unité du mouvement.', diagnosticFeedback: 'بعد حرف الجر « de » نكتب المصدر « préserver ».' },
						{ text: 'Le responsable ordonna aux jeunes si préserver l’unité du mouvement.', diagnosticFeedback: 'لا نستعمل « si » في تحويل الأمر.' }
					]
				},
				{
					lexQ: '1. Associez chaque marqueur chronologique à sa valeur (antériorité / simultanéité / postériorité) :\na) La veille   b) Pendant ce temps   c) Trois mois plus tard   d) Auparavant',
					lexA: '1. Antériorité : La veille, Auparavant | Simultanéité : Pendant ce temps | Postériorité : Trois mois plus tard.',
					tableIntro: '2. Classez ces phrases selon que le discours rapporté est « Direct » ou « Indirect » : (A) L’historien dit : « Ce document est authentique. » | (B) Il affirme que ce document est authentique. | (C) Elle demanda s’il viendrait.',
					tableCols: [
						{ header: 'Discours direct', items: ['Phrase (A)'], mark: '0.75' },
						{ header: 'Discours indirect', items: ['Phrases (B) et (C)'], mark: '0.75' }
					],
					rewriteQ:
						'3. Passez du discours direct au discours indirect :\na) Cheikh Ben Badis déclara : « La science guidera la nation vers le progrès. »\nb) L’historien explique : « Les écoles libres ont sauvegardé la langue arabe. »\nc) L’élève demanda au professeur : « Qu’est-ce qui a déclenché le Congrès de la Soummam ? »',
					rewriteA:
						'3. a) Cheikh Ben Badis déclara que la science guiderait la nation vers le progrès.\nb) L’historien explique que les écoles libres ont sauvegardé la langue arabe. (Verbe introducteur au présent : temps inchangé.)\nc) L’élève demanda au professeur ce qui avait déclenché le Congrès de la Soummam.',
					tenseQ: '4. Quelle est la valeur du présent dans la phrase suivante : « Le 5 mai 1931, l’Association des Oulémas voit le jour à Alger » ?',
					tenseA: '4. C’est un présent historique (ou de narration) : il actualise l’événement passé et le rend plus vivant aux yeux du lecteur.',
					gapQ: '5. Complétez avec la forme verbale exacte : (était - annonça - avait rédigé - resterait)\nLe témoin se souvenait que la nuit (1) ........ froide lorsqu’on (2) ........ le début de la lutte. Il précisa qu’il (3) ........ des tracts la veille et jura que le peuple (4) ........ uni.',
					gapA: '5. (1) était | (2) annonça | (3) avait rédigé | (4) resterait',
					easyQ: 'Au discours indirect après « L’historien explique : « Les écoles ont formé la jeunesse » », que devient le verbe « ont formé » ?',
					easyCorrect: 'Il reste « ont formé » car le verbe introducteur « explique » est au présent',
					easyDistractors: [
						{ text: 'Il devient « avaient formé » obligatoirement', diagnosticFeedback: 'لا نغيّر الأزمنة عندما يكون فعل القول في الحاضر (explique).' },
						{ text: 'Il devient « formeront » au futur', diagnosticFeedback: 'يبقى الماضي المركب كما هو مع فعل قول حاضر.' },
						{ text: 'Il devient « formeraient » au conditionnel', diagnosticFeedback: 'الشرطي يقابل المستقبل مع فعل قول ماضٍ.' }
					],
					medQ: 'Transposez au discours indirect : Cheikh Ben Badis déclara : « La science guidera la nation. »',
					medCorrect: 'Cheikh Ben Badis déclara que la science guiderait la nation.',
					medDistractors: [
						{ text: 'Cheikh Ben Badis déclara que la science guidera la nation.', diagnosticFeedback: 'مع فعل القول الماضي (déclara)، يتحول المستقبل البسيط إلى conditionnel présent.' },
						{ text: 'Cheikh Ben Badis déclara que la science guidait la nation.', diagnosticFeedback: 'الـ imparfait يقابل الحاضر لا المستقبل.' },
						{ text: 'Cheikh Ben Badis déclara si la science guiderait la nation.', diagnosticFeedback: 'الجملة خبرية فتأخذ « que ».' }
					],
					hardQ: 'Transposez au discours indirect : L’élève demanda : « Qu’est-ce qui a déclenché le Congrès de la Soummam ? »',
					hardCorrect: 'L’élève demanda ce qui avait déclenché le Congrès de la Soummam.',
					hardDistractors: [
						{ text: 'L’élève demanda ce que avait déclenché le Congrès de la Soummam.', diagnosticFeedback: 'أداة السؤال « Qu’est-ce qui » تتحول إلى « ce qui » لا « ce que ».' },
						{ text: 'L’élève demanda qu’est-ce qui avait déclenché le Congrès de la Soummam ?', diagnosticFeedback: 'في الكلام غير المباشر نستبدل « qu’est-ce qui » بـ « ce qui » ونحذف علامة الاستفهام.' },
						{ text: 'L’élève demanda si avait déclenché le Congrès de la Soummam.', diagnosticFeedback: 'السؤال ليس مغلقا فلا نستخدم « si ».' }
					]
				},
				{
					lexQ: '1. Relevez dans la phrase suivante le verbe introducteur de parole et précisez son temps :\n« Un témoin de la Casbah raconta que la solidarité des habitants protégeait les résistants. »',
					lexA: '1. Verbe introducteur : « raconta », conjugué au passé simple de l’indicatif.',
					tableIntro: '2. Classez les transformations temporelles suivantes (verbe introducteur au passé) : présent devient imparfait, futur devient conditionnel présent, passé composé devient plus-que-parfait :',
					tableCols: [
						{ header: 'Discours direct', items: ['je vois / j’ai vu / je verrai'], mark: '0.75' },
						{ header: 'Discours indirect (passé)', items: ['il voyait / il avait vu / il verrait'], mark: '0.75' }
					],
					rewriteQ:
						'3. Effectuez les transformations demandées :\na) Passez au discours indirect : Le témoin précisa : « Demain, nous rejoindrons la délégation. »\nb) Passez au discours direct : Le professeur a affirmé que le 1er novembre 1954 était une date fondatrice.\nc) Passez au discours indirect : Le journaliste demanda : « Où les archives ont-elles été conservées ? »',
					rewriteA:
						'3. a) Le témoin précisa que le lendemain, ils rejoindraient la délégation.\nb) Le professeur a affirmé : « Le 1er novembre 1954 est une date fondatrice. »\nc) Le journaliste demanda où les archives avaient été conservées.',
					tenseQ: '4. Conjuguez à l’imparfait ou au passé simple :\n« Tandis que les élèves (réciter) leur leçon d’histoire, le directeur (entrer) dans la salle. »',
					tenseA: '4. récitaient (imparfait : action en cours) / entra (passé simple : action brève et soudaine).',
					gapQ: '5. Complétez avec les mots convenables : (guillemets - authentique - indirect - témoignage)\nLe (1) ........ rend le récit historique plus (2) ........ . Lorsqu’on le rapporte au discours (3) ........, on supprime les (4) ........ et on adapte les temps.',
					gapA: '5. (1) témoignage | (2) authentique | (3) indirect | (4) guillemets',
					easyQ: 'Lorsque le verbe introducteur est au passé, que devient « demain » au discours indirect ?',
					easyCorrect: 'le lendemain',
					easyDistractors: [
						{ text: 'la veille', diagnosticFeedback: '« la veille » تقابل « hier ».' },
						{ text: 'ce jour-là', diagnosticFeedback: '« ce jour-là » تقابل « aujourd’hui ».' },
						{ text: 'maintenant', diagnosticFeedback: '« maintenant » تتحول هي الأخرى إلى « alors / à ce moment-là ».' }
					],
					medQ: 'Passez au discours indirect : Le journaliste demanda : « Où les archives ont-elles été conservées ? »',
					medCorrect: 'Le journaliste demanda où les archives avaient été conservées.',
					medDistractors: [
						{ text: 'Le journaliste demanda où avaient-elles été conservées les archives ?', diagnosticFeedback: 'في الكلام غير المباشر نلغي قلب الفاعل ونحذف علامة الاستفهام.' },
						{ text: 'Le journaliste demanda si les archives avaient été conservées.', diagnosticFeedback: 'نحافظ على أداة الاستفهام « où » ولا نستبدلها بـ « si ».' },
						{ text: 'Le journaliste demanda où les archives ont été conservées.', diagnosticFeedback: 'فعل القول في الماضي (demanda) لذا « ont été » تصبح « avaient été ».' }
					],
					hardQ: 'Transposez au discours direct : « Le professeur a affirmé que le 1er novembre 1954 était une date fondatrice. »',
					hardCorrect: 'Le professeur a affirmé : « Le 1er novembre 1954 est une date fondatrice. »',
					hardDistractors: [
						{ text: 'Le professeur a affirmé : « Le 1er novembre 1954 sera une date fondatrice. »', diagnosticFeedback: 'نعود من الماضي الناقص (était) إلى الحاضر (est) لا إلى المستقبل.' },
						{ text: 'Le professeur a affirmé que : « Le 1er novembre 1954 est une date fondatrice. »', diagnosticFeedback: 'لا نجمع بين « que » والنقطتين والمزدوجتين في الكلام المباشر.' },
						{ text: 'Le professeur a affirmé : « Le 1er novembre 1954 avait été une date fondatrice. »', diagnosticFeedback: '« était » في غير المباشر تقابل « est » في المباشر.' }
					]
				}
			];

			const v = rng.pick(variants);
			const qMap =
				difficulty === 'easy'
					? { q: v.easyQ, ans: v.easyCorrect, dist: v.easyDistractors }
					: difficulty === 'medium'
						? { q: v.medQ, ans: v.medCorrect, dist: v.medDistractors }
						: { q: v.hardQ, ans: v.hardCorrect, dist: v.hardDistractors };

			const mcq = buildUniqueMcqOptions(qMap.ans, qMap.dist, rng);
			const quizQuestion: QuizQuestionPayload = {
				type: 'mcq',
				questionText: qMap.q,
				questionTextAr: qMap.q,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `Transformation exacte : ${qMap.ans}`
			};

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — Fonctionnement de la langue',
				points: 7,
				instruction: 'Répondez avec rigueur aux exercices de conjugaison, de discours rapporté et de cohérence.',
				content: [
					{ type: 'text', content: v.lexQ, answer: v.lexA, mark: '1' },
					{ type: 'text', content: v.tableIntro },
					buildFrenchClassificationTableBlock({ columns: v.tableCols }),
					{ type: 'text', content: v.rewriteQ, answer: v.rewriteA, mark: '2.5' },
					{ type: 'text', content: v.tenseQ, answer: v.tenseA, mark: '1' },
					{ type: 'text', content: v.gapQ, answer: v.gapA, mark: '1' }
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'Vérifiez toujours le temps du verbe introducteur avant de changer les temps au discours indirect.',
					'Supprimez les deux-points, les guillemets, le point d’interrogation et l’inversion du sujet au discours indirect.',
					'L’imparfait décrit la durée ou l’arrière-plan ; le passé simple marque l’événement bref et décisif.'
				],
				solutionStepsAr: [v.lexA, v.rewriteA, v.tenseA, v.gapA],
				finalAnswer: qMap.ans
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. PRODUCTION ÉCRITE (6 pts) — Sujet 1 Compte Rendu Objectif / Sujet 2 Libre
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_sci_t1_written_cr_historique',
		grade: '3as_se',
		trimesterId: 't1',
		domain: 'production_ecrite',
		titleAr: 'التعبير الكتابي (6 ن): التقرير الموضوعي لنص تاريخي أو مقال توثيقي للبكالوريا',
		curriculumLessonId: 'fre_lesson_3as_sci_t1_compte_rendu_historique',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					sujetUnTitle: 'Sujet 1 (Compte rendu objectif) :',
					sujetUnPrompt:
						'Rédigez le compte rendu objectif (environ 100 à 120 mots) d’un texte historique intitulé « Le 1er novembre 1954 : une nuit décisive » (d’après une synthèse documentaire sur la Guerre de Libération) qui sera publié dans le journal scolaire du lycée à l’occasion de la commémoration du 1er Novembre.',
					sujetUnNotes: [
						'Introduction (accroche) : nature du texte, titre, source et thème général.',
						'Développement (3e personne, au présent) : résumer le déclenchement coordonné, la Proclamation du 1er Novembre, le courage des moudjahidine et l’aboutissement en 1962.',
						'Visée : rappeler le but informatif et commémoratif sans exprimer d’avis personnel.',
						'Éviter toute copie mot pour mot et soigner les connecteurs (D’abord, Ensuite, Enfin).'
					],
					sujetDeuxPrompt:
						'À l’occasion de la Journée du Savoir (16 avril), votre lycée organise une exposition sur le rôle de l’Association des Oulémas Musulmans Algériens. Rédigez un court texte historique (100 à 130 mots) pour informer vos camarades sur l’action éducative de Cheikh Abdelhamid Ben Badis et de ses compagnons.',
					modelAnswer:
						'Ce texte historique, intitulé « Le 1er novembre 1954 : une nuit décisive » et tiré d’une synthèse documentaire sur la Guerre de Libération nationale, retrace le déclenchement de la révolution algérienne et sa portée historique.\nD’abord, l’auteur rappelle que dans la nuit du 1er novembre 1954, des patriotes déterminés tels que Didouche Mourad et Larbi Ben M’hidi ont lancé des opérations coordonnées dans plusieurs régions, marquant la naissance du FLN. Ensuite, il explique que la Proclamation du 1er Novembre a clairement défini l’objectif d’un État algérien souverain tout en appelant à l’unité nationale. Enfin, il souligne que le courage des moudjahidine et l’adhésion du peuple ont conduit à l’indépendance le 5 juillet 1962. L’auteur vise ainsi à informer les lecteurs et à rendre hommage aux héros de Novembre.',
					rubricSummary: 'Conformité à la consigne et fidélité au texte (2 pts) | Cohérence, structure en paragraphes et connecteurs (1.5 pt) | Correction linguistique : temps, accords, ponctuation (2 pts) | Présentation et propreté (0.5 pt)',
					easyQ: 'Dans le Sujet 1 (Compte rendu objectif), quel pronom personnel doit être strictement banni ?',
					easyCorrect: 'Le pronom « je » (avis personnel de l’élève)',
					easyDistractors: [
						{ text: 'Le pronom « il » renvoyant à l’auteur', diagnosticFeedback: 'ضمير الغائب « il / l’auteur » هو المعتمد في التقرير الموضوعي.' },
						{ text: 'Le pronom « ils » renvoyant aux patriotes', diagnosticFeedback: 'ضمير الغائب الجمع مسموح وضروري.' },
						{ text: 'Le pronom relatif « qui »', diagnosticFeedback: 'ضمائر الوصل مفيدة لربط الجمل.' }
					],
					medQ: 'Quelle est la meilleure accroche pour le compte rendu objectif d’un texte historique sur le 1er novembre 1954 ?',
					medCorrect: 'Ce texte historique, intitulé « Le 1er novembre 1954 : une nuit décisive », extrait d’une synthèse documentaire, retrace le déclenchement de la Révolution algérienne.',
					medDistractors: [
						{ text: 'Je trouve que le texte sur le 1er novembre 1954 est magnifique et très émouvant.', diagnosticFeedback: 'تعبير ذاتي ممنوع في التقرير الموضوعي.' },
						{ text: 'Le texte a trois paragraphes et parle de 1954 et de 1962.', diagnosticFeedback: 'مقدمة سطحية تنقصها عناصر النص المحيط والفكرة العامة.' },
						{ text: 'Dans la nuit du 31 octobre au 1er novembre 1954, des opérations éclatent...', diagnosticFeedback: 'هذا نسخ مباشر للفقرة الأولى وليس مقدمة تقرير موضوعي.' }
					],
					hardQ: 'Pourquoi la dernière phrase du modèle (« L’auteur vise ainsi à informer les lecteurs et à rendre hommage... ») est-elle conforme au compte rendu OBJECTIF ?',
					hardCorrect: 'Parce qu’elle dégage objectivement la visée du texte à la 3e personne sans jugement personnel',
					hardDistractors: [
						{ text: 'Parce qu’elle critique le style de l’auteur', diagnosticFeedback: 'النقد الشخصي يخص التقرير النقدي (الشعب الأدبية) لا الموضوعي.' },
						{ text: 'Parce qu’elle invente des faits absents du texte', diagnosticFeedback: 'الجملة أمينة تماما لمضمون النص.' },
						{ text: 'Parce qu’elle emploie l’impératif direct', diagnosticFeedback: 'الجملة خبرية بالمضارع وبضمير الغائب.' }
					]
				},
				{
					sujetUnTitle: 'Sujet 1 (Compte rendu objectif) :',
					sujetUnPrompt:
						'Faites le compte rendu objectif (environ 100 à 120 mots) d’un texte historique portant sur le Congrès de la Soummam (20 août 1956), extrait des archives de la Révolution algérienne, afin de présenter ses principales décisions dans la revue du lycée.',
					sujetUnNotes: [
						'Présenter la nature, le titre, la source et le thème dès l’accroche.',
						'Reformuler au présent et à la 3e personne : lieu et date du Congrès, principes politiques, découpage en 6 wilayas, création du CNRA.',
						'Préciser l’impact sur la discipline et la crédibilité internationale.',
						'Conclure en indiquant la visée informative de l’auteur (zéro opinion personnelle).'
					],
					sujetDeuxPrompt:
						'Votre club culturel prépare un livret intitulé « Figures de notre histoire ». Rédigez un texte historique (100 à 130 mots) présentant le parcours patriotique d’une personnalité algérienne de votre choix (par exemple Moufdi Zakaria, Larbi Ben M’hidi ou Hassiba Ben Bouali) en veillant à l’exactitude des repères.',
					modelAnswer:
						'Ce texte historique, intitulé « Le Congrès de la Soummam : organiser la Révolution » et issu des archives de la Révolution algérienne, met en évidence le rôle structurant de la réunion tenue le 20 août 1956.\nD’abord, l’auteur rappelle que malgré le contexte militaire difficile, les dirigeants de la révolution se sont réunis secrètement à Ifri, dans la vallée de la Soummam, pour coordonner le combat national. Ensuite, il explique que la Plateforme adoptée a consacré deux principes majeurs : la primauté du politique sur le militaire et celle de l’intérieur sur l’extérieur, tout en divisant le pays en six wilayas. Enfin, il montre que la création d’institutions comme le CNRA a renforcé la discipline et la crédibilité internationale de la cause algérienne. Ce texte vise ainsi à informer sur ce tournant décisif de l’histoire nationale.',
					rubricSummary: 'Pertinence et fidélité au texte source (2 pts) | Organisation logique et reformulation (1.5 pt) | Correction de la langue et conjugaison (2 pts) | Mise en page et soin (0.5 pt)',
					easyQ: 'Dans le développement d’un compte rendu objectif sur le Congrès de la Soummam, quel temps utilise-t-on pour les verbes introducteurs (rappelle, explique, montre) ?',
					easyCorrect: 'Le présent de l’indicatif',
					easyDistractors: [
						{ text: 'Le futur antérieur', diagnosticFeedback: 'أفعال التقديم في التقرير تُصرف في الحاضر الإخباري.' },
						{ text: 'L’impératif présent', diagnosticFeedback: 'الأمر لا يُستعمل في التقرير الموضوعي.' },
						{ text: 'Le passé antérieur', diagnosticFeedback: 'زمن أدبي قديم غير مستعمل في التقرير.' }
					],
					medQ: 'Parmi ces informations, laquelle est indispensable dans le résumé du Congrès de la Soummam ?',
					medCorrect: 'L’adoption des deux principes politiques et l’organisation du pays en six wilayas',
					medDistractors: [
						{ text: 'La météo exacte du mois d’août 1956', diagnosticFeedback: 'تفصيل ثانوي غير مذكور ولا يخدم الفكرة المحورية.' },
						{ text: 'Votre opinion personnelle sur les paysages de la vallée', diagnosticFeedback: 'الرأي الشخصي ممنوع في التقرير الموضوعي.' },
						{ text: 'Une comparaison avec des films récents', diagnosticFeedback: 'خارج النص الأصلي تماما.' }
					],
					hardQ: 'Si un candidat choisit le Sujet 2 (présenter une figure historique algérienne), quels outils grammaticaux du Projet 1 valoriseront le plus sa copie ?',
					hardCorrect: 'Repères chronologiques précis, présent historique ou passé simple, nominalisation et voix passive',
					hardDistractors: [
						{ text: 'Verbes performatifs d’appel et impératif répété', diagnosticFeedback: 'هذه خصائص المشروع الثالث (L’Appel).' },
						{ text: 'Thèse adverse et réfutation polémique', diagnosticFeedback: 'هذه خصائص المشروع الثاني (Le débat d’idées).' },
						{ text: 'Phrases sans verbes conjugués du début à la fin', diagnosticFeedback: 'النص التاريخي يتطلب جملا فعلية سليمة إلى جانب الجمل الاسمية في العناوين.' }
					]
				},
				{
					sujetUnTitle: 'Sujet 1 (Compte rendu objectif) :',
					sujetUnPrompt:
						'Rédigez le compte rendu objectif (environ 100 à 120 mots) d’un texte historique de l’historien Abou El-Kacem Saadallah consacré à la fondation et au rôle culturel de l’Association des Oulémas Musulmans Algériens.',
					sujetUnNotes: [
						'Introduire le texte : nature, titre, auteur, thème principal.',
						'Résumer à la 3e personne : fondation en mai 1931 (Ben Badis, El-Ibrahimi, El-Mili), lutte contre l’assimilation, création des médersas et des journaux.',
						'Souligner le lien entre l’éveil éducatif et la préparation à l’indépendance.',
						'Respecter l’objectivité totale et la longueur recommandée.'
					],
					sujetDeuxPrompt:
						'Votre professeur d’histoire vous demande de rédiger un court article documentaire (100 à 130 mots) montrant comment la culture, l’école et la poésie patriotique (telles que les médersas des Oulémas et les vers de Moufdi Zakaria) ont contribué à préserver l’identité algérienne durant la période coloniale.',
					modelAnswer:
						'Ce texte historique, inspiré des études de l’historien Abou El-Kacem Saadallah, met en lumière le rôle déterminant de l’Association des Oulémas Musulmans Algériens dans la sauvegarde de l’identité nationale.\nDans un premier temps, l’auteur rappelle que Cheikh Abdelhamid Ben Badis, soutenu par des savants comme Cheikh El-Ibrahimi et Cheikh El-Mili, a fondé cette association le 5 mai 1931 à Alger pour contrer la politique coloniale d’assimilation. Ensuite, il explique que les Oulémas ont multiplié les écoles libres, les journaux et les cercles culturels afin de protéger la religion, la langue arabe et la conscience patriotique malgré les obstacles coloniaux. Enfin, il souligne que cette renaissance intellectuelle a préparé le peuple algérien à reconquérir son indépendance. L’auteur vise ainsi à informer et à honorer ce combat culturel.',
					rubricSummary: 'Respect de la consigne et exactitude des idées (2 pts) | Cohérence et enchaînement logique (1.5 pt) | Maîtrise de la langue française (2 pts) | Présentation soignée (0.5 pt)',
					easyQ: 'Combien de paragraphes structurés comporte idéalement un compte rendu objectif au BAC Scientifique ?',
					easyCorrect: 'Deux paragraphes clairs : l’accroche (introduction) puis le développement reformulé',
					easyDistractors: [
						{ text: 'Un seul mot-clé par ligne avec des tirets', diagnosticFeedback: 'العوارض غير مقبولة في التعبير الكتابي.' },
						{ text: 'Six pages plus longues que le texte original', diagnosticFeedback: 'التقرير الموجز يختصر النص إلى نحو الثلث.' },
						{ text: 'Trois paragraphes dont un paragraphe entier de critique personnelle', diagnosticFeedback: 'فقرة النقد الشخصي ليست مطلوبة في التقرير الموضوعي للشعب العلمية.' }
					],
					medQ: 'Comment reformuler sans copier : « Les Oulémas ouvrent des dizaines d’écoles libres et publient des journaux engagés » ?',
					medCorrect: 'L’auteur explique que les Oulémas ont multiplié les établissements scolaires libres et la presse engagée.',
					medDistractors: [
						{ text: 'Les Oulémas ouvrent des dizaines d’écoles libres et publient des journaux engagés.', diagnosticFeedback: 'هذا نسخ حرفي للجملة دون إعادة صياغة أو فعل تقديم.' },
						{ text: 'Je pense que les écoles libres étaient meilleures que tout.', diagnosticFeedback: 'إدخال ضمير المتكلم والرأي الشخصي خطأ منهجي.' },
						{ text: 'Les Oulémas ont fermé toutes les écoles en 1931.', diagnosticFeedback: 'تحريف تام لمعنى النص.' }
					],
					hardQ: 'Dans le barème du BAC Scientifique (6 points), quelle erreur entraîne la pénalité la plus lourde dans le Sujet 1 ?',
					hardCorrect: 'Le recopiage intégral de phrases du texte source ou le hors-sujet',
					hardDistractors: [
						{ text: 'Utiliser des synonymes fidèles aux idées du texte', diagnosticFeedback: 'إعادة الصياغة بالمرادفات ميزة إيجابية جدا.' },
						{ text: 'Employer des connecteurs comme D’abord, Ensuite, Enfin', diagnosticFeedback: 'الروابط المنطقية ترفع علامة الاتساق.' },
						{ text: 'Citer le nom de l’auteur dans la première phrase', diagnosticFeedback: 'ذكر الكاتب في المقدمة عنصر مطلوب في التنقيط.' }
					]
				}
			];

			const v = rng.pick(variants);
			const qMap =
				difficulty === 'easy'
					? { q: v.easyQ, ans: v.easyCorrect, dist: v.easyDistractors }
					: difficulty === 'medium'
						? { q: v.medQ, ans: v.medCorrect, dist: v.medDistractors }
						: { q: v.hardQ, ans: v.hardCorrect, dist: v.hardDistractors };

			const mcq = buildUniqueMcqOptions(qMap.ans, qMap.dist, rng);
			const quizQuestion: QuizQuestionPayload = {
				type: 'mcq',
				questionText: qMap.q,
				questionTextAr: qMap.q,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `Bon réflexe BAC : ${qMap.ans}`
			};

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Production écrite',
				points: 6,
				instruction: 'Traitez au choix l’un des deux sujets proposés en respectant la méthode et la longueur demandées.',
				content: [
					buildFrenchWrittenProductionBlock({
						sujetUnTitle: v.sujetUnTitle,
						sujetUnPrompt: v.sujetUnPrompt,
						sujetUnNotes: v.sujetUnNotes,
						sujetDeuxPrompt: v.sujetDeuxPrompt,
						modelAnswer: v.modelAnswer,
						rubricSummary: v.rubricSummary,
						mark: '6'
					})
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion,
				sujetExercise,
				hints: [
					'Pour le Sujet 1 (Compte rendu objectif), rédigez 2 paragraphes : Accroche + Développement à la 3e personne.',
					'Reformulez les idées essentielles avec vos propres mots sans jamais ajouter d’avis personnel.',
					'Pour le Sujet 2, structurez votre texte historique avec des repères chronologiques exacts et des connecteurs.'
				],
				solutionStepsAr: [
					'Paragraphe 1 (Accroche) : Nature + Titre + Auteur/Source + Thème général.',
					'Paragraphe 2 (Synthèse) : Enchaîner les idées clés au présent avec D’abord, Ensuite, Enfin.',
					'Clôture : Rappeler la visée informative/commémorative de l’auteur sans utiliser « je ».'
				],
				finalAnswer: qMap.ans
			};
		}
	}
];
