import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWordFormation,
	svgFrenchWritingBlueprint
} from '../../svg-french';

export const LESSONS_2AS_LE_T1: FrenchInteractiveLessonData[] = [
	{
		id: 'fre_lesson_2as_le_t1_procedes_objectivation',
		slug: 'fre-2as-le-t1-procedes-objectivation',
		grade: '2as_le',
		yearSubjectId: 777,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: الخطاب الموضوعي المعمّق والتقرير النقدي (Discours objectivé approfondi et compte rendu critique)',
		order: 1,
		titleAr: 'الوسائل التفسيرية المتقدمة واستراتيجيات الموضوعية (Procédés explicatifs avancés et objectivation)',
		objectives: [
			'تحليل الوسائل التفسيرية الدقيقة في الخطاب الأكاديمي (Définition analytique, Reformulation, Comparaison fonctionnelle, Analyse, Quantification, Citation scientifique)',
			'تحديد استراتيجيات الموضوعية والتجريد (Objectivation): التراكيب غير الشخصية، المبني للمجهول، الاسمية، والبعد النقدي',
			'التمييز الدقيق بين النص التفسيري الصرف (À visée purement informative) والنص التفسيري ذي البعد البرهاني'
		],
		keywordsAr: [
			'discours objectivé',
			'objectivation',
			'procédés explicatifs',
			'distanciation',
			'quantification',
			'الموضوعية العلمية'
		],
		discover: {
			scenarioAr:
				'في دراسة تاريخية حول العالم المسلم الخوارزمي، يكتب الباحث: « L’algorithme, terme issu du nom d’Al-Khwarizmi, désigne une suite finie d’opérations rigoureuses permettant de résoudre un problème donné ; en d’autres termes, une procédure reproductible. Il est établi par les historiens des mathématiques que son traité d’algèbre, rédigé vers 820 à Bagdad, a structuré le calcul symbolique pour plusieurs siècles. » تأمل تضافر الوسائل التفسيرية والتجريد الموضوعي.',
			svg: svgFrenchGrammarMap({
				title: 'Stratégies d’objectivation et procédés explicatifs (2AS LE)',
				rootLabel: 'Discours scientifique rigoureux',
				rootSub: 'Effacement énonciatif + Précision conceptuelle',
				width: 580,
				branches: [
					{
						label: 'Définition & Analyse',
						rule: 'Décomposer un concept',
						example: 'L’algorithme désigne une suite finie...'
					},
					{
						label: 'Quantification',
						rule: 'Dates, mesures, proportions',
						example: 'Rédigé vers 820 ; 6 339 km de rayon.'
					},
					{
						label: 'Tournure impersonnelle',
						rule: 'Il est établi / démontré que',
						example: 'Il convient de noter la rigueur...'
					},
					{
						label: 'Passif & Nominalisation',
						rule: 'Focaliser sur le fait',
						example: 'La généralisation du calcul décimal.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'استخرج من الفقرة التمهيدية ثلاث وسائل تفسيرية مختلفة: التعريف، إعادة الصياغة، والتحديد الكمي أو التاريخي (Quantification/Datation).',
					hintAr: 'ابحث عن « désigne », « en d’autres termes »، والسنة التاريخية.',
					expectedInput: 'التعريف (désigne une suite finie...)، إعادة الصياغة (en d’autres termes...)، والتأريخ الدقيق (vers 820)',
					revealAr:
						'في مستوى اللغات الأجنبية (2AS LE) لا نكتفي بالتعريف والتمثيل فحسب، بل نحلل أيضاً التحديد الكمي والزمني (Quantification / Datation) والإحالة إلى الإجماع العلمي (Citation d’autorité).'
				},
				{
					promptAr:
						'لماذا استعمل الباحث العبارة « Il est établi par les historiens des mathématiques que... » بدلاً من « Je pense que... »؟',
					hintAr: 'كيف تؤثر الصيغة غير الشخصية والمبني للمجهول على مصداقية المعلومة؟',
					expectedInput: 'لتحقيق التجريد الموضوعي وإسناد الحقيقة إلى إجماع علمي موثق لا إلى رأي فردي',
					revealAr:
						'إسناد المعلومة إلى مصادر علمية مع التركيب غير الشخصي والمبني للمجهول يرفع من مستوى المصداقية والموضوعية الأكاديمية (Objectivation).'
				},
				{
					promptAr:
						'ما الفرق بين مقارنة تفسيرية (Comparaison explicative) واستعارة ذاتية (Métaphore lyrique)؟',
					hintAr: 'فكر في غاية المقارنة داخل نص علمي.',
					expectedInput: 'المقارنة التفسيرية تقرّب مفهوماً مجهولاً من واقع معروف لتسهيل الفهم لا لإثارة العاطفة',
					revealAr:
						'في النص العلمي، تُوظف المقارنة (مثل تشبيه جريان الدم بشبكة الري) بوظيفة تعليمية تفسيرية خالصة (Fonction didactique).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الوسائل التفسيرية المتقدمة: التعريف التحليلي (Définition)، التسمية والإيتيمولوجيا (Dénomination / Étymologie)، إعادة الصياغة التوضيحية (Reformulation)، التحليل والتفكيك (Analyse des composants)، التحديد الكمي والإحصائي (Quantification)، المقارنة التوضيحية (Comparaison)، والوظيفة (Fonction).',
				'آليات الموضوعية الأكاديمية (L’objectivation): (1) غياب ضمائر المتكلم واستعمال الغائب و « on » المحايد؛ (2) المبني للمجهول لإبراز الظاهرة لا الشخص؛ (3) التراكيب غير الشخصية (Il est avéré que, Il ressort de cette étude que)؛ (4) الاسمية المكثفة (Nominalisation) لتقديم العمليات بوصفها مفاهيم ثابتة.',
				'المسافة النقدية العلمية (La distanciation): عندما ينقل الباحث فرضية قيد الدراسة أو قولاً منسوباً، يستعمل عبارات الاحتراز الموضوعي مثل « Selon les chroniques », « D’après les mesures d’Al-Birouni ».',
				'في شعبة اللغات الأجنبية (معامل 5)، يُنتظر من التلميذ تسمية الوسيلة التفسيرية واستخراج مؤشرها اللغوي الدقيق وشرح دورها في إفهام القارئ.'
			],
			visualSvg: svgFrenchWritingBlueprint({
				title: 'Analyser un procédé explicatif au niveau 2AS LE',
				width: 580,
				steps: [
					{
						stage: '1. Identifier',
						detail: 'Nommer précisément le procédé (définition, analyse, quantification...).'
					},
					{
						stage: '2. Repérer l’indice',
						detail: 'Citer le marqueur linguistique exact (désigne, autrement dit, vers 820).'
					},
					{
						stage: '3. Expliquer le rôle',
						detail: 'Préciser comment il clarifie, prouve ou simplifie le concept.'
					},
					{
						stage: '4. Lier à la visée',
						detail: 'Montrer qu’il sert la visée informative et didactique du texte.'
					}
				]
			}),
			visualCaptionAr: 'منهجية التحليل المعمق للوسائل التفسيرية في شعبة اللغات الأجنبية',
			examples: [
				{
					problemAr:
						'Relevez deux procédés explicatifs et un procédé d’objectivation dans : « Il est démontré que la trigonométrie, c’est-à-dire l’étude des relations entre angles et distances, permit à Al-Birouni d’évaluer le rayon terrestre à 6 339 km. »',
					solutionAr:
						'1) Reformulation (« c’est-à-dire l’étude... ») ; 2) Quantification précise (« 6 339 km ») ; 3) Objectivation : tournure impersonnelle passive (« Il est démontré que »).'
				},
				{
					problemAr:
						'Objectivez la phrase subjective suivante : « À mon avis, nous devons admirer la médecine très intelligente d’Al-Zahrawi. »',
					solutionAr:
						'« Il est reconnu par les historiens de la médecine que les méthodes chirurgicales d’Al-Zahrawi témoignent d’une rigueur remarquable. »'
				}
			],
			watchOutAr:
				'تجنب الخلط بين « موضوعية النص » (Objectivité) وغياب الإعجاب العلمي الضمني: قد يصف مؤرخ علوم إنجازاً بأنه « précis » أو « rigoureux » بوصفه حقيقة قابلة للتحقق والقياس، بخلاف الصفات العاطفية المجردة مثل « magnifique » أو « incroyable ».'
		},
		practice: [
			{
				questionAr:
					'Quel procédé explicatif avancé est illustré par : « Al-Birouni calcula le rayon de la Terre avec une marge d’erreur inférieure à 1 % » ?',
				options: ['La dénomination', 'La quantification (donnée chiffrée)', 'La reformulation', 'L’énumération'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا يوجد فعل تسمية مثل appelé أو nommé.',
					'ممتاز! توظيف النسبة الرقمية الدقيقة (inférieure à 1 %) يمثل التحديد الكمي (La quantification).',
					'خطأ: لا يوجد رابط إعادة صياغة.',
					'خطأ: لا يوجد تعداد لعدة عناصر.'
				],
				explanationAr: 'إيراد أرقام وقياسات ونسب دقيقة (Quantification) يدعم المصداقية العلمية للنص التفسيري.'
			},
			{
				questionAr:
					'Quelle tournure renforce le plus l’objectivation scientifique d’une affirmation ?',
				options: [
					'Je crois sincèrement que cette théorie est géniale.',
					'Il est établi par les archives médiévales que ce traité fut traduit au XIIe siècle.',
					'Personnellement, j’adore la géographie d’Al-Idrisi.',
					'Évidemment, vous devez tous aimer les mathématiques !'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: « Je crois sincèrement » و « géniale » علامتان للذاتية.',
					'أحسنت! التركيب غير الشخصي المبني للمجهول مع إسناد تاريخي يحقق أقصى درجات الموضوعية.',
					'خطأ: تعبير عن ذوق شخصي بضمير المتكلم.',
					'خطأ: أسلوب إلزام عاطفي ومخاطب مباشر.'
				],
				explanationAr: 'التركيب « Il est établi par... que » مع المبني للمجهول يقصي الذاتية ويوثق المعلومة.'
			},
			{
				questionAr:
					'Dans la phrase : « Le terme algorithme, dérivé du nom d’Al-Khwarizmi, désigne une suite ordonnée d’instructions », quels deux procédés explicatifs se combinent ?',
				options: [
					'Étymologie (origine du terme) et définition',
					'Antithèse et hyperbole',
					'Question rhétorique et illustration',
					'Concession et réfutation'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! « dérivé du nom de » يوضح الأصل الاشتقاقي (Étymologie) و « désigne » يقدم التعريف (Définition).',
					'خطأ: هاتان صورتان بلاغيتان حجاجيتان.',
					'خطأ: لا يوجد سؤال ولا مثال.',
					'خطأ: لا يوجد استدراك في الجملة.'
				],
				explanationAr: 'يجمع المقطع بين بيان أصل المصطلح (Étymologie) وتعريفه العلمي الدقيق (Définition).'
			},
			{
				questionAr:
					'Pourquoi un texte explicatif universitaire multiplie-t-il les nominalisations (ex. : « L’observation de la réfraction », « La systématisation du calcul ») ?',
				options: [
					'Pour exprimer la colère de l’auteur',
					'Pour condenser l’information et présenter les processus comme des concepts objectifs',
					'Pour imiter la langue parlée familière',
					'Pour supprimer toute ponctuation dans le paragraphe'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الاسمية أداة تجريد محايدة لا أداة انفعال.',
					'ممتاز! الاسمية تكثف المعنى وتحول الأفعال إلى مفاهيم علمية مجردة وموضوعية.',
					'خطأ: بالعكس، الاسمية من سمات الأسلوب المكتوب القياسي والراقي.',
					'خطأ: لا علاقة لها بحذف الترقيم.'
				],
				explanationAr: 'الاسمية (Nominalisation) تسمح بالإيجاز وإبراز الظاهرة العلمية دون الحاجة لذكر الفاعل.'
			},
			{
				questionAr:
					'Quelle expression marque une distanciation scientifique lorsqu’on cite une source historique ?',
				options: [
					'D’après les manuscrits conservés à Cordoue...',
					'Hélas, quel triste malheur !',
					'Je jure que cela est merveilleux !',
					'T’as vu comme c’est incroyable ?'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! العبارة « D’après les manuscrits... » تسند المعلومة لمصدرها الموثق بموضوعية.',
					'خطأ: تعجب ذاتي عاطفي.',
					'خطأ: قسم وحكم ذوقي شخصي.',
					'خطأ: أسلوب عامي شفهي مرفوض.'
				],
				explanationAr: 'نسب المعلومات إلى مصادرها (Selon..., D’après...) من أبرز علامات الصرامة المنهجية والموضوعية.'
			}
		]
	},
	{
		id: 'fre_lesson_2as_le_t1_phrase_complexe',
		slug: 'fre-2as-le-t1-phrase-complexe',
		grade: '2as_le',
		yearSubjectId: 777,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: الخطاب الموضوعي المعمّق والتقرير النقدي (Discours objectivé approfondi et compte rendu critique)',
		order: 2,
		titleAr: 'تركيب الجملة المركبة: الجمل الظرفية التابعة واختيار الصيغة (Subordonnées circonstancielles)',
		objectives: [
			'تحليل الجملة المركبة وتمييز الجمل الظرفية التابعة للسبب (Cause)، النتيجة (Conséquence)، الغاية (But)، والشرط (Condition)',
			'ضبط الصيغة الفعلية الإجبارية (Indicatif, Subjonctif, Conditionnel) حسب أداة الربط المستعملة',
			'الانتقال السلس بين الجملة التابعة (Subordonnée) والتركيب المصدري أو الاسمي (Infinitif / GN) عند وحدة الفاعل أو للإيجاز'
		],
		keywordsAr: [
			'phrase complexe',
			'subordonnées circonstancielles',
			'but',
			'cause',
			'conséquence',
			'mode verbal',
			'الجملة المركبة'
		],
		discover: {
			scenarioAr:
				'تأمل هذه الجمل المأخوذة من نص عن الطبيب الأندلسي الزهراوي: (1) « Al-Zahrawi dessina deux cents instruments chirurgicaux afin que les jeunes médecins puissent les fabriquer avec exactitude. » (2) « Il rédigea un guide si clair que toute l’Europe médicale le traduisit. » (3) « Il privilégiait la cautérisation de crainte que l’hémorragie ne s’aggrave. » قارن بين الصيغ الفعلية بعد « afin que » و « si... que » و « de crainte que ».',
			svg: svgFrenchGrammarMap({
				title: 'Subordonnées circonstancielles et choix du mode (2AS LE)',
				rootLabel: 'Syntaxe de la phrase complexe',
				rootSub: 'Chaque conjonction impose un mode précis',
				width: 580,
				branches: [
					{
						label: 'Cause',
						rule: 'parce que, puisque (+ Ind.)',
						example: 'non que (+ Subj. cause niée)'
					},
					{
						label: 'Conséquence',
						rule: 'si... que, si bien que (+ Ind.)',
						example: 'trop... pour que (+ Subj.)'
					},
					{
						label: 'But (Objectif)',
						rule: 'pour que, afin que (+ Subj.)',
						example: 'afin de + Inf. (même sujet)'
					},
					{
						label: 'Condition',
						rule: 'à condition que (+ Subj.)',
						example: 'au cas où (+ Conditionnel)'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'لماذا استعملنا « afin que + puissent (Subjonctif) » في الجملة (1)، بينما لو كان الفاعل واحداً لقلنا « afin de + infinitif »؟',
					hintAr: 'انظر إلى الفاعل الأول (Al-Zahrawi) والفاعل الثاني (les jeunes médecins).',
					expectedInput: 'لأن الفاعلين مختلفان، وجميع أدوات الغاية (pour que, afin que, de peur que) تتطلب Subjonctif',
					revealAr:
						'في التعبير عن الغاية (Le but): إذا اختلف الفاعلان نستعمل « pour que / afin que + Subjonctif »؛ وإذا تطابق الفاعلان في الجملتين وجب استعمال « pour / afin de + Infinitif »!'
				},
				{
					promptAr:
						'ما الصيغة الفعلية في الجملة (2): « si clair que toute l’Europe médicale le traduisit »؟ ولماذا ليست Subjonctif؟',
					hintAr: 'هل الترجمة وقعت فعلاً في الواقع أم هي مجرد احتمال؟',
					expectedInput: 'صيغة الإخباري (Indicatif : passé simple) لأن النتيجة محققة وواقعية',
					revealAr:
						'الجملة الظرفية للنتيجة المحققة (si bien que, de sorte que, si... que) تأخذ الإخباري (Indicatif)؛ ولا نلجأ إلى Subjonctif في النتيجة إلا مع الصيغ الافتراضية مثل « trop... pour que » و « assez... pour que » و « sans que ».'
				},
				{
					promptAr:
						'ما فائدة الحرف « ne » في « de crainte que l’hémorragie ne s’aggrave »؟ هل يعني النفي؟',
					hintAr: 'يُسمى في النحو الفرنسي « ne explétif ».',
					expectedInput: 'إنه « ne explétif » أسلوبي يرد في المستوى الراقي مع الخوف (de peur que / de crainte que) ولا يفيد النفي',
					revealAr:
						'مع « de peur que » و « de crainte que » (+ Subjonctif)، يُستعمل أحياناً « ne explétif » في اللغة الراقية للتأكيد الأسلوبي دون أي معنى للنفي.'
				}
			]
		},
		summary: {
			rulesAr: [
				'السبب (Cause): parce que, puisque, comme, étant donné que + Indicatif؛ أما السبب المنفي (Cause écartée) فيأخذ Subjonctif مع « non que / ce n’est pas que + Subjonctif, mais parce que + Indicatif ».',
				'النتيجة (Conséquence): si bien que, de sorte que, au point que, si/tellement... que + Indicatif للنتيجة المتحققة؛ و trop... pour que / assez... pour que / sans que + Subjonctif للنتيجة المرتبطة بقيد أو استحالة.',
				'الغاية (But): دائماً Subjonctif عند اختلاف الفاعلين (pour que, afin que, de peur que, de crainte que + Subjonctif)، ودائماً Infinitif عند تطابق الفاعلين (pour, afin de, dans le but de, de peur de + Infinitif).',
				'الشرط والفرضية (Condition): si + Indicatif (حسب التطابق الزمني)؛ au cas où / dans l’hypothèse où + Conditionnel؛ à condition que / pourvu que / à moins que + Subjonctif.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Tableau récapitulatif des modes dans les circonstancielles',
				subtitle: 'Règle d’or de syntaxe en 2AS Langues Étrangères',
				width: 560,
				columns: [
					{
						header: 'Indicatif',
						rule: 'Fait réel / avéré',
						examples: 'parce que, si bien que, si'
					},
					{
						header: 'Subjonctif',
						rule: 'But / Condition stricte',
						examples: 'afin que, à condition que, sans que'
					},
					{
						header: 'Conditionnel',
						rule: 'Hypothèse éventuelle',
						examples: 'au cas où, dans le cas où'
					}
				]
			}),
			visualCaptionAr: 'المرجع السريع لاختيار الصيغة الفعلية السليمة في الجمل الظرفية المركبة',
			examples: [
				{
					problemAr:
						'Reliez en exprimant le but (attention aux sujets !) : « Al-Idrisi interrogea de nombreux voyageurs. Il voulait vérifier chaque itinéraire. »',
					solutionAr:
						'Même sujet (Al-Idrisi = Il) => « Al-Idrisi interrogea de nombreux voyageurs afin de (pour) vérifier chaque itinéraire. » (On ne dit pas « afin qu’il vérifie »).'
				},
				{
					problemAr:
						'Conjuguez correctement : « Ce manuscrit est trop fragile pour que les visiteurs le (manipuler) sans gants ; on le numérise donc afin qu’il (rester) accessible. »',
					solutionAr:
						'« Ce manuscrit est trop fragile pour que les visiteurs le manipulent sans gants ; on le numérise donc afin qu’il reste accessible. » (Subjonctif présent).'
				}
			],
			watchOutAr:
				'خطأ نحوي شائع في 2AS LE: استعمال « pour que » عندما يكون فاعل الجملتين واحداً! لا تقل « L’étudiant révise pour qu’il réussisse » بل قل « L’étudiant révise pour réussir » (مصدر وجوباً عند تطابق الفاعل).'
		},
		practice: [
			{
				questionAr:
					'Complétez avec le mode convenable : « L’équipe d’historiens a numérisé les cartes d’Al-Idrisi afin que les étudiants ...... les analyser facilement. »',
				options: ['peuvent', 'puissent', 'pourront', 'pouvaient'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: « peuvent » في الإخباري، و « afin que » تفرض Subjonctif.',
					'ممتاز! الفاعلان مختلفان والرابط « afin que » يوجب Subjonctif présent (puissent).',
					'خطأ: لا يأتي المستقبل بعد « afin que ».',
					'خطأ: الماضي المستمر إخباري لا يناسب رابط الغاية.'
				],
				explanationAr: 'رابط الغاية « afin que » يتطلب دائماً تصريف الفعل في صيغة النصب (Subjonctif : puissent).'
			},
			{
				questionAr:
					'Choisissez la phrase correcte lorsque les deux actions ont exactement le même sujet :',
				options: [
					'Al-Birouni construisit un grand astrolabe afin qu’il mesure la hauteur du Soleil.',
					'Al-Birouni construisit un grand astrolabe afin de mesurer la hauteur du Soleil.',
					'Al-Birouni construisit un grand astrolabe pour que mesurer la hauteur du Soleil.',
					'Al-Birouni construisit un grand astrolabe de sorte qu’il mesurera la hauteur.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: عند تطابق الفاعل نمتنع عن « afin que » ونستعمل المصدر « afin de ».',
					'أحسنت! تطابق الفاعل (Al-Birouni) يفرض الصيغة المصدرية « afin de + infinitif ».',
					'خطأ: لا يصح تتابع « pour que + infinitif ».',
					'خطأ: تركيب غير سليم دلالياً وزمنياً.'
				],
				explanationAr: 'عند وحدة الفاعل نستخدم « pour / afin de + Infinitif » للتعبير عن الغاية.'
			},
			{
				questionAr:
					'Quel mode exige la locution conjonctive « au cas où » dans : « Les conservateurs gardent une copie numérique au cas où l’original ...... » ?',
				options: ['se détériore (indicatif)', 'se détériorerait (conditionnel)', 'se détériora (passé simple)', 'se détériorera (futur)'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: « au cas où » لا تأخذ المضارع الإخباري.',
					'صحيح! العبارة الشرطية « au cas où » تطلب وجوباً صيغة Conditionnel (se détériorerait).',
					'خطأ: الماضي البسيط لا يستعمل مع « au cas où ».',
					'خطأ: المستقبل البسيط غير صحيح مع « au cas où ».'
				],
				explanationAr: 'الرابط الشرطي « au cas où » يأخذ دائماً صيغة الشرطي (Conditionnel).'
			},
			{
				questionAr:
					'Complétez : « Ce traité médical était si méthodique que les facultés médiévales l’...... durant des siècles. »',
				options: ['étudient', 'étudièrent', 'étudiassent', 'étudieraient'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: السياق ماضٍ (« était ») وتتابع « durant des siècles » في الماضي.',
					'ممتاز! البنية « si + adj + que » تعبر عن نتيجة واقعية متحققة في الماضي فتأخذ الإخباري (Passé simple : étudièrent).',
					'خطأ: لا حاجة لصيغة Subjonctif لأن النتيجة متحققة فعلاً.',
					'خطأ: الشرطي يفيد الافتراض لا النتيجة التاريخية الثابتة.'
				],
				explanationAr: 'النتيجة المحققة بعد « si ... que » تستلزم صيغة الإخباري (Indicatif).'
			},
			{
				questionAr:
					'Identifiez la nuance et le mode exacts dans : « L’architecte rénove la coupole, non qu’elle soit menacée d’effondrement, mais parce qu’elle nécessite un enduit protecteur. »',
				options: [
					'Cause niée au subjonctif (« non qu’elle soit ») + cause réelle à l’indicatif (« parce qu’elle nécessite »)',
					'Double conséquence au conditionnel',
					'Double but à l’infinitif',
					'Condition irréelle au futur simple'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! « non que + Subjonctif » ينفي سبباً مفترضاً ثم يثبت السبب الحقيقي بـ « mais parce que + Indicatif ».',
					'خطأ: العلاقة سببية لا نتيجية.',
					'خطأ: لا يوجد غاية ولا مصدر.',
					'خطأ: ليس شرطاً.'
				],
				explanationAr: 'هذه البنية الراقية (non que + Subjonctif, mais parce que + Indicatif) من خصائص الأسلوب التحليلي في 2AS LE.'
			}
		]
	},
	{
		id: 'fre_lesson_2as_le_t1_champs_derivation',
		slug: 'fre-2as-le-t1-champs-derivation',
		grade: '2as_le',
		yearSubjectId: 777,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: الخطاب الموضوعي المعمّق والتقرير النقدي (Discours objectivé approfondi et compte rendu critique)',
		order: 3,
		titleAr: 'الحقول المعجمية والتكوين العلمي للمفردات (Champs lexicaux et dérivation savante)',
		objectives: [
			'تفكيك الكلمات العلمية والمركبة إلى عناصرها المورفولوجية: السابقة (Préfixe)، الجذر (Radical)، واللاحقة (Suffixe)',
			'تمييز التكوين بالسوابق واللواحق الاشتقاقية (Dérivation) عن التركيب العلمي من أصول إغريقية ولاتينية وعربية (Composition savante)',
			'استثمار الحقول المعجمية والشبكات الدلالية (Champs lexicaux et sémantiques) لفهم النصوص العلمية المعقدة دون الحاجة لترجمة كل كلمة'
		],
		keywordsAr: [
			'dérivation savante',
			'préfixe',
			'radical',
			'suffixe',
			'composition savante',
			'champ lexical',
			'التكوين الصرفي للمفردات'
		],
		discover: {
			scenarioAr:
				'في مقال عن تاريخ العلوم الإسلامية، تصادف كلمات علمية طويلة مثل: « hydrologie », « cartographie », « irremplaçable », « géocentrique ». كيف تستطيع فهم معناها الدقيق فوراً بتحليل عناصرها المورفولوجية؟',
			svg: svgFrenchWordFormation({
				title: 'Analyse morphologique : Dérivation (Préfixe + Radical + Suffixe)',
				prefix: 'ir-',
				root: 'remplaç',
				suffix: '-able',
				derivedWord: 'irremplaçable (qui ne peut pas être remplacé)',
				meaningNote: 'Le préfixe modifie le sens ; le suffixe indique souvent la classe grammaticale.'
			}),
			steps: [
				{
					promptAr:
						'فكّك الكلمة العلمية « hydrologie » إلى عنصرين علميين (Composition savante): ما معنى « hydro- » وما معنى « -logie »؟',
					hintAr: 'فكر في كلمات مماثلة: hydraulique, biologie, géologie.',
					expectedInput: 'hydro- (الماء) + -logie (العلم / الدراسة) => علم المياه',
					revealAr:
						'التركيب العلمي (La composition savante) يجمع عنصرين علميين مثل: hydro- (ماء)، géo- (أرض)، bio- (حياة)، chrono- (زمن)، -logie (علم)، -graphie (كتابة/رسم)، -mètre (قياس).'
				},
				{
					promptAr:
						'ما الفرق الوظيفي بين السابقة (Préfixe) واللاحقة (Suffixe) في الكلمة « irréversible » (ir- + révers + -ible)؟',
					hintAr: 'هل السابقة تغير المعنى أم الصنف النحوي؟ وماذا تغير اللاحقة؟',
					expectedInput: 'السابقة ir- تغير المعنى إلى النفي دون تغيير الصنف، واللاحقة -ible تحدد الصنف النحوي (صفة تعني القابلية)',
					revealAr:
						'قاعدة صرفية ذهبية: السابقة (Préfixe: in-, im-, ir-, dé-, ré-, anti-) تغير المعنى فقط؛ أما اللاحقة (Suffixe: -tion, -ment, -able, -al, -iser) فتحدد الصنف النحوي (اسم، صفة، فعل، ظرف).'
				},
				{
					promptAr:
						'تذكر أصل كلمات فرنسية علمية شهيرة مثل « algèbre », « algorithme », « alambic », « zénith », « chiffre ». من أي لغة انتقلت إلى الفرنسية؟',
					hintAr: 'الجبر، الخوارزمي، الإنبيق، السمت، الصفر.',
					expectedInput: 'من اللغة العربية العلمية (Emprunts scientifiques à l’arabe)',
					revealAr:
						'شهد المعجم العلمي الفرنسي اقتراضات غزيرة من التراث العلمي العربي الإسلامي (algèbre = الجبر، algorithme = الخوارزمي، chiffre = الصفر، zénith = السمت).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الاشتقاق (La dérivation): تكوين كلمات جديدة حول جذر واحد (Radical) بإضافة سابقة (Préfixe) أو لاحقة (Suffixe) أو كليهما معاً (Dérivation parasynthétique مثل: em-barqu-er, in-épuis-able).',
				'السوابق الدلالية الأكثر وروداً: النفي والضد (in-/im-/il-/ir-, dé-/dés-, mé-, a-/an-)؛ التكرار (re-/ré-)؛ التجاوز أو النقص (sur-/hyper-, sous-/hypo-)؛ التعاون والجمع (co-/com-/con-).',
				'التركيب العلمي (La composition savante): دمج عنصرين علميين؛ مثلاً: géo- (أرض) + -graphie (وصف/رسم) = géographie؛ chrono- (زمن) + -mètre (قياس) = chronomètre؛ hydro- (ماء) + -logie (علم) = hydrologie؛ micro- (صغير) + -scope (رؤية) = microscope.',
				'الفرق بين الحقل المعجمي (Champ lexical) والحقل الدلالي (Champ sémantique): الحقل المعجمي يجمع عدة كلمات مختلفة تنتمي إلى موضوع واحد (الطب: chirurgie, scalpel, soigner, patient)، أما الحقل الدلالي فيجمع المعاني المتعددة للكلمة الواحدة (Polysemie، مثل كلمة « source »: منبع ماء، أو مصدر معلومة تاريخية).'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Éléments clés de la composition savante',
				rootLabel: 'Déchiffrer le lexique scientifique',
				rootSub: 'Sens des radicaux savants fréquents',
				width: 580,
				branches: [
					{
						label: '-logie / -graphie',
						rule: 'Science / Description',
						example: 'hydrologie, cartographie'
					},
					{
						label: '-mètre / -scope',
						rule: 'Mesure / Observation',
						example: 'thermomètre, télescope'
					},
					{
						label: 'géo- / hydro-',
						rule: 'Terre / Eau',
						example: 'géométrie, hydraulique'
					},
					{
						label: 'in-/ir-/anti-',
						rule: 'Négation / Opposition',
						example: 'irréfutable, antiseptique'
					}
				]
			}),
			visualCaptionAr: 'العناصر العلمية المتكررة لفك شفرة المصطلحات في نصوص 2AS LE',
			examples: [
				{
					problemAr:
						'Décomposez « irremplaçable » et « cartographie » en précisant le procédé de formation de chacun.',
					solutionAr:
						'1) ir- (préfixe négatif) + remplaç- (radical) + -able (suffixe adjectival) : dérivation parasynthétique. | 2) carto- (carte) + -graphie (tracé, description) : composition savante.'
				},
				{
					problemAr:
						'Expliquez les deux sens (champ sémantique) du mot « source » dans : a) « L’eau jaillit de la source » ; b) « Le chercheur cite ses sources ». ',
					solutionAr:
						'a) Sens propre géographique : point d’où l’eau sort de terre. | b) Sens figuré académique : document ou référence d’où provient une information.'
				}
			],
			watchOutAr:
				'انتبه لقاعدة الإملاء مع السابقة النافية « in- »: تتحول إلى « im- » قبل الحروف (m, b, p) مثل impossible / immobile، وإلى « il- » قبل l مثل illisible، وإلى « ir- » قبل r مثل irréprochable / irréfutable!'
		},
		practice: [
			{
				questionAr:
					'Quel procédé de formation de mots explique la construction du terme « géographie » ?',
				options: [
					'La composition savante (géo- « terre » + -graphie « description »)',
					'Une simple préfixation négative',
					'Une nominalisation à base adjectivale',
					'Une onomatopée familière'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! تجمع الكلمة بين عنصرين علميين: géo- (الأرض) و -graphie (الوصف/الرسم).',
					'خطأ: لا يوجد حرف نفي هنا.',
					'خطأ: ليست مشتقة من صفة بلاحقة اسمية.',
					'خطأ: ليست محاكاة صوتية.'
				],
				explanationAr: 'الكلمة « géographie » مثال كلاسيكي للتركيب العلمي (Composition savante).'
			},
			{
				questionAr:
					'Formez correctement l’antonyme de « lisible », « régulier » et « prudent » à l’aide du préfixe négatif adapté :',
				options: [
					'inlisible / inrégulier / inprudent',
					'illisible / irrégulier / imprudent',
					'délisible / dérégulier / déprudent',
					'malisible / malrégulier / malprudent'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: السابقة in- تتغير إملائياً قبل l و r و p.',
					'أحسنت! القاعدة: il- قبل l، ir- قبل r، و im- قبل m, b, p.',
					'خطأ: السابقة dé- لا تُركب مع هذه الصفات.',
					'خطأ: صيغ غير قياسية.'
				],
				explanationAr: 'تتكيف السابقة النافية مع الحرف الأول من الجذر: illisible, irrégulier, imprudent.'
			},
			{
				questionAr:
					'Que signifie le suffixe savant « -mètre » dans « hygromètre » ou « baromètre » ?',
				options: [
					'Qui détruit ou empêche',
					'Qui mesure une grandeur',
					'Qui écrit un livre d’histoire',
					'Qui soigne une maladie'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: المنع يعبر عنه بـ anti- أو -fuge.',
					'صحيح! العنصر « -mètre » يدل دائماً على أداة القياس أو وحدة القياس.',
					'خطأ: الكتابة يعبر عنها بـ -graphie.',
					'خطأ: العلاج يعبر عنه بـ -thérapie.'
				],
				explanationAr: 'اللاحقة العلمية « -mètre » تعني القياس أو جهاز القياس (مثل thermomètre, chronomètre).'
			},
			{
				questionAr:
					'Dans la famille de mots « calculer / calcul / calculable / incalculable », quel rôle joue le suffixe « -able » ?',
				options: [
					'Il forme un verbe du premier groupe',
					'Il forme un adjectif indiquant la possibilité (qui peut être calculé)',
					'Il forme un adverbe de manière',
					'Il transforme le mot en pronom'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لاحقة أفعال الفوج الأول هي -er.',
					'ممتاز! اللاحقة -able / -ible تصوغ صفة تدل على القابلية والإمكانية.',
					'خطأ: لاحقة الظرف هي -ment.',
					'خطأ: ليست ضميراً.'
				],
				explanationAr: 'اللاحقة « -able » تنقل الكلمة إلى فئة الصفة بمعنى القابلية لتحقق الفعل.'
			},
			{
				questionAr:
					'Quelle affirmation distingue correctement le champ lexical du champ sémantique ?',
				options: [
					'Le champ lexical rassemble plusieurs mots liés à un même thème ; le champ sémantique regroupe les différents sens d’un seul mot',
					'Le champ lexical ne contient que des verbes ; le champ sémantique ne contient que des noms',
					'Ce sont deux expressions strictement synonymes sans aucune différence',
					'Le champ sémantique s’applique uniquement aux nombres'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! الحقل المعجمي = عدة كلمات لموضوع واحد؛ الحقل الدلالي = معاني الكلمة الواحدة المتعددة.',
					'خطأ: الحقل المعجمي يضم أسماء وأفعالاً وصفات.',
					'خطأ: يوجد فرق منهجي دقيق بين المفهومين في شعبة اللغات.',
					'خطأ: يشمل جميع الألفاظ متعددة المعاني.'
				],
				explanationAr: 'التمييز بين Champ lexical (ثيمة واحدة لعدة كلمات) و Champ sémantique (تعدد معاني الكلمة الواحدة) أساسي في 2AS LE.'
			}
		]
	},
	{
		id: 'fre_lesson_2as_le_t1_present_modes',
		slug: 'fre-2as-le-t1-present-modes',
		grade: '2as_le',
		yearSubjectId: 777,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: الخطاب الموضوعي المعمّق والتقرير النقدي (Discours objectivé approfondi et compte rendu critique)',
		order: 4,
		titleAr: 'مضارع الحقيقة العامة وقيمة الصيغ الفعلية (Présent de vérité générale et valeur des modes)',
		objectives: [
			'التمييز بين القيم السياقية للمضارع الإخباري (Présent de vérité générale, d’énonciation, d’habitude, de narration)',
			'تحليل القيم الدلالية للصيغ الفعلية الأربع في النص العلمي: الإخباري (Indicatif)، الشرطي (Conditionnel)، النصب (Subjonctif)، والأمر/المصدر',
			'تفسير توظيف الشرطي العلمي (Conditionnel d’hypothèse / d’information non confirmée) بدقة في النصوص التحليلية'
		],
		keywordsAr: [
			'présent de vérité générale',
			'valeurs du présent',
			'indicatif',
			'subjonctif',
			'conditionnel',
			'قيم الصيغ الفعلية'
		],
		discover: {
			scenarioAr:
				'قارن ثلاث جمل من مقال حول علم الفلك عند البيروني: (1) « La lumière solaire met environ huit minutes pour atteindre la Terre. » (2) « En 1017, Al-Birouni observe l’horizon depuis une montagne et mesure l’angle de dépression. » (3) « Selon certaines hypothèses archéologiques, cet observatoire aurait abrité des instruments en laiton. » لاحظ تنوع قيم الحاضر والشرطي!',
			svg: svgFrenchTenseTimeline({
				title: 'Valeurs du Présent et des Modes dans l’exposé scientifique',
				tenseName: 'Indicatif / Conditionnel / Subjonctif',
				formula: 'Vérité générale (toujours vrai) | Narration (passé rendu vif) | Conditionnel (hypothèse)',
				activeZone: 'present',
				example: 'L’eau bout à 100 °C (vérité générale) / Ce manuscrit daterait du Xe siècle (hypothèse).',
				markers: 'Indicatif = certitude | Subjonctif = nécessité/but | Conditionnel = réserve'
			}),
			steps: [
				{
					promptAr:
						'ما قيمة المضارع في الجملة (1): « La lumière solaire met environ huit minutes pour atteindre la Terre »؟',
					hintAr: 'هل هذه الحقيقة الفيزيائية مقيدة بيوم معين أم صالحة في كل زمان؟',
					expectedInput: 'مضارع الحقيقة العامة (Présent de vérité générale)',
					revealAr:
						'مضارع الحقيقة العامة (Présent de vérité générale / atemporel) يُصاغ به كل قانون علمي أو حقيقة جغرافية أو رياضية ثابتة.'
				},
				{
					promptAr:
						'في الجملة (2): « En 1017, Al-Birouni observe l’horizon et mesure l’angle », الزمن تاريخي ماضٍ (1017) لكن الفعلين في المضارع! ما قيمة هذا المضارع؟',
					hintAr: 'استحضر المؤرخ الحدث الماضي كأنه يقع أمام أعيننا.',
					expectedInput: 'المضارع السردي / التاريخي (Présent de narration / historique)',
					revealAr:
						'المضارع السردي أو التاريخي (Présent de narration) يُستعمل في نصوص التاريخ لتقريب الأحداث الماضية وإضفاء حيوية عليها.'
				},
				{
					promptAr:
						'لماذا استعمل الكاتب الشرطي الماضي « aurait abrité » في الجملة (3) المبدوءة بـ « Selon certaines hypothèses »؟',
					hintAr: 'هل المعلومة مؤكدة يقيناً أم مجرد فرضية قيد التمحيص؟',
					expectedInput: 'للتعبير عن فرضية أو معلومة غير مؤكدة بشكل قاطع (Conditionnel de réserve / d’hypothèse)',
					revealAr:
						'الشرطي العلمي أو الصحفي (Conditionnel d’information non confirmée / d’hypothèse) يُبرز الأمانة العلمية والحذر المنهجي للباحث.'
				}
			]
		},
		summary: {
			rulesAr: [
				'أربع قيم رئيسية للمضارع (Les valeurs du présent de l’indicatif): (1) الحقيقة العامة (Vérité générale: القوانين العلمية والحكم)؛ (2) اللحظة الراهنة (Énonciation / actuel: الآن أثناء الكلام أو التقرير)؛ (3) العادة والتكرار (Habitude: كل عام / دائماً)؛ (4) السرد التاريخي (Narration: تقريب حدث ماضٍ مسبوق بتاريخ).',
				'الإخباري (L’indicatif): صيغة الواقع واليقين والحقائق القابلة للتحقق؛ وهو الصيغة الغالبة في العرض التفسيري الموضوعي.',
				'الشرطي (Le conditionnel): يعبر في النص العلمي عن الفرضية (Hypothèse: « Sans cette pente, l’eau stagnerait ») أو المعلومة غير المؤكدة/الاحتراز العلمي (« Ce texte aurait été rédigé vers 980 »).',
				'النصب (Le subjonctif): يعبر عن الضرورة المنهجية (« Il faut que l’expérience soit reproductible »)، الغاية (« afin que la mesure reste exacte »)، أو الشرط الصارم (« à condition que les données soient vérifiées »).'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Les quatre valeurs clés du Présent de l’indicatif',
				rootLabel: 'Analyser un verbe au présent',
				rootSub: 'Toujours observer le contexte de la phrase',
				width: 580,
				branches: [
					{
						label: 'Vérité générale',
						rule: 'Loi scientifique permanente',
						example: 'L’eau gèle à zéro degré.'
					},
					{
						label: 'Narration',
						rule: 'Fait passé rendu vivant',
						example: 'En 1154, Al-Idrisi achève sa carte.'
					},
					{
						label: 'Énonciation',
						rule: 'Moment où l’on parle',
						example: 'Aujourd’hui, ce traité inspire encore.'
					},
					{
						label: 'Habitude',
						rule: 'Action répétée régulièrement',
						example: 'Chaque année, le colloque réunit...'
					}
				]
			}),
			visualCaptionAr: 'التمييز السياقي الدقيق بين القيم الأربع للمضارع الإخباري في امتحانات 2AS LE',
			examples: [
				{
					problemAr:
						'Précisez la valeur du présent dans : a) « Deux droites parallèles ne se coupent jamais. » ; b) « En 859, Fatima Al-Fihriya fonde Al-Qarawiyyin à Fès. »',
					solutionAr: 'a) Présent de vérité générale. | b) Présent de narration (historique).'
				},
				{
					problemAr:
						'Quelle est la valeur du conditionnel dans : « D’après des études récentes, cette technique hydraulique remonterait au Xe siècle » ?',
					solutionAr: 'Conditionnel d’hypothèse / d’information non confirmée (prudence scientifique).'
				}
			],
			watchOutAr:
				'في الامتحان، لا تكتب « présent » فقط عندما يُسأل عن « La valeur du temps »! اكتب دائماً « présent de vérité générale » أو « présent de narration » أو « présent d’énonciation » مع تعليل قصير من السياق.'
		},
		practice: [
			{
				questionAr:
					'Quelle est la valeur du présent dans : « En 1000, Al-Zahrawi achève son encyclopédie médicale Al-Tasrif en trente volumes » ?',
				options: [
					'Présent de vérité générale',
					'Présent de narration (historique)',
					'Présent d’habitude',
					'Présent de futur proche'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الحدث مؤرخ بسنة ماضية محددة (En 1000) وليس قانوناً كونياً.',
					'ممتاز! ذكر السنة الماضية مع فعل في المضارع يمثل المضارع السردي/التاريخي لتقريب الحدث.',
					'خطأ: تأليف الموسوعة حدث تاريخي واحد لا عادة متكررة.',
					'خطأ: السنة 1000 في الماضي لا المستقبل.'
				],
				explanationAr: 'استعمال المضارع لسرد حدث تاريخي مؤرخ في الماضي يُسمى Présent de narration.'
			},
			{
				questionAr:
					'Quelle valeur exprime le conditionnel passé dans : « Selon une hypothèse récente, cette lentille aurait servi à observer les éclipses » ?',
				options: [
					'Une certitude absolue vérifiée',
					'Un ordre adressé aux historiens',
					'Une information non confirmée / une hypothèse prudente',
					'Une habitude quotidienne actuelle'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: « Selon une hypothèse » والشرطي الماضي ينفيان اليقين القطعي.',
					'خطأ: ليس صيغة أمر.',
					'صحيح! الشرطي العلمي يعبر عن التحفظ والحذر تجاه فرضية غير مجزوم بها.',
					'خطأ: ليس عادة حاضرة.'
				],
				explanationAr: 'تستعمل صيغة Conditionnel مع عبارة « Selon une hypothèse » للتعبير عن الاحتراز العلمي.'
			},
			{
				questionAr:
					'Quel mode exprime la nécessité méthodologique dans : « Pour valider une théorie, il faut que l’expérience soit reproductible » ?',
				options: ['L’indicatif', 'Le subjonctif', 'Le conditionnel', 'L’impératif'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: « soit » ليس في الإخباري.',
					'أحسنت! بعد التركيب غير الشخصي للوجوب « il faut que » يأتي النصب (Subjonctif : soit).',
					'خطأ: الشرطي هو « serait ».',
					'خطأ: الأمر لا يأتي بعد « il faut que ».'
				],
				explanationAr: 'تعبير الضرورة « il faut que » يستلزم صيغة Subjonctif (soit).'
			},
			{
				questionAr:
					'Identifiez la phrase employant un présent de vérité générale :',
				options: [
					'En ce moment même, nous lisons un article sur Al-Khwarizmi.',
					'Chaque mardi, le club scientifique organise une conférence.',
					'Dans un milieu homogène, la lumière se propage en ligne droite.',
					'En 1154, Al-Idrisi termine sa carte du monde.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: هذا مضارع لحظة التلفظ (Présent d’énonciation).',
					'خطأ: « Chaque mardi » تدل على مضارع العادة (Présent d’habitude).',
					'ممتاز! هذا قانون فيزيائي ثابت في كل زمان ومكان (Présent de vérité générale).',
					'خطأ: هذا مضارع سردي تاريخي (Présent de narration).'
				],
				explanationAr: 'مضارع الحقيقة العامة يعبّر عن قانون علمي أو حقيقة دائمة لا ترتبط بظرف زمني خاص.'
			},
			{
				questionAr:
					'Dans un exposé scientifique, quel mode reste dominant pour énoncer les faits vérifiés et mesurés ?',
				options: ['L’impératif', 'L’indicatif', 'Le subjonctif imparfait', 'Le conditionnel passé'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الأمر يخص النص الإرشادي لا العلمي الموضوعي.',
					'صحيح! الإخباري (L’indicatif) هو صيغة الواقع واليقين العلمي القابل للتحقق.',
					'خطأ: صيغة أدبية قديمة نادرة.',
					'خطأ: الشرطي الماضي يُقتصر عليه في الفرضيات والتحفظ.'
				],
				explanationAr: 'يظل الإخباري (L’indicatif) الصيغة الأساسية في الخطاب العلمي لتقرير الوقائع المثبتة.'
			}
		]
	},
	{
		id: 'fre_lesson_2as_le_t1_cr_objectif_critique',
		slug: 'fre-2as-le-t1-cr-objectif-critique',
		grade: '2as_le',
		yearSubjectId: 777,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: الخطاب الموضوعي المعمّق والتقرير النقدي (Discours objectivé approfondi et compte rendu critique)',
		order: 5,
		titleAr: 'التقرير الموضوعي والمدخل إلى التقرير النقدي (Compte rendu objectif et introduction au compte rendu critique)',
		objectives: [
			'التمييز الهيكلي الدقيق بين التقرير الموضوعي (Compte rendu objectif) والتقرير النقدي (Compte rendu critique) الخاص بشعبة اللغات الأجنبية (LE)',
			'إتقان بناء الأجزاء الثلاثة للتقرير النقدي: المقدمة التعريفية (Accroche)، التلخيص الأمين (Résumé objectif)، ثم التعليق النقدي المعلل (Partie critique)',
			'توظيف معجم التقييم المنهجي للغة والأسلوب والوضوح والأهمية العلمية دون الوقوع في الانطباعات السطحية'
		],
		keywordsAr: [
			'compte rendu critique',
			'accroche',
			'résumé objectif',
			'partie critique',
			'évaluation argumentée',
			'التقرير النقدي'
		],
		discover: {
			scenarioAr:
				'في شعبة اللغات الأجنبية (2AS LE — وضعية إدماجية بـ 8 نقاط)، لا يقتصر المطلوب على التقرير الموضوعي فحسب، بل يتدرج التلميذ نحو التقرير النقدي (Compte rendu critique) الذي يضيف فقرة ثالثة تقيّم جودة النص مضموناً وأسلوباً ومنهجية. كيف تصوغ هذا التقييم النقدي بأسلوب أكاديمي رصين؟',
			svg: svgFrenchWritingBlueprint({
				title: 'Architecture du Compte Rendu Critique (2AS LE — 8 pts)',
				width: 580,
				steps: [
					{
						stage: '1. Accroche (Intro)',
						detail: 'Genre, titre, auteur, source, thème général et visée communicative.'
					},
					{
						stage: '2. Résumé objectif',
						detail: 'Condenser les idées clés à la 3e personne (aucun avis ici !).'
					},
					{
						stage: '3. Critique du fond',
						detail: 'Évaluer l’intérêt, la rigueur scientifique et la portée du thème.'
					},
					{
						stage: '4. Critique de la forme',
						detail: 'Juger clarté du style, procédés explicatifs, lexique et progression.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'ما الفرق الجوهري بين التقرير الموضوعي (Compte rendu objectif) والتقرير النقدي (Compte rendu critique)؟',
					hintAr: 'كم جزءاً في الأول وكم جزءاً في الثاني؟ وأين يُسمح برأي التلميذ؟',
					expectedInput: 'التقرير الموضوعي يتوقف عند المقدمة + التلخيص الحيادي؛ أما التقرير النقدي فيضيف فقرة ثالثة للتقييم المعلل للمضمون والشكل',
					revealAr:
						'يتكون التقرير النقدي من: [التقرير الموضوعي الكامل (مقدمة + تلخيص حيادي)] + [فقرة ثالثة مستقلة: التعليق النقدي المعلل (Commentaire critique)].'
				},
				{
					promptAr:
						'قارن بين تعليقين نقديين في الفقرة الثالثة: (A) « Ce texte est super bien, j’ai trop aimé. » و (B) « Sur le plan de la forme, l’auteur adopte une langue claire et rigoureuse : l’emploi de définitions précises et de données chiffrées facilite la compréhension pour un public lycéen. » أيهما أكاديمي ويستحق العلامة الكاملة؟',
					hintAr: 'التقييم النقدي يجب أن يكون معللاً بمعايير نصية ملموسة (اللغة، الوسائل التفسيرية، التدرج، أهمية الموضوع).',
					expectedInput: 'التعليق (B) لأنه تقييم أكاديمي معلل بعناصر ملموسة من النص (الوضوح، التعريفات، الأرقام)',
					revealAr:
						'في الجزء النقدي نُعلل دائماً تقييمنا بمعايير موضوعية: (1) المضمون (Le fond: أهمية الموضوع، أصالته، غناه المعرفي، أو نقطة كان يمكن توسعتها)؛ (2) الشكل (La forme: وضوح الأسلوب، تدرج الأفكار، دقة المعجم والوسائل التفسيرية).'
				},
				{
					promptAr:
						'هل يجوز إدخال الرأي الشخصي داخل فقرة التلخيص (الجزء الثاني) من التقرير النقدي؟',
					hintAr: 'تذكر قاعدة الفصل التام بين عرض أفكار الكاتب والتعليق عليها.',
					expectedInput: 'لا أبداً؛ الجزء الثاني يبقى تلخيصاً موضوعياً خالصاً، ولا يظهر التقييم إلا في الفقرة الثالثة المستقلة',
					revealAr:
						'منهجياً، يُمنع خلط التلخيص بالتعليق! نحافظ على الحياد الكامل في الجزء الثاني، ثم ننتقل إلى الفقرة الثالثة بعبارة واضحة مثل: « En guise d’appréciation critique, ce texte présente un intérêt indéniable... »'
				}
			]
		},
		summary: {
			rulesAr: [
				'الجزء 1 — المقدمة التعريفية (Accroche): نوع النص، عنوانه، كاتبه، مصدره، موضوعه العام وغايته التواصلية.',
				'الجزء 2 — الملخص الموضوعي (Résumé objectif): إعادة صياغة الأفكار الأساسية بضمير الغائب (L’auteur présente / démontre / conclut que...) في زمن المضارع وبروابط منطقية واضحة دون نسخ حرفي ودون أي حكم شخصي.',
				'الجزء 3 — التعليق النقدي المعلل (Commentaire critique — خاصية شعبة LE): فقرة مستقلة (4 إلى 6 أسطر) تقيم النص على مستويين: (أ) المضمون (Le fond: قيمة الموضوع المعرفية والتاريخية، دقة الأمثلة، أو جانب يمكن إثراؤه بمثال إضافي أو خريطة)؛ (ب) الشكل والأسلوب (La forme: وضوح اللغة، تماسك الروابط، تنوع الوسائل التفسيرية كالتعريف والأرقام، ملاءمة النص للتلاميذ).',
				'عبارات أكاديمية للجزء النقدي: « D’un point de vue critique, cet article mérite d’être salué pour... », « Sur le plan du fond... », « Quant à la forme, le style clair et accessible... », « Toutefois, on aurait apprécié l’ajout d’un schéma explicatif pour... ».'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Grille du Commentaire Critique (Fond & Forme)',
				rootLabel: 'Évaluer avec nuance et rigueur',
				rootSub: 'Jamais d’avis gratuit : toujours justifier',
				width: 580,
				branches: [
					{
						label: 'Intérêt du fond',
						rule: 'Pertinence, richesse, actualité',
						example: 'Thème instructif et bien documenté.'
					},
					{
						label: 'Clarté de la forme',
						rule: 'Style, lexique, progression',
						example: 'Langue précise et plan rigoureux.'
					},
					{
						label: 'Procédés efficaces',
						rule: 'Définitions, chiffres, exemples',
						example: 'Les reformulations aident le lecteur.'
					},
					{
						label: 'Nuance constructive',
						rule: 'Limite légère ou suggestion',
						example: 'Un croquis aurait éclairé le dispositif.'
					}
				]
			}),
			visualCaptionAr: 'المحاور الأربعة لبناء فقرة نقدية راقية ومتوازنة في شعبة اللغات الأجنبية',
			examples: [
				{
					problemAr:
						'Rédigez un bref commentaire critique (4 lignes) sur un texte explicatif consacré à Al-Khwarizmi.',
					solutionAr:
						'Sur le plan critique, cet article présente un grand intérêt culturel et scientifique en rappelant l’héritage fondateur d’Al-Khwarizmi. Sur le plan de la forme, le style demeure limpide, objectif et bien structuré grâce aux définitions et aux repères historiques. Toutefois, l’ajout d’un bref exemple d’algorithme concret aurait encore renforcé la portée pédagogique du texte.'
				},
				{
					problemAr:
						'Corrigez ce commentaire trop familier : « Moi je trouve que l’auteur écrit super bien et son texte est cool. »',
					solutionAr:
						'Formulation académique : « L’auteur maîtrise une écriture fluide et précise qui rend accessible un sujet scientifique exigeant. »'
				}
			],
			watchOutAr:
				'كلمة « Critique » في الفرنسية الأكاديمية لا تعني « الهدم أو الذم »! بل تعني « التقييم المتوازن والمعلل » (إبراز نقاط القوة في المضمون والشكل مع إمكانية إضافة ملاحظة بناءة لطيفة إن وُجدت).'
		},
		practice: [
			{
				questionAr:
					'Quelles sont les trois parties obligatoires d’un compte rendu critique en 2AS Langues Étrangères ?',
				options: [
					'Titre, dialogue imaginaire et liste de vocabulaire',
					'Accroche paratextuelle, résumé objectif des idées clés, puis commentaire critique argumenté (fond et forme)',
					'Opinion personnelle dès la première ligne, copie intégrale du texte, et traduction',
					'Introduction, trois poèmes et bibliographie'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا يتضمن التقرير النقدي حواراً خيالياً ولا قائمة مفردات.',
					'ممتاز! الثلاثية الذهبية هي: مقدمة تعريفية + تلخيص موضوعي حيادي + تعليق نقدي معلل للمضمون والشكل.',
					'خطأ: يمنع إقحام الرأي في المقدمة أو نسخ النص.',
					'خطأ: بعيد تماماً عن منهجية التقرير النقدي.'
				],
				explanationAr: 'يبنى التقرير النقدي في 2AS LE على ثلاث فقرات مميزة: Accroche + Résumé objectif + Partie critique.'
			},
			{
				questionAr:
					'Dans un compte rendu critique, que signifie l’adjectif « critique » ?',
				options: [
					'Attaquer violemment l’auteur et rejeter toutes ses idées',
					'Porter une appréciation nuancée et justifiée sur l’intérêt du fond et les qualités de la forme',
					'Recopier uniquement les défauts d’orthographe',
					'Supprimer le résumé du texte'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: النقد الأكاديمي ليس هجوماً بل تقييم موضوعي متوازن.',
					'صحيح! النقد المنهجي يبرز القيمة الفكرية وجودة الأسلوب مع تعليل دقيق وملاحظة بناءة محتملة.',
					'خطأ: النصوص المختارة في الامتحان سليمة إملائياً.',
					'خطأ: التلخيص الحيادي يظل عمود التقرير.'
				],
				explanationAr: 'التعليق النقدي (Appréciation critique) حكم قيمي متزن ومعقول يرتكز على المضمون والشكل.'
			},
			{
				questionAr:
					'Où doit apparaître l’appréciation personnelle et argumentée de l’élève dans un compte rendu critique ?',
				options: [
					'Mélangée à chaque phrase du résumé objectif',
					'Dans la troisième partie distincte, après avoir fidèlement résumé le texte',
					'Dans l’accroche, avant même de citer le titre du texte',
					'Nulle part, le compte rendu critique interdit tout jugement'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: خلط التلخيص بالرأي خطأ منهجي شائع يخفض العلامة.',
					'أحسنت! نحترم الفصل التام: أولاً نلخص بأمانة وحياد، ثم نُقيم في الفقرة الثالثة المستقلة.',
					'خطأ: المقدمة للتعريف الموضوعي بالبطاقة الفنية للنص.',
					'خطأ: ذلك ينطبق على التقرير الموضوعي فقط، أما النقدي فيشترط الفقرة الثالثة.'
				],
				explanationAr: 'الفصل الواضح بين الملخص الحيادي والتعليق النقدي في فقرة ثالثة شرط أساسي في 2AS LE.'
			},
			{
				questionAr:
					'Laquelle de ces phrases relève d’une critique pertinente sur le plan de la forme ?',
				options: [
					'Ce texte est trop court donc je ne l’aime pas.',
					'La progression logique rigoureuse, appuyée par des définitions et des connecteurs clairs, rend la démonstration particulièrement accessible.',
					'L’auteur a vécu au XIIe siècle à Cordoue.',
					'La chirurgie est une branche de la médecine.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: حكم انطباعي سطحي غير معلل.',
					'ممتاز! تحلل التدرج المنطقي والتعريفات والروابط وأثرها في الوضوح.',
					'خطأ: معلومة تاريخية من المضمون لا نقد للشكل.',
					'خطأ: مجرد تعريف عام خارج التقييم الشكلي.'
				],
				explanationAr: 'نقد الشكل (Critique de la forme) يتناول وضوح اللغة، البنية، الروابط، والوسائل التفسيرية.'
			},
			{
				questionAr:
					'Quelle nuance constructive peut enrichir avec élégance la fin du commentaire critique d’un texte scientifique ?',
				options: [
					'Toutefois, l’insertion d’un schéma illustré ou d’un exemple contemporain aurait encore accru la portée didactique de l’article.',
					'En fait, cet article ne sert absolument à rien.',
					'Je n’ai rien compris parce que c’est difficile.',
					'J’aurais préféré un texte sur le football.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! ملاحظة بناءة مهذبة ومعللة ترفع مستوى الفقرة النقدية إلى الامتياز.',
					'خطأ: حكم متسرع وغير موضوعي.',
					'خطأ: لا يعبر عن تحليل منهجي.',
					'خطأ: خارج تماماً عن الموضوع.'
				],
				explanationAr: 'إبداء ملاحظة بناءة ومهذبة (Nuance constructive) يدل على نضج القراءة النقدية لدى تلميذ اللغات الأجنبية.'
			}
		]
	}
];
