import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildEnglishPassageBlock,
	buildEnglishPhonologyTableBlock,
	buildEnglishWordBuildingTableBlock,
	buildEnglishWrittenExpressionBlock
} from '../../english-helpers';
import type {
	Difficulty,
	EnglishGeneratedExerciseInstance,
	EnglishParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';

/**
 * 3AS BAC Literature & Philosophy (آداب وفلسفة — yearSubjectId: 770, coeff 3, 2h30, 7+8+5=20)
 * Parameterized Exam & Quiz Templates — Trimester 3: Unit 3 "Schools: Different and Alike" & BAC Revision (5 templates)
 * Roles: 2 comprehension (7 pts) + 2 text_exploration (8 pts) + 1 written_expression (5 pts)
 */
export const TEMPLATES_3AS_LP_T3: EnglishParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (7 pts): Algerian Educational Heritage (Ben Badis, El Ibrahimi, El Mili) & Modern Schools
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_lp_t3_comp_algerian_schools_heritage',
		grade: '3as_lp',
		trimesterId: 't3',
		domain: 'reading_comprehension',
		titleAr: 'فهم النص (7 نقاط): تراث التعليم في الجزائر (مدارس جمعية العلماء المسلمين والمدرسة الحديثة)',
		curriculumLessonId: 'eng_lesson_3as_lp_t3_quantifiers_comparison',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'The Reformist Schools of the Association of Algerian Muslim Scholars',
					source: 'Adapted from Algerian Educational History',
					paragraphs: [
						'Long before independence in 1962, Algerian scholars understood that ignorance was the gravest threat to national dignity. In 1931, Imam Abdelhamid Ben Badis, Sheikh Mohamed Bachir El Ibrahimi, Sheikh Moubarek El Mili, and their companions established the Association of Algerian Muslim Scholars to revive authentic learning across [[the country]].',
						'Despite having few financial resources, local citizens donated land and funds to build free independent schools in towns and mountain villages alike. Unlike colonial classrooms that marginalized Arabic and Islamic identity, [[these schools]] taught the Quran, Arabic literature, Algerian history, mathematics, and natural sciences side by side.',
						'Imam Ben Badis constantly reminded young pupils that true education combines sound faith, noble character, and scientific competence. Unless a nation invests sincerely in educating its youth, it cannot protect its sovereignty or build a prosperous future.'
					],
					glossary: [
						{ term: 'marginalized', meaning: 'pushed aside and treated as unimportant' },
						{ term: 'sovereignty', meaning: 'full independence and self-governance' }
					],
					tfItems: [
						{ q: 'The Association of Algerian Muslim Scholars was founded in 1931.', a: 'True', mark: '0.5' },
						{ q: 'The reformist schools only taught poetry and ignored mathematics and science.', a: 'False', c: 'They taught the Quran, Arabic literature, history, mathematics, and natural sciences side by side.', mark: '0.5' },
						{ q: 'Local citizens helped finance and build these independent schools.', a: 'True', mark: '0.5' },
						{ q: 'Imam Ben Badis believed true education unites faith, character, and scientific competence.', a: 'True', mark: '0.5' }
					],
					whQuestions: [
						{ q: 'a) Name three prominent scholars who led the Association mentioned in paragraph 1.', a: 'Imam Abdelhamid Ben Badis, Sheikh Mohamed Bachir El Ibrahimi, and Sheikh Moubarek El Mili.', mark: '1' },
						{ q: 'b) How did the reformist schools differ from colonial classrooms?', a: 'Unlike colonial classrooms that marginalized Arabic and Islamic identity, the reformist schools taught Quran, Arabic, Algerian history, mathematics, and sciences.', mark: '1' },
						{ q: 'c) According to paragraph 3, what happens if a nation fails to invest in educating its youth?', a: 'It cannot protect its sovereignty or build a prosperous future.', mark: '1' }
					],
					refQuestion: 'a) "the country" (§1)   b) "these schools" (§2)',
					refAnswer: 'a) "the country" refers to Algeria.   b) "these schools" refers to the free independent schools of the Association of Algerian Muslim Scholars.',
					bestTitle: 'Algeria Pioneer Reformist Schools and Educational Awakening',
					titleOptions: [
						'Algeria Pioneer Reformist Schools and Educational Awakening',
						'Modern Online Gaming Platforms',
						'A Comparison of Ancient Sea Ships'
					],
					easyQ: 'In what year was the Association of Algerian Muslim Scholars founded?',
					easyAns: '1931',
					easyWrong: ['1962', '1830', '1954'],
					medQ: 'What does "these schools" in paragraph 2 refer to?',
					medAns: 'The free independent schools built by the Association and local citizens',
					medWrong: ['Colonial classrooms', 'European universities', 'Mountain roads'],
					hardQ: 'What three pillars of true education did Imam Ben Badis emphasize in paragraph 3?',
					hardAns: 'Sound faith, noble character, and scientific competence',
					hardWrong: [
						'Memorization without understanding, wealth, and luxury',
						'Ignoring Arabic in favour of foreign languages only',
						'Closing village schools to reduce costs'
					]
				},
				{
					title: 'Comparing School Systems Around the World',
					source: 'Adapted from Comparative Education Quarterly',
					paragraphs: [
						'Although education is universally recognized as a basic human right, school systems around the world are both different and alike. In Algeria, public schooling is completely free from primary school to university, whereas in several other nations higher education requires substantial tuition fees or student loans.',
						'School structures also vary in duration. Algerian children spend five years in primary school, four years in middle school ending with the BEM certificate, and three years in secondary school culminating in the Baccalaureate exam. Similarly, many international systems conclude secondary education with a national university-entrance examination, though [[their]] subject streams and daily timetables differ considerably.',
						'Nevertheless, top-performing systems share decisive common strengths: well-trained teachers, supportive families, quiet libraries, and clear moral discipline. Regardless of geography, [[they]] prove that quality instruction matters far more than expensive buildings.'
					],
					glossary: [
						{ term: 'tuition fees', meaning: 'money paid for formal instruction at a school or university' },
						{ term: 'culminating', meaning: 'reaching a final peak or concluding stage' }
					],
					tfItems: [
						{ q: 'Public education in Algeria is free from primary level through university.', a: 'True', mark: '0.5' },
						{ q: 'Algerian middle school lasts five years and ends with the Baccalaureate.', a: 'False', c: 'Primary lasts five years, middle school lasts four years ending with the BEM, and secondary lasts three years ending with the BAC.', mark: '0.5' },
						{ q: 'Many countries also use a national exam at the end of secondary school.', a: 'True', mark: '0.5' },
						{ q: 'Expensive buildings matter more than teacher quality according to paragraph 3.', a: 'False', c: 'Quality instruction matters far more than expensive buildings.', mark: '0.5' }
					],
					whQuestions: [
						{ q: 'a) How does Algerian public higher education differ from several other nations?', a: 'It is completely free in Algeria, whereas several other nations charge substantial tuition fees or require student loans.', mark: '1' },
						{ q: 'b) Outline the three stages of Algerian schooling mentioned in paragraph 2.', a: 'Five years of primary school, four years of middle school (BEM), and three years of secondary school (Baccalaureate).', mark: '1' },
						{ q: 'c) List three common strengths shared by top-performing school systems.', a: 'Any three of: well-trained teachers, supportive families, quiet libraries, and clear moral discipline.', mark: '1' }
					],
					refQuestion: 'a) "their" (§2)   b) "they" (§3)',
					refAnswer: 'a) "their" refers to many international school systems.   b) "they" refers to top-performing school systems.',
					bestTitle: 'School Systems: Shared Values Amid Structural Differences',
					titleOptions: [
						'School Systems: Shared Values Amid Structural Differences',
						'Why Students Should Never Take Exams',
						'How to Design Concrete Bridges'
					],
					easyQ: 'How many years does secondary school last in Algeria according to paragraph 2?',
					easyAns: 'Three years',
					easyWrong: ['Five years', 'Four years', 'Six years'],
					medQ: 'What does "they" in paragraph 3 refer to?',
					medAns: 'Top-performing school systems',
					medWrong: ['Expensive buildings', 'Student loans', 'Daily timetables'],
					hardQ: 'What main conclusion does the author reach in paragraph 3?',
					hardAns: 'Well-trained teachers, family support, and discipline matter more than costly facilities',
					hardWrong: [
						'All countries must copy the exact same daily timetable',
						'Tuition fees always guarantee higher graduation rates',
						'National exams are unique to Algeria alone'
					]
				}
			];

			const chosen = rng.pick(pool);
			let finalAnswer: string;
			let quizQuestion: QuizQuestionPayload;
			if (difficulty === 'easy') {
				finalAnswer = chosen.easyAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.easyWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'ارجع إلى الأرقام والتواريخ الصريحة في النص.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Comprehension ("${chosen.title}"): ${chosen.easyQ}`,
					questionTextAr: 'اختر الجواب الصحيح من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `المعلومة الصحيحة في النص هي: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'تحقق من الاسم الجمع الذي يعود عليه الضمير في الفقرة.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Reference Check ("${chosen.title}"): ${chosen.medQ}`,
					questionTextAr: 'حدد مرجع الضمير بدقة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `المرجع الصحيح هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'اقرأ الفقرة الثالثة بتمعن لاستخلاص الفكرة الجوهرية.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Analytical Reading ("${chosen.title}"): ${chosen.hardQ}`,
					questionTextAr: 'استنتج الخلاصة التربوية من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الخلاصة التربوية الدقيقة هي: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART ONE: Reading — A) Comprehension',
				points: 7,
				instruction: 'Read the text carefully then do the following activities:',
				content: [
					buildEnglishPassageBlock({
						title: chosen.title,
						paragraphs: chosen.paragraphs,
						source: chosen.source,
						numberedParagraphs: true,
						glossary: chosen.glossary
					}),
					{
						type: 'multiple_choice',
						groups: [
							{
								header: '1. Choose the correct answer. The text is:',
								options: ['Expository (educational)', 'A commercial advert', 'A fictional tale'],
								correct: 'Expository (educational)',
								mark: '0.5'
							}
						]
					},
					{
						type: 'true_false',
						items: chosen.tfItems
					},
					{
						type: 'text',
						content: `3. Answer the following questions according to the text:\n${chosen.whQuestions.map((x) => x.q).join('\n')}`,
						answer: chosen.whQuestions.map((x) => `${x.q.slice(0, 2)} ${x.a}`).join('\n'),
						mark: '3'
					},
					{
						type: 'text',
						content: `4. What or who do the underlined words refer to?\n${chosen.refQuestion}`,
						answer: chosen.refAnswer,
						mark: '1'
					},
					{
						type: 'multiple_choice',
						groups: [
							{
								header: '5. Choose the most suitable title for the passage:',
								options: chosen.titleOptions,
								correct: chosen.bestTitle,
								mark: '0.5'
							}
						]
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't3',
				difficulty,
				domain: 'reading_comprehension',
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'انتبه لروابط المقارنة مثل Unlike و Whereas و Similarly لتحديد أوجه الشبه والاختلاف.',
					'دقق في الأرقام والسنوات التعليمية عند الإجابة عن True/False.',
					'اربط الضمير الإحالي بالاسم الأقرب الموافق له في المعنى والعدد.'
				],
				solutionStepsAr: [
					'تحديد نوع النص التفسيري التربوي (0.5 نقطة).',
					'تصنيف عبارات الصواب والخطأ مع التصحيح (2 نقطتان).',
					'الإجابة عن أسئلة الاستيعاب الثلاثة (3 نقاط).',
					'تحديد الإحالة والعنوان الأنسب (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. COMPREHENSION (7 pts): Preventing School Dropout & Vocational / Lifelong Learning
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_lp_t3_comp_education_world',
		grade: '3as_lp',
		trimesterId: 't3',
		domain: 'reading_comprehension',
		titleAr: 'فهم النص (7 نقاط): الحد من التسرب المدرسي والتكوين المهني والتعلم مدى الحياة',
		curriculumLessonId: 'eng_lesson_3as_lp_t3_conditionals_unless',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Preventing School Dropout Through Guidance and Vocational Pathways',
					source: 'Adapted from Modern Pedagogy Journal',
					paragraphs: [
						'Leaving school before earning a qualification remains a serious challenge for young people in many parts of the world. Educators explain that pupils rarely abandon [[their]] studies for a single reason; instead, academic difficulties, lack of family follow-up, and poor study habits often combine over time.',
						'If schools detect struggling learners early, teachers and counsellors can offer targeted tutoring before frustration turns into failure. Furthermore, vocational training institutes provide a respected practical alternative for adolescents who prefer hands-on professions such as carpentry, electronics, agriculture, or software maintenance.',
						'Experienced headmasters emphasize that every student possesses unique talents. When families encourage perseverance and society values both academic degrees and skilled trades, [[youngsters]] stay motivated and build dignified careers.'
					],
					glossary: [
						{ term: 'counsellors', meaning: 'trained advisors who guide students academically and personally' },
						{ term: 'hands-on', meaning: 'involving active practical work rather than theory alone' }
					],
					tfItems: [
						{ q: 'School dropout usually results from a combination of several factors rather than one alone.', a: 'True', mark: '0.5' },
						{ q: 'Early tutoring can help struggling learners before frustration leads to failure.', a: 'True', mark: '0.5' },
						{ q: 'Vocational training institutes are useless for pupils who prefer practical professions.', a: 'False', c: 'They provide a respected practical alternative for hands-on professions.', mark: '0.5' },
						{ q: 'Society should respect both university degrees and skilled trades.', a: 'True', mark: '0.5' }
					],
					whQuestions: [
						{ q: 'a) Mention two causes of school dropout cited in paragraph 1.', a: 'Any two of: academic difficulties, lack of family follow-up, and poor study habits.', mark: '1' },
						{ q: 'b) Give two examples of hands-on professions offered by vocational institutes.', a: 'Any two of: carpentry, electronics, agriculture, and software maintenance.', mark: '1' },
						{ q: 'c) How can families and society keep students motivated according to paragraph 3?', a: 'By encouraging perseverance and valuing both academic degrees and skilled trades.', mark: '1' }
					],
					refQuestion: 'a) "their" (§1)   b) "youngsters" (§3)',
					refAnswer: 'a) "their" refers to pupils.   b) "youngsters" refers to students / young people.',
					bestTitle: 'Tackling School Dropout With Early Guidance and Practical Skills',
					titleOptions: [
						'Tackling School Dropout With Early Guidance and Practical Skills',
						'Why Libraries Should Close Early',
						'The Discovery of Oil Fields'
					],
					easyQ: 'Who can offer targeted tutoring when struggling learners are detected early?',
					easyAns: 'Teachers and counsellors',
					easyWrong: ['Bank managers', 'Customs officers', 'Tour guides'],
					medQ: 'What does "their" in paragraph 1 refer to?',
					medAns: 'Pupils',
					medWrong: ['Educators', 'Vocational institutes', 'Skilled trades'],
					hardQ: 'What constructive perspective on vocational training does the author present?',
					hardAns: 'It is a dignified practical pathway that matches hands-on talents and prevents dropout',
					hardWrong: [
						'It should replace primary schooling completely',
						'It requires no guidance or perseverance',
						'It is inferior to leaving school with no qualification'
					]
				},
				{
					title: 'Digital Tools in the Classroom: Aid or Distraction?',
					source: 'Adapted from Educational Technology Insights',
					paragraphs: [
						'Over the past decade, digital tablets, interactive boards, and online encyclopaedias have transformed how lessons are delivered. When teachers integrate [[these tools]] thoughtfully, complex diagrams in science, history maps, and foreign-language pronunciation become far clearer to learners.',
						'Yet educators caution that technology cannot replace disciplined study or human mentorship. If students spend hours scrolling through unrelated notifications during revision, [[their]] concentration declines sharply and retention suffers.',
						'The wisest approach is balanced integration: using digital libraries for research and practice quizzes while preserving pen-and-paper writing, silent reading, and respectful classroom discussion. Technology serves education best when it remains a helpful servant rather than a master.'
					],
					glossary: [
						{ term: 'mentorship', meaning: 'personal guidance and wise support from an experienced teacher' },
						{ term: 'retention', meaning: 'the ability to remember and keep learned knowledge' }
					],
					tfItems: [
						{ q: 'Interactive boards and digital tools can clarify diagrams and pronunciation.', a: 'True', mark: '0.5' },
						{ q: 'Technology can completely replace teachers and disciplined study.', a: 'False', c: 'Technology cannot replace disciplined study or human mentorship.', mark: '0.5' },
						{ q: 'Unrelated phone notifications during revision harm student concentration.', a: 'True', mark: '0.5' },
						{ q: 'The author recommends balancing digital resources with pen-and-paper study and reading.', a: 'True', mark: '0.5' }
					],
					whQuestions: [
						{ q: 'a) How do digital tools help learners when used thoughtfully?', a: 'They make complex diagrams, history maps, and foreign-language pronunciation clearer.', mark: '1' },
						{ q: 'b) What negative effect do unrelated notifications cause during revision?', a: 'Students concentration declines sharply and retention suffers.', mark: '1' },
						{ q: 'c) Explain the author final metaphor: "a helpful servant rather than a master".', a: 'Students should control and use technology purposefully for learning instead of letting screens distract or control them.', mark: '1' }
					],
					refQuestion: 'a) "these tools" (§1)   b) "their" (§2)',
					refAnswer: 'a) "these tools" refers to digital tablets, interactive boards, and online encyclopaedias.   b) "their" refers to students.',
					bestTitle: 'Using Technology Wisely in Modern Classrooms',
					titleOptions: [
						'Using Technology Wisely in Modern Classrooms',
						'Why All Textbooks Should Be Burned',
						'The History of Steam Locomotives'
					],
					easyQ: 'What happens to student concentration when they scroll through unrelated notifications?',
					easyAns: 'It declines sharply and retention suffers',
					easyWrong: [
						'It doubles immediately',
						'It replaces human mentorship',
						'It improves handwriting speed'
					],
					medQ: 'What does "these tools" in paragraph 1 refer to?',
					medAns: 'Digital tablets, interactive boards, and online encyclopaedias',
					medWrong: ['Foreign languages', 'Silent reading sessions', 'Classroom discussions'],
					hardQ: 'What balanced pedagogical approach is advocated in paragraph 3?',
					hardAns: 'Combining purposeful digital practice with pen-and-paper writing, reading, and teacher guidance',
					hardWrong: [
						'Banning all digital encyclopaedias from schools forever',
						'Eliminating handwriting and teachers in favour of screens',
						'Allowing social notifications during class exams'
					]
				}
			];

			const chosen = rng.pick(pool);
			let finalAnswer: string;
			let quizQuestion: QuizQuestionPayload;
			if (difficulty === 'easy') {
				finalAnswer = chosen.easyAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.easyWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'ارجع إلى الفقرة الثانية للتحقق من الجواب الصريح.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Comprehension ("${chosen.title}"): ${chosen.easyQ}`,
					questionTextAr: 'اختر الجواب الصحيح من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصريح من النص: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'طابق الضمير مع المرجع الجمع الوارد قبله في النص.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Reference Check ("${chosen.title}"): ${chosen.medQ}`,
					questionTextAr: 'حدد المرجع الصحيح من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `المرجع الصحيح هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'راجع موقف الكاتب المتوازن في الفقرة الختامية.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Critical Reading ("${chosen.title}"): ${chosen.hardQ}`,
					questionTextAr: 'استنتج الموقف التربوي للكاتب:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الموقف الصحيح الذي يدافع عنه الكاتب هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART ONE: Reading — A) Comprehension',
				points: 7,
				instruction: 'Read the text carefully then do the following activities:',
				content: [
					buildEnglishPassageBlock({
						title: chosen.title,
						paragraphs: chosen.paragraphs,
						source: chosen.source,
						numberedParagraphs: true,
						glossary: chosen.glossary
					}),
					{
						type: 'multiple_choice',
						groups: [
							{
								header: '1. Choose the correct answer. The text is:',
								options: ['An educational article', 'A weather report', 'A historical biography'],
								correct: 'An educational article',
								mark: '0.5'
							}
						]
					},
					{
						type: 'true_false',
						items: chosen.tfItems
					},
					{
						type: 'text',
						content: `3. Answer the following questions according to the text:\n${chosen.whQuestions.map((x) => x.q).join('\n')}`,
						answer: chosen.whQuestions.map((x) => `${x.q.slice(0, 2)} ${x.a}`).join('\n'),
						mark: '3'
					},
					{
						type: 'text',
						content: `4. What or who do the underlined words refer to?\n${chosen.refQuestion}`,
						answer: chosen.refAnswer,
						mark: '1'
					},
					{
						type: 'multiple_choice',
						groups: [
							{
								header: '5. Choose the best title for the text:',
								options: chosen.titleOptions,
								correct: chosen.bestTitle,
								mark: '0.5'
							}
						]
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't3',
				difficulty,
				domain: 'reading_comprehension',
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'ابحث عن الأسباب في الفقرة الأولى والحلول في الفقرتين الثانية والثالثة.',
					'في أسئلة True/False لا تتسرع؛ اقرأ الجملة حتى كلمتها الأخيرة.',
					'استخدم أسلوبك الموجز والواضح في الإجابة عن أسئلة Wh-questions.'
				],
				solutionStepsAr: [
					'تحديد نوع المقال التربوي (0.5 نقطة).',
					'تصنيف الصواب والخطأ مع التصحيح (2 نقطتان).',
					'الإجابة المركزة عن الأسئلة الثلاثة (3 نقاط).',
					'تحديد الإحالة والعنوان المناسب (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. TEXT EXPLORATION (8 pts): Conditionals / Unless, Reported Speech & Silent Letters
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_lp_t3_exp_conditionals_reported',
		grade: '3as_lp',
		trimesterId: 't3',
		domain: 'grammar_syntax',
		titleAr: 'البناء اللغوي (8 نقاط): الشرط و Unless، الكلام المنقول، والحروف الصامتة',
		curriculumLessonId: 'eng_lesson_3as_lp_t3_reported_speech',
		defaultPoints: 8,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					lexisPrompt: 'Find synonyms for: a) pupils = ..........   b) obligatory = ..........   c) succeed = ..........',
					lexisAnswer: 'a) students / learners   b) compulsory / mandatory   c) pass / excel',
					morphRows: [
						{ verb: { given: true, value: 'to educate' }, noun: { value: 'education', mark: '0.25' }, adjective: { value: 'educational', mark: '0.25' } },
						{ verb: { value: 'to graduate', mark: '0.25' }, noun: { given: true, value: 'graduation' }, adjective: { value: 'graduated', mark: '0.25' } },
						{ verb: { value: 'to instruct', mark: '0.25' }, noun: { value: 'instruction', mark: '0.25' }, adjective: { given: true, value: 'instructive' } }
					],
					rewrites: [
						{
							prompt: '1) a) If a student does not revise daily, he will struggle in the BAC exam.\n   b) Unless .......................................................................',
							answer: '1) b) Unless a student revises daily, he will struggle in the BAC exam.'
						},
						{
							prompt: '2) a) The headmaster said, "Our pupils have achieved remarkable results."\n   b) The headmaster said that .....................................................',
							answer: '2) b) The headmaster said that their pupils had achieved remarkable results.'
						},
						{
							prompt: '3) a) The teacher asked me, "Did you read the biographies of Ben Badis?"\n   b) The teacher asked me .........................................................',
							answer: '3) b) The teacher asked me if I had read the biographies of Ben Badis.'
						}
					],
					silentWords: 'knowledge - school - doubt - listen',
					silentCols: [
						{ header: 'Silent k', words: ['knowledge'], mark: '0.25' },
						{ header: 'Silent h', words: ['school'], mark: '0.25' },
						{ header: 'Silent b', words: ['doubt'], mark: '0.25' },
						{ header: 'Silent t', words: ['listen'], mark: '0.25' }
					],
					clozeWords: 'knowledge - teachers - compulsory - schools',
					clozePrompt: 'In Algeria, education is free and (1) .......... until the age of sixteen. Dedicated (2) .......... guide pupils inside (3) .......... to build useful (4) .......... .',
					clozeAnswer: '1) compulsory   2) teachers   3) schools   4) knowledge',
					easyQ: 'Which letter is silent in the word "knowledge"?',
					easyAns: 'k',
					easyWrong: ['n', 'l', 'd (only)'],
					medQ: 'Rewrite with Unless: If a student does not revise daily, he will struggle.',
					medAns: 'Unless a student revises daily, he will struggle.',
					medWrong: [
						'Unless a student does not revise daily, he will struggle.',
						'Unless a student revise daily, he will struggle.',
						'Unless a student revises daily, he will not struggle.'
					],
					hardQ: 'Report accurately: The teacher asked me, "Did you read the biographies?"',
					hardAns: 'The teacher asked me if I had read the biographies.',
					hardWrong: [
						'The teacher asked me did I read the biographies.',
						'The teacher asked me if did I read the biographies.',
						'The teacher asked me if I read the biographies yesterday.'
					]
				},
				{
					lexisPrompt: 'Give opposites keeping the same root: literate / regular / discipline / formal',
					lexisAnswer: 'illiterate / irregular / indiscipline / informal',
					morphRows: [
						{ verb: { given: true, value: 'to qualify' }, noun: { value: 'qualification', mark: '0.25' }, adjective: { value: 'qualified', mark: '0.25' } },
						{ verb: { value: 'to motivate', mark: '0.25' }, noun: { given: true, value: 'motivation' }, adjective: { value: 'motivated', mark: '0.25' } },
						{ verb: { value: 'to succeed', mark: '0.25' }, noun: { value: 'success', mark: '0.25' }, adjective: { given: true, value: 'successful' } }
					],
					rewrites: [
						{
							prompt: '1) a) If schools invest in libraries, reading habits will flourish.\n   b) Unless schools ...............................................................',
							answer: '1) b) Unless schools invest in libraries, reading habits will not flourish.'
						},
						{
							prompt: '2) a) The advisor said to us, "Prepare a realistic revision timetable."\n   b) The advisor advised us .......................................................',
							answer: '2) b) The advisor advised us to prepare a realistic revision timetable.'
						},
						{
							prompt: '3) a) She asked him, "Where will you study next autumn?"\n   b) She asked him ................................................................',
							answer: '3) b) She asked him where he would study the following autumn.'
						}
					],
					silentWords: 'write - honest - psychology - climb',
					silentCols: [
						{ header: 'Silent w', words: ['write'], mark: '0.25' },
						{ header: 'Silent h', words: ['honest'], mark: '0.25' },
						{ header: 'Silent p', words: ['psychology'], mark: '0.25' },
						{ header: 'Silent b', words: ['climb'], mark: '0.25' }
					],
					clozeWords: 'revise - libraries - discipline - succeed',
					clozePrompt: 'Students who (1) .......... regularly and respect classroom (2) .......... usually (3) .......... . Quiet public (4) .......... also support their progress.',
					clozeAnswer: '1) revise   2) discipline   3) succeed   4) libraries',
					easyQ: 'Which letter is silent in the word "psychology"?',
					easyAns: 'p',
					easyWrong: ['s', 'c', 'g'],
					medQ: 'Report the advice: The advisor said to us, "Prepare a realistic timetable."',
					medAns: 'The advisor advised us to prepare a realistic timetable.',
					medWrong: [
						'The advisor advised us prepare a realistic timetable.',
						'The advisor advised us preparing a realistic timetable.',
						'The advisor advised us that we prepared a timetable.'
					],
					hardQ: 'Report the Wh-question: She asked him, "Where will you study next autumn?"',
					hardAns: 'She asked him where he would study the following autumn.',
					hardWrong: [
						'She asked him where would he study next autumn.',
						'She asked him where he will study the following autumn.',
						'She asked him if where he would study the following autumn.'
					]
				}
			];

			const chosen = rng.pick(pool);
			let finalAnswer: string;
			let quizQuestion: QuizQuestionPayload;
			if (difficulty === 'easy') {
				finalAnswer = chosen.easyAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.easyWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'راجع قواعد الحروف الصامتة: kn-، wr-، ps-، -bt، sch-.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'حدد الحرف الصامت بدقة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الحرف الصامت هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'انتبه لقاعدة Unless ولصيغة advised + Object + to + Stem.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر إعادة الكتابة النحوية الصحيحة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجملة الصحيحة هي: ${finalAnswer}`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'في السؤال المنقول نحذف do/did ونعيد ترتيب الجملة إلى الفاعل قبل الفعل مع إرجاع الزمن.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'اختر تحويل السؤال المنقول الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحويل السليم للسؤال المنقول هو: ${finalAnswer}`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 8,
				instruction: 'Do the following language exploration activities carefully (8 pts — BAC LP):',
				content: [
					{
						type: 'text',
						content: `1. ${chosen.lexisPrompt}`,
						answer: chosen.lexisAnswer,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '2. Complete the following word-building chart:'
					},
					buildEnglishWordBuildingTableBlock(chosen.morphRows),
					{
						type: 'text',
						content: `3. Rewrite sentence (b) so that it means the same as sentence (a):\n${chosen.rewrites.map((r) => r.prompt).join('\n')}`,
						answer: chosen.rewrites.map((r) => r.answer).join('\n'),
						mark: '3'
					},
					{
						type: 'text',
						content: `4. Classify the following words according to their silent letter: (${chosen.silentWords})`
					},
					buildEnglishPhonologyTableBlock({ columns: chosen.silentCols }),
					{
						type: 'text',
						content: `5. Fill in the gaps with words from the list: (${chosen.clozeWords})\n${chosen.clozePrompt}`,
						answer: chosen.clozeAnswer,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't3',
				difficulty,
				domain: 'grammar_syntax',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكر مع Unless حذف does not مع إعادة -s للفعل عند المفرد الغائب.',
					'في نقل الأسئلة (Reported Questions) لا نترك علامة الاستفهام ولا نقدم الفعل المساعد على الفاعل.',
					'راجع أشهر الحروف الصامتة: kn-, wr-, -bt, -sten, sch-, ps-.'
				],
				solutionStepsAr: [
					'إيجاد المرادفات أو الأضداد بدقة (1.5 نقطة).',
					'إكمال جدول الاشتقاق الثلاثي (1.5 نقطة).',
					'إعادة الكتابة في الشرط والكلام المنقول (3 نقاط).',
					'تصنيف الحروف الصامتة وإكمال فقرة الفراغات (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. TEXT EXPLORATION (8 pts): Quantifiers, School Comparison & Full BAC LP Review
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_lp_t3_exp_quantifiers_bac_review',
		grade: '3as_lp',
		trimesterId: 't3',
		domain: 'discourse_cohesion',
		titleAr: 'البناء اللغوي الشامل (8 نقاط): محددات الكمية والمقارنة ومراجعة بكالوريا آداب وفلسفة',
		curriculumLessonId: 'eng_lesson_3as_lp_t3_quantifiers_comparison',
		defaultPoints: 8,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					lexisPrompt: 'Classify the following nouns into Countable vs Uncountable: homework / schools / advice / libraries / knowledge / scholarships',
					lexisAnswer: 'Countable: schools, libraries, scholarships   |   Uncountable: homework, advice, knowledge',
					morphRows: [
						{ verb: { given: true, value: 'to compare' }, noun: { value: 'comparison', mark: '0.25' }, adjective: { value: 'comparative', mark: '0.25' } },
						{ verb: { value: 'to innovate', mark: '0.25' }, noun: { given: true, value: 'innovation' }, adjective: { value: 'innovative', mark: '0.25' } },
						{ verb: { value: 'to differ', mark: '0.25' }, noun: { value: 'difference', mark: '0.25' }, adjective: { given: true, value: 'different' } }
					],
					rewrites: [
						{
							prompt: '1) a) Combine with (unlike): Private colleges charge fees. State universities in Algeria are free.',
							answer: '1) b) Unlike private colleges, state universities in Algeria are free.'
						},
						{
							prompt: '2) a) Combine with (whereas): Primary education lasts five years. Middle education lasts four years.',
							answer: '2) b) Primary education lasts five years, whereas middle education lasts four years.'
						},
						{
							prompt: '3) a) If he had revised past BAC papers, he (earn) a higher grade. (Put the verb in the right form)',
							answer: '3) b) If he had revised past BAC papers, he would have earned a higher grade.'
						}
					],
					phonWords: 'schools - scholarships - colleges - exams',
					phonCols: [
						{ header: '/s/', words: ['scholarships'], mark: '0.25' },
						{ header: '/z/', words: ['schools', 'exams'], mark: '0.5' },
						{ header: '/iz/', words: ['colleges'], mark: '0.25' }
					],
					clozeWords: 'much - many - similar - whereas',
					clozePrompt: 'Students need (1) .......... patience and (2) .......... practice exercises. Our exam is (3) .......... to international finals, (4) .......... its subjects reflect our heritage.',
					clozeAnswer: '1) much   2) many   3) similar   4) whereas',
					easyQ: 'Which noun is UNCOUNTABLE in English and takes "much" instead of "many"?',
					easyAns: 'advice',
					easyWrong: ['schools', 'libraries', 'scholarships'],
					medQ: 'Choose the right connector: .......... private colleges, public universities in Algeria are free.',
					medAns: 'Unlike',
					medWrong: ['Whereas', 'Although', 'Because'],
					hardQ: 'Complete Conditional Type 3: If he had revised past BAC papers, he .......... a higher grade.',
					hardAns: 'would have earned',
					hardWrong: ['would earn', 'will earn', 'had earned']
				},
				{
					lexisPrompt: 'Choose the correct quantifier: (many / much) knowledge | (few / little) patience | (many / much) pupils | (a few / a little) dictionaries',
					lexisAnswer: 'much knowledge | little patience | many pupils | a few dictionaries',
					morphRows: [
						{ verb: { given: true, value: 'to succeed' }, noun: { value: 'success', mark: '0.25' }, adjective: { value: 'successful', mark: '0.25' } },
						{ verb: { value: 'to improve', mark: '0.25' }, noun: { given: true, value: 'improvement' }, adjective: { value: 'improved', mark: '0.25' } },
						{ verb: { value: 'to specialize', mark: '0.25' }, noun: { value: 'specialization', mark: '0.25' }, adjective: { given: true, value: 'specialized' } }
					],
					rewrites: [
						{
							prompt: '1) a) Both Sheikh Ben Badis and Sheikh El Ibrahimi built schools. (Rewrite with: similar to)\n   b) Sheikh Ben Badis educational mission was .....................................',
							answer: '1) b) Sheikh Ben Badis educational mission was similar to Sheikh El Ibrahimi mission.'
						},
						{
							prompt: '2) a) If schools (have) larger science labs, pupils (conduct) more experiments. (Type 2)',
							answer: '2) b) If schools had larger science labs, pupils would conduct more experiments.'
						},
						{
							prompt: '3) a) Although resources were scarce, the reformist teachers inspired a whole generation.\n   b) Despite ......................................................................',
							answer: '3) b) Despite the scarcity of resources (OR Despite scarce resources), the reformist teachers inspired a whole generation.'
						}
					],
					phonWords: 'educated - revised - finished - guided',
					phonCols: [
						{ header: '/t/', words: ['finished'], mark: '0.25' },
						{ header: '/d/', words: ['revised'], mark: '0.25' },
						{ header: '/id/', words: ['educated', 'guided'], mark: '0.5' }
					],
					clozeWords: 'few - little - unlike - both',
					clozePrompt: '(1) .......... rural and urban pupils deserve quality books. Even with (2) .......... funding and (3) .......... facilities, dedicated teachers succeed, (4) .......... careless learners.',
					clozeAnswer: '1) Both   2) little   3) few   4) unlike',
					easyQ: 'Which quantifier correctly modifies the uncountable noun "patience"?',
					easyAns: 'little (or much)',
					easyWrong: ['many', 'few', 'a few'],
					medQ: 'Complete Conditional Type 2: If schools .......... larger labs, pupils would conduct more experiments.',
					medAns: 'had',
					medWrong: ['have', 'will have', 'had had'],
					hardQ: 'How is final "-ed" pronounced in the verb "guided"?',
					hardAns: '/id/',
					hardWrong: ['/t/', '/d/', 'silent']
				}
			];

			const chosen = rng.pick(pool);
			let finalAnswer: string;
			let quizQuestion: QuizQuestionPayload;
			if (difficulty === 'easy') {
				finalAnswer = chosen.easyAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.easyWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'تذكر أن advice و homework و knowledge و patience أسماء غير معدودة.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر الجواب الصحيح في محددات الكمية:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة الصحيحة هي: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'راجع الفرق بين Unlike (+ اسم) و Whereas (+ جملة)، وأزمنة الشرط من النوع الثاني.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر الأداة أو الصيغة النحوية السليمة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الصواب النحوي هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'راجع قاعدة الشرط من النوع الثالث (had + V3 ثم would have + V3) وقواعد النطق.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'اختر الجواب الدقيق لمراجعة البكالوريا:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 8,
				instruction: 'Do the following comprehensive BAC LP language review activities (8 pts):',
				content: [
					{
						type: 'text',
						content: `1. ${chosen.lexisPrompt}`,
						answer: chosen.lexisAnswer,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '2. Complete the following word-building table:'
					},
					buildEnglishWordBuildingTableBlock(chosen.morphRows),
					{
						type: 'text',
						content: `3. Combine or complete the following sentences:\n${chosen.rewrites.map((r) => r.prompt).join('\n')}`,
						answer: chosen.rewrites.map((r) => r.answer).join('\n'),
						mark: '3'
					},
					{
						type: 'text',
						content: `4. Classify the following words according to their final sound: (${chosen.phonWords})`
					},
					buildEnglishPhonologyTableBlock({ columns: chosen.phonCols }),
					{
						type: 'text',
						content: `5. Fill in the gaps with words from the list: (${chosen.clozeWords})\n${chosen.clozePrompt}`,
						answer: chosen.clozeAnswer,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't3',
				difficulty,
				domain: 'discourse_cohesion',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'تحقق أولاً هل الاسم معدود أم غير معدود قبل اختيار many/few أو much/little.',
					'Unlike تتبع باسم، بينما Whereas تتبع بجملة كاملة بفاعل وفعل.',
					'راجع أزمنة Conditionals 1, 2, 3 وقواعد Final -ed / -s بدقة.'
				],
				solutionStepsAr: [
					'التصنيف السليم للأسماء المعدودة وغير المعدودة (1.5 نقطة).',
					'إكمال جدول الاشتقاق الثلاثي (1.5 نقطة).',
					'إنجاز تحويلات المقارنة والشرط والاستدراك (3 نقاط).',
					'حل جدول الصوتيات وملء الفراغات (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. WRITTEN EXPRESSION (5 pts — Integration): Education, Schools & Algerian Scholars
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_lp_t3_we_education_bac_essay',
		grade: '3as_lp',
		trimesterId: 't3',
		domain: 'written_expression',
		titleAr: 'التعبير الكتابي (5 نقاط): تطوير المدرسة الجزائرية والحد من التسرب وتكريم تراث العلماء',
		curriculumLessonId: 'eng_lesson_3as_lp_t3_bac_lp_methodology',
		defaultPoints: 5,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					topicOnePrompt:
						'Using the following notes, write a composition of about 80 to 120 words on how to improve school performance and reduce school dropout in Algeria.',
					topicOneNotes: [
						'Equip schools with rich libraries, modern labs, and calm classrooms',
						'Detect struggling pupils early and provide supportive remedial classes',
						'Strengthen cooperation between parents and teachers',
						'Promote vocational training alongside university studies so every talent thrives'
					],
					topicTwoPrompt:
						'Write a composition of about 80 to 120 words paying tribute to the educational mission of Imam Abdelhamid Ben Badis, Sheikh Mohamed Bachir El Ibrahimi, and the Association of Algerian Muslim Scholars.',
					modelAnswer:
						'Reducing school dropout and improving educational quality are vital priorities for building a prosperous nation. First, schools should be equipped with rich libraries, functional laboratories, and calm classrooms that inspire curiosity. Moreover, teachers and counsellors need to detect struggling pupils early and offer supportive remedial classes before small gaps become major failures. Equally important is regular cooperation between parents and educators to encourage disciplined study habits at home. Finally, society must value vocational training alongside university degrees so that every learner can discover a dignified career. In conclusion, unless families, schools, and communities work hand in hand, we cannot unlock the full potential of our youth.',
					easyQ: 'What is the total mark allocated to Written Expression in BAC 3AS LP?',
					easyAns: '5 points (out of 20)',
					easyWrong: ['6 points', '8 points', '3 points'],
					medQ: 'Which conditional sentence fits naturally into the conclusion of this education essay?',
					medAns: 'Unless families and schools cooperate, we cannot unlock the full potential of our youth.',
					medWrong: [
						'Unless families and schools do not cooperate, we cannot unlock potential.',
						'Unless families will cooperate, we cannot unlock potential.',
						'If families cooperated, we will unlock potential.'
					],
					hardQ: 'Which quality earns full marks on "Semantic Coherence" in a BAC LP essay?',
					hardAns: 'Logical progression of ideas connected smoothly with varied linkers and clear paragraphing',
					hardWrong: [
						'Writing one long unpunctuated sentence without linkers',
						'Listing bullet notes without verbs or transitions',
						'Switching suddenly to an unrelated topic in paragraph 2'
					]
				},
				{
					topicOnePrompt:
						'Using the following notes, write an article of about 80 to 120 words on the ideal balance between traditional study methods and modern digital tools for BAC candidates.',
					topicOneNotes: [
						'Digital tools clarify lessons, offer interactive quizzes, and save research time',
						'Overuse of screens and notifications weakens concentration and memory',
						'Pen-and-paper summaries, silent reading, and timed mock exams build deep mastery',
						'Advice: schedule screen-free revision hours and rely on trusted educational sources'
					],
					topicTwoPrompt:
						'Write a composition of about 80 to 120 words comparing two educational pathways (general secondary schooling vs vocational training) and explaining how both serve society.',
					modelAnswer:
						'Balancing Digital Tools and Disciplined Revision\nModern digital tools offer BAC candidates valuable advantages, yet they must be used with wisdom and self-discipline. On the one hand, reliable online lessons, interactive quizzes, and digital dictionaries help learners clarify difficult grammar points quickly. On the other hand, constant phone notifications and aimless browsing severely weaken concentration and exam readiness. Therefore, successful students combine helpful digital resources with proven traditional habits such as pen-and-paper summarizing, careful reading, and timed practice exams. To sum up, technology becomes a powerful ally for BAC success only when learners schedule screen-free study hours and stay focused on clear goals.',
					easyQ: 'Which contrast pair is ideal for presenting advantages then drawbacks in an article?',
					easyAns: 'On the one hand, ... On the other hand, ...',
					easyWrong: ['Because ... therefore ...', 'Unless ... until ...', 'In conclusion ... First ...'],
					medQ: 'Which advice sentence is grammatically accurate for BAC candidates?',
					medAns: 'Candidates had better schedule screen-free revision hours daily.',
					medWrong: [
						'Candidates had better to schedule screen-free hours.',
						'Candidates ought schedule screen-free hours.',
						'Candidates must to schedule screen-free hours.'
					],
					hardQ: 'What makes an article headline effective in Written Expression?',
					hardAns: 'It is concise, relevant to the prompt, and clearly announces the main theme',
					hardWrong: [
						'It copies the entire exam rubric word for word',
						'It contains five full sentences with no focus',
						'It is omitted even when an article is requested'
					]
				}
			];

			const chosen = rng.pick(pool);
			let finalAnswer: string;
			let quizQuestion: QuizQuestionPayload;
			if (difficulty === 'easy') {
				finalAnswer = chosen.easyAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.easyWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'راجع منهجية التعبير الكتابي وتوزيع النقاط في شعبة آداب وفلسفة.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر الجواب المنهجي الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة المنهجية الدقيقة هي: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'تحقق من سلامة القاعدة النحوية (Unless / had better) في الجملة.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر الجملة السليمة لتوظيفها في مقالك:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجملة السليمة هي: ${finalAnswer}`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'راجع معايير التصحيح (Relevance, Coherence, Language, Excellence).'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'اختر المعيار الصحيح للتميز في التعبير الكتابي:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `المعيار الصحيح هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART TWO: Written Expression',
				points: 5,
				instruction: 'Choose ONE of the following topics (80 to 120 words):',
				content: [
					buildEnglishWrittenExpressionBlock({
						topicOnePrompt: chosen.topicOnePrompt,
						topicOneNotes: chosen.topicOneNotes,
						topicTwoPrompt: chosen.topicTwoPrompt,
						modelAnswer: chosen.modelAnswer,
						rubricSummary: 'Relevance (1 pt) + Semantic Coherence (1 pt) + Correct Use of English (2 pts) + Excellence (1 pt)',
						mark: '5'
					})
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't3',
				difficulty,
				domain: 'written_expression',
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion,
				sujetExercise,
				hints: [
					'احترم المطلوب بدقة (مقال أو فقرة موجهة من 80 إلى 120 كلمة) واختر موضوعاً واحداً فقط.',
					'وظّف أدوات المقارنة والشرط من الوحدة 3 مثل Whereas و Unlike و Unless.',
					'خصص آخر 10 دقائق لمراجعة تصريف الأفعال وعلامات الترقيم والإملاء.'
				],
				solutionStepsAr: [
					'تحديد الموضوع المختار وترتيب النقاط الموجهة منطقياً.',
					'كتابة مقدمة ممهدة وعرض مترابط بروابط واضحة.',
					'توظيف مفردات التربية والتكوين وقواعد الوحدة.',
					'ختم المقال بخلاصة مقنعة ومراجعة اللغة.'
				],
				finalAnswer
			};
		}
	}
];
