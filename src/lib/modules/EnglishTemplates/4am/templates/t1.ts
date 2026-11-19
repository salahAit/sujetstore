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
// 1. BEM Reading Comprehension 1 (7 pts) — Algerian Universal Landmarks
// ═══════════════════════════════════════════════════════════════════════════════
const compAlgerianLandmarks4amT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4am_t1_comp_algerian_landmarks',
	grade: '4am',
	trimesterId: 't1',
	domain: 'reading_comprehension',
	titleAr: 'فهم النص (BEM): المعالم التاريخية الجزائرية والعالمية (7 نقاط)',
	curriculumLessonId: 'eng_lesson_4am_t1_passive_voice_past',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'The Casbah of Algiers and The Great Mosque of Tlemcen',
				paragraphs: [
					'Algeria is home to remarkable Islamic and historical landmarks that tell the story of centuries of civilization. In the heart of the capital stands The Casbah of Algiers, a historic citadel overlooking the Mediterranean Sea. [[It]] was classified by UNESCO as a World Heritage Site in 1992 because of its narrow winding alleys, traditional white houses, and ancient mosques.',
					'In western Algeria, The Great Mosque of Tlemcen is another priceless architectural gem. It was built in 1082 during the Almoravid era and later expanded with a finely decorated dome and courtyard. The Great Mosque of Tlemcen is as historic as The Casbah, and both monuments attract researchers and visitors from around the world.',
					'Preserving these landmarks is essential; therefore, Algerian architects and youth clubs work together to protect their heritage for future generations.'
				],
				source: 'Adapted from Algerian Heritage Guide (BEM 4MS)',
				refWord: 'It',
				refAns: 'The Casbah of Algiers',
				factRows: [
					{ field: 'Landmark 1 & Classification Year', val: 'The Casbah of Algiers (1992)' },
					{ field: 'Landmark 2 & Location', val: 'The Great Mosque of Tlemcen (Western Algeria)' },
					{ field: 'Year of Construction (Landmark 2)', val: '1082 (Almoravid era)' }
				],
				q1: 'Why was The Casbah of Algiers classified by UNESCO in 1992?',
				a1: 'Because of its narrow winding alleys, traditional white houses, and ancient mosques.',
				q2: 'Who works together to protect these Algerian landmarks?',
				a2: 'Algerian architects and youth clubs work together to protect them.',
				tf1Q: 'The Casbah of Algiers overlooks the Mediterranean Sea.',
				tf1A: 'True',
				tf2Q: 'The Great Mosque of Tlemcen was built in 1992.',
				tf2A: 'False',
				tf2C: 'It was built in 1082 during the Almoravid era.',
				synTarget: 'invaluable / very precious (paragraph 2)',
				synAns: 'priceless',
				oppTarget: 'wide (paragraph 1)',
				oppAns: 'narrow',
				mcqCorrect: 'The Casbah of Algiers and The Great Mosque of Tlemcen are historic Algerian landmarks that reflect rich Islamic architecture.',
				mcqD1: 'The Casbah of Algiers was built in 1992 in western Algeria.',
				mcqD2: 'The Great Mosque of Tlemcen is located in Constantine.',
				mcqD3: 'UNESCO refused to list Algerian historical sites.'
			},
			{
				title: 'The Bridges of Constantine and Beni Hammad Fort',
				paragraphs: [
					'Constantine, known as the City of Bridges, is built on a dramatic rocky plateau separated by the deep Rhumel Gorge. Its iconic suspension bridges, including Sidi M-Cid Bridge and Mellah Slimane Bridge, were constructed in the early twentieth century to connect the city neighbourhoods.',
					'Further west in the province of M-Sila lies Beni Hammad Fort (Al Qal-a of Beni Hammad). [[It]] was founded in 1007 by Hammad ibn Buluggin as the first capital of the Hammadid dynasty. Today, its tall minaret and stone ruins remain a proud witness to medieval Algerian Islamic engineering.',
					'Since both sites carry extraordinary cultural value, visitors admire them as living symbols of Algeria glorious history.'
				],
				source: 'Adapted from Algerian Heritage Guide (BEM 4MS)',
				refWord: 'It',
				refAns: 'Beni Hammad Fort (Al Qal-a of Beni Hammad)',
				factRows: [
					{ field: 'City of Bridges', val: 'Constantine (Rhumel Gorge)' },
					{ field: 'Beni Hammad Fort Location', val: 'Province of M-Sila' },
					{ field: 'Founder & Year of Beni Hammad Fort', val: 'Hammad ibn Buluggin in 1007' }
				],
				q1: 'Why were the suspension bridges of Constantine constructed?',
				a1: 'They were constructed to connect the city neighbourhoods across the deep Rhumel Gorge.',
				q2: 'What remains today as a witness to medieval Islamic engineering at Beni Hammad Fort?',
				a2: 'Its tall minaret and stone ruins remain today.',
				tf1Q: 'Constantine is separated by the deep Rhumel Gorge.',
				tf1A: 'True',
				tf2Q: 'Beni Hammad Fort was founded in 1907.',
				tf2A: 'False',
				tf2C: 'It was founded in 1007 by Hammad ibn Buluggin.',
				synTarget: 'famous / emblematic (paragraph 1)',
				synAns: 'iconic',
				oppTarget: 'shallow (paragraph 1)',
				oppAns: 'deep',
				mcqCorrect: 'The Bridges of Constantine and Beni Hammad Fort are remarkable Algerian monuments highlighting historic engineering.',
				mcqD1: 'Beni Hammad Fort is located on the Mediterranean beach of Oran.',
				mcqD2: 'Constantine has no bridges or canyons.',
				mcqD3: 'Hammad ibn Buluggin built Sidi M-Cid Bridge in 1007.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqD1, diagnosticFeedback: 'تحقق من التواريخ والمواقع المذكورة في الفقرة الأولى والثانية.' },
				{ text: variant.mcqD2, diagnosticFeedback: 'هذه المعلومة تناقض المعطيات الجغرافية في النص.' },
				{ text: variant.mcqD3, diagnosticFeedback: 'راجع اسم المؤسس والسنة الصحيحة في النص.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Read "${variant.title}". Choose the most accurate summary of the text:`,
				questionTextAr: `اقرأ نص "${variant.title}" واختر الملخص الأدق:`,
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
						type: 'table',
						headers: ['Landmark Information', 'Details from the Text'],
						cells: [],
						rows: variant.factRows.map((r) => [
							{ content: r.field, bold: true },
							{ content: '....................................', answer: r.val, mark: '0.5' }
						]),
						align: 'left',
						borders: 'grid',
						headerBackground: true,
						width: 'full'
					},
					{
						type: 'text',
						content: `Activity 2: Answer the following questions from the text (02 pts):\n  a) ${variant.q1}\n  b) ${variant.q2}`,
						answer: `a) ${variant.a1}\nb) ${variant.a2}`,
						mark: '2'
					},
					{
						type: 'true_false',
						items: [
							{ q: variant.tf1Q, a: variant.tf1A, mark: '0.75' },
							{ q: variant.tf2Q, a: variant.tf2A, c: variant.tf2C, mark: '0.75' }
						]
					},
					{
						type: 'text',
						content: `Activity 4: What does the underlined word "${variant.refWord}" refer to? (01 pt)`,
						answer: `"${variant.refWord}" refers to: ${variant.refAns}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `Activity 5 (Lexis): Find in the text (01 pt):\n  a) Closest in meaning to: ${variant.synTarget} = ......\n  b) Opposite in meaning to: ${variant.oppTarget} = ......`,
						answer: `a) ${variant.synAns}\nb) ${variant.oppAns}`,
						mark: '1'
					}
				]
			},
			hints: [
				'استخرج التواريخ والمواقع بدقة لملء جدول البطاقة التقنية (Fact File).',
				'في سؤال Why أجب دائماً بـ Because أو To.',
				'راجع الجملة التي تسبق الضمير المسطّر مباشرة لتحديد عائده.'
			],
			solutionStepsAr: [
				variant.factRows.map((r) => `${r.field}: ${r.val}`).join(' | '),
				`a) ${variant.a1} | b) ${variant.a2}`,
				`مرجع "${variant.refWord}": ${variant.refAns}`,
				`المرادف: ${variant.synAns} | الضد: ${variant.oppAns}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. BEM Reading Comprehension 2 (7 pts) — Outstanding Algerian & Muslim Figures
// ═══════════════════════════════════════════════════════════════════════════════
const compOutstandingFigures4amT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4am_t1_comp_outstanding_figures',
	grade: '4am',
	trimesterId: 't1',
	domain: 'reading_comprehension',
	titleAr: 'فهم النص (BEM): الشخصيات الجزائرية والإسلامية البارزة (7 نقاط)',
	curriculumLessonId: 'eng_lesson_4am_t1_chronology_itinerary',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'Imam Abdelhamid Ben Badis: Pioneer of Knowledge and Reform',
				paragraphs: [
					'Imam Abdelhamid Ben Badis was one of the greatest Algerian scholars and reformers of the twentieth century. He was born on December 4th, 1889, in Constantine. From an early age, he memorized the Holy Quran and studied Islamic sciences at Al-Zaytuna University in Tunis.',
					'In 1931, Imam Ben Badis founded the Association of Algerian Muslim Scholars together with faithful companions such as Sheikh Mohamed Bachir El Ibrahimi and Sheikh Moubarek El Mili. [[They]] opened dozens of free schools and published newspapers like Al-Shihab and Al-Basaer to educate Algerian children and protect their Islamic and Arabic identity.',
					'Imam Ben Badis passed away on April 16th, 1940. Because of his noble legacy, Algeria celebrates April 16th every year as National Knowledge Day (Yawm al-Ilm).'
				],
				source: 'Adapted from Algerian Outstanding Figures (BEM 4MS)',
				refWord: 'They',
				refAns: 'Imam Ben Badis and his companions (Sheikh Mohamed Bachir El Ibrahimi and Sheikh Moubarek El Mili)',
				idRows: [
					{ k: 'Full Name', v: 'Imam Abdelhamid Ben Badis' },
					{ k: 'Date & Place of Birth', v: 'December 4th, 1889 in Constantine' },
					{ k: 'Major Achievement (1931)', v: 'Founded the Association of Algerian Muslim Scholars' },
					{ k: 'Date of Death', v: 'April 16th, 1940' }
				],
				q1: 'Why did the Association open free schools and publish newspapers?',
				a1: 'To educate Algerian children and protect their Islamic and Arabic identity.',
				q2: 'How does Algeria honour Imam Ben Badis every year on April 16th?',
				a2: 'Algeria celebrates April 16th as National Knowledge Day (Yawm al-Ilm).',
				synTarget: 'dedicated / loyal (paragraph 2)',
				synAns: 'faithful',
				oppTarget: 'paid (paragraph 2)',
				oppAns: 'free',
				mcqCorrect: 'Imam Abdelhamid Ben Badis founded the Association of Algerian Muslim Scholars and inspired National Knowledge Day.',
				mcqD1: 'Imam Ben Badis was born in 1940 in Algiers.',
				mcqD2: 'Imam Ben Badis never founded any schools or newspapers.',
				mcqD3: 'National Knowledge Day is celebrated on December 4th.'
			},
			{
				title: 'Abdurrahman Ibn Khaldun: Founder of Modern Sociology',
				paragraphs: [
					'Abdurrahman Ibn Khaldun was a brilliant North African Muslim historian, judge, and scholar who was born in Tunis in 1332 CE. Throughout his rich career, he travelled across North Africa and spent several productive years in Algeria, especially at Qalat Bani Salama near Tiaret.',
					'In 1377, Ibn Khaldun wrote his masterpiece "Al-Muqaddimah" (The Introduction), in which [[he]] studied how civilizations rise, prosper, and decline. Because his method relied on careful evidence and social analysis, scholars worldwide recognize him as the founder of sociology and modern historiography.',
					'Ibn Khaldun passed away in Cairo in 1406 CE, leaving behind an intellectual monument that universities still teach today.'
				],
				source: 'Adapted from Islamic & Maghreb Figures (BEM 4MS)',
				refWord: 'he',
				refAns: 'Abdurrahman Ibn Khaldun',
				idRows: [
					{ k: 'Full Name', v: 'Abdurrahman Ibn Khaldun' },
					{ k: 'Year & Place of Birth', v: '1332 CE in Tunis' },
					{ k: 'Famous Book (1377)', v: 'Al-Muqaddimah (The Introduction)' },
					{ k: 'Year & Place of Death', v: '1406 CE in Cairo' }
				],
				q1: 'Where in Algeria did Ibn Khaldun spend several productive years?',
				a1: 'He spent several productive years at Qalat Bani Salama near Tiaret.',
				q2: 'Why do scholars recognize Ibn Khaldun as the founder of sociology?',
				a2: 'Because his method relied on careful evidence and social analysis in studying civilizations.',
				synTarget: 'great work / chef-d-oeuvre (paragraph 2)',
				synAns: 'masterpiece',
				oppTarget: 'ancient (paragraph 2)',
				oppAns: 'modern',
				mcqCorrect: 'Ibn Khaldun wrote Al-Muqaddimah in 1377 and established scientific social history and sociology.',
				mcqD1: 'Ibn Khaldun wrote Al-Muqaddimah in Cairo in 1977.',
				mcqD2: 'Ibn Khaldun never visited Algeria during his lifetime.',
				mcqD3: 'Ibn Khaldun was primarily a painter of landscapes.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqD1, diagnosticFeedback: 'تأكد من التواريخ والأماكن الواردة في النص.' },
				{ text: variant.mcqD2, diagnosticFeedback: 'النص يذكر العكس بوضوح في الفقرة الأولى والثانية.' },
				{ text: variant.mcqD3, diagnosticFeedback: 'تحقق من المناسبة والتخصص المذكورين في النص.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Read "${variant.title}". Which sentence is true according to the biography?`,
				questionTextAr: `اقرأ سيرة "${variant.title}" واختر العبارة الصحيحة:`,
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
				instruction: 'Read the biography carefully and complete the BEM reading tasks:',
				content: [
					buildEnglishPassageBlock({
						title: variant.title,
						paragraphs: variant.paragraphs,
						source: variant.source,
						numberedParagraphs: true
					}),
					{
						type: 'table',
						headers: ['ID Card Field', 'Information from Text'],
						cells: [],
						rows: variant.idRows.map((r) => [
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
						content: `Activity 2: Answer the following questions (03 pts):\n  a) ${variant.q1}\n  b) ${variant.q2}`,
						answer: `a) ${variant.a1}\nb) ${variant.a2}`,
						mark: '3'
					},
					{
						type: 'text',
						content: `Activity 3: What does the underlined pronoun "${variant.refWord}" in paragraph 2 refer to? (01 pt)`,
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
				'املأ بطاقة التعريف (ID Card) بدقة دون إضافة كلمات غير ضرورية.',
				'استخرج السبب والغاية من الفقرة الثانية والثالثة للإجابة عن أسئلة Why و How.',
				'تطابق الصنف النحوي ضروري في سؤال المرادف والضد.'
			],
			solutionStepsAr: [
				variant.idRows.map((r) => `${r.k}: ${r.v}`).join(' | '),
				`a) ${variant.a1} | b) ${variant.a2}`,
				`مرجع "${variant.refWord}": ${variant.refAns}`,
				`المرادف: ${variant.synAns} | الضد: ${variant.oppAns}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. BEM Mastery of Language 1 (7 pts) — Passive Voice, as...as & Final -ed
// ═══════════════════════════════════════════════════════════════════════════════
const langPassiveComparative4amT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4am_t1_lang_passive_comparative',
	grade: '4am',
	trimesterId: 't1',
	domain: 'grammar_syntax',
	titleAr: 'قواعد اللغة (BEM): المبني للمجهول في الماضي، as...as / not as...as ونطق -ed (7 نقاط)',
	curriculumLessonId: 'eng_lesson_4am_t1_passive_voice_past',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const set = rng.pick([
			{
				p1Q: 'a) Moufdi Zakaria wrote the Algerian national anthem Kassaman in 1955.',
				p1A: 'a) The Algerian national anthem Kassaman was written by Moufdi Zakaria in 1955.',
				p2Q: 'b) UNESCO classified The Casbah of Algiers and Timgad as World Heritage Sites.',
				p2A: 'b) The Casbah of Algiers and Timgad were classified as World Heritage Sites by UNESCO.',
				c1Q: 'a) Djamaa El Djazair minaret is taller than Maqam Echahid. (Use: not as ... as)',
				c1A: 'a) Maqam Echahid is not as tall as Djamaa El Djazair minaret.',
				c2Q: 'b) Tlemcen is historic. Constantine is historic too. (Use: as ... as)',
				c2A: 'b) Tlemcen is as historic as Constantine.',
				edWords: ['worked', 'classified', 'founded', 'helped', 'designed', 'constructed'],
				colT: ['worked', 'helped'],
				colD: ['classified', 'designed'],
				colId: ['founded', 'constructed'],
				mcqQ: 'Choose the correct Past Simple Passive transformation of: "Imam Ben Badis founded Al-Shihab newspaper in 1925."',
				mcqCorrect: 'Al-Shihab newspaper was founded by Imam Ben Badis in 1925.',
				mcqD1: 'Al-Shihab newspaper was found by Imam Ben Badis in 1925.',
				mcqD2: 'Al-Shihab newspaper were founded by Imam Ben Badis in 1925.',
				mcqD3: 'Al-Shihab newspaper is founded by Imam Ben Badis in 1925.'
			},
			{
				p1Q: 'a) Almoravid architects built The Great Mosque of Tlemcen in 1082.',
				p1A: 'a) The Great Mosque of Tlemcen was built by Almoravid architects in 1082.',
				p2Q: 'b) Fatima al-Fihri founded Al-Qarawiyyin University in 859 CE.',
				p2A: 'b) Al-Qarawiyyin University was founded by Fatima al-Fihri in 859 CE.',
				c1Q: 'a) Timgad is older than Beni Hammad Fort. (Use: not as ... as)',
				c1A: 'a) Beni Hammad Fort is not as old as Timgad.',
				c2Q: 'b) Sheikh El Ibrahimi was eloquent. Poet Mohamed El Aid Al Khalifa was eloquent too. (Use: as ... as)',
				c2A: 'b) Sheikh El Ibrahimi was as eloquent as Poet Mohamed El Aid Al Khalifa.',
				edWords: ['developed', 'discovered', 'visited', 'watched', 'named', 'created'],
				colT: ['developed', 'watched'],
				colD: ['discovered', 'named'],
				colId: ['visited', 'created'],
				mcqQ: 'Choose the correct rewrite using "not as ... as" for: "Timgad is older than Beni Hammad Fort."',
				mcqCorrect: 'Beni Hammad Fort is not as old as Timgad.',
				mcqD1: 'Beni Hammad Fort is not as older as Timgad.',
				mcqD2: 'Timgad is not as old as Beni Hammad Fort.',
				mcqD3: 'Beni Hammad Fort is not as old than Timgad.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			set.mcqCorrect,
			[
				{ text: set.mcqD1, diagnosticFeedback: 'تأكد من الصفة الأصلية بين as...as ومن الفرق بين found و founded.' },
				{ text: set.mcqD2, diagnosticFeedback: 'راجع تطابق المفرد والجمع (was/were) أو ترتيب الطرفين في المقارنة.' },
				{ text: set.mcqD3, diagnosticFeedback: 'راجع زمن الماضي (was) واستعمال as الثانية بدل than.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: set.mcqQ,
				questionTextAr: 'اختر التحويل النحوي الصحيح وفق منهجية BEM:',
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
				instruction: 'Do the following BEM grammar and phonology tasks:',
				content: [
					{
						type: 'text',
						content: `Activity 1: Rewrite the following sentences in the Passive Voice (03 pts):\n  ${set.p1Q}\n  ${set.p2Q}`,
						answer: `${set.p1A}\n${set.p2A}`,
						mark: '3'
					},
					{
						type: 'text',
						content: `Activity 2: Rewrite the sentences using "as ... as" or "not as ... as" (02 pts):\n  ${set.c1Q}\n  ${set.c2Q}`,
						answer: `${set.c1A}\n${set.c2A}`,
						mark: '2'
					},
					{
						type: 'text',
						content: `Activity 3: Classify these verbs according to their final "-ed" pronunciation (02 pts):\nVerbs: ${set.edWords.join(' - ')}`
					},
					buildEnglishPhonologyTableBlock({
						columns: [
							{ header: '/t/', words: set.colT, mark: '0.5' },
							{ header: '/d/', words: set.colD, mark: '0.5' },
							{ header: '/id/', words: set.colId, mark: '1' }
						]
					})
				]
			},
			hints: [
				'في المبني للمجهول: المفعول به + was (للمفرد) أو were (للجمع) + التصريف الثالث + by.',
				'في (not as ... as) اقلب الطرفين وأرجع الصفة إلى أصلها المجرد دون -er أو more.',
				'في جدول (-ed): /id/ بعد /t/ و /d/ فقط؛ وانتبه أن classified تنتهي بصوت علة فتأخذ /d/.'
			],
			solutionStepsAr: [
				`${set.p1A} | ${set.p2A}`,
				`${set.c1A} | ${set.c2A}`,
				`/t/: ${set.colT.join(', ')} | /d/: ${set.colD.join(', ')} | /id/: ${set.colId.join(', ')}`
			],
			finalAnswer: set.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. BEM Mastery of Language 2 (7 pts) — Cause/Effect, Sequencers & Diphthongs
// ═══════════════════════════════════════════════════════════════════════════════
const langCauseDiphthongs4amT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4am_t1_lang_cause_diphthongs',
	grade: '4am',
	trimesterId: 't1',
	domain: 'discourse_cohesion',
	titleAr: 'قواعد اللغة (BEM): أدوات السبب والنتيجة، الترتيب الزمني، والأصوات المزدوجة (Diphthongs) (7 نقاط)',
	curriculumLessonId: 'eng_lesson_4am_t1_diphthongs_clusters_ed',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				ce1Q: 'a) Timgad has well-preserved ancient streets. Thousands of visitors explore it. (Combine with "therefore")',
				ce1A: 'a) Timgad has well-preserved ancient streets; therefore, thousands of visitors explore it.',
				ce2Q: 'b) Sheikh Moubarek El Mili loved Algerian history. He wrote a famous history of Algeria. (Combine with "Since")',
				ce2A: 'b) Since Sheikh Moubarek El Mili loved Algerian history, he wrote a famous history of Algeria.',
				ce3Q: 'c) Djamaa El Djazair is admired worldwide. Its architecture is majestic. (Combine with "because")',
				ce3A: 'c) Djamaa El Djazair is admired worldwide because its architecture is majestic.',
				seqQ: 'Reorder and link the itinerary steps using "First,", "Then,", and "Finally,":\n  (visit Timgad in Batna / depart from Algiers / admire the Bridges of Constantine)',
				seqA: 'First, we will depart from Algiers. Then, we will admire the Bridges of Constantine. Finally, we will visit Timgad in Batna.',
				diphWords: ['name', 'site', 'town', 'place', 'high', 'south'],
				c1: { header: '/ei/ (day)', words: ['name', 'place'] },
				c2: { header: '/ai/ (time)', words: ['site', 'high'] },
				c3: { header: '/au/ (now)', words: ['town', 'south'] },
				mcqQ: 'Which word contains the same diphthong /ai/ as "site"?',
				mcqCorrect: 'height',
				mcqD1: 'great',
				mcqD2: 'stone',
				mcqD3: 'south'
			},
			{
				ce1Q: 'a) Poet Mohamed El Aid Al Khalifa wrote inspiring patriotic poems. Algerians remember him proudly. (Combine with "as a result")',
				ce1A: 'a) Poet Mohamed El Aid Al Khalifa wrote inspiring patriotic poems; as a result, Algerians remember him proudly.',
				ce2Q: 'b) Tassili n-Ajjer is rich in ancient rock art. UNESCO classified it in 1982. (Combine with "Because")',
				ce2A: 'b) Because Tassili n-Ajjer is rich in ancient rock art, UNESCO classified it in 1982.',
				ce3Q: 'c) The Casbah is famous ...... (because / because of) its traditional Islamic houses.',
				ce3A: 'c) The Casbah is famous because of its traditional Islamic houses.',
				seqQ: 'Complete the itinerary with "First,", "Next,", and "Finally,":\n  ...... we visited The Great Mosque of Tlemcen. ...... we walked through the historic streets. ...... we took souvenir photos.',
				seqA: 'First, we visited The Great Mosque of Tlemcen. Next, we walked through the historic streets. Finally, we took souvenir photos.',
				diphWords: ['famous', 'guide', 'stone', 'great', 'life', 'road'],
				c1: { header: '/ei/ (day)', words: ['famous', 'great'] },
				c2: { header: '/ai/ (time)', words: ['guide', 'life'] },
				c3: { header: '/ou/ (go)', words: ['stone', 'road'] },
				mcqQ: 'Which word contains the same diphthong /ei/ as "famous"?',
				mcqCorrect: 'great',
				mcqD1: 'guide',
				mcqD2: 'road',
				mcqD3: 'tower'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqD1, diagnosticFeedback: 'انطق الكلمة وقارن صوت العلة المزدوج داخلها.' },
				{ text: variant.mcqD2, diagnosticFeedback: 'هذه الكلمة تحتوي على صوت مزدوج مختلف.' },
				{ text: variant.mcqD3, diagnosticFeedback: 'راجع المجموعات الصوتية: /ei/ و /ai/ و /ou/ و /au/.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQ,
				questionTextAr: 'اختر الكلمة الموافقة للصوت المزدوج (Diphthong) المطلوب:',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الإجابة الصحيحة هي: ${variant.mcqCorrect}.`
			},
			sujetExercise: {
				customTitle: 'Part One: B / Mastery of Language (07 pts)',
				points: 7,
				instruction: 'Complete the following discourse and phonology tasks:',
				content: [
					{
						type: 'text',
						content: `Activity 1: Combine or complete the sentences using the right Cause/Effect marker (03 pts):\n  ${variant.ce1Q}\n  ${variant.ce2Q}\n  ${variant.ce3Q}`,
						answer: `${variant.ce1A}\n${variant.ce2A}\n${variant.ce3A}`,
						mark: '3'
					},
					{
						type: 'text',
						content: `Activity 2: ${variant.seqQ} (02 pts)`,
						answer: variant.seqA,
						mark: '2'
					},
					{
						type: 'text',
						content: `Activity 3: Classify these words according to their diphthong sound (02 pts):\nWords: ${variant.diphWords.join(' - ')}`
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
				'Since و Because تسبقان السبب؛ أما therefore و as a result فتسبقان النتيجة وتفصلان بفاصلة منقوطة وفاصلة.',
				'ضع فاصلة بعد First و Next و Then و Finally في بداية الجملة.',
				'استعن بالكلمة المرجعية في رأس كل عمود (day / time / go / now) لمطابقة الصوت المزدوج.'
			],
			solutionStepsAr: [
				`${variant.ce1A} | ${variant.ce2A} | ${variant.ce3A}`,
				variant.seqA,
				`${variant.c1.header}: ${variant.c1.words.join(', ')} | ${variant.c2.header}: ${variant.c2.words.join(', ')} | ${variant.c3.header}: ${variant.c3.words.join(', ')}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. BEM Written Expression (6 pts) — Landmark Description / Figure Biography
// ═══════════════════════════════════════════════════════════════════════════════
const writeLandmarkFigure4amT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4am_t1_write_landmark_figure',
	grade: '4am',
	trimesterId: 't1',
	domain: 'written_expression',
	titleAr: 'الوضعية الإدماجية (BEM): وصف معلم جزائري أو سيرة شخصية بارزة (6 نقاط)',
	curriculumLessonId: 'eng_lesson_4am_t1_chronology_itinerary',
	defaultPoints: 6,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const item = rng.pick([
			{
				kind: 'landmark',
				name: 'The Great Mosque of Algiers (Djamaa El Djazair)',
				location: 'Mohammedia, Algiers (facing the Bay of Algiers)',
				inaugurated: '2020',
				highlights: 'tallest minaret in the world (265 metres), spacious prayer hall, Islamic library, and cultural research centre',
				comparison: 'as iconic as The Casbah of Algiers and The Great Mosque of Tlemcen',
				modelAnswer:
					'The Great Mosque of Algiers (Djamaa El Djazair) is one of Algeria most impressive architectural landmarks. It is located in Mohammedia, Algiers, facing the Mediterranean Bay. It was inaugurated in 2020 and quickly became a symbol of modern Islamic heritage. First, visitors admire its soaring minaret, which stands 265 metres high. Next, they can explore its spacious prayer hall, rich library, and cultural centre. Djamaa El Djazair is as iconic as The Great Mosque of Tlemcen; therefore, thousands of Algerians and tourists visit it every week.'
			},
			{
				kind: 'figure',
				name: 'Sheikh Mohamed Bachir El Ibrahimi',
				location: 'born in 1889 in Ras El Oued (Bordj Bou Arreridj), Algeria',
				inaugurated: 'co-founded the Association of Algerian Muslim Scholars in 1931 and led it after 1940',
				highlights: 'brilliant scholar, master of Arabic eloquence, authored "Uyun al-Basaer", defended education and Islamic identity',
				comparison: 'as dedicated as Imam Abdelhamid Ben Badis in serving Algerian youth',
				modelAnswer:
					'Sheikh Mohamed Bachir El Ibrahimi was an outstanding Algerian Muslim scholar and writer. He was born in 1889 in Ras El Oued, Bordj Bou Arreridj. First, he studied Islamic sciences and mastered Arabic literature with extraordinary eloquence. In 1931, the Association of Algerian Muslim Scholars was co-founded by him and Imam Abdelhamid Ben Badis. After 1940, he led the Association and opened many schools across Algeria. His famous collection of articles, Uyun al-Basaer, was read across the Arab world. Sheikh El Ibrahimi was as dedicated as Imam Ben Badis; therefore, Algerians honour his memory with deep pride.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			'Combine Past Simple Passive (was built/founded), comparison (as...as), chronology sequencers (First, Next), and cause/effect (therefore).',
			[
				{ text: 'Copy the reading comprehension passage word for word.', diagnosticFeedback: 'نسخ نص الفهم يفقد التلميذ علامة الوضعية الإدماجية.' },
				{ text: 'Write only three bullet points without verbs or punctuation.', diagnosticFeedback: 'المطلوب فقرة متماسكة ومنظمة من 8 إلى 12 سطراً.' },
				{ text: 'Ignore the given fact file and write about weekend shopping.', diagnosticFeedback: 'الالتزام بالمعطيات والموضوع شرط أساسي لعلامة الملاءمة.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: 'What makes a 4MS BEM Situation of Integration on landmarks or outstanding figures score 6/6?',
				questionTextAr: 'كيف تحصد 6/6 في وضعية BEM حول المعالم أو الشخصيات البارزة؟',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'بتوظيف جميع معطيات البطاقة مع المبني للمجهول في الماضي، المقارنة as...as، وأدوات الترتيب والنتيجة.'
			},
			sujetExercise: {
				customTitle: 'Part Two: Situation of Integration (06 pts)',
				points: 6,
				instruction: 'Write a coherent BEM paragraph (8 to 12 lines) using the fact file below:',
				content: [
					buildEnglishWrittenExpressionBlock({
						topicOnePrompt: `Your international e-pal wants to discover Algerian heritage. Use the fact file below to write a well-organized paragraph about ${item.name}.`,
						topicOneNotes: [
							`Subject: ${item.name}`,
							`Place / Origin: ${item.location}`,
							`Key Date / Milestone: ${item.inaugurated}`,
							`Main Features / Achievements: ${item.highlights}`,
							`Comparison (as...as): ${item.comparison}`
						],
						topicTwoPrompt:
							'Write a short itinerary (First, Next, Then, Finally) describing a three-day school tour across three Algerian landmarks (The Casbah of Algiers, The Bridges of Constantine, and Timgad).',
						modelAnswer: item.modelAnswer,
						rubricSummary:
							'Relevance (2 pts) + Coherence & Sequencers (1.5 pts) + Passive/Comparative Accuracy (1.5 pts) + Mechanics & Neatness (1 pt).',
						mark: '6'
					})
				]
			},
			hints: [
				'وظّف جميع ملاحظات البطاقة (Fact File) دون إهمال أي معلومة.',
				'أدرج جملة واحدة على الأقل في المبني للمجهول (was inaugurated / was co-founded) وجملة بـ (as ... as).',
				'استعمل أدوات الترتيب والنتيجة (First, Next, therefore) وراجع علامات الترقيم.'
			],
			solutionStepsAr: [
				`التعريف والموقع: ${item.name} — ${item.location}.`,
				`الحدث التاريخي والمميزات: ${item.inaugurated} — ${item.highlights}.`,
				`المقارنة والخاتمة: ${item.comparison}.`
			],
			finalAnswer: item.modelAnswer
		};
	}
};

export const TEMPLATES_4AM_T1: EnglishParameterizedTemplate[] = [
	compAlgerianLandmarks4amT1,
	compOutstandingFigures4amT1,
	langPassiveComparative4amT1,
	langCauseDiphthongs4amT1,
	writeLandmarkFigure4amT1
];
