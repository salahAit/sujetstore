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

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Compréhension de l’écrit 1 (7 pts) — 1er Novembre 1954 & Héros nationaux
// ═══════════════════════════════════════════════════════════════════════════════
const compNovembreHeros3amT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3am_t2_comp_novembre_heros',
	grade: '3am',
	trimesterId: 't2',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (3AM): نص تاريخي عن 1 نوفمبر 1954 وأبطال الثورة التحريرية (7 نقاط)',
	curriculumLessonId: 'fre_lesson_3am_t2_temps_recit_historique',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const v = rng.pick([
			{
				title: 'Le 1er Novembre 1954 et le courage de Didouche Mourad',
				paragraphs: [
					'Dans la nuit glaciale du 1er Novembre 1954, le peuple algérien entra dans une étape décisive de son histoire. Après de longs mois de préparation secrète, des groupes de moudjahidine déclenchèrent la Guerre de Libération Nationale dans plusieurs régions du pays, notamment dans les montagnes des Aurès et dans le Nord-Constantinois.',
					'Parmi les jeunes chefs qui avaient préparé cet appel historique figurait Didouche Mourad. Né à Alger en 1927, [[ce vaillant patriote]] commandait la Wilaya II avec une détermination remarquable. Le 18 janvier 1955, il tomba au champ d’honneur lors de la bataille de Douar Souadek près de Smendou, léguant aux générations futures un exemple impérissable de sacrifice.'
				],
				source: 'D’après des récits de la mémoire nationale algérienne (3AM)',
				glossary: [
					{ term: 'décisive', meaning: 'très importante, qui change le cours des événements' },
					{ term: 'impérissable', meaning: 'qui ne disparaît jamais, inoubliable' }
				],
				dateEvent: 'Le 1er Novembre 1954 (déclenchement de la Guerre de Libération Nationale)',
				q1: 'Dans quelles régions mentionnées dans le texte la lutte s’est-elle notamment déclenchée ?',
				a1: 'Notamment dans les montagnes des Aurès et dans le Nord-Constantinois.',
				q2: 'Quand et où Didouche Mourad est-il tombé au champ d’honneur ?',
				a2: 'Il est tombé au champ d’honneur le 18 janvier 1955 lors de la bataille de Douar Souadek près de Smendou.',
				tf1Q: 'Didouche Mourad était né à Alger en 1927.',
				tf1A: 'Vrai',
				tf2Q: 'La Guerre de Libération Nationale a été déclenchée sans aucune préparation.',
				tf2A: 'Faux',
				tf2C: 'Elle a été déclenchée après de longs mois de préparation secrète.',
				refWord: 'ce vaillant patriote',
				refAns: 'Didouche Mourad',
				lexQ: 'Relevez du texte deux mots appartenant au champ lexical de l’héroïsme et de la guerre.',
				lexA: 'moudjahidine, Guerre de Libération, patriote, bataille, champ d’honneur, sacrifice (deux au choix).',
				mcqCorrect: 'Didouche Mourad fut l’un des jeunes chefs du 1er Novembre 1954 et tomba en martyr en janvier 1955.',
				mcqD1: 'Didouche Mourad a fondé la ville d’Alger en 1955.',
				mcqD2: 'La Guerre de Libération Nationale a commencé en 1962.',
				mcqD3: 'Didouche Mourad n’a jamais participé à la préparation de la Révolution.'
			},
			{
				title: 'Larbi Ben M’hidi, stratège lumineux de la Révolution',
				paragraphs: [
					'Né en 1923 dans la région d’Aïn M’lila, Larbi Ben M’hidi grandit dans une famille attachée aux valeurs islamiques et patriotiques. Très jeune, il rejoignit le mouvement national et comprit que seule l’union du peuple permettrait de recouvrer la liberté.',
					'En 1954, [[il]] participa activement au déclenchement de la Révolution et organisa la lutte en Oranie avant de jouer un rôle majeur lors du Congrès de la Soummam en août 1956. Arrêté à Alger en février 1957, ce grand stratège affronta l’ennemi avec un calme admirable jusqu’à son martyre, devenant un symbole éternel de dignité.'
				],
				source: 'D’après un recueil sur les figures de la Révolution algérienne (3AM)',
				glossary: [
					{ term: 'recouvrer', meaning: 'retrouver, récupérer un bien perdu' },
					{ term: 'stratège', meaning: 'chef habile dans l’organisation et la conduite d’une lutte' }
				],
				dateEvent: '1954 (déclenchement de la Révolution) et août 1956 (Congrès de la Soummam)',
				q1: 'Quelles valeurs ont marqué l’éducation de Larbi Ben M’hidi dans sa famille ?',
				a1: 'Les valeurs islamiques et patriotiques.',
				q2: 'Quel rôle a-t-il joué entre 1954 et 1956 ?',
				a2: 'Il a participé au déclenchement de la Révolution, organisé la lutte en Oranie et joué un rôle majeur au Congrès de la Soummam.',
				tf1Q: 'Larbi Ben M’hidi est né dans la région d’Aïn M’lila en 1923.',
				tf1A: 'Vrai',
				tf2Q: 'Lors de son arrestation à Alger en 1957, il a cédé à la peur.',
				tf2A: 'Faux',
				tf2C: 'Il a affronté l’ennemi avec un calme admirable jusqu’à son martyre.',
				refWord: 'il',
				refAns: 'Larbi Ben M’hidi',
				lexQ: 'Relevez du texte un substitut lexical désignant Larbi Ben M’hidi et un synonyme de « bravoure / sérénité ».',
				lexA: 'Substitut lexical : ce grand stratège | Synonyme : calme admirable (ou dignité).',
				mcqCorrect: 'Larbi Ben M’hidi organisa la lutte en Oranie, participa au Congrès de la Soummam et mourut en martyr avec dignité.',
				mcqD1: 'Larbi Ben M’hidi est né en 1957 à Alger.',
				mcqD2: 'Larbi Ben M’hidi refusait l’union du peuple algérien.',
				mcqD3: 'Le Congrès de la Soummam a eu lieu en 1923.'
			},
			{
				title: 'Ahmed Zabana et Hassiba Ben Bouali, visages du sacrifice',
				paragraphs: [
					'L’histoire de la Guerre de Libération algérienne regorge de jeunes femmes et de jeunes hommes qui sacrifièrent leur jeunesse pour que l’Algérie vive libre. Parmi eux figure Ahmed Zabana, né en 1926 près de Mascara, qui organisa les premiers groupes armés de l’Ouest avant d’être exécuté le 19 juin 1956 à la prison de Barberousse.',
					'À Alger, la jeune Hassiba Ben Bouali, née en 1938 à Chlef, s’engagea à son tour avec un courage exceptionnel au cœur de la Casbah. [[Cette héroïne]] mourut en martyre en octobre 1957, à peine âgée de dix-neuf ans. Leur mémoire unit aujourd’hui tous les Algériens dans la fidélité aux idéaux de novembre.'
				],
				source: 'D’après un dossier pédagogique d’histoire nationale (3AM)',
				glossary: [
					{ term: 'regorger de', meaning: 'être très riche en, contenir en grand nombre' },
					{ term: 'fidélité', meaning: 'attachement constant et sincère' }
				],
				dateEvent: '19 juin 1956 (martyre d’Ahmed Zabana) et octobre 1957 (martyre de Hassiba Ben Bouali)',
				q1: 'Quelle action Ahmed Zabana a-t-il menée dans l’Ouest algérien ?',
				a1: 'Il a organisé les premiers groupes armés de l’Ouest algérien.',
				q2: 'Où Hassiba Ben Bouali s’est-elle engagée et à quel âge est-elle tombée en martyre ?',
				a2: 'Elle s’est engagée au cœur de la Casbah d’Alger et est tombée en martyre à dix-neuf ans.',
				tf1Q: 'Ahmed Zabana était originaire de la région de Mascara.',
				tf1A: 'Vrai',
				tf2Q: 'Hassiba Ben Bouali avait quarante ans lors de son martyre.',
				tf2A: 'Faux',
				tf2C: 'Elle était à peine âgée de dix-neuf ans en octobre 1957.',
				refWord: 'Cette héroïne',
				refAns: 'Hassiba Ben Bouali',
				lexQ: 'Relevez du texte le verbe de la même famille que « sacrifice » et deux mots du champ lexical de la mémoire.',
				lexA: 'Verbe : sacrifièrent (sacrifier) | Champ lexical de la mémoire : histoire, mémoire, fidélité.',
				mcqCorrect: 'Ahmed Zabana et Hassiba Ben Bouali incarnent le sacrifice de la jeunesse algérienne pour la liberté.',
				mcqD1: 'Ahmed Zabana et Hassiba Ben Bouali ont vécu au XIXe siècle.',
				mcqD2: 'Hassiba Ben Bouali n’a jamais mis les pieds à la Casbah d’Alger.',
				mcqD3: 'Ahmed Zabana a été libéré de prison en 1956.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			v.mcqCorrect,
			[
				{ text: v.mcqD1, diagnosticFeedback: 'تحقّق من التواريخ والأحداث الدقيقة المذكورة في النص.' },
				{ text: v.mcqD2, diagnosticFeedback: 'هذه الجملة تخالف ما جاء في الفقرة الأولى والثانية.' },
				{ text: v.mcqD3, diagnosticFeedback: 'أعد قراءة نهاية الفقرة الثانية للتحقق من مصير البطل.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Après lecture du récit historique « ${v.title} », quelle proposition est exacte ?`,
				questionTextAr: `اقرأ النص التاريخي « ${v.title} » واختر الإجابة الصحيحة:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'I. Compréhension de l’écrit (07 pts)',
				points: 7,
				instruction: 'Lisez attentivement ce récit historique puis répondez aux questions :',
				content: [
					buildFrenchPassageBlock({
						title: v.title,
						paragraphs: v.paragraphs,
						source: v.source,
						numberedParagraphs: true,
						glossary: v.glossary
					}),
					{
						type: 'text',
						content: '1) Quel est le type de ce texte ? Relevez une date marquante et l’événement qui lui correspond. (01.5 pt)',
						answer: `C’est un récit historique (narratif). Repère : ${v.dateEvent}.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) Répondez aux questions suivantes à partir du texte (02 pts) :\n  a) ${v.q1}\n  b) ${v.q2}`,
						answer: `a) ${v.a1}\nb) ${v.a2}`,
						mark: '2'
					},
					{
						type: 'true_false',
						items: [
							{ q: v.tf1Q, a: v.tf1A, mark: '0.75' },
							{ q: v.tf2Q, a: v.tf2A, c: v.tf2C, mark: '0.75' }
						]
					},
					{
						type: 'text',
						content: `4) Qui désigne l’expression soulignée « ${v.refWord} » dans le second paragraphe ? (01 pt)`,
						answer: `« ${v.refWord} » désigne : ${v.refAns}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `5) ${v.lexQ} (01 pt)`,
						answer: v.lexA,
						mark: '1'
					}
				]
			},
			hints: [
				'استخرج التواريخ بدقة واربط كل تاريخ بالحدث التاريخي الموافق له.',
				'احذر من التواريخ المغلوطة في أسئلة (Vrai / Faux) وبرّر إجابتك من النص.',
				'البديل المسطّر يعود إلى الشخصية المحورية المذكورة قبله.'
			],
			solutionStepsAr: [
				`نوع النص والتاريخ: récit historique | ${v.dateEvent}`,
				`a) ${v.a1} | b) ${v.a2}`,
				`مرجع (${v.refWord}): ${v.refAns}`,
				`المعجم: ${v.lexA}`
			],
			finalAnswer: v.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Compréhension de l’écrit 2 (7 pts) — Association des Oulémas & Mémoire
// ═══════════════════════════════════════════════════════════════════════════════
const compOulemasMemoire3amT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3am_t2_comp_oulemas_memoire',
	grade: '3am',
	trimesterId: 't2',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (3AM): جمعية العلماء المسلمين الجزائريين وحفظ الهوية الوطنية (7 نقاط)',
	curriculumLessonId: 'fre_lesson_3am_t2_substituts_lexicaux_grammaticaux',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const v = rng.pick([
			{
				title: 'Cheikh Abdelhamid Ben Badis et la renaissance du savoir en Algérie',
				paragraphs: [
					'Le 5 mai 1931, au Cercle du Progrès à Alger, Cheikh Abdelhamid Ben Badis fonda l’Association des Oulémas Musulmans Algériens aux côtés de compagnons fidèles comme Cheikh Mohamed Bachir El-Ibrahimi et Cheikh Moubarek El-Mili. À une époque où le colonialisme voulait effacer la langue arabe et la culture islamique, cette création marqua un tournant historique.',
					'Pendant des années, [[ce réformateur infatigable]] enseigna à Constantine, ouvrit des écoles libres et dirigea des journaux tels qu’Al-Chihab et Al-Bassaïr. Il rappela avec force la devise célèbre : l’Islam est notre religion, l’arabe est notre langue, l’Algérie est notre patrie. Chaque 16 avril, l’Algérie célèbre la Journée du Savoir en son honneur.'
				],
				source: 'D’après l’histoire culturelle de l’Algérie (3AM)',
				glossary: [
					{ term: 'tournant historique', meaning: 'moment décisif qui marque un grand changement' },
					{ term: 'devise', meaning: 'formule brève résumant un idéal' }
				],
				tableRows: [
					{ k: 'Date et lieu de fondation', v: 'Le 5 mai 1931 au Cercle du Progrès à Alger' },
					{ k: 'Fondateur principal', v: 'Cheikh Abdelhamid Ben Badis' },
					{ k: 'Moyens d’action', v: 'Écoles libres, enseignement et journaux (Al-Chihab, Al-Bassaïr)' }
				],
				q1: 'Pourquoi la fondation de l’Association des Oulémas en 1931 a-t-elle été un tournant historique ?',
				a1: 'Parce qu’elle a défendu la langue arabe, la culture islamique et l’identité algérienne face au colonialisme.',
				tf1Q: 'L’Algérie célèbre la Journée du Savoir chaque 16 avril.',
				tf1A: 'Vrai',
				tf2Q: 'L’Association des Oulémas s’est limitée à la seule ville d’Oran.',
				tf2A: 'Faux',
				tf2C: 'Elle a été fondée à Alger, Cheikh Ben Badis enseignait à Constantine et ouvrit de nombreuses écoles libres.',
				refWord: 'ce réformateur infatigable',
				refAns: 'Cheikh Abdelhamid Ben Badis',
				lexQ: 'Relevez du texte un substitut lexical de Cheikh Ben Badis et deux mots du champ lexical de l’éducation.',
				lexA: 'Substitut lexical : ce réformateur infatigable | Éducation : savoir, enseigna, écoles libres, journaux.',
				mcqCorrect: 'Cheikh Abdelhamid Ben Badis fonda l’Association des Oulémas en 1931 pour défendre la foi, la langue et la patrie.',
				mcqD1: 'L’Association des Oulémas a été fondée en 1962.',
				mcqD2: 'Cheikh Ben Badis refusait d’ouvrir des écoles pour les enfants.',
				mcqD3: 'La Journée du Savoir est célébrée le 5 juillet.'
			},
			{
				title: 'Les écoles libres : forteresses de l’identité algérienne',
				paragraphs: [
					'Entre 1931 et 1954, les membres de l’Association des Oulémas Musulmans Algériens bâtirent plus d’une centaine d’écoles libres grâce aux dons généreux des citoyens. Dans ces classes simples mais vivantes, des milliers de garçons et de filles apprenaient le Saint Coran, la langue arabe, l’histoire de l’Algérie et les sciences modernes.',
					'Des savants dévoués comme Cheikh Larbi Tebessi et Cheikh Ahmed Sahnoun encourageaient sans relâche les élèves à aimer la science et la patrie. [[Ils]] formèrent ainsi toute une génération consciente qui répondit présente à l’appel du 1er Novembre 1954.'
				],
				source: 'D’après les travaux de l’historien Abou El-Kacem Saadallah (adapté 3AM)',
				glossary: [
					{ term: 'dons', meaning: 'aides financières ou matérielles offertes généreusement' },
					{ term: 'sans relâche', meaning: 'sans s’arrêter, avec persévérance' }
				],
				tableRows: [
					{ k: 'Période citée', v: 'Entre 1931 et 1954' },
					{ k: 'Source de financement', v: 'Les dons généreux des citoyens algériens' },
					{ k: 'Matières enseignées', v: 'Saint Coran, langue arabe, histoire de l’Algérie, sciences modernes' }
				],
				q1: 'Quel rôle ces écoles libres ont-elles préparé pour 1954 ?',
				a1: 'Elles ont formé une génération consciente qui a répondu présente à l’appel du 1er Novembre 1954.',
				tf1Q: 'Seuls les garçons étaient admis dans les écoles libres.',
				tf1A: 'Faux',
				tf1C: 'Des milliers de garçons et de filles y étudiaient.',
				tf2Q: 'Cheikh Larbi Tebessi et Cheikh Ahmed Sahnoun encourageaient les élèves à aimer la science et la patrie.',
				tf2A: 'Vrai',
				refWord: 'Ils',
				refAns: 'les savants dévoués (Cheikh Larbi Tebessi, Cheikh Ahmed Sahnoun et les membres de l’Association)',
				lexQ: 'Relevez du texte le synonyme de « construisirent » et un mot de la famille de « générosité ».',
				lexA: 'Synonyme : bâtirent | Famille de générosité : généreux.',
				mcqCorrect: 'Les écoles libres financées par les citoyens formèrent une génération instruite et fidèle à l’Algérie.',
				mcqD1: 'Les écoles libres n’enseignaient ni la langue arabe ni les sciences.',
				mcqD2: 'Moins de cinq écoles ont été créées entre 1931 et 1954.',
				mcqD3: 'Les citoyens refusaient d’aider la construction des écoles.'
			},
			{
				title: 'Cheikh Moubarek El-Mili, gardien de l’histoire nationale',
				paragraphs: [
					'Originaire de la région de Mila, Cheikh Moubarek El-Mili (1898-1945) fut l’un des piliers de l’Association des Oulémas Musulmans Algériens et un historien rigoureux. Face aux falsifications coloniales qui prétendaient que l’Algérie n’avait pas d’histoire, il entreprit un travail monumental de recherche.',
					'Dans son ouvrage célèbre « Histoire de l’Algérie dans le passé et le présent », [[cet érudit]] démontra avec des preuves solides l’ancienneté et la richesse de la nation algérienne. Ses écrits redonnèrent fierté et confiance à la jeunesse algérienne.'
				],
				source: 'D’après un précis d’histoire culturelle algérienne (3AM)',
				glossary: [
					{ term: 'falsification', meaning: 'déformation volontaire de la vérité' },
					{ term: 'érudit', meaning: 'savant qui possède un très vaste savoir' }
				],
				tableRows: [
					{ k: 'Nom et région', v: 'Cheikh Moubarek El-Mili, région de Mila (1898-1945)' },
					{ k: 'Qualité principale', v: 'Pilier de l’Association des Oulémas et historien rigoureux' },
					{ k: 'Ouvrage célèbre', v: 'Histoire de l’Algérie dans le passé et le présent' }
				],
				q1: 'Pourquoi Cheikh Moubarek El-Mili a-t-il rédigé son grand ouvrage d’histoire ?',
				a1: 'Pour répondre aux falsifications coloniales et prouver l’ancienneté et la richesse de la nation algérienne.',
				tf1Q: 'Cheikh Moubarek El-Mili s’appuyait sur des preuves solides dans ses recherches.',
				tf1A: 'Vrai',
				tf2Q: 'Son ouvrage a découragé la jeunesse algérienne.',
				tf2A: 'Faux',
				tf2C: 'Ses écrits ont redonné fierté et confiance à la jeunesse algérienne.',
				refWord: 'cet érudit',
				refAns: 'Cheikh Moubarek El-Mili',
				lexQ: 'Relevez du texte un substitut lexical de Cheikh Moubarek El-Mili et un mot de la famille de « histoire ».',
				lexA: 'Substitut lexical : cet érudit (ou un historien rigoureux) | Famille de histoire : historien.',
				mcqCorrect: 'Cheikh Moubarek El-Mili rédigea une histoire documentée de l’Algérie qui redonna fierté à la jeunesse.',
				mcqD1: 'Cheikh Moubarek El-Mili vivait au Moyen Âge.',
				mcqD2: 'Il n’a jamais écrit de livre sur l’histoire de l’Algérie.',
				mcqD3: 'Il était uniquement architecte de ponts.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			v.mcqCorrect,
			[
				{ text: v.mcqD1, diagnosticFeedback: 'راجع التواريخ المذكورة في الفقرة الأولى من النص.' },
				{ text: v.mcqD2, diagnosticFeedback: 'النص يثبت العكس تماماً في الفقرة الثانية.' },
				{ text: v.mcqD3, diagnosticFeedback: 'تأكد من التخصص أو المناسبة المذكورة في النص.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Quelle idée principale ressort du texte « ${v.title} » ?`,
				questionTextAr: `ما الفكرة الرئيسية للنص التاريخي « ${v.title} »؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'I. Compréhension de l’écrit (07 pts)',
				points: 7,
				instruction: 'Lisez attentivement le texte ci-dessous puis répondez aux questions :',
				content: [
					buildFrenchPassageBlock({
						title: v.title,
						paragraphs: v.paragraphs,
						source: v.source,
						numberedParagraphs: true,
						glossary: v.glossary
					}),
					{
						type: 'text',
						content: '1) Complétez le tableau récapitulatif suivant à partir du texte (01.5 pt) :'
					},
					{
						type: 'table',
						headers: ['Rubrique', 'Information du texte'],
						cells: [],
						rows: v.tableRows.map((r) => [
							{ content: r.k, bold: true },
							{ content: '....................................', answer: r.v, mark: '0.5' }
						]),
						align: 'left',
						borders: 'grid',
						headerBackground: true,
						width: 'full'
					},
					{
						type: 'text',
						content: `2) Répondez à la question : ${v.q1} (01.5 pt)`,
						answer: v.a1,
						mark: '1.5'
					},
					{
						type: 'true_false',
						items: [
							{ q: v.tf1Q, a: v.tf1A, c: v.tf1C ?? '', mark: '1' },
							{ q: v.tf2Q, a: v.tf2A, c: v.tf2C ?? '', mark: '1' }
						]
					},
					{
						type: 'text',
						content: `4) À qui renvoie l’expression soulignée « ${v.refWord} » ? (01 pt)`,
						answer: `« ${v.refWord} » renvoie à : ${v.refAns}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `5) ${v.lexQ} (01 pt)`,
						answer: v.lexA,
						mark: '1'
					}
				]
			},
			hints: [
				'استعن بالجدول لتنظيم المعطيات التاريخية بدقة واختصار.',
				'استخرج البديل المعجمي (عبارة اسمية تعوّض اسم العالم) من الفقرة الثانية.',
				'تأكّد من تصحيح كل عبارة خاطئة بجملة واضحة من النص.'
			],
			solutionStepsAr: [
				v.tableRows.map((r) => `${r.k} : ${r.v}`).join(' | '),
				`الإجابة: ${v.a1}`,
				`مرجع (${v.refWord}): ${v.refAns}`,
				`المعجم: ${v.lexA}`
			],
			finalAnswer: v.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Fonctionnement de la langue 1 (6 pts) — Temps du récit & Famille de mots
// ═══════════════════════════════════════════════════════════════════════════════
const langTempsConnecteurs3amT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3am_t2_lang_temps_connecteurs',
	grade: '3am',
	trimesterId: 't2',
	domain: 'conjugaison_temps',
	titleAr: 'قواعد اللغة (3AM): أزمنة القصة التاريخية والروابط الزمنية وعائلة الكلمات (6 نقاط)',
	curriculumLessonId: 'fre_lesson_3am_t2_temps_recit_historique',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const s = rng.pick([
			{
				conj1Q: 'a) La nuit (être, imparfait) ............ calme lorsque les moudjahidine (donner, passé simple) ............ le signal.',
				conj1A: 'a) La nuit était calme lorsque les moudjahidine donnèrent le signal.',
				conj2Q: 'b) En 1931, Cheikh Ben Badis (fonder, passé simple) ............ l’Association des Oulémas.',
				conj2A: 'b) En 1931, Cheikh Ben Badis fonda l’Association des Oulémas.',
				conj3Q: 'c) Les héros exécutèrent le plan qu’ils (préparer, plus-que-parfait) ............ secrètement.',
				conj3A: 'c) Les héros exécutèrent le plan qu’ils avaient préparé secrètement.',
				connQ: 'Complétez le court récit avec les connecteurs chronologiques suivants : (Ensuite - D’abord - Enfin)\n  « ............ , les dirigeants réunirent les groupes dans les Aurès. ............ , ils lancèrent l’appel du 1er Novembre 1954. ............ , l’Algérie arracha son indépendance en 1962. »',
				connA: 'D’abord, les dirigeants réunirent les groupes dans les Aurès. Ensuite, ils lancèrent l’appel du 1er Novembre 1954. Enfin, l’Algérie arracha son indépendance en 1962.',
				wfRows: [
					{
						verbe: { given: true, value: 'libérer' },
						nom: { value: 'la libération (liberté)', mark: '0.5' },
						adjectif: { value: 'libre', mark: '0.5' }
					},
					{
						verbe: { value: 'résister', mark: '0.5' },
						nom: { given: true, value: 'la résistance' },
						adjectif: { value: 'résistant', mark: '0.5' }
					}
				],
				mcqQ: 'Choisissez la bonne conjugaison au passé simple : « Les patriotes ...... ensemble et ...... la liberté. »',
				mcqCorrect: 'luttèrent / conquirent',
				mcqD1: 'luttaient / conquéraient',
				mcqD2: 'lutteront / conquerront',
				mcqD3: 'luttent / conquièrent'
			},
			{
				conj1Q: 'a) Les paysans (souffrir, imparfait) ............ de l’injustice quand la Révolution (éclater, passé simple) ............ .',
				conj1A: 'a) Les paysans souffraient de l’injustice quand la Révolution éclata.',
				conj2Q: 'b) Didouche Mourad et ses compagnons (être, passé simple) ............ des modèles de courage.',
				conj2A: 'b) Didouche Mourad et ses compagnons furent des modèles de courage.',
				conj3Q: 'c) Les écoles que les Oulémas (ouvrir, plus-que-parfait) ............ accueillaient des milliers d’élèves.',
				conj3A: 'c) Les écoles que les Oulémas avaient ouvertes accueillaient des milliers d’élèves.',
				connQ: 'Complétez avec : (Puis - En 1931 - Plus tard)\n  « ............ , Cheikh Ben Badis créa l’Association des Oulémas. ............ , il multiplia les écoles libres. ............ , ses élèves participèrent à la libération du pays. »',
				connA: 'En 1931, Cheikh Ben Badis créa l’Association des Oulémas. Puis, il multiplia les écoles libres. Plus tard, ses élèves participèrent à la libération du pays.',
				wfRows: [
					{
						verbe: { given: true, value: 'combattre' },
						nom: { value: 'le combat', mark: '0.5' },
						adjectif: { value: 'combatif (combattant)', mark: '0.5' }
					},
					{
						verbe: { value: 'courage / encourager', mark: '0.5' },
						nom: { given: true, value: 'le courage' },
						adjectif: { value: 'courageux', mark: '0.5' }
					}
				],
				mcqQ: 'Quel temps exprime l’antériorité dans : « Il relut la proclamation qu’il avait rédigée la veille » ?',
				mcqCorrect: 'Le plus-que-parfait (avait rédigée)',
				mcqD1: 'Le passé simple (relut)',
				mcqD2: 'Le présent de l’indicatif',
				mcqD3: 'Le futur simple'
			},
			{
				conj1Q: 'a) Le vent (souffler, imparfait) ............ sur les Aurès lorsque l’aube (se lever, passé simple) ............ .',
				conj1A: 'a) Le vent soufflait sur les Aurès lorsque l’aube se leva.',
				conj2Q: 'b) Larbi Ben M’hidi (choisir, passé simple) ............ le chemin du sacrifice pour sa patrie.',
				conj2A: 'b) Larbi Ben M’hidi choisit le chemin du sacrifice pour sa patrie.',
				conj3Q: 'c) Les villageois aidèrent les moudjahidine qui (marcher, plus-que-parfait) ............ toute la nuit.',
				conj3A: 'c) Les villageois aidèrent les moudjahidine qui avaient marché toute la nuit.',
				connQ: 'Complétez avec : (Finalement - Tout d’abord - Ensuite)\n  « ............ , les collégiens visitèrent le musée du Moudjahid. ............ , ils écoutèrent un témoignage historique. ............ , ils rédigèrent un exposé illustré. »',
				connA: 'Tout d’abord, les collégiens visitèrent le musée du Moudjahid. Ensuite, ils écoutèrent un témoignage historique. Finalement, ils rédigèrent un exposé illustré.',
				wfRows: [
					{
						verbe: { given: true, value: 'unir' },
						nom: { value: 'l’union (l’unité)', mark: '0.5' },
						adjectif: { value: 'uni', mark: '0.5' }
					},
					{
						verbe: { value: 'défendre', mark: '0.5' },
						nom: { given: true, value: 'la défense' },
						adjectif: { value: 'défensif', mark: '0.5' }
					}
				],
				mcqQ: 'Quelle est la 3e personne du singulier du verbe « naître » au passé simple ?',
				mcqCorrect: 'il naquit',
				mcqD1: 'il naissait',
				mcqD2: 'il naîtra',
				mcqD3: 'il naquît'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			s.mcqCorrect,
			[
				{ text: s.mcqD1, diagnosticFeedback: 'هذه الصيغة تخص الماضي الناقص (Imparfait) وليس الزمن المطلوب.' },
				{ text: s.mcqD2, diagnosticFeedback: 'هذه الصيغة تخص المستقبل البسيط.' },
				{ text: s.mcqD3, diagnosticFeedback: 'راجع تصريف الماضي البسيط (Passé simple) بدون حركة إضافية في المفرد.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: s.mcqQ,
				questionTextAr: 'اختر الإجابة الصحيحة حول أزمنة القصة التاريخية:',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الإجابة الصحيحة: ${s.mcqCorrect}.`
			},
			sujetExercise: {
				customTitle: 'II. Fonctionnement de la langue (06 pts)',
				points: 6,
				instruction: 'Traitez les exercices de conjugaison, de connecteurs et de lexique suivants :',
				content: [
					{
						type: 'text',
						content: `1) Conjuguez les verbes entre parenthèses aux temps indiqués (03 pts) :\n  ${s.conj1Q}\n  ${s.conj2Q}\n  ${s.conj3Q}`,
						answer: `${s.conj1A}\n${s.conj2A}\n${s.conj3A}`,
						mark: '3'
					},
					{
						type: 'text',
						content: `2) ${s.connQ} (01 pt)`,
						answer: s.connA,
						mark: '1'
					},
					{
						type: 'text',
						content: '3) Complétez le tableau de la famille de mots (02 pts) :'
					},
					buildFrenchWordFamilyTableBlock(s.wfRows)
				]
			},
			hints: [
				'الماضي الناقص (Imparfait) للوصف، والماضي البسيط (Passé simple) للأحداث الرئيسية، والـ Plus-que-parfait للأسبقية.',
				'رتّب الروابط الزمنية من البداية (D’abord / En 1931) إلى الوسط (Ensuite / Puis) إلى الخاتمة (Enfin / Finalement).',
				'في جدول عائلة الكلمات، حافظ على الجذر المشترك لكل سطر.'
			],
			solutionStepsAr: [
				`${s.conj1A} | ${s.conj2A} | ${s.conj3A}`,
				s.connA,
				s.wfRows.map((r) => `${r.verbe.value} / ${r.nom.value} / ${r.adjectif.value}`).join(' ; ')
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Fonctionnement de la langue 2 (6 pts) — Substituts & Discours direct/indirect
// ═══════════════════════════════════════════════════════════════════════════════
const langSubstitutsDiscours3amT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3am_t2_lang_substituts_discours',
	grade: '3am',
	trimesterId: 't2',
	domain: 'grammaire_syntaxe',
	titleAr: 'قواعد اللغة (3AM): البدائل اللغوية والنحوية والخطاب المباشر وغير المباشر (6 نقاط)',
	curriculumLessonId: 'fre_lesson_3am_t2_discours_direct_indirect',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const s = rng.pick([
			{
				dd1Q: 'a) Le moudjahid déclare : « Je suis fier de la jeunesse algérienne. »',
				dd1A: 'a) Le moudjahid déclare qu’il est fier de la jeunesse algérienne.',
				dd2Q: 'b) Le professeur demande à Amine : « Connais-tu la date de fondation de l’Association des Oulémas ? »',
				dd2A: 'b) Le professeur demande à Amine s’il connaît la date de fondation de l’Association des Oulémas.',
				dd3Q: 'c) Le grand-père conseille aux enfants : « Respectez toujours la mémoire des martyrs ! »',
				dd3A: 'c) Le grand-père conseille aux enfants de toujours respecter la mémoire des martyrs.',
				repQ: 'Réécrivez la deuxième phrase en remplaçant le nom répété par un substitut lexical puis un substitut grammatical :\n  « Larbi Ben M’hidi aimait sa patrie. Larbi Ben M’hidi défendit l’Algérie avec courage. »',
				repA: 'Larbi Ben M’hidi aimait sa patrie. Ce grand stratège (ou Il) défendit l’Algérie avec courage.',
				subItems: ['il', 'ce réformateur', 'lui', 'la jeune héroïne', 'qui', 'le vaillant martyr'],
				subGram: ['il', 'lui', 'qui'],
				subLex: ['ce réformateur', 'la jeune héroïne', 'le vaillant martyr'],
				mcqQ: 'Transformez au discours indirect : « L’élève demande : “Est-ce que Didouche Mourad est né à Alger ?” »',
				mcqCorrect: 'L’élève demande si Didouche Mourad est né à Alger.',
				mcqD1: 'L’élève demande que Didouche Mourad est né à Alger.',
				mcqD2: 'L’élève demande est-ce que Didouche Mourad est né à Alger ?',
				mcqD3: 'L’élève demande de naître à Alger.'
			},
			{
				dd1Q: 'a) L’historien affirme : « Les écoles libres ont préservé la langue arabe. »',
				dd1A: 'a) L’historien affirme que les écoles libres ont préservé la langue arabe.',
				dd2Q: 'b) Salima me demande : « Est-ce que tu as visité la Casbah d’Alger ? »',
				dd2A: 'b) Salima me demande si j’ai visité la Casbah d’Alger.',
				dd3Q: 'c) L’enseignante dit aux élèves : « Lisez attentivement ce témoignage historique ! »',
				dd3A: 'c) L’enseignante dit aux élèves de lire attentivement ce témoignage historique.',
				repQ: 'Évitez la répétition en remplaçant le nom souligné par un substitut adapté :\n  « Cheikh Ben Badis enseignait à Constantine. Cheikh Ben Badis encourageait les jeunes à étudier. »',
				repA: 'Cheikh Ben Badis enseignait à Constantine. Cet illustre savant (ou Il) encourageait les jeunes à étudier.',
				subItems: ['elle', 'cet érudit', 'leur', 'la patrie fière', 'celui-ci', 'le chef courageux'],
				subGram: ['elle', 'leur', 'celui-ci'],
				subLex: ['cet érudit', 'la patrie fière', 'le chef courageux'],
				mcqQ: 'Transformez au discours indirect : « Le guide nous conseille : “Observez cette archive de 1954 !” »',
				mcqCorrect: 'Le guide nous conseille d’observer cette archive de 1954.',
				mcqD1: 'Le guide nous conseille si nous observons cette archive de 1954.',
				mcqD2: 'Le guide nous conseille que observez cette archive de 1954.',
				mcqD3: 'Le guide nous conseille observer cette archive de 1954.'
			},
			{
				dd1Q: 'a) Le témoin raconte : « Nous partagions le pain avec les moudjahidine. »',
				dd1A: 'a) Le témoin raconte qu’ils partageaient le pain avec les moudjahidine.',
				dd2Q: 'b) Mon frère me demande : « Que prépares-tu pour le 1er Novembre ? »',
				dd2A: 'b) Mon frère me demande ce que je prépare pour le 1er Novembre.',
				dd3Q: 'c) Le père recommande à son fils : « Apprends l’histoire de ton pays ! »',
				dd3A: 'c) Le père recommande à son fils d’apprendre l’histoire de son pays.',
				repQ: 'Évitez la répétition dans la seconde phrase à l’aide d’un substitut lexical :\n  « Hassiba Ben Bouali était très déterminée. Hassiba Ben Bouali rejoignit les combattants d’Alger. »',
				repA: 'Hassiba Ben Bouali était très déterminée. Cette jeune patriote (ou Elle) rejoignit les combattants d’Alger.',
				subItems: ['ils', 'le pionnier', 'son', 'ce pays libre', 'eux', 'le célèbre poète'],
				subGram: ['ils', 'son', 'eux'],
				subLex: ['le pionnier', 'ce pays libre', 'le célèbre poète'],
				mcqQ: 'Dans quelle phrase l’orthographe de « si » au discours indirect est-elle correcte ?',
				mcqCorrect: 'Il demande si elle connaît la biographie d’Ahmed Zabana.',
				mcqD1: 'Il demande s’elle connaît la biographie d’Ahmed Zabana.',
				mcqD2: 'Il demande si il connaît la biographie d’Ahmed Zabana.',
				mcqD3: 'Il demande que elle connaît la biographie d’Ahmed Zabana.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			s.mcqCorrect,
			[
				{ text: s.mcqD1, diagnosticFeedback: 'تأكد من أداة الربط المناسبة (que / si / de + infinitif) ومن قاعدة s’il / si elle.' },
				{ text: s.mcqD2, diagnosticFeedback: 'في الخطاب غير المباشر نحذف est-ce que وعلامة الاستفهام ونختصر si إلى s’ أمام il فقط.' },
				{ text: s.mcqD3, diagnosticFeedback: 'جملة الأمر تحتاج حرف الجر (de / d’) قبل الفعل في المصدر.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: s.mcqQ,
				questionTextAr: 'اختر التحويل الصحيح إلى الخطاب غير المباشر:',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: s.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'II. Fonctionnement de la langue (06 pts)',
				points: 6,
				instruction: 'Effectuez les transformations et classements ci-dessous :',
				content: [
					{
						type: 'text',
						content: `1) Transposez les phrases suivantes au discours indirect (03 pts) :\n  ${s.dd1Q}\n  ${s.dd2Q}\n  ${s.dd3Q}`,
						answer: `${s.dd1A}\n${s.dd2A}\n${s.dd3A}`,
						mark: '3'
					},
					{
						type: 'text',
						content: `2) ${s.repQ} (01 pt)`,
						answer: s.repA,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) Classez les substituts suivants dans le tableau (02 pts) :\nListe : ${s.subItems.join(' - ')}`
					},
					buildFrenchClassificationTableBlock({
						columns: [
							{ header: 'Substituts grammaticaux', items: s.subGram, mark: '1' },
							{ header: 'Substituts lexicaux', items: s.subLex, mark: '1' }
						]
					})
				]
			},
			hints: [
				'مع فعل قول في الحاضر (déclare, demande, conseille)، لا نغيّر زمن الفعل الداخلي بل نغيّر الضمائر وأداة الربط.',
				'الجملة الخبرية تأخذ (que)، السؤال الكلي يأخذ (si)، وجملة الأمر تأخذ (de / d’ + infinitif).',
				'البدائل النحوية ضمائر ومحددات (il, elle, lui, qui)، والبدائل المعجمية عبارات اسمية (ce réformateur, le martyr).'
			],
			solutionStepsAr: [
				`${s.dd1A} | ${s.dd2A} | ${s.dd3A}`,
				s.repA,
				`نحوية: ${s.subGram.join(', ')} | معجمية: ${s.subLex.join(', ')}`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Production écrite (7 pts) — Rédiger un récit historique (figure algérienne)
// ═══════════════════════════════════════════════════════════════════════════════
const writeRecitHistorique3amT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3am_t2_write_recit_historique',
	grade: '3am',
	trimesterId: 't2',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية (3AM): كتابة نص تاريخي عن شخصية جزائرية بارزة (7 نقاط)',
	curriculumLessonId: 'fre_lesson_3am_t2_rediger_recit_historique',
	defaultPoints: 7,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const item = rng.pick([
			{
				hero: 'Larbi Ben M’hidi (1923 - 1957)',
				notes: [
					'Identité : Larbi Ben M’hidi, né en 1923 près d’Aïn M’lila',
					'Parcours : Militant dévoué du mouvement national, l’un des six chefs préparant le 1er Novembre 1954',
					'Rôle historique : Organisa la Wilaya V (Oranie), participa au Congrès de la Soummam (août 1956) puis dirigea la lutte à Alger',
					'Fin héroïque : Arrêté en février 1957, il affronta l’ennemi avec calme et mourut en martyr en mars 1957',
					'Consignes : Employez l’imparfait et le passé simple, des connecteurs chronologiques et des substituts.'
				],
				modelAnswer:
					'Larbi Ben M’hidi, un stratège au service de la liberté\nLarbi Ben M’hidi fut l’une des figures les plus lumineuses de la Guerre de Libération Nationale. Il naquit en 1923 près d’Aïn M’lila et montra très tôt un profond amour pour sa patrie.\nTout d’abord, ce jeune patriote milita avec courage au sein du mouvement national. En 1954, il participa à la préparation décisive du 1er Novembre et organisa la résistance dans l’Oranie. Ensuite, en août 1956, ce brillant stratège joua un rôle essentiel au Congrès de la Soummam avant de coordonner la lutte à Alger. Arrêté en février 1957, il demeura digne et calme face à l’ennemi jusqu’à son martyre en mars 1957.\nAujourd’hui, l’Algérie entière honore sa mémoire et transmet son exemple de courage aux nouvelles générations.'
			},
			{
				hero: 'Didouche Mourad (1927 - 1955)',
				notes: [
					'Identité : Didouche Mourad, né le 13 juillet 1927 à Alger',
					'Qualités : Jeune chef intelligent, déterminé et très aimé de ses compagnons',
					'Rôle historique : Co-rédacteur de la Proclamation du 1er Novembre 1954, premier chef de la Wilaya II (Nord-Constantinois)',
					'Fin héroïque : Tomba au champ d’honneur le 18 janvier 1955 à la bataille de Douar Souadek (Smendou), à seulement 27 ans',
					'Consignes : Employez l’imparfait et le passé simple, des repères chronologiques et deux substituts variés.'
				],
				modelAnswer:
					'Didouche Mourad, le jeune héros du 1er Novembre\nDidouche Mourad naquit le 13 juillet 1927 à Alger. C’était un jeune homme intelligent, courageux et entièrement dévoué à la libération de son pays.\nD’abord, il rejoignit les rangs du mouvement national où il se distingua par son sens de l’organisation. En octobre 1954, ce dirigeant déterminé contribua à la rédaction de la Proclamation du 1er Novembre. Puis, dès le déclenchement de la Révolution, il prit la tête de la Wilaya II dans le Nord-Constantinois. Le 18 janvier 1955, le vaillant combattant tomba au champ d’honneur lors de la bataille de Douar Souadek, près de Smendou, à l’âge de vingt-sept ans.\nSon sacrifice reste à jamais gravé dans la mémoire du peuple algérien.'
			},
			{
				hero: 'Cheikh Abdelhamid Ben Badis (1889 - 1940)',
				notes: [
					'Identité : Cheikh Abdelhamid Ben Badis, né le 4 décembre 1889 à Constantine',
					'Formation : Apprit le Saint Coran très jeune et étudia les sciences islamiques à la Zitouna (Tunis)',
					'Œuvre majeure : Fonda l’Association des Oulémas Musulmans Algériens le 5 mai 1931, créa des écoles libres et les revues Al-Chihab et Al-Bassaïr',
					'Héritage : Décédé le 16 avril 1940 ; cette date est célébrée chaque année comme Journée Nationale du Savoir',
					'Consignes : Racontez son parcours au passé simple et à l’imparfait en évitant les répétitions.'
				],
				modelAnswer:
					'Cheikh Abdelhamid Ben Badis, pionnier du savoir et de la réforme\nNé le 4 décembre 1889 à Constantine, Cheikh Abdelhamid Ben Badis consacra toute sa vie à l’instruction du peuple algérien. Dès son enfance, il mémorisa le Saint Coran puis compléta sa formation scientifique à l’université de la Zitouna.\nDe retour en Algérie, cet illustre érudit enseignait jour et nuit pour réveiller les consciences. Le 5 mai 1931, il fonda l’Association des Oulémas Musulmans Algériens avec ses fidèles compagnons. Ensuite, ce grand réformateur ouvrit de nombreuses écoles libres et publia les revues Al-Chihab et Al-Bassaïr pour défendre l’Islam, la langue arabe et la patrie algérienne. Il s’éteignit le 16 avril 1940.\nChaque année, le 16 avril, les élèves algériens célèbrent la Journée du Savoir en hommage à son œuvre immortelle.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			'Un titre pertinent, un ordre chronologique clair, l’imparfait et le passé simple, des substituts et une conclusion rendant hommage.',
			[
				{ text: 'Des notes copiées sous forme de tirets sans verbes conjugués.', diagnosticFeedback: 'المطلوب نص تاريخي متماسك وليس مجرد نقاط متفرقة.' },
				{ text: 'Un texte écrit entièrement au futur simple avec le pronom « Tu ».', diagnosticFeedback: 'القصة التاريخية تُكتب بضمير الغائب في الماضي (Imparfait / Passé simple).' },
				{ text: 'La répétition du même nom propre au début de chaque phrase.', diagnosticFeedback: 'توظيف البدائل اللغوية والنحوية شرط أساسي لجودة النص.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: 'Comment réussir la rédaction d’un récit historique sur une figure algérienne en 3AM ?',
				questionTextAr: 'كيف تضمن العلامة الكاملة في كتابة نص تاريخي عن بطل جزائري في 3AM؟',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'باحترام التسلسل الزمني وتوظيف Imparfait و Passé simple والروابط الزمنية والبدائل اللغوية وخاتمة تكريمية.'
			},
			sujetExercise: {
				customTitle: 'III. Production écrite — Situation d’intégration (07 pts)',
				points: 7,
				instruction: 'À l’occasion de la commémoration du 1er Novembre ou de la Journée du Savoir, rédigez un récit historique (10 à 12 lignes) :',
				content: [
					buildFrenchWrittenProductionBlock({
						sujetUnTitle: `Sujet : Portrait et parcours historique de ${item.hero}`,
						sujetUnPrompt:
							'En vous aidant de la fiche chronologique ci-dessous, rédigez un récit historique cohérent pour présenter cette grande figure de la mémoire algérienne à vos camarades.',
						sujetUnNotes: item.notes,
						modelAnswer: item.modelAnswer,
						rubricSummary:
							'Pertinence et exploitation complète de la fiche (2 pts) + Cohérence chronologique et substituts (1.5 pt) + Correction des temps du récit : imparfait, passé simple (2.5 pts) + Présentation et orthographe (1 pt).',
						mark: '7'
					})
				]
			},
			hints: [
				'ابدأ بعنوان مناسب ومقدمة تعرّف بالشخصية وميلادها وصفاته المعنوية.',
				'رتّب مراحل الكفاح باستعمال روابط زمنية واضحة (D’abord, En 1954, Ensuite, Puis).',
				'عوّض الاسم المتكرر ببدائل معجمية (ce stratège, cet érudit) واختم بجملة تكريم في الحاضر.'
			],
			solutionStepsAr: [
				`الشخصية: ${item.hero}`,
				'توظيف Imparfait للوصف و Passé simple للأحداث التاريخية البارزة.',
				'إدراج البدائل المعجمية والنحوية وخاتمة تمجّد الذاكرة الوطنية.'
			],
			finalAnswer: item.modelAnswer
		};
	}
};

export const TEMPLATES_3AM_T2: FrenchParameterizedTemplate[] = [
	compNovembreHeros3amT2,
	compOulemasMemoire3amT2,
	langTempsConnecteurs3amT2,
	langSubstitutsDiscours3amT2,
	writeRecitHistorique3amT2
];
