import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWordFormation,
	svgFrenchWritingBlueprint
} from '../../svg-french';

export const LESSONS_2AM_T2: FrenchInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 1 : Le dialogue dans le récit (ponctuation et verbes introducteurs)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_2am_t2_dialogue_recit',
		slug: 'fre-2am-t2-dialogue-recit',
		grade: '2am',
		yearSubjectId: 625,
		trimesterId: 't2',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع الثاني: الحكاية الأخلاقية على ألسنة الحيوانات — Projet 2 : La fable morale et la sagesse',
		order: 1,
		titleAr: 'الحوار في القصة: علامات الترقيم وأفعال القول (Le dialogue dans le récit)',
		objectives: [
			'معرفة علامات الترقيم الخاصة بالحوار في النص السردي: النقطتان (:)، المزدوجتان (« »)، والعارضة (—) عند تغيّر المتكلم',
			'تنويع أفعال القول (les verbes introducteurs de parole) حسب المعنى: السؤال، الجواب، النصيحة، التعجّب',
			'استعمال الجملة الاعتراضية للقول (proposition incise) بقلب الفاعل والفعل بعد كلام الشخصية'
		],
		keywordsAr: ['Dialogue', 'Ponctuation', 'Guillemets et tirets', 'Verbes introducteurs', 'الحوار في القصة'],
		discover: {
			scenarioAr:
				'اقرأ هذا المقطع من حكاية أخلاقية أصلية بين النحلة والخنفساء: « Un matin d’été, le scarabée paresseux demande à l’abeille : « Pourquoi travailles-tu sans relâche sous ce soleil ? — Je prépare des provisions pour l’hiver, répond calmement l’abeille. — Tu perds ton temps ! s’exclame le scarabée. » » لاحظ علامات الترقيم وتغيّر أفعال القول.',
			svg: svgFrenchGrammarMap({
				title: 'Les règles d’or du dialogue dans une fable',
				rootLabel: 'Faire parler les personnages',
				rootSub: 'Ponctuation exacte + Verbes de parole variés',
				branches: [
					{
						label: 'Ponctuation',
						rule: 'Deux-points (:) + « » + tiret (—)',
						example: 'L’abeille dit : « Travaille ! »',
						color: '#1d4ed8'
					},
					{
						label: 'Verbes de parole',
						rule: 'demander, répondre, conseiller, s’exclamer',
						example: 'Éviter de répéter toujours « dire »',
						color: '#047857'
					},
					{
						label: 'Inversion (incise)',
						rule: 'Verbe + Sujet après la réplique',
						example: '..., répond l’abeille.',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما العلامتان اللتان فتحتا الحوار وأغلقتاه في النص؟',
					hintAr: 'تقعان قبل أول كلام وبعد آخر كلام.',
					expectedInput: 'Les guillemets (« »)',
					revealAr: 'المزدوجتان « » (les guillemets) تفتحان الحوار وتغلقانه، وتسبقهما نقطتان (:).'
				},
				{
					promptAr: 'متى نضع العارضة (le tiret : —) داخل الحوار؟',
					hintAr: 'انظر إلى لحظة انتقال الكلام من الخنفساء إلى النحلة ثم العودة للخنفساء.',
					expectedInput: 'À chaque changement de personnage',
					revealAr: 'نرجع إلى السطر ونضع عارضة (—) في كل مرة يتغيّر فيها المتكلّم.'
				},
				{
					promptAr: 'ما الأفعال الثلاثة التي قدّمت الكلام بدلا من تكرار الفعل « dire »؟',
					hintAr: 'استخرجها من الجمل الثلاث في المقطع.',
					expectedInput: 'demande, répond, s’exclame',
					revealAr: 'الأفعال هي: « demande » (يسأل)، « répond » (تجيب)، « s’exclame » (يتعجّب).'
				}
			]
		},
		summary: {
			rulesAr: [
				'لإدراج حوار سليم داخل حكاية (une fable)، نحترم ثلاث علامات أساسية: النقطتان (:) قبل بداية الحوار، والمزدوجتان (« ») في بدايته ونهايته، والعارضة (—) في أول كل سطر يتغيّر فيه المتكلّم.',
				'أفعال القول (Les verbes introducteurs de parole) تبيّن نبرة المتكلم ومقصده بدقة بدلا من تكرار « dire »:',
				'• للسؤال: demander, interroger, questionner.   • للجواب: répondre, répliquer, rétorquer.',
				'• للنصح والشرح: conseiller, expliquer, rappeler, murmurer.   • للتعجّب أو الأمر: s’exclamer, s’écrier, ordonner, avertir.',
				'عندما يقع فعل القول بعد الكلام (أو في وسطه)، نعكس ترتيب الفعل والفاعل (inversion du sujet): « Sois patient ! » conseille le chameau.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Choisir le bon verbe introducteur de parole',
				subtitle: 'Adapter le verbe à l’intention du personnage',
				columns: [
					{
						header: 'Poser une question',
						rule: 'Phrases en (?)',
						examples: 'demander, interroger',
						color: '#1d4ed8'
					},
					{
						header: 'Répondre / Expliquer',
						rule: 'Phrases en (.)',
						examples: 'répondre, expliquer, conseiller',
						color: '#047857'
					},
					{
						header: 'Émotion / Ordre',
						rule: 'Phrases en (!)',
						examples: 's’exclamer, s’écrier, ordonner',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'دليل اختيار فعل القول المناسب حسب علامة الترقيم ونبرة الكلام',
			examples: [
				{
					problemAr: 'ضع علامات الترقيم الناقصة في الحوار: Le hérisson demande au chacal Pourquoi te moques-tu de moi Le chacal répond Je cours plus vite que toi',
					solutionAr: 'Le hérisson demande au chacal : « Pourquoi te moques-tu de moi ? — Je cours plus vite que toi ! » répond le chacal.'
				},
				{
					problemAr: 'استبدل الفعل « dit » بفعل أدق في: « Où vas-tu si vite ? dit la tortue. »',
					solutionAr: '« Où vas-tu si vite ? demande (ou interroge) la tortue. »'
				}
			],
			watchOutAr:
				'عند كتابة فعل القول بعد الكلام (proposition incise)، لا تنسَ قلب الفاعل والفعل: نكتب « ..., répond le moineau. » وليس « ..., le moineau répond. »!'
		},
		practice: [
			{
				questionAr: 'ما العلامة التي تدل على تغيّر المتكلم داخل الحوار؟',
				options: ['النقطة (.)', 'العارضة (—) عند الرجوع للسطر', 'الفاصلة (,)', 'القوسان ()'],
				correctIndex: 1,
				diagnosticFeedback: [
					'النقطة تنهي الجملة فقط.',
					'أحسنت! نرجع إلى السطر ونضع عارضة (—) كلما تغيّر المتكلّم.',
					'الفاصلة تفصل أجزاء الجملة.',
					'لا نستعمل الأقواس لتغيير المتكلم.'
				],
				explanationAr: 'العارضة (le tiret) في أول السطر تشير إلى انتقال الكلام إلى شخصية أخرى.'
			},
			{
				questionAr: 'اختر فعل القول الأنسب للجملة: « Attention ! L’hiver arrive bientôt ! ...... l’abeille prudente. »',
				options: ['demande', 'avertit', 'interroge', 'questionne'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الجملة ليست سؤالا.',
					'ممتاز! « avertit » (تحذّر) يناسب التحذير والتنبيه.',
					'interroge يُستعمل مع السؤال.',
					'questionne يُستعمل مع السؤال.'
				],
				explanationAr: 'الجملة فيها تحذير وتنبيه، فالفعل الأدق هو « avertit » (أو s’exclame).'
			},
			{
				questionAr: 'اختر الصيغة الصحيحة للجملة الاعتراضية (proposition incise):',
				options: [
					'« Partageons ce grain ! » le moineau propose.',
					'« Partageons ce grain ! » propose le moineau.',
					'« Partageons ce grain ! » le moineau il propose.',
					'« Partageons ce grain ! » proposer le moineau.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'يجب عكس الفعل والفاعل في الجملة الاعتراضية.',
					'صحيح! نعكس الترتيب: الفعل (propose) ثم الفاعل (le moineau).',
					'لا نكرر الفاعل بضمير.',
					'الفعل يجب أن يكون مصرفا لا مصدرا.'
				],
				explanationAr: 'في الجملة الاعتراضية بعد الكلام نضع الفعل قبل الفاعل: propose le moineau.'
			},
			{
				questionAr: 'ما العلامة التي تسبق المزدوجتين مباشرة بعد فعل القول المقدم: « La tortue explique ...... « La patience mène à la réussite. » »؟',
				options: ['الفاصلة (,)', 'النقطتان (:)', 'علامة الاستفهام (?)', 'النقطة (.)'],
				correctIndex: 1,
				diagnosticFeedback: [
					'قبل المزدوجتين نضع نقطتين لا فاصلة.',
					'أحسنت! نضع النقطتين (:) ثم نفتح المزدوجتين « ».',
					'هذه ليست جملة استفهامية.',
					'النقطة تقطع الكلام ولا تفتح الحوار.'
				],
				explanationAr: 'فعل القول في البداية يُتبع دائما بنقطتين (:) قبل فتح المزدوجتين.'
			},
			{
				questionAr: 'ما الفعل الأدق لتعويض « dit » في: « Pourquoi refuses-tu d’aider ton voisin ? dit le cheval. »؟',
				options: ['répond', 'demande', 'ordonne', 'chuchote'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الشخصية تطرح سؤالا ولا تجيب.',
					'ممتاز! « demande » يلائم الجملة الاستفهامية.',
					'الجملة سؤال وليست أمرا.',
					'chuchote تعني يهمس ولا تبرز طابع السؤال.'
				],
				explanationAr: 'عند وجود علامة استفهام (؟) نستعمل فعل سؤال مثل « demande » أو « interroge ».'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 2 : Les valeurs du présent de narration
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_2am_t2_present_narration',
		slug: 'fre-2am-t2-present-narration',
		grade: '2am',
		yearSubjectId: 625,
		trimesterId: 't2',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع الثاني: الحكاية الأخلاقية على ألسنة الحيوانات — Projet 2 : La fable morale et la sagesse',
		order: 2,
		titleAr: 'قِيَم المضارع ومضارع السرد (Les valeurs du présent de l’indicatif et le présent de narration)',
		objectives: [
			'التمييز بين القيم الثلاث للمضارع في الحكاية: مضارع الحدث الآني (présent d’énonciation)، مضارع الحقيقة العامة (vérité générale)، ومضارع السرد (présent de narration)',
			'فهم الأثر الأسلوبي لمضارع السرد في إضفاء الحيوية وتقريب الأحداث للقارئ داخل الحكاية',
			'تصريف الأفعال بدقة في المضارع الإخباري داخل نص حكاية أخلاقية'
		],
		keywordsAr: ['Présent de narration', 'Présent de vérité générale', 'Présent d’énonciation', 'Valeurs du présent', 'مضارع السرد'],
		discover: {
			scenarioAr:
				'تأمّل هذه الجمل الثلاث من حكاية « الجمل والغزالة »: 1) « Un jour, le chameau traversait le désert. Tout à coup, il aperçoit une source et appelle la jeune gazelle. » 2) « Je te remercie maintenant pour ton aide ! » 3) « La patience triomphe toujours de la précipitation. » كل الأفعال في المضارع، لكن لكل جملة قيمة مختلفة!',
			svg: svgFrenchGrammarMap({
				title: 'Les 3 valeurs du présent dans une fable (2AM)',
				rootLabel: 'Présent de l’indicatif',
				rootSub: 'Un même temps, trois emplois différents',
				branches: [
					{
						label: 'Présent de narration',
						rule: 'Rend un récit passé plus vivant',
						example: 'Tout à coup, il aperçoit la source.',
						color: '#1d4ed8'
					},
					{
						label: 'Présent d’énonciation',
						rule: 'Moment où l’on parle (dialogue)',
						example: 'Je te remercie maintenant !',
						color: '#047857'
					},
					{
						label: 'Vérité générale',
						rule: 'Morale valable en tout temps',
						example: 'La patience triomphe toujours.',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'في الجملة الأولى، بدأ النص بالماضي الناقص « traversait » ثم انتقل إلى المضارع « aperçoit / appelle »؛ ما اسم هذه القيمة؟',
					hintAr: 'إنه يروي أحداث الحكاية لجعلها حيّة أمام القارئ.',
					expectedInput: 'Présent de narration',
					revealAr: 'يُسمّى مضارع السرد (le présent de narration)، وهو يُضفي حيوية وسرعة على أحداث الحكاية.'
				},
				{
					promptAr: 'في الجملة الثانية داخل الحوار (« Je te remercie maintenant ! »)، ما قيمة المضارع؟',
					hintAr: 'الكلام يقع في لحظة التحدّث (maintenant).',
					expectedInput: 'Présent d’énonciation',
					revealAr: 'إنها قيمة المضارع الآني أو التلفظي (présent d’énonciation / présent actuel).'
				},
				{
					promptAr: 'في الجملة الثالثة (العبرة الأخلاقية في نهاية الحكاية)، ما قيمة المضارع في « triomphe »؟',
					hintAr: 'هل هذه الحكمة صحيحة اليوم فقط أم في كل زمان؟',
					expectedInput: 'Présent de vérité générale',
					revealAr: 'إنها قيمة الحقيقة العامة (présent de vérité générale)، وهي الزمن المفضّل لصياغة المغزى (la morale).'
				}
			]
		},
		summary: {
			rulesAr: [
				'في الحكاية الأخلاقية (la fable)، يُستعمل المضارع الإخباري بثلاث قيم رئيسة:',
				'1) مضارع السرد (Le présent de narration): يروي أحداثا وقعت في الماضي كأنها تحدث أمام أعيننا الآن، مما يجعل القصة حيّة ومشوّقة. مثال: « Le hérisson avance calmement et dépasse le chacal vantard. »',
				'2) المضارع الآني / التلفظي (Le présent d’énonciation): يظهر داخل الحوار حين تتكلم الشخصيات عمّا يجري لحظة الكلام (maintenant, en ce moment). مثال: « Regarde, je porte ce grain de blé ! »',
				'3) مضارع الحقيقة العامة (Le présent de vérité générale): يُستعمل لصياغة الحكمة والمغزى الأخلاقي (la morale) الصالح لكل زمان ومكان. مثال: « Le travail sérieux porte toujours ses fruits. »',
				'لتصريف مضارع السرد بنجاح راجع أفعال المجموعة الثالثة الكثيرة الورود في الحكايات: voir (voit/voient), dire (dit/disent), faire (fait/font), pouvoir (peut/peuvent), vouloir (veut/veulent), venir (vient/viennent).'
			],
			visualSvg: svgFrenchTenseTimeline({
				title: 'Pourquoi employer le présent de narration ?',
				tenseName: 'Présent de narration',
				formula: 'Récit au passé -> Action racontée au présent pour plus de vivacité',
				activeZone: 'present',
				example: 'Le chameau avance pas à pas, trouve l’oasis et aide son ami.',
				markers: 'Dans le récit (narration) | Dans le dialogue (énonciation) | Dans la morale (vérité)'
			}),
			visualCaptionAr: 'توضيح توظيف المضارع في السرد والحوار والمغزى داخل الحكاية',
			examples: [
				{
					problemAr: 'حدّد قيمة المضارع في كل جملة: 1) « L’union fait la force. »   2) « Soudain, la tortue tend une branche à son voisin. »',
					solutionAr: '1) Présent de vérité générale (حكمة عامة).   2) Présent de narration (مضارع السرد).'
				},
				{
					problemAr: 'حوّل الجملة من الماضي البسيط إلى مضارع السرد: « Le moineau trouva un épi et appela son frère. »',
					solutionAr: '« Le moineau trouve un épi et appelle son frère. »'
				}
			],
			watchOutAr:
				'فرّق بدقة في سؤال الامتحان بين مضارع السرد (يروي حدثا في القصة: Le cheval court) ومضارع الحقيقة العامة (يقدّم حكمة دائمة: La modestie élève l’homme)!'
		},
		practice: [
			{
				questionAr: 'ما قيمة المضارع في الحكمة الختامية: « La générosité attire l’amitié et le respect. »؟',
				options: [
					'Présent d’énonciation',
					'Présent de narration',
					'Présent de vérité générale',
					'Présent d’habitude personnelle'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'ليست حدثا آنيا في لحظة كلام فقط.',
					'ليست حدثا متسلسلا في القصة بل حكمة دائمة.',
					'أحسنت! العبرة الأخلاقية الدائمة تُصاغ بمضارع الحقيقة العامة.',
					'إنها قاعدة أخلاقية عامة للجميع.'
				],
				explanationAr: 'المغزى الأخلاقي الصالح لكل زمان يُعبّر عنه بمضارع الحقيقة العامة (vérité générale).'
			},
			{
				questionAr: 'ما قيمة المضارع في الجملة: « Ce matin-là, l’abeille travaillait dur. Soudain, le vent souffle et renverse le nid. »؟',
				options: [
					'Présent de narration',
					'Présent de vérité générale',
					'Présent d’énonciation',
					'Futur proche'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! جاء وسط سرد ماضٍ ليجعل المشهد حيّا (présent de narration).',
					'هذه ليست حكمة عامة بل حادثة محددة في الحكاية.',
					'ليست جملة داخل حوار مباشر.',
					'لا يوجد فعل aller + infinitif.'
				],
				explanationAr: 'استعمال المضارع وسط أحداث ماضية لإحيائها هو مضارع السرد (présent de narration).'
			},
			{
				questionAr: 'ما قيمة المضارع في قول النحلة داخل الحوار: « En ce moment, je récolte le nectar des fleurs. »؟',
				options: [
					'Présent de narration',
					'Présent d’énonciation (actuel)',
					'Présent de vérité générale',
					'Passé récent'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه جملة مباشرة من كلام الشخصية الآن.',
					'صحيح! العبارة « En ce moment » داخل الحوار تدل على المضارع الآني (énonciation).',
					'ليست حكمة عامة.',
					'لا تدل على ماضٍ قريب.'
				],
				explanationAr: 'ما يقال في لحظة التكلم داخل الحوار هو مضارع التلفظ / الآني (présent d’énonciation).'
			},
			{
				questionAr: 'حوّل إلى مضارع السرد: « Les deux oiseaux partagèrent le blé et rentrèrent heureux. »',
				options: [
					'Les deux oiseaux partagent le blé et rentrent heureux.',
					'Les deux oiseaux partageaient le blé et rentraient heureux.',
					'Les deux oiseaux partageront le blé et rentreront heureux.',
					'Les deux oiseaux ont partagé le blé.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! partagent و rentrent في المضارع الإخباري.',
					'هذا ماضٍ ناقص.',
					'هذا مستقبل بسيط.',
					'هذا ماضٍ مركب.'
				],
				explanationAr: 'في مضارع السرد نصرّف الفعلين في المضارع: partagent / rentrent.'
			},
			{
				questionAr: 'ما الفائدة الأسلوبية من استعمال مضارع السرد في الحكاية؟',
				options: [
					'إبطاء القصة وجعلها مملة',
					'جعل الأحداث أكثر حيوية وتقريبها من القارئ',
					'إلغاء الحوار من النص',
					'تحويل القصة إلى نص إرشادي'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'العكس تماما، مضارع السرد يسرّع الإيقاع ويشوّق القارئ.',
					'ممتاز! مضارع السرد يضفي حيوية (vivacité) ويجعل القارئ يعيش المشهد.',
					'مضارع السرد ينسجم تماما مع الحوار.',
					'الحكاية تبقى نصا سرديا.'
				],
				explanationAr: 'مضارع السرد يُكسب الحكاية حيوية وحضورا قويا.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 3 : Les types et formes de phrases (déclarative, interrogative, exclamative, impérative)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_2am_t2_types_formes_phrases',
		slug: 'fre-2am-t2-types-formes-phrases',
		grade: '2am',
		yearSubjectId: 625,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الثاني: الحكاية الأخلاقية على ألسنة الحيوانات — Projet 2 : La fable morale et la sagesse',
		order: 3,
		titleAr: 'أنواع الجمل وصيغها في الحوار والحكاية (Les types et formes de phrases)',
		objectives: [
			'التمييز بين أنواع الجمل الأربعة: الخبرية (déclarative)، الاستفهامية (interrogative)، التعجبية (exclamative)، والأمرية (impérative)',
			'التفريق بين نوع الجملة (le type) وصيغتها (la forme : affirmative ou négative)',
			'توظيف أنواع الجمل الأربعة داخل حوار حكاية أخلاقية لتنويع الأسلوب'
		],
		keywordsAr: ['Types de phrases', 'Interrogative', 'Exclamative', 'Impérative', 'Affirmative / Négative'],
		discover: {
			scenarioAr:
				'في حوار بين الحصان والبغل المغرور، وردت أربع جمل مختلفة: 1) « La route de la montagne est longue. » 2) « Peux-tu m’aider à porter ce sac ? » 3) « Quelle belle entraide ! » 4) « Ne méprise jamais ton compagnon ! » لاحظ تنوّع علامات الترقيم والمقاصد.',
			svg: svgFrenchGrammarMap({
				title: 'Les 4 types de phrases (+ 2 formes)',
				rootLabel: 'Chaque phrase a 1 type + 1 forme',
				rootSub: 'Forme affirmative OU Forme négative',
				branches: [
					{
						label: 'Déclarative (.)',
						rule: 'Informe ou raconte',
						example: 'Le chameau avance calmement.',
						color: '#1d4ed8'
					},
					{
						label: 'Interrogative (?)',
						rule: 'Pose une question',
						example: 'Où vas-tu si vite ?',
						color: '#047857'
					},
					{
						label: 'Exclamative (!)',
						rule: 'Exprime un sentiment',
						example: 'Comme tu es sage !',
						color: '#b45309'
					},
					{
						label: 'Impérative (. / !)',
						rule: 'Donne un conseil ou ordre',
						example: 'Travaille avec patience !',
						color: '#7c3aed'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما نوع الجملة الثانية « Peux-tu m’aider à porter ce sac ? »؟',
					hintAr: 'تنتهي بعلامة استفهام (؟) وفيها قلب الفعل والفاعل.',
					expectedInput: 'Phrase interrogative',
					revealAr: 'إنها جملة استفهامية (phrase interrogative) تطرح سؤالا.'
				},
				{
					promptAr: 'ما الفرق بين الجملة الثالثة « Quelle belle entraide ! » والرابعة « Ne méprise jamais ton compagnon ! » رغم أنهما تنتهيان بعلامة تعجب (!)؟',
					hintAr: 'هل الجملة الرابعة فيها فعل في الأمر أم تعجّب؟',
					expectedInput: 'Exclamative vs Impérative',
					revealAr: 'الثالثة تعجبية (تعبّر عن الإعجاب بـ Quelle)، أما الرابعة فأمرية (تبدأ بفعل في الأمر مع النهي ne...jamais).'
				},
				{
					promptAr: 'ما صيغة (la forme) الجملة الرابعة « Ne méprise jamais ton compagnon ! »؟',
					hintAr: 'هل هي مثبتة (affirmative) أم منفية (négative)؟',
					expectedInput: 'Forme négative',
					revealAr: 'صيغتها منفية (forme négative) لوجود « Ne ... jamais »؛ إذن هي جملة أمرية منفية!'
				}
			]
		},
		summary: {
			rulesAr: [
				'لكل جملة في الفرنسية نوع واحد من الأنواع الأربعة (4 types) وصيغة واحدة من الصيغتين (affirmative أو négative):',
				'1) الجملة الخبرية (Déclarative): تقدّم خبرا أو فكرة وتنتهي بنقطة (.). مثال: « La tortue avance lentement. »',
				'2) الجملة الاستفهامية (Interrogative): تطرح سؤالا وتنتهي بعلامة استفهام (?). تُصاغ بـ Est-ce que أو بقلب الفعل والفاعل أو بكلمة استفهام (Pourquoi, Où, Comment).',
				'3) الجملة التعجبية (Exclamative): تعبّر عن الدهشة أو الفرح أو الإعجاب وتنتهي بـ (!) وتبدأ غالبا بـ (Quel / Quelle / Comme / Que). مثال: « Comme cette abeille est travailleuse ! »',
				'4) الجملة الأمرية (Impérative): تعطي نصيحة أو أمرا أو نهيا، ويُصرّف فعلها في الأمر دون ضمير، وتنتهي بنقطة أو علامة تعجب. مثال: « Partage ton pain avec ton voisin ! »'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Type vs Forme : Ne pas confondre !',
				subtitle: 'Tout type peut être affirmatif ou négatif',
				columns: [
					{
						header: 'Interrogative',
						rule: 'Aff. ou Nég. (?)',
						examples: 'Ne viens-tu pas aider ?',
						color: '#1d4ed8'
					},
					{
						header: 'Impérative',
						rule: 'Aff. ou Nég. (. / !)',
						examples: 'Ne sois pas orgueilleux !',
						color: '#047857'
					},
					{
						header: 'Exclamative',
						rule: 'Quel / Quelle / Comme (!)',
						examples: 'Quelle grande sagesse !',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'تقاطع أنواع الجمل الأربعة مع الصيغتين المثبتة والمنفية',
			examples: [
				{
					problemAr: 'حدّد نوع وصيغة الجملة: « Ne gaspille jamais tes provisions ! »',
					solutionAr: 'النوع: phrase impérative | الصيغة: forme négative.'
				},
				{
					problemAr: 'حوّل الجملة الخبرية إلى تعجبية ثم استفهامية: « Ce hérisson est sage. »',
					solutionAr: 'تعجبية: « Comme ce hérisson est sage ! » (أو Quel sage hérisson !).   استفهامية: « Ce hérisson est-il sage ? » (أو Est-ce que ce hérisson est sage ?).'
				}
			],
			watchOutAr:
				'لا تستعجل وتقول إن كل جملة تنتهي بـ (!) هي جملة تعجبية! تحقّق أولا: إذا بدأت بفعل مصرف في الأمر (Écoute ! Ne mens pas !) فهي جملة أمرية (impérative) وليست تعجبية.'
		},
		practice: [
			{
				questionAr: 'ما نوع وصيغة الجملة: « Ne te moque jamais des plus faibles ! »؟',
				options: [
					'Exclamative à la forme affirmative',
					'Impérative à la forme négative',
					'Déclarative à la forme négative',
					'Interrogative à la forme négative'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'فيها فعل في الأمر (moque) وأداة نفي (Ne...jamais).',
					'أحسنت! إنها جملة أمرية في الصيغة المنفية.',
					'تبدأ بفعل أمر دون ضمير فاعل.',
					'لا يوجد سؤال ولا علامة استفهام.'
				],
				explanationAr: 'الفعل في الأمر مع « Ne ... jamais » يعطي جملة أمرية منفية.'
			},
			{
				questionAr: 'أيّ جملة هي جملة تعجبية (phrase exclamative)؟',
				options: [
					'Écoute ce conseil précieux !',
					'Quelle belle leçon de patience !',
					'Pourquoi dors-tu toute la journée ?',
					'Le chameau avance dans le désert.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'تبدأ بفعل أمر (Écoute) فهي أمرية.',
					'ممتاز! تبدأ بأداة التعجب « Quelle » وتنتهي بـ (!).',
					'هذه جملة استفهامية.',
					'هذه جملة خبرية.'
				],
				explanationAr: '« Quelle belle leçon de patience ! » تعبّر عن الإعجاب فهي تعجبية.'
			},
			{
				questionAr: 'حوّل الجملة التالية إلى جملة استفهامية بقلب الفعل والفاعل: « Tu partages ton blé. »',
				options: [
					'Partages-tu ton blé ?',
					'Tu partages-tu ton blé ?',
					'Partage ton blé !',
					'Comme tu partages ton blé !'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! قلبنا الفعل والضمير مع وضع مطّة (-): Partages-tu ton blé ?',
					'لا نكرر الضمير tu مرتين.',
					'هذه جملة أمرية.',
					'هذه جملة تعجبية.'
				],
				explanationAr: 'الاستفهام بالقلب (inversion) يضع الفعل ثم مطّة ثم الضمير: Partages-tu ton blé ?'
			},
			{
				questionAr: 'أكمل الجملة التعجبية بأداة التعجب المناسبة: « ...... magnifique solidarité ! »',
				options: ['Quel', 'Quelle', 'Quels', 'Quelles'],
				correctIndex: 1,
				diagnosticFeedback: [
					'solidarité اسم مؤنث وليس مذكرا.',
					'أحسنت! solidarité مؤنث مفرد فنختار « Quelle ».',
					'solidarité مفرد مذكر؟ لا بل مؤنث مفرد.',
					'solidarité مفرد وليس جمعا.'
				],
				explanationAr: 'كلمة « solidarité » مؤنث مفرد، فتطابقها « Quelle ».'
			},
			{
				questionAr: 'ما نوع الجملة: « Le travail et la persévérance mènent au succès. »؟',
				options: ['Impérative', 'Exclamative', 'Déclarative', 'Interrogative'],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا تعطي أمرا بفعل أمر.',
					'لا تنتهي بعلامة تعجب.',
					'ممتاز! تقدّم معلومة عامة وتنتهي بنقطة فهي خبرية (déclarative).',
					'لا تطرح سؤالا.'
				],
				explanationAr: 'الجملة التي تقرّر حقيقة وتنتهي بنقطة هي جملة خبرية (déclarative).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 4 : Les adverbes de manière (-ment) et l'accord des adjectifs
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_2am_t2_adverbes_accord_adj',
		slug: 'fre-2am-t2-adverbes-accord-adj',
		grade: '2am',
		yearSubjectId: 625,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الثاني: الحكاية الأخلاقية على ألسنة الحيوانات — Projet 2 : La fable morale et la sagesse',
		order: 4,
		titleAr: 'ظروف الطريقة المنتهية بـ -ment ومطابقة الصفات (Les adverbes de manière et l’accord des adjectifs)',
		objectives: [
			'بناء ظرف الطريقة (l’adverbe de manière) من الصفة النعتية باستعمال القواعد الثلاث: (مؤنث + -ment / علة + -ment / -ent -> -emment و -ant -> -amment)',
			'إدراك أن الظرف كلمة ثابتة لا تتغير (invariable) بينما الصفة تطابق الاسم الموصوف',
			'استعمال ظروف الطريقة لتدقيق سلوك شخصيات الحكاية (patiemment, courageusement, poliment, prudemment)'
		],
		keywordsAr: ['Adverbe de manière', '-ment / -emment / -amment', 'Mot invariable', 'Accord adjectif', 'ظروف الطريقة'],
		discover: {
			scenarioAr:
				'قارن بين الصفات وظروف الطريقة في حكاية « السلحفاة الحكيمة »: « La tortue est lente -> Elle marche lentement. Elle est polie -> Elle répond poliment. Elle est prudente -> Elle avance prudemment. Elle est constante -> Elle travaille constamment. » لاحظ كيف تغيّرت نهاية كل كلمة!',
			svg: svgFrenchWordFormation({
				title: 'Former un adverbe de manière en -ment',
				prefix: '—',
				root: 'courageuse (fém.)',
				suffix: '-ment',
				derivedWord: 'courageusement',
				meaningNote: 'Adjectif variable (courageux/courageuse) -> Adverbe invariable (courageusement)'
			}),
			steps: [
				{
					promptAr: 'كيف شكّلنا الظرف « lentement » من الصفة « lent »؟',
					hintAr: 'أنّثنا الصفة أولا (lente) ثم أضفنا اللاحقة.',
					expectedInput: 'Féminin + -ment',
					revealAr: 'القاعدة العامة: نأخذ مؤنث الصفة (lente) ونضيف « -ment »: lent -> lente -> lentement.'
				},
				{
					promptAr: 'لماذا كتبنا « poliment » بدون « e » رغم أن مؤنث « poli » هو « polie »؟',
					hintAr: 'بأيّ حرف ينتهي المذكر « poli » (حرف علة أم ساكن)؟',
					expectedInput: 'Voyelle + -ment',
					revealAr: 'لأن الصفة المذكرة « poli » تنتهي بحرف علة (i)، فنضيف « -ment » مباشرة دون « e »: poli -> poliment, vrai -> vraiment.'
				},
				{
					promptAr: 'ماذا حدث للصفة « prudent » (-ent) والصفة « constant » (-ant) عند تحويلهما إلى ظرفين؟',
					hintAr: 'انظر إلى حرفي « mm » في prudemment و constamment.',
					expectedInput: '-emment et -amment',
					revealAr: 'الصفة المنتهية بـ « -ent » تصبح « -emment » (prudemment / patiemment)، والمنتهية بـ « -ant » تصبح « -amment » (constamment / méchamment).'
				}
			]
		},
		summary: {
			rulesAr: [
				'ظرف الطريقة (L’adverbe de manière) كلمة ثابتة لا تتغير أبدا (invariable)، تُغني الفعل وتجيب عن السؤال « Comment ? ».',
				'القاعدة 1 (الأكثر شيوعا): مؤنث الصفة + (-ment). أمثلة: doux -> douce -> doucement / courageux -> courageuse -> courageusement / actif -> active -> activement / fier -> fière -> fièrement.',
				'القاعدة 2 (الصفة المذكرة المنتهية بحرف علة i, é, u, e): مذكر + (-ment). أمثلة: poli -> poliment / sage -> sagement / calme -> calmement / vrai -> vraiment.',
				'القاعدة 3: الصفة المنتهية بـ (-ent) -> (-emment) (تُنطق /aman/): patient -> patiemment / prudent -> prudemment. الصفة المنتهية بـ (-ant) -> (-amment): élégant -> élégamment / suffisant -> suffisamment.',
				'حالة خاصة شائعة: gentil -> gentiment (بـ m واحدة).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Les 3 règles de formation des adverbes en -ment',
				subtitle: 'Attention : l’adverbe est toujours INVARIABLE',
				columns: [
					{
						header: 'Féminin + -ment',
						rule: 'Cas général',
						examples: 'douce -> doucement / vive -> vivement',
						color: '#1d4ed8'
					},
					{
						header: 'Voyelle + -ment',
						rule: 'Adj. masc. en e, i, u',
						examples: 'sage -> sagement / poli -> poliment',
						color: '#047857'
					},
					{
						header: '-ent / -ant',
						rule: '-emment / -amment',
						examples: 'prudent -> prudemment / brillant -> brillamment',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'ملخص القواعد الثلاث لتكوين ظروف الطريقة المنتهية بـ -ment',
			examples: [
				{
					problemAr: 'كوّن ظرف الطريقة من كل صفة: 1) généreux   2) patient   3) poli   4) méchant.',
					solutionAr: '1) généreusement   2) patiemment   3) poliment   4) méchamment.'
				},
				{
					problemAr: 'صحّح الخطأ في الجملة: « Les abeilles travaillent actives et patiemments. »',
					solutionAr: '« Les abeilles actives travaillent activement et patiemment. » (الظرف لا يأخذ s أبدا).'
				}
			],
			watchOutAr:
				'خطأ شائع جدا: إضافة « s » إلى الظرف عندما يكون الفاعل جمعا! تذكّر: « Les abeilles travaillent courageusement » (دون s في آخر الظرف أبدا).'
		},
		practice: [
			{
				questionAr: 'ما ظرف الطريقة الصحيح المشتق من الصفة « patient »؟',
				options: ['patientement', 'patiamment', 'patiemment', 'patientment'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الصفة المنتهية بـ -ent تأخذ -emment لا -ement.',
					'الصفة تنتهي بـ -ent (e) وليس بـ -ant (a).',
					'أحسنت! patient (-ent) -> patiemment (-emment).',
					'صيغة غير صحيحة.'
				],
				explanationAr: 'الصفات المنتهية بـ « -ent » تتحول إلى « -emment »: patient -> patiemment.'
			},
			{
				questionAr: 'ما ظرف الطريقة الصحيح المشتق من الصفة « généreux »؟',
				options: ['généreuxment', 'généreusement', 'généreusment', 'généreusementes'],
				correctIndex: 1,
				diagnosticFeedback: [
					'نؤّنث الصفة أولا: généreuse.',
					'ممتاز! مؤنث الصفة (généreuse) + ment = généreusement.',
					'ينقصها الحرف e بعد s.',
					'الظرف كلمة ثابتة لا تتغير ولا تُجمع.'
				],
				explanationAr: 'نأخذ المؤنث « généreuse » ثم نضيف « -ment »: généreusement.'
			},
			{
				questionAr: 'ما ظرف الطريقة الصحيح من الصفة « poli »؟',
				options: ['poliement', 'poliment', 'polimment', 'polie'],
				correctIndex: 1,
				diagnosticFeedback: [
					'بما أن poli ينتهي بحرف علة (i)، نحذف e المؤنث.',
					'صحيح! poli -> poliment.',
					'لا نضاعف الحرف m هنا.',
					'polie صفة مؤنثة وليست ظرفا.'
				],
				explanationAr: 'الصفة المذكرة المنتهية بحرف علة (poli) تأخذ « -ment » مباشرة: poliment.'
			},
			{
				questionAr: 'ما ظرف الطريقة الصحيح من الصفة « brillant »؟',
				options: ['brillantement', 'brillemment', 'brillamment', 'brillantment'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الصفة المنتهية بـ -ant تتحول إلى -amment.',
					'تنتهي بـ -ant (a) وليس -ent (e).',
					'أحسنت! brillant -> brillamment.',
					'صيغة غير صحيحة.'
				],
				explanationAr: 'الصفات المنتهية بـ « -ant » تأخذ اللاحقة « -amment »: brillamment.'
			},
			{
				questionAr: 'اختر الجملة الخالية من الأخطاء في الصفات والظروف:',
				options: [
					'Les fourmis laborieuses travaillent courageusements.',
					'Les fourmis laborieuses travaillent courageusement.',
					'Les fourmis laborieux travaillent courageusement.',
					'Les fourmis laborieuse travaillent courageusement.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الظرف courageusement لا يأخذ s أبدا.',
					'ممتاز! الصفة تطابق الاسم (laborieuses) والظرف يبقى ثابتا (courageusement).',
					'fourmis اسم مؤنث جمع (laborieuses).',
					'يجب إضافة s للصفة الجمع (laborieuses).'
				],
				explanationAr: 'الصفة تطابق الاسم المؤنث الجمع (laborieuses) بينما الظرف ثابت لا يتغير (courageusement).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 5 : Rédiger une courte fable originale (sagesse, travail, générosité)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_2am_t2_rediger_fable_morale',
		slug: 'fre-2am-t2-rediger-fable-morale',
		grade: '2am',
		yearSubjectId: 625,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع الثاني: الحكاية الأخلاقية على ألسنة الحيوانات — Projet 2 : La fable morale et la sagesse',
		order: 5,
		titleAr: 'كتابة حكاية أخلاقية قصيرة على ألسنة الحيوانات (Rédiger une courte fable morale originale)',
		objectives: [
			'ابتكار حكاية حيوانية قصيرة وأصيلة تتضمن شخصيتين متقابلتين في الصفات (المجتهد مقابل الكسول، المتواضع مقابل المغرور)',
			'إدراج حوار منظم بعلامات الترقيم الصحيحة وأفعال القول المتنوعة وأنواع الجمل الأربعة',
			'صياغة عبرة أخلاقية (une morale) بليغة في مضارع الحقيقة العامة في نهاية الحكاية'
		],
		keywordsAr: ['Fable originale', 'Dialogue', 'Morale', 'Sagesse et travail', 'Production écrite'],
		discover: {
			scenarioAr:
				'أرادت سلمى كتابة حكاية قصيرة لمجلة المدرسة تُبرز قيمة التواضع والعمل الجاد. اختارت شخصيتين من الطبيعة الجزائرية: القنفذ الحكيم (le hérisson sage) وابن آوى المغرور (le chacal orgueilleux)، وكتبت بينهما حوارا حيويا ينتهي بحكمة رائعة.',
			svg: svgFrenchWritingBlueprint({
				title: 'Construire une courte fable originale (2AM)',
				steps: [
					{ stage: 'Titre & Décor', detail: '2 animaux opposés + lieu naturel (présent ou imparfait)', color: '#1d4ed8' },
					{ stage: 'Rencontre', detail: 'Situation où leurs caractères s’opposent (adjectifs + adverbes)', color: '#047857' },
					{ stage: 'Dialogue vivant', detail: '3 à 4 répliques avec (: « » —), verbes de parole et ? / !', color: '#b45309' },
					{ stage: 'Issue & Morale', detail: 'Résultat logique + morale au présent de vérité générale', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'لماذا نختار غالبا شخصيتين متضادتين في الصفات عند كتابة حكاية أخلاقية؟',
					hintAr: 'مثل النحلة المجتهدة والخنفساء الكسولة، أو السلحفاة الكريمة ومالك الحزين الأناني.',
					expectedInput: 'Pour faire ressortir la morale',
					revealAr: 'لإبراز الفرق بين السلوك الحميد والسلوك المذموم وجعل العبرة الأخلاقية واضحة ومقنعة.'
				},
				{
					promptAr: 'ما العناصر التي تمنح الحوار داخل الحكاية حياة وتشويقا؟',
					hintAr: 'تذكّر الدروس الثلاثة السابقة (الترقيم، أفعال القول، أنواع الجمل).',
					expectedInput: 'Ponctuation, verbes de parole et types de phrases',
					revealAr: 'علامات الترقيم الدقيقة (: « » —)، وأفعال القول المتنوعة، وتنويع الجمل (استفهام، تعجب، أمر).'
				},
				{
					promptAr: 'بأيّ زمن نكتب الجملة الأخيرة التي تلخّص المغزى (la morale)؟',
					hintAr: 'تذكّر درس قِيَم المضارع.',
					expectedInput: 'Présent de vérité générale',
					revealAr: 'نكتب المغزى في مضارع الحقيقة العامة (présent de vérité générale) ليكون صالحا لكل زمان.'
				}
			]
		},
		summary: {
			rulesAr: [
				'العنوان: يجمع اسمي الحيوانين المتقابلين، مثل: « L’abeille laborieuse et le scarabée paresseux » أو « La tortue généreuse et le héron égoïste ».',
				'التمهيد (سطران): يقدّم المكان والزمان والشخصيتين باستعمال الصفات النعتية ومضارع السرد.',
				'الحوار (3 إلى 4 مداخلات قصيرة): يحترم النقطتين والمزدوجتين والعارضات، وينوّع بين أفعال القول (demande, répond, conseille, s’exclame) وظروف الطريقة (poliment, fièrement, patiemment).',
				'النهاية والمغزى (سطران): تظهر نتيجة تصرّف كل حيوان، ثم تُختم القصة بسطر مستقل للمغزى (Morale : ...) في مضارع الحقيقة العامة.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Couples d’animaux & morales originales (2AM T2)',
				rootLabel: 'Idées de fables originales',
				rootSub: 'Travail, modestie, patience et générosité',
				branches: [
					{
						label: 'Travail / Effort',
						rule: 'Abeille vs Scarabée',
						example: 'L’effort d’aujourd’hui prépare demain.',
						color: '#1d4ed8'
					},
					{
						label: 'Patience / Sagesse',
						rule: 'Chameau vs Gazelle pressée',
						example: 'La patience dépasse la précipitation.',
						color: '#047857'
					},
					{
						label: 'Générosité / Entraide',
						rule: 'Tortue vs Héron égoïste',
						example: 'Celui qui aide trouve toujours un ami.',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'نماذج أصيلة لثنائيات حيوانية وحكم أخلاقية للوضعية الإدماجية',
			examples: [
				{
					problemAr: 'اكتب مداخلتين حواريتين بين الجمل الصبور والغزالة المستعجلة.',
					solutionAr: 'La gazelle pressée demande au chameau : « Pourquoi marches-tu si lentement ? — Parce que le désert est vaste et que la patience économise les forces ! » répond calmement le chameau.'
				},
				{
					problemAr: 'صُغ مغزى (une morale) في مضارع الحقيقة العامة عن التواضع.',
					solutionAr: '« Morale : La modestie et la sagesse l’emportent toujours sur l’orgueil. »'
				}
			],
			watchOutAr:
				'انتبه! لا تنسَ وضع المزدوجتين والعارضة عند تغيّر المتكلم، وتأكّد أن الحيوانات في حكايتك تقدّم سلوكا أخلاقيا نبيلا يناسب سنّ التلميذ وقيمه.'
		},
		practice: [
			{
				questionAr: 'أيّ عنوان يناسب حكاية أخلاقية على ألسنة الحيوانات؟',
				options: [
					'L’énergie solaire en Algérie',
					'Le hérisson sage et le chacal orgueilleux',
					'Le lavage des mains avant les repas',
					'La nominalisation des verbes'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذا عنوان نص تفسيري علمي.',
					'أحسنت! يجمع حيوانين بصفتين متقابلتين تبرز منهما الحكمة.',
					'هذا عنوان نص تفسيري عن النظافة.',
					'هذا عنوان درس لغوي.'
				],
				explanationAr: 'عنوان الحكاية يقدّم غالبا الشخصيتين الحيوانيتين وصفتيهما المتقابلتين.'
			},
			{
				questionAr: 'ما العناصر الواجب توافرها في الحوار داخل الحكاية؟',
				options: [
					'النقطتان والمزدوجتان والعارضات وأفعال القول المتنوعة',
					'عدم وضع أي علامة ترقيم',
					'تكرار الفعل « dit » في كل جملة',
					'استعمال المستقبل البسيط فقط'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! هذه هي القواعد الأساسية للحوار السردي السليم.',
					'بدون ترقيم يصعب التمييز بين السرد وكلام الشخصيات.',
					'يجب تنويع أفعال القول حسب المعنى.',
					'المضارع (سرد/تلفظ) هو الأنسب هنا.'
				],
				explanationAr: 'الحوار السليم يحترم (: « » —) وينوّع أفعال القول وأنواع الجمل.'
			},
			{
				questionAr: 'أيّ جملة تصلح مغزى (une morale) لحكاية عن التعاون بين عصفورين؟',
				options: [
					'Hier, deux oiseaux ont vu un arbre.',
					'L’entraide et le partage rendent les petits plus forts.',
					'Où habitent les moineaux ?',
					'Le vent soufflait fort ce soir-là.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه جملة سردية في الماضي وليست عبرة.',
					'صحيح! جملة عامة موجزة في مضارع الحقيقة العامة تلخّص الحكمة.',
					'هذا سؤال وليس مغزى.',
					'هذه جملة وصفية.'
				],
				explanationAr: 'المغزى يكون جملة عامة بليغة في مضارع الحقيقة العامة.'
			},
			{
				questionAr: 'أكمل الجملة السردية بظرف طريقة مناسب: « Le cheval fidèle répond ...... à son compagnon inquiet. » (calme)',
				options: ['calme', 'calmement', 'calmes', 'calmant'],
				correctIndex: 1,
				diagnosticFeedback: [
					'calme صفة وليست ظرف طريقة.',
					'أحسنت! calme (ينتهي بحرف علة e) + ment = calmement.',
					'calmes صفة جمع.',
					'calmant اسم فاعل/صفة.'
				],
				explanationAr: 'ظرف الطريقة من « calme » هو « calmement ».'
			},
			{
				questionAr: 'أيّ مداخلة حوارية مكتوبة بترقيم سليم تماما؟',
				options: [
					'L’abeille conseille à son voisin : « Prépare tes réserves avant l’hiver ! »',
					'L’abeille conseille à son voisin Prépare tes réserves avant l’hiver',
					'L’abeille conseille : Prépare tes réserves « avant l’hiver ! »',
					'L’abeille, conseille à son voisin ? « Prépare tes réserves. »'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! النقطتان قبل المزدوجتين، الحرف الكبير في البداية، وعلامة التعجب قبل الإغلاق.',
					'تغيب النقطتان والمزدوجتان وعلامة النهاية.',
					'موضع فتح المزدوجتين خاطئ.',
					'علامات الترقيم قبل الحوار خاطئة.'
				],
				explanationAr: 'الكتابة السليمة تضع (:) ثم « ثم حرفا كبيرا ثم النص ثم علامة الترقيم ثم ».'
			}
		]
	}
];
