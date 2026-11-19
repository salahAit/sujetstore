import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishWritingStructure
} from '../../svg-english';

// ============================================================================
// 4 Concise Interactive Lessons — 1AS TCL Trimester 1 (Unit 1: Getting Through)
// ============================================================================

export const LESSONS_1AS_TCL_T1: EnglishInteractiveLessonData[] = [
	// 1. Expressing Purpose (in order to / so as to / to)
	{
		id: 'eng_lesson_1as_tcl_t1_purpose_connectors',
		slug: 'eng-1as-tcl-t1-purpose-connectors',
		grade: '1as_tcl',
		yearSubjectId: 666,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Getting Through — التواصل الثقافي والرسائل',
		order: 1,
		titleAr: 'التعبير عن الغاية في التواصل (Expressing Purpose: in order to, so as to, to)',
		objectives: [
			'استعمال روابط الغاية (to, in order to, so as to) لصياغة جمل تعبر عن هدف التواصل والتعلم',
			'إتقان الغاية المنفية باستعمال (in order not to / so as not to)',
			'توظيف جمل الغاية في رسائل التعارف الثقافي والرسائل الرسمية'
		],
		keywordsAr: ['Purpose', 'in order to', 'so as to', 'in order not to', 'Intercultural Letters'],
		discover: {
			scenarioAr:
				'كتبت التلميذة خديجة من قسنطينة رسالة ثقافية لصديقة مراسلة من ماليزيا قائلة: "I am writing to introduce Algerian cultural heritage. I study English carefully in order to communicate clearly with readers abroad and so as not to make misunderstandings." لاحظ الروابط التي تبيّن هدف الكتابة والدراسة.',
			svg: svgEnglishGrammarMap({
				title: 'Expressing Purpose in Letters and Essays',
				rootLabel: 'Main Clause (Action) + Purpose Clause',
				rootSub: 'Always followed by the Base Verb (Stem)',
				branches: [
					{
						label: 'Neutral',
						rule: 'to + Base Verb',
						example: 'She wrote to share Algerian history.'
					},
					{
						label: 'Formal / Clear',
						rule: 'in order to / so as to + Base Verb',
						example: 'He reads daily in order to enrich his style.'
					},
					{
						label: 'Negative Purpose',
						rule: 'in order not to / so as not to + Base Verb',
						example: 'Check punctuation so as not to confuse readers.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الصيغة الفعلية التي تتبع دائما الروابط (to / in order to / so as to)؟',
					hintAr: 'تأمّل الأفعال introduce و communicate و make في نص خديجة.',
					expectedInput: 'الفعل المجرد بدون أي إضافة (Stem)',
					revealAr: 'بعد هذه الروابط نضع دائما الفعل المجرد (Stem) دون إضافة s أو ed أو ing.'
				},
				{
					promptAr: 'كيف نحول جملتين: "Imam Ben Badis founded schools. He wanted to educate Algerian youth." إلى جملة واحدة بـ in order to؟',
					hintAr: 'احذف الفاعل الثاني وفعل want.',
					expectedInput: 'Imam Ben Badis founded schools in order to educate Algerian youth.',
					revealAr: 'نحذف He wanted ونربط مباشرة بـ in order to + educate.'
				},
				{
					promptAr: 'أين نضع كلمة not في الغاية المنفية؟',
					hintAr: 'قارن بين so as not to و so as to not.',
					expectedInput: 'قبل كلمة to مباشرة (in order not to / so as not to)',
					revealAr: 'في الإنجليزية الفصيحة نضع not قبل to مباشرة: in order not to / so as not to.'
				}
			]
		},
		summary: {
			rulesAr: [
				'للتعبير عن الغاية المثبتة مع نفس الفاعل: Action + to / in order to / so as to + Base Verb.',
				'للتعبير عن الغاية المنفية: Action + in order not to / so as not to + Base Verb.',
				'عند ربط جملتين لهما نفس الفاعل نحذف الفاعل المكرر وأفعال الرغبة (want to / aim to / wish to).',
				'يمكن تقديم عبارة الغاية في بداية الجملة متبوعة بفاصلة: In order to write politely, avoid slang words.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Step-by-Step Purpose Sentence Combining',
				rootLabel: 'A: She reads classical Arabic and English.  B: She wants to translate articles.',
				branches: [
					{
						label: 'Step 1',
						rule: 'Keep sentence A intact',
						example: 'She reads classical Arabic and English'
					},
					{
						label: 'Step 2',
						rule: 'Replace "She wants to"',
						example: 'Insert: in order to / so as to'
					},
					{
						label: 'Step 3',
						rule: 'Keep base verb + rest',
						example: '...in order to translate articles.'
					}
				]
			}),
			visualCaptionAr: 'الخطوات الثلاث لربط جملتين برابط الغاية',
			examples: [
				{
					problemAr: 'اربط بـ so as to: "Sheikh El Ibrahimi wrote clear essays. He aimed to awaken national consciousness."',
					solutionAr: 'Sheikh El Ibrahimi wrote clear essays so as to awaken national consciousness.'
				},
				{
					problemAr: 'اربط بـ in order not to: "Amina revised her formal letter twice. She did not want to leave spelling mistakes."',
					solutionAr: 'Amina revised her formal letter twice in order not to leave spelling mistakes.'
				}
			],
			watchOutAr:
				'انتبه! لا تستعمل for + الفعل المجرد للتعبير عن الغاية (خطأ: for learn English)، بل قل "to learn / in order to learn English".'
		},
		practice: [
			{
				questionAr: 'أكمل الجملة: "Khadidja writes letters in English .......... learn about other Muslim cultures."',
				options: ['in order to', 'for to', 'in order not', 'so as'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! in order to + الفعل المجرد learn تعبر عن الغاية المثبتة.',
					'تركيب خاطئ في الإنجليزية.',
					'ناقصة وتخالف المعنى المثبت.',
					'ينقصها to لتصبح so as to.'
				],
				explanationAr: 'للتعبير عن الغاية المثبتة نستعمل in order to + Base Verb.'
			},
			{
				questionAr: 'اختر الجملة السليمة للتعبير عن الغاية المنفية:',
				options: [
					'Speak clearly so as to not be misunderstood.',
					'Speak clearly so as not to be misunderstood.',
					'Speak clearly in order to not being misunderstood.',
					'Speak clearly not in order to be misunderstood.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'يجب أن تسبق not كلمة to.',
					'ممتاز! التركيب الدقيق هو so as not to + be.',
					'خطأ في موضع not وفي استعمال being.',
					'ترتيب الكلمات غير صحيح.'
				],
				explanationAr: 'نفي الغاية يكون دائما بوضع not قبل to: so as not to / in order not to.'
			},
			{
				questionAr: 'اختر الشكل الصحيح للفعل: "Students visit the public library so as to .......... authentic history books."',
				options: ['reading', 'read', 'reads', 'has read'],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نضع ing بعد so as to.',
					'صحيح! بعد so as to يأتي الفعل المجرد read.',
					'لا نضيف s بعد to.',
					'الفعل المصرف في التام لا يصح بعد to.'
				],
				explanationAr: 'القاعدة: so as to يتبعها دائما الفعل المجرد.'
			},
			{
				questionAr: 'ما الجملة المكافئة لـ: "He sent a polite email. He wanted to request museum visiting hours."؟',
				options: [
					'He sent a polite email in order to request museum visiting hours.',
					'He sent a polite email in order to he requests museum visiting hours.',
					'He sent a polite email for request museum visiting hours.',
					'He sent a polite email so as not to request museum visiting hours.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! حذفنا He wanted وربطنا بـ in order to + request.',
					'لا نكرر الفاعل he بعد in order to.',
					'لا نستعمل for قبل الفعل المجرد request.',
					'استعملت النفي وهو يعكس معنى الجملة.'
				],
				explanationAr: 'نحذف الفاعل المكرر وفعل want ونربط بـ in order to + Stem.'
			},
			{
				questionAr: 'أكمل بداية الجملة: ".......... improve your writing style, read well-written books every week."',
				options: ['In order to', 'Because to', 'Although to', 'So as not'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! يمكن البدء بـ In order to متبوعة بفاصلة.',
					'because لا تتبعها to.',
					'although أداة استدراك وليست للغاية.',
					'ينقصها to وتعكس المعنى.'
				],
				explanationAr: 'تأتي In order to + improve في أول الجملة لتحديد الهدف بوضوح.'
			}
		]
	},

	// 2. Correlative Conjunctions (both...and / either...or / neither...nor)
	{
		id: 'eng_lesson_1as_tcl_t1_correlative_conjunctions',
		slug: 'eng-1as-tcl-t1-correlative-conjunctions',
		grade: '1as_tcl',
		yearSubjectId: 666,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Getting Through — التواصل الثقافي والرسائل',
		order: 2,
		titleAr: 'الروابط المزدوجة (both ... and / either ... or / neither ... nor)',
		objectives: [
			'استعمال both ... and للجمع بين عنصرين إيجابا مع فعل في صيغة الجمع',
			'استعمال either ... or للتخيير بين أمرين بدقة',
			'استعمال neither ... nor لنفي عنصرين معا دون نفي مزدوج ومراعاة مطابقة الفعل لأقرب فاعل'
		],
		keywordsAr: ['both ... and', 'either ... or', 'neither ... nor', 'Subject-Verb Agreement'],
		discover: {
			scenarioAr:
				'في قسم السنة الأولى آداب، قدّمت الأستاذة ثلاث جمل حول وسائل التواصل: 1) "Both letters and emails require polite language." 2) "You can submit your essay either by email or on paper." 3) "Neither slang nor contractions belong in a formal letter." لاحظ معنى كل رابط مزدوج وشكل الفعل معه.',
			svg: svgEnglishGrammarMap({
				title: 'Correlative Conjunctions in English',
				rootLabel: 'Paired Linkers Joining Equal Elements',
				rootSub: 'Noun+Noun | Verb+Verb | Adj+Adj',
				branches: [
					{
						label: 'both ... and',
						rule: 'Addition (2 items) + Plural Verb',
						example: 'Both Ali and Omar speak English.'
					},
					{
						label: 'either ... or',
						rule: 'Choice (1 of 2) | Verb matches 2nd subject',
						example: 'Either tea or dates are served.'
					},
					{
						label: 'neither ... nor',
						rule: 'Double Exclusion + Affirmative Verb',
						example: 'Neither Fatima nor Sara was absent.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الفرق في المعنى بين "both ... and" و "either ... or" و "neither ... nor"؟',
					hintAr: 'الأول للجمع، الثاني للتخيير، الثالث للنفي.',
					expectedInput: 'both...and للجمع، either...or للتخيير، neither...nor لنفي الأمرين معا',
					revealAr:
						'both ... and تعني "كلا ... و ..."؛ either ... or تعني "إما ... أو ..."؛ neither ... nor تعني "لا ... ولا ...".'
				},
				{
					promptAr: 'لماذا جاء الفعل "belong" مثبتا (بدون do not) في جملة: "Neither slang nor contractions belong in a formal letter"؟',
					hintAr: 'هل تحمل كلمة neither معنى النفي بذاتها؟',
					expectedInput: 'لأن neither ... nor تفيد النفي فلا نضيف not للفعل',
					revealAr:
						'في الإنجليزية يمنع النفي المزدوج؛ بما أن neither ... nor تنفي الجملة، يجب أن يكون الفعل بعدها مثبتا دائما.'
				},
				{
					promptAr: 'مع "both ... and" كفاعل، هل يكون الفعل مفردا أم جمعا؟ ومع "either ... or / neither ... nor" كيف نضبط الفعل؟',
					hintAr: 'انظر إلى: Both Ali and Sami ARE here / Neither the pupils nor the teacher IS late.',
					expectedInput: 'both...and تأخذ جمعا دائما، أما either...or و neither...nor فتطابقان الفاعل الأقرب للفعل',
					revealAr:
						'both ... and تأخذ دائما فعلا في الجمع. أما either ... or و neither ... nor فيتبع الفعل فيهما الفاعل الثاني الأقرب إليه.'
				}
			]
		},
		summary: {
			rulesAr: [
				'both A and B (كلاهما): تربط شيئين مشتركين وتأخذ دائما فعلا في الجمع عندما تكون فاعلا. مثال: Both Imam Ben Badis and Sheikh El Ibrahimi defended Arabic.',
				'either A or B (إما هذا أو ذاك): تعبر عن اختيار واحد من بديلين. مثال: We can meet either on Sunday or on Tuesday.',
				'neither A nor B (لا هذا ولا ذاك): تنفي الأمرين معا ويأتي معها الفعل مثبتا دائما (نحذف not / do not / does not عند التحويل).',
				'قاعدة مطابقة الفعل (Proximity Rule): مع either...or و neither...nor يطابق الفعل الاسم الثاني (الأقرب إليه): Neither the students nor the principal was notified. / Neither the principal nor the students were notified.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Rewriting Negative Sentences with neither ... nor',
				rootLabel: 'Karim does not like noise. Amine does not like noise.',
				branches: [
					{
						label: '1. Drop "does not"',
						rule: 'Remove negative auxiliary',
						example: 'Verb becomes affirmative: likes'
					},
					{
						label: '2. Pair Subjects',
						rule: 'Neither Karim nor Amine',
						example: '2nd subject (Amine) is singular'
					},
					{
						label: '3. Final Sentence',
						rule: 'Neither Karim nor Amine likes noise.',
						example: 'Clean, zero double negative'
					}
				]
			}),
			visualCaptionAr: 'طريقة تحويل جملتين منفيتين إلى جملة واحدة بـ neither ... nor',
			examples: [
				{
					problemAr: 'اربط بـ neither ... nor: "Salma does not speak German. Meriem does not speak German."',
					solutionAr: 'Neither Salma nor Meriem speaks German.'
				},
				{
					problemAr: 'اربط بـ both ... and: "Tlemcen is famous for history. Constantine is famous for history."',
					solutionAr: 'Both Tlemcen and Constantine are famous for history.'
				}
			],
			watchOutAr:
				'احذر من خطأين شائعين: كتابة "neither ... or" (الصحيح neither مع nor و either مع or)، ووضع النفي مع neither مثل "Neither Ali nor Omar does not read" والصحيح "Neither Ali nor Omar reads".'
		},
		practice: [
			{
				questionAr: 'اختر الرابط المزدوج الصحيح: "You can send the invitation .......... by letter .......... by email."',
				options: ['neither ... or', 'either ... or', 'both ... or', 'either ... nor'],
				correctIndex: 1,
				diagnosticFeedback: [
					'neither تقترن بـ nor وليس or.',
					'أحسنت! للتخيير بين وسيلتين نستعمل either ... or.',
					'both تقترن بـ and وليس or.',
					'either تقترن بـ or وليس nor.'
				],
				explanationAr: 'الازدواج الصحيح هو: both...and / either...or / neither...nor.'
			},
			{
				questionAr: 'اختر الجملة السليمة نحويا عند ربط: "Nadia did not attend. Yasmine did not attend."',
				options: [
					'Neither Nadia nor Yasmine did not attend.',
					'Neither Nadia nor Yasmine attended.',
					'Neither Nadia or Yasmine attended.',
					'Either Nadia nor Yasmine attended.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ النفي المزدوج (Neither + did not).',
					'ممتاز! حذفنا did not وأبقينا الفعل في الماضي المثبت attended.',
					'neither تتبعها nor لا or.',
					'تركيبة خاطئة بين either و nor.'
				],
				explanationAr: 'مع neither ... nor يكون الفعل مثبتا دائما: attended.'
			},
			{
				questionAr: 'اختر تصريف الفعل الصحيح: "Both classical poetry and historical prose .......... taught in literary streams."',
				options: ['is', 'are', 'was', 'has'],
				correctIndex: 1,
				diagnosticFeedback: [
					'both ... and تأخذ دائما فعلا جمعا.',
					'أحسنت! الفاعل المبدوء بـ Both ... and يعامل جمعا فنختار are.',
					'was للمفرد الماضي.',
					'has للمفرد ولا تناسب المبني للمجهول هنا.'
				],
				explanationAr: 'كل فاعل مكون من Both A and B يتبعه فعل في الجمع (are).'
			},
			{
				questionAr: 'اختر الفعل المطابق لأقرب فاعل: "Neither the teacher nor the pupils .......... ready to leave early."',
				options: ['is', 'was', 'were', 'has been'],
				correctIndex: 2,
				diagnosticFeedback: [
					'أقرب فاعل هو the pupils (جمع).',
					'was للمفرد بينما the pupils جمع.',
					'صحيح! أقرب فاعل للفعل هو the pupils (جمع) فيأخذ were.',
					'has been للمفرد.'
				],
				explanationAr: 'في neither ... nor يطابق الفعل الفاعل الثاني الأقرب إليه (the pupils: were).'
			},
			{
				questionAr: 'أكمل الجملة: "The cultural booklet is .......... informative .......... easy to read."',
				options: ['both / and', 'neither / and', 'either / and', 'both / nor'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! both ... and تجمع بين الصفتين الإيجابيتين.',
					'لا يجتمع neither مع and.',
					'لا يجتمع either مع and.',
					'لا يجتمع both مع nor.'
				],
				explanationAr: 'للجمع بين صفتين متوافقتين نستخدم both ... and.'
			}
		]
	},

	// 3. Modals of Obligation, Necessity & Prohibition
	{
		id: 'eng_lesson_1as_tcl_t1_modals_obligation',
		slug: 'eng-1as-tcl-t1-modals-obligation',
		grade: '1as_tcl',
		yearSubjectId: 666,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Getting Through — التواصل الثقافي والرسائل',
		order: 3,
		titleAr: 'أفعال الإلزام والضرورة والمنع (Modals: must, have to, need to, must not, do not have to)',
		objectives: [
			'التمييز بين الإلزام القوي والضرورة (must, have to, need to)',
			'التفريق الدقيق بين المنع التام (must not) وغياب الضرورة (do not have to / need not)',
			'تصريف have to و need to مع الضمائر المختلفة وفي الماضي (had to)'
		],
		keywordsAr: ['Modals', 'must', 'have to', 'need to', 'must not', 'do not have to'],
		discover: {
			scenarioAr:
				'علّقت أمينة مكتبة الثانوية لوحة إرشادات للتلاميذ: "1. Readers must keep silent inside the reading room. 2. Students have to show their library card to borrow books. 3. You must not write on library books. 4. You do not have to pay any fee; borrowing is free." لاحظ الفرق الجوهري بين الجملة 3 والجملة 4.',
			svg: svgEnglishGrammarMap({
				title: 'Obligation, Prohibition and Absence of Necessity',
				rootLabel: 'Modal Expression + Base Verb (Stem)',
				rootSub: 'Watch the crucial difference in the negative!',
				branches: [
					{
						label: 'Obligation / Duty',
						rule: 'must / have to / need to + Stem',
						example: 'You must respect library rules.'
					},
					{
						label: 'Prohibition (Forbidden)',
						rule: 'must not (mustn-t) + Stem',
						example: 'You must not share private passwords.'
					},
					{
						label: 'No Obligation (Optional)',
						rule: 'do/does not have to + Stem',
						example: 'You do not have to pay; it is free.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الفرق في المعنى بين "You must not write on books" و "You do not have to pay"؟',
					hintAr: 'الأول أمر ممنوع تماما، والثاني أمر غير واجب أو غير لازم.',
					expectedInput: 'must not تعني المنع التام، و do not have to تعني عدم الضرورة',
					revealAr:
						'must not تعني "ممنوع بتاتا" (Prohibition)، بينما do not have to / does not have to تعني "ليس ضروريا / لا داعي" (Absence of obligation).'
				},
				{
					promptAr: 'كيف نصوغ الماضي من must و have to عند الحديث عن واجب أدّيناه بالأمس؟',
					hintAr: 'must ليس لها صيغة ماض خاصة فتستعير ماضي have to.',
					expectedInput: 'had to + Base Verb',
					revealAr: 'في الماضي نستعمل دائما had to + الفعل المجرد (مثال: Yesterday, I had to finish my essay).'
				},
				{
					promptAr: 'هل نضع كلمة "to" بعد must؟ وهل نضيف s إلى must مع he/she؟',
					hintAr: 'قارن: She must study مقابل She has to study.',
					expectedInput: 'لا نضع to ولا s مع must، بينما have to تصبح has to مع المفرد الغائب',
					revealAr:
						'must فعل ناقص جامد (لا يأخذ s ولا يتبعه to): She must read. أما have to و need to فيتغيران مع he/she/it: She has to read / She needs to read.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الإلزام والضرورة في الحاضر: must + Stem (إلزام شخصي أو قانوني قوي) — have to / has to + Stem (قانون خارجي) — need to / needs to + Stem (حاجة وضرورة).',
				'الإلزام في الماضي: had to + Stem لجميع الضمائر (لا نقول musted أبدا).',
				'المنع والتحريم (Prohibition): must not + Stem (شيء ممنوع فعله: Pupils must not cheat in exams).',
				'عدم الضرورة (Absence of obligation): do not have to / does not have to / need not + Stem (شيء غير واجب: On Friday, students do not have to go to school).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Conjugating have to and need to',
				rootLabel: 'Subject Agreement and Past Form',
				branches: [
					{
						label: 'I / You / We / They',
						rule: 'have to / do not have to',
						example: 'They have to arrive at 8 a.m.'
					},
					{
						label: 'He / She / It',
						rule: 'has to / does not have to',
						example: 'She has to write a formal reply.'
					},
					{
						label: 'Past (All Subjects)',
						rule: 'had to / did not have to',
						example: 'We had to send the letter early.'
					}
				]
			}),
			visualCaptionAr: 'تصريف have to حسب الضمائر والزمن',
			examples: [
				{
					problemAr: 'اختر بين must not و do not have to: "Entry to the cultural museum is free today; visitors .......... buy tickets."',
					solutionAr: 'visitors do not have to buy tickets. (عدم ضرورة لأن الدخول مجاني).'
				},
				{
					problemAr: 'حوّل الجملة إلى الماضي: "Amine must apologize for his late reply."',
					solutionAr: 'Amine had to apologize for his late reply.'
				}
			],
			watchOutAr:
				'احذر من الخطأ الأشهر في الامتحان: الخلط بين must not (ممنوع) و do not have to (غير ضروري)! وكذلك خطأ كتابة "must to study" (الصحيح must study بدون to).'
		},
		practice: [
			{
				questionAr: 'أكمل الجملة بما يناسب المعنى: "Students .......... use mobile phones during official examinations; it is strictly forbidden."',
				options: ['do not have to', 'must not', 'need to', 'have to'],
				correctIndex: 1,
				diagnosticFeedback: [
					'do not have to تعني اختياريا وليس ممنوعا.',
					'أحسنت! المنع الصارم يعبر عنه بـ must not.',
					'need to تعني الضرورة وهي عكس المعنى.',
					'have to تعني الإلزام لا المنع.'
				],
				explanationAr: 'العبارة "strictly forbidden" تدل على المنع التام فنستعمل must not.'
			},
			{
				questionAr: 'أكمل الجملة: "The workshop is completely free, so participants .......... pay any money."',
				options: ['must not', 'do not have to', 'has to', 'must'],
				correctIndex: 1,
				diagnosticFeedback: [
					'must not تعني ممنوع، والمعنى هنا عدم الحاجة للدفع لأنه مجاني.',
					'ممتاز! عدم الضرورة يعبر عنه بـ do not have to.',
					'participants جمع والمعنى غياب الإلزام.',
					'must تعني الإلزام وهو عكس المعنى.'
				],
				explanationAr: 'عدم وجود رسوم يعني غياب الضرورة: do not have to.'
			},
			{
				questionAr: 'اختر الجملة الصحيحة نحويا مع المفرد الغائب:',
				options: [
					'Meriem must to send her letter before Monday.',
					'Meriem has to send her letter before Monday.',
					'Meriem have to send her letter before Monday.',
					'Meriem musts send her letter before Monday.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نضع to بعد must.',
					'صحيح! Meriem (مفرد غائب) تأخذ has to + send.',
					'مع المفرد الغائب نستعمل has to لا have to.',
					'الفعل الناقص must لا يأخذ s أبدا.'
				],
				explanationAr: 'مع He/She/It نستعمل has to + Stem أو must + Stem.'
			},
			{
				questionAr: 'حوّل إلى الماضي: "We must check our postal address carefully."',
				options: [
					'We musted check our postal address carefully.',
					'We had to check our postal address carefully.',
					'We have to checked our postal address carefully.',
					'We must checked our postal address carefully.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا توجد كلمة musted في الإنجليزية.',
					'أحسنت! صيغة الماضي من must هي had to + الفعل المجرد.',
					'لا نضيف ed بعد to.',
					'لا نضع الماضي بعد must.'
				],
				explanationAr: 'ماضي الإلزام لـ must و have to هو دائما had to + Stem.'
			},
			{
				questionAr: 'أكمل الجملة: "Every pen-pal .......... respect the cultural and religious values of others."',
				options: ['need', 'needs to', 'needing to', 'does not need'],
				correctIndex: 1,
				diagnosticFeedback: [
					'Every pen-pal مفرد وتحتاج to قبل الفعل هنا.',
					'إجابة موفقة! Every pen-pal مفرد غائب فتأخذ needs to + respect.',
					'صيغة ناقصة بدون فعل مساعد.',
					'تخالف المعنى الأخلاقي الإيجابي للجملة.'
				],
				explanationAr: 'مع الفاعل المفرد الغائب نستعمل needs to + Base Verb.'
			}
		]
	},

	// 4. Writing Formal & Informal Letters
	{
		id: 'eng_lesson_1as_tcl_t1_formal_informal_letters',
		slug: 'eng-1as-tcl-t1-formal-informal-letters',
		grade: '1as_tcl',
		yearSubjectId: 666,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Getting Through — التواصل الثقافي والرسائل',
		order: 4,
		titleAr: 'كتابة الرسالة الرسمية والرسالة الشخصية (Formal and Informal Letters)',
		objectives: [
			'التمييز الدقيق بين مكونات الرسالة الرسمية والرسالة الشخصية (الأسلوب، التحية، الخاتمة)',
			'كتابة رسالة شخصية لصديق مراسلة لتعريفه بالجزائر وتراثها الإسلامي والعربي',
			'كتابة رسالة رسمية مهذبة لطلب معلومات أو التقدم لدورة ثقافية'
		],
		keywordsAr: ['Formal Letter', 'Informal Letter', 'Pen-Pal Letter', 'Register', 'Layout'],
		discover: {
			scenarioAr:
				'قارن بين رسالتين كتبتهما التلميذة مريم في الأسبوع نفسه: الأولى لمدير المكتبة البلدية بدأت بـ "Dear Sir or Madam, I am writing to inquire about..." وختمت بـ "Yours faithfully,". والثانية لصديقة مراسلة من تونس بدأت بـ "Dear Aisha, Thank you for your lovely letter!" وختمت بـ "Best wishes, Meriem". لماذا اختلف الأسلوب؟',
			svg: svgEnglishWritingStructure({
				title: 'Layout of an Informal Pen-Pal Letter',
				steps: [
					{ stage: 'Address and Date', detail: 'Top right corner: City, Algeria + Date (15 October 2026)' },
					{ stage: 'Warm Greeting', detail: 'Dear Aisha, / Dear Karim, (first name only)' },
					{ stage: 'Friendly Body', detail: '1. Thank/Greet  2. Introduce yourself/Algeria  3. Ask questions' },
					{ stage: 'Warm Sign-off', detail: 'Write back soon! Best wishes, / Warm regards, + First name' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الفارق الأساسي في العناوين الموجودة أعلى الصفحة بين الرسالة الرسمية والرسالة الشخصية؟',
					hintAr: 'في الرسالة الرسمية نكتب عنوانين، وفي الشخصية عنوانا واحدا.',
					expectedInput: 'الرسالة الرسمية فيها عنوان المرسل وعنوان المرسل إليه، والشخصية فيها عنوان المرسل فقط',
					revealAr:
						'تحتوي الرسالة الرسمية على عنوان المرسل (أعلى اليمين) وعنوان المرسل إليه (أعلى اليسار)، بينما تكتفي الرسالة الشخصية بعنوان المرسل والتاريخ أعلى اليمين.'
				},
				{
					promptAr: 'هل يسمح باستعمال الاختصارات مثل "I-m" و "It-s" في الرسالة الشخصية لصديق مراسلة؟',
					hintAr: 'تذكر أن الأسلوب الشخصي ودي وقريب من لغة الحديث المهذب.',
					expectedInput: 'نعم، مسموح بها في الرسالة الشخصية وممنوعة في الرسالة الرسمية',
					revealAr: 'في الرسالة الشخصية (Informal) يجوز استعمال الاختصارات والعبارات الدافئة، أما في الرسالة الرسمية (Formal) فتكتب الكلمات كاملة.'
				},
				{
					promptAr: 'ما أفضل موضوعات يمكن أن يشاركها تلميذ جزائري في رسالة تعارف ثقافي (Pen-Pal Letter)؟',
					hintAr: 'فكّر في مدينتك، مدرستك، هواياتك المفيدة، ومعالم الجزائر.',
					expectedInput: 'التعريف بالنفس وبالمدرسة والهوايات المفيدة ومعالم الجزائر كالقصبة وقسنطينة وتلمسان',
					revealAr:
						'يمكن التعريف بالسن والشعبة الأدبية، الهوايات النافعة (المطالعة والخط العربي والرياضة)، ووصف مدينتك ومعالم الجزائر الأصيلة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الرسالة الرسمية (Formal): موجهة لمدير أو إدارة — عنوانان — Dear Sir or Madam / Dear Mr. Name — لغة كاملة بلا اختصارات — خاتمة Yours faithfully / Yours sincerely + الاسم الكامل.',
				'الرسالة الشخصية (Informal / Pen-Pal): موجهة لصديق أو قريب — عنوان المرسل والتاريخ فقط — Dear + الاسم الأول — لغة ودية مهذبة — خاتمة Best wishes / Warm regards + الاسم الأول.',
				'عبارات افتتاح مفيدة للرسالة الشخصية: "Thank you for your kind letter.", "I hope this letter finds you and your family in good health.", "Let me tell you about my city in Algeria."',
				'عبارات افتتاح مفيدة للرسالة الرسمية: "I am writing to apply for...", "I am writing to request information about...", "I would be grateful if you could...".'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Formal vs Informal Letter Checklist',
				rootLabel: 'Match Register to Your Audience',
				branches: [
					{
						label: 'Addresses',
						rule: 'Formal: 2 addresses',
						example: 'Informal: Sender address only'
					},
					{
						label: 'Language Style',
						rule: 'Formal: No contractions, polite',
						example: 'Informal: Friendly, contractions OK'
					},
					{
						label: 'Signature',
						rule: 'Formal: Yours faithfully + Full Name',
						example: 'Informal: Best wishes + First Name'
					}
				]
			}),
			visualCaptionAr: 'مقارنة شاملة بين خصائص الرسالة الرسمية والرسالة الشخصية',
			examples: [
				{
					problemAr: 'صنّف العبارتين إلى رسمي (Formal) وغير رسمي (Informal): A) "Best wishes, Karim" — B) "I am writing to request details about the calligraphy exhibition."',
					solutionAr: 'A) Informal (رسالة شخصية) | B) Formal (رسالة رسمية).'
				},
				{
					problemAr: 'اكتب جملتين لافتتاح رسالة لصديق مراسلة تصف فيها مدينتك الجزائرية.',
					solutionAr: 'Dear Tariq, I hope you and your family are in good health. I live in Tlemcen, a historic Algerian city famous for its Great Mosque and rich Andalusian heritage.'
				}
			],
			watchOutAr:
				'لا تخلط الأسلوبين في الرسالة نفسها! لا تبدأ بـ "Dear Sir or Madam" ثم تختم بـ "Best wishes, Amine"، ولا تكتب "Yours faithfully" لصديقك المقرب.'
		},
		practice: [
			{
				questionAr: 'أي عبارة افتتاحية مناسبة لرسالة شخصية (Informal Letter) إلى صديق مراسلة؟',
				options: [
					'Dear Sir or Madam,',
					'To Whom It May Concern,',
					'Dear Hamza,',
					'Dear Director of Administration,'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'تحية رسمية لا تستعمل مع الأصدقاء.',
					'عبارة رسمية إدارية.',
					'أحسنت! في الرسالة الشخصية نكتب Dear متبوعة بالاسم الأول.',
					'تحية رسمية لجهة إدارية.'
				],
				explanationAr: 'الرسالة الشخصية تبدأ بـ Dear + الاسم الأول للصديق.'
			},
			{
				questionAr: 'أي عبارة ختامية تناسب رسالة شخصية إلى صديقة مراسلة؟',
				options: ['Yours faithfully,', 'Best wishes,', 'Yours sincerely, Miss Meriem Benali', 'Respectfully submitted,'],
				correctIndex: 1,
				diagnosticFeedback: [
					'Yours faithfully للرسائل الرسمية فقط.',
					'ممتاز! Best wishes أو Warm regards مناسبة جدا للرسالة الشخصية.',
					'رسمية للغاية ولا تناسب الأصدقاء.',
					'خاتمة إدارية رسمية.'
				],
				explanationAr: 'نختم الرسالة الشخصية بعبارة دافئة مثل Best wishes متبوعة بالاسم الأول.'
			},
			{
				questionAr: 'ما الخطأ في رسالة رسمية تبدأ بـ "Dear Sir or Madam," وتنتهي بـ "Write back soon! Cheers, Ali"؟',
				options: [
					'عدم وجود تاريخ',
					'الخلط بين الأسلوب الرسمي في الافتتاح والأسلوب غير الرسمي في الخاتمة',
					'استخدام علامة التعجب في العنوان',
					'لا يوجد أي خطأ'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الخلل الأبرز في التناقض الأسلوبي بين الافتتاح والخاتمة.',
					'صحيح! يجب الحفاظ على وحدة الأسلوب الرسمي فتكون الخاتمة Yours faithfully + الاسم الكامل.',
					'العنوان غير مذكور هنا.',
					'هناك خطأ واضح في الأسلوب (Register).'
				],
				explanationAr: 'الانسجام الأسلوبي شرط أساسي: الافتتاح الرسمي يتطلب خاتمة رسمية (Yours faithfully).'
			},
			{
				questionAr: 'أين نكتب عنوان المرسل والتاريخ في الرسالة الإنجليزية القياسية؟',
				options: [
					'في أسفل الصفحة على اليسار',
					'في أعلى الصفحة على اليمين',
					'في منتصف الفقرة الثانية',
					'بعد التوقيع مباشرة'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ليس في أسفل الصفحة.',
					'أحسنت! يوضع عنوان المرسل والتاريخ في الزاوية العليا اليمنى.',
					'لا يوضع داخل فقرات النص.',
					'العنوان يسبق التحية لا يتبع التوقيع.'
				],
				explanationAr: 'في تخطيط الرسائل الإنجليزية نضع عنوان المرسل والتاريخ أعلى اليمين.'
			},
			{
				questionAr: 'أي جملة تصلح لرسالة رسمية تطلب فيها الانضمام لنادي الخط العربي والأدب؟',
				options: [
					'Hey, put my name in the club list!',
					'I am writing to apply for membership in your Arabic calligraphy and literature club.',
					'I wanna enter your club next week.',
					'Give me a place in the club, please.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'أسلوب عامي وغير مهذب.',
					'إجابة ممتازة! لغة رسمية واضحة ومهذبة وكاملة.',
					'wanna كلمة عامية مرفوضة في الرسائل الرسمية.',
					'أسلوب أمري غير مناسب لرسالة طلب رسمية.'
				],
				explanationAr: 'تبدأ رسالة الطلب الرسمية بـ I am writing to apply for...'
			}
		]
	}
];
