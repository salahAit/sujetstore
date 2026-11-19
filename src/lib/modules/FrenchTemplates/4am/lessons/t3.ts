import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWordFormation,
	svgFrenchWritingBlueprint
} from '../../svg-french';

export const LESSONS_4AM_T3: FrenchInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// 1. La condition / hypothèse & l’opposition / concession (BEM)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_4am_t3_condition_opposition',
		slug: 'fre-4am-t3-condition-opposition',
		grade: '4am',
		yearSubjectId: 645,
		trimesterId: 't3',
		sequenceId: 'proj3',
		sequenceTitleAr: 'المشروع الثالث: حماية البيئة والسلامة المرورية والتحضير المكثّف للـ BEM (Environnement, civisme et BEM)',
		order: 1,
		titleAr: 'التعبير عن الشرط والاستدراك / المعارضة في BEM (Condition : si | Opposition : mais, bien que, malgré)',
		objectives: [
			'إتقان قاعدتي الشرط والفرضية مع (si): (Si + Présent -> Futur simple) و (Si + Imparfait -> Conditionnel présent)',
			'التمييز بين أدوات المعارضة والاستدراك: (mais, cependant) و (malgré + nom) و (bien que / quoique + subjonctif)'
		],
		keywordsAr: ['condition', 'hypothèse', 'si + présent', 'si + imparfait', 'opposition', 'bien que', 'malgré'],
		discover: {
			scenarioAr:
				'تأمّل الجملتين عن حماية البيئة: 1) « Si nous économisons l’eau aujourd’hui, nous préserverons notre avenir. » | 2) « Si chaque citoyen triait ses déchets, nos villes seraient beaucoup plus propres. » ثم تأمّل: 3) « Bien que l’eau soit vitale, certains continuent de la gaspiller. » لاحظ تناغم الأزمنة بدقة!',
			svg: svgFrenchGrammarMap({
				title: 'Condition et Opposition au BEM (4AM)',
				rootLabel: 'Deux rapports logiques décisifs du Trimestre 3',
				rootSub: 'Respecter impérativement la concordance des modes et des temps',
				branches: [
					{
						label: 'Si + Présent -> Futur',
						rule: 'Condition réalisable',
						example: 'Si tu plantes un arbre, il grandira.',
						color: '#1d4ed8'
					},
					{
						label: 'Si + Imparfait -> Cond.',
						rule: 'Hypothèse / souhait',
						example: 'Si on roulait moins vite, on éviterait l’accident.',
						color: '#047857'
					},
					{
						label: 'Opposition / Concession',
						rule: 'malgré (+ nom) | bien que (+ subj.)',
						example: 'Malgré la chaleur / Bien qu’il fasse chaud',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'في الجملة الأولى « Si nous économisons..., nous préserverons... »، ما الزمنان المستعملان بعد (Si) وفي جواب الشرط؟',
					hintAr: 'économisons في الحاضر، و préserverons في المستقبل.',
					expectedInput: 'Si + Présent de l’indicatif -> Futur simple (أو Impératif)',
					revealAr: 'قاعدة BEM الأولى للشرط: (Si + Présent -> Futur simple) للتعبير عن شرط ممكن التحقّق (condition réalisable)!'
				},
				{
					promptAr: 'وفي الجملة الثانية « Si chaque citoyen triait..., nos villes seraient... »، ما الزمنان المستعملان؟',
					hintAr: 'triait في الـ Imparfait، و seraient في الـ Conditionnel présent.',
					expectedInput: 'Si + Imparfait -> Conditionnel présent',
					revealAr: 'ممتاز! ولا نضع أبداً Futur ولا Conditionnel مباشرة بعد (Si) الشرطية! (La règle : « Les si n’aiment pas les -rai »).'
				},
				{
					promptAr: 'حوّل الجملة الثالثة من (Bien que + subjonctif) إلى جملة بسيطة باستعمال (Malgré + nom): « Bien que l’eau soit rare, on la gaspille. »',
					hintAr: 'حوّل الصفة (rare) إلى اسم (la rareté de l’eau).',
					expectedInput: 'Malgré la rareté de l’eau, on la gaspille.',
					revealAr: 'أحسنت! (Malgré) يتبعها دائماً اسم فقط (لا نكتب أبداً malgré que!)، بينما (Bien que / Quoique) يتبعهما جملة فعلها في الـ Subjonctif!'
				}
			]
		},
		summary: {
			rulesAr: [
				'قاعدتا الشرط والفرضية في BEM: 1) Si + Présent -> Futur simple (أو Présent / Impératif): « Si tu respectes le code de la route, tu protégeras des vies. » | 2) Si + Imparfait -> Conditionnel présent: « Si tout le monde protégeait la forêt, les incendies diminueraient. »',
				'قاعدة التحذير الكبرى: لا يأتي أبداً (Futur simple) ولا (Conditionnel) مباشرة بعد (Si) الشرطية! نقول « Si j’avais » وليس « Si j’aurais ».',
				'أداة الشرط البديلة بـ Subjonctif: (à condition que + subjonctif) مثل: « La forêt renaîtra à condition que nous la protégions »، ومع نفس الفاعل (à condition de + infinitif).',
				'المعارضة والاستدراك (L’opposition / La concession): 1) تنسيق (mais, cependant, pourtant, toutefois)، 2) جملة بسيطة (malgré / en dépit de + Nom)، 3) جملة فرعية (bien que / quoique + Subjonctif présent مثل: Bien que le plastique soit nocif, on l’utilise encore).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Les pièges évités au BEM : Condition & Opposition',
				subtitle: 'Trois règles d’or à retenir le jour de l’examen',
				columns: [
					{
						header: 'Jamais de -rai après Si',
						rule: 'Si + Présent / Imparfait',
						examples: 'Si nous agissions (PAS agirions), nous réussirions.',
						color: '#1d4ed8'
					},
					{
						header: 'Malgré + NOM',
						rule: 'Phrase simple (jamais « que »)',
						examples: 'Malgré les campagnes, certains polluent.',
						color: '#047857'
					},
					{
						header: 'Bien que + SUBJONCTIF',
						rule: 'Subordonnée d’opposition',
						examples: 'Bien que le danger soit réel, il roule vite.',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'الأخطاء الثلاثة القاتلة وكيفية تفاديها في أسئلة الشرط والمعارضة بالـ BEM',
			examples: [
				{
					problemAr: 'صرّف الفعلين بين قوسين: « Si les conducteurs (respecter) ...... la limitation de vitesse, les accidents (diminuer) ...... nettement. » (فرضية بـ Imparfait)',
					solutionAr: 'Si les conducteurs respectaient la limitation de vitesse, les accidents diminueraient nettement.'
				},
				{
					problemAr: 'حوّل من (mais) إلى (bien que): « L’énergie solaire est propre et gratuite, mais elle reste encore peu exploitée. »',
					solutionAr: 'Bien que l’énergie solaire soit propre et gratuite, elle reste encore peu exploitée.'
				}
			],
			watchOutAr:
				'في BEM انتبه لتفصيلين حاسمين: 1) عند تحويل جملة بـ (mais) إلى (bien que)، تصرف الفعل في الجملة الأولى في الـ Subjonctif وتحذف كلمة (mais)! 2) لا تكتب أبداً « malgré que » بل « malgré + nom » أو « bien que + subjonctif »!'
		},
		practice: [
			{
				questionAr: 'أكمل جملة الشرط بالتوافق الزمني السليم: « Si nous préservons le Barrage Vert, le désert ...... moins vite. »',
				options: ['avançait', 'avancera', 'avancerait', 'a avancé'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الماضي الناقص لا يطابق Si + Présent.',
					'ممتاز! Si + Présent (préservons) -> Futur simple (avancera).',
					'Conditionnel présent يأتي مع Si + Imparfait وليس Si + Présent.',
					'الماضي المركّب غير متوافق هنا.'
				],
				explanationAr: 'بعد (Si + Présent) يأتي جواب الشرط في المستقبل البسيط (Futur simple).'
			},
			{
				questionAr: 'أكمل جملة الفرضية: « Si chaque conducteur ...... sa ceinture de sécurité, de nombreuses vies seraient sauvées. »',
				options: ['attache', 'attachait', 'attachera', 'attacherait'],
				correctIndex: 1,
				diagnosticFeedback: [
					'جواب الشرط في Conditionnel (seraient sauvées) فيلزم Imparfait بعد Si.',
					'أحسنت! Si + Imparfait (attachait) -> Conditionnel présent (seraient sauvées).',
					'لا يأتي المستقبل أبداً بعد Si الشرطية.',
					'لا يأتي الشرطي أبداً بعد Si الشرطية.'
				],
				explanationAr: 'توافق الفرضية هو: Si + Imparfait -> Conditionnel présent.'
			},
			{
				questionAr: 'اختر التحويل الصحيح باستعمال (Bien que): « Le plastique pollue les mers, mais certains continuent à le jeter partout. »',
				options: [
					'Bien que le plastique pollue les mers, mais certains continuent à le jeter partout.',
					'Bien que le plastique pollue les mers, certains continuent à le jeter partout.',
					'Malgré que le plastique pollue les mers, certains continuent à le jeter.',
					'Bien que la pollution, certains continuent à jeter le plastique.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'يجب حذف كلمة (mais) عند استعمال (Bien que).',
					'ممتاز! Bien que + subjonctif (pollue) وحذفنا mais.',
					'عبارة (Malgré que) غير مقبولة في الفرنسية الفصيحة والـ BEM.',
					'Bien que يتبعها جملة بفعل مصرف وليس اسماً مفرداً.'
				],
				explanationAr: 'نستعمل Bien que + subjonctif ونحذف أداة التنسيق mais.'
			},
			{
				questionAr: 'اختر الإكمال الصحيح بـ (Malgré / Bien que): « ...... les campagnes de sensibilisation, des conducteurs dépassent encore la vitesse autorisée. »',
				options: ['Bien que', 'Quoique', 'Malgré', 'Parce que'],
				correctIndex: 2,
				diagnosticFeedback: [
					'بعد الفراغ يوجد اسم (les campagnes) وليس فعلاً مصرفاً.',
					'Quoique يتبعها جملة بفعل في subjonctif.',
					'صحيح! Malgré يتبعها دائماً مجموعة اسمية (les campagnes de sensibilisation).',
					'parce que للسبب ويتبعها فعل مصرف.'
				],
				explanationAr: 'قبل المجموعة الاسمية (les campagnes de sensibilisation) نستعمل حرف الجر (Malgré).'
			},
			{
				questionAr: 'أكمل بتصريف الـ Subjonctif بعد (Bien que): « Bien que cette forêt (être) ...... menacée par la sécheresse, les volontaires la reboisent. »',
				options: ['est', 'soit', 'sera', 'était'],
				correctIndex: 1,
				diagnosticFeedback: [
					'est حاضر إخباري، و Bien que توجب الـ Subjonctif.',
					'ممتاز! être في Subjonctif présent مع elle هو: soit.',
					'المستقبل خاطئ بعد Bien que.',
					'الماضي الناقص خاطئ بعد Bien que.'
				],
				explanationAr: 'بعد Bien que نصرف الفعل في الـ Subjonctif présent: soit.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 2. Le conditionnel présent et l’impératif présent (inciter à agir — BEM)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_4am_t3_conditionnel_imperatif',
		slug: 'fre-4am-t3-conditionnel-imperatif',
		grade: '4am',
		yearSubjectId: 645,
		trimesterId: 't3',
		sequenceId: 'proj3',
		sequenceTitleAr: 'المشروع الثالث: حماية البيئة والسلامة المرورية والتحضير المكثّف للـ BEM (Environnement, civisme et BEM)',
		order: 2,
		titleAr: 'الشرطي الحاضر وصيغة الأمر للحثّ على العمل (Conditionnel présent et Impératif présent)',
		objectives: [
			'صياغة الشرطي الحاضر (Conditionnel présent = radical du futur + terminaisons de l’imparfait) لإبداء النصيحة والفرضية والتمنّي',
			'تصريف الأفعال في صيغة الأمر الحاضر (Impératif présent) بدقة (خاصة حذف -s مع الفوج الأول) لتوجيه نداء بيئي أو مروري'
		],
		keywordsAr: ['conditionnel présent', 'impératif présent', 'inciter à agir', 'conseil', 'environnement'],
		discover: {
			scenarioAr:
				'اقرأ هذا النداء البيئي: « Protégeons nos forêts, économise chaque goutte d’eau et ne jetez jamais de plastique ! Si chacun agissait ainsi, notre pays deviendrait encore plus vert. » ما الفرق بين الأفعال الأولى (Protégeons, économise, ne jetez) والفعل الأخير (deviendrait)؟',
			svg: svgFrenchTenseTimeline({
				title: 'Conditionnel présent vs Impératif présent (BEM)',
				tenseName: 'Deux modes clés pour sensibiliser et inciter à agir',
				formula: 'Cond. = Radical Futur + (-ais,-ais,-ait,-ions,-iez,-aient) | Impératif = tu / nous / vous (sans pronom)',
				activeZone: 'future',
				example: 'Respectez le code de la route ! Vous devriez vérifier vos freins.',
				markers: 'Conseil, appel, hypothèse, souhait (devoir, pouvoir, falloir)'
			}),
			steps: [
				{
					promptAr: 'كيف نكوّن الشرطي الحاضر (Le conditionnel présent) للفعل (devenir) والفعل (pouvoir)؟',
					hintAr: 'نأخذ جذر المستقبل (deviendr- / pourr-) + نهايات الماضي الناقص (-ais, -ais, -ait, -ions, -iez, -aient)!',
					expectedInput: 'il deviendrait / nous pourrions (جذر المستقبل + نهايات Imparfait)',
					revealAr: 'ممتاز! لذلك الشرطي الحاضر سهل جداً إذا كنت تتقن جذر المستقبل البسيط: être (serais), avoir (aurais), faire (ferais), devoir (devrais), pouvoir (pourrais), falloir (il faudrait)!'
				},
				{
					promptAr: 'لماذا كتبنا (économise) بدون حرف (s) في صيغة الأمر مع (tu)، بينما نكتب (tu économises) في الحاضر؟',
					hintAr: 'قاعدة الفوج الأول (-er) في صيغة الأمر!',
					expectedInput: 'في الأمر مع (tu)، تحذف (-s) من جميع أفعال الفوج الأول (-er) وكذلك من (aller -> Va !)',
					revealAr: 'قاعدة BEM مشهورة جداً: Protège la nature ! (بلا s)، Économise l’eau ! (بلا s)، Va à l’école ! (بلا s). أما الفوج الثاني والثالث فتحتفظ بـ s (Finis ! Choisis ! Prends !).'
				},
				{
					promptAr: 'ما القيمة الأسلوبية (La valeur) للأمر في « Protégeons l’environnement ! » وللشرطي في « Nous devrions recycler le papier »؟',
					hintAr: 'الأمر يدعو مباشرة للفعل، والشرطي يقدّم نصيحة مهذّبة.',
					expectedInput: 'الأمر للحثّ والدعوة المباشرة (inciter / exhorter)، والشرطي للنصيحة والتخفيف (le conseil)',
					revealAr: 'أحسنت! هذان الأسلوبان هما سرّ الخاتمة المؤثرة في مواضيع البيئة والسلامة المرورية للـ BEM!'
				}
			]
		},
		summary: {
			rulesAr: [
				'الشرطي الحاضر (Le conditionnel présent): يتكوّن من جذر المستقبل البسيط (radical du futur) + نهايات الماضي الناقص (-ais, -ais, -ait, -ions, -iez, -aient). أمثلة: protéger -> je protégerais | finir -> nous finirions | être -> il serait | avoir -> ils auraient | devoir -> vous devriez | falloir -> il faudrait.',
				'أهم استعمالات الشرطي الحاضر في BEM: 1) جواب الشرط بعد (Si + Imparfait)، 2) النصيحة اللطيفة (Tu devrais respecter les piétons / Il faudrait planter des arbres)، 3) التمني (J’aimerais vivre dans une ville verte).',
				'الأمر الحاضر (L’impératif présent): يُصرّف فقط مع 3 أشخاص بدون ضمائر (tu / nous / vous). أمثلة: Protège ! / Protégeons ! / Protégez ! | Agis ! / Agissons ! / Agissez ! | Sois ! / Soyons ! / Soyez ! | Aie ! / Ayons ! / Ayez ! | Sache ! / Sachons ! / Sachez !',
				'قاعدة إملائية ذهبية في الأمر مع (tu): نحذف حرف (s) من أفعال الفوج الأول (-er) وفعل (aller -> Va !) وأفعال مثل (ouvrir -> Ouvre ! / offrir -> Offre !)، ولا تعود الـ s إلا أمام (en / y) مثل (Penses-y !).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Irréguliers essentiels : Conditionnel & Impératif (BEM)',
				subtitle: 'À connaître par cœur pour le 3e trimestre 4AM',
				columns: [
					{
						header: 'Conditionnel (il / nous)',
						rule: 'Futur + -ait / -ions',
						examples: 'serait / aurait / ferait / faudrait / devrions',
						color: '#1d4ed8'
					},
					{
						header: 'Impératif (1er gr. & aller)',
						rule: 'PAS de « s » avec « tu »',
						examples: 'Protège ! / Respecte ! / Va ! / Plante !',
						color: '#047857'
					},
					{
						header: 'Impératif irrégulier',
						rule: 'être / avoir / savoir',
						examples: 'Sois, Soyons, Soyez | Aie, Ayons | Sache, Sachons',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'الخلاصة المرجعية لتصريف الشرطي الحاضر والأمر الحاضر في شهادة التعليم المتوسط',
			examples: [
				{
					problemAr: 'حوّل إلى الأمر الحاضر مع الضمير (nous) ثم (tu): « Protéger les forêts et être vigilant sur la route. »',
					solutionAr: 'Avec nous : Protégeons les forêts et soyons vigilants sur la route ! | Avec tu : Protège les forêts et sois vigilant sur la route !'
				},
				{
					problemAr: 'صرّف في الشرطي الحاضر للنصيحة: « Les citoyens (devoir) ...... trier les déchets et il (falloir) ...... installer plus de bacs. »',
					solutionAr: 'devraient / faudrait.'
				}
			],
			watchOutAr:
				'فرّق بدقة بين (Futur simple : je protégerai — بدون s) و (Conditionnel présent : je protégerais — بـ s)! في الامتحان، إذا كان الشرط بـ (Si + Imparfait) نكتب الشرطي بـ (-ais)، وإذا كان بـ (Si + Présent) نكتب المستقبل بـ (-ai)!'
		},
		practice: [
			{
				questionAr: 'اختر التصريف الصحيح في صيغة الأمر مع (tu): « ...... l’eau potable et ...... prudent en traversant la route ! »',
				options: [
					'Économises / es',
					'Économise / sois',
					'Économise / est',
					'Économises / sois'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'تحذف الـ s من الفوج الأول في الأمر مع tu، وفعل être يصبح sois.',
					'ممتاز! Économise (بدون s) و sois (أمر être مع tu).',
					'est حاضر إخباري وليس صيغة أمر.',
					'يجب حذف الـ s من Économise مع tu.'
				],
				explanationAr: 'في الأمر مع tu: نحذف s من الفوج الأول (Économise) وأمر être هو (sois).'
			},
			{
				questionAr: 'صرّف الفعلين في الشرطي الحاضر: « Si nous utilisions l’énergie solaire, nous (réduire) ...... la pollution et l’air (être) ...... plus pur. »',
				options: [
					'réduirons / sera',
					'réduirions / serait',
					'réduisons / est',
					'réduisions / était'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه صيغ المستقبل البسيط، ولكن الشرط هنا في الـ Imparfait (utilisions).',
					'أحسنت! الشرطي الحاضر: réduirions (جذر المستقبل réduir + ions) و serait (ser + ait).',
					'هذه صيغ الحاضر الإخباري.',
					'هذه صيغ الماضي الناقص.'
				],
				explanationAr: 'بعد (Si + Imparfait) نستعمل Conditionnel présent: réduirions و serait.'
			},
			{
				questionAr: 'ما التصريف الصحيح للفعل (falloir) في الشرطي الحاضر لتقديم نصيحة في خاتمة نص بيئي؟',
				options: ['Il faut', 'Il faudra', 'Il faudrait', 'Il fallait'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Il faut في الحاضر الإخباري.',
					'Il faudra في المستقبل البسيط.',
					'ممتاز! Il faudrait (جذر faudr- + ait) مثالية لتقديم النصيحة بالشرطي الحاضر.',
					'Il fallait في الماضي الناقص.'
				],
				explanationAr: 'الشرطي الحاضر من falloir هو: Il faudrait.'
			},
			{
				questionAr: 'اختر صيغة الأمر السليمة مع الضمير (vous) للفعلين (avoir) و (savoir): « ...... du respect pour la nature et ...... que chaque geste compte ! »',
				options: ['Avez / savez', 'Ayez / sachez', 'Ayons / sachons', 'Aie / sache'],
				correctIndex: 1,
				diagnosticFeedback: [
					'Avez و savez صيغ الحاضر الإخباري وليست أمرًا.',
					'صحيح! أمر avoir مع vous هو Ayez، وأمر savoir هو Sachez.',
					'Ayons و sachons للضمير nous.',
					'Aie و sache للضمير tu.'
				],
				explanationAr: 'الأفعال الشاذة avoir و savoir تأخذ في الأمر مع vous: Ayez ! Sachez !'
			},
			{
				questionAr: 'ما القيمة الدلالية للأمر في الشعار: « Plantons des arbres pour sauver notre terre ! »؟',
				options: [
					'الحثّ والدعوة الجماعية للعمل البيئي (Exhorter / inciter à agir)',
					'سرد حدث وقع في القرن الماضي',
					'التعبير عن الندم',
					'طرح سؤال علمي'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! الأمر مع (nous) يُشرك الكاتب والقارئ معاً في نداء إيجابي للعمل.',
					'لا علاقة له بالماضي.',
					'لا يعبّر عن الندم.',
					'ليست جملة استفهامية.'
				],
				explanationAr: 'الأمر بصيغة (nous) يُستعمل بقوة في نصوص BEM البيئية للحثّ الجماعي على العمل.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 3. Famille de mots, préfixes/suffixes & visée communicative (BEM)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_4am_t3_famille_mots_visee',
		slug: 'fre-4am-t3-famille-mots-visee',
		grade: '4am',
		yearSubjectId: 645,
		trimesterId: 't3',
		sequenceId: 'proj3',
		sequenceTitleAr: 'المشروع الثالث: حماية البيئة والسلامة المرورية والتحضير المكثّف للـ BEM (Environnement, civisme et BEM)',
		order: 3,
		titleAr: 'عائلة الكلمات، السوابق واللواحق، والغرض التواصلي للكاتب (Affixes et visée communicative — BEM)',
		objectives: [
			'تكوين المتضادات بالسوابق (préfixes d’antonymie : in-, im-, il-, ir-, dé-, mal-, mé-) وبناء عائلات الكلمات باللواحق (-tion, -ment, -able, -eur)',
			'الإجابة المنهجية السليمة عن السؤال الكلاسيكي في شهادة التعليم المتوسط: « Quelle est la visée communicative de l’auteur ? »'
		],
		keywordsAr: ['visée communicative', 'préfixes', 'suffixes', 'antonymes', 'famille de mots', 'BEM'],
		discover: {
			scenarioAr:
				'تأمّل كلمتين من نص حول السلامة المرورية: « prudent -> imprudent » و « responsable -> irresponsable ». ثم اقرأ السؤال المكرّر كل عام تقريباً في الـ BEM: « Quelle est la visée communicative de l’auteur ? » كيف نُجيب عن السؤالين بدقة متناهية؟',
			svg: svgFrenchWordFormation({
				title: 'Formation des antonymes et dérivés au BEM (4AM)',
				prefix: 'ir-',
				root: 'respons',
				suffix: '-able',
				derivedWord: 'irresponsable',
				meaningNote: 'in- devient im- (devant b, m, p), il- (devant l), ir- (devant r)'
			}),
			steps: [
				{
					promptAr: 'لماذا استعملنا السابقة (im-) مع (prudent -> imprudent) والسابقة (ir-) مع (responsable -> irresponsable)؟',
					hintAr: 'انظر إلى الحرف الأول من كل كلمة أصلية (p و r).',
					expectedInput: 'السابقة in- تتحول إلى im- قبل (m, b, p)، وإلى ir- قبل (r)، وإلى il- قبل (l)',
					revealAr: 'قاعدة إملائية ممتازة في BEM: impossible, imprudent, immobile (قبل m/b/p) | illégal, illisible (قبل l) | irréel, irresponsable (قبل r)!'
				},
				{
					promptAr: 'ما المقصود بالسؤال الكلاسيكي في شهادة التعليم المتوسط: « Quelle est la visée communicative de l’auteur ? »؟',
					hintAr: 'الكلمة (visée) تعني الهدف/الغاية من كتابة النص!',
					expectedInput: 'الهدف التواصلي الذي يسعى إليه الكاتب من نصه (إقناع، توعية، تثمين، حثّ على عمل...)',
					revealAr: 'ممتاز! الإجابة النموذجية تبدأ دائماً بفعل في المصدر مثل: « Convaincre le lecteur de... / Sensibiliser les citoyens à... / Inciter les lecteurs à... »'
				},
				{
					promptAr: 'ماذا نكتب كـ (Visée communicative) في نص عن حماية الماء، ونص عن تراث الجزائر، ونص عن التضامن؟',
					hintAr: 'اربط بين الفعل المناسب (convaincre / sensibiliser / valoriser / inciter) وموضوع النص.',
					expectedInput: 'توعية وحثّ على حماية الماء | تثمين تراث الجزائر وحثّ على زيارته | الإقناع بأهمية التضامن',
					revealAr: 'أحسنت! سؤال الـ Visée communicative شبه مضمون كل سنة في BEM، وحفظ صياغته يمنحك نقطة كاملة بسهولة!'
				}
			]
		},
		summary: {
			rulesAr: [
				'سوابق الضد (Les préfixes d’antonymie): 1) in- (injuste, inutile)، وتتحول إلى im- قبل b/m/p (imprudent, impossible)، و il- قبل l (illégal)، و ir- قبل r (irresponsable) | 2) dé- / dés- (détruire, désobéir, désordre) | 3) mal- / mé- (malhonnête, mécontent).',
				'أشهر اللواحق (Les suffixes): للاسم (-tion, -ation, -ment, -age, -té, -eur: pollution, reboisement, sécurité) | للصفة (-able, -ible, -eux, -al: recyclable, dangereux, écologique) | للظرف (-ment: prudemment, écologiquement).',
				'الهدف التواصلي للكاتب (La visée communicative de l’auteur): هو الجواب عن سؤال « Pourquoi l’auteur a-t-il écrit ce texte ? ». في نصوص 4AM الحجاجية، تكون الغاية دائماً إقناعية وتوعوية (visée argumentative).',
				'صيغ جاهزة للإجابة عن الـ Visée في BEM: 1) نص عن التراث الجزائري: « Convaincre le lecteur de la beauté du patrimoine algérien et l’inciter à le visiter et le préserver. » | 2) نص عن التضامن/الأخلاق: « Convaincre de l’importance de la solidarité (ou du respect) et lutter contre les fléaux sociaux. » | 3) نص عن البيئة/المرور: « Sensibiliser les citoyens aux dangers de la pollution (ou des accidents) et les inciter à agir de manière responsable. »'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Répondre en 1 phrase parfaite à la Visée (BEM)',
				rootLabel: 'Formule BEM : [Verbe à l’infinitif] + [Destinataire] + [Thème]',
				rootSub: 'Ex. : Sensibiliser les citoyens à la nécessité de préserver l’eau potable',
				branches: [
					{
						label: 'Projet 1 (Patrimoine)',
						rule: 'Valoriser & inciter à visiter',
						example: 'Convaincre de la richesse de l’Algérie',
						color: '#1d4ed8'
					},
					{
						label: 'Projet 2 (Solidarité)',
						rule: 'Défendre une valeur / dénoncer',
						example: 'Encourager la Touiza / lutter contre le gaspillage',
						color: '#047857'
					},
					{
						label: 'Projet 3 (Environnement)',
						rule: 'Sensibiliser & appeler à agir',
						example: 'Inciter à protéger les forêts et la route',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'القالب الجاهز للإجابة الدقيقة عن سؤال الغرض التواصلي (Visée communicative) في BEM',
			examples: [
				{
					problemAr: 'كوّن أضداد الكلمات باستعمال سابقة مناسبة: (respectueux / possible / légal / obéir).',
					solutionAr: 'irrespectueux / impossible / illégal / désobéir.'
				},
				{
					problemAr: 'حدّد الغرض التواصلي (La visée) لنص حجاجي حول مخاطر السرعة المفرطة في الطريق.',
					solutionAr: 'La visée communicative de l’auteur est de sensibiliser les conducteurs aux dangers de l’excès de vitesse et de les inciter à respecter le code de la route.'
				}
			],
			watchOutAr:
				'في سؤال (Quelle est la visée communicative de l’auteur ?)، لا تكتب فقط كلمة « Informer » إذا كان النص حجاجياً (Argumentatif)! اكتب « Argumenter / Convaincre / Sensibiliser / Inciter à... » مع تحديد موضوع النص بدقة!'
		},
		practice: [
			{
				questionAr: 'ما الضدّ الصحيح للكلمات الثلاث باستعمال السوابق المناسبة: (prudent / responsable / légal)؟',
				options: [
					'inprudent / inresponsable / inlégal',
					'imprudent / irresponsable / illégal',
					'déprudent / malresponsable / délégale',
					'méprudent / irresponsable / imlégal'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'تتغير in- إلى im- قبل p، وإلى ir- قبل r، وإلى il- قبل l.',
					'ممتاز! imprudent / irresponsable / illégal مضبوطة 100%.',
					'السوابق المختارة هنا غير صحيحة.',
					'im- لا توضع قبل l بل il-.'
				],
				explanationAr: 'القاعدة الإملائية للسابقة in-: تصبح im- قبل (m,b,p)، و ir- قبل (r)، و il- قبل (l).'
			},
			{
				questionAr: 'ما الإجابة الأدق عن سؤال « Quelle est la visée communicative de l’auteur ? » لنص حجاجي حول اقتصاد الماء؟',
				options: [
					'Raconter un voyage imaginaire dans l’espace.',
					'Sensibiliser les lecteurs à la valeur de l’eau et les inciter à l’économiser.',
					'Donner une liste de noms de rivières sans avis.',
					'Expliquer une recette de pâtisserie.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خارج الموضوع ونمط النص.',
					'أحسنت! تجمع بين التوعية (sensibiliser) والحثّ على التصرف الإيجابي (inciter à l’économiser).',
					'النص الحجاجي لا يكتفي بسرد قائمة محايدة.',
					'خارج الموضوع.'
				],
				explanationAr: 'الغاية التواصلية لنص حجاجي بيئي هي التوعية (sensibiliser) والإقناع والحثّ على العمل (inciter).'
			},
			{
				questionAr: 'ما الصفة المشتقة من الفعل (recycler) التي تعني « قابل لإعادة التدوير »؟',
				options: ['recyclage', 'recyclable', 'recycleur', 'recyclément'],
				correctIndex: 1,
				diagnosticFeedback: [
					'recyclage اسم (Nom) وليس صفة.',
					'ممتاز! اللاحقة (-able) تكوّن صفة تفيد القابلية: un déchet recyclable.',
					'recycleur اسم فاعل/آلة.',
					'كلمة غير صحيحة.'
				],
				explanationAr: 'اللاحقة (-able) تعني القابلية: recycler -> recyclable (مثل boire -> potable، renouveler -> renouvelable).'
			},
			{
				questionAr: 'ما ضدّ الفعل (respecter) وما ضدّ الصفة (honnête) باستعمال السوابق؟',
				options: [
					'irrespectueux (للصفة) / malhonnête',
					'inrespecter / déshonnête',
					'dérespecter / irhonnête',
					'malrespecter / ilhonnête'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! ضد respectueux هو irrespectueux، وضد honnête هو malhonnête.',
					'لا نقول inrespecter ولا déshonnête.',
					'سوابق خاطئة.',
					'سوابق خاطئة.'
				],
				explanationAr: 'نكوّن الأضداد بالسوابق الدقيقة: respectueux -> irrespectueux، و honnête -> malhonnête.'
			},
			{
				questionAr: 'أيّ عائلة كلمات صحيحة بالكامل (Verbe / Nom / Adjectif) لموضوع البيئة؟',
				options: [
					'polluer / la pollution / polluant (pollué)',
					'protéger / la protègement / protégé',
					'nettoyer / la nettoiation / net',
					'économiser / l’économation / économique'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! polluer / la pollution / polluant (pollué) عائلة سليمة 100%.',
					'الاسم من protéger هو protection.',
					'الاسم من nettoyer هو nettoyage.',
					'الاسم من économiser هو économie.'
				],
				explanationAr: 'العائلة الصحيحة هي: polluer / la pollution / polluant / pollué.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 4. Synthèse complète de la grammaire et conjugaison du BEM (4AM)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_4am_t3_synthese_grammaire_bem',
		slug: 'fre-4am-t3-synthese-grammaire-bem',
		grade: '4am',
		yearSubjectId: 645,
		trimesterId: 't3',
		sequenceId: 'proj3',
		sequenceTitleAr: 'المشروع الثالث: حماية البيئة والسلامة المرورية والتحضير المكثّف للـ BEM (Environnement, civisme et BEM)',
		order: 4,
		titleAr: 'المراجعة الشاملة لقواعد شهادة التعليم المتوسط (Synthèse : rapports logiques, modes et accords BEM)',
		objectives: [
			'التمييز السريع بين جميع الجمل الفرعية المقررة في 4AM (Relative, Complétive, Cause, Conséquence, But, Condition, Opposition)',
			'إتقان جدول الأوضاع والأزمنة (Indicatif / Subjonctif / Conditionnel / Impératif) والتحويل بين الجملة المركّبة والبسيطة'
		],
		keywordsAr: ['révision BEM', 'rapports logiques', 'subordonnées', 'modes verbaux', 'phrase simple / complexe'],
		discover: {
			scenarioAr:
				'في اختبار شهادة التعليم المتوسط، قد تجد في تمرين واحد (6 نقاط): تحديد علاقة منطقية، تحويل جملة مركّبة إلى بسيطة، تصريف فعلين في وضعين مختلفين، وتحويل إلى الخطاب غير المباشر. دعنا نجمع خريطة قواعد السنة الرابعة متوسط كلها في لوحة واحدة واضحة!',
			svg: svgFrenchGrammarMap({
				title: 'Panorama complet des subordonnées du BEM (4AM)',
				rootLabel: 'Les 7 propositions subordonnées à reconnaître immédiatement',
				rootSub: 'Repérer l’introducteur + le mode du verbe subordonné',
				branches: [
					{
						label: 'Relative / Complétive',
						rule: 'Nom+que vs Verbe+que',
						example: 'le site que j’aime | je sais qu’il est beau',
						color: '#1d4ed8'
					},
					{
						label: 'Cause / Conséquence',
						rule: 'parce que / si bien que (+ Ind.)',
						example: 'grâce à (+) | à cause de (-) | donc',
						color: '#047857'
					},
					{
						label: 'But / Opposition',
						rule: 'pour que / bien que (+ Subj.)',
						example: 'afin de (+ inf.) | malgré (+ nom)',
						color: '#b45309'
					},
					{
						label: 'Condition (Hypothèse)',
						rule: 'Si + Prés->Fut | Si + Imp->Cond',
						example: 'à condition que (+ Subj.)',
						color: '#7c3aed'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الأداتان اللتان تتطلّبان دائماً (Subjonctif présent) في الجمل الظرفية (Circonstancielles) في BEM؟',
					hintAr: 'واحدة للهدف والأخرى للاستدراك/المعارضة (مع أداة شرط إضافية).',
					expectedInput: 'pour que / afin que (الهدف) و bien que / quoique (المعارضة) و à condition que (الشرط)',
					revealAr: 'ممتاز! بمجرد أن ترى (pour que / afin que / bien que / quoique / il faut que) في سؤال التصريف، صرّف الفعل مباشرة في الـ Subjonctif présent!'
				},
				{
					promptAr: 'كيف نحول جملة مركّبة (Phrase complexe) إلى جملة بسيطة (Phrase simple) في السبب والمعارضة والهدف؟',
					hintAr: 'نحذف الفعل الثاني المصرف ونحوّله إلى اسم أو مصدر!',
					expectedInput: 'parce que -> grâce à / à cause de + nom | bien que -> malgré + nom | pour que -> pour / afin de + infinitif',
					revealAr: 'رائع! هذا الجدول الثلاثي يحلّ أصعب سؤال في قواعد اللغة بشهادة التعليم المتوسط في ثوانٍ!'
				},
				{
					promptAr: 'ما التغيير الذي يقع عند تحويل: « Le maire a affirmé : “Nous protégerons la forêt.” » إلى الخطاب غير المباشر؟',
					hintAr: 'فعل القول في الماضي (a affirmé) والفعل الداخلي في المستقبل (protégerons).',
					expectedInput: 'Le maire a affirmé qu’ils protégeraient la forêt. (Futur -> Conditionnel présent)',
					revealAr: 'أحسنت! مراجعة واحدة منظّمة تجمع كل قواعد الفصول الثلاثة في ذاكرتك بثبات.'
				}
			]
		},
		summary: {
			rulesAr: [
				'خريطة الأوضاع الفعلية في BEM: 1) Indicatif بعد (parce que, puisque, si bien que, penser que)، 2) Subjonctif بعد (il faut que, pour que, afin que, bien que, quoique, à condition que)، 3) Conditionnel بعد (Si + Imparfait)، 4) Impératif للحثّ والدعوة المباشرة.',
				'خريطة التحويل (Complexe -> Simple): 1) السبب: parce que + verbe -> grâce à / à cause de + nom | 2) الهدف: pour que + subjonctif -> pour / afin de + infinitif (عند تطابق الفاعل) أو + nom | 3) المعارضة: bien que + subjonctif -> malgré + nom.',
				'مراجعة التوافق الإملائي (Accords): 1) الصفة تتبع الاسم، 2) الفعل يتبع الفاعل (même inversé أو بعيد)، 3) اسم المفعول يتبع الفاعل مع être، ويتبع الـ COD السابق فقط مع avoir.',
				'تذكير حاسم بالتمييز: (Nom + que = Relative) | (Verbe + que = Complétive) | (si + Présent -> Futur) | (si + Imparfait -> Conditionnel).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Table de transformation Complexe -> Simple (BEM)',
				subtitle: 'Remplacer la proposition subordonnée par un groupe nominal ou infinitif',
				columns: [
					{
						header: 'Cause',
						rule: 'parce que -> grâce à / à cause de',
						examples: 'parce qu’il est prudent -> grâce à sa prudence',
						color: '#1d4ed8'
					},
					{
						header: 'But',
						rule: 'pour que -> pour / afin de',
						examples: 'pour que la forêt vive -> pour la vie de la forêt',
						color: '#047857'
					},
					{
						header: 'Opposition',
						rule: 'bien que -> malgré + nom',
						examples: 'bien qu’il pleuve -> malgré la pluie',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'الجدول الذهبي لتحويل الجمل المركّبة إلى جمل بسيطة يوم امتحان شهادة التعليم المتوسط',
			examples: [
				{
					problemAr: 'حدّد العلاقة المنطقية في الجمل الثلاث: a) Bien qu’il soit tard, ils terminent le nettoyage. | b) Si tu tries les déchets, tu aides la nature. | c) L’air est pollué, donc la santé est menacée.',
					solutionAr: 'a) Opposition / concession | b) Condition / hypothèse | c) Conséquence.'
				},
				{
					problemAr: 'حوّل إلى جملة بسيطة: « Les volontaires continuent de planter des arbres bien que le vent soit fort. »',
					solutionAr: 'Les volontaires continuent de planter des arbres malgré le vent fort (أو malgré la force du vent).'
				}
			],
			watchOutAr:
				'في سؤال التحويل إلى جملة بسيطة (Phrase simple)، تأكّد بعد الكتابة من أن الجملة الجديدة تحتوي على فعل مصرف واحد فقط! إذا بقي فعلان مصرفان فهي لا تزال مركّبة!'
		},
		practice: [
			{
				questionAr: 'حوّل الجملة المركّبة إلى جملة بسيطة (Phrase simple): « Nous préservons le parc bien que les moyens soient limités. »',
				options: [
					'Nous préservons le parc malgré que les moyens soient limités.',
					'Nous préservons le parc malgré les moyens limités.',
					'Nous préservons le parc mais les moyens sont limités.',
					'Nous préservons le parc parce que les moyens sont limités.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'malgré que خاطئة وتترك فعلين مصرفين.',
					'ممتاز! فعل مصرف واحد فقط (préservons) + malgré + مجموعة اسمية (les moyens limités).',
					'بقي فعلان مصرفان (préservons / sont) فهي مركّبة.',
					'غيّرت العلاقة إلى سبب وتركت فعلين مصرفين.'
				],
				explanationAr: 'تحويل (bien que + subjonctif) إلى جملة بسيطة يكون بـ (malgré + groupe nominal).'
			},
			{
				questionAr: 'ما الجملة التي تتطلب تصريف الفعل بين قوسين في الـ Subjonctif présent؟',
				options: [
					'Je pense que la sécurité routière (être) ...... essentielle.',
					'Il faut que chaque citoyen (être) ...... responsable.',
					'Si nous (être) ...... prudents, nous éviterons les accidents.',
					'Elle affirme que l’eau (être) ...... une richesse.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'بعد Je pense que في الإثبات نستعمل Indicatif (est).',
					'أحسنت! Il faut que توجب الـ Subjonctif présent (soit).',
					'بعد Si الشرطية نستعمل Indicatif (sommes / étions).',
					'بعد affirme que نستعمل Indicatif (est).'
				],
				explanationAr: 'العبارة (Il faut que) توجب دائماً استعمال الـ Subjonctif présent.'
			},
			{
				questionAr: 'حدّد العلاقة المنطقية في الجملة: « Les arbres absorbent le gaz carbonique ; par conséquent, les forêts purifient l’air. »',
				options: ['La cause', 'La conséquence', 'Le but', 'La condition'],
				correctIndex: 1,
				diagnosticFeedback: [
					'تقية الهواء نتيجة وليس سبباً.',
					'ممتاز! par conséquent أداة نتيجة مرادفة لـ donc.',
					'لا تعبر عن الهدف.',
					'لا تعبر عن الشرط.'
				],
				explanationAr: 'الرابط (par conséquent) يعبّر عن النتيجة (La conséquence).'
			},
			{
				questionAr: 'اختر التحويل السليم إلى الخطاب غير المباشر: « Le garde forestier nous a prévenus : “Ne faites jamais de feu ici !” »',
				options: [
					'Le garde forestier nous a prévenus de ne jamais faire de feu là-bas.',
					'Le garde forestier nous a prévenus que nous ne faisons pas de feu ici.',
					'Le garde forestier nous a prévenus si nous faisons du feu.',
					'Le garde forestier nous a prévenus ne faites jamais de feu.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! الأمر المنفي يصبح (de ne jamais + infinitif) و ici تصبح là-bas.',
					'الأمر يتحول إلى de + infinitif وليس que + présent.',
					'si للاستفهام لا للأمر.',
					'ينقصها أداة الربط والتحويل إلى المصدر.'
				],
				explanationAr: 'الأمر المنفي في الخطاب غير المباشر يصبح: de ne pas / de ne jamais + infinitif، و ici تصبح là-bas.'
			},
			{
				questionAr: 'أيّ ثنائية (أداة / علاقة منطقية) غير صحيحة؟',
				options: [
					'grâce à -> cause positive',
					'si bien que -> conséquence',
					'afin que -> but',
					'malgré -> condition'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'صحيحة (grâce à للسبب الإيجابي).',
					'صحيحة (si bien que للنتيجة).',
					'صحيحة (afin que للهدف).',
					'ممتاز! malgré تعبّر عن المعارضة/الاستدراك (Opposition/Concession) وليس الشرط!'
				],
				explanationAr: 'malgré هي أداة معارضة/استدراك (Opposition/Concession) وليست أداة شرط.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 5. Méthodologie complète du BEM de Français (13 pts + 7 pts = 20/20)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_4am_t3_methodologie_bem',
		slug: 'fre-4am-t3-methodologie-bem',
		grade: '4am',
		yearSubjectId: 645,
		trimesterId: 't3',
		sequenceId: 'proj3',
		sequenceTitleAr: 'المشروع الثالث: حماية البيئة والسلامة المرورية والتحضير المكثّف للـ BEM (Environnement, civisme et BEM)',
		order: 5,
		titleAr: 'منهجية النجاح الكامل في امتحان شهادة التعليم المتوسط للغة الفرنسية (Méthodologie du BEM : 13 + 7 = 20)',
		objectives: [
			'تنظيم وقت الامتحان الرسمي (ساعتان — معامل 3) بذكاء بين الفهم وقواعد اللغة (13 نقطة) والوضعية الإدماجية (7 نقاط)',
			'تطبيق استراتيجية قراءة النص والإجابة الدقيقة عن الأسئلة النمطية في BEM وتحرير نص حجاجي نموذجي من 12 إلى 15 سطراً'
		],
		keywordsAr: ['méthodologie BEM', 'gestion du temps', 'compréhension 13 pts', 'production écrite 7 pts', 'réussir BEM'],
		discover: {
			scenarioAr:
				'في يوم امتحان شهادة التعليم المتوسط للغة الفرنسية (المدة: ساعتان — المعامل: 3)، يملك التلميذ 120 دقيقة لحصد أكبر عدد ممكن من النقاط في جزأين: الجزء الأول (Compréhension de l’écrit : 13 pts = فهم 7 + قواعد 6) والجزء الثاني (Situation d’intégration : 7 pts). كيف تستثمر كل دقيقة بلا توتر؟',
			svg: svgFrenchWritingBlueprint({
				title: 'Gestion optimale des 120 minutes du BEM de Français',
				steps: [
					{ stage: '0 - 15 min : Lecture', detail: 'Lire le texte 2 fois + titre, source, lexique ; repérer thème et thèse.' },
					{ stage: '15 - 65 min : Partie I', detail: 'Répondre aux questions de Compréhension (7 pts) et Langue (6 pts).' },
					{ stage: '65 - 105 min : Partie II', detail: 'Brouillon + rédaction propre du texte argumentatif (12-15 lig., 7 pts).' },
					{ stage: '105 - 120 min : Relecture', detail: 'Vérifier accords, subjonctif, ponctuation, propreté et numérotation.' }
				]
			}),
			steps: [
				{
					promptAr: 'ما أول خطوة تقوم بها قبل قراءة الأسئلة عند استلام ورقة امتحان الـ BEM؟',
					hintAr: 'تأمّل النص كاملاً مع العنوان والمصدر والمعجم.',
					expectedInput: 'قراءة النص مرتين بتأنٍ مع العنوان والمصدر والـ Lexique وتحديد الموضوع والأطروحة',
					revealAr: 'ممتاز! قراءة العنوان والمصدر والـ Lexique تعطيك 50% من فهم النص قبل أن تصل إلى السؤال الأول!'
				},
				{
					promptAr: 'كم دقيقة ينبغي تخصيصها على الأقل للوضعية الإدماجية (7 نقاط) مع المسوّدة والتبييض والمراجعة؟',
					hintAr: 'تمثل 7 نقاط من 20 (أكثر من ثلث العلامة الكاملة!).',
					expectedInput: 'من 40 إلى 45 دقيقة (مسوّدة + تحرير منظّم + مراجعة)',
					revealAr: 'إهمال الوقت للوضعية الإدماجية خطأ شائع! خصّص لها 40 دقيقة كاملة و15 دقيقة للمراجعة النهائية للورقة كلها.'
				},
				{
					promptAr: 'ما أضمن طريقة لتفادي الخروج عن الموضوع (Hors-sujet) في الإنتاج الكتابي يوم الـ BEM؟',
					hintAr: 'اقرأ السند (Contexte) والتعليمة (Consigne) وسطّر الكلمات المفتاحية.',
					expectedInput: 'تسطير الكلمات المفتاحية في Consigne (النمط الحجاجي، الموضوع، المخاطَب، عدد الحجج والأسطر)',
					revealAr: 'أحسنت! تأكّد دائماً من: 1) نوع النص المطلوب (texte argumentatif)، 2) الموضوع الدقيق، 3) عدد الحجج (3 arguments)، 4) الموارد اللغوية المطلوبة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'بنية امتحان شهادة التعليم المتوسط (BEM — Durée : 02 h 00 — Coeff. : 3): الجزء الأول (13 نقطة) يجمع Compréhension (7 pts: موضوع، أطروحة، أسئلة فهم، صحيح/خطأ، عائد الضمير، معجم، غرض تواصلي) + Fonctionnement de la langue (6 pts: علاقات منطقية، تحويل بسيط/مركب، خطاب منقول، تصريف، توافق). الجزء الثاني (7 نقاط): Production écrite (نص حجاجي 12–15 سطراً).',
				'قواعد الإجابة الذهبية في الجزء الأول (13/13): 1) لا تنسخ فقرة كاملة بل أجب بجملة دقيقة مختصرة، 2) في (Vrai / Faux) أعد قراءة النفي والأرقام في النص، 3) في سؤال التصريف حدّد الأداة التي تسبق الفعل أولاً (Si / bien que / pour que / il faut que).',
				'قواعد الإجابة الذهبية في الجزء الثاني (7/7): عنوان جذاب + مقدمة بأطروحة واضحة + عرض فيه 3 حجج مرتّبة بـ (D’abord, Ensuite, Enfin) مع أمثلة ملموسة + خاتمة تحفيزية توظّف (C’est pourquoi / Il faut que + subjonctif / Impératif).',
				'المراجعة النهائية (آخر 15 دقيقة): افحص الحروف الكبيرة (Majuscules)، النقاط والفواصل، توافق الصفة والفعل واسم المفعول، وتأكّد من عدم ترك أي سؤال فارغاً!'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Barème détaillé du BEM de Français (20 / 20)',
				rootLabel: 'Objectif Excellence au BEM (Coeff. 3)',
				rootSub: 'Chaque point compte : méthodologie + rigueur linguistique',
				branches: [
					{
						label: 'Compréhension (7 pts)',
						rule: 'Thème, thèse, Vrai/Faux, visée',
						example: 'Réponses précises et justifiées',
						color: '#1d4ed8'
					},
					{
						label: 'Langue (6 pts)',
						rule: 'Logique, discours, modes, accords',
						example: 'Zéro faute de conjugaison/accord',
						color: '#047857'
					},
					{
						label: 'Production (7 pts)',
						rule: 'Texte argumentatif 12-15 lignes',
						example: 'Thèse + 3 arguments + exemples + appel',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'خارطة توزيع النقاط في امتحان شهادة التعليم المتوسط للغة الفرنسية (معامل 3)',
			examples: [
				{
					problemAr: 'كيف تجيب بدقة عن سؤال BEM: « Proposez un autre titre au texte »؟',
					solutionAr: 'أصوغ عنواناً اسمياً قصيراً يعكس الموضوع والأطروحة دون نسخ العنوان الأصلي (مثال: « Protégeons l’eau, source de vie ! »).'
				},
				{
					problemAr: 'صُغ جملة ختامية قوية تصلح لموضوع بيئي أو سلامة مرورية في BEM.',
					solutionAr: 'En conclusion, il est urgent que chacun agisse avec responsabilité : respectons la nature (ou le code de la route) afin que notre avenir soit plus sûr !'
				}
			],
			watchOutAr:
				'احذر أبداً من ترك الوضعية الإدماجية فارغة أو نسخ نص الفهم فيها! المصحّح يقيّم مجهودك الشخصي بـ 7 نقاط كاملة؛ حتى لو كانت جملك بسيطة وواضحة ومنظمة في ثلاث فقرات ستحصد علامة ممتازة!'
		},
		practice: [
			{
				questionAr: 'ما هو معامل (Coefficient) ومدّة امتحان اللغة الفرنسية في شهادة التعليم المتوسط (BEM)؟',
				options: ['المعامل 1 — ساعة واحدة', 'المعامل 2 — ساعة ونصف', 'المعامل 3 — ساعتان (02 h 00)', 'المعامل 5 — ثلاث ساعات'],
				correctIndex: 2,
				diagnosticFeedback: [
					'هذا التوقيت يخص الابتدائي أو 1AM.',
					'المعامل 2 يخص 2AM و 3AM.',
					'ممتاز! في شهادة التعليم المتوسط (4AM BEM)، المعامل 3 والمدة ساعتان.',
					'المعامل 5 يخص شعبة اللغات الأجنبية في الثانوي.'
				],
				explanationAr: 'في امتحان BEM الرسمي، اللغة الفرنسية معاملها 3 ومدتها ساعتان (02 h 00).'
			},
			{
				questionAr: 'كيف يُوزّع التنقيط الرسمي على 20 في اختبار اللغة الفرنسية للـ BEM؟',
				options: [
					'10 فهم + 10 إنتاج كتابي',
					'13 فهم المكتوب وقواعد اللغة (7 + 6) + 7 إنتاج كتابي',
					'15 فهم وقواعد + 5 إنتاج كتابي',
					'8 فهم + 4 قواعد + 8 إنتاج كتابي'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ليس 10 + 10.',
					'أحسنت! 7 نقاط فهم + 6 نقاط قواعد لغة (= 13) + 7 نقاط للوضعية الإدماجية = 20 نقطة.',
					'الوضعية الإدماجية بـ 7 نقاط وليس 5.',
					'التوزيع الرسمي هو 7 + 6 + 7.'
				],
				explanationAr: 'مجموع النقاط في BEM الفرنسية: 7 (فهم) + 6 (قواعد لغة) + 7 (إنتاج كتابي) = 20.'
			},
			{
				questionAr: 'ماذا تفعل في سؤال « Justifiez votre réponse par une phrase du texte »؟',
				options: [
					'تخترع جملة غير موجودة في النص',
					'تستخرج الجملة الدالة بدقة من النص وتضعها بين مزدوجتين (« ... »)',
					'تكتب كلمة Oui فقط دون تبرير',
					'تنسخ النص بأكمله من أوله إلى آخره'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'المطلوب تبرير مأخوذ من النص نفسه.',
					'ممتاز! تستخرج الجملة الدقيقة المناسبة وتضعها بين مزدوجتين.',
					'الإجابة دون تبرير تفقدك نصف أو كامل النقطة.',
					'نسخ النص كاملاً يدل على عدم القدرة على تحديد المعلومة.'
				],
				explanationAr: 'التبرير من النص يتطلب نقل الجملة المحددة الدالة بدقة بين مزدوجتين.'
			},
			{
				questionAr: 'ما أفضل توزيع زمني لآخر 15 دقيقة من امتحان شهادة التعليم المتوسط (BEM)؟',
				options: [
					'تسليم الورقة فوراً دون مراجعة',
					'مراجعة جميع الإجابات وتوافق الصفات والأفعال والـ Subjonctif وعلامات الترقيم وترقيم الأسئلة',
					'تمزيق المسوّدة قبل نقل الإنتاج الكتابي',
					'تغيير موضوع الوضعية الإدماجية بالكامل في الدقيقة الأخيرة'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'التسرع في التسليم يضيّع نقاطاً سهلة يمكن إنقاذها بالمراجعة.',
					'ممتاز! 15 دقيقة للمراجعة الدقيقة تنقذ غالباً نقطتين إلى ثلاث نقاط إملائية ونحوية.',
					'لا تُمزّق المسودة قبل إتمام التبييض ومراجعته.',
					'إعادة الكتابة الكاملة في آخر 15 دقيقة مخاطرة غير محسوبة.'
				],
				explanationAr: 'المراجعة المنهجية في آخر 15 دقيقة تصحّح هفوات التوافق والتصريف والترقيم.'
			},
			{
				questionAr: 'أيّ عنوان مقترح يناسب نصاً حجاجياً يدعو لتجنّب حوادث المرور في الجزائر؟',
				options: [
					'La sécurité routière : une responsabilité collective',
					'Les oiseaux migrateurs du Sahara',
					'Ma journée à la bibliothèque',
					'Les recettes traditionnelles de l’hiver'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! عنوان اسمي قصير ومباشر يعكس موضوع وأطروحة النص.',
					'خارج الموضوع تماماً.',
					'خارج الموضوع تماماً.',
					'خارج الموضوع تماماً.'
				],
				explanationAr: 'العنوان المقترح يجب أن يكون مختصراً ومعبّراً بدقة عن محور النص الحجاجي.'
			}
		]
	}
];
