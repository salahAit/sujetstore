import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWritingBlueprint
} from '../../svg-french';

export const LESSONS_4AM_T2: FrenchInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// 1. L’expression de la cause et de la conséquence (BEM)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_4am_t2_cause_consequence',
		slug: 'fre-4am-t2-cause-consequence',
		grade: '4am',
		yearSubjectId: 645,
		trimesterId: 't2',
		sequenceId: 'proj2',
		sequenceTitleAr: 'المشروع الثاني: التضامن والعيش المشترك ومكافحة الآفات والشهادة التاريخية (Solidarité et témoignage — BEM)',
		order: 1,
		titleAr: 'التعبير عن السبب والنتيجة في BEM (La cause : parce que, grâce à, à cause de | La conséquence : donc, si bien que)',
		objectives: [
			'التمييز بين أدوات السبب المتبوعة بجملة (parce que, puisque, car) وأدوات السبب المتبوعة باسم (grâce à للسبب الإيجابي / à cause de للسبب السلبي)',
			'إتقان أدوات النتيجة (donc, par conséquent, si bien que, tellement... que) والتحويل العكسي بين السبب والنتيجة في شهادة التعليم المتوسط'
		],
		keywordsAr: ['cause', 'conséquence', 'parce que', 'grâce à', 'à cause de', 'si bien que', 'donc'],
		discover: {
			scenarioAr:
				'قارن بين التعبير عن نفس العلاقة المنطقية حول « التويزة » (La Touiza): 1) « Les villageois ont reconstruit l’école rapidement grâce à la Touiza. » (سبب إيجابي) | 2) « Les villageois se sont entraidés, si bien que l’école a été reconstruite rapidement. » (نتيجة). لاحظ كيف قلبنا العلاقة بأداة واحدة!',
			svg: svgFrenchGrammarMap({
				title: 'Cause et Conséquence au BEM (4AM)',
				rootLabel: 'Les deux rapports logiques les plus testés au BEM',
				rootSub: 'Identifier toujours : [Cause] -> [Conséquence]',
				branches: [
					{
						label: 'Cause (+ Phrase)',
						rule: 'parce que / puisque / comme / car',
						example: 'Ils réussissent parce qu’ils s’entraident.',
						color: '#1d4ed8'
					},
					{
						label: 'Cause (+ Nom)',
						rule: 'grâce à (+) | à cause de (-)',
						example: 'grâce à la solidarité / à cause du gaspillage',
						color: '#7c3aed'
					},
					{
						label: 'Conséquence',
						rule: 'donc / par conséquent / si bien que',
						example: 'Il respecte ses parents, donc il est aimé.',
						color: '#047857'
					}
				]
			}),
			steps: [
				{
					promptAr: 'لماذا استعملنا (grâce à) في « grâce à la Touiza » ولم نستعمل (à cause de)؟',
					hintAr: 'هل « التويزة » سبب إيجابي أم سبب سلبي؟',
					expectedInput: 'لأن grâce à تسبق سبباً إيجابياً (بفضل)، أما à cause de فتسبق سبباً سلبياً (بسبب)',
					revealAr: 'قاعدة BEM ذهبية: (grâce à + nom = cause positive)، و (à cause de + nom = cause négative مثل: à cause de l’égoïsme / à cause du gaspillage).'
				},
				{
					promptAr: 'ما الفرق النحوي بين جملة فيها (car / donc) وجملة فيها (parce que / si bien que)؟',
					hintAr: 'إحداهما ربط بالتنسيق (Coordination) والأخرى جملة فرعية (Subordination)!',
					expectedInput: 'car و donc أداتا تنسيق (coordonnées)، بينما parce que و si bien que تنشئان جملة فرعية (proposition subordonnée)',
					revealAr: 'ممتاز! في سؤال الـ BEM « Exprimez le même rapport par une subordonnée »، استعمل (parce que / puisque) للسبب، و (si bien que / de sorte que / tellement... que) للنتيجة!'
				},
				{
					promptAr: 'حوّل جملة السبب التالية إلى جملة نتيجة باستعمال (donc): « Ce quartier est propre parce que les habitants le nettoient. »',
					hintAr: 'ابدأ بالسبب (les habitants...) ثم ضع (donc) ثم النتيجة (ce quartier...).',
					expectedInput: 'Les habitants nettoient ce quartier, donc il est propre.',
					revealAr: 'أحسنت! للتحويل من السبب إلى النتيجة نضع السبب أولاً ثم أداة النتيجة ثم النتيجة!'
				}
			]
		},
		summary: {
			rulesAr: [
				'التعبير عن السبب (La cause) في الجملة البسيطة (+ اسم): grâce à (سبب إيجابي: grâce à la solidarité)، à cause de (سبب سلبي: à cause de la négligence)، en raison de / faute de.',
				'التعبير عن السبب في الجملة المركّبة (+ فعل مصرف): car (تنسيق في الوسط فقط)، parce que / puisque / comme (جملة فرعية سببية: Proposition subordonnée circonstancielle de cause). ملاحظة: comme للسبب تأتي دائماً في بداية الجملة!',
				'التعبير عن النتيجة (La conséquence): donc / alors / par conséquent / c’est pourquoi (تنسيق/ربط)، و si bien que / de sorte que / au point que / tellement... que / si... que (جملة فرعية للنتيجة: Proposition subordonnée circonstancielle de conséquence).',
				'في BEM: احفظ جيداً صيغة (si + adjectif + que) مثل: « Il est si généreux que tout le monde l’estime »، وصيغة (tellement + verbe/adjectif + que) مثل: « Le gaspillage coûte tellement cher qu’il faut le combattre ».'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Conversion rapide Cause <-> Conséquence (BEM)',
				subtitle: 'Bien repérer l’ordre des propositions avant de réécrire !',
				columns: [
					{
						header: 'Cause (Subordonnée)',
						rule: 'Conséquence + parce que + Cause',
						examples: 'Le pain manque parce qu’on le gaspille.',
						color: '#1d4ed8'
					},
					{
						header: 'Cause (Groupe Nominal)',
						rule: 'grâce à (+) / à cause de (-)',
						examples: 'Le pain manque à cause du gaspillage.',
						color: '#7c3aed'
					},
					{
						header: 'Conséquence (Subord.)',
						rule: 'Cause + si bien que + Conséquence',
						examples: 'On gaspille le pain, si bien qu’il manque.',
						color: '#047857'
					}
				]
			}),
			visualCaptionAr: 'المخطط المضمون للتحويل بين السبب والنتيجة والجملة البسيطة في شهادة التعليم المتوسط',
			examples: [
				{
					problemAr: 'حوّل إلى جملة بسيطة (Phrase simple) بتعويض parce que: « Le village a survécu parce que les habitants étaient solidaires. »',
					solutionAr: 'Le village a survécu grâce à la solidarité des habitants.'
				},
				{
					problemAr: 'اربط الجملتين بالتعبير عن النتيجة باستعمال (si... que): « La Touiza est utile. Tous les voisins y participent. »',
					solutionAr: 'La Touiza est si utile que tous les voisins y participent.'
				}
			],
			watchOutAr:
				'خطأ شائع جداً في BEM: لا تكتب أبداً (parce que + nom) ولا (grâce à + verbe conjugué)! نقول: « grâce à son courage » (اسم) أو « parce qu’il est courageux » (جملة بفعل مصرف)!'
		},
		practice: [
			{
				questionAr: 'اختر أداة السبب المناسبة للسبب السلبي مع الاسم: « Plusieurs tonnes de pain sont jetées chaque jour ...... du gaspillage. »',
				options: ['grâce à', 'à cause', 'parce que', 'si bien que'],
				correctIndex: 1,
				diagnosticFeedback: [
					'grâce à تُستعمل للسبب الإيجابي فقط.',
					'ممتاز! à cause de تسبق اسماً يعبّر عن سبب سلبي (à cause du gaspillage).',
					'parce que يتبعها فاعل وفعل مصرف.',
					'si bien que أداة نتيجة.'
				],
				explanationAr: 'التبذير (le gaspillage) سبب سلبي وجاء اسماً، فنستعمل à cause de (à cause du).'
			},
			{
				questionAr: 'ما العلاقة المنطقية المعبّر عنها في الجملة: « Les jeunes ont organisé une Touiza, si bien que le quartier est devenu propre. »؟',
				options: ['La cause', 'La conséquence', 'Le but', 'L’opposition'],
				correctIndex: 1,
				diagnosticFeedback: [
					'نظافة الحي هي النتيجة وليس السبب.',
					'أحسنت! si bien que تُدخل جملة فرعية للنتيجة (subordonnée de conséquence).',
					'الهدف يُعبّر عنه بـ pour que / afin de.',
					'المعارضة تُعبّر عنها بـ bien que / mais.'
				],
				explanationAr: 'الرابط (si bien que) يعبّر دائماً عن النتيجة (La conséquence).'
			},
			{
				questionAr: 'حوّل الجملة التالية إلى جملة سبب باستعمال (parce que): « Respecter ses parents est un devoir sacré ; donc nous devons les honorer. »',
				options: [
					'Respecter ses parents est un devoir sacré parce que nous devons les honorer.',
					'Nous devons honorer nos parents parce que les respecter est un devoir sacré.',
					'Nous devons honorer nos parents parce que devoir sacré.',
					'Parce que nous devons les honorer, donc ils sont sacrés.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'عكست السبب والنتيجة منطقياً.',
					'ممتاز! النتيجة أولاً (Nous devons honorer nos parents) ثم parce que ثم السبب.',
					'ينقصها فعل مصرف بعد parce que.',
					'لا نجمع أبداً بين parce que و donc في نفس الجملة.'
				],
				explanationAr: 'لتحويل جملة نتيجة (Cause, donc Conséquence) إلى سبب نكتب: Conséquence + parce que + Cause.'
			},
			{
				questionAr: 'أيّ أداة سبب توضع دائماً في بداية الجملة فقط؟',
				options: ['car', 'comme', 'donc', 'si bien que'],
				correctIndex: 1,
				diagnosticFeedback: [
					'car لا تأتي في بداية الجملة أبداً.',
					'صحيح! comme السببية تأتي دائماً في بداية الجملة (Comme il pleuvait, ils ont reporté la sortie).',
					'donc أداة نتيجة في الوسط.',
					'si bien que أداة نتيجة في الوسط.'
				],
				explanationAr: 'أداة السبب (Comme) تأتي دوماً في صدر الجملة، بينما (car) تأتي في وسطها فقط.'
			},
			{
				questionAr: 'أكمل بتركيب النتيجة السليم: « Ce témoignage historique est ...... émouvant ...... tous les élèves écoutent en silence. »',
				options: ['si / que', 'parce / que', 'grâce / à', 'afin / que'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! (si + adjectif + que) تركيبة نتيجة قوية ومحبّبة في BEM.',
					'parce que للسبب ولا تنقسم حول الصفة.',
					'grâce à للسبب الإيجابي قبل اسم.',
					'afin que للهدف وتُتبع بـ subjonctif.'
				],
				explanationAr: 'قبل الصفة (émouvant) نستعمل صيغة النتيجة المشدّدة: si + adjectif + que.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 2. Le discours rapporté (Direct -> Indirect avec concordance des temps — BEM)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_4am_t2_discours_rapporte_concordance',
		slug: 'fre-4am-t2-discours-rapporte-concordance',
		grade: '4am',
		yearSubjectId: 645,
		trimesterId: 't2',
		sequenceId: 'proj2',
		sequenceTitleAr: 'المشروع الثاني: التضامن والعيش المشترك ومكافحة الآفات والشهادة التاريخية (Solidarité et témoignage — BEM)',
		order: 2,
		titleAr: 'الخطاب المنقول وتطابق الأزمنة في BEM (Le discours rapporté avec concordance des temps)',
		objectives: [
			'تطبيق جدول تطابق الأزمنة (La concordance des temps) عند تحويل الخطاب المباشر إلى غير المباشر مع فعل قول في الماضي',
			'تحويل الضمائر ومؤشرات الزمان والمكان (aujourd’hui -> ce jour-là, demain -> le lendemain, hier -> la veille) بدقة BEM'
		],
		keywordsAr: ['discours rapporté', 'concordance des temps', 'imparfait', 'plus-que-parfait', 'conditionnel présent'],
		discover: {
			scenarioAr:
				'قارن بدقة بين الجملتين عندما يكون فعل القول في الماضي (a déclaré / affirma): Direct : Le grand-père a déclaré : « Aujourd’hui, je raconte une histoire que j’ai vécue hier et que je n’oublierai jamais. » | Indirect : Le grand-père a déclaré que ce jour-là, il racontait une histoire qu’il avait vécue la veille et qu’il n’oublierait jamais. لاحظ التغيّرات الأربعة!',
			svg: svgFrenchConjugationChart({
				title: 'Concordance des temps au Discours Indirect (Verbe au passé)',
				subtitle: 'Tableau INCONTOURNABLE du BEM de Français (4AM)',
				columns: [
					{
						header: 'Présent -> Imparfait',
						rule: 'je fais -> il faisait',
						examples: '« Je suis fier » -> qu’il était fier',
						color: '#1d4ed8'
					},
					{
						header: 'Passé comp. -> PQP',
						rule: 'j’ai aidé -> il avait aidé',
						examples: '« Nous avons lutté » -> qu’ils avaient lutté',
						color: '#047857'
					},
					{
						header: 'Futur -> Conditionnel',
						rule: 'je viendrai -> il viendrait',
						examples: '« Il réussira » -> qu’il réussirait',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'إلى أيّ زمن تحوّل الحاضر (je raconte) والماضي المركّب (j’ai vécue) والمستقبل (je n’oublierai)؟',
					hintAr: 'تأمّل الأفعال الثلاثة في الجملة غير المباشرة أعلاه.',
					expectedInput: 'Présent -> Imparfait | Passé composé -> Plus-que-parfait | Futur simple -> Conditionnel présent',
					revealAr: 'هذا هو قلب درس الـ BEM! عندما يكون فعل القول في الماضي (a dit, déclara, affirmait)، تتراجع الأزمنة درجة واحدة إلى الخلف.'
				},
				{
					promptAr: 'كيف تحوّل المؤشّران الزمنيان (Aujourd’hui) و (hier)؟ وماذا يصبح (demain)؟',
					hintAr: 'اقرأ الجملة غير المباشرة وتذكّر: الغد يصبح « اليوم الموالي ».',
					expectedInput: 'aujourd’hui -> ce jour-là | hier -> la veille | demain -> le lendemain',
					revealAr: 'ممتاز! احفظ أيضاً: ici -> là-bas، ce matin -> ce matin-là، la semaine prochaine -> la semaine suivante.'
				},
				{
					promptAr: 'ماذا يحدث للأزمنة لو كان فعل القول في الحاضر (Le grand-père déclare : « ... »)؟',
					hintAr: 'تذكّر درس 3AM!',
					expectedInput: 'لا تتغيّر الأزمنة ولا مؤشرات الزمان، فقط الضمائر وأداة الربط',
					revealAr: 'أحسنت! لذلك أول خطوة يوم الـ BEM هي فحص زمن فعل القول (Présent أم Passé؟) قبل البدء بالتحويل!'
				}
			]
		},
		summary: {
			rulesAr: [
				'الخطوة 1 (فحص فعل القول): إذا كان فعل القول في الحاضر أو المستقبل (dit, affirme, dira) -> لا تغيير في الأزمنة! إذا كان في الماضي (a dit, déclara, racontait) -> نطبّق تطابق الأزمنة (Concordance des temps).',
				'الخطوة 2 (جدول تطابق الأزمنة): Présent -> Imparfait | Imparfait -> Imparfait (يبقى كما هو) | Passé composé -> Plus-que-parfait | Futur simple -> Conditionnel présent | Impératif -> de + infinitif.',
				'الخطوة 3 (تحويل مؤشرات الزمان والمكان): aujourd’hui -> ce jour-là | hier -> la veille | demain -> le lendemain | maintenant -> à ce moment-là | ici -> là-bas.',
				'الخطوة 4 (أداة الربط): خبرية (que / qu’) | استفهام كلي (si) | استفهام بـ Qu’est-ce que / Que (ce que) | استفهام بـ Qu’est-ce qui (ce qui) | استفهام بـ où / quand / pourquoi / comment (نحتفظ بنفس الأداة بلا قلب فاعل وفعل).'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Les 4 vérifications du Discours Indirect au BEM',
				rootLabel: 'Méthode 0 faute pour la transformation (4AM)',
				rootSub: 'Vérifier chaque point dans l’ordre avant de recopier',
				branches: [
					{
						label: '1. Outil de liaison',
						rule: 'que / si / ce que / de + inf.',
						example: 'Supprimer : « » ? !',
						color: '#1d4ed8'
					},
					{
						label: '2. Pronoms',
						rule: 'Je/Tu -> Il/Elle | mon -> son',
						example: 'Adapter au locuteur',
						color: '#047857'
					},
					{
						label: '3. Temps (si passé)',
						rule: 'Prés->Imp | PC->PQP | Fut->Cond',
						example: 'je viens -> qu’il venait',
						color: '#b45309'
					},
					{
						label: '4. Repères temps',
						rule: 'hier / aujourd’hui / demain',
						example: 'la veille / ce jour-là / le lendemain',
						color: '#7c3aed'
					}
				]
			}),
			visualCaptionAr: 'خطوات المراجعة الأربع المضمونة لسؤال الخطاب المنقول في شهادة التعليم المتوسط',
			examples: [
				{
					problemAr: 'حوّل إلى الخطاب غير المباشر: « L’ancien moudjahid a témoigné : “Nous avons aidé nos voisins hier et nous continuerons demain.” »',
					solutionAr: 'L’ancien moudjahid a témoigné qu’ils avaient aidé leurs voisins la veille et qu’ils continueraient le lendemain.'
				},
				{
					problemAr: 'حوّل إلى الخطاب غير المباشر: « Le professeur a demandé aux collégiens : “Avez-vous participé à la Touiza ?” »',
					solutionAr: 'Le professeur a demandé aux collégiens s’ils avaient participé à la Touiza.'
				}
			],
			watchOutAr:
				'احذر فخّين مشهورين في BEM: 1) لا تغيّر الـ Imparfait (يبقى imparfait!)، 2) في السؤال غير المباشر نرجع الترتيب الطبيعي (Sujet + Verbe) فنحذف قلب الفاعل: « Où vas-tu ? » تصبح « Il a demandé où j’allais » وليس « où allais-je »!'
		},
		practice: [
			{
				questionAr: 'حوّل إلى الخطاب غير المباشر: « Le bénévole a affirmé : “Je distribue des vivres aujourd’hui.” »',
				options: [
					'Le bénévole a affirmé qu’il distribue des vivres aujourd’hui.',
					'Le bénévole a affirmé qu’il distribuait des vivres ce jour-là.',
					'Le bénévole a affirmé qu’il distribuerait des vivres ce jour-là.',
					'Le bénévole a affirmé qu’il avait distribué des vivres la veille.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'فعل القول في الماضي (a affirmé) فيجب تحويل الحاضر إلى Imparfait و aujourd’hui إلى ce jour-là.',
					'ممتاز! distribue (Présent) -> distribuait (Imparfait) و aujourd’hui -> ce jour-là.',
					'distribuerait شرطي حاضر خاص بتحويل المستقبل.',
					'avait distribué خاص بتحويل الماضي المركّب.'
				],
				explanationAr: 'مع فعل القول في الماضي: الحاضر يتحول إلى Imparfait و aujourd’hui تتحول إلى ce jour-là.'
			},
			{
				questionAr: 'حوّل إلى الخطاب غير المباشر: « La mère a dit à ses enfants : “Nous préparerons les colis demain.” »',
				options: [
					'La mère a dit à ses enfants qu’ils prépareraient les colis le lendemain.',
					'La mère a dit à ses enfants qu’ils prépareront les colis demain.',
					'La mère a dit à ses enfants qu’ils préparaient les colis la veille.',
					'La mère a dit à ses enfants de prépareront les colis.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! Futur simple (préparerons) -> Conditionnel présent (prépareraient)، و demain -> le lendemain.',
					'نسيت تطبيق تطابق الأزمنة وتحويل demain.',
					'préparaient و la veille خاطئان لأن الأصل مستقبل وغد.',
					'لا يصح de مع فعل مصرف.'
				],
				explanationAr: 'المستقبل البسيط مع فعل قول في الماضي يصبح Conditionnel présent، و demain تصبح le lendemain.'
			},
			{
				questionAr: 'حوّل إلى الخطاب غير المباشر: « Le témoin raconta : “Les habitants ont accueilli les blessés hier.” »',
				options: [
					'Le témoin raconta que les habitants accueillaient les blessés hier.',
					'Le témoin raconta que les habitants avaient accueilli les blessés la veille.',
					'Le témoin raconta que les habitants ont accueilli les blessés la veille.',
					'Le témoin raconta que les habitants accueilleraient les blessés le lendemain.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الماضي المركّب (ont accueilli) يتحول إلى Plus-que-parfait وليس Imparfait.',
					'ممتاز! Passé composé -> Plus-que-parfait (avaient accueilli)، و hier -> la veille.',
					'يجب تحويل الزمن مع فعل القول في الماضي (raconta).',
					'الزمن الأصلي ماضٍ مركّب وليس مستقبلاً.'
				],
				explanationAr: 'الماضي المركّب يصبح Plus-que-parfait و hier تصبح la veille.'
			},
			{
				questionAr: 'حوّل السؤال إلى الخطاب غير المباشر: « Le journaliste a demandé au citoyen : “Pourquoi combattez-vous le gaspillage ?” »',
				options: [
					'Le journaliste a demandé au citoyen pourquoi il combattait le gaspillage.',
					'Le journaliste a demandé au citoyen pourquoi combattait-il le gaspillage ?',
					'Le journaliste a demandé au citoyen si pourquoi il combattait le gaspillage.',
					'Le journaliste a demandé au citoyen que pourquoi il combat le gaspillage.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! احتفظنا بـ pourquoi وألغينا قلب الفاعل وعلامة الاستفهام وحوّلنا الحاضر إلى Imparfait.',
					'يجب إلغاء قلب الفاعل وعلامة الاستفهام في الخطاب غير المباشر.',
					'لا نضع si قبل pourquoi.',
					'لا نضع que قبل pourquoi.'
				],
				explanationAr: 'مع أداة الاستفهام pourquoi نحذف قلب الفاعل وعلامة الاستفهام ونحوّل الحاضر إلى Imparfait.'
			},
			{
				questionAr: 'ماذا يصبح الأمر في الخطاب غير المباشر حتى لو كان فعل القول في الماضي: « Le directeur nous a recommandé : “Soyez solidaires !” »؟',
				options: [
					'Le directeur nous a recommandé d’être solidaires.',
					'Le directeur nous a recommandé que nous étions solidaires.',
					'Le directeur nous a recommandé si nous sommes solidaires.',
					'Le directeur nous a recommandé être solidaires.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! الأمر يتحول دائماً إلى (de / d’ + infinitif): d’être solidaires.',
					'الأمر لا يُحوّل إلى imparfait هنا.',
					'si للاستفهام لا للأمر.',
					'ينقصها حرف الجر d’ قبل المصدر.'
				],
				explanationAr: 'صيغة الأمر تتحوّل في الخطاب غير المباشر إلى (de / d’ + infinitif).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 3. La proposition subordonnée de but (pour que + subj. vs afin de + inf.)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_4am_t2_subordonnee_but',
		slug: 'fre-4am-t2-subordonnee-but',
		grade: '4am',
		yearSubjectId: 645,
		trimesterId: 't2',
		sequenceId: 'proj2',
		sequenceTitleAr: 'المشروع الثاني: التضامن والعيش المشترك ومكافحة الآفات والشهادة التاريخية (Solidarité et témoignage — BEM)',
		order: 3,
		titleAr: 'التعبير عن الهدف / الغاية في BEM (Le but : pour que + subjonctif, afin de + infinitif)',
		objectives: [
			'التمييز الدقيق بين استعمال (pour / afin de + infinitif) عند تطابق الفاعلين واستعمال (pour que / afin que + subjonctif) عند اختلاف الفاعلين',
			'استعمال عبارات الخوف والتجنّب للهدف المنفي (de peur de / de crainte de + inf. | de peur que / de crainte que + subjonctif)'
		],
		keywordsAr: ['expression du but', 'pour que', 'afin que', 'afin de', 'subjonctif', 'infinitif'],
		discover: {
			scenarioAr:
				'تأمّل الجملتين عن التضامن المدرسي: 1) « Les élèves organisent une collecte afin d’aider les familles démunies. » (نفس الفاعل) | 2) « Les élèves organisent une collecte afin que les familles démunies puissent passer un hiver serein. » (فاعلان مختلفان). لماذا استعملنا المصدر في الأولى والـ Subjonctif في الثانية؟',
			svg: svgFrenchGrammarMap({
				title: 'Règle d’or de l’expression du BUT au BEM (4AM)',
				rootLabel: 'Comparer les deux sujets avant de choisir l’outil !',
				rootSub: 'Même sujet -> Infinitif | Deux sujets différents -> Subjonctif',
				branches: [
					{
						label: 'Même sujet (+ Infinitif)',
						rule: 'pour / afin de / dans le but de',
						example: 'Nous économisons l’eau afin de la préserver.',
						color: '#1d4ed8'
					},
					{
						label: '2 sujets (+ Subjonctif)',
						rule: 'pour que / afin que + Subjonctif',
						example: 'J’agis pour que mon quartier soit propre.',
						color: '#047857'
					},
					{
						label: 'But à éviter (Négatif)',
						rule: 'de peur de (+ inf.) / de peur que (+ subj.)',
						example: 'Il vérifie de peur que le pain ne soit gaspillé.',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'في الجملة الأولى « Les élèves organisent... afin d’aider... »، من ينظّم الحملة ومن يساعد العائلات؟',
					hintAr: 'هل الفاعل واحد في الجزأين؟',
					expectedInput: 'نفس الفاعل (Les élèves) -> لذلك نستعمل afin de / pour + infinitif',
					revealAr: 'قاعدة أساسية في BEM: عندما يكون الفاعل نفسه في الجملتين، يُمنع استعمال (pour que) ونستعمل (pour / afin de / dans le but de + infinitif)!'
				},
				{
					promptAr: 'في الجملة الثانية، من ينظّم الحملة ومن يستطيع قضاء شتاء هادئ؟',
					hintAr: 'فاعل الجملة الرئيسية (Les élèves) وفاعل الفرعية (les familles démunies).',
					expectedInput: 'فاعلان مختلفان -> لذلك نستعمل afin que / pour que + subjonctif (puissent)',
					revealAr: 'ممتاز! مع فاعلين مختلفين، ننشئ جملة فرعية للهدف (Proposition subordonnée circonstancielle de but) بـ (pour que / afin que) متبوعة وجوباً بالـ Subjonctif!'
				},
				{
					promptAr: 'ما الصيغة المقابلة لـ (afin de) عندما نريد التعبير عن هدف نخشى وقوعه ونتجنبه (but à éviter)؟',
					hintAr: 'تبدأ بـ de peur... أو de crainte...',
					expectedInput: 'de peur de / de crainte de (+ infinitif) أو de peur que / de crainte que (+ subjonctif)',
					revealAr: 'أحسنت! مثلاً: « Nous achetons la juste quantité de pain de peur de le gaspiller. »'
				}
			]
		},
		summary: {
			rulesAr: [
				'الهدف / الغاية (Le but) هو النتيجة المرغوب في تحقيقها (but à atteindre) أو تجنّبها (but à éviter).',
				'في الجملة البسيطة (نفس الفاعل — Phrase simple): pour / afin de / en vue de / dans le but de / de peur de / de crainte de + Verbe à l’infinitif (أو + Nom مثل: pour la solidarité).',
				'في الجملة المركّبة (فاعلان مختلفان — Subordonnée de but): pour que / afin que / de peur que / de crainte que + Verbe au SUBJONCTIF présent.',
				'التحويل الشهير في BEM: من الجملة البسيطة إلى المركّبة (أو العكس). مثال: « Les parents éduquent leurs enfants pour leur réussite » تصبح « Les parents éduquent leurs enfants pour qu’ils réussissent ».'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Phrase simple vs Phrase complexe du BUT (BEM)',
				subtitle: 'Adapter le mode verbal au nombre de sujets',
				columns: [
					{
						header: 'Groupe nominal (Simple)',
						rule: 'pour / en vue de + Nom',
						examples: 'Ils travaillent pour le progrès du pays.',
						color: '#1d4ed8'
					},
					{
						header: 'Infinitif (Même sujet)',
						rule: 'pour / afin de + Infinitif',
						examples: 'Ils s’unissent afin de bâtir l’école.',
						color: '#047857'
					},
					{
						header: 'Subordonnée (2 sujets)',
						rule: 'pour que / afin que + Subj.',
						examples: 'Ils s’unissent afin que le village prospère.',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'التمييز بين الجملة البسيطة والمركّبة في التعبير عن الهدف خلال امتحان شهادة التعليم المتوسط',
			examples: [
				{
					problemAr: 'اربط الجملتين بالتعبير عن الهدف: « Les enseignants sensibilisent les collégiens. Les collégiens respectent les personnes âgées. »',
					solutionAr: 'Les enseignants sensibilisent les collégiens pour qu’ils (أو afin qu’ils) respectent les personnes âgées.'
				},
				{
					problemAr: 'اربط الجملتين بالتعبير عن الهدف (نفس الفاعل): « Nous participons à la Touiza. Nous voulons aider nos voisins. »',
					solutionAr: 'Nous participons à la Touiza afin d’aider (أو pour aider) nos voisins.'
				}
			],
			watchOutAr:
				'لا تكتب أبداً « Je travaille pour que je réussisse » (تكرار نفس الفاعل مع pour que خطأ نحوي في الفرنسية)! الصواب مع نفس الفاعل: « Je travaille pour réussir / afin de réussir »!'
		},
		practice: [
			{
				questionAr: 'أكمل الجملة بالأداة المناسبة: « Les citoyens nettoient ensemble la mosquée du quartier ...... accueillir dignement les fidèles. »',
				options: ['pour que', 'afin d’', 'afin que', 'de peur que'],
				correctIndex: 1,
				diagnosticFeedback: [
					'pour que يتبعها فاعل وفعل مصرف في subjonctif وليس مصدراً.',
					'ممتاز! نفس الفاعل + فعل في المصدر (accueillir) -> afin d’ (أو pour).',
					'afin que تتطلب فاعلاً مختلفاً وفعل subjonctif.',
					'de peur que للهدف المنفي مع subjonctif.'
				],
				explanationAr: 'الفاعل واحد والفعل في المصدر (accueillir)، فنختار afin d’.'
			},
			{
				questionAr: 'أكمل الجملة بالتصريف الصحيح بعد (pour que): « Les parents font de grands efforts pour que leurs enfants (réussir) ...... dans leurs études. »',
				options: ['réussir', 'réussissent', 'réussiront', 'réussissaient'],
				correctIndex: 1,
				diagnosticFeedback: [
					'بعد pour que نصرّف الفعل في الـ subjonctif ولا نتركه في المصدر.',
					'أحسنت! بعد pour que نضع الفعل في الحاضر المنصوب (subjonctif présent : réussissent).',
					'لا يُستعمل المستقبل بعد pour que.',
					'لا يُستعمل الماضي الناقص بعد pour que.'
				],
				explanationAr: 'الأداتان (pour que / afin que) تُتبعان وجوباً بالـ Subjonctif présent.'
			},
			{
				questionAr: 'اختر الجملة الخالية من الأخطاء النحوية:',
				options: [
					'Karim économise l’eau pour qu’il la préserve.',
					'Karim économise l’eau afin de la préserver.',
					'Karim économise l’eau afin que préserver.',
					'Karim économise l’eau pour que préserver.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نكرر نفس الفاعل (Karim / il) مع pour que.',
					'ممتاز! مع نفس الفاعل نستعمل afin de + infinitif.',
					'afin que لا يتبعها مصدر.',
					'pour que لا يتبعها مصدر.'
				],
				explanationAr: 'عند تطابق الفاعلين نستعمل دائماً (afin de / pour + infinitif).'
			},
			{
				questionAr: 'ما التعبير الذي يفيد هدفاً نرغب في تجنّبه (un but à éviter)؟',
				options: ['afin de', 'dans le but de', 'de peur de', 'pour'],
				correctIndex: 2,
				diagnosticFeedback: [
					'afin de لهدف نرغب في تحقيقه.',
					'dans le but de لهدف إيجابي مرجو.',
					'صحيح! de peur de / de crainte de تعبّران عن الخشية وتجنب وقوع ضرر.',
					'pour لهدف مرجو.'
				],
				explanationAr: 'نستعمل (de peur de / de crainte de + inf.) لتجنّب نتيجة غير مرغوبة.'
			},
			{
				questionAr: 'ما طبيعة الجملة المسطّرة في: « Nous luttons contre le gaspillage afin que les générations futures aient assez de ressources. »؟',
				options: [
					'Proposition subordonnée de cause',
					'Proposition subordonnée de but',
					'Proposition subordonnée relative',
					'Proposition subordonnée de conséquence'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا تعبر عن السبب.',
					'ممتاز! مسبوقة بـ afin que + subjonctif (aient) فهي جملة فرعية للهدف (subordonnée de but).',
					'لا يوجد ضمير وصل ولا اسم antécédent.',
					'ليست نتيجة بل هدف منشود.'
				],
				explanationAr: 'الأداة (afin que) مع الـ subjonctif تدخل proposition subordonnée circonstancielle de but.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 4. Le présent du subjonctif (emplois essentiels au BEM)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_4am_t2_subjonctif_present',
		slug: 'fre-4am-t2-subjonctif-present',
		grade: '4am',
		yearSubjectId: 645,
		trimesterId: 't2',
		sequenceId: 'proj2',
		sequenceTitleAr: 'المشروع الثاني: التضامن والعيش المشترك ومكافحة الآفات والشهادة التاريخية (Solidarité et témoignage — BEM)',
		order: 4,
		titleAr: 'المضارع المنصوب واستعمالاته الأساسية في BEM (Le présent du subjonctif)',
		objectives: [
			'صياغة الحاضر المنصوب (Subjonctif présent) للأفعال المنتظمة وحفظ أهم الأفعال الشاذة في BEM (être, avoir, faire, aller, pouvoir, savoir, vouloir)',
			'معرفة السياقات التي تُوجب استعمال الـ Subjonctif في شهادة التعليم المتوسط (il faut que, pour que, afin que, bien que, souhaiter que)'
		],
		keywordsAr: ['subjonctif présent', 'il faut que', 'pour que', 'bien que', 'verbes irréguliers'],
		discover: {
			scenarioAr:
				'اقرأ هذه التوصيات المدنية: « Il faut que chacun soit solidaire, que nous fassions preuve de respect envers nos parents et que les jeunes puissent éviter le gaspillage. » لاحظ شكل الأفعال (soit, fassions, puissent): كلها في زمن الـ Subjonctif présent!',
			svg: svgFrenchConjugationChart({
				title: 'Formation & Irréguliers du Subjonctif Présent (BEM)',
				subtitle: 'Terminaisons : -e, -es, -e, -ions, -iez, -ent (sauf être / avoir)',
				columns: [
					{
						header: 'Règle générale',
						rule: 'Radical de « ils » (présent)',
						examples: 'ils finissent -> que je finisse, que nous finissions',
						color: '#1d4ed8'
					},
					{
						header: 'Être & Avoir',
						rule: 'Indispensables au BEM !',
						examples: 'sois, soit, soyons, soient | aie, ait, ayons, aient',
						color: '#047857'
					},
					{
						header: 'Autres irréguliers',
						rule: 'faire, aller, pouvoir, savoir',
						examples: 'fasse / aille / puisse / sache',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'كيف نبني الـ Subjonctif présent للأفعال المنتظمة مثل (protéger) و (choisir) و (prendre)؟',
					hintAr: 'ننطلق من تصريف الفعل مع الضمير (ils) في الحاضر ونحذف (-ent) ثم نضيف النهايات!',
					expectedInput: 'نأخذ جذر (ils) في الحاضر + النهايات (-e, -es, -e, -ions, -iez, -ent)',
					revealAr: 'طريقة سريعة ومضمونة: ils choisissent -> que je choisisse، que tu choisisses، qu’il choisisse، que nous choisissions، qu’ils choisissent!'
				},
				{
					promptAr: 'ما تصريف الفعلين (être) و (avoir) في Subjonctif présent مع (il) و (ils)؟',
					hintAr: 'أشهر فعلين في امتحانات BEM!',
					expectedInput: 'être : qu’il soit / qu’ils soient | avoir : qu’il ait / qu’ils aient',
					revealAr: 'ممتاز! ولا تنسَ أن (nous / vous) تأخذ (soyons / soyez) و (ayons / ayez) بدون حرف i بعد y!'
				},
				{
					promptAr: 'اذكر ثلاث عبارات مشهورة في BEM تُوجب دائماً استعمال الـ Subjonctif présent بعدها.',
					hintAr: 'الوجوب + الهدف + المعارضة.',
					expectedInput: 'Il faut que / pour que (afin que) / bien que (quoique)',
					revealAr: 'أحسنت! يضاف إليها أفعال الإرادة والتمني والمشاعر: vouloir que، souhaiter que، craindre que، il est nécessaire que.'
				}
			]
		},
		summary: {
			rulesAr: [
				'النهايات الموحّدة للـ Subjonctif présent لجميع الأفعال (عدا être و avoir): -e, -es, -e, -ions, -iez, -ent. مع الضميرين (nous, vous) نعود غالباً لجذر الـ Imparfait (que nous prenions, que vous veniez).',
				'الأفعال الشاذة السبعة التي يجب حفظها عن ظهر قلب قبل BEM: être (sois, sois, soit, soyons, soyez, soient) | avoir (aie, aies, ait, ayons, ayez, aient) | faire (fasse, fassions) | aller (aille, allions) | pouvoir (puisse, puissions) | savoir (sache, sachions) | vouloir (veuille, voulions).',
				'متى نستعمل الـ Subjonctif présent في BEM؟ 1) بعد عبارات الوجوب والضرورة (il faut que, il est indispensable que)، 2) بعد أدوات الهدف (pour que, afin que, de peur que)، 3) بعد أدوات المعارضة/الاستدراك (bien que, quoique)، 4) بعد أفعال الرغبة والتمني والشك (vouloir que, souhaiter que, douter que).',
				'انتبه للمقارنة: بعد (Je pense que / Je crois que) في الإثبات نستعمل الـ Indicatif، وبعد (Il faut que / pour que / bien que) نستعمل الـ Subjonctif!'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Les 4 déclencheurs du Subjonctif au BEM (4AM)',
				rootLabel: 'Quand conjuguer au Subjonctif présent ?',
				rootSub: 'Repérer immédiatement l’expression placée avant « que »',
				branches: [
					{
						label: 'Obligation',
						rule: 'Il faut que / Il est essentiel que',
						example: 'Il faut que tu fasses attention.',
						color: '#1d4ed8'
					},
					{
						label: 'But',
						rule: 'pour que / afin que / de peur que',
						example: 'pour que chacun puisse étudier',
						color: '#047857'
					},
					{
						label: 'Opposition',
						rule: 'bien que / quoique',
						example: 'bien qu’il soit jeune, il aide tous',
						color: '#b45309'
					},
					{
						label: 'Souhait / Volonté',
						rule: 'vouloir que / souhaiter que',
						example: 'Je souhaite que vous réussissiez.',
						color: '#7c3aed'
					}
				]
			}),
			visualCaptionAr: 'المواضع الأربعة الرئيسية التي تُوجب تصريف الفعل في Subjonctif présent في امتحان BEM',
			examples: [
				{
					problemAr: 'صرّف بين قوسين في Subjonctif présent: « Il faut que nous (être) ...... solidaires et que chacun (faire) ...... sa part. »',
					solutionAr: 'Il faut que nous soyons solidaires et que chacun fasse sa part.'
				},
				{
					problemAr: 'صرّف في Subjonctif présent: « Nous économisons l’eau afin que les générations futures (avoir) ...... toujours de l’eau potable. »',
					solutionAr: 'aient.'
				}
			],
			watchOutAr:
				'انتبه لكتابة (qu’il ait) و (qu’il soit) بدون حرف e في الآخر! كثير من التلاميذ يخطئون ويكتبون (aie / soie) مع il، بينما الصواب: que j’aie / qu’il ait، و que je sois / qu’il soit!'
		},
		practice: [
			{
				questionAr: 'صرّف الفعل (faire) في الجملة: « Il faut que tous les collégiens ...... preuve de respect envers leurs parents. »',
				options: ['font', 'fassent', 'faisaient', 'feront'],
				correctIndex: 1,
				diagnosticFeedback: [
					'font حاضر إخباري، و Il faut que توجب الـ subjonctif.',
					'ممتاز! faire مع ils في Subjonctif présent هو: fassent.',
					'faisaient ماضٍ ناقص.',
					'feront مستقبل بسيط.'
				],
				explanationAr: 'بعد (Il faut que) نصرّف الفعل faire في Subjonctif présent: qu’ils fassent.'
			},
			{
				questionAr: 'اختر التصريف الصحيح للفعل (pouvoir) بعد (afin que): « Les bénévoles collectent des livres afin que chaque élève ...... réviser sereinement. »',
				options: ['peut', 'puisse', 'pourra', 'pouvait'],
				correctIndex: 1,
				diagnosticFeedback: [
					'peut حاضر إخباري لا يُستعمل بعد afin que.',
					'أحسنت! pouvoir في Subjonctif présent مع il هو: puisse.',
					'المستقبل لا يُستعمل بعد afin que.',
					'الماضي الناقص لا يُستعمل هنا.'
				],
				explanationAr: 'الفعل pouvoir شاذ في الـ Subjonctif présent: que je puisse, qu’il puisse, qu’ils puissent.'
			},
			{
				questionAr: 'أكمل بتصريف الفعلين (être) و (avoir) في Subjonctif présent: « Je souhaite que notre quartier ...... propre et que tous les voisins ...... l’esprit de Touiza. »',
				options: ['soie / aie', 'soit / aient', 'est / ont', 'sera / auront'],
				correctIndex: 1,
				diagnosticFeedback: [
					'مع المفرد (notre quartier) نكتب soit، ومع الجمع (tous les voisins) نكتب aient.',
					'ممتاز! qu’il soit (بـ t) و qu’ils aient (بـ ent).',
					'هذه صيغ الحاضر الإخباري.',
					'هذه صيغ المستقبل.'
				],
				explanationAr: 'بعد souhaiter que نستعمل Subjonctif présent: qu’il soit و qu’ils aient.'
			},
			{
				questionAr: 'ما التصريف الصحيح للفعل (savoir) في الجملة: « Il est important que tu ...... l’histoire de ton pays. »؟',
				options: ['sais', 'saches', 'sauras', 'savais'],
				correctIndex: 1,
				diagnosticFeedback: [
					'sais حاضر إخباري.',
					'ممتاز! savoir في Subjonctif présent مع tu هو: que tu saches.',
					'sauras مستقبل بسيط.',
					'savais ماضٍ ناقص.'
				],
				explanationAr: 'جذر savoir في Subjonctif présent هو sach-: que je sache, que tu saches, qu’il sache.'
			},
			{
				questionAr: 'اختر التصريف الصحيح للفعل (aller) مع (il) في Subjonctif présent: « Il faut qu’il ...... aider son grand-père. »',
				options: ['va', 'aille', 'ira', 'allait'],
				correctIndex: 1,
				diagnosticFeedback: [
					'va حاضر إخباري.',
					'صحيح! aller في Subjonctif présent مع il هو: qu’il aille (ومع nous: que nous allions).',
					'ira مستقبل بسيط.',
					'allait ماضٍ ناقص.'
				],
				explanationAr: 'تصريف aller في Subjonctif présent مع il هو: qu’il aille.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 5. Rédiger un plaidoyer pour la solidarité, le respect des parents ou contre le gaspillage
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_4am_t2_rediger_plaidoyer_solidarite',
		slug: 'fre-4am-t2-rediger-plaidoyer-solidarite',
		grade: '4am',
		yearSubjectId: 645,
		trimesterId: 't2',
		sequenceId: 'proj2',
		sequenceTitleAr: 'المشروع الثاني: التضامن والعيش المشترك ومكافحة الآفات والشهادة التاريخية (Solidarité et témoignage — BEM)',
		order: 5,
		titleAr: 'منهجية كتابة نص حجاجي (Plaidoyer) للتضامن والاحترام ومكافحة التبذير في BEM',
		objectives: [
			'بناء مرافعة حجاجية (Plaidoyer) من 12 إلى 14 سطراً للدفاع عن قيمة أخلاقية (التويزة، برّ الوالدين) أو محاربة آفة اجتماعية (تبذير الخبز والماء، الإدمان على الشاشات)',
			'دمج علاقات السبب والنتيجة والهدف (avec subjonctif) والحوار أو الشهادة القصيرة لنيل العلامة الكاملة (7/7)'
		],
		keywordsAr: ['plaidoyer', 'Touiza', 'solidarité', 'respect des parents', 'gaspillage', 'BEM'],
		discover: {
			scenarioAr:
				'تخيّل أن موضوع الـ BEM يطلب منك كتابة نص حجاجي تقنع فيه زملاءك بمحاربة تبذير الخبز والغذاء (le gaspillage alimentaire) أو بإحياء عادة « التويزة » في الحي والمدرسة. كيف تبني نصاً حجاجياً أخلاقياً قوياً يجمع بين العقل والضمير؟',
			svg: svgFrenchWritingBlueprint({
				title: 'Plan 7/7 du Plaidoyer social et civique (BEM)',
				steps: [
					{ stage: '1. Constat + Thèse', detail: 'Présenter la valeur (Touiza / respect) ou le fléau + affirmer sa thèse.' },
					{ stage: '2. Arg. 1 + Cause', detail: 'D’abord, défendre son idée en expliquant la cause (parce que / grâce à).' },
					{ stage: '3. Arg. 2 + Conséq.', detail: 'Ensuite, montrer les effets concrets (donc / si bien que / exemple).' },
					{ stage: '4. Arg. 3 + But/Appel', detail: 'Enfin, conclure par un appel (Il faut que + subj. / afin que + subj.).' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الفرق بين (Un plaidoyer) و (Un réquisitoire) في الحجاج؟',
					hintAr: 'الأول يدافع عن قيمة نبيلة، والثاني يُدين آفة سلبية.',
					expectedInput: 'Plaidoyer دفاع عن قيمة (التضامن، برّ الوالدين)، و Réquisitoire إدانة لآفة (التبذير، العنف)',
					revealAr: 'ممتاز! وفي الحالتين نتّبع نفس المنهجية المحكمة: مقدمة بأطروحة، 3 حجج وأمثلة مرتبة، وخاتمة تحثّ على السلوك الإيجابي.'
				},
				{
					promptAr: 'كيف نُدمج جملة هدف بـ (afin que + subjonctif) داخل خاتمة عن التضامن (La Touiza)؟',
					hintAr: 'استعمل فاعلين مختلفين: Nous (الفاعل 1) و notre société (الفاعل 2).',
					expectedInput: 'Mobilisons-nous tous afin que notre société reste unie et fraternelle.',
					revealAr: 'رائع! جملة واحدة بهذه القوة تُبرهن للمصحّح إتقانك للهدف والـ Subjonctif والأسلوب الحجاجي معاً.'
				},
				{
					promptAr: 'أعطِ مثالاً ملموساً يُقوّي حجةً ضد تبذير الخبز في الجزائر.',
					hintAr: 'اربط بين الشراء العقلاني وتقدير النعمة ومساعدة المحتاجين.',
					expectedInput: 'Acheter uniquement la quantité nécessaire permet d’économiser les ressources et d’aider les familles modestes',
					revealAr: 'ممتاز! الحجة المدعومة بحل عملي ملموس تجعل نصك الحجاجي واقعياً ومقنعاً.'
				}
			]
		},
		summary: {
			rulesAr: [
				'محاور المشروع الثاني المفضّلة في BEM: 1) التضامن وعادة التويزة (La Touiza et l’entraide)، 2) برّ الوالدين واحترام المسنين (Le respect des parents et des aînés)، 3) مكافحة تبذير الخبز والماء (La lutte contre le gaspillage)، 4) الوقاية من الإدمان على الشاشات (L’usage excessif des écrans).',
				'رصيد معجمي قوي جاهز للتوظيف: la solidarité، l’entraide، la fraternité، la bienveillance، la gratitude، le devoir moral، un fléau social (آفة اجتماعية)، le gaspillage، préserver les bienfaits (حفظ النّعم)، la cohésion sociale.',
				'موارد لغوية تُرفع بها علامتك إلى 7/7: أداة سبب (parce que / grâce à / à cause de) + أداة نتيجة (donc / si bien que) + أداة هدف بـ Subjonctif (pour que / afin que + soit / puisse / fasse) + روابط الترتيب (D’abord, Ensuite, Enfin).',
				'صيغة ختامية مؤثرة: « En conclusion, il est indispensable que chacun assume sa responsabilité afin que notre société demeure solidaire, respectueuse et digne. »'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Arguments clés pour 3 sujets fréquents du BEM (T2)',
				rootLabel: 'Réussir tout sujet citoyen ou moral en 4AM',
				rootSub: 'Adapter 3 arguments clairs (Moral + Social + Pratique)',
				branches: [
					{
						label: 'Solidarité / Touiza',
						rule: 'Entraide, unité, efficacité',
						example: 'Nettoyer le quartier, aider les familles',
						color: '#1d4ed8'
					},
					{
						label: 'Respect des parents',
						rule: 'Gratitude, éducation, cohésion',
						example: 'Ils se sacrifient pour notre avenir',
						color: '#047857'
					},
					{
						label: 'Stop au gaspillage',
						rule: 'Éthique, économie, partage',
						example: 'Acheter juste, éviter de jeter le pain',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'بنك الحجج الجاهزة لأهم ثلاثة مواضيع أخلاقية واجتماعية في الفصل الثاني 4AM',
			examples: [
				{
					problemAr: 'صُغ جملة حجاجية عن برّ الوالدين تتضمن أداة سبب.',
					solutionAr: 'D’abord, nous devons honorer nos parents parce qu’ils nous ont élevés avec amour et ont consenti de grands sacrifices pour notre éducation.'
				},
				{
					problemAr: 'صُغ جملة تدين تبذير الخبز باستعمال (à cause de) و (il faut que + subjonctif).',
					solutionAr: 'À cause du gaspillage quotidien, des milliers de baguettes finissent à la poubelle ; il faut donc que chaque famille fasse preuve de modération.'
				}
			],
			watchOutAr:
				'احترم الطول المطلوب في BEM (من 10 إلى 14 سطراً)، ولا تنسَ تقسيم الورقة إلى ثلاث فقرات متباعدة بوضوح ومراجعة تصريف الـ Subjonctif بعد (il faut que / pour que / afin que)!'
		},
		practice: [
			{
				questionAr: 'ما معنى مصطلح « La Touiza » في الثقافة الجزائرية؟',
				options: [
					'عادة جزائرية عريقة للتضامن والعمل الجماعي التطوعي لمساعدة الجيران والمحتاجين',
					'نوع من السفن التجارية القديمة',
					'لعبة فردية على الهاتف',
					'ضريبة مالية على السفر'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! التويزة تقليد جزائري أصيل يجسّد التعاون والتكافل بين أفراد المجتمع.',
					'لا علاقة لها بالسفن.',
					'التويزة عمل جماعي ميداني.',
					'التويزة عمل تطوعي خيري مجاني.'
				],
				explanationAr: 'التويزة (La Touiza) هي التعاون التطوعي الجماعي في الزراعة أو البناء أو تنظيف الحي ومساعدة المحتاجين.'
			},
			{
				questionAr: 'أيّ جملة ختامية توظّف (afin que + subjonctif) بشكل سليم في نص ضد تبذير الخبز؟',
				options: [
					'Agissons ensemble afin que personne ne gaspille plus cette précieuse nourriture.',
					'Agissons ensemble afin que nous gaspillons plus de pain.',
					'Agissons ensemble afin de que personne gaspille.',
					'Agissons ensemble afin que personne gaspillera le pain.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! فاعلان مختلفان (nous / personne) + afin que + subjonctif présent (gaspille).',
					'تناقض المعنى وتكرار الفاعل مع afin que.',
					'لا توجد صيغة afin de que.',
					'لا يُستعمل المستقبل بعد afin que.'
				],
				explanationAr: 'استُعملت afin que مع فاعل ثانٍ (personne) وفعل في Subjonctif présent (gaspille).'
			},
			{
				questionAr: 'ما الكلمة الفرنسية الدقيقة التي تعني « آفة اجتماعية » مثل التبذير أو العنف المدرسي؟',
				options: ['un fléau social', 'un chef-d’œuvre', 'une randonnée', 'un monument'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! « un fléau social » تعبير فصيح متداول جداً في مواضيع BEM.',
					'chef-d’œuvre تعني تحفة فنية.',
					'randonnée تعني نزهة مشياً.',
					'monument تعني معلم تاريخي.'
				],
				explanationAr: 'عبارة « un fléau social » هي المصطلح الدقيق لوصف الآفات الاجتماعية.'
			},
			{
				questionAr: 'أيّ تركيبة تُثري عرضك الحجاجي حول التضامن بأداة سبب وأداة نتيجة سليمتين؟',
				options: [
					'Grâce à l’entraide, les obstacles deviennent faciles, si bien que tout le quartier prospère.',
					'À cause de l’entraide, les obstacles deviennent faciles, parce que le quartier prospère.',
					'Grâce à ils s’entraident, donc le quartier prospère.',
					'Parce que l’entraide, si bien que le quartier.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! grâce à + اسم إيجابي + si bien que + جملة نتيجة.',
					'à cause de للسبب السلبي، ولا يُربط السبب بنتيجة بـ parce que هكذا.',
					'grâce à يتبعها اسم وليس جملة فعلية.',
					'الجملة ناقصة أفعال وغير سليمة.'
				],
				explanationAr: 'الجملة الأولى تجمع بإتقان بين السبب الإيجابي (Grâce à + nom) والنتيجة (si bien que + phrase).'
			},
			{
				questionAr: 'في نص حجاجي حول احترام الوالدين، ما الحجة الأقوى لتأييد الأطروحة؟',
				options: [
					'Nos parents veillent sur notre éducation et notre bien-être ; les respecter est un devoir moral et religieux.',
					'Les maisons anciennes ont des fenêtres en bois.',
					'Il fait souvent froid au mois de janvier.',
					'La mer Méditerranée se situe au nord de l’Algérie.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! حجة أخلاقية وإنسانية مباشرة ومقنعة.',
					'جملة خارج الموضوع.',
					'جملة خارج الموضوع.',
					'جملة خارج الموضوع.'
				],
				explanationAr: 'الحجة القوية تبرّر الأطروحة وتخاطب العقل والقيم الأخلاقية.'
			}
		]
	}
];
