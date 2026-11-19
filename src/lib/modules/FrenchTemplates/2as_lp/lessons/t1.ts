import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWordFormation,
	svgFrenchWritingBlueprint
} from '../../svg-french';

export const LESSONS_2AS_LP_T1: FrenchInteractiveLessonData[] = [
	{
		id: 'fre_lesson_2as_lp_t1_procedes_explicatifs',
		slug: 'fre-2as-lp-t1-procedes-explicatifs',
		grade: '2as_lp',
		yearSubjectId: 761,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: الخطاب الموضوعي (Le discours objectivé — العلم وتاريخ المعارف الإسلامية والتراث)',
		order: 1,
		titleAr: 'الوسائل التفسيرية والمنهجية البرهانية (Les procédés explicatifs et la démarche démonstrative)',
		objectives: [
			'التمييز الدقيق بين الوسائل التفسيرية الأساسية في النص العلمي والتاريخي (Définition, Dénomination, Reformulation, Illustration, Fonction)',
			'تحديد مراحل المنهجية البرهانية التفسيرية: طرح الإشكالية (Questionnement)، التفسير (Explication)، ثم الاستنتاج (Conclusion)',
			'توظيف الوسائل التفسيرية بفاعلية لفهم النصوص العلمية حول تاريخ المعارف الإسلامية والتراث الجزائري'
		],
		keywordsAr: [
			'procédés explicatifs',
			'définition',
			'reformulation',
			'illustration',
			'démarche démonstrative',
			'الوسائل التفسيرية'
		],
		discover: {
			scenarioAr:
				'في مقال علمي حول إسهامات العالم المسلم ابن الهيثم في علم البصريات، يشرح الكاتب مبدأ الحجرة المظلمة قائلاً: « La chambre noire, appelée aussi qamara, désigne un dispositif optique fermé ; autrement dit, une boîte percée d’un petit orifice qui projette une image inversée, telle que celle d’une bougie ou d’un minaret. » تأمل كيف يوضح الكاتب المفهوم خطوة بخطوة.',
			svg: svgFrenchGrammarMap({
				title: 'Les principaux procédés explicatifs',
				rootLabel: 'Expliquer avec clarté',
				rootSub: 'Faire comprendre un phénomène ou un savoir',
				width: 580,
				branches: [
					{
						label: 'Définition',
						rule: 'être, désigner, consister à',
						example: 'L’optique est la science de la lumière.'
					},
					{
						label: 'Dénomination',
						rule: 's’appeler, nommé, appelé',
						example: 'Un canal souterrain appelé foggara.'
					},
					{
						label: 'Reformulation',
						rule: 'c’est-à-dire, autrement dit',
						example: 'Autrement dit, l’eau circule par gravité.'
					},
					{
						label: 'Illustration',
						rule: 'comme, tel que, par exemple',
						example: 'Des savants tels qu’Al-Khwarizmi.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'تأمل العبارة: « appelée aussi qamara » في الفقرة التمهيدية. ما الوسيلة التفسيرية المستعملة لتسمية الجهاز العلمي؟',
					hintAr: 'ابحث عن الفعل الذي يدل على التسمية (appelée).',
					expectedInput: 'La dénomination',
					revealAr:
						'إنها التسمية (La dénomination) التي تُعرف بوسائط مثل: appelé, nommé, baptisé, désigné sous le nom de.'
				},
				{
					promptAr:
						'في عبارة « autrement dit, une boîte percée d’un petit orifice »، ما دور الرابط « autrement dit »؟',
					hintAr: 'الكاتب يعيد صياغة الفكرة بعبارات أبسط وأوضح للقارئ.',
					expectedInput: 'La reformulation',
					revealAr:
						'يستعمل الكاتب إعادة الصياغة (La reformulation) بواسطة c’est-à-dire أو autrement dit لتبسيط المعلومة العلمية.'
				},
				{
					promptAr:
						'ما الوسيلة التفسيرية في ختام الجملة: « telle que celle d’une bougie ou d’un minaret »؟',
					hintAr: 'لاحظ أداة التمثيل telle que.',
					expectedInput: 'L’illustration (l’exemple)',
					revealAr:
						'إنها التمثيل أو الإيضاح بالمثال (L’illustration / L’exemple)، وتقدم بأدوات مثل: par exemple, comme, tel que, notamment.'
				}
			]
		},
		summary: {
			rulesAr: [
				'التعريف (La définition): يحدد ماهية المفهوم باستعمال أفعال مثل: être, désigner, définir, consister à. مثال: La foggara est un système d’irrigation traditionnel.',
				'التسمية (La dénomination) وإعادة الصياغة (La reformulation): التسمية تمنح المصطلح اسمه العلمي (appelé, nommé)، وإعادة الصياغة تشرحه بعبارة أبسط (c’est-à-dire, autrement dit, en d’autres termes).',
				'التمثيل (L’illustration) والتعداد (L’énumération) والوظيفة (La fonction): التمثيل يعطي مثالاً ملموساً (tel que, comme, par exemple)، التعداد يسرد العناصر، والوظيفة تبين الدور (servir à, permettre de).',
				'المنهجية البرهانية التفسيرية (La démarche démonstrative): ينتقل النص العلمي المنظم من طرح سؤال أو ملاحظة (Observation / Problématique) إلى التفسير والتحليل بالأدلة والوسائل التفسيرية، ثم إلى خلاصة علمية موضوعية.'
			],
			visualSvg: svgFrenchWritingBlueprint({
				title: 'Démarche démonstrative d’un texte explicatif',
				width: 580,
				steps: [
					{
						stage: 'Observation / Question',
						detail: 'Présenter le phénomène scientifique ou patrimonial à expliquer.'
					},
					{
						stage: 'Définition & Analyse',
						detail: 'Définir, nommer les composants et analyser le fonctionnement.'
					},
					{
						stage: 'Illustration & Preuve',
						detail: 'Appuyer l’explication par des exemples concrets et des chiffres.'
					},
					{
						stage: 'Synthèse objective',
						detail: 'Tirer une conclusion générale vérifiable sans jugement personnel.'
					}
				]
			}),
			visualCaptionAr: 'المراحل الأربع للمنهجية التفسيرية البرهانية في الخطاب الموضوعي',
			examples: [
				{
					problemAr:
						'Identifiez le procédé explicatif : « L’astrolabe sert à mesurer la hauteur des astres et à déterminer les horaires de prière. »',
					solutionAr: 'Procédé explicatif : La fonction (indiquée par l’expression verbale « sert à »).'
				},
				{
					problemAr:
						'Identifiez les deux procédés : « La Casbah d’Alger regroupe des maisons à patio, appelées dar, c’est-à-dire des demeures organisées autour d’une cour intérieure fraîche. »',
					solutionAr: '1) Dénomination (« appelées dar ») ; 2) Reformulation (« c’est-à-dire des demeures... »).'
				}
			],
			watchOutAr:
				'لا تخلط بين التعريف (La définition) وإعادة الصياغة (La reformulation): التعريف يشرح المفهوم لأول مرة بفعل مثل est أو désigne، أما إعادة الصياغة فتأتي بعد عبارة سابقة لتوضيحها بأسلوب أسهل مع رابط مثل c’est-à-dire أو autrement dit.'
		},
		practice: [
			{
				questionAr:
					'Quel procédé explicatif est employé dans la phrase : « Al-Khwarizmi a fondé l’algèbre, c’est-à-dire la science de la résolution méthodique des équations » ?',
				options: ['La reformulation', 'L’énumération', 'La comparaison', 'La fonction'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! وجود الرابط « c’est-à-dire » يدل مباشرة على إعادة الصياغة (La reformulation).',
					'خطأ: التعداد يسرد سلسلة من العناصر المتتابعة.',
					'خطأ: المقارنة تجمع بين عنصرين بأداة مثل comme أو plus que.',
					'خطأ: الوظيفة تُعرف بعبارات مثل servir à أو permettre de.'
				],
				explanationAr: 'العبارة « c’est-à-dire » هي المؤشر الأبرز للوسيلة التفسيرية المسماة إعادة الصياغة (La reformulation).'
			},
			{
				questionAr:
					'Repérez le procédé explicatif dans : « Les galeries souterraines du Touat, appelées foggaras, captent l’eau de la nappe phréatique. »',
				options: ['L’illustration', 'La dénomination', 'La fonction', 'La définition par négation'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا يوجد مثال مع par exemple أو tel que.',
					'صحيح! الكلمة « appelées » تدل على التسمية (La dénomination).',
					'خطأ: التركيز هنا على المقطع المعترض « appelées foggaras ».',
					'خطأ: لا توجد صيغة نفي تعريفية في الجملة.'
				],
				explanationAr: 'الاسم المفعول « appelées » يقدم الاسم الاصطلاحي للظاهرة، وهو أسلوب التسمية (La dénomination).'
			},
			{
				questionAr:
					'Quelle expression introduit un procédé d’illustration (exemple) ?',
				options: [
					'En d’autres termes',
					'Permet de réguler',
					'Notamment et tel que',
					'Désigne un procédé'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: En d’autres termes تفيد إعادة الصياغة (Reformulation).',
					'خطأ: Permet de تفيد الوظيفة (Fonction).',
					'ممتاز! Notamment و tel que تقدمان أمثلة توضيحية (Illustration).',
					'خطأ: Désigne تقدم تعريفاً (Définition).'
				],
				explanationAr: 'تستعمل أدوات مثل par exemple و comme و tel que و notamment لتقديم التمثيل (L’illustration).'
			},
			{
				questionAr:
					'Dans la phrase : « Le qanun médical d’Al-Zahrawi décrit des instruments chirurgicaux, des sutures, des pinces et des bandages », quel procédé domine ?',
				options: ['L’énumération', 'La reformulation', 'La dénomination', 'L’analyse causale'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! سرد عناصر متتابعة مفصولة بفواصل ثم « et » يشكل تعداداً (L’énumération).',
					'خطأ: لا يوجد رابط إعادة صياغة.',
					'خطأ: لا توجد تسمية مصطلحية هنا.',
					'خطأ: لا توجد علاقة سبب ونتيجة مصرح بها.'
				],
				explanationAr: 'تتابع الأسماء (instruments, sutures, pinces, bandages) يمثل وسيلة التعداد (L’énumération).'
			},
			{
				questionAr:
					'Quelle est la visée communicative principale d’un texte explicatif à démarche démonstrative ?',
				options: [
					'Raconter une aventure imaginaire pour divertir',
					'Informer et faire comprendre un savoir de manière objective et rigoureuse',
					'Exhorter le lecteur à protester contre une injustice',
					'Exprimer des sentiments personnels mélancoliques'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: هذا من خصائص النص السردي الترفيهي.',
					'ممتاز! غاية النص التفسيري هي الإعلام والإفهام بأسلوب موضوعي ومنهجي.',
					'خطأ: تلك غاية النص الحجاجي أو النداء.',
					'خطأ: النص الموضوعي يستبعد المشاعر الذاتية.'
				],
				explanationAr: 'تتمثل الغاية التواصلية للنص التفسيري في الإعلام والإفهام (Informer et expliquer) بموضوعية.'
			}
		]
	},
	{
		id: 'fre_lesson_2as_lp_t1_effacement_passif',
		slug: 'fre-2as-lp-t1-effacement-passif',
		grade: '2as_lp',
		yearSubjectId: 761,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: الخطاب الموضوعي (Le discours objectivé — العلم وتاريخ المعارف الإسلامية والتراث)',
		order: 2,
		titleAr: 'غياب المتكلم والمبني للمجهول (L’effacement de l’énonciateur et la voix passive)',
		objectives: [
			'التعرف على مظاهر غياب المتكلم (L’effacement de l’énonciateur) التي تحقق الموضوعية في النص العلمي',
			'إتقان التحويل من المبني للمعلوم (Voix active) إلى المبني للمجهول (Voix passive) مع احترام الزمن ومطابقة اسم المفعول',
			'توظيف التراكيب غير الشخصية (Tournures impersonnelles) والضمير المحايد « on » ومضارع الحقيقة العامة'
		],
		keywordsAr: [
			'effacement de l’énonciateur',
			'objectivité',
			'voix passive',
			'tournure impersonnelle',
			'présent de vérité générale',
			'المبني للمجهول'
		],
		discover: {
			scenarioAr:
				'قارن بين صياغتين حول مدينة غرداية: (1) « Je trouve que les habitants du M’Zab construisent des maisons admirables. » و (2) « Dans la vallée du M’Zab, les maisons sont construites en matériaux locaux afin de réguler la chaleur. » أيهما تتوافق مع أسلوب الخطاب الموضوعي العلمي؟',
			svg: svgFrenchGrammarMap({
				title: 'Les marques de l’objectivité scientifique',
				rootLabel: 'Effacement de l’énonciateur',
				rootSub: 'Absence de « je / nous » et de jugements affectifs',
				width: 580,
				branches: [
					{
						label: 'Voix passive',
						rule: 'être (temps actif) + PP',
						example: 'L’eau est répartie avec équité.'
					},
					{
						label: 'Tournure impersonnelle',
						rule: 'Il faut, Il est établi que',
						example: 'Il est prouvé que la lumière se propage.'
					},
					{
						label: 'Pronom « on » neutre',
						rule: 'Valeur générale objective',
						example: 'On observe une réfraction nette.'
					},
					{
						label: 'Présent de vérité',
						rule: 'Fait constant et vérifiable',
						example: 'La Terre tourne autour du Soleil.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'لماذا تُعد الصياغة الثانية (« Les maisons sont construites en matériaux locaux ») أكثر موضوعية من الأولى؟',
					hintAr: 'لاحظ اختفاء الضمير Je والصفة العاطفية admirables.',
					expectedInput: 'لأن المتكلم يغيب تماماً ويُبرز الحقيقة العلمية دون رأي شخصي',
					revealAr:
						'في الخطاب الموضوعي يغيب المتكلم (Effacement de l’énonciateur): لا يظهر « je » ولا الصفات التقييمية، بل تُقدم المعلومة بصيغة محايدة كالمبني للمجهول.'
				},
				{
					promptAr:
						'لنحوّل الجملة التالية إلى المبني للمجهول: « Al-Idrisi a dressé une carte célèbre. » في أي زمن نُصرف الفعل المساعد « être »؟',
					hintAr: 'الفعل الأصلي « a dressé » في الماضي المركب (Passé composé).',
					expectedInput: 'في الماضي المركب : a été dressée',
					revealAr:
						'يأخذ الفعل المساعد être نفس زمن الفعل في المبني للمعلوم، ثم نطابق اسم المفعول مع الفاعل الجديد المؤنث (une carte): « Une carte célèbre a été dressée par Al-Idrisi. »'
				},
				{
					promptAr:
						'هل يمكن تحويل الجملة « Les savants voyageaient beaucoup » إلى المبني للمجهول؟ ولماذا؟',
					hintAr: 'تحقق هل يوجد مفعول به مباشر (COD) في الجملة.',
					expectedInput: 'لا، لأن الفعل لازم ولا يوجد مفعول به مباشر (COD)',
					revealAr:
						'التحويل إلى المبني للمجهول ممكن فقط مع الأفعال المتعدية لمفعول به مباشر (Verbe transitif direct + COD).'
				}
			]
		},
		summary: {
			rulesAr: [
				'مظاهر غياب المتكلم (Effacement de l’énonciateur): غياب ضمائر المتكلم (je, moi, mon)، استعمال الغائب (il, elle, ils)، التراكيب غير الشخصية (il est démontré que, il existe)، الضمير المحايد (on)، والأسماء المجردة (Nominalisation).',
				'قاعدة التحويل إلى المبني للمجهول (Voix passive): يصبح المفعول به المباشر (COD) فاعلاً جديداً، ونصرف المساعد « être » في زمن الفعل الأصلي، متبوعاً باسم المفعول مطابقاً للفاعل الجديد في النوع والعدد، ويصبح الفاعل الأصلي مفعولاً بواسطة (Complément d’agent) مسبوقاً بـ « par » (أو « de » مع أفعال الشعور والحالة مثل connu de, entouré de).',
				'تطابق الأزمنة السريع: Présent -> est/sont + PP | Imparfait -> était/étaient + PP | Passé composé -> a/ont été + PP | Passé simple -> fut/furent + PP | Futur simple -> sera/seront + PP.',
				'مضارع الحقيقة العامة (Présent de vérité générale): يُستعمل لصياغة القوانين العلمية والحقائق الثابتة في كل زمان ومكان.'
			],
			visualSvg: svgFrenchTenseTimeline({
				title: 'Transformation Active / Passive',
				tenseName: 'Respect strict du temps verbal',
				formula: 'COD -> Sujet + être (même temps) + Participe Passé accordé + par + Agent',
				activeZone: 'present',
				example: 'Ibn Al-Haytham rédige un traité. => Un traité est rédigé par Ibn Al-Haytham.',
				markers: 'est + PP (Présent) | a été + PP (Passé composé) | fut + PP (Passé simple)'
			}),
			visualCaptionAr: 'آلية التحويل الدقيق من المبني للمعلوم إلى المبني للمجهول مع الحفاظ على الزمن',
			examples: [
				{
					problemAr:
						'Mettez à la voix passive : « Les ingénieurs musulmans ont perfectionné la clepsydre hydraulique. »',
					solutionAr: 'La clepsydre hydraulique a été perfectionnée par les ingénieurs musulmans.'
				},
				{
					problemAr:
						'Mettez à la voix active : « De nombreux manuscrits rares sont conservés par les bibliothèques de Tlemcen. »',
					solutionAr: 'Les bibliothèques de Tlemcen conservent de nombreux manuscrits rares.'
				}
			],
			watchOutAr:
				'خطأ شائع جداً في الفروض: نسيان مطابقة اسم المفعول مع الفاعل الجديد المؤنث أو الجمع (مثلاً كتابة « La carte a été dressé » بدل « dressée »)، أو تغيير الزمن الأصلي للفعل (تحويل الماضي المركب إلى مضارع).'
		},
		practice: [
			{
				questionAr:
					'Transformez correctement à la voix passive : « Les artisans restaurent les anciennes mosaïques. »',
				options: [
					'Les anciennes mosaïques ont été restaurées par les artisans.',
					'Les anciennes mosaïques sont restaurées par les artisans.',
					'Les anciennes mosaïques sont restaurés par les artisans.',
					'Les anciennes mosaïques étaient restaurées par les artisans.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفعل الأصلي « restaurent » في المضارع وليس في الماضي المركب.',
					'ممتاز! المضارع يصبح « sont restaurées » مع مطابقة المؤنث الجمع.',
					'خطأ: كلمة « mosaïques » مؤنث جمع فتحتاج « restaurées » بحرف e.',
					'خطأ: « étaient » تخص زمن الماضي المستمر (Imparfait) لا المضارع.'
				],
				explanationAr: 'الفعل « restaurent » في المضارع، والفاعل الجديد « Les anciennes mosaïques » مؤنث جمع، إذن: « sont restaurées ».'
			},
			{
				questionAr:
					'Quelle est la forme passive exacte de : « Al-Jazari conçut des horloges mécaniques précises » ?',
				options: [
					'Des horloges mécaniques précises sont conçues par Al-Jazari.',
					'Des horloges mécaniques précises furent conçues par Al-Jazari.',
					'Des horloges mécaniques précises furent conçus par Al-Jazari.',
					'Des horloges mécaniques précises avaient été conçues par Al-Jazari.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفعل « conçut » في الماضي البسيط (Passé simple) لا المضارع.',
					'أحسنت! الماضي البسيط يتحول إلى « furent conçues » مع مطابقة المؤنث الجمع (horloges).',
					'خطأ: « horloges » مؤنث جمع فيُكتب اسم المفعول « conçues ».',
					'خطأ: « avaient été » يقابل زمن Plus-que-parfait.'
				],
				explanationAr: 'في الماضي البسيط (Passé simple) نصرف « être » في الماضي البسيط (furent) ونطابق اسم المفعول (conçues).'
			},
			{
				questionAr:
					'Laquelle des phrases suivantes illustre le mieux l’effacement de l’énonciateur ?',
				options: [
					'Je pense personnellement que cette découverte est extraordinaire.',
					'À mon avis, nous devons admirer cet ingénieur exceptionnel.',
					'Il est démontré que la lumière se propage en ligne droite dans un milieu homogène.',
					'J’ai visité hier une bibliothèque magnifique à Constantine.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: وجود « Je pense personnellement » و « extraordinaire » يعكس ذاتية واضحة.',
					'خطأ: « À mon avis » و « admirer » علامتان للذاتية.',
					'صحيح! التركيب غير الشخصي « Il est démontré que » ومضارع الحقيقة العامة يحققان موضوعية تامة.',
					'خطأ: الجملة تحكي تجربة شخصية بضمير المتكلم « J’ai ».'
				],
				explanationAr: 'استعمال الصيغة غير الشخصية (Il est démontré que) وغياب المتكلم يميزان الخطاب الموضوعي.'
			},
			{
				questionAr:
					'Mettez à la voix active : « Le système de partage de l’eau est surveillé par un conseil d’anciens. »',
				options: [
					'Un conseil d’anciens surveillait le système de partage de l’eau.',
					'Un conseil d’anciens surveille le système de partage de l’eau.',
					'Un conseil d’anciens a surveillé le système de partage de l’eau.',
					'Le système de partage de l’eau surveille un conseil d’anciens.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: « est surveillé » في المضارع فيعود الفعل إلى المضارع (surveille).',
					'صحيح! نحذف المساعد « est » ونصرف « surveiller » في المضارع مع الفاعل « Un conseil d’anciens ».',
					'خطأ: لا نغير الزمن من المضارع إلى الماضي المركب.',
					'خطأ: يجب أن يصبح المفعول بواسطة (Un conseil d’anciens) هو الفاعل.'
				],
				explanationAr: 'عند العودة للمبني للمعلوم نُرجع « Un conseil d’anciens » فاعلاً ونُصرف الفعل « surveiller » في زمن المساعد « est » (المضارع).'
			},
			{
				questionAr:
					'Dans une phrase passive où le complément d’agent est absent (« On utilise le gypse dans le M’Zab » -> « Le gypse est utilisé dans le M’Zab »), pourquoi omet-on « par on » ?',
				options: [
					'Parce que « par on » est grammaticalement incorrect et « on » est indéfini',
					'Parce que le complément d’agent est interdit à la voix passive',
					'Parce que le verbe utiliser est intransitif',
					'Parce que la phrase est au passé simple'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! الضمير النكرة « on » لا يُحوّل أبداً إلى « par on » بل يُحذف في المبني للمجهول.',
					'خطأ: المفعول بواسطة جائز ومستعمل عندما يكون الفاعل محدداً.',
					'خطأ: الفعل utiliser متعدٍ مباشر وله مفعول به (le gypse).',
					'خطأ: الجملة في المضارع.'
				],
				explanationAr: 'الضمير النكرة « on » يُحذف وجوباً عند التحويل إلى المبني للمجهول ولا يصح مطلقاً قول « par on ».'
			}
		]
	},
	{
		id: 'fre_lesson_2as_lp_t1_rapports_logiques',
		slug: 'fre-2as-lp-t1-rapports-logiques',
		grade: '2as_lp',
		yearSubjectId: 761,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: الخطاب الموضوعي (Le discours objectivé — العلم وتاريخ المعارف الإسلامية والتراث)',
		order: 3,
		titleAr: 'العلاقات المنطقية: السبب والنتيجة والفرضية (Cause, conséquence et hypothèse)',
		objectives: [
			'التمييز الدقيق بين التعبير عن السبب (Cause)، والنتيجة (Conséquence)، والفرضية (Hypothèse)',
			'اختيار الرابط النحوي المناسب بحسب البنية: حرف جر + اسم (grâce à, à cause de) أو أداة ربط + جملة (parce que, donc, si)',
			'احترام قاعدة تطابق الأزمنة بعد أداة الشرط والفرضية « si » في الجمل التفسيرية'
		],
		keywordsAr: [
			'rapports logiques',
			'cause',
			'conséquence',
			'hypothèse',
			'articulateurs',
			'العلاقات المنطقية'
		],
		discover: {
			scenarioAr:
				'يشرح مهندس هيدروليكي نظام الري الصحراوي: « Grâce à une pente douce et régulière, l’eau s’écoule sans pompe ; par conséquent, les oasis restent vertes toute l’année. Si l’entretien des galeries est négligé, le débit diminuera rapidement. » تتبع الروابط الثلاثة في هذا التفسير.',
			svg: svgFrenchGrammarMap({
				title: 'Cause, Conséquence et Hypothèse',
				rootLabel: 'Les rapports logiques explicatifs',
				rootSub: 'Relier les faits de manière rigoureuse',
				width: 580,
				branches: [
					{
						label: 'La Cause',
						rule: 'car, parce que, grâce à + GN',
						example: 'Grâce au calcul, la carte est exacte.'
					},
					{
						label: 'La Conséquence',
						rule: 'donc, si bien que, d’où + GN',
						example: 'L’air circule, si bien que la salle reste fraîche.'
					},
					{
						label: 'L’Hypothèse',
						rule: 'Si + Présent => Futur simple',
						example: 'Si on préserve ce site, il durera.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'لماذا استعمل الكاتب « Grâce à » بدلاً من « À cause de » في عبارة « Grâce à une pente douce »؟',
					hintAr: 'هل النتيجة المترتبة على الميلان اللطيف إيجابية أم سلبية؟',
					expectedInput: 'لأن السبب يؤدي إلى نتيجة إيجابية',
					revealAr:
						'تستعمل « grâce à + GN » للسبب الإيجابي (بفضل)، بينما تستعمل « à cause de + GN » للسبب السلبي (بسبب)، وكلتاهما يتبعهما اسم لا فعل مصرف.'
				},
				{
					promptAr:
						'ما العلاقة المنطقية التي يعبر عنها الرابط « par conséquent » في الجملة الأولى؟ وكيف نبدله برابط سبب؟',
					hintAr: 'النتيجة هي بقاء الواحات خضراء طوال العام.',
					expectedInput: 'النتيجة (La conséquence)؛ ونعكس بالسبب: Les oasis restent vertes parce que l’eau s’écoule sans pompe.',
					revealAr:
						'السبب والنتيجة وجهان لعلاقة منطقية واحدة: نقدم السبب بـ « parce que / puisque / car » ونقدم النتيجة بـ « donc / par conséquent / si bien que ».'
				},
				{
					promptAr:
						'تأمل الجملة الشرطية: « Si l’entretien est négligé, le débit diminuera. » ما زمن الفعل بعد « Si » وما زمن جواب الشرط؟',
					hintAr: 'راقب الفعل « est » ثم الفعل « diminuera ».',
					expectedInput: 'Si + Présent ثم Futur simple',
					revealAr:
						'قاعدة التطابق مع « Si »: (1) Si + Présent -> Futur simple / Présent (فرضية ممكنة)؛ (2) Si + Imparfait -> Conditionnel présent (فرضية غير محققة حالياً).'
				}
			]
		},
		summary: {
			rulesAr: [
				'السبب (La cause): مع جملة كاملة نستعمل car (في وسط الجملة فقط)، parce que، puisque (سبب معروف)، comme (في بداية الجملة دائماً). ومع مجموعة اسمية (GN) نستعمل grâce à (إيجابي)، à cause de (سلبي)، en raison de (محايد).',
				'النتيجة (La conséquence): مع جملة كاملة نستعمل donc, par conséquent, c’est pourquoi, si bien que, de sorte que (+ indicatif للنتيجة المحققة). ومع صفة أو ظرف: si + adj + que / tellement + adj + que. ومع اسم: d’où + GN.',
				'الفرضية والشرط (L’hypothèse): لا يأتي المستقبل (Futur) ولا الشرطي (Conditionnel) أبداً مباشرة بعد « si » الشرطية! التراكيب الصحيحة: [Si + Présent => Présent ou Futur]؛ [Si + Imparfait => Conditionnel présent]؛ [Au cas où + Conditionnel]؛ [À condition que + Subjonctif].',
				'القدرة على التحويل بين السبب والنتيجة (Inversion logique) مهارة أساسية في الامتحان: A (cause) donc B (conséquence) <=> B parce que A.'
			],
			visualSvg: svgFrenchTenseTimeline({
				title: 'Concordance des temps avec « Si »',
				tenseName: 'Hypothèse réalisable vs potentielle',
				formula: 'Si + Présent => Futur simple  |  Si + Imparfait => Conditionnel présent',
				activeZone: 'future',
				example: 'Si l’on protège les manuscrits, les chercheurs les étudieront.',
				markers: 'JAMAIS de futur ni de conditionnel juste après « si » !'
			}),
			visualCaptionAr: 'القاعدة الذهبية لتطابق الأزمنة في جملة الفرضية مع أداة الشرط Si',
			examples: [
				{
					problemAr:
						'Remplacez le rapport de conséquence par un rapport de cause : « Les murs du M’Zab sont épais, c’est pourquoi les pièces demeurent fraîches. »',
					solutionAr: 'Comme les murs du M’Zab sont épais, les pièces demeurent fraîches. (Ou : Les pièces demeurent fraîches parce que les murs du M’Zab sont épais.)'
				},
				{
					problemAr:
						'Mettez les verbes au temps convenable : « Si les villes (réduire) le gaspillage d’eau, les réserves (augmenter) sensiblement. »',
					solutionAr: 'Si les villes réduisent le gaspillage d’eau, les réserves augmenteront sensiblement. (Ou Imparfait / Conditionnel : réduisaient / augmenteraient.)'
				}
			],
			watchOutAr:
				'احذر من خطأين فادحين: الأول وضع المستقبل أو الشرطي مباشرة بعد « si » (لا تقل أبداً « Si tu étudieras » بل « Si tu étudies »). الثاني وضع فعل مصرف بعد « grâce à » أو « à cause de »؛ فهما يتبعهما اسم فقط.'
		},
		practice: [
			{
				questionAr:
					'Choisissez l’articulateur logique convenable : « ...... l’ingéniosité d’Al-Jazari, la mécanique hydraulique a connu un essor remarquable. »',
				options: ['À cause de', 'Grâce à', 'Parce que', 'Si bien que'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: À cause de تستعمل للسبب ذي النتيجة السلبية.',
					'ممتاز! المجموعة الاسمية « l’ingéniosité » أدت إلى نتيجة إيجابية فنستعمل « Grâce à ».',
					'خطأ: Parce que تتبعها جملة فيها فعل مصرف لا اسم فقط.',
					'خطأ: Si bien que تفيد النتيجة وتحتاج فعلاً مصرفاً.'
				],
				explanationAr: 'لوجود مجموعة اسمية دالة على سبب إيجابي نستعمل حرف الجر المركب « Grâce à ».'
			},
			{
				questionAr:
					'Complétez la phrase d’hypothèse correctement : « Si les élèves ...... la méthode scientifique, ils ...... leurs analyses avec rigueur. »',
				options: [
					'appliqueront / réussiront',
					'appliquent / réussiront',
					'appliqueraient / réussiraient',
					'appliquent / réussissaient'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا نضع المستقبل البسيط مباشرة بعد « Si » الشرطية.',
					'صحيح! التطابق الصحيح للفرضية الممكنة هو: Si + Présent => Futur simple.',
					'خطأ: لا نضع الشرطي (Conditionnel) مباشرة بعد « Si ».',
					'خطأ: لا يتطابق المضارع بعد Si مع Imparfait في جواب الشرط.'
				],
				explanationAr: 'تقتضي قاعدة التطابق في الشرط الممكن: Si + Présent de l’indicatif => Futur simple.'
			},
			{
				questionAr:
					'Quel rapport logique est exprimé dans : « La température du Sahara est si élevée que les habitants privilégient des ruelles étroites et ombragées » ?',
				options: ['La cause', 'La conséquence', 'L’hypothèse', 'La concession'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: التركيب « si + adjectif + que » يعبر عن شدة تؤدي إلى نتيجة.',
					'أحسنت! البنية « si ... que » تعبر عن النتيجة المرتبطة بالشدة (Conséquence).',
					'خطأ: هنا « si » ظرف شدة قبل صفة وليس أداة شرط.',
					'خطأ: لا يوجد تعارض في الجملة بل علاقة منطقية مطردة.'
				],
				explanationAr: 'الصيغة « si + adjectif + que » تُستخدم للتعبير عن النتيجة المترتبة على درجة مرتفعة.'
			},
			{
				questionAr:
					'Transformez sans changer le sens : « Comme les manuscrits anciens sont fragiles, on les conserve dans des salles climatisées. »',
				options: [
					'Les manuscrits anciens sont fragiles, donc on les conserve dans des salles climatisées.',
					'Les manuscrits anciens sont fragiles parce qu’on les conserve dans des salles climatisées.',
					'On conserve les manuscrits anciens, si bien qu’ils sont fragiles.',
					'Grâce à leur fragilité, les manuscrits sont perdus.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! « Comme » قدمت السبب، فعند التحويل إلى نتيجة نضع « donc » قبل الجملة الثانية.',
					'خطأ: هذا يعكس السبب والنتيجة ويفسد المعنى.',
					'خطأ: الحفظ ليس سبباً لهشاشة المخطوطات.',
					'خطأ: المعنى محرف تماماً.'
				],
				explanationAr: 'السبب هو هشاشة المخطوطات والنتيجة حفظها في قاعات مكيفة؛ إذن: السبب + donc + النتيجة.'
			},
			{
				questionAr:
					'Quelle phrase utilise correctement « à condition que » ?',
				options: [
					'Ce patrimoine survivra à condition que chacun le protège.',
					'Ce patrimoine survivra à condition que chacun le protégera.',
					'Ce patrimoine survivra à condition que la protection.',
					'Ce patrimoine survivra à condition de chacun le protège.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! « à condition que » يتبعها دائماً الفعل في صيغة النصب (Subjonctif présent : protège).',
					'خطأ: لا يأتي المستقبل بعد « à condition que » بل Subjonctif.',
					'خطأ: « à condition que » تتبعها جملة فعلية كاملة لا اسم فقط.',
					'خطأ: « à condition de » يتبعها مصدر (Infinitif) عندما يكون الفاعل واحداً.'
				],
				explanationAr: 'الأداة الشرطية « à condition que » تطلب دائماً صيغة Subjonctif في الجملة التابعة.'
			}
		]
	},
	{
		id: 'fre_lesson_2as_lp_t1_lexique_nominalisation',
		slug: 'fre-2as-lp-t1-lexique-nominalisation',
		grade: '2as_lp',
		yearSubjectId: 761,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: الخطاب الموضوعي (Le discours objectivé — العلم وتاريخ المعارف الإسلامية والتراث)',
		order: 4,
		titleAr: 'المعجم المتخصص والاسمية (Le lexique spécialisé et la nominalisation)',
		objectives: [
			'تحويل الجمل الفعلية إلى مجموعات اسمية (Nominalisation) لتكثيف المعنى في العناوين والتلخيص',
			'استعمال اللواحق الاسمية الأساسية بدقة (-tion, -ation, -ment, -age, -té, -ance/-ence, -eur)',
			'استخراج الحقل المعجمي المتخصص (Champ lexical) والتمييز بين الجذر واللاحقة في عائلة الكلمات'
		],
		keywordsAr: [
			'nominalisation',
			'suffixes',
			'famille de mots',
			'champ lexical',
			'lexique spécialisé',
			'التحويل إلى الاسم'
		],
		discover: {
			scenarioAr:
				'لتلخيص فقرة عن حفظ المخطوطات الأثرية، كتب الأستاذ عنواناً فعلياً طويلاً: « On restaure et on numérise les manuscrits anciens afin de les préserver durablement. » ثم اختصره إلى عنوان اسمي مركز: « La restauration et la numérisation des manuscrits anciens pour leur préservation durable. » لاحظ قوة التكثيف الموضوعي.',
			svg: svgFrenchWordFormation({
				title: 'Mécanisme de la nominalisation (Verbe -> Nom)',
				prefix: 'ré-',
				root: 'staur',
				suffix: '-ation',
				derivedWord: 'La restauration (du patrimoine)',
				meaningNote: 'La nominalisation condense l’information et renforce l’objectivité.'
			}),
			steps: [
				{
					promptAr:
						'كيف تحول الفعلان « restaurer » و « numériser » إلى اسمين في العنوان الثاني؟ وما اللاحقة المشتركة؟',
					hintAr: 'انظر إلى نهاية الكلمتين: restauration و numérisation.',
					expectedInput: 'إضافة اللاحقة -ation',
					revealAr:
						'نشتق أسماء الأفعال (Noms d’action) بإضافة لواحق اسمية إلى الجذر (Radical)، وأكثرها شيوعاً: -ation / -tion و -ment و -age.'
				},
				{
					promptAr:
						'كيف تحول الصفة « précis » والصفة « solide » إلى اسمين (Nominalisation à base adjectivale)؟',
					hintAr: 'تذكر اللواحق -ion و -ité.',
					expectedInput: 'la précision / la solidité',
					revealAr:
						'الاسمية لا تقتصر على الأفعال فقط، بل نشتق أسماء من الصفات أيضاً باستخدام لواحق مثل: -té / -ité (solidité, rapidité)، -eur (profondeur)، -ance/-ence (prudence).'
				},
				{
					promptAr:
						'لماذا يكثر استعمال الاسمية (La nominalisation) في العناوين الصحفية العلمية وفي التلخيص (Compte rendu)؟',
					hintAr: 'قارن طول الجملة ومستوى الموضوعية فيها.',
					expectedInput: 'لأنها تكثف المعلومة وتزيل الفاعل فتزيد من الموضوعية والإيجاز',
					revealAr:
						'تمنح الاسمية النص إيجازاً (Concision) وموضوعية عالية (Objectivité) وتسهل صياغة العناوين والأفكار الأساسية في التلخيص.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الاسمية من الفعل (Nominalisation verbale): تحويل الفعل إلى اسم باللواحق: -tion / -ation (observer -> observation, observer -> l’observation)؛ -ment (développer -> développement, mesurer -> mesurage/mesure)؛ -age (irriguer -> irrigation, filtrer -> filtrage)؛ -ure (ouvrir -> ouverture).',
				'الاسمية من الصفة (Nominalisation adjectivale): تحويل الصفة إلى اسم باللواحق: -té / -ité (clair -> clarté, complexe -> complexité)؛ -ance / -ence (résistant -> résistance, cohérent -> cohérence)؛ -eur (large -> largeur, profond -> profondeur)؛ -esse (juste -> justesse).',
				'الحقل المعجمي المتخصص (Le champ lexical spécialisé): مجموعة من الكلمات (أسماء، أفعال، صفات) تنتمي إلى مجال علمي أو تراثي واحد (مثل البصريات: lumière, lentille, réfraction, rayon, observer).',
				'عائلة الكلمات (Famille de mots): كلمات تشترك في الجذر (Radical) نفسه، مثل: observer, observation, observatoire, observable.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Principaux suffixes de nominalisation',
				rootLabel: 'Transformer en Nom',
				rootSub: 'À partir d’un verbe ou d’un adjectif',
				width: 580,
				branches: [
					{
						label: '-tion / -ation',
						rule: 'Action / Résultat',
						example: 'expliquer => explication'
					},
					{
						label: '-ment / -age',
						rule: 'Processus / Technique',
						example: 'aménager => aménagement'
					},
					{
						label: '-té / -ité',
						rule: 'Qualité (Adjectif)',
						example: 'précis/solide => solidité'
					},
					{
						label: '-ance / -ence',
						rule: 'État / Propriété',
						example: 'cohérent => cohérence'
					}
				]
			}),
			visualCaptionAr: 'خريطة اللواحق الأكثر تواتراً في تحويل الأفعال والصفات إلى أسماء',
			examples: [
				{
					problemAr: 'Nominalisez la phrase : « Les chercheurs découvrent de nouvelles propriétés de la lumière. »',
					solutionAr: 'La découverte de nouvelles propriétés de la lumière par les chercheurs.'
				},
				{
					problemAr: 'Nominalisez à partir de l’adjectif : « L’architecture du M’Zab est remarquablement sobre et durable. »',
					solutionAr: 'La sobriété et la durabilité remarquables de l’architecture du M’Zab.'
				}
			],
			watchOutAr:
				'انتبه لتهجئة بعض الأسماء الشاذة أو التي تتغير قليلاً عند الاشتقاق: découvrir -> découverte (لا نقول découvration!)؛ détruire -> destruction؛ connaître -> connaissance؛ résoudre -> résolution؛ accroître -> accroissement.'
		},
		practice: [
			{
				questionAr:
					'Quelle est la nominalisation correcte de la phrase : « On préserve les bibliothèques anciennes » ?',
				options: [
					'La préservement des bibliothèques anciennes',
					'La préservation des bibliothèques anciennes',
					'Le préservage des bibliothèques anciennes',
					'La préservance des bibliothèques anciennes'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفعل préserver لا يأخذ اللاحقة -ment.',
					'ممتاز! اسم الفعل من préserver هو « la préservation ».',
					'خطأ: لا توجد كلمة préservage في الفرنسية القياسية.',
					'خطأ: اللاحقة -ance غير صحيحة مع هذا الفعل.'
				],
				explanationAr: 'الفعل « préserver » يُشتق منه الاسم باللاحقة -ation: la préservation.'
			},
			{
				questionAr:
					'Quel nom correspond exactement au verbe « résoudre » ?',
				options: ['résoudage', 'résolution', 'résolument', 'résolvance'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: صيغة غير موجودة في المعجم.',
					'أحسنت! الاسم القياسي من résoudre هو « la résolution » (مثل: la résolution d’une équation).',
					'خطأ: « résolument » ظرف (Adverbe) وليس اسماً.',
					'خطأ: صيغة غير صحيحة.'
				],
				explanationAr: 'الفعل « résoudre » يشتق منه الاسم « la résolution ».'
			},
			{
				questionAr:
					'Nominalisez l’adjectif « rigoureux » dans : « La méthode d’Ibn Al-Haytham est rigoureuse. »',
				options: [
					'La rigueur de la méthode d’Ibn Al-Haytham',
					'La rigourosité de la méthode d’Ibn Al-Haytham',
					'Le rigourement de la méthode d’Ibn Al-Haytham',
					'La rigourance de la méthode d’Ibn Al-Haytham'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! الاسم المشتق من الصفة « rigoureux » هو « la rigueur ».',
					'خطأ: الصيغة الصحيحة المختصرة في الفرنسية هي « la rigueur ».',
					'خطأ: كلمة غير موجودة.',
					'خطأ: كلمة غير موجودة.'
				],
				explanationAr: 'الصفة « rigoureux / rigoureuse » يقابلها الاسم « la rigueur ».'
			},
			{
				questionAr:
					'Parmi ces quatre mots, lequel N’APPARTIENT PAS au champ lexical de l’hydraulique traditionnelle ?',
				options: ['canalisation', 'nappe phréatique', 'irrigation', 'calligraphie'],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: canalisation (قناة) جزء من معجم الري.',
					'خطأ: nappe phréatique (المياه الجوفية) جزء من معجم الري.',
					'خطأ: irrigation (السقي) جزء أساسي من معجم الري.',
					'صحيح! كلمة « calligraphie » (الخط العربي) تنتمي لحقل الفنون والكتابة لا الري.'
				],
				explanationAr: 'الحقل المعجمي للري يشمل canalisation و nappe phréatique و irrigation، أما calligraphie فتنتمي للكتابة والفن.'
			},
			{
				questionAr:
					'Complétez la famille de mots : Verbe « expérimenter » / Nom « expérimentation » / Adjectif : ......',
				options: ['expérimental', 'expérimentement', 'expérimentage', 'expérimenteurment'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! الصفة المشتقة هي « expérimental / expérimentale » (مثل: la méthode expérimentale).',
					'خطأ: هذه ليست صفة.',
					'خطأ: كلمة غير قياسية.',
					'خطأ: كلمة غير موجودة.'
				],
				explanationAr: 'عائلة الكلمة القياسية هي: expérimenter (فعل) — expérimentation (اسم) — expérimental (صفة).'
			}
		]
	},
	{
		id: 'fre_lesson_2as_lp_t1_compte_rendu_objectif',
		slug: 'fre-2as-lp-t1-compte-rendu-objectif',
		grade: '2as_lp',
		yearSubjectId: 761,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: الخطاب الموضوعي (Le discours objectivé — العلم وتاريخ المعارف الإسلامية والتراث)',
		order: 5,
		titleAr: 'التقرير الموضوعي لنص تفسيري (Le compte rendu objectif d’un texte explicatif)',
		objectives: [
			'بناء مقدمة تعريفية متكاملة (Accroche) تتضمن عنوان النص، الكاتب، المصدر، النمط، والموضوع العام',
			'تلخيص الأفكار الأساسية للنص بأسلوبك الخاص وبضمير الغائب (L’auteur explique / montre / souligne que...)',
			'تجنب الأخطاء المنهجية القاتلة: النسخ الحرفي (Copier-coller)، إبداء الرأي الشخصي، أو إدخال معلومات من خارج النص'
		],
		keywordsAr: [
			'compte rendu objectif',
			'accroche',
			'idées essentielles',
			'reformulation',
			'objectivité',
			'التقرير الموضوعي'
		],
		discover: {
			scenarioAr:
				'في فرض الفصل الأول، يُطلب من تلاميذ السنة الثانية آداب وفلسفة كتابة تقرير موضوعي (Compte rendu objectif) عن نص علمي من 3 فقرات حول العالم « الجزري ». يتساءل كريم: هل أكتب « Je pense que le texte est très beau » أم ألتزم بنقل أفكار الكاتب بحياد تام؟',
			svg: svgFrenchWritingBlueprint({
				title: 'Plan du Compte Rendu Objectif (2AS LP)',
				width: 580,
				steps: [
					{
						stage: '1. Accroche (Intro)',
						detail: 'Type de texte, titre, auteur, source, thème général et visée.'
					},
					{
						stage: '2. Développement (§1)',
						detail: 'Reformuler les idées majeures à la 3e personne (L’auteur présente...).'
					},
					{
						stage: '3. Progression (§2)',
						detail: 'Enchaîner avec des connecteurs (Ensuite, Par ailleurs, Enfin).'
					},
					{
						stage: '4. Contrôle final',
						detail: 'Zéro avis personnel, zéro copie mot à mot, 1/3 du texte initial.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'ما العناصر الخمسة الضرورية في جملة المقدمة التعريفية (L’accroche) للتقرير الموضوعي؟',
					hintAr: 'تذكر البطاقة الفنية للنص: العنوان، النوع، الكاتب، المصدر، والموضوع.',
					expectedInput: 'نوع النص + العنوان + الكاتب + المصدر + الفكرة العامة / الغاية',
					revealAr:
						'نموذج المقدمة: « Ce texte explicatif, intitulé "...", écrit par [Auteur] et extrait de [Source], traite de [Thème général] dans le but d’informer le lecteur sur... »'
				},
				{
					promptAr:
						'في عرض التقرير الموضوعي، لماذا نستعمل أفعالاً ناقلة مثل: « L’auteur définit... », « Il explique ensuite que... », « Il conclut en soulignant... »؟',
					hintAr: 'من صاحب الأفكار في التقرير الموضوعي: التلميذ أم كاتب النص الأصلي؟',
					expectedInput: 'لنسب الأفكار بوضوح وموضوعية إلى كاتب النص بضمير الغائب',
					revealAr:
						'التقرير الموضوعي يُكتب دائماً بضمير الغائب (3e personne) مع إسناد الأفكار لصاحبها، والتركيز على المضارع الإخباري (Présent de l’indicatif).'
				},
				{
					promptAr:
						'هل نذكر جميع الأمثلة التفصيلية والإحصاءات الفرعية داخل التقرير الموضوعي؟',
					hintAr: 'تذكر أن طول التقرير يعادل ثلث النص الأصلي تقريباً.',
					expectedInput: 'لا، نحتفظ بالأفكار الأساسية فقط ونحذف التفاصيل والأمثلة الثانوية',
					revealAr:
						'في التقرير الموضوعي نحذف الشواهد المطولة والتكرارات والأقواس الثانوية، ونصوغ الأفكار المحورية بعباراتنا الخاصة وبشكل مترابط.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الجزء الأول — المقدمة التعريفية (L’accroche): فقرة موجزة (2 إلى 3 أسطر) تعرف بالنص: نوعه (texte explicatif)، عنوانه (intitulé « ... »)، كاتبه، مصدره، موضوعه العام (traite de / aborde la question de)، وغايته (informer et expliquer).',
				'الجزء الثاني — العرض التلخيصي (Le résumé condensé): يعرض الأفكار الأساسية مرتبة بوضوح باستعمال أفعال مثل: d’abord, l’auteur définit / présente ; ensuite, il explique / démontre ; enfin, il conclut / souligne que.',
				'القواعد الذهبية الأربع: (1) الحياد التام وعدم استعمال « je » أو أحكام القيمة؛ (2) إعادة الصياغة الشخصية (Reformulation) ومنع النسخ الحرفي لجمل النص؛ (3) احترام حجم التقرير (نحو ثلث النص، أي 80 إلى 110 كلمات عادة)؛ (4) الأمانة لمضمون النص دون إضافة معلومات خارجية.',
				'في شعبة الآداب والفلسفة (2AS LP)، يمثل التقرير الموضوعي ركيزة أساسية في الوضعية الإدماجية (7 نقاط) ويتطلب عناية خاصة بالروابط المنطقية وسلامة التهجئة وعلامات الترقيم.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Verbes pivots du Compte Rendu Objectif',
				rootLabel: 'Rapporter sans juger',
				rootSub: 'Toujours à la 3e personne + Présent',
				width: 580,
				branches: [
					{
						label: 'Introduire',
						rule: 'aborder, traiter de, présenter',
						example: 'L’auteur aborde le génie hydraulique.'
					},
					{
						label: 'Développer',
						rule: 'expliquer, préciser, démontrer',
						example: 'Il explique le rôle de la gravité.'
					},
					{
						label: 'Illustrer / Ajouter',
						rule: 'citer, ajouter, mentionner',
						example: 'Puis, il mentionne les oasis du Touat.'
					},
					{
						label: 'Conclure',
						rule: 'souligner, rappeler, conclure',
						example: 'Enfin, il souligne l’urgence de préserver.'
					}
				]
			}),
			visualCaptionAr: 'الأفعال المحورية المعتمدة في صياغة التقرير الموضوعي بضمير الغائب',
			examples: [
				{
					problemAr:
						'Rédigez une accroche correcte pour un texte explicatif intitulé « Le génie d’Al-Jazari », par Karim Mansouri, tiré de la revue « Savoirs et Patrimoine » (2024).',
					solutionAr:
						'Ce texte explicatif, intitulé « Le génie d’Al-Jazari », rédigé par Karim Mansouri et extrait de la revue « Savoirs et Patrimoine » (2024), présente les inventions hydrauliques et mécaniques de ce savant musulman afin de faire comprendre leur rigueur technique.'
				},
				{
					problemAr:
						'Corrigez cette phrase interdite dans un compte rendu objectif : « À mon avis, l’auteur a raison de dire que les foggaras sont merveilleuses. »',
					solutionAr:
						'Formulation objective correcte : « L’auteur souligne l’efficacité durable du système traditionnel des foggaras. »'
				}
			],
			watchOutAr:
				'احذر من خطأين يخصمان نصف العلامة في التقرير الموضوعي: (1) إدراج رأي شخصي (« Je trouve que... », « Selon moi... »)، لأن الرأي مخصص للتقرير النقدي فقط لا الموضوعي؛ (2) نسخ فقرات النص كما هي دون إعادة صياغة.'
		},
		practice: [
			{
				questionAr:
					'Laquelle de ces phrases convient à l’accroche d’un compte rendu objectif ?',
				options: [
					'J’ai beaucoup aimé ce texte scientifique qui parle de l’eau.',
					'Ce texte explicatif, intitulé « Les foggaras du Sahara » et extrait d’une revue de patrimoine, expose le fonctionnement de ce système d’irrigation.',
					'Dans cet article, je vais vous expliquer comment construire un canal.',
					'L’auteur aurait dû ajouter plus de détails sur le climat.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: تحتوي على ضمير المتكلم « J’ai » وحكم ذوقي شخصي.',
					'ممتاز! تجمع جميع عناصر المقدمة التعريفية بأسلوب موضوعي سليم.',
					'خطأ: التقرير الموضوعي يُكتب بضمير الغائب لا بضمير المتكلم.',
					'خطأ: هذا نقد شخصي مكانه التقرير النقدي وليس التقرير الموضوعي.'
				],
				explanationAr: 'مقدمة التقرير الموضوعي تعرف بنوع النص وعنوانه ومصدره وموضوعه بحياد تام.'
			},
			{
				questionAr:
					'Quel pronom personnel et quel temps privilégie-t-on pour rédiger le corps d’un compte rendu objectif ?',
				options: [
					'La 1re personne (je) et le futur simple',
					'La 3e personne (l’auteur / il) et le présent de l’indicatif',
					'La 2e personne (vous) et l’impératif présent',
					'La 1re personne du pluriel (nous) et le passé simple'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: ضمير المتكلم ممنوع في التقرير الموضوعي.',
					'صحيح! نعتمد الغائب (L’auteur / Il) مع المضارع الإخباري (Présent).',
					'خطأ: أسلوب الأمر والمخاطب لا يناسب التقرير الموضوعي.',
					'خطأ: نعتمد الغائب والمضارع الإخباري في التقرير.'
				],
				explanationAr: 'يُحرر التقرير الموضوعي دائماً بضمير الغائب (3e personne) وفي زمن المضارع (Présent de l’indicatif).'
			},
			{
				questionAr:
					'Que doit-on faire face aux exemples secondaires et aux longues parenthèses du texte source ?',
				options: [
					'Les recopier intégralement pour allonger la copie',
					'Les supprimer ou les synthétiser pour ne garder que les idées essentielles',
					'Les remplacer par des anecdotes personnelles',
					'Les placer dans l’accroche du compte rendu'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: النسخ والتطويل يناقضان مبدأ التلخيص والإيجاز.',
					'أحسنت! نركز على الأفكار الجوهرية ونختزل الأمثلة الفرعية.',
					'خطأ: يمنع إدخال معلومات أو قصص من خارج النص.',
					'خطأ: المقدمة مخصصة للتعريف بالنص وموضوعه العام فقط.'
				],
				explanationAr: 'يقوم التقرير الموضوعي على انتقاء الأفكار الأساسية وتكثيفها في حدود ثلث النص الأصلي.'
			},
			{
				questionAr:
					'Repérez l’erreur méthodologique dans cet extrait de compte rendu objectif : « Ensuite, l’auteur explique la réfraction lumineuse. Personnellement, j’estime que ses arguments sont brillants. »',
				options: [
					'L’emploi du connecteur « Ensuite »',
					'L’emploi du verbe « explique » au présent',
					'L’introduction d’un jugement personnel subjectif (« Personnellement, j’estime... »)',
					'La mention du thème de la réfraction lumineuse'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: استعمال الروابط مثل « Ensuite » مطلوب لتماسك التقرير.',
					'خطأ: الفعل « explique » في المضارع مناسب تماماً.',
					'صحيح! الجملة الثانية تكسر قاعدة الموضوعية بإقحام الرأي الشخصي.',
					'خطأ: ذكر الفكرة العلمية للنص أمر سليم.'
				],
				explanationAr: 'التقرير الموضوعي يمنع أي تعليق ذاتي أو عبارة مثل « Personnellement, j’estime ».'
			},
			{
				questionAr:
					'Quelle suite de connecteurs assure une progression cohérente dans le développement du compte rendu ?',
				options: [
					'D’abord... Ensuite... Par ailleurs... Enfin...',
					'Mais... Mais... Donc... Car...',
					'Peut-être... Sans doute... Hélas...',
					'Hier... Demain... Autrefois...'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! هذه الروابط تنظم تسلسل أفكار الكاتب بوضوح ومنهجية.',
					'خطأ: تكرار الروابط نفسها يضعف الأسلوب والتسلسل.',
					'خطأ: هذه ألفاظ شك وانفعال تناقض الموضوعية.',
					'خطأ: هذه ظروف زمانية سردية لا تنظم أفكار التقرير.'
				],
				explanationAr: 'تساعد روابط التنظيم (D’abord, Ensuite, Par ailleurs, Enfin) على إبراز بنية النص الأصلي بوضوح.'
			}
		]
	}
];
