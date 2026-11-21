import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchWritingBlueprint
} from '../../svg-french';
import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';

// ===============================================================================
// Interactive Lessons - 5AP French - Trimester 3
// Projet 3 (Catastrophes naturelles & Métiers qui sauvent)
// + Projet 4 (Protégeons la nature) + Évaluation des Acquis 5AP
// ===============================================================================

export const LESSONS_5AP_T3: FrenchInteractiveLessonData[] = [
	// ---------------------------------------------------------------------------
	// Lesson 1: Le lexique des catastrophes naturelles et des secouristes
	// ---------------------------------------------------------------------------
	{
		id: 'fre_lesson_5ap_t3_catastrophes_secouristes',
		slug: 'fre-5ap-t3-catastrophes-secouristes',
		grade: '5ap',
		yearSubjectId: 607,
		trimesterId: 't3',
		sequenceId: 'projet3_4',
		sequenceTitleAr: 'المشروعان الثالث والرابع: الكوارث الطبيعية وحماية البيئة والتحضير لتقييم المكتسبات 5AP',
		order: 1,
		titleAr: 'معجم الكوارث الطبيعية والمهن المنقذة (Catastrophes naturelles et métiers qui sauvent)',
		objectives: [
			'تسمية أبرز الكوارث الطبيعية بالفرنسية (séisme, inondation, incendie de forêt, sécheresse).',
			'التعرف على المهن المنقذة للأرواح ودورها (les pompiers, la Protection civile, les médecins, les secouristes).',
			'ربط كل مهنة منقذة بوسائل عملها وأفعالها الأساسية (éteindre, secourir, soigner, protéger).'
		],
		keywordsAr: ['الكوارث الطبيعية', 'catastrophes naturelles', 'Protection civile', 'pompiers', 'médecins', 'secouristes'],
		discover: {
			scenarioAr:
				'عند وقوع حريق غابة أو فيضان أو زلزال، يتدخل أبطال الحماية المدنية والأطباء بسرعة وشجاعة: «En cas d’incendie, les pompiers de la Protection civile arrivent avec le camion-citerne pour éteindre le feu. Les médecins et les secouristes soignent les blessés.»',
			svg: renderLessonIllustration('pri_lang_05_professions_tools', {
				lang: 'fr',
				title: 'Les métiers qui sauvent et servent notre communauté (5AP)',
				customLegend: [
					{ num: '1', label: 'Le médecin et les secouristes : stéthoscope et trousse de secours' },
					{ num: '2', label: 'Le pompier de la Protection civile : casque rouge et lance à eau' },
					{ num: '3', label: 'Le boulanger : le pain chaud quotidien' },
					{ num: '4', label: "L'enseignant(e) : transmettre le savoir et les consignes de sécurité" }
				]
			}),
			steps: [
				{
					promptAr: 'من يتدخل لإطفاء الحريق (éteindre le feu) باستعمال شاحنة الصهريج (le camion-citerne)؟',
					hintAr: 'ابحث عن مهنة رجال الإطفاء في الجملة الأولى.',
					expectedInput: 'les pompiers',
					revealAr: 'إنهم رجال الإطفاء وأعوان الحماية المدنية (les pompiers de la Protection civile).'
				},
				{
					promptAr: 'ماذا يفعل الأطباء والمسعفون (les médecins et les secouristes) في موقع الكارثة؟',
					hintAr: 'انظر إلى الفعل في الجملة الثانية.',
					expectedInput: 'soignent les blessés',
					revealAr: 'إنهم يسعفون ويعالجون الجرحى (ils soignent les blessés) باستعمال سيارة الإسعاف وحقيبة الإسعافات.'
				},
				{
					promptAr: 'ما اسم «الزلزال» و«الفيضان» باللغة الفرنسية؟',
					hintAr: 'الزلزال: un séisme / tremblement de terre، والفيضان يبدأ بـ inond...',
					expectedInput: 'séisme et inondation',
					revealAr: 'الزلزال هو «un séisme» (أو un tremblement de terre)، والفيضان هو «une inondation».'
				}
			]
		},
		summary: {
			rulesAr: [
				'أهم الكوارث الطبيعية (les catastrophes naturelles): الزلزال (un séisme / un tremblement de terre)، الفيضان (une inondation)، حريق الغابة (un incendie de forêt)، الجفاف (une sécheresse).',
				'أبطال الإنقاذ (les métiers qui sauvent): رجال الحماية المدنية والإطفاء (les pompiers / agents de la Protection civile)، الأطباء (les médecins)، الممرضون (les infirmiers)، المسعفون (les secouristes).',
				'وسائل عملهم: شاحنة الإطفاء (le camion-citerne)، الخوذة (le casque)، خرطوم الماء (la lance à eau)، سيارة الإسعاف (l’ambulance)، حقيبة الإسعاف (la trousse de secours).',
				'الأفعال الدالة على عملهم: éteindre le feu (يطفئ النار)، secourir les victimes (ينقذ الضحايا)، soigner les blessés (يعالج الجرحى)، protéger les citoyens (يحمي المواطنين).'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Catastrophes naturelles et secours',
				rootLabel: 'Face au danger : agir vite et avec courage',
				rootSub: 'ترابط الكارثة الطبيعية مع جهود الإنقاذ',
				branches: [
					{ label: 'Incendie', rule: 'Feu de forêt', example: 'Les pompiers éteignent le feu.', color: '#b45309' },
					{ label: 'Inondation', rule: 'Pluies abondantes', example: 'La Protection civile évacue.', color: '#1d4ed8' },
					{ label: 'Séisme', rule: 'Tremblement de terre', example: 'Les secouristes aident.', color: '#7c3aed' },
					{ label: 'Soins', rule: 'Médecins et infirmiers', example: 'Ils soignent les blessés.', color: '#047857' }
				]
			}),
			visualCaptionAr: 'المعجم الوظيفي للكوارث الطبيعية والمهن المنقذة في السنة الخامسة',
			examples: [
				{
					problemAr: 'صل بين المهنة ودورها: 1) Le pompier — 2) Le médecin.',
					solutionAr: '1) Le pompier éteint l’incendie et sauve les habitants. 2) Le médecin soigne les blessés.'
				},
				{
					problemAr: 'اذكر سلوكين وقائيين عند وقوع زلزال بالفرنسية.',
					solutionAr: '1) Garder son calme. 2) S’éloigner des fenêtres et écouter les consignes des secouristes.'
				}
			],
			watchOutAr:
				'انتبه للفرق بين الكلمتين: «un incendie» تعني حريقاً (للمذكر)، بينما «une inondation» تعني فيضاناً (للمؤنث)!'
		},
		practice: [
			{
				questionAr: 'Quelle catastrophe naturelle correspond à un grand feu qui détruit les arbres ?',
				options: ['Une inondation', 'Un incendie de forêt', 'Un séisme', 'Une chute de neige'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الفيضان (inondation) ناتج عن كثرة المياه لا النار.',
					'أحسنت! حريق الغابة هو «un incendie de forêt».',
					'الزلزال (séisme) اهتزاز للأرض.',
					'تساقط الثلوج ليس ناراً.'
				],
				explanationAr: 'Un grand feu dans la forêt s’appelle «un incendie de forêt».'
			},
			{
				questionAr: 'Qui intervient avec un camion-citerne et un casque pour éteindre le feu ?',
				options: ['Le boulanger', 'Le jardinier', 'Le pompier', 'Le libraire'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الخباز (boulanger) يصنع الخبز.',
					'البستاني (jardinier) يعتني بالحديقة.',
					'ممتاز! رجل الإطفاء (le pompier) هو الذي يطفئ الحرائق بشاحنة الصهريج.',
					'صاحب المكتبة يبيع الكتب.'
				],
				explanationAr: 'Le pompier de la Protection civile utilise le camion-citerne et le casque pour éteindre l’incendie.'
			},
			{
				questionAr: 'Quel est le rôle principal du médecin urgentiste après une catastrophe ?',
				options: [
					'Construire des ponts',
					'Soigner les blessés',
					'Cultiver des légumes',
					'Conduire un train'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'بناء الجسور عمل المهندس.',
					'أحسنت! الطبيب يسعف ويعالج الجرحى (soigner les blessés).',
					'زراعة الخضر عمل الفلاح.',
					'قيادة القطار ليست دور الطبيب.'
				],
				explanationAr: 'Le médecin urgentiste examine et soigne les personnes blessées.'
			},
			{
				questionAr: 'Quel mot est un synonyme de «tremblement de terre» ?',
				options: ['Inondation', 'Sécheresse', 'Séisme', 'Orage'],
				correctIndex: 2,
				diagnosticFeedback: [
					'inondation تعني فيضاناً.',
					'sécheresse تعني جفافاً.',
					'ممتاز! «séisme» مرادف لـ «tremblement de terre» (زلزال).',
					'orage تعني عاصفة رعدية.'
				],
				explanationAr: '«Un séisme» est le synonyme exact de «un tremblement de terre».'
			},
			{
				questionAr: 'Quel matériel utilisent les secouristes pour transporter rapidement un blessé à l’hôpital ?',
				options: ['Une ambulance', 'Un tableau noir', 'Un panier', 'Une bicyclette'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! سيارة الإسعاف (l’ambulance) تنقل المصاب بسرعة إلى المستشفى.',
					'السبورة أداة مدرسية.',
					'السلة ليست وسيلة نقل طبي.',
					'الدراجة لا تُستعمل لنقل المصابين في الطوارئ.'
				],
				explanationAr: 'L’ambulance transporte rapidement les blessés vers l’hôpital.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 2: L'expression de la cause (parce que, car) et du but (pour)
	// ---------------------------------------------------------------------------
	{
		id: 'fre_lesson_5ap_t3_cause_et_but',
		slug: 'fre-5ap-t3-cause-et-but',
		grade: '5ap',
		yearSubjectId: 607,
		trimesterId: 't3',
		sequenceId: 'projet3_4',
		sequenceTitleAr: 'المشروعان الثالث والرابع: الكوارث الطبيعية وحماية البيئة والتحضير لتقييم المكتسبات 5AP',
		order: 2,
		titleAr: 'التعبير عن السبب والغاية (L’expression de la cause et du but)',
		objectives: [
			'التعبير عن السبب (la cause) باستعمال «parce que / parce qu’» و«car».',
			'التعبير عن الغاية أو الهدف (le but) باستعمال «pour» متبوعاً بفعل في المصدر (infinitif).',
			'الربط السليم بين جملتين بسيطتين للتعبير عن سبب أو غاية.'
		],
		keywordsAr: ['السبب', 'الغاية', 'cause', 'but', 'parce que', 'car', 'pour'],
		discover: {
			scenarioAr:
				'تأمّل هاتين الجملتين من نص حول حماية الطبيعة: 1) «Nous plantons des arbres parce qu’ils donnent de l’air pur.» 2) «Nous fermons le robinet pour économiser l’eau.» لاحظ أداة الربط وما يأتي بعدها في كل جملة.',
			svg: svgFrenchGrammarMap({
				title: 'Cause vs But en français (5AP)',
				rootLabel: 'Relier deux idées avec précision',
				rootSub: 'الفرق الدقيق بين السبب (Pourquoi ?) والغاية (Dans quel but ?)',
				branches: [
					{ label: 'La cause (parce que)', rule: 'Explique la raison + verbe conjugué', example: 'parce qu’il y a un feu', color: '#1d4ed8' },
					{ label: 'La cause (car)', rule: 'Exprime aussi la raison', example: 'car l’eau est précieuse', color: '#047857' },
					{ label: 'Le but (pour)', rule: 'Exprime l’objectif + INFINITIF', example: 'pour protéger la forêt', color: '#b45309' }
				]
			}),
			steps: [
				{
					promptAr: 'في الجملة الأولى، ما الأداة التي أوضحت «سبب» غرس الأشجار؟',
					hintAr: 'جاءت قبل «ils donnent de l’air pur».',
					expectedInput: 'parce qu’',
					revealAr: 'استعملنا «parce qu’» (أصلها parce que قبل حرف العلة i) للتعبير عن السبب (la cause).'
				},
				{
					promptAr: 'في الجملة الثانية، ما الكلمة التي دلّت على الغاية (الهدف) من غلق الحنفية؟',
					hintAr: 'كلمة قصيرة من 4 حروف قبل الفعل économiser.',
					expectedInput: 'pour',
					revealAr: 'استعملنا «pour» للتعبير عن الغاية (le but): pour économiser l’eau.'
				},
				{
					promptAr: 'هل الفعل «économiser» بعد «pour» مصرّف أم في المصدر (infinitif)؟',
					hintAr: 'انظر إلى نهايته (-er).',
					expectedInput: 'في المصدر',
					revealAr: 'بعد «pour» يكون الفعل دائماً في المصدر (à l’infinitif): pour économiser, pour sauver, pour protéger.'
				}
			]
		},
		summary: {
			rulesAr: [
				'التعبير عن السبب (la cause) يجيب عن السؤال «Pourquoi ?» (لماذا؟)، ونستعمل له أداتي الربط «parce que» (أو «parce qu’» أمام حرف علة) و«car».',
				'بعد «parce que» و«car» تأتي جملة كاملة فيها فاعل وفعل مصرّف: «Les pompiers courent vite car le feu menace les maisons.».',
				'التعبير عن الغاية (le but) يجيب عن السؤال «Dans quel but ? / Pourquoi faire ?» (لأي هدف؟)، ونستعمل له حرف الجر «pour» متبوعاً بفعل في المصدر (infinitif) أو باسم.',
				'مثال للجمع بينهما: «Nous protégeons la forêt (parce qu’elle est utile)» [سبب]، و«Nous plantons des arbres (pour protéger la nature)» [غاية].'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Choisir : parce que / car / pour',
				subtitle: 'كيف أختار الأداة الصحيحة في الاختبار؟',
				columns: [
					{ header: 'parce que / qu’', rule: 'Cause + sujet + verbe conjugué', examples: 'parce qu’elle donne de l’ombre', color: '#1d4ed8' },
					{ header: 'car', rule: 'Cause (jamais au début)', examples: 'car l’eau est source de vie', color: '#047857' },
					{ header: 'pour', rule: 'But + verbe à l’INFINITIF', examples: 'pour sauver les blessés', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'القاعدة المختصرة للتمييز بين أدوات السبب (parce que, car) وأداة الغاية (pour)',
			examples: [
				{
					problemAr: 'اربط بين الجملتين بأداة سبب (parce que أو car): Il ne faut pas gaspiller l’eau. Elle est précieuse.',
					solutionAr: 'Il ne faut pas gaspiller l’eau parce qu’elle est précieuse. (أو : car elle est précieuse.)'
				},
				{
					problemAr: 'أكمل بأداة الغاية المناسبة: Les élèves nettoient la cour ............ garder l’école propre.',
					solutionAr: 'Les élèves nettoient la cour pour garder l’école propre.'
				}
			],
			watchOutAr:
				'انتبه! نكتب «parce qu’» مع فاصلة عليا قبل حروف العلة (a, e, i, o, u, h muet): «parce qu’il», «parce qu’elle», «parce qu’on». ولا نضع «car» في بداية الجملة أبداً!'
		},
		practice: [
			{
				questionAr: 'Complète avec le bon connecteur : Les pompiers utilisent beaucoup d’eau ............ éteindre l’incendie.',
				options: ['parce que', 'car', 'pour', 'mais'],
				correctIndex: 2,
				diagnosticFeedback: [
					'parce que يأتي بعدها فاعل وفعل مصرّف، وهنا لدينا مصدر (éteindre).',
					'car يأتي بعدها جملة كاملة لا فعل في المصدر.',
					'أحسنت! «pour» + فعل في المصدر (éteindre) تعبّر عن الغاية (le but).',
					'mais للتعارض لا للغاية.'
				],
				explanationAr: 'Devant un verbe à l’infinitif exprimant un objectif («éteindre»), on emploie «pour».'
			},
			{
				questionAr: 'Complète avec le bon connecteur : Nous aimons les arbres ............ ils purifient l’air.',
				options: ['pour', 'car', 'à', 'de'],
				correctIndex: 1,
				diagnosticFeedback: [
					'pour لا يتبعها فاعل وفعل مصرّف (ils purifient).',
					'ممتاز! «car» تربط النتيجة بالسبب ويتبعها فاعل وفعل مصرّف.',
					'à حرف جر لا يربط بين جملتين سببيتين.',
					'de حرف جر لا يعبّر عن السبب هنا.'
				],
				explanationAr: '«ils purifient l’air» explique la raison (la cause) avec un sujet et un verbe conjugué : on utilise «car».'
			},
			{
				questionAr: 'Dans «Le médecin court pour sauver le blessé», le groupe «pour sauver le blessé» exprime :',
				options: ['le temps (CCT)', 'le lieu (CCL)', 'le but', 'la cause'],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا يحدد الزمان.',
					'لا يحدد المكان.',
					'أحسنت! «pour + infinitif» يعبّر عن الغاية (le but).',
					'السبب يُعبّر عنه بـ car أو parce que.'
				],
				explanationAr: '«pour sauver le blessé» répond à la question «Dans quel but ?» : c’est l’expression du but.'
			},
			{
				questionAr: 'Choisis l’écriture correcte devant «elle» :',
				options: [
					'parce que elle est utile',
					'parce qu’elle est utile',
					'pour elle est utile',
					'car qu’elle est utile'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'يجب حذف e من que قبل حرف العلة e في elle.',
					'ممتاز! نكتب «parce qu’elle est utile» بإدغام que أمام حرف العلة.',
					'لا نضع pour قبل جملة مصرف فعلها.',
					'لا نجمع بين car و qu’.'
				],
				explanationAr: 'Devant une voyelle, «parce que» s’élide en «parce qu’» : parce qu’elle.'
			},
			{
				questionAr: 'Complète la phrase correctement : Nous jetons les déchets dans la poubelle pour ............ le quartier propre.',
				options: ['gardons', 'gardé', 'garder', 'gardez'],
				correctIndex: 2,
				diagnosticFeedback: [
					'بعد pour لا نصرّف الفعل.',
					'gardé اسم مفعول، والمطلوب فعل في المصدر.',
					'أحسنت! بعد «pour» نضع الفعل في المصدر (infinitif): pour garder.',
					'gardez مصرّف مع vous.'
				],
				explanationAr: 'Après la préposition «pour», le verbe se met toujours à l’infinitif : garder.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 3: Le futur simple et l'impératif présent (conseils écologiques)
	// ---------------------------------------------------------------------------
	{
		id: 'fre_lesson_5ap_t3_futur_imperatif_ecologie',
		slug: 'fre-5ap-t3-futur-imperatif-ecologie',
		grade: '5ap',
		yearSubjectId: 607,
		trimesterId: 't3',
		sequenceId: 'projet3_4',
		sequenceTitleAr: 'المشروعان الثالث والرابع: الكوارث الطبيعية وحماية البيئة والتحضير لتقييم المكتسبات 5AP',
		order: 3,
		titleAr: 'المستقبل البسيط وفعل الأمر لتقديم نصائح بيئية (Le futur simple et l’impératif présent)',
		objectives: [
			'تصريف أفعال المجموعتين الأولى والثانية وفعلي être و avoir في المستقبل البسيط (le futur simple).',
			'تصريف الأفعال في الأمر الحاضر (l’impératif présent) مع الضمائر الثلاثة (tu, nous, vous) دون كتابتها.',
			'تقديم نصائح بيئية واضحة لحماية الماء والغابة (Protégeons l’eau ! Plante un arbre !).'
		],
		keywordsAr: ['المستقبل البسيط', 'الأمر الحاضر', 'futur simple', 'impératif présent', 'Protégeons la nature'],
		discover: {
			scenarioAr:
				'في يوم التشجير، قال المعلم: «Demain, nous planterons des arbres et la cour sera belle ! Maintenant, écoutez ces conseils : Ferme le robinet ! Protégeons l’eau ! Gardez la forêt propre !» تأمّل الفرق بين أفعال المستقبل وأفعال النصيحة.',
			svg: renderLessonIllustration('pri_lang_07_clean_park_planting', {
				lang: 'fr',
				title: 'Projet 4 : Futur simple et Impératif présent — Protégeons la nature !',
				customLegend: [
					{ num: '1', label: 'Demain, nous planterons un arbre / Plante un arbre !' },
					{ num: '2', label: "Arrosons les fleurs le soir pour économiser l'eau !" },
					{ num: '3', label: 'Jette toujours les déchets dans la poubelle !' }
				]
			}),
			steps: [
				{
					promptAr: 'كيف كوّنّا الفعل «planterons» في المستقبل البسيط مع الضمير «nous»؟',
					hintAr: 'احتفظنا بالمصدر planter وأضفنا نهاية في آخره.',
					expectedInput: 'planter + ons',
					revealAr: 'احتفظنا بالمصدر الكامل «planter» وأضفنا نهاية المستقبل «ons» فأصبح: nous planterons.'
				},
				{
					promptAr: 'انظر إلى جمل النصيحة: «Ferme le robinet ! Protégeons l’eau ! Gardez la forêt propre !». هل كُتبت ضمائر الفاعل (tu, nous, vous) قبل الأفعال؟',
					hintAr: 'اقرأ أول كلمة في كل نصيحة.',
					expectedInput: 'لا',
					revealAr: 'لا! فعل الأمر (l’impératif présent) يُصرّف مع 3 أشخاص فقط (المخاطب، المتكلمون، المخاطبون) دون كتابة ضمير الفاعل.'
				},
				{
					promptAr: 'لاحظ الفعل «Ferme» (المجموعة الأولى مع tu في الأمر). هل انتهى بحرف «s»؟',
					hintAr: 'قارن بين المضارع (Tu fermes) والأمر (Ferme !).',
					expectedInput: 'لا',
					revealAr: 'لا! في الأمر الحاضر مع أفعال المجموعة الأولى (-er) نحذف حرف «s» مع المفرد المخاطب: Ferme ! Plante ! Protège !.'
				}
			]
		},
		summary: {
			rulesAr: [
				'المستقبل البسيط (le futur simple) يعبر عن حدث سيقع مستقبلاً (demain, bientôt, la semaine prochaine). لأفعال المجموعتين الأولى والثانية نضع المصدر كاملاً + (-ai, -as, -a, -ons, -ez, -ont): «je planterai, tu finiras, nous protégerons».',
				'تصريف être و avoir في المستقبل البسيط: être (je serai, tu seras, il sera, nous serons, vous serez, ils seront) و avoir (j’aurai, tu auras, il aura, nous aurons, vous aurez, ils auront).',
				'الأمر الحاضر (l’impératif présent) يُستعمل لإعطاء نصائح وأوامر بيئية، ولا يُكتب معه ضمير الفاعل. يُصرّف في 3 صيغ فقط: «Protège ! Protégeons ! Protégez !».',
				'قاعدة إملائية مهمة في الأمر: أفعال المجموعة الأولى (-er) لا تأخذ «s» في المفرد المخاطب: «Ferme le robinet !» (وليس Fermes)، أما أفعال المجموعة الثانية فتحتفظ بـ «s»: «Choisis ! Finis !».'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Futur simple & Impératif présent',
				subtitle: 'زمنا التخطيط والنصائح البيئية (المشروع الرابع)',
				columns: [
					{ header: 'Futur (1er / 2e gr.)', rule: 'Infinitif + ai,as,a,ons,ez,ont', examples: 'je planterai / ils finiront', color: '#1d4ed8' },
					{ header: 'Futur (être / avoir)', rule: 'ser- / aur- + terminaisons', examples: 'elle sera / nous aurons', color: '#047857' },
					{ header: 'Impératif présent', rule: 'Sans pronom (pas de -s au 1er gr.)', examples: 'Ferme ! Protégeons ! Gardez !', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'ملخص تصريف المستقبل البسيط والأمر الحاضر في السنة الخامسة',
			examples: [
				{
					problemAr: 'صرّف في المستقبل البسيط: Demain, les élèves (planter) des arbres et l’école (être) plus verte.',
					solutionAr: 'Demain, les élèves planteront des arbres et l’école sera plus verte.'
				},
				{
					problemAr: 'حوّل إلى الأمر الحاضر لتقديم نصيحة: 1) Tu fermes le robinet. 2) Nous protégeons la nature.',
					solutionAr: '1) Ferme le robinet ! (بحذف s). 2) Protégeons la nature !'
				}
			],
			watchOutAr:
				'احذر خطأ شائعاً في الأمر! نكتب «Économise l’eau !» و«Plante un arbre !» بدون حرف «s» في النهاية لأنها أفعال من المجموعة الأولى (-er).'
		},
		practice: [
			{
				questionAr: 'Conjugue au futur simple : Demain, nous ............ (protéger) les jeunes arbres.',
				options: ['protégeons', 'protégerons', 'protégions', 'avons protégé'],
				correctIndex: 1,
				diagnosticFeedback: [
					'protégeons في المضارع، وكلمة Demain تدل على المستقبل.',
					'أحسنت! المصدر protéger + نهاية المستقبل ons = nous protégerons.',
					'protégions في الماضي الناقص.',
					'avons protégé في الماضي المركب.'
				],
				explanationAr: 'Au futur simple avec «nous», on ajoute «-ons» à l’infinitif : nous protégerons.'
			},
			{
				questionAr: 'Conjugue au futur simple : Bientôt, notre quartier ............ (être) très propre.',
				options: ['est', 'était', 'sera', 'aura'],
				correctIndex: 2,
				diagnosticFeedback: [
					'est في المضارع.',
					'était في الماضي الناقص.',
					'ممتاز! تصريف «être» في المستقبل مع il (notre quartier) هو «sera».',
					'aura من الفعل avoir لا être.'
				],
				explanationAr: 'Le verbe «être» au futur simple à la 3e personne du singulier est «sera».'
			},
			{
				questionAr: 'Transforme à l’impératif présent (2e pers. sing.) : Tu fermes bien le robinet.',
				options: ['Fermes bien le robinet !', 'Ferme bien le robinet !', 'Fermez bien le robinet !', 'Fermons bien le robinet !'],
				correctIndex: 1,
				diagnosticFeedback: [
					'في الأمر نحذف حرف s من أفعال المجموعة الأولى مع المفرد المخاطب.',
					'أحسنت! Ferme bien le robinet ! (بلا ضمير وبلا s).',
					'Fermez للجمع المخاطب (vous).',
					'Fermons للمتكلمين (nous).'
				],
				explanationAr: 'À l’impératif présent, les verbes du 1er groupe ne prennent pas de «s» à la 2e personne du singulier : Ferme !'
			},
			{
				questionAr: 'Choisis le conseil écologique bien conjugué à l’impératif (avec «nous») :',
				options: [
					'Nous protégeons la forêt !',
					'Protégeons la forêt !',
					'Protégez la forêt !',
					'Protègerons la forêt !'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'في صيغة الأمر لا نكتب ضمير الفاعل Nous.',
					'ممتاز! «Protégeons la forêt !» أمر حاضر صحيح للمتكلمين.',
					'Protégez للمخاطبين (vous) وليس nous.',
					'Protègerons مستقبل بسيط وليس أمراً.'
				],
				explanationAr: 'L’impératif présent s’emploie sans pronom sujet : Protégeons la forêt !'
			},
			{
				questionAr: 'Conjugue au futur simple : Les arbres ............ (grandir) grâce à l’eau de pluie.',
				options: ['grandissent', 'grandiront', 'grandissaient', 'ont grandi'],
				correctIndex: 1,
				diagnosticFeedback: [
					'grandissent في المضارع.',
					'أحسنت! المصدر grandir + ont (مع ils) = grandiront.',
					'grandissaient في الماضي الناقص.',
					'ont grandi في الماضي المركب.'
				],
				explanationAr: '«grandir» (2e groupe) au futur simple avec «ils» donne : grandiront.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 4: L'imparfait de l'indicatif et les familles de mots (préfixes/suffixes)
	// ---------------------------------------------------------------------------
	{
		id: 'fre_lesson_5ap_t3_imparfait_familles_mots',
		slug: 'fre-5ap-t3-imparfait-familles-mots',
		grade: '5ap',
		yearSubjectId: 607,
		trimesterId: 't3',
		sequenceId: 'projet3_4',
		sequenceTitleAr: 'المشروعان الثالث والرابع: الكوارث الطبيعية وحماية البيئة والتحضير لتقييم المكتسبات 5AP',
		order: 4,
		titleAr: 'الماضي الناقص وعائلات الكلمات (L’imparfait de l’indicatif et les familles de mots)',
		objectives: [
			'تصريف أفعال المجموعتين الأولى والثانية وفعلي être و avoir في الماضي الناقص (l’imparfait).',
			'تمييز جذر الكلمة (le radical) وتكوين عائلة كلمات (une famille de mots).',
			'استعمال السوابق (préfixes) واللواحق (suffixes) لتكوين الأضداد أو الأسماء.'
		],
		keywordsAr: ['الماضي الناقص', 'imparfait', 'famille de mots', 'préfixe', 'suffixe', 'radical'],
		discover: {
			scenarioAr:
				'اقرأ هذا المقطع الوصفي في الماضي: «Autrefois, la forêt était verte et les oiseaux chantaient. Après l’incendie, les élèves ont décidé de replanter des arbres pour assurer la protection de la nature.» لاحظ نهايات أفعال الماضي الناقص والكلمات المشتقة (replanter, protection).',
			svg: renderLessonIllustration('pri_lang_03_weather_icons_quad', {
				lang: 'fr',
				title: "Décrire le temps et les saisons à l'imparfait et familles de mots",
				customLegend: [
					{ num: '1', label: 'Le soleil brillait (soleil -> ensoleillé)' },
					{ num: '2', label: "La pluie tombait sur la forêt (pluie -> pluvieux)" },
					{ num: '3', label: 'La neige couvrait les sommets (neige -> enneigé)' },
					{ num: '4', label: 'Le vent soufflait en automne (vent -> venteux)' }
				]
			}),
			steps: [
				{
					promptAr: 'ما النهايتان اللتان أُضيفتا للفعلين في «la forêt était» و«les oiseaux chantaient»؟',
					hintAr: 'انظر إلى آخر 3 أحرف في était وآخر 5 أحرف في chantaient.',
					expectedInput: 'ait et aient',
					revealAr: '«ait» للمفرد الغائب و«aient» للجمع الغائب، وهما من نهايات الماضي الناقص (l’imparfait).'
				},
				{
					promptAr: 'في كلمة «replanter»، ما السابقة (le préfixe) التي أُضيفت قبل الفعل «planter» وما معناها؟',
					hintAr: 'حرفان في بداية الكلمة يدلان على إعادة الغرس.',
					expectedInput: 're',
					revealAr: 'السابقة «re-» تعني الإعادة والتكرار: replanter = غرس الأشجار من جديد.'
				},
				{
					promptAr: 'من أي فعل اشتُقّت كلمة «protection»؟ وما الجذر المشترك بينهما؟',
					hintAr: 'الفعل هو protéger، وابحث عن الحروف المشتركة في البداية.',
					expectedInput: 'protéger (prot-)',
					revealAr: 'كلمة «protection» من عائلة الفعل «protéger» (protéger, protection, protecteur) وكلها تشترك في الجذر والمعنى.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الماضي الناقص (l’imparfait) يُستعمل للوصف في الماضي أو العادات الماضية (autrefois, avant)، وله نهايات ثابتة لكل الأفعال: -ais, -ais, -ait, -ions, -iez, -aient.',
				'المجموعة الأولى: «je plantais, il protégeait, nous arrosions». المجموعة الثانية نضيف فيها «iss» قبل النهاية: «la nature verdissait, nous finissions». فعلا être و avoir: «j’étais, il était» و«j’avais, ils avaient».',
				'عائلة الكلمات (la famille de mots) مجموعة كلمات لها نفس الجذر (le radical) وتشترك في المعنى: «terre -> terrestre, enterrer»؛ «forêt -> forestier, reboisement (bois)»؛ «sauver -> sauvetage, sauveteur».',
				'السابقة (le préfixe) توضع قبل الجذر (غالباً للتكرار «re-» أو الضد «in-, im-, mal-, dé-»: propre / malpropre, possible / impossible)، واللاحقة (le suffixe) توضع بعد الجذر (غالباً لتكوين اسم أو مهنة: «-tion, -age, -eur, -té»: protéger -> protection, propre -> propreté).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'L’imparfait de l’indicatif (5AP)',
				subtitle: 'نهايات موحّدة لجميع الأفعال: -ais, -ais, -ait, -ions, -iez, -aient',
				columns: [
					{ header: '1er groupe', rule: 'Radical + ais/ait/aient', examples: 'il plantait / ils arrosaient', color: '#1d4ed8' },
					{ header: '2e groupe', rule: 'Radical + iss + terminaisons', examples: 'elle verdissait / nous finissions', color: '#047857' },
					{ header: 'être / avoir', rule: 'ét- / av- + terminaisons', examples: 'j’étais / ils avaient', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'تصريف المجموعتين الأولى والثانية وفعلي être و avoir في الماضي الناقص',
			examples: [
				{
					problemAr: 'صرّف في الماضي الناقص: Avant, la rivière (être) claire et les arbres (grandir) vite.',
					solutionAr: 'Avant, la rivière était claire et les arbres grandissaient vite.'
				},
				{
					problemAr: 'كوّن ضد الكلمتين بإضافة سابقة (préfixe): 1) propre — 2) prudent.',
					solutionAr: '1) malpropre (غير نظيف). 2) imprudent (غير حذر؛ نضع im قبل p).'
				}
			],
			watchOutAr:
				'انتبه لقاعدة إملائية ذهبية! أمام الحروف (m, b, p) تتحوّل السابقة «in-» إلى «im-»: نقول «impossible» و«imprudent» بحرف m وليس n!'
		},
		practice: [
			{
				questionAr: 'Conjugue à l’imparfait : Autrefois, cette colline ............ (être) couverte d’arbres.',
				options: ['est', 'sera', 'était', 'étaient'],
				correctIndex: 2,
				diagnosticFeedback: [
					'est في المضارع، وAutrefois تدل على الماضي.',
					'sera في المستقبل.',
					'أحسنت! cette colline مفرد مؤنث (elle) فتأخذ «était».',
					'étaient للجمع والفاعل مفرد.'
				],
				explanationAr: '«cette colline» est singulier : «être» à l’imparfait donne «était».'
			},
			{
				questionAr: 'Conjugue à l’imparfait : Chaque printemps, les jardins ............ (verdir) rapidement.',
				options: ['verdissent', 'verdissaient', 'verdiront', 'verdait'],
				correctIndex: 1,
				diagnosticFeedback: [
					'verdissent في المضارع.',
					'ممتاز! verdir (مجموعة ثانية) مع ils في الماضي الناقص يأخذ «issaient»: verdissaient.',
					'verdiront في المستقبل.',
					'نقصت «iss» والفاعل جمع لا مفرد.'
				],
				explanationAr: 'Les verbes du 2e groupe prennent «-iss-» à l’imparfait : les jardins verdissaient.'
			},
			{
				questionAr: 'Quel mot appartient à la même famille que «sauver» ?',
				options: ['savon', 'sauvetage', 'sauter', 'saluer'],
				correctIndex: 1,
				diagnosticFeedback: [
					'savon (صابون) لا علاقة لها بمعنى الإنقاذ.',
					'أحسنت! sauvetage (الإنقاذ) و sauveteur من عائلة sauver.',
					'sauter تعني القفز.',
					'saluer تعني التحية.'
				],
				explanationAr: '«sauvetage» partage le même radical et le même sens que «sauver».'
			},
			{
				questionAr: 'Quel est le contraire du mot «prudent» formé avec un préfixe ?',
				options: ['inprudent', 'imprudent', 'malprudent', 'reprudent'],
				correctIndex: 1,
				diagnosticFeedback: [
					'أمام الحرف p نكتب im وليس in.',
					'ممتاز! أمام p تتحول السابقة إلى im فنكتب «imprudent».',
					'السابقة الصحيحة هنا هي im وليست mal.',
					're تدل على التكرار لا الضد.'
				],
				explanationAr: 'Devant «m, b, p», le préfixe «in-» devient «im-» : imprudent.'
			},
			{
				questionAr: 'Dans le mot «propreté», quel est le suffixe ajouté au radical «propre» ?',
				options: ['pro-', '-té', '-tion', 're-'],
				correctIndex: 1,
				diagnosticFeedback: [
					'pro جزء من الجذر وليست لاحقة.',
					'أحسنت! اللاحقة «-té» حوّلت النعت propre إلى اسم propreté (النظافة).',
					'اللاحقة هنا ليست -tion.',
					're سابقة في البداية وليست لاحقة.'
				],
				explanationAr: 'Le suffixe «-té» est placé à la fin du mot «propre» pour former le nom «propreté».'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 5: Méthodologie de l'Évaluation des Acquis 5AP
	// ---------------------------------------------------------------------------
	{
		id: 'fre_lesson_5ap_t3_evaluation_acquis_methodologie',
		slug: 'fre-5ap-t3-evaluation-acquis-methodologie',
		grade: '5ap',
		yearSubjectId: 607,
		trimesterId: 't3',
		sequenceId: 'projet3_4',
		sequenceTitleAr: 'المشروعان الثالث والرابع: الكوارث الطبيعية وحماية البيئة والتحضير لتقييم المكتسبات 5AP',
		order: 5,
		titleAr: 'منهجية تقييم المكتسبات للسنة الخامسة ابتدائي (Méthodologie de l’Évaluation des Acquis 5AP)',
		objectives: [
			'فهم بنية امتحان تقييم المكتسبات في الفرنسية: فهم المكتوب (Compréhension) والإنتاج الكتابي (Production écrite).',
			'اتّباع خطوات منهجية للإجابة الدقيقة عن أسئلة الفهم واللغة دون تسرّع.',
			'مراجعة الإنتاج الكتابي بشبكة تدقيق (الملاءمة، الزمن الصحيح، التوافق، علامات الترقيم، ونظافة الورقة).'
		],
		keywordsAr: ['تقييم المكتسبات', 'Évaluation des Acquis 5AP', 'Compréhension', 'Production écrite', 'منهجية'],
		discover: {
			scenarioAr:
				'يستعد تلاميذ السنة الخامسة لاجتياز تقييم المكتسبات في اللغة الفرنسية. نصحتهم المعلمة: «اقرؤوا النص مرتين بتركيز، أجيبوا عن أسئلة الفهم من النص، ثم خطّطوا للإنتاج الكتابي باستعمال صندوق الأدوات قبل نقله بخط واضح على الورقة.»',
			svg: renderLessonIllustration('pri_ara_06_four_seasons_trees', {
				lang: 'fr',
				title: "Évaluation des Acquis 5AP : la nature algérienne au fil des 4 saisons",
				customLegend: [
					{ num: '1', label: "Le printemps fleuri et l'été lumineux : protéger nos forêts" },
					{ num: '2', label: "L'automne doré et l'hiver enneigé : préserver l'eau précieuse" }
				]
			}),
			steps: [
				{
					promptAr: 'ما أول خطوة يجب القيام بها قبل الشروع في حل أسئلة فهم المكتوب؟',
					hintAr: 'هل نجيب فوراً أم نقرأ النص والعنوان بتركيز أولاً؟',
					expectedInput: 'قراءة النص مرتين',
					revealAr: 'قراءة العنوان والنص مرتين على الأقل بتأنٍّ لتحديد موضوع النص والأفكار الأساسية.'
				},
				{
					promptAr: 'في الإنتاج الكتابي، كيف نختار الزمن المناسب للفعل؟',
					hintAr: 'بطاقة حيوان = مضارع؛ سرد رحلة = ماضٍ مركب؛ نصيحة بيئية = أمر أو مستقبل.',
					expectedInput: 'حسب نوع الموضوع',
					revealAr: 'نختار الزمن حسب نوع النص المطلوب: المضارع لوصف حيوان، الماضي المركّب لسرد زيارة، والأمر أو المستقبل لتقديم نصائح بيئية.'
				},
				{
					promptAr: 'ماذا نراجع في الدقائق الخمس الأخيرة قبل تسليم الورقة؟',
					hintAr: 'فكّر في الحروف الكبيرة، النقط، التوافق، ونظافة الخط.',
					expectedInput: 'الأخطاء والترقيم والخط',
					revealAr: 'نراجع الحروف الكبيرة (majuscules)، علامات الترقيم (. ? !)، توافق النعت والفعل، وعدم نسيان أي سؤال.'
				}
			]
		},
		summary: {
			rulesAr: [
				'في «فهم المكتوب» (Compréhension de l’écrit): اقرأ العنوان والفقرات مرتين، استخرج الجواب الدقيق من النص ولا تعتمد على التخمين، وتأكّد من كلمات «صح أو خطأ» (Vrai / Faux) بمقارنة كل جملة مع النص.',
				'في «التحكم في اللغة» (Fonctionnement de la langue): اقرأ التعليمة جيداً، وحدّد الزمن المطلوب (présent, passé composé, futur, imparfait, impératif) والفاعل قبل التصريف أو التوافق.',
				'في «الإنتاج الكتابي» (Production écrite): التزم بالموضوع المطلوب (4 إلى 5 جمل واضحة)، استعن بـ «صندوق الأدوات» (la boîte à outils)، وضع عنواناً مناسباً للفقرة.',
				'شبكة المراجعة السريعة قبل تسليم الورقة: 1) كل جملة تبدأ بحرف كبير وتنتهي بنقطة. 2) عدم تكرار الاسم (استعمال il / elle / nous). 3) فحص المتجانسات (a/à, et/est, son/sont) والخط الواضح المقروء.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Grille d’auto-évaluation (Évaluation des Acquis 5AP)',
				rootLabel: 'Maîtrise maximale (تملك أقصى)',
				rootSub: 'المعايير الأربعة لنجاح التلميذ في تقييم المكتسبات',
				branches: [
					{ label: 'Pertinence', rule: 'Respecter le sujet', example: '4-5 phrases sur le thème', color: '#1d4ed8' },
					{ label: 'Cohérence', rule: 'Idées bien ordonnées', example: 'Substituts + connecteurs', color: '#047857' },
					{ label: 'Correction', rule: 'Bon temps + accords', example: 'Présent / Passé / Impératif', color: '#b45309' },
					{ label: 'Présentation', rule: 'Copie propre et lisible', example: 'Majuscules + ponctuation', color: '#7c3aed' }
				]
			}),
			visualCaptionAr: 'المعايير الأربعة التي تحقق التملك الأقصى في تقييم المكتسبات 5AP',
			examples: [
				{
					problemAr: 'إذا طُلب منك «إعطاء 4 نصائح لحماية الماء»، أي زمن تستعمل؟',
					solutionAr: 'أستعمل الأمر الحاضر (l’impératif présent): Ferme le robinet ! Ne gaspille pas l’eau ! Arrose les plantes le soir ! Répare les fuites !'
				},
				{
					problemAr: 'كيف نصحّح هذه الجملة قبل تسليم الورقة: «hier nous avons visité la casbah est nous sommes rentré content»؟',
					solutionAr: 'Hier, nous avons visité la Casbah et nous sommes rentrés contents. (حرف كبير + فاصلة + et + توافق rentrés contents + نقطة).'
				}
			],
			watchOutAr:
				'تذكّر! في تقييم المكتسبات لا تُكتب الإجابات بعشوائية: خصّص مسوّدة صغيرة لترتيب جملك الأربع، ثم انقلها بخط واضح وجميل على ورقة الإجابة!'
		},
		practice: [
			{
				questionAr: 'Quelle est la première bonne habitude au début d’une épreuve de compréhension de l’écrit ?',
				options: [
					'Répondre sans lire le texte',
					'Lire le titre et le texte deux fois attentivement',
					'Commencer par la fin de la copie',
					'Recopier tout le texte'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الإجابة دون قراءة النص تؤدي إلى أخطاء كثيرة.',
					'أحسنت! قراءة العنوان والنص مرتين تمنحك فهماً دقيقاً للأفكار والكلمات المفتاحية.',
					'الترتيب السليم يبدأ بقراءة النص بتركيز.',
					'لا ننسخ النص بل نجيب عن الأسئلة فقط.'
				],
				explanationAr: 'Lire attentivement le titre et le texte deux fois permet de comprendre le thème et les détails.'
			},
			{
				questionAr: 'Si le sujet demande de donner des conseils pour protéger la forêt, quel temps est le plus adapté ?',
				options: [
					'L’impératif présent',
					'L’imparfait',
					'Le passé composé',
					'Aucun verbe'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! الأمر الحاضر (Protégeons la forêt ! N’allume pas de feu !) هو الأنسب للنصائح.',
					'الماضي الناقص لوصف مشاهد قديمة.',
					'الماضي المركب لسرد أحداث وقعت.',
					'كل جملة مفيدة تحتاج إلى فعل.'
				],
				explanationAr: 'Pour donner des conseils écologiques, on emploie l’impératif présent (ex. : Protégeons la forêt !).'
			},
			{
				questionAr: 'À quoi sert la «boîte à outils» donnée dans la production écrite ?',
				options: [
					'À être ignorée',
					'À aider l’élève avec des noms, verbes et adjectifs utiles',
					'À remplacer la ponctuation',
					'À recopier les mots sans faire de phrases'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'صندوق الأدوات وُضع لمساعدة التلميذ فلا ينبغي تجاهله.',
					'أحسنت! يوفّر صندوق الأدوات رصيداً لغوياً منظماً لبناء جمل صحيحة دون أخطاء إملائية.',
					'الترقيم ضروري دائماً في الإنتاج الكتابي.',
					'يجب توظيف الكلمات في جمل تامة لا نسخها عشوائياً.'
				],
				explanationAr: 'La boîte à outils propose le vocabulaire précis (noms, verbes, adjectifs) pour construire son texte.'
			},
			{
				questionAr: 'Quelle phrase est parfaitement prête pour une copie d’Évaluation des Acquis ?',
				options: [
					'l’eau est précieuse ferme le robinet',
					'L’eau est précieuse. Ferme le robinet pour l’économiser !',
					'L’eau et précieuse. Fermes le robinet.',
					'L’eau est précieux, pour économisé.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'تنقصها الحروف الكبيرة وعلامات الترقيم.',
					'ممتاز! حروف كبيرة، توافق سليم (eau مؤنث -> précieuse)، أمر صحيح (Ferme)، وغاية بالمصدر (pour l’économiser).',
					'تحتوي خطأين: et بدلاً من est، وFermes بـ s زائدة في الأمر.',
					'précieux لم توافق eau المؤنثة، وبعد pour نضع المصدر économiser.'
				],
				explanationAr: 'Cette phrase respecte la majuscule, les accords, l’impératif sans «s» et «pour + infinitif».'
			},
			{
				questionAr: 'Dans une épreuve de 5AP, combien de phrases claires et bien ponctuées demande généralement la production écrite ?',
				options: ['1 seule phrase', '4 à 5 phrases cohérentes', '30 phrases', 'Des mots isolés'],
				correctIndex: 1,
				diagnosticFeedback: [
					'جملة واحدة غير كافية لتغطية كل عناصر التعليمة.',
					'أحسنت! يُطلب غالباً في السنة الخامسة فقرة قصيرة ومترابطة من 4 إلى 5 جمل سليمة.',
					'30 جملة كثيرة جداً ولا تناسب مستوى السنة الخامسة.',
					'يجب كتابة جمل تامة ومفيدة لا كلمات متفرقة.'
				],
				explanationAr: 'En 5AP, une production écrite réussie compte généralement 4 à 5 phrases courtes, claires et cohérentes.'
			}
		]
	}
];
