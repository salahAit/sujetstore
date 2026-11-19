import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishTenseTimeline,
	svgEnglishWritingStructure
} from '../../svg-english';

export const LESSONS_3AM_T2: EnglishInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// 1. Past Habits with "Used to" (Past vs Present Algerian Lifestyles)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_3am_t2_used_to_lifestyles',
		slug: 'eng-3am-t2-used-to-lifestyles',
		grade: '3am',
		yearSubjectId: 636,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: أنا وأنماط الحياة (Me and Lifestyles)',
		order: 1,
		titleAr: 'العادات الماضية بـ used to (مقارنة نمط الحياة الجزائري قديماً وحديثاً)',
		objectives: [
			'استعمال الصيغة (used to + stem) للتعبير عن عادات وأنماط حياة كانت في الماضي وتغيّرت اليوم',
			'إتقان النفي (did not use to) والاستفهام (Did ... use to?) دون الوقوع في خطأ حرف d'
		],
		keywordsAr: ['used to', 'did not use to', 'Did you use to', 'past habits', 'lifestyles'],
		discover: {
			scenarioAr:
				'يروي الجدّ صالح لحفيده عن الحياة في الجزائر قديماً: "In the past, Algerian families used to live in large stone houses and bake traditional bread in clay ovens. We did not use to have smartphones. Did your parents use to walk to school?" قارن بين كتابة (used to) في الإثبات و (use to) في النفي والسؤال!',
			svg: svgEnglishTenseTimeline({
				title: 'Past Habits & Lifestyles',
				tenseName: 'Used to + Verb (stem)',
				formula: 'S + used to + stem  |  S + did not use to + stem',
				activeZone: 'past',
				example: 'Grandparents used to wear traditional burnous and wool clothes.',
				markers: 'in the past, fifty years ago, when I was young, long ago'
			}),
			steps: [
				{
					promptAr: 'ما الصيغة التي استعملها الجد للتعبير عن عادة السكن في البيوت الحجرية قديماً؟',
					hintAr: 'تأتي قبل الفعل live مباشرة.',
					expectedInput: 'used to',
					revealAr: 'استعمل (used to + bare stem): families used to live.'
				},
				{
					promptAr: 'ماذا حدث لحرف (d) في كلمة (used) عندما نفينا الجملة بـ (did not) وعندما سألنا بـ (Did)؟',
					hintAr: 'انظر إلى: did not use to و Did ... use to.',
					expectedInput: 'حُذف حرف d وأصبحت use to',
					revealAr: 'لأن (did) تحمل علامة الماضي، نُرجع الفعل إلى أصله (use to) بدون حرف d!'
				},
				{
					promptAr: 'هل لا يزال الناس اليوم يعتمدون على نفس العادة المذكورة بـ (used to) عادةً؟',
					hintAr: 'used to تُقارن بين الماضي والحاضر.',
					expectedInput: 'لا، إنها عادة ماضية تغيّرت في الحاضر',
					revealAr: 'صحيح! (used to) تعبّر عن عادة أو حالة كانت مستمرة في الماضي ولم تعد كذلك اليوم.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الإثبات (Affirmative): Subject + used to + Verb (stem) — مثال: People used to travel by horses and camels.',
				'النفي (Negative): Subject + did not use to + Verb (stem) — مثال: Children did not use to play video games.',
				'الاستفهام (Interrogative): Did + Subject + use to + Verb (stem)? — مثال: Did your grandmother use to weave carpets?',
				'تُستعمل (used to) للمقارنة بين نمط الحياة الجزائري القديم (traditional dishes like couscous, wool clothes, clay houses, outdoor games) ونمط الحياة الحديث.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Forms of USED TO (Past Habits)',
				rootLabel: 'Talking about Past Lifestyles',
				rootSub: 'Always followed by bare stem (no -ed, no -ing)',
				branches: [
					{ label: 'Affirmative (+)', rule: 'S + used to + stem', example: 'They used to bake bread.', color: '#047857' },
					{ label: 'Negative (-)', rule: 'S + did not use to + stem', example: 'They did not use to own cars.', color: '#b45309' },
					{ label: 'Question (?)', rule: 'Did + S + use to + stem?', example: 'Did you use to walk far?', color: '#1d4ed8' }
				]
			}),
			visualCaptionAr: 'حالات الإثبات والنفي والاستفهام لصيغة used to مع حذف حرف d بعد did',
			examples: [
				{
					problemAr: 'صحّح الخطأ: "In 1960, pupils did not used to use tablets."',
					solutionAr: 'In 1960, pupils did not use to use tablets. (نحذف d بعد did not).'
				},
				{
					problemAr: 'حوّل إلى الاستفهام: "Your grandfather used to work on a farm."',
					solutionAr: 'Did your grandfather use to work on a farm?'
				}
			],
			watchOutAr:
				'الخطأ الأكثر تكراراً في 3AM هو كتابة (did not used to) أو (Did you used to) بحرف d! تذكّر: متى ظهر (did / did not) اختفى حرف d من (use to) فوراً.'
		},
		practice: [
			{
				questionAr: 'اختر الجملة الصحيحة لوصف عادة ماضية:',
				options: [
					'Long ago, families used to lived in stone houses.',
					'Long ago, families used to live in stone houses.',
					'Long ago, families use to live in stone houses.',
					'Long ago, families used living in stone houses.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'بعد used to يأتي الفعل مجرداً (live) وليس في الماضي.',
					'ممتاز! Subject + used to + bare stem (live).',
					'في الإثبات نحتاج إلى حرف d في used to.',
					'الصيغة هي used to + stem وليس used + V-ing.'
				],
				explanationAr: 'في الجملة المثبتة نستعمل: used to + bare stem.'
			},
			{
				questionAr: 'أكمل الجملة المنفية بدقة: "Fifty years ago, students ...... have the internet."',
				options: ['did not used to', 'did not use to', 'do not used to', 'were not use to'],
				correctIndex: 1,
				diagnosticFeedback: [
					'بعد did not يجب حذف حرف d فتصبح use to.',
					'صحيح! did not use to هي الصيغة النحوية السليمة.',
					'الجملة في الماضي فنستعمل did not وليس do not.',
					'نستعمل الفعل المساعد did not وليس were not.'
				],
				explanationAr: 'في النفي: Subject + did not use to + bare stem.'
			},
			{
				questionAr: 'اختر السؤال الصحيح:',
				options: [
					'Did your grandmother used to make couscous?',
					'Do your grandmother use to make couscous?',
					'Did your grandmother use to make couscous?',
					'Was your grandmother use to make couscous?'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'بعد Did يجب حذف d من used.',
					'السؤال عن الماضي فيستعمل Did وليس Do.',
					'أحسنت! Did + subject + use to + bare stem?',
					'لا نستعمل Was لصياغة سؤال used to.'
				],
				explanationAr: 'في الاستفهام: Did + Subject + use to + bare stem?'
			},
			{
				questionAr: 'أي تعبير زمني يناسب جملة تحتوي على (used to)؟',
				options: ['tomorrow morning', 'fifty years ago', 'right now', 'next year'],
				correctIndex: 1,
				diagnosticFeedback: [
					'tomorrow للمستقبل.',
					'صحيح! fifty years ago تعبير زمني ماضٍ يناسب used to.',
					'right now للحاضر المستمر.',
					'next year للمستقبل.'
				],
				explanationAr: 'used to تصف عادات في الماضي البعيد أو القريب (in the past, ago, when I was young).'
			},
			{
				questionAr: 'أكمل الجملة: "In the past, Algerian men ...... a traditional wool burnous in winter."',
				options: ['used to wear', 'used to wearing', 'use to wore', 'used wear'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! used to + bare stem (wear).',
					'لا نضيف -ing بعد used to في هذا الدرس.',
					'نكتب used to مع فعل مجرد (wear) وليس wore.',
					'لا بد من وجود حرف الجر to بعد used.'
				],
				explanationAr: 'الصيغة المثبتة الصحيحة هي: used to wear.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 2. Past Simple & Past Continuous (while / when)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_3am_t2_past_simple_continuous',
		slug: 'eng-3am-t2-past-simple-continuous',
		grade: '3am',
		yearSubjectId: 636,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: أنا وأنماط الحياة (Me and Lifestyles)',
		order: 2,
		titleAr: 'الماضي البسيط والماضي المستمر مع while و when',
		objectives: [
			'التمييز بين الحدث الطويل المستمر (Past Continuous) والحدث القصير القاطع (Past Simple)',
			'ربط الجملتين بدقة باستعمال الرابطين (while) و (when)'
		],
		keywordsAr: ['Past Continuous', 'Past Simple', 'while', 'when', 'was/were + V-ing'],
		discover: {
			scenarioAr:
				'تأمّل الموقف الآتي في حياة العالم المسلم: "While Ibn al-Haytham was studying light in his room, a beam of sunlight entered through a tiny hole." ما الحدث الطويل الذي كان مستمراً، وما الحدث القصير الذي قاطعه فجأة؟',
			svg: svgEnglishTenseTimeline({
				title: 'Interrupted Past Actions',
				tenseName: 'Past Continuous + Past Simple',
				formula: 'While + S + was/were + V-ing, S + V-ed (2nd form)',
				activeZone: 'two_past',
				example: 'While I was reading about Al-Khwarizmi, my friend called me.',
				markers: 'while (long action) | when (short interrupting action)'
			}),
			steps: [
				{
					promptAr: 'ما الزمن المستعمل مباشرة بعد كلمة (While) في الجملة؟',
					hintAr: 'يتكون من was + الفعل المضاف إليه -ing.',
					expectedInput: 'Past Continuous (was studying)',
					revealAr: 'بعد (While) يأتي الحدث الطويل في الماضي المستمر: was studying (Past Continuous).'
				},
				{
					promptAr: 'ما الزمن المستعمل للحدث القصير القاطع (entered)؟',
					hintAr: 'فعل منتظم ينتهي بـ -ed.',
					expectedInput: 'Past Simple (entered)',
					revealAr: 'الحدث القصير القاطع يأتي في الماضي البسيط (Past Simple): entered.'
				},
				{
					promptAr: 'لو أردنا استعمال (when) بدل (while)، أي جملة نضعها مباشرة بعد (when)؟',
					hintAr: 'when تسبق الحدث القصير القاطع عادةً.',
					expectedInput: 'when a beam of sunlight entered',
					revealAr: 'نقول: Ibn al-Haytham was studying light when a beam of sunlight entered through a tiny hole.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الماضي المستمر (Past Continuous): Subject + was / were + Verb-ing. يصف حدثاً طويلاً كان جارياً في وقت محدد في الماضي (I/He/She/It تأخذ was؛ You/We/They تأخذ were).',
				'الماضي البسيط (Past Simple): الفعل المنتظم + (-ed) أو التصريف الثاني للأفعال الشاذة (write: wrote, go: went, see: saw). يصف حدثاً قصيراً قاطعاً أو مكتملاً.',
				'الربط بـ (While): يأتي بعدها مباشرة الماضي المستمر (While + Past Continuous, Past Simple)، أو لحدثين طويلين متزامنين (While my mother was cooking, I was revising).',
				'الربط بـ (When): يأتي بعدها غالباً الحدث القصير في الماضي البسيط (Past Continuous + when + Past Simple).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Combining Past Tenses (while / when)',
				rootLabel: 'Two Actions in the Past',
				rootSub: 'Long Action = was/were + V-ing | Short Action = Past Simple',
				branches: [
					{ label: 'While + Long', rule: 'While + Past Cont, Past Simple', example: 'While he was reading, it rained.', color: '#1d4ed8' },
					{ label: 'When + Short', rule: 'Past Cont + when + Past Simple', example: 'He was reading when it rained.', color: '#047857' },
					{ label: 'Two Long Actions', rule: 'While + Past Cont, Past Cont', example: 'While I was writing, Ali was reading.', color: '#7c3aed' }
				]
			}),
			visualCaptionAr: 'خريطة الربط بين الماضي المستمر والماضي البسيط باستعمال while و when',
			examples: [
				{
					problemAr: 'صرّف الفعلين بين قوسين: "While we (walk) to school, we (meet) our English teacher."',
					solutionAr: 'While we were walking to school, we met our English teacher.'
				},
				{
					problemAr: 'صرّف الفعلين: "My sister (prepare) her project when the electricity (go) out."',
					solutionAr: 'My sister was preparing her project when the electricity went out.'
				}
			],
			watchOutAr:
				'تذكّر الفاعل الجمع يأخذ (were) وليس (was): "They were working" (وليس They was). وإذا بدأت الجملة بـ While أو When لا تنسَ وضع الفاصلة (,) بين الجملتين.'
		},
		practice: [
			{
				questionAr: 'اختر التصريف الصحيح: "While Amina ...... dinner, her father arrived home."',
				options: ['cooked', 'was cooking', 'were cooking', 'is cooking'],
				correctIndex: 1,
				diagnosticFeedback: [
					'بعد While نحتاج إلى الماضي المستمر للحدث الطويل.',
					'أحسنت! Amina مفرد فتأخذ was + cooking.',
					'Amina مفرد ولا تأخذ were.',
					'السياق في الماضي (arrived) وليس الحاضر.'
				],
				explanationAr: 'بعد While يأتي الماضي المستمر: Amina was cooking.'
			},
			{
				questionAr: 'أكمل الجملة: "The pupils were listening carefully when the bell ...... ."',
				options: ['rings', 'was ringing', 'rang', 'ring'],
				correctIndex: 2,
				diagnosticFeedback: [
					'السياق في الماضي وليس المضارع.',
					'قرع الجرس حدث قصير قاطع فيأتي في الماضي البسيط.',
					'صحيح! rang هو الماضي البسيط للفعل الشاذ ring.',
					'ring هو أصل الفعل وليس الماضي.'
				],
				explanationAr: 'بعد when يأتي الحدث القصير القاطع في الماضي البسيط (rang).'
			},
			{
				questionAr: 'اختر الرابط الصحيح: "...... they were visiting the museum, they saw old astrolabes."',
				options: ['While', 'Because', 'So', 'Where'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! While تسبق الحدث المستمر (were visiting).',
					'Because للسبب وليست للزمن.',
					'So للنتيجة.',
					'Where للمكان.'
				],
				explanationAr: 'نستعمل While قبل الماضي المستمر (were visiting).'
			},
			{
				questionAr: 'أكمل الجملة لحدثين طويلين متزامنين: "While Youssef was drawing a map, his brother ...... an article."',
				options: ['wrote', 'was writing', 'writes', 'is writing'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الحدثان طويلان ومتزامنان، لذا يوضعان معاً في الماضي المستمر.',
					'أحسنت! حدثان طويلان في نفس الوقت: was drawing و was writing.',
					'الزمن ماضٍ وليس مضارعاً.',
					'الزمن ماضٍ وليس حاضراً مستمراً.'
				],
				explanationAr: 'عند تزامن حدثين طويلين في الماضي نضعهما معاً في الماضي المستمر.'
			},
			{
				questionAr: 'ما الماضي البسيط الصحيح للأفعال الشاذة (write / find / build)؟',
				options: [
					'writed / finded / builded',
					'wrote / found / built',
					'written / found / built',
					'wrote / founded / build'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه الأفعال شاذة ولا تأخذ -ed.',
					'ممتاز! wrote و found و built هي تصاريف الماضي البسيط الصحيحة.',
					'written هي التصريف الثالث (Past Participle).',
					'founded هو ماضي found بمعنى أسّس، وليس ماضي find.'
				],
				explanationAr: 'تصاريف الماضي البسيط: write (wrote)، find (found)، build (built).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 3. Relative Pronouns (who, which, where) in Muslim Scientists' Biographies
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_3am_t2_relative_pronouns_scientists',
		slug: 'eng-3am-t2-relative-pronouns-scientists',
		grade: '3am',
		yearSubjectId: 636,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: أنا والعالم العلمي (Me and the Scientific World)',
		order: 3,
		titleAr: 'ضمائر الوصل (who, which, where) وسير العلماء المسلمين',
		objectives: [
			'الربط بين جملتين باستعمال ضمائر الوصل (who للعاقل، which لغير العاقل، where للمكان)',
			'توظيف ضمائر الوصل في كتابة جمل تعريفية دقيقة عن العلماء المسلمين وإنجازاتهم العلمية'
		],
		keywordsAr: ['who', 'which', 'where', 'relative pronouns', 'Al-Khwarizmi', 'Ibn al-Haytham', 'Al-Zahrawi'],
		discover: {
			scenarioAr:
				'اقرأ هذه الفقرة عن علماء الحضارة الإسلامية: "Al-Khwarizmi was a great Muslim mathematician who founded algebra. He wrote a famous book which changed mathematics forever. Baghdad was the city where he worked at the House of Wisdom." تأمّل الكلمات (who, which, where)!',
			svg: svgEnglishGrammarMap({
				title: 'Relative Pronouns in Biographies',
				rootLabel: 'Relative Pronouns (Avoid Repetition)',
				rootSub: 'Join two sentences smoothly into one clear sentence',
				branches: [
					{ label: 'WHO (People)', rule: 'Refers to a person', example: 'Al-Zahrawi, who was a surgeon...', color: '#1d4ed8' },
					{ label: 'WHICH (Things)', rule: 'Refers to objects/ideas', example: 'The book which he wrote...', color: '#047857' },
					{ label: 'WHERE (Places)', rule: 'Refers to a location', example: 'Cordoba, where he lived...', color: '#b45309' }
				]
			}),
			steps: [
				{
					promptAr: 'لماذا استعملنا (who) بعد عبارة (a great Muslim mathematician)؟',
					hintAr: 'هل العالم الرياضي شخص عاقل أم شيء غير عاقل؟',
					expectedInput: 'لأنه شخص عاقل',
					revealAr: 'نستعمل (who) للربط بالاسم العاقل (شخص أو عالم أو مخترع) وتفادي تكرار الضمير (he / she).'
				},
				{
					promptAr: 'لماذا استعملنا (which) بعد كلمة (a famous book)؟',
					hintAr: 'الكتاب جماد غير عاقل.',
					expectedInput: 'لأنه شيء غير عاقل',
					revealAr: 'نستعمل (which) مع الأشياء والأفكار والكتب والاختراعات والحيوانات (غير العاقل).'
				},
				{
					promptAr: 'ماذا حذفت كلمة (where) عندما ربطنا الجملتين عن مدينة بغداد؟',
					hintAr: 'في الجملة الأصلية نقول: he worked there / in Baghdad.',
					expectedInput: 'حذفت كلمة there أو in it',
					revealAr: 'كلمة (where) تدل على المكان وتعوّض (there / in that city)، فلا نكرر there في آخر الجملة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'ضمير الوصل (who): يُستعمل للأشخاص العاقلين (People) ويعوّض (he / she / they) — مثال: Ibn al-Haytham was the scientist who explained how vision works.',
				'ضمير الوصل (which): يُستعمل للأشياء والكتب والاختراعات والحيوانات (Things / Animals) ويعوّض (it / they) — مثال: Al-Zahrawi designed medical tools which doctors still recognize today.',
				'ضمير الوصل (where): يُستعمل للأماكن (Places) ويعوّض (there / in it) — مثال: Fez is the city where Fatima al-Fihri founded Al-Qarawiyyin.',
				'عند دمج جملتين بضمير وصل، نحذف الضمير المكرر (he / she / it / there) حتى لا يقع تكرار نحوي.'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'Approved Muslim Scientists Fact-File (3AM)',
				steps: [
					{ stage: 'Al-Khwarizmi', detail: 'Mathematician who founded Algebra and Algorithms.' },
					{ stage: 'Ibn al-Haytham', detail: 'Physicist who wrote the Book of Optics (Kitab al-Manazir).' },
					{ stage: 'Al-Zahrawi', detail: 'Surgeon who invented over 200 surgical instruments.' },
					{ stage: 'Al-Jazari', detail: 'Engineer who designed water clocks and mechanical pumps.' }
				]
			}),
			visualCaptionAr: 'أبرز العلماء المسلمين وإنجازاتهم الموظَّفة في جمل الوصل للسنة الثالثة متوسط',
			examples: [
				{
					problemAr: 'اربط الجملتين باستعمال ضمير وصل مناسب: "Al-Jazari was a brilliant engineer. He invented mechanical water clocks."',
					solutionAr: 'Al-Jazari was a brilliant engineer who invented mechanical water clocks.'
				},
				{
					problemAr: 'اربط الجملتين: "Kitab al-Manazir is a scientific book. It explained the laws of light."',
					solutionAr: 'Kitab al-Manazir is a scientific book which explained the laws of light.'
				},
				{
					problemAr: 'اربط الجملتين: "Basra is the city. Ibn al-Haytham was born there."',
					solutionAr: 'Basra is the city where Ibn al-Haytham was born.'
				}
			],
			watchOutAr:
				'عند الربط بـ (who / which / where) احذف الضمير المكرر! خطأ: "The scholar who he wrote the book" — الصواب: "The scholar who wrote the book". وخطأ: "The city where he lived there" — الصواب: "The city where he lived".'
		},
		practice: [
			{
				questionAr: 'اختر ضمير الوصل المناسب: "Al-Zahrawi was a Muslim doctor ...... wrote a medical encyclopedia."',
				options: ['which', 'where', 'who', 'when'],
				correctIndex: 2,
				diagnosticFeedback: [
					'which لغير العاقل.',
					'where للمكان.',
					'أحسنت! Al-Zahrawi شخص عاقل فنستعمل who.',
					'when للزمن.'
				],
				explanationAr: 'نستعمل who لأن الاسم الموصول به شخص (a Muslim doctor).'
			},
			{
				questionAr: 'اختر ضمير الوصل المناسب: "Ibn al-Haytham built a dark chamber ...... helped him study light."',
				options: ['who', 'which', 'where', 'whose'],
				correctIndex: 1,
				diagnosticFeedback: [
					'who للأشخاص فقط.',
					'صحيح! a dark chamber شيء غير عاقل والفاعل في الجملة الثانية (it helped)، فنستعمل which.',
					'هنا الحجرة فاعل للفعل helped وليست ظرف مكان بمعنى (فيها).',
					'whose للملكية.'
				],
				explanationAr: 'لأن الحجرة المظلمة شيء قام بالفعل (helped)، نستعمل which.'
			},
			{
				questionAr: 'أكمل الجملة: "Al-Qarawiyyin is the historic university ...... many scholars studied."',
				options: ['who', 'which', 'where', 'what'],
				correctIndex: 2,
				diagnosticFeedback: [
					'who للأشخاص.',
					'نحن نتحدث عن المكان الذي درس فيه العلماء (studied there).',
					'ممتاز! where تدل على المكان (حيث درس العديد من العلماء).',
					'what ليست ضمير وصل بعد اسم مكان.'
				],
				explanationAr: 'الجامعة مكان وقع فيه فعل الدراسة، فنستعمل where.'
			},
			{
				questionAr: 'اختر الجملة الخالية من خطأ التكرار:',
				options: [
					'Al-Khwarizmi is the scholar who he founded algebra.',
					'Al-Khwarizmi is the scholar who founded algebra.',
					'Al-Khwarizmi is the scholar which founded algebra.',
					'Al-Khwarizmi is the scholar where founded algebra.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نكرر الضمير he بعد who.',
					'صحيح! حذفنا he المكرر واستعملنا who للعاقل.',
					'لا نستعمل which للأشخاص.',
					'لا نستعمل where للأشخاص.'
				],
				explanationAr: 'عند استعمال who نحذف الضمير المكرر he.'
			},
			{
				questionAr: 'ما الجملة الصحيحة لدمج: "Cordoba was a famous city. Al-Zahrawi lived there."',
				options: [
					'Cordoba was a famous city where Al-Zahrawi lived there.',
					'Cordoba was a famous city who Al-Zahrawi lived.',
					'Cordoba was a famous city where Al-Zahrawi lived.',
					'Cordoba was a famous city which Al-Zahrawi lived.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'يجب حذف كلمة there لأن where تعوّضها.',
					'who للأشخاص وليس للمدن.',
					'ممتاز! ربط سليم بـ where وحذف كلمة there.',
					'بدون حرف الجر in لا نستخدم which هنا.'
				],
				explanationAr: 'الربط السليم للمكان هو: where Al-Zahrawi lived (دون تكرار there).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 4. Pronunciation of Final -ed (/t/, /d/, /id/) & Guided Biography Writing
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_3am_t2_final_ed_pronunciation',
		slug: 'eng-3am-t2-final-ed-pronunciation',
		grade: '3am',
		yearSubjectId: 636,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: أنا والعالم العلمي (Me and the Scientific World)',
		order: 4,
		titleAr: 'نطق النهاية -ed (/t/, /d/, /id/) ومنهجية كتابة سيرة عالم مسلم',
		objectives: [
			'تصنيف الأفعال المنتظمة في الماضي حسب نطق النهاية -ed إلى ثلاث فئات: /t/ و /d/ و /id/',
			'تنظيم سيرة قصيرة ومتماسكة لعالم مسلم باستعمال الماضي البسيط وضمائر الوصل'
		],
		keywordsAr: ['final -ed', '/t/', '/d/', '/id/', 'biography', 'Past Simple'],
		discover: {
			scenarioAr:
				'انظر إلى هذه الأفعال من سيرة ابن الهيثم: "He studied optics, worked hard in Cairo, and invented new experiments." لاحظ أن جميعها تنتهي بـ (-ed)، ولكن نطق النهاية يختلف تماماً في كل فعل!',
			svg: svgEnglishPhoneticsChart({
				title: 'Pronunciation of Final -ed',
				subtitle: 'Check the LAST SOUND of the base verb before adding -ed',
				columns: [
					{ sound: '/t/', rule: 'After p, k, f, s, sh, ch, x', examples: 'worked, helped, watched', color: '#1d4ed8' },
					{ sound: '/d/', rule: 'After vowels & b,g,l,m,n,r,v,z', examples: 'studied, lived, designed', color: '#047857' },
					{ sound: '/id/', rule: 'ONLY after /t/ or /d/ sounds', examples: 'invented, founded, guided', color: '#b45309' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الحرف الذي يسبق (-ed) في الفعلين (invented) و (founded)؟ وكيف نُنطق النهاية؟',
					hintAr: 'أصل الفعلين هو invent و found.',
					expectedInput: 'الحرفان t و d، وتُنطق النهاية /id/',
					revealAr: 'كل فعل ينتهي بصوت /t/ أو /d/ قبل إضافة -ed تُنطق نهايته /id/ مثل: invented, founded, visited, decided.'
				},
				{
					promptAr: 'في الفعل (worked) أصله (work) وينتهي بصوت مهموس (k). كيف تُنطق (-ed)؟',
					hintAr: 'بعد الأصوات المهموسة (p, k, f, s, sh, ch) نسمع صوتاً مهموساً مشابهاً.',
					expectedInput: '/t/',
					revealAr: 'تُنطق النهاية /t/ في worked و helped و washed و watched.'
				},
				{
					promptAr: 'في الفعلين (studied) و (lived)، لم ينتهيا بـ t/d ولا بصوت مهموس. ما النطق الصحيح؟',
					hintAr: 'أصوات العلة و v, l, m, n, r كلها أصوات مجهورة.',
					expectedInput: '/d/',
					revealAr: 'بعد الأصوات المجهورة وحروف العلة تُنطق النهاية /d/ مثل: studied, lived, travelled, discovered.'
				}
			]
		},
		summary: {
			rulesAr: [
				'العمود الأسهل أولاً /id/: فقط عندما ينتهي أصل الفعل بصوت /t/ أو /d/ (مثل: invented, created, visited, founded, decided, translated).',
				'العمود الثاني /t/: عندما ينتهي أصل الفعل بصوت مهموس من: (p, k, f, s, ss, sh, ch, x, ce) — مثل: helped, worked, developed, watched, washed, practised.',
				'العمود الثالث /d/: بعد بقية الأصوات المجهورة وحروف العلة (b, g, l, m, n, r, v, z, w, y, vowels) — مثل: lived, studied, designed, discovered, travelled, died.',
				'خطوات كتابة سيرة عالم مسلم (6 نقاط): 1) التعريف بالاسم واللقب ومكان وتاريخ الميلاد (was born in)، 2) المسار العلمي والصفات، 3) أبرز الإنجازات والكتب باستعمال (who / which / Past Simple)، 4) سنة الوفاة وأثره الباقي.'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'Blueprint: Muslim Scientist Biography (6 pts)',
				steps: [
					{ stage: '1. Identity & Birth', detail: 'Full name, nationality/era, born in (year & city).' },
					{ stage: '2. Field & Study', detail: 'Mathematician / physician / astronomer who studied in...' },
					{ stage: '3. Achievements', detail: 'Wrote famous books, invented tools, founded sciences.' },
					{ stage: '4. Legacy & Death', detail: 'Died in (year), but his legacy still inspires the world.' }
				]
			}),
			visualCaptionAr: 'المخطط المنهجي لكتابة سيرة عالم مسلم متكاملة باللغة الإنجليزية في 3AM',
			examples: [
				{
					problemAr: 'صنّف الأفعال الستة في جدول النهاية -ed: (founded - worked - lived - translated - developed - discovered).',
					solutionAr: '/t/: worked, developed | /d/: lived, discovered | /id/: founded, translated.'
				},
				{
					problemAr: 'لماذا تُنطق النهاية في كلمة (decided) بصوت /id/ رغم أن أصلها (decide) ينتهي بحرف e؟',
					solutionAr: 'لأن العبرة بالصوت الأخير المنطوق وليس الحرف المكتوب! الحرف e في decide صامت، والصوت الأخير المنطوق هو /d/، لذلك نضع decided في عمود /id/.'
				}
			],
			watchOutAr:
				'احذر خدعة الحرف (e) الصامت في نهاية الفعل! مثلاً: (decided, created, translated) تنتهي بصوت /d/ أو /t/ فتُصنّف في /id/، و (practised) تنتهي بصوت /s/ فتُصنّف في /t/، و (lived) تنتهي بصوت /v/ فتُصنّف في /d/.'
		},
		practice: [
			{
				questionAr: 'كيف تُنطق النهاية (-ed) في الفعل (invented)؟',
				options: ['/t/', '/d/', '/id/', '/z/'],
				correctIndex: 2,
				diagnosticFeedback: [
					'لأن أصل الفعل invent ينتهي بـ t، لا ينطق /t/ بل /id/.',
					'الصوت /d/ لا يأتي بعد t.',
					'أحسنت! بعد t أو d في أصل الفعل تُنطق النهاية /id/.',
					'/z/ خاص بنهاية -s وليس -ed.'
				],
				explanationAr: 'أصل الفعل invent ينتهي بصوت /t/، لذا تُنطق النهاية /id/.'
			},
			{
				questionAr: 'أي فعل مما يلي تُنطق نهايته بصوت /t/؟',
				options: ['lived', 'studied', 'developed', 'founded'],
				correctIndex: 2,
				diagnosticFeedback: [
					'lived تنتهي بصوت /v/ المجهور فتُنطق /d/.',
					'studied تنتهي بصوت علة فتُنطق /d/.',
					'صحيح! أصل الفعل develop ينتهي بصوت /p/ المهموس فتُنطق /t/.',
					'founded أصلها found تنتهي بـ /d/ فتُنطق /id/.'
				],
				explanationAr: 'بعد الأصوات المهموسة (p, k, f, s, sh, ch) تُنطق -ed بصوت /t/.'
			},
			{
				questionAr: 'أي فعل مما يلي ينتمي إلى العمود /d/؟',
				options: ['worked', 'watched', 'discovered', 'created'],
				correctIndex: 2,
				diagnosticFeedback: [
					'worked تنتهي بصوت k فتأخذ /t/.',
					'watched تنتهي بصوت ch فتأخذ /t/.',
					'ممتاز! discover تنتهي بصوت مجهور فتأخذ /d/.',
					'created تنتهي بصوت t قبل -ed فتأخذ /id/.'
				],
				explanationAr: 'discovered تُنطق نهايتها /d/.'
			},
			{
				questionAr: 'في أي عمود نضع الفعل (translated)؟',
				options: ['/t/', '/d/', '/id/', '/iz/'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الصوت الأخير المنطوق في translate هو /t/ وليس مهماً وجود e الصامتة.',
					'بعد صوت /t/ لا نضعها في /d/.',
					'أحسنت! الحرف e صامت، فالصوت الأخير هو /t/، لذا تُنطق /id/.',
					'/iz/ خاص بنهاية -s.'
				],
				explanationAr: 'ننظر دائماً إلى الصوت الأخير المنطوق قبل -ed وهو /t/ في translate.'
			},
			{
				questionAr: 'ما الجملة الأنسب لبداية سيرة العالم محمد بن موسى الخوارزمي؟',
				options: [
					'Al-Khwarizmi will be born in Khwarizm.',
					'Al-Khwarizmi was born in Khwarizm and was a great Muslim mathematician.',
					'Al-Khwarizmi is born tomorrow in Baghdad.',
					'Al-Khwarizmi has born in Baghdad.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'السيرة التاريخية تُكتب في الماضي البسيط وليس المستقبل.',
					'صحيح! نستخدم عبارة (was born in) مع الماضي البسيط في السير.',
					'لا يصح المضارع مع حدث تاريخي ماضٍ.',
					'العبارة الصحيحة للولادة هي was born وليس has born.'
				],
				explanationAr: 'للتعبير عن الميلاد في السير نستعمل دائماً: Subject + was born in (year/place).'
			}
		]
	}
];
