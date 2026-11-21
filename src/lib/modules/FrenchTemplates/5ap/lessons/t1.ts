import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchPrimaryCards,
	svgFrenchWritingBlueprint
} from '../../svg-french';
import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';

// ===============================================================================
// Interactive Lessons - 5AP French - Trimester 1
// Projet 1 : Au zoo — Décrire un animal sauvage (Fennec, Gazelle, Dromadaire, Lion)
// ===============================================================================

export const LESSONS_5AP_T1: FrenchInteractiveLessonData[] = [
	// ---------------------------------------------------------------------------
	// Lesson 1: L'adjectif qualificatif (épithète et attribut) et son accord
	// ---------------------------------------------------------------------------
	{
		id: 'fre_lesson_5ap_t1_adjectif_qualificatif',
		slug: 'fre-5ap-t1-adjectif-qualificatif',
		grade: '5ap',
		yearSubjectId: 607,
		trimesterId: 't1',
		sequenceId: 'projet1',
		sequenceTitleAr: 'المشروع الأول: في حديقة الحيوانات — وصف حيوان بري (Au zoo : Décrire un animal sauvage)',
		order: 1,
		titleAr: 'النعت الصفي (الملاصق والمسند) وتوافقه (L’adjectif qualificatif : épithète et attribut)',
		objectives: [
			'تحديد النعت الصفي (l’adjectif qualificatif) لوصف حيوان بري.',
			'التمييز بين النعت الملاصق للاسم (épithète) والنعت المسند بعد فعل الكينونة être (attribut).',
			'موافقة النعت الصفي للاسم في التذكير والتأنيث وفي الإفراد والجمع.'
		],
		keywordsAr: ['النعت الصفي', 'adjectif qualificatif', 'épithète', 'attribut', 'accord'],
		discover: {
			scenarioAr:
				'أثناء زيارة حديقة الحيوانات، كتب يوسف وصفاً لبعض حيوانات الصحراء الجزائرية: «Le fennec est un petit animal. Il a de grandes oreilles. La gazelle est rapide. Les dromadaires sont forts.» تأمّل الكلمات الواصفة وموقعها من الاسم.',
			svg: renderLessonIllustration('pri_ara_08_sahara_oasis_dunes', {
				lang: 'fr',
				title: 'Le Sahara algérien : habitat du fennec, de la gazelle et du dromadaire',
				customLegend: [
					{ num: '1', label: 'Les dunes dorées (un petit fennec, une gazelle rapide)' },
					{ num: '2', label: "L'oasis fraîche et les grands palmiers verts" }
				]
			}),
			steps: [
				{
					promptAr: 'في عبارة «un petit animal»، أين يقع النعت «petit» بالنسبة إلى الاسم «animal»؟',
					hintAr: 'هل يوجد فعل بينهما أم هما متجاوران مباشرة؟',
					expectedInput: 'بجانبه مباشرة',
					revealAr: 'يقع «petit» ملاصقاً مباشرة للاسم «animal»، لذلك نسمّيه نعتاً ملاصقاً (adjectif épithète).'
				},
				{
					promptAr: 'في جملة «La gazelle est rapide»، ما الكلمة التي تفصل بين الاسم «La gazelle» والنعت «rapide»؟',
					hintAr: 'إنه فعل الكينونة مصرّفاً في المضارع.',
					expectedInput: 'est',
					revealAr: 'يفصل بينهما فعل الكينونة «est» (من الفعل être)، لذلك نسمّي «rapide» نعتاً مسنداً (adjectif attribut).'
				},
				{
					promptAr: 'قارن بين «un grand fennec» و«de grandes oreilles». ماذا أضفنا إلى «grand» عندما أصبح الاسم مؤنثاً جمعاً؟',
					hintAr: 'أضفنا علامة التأنيث وعلامة الجمع معاً.',
					expectedInput: 'es',
					revealAr: 'أضفنا «e» للتأنيث و«s» للجمع فأصبحت «grandes»، لأن النعت يتبع الاسم دائماً في النوع والعدد.'
				}
			]
		},
		summary: {
			rulesAr: [
				'النعت الصفي (l’adjectif qualificatif) كلمة تعطي معلومة عن الاسم (حجمه، لونه، سرعته، طبعه): petit, grand, rapide, sauvage, doux.',
				'النعت الملاصق (épithète) يقع مباشرة قبل الاسم أو بعده دون فعل فاصل: «un petit renard», «une gazelle rapide».',
				'النعت المسند (attribut) يفصل بينه وبين الاسم فعل حالة مثل «être»: «Le lion est fort.», «La gazelle est légère.».',
				'قاعدة التوافق (l’accord): نضيف عادة «e» للمؤنث و«s» للجمع: «un lion fort / une lionne forte / des lions forts / des lionnes fortes».'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'L’adjectif qualificatif et son accord',
				rootLabel: 'L’adjectif qualificatif',
				rootSub: 'يتبع الاسم في النوع والعدد',
				branches: [
					{ label: 'Épithète', rule: 'Placé à côté du nom', example: 'un petit fennec', color: '#1d4ed8' },
					{ label: 'Attribut', rule: 'Séparé par être', example: 'Le lion est fort.', color: '#047857' },
					{ label: 'Féminin (+e)', rule: 'Nom féminin singulier', example: 'une grande bosse', color: '#b45309' },
					{ label: 'Pluriel (+s)', rule: 'Nom au pluriel', example: 'des pattes fines', color: '#7c3aed' }
				]
			}),
			visualCaptionAr: 'خريطة النعت الملاصق والمسند وتوافقه في التذكير والتأنيث والإفراد والجمع',
			examples: [
				{
					problemAr: 'حدّد نوع النعت (épithète أم attribut): 1) Le dromadaire est calme. 2) C’est un animal sauvage.',
					solutionAr: '1) calme : adjectif attribut (جاء بعد est). 2) sauvage : adjectif épithète (ملاصق لـ animal).'
				},
				{
					problemAr: 'وافق النعت بين قوسين مع الاسم: La gazelle a des pattes (fin) et une queue (court).',
					solutionAr: 'La gazelle a des pattes fines et une queue courte. (pattes مؤنث جمع: +es، وqueue مؤنث مفرد: +e).'
				}
			],
			watchOutAr:
				'انتبه! النعوت التي تنتهي أصلاً بحرف «e» في المذكر (مثل rapide, sauvage, calme, mince) لا نضيف لها «e» ثانية في المؤنث: un animal rapide / une gazelle rapide.'
		},
		practice: [
			{
				questionAr: 'Dans la phrase «Le fennec a de grandes oreilles», l’adjectif «grandes» est :',
				options: ['un adjectif épithète', 'un adjectif attribut', 'un verbe d’état', 'un pronom personnel'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! النعت «grandes» ملاصق مباشرة للاسم «oreilles» فهو épithète.',
					'النعت المسند (attribut) يفصل بينه وبين الاسم فعل مثل être.',
					'grandes صفة وليست فعلاً.',
					'الضمائر الشخصية هي je, tu, il, elle...'
				],
				explanationAr: '«grandes» est placé directement devant le nom «oreilles» : c’est un adjectif épithète.'
			},
			{
				questionAr: 'Dans la phrase «Le dromadaire est fort», l’adjectif «fort» est :',
				options: ['épithète', 'attribut', 'complément du nom', 'indicateur de temps'],
				correctIndex: 1,
				diagnosticFeedback: [
					'هنا يوجد الفعل «est» بين الاسم والنعت، فلا يكون épithète.',
					'ممتاز! جاء النعت «fort» بعد فعل الكينونة «est»، فهو adjectif attribut.',
					'المضاف إليه يبدأ بحرف جر مثل de أو du.',
					'fort تصف القوة وليست مؤشر زمان.'
				],
				explanationAr: '«fort» est relié au sujet «Le dromadaire» par le verbe «est» : c’est un adjectif attribut.'
			},
			{
				questionAr: 'Accorde correctement l’adjectif : La gazelle est ............ .',
				options: ['léger', 'légers', 'légère', 'légères'],
				correctIndex: 2,
				diagnosticFeedback: [
					'La gazelle اسم مؤنث مفرد، أما léger فمذكر.',
					'légers للمذكر الجمع.',
					'أحسنت! المؤنث المفرد من léger هو légère.',
					'légères للمؤنث الجمع، والاسم هنا مفرد.'
				],
				explanationAr: '«La gazelle» est féminin singulier : l’adjectif «léger» devient «légère».'
			},
			{
				questionAr: 'Complète avec l’adjectif bien accordé : Les lions sont des animaux ............ .',
				options: ['sauvage', 'sauvages', 'sauvagés', 'sauvagees'],
				correctIndex: 1,
				diagnosticFeedback: [
					'animaux اسم جمع فيحتاج النعت إلى علامة الجمع s.',
					'ممتاز! نضيف «s» فقط للجمع: sauvages.',
					'لا نضع حركة accent على sauvage.',
					'لا نضيف e ثانية لأن sauvage تنتهي أصلاً بحرف e.'
				],
				explanationAr: '«animaux» est masculin pluriel : «sauvage» prend un «s» final (sauvages).'
			},
			{
				questionAr: 'Choisis le groupe nominal correctement accordé :',
				options: [
					'une petit gazelle',
					'des grands oreilles',
					'une belle lionne',
					'un longue cou'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'gazelle مؤنث، الصواب: une petite gazelle.',
					'oreilles مؤنث جمع، الصواب: de grandes oreilles.',
					'أحسنت! lionne مؤنث مفرد والمؤنث من beau هو belle.',
					'cou مذكر مفرد، الصواب: un long cou.'
				],
				explanationAr: '«lionne» est féminin singulier : l’adjectif «beau» s’accorde et devient «belle».'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 2: Les substituts grammaticaux et le complément du nom
	// ---------------------------------------------------------------------------
	{
		id: 'fre_lesson_5ap_t1_substituts_complement_nom',
		slug: 'fre-5ap-t1-substituts-complement-nom',
		grade: '5ap',
		yearSubjectId: 607,
		trimesterId: 't1',
		sequenceId: 'projet1',
		sequenceTitleAr: 'المشروع الأول: في حديقة الحيوانات — وصف حيوان بري (Au zoo : Décrire un animal sauvage)',
		order: 2,
		titleAr: 'الضمائر المعوّضة والمضاف إليه (Les substituts grammaticaux et le complément du nom)',
		objectives: [
			'توظيف الضمائر الشخصية المعوّضة (il, elle, ils, elles) لتفادي التكرار في النص الوصفي.',
			'تحديد المضاف إليه (le complément du nom) المسبوق بـ (de, du, de la, de l’, des).',
			'إغناء المجموعة الاسمية بإضافة مضاف إليه مناسب لوصف الحيوانات.'
		],
		keywordsAr: ['الضمائر المعوضة', 'substituts grammaticaux', 'complément du nom', 'il elle ils elles', 'de du des'],
		discover: {
			scenarioAr:
				'قرأت مريم فقرة عن الفنك: «Le fennec est un petit animal du Sahara. Il vit dans un terrier. Les gazelles courent vite. Elles ont des pattes fines.» لاحظ كيف تفادينا تكرار الاسم وكيف حدّدنا موطن الحيوان.',
			svg: svgFrenchGrammarMap({
				title: 'Les substituts grammaticaux',
				rootLabel: 'Éviter la répétition du sujet',
				rootSub: 'تعويض الاسم بالضمير المناسب له في النوع والعدد',
				branches: [
					{ label: 'Il', rule: 'Masculin singulier', example: 'Le fennec : Il vit...', color: '#1d4ed8' },
					{ label: 'Elle', rule: 'Féminin singulier', example: 'La gazelle : Elle court...', color: '#047857' },
					{ label: 'Ils', rule: 'Masculin pluriel', example: 'Les lions : Ils chassent...', color: '#b45309' },
					{ label: 'Elles', rule: 'Féminin pluriel', example: 'Les gazelles : Elles fuient...', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الاسم الذي يعوّضه الضمير «Il» في جملة «Il vit dans un terrier»؟',
					hintAr: 'ابحث عن الاسم المفرد المذكر في الجملة السابقة.',
					expectedInput: 'Le fennec',
					revealAr: 'يعوّض الضمير «Il» الاسم المفرد المذكر «Le fennec» لتجنب تكراره في الجملة الثانية.'
				},
				{
					promptAr: 'ما الضمير الذي استعملناه لتعويض «Les gazelles»؟ ولماذا؟',
					hintAr: 'كلمة gazelle مؤنث وهنا جاءت في الجمع.',
					expectedInput: 'Elles',
					revealAr: 'استعملنا «Elles» لأن «Les gazelles» اسم مؤنث جمع.'
				},
				{
					promptAr: 'في عبارة «un animal du Sahara»، ما دور عبارة «du Sahara» بالنسبة للاسم «animal»؟',
					hintAr: 'إنها تحدّد موطن الحيوان وتبدأ بحرف الجر du.',
					expectedInput: 'مضاف إليه',
					revealAr: '«du Sahara» مضاف إليه (complément du nom) يكمّل معنى الاسم «animal» ويوضّح أين يعيش.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الضمائر المعوّضة (les substituts grammaticaux) تمنع تكرار الاسم: «Il» للمفرد المذكر، «Elle» للمفرد المؤنث، «Ils» للجمع المذكر (أو المختلط)، «Elles» للجمع المؤنث.',
				'المضاف إليه (le complément du nom) اسم يكمّل معنى اسم قبله ويرتبط به بواسطة حرف جر: «de, du, de la, de l’, des» (وأحياناً «à» أو «en»).',
				'تذكّر اختصار أدوات التعريف مع «de»: نكتب «du» بدلاً من «de le»، ونكتب «des» بدلاً من «de les» (مثال: «le roi des animaux», «le pelage du fennec»).',
				'مع الاسم المؤنث نكتب «de la» (مثال: «les cornes de la gazelle»)، ومع الاسم المبدوء بحرف علة نكتب «de l’» (مثال: «les oreilles de l’éléphant»).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Le complément du nom (CdN)',
				subtitle: 'إغناء الاسم باستعمال de / du / de la / des',
				columns: [
					{ header: 'du (masc. sing.)', rule: 'de + le = du', examples: 'le pelage du fennec', color: '#1d4ed8' },
					{ header: 'de la / de l’', rule: 'féminin ou voyelle', examples: 'les cornes de la gazelle', color: '#047857' },
					{ header: 'des (pluriel)', rule: 'de + les = des', examples: 'le roi des animaux', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'جدول صياغة المضاف إليه (Complément du nom) في اللغة الفرنسية',
			examples: [
				{
					problemAr: 'عوض الاسم المسطّر بضمير مناسب لتفادي التكرار: «La girafe» mange des feuilles. «La girafe» a un long cou.',
					solutionAr: 'La girafe mange des feuilles. Elle a un long cou.'
				},
				{
					problemAr: 'أكمل بحرف الجر المناسب (du / de la / des): 1) La bosse ... dromadaire. 2) Le parc ... animaux.',
					solutionAr: '1) La bosse du dromadaire. 2) Le parc des animaux.'
				}
			],
			watchOutAr:
				'احذر الخطأ الشائع: لا تكتب أبداً «de le» ولا «de les»! نكتب دائماً «du» (la fourrure du lion) و«des» (la vitesse des gazelles).'
		},
		practice: [
			{
				questionAr: 'Remplace le sujet par le bon substitut : «Le dromadaire» traverse le désert.',
				options: ['Elle', 'Il', 'Ils', 'Elles'],
				correctIndex: 1,
				diagnosticFeedback: [
					'Elle للمفرد المؤنث، وكلمة dromadaire مذكر.',
					'أحسنت! Le dromadaire اسم مذكر مفرد يعوضه الضمير Il.',
					'Ils للجمع المذكر.',
					'Elles للجمع المؤنث.'
				],
				explanationAr: '«Le dromadaire» est masculin singulier : on le remplace par «Il».'
			},
			{
				questionAr: 'Remplace le sujet par le bon substitut : «Les lionnes» protègent leurs petits.',
				options: ['Il', 'Elle', 'Ils', 'Elles'],
				correctIndex: 3,
				diagnosticFeedback: [
					'Il للمفرد المذكر.',
					'Elle للمفرد المؤنث، وهنا الاسم جمع.',
					'Ils للجمع المذكر، أما lionnes فمؤنث جمع.',
					'ممتاز! Les lionnes مؤنث جمع يعوّضه الضمير Elles.'
				],
				explanationAr: '«Les lionnes» est féminin pluriel : le substitut correct est «Elles».'
			},
			{
				questionAr: 'Complète le complément du nom : Le fennec est un petit renard ............ désert.',
				options: ['de le', 'du', 'de la', 'des'],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نكتب de le أبداً بل ندغمها إلى du.',
					'أحسنت! désert اسم مذكر مفرد فنستعمل du: du désert.',
					'de la للاسم المؤنث المفرد.',
					'des للجمع وكلمة désert مفردة.'
				],
				explanationAr: '«désert» est masculin singulier : «de + le» devient obligatoirement «du».'
			},
			{
				questionAr: 'Dans «La vitesse de la gazelle est incroyable», quel est le complément du nom ?',
				options: ['La vitesse', 'est incroyable', 'de la gazelle', 'incroyable'],
				correctIndex: 2,
				diagnosticFeedback: [
					'La vitesse هو الاسم الأساسي (le nom noyau).',
					'est incroyable هو الفعل والخبر المسند.',
					'ممتاز! «de la gazelle» هو المضاف إليه الذي يكمّل الاسم vitesse.',
					'incroyable نعت مسند.'
				],
				explanationAr: '«de la gazelle» complète le nom «vitesse» à l’aide de la préposition «de».'
			},
			{
				questionAr: 'Complète correctement : Le lion est le roi ............ animaux.',
				options: ['du', 'de la', 'de les', 'des'],
				correctIndex: 3,
				diagnosticFeedback: [
					'du للمفرد المذكر وكلمة animaux جمع.',
					'de la للمفرد المؤنث.',
					'لا نكتب de les أبداً بل ندغمها إلى des.',
					'أحسنت! animaux جمع فنكتب: le roi des animaux.'
				],
				explanationAr: '«animaux» est au pluriel : «de + les» se contracte en «des».'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 3: Le présent de l'indicatif (1er et 2e groupes + être / avoir)
	// ---------------------------------------------------------------------------
	{
		id: 'fre_lesson_5ap_t1_present_indicatif',
		slug: 'fre-5ap-t1-present-indicatif',
		grade: '5ap',
		yearSubjectId: 607,
		trimesterId: 't1',
		sequenceId: 'projet1',
		sequenceTitleAr: 'المشروع الأول: في حديقة الحيوانات — وصف حيوان بري (Au zoo : Décrire un animal sauvage)',
		order: 3,
		titleAr: 'المضارع الدلالي: المجموعتان الأولى والثانية + être و avoir (Le présent de l’indicatif)',
		objectives: [
			'تصريف أفعال المجموعة الأولى (-er) في المضارع الدلالي بدقة.',
			'تصريف أفعال المجموعة الثانية (-ir / -issons) في المضارع الدلالي.',
			'إتقان تصريف الفعلين المساعدين (être و avoir) لوصف الحيوان وصفاً سليماً.'
		],
		keywordsAr: ['المضارع الدلالي', 'présent', '1er groupe', '2e groupe', 'être', 'avoir'],
		discover: {
			scenarioAr:
				'تأمّل جمل البطاقة الوصفية: «Le fennec habite au Sahara. Il a de grandes oreilles. La gazelle bondit sur le sable. Les lions sont forts et rugissent dans la savane.» لاحظ نهايات الأفعال المصرّفة في الحاضر.',
			svg: renderLessonIllustration('pri_ara_05_fresh_fruits_honey_basket', {
				lang: 'fr',
				title: "Le présent de l'indicatif et l'alimentation saine",
				customLegend: [
					{ num: '1', label: 'Nous mangeons des fruits frais (1er groupe : mangeons)' },
					{ num: '2', label: 'Les fruits et le miel pur nourrissent le corps (2e groupe : nourrissent)' }
				]
			}),
			steps: [
				{
					promptAr: 'ما نهاية الفعل «habiter» (مجموعة أولى) مع الفاعل المفرد «Le fennec» (il)؟',
					hintAr: 'انظر إلى الحرف الأخير في كلمة habite.',
					expectedInput: 'e',
					revealAr: 'في المجموعة الأولى نحذف «er» ونضيف مع il/elle النهاية «e»: Le fennec habite.'
				},
				{
					promptAr: 'ينتمي الفعل «bondir» إلى المجموعة الثانية. ما نهايته مع «La gazelle» (elle)؟',
					hintAr: 'انظر إلى آخر حرفين في كلمة bondit.',
					expectedInput: 'it',
					revealAr: 'أفعال المجموعة الثانية تأخذ «it» مع il/elle و«issent» مع ils/elles: elle bondit / ils rugissent.'
				},
				{
					promptAr: 'ما الفعلان المصرّفان في «Il a de grandes oreilles» و«Les lions sont forts»؟',
					hintAr: 'أحدهما للملكية والآخر للكينونة.',
					expectedInput: 'avoir et être',
					revealAr: '«a» من الفعل avoir (يملك) و«sont» من الفعل être (يكون)، وهما أساس كل بطاقة وصفية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'نستعمل المضارع الدلالي (le présent de l’indicatif) للتعبير عن حقائق دائمة ولوصف الحيوانات.',
				'المجموعة الأولى (-er مثل habiter, manger, chasser): نحذف «er» ونضيف: -e, -es, -e, -ons, -ez, -ent. مع الأفعال المنتهية بـ -ger نكتب «eons» مع nous (nous mangeons).',
				'المجموعة الثانية (-ir مثل bondir, grandir, nourrir, rugir): نحذف «ir» ونضيف: -is, -is, -it, -issons, -issez, -issent.',
				'الفعلان الأساسيان: être (je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont) و avoir (j’ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Le présent de l’indicatif (5AP)',
				subtitle: 'النهايات الأساسية لتصريف الأفعال في المضارع',
				columns: [
					{ header: '1er groupe (-er)', rule: '-e, -es, -e, -ons, -ez, -ent', examples: 'il chasse / ils mangent', color: '#1d4ed8' },
					{ header: '2e groupe (-ir)', rule: '-is, -is, -it, -issons, -issez, -issent', examples: 'elle bondit / ils rugissent', color: '#047857' },
					{ header: 'être / avoir', rule: 'est / sont | a / ont', examples: 'Il est petit. Il a 4 pattes.', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'ملخص تصريف المجموعتين الأولى والثانية وفعلي être و avoir في المضارع',
			examples: [
				{
					problemAr: 'صرّف في المضارع: Les gazelles (manger) de l’herbe et (bondir) avec grâce.',
					solutionAr: 'Les gazelles mangent de l’herbe et bondissent avec grâce.'
				},
				{
					problemAr: 'أكمل بتصريف être أو avoir: Le dromadaire (être) grand et il (avoir) une bosse.',
					solutionAr: 'Le dromadaire est grand et il a une bosse.'
				}
			],
			watchOutAr:
				'انتبه للفعل «manger» مع الضمير «nous»: نكتب «nous mangeons» بإضافة حرف «e» قبل «ons» حتى يُنطق حرف g ناعماً!'
		},
		practice: [
			{
				questionAr: 'Conjugue au présent : Les fennecs ............ (chasser) la nuit.',
				options: ['chasse', 'chasses', 'chassent', 'chassons'],
				correctIndex: 2,
				diagnosticFeedback: [
					'chasse للمفرد، أما Les fennecs فجمع (ils).',
					'chasses للضمير tu فقط.',
					'أحسنت! مع ils/elles نضيف «ent» لأفعال المجموعة الأولى: chassent.',
					'chassons للضمير nous.'
				],
				explanationAr: '«Les fennecs» = «ils» : au présent, un verbe du 1er groupe prend «-ent» (chassent).'
			},
			{
				questionAr: 'Conjugue au présent : La gazelle ............ (bondir) très vite dans le désert.',
				options: ['bondis', 'bondit', 'bondissent', 'bonde'],
				correctIndex: 1,
				diagnosticFeedback: [
					'bondis مع je أو tu.',
					'ممتاز! مع elle في المجموعة الثانية نضيف «it»: bondit.',
					'bondissent للجمع (ils/elles).',
					'bondir من المجموعة الثانية وليس الأولى.'
				],
				explanationAr: '«bondir» est un verbe du 2e groupe : avec «elle», il se termine par «-it» (bondit).'
			},
			{
				questionAr: 'Conjugue au présent : Nous ............ (nourrir) les oiseaux dans le jardin.',
				options: ['nourrons', 'nourrissons', 'nourrit', 'nourrissez'],
				correctIndex: 1,
				diagnosticFeedback: [
					'أفعال المجموعة الثانية تأخذ «issons» مع nous وليس ons فقط.',
					'أحسنت! nourrir (مجموعة ثانية) مع nous يصبح nourrissons.',
					'nourrit للمفرد il/elle.',
					'nourrissez للضمير vous.'
				],
				explanationAr: 'Au présent, les verbes du 2e groupe prennent «-issons» avec «nous» : nous nourrissons.'
			},
			{
				questionAr: 'Complète avec le verbe «avoir» au présent : Les dromadaires ............ de longs cils.',
				options: ['a', 'as', 'sont', 'ont'],
				correctIndex: 3,
				diagnosticFeedback: [
					'a للمفرد il/elle.',
					'as للضمير tu.',
					'sont تصريف فعل être وليس avoir.',
					'ممتاز! مع الجمع ils نستعمل ont: Les dromadaires ont de longs cils.'
				],
				explanationAr: 'Le verbe «avoir» à la 3e personne du pluriel (ils) donne «ont».'
			},
			{
				questionAr: 'Choisis la bonne conjugaison du verbe «manger» avec «nous» :',
				options: ['nous mangons', 'nous mangeons', 'nous mangent', 'nous mangez'],
				correctIndex: 1,
				diagnosticFeedback: [
					'نقص حرف e قبل ons، فتتغير قراءة حرف g.',
					'أحسنت! نكتب nous mangeons للحفاظ على النطق الصحيح.',
					'mangent مع ils/elles.',
					'mangez مع vous.'
				],
				explanationAr: 'Avec les verbes en -ger, on garde le «e» devant «-ons» : nous mangeons.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 4: Les types de phrases et la ponctuation
	// ---------------------------------------------------------------------------
	{
		id: 'fre_lesson_5ap_t1_types_phrases_ponctuation',
		slug: 'fre-5ap-t1-types-phrases-ponctuation',
		grade: '5ap',
		yearSubjectId: 607,
		trimesterId: 't1',
		sequenceId: 'projet1',
		sequenceTitleAr: 'المشروع الأول: في حديقة الحيوانات — وصف حيوان بري (Au zoo : Décrire un animal sauvage)',
		order: 4,
		titleAr: 'أنواع الجمل وعلامات الترقيم (Les types de phrases et la ponctuation)',
		objectives: [
			'التمييز بين أنواع الجمل الأربعة: الخبرية، الاستفهامية، التعجبية، والأمرية.',
			'وضع علامة الترقيم المناسبة (. أو ? أو !) في نهاية كل جملة.',
			'تحويل جملة خبرية إلى جملة استفهامية باستعمال «Est-ce que».'
		],
		keywordsAr: ['أنواع الجمل', 'déclarative', 'interrogative', 'exclamative', 'impérative', 'ponctuation'],
		discover: {
			scenarioAr:
				'أمام قفص الأسد، دار هذا الحوار بين أمين وأخته خديجة: 1) «Le lion vit en Afrique.» 2) «Est-ce qu’il mange de la viande ?» 3) «Comme il est majestueux !» 4) «Respecte les consignes du zoo !» قارن بين نهاية كل جملة ومعناها.',
			svg: svgFrenchGrammarMap({
				title: 'Les 4 types de phrases en français',
				rootLabel: 'Une phrase commence par une majuscule',
				rootSub: 'تبدأ الجملة بحرف كبير وتنتهي بعلامة ترقيم',
				branches: [
					{ label: 'Déclarative (.)', rule: 'Donne une information', example: 'Le fennec vit au Sahara.', color: '#1d4ed8' },
					{ label: 'Interrogative (?)', rule: 'Pose une question', example: 'Où vit la gazelle ?', color: '#047857' },
					{ label: 'Exclamative (!)', rule: 'Exprime un sentiment', example: 'Quel beau dromadaire !', color: '#b45309' },
					{ label: 'Impérative (. / !)', rule: 'Donne un ordre / conseil', example: 'Protège les animaux !', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'ما نوع الجملة «Est-ce qu’il mange de la viande ?» وبأي علامة تنتهي؟',
					hintAr: 'إنها تطرح سؤالاً وتنتهي بعلامة استفهام.',
					expectedInput: 'interrogative',
					revealAr: 'إنها جملة استفهامية (phrase interrogative) وتنتهي دائماً بعلامة استفهام (?).'
				},
				{
					promptAr: 'ما نوع الجملة «Comme il est majestueux !»؟',
					hintAr: 'تعبّر عن الإعجاب وتنتهي بعلامة تعجب.',
					expectedInput: 'exclamative',
					revealAr: 'إنها جملة تعجبية (phrase exclamative) تبدأ غالباً بـ Quel / Quelle / Comme وتنتهي بـ (!).'
				},
				{
					promptAr: 'انظر إلى «Respecte les consignes du zoo !». هل يوجد ضمير فاعل قبل الفعل «Respecte»؟',
					hintAr: 'الجملة تبدأ مباشرة بفعل أمر.',
					expectedInput: 'لا',
					revealAr: 'لا يوجد ضمير فاعل مكتوب! إنها جملة أمرية (phrase impérative) تعطي نصيحة أو أمراً.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الجملة الخبرية (phrase déclarative) تعطي معلومة وتنتهي بنقطة (.): «Le dromadaire a une seule bosse.».',
				'الجملة الاستفهامية (phrase interrogative) تطرح سؤالاً وتنتهي بعلامة استفهام (?): «Est-ce que le fennec vit au Sahara ?».',
				'الجملة التعجبية (phrase exclamative) تعبّر عن الدهشة أو الإعجاب وتنتهي بعلامة تعجب (!): «Quelle belle gazelle !».',
				'الجملة الأمرية (phrase impérative) تعطي أمراً أو نصيحة، يبدأ فعلها في صيغة الأمر دون ضمير فاعل وتنتهي بـ (.) أو (!): «Ne dérange pas les animaux !».'
			],
			visualSvg: renderLessonIllustration('pri_lang_06_hygiene_washbasin', {
				lang: 'fr',
				title: "Types de phrases et bonnes habitudes d'hygiène (. / ? / !)",
				customLegend: [
					{ num: '1', label: "Impérative (!) : Lave-toi les mains à l'eau propre !" },
					{ num: '2', label: 'Interrogative (?) : Est-ce que tu te brosses les dents ?' },
					{ num: '3', label: 'Déclarative (.) : La serviette et le savon sont propres.' }
				]
			}),
			visualCaptionAr: 'علامات الترقيم المميِّزة لنهاية كل نوع من أنواع الجمل',
			examples: [
				{
					problemAr: 'حوّل الجملة الخبرية إلى استفهامية باستعمال «Est-ce que»: La gazelle court vite.',
					solutionAr: 'Est-ce que la gazelle court vite ?'
				},
				{
					problemAr: 'حدّد نوع الجملة: «Observe les pattes de la girafe !»',
					solutionAr: 'C’est une phrase impérative (تبدأ بفعل أمر دون فاعل وتعطي توجيهاً).'
				}
			],
			watchOutAr:
				'انتبه للفرق بين الجملة التعجبية والأمرية عندما تنتهيان بـ (!): الجملة الأمرية تبدأ بفعل في الأمر بلا فاعل (Écoute !)، أما التعجبية فتعبّر عن شعور أو إعجاب (Quel bel animal !).'
		},
		practice: [
			{
				questionAr: 'Quel est le type de cette phrase : «Où habite le fennec ?»',
				options: ['Déclarative', 'Interrogative', 'Exclamative', 'Impérative'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الجملة الخبرية تعطي معلومة وتنتهي بنقطة.',
					'أحسنت! تبدأ بأداة الاستفهام «Où» وتنتهي بعلامة استفهام (?).',
					'الجملة التعجبية تنتهي بـ (!).',
					'الجملة الأمرية تعطي أمراً أو نصيحة.'
				],
				explanationAr: 'Cette phrase pose une question et se termine par «?» : elle est interrogative.'
			},
			{
				questionAr: 'Quel est le type de cette phrase : «Le dromadaire boit beaucoup d’eau.»',
				options: ['Déclarative', 'Interrogative', 'Exclamative', 'Impérative'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! تعطي معلومة وتنتهي بنقطة فهي جملة خبرية (déclarative).',
					'لا يوجد فيها سؤال ولا علامة استفهام.',
					'لا تعبّر عن تعجب ولا تنتهي بـ (!).',
					'فيها فاعل صريح ولا تعطي أمراً.'
				],
				explanationAr: 'Elle donne une simple information et finit par un point : c’est une phrase déclarative.'
			},
			{
				questionAr: 'Quel est le type de cette phrase : «Ne donne pas de bonbons aux animaux !»',
				options: ['Déclarative', 'Interrogative', 'Exclamative', 'Impérative'],
				correctIndex: 3,
				diagnosticFeedback: [
					'ليست مجرد خبر بل نهي ونصيحة.',
					'لا تطرح سؤالاً.',
					'رغم وجود (!) فهي تعطي نهياً بفعل أمر دون فاعل، لذلك هي أمرية.',
					'أحسنت! إنها جملة أمرية (impérative) تعطي نصيحة ومنعاً في حديقة الحيوانات.'
				],
				explanationAr: 'Elle donne un conseil / une interdiction avec un verbe sans sujet : c’est une phrase impérative.'
			},
			{
				questionAr: 'Choisis le bon signe de ponctuation : «Quelle jolie gazelle ............»',
				options: ['.', '?', '!', ','],
				correctIndex: 2,
				diagnosticFeedback: [
					'تبدأ بـ «Quelle» للتعجب والإعجاب فلا نكتفي بنقطة.',
					'ليست سؤالاً بل تعجّباً.',
					'ممتاز! الجملة التعجبية تنتهي بعلامة تعجب (!).',
					'الفاصلة لا تنهي الجملة.'
				],
				explanationAr: '«Quelle jolie gazelle !» exprime l’admiration : elle prend un point d’exclamation (!).'
			},
			{
				questionAr: 'Comment transformer «Le lion est carnivore.» en phrase interrogative ?',
				options: [
					'Quel lion est carnivore !',
					'Est-ce que le lion est carnivore ?',
					'Sois carnivore, le lion !',
					'Le lion est carnivore !'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه جملة تعجبية وليست استفهامية.',
					'أحسنت! نضيف «Est-ce que» في البداية وعلامة استفهام (?) في النهاية.',
					'هذه صيغة أمرية غير مناسبة.',
					'هذه جملة تعجبية بعلامة (!).'
				],
				explanationAr: 'On forme facilement une question avec «Est-ce que ... ?».'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 5: Rédiger une fiche descriptive d'un animal du Sahara
	// ---------------------------------------------------------------------------
	{
		id: 'fre_lesson_5ap_t1_fiche_descriptive_animal',
		slug: 'fre-5ap-t1-fiche-descriptive-animal',
		grade: '5ap',
		yearSubjectId: 607,
		trimesterId: 't1',
		sequenceId: 'projet1',
		sequenceTitleAr: 'المشروع الأول: في حديقة الحيوانات — وصف حيوان بري (Au zoo : Décrire un animal sauvage)',
		order: 5,
		titleAr: 'كتابة بطاقة وصفية لحيوان من الصحراء (Rédiger une fiche descriptive d’un animal)',
		objectives: [
			'تنظيم البطاقة الوصفية لحيوان بري في أربع نقاط واضحة (الاسم، الموطن، الوصف الجسدي، الغذاء).',
			'استثمار صندوق الأدوات (la boîte à outils) بأسماء وأفعال ونعوت مناسبة.',
			'كتابة فقرة من 4 إلى 5 جمل بالمضارع الدلالي والضمير المعوّض وعلامات الترقيم.'
		],
		keywordsAr: ['بطاقة وصفية', 'fiche descriptive', 'boîte à outils', 'fennec', 'gazelle', 'dromadaire'],
		discover: {
			scenarioAr:
				'طلب المعلم من بلال كتابة فقرة قصيرة لوصف الفنك اعتماداً على صندوق الأدوات، فكتب: «Le fennec est un petit animal sauvage. Il vit dans le Sahara algérien. Il a de grandes oreilles et un pelage couleur sable. Il se nourrit d’insectes et de petits lézards.»',
			svg: svgFrenchPrimaryCards({
				title: 'Boîte à outils : Décrire un animal du Sahara',
				subtitle: 'عناصر أساسية في كل بطاقة وصفية (5AP)',
				cards: [
					{ word: 'Qui est-il ?', arabic: 'الاسم والنوع', color: '#1d4ed8' },
					{ word: 'Où vit-il ?', arabic: 'الموطن (الصحراء)', color: '#047857' },
					{ word: 'Comment est-il ?', arabic: 'الصفة والأعضاء', color: '#b45309' },
					{ word: 'Que mange-t-il ?', arabic: 'الغذاء', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'بماذا بدأ بلال الجملة الأولى لتقديم الفنك؟',
					hintAr: 'انظر إلى: Le fennec est un petit animal sauvage.',
					expectedInput: 'اسمه ونوعه',
					revealAr: 'بدأ بتقديم اسم الحيوان ونوعه باستعمال الفعل «est»: «Le fennec est un petit animal sauvage.».'
				},
				{
					promptAr: 'ما الفعل الذي استعمله بلال لذكر أعضاء جسم الفنك (الأذنين والفراء)؟',
					hintAr: 'انظر إلى الجملة الثالثة: Il ... de grandes oreilles.',
					expectedInput: 'a',
					revealAr: 'استعمل فعل الملكية «a» (من avoir): «Il a de grandes oreilles et un pelage couleur sable.».'
				},
				{
					promptAr: 'في أي زمن صرّف بلال جميع الأفعال (est, vit, a, se nourrit)؟',
					hintAr: 'هل هي في الماضي أم الحاضر أم المستقبل؟',
					expectedInput: 'المضارع',
					revealAr: 'صرّفها كلها في المضارع الدلالي (le présent de l’indicatif) لأنه يصف حقيقة علمية ثابتة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'لكتابة بطاقة وصفية ناجحة لحيوان (4 إلى 5 جمل)، اتّبع الترتيب المنطقي: 1) تقديم الحيوان (est)، 2) مكان عيشه (vit / habite)، 3) وصفه الجسدي (est + صفة / a + أعضاء)، 4) غذاؤه (mange / se nourrit de).',
				'استعمل الضمير المعوّض (Il للمذكر، Elle للمؤنث) من الجملة الثانية لتفادي تكرار اسم الحيوان في كل جملة.',
				'استعمل أفعال الوصف الأساسية في المضارع: être (est), avoir (a), vivre (vit), habiter (habite), manger (mange), se nourrir de (se nourrit de).',
				'راجع فقرتك قبل التسليم: العنوان، الحرف الكبير (majuscule) في بداية كل جملة، النقطة في نهايتها، وتوافق النعت الصفي مع الاسم.'
			],
			visualSvg: svgFrenchWritingBlueprint({
				title: 'Plan en 4 étapes : Fiche descriptive d’un animal',
				steps: [
					{ stage: 'Présentation', detail: 'Nom + famille : La gazelle est un animal sauvage.', color: '#1d4ed8' },
					{ stage: 'Habitat', detail: 'Lieu de vie : Elle vit dans le Sahara algérien.', color: '#047857' },
					{ stage: 'Description', detail: 'Corps + adjectifs : Elle a des pattes fines et deux cornes.', color: '#b45309' },
					{ stage: 'Nourriture', detail: 'Alimentation : Elle se nourrit d’herbes et de plantes.', color: '#7c3aed' }
				]
			}),
			visualCaptionAr: 'المخطط المنهجي المعتمد في السنة الخامسة لكتابة بطاقة وصفية لحيوان',
			examples: [
				{
					problemAr: 'اكتب جملتين لتقديم الجمل وموطنه: (dromadaire / grand / animal / Sahara).',
					solutionAr: 'Le dromadaire est un grand animal domestique et désertique. Il vit dans le Sahara.'
				},
				{
					problemAr: 'اكتب جملتين لوصف جسم الجمل وغذائه: (une bosse / longs cils / herbes / plantes).',
					solutionAr: 'Il a une grande bosse sur le dos et de longs cils. Il mange des herbes et des plantes du désert.'
				}
			],
			watchOutAr:
				'لا تكتب جملة طويلة واحدة بلا نقط! قسّم فقرتك إلى 4 أو 5 جمل قصيرة وواضحة، تبدأ كل واحدة منها بحرف كبير وتنتهي بنقطة.'
		},
		practice: [
			{
				questionAr: 'Quel temps utilise-t-on pour rédiger la fiche descriptive d’un animal ?',
				options: [
					'Le présent de l’indicatif',
					'Le futur simple',
					'Le passé composé',
					'L’imparfait seulement'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! نكتب البطاقة الوصفية لحيوان في المضارع الدلالي (le présent).',
					'المستقبل لأحداث لم تقع بعد.',
					'الماضي المركب لسرد أحداث وقعت وانتهت.',
					'الماضي الناقص ليس الزمن الرئيسي للبطاقة الوصفية.'
				],
				explanationAr: 'La fiche descriptive présente des vérités générales : on utilise le présent de l’indicatif.'
			},
			{
				questionAr: 'Quelle phrase convient le mieux pour décrire la nourriture d’un animal herbivore ?',
				options: [
					'Il vit dans une grotte.',
					'Il a une longue queue.',
					'Il se nourrit d’herbes et de feuilles.',
					'Il est très rapide.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'هذه الجملة تذكر مكان العيش (الموطن) لا الغذاء.',
					'هذه الجملة تصف الشكل الخارجي.',
					'ممتاز! الحيوان العاشب (herbivore) يتغذى على الأعشاب والأوراق.',
					'هذه الجملة تصف السرعة.'
				],
				explanationAr: 'Un animal herbivore mange des plantes, des herbes et des feuilles.'
			},
			{
				questionAr: 'Quelle phrase évite correctement la répétition après «La gazelle vit au Sahara.» ?',
				options: [
					'Il a des pattes fines.',
					'Elle a des pattes fines.',
					'Ils ont des pattes fines.',
					'La gazelle a la gazelle des pattes.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'La gazelle اسم مؤنث فلا نعوّضه بـ Il.',
					'أحسنت! نعوّض «La gazelle» بالضمير «Elle».',
					'Ils للجمع المذكر.',
					'تكرار غير صحيح نحوياً.'
				],
				explanationAr: '«La gazelle» est féminin singulier : on utilise le substitut «Elle».'
			},
			{
				questionAr: 'Complète avec le bon verbe : Le dromadaire ............ une seule bosse sur le dos.',
				options: ['est', 'a', 'sont', 'vit'],
				correctIndex: 1,
				diagnosticFeedback: [
					'est تعني يكون ولا تناسب ذكر ما يملكه من أعضاء.',
					'ممتاز! نذكر أعضاء الحيوان بالفعل avoir: Il a une seule bosse.',
					'sont للجمع ومن الفعل être.',
					'vit تعني يعيش وتُستعمل للموطن.'
				],
				explanationAr: 'Pour décrire les parties du corps d’un animal, on utilise le verbe «avoir» (il a).'
			},
			{
				questionAr: 'Choisis la phrase bien écrite (majuscule, accord et ponctuation) :',
				options: [
					'le fennec est un petite animal',
					'Le fennec est un petit animal du Sahara.',
					'Le fennec sont un petit animal ?',
					'le fennec a des grand oreilles.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ينقصها حرف كبير في البداية ونقطة في النهاية، وanimal مذكر (petit).',
					'أحسنت! حرف كبير، توافق سليم (petit animal)، مضاف إليه (du Sahara)، ونقطة في النهاية.',
					'الفاعل مفرد فالفعل est وليس sont، والجملة خبرية لا تنتهي بـ ?.',
					'ينقصها حرف كبير، وoreilles مؤنث جمع (grandes).'
				],
				explanationAr: '«Le fennec est un petit animal du Sahara.» respecte la majuscule, l’accord et le point final.'
			}
		]
	}
];
