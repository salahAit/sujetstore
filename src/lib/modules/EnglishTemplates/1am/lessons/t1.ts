import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishTenseTimeline,
	svgEnglishWritingStructure
} from '../../svg-english';

export const LESSONS_1AM_T1: EnglishInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 1: Personal Pronouns & Verb to be
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_1am_t1_to_be_pronouns',
		slug: 'eng-1am-t1-to-be-pronouns',
		grade: '1am',
		yearSubjectId: 616,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: أنا وأصدقائي — Me and My Friends',
		order: 1,
		titleAr: 'الضمائر الشخصية وفعل الكينونة (Personal Pronouns & Verb to be)',
		objectives: [
			'استعمال الضمائر الشخصية (I, you, he, she, it, we, they) بشكل سليم',
			'تصريف فعل الكينونة (to be) في المضارع البسيط: am / is / are',
			'تقديم النفس وتقديم الصديق في جمل إنجليزية بسيطة وصحيحة'
		],
		keywordsAr: ['Personal Pronouns', 'Verb to be', 'am / is / are', 'تقديم النفس', 'التعريف بالصديق'],
		discover: {
			scenarioAr:
				'في أول يوم دراسي بمتوسطة في الجزائر، قدّم أمين نفسه وزميله بلال قائلا: "Hello! I am Amine. He is Bilal. We are pupils in 1MS." لاحظ تغيّر شكل فعل الكينونة مع كل ضمير شخصي.',
			svg: svgEnglishGrammarMap({
				title: 'Verb to be in Present Simple',
				rootLabel: 'Verb to be (am / is / are)',
				rootSub: 'Choose the form by the subject pronoun',
				branches: [
					{
						label: 'am',
						rule: 'With: I',
						example: 'I am Amine.',
						color: '#1d4ed8'
					},
					{
						label: 'is',
						rule: 'With: He / She / It',
						example: 'She is Amina.',
						color: '#047857'
					},
					{
						label: 'are',
						rule: 'With: You / We / They',
						example: 'We are Algerian.',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الفعل الذي استعمله أمين بعد الضمير "I" لتقديم نفسه؟',
					hintAr: 'اقرأ الجملة الأولى: I ... Amine.',
					expectedInput: 'am',
					revealAr: 'استعمل الفعل "am" لأن الضمير "I" يأخذ دائما "am": I am Amine.'
				},
				{
					promptAr: 'لماذا قال أمين "He is Bilal" ولم يقل "He am Bilal"؟',
					hintAr: 'انظر إلى فرع الضمائر المفردة الغائبة (He / She / It) في المخطط.',
					expectedInput: 'is',
					revealAr: 'لأن ضمائر المفرد الغائب (He, She, It) تأخذ دائما "is": He is Bilal.'
				},
				{
					promptAr: 'ما الصيغة الصحيحة لفعل الكينونة مع ضمائر الجمع (We / They) ومع (You)؟',
					hintAr: 'تأمل الجملة: We ... pupils in 1MS.',
					expectedInput: 'are',
					revealAr: 'نستعمل "are" مع "You, We, They": We are pupils. They are friends.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الضمائر الشخصية تحلّ محلّ الاسم: I (أنا)، You (أنتَ/أنتِ/أنتم)، He (هو)، She (هي)، It (هو/هي لغير العاقل)، We (نحن)، They (هم/هنّ).',
				'تصريف فعل الكينونة (to be) في الإثبات: I am / He, She, It is / You, We, They are.',
				'الصيغة المختصرة في الإثبات: I am = I\'m، He is = He\'s، She is = She\'s، We are = We\'re.',
				'في النفي نضيف "not" بعد الفعل: I am not (I\'m not)، He is not (isn\'t)، They are not (aren\'t).',
				'في السؤال نعكس الفعل والضمير: Are you Algerian? — Yes, I am. / No, I am not.'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Presenting Facts Now',
				tenseName: 'Verb to be',
				formula: 'Subject + am / is / are + Name / Age / Nationality',
				activeZone: 'present',
				example: 'My name is Youssef. I am eleven years old.',
				markers: 'Always true facts (name, age, country, job)'
			}),
			visualCaptionAr: 'استعمال فعل الكينونة لتقديم الحقائق الدائمة: الاسم والعمر والجنسية والمهنة',
			examples: [
				{
					problemAr: 'أكمل الجمل باستعمال (am / is / are): 1) I ...... eleven. 2) Meriem ...... from Tlemcen. 3) We ...... good friends.',
					solutionAr: '1) I am eleven. 2) Meriem is from Tlemcen. 3) We are good friends.'
				},
				{
					problemAr: 'حوّل الجملة إلى النفي ثم إلى سؤال: "He is a pupil."',
					solutionAr: 'النفي: He is not (isn\'t) a pupil. السؤال: Is he a pupil?'
				}
			],
			watchOutAr:
				'انتبه! نستخدم الضمير "It" للأشياء والحيوانات والمدن المفردة (It is a cat / It is Algiers)، ولا نستخدم "He" أو "She" للجماد أو المدرسة.'
		},
		practice: [
			{
				questionAr: 'اختر الفعل الصحيح: "Hello! My name ...... Hamza."',
				options: ['am', 'is', 'are', 'be'],
				correctIndex: 1,
				diagnosticFeedback: [
					'نستعمل am مع الضمير I فقط، وهنا الفاعل مفرد غائب (My name = It).',
					'أحسنت! My name يعادل الضمير It، فيأخذ is.',
					'نستعمل are مع الجمع أو You، و My name مفرد.',
					'be هو المصدر قبل التصريف.'
				],
				explanationAr: 'الفاعل My name اسم مفرد يعادل It، لذلك نكتب: My name is Hamza.'
			},
			{
				questionAr: 'اختر الضمير المناسب للجملة: "...... is my sister Khadija."',
				options: ['He', 'She', 'We', 'It'],
				correctIndex: 1,
				diagnosticFeedback: [
					'He للمذكر المفرد العاقل، وخديجة مؤنث.',
					'ممتاز! She للمؤنث المفرد العاقل.',
					'We للجمع المتكلم وتأخذ are وليس is.',
					'It لغير العاقل، ولا تستعمل للإنسان.'
				],
				explanationAr: 'للتعريف بمؤنث مفرد عاقل (my sister Khadija) نستعمل الضمير She.'
			},
			{
				questionAr: 'ما الجملة الصحيحة للجمع؟',
				options: [
					'They is pupils in 1MS.',
					'They am pupils in 1MS.',
					'They are pupils in 1MS.',
					'They be pupils in 1MS.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'is للمفرد الغائب فقط، و They للجمع.',
					'am للضمير I فقط.',
					'إجابة صحيحة! الضمير They يأخذ دائما are.',
					'يجب تصريف verb to be إلى are مع They.'
				],
				explanationAr: 'الضمير They يدل على الجمع ويأخذ دائما الفعل are.'
			},
			{
				questionAr: 'أكمل الحوار: "Are you from Oran?" — "Yes, ......"',
				options: ['I are.', 'you am.', 'I am.', 'he is.'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الضمير I لا يأخذ are بل يأخذ am.',
					'السؤال موجّه إليك (you) فالجواب يكون بضمير المتكلم I.',
					'أحسنت! عند السؤال بـ Are you نجيب بـ Yes, I am.',
					'he is للغائب وليس للمتكلم.'
				],
				explanationAr: 'السؤال الموجّه للمخاطب (Are you...?) يُجاب عنه بالمتكلم: Yes, I am.'
			},
			{
				questionAr: 'ما الصيغة المنفية الصحيحة للجملة: "Bilal is from Batna."؟',
				options: [
					'Bilal not is from Batna.',
					'Bilal is not from Batna.',
					'Bilal are not from Batna.',
					'Bilal am not from Batna.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'كلمة not تأتي بعد is وليس قبلها.',
					'ممتاز! نضع not مباشرة بعد is: Bilal is not from Batna.',
					'Bilal مفرد يأخذ is وليس are.',
					'am تستعمل مع I فقط.'
				],
				explanationAr: 'لنفي فعل الكينونة نضع not مباشرة بعد am / is / are.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 2: Articles a / an & Jobs
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_1am_t1_articles_jobs',
		slug: 'eng-1am-t1-articles-jobs',
		grade: '1am',
		yearSubjectId: 616,
		trimesterId: 't1',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: أنا وعائلتي — Me and My Family',
		order: 2,
		titleAr: 'أداتا التنكير (a / an) والمهن (Jobs & Occupations)',
		objectives: [
			'التمييز الدقيق بين حروف العلة (Vowels: a, e, i, o, u) والحروف الساكنة (Consonants)',
			'توظيف أداة التنكير الصحيحة (a أو an) قبل أسماء المهن والأشياء المفردة',
			'تسمية أبرز المهن الشائعة في الأسرة الجزائرية باللغة الإنجليزية'
		],
		keywordsAr: ['Indefinite Articles', 'a / an', 'Vowels', 'Consonants', 'Jobs'],
		discover: {
			scenarioAr:
				'تحدّثت سارة عن مهن والديها فقالت: "My father is an architect and my mother is a teacher. My uncle is an electrician and my aunt is a nurse." لاحظ متى استعملت سارة "a" ومتى استعملت "an".',
			svg: svgEnglishGrammarMap({
				title: 'Indefinite Articles: a vs an',
				rootLabel: 'Singular Countable Nouns & Jobs',
				rootSub: 'Look at the first sound of the word',
				branches: [
					{
						label: 'a + Consonant',
						rule: 'b, c, d, f, g, m, n, p, t...',
						example: 'a teacher / a doctor',
						color: '#1d4ed8'
					},
					{
						label: 'an + Vowel',
						rule: 'a, e, i, o, u',
						example: 'an architect / an engineer',
						color: '#047857'
					},
					{
						label: 'No a / an in Plural',
						rule: 'Plural nouns take NO a/an',
						example: 'They are teachers.',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'بأيّ حرف تبدأ الكلمتان "architect" و "electrician"؟ وما الأداة التي سبقتهما؟',
					hintAr: 'تأمّل الحرف الأول: a و e.',
					expectedInput: 'an',
					revealAr: 'تبدآن بحرفي علة (a, e)، لذلك استعملنا قبلهما الأداة "an": an architect, an electrician.'
				},
				{
					promptAr: 'بأيّ حرف تبدأ الكلمتان "teacher" و "nurse"؟ وما الأداة المناسبة لهما؟',
					hintAr: 'هل الحرفان t و n من حروف العلة أم من الحروف الساكنة؟',
					expectedInput: 'a',
					revealAr: 'الحرفان t و n ساكنان (consonants)، لذلك نضع قبلهما "a": a teacher, a nurse.'
				},
				{
					promptAr: 'هل نقول "They are a doctors" في الجمع؟ ولماذا؟',
					hintAr: 'أداتا a / an تدلان على الواحد (المفرد) فقط.',
					expectedInput: 'No, They are doctors',
					revealAr: 'لا! أداتا "a / an" للمفرد فقط. في الجمع نحذفهما ونقول: They are doctors.'
				}
			]
		},
		summary: {
			rulesAr: [
				'حروف العلة في الإنجليزية خمسة: (a, e, i, o, u)، وبقية الحروف ساكنة (Consonants).',
				'نستعمل الأداة "an" قبل الاسم المفرد المبدوء بصوت علة: an architect (مهندس معماري)، an engineer (مهندس)، an electrician (كهربائي)، an Imam (إمام).',
				'نستعمل الأداة "a" قبل الاسم المفرد المبدوء بصوت ساكن: a teacher (أستاذ)، a doctor (طبيب)، a nurse (ممرضة)، a farmer (فلاح)، a baker (خباز)، a carpenter (نجار).',
				'للسؤال عن المهنة نستعمل: What is your father\'s job? — He is a doctor. (أو: What does he do?).'
			],
			visualSvg: svgEnglishPhoneticsChart({
				title: 'Jobs & Articles Quick Reference',
				subtitle: 'Always check the opening sound before choosing a or an',
				columns: [
					{
						sound: 'a + Consonant',
						rule: 't, d, n, f, b, c, p',
						examples: 'a teacher, a doctor, a nurse',
						color: '#1d4ed8'
					},
					{
						sound: 'an + Vowel',
						rule: 'a, e, i, o, u',
						examples: 'an architect, an engineer',
						color: '#047857'
					},
					{
						sound: 'Plural (Zero)',
						rule: 'No a or an',
						examples: 'doctors, engineers, pupils',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'ملخص سريع لاستعمال a و an مع أسماء المهن في المفرد وحذفهما في الجمع',
			examples: [
				{
					problemAr: 'ضع الأداة المناسبة (a / an): 1) ...... dentist. 2) ...... engineer. 3) ...... mechanic. 4) ...... optician.',
					solutionAr: '1) a dentist. 2) an engineer. 3) a mechanic. 4) an optician.'
				},
				{
					problemAr: 'اكتب جملة تصف فيها مهنة الأب (فلاح) ومهنة الأم (ربة بيت).',
					solutionAr: 'My father is a farmer and my mother is a housewife.'
				}
			],
			watchOutAr:
				'احذر من نسيان الأداة قبل المهنة المفردة في الإنجليزية! لا تقل "My father is doctor" بل قل دائما: "My father is a doctor".'
		},
		practice: [
			{
				questionAr: 'اختر الأداة الصحيحة: "My brother is ...... engineer in Algiers."',
				options: ['a', 'an', 'are', 'the'],
				correctIndex: 1,
				diagnosticFeedback: [
					'كلمة engineer تبدأ بحرف علة (e)، فلا نضع a.',
					'أحسنت! engineer تبدأ بصوت علة (e) فنستعمل an.',
					'are فعل كينونة وليس أداة تنكير.',
					'قبل المهنة المفردة نستعمل أداة التنكير an.'
				],
				explanationAr: 'كلمة engineer مفردة وتبدأ بحرف العلة e، لذلك تأخذ الأداة an.'
			},
			{
				questionAr: 'أكمل الجملة: "My mother is ...... nurse at the hospital."',
				options: ['an', 'a', 'is', 'no article'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الحرف n ساكن وليس من حروف العلة.',
					'ممتاز! nurse تبدأ بحرف ساكن (n) فتأخذ a.',
					'is فعل موجود أصلا في الجملة.',
					'المهنة المفردة تحتاج أداة تنكير a أو an.'
				],
				explanationAr: 'كلمة nurse تبدأ بالحرف الساكن n، فنضع قبلها a.'
			},
			{
				questionAr: 'أيّ كلمة من الكلمات الآتية تأخذ الأداة "an"؟',
				options: ['farmer', 'baker', 'architect', 'pilot'],
				correctIndex: 2,
				diagnosticFeedback: [
					'farmer تبدأ بساكن (f): a farmer.',
					'baker تبدأ بساكن (b): a baker.',
					'صحيح! architect تبدأ بحرف علة (a): an architect.',
					'pilot تبدأ بساكن (p): a pilot.'
				],
				explanationAr: 'الكلمة الوحيدة المبدوءة بحرف علة هي architect فتأخذ an.'
			},
			{
				questionAr: 'اختر الجملة الصحيحة نحويا:',
				options: [
					'My parents are a teachers.',
					'My parents are teachers.',
					'My parents is teachers.',
					'My parents are an teachers.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نستعمل a قبل اسم الجمع (teachers).',
					'ممتاز! في الجمع نستعمل are ونحذف أداة التنكير.',
					'parents جمع يأخذ are وليس is.',
					'لا نستعمل an مع الجمع ولا مع الحرف الساكن.'
				],
				explanationAr: 'في الجمع لا نضع a أو an قبل الاسم، ونقول: My parents are teachers.'
			},
			{
				questionAr: 'كيف نسأل باللغة الإنجليزية عن مهنة والد صديقك؟',
				options: [
					'How old is your father?',
					'Where is your father from?',
					'What is your father\'s job?',
					'Who is your father?'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'How old تسأل عن العمر.',
					'Where ... from تسأل عن البلد أو المدينة.',
					'أحسنت! What is your father\'s job? سؤال صحيح عن المهنة.',
					'Who تسأل عن هوية الشخص.'
				],
				explanationAr: 'للسؤال عن المهنة نستعمل: What is your father\'s job?'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 3: Numbers, Age & Family Tree
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_1am_t1_numbers_age_family',
		slug: 'eng-1am-t1-numbers-age-family',
		grade: '1am',
		yearSubjectId: 616,
		trimesterId: 't1',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: أنا وعائلتي — Me and My Family',
		order: 3,
		titleAr: 'الأعداد والعمر وشجرة العائلة (Numbers, Age & Family Tree)',
		objectives: [
			'كتابة وقراءة الأعداد الأساسية (0 إلى 100) والأعداد الترتيبية البسيطة (1st, 2nd, 3rd)',
			'التعبير عن العمر والسؤال عنه باستعمال (How old ...? / ... years old)',
			'تسمية أفراد العائلة واستعمال صفات الملكية (my, his, her)'
		],
		keywordsAr: ['Family Tree', 'Numbers', 'Age', 'Possessive Adjectives', 'have got'],
		discover: {
			scenarioAr:
				'رسم يوسف شجرة عائلته في كراسه وكتب: "I am twelve years old. I have got one brother and two sisters. My grandfather is sixty-five and my grandmother is sixty." تأمل كيف عبّر يوسف عن الأعمار والعائلة.',
			svg: svgEnglishGrammarMap({
				title: 'My Family Tree & Possessive Adjectives',
				rootLabel: 'Family Members (My Family)',
				rootSub: 'Use my / his / her + family member',
				branches: [
					{
						label: 'Grandparents',
						rule: 'grandfather / grandmother',
						example: 'My grandfather is 65.',
						color: '#1d4ed8'
					},
					{
						label: 'Parents',
						rule: 'father / mother',
						example: 'His mother is kind.',
						color: '#047857'
					},
					{
						label: 'Children',
						rule: 'brother / sister',
						example: 'Her brother is 11.',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الفعل الذي استعمله يوسف ليخبرنا بعدد إخوته وأخواته؟',
					hintAr: 'اقرأ الجملة الثانية: I ...... one brother and two sisters.',
					expectedInput: 'have got',
					revealAr: 'استعمل "have got" (لديّ / أملك): I have got one brother and two sisters.'
				},
				{
					promptAr: 'هل نستعمل "have" أم "to be (am/is/are)" للتعبير عن العمر بالإنجليزية؟',
					hintAr: 'لاحظ جملة يوسف: "I am twelve years old."',
					expectedInput: 'to be',
					revealAr: 'نستعمل فعل الكينونة (am / is / are) للعمر وليس have: I am 12 years old. She is 10.'
				},
				{
					promptAr: 'كيف نكتب العددين 12 و 65 بالحروف الإنجليزية؟',
					hintAr: 'ابحث عنهما في فقرة يوسف أعلاه.',
					expectedInput: 'twelve and sixty-five',
					revealAr: '12 تُكتب twelve، و 65 تُكتب sixty-five (بوضع مطّة بين العشرات والآحاد).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الأعداد الأساسية المهمة: 11 eleven، 12 twelve، 13 thirteen، 14 fourteen، 15 fifteen، 20 twenty، 30 thirty، 40 forty، 50 fifty، 60 sixty، 100 one hundred.',
				'للسؤال عن العمر: How old are you? (كم عمرك؟) — الجواب: I am eleven (11) years old. / How old is he? — He is forty.',
				'أفراد العائلة: grandfather (جد)، grandmother (جدة)، father (أب)، mother (أم)، brother (أخ)، sister (أخت)، uncle (عم/خال)، aunt (عمة/خالة)، cousin (ابن العم/الخال).',
				'صفات الملكية: my (لي)، your (لك)، his (له)، her (لها). مثال: His name is Omar. Her name is Fatima.',
				'للتعبير عن الملكية أو عدد الإخوة: I / You / We / They have got — He / She / It has got.'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'Introducing Your Family (4 Simple Steps)',
				steps: [
					{ stage: 'Greeting', detail: 'Hello! My name is Amine. I am 11 years old.' },
					{ stage: 'Family Size', detail: 'I have got one brother and two sisters.' },
					{ stage: 'Parents', detail: 'My father is 42. He is a teacher. My mother is 38.' },
					{ stage: 'Respect', detail: 'I love and respect my family very much.' }
				]
			}),
			visualCaptionAr: 'خطوات واضحة ومختصرة لتقديم العائلة والأعمار في فقرة قصيرة',
			examples: [
				{
					problemAr: 'أكمل باستعمال (his / her / my): 1) I love ...... parents. 2) This is my brother. ...... name is Anas. 3) This is my sister. ...... name is Ines.',
					solutionAr: '1) my parents. 2) His name is Anas. 3) Her name is Ines.'
				},
				{
					problemAr: 'أكمل باستعمال (have got / has got): 1) I ...... two brothers. 2) Meriem ...... a kind grandmother.',
					solutionAr: '1) I have got two brothers. 2) Meriem has got a kind grandmother.'
				}
			],
			watchOutAr:
				'خطأ شائع جدا لدى تلاميذ الأولى متوسط: قول "I have 11 years old" تأثرا بالفرنسية! الصواب دائما في الإنجليزية: "I am 11 years old".'
		},
		practice: [
			{
				questionAr: 'اختر الجملة الصحيحة للتعبير عن العمر:',
				options: [
					'I have eleven years old.',
					'I am eleven years old.',
					'I has eleven years old.',
					'I is eleven years old.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نستعمل have للعمر في الإنجليزية.',
					'أحسنت! نعبر عن العمر بفعل الكينونة: I am eleven years old.',
					'has لا تستعمل للعمر ولا مع الضمير I.',
					'الضمير I يأخذ am وليس is.'
				],
				explanationAr: 'في اللغة الإنجليزية نعبر عن العمر باستعمال verb to be: I am eleven years old.'
			},
			{
				questionAr: 'ما الكتابة الصحيحة للعدد (40) بالإنجليزية؟',
				options: ['fourty', 'forty', 'fourteen', 'four'],
				correctIndex: 1,
				diagnosticFeedback: [
					'انتبه! نكتب forty بدون الحرف u.',
					'ممتاز! 40 تُكتب forty.',
					'fourteen تعني 14 وليس 40.',
					'four تعني 4.'
				],
				explanationAr: 'العدد 40 يُكتب forty بدون حرف u، بينما 14 يُكتب fourteen.'
			},
			{
				questionAr: 'أكمل الجملة بصفة الملكية المناسبة: "This is my sister. ...... name is Salma."',
				options: ['His', 'Her', 'My', 'Their'],
				correctIndex: 1,
				diagnosticFeedback: [
					'His للمذكر (أخي/أبي).',
					'صحيح! Her للمفرد المؤنث (أختي).',
					'My تعني اسمي أنا، والجملة تتحدث عن الأخت.',
					'Their للجمع.'
				],
				explanationAr: 'نستعمل Her للإشارة إلى ملكية المفرد المؤنث (my sister).'
			},
			{
				questionAr: 'اختر الفعل الصحيح: "Karim ...... two sisters and one brother."',
				options: ['have got', 'has got', 'are got', 'am got'],
				correctIndex: 1,
				diagnosticFeedback: [
					'have got تُستعمل مع I, you, we, they، وكريم مفرد غائب.',
					'أحسنت! Karim يعادل He فيأخذ has got.',
					'are got صيغة غير صحيحة.',
					'am got صيغة غير صحيحة.'
				],
				explanationAr: 'مع المفرد الغائب (He, She, It / Karim) نستعمل has got.'
			},
			{
				questionAr: 'من هو والد أمي أو والد أبي (grandfather) بالعربية؟',
				options: ['العم', 'الأخ', 'الجد', 'ابن العم'],
				correctIndex: 2,
				diagnosticFeedback: [
					'العم هو uncle.',
					'الأخ هو brother.',
					'إجابة صحيحة! grandfather تعني الجد.',
					'ابن العم هو cousin.'
				],
				explanationAr: 'كلمة grandfather تعني الجد، وكلمة grandmother تعني الجدة.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 4: Pronunciation of /ai/ vs /ei/
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_1am_t1_pronunciation_ai_ei',
		slug: 'eng-1am-t1-pronunciation-ai-ei',
		grade: '1am',
		yearSubjectId: 616,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: أنا وأصدقائي — Me and My Friends',
		order: 4,
		titleAr: 'النطق: التمييز بين الصوتين /ai/ و /ei/ (Pronunciation: /ai/ vs /ei/)',
		objectives: [
			'التمييز السمعي والكتابي بين الصوت المزدوج /ai/ والصوت المزدوج /ei/',
			'تصنيف كلمات التحية والتعريف بالنفس ضمن عمودي /ai/ و /ei/ بدقة',
			'النطق الصحيح لأكثر الكلمات تداولا في المقطع الأول والثاني'
		],
		keywordsAr: ['Pronunciation', 'Diphthongs', '/ai/ sound', '/ei/ sound', 'التصنيف الصوتي'],
		discover: {
			scenarioAr:
				'قرأت مريم جملة الترحيب بصوت مرتفع: "Hi! My name is Meriem. I am nine. Today is a nice day!" لاحظ أن كلمات مثل (Hi, My, I, nine, nice) تشترك في صوت واحد، بينما (name, Today, day) تشترك في صوت آخر.',
			svg: svgEnglishPhoneticsChart({
				title: 'Pronunciation Contrast: /ai/ vs /ei/',
				subtitle: 'Listen to the vowel sound inside each word',
				columns: [
					{
						sound: '/ai/ (like Hi)',
						rule: 'i-e, y, i, igh',
						examples: 'Hi, my, nine, nice, fine',
						color: '#1d4ed8'
					},
					{
						sound: '/ei/ (like Day)',
						rule: 'a-e, ay, ai, eigh',
						examples: 'name, day, age, eight, classmate',
						color: '#047857'
					}
				]
			}),
			steps: [
				{
					promptAr: 'انطق الكلمات: "Hi, My, nine, nice". ما الصوت المشترك بينها؟',
					hintAr: 'هل يشبه صوت "آي" (/ai/) أم صوت "إي" (/ei/)؟',
					expectedInput: '/ai/',
					revealAr: 'كلها تحتوي على الصوت /ai/ (مثل كلمة Hi و My و nine).'
				},
				{
					promptAr: 'انطق الكلمات: "name, day, age, eight". ما الصوت المشترك بينها؟',
					hintAr: 'لاحظ الحرف "a" في name و day و age.',
					expectedInput: '/ei/',
					revealAr: 'كلها تحتوي على الصوت /ei/ (مثل name و day و age و eight).'
				},
				{
					promptAr: 'في أيّ عمود نصنّف كلمة "five" وكلمة "play"؟',
					hintAr: 'قارن نطق five بـ nine، ونطق play بـ day.',
					expectedInput: 'five in /ai/, play in /ei/',
					revealAr: 'كلمة "five" تنتمي إلى /ai/، وكلمة "play" تنتمي إلى /ei/.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الصوت /ai/ (ينطق مثل «آي»): يظهر غالبا في الكلمات التي فيها (i + ساكن + e) مثل: nine, five, nice, fine, write، أو الحرف (y) مثل: my, by، أو (i) في: Hi, I.',
				'الصوت /ei/ (ينطق مثل «إي»): يظهر غالبا في الكلمات التي فيها (a + ساكن + e) مثل: name, age, classmate, cake, table، أو المقطع (ay) مثل: day, today, play, say، أو (eight).',
				'في الامتحان يُطلب منك غالبا تصنيف 4 كلمات في جدول من عمودين: /ai/ و /ei/.',
				'تذكّر دائما كلمة مفتاحية لكل عمود: احفظ (nine) لعمود /ai/، واحفظ (name) لعمود /ei/، وقارن كل كلمة جديدة بهما!'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Memory Trick for Exam Phonology',
				rootLabel: 'Compare Every Word to a Key Word',
				rootSub: 'Read the word aloud slowly in your mind',
				branches: [
					{
						label: 'Key Word: NINE (/ai/)',
						rule: 'Matches: Hi, I, my, five',
						example: 'nice, fine, white, like',
						color: '#1d4ed8'
					},
					{
						label: 'Key Word: NAME (/ei/)',
						rule: 'Matches: day, age, eight',
						example: 'play, classmate, same, say',
						color: '#047857'
					}
				]
			}),
			visualCaptionAr: 'حيلة سهلة للامتحان: قارن نطق كل كلمة بالكلمة المفتاحية nine أو name',
			examples: [
				{
					problemAr: 'صنّف الكلمات الآتية في الجدول (/ai/ أو /ei/): classmate, five, today, white.',
					solutionAr: 'عمود /ai/: five, white. عمود /ei/: classmate, today.'
				},
				{
					problemAr: 'استخرج الكلمة الدخيلة (odd word) من المجموعة: (my, hi, day, nine).',
					solutionAr: 'الكلمة الدخيلة هي "day" لأنها تنطق بـ /ei/، بينما البقية (my, hi, nine) تنطق بـ /ai/.'
				}
			],
			watchOutAr:
				'انتبه! كلمة "eight" (8) تُكتب بحروف (eigh) لكنها تُنطق مثل "day" بالصوت /ei/ وليس /ai/، أما كلمة "I" (أنا) فتُنطق بالصوت /ai/.'
		},
		practice: [
			{
				questionAr: 'أيّ كلمة تحتوي على الصوت /ai/ (مثل nine)؟',
				options: ['name', 'day', 'fine', 'age'],
				correctIndex: 2,
				diagnosticFeedback: [
					'name تُنطق بالصوت /ei/.',
					'day تُنطق بالصوت /ei/.',
					'أحسنت! fine تُنطق بالصوت /ai/ مثل nine.',
					'age تُنطق بالصوت /ei/.'
				],
				explanationAr: 'كلمة fine تحتوي على النمط i-e وتُنطق بالصوت /ai/.'
			},
			{
				questionAr: 'أيّ كلمة تحتوي على الصوت /ei/ (مثل name)؟',
				options: ['my', 'classmate', 'hi', 'five'],
				correctIndex: 1,
				diagnosticFeedback: [
					'my تُنطق بالصوت /ai/.',
					'ممتاز! المقطع mate في classmate يُنطق بالصوت /ei/.',
					'hi تُنطق بالصوت /ai/.',
					'five تُنطق بالصوت /ai/.'
				],
				explanationAr: 'كلمة classmate تحتوي على الصوت /ei/ في نهايتها مثل name.'
			},
			{
				questionAr: 'استخرج الكلمة المختلفة في النطق (Odd one out):',
				options: ['day', 'play', 'today', 'nice'],
				correctIndex: 3,
				diagnosticFeedback: [
					'day تحتوي على /ei/.',
					'play تحتوي على /ei/.',
					'today تحتوي على /ei/.',
					'صحيح! nice هي الكلمة المختلفة لأنها تنطق بـ /ai/ والبقية بـ /ei/.'
				],
				explanationAr: 'الكلمات day, play, today تنتهي كلها بـ ay (/ei/)، بينما nice تنطق بـ /ai/.'
			},
			{
				questionAr: 'في أيّ عمود نصنّف العدد "eight" (8)؟',
				options: ['عمود /ai/', 'عمود /ei/', 'لا ينتمي لأي منهما', 'في العمودين معا'],
				correctIndex: 1,
				diagnosticFeedback: [
					'انتبه! نطق eight يشبه late و name، وليس nine.',
					'أحسنت! eight تُنطق بالصوت /ei/.',
					'بل يحتوي على الصوت /ei/.',
					'تحتوي الكلمة على صوت واحد فقط هو /ei/.'
				],
				explanationAr: 'العدد eight يُنطق بالصوت /ei/ تماما مثل age و name.'
			},
			{
				questionAr: 'أيّ ثنائي يتفق في الصوت /ai/؟',
				options: ['name / age', 'my / white', 'day / eight', 'play / table'],
				correctIndex: 1,
				diagnosticFeedback: [
					'name و age ينطقان بـ /ei/.',
					'ممتاز! كلاهما (my و white) يُنطق بالصوت /ai/.',
					'day و eight ينطقان بـ /ei/.',
					'play و table ينطقان بـ /ei/.'
				],
				explanationAr: 'الكلمتان my و white تشتركان في الصوت /ai/.'
			}
		]
	}
];
