import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishTenseTimeline,
	svgEnglishWritingStructure
} from '../../svg-english';

export const LESSONS_1AM_T3: EnglishInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 1: Countries, Nationalities, Algerian Currency & Landmarks
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_1am_t3_countries_nationalities',
		slug: 'eng-1am-t3-countries-nationalities',
		grade: '1am',
		yearSubjectId: 616,
		trimesterId: 't3',
		sequenceId: 'seq5',
		sequenceTitleAr: 'المقطع الخامس: أنا ووطني والعالم — Me, My Country and the World',
		order: 1,
		titleAr: 'البلدان والجنسيات والعملة الجزائرية والمعالم (Countries, Nationalities & Landmarks)',
		objectives: [
			'التمييز بين اسم البلد (Country) والجنسية (Nationality) وكتابتهما بحرف كبير',
			'التعريف بالعملة الوطنية الجزائرية (Algerian Dinar) والعاصمة وأشهر المعالم والأطباق',
			'السؤال عن البلد والجنسية باستعمال (Where are you from? / What is your nationality?)'
		],
		keywordsAr: ['Countries', 'Nationalities', 'Algerian Dinar', 'Landmarks', 'Capital City'],
		discover: {
			scenarioAr:
				'أعدّ كريم بطاقة تعريفية عن وطنه الجزائر قائلا: "My country is Algeria. I am Algerian. Our capital city is Algiers, and our national currency is the Algerian Dinar. We eat delicious couscous and dates." لاحظ الفرق بين اسم البلد والجنسية.',
			svg: svgEnglishGrammarMap({
				title: 'Countries & Nationalities Suffixes',
				rootLabel: 'Country & Nationality (Always Capitalized!)',
				rootSub: 'Common endings: -ian / -ese / -ish',
				branches: [
					{
						label: '-ian / -an',
						rule: 'Algeria, Tunisia, Egypt',
						example: 'Algerian, Tunisian, Egyptian',
						color: '#1d4ed8'
					},
					{
						label: '-ish',
						rule: 'Britain, Turkey, Spain',
						example: 'British, Turkish, Spanish',
						color: '#047857'
					},
					{
						label: '-ese',
						rule: 'China, Japan',
						example: 'Chinese, Japanese',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما اسم البلد وما الجنسية المذكوران في بطاقة كريم؟',
					hintAr: 'اقرأ الجملتين الأولى والثانية.',
					expectedInput: 'Algeria / Algerian',
					revealAr: 'اسم البلد هو "Algeria" (الجزائر)، والجنسية هي "Algerian" (جزائري/جزائرية).'
				},
				{
					promptAr: 'ما اسم العملة الوطنية الجزائرية باللغة الإنجليزية؟',
					hintAr: 'ابحث عن كلمة currency في فقرة كريم.',
					expectedInput: 'Algerian Dinar',
					revealAr: 'العملة الوطنية هي الدينار الجزائري: "the Algerian Dinar".'
				},
				{
					promptAr: 'لماذا كتبنا الحرف الأول من "Algeria" و "Algiers" و "Algerian" حرفا كبيرا (Capital)?',
					hintAr: 'تذكّر قاعدة أسماء الأعلام والبلدان والجنسيات في الإنجليزية.',
					expectedInput: 'Proper nouns are capitalized',
					revealAr: 'لأن أسماء البلدان والمدن والجنسيات واللغات تُكتب دائما بحرف كبير في بدايتها!'
				}
			]
		},
		summary: {
			rulesAr: [
				'للتعريف بالبلد والجنسية: I am from Algeria (I am Algerian) / He is from Palestine (He is Palestinian).',
				'جدول أشهر البلدان والجنسيات: Algeria (Algerian)، Tunisia (Tunisian)، Morocco (Moroccan)، Egypt (Egyptian)، Palestine (Palestinian)، Turkey (Turkish)، Britain (British)، China (Chinese).',
				'بطاقة الجزائر الوطنية: Capital: Algiers — Language: Arabic and Tamazight — Currency: Algerian Dinar — Flag colours: green, white, and red — Famous dish: Couscous and Chorba.',
				'أشهر معالم الجزائر: The Great Mosque of Algiers (Djamaa El Djazair)، The Casbah of Algiers، The Great Mosque of Tlemcen، The Bridges of Constantine، M-Zab Valley in Ghardaia.'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'Algeria Identity Fact File',
				steps: [
					{ stage: 'Country & Capital', detail: 'Algeria (North Africa) — Capital: Algiers' },
					{ stage: 'Currency & Flag', detail: 'Algerian Dinar — Green, white and red flag' },
					{ stage: 'Landmarks', detail: 'Great Mosque of Algiers, Casbah, Tlemcen, Constantine' },
					{ stage: 'Traditional Dish', detail: 'Couscous, Chorba, dates, olives and honey' }
				]
			}),
			visualCaptionAr: 'بطاقة الهوية الوطنية الجزائرية باللغة الإنجليزية جاهزة للتوظيف في الفهم والتعبير',
			examples: [
				{
					problemAr: 'أكمل الجدول: 1) Country: Egypt / Nationality: ...... 2) Country: ...... / Nationality: Turkish.',
					solutionAr: '1) Egyptian. 2) Turkey.'
				},
				{
					problemAr: 'أجب عن السؤالين: Where are you from? What is your national currency?',
					solutionAr: 'I am from Algeria. My national currency is the Algerian Dinar.'
				}
			],
			watchOutAr:
				'انتبه! لا تقل "I am from Algerian" ولا تقل "I am Algeria"! الصواب: "I am from Algeria" (اسم البلد بعد from) أو "I am Algerian" (الجنسية مباشرة بعد am/is/are).'
		},
		practice: [
			{
				questionAr: 'اختر الجملة الصحيحة للتعبير عن الجنسية:',
				options: [
					'I am Algeria.',
					'I am from Algerian.',
					'I am Algerian.',
					'I from Algeria.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'Algeria اسم البلد، وبعد am مباشرة نضع الجنسية.',
					'بعد from نضع اسم البلد (Algeria) وليس الجنسية.',
					'أحسنت! نضع الجنسية مباشرة بعد am: I am Algerian.',
					'ينقص الجملة فعل الكينونة am.'
				],
				explanationAr: 'نقول إما: I am from Algeria (مع from + بلد)، وإما: I am Algerian (مباشرة + جنسية).'
			},
			{
				questionAr: 'ما الجنسية المشتقة من اسم البلد "Palestine"؟',
				options: ['Palestinish', 'Palestinian', 'Palestinese', 'Palestiner'],
				correctIndex: 1,
				diagnosticFeedback: [
					'النهاية -ish غير صحيحة هنا.',
					'ممتاز! الجنسية هي Palestinian.',
					'النهاية -ese تُستعمل لبلدان مثل China و Japan.',
					'هذه صيغة غير موجودة في الإنجليزية.'
				],
				explanationAr: 'الجنسية الصحيحة من Palestine هي Palestinian.'
			},
			{
				questionAr: 'ما العملة الوطنية للجزائر باللغة الإنجليزية؟',
				options: ['The Dollar', 'The Algerian Dinar', 'The Pound', 'The Euro'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الدولار ليس عملة الجزائر.',
					'أحسنت! العملة الوطنية هي الدينار الجزائري (The Algerian Dinar).',
					'الجنيه الإسترليني عملة بريطانيا.',
					'اليورو عملة دول أوروبية.'
				],
				explanationAr: 'العملة الوطنية للجزائر هي The Algerian Dinar.'
			},
			{
				questionAr: 'ما المدينة الجزائرية المشهورة بالجسور المعلقة (The Bridges of ......)؟',
				options: ['Constantine', 'Tindouf', 'Adrar', 'El Oued'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! قسنطينة (Constantine) مشهورة بجسورها المعلقة.',
					'تندوف معروفة في الجنوب الغربي وليس بالجسور المعلقة.',
					'أدرار مدينة صحراوية معروفة بالقصور والواحات.',
					'الوادي معروفة بمدينة الألف قبة.'
				],
				explanationAr: 'تشتهر مدينة قسنطينة (Constantine) بجسورها العريقة.'
			},
			{
				questionAr: 'أيّ جنسية تنتهي باللاحقة (-ese)؟',
				options: ['Algerian', 'Turkish', 'Chinese', 'Tunisian'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Algerian تنتهي بـ -ian.',
					'Turkish تنتهي بـ -ish.',
					'أحسنت! Chinese (صيني) تنتهي بـ -ese.',
					'Tunisian تنتهي بـ -ian.'
				],
				explanationAr: 'الكلمة Chinese مشتقة من China وتنتهي باللاحقة -ese.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 2: Describing Algeria (There is / There are)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_1am_t3_there_is_are_algeria',
		slug: 'eng-1am-t3-there-is-are-algeria',
		grade: '1am',
		yearSubjectId: 616,
		trimesterId: 't3',
		sequenceId: 'seq5',
		sequenceTitleAr: 'المقطع الخامس: أنا ووطني والعالم — Me, My Country and the World',
		order: 2,
		titleAr: 'وصف الجزائر باستعمال (There is / There are)',
		objectives: [
			'استعمال "There is" لوصف المعلم المفرد و "There are" لوصف المعالم الجمع',
			'صياغة النفي والسؤال باستعمال (There isn\'t / There aren\'t / Is there / Are there)',
			'وصف جمال وتنوع المدن الجزائرية في جمل سليمة وواضحة'
		],
		keywordsAr: ['There is', 'There are', 'Singular / Plural', 'Describing Algeria'],
		discover: {
			scenarioAr:
				'وصف أمين مدينته الجزائر لصديقه قائلا: "In Algeria, there is a big mosque in Algiers called Djamaa El Djazair. There are high mountains in the north and golden dunes in the Sahara." تأمّل متى استعمل "there is" ومتى استعمل "there are".',
			svg: svgEnglishGrammarMap({
				title: 'Describing Places: There is vs There are',
				rootLabel: 'There is / There are (يوجد)',
				rootSub: 'Look at the noun that comes AFTER',
				branches: [
					{
						label: 'There is (Singular)',
						rule: 'With a / an + 1 thing',
						example: 'There is a famous mosque.',
						color: '#1d4ed8'
					},
					{
						label: 'There are (Plural)',
						rule: 'With numbers / many + -s',
						example: 'There are nice beaches.',
						color: '#047857'
					},
					{
						label: 'Questions',
						rule: 'Is there...? / Are there...?',
						example: 'Is there a museum here?',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'لماذا استعمل أمين "there is" قبل عبارة "a big mosque"؟',
					hintAr: 'هل المسجد هنا مفرد (واحد) أم جمع؟',
					expectedInput: 'singular',
					revealAr: 'لأن "a big mosque" اسم مفرد، فنستعمل قبله "There is".'
				},
				{
					promptAr: 'لماذا استعمل أمين "there are" قبل "high mountains"؟',
					hintAr: 'لاحظ حرف الجمع (-s) في كلمة mountains.',
					expectedInput: 'plural',
					revealAr: 'لأن "high mountains" اسم جمع، فنستعمل قبله "There are".'
				},
				{
					promptAr: 'كيف نحوّل الجملة "There is a garden in our town" إلى سؤال؟',
					hintAr: 'نعكس موضع "There" و "is".',
					expectedInput: 'Is there a garden in our town?',
					revealAr: 'نعكس الفعل والفاعل لتصبح: Is there a garden in our town? — Yes, there is.'
				}
			]
		},
		summary: {
			rulesAr: [
				'للمفرد (Singular): نستعمل "There is + a / an + اسم مفرد". مثال: There is a historic mosque in Tlemcen.',
				'للجمع (Plural): نستعمل "There are + اسم جمع (many / two / famous + ...s)". مثال: There are beautiful bridges in Constantine.',
				'في النفي: There is not (There isn\'t) للمفرد، و There are not (There aren\'t) للجمع.',
				'في السؤال: Is there a ...? (للمفرد) — Are there any ...? (للجمع).',
				'الجواب المختصر: Yes, there is. / No, there isn\'t. — Yes, there are. / No, there aren\'t.'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Describing Permanent Landmarks',
				tenseName: 'There is / There are',
				formula: 'There is + Singular  |  There are + Plural',
				activeZone: 'present',
				example: 'There are 58 wilayas in Algeria, and there is a great desert in the south.',
				markers: 'in the north, in the south, in the east, in the west'
			}),
			visualCaptionAr: 'استعمال There is و There are لوصف معالم الجزائر والجهات الأربع',
			examples: [
				{
					problemAr: 'أكمل بـ (There is / There are): 1) ...... a famous Casbah in Algiers. 2) ...... many palm trees in Ghardaia.',
					solutionAr: '1) There is a famous Casbah in Algiers. 2) There are many palm trees in Ghardaia.'
				},
				{
					problemAr: 'حوّل إلى النفي: "There are rivers in the desert."',
					solutionAr: 'There are not (aren\'t) rivers in the desert.'
				}
			],
			watchOutAr:
				'انتبه! لا تستعمل "There is" إذا كان الاسم الذي بعدها جمعا مثل "mountains" أو "beaches"، وانظر دائما إلى الاسم الموجود بعد الفراغ لتحديد المفرد من الجمع.'
		},
		practice: [
			{
				questionAr: 'اختر الصيغة الصحيحة: "...... a beautiful mosque in my city."',
				options: ['There are', 'There is', 'Are there', 'They is'],
				correctIndex: 1,
				diagnosticFeedback: [
					'There are للجمع، و a beautiful mosque مفرد.',
					'أحسنت! a beautiful mosque مفرد فتأخذ There is.',
					'الجملة خبرية وليست سؤالا، كما أن Are للجمع.',
					'لا نستعمل They is.'
				],
				explanationAr: 'الاسم بعد الفراغ مفرد مسبوق بـ a، فنختار There is.'
			},
			{
				questionAr: 'أكمل الجملة: "...... many historic monuments in Algeria."',
				options: ['There is', 'There are', 'Is there', 'There am'],
				correctIndex: 1,
				diagnosticFeedback: [
					'many historic monuments جمع ولا يأخذ is.',
					'ممتاز! الجمع يأخذ دائما There are.',
					'هذه صيغة سؤال للمفرد.',
					'لا توجد صيغة There am.'
				],
				explanationAr: 'كلمة many و monuments تدل على الجمع، لذلك نستعمل There are.'
			},
			{
				questionAr: 'اختر السؤال الصحيح: "...... an airport in Oran?"',
				options: ['Are there', 'Is there', 'There is', 'Do there'],
				correctIndex: 1,
				diagnosticFeedback: [
					'an airport مفرد فلا يأخذ Are.',
					'أحسنت! للسؤال عن المفرد نستعمل Is there.',
					'هذه جملة خبرية وليست سؤالا.',
					'لا نستعمل Do there.'
				],
				explanationAr: 'السؤال عن وجود شيء مفرد (an airport) يبدأ بـ Is there.'
			},
			{
				questionAr: 'أكمل الجواب المختصر: "Are there palm trees in Biskra?" — "Yes, ......"',
				options: ['there is.', 'there are.', 'they is.', 'it is.'],
				correctIndex: 1,
				diagnosticFeedback: [
					'السؤال بدأ بـ Are there وليس Is there.',
					'ممتاز! نجيب بنفس الفعل المساعد: Yes, there are.',
					'التركيب غير صحيح.',
					'it is للمفرد ولا يناسب Are there.'
				],
				explanationAr: 'السؤال بـ Are there يُجاب عنه بـ Yes, there are أو No, there aren\'t.'
			},
			{
				questionAr: 'أيّ جملة تصف موقع الصحراء الجزائرية وصفا صحيحا؟',
				options: [
					'There is the Sahara in the north of Algeria.',
					'There is a vast Sahara in the south of Algeria.',
					'There are a vast Sahara in the south of Algeria.',
					'There are desert in the south.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الصحراء تقع في الجنوب (south) وليس الشمال.',
					'أحسنت! الصحراء في جنوب الجزائر وصيغة المفرد There is صحيحة.',
					'a vast Sahara مفرد يأخذ There is وليس There are.',
					'desert مفرد ولا يناسب There are.'
				],
				explanationAr: 'تقع الصحراء الكبرى في جنوب الجزائر (in the south) ونصف المفرد بـ There is.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 3: Punctuation & Capitalization
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_1am_t3_punctuation_capitalization',
		slug: 'eng-1am-t3-punctuation-capitalization',
		grade: '1am',
		yearSubjectId: 616,
		trimesterId: 't3',
		sequenceId: 'seq5',
		sequenceTitleAr: 'المقطع الخامس: أنا ووطني والعالم — Me, My Country and the World',
		order: 3,
		titleAr: 'علامات الترقيم والحروف الكبيرة (Punctuation & Capitalization)',
		objectives: [
			'معرفة مواضع كتابة الحرف الكبير (Capital Letters) في الجملة الإنجليزية بدقة',
			'الاستعمال السليم لعلامات الترقيم الأساسية: النقطة (.) والفاصلة (,) وعلامة الاستفهام (?) والتعجب (!)',
			'تصحيح جمل غير مرقّمة كما يرد في تمارين البناء اللغوي بالاختبار'
		],
		keywordsAr: ['Capitalization', 'Punctuation', 'Full stop', 'Question mark', 'Comma'],
		discover: {
			scenarioAr:
				'انظر إلى الجملة غير المصحّحة: "hello i am yasmine from oran do you love algeria". وعند تصحيحها تصبح: "Hello! I am Yasmine from Oran. Do you love Algeria?" لاحظ كيف غيّرت الحروف الكبيرة وعلامات الترقيم وضوح الجملة تماما.',
			svg: svgEnglishGrammarMap({
				title: 'Capital Letters & Punctuation Marks',
				rootLabel: 'Clean English Writing',
				rootSub: 'Two keys to get full marks in grammar & writing',
				branches: [
					{
						label: 'Capital Letters',
						rule: 'Start, I, Names, Cities, Days',
						example: 'I live in Algiers. Friday',
						color: '#1d4ed8'
					},
					{
						label: 'Full Stop & Comma',
						rule: '. ends sentence | , lists',
						example: 'dates, olives, and honey.',
						color: '#047857'
					},
					{
						label: '? and !',
						rule: '? questions | ! greetings',
						example: 'Hello! Where are you from?',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'لماذا كتبنا الحرف "I" (ضمير المتكلم) وحرفي "Y" في Yasmine و "O" في Oran حروفا كبيرة؟',
					hintAr: 'تأمّل نوع كل كلمة: ضمير المتكلم، اسم شخص، اسم مدينة.',
					expectedInput: 'I, names, and cities take capital letters',
					revealAr: 'الضمير "I" يُكتب دائما كبيرا في أي مكان، وكذلك أسماء الأشخاص (Yasmine) والمدن والبلدان (Oran, Algeria).'
				},
				{
					promptAr: 'ما العلامة التي وضعناها بعد "Do you love Algeria"؟ ولماذا؟',
					hintAr: 'الجملة تبدأ بأداة سؤال (Do).',
					expectedInput: 'Question mark (?)',
					revealAr: 'نضع علامة الاستفهام (?) في نهاية كل جملة استفهامية.'
				},
				{
					promptAr: 'ما العلامة التي نضعها في نهاية الجملة الخبرية العادية مثل "I am from Oran"؟',
					hintAr: 'نسميها Full stop بالإنجليزية.',
					expectedInput: 'Full stop (.)',
					revealAr: 'نضع النقطة (.) في نهاية الجملة الخبرية، والفاصلة (,) للتعداد أو بعد التحية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'نكتب الحرف الكبير (Capital Letter) في بداية كل جملة، ومع الضمير "I" (أنا) أينما وقع في الجملة.',
				'نكتب الحرف الكبير في بداية أسماء الأشخاص (Amine, Khadija)، والمدن والبلدان (Algiers, Algeria)، والجنسيات واللغات (Algerian, Arabic, English)، وأيام الأسبوع والأشهر (Friday, May).',
				'النقطة (Full stop .): توضع في نهاية الجملة الخبرية التامة.',
				'علامة الاستفهام (Question mark ?): توضع في نهاية السؤال (What, Where, Is, Are, Do...).',
				'الفاصلة (Comma ,) وعلامة التعجب (Exclamation mark !): الفاصلة للفصل بين عناصر القائمة (green, white, and red)، والتعجب بعد التحية الحارة (Hello! Welcome!).'
			],
			visualSvg: svgEnglishPhoneticsChart({
				title: 'Punctuation Marks Quick Guide',
				subtitle: 'Choose the right mark for the end and middle of a sentence',
				columns: [
					{
						sound: 'Full Stop ( . )',
						rule: 'End of a statement',
						examples: 'I live in Tlemcen.',
						color: '#1d4ed8'
					},
					{
						sound: 'Question ( ? )',
						rule: 'End of a question',
						examples: 'Are you Algerian?',
						color: '#047857'
					},
					{
						sound: 'Comma ( , ) & ( ! )',
						rule: 'Lists & Greetings',
						examples: 'Hi! Red, white, green.',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'دليل سريع لعلامات الترقيم الأكثر ورودا في اختبارات الأولى متوسط',
			examples: [
				{
					problemAr: 'أعد كتابة الجملة مع الحروف الكبيرة وعلامات الترقيم: "my friend bilal speaks arabic and english"',
					solutionAr: 'My friend Bilal speaks Arabic and English.'
				},
				{
					problemAr: 'صحّح الجملة: "where is the great mosque of tlemcen"',
					solutionAr: 'Where is the Great Mosque of Tlemcen?'
				}
			],
			watchOutAr:
				'أكثر خطأ يفقد التلاميذ نقاطا بسببه: كتابة الضمير "i" بحرف صغير في وسط الجملة أو كتابة "algeria / english / monday" بحرف صغير! راجعها دائما قبل تسليم الورقة.'
		},
		practice: [
			{
				questionAr: 'اختر الجملة المصحّحة تماما من حيث الحروف الكبيرة وعلامات الترقيم:',
				options: [
					'hello! i am omar from constantine.',
					'Hello! I am Omar from Constantine.',
					'Hello! I am omar from Constantine?',
					'Hello, i am Omar from constantine.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'يجب تكبير الحروف الأولى في Hello و I و Omar و Constantine.',
					'ممتاز! جميع الحروف الكبيرة وعلامات الترقيم صحيحة 100%.',
					'Omar يحتاج حرفا كبيرا، والجملة خبرية لا تأخذ علامة استفهام.',
					'الضمير I ومدينة Constantine يحتاجان حرفا كبيرا.'
				],
				explanationAr: 'نكبّر بداية الجملة والضمير I واسم الشخص Omar واسم المدينة Constantine وننهي بنقطة.'
			},
			{
				questionAr: 'أيّ كلمة يجب أن تبدأ دائما بحرف كبير حتى في وسط الجملة؟',
				options: ['school', 'book', 'Friday', 'morning'],
				correctIndex: 2,
				diagnosticFeedback: [
					'school اسم عام يبدأ بحرف صغير وسط الجملة.',
					'book اسم عام يبدأ بحرف صغير.',
					'أحسنت! أيام الأسبوع (Friday) تُكتب دائما بحرف كبير.',
					'morning فترة يوم تبدأ بحرف صغير.'
				],
				explanationAr: 'أيام الأسبوع والأشهر تبدأ دائما بحرف كبير في اللغة الإنجليزية.'
			},
			{
				questionAr: 'ما علامة الترقيم المناسبة لنهاية الجملة: "What is the capital of Algeria......"',
				options: ['النقطة (.)', 'الفاصلة (,)', 'علامة الاستفهام (?)', 'النقطتان (:)'],
				correctIndex: 2,
				diagnosticFeedback: [
					'هذه الجملة سؤال يبدأ بـ What وليست جملة خبرية.',
					'الفاصلة لا تنهي السؤال.',
					'ممتاز! السؤال ينتهي دائما بعلامة الاستفهام (?).',
					'النقطتان للتفسير أو التعداد وليس لإنهاء السؤال.'
				],
				explanationAr: 'الجملة استفهامية تبدأ بـ What فتنتهي بعلامة استفهام (?).'
			},
			{
				questionAr: 'اختر الترقيم الصحيح لقائمة الألوان في علم الجزائر:',
				options: [
					'The Algerian flag is green? white and red.',
					'The Algerian flag is green, white, and red.',
					'the algerian flag is green white and red!',
					'The Algerian flag is green. white. and red.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نضع علامة استفهام وسط قائمة الألوان.',
					'أحسنت! نفصل بين عناصر القائمة بالفاصلة (,) وننهي الجملة بنقطة.',
					'يجب تكبير The و Algerian ووضع الفاصلة.',
					'لا نضع نقاطا بين عناصر القائمة الواحدة.'
				],
				explanationAr: 'عند تعداد عناصر (green, white, and red) نفصل بينها بالفاصلة وننهي الجملة بنقطة.'
			},
			{
				questionAr: 'كم خطأ في الحروف الكبيرة يوجد في الجملة: "i live in setif and study english."؟',
				options: ['خطأ واحد', 'خطآن', 'ثلاثة أخطاء', 'لا يوجد خطأ'],
				correctIndex: 2,
				diagnosticFeedback: [
					'راجع: الضمير i، واسم المدينة setif، واسم اللغة english.',
					'يوجد أكثر من خطأين؛ راجع أسماء المدن واللغات.',
					'أحسنت! الأخطاء الثلاثة هي: I (كبير)، Setif (مدينة)، English (لغة).',
					'توجد ثلاثة مواضع تستوجب الحرف الكبير.'
				],
				explanationAr: 'الصواب: I live in Setif and study English. (ثلاثة حروف كبيرة).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 4: Guided Email & Paragraph Writing (6 pts Situation of Integration)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_1am_t3_guided_email_country',
		slug: 'eng-1am-t3-guided-email-country',
		grade: '1am',
		yearSubjectId: 616,
		trimesterId: 't3',
		sequenceId: 'seq5',
		sequenceTitleAr: 'المقطع الخامس: أنا ووطني والعالم — Me, My Country and the World',
		order: 4,
		titleAr: 'منهجية كتابة بريد أو فقرة موجهة عن بلدي الجزائر (Guided Email & Paragraph)',
		objectives: [
			'معرفة البنية الرسمية للبريد القصير والفقرة الموجهة في الوضعية الإدماجية (6 نقاط)',
			'توظيف بطاقة المعلومات (Fact File) لتحويل النقاط إلى جمل إنجليزية مترابطة',
			'تجنّب الأخطاء الشائعة في الترتيب والترقيم وروابط العطف (and)'
		],
		keywordsAr: ['Written Expression', 'Email Layout', 'Fact File', 'Guided Paragraph', 'Situation of Integration'],
		discover: {
			scenarioAr:
				'طلب منك صديقك بالمراسلة من بلد مسلم أن تعرّفه بوطنك الجزائر في بريد قصير. انظر كيف تنظّم بريدك في أربع مراحل بسيطة تحصد بها العلامة الكاملة (6/6).',
			svg: svgEnglishWritingStructure({
				title: 'Guided Email About My Country (6 Points)',
				steps: [
					{ stage: '1. Greeting', detail: 'Dear friend, / Hello! I hope you are fine.' },
					{ stage: '2. Identity', detail: 'My name is ... I am 11. I am from Algeria.' },
					{ stage: '3. Algeria Facts', detail: 'Capital: Algiers. Currency: Dinar. Famous dish & landmark.' },
					{ stage: '4. Closing', detail: 'I love my country! Write back soon. Best wishes, Amine.' }
				]
			}),
			steps: [
				{
					promptAr: 'بمَ نبدأ البريد القصير الموجه إلى صديق بالمراسلة؟',
					hintAr: 'انظر المرحلة الأولى في المخطط.',
					expectedInput: 'Dear friend / Hello',
					revealAr: 'نبدأ دائما بتحية لطيفة مثل: "Dear friend," أو "Hello Youssef,".'
				},
				{
					promptAr: 'كيف نحوّل المعلومة التالية من البطاقة (Capital: Algiers) إلى جملة كاملة؟',
					hintAr: 'استعمل فعل الكينونة is.',
					expectedInput: 'The capital is Algiers.',
					revealAr: 'نكتب جملة كاملة بفاعل وفعل: "The capital city is Algiers." أو "Algiers is the capital of Algeria."'
				},
				{
					promptAr: 'بمَ نختم البريد القصير في السطر الأخير؟',
					hintAr: 'انظر المرحلة الرابعة في المخطط.',
					expectedInput: 'Best wishes + Name',
					revealAr: 'نختم بعبارة ودودة وتوقيع الاسم: "Best wishes, Amine." أو "Your friend, Meriem."'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة الأولى للفقرة الناجحة: كل جملة إنجليزية تحتاج فاعلا وفعلا وتنتهي بنقطة (Subject + Verb + Complement.).',
				'ترتيب البريد القصير: التحية (Hello / Dear...)، ثم تقديم النفس (Name, Age, Country)، ثم وصف الجزائر (Capital, Flag, Currency, Landmark, Dish)، ثم الخاتمة والتوقيع (Best wishes, ...).',
				'توظيف الروابط البسيطة: استعمل "and" لربط فكرتين متشابهتين (It is big and beautiful)، وتجنب تكرار الكلمة نفسها كل مرة.',
				'مراجعة نهائية لمدة دقيقتين: تأكد من الحروف الكبيرة (I, Algeria, Algiers)، وتصريف (am / is / are / there is / there are)، والنقاط.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'From Fact File Notes to Full Sentences',
				rootLabel: 'Turn Every Note into Subject + Verb',
				rootSub: 'Never copy notes without verbs!',
				branches: [
					{
						label: 'Note: Algiers',
						rule: 'Add Subject + is',
						example: 'Our capital is Algiers.',
						color: '#1d4ed8'
					},
					{
						label: 'Note: Couscous',
						rule: 'Add: Famous dish is',
						example: 'Our famous dish is couscous.',
						color: '#047857'
					},
					{
						label: 'Note: Casbah',
						rule: 'Add: There is',
						example: 'There is the Casbah.',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'كيف نحوّل كلمات البطاقة الإرشادية إلى جمل تامة وصحيحة نحويا',
			examples: [
				{
					problemAr: 'حوّل الملاحظتين إلى جملتين كاملتين: (Flag: green, white, red) — (Currency: Algerian Dinar).',
					solutionAr: 'Our flag is green, white, and red. Our national currency is the Algerian Dinar.'
				},
				{
					problemAr: 'اكتب خاتمة مناسبة لبريد قصير عن الجزائر.',
					solutionAr: 'I love my country Algeria very much. Write back soon. Best wishes, Bilal.'
				}
			],
			watchOutAr:
				'لا تكتب الملاحظات على شكل قائمة بدون أفعال مثل "Capital: Algiers. Dish: couscous." لأنك تخسر نقاط الصياغة؛ بل حوّل كل معلومة إلى جملة كاملة بفعل واضح!'
		},
		practice: [
			{
				questionAr: 'أيّ بداية هي الأنسب لبريد إلكتروني موجه لصديق بالمراسلة؟',
				options: [
					'Goodbye,',
					'Dear friend,',
					'Best wishes,',
					'Capital: Algiers.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'Goodbye تُستعمل للختام وليس للبداية.',
					'أحسنت! Dear friend, بداية مهذبة وصحيحة للبريد.',
					'Best wishes تُكتب في الختام قبل التوقيع.',
					'هذه ملاحظة داخل البطاقة وليست تحية افتتاحية.'
				],
				explanationAr: 'نفتتح البريد بتحية مناسبة مثل Dear friend, أو Hello.'
			},
			{
				questionAr: 'ما التحويل الصحيح للملاحظة (Famous landmark: Djamaa El Djazair) إلى جملة كاملة؟',
				options: [
					'Famous landmark Djamaa El Djazair.',
					'There is a famous landmark called Djamaa El Djazair.',
					'Landmark is a Djamaa El Djazair famous.',
					'There are Djamaa El Djazair.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الجملة ناقصة بدون فعل.',
					'ممتاز! جملة تامة بفاعل وفعل وترتيب سليم.',
					'ترتيب الصفة والاسم غير سليم.',
					'المعلم مفرد يأخذ There is وليس There are.'
				],
				explanationAr: 'استعمال There is a famous landmark called... يعطي جملة سليمة ومكتملة.'
			},
			{
				questionAr: 'كيف نربط الجملتين (Algeria is big. Algeria is beautiful.) في جملة واحدة؟',
				options: [
					'Algeria is big and beautiful.',
					'Algeria is big? beautiful.',
					'Algeria big and beautiful.',
					'Algeria are big and beautiful.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! ربطنا الصفتين بـ and وحافظنا على الفعل is.',
					'لا نضع علامة استفهام للربط بين صفتين.',
					'ينقص الجملة الفعل is.',
					'Algeria مفرد يأخذ is وليس are.'
				],
				explanationAr: 'نربط الصفتين المتكاملتين بـ and: Algeria is big and beautiful.'
			},
			{
				questionAr: 'ما العنصر الذي نضعه في نهاية البريد بعد عبارة "Best wishes,"؟',
				options: [
					'عنوان المدرسة فقط',
					'اسم الكاتب (التوقيع)',
					'تاريخ اليوم فقط',
					'قائمة الملاحظات'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نوقع بعنوان المدرسة فقط.',
					'ممتاز! نكتب اسم المرسِل بعد Best wishes, (مثل: Best wishes, Amine.).',
					'التوقيع يكون بالاسم.',
					'قائمة الملاحظات ليست جزءا من الخاتمة.'
				],
				explanationAr: 'يُختم البريد بعبارة تحية ختامية يليها اسم الكاتب.'
			},
			{
				questionAr: 'أيّ جملة تصلح لختام فقرة عن حب الوطن الجزائر؟',
				options: [
					'I am eleven years old.',
					'My father is an engineer.',
					'I am proud of my wonderful country Algeria.',
					'Hello! My name is Sara.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'العمر يُذكر في المقدمة عند تقديم النفس.',
					'مهنة الأب لا تخص خاتمة وصف الوطن.',
					'أحسنت! عبارة معبّرة ومناسبة جدا لختام الفقرة.',
					'التحية تكون في البداية.'
				],
				explanationAr: 'خاتمة وصف الوطن تعبّر عن الاعتزاز والحب للجزائر: I am proud of my wonderful country Algeria.'
			}
		]
	}
];
