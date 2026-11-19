import type {
	Difficulty,
	EnglishGeneratedExerciseInstance,
	EnglishParameterizedTemplate
} from '../../types';
import {
	buildEnglishPassageBlock,
	buildEnglishPhonologyTableBlock,
	buildEnglishWrittenExpressionBlock
} from '../../english-helpers';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';

// ═══════════════════════════════════════════════════════════════════════════════
// 1. BEM Reading Comprehension 1 (7 pts) — Islamic & Algerian Solidarity & Charity
// ═══════════════════════════════════════════════════════════════════════════════
const compCharityCitizenship4amT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4am_t3_comp_charity_citizenship',
	grade: '4am',
	trimesterId: 't3',
	domain: 'reading_comprehension',
	titleAr: 'فهم النص (BEM): التكافل الاجتماعي، التطوع والمواطنة الصالحة (7 نقاط)',
	curriculumLessonId: 'eng_lesson_4am_t3_likes_charity_citizenship',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'Youth Solidarity: Helping Orphans and Neighbours in Algeria',
				paragraphs: [
					'Solidarity and mercy are deeply rooted in Islamic ethics and Algerian society. Across towns and villages, young volunteers enjoy organizing charity drives to support orphans, widows, and elderly neighbours, especially during the blessed month of Ramadan and before the start of the school year.',
					'Last autumn, pupils at a middle school in Blida launched a "Warm Coat and School Bag" campaign. [[They]] collected hundreds of notebooks, winter jackets, and food boxes in just two weeks. Because every family contributed generously, dozens of orphans started the term with bright smiles and full confidence.',
					'True citizenship begins with small sincere deeds. If every Algerian pupil helps one neighbour or joins a charity club, our communities will become safer, kinder, and more united.'
				],
				source: 'Adapted from Algerian Citizenship Readings (BEM 4MS)',
				refWord: 'They',
				refAns: 'Pupils at a middle school in Blida',
				q1: 'Who do young Algerian volunteers support during charity drives?',
				a1: 'They support orphans, widows, and elderly neighbours.',
				q2: 'What did the Blida middle school pupils collect during their autumn campaign?',
				a2: 'They collected hundreds of notebooks, winter jackets, and food boxes.',
				tf1Q: 'Solidarity is an important value in Islamic ethics and Algerian society.',
				tf1A: 'True',
				tf2Q: 'The Blida campaign lasted for six months.',
				tf2A: 'False',
				tf2C: 'They collected the donations in just two weeks.',
				tf3Q: 'The school also built a swimming pool during the campaign.',
				tf3A: 'Not Mentioned',
				synTarget: 'compassion / kindness (paragraph 1)',
				synAns: 'mercy',
				oppTarget: 'selfish / stingily (paragraph 2 — adverb)',
				oppAns: 'generously',
				mcqCorrect: 'Algerian youth put Islamic solidarity into practice through school charity campaigns supporting orphans and neighbours.',
				mcqD1: 'Young pupils cannot take part in community charity work.',
				mcqD2: 'The Blida campaign failed because nobody donated.',
				mcqD3: 'Charity in Algeria happens only once every ten years.'
			},
			{
				title: 'Being a Responsible Citizen Every Day',
				paragraphs: [
					'Good citizenship is not only about big speeches; it is reflected in our daily manners at home, at school, and in the street. A responsible citizen obeys fair laws, respects parents and teachers, protects public property, and avoids wasting water or food.',
					'In many Algerian neighbourhoods, youth associations prefer cleaning streets, planting olive trees, and visiting sick elderly residents on Fridays. [[These actions]] strengthen brotherhood and teach children that serving others brings real happiness and peace of mind.',
					'Remember this golden rule: be honest, respect your neighbours, and do not wait for others to start doing good. If you lead by positive example, your friends will gladly follow you.'
				],
				source: 'Adapted from Algerian Citizenship Readings (BEM 4MS)',
				refWord: 'These actions',
				refAns: 'Cleaning streets, planting olive trees, and visiting sick elderly residents',
				q1: 'Mention three qualities or actions of a responsible citizen from paragraph 1.',
				a1: 'Obeying fair laws, respecting parents and teachers, protecting public property, and avoiding waste (any three).',
				q2: 'What happens if you lead by positive example according to paragraph 3?',
				a2: 'Your friends will gladly follow you.',
				tf1Q: 'Good citizenship is shown through daily manners at home, school, and in the street.',
				tf1A: 'True',
				tf2Q: 'Youth associations cut down olive trees on Fridays.',
				tf2A: 'False',
				tf2C: 'They plant olive trees, clean streets, and visit sick elderly residents.',
				tf3Q: 'Every neighbourhood has exactly fifty volunteers.',
				tf3A: 'Not Mentioned',
				synTarget: 'happily / willingly (paragraph 3)',
				synAns: 'gladly',
				oppTarget: 'dishonest (paragraph 3)',
				oppAns: 'honest',
				mcqCorrect: 'Responsible citizenship appears in everyday honesty, respect, public care, and community volunteering.',
				mcqD1: 'Citizenship only requires giving long speeches.',
				mcqD2: 'Protecting public property is not a citizen duty.',
				mcqD3: 'Helping others makes people unhappy.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqD1, diagnosticFeedback: 'النص يؤكد أهمية الأفعال اليومية ومشاركة الشباب في الخير.' },
				{ text: variant.mcqD2, diagnosticFeedback: 'تأكد من نتائج الحملة المذكورة في الفقرة الثانية.' },
				{ text: variant.mcqD3, diagnosticFeedback: 'راجع النص لتجد المعنى الإيجابي الواضح للتكافل.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Read "${variant.title}". Choose the main message of the passage:`,
				questionTextAr: `اقرأ نص "${variant.title}" واختر الفكرة الأساسية:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'Part One: A / Reading Comprehension (07 pts)',
				points: 7,
				instruction: 'Read the text carefully and do the following BEM activities:',
				content: [
					buildEnglishPassageBlock({
						title: variant.title,
						paragraphs: variant.paragraphs,
						source: variant.source,
						numberedParagraphs: true
					}),
					{
						type: 'text',
						content: `Activity 1: Answer the following questions (02 pts):\n  a) ${variant.q1}\n  b) ${variant.q2}`,
						answer: `a) ${variant.a1}\nb) ${variant.a2}`,
						mark: '2'
					},
					{
						type: 'true_false',
						items: [
							{ q: variant.tf1Q, a: variant.tf1A, mark: '1' },
							{ q: variant.tf2Q, a: variant.tf2A, c: variant.tf2C, mark: '1' },
							{ q: variant.tf3Q, a: variant.tf3A, mark: '1' }
						]
					},
					{
						type: 'text',
						content: `Activity 3: What does the underlined expression "${variant.refWord}" refer to? (01 pt)`,
						answer: `"${variant.refWord}" refers to: ${variant.refAns}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `Activity 4 (Lexis): Find in the text (01 pt):\n  a) Closest in meaning to: ${variant.synTarget} = ......\n  b) Opposite in meaning to: ${variant.oppTarget} = ......`,
						answer: `a) ${variant.synAns}\nb) ${variant.oppAns}`,
						mark: '1'
					}
				]
			},
			hints: [
				'اقرأ الأسئلة أولاً ثم ابحث عن الكلمات المفتاحية داخل الفقرات المرقّمة.',
				'انتبه للفرق بين False (مناقض للنص) و Not Mentioned (غير مذكور أصلاً).',
				'في المعجم طابق الصنف النحوي (اسم = اسم، صفة = صفة، حال = حال).'
			],
			solutionStepsAr: [
				`a) ${variant.a1} | b) ${variant.a2}`,
				`T/F/NM: ${variant.tf1A}, ${variant.tf2A}, ${variant.tf3A}`,
				`مرجع "${variant.refWord}": ${variant.refAns}`,
				`المرادف: ${variant.synAns} | الضد: ${variant.oppAns}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. BEM Full Mock Reading Comprehension 2 (7 pts) — Heritage + Figures + Citizenship
// ═══════════════════════════════════════════════════════════════════════════════
const compBemMockHeritage4amT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4am_t3_comp_bem_mock_heritage',
	grade: '4am',
	trimesterId: 't3',
	domain: 'reading_comprehension',
	titleAr: 'فهم النص (موضوع تجريبي شامل BEM): التراث الجزائري والمواطنة المسؤولة (7 نقاط)',
	curriculumLessonId: 'eng_lesson_4am_t3_bem_reading_mastery',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'From Imam Ben Badis Schools to Active Youth Today',
				paragraphs: [
					'Almost a century ago, Imam Abdelhamid Ben Badis and Poet Mohamed El Aid Al Khalifa taught Algerian youth that knowledge and moral character are the pillars of national dignity. In the 1930s, free schools were built by generous Algerian citizens across cities and villages so every child could learn Arabic, Islamic values, and sciences.',
					'Today, Algerian pupils have inherited that proud spirit of solidarity. In Batna, a group of 4MS pupils recently organized a clean-up and heritage day near ancient Timgad. While some volunteers were collecting plastic litter around the site, others were guiding younger children to respect historic stones. [[They]] proved that loving Algeria means protecting both its people and its monuments.',
					'If our generation combines the wisdom of our scholars with active citizenship, Algeria will remain strong, educated, and clean for decades to come.'
				],
				source: 'BEM Mock Examination Reading Passage (4MS)',
				refWord: 'They',
				refAns: 'The group of 4MS pupils in Batna (the volunteers)',
				q1: 'Who built free schools in the 1930s and why?',
				a1: 'Generous Algerian citizens built them so every child could learn Arabic, Islamic values, and sciences.',
				q2: 'What did the 4MS volunteers in Batna do near Timgad?',
				a2: 'Some collected plastic litter around the site while others guided younger children to respect historic stones.',
				tf1Q: 'Imam Ben Badis and Mohamed El Aid Al Khalifa valued knowledge and moral character.',
				tf1A: 'True',
				tf2Q: 'The Batna volunteers ignored historic stones and left litter behind.',
				tf2A: 'False',
				tf2C: 'They collected plastic litter and guided younger children to respect historic stones.',
				tf3Q: 'Timgad is located in Batna.',
				tf3A: 'True',
				synTarget: 'foundations / supports (paragraph 1)',
				synAns: 'pillars',
				oppTarget: 'weak (paragraph 3)',
				oppAns: 'strong',
				mcqCorrect: 'Algerian youth continue the legacy of Ben Badis by combining education, solidarity, and protecting landmarks like Timgad.',
				mcqD1: 'No free schools were built in Algeria in the 1930s.',
				mcqD2: 'The 4MS pupils in Batna refused to clean the area around Timgad.',
				mcqD3: 'Protecting monuments has nothing to do with citizenship.'
			},
			{
				title: 'M-Zab Valley: A Lesson in Architecture and Community Solidarity',
				paragraphs: [
					'Located in the northern Algerian Sahara in Ghardaia, M-Zab Valley was founded in the eleventh century and classified by UNESCO as a World Heritage Site in 1982. Its five fortified towns, built around central mosques, have amazed architects for centuries because of their smart desert cooling design and water-sharing system.',
					'What makes M-Zab Valley even more inspiring is its living tradition of "Touiza", a noble form of Islamic and Algerian community solidarity. Whenever a family needs to build a house or repair an irrigation canal, neighbours gather voluntarily to help without asking for payment. [[This tradition]] has kept the community united since ancient times.',
					'Respect our heritage, preserve water, and practise solidarity wherever you live! If young Algerians keep these values alive, every town will flourish.'
				],
				source: 'BEM Mock Examination Reading Passage (4MS)',
				refWord: 'This tradition',
				refAns: 'Touiza (the noble tradition of voluntary community solidarity)',
				q1: 'When was M-Zab Valley founded and when was it classified by UNESCO?',
				a1: 'It was founded in the eleventh century and classified by UNESCO in 1982.',
				q2: 'What is "Touiza" according to paragraph 2?',
				a2: 'It is a noble form of Islamic and Algerian community solidarity where neighbours voluntarily help a family without payment.',
				tf1Q: 'M-Zab Valley is located in Ghardaia in the northern Algerian Sahara.',
				tf1A: 'True',
				tf2Q: 'In Touiza, neighbours ask for high payment before helping.',
				tf2A: 'False',
				tf2C: 'Neighbours gather voluntarily to help without asking for payment.',
				tf3Q: 'M-Zab Valley has five fortified towns built around central mosques.',
				tf3A: 'True',
				synTarget: 'prosper / grow well (paragraph 3)',
				synAns: 'flourish',
				oppTarget: 'divided (paragraph 2)',
				oppAns: 'united',
				mcqCorrect: 'M-Zab Valley unites brilliant Saharan Islamic architecture with the living solidarity tradition of Touiza.',
				mcqD1: 'M-Zab Valley is a coastal city in northern Algiers.',
				mcqD2: 'Touiza is a paid business company founded in 1982.',
				mcqD3: 'M-Zab Valley has no water-sharing system.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqD1, diagnosticFeedback: 'تحقق من الحقائق التاريخية والجغرافية في الفقرة الأولى.' },
				{ text: variant.mcqD2, diagnosticFeedback: 'النص يبيّن الطابع التطوعي المجاني للعمل الجماعي.' },
				{ text: variant.mcqD3, diagnosticFeedback: 'أعد قراءة الفقرتين الثانية والثالثة بتركيز.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Read "${variant.title}". Which statement best summarizes this BEM passage?`,
				questionTextAr: `اقرأ النص التجريبي "${variant.title}" واختر الملخص الصحيح:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'Part One: A / Reading Comprehension (07 pts)',
				points: 7,
				instruction: 'Read this full BEM mock passage carefully and answer all activities:',
				content: [
					buildEnglishPassageBlock({
						title: variant.title,
						paragraphs: variant.paragraphs,
						source: variant.source,
						numberedParagraphs: true
					}),
					{
						type: 'text',
						content: `Activity 1: Answer the following questions (02 pts):\n  a) ${variant.q1}\n  b) ${variant.q2}`,
						answer: `a) ${variant.a1}\nb) ${variant.a2}`,
						mark: '2'
					},
					{
						type: 'true_false',
						items: [
							{ q: variant.tf1Q, a: variant.tf1A, mark: '1' },
							{ q: variant.tf2Q, a: variant.tf2A, c: variant.tf2C, mark: '1' },
							{ q: variant.tf3Q, a: variant.tf3A, mark: '1' }
						]
					},
					{
						type: 'text',
						content: `Activity 3: What does the underlined word "${variant.refWord}" refer to? (01 pt)`,
						answer: `"${variant.refWord}" refers to: ${variant.refAns}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `Activity 4 (Lexis): Find in the text (01 pt):\n  a) Synonym of: ${variant.synTarget} = ......\n  b) Opposite of: ${variant.oppTarget} = ......`,
						answer: `a) ${variant.synAns}\nb) ${variant.oppAns}`,
						mark: '1'
					}
				]
			},
			hints: [
				'استخرج الأفكار من الفقرات الثلاث المترابطة (التراث + التطوع + الخاتمة).',
				'في أسئلة True/False صحّح المعلومة الخاطئة بجملة دقيقة من النص.',
				'راجع الجملة السابقة مباشرة لتحديد عائد الكلمة المسطّرة.'
			],
			solutionStepsAr: [
				`a) ${variant.a1} | b) ${variant.a2}`,
				`T/F: ${variant.tf1A}, ${variant.tf2A}, ${variant.tf3A}`,
				`مرجع "${variant.refWord}": ${variant.refAns}`,
				`المرادف: ${variant.synAns} | الضد: ${variant.oppAns}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. BEM Mastery of Language 1 (7 pts) — Conditional Type 1, Imperative, V-ing & -s/-ed
// ═══════════════════════════════════════════════════════════════════════════════
const langCond1Imperative4amT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4am_t3_lang_cond1_imperative',
	grade: '4am',
	trimesterId: 't3',
	domain: 'grammar_syntax',
	titleAr: 'قواعد اللغة (BEM): الشرط من النوع الأول، الأمر، الميول (+V-ing) والصوتيات (7 نقاط)',
	curriculumLessonId: 'eng_lesson_4am_t3_conditional_type1',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const set = rng.pick([
			{
				cond1Q: 'a) If every pupil (join) ...... a charity club, many orphans (feel) ...... happy.',
				cond1A: 'a) If every pupil joins a charity club, many orphans will feel happy.',
				cond2Q: 'b) Our city (not / stay) ...... clean if residents (not / use) ...... rubbish bins.',
				cond2A: 'b) Our city will not stay clean if residents do not use rubbish bins.',
				impQ: 'Rewrite as direct advice using the Imperative and "enjoy + V-ing" (02.5 pts):\n  a) You must be honest and respectful to your parents.\n  b) You must not waste food during Ramadan.\n  c) Salma enjoys (help) ...... her neighbours and dislikes (see) ...... litter.',
				impA: 'a) Be honest and respectful to your parents.\nb) Do not waste food during Ramadan.\nc) Salma enjoys helping her neighbours and dislikes seeing litter.',
				phonoWords: ['helped', 'shared', 'donated', 'worked', 'cleaned', 'planted'],
				c1: { header: '/t/', words: ['helped', 'worked'] },
				c2: { header: '/d/', words: ['shared', 'cleaned'] },
				c3: { header: '/id/', words: ['donated', 'planted'] },
				mcqQ: 'Choose the correct Conditional Type 1 sentence:',
				mcqCorrect: 'If we help needy neighbours, our community will prosper.',
				mcqD1: 'If we will help needy neighbours, our community will prosper.',
				mcqD2: 'If we helps needy neighbours, our community will prosper.',
				mcqD3: 'If we helped needy neighbours, our community will prosper.'
			},
			{
				cond1Q: 'a) If you (revise) ...... your BEM lessons daily, you (get) ...... an excellent average.',
				cond1A: 'a) If you revise your BEM lessons daily, you will get an excellent average.',
				cond2Q: 'b) People (trust) ...... a citizen if he (be) ...... honest and reliable.',
				cond2A: 'b) People will trust a citizen if he is honest and reliable.',
				impQ: 'Complete the tasks with Imperative and Gerund (V-ing) (02.5 pts):\n  a) You should support poor families in winter. (Imperative)\n  b) You should not be selfish with classmates. (Negative Imperative)\n  c) Young volunteers prefer (organize) ...... book drives and love (donate) ...... supplies.',
				impA: 'a) Support poor families in winter.\nb) Do not be selfish with classmates.\nc) Young volunteers prefer organizing book drives and love donating supplies.',
				phonoWords: ['citizens', 'helps', 'churches', 'neighbours', 'acts', 'boxes'],
				c1: { header: '/s/', words: ['helps', 'acts'] },
				c2: { header: '/z/', words: ['citizens', 'neighbours'] },
				c3: { header: '/iz/', words: ['churches', 'boxes'] },
				mcqQ: 'Choose the grammatically correct sentence with "enjoy" and Imperative:',
				mcqCorrect: 'Be generous, and enjoy helping others in your neighbourhood.',
				mcqD1: 'Are generous, and enjoy to help others in your neighbourhood.',
				mcqD2: 'Be generous, and enjoy to help others in your neighbourhood.',
				mcqD3: 'Being generous, and enjoy helping others in your neighbourhood.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			set.mcqCorrect,
			[
				{ text: set.mcqD1, diagnosticFeedback: 'تذكّر: لا نضع will بعد If، ونستعمل Be للأمر و enjoy + V-ing.' },
				{ text: set.mcqD2, diagnosticFeedback: 'راجع توافق الفعل مع we/he أو قاعدة enjoy + V-ing.' },
				{ text: set.mcqD3, diagnosticFeedback: 'في النوع الأول نستعمل الحاضر البسيط بعد If، وفي الأمر نبدأ بأصل الفعل.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: set.mcqQ,
				questionTextAr: 'اختر الجملة السليمة في الشرط والأمر والميول (BEM):',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: set.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'Part One: B / Mastery of Language (07 pts)',
				points: 7,
				instruction: 'Do the following BEM grammar and phonology activities:',
				content: [
					{
						type: 'text',
						content: `Activity 1: Put the verbs in brackets into the right form (Conditional Type 1) (02.5 pts):\n  ${set.cond1Q}\n  ${set.cond2Q}`,
						answer: `${set.cond1A}\n${set.cond2A}`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `Activity 2: ${set.impQ}`,
						answer: set.impA,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `Activity 3: Classify these words according to their final sound (02 pts):\nWords: ${set.phonoWords.join(' - ')}`
					},
					buildEnglishPhonologyTableBlock({
						columns: [
							{ header: set.c1.header, words: set.c1.words, mark: '0.5' },
							{ header: set.c2.header, words: set.c2.words, mark: '0.75' },
							{ header: set.c3.header, words: set.c3.words, mark: '0.75' }
						]
					})
				]
			},
			hints: [
				'في Conditional Type 1: بعد If حاضر بسيط (وليس will)، وفي النتيجة will/will not + stem.',
				'في الأمر مع to be نستعمل (Be / Do not be)، وبعد enjoy و dislike نستعمل V-ing دائماً.',
				'انطق آخر صوت قبل النهاية لتصنيف الكلمات في الجدول الصوتي بدقة.'
			],
			solutionStepsAr: [
				`${set.cond1A} | ${set.cond2A}`,
				set.impA,
				`${set.c1.header}: ${set.c1.words.join(', ')} | ${set.c2.header}: ${set.c2.words.join(', ')} | ${set.c3.header}: ${set.c3.words.join(', ')}`
			],
			finalAnswer: set.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. BEM Full Mock Mastery of Language 2 (7 pts) — All-Year Mixed Revision
// ═══════════════════════════════════════════════════════════════════════════════
const langBemMixedMastery4amT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4am_t3_lang_bem_mixed_mastery',
	grade: '4am',
	trimesterId: 't3',
	domain: 'grammar_tenses',
	titleAr: 'قواعد اللغة (مراجعة شاملة BEM): تصحيح الأخطاء، جميع أزمنة 4AM، البادئات والصوتيات (7 نقاط)',
	curriculumLessonId: 'eng_lesson_4am_t3_bem_reading_mastery',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				spotQ: 'Activity 1: Spot and correct FOUR mistakes in this BEM sentence (02 pts):\n"imam ben badis were born in constantine and he has founded the association in 1931."',
				spotA: 'Imam Ben Badis was born in Constantine and he founded the Association in 1931. (Capitals: Imam Ben Badis, Constantine; was born; founded in Past Simple for 1931).',
				mixedQ: 'Activity 2: Put the verbs in brackets into the right form (All-Year BEM Mix) (03 pts):\n  a) The Great Mosque of Tlemcen (build) ...... in 1082.\n  b) I (never / visit) ...... Tassili n-Ajjer, yet it is (famous) ...... desert park in Algeria.\n  c) If you (respect) ...... your neighbours, they (love) ...... you.',
				mixedA: 'a) was built\nb) have never visited / the most famous\nc) respect / will love',
				phonoTitle: 'Classify these words according to their final "-ed" sound (02 pts):',
				phonoWords: ['founded', 'classified', 'worked', 'visited', 'inspired', 'helped'],
				c1: { header: '/t/', words: ['worked', 'helped'] },
				c2: { header: '/d/', words: ['classified', 'inspired'] },
				c3: { header: '/id/', words: ['founded', 'visited'] },
				mcqQ: 'Choose the completely error-free BEM sentence:',
				mcqCorrect: 'The Casbah of Algiers was classified by UNESCO in 1992, and it has attracted visitors ever since.',
				mcqD1: 'The Casbah of Algiers were classified by UNESCO in 1992, and it attracted visitors since.',
				mcqD2: 'The Casbah of Algiers was classify by UNESCO in 1992, and it has attract visitors ever since.',
				mcqD3: 'The Casbah of Algiers is classified by UNESCO in 1992, and it have attracted visitors ever since.'
			},
			{
				spotQ: 'Activity 1: Spot and correct FOUR mistakes in this BEM sentence (02 pts):\n"if a citizen is unhonest, people does not trust him in algeria."',
				spotA: 'If a citizen is dishonest, people do not trust him in Algeria. (Capital If, dishonest not unhonest, people do not, Capital Algeria).',
				mixedQ: 'Activity 2: Put the verbs or adjectives into the right form (All-Year BEM Mix) (03 pts):\n  a) Kassaman (write) ...... by Moufdi Zakaria in 1955.\n  b) While we (plant) ...... olive trees, our headmaster (take) ...... photos.\n  c) Charity is (good) ...... way to strengthen solidarity.',
				mixedA: 'a) was written\nb) were planting / took\nc) the best',
				phonoTitle: 'Classify these words according to their silent letter (02 pts):',
				phonoWords: ['know', 'honest', 'climb', 'write', 'should', 'listen'],
				c1: { header: 'Silent k / w', words: ['know', 'write'] },
				c2: { header: 'Silent h / b', words: ['honest', 'climb'] },
				c3: { header: 'Silent l / t', words: ['should', 'listen'] },
				mcqQ: 'Choose the completely error-free BEM sentence:',
				mcqCorrect: 'If every pupil works honestly, our country will achieve the best results.',
				mcqD1: 'If every pupil will work honestly, our country will achieve the goodest results.',
				mcqD2: 'If every pupil work honestly, our country achieve the best results.',
				mcqD3: 'If every pupil works unhonestly, our country will achieved the best results.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqD1, diagnosticFeedback: 'انتبه لعدم وضع will بعد If ولتوافق المفرد was والتفضيل الشاذ the best.' },
				{ text: variant.mcqD2, diagnosticFeedback: 'تأكد من التصريف الثالث بعد was/has ومن -s المفرد الغائب.' },
				{ text: variant.mcqD3, diagnosticFeedback: 'تأكد من الزمن الماضي مع 1992 ومن البادئة dishonest والفعل المجرد بعد will.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQ,
				questionTextAr: 'اختر الجملة الخالية تماماً من الأخطاء وفق منهجية BEM:',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'Part One: B / Mastery of Language — Full BEM Mock (07 pts)',
				points: 7,
				instruction: 'Complete this comprehensive BEM revision covering all three sequences:',
				content: [
					{
						type: 'text',
						content: variant.spotQ,
						answer: variant.spotA,
						mark: '2'
					},
					{
						type: 'text',
						content: variant.mixedQ,
						answer: variant.mixedA,
						mark: '3'
					},
					{
						type: 'text',
						content: `Activity 3: ${variant.phonoTitle}\nWords: ${variant.phonoWords.join(' - ')}`
					},
					buildEnglishPhonologyTableBlock({
						columns: [
							{ header: variant.c1.header, words: variant.c1.words, mark: '0.5' },
							{ header: variant.c2.header, words: variant.c2.words, mark: '0.75' },
							{ header: variant.c3.header, words: variant.c3.words, mark: '0.75' }
						]
					})
				]
			},
			hints: [
				'في تصحيح الأخطاء: راجع الحروف الكبيرة (أسماء العلم وبداية الجملة)، البادئات، وتصريف الأزمنة.',
				'استحضر قواعد الفصول الثلاثة معاً: Past Passive + Present Perfect + Superlative + Conditional Type 1.',
				'لا تترك أي كلمة خارج الجدول الصوتي وتأكد من الصوت الأخير المنطوق.'
			],
			solutionStepsAr: [
				variant.spotA,
				variant.mixedA,
				`${variant.c1.header}: ${variant.c1.words.join(', ')} | ${variant.c2.header}: ${variant.c2.words.join(', ')} | ${variant.c3.header}: ${variant.c3.words.join(', ')}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. BEM Written Expression (6 pts) — Open Letter / Article on Citizenship & Charity
// ═══════════════════════════════════════════════════════════════════════════════
const writeCitizenshipBem4amT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4am_t3_write_citizenship_bem',
	grade: '4am',
	trimesterId: 't3',
	domain: 'written_expression',
	titleAr: 'الوضعية الإدماجية (BEM): رسالة مفتوحة أو مقال حول المواطنة والتكافل الاجتماعي (6 نقاط)',
	curriculumLessonId: 'eng_lesson_4am_t3_bem_written_expression',
	defaultPoints: 6,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const topic = rng.pick([
			{
				title: 'Open Letter to My Algerian Classmates: Let Us Build a Caring Community',
				notes: [
					'Opening: Islamic and Algerian values teach us mercy, honesty, and solidarity',
					'Practical charity actions (enjoy / prefer + V-ing): helping orphans, donating school bags, visiting elderly neighbours',
					'Direct civic advice (Imperative): Be truthful, keep streets clean, do not waste food or water',
					'Positive future impact (Conditional Type 1): If we unite and volunteer, Algeria will prosper'
				],
				modelAnswer:
					'Dear classmates, being a responsible Algerian citizen starts with sincere Islamic values such as honesty, mercy, and solidarity. In our school charity club, we enjoy helping orphans, donating warm clothes and school bags, and supporting elderly neighbours. Therefore, I invite all of you to take action today! Be truthful in your deeds, respect your parents and teachers, keep our streets clean, and do not waste water or food. Remember that small kind acts make a huge difference. If every young pupil volunteers and cares for others, our communities will become happier and Algeria will shine even brighter. Best regards, A 4MS Pupil.'
			},
			{
				title: 'School Magazine Article: How to Be an Ideal Citizen in Algeria',
				notes: [
					'Definition: Good citizenship means serving others, respecting laws, and caring for our heritage',
					'Everyday duties (Imperative): Help needy families, protect public property, plant trees, never tell lies',
					'Volunteering habits (love / enjoy + V-ing): joining Touiza clean-ups and Ramadan food drives',
					'Closing promise (Conditional Type 1): If young people act responsibly, future generations will enjoy a strong homeland'
				],
				modelAnswer:
					'How to Be an Ideal Citizen in Algeria. Good citizenship is not a difficult title; it is shown through honest manners and active care for our society and heritage. First, responsible pupils enjoy participating in Touiza neighbourhood clean-ups and Ramadan food drives for needy families. Second, every young citizen should follow clear daily rules: respect your parents and neighbours, protect public schools and mosques, plant trees, and never tell lies. Do not wait for others to improve your town! If our generation combines hard study with Islamic solidarity and volunteering, future generations will inherit a clean, united, and prosperous Algeria.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			'Combine Imperative advice, Conditional Type 1 (If + Present Simple, will + stem), enjoy/prefer + V-ing, and Islamic/Algerian solidarity vocabulary.',
			[
				{ text: 'Write only a geographical description of a foreign continent.', diagnosticFeedback: 'الموضوع محوره المواطنة والتكافل الاجتماعي في الجزائر.' },
				{ text: 'Use only Past Simple without giving any advice or future vision.', diagnosticFeedback: 'وضعية المواطنة تعتمد على صيغة الأمر والشرط من النوع الأول و V-ing.' },
				{ text: 'Write fragmented notes without connectors or punctuation.', diagnosticFeedback: 'التماسك وسلامة اللغة يمثلان نصف علامة الوضعية الإدماجية.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: 'How can a 4MS candidate achieve 6/6 on the BEM Citizenship Situation of Integration?',
				questionTextAr: 'كيف يضمن تلميذ الرابعة متوسط 6/6 في وضعية المواطنة والتكافل في BEM؟',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'بتوظيف صيغة الأمر، والشرط من النوع الأول، و enjoy/prefer + V-ing مع مفردات التضامن والتكافل واحترام شكل الرسالة أو المقال.'
			},
			sujetExercise: {
				customTitle: 'Part Two: Situation of Integration — BEM (06 pts)',
				points: 6,
				instruction: 'Write a well-organized BEM open letter or article (8 to 12 lines):',
				content: [
					buildEnglishWrittenExpressionBlock({
						topicOnePrompt: `Write a piece titled "${topic.title}" encouraging your peers to practise solidarity, charity, and active citizenship.`,
						topicOneNotes: topic.notes,
						topicTwoPrompt:
							'Your school is organizing a Ramadan Solidarity Campaign for orphans and needy families. Write a short speech or announcement inviting pupils and parents to donate and volunteer, using Imperatives and Conditional Type 1.',
						modelAnswer: topic.modelAnswer,
						rubricSummary:
							'Relevance & Format (2 pts) + Coherence & Connectors (1.5 pts) + Imperative / Conditional 1 / V-ing Accuracy (1.5 pts) + Mechanics & Neatness (1 pt).',
						mark: '6'
					})
				]
			},
			hints: [
				'احترم الشكل المطلوب (تحية وخاتمة للرسالة المفتوحة، أو عنوان واضح للمقال).',
				'وظّف على الأقل جملتي أمر (مثبت ومنفي)، وجملة شرط من النوع الأول (If + Present, will + stem).',
				'استعمل مفردات التكافل (solidarity, orphans, charity, volunteer, neighbours) وراجع الإملاء وعلامات الترقيم.'
			],
			solutionStepsAr: [
				`العنوان والشكل: ${topic.title}`,
				'العرض: توظيف enjoy/prefer + V-ing مع أعمال التطوع وصيغة الأمر الإيجابية والسلبية.',
				'الخاتمة: توظيف جملة شرطية من النوع الأول (Conditional Type 1) تبرز الأثر المستقبلي للتضامن.'
			],
			finalAnswer: topic.modelAnswer
		};
	}
};

export const TEMPLATES_4AM_T3: EnglishParameterizedTemplate[] = [
	compCharityCitizenship4amT3,
	compBemMockHeritage4amT3,
	langCond1Imperative4amT3,
	langBemMixedMastery4amT3,
	writeCitizenshipBem4amT3
];
