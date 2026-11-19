import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPrimaryCards,
	svgEnglishWritingStructure
} from '../../svg-english';

// ═══════════════════════════════════════════════════════════════════════════════
// SVGs — 4AP Trimester 3 (Healthy Habits, Animals & Habitats, Weather & Seasons, Fact File)
// ═══════════════════════════════════════════════════════════════════════════════

const svgHealthyHabitsDiscover = svgEnglishPrimaryCards({
	title: 'Healthy Habits & Food — العادات الصحية والغذاء السليم',
	subtitle: 'Cleanliness is Part of Faith & Good Health',
	cards: [
		{ word: 'wash hands', arabic: 'أغسل يديّ', color: '#0284c7' },
		{ word: 'brush teeth', arabic: 'أنظف أسناني', color: '#2563eb' },
		{ word: 'vegetables', arabic: 'خضروات', color: '#059669' },
		{ word: 'fruit & honey', arabic: 'فواكه وعسل', color: '#d97706' }
	],
	width: 520,
	height: 185
});

const svgHealthyHabitsSummary = svgEnglishGrammarMap({
	title: 'Daily Healthy Habits & Imperatives — العادات الصحية وأسلوب النصيحة',
	rootLabel: 'Stay Clean and Strong!',
	rootSub: 'Use the Base Verb for Healthy Advice (Imperative)',
	branches: [
		{
			label: 'Cleanliness',
			rule: 'Wash your hands / Brush teeth',
			example: 'Wash your hands before food.',
			color: '#1d4ed8'
		},
		{
			label: 'Healthy Food',
			rule: 'vegetables, fruit, honey, dates',
			example: 'Eat fresh fruit and vegetables.',
			color: '#047857'
		},
		{
			label: 'Good Sleep',
			rule: 'Sleep early / Drink water',
			example: 'Do not eat too many sweets.',
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

const svgHabitatsDiscover = svgEnglishPrimaryCards({
	title: 'Animals & Their Habitats — الحيوانات ومواطنها الطبيعية',
	subtitle: 'Where does each animal live?',
	cards: [
		{ word: 'desert', arabic: 'الصحراء (camel, fennec)', color: '#d97706' },
		{ word: 'forest', arabic: 'الغابة (deer, bird)', color: '#059669' },
		{ word: 'farm', arabic: 'المزرعة (sheep, cow)', color: '#2563eb' },
		{ word: 'sea', arabic: 'البحر (fish, dolphin)', color: '#0284c7' }
	],
	width: 520,
	height: 185
});

const svgHabitatsSummary = svgEnglishGrammarMap({
	title: 'Talking About Animals & Habitats — وصف الحيوان وموطنه',
	rootLabel: 'Animal Fact Sentences (Present Simple)',
	rootSub: 'It lives in... / It eats... / It can...',
	branches: [
		{
			label: 'Desert (الصحراء)',
			rule: 'camel, fennec fox',
			example: 'The fennec lives in the desert.',
			color: '#b45309'
		},
		{
			label: 'Forest (الغابة)',
			rule: 'deer, bird, rabbit',
			example: 'The deer lives in the forest.',
			color: '#047857'
		},
		{
			label: 'Farm (المزرعة)',
			rule: 'sheep, cow, horse, hen',
			example: 'The sheep lives on the farm.',
			color: '#1d4ed8'
		}
	],
	width: 520,
	height: 250
});

const svgWeatherDiscover = svgEnglishPrimaryCards({
	title: 'The Four Seasons & Weather — الفصول الأربعة والطقس',
	subtitle: 'What is the weather like today?',
	cards: [
		{ word: 'Spring', arabic: 'الربيع (mild, flowers)', color: '#059669' },
		{ word: 'Summer', arabic: 'الصيف (hot, sunny)', color: '#d97706' },
		{ word: 'Autumn', arabic: 'الخريف (windy, cool)', color: '#b45309' },
		{ word: 'Winter', arabic: 'الشتاء (cold, rainy)', color: '#2563eb' }
	],
	width: 520,
	height: 185
});

const svgWeatherSummary = svgEnglishGrammarMap({
	title: 'Seasons & Weather Expressions — الفصول ووصف حالة الطقس',
	rootLabel: 'What is the weather like? -> It is...',
	rootSub: 'Use "in" before seasons (in spring, in winter)',
	branches: [
		{
			label: 'Spring & Summer',
			rule: 'sunny, warm, hot',
			example: 'In summer, it is hot and sunny.',
			color: '#d97706'
		},
		{
			label: 'Autumn',
			rule: 'windy, cloudy, cool',
			example: 'In autumn, it is windy.',
			color: '#b45309'
		},
		{
			label: 'Winter',
			rule: 'cold, rainy, snowy',
			example: 'In winter, it is cold and rainy.',
			color: '#1d4ed8'
		}
	],
	width: 520,
	height: 250
});

const svgFactFileDiscover = svgEnglishPrimaryCards({
	title: 'From a Fact File to a Paragraph — من بطاقة المعلومات إلى فقرة',
	subtitle: '4 Short Lines = 4 Clean English Sentences',
	cards: [
		{ word: 'Animal: Fennec', arabic: 'The fennec is a small animal.', color: '#d97706' },
		{ word: 'Habitat: desert', arabic: 'It lives in the Algerian desert.', color: '#059669' },
		{ word: 'Food: insects/fruit', arabic: 'It eats fruit and insects.', color: '#2563eb' },
		{ word: 'Ability: run fast', arabic: 'It can run very fast.', color: '#7c3aed' }
	],
	width: 520,
	height: 185
});

const svgFactFileSummary = svgEnglishWritingStructure({
	title: '4-Step Paragraph Writing from a Fact File (4AP)',
	steps: [
		{ stage: '1. Introduce', detail: 'The camel is a strong and useful animal.', color: '#1d4ed8' },
		{ stage: '2. Habitat', detail: 'It lives in the Algerian desert.', color: '#047857' },
		{ stage: '3. Food & Colour', detail: 'It is brown and it eats dry plants.', color: '#b45309' },
		{ stage: '4. Ability', detail: 'It can walk for many days without water.', color: '#7c3aed' }
	],
	width: 520
});

// ═══════════════════════════════════════════════════════════════════════════════
// LESSONS_4AP_T3 (4 Lessons — yearSubjectId: 800)
// ═══════════════════════════════════════════════════════════════════════════════

export const LESSONS_4AP_T3: EnglishInteractiveLessonData[] = [
	{
		id: 'eng_lesson_4ap_t3_healthy_habits',
		slug: 'eng-4ap-t3-healthy-habits',
		grade: '4ap',
		yearSubjectId: 800,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: الصحة والغذاء السليم (Health and Healthy Food)',
		order: 1,
		titleAr: 'العادات الصحية والغذاء السليم (Healthy Habits and Food)',
		objectives: [
			'حفظ مفردات الغذاء الصحي والنظافة الشخصية (vegetables, fruit, honey, brush teeth, wash hands)',
			'استعمال فعل الأمر للنصيحة الإيجابية (Wash your hands. / Eat fruit.) والنهي (Do not eat too many sweets.)',
			'ربط النظافة والغذاء الطيب بقوة الجسم وصحة التلميذ'
		],
		keywordsAr: ['العادات الصحية', 'vegetables', 'fruit', 'honey', 'brush teeth', 'wash hands', 'Healthy habits'],
		discover: {
			scenarioAr:
				'زار الطبيب المدرسة وقدّم لتلاميذ السنة الرابعة ابتدائي أربع نصائح ذهبية ليظلّوا أصحاء وأقوياء: «Wash your hands before eating. Brush your teeth every day. Eat fruit, vegetables and honey. Sleep early!».',
			svg: svgHealthyHabitsDiscover,
			steps: [
				{
					promptAr: 'ما العادة الصحية التي نقوم بها قبل الأكل وبعده؟',
					hintAr: 'غسل اليدين: wash hands.',
					expectedInput: 'wash hands',
					revealAr: 'نغسل أيدينا بالماء والصابون: «Wash your hands before and after meals.»، وننظف أسناننا: «Brush your teeth.».'
				},
				{
					promptAr: 'ماذا نسمي «الخضروات» و«الفواكه» و«العسل» بالإنجليزية؟',
					hintAr: 'vegetables — fruit — honey.',
					expectedInput: 'vegetables, fruit, honey',
					revealAr: 'الخضروات «vegetables»، والفواكه «fruit»، والعسل «honey»، وهي أغذية تقوّي الجسم.'
				},
				{
					promptAr: 'كيف ننصح صديقنا بألّا يكثر من الحلوى؟ (ابدأ بـ Do not ...)',
					hintAr: 'Do not + الفعل المجرد (eat).',
					expectedInput: 'Do not eat too many sweets',
					revealAr: 'للنهي والنصيحة بالابتعاد عن عادة مضرّة نستعمل «Do not + الفعل»: «Do not eat too many sweets.».'
				}
			]
		},
		summary: {
			rulesAr: [
				'أغذية صحية (Healthy food): vegetables (خضروات), fruit (فواكه), honey (عسل), dates (تمر), milk (حليب), water (ماء), fish (سمك).',
				'عادات صحية يومية: wash your hands (اغسل يديك), brush your teeth (نظّف أسنانك), sleep early (نم باكراً), do sport (مارس الرياضة).',
				'أسلوب النصيحة الإيجابية (Imperative): نبدأ الجملة مباشرة بالفعل المجرد: «Eat fresh vegetables.», «Drink clean water.».',
				'أسلوب النهي (Negative imperative): نبدأ بـ «Do not + الفعل المجرد»: «Do not drink soda.», «Do not sleep late.».'
			],
			visualSvg: svgHealthyHabitsSummary,
			visualCaptionAr: 'العادات الصحية اليومية وأسلوب الأمر والنهي البسيط للنصيحة',
			examples: [
				{
					problemAr: 'أكمل النصيحتين بالفعل المناسب (Brush / Wash): 1) ...... your hands. / 2) ...... your teeth.',
					solutionAr: '1) Wash your hands.\n2) Brush your teeth.'
				},
				{
					problemAr: 'صنّف إلى Healthy (صحي) و Unhealthy (غير صحي): (honey — soda — vegetables — candy)',
					solutionAr: 'Healthy: honey, vegetables.\nUnhealthy: soda, candy.'
				}
			],
			watchOutAr:
				'في جملة الأمر (Imperative) لا نكتب فاعلاً قبل الفعل: نقول مباشرة «Brush your teeth.» وليس «You brushes your teeth.»!'
		},
		practice: [
			{
				questionAr: 'ما معنى عبارة «brush your teeth» باللغة العربية؟',
				options: ['اغسل يديك', 'نظّف أسنانك', 'نم باكراً', 'اشرب الماء'],
				correctIndex: 1,
				diagnosticFeedback: [
					'اغسل يديك هي wash your hands.',
					'أحسنت! brush your teeth تعني نظّف أسنانك بالفرشاة.',
					'نم باكراً هي sleep early.',
					'اشرب الماء هي drink water.'
				],
				explanationAr: 'teeth تعني الأسنان، و brush your teeth تعني تنظيف الأسنان.'
			},
			{
				questionAr: 'أيّ قائمة تحتوي فقط على أغذية صحية (Healthy food)؟',
				options: [
					'vegetables, fruit, honey',
					'soda, candy, chips',
					'honey, soda, sweets',
					'water, candy, chips'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! الخضروات والفواكه والعسل كلها أغذية صحية نافعة.',
					'المشروبات الغازية والحلوى والرقائق أطعمة غير صحية.',
					'soda و sweets غير صحية.',
					'candy و chips غير صحية.'
				],
				explanationAr: 'vegetables و fruit و honey أغذية طبيعية وصحية.'
			},
			{
				questionAr: 'أكمل النصيحة قبل الأكل: «...... your hands with soap and water.»',
				options: ['Eat', 'Wash', 'Sleep', 'Read'],
				correctIndex: 1,
				diagnosticFeedback: [
					'Eat تعني كُل.',
					'صحيح! Wash your hands تعني اغسل يديك.',
					'Sleep تعني نَم.',
					'Read تعني اقرأ.'
				],
				explanationAr: 'الفعل wash يعني يغسل، ونستعمله قبل الأكل لنظافة اليدين.'
			},
			{
				questionAr: 'اختر النصيحة الصحيحة لتجنّب شرب المشروبات الغازية:',
				options: [
					'Drink soda every morning.',
					'Do not drink soda.',
					'Soda not drink.',
					'No drinks soda.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه نصيحة غير صحية.',
					'رائع! النهي الصحيح يبدأ بـ Do not + الفعل المجرد: Do not drink soda.',
					'ترتيب الكلمات غير صحيح.',
					'صيغة النهي الصحيحة هي Do not + الفعل المجرد.'
				],
				explanationAr: 'لصياغة نهي صحي نكتب: Do not + Base Verb.'
			}
		]
	},
	{
		id: 'eng_lesson_4ap_t3_animals_habitats',
		slug: 'eng-4ap-t3-animals-habitats',
		grade: '4ap',
		yearSubjectId: 800,
		trimesterId: 't3',
		sequenceId: 'seq5',
		sequenceTitleAr: 'المقطع الخامس: الحيوانات ومواطنها والطبيعة (Animals and Nature)',
		order: 2,
		titleAr: 'الحيوانات ومواطنها الطبيعية (Animals and Their Habitats)',
		objectives: [
			'ربط الحيوانات بمواطنها الطبيعية بالإنجليزية (desert, forest, farm, sea)',
			'استعمال الفعل «lives» و«eats» في المضارع البسيط لوصف حيوان مفرد',
			'التمييز بين حرف الجر «in the desert / forest / sea» و«on the farm»'
		],
		keywordsAr: ['المواطن الطبيعية', 'desert', 'forest', 'farm', 'sea', 'fennec', 'camel', 'lives in'],
		discover: {
			scenarioAr:
				'في حصة العلوم باللغة الإنجليزية، عرضت المعلمة خريطة الجزائر الجميلة وقالت: الصحراء الجزائرية موطن الجمل والفنك (the desert)، والغابة موطن الغزال والعصفور (the forest)، والمزرعة موطن الخروف والبقرة (the farm).',
			svg: svgHabitatsDiscover,
			steps: [
				{
					promptAr: 'أين يعيش الجمل (the camel) وثعلب الصحراء الفنك (the fennec) في الجزائر؟',
					hintAr: 'الصحراء بالإنجليزية هي the desert.',
					expectedInput: 'in the desert',
					revealAr: 'نقول: «The camel and the fennec live in the desert.» (يعيشان في الصحراء).'
				},
				{
					promptAr: 'أين يعيش الغزال (the deer) والعصافير؟ وأين يعيش الخروف (the sheep)؟',
					hintAr: 'الغابة: forest، والمزرعة: farm.',
					expectedInput: 'forest and farm',
					revealAr: 'الغزال يعيش في الغابة «in the forest»، والخروف والبقرة يعيشان في المزرعة «on the farm».'
				},
				{
					promptAr: 'لاحظ الفعل في جملة: «The sheep lives on the farm.» لماذا أضفنا (s) للفعل live؟',
					hintAr: 'لأن The sheep حيوان واحد يعادل الضمير It.',
					expectedInput: 'It takes s',
					revealAr: 'عندما نتحدث عن حيوان واحد (It)، نضيف «s» إلى الفعل: «It lives...», «It eats...».'
				}
			]
		},
		summary: {
			rulesAr: [
				'المواطن الطبيعية (Habitats): the desert (الصحراء), the forest (الغابة), the farm (المزرعة), the sea (البحر).',
				'حيوانات الصحراء: camel (جمل), fennec (فنك). حيوانات الغابة: deer (غزال), bird (عصفور), rabbit (أرنب).',
				'حيوانات المزرعة: sheep (خروف), cow (بقرة), horse (حصان), hen (دجاجة). وحيوانات البحر: fish (سمكة), dolphin (دلفين).',
				'قاعدة حروف الجر: نقول «in the desert / in the forest / in the sea»، ولكن مع المزرعة نقول «on the farm».'
			],
			visualSvg: svgHabitatsSummary,
			visualCaptionAr: 'الحيوانات ومواطنها الطبيعية مع حروف الجر المناسبة',
			examples: [
				{
					problemAr: 'أكمل بالموطن الصحيح (desert / forest / farm / sea):\n1) The fish lives in the ....... / 2) The camel lives in the ....... .',
					solutionAr: '1) The fish lives in the sea.\n2) The camel lives in the desert.'
				},
				{
					problemAr: 'صحّح الفعل بين قوسين: «The cow (live) ...... on the farm and (eat) ...... grass.»',
					solutionAr: '«The cow lives on the farm and eats grass.».'
				}
			],
			watchOutAr:
				'تذكّر حرف الجر الخاص بالمزرعة: نقول «on the farm» (وليس in the farm)، أما مع الصحراء والغابة والبحر فنقول «in»!'
		},
		practice: [
			{
				questionAr: 'أين يعيش الفنك (the fennec) رمز الصحراء الجزائرية؟',
				options: ['In the sea', 'In the desert', 'On the farm', 'In the classroom'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الفنك لا يعيش في البحر.',
					'أحسنت! الفنك يعيش في الصحراء: in the desert.',
					'الفنك حيوان بري صحراوي وليس من حيوانات المزرعة.',
					'القسم مكان للدراسة.'
				],
				explanationAr: 'الفنك (fennec) والجمل (camel) يعيشان في الصحراء (the desert).'
			},
			{
				questionAr: 'أيّ حيوان يعيش في المزرعة (on the farm)؟',
				options: ['dolphin', 'sheep', 'fennec', 'fish'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الدلفين يعيش في البحر.',
					'ممتاز! الخروف (sheep) يعيش في المزرعة.',
					'الفنك يعيش في الصحراء.',
					'السمكة تعيش في البحر.'
				],
				explanationAr: 'من حيوانات المزرعة: sheep, cow, horse, hen.'
			},
			{
				questionAr: 'أكمل الجملة بالفعل الصحيح: «The deer ...... in the green forest.»',
				options: ['live', 'lives', 'living', 'are live'],
				correctIndex: 1,
				diagnosticFeedback: [
					'The deer مفرد (It) لذا نضيف s للفعل.',
					'صحيح! The deer lives in the green forest.',
					'نستعمل المضارع البسيط lives للحقائق العلمية.',
					'The deer مفرد فلا يأخذ are.'
				],
				explanationAr: 'للحقائق العلمية حول حيوان مفرد نستعمل الفعل مع s: lives.'
			},
			{
				questionAr: 'اختر حرف الجر الصحيح: «The horse lives ...... the farm.»',
				options: ['on', 'under', 'next', 'am'],
				correctIndex: 0,
				diagnosticFeedback: [
					'رائع! مع كلمة farm نستعمل on: on the farm.',
					'under تعني تحت.',
					'next وحدها ناقصة ولا تناسب المزرعة.',
					'am فعل وليس حرف جر.'
				],
				explanationAr: 'العبارة الصحيحة في اللغة الإنجليزية هي: on the farm.'
			}
		]
	},
	{
		id: 'eng_lesson_4ap_t3_weather_seasons',
		slug: 'eng-4ap-t3-weather-seasons',
		grade: '4ap',
		yearSubjectId: 800,
		trimesterId: 't3',
		sequenceId: 'seq5',
		sequenceTitleAr: 'المقطع الخامس: الحيوانات ومواطنها والطبيعة (Weather and Seasons)',
		order: 3,
		titleAr: 'الفصول الأربعة وحالة الطقس (Weather and Seasons)',
		objectives: [
			'حفظ أسماء الفصول الأربعة بالإنجليزية (spring, summer, autumn, winter)',
			'وصف حالة الطقس بصفات واضحة (sunny, rainy, windy, snowy, hot, cold)',
			'السؤال عن الطقس: What is the weather like? والإجابة بـ: It is...'
		],
		keywordsAr: ['الفصول الأربعة', 'spring', 'summer', 'autumn', 'winter', 'sunny', 'rainy', 'Weather'],
		discover: {
			scenarioAr:
				'نظر أمين من نافذة القسم في شهر مارس فرأى الشمس مشرقة والزهور متفتحة، فسأله الأستاذ: «What is the weather like today?» فأجاب أمين: «It is sunny and warm. It is spring!».',
			svg: svgWeatherDiscover,
			steps: [
				{
					promptAr: 'ما أسماء الفصول الأربعة باللغة الإنجليزية؟',
					hintAr: 'الربيع، الصيف، الخريف، الشتاء.',
					expectedInput: 'spring, summer, autumn, winter',
					revealAr: 'الفصول الأربعة هي: «spring» (الربيع)، و«summer» (الصيف)، و«autumn» (الخريف)، و«winter» (الشتاء).'
				},
				{
					promptAr: 'كيف نصف الطقس في فصل الشتاء (winter) وفي فصل الصيف (summer)؟',
					hintAr: 'الشتاء بارد وممطر (cold and rainy)، والصيف حار ومشمس (hot and sunny).',
					expectedInput: 'cold and rainy / hot and sunny',
					revealAr: 'في الشتاء نقول: «In winter, it is cold and rainy.»، وفي الصيف نقول: «In summer, it is hot and sunny.».'
				},
				{
					promptAr: 'ما السؤال الذي نطرحه لمعرفة حالة الطقس اليوم؟',
					hintAr: 'What is the weather ...?',
					expectedInput: 'What is the weather like?',
					revealAr: 'نسأل: «What is the weather like today?» ونجيب بـ «It is ...» ثم صفة الطقس.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الفصول الأربعة (The four seasons): spring (الربيع), summer (الصيف), autumn (الخريف), winter (الشتاء).',
				'صفات الطقس (Weather): sunny (مشمس), rainy (ممطر), windy (عاصف), cloudy (غائم), snowy (مثلج), hot (حار), cold (بارد), warm (دافئ).',
				'للسؤال عن الطقس: «What is the weather like?» وللإجابة: «It is sunny and warm.».',
				'نستعمل حرف الجر «in» قبل الفصول: «In spring, flowers grow.», «In winter, it is cold and snowy in the mountains.».'
			],
			visualSvg: svgWeatherSummary,
			visualCaptionAr: 'ربط كل فصل من فصول السنة بحالة الطقس المميزة له',
			examples: [
				{
					problemAr: 'اربط كل فصل بصفته المناسبة: (winter — summer — autumn) مع (hot and sunny — cold and rainy — windy)',
					solutionAr: 'winter : cold and rainy / summer : hot and sunny / autumn : windy.'
				},
				{
					problemAr: 'أجب عن السؤال: «What is your favourite season?»',
					solutionAr: '«My favourite season is spring because it is sunny and green.».'
				}
			],
			watchOutAr:
				'لاحظ كيف نحول الاسم إلى صفة طقس بإضافة الحرف (y): sun تصبح «sunny»، rain تصبح «rainy»، wind تصبح «windy»، snow تصبح «snowy»!'
		},
		practice: [
			{
				questionAr: 'ما معنى فصل «spring» باللغة العربية؟',
				options: ['الصيف', 'الشتاء', 'الربيع', 'الخريف'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الصيف هو summer.',
					'الشتاء هو winter.',
					'أحسنت! spring هو فصل الربيع.',
					'الخريف هو autumn.'
				],
				explanationAr: 'spring هو فصل الربيع حيث تتفتح الأزهار وتخضر الأشجار.'
			},
			{
				questionAr: 'كيف يكون الطقس عادةً في فصل الشتاء (winter)؟',
				options: ['hot and sunny', 'cold and rainy', 'very hot', 'dry and hot'],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذا طقس فصل الصيف (summer).',
					'ممتاز! في الشتاء يكون الطقس بارداً وممطراً: cold and rainy.',
					'very hot صفة فصل الصيف.',
					'dry and hot صفة الصيف.'
				],
				explanationAr: 'الشتاء يتميز بالبرد والأمطار والثلوج: cold, rainy and snowy.'
			},
			{
				questionAr: 'اختر الصفة المشتقة من كلمة «rain» (مطر) لوصف يوم ممطر:',
				options: ['suny', 'rainy', 'windy', 'hot'],
				correctIndex: 1,
				diagnosticFeedback: [
					'suny خطأ إملائي وتعني مشمس.',
					'صحيح! نضيف y إلى rain فتصبح rainy (ممطر).',
					'windy تعني عاصف.',
					'hot تعني حار.'
				],
				explanationAr: 'rain + y = rainy (ممطر).'
			},
			{
				questionAr: 'أكمل الجملة بحرف الجر الصحيح: «...... summer, it is sunny and hot.»',
				options: ['In', 'Under', 'Next to', 'Am'],
				correctIndex: 0,
				diagnosticFeedback: [
					'رائع! قبل الفصول الأربعة نستعمل دائماً حرف الجر In.',
					'under تعني تحت.',
					'next to تعني بجانب.',
					'am فعل كينونة.'
				],
				explanationAr: 'نقول دائماً: In spring, In summer, In autumn, In winter.'
			}
		]
	},
	{
		id: 'eng_lesson_4ap_t3_fact_file_writing',
		slug: 'eng-4ap-t3-fact-file-writing',
		grade: '4ap',
		yearSubjectId: 800,
		trimesterId: 't3',
		sequenceId: 'seq5',
		sequenceTitleAr: 'المقطع الخامس: الإنتاج الكتابي الموجّه (Guided Paragraph Writing)',
		order: 4,
		titleAr: 'كتابة فقرة قصيرة من بطاقة معلومات (Guided Paragraph from a Fact File)',
		objectives: [
			'قراءة بطاقة معلومات (Fact File) وفهم حقولها الأساسية (Name, Habitat, Food, Colour, Ability)',
			'تحويل البطاقة إلى فقرة متماسكة من 4 إلى 5 جمل قصيرة وسليمة',
			'استعمال أدوات الربط البسيطة (and / but) وعلامات الترقيم الصحيحة (Capital letters, Full stops)'
		],
		keywordsAr: ['Fact File', 'Paragraph writing', 'It lives', 'It eats', 'It can', 'and / but'],
		discover: {
			scenarioAr:
				'في اختبار الفصل الثالث للسنة الرابعة ابتدائي، حصلت سارة على بطاقة معلومات (Fact File) عن حيوان الفنك الجزائري، وتعلّمت كيف تحوّل كل سطر من البطاقة إلى جملة جميلة لتصنع فقرة كاملة من 4 جمل.',
			svg: svgFactFileDiscover,
			steps: [
				{
					promptAr: 'إذا كان في البطاقة «Animal: Camel / Colour: brown»، كيف نكتب الجملة الأولى؟',
					hintAr: 'ابدأ بـ The camel is ...',
					expectedInput: 'The camel is a big brown animal.',
					revealAr: 'نكتب: «The camel is a big brown animal.»، وهكذا قدّمنا الحيوان ولونه.'
				},
				{
					promptAr: 'إذا كان في البطاقة «Habitat: desert / Food: dry plants»، كيف نربطهما بضمير «It»؟',
					hintAr: 'It lives in ... and it eats ...',
					expectedInput: 'It lives in the desert and it eats dry plants.',
					revealAr: 'نقول: «It lives in the desert. It eats dry plants.» مع إضافة s للفعلين lives و eats.'
				},
				{
					promptAr: 'إذا كان في البطاقة «Ability: walk long distances»، أيّ فعل مساعد نستعمله؟',
					hintAr: 'تذكّر فعل الاستطاعة: can.',
					expectedInput: 'It can walk long distances.',
					revealAr: 'نستعمل «can» فنقول: «It can walk long distances.» ولا نضيف s للفعل walk بعد can!'
				}
			]
		},
		summary: {
			rulesAr: [
				'لكتابة فقرة ناجحة من 4 إلى 5 جمل في السنة الرابعة ابتدائي، نخصّص جملة واضحة لكل معلومة في الـ Fact File.',
				'للحيوان نستعمل الضمير «It» مع الأفعال المصرّفة في المضارع البسيط: It is... / It lives in... / It eats... / It can... .',
				'للشخص أو العادات الصحية نستعمل الضمير المناسب (I / He / She) مع أدوات الربط البسيطة «and» (للجمع) و«but» (للاستدراك).',
				'قبل تسليم الورقة راجع أربع نقاط: 1) الحرف الكبير أول كل جملة، 2) النقطة آخر كل جملة، 3) حرف s مع He/She/It، 4) الفعل مجرد بعد can.'
			],
			visualSvg: svgFactFileSummary,
			visualCaptionAr: 'الخطوات الأربع لبناء فقرة إنجليزية نموذجية من بطاقة معلومات (Fact File)',
			examples: [
				{
					problemAr: 'حوّل بطاقة الفصول إلى فقرة من 4 جمل:\n(Season: Spring — Weather: sunny and warm — Nature: green trees and flowers — Activity: walk in the garden)',
					solutionAr: 'My favourite season is spring. In spring, the weather is sunny and warm. The trees are green and the flowers are colourful. I walk in the clean garden with my family.'
				},
				{
					problemAr: 'صحّح الأخطاء الثلاثة في هذه الجملة: «the fennec live in the desert and it can runs fast»',
					solutionAr: '«The fennec lives in the desert and it can run fast.» (حرف T كبير، lives بـ s، run بدون s بعد can، ونقطة في النهاية).'
				}
			],
			watchOutAr:
				'لا تنسخ سطور الـ Fact File كما هي بنقطتين (Habitat: desert)! بل حوّلها دائماً إلى جمل كاملة تحتوي على فاعل وفعل: «It lives in the desert.».'
		},
		practice: [
			{
				questionAr: 'اختر الجملة الصحيحة التي تحوّل السطر «Habitat: Algerian desert» عن الفنك:',
				options: [
					'Habitat: Algerian desert.',
					'It lives in the Algerian desert.',
					'It live in the Algerian desert.',
					'He is desert Algerian.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا ننسخ سطر البطاقة كما هو بل نكتب جملة كاملة.',
					'أحسنت! جملة كاملة بضمير It والفعل lives مع s ونقطة في الأخير.',
					'ينقص حرف s للفعل live مع الضمير It.',
					'التركيب غير صحيح ولا نستعمل He للحيوان.'
				],
				explanationAr: 'لتحويل خانة الموطن إلى جملة نكتب: It lives in the ... .'
			},
			{
				questionAr: 'اختر أداة الربط المناسبة: «The sheep can run, ...... it cannot fly.»',
				options: ['and', 'but', 'is', 'in'],
				correctIndex: 1,
				diagnosticFeedback: [
					'and للجمع بين فكرتين متشابهتين، وهنا توجد فكرة مثبَتة وأخرى منفية.',
					'ممتاز! نستعمل but (لكن) للربط بين القدرة وعدم القدرة.',
					'is فعل كينونة وليس أداة ربط.',
					'in حرف جر.'
				],
				explanationAr: 'نستعمل but (لكن) عند التضاد بين can و cannot.'
			},
			{
				questionAr: 'أيّ جملة مكتوبة بشكل صحيح 100 بالمئة في فقرة عن الحيوانات؟',
				options: [
					'It eats grass and it can run fast.',
					'It eat grass and it can runs fast.',
					'it eats grass and it can run fast',
					'It eating grass and can run.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! eats مع s، و run مجردة بعد can، وحرف كبير ونقطة.',
					'وقع خطأ مزدوج: eat تحتاج s، و runs لا تأخذ s بعد can.',
					'ينقصها الحرف الكبير أول الجملة والنقطة في آخرها.',
					'ينقصها تصريف صحيح في المضارع البسيط.'
				],
				explanationAr: 'القاعدة الذهبية: It eats (مع s) — It can run (بدون s).'
			},
			{
				questionAr: 'ما الترتيب المنطقي الأفضل لفقرة تصف حيواناً من بطاقة معلومات؟',
				options: [
					'الاسم واللون ثم الموطن ثم الغذاء ثم القدرة',
					'القدرة ثم الاسم بدون ذكر الموطن',
					'نسخ جدول البطاقة كما هو',
					'كتابة كلمات متفرقة بدون أفعال'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'رائع! هذا التسلسل المنطقي يجعل الفقرة واضحة ومرتبة وتنال العلامة الكاملة.',
					'البدء بالاسم واللون أوضح للقارئ.',
					'في الوضعية الإدماجية يجب كتابة فقرة مترابطة لا نسخ الجدول.',
					'الجملة الإنجليزية تحتاج دائماً إلى فاعل وفعل.'
				],
				explanationAr: 'الفقرة الجيدة تبدأ بتقديم الحيوان، ثم موطنه، ثم غذائه، ثم ما يستطيع فعله.'
			}
		]
	}
];
