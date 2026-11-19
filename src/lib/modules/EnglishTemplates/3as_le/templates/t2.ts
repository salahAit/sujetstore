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
 * 3AS BAC Foreign Languages (لغات أجنبية — yearSubjectId: 789, coeff 5, 3h30, 7+7+6=20)
 * Parameterized Exam & Quiz Templates — Trimester 2: Units 2 & 3 "Ethics in Business" & "Education in the World" (4 templates)
 * Roles: 1 comprehension (7 pts) + 2 text_exploration (7 pts each) + 1 written_expression (6 pts)
 */
export const TEMPLATES_3AS_LE_T2: EnglishParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (7 pts): Academic Integrity, Ben Badis & El Ibrahimi's Schools & Ethical Trade
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_le_t2_comp_ethics_education',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'reading_comprehension',
		titleAr: 'فهم النص (7 نقاط — لغات أجنبية): النزاهة الأكاديمية ومدارس النهضة الجزائرية وأخلاقيات العمل',
		curriculumLessonId: 'eng_lesson_3as_le_t2_cond_wish_hightime',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Academic Integrity: Protecting the True Value of Degrees',
					source: 'Adapted from Higher Education Ethics Monitor',
					paragraphs: [
						'Every university degree represents a silent contract of trust between graduates and society. When an engineer designs a bridge or a physician prescribes treatment, citizens rely on the honesty of the examinations [[they]] passed. Unfortunately, digital shortcuts such as online plagiarism and forged diplomas have begun to threaten this vital trust.',
						'Educators warn that cheating in school is not a harmless mistake; rather, it is the earliest seed of workplace corruption. A learner who copies essays without effort fails to develop critical analysis, writing fluency, or moral responsibility. Unless institutions combine firm verification rules with honest mentorship, [[fake credentials]] will undermine public safety and devalue the hard work of sincere students.',
						'Fortunately, many universities are responding proactively by teaching proper citation skills, designing original research assignments, and rewarding independent thought. As long as students recognize that real knowledge cannot be stolen, academic integrity will remain strong.'
					],
					glossary: [
						{ term: 'plagiarism', meaning: 'copying another person words or ideas and presenting them as one own' },
						{ term: 'credentials', meaning: 'official certificates or diplomas proving qualification' }
					],
					tfItems: [
						{ q: 'Society relies on the honesty of academic qualifications held by professionals like doctors and engineers.', a: 'True', mark: '0.5' },
						{ q: 'Educators view cheating at school as harmless and unrelated to workplace ethics.', a: 'False', c: 'They warn it is not harmless and is the earliest seed of workplace corruption.', mark: '0.5' },
						{ q: 'Fake credentials harm both public safety and sincere hardworking students.', a: 'True', mark: '0.5' },
						{ q: 'Teaching proper citation and original research helps strengthen academic integrity.', a: 'True', mark: '0.5' }
					],
					whQuestions: [
						{ q: 'a) Why is academic dishonesty dangerous when graduates enter professions like medicine or engineering?', a: 'Because citizens rely on the competence and honesty of professionals who design bridges or prescribe treatment.', mark: '1' },
						{ q: 'b) What skills does a student fail to develop by copying essays?', a: 'Critical analysis, writing fluency, and moral responsibility.', mark: '1' },
						{ q: 'c) Mention two proactive steps universities are taking in paragraph 3.', a: 'Any two of: teaching proper citation skills, designing original research assignments, and rewarding independent thought.', mark: '1' }
					],
					refQuestion: 'a) "they" (§1)   b) "fake credentials" (§2)',
					refAnswer: 'a) "they" refers to graduates (engineers and physicians).   b) "fake credentials" refers to forged diplomas and dishonestly obtained degrees.',
					bestTitle: 'Why Academic Honesty Matters to Society',
					titleOptions: [
						'Why Academic Honesty Matters to Society',
						'How to Copy Online Articles Faster',
						'A History of Ancient Printing Ink'
					],
					easyQ: 'What two digital threats to academic trust are mentioned in paragraph 1?',
					easyAns: 'Online plagiarism and forged diplomas',
					easyWrong: ['Library books and handwritten notes', 'Oral debates and dictionaries', 'Science labs and chalkboards'],
					medQ: 'Who does the pronoun "they" in paragraph 1 refer to?',
					medAns: 'Graduates (such as engineers and physicians)',
					medWrong: ['Digital shortcuts', 'Forged diplomas', 'Universities'],
					hardQ: 'What link between school cheating and adult society does paragraph 2 establish?',
					hardAns: 'Academic cheating is the earliest root of workplace corruption and endangers public safety',
					hardWrong: [
						'School cheating improves writing fluency and research skills',
						'Workplace corruption has no connection to early moral habits',
						'Verification rules are unnecessary once students graduate'
					]
				},
				{
					title: 'Imam Ben Badis and Sheikh El Ibrahimi: Builders of Ethical Education',
					source: 'Adapted from Chronicles of Algerian Educational Awakening',
					paragraphs: [
						'During the colonial era, access to schooling for Algerian children was severely restricted, and Arabic language and Islamic heritage were systematically sidelined. Determined to reverse this injustice, Imam Abdelhamid Ben Badis, Sheikh Mohamed Bachir El Ibrahimi, and Sheikh Moubarek El Mili launched an extraordinary educational movement through the Association of Algerian Muslim Scholars.',
						'Their schools were financed entirely by modest community donations, yet [[they]] maintained high academic standards and strict ethical discipline. Teachers trained both boys and girls in Arabic eloquence, Quranic ethics, Algerian history, geography, and modern sciences, nurturing self-confidence and civic dignity.',
						'Sheikh El Ibrahimi repeatedly reminded educators that knowledge without morality is hollow, whereas sincere learning rooted in integrity liberates minds and uplifts nations. Decades after independence, [[their legacy]] continues to inspire Algerian educators striving for excellence.'
					],
					glossary: [
						{ term: 'eloquence', meaning: 'fluent, clear, and persuasive use of language' },
						{ term: 'hollow', meaning: 'empty and lacking real lasting value' }
					],
					tfItems: [
						{ q: 'Colonial policies generously expanded Arabic and Islamic schooling for Algerian children.', a: 'False', c: 'Access to schooling was severely restricted and Arabic and Islamic heritage were sidelined.', mark: '0.5' },
						{ q: 'The reformist schools were funded by modest donations from local communities.', a: 'True', mark: '0.5' },
						{ q: 'Both boys and girls were trained in language, ethics, history, and modern sciences.', a: 'True', mark: '0.5' },
						{ q: 'Sheikh El Ibrahimi believed knowledge should be united with morality and integrity.', a: 'True', mark: '0.5' }
					],
					whQuestions: [
						{ q: 'a) What educational injustice motivated Ben Badis, El Ibrahimi, and El Mili?', a: 'Restricted schooling for Algerian children and the sidelining of Arabic and Islamic heritage.', mark: '1' },
						{ q: 'b) How were the reformist schools funded?', a: 'Entirely by modest community donations.', mark: '1' },
						{ q: 'c) According to Sheikh El Ibrahimi in paragraph 3, what kind of learning uplifts nations?', a: 'Sincere learning rooted in morality and integrity.', mark: '1' }
					],
					refQuestion: 'a) "they" (§2)   b) "their legacy" (§3)',
					refAnswer: 'a) "they" refers to the schools of the Association of Algerian Muslim Scholars.   b) "their legacy" refers to the educational heritage of Ben Badis, El Ibrahimi, El Mili, and the Association.',
					bestTitle: 'Moral Integrity and Knowledge in Algeria Reformist Schools',
					titleOptions: [
						'Moral Integrity and Knowledge in Algeria Reformist Schools',
						'Modern Commercial Shipping Regulations',
						'How to Build Solar Power Stations'
					],
					easyQ: 'Who financed the schools of the Association of Algerian Muslim Scholars?',
					easyAns: 'Modest donations from local communities',
					easyWrong: ['Colonial authorities', 'Foreign banks', 'Private commercial airlines'],
					medQ: 'What does "they" in paragraph 2 refer to?',
					medAns: 'The reformist schools of the Association',
					medWrong: ['Colonial policies', 'Modern sciences', 'Community donations'],
					hardQ: 'What philosophical principle of education is emphasized by Sheikh El Ibrahimi in paragraph 3?',
					hardAns: 'Knowledge without morality is hollow; true education unites intellect with ethical integrity',
					hardWrong: [
						'Science should be taught separately from moral responsibility',
						'Only wealthy elites deserve access to eloquence and history',
						'Ethical discipline prevents students from learning modern sciences'
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
						diagnosticFeedback: 'راجع الفقرتين الأولى والثانية؛ المعلومة مذكورة صراحة.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `BAC LE Comprehension ("${chosen.title}"): ${chosen.easyQ}`,
					questionTextAr: 'اختر الجواب الصحيح من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح من النص: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'تحقق من الاسم الجمع الذي يسبق الضمير في النص.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `BAC LE Reference ("${chosen.title}"): ${chosen.medQ}`,
					questionTextAr: 'حدد مرجع الضمير بدقة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الضمير يحيل إلى: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'اقرأ الفقرة بتمعن واستنتج المبدأ الأخلاقي التربوي.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `BAC LE Analysis ("${chosen.title}"): ${chosen.hardQ}`,
					questionTextAr: 'استنتج المبدأ التربوي والأخلاقي في النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `المبدأ المستخلص هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART ONE: Reading — A) Comprehension',
				points: 7,
				instruction: 'Read the text carefully then do the following activities (7 pts — BAC LE):',
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
								header: '1. Choose the right answer. The text is:',
								options: ['An expository essay on ethics and education', 'A travel advertisement', 'A fictional diary'],
								correct: 'An expository essay on ethics and education',
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
								header: '5. Choose the most appropriate title for the text:',
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
				grade: '3as_le',
				trimesterId: 't2',
				difficulty,
				domain: 'reading_comprehension',
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'تتبع الروابط الشرطية (Unless / As long as) والربط بين الأخلاق والتعليم.',
					'صحح الجمل الخاطئة في True/False بإيجاز من النص.',
					'تأكد من تطابق المرجع الإحالي مع سياق الفقرة.'
				],
				solutionStepsAr: [
					'تحديد طبيعة المقال التفسيري التربوي (0.5 نقطة).',
					'تصنيف الصواب والخطأ مع التصحيح (2 نقطتان).',
					'الإجابة المركزة عن أسئلة الفهم الثلاثة (3 نقاط).',
					'تحديد الإحالة والعنوان المناسب (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. TEXT EXPLORATION (7 pts): Complex Passive, Reported Speech, Wish/Unless & Prefix/Root/Suffix
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_le_t2_exp_wish_passive_reported',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'grammar_syntax',
		titleAr: 'البناء اللغوي (7 نقاط — لغات أجنبية): المبني للمجهول المركب، الكلام المنقول، التمني و Prefix/Root/Suffix',
		curriculumLessonId: 'eng_lesson_3as_le_t2_complex_passive_reported',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					lexisPrompt: 'Give opposites keeping the same root: ethical / honest / responsible / literate',
					lexisAnswer: 'unethical / dishonest / irresponsible / illiterate',
					affixRows: [
						[
							{ content: 'dishonesty', bold: true },
							{ content: '..........', answer: 'dis-', mark: '0.15' },
							{ content: '..........', answer: 'honest', mark: '0.15' },
							{ content: '..........', answer: '-y', mark: '0.2' }
						],
						[
							{ content: 'unethical', bold: true },
							{ content: '..........', answer: 'un-', mark: '0.15' },
							{ content: '..........', answer: 'ethic', mark: '0.15' },
							{ content: '..........', answer: '-al', mark: '0.2' }
						],
						[
							{ content: 'mismanagement', bold: true },
							{ content: '..........', answer: 'mis-', mark: '0.15' },
							{ content: '..........', answer: 'manage', mark: '0.15' },
							{ content: '..........', answer: '-ment', mark: '0.2' }
						]
					],
					rewrites: [
						{
							prompt: '1) a) People believe that honest education eradicates corruption.\n   b) Honest education is ...........................................................',
							answer: '1) b) Honest education is believed to eradicate corruption.'
						},
						{
							prompt: '2) a) The dean asked the candidate, "Have you verified all your citations?"\n   b) The dean asked the candidate .................................................',
							answer: '2) b) The dean asked the candidate if he/she had verified all his/her citations.'
						},
						{
							prompt: '3) a) He regrets having plagiarized his graduation memoir.\n   b) If only he ...................................................................',
							answer: '3) b) If only he had not plagiarized his graduation memoir.'
						}
					],
					stressWords: 'honesty - plagiarism - integrity - corruption',
					stressCols: [
						{ header: '1st Syllable', words: ['honesty', 'plagiarism'], mark: '0.5' },
						{ header: '2nd Syllable', words: ['integrity', 'corruption'], mark: '0.5' }
					],
					clozeWords: 'integrity - verified - plagiarism - scholars',
					clozePrompt: 'True (1) .......... reject (2) .......... completely. Every research citation must be (3) .......... to uphold academic (4) .......... .',
					clozeAnswer: '1) scholars   2) plagiarism   3) verified   4) integrity',
					easyQ: 'How is "mismanagement" divided into Prefix + Root + Suffix?',
					easyAns: 'mis- + manage + -ment',
					easyWrong: ['mism- + anage + -ment', '— + mismanage + -ment', 'mis- + manag + -ement'],
					medQ: 'Rewrite using Impersonal Passive: People believe that honest education eradicates corruption. Complete: Honest education is believed .......... corruption.',
					medAns: 'to eradicate',
					medWrong: ['eradicating', 'eradicated', 'that eradicates'],
					hardQ: 'Report accurately: The dean asked him, "Have you verified all your citations?"',
					hardAns: 'The dean asked him if he had verified all his citations.',
					hardWrong: [
						'The dean asked him had he verified all his citations.',
						'The dean asked him if he has verified all his citations.',
						'The dean asked him if had he verified all his citations.'
					]
				},
				{
					lexisPrompt: 'Find synonyms for: a) integrity = ..........   b) eradicate = ..........   c) credentials = ..........',
					lexisAnswer: 'a) honesty / uprightness   b) eliminate / wipe out   c) diplomas / qualifications',
					affixRows: [
						[
							{ content: 'illegality', bold: true },
							{ content: '..........', answer: 'il-', mark: '0.15' },
							{ content: '..........', answer: 'legal', mark: '0.15' },
							{ content: '..........', answer: '-ity', mark: '0.2' }
						],
						[
							{ content: 'accountability', bold: true },
							{ content: '..........', answer: '—', mark: '0.15' },
							{ content: '..........', answer: 'account', mark: '0.15' },
							{ content: '..........', answer: '-ability', mark: '0.2' }
						],
						[
							{ content: 'irresponsible', bold: true },
							{ content: '..........', answer: 'ir-', mark: '0.15' },
							{ content: '..........', answer: 'respons(e)', mark: '0.15' },
							{ content: '..........', answer: '-ible', mark: '0.2' }
						]
					],
					rewrites: [
						{
							prompt: '1) a) Inspectors were auditing the financial files all morning.\n   b) The financial files ..........................................................',
							answer: '1) b) The financial files were being audited by inspectors all morning.'
						},
						{
							prompt: '2) a) The headmaster told the students, "Do not copy essays from websites."\n   b) The headmaster warned the students ...........................................',
							answer: '2) b) The headmaster warned the students not to copy essays from websites.'
						},
						{
							prompt: '3) a) If the committee does not monitor exams fairly, trust will disappear.\n   b) Unless the committee .........................................................',
							answer: '3) b) Unless the committee monitors exams fairly, trust will disappear.'
						}
					],
					stressWords: 'ethical - education - economic - transparency',
					stressCols: [
						{ header: '1st Syllable', words: ['ethical'], mark: '0.25' },
						{ header: '2nd Syllable', words: ['transparency'], mark: '0.25' },
						{ header: '3rd Syllable', words: ['education', 'economic'], mark: '0.5' }
					],
					clozeWords: 'audits - credentials - merit - bribery',
					clozePrompt: 'Transparent (1) .......... protect public funds from (2) .......... , while genuine (3) .......... ensure every job is awarded on (4) .......... .',
					clozeAnswer: '1) audits   2) bribery   3) credentials   4) merit',
					easyQ: 'How is "illegality" divided into Prefix + Root + Suffix?',
					easyAns: 'il- + legal + -ity',
					easyWrong: ['in- + legal + -ity', '— + illegal + -ity', 'il- + leg + -ality'],
					medQ: 'Turn into Passive: Inspectors were auditing the files. Complete: The files .......... by inspectors.',
					medAns: 'were being audited',
					medWrong: ['were audited', 'was being audited', 'have been audited'],
					hardQ: 'Report the warning: The headmaster said, "Do not copy essays from websites."',
					hardAns: 'The headmaster warned the students not to copy essays from websites.',
					hardWrong: [
						'The headmaster warned the students to not copy essays from websites.',
						'The headmaster warned the students did not copy essays from websites.',
						'The headmaster warned the students not copying essays from websites.'
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
						diagnosticFeedback: 'استخرج البادئة من اليسار واللاحقة من اليمين لإبراز الجذر.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر التفكيك البنيوي السليم:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التفكيك الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'راجع صيغة المبني للمجهول غير الشخصي وصيغة الماضي المستمر المبني للمجهول.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر صيغة المبني للمجهول المتقدمة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الصيغة الصحيحة هي: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'تذكر ترتيب الكلام المنقول للأسئلة (if + S + V) وللتحذير (warned + Obj + not to + Stem).'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'اختر التحويل السليم في الكلام المنقول:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحويل الدقيق هو: ${finalAnswer}`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 7,
				instruction: 'Do the following language exploration activities carefully (7 pts — BAC LE):',
				content: [
					{
						type: 'text',
						content: `1. ${chosen.lexisPrompt}`,
						answer: chosen.lexisAnswer,
						mark: '1'
					},
					{
						type: 'text',
						content: '2. Divide the following words into Prefix, Root, and Suffix:'
					},
					{
						type: 'table',
						headers: ['Word', 'Prefix', 'Root', 'Suffix'],
						cells: [],
						rows: chosen.affixRows,
						align: 'center',
						borders: 'grid',
						headerBackground: true,
						width: 'full'
					},
					{
						type: 'text',
						content: `3. Rewrite sentence (b) so that it means the same as sentence (a):\n${chosen.rewrites.map((r) => r.prompt).join('\n')}`,
						answer: chosen.rewrites.map((r) => r.answer).join('\n'),
						mark: '2.5'
					},
					{
						type: 'text',
						content: `4. Classify the following words according to their stressed syllable: (${chosen.stressWords})`
					},
					buildEnglishPhonologyTableBlock({ columns: chosen.stressCols }),
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
				grade: '3as_le',
				trimesterId: 't2',
				difficulty,
				domain: 'grammar_syntax',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'في المبني للمجهول غير الشخصي استعمل Subject + is believed + to + Stem.',
					'في نقل النهي والتحذير استعمل warned / advised + Object + not to + Stem.',
					'في جدول Prefix/Root/Suffix استعمل الشرطة (—) إذا خلت الكلمة من بادئة.'
				],
				solutionStepsAr: [
					'إيجاد الأضداد أو المرادفات (1 نقطة).',
					'تفكيك الكلمات الثلاث إلى بادئة وجذر ولاحقة (1.5 نقطة).',
					'إعادة كتابة الجمل الثلاث المتقدمة (2.5 نقطة).',
					'تصنيف النبر الصوتي وملء الفراغات (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. TEXT EXPLORATION (7 pts): Result Clauses (So/Such...that), It is high time & 4-Sentence Discourse Reordering!
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_le_t2_exp_result_reordering',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'discourse_cohesion',
		titleAr: 'البناء اللغوي (7 نقاط — لغات أجنبية): جمل النتيجة (So/Such...that) وترتيب الفقرة المبعثرة (Discourse Reordering)',
		curriculumLessonId: 'eng_lesson_3as_le_t2_discourse_reordering',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					lexisPrompt: 'Match each ethics term with its synonym: a) transparent   b) fraud   c) eradicate\n(1. deception   2. eliminate   3. open and clear)',
					lexisAnswer: 'a - 3   |   b - 1   |   c - 2',
					morphRows: [
						{ verb: { given: true, value: 'to verify' }, noun: { value: 'verification', mark: '0.25' }, adjective: { value: 'verified', mark: '0.25' } },
						{ verb: { value: 'to educate', mark: '0.25' }, noun: { given: true, value: 'education' }, adjective: { value: 'educational', mark: '0.25' } },
						{ verb: { value: 'to corrupt', mark: '0.25' }, noun: { value: 'corruption', mark: '0.25' }, adjective: { given: true, value: 'corrupt' } }
					],
					rewrites: [
						{
							prompt: '1) a) Forged diplomas caused massive damage; consequently, employers tightened verification.\n   b) Forged diplomas caused such ...................................................',
							answer: '1) b) Forged diplomas caused such massive damage that employers tightened verification.'
						},
						{
							prompt: '2) a) Universities ought to teach digital citation ethics from the first year.\n   b) It is high time universities .................................................',
							answer: '2) b) It is high time universities taught digital citation ethics from the first year.'
						}
					],
					silentWords: 'honest - doubt - knowledge - receipt',
					silentCols: [
						{ header: 'Silent h', words: ['honest'], mark: '0.25' },
						{ header: 'Silent b', words: ['doubt'], mark: '0.25' },
						{ header: 'Silent k', words: ['knowledge'], mark: '0.25' },
						{ header: 'Silent p', words: ['receipt'], mark: '0.25' }
					],
					reorderPrompt:
						'Reorder the following four sentences to make a coherent paragraph:\n(a) Consequently, honest manufacturers suffer heavy financial losses.\n(b) Counterfeiting has become a major obstacle to ethical commerce.\n(c) Therefore, both strict customs checks and conscious consumer choices are essential.\n(d) It floods local markets with cheap but hazardous imitations.',
					reorderAnswer: 'Correct order: 1-b   2-d   3-a   4-c',
					easyQ: 'Which letter is silent in the word "receipt"?',
					easyAns: 'p',
					easyWrong: ['r', 'c', 't'],
					medQ: 'Choose the right result sentence: Forged diplomas caused massive damage; consequently, employers tightened checks.',
					medAns: 'Forged diplomas caused such massive damage that employers tightened checks.',
					medWrong: [
						'Forged diplomas caused such a massive damage that employers tightened checks.',
						'Forged diplomas caused so massive damage that employers tightened checks.',
						'Forged diplomas caused such massive damage that consequently employers tightened checks.'
					],
					hardQ: 'What is the exact coherent order of the four sentences (a, b, c, d) about counterfeiting?',
					hardAns: 'b - d - a - c',
					hardWrong: ['d - b - a - c', 'b - a - d - c', 'c - b - d - a']
				},
				{
					lexisPrompt: 'Match each school term with its meaning: a) compulsory   b) curriculum   c) vocational\n(1. practical craft training   2. required by law   3. structured school syllabus)',
					lexisAnswer: 'a - 2   |   b - 3   |   c - 1',
					morphRows: [
						{ verb: { given: true, value: 'to qualify' }, noun: { value: 'qualification', mark: '0.25' }, adjective: { value: 'qualified', mark: '0.25' } },
						{ verb: { value: 'to inspire', mark: '0.25' }, noun: { given: true, value: 'inspiration' }, adjective: { value: 'inspiring', mark: '0.25' } },
						{ verb: { value: 'to discipline', mark: '0.25' }, noun: { value: 'discipline', mark: '0.25' }, adjective: { given: true, value: 'disciplined' } }
					],
					rewrites: [
						{
							prompt: '1) a) There were very many applicants; as a result, the institute opened two new classes.\n   b) There were so ................................................................',
							answer: '1) b) There were so many applicants that the institute opened two new classes.'
						},
						{
							prompt: '2) a) Sheikh El Ibrahimi wrote very eloquently. Readers memorized his essays.\n   b) Sheikh El Ibrahimi wrote so ..................................................',
							answer: '2) b) Sheikh El Ibrahimi wrote so eloquently that readers memorized his essays.'
						}
					],
					silentWords: 'school - write - listen - subtle',
					silentCols: [
						{ header: 'Silent h', words: ['school'], mark: '0.25' },
						{ header: 'Silent w', words: ['write'], mark: '0.25' },
						{ header: 'Silent t', words: ['listen'], mark: '0.25' },
						{ header: 'Silent b', words: ['subtle'], mark: '0.25' }
					],
					reorderPrompt:
						'Reorder the following four sentences to make a coherent paragraph:\n(a) These schools taught Arabic, Islamic ethics, and modern sciences side by side.\n(b) In 1931, Imam Ben Badis and fellow scholars founded the Association of Algerian Muslim Scholars.\n(c) As a result, a conscious and educated generation rose to serve Algeria.\n(d) Soon afterwards, they opened dozens of free schools funded by citizens.',
					reorderAnswer: 'Correct order: 1-b   2-d   3-a   4-c',
					easyQ: 'Which letter is silent in the word "subtle"?',
					easyAns: 'b',
					easyWrong: ['s', 't', 'l'],
					medQ: 'Choose the right quantifier result structure: There were .......... applicants .......... the institute opened two new classes.',
					medAns: 'so many ... that',
					medWrong: ['such many ... that', 'so much ... that', 'such a many ... that'],
					hardQ: 'What is the exact coherent order of the four sentences (a, b, c, d) about the 1931 reformist schools?',
					hardAns: 'b - d - a - c',
					hardWrong: ['a - b - d - c', 'b - a - d - c', 'd - b - a - c']
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
						diagnosticFeedback: 'تذكر الحروف الصامتة القياسية: p في receipt و b في subtle/doubt.'
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
						diagnosticFeedback: 'انتبه: damage اسم غير معدود بلا a، و many تأخذ so دائماً لا such.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر جملة النتيجة السليمة نحوياً:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجملة الصحيحة هي: ${finalAnswer}`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'ابدأ بالجملة العامة (b) ثم تتبع الضمائر (It / they / These schools) حتى الخاتمة (Therefore / As a result).'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'رتب الجمل الأربع لتكوين فقرة متماسكة (BAC LE):',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الترتيب المتسق هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 7,
				instruction: 'Do the following language exploration activities carefully (7 pts — BAC LE):',
				content: [
					{
						type: 'text',
						content: `1. ${chosen.lexisPrompt}`,
						answer: chosen.lexisAnswer,
						mark: '1'
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
						mark: '2'
					},
					{
						type: 'text',
						content: `4. Classify the following words according to their silent letter: (${chosen.silentWords})`
					},
					buildEnglishPhonologyTableBlock({ columns: chosen.silentCols }),
					{
						type: 'text',
						content: `5. ${chosen.reorderPrompt}`,
						answer: chosen.reorderAnswer,
						mark: '1.5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't2',
				difficulty,
				domain: 'discourse_cohesion',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'مع so...that و such...that احذف الكلمات الزائدة مثل very و consequently و as a result.',
					'قبل many و much و few و little نستعمل دائماً so وليس such.',
					'في تمرين Discourse Reordering اربط كل ضمير (It, they, These schools) بالجملة التي قدمت الاسم مباشرة.'
				],
				solutionStepsAr: [
					'ربط المفردات بمعانيها بدقة (1 نقطة).',
					'إكمال جدول الاشتقاق الثلاثي (1.5 نقطة).',
					'إعادة كتابة جمل النتيجة والاستعجال (2 نقطتان).',
					'تصنيف الحروف الصامتة وترتيب الجمل الأربع المبعثرة (2.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. WRITTEN EXPRESSION (6 pts — Integration): BAC LE Formal Speech / Argumentative Essay
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_le_t2_we_ethics_schools_speech',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'written_expression',
		titleAr: 'التعبير الكتابي (6 نقاط — لغات أجنبية): خطاب رسمي أو مقال حجاجي حول النزاهة والأخلاق في التعليم والعمل',
		curriculumLessonId: 'eng_lesson_3as_le_t2_cond_wish_hightime',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					topicOnePrompt:
						'Imagine you are invited to address a national youth conference on "Ethics in Education and Work". Write a formal speech of about 120 to 150 words urging students and young entrepreneurs to uphold integrity, using the notes below.',
					topicOneNotes: [
						'Address the audience formally and recall our heritage (Imam Ben Badis & Sheikh El Ibrahimi uniting knowledge with ethics)',
						'Warn against shortcuts: cheating in exams, plagiarism, bribery, and counterfeit commerce',
						'Highlight rewards of integrity: public trust, genuine competence, lasting prosperity',
						'Close with a memorable call to action and formal thanks'
					],
					topicTwoPrompt:
						'Write an argumentative essay of about 120 to 150 words discussing whether strict laws alone are enough to eradicate corruption, or whether moral education in families and schools is equally essential.',
					modelAnswer:
						'Ladies and gentlemen, dear educators and fellow students,\nIt is a true honour to address you today on a principle that determines the destiny of every nation: integrity in both learning and work. Decades ago, Imam Abdelhamid Ben Badis and Sheikh Mohamed Bachir El Ibrahimi taught Algeria that knowledge divorced from morality can never uplift a society.\nToday, however, shortcuts such as exam cheating, online plagiarism, bribery, and counterfeit trade tempt the careless. We must remember that ill-gotten gains never prosper; a forged degree or a dishonest contract destroys public trust and robs honest citizens of their rights. It is high time our generation chose authentic competence, transparent enterprise, and sincere effort instead.\nLet us pledge together to guard our honesty in every classroom and every marketplace so that Algeria thrives on merit and justice. Thank you very much for your kind attention.',
					easyQ: 'How should a Formal Speech open and close in a 6-point BAC LE exam?',
					easyAns: 'Open by addressing the audience (Ladies and gentlemen...) and close with a call to action and thanks',
					easyWrong: [
						'Open with a postal address and close with Yours faithfully',
						'Start directly with bullet notes and end abruptly',
						'Use informal slang like Hey guys and Bye'
					],
					medQ: 'Which persuasive sentence best fits the body of a Formal Speech on integrity?',
					medAns: 'It is high time our generation chose authentic competence and transparent enterprise.',
					medWrong: [
						'It is high time our generation choose authentic competence.',
						'It is high time our generation should choose competence.',
						'It is high time our generation will choose competence.'
					],
					hardQ: 'Why does the model speech use inclusive pronouns ("we", "our", "Let us")?',
					hardAns: 'To engage the audience directly and inspire shared moral responsibility',
					hardWrong: [
						'Because formal speeches forbid referring to the audience',
						'To avoid mentioning the topic of integrity',
						'Because first-person plural is mandatory in dictionaries'
					]
				},
				{
					topicOnePrompt:
						'Write an argumentative essay of about 120 to 150 words examining whether strict legal penalties alone can eradicate corruption, or whether moral education and civic transparency are equally vital, using the notes below.',
					topicOneNotes: [
						'One view: heavy fines, independent audits, and firm judicial sanctions deter bribery and counterfeiting',
						'Rebuttal / deeper view: laws alone cannot watch every transaction; without conscience, wrongdoers seek loopholes',
						'Balanced solution: combine strict law enforcement with ethical upbringing in families, schools, and business codes'
					],
					topicTwoPrompt:
						'Write an article of about 120 to 150 words for a student journal explaining how secondary schools can cultivate academic honesty and eliminate exam cheating.',
					modelAnswer:
						'Corruption remains one of the most destructive barriers to economic and social progress worldwide. Many observers argue that strict laws, independent audits, and heavy financial penalties are sufficient to eradicate bribery, embezzlement, and counterfeiting. Undoubtedly, firm legal deterrence is indispensable because violators must know that dishonesty carries real consequences.\nNevertheless, laws alone cannot monitor every private transaction or close every loophole. Unless citizens carry an inner moral compass rooted in honesty and accountability, unethical individuals will constantly look for ways to bypass regulations. Therefore, families, schools, and religious and civic institutions must nurture ethical character from childhood while business associations enforce transparent codes of conduct.\nIn conclusion, eradicating corruption is not an either-or choice: lasting integrity flourishes only when just legal enforcement walks hand in hand with deep moral education.',
					easyQ: 'What are the two opposing or complementary angles in this Argumentative Essay?',
					easyAns: 'Strict legal deterrence versus moral education and civic integrity',
					easyWrong: [
						'Ancient pottery versus space rockets',
						'Fast food versus traditional cooking',
						'Winter weather versus summer holidays'
					],
					medQ: 'Which concessive transition effectively introduces the rebuttal in Body Paragraph 2?',
					medAns: 'Nevertheless, / However,',
					medWrong: ['First of all,', 'For instance,', 'In conclusion,'],
					hardQ: 'Which sentence cleanly integrates "Unless" into an argumentative rebuttal?',
					hardAns: 'Unless citizens carry an inner moral compass, unethical individuals will seek loopholes.',
					hardWrong: [
						'Unless citizens do not carry a moral compass, individuals will seek loopholes.',
						'Unless citizens will carry a moral compass, individuals seek loopholes.',
						'Unless carrying, individuals seek loopholes.'
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
						diagnosticFeedback: 'احرص على احترام قالب النص المطلوب (خطاب رسمي أو مقال حجاجي).'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر الميزة البنيوية الصحيحة للنص المطلوب:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `القاعدة المنهجية الصحيحة هي: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'راجع قاعدة It is high time + Past Simple وروابط التفنيد الحجاجي.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر العبارة الأقوى والأدق نحوياً:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الاختيار الأصح هو: ${finalAnswer}`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'الخطاب الرسمي والمقال الحجاجي في 3AS LE يعتمدان على الإقناع والاتساق الدقيق.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'اختر التحليل الأسلوبي أو النحوي الأصح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحليل الأصح هو: ${finalAnswer}`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART TWO: Written Expression',
				points: 6,
				instruction: 'Choose ONE of the following topics (120 to 150 words — 6 pts BAC LE):',
				content: [
					buildEnglishWrittenExpressionBlock({
						topicOnePrompt: chosen.topicOnePrompt,
						topicOneNotes: chosen.topicOneNotes,
						topicTwoPrompt: chosen.topicTwoPrompt,
						modelAnswer: chosen.modelAnswer,
						rubricSummary: 'Relevance & Format (1.5 pts) + Semantic Coherence (1 pt) + Correct Use of English (2 pts) + Excellence & Vocabulary (1.5 pts)',
						mark: '6'
					})
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't2',
				difficulty,
				domain: 'written_expression',
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion,
				sujetExercise,
				hints: [
					'تأكد من القالب المطلوب: Formal Speech يستوجب التحية ومخاطبة الجمهور والشكر الختامي، و Argumentative Essay يستوجب عرض الرأي المقابل وتفنيده.',
					'وظف تراكيب الوحدة المتقدمة (It is high time, Unless, As long as, Nevertheless).',
					'تجنب تماماً الاختصارات العامية واعتنِ بالفقرات وعلامات الترقيم.'
				],
				solutionStepsAr: [
					'تحديد نوع النص المطلوب وتخطيط الفقرات الأربع.',
					'بناء مقدمة مقنعة وأطروحة دقيقة.',
					'توظيف الحجج والأمثلة من تراثنا التربوي والأخلاقي.',
					'صياغة خاتمة مؤثرة ومراجعة اللغة والإملاء.'
				],
				finalAnswer
			};
		}
	}
];
