import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchWritingBlueprint
} from '../../svg-french';

// ============================================================================
// 5 Interactive Lessons — 1AS TCST Trimester 2
// Projet 2 : L'interview scientifique et la lettre ouverte argumentée
// ============================================================================

export const LESSONS_1AS_TCST_T2: FrenchInteractiveLessonData[] = [
	// 1. Les indices d'énonciation (je/nous/vous) et les modalisateurs
	{
		id: 'fre_lesson_1as_tcst_t2_enonciation_modalisateurs',
		slug: 'fre-1as-tcst-t2-enonciation-modalisateurs',
		grade: '1as_tcst',
		yearSubjectId: 657,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع 2: المقابلة العلمية والرسالة المفتوحة الحجاجية (L’interview et la lettre ouverte)',
		order: 1,
		titleAr: 'مؤشرات التلفظ والذاتية (Les indices d’énonciation et les modalisateurs)',
		objectives: [
			'تحديد مؤشرات المرسل (je, nous, mon, notre) ومؤشرات المرسل إليه (vous, votre) في المقابلة والرسالة المفتوحة',
			'التعرف على أدوات التوجيه الذاتي (les modalisateurs): أفعال الرأي، الظروف، والصفات التقييمية',
			'التمييز بين حضور الكاتب الصريح وحضوره الضمني داخل الخطاب الحجاجي'
		],
		keywordsAr: [
			'Indices d’énonciation',
			'Énonciateur',
			'Destinataire',
			'Modalisateurs',
			'Subjectivité'
		],
		discover: {
			scenarioAr:
				'في رسالة مفتوحة إلى مدير ثانوية حول نظافة الساحة، كتب ممثلو تلاميذ الأولى ثانوي: « Monsieur le Proviseur, nous nous permettons de vous écrire aujourd’hui car nous constatons avec regret que les corbeilles manquent dans notre cour. Il est indispensable d’installer des bacs de tri. Certainement, cette mesure utile améliorera le cadre scolaire. » لاحظ حضور الكاتب ومخاطبة المسؤول.',
			svg: svgFrenchGrammarMap({
				title: 'Présence de l’auteur dans la lettre ouverte',
				rootLabel: 'Situation d’énonciation + Subjectivité',
				rootSub: 'Qui parle ? À qui ? Avec quel jugement ?',
				branches: [
					{
						label: 'Émetteur (Locuteur)',
						rule: 'je, me, mon / nous, notre',
						example: 'Nous constatons, notre lycée'
					},
					{
						label: 'Récepteur (Destinataire)',
						rule: 'vous, votre, vos',
						example: 'Vous écrire, votre attention'
					},
					{
						label: 'Modalisateurs',
						rule: 'Verbes, adverbes, adjectifs',
						example: 'indispensable, certainement'
					}
				]
			}),
			steps: [
				{
					promptAr: 'من هو المرسل (l’émetteur) ومن هو المرسل إليه (le destinataire) في الفقرة؟ وما الضمائر الدالة عليهما؟',
					hintAr: 'انظر إلى الضمائر « nous / notre » و« vous ».',
					expectedInput: 'المرسل: التلاميذ (nous, notre) — المرسل إليه: مدير الثانوية (vous)',
					revealAr: 'المرسل هم التلاميذ وتدل عليهم الضمائر « nous / notre »، والمرسل إليه هو المدير ويدل عليه ضمير الاحترام « vous » وعبارة « Monsieur le Proviseur ».'
				},
				{
					promptAr: 'استخرج كلمتين تعبّران عن موقف التلاميذ الشخصي ويقينهم (modalisateurs).',
					hintAr: 'ابحث عن صفة تقييمية وظرف يدل على اليقين.',
					expectedInput: 'indispensable / certainement / utile / avec regret',
					revealAr: 'الكلمات « avec regret » و« indispensable » و« certainement » و« utile » كلها أدوات تقييم وذاتية (modalisateurs).'
				},
				{
					promptAr: 'ما الفرق بين حضور الكاتب في نص التبسيط العلمي (الفصل 1) وحضوره في الرسالة المفتوحة (الفصل 2)؟',
					hintAr: 'تذكّر درس الموضوعية وغياب الكاتب.',
					expectedInput: 'يغيب في النص العلمي (موضوعي)، ويحضر بقوة في الرسالة المفتوحة (ذاتي وحجاجي)',
					revealAr: 'في النص العلمي يتوارى الكاتب لتحقيق الموضوعية، أما في الرسالة المفتوحة فيحضر بوضوح بضمائر المتكلم والموداليزاتورات للدفاع عن موقفه وإقناع المسؤول.'
				}
			]
		},
		summary: {
			rulesAr: [
				'مؤشرات التلفظ (Les indices d’énonciation) تحدد: المرسل (je, moi, nous, mon, notre)، المرسل إليه (vous, votre, vos)، وزمان ومكان الخطاب (ici, aujourd’hui, dans notre établissement).',
				'أدوات التوجيه والذاتية (Les modalisateurs) تعبّر عن درجة يقين الكاتب أو مشاعره أو حكمه التقييمي، وتشمل:',
				'1) أفعال الرأي والوجوب: penser, croire, estimer, falloir, devoir, sembler. 2) ظروف اليقين أو الشك أو الشعور: certainement, heureusement, malheureusement, sans doute, probablement.',
				'3) الصفات والأسماء التقييمية (lexique mélioratif / péjoratif): indispensable, bénéfique, nuisible, grave, danger, progrès. 4) صيغة الشرط (le conditionnel) للتخفيف أو التأدب: nous souhaiterions, il faudrait.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Familles de modalisateurs',
				subtitle: 'Exprimer son degré de certitude ou son jugement',
				columns: [
					{
						header: 'Certitude / Doute',
						rule: 'Adverbes et verbes',
						examples: 'certainement, peut-être'
					},
					{
						header: 'Jugement / Valeur',
						rule: 'Adjectifs évaluatifs',
						examples: 'utile, grave, essentiel'
					},
					{
						header: 'Obligation / Souhait',
						rule: 'Verbes + conditionnel',
						examples: 'il faut, nous souhaiterions'
					}
				]
			}),
			visualCaptionAr: 'تصنيف أدوات التوجيه والذاتية (Les modalisateurs) في الخطاب الحجاجي',
			examples: [
				{
					problemAr: 'استخرج الموداليزاتور وحدّد قيمته في: « Il est évident que le tri des déchets protège la nappe phréatique. »',
					solutionAr: '« Il est évident que » -> موداليزاتور يدل على اليقين التام (la certitude).'
				},
				{
					problemAr: 'حدّد دلالة الضمير « vous » في مقابلة علمية: « Docteur, pouvez-vous nous expliquer les causes de l’anémie ? »',
					solutionAr: '« vous » هو ضمير المخاطب للاحترام (vouvoiement) ويعود على الطبيب المُستَجوَب، بينما « nous » يعود على الصحفي والقرّاء.'
				}
			],
			watchOutAr:
				'في المقابلة والرسالة المفتوحة، يُستعمل الضمير « vous » للمفرد في سياق الاحترام (Monsieur le Maire, vous pouvez...) فلا تظنّه دائما جمعا، بل تحقق من المرسل إليه في الترويسة!'
		},
		practice: [
			{
				questionAr: 'في الجملة: « Malheureusement, le gaspillage de l’eau augmente chaque été. » ما وظيفة الكلمة « Malheureusement »؟',
				options: [
					'Un connecteur chronologique',
					'Un modalisateur exprimant le regret',
					'Un substitut grammatical',
					'Un procédé de définition'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا ترتب الكلمة أحداثا زمنية.',
					'أحسنت! « Malheureusement » ظرف ذاتي (modalisateur) يعبّر عن أسف الكاتب.',
					'ليست ضميرا تعويضيا.',
					'لا تعرّف مصطلحا علميا.'
				],
				explanationAr: 'الظروف مثل « malheureusement / heureusement » من أبرز أدوات الذاتية (modalisateurs).'
			},
			{
				questionAr: 'أي جملة تتضمّن صيغة تأدّب (conditionnel de politesse) مناسبة للرسالة المفتوحة؟',
				options: [
					'Vous devez installer des arbres demain.',
					'Nous souhaiterions aménager un espace vert au lycée.',
					'Les arbres produisent de l’oxygène.',
					'Installez des poubelles immédiatement.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'أسلوب إلزام مباشر خالٍ من صيغة التأدب الشرطية.',
					'ممتاز! « Nous souhaiterions » (في Conditionnel présent) صيغة طلب مهذبة.',
					'جملة علمية موضوعية في المضارع العام.',
					'أسلوب أمر فظ لا يليق بمراسلة مسؤول.'
				],
				explanationAr: 'الشرط الحاضر (nous souhaiterions / pourriez-vous) يعبّر عن التأدب والالتماس في الرسائل الرسمية.'
			},
			{
				questionAr: 'في رسالة مفتوحة كتبها تلاميذ لمدير البلدية، على من يعود الضمير « notre » في « notre quartier »؟',
				options: [
					'Les élèves signataires de la lettre (المرسلون)',
					'Le journaliste absent',
					'Les touristes étrangers',
					'Un personnage imaginaire'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! صفة الملكية « notre » من مؤشرات المرسل (التلاميذ السكان).',
					'لا يوجد صحفي في هذه الرسالة.',
					'لا يعود على السياح.',
					'الرسالة المفتوحة نص واقعي موجه لمسؤول حقيقي.'
				],
				explanationAr: 'صفات الملكية « notre / nos » تحيل على المرسل الجمع.'
			},
			{
				questionAr: 'أي كلمة من القائمة التالية تُعدّ موداليزاتور يدل على الشك أو الاحتمال (le doute / la probabilité)؟',
				options: ['certainement', 'probablement', 'indubitablement', 'absolument'],
				correctIndex: 1,
				diagnosticFeedback: [
					'« certainement » يدل على اليقين.',
					'أحسنت! « probablement » (على الأرجح / محتملا) يعبّر عن الاحتمال وليس اليقين المطلق.',
					'« indubitablement » يدل على اليقين التام.',
					'« absolument » يدل على التأكيد القاطع.'
				],
				explanationAr: '« probablement, peut-être, sans doute » من موداليزاتورات الاحتمال.'
			},
			{
				questionAr: 'ما دلالة الضمائر « je / nous / vous » عندما تظهر بكثرة في نص ما؟',
				options: [
					'L’effacement total de l’énonciateur',
					'L’implication directe de l’énonciateur et du destinataire',
					'L’absence de toute argumentation',
					'Un texte purement descriptif sans opinion'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'بالعكس، ظهور هذه الضمائر ينفي غياب الكاتب.',
					'إجابة موفقة! حضورها يثبت التفاعل المباشر بين المرسل والمرسل إليه.',
					'كثرتها شائعة جدا في الخطاب الحجاجي كالرسالة المفتوحة.',
					'ليست خاصة بالوصف المحايد.'
				],
				explanationAr: 'تدل ضمائر المتكلم والمخاطب على انخراط الكاتب ومخاطبته المباشرة للقارئ.'
			}
		]
	},

	// 2. Les rapports logiques de cause, conséquence et but
	{
		id: 'fre_lesson_1as_tcst_t2_cause_consequence_but',
		slug: 'fre-1as-tcst-t2-cause-consequence-but',
		grade: '1as_tcst',
		yearSubjectId: 657,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع 2: المقابلة العلمية والرسالة المفتوحة الحجاجية (L’interview et la lettre ouverte)',
		order: 2,
		titleAr: 'الروابط المنطقية: السبب والنتيجة والغاية (La cause, la conséquence et le but)',
		objectives: [
			'التمييز الدقيق بين علاقات السبب (la cause) والنتيجة (la conséquence) والغاية (le but) في الجملة البسيطة والمركبة',
			'اختيار صيغة الفعل المناسبة بعد كل رابط: الإخباري (indicatif)، المنصوب (subjonctif)، أو المصدر (infinitif)',
			'إعادة صياغة الجمل بالانتقال السليم من السبب إلى النتيجة أو من الغاية بالمصدر إلى الغاية بالمنصوب'
		],
		keywordsAr: ['Cause', 'Conséquence', 'But', 'Subjonctif', 'Connecteurs logiques'],
		discover: {
			scenarioAr:
				'في حوار حول التغذية السليمة في المدرسة، صرّح الطبيب: « Certains élèves souffrent de fatigue parce qu’ils sautent le petit-déjeuner. Par conséquent, leur concentration baisse en classe. Il faut donc sensibiliser les familles afin que les jeunes adoptent une alimentation équilibrée et pour préserver leur santé. » لاحظ الترابط المنطقي بين الجمل الثلاث.',
			svg: svgFrenchGrammarMap({
				title: 'Les trois rapports logiques clés (1AS TCST)',
				rootLabel: 'Relier les arguments avec précision',
				rootSub: 'Attention au mode verbal après chaque lien !',
				branches: [
					{
						label: 'Cause (Pourquoi ?)',
						rule: 'parce que / car / grâce à',
						example: 'car il mange équilibré.'
					},
					{
						label: 'Conséquence (Effet)',
						rule: 'donc / par conséquent / si bien que',
						example: 'donc sa santé s’améliore.'
					},
					{
						label: 'But (Objectif)',
						rule: 'pour + inf. / afin que + subj.',
						example: 'afin qu’il réussisse.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما العلاقة المنطقية في الجملة الأولى « parce qu’ils sautent le petit-déjeuner »؟ وما صيغة الفعل بعدها؟',
					hintAr: 'الجملة تجيب عن سؤال: لماذا يعانون من التعب؟',
					expectedInput: 'السبب (La cause) مع صيغة المضارع الإخباري (Indicatif)',
					revealAr: '« parce que » يعبّر عن السبب ويتبعه دائما الفعل في الصيغة الإخبارية (l’indicatif).'
				},
				{
					promptAr: 'ما الفرق في الاستعمال بين « grâce à » و« à cause de » في التعبير عن السبب؟',
					hintAr: 'أحدهما للسبب الإيجابي والآخر للسبب السلبي، وكلاهما يتبعه اسم.',
					expectedInput: 'grâce à لسبب إيجابي / à cause de لسبب سلبي (+ اسم)',
					revealAr: 'نستعمل « grâce à + nom » لسبب إيجابي (grâce au reboisement)، و« à cause de + nom » لسبب سلبي (à cause de la pollution).'
				},
				{
					promptAr: 'لماذا استعمل الطبيب « afin que les jeunes adoptent » (مع فاعلين مختلفين) ثم « pour préserver » (بالمصدر)؟',
					hintAr: 'قارن الفاعل في الجزء الأول والجزء الثاني.',
					expectedInput: 'afin que + subjonctif عند اختلاف الفاعلين / pour + infinitif عند اتحاد الفاعل أو العموم',
					revealAr: 'في الغاية: نستعمل « pour / afin de + infinitif » إذا كان الفاعل واحدا، ونستعمل « pour que / afin que + subjonctif » إذا اختلف الفاعلان.'
				}
			]
		},
		summary: {
			rulesAr: [
				'السبب (La cause): في الجملة المركبة نستعمل (parce que, puisque, comme + indicatif) أو رابط العطف (car). وفي الجملة البسيطة نستعمل (grâce à [إيجابي] / à cause de [سلبي] / en raison de + nom).',
				'النتيجة (La conséquence): نستعمل (donc, par conséquent, c’est pourquoi, alors, ainsi) أو (si bien que, de sorte que + indicatif) أو التركيب (tellement / si ... que).',
				'الغاية (Le but): إذا كان الفاعل نفسه نستعمل (pour, afin de, dans le but de, de peur de + infinitif). وإذا اختلف الفاعلان نستعمل (pour que, afin que, de crainte que + subjonctif).',
				'تذكير مهم بالمنصوب (Le subjonctif présent): غالبا ما يشبه المضارع مع أنفسنا في المفرد للمجموعة الأولى (qu’il protège, qu’ils adoptent)، واحفظ الأفعال الشاذة الأساسية: être (soit/soient), avoir (ait/aient), faire (fasse/fassent), pouvoir (puisse/puissent), aller (aille/aillent).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Mode verbal selon le connecteur',
				subtitle: 'Indicatif, Infinitif ou Subjonctif ?',
				columns: [
					{
						header: '+ Indicatif',
						rule: 'Cause & Conséquence',
						examples: 'parce que, puisque, si bien que'
					},
					{
						header: '+ Infinitif',
						rule: 'But (même sujet)',
						examples: 'pour, afin de, de peur de'
					},
					{
						header: '+ Subjonctif',
						rule: 'But (2 sujets différents)',
						examples: 'afin que, pour que + soit/fasse'
					}
				]
			}),
			visualCaptionAr: 'القاعدة الذهبية لضبط صيغة الفعل بعد روابط السبب والنتيجة والغاية',
			examples: [
				{
					problemAr: 'حوّل جملة السبب إلى جملة نتيجة: « La forêt recule parce que les incendies détruisent les arbres. »',
					solutionAr: 'Les incendies détruisent les arbres, par conséquent (donc) la forêt recule.'
				},
				{
					problemAr: 'أكمل بالصيغة الصحيحة: « Nous plantons des arbres afin que la cour du lycée (être) plus fraîche. »',
					solutionAr: 'Nous plantons des arbres afin que la cour du lycée soit plus fraîche.'
				}
			],
			watchOutAr:
				'انتبه لعدم استعمال « pour que » مع نفس الفاعل! خطأ أن تقول « Je révise pour que je réussisse » والصحيح: « Je révise pour réussir » (مصدر).'
		},
		practice: [
			{
				questionAr: 'اختر الرابط الصحيح: « .......... la campagne de vaccination, cette maladie a presque disparu. »',
				options: ['À cause de', 'Grâce à', 'Parce que', 'Afin que'],
				correctIndex: 1,
				diagnosticFeedback: [
					'« À cause de » يستعمل للسبب السلبي، واختفاء المرض نتيجة إيجابية.',
					'أحسنت! « Grâce à + nom » يعبر عن سبب إيجابي.',
					'« Parce que » يحتاج جملة فعلية كاملة بعده لا اسما فقط.',
					'« Afin que » للغاية ويتبعه فعل في المنصوب.'
				],
				explanationAr: 'السبب الإيجابي المتبوع باسم يأخذ « Grâce à ».'
			},
			{
				questionAr: 'أكمل بالفعل المناسب في الصيغة الصحيحة: « Les enseignants organisent un atelier afin que les élèves .......... mieux trier les déchets. » (savoir)',
				options: ['savent', 'sachent', 'sauront', 'savaient'],
				correctIndex: 1,
				diagnosticFeedback: [
					'« savent » في المضارع الإخباري، وبعد afin que يجب استعمال المنصوب.',
					'ممتاز! « sachent » هو تصريف savoir في subjonctif présent مع ils.',
					'لا نستعمل المستقبل بعد afin que.',
					'لا نستعمل الماضي الناقص بعد afin que.'
				],
				explanationAr: 'الرابط « afin que » يوجب صيغة المنصوب: qu’ils sachent.'
			},
			{
				questionAr: 'ما العلاقة المنطقية التي يعبّر عنها الرابط « par conséquent » في: « Les sols sont secs ; par conséquent, les récoltes diminuent. »؟',
				options: ['La cause', 'La conséquence', 'Le but', 'L’opposition'],
				correctIndex: 1,
				diagnosticFeedback: [
					'السبب هو جفاف التربة وليس نقص المحاصيل.',
					'صحيح! « par conséquent » (وبالتالي / نتيجة لذلك) يقدّم النتيجة.',
					'لا يوجد هدف مقصود هنا.',
					'لا يوجد تعارض بين الفكرتين بل تلازم سببي.'
				],
				explanationAr: '« par conséquent, donc, c’est pourquoi » روابط دالة على النتيجة.'
			},
			{
				questionAr: 'اختر الجملة السليمة للتعبير عن الغاية مع اتحاد الفاعل:',
				options: [
					'Amine économise l’eau afin qu’il protège la nature.',
					'Amine économise l’eau afin de protéger la nature.',
					'Amine économise l’eau parce que protéger la nature.',
					'Amine économise l’eau donc protéger la nature.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'مع نفس الفاعل (Amine) لا نكرر الفاعل مع afin que بل نستعمل المصدر.',
					'أحسنت! عند اتحاد الفاعل نستخدم « afin de / pour + infinitif ».',
					'« parce que » لا يتبعه مصدر.',
					'« donc » لا يتبعه مصدر.'
				],
				explanationAr: 'مع فاعل واحد نكتب دائما: afin de / pour + verbe à l’infinitif.'
			},
			{
				questionAr: 'أعد التعبير عن الجملة باستعمال « c’est pourquoi »: « Nous fermons bien les robinets car l’eau potable est précieuse. »',
				options: [
					'Nous fermons bien les robinets, c’est pourquoi l’eau potable est précieuse.',
					'L’eau potable est précieuse, c’est pourquoi nous fermons bien les robinets.',
					'C’est pourquoi l’eau potable est précieuse, nous fermons les robinets.',
					'L’eau potable est précieuse car c’est pourquoi nous fermons les robinets.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'عكست السبب والنتيجة فاختل المعنى المنطقي.',
					'ممتاز! السبب أولا (الماء ثمين) ثم « c’est pourquoi » ثم النتيجة (نغلق الحنفيات جيدا).',
					'لا نبدأ الجملة بـ c’est pourquoi قبل ذكر السبب.',
					'لا نجمع بين رابط السبب car ورابط النتيجة c’est pourquoi معا.'
				],
				explanationAr: 'عند التحويل من السبب إلى النتيجة نضع السبب أولا ثم رابط النتيجة ثم الأثر المترتب.'
			}
		]
	},

	// 3. Les types d'interrogation et le discours rapporté dans l'interview
	{
		id: 'fre_lesson_1as_tcst_t2_interrogation_discours_rapporte',
		slug: 'fre-1as-tcst-t2-interrogation-discours-rapporte',
		grade: '1as_tcst',
		yearSubjectId: 657,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع 2: المقابلة العلمية والرسالة المفتوحة الحجاجية (L’interview et la lettre ouverte)',
		order: 3,
		titleAr: 'أنواع الاستفهام والكلام المنقول في المقابلة العلمية (L’interrogation et le discours rapporté)',
		objectives: [
			'التمييز بين الاستفهام الكلي (interrogation totale -> oui/non) والجزئي (interrogation partielle -> comment, pourquoi, quel...)',
			'صياغة السؤال بمستويات اللغة الثلاثة خاصة الأسلوب الرسمي بقلب الفاعل والفعل (inversion du sujet)',
			'تحويل أقوال الخبير من الكلام المباشر إلى الكلام غير المباشر (discours direct -> indirect) في المضارع والماضي'
		],
		keywordsAr: [
			'Interrogation totale',
			'Interrogation partielle',
			'Inversion du sujet',
			'Discours direct',
			'Discours indirect'
		],
		discover: {
			scenarioAr:
				'في مقابلة أجراها نادي العلوم مع مهندس طاقة: سأله الصحفي: « Est-ce que le Sahara algérien offre un fort potentiel solaire ? Comment fonctionne une station hybride ? » فأجاب المهندس: « Oui, notre ensoleillement dépasse 3000 heures par an. » وعند كتابة التقرير الصحفي، نقل الصحفي كلامه قائلا: « Le journaliste demande si le Sahara offre un fort potentiel solaire. L’ingénieur affirme que notre ensoleillement dépasse 3000 heures par an. »',
			svg: svgFrenchGrammarMap({
				title: 'Poser des questions et rapporter des propos',
				rootLabel: 'L’interview scientifique (Journaliste <-> Expert)',
				rootSub: 'Interrogation + Discours rapporté',
				branches: [
					{
						label: 'Interrogation totale',
						rule: 'Réponse par Oui ou Non',
						example: 'Est-ce que... ? -> si'
					},
					{
						label: 'Interrogation partielle',
						rule: 'Mot interrogatif précis',
						example: 'Comment... ? -> comment'
					},
					{
						label: 'Discours indirect',
						rule: 'Supprimer : « » et ?',
						example: 'Il déclare que... / si...'
					}
				]
			}),
			steps: [
				{
					promptAr: 'قارن بين السؤال الأول « Est-ce que le Sahara offre... ? » والسؤال الثاني « Comment fonctionne... ? ». أيهما استفهام كلي وأيهما جزئي؟',
					hintAr: 'انظر لأي سؤال نجيب بـ Oui / Non.',
					expectedInput: 'الأول كلي (totale) والثاني جزئي (partielle)',
					revealAr: 'السؤال الذي يُجاب عنه بـ Oui أو Non استفهام كلي (totale)، أما السؤال المبدوء بأداة (Comment, Pourquoi, Où, Quand, Que) فاستفهام جزئي (partielle).'
				},
				{
					promptAr: 'كيف تحوّل السؤال الكلي « Est-ce que ce projet est rentable ? » إلى الكلام غير المباشر بعد « Le journaliste demande... »؟',
					hintAr: 'نحذف Est-ce que ونستبدلها بالرابط الشرطي الاستفهامي si.',
					expectedInput: 'Le journaliste demande si ce projet est rentable.',
					revealAr: 'في الكلام غير المباشر، يتحول الاستفهام الكلي إلى « si + فاعل + فعل » ونحذف علامة الاستفهام والمزدوجتين.'
				},
				{
					promptAr: 'ماذا يحدث لأداة السؤال « Que / Qu’est-ce que » عند التحويل إلى الكلام غير المباشر؟',
					hintAr: 'مثال: Il demande : « Que faites-vous ? »',
					expectedInput: 'تتحول إلى ce que (Il demande ce que vous faites)',
					revealAr: 'تتحول « Que / Qu’est-ce que » إلى « ce que »، وتتحول « Qu’est-ce qui » إلى « ce qui »، أما بقية الأدوات (où, quand, comment, pourquoi) فتبقى كما هي!'
				}
			]
		},
		summary: {
			rulesAr: [
				'الاستفهام الكلي (Interrogation totale): يجاب عنه بـ oui / non، ويُصاغ بثلاث طرق: النبرة (familier: Vous travaillez ici ?)، أو Est-ce que (courant)، أو قلب الفاعل والفعل (soutenu: Travaillez-vous ici ? — وهو المفضّل في المقابلات الرسمية).',
				'الاستفهام الجزئي (Interrogation partielle): يستعمل أداة استفهام (Où, Quand, Comment, Pourquoi, Combien, Quel, Que) ويُجاب عنه بمعلومة محددة.',
				'التحويل إلى الكلام غير المباشر (Discours indirect): نحذف النقطتين والمزدوجتين وعلامة الاستفهام ونستعمل رابطا مناسبا:',
				'جملة إخبارية -> que | جملة أمرية -> de + infinitif | استفهام كلي -> si | استفهام جزئي -> نفس الأداة (où, comment, pourquoi...) ما عدا Que/Qu’est-ce que -> ce que.',
				'تنبيه تطابق الأزمنة (Concordance des temps): إذا كان فعل القول في المضارع (il dit, il demande) لا تتغير أزمنة الأفعال، أما إذا كان في الماضي (il a dit, il demandait) فيتحول المضارع إلى imparfait والمستقبل إلى conditionnel présent والماضي المركب إلى plus-que-parfait.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Transformation : Direct -> Indirect',
				subtitle: 'Choisir le bon subordonnant selon le type de phrase',
				columns: [
					{
						header: 'Déclarative / Ordre',
						rule: 'que / de + infinitif',
						examples: 'Il dit que... / Il conseille de...'
					},
					{
						header: 'Question Totale',
						rule: 'Est-ce que -> si',
						examples: 'Il demande si l’eau est pure.'
					},
					{
						header: 'Question Partielle',
						rule: 'mot gardé / Que -> ce que',
						examples: 'Il demande comment / ce que...'
					}
				]
			}),
			visualCaptionAr: 'دليل التحويل السريع من الكلام المباشر إلى غير المباشر في المقابلة',
			examples: [
				{
					problemAr: 'حوّل إلى الكلام غير المباشر: « Le médecin conseille aux élèves : "Buvez suffisamment d’eau chaque jour." »',
					solutionAr: 'Le médecin conseille aux élèves de boire suffisamment d’eau chaque jour.'
				},
				{
					problemAr: 'حوّل إلى الكلام غير المباشر (فعل القول في الماضي): « Le chercheur a affirmé : "Cette méthode réduit la pollution." »',
					solutionAr: 'Le chercheur a affirmé que cette méthode réduisait la pollution.'
				}
			],
			watchOutAr:
				'في الكلام غير المباشر لا نضع أبدا قلب الفاعل (inversion) ولا علامة الاستفهام (؟) في آخر الجملة! خطأ: « Il demande comment fonctionne-t-il ? » والصحيح: « Il demande comment il fonctionne. »'
		},
		practice: [
			{
				questionAr: 'اختر التحويل الصحيح للكلام غير المباشر: « Le journaliste demande au chercheur : "Est-ce que ce filtre est efficace ?" »',
				options: [
					'Le journaliste demande au chercheur que ce filtre est efficace.',
					'Le journaliste demande au chercheur si ce filtre est efficace.',
					'Le journaliste demande au chercheur est-ce que ce filtre est efficace ?',
					'Le journaliste demande au chercheur ce que ce filtre est efficace.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'« que » تستعمل للجملة الإخبارية لا للاستفهام الكلي.',
					'أحسنت! الاستفهام الكلي يتحول دائما باستعمال « si » مع حذف علامة الاستفهام.',
					'لا نحتفظ بـ « est-ce que » ولا بعلامة الاستفهام في الكلام غير المباشر.',
					'« ce que » تخص الأداة « que / qu’est-ce que » فقط.'
				],
				explanationAr: 'السؤال الكلي المبدوء بـ Est-ce que يتحول إلى جملة فرعية مبدوءة بـ si.'
			},
			{
				questionAr: 'حوّل السؤال التالي إلى الكلام غير المباشر: « L’élève demande au professeur : "Que proposez-vous comme solution ?" »',
				options: [
					'L’élève demande au professeur que il propose comme solution.',
					'L’élève demande au professeur ce qu’il propose comme solution.',
					'L’élève demande au professeur si il propose comme solution.',
					'L’élève demande au professeur qu’est-ce qu’il propose comme solution ?'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الأداة « Que » الاستفهامية تصبح « ce que » (أو ce qu’ قبل حرف علة).',
					'ممتاز! « Que » تحولت إلى « ce qu’ » وتغيّر الضمير vous إلى il مع حذف علامة الاستفهام.',
					'« si » للاستفهام الكلي فقط.',
					'لا نحتفظ بـ qu’est-ce que في الكلام غير المباشر.'
				],
				explanationAr: 'في الاستفهام الجزئي تتحول « Que / Qu’est-ce que » إلى « ce que / ce qu’ ».'
			},
			{
				questionAr: 'حوّل الجملة الآتية مع مراعاة زمن فعل القول (في الماضي): « L’agronome a déclaré : "Nous planterons mille arbres." »',
				options: [
					'L’agronome a déclaré qu’ils planteront mille arbres.',
					'L’agronome a déclaré qu’ils planteraient mille arbres.',
					'L’agronome a déclaré qu’ils plantent mille arbres.',
					'L’agronome a déclaré qu’ils ont planté mille arbres.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'بما أن فعل القول في الماضي (a déclaré)، يتغير المستقبل البسيط.',
					'صحيح! المستقبل البسيط (planterons) يتحول إلى الشرط الحاضر (planteraient).',
					'المضارع لا يناسب تطابق الأزمنة مع الماضي.',
					'الماضي المركب يغيّر معنى المستقبل الأصلي.'
				],
				explanationAr: 'عندما يكون فعل القول في الماضي، يتحول Futur simple إلى Conditionnel présent.'
			},
			{
				questionAr: 'أي سؤال مصاغ بالأسلوب الرسمي بقلب الفاعل والفعل (registre soutenu avec inversion)؟',
				options: [
					'Vous utilisez l’énergie solaire ?',
					'Est-ce que vous utilisez l’énergie solaire ?',
					'Utilisez-vous l’énergie solaire ?',
					'Tu utilises l’énergie solaire ?'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'هذا استفهام بالنبرة (registre familier).',
					'هذا استفهام بـ Est-ce que (registre courant).',
					'أحسنت! قلب الفعل والفاعل « Utilisez-vous » يمثل الأسلوب الرسمي (soutenu) المناسب للمقابلة.',
					'هذا أسلوب غير رسمي بالمخاطب المفرد tu.'
				],
				explanationAr: 'القلب « Verbe-pronom sujet ? » هو سمة الأسلوب الرسمي في المقابلات الصحفية والعلمية.'
			},
			{
				questionAr: 'حوّل جملة الأمر إلى الكلام غير المباشر: « Le spécialiste recommande aux citoyens : "Évitez le plastique à usage unique !" »',
				options: [
					'Le spécialiste recommande aux citoyens qu’évitez le plastique à usage unique.',
					'Le spécialiste recommande aux citoyens d’éviter le plastique à usage unique.',
					'Le spécialiste recommande aux citoyens si éviter le plastique à usage unique.',
					'Le spécialiste recommande aux citoyens éviter le plastique à usage unique.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الأمر في الكلام غير المباشر لا يُربط بـ que + impératif.',
					'ممتاز! الأمر يتحول إلى « de / d’ + verbe à l’infinitif ».',
					'« si » للاستفهام الكلي لا للأمر.',
					'ينقص حرف الجر « d’ » قبل المصدر.'
				],
				explanationAr: 'يتحول فعل الأمر في الكلام غير المباشر إلى « de + المصدر » (d’éviter).'
			}
		]
	},

	// 4. La structure de la lettre ouverte
	{
		id: 'fre_lesson_1as_tcst_t2_structure_lettre_ouverte',
		slug: 'fre-1as-tcst-t2-structure-lettre-ouverte',
		grade: '1as_tcst',
		yearSubjectId: 657,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع 2: المقابلة العلمية والرسالة المفتوحة الحجاجية (L’interview et la lettre ouverte)',
		order: 4,
		titleAr: 'بنية الرسالة المفتوحة الحجاجية (La structure de la lettre ouverte)',
		objectives: [
			'معرفة خصائص الرسالة المفتوحة وفرقها عن الرسالة الشخصية (مُعلَنة للرأي العام وتدافع عن قضية عامة)',
			'إتقان التنظيم الشكلي والمضموني: المكان والتاريخ، الموضوع، صيغة النداء، العرض الحجاجي، وصيغة الختام الرسمية',
			'توظيف الروابط التنظيمية للحجج (Tout d’abord, Ensuite, Enfin) لصياغة مطالبة مقنعة ومهذبة'
		],
		keywordsAr: [
			'Lettre ouverte',
			'Formule d’appel',
			'Objet',
			'Arguments',
			'Formule de prise de congé'
		],
		discover: {
			scenarioAr:
				'تُعدّ الرسالة المفتوحة (la lettre ouverte) نصا حجاجيا يُوجَّه إلى شخصية مسؤولة (مدير، رئيس بلدية، مواطنين) ويُنشر في جريدة أو لوحة إعلانات ليقرأه الجميع. يريد تلاميذ قسم 1AS TCST إرسال رسالة مفتوحة لرئيس البلدية للمطالبة بإنشاء ممر آمن للراجلين أمام الثانوية. ما العناصر الشكلية التي يجب أن يلتزموا بها؟',
			svg: svgFrenchWritingBlueprint({
				title: 'Architecture officielle de la Lettre Ouverte',
				steps: [
					{
						stage: '1. En-tête',
						detail: 'Lieu et date, Expéditeur, Destinataire, Objet précis.'
					},
					{
						stage: '2. Formule d’appel',
						detail: 'Monsieur le Maire, / Madame la Directrice, / Chers citoyens,'
					},
					{
						stage: '3. Corps argumenté',
						detail: 'Exposé du problème + 2 ou 3 arguments avec exemples + proposition.'
					},
					{
						stage: '4. Prise de congé',
						detail: 'Formule de politesse finale + Signature (Les élèves de 1AS).'
					}
				]
			}),
			steps: [
				{
					promptAr: 'لماذا تُسمى هذه الرسالة « رسالة مفتوحة » (Lettre ouverte)؟',
					hintAr: 'هل تبقى سرية في ظرف مغلق بين شخصين فقط؟',
					expectedInput: 'لأنها موجّهة لمسؤول معين لكنها منشورة علنا ليطلع عليها الرأي العام',
					revealAr: 'تُسمى « مفتوحة » لأنها لا تبقى سرية بل تُنشر للجمهور (في الصحافة أو المؤسسة) لحشد الوعي حول قضية تهم الجميع.'
				},
				{
					promptAr: 'ما العناصر الواجب احترامها في صيغة الختام (la formule de prise de congé)؟',
					hintAr: 'يجب أن تتكرر فيها صيغة النداء نفسها (Monsieur le Proviseur / Madame la Directrice).',
					expectedInput: 'تُختم بعبارة احترام رسمية تعيد صيغة النداء ثم التوقيع',
					revealAr: 'نكتب مثلا: « Veuillez agréer, Monsieur le Maire, l’expression de nos salutations distinguées. » ثم التوقيع أسفل اليمين.'
				},
				{
					promptAr: 'كيف نرتب الحجج داخل جسم الرسالة المفتوحة؟',
					hintAr: 'نستخدم روابط التعداد المنطقي (connecteurs d’énumération).',
					expectedInput: 'D’abord / Tout d’abord — Ensuite / De plus — Enfin',
					revealAr: 'تُرتّب الحجج بوضوح من الأقل أهمية إلى الأقوى باستخدام: D’abord, Ensuite / En outre, Enfin.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الترويسة (L’en-tête): المكان والتاريخ (أعلى اليمين، مثل: Constantine, le 15 février 2026)، بيانات المرسل (أعلى اليسار)، بيانات المرسل إليه، وسطرا واضحا للموضوع (Objet : Demande d’aménagement...).',
				'صيغة النداء (Formule d’appel): « Monsieur le Proviseur, » أو « Monsieur le Maire, » أو « Chers concitoyens, » تليها فاصلة ونعود للسطر.',
				'جسم الرسالة (Le corps de la lettre): يتكون من 3 فقرات متناسقة: (1) عرض الإشكالية بوضوح وهدوء، (2) تقديم حجتين أو ثلاث حجج مدعومة بأمثلة وروابط منطقية (D’abord, Ensuite, En effet, Par conséquent)، (3) اقتراح حلول عملية ومناشدة المسؤول.',
				'صيغة الوداع الرسمية (Formule de prise de congé): « Dans l’attente d’une réponse favorable, veuillez agréer, Monsieur le ..., l’expression de notre profond respect. » يليها التوقيع (Signature).'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Formules clés de la lettre ouverte',
				rootLabel: 'Un ton ferme, respectueux et convaincant',
				branches: [
					{
						label: 'Introduction',
						rule: 'Nous nous permettons de...',
						example: 'attirer votre attention sur...'
					},
					{
						label: 'Arguments',
						rule: 'D’abord / En outre / Enfin',
						example: 'En effet, il est prouvé que...'
					},
					{
						label: 'Conclusion',
						rule: 'Veuillez agréer, Monsieur...',
						example: 'nos salutations distinguées.'
					}
				]
			}),
			visualCaptionAr: 'العبارات الجاهزة المعتمدة في افتتاح الرسالة المفتوحة وحجاجها وختامها',
			examples: [
				{
					problemAr: 'اكتب سطر الموضوع (Objet) وصيغة النداء (Formule d’appel) لرسالة موجّهة لمدير الثانوية حول إنشاء نادٍ للبيئة.',
					solutionAr: 'Objet : Demande de création d’un club scolaire d’environnement.\nMonsieur le Proviseur,'
				},
				{
					problemAr: 'صحّح صيغة الختام غير المناسبة التالية في رسالة لمديرة الثانوية: « Salut Madame, répondez-moi vite ! »',
					solutionAr: 'Veuillez agréer, Madame la Proviseure, l’expression de notre respectueuse considération.'
				}
			],
			watchOutAr:
				'في صيغة الختام الرسمية لا تنسَ أبدا تكرار لقب المرسل إليه تماما كما ورد في صيغة النداء (إذا بدأت بـ Monsieur le Maire فكرّر Monsieur le Maire داخل Veuillez agréer...)!'
		},
		practice: [
			{
				questionAr: 'ما الذي يميّز الرسالة المفتوحة (la lettre ouverte) عن الرسالة الخاصة؟',
				options: [
					'تُكتب بلغة عامية للأصدقاء فقط',
					'تُوجّه إلى مسؤول أو فئة معينة وتُنشر للعموم للدفاع عن قضية عامة',
					'لا تحتوي على تاريخ ولا توقيع',
					'تخلو تماما من الحجج والأمثلة'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الرسالة المفتوحة تُكتب بلغة رسمية مهذبة.',
					'أحسنت! تجمع بين مخاطبة مسؤول محدد والنشر العلني لخدمة قضية جماعية.',
					'بل تحتوي على التاريخ والموضوع والنداء والختام والتوقيع.',
					'جوهر الرسالة المفتوحة هو الحجاج والإقناع.'
				],
				explanationAr: 'الرسالة المفتوحة خطاب حجاجي علني يدافع عن مصلحة عامة.'
			},
			{
				questionAr: 'أين نكتب عبارة « Objet : Sensibilisation contre le gaspillage de l’eau » في الرسالة المفتوحة؟',
				options: [
					'بعد التوقيع في أسفل الصفحة',
					'في الترويسة قبل صيغة النداء (Formule d’appel)',
					'في منتصف الفقرة الثانية',
					'داخل صيغة الوداع الرسمية'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'التوقيع هو آخر عنصر في الرسالة.',
					'ممتاز! سطر الموضوع يوضع في الترويسة قبل صيغة النداء ليُعلم القارئ بمضمون الرسالة فورا.',
					'لا يوضع الموضوع وسط العرض.',
					'لا يوضع في صيغة الوداع.'
				],
				explanationAr: 'سطر « Objet » جزء أساسي من ترويسة الرسالة الرسمية والمفتوحة.'
			},
			{
				questionAr: 'اختر صيغة الوداع (formule de prise de congé) المناسبة لرسالة موجهة إلى رئيس البلدية:',
				options: [
					'À bientôt et merci beaucoup !',
					'Veuillez agréer, Monsieur le Maire, l’expression de nos salutations distinguées.',
					'Je t’embrasse chaleureusement.',
					'Bonne journée, cordialement à tous.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'عبارة غير رسمية.',
					'صحيح! صيغة رسمية مهذبة تعيد لقب المرسل إليه بدقة.',
					'عبارة عائلية حميمية لا تناسب المسؤولين.',
					'عبارة مقتضبة غير رسمية لرسالة مفتوحة لمسؤول.'
				],
				explanationAr: 'الصيغة القياسية للوداع الرسمي تبدأ بـ Veuillez agréer (أو Recevez) مع إعادة لقب المرسل إليه.'
			},
			{
				questionAr: 'ما الغاية التواصلية (visée communicative) للرسالة المفتوحة الحجاجية؟',
				options: [
					'Raconter une fable merveilleuse',
					'Sensibiliser et convaincre le destinataire d’agir pour une cause',
					'Décrire un paysage sans prendre position',
					'Donner uniquement des définitions scientifiques'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ليست قصة خيالية.',
					'أحسنت! هدفها التوعية والإقناع ودفع المسؤول أو القارئ لاتخاذ إجراء ملموس.',
					'الرسالة المفتوحة تتخذ موقفا واضحا.',
					'تتجاوز التفسير المحض إلى الحجاج والمطالبة.'
				],
				explanationAr: 'تهدف الرسالة المفتوحة إلى الإقناع والتحسيس والتحفيز على الفعل.'
			},
			{
				questionAr: 'أي سلسلة روابط تناسب تنظيم ثلاث حجج داخل جسم الرسالة المفتوحة؟',
				options: [
					'Autrefois — Un jour — Hier',
					'Tout d’abord — Ensuite — Enfin',
					'Par exemple — C’est-à-dire — Tel que',
					'Puis — Soudain — Brusquement'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه مؤشرات زمنية للسرد الماضي.',
					'إجابة موفقة! « Tout d’abord, Ensuite, Enfin » روابط تنظيمية مثالية لترتيب الحجج.',
					'هذه مؤشرات لأساليب التفسير لا لترتيب الحجج.',
					'« Soudain / Brusquement » خاصة بعنصر المفاجأة في القصة.'
				],
				explanationAr: 'نرتّب الحجج في الرسالة المفتوحة بروابط التعداد المنطقي (Tout d’abord, De plus / Ensuite, Enfin).'
			}
		]
	},

	// 5. Rédiger une lettre ouverte pour défendre l'environnement ou la santé scolaire
	{
		id: 'fre_lesson_1as_tcst_t2_rediger_lettre_ouverte',
		slug: 'fre-1as-tcst-t2-rediger-lettre-ouverte',
		grade: '1as_tcst',
		yearSubjectId: 657,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع 2: المقابلة العلمية والرسالة المفتوحة الحجاجية (L’interview et la lettre ouverte)',
		order: 5,
		titleAr: 'تحرير رسالة مفتوحة للدفاع عن البيئة أو الصحة المدرسية (Rédiger une lettre ouverte)',
		objectives: [
			'بناء شبكة حجج علمية وواقعية حول حماية البيئة (التشجير، فرز النفايات، اقتصاد الماء) أو الصحة المدرسية (النظافة، التغذية المتوازنة)',
			'دمج الروابط المنطقية (السبب والنتيجة والغاية) والموداليزاتورات داخل نص رسالة مفتوحة متكاملة',
			'مراجعة الإنتاج الكتابي وفق شبكة التقييم الرسمية لتفادي الأخطاء الشائعة'
		],
		keywordsAr: [
			'Production écrite',
			'Environnement',
			'Santé scolaire',
			'Boîte à outils',
			'Grille d’évaluation'
		],
		discover: {
			scenarioAr:
				'طلب أستاذ الفرنسية من تلاميذ 1AS TCST تحرير رسالة مفتوحة إلى مدير الثانوية للدفاع عن الصحة المدرسية عبر تحسين جودة الوجبات في المطعم وتوفير مساحات خضراء. كيف ينتقل التلميذ من المسوّدة إلى رسالة مفتوحة مقنعة من 12 إلى 15 سطرا؟',
			svg: svgFrenchWritingBlueprint({
				title: 'Méthode en 4 étapes : Rédiger une lettre ouverte',
				steps: [
					{
						stage: '1. Mise en page',
						detail: 'Date, Destinataire, Objet clair et Formule d’appel.'
					},
					{
						stage: '2. Constat + Thèse',
						detail: 'Présenter le problème (environnement / santé) avec tact.'
					},
					{
						stage: '3. 2-3 Arguments',
						detail: 'Relier par D’abord, Ensuite, Enfin + cause / but + exemple.'
					},
					{
						stage: '4. Appel + Clôture',
						detail: 'Proposer une action concrète + formule de politesse + signature.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما المعجم المناسب للرسالة المفتوحة حول البيئة (l’environnement)؟ اذكر 4 كلمات مفتاحية.',
					hintAr: 'فكّر في التشجير، فرز النفايات، التلوث، وحماية الطبيعة.',
					expectedInput: 'reboisement, tri des déchets, pollution, protéger, espace vert, eau potable',
					revealAr: 'من المعجم الأساسي: le tri des déchets, le reboisement, préserver la nature, lutter contre la pollution, économiser l’eau, un cadre sain.'
				},
				{
					promptAr: 'صُغ حجة مقنعة عن التغذية المتوازنة باستعمال رابط غاية (afin de أو afin que).',
					hintAr: 'اربط بين الوجبة الصحية وتركيز التلاميذ في القسم.',
					expectedInput: 'Il est essentiel d’offrir des repas équilibrés afin que les élèves restent concentrés en classe.',
					revealAr: 'مثال متقن: « Tout d’abord, il est indispensable d’améliorer la qualité des repas afin que les élèves disposent de l’énergie nécessaire pour étudier efficacement. »'
				},
				{
					promptAr: 'ما الخطأ الأسلوبي الذي يجب تجنبه عند مخاطبة مدير الثانوية أو رئيس البلدية؟',
					hintAr: 'هل يصح توجيه اللوم العنيف أو صيغة الأمر المباشر؟',
					expectedInput: 'تجنب اللوم الفظ وصيغة الأمر واللغة العامية، واعتماد التأدب والحلول البناءة',
					revealAr: 'الرسالة المفتوحة الناجحة تحترم المخاطب وتستخدم صيغة التأدب (nous vous prions de, il serait souhaitable de) وتقترح حلولا عملية يشارك فيها التلاميذ.'
				}
			]
		},
		summary: {
			rulesAr: [
				'التزام الشكل الرسمي للرسالة المفتوحة يُكسبك فورا نقاط التقديم (Mise en page): المكان والتاريخ، الموضوع، صيغة النداء، الفقرات الواضحة، صيغة الوداع، والتوقيع.',
				'توظيف معجم دقيق حسب الموضوع: البيئة (déchets, recyclage, pollution, arbres, gaspillage, énergie propre) أو الصحة المدرسية (hygiène, nutrition équilibrée, activité physique, prévention, cadre sain).',
				'دمج 3 عناصر لغوية من البرنامج لرفع العلامة: (1) ضمائر التلفظ (nous / vous)، (2) رابط منطقي للسبب أو النتيجة أو الغاية (parce que, par conséquent, afin que + subjonctif)، (3) موداليزاتور (indispensable, nous sommes convaincus que, il serait utile de).',
				'قراءة النص مراجعةً أخيرة للتأكد من مطابقة الأفعال والصفات (les accords) وعلامات الترقيم (الفاصلة بعد صيغة النداء، النقطة آخر كل جملة).'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Boîte à outils pour la rédaction (1AS TCST)',
				rootLabel: 'Environnement & Santé scolaire',
				branches: [
					{
						label: 'Environnement',
						rule: 'trier, planter, économiser',
						example: 'bacs de tri, espaces verts'
					},
					{
						label: 'Santé scolaire',
						rule: 'prévenir, équilibrer, nettoyer',
						example: 'hygiène, cantine saine'
					},
					{
						label: 'Propositions',
						rule: 'Conditionnel de politesse',
						example: 'Il serait bénéfique de...'
					}
				]
			}),
			visualCaptionAr: 'صندوق الأدوات اللغوية لإنتاج رسالة مفتوحة متماسكة ومقنعة',
			examples: [
				{
					problemAr: 'اكتب فقرة اقتراح ختامية مهذبة لرسالة مفتوحة حول فرز النفايات في الثانوية.',
					solutionAr: 'Par conséquent, nous vous proposons de créer une journée mensuelle de nettoyage et d’installer des poubelles de tri dans la cour afin que notre lycée devienne un modèle d’établissement propre. Dans l’attente d’une suite favorable, veuillez agréer, Monsieur le Proviseur, l’expression de notre profond respect.'
				},
				{
					problemAr: 'حوّل الجملة الضعيفة « Les déchets sont mauvais » إلى حجة علمية مقنعة للرسالة المفتوحة.',
					solutionAr: 'Tout d’abord, l’accumulation des déchets plastiques nuit gravement à la santé des élèves et dégrade l’image de notre établissement.'
				}
			],
			watchOutAr:
				'احذر من كتابة فقرة سردية أو وصفية دون إشراك المرسل إليه! لا بد في الرسالة المفتوحة من مخاطبة المسؤول بـ « vous » وطلب إجراء عملي واضح.'
		},
		practice: [
			{
				questionAr: 'ما الجملة الأنسب لافتتاح جسم الرسالة المفتوحة الموجهة لمدير الثانوية؟',
				options: [
					'Il était une fois un lycée très propre.',
					'Nous avons l’honneur d’attirer votre attention sur l’importance de préserver l’hygiène de notre établissement.',
					'Le plastique est un polymère synthétique dérivé du pétrole.',
					'Salut tout le monde, il faut nettoyer la cour !'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه افتتاحية قصة خيالية.',
					'أحسنت! افتتاحية رسمية مهذبة تحدد الغرض بوضوح وتخاطب المسؤول بـ votre.',
					'هذه جملة تعريفية لنص علمي موضوعي.',
					'أسلوب عامي غير رسمي.'
				],
				explanationAr: 'العبارة « Nous avons l’honneur d’attirer votre attention sur... » من أجمل افتتاحيات الرسائل المفتوحة.'
			},
			{
				questionAr: 'أي حجة تجمع بشكل صحيح بين السبب والنتيجة في موضوع الصحة المدرسية؟',
				options: [
					'Les élèves aiment le sport parce que le stade est bleu.',
					'Une alimentation riche en sucres provoque la fatigue ; par conséquent, les résultats scolaires baissent.',
					'Le sucre est blanc et sucré.',
					'Nous devons manger des bonbons afin de protéger nos dents.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الحجة غير منطقية.',
					'ممتاز! حجة علمية واضحة مبنية على رابط النتيجة « par conséquent ».',
					'مجرد وصف لا يشكل حجة.',
					'معلومة صحية خاطئة تماما.'
				],
				explanationAr: 'الحجة القوية في شعبة العلوم تعتمد على تفسير منطقي وعلمي للآثار الصحية.'
			},
			{
				questionAr: 'أي جملة تستعمل رابط غاية مع صيغة المنصوب (subjonctif) بشكل سليم تماما؟',
				options: [
					'Nous proposons des bacs de tri afin que la cour reste propre.',
					'Nous proposons des bacs de tri afin que la cour rester propre.',
					'Nous proposons des bacs de tri afin de la cour reste propre.',
					'Nous proposons des bacs de tri pour que la cour restera propre.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! « afin que + sujet + subjonctif présent (reste) » تركيب سليم 100%.',
					'بعد afin que لا نضع المصدر بل نصرّف الفعل في المنصوب.',
					'« afin de » يتبعه مصدر وليس فاعلا وفعلا مصرفا.',
					'لا نستعمل المستقبل بعد pour que.'
				],
				explanationAr: 'مع فاعلين مختلفين (nous / la cour) نكتب: afin que + subjonctif (reste).'
			},
			{
				questionAr: 'ما المعيار الذي يُقيَّم عليه « احترام بنية الرسالة المفتوحة » في سلم التنقيط؟',
				options: [
					'وجود التاريخ والموضوع وصيغة النداء والفقرات الحجاجية وصيغة الوداع والتوقيع',
					'كتابة العنوان بالخط الأحمر فقط',
					'إدراج أبيات شعرية طويلة',
					'عدم ذكر أي مثال في النص'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح تماما! هذه العناصر الستة تشكل الهيكل الرسمي للرسالة المفتوحة.',
					'اللون ليس معيارا للرسالة.',
					'الشعر غير مطلوب في الرسالة المفتوحة العلمية.',
					'الأمثلة تقوّي الحجج ولا تُمنع.'
				],
				explanationAr: 'احترام التنظيم الشكلي للرسالة المفتوحة شرط أساسي لنجاح الإنتاج الكتابي.'
			},
			{
				questionAr: 'اختر الجملة الختامية التي تتضمن اقتراحا عمليا مهذبا:',
				options: [
					'Faites votre travail immédiatement sinon nous protesterons.',
					'Il serait très utile d’organiser une journée de reboisement avec la participation volontaire des élèves.',
					'Les arbres ont des racines et des feuilles vertes.',
					'Je ne sais pas quoi proposer comme solution.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'أسلوب تهديد وأمر مرفوض في الرسالة المهذبة.',
					'إجابة موفقة! اقتراح إيجابي وبنّاء بصيغة الشرط المهذب (Il serait très utile de...).',
					'جملة علمية لا تحتوي على اقتراح.',
					'العجز عن الاقتراح يضعف الرسالة المفتوحة.'
				],
				explanationAr: 'تُختم الرسالة المفتوحة عادة بمقترح عملي مهذب بصيغة الشرط (Il serait souhaitable / utile de...).'
			}
		]
	}
];
