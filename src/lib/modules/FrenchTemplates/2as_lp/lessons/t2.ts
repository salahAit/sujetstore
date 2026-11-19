import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchWritingBlueprint
} from '../../svg-french';

export const LESSONS_2AS_LP_T2: FrenchInteractiveLessonData[] = [
	{
		id: 'fre_lesson_2as_lp_t2_structure_argumentative',
		slug: 'fre-2as-lp-t2-structure-argumentative',
		grade: '2as_lp',
		yearSubjectId: 761,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع 2: المرافعة والاتهام (Le plaidoyer et le réquisitoire — الدفاع عن القيم الأخلاقية ومناهضة الآفات الاجتماعية)',
		order: 1,
		titleAr: 'البنية الحجاجية: الأطروحة، الحجج والأمثلة (Plaidoyer vs Réquisitoire)',
		objectives: [
			'التمييز الواضح بين المرافعة للدفاع عن قيمة نبيلة (Plaidoyer) وعريضة الاتهام لمناهضة آفة اجتماعية (Réquisitoire)',
			'استخراج مكونات النص الحجاجي بدقة: الموضوع (Thème)، الأطروحة (Thèse)، الحجج (Arguments)، الحجج المضادة (Contre-arguments) والأمثلة (Exemples)',
			'التعرف على أفعال الرأي وروابط الترتيب الحجاجي (D’abord, De plus, En outre, Enfin) التي تضبط تماسك الاستدلال'
		],
		keywordsAr: [
			'plaidoyer',
			'réquisitoire',
			'thèse',
			'arguments',
			'contre-arguments',
			'البنية الحجاجية'
		],
		discover: {
			scenarioAr:
				'في مجلة الثانوية، يكتب التلميذ أيمن نصاً يدافع فيه عن القراءة الورقية العميقة في المكتبات (Plaidoyer)، وتكتب زميلته سلمى مقالاً تندد فيه بظاهرة التبذير الغذائي في المناسبات (Réquisitoire). تأمل كيف يبني كل منهما موقفه بالحجة والدليل.',
			svg: svgFrenchGrammarMap({
				title: 'Architecture du texte argumentatif',
				rootLabel: 'Défendre ou Dénoncer',
				rootSub: 'Plaidoyer (Pour) vs Réquisitoire (Contre)',
				width: 580,
				branches: [
					{
						label: 'Thème & Thèse',
						rule: 'Sujet + Point de vue défendu',
						example: 'La lecture forge l’esprit critique.'
					},
					{
						label: 'Arguments',
						rule: 'Raisons logiques ou morales',
						example: 'Elle enrichit le vocabulaire durablement.'
					},
					{
						label: 'Exemples',
						rule: 'Faits concrets à l’appui',
						example: 'Par exemple, les clubs de lecture.'
					},
					{
						label: 'Contre-argument',
						rule: 'Objection ensuite réfutée',
						example: 'Certes les écrans vont vite, mais...'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'إذا كان الكاتب يدافع بحماس عن قيمة « التويزة » والتكافل بين الجيران في الحي، هل نصه مرافعة (Plaidoyer) أم اتهام (Réquisitoire)؟',
					hintAr: 'الكلمة plaidoyer من الفعل plaider en faveur de (يدافع لصالح).',
					expectedInput: 'Un plaidoyer',
					revealAr:
						'إنه مرافعة (Plaidoyer) لأنه يتبنى أطروحة إيجابية للدفاع عن قيمة أخلاقية أو سلوك حضاري نافع.'
				},
				{
					promptAr:
						'وإذا كان الكاتب يستنكر ظاهرة نشر الشائعات الكاذبة على الشبكات الرقمية ويعدد أضرارها، كيف نسمي هذا النص؟',
					hintAr: 'إنه يوجه اتهاماً لظاهرة سلبية مضرة بالمجتمع.',
					expectedInput: 'Un réquisitoire',
					revealAr:
						'إنه عريضة اتهام أو تنديد (Réquisitoire) يهدف إلى فضح آفة اجتماعية وإقناع القارئ بضرورة محاربتها.'
				},
				{
					promptAr:
						'تأمل المقطع: « La lecture développe la concentration ; par exemple, un élève qui lit vingt minutes par jour analyse mieux ses textes d’examen. » ميز بين الحجة (Argument) والمثال (Exemple).',
					hintAr: 'الحجة فكرة عامة قابلة للتبرير، والمثال حالة ملموسة تبدأ بـ par exemple.',
					expectedInput: 'الحجة: développer la concentration؛ والمثال: قراءة التلميذ عشرين دقيقة يومياً',
					revealAr:
						'الحجة (Argument) تبرر الأطروحة بفكرة منطقية، والمثال (Exemple) يجسد الحجة بواقع ملموس يزيدها إقناعاً.'
				}
			]
		},
		summary: {
			rulesAr: [
				'المرافعة (Le plaidoyer): خطاب حجاجي يُدافع عن فكرة أو قيمة أخلاقية أو سلوك نافع (مثل القراءة، الأمانة، التكافل، الحفاظ على البيئة)؛ ويغلب فيه المعجم الإيجابي التمجيدي (Lexique mélioratif).',
				'الاتهام أو التنديد (Le réquisitoire): خطاب حجاجي يُندد بآفة اجتماعية أو سلوك ضار (مثل التبذير الغذائي، الشائعات الرقمية، الغش، التلوث)؛ ويغلب فيه المعجم السلبي التنديدي (Lexique péjoratif).',
				'الأركان الأربعة للبنية الحجاجية: (1) الموضوع (Le thème)؛ (2) الأطروحة (La thèse : الرأي المدافع عنه، وقد تكون صريحة في المقدمة أو ضمنية)؛ (3) الحجج (Les arguments) المدعومة بأمثلة (Exemples)؛ (4) الحجة المضادة (Le contre-argument) التي يُعترف بجزء منها ثم تُدحض لتعزيز الأطروحة.',
				'الروابط التنظيمية للحجاج (Connecteurs d’énumération): D’abord / En premier lieu (أولاً)، Ensuite / De plus / En outre (ثانياً وإضافة)، Enfin / Pour conclure (أخيراً).'
			],
			visualSvg: svgFrenchWritingBlueprint({
				title: 'Plan d’un Plaidoyer ou d’un Réquisitoire',
				width: 580,
				steps: [
					{
						stage: '1. Introduction',
						detail: 'Présenter le thème moral/social et formuler clairement la thèse.'
					},
					{
						stage: '2. Argumentation (1)',
						detail: 'D’abord + 1er argument logique ou moral + exemple concret.'
					},
					{
						stage: '3. Argumentation (2)',
						detail: 'De plus + 2e argument + réfutation d’un contre-argument.'
					},
					{
						stage: '4. Conclusion',
						detail: 'Réaffirmer la thèse et lancer une invitation responsable au lecteur.'
					}
				]
			}),
			visualCaptionAr: 'الهيكلة المنهجية السليمة لنص المرافعة أو التنديد في السنة الثانية آداب وفلسفة',
			examples: [
				{
					problemAr:
						'Distinguez le thème et la thèse : « Le gaspillage alimentaire durant les fêtes est un fléau inacceptable qu’il faut combattre par l’éducation et la sobriété. »',
					solutionAr:
						'Thème : Le gaspillage alimentaire. | Thèse : C’est un fléau inacceptable qui doit être combattu par l’éducation et la sobriété (Réquisitoire).'
				},
				{
					problemAr:
						'Classez ces verbes selon qu’ils introduisent un plaidoyer ou un réquisitoire : défendre, dénoncer, condamner, valoriser.',
					solutionAr: 'Plaidoyer : défendre, valoriser. | Réquisitoire : dénoncer, condamner.'
				}
			],
			watchOutAr:
				'لا تخلط بين الموضوع (Le thème) والأطروحة (La thèse): الموضوع يكون كلمة أو عبارة اسمية محايدة (مثل: la lecture أو le gaspillage)، أما الأطروحة فهي جملة كاملة تعبّر عن موقف الكاتب من ذلك الموضوع.'
		},
		practice: [
			{
				questionAr:
					'Comment appelle-t-on un texte argumentatif qui défend avec conviction une valeur morale ou une cause utile ?',
				options: ['Un réquisitoire', 'Un plaidoyer', 'Un compte rendu objectif', 'Une notice technique'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: Réquisitoire يهدف إلى التنديد بآفة أو مهاجمة سلوك ضار.',
					'ممتاز! المرافعة للدفاع عن قيمة أو قضية نافعة تسمى « un plaidoyer ».',
					'خطأ: التقرير الموضوعي يلخص نصاً دون دفاع ذاتي.',
					'خطأ: الوثيقة التقنية إرشادية بحتة.'
				],
				explanationAr: 'المرافعة (Plaidoyer) هي النص الحجاجي الذي يدافع لصالح قضية أو قيمة.'
			},
			{
				questionAr:
					'Dans le texte : « L’entraide de voisinage, appelée Touiza, est une richesse sociale indispensable », quelle est la thèse ?',
				options: [
					'L’entraide de voisinage',
					'L’entraide de voisinage est une richesse sociale indispensable',
					'Le mot Touiza',
					'Les quartiers d’Algérie'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: هذه العبارة تمثل الموضوع (Le thème) فقط دون رأي.',
					'أحسنت! هذه الجملة الكاملة تعبر عن موقف الكاتب المدافع عنه (La thèse).',
					'خطأ: مجرد تسمية تراثية.',
					'خطأ: ليس موقفاً حجاجياً.'
				],
				explanationAr: 'الأطروحة هي الرأي الذي يتبناه الكاتب حول الموضوع، وصيغت هنا بصفة تقييمية « richesse sociale indispensable ».'
			},
			{
				questionAr:
					'Quel verbe caractérise typiquement un réquisitoire contre un fléau social ?',
				options: ['Promouvoir', 'Encourager', 'Dénoncer', 'Féliciter'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: Promouvoir (تعزيز) يخص المرافعة (Plaidoyer).',
					'خطأ: Encourager (تشجيع) يخص المرافعة.',
					'صحيح! الفعل « dénoncer » (التنديد) من أبرز أفعال عريضة الاتهام (Réquisitoire).',
					'خطأ: Féliciter (التهنئة) إيجابي.'
				],
				explanationAr: 'يعتمد التنديد (Réquisitoire) على أفعال الاستنكار مثل: dénoncer, condamner, combattre, critiquer.'
			},
			{
				questionAr:
					'À quoi sert un exemple dans un texte argumentatif ?',
				options: [
					'À remplacer complètement la thèse de l’auteur',
					'À illustrer concrètement un argument pour le rendre plus convaincant',
					'À contredire la conclusion du texte',
					'À supprimer tous les connecteurs logiques'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: المثال لا يعوض الأطروحة بل يخدم الحجة.',
					'ممتاز! المثال يجسد الحجة بحالة ملموسة فتزداد قوة الإقناع.',
					'خطأ: المثال يؤيد الحجة ولا يناقض الخاتمة.',
					'خطأ: لا علاقة له بحذف الروابط.'
				],
				explanationAr: 'وظيفة المثال (L’exemple) توضيح الحجة وتدعيمها بوقائع ملموسة.'
			},
			{
				questionAr:
					'Quelle est la fonction d’un contre-argument intégré puis réfuté dans un plaidoyer ?',
				options: [
					'Affaiblir la thèse de l’auteur',
					'Anticiper une objection adverse pour mieux la réfuter et renforcer sa propre thèse',
					'Transformer le texte en récit historique',
					'Rendre le texte totalement neutre et impersonnel'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: دحض الحجة المضادة يقوي الأطروحة ولا يضعفها.',
					'صحيح! استباق اعتراض الخصم ثم دحضه يجعل المرافعة أكثر نضجاً وإقناعاً.',
					'خطأ: يظل النص حجاجياً بامتياز.',
					'خطأ: المرافعة نص ذاتي ملتزم.'
				],
				explanationAr: 'إيراد حجة مضادة (Contre-argument) ثم الرد عليها (Réfutation) يثبت إحاطة الكاتب بالموضوع ويقوي أطروحته.'
			}
		]
	},
	{
		id: 'fre_lesson_2as_lp_t2_modalisateurs_subjectivite',
		slug: 'fre-2as-lp-t2-modalisateurs-subjectivite',
		grade: '2as_lp',
		yearSubjectId: 761,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع 2: المرافعة والاتهام (Le plaidoyer et le réquisitoire — الدفاع عن القيم الأخلاقية ومناهضة الآفات الاجتماعية)',
		order: 2,
		titleAr: 'الموجّهات وعلامات الذاتية (Les modalisateurs et les marques de subjectivité)',
		objectives: [
			'رصد علامات حضور المتكلم والذاتية (Indices de subjectivité) في نصوص المرافعة والتنديد',
			'التمييز بين المعجم التمجيدي المادح (Lexique mélioratif) والمعجم القدحي الناقد (Lexique péjoratif)',
			'توظيف الموجّهات (Les modalisateurs: يقين، شك، وجوب، تقدير) لتوجيه موقف القارئ بدقة'
		],
		keywordsAr: [
			'modalisateurs',
			'subjectivité',
			'lexique mélioratif',
			'lexique péjoratif',
			'verbes d’opinion',
			'علامات الذاتية'
		],
		discover: {
			scenarioAr:
				'قارن بين قولين حول نشر الأخبار غير المؤكدة: (A) « Certains internautes partagent des informations non vérifiées. » و (B) « Il est malheureusement indéniable que ces rumeurs toxiques ravagent la confiance sociale ; nous devons absolument vérifier chaque source ! » أين تظهر بصمة الكاتب وانفعاله؟',
			svg: svgFrenchGrammarMap({
				title: 'Les marques de subjectivité et modalisateurs',
				rootLabel: 'Présence de l’énonciateur',
				rootSub: 'Exprimer un jugement, une certitude ou un devoir',
				width: 580,
				branches: [
					{
						label: 'Lexique évaluatif',
						rule: 'Mélioratif (+) / Péjoratif (-)',
						example: 'précieux, noble / nocif, fléau'
					},
					{
						label: 'Adverbes modaux',
						rule: 'Certitude, doute, regret',
						example: 'certes, hélas, certainement'
					},
					{
						label: 'Verbes & Modes',
						rule: 'Opinion, devoir, conditionnel',
						example: 'estimer, devoir, il faudrait'
					},
					{
						label: 'Pronoms & Ponctuation',
						rule: 'je, nous, !, ?, guillemets',
						example: 'Nous refusons ce gaspillage !'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'استخرج من الجملة (B) كلمتين تنتميان إلى المعجم القدحي السلبي (Lexique péjoratif).',
					hintAr: 'انظر إلى صفة الشائعات والفعل الذي تفعله بالثقة الاجتماعية.',
					expectedInput: 'toxiques / ravagent',
					revealAr:
						'الصفة « toxiques » (سامة) والفعل « ravagent » (تدمر) ينتميان إلى المعجم القدحي (Péjoratif) الذي يعكس رفض الكاتب وإدانته.'
				},
				{
					promptAr:
						'ما قيمة الظرفين « malheureusement » و « absolument » في الجملة (B)؟',
					hintAr: 'الأول يعبر عن الأسف والثاني عن الشدة واليقين القاطع.',
					expectedInput: 'هما موجّهان (Modalisateurs) يعبران عن الأسف والوجوب القاطع',
					revealAr:
						'الظرف « malheureusement » موجّه عاطفي يدل على الأسف، بينما « absolument » و « indéniable » موجّهان لليقين والضرورة.'
				},
				{
					promptAr:
						'ما دور علامة التعجب (!) وضمير المتكلم الجماعي « nous » في ختام الجملة (B)؟',
					hintAr: 'هل الكاتب محايد أم أنه يشرك القارئ في التزام أخلاقي؟',
					expectedInput: 'إشراك القارئ وإبراز الحماسة والالتزام الأخلاقي للكاتب',
					revealAr:
						'ضمير « nous » الشامل (Nous inclusif) يشرك القارئ في المسؤولية، وعلامة التعجب تبرز الانفعال والالتزام الصريح.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الذاتية (La subjectivité) تعني حضور موقف الكاتب ومشاعره وأحكامه داخل النص، وتظهر عبر: ضمائر المتكلم والمخاطب (je, nous, vous)، علامات التعجب والاستفهام الاستنكاري، والمزدوجتين للتشكيك (Guillemets de distanciation).',
				'المعجم التقييمي (Le lexique évaluatif): ينقسم إلى معجم تمجيدي مادح (Mélioratif) يغلب في المرافعة (noble, précieux, admirable, bénéfique, indispensable)، ومعجم قدحي ذام (Péjoratif) يغلب في التنديد (fléau, nuisible, déplorable, irresponsable, gaspiller).',
				'الموجّهات (Les modalisateurs) تضبط درجة التبني: (أ) اليقين (Certitude): sans aucun doute, indéniablement, il est évident que؛ (ب) الشك والاحتمال (Doute/Prudence): peut-être, probablement, il semble que، وصيغة الشرطي (Conditionnel)؛ (ج) الوجوب (Obligation): devoir, falloir, il est impératif de.',
				'أفعال الرأي (Verbes d’opinion): penser, croire, estimer, juger, affirmer, dénoncer, condamner — وهي تحمل صراحة وجهة نظر الكاتب.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Nuances des Modalisateurs dans l’Argumentation',
				subtitle: 'Adapter le degré de certitude ou de jugement à son intention',
				width: 560,
				columns: [
					{
						header: 'Certitude (+)',
						rule: 'Affirmer avec force',
						examples: 'sans doute, évident, certain'
					},
					{
						header: 'Prudence (?)',
						rule: 'Nuancer / Prendre distance',
						examples: 'semble, peut-être, prétendrait'
					},
					{
						header: 'Jugement (!)',
						rule: 'Valoriser ou Condamner',
						examples: 'admirable, hélas, déplorable'
					}
				]
			}),
			visualCaptionAr: 'تصنيف الموجّهات حسب دلالتها: اليقين، الاحتراز، والحكم القيمي',
			examples: [
				{
					problemAr:
						'Relevez trois modalisateurs dans : « Il est impératif que nous combattions ce fléau déplorable qui menace, hélas, nos jeunes. »',
					solutionAr:
						'1) « Il est impératif que » (obligation) ; 2) « fléau déplorable » (lexique péjoratif) ; 3) « hélas » (adverbe de regret).'
				},
				{
					problemAr:
						'Transformez cette phrase neutre en phrase subjective (plaidoyer) : « La lecture augmente le vocabulaire des élèves. »',
					solutionAr:
						'« Je suis convaincu que la lecture enrichit admirablement le vocabulaire de nos élèves ! »'
				}
			],
			watchOutAr:
				'تنبيه هام: العبارة الفرنسية « sans doute » تعني في الاستعمال الحديث « غالباً / على الأرجح » (احتمال قوي)، أما لليقين المطلق فنستعمل « sans aucun doute » أو « indubitablement » أو « assurément ».'
		},
		practice: [
			{
				questionAr:
					'Parmi ces mots, lequel appartient au lexique péjoratif employé dans un réquisitoire ?',
				options: ['exemplaire', 'salutaire', 'désastreux', 'vertueux'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: exemplaire (مثالي) صفة تمجيدية إيجابية.',
					'خطأ: salutaire (نافع ومنقذ) صفة إيجابية.',
					'أحسنت! « désastreux » (كارثي) صفة قدحية سلبية تُستعمل في التنديد.',
					'خطأ: vertueux (فاضل) صفة أخلاقية إيجابية.'
				],
				explanationAr: 'الصفة « désastreux » تحمل حكماً سلبياً قوياً فتندرج في المعجم القدحي (Péjoratif).'
			},
			{
				questionAr:
					'Quelle nuance exprime le modalisateur souligné dans : « L’usage excessif des écrans pourrait affaiblir la mémoire visuelle » ?',
				options: ['Une certitude absolue', 'Une possibilité ou prudence (conditionnel)', 'Un ordre strict', 'Un regret passé'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الشرطي الحاضر لا يفيد اليقين القاطع.',
					'ممتاز! الفعل « pourrait » في الشرطي الحاضر يعبر عن الاحتمال والحذر العلمي.',
					'خطأ: ليس أسلوب أمر.',
					'خطأ: هذا شرطي حاضر للمستقبل/الحاضر وليس ماضياً.'
				],
				explanationAr: 'استعمال الشرطي (Conditionnel présent : pourrait) موجّه يعبر عن الاحتمال والاحتراز.'
			},
			{
				questionAr:
					'Quel effet produisent les guillemets dans : « Certains prétendent que ces « informations » virales remplacent les livres sérieux » ?',
				options: [
					'Ils montrent que l’auteur approuve totalement ces informations',
					'Ils marquent une mise à distance critique : l’auteur doute de leur valeur',
					'Ils indiquent une définition scientifique neutre',
					'Ils remplacent un point d’interrogation'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: بالعكس، وجود الفعل « prétendent » والمزدوجتين يبدي تشككاً.',
					'صحيح! المزدوجتان هنا علامة ذاتية للمسافة النقدية والتشكيك (Distanciation).',
					'خطأ: السياق نقدي وليس تعريفياً محايداً.',
					'خطأ: المزدوجتان لا تحلان محل علامة الاستفهام.'
				],
				explanationAr: 'المزدوجتان حول كلمة « informations » مع الفعل « prétendent » تبرزان تشكيك الكاتب وسخريته النقدية.'
			},
			{
				questionAr:
					'Identifiez la phrase qui exprime une obligation morale forte :',
				options: [
					'Les habitants ramassent parfois les déchets du parc.',
					'Il est impératif de préserver la propreté de nos espaces publics.',
					'Peut-être que les rues seront plus propres demain.',
					'Le parc municipal compte cinquante arbres.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: جملة إخبارية محايدة.',
					'أحسنت! العبارة « Il est impératif de » موجّه وجوب أخلاقي صريح.',
					'خطأ: « Peut-être » يعبر عن الشك لا الوجوب.',
					'خطأ: معلومة موضوعية إحصائية.'
				],
				explanationAr: 'تستعمل عبارات مثل « Il est impératif de / Il faut / Nous devons » للتعبير عن الوجوب والالتزام.'
			},
			{
				questionAr:
					'Quel modalisateur exprime le regret de l’énonciateur face à un fléau social ?',
				options: ['heureusement', 'hélas', 'certes', 'notamment'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: heureusement تعبر عن الارتياح والسرور.',
					'صحيح! « hélas » (للأسف) أداة عاطفية تعبر عن التحسر والأسف.',
					'خطأ: certes أداة استدراك وتسليم جزئي.',
					'خطأ: notamment أداة تمثيل وإيضاح.'
				],
				explanationAr: 'الكلمة « hélas » (وكذلك malheureusement / déplorablement) تعبر عن أسف المتكلم.'
			}
		]
	},
	{
		id: 'fre_lesson_2as_lp_t2_opposition_concession',
		slug: 'fre-2as-lp-t2-opposition-concession',
		grade: '2as_lp',
		yearSubjectId: 761,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع 2: المرافعة والاتهام (Le plaidoyer et le réquisitoire — الدفاع عن القيم الأخلاقية ومناهضة الآفات الاجتماعية)',
		order: 3,
		titleAr: 'التعبير عن التقابل والاستدراك (Opposition et concession : bien que, quoique, malgré)',
		objectives: [
			'التمييز الدلالي والنحوي الدقيق بين التقابل (Opposition) والاستدراك/التسليم الجزئي (Concession)',
			'إتقان تصريف الفعل في صيغة النصب (Subjonctif) بعد « bien que » و « quoique »، مقابل الاسم بعد « malgré » و « en dépit de »',
			'استعمال البنية الحجاجية « Certes... mais / pourtant / cependant » لدحض حجة مضادة بفاعلية'
		],
		keywordsAr: [
			'opposition',
			'concession',
			'bien que',
			'quoique',
			'malgré',
			'subjonctif',
			'الاستدراك والتقابل'
		],
		discover: {
			scenarioAr:
				'في مرافعة عن الكتب المطبوعة، يكتب التلميذ: « Bien que les outils numériques soient très rapides, le livre imprimé reste irremplaçable pour la réflexion profonde. Malgré l’attrait des écrans, de nombreux jeunes fréquentent encore les bibliothèques. » لاحظ صيغة الفعل بعد « Bien que » والتركيب بعد « Malgré ».',
			svg: svgFrenchGrammarMap({
				title: 'Exprimer l’Opposition et la Concession',
				rootLabel: 'Nuancer et Réfuter',
				rootSub: 'Respecter le mode verbal ou la nature du groupe',
				width: 580,
				branches: [
					{
						label: 'Subjonctif obligatoire',
						rule: 'bien que, quoique + Subj.',
						example: 'Bien qu’il soit tard, il lit.'
					},
					{
						label: 'Groupe nominal (GN)',
						rule: 'malgré, en dépit de + GN',
						example: 'Malgré la fatigue, il persévère.'
					},
					{
						label: 'Opposition (Indicatif)',
						rule: 'alors que, tandis que + Ind.',
						example: 'Il travaille alors que l’autre hésite.'
					},
					{
						label: 'Concession en 2 temps',
						rule: 'Certes..., mais / cependant',
						example: 'Certes c’est long, mais c’est utile.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'تأمل الفعل « soient » في « Bien que les outils numériques soient très rapides ». في أي صيغة صُرف الفعل « être » ولماذا؟',
					hintAr: 'تذكر الصيغة الإجبارية بعد « bien que » و « quoique ».',
					expectedInput: 'في صيغة Subjonctif présent لأن bien que تطلب النصب وجوباً',
					revealAr:
						'الأداتان « bien que » و « quoique » تتطلبان دائماً تصريف الفعل في صيغة النصب (Subjonctif): que je sois, qu’il ait, qu’ils fassent, qu’ils puissent.'
				},
				{
					promptAr:
						'في الجملة الثانية: « Malgré l’attrait des écrans », هل يجوز قول « Malgré que les écrans attirent » في الفرنسية المدرسية الفصيحة؟',
					hintAr: 'تذكر أن « malgré » حرف جر يتبعه اسم فقط (GN).',
					expectedInput: 'لا، نكتب Malgré + اسم فقط، أو نستعمل Bien que + جملة فعلية في Subjonctif',
					revealAr:
						'القاعدة الصارمة في الامتحانات: « malgré » و « en dépit de » يتبعهما اسم (GN) فقط، ولا نكتب « malgré que » أبداً، بل نبدلها بـ « bien que » أو « quoique ».'
				},
				{
					promptAr:
						'ما الفرق الدلالي بين « Alors que » (تقابل) و « Bien que » (استدراك)؟',
					hintAr: 'في التقابل نقارن حقيقتين مختلفتين؛ وفي الاستدراك تقع نتيجة عكس المتوقع.',
					expectedInput: 'Alors que تقابل بين حقيقتين متغايرتين وتأخذ Indicatif، أما Bien que فتعبر عن عائق لا يمنع تحقق النتيجة وتأخذ Subjonctif',
					revealAr:
						'التقابل (Opposition: alors que, tandis que + Indicatif) يضع حقيقتين متوازيتين وجهاً لوجه، أما الاستدراك (Concession: bien que + Subjonctif) فيثبت تحقق الفعل رغم وجود عائق.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الاستدراك مع الجملة التابعة (Subordonnée de concession): نستعمل bien que + Subjonctif، quoique + Subjonctif، même si + Indicatif (تنبيه: même si يأخذ Indicatif لا Subjonctif!).',
				'الاستدراك مع المجموعة الاسمية (GN): نستعمل malgré + GN، en dépit de + GN (مثال: Malgré les obstacles, le projet aboutit). للتحويل من bien que إلى malgré نستخدم الاسمية (Nominalisation)!',
				'الاستدراك المنسّق في الحجاج: Certes..., mais / cependant / pourtant / néanmoins / toutefois — يُعد أبلغ بنية لإدماج حجة مضادة والرد عليها في المرافعة.',
				'التقابل (L’opposition): نستعمل alors que + Indicatif، tandis que + Indicatif، au contraire، par contre (مثال: Les livres exigent de la patience, tandis que les vidéos brèves privilégient l’instantané).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Subjonctif présent des verbes clés après « bien que »',
				subtitle: 'Formes incontournables aux examens de 2AS',
				width: 560,
				columns: [
					{
						header: 'Être / Avoir',
						rule: 'qu’il soit / qu’ils soient',
						examples: 'qu’il ait / qu’ils aient'
					},
					{
						header: 'Faire / Pouvoir',
						rule: 'qu’il fasse / qu’ils fassent',
						examples: 'qu’il puisse / qu’ils puissent'
					},
					{
						header: 'Savoir / Vouloir',
						rule: 'qu’il sache / qu’ils sachent',
						examples: 'qu’il veuille / qu’ils veuillent'
					}
				]
			}),
			visualCaptionAr: 'تصريف الأفعال الأكثر وروداً في صيغة النصب (Subjonctif) بعد bien que و quoique',
			examples: [
				{
					problemAr:
						'Remplacez « malgré » par « bien que » : « Malgré sa difficulté, l’étude de la philosophie éclaire la pensée. »',
					solutionAr: 'Bien qu’elle soit difficile, l’étude de la philosophie éclaire la pensée.'
				},
				{
					problemAr:
						'Reliez par « certes... mais » : « Les réseaux sociaux diffusent vite les nouvelles. Ils propagent souvent des rumeurs. »',
					solutionAr:
						'Certes, les réseaux sociaux diffusent vite les nouvelles, mais ils propagent souvent des rumeurs.'
				}
			],
			watchOutAr:
				'أخطاء ثلاثة يجب تجنبها تماماً: (1) لا تكتب أبداً « malgré que »؛ (2) لا تضع Indicatif بعد « bien que » (خطأ: bien qu’il est؛ صواب: bien qu’il soit)؛ (3) تذكر أن « même si » يأخذ Indicatif (مثال: même s’il est difficile) لا Subjonctif!'
		},
		practice: [
			{
				questionAr:
					'Choisissez la forme verbale exacte : « Bien que la désinformation ...... répandue, l’esprit critique permet de la déjouer. »',
				options: ['est', 'soit', 'sera', 'était'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: « est » في الإخباري (Indicatif)، و « bien que » تفرض Subjonctif.',
					'ممتاز! الفعل « être » في Subjonctif présent مع المفرد الغائب هو « soit ».',
					'خطأ: المستقبل لا يأتي بعد « bien que ».',
					'خطأ: « était » ماض مستمر إخباري لا يناسب « bien que ».'
				],
				explanationAr: 'الرابط « bien que » يستوجب دائماً تصريف الفعل في صيغة النصب (Subjonctif : soit).'
			},
			{
				questionAr:
					'Transformez correctement avec « malgré » : « Bien que les efforts soient longs, la réussite récompense la patience. »',
				options: [
					'Malgré que les efforts soient longs, la réussite récompense la patience.',
					'Malgré la longueur des efforts, la réussite récompense la patience.',
					'Malgré longs les efforts, la réussite récompense la patience.',
					'Malgré sont longs les efforts, la réussite récompense la patience.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الصيغة « malgré que » مرفوضة في الفرنسية المعيارية.',
					'أحسنت! حولنا الجملة إلى مجموعة اسمية (la longueur des efforts) بعد « Malgré ».',
					'خطأ: تركيب غير نحوي.',
					'خطأ: لا يتبع « malgré » فعل مصرف.'
				],
				explanationAr: 'حرف الجر « malgré » يتبعه دائماً اسم أو مجموعة اسمية (GN)، فنحول الصفة « longs » إلى الاسم « la longueur ».'
			},
			{
				questionAr:
					'Complétez avec le mode convenable : « Même si ce livre ...... exigeant, sa lecture enrichit profondément l’élève. »',
				options: ['soit', 'est', 'fût', 'soient'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: انتبه! « même si » يتبعه الإخباري (Indicatif) وليس Subjonctif.',
					'صحيح! « même si » يأخذ الإخباري دائماً (Même si ce livre est exigeant).',
					'خطأ: هذا نصب ماض لا يصح مع « même si ».',
					'خطأ: الفاعل مفرد والرابط يطلب Indicatif.'
				],
				explanationAr: 'على خلاف « bien que »، فإن « même si » يُتبع دائماً بصيغة الإخباري (Indicatif).'
			},
			{
				questionAr:
					'Choisissez la phrase correcte avec « quoique » (en un seul mot) :',
				options: [
					'Quoiqu’il puisse paraître ardu, cet exercice reste formateur.',
					'Quoiqu’il peut paraître ardu, cet exercice reste formateur.',
					'Quoique la difficulté, cet exercice reste formateur.',
					'Quoiqu’il pourra paraître ardu, cet exercice reste formateur.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! « quoique » (بمعنى bien que) يتبعه Subjonctif présent (puisse).',
					'خطأ: « peut » في الإخباري لا Subjonctif.',
					'خطأ: « quoique » لا يتبعه اسم بمفرده كـ « malgré ».',
					'خطأ: لا يأتي المستقبل بعد « quoique ».'
				],
				explanationAr: 'الأداة « quoique » مرادفة لـ « bien que » وتتطلب صيغة النصب (Subjonctif : puisse).'
			},
			{
				questionAr:
					'Quel articulateur complète naturellement cette concession argumentative : « ...... l’écran facilite l’accès rapide aux textes, ...... la lecture sur papier favorise une mémorisation durable. » ?',
				options: [
					'Parce que ... donc',
					'Certes ... mais',
					'Si ... alors',
					'D’abord ... ensuite'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: هذه علاقة سبب ونتيجة لا استدراك.',
					'أحسنت! الثنائية « Certes ... mais » تُسلم بميزة ثم تستدرك بالحجة الأقوى.',
					'خطأ: هذه بنية شرطية.',
					'خطأ: هذه روابط تعداد لا استدراك.'
				],
				explanationAr: 'الثنائية « Certes..., mais... » هي البنية القياسية للاستدراك الحجاجي (Concession suivie d’une réfutation).'
			}
		]
	},
	{
		id: 'fre_lesson_2as_lp_t2_figures_argumentation',
		slug: 'fre-2as-lp-t2-figures-argumentation',
		grade: '2as_lp',
		yearSubjectId: 761,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع 2: المرافعة والاتهام (Le plaidoyer et le réquisitoire — الدفاع عن القيم الأخلاقية ومناهضة الآفات الاجتماعية)',
		order: 4,
		titleAr: 'الصور البلاغية في خدمة الحجاج (Antithèse, anaphore, question rhétorique)',
		objectives: [
			'التعرف على أبرز الصور والأساليب البلاغية في الخطاب الحجاجي: الطباق (Antithèse)، التكرار الصدري (Anaphore)، الاستفهام البلاغي (Question rhétorique)، والتدرج (Gradation)',
			'تحليل الأثر الإقناعي لكل أسلوب بلاغي في تقوية المرافعة أو التنديد',
			'إنتاج جمل حجاجية بليغة ومؤثرة توظف هذه الصور بوعي دون تكلف'
		],
		keywordsAr: [
			'figures de style',
			'antithèse',
			'anaphore',
			'question rhétorique',
			'gradation',
			'البلاغة الحجاجية'
		],
		discover: {
			scenarioAr:
				'في ختام مرافعة أمام زملائه حول الأمانة والصدق في الدراسة، يقول الطالب إلياس: « L’honnêteté construit la confiance, le mensonge détruit la dignité. Refusons la fraude ! Refusons la facilité ! Refusons le mépris du savoir ! Pouvons-nous bâtir l’avenir sur la tricherie ? » تأمل جمال الإيقاع وقوة التأثير في هذا الخطاب.',
			svg: svgFrenchGrammarMap({
				title: 'Les figures de style au service de l’argumentation',
				rootLabel: 'Convaincre et Émouvoir',
				rootSub: 'Frapper l’esprit du lecteur avec force',
				width: 580,
				branches: [
					{
						label: 'Antithèse',
						rule: 'Opposer deux termes contraires',
						example: 'L’effort élève, la paresse abaisse.'
					},
					{
						label: 'Anaphore',
						rule: 'Répéter le même début de phrase',
						example: 'Protégeons l’eau ! Protégeons la vie !'
					},
					{
						label: 'Question rhétorique',
						rule: 'Fausse question à réponse évidente',
						example: 'Peut-on accepter un tel gâchis ?'
					},
					{
						label: 'Gradation',
						rule: 'Termes en intensité croissante',
						example: 'Une erreur, une faute, un fléau.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'تأمل الجملة الأولى: « L’honnêteté construit la confiance, le mensonge détruit la dignité. » ما الصورة البلاغية التي تجمع بين الأضداد (honnêteté/mensonge و construit/détruit)؟',
					hintAr: 'مقابلة معنيين متضادين في الجملة نفسها.',
					expectedInput: 'L’antithèse',
					revealAr:
						'إنها الطباق والمقابلة (L’antithèse)، وتُبرز التناقض الحاد بين القيمة النبيلة والآفة المذمومة فتزيد الحجة وضوحاً وقوة.'
				},
				{
					promptAr:
						'تأمل تكرار الفعل في بداية الجمل الثلاث المتتابعة: « Refusons la fraude ! Refusons la facilité ! Refusons le mépris du savoir ! » كيف تُسمى هذه الصورة البلاغية؟',
					hintAr: 'تكرار الكلمة نفسها في صدر جمل متتالية.',
					expectedInput: 'L’anaphore',
					revealAr:
						'إنها التكرار الصدري (L’anaphore)، ويخلق إيقاعاً خطابياً مؤثراً يرسخ الفكرة المركزية في ذهن المتلقي.'
				},
				{
					promptAr:
						'في السؤال الختامي « Pouvons-nous bâtir l’avenir sur la tricherie ? »، هل ينتظر إلياس إجابة مجهولة من الجمهور؟ وما اسم هذا الأسلوب؟',
					hintAr: 'الجواب البديهي هو « لا طبعاً! ».',
					expectedInput: 'سؤال بلاغي (Question rhétorique / fausse question) يحث القارئ على التسليم بأطروحة الكاتب',
					revealAr:
						'الاستفهام البلاغي (La question rhétorique) سؤال لا يطلب معلومة، بل يفرض إجابة بديهية توافق أطروحة الكاتب ويشرك القارئ وجدانياً.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الطباق / المقابلة (L’antithèse): الجمع في جملة واحدة أو فقرة قصيرة بين كلمتين أو فكرتين متضادتين (مثل: lumière / obscurité، construire / détruire، sagesse / imprudence) لتوضيح المفارقة الأخلاقية.',
				'التكرار الصدري (L’anaphore): تكرار كلمة أو عبارة في بداية عدة جمل أو فقرات متتالية (مثل: Lire, c’est... Lire, c’est... Lire, c’est...) من أجل التأكيد (Insistance) وخلق إيقاع خطابي جذاب.',
				'الاستفهام البلاغي (La question rhétorique / oratoire): سؤال إجابته بديهية ومضمَرة في ذهن القارئ؛ يهدف إلى استمالة القارئ وإجباره عقلياً وأخلاقياً على تأييد موقف الكاتب.',
				'التدرج (La gradation): ترتيب كلمات أو عبارات بتصاعد (أو تنازل) في القوة والدلالة (مثال: Cette négligence gêne, inquiète, puis menace toute la collectivité) لبيان خطورة الظاهرة.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Identifier et interpréter les figures argumentatives',
				subtitle: 'Toujours nommer la figure ET expliquer son effet persuasif',
				width: 560,
				columns: [
					{
						header: 'Antithèse',
						rule: 'Contraste net entre deux pôles',
						examples: 'Effet : souligner le choix moral'
					},
					{
						header: 'Anaphore',
						rule: 'Répétition en tête de phrase',
						examples: 'Effet : insister et rythmer'
					},
					{
						header: 'Q. Rhétorique',
						rule: 'Question à réponse évidente',
						examples: 'Effet : impliquer le lecteur'
					}
				]
			}),
			visualCaptionAr: 'منهجية الإجابة في الامتحان: تسمية الصورة البلاغية + بيان أثرها الحجاجي',
			examples: [
				{
					problemAr:
						'Nommez la figure et précisez son effet : « Le gaspillage appauvrit les uns tandis que la sobriété protège les autres. »',
					solutionAr:
						'Figure : Antithèse (gaspillage / sobriété ; appauvrit / protège). Effet : Elle met en contraste saisissant les méfaits du gaspillage et les bienfaits de la modération.'
				},
				{
					problemAr:
						'Nommez la figure : « Cette rumeur trouble un voisin, divise un quartier, embrase toute une ville. »',
					solutionAr:
						'Figure : Gradation ascendante (trouble -> divise -> embrase ; voisin -> quartier -> ville). Effet : Elle montre l’amplification dangereuse de la rumeur.'
				}
			],
			watchOutAr:
				'في امتحانات الثانية آداب وفلسفة لا تكتفِ بتسمية الصورة البلاغية فقط إذا طُلب منك « Identifiez et expliquez son effet »! اربط دائماً بين التسمية والأثر الحجاجي (مثلاً: « pour insister sur... », « pour mettre en relief l’opposition entre... », « pour interpeller le lecteur »).'
		},
		practice: [
			{
				questionAr:
					'Quelle figure de style reconnaît-on dans : « Choisissons la science qui éclaire plutôt que l’ignorance qui égare » ?',
				options: ['Une anaphore', 'Une antithèse', 'Une question rhétorique', 'Une périphrase'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا يوجد تكرار في بداية عدة جمل.',
					'ممتاز! تقابل الأضداد (science / ignorance و éclaire / égare) يشكل طباقاً (Antithèse).',
					'خطأ: الجملة ليست استفهامية.',
					'خطأ: ليست كناية تعريفية.'
				],
				explanationAr: 'الجمع بين الأضداد (العلم/الجهل، ينير/يضل) في جملة واحدة هو الطباق (Antithèse).'
			},
			{
				questionAr:
					'Quelle figure caractérise : « Chaque livre ouvert est une porte ; chaque livre lu est un trésor ; chaque livre partagé est un pont » ?',
				options: ['Une question rhétorique', 'Une anaphore', 'Un oxymore', 'Une litote'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا توجد صيغة استفهام.',
					'أحسنت! تكرار « chaque livre » في صدر الجمل المتتالية هو التكرار الصدري (Anaphore).',
					'خطأ: الأوكسيمور يجمع كلمتين متناقضتين متجاورتين تماماً.',
					'خطأ: الليتوت تعبر عن الكثير بقليل من الألفاظ.'
				],
				explanationAr: 'تكرار العبارة نفسها « chaque livre » في بداية كل شطر يمثل Anaphore.'
			},
			{
				questionAr:
					'Pourquoi un auteur termine-t-il un réquisitoire par la question : « Resterons-nous les bras croisés devant un tel gaspillage de pain ? » ?',
				options: [
					'Parce qu’il ignore la réponse et attend une enquête statistique',
					'Pour interpeller la conscience du lecteur et l’amener à dire « non » avec lui',
					'Pour changer de thème à la fin du texte',
					'Pour adopter un ton purement scientifique et impersonnel'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: السؤال ليس لطلب معلومة مجهولة.',
					'صحيح! إنه استفهام بلاغي (Question rhétorique) يحرك ضمير القارئ لرفض التبذير.',
					'خطأ: السؤال يرسخ الموضوع نفسه ولا يغيره.',
					'خطأ: السؤال البلاغي علامة التزام وذاتية.'
				],
				explanationAr: 'السؤال البلاغي يستنفر وجدان القارئ ويدفعه للتفاعل الإيجابي مع موقف الكاتب.'
			},
			{
				questionAr:
					'Identifiez la figure de style dans : « L’incivisme agace d’abord, choque ensuite, révolte enfin toute la communauté. »',
				options: ['Une gradation ascendante', 'Une anaphore', 'Une question rhétorique', 'Une comparaison explicite'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! تصاعد الأفعال (agace -> choque -> révolte) يشكل تدرجاً تصاعدياً (Gradation ascendante).',
					'خطأ: لا يتكرر لفظ واحد في صدر الجمل.',
					'خطأ: ليست جملة استفهامية.',
					'خطأ: لا توجد أداة تشبيه مثل comme.'
				],
				explanationAr: 'تدرج الأفعال في الشدة والوقع النفسي يمثل تدرجاً تصاعدياً (Gradation ascendante).'
			},
			{
				questionAr:
					'Laquelle de ces phrases combine à la fois une anaphore et une antithèse ?',
				options: [
					'La bibliothèque municipale ouvre ses portes à neuf heures.',
					'Oui à la rigueur, non à la paresse ; oui au respect, non à la brutalité !',
					'Combien coûte la restauration de cette école ?',
					'Les élèves préparent leurs exposés avec sérieux.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: جملة إخبارية بسيطة.',
					'أحسنت! تكرار « oui à... non à... » (Anaphore) ومقابلة الأضداد rigueur/paresse و respect/brutalité (Antithèse).',
					'خطأ: سؤال حقيقي للاستعلام.',
					'خطأ: جملة خبرية خالية من الصور البلاغية.'
				],
				explanationAr: 'تجمع الجملة بين التكرار الصدري (oui à / non à) والمقابلة بين القيم وأضدادها (Antithèse).'
			}
		]
	},
	{
		id: 'fre_lesson_2as_lp_t2_rediger_plaidoyer_requisitoire',
		slug: 'fre-2as-lp-t2-rediger-plaidoyer-requisitoire',
		grade: '2as_lp',
		yearSubjectId: 761,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع 2: المرافعة والاتهام (Le plaidoyer et le réquisitoire — الدفاع عن القيم الأخلاقية ومناهضة الآفات الاجتماعية)',
		order: 5,
		titleAr: 'تحرير مرافعة أو عريضة تنديد محكمة (Rédiger un plaidoyer ou un réquisitoire rigoureux)',
		objectives: [
			'بناء موضوع حجاجي متكامل (140 إلى 180 كلمة) من ثلاث مراحل واضحة: مقدمة بأطروحة، عرض بحجج متدرجة واستدراك، وخاتمة حازمة',
			'التنويع المنهجي في الروابط الحجاجية (D’abord, De plus, Certes... mais, Par conséquent, En somme) والمعجم التقييمي المناسب',
			'تجنب الحشو والتناقض والانزلاق نحو الخطاب العاطفي الفارغ دون حجج منطقية وأمثلة واقعية'
		],
		keywordsAr: [
			'production écrite',
			'plaidoyer',
			'réquisitoire',
			'plan argumentatif',
			'connecteurs',
			'كتابة نص حجاجي'
		],
		discover: {
			scenarioAr:
				'في اختبار الفصل الثاني (7 نقاط)، طُلب منك كتابة مرافعة لصالح التطوع المدرسي وتنظيف الأحياء أو تنديد بظاهرة الغش في الامتحانات. كيف تنظم أفكارك قبل البدء في التحرير لتضمن علامة ممتازة؟',
			svg: svgFrenchWritingBlueprint({
				title: 'Grille de réussite d’un Plaidoyer / Réquisitoire (7 pts)',
				width: 580,
				steps: [
					{
						stage: '1. Intro + Thèse',
						detail: 'Accroche contextuelle + formulation nette de la position (Pour/Contre).'
					},
					{
						stage: '2. Corps (Arg. 1 & 2)',
						detail: 'D’abord + Arg. moral/logique + exemple ; Ensuite + Arg. social + exemple.'
					},
					{
						stage: '3. Concession / Réfut.',
						detail: 'Certes / Bien que (+ subjonctif)..., cependant la thèse reste plus forte.'
					},
					{
						stage: '4. Conclusion engagée',
						detail: 'Synthèse + figure de style (antithèse ou question rhétorique) + appel.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'كيف تجعل فقرة العرض (Développement) متماسكة وواضحة للمصحح عند تقديم ثلاث حجج؟',
					hintAr: 'فكر في ترتيب الحجج من الأبسط إلى الأقوى وربطها بعلامات تنظيمية.',
					expectedInput: 'ترتيب الحجج تصاعدياً وربطها بروابط واضحة (D’abord, En outre, Enfin) وإرداف كل حجة بمثال',
					revealAr:
						'ترتيب الحجج تصاعدياً (من الفردي إلى الاجتماعي مثلاً) مع روابط منظمة وأمثلة واقعية يمنح المقال قوة برهانية عالية.'
				},
				{
					promptAr:
						'أين نضع فقرة الاستدراك والدحض (Certes... mais / Bien que...) داخل المقال؟',
					hintAr: 'تأتي داخل العرض بعد الحجج الأساسية أو قبل أقوى حجة لإفحام الاعتراض.',
					expectedInput: 'في العرض (Développement) لتقوية الأطروحة بالرد على اعتراض محتمل',
					revealAr:
						'إدماج الاستدراك داخل العرض (مثال: « Certes, certains pensent que... ; néanmoins... ») يرفع قيمة المقال في سلم التنقيط بشكل ملحوظ.'
				},
				{
					promptAr:
						'ما الذي ينبغي تجنبه في خاتمة المرافعة أو التنديد؟',
					hintAr: 'هل نفتح موضوعاً جديداً تماماً أو نناقض أطروحتنا؟',
					expectedInput: 'تجنب فتح موضوع جديد أو مناقضة الأطروحة، بل نلخص ونؤكد الموقف بدعوة مسؤولة',
					revealAr:
						'الخاتمة تغلق الحجاج بتلخيص مكثف (En somme / Pour conclure) وتأكيد الأطروحة، ويمكن ختمها بسؤال بلاغي أو طباق بليغ.'
				}
			]
		},
		summary: {
			rulesAr: [
				'مرحلة التحضير على المسودة (Brouillon): حدد نوع المطلوب (Plaidoyer للدفاع أم Réquisitoire للتنديد)، صغ الأطروحة في جملة واضحة، وحضّر 3 حجج (فكرية، أخلاقية، اجتماعية) مع مثال واقعي لكل حجة + اعتراض واحد للرد عليه.',
				'بنية المقدمة (3 إلى 4 أسطر): جملة تمهيدية عن الواقع الراهن + طرح الإشكالية أو إعلان الموقف بوضوح باستعمال أفعال الرأي (Je suis convaincu que / Il est indispensable de / Nous devons condamner).',
				'بنية العرض (فقرتان أو ثلاث مترابطة): D’abord + حجة 1 + مثال (par exemple / notamment)؛ De plus / Par ailleurs + حجة 2 + مثال؛ Certes / Bien que (+ Subjonctif) + حجة مضادة + mais / pourtant + دحض قوي.',
				'معايير التنقيط الرسمية في 2AS LP (7 نقاط): الملاءمة واحترام الموضوع والنمط الحجاجي (2 نقطة)، التنظيم والروابط والفقرات (2 نقطة)، سلامة اللغة والصرف والنحو والمعجم التقييمي (2 نقطة)، والإتقان والبلاغة وجودة التقديم (1 نقطة).'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Boîte à outils du rédacteur (2AS LP)',
				rootLabel: 'Connecteurs d’un essai réussi',
				rootSub: 'Clarté + Cohérence + Force persuasive',
				width: 580,
				branches: [
					{
						label: 'Ordonner',
						rule: 'D’abord, Ensuite, Enfin',
						example: 'D’abord, la lecture apaise l’esprit.'
					},
					{
						label: 'Ajouter / Illustrer',
						rule: 'De plus, En outre, Notamment',
						example: 'En outre, elle enrichit le style.'
					},
					{
						label: 'Concéder / Réfuter',
						rule: 'Certes... mais, Bien que',
						example: 'Bien qu’elle exige du temps, elle libère.'
					},
					{
						label: 'Conclure',
						rule: 'En somme, Ainsi, Dès lors',
						example: 'En somme, lire demeure essentiel.'
					}
				]
			}),
			visualCaptionAr: 'صندوق الروابط الأساسية لصياغة مرافعة أو تنديد متماسك في الامتحان',
			examples: [
				{
					problemAr:
						'Rédigez une introduction courte de réquisitoire contre la tricherie aux examens.',
					solutionAr:
						'À l’approche des épreuves scolaires, certains élèves cèdent hélas à la tentation de la fraude. Je condamne fermement cette pratique malhonnête qui détruit l’égalité des chances et compromet l’avenir de toute une génération.'
				},
				{
					problemAr:
						'Rédigez une conclusion persuasive de plaidoyer pour le respect des aînés et des enseignants.',
					solutionAr:
						'En somme, honorer nos aînés et nos enseignants n’est pas une politesse dépassée, mais le pilier de toute société civilisée. Tandis que l’irrespect brise les liens, la déférence élève les esprits : cultivons-la chaque jour !'
				}
			],
			watchOutAr:
				'لا تكتب المقال في كتلة واحدة دون فراغات أو فقرات! اترك مسافة بادئة (Alinéa) في بداية المقدمة والعرض والخاتمة، وراجع مطابقة الصفات وتصريف Subjonctif بعد bien que قبل تسليم الورقة.'
		},
		practice: [
			{
				questionAr:
					'Quel défaut affaiblit le plus gravement un plaidoyer lors de l’examen ?',
				options: [
					'Employer des connecteurs logiques variés',
					'Énoncer des slogans émotionnels sans arguments logiques ni exemples concrets',
					'Réfuter un contre-argument à l’aide de « Certes... mais »',
					'Structurer sa copie en introduction, développement et conclusion'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: تنويع الروابط نقطة قوة كبيرة.',
					'ممتاز! الحجاج الجيد يتطلب حججاً منطقية وأمثلة ملموسة، لا مجرد شعارات عاطفية مرسلة.',
					'خطأ: دحض الحجة المضادة يرفع جودة المقال.',
					'خطأ: التقسيم الثلاثي شرط أساسي للنجاح.'
				],
				explanationAr: 'الشعارات العاطفية المجردة من الحجج والأمثلة تُضعف قيمة المرافعة وتُفقدها الطابع البرهاني.'
			},
			{
				questionAr:
					'Quelle phrase constitue une transition réussie entre deux arguments dans un réquisitoire contre le gaspillage alimentaire ?',
				options: [
					'En outre, jeter du pain et des repas sains constitue une offense morale envers les familles démunies.',
					'Bonjour à tous, voici mon devoir de français.',
					'Le pain se fabrique avec de la farine de blé et de l’eau.',
					'Peut-être que le gaspillage est parfois bon ou mauvais.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! تبدأ بالرابط « En outre » وتقدم حجة أخلاقية قوية بمعجم تقييمي واضح.',
					'خطأ: تحية غير مناسبة لمقال حجاجي مكتوب.',
					'خطأ: معلومة وصفية خارجة عن محور الحجاج.',
					'خطأ: تردد يناقض موقف التنديد الواضح.'
				],
				explanationAr: 'الرابط « En outre » يربط الحجة الجديدة بسابقتها مع الحفاظ على النبرة التنديدية الملتزمة.'
			},
			{
				questionAr:
					'Où doit figurer la formulation claire de votre thèse dans un plaidoyer classique ?',
				options: [
					'Uniquement dans la marge de la feuille',
					'Dès l’introduction, puis réaffirmée en synthèse dans la conclusion',
					'Nulle part, le lecteur doit la deviner sans indice',
					'Seulement dans une note de bas de page'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا نكتب شيئاً من المقال في الهامش.',
					'أحسنت! تُصاغ الأطروحة بوضوح في المقدمة وتُؤكد بخلاصة حازمة في الخاتمة.',
					'خطأ: في المرافعة المدرسية يجب أن تكون الأطروحة جلية ومقنعة.',
					'خطأ: المقال الحجاجي لا يعتمد على الحواشي السفلية.'
				],
				explanationAr: 'وضوح الأطروحة منذ المقدمة وإعادة ترسيخها في الخاتمة شرط أساسي لاتساق المقال الحجاجي.'
			},
			{
				questionAr:
					'Quel connecteur convient le mieux pour ouvrir le paragraphe final de conclusion ?',
				options: ['En premier lieu', 'En somme', 'Par exemple', 'Car'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: En premier lieu لبدء أول حجة في العرض.',
					'ممتاز! « En somme » (وكذلك Pour conclure, En définitive) تفتتح الخاتمة بأناقة.',
					'خطأ: Par exemple لتقديم مثال داخل العرض.',
					'خطأ: Car رابط سبب داخل الجملة ولا يفتتح خاتمة مستقلة.'
				],
				explanationAr: 'تستعمل روابط مثل En somme, En définitive, Pour conclure لافتتاح الخاتمة.'
			},
			{
				questionAr:
					'Avant de rendre sa copie de production écrite (7 pts), quelle vérification linguistique est prioritaire ?',
				options: [
					'Remplacer tous les connecteurs par le mot « et »',
					'Vérifier les accords sujet-verbe, le subjonctif après « bien que », l’orthographe et la ponctuation',
					'Supprimer les alinéas pour obtenir un seul bloc compact',
					'Ajouter des mots familiers pour détendre le correcteur'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: تكرار « et » يفقر التماسك النصي.',
					'صحيح! المراجعة النحوية والإملائية وعلامات الترقيم تحمي علامة اللغة (2/7) والإتقان.',
					'خطأ: التقسيم إلى فقرات ضروري للوضوح.',
					'خطأ: يجب الالتزام بالمستوى اللغوي القياسي أو الراقي (Courant / Soutenu).'
				],
				explanationAr: 'تضمن المراجعة اللغوية الدقيقة سلامة التراكيب والاتفاقات والترقيم، وهي عنصر حاسم في تنقيط الوضعية.'
			}
		]
	}
];
