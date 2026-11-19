import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWritingBlueprint
} from '../../svg-french';
import type { FrenchInteractiveLessonData } from '../../types';

/**
 * 3AS BAC Langues Étrangères (لغات أجنبية — yearSubjectId: 788, coeff 5, 03h30, 6+6+8=20)
 * Interactive Lessons — Trimestre 3 : Projet 3 « L’Appel » & Synthèse avancée BAC LE (5 lessons)
 */
export const LESSONS_3AS_LE_T3: FrenchInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 1: Architecture rhétorique de l’Appel
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_le_t3_architecture_rhetorique_appel',
		slug: 'fre-3as-le-t3-architecture-rhetorique-appel',
		grade: '3as_le',
		yearSubjectId: 788,
		trimesterId: 't3',
		sequenceId: 'projet3',
		sequenceTitleAr: 'المشروع 3: L’Appel (الهندسة البلاغية للنداء والتدريب الشامل — لغات أجنبية)',
		order: 1,
		titleAr: 'الهندسة البلاغية لنص النداء (Constat alarmant -> Nécessité d’agir -> Exhortation)',
		objectives: [
			'تحليل الهندسة البلاغية لنص النداء في BAC LE: كيف يتدرج الكاتب من الصدمة التشخيصية (Pathos/Constat) إلى البرهان العقلي (Logos/Nécessité) فالتحريض العملي (Exhortation)',
			'تحديد عناصر الموقف التواصلي بدقة (المرسل، المرسل إليهم، موضوع النداء، السياق الملحّ، والغاية التحريضية)',
			'استخراج المؤشرات الأسلوبية التي تصنع الإلحاح (Urgence) وتدفع القارئ إلى تجاوز السلبية'
		],
		keywordsAr: ['Architecture rhétorique', 'Constat alarmant', 'Urgence', 'Exhortation', 'Appel BAC LE'],
		discover: {
			scenarioAr:
				'في شعبة اللغات الأجنبية، لا يُنظر إلى النداء بوصفه مجرد ثلاث فقرات آلية؛ بل بوصفه **خطاباً بلاغياً تصاعدياً**: يبدأ بقرع ناقوس الخطر (constat alarmant)، ثم يقيم الحجة على أن التغيير ممكن وواجب (nécessité et faisabilité)، ثم يبلغ الذروة في النداء الصريح (exhortation solennelle).',
			svg: svgFrenchWritingBlueprint({
				title: 'Architecture rhétorique de l’Appel (BAC LE)',
				steps: [
					{
						stage: '1. Constat alarmant',
						detail: 'Faits chiffrés, lexique de la menace, éveil de la conscience'
					},
					{
						stage: '2. Nécessité d’agir',
						detail: 'Arguments éthiques/pratiques, modalité déontique, faisabilité'
					},
					{
						stage: '3. Exhortation solennelle',
						detail: 'Performatifs, impératif, nous inclusif, futur de promesse'
					}
				]
			}),
			steps: [
				{
					promptAr: 'لماذا يجمع القسم الأول من النداء بين الأرقام الموثقة (faits chiffrés) ومعجم الخطر (menacer, disparaître, fléau)؟',
					hintAr: 'الأرقام تقنع العقل، ومعجم الخطر يوقظ الوجدان!',
					expectedInput: 'لإثبات جدية المشكلة واقعياً (convaincre) وإحداث صدمة وعي تدفع إلى التفاعل (persuader)',
					revealAr: 'يعتمد القسم العرضي في النداء المتقن على تزاوج الموضوعية (أرقام، معطيات) مع شحنة وجدانية محسوبة لإخراج المتلقي من اللامبالاة.'
				},
				{
					promptAr: 'في القسم الثاني (الحجاجي)، ما الشرطان اللذان يزيلان عذر « لا فائدة من التحرك » عند القارئ؟',
					hintAr: 'يجب إقناعه بأن التحرك واجب (nécessité) وأنه ممكن وناجح (possibilité / faisabilité)!',
					expectedInput: 'إثبات وجوب التحرك أخلاقياً وإثبات إمكانية النجاح عملياً بأمثلة وحلول ملموسة',
					revealAr: 'بدون إثبات إمكانية التغيير (nous pouvons agir)، يتحول التشخيص القاتم إلى يأس؛ لذا يجمع القسم الحجاجي بين « nous devons » و« nous pouvons ».'
				},
				{
					promptAr: 'بماذا تُختم الذروة التحريضية (Exhortation) في النداء البليغ؟',
					hintAr: 'فكّر في الرؤية المستقبلية المشرقة التي تكافئ الاستجابة للنداء.',
					expectedInput: 'بدعوة مباشرة (أمر / فعل إنجازي) متبوعة بوعد مستقبلي متفائل بصيغة Futur simple',
					revealAr: 'الختام المتفائل بالمستقبل البسيط (Ensemble, nous sauvegarderons nos oasis) يمنح المتلقي طاقة إيجابية تترجم إلى فعل.'
				}
			]
		},
		summary: {
			rulesAr: [
				'البناء التصاعدي للنداء (Progression rhétorique): (1) إيقاظ الوعي عبر تشخيص مقلق موثّق (Constat alarmant)؛ (2) إقناع العقل بوجوب التحرك وإمكانيته (Argumentation déontique et pragmatique)؛ (3) استنهاض الإرادة بالدعوة الصريحة والوعد بالنجاح (Exhortation solennelle).',
				'الحقل الدلالي للاستعجال (Champ lexical de l’urgence): il est temps de, sans tarder, dès aujourd’hui, urgence, péril, agir avant qu’il ne soit trop tard.',
				'ثنائية « Devoir + Pouvoir »: في القسم الثاني، يوظّف الكاتب أفعال الوجوب (devoir, falloir) لإلزام الضمير، وأفعال القدرة (pouvoir, être capable de) لبث الثقة في نجاح المبادرة.',
				'الفرق في الغاية: النص التاريخي يخبر ويكرّم؛ نص النقاش يقنع بفكرة؛ نص النداء يحوّل القناعة إلى سلوك عملي (faire agir / inciter à l’engagement).'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Les trois leviers de l’Appel (BAC LE)',
				rootLabel: 'Passer du constat à l’engagement',
				rootSub: 'Comment l’auteur déclenche-t-il l’action ?',
				branches: [
					{
						label: 'Alerter (Constat)',
						rule: 'Chiffres + champ de la menace',
						example: 'Nos manuscrits s’effacent peu à peu.'
					},
					{
						label: 'Responsabiliser',
						rule: 'Devoir moral + solutions réelles',
						example: 'Nous devons et pouvons les numériser.'
					},
					{
						label: 'Mobiliser',
						rule: 'Interpellation + impératif + futur',
						example: 'Agissons vite : nous sauverons la mémoire !'
					}
				]
			}),
			visualCaptionAr: 'الروافع البلاغية الثلاث التي تحوّل نص النداء إلى دعوة عملية مؤثرة.',
			examples: [
				{
					problemAr: 'Relevez deux indices d’urgence dans : « Avant qu’il ne soit trop tard, il est impératif d’intervenir dès aujourd’hui pour sauver les oasis. »',
					solutionAr: '1) « Avant qu’il ne soit trop tard » ; 2) « il est impératif » et « dès aujourd’hui ».'
				},
				{
					problemAr: 'Pourquoi associe-t-on souvent « nous devons » et « nous pouvons » dans la partie argumentative d’un appel ?',
					solutionAr: '« nous devons » crée l’obligation morale, tandis que « nous pouvons » rassure le destinataire en prouvant que le changement est à sa portée.'
				},
				{
					problemAr: 'Formulez la visée communicative d’un appel pour la numérisation des manuscrits algériens.',
					solutionAr: 'Sensibiliser les chercheurs, étudiants et institutions aux menaces pesant sur les manuscrits anciens et les exhorter à s’engager activement dans leur préservation.'
				}
			],
			watchOutAr: 'انتبه في أسئلة البكالوريا: عبارة « avant qu’il ne soit trop tard » تتضمن « ne » زائدة للتقوية الأسلوبية (ne explétif — ليست نفياً!) متبوعة بـ Subjonctif (soit).'
		},
		practice: [
			{
				questionAr: 'Pourquoi la partie argumentative d’un appel combine-t-elle l’idée de nécessité (« nous devons ») et celle de faisabilité (« nous pouvons ») ?',
				options: [
					'Pour responsabiliser le lecteur tout en lui prouvant que son action peut réellement réussir',
					'Pour décourager les volontaires d’agir',
					'Pour remplacer totalement le constat initial',
					'Pour transformer l’appel en récit du Moyen Âge'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الجمع بين الواجب وإمكانية التحقق يزيل اليأس ويحفّز الإرادة.',
					'خطأ: الهدف تشجيع المتطوعين لا إحباطهم.',
					'خطأ: القسم الحجاجي يكمل التشخيص ولا يلغيه.',
					'خطأ: النداء متجه للحاضر والمستقبل.'
				],
				explanationAr: 'إقناع القارئ بأن الحل ممكن يجعل النداء واقعياً وقابلاً للاستجابة.'
			},
			{
				questionAr: 'Dans « Agissons avant qu’il ne soit trop tard », quel mode suit « avant que » ?',
				options: ['L’indicatif présent', 'Le subjonctif présent (soit)', 'Le passé simple', 'Le futur simple'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: « avant que » لا يأخذ Indicatif.',
					'ممتاز: « avant que » يفرض دائماً Subjonctif (soit) وغالباً يرافقه « ne explétif ».',
					'خطأ: ليس ماضياً بسيطاً.',
					'خطأ: لا نضع المستقبل بعد avant que.'
				],
				explanationAr: 'على عكس après que (+ indicatif)، فإن avant que يفرض دائماً Subjonctif.'
			},
			{
				questionAr: 'Quel est le rôle rhétorique du constat chiffré dans la première partie d’un appel écologique ?',
				options: [
					'Faire rire le lecteur',
					'Prouver que la situation n’a aucune gravité',
					'Donner une base factuelle incontestable qui justifie l’urgence de l’appel',
					'Annoncer directement la signature finale'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: النداء البيئي جاد ومقلق.',
					'خطأ: الأرقام تثبت جدية التهديد وخطورته.',
					'صحيح: المعطيات المرقّمة تثبت موضوعية التشخيص وتبرر الاستعجال.',
					'خطأ: تأتي في التمهيد التشخيصي لا في التوقيع.'
				],
				explanationAr: 'الوقائع الموثقة تمنح النداء مصداقية عالية قبل الانتقال إلى التحريض.'
			},
			{
				questionAr: 'Parmi ces expressions, laquelle appartient directement au champ lexical de l’urgence ?',
				options: ['Autrefois', 'Parfois', 'Doucement', 'Sans tarder / dès à présent'],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: تدل على الماضي البعيد.',
					'خطأ: تدل على التقطع لا الاستعجال.',
					'خطأ: تدل على التمهل.',
					'أحسنت: تدل بوضوح على ضرورة التحرك الفوري.'
				],
				explanationAr: 'معجم الاستعجال (sans tarder, urgence, sans délai) ينشّط طاقة النداء.'
			},
			{
				questionAr: 'Quelle différence essentielle distingue la visée d’un débat d’idées de celle d’un appel ?',
				options: [
					'Le débat cherche surtout à faire adhérer à une idée, tandis que l’appel pousse à un acte concret',
					'Le débat utilise toujours l’impératif et l’appel jamais',
					'L’appel ne contient aucun argument',
					'Il n’existe aucune différence entre les deux genres'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: النقاش يستهدف القناعة الفكرية، أما النداء فيستهدف التحرك والسلوك العملي.',
					'خطأ: العكس تماماً، الأمر يميز النداء.',
					'خطأ: النداء يضم قسماً حجاجياً أساسياً.',
					'خطأ: لكل منهما بنية وغاية متميزة.'
				],
				explanationAr: 'ينتقل النداء من الإقناع النظري إلى الدعوة الصريحة للفعل (faire agir).'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 2: Verbes performatifs, injonction et nuances du subjonctif / conditionnel
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_le_t3_performatifs_subjonctif_conditionnel',
		slug: 'fre-3as-le-t3-performatifs-subjonctif-conditionnel',
		grade: '3as_le',
		yearSubjectId: 788,
		trimesterId: 't3',
		sequenceId: 'projet3',
		sequenceTitleAr: 'المشروع 3: L’Appel (الهندسة البلاغية للنداء والتدريب الشامل — لغات أجنبية)',
		order: 2,
		titleAr: 'الأفعال الإنجازية، الأمر وفروق المنصوب والشرطي (Performatifs, subjonctif et conditionnel)',
		objectives: [
			'التمييز الدقيق بين الفعالية الإنجازية للأفعال (Performatifs) في المضارع مع المتكلم مقابل مجرد الوصف في الماضي أو الغائب',
			'إتقان الفروق البلاغية بين Subjonctif (الوجوب والغاية والتمني)، و Conditionnel (النتيجة المفترضة والتحذير أو النصيحة المهذبة: Il faudrait / Nous devrions)',
			'توظيف الجملة الشرطية (Si + présent -> futur simple | Si + imparfait -> conditionnel présent) لإبراز عواقب التقاعس أو ثمار التحرك'
		],
		keywordsAr: ['Verbes performatifs', 'Subjonctif de nécessité', 'Conditionnel', 'Hypothèse (Si)', 'Injonction'],
		discover: {
			scenarioAr:
				'يملك طالب اللغات الأجنبية حساً دقيقاً بالفروق بين الصيغ (Modes): قارن بين « Il faut que nous agissions » (إلزام صارم بالمنصوب)، و« Si nous restions passifs, ces trésors disparaîtraient » (تحذير افتراضي بالشرطي)، و« Nous vous exhortons à agir » (فعل إنجازي مباشر)!',
			svg: svgFrenchGrammarMap({
				title: 'Nuances modales dans l’Appel (BAC LE)',
				rootLabel: 'Subjonctif vs Conditionnel',
				rootSub: 'Chaque mode exprime une nuance précise d’engagement',
				branches: [
					{
						label: 'Performatif (Présent)',
						rule: 'Je / Nous + verbe d’appel',
						example: 'Nous vous exhortons à participer.'
					},
					{
						label: 'Subjonctif',
						rule: 'Nécessité, souhait, but urgent',
						example: 'Il faut que chacun s’engage.'
					},
					{
						label: 'Conditionnel (Conseil)',
						rule: 'Atténuation polie / souhait',
						example: 'Il faudrait agir / Nous devrions...'
					},
					{
						label: 'Conditionnel (Alerte)',
						rule: 'Si + Imparfait -> Cond. présent',
						example: 'Si rien ne changeait, l’eau manquerait.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'في الجملتين: (1) « Nous vous invitons à sauvegarder les manuscrits » | (2) « Hier, l’association a invité les citoyens ». في أيهما يُعدّ الفعل « inviter » فعلاً إنجازياً (performatif) فعلياً؟',
					hintAr: 'الفعل الإنجازي يُحدث الدعوة لحظة التلفظ به في الحاضر مع المتكلم!',
					expectedInput: 'في الجملة (1) فقط (المضارع + المتكلم nous)؛ أما الجملة (2) فتكتفي بسرد خبر ماضٍ',
					revealAr: 'شرط الإنجازية (Performativité): ضمير المتكلم (je / nous) + زمن المضارع (présent de l’indicatif)؛ أما في الماضي أو الغائب فيتحول إلى مجرد فعل إخباري!'
				},
				{
					promptAr: 'قارن بين « Il faut que nous protégions le Barrage Vert » و « Il faudrait que nous protégions le Barrage Vert ». ما الفارق الأسلوبي بين « faut » و « faudrait »؟',
					hintAr: 'فكّر في درجة الإلحاح واللباقة: الحاضر حازم ومباشر، والشرطي أكثر تلطيفاً واقتراحاً.',
					expectedInput: '« Il faut » إلزام حازم ومباشر؛ أما « Il faudrait » (conditionnel d’atténuation) فاقتراح أو توصية ملطّفة ومهذبة',
					revealAr: 'يستعمل الكاتب « Il faudrait / Nous devrions » لإسداء النصح بلباقة دون أن يبدو متسلطاً، و« Il faut / Nous devons » عند اشتداد الاستعجال.'
				},
				{
					promptAr: 'أكمل الجملة الشرطية التحذيرية بتوافق زمني سليم: « Si nous négligions nos oasis aujourd’hui, le désert (gagner) rapidement du terrain. »',
					hintAr: 'Si + Imparfait يتبعه دائماً Conditionnel présent!',
					expectedInput: 'gagnerait (Conditionnel présent)',
					revealAr: 'القاعدة الذهبية لـ Si: (1) Si + Présent -> Futur simple (احتمال حقيقي ووعد)؛ (2) Si + Imparfait -> Conditionnel présent (تحذير افتراضي مما قد يحدث إذا تقاعسنا).'
				}
			]
		},
		summary: {
			rulesAr: [
				'شرط الفعل الإنجازي الحقيقي (Performatif): أن يكون الفعل دالاً على الدعوة (appeler, exhorter, inviter, conjurer, supplier, prier) ومصرفاً في Présent de l’indicatif مع Je أو Nous.',
				'استعمالات Subjonctif في النداء: (1) بعد تراكيب الوجوب (il faut que, il est impératif / urgent que)؛ (2) بعد روابط الغاية (afin que, pour que)؛ (3) في التمني المستقل (Que notre solidarité triomphe !).',
				'استعمالات Conditionnel في النداء: (1) النصيحة الملطّفة (Il faudrait, nous devrions + infinitif)؛ (2) التحذير من عواقب السلبية في نظام Si + Imparfait -> Conditionnel présent (ex. : Si nous restions indifférents, ce patrimoine disparaîtrait).',
				'النظام الشرطي للوعد (Système hypothétique positif): Si + Présent -> Futur simple (أو Impératif). مثال: Si chacun réduit son gaspillage, nos ressources suffiront à tous.'
			],
			visualSvg: svgFrenchTenseTimeline({
				title: 'Système hypothétique dans l’Appel (BAC LE)',
				tenseName: 'Si + Présent (Promesse) vs Si + Imparfait (Alerte)',
				formula: 'Si + Présent -> Futur | Si + Imparfait -> Conditionnel présent',
				activeZone: 'future',
				example: 'Si nous agissons, nous réussirons. Si nous hésitions, nous échouerions.',
				markers: 'si, à condition que (+ subj.), au cas où (+ cond.)'
			}),
			visualCaptionAr: 'التقابل بين الشرط الواقعي (الوعد بالنجاح) والشرط الافتراضي (التحذير من التقاعس) في النداء.',
			examples: [
				{
					problemAr: 'Précisez la nuance de « conjurons » dans : « Nous vous conjurons de protéger ces bibliothèques séculaires. »',
					solutionAr: 'Verbe performatif très fort (au présent avec « nous ») : exprime un appel solennel et pressant.'
				},
				{
					problemAr: 'Mettez les verbes aux temps convenables : « Si les citoyens (négliger) le tri des déchets, nos villes (perdre) leur beauté. » (Hypothèse à l’imparfait)',
					solutionAr: 'Si les citoyens négligeaient le tri des déchets, nos villes perdraient leur beauté.'
				},
				{
					problemAr: 'Transformez en souhait indépendant au subjonctif : « Nous souhaitons que l’esprit d’entraide demeure vivant. »',
					solutionAr: 'Que l’esprit d’entraide demeure vivant !'
				}
			],
			watchOutAr: 'قاعدة حديدية في البكالوريا: لا نضع أبداً Conditionnel ولا Futur مباشرة بعد « Si » الشرطية! نكتب « Si nous protégions » (Imparfait) وليس « Si nous protégerions » (خطأ شائع جداً)!'
		},
		practice: [
			{
				questionAr: 'Dans quelle phrase le verbe « exhorter » a-t-il véritablement une valeur performative ?',
				options: [
					'Hier, le directeur a exhorté les élèves à lire.',
					'Nous vous exhortons dès aujourd’hui à préserver les oasis.',
					'Le président exhortera le public demain.',
					'Autrefois, les anciens exhortaient les jeunes.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفعل في الماضي (Passé composé) فيصف حدثاً سابقاً فقط.',
					'ممتاز: متكلم (Nous) + مضارع (exhortons) = إنجاز النداء لحظة النطق به.',
					'خطأ: في الغائب والمستقبل.',
					'خطأ: في الغائب والماضي الناقص.'
				],
				explanationAr: 'يتحقق الفعل الإنجازي باستعمال المتكلم (je/nous) وزمن المضارع.'
			},
			{
				questionAr: 'Complétez sans faute : « Si nous .......... passifs devant le gaspillage, les générations futures en souffriraient. » (rester)',
				options: ['restions', 'resterions', 'resterons', 'restons'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: بعد Si ومع Conditionnel présent (souffriraient) نضع Imparfait (restions).',
					'خطأ: ممنوع وضع Conditionnel بعد Si الشرطية!',
					'خطأ: ممنوع وضع Futur بعد Si الشرطية!',
					'خطأ: المضارع يتوافق مع Futur لا مع Conditionnel.'
				],
				explanationAr: 'التوافق الشرطي: Si + Imparfait -> Conditionnel présent.'
			},
			{
				questionAr: 'Quelle nuance exprime « Il faudrait que nous agissions » par rapport à « Il faut que nous agissions » ?',
				options: [
					'Un fait déjà achevé dans le passé',
					'Une interdiction absolue',
					'Une exhortation plus polie et atténuée (conditionnel d’atténuation)',
					'Une simple description neutre'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: ليس ماضياً.',
					'خطأ: ليس منعاً.',
					'صحيح: الشرطي « Il faudrait » يلطّف صيغة الوجوب ويجعلها أكثر لباقة وإقناعاً.',
					'خطأ: يحمل دعوة للفعل.'
				],
				explanationAr: 'يُستخدم Conditionnel d’atténuation لتقديم النصيحة أو التوصية بلهجة مهذبة.'
			},
			{
				questionAr: 'Dans « Que chaque citoyen devienne le gardien de sa cité ! », quel mode est employé et quelle est sa valeur ?',
				options: [
					'Indicatif — constat neutre',
					'Conditionnel — doute historique',
					'Passé simple — fait achevé',
					'Subjonctif présent — souhait vibrant et exhortation solennelle'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: devienne ليس في المرفوع.',
					'خطأ: ليس في الشرطي.',
					'خطأ: ليس ماضياً بسيطاً.',
					'أحسنت: جملة مستقلة تبدأ بـ Que + subjonctif تعبر عن تمنٍ قوي ودعوة حماسية.'
				],
				explanationAr: 'يمكن استعمال Subjonctif في جملة مستقلة مسبوقة بـ Que للتعبير عن التمني أو الأمر للغائب.'
			},
			{
				questionAr: 'Complétez correctement après « au cas où » : « Préparons des réserves d’eau au cas où la sécheresse .......... encore. » (durer)',
				options: ['durerait', 'dure', 'dura', 'durera'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: « au cas où » يتبعه دائماً Conditionnel (durerait).',
					'خطأ: لا نضع Indicatif بعد au cas où.',
					'خطأ: ليس ماضياً بسيطاً.',
					'خطأ: لا نضع Futur بعد au cas où.'
				],
				explanationAr: 'التعبير الفرضي « au cas où » يفرض دائماً صيغة Conditionnel.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 3: L’implication du destinataire (nous inclusif, vous, impératif, questions oratoires)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_le_t3_implication_destinataire',
		slug: 'fre-3as-le-t3-implication-destinataire',
		grade: '3as_le',
		yearSubjectId: 788,
		trimesterId: 't3',
		sequenceId: 'projet3',
		sequenceTitleAr: 'المشروع 3: L’Appel (الهندسة البلاغية للنداء والتدريب الشامل — لغات أجنبية)',
		order: 3,
		titleAr: 'إشراك المتلقي وتعبئته في النداء (Nous inclusif, vous, impératif et questions oratoires)',
		objectives: [
			'تحليل استراتيجيات إشراك المخاطَب في نصوص النداء: النداء المباشر (Vocatif)، ضمير « vous »، ضمير « nous inclusif »، والأسئلة البلاغية الاستنهاضية',
			'التمييز الدقيق بين « nous exclusif » (المرسلون فقط: Nous, membres de l’association, vous appelons) و « nous inclusif » (المرسلون + القراء: Protégeons notre terre)',
			'إتقان تصريف الأفعال الأمرية الشاذة والضمائرية في صيغتي الإثبات والنفي (Mobilisons-nous ! Ne nous résignons pas !)'
		],
		keywordsAr: ['Nous inclusif', 'Nous exclusif', 'Interpellation', 'Vocatif', 'Impératif négatif', 'Question oratoire'],
		discover: {
			scenarioAr:
				'في نص نداء واحد قد يرد الضمير « nous » بقيمتين مختلفتين تماماً! لاحظ: « Nous vous appelons à agir » (هنا nous = الجمعية فقط، أي exclusif) ثم في الجملة التالية: « Unissons-nous pour sauver notre patrimoine » (هنا nous = الجمعية + أنتم جميعاً، أي inclusif)! سؤال دقيق يتكرر كثيراً في BAC LE.',
			svg: svgFrenchGrammarMap({
				title: 'Stratégies d’implication du destinataire (BAC LE)',
				rootLabel: 'Mobiliser le lecteur',
				rootSub: 'Distinguer chaque marque énonciative d’appel',
				branches: [
					{
						label: 'Nous exclusif',
						rule: 'Auteurs seuls face au public',
						example: 'Nous (collectif) vous invitons...'
					},
					{
						label: 'Nous inclusif',
						rule: 'Auteurs + destinataires unis',
						example: 'Sauvons notre patrimoine commun !'
					},
					{
						label: 'Vocatif & Vous',
						rule: 'Interpellation directe ciblée',
						example: 'Étudiants, votre rôle est décisif !'
					},
					{
						label: 'Question oratoire',
						rule: 'Éveiller la responsabilité morale',
						example: 'Resterons-nous les bras croisés ?'
					}
				]
			}),
			steps: [
				{
					promptAr: 'في الجملة: « Nous, enseignants et chercheurs, vous invitons à protéger ces manuscrits. » هل « Nous » هنا inclusif أم exclusif؟',
					hintAr: 'لاحظ وجود ضمير المخاطَب « vous » مستقلاً عن « Nous »!',
					expectedInput: 'Nous exclusif (يعود على الأساتذة والباحثين المرسلين فقط دون المخاطَبين)',
					revealAr: 'متى ما ظهر « nous » إلى جانب « vous » كفاعِل ومفعول (Nous vous appelons)، فإن « nous » يكون exclusif يمثل الجهة المُطلقة للنداء وحدها.'
				},
				{
					promptAr: 'حوّل الأمر الضمائري المثبت « Résignons-nous ! » إلى النهي (Impératif négatif).',
					hintAr: 'في النفي يعود الضمير « nous » قبل الفعل وتُحذف الشرطة!',
					expectedInput: 'Ne nous résignons pas !',
					revealAr: 'قاعدة أساسية في BAC LE: في الأمر المثبت يكون الضمير بعد الفعل بشرطة (Mobilisons-nous !)، وفي الأمر المنفي يعود قبل الفعل بلا شرطة (Ne nous résignons pas ! Ne vous découragez pas !).'
				},
				{
					promptAr: 'ما الأثر البلاغي للسؤال الاستنهاضي: « Accepterons-nous de léguer à nos enfants une terre aride et silencieuse ? »؟',
					hintAr: 'يوقظ الضمير الأخلاقي ويضطر القارئ لرفض هذه النتيجة القاتمة.',
					expectedInput: 'استنهاض الضمير وإشراك المتلقي عبر سؤال بلاغي يدفعه لرفض اللامبالاة والتحرك فوراً',
					revealAr: 'السؤال الخطابي بضمير « nous inclusif » والمستقبل يهزّ وجدان القارئ ويدعوه لتحمل مسؤوليته.'
				}
			]
		},
		summary: {
			rulesAr: [
				'التمييز الدقيق لضمير الجمع « nous » في النداء: (1) Nous exclusif = المرسل فقط حين يخاطب « vous » (ex. : Nous vous exhortons)؛ (2) Nous inclusif = المرسل + القراء معاً لتذويب المسافة وإشاعة روح التضامن (ex. : Agissons ensemble, notre avenir).',
				'الأمر المثبت والمنفي للأفعال الضمائرية: مثبت -> الفعل + (-) + الضمير (Engagez-vous ! Mobilisons-nous ! Lève-toi !) | منفي -> Ne + الضمير + الفعل + pas (Ne vous résignez pas ! Ne nous taisons pas ! Ne te décourage pas !).',
				'النداء المباشر (L’apostrophe / Le vocatif): مخاطبة فئة محددة في مطلع الجملة لإشعارها بأنها معنية مباشرة (Chers étudiants, Citoyens conscients, Amis du patrimoine...).',
				'تضافر السؤال الخطابي والتكرار الاستهلالي (Anaphore + question oratoire): يضاعف الشحنة التعبوية للنص ويحوّل القارئ من متفرج إلى فاعل.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Impératif affirmatif vs négatif (BAC LE)',
				subtitle: 'Attention à la place du pronom et au trait d’union',
				columns: [
					{
						header: 'Affirmatif',
						rule: 'Verbe + (-) + pronom',
						examples: 'Mobilisons-nous ! Engagez-vous !'
					},
					{
						header: 'Négatif',
						rule: 'Ne + pronom + verbe + pas',
						examples: 'Ne nous résignons pas !'
					},
					{
						header: 'Irréguliers',
						rule: 'être / avoir / savoir / vouloir',
						examples: 'Soyez / Ayons / Sachez / Veuillez'
					}
				]
			}),
			visualCaptionAr: 'مقارنة الأمر المثبت والمنفي والأفعال الشاذة في نصوص النداء.',
			examples: [
				{
					problemAr: 'Précisez la valeur de chaque « nous » : « Nous vous appelons à agir : unissons-nous pour défendre notre patrimoine ! »',
					solutionAr: 'Le premier « Nous » est exclusif (les auteurs de l’appel face à « vous ») ; le second (« unissons-nous », « notre ») est inclusif (auteurs et destinataires réunis).'
				},
				{
					problemAr: 'Mettez à l’impératif négatif (2e pers. plur.) : « Il ne faut pas que vous vous découragiez devant les obstacles. »',
					solutionAr: 'Ne vous découragez pas devant les obstacles !'
				},
				{
					problemAr: 'Relevez la formule d’interpellation (vocatif) et l’effet produit : « Jeunes lycéens d’Algérie, l’avenir de nos bibliothèques est entre vos mains ! »',
					solutionAr: 'Vocatif : « Jeunes lycéens d’Algérie ». Effet : cibler directement la jeunesse pour la valoriser et éveiller son sens des responsabilités.'
				}
			],
			watchOutAr: 'في الأمر المفرد الضمائري المثبت نكتب « Engage-toi ! » (بـ toi)، أما في النفي فتعود « toi » إلى « te »: « Ne te décourage pas ! » (وليس Ne toi décourage pas!).'
		},
		practice: [
			{
				questionAr: 'Dans : « Nous, membres du club écologique, vous invitons à rejoindre nos ateliers », quelle est la valeur du pronom « Nous » ?',
				options: [
					'Nous inclusif (incluant tous les lecteurs)',
					'Nous exclusif (désignant uniquement les membres du club qui lancent l’appel)',
					'Un pronom impersonnel',
					'Un pronom relatif'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: المخاطبون يمثّلهم الضمير المستقل « vous ».',
					'ممتاز: « Nous » هنا exclusif لأنه يحيل إلى الجهة المرسِلة فقط (أعضاء النادي).',
					'خطأ: ليس ضميراً غير شخصي.',
					'خطأ: ضمير شخصي لا موصول.'
				],
				explanationAr: 'حين يقابل « nous » ضمير المخاطب « vous »، يكون « nous » حصرياً للمرسلين (exclusif).'
			},
			{
				questionAr: 'Mettez à l’impératif négatif : « Résignons-nous face à l’indifférence ! »',
				options: [
					'Ne nous résignons pas face à l’indifférence !',
					'Ne résignons-nous pas face à l’indifférence !',
					'Nous ne résignons pas face à l’indifférence !',
					'Ne vous résignons pas face à l’indifférence !'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح 100%: يعود الضمير « nous » قبل الفعل بين Ne و الفعل بدون شرطة.',
					'خطأ: في الأمر المنفي لا يبقى الضمير بعد الفعل.',
					'خطأ: هذه جملة خبرية بفاعل ظاهر.',
					'خطأ: عدم تطابق بين vous و résignons.'
				],
				explanationAr: 'صيغة الأمر الضمائري المنفي هي دائماً: Ne + pronom réfléchi + verbe + pas.'
			},
			{
				questionAr: 'Choisissez la forme correcte à l’impératif négatif (2e pers. singulier) de « se décourager » :',
				options: [
					'Ne toi décourage pas !',
					'Ne décourage-toi pas !',
					'Ne te décourage pas !',
					'Ne te décourages pas !'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: « toi » تصبح « te » قبل الفعل.',
					'خطأ: الضمير يسبق الفعل في النفي.',
					'صحيح: الضمير « te » قبل الفعل مع حذف حرف s من الفوج الأول.',
					'خطأ: لا نضيف s في أمر الفوج الأول المفرد.'
				],
				explanationAr: 'في الأمر المفرد المنفي نكتب « te » قبل الفعل ونحذف s من أفعال الفوج الأول.'
			},
			{
				questionAr: 'Quel effet rhétorique produit la question « Laisserons-nous nos oasis s’ensabler sous nos yeux ? » dans un appel ?',
				options: [
					'Demander une mesure géométrique précise',
					'Proposer d’abandonner les oasis',
					'Rester neutre et détaché du problème',
					'Éveiller la conscience morale des destinataires pour les pousser à refuser la passivité'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: ليس سؤالاً تقنياً.',
					'خطأ: العكس تماماً، يدين الإهمال.',
					'خطأ: ضمير « nous » والاستفهام الإنكاري يعبران عن التزام قوي.',
					'أحسنت: سؤال بلاغي يستنهض الضمير ويدفع القارئ إلى التحرك.'
				],
				explanationAr: 'الأسئلة البلاغية في النداء ترفض اللامبالاة وتشرك المتلقي وجدانياً.'
			},
			{
				questionAr: 'Quelle forme polie de l’impératif de « vouloir » emploie-t-on dans un appel officiel ou solennel ?',
				options: ['Veuillez (agréer / soutenir)', 'Voulez', 'Voulons', 'Voudrez'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الصيغة الرسمية المهذبة من vouloir في الأمر هي « Veuillez + infinitif ».',
					'خطأ: ليست صيغة الأمر الرسمية.',
					'خطأ: غير مستعملة للتأدب الرسمي.',
					'خطأ: هذا مستقبل بسيط.'
				],
				explanationAr: 'تُستعمل « Veuillez + infinitif » في النداءات والرسائل الرسمية لإظهار الاحترام الرفيع.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 4: Synthèse critique et justification d’un point de vue (BAC LE)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_le_t3_synthese_critique_reflexion',
		slug: 'fre-3as-le-t3-synthese-critique-reflexion',
		grade: '3as_le',
		yearSubjectId: 788,
		trimesterId: 't3',
		sequenceId: 'projet3',
		sequenceTitleAr: 'المشروع 3: L’Appel (الهندسة البلاغية للنداء والتدريب الشامل — لغات أجنبية)',
		order: 4,
		titleAr: 'سؤال التركيب النقدي وتبرير الرأي الشخصي في بكالوريا لغات أجنبية (Question de réflexion)',
		objectives: [
			'الارتقاء بالإجابة عن السؤال الأخير في فهم النص (Question de synthèse / réflexion) إلى مستوى فكري ولغوي يليق بشعبة اللغات الأجنبية',
			'صياغة فقرة مركّزة من 4 إلى 5 أسطر تتضمن: موقفاً صريحاً أو دقيقاً (nuancé)، حجتين مختلفتين، ومثالاً ملموساً من الواقع الثقافي أو الاجتماعي',
			'تفادي الإجابات السطحية والتعميمات والنسخ الحرفي من النص المصدر'
		],
		keywordsAr: ['Question de réflexion', 'Synthèse critique', 'Point de vue nuancé', 'Justification', 'BAC LE'],
		discover: {
			scenarioAr:
				'في بكالوريا اللغات الأجنبية، يُختم قسم الفهم بسؤال تفكير نقدي مفتوح (مثل: « Partagez-vous l’optimisme de l’auteur ? » أو « Comment les jeunes peuvent-ils préserver les manuscrits anciens ? Développez votre point de vue en quatre ou cinq lignes. »). إجابة متقنة هنا تضمن نقطة ونصفاً إلى نقطتين بسهولة.',
			svg: svgFrenchWritingBlueprint({
				title: 'Formule 4-5 lignes pour la Question de Réflexion (BAC LE)',
				steps: [
					{
						stage: '1. Prise de position',
						detail: 'Adhésion claire ou nuance mesurée (Certes..., toutefois...)'
					},
					{
						stage: '2. Argument 1 + Lien',
						detail: 'En effet / Tout d’abord + raison analytique personnelle'
					},
					{
						stage: '3. Argument 2 / Exemple',
						detail: 'De plus / Par exemple + cas concret (Algérie, école, société)'
					},
					{
						stage: '4. Chute brève',
						detail: 'Ainsi + formule conclusive concise et soignée'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الفارق بين إجابة متوسطة وإجابة ممتازة لسؤال « Pensez-vous que l’engagement bénévole des jeunes puisse vraiment changer un quartier ? »؟',
					hintAr: 'الإجابة المتوسطة تكتفي بجملة عامة؛ والممتازة توضح « كيف » بمثالين ملموسين ولغة راقية.',
					expectedInput: 'الإجابة الممتازة تقدم موقفاً واضحاً وحجتين متكاملتين ومثالاً ملموساً بربط منطقي راقٍ في 4-5 أسطر',
					revealAr: 'مثال ممتاز: يربط بين الأثر المادي (نظافة، تشجير، دعم دراسي) والأثر التربوي (بناء الحس المدني والقدوة للأجيال الأصغر).'
				},
				{
					promptAr: 'هل يجب دائماً أن نوافق الكاتب 100% في سؤال الرأي، أم يجوز تقديم رأي متوازن (nuancé)؟',
					hintAr: 'في شعبة اللغات الأجنبية، يُثمن المصحح كثيراً الموقف الدقيق المتزن متى كان معلّلاً.',
					expectedInput: 'يجوز الموافقة الكاملة أو التعديل المتزن (Certes, je partage..., toutefois il convient aussi de...) بشرط التعليل السليم',
					revealAr: 'الشرط الوحيد هو احترام القيم والتعليل المنطقي المتماسك بلغة سليمة دون تناقض.'
				},
				{
					promptAr: 'أي رابط نستخدمه لتقديم الجملة الختامية القصيرة في سؤال التركيب؟',
					hintAr: 'روابط قصيرة وموجزة تناسب فقرة من 4 أسطر.',
					expectedInput: 'Ainsi, / C’est pourquoi / Dès lors,',
					revealAr: '« Ainsi, l’engagement des jeunes transforme à la fois leur environnement et leur propre maturité citoyenne. »'
				}
			]
		},
		summary: {
			rulesAr: [
				'البنية المثالية لسؤال التفكير النقدي في BAC LE (4 إلى 5 أسطر / 55 إلى 75 كلمة): (1) إعلان الموقف بوضوح؛ (2) الحجة الأولى بـ « En effet »؛ (3) الحجة الثانية أو المثال الواقعي بـ « De plus / Par exemple »؛ (4) جملة ختامية مركزة بـ « Ainsi ».',
				'أربع عبارات راقية لافتتاح الرأي: (1) « Je souscris pleinement à cet appel dans la mesure où... »؛ (2) « Personnellement, j’estime que cette thèse est pertinente car... »؛ (3) « Certes, l’idée avancée est séduisante ; toutefois, il importe de noter que... »؛ (4) « À mon sens, une telle démarche s’avère indispensable... ».',
				'ممنوعات سؤال التركيب: النسخ الحرفي لجمل النص، الجواب بـ Oui/Non وحده، كتابة فقرة مطولة تستنزف وقت الإنتاج الكتابي، أو الإهمال الإملائي.',
				'في الأسئلة التي تطلب اقتراح حلول (Proposez des solutions)، نوّع المستويات: حل فردي/سلوكي + حل مؤسسي/تربوي لتُظهر نضجاً تحليلياً.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Trois registres de justification (BAC LE)',
				rootLabel: 'Enrichir sa réponse de synthèse',
				rootSub: 'Diversifier ses angles d’analyse en 4-5 lignes',
				branches: [
					{
						label: 'Angle moral / civique',
						rule: 'Responsabilité, devoir, respect',
						example: 'Préserver un héritage commun.'
					},
					{
						label: 'Angle éducatif',
						rule: 'Sensibilisation, école, clubs',
						example: 'Former des jeunes lucides.'
					},
					{
						label: 'Angle pratique',
						rule: 'Actions concrètes et durables',
						example: 'Numérisation, volontariat, tri.'
					}
				]
			}),
			visualCaptionAr: 'تنويع زوايا التعليل (أخلاقي، تربوي، عملي) يمنح إجابة التركيب عمقاً مميزاً في BAC LE.',
			examples: [
				{
					problemAr: 'Question : « Selon vous, la numérisation suffit-elle à sauver les manuscrits anciens d’Algérie ? Justifiez en 4 à 5 lignes. »',
					solutionAr: 'À mon sens, la numérisation constitue une étape décisive, mais elle ne suffit pas à elle seule. En effet, si la copie numérique rend accessibles aux chercheurs les trésors de Tlemcen, d’Adrar ou de Constantine, il demeure indispensable de restaurer matériellement les originaux menacés par l’humidité. Ainsi, l’alliance entre technologie moderne et conservation artisanale garantira la survie durable de cette mémoire.'
				},
				{
					problemAr: 'Question : « Partagez-vous l’idée que l’apprentissage d’une langue étrangère enrichit aussi la compréhension de sa propre culture ? »',
					solutionAr: 'Je partage entièrement ce point de vue dans la mesure où la découverte d’une autre langue affine notre regard comparatif. En effet, traduire une nuance ou une valeur oblige à mieux maîtriser les ressources de sa langue maternelle. Dès lors, loin d’affaiblir notre identité, le plurilinguisme nous permet de la faire rayonner avec plus d’éloquence.'
				},
				{
					problemAr: 'Repérez l’erreur méthodologique : « Oui je suis d’accord avec l’auteur parce que le texte dit la vérité. »',
					solutionAr: 'Réponse trop brève, circulaire et dépourvue d’argument personnel : il faut expliquer POURQUOI en s’appuyant sur des raisons propres.'
				}
			],
			watchOutAr: 'استثمر في سؤال التفكير النقدي بعض المفردات الراقية (dans la mesure où, il demeure indispensable, dès lors) لكن دون تصنّع يوقعك في خطأ نحوي!'
		},
		practice: [
			{
				questionAr: 'Quelle ouverture témoigne d’une maîtrise linguistique soutenue pour répondre à une question de réflexion en BAC LE ?',
				options: [
					'Je souscris pleinement à cette analyse dans la mesure où...',
					'Oui c’est bien vrai tout ça.',
					'Le texte a raison et voilà.',
					'Je n’ai rien de spécial à dire.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: صيغة أكاديمية راقية (souscrire à... dans la mesure où...) ترفع التقييم.',
					'خطأ: أسلوب عامي وسطحي.',
					'خطأ: غياب التعليل واللغة الأكاديمية.',
					'خطأ: تفقد النقطة كاملة.'
				],
				explanationAr: 'الفعل « souscrire à » والرابط « dans la mesure où » من بصمات اللغة الراقية في LE.'
			},
			{
				questionAr: 'Quelle est l’étendue idéale d’une réponse à la question de synthèse en BAC Langues Étrangères ?',
				options: [
					'Un seul mot (Oui ou Non)',
					'Quatre à cinq lignes structurées (environ 55 à 75 mots)',
					'Deux pages entières',
					'Une recopie de trois phrases du texte'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: غير كافٍ إطلاقاً.',
					'صحيح: 4 إلى 5 أسطر محكمة تكفي للموقف والحجتين والمثال والخاتمة الموجزة.',
					'خطأ: يهدر وقت الإنتاج الكتابي.',
					'خطأ: النسخ الحرفي مرفوض.'
				],
				explanationAr: 'التركيز والعمق في 4 إلى 5 أسطر هو المعيار الأمثل في BAC LE.'
			},
			{
				questionAr: 'Si l’on vous demande de proposer deux mesures pour réduire le gaspillage alimentaire, quelle approche est la plus convaincante ?',
				options: [
					'Répéter la même mesure deux fois avec des synonymes',
					'Dire simplement qu’il ne faut pas gaspiller',
					'Combiner un geste quotidien familial (achat raisonné) et une action éducative/solidaire (sensibilisation et partage)',
					'Changer de sujet pour parler du sport'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: التكرار لا يقدم حلين مختلفين.',
					'خطأ: عام جداً بلا حل عملي.',
					'ممتاز: التنويع بين المستوى الفردي والمستوى التربوي/التضامني يبرز نضجك الفكري.',
					'خطأ: خروج عن الموضوع.'
				],
				explanationAr: 'تعدد مستويات الحلول (فردي + جماعي/مؤسسي) يقنع المصحح بعمق التفكير.'
			},
			{
				questionAr: 'Pourquoi une réponse nuancée (« Certes..., toutefois... ») est-elle particulièrement appréciée en BAC LE ?',
				options: [
					'Parce qu’elle évite de répondre à la question',
					'Parce qu’elle interdit l’usage des exemples',
					'Parce qu’elle allonge la copie sans raison',
					'Parce qu’elle démontre un esprit critique mature capable d’examiner plusieurs facettes d’un problème'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: الجواب المتزن يجيب بوضوح ودقة.',
					'خطأ: يُدعم بالأمثلة أيضاً.',
					'خطأ: يقوم على دقة التحليل لا الحشو.',
					'أحسنت: التوازن النقدي يعكس النضج الفكري المنشود في شعبة اللغات الأجنبية.'
				],
				explanationAr: 'النقد المتزن يبرهن على قدرة المترشح على التفكير المركب واللغوي الراقي.'
			},
			{
				questionAr: 'Quel connecteur clôt sobrement une réponse de synthèse de quatre lignes ?',
				options: ['Ainsi / Dès lors', 'Premièrement', 'Par exemple', 'Bien que'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: « Ainsi » و « Dès lors » تختمان الفقرة باستنتاج أنيق ومختصر.',
					'خطأ: للبدء لا للختام.',
					'خطأ: للتمثيل لا للختام.',
					'خطأ: للاستدراك وسط الكلام.'
				],
				explanationAr: 'الجملة الختامية القصيرة بـ Ainsi / Dès lors تعطي الفقرة اكتمالاً جمالياً ومنطقياً.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 5: Entraînement complet BAC LE (12 pts Compréhension + 8 pts Production, 03h30)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_le_t3_entrainement_bac_le',
		slug: 'fre-3as-le-t3-entrainement-bac-le',
		grade: '3as_le',
		yearSubjectId: 788,
		trimesterId: 't3',
		sequenceId: 'projet3',
		sequenceTitleAr: 'المشروع 3: L’Appel (الهندسة البلاغية للنداء والتدريب الشامل — لغات أجنبية)',
		order: 5,
		titleAr: 'التدريب المنهجي الكامل لبكالوريا لغات أجنبية (03h30، المعامل 5: 12 + 8 = 20)',
		objectives: [
			'ضبط التخطيط الزمني الدقيق لمدة ثلاث ساعات ونصف (210 دقيقة) لاستثمار المعامل 5 بأعلى مردودية ممكنة',
			'اتخاذ القرار الاستراتيجي بين التقرير النقدي (CRC — 8 pts) والإنتاج الحر (Dissertation / Appel — 8 pts) وفق معطيات كل موضوع',
			'تطبيق قائمة التحقق اللغوي الرفيع قبل التسليم (المطابقة المعقدة، الصيغ الفعلية الأربع، الترقيم، وتنويع الروابط)'
		],
		keywordsAr: ['BAC LE 03h30', 'Coefficient 5', '12+8=20', 'Gestion du temps', 'Relecture experte'],
		discover: {
			scenarioAr:
				'امتحان الفرنسية في شعبة اللغات الأجنبية (معامل 5، المدة 03 h 30) هو إحدى أهم محطات البكالوريا! لديك 210 دقيقة كاملة: وقت كافٍ لتفحص الموضوعين برويّة، الإجابة المتقنة على 12 نقطة فهم وبناء لغوي، وتحرير تحفة مكتوبة على 8 نقاط كاملة مع مراجعة دقيقة.',
			svg: svgFrenchWritingBlueprint({
				title: 'Plan de bataille des 03 h 30 (210 min — BAC LE)',
				steps: [
					{
						stage: '1. Choix réfléchi (20 min)',
						detail: 'Analyser les 2 textes, les questions de langue et les 2 sujets de 8 pts'
					},
					{
						stage: '2. Compréhension (85 min)',
						detail: 'Traiter les 12 pts (6 lecture + 6 langue) avec justifications exactes'
					},
					{
						stage: '3. Production 8 pts (85 min)',
						detail: 'Plan détaillé au brouillon + rédaction soignée (180-220 mots)'
					},
					{
						stage: '4. Relecture experte (20 min)',
						detail: 'Vérifier participes passés, subjonctif, conditionnel, accords, ponctuation'
					}
				]
			}),
			steps: [
				{
					promptAr: 'لماذا يخصص مترشح اللغات الأجنبية 85 دقيقة كاملة للإنتاج الكتابي (مثل وقت الفهم تماماً)؟',
					hintAr: 'احسب قيمة الـ 8 نقاط عند ضربها في المعامل 5!',
					expectedInput: 'لأن الإنتاج الكتابي يمثل 40% من العلامة (8/20، أي 40 نقطة موزونة) ويحتاج تخطيطاً وتحريراً متقناً',
					revealAr: 'مع 03 h 30، لا عذر للتسرع في الإنتاج الكتابي! المسودة المخططة والتحرير الهادئ يصنعان فارقاً حاسماً في معدل البكالوريا.'
				},
				{
					promptAr: 'ما القاعدة الحاسمة عند ترددك بين Sujet 1 (التاريخ) و Sujet 2 (النقاش أو النداء)؟',
					hintAr: 'قيّم ثلاثة معايير معاً: فهم النص، أسئلة اللغة (6 نقاط)، وثراء أفكارك في سؤال الـ 8 نقاط.',
					expectedInput: 'اختر الموضوع الذي تحصد فيه أعلى مجموع متوقع عبر النص + اللغة + الإنتاج الكتابي معاً (وليس النص وحده!)',
					revealAr: 'كثيراً ما يختار الطالب نصاً سهلاً ثم يتعثر في أسئلة اللغة أو موضوع الـ 8 نقاط؛ لذا اقرأ الورقتين من أول سطر إلى آخر سطر خلال أول 20 دقيقة.'
				},
				{
					promptAr: 'في آخر 20 دقيقة (Relecture experte)، ما أخطر 4 أفخاخ لغوية يجب اصطيادها وتصحيحها؟',
					hintAr: 'فكّر في: اسم المفعول مع avoir، المنصوب بعد bien que / il faut que، الشرطي بعد si، والتوافق مع الفاعل البعيد.',
					expectedInput: 'مطابقة participe passé، تصريف subjonctif، عدم وضع conditionnel بعد si، والتفرقة بين quoique / quoi que و ce / se',
					revealAr: 'القراءة الأخيرة بتركيز لغوي (جملةً جملةً) تنقذ عادةً من نقطة ونصف إلى نقطتين ونصف من الأخطاء غير المقصودة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'المعطيات الرسمية لـ BAC 3AS Langues Étrangères: المدة 03 h 30 (210 دقيقة) | المعامل 5 | التوزيع: 12 نقطة Compréhension de l’écrit (6 قراءة وفهم + 6 بناء لغوي) + 8 نقاط Production écrite.',
				'إدارة الوقت المثلى (210 د): 20 د لاختيار الموضوع | 85 د للـ 12 نقطة (مسودة سريعة + تحرير منظم ومعلل) | 85 د للإنتاج الكتابي (20 د خطة ومسودة + 65 د تحرير نظيف 180–220 كلمة) | 20 د للمراجعة النهائية الدقيقة.',
				'قائمة الفحص النحوي الرفيع (Check-list LE): (1) هل طابقت اسم المفعول مع être ومع الـ COD المتقدم مع avoir؟ (2) هل استعملت Subjonctif بعد bien que / quoique / avant que / il faut que؟ (3) هل تجنبت « malgré que » و« si + conditionnel »؟ (4) هل نوّعت الروابط والمفردات دون تكرار ممل؟',
				'في التقرير النقدي (8 pts) احرص على الفقرات الثلاث (تقديم + تلخيص تحليلي + نقد معمق للمضمون والشكل)، وفي الإنتاج الحر (8 pts) احرص على الهيكلة الرباعية للمقال أو الثلاثية للنداء.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Tableau de bord BAC 3AS LE',
				subtitle: 'Coefficient 5 — Durée 03 h 30 — Total 20 points',
				columns: [
					{
						header: 'Compréhension (6)',
						rule: 'Statut, visée, synthèse 4-5 l.',
						examples: 'Précision + justification'
					},
					{
						header: 'Langue (6)',
						rule: 'Passifs, DIL, modes, figures',
						examples: 'Maîtrise syntaxique exacte'
					},
					{
						header: 'Production (8)',
						rule: 'CRC expert ou Essai/Appel',
						examples: '180-220 mots, style soutenu'
					}
				]
			}),
			visualCaptionAr: 'لوحة القيادة الشاملة للنجاح بامتياز في بكالوريا الفرنسية شعبة اللغات الأجنبية.',
			examples: [
				{
					problemAr: 'Corrigez les 3 erreurs subtiles : « Malgré que les réformes ont commencé tôt, les obstacles qu’ils avaient rencontré furent nombreux ; si ils avaient abandonné, tout aurait échoué. »',
					solutionAr: '« Bien que les réformes aient commencé tôt, les obstacles qu’ils avaient rencontrés furent nombreux ; s’ils avaient abandonné, tout aurait échoué. » (Bien que + subjonctif ; accord de rencontrés avec COD « que » ; élision s’ils).'
				},
				{
					problemAr: 'Vérifiez l’accord et le mode : « Il faut que nous soyons unis afin que les manuscrits que nous avons préservé traversent les siècles. »',
					solutionAr: '« ... les manuscrits que nous avons préservés traversent les siècles. » (COD « que » = les manuscrits, masc. plur.).'
				},
				{
					problemAr: 'Comment optimiser le brouillon pour la production de 8 points en 20 minutes ?',
					solutionAr: 'Ne rédigez pas tout deux fois : écrivez au brouillon le plan détaillé, les idées/exemples clés, la problématique et la conclusion, puis rédigez soigneusement au propre en gardant 20 minutes de relecture.'
				}
			],
			watchOutAr: 'لا تكتب موضوع الـ 8 نقاط كاملاً في المسودة ثم تعيد نسخه في آخر ربع ساعة بتوتر! خطّط جيداً في المسودة (عناوين الفقرات، الحجج، الأمثلة، الروابط)، ثم حرّر بهدوء ونظافة على ورقة الإجابة.'
		},
		practice: [
			{
				questionAr: 'Combien de points pondérés (avec le coefficient 5) représente la seule Production écrite (8/20) au BAC Langues Étrangères ?',
				options: ['40 points pondérés', '16 points pondérés', '24 points pondérés', '12 points pondérés'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: 8 نقاط × معامل 5 = 40 نقطة موزونة! لذا تستحق عناية وتخطيطاً فائقين.',
					'خطأ: 16 توافق معامل 2.',
					'خطأ: 24 توافق معامل 3.',
					'خطأ: 12 غير صحيحة.'
				],
				explanationAr: 'بمعامل 5، كل نقطة واحدة في الفرنسية تساوي 5 نقاط في المجموع العام للبكالوريا.'
			},
			{
				questionAr: 'Repérez la phrase 100 % correcte parmi les quatre propositions suivantes :',
				options: [
					'Si ils auraient révisé ensemble, ils réussiraient.',
					'S’ils avaient révisé ensemble, ils auraient réussi les épreuves qu’ils redoutaient.',
					'Si ils avaient révisé ensemble, ils auraient réussis les épreuves.',
					'S’ils réviseraient ensemble, ils auraient réussi.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا نكتب « Si ils » ولا نضع Conditionnel بعد Si.',
					'ممتاز: حذف العلة (S’ils)، توافق (Plus-que-parfait -> Conditionnel passé)، وعدم مطابقة réussi لأن الـ COD جاء بعده.',
					'خطأ: « Si ils » خطأ، و« réussis » لا يطابق لأن الـ COD (les épreuves) جاء بعد الفعل.',
					'خطأ: ممنوع Conditionnel بعد Si.'
				],
				explanationAr: 'التحقق من élision (s’ils) وتوافق الشرط وموقع الـ COD مهارة أساسية في المراجعة.'
			},
			{
				questionAr: 'Quelle méthode de brouillon est la plus efficace pendant les 03 h 30 de l’épreuve BAC LE ?',
				options: [
					'Ne jamais utiliser de brouillon du tout',
					'Recopier l’intégralité du devoir trois fois au brouillon',
					'Élaborer au brouillon un plan structuré (idées, exemples, transitions, introduction et conclusion) puis rédiger posément au propre',
					'Passer 3 heures sur la compréhension et 10 minutes sur la production de 8 points'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: غياب التخطيط يسبب التفكك والتشطيب.',
					'خطأ: يستنفد الوقت ويوقع في العجلة آخر الامتحان.',
					'صحيح: التخطيط المنظم في المسودة ثم التحرير الهادئ والمراجعة هو أذكى استثمار للوقت.',
					'خطأ: إهمال سؤال الـ 8 نقاط خطأ استراتيجي كبير.'
				],
				explanationAr: 'التوازن الزمني بين الـ 12 نقطة والـ 8 نقاط يضمن أعلى نتيجة إجمالية.'
			},
			{
				questionAr: 'Corrigez l’accord du participe passé : « Les archives historiques que l’historien a consulté sont précieuses. »',
				options: [
					'consulté (invariable)',
					'consultés',
					'consultée',
					'consultées'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: الـ COD سبق الفعل فيجب المطابقة.',
					'خطأ: كلمة archives مؤنث جمع (les archives historiques).',
					'خطأ: archives جمع وليست مفرداً.',
					'أحسنت: archives مؤنث جمع وسبقها COD « que »، فنكتب consultées.'
				],
				explanationAr: 'كلمة « archives » مؤنث جمع دائماً في الفرنسية (des archives précieuses).'
			},
			{
				questionAr: 'Lors du choix entre Sujet 1 et Sujet 2 durant les 20 premières minutes, quel critère doit primer ?',
				options: [
					'Le meilleur score global estimé sur l’ensemble (texte + questions de langue + production de 8 pts)',
					'Uniquement la longueur du titre',
					'Toujours choisir le Sujet 2 par habitude',
					'Choisir avant d’avoir lu les questions de langue et de production écrite'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: القرار العقلاني يجمع تقديرك للفقرات الثلاث معاً (فهم + لغة + إنتاج).',
					'خطأ: طول العنوان ليس معياراً.',
					'خطأ: كل دورة تختلف في نصوصها وأسئلتها.',
					'خطأ: يجب فحص الورقة كاملة قبل الحسم.'
				],
				explanationAr: 'القراءة الشاملة للورقتين في أول 20 دقيقة هي الخطوة الأذكى نحو الامتياز.'
			}
		]
	}
];
