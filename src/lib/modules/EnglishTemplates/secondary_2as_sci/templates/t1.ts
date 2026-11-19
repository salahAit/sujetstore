import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	EnglishGeneratedExerciseInstance,
	EnglishParameterizedTemplate
} from '../../types';
import {
	buildEnglishPassageBlock,
	buildEnglishPhonologyTableBlock,
	buildEnglishWordBuildingTableBlock,
	buildEnglishWrittenExpressionBlock
} from '../../english-helpers';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';

// ============================================================================
// 5 Parameterized Templates — 2AS Scientific & Management Shared — Trimester 1
// Unit 1: Make Peace (Conflict Resolution, Justice & Human Rights)
// Split: 2 comprehension (8 pts) + 2 text_exploration (7 pts) + 1 written_expression (5 pts)
// ============================================================================

// [1] Comprehension (8 pts) — Peace, Dialogue & Peaceful Reform
export const tpl2asSciT1CompPeaceReconciliation: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2as_sci_t1_comp_peace_reconciliation',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'reading_comprehension',
	titleAr: 'فهم النص (8 نقاط): صنع السلام وحل النزاعات بالحوار والإصلاح السلمي',
	curriculumLessonId: 'eng_lesson_2as_sci_t1_peace_charter_writing',
	defaultPoints: 8,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'Peer Mediation: Building Peace Inside Secondary Schools',
				source: 'Adapted from Youth Education Digest',
				paragraphs: [
					'Disagreements are a natural part of daily school life, yet unchecked anger can quickly turn a minor misunderstanding into harmful bullying. Across many Algerian secondary schools, teachers and pupils have launched peer mediation clubs to promote calm dialogue before conflicts escalate.',
					'Trained student mediators learn how to listen patiently to both sides without taking a biased position. [[They]] help classmates express their feelings respectfully and search for fair solutions. When students participate in solving [[their]] own disputes, they develop responsibility and mutual trust.',
					'Experience has shown that schools with active mediation programmes witness far fewer disciplinary incidents. Although conflicts cannot disappear completely, young citizens who master peaceful negotiation today will be able to protect social harmony tomorrow.'
				],
				glossary: [
					{ term: 'escalate', meaning: 'become worse or more serious' },
					{ term: 'biased', meaning: 'unfairly preferring one side' }
				],
				tfItems: [
					{
						q: 'a) Peer mediation clubs encourage students to ignore school disagreements.',
						a: 'False',
						c: 'They encourage calm dialogue before conflicts escalate.',
						mark: '0.5'
					},
					{
						q: 'b) Student mediators listen patiently without favouring either side.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'c) Schools with mediation programmes experience fewer disciplinary problems.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'd) Peer mediation completely eliminates every disagreement forever.',
						a: 'False',
						c: 'Conflicts cannot disappear completely, but students learn to negotiate peacefully.',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) Why were peer mediation clubs launched in many secondary schools?',
						a: 'They were launched to promote calm dialogue and stop minor misunderstandings from turning into bullying.',
						mark: '1.0'
					},
					{
						q: 'b) What two qualities do student mediators practise during a session?',
						a: 'They listen patiently to both sides and remain unbiased (fair).',
						mark: '1.0'
					},
					{
						q: 'c) How does peaceful negotiation benefit young citizens in the future?',
						a: 'It helps them protect social harmony in the future.',
						mark: '1.0'
					}
				],
				refPrompt: '3) What or who do the underlined words refer to in the text? a) They (§2)   b) their (§2)',
				refAnswer: 'a) They (§2): trained student mediators.   b) their (§2): students.',
				generalIdeaHeader: '4) Choose the most suitable general idea for the text:',
				generalIdeaOptions: [
					'Peer mediation trains students to solve school conflicts peacefully.',
					'Disagreements never occur in secondary schools.',
					'Only headmasters can maintain discipline at school.'
				],
				generalIdeaCorrect: 'Peer mediation trains students to solve school conflicts peacefully.',
				quizStem: 'According to the passage on Peer Mediation, what is the primary role of trained student mediators?',
				quizCorrect: 'To listen patiently without bias and guide classmates toward fair, peaceful solutions',
				quizDistractors: [
					{
						text: 'To punish students who argue during school breaks',
						diagnosticFeedback: 'Mediators facilitate dialogue; they do not act as disciplinary judges.'
					},
					{
						text: 'To support their closest friends during every school argument',
						diagnosticFeedback: 'The text clearly states mediators listen without taking a biased position.'
					},
					{
						text: 'To replace teachers in academic lessons',
						diagnosticFeedback: 'Peer mediation focuses on conflict resolution, not replacing teachers.'
					}
				],
				quizExplanation: 'الفقرة الثانية توضح أن الوسطاء التلاميذ يصغون بصبر وحياد ويساعدون زملاءهم على إيجاد حلول عادلة.'
			},
			{
				title: 'Imam Abdelhamid Ben Badis and Peaceful Reform',
				source: 'Algerian Cultural Heritage Series',
				paragraphs: [
					'In the early twentieth century, Algeria faced severe injustice under colonial rule, which sought to erase national identity and close traditional schools. Faced with this hardship, Imam Abdelhamid Ben Badis chose knowledge, moral reform, and unity as the strongest foundations for dignity and lasting peace.',
					'Working closely with scholars such as Sheikh Mohamed Bachir El Ibrahimi and Sheikh Moubarek El Mili, [[he]] founded the Association of Algerian Muslim Scholars in 1931. Through mosques, free schools, and journals, the association taught youth to reject division, respect justice, and defend [[their]] faith and homeland wisely.',
					'Imam Ben Badis believed that an educated, disciplined society could never be defeated by ignorance or hatred. Today, Algerian students continue to study his peaceful message of learning, brotherhood, and principled courage.'
				],
				glossary: [
					{ term: 'dignity', meaning: 'self-respect and honour' },
					{ term: 'principled', meaning: 'guided by firm moral values' }
				],
				tfItems: [
					{
						q: 'a) Colonial rule supported traditional Algerian schools and national identity.',
						a: 'False',
						c: 'Colonial rule sought to erase national identity and close traditional schools.',
						mark: '0.5'
					},
					{
						q: 'b) The Association of Algerian Muslim Scholars was founded in 1931.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'c) The association spread its message through free schools, mosques, and journals.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'd) Imam Ben Badis worked completely alone without other Algerian scholars.',
						a: 'False',
						c: 'He worked closely with scholars such as Sheikh El Ibrahimi and Sheikh El Mili.',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) What foundations did Imam Ben Badis choose to achieve dignity and peace?',
						a: 'He chose knowledge, moral reform, and unity.',
						mark: '1.0'
					},
					{
						q: 'b) Mention two channels used by the association to educate Algerian youth.',
						a: 'It used mosques, free schools, and journals (any two).',
						mark: '1.0'
					},
					{
						q: 'c) Why did Imam Ben Badis value education and discipline so highly?',
						a: 'Because he believed an educated, disciplined society could never be defeated by ignorance or hatred.',
						mark: '1.0'
					}
				],
				refPrompt: '3) What or who do the underlined words refer to in the text? a) he (§2)   b) their (§2)',
				refAnswer: 'a) he (§2): Imam Abdelhamid Ben Badis.   b) their (§2): Algerian youth.',
				generalIdeaHeader: '4) Choose the most suitable title for the text:',
				generalIdeaOptions: [
					'Peaceful Reform Through Knowledge and Unity',
					'Modern Architecture in Constantine',
					'A History of Ancient Trade Routes'
				],
				generalIdeaCorrect: 'Peaceful Reform Through Knowledge and Unity',
				quizStem: 'According to the text about Imam Abdelhamid Ben Badis, how did the Association of Algerian Muslim Scholars defend identity and peace?',
				quizCorrect: 'By building free schools, publishing journals, and promoting education, justice, and unity',
				quizDistractors: [
					{
						text: 'By closing local libraries and stopping public teaching',
						diagnosticFeedback: 'On the contrary, the association opened free schools and spread learning.'
					},
					{
						text: 'By encouraging division among Algerian cities',
						diagnosticFeedback: 'The passage states they taught youth to reject division and build unity.'
					},
					{
						text: 'By leaving Algeria permanently in 1931',
						diagnosticFeedback: 'They founded the association in 1931 to serve and educate Algerian society.'
					}
				],
				quizExplanation: 'النص يبرز دور الإمام ابن باديس ورفاقه في الإصلاح السلمي عبر التعليم والصحافة ونبذ الفرقة.'
			},
			{
				title: 'Reconciliation and Community Peace',
				source: 'Civic Values Review',
				paragraphs: [
					'Lasting peace is much more than the absence of open violence; it requires justice, fairness, and respect for every member of the community. When people feel heard and treated equitably, trust grows and social disputes are resolved swiftly.',
					'In many Algerian neighbourhoods, wise elders and community leaders still practise peaceful reconciliation whenever disagreements arise between neighbours. [[They]] bring both parties together in a calm gathering, remind them of brotherhood, and propose a balanced settlement that protects everyone\'s rights.',
					'Because [[this]] tradition prevents small arguments from turning into lasting hostility, sociologists encourage young generations to preserve constructive dialogue both online and in daily life.'
				],
				glossary: [
					{ term: 'equitably', meaning: 'in a fair and impartial way' },
					{ term: 'hostility', meaning: 'unfriendly or aggressive behaviour' }
				],
				tfItems: [
					{
						q: 'a) True peace means only the absence of fighting.',
						a: 'False',
						c: 'It also requires justice, fairness, and respect for every member of the community.',
						mark: '0.5'
					},
					{
						q: 'b) Wise elders help settle disputes between neighbours peacefully.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'c) Community reconciliation ignores the rights of one of the parties.',
						a: 'False',
						c: 'It proposes a balanced settlement that protects everyone\'s rights.',
						mark: '0.5'
					},
					{
						q: 'd) Young people are encouraged to use constructive dialogue online as well.',
						a: 'True',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) What three elements are necessary for lasting peace besides the absence of violence?',
						a: 'Justice, fairness, and respect for every member of the community.',
						mark: '1.0'
					},
					{
						q: 'b) How do community elders help resolve neighbourhood disputes?',
						a: 'They bring both parties together calmly, remind them of brotherhood, and propose a balanced settlement.',
						mark: '1.0'
					},
					{
						q: 'c) Why do sociologists advise young people to keep this tradition alive?',
						a: 'Because it prevents small arguments from turning into lasting hostility.',
						mark: '1.0'
					}
				],
				refPrompt: '3) What or who do the underlined words refer to in the text? a) They (§2)   b) this (§3)',
				refAnswer: 'a) They (§2): wise elders and community leaders.   b) this (§3): peaceful reconciliation (this tradition).',
				generalIdeaHeader: '4) The text is mainly:',
				generalIdeaOptions: ['Expository', 'Narrative', 'Descriptive'],
				generalIdeaCorrect: 'Expository',
				quizStem: 'According to the passage on Reconciliation, why is peaceful mediation valuable in neighbourhoods?',
				quizCorrect: 'It protects everyone\'s rights and stops minor arguments from becoming lasting hostility',
				quizDistractors: [
					{
						text: 'It forces people to stop communicating with their neighbours',
						diagnosticFeedback: 'Reconciliation brings neighbours together in calm dialogue.'
					},
					{
						text: 'It applies only to international treaties and not local life',
						diagnosticFeedback: 'The text highlights local community reconciliation in Algerian neighbourhoods.'
					},
					{
						text: 'It encourages online arguments to replace face-to-face dialogue',
						diagnosticFeedback: 'Sociologists encourage constructive dialogue both online and in daily life.'
					}
				],
				quizExplanation: 'الصلح المجتمعي يحفظ حقوق الجميع ويمنع تحول الخلافات الصغيرة إلى عداوة دائمة.'
			}
		];

		const v = difficulty === 'hard' ? variants[1] : rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			buildEnglishPassageBlock({
				title: v.title,
				paragraphs: v.paragraphs,
				source: v.source,
				glossary: v.glossary
			}),
			{
				type: 'text',
				content: '1) Say whether the following statements are True or False according to the text (correct the false ones):'
			},
			{ type: 'true_false', items: v.tfItems },
			{ type: 'text', content: '2) Answer the following questions according to the text:' },
			...v.compQuestions.map((item) => ({
				type: 'text' as const,
				content: item.q,
				answer: item.a,
				mark: item.mark
			})),
			{ type: 'text', content: v.refPrompt, answer: v.refAnswer, mark: '1.5' },
			{
				type: 'multiple_choice',
				groups: [
					{
						header: v.generalIdeaHeader,
						options: v.generalIdeaOptions,
						correct: v.generalIdeaCorrect,
						mark: '1.5'
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
				questionTextAr: 'اختر الإجابة الصحيحة وفق مضمون النص:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.quizExplanation
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — A. Comprehension',
				points: 8,
				instruction: 'Read the text carefully then do the activities.',
				content
			},
			hints: [
				'اقرأ النص كاملا مرتين قبل الإجابة عن أسئلة True/False.',
				'في مرجع الضمائر (Reference words)، ارجع دائما إلى الاسم الذي يسبق الضمير وطابقه في المفرد والجمع.',
				'أجب عن أسئلة الفهم بجمل موجزة ومباشرة دون نسخ فقرات كاملة.'
			],
			solutionStepsAr: [
				'التحقق من صحة العبارات وتصحيح الخاطئة منها اعتمادا على معطيات النص.',
				'استخراج الأجوبة الدقيقة لأسئلة الفهم من الفقرات المناسبة.',
				'تحديد مرجع الضمائر المسطّرة ثم اختيار الفكرة العامة أو نوع النص.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [2] Comprehension (8 pts) — Human Rights, Children's Education & Justice
export const tpl2asSciT1CompHumanRightsJustice: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2as_sci_t1_comp_human_rights_justice',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'reading_comprehension',
	titleAr: 'فهم النص (8 نقاط): حقوق الإنسان والعدل وحق الأطفال في التعليم',
	curriculumLessonId: 'eng_lesson_2as_sci_t1_obligation_prohibition',
	defaultPoints: 8,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'Every Child\'s Right to Education and Safety',
				source: 'Adapted from Global Youth Bulletin',
				paragraphs: [
					'Every child on earth has the fundamental right to learn in a safe school, receive healthcare, and grow up in dignity. International charters clearly affirm that governments and communities must protect children from exploitation and harsh labour.',
					'Despite global efforts, millions of young boys and girls in poor regions still miss classes because of poverty or local conflicts. Without basic schooling, [[they]] face major obstacles when trying to find decent jobs later in life.',
					'Supporting free public education, providing school meals, and building libraries in rural areas can break the cycle of poverty. When children are able to study in peace, [[their]] whole nation gains skilled, responsible citizens.'
				],
				glossary: [
					{ term: 'exploitation', meaning: 'unfair treatment for selfish gain' },
					{ term: 'decent', meaning: 'fair, respectable, and acceptable' }
				],
				tfItems: [
					{
						q: 'a) Only children in wealthy cities have the right to education.',
						a: 'False',
						c: 'Every child on earth has the fundamental right to education and safety.',
						mark: '0.5'
					},
					{
						q: 'b) Poverty and local conflicts prevent millions of children from attending school.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'c) Lack of schooling makes it easier to find decent employment later.',
						a: 'False',
						c: 'Without basic schooling, children face major obstacles in finding decent jobs.',
						mark: '0.5'
					},
					{
						q: 'd) Educating children benefits the entire nation.',
						a: 'True',
						mark: '0.5'
					}
				],
				paraMatchPrompt: '2) In which paragraph is each idea mentioned? a) Practical solutions to help poor pupils study.   b) The causes that keep millions of children out of school.',
				paraMatchAnswer: 'a) Paragraph 3 (§3).   b) Paragraph 2 (§2).',
				compQuestions: [
					{
						q: 'a) What must governments and communities protect children from?',
						a: 'They must protect children from exploitation and harsh labour.',
						mark: '1.0'
					},
					{
						q: 'b) Mention two measures that can help break the cycle of poverty.',
						a: 'Supporting free public education, providing school meals, and building rural libraries (any two).',
						mark: '1.0'
					},
					{
						q: 'c) What does a nation gain when its children study in peace?',
						a: 'It gains skilled and responsible citizens.',
						mark: '1.0'
					}
				],
				refPrompt: '4) What or who do the underlined words refer to in the text? a) they (§2)   b) their (§3)',
				refAnswer: 'a) they (§2): millions of young boys and girls in poor regions.   b) their (§3): children.',
				quizStem: 'According to the passage, how can societies break the cycle of poverty for children in poor regions?',
				quizCorrect: 'By supporting free education, providing school meals, and building libraries in rural areas',
				quizDistractors: [
					{
						text: 'By sending young children to work instead of school',
						diagnosticFeedback: 'The text states children must be protected from harsh labour.'
					},
					{
						text: 'By closing rural schools to reduce costs',
						diagnosticFeedback: 'The passage recommends building libraries and supporting free public schooling.'
					},
					{
						text: 'By delaying basic education until adulthood',
						diagnosticFeedback: 'Early access to safe schooling is described as a fundamental right.'
					}
				],
				quizExplanation: 'الفقرة الثالثة تذكر أن التعليم المجاني والإطعام المدرسي وبناء المكتبات الريفية تكسر حلقة الفقر.'
			},
			{
				title: 'Fair Water Sharing in the M-Zab Valley Oases',
				source: 'Algerian Heritage & Justice Chronicle',
				paragraphs: [
					'For centuries, the inhabitants of the M-Zab Valley in Ghardaia lived in an arid desert climate where every drop of rain was precious. Rather than fighting over scarce water, [[they]] created an ingenious and fair system of channels and small dams to distribute floodwater equally among all palm groves.',
					'Community elders supervised the canals carefully so that rich and poor farmers alike received their exact share without favouritism. Anyone who damaged a channel or wasted water had to repair [[it]] immediately and respect the collective charter.',
					'This historic Algerian model proves that fairness, cooperation, and respect for shared rules can prevent conflicts even when natural resources are extremely limited.'
				],
				glossary: [
					{ term: 'arid', meaning: 'very dry with little rainfall' },
					{ term: 'favouritism', meaning: 'unfairly giving better treatment to one person' }
				],
				tfItems: [
					{
						q: 'a) The M-Zab Valley enjoys heavy rainfall throughout the year.',
						a: 'False',
						c: 'It has an arid desert climate where every drop of rain is precious.',
						mark: '0.5'
					},
					{
						q: 'b) Floodwater was distributed equally among all palm groves.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'c) Wealthy farmers received extra water before poor farmers.',
						a: 'False',
						c: 'Rich and poor farmers alike received their exact share without favouritism.',
						mark: '0.5'
					},
					{
						q: 'd) Respecting shared rules helped prevent conflicts over scarce water.',
						a: 'True',
						mark: '0.5'
					}
				],
				paraMatchPrompt: '2) In which paragraph is each idea mentioned? a) The lesson drawn from this Algerian heritage model.   b) Equal supervision of canals for rich and poor farmers.',
				paraMatchAnswer: 'a) Paragraph 3 (§3).   b) Paragraph 2 (§2).',
				compQuestions: [
					{
						q: 'a) How did the inhabitants of the M-Zab Valley avoid fighting over scarce water?',
						a: 'They created a fair system of channels and small dams to distribute floodwater equally.',
						mark: '1.0'
					},
					{
						q: 'b) What did someone have to do if they damaged a water channel?',
						a: 'They had to repair it immediately and respect the collective charter.',
						mark: '1.0'
					},
					{
						q: 'c) What three values prevented conflicts in the M-Zab oasis system?',
						a: 'Fairness, cooperation, and respect for shared rules.',
						mark: '1.0'
					}
				],
				refPrompt: '4) What or who do the underlined words refer to in the text? a) they (§1)   b) it (§2)',
				refAnswer: 'a) they (§1): the inhabitants of the M-Zab Valley.   b) it (§2): a channel.',
				quizStem: 'What main lesson does the historic M-Zab Valley water-sharing system teach us?',
				quizCorrect: 'Fairness, cooperation, and shared rules can prevent conflicts even when resources are scarce',
				quizDistractors: [
					{
						text: 'Scarce water always makes conflict unavoidable',
						diagnosticFeedback: 'The M-Zab model proves fair distribution prevents conflict.'
					},
					{
						text: 'Only modern machines can ensure justice in agriculture',
						diagnosticFeedback: 'The traditional M-Zab system achieved fairness centuries ago.'
					},
					{
						text: 'Water channels should belong exclusively to wealthy landlords',
						diagnosticFeedback: 'Both rich and poor farmers received their exact share without favouritism.'
					}
				],
				quizExplanation: 'نظام تقاسم المياه في وادي ميزاب يبرهن أن العدل والتعاون واحترام القوانين يمنع النزاعات حتى مع ندرة الموارد.'
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			buildEnglishPassageBlock({
				title: v.title,
				paragraphs: v.paragraphs,
				source: v.source,
				glossary: v.glossary
			}),
			{
				type: 'text',
				content: '1) Are the following statements True or False according to the text? Correct the false ones:'
			},
			{ type: 'true_false', items: v.tfItems },
			{ type: 'text', content: v.paraMatchPrompt, answer: v.paraMatchAnswer, mark: '1.5' },
			{ type: 'text', content: '3) Answer the following questions according to the text:' },
			...v.compQuestions.map((item) => ({
				type: 'text' as const,
				content: item.q,
				answer: item.a,
				mark: item.mark
			})),
			{ type: 'text', content: v.refPrompt, answer: v.refAnswer, mark: '1.5' }
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
				questionTextAr: 'اختر الجواب الصحيح استنادا إلى النص:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.quizExplanation
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — A. Comprehension',
				points: 8,
				instruction: 'Read the passage carefully then answer the questions below.',
				content
			},
			hints: [
				'تحقق من أرقام الفقرات (§1, §2, §3) عند تحديد موضع كل فكرة.',
				'تأكد من تصحيح العبارات الخاطئة بجملة دقيقة من النص.',
				'راجع الضمائر المسطّرة في سياقها المباشر قبل كتابة المرجع.'
			],
			solutionStepsAr: [
				'فحص عبارات الصواب والخطأ وتصحيح الخطأ منها.',
				'تحديد رقم الفقرة الموافقة لكل فكرة رئيسية.',
				'الإجابة المباشرة عن أسئلة الفهم واستخراج مرجع الضمائر.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [3] Text Exploration (7 pts) — Modals (Ability, Possibility, Obligation & Prohibition) + Word Building + Final -s
export const tpl2asSciT1ExpModalsAbilityObligation: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2as_sci_t1_exp_modals_ability_obligation',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'grammar_syntax',
	titleAr: 'استكشاف النص (7 نقاط): القدرة والإلزام والمنع، الاشتقاق، ونطق النهاية (-s)',
	curriculumLessonId: 'eng_lesson_2as_sci_t1_ability_possibility',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				vocabPrompt: '1) Match each word with its correct synonym: (1) conflict   (2) fair   (3) prohibit   |   (A) forbid   (B) just   (C) dispute',
				vocabAnswer: '(1) conflict = (C) dispute | (2) fair = (B) just | (3) prohibit = (A) forbid.',
				wbRows: [
					{
						verb: { given: true, value: 'protect' },
						noun: { value: 'protection', mark: '0.25' },
						adjective: { value: 'protective', mark: '0.25' }
					},
					{
						verb: { value: 'educate', mark: '0.25' },
						noun: { given: true, value: 'education' },
						adjective: { value: 'educational / educated', mark: '0.25' }
					},
					{
						verb: { value: 'create', mark: '0.25' },
						noun: { value: 'creation', mark: '0.25' },
						adjective: { given: true, value: 'creative' }
					}
				],
				grammarItems: [
					{
						q: 'a) Next year, our mediation club will have the ability to train forty pupils.\n   Rewrite starting with: Next year, our mediation club ............',
						a: 'Next year, our mediation club will be able to train forty pupils.',
						mark: '0.5'
					},
					{
						q: 'b) It is strictly forbidden to insult classmates on social media.\n   Rewrite starting with: Students ............',
						a: 'Students must not insult classmates on social media.',
						mark: '0.5'
					},
					{
						q: 'c) It is not necessary for visitors to pay for the peace exhibition.\n   Rewrite starting with: Visitors ............',
						a: 'Visitors do not have to (or: need not) pay for the peace exhibition.',
						mark: '0.5'
					},
					{
						q: 'd) Yesterday, the two leaders succeeded in signing the truce.\n   Rewrite using (were able to): Yesterday, the two leaders ............',
						a: 'Yesterday, the two leaders were able to sign the truce.',
						mark: '0.5'
					}
				],
				phonologyPrompt: '4) Classify the following words according to the pronunciation of their final "-s": rights, judges, leaders, causes, maps, treaties',
				phonologyCols: [
					{ header: '/s/', words: ['rights', 'maps'], mark: '0.35' },
					{ header: '/z/', words: ['leaders', 'treaties'], mark: '0.35' },
					{ header: '/iz/', words: ['judges', 'causes'], mark: '0.30' }
				],
				clozePrompt: '5) Fill in the gaps with words from the list: (dialogue, must, justice, peace)\nLasting ........(1)........ can only be achieved when every citizen enjoys ........(2)........ and equality. Therefore, communities ........(3)........ reject hatred and solve disagreements through calm ........(4).........',
				clozeAnswer: '(1) peace   (2) justice   (3) must   (4) dialogue.',
				quizStem: 'Rewrite correctly: "It is not necessary for volunteers to bring food."',
				quizCorrect: 'Volunteers do not have to bring food.',
				quizDistractors: [
					{
						text: 'Volunteers must not bring food.',
						diagnosticFeedback: 'must not expresses prohibition, whereas the sentence means absence of obligation.'
					},
					{
						text: 'Volunteers will can bring food.',
						diagnosticFeedback: 'will can is grammatically incorrect and changes the meaning.'
					},
					{
						text: 'Volunteers had to bring food.',
						diagnosticFeedback: 'had to expresses past obligation, the opposite of not necessary.'
					}
				],
				quizExplanation: 'عبارة (not necessary) تعني غياب الإلزام، فنستعمل (do not have to / need not) وليس (must not).'
			},
			{
				vocabPrompt: '1) Find the exact opposite of each word from the list (harmony, obey, unfair): (1) conflict   (2) just   (3) disobey',
				vocabAnswer: '(1) conflict / harmony | (2) just / unfair | (3) disobey / obey.',
				wbRows: [
					{
						verb: { given: true, value: 'respect' },
						noun: { value: 'respect', mark: '0.25' },
						adjective: { value: 'respectful', mark: '0.25' }
					},
					{
						verb: { value: 'unite', mark: '0.25' },
						noun: { given: true, value: 'unity' },
						adjective: { value: 'united', mark: '0.25' }
					},
					{
						verb: { value: 'tolerate', mark: '0.25' },
						noun: { value: 'tolerance', mark: '0.25' },
						adjective: { given: true, value: 'tolerant' }
					}
				],
				grammarItems: [
					{
						q: 'a) It is strongly advisable for pupils to listen before judging.\n   Rewrite starting with: Pupils ............',
						a: 'Pupils should (or: ought to) listen before judging.',
						mark: '0.5'
					},
					{
						q: 'b) In the future, young mediators will have the capacity to reduce bullying.\n   Rewrite starting with: In the future, young mediators ............',
						a: 'In the future, young mediators will be able to reduce bullying.',
						mark: '0.5'
					},
					{
						q: 'c) It is prohibited to spread false rumours about neighbours.\n   Rewrite starting with: People ............',
						a: 'People must not spread false rumours about neighbours.',
						mark: '0.5'
					},
					{
						q: 'd) Last month, the elders had an obligation to hold an urgent meeting.\n   Rewrite starting with: Last month, the elders ............',
						a: 'Last month, the elders had to hold an urgent meeting.',
						mark: '0.5'
					}
				],
				phonologyPrompt: '4) Classify the following words according to the pronunciation of their final "-s": conflicts, bridges, schools, beliefs, marches, rules',
				phonologyCols: [
					{ header: '/s/', words: ['conflicts', 'beliefs'], mark: '0.35' },
					{ header: '/z/', words: ['schools', 'rules'], mark: '0.35' },
					{ header: '/iz/', words: ['bridges', 'marches'], mark: '0.30' }
				],
				clozePrompt: '5) Fill in the gaps with words from the list: (rules, respect, bullying, able)\nEvery school needs clear ........(1)........ that protect students from ........(2)......... When pupils show mutual ........(3)........, they will be ........(4)........ to learn in a peaceful environment.',
				clozeAnswer: '(1) rules   (2) bullying   (3) respect   (4) able.',
				quizStem: 'Choose the right future ability rewrite: "Soon, our school (can) host a regional peace forum."',
				quizCorrect: 'Soon, our school will be able to host a regional peace forum.',
				quizDistractors: [
					{
						text: 'Soon, our school will can host a regional peace forum.',
						diagnosticFeedback: 'Never combine will + can in English.'
					},
					{
						text: 'Soon, our school could host to a regional peace forum.',
						diagnosticFeedback: 'could does not take "to" and is not the standard future ability form here.'
					},
					{
						text: 'Soon, our school was able to host a regional peace forum.',
						diagnosticFeedback: 'was able to is past tense, not future ("Soon").'
					}
				],
				quizExplanation: 'للمستقبل نستخدم الصيغة الثابتة will be able to + stem ولا نكتب will can أبدا.'
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			{ type: 'text', content: v.vocabPrompt, answer: v.vocabAnswer, mark: '1.5' },
			{ type: 'text', content: '2) Complete the following word-building chart:' },
			buildEnglishWordBuildingTableBlock(v.wbRows),
			{ type: 'text', content: '3) Rewrite sentence (b) so that it means the same as sentence (a):' },
			...v.grammarItems.map((g) => ({
				type: 'text' as const,
				content: g.q,
				answer: g.a,
				mark: g.mark
			})),
			{ type: 'text', content: v.phonologyPrompt },
			buildEnglishPhonologyTableBlock({ columns: v.phonologyCols }),
			{ type: 'text', content: v.clozePrompt, answer: v.clozeAnswer, mark: '1.0' }
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
				questionTextAr: 'اختر إعادة الصياغة النحوية الصحيحة:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.quizExplanation
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — B. Text Exploration',
				points: 7,
				instruction: 'Do the following language exploration activities carefully.',
				content
			},
			hints: [
				'ميّز جيدا بين المنع (must not) وانعدام الإلزام (do not have to).',
				'في جدول الاشتقاق راعِ نوع الكلمة (Verb / Noun / Adjective).',
				'في النهاية (-s)، انظر إلى الصوت الأخير قبل الحرف s وليس الحرف المكتوب فقط.'
			],
			solutionStepsAr: [
				'ربط المفردات بمرادفاتها أو أضدادها المناسبة.',
				'إتمام جدول اشتقاق الفعل والاسم والصفة بدقة.',
				'إعادة صياغة الجمل بأفعال القدرة والإلزام، ثم تصنيف (-s) وملء الفراغات.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [4] Text Exploration (7 pts) — Criticism/Regret (should have), Negative Prefixes & Reordering
export const tpl2asSciT1ExpCriticismPrefixesPhonology: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2as_sci_t1_exp_criticism_prefixes_phonology',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'vocabulary_morphology',
	titleAr: 'استكشاف النص (7 نقاط): الندم والعتاب (should have)، السوابق النافية، والترتيب المنطقي',
	curriculumLessonId: 'eng_lesson_2as_sci_t1_prefixes_phonology',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				prefixPrompt: '1) Form the opposite of each word by adding the right negative prefix (un-, in-, im-, il-, ir-, dis-):\na) justice   b) possible   c) legal   d) responsible   e) honest   f) fair',
				prefixAnswer: 'a) injustice | b) impossible | c) illegal | d) irresponsible | e) dishonest | f) unfair.',
				wbRows: [
					{
						verb: { given: true, value: 'agree' },
						noun: { value: 'agreement', mark: '0.25' },
						adjective: { value: 'agreeable', mark: '0.25' }
					},
					{
						verb: { value: 'solve', mark: '0.25' },
						noun: { given: true, value: 'solution' },
						adjective: { value: 'solvable', mark: '0.25' }
					},
					{
						verb: { value: 'harm', mark: '0.25' },
						noun: { value: 'harm', mark: '0.25' },
						adjective: { given: true, value: 'harmful / harmless' }
					}
				],
				grammarItems: [
					{
						q: 'a) Karim shouted at his friend yesterday, and now he regrets it.\n   Rewrite using (should not have): Karim ............',
						a: 'Karim should not have shouted at his friend yesterday.',
						mark: '0.5'
					},
					{
						q: 'b) The two sides did not listen to the mediator.\n   Rewrite using (should have): The two sides ............',
						a: 'The two sides should have listened to the mediator.',
						mark: '0.5'
					},
					{
						q: 'c) It was wrong of him to break his promise.\n   Rewrite using (should not have): He ............',
						a: 'He should not have broken his promise.',
						mark: '0.5'
					},
					{
						q: 'd) You forgot to apologize to your neighbour.\n   Rewrite using (ought to have): You ............',
						a: 'You ought to have apologized to your neighbour.',
						mark: '0.5'
					}
				],
				phonologyPrompt: '4) Classify the following words according to the pronunciation of their final "-s": promises, talks, citizens, peace-makers, debates, places',
				phonologyCols: [
					{ header: '/s/', words: ['talks', 'debates'], mark: '0.35' },
					{ header: '/z/', words: ['citizens', 'peace-makers'], mark: '0.35' },
					{ header: '/iz/', words: ['promises', 'places'], mark: '0.30' }
				],
				reorderPrompt: '5) Reorder the following sentences to make a coherent paragraph:\na) As a result, both students shook hands and returned to class calmly.\nb) First, the mediator invited each pupil to explain the problem without interruption.\nc) Yesterday, a misunderstanding occurred between two classmates during the break.\nd) Next, they agreed together on a fair solution that respected both sides.',
				reorderAnswer: 'Order: c - b - d - a.',
				quizStem: 'Choose the right negative prefixes for: (1) moral, (2) legal, (3) agree.',
				quizCorrect: 'immoral / illegal / disagree',
				quizDistractors: [
					{
						text: 'inmoral / inlegal / unagree',
						diagnosticFeedback: 'Use im- before m/p, il- before l, and dis- with agree.'
					},
					{
						text: 'unmoral / irlegal / imagree',
						diagnosticFeedback: 'il- precedes l (illegal), not ir-.'
					},
					{
						text: 'dismoral / unlegal / inagree',
						diagnosticFeedback: 'None of these three prefix combinations is standard English.'
					}
				],
				quizExplanation: 'قبل m نستعمل im- (immoral)، وقبل l نستعمل il- (illegal)، ومع agree نستعمل dis- (disagree).'
			},
			{
				prefixPrompt: '1) Form the opposite of each word by adding the right negative prefix (un-, in-, im-, il-, ir-, dis-):\na) equality   b) polite   c) regular   d) respect   e) literate   f) safe',
				prefixAnswer: 'a) inequality | b) impolite | c) irregular | d) disrespect | e) illiterate | f) unsafe.',
				wbRows: [
					{
						verb: { given: true, value: 'govern' },
						noun: { value: 'government', mark: '0.25' },
						adjective: { value: 'governmental', mark: '0.25' }
					},
					{
						verb: { value: 'defend', mark: '0.25' },
						noun: { given: true, value: 'defence' },
						adjective: { value: 'defensive', mark: '0.25' }
					},
					{
						verb: { value: 'equal', mark: '0.25' },
						noun: { value: 'equality', mark: '0.25' },
						adjective: { given: true, value: 'equal' }
					}
				],
				grammarItems: [
					{
						q: 'a) They ignored the school charter and started an argument.\n   Rewrite using (should not have): They ............',
						a: 'They should not have ignored the school charter.',
						mark: '0.5'
					},
					{
						q: 'b) Nadia did not ask for help when she saw the bullying.\n   Rewrite using (should have): Nadia ............',
						a: 'Nadia should have asked for help when she saw the bullying.',
						mark: '0.5'
					},
					{
						q: 'c) He spoke harshly to his younger brother.\n   Rewrite using (should not have): He ............',
						a: 'He should not have spoken harshly to his younger brother.',
						mark: '0.5'
					},
					{
						q: 'd) We did not verify the news before sharing it.\n   Rewrite using (ought to have): We ............',
						a: 'We ought to have verified the news before sharing it.',
						mark: '0.5'
					}
				],
				phonologyPrompt: '4) Classify the following words according to the pronunciation of their final "-s": rights, classes, values, facts, judges, members',
				phonologyCols: [
					{ header: '/s/', words: ['rights', 'facts'], mark: '0.35' },
					{ header: '/z/', words: ['values', 'members'], mark: '0.35' },
					{ header: '/iz/', words: ['classes', 'judges'], mark: '0.30' }
				],
				reorderPrompt: '5) Reorder the following sentences to make a coherent paragraph:\na) Finally, every pupil signed the document as a promise of mutual respect.\nb) At the start of the year, our class decided to write a peace charter.\nc) Then, we discussed the main duties such as honesty and rejecting bullying.\nd) First, our teacher explained how fair rules create a safe classroom.',
				reorderAnswer: 'Order: b - d - c - a.',
				quizStem: 'Express past criticism correctly: "He spoke harshly to his classmate."',
				quizCorrect: 'He should not have spoken harshly to his classmate.',
				quizDistractors: [
					{
						text: 'He should not has spoke harshly to his classmate.',
						diagnosticFeedback: 'Always use "have" (never "has") and the Past Participle "spoken".'
					},
					{
						text: 'He should have spoken harshly to his classmate.',
						diagnosticFeedback: 'This praises harsh speech instead of criticizing it.'
					},
					{
						text: 'He should not speaking harshly to his classmate.',
						diagnosticFeedback: 'Use should not have + Past Participle for past criticism.'
					}
				],
				quizExplanation: 'العتاب على خطأ وقع في الماضي يُصاغ بـ: should not have + Past Participle (spoken).'
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			{ type: 'text', content: v.prefixPrompt, answer: v.prefixAnswer, mark: '1.5' },
			{ type: 'text', content: '2) Complete the following table with the missing verb, noun, or adjective:' },
			buildEnglishWordBuildingTableBlock(v.wbRows),
			{ type: 'text', content: '3) Express past regret or criticism by rewriting the sentences below:' },
			...v.grammarItems.map((g) => ({
				type: 'text' as const,
				content: g.q,
				answer: g.a,
				mark: g.mark
			})),
			{ type: 'text', content: v.phonologyPrompt },
			buildEnglishPhonologyTableBlock({ columns: v.phonologyCols }),
			{ type: 'text', content: v.reorderPrompt, answer: v.reorderAnswer, mark: '1.0' }
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
				questionTextAr: 'اختر الإجابة الصحيحة:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.quizExplanation
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — B. Text Exploration',
				points: 7,
				instruction: 'Complete the following vocabulary, grammar, phonology, and discourse tasks.',
				content
			},
			hints: [
				'احفظ القواعد الصوتية للسوابق: im- قبل p/m، و il- قبل l، و ir- قبل r.',
				'في should have + PP تذكر دائما تصريف اسم المفعول (spoken, broken).',
				'في ترتيب الجمل استعن بالروابط الزمنية (First, Next/Then, Finally / As a result).'
			],
			solutionStepsAr: [
				'إضافة السوابق النافية المناسبة لتشكيل الأضداد.',
				'ملء جدول الاشتقاق وتصريف صيغ الندم والعتاب في الماضي.',
				'تصنيف النهاية (-s) ثم ترتيب الجمل لتكوين فقرة متماسكة.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [5] Written Expression (5 pts) — Peace Charter, Anti-Bullying Speech & Children's Rights
export const tpl2asSciT1WrittenPeaceCharter: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2as_sci_t1_written_peace_charter',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'written_expression',
	titleAr: 'التعبير الكتابي (5 نقاط): كتابة ميثاق سلام مدرسي أو كلمة حول الحوار وحقوق الطفل',
	curriculumLessonId: 'eng_lesson_2as_sci_t1_peace_charter_writing',
	defaultPoints: 5,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				topicOnePrompt:
					'Your secondary school is organizing a "Peace and Anti-Bullying Week". Write a short School Peace Charter (80 to 120 words) to promote respect, fairness, and calm dialogue among students.',
				topicOneNotes: [
					'respect teachers, staff, and all classmates regardless of differences',
					'must not bully, mock, or spread rumours online or in class',
					'solve misunderstandings through calm dialogue and peer mediation',
					'help new or shy pupils feel safe and welcome',
					'result: build a peaceful school where everyone can succeed'
				],
				topicTwoPrompt:
					'Write a short paragraph (80 to 120 words) explaining how Islamic values of justice, forgiveness, and brotherhood help prevent conflicts in society.',
				modelAnswer:
					'Our School Peace Charter\nTo make our secondary school a safe and inspiring place for learning, all students must follow clear principles of respect and fairness. First, every pupil must treat teachers, staff, and classmates politely regardless of any differences. Second, students must not practise bullying, verbal mockery, or online rumours, because such behaviour harms trust and dignity. Moreover, whenever a disagreement arises, pupils should choose calm dialogue or ask the school mediation club for help instead of anger. Finally, we ought to support shy or new classmates so that no one feels isolated. By respecting this charter together, we will be able to build a peaceful school where every learner succeeds.',
				rubricSummary: 'Relevance to topic (1.5) | Coherence & connectors (1.0) | Correct modals & grammar (1.5) | Spelling, punctuation & layout (1.0).',
				quizStem: 'Which modal pair is most essential when drafting duties and prohibitions in a School Peace Charter?',
				quizCorrect: 'must (for duties) and must not (for prohibitions like bullying)',
				quizDistractors: [
					{
						text: 'was able to and did not have to',
						diagnosticFeedback: 'A charter states present/standing duties and prohibitions, not past ability.'
					},
					{
						text: 'should have and could have',
						diagnosticFeedback: 'These express past regret, not forward-looking charter rules.'
					},
					{
						text: 'might have and used to',
						diagnosticFeedback: 'These refer to past habits or guesses, not clear school rules.'
					}
				],
				quizExplanation: 'في صياغة ميثاق السلام المدرسي نستعمل must للواجبات و must not للممنوعات كالتنمر، مع should للتوجيه.'
			},
			{
				topicOnePrompt:
					'Write a short speech (80 to 120 words) to your classmates explaining why protecting children\'s right to education and safety is essential for world peace.',
				topicOneNotes: [
					'every child has the right to safe schools, healthcare, and dignity',
					'governments and communities must stop child labour and exploitation',
					'education teaches tolerance, critical thinking, and peaceful dialogue',
					'educated youth can fight poverty and build fair societies',
					'conclude with a call to value learning and solidarity'
				],
				topicTwoPrompt:
					'Write a paragraph (80 to 120 words) about a disagreement you witnessed or read about that was solved wisely through dialogue and apology.',
				modelAnswer:
					'Dear classmates,\nLasting peace in our world begins with protecting every child\'s right to safety and education. Every boy and girl has the fundamental right to attend a secure school, receive healthcare, and grow up with dignity. Therefore, governments and local communities must forbid child labour and defend young people from any form of exploitation. Education is not only about memorizing lessons; it also teaches fairness, dialogue, and mutual respect. When children are able to learn in peace, they become skilled citizens who can fight poverty and resolve disputes wisely. Let us value our opportunity to study and support every initiative that brings hope and knowledge to needy children.',
				rubricSummary: 'Relevance & speech tone (1.5) | Organization & cohesion (1.0) | Grammar & vocabulary accuracy (1.5) | Mechanics & presentation (1.0).',
				quizStem: 'When writing Topic One (Guided) in the 2AS Written Expression section, what is the best way to use the given notes?',
				quizCorrect: 'Expand all the notes into full, connected sentences using appropriate modals and linkers',
				quizDistractors: [
					{
						text: 'Copy the bullet points exactly without adding verbs or connectors',
						diagnosticFeedback: 'Copying raw notes loses marks for coherence and grammatical accuracy.'
					},
					{
						text: 'Answer both Topic One and Topic Two on the same sheet',
						diagnosticFeedback: 'The instruction clearly asks you to choose ONE topic only.'
					},
					{
						text: 'Ignore the given notes completely and write about another unit',
						diagnosticFeedback: 'Ignoring the prompt causes a major loss of relevance marks.'
					}
				],
				quizExplanation: 'استثمار جميع الملاحظات المعطاة وتحويلها إلى جمل تامة ومترابطة بالروابط هو مفتاح العلامة الكاملة.'
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			buildEnglishWrittenExpressionBlock({
				topicOnePrompt: v.topicOnePrompt,
				topicOneNotes: v.topicOneNotes,
				topicTwoPrompt: v.topicTwoPrompt,
				modelAnswer: v.modelAnswer,
				rubricSummary: v.rubricSummary,
				mark: '5.0'
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
				questionTextAr: 'اختر الجواب المنهجي الصحيح للتعبير الكتابي:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.quizExplanation
			},
			sujetExercise: {
				customTitle: 'PART TWO: Written Expression',
				points: 5,
				instruction: 'Choose ONE of the following topics and write a well-organized paragraph (80 to 120 words).',
				content
			},
			hints: [
				'اختر موضوعا واحدا فقط (Topic One أو Topic Two) والتزم بمطلوبه.',
				'وظف أفعال الوحدة (must, must not, should, will be able to) وروابط الترتيب (First, Moreover, Finally).',
				'راجع الإملاء وعلامات الترقيم والحجم (80 إلى 120 كلمة) قبل التسليم.'
			],
			solutionStepsAr: [
				'قراءة التعليمة والملاحظات وتحديد نوع النص المطلوب (ميثاق أو كلمة أو فقرة).',
				'توسيع الملاحظات إلى جمل كاملة مترابطة مع مقدمة وخاتمة.',
				'مراجعة سلامة القواعد والترقيم ومطابقة معايير التقويم (5 نقاط).'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

export const TEMPLATES_2AS_SCI_T1: EnglishParameterizedTemplate[] = [
	tpl2asSciT1CompPeaceReconciliation,
	tpl2asSciT1CompHumanRightsJustice,
	tpl2asSciT1ExpModalsAbilityObligation,
	tpl2asSciT1ExpCriticismPrefixesPhonology,
	tpl2asSciT1WrittenPeaceCharter
];
