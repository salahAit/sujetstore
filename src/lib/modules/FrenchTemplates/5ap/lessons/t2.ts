import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchPrimaryCards,
	svgFrenchWritingBlueprint
} from '../../svg-french';
import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';

// ===============================================================================
// Interactive Lessons - 5AP French - Trimester 2
// Projet 2 : Au musée / Notre patrimoine algérien
// (Casbah d'Alger, Grande Mosquée de Tlemcen, Timgad, Jardin d'Essai)
// ===============================================================================

export const LESSONS_5AP_T2: FrenchInteractiveLessonData[] = [
	// ---------------------------------------------------------------------------
	// Lesson 1: Les indicateurs de temps et de lieu (CCL / CCT)
	// ---------------------------------------------------------------------------
	{
		id: 'fre_lesson_5ap_t2_ccl_cct',
		slug: 'fre-5ap-t2-ccl-cct',
		grade: '5ap',
		yearSubjectId: 607,
		trimesterId: 't2',
		sequenceId: 'projet2',
		sequenceTitleAr: 'المشروع الثاني: في المتحف — تراثنا الجزائري العريق (Au musée : Notre patrimoine algérien)',
		order: 1,
		titleAr: 'مؤشرات المكان والزمان (Les indicateurs de lieu CCL et de temps CCT)',
		objectives: [
			'تمييز مؤشر المكان (CCL) بطرح السؤال «Où ?» (أين؟).',
			'تمييز مؤشر الزمان (CCT) بطرح السؤال «Quand ?» (متى؟).',
			'توظيف مؤشرات المكان والزمان بدقة لتحديد زمان ومكان زيارة معلم جزائري.'
		],
		keywordsAr: ['مؤشر المكان', 'مؤشر الزمان', 'CCL', 'CCT', 'Où', 'Quand'],
		discover: {
			scenarioAr:
				'كتب أمين عن رحلة قسمه: «La semaine dernière, notre classe a visité la Casbah d’Alger. À midi, nous avons déjeuné dans le Jardin d’Essai.» تأمّل المجموعات التي تحدّد الزمان والمكان في الجملتين.',
			svg: svgFrenchGrammarMap({
				title: 'Les compléments circonstanciels (CCL et CCT)',
				rootLabel: 'Situer une visite dans l’espace et le temps',
				rootSub: 'تحديد المكان والزمان في الجملة',
				branches: [
					{ label: 'CCL (Lieu)', rule: 'Répond à : Où ?', example: 'à la Casbah / au musée', color: '#1d4ed8' },
					{ label: 'CCT (Temps)', rule: 'Répond à : Quand ?', example: 'hier / à huit heures', color: '#047857' },
					{ label: 'Déplaçable', rule: 'Début ou fin de phrase', example: 'Hier, nous sommes allés...', color: '#b45309' }
				]
			}),
			steps: [
				{
					promptAr: 'في الجملة الأولى، ما العبارة التي تجيب عن السؤال «Quand ?» (متى زار القسم القصبة)؟',
					hintAr: 'ابحث في بداية الجملة الأولى.',
					expectedInput: 'La semaine dernière',
					revealAr: 'العبارة «La semaine dernière» (الأسبوع الماضي) هي مؤشر الزمان (CCT).'
				},
				{
					promptAr: 'في الجملة الثانية، ما العبارة التي تجيب عن السؤال «Où ?» (أين تناولوا الغداء)؟',
					hintAr: 'ابحث عن اسم الحديقة المشهورة في الجزائر العاصمة.',
					expectedInput: 'dans le Jardin d’Essai',
					revealAr: '«dans le Jardin d’Essai» هو مؤشر المكان (CCL) لأنه يجيب عن السؤال «Où ?».'
				},
				{
					promptAr: 'هل يمكن نقل «À midi» إلى نهاية الجملة دون أن يفسد المعنى؟',
					hintAr: 'جرّب قراءة: Nous avons déjeuné dans le Jardin d’Essai à midi.',
					expectedInput: 'نعم',
					revealAr: 'نعم! مؤشرات المكان والزمان يمكن تحريكها أو حذفها مع بقاء الجملة صحيحة نحوياً.'
				}
			]
		},
		summary: {
			rulesAr: [
				'مؤشر المكان (CCL : Complément Circonstanciel de Lieu) يجيب عن السؤال «Où ?» (أين؟): مثل «au musée, à Tlemcen, dans la Casbah, à Timgad, devant la mosquée».',
				'مؤشر الزمان (CCT : Complément Circonstanciel de Temps) يجيب عن السؤال «Quand ?» (متى؟): مثل «hier, la semaine dernière, à huit heures, le matin, pendant les vacances».',
				'يمتاز كل من CCL و CCT بإمكانية نقلهما (في بداية الجملة أو نهايتها) أو حذفهما دون إفساد تركيب الجملة.',
				'يبدأ مؤشر المكان غالباً بحرف جر مكاني: à, au, dans, devant, près de, sur, sous.'
			],
			visualSvg: renderLessonIllustration('pri_ara_04_algeria_flag_martyrs_memorial', {
				lang: 'fr',
				title: "Mon pays l'Algérie : repérer le CCL (Où ?) et le CCT (Quand ?)",
				customLegend: [
					{ num: '1', label: "CCL (Où ?) : à Maqam Echahid et à la Casbah d'Alger" },
					{ num: '2', label: 'CCT (Quand ?) : la semaine dernière, à neuf heures' }
				]
			}),
			visualCaptionAr: 'تمييز مؤشر المكان (CCL) ومؤشر الزمان (CCT) بالسؤالين Où و Quand',
			examples: [
				{
					problemAr: 'حدّد الـ CCT والـ CCL في الجملة: «Hier matin, les élèves ont admiré les arcs anciens à Timgad.»',
					solutionAr: 'Hier matin : CCT (Quand ?). à Timgad : CCL (Où ?).'
				},
				{
					problemAr: 'أكمل الجملة بمؤشر زمان ثم مؤشر مكان: «............, nous avons pris le bus ............ .»',
					solutionAr: 'À huit heures (CCT), nous avons pris le bus devant l’école (CCL).'
				}
			],
			watchOutAr:
				'لا تخلط بين حرف الجر «à» للمكان و«à» للزمان! انظر إلى المعنى: «à Alger» مكان (CCL) لأنها تجيب عن Où؟، بينما «à huit heures» زمان (CCT) لأنها تجيب عن Quand؟.'
		},
		practice: [
			{
				questionAr: 'Dans «Hier, nous avons visité la Grande Mosquée de Tlemcen», «Hier» est :',
				options: ['un CCL', 'un CCT', 'un sujet', 'un adjectif'],
				correctIndex: 1,
				diagnosticFeedback: [
					'CCL للمكان وHier يدل على الزمان.',
					'أحسنت! Hier يجيب عن السؤال «Quand ?» فهو مؤشر زمان (CCT).',
					'الفاعل هنا هو nous.',
					'Hier ظرف زمان وليس نعتاً.'
				],
				explanationAr: '«Hier» répond à la question «Quand ?» : c’est un indicateur de temps (CCT).'
			},
			{
				questionAr: 'Dans «Les élèves entrent dans le musée», «dans le musée» est :',
				options: ['un CCT', 'un verbe', 'un CCL', 'un pronom'],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا يدل على الزمان بل على المكان.',
					'الفعل في الجملة هو entrent.',
					'ممتاز! يجيب عن السؤال «Où ?» فهو مؤشر مكان (CCL).',
					'dans le musée مجموعة اسمية بحرف جر وليست ضميراً.'
				],
				explanationAr: '«dans le musée» répond à la question «Où entrent les élèves ?» : c’est un CCL.'
			},
			{
				questionAr: 'Quelle question pose-t-on pour trouver le CCL ?',
				options: ['Quand ?', 'Qui ?', 'Où ?', 'Pourquoi ?'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Quand للبحث عن مؤشر الزمان CCT.',
					'Qui للبحث عن الفاعل أو المفعول به العاقل.',
					'أحسنت! نطرح السؤال «Où ?» لإيجاد مؤشر المكان CCL.',
					'Pourquoi للبحث عن السبب.'
				],
				explanationAr: 'Pour repérer le Complément Circonstanciel de Lieu (CCL), on pose la question «Où ?».'
			},
			{
				questionAr: 'Choisis l’expression qui est un indicateur de temps (CCT) :',
				options: ['à la Casbah', 'devant l’école', 'pendant les vacances', 'au Jardin d’Essai'],
				correctIndex: 2,
				diagnosticFeedback: [
					'à la Casbah يدل على مكان (CCL).',
					'devant l’école يدل على مكان (CCL).',
					'ممتاز! pendant les vacances (خلال العطلة) يدل على الزمان (CCT).',
					'au Jardin d’Essai يدل على مكان (CCL).'
				],
				explanationAr: '«pendant les vacances» situe l’action dans le temps (Quand ?) : c’est un CCT.'
			},
			{
				questionAr: 'Dans «À dix heures, le guide accueille les visiteurs à l’entrée», quel est le CCL ?',
				options: ['À dix heures', 'le guide', 'les visiteurs', 'à l’entrée'],
				correctIndex: 3,
				diagnosticFeedback: [
					'À dix heures يدل على الساعة فهو CCT.',
					'le guide هو الفاعل (sujet).',
					'les visiteurs مفعول به مباشر (COD).',
					'أحسنت! «à l’entrée» (عند المدخل) يجيب عن Où؟ فهو CCL.'
				],
				explanationAr: '«à l’entrée» indique le lieu où le guide accueille les visiteurs : c’est le CCL.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 2: Le passé composé avec avoir et être (accord du participe passé)
	// ---------------------------------------------------------------------------
	{
		id: 'fre_lesson_5ap_t2_passe_compose',
		slug: 'fre-5ap-t2-passe-compose',
		grade: '5ap',
		yearSubjectId: 607,
		trimesterId: 't2',
		sequenceId: 'projet2',
		sequenceTitleAr: 'المشروع الثاني: في المتحف — تراثنا الجزائري العريق (Au musée : Notre patrimoine algérien)',
		order: 2,
		titleAr: 'الماضي المركّب مع avoir و être وتوافق اسم المفعول (Le passé composé)',
		objectives: [
			'بناء الماضي المركّب باستعمال الفعل المساعد (avoir أو être) في المضارع + اسم المفعول (participe passé).',
			'صياغة اسم المفعول للمجموعة الأولى (-é) وللمجموعة الثانية (-i).',
			'تطبيق قاعدة توافق اسم المفعول مع الفاعل عندما يكون المساعد «être».'
		],
		keywordsAr: ['الماضي المركب', 'passé composé', 'avoir', 'être', 'participe passé', 'accord'],
		discover: {
			scenarioAr:
				'قرأ كريم دفتر الرحلات: «Hier, nous avons visité la Grande Mosquée de Tlemcen. Nous avons choisi des cartes postales. Khadidja est arrivée tôt et les élèves sont partis en bus.» لاحظ عدد الكلمات في كل فعل ولماذا أضفنا «e» أو «s» في الآخر.',
			svg: renderLessonIllustration('pri_lang_01_red_bus_train', {
				lang: 'fr',
				title: 'Le passé composé : départ en excursion scolaire',
				customLegend: [
					{ num: '1', label: 'Avec AVOIR : Nous avons pris le bus scolaire à 8 heures.' },
					{ num: '2', label: 'Avec ÊTRE : Les voyageurs sont partis en train rapide.' }
				]
			}),
			steps: [
				{
					promptAr: 'ممّ يتكوّن الفعل «avons visité» في الماضي المركب؟',
					hintAr: 'يتكون من كلمتين: فعل مساعد في المضارع + اسم مفعول.',
					expectedInput: 'avoir + participe passé',
					revealAr: 'يتكوّن من الفعل المساعد «avoir» في المضارع (avons) + اسم المفعول (visité) بعلامة -é للمجموعة الأولى.'
				},
				{
					promptAr: 'انظر إلى «Khadidja est arrivée». لماذا أضفنا حرف «e» في نهاية «arrivée»؟',
					hintAr: 'انظر إلى المساعد المستعمل وإلى جنس الفاعل خديجة.',
					expectedInput: 'مع être يتبع الفاعل المؤنث',
					revealAr: 'لأن الفعل صُرّف مع المساعد «être» والفاعل «Khadidja» مؤنث مفرد، فتوافق اسم المفعول بإضافة «e».'
				},
				{
					promptAr: 'هل أضفنا «s» إلى «visité» في «nous avons visité» رغم أن الفاعل جمع؟',
					hintAr: 'ما المساعد المستعمل في avons visité؟',
					expectedInput: 'لا',
					revealAr: 'لا! مع المساعد «avoir» لا يتبع اسم المفعول الفاعل أبداً: nous avons visité / elles ont admiré.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الماضي المركب (le passé composé) يعبر عن حدث وقع وانتهى في الماضي، ويتكوّن من: الفعل المساعد (avoir أو être في المضارع) + اسم المفعول (participe passé).',
				'اسم المفعول: أفعال المجموعة الأولى (-er) تنتهي بـ «é» (visiter : visité، admirer : admiré، aller : allé). أفعال المجموعة الثانية (-ir) تنتهي بـ «i» (finir : fini، choisir : choisi).',
				'مع المساعد «avoir» لا يتوافق اسم المفعول مع الفاعل: «Les filles ont visité le musée.» (بلا e ولا s).',
				'مع المساعد «être» (أفعال الحركة الشهيرة: aller, venir, arriver, partir, entrer, sortir, monter, descendre, rester, tomber)، يتبع اسم المفعول الفاعل في النوع والعدد: «Meriem est allée / Les élèves sont partis / Les filles sont arrivées».'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Le passé composé : avoir vs être',
				subtitle: 'قاعدة توافق اسم المفعول الأساسية في 5AP',
				columns: [
					{ header: 'Avec AVOIR', rule: 'Pas d’accord avec le sujet', examples: 'Elles ont visité / fini', color: '#1d4ed8' },
					{ header: 'Avec ÊTRE (fém.)', rule: 'Accord +e (sing.) / +es (pl.)', examples: 'Elle est allée / sorties', color: '#047857' },
					{ header: 'Avec ÊTRE (masc.)', rule: 'Accord +s au pluriel', examples: 'Ils sont partis / arrivés', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'الفرق الذهبي بين الماضي المركب مع avoir ومع être وتوافق اسم المفعول',
			examples: [
				{
					problemAr: 'صرّف في الماضي المركب: Les élèves (admirer) les manuscrits anciens.',
					solutionAr: 'Les élèves ont admiré les manuscrits anciens. (مع avoir لا نضيف s إلى admiré).'
				},
				{
					problemAr: 'صرّف في الماضي المركب: Amina et Meriem (aller) au Jardin d’Essai.',
					solutionAr: 'Amina et Meriem sont allées au Jardin d’Essai. (مع être والفاعل مؤنث جمع نضيف es).'
				}
			],
			watchOutAr:
				'احذر الخطأ الشائع! لا تكتب «Les élèves ont visités» لأن المساعد هو «avoir»! نضيف علامات التوافق (e, s, es) مع الفاعل فقط عندما يكون المساعد «être».'
		},
		practice: [
			{
				questionAr: 'Conjugue au passé composé : Hier, nous ............ (visiter) la Casbah d’Alger.',
				options: ['visiterons', 'avons visité', 'sommes visités', 'avons visités'],
				correctIndex: 1,
				diagnosticFeedback: [
					'visiterons مستقبل بسيط، وكلمة Hier تدل على الماضي.',
					'أحسنت! الفعل visiter يُصرّف مع avoir بلا توافق مع الفاعل: avons visité.',
					'الفعل visiter يأخذ المساعد avoir لا être.',
					'مع avoir لا نضيف s إلى اسم المفعول مع الفاعل.'
				],
				explanationAr: '«visiter» se conjugue avec «avoir» sans accord avec le sujet : nous avons visité.'
			},
			{
				questionAr: 'Conjugue au passé composé : La semaine dernière, Sara ............ (arriver) la première.',
				options: ['a arrivé', 'est arrivé', 'est arrivée', 'est arrivées'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الفعل arriver يُصرّف مع المساعد être لا avoir.',
					'الفاعل Sara مؤنث ومع être يجب إضافة علامة التأنيث e.',
					'ممتاز! Sara مؤنث مفرد ومع être نكتب: est arrivée.',
					'Sara مفرد فلا نضيف s للجمع.'
				],
				explanationAr: '«arriver» utilise «être» ; comme «Sara» est féminin singulier, on ajoute «e» : est arrivée.'
			},
			{
				questionAr: 'Quel est le participe passé du verbe «choisir» (2e groupe) ?',
				options: ['choisé', 'choisi', 'choisit', 'choisir'],
				correctIndex: 1,
				diagnosticFeedback: [
					'النهاية -é لأفعال المجموعة الأولى فقط.',
					'أحسنت! أفعال المجموعة الثانية ينتهي اسم المفعول فيها بـ «i»: choisi.',
					'choisit هو المضارع مع il/elle لا اسم المفعول.',
					'choisir هو المصدر (infinitif).'
				],
				explanationAr: 'Tous les verbes du 2e groupe forment leur participe passé en «-i» : choisir donne choisi.'
			},
			{
				questionAr: 'Choisis l’accord correct : Les filles sont ............ dans le musée.',
				options: ['entré', 'entrés', 'entrée', 'entrées'],
				correctIndex: 3,
				diagnosticFeedback: [
					'الفاعل جمع مؤنث ومع être يجب التوافق.',
					'entrés للمذكر الجمع، أما Les filles فمؤنث جمع.',
					'entrée للمؤنث المفرد فقط.',
					'ممتاز! Les filles مؤنث جمع فتأخذ «es»: sont entrées.'
				],
				explanationAr: 'Avec l’auxiliaire «être», «entrées» s’accorde avec le sujet féminin pluriel «Les filles».'
			},
			{
				questionAr: 'Choisis la phrase correctement conjuguée au passé composé :',
				options: [
					'Les élèves ont fini la visite à midi.',
					'Les élèves ont finis la visite à midi.',
					'Les élèves sont fini la visite à midi.',
					'Les élèves a fini la visite à midi.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! الفعل finir يأخذ المساعد avoir (ont) واسم المفعول fini بلا s.',
					'مع avoir لا نضيف s إلى fini.',
					'الفعل finir يُصرّف مع avoir لا être.',
					'الفاعل Les élèves جمع فيحتاج ont لا a.'
				],
				explanationAr: '«Les élèves ont fini» : auxiliaire «avoir» au pluriel + participe passé «fini» invariable.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 3: Les pronoms compléments et l'expansion du groupe nominal
	// ---------------------------------------------------------------------------
	{
		id: 'fre_lesson_5ap_t2_pronoms_expansion_gn',
		slug: 'fre-5ap-t2-pronoms-expansion-gn',
		grade: '5ap',
		yearSubjectId: 607,
		trimesterId: 't2',
		sequenceId: 'projet2',
		sequenceTitleAr: 'المشروع الثاني: في المتحف — تراثنا الجزائري العريق (Au musée : Notre patrimoine algérien)',
		order: 3,
		titleAr: 'الضمائر المفعولية وتوسيع المجموعة الاسمية (Les pronoms compléments et l’expansion du GN)',
		objectives: [
			'استعمال ضمائر المفعول المباشر (le, la, l’, les) وغير المباشر (lui, leur) لتفادي التكرار.',
			'وضع الضمير المفعولي في مكانه الصحيح قبل الفعل.',
			'توسيع المجموعة الاسمية (expansion du GN) بالنعت الصفي أو بالمضاف إليه.'
		],
		keywordsAr: ['الضمائر المفعولية', 'COD', 'COI', 'le la les lui leur', 'expansion du GN'],
		discover: {
			scenarioAr:
				'قارن بين الجملتين: 1) «Nous visitons la Grande Mosquée. Nous admirons la Grande Mosquée.» -> «Nous la visitons et nous l’admirons.» 2) «Le guide parle aux élèves.» -> «Le guide leur parle.» وتأمّل المجموعة الاسمية الموسّعة: «un ancien manuscrit de Tlemcen».',
			svg: svgFrenchGrammarMap({
				title: 'Les pronoms compléments (COD et COI)',
				rootLabel: 'Placé DEVANT le verbe pour éviter la répétition',
				rootSub: 'يوضع الضمير المفعولي قبل الفعل لتجنّب التكرار',
				branches: [
					{ label: 'COD (le / la / l’)', rule: 'Remplace un nom sing.', example: 'Il la visite.', color: '#1d4ed8' },
					{ label: 'COD (les)', rule: 'Remplace un nom plur.', example: 'Nous les admirons.', color: '#047857' },
					{ label: 'COI (lui)', rule: 'Remplace à + personne (sg)', example: 'Je lui parle.', color: '#b45309' },
					{ label: 'COI (leur)', rule: 'Remplace à + personnes (pl)', example: 'Le guide leur répond.', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'في جملة «Nous la visitons»، ما المجموعة الاسمية التي عوّضها الضمير «la»؟',
					hintAr: 'ابحث عن اسم مؤنث مفرد مفعول به مباشر.',
					expectedInput: 'la Grande Mosquée',
					revealAr: 'عوّض الضمير «la» المفعول به المباشر المؤنث المفرد «la Grande Mosquée» وجاء قبل الفعل.'
				},
				{
					promptAr: 'في «Le guide parle aux élèves»، لماذا استعملنا «leur» وليس «les»؟',
					hintAr: 'لاحظ حرف الجر «aux» (= à les) قبل élèves.',
					expectedInput: 'مفعول غير مباشر جمع',
					revealAr: 'لأن «aux élèves» مفعول به غير مباشر (COI) جمع مسبوق بـ à، فنعوّضه بالضمير «leur».'
				},
				{
					promptAr: 'في «un ancien manuscrit de Tlemcen»، ما الكلمات التي وسّعت الاسم الأساسي «manuscrit»؟',
					hintAr: 'هناك نعت صفي قبله ومضاف إليه بعده.',
					expectedInput: 'ancien et de Tlemcen',
					revealAr: 'وسّعنا الاسم «manuscrit» بالنعت «ancien» وبالمضاف إليه «de Tlemcen» لنعطي وصفاً أدق.'
				}
			]
		},
		summary: {
			rulesAr: [
				'ضمائر المفعول المباشر (COD : يجيب عن Qui ? / Quoi ?) هي: «le» (مذكر مفرد)، «la» (مؤنث مفرد)، «l’» (قبل حرف علة)، «les» (جمع). توضع قبل الفعل: «Nous regardons les arcs -> Nous les regardons.».',
				'ضمائر المفعول غير المباشر (COI : يجيب عن À qui ?) هي: «lui» (للمفرد المذكر والمؤنث) و«leur» (للجمع بلا s): «Il parle au guide -> Il lui parle. / Il répond aux élèves -> Il leur répond.».',
				'المجموعة الاسمية البسيطة (GN minimal) تتكوّن من أداة + اسم: «un musée».',
				'توسيع المجموعة الاسمية (l’expansion du GN) يكون بإضافة نعت صفي («un grand musée») أو مضاف إليه («un musée de céramique») أو كليهما معاً.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'L’expansion du Groupe Nominal (GN)',
				subtitle: 'كيف نغني الاسم ونوسّعه في الوصف؟',
				columns: [
					{ header: 'GN minimal', rule: 'Déterminant + Nom', examples: 'un manuscrit', color: '#1d4ed8' },
					{ header: '+ Adjectif', rule: 'Qualifie le nom', examples: 'un ancien manuscrit', color: '#047857' },
					{ header: '+ Compl. du nom', rule: 'Précise avec de / du / à', examples: 'un manuscrit de Tlemcen', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'طريقتا توسيع المجموعة الاسمية في السنة الخامسة ابتدائي',
			examples: [
				{
					problemAr: 'عوّض المفعول به بضمير مناسب: 1) Les touristes photographient la Casbah. 2) Le professeur explique la leçon à Bilal.',
					solutionAr: '1) Les touristes la photographient. 2) Le professeur lui explique la leçon.'
				},
				{
					problemAr: 'وسّع المجموعة الاسمية «une mosquée» بنعت صفي ومضاف إليه.',
					solutionAr: 'une grande mosquée d’Alger (أو une belle mosquée de Tlemcen).'
				}
			],
			watchOutAr:
				'احذر! الضمير المفعولي «leur» الذي يأتي قبل الفعل لا يأخذ «s» أبداً: نكتب «Le guide leur montre les poteries» (وليس leurs)!'
		},
		practice: [
			{
				questionAr: 'Remplace le COD par un pronom : Les élèves admirent «les jardins».',
				options: ['Les élèves le admirent.', 'Les élèves la admirent.', 'Les élèves les admirent.', 'Les élèves leur admirent.'],
				correctIndex: 2,
				diagnosticFeedback: [
					'le للمفرد المذكر وهنا les jardins جمع.',
					'la للمفرد المؤنث.',
					'أحسنت! «les jardins» مفعول مباشر جمع يعوّضه الضمير «les».',
					'leur للمفعول غير المباشر COI المسبوق بـ à.'
				],
				explanationAr: '«les jardins» est un COD pluriel : on le remplace par «les» devant le verbe.'
			},
			{
				questionAr: 'Remplace le COI par un pronom : La maîtresse parle «à Khadidja».',
				options: ['La maîtresse la parle.', 'La maîtresse lui parle.', 'La maîtresse leur parle.', 'La maîtresse le parle.'],
				correctIndex: 1,
				diagnosticFeedback: [
					'la للمفعول المباشر، وهنا يوجد حرف الجر «à».',
					'ممتاز! «à Khadidja» مفعول غير مباشر مفرد يعوّضه «lui» (للمذكر والمؤنث).',
					'leur للجمع، وخديجة مفردة.',
					'le للمفعول المباشر المذكر.'
				],
				explanationAr: '«à Khadidja» est un COI singulier (à qui ?) : le pronom correct est «lui».'
			},
			{
				questionAr: 'Choisis la bonne phrase pour remplacer «aux visiteurs» dans : Le gardien sourit aux visiteurs.',
				options: [
					'Le gardien les sourit.',
					'Le gardien lui sourit.',
					'Le gardien leurs sourit.',
					'Le gardien leur sourit.'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'aux visiteurs مفعول غير مباشر (à + nom) فلا نستعمل les.',
					'lui للمفرد وvisiteurs جمع.',
					'الضمير leur قبل الفعل لا يأخذ s أبداً.',
					'أحسنت! نكتب «Le gardien leur sourit.» بلا s في leur.'
				],
				explanationAr: '«aux visiteurs» est un COI pluriel : on le remplace par «leur» (toujours invariable devant un verbe).'
			},
			{
				questionAr: 'Dans le groupe nominal «les ponts suspendus de Constantine», quelles sont les expansions du nom «ponts» ?',
				options: [
					'les seulement',
					'suspendus (adjectif) et de Constantine (complément du nom)',
					'Constantine seulement',
					'il n’y a aucune expansion'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'les أداة تعريف وليست توسيعاً.',
					'ممتاز! تم توسيع الاسم «ponts» بالنعت «suspendus» وبالمضاف إليه «de Constantine».',
					'لا ننسَ النعت «suspendus» وحرف الجر «de».',
					'المجموعة الاسمية هنا موسّعة بصفتين واضحتين.'
				],
				explanationAr: 'Le nom «ponts» est enrichi par l’adjectif «suspendus» et le complément du nom «de Constantine».'
			},
			{
				questionAr: 'Remplace le COD : Nous visitons «le musée». -> Nous ............ visitons.',
				options: ['le', 'la', 'les', 'lui'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! «le musée» مفعول مباشر مذكر مفرد يعوّضه الضمير «le».',
					'la للمؤنث المفرد وmusée مذكر.',
					'les للجمع.',
					'lui للمفعول غير المباشر.'
				],
				explanationAr: '«le musée» est masculin singulier (COD) : on utilise le pronom «le».'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 4: Les homophones grammaticaux (a/à, ont/on, son/sont, et/est)
	// ---------------------------------------------------------------------------
	{
		id: 'fre_lesson_5ap_t2_homophones_grammaticaux',
		slug: 'fre-5ap-t2-homophones-grammaticaux',
		grade: '5ap',
		yearSubjectId: 607,
		trimesterId: 't2',
		sequenceId: 'projet2',
		sequenceTitleAr: 'المشروع الثاني: في المتحف — تراثنا الجزائري العريق (Au musée : Notre patrimoine algérien)',
		order: 4,
		titleAr: 'المتجانسات النحوية (Les homophones grammaticaux : a/à, ont/on, son/sont, et/est)',
		objectives: [
			'التمييز الإملائي الدقيق بين (a و à) وبين (ont و on).',
			'التمييز الإملائي الدقيق بين (son و sont) وبين (et و est).',
			'تطبيق حيلة الاستبدال بالماضي الناقص (avait / avaient / était / étaient) لتفادي الأخطاء في الإملاء والتعبير.'
		],
		keywordsAr: ['المتجانسات النحوية', 'homophones', 'a / à', 'ont / on', 'son / sont', 'et / est'],
		discover: {
			scenarioAr:
				'اقرأ هذه المذكرة عن رحلة تلمسان: «On a visité la mosquée à midi. Les élèves ont pris des photos. Son minaret est haut et les colonnes sont anciennes.» لاحظ الكلمات التي تتشابه في النطق وتختلف في الكتابة.',
			svg: svgFrenchConjugationChart({
				title: 'Les astuces pour les homophones grammaticaux',
				subtitle: 'حيلة الاستبدال الذهبية (remplacer à l’imparfait)',
				columns: [
					{ header: 'a / à  &  ont / on', rule: 'a = avait | ont = avaient', examples: 'Il a (avait) vu / On (Il) va à Alger', color: '#1d4ed8' },
					{ header: 'sont / son', rule: 'sont = étaient | son = mon', examples: 'Ils sont (étaient) prêts / son sac', color: '#047857' },
					{ header: 'est / et', rule: 'est = était | et = et puis', examples: 'Timgad est belle et ancienne.', color: '#b45309' }
				]
			}),
			steps: [
				{
					promptAr: 'في «On a visité la mosquée à midi»، أي الكلمتين (a أم à) يمكن استبدالها بـ «avait»؟',
					hintAr: 'جرّب: On avait visité... مقابل ... avait midi.',
					expectedInput: 'a',
					revealAr: 'يمكن استبدال «a» (بلا حركة accent) بـ «avait» لأنها فعل avoir، أما «à» بحركة accent فهي حرف جر.'
				},
				{
					promptAr: 'في «Son minaret est haut et les colonnes sont anciennes»، بماذا يمكن استبدال «son»؟',
					hintAr: 'جرّب استبدالها بصفة ملكية أخرى مثل mon.',
					expectedInput: 'mon',
					revealAr: 'نستبدل «son» بـ «mon» (صفة ملكية)، بينما «sont» فعل être ويمكن استبدالها بـ «étaient».'
				},
				{
					promptAr: 'في الجملة نفسها، بماذا نختبر الكلمة «et» للتمييز بينها وبين «est»؟',
					hintAr: 'هل تعني «و» (et puis) أم فعل الكينونة (était)؟',
					expectedInput: 'et puis',
					revealAr: '«et» حرف عطف يعني «و» ويمكن استبداله بـ «et puis»، بينما «est» فعل être ويمكن استبداله بـ «était».'
				}
			]
		},
		summary: {
			rulesAr: [
				'التمييز بين «a» و«à»: نكتب «a» (فعل avoir) إذا أمكن تعويضها بـ «avait»، ونكتب «à» (حرف جر) إذا لم يصلح التعويض: «Amine a (avait) un cahier à la main.».',
				'التمييز بين «ont» و«on»: نكتب «ont» (فعل avoir للجمع) إذا أمكن تعويضها بـ «avaient»، ونكتب «on» (ضمير فاعل) إذا أمكن تعويضها بـ «il»: «On (Il) visite ce que les artisans ont (avaient) fabriqué.».',
				'التمييز بين «sont» و«son»: نكتب «sont» (فعل être) إذا أمكن تعويضها بـ «étaient»، ونكتب «son» (صفة ملكية) إذا أمكن تعويضها بـ «mon»: «Les élèves sont (étaient) fiers de son (mon) dessin.».',
				'التمييز بين «est» و«et»: نكتب «est» (فعل être) إذا أمكن تعويضها بـ «était»، ونكتب «et» (حرف عطف) إذا أمكن تعويضها بـ «et puis»: «La Casbah est (était) blanche et (et puis) historique.».'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Les 4 paires d’homophones à maîtriser en 5AP',
				rootLabel: 'Tester avant d’écrire !',
				rootSub: 'جرّب التعويض في ذهنك قبل الكتابة',
				branches: [
					{ label: 'a / à', rule: 'a -> avait', example: 'Il a pris le bus à 8h.', color: '#1d4ed8' },
					{ label: 'ont / on', rule: 'ont -> avaient | on -> il', example: 'On admire ce qu’ils ont vu.', color: '#047857' },
					{ label: 'sont / son', rule: 'sont -> étaient | son -> mon', example: 'Ils sont dans son jardin.', color: '#b45309' },
					{ label: 'est / et', rule: 'est -> était | et -> et puis', example: 'Le parc est grand et calme.', color: '#7c3aed' }
				]
			}),
			visualCaptionAr: 'خريطة المتجانسات النحوية الأربع وطريقة التمييز الفوري بينها',
			examples: [
				{
					problemAr: 'أكمل بـ (a / à) و(et / est): Youssef ............ pris son appareil ............ il ............ allé ............ Timgad.',
					solutionAr: 'Youssef a pris son appareil et il est allé à Timgad.'
				},
				{
					problemAr: 'أكمل بـ (on / ont) و(son / sont): ............ admire les ruelles : elles ............ propres et les élèves ............ noté le nom de ............ quartier.',
					solutionAr: 'On admire les ruelles : elles sont propres et les élèves ont noté le nom de son quartier.'
				}
			],
			watchOutAr:
				'تذكّر دائماً اختبار الثواني الثلاث: إذا استطعت قول «avait / avaient / était / étaient» فهو الفعل (a / ont / est / sont)، وإلا فهو الحرف أو الضمير (à / on / et / son)!'
		},
		practice: [
			{
				questionAr: 'Complète avec «a» ou «à» : Notre classe ............ visité le musée ............ neuf heures.',
				options: ['à / a', 'a / à', 'a / a', 'à / à'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الأولى فعل (avait visité) والثانية حرف جر قبل الساعة.',
					'أحسنت! «a visité» (فعل avoir) و«à neuf heures» (حرف جر).',
					'لا يصح «avait neuf heures» فالثانية حرف جر «à».',
					'الأولى فعل مساعد «a» بلا حركة accent.'
				],
				explanationAr: 'On peut dire «Notre classe avait visité» (a), mais pas «avait neuf heures» (à).'
			},
			{
				questionAr: 'Complète avec «est» ou «et» : La Casbah ............ ancienne ............ très belle.',
				options: ['et / est', 'est / est', 'est / et', 'et / et'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الأولى فعل كينونة (était) والثانية حرف عطف (et puis).',
					'الثانية تربط صفتين فهي حرف عطف «et».',
					'ممتاز! «est ancienne» (فعل être) و«et très belle» (حرف عطف).',
					'الأولى تحتاج فعل الجملة «est».'
				],
				explanationAr: '«La Casbah était ancienne (est) et puis très belle (et).»'
			},
			{
				questionAr: 'Complète avec «on» ou «ont» : ............ voit les photos que les élèves ............ prises.',
				options: ['Ont / on', 'On / ont', 'On / on', 'Ont / ont'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الأولى ضمير فاعل (Il voit) والثانية فعل للجمع (avaient prises).',
					'أحسنت! «On voit» (= Il voit) و«les élèves ont prises» (= avaient).',
					'الثانية فعل avoir مع les élèves فتُكتب ont.',
					'الأولى ضمير فاعل مفرد On.'
				],
				explanationAr: '«On» remplace «Il» devant «voit» ; «ont» est le verbe avoir (avaient).'
			},
			{
				questionAr: 'Complète avec «son» ou «sont» : Les jardins ............ verts et ............ parfum est agréable.',
				options: ['son / sont', 'sont / sont', 'son / son', 'sont / son'],
				correctIndex: 3,
				diagnosticFeedback: [
					'الأولى فعل (étaient verts) والثانية صفة ملكية (mon parfum).',
					'الثانية ليست فعلاً بل صفة ملكية قبل الاسم parfum.',
					'الأولى فعل الجملة مع الفاعل الجمع Les jardins.',
					'ممتاز! «sont verts» (étaient) و«son parfum» (mon parfum).'
				],
				explanationAr: '«Les jardins étaient verts (sont)» et «mon parfum (son parfum)».'
			},
			{
				questionAr: 'Choisis la phrase sans aucune faute d’homophones :',
				options: [
					'Bilal à pris sont cahier est il a écrit.',
					'Bilal a pris son cahier et il a écrit.',
					'Bilal a pris sont cahier et il à écrit.',
					'Bilal à pris son cahier est il a écrit.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'تحتوي أخطاء في à و sont و est.',
					'أحسنت! كل المتجانسات صحيحة: a (avait), son (mon), et (et puis), a (avait).',
					'sont و à écrit خاطئتان.',
					'à pris و est خاطئتان.'
				],
				explanationAr: '«Bilal a (avait) pris son (mon) cahier et (et puis) il a (avait) écrit.»'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 5: Raconter une visite scolaire à un site historique algérien
	// ---------------------------------------------------------------------------
	{
		id: 'fre_lesson_5ap_t2_raconter_visite_scolaire',
		slug: 'fre-5ap-t2-raconter-visite-scolaire',
		grade: '5ap',
		yearSubjectId: 607,
		trimesterId: 't2',
		sequenceId: 'projet2',
		sequenceTitleAr: 'المشروع الثاني: في المتحف — تراثنا الجزائري العريق (Au musée : Notre patrimoine algérien)',
		order: 5,
		titleAr: 'سرد رحلة مدرسية إلى معلم تاريخي جزائري (Raconter une visite scolaire)',
		objectives: [
			'توظيف مؤشرات الزمان والمكان (CCT و CCL) لافتتاح سرد الرحلة المدرسية.',
			'استعمال الماضي المركّب بضمير المتكلمين (nous) لسرد أحداث الزيارة بتسلسل واضح.',
			'كتابة فقرة من 4 إلى 5 جمل حول زيارة القصبة أو جامع تلمسان الكبير أو حديقة التجارب.'
		],
		keywordsAr: ['سرد رحلة', 'visite scolaire', 'patrimoine algérien', 'passé composé', 'Casbah', 'Tlemcen'],
		discover: {
			scenarioAr:
				'كتبت خديجة فقرة عن رحلة قسمها: «La semaine dernière, notre classe est allée à la Grande Mosquée de Tlemcen. Nous avons pris le bus à huit heures. Sur place, nous avons admiré les belles colonnes et les anciens manuscrits. Nous sommes rentrés très heureux de cette visite.»',
			svg: renderLessonIllustration('pri_lang_02_airplane_ship', {
				lang: 'fr',
				title: "Raconter un voyage ou une visite en Algérie (par avion / en bateau)",
				customLegend: [
					{ num: '1', label: "Voyager par avion vers les oasis du Sud algérien" },
					{ num: '2', label: 'Admirer la côte méditerranéenne en bateau' }
				]
			}),
			steps: [
				{
					promptAr: 'ما مؤشر الزمان الذي بدأت به خديجة قصتها؟',
					hintAr: 'انظر إلى أول ثلاث كلمات في الفقرة.',
					expectedInput: 'La semaine dernière',
					revealAr: 'بدأت بـ «La semaine dernière» (الأسبوع الماضي) وهو مؤشر زمان (CCT) يناسب السرد في الماضي.'
				},
				{
					promptAr: 'في أي زمن صرّفت خديجة الأفعال (est allée, avons pris, avons admiré, sommes rentrés)؟',
					hintAr: 'كل فعل يتكون من مساعد واسم مفعول.',
					expectedInput: 'الماضي المركب',
					revealAr: 'صرّفتها جميعاً في الماضي المركّب (le passé composé) لأنه الزمن المناسب لسرد رحلة منتهية.'
				},
				{
					promptAr: 'بماذا ختمت خديجة فقرتها في الجملة الأخيرة؟',
					hintAr: 'عبّرت عن شعور التلاميذ عند العودة.',
					expectedInput: 'شعور الفرح والعودة',
					revealAr: 'ختمت بشعور الفرح والاعتزاز بالرحلة: «Nous sommes rentrés très heureux de cette visite.».'
				}
			]
		},
		summary: {
			rulesAr: [
				'لكتابة فقرة ناجحة عن زيارة معلم جزائري (4 إلى 5 جمل)، ابدأ بـ CCT + CCL: متى ذهبتم وأين؟ (مثال: «Hier, nous sommes allés au Jardin d’Essai du Hamma.»).',
				'اذكر وسيلة النقل والمرافقين: «Nous avons pris le bus avec notre enseignant et nos camarades.».',
				'اذكر ما شاهدتموه باستعمال الماضي المركب مع «nous»: «nous avons visité, nous avons admiré, nous avons découvert, nous avons pris des photos».',
				'اختم بشعور جميل تجاه تراثنا الجزائري: «Quelle belle journée ! Nous sommes rentrés contents et fiers de notre patrimoine.».'
			],
			visualSvg: svgFrenchWritingBlueprint({
				title: 'Plan en 4 étapes : Raconter une visite scolaire',
				steps: [
					{ stage: 'CCT + CCL', detail: 'Quand et où ? Hier, nous sommes allés à la Casbah d’Alger.', color: '#1d4ed8' },
					{ stage: 'Départ', detail: 'Avec qui et comment ? En bus, avec notre classe et le maître.', color: '#047857' },
					{ stage: 'Découvertes', detail: 'Passé composé : Nous avons admiré les ruelles et les fontaines.', color: '#b45309' },
					{ stage: 'Impression', detail: 'Sentiment final : Nous sommes rentrés heureux !', color: '#7c3aed' }
				]
			}),
			visualCaptionAr: 'خطة من أربع خطوات لسرد رحلة مدرسية باللغة الفرنسية في السنة الخامسة',
			examples: [
				{
					problemAr: 'اكتب جملة افتتاحية لرحلة إلى حديقة التجارب باستعمال (Hier / aller / bus).',
					solutionAr: 'Hier, notre classe est allée au Jardin d’Essai du Hamma en bus.'
				},
				{
					problemAr: 'اكتب جملتين عما شاهده التلاميذ وشعورهم في الختام (admirer / grands palmiers / rentrer / contents).',
					solutionAr: 'Nous avons admiré les grands palmiers et les plantes rares. Le soir, nous sommes rentrés très contents.'
				}
			],
			watchOutAr:
				'تذكّر! عند الكتابة بالضمير «nous» مع المساعد «être» (مثل nous sommes allés / nous sommes rentrés)، لا تنسَ حرف «s» للجمع في نهاية اسم المفعول!'
		},
		practice: [
			{
				questionAr: 'Quel temps utilise-t-on principalement pour raconter une visite scolaire déjà terminée ?',
				options: [
					'Le futur simple',
					'Le passé composé',
					'L’impératif présent',
					'Le présent uniquement'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'المستقبل لأحداث لم تقع بعد.',
					'أحسنت! نسرد الرحلة المنتهية بالماضي المركب (le passé composé).',
					'الأمر لتقديم النصائح والأوامر.',
					'الرحلة حدثت في الماضي فلا نكتفي بالمضارع.'
				],
				explanationAr: 'Pour raconter des événements passés et terminés, on emploie le passé composé.'
			},
			{
				questionAr: 'Quelle phrase convient le mieux pour commencer le récit d’une excursion ?',
				options: [
					'Demain, nous irons au musée.',
					'La semaine dernière, nous sommes allés à la Casbah d’Alger.',
					'Visite la Casbah d’Alger !',
					'Le fennec vit dans le Sahara.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه الجملة في المستقبل وليست سرداً لرحلة ماضية.',
					'ممتاز! تجمع بين CCT (La semaine dernière) وCCL (à la Casbah) والماضي المركب.',
					'هذه جملة أمرية.',
					'هذه جملة وصفية لحيوان (المشروع الأول).'
				],
				explanationAr: 'Un bon début précise quand (CCT) et où (CCL) avec un verbe au passé composé.'
			},
			{
				questionAr: 'Complète avec le bon verbe au passé composé : Au musée, nous ............ des poteries anciennes.',
				options: ['admirons', 'avons admiré', 'sommes admirés', 'admirerons'],
				correctIndex: 1,
				diagnosticFeedback: [
					'admirons في المضارع.',
					'أحسنت! «nous avons admiré» في الماضي المركب مع avoir.',
					'الفعل admirer يأخذ المساعد avoir لا être.',
					'admirerons في المستقبل.'
				],
				explanationAr: '«admirer» au passé composé avec «nous» donne : nous avons admiré.'
			},
			{
				questionAr: 'Choisis la phrase de conclusion bien accordée :',
				options: [
					'Nous sommes rentré heureux.',
					'Nous avons rentrés heureux.',
					'Nous sommes rentrés heureux.',
					'Nous est rentrés heureux.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'ينقص حرف s للجمع مع المساعد être.',
					'الفعل rentrer يُصرّف مع être لا avoir.',
					'ممتاز! مع nous وêtre نضيف s لاسم المفعول: Nous sommes rentrés heureux.',
					'مع nous نكتب sommes لا est.'
				],
				explanationAr: '«rentrer» se conjugue avec «être» : avec «nous», le participe passé prend «s» (rentrés).'
			},
			{
				questionAr: 'Quel groupe de mots appartient à la boîte à outils d’une visite au patrimoine algérien ?',
				options: [
					'pattes, griffes, carnivore, savane',
					'musée, guide, manuscrits, colonnes, visiter, admirer',
					'pompier, incendie, ambulance, casque',
					'robinet, gaspillage, arroser, déchets'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذا المعجم خاص بالحيوانات البرية (المشروع الأول).',
					'أحسنت! هذه الكلمات تخص المتحف والتراث الجزائري (المشروع الثاني).',
					'هذا المعجم خاص بالكوارث والمهن المنقذة (المشروع الثالث).',
					'هذا المعجم خاص بحماية البيئة والماء (المشروع الرابع).'
				],
				explanationAr: '«musée, guide, manuscrits, colonnes, visiter, admirer» forment le lexique de la visite culturelle.'
			}
		]
	}
];
