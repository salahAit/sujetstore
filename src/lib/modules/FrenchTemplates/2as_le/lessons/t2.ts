import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchWritingBlueprint
} from '../../svg-french';

export const LESSONS_2AS_LE_T2: FrenchInteractiveLessonData[] = [
	{
		id: 'fre_lesson_2as_le_t2_convaincre_persuader',
		slug: 'fre-2as-le-t2-convaincre-persuader',
		grade: '2as_le',
		yearSubjectId: 777,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع 2: المرافعة والاتهام وبلاغة الإقناع (Plaidoyer, réquisitoire et rhétorique de la persuasion)',
		order: 1,
		titleAr: 'الإقناع العقلي والاستمالة الوجدانية وتصنيف الحجج (Convaincre vs persuader)',
		objectives: [
			'التمييز الدقيق بين الإقناع العقلي القائم على المنطق والأدلة (Convaincre) والاستمالة الوجدانية والأخلاقية (Persuader)',
			'التعرف على أنواع الحجج الأربعة الأساسية: الحجة المنطقية، حجة التجربة والواقع، حجة المرجعية العلمية، والحجة الأخلاقية (Éthique)',
			'توظيف الحجج المزدوجة (عقلية وأخلاقية) لبناء مرافعة أو تنديد عميق يليق بمستوى شعبة اللغات الأجنبية'
		],
		keywordsAr: [
			'convaincre',
			'persuader',
			'arguments logiques',
			'arguments éthiques',
			'argument d’autorité',
			'الإقناع والاستمالة'
		],
		discover: {
			scenarioAr:
				'لتشجيع الشباب على إتقان اللغات الأجنبية مع الاعتزاز بهويتهم الوطنية، يستعمل كاتبٌ استراتيجيتين متكاملتين: (1) « Selon les études universitaires, la maîtrise de trois langues accroît la capacité d’analyse et facilite l’accès aux revues scientifiques internationales. » (2) « Quelle fierté de porter avec éloquence la voix de notre histoire et de notre patrimoine aux quatre coins du monde ! » قارن بين طريقة التأثير في القولين.',
			svg: svgFrenchGrammarMap({
				title: 'Convaincre vs Persuader : deux leviers complémentaires',
				rootLabel: 'Rhétorique de l’argumentation',
				rootSub: 'Allier la rigueur de la raison et la force des valeurs',
				width: 580,
				branches: [
					{
						label: 'Convaincre',
						rule: 'S’adresser à la raison',
						example: 'Faits, statistiques, liens logiques'
					},
					{
						label: 'Persuader',
						rule: 'Toucher la conscience morale',
						example: 'Valeurs, figures, questions rhétoriques'
					},
					{
						label: 'Arg. d’autorité',
						rule: 'Appui sur une source reconnue',
						example: 'Les historiens attestent que...'
					},
					{
						label: 'Arg. éthique',
						rule: 'Appel à la dignité et au devoir',
						example: 'Respecter le bien commun.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'أي العبارتين (1) أم (2) تخاطب العقل بالدراسات والمنطق (Convaincre)، وأيهما تخاطب الوجدان والقيم (Persuader)؟',
					hintAr: 'العبارة الأولى تستند إلى دراسات جامعية ونتائج ملموسة، والثانية توظف التعجب والفخر.',
					expectedInput: 'العبارة (1) للإقناع العقلي (Convaincre) والعبارة (2) للاستمالة الوجدانية (Persuader)',
					revealAr:
						'الإقناع (Convaincre) يتوجه إلى العقل عبر البراهين المنطقية والوقائع القابلة للتحقق؛ أما الاستمالة (Persuader) فتتوجه إلى الضمير والوجدان عبر القيم الأخلاقية والصور البلاغية.'
				},
				{
					promptAr:
						'عندما يستشهد الكاتب بقول عالم مرموق أو بإحصاءات معهد أكاديمي موثوق لتعزيز أطروحته، كيف نسمي هذا النوع من الحجج؟',
					hintAr: 'حجة تعتمد على مكانة مصدر علمي أو خبير معترف به.',
					expectedInput: 'حجة المرجعية أو الإسناد العلمي (Argument d’autorité)',
					revealAr:
						'حجة المرجعية (L’argument d’autorité) تستند إلى خبير أو مؤرخ أو مؤسسة علمية موثوقة لإضفاء مصداقية قوية على الرأي.'
				},
				{
					promptAr:
						'لماذا يجمع أفضل خطباء المرافعة (Plaidoyer) بين الإقناع العقلي والاستمالة الأخلاقية معاً؟',
					hintAr: 'العقل يصدق الحقيقة، والضمير يدفع إلى العمل بها.',
					expectedInput: 'لأن العقل يثبت صحة الأطروحة بالأدلة، بينما تحرك القيم الوجدانية إرادة القارئ للالتزام بها',
					revealAr:
						'الجمع المتوازن بين Convaincre (المنطق والوقائع) و Persuader (الأخلاق والبلاغة) يجعل الخطاب الحجاجي راسخاً ومؤثراً في آن واحد.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الإقناع العقلي (Convaincre): يخاطب العقل والمنطق؛ يعتمد على الوقائع الثابتة، الأرقام، الروابط المنطقية (car, donc, par conséquent)، والتحليل السببي المتماسك.',
				'الاستمالة الوجدانية والأخلاقية (Persuader): تخاطب الضمير والمشاعر النبيلة والقيم؛ تعتمد على المعجم التقييمي، الضمير الشامل « nous »، الجمل الاستفهامية والتعجبية، والصور البلاغية.',
				'تصنيف الحجج الأربع في 2AS LE: (1) الحجة المنطقية (Argument logique: استدلال سببي أو قياس عقلي)؛ (2) حجة التجربة والواقع (Argument d’expérience: أمثلة حية وملاحظات يومية)؛ (3) حجة المرجعية العلمية (Argument d’autorité: خبراء، علماء، مؤرخون)؛ (4) الحجة الأخلاقية (Argument éthique / par les valeurs: الأمانة، العدل، التضامن، صيانة الكرامة).',
				'في تحليل النصوص لشعبة اللغات، ينبغي رصد طبيعة الحجة (منطقية، أخلاقية، واقعية...) وبيان أثرها في استراتيجية الكاتب (Convaincre / Persuader).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Les stratégies argumentatives : Convaincre vs Persuader',
				subtitle: 'Identifier les procédés d’écriture à l’épreuve de compréhension',
				width: 560,
				columns: [
					{
						header: 'Convaincre (Raison)',
						rule: 'Logique, causes, preuves',
						examples: 'en effet, donc, études, chiffres'
					},
					{
						header: 'Persuader (Cœur)',
						rule: 'Éthique, valeurs, émotions',
						examples: 'dignité, hélas, !, métaphores'
					},
					{
						header: 'Effet combiné',
						rule: 'Adhésion totale du lecteur',
						examples: 'Comprendre + Agir avec civisme'
					}
				]
			}),
			visualCaptionAr: 'المقارنة التحليلية بين وسائل الإقناع العقلي ووسائل الاستمالة الأخلاقية',
			examples: [
				{
					problemAr:
						'Identifiez la nature de l’argument (logique, autorité ou éthique) : « Préserver les espaces verts est un devoir de responsabilité envers les générations futures qui hériteront de nos villes. »',
					solutionAr: 'Argument éthique (fondé sur les valeurs morales de devoir et de responsabilité intergénérationnelle) visant à persuader.'
				},
				{
					problemAr:
						'Identifiez la stratégie dominante : « Des enquêtes linguistiques montrent que trente minutes de lecture quotidienne doublent la richesse lexicale d’un adolescent en deux ans. »',
					solutionAr: 'Stratégie de conviction (convaincre) fondée sur un argument d’autorité scientifique et des données chiffrées.'
				}
			],
			watchOutAr:
				'احذر من التطرف في أحد القطبين عند كتابة المقال الحجاجي (8 نقاط): النص المفرط في العاطفة بلا حجج عقلية يبدو سطحياً، والنص البارد الجاف بلا قيم إنسانية وأسلوب مقنع يفقد حيويته.'
		},
		practice: [
			{
				questionAr:
					'Quelle différence fondamentale oppose les verbes « convaincre » et « persuader » en rhétorique ?',
				options: [
					'Convaincre s’adresse à la raison par des preuves logiques ; persuader fait appel aux valeurs morales et à la sensibilité',
					'Convaincre s’emploie uniquement à l’oral ; persuader uniquement à l’écrit',
					'Convaincre signifie critiquer ; persuader signifie résumer',
					'Il n’existe aucune nuance entre les deux verbes'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! هذا هو التمييز البلاغي الدقيق المقرر في شعبة اللغات الأجنبية.',
					'خطأ: كلاهما يستعمل شفهياً وكتابياً.',
					'خطأ: كلاهما يهدف إلى كسب تأييد المتلقي.',
					'خطأ: الفرق بين مخاطبة العقل ومخاطبة الوجدان جوهري.'
				],
				explanationAr: 'الإقناع (Convaincre) يرتكز على البرهان العقلي، والاستمالة (Persuader) تخاطب الوجدان والضمير الأخلاقي.'
			},
			{
				questionAr:
					'De quel type est l’argument suivant : « D’après les recherches de l’historien Abou El-Kacem Saadallah, la presse culturelle algérienne a joué un rôle décisif dans l’éveil intellectuel » ?',
				options: [
					'Un argument d’autorité',
					'Une hyperbole satirique',
					'Un contre-argument réfuté',
					'Une simple anecdote familière'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! الاستناد إلى أبحاث مؤرخ جزائري مرموق يمثل حجة مرجعية (Argument d’autorité).',
					'خطأ: لا توجد مبالغة ساخرة.',
					'خطأ: الحجة مؤيدة وليست معترضة.',
					'خطأ: استشهاد علمي تاريخي رصين.'
				],
				explanationAr: 'الاستشهاد بعالم أو مؤرخ معترف به (مثل أبو القاسم سعد الله) يشكل Argument d’autorité.'
			},
			{
				questionAr:
					'Quel procédé caractérise plutôt la volonté de persuader que celle de convaincre ?',
				options: [
					'Un tableau statistique comparatif',
					'Une question rhétorique vibrante accompagnée d’un lexique évaluatif fort',
					'Une équation mathématique rigoureuse',
					'Un connecteur de simple cause neutre'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الإحصاءات تخاطب العقل (Convaincre).',
					'صحيح! الاستفهام البلاغي والمعجم التقييمي يستميلان وجدان القارئ وضميره (Persuader).',
					'خطأ: المعادلة برهان عقلي صرف.',
					'خطأ: السبب المحايد أداة إقناع منطقي.'
				],
				explanationAr: 'الأدوات البلاغية والانفعالية والمعجم القيمي تنتمي إلى استراتيجية الاستمالة (Persuader).'
			},
			{
				questionAr:
					'Identifiez le type d’argument : « Si l’on laisse les écrans remplacer l’écriture manuscrite, la mémoire orthographique diminue mécaniquement faute de pratique motrice. »',
				options: [
					'Argument logique (relation de cause à effet)',
					'Argument d’autorité historique',
					'Argument purement sentimental',
					'Description touristique'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! يقوم الاستدلال على علاقة شرطية وسببية عقلية (Si... faute de...).',
					'خطأ: لم يُستشهد بمرجع أو عالم محدد.',
					'خطأ: الطرح تحليلي سببي لا عاطفي.',
					'خطأ: ليس وصفاً لمكان.'
				],
				explanationAr: 'الاستدلال القائم على العلاقة المنطقية بين السبب والنتيجة هو حجة منطقية (Argument logique).'
			},
			{
				questionAr:
					'Dans un essai argumentatif de 2AS LE (8 pts), quelle combinaison d’arguments garantit la meilleure force démonstrative ?',
				options: [
					'Un seul argument répété trois fois avec des mots différents',
					'Des arguments variés (logique, d’expérience et éthique) appuyés par des exemples précis',
					'Uniquement des exclamations sans aucun fait vérifiable',
					'Des arguments qui contredisent la thèse de l’auteur'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: تكرار الحجة نفسها يُضعف المقال.',
					'صحيح! تنويع الحجج بين العقلي والواقعي والأخلاقي مع أمثلة دقيقة يجمع بين Convaincre و Persuader.',
					'خطأ: الانفعال وحده لا يقنع المصحح.',
					'خطأ: التناقض يفسد اتساق الأطروحة.'
				],
				explanationAr: 'تنويع الحجج (منطقية + واقعية + أخلاقية) مع أمثلة محددة يمثل معيار التميز في مقال 2AS LE.'
			}
		]
	},
	{
		id: 'fre_lesson_2as_le_t2_concession_refutation',
		slug: 'fre-2as-le-t2-concession-refutation',
		grade: '2as_le',
		yearSubjectId: 777,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع 2: المرافعة والاتهام وبلاغة الإقناع (Plaidoyer, réquisitoire et rhétorique de la persuasion)',
		order: 2,
		titleAr: 'الاستدراك المتقدم والدحض الحجاجي (Concession et réfutation : certes... mais, bien que, avoir beau)',
		objectives: [
			'إتقان البنى النحوية الراقية للاستدراك والدحض: « bien que / quoique + Subjonctif »، « avoir beau + Infinitif »، « quel que soit + Subjonctif »، و « malgré / en dépit de + GN »',
			'التمييز الدقيق بين التسليم الجزئي التكتيكي (Concession) والرفض البرهاني الكامل (Réfutation)',
			'توظيف الاستدراك والدحض في مقالات اللغات الأجنبية لإبراز النضج الفكري والموضوعية النقدية'
		],
		keywordsAr: [
			'concession',
			'réfutation',
			'bien que',
			'avoir beau',
			'certes mais',
			'subjonctif',
			'الاستدراك والدحض'
		],
		discover: {
			scenarioAr:
				'في مقال نقدي حول تراجع التعبير الكتابي، يكتب باحث لغوي: « Les applications de traduction instantanée ont beau offrir un gain de temps appréciable, elles ne sauraient remplacer l’apprentissage personnel d’une langue. Bien que l’utilisateur obtienne un texte rapide, il perd la finesse des nuances culturelles. » تأمل بنية « avoir beau + infinitif » وبنية « Bien que + subjonctif ».',
			svg: svgFrenchGrammarMap({
				title: 'Structures avancées de la Concession et Réfutation (2AS LE)',
				rootLabel: 'Concéder pour mieux réfuter',
				rootSub: 'Maîtriser le mode et la construction exacte',
				width: 580,
				branches: [
					{
						label: 'Subjonctif strict',
						rule: 'bien que, quoique, quel que soit',
						example: 'Quels que soient les défis, persévérons.'
					},
					{
						label: 'Avoir beau + Inf.',
						rule: 'Action vaine face à un fait',
						example: 'Il a beau chercher, rien ne remplace lire.'
					},
					{
						label: 'Concession / Pivot',
						rule: 'Certes / Il est vrai que... mais',
						example: 'Il est vrai que c’est long, toutefois...'
					},
					{
						label: 'Nominal (GN)',
						rule: 'malgré, en dépit de + GN',
						example: 'En dépit de leur rapidité, ces outils...'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'تأمل الصيغة الراقية: « Les applications ont beau offrir un gain de temps, elles ne sauraient remplacer l’apprentissage. » ما صيغة الفعل بعد « avoir beau »؟ وهل نضيف « mais » بين الجملتين؟',
					hintAr: 'انظر إلى الفعل « offrir » وإلى الفاصلة بين الجملتين.',
					expectedInput: 'يتبع « avoir beau » دائماً الفعل في المصدر (Infinitif)، ونفصل الجملتين بفاصلة دون « mais »',
					revealAr:
						'التركيب « avoir beau + Infinitif » لا يأخذ « que » ولا يحتاج « mais »! مثال: « On a beau multiplier les écrans, le livre demeure essentiel. » وهو من أجمل تراكيب المستوى الراقي في 2AS LE.'
				},
				{
					promptAr:
						'كيف نُصرف الصيغة « Quel que + être (Subjonctif) + Nom » مع اسم جمع مذكر مثل « les obstacles » واسم مفرد مؤنث مثل « la difficulté »؟',
					hintAr: 'تُطابق كلمة « quel » الاسم الذي يلي الفعل « être » في النوع والعدد!',
					expectedInput: 'Quels que soient les obstacles / Quelle que soit la difficulté',
					revealAr:
						'قاعدة إملائية دقيقة في 2AS LE: في « quel que soit / quelle que soit / quels que soient / quelles que soient »، نكتب « quel que » في كلمتين ونطابق « quel » مع الفاعل بعد فعل « être » في Subjonctif!'
				},
				{
					promptAr:
						'لماذا نُعدّل استدراكاً مثل « Certes, l’apprentissage d’une langue demande des années d’effort... » بـ « ...mais il ouvre un horizon intellectuel sans égal »؟',
					hintAr: 'ما الجزء الذي يمثل التسليم الجزئي وما الجزء الذي يمثل الدحض وتأكيد الأطروحة؟',
					expectedInput: 'الجزء الأول تسليم تكتيكي بصعوبة الجهد، والثاني دحض يثبت أن الفائدة تفوق الجهد بكثير',
					revealAr:
						'تقنية الاستدراك-الدحض (Concession-Réfutation) تمنح الكاتب مصداقية عالية لأنه يُظهر أنه فكّر في اعتراضات المخالفين قبل أن يفندها.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الجمل التابعة للاستدراك بـ Subjonctif: bien que + Subj.، quoique (في كلمة واحدة) + Subj.، sans que + Subj.، quel(le)(s) que soit/soient + الاسم (مثال: Quelles que soient les contraintes, la rigueur s’impose).',
				'التركيب الراقي « avoir beau + Infinitif »: يُصرف الفعل « avoir » في الزمن المناسب وتبقى « beau » ثابتة لا تتغير أبداً، ويتبعها مصدر، ثم فاصلة وجملة النتيجة المعاكسة (مثال: Elle a beau lire vite, elle prend toujours des notes).',
				'تراكيب المجموعات الاسمية والإخبارية: malgré + GN، en dépit de + GN (أرقى وأقوى من malgré)؛ même si + Indicatif؛ tout en + Participe présent (Gérondif: « Tout en appréciant le numérique, il défend le papier »).',
				'خطوات دحض أطروحة مضادة (Réfutation): (1) عرض الاعتراض بموضوعية أو بمسافة نقدية (Certains affirment que... / Certes...)؛ (2) وضع مفصل استدراكي قوي (Or, Pourtant, Cependant, Force est de constater que...)؛ (3) تقديم الحجة القاطعة التي تُبطل الاعتراض.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Pièges d’orthographe et de mode dans la Concession (LE)',
				subtitle: 'Points clés vérifiés aux examens de Langues Étrangères',
				width: 560,
				columns: [
					{
						header: 'quoique vs quoi que',
						rule: 'quoique = bien que',
						examples: 'quoi que = quelle que soit la chose'
					},
					{
						header: 'quel(s) que soit',
						rule: 'Accord avec le sujet',
						examples: 'Quels que soient nos efforts'
					},
					{
						header: 'avoir beau + Inf.',
						rule: '« beau » invariable !',
						examples: 'Elles ont beau insister, ...'
					}
				]
			}),
			visualCaptionAr: 'الفروق الإملائية والنحوية الدقيقة التي تميز تلميذ شعبة اللغات الأجنبية',
			examples: [
				{
					problemAr:
						'Transformez avec « avoir beau » : « Bien que ces logiciels traduisent rapidement les phrases, ils commettent encore des contresens culturels. »',
					solutionAr:
						'« Ces logiciels ont beau traduire rapidement les phrases, ils commettent encore des contresens culturels. »'
				},
				{
					problemAr:
						'Complétez avec l’accord correct : « ...... que soient les distractions modernes, la persévérance demeure la clé de la réussite. »',
					solutionAr: '« Quelles que soient les distractions modernes, ... » (féminin pluriel, accord avec « distractions »).'
				}
			],
			watchOutAr:
				'انتبه لفرق إملائي يكثر في امتحانات 2AS LE: « quoique » (كلمة واحدة = bien que: « Quoiqu’il soit exigeant, ce métier passionne »)؛ أما « quoi que » (كلمتان = مهما كان الشيء الذي: « Quoi que vous disiez, les faits demeurent »). وتذكر أن « beau » في « Elles ont beau » لا تُؤنث ولا تُجمع أبداً!'
		},
		practice: [
			{
				questionAr:
					'Choisissez la phrase correctement construite avec « avoir beau » :',
				options: [
					'Les élèves ont beaux réviser la veille, la régularité reste meilleure.',
					'Les élèves ont beau réviser la veille, la régularité reste meilleure.',
					'Les élèves ont beau que réviser la veille, la régularité reste meilleure.',
					'Les élèves ont beau révisé la veille, la régularité reste meilleure.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: كلمة « beau » في هذه العبارة ثابتة لا تُجمع ولا تُؤنث.',
					'ممتاز! « ont beau + infinitif (réviser) » مع بقاء « beau » ثابتة وبلا « que ».',
					'خطأ: لا نضع « que » بعد « avoir beau ».',
					'خطأ: يتبعها المصدر (réviser) لا اسم المفعول (révisé).'
				],
				explanationAr: 'الصيغة القياسية هي: avoir (مصرف) + beau (ثابتة دائماً) + Infinitif.'
			},
			{
				questionAr:
					'Complétez avec l’orthographe et le mode exacts : « ...... les obstacles rencontrés, le chercheur persévère dans son enquête. »',
				options: [
					'Quel que soit',
					'Quels que soient',
					'Quelque soient',
					'Quelles que soient'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: « les obstacles » مذكر جمع فيجب جمع « quel » والفعل « soient ».',
					'أحسنت! « obstacles » مذكر جمع، إذن: « Quels que soient ».',
					'خطأ: تُكتب « quels que » في كلمتين أمام الفعل « être » في Subjonctif.',
					'خطأ: كلمة « obstacle » مذكر (un obstacle) وليست مؤنثاً.'
				],
				explanationAr: 'كلمة « obstacles » مذكر جمع فتطابقها الصيغة « Quels que soient ».'
			},
			{
				questionAr:
					'Transformez sans erreur avec « en dépit de » : « Bien que le débat soit vif, les intervenants gardent une courtoisie exemplaire. »',
				options: [
					'En dépit de la vivacité du débat, les intervenants gardent une courtoisie exemplaire.',
					'En dépit que le débat soit vif, les intervenants gardent une courtoisie exemplaire.',
					'En dépit de vif le débat, les intervenants gardent une courtoisie exemplaire.',
					'En dépit du débat soit vif, les intervenants gardent une courtoisie exemplaire.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! « en dépit de » يتبعها مجموعة اسمية (la vivacité du débat).',
					'خطأ: لا توجد صيغة « en dépit que » في الفرنسية المعيارية.',
					'خطأ: تركيب غير نحوي.',
					'خطأ: لا يتبع حرف الجر « en dépit de » فعل مصرف.'
				],
				explanationAr: 'حرف الجر المركب « en dépit de » يماثل « malgré » ويتبعه دائماً اسم أو مجموعة اسمية.'
			},
			{
				questionAr:
					'Distinguez « quoique » et « quoi que » dans : « ...... l’on prétende, la maîtrise de la langue exige du temps, ...... certains outils promettent des résultats instantanés. »',
				options: [
					'Quoique ... quoi que',
					'Quoi que ... quoique',
					'Quoique ... quoique',
					'Quoi que ... quoi que'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الأولى تعني « مهما ادّعى الناس » (Quoi que) والثانية تعني « على الرغم من أن » (quoique).',
					'صحيح! « Quoi que l’on prétende » (مهما قيل) و « quoique certains outils promettent » (= bien que).',
					'خطأ: الأولى تحتاج « quoi que » في كلمتين.',
					'خطأ: الثانية أداة استدراك مرادفة لـ bien que فتُكتب في كلمة واحدة.'
				],
				explanationAr: 'تُكتب « quoi que » في كلمتين بمعنى « مهما كان الشيء الذي »، وتُكتب « quoique » في كلمة واحدة بمعنى « bien que ».'
			},
			{
				questionAr:
					'Quelle tournure au gérondif exprime une nuance concessive élégante ?',
				options: [
					'Tout en reconnaissant l’utilité des dictionnaires en ligne, le professeur rappelle la valeur de la lecture suivie.',
					'En reconnaissant parce que les dictionnaires sont utiles.',
					'Tout en reconnaîtra l’utilité des dictionnaires.',
					'Malgré reconnaître l’utilité des dictionnaires.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! البنية « Tout en + participe présent » تفيد هنا التزامن الاستدراكي بأناقة عالية.',
					'خطأ: تركيب ركيك وغير نحوي.',
					'خطأ: بعد « tout en » يأتي اسم الفاعل (-ant) لا المستقبل.',
					'خطأ: لا يتبع « malgré » فعل مصدري.'
				],
				explanationAr: 'يمكن لـ « Tout en + participe présent » أن يعبر عن استدراك رفيع عند وحدة الفاعل.'
			}
		]
	},
	{
		id: 'fre_lesson_2as_le_t2_implicite_tonalites',
		slug: 'fre-2as-le-t2-implicite-tonalites',
		grade: '2as_le',
		yearSubjectId: 777,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع 2: المرافعة والاتهام وبلاغة الإقناع (Plaidoyer, réquisitoire et rhétorique de la persuasion)',
		order: 3,
		titleAr: 'المضمر والموجّهات والنبرة السجالية والتعليمية (L’implicite, les modalisateurs et les tonalités)',
		objectives: [
			'التمييز التحليلي بين المعنى الصريح (Explicite) والمعنى الضمني (Implicite) بشقيه: الافتراض المسبق (Présupposé) والإيحاء السياقي (Sous-entendu)',
			'توظيف وتحليل الموجّهات الدقيقة والسخرية النقدية الخفيفة (Ironie / Antiphrase) في نصوص الرأي',
			'التمييز الواضح بين النبرة السجالية الحادة (Tonalité polémique) والنبرة التعليمية التوجيهية (Tonalité didactique)'
		],
		keywordsAr: [
			'implicite',
			'présupposé',
			'sous-entendu',
			'tonalité polémique',
			'tonalité didactique',
			'المعنى الضمني والنبرة'
		],
		discover: {
			scenarioAr:
				'تأمل جملتين حول النظافة الحضرية: (A) « Heureusement, certains habitants ont enfin cessé de jeter leurs détritus près du parc. » (B) « Quel remarquable progrès civique que de transformer nos trottoirs en décharges à ciel ouvert ! » ما المعنى الخفي وراء كل جملة؟',
			svg: svgFrenchGrammarMap({
				title: 'Décrypter l’Implicite et les Tonalités argumentatives',
				rootLabel: 'Lire entre les lignes (2AS LE)',
				rootSub: 'Au-delà du sens littéral des mots',
				width: 580,
				branches: [
					{
						label: 'Présupposé',
						rule: 'Déduit d’un mot précis',
						example: '« a cessé de » => il le faisait avant.'
					},
					{
						label: 'Sous-entendu',
						rule: 'Déduit du contexte / situation',
						example: '« Il fait froid ici » => Fermez la fenêtre.'
					},
					{
						label: 'Ton polémique',
						rule: 'Combatif, critique vive',
						example: 'Lexique péjoratif, !, antiphrase'
					},
					{
						label: 'Ton didactique',
						rule: 'Enseigner, guider avec calme',
						example: 'Exemples, clarté, impératif posé'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'في الجملة (A): « Certains habitants ont enfin cessé de jeter leurs détritus près du parc », ما الافتراض المسبق (Présupposé) الذي نستنتجه حتماً من الفعل « ont cessé de »؟',
					hintAr: 'لكي يتوقف شخص عن فعل شيء، ماذا كان يفعل سابقاً؟',
					expectedInput: 'أنهم كانوا سابقاً يرمون نفاياتهم قرب الحديقة',
					revealAr:
						'الافتراض المسبق (Le présupposé) يُفهم مباشرة من مؤشر لغوي داخل الجملة نفسها مثل: « cesser de », « encore », « de nouveau », « enfin », « toujours ».'
				},
				{
					promptAr:
						'في الجملة (B): « Quel remarquable progrès civique que de transformer nos trottoirs en décharges ! », هل الكاتب يمدح فعلاً هذا السلوك أم يسخر منه؟ وما اسم هذا الأسلوب؟',
					hintAr: 'الكاتب يقول عكس ما يقصده لفضح قبح السلوك.',
					expectedInput: 'إنه يسخر منه وينتقده عبر أسلوب التهكم وعكس المعنى (Antiphrase / Ironie) ذي النبرة السجالية',
					revealAr:
						'التهكم بعكس المعنى (L’antiphrase / l’ironie) صورة ضمنية قوية تبرز النبرة السجالية (Tonalité polémique) لإدانة سلوك غير حضاري.'
				},
				{
					promptAr:
						'قارن بين النبرة السجالية (Polémique) والنبرة التعليمية (Didactique): متى يختار الكاتب إحداهما؟',
					hintAr: 'السجالية تهاجم آفة أو خصماً بقوة؛ والتعليمية تشرح وتُعلّم وتوجه برصانة.',
					expectedInput: 'يستعمل النبرة السجالية للهجوم القوي على آفة أو رأي خاطئ، والنبرة التعليمية للشرح والتربية والتوجيه الهادئ',
					revealAr:
						'في شعبة اللغات الأجنبية كثيراً ما يطرح السؤال: « Quelle est la tonalité dominante du texte ? Justifiez par deux indices. » — النبرة السجالية تُثبت بالمعجم القدحي والتعجب والتهكم، والنبرة التعليمية بالوضوح والتعريفات والنصائح المنظمة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الصريح (L’explicite) مقابل الضمني (L’implicite): الصريح هو ما يُقال بوضوح وحرفية؛ والضمني هو ما يُفهم دون تصريح مباشر، وينقسم إلى قسمين دقيقين.',
				'الافتراض المسبق (Le présupposé): معنى ضمني محمول داخل كلمة محددة في الجملة (مثال: « Il lit de nouveau des livres sérieux » -> يفترض أنه كان يقرؤها سابقاً ثم توقف؛ « Même les enfants le savent » -> يفترض أنه أمر بديهي للجميع).',
				'الإيحاء السياقي (Le sous-entendu): معنى ضمني يُفهم من المقام والسياق ونبرة المتكلم لا من كلمة مفردة (مثال: قول الأستاذ « Il reste cinq minutes et beaucoup de copies sont encore vides » يوحي بضرورة الإسراع). وتدخل السخرية (Antiphrase) ضمن الضمني.',
				'النبرتان الحجاجيتان الرئيسيتان: (1) النبرة السجالية (Tonalité polémique): خطاب حاد مقاتل يرفض آفة أو فكرة بمعجم قدحي قوي، وأسئلة استنكارية، وتهكم، وجمل تعجبية؛ (2) النبرة التعليمية (Tonalité didactique): خطاب تربوي هادئ يهدف إلى الإفهام والإصلاح، يتميز بالوضوح والتقسيم المنطقي والأمثلة والمفردات الدقيقة.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Indices des tonalités Polémique et Didactique',
				subtitle: 'Savoir justifier la tonalité à l’examen (2AS LE)',
				width: 560,
				columns: [
					{
						header: 'Polémique',
						rule: 'Combattre / Dénoncer',
						examples: 'fléau, absurde, !, antiphrase'
					},
					{
						header: 'Didactique',
						rule: 'Instruire / Sensibiliser',
						examples: 'définitions, d’abord, il convient de'
					},
					{
						header: 'Élogieuse (Laudative)',
						rule: 'Célébrer une valeur',
						examples: 'noble, exemplaire, admirable'
					}
				]
			}),
			visualCaptionAr: 'المؤشرات اللغوية الدقيقة لتعليل النبرة الغالبة في نصوص الرأي والمرافعة',
			examples: [
				{
					problemAr:
						'Dégagez le présupposé de : « Notre municipalité a enfin restauré la vieille bibliothèque du centre-ville. »',
					solutionAr:
						'Présupposé (porté par l’adverbe « enfin » et « restauré ») : la bibliothèque était dégradée et cette restauration était attendue depuis longtemps.'
				},
				{
					problemAr:
						'Relevez deux indices de la tonalité polémique dans : « Quelle brillante idée de sacrifier nos jardins publics au profit de parkings en béton ! Ce saccage est intolérable. »',
					solutionAr:
						'1) L’antiphrase ironique (« Quelle brillante idée » + « ! ») ; 2) Le lexique fortement péjoratif (« sacrifier », « saccage », « intolérable »).'
				}
			],
			watchOutAr:
				'لا تخلط بين الافتراض المسبق (Présupposé) والإيحاء السياقي (Sous-entendu): الافتراض المسبق مرتبط دائماً بدلالة كلمة نحوية أو معجمية داخل الجملة (مثل: encore, ne... plus, cesser de, réussir à)، بينما الإيحاء السياقي يعتمد على فهم الموقف والنوايا غير المصرح بها.'
		},
		practice: [
			{
				questionAr:
					'Quel est le présupposé porté par la phrase : « Ce lycée encourage de nouveau les ateliers de lecture hebdomadaires » ?',
				options: [
					'Ces ateliers n’ont jamais existé auparavant',
					'Ces ateliers existaient déjà autrefois avant de connaître une interruption',
					'Les élèves refusent désormais de lire',
					'Le lycée vient tout juste d’être construit'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: عبارة « de nouveau » (من جديد) تنفي أنها لم توجد سابقاً.',
					'ممتاز! التعبير « de nouveau » يفترض مسبقاً وجود النشاط قبلاً ثم توقفه وعودته.',
					'خطأ: الجملة لا تفترض رفض التلاميذ.',
					'خطأ: لا علاقة له بتاريخ بناء الثانوية.'
				],
				explanationAr: 'العبارة « de nouveau » مؤشر لغوي يحمل افتراضاً مسبقاً (Présupposé) بحدوث الأمر سابقاً.'
			},
			{
				questionAr:
					'Quelle tonalité domine dans un texte qui multiplie les définitions claires, les étapes méthodiques et les conseils pratiques pour mieux rédiger ?',
				options: ['Tonalité polémique', 'Tonalité didactique', 'Tonalité tragique', 'Tonalité satirique'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: النبرة السجالية هجومية حادة.',
					'أحسنت! النبرة التعليمية (Tonalité didactique) تهدف إلى الشرح والتوجيه المنهجي الهادئ.',
					'خطأ: المأساوية ترتبط بالآلام الجسيمة والفواجع.',
					'خطأ: الساخرة تعتمد على التهكم والهزل النقدي.'
				],
				explanationAr: 'الوضوح والتفسير والتوجيه التربوي المنظم سمات أساسية للنبرة التعليمية (Tonalité didactique).'
			},
			{
				questionAr:
					'Identifiez le procédé implicite dans : « Bravo aux conducteurs qui stationnent sur les passages piétons : quel sens exemplaire du civisme ! »',
				options: [
					'Une antiphrase ironique à tonalité polémique',
					'Un compliment sincère et littéral',
					'Une définition scientifique neutre',
					'Un présupposé temporel neutre'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! قول « Bravo » و « exemplaire » في مقام مخالفة مرورية يمثل تهكماً بعكس المعنى (Antiphrase) لإدانة السلوك.',
					'خطأ: المعنى المقصود عكس الظاهر تماماً.',
					'خطأ: ليس تعريفاً علمياً.',
					'خطأ: الأداة الأساسية هنا هي السخرية التهكمية.'
				],
				explanationAr: 'التهكم بعكس المعنى (Antiphrase) وسيلة بلاغية ضمنية شائعة في التنديد السجالي.'
			},
			{
				questionAr:
					'Dans une salle d’examen, un élève dit à son camarade : « Il reste déjà moins de dix minutes avant la fin de l’épreuve. » Quel est le sous-entendu probable ?',
				options: [
					'Il faut se dépêcher de conclure et de relire sa copie',
					'L’examen vient de commencer',
					'La montre murale est en panne',
					'Le sujet comporte dix questions'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! هذا إيحاء سياقي (Sous-entendu) يُفهم من ظرف قاعة الامتحان دون تصريح مباشر بالأمر.',
					'خطأ: بقاء أقل من عشر دقائق يعني قرب النهاية.',
					'خطأ: لا يوجد ما يوحي بتعطل الساعة.',
					'خطأ: لا علاقة له بعدد الأسئلة.'
				],
				explanationAr: 'الإيحاء السياقي (Sous-entendu) يستنتجه المتلقي من السياق العملي للكلام.'
			},
			{
				questionAr:
					'Quels indices permettent de justifier de façon rigoureuse une tonalité polémique lors d’une analyse de texte ?',
				options: [
					'L’absence de tout jugement et l’usage exclusif de tableaux chiffrés',
					'Un lexique fortement péjoratif, des questions rhétoriques, des exclamations et éventuellement l’ironie',
					'Uniquement des repères géographiques neutres',
					'Le présent de vérité générale appliqué aux lois physiques'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: هذه سمات الخطاب العلمي الموضوعي.',
					'أحسنت! تجمع النبرة السجالية بين المعجم القدحي الحاد والأسئلة الاستنكارية والتعجب وأحياناً السخرية.',
					'خطأ: هذه تخص الوصف المكاني.',
					'خطأ: هذا يخص النص العلمي التفسيري.'
				],
				explanationAr: 'تُبرر النبرة السجالية باستخراج المعجم القدحي القوي والأسئلة الاستنكارية وعلامات الانفعال أو التهكم.'
			}
		]
	},
	{
		id: 'fre_lesson_2as_le_t2_figures_style_rhetorique',
		slug: 'fre-2as-le-t2-figures-style-rhetorique',
		grade: '2as_le',
		yearSubjectId: 777,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع 2: المرافعة والاتهام وبلاغة الإقناع (Plaidoyer, réquisitoire et rhétorique de la persuasion)',
		order: 4,
		titleAr: 'الصور البلاغية للإقناع والتأثير (Métaphore, antithèse, gradation, hyperbole)',
		objectives: [
			'التمييز البلاغي الدقيق بين الاستعارة (Métaphore)، التشبيه (Comparaison)، الطباق (Antithèse)، التدرج (Gradation)، والمبالغة (Hyperbole)',
			'تحديد عناصر الصورة (المشبه Comparé، المشبه به Comparant، وغياب أداة التشبيه في الاستعارة)',
			'تفسير الوظيفة الإقناعية والجمالية لكل صورة في سياق المرافعة والتنديد'
		],
		keywordsAr: [
			'métaphore',
			'antithèse',
			'gradation',
			'hyperbole',
			'anaphore',
			'الصور البلاغية'
		],
		discover: {
			scenarioAr:
				'في مقال نقدي حول تلوث المساحات الخضراء في المدن، يكتب الكاتب: « Les jardins urbains sont les poumons de nos cités. Chaque arbre abattu sans raison est une blessure infligée à l’avenir. Le béton avance, étouffe, dévore tout sur son passage ! Faut-il un océan de poussière pour réveiller nos consciences ? » تأمل كثافة الصور البلاغية وتكاملها.',
			svg: svgFrenchGrammarMap({
				title: 'Les grandes figures de la persuasion (2AS LE)',
				rootLabel: 'Rendre l’argument inoubliable',
				rootSub: 'Analogie, opposition et amplification',
				width: 580,
				branches: [
					{
						label: 'Métaphore',
						rule: 'Comparaison SANS outil',
						example: 'Les jardins sont les poumons.'
					},
					{
						label: 'Antithèse',
						rule: 'Deux idées opposées',
						example: 'Bâtir la paix, fuir le chaos.'
					},
					{
						label: 'Gradation',
						rule: 'Intensité croissante',
						example: 'avance, étouffe, dévore'
					},
					{
						label: 'Hyperbole',
						rule: 'Exagération expressive',
						example: 'un océan de poussière'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'تأمل الجملة الأولى: « Les jardins urbains sont les poumons de nos cités. » هل توجد أداة تشبيه (مثل comme أو tel que)؟ وما اسم هذه الصورة البلاغية؟',
					hintAr: 'توحيد مباشر بين الحدائق والرئتين دون أداة تشبيه.',
					expectedInput: 'لا توجد أداة تشبيه، إذن هي استعارة (Une métaphore)',
					revealAr:
						'الاستعارة (La métaphore) تقارن بين عنصرين (الحدائق = الرئتان) دون أداة مقارنة، فتعطي الصورة قوة إيحائية أعمق من التشبيه العادي.'
				},
				{
					promptAr:
						'في عبارة « un océan de poussière » (محيط من الغبار)، كيف يضخم الكاتب الواقع لتحذير القارئ؟ وما اسم هذه الصورة؟',
					hintAr: 'مبالغة تعبيرية قوية لتجسيد الخطر البيئي.',
					expectedInput: 'المبالغة البلاغية (Une hyperbole)',
					revealAr:
						'المبالغة (L’hyperbole) تبالغ في الوصف (مثال: un océan de poussière, mille dangers, une montagne de déchets) لإيقاظ وعي القارئ وإبراز فداحة المشكلة.'
				},
				{
					promptAr:
						'في « Le béton avance, étouffe, dévore tout », لاحظ تسلسل الأفعال الثلاثة: ما الصورة البلاغية هنا وما أثرها؟',
					hintAr: 'يتصاعد العنف الدلالي من التقدم إلى الخنق ثم الالتهام.',
					expectedInput: 'تدرج تصاعدي (Gradation ascendante) مع تشخيص (Personnification) لإبراز خطر الزحف الإسمنتي',
					revealAr:
						'الجمع بين التدرج التصاعدي (avance -> étouffe -> dévore) والتشخيص يجعل الخطر حياً ملموساً في مخيلة القارئ.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الاستعارة (La métaphore): تشبيه مختزل بلا أداة تشبيه (مثال: « La bibliothèque est un phare dans la cité », « Le poison de la rumeur »). إذا امتدت الصورة عبر عدة كلمات من نفس الحقل سُميت استعارة ممتدة (Métaphore filée).',
				'المبالغة (L’hyperbole): تضخيم متعمد للواقع (مثال: « une montagne de gaspillage », « une marée de fausses nouvelles », « mourir d’ennui ») بهدف الصدمة الإيجابية ولفت الانتباه إلى خطورة الظاهرة.',
				'الطباق (L’antithèse) والتوازي: تقابل لفظين أو فكرتين متضادتين في جملة واحدة لإبراز الخيار الأخلاقي الواضح (مثال: « La maîtrise des langues ouvre les esprits, l’ignorance les enferme »).',
				'التدرج (La gradation) والتكرار الصدري (L’anaphore): التدرج يصعّد الإحساس بالخطر أو العظمة شيئاً فشيئاً، والتكرار الصدري يمنح النص إيقاعاً خطابياً مهيباً يثبت الفكرة المحورية.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Comment commenter une figure de style en 3 étapes (LE)',
				subtitle: 'Méthode rigoureuse pour obtenir tous les points d’analyse',
				width: 560,
				columns: [
					{
						header: '1. Repérer',
						rule: 'Citer l’expression précise',
						examples: '« les poumons de nos cités »'
					},
					{
						header: '2. Identifier',
						rule: 'Nommer la figure exacte',
						examples: 'Métaphore (sans outil)'
					},
					{
						header: '3. Interpréter',
						rule: 'Expliquer l’effet persuasif',
						examples: 'Montre le rôle vital des parcs'
					}
				]
			}),
			visualCaptionAr: 'الخطوات الثلاث المضمونة لتحليل الصور البلاغية في امتحانات اللغات الأجنبية',
			examples: [
				{
					problemAr:
						'Identifiez et commentez la figure : « L’école rigoureuse est une boussole qui guide la jeunesse vers l’autonomie. »',
					solutionAr:
						'Métaphore (l’école est identifiée à une boussole sans outil de comparaison). Effet : elle met en valeur la fonction d’orientation morale et intellectuelle indispensable de l’école.'
				},
				{
					problemAr:
						'Identifiez la figure et son effet : « Des montagnes d’emballages plastiques envahissent chaque été nos plages autrefois immaculées. »',
					solutionAr:
						'Hyperbole (« des montagnes d’emballages »). Effet : l’exagération frappe l’imagination du lecteur pour dénoncer l’ampleur alarmante de la pollution.'
				}
			],
			watchOutAr:
				'لا تخلط بين التشبيه (Comparaison) والاستعارة (Métaphore): وجود أي أداة (comme, tel, semblable à, pareil à, ressembler à) يجعل الصورة تشبيهاً؛ أما غياب الأداة تماماً فيجعلها استعارة!'
		},
		practice: [
			{
				questionAr:
					'Identifiez la figure de style dans : « La langue maîtrisée est un pont entre les civilisations. »',
				options: ['Une comparaison explicite', 'Une métaphore', 'Une hyperbole', 'Une question rhétorique'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا توجد أداة تشبيه مثل « comme » أو « semblable à ».',
					'ممتاز! الجمع المباشر بين اللغة والجسر دون أداة تشبيه هو استعارة (Métaphore).',
					'خطأ: ليس فيها تضخيم كمي مبالغ فيه.',
					'خطأ: الجملة خبرية وليست استفهامية.'
				],
				explanationAr: 'التوحيد بين المشبه (la langue) والمشبه به (un pont) دون أداة مقارنة يشكل استعارة (Métaphore).'
			},
			{
				questionAr:
					'Quelle figure reconnaît-on dans : « Un déluge de notifications interrompt chaque heure la concentration des étudiants » ?',
				options: ['Une hyperbole (combinée à une métaphore)', 'Une antithèse', 'Une anaphore', 'Une litote'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! كلمة « déluge » (طوفان) تمثل مبالغة استعارية قوية تبرز كثافة التشتيت الرقمي.',
					'خطأ: لا يوجد تقابل بين أضداد.',
					'خطأ: لا يوجد تكرار في بداية عدة جمل.',
					'خطأ: الليتوت تقلل اللفظ لتقصد الكثير، وهنا العكس.'
				],
				explanationAr: 'تشبيه كثرة الإشعارات بالطوفان (déluge) يمثل مبالغة تعبيرية (Hyperbole) واستعارة لتأكيد خطورة التشتت.'
			},
			{
				questionAr:
					'Parmi ces phrases, laquelle contient une comparaison et NON une métaphore ?',
				options: [
					'Les livres sont des phares pour la pensée.',
					'Le livre agit comme un phare qui guide la pensée dans la nuit du doute.',
					'Ce fléau dévore le budget des familles.',
					'L’effort est la clé de toute excellence.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا توجد أداة تشبيه فهي استعارة.',
					'صحيح! وجود أداة التشبيه « comme » يجعل الصورة تشبيهاً صريحاً (Comparaison).',
					'خطأ: استعارة فعلية دون أداة تشبيه.',
					'خطأ: استعارة مباشرة بلا أداة تشبيه.'
				],
				explanationAr: 'وجود الأداة « comme » يميز التشبيه (Comparaison) عن الاستعارة (Métaphore).'
			},
			{
				questionAr:
					'Quel est l’effet persuasif principal d’une gradation ascendante dans un réquisitoire ?',
				options: [
					'Minimiser progressivement la gravité du problème',
					'Dramatiser et montrer l’aggravation inévitable d’un fléau si rien n’est entrepris',
					'Introduire une liste alphabétique neutre',
					'Créer une pause comique hors sujet'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: التصاعد يزيد الإحساس بالخطورة ولا يقللها.',
					'ممتاز! التدرج التصاعدي يبرز خطورة تفاقم الآفة ويدفع القارئ للتحرك.',
					'خطأ: التدرج يرتب المعاني وفق الشدة لا الأبجدية.',
					'خطأ: السياق جاد وتنديدي.'
				],
				explanationAr: 'التدرج التصاعدي (Gradation ascendante) يقنع القارئ بفداحة تطور الظاهرة السلبية.'
			},
			{
				questionAr:
					'Quelle analyse complète d’une antithèse mérite la note maximale en 2AS LE ?',
				options: [
					'Écrire simplement le mot « antithèse » sans citation ni explication.',
					'Citer les deux termes opposés, nommer l’antithèse et expliquer comment ce contraste renforce la thèse de l’auteur.',
					'Inventer une figure qui n’existe pas dans le texte.',
					'Recopier tout le paragraphe sans commentaire.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: تسمية الصورة دون استشهاد وتعليل تمنح نصف العلامة فقط.',
					'أحسنت! الاستشهاد الدقيق + التسمية + بيان الأثر الحجاجي هي الثلاثية الكاملة.',
					'خطأ: يجب الالتزام بالنص.',
					'خطأ: النسخ ليس تحليلاً أسلوبياً.'
				],
				explanationAr: 'التحليل الأسلوبي الكامل يتبع المنهج الثلاثي: استشهاد + تسمية + تفسير الأثر الإقناعي.'
			}
		]
	},
	{
		id: 'fre_lesson_2as_le_t2_essai_argumentatif_le',
		slug: 'fre-2as-le-t2-essai-argumentatif-le',
		grade: '2as_le',
		yearSubjectId: 777,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع 2: المرافعة والاتهام وبلاغة الإقناع (Plaidoyer, réquisitoire et rhétorique de la persuasion)',
		order: 5,
		titleAr: 'تحرير مقال حجاجي معمّق — نموذج شعبة اللغات (Essai argumentatif approfondi — 8 pts)',
		objectives: [
			'بناء مقال حجاجي معمق (180 إلى 220 كلمة) وفق سلم التنقيط الرسمي لشعبة اللغات الأجنبية (8 نقاط)',
			'توظيف المخطط التحليلي الملتزم أو الجدلي المتزن (مقدمة بإشكالية + فقرات حجج متدرجة + فقرة استدراك ودحض + خاتمة مفتوحة)',
			'إثراء المقال بروابط راقية (En dépit de, Avoir beau, Force est de constater, Dès lors)، وحجج متنوعة، وصور بلاغية مدروسة'
		],
		keywordsAr: [
			'essai argumentatif',
			'plan dialectique',
			'plan analytique',
			'2AS LE 8 points',
			'transition',
			'المقال الحجاجي المعمق'
		],
		discover: {
			scenarioAr:
				'في شعبة اللغات الأجنبية (معامل 5)، تُمنح للوضعية الإدماجية 8 نقاط كاملة من أصل 20! يريد أيوب أن يرتقي بمقاله حول « تعلم اللغات الأجنبية والانفتاح الثقافي » من مستوى عادي إلى مستوى ممتاز (7.5 أو 8/8). ما الفارق الحقيقي بين مقال متوسط ومقال متفوق في شعبة LE؟',
			svg: svgFrenchWritingBlueprint({
				title: 'Plan d’excellence d’un Essai Argumentatif (2AS LE — 8 pts)',
				width: 580,
				steps: [
					{
						stage: '1. Intro problématisée',
						detail: 'Accroche actuelle + problématique précise + annonce nette de la thèse.'
					},
					{
						stage: '2. Corps (Arg. logiques)',
						detail: '2 arguments solides (logique + expérience) illustrés d’exemples précis.'
					},
					{
						stage: '3. Concession / Réfut.',
						detail: 'Anticiper l’objection (Certes / Avoir beau) puis la réfuter avec rigueur.'
					},
					{
						stage: '4. Synthèse & Ouverture',
						detail: 'Bilan nuancé + valeur éthique + ouverture intelligente ou image forte.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'ما المكونات الثلاثة الضرورية في مقدمة المقال الحجاجي لشعبة اللغات الأجنبية؟',
					hintAr: 'لا نبدأ مباشرة بـ « Je pense que » من أول كلمة!',
					expectedInput: 'تمهيد سياقي عام (Amorce) + طرح الإشكالية (Problématique) + إعلان الأطروحة أو خطة المعالجة',
					revealAr:
						'المقدمة الأكاديمية المتقنة تمر بثلاث خطوات متدرجة: التمهيد من الواقع الراهن، ثم صياغة سؤال إشكالي، ثم إعلان الموقف بوضوح.'
				},
				{
					promptAr:
						'كيف تجعل الانتقال بين فقرة الحجج المؤيدة وفقرة الاستدراك والدحض سلساً وأنيقاً؟',
					hintAr: 'تُسمى هذه الجملة « جملة الانتقال » (Phrase de transition).',
					expectedInput: 'باستعمال جملة انتقالية متوازنة مثل: « Toutefois, malgré ces atouts majeurs, certains observateurs formulent une réserve... »',
					revealAr:
						'الجمل الانتقالية (Transitions) تمنع التفكك بين الفقرات وتُظهر للمصحح أن المقال بناء فكري واحد متماسك.'
				},
				{
					promptAr:
						'كيف نوزع الجهد والتركيز على سلم 8 نقاط في شعبة اللغات الأجنبية؟',
					hintAr: 'تذكر المعايير الأربعة: الملاءمة والفكر (2.5)، التنظيم والتماسك (2)، سلامة اللغة وثراء المعجم (2.5)، والأصالة والأسلوب (1).',
					expectedInput: 'الجمع بين عمق الأفكار وتنوع الحجج، وهيكلة الفقرات، ودقة القواعد الراقية (Subjonctif/Concession)، والأسلوب الأنيق',
					revealAr:
						'في شعبة اللغات، يقدّر المصحح جداً توظيف بنى نحوية متقدمة بلا أخطاء (bien que + Subjonctif، avoir beau + Infinitif، en dépit de + GN) ومعجم دقيق متنوع.'
				}
			]
		},
		summary: {
			rulesAr: [
				'اختيار المخطط المناسب حسب صيغة السؤال: (أ) إذا طلب الدفاع عن قضية أو التنديد بآفة نعتمد المخطط الملتزم المعزّز باستدراك (Thèse soutenue + Arguments gradués + Concession-Réfutation + Conclusion)؛ (ب) إذا طلب مناقشة رأيين متقابلين (« Partagez-vous ce point de vue ? Discutez ») نعتمد المخطط الجدلي (Thèse adverse examinée -> Réfutation et Thèse personnelle -> Synthèse).',
				'الحجم المثالي لمقال 2AS LE (8 نقاط): من 180 إلى 220 كلمة مقسمة بوضوح إلى 4 فقرات (مقدمة + فقرتان متوازنتان للعرض + خاتمة جامعة) مع مسافة بادئة في بداية كل فقرة.',
				'علامات التميز اللغوي (2.5 + 1 نقطة): تنويع الروابط الراقية (En premier lieu, Par ailleurs, En dépit de, Force est de constater que, En définitive)، تفادي التكرار بالبدائل المعجمية، إدراج صورة بلاغية طبيعية (استعارة أو طباق)، وتجنب الأخطاء الإملائية والاتفاقية.',
				'خاتمة أكاديمية بليغة: تلخص الجواب عن الإشكالية (En somme / En définitive)، تؤكد القيمة الأخلاقية أو الثقافية، وتفتح أفقاً تأملياً راقياً دون طرح موضوع جديد منفصل.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Formules académiques d’excellence (2AS LE)',
				rootLabel: 'Élever le style de son essai',
				rootSub: 'Registre courant soigné à soutenu',
				width: 580,
				branches: [
					{
						label: 'Problématiser',
						rule: 'Dès lors, comment concilier... ?',
						example: 'Faut-il y voir un progrès ou un risque ?'
					},
					{
						label: 'Argumenter',
						rule: 'Force est de constater que...',
						example: 'À cet égard, l’exemple de... éclaire...'
					},
					{
						label: 'Nuancer / Réfuter',
						rule: 'S’il est indéniable que... il n’en reste pas moins...',
						example: 'En dépit de cet attrait, on observe...'
					},
					{
						label: 'Conclure',
						rule: 'En définitive, tout porte à croire...',
						example: 'C’est à ce prix que notre école...'
					}
				]
			}),
			visualCaptionAr: 'عبارات أكاديمية جاهزة لرفع جودة الأسلوب والربط في مقال 2AS LE',
			examples: [
				{
					problemAr:
						'Rédigez une introduction problématisée sur l’apprentissage des langues étrangères et l’attachement à l’identité nationale.',
					solutionAr:
						'Dans un monde marqué par l’intensification des échanges scientifiques et culturels, la maîtrise des langues étrangères suscite parfois des débats passionnés. S’ouvrir aux langues du monde menace-t-il l’identité nationale ou constitue-t-il au contraire un levier de rayonnement ? Tout porte à croire qu’un apprentissage rigoureux des langues, adossé à une solide culture d’origine, enrichit l’esprit et sert admirablement le pays.'
				},
				{
					problemAr:
						'Rédigez une transition fluide vers une concession réfutée sur la surcharge numérique.',
					solutionAr:
						'S’il est indéniable que les outils numériques facilitent l’accès instantané à l’information, il n’en reste pas moins qu’un usage excessif et non maîtrisé fragilise l’attention et appauvrit la qualité de la langue écrite.'
				}
			],
			watchOutAr:
				'احذر من الإطالة المفرطة المليئة بالأخطاء أو الاختصار المخل (أقل من 120 كلمة في شعبة اللغات)! الجودة اللغوية والمنهجية المركّزة في 180-220 كلمة متماسكة أفضل بكثير من صفحتين مليئتين بالتكرار والأخطاء.'
		},
		practice: [
			{
				questionAr:
					'Quelles sont les trois composantes d’une introduction académique réussie dans un essai argumentatif de 2AS LE ?',
				options: [
					'Un titre familier, un exemple personnel et une conclusion',
					'Une amorce contextuelle, une problématique claire et l’annonce de la thèse ou de la démarche',
					'Une liste de dix connecteurs et une définition de dictionnaire',
					'Uniquement une citation isolée sans explication'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: المقدمة لا تحتوي على الخاتمة ولا على لغة عامية.',
					'ممتاز! الثلاثية الأكاديمية للمقدمة هي: التمهيد + الإشكالية + إعلان الأطروحة أو المسار.',
					'خطأ: الروابط تُوزع داخل العرض ولا تُسرد في المقدمة.',
					'خطأ: الاقتباس المعزول لا يكفي لبناء مقدمة.'
				],
				explanationAr: 'المقدمة المتقنة تنطلق من تمهيد عام لتطرح إشكالية دقيقة ثم تعلن الأطروحة بوضوح.'
			},
			{
				questionAr:
					'Laquelle de ces formules assure une transition concessive de niveau soutenu (2AS LE) ?',
				options: [
					'Bon, maintenant je change de paragraphe.',
					'S’il est indéniable que cet outil accélère le travail, il n’en reste pas moins que la réflexion personnelle demeure irremplaçable.',
					'Mais aussi, c’est comme ça.',
					'Parce que voilà l’autre idée.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: عبارة شفوية عامية مرفوضة في المقال.',
					'أحسنت! البنية « S’il est indéniable que..., il n’en reste pas moins que... » من أرقى أدوات الربط والاستدراك.',
					'خطأ: ركاكة شديدة ومستوى عامي.',
					'خطأ: غير نحوية وغير أكاديمية.'
				],
				explanationAr: 'الانتقال الاستدراكي الراقي يربط الفقرة السابقة بالجديدة بمرونة ونضج فكري.'
			},
			{
				questionAr:
					'Dans le barème officiel de 2AS Langues Étrangères, quelle est la pondération de la production écrite sur 20 ?',
				options: ['4 points sur 20', '6 points sur 20', '8 points sur 20', '12 points sur 20'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: هذا ليس سلم شعبة اللغات الأجنبية.',
					'خطأ: 6 نقاط تخص الشعب العلمية (SE/MT/TM/GE).',
					'صحيح! في شعبة اللغات الأجنبية (2AS LE)، التوزيع الرسمي هو 6 + 6 + 8 = 20.',
					'خطأ: 12 نقطة هي مجموع جزأي فهم المكتوب (6 + 6).'
				],
				explanationAr: 'التوزيع الرسمي لاختبار الفرنسية في شعبة اللغات الأجنبية هو: 6 (دراسة النص) + 6 (بناء اللغة) + 8 (الإنتاج الكتابي).'
			},
			{
				questionAr:
					'Quel défaut doit absolument être évité dans la conclusion d’un essai argumentatif ?',
				options: [
					'Répondre clairement à la problématique posée en introduction',
					'Introduire un nouvel argument détaillé ou se contredire complètement',
					'Employer un connecteur de clôture tel que « En définitive »',
					'Terminer par une ouverture réfléchie liée au thème'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الإجابة الختامية عن الإشكالية واجبة.',
					'ممتاز! الخاتمة مكان للتركيب والإغلاق وليست مكاناً لطرح حجة جديدة أو مناقضة المقال.',
					'خطأ: « En définitive » رابط ختامي مثالي.',
					'خطأ: الفتح الذكي المرتبط بالموضوع يثري الخاتمة.'
				],
				explanationAr: 'لا نضيف حجة جديدة ولا نناقض أطروحتنا في الخاتمة، بل نلخص ونغلق الإشكالية بأناقة.'
			},
			{
				questionAr:
					'Comment s’assurer que son essai respecte le niveau attendu en 2AS LE (180 à 220 mots) ?',
				options: [
					'Écrire le premier jet directement au propre sans brouillon',
					'Bâtir un plan au brouillon, varier arguments et exemples, soigner transitions et subjonctifs, puis relire minutieusement',
					'Utiliser le même verbe « faire » dans chaque phrase',
					'Éviter toute concession par peur de nuancer son propos'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الكتابة دون تخطيط مسبق تؤدي إلى الفوضى والتكرار.',
					'صحيح! التخطيط على المسودة وتنويع الحجج والمراجعة النهائية هي مفتاح العلامة الممتازة (8/8).',
					'خطأ: تكرار الأفعال الباهتة يخفض علامة الثراء المعجمي.',
					'خطأ: الاستدراك المدحوض يرفع جودة التفكير النقدي.'
				],
				explanationAr: 'التخطيط المنهجي والمراجعة اللغوية الدقيقة هما الضمان الحقيقي للتفوق في وضعية 8 نقاط.'
			}
		]
	}
];
