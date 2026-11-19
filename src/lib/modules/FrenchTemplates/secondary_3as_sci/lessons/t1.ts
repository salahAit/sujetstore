import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWordFormation,
	svgFrenchWritingBlueprint
} from '../../svg-french';
import type { FrenchInteractiveLessonData } from '../../types';

// ═══════════════════════════════════════════════════════════════════════════════
// 3AS BAC Scientific & Management Shared (3as_se, 3as_tm, 3as_math, 3as_ge) — T1
// Projet 1 : Textes et documents d'histoire (Révolution algérienne 1954-1962 & Oulémas)
// 5 Leçons BAC concises, claires et complètes
// ═══════════════════════════════════════════════════════════════════════════════

export const LESSONS_3AS_SCI_T1: FrenchInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// LEÇON 1 : Objectivité et subjectivité dans le texte historique
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_sci_t1_objectivite_subjectivite',
		slug: 'fre-3as-sci-objectivite-subjectivite',
		grade: '3as_se',
		yearSubjectId: 685,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: النصوص والوثائق التاريخية (Textes et documents d’histoire)',
		order: 1,
		titleAr: 'الموضوعية والذاتية في النص التاريخي (Objectivité et subjectivité)',
		objectives: [
			'التمييز الدقيق بين النص التاريخي الموضوعي (effacement de l’auteur) والنص الذي يتضمن بصمة الكاتب (implication)',
			'استخراج مؤشرات حضور الكاتب (subjectivité) ومؤشرات غيابه (objectivité) كما تُطلب في أسئلة البكالوريا',
			'الإجابة المنهجية على سؤال البكالوريا: « L’auteur est-il objectif ou subjectif ? Justifiez »'
		],
		keywordsAr: ['Objectivité', 'Subjectivité', 'Effacement', 'Modalisateurs', 'Texte historique'],
		discover: {
			scenarioAr:
				'في بكالوريا الشعب العلمية، يرد النص التاريخي حول الثورة التحريرية أو جمعية العلماء المسلمين الجزائريين. قارن بين عبارتين: (1) « Le 1er novembre 1954, la révolution algérienne est déclenchée dans plusieurs régions. » و (2) « Le 1er novembre 1954, un courageux soulèvement héroïque libère l’espoir du peuple opprimé. » تلاحظ في الجملة الأولى حيادا تاما، وفي الثانية حضورا واضحا لحكم الكاتب عبر النعوت.',
			svg: svgFrenchGrammarMap({
				title: 'Objectivité vs Subjectivité dans le texte historique',
				rootLabel: 'Position de l’auteur (BAC)',
				rootSub: 'Effacement total ou implication explicite / implicite',
				branches: [
					{
						label: 'Objectivité',
						rule: 'Faits, dates, 3e pers., passif',
						example: 'Le Congrès eut lieu en 1956.',
						color: '#1d4ed8'
					},
					{
						label: 'Subjectivité explicite',
						rule: 'Pronoms je, nous, mon, notre',
						example: 'Nous saluons leur sacrifice.',
						color: '#047857'
					},
					{
						label: 'Subjectivité implicite',
						rule: 'Lexique mélioratif / péjoratif',
						example: 'Un combat héroïque et juste.',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'في الجملة الأولى « Le 1er novembre 1954, la révolution algérienne est déclenchée »، هل الكاتب موضوعي أم ذاتي؟',
					hintAr: 'هل استعمل الكاتب ضمير المتكلم أو صفات تقييمية (مادحة أو ذامة)؟',
					expectedInput: 'objectif',
					revealAr:
						'الكاتب موضوعي (objectif) لأنه اكتفى بذكر التاريخ والحدث باستعمال المبني للمجهول وضمير الغائب دون إبداء رأي شخصي.'
				},
				{
					promptAr: 'ما الصفتان اللتان تكشفان ذاتية الكاتب (subjectivité implicite) في الجملة الثانية؟',
					hintAr: 'ابحث عن الصفتين الدالتين على الإعجاب والمدح (lexique mélioratif).',
					expectedInput: 'courageux, héroïque',
					revealAr:
						'الصفتان « courageux » و « héroïque » تنتميان للمعجم الإيجابي (lexique mélioratif) وتكشفان تعاطف الكاتب وإعجابه بالثورة.'
				},
				{
					promptAr: 'ما اسم الظاهرة التي يتوارى فيها المؤرخ خلف الأحداث ولا يستعمل ضمير المتكلم (je)؟',
					hintAr: 'مصطلح فرنسي شهير في البكالوريا يبدأ بحرف e.',
					expectedInput: 'effacement',
					revealAr:
						'تُسمى هذه الظاهرة « l’effacement de l’auteur » (اختفاء الكاتب)، وغايتها إضفاء المصداقية العلمية والحياد التاريخي.'
				}
			]
		},
		summary: {
			rulesAr: [
				'مؤشرات الموضوعية (Objectivité / Effacement de l’auteur): غياب ضمائر المتكلم (je, nous)، استعمال ضمير الغائب (il/ils) والضمير غير الشخصي (on, il est + participe)، الجمل الخبرية، المبني للمجهول (voix passive)، الجمل الاسمية، والتواريخ والأرقام الدقيقة.',
				'مؤشرات الذاتية الصريحة (Subjectivité explicite): ظهور ضمائر المتكلم (je, me, moi, nous) وصفات الملكية (mon, notre) الدالة على الكاتب.',
				'مؤشرات الذاتية الضمنية (Subjectivité implicite): المعجم التقييمي الإيجابي (mélioratif: héroïque, glorieux, noble) أو السلبي (péjoratif: brutal, injuste, cruel)، والظروف الدالة على الموقف (heureusement, sans doute) والأفعال الرأيية (estimer, dénoncer).',
				'في البكالوريا: الكاتب يمكن أن يكون موضوعيا لنقل الحقائق التاريخية، لكنه غالبا ما يبدي ذاتية ضمنية (subjectivité implicite) لتمجيد الشهداء أو إدانة الاستعمار.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Repérer la position de l’auteur au BAC',
				subtitle: 'Indices indispensables pour justifier sa réponse',
				columns: [
					{
						header: 'Effacement',
						rule: '3e pers. + passif + dates',
						examples: 'En 1931, l’association fut créée.',
						color: '#1d4ed8'
					},
					{
						header: 'Mélioratif (+)',
						rule: 'Éloge et admiration',
						examples: 'héroïque, digne, admirable',
						color: '#047857'
					},
					{
						header: 'Péjoratif (-)',
						rule: 'Critique et dénonciation',
						examples: 'atroce, arbitraire, cruel',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'دليل سريع للتمييز بين مؤشرات الحياد التاريخي ومؤشرات حضور الكاتب',
			examples: [
				{
					problemAr: 'Sujet BAC : L’auteur marque-t-il sa présence dans cette phrase : « Le 5 mai 1931, Cheikh Abdelhamid Ben Badis fonde l’Association des Oulémas Musulmans Algériens à Alger. » ?',
					solutionAr: 'Non, l’auteur est objectif (il s’efface) : il utilise la 3e personne, une date précise (5 mai 1931), un lieu exact (Alger) et un vocabulaire neutre sans jugement de valeur.'
				},
				{
					problemAr: 'Sujet BAC : Relevez deux indices de subjectivité dans : « Malheureusement, l’administration coloniale imposa des lois arbitraires pour étouffer l’école algérienne. »',
					solutionAr: '1) L’adverbe modalisateur « Malheureusement » (jugement affectif). 2) L’adjectif péjoratif « arbitraires » et le verbe connoté « étouffer ».'
				}
			],
			watchOutAr:
				'انتبه لفخ البكالوريا الشائع: غياب ضمير المتكلم « je » لا يعني تلقائيا أن الكاتب موضوعي مئة بالمئة! تحقق دائما من وجود صفات مادحة (héroïque, glorieux) أو ذامة (cruel, injuste)؛ فإذا وجدت، قل: الكاتب حاضر ضمنيا (impliqué implicitement) عبر المعجم التقييمي.'
		},
		practice: [
			{
				questionAr: 'Parmi ces procédés, lequel caractérise l’OBJECTIVITÉ dans un texte historique ?',
				options: [
					'L’emploi de la tournure passive et des dates précises sans pronoms « je / nous »',
					'L’usage répété d’adjectifs péjoratifs comme « monstrueux » et « infâme »',
					'L’utilisation du pronom « je » pour exprimer une émotion personnelle',
					'L’emploi d’exclamations affectives comme « Quelle tragédie ! »'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! المبني للمجهول والتواريخ الدقيقة وغياب ضمائر المتكلم من أبرز علامات الموضوعية.',
					'خطأ: الصفات السلبية (péjoratifs) تدل على ذاتية الكاتب الضمنية.',
					'خطأ: ضمير المتكلم « je » علامة ذاتية صريحة.',
					'خطأ: أسلوب التعجب العاطفي يعبر عن انفعال الكاتب الذاتي.'
				],
				explanationAr: 'الموضوعية في النص التاريخي تتحقق بذكر الوقائع المؤرخة وبالمبني للمجهول وضمير الغائب.'
			},
			{
				questionAr: 'Dans la phrase « Les moudjahidine menèrent une lutte héroïque contre un système injuste », l’auteur est :',
				options: [
					'Totalement objectif car le pronom « je » est absent',
					'Subjectif de manière implicite grâce au lexique mélioratif et péjoratif',
					'Subjectif de manière explicite grâce au pronom « nous »',
					'Indifférent aux événements historiques racontés'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: غياب « je » لا يمنع الذاتية الضمنية الظاهرة في الصفات.',
					'ممتاز! الصفة الإيجابية « héroïque » والسلبية « injuste » تكشفان موقفا ذاتيا ضمنيا.',
					'خطأ: الضمير « nous » غير موجود في الجملة.',
					'خطأ: اختيار الكلمات التقييمية يثبت تعاطف الكاتب مع القضية.'
				],
				explanationAr: 'تظهر الذاتية الضمنية عبر المعجم المادح (héroïque) والمعجم الذام (injuste) حتى مع غياب ضمير المتكلم.'
			},
			{
				questionAr: 'Pourquoi l’historien recourt-il à l’effacement énonciatif (objectivité) ?',
				options: [
					'Pour raconter une fiction imaginaire',
					'Pour donner une crédibilité scientifique et mettre l’accent sur les faits',
					'Pour cacher les dates des événements',
					'Pour imiter un dialogue théâtral'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: النص التاريخي يوثق وقائع حقيقية لا خيالا.',
					'صحيح! تواري الكاتب يعزز المصداقية العلمية ويركز الانتباه على الحدث التاريخي نفسه.',
					'خطأ: النص الموضوعي يحرص على ذكر التواريخ بدقة.',
					'خطأ: النص التاريخي سردي تفسيري وليس حوارا مسرحيا.'
				],
				explanationAr: 'الهدف من تواري الكاتب هو الحياد والمصداقية العلمية وتسليط الضوء على الحدث التاريخي.'
			},
			{
				questionAr: 'Identifiez l’intrus (le mot qui NE relève PAS de la subjectivité) dans cette liste :',
				options: ['heureusement', 'courageusement', 'en 1956', 'inadmissible'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: « heureusement » ظرف يبدي شعور الكاتب (ذاتي).',
					'خطأ: « courageusement » ظرف يحمل حكما إيجابيا.',
					'أحسنت! « en 1956 » معطى تاريخي محايد وموضوعي تماما.',
					'خطأ: « inadmissible » صفة تقييمية سلبية تعكس رفض الكاتب.'
				],
				explanationAr: 'التاريخ « en 1956 » مؤشر زمني موضوعي لا يحمل أي حكم قيمة.'
			},
			{
				questionAr: 'Dans « Nous devons préserver la mémoire des martyrs de Novembre », quel indice révèle la présence explicite de l’auteur ?',
				options: [
					'Le nom « Novembre »',
					'Le pronom « Nous » (1re personne du pluriel)',
					'Le verbe « préserver » à l’infinitif',
					'L’article défini « la »'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: « Novembre » مرجع تاريخي محايد.',
					'صحيح! ضمير المتكلم الجمع « Nous » يدرج الكاتب صراحة في خطابه.',
					'خطأ: المصدر وحده ليس علامة حضور صريحة دون فاعله.',
					'خطأ: أداة التعريف ليست مؤشرا على الذاتية.'
				],
				explanationAr: 'الضمائر « je » و « nous » تدل على الحضور الصريح للكاتب (implication explicite).'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LEÇON 2 : La nominalisation et la tournure passive dans le texte historique
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_sci_t1_nominalisation_passif',
		slug: 'fre-3as-sci-nominalisation-passif',
		grade: '3as_se',
		yearSubjectId: 685,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: النصوص والوثائق التاريخية (Textes et documents d’histoire)',
		order: 2,
		titleAr: 'التحويل إلى الاسم والمبني للمجهول في النص التاريخي (Nominalisation et passif)',
		objectives: [
			'تحويل الجمل الفعلية إلى جمل اسمية (nominalisation à base verbale) بإتقان اللواحق الفرنسية الصحيحة',
			'تحويل الجمل بين المبني للمعلوم والمبني للمجهول (voix active / passive) مع احترام زمن الفعل ومطابقة اسم المفعول',
			'فهم الوظيفة البلاغية لكل من الاسمية والمبني للمجهول في التلخيص وإبراز الحدث التاريخي'
		],
		keywordsAr: ['Nominalisation', 'Suffixes', 'Voix passive', 'Participe passé', 'Titre historique'],
		discover: {
			scenarioAr:
				'يعتمد المؤرخون والمترشحون في كتابة العناوين والتلخيص (Compte rendu) على تحويل الفعل إلى اسم لاختصار الحدث: « Le Congrès de la Soummam est organisé en août 1956 » تتحول إلى عنوان موجز: « L’organisation du Congrès de la Soummam en août 1956 ». كما يستعملون المبني للمجهول لإبراز الحدث التاريخي قبل فاعله.',
			svg: svgFrenchWordFormation({
				title: 'Formation de la nominalisation (Verbe -> Nom)',
				prefix: 'dé-',
				root: 'clench',
				suffix: '-ement',
				derivedWord: 'Le déclenchement de la Révolution',
				meaningNote: 'La phrase verbale devient un groupe nominal synthétique'
			}),
			steps: [
				{
					promptAr: 'ما الاسم المشتق (nominalisation) من الفعل « libérer » في جملة: « Le peuple algérien libère son territoire »؟',
					hintAr: 'استعمل اللاحقة -ation المناسبة لكثير من أفعال الفوج الأول.',
					expectedInput: 'la libération',
					revealAr:
						'الاسم المشتق هو « La libération »، وتصبح الجملة الاسمية: « La libération du territoire par le peuple algérien ».'
				},
				{
					promptAr: 'عند تحويل الجملة « Les autorités coloniales arrêtèrent Larbi Ben M’hidi » إلى المبني للمجهول، ما الزمن الذي نُصرّف فيه المساعد « être »؟',
					hintAr: 'الفعل الأصلي « arrêtèrent » مصرف في الماضي البسيط (passé simple).',
					expectedInput: 'passé simple',
					revealAr:
						'نحافظ دائما على زمن الفعل الأصلي في المساعد « être »: يصبح « fut arrêté » -> « Larbi Ben M’hidi fut arrêté par les autorités coloniales ».'
				},
				{
					promptAr: 'لماذا يُكثر المؤرخون من الجمل الاسمية (phrases nominales) في عناوين الفقرات والكتب التاريخية؟',
					hintAr: 'قارن طول الجملة الفعلية بطول العنوان الاسمي.',
					expectedInput: 'résumer',
					revealAr:
						'تُستعمل الاسمية للإيجاز والتلخيص (condenser / résumer l’information) والتركيز على الحدث التاريخي بوضوح.'
				}
			]
		},
		summary: {
			rulesAr: [
				'قواعد التحويل إلى الاسم (Nominalisation): نشتق الاسم من الفعل باللواحق الشائعة: -tion / -ation (libérer -> libération، organiser -> organisation)، -ment (déclencher -> déclenchement، développer -> développement)، -age (partager -> partage)، -ance / -ence (résister -> résistance)، أو بإزالة النهاية (combattre -> combat، appeler -> appel).',
				'قاعدة المبني للمجهول (Voix passive): المفعول به المباشر (COD) يصبح فاعلا + المساعد « être » مصرفا في زمن الفعل الأصلي + اسم المفعول (participe passé) مطابقا للفاعل الجديد في النوع والعدد + (par / de + الفاعل الأصلي).',
				'أزمنة المبني للمجهول الأكثر ورودا في البكالوريا: Présent (est/sont + PP)، Imparfait (était/étaient + PP)، Passé simple (fut/furent + PP)، Passé composé (a été / ont été + PP)، Futur simple (sera/seront + PP).',
				'فائدة المبني للمجهول في النص التاريخي: إبراز الحدث أو الضحية (mise en relief de l’événement) وتحقيق الموضوعية خاصة عند حذف الفاعل (تجنب التكرار أو جهل الفاعل).'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Transformation Active -> Passive au BAC',
				rootLabel: 'Respecter le temps + l’accord du PP',
				rootSub: 'Sujet + V + COD  =>  COD + être (même temps) + PP + par + Sujet',
				branches: [
					{
						label: 'Présent',
						rule: 'est / sont + PP',
						example: 'Le texte est lu par les élèves.',
						color: '#1d4ed8'
					},
					{
						label: 'Passé simple',
						rule: 'fut / furent + PP',
						example: 'La charte fut adoptée en 1956.',
						color: '#047857'
					},
					{
						label: 'Passé composé',
						rule: 'a été / ont été + PP',
						example: 'Des écoles ont été fondées.',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'خريطة تحويل الأزمنة إلى المبني للمجهول مع تذكر مطابقة اسم المفعول',
			examples: [
				{
					problemAr: 'Transformez en phrase nominale : « Les dirigeants algériens proclamèrent l’insurrection le 1er novembre 1954. »',
					solutionAr: 'La proclamation de l’insurrection par les dirigeants algériens le 1er novembre 1954.'
				},
				{
					problemAr: 'Mettez à la voix passive : « L’Association des Oulémas a fondé des dizaines d’écoles libres. »',
					solutionAr: 'Des dizaines d’écoles libres ont été fondées par l’Association des Oulémas.'
				}
			],
			watchOutAr:
				'خطأ شائع يُفقد التلميذ نصف العلامة: نسيان مطابقة اسم المفعول (accord du participe passé) مع الفاعل المؤنث أو الجمع في المبني للمجهول! مثال: « La proclamation fut rédigée » (بإضافة e)، و « Des écoles ont été créées » (بإضافة es). وكذلك إذا كان الفاعل الأصلي « On » نحذفه تماما ولا نكتب « par on ».'
		},
		practice: [
			{
				questionAr: 'Quelle est la nominalisation correcte de : « Le peuple algérien résiste courageusement » ?',
				options: [
					'La résister du peuple algérien',
					'La résistance courageuse du peuple algérien',
					'Le résistement courageux du peuple algérien',
					'La résistant du peuple algérien'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: « résister » فعل في المصدر وليس اسما.',
					'أحسنت! الاسم المشتق من « résister » هو « la résistance » والظرف يتحول لصفة « courageuse ».',
					'خطأ: كلمة « résistement » غير موجودة في الفرنسية.',
					'خطأ: « résistant » صفة أو اسم فاعل لا يعبر عن الحدث نفسه.'
				],
				explanationAr: 'الفعل « résister » يشتق منه الاسم « la résistance »، والظرف « courageusement » يصبح صفة مطابقة « courageuse ».'
			},
			{
				questionAr: 'Mettez à la voix passive : « Les délégués adoptèrent la plateforme de la Soummam en 1956. »',
				options: [
					'La plateforme de la Soummam est adoptée par les délégués en 1956.',
					'La plateforme de la Soummam fut adoptée par les délégués en 1956.',
					'La plateforme de la Soummam fut adopté par les délégués en 1956.',
					'La plateforme de la Soummam avait été adoptée par les délégués en 1956.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفعل الأصلي في الماضي البسيط (adoptèrent) وليس في الحاضر.',
					'ممتاز! حافظت على الماضي البسيط (fut) وطابقت اسم المفعول مع المؤنث (adoptée).',
					'خطأ: نسيت مطابقة « adoptée » مع المؤنث المفرد « La plateforme ».',
					'خطأ: « avait été » يخص الماضي الأسبق (plus-que-parfait) لا الماضي البسيط.'
				],
				explanationAr: 'في الماضي البسيط نستعمل « fut » ومع المؤنث « La plateforme » نضيف « e » إلى « adoptée ».'
			},
			{
				questionAr: 'Transformez à la voix passive : « On a diffusé la Déclaration du 1er Novembre dans tout le pays. »',
				options: [
					'La Déclaration du 1er Novembre a été diffusée dans tout le pays par on.',
					'La Déclaration du 1er Novembre a été diffusée dans tout le pays.',
					'La Déclaration du 1er Novembre était diffusée dans tout le pays.',
					'La Déclaration du 1er Novembre a été diffusé dans tout le pays.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الضمير غير المحدد « on » يُحذف تماما في المبني للمجهول ولا نكتب « par on ».',
					'رائع! حذفنا « on » وحافظنا على الماضي المركب (a été) وطابقنا « diffusée ».',
					'خطأ: غيّرت الزمن من الماضي المركب إلى الناقص.',
					'خطأ: « La Déclaration » مؤنث فتحتاج « diffusée ».'
				],
				explanationAr: 'عندما يكون الفاعل « on » نكتفي بـ « La Déclaration ... a été diffusée » دون « par on ».'
			},
			{
				questionAr: 'Quel nom correspond au verbe « signer » dans un titre historique ?',
				options: ['Le signement', 'La signature', 'La signation', 'Le signage'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لاحقة غير صحيحة للفعل « signer ».',
					'صحيح! « signer » -> « la signature » (مثال: La signature des accords d’Évian).',
					'خطأ: كلمة « signation » غير صحيحة.',
					'خطأ: كلمة « signage » ليست الاسم القياسي الفرنسي هنا.'
				],
				explanationAr: 'الاسم الصحيح من الفعل « signer » هو « la signature ».'
			},
			{
				questionAr: 'Mettez à la voix active : « Des journaux réformistes étaient publiés par l’Association des Oulémas. »',
				options: [
					'L’Association des Oulémas publie des journaux réformistes.',
					'L’Association des Oulémas publiait des journaux réformistes.',
					'L’Association des Oulémas publia des journaux réformistes.',
					'L’Association des Oulémas a publié des journaux réformistes.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: المساعد « étaient » في الماضي الناقص (imparfait) وليس الحاضر.',
					'أحسنت! المساعد « étaient » في الماضي الناقص فيُصرف « publier » في الماضي الناقص (publiait).',
					'خطأ: « publia » ماضٍ بسيط وليس ناقصا.',
					'خطأ: « a publié » ماضٍ مركب.'
				],
				explanationAr: 'زمن المساعد « étaient » هو الـ imparfait، لذلك يصبح الفعل في المبني للمعلوم « publiait ».'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LEÇON 3 : Les temps du texte historique et les repères chronologiques
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_sci_t1_temps_histoire_chronologie',
		slug: 'fre-3as-sci-temps-histoire-chronologie',
		grade: '3as_se',
		yearSubjectId: 685,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: النصوص والوثائق التاريخية (Textes et documents d’histoire)',
		order: 3,
		titleAr: 'أزمنة النص التاريخي والمؤشرات الزمنية (Temps historiques et chronologie)',
		objectives: [
			'التمييز بين وظيفة الماضي البسيط (passé simple) والماضي الناقص (imparfait) والمضارع التاريخي (présent historique)',
			'تفسير قيمة المضارع التاريخي (actualiser les faits) في أسئلة الفهم بالبكالوريا',
			'توظيف الروابط والمؤشرات الزمنية (repères chronologiques) لترتيب الوقائع في الخط الزمني'
		],
		keywordsAr: ['Passé simple', 'Imparfait', 'Présent historique', 'Chronologie', 'Actualisation'],
		discover: {
			scenarioAr:
				'تأمل هذه الفقرة التاريخية: « En 1954, le peuple algérien vivait sous un régime colonial sévère. Soudain, dans la nuit du 1er novembre, les premiers coups de feu retentirent dans les Aurès. Deux ans plus tard, en août 1956, le Congrès de la Soummam structure la révolution. » لاحظ كيف اجتمع الماضي الناقص لوصف الوضع، والماضي البسيط للحدث المفاجئ، ثم المضارع التاريخي لتقريب الحدث للقارئ.',
			svg: svgFrenchTenseTimeline({
				title: 'Système des temps dans le texte historique',
				tenseName: 'Imparfait / Passé simple / Présent historique',
				formula: 'Imparfait (cadre) + Passé simple (action) ou Présent (actualisation)',
				activeZone: 'two_past',
				example: 'En 1954, la lutte commence et mobilise le peuple.',
				markers: 'En 1931, le 1er novembre 1954, deux ans plus tard, puis, enfin'
			}),
			steps: [
				{
					promptAr: 'ما وظيفة الزمن المستعمل في الفعل « vivait » (imparfait) في الجملة الأولى؟',
					hintAr: 'هل يصف حالة مستمرة وخلفية للأحداث أم حدثا خاطفا؟',
					expectedInput: 'description',
					revealAr:
						'الماضي الناقص (imparfait) يُستعمل لوصف الإطار العام والحالة المستمرة (description / arrière-plan / durée).'
				},
				{
					promptAr: 'لماذا استعمل الكاتب الماضي البسيط في « retentirent » مع عبارة « Soudain »؟',
					hintAr: 'إنه حدث رئيسي قصير ومفاجئ غيّر مجرى التاريخ.',
					expectedInput: 'action brève',
					revealAr:
						'الماضي البسيط (passé simple) يعبر عن حدث رئيسي مفاجئ ومنتهٍ في الماضي (action brève, achevée, de premier plan).'
				},
				{
					promptAr: 'في الجملة الثالثة « en août 1956, le Congrès de la Soummam structure la révolution »، ما قيمة المضارع (présent) مع تاريخ قديم 1956؟',
					hintAr: 'يُسمى بالمضارع التاريخي (présent historique ou de narration)؛ ماذا يفعل للأحداث؟',
					expectedInput: 'actualiser',
					revealAr:
						'هو مضارع تاريخي (présent historique) قيمته تقريب الأحداث وإحياؤها أمام القارئ (actualiser et rendre les faits plus vivants).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الماضي الناقص (Imparfait): يُستعمل لوصف الأوضاع والأشخاص، والعادات المتكررة، والأفعال الطويلة المستمرة في الخلفية (arrière-plan).',
				'الماضي البسيط (Passé simple): يُستعمل للأحداث الرئيسية المفاجئة والمتعاقبة والمنتهية في الماضي (premier plan).',
				'المضارع التاريخي (Présent historique / de narration): يُستعمل لروي أحداث وقعت في الماضي بصيغة الحاضر بهدف « تقريبها وإحيائها » (actualiser les événements et les rendre plus vivants). وهذا من أشهر أسئلة البكالوريا!',
				'المؤشرات الزمنية (Repères chronologiques): التواريخ الدقيقة (le 1er novembre 1954، en 1962) والروابط التسلسلية (d’abord, ensuite, puis, deux ans plus tard, enfin) وهي العمود الفقري لترتيب الأحداث في النص التاريخي.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Les 3 valeurs temporelles clés au BAC',
				subtitle: 'Savoir justifier le choix d’un temps en compréhension',
				columns: [
					{
						header: 'Imparfait',
						rule: 'Décor, durée, habitude',
						examples: 'Le peuple souffrait.',
						color: '#1d4ed8'
					},
					{
						header: 'Passé simple',
						rule: 'Action brève et achevée',
						examples: 'La lutte éclata en 1954.',
						color: '#047857'
					},
					{
						header: 'Présent hist.',
						rule: 'Actualiser et rendre vivant',
						examples: 'En 1962, l’Algérie renaît.',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'جدول قيم الأزمنة التاريخية للإجابة الدقيقة على أسئلة الفهم في البكالوريا',
			examples: [
				{
					problemAr: 'Question BAC : Quel est le temps dominant dans la phrase « En 1931, Ben Badis crée l’Association des Oulémas » et quelle est sa valeur ?',
					solutionAr: 'Le temps employé est le présent de l’indicatif. Sa valeur est le présent historique (de narration) : il sert à actualiser les faits passés et à les rendre plus vivants pour le lecteur.'
				},
				{
					problemAr: 'Conjuguez correctement (imparfait ou passé simple) : « Pendant que les élèves (étudier) dans les médersas, la police (fermer) brusquement l’école. »',
					solutionAr: 'Pendant que les élèves étudiaient (imparfait : durée) dans les médersas, la police ferma (passé simple : action soudaine) brusquement l’école.'
				}
			],
			watchOutAr:
				'احذر الخلط بين المضارع التاريخي (présent historique) ومضارع الحقيقة العامة (présent de vérité générale)! إذا اقترن المضارع بتاريخ ماضٍ (En 1954, le FLN lance...) فهو مضارع تاريخي (présent historique / de narration)، أما إذا عبّر عن قاعدة صالحة لكل زمان (La liberté est un droit humain) فهو مضارع حقيقة عامة.'
		},
		practice: [
			{
				questionAr: 'Quelle est la valeur du présent dans : « Le 20 août 1956, les chefs de la révolution se réunissent dans la vallée de la Soummam » ?',
				options: [
					'Présent d’habitude',
					'Présent de vérité générale',
					'Présent historique (de narration) pour actualiser le fait passé',
					'Présent de l’énonciation (moment présent)'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: الحدث وقع مرة واحدة في تاريخ محدد 1956 وليس عادة متكررة.',
					'خطأ: ليس قاعدة علمية أو حكمة عامة بل واقعة تاريخية مؤرخة.',
					'أحسنت! المضارع مع تاريخ ماضٍ هو مضارع تاريخي لتقريب الحدث وإحيائه.',
					'خطأ: الحدث قديم (1956) وليس في لحظة الكلام الحالية.'
				],
				explanationAr: 'استعمال المضارع لرواية حدث مؤرخ في الماضي يُسمى « présent historique » وهدفه تقريب الحدث للقارئ.'
			},
			{
				questionAr: 'Complétez avec les temps convenables : « Les colons (contrôler) les terres fertiles lorsque l’insurrection (éclater). »',
				options: [
					'contrôlèrent / éclatait',
					'contrôlaient / éclata',
					'contrôlent / éclatera',
					'contrôlaient / éclatait'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: السيطرة على الأراضي حالة مستمرة (imparfait) والاندلاع حدث مفاجئ (passé simple).',
					'ممتاز! « contrôlaient » (حالة ممتدة) و « éclata » (حدث مفاجئ قاطع).',
					'خطأ: لا يتناسب المضارع والمستقبل مع سياق سرد ماضٍ.',
					'خطأ: الفعل « éclater » فعل لحظي لا يستمر بالناقص هنا.'
				],
				explanationAr: 'الفعل المستمر يأخذ الـ imparfait (contrôlaient) والفعل القاطع المفاجئ يأخذ الـ passé simple (éclata).'
			},
			{
				questionAr: 'Quel est le rôle principal de l’imparfait dans un récit historique ?',
				options: [
					'Exprimer un ordre adressé aux lecteurs',
					'Décrire le contexte, la durée et l’arrière-plan des événements',
					'Annoncer un événement futur incertain',
					'Exprimer uniquement une action soudaine et très brève'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الأمر يُعبر عنه بصيغة l’impératif.',
					'صحيح! الماضي الناقص يصف الخلفية التاريخية والأوضاع المستمرة.',
					'خطأ: المستقبل يُعبر عنه بالـ futur.',
					'خطأ: الفعل الخاطف القصير من خصائص الـ passé simple.'
				],
				explanationAr: 'الماضي الناقص مخصص لوصف الأوضاع والديكور التاريخي والأحداث المستمرة.'
			},
			{
				questionAr: 'Parmi ces expressions, laquelle marque la postériorité dans une chronologie ?',
				options: ['Auparavant', 'La veille', 'Trois ans plus tard', 'En même temps'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: « Auparavant » تدل على الأسبقية (antériorité).',
					'خطأ: « La veille » تعني اليوم السابق (antériorité).',
					'أحسنت! « Trois ans plus tard » تدل على ما حدث لاحقا (postériorité).',
					'خطأ: « En même temps » تدل على التزامن (simultanéité).'
				],
				explanationAr: 'تدل عبارة « plus tard » على اللاحقية (postériorité) في التسلسل الزمني.'
			},
			{
				questionAr: 'Dans « Le 5 juillet 1962, l’Algérie retrouva sa souveraineté », le verbe « retrouva » est au :',
				options: ['Imparfait', 'Passé simple', 'Futur simple', 'Passé composé'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: نهاية الماضي الناقص هي -ait (retrouvait).',
					'صحيح! « retrouva » مصرف في الماضي البسيط (passé simple) مع ضمير الغائب المفرد.',
					'خطأ: المستقبل هو « retrouvera ».',
					'خطأ: الماضي المركب يتكون من مساعد واسم مفعول « a retrouvé ».'
				],
				explanationAr: 'نهاية أفعال الفوج الأول في الماضي البسيط مع « il/elle » هي « -a »: retrouva.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LEÇON 4 : Le témoignage et le discours rapporté (direct / indirect)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_sci_t1_temoignage_discours_rapporte',
		slug: 'fre-3as-sci-temoignage-discours-rapporte',
		grade: '3as_se',
		yearSubjectId: 685,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: النصوص والوثائق التاريخية (Textes et documents d’histoire)',
		order: 4,
		titleAr: 'الشهادة التاريخية والكلام المنقول (Témoignage et discours rapporté)',
		objectives: [
			'فهم دور الشهادة التاريخية (témoignage) في إثبات الوقائع وإضفاء المصداقية والبعد الإنساني على النص',
			'تحويل الجمل بدقة من الكلام المباشر (discours direct) إلى الكلام غير المباشر (discours indirect)',
			'إتقان مطابقة الأزمنة والضمائر والظروف الزمنية عندما يكون فعل القول في الماضي'
		],
		keywordsAr: ['Témoignage', 'Discours direct', 'Discours indirect', 'Concordance des temps', 'Verbe introducteur'],
		discover: {
			scenarioAr:
				'كثيرا ما يُدرج المؤرخون شهادات المجاهدين والعلماء لتوثيق الحقائق. تأمل هذه الشهادة: Un ancien moudjahid déclara : « Nous avons défendu notre patrie hier avec courage. » وعند تحويلها إلى الكلام غير المباشر: Un ancien moudjahid déclara qu’ils avaient défendu leur patrie la veille avec courage. لاحظ التغيرات التي مست الضمير والزمن وظرف الزمان!',
			svg: svgFrenchGrammarMap({
				title: 'Passage du Discours Direct au Discours Indirect',
				rootLabel: 'Verbe introducteur au PASSÉ',
				rootSub: 'Supprimer (: « ») + Changer pronoms, temps et repères',
				branches: [
					{
						label: 'Déclarative',
						rule: 'que / qu’ + indicatif',
						example: 'Il dit qu’il était prêt.',
						color: '#1d4ed8'
					},
					{
						label: 'Interrogative',
						rule: 'si / ce que / mot interr.',
						example: 'Il demanda si la ville résistait.',
						color: '#047857'
					},
					{
						label: 'Impérative',
						rule: 'de + verbe à l’infinitif',
						example: 'Il ordonna de garder espoir.',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'لماذا يورد المؤرخ شهادات شهود العيان (témoignages) داخل النص التاريخي؟',
					hintAr: 'هل تجعل الشهادة النص أكثر صدقا وإقناعا؟',
					expectedInput: 'authenticité',
					revealAr:
						'تُدرج الشهادات لإثبات صدق الوقائع وموثوقيتها (prouver l’authenticité / la véracité des faits) وإضفاء طابع حي وإنساني على السرد.'
				},
				{
					promptAr: 'إذا كان فعل القول في الماضي (déclara)، فإلى أي زمن يتحول الماضي المركب (avons défendu) في الكلام غير المباشر؟',
					hintAr: 'نرجع زمنا أقدم في الماضي: plus-que-parfait.',
					expectedInput: 'plus-que-parfait',
					revealAr:
						'يتحول الـ passé composé إلى plus-que-parfait: « avons défendu » تصبح « avaient défendu ».'
				},
				{
					promptAr: 'كيف تتحول كلمة « hier » (أمس) عند نقل الكلام في الماضي؟',
					hintAr: 'عبارة فرنسية تعني « عشية ذلك اليوم ».',
					expectedInput: 'la veille',
					revealAr:
						'تتحول « hier » إلى « la veille »، بينما تتحول « aujourd’hui » إلى « ce jour-là » و « demain » إلى « le lendemain ».'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة الذهبية الأولى: إذا كان فعل القول في الحاضر أو المستقبل (il dit / il dira)، تبقى أزمنة الأفعال كما هي دون تغيير (تتغير الضمائر والروابط فقط).',
				'القاعدة الذهبية الثانية (فعل القول في الماضي: il a dit / il déclara): تتراجع الأزمنة كالآتي: Présent -> Imparfait | Passé composé -> Plus-que-parfait | Futur simple -> Conditionnel présent | Impératif -> de + Infinitif.',
				'تغير الروابط حسب نوع الجملة: جملة خبرية -> que | سؤال بنعم/لا (Est-ce que) -> si | سؤال بـ Qu’est-ce que -> ce que | سؤال بـ Qu’est-ce qui -> ce qui | سؤال بـ Où / Quand / Pourquoi -> نحتفظ بأداة الاستفهام ونعيد الترتيب (فاعل + فعل).',
				'تغير المؤشرات الزمنية في الماضي: aujourd’hui -> ce jour-là | hier -> la veille | demain -> le lendemain | ici -> là-bas.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Concordance des temps (Verbe au passé)',
				subtitle: 'Tableau réflexe indispensable pour l’épreuve du BAC',
				columns: [
					{
						header: 'Présent -> Imp.',
						rule: 'je lutte -> il luttait',
						examples: 'Il dit qu’il luttait.',
						color: '#1d4ed8'
					},
					{
						header: 'P.C. -> P.Q.P.',
						rule: 'j’ai vu -> il avait vu',
						examples: 'Il affirma qu’il avait vu.',
						color: '#047857'
					},
					{
						header: 'Futur -> Cond.',
						rule: 'nous vaincrons -> vaincraient',
						examples: 'Il jura qu’ils vaincraient.',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'تحويل الأزمنة في الكلام غير المباشر عند وجود فعل قول في الماضي',
			examples: [
				{
					problemAr: 'Mettez au discours indirect : Cheikh Ben Badis affirma : « L’éducation libérera l’esprit de la jeunesse. »',
					solutionAr: 'Cheikh Ben Badis affirma que l’éducation libérerait l’esprit de la jeunesse.'
				},
				{
					problemAr: 'Mettez au discours indirect : Le responsable demanda au témoin : « Avez-vous assisté à la réunion d’hier ? »',
					solutionAr: 'Le responsable demanda au témoin s’il avait assisté à la réunion de la veille.'
				}
			],
			watchOutAr:
				'احذر من فخّين متكررين في البكالوريا: (1) لا تكتب أبدا علامة الاستفهام « ? » ولا المزدوجتين « » في الكلام غير المباشر! (2) تحقق أولا من زمن فعل القول: إذا كان في الحاضر (L’historien explique que...) فإياك أن تغير زمن الفعل الداخلي!'
		},
		practice: [
			{
				questionAr: 'Transformez au discours indirect : Le témoin raconta : « Je garde un souvenir vif de cette nuit. »',
				options: [
					'Le témoin raconta qu’il garde un souvenir vif de cette nuit.',
					'Le témoin raconta qu’il gardait un souvenir vif de cette nuit.',
					'Le témoin raconta qu’il garderait un souvenir vif de cette nuit.',
					'Le témoin raconta que je gardais un souvenir vif de cette nuit.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: فعل القول في الماضي (raconta) لذا يجب تحويل المضارع إلى imparfait.',
					'ممتاز! تحول الضمير « Je » إلى « il » والفعل « garde » إلى « gardait ».',
					'خطأ: الشرطي الحاضر (garderait) يقابل المستقبل البسيط لا المضارع.',
					'خطأ: نسيت تحويل ضمير المتكلم « je » إلى « il ».'
				],
				explanationAr: 'مع فعل القول الماضي (raconta) يتحول المضارع « garde » إلى « gardait » و « je » إلى « il ».'
			},
			{
				questionAr: 'Transformez au discours indirect : Le chef ordonna aux combattants : « Restez unis et vigilants ! »',
				options: [
					'Le chef ordonna aux combattants qu’ils restaient unis et vigilants.',
					'Le chef ordonna aux combattants de rester unis et vigilants.',
					'Le chef ordonna aux combattants si rester unis et vigilants.',
					'Le chef ordonna aux combattants de restez unis et vigilants.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: جملة الأمر تُحول بـ « de + مصدر » وليس بـ « que + ماضٍ ناقص ».',
					'أحسنت! يتحول الأمر « Restez » إلى « de rester ».',
					'خطأ: « si » مخصصة للسؤال المغلق وليس للأمر.',
					'خطأ: بعد حرف الجر « de » نضع الفعل في المصدر (rester) لا مصرفا.'
				],
				explanationAr: 'في الكلام غير المباشر، يتحول فعل الأمر (impératif) إلى « de + infinitif ».'
			},
			{
				questionAr: 'Transformez au discours indirect : L’historien explique : « La solidarité a assuré le succès de la lutte. »',
				options: [
					'L’historien explique que la solidarité avait assuré le succès de la lutte.',
					'L’historien explique que la solidarité a assuré le succès de la lutte.',
					'L’historien explique que la solidarité assurait le succès de la lutte.',
					'L’historien explique si la solidarité a assuré le succès de la lutte.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: انتبه! فعل القول « explique » في الحاضر، فلا تتغير الأزمنة.',
					'رائع! لأن فعل القول في الحاضر (explique)، بقي الماضي المركب « a assuré » دون تغيير.',
					'خطأ: لا نغير الزمن عندما يكون فعل القول في الحاضر.',
					'خطأ: الجملة خبرية فنستعمل « que » لا « si ».'
				],
				explanationAr: 'إذا كان فعل القول في الحاضر (explique)، نحتفظ بزمن الفعل الداخلي كما هو.'
			},
			{
				questionAr: 'Transformez au discours indirect : Le journaliste demanda au moudjahid : « Qu’est-ce que vous avez ressenti le 5 juillet 1962 ? »',
				options: [
					'Le journaliste demanda au moudjahid qu’il avait ressenti le 5 juillet 1962.',
					'Le journaliste demanda au moudjahid ce qu’il avait ressenti le 5 juillet 1962.',
					'Le journaliste demanda au moudjahid ce qu’il a ressenti le 5 juillet 1962 ?',
					'Le journaliste demanda au moudjahid si il avait ressenti le 5 juillet 1962.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: أداة السؤال « Qu’est-ce que » تتحول إلى « ce que » لا « que » وحدها.',
					'ممتاز! تحولت « Qu’est-ce que » إلى « ce qu’ », و « avez ressenti » إلى « avait ressenti » وحذفت علامة الاستفهام.',
					'خطأ: يجب تحويل الزمن إلى plus-que-parfait وحذف علامة الاستفهام.',
					'خطأ: السؤال ليس مغلقا ولا نستعمل « si ».'
				],
				explanationAr: 'تتحول « Qu’est-ce que » إلى « ce que »، والماضي المركب إلى plus-que-parfait، وتُحذف علامة الاستفهام.'
			},
			{
				questionAr: 'Quel est le rôle principal d’un témoignage intégré dans un texte historique ?',
				options: [
					'Remplacer toutes les dates par des suppositions',
					'Authentifier les faits et apporter une dimension humaine vécue',
					'Contredire l’objectif informatif du texte',
					'Transformer le texte historique en appel publicitaire'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الشهادة تؤكد الوقائع والتواريخ ولا تلغيها.',
					'صحيح! الشهادة تثبت مصداقية الأحداث وتنقل التجربة الإنسانية الحقيقية.',
					'خطأ: الشهادة تخدم الهدف الإخباري والتوثيقي.',
					'خطأ: لا علاقة للنص التاريخي بالإعلانات التجارية.'
				],
				explanationAr: 'الشهادة التاريخية تمنح النص مصداقية توثيقية (authenticité) وبعدا إنسانيا حيا.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LEÇON 5 : Méthodologie du Compte Rendu Objectif d'un texte historique (BAC)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_sci_t1_compte_rendu_historique',
		slug: 'fre-3as-sci-compte-rendu-historique',
		grade: '3as_se',
		yearSubjectId: 685,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: النصوص والوثائق التاريخية (Textes et documents d’histoire)',
		order: 5,
		titleAr: 'منهجية التقرير الموضوعي لنص تاريخي في البكالوريا (Compte rendu objectif)',
		objectives: [
			'إتقان البنية الرسمية للتقرير الموضوعي (Compte rendu objectif) المخصص للشعب العلمية والتسيير (6 نقاط)',
			'صياغة فقرة التقديم (Accroche / Paratexte) بدقة: العنوان، الكاتب، المصدر، النوع، الفكرة العامة',
			'تلخيص أفكار النص بأسلوبك الخاص باستعمال الغائب (L’auteur montre que...) دون رأي شخصي ودون نسخ حرفي'
		],
		keywordsAr: ['Compte rendu objectif', 'Accroche', 'Paratexte', 'Reformulation', 'Visée informative'],
		discover: {
			scenarioAr:
				'في بكالوريا الشعب العلمية والتسيير، يختار معظم المترشحين الموضوع الأول في الوضعية الإدماجية وهو « Le compte rendu objectif » (التقرير الموضوعي على 6 نقاط). التقرير الموضوعي ليس نسخا لفقرات النص ولا يتضمن رأيا شخصيا في الخاتمة (خلافا للـ Compte rendu critique الخاص بالشعب الأدبية)، بل يعرض بطاقة النص ثم يعيد صياغة أفكاره الأساسية بضمير الغائب وبأسلوب موجز ومنظم.',
			svg: svgFrenchWritingBlueprint({
				title: 'Plan du Compte Rendu Objectif — Texte Historique (BAC Sci)',
				steps: [
					{
						stage: 'Introduction',
						detail: 'Nature + Titre + Auteur + Source + Thème général',
						color: '#1d4ed8'
					},
					{
						stage: 'Développement',
						detail: 'Idées essentielles reformulées à la 3e personne',
						color: '#047857'
					},
					{
						stage: 'Connecteurs',
						detail: 'D’abord, ensuite, par ailleurs, enfin + verbes de parole',
						color: '#b45309'
					},
					{
						stage: 'Visée finale',
						detail: 'Rappeler la visée informative / commémorative (sans avis !)',
						color: '#7c3aed'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما العناصر الخمسة التي نجمعها في فقرة المقدمة (Accroche) للتقرير الموضوعي؟',
					hintAr: 'تُستخرج مباشرة من النص والهامش السفلي (العنوان، الكاتب، المصدر، النوع، الموضوع).',
					expectedInput: 'titre, auteur, source, nature, thème',
					revealAr:
						'تتضمن المقدمة: نوع النص (texte historique)، العنوان (titre)، اسم الكاتب (auteur)، المصدر والتاريخ (source)، والموضوع العام (thème général).'
				},
				{
					promptAr: 'هل نكتب رأينا الشخصي (« À mon avis, ce texte est excellent ») في نهاية التقرير الموضوعي للشعب العلمية؟',
					hintAr: 'انتبه لكلمة « objectif » في اسم التمرين.',
					expectedInput: 'non',
					revealAr:
						'لا أبدا! التقرير الموضوعي (objectif) يخلو تماما من الرأي الشخصي والنقد، ونكتفي في آخره ببيان هدف الكاتب (visée informative / rendre hommage).'
				},
				{
					promptAr: 'ما هو الضمير المعتمد طوال فقرة العرض (Développement) في التقرير الموضوعي؟',
					hintAr: 'نحن نتحدث عن الكاتب لا عن أنفسنا.',
					expectedInput: '3e personne',
					revealAr:
						'نستعمل دائما ضمير الغائب (L’auteur / L’historien / Il) مع أفعال التقديم مثل: rappelle, explique, souligne, montre, conclut.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الفقرة 1 — المقدمة (L’accroche): « Ce texte historique, intitulé "...", écrit par [Auteur], extrait de [Source] et paru en [Date], traite de [Thème général]. »',
				'الفقرة 2 — العرض (Le résumé reformulé): تلخيص الأفكار الأساسية لكل فقرة من فقرات النص بثلث الحجم تقريبا، مع إعادة الصياغة وتجنب النسخ الحرفي (copier-coller) وحذف التفاصيل الثانوية والأمثلة المطولة.',
				'أدوات الربط وأفعال التقديم في العرض: « D’abord, l’auteur rappelle que... Ensuite, il explique que... Par ailleurs, l’historien souligne que... Enfin, il montre que... » مع بيان الهدف في الجملة الأخيرة (Dans ce texte, l’auteur vise à informer le lecteur et à rendre hommage aux héros).',
				'قواعد الشكل والتصحيح في البكالوريا: كتابة التقرير في فقرتين واضحتين (مقدمة + عرض)، احترام علامات الوقف، استعمال الحاضر (présent de l’indicatif) كزمن أساسي للتقرير، وتجنب ضمير المتكلم « je » نهائيا.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Règles d’or du Compte Rendu Objectif (6 pts)',
				rootLabel: 'Ce qu’il faut FAIRE vs ÉVITER',
				rootSub: 'Pour assurer une note entre 5/6 et 6/6 au BAC',
				branches: [
					{
						label: 'À faire',
						rule: 'Reformuler au présent (3e pers.)',
						example: 'L’auteur souligne que...',
						color: '#047857'
					},
					{
						label: 'À structurer',
						rule: '2 paragraphes + connecteurs',
						example: 'D’abord... Ensuite... Enfin...',
						color: '#1d4ed8'
					},
					{
						label: 'À éviter',
						rule: 'Zéro copie, zéro avis (je)',
						example: 'Pas de « Je pense que »',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'المعايير الأساسية التي يعتمدها مصحح البكالوريا لتنقيط التقرير الموضوعي',
			examples: [
				{
					problemAr: 'Rédigez l’accroche d’un texte historique sans titre, de l’historien Abou El-Kacem Saadallah, extrait de « Histoire culturelle de l’Algérie », portant sur le rôle des écoles libres des Oulémas.',
					solutionAr: 'Ce texte historique, sans titre, écrit par l’historien Abou El-Kacem Saadallah et extrait de son ouvrage « Histoire culturelle de l’Algérie », met en lumière le rôle décisif des écoles libres fondées par l’Association des Oulémas dans la préservation de l’identité nationale.'
				},
				{
					problemAr: 'Reformulez cette phrase du texte pour un compte rendu : « Le 1er novembre 1954, les patriotes déclenchèrent la lutte armée afin de mettre fin à plus d’un siècle de domination coloniale. »',
					solutionAr: 'D’abord, l’auteur rappelle que les patriotes algériens ont lancé la révolution du 1er novembre 1954 pour libérer le pays d’une longue occupation coloniale.'
				}
			],
			watchOutAr:
				'أخطر خطأين في التقرير الموضوعي: (1) نسخ جمل كاملة من النص الأصلي كما هي (يُخصم عليه بشدة في التصحيح). (2) إضافة فقرة نقد شخصي مثل « À mon avis, le style est facile »؛ فهذه تخص « Le compte rendu critique » لشعب اللغات والآداب وليست مطلوبة في التقرير الموضوعي للشعب العلمية.'
		},
		practice: [
			{
				questionAr: 'Quelle différence essentielle distingue le Compte rendu OBJECTIF du Compte rendu CRITIQUE ?',
				options: [
					'Le compte rendu objectif ne contient pas de paragraphe de critique personnelle',
					'Le compte rendu objectif ne mentionne ni l’auteur ni la source',
					'Le compte rendu objectif s’écrit entièrement à la 1re personne (je)',
					'Le compte rendu objectif doit être plus long que le texte d’origine'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! التقرير الموضوعي يقتصر على المقدمة وتلخيص الأفكار بضمير الغائب دون فقرة نقد شخصي.',
					'خطأ: ذكر الكاتب والمصدر أساسي في مقدمة التقرير الموضوعي.',
					'خطأ: يُمنع استعمال ضمير المتكلم « je » في التقرير الموضوعي.',
					'خطأ: التقرير يختصر النص إلى قرابة ثلث حجمه لا أكثر منه.'
				],
				explanationAr: 'التقرير الموضوعي (objectif) يخلو من فقرة الرأي الشخصي والنقد، بعكس التقرير النقدي (critique).'
			},
			{
				questionAr: 'Quelle phrase convient le mieux pour commencer l’accroche d’un compte rendu objectif ?',
				options: [
					'Je vais vous résumer un très beau texte que j’ai aimé.',
					'Ce texte historique, intitulé « Le Congrès de la Soummam », écrit par ..., extrait de ..., aborde l’organisation de la Révolution.',
					'Dans ce texte, il y a trois paragraphes et un titre en gras.',
					'Le Congrès de la Soummam est un événement très important dans ma vie.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: يحتوي على ضمير المتكلم ورأي شخصي مخالف للموضوعية.',
					'ممتاز! جملة تقديم أكاديمية تجمع النوع والعنوان والكاتب والمصدر والموضوع العام.',
					'خطأ: وصف الشكل الظاهري لا يغني عن تقديم المرجع والموضوع العام.',
					'خطأ: جملة ذاتية لا تلتزم ببطاقة النص (paratexte).'
				],
				explanationAr: 'المقدمة النموذجية تدمج عناصر النص المحيط (النوع، العنوان، الكاتب، المصدر) والفكرة العامة في جملة متماسكة.'
			},
			{
				questionAr: 'Quel temps verbal emploie-t-on principalement pour les verbes introducteurs du compte rendu (l’auteur rappelle, explique, montre) ?',
				options: [
					'Le futur antérieur',
					'Le présent de l’indicatif',
					'L’impératif présent',
					'Le subjonctif imparfait'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا نستخدم المستقبل الأسبق في أفعال التقرير.',
					'صحيح! الحاضر الدلالي (présent de l’indicatif) هو الزمن المعتمد في أفعال تقديم الأفكار.',
					'خطأ: الأمر لا يليق بسرد أفكار كاتب النص.',
					'خطأ: صيغة نادرة غير مستعملة في التقرير الموضوعي.'
				],
				explanationAr: 'نكتب أفعال التقديم في التقرير الموضوعي بالمضارع: l’auteur rappelle, explique, souligne, conclut.'
			},
			{
				questionAr: 'Dans le développement d’un compte rendu objectif, que faut-il faire face aux exemples longs et aux dates secondaires ?',
				options: [
					'Les recopier mot pour mot sans rien changer',
					'Garder uniquement les idées essentielles et les reformuler avec ses propres mots',
					'Inventer de nouveaux faits absents du texte',
					'Les remplacer par un dialogue imaginaire'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: النسخ الحرفي مرفوض في معايير التصحيح.',
					'أحسنت! ننتقي الأفكار المحورية ونعيد صياغتها بأسلوب موجز وأمين لمعنى النص.',
					'خطأ: يجب الالتزام التام بأفكار النص الأصلي دون إضافة معلومات من خارج النص.',
					'خطأ: التقرير نص إخباري موجز وليس حوارا.'
				],
				explanationAr: 'جوهر التقرير الموضوعي هو الأمانة للأفكار الأساسية مع إعادة صياغتها بإيجاز.'
			},
			{
				questionAr: 'Comment peut-on formuler la visée communicative d’un texte historique sur les martyrs de Novembre ?',
				options: [
					'L’auteur cherche à vendre un produit commercial aux lecteurs.',
					'L’auteur vise à informer le lecteur sur cet événement majeur et à rendre hommage aux martyrs.',
					'L’auteur veut critiquer les mathématiques modernes.',
					'À mon avis, l’auteur a très bien écrit son article.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا علاقة للنص التاريخي بالتجارة.',
					'ممتاز! صياغة موضوعية دقيقة لهدف النص التاريخي (إخبار وتكريم وتخليد الذاكرة).',
					'خطأ: خارج السياق تماما.',
					'خطأ: هذا رأي شخصي ذاتي ممنوع في التقرير الموضوعي.'
				],
				explanationAr: 'هدف النص التاريخي غالبا ما يكون الإخبار (informer) وتخليد الذكرى أو تكريم الأبطال (commémorer / rendre hommage).'
			}
		]
	}
];
