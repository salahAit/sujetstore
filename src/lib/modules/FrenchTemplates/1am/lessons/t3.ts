import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWordFormation,
	svgFrenchWritingBlueprint
} from '../../svg-french';

export const LESSONS_1AM_T3: FrenchInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 1 : L'impératif présent et les verbes de devoir (il faut + infinitif)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_1am_t3_imperatif_devoir',
		slug: 'fre-1am-t3-imperatif-devoir',
		grade: '1am',
		yearSubjectId: 615,
		trimesterId: 't3',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع الثالث: حماية البيئة والنص الإرشادي — Projet 3 : Protéger l’environnement (Le texte prescriptif)',
		order: 1,
		titleAr: 'صيغة الأمر وأفعال الوجوب (L’impératif présent et « il faut + infinitif »)',
		objectives: [
			'التعرّف على النص الإرشادي (le texte prescriptif) الذي يقدّم تعليمات ونصائح لحماية البيئة',
			'تصريف الأفعال في صيغة الأمر الحاضر (l’impératif présent) مع الضمائر الثلاثة (tu, nous, vous) دون كتابة الضمير',
			'صياغة النصائح والإرشادات البيئية باستعمال « il faut + infinitif » والفعل « devoir »'
		],
		keywordsAr: ['Texte prescriptif', 'Impératif présent', 'il faut + infinitif', 'devoir', 'النص الإرشادي'],
		discover: {
			scenarioAr:
				'علّق نادي البيئة بالمتوسطة ملصقا يضمّ ثلاث جمل: « Ferme le robinet après usage ! » — « Protégeons nos forêts algériennes ! » — « Il faut planter des arbres et nous devons trier nos déchets. » لاحظ غياب الضمائر الشخصية أمام أفعال الأمر، ومجيء المصدر بعد « il faut ».',
			svg: svgFrenchGrammarMap({
				title: 'Donner des consignes écologiques (Texte prescriptif)',
				rootLabel: 'Exprimer un conseil ou une consigne',
				rootSub: 'Comment inciter à protéger la nature ?',
				branches: [
					{
						label: 'Impératif présent',
						rule: 'Sans pronom sujet (tu / nous / vous)',
						example: 'Ferme ! Protégeons ! Plantez !',
						color: '#1d4ed8'
					},
					{
						label: 'Il faut + Infinitif',
						rule: 'Tournure impersonnelle invariable',
						example: 'Il faut économiser l’eau.',
						color: '#047857'
					},
					{
						label: 'Verbe devoir',
						rule: 'devoir (présent) + Infinitif',
						example: 'Nous devons respecter la forêt.',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'هل كتبنا الضمير « Tu » أو « Nous » أمام الفعلين « Ferme ! » و « Protégeons ! »؟',
					hintAr: 'انظر إلى بداية الجملتين في الملصق البيئي.',
					expectedInput: 'Non, sans pronom',
					revealAr: 'لا! في صيغة الأمر (l’impératif présent) نحذف الضمير الشخصي الفاعل دائما.'
				},
				{
					promptAr: 'لماذا كُتب الفعل « Ferme » بدون « s » في آخره مع المخاطب المفرد (tu)؟',
					hintAr: 'ما مجموعة الفعل « fermer »؟',
					expectedInput: '1er groupe sans s',
					revealAr: 'أفعال المجموعة الأولى (-er) في الأمر مع (tu) لا تأخذ « s »: Ferme ! Plante ! Économise !'
				},
				{
					promptAr: 'في أيّ صيغة جاء الفعل « planter » بعد عبارة « Il faut »؟',
					hintAr: 'هل هو مصرف أم في المصدر (à l’infinitif)؟',
					expectedInput: 'À l’infinitif',
					revealAr: 'جاء في المصدر (à l’infinitif) لأن « Il faut » و « devoir » يُتبعان دائما بفعل في المصدر.'
				}
			]
		},
		summary: {
			rulesAr: [
				'النص الإرشادي (Le texte prescriptif) يقدّم نصائح وتعليمات (des conseils et des consignes) لتوجيه السلوك نحو حماية الماء والغابات والبيئة.',
				'صيغة الأمر الحاضر (L’impératif présent) تُصرّف مع ثلاثة أشخاص فقط دون كتابة الضمير: (2e pers. sing / 1re pers. pl / 2e pers. pl).',
				'نهايات المجموعة الأولى (-er) في الأمر: (-e / -ons / -ez) بدون (s) مع المفرد! مثال: protéger -> Protège ! Protégeons ! Protégez ! (وكذلك aller -> Va !).',
				'نهايات المجموعة الثانية (-ir) في الأمر: (-is / -issons / -issez). مثال: choisir -> Choisis ! Choisissons ! Choisissez !',
				'يمكن تحويل جملة الأمر إلى صيغة الوجوب بـ « Il faut + infinitif » أو « Il ne faut pas + infinitif »: « Ne gaspille pas l’eau ! » -> « Il ne faut pas gaspiller l’eau. »'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Conjugaison à l’impératif présent',
				subtitle: 'Attention : jamais de pronom sujet devant le verbe !',
				columns: [
					{
						header: '1er groupe (-er)',
						rule: '-e / -ons / -ez (pas de -s)',
						examples: 'Plante / Plantons / Plantez',
						color: '#1d4ed8'
					},
					{
						header: '2e groupe (-ir)',
						rule: '-is / -issons / -issez',
						examples: 'Agis / Agissons / Agissez',
						color: '#047857'
					},
					{
						header: '3e groupe & Être',
						rule: 'Prends / Fais / Sois / Soyons',
						examples: 'Faisons / Soyez responsables',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'جدول تصريف الأمر الحاضر لأفعال المجموعات الثلاث مع الانتباه لغياب الـ s في المجموعة الأولى',
			examples: [
				{
					problemAr: 'حوّل النصيحة من « il faut » إلى صيغة الأمر مع (vous): « Il faut jeter les déchets dans la poubelle. »',
					solutionAr: '« Jetez les déchets dans la poubelle ! »'
				},
				{
					problemAr: 'حوّل إلى « il ne faut pas + infinitif »: « Ne coupez pas les arbres ! »',
					solutionAr: '« Il ne faut pas couper les arbres. »'
				}
			],
			watchOutAr:
				'احذر من خطأين شائعين: لا تكتب « Tu économises l’eau ! » في الأمر، ولا تضف « s » لأفعال المجموعة الأولى مع المفرد؛ اكتب: « Économise l’eau ! »'
		},
		practice: [
			{
				questionAr: 'اختر الصيغة الصحيحة للأمر المفرد (2e pers. sing.) للفعل « économiser »:',
				options: [
					'Tu économises l’eau !',
					'Économises l’eau !',
					'Économise l’eau !',
					'Économiser l’eau !'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا نكتب الضمير Tu في الأمر.',
					'أفعال المجموعة الأولى (-er) لا تأخذ s في الأمر المفرد.',
					'أحسنت! بدون ضمير وبدون s: Économise l’eau !',
					'هذا مصدر وليس أمرا مصرفا.'
				],
				explanationAr: 'أفعال المجموعة الأولى في الأمر المفرد تنتهي بـ « -e » دون ضمير: Économise !'
			},
			{
				questionAr: 'حوّل إلى صيغة « Il faut + infinitif »: « Protégeons les forêts ! »',
				options: [
					'Il faut protégeons les forêts.',
					'Il faut protéger les forêts.',
					'Il faut protège les forêts.',
					'Il faut protégé les forêts.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'بعد « Il faut » نضع المصدر وليس الفعل المصرف.',
					'ممتاز! Il faut + المصدر (protéger).',
					'protège مصرف وليس مصدرا.',
					'protégé اسم مفعول وليس مصدرا.'
				],
				explanationAr: 'العبارة « Il faut » يُتبعها دائما الفعل في المصدر: « Il faut protéger les forêts. »'
			},
			{
				questionAr: 'ما تصريف الفعل « agir » (المجموعة الثانية) في الأمر مع (nous)؟',
				options: ['Agis !', 'Agissons !', 'Agissez !', 'Nous agissons !'],
				correctIndex: 1,
				diagnosticFeedback: [
					'Agis للمفرد المخاطب.',
					'صحيح! Agissons pour la nature !',
					'Agissez للجمع المخاطب (vous).',
					'في الأمر نحذف الضمير nous.'
				],
				explanationAr: 'تصريف « agir » في الأمر مع (nous) هو: Agissons !'
			},
			{
				questionAr: 'ما تصريف الفعل « être » في الأمر مع (vous) في: « ...... responsables face à la nature ! »؟',
				options: ['Êtes', 'Sois', 'Soyons', 'Soyez'],
				correctIndex: 3,
				diagnosticFeedback: [
					'Êtes صيغة المضارع الإخباري وليست الأمر.',
					'Sois للمفرد المخاطب (tu).',
					'Soyons للمتكلم الجمع (nous).',
					'أحسنت! أمر être مع vous هو Soyez.'
				],
				explanationAr: 'تصريف « être » في الأمر: Sois / Soyons / Soyez.'
			},
			{
				questionAr: 'أكمل الجملة بفعل مناسب: « Nous ...... respecter la propreté de notre quartier. » (devoir)',
				options: ['doit', 'devez', 'devons', 'doivent'],
				correctIndex: 2,
				diagnosticFeedback: [
					'doit للمفرد الغائب (il/elle).',
					'devez مع الضمير vous.',
					'ممتاز! Nous devons + المصدر (respecter).',
					'doivent مع الضمير ils/elles.'
				],
				explanationAr: 'تصريف « devoir » في المضارع مع « nous » هو: nous devons.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 2 : Les connecteurs d'énumération (d'abord, ensuite, puis, enfin)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_1am_t3_connecteurs_enumeration',
		slug: 'fre-1am-t3-connecteurs-enumeration',
		grade: '1am',
		yearSubjectId: 615,
		trimesterId: 't3',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع الثالث: حماية البيئة والنص الإرشادي — Projet 3 : Protéger l’environnement (Le texte prescriptif)',
		order: 2,
		titleAr: 'روابط التعداد والترتيب (Les connecteurs d’énumération : d’abord, ensuite, puis, enfin)',
		objectives: [
			'معرفة دور روابط التعداد في تنظيم خطوات وتعليمات النص الإرشادي ترتيبا منطقيا',
			'التمييز بين روابط البداية (d’abord, premièrement) والوسط (ensuite, puis, de plus) والنهاية (enfin, finalement)',
			'ترتيب إرشادات بيئية مبعثرة باستعمال روابط التعداد المناسبة وعلامات الترقيم'
		],
		keywordsAr: ['Connecteurs d’énumération', 'd’abord', 'ensuite', 'puis', 'enfin', 'روابط الترتيب'],
		discover: {
			scenarioAr:
				'لغرس شجرة في ساحة المتوسطة، شرح البستاني الخطوات الأربع للتلاميذ: « D’abord, creuse un trou dans la terre. Ensuite, place le jeune arbre délicatement. Puis, recouvre les racines de terre. Enfin, arrose l’arbre avec de l’eau propre. » لاحظ الكلمات التي افتتحت كل خطوة.',
			svg: svgFrenchWritingBlueprint({
				title: 'Ordonner les étapes avec les connecteurs d’énumération',
				steps: [
					{ stage: '1. Début', detail: 'D’abord, / Premièrement, / Tout d’abord,', color: '#1d4ed8' },
					{ stage: '2. Suite', detail: 'Ensuite, / Deuxièmement, / Après,', color: '#047857' },
					{ stage: '3. Addition', detail: 'Puis, / De plus, / Par ailleurs,', color: '#b45309' },
					{ stage: '4. Fin', detail: 'Enfin, / Finalement, / Pour terminer,', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'بأيّ رابط افتتح البستاني الخطوة الأولى لغرس الشجرة؟',
					hintAr: 'انظر إلى أول كلمة في كلام البستاني.',
					expectedInput: 'D’abord',
					revealAr: 'استعمل « D’abord » (أولا) لتقديم الخطوة الأولى.'
				},
				{
					promptAr: 'ما الرابطان اللذان رتّبا الخطوتين الثانية والثالثة؟',
					hintAr: 'ابحث عن الكلمتين بين « D’abord » و « Enfin ».',
					expectedInput: 'Ensuite et Puis',
					revealAr: 'استعمل « Ensuite » (بعد ذلك) و « Puis » (ثم) لتتابع الخطوات.'
				},
				{
					promptAr: 'بأيّ رابط ختم البستاني الخطوة الأخيرة؟',
					hintAr: 'انظر إلى أول كلمة في الجملة الرابعة.',
					expectedInput: 'Enfin',
					revealAr: 'استعمل « Enfin » (أخيرا) للإعلان عن آخر خطوة في التوجيهات.'
				}
			]
		},
		summary: {
			rulesAr: [
				'روابط التعداد (Les connecteurs d’énumération) كلمات تنظّم الأفكار والتعليمات في تسلسل واضح وسهل القراءة.',
				'لبداية التعداد: D’abord, / Tout d’abord, / Premièrement,',
				'للمتابعة والإضافة: Ensuite, / Puis, / Deuxièmement, / De plus, / Aussi,',
				'لختام التعداد: Enfin, / Finalement, / En dernier lieu,',
				'تُتبع هذه الروابط بفاصلة (,) عندما تقع في بداية الجملة، وتُستعمل كثيرا مع صيغة الأمر أو « il faut + infinitif ».'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Les trois positions des connecteurs',
				subtitle: 'Ne jamais inverser D’abord et Enfin',
				columns: [
					{
						header: 'Ouverture',
						rule: '1re consigne',
						examples: 'D’abord, ferme le robinet.',
						color: '#1d4ed8'
					},
					{
						header: 'Milieu',
						rule: 'Consignes suivantes',
						examples: 'Ensuite, répare les fuites.',
						color: '#047857'
					},
					{
						header: 'Clôture',
						rule: 'Dernière consigne',
						examples: 'Enfin, arrose le soir.',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'موضع كل رابط تعداد في سلسلة النصائح البيئية',
			examples: [
				{
					problemAr: 'أكمل النص بالروابط (Enfin / D’abord / Ensuite): « ......, trie tes déchets. ......, mets le papier dans le bac jaune. ......, laisse la rue propre. »',
					solutionAr: '« D’abord, trie tes déchets. Ensuite, mets le papier dans le bac jaune. Enfin, laisse la rue propre. »'
				},
				{
					problemAr: 'استبدل « D’abord ... Ensuite ... Enfin » بثلاثة روابط مماثلة.',
					solutionAr: '« Premièrement ... Deuxièmement ... Finalement ».'
				}
			],
			watchOutAr:
				'تجنّب تكرار كلمة « Et puis... et puis... » في كل جملة! نوّع بين « D’abord », « Ensuite », « Puis », « Enfin » وضع فاصلة بعدها.'
		},
		practice: [
			{
				questionAr: 'ما الترتيب المنطقي الصحيح لروابط التعداد الآتية؟',
				options: [
					'Enfin -> Ensuite -> D’abord',
					'D’abord -> Ensuite -> Puis -> Enfin',
					'Ensuite -> D’abord -> Enfin -> Puis',
					'Puis -> Enfin -> D’abord -> Ensuite'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'Enfin تأتي في النهاية لا في البداية.',
					'أحسنت! هذا هو التسلسل الطبيعي للتعداد.',
					'D’abord تسبق Ensuite دائما.',
					'الترتيب مختل هنا.'
				],
				explanationAr: 'الترتيب السليم: D’abord (أولا) ثم Ensuite (بعد ذلك) ثم Puis (ثم) ثم Enfin (أخيرا).'
			},
			{
				questionAr: 'أيّ رابط يقدّم آخر نصيحة في قائمة إرشادات؟',
				options: ['Tout d’abord', 'Premièrement', 'Finalement', 'Ensuite'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Tout d’abord لبداية القائمة.',
					'Premièrement للخطوة الأولى.',
					'ممتاز! « Finalement » مثل « Enfin » تُستعمل في الختام.',
					'Ensuite للخطوة الوسطى.'
				],
				explanationAr: 'الرابطان « Enfin » و « Finalement » يقدّمان آخر عنصر في التعداد.'
			},
			{
				questionAr: 'أكمل الفراغ: « ......, n’allume jamais de feu en forêt. Ensuite, ramasse tes déchets avant de partir. »',
				options: ['Enfin', 'D’abord', 'Finalement', 'Donc'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الجملة الأولى تسبق Ensuite، فلا نضع Enfin.',
					'صحيح! « D’abord » تفتتح النصيحة الأولى قبل « Ensuite ».',
					'Finalement تُستعمل للنهاية.',
					'donc رابط نتيجة لا تعداد.'
				],
				explanationAr: 'قبل « Ensuite » نبدأ بالرابط الافتتاحي « D’abord ».'
			},
			{
				questionAr: 'أيّ كلمة ليست من روابط التعداد (connecteurs d’énumération)؟',
				options: ['D’abord', 'Ensuite', 'Parce que', 'Enfin'],
				correctIndex: 2,
				diagnosticFeedback: [
					'D’abord رابط تعداد.',
					'Ensuite رابط تعداد.',
					'أحسنت! « Parce que » رابط سبب وليس رابط تعداد.',
					'Enfin رابط تعداد.'
				],
				explanationAr: '« Parce que » يعبّر عن السبب، أما البقية فروابط تعداد.'
			},
			{
				questionAr: 'ما علامة الترقيم التي نضعها غالبا مباشرة بعد « D’abord » و « Ensuite » في أول الجملة؟',
				options: ['علامة استفهام (؟)', 'فاصلة (,)', 'نقطة (.)', 'قوسان ()'],
				correctIndex: 1,
				diagnosticFeedback: [
					'علامة الاستفهام للسؤال في آخر الجملة.',
					'ممتاز! نضع فاصلة بعد رابط التعداد: D’abord, économise l’eau.',
					'النقطة توضع في نهاية الجملة.',
					'لا نضع أقواسا حول الرابط.'
				],
				explanationAr: 'في بداية الجملة يُفصل رابط التعداد بفاصلة (,).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 3 : La nominalisation simple et les familles de mots
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_1am_t3_nominalisation_familles',
		slug: 'fre-1am-t3-nominalisation-familles',
		grade: '1am',
		yearSubjectId: 615,
		trimesterId: 't3',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الثالث: حماية البيئة والنص الإرشادي — Projet 3 : Protéger l’environnement (Le texte prescriptif)',
		order: 3,
		titleAr: 'الاشتقاق الاسمي وعائلات الكلمات (La nominalisation simple et les familles de mots)',
		objectives: [
			'تحويل الفعل إلى اسم (la nominalisation) باستعمال اللواحق الشائعة: -tion, -ation, -ment, -age',
			'التعرّف على عائلة الكلمات (la famille de mots) التي تشترك في الجذر نفسه (le radical)',
			'توظيف الاشتقاق الاسمي لصياغة عناوين موجزة وإرشادات بيئية دقيقة'
		],
		keywordsAr: ['Nominalisation', 'Suffixes', 'Radical', 'Famille de mots', 'الاشتقاق الاسمي'],
		discover: {
			scenarioAr:
				'لتحويل نصيحة طويلة إلى عنوان لافت، كتب التلاميذ: « Il faut protéger la forêt » -> « La protection de la forêt »، و « Il faut reboiser les collines » -> « Le reboisement des collines »، و « Il faut nettoyer le quartier » -> « Le nettoyage du quartier ». لاحظ كيف اشتُقّ الاسم من الفعل بإضافة لاحقة (suffixe).',
			svg: svgFrenchWordFormation({
				title: 'Former un nom à partir d’un verbe (Nominalisation)',
				prefix: 're-',
				root: 'bois',
				suffix: '-ement',
				derivedWord: 'le reboisement',
				meaningNote: 'Verbe : reboiser -> Nom d’action : le reboisement (التشجير)'
			}),
			steps: [
				{
					promptAr: 'ما اللاحقة (suffixe) التي أضفناها لتحويل « protéger » إلى « protection »؟',
					hintAr: 'انظر إلى آخر كلمة « protection ».',
					expectedInput: '-tion',
					revealAr: 'اللاحقة هي « -tion »: protéger -> la protection (الحماية).'
				},
				{
					promptAr: 'ما اللاحقة في « le nettoyage » المشتقة من الفعل « nettoyer »؟',
					hintAr: 'انظر إلى الحروف الأربعة الأخيرة.',
					expectedInput: '-age',
					revealAr: 'اللاحقة هي « -age »: nettoyer -> le nettoyage (التنظيف)، وكذلك trier -> le triage / gaspiller -> le gaspillage.'
				},
				{
					promptAr: 'ما الجذر المشترك (le radical) في عائلة الكلمات: « planter, plantation, planteur, replanter »؟',
					hintAr: 'ما الجزء الثابت الموجود في كل هذه الكلمات؟',
					expectedInput: 'plant-',
					revealAr: 'الجذر المشترك هو « plant- »، ولذلك تنتمي كلها إلى عائلة كلمات واحدة (une famille de mots).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الاشتقاق الاسمي (La nominalisation) هو تحويل فعل إلى اسم لإنتاج عناوين لافتة أو جمل اسمية موجزة.',
				'أشهر اللواحق (suffixes) لتشكيل الأسماء من الأفعال في وحدة البيئة:',
				'1) -tion / -ation (أسماء مؤنثة غالبا): protéger -> la protection / polluer -> la pollution / planter -> la plantation / préserver -> la préservation.',
				'2) -ment / -ement (أسماء مذكرة غالبا): reboiser -> le reboisement / polluer (تلوّث: pollution) / traiter -> le traitement / réchauffer -> le réchauffement.',
				'3) -age (أسماء مذكرة غالبا): nettoyer -> le nettoyage / recycler -> le recyclage / gaspiller -> le gaspillage / arroser -> l’arrosage.',
				'عائلة الكلمات (La famille de mots): مجموعة كلمات تشترك في الجذر نفسه وترتبط بالمعنى نفسه: eau / arroser؟ لا! بل: forêt / forestier / déforestation / reboiser — terre / terrain / enterrer / terrestre.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Les 3 grands suffixes de nominalisation',
				subtitle: 'Attention au genre du nom obtenu (le / la)',
				columns: [
					{
						header: '-tion / -ation',
						rule: 'Noms féminins (la)',
						examples: 'la protection, la pollution',
						color: '#1d4ed8'
					},
					{
						header: '-age',
						rule: 'Noms masculins (le)',
						examples: 'le recyclage, le gaspillage',
						color: '#047857'
					},
					{
						header: '-ment',
						rule: 'Noms masculins (le)',
						examples: 'le reboisement, le traitement',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'أشهر ثلاث لواحق لتحويل الأفعال البيئية إلى أسماء',
			examples: [
				{
					problemAr: 'حوّل الجملتين إلى عناوين اسمية: 1) On recycle le papier. 2) On économise l’eau.',
					solutionAr: '1) Le recyclage du papier.   2) L’économie de l’eau.'
				},
				{
					problemAr: 'استخرج الكلمة الدخيلة (l’intrus) من العائلة: (propre, propreté, proprement, proposer).',
					solutionAr: 'الكلمة الدخيلة هي « proposer » لأنها لا تتعلق بمعنى النظافة (propre).'
				}
			],
			watchOutAr:
				'احذر! تشابه الحروف الأولى لا يكفي لانتماء الكلمتين إلى عائلة واحدة؛ يجب أن تشتركا في الجذر والمعنى معا! مثل « terre » و « terrible » ليستا من عائلة واحدة.'
		},
		practice: [
			{
				questionAr: 'ما الاسم المشتق من الفعل « recycler »؟',
				options: ['la recyclation', 'le recyclage', 'le recyclement', 'la recyclure'],
				correctIndex: 1,
				diagnosticFeedback: [
					'اللاحقة الصحيحة ليست -ation.',
					'أحسنت! recycler -> le recyclage (إعادة التدوير).',
					'le recyclement غير صحيحة.',
					'la recyclure غير موجودة.'
				],
				explanationAr: 'الفعل « recycler » يُشتق منه الاسم المذكر « le recyclage ».'
			},
			{
				questionAr: 'ما الاسم المشتق من الفعل « polluer »؟',
				options: ['le polluage', 'la pollution', 'le pollument', 'la pollueur'],
				correctIndex: 1,
				diagnosticFeedback: [
					'اللاحقة ليست -age.',
					'ممتاز! polluer -> la pollution (التلوث).',
					'le pollument غير صحيحة.',
					'un pollueur تعني الملوِّث لا التلوث.'
				],
				explanationAr: 'الاسم الدال على الفعل « polluer » هو « la pollution ».'
			},
			{
				questionAr: 'حوّل إلى جملة اسمية (عنوان): « On nettoie la cour de l’école. »',
				options: [
					'Le nettoyage de la cour de l’école.',
					'La nettoie de la cour de l’école.',
					'Nettoyez la cour de l’école.',
					'On a nettoyé la cour de l’école.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! حولنا الفعل nettoyer إلى الاسم « Le nettoyage ».',
					'لا يوجد اسم اسمه La nettoie.',
					'هذه جملة أمرية وليست اسمية.',
					'هذه جملة فعلية في الماضي المركب.'
				],
				explanationAr: 'العنوان الاسمي المناسب هو: « Le nettoyage de la cour de l’école. »'
			},
			{
				questionAr: 'ما الكلمة الدخيلة (l’intrus) في عائلة الكلمات الآتية؟',
				options: ['planter', 'plantation', 'planète', 'replanter'],
				correctIndex: 2,
				diagnosticFeedback: [
					'planter تعني يغرس (جذر plant-).',
					'plantation تعني الغرس (جذر plant-).',
					'أحسنت! « planète » (كوكب) لا علاقة لها بمعنى الغرس والنبات.',
					'replanter تعني يعيد الغرس (جذر plant-).'
				],
				explanationAr: 'الكلمات planter, plantation, replanter تشترك في جذر الغرس، أما planète فمعناها كوكب.'
			},
			{
				questionAr: 'ما الفعل الذي اشتُقّ منه الاسم « le gaspillage »؟',
				options: ['gaspier', 'gaspiller', 'gaspillation', 'gaspille'],
				correctIndex: 1,
				diagnosticFeedback: [
					'ينقصه حرفا ll.',
					'ممتاز! الفعل هو « gaspiller » (يبذّر).',
					'هذه ليست فعلا.',
					'gaspille فعل مصرف وليس مصدرا.'
				],
				explanationAr: 'الاسم « le gaspillage » (التبذير) مشتق من الفعل « gaspiller ».'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 4 : Le futur simple et les homophones (a/à, ou/où, ces/ses)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_1am_t3_futur_homophones',
		slug: 'fre-1am-t3-futur-homophones',
		grade: '1am',
		yearSubjectId: 615,
		trimesterId: 't3',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الثالث: حماية البيئة والنص الإرشادي — Projet 3 : Protéger l’environnement (Le texte prescriptif)',
		order: 4,
		titleAr: 'المستقبل البسيط والمتجانسات الإملائية (Le futur simple et les homophones : a/à, ou/où, ces/ses)',
		objectives: [
			'تصريف أفعال المجموعات الثلاث في المستقبل البسيط (le futur simple) للتعبير عن مستقبل البيئة',
			'التمييز الإملائي الدقيق بين المتجانسات النحوية: (a / à) و (ou / où) و (ces / ses)',
			'استعمال حيل التعويض السريعة (avait / ou bien / ce-cette / son-sa) لتفادي الأخطاء الإملائية'
		],
		keywordsAr: ['Futur simple', 'Homophones', 'a / à', 'ou / où', 'ces / ses'],
		discover: {
			scenarioAr:
				'كتب عمر عن مشروع التشجير في حيه: « Demain, nous planterons des oliviers et la ville sera plus verte. L’arbre a besoin d’eau à chaque saison. Où irons-nous ? Au jardin ou à la colline ? Chaque élève arrosera ses plantes et protégera ces jeunes arbres. »',
			svg: svgFrenchTenseTimeline({
				title: 'Imaginer une planète plus propre',
				tenseName: 'Le futur simple',
				formula: 'Infinitif (ou radical) + -ai, -as, -a, -ons, -ez, -ont',
				activeZone: 'future',
				example: 'Demain, nous planterons des arbres et l’air sera pur.',
				markers: 'Demain, bientôt, l’année prochaine, dans le futur'
			}),
			steps: [
				{
					promptAr: 'في أيّ زمن صُرّفت الأفعال « planterons, sera, arrosera »؟',
					hintAr: 'لاحظ مؤشر الزمن « Demain » (غدا).',
					expectedInput: 'Au futur simple',
					revealAr: 'صُرّفت في المستقبل البسيط (le futur simple) بنهايات (-ai, -as, -a, -ons, -ez, -ont).'
				},
				{
					promptAr: 'كيف نفرّق بين « a » و « à » في: « L’arbre a besoin d’eau à chaque saison »؟',
					hintAr: 'جرّب تعويض الكلمة بـ « avait ».',
					expectedInput: 'a = avait (verbe avoir)',
					revealAr: '« a » بدون حركة هي فعل « avoir » (يمكن تعويضها بـ avait)، أما « à » بحركة فهي حرف جر.'
				},
				{
					promptAr: 'ما الفرق بين « ses plantes » و « ces jeunes arbres »؟',
					hintAr: 'أيهما يدل على الملكية وأيهما يدل على الإشارة؟',
					expectedInput: 'ses = possessif, ces = démonstratif',
					revealAr: '« ses » للملكية (نباتاته هو: les siennes)، و « ces » للإشارة (هؤلاء / تلك الأشجار).'
				}
			]
		},
		summary: {
			rulesAr: [
				'المستقبل البسيط (Le futur simple): لأفعال المجموعة الأولى والثانية نحتفظ بالمصدر كاملا ونضيف النهايات (-ai, -as, -a, -ons, -ez, -ont). مثال: planter -> je planterai, nous planterons ; choisir -> ils choisiront.',
				'جذور شاذة مهمة في المستقبل: être (ser-), avoir (aur-), aller (ir-), faire (fer-), pouvoir (pourr-), devoir (devr-), voir (verr-). مثال: L’air sera pur. Nous ferons des efforts.',
				'المتجانسان (a / à): « a » فعل avoir (نستبدله بـ avait: L’arbre a -> avait). أما « à » فحرف جر لا يقبل التعويض بـ avait.',
				'المتجانسان (ou / où): « ou » حرف عطف للاختيار (نستبدله بـ ou bien: eau ou jus). أما « où » فيدل على المكان أو الزمان (la forêt où poussent les cèdres).',
				'المتجانسان (ces / ses): « ces » اسم إشارة للجمع (مفرده ce/cet/cette: ces arbres). أما « ses » فصفة ملكية للجمع (مفرده son/sa: il arrose ses plantes).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Astuces pour ne plus confondre les homophones',
				subtitle: 'Appliquer le test de remplacement',
				columns: [
					{
						header: 'a  vs  à',
						rule: 'a -> avait (verbe)',
						examples: 'Il a (avait) planté à l’école.',
						color: '#1d4ed8'
					},
					{
						header: 'ou  vs  où',
						rule: 'ou -> ou bien (choix)',
						examples: 'Le parc où il lit ou jardine.',
						color: '#047857'
					},
					{
						header: 'ces  vs  ses',
						rule: 'ses -> les siens (à lui)',
						examples: 'Il soigne ses fleurs et ces arbres.',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'اختبارات التعويض السريعة للتمييز بين المتجانسات الثلاثة في الإملاء',
			examples: [
				{
					problemAr: 'صرّف في المستقبل البسيط: « Bientôt, les citoyens (protéger) ...... la forêt et la nature (être) ...... sauvée. »',
					solutionAr: '« Bientôt, les citoyens protégeront la forêt et la nature sera sauvée. »'
				},
				{
					problemAr: 'أكمل بـ (a/à, ou/où, ces/ses): « Amine ...... rangé ...... affaires ...... la maison ...... il révise. »',
					solutionAr: '« Amine a rangé ses affaires à la maison où il révise. »'
				}
			],
			watchOutAr:
				'في المستقبل البسيط لأفعال المجموعة الأولى (-er) لا تحذف الحرف « e » قبل « r »! نكتب « nous protégerons » و « ils trieront » وليس « nous protégons » (مضارع).'
		},
		practice: [
			{
				questionAr: 'صرّف الفعل (agir) في المستقبل البسيط: « Demain, nous ...... pour sauver l’eau. »',
				options: ['agissons', 'agirons', 'agirez', 'agiront'],
				correctIndex: 1,
				diagnosticFeedback: [
					'agissons في المضارع الإخباري.',
					'أحسنت! المصدر (agir) + النهاية (-ons) = agirons.',
					'agirez مع الضمير vous.',
					'agiront مع الضمير ils/elles.'
				],
				explanationAr: 'مع « nous » في المستقبل البسيط نكتب: nous agirons.'
			},
			{
				questionAr: 'ما تصريف الفعل (être) في المستقبل البسيط: « Si nous plantons des arbres, notre ville ...... plus belle. »؟',
				options: ['est', 'était', 'sera', 'aura'],
				correctIndex: 2,
				diagnosticFeedback: [
					'est في المضارع.',
					'était في الماضي الناقص.',
					'ممتاز! جذر être في المستقبل هو ser-، ومع notre ville (elle) نكتب sera.',
					'aura هو مستقبل الفعل avoir.'
				],
				explanationAr: 'مستقبل « être » مع المفرد الغائب هو « sera ».'
			},
			{
				questionAr: 'اختر الإملاء الصحيح في: « Le jardinier ...... arrosé les plantes ...... l’aube. »',
				options: ['à / a', 'a / à', 'a / a', 'à / à'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الموضع الأول فعل مساعد (avait arrosé) بلا حركة.',
					'صحيح! a (فعل avoir) و à (حرف جر للزمن).',
					'الموضع الثاني حرف جر يأخذ حركة à.',
					'الموضع الأول فعل مساعد بدون حركة.'
				],
				explanationAr: '« a » فعل مساعد (يمكن تعويضه بـ avait)، و « à » حرف جر.'
			},
			{
				questionAr: 'أكمل بـ (ou / où): « Protégeons la forêt ...... vivent les oiseaux ! Tu préfères planter un olivier ...... un cèdre ? »',
				options: ['ou / où', 'où / ou', 'ou / ou', 'où / où'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الأول يدل على مكان (la forêt) فيأخذ حركة où.',
					'أحسنت! « où » للمكان و « ou » للاختيار (ou bien).',
					'الأول يدل على مكان وليس اختيارا.',
					'الثاني يدل على الاختيار بين شجرتين.'
				],
				explanationAr: 'نستعمل « où » للمكان (la forêt où...) و « ou » للاختيار (olivier ou cèdre).'
			},
			{
				questionAr: 'اختر (ces / ses): « Regarde ...... beaux arbres ! Bilal a pris ...... outils pour les arroser. »',
				options: ['ses / ces', 'ces / ses', 'ses / ses', 'ces / ces'],
				correctIndex: 1,
				diagnosticFeedback: [
					'في الجملة الأولى نشير إلى الأشجار (Regarde ces...).',
					'ممتاز! « ces » للإشارة (تلك الأشجار) و « ses » للملكية (أدوات بلال).',
					'الجملة الأولى إشارة لا ملكية.',
					'في الجملة الثانية الأدوات ملك لبلال (ses outils).'
				],
				explanationAr: '« ces » اسم إشارة و « ses » صفة ملكية تعود على بلال.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 5 : Rédiger des consignes pour économiser l'eau et protéger les forêts
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_1am_t3_consignes_environnement',
		slug: 'fre-1am-t3-consignes-environnement',
		grade: '1am',
		yearSubjectId: 615,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع الثالث: حماية البيئة والنص الإرشادي — Projet 3 : Protéger l’environnement (Le texte prescriptif)',
		order: 5,
		titleAr: 'كتابة إرشادات لاقتصاد الماء وحماية الغابات الجزائرية (Rédiger un texte prescriptif)',
		objectives: [
			'صياغة ميثاق أو قائمة إرشادات (des consignes) لحماية الماء والغابات الجزائرية',
			'توظيف موارد المشروع الثالث: الأمر الحاضر، il faut + infinitif، روابط التعداد، والمستقبل البسيط',
			'احترام التصميم المنهجي للنص الإرشادي (عنوان اسمي، جملة تقديم، قائمة نصائح مرقّمة أو مرتّبة، وخاتمة تحفيزية)'
		],
		keywordsAr: ['Consignes', 'Économiser l’eau', 'Forêts algériennes', 'Texte prescriptif', 'Production écrite'],
		discover: {
			scenarioAr:
				'بمناسبة اليوم الوطني للشجرة والماء في الجزائر، أعدّ تلاميذ الأولى متوسط ميثاقا مصوّرا للقسم يحمل عنوانا اسميا جذابا: « La protection de l’eau et des forêts »، ثم قدّموا 5 نصائح عملية مرتّبة وخاتمة تبيّن أثرها المستقبلي.',
			svg: svgFrenchWritingBlueprint({
				title: 'Rédiger des consignes écologiques efficaces (1AM)',
				steps: [
					{ stage: 'Titre nominal', detail: 'Utiliser la nominalisation (Ex: L’économie de l’eau)', color: '#1d4ed8' },
					{ stage: 'Intro courte', detail: 'Rappeler pourquoi la ressource est précieuse (eau, forêt)', color: '#047857' },
					{ stage: '4 à 5 consignes', detail: 'Impératif / Il faut + connecteurs (D’abord, Ensuite, Enfin)', color: '#b45309' },
					{ stage: 'Phrase finale', detail: 'Promesse au futur simple (Ainsi, notre pays restera vert !)', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'كيف نصوغ عنوانا جذابا وموجزا للنص الإرشادي؟',
					hintAr: 'تذكّر درس الاشتقاق الاسمي (la nominalisation).',
					expectedInput: 'Un titre nominal',
					revealAr: 'نستعمل عنوانا اسميا موجزا مثل: « L’économie de l’eau » أو « La protection de nos forêts ».'
				},
				{
					promptAr: 'ما الصيغتان اللتان ننوّع بينهما عند كتابة النصائح الإرشادية؟',
					hintAr: 'تذكّر الدرس الأول من هذا الفصل.',
					expectedInput: 'Impératif et il faut',
					revealAr: 'ننوّع بين صيغة الأمر (Ferme / Plantez) وعبارة الوجوب (Il faut / Il ne faut pas + infinitif).'
				},
				{
					promptAr: 'ما الزمن المناسب للجملة الختامية التي تتوقّع نتيجة هذه الجهود في المستقبل؟',
					hintAr: 'تذكّر الدرس الرابع من الفصل الثالث.',
					expectedInput: 'Le futur simple',
					revealAr: 'نستعمل المستقبل البسيط (le futur simple): « Ainsi, nos forêts resteront vertes et belles. »'
				}
			]
		},
		summary: {
			rulesAr: [
				'النص الإرشادي النموذجي يتضمّن: 1) عنوانا اسميا، 2) جملة تمهيدية تبرز قيمة الماء أو الغابة، 3) أربع إلى خمس إرشادات عملية ومنظّمة، 4) جملة ختامية في المستقبل البسيط.',
				'استعمل روابط التعداد (D’abord, Ensuite, Puis, De plus, Enfin) أو مطّات واضحة لتسهيل قراءة الإرشادات.',
				'نوّع بين الجمل الأمرية المثبتة (Économise l’eau ! Plante des arbres !) والمنفية (Ne gaspille pas l’eau ! N’allume jamais de feu en forêt !).',
				'انتبه لإملاء المتجانسات (a/à, ou/où, ces/ses) وعدم وضع « s » في آخر فعل المجموعة الأولى للأمر المفرد.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Boîte à outils écologique (Algérie)',
				rootLabel: 'Gestes simples au quotidien',
				rootSub: 'Eau précieuse et forêts algériennes',
				branches: [
					{
						label: 'Économiser l’eau',
						rule: 'robinet, fuite, douche courte',
						example: 'Ferme le robinet ! Répare les fuites !',
						color: '#1d4ed8'
					},
					{
						label: 'Protéger la forêt',
						rule: 'incendie, reboisement, cèdre',
						example: 'Plante des arbres ! Ramasse tes déchets !',
						color: '#047857'
					},
					{
						label: 'Collège propre',
						rule: 'poubelle, tri, papier, cour',
						example: 'Jette les papiers dans la poubelle !',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'رصيد لغوي جاهز للوضعية الإدماجية في الفصل الثالث',
			examples: [
				{
					problemAr: 'اكتب نصيحتين لحماية الغابة من الحرائق باستعمال الأمر والنهي.',
					solutionAr: '« D’abord, n’allume jamais de feu près des arbres ! Ensuite, ne jette aucun objet en verre dans la forêt ! »'
				},
				{
					problemAr: 'اكتب جملة ختامية في المستقبل البسيط لميثاق اقتصاد الماء.',
					solutionAr: '« Grâce à ces gestes responsables, nous préserverons l’eau pour les générations futures. »'
				}
			],
			watchOutAr:
				'وحّد الضمير في إرشاداتك! إذا بدأت تخاطب زميلك بـ (tu: Ferme... Évite...) فأكمل بـ (tu)، وإذا بدأت بـ (vous: Fermez... Évitez...) فأكمل بـ (vous).'
		},
		practice: [
			{
				questionAr: 'أيّ عنوان اسمي هو الأنسب لنص إرشادي حول حماية الغابات؟',
				options: [
					'La protection de nos forêts',
					'Hier nous avons visité la forêt',
					'Comment s’appelle cet arbre ?',
					'Le vent souffle fort.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! عنوان اسمي موجز ومعبّر مشتق من الفعل protéger.',
					'هذه جملة فعلية في الماضي وليست عنوانا اسميا.',
					'سؤال غير مناسب كعنوان اسمي.',
					'جملة خبرية لا تعبّر عن حماية الغابات.'
				],
				explanationAr: 'العنوان الاسمي المختصر (La protection de nos forêts) هو الأنسب للنص الإرشادي.'
			},
			{
				questionAr: 'اختر النصيحة السليمة نحويا وإملائيا لاقتصاد الماء:',
				options: [
					'Fermes le robinet pendant le brossage des dents !',
					'Ferme le robinet pendant le brossage des dents !',
					'Tu ferme le robinet pendant le brossage !',
					'Il faut fermes le robinet !'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نضيف s لأفعال المجموعة الأولى في الأمر المفرد.',
					'ممتاز! الأمر المفرد لـ fermer هو Ferme بدون s وبدون ضمير.',
					'لا نكتب الضمير Tu في صيغة الأمر.',
					'بعد Il faut نضع المصدر fermer.'
				],
				explanationAr: 'الأمر المفرد الصحيح من « fermer » هو: « Ferme le robinet ! ».'
			},
			{
				questionAr: 'أيّ نصيحة تتعلّق بحماية الغابات من الحرائق؟',
				options: [
					'Il faut laisser le robinet ouvert.',
					'Il ne faut jamais allumer de feu près des arbres secs.',
					'Il faut jeter des bouteilles en verre dans la forêt.',
					'Il faut couper les jeunes oliviers.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ترك الصنبور مفتوحا يبذر الماء.',
					'صحيح! تجنّب إشعال النار قرب الأشجار اليابسة يحمي الغابة من الحرائق.',
					'الزجاج قد يسبب الحرائق ويلوث الغابة.',
					'قطع الأشجار يضر بالبيئة.'
				],
				explanationAr: 'الوقاية من الحرائق تقتضي عدم إشعال النار في الغابة.'
			},
			{
				questionAr: 'اختر الجملة الختامية الصحيحة في المستقبل البسيط:',
				options: [
					'Ainsi, notre pays restera vert et accueillant.',
					'Ainsi, notre pays est resté vert hier.',
					'Ainsi, notre pays restait vert autrefois.',
					'Ainsi, reste vert notre pays.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! « restera » في المستقبل البسيط ويختم النص بأمل إيجابي.',
					'est resté في الماضي المركب.',
					'restait في الماضي الناقص.',
					'بنية الجملة غير سليمة.'
				],
				explanationAr: 'الفعل « restera » مصرف في المستقبل البسيط المناسب للخاتمة.'
			},
			{
				questionAr: 'ما القاعدة الأسلوبية التي يجب احترامها عند كتابة قائمة نصائح بالأمر؟',
				options: [
					'تغيير الضمير عشوائيا في كل سطر',
					'توحيد المخاطب (إما tu أو vous أو nous) في القائمة كلها',
					'حذف جميع علامات الترقيم',
					'استعمال الماضي الناقص في كل الإرشادات'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'تغيير المخاطب عشوائيا يضعف انسجام النص.',
					'ممتاز! توحيد ضمير الخطاب يمنح النص الإرشادي اتساقا واضحا.',
					'علامات الترقيم ضرورية للفهم.',
					'النص الإرشادي يستعمل الأمر أو الوجوب لا الماضي الناقص.'
				],
				explanationAr: 'يجب الحفاظ على ضمير خطاب واحد طوال النص الإرشادي.'
			}
		]
	}
];
