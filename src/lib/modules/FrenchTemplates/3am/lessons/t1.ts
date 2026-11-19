import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWordFormation,
	svgFrenchWritingBlueprint
} from '../../svg-french';

export const LESSONS_3AM_T1: FrenchInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// 1. La structure du fait divers (Qui ? Quoi ? Où ? Quand ? Comment ?)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_3am_t1_structure_fait_divers',
		slug: 'fre-3am-t1-structure-fait-divers',
		grade: '3am',
		yearSubjectId: 635,
		trimesterId: 't1',
		sequenceId: 'proj1',
		sequenceTitleAr: 'المشروع الأول: الخبر الصحفي الموجز (Le fait divers et la brève journalistique)',
		order: 1,
		titleAr: 'بنية الخبر الصحفي (La structure du fait divers : Qui ? Quoi ? Où ? Quand ?)',
		objectives: [
			'التعرّف إلى عناصر الخبر الصحفي (Le titre، Le chapeau، Le corps de l’article، La source)',
			'استخراج الإجابات عن الأسئلة الخمسة للصحفي (Qui ? Quoi ? Où ? Quand ? Comment / Pourquoi ?)'
		],
		keywordsAr: ['fait divers', 'brève', 'titre', 'chapeau', 'Qui / Quoi / Où / Quand'],
		discover: {
			scenarioAr:
				'اقرأ هذا الخبر الصحفي القصير: « Sauvetage réussi dans le Djurdjura. Hier matin, les agents de la Protection Civile de Tizi Ouzou ont secouru un randonneur égaré près de Tikjda grâce à la coopération des villageois. » لاحظ كيف لخّصت جملتان فقط كل المعلومات الأساسية!',
			svg: svgFrenchGrammarMap({
				title: 'Les 5 questions clés du fait divers (3AM)',
				rootLabel: 'Le fait divers / La brève journalistique',
				rootSub: 'Un récit court, réel et daté publié dans la presse',
				branches: [
					{
						label: 'Qui ? / Quoi ?',
						rule: 'Acteurs + événement réel',
						example: 'Protection Civile : sauvetage',
						color: '#1d4ed8'
					},
					{
						label: 'Où ? / Quand ?',
						rule: 'Lieu précis + date',
						example: 'À Tikjda, hier matin',
						color: '#047857'
					},
					{
						label: 'Comment / Pourquoi ?',
						rule: 'Circonstances et résultat',
						example: 'Grâce à l’aide des habitants',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'من قام بعملية الإنقاذ في الخبر أعلاه (Qui ?)؟',
					hintAr: 'ابحث عن الفاعل الرئيسي في الجملة.',
					expectedInput: 'Les agents de la Protection Civile de Tizi Ouzou (et les villageois)',
					revealAr: 'الإجابة عن سؤال (Qui ?) تحدد الأشخاص أو الهيئات المعنية بالحدث: عناصر الحماية المدنية وأهالي القرية.'
				},
				{
					promptAr: 'أين ومتى وقع الحدث (Où ? Quand ?)؟',
					hintAr: 'استخرج مؤشر الزمان ومؤشر المكان.',
					expectedInput: 'Où : près de Tikjda (Djurdjura) | Quand : hier matin',
					revealAr: 'الخبر الصحفي يذكر دائماً إطاراً زمنياً ومكانياً دقيقاً (indicateurs spatio-temporels) لإثبات واقعيته.'
				},
				{
					promptAr: 'ما الفرق بين الخبر الموجز (la brève) والخبر الصحفي الكامل (le fait divers)؟',
					hintAr: 'قارن بين طول الفقرة ووجود عنوان وفقرة تمهيدية (chapeau).',
					expectedInput: 'la brève قصيرة جداً بدون عنوان غالباً، أما le fait divers ففيه عنوان وتمهيد وتفاصيل',
					revealAr: 'ممتاز! (La brève) تتكون من 3 إلى 4 أسطر تلخص الخبر، بينما (Le fait divers) يتكون من عنوان (titre) وتمهيد (chapeau) وجسم المقال (corps) ومصدر (source).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الخبر الصحفي (Le fait divers) نص سردي إخباري ينقل حدثاً حقيقياً يقع في المجتمع (عملية إنقاذ، تضامن، إنجاز علمي، حادث مرور، مبادرة بيئية).',
				'يتكون الفيت ديفير (Le fait divers) من: 1) العنوان (Le titre) لجذب القارئ، 2) التمهيد (Le chapeau) الذي يلخّص الخبر بخط عريض، 3) جسم المقال (Le corps) في أعمدة، 4) المصدر والتاريخ (La source).',
				'للإجابة عن جدول الفهم في الاختبار، نستخرج دائماً: Qui ? (من؟) — Quoi ? (ماذا؟) — Où ? (أين؟) — Quand ? (متى؟) — Comment / Résultat ? (كيف وما النتيجة؟).',
				'يُصنّف الخبر الصحفي في الجريدة ضمن أبواب (Rubriques): Société (مجتمع)، Solidarité (تضامن)، Environnement (بيئة)، Insolite (طرائف)، Accident (حوادث).'
			],
			visualSvg: svgFrenchWritingBlueprint({
				title: 'Architecture d’un fait divers de presse (3AM)',
				steps: [
					{ stage: 'Le titre', detail: 'Court, accrocheur, souvent sous forme nominale (sans verbe conjugué).' },
					{ stage: 'Le chapeau', detail: '2 à 3 lignes en gras résumant Qui, Quoi, Où et Quand.' },
					{ stage: 'Le corps', detail: 'Détaille les circonstances (Comment ? Pourquoi ?) et les conséquences.' },
					{ stage: 'La source', detail: 'Nom du journal algérien et date de parution en bas du texte.' }
				]
			}),
			visualCaptionAr: 'المخطط الهيكلي الرسمي للخبر الصحفي في اختبارات السنة الثالثة متوسط',
			examples: [
				{
					problemAr: 'استخرج (Quoi ?) و (Où ?) من العنوان: « Opération de reboisement réussie dans les monts de Chréa ».',
					solutionAr: 'Quoi ? Une opération de reboisement réussie | Où ? Dans les monts de Chréa (Blida).'
				},
				{
					problemAr: 'حدّد الباب الصحفي (La rubrique) المناسب لخبر توزيع مساعدات شتوية على العائلات المعوزة في سطيف.',
					solutionAr: 'Rubrique : Société / Solidarité.'
				}
			],
			watchOutAr:
				'في أسئلة الفهم، لا تخلط بين (Le titre) و (La source): المصدر يُكتب عادة في أسفل النص بخط مائل مع تاريخ النشر مثل (El Moudjahid, 14 janvier 2025).'
		},
		practice: [
			{
				questionAr: 'ما الجزء الذي يلخّص الخبر الصحفي في سطرين أو ثلاثة أسطر أسفل العنوان مباشرة؟',
				options: ['La source', 'Le chapeau', 'La rubrique', 'La signature'],
				correctIndex: 1,
				diagnosticFeedback: [
					'La source هي مصدر المقال وتأتي في أسفل النص.',
					'ممتاز! Le chapeau (التمهيد) يلخص أهم عناصر الخبر تحت العنوان.',
					'La rubrique هي الباب الذي ينتمي إليه المقال في الجريدة.',
					'La signature هي اسم الصحفي كاتب المقال.'
				],
				explanationAr: 'Le chapeau فقرة موجزة تلي العنوان وتجيب بسرعة عن Qui / Quoi / Où / Quand.'
			},
			{
				questionAr: 'في الجملة: « Hier, des bénévoles ont nettoyé la plage de Béjaïa. »، على أي سؤال تجيب عبارة (la plage de Béjaïa)؟',
				options: ['Qui ?', 'Quand ?', 'Où ?', 'Pourquoi ?'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Qui ? يجيب عنها des bénévoles.',
					'Quand ? يجيب عنها Hier.',
					'أحسنت! la plage de Béjaïa تحدد المكان (Où ?).',
					'لا يوجد سبب مذكور في هذه العبارة.'
				],
				explanationAr: 'تدل عبارة (la plage de Béjaïa) على مكان وقوع الحدث، أي سؤال (Où ?).'
			},
			{
				questionAr: 'ما الباب الصحفي (La rubrique) الأنسب لخبر إنقاذ غابة من الحريق بفضل متطوعين؟',
				options: ['Sport', 'Environnement / Société', 'Économie', 'Météo'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الخبر لا يتعلق بمنافسة رياضية.',
					'صحيح! حماية الغابات والتطوع يندرجان ضمن Environnement / Société.',
					'الخبر لا يناقش أسعاراً أو تجارة.',
					'الخبر ليس نشرة أحوال جوية.'
				],
				explanationAr: 'الأخبار البيئية وأعمال الإنقاذ المجتمعي تُصنّف في باب البيئة أو المجتمع.'
			},
			{
				questionAr: 'ما الذي يميّز (la brève) عن المقال الصحفي الطويل؟',
				options: [
					'تتجاوز صفحتين كاملتين',
					'خبر قصير جداً من بضعة أسطر دون تفصيل طويل',
					'نص خيالي لا يعتمد على وقائع',
					'حوار مسرحي بين شخصيتين'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'على العكس، la brève موجزة جداً.',
					'ممتاز! la brève خبر صحفي مكثّف من 3 إلى 4 أسطر فقط.',
					'الخبر الصحفي ينقل أحداثاً حقيقية وليس خيالاً.',
					'الخبر الصحفي نص سردي إخباري وليس مسرحية.'
				],
				explanationAr: 'La brève هي أبسط وأقصر شكل للخبر الصحفي، تنقل المعلومة الأساسية بإيجاز.'
			},
			{
				questionAr: 'أيّ عنصر يدلّ على سؤال (Quand ?) في الجملة: « Le 12 février, des collégiens de Constantine ont planté 300 oliviers. »؟',
				options: ['des collégiens de Constantine', 'ont planté 300 oliviers', 'Le 12 février', '300 oliviers'],
				correctIndex: 2,
				diagnosticFeedback: [
					'هذا يجيب عن سؤال Qui ? (من؟).',
					'هذا يجيب عن سؤال Quoi ? (ماذا فعلوا؟).',
					'صحيح! Le 12 février يحدد زمان الحدث (Quand ?).',
					'هذا هو المفعول به وليس الزمان.'
				],
				explanationAr: 'التاريخ (Le 12 février) هو المؤشر الزمني الذي يجيب عن (Quand ?).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 2. La nominalisation des titres de presse
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_3am_t1_nominalisation_titres',
		slug: 'fre-3am-t1-nominalisation-titres',
		grade: '3am',
		yearSubjectId: 635,
		trimesterId: 't1',
		sequenceId: 'proj1',
		sequenceTitleAr: 'المشروع الأول: الخبر الصحفي الموجز (Le fait divers et la brève journalistique)',
		order: 2,
		titleAr: 'تحويل الجملة الفعلية إلى اسمية في عناوين الصحافة (La nominalisation des titres)',
		objectives: [
			'تحويل الفعل إلى اسم مشتق باستعمال اللواحق المناسبة (-tion, -ation, -ment, -age, -ure)',
			'صياغة عناوين صحفية اسمية موجزة وجذابة (phrase nominale) كما في الاختبارات'
		],
		keywordsAr: ['nominalisation', 'phrase verbale', 'phrase nominale', 'suffixes', '-tion / -ment / -age'],
		discover: {
			scenarioAr:
				'قارن بين العنوانين: 1) « Les citoyens reboisent la forêt de Bainem. » (جملة فعلية) | 2) « Reboisement de la forêt de Bainem par les citoyens. » (جملة اسمية). كيف اختصرنا الجملة الفعلية إلى عنوان صحفي قوي؟',
			svg: svgFrenchWordFormation({
				title: 'Formation du nom à partir du verbe (Nominalisation)',
				prefix: 're-',
				root: 'bois',
				suffix: '-ement',
				derivedWord: 'le reboisement',
				meaningNote: 'Les citoyens reboisent la forêt -> Reboisement de la forêt'
			}),
			steps: [
				{
					promptAr: 'ما الفعل الذي اشتققنا منه الاسم (Reboisement)؟',
					hintAr: 'ابحث عن الفعل المصرف في الجملة الأولى.',
					expectedInput: 'reboiser',
					revealAr: 'حذفنا نهاية المصدر (-er) وأضفنا اللاحقة (-ement) فصار الفعل (reboiser) اسماً (reboisement).'
				},
				{
					promptAr: 'ما الاسم المشتق من الفعل (sauver) ومن الفعل (inaugurer)؟',
					hintAr: 'sauver يأخذ -age، و inaugurer يأخذ -ation.',
					expectedInput: 'sauver -> sauvetage | inaugurer -> inauguration',
					revealAr: 'ممتاز! كل فعل يرتبط بلاحقة خاصة به: sauvetage، inauguration، fermeture، arrestation، déneigement.'
				},
				{
					promptAr: 'هل تحتوي الجملة الاسمية (La phrase nominale) على فعل مصرف؟',
					hintAr: 'تأمل عنوان: « Ouverture d’une nouvelle bibliothèque à Sétif. »',
					expectedInput: 'لا، لا تحتوي على أي فعل مصرف',
					revealAr: 'تتكون الجملة الاسمية من اسم رئيسي (nom noyau) وتُستعمل كثيراً في عناوين الصحف لأنها مختصرة ومعبّرة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الـ Nominalisation هي تحويل جملة فعلية (phrase verbale) إلى جملة اسمية (phrase nominale) بتحويل الفعل الرئيسي إلى اسم مشتق.',
				'أشهر اللواحق (Les suffixes) المقرّرة في 3AM: (-ation / -tion) مثل: inaugurer (inauguration)، sauver غير منتظم (sauvetage)، protéger (protection)، arrêter (arrestation).',
				'لاحقة (-ment / -ement): reboiser (reboisement)، déneiger (déneigement)، équiper (équipement)، sauver لا يأخذ -ment بل -age (sauvetage) و nettoyer (nettoyage).',
				'لاحقة (-ure) و (-ie / -ée / -ise): ouvrir (ouverture)، fermer (fermeture)، blesser (blessure)، secourir (secours)، arriver (arrivée).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Principaux suffixes de nominalisation (3AM)',
				subtitle: 'Transformer un verbe en nom pour rédiger un titre de presse',
				columns: [
					{
						header: '-tion / -ation',
						rule: 'Action / résultat',
						examples: 'protéger : protection | créer : création',
						color: '#1d4ed8'
					},
					{
						header: '-ment / -age',
						rule: 'Opération / fait',
						examples: 'reboiser : reboisement | sauver : sauvetage',
						color: '#047857'
					},
					{
						header: '-ure / sans suffixe',
						rule: 'Fermeture / secours',
						examples: 'ouvrir : ouverture | secourir : secours',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'ملخص اللواحق الأساسية لتحويل الأفعال إلى أسماء في عناوين الأخبار الصحفية',
			examples: [
				{
					problemAr: 'حوّل إلى جملة اسمية: « Les pompiers ont sauvé une famille à Béjaïa. »',
					solutionAr: 'Sauvetage d’une famille à Béjaïa par les pompiers.'
				},
				{
					problemAr: 'حوّل إلى جملة اسمية: « On a inauguré un nouveau collège à Oran. »',
					solutionAr: 'Inauguration d’un nouveau collège à Oran.'
				}
			],
			watchOutAr:
				'احذر إضافة حرف الجر (de / d’ / du / des) بشكل خاطئ بعد الاسم! مثلاً: « fermer la route » تصبح « Fermeture de la route »، و « nettoyer le quartier » تصبح « Nettoyage du quartier ».'
		},
		practice: [
			{
				questionAr: 'ما الاسم المشتق الصحيح من الفعل (arrêter) لصياغة عنوان صحفي؟',
				options: ['Arrêtage', 'Arrestation', 'Arrêture', 'Arrêtement'],
				correctIndex: 1,
				diagnosticFeedback: [
					'اللاحقة -age غير صحيحة مع الفعل arrêter.',
					'ممتاز! arrêter يعطي الاسم: arrestation (توقيف).',
					'اللاحقة -ure غير مستعملة هنا.',
					'اللاحقة -ement غير صحيحة مع arrêter.'
				],
				explanationAr: 'الفعل arrêter يُشتق منه الاسم arrestation (مثل: Arrestation d’un conducteur imprudent).'
			},
			{
				questionAr: 'حوّل الجملة التالية إلى عنوان اسمي: « Les scouts nettoient la forêt de Baïnem. »',
				options: [
					'Nettoyer la forêt de Baïnem par les scouts.',
					'Nettoyage de la forêt de Baïnem par les scouts.',
					'Nettoie de la forêt de Baïnem.',
					'Les scouts ont nettoyé la forêt de Baïnem.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'استعمال الفعل في المصدر لا يحقق التحويل الاسمي (nominalisation).',
					'أحسنت! nettoyer أعطى الاسم Nettoyage بدون فعل مصرف.',
					'Nettoie فعل مصرف وليس اسماً.',
					'هذه لا تزال جملة فعلية في الماضي المركب.'
				],
				explanationAr: 'الاسم المشتق من nettoyer هو nettoyage، فنحذف الفعل المصرف ونربط بـ de.'
			},
			{
				questionAr: 'ما الاسم المشتق الصحيح من الفعل (fermer)؟',
				options: ['Fermation', 'Fermage', 'Fermeture', 'Fermement'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Fermation كلمة غير موجودة في الفرنسية.',
					'Fermage لها معنى آخر يتعلق بكراء الأراضي الزراعية.',
					'صحيح! fermer يعطي الاسم: fermeture (إغلاق).',
					'Fermement ظرف حال يعني (بحزم) وليس اسماً.'
				],
				explanationAr: 'مثل ouvrir (ouverture)، فإن fermer يعطي الاسم fermeture.'
			},
			{
				questionAr: 'اختر العنوان الصحفي الاسمي الصحيح للجملة: « La Protection Civile a secouru deux alpinistes. »',
				options: [
					'Secours de deux alpinistes par la Protection Civile.',
					'Secouration de deux alpinistes.',
					'La Protection Civile secourt deux alpinistes.',
					'Secourir deux alpinistes.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! الاسم من secourir هو secours.',
					'Secouration كلمة خاطئة.',
					'هذه جملة فعلية في الحاضر.',
					'هذا فعل في المصدر.'
				],
				explanationAr: 'يُشتق الاسم (secours) من الفعل (secourir) دون لاحقة إضافية.'
			},
			{
				questionAr: 'أيّ ثنائية (فعل / اسم) صحيحة إملائياً؟',
				options: [
					'détruire / détruction',
					'détruire / destruction',
					'construire / construisation',
					'protéger / protègement'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'تُكتب destruction بحرف s وبدون حركة é.',
					'صحيح! détruire يعطي destruction، و construire يعطي construction.',
					'الصواب construction.',
					'الصواب protection.'
				],
				explanationAr: 'الأفعال المنتهية بـ -uire تتحول غالباً إلى -uction: détruire (destruction)، construire (construction).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 3. La voix active et la voix passive
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_3am_t1_voix_active_passive',
		slug: 'fre-3am-t1-voix-active-passive',
		grade: '3am',
		yearSubjectId: 635,
		trimesterId: 't1',
		sequenceId: 'proj1',
		sequenceTitleAr: 'المشروع الأول: الخبر الصحفي الموجز (Le fait divers et la brève journalistique)',
		order: 3,
		titleAr: 'المبني للمعلوم والمبني للمجهول (La voix active et la voix passive)',
		objectives: [
			'التمييز بين الجملة المبنية للمعلوم (voix active) والمبنية للمجهول (voix passive)',
			'تحويل جملة من المبني للمعلوم إلى المجهول في الحاضر والماضي المركّب مع مراعاة توافق اسم المفعول'
		],
		keywordsAr: ['voix active', 'voix passive', 'complément d’agent', 'auxiliaire être', 'par'],
		discover: {
			scenarioAr:
				'تأمل الجملتين في خبر صحفي: 1) « Les bénévoles distribuent des couvertures. » (voix active) | 2) « Des couvertures sont distribuées par les bénévoles. » (voix passive). كيف انقلب موقع الفاعل والمفعول به (COD)؟',
			svg: svgFrenchGrammarMap({
				title: 'Transformation Active -> Passive (3AM)',
				rootLabel: 'Les pompiers ont éteint l’incendie.',
				rootSub: 'Sujet + Verbe (Passé composé) + COD',
				branches: [
					{
						label: '1. COD devient Sujet',
						rule: 'L’incendie passe en tête',
						example: 'L’incendie...',
						color: '#1d4ed8'
					},
					{
						label: '2. Être au même temps',
						rule: 'Passé composé : a été + P.P',
						example: '...a été éteint...',
						color: '#047857'
					},
					{
						label: '3. Par + Complément d’agent',
						rule: 'L’ancien sujet suit « par »',
						example: '...par les pompiers.',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'لماذا أضفنا (-es) إلى اسم المفعول (distribuées) في الجملة الثانية؟',
					hintAr: 'انظر إلى جنس وعدد الفاعل الجديد (Des couvertures).',
					expectedInput: 'لأن اسم المفعول مع المساعد être يتبع الفاعل (مؤنث جمع)',
					revealAr: 'في المبني للمجهول نستعمل دائماً المساعد (être)، لذلك يتوافق اسم المفعول دائماً مع الفاعل الجديد في التذكير والتأنيث والإفراد والجمع!'
				},
				{
					promptAr: 'كيف نصرف المساعد (être) إذا كان الفعل الأصلي في الماضي المركب (Passé composé) مثل (ont planté)؟',
					hintAr: 'ما هو الماضي المركب للفعل être؟',
					expectedInput: 'a été (للمفرد) / ont été (للجمع) + participe passé',
					revealAr: 'ممتاز! الحاضر يعطي (est / sont + P.P)، والماضي المركب يعطي (a été / ont été + P.P)، والمستقبل يعطي (sera / seront + P.P).'
				},
				{
					promptAr: 'هل يمكن تحويل جملة بدون مفعول به مباشر (COD) مثل « Le randonneur marche dans la forêt » إلى المبني للمجهول؟',
					hintAr: 'هل يوجد COD ليصبح فاعلاً جديداً؟',
					expectedInput: 'لا، يشترط وجود مفعول به مباشر (COD)',
					revealAr: 'قاعدة أساسية: فقط الجملة التي تحتوي على مفعول به مباشر (COD) يمكن تحويلها إلى المبني للمجهول.'
				}
			]
		},
		summary: {
			rulesAr: [
				'في المبني للمعلوم (Voix active)، الفاعل هو الذي يقوم بالفعل. في المبني للمجهول (Voix passive)، الفاعل يقع عليه الفعل.',
				'مراحل التحويل إلى المبني للمجهول: 1) الـ COD يصبح فاعلاً جديداً، 2) نصرف المساعد (être) في نفس زمن الفعل الأصلي + اسم المفعول متوافقاً مع الفاعل الجديد، 3) الفاعل الأصلي يصبح (Complément d’agent) مسبوقاً بحرف الجر (par) أو أحياناً (de).',
				'جدول تطابق الأزمنة الحاسم: Présent (est/sont + P.P) | Passé composé (a été/ont été + P.P) | Imparfait (était/étaient + P.P) | Futur simple (sera/seront + P.P).',
				'عندما يكون الفاعل الأصلي هو الضمير النكرة (On)، يُحذف تماماً في المبني للمجهول (لا نكتب أبداً par on!): « On a ouvert la route » تصبح « La route a été ouverte ».'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Temps de l’auxiliaire ÊTRE à la voix passive',
				subtitle: 'Conserver EXACTEMENT le même temps que la phrase active',
				columns: [
					{
						header: 'Présent',
						rule: 'est / sont + P.P',
						examples: 'est sauvée / sont plantés',
						color: '#1d4ed8'
					},
					{
						header: 'Passé composé',
						rule: 'a été / ont été + P.P',
						examples: 'a été secouru / ont été aidées',
						color: '#047857'
					},
					{
						header: 'Imparfait / Futur',
						rule: 'était / sera + P.P',
						examples: 'était protégée / sera construite',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'حفظ صيغة المساعد être حسب الزمن يضمن العلامة الكاملة في سؤال التحويل للمبني للمجهول',
			examples: [
				{
					problemAr: 'حوّل إلى المبني للمجهول: « Les collégiens ont planté cinq cents oliviers. »',
					solutionAr: 'Cinq cents oliviers ont été plantés par les collégiens.'
				},
				{
					problemAr: 'حوّل إلى المبني للمجهول: « On a retrouvé le sac perdu à la gare. »',
					solutionAr: 'Le sac perdu a été retrouvé à la gare. (نحذف On ولا نكتب par on).'
				}
			],
			watchOutAr:
				'أكبر خطأ شائع في 3AM هو تحويل الماضي المركّب (a secouru) إلى حاضر مجهول (est secouru)! تذكّر دائماً: a secouru (Passé composé) يتطلب (a été secouru) وليس (est secouru)!'
		},
		practice: [
			{
				questionAr: 'حوّل إلى المبني للمجهول: « La Protection Civile secourt la victime. »',
				options: [
					'La victime a été secourue par la Protection Civile.',
					'La victime est secourue par la Protection Civile.',
					'La victime est secouru par la Protection Civile.',
					'La victime était secourue par la Protection Civile.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الفعل secourt في الحاضر وليس الماضي المركب.',
					'ممتاز! الحاضر (est) + اسم المفعول مؤنث (secourue).',
					'نسيت تاء التأنيث (e) مع الفاعل المؤنث La victime.',
					'était للماضي الناقص (imparfait) وليس للحاضر.'
				],
				explanationAr: 'الفعل الأصلي في الحاضر (secourt)، والفاعل الجديد مؤنث مفرد (La victime) فنكتب: est secourue.'
			},
			{
				questionAr: 'حوّل إلى المبني للمجهول: « Des bénévoles ont réparé les routes enneigées. »',
				options: [
					'Les routes enneigées sont réparées par des bénévoles.',
					'Les routes enneigées ont été réparées par des bénévoles.',
					'Les routes enneigées a été réparée par des bénévoles.',
					'Les routes enneigées ont été réparé par des bénévoles.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الفعل الأصلي في الماضي المركب (ont réparé) وليس الحاضر.',
					'أحسنت! ont été + réparées (مؤنث جمع).',
					'الفاعل جمع فيتطلب ont été وليس a été.',
					'يجب مطابقة اسم المفعول (réparées) مع Les routes.'
				],
				explanationAr: 'الماضي المركب في المجهول للجمع المؤنث: ont été + participe passé + es.'
			},
			{
				questionAr: 'حوّل إلى المبني للمجهول: « On a inauguré une école à Tlemcen. »',
				options: [
					'Une école a été inaugurée par on à Tlemcen.',
					'Une école est inaugurée à Tlemcen.',
					'Une école a été inaugurée à Tlemcen.',
					'Une école ont été inaugurée à Tlemcen.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا نكتب أبداً (par on) عند التحويل للمبني للمجهول.',
					'الفعل الأصلي في الماضي المركب (a inauguré).',
					'ممتاز! حذفنا On وحافظنا على الماضي المركب والتأنيث (a été inaugurée).',
					'Une école مفرد فتأخذ a été.'
				],
				explanationAr: 'يُحذف الفاعل (On) عند التحويل إلى المبني للمجهول.'
			},
			{
				questionAr: 'حوّل إلى المبني للمعلوم (Voix active): « L’incendie a été maîtrisé par les pompiers. »',
				options: [
					'Les pompiers maîtrisent l’incendie.',
					'Les pompiers ont maîtrisé l’incendie.',
					'Les pompiers maîtrisaient l’incendie.',
					'Les pompiers maîtriseront l’incendie.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'a été maîtrisé زمنه ماضٍ مركّب وليس حاضراً.',
					'صحيح! a été maîtrisé في المجهول يقابله ont maîtrisé في المعلوم.',
					'الزمن ماضٍ مركب وليس ناقصاً.',
					'الزمن ماضٍ مركب وليس مستقبلاً.'
				],
				explanationAr: 'الفاعل الحقيقي (Les pompiers) جمع والزمن ماضٍ مركّب، فيصبح الفعل: ont maîtrisé.'
			},
			{
				questionAr: 'أيّ جملة مبنية للمجهول (à la voix passive) فعلاً؟',
				options: [
					'Le secouriste est arrivé rapidement.',
					'Les citoyens sont sortis pour aider.',
					'Les arbres sont plantés par les élèves.',
					'La voiture est tombée en panne.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'est arrivé فعل ماضٍ مركّب مبني للمعلوم مع المساعد être.',
					'sont sortis فعل ماضٍ مركّب مبني للمعلوم.',
					'ممتاز! الأشجار وقع عليها الغرس، مع وجود Complément d’agent (par les élèves).',
					'est tombée فعل لازم في الماضي المركب المبني للمعلوم.'
				],
				explanationAr: 'انتبه للفرق بين الماضي المركّب بالمساعد être (مثل est arrivé) وبين المبني للمجهول (sont plantés par...).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 4. Le passé composé et l’accord du participe passé (avoir / être)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_3am_t1_passe_compose_accord',
		slug: 'fre-3am-t1-passe-compose-accord',
		grade: '3am',
		yearSubjectId: 635,
		trimesterId: 't1',
		sequenceId: 'proj1',
		sequenceTitleAr: 'المشروع الأول: الخبر الصحفي الموجز (Le fait divers et la brève journalistique)',
		order: 4,
		titleAr: 'الماضي المركّب وتوافق اسم المفعول (Le passé composé et l’accord du participe passé)',
		objectives: [
			'تصريف الأفعال في الماضي المركّب (Passé composé) بالمساعد الصحيح (avoir أو être)',
			'إتقان قواعد توافق اسم المفعول مع المساعد être ومع المساعد avoir عندما يسبقه COD'
		],
		keywordsAr: ['passé composé', 'participe passé', 'accord', 'auxiliaire être', 'COD avant le verbe'],
		discover: {
			scenarioAr:
				'قارن بين الجمل الثلاث: 1) « Les secouristes sont arrivés à temps. » | 2) « Les élèves ont planté des cèdres. » | 3) « Les cèdres que les élèves ont plantés poussent vite. » لماذا أخذ (plantés) علامة الجمع في الجملة الثالثة ولم يأخذها في الثانية؟',
			svg: svgFrenchTenseTimeline({
				title: 'Le Passé Composé dans le fait divers',
				tenseName: 'Passé Composé',
				formula: 'Auxiliaire (avoir / être) au présent + Participe Passé',
				activeZone: 'past',
				example: 'Hier, les volontaires ont nettoyé le parc et sont partis satisfaits.',
				markers: 'hier, ce matin, la semaine dernière, le 15 novembre'
			}),
			steps: [
				{
					promptAr: 'لماذا توافق (arrivés) مع الفاعل (Les secouristes) في الجملة الأولى؟',
					hintAr: 'ما الفعل المساعد المستعمل قبل arrivés؟',
					expectedInput: 'لأنه مصرف مع المساعد être فيتبع الفاعل دائماً',
					revealAr: 'قاعدة ثابتة: مع المساعد (être)، يتطابق اسم المفعول دائماً مع الفاعل في النوع والعدد (arrivée, arrivés, arrivées).'
				},
				{
					promptAr: 'في الجملة الثانية « Les élèves ont planté des cèdres »، أين يقع الـ COD (des cèdres)؟',
					hintAr: 'هل جاء قبل الفعل أم بعده؟',
					expectedInput: 'بعد الفعل، لذلك لا يتوافق اسم المفعول مع الفاعل',
					revealAr: 'مع المساعد (avoir)، لا يتطابق اسم المفعول أبداً مع الفاعل؛ وإذا جاء الـ COD بعد الفعل يبقى اسم المفعول ثابتاً (planté).'
				},
				{
					promptAr: 'وفي الجملة الثالثة « Les cèdres que les élèves ont plantés »، لماذا أضفنا (s) إلى (plantés)؟',
					hintAr: 'أين وقع المفعول به المباشر (Les cèdres / que) بالنسبة للفعل؟',
					expectedInput: 'لأن الـ COD (que = Les cèdres) جاء قبل الفعل',
					revealAr: 'أحسنت! مع المساعد (avoir)، يتوافق اسم المفعول مع الـ COD فقط إذا سبق الفعل (مثل الضمائر: le, la, les, l’, que).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الماضي المركّب (Passé composé) هو الزمن الرئيسي لسرد أحداث الخبر الصحفي (fait divers)، ويتكوّن من: avoir أو être في الحاضر + اسم المفعول (Participe passé).',
				'الأفعال التي تُصرّف مع (être) هي أفعال الحركة وتغيّر الحالة (aller, venir, arriver, partir, entrer, sortir, monter, descendre, tomber, rester, naître, mourir, passer, retourner) وجميع الأفعال الضميرية (se mobiliser, s’entraider).',
				'التوافق مع (être): يتوافق اسم المفعول دائماً مع الفاعل (Sujet). مثال: Les volontaires (fém.) sont venues aider.',
				'التوافق مع (avoir): لا يتوافق مع الفاعل أبداً، بل يتوافق فقط مع المفعول به المباشر (COD) إذا جاء قبل الفعل. مثال: La forêt qu’ils ont protégée — Les blessés qu’on a secourus.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Règles d’accord du Participe Passé (3AM)',
				subtitle: 'Vérifier d’abord l’auxiliaire, puis la position du COD',
				columns: [
					{
						header: 'Avec ÊTRE',
						rule: 'Accord avec le Sujet',
						examples: 'Elle est partie / Ils sont venus',
						color: '#1d4ed8'
					},
					{
						header: 'AVOIR (COD après)',
						rule: 'Aucun accord (invariable)',
						examples: 'Elles ont aidé les voisins',
						color: '#047857'
					},
					{
						header: 'AVOIR (COD avant)',
						rule: 'Accord avec le COD',
						examples: 'Les voisins qu’elles ont aidés',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'القواعد الثلاث الذهبية لتوافق اسم المفعول في الماضي المركّب',
			examples: [
				{
					problemAr: 'أكمل بالتوافق الصحيح: « Les aides que la commune a (distribuer) ...... ont soulagé les familles. »',
					solutionAr: 'distribuées (الـ COD هو Les aides — مؤنث جمع — وسبق الفعل بالضمير que).'
				},
				{
					problemAr: 'صرّف الفعل في الماضي المركّب: « Les équipes de secours (intervenir) ...... dès l’aube. »',
					solutionAr: 'sont intervenues (intervenir من عائلة venir، يُصرّف مع être ويتوافق مع Les équipes المؤنث الجمع).'
				}
			],
			watchOutAr:
				'لا تنخدع بالفاعل المؤنث أو الجمع مع المساعد avoir! نكتب: « Les filles ont organisé une collecte » (بدون es) لأن الـ COD (une collecte) جاء بعد الفعل!'
		},
		practice: [
			{
				questionAr: 'اختر التصريف والتوافق الصحيح: « Hier matin, les équipes de secours ...... rapidement sur les lieux. »',
				options: ['ont arrivé', 'sont arrivés', 'sont arrivées', 'est arrivée'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الفعل arriver يُصرّف مع المساعد être وليس avoir.',
					'كلمة équipe مؤنث (une équipe) فتحتاج إلى -ées.',
					'ممتاز! les équipes مؤنث جمع مع المساعد être: sont arrivées.',
					'الفاعل جمع فيتطلب sont وليس est.'
				],
				explanationAr: 'الفعل arriver يُصرّف مع être، والفاعل les équipes مؤنث جمع فتصبح: sont arrivées.'
			},
			{
				questionAr: 'اختر الشكل الصحيح لاسم المفعول: « Les citoyennes ont ...... des paniers alimentaires aux familles démunies. »',
				options: ['offert', 'offertes', 'offerts', 'offerte'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! المساعد avoir والـ COD (des paniers) جاء بعد الفعل فلا توافق.',
					'لا يتوافق اسم المفعول مع الفاعل مع المساعد avoir.',
					'الـ COD وقع بعد الفعل لا قبله.',
					'يبقى اسم المفعول ثابتاً (offert).'
				],
				explanationAr: 'مع avoir ومفعول به بعد الفعل، لا نضيف أي علامة توافق: ont offert.'
			},
			{
				questionAr: 'أكمل الجملة: « Les arbres que les collégiens ont ...... protégeront la montagne. »',
				options: ['planté', 'plantée', 'plantés', 'plantées'],
				correctIndex: 2,
				diagnosticFeedback: [
					'هنا الـ COD (que = Les arbres) سبق الفعل فيجب التوافق.',
					'كلمة arbre مذكر (un arbre) وليس مؤنثاً.',
					'ممتاز! Les arbres مذكر جمع وسبق الفعل، فنضيف -s: plantés.',
					'arbre اسم مذكر وليس مؤنثاً.'
				],
				explanationAr: 'الضمير الموصول (que) يعود على (Les arbres — مذكر جمع) قبل الفعل، فيتوافق اسم المفعول: plantés.'
			},
			{
				questionAr: 'ما التصريف الصحيح للفعل (prendre) في الجملة: « La Protection Civile a ...... toutes les précautions. »؟',
				options: ['prendu', 'pris', 'prise', 'prises'],
				correctIndex: 1,
				diagnosticFeedback: [
					'اسم المفعول من prendre هو pris وليس prendu.',
					'صحيح! المساعد avoir والمفعول به بعد الفعل، فيبقى pris.',
					'الـ COD جاء بعد الفعل فلا توافق.',
					'الـ COD جاء بعد الفعل فلا توافق.'
				],
				explanationAr: 'اسم المفعول من prendre هو pris، ولا يتوافق لأن الـ COD بعد الفعل.'
			},
			{
				questionAr: 'اختر الجملة الخالية من أي خطأ في التوافق:',
				options: [
					'Les lettres que Yasmine a écrit sont claires.',
					'Les lettres que Yasmine a écrites sont claires.',
					'Yasmine a écrite deux lettres.',
					'Les bénévoles ont partis tôt.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الـ COD (Les lettres — مؤنث جمع) سبق الفعل فيلزم écrites.',
					'ممتاز! توافق تام مع الـ COD المؤنث الجمع (Les lettres) قبل الفعل.',
					'مع avoir والمفعول بعد الفعل نكتب écrit بدون e.',
					'partir يُصرّف مع être: sont partis.'
				],
				explanationAr: 'في الجملة الثانية، que يعود على Les lettres (مؤنث جمع) قبل الفعل فتُكتب écrites.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 5. Rédiger un fait divers sur la solidarité ou le secours en Algérie
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_3am_t1_rediger_fait_divers',
		slug: 'fre-3am-t1-rediger-fait-divers',
		grade: '3am',
		yearSubjectId: 635,
		trimesterId: 't1',
		sequenceId: 'proj1',
		sequenceTitleAr: 'المشروع الأول: الخبر الصحفي الموجز (Le fait divers et la brève journalistique)',
		order: 5,
		titleAr: 'منهجية كتابة خبر صحفي عن التضامن أو الإنقاذ في الجزائر (Rédiger un fait divers)',
		objectives: [
			'توظيف بطاقة معطيات (grille Qui / Quoi / Où / Quand / Comment) لبناء خبر صحفي متكامل من 8 إلى 10 أسطر',
			'دمج عنوان اسمي (titre nominal) وتمهيد (chapeau) والماضي المركّب والمبني للمجهول ومعجم التضامن بدقة'
		],
		keywordsAr: ['production écrite', 'fait divers', 'titre nominal', 'chapeau', 'solidarité'],
		discover: {
			scenarioAr:
				'تريد كتابة خبر صحفي لجريدة المتوسطة عن حملة تضامن شتوية في ولاية سطيف، انطلاقاً من جدول معطيات (Qui : des jeunes bénévoles | Quoi : déneigement et distribution de vivres | Où : villages du nord de Sétif | Quand : le 18 janvier | Résultat : 60 familles secourues). كيف تنظّم المقال لتحصد 7/7؟',
			svg: svgFrenchWritingBlueprint({
				title: 'Plan modèle : Rédiger un fait divers (7/7 pts)',
				steps: [
					{ stage: '1. Titre nominal', detail: 'Ex. : Belle opération de solidarité dans les villages de Sétif' },
					{ stage: '2. Chapeau court', detail: 'Résume Qui + Quoi + Où + Quand en 2 phrases précises.' },
					{ stage: '3. Corps du texte', detail: 'Passé composé + 1 phrase passive + circonstances (Comment).' },
					{ stage: '4. Clôture et source', detail: 'Résultat heureux + nom du journal scolaire et date.' }
				]
			}),
			steps: [
				{
					promptAr: 'كيف نكتب عنواناً اسمياً (titre nominal) مناسباً لهذا الخبر؟',
					hintAr: 'ابدأ باسم مشتق مثل Opération أو Déneigement أو Élan de solidarité.',
					expectedInput: 'Élan de solidarité hivernale dans les villages de Sétif',
					revealAr: 'العنوان الاسمي المختصر يشدّ القارئ ويمنحك نقطة إتقان معيار الملاءمة والشكل الصحفي.'
				},
				{
					promptAr: 'ما الزمن الرئيسي الذي نكتبه في جسم الخبر الصحفي، وما الصيغة النحوية المستحسن إدراجها؟',
					hintAr: 'الزمن الماضي المنتهي + صيغة تبرز من تلقى المساعدة.',
					expectedInput: 'الماضي المركّب (Passé composé) + جملة في المبني للمجهول (Voix passive)',
					revealAr: 'ممتاز! مثلاً: « Soixante familles isolées ont été secourues par les bénévoles. »'
				},
				{
					promptAr: 'هل يعبّر الصحفي في الخبر الصحفي عن رأيه الشخصي باستعمال (Je) أم يلتزم بضمير الغائب (il / ils)؟',
					hintAr: 'الصحفي ينقل الخبر بموضوعية.',
					expectedInput: 'يلتزم بضمير الغائب (la 3e personne) والموضوعية دون استعمال Je',
					revealAr: 'نعم! الخبر الصحفي يُكتب دائماً بضمير الغائب (il / elle / ils / elles) مع نقل الحقائق والأرقام بدقة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'معايير النجاح في الوضعية الإدماجية (7 نقاط): 1) عنوان اسمي جذاب، 2) تمهيد (chapeau) يجيب عن Qui/Quoi/Où/Quand، 3) جسم مقال متماسك يجيب عن Comment والنتيجة، 4) توقيع أو مصدر في الأسفل.',
				'الضوابط اللغوية الإجبارية في 3AM T1: الكتابة بضمير الغائب (3e personne)، استعمال الماضي المركّب (Passé composé) بدقة، وإدراج جملة واحدة على الأقل في المبني للمجهول (a été / ont été + P.P).',
				'رصيد معجمي جاهز للتضامن والإنقاذ: la Protection Civile، les bénévoles، secourir، intervenir rapidement، déneiger، reboiser، un acte de civisme، sains et saufs (سالمون معافون)، une mobilisation exemplaire.',
				'علامات الترقيم والوضوح: تجنّب الجمل الطويلة جداً، اترك فراغاً في بداية الفقرة، وراجع توافق اسم المفعول قبل تسليم الورقة.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Boîte à outils du fait divers algérien (3AM)',
				rootLabel: 'Lexique clé pour la Production Écrite',
				rootSub: 'À réutiliser selon le thème proposé à l’examen',
				branches: [
					{
						label: 'Secours',
						rule: 'Protection Civile / médecins',
						example: 'secourir, sain et sauf, alerte',
						color: '#1d4ed8'
					},
					{
						label: 'Solidarité',
						rule: 'Bénévoles / citoyens / scouts',
						example: 'entraide, vivres, collecte, geste',
						color: '#047857'
					},
					{
						label: 'Environnement',
						rule: 'Forêts / plages / collégiens',
						example: 'reboisement, nettoyage, préserver',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'صندوق الكلمات المفتاحية لصياغة خبر صحفي متميز حول الإنقاذ والتضامن والبيئة في الجزائر',
			examples: [
				{
					problemAr: 'اكتب تمهيداً (chapeau) من جملتين عن إنقاذ متجول تائه في غابة الشريعة بالبليدة يوم الجمعة الماضي.',
					solutionAr: 'Vendredi dernier, un jeune randonneur égaré dans la forêt de Chréa (Blida) a été retrouvé sain et sauf. Il a été secouru grâce à l’intervention rapide de la Protection Civile et des habitants.'
				},
				{
					problemAr: 'اكتب جملة ختامية للخبر تبرز رد فعل السكان.',
					solutionAr: 'Les habitants ont vivement salué cet élan de solidarité et le courage des secouristes.'
				}
			],
			watchOutAr:
				'في الوضعية الإدماجية لا تنسَ كتابة العنوان الاسمي في الأعلى ومراعاة جميع معطيات الجدول المعطى في الموضوع؛ ولا تكتب الخبر بضمير المتكلم (Je) أبداً!'
		},
		practice: [
			{
				questionAr: 'ما الضمير الصحيح الذي يُكتب به الخبر الصحفي (Le fait divers)؟',
				options: [
					'ضمير المتكلم (Je / Nous)',
					'ضمير المخاطب (Tu / Vous)',
					'ضمير الغائب (Il / Elle / Ils / Elles)',
					'صيغة الأمر فقط'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'الصحفي لا يروي قصة شخصية بـ Je في الخبر الصحفي.',
					'لا نخاطب القارئ بـ Tu في سرد الوقائع الصحفية.',
					'ممتاز! الخبر الصحفي يُكتب بموضوعية بضمير الغائب (3e personne).',
					'الأمر يُستعمل في النص الإرشادي وليس في الخبر الصحفي.'
				],
				explanationAr: 'الحياد والموضوعية في الخبر الصحفي يقتضيان استعمال ضمير الغائب.'
			},
			{
				questionAr: 'أيّ عنوان يصلح أكثر كـ « titre nominal » لخبر عن غرس ألف شجرة في تلمسان؟',
				options: [
					'Les élèves ont planté mille arbres à Tlemcen.',
					'Plantation de mille arbres par les élèves à Tlemcen',
					'Nous plantons des arbres à Tlemcen.',
					'Plantez des arbres à Tlemcen !'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه جملة فعلية وليست عنواناً اسمياً.',
					'أحسنت! عنوان اسمي مختصر يبدأ بالاسم المشتق Plantation.',
					'هذه جملة فعلية بضمير المتكلم.',
					'هذه جملة أمرية.'
				],
				explanationAr: 'العنوان الاسمي (titre nominal) يخلو من الفعل المصرف ويبدأ باسم مشتق.'
			},
			{
				questionAr: 'ما معنى العبارة الصحفية الجاهزة: « sain et sauf » في أخبار الإنقاذ؟',
				options: ['مصاب بجروح خطيرة', 'سالم ومعافى دون أذى', 'مفقود في الجبل', 'متأخر عن الموعد'],
				correctIndex: 1,
				diagnosticFeedback: [
					'العكس تماماً؛ العبارة تدل على السلامة الكاملة.',
					'ممتاز! « retrouvé sain et sauf » تعني وُجد سالماً معافى.',
					'تعني أنه عُثر عليه بأمان.',
					'لا علاقة لها بالتأخر الزمني.'
				],
				explanationAr: 'عبارة « sain et sauf » شائعة جداً في أخبار الحماية المدنية وتعني: سالماً معافى.'
			},
			{
				questionAr: 'أيّ جملة توظّف المبني للمجهول في الماضي المركّب بشكل سليم داخل خبر صحفي؟',
				options: [
					'Les familles isolées ont été secourues par les volontaires.',
					'Les familles isolées sont secourir par les volontaires.',
					'Les familles isolées a été secourue par les volontaires.',
					'Les familles isolées ont secourues par les volontaires.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! ont été + secourues (مؤنث جمع) + par les volontaires.',
					'لا نضع المصدر بعد sont.',
					'الفاعل جمع فيلزم ont été و secourues.',
					'ينقصها été لصياغة المبني للمجهول.'
				],
				explanationAr: 'المبني للمجهول في الماضي المركّب مع جمع مؤنث: ont été + participe passé + es.'
			},
			{
				questionAr: 'ما الترتيب المنهجي السليم لبناء مقال خبر صحفي (fait divers) في الاختبار؟',
				options: [
					'المصدر ثم جسم المقال ثم العنوان',
					'العنوان الاسمي ثم التمهيد (chapeau) ثم جسم المقال (corps) ثم المصدر',
					'جسم المقال فقط بدون عنوان أو تاريخ',
					'أسئلة وأجوبة مرقمة دون فقرات'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'المصدر يُوضع في نهاية المقال لا في بدايته.',
					'أحسنت! هذا هو التخطيط الصحفي المعتمد لنيل العلامة الكاملة.',
					'العنوان والتمهيد جزء أساسي من معايير التصحيح.',
					'الخبر الصحفي يُكتب في فقرات مترابطة لا على شكل أسئلة.'
				],
				explanationAr: 'الهيكل الرسمي للخبر الصحفي: Titre -> Chapeau -> Corps de l’article -> Source.'
			}
		]
	}
];
