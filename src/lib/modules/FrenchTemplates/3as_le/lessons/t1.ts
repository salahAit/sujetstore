import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWordFormation,
	svgFrenchWritingBlueprint
} from '../../svg-french';
import type { FrenchInteractiveLessonData } from '../../types';

/**
 * 3AS BAC Langues Étrangères (لغات أجنبية — yearSubjectId: 788, coeff 5, 03h30, 6+6+8=20)
 * Interactive Lessons — Trimestre 1 : Projet 1 « Textes et documents d’histoire » (5 lessons)
 */
export const LESSONS_3AS_LE_T1: FrenchInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 1: Statut de l’auteur (historien, témoin, journaliste) et modalisation explicite/implicite
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_le_t1_statut_auteur_modalisation',
		slug: 'fre-3as-le-t1-statut-auteur-modalisation',
		grade: '3as_le',
		yearSubjectId: 788,
		trimesterId: 't1',
		sequenceId: 'projet1',
		sequenceTitleAr: 'المشروع 1: Textes et documents d’histoire (التحليل المعمّق للنص التاريخي — لغات أجنبية)',
		order: 1,
		titleAr: 'صفة الكاتب (Historien, témoin, journaliste) والتمظهر الصريح والضمني للذاتية',
		objectives: [
			'تحديد صفة الكاتب بدقة في النص التاريخي (مؤرخ محقق، شاهد معاصر، صحفي أو كاتب مقال) بالاستناد إلى المؤشرات النصية والمصدر',
			'التمييز الدقيق بين التمظهر الصريح للذاتية (Modalisation explicite) والتمظهر الضمني (Modalisation implicite : معجم، تشبيهات، علامات ترقيم، شرطي)',
			'تعليل درجة الحياد أو الالتزام في إجابات بكالوريا اللغات الأجنبية بأسلوب تحليلي متقن'
		],
		keywordsAr: ['Statut de l’auteur', 'Historien', 'Témoin', 'Modalisation explicite', 'Modalisation implicite', 'Effacement énonciatif'],
		discover: {
			scenarioAr:
				'في بكالوريا شعبة اللغات الأجنبية (معامل 5)، يتجاوز سؤال الإسناد التلفظي مجرد « Objectif ou subjectif ? » إلى تحليل دقيق: ما صفة الكاتب (historien, témoin, journaliste)؟ وكيف يتجلى حضوره صراحةً أو ضمناً رغم غياب الضمير « je »؟',
			svg: svgFrenchGrammarMap({
				title: 'Statut de l’auteur et modalisation (BAC LE)',
				rootLabel: 'Qui écrit l’histoire ?',
				rootSub: 'Analyser le paratexte + les indices internes',
				branches: [
					{
						label: 'Historien',
						rule: 'Archives, distance, 3e pers., analyse',
						example: 'Abou El-Kacem Saadallah étudie...'
					},
					{
						label: 'Témoin',
						rule: 'Vécu direct, je / nous, émotion',
						example: 'Nous étions présents ce matin-là.'
					},
					{
						label: 'Journaliste / Chroniqueur',
						rule: 'Synthèse documentée + commentaire',
						example: 'Un hommage vibrant aux pionniers.'
					},
					{
						label: 'Modalisation implicite',
						rule: 'Lexique évaluatif, guillemets, conditionnel',
						example: 'La « pacification » coloniale...'
					}
				]
			}),
			steps: [
				{
					promptAr: 'كيف تميّز في النص التاريخي بين المؤرخ (L’historien) والشاهد (Le témoin)؟',
					hintAr: 'قارن بين الاعتماد على الوثائق والأرشيف من مسافة زمنية، وبين سرد تجربة شخصية معيشة بضمير المتكلم.',
					expectedInput: 'المؤرخ يحلل الوقائع من مسافة زمنية بالوثائق وضمير الغائب؛ والشاهد يروي ما عاشه بنفسه باستعمال je / nous ومشاعر حية',
					revealAr: 'الشاهد (témoin) يقول « Je me souviens, nous avons vécu »؛ أما المؤرخ (historien) فيستعمل ضمير الغائب، ويوثق بالمصادر والتواريخ والتحليل السببي.'
				},
				{
					promptAr: 'ما دلالة وضع كلمة « pacification » بين مزدوجتين في نص حول الاستعمار في الجزائر؟',
					hintAr: 'هل يوافق المؤرخ على هذه التسمية أم يشكك فيها ويدينها؟',
					expectedInput: 'مؤشر ذاتية ضمنية (mise à distance critique / ironie) يدين بها الكاتب التسمية الاستعمارية الزائفة',
					revealAr: 'المزدوجتان الاستنكاريتان (guillemets de mise à distance) من أدق مؤشرات الذاتية الضمنية في بكالوريا اللغات الأجنبية؛ فهي تكشف رفض الكاتب للفظ المستعمل.'
				},
				{
					promptAr: 'في عبارة « Ce fut, sans conteste, un tournant décisif de la lutte nationale »، استخرج موجه اليقين والصفة التقييمية.',
					hintAr: 'ابحث عن الظرف الدال على اليقين والصفة التي تقيم الحدث.',
					expectedInput: 'موجه اليقين: « sans conteste » | الصفة التقييمية: « décisif »',
					revealAr: 'تتضافر الموجهات الظرفية (sans conteste, assurément) مع الصفات التقييمية (décisif, héroïque, tragique) لتكوين ذاتية ضمنية رفيعة المستوى.'
				}
			]
		},
		summary: {
			rulesAr: [
				'صفات الكاتب الثلاث في نصوص التاريخ: (1) المؤرخ (Historien): باحث يعتمد الأرشيف والمنهج النقدي ويميل إلى التواري التلفظي؛ (2) الشاهد (Témoin): فرد عاش الواقعة ويرويها بـ je/nous لإضفاء الصدق المعيش؛ (3) الصحفي/الكاتب (Journaliste): يجمع بين الإخبار والتعليق التذكاري.',
				'التمظهر الصريح للذاتية (Modalisation explicite): ضمائر المتكلم (je, nous)، صفات الملكية (mon, notre)، وأفعال الرأي المباشر (j’estime, nous pensons).',
				'التمظهر الضمني للذاتية (Modalisation implicite — جوهر أسئلة BAC LE): المعجم التقييمي (mélioratif / péjoratif)، الموجهات الظرفية (heureusement, sans doute, incontestablement)، الشرطي التشكيكي (conditionnel de réserve)، والمزدوجتان التبعيديتان (« ... ») أو علامات التعجب.',
				'منهجية الجواب في BAC LE: « L’auteur (historien/journaliste) marque sa présence de manière implicite (ou explicite) à travers : 1) [مؤشر مع مثال نصي] ; 2) [مؤشر ثانٍ مع مثال نصي]. »'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Indices subtils de modalisation (BAC LE)',
				subtitle: 'Au-delà des simples pronoms personnels',
				columns: [
					{
						header: 'Lexique évaluatif',
						rule: 'Adjectifs, noms, adverbes',
						examples: 'admirable / féroce / héroïquement'
					},
					{
						header: 'Typographie & Modes',
						rule: 'Guillemets, conditionnel, « ! »',
						examples: 'la « mission » / aurait refusé'
					},
					{
						header: 'Effacement (Objectif)',
						rule: 'Passif, dates, tournure « il »',
						examples: 'Le congrès eut lieu en 1956.'
					}
				]
			}),
			visualCaptionAr: 'خريطة مؤشرات التمظهر الضمني والصريح في النصوص التاريخية لشعبة اللغات الأجنبية.',
			examples: [
				{
					problemAr: 'Quel est le statut de l’auteur dans un extrait signé « Abou El-Kacem Saadallah, Histoire culturelle de l’Algérie » ?',
					solutionAr: 'L’auteur est un historien : le paratexte (ouvrage d’histoire culturelle), les références documentaires et l’analyse rigoureuse attestent ce statut.'
				},
				{
					problemAr: 'Relevez deux indices de subjectivité implicite dans : « L’appareil colonial prétendait « civiliser » un peuple dont il fermait impitoyablement les écoles. »',
					solutionAr: '1) Le verbe de mise à distance « prétendait » et les guillemets ironiques autour de « civiliser » ; 2) L’adverbe évaluatif péjoratif « impitoyablement ».'
				},
				{
					problemAr: 'Pourquoi un historien peut-il rester rigoureux tout en laissant apparaître une légère subjectivité implicite ?',
					solutionAr: 'Il s’appuie sur des faits et des dates vérifiés tout en exprimant un jugement moral légitime (hommage aux victimes ou condamnation d’une injustice).'
				}
			],
			watchOutAr: 'في شعبة اللغات الأجنبية، غالباً ما يختبئ فخّ السؤال في نص يخلو من « je » لكنه يمتلئ بمزدوجات استنكارية (« ... ») أو أفعال مثل « prétendre » أو صفات مثل « mémorable »؛ فاحذر أن تجيب « objectif » قبل تمشيط كل كلمة!'
		},
		practice: [
			{
				questionAr: 'Dans un texte historique, quel procédé typographique signale une prise de distance critique (subjectivité implicite) ?',
				options: [
					'Les guillemets de mise à distance encadrant un terme contesté par l’auteur',
					'Le point final d’une phrase déclarative neutre',
					'La virgule séparant le jour et l’année',
					'La majuscule en début de nom propre'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: المزدوجتان حول لفظ مشكوك فيه (مثل « pacification ») تعبّران عن سخرية أو تبرؤ ضمني.',
					'خطأ: النقطة العادية محايدة.',
					'خطأ: الفاصلة علامة تنظيم لا تقييم.',
					'خطأ: الحرف الكبير قاعدة إملائية.'
				],
				explanationAr: 'تُعدّ المزدوجتان التبعيديتان أداة دقيقة للذاتية الضمنية في النصوص التاريخية.'
			},
			{
				questionAr: 'Quel indice permet d’identifier avec certitude un « témoin » parmi les auteurs de documents historiques ?',
				options: [
					'L’absence complète de pronoms personnels',
					'L’usage de « je / nous » pour relater un événement directement vécu sur place',
					'La citation exclusive d’archives du XIIe siècle',
					'L’emploi systématique du futur antérieur'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: غياب الضمائر سمة المؤرخ المحايد لا الشاهد.',
					'ممتاز: الشاهد يروي ما رآه وعاشه بضمير المتكلم (je / nous).',
					'خطأ: هذا عمل المؤرخ الباحث.',
					'خطأ: المستقبل الأسبق لا يدل على الشهادة.'
				],
				explanationAr: 'يتحدث الشاهد من داخل التجربة المعيشة بضمير المتكلم المباشر.'
			},
			{
				questionAr: 'Dans la phrase : « Cheikh Larbi Tebessi aurait été enlevé tard dans la nuit selon plusieurs récits concordants », quelle est la valeur du conditionnel passé ?',
				options: [
					'Un ordre adressé au lecteur',
					'Une habitude répétée dans le passé',
					'La prudence de l’historien face à une circonstance rapportée mais non observée directement',
					'Une condition future réalisable'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: الشرطي لا يعبر عن الأمر.',
					'خطأ: العادة يعبر عنها Imparfait.',
					'صحيح: يُسمى conditionnel de réserve / d’incertitude ويُبرز أمانة المؤرخ العلمي.',
					'خطأ: الفعل في conditionnel passé للماضي.'
				],
				explanationAr: 'يستعمل المؤرخ والصحفي الشرطي للتحفظ العلمي حين ينقل معلومة لم يوثقها بنفسه.'
			},
			{
				questionAr: 'Parmi ces énoncés, lequel illustre parfaitement l’effacement énonciatif (objectivité stricte) ?',
				options: [
					'Ce héros exceptionnel mérite notre profonde admiration.',
					'Nous n’oublierons jamais cette épreuve douloureuse.',
					'Hélas, la censure frappa lâchement la presse libre.',
					'Le journal Al-Chihab parut à Constantine à partir de 1925.'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: يحتوي على notre وصفات تقييمية (exceptionnel, profonde).',
					'خطأ: يحتوي على Nous و douloureuse.',
					'خطأ: يحتوي على Hélas و lâchement.',
					'أحسنت: جملة إخبارية محايدة تماماً بضمير الغائب مع مكان وتاريخ دقيقين.'
				],
				explanationAr: 'التواري التلفظي يتحقق بخلو الجملة من ضمائر المتكلم والموجهات والمعجم التقييمي.'
			},
			{
				questionAr: 'Que révèle le verbe « prétendait » dans : « L’administration coloniale prétendait protéger l’enseignement » ?',
				options: [
					'Une modalisation implicite par laquelle l’auteur rejette la sincérité de cette affirmation',
					'Une approbation totale de l’auteur',
					'Un fait purement géographique',
					'Une simple concordance de futur'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الفعل prétendre يشكّك في صدق الادعاء الاستعماري.',
					'خطأ: العكس تماماً، فهو يفضح زيف الادعاء.',
					'خطأ: لا علاقة له بالجغرافيا.',
					'خطأ: الفعل في Imparfait.'
				],
				explanationAr: 'تؤدي أفعال مثل prétendre و alléguer دور موجهات التشكيك والتبعيد النقدي.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 2: Nominalisation complexe, passif pronominal et effets de style
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_le_t1_nominalisation_passif_pronominal',
		slug: 'fre-3as-le-t1-nominalisation-passif-pronominal',
		grade: '3as_le',
		yearSubjectId: 788,
		trimesterId: 't1',
		sequenceId: 'projet1',
		sequenceTitleAr: 'المشروع 1: Textes et documents d’histoire (التحليل المعمّق للنص التاريخي — لغات أجنبية)',
		order: 2,
		titleAr: 'التسمية المركبة والمبني للمجهول الضمائري وأثرهما الأسلوبي (Nominalisation et passif pronominal)',
		objectives: [
			'إتقان التسمية المركبة (Nominalisation complexe) بتحويل الجمل التي تضم صفات وظروفاً ومكملات إلى تراكيب اسمية مكثفة وأنيقة',
			'التمييز بين المبني للمجهول العادي (Passif canonique : être + PP) والمبني للمجهول الضمائري (Passif pronominal : se diffuser, s’écrire, se préparer)',
			'تحليل الأثر الأسلوبي للتركيز على الحدث (Focalisation sur le fait) وتكثيف المعلومة في النصوص التاريخية'
		],
		keywordsAr: ['Nominalisation complexe', 'Passif canonique', 'Passif pronominal', 'Focalisation', 'Concision'],
		discover: {
			scenarioAr:
				'في نصوص بكالوريا اللغات الأجنبية، لا يقتصر البناء للمجهول على « fut fondé » فقط؛ بل يرد كثيراً « Le passif pronominal » مثل: « Le journal El-Bassaïr se lisait dans tous les villages » (= était lu). كما تُطلب التسمية المركبة لتلخيص الفقرات بدقة عالية!',
			svg: svgFrenchWordFormation({
				title: 'Nominalisation complexe (BAC LE)',
				prefix: 'ré- / in- / dé-',
				root: 'restaur / organis / résist',
				suffix: '-ation / -ment / -ance',
				derivedWord: 'La restauration rapide / L’organisation secrète',
				meaningNote: 'Verbe -> Nom | Adverbe -> Adjectif | Sujet -> Complément du nom (de/par)'
			}),
			steps: [
				{
					promptAr: 'حوّل هذه الجملة المركبة إلى عبارة اسمية واحدة: « Les savants ont défendu courageusement la langue arabe. »',
					hintAr: 'حوّل الفعل إلى اسم (défense)، والظرف إلى صفة مطابقة (courageuse)، والمفعول والفاعل إلى مضافين (de / par).',
					expectedInput: 'La défense courageuse de la langue arabe par les savants.',
					revealAr: 'في التسمية المركبة: الفعل يصبح اسماً (défendre -> défense)، الظرف يصبح صفة (courageusement -> courageuse)، والمفعول به يُربط بـ « de » والفاعل بـ « par ».'
				},
				{
					promptAr: 'تأمل الجملة: « La revue Al-Chihab se vendait secrètement dans les marchés. » ما نوع الفعل « se vendait »؟ وهل تعني أن المجلة تبيع نفسها؟',
					hintAr: 'عوضها بـ « était vendue » لتكتشف معناها الحقيقي!',
					expectedInput: 'مبني للمجهول ضمائري (Passif pronominal) بمعنى « était vendue »',
					revealAr: 'المبني للمجهول الضمائري (se + verbe à la 3e personne مع فاعل غير عاقل) يعطي معنى المجهول (était vendue) دون ذكر الفاعل وبإيقاع أرشق وأسلس!'
				},
				{
					promptAr: 'متى يختار الكاتب المبني للمجهول الضمائري بدل المبني للمجهول العادي؟',
					hintAr: 'لاحظ أنه لا يقبل مكمّل الفاعل (par...) ويبقي الحدث في الواجهة كحقيقة عامة أو عادة.',
					expectedInput: 'لإبراز الحدث كعملية عامة أو متكررة دون الحاجة لذكر الفاعل (تعميم وموضوعية وأناقة أسلوبية)',
					revealAr: 'يُستعمل Passif pronominal مع الفاعل غير الحي (L’histoire s’écrit, les tracts se distribuaient) ولا يُتبع بـ « par + agent ».'
				}
			]
		},
		summary: {
			rulesAr: [
				'قواعد التسمية المركبة (Nominalisation complexe): (1) الفعل -> اسم (restaurer -> restauration، interdire -> interdiction، disparaître -> disparition، accroître -> accroissement)؛ (2) الظرف -> صفة تطابق الاسم (patiemment -> patiente، rapidement -> rapide)؛ (3) الصفة -> اسم مجرد (courageux -> courage، libre -> liberté، fidèle -> fidélité).',
				'المبني للمجهول العادي (Passif canonique): Sujet patient + ÊTRE (au temps voulu) + Participe passé accordé (+ par/de + agent).',
				'المبني للمجهول الضمائري (Passif pronominal): Sujet inanimé + se + verbe à la 3e personne (ex. : Les manuscrits se conservent = sont conservés ; La nouvelle s’est répandue = a été répandue). تنبيه: لا نضيف « par + agent » بعد المبني للمجهول الضمائري!',
				'الأثر الأسلوبي (Effet de style): التسمية تحقق الإيجاز والكثافة الفكرية (concision et densité) وهي أداة ممتازة في التقرير النقدي؛ والمبني للمجهول بنوعيه يركز الانتباه على الواقعة التاريخية ويعزز الموضوعية.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Deux formes du passif en BAC LE',
				rootLabel: 'Focaliser sur l’événement',
				rootSub: 'Comparer passif canonique et passif pronominal',
				branches: [
					{
						label: 'Passif canonique',
						rule: 'être + PP (+ par + agent)',
						example: 'Le texte fut rédigé par Ben M’hidi.'
					},
					{
						label: 'Passif pronominal',
						rule: 'se + verbe (sans « par »)',
						example: 'Le journal se lisait partout.'
					},
					{
						label: 'Nominalisation',
						rule: 'Condensation de la phrase',
						example: 'La diffusion clandestine du journal.'
					}
				]
			}),
			visualCaptionAr: 'مقارنة البناء للمجهول العادي والضمائري والتسمية المركبة في النصوص الأدبية والتاريخية.',
			examples: [
				{
					problemAr: 'Nominalisez cette phrase : « Les archives nationales ont été soigneusement classées. »',
					solutionAr: 'Le classement soigneux des archives nationales.'
				},
				{
					problemAr: 'Transformez ce passif canonique en passif pronominal : « Ces chroniques sont encore lues dans les universités. »',
					solutionAr: 'Ces chroniques se lisent encore dans les universités.'
				},
				{
					problemAr: 'Relevez la valeur de « se transmettait » dans : « La mémoire de la résistance se transmettait de génération en génération. »',
					solutionAr: 'C’est un passif pronominal (= était transmise) : il met l’accent sur la continuité collective de la transmission sans désigner un agent unique.'
				}
			],
			watchOutAr: 'احذر إضافة « par + الفاعل » مع المبني للمجهول الضمائري! نقول « Le livre fut traduit par un savant » (صواب)، ولا نقول « Le livre se traduisit par un savant » (خطأ)!'
		},
		practice: [
			{
				questionAr: 'Dans quelle phrase le verbe pronominal a-t-il un sens passif (passif pronominal) ?',
				options: [
					'Les élèves se saluent dans la cour.',
					'Le journal El-Bassaïr se lisait à voix haute dans les villages.',
					'Le chercheur se souvient de cette date.',
					'Les voyageurs se reposent à l’ombre.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: معنى متبادل (réciproque: يحيي بعضهم بعضاً).',
					'ممتاز: الفاعل غير عاقل (Le journal) والمعنى « était lu » (كان يُقرأ).',
					'خطأ: فعل ضمائري أصيل (essentiellement pronominal).',
					'خطأ: فعل انعكاسي للفاعل العاقل (réfléchi).'
				],
				explanationAr: 'يتحقق Passif pronominal عندما يكون الفاعل غير عاقل ويمكن تعويض الفعل بـ être + participe passé.'
			},
			{
				questionAr: 'Nominalisez avec précision : « Les citoyens ont accueilli chaleureusement la proclamation. »',
				options: [
					'L’accueil chaleureux de la proclamation par les citoyens.',
					'L’accueillage chaleureusement de la proclamation.',
					'L’accueillation chaude de la proclamation.',
					'Accueillir chaleureux la proclamation.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح 100%: accueillir -> accueil، chaleureusement -> chaleureux، والمفعول والفاعل مربوطان بـ de و par.',
					'خطأ: لا توجد كلمة accueillage ولا نترك الظرف.',
					'خطأ: اشتقاق غير صحيح.',
					'خطأ: بقيت الجملة بالمصدر بلا تسمية.'
				],
				explanationAr: 'التسمية المركبة تحول الفعل إلى اسم والظرف إلى صفة مطابقة له.'
			},
			{
				questionAr: 'Quelle est la nominalisation adjectivale correcte de : « Les militants restaient fidèles et résolus » ?',
				options: [
					'La fidélité et la résolution des militants',
					'Le fidèlement et le résolument des militants',
					'La fidélation et la résolure des militants',
					'Le fidélisme et la résolue des militants'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: fidèle -> fidélité، و résolu -> résolution.',
					'خطأ: اشتقاق غير صحيح.',
					'خطأ: كلمات غير موجودة في الفرنسية.',
					'خطأ: غير صحيح صرفياً.'
				],
				explanationAr: 'التسمية تشمل أيضاً تحويل الصفات إلى أسماء معنوية (-té, -ion, -ance).'
			},
			{
				questionAr: 'Transformez ce passif canonique en passif pronominal sans erreur : « L’histoire véritable est écrite avec des preuves. »',
				options: [
					'L’histoire véritable s’écrit avec des preuves.',
					'L’histoire véritable s’écrit par des historiens.',
					'L’histoire véritable est s’écrite avec des preuves.',
					'L’histoire véritable se écrit avec des preuves.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: s’écrit (= est écrite) مع حذف العلة قبل الحرف الصوتي ودون complément d’agent.',
					'خطأ: لا يجوز وضع « par + agent » مع Passif pronominal.',
					'خطأ: تركيب نحوي فاسد.',
					'خطأ: يجب حذف e من se أمام الحرف الصوتي (s’écrit).'
				],
				explanationAr: 'المبني للمجهول الضمائري يستعمل « se + الفعل » بدون مكمّل فاعل (par).'
			},
			{
				questionAr: 'Quel est le principal intérêt stylistique de la nominalisation dans un compte rendu critique de BAC LE ?',
				options: [
					'Condenser les idées de l’auteur avec concision et élégance sans recopier le texte',
					'Allonger inutilement les phrases par des répétitions',
					'Supprimer tous les liens logiques du texte',
					'Transformer le texte en dialogue familier'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: التسمية تمنح التلخيص كثافة وإيجازاً وأسلوباً أكاديمياً رفيعاً.',
					'خطأ: العكس تماماً، التسمية تختصر الجمل.',
					'خطأ: لا تلغي الروابط المنطقية.',
					'خطأ: تنتمي للأسلوب الرسمي الراقي.'
				],
				explanationAr: 'تُعدّ التسمية الأداة المثلى لإعادة صياغة الأفكار بإيجاز في التقرير النقدي.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 3: Discours direct, indirect et indirect libre dans le témoignage
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_le_t1_discours_direct_indirect_libre',
		slug: 'fre-3as-le-t1-discours-direct-indirect-libre',
		grade: '3as_le',
		yearSubjectId: 788,
		trimesterId: 't1',
		sequenceId: 'projet1',
		sequenceTitleAr: 'المشروع 1: Textes et documents d’histoire (التحليل المعمّق للنص التاريخي — لغات أجنبية)',
		order: 3,
		titleAr: 'أنماط الخطاب المنقول في الشهادة التاريخية (Discours direct, indirect et indirect libre)',
		objectives: [
			'التمييز الدقيق بين أنماط نقل الكلام الثلاثة: المباشر (DD)، غير المباشر (DI)، وغير المباشر الحر (Discours indirect libre — DIL)',
			'تحديد مؤشرات الخطاب غير المباشر الحر (غياب فعل القول و que، حضور Imparfait / Conditionnel مع تعجب أو استفهام أو نبرة الشخصية)',
			'إتقان التحويلات المعقدة في الخطاب المنقول مع توافق الأزمنة والاستفهام الجزئي والكلي والأمر'
		],
		keywordsAr: ['Discours direct', 'Discours indirect', 'Discours indirect libre', 'Témoignage', 'Concordance des temps'],
		discover: {
			scenarioAr:
				'في شعبة اللغات الأجنبية، يُضاف إلى الخطاب المباشر وغير المباشر نمط ثالث رفيع يرد في الشهادات والسرد التاريخي الأدبي: الخطاب غير المباشر الحر (Le discours indirect libre)، حيث تمتزج كلمات الشاهد بسرد الكاتب دون مزدوجتين ودون « il dit que »!',
			svg: svgFrenchGrammarMap({
				title: 'Les 3 formes du discours rapporté (BAC LE)',
				rootLabel: 'Rapporter la parole d’un témoin',
				rootSub: 'Comparer ponctuation, subordination et expressivité',
				branches: [
					{
						label: 'Discours direct (DD)',
						rule: '« ... », verbe introducteur, temps originaux',
						example: 'Il déclara : « Nous tiendrons bon ! »'
					},
					{
						label: 'Discours indirect (DI)',
						rule: 'Subordonnée (que/si/de), concordance',
						example: 'Il déclara qu’ils tiendraient bon.'
					},
					{
						label: 'Indirect libre (DIL)',
						rule: 'Sans « que » ni « », temps du DI + « !/? »',
						example: 'Ils tiendraient bon ! Rien ne les briserait.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'قارن الجمل الثلاث: (1) Il affirma : « Pourquoi céderions-nous ? » | (2) Il demanda pourquoi ils céderaient. | (3) Il releva la tête : pourquoi céderaient-ils ? أيها خطاب غير مباشر حر (DIL)؟',
					hintAr: 'ابحث عن الجملة التي تغيب فيها المزدوجتان ويغيب فيها « demanda » مع بقاء علامة الاستفهام وزمن الشرطي (ils céderaient)!',
					expectedInput: 'الجملة (3): Il releva la tête : pourquoi céderaient-ils ?',
					revealAr: 'الجملة (3) تجمع بين سمات غير المباشر (ضمير الغائب ils وزمن الشرطي) وسمات المباشر (غياب أداة الربط وبقاء علامة الاستفهام والنبرة الانفعالية).'
				},
				{
					promptAr: 'ما الأثر الأسلوبي للخطاب غير المباشر الحر (DIL) في الشهادة التاريخية؟',
					hintAr: 'هل يبطئ السرد أم يدمج صوت الشاهد ومشاعره بسلاسة داخل النص؟',
					expectedInput: 'يحفظ تدفق السرد وينقل مشاعر وأفكار الشخصية من الداخل بحيوية وصدق',
					revealAr: 'يسمح DIL بالدخول إلى وجدان الشاهد أو الفاعل التاريخي ونقل صوته الحي دون قطع إيقاع النص بأفعال قول متكررة.'
				},
				{
					promptAr: 'حوّل هذا الاستفهام الجزئي إلى خطاب غير مباشر (DI): L’historien demanda au témoin : « Qu’avez-vous ressenti ce matin-là ? »',
					hintAr: '« Que » الاستفهامية تتحول إلى « ce que »، و Passé composé إلى Plus-que-parfait.',
					expectedInput: 'L’historien demanda au témoin ce qu’il avait ressenti ce matin-là.',
					revealAr: 'تتحول « Que / Qu’est-ce que » إلى « ce que »، و« Qu’est-ce qui » إلى « ce qui »، مع إلغاء قلب الفاعل وحذف علامة الاستفهام.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الخطاب المباشر (DD): ينقل الكلام حرفياً بعلامات تنصيص « ... »، يحافظ على الضمائر والأزمنة الأصلية ويبرز حيوية الشهادة وصدقها.',
				'الخطاب غير المباشر (DI): يدمج الكلام في جملة تابعة (que / si / ce que / ce qui / où / quand / pourquoi / de + inf.) مع تطبيق توافق الأزمنة عند كون فعل القول ماضياً: Présent -> Imparfait | Passé composé -> Plus-que-parfait | Futur simple -> Conditionnel présent | Futur antérieur -> Conditionnel passé.',
				'الخطاب غير المباشر الحر (DIL — خاص بـ BAC LE): (1) يغيب فيه فعل القول وأداة الربط (que / si) والمزدوجتان؛ (2) يحتفظ بضمائر الغائب وتوافق أزمنة DI (Imparfait, Conditionnel, Plus-que-parfait)؛ (3) يحتفظ بعلامات التعبير والانفعال (؟ ، ! ، عبارات الشاهد).',
				'الخطاب المسرود (Discours narrativisé): يلخص الكاتب مضمون الكلام بجملة واحدة دون نقل تفاصيله، مثل: « Le témoin évoqua son enfance à Constantine. »'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Interrogation au Discours Indirect (BAC LE)',
				subtitle: 'Conversions exactes des mots interrogatifs',
				columns: [
					{
						header: 'Oui / Non',
						rule: 'Est-ce que / Inversion',
						examples: '-> si + sujet + verbe'
					},
					{
						header: 'Que / Qu’est-ce que',
						rule: 'Objet direct (COD)',
						examples: '-> ce que + sujet + verbe'
					},
					{
						header: 'Qu’est-ce qui',
						rule: 'Sujet de la question',
						examples: '-> ce qui + verbe'
					}
				]
			}),
			visualCaptionAr: 'تحويلات أدوات الاستفهام في الخطاب غير المباشر لشعبة اللغات الأجنبية.',
			examples: [
				{
					problemAr: 'Identifiez le type de discours : « Les militants observèrent les montagnes : non, jamais ils n’abandonneraient leur terre ! »',
					solutionAr: 'Discours indirect libre (DIL) : absence de guillemets et de verbe introducteur, maintien du conditionnel « abandonneraient » (3e pers.) et de l’exclamation « non, jamais ... ! ».'
				},
				{
					problemAr: 'Transposez au discours indirect : Le témoin précisa : « Dès que nous aurons imprimé le journal, nous le distribuerons. »',
					solutionAr: 'Le témoin précisa que dès qu’ils auraient imprimé le journal, ils le distribueraient. (Futur antérieur -> Conditionnel passé ; Futur simple -> Conditionnel présent).'
				},
				{
					problemAr: 'Transposez au discours indirect : Le journaliste lui demanda : « Qu’est-ce qui vous a donné cette force ? »',
					solutionAr: 'Le journaliste lui demanda ce qui lui avait donné cette force.'
				}
			],
			watchOutAr: 'انتبه في الخطاب غير المباشر إلى تحويل Futur antérieur (« nous aurons fini ») إلى Conditionnel passé (« ils auraient fini »)، ولا تنسَ أن الخطاب غير المباشر الحر يُصاغ بضمير الغائب مع الحفاظ على الترقيم الانفعالي (! / ?).'
		},
		practice: [
			{
				questionAr: 'Quel passage relève du discours indirect libre (DIL) ?',
				options: [
					'Le témoin déclara : « La liberté approche ! »',
					'Le témoin déclara que la liberté approchait.',
					'Le témoin contempla la ville : oui, bientôt la liberté approcherait !',
					'Le témoin évoqua brièvement l’avenir de la ville.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: هذا خطاب مباشر (مزدوجتان وفعل قول).',
					'خطأ: هذا خطاب غير مباشر (فعل قول + que).',
					'ممتاز: غياب فعل القول والمزدوجتين، مع « oui » وعلامة التعجب وزمن الشرطي (approcherait) = خطاب غير مباشر حر.',
					'خطأ: هذا خطاب مسرود (discours narrativisé).'
				],
				explanationAr: 'يجمع DIL بين أزمنة وضمائر الخطاب غير المباشر والتعبيرية المباشرة دون فعل قول.'
			},
			{
				questionAr: 'Transformez au discours indirect : Il affirma : « Lorsque le pays aura recouvré sa liberté, nous bâtirons des universités. »',
				options: [
					'Il affirma que lorsque le pays aurait recouvré sa liberté, ils bâtiraient des universités.',
					'Il affirma que lorsque le pays aura recouvré sa liberté, ils bâtiront des universités.',
					'Il affirma que lorsque le pays avait recouvré sa liberté, ils bâtissaient des universités.',
					'Il affirma que lorsque le pays recouvrera sa liberté, nous bâtirions des universités.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح 100%: Futur antérieur -> Conditionnel passé (aurait recouvré) و Futur simple -> Conditionnel présent (bâtiraient).',
					'خطأ: لم تُطبّق مطابقة الأزمنة مع فعل القول الماضي.',
					'خطأ: Plus-que-parfait و Imparfait لا يقابلان المستقبلين هنا.',
					'خطأ: اختلاط الأزمنة وبقاء الضمير nous.'
				],
				explanationAr: 'عند فعل قول ماضٍ: Futur antérieur -> Conditionnel passé، و Futur simple -> Conditionnel présent.'
			},
			{
				questionAr: 'Choisissez la bonne transformation de : L’historien demanda : « Que signifiait ce symbole pour vous ? »',
				options: [
					'L’historien demanda que signifiait ce symbole pour eux.',
					'L’historien demanda ce que signifiait ce symbole pour eux.',
					'L’historien demanda si signifiait ce symbole pour eux.',
					'L’historien demanda ce qui signifiait ce symbole pour vous.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: « Que » الاستفهامية تصبح « ce que ».',
					'أحسنت: تحويل دقيق لـ « Que » إلى « ce que » وللضمير « vous » إلى « eux »، وبقاء Imparfait كما هو.',
					'خطأ: « si » للسؤال الكلي فقط.',
					'خطأ: « ce qui » للفاعل، كما لم يتحول الضمير « vous ».'
				],
				explanationAr: 'في السؤال غير المباشر: « Que...? » تتحول إلى « ce que... » ويبقى Imparfait دون تغيير.'
			},
			{
				questionAr: 'Quel est l’effet stylistique principal du discours indirect libre dans un récit historique ou un témoignage ?',
				options: [
					'Supprimer toute émotion du texte',
					'Remplacer tous les noms propres par des dates',
					'Introduire une liste de définitions lexicales',
					'Faire entendre vivement la pensée intime du témoin tout en préservant la fluidité du récit'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: بالعكس، ينقل الانفعال والتأثر بدقة.',
					'خطأ: لا علاقة له بالتواريخ.',
					'خطأ: ليس أسلوب تعريف معجمي.',
					'صحيح: يدمج صوت الشخصية ومشاعرها بسلاسة في نسيج السرد.'
				],
				explanationAr: 'يجمع DIL بين رصانة السرد بضمير الغائب وحيوية الصوت الداخلي للشاهد.'
			},
			{
				questionAr: 'Que devient l’expression temporelle « dans deux jours » au discours indirect lorsque le verbe introducteur est au passé ?',
				options: ['deux jours plus tard', 'deux jours plus tôt', 'la veille', 'ce jour-là'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: « dans deux jours » يتحول في الماضي إلى « deux jours plus tard ».',
					'خطأ: « deux jours plus tôt » يقابل « il y a deux jours ».',
					'خطأ: « la veille » يقابل « hier ».',
					'خطأ: « ce jour-là » يقابل « aujourd’hui ».'
				],
				explanationAr: 'التحولات الدقيقة للمؤشرات: il y a X jours -> X jours plus tôt | dans X jours -> X jours plus tard.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 4: Chronologie, rétrospection (plus-que-parfait) et présent de narration
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_le_t1_chronologie_retrospection_narration',
		slug: 'fre-3as-le-t1-chronologie-retrospection-narration',
		grade: '3as_le',
		yearSubjectId: 788,
		trimesterId: 't1',
		sequenceId: 'projet1',
		sequenceTitleAr: 'المشروع 1: Textes et documents d’histoire (التحليل المعمّق للنص التاريخي — لغات أجنبية)',
		order: 4,
		titleAr: 'التسلسل الزمني، الاسترجاع (Plus-que-parfait / Analepse) ومضارع السرد التاريخي',
		objectives: [
			'تحليل التنظيم الزمني للنص التاريخي: التتابع الكرونولوجي الخطي مقابل الاسترجاع الزمني (Rétrospection / Analepse) والاستشراف (Prolepse)',
			'إتقان توظيف الأزمنة المركبة الدالة على الأسبقية (Plus-que-parfait et Passé antérieur) إلى جانب Passé simple و Imparfait',
			'التمييز الدقيق بين قيم المضارع المختلفة في نفس النص التاريخي (Présent historique, présent de vérité générale, présent d’énonciation)'
		],
		keywordsAr: ['Chronologie', 'Rétrospection', 'Plus-que-parfait', 'Passé antérieur', 'Présent de narration', 'Antériorité'],
		discover: {
			scenarioAr:
				'المؤرخ المتمكن لا يكتفي بسرد التواريخ سطراً بعد سطر: فقد يبدأ بحدث حاسم (مثل 1954)، ثم يعود إلى الوراء بالاسترجاع (Rétrospection) باستعمال Plus-que-parfait ليشرح جذور الحدث منذ 1931، ثم يستعمل Présent de narration ليُحيي لحظة تاريخية فارقة.',
			svg: svgFrenchTenseTimeline({
				title: 'Chronologie et rétrospection (BAC LE)',
				tenseName: 'Plus-que-parfait -> Passé simple -> Présent de narration',
				formula: 'Antériorité (PQP / Passé antérieur) + Fait clé (PS) + Actualisation (Présent)',
				activeZone: 'two_past',
				example: 'Les Oulémas avaient formé une élite ; en 1954, le pays s’engage dans la lutte.',
				markers: 'auparavant, dès lors, quelques années plus tôt, soudain, aujourd’hui encore'
			}),
			steps: [
				{
					promptAr: 'في الجملة: « En 1956, le Congrès de la Soummam structura une lutte que les pionniers avaient préparée dès 1954. » أي زمن يحقق الاسترجاع الزمني (Rétrospection)؟',
					hintAr: 'ابحث عن الفعل الدال على الحدث الأسبق زمنياً.',
					expectedInput: 'Le plus-que-parfait (« avaient préparée »)',
					revealAr: 'الماضي الأسبق (Plus-que-parfait) يرجع بالقارئ إلى مرحلة سابقة لتوضيح أسباب أو مقدمات الحدث الرئيسي.'
				},
				{
					promptAr: 'متى يُستعمل Passé antérieur (« dès qu’ils eurent diffusé l’appel, la nouvelle se répandit ») بدل Plus-que-parfait؟',
					hintAr: 'انظر إلى الرابط « dès que » وإلى زمن الجملة الرئيسية (Passé simple).',
					expectedInput: 'بعد روابط الأسبقية المباشرة (dès que, aussitôt que, après que) عندما يكون فعل الجملة الرئيسية في Passé simple',
					revealAr: 'يُستعمل Passé antérieur (eut / fut + PP) مع Passé simple للتعبير عن أسبقية فورية ومباشرة (antériorité immédiate) في الأسلوب الأدبي والتاريخي الراقي.'
				},
				{
					promptAr: 'في نفس النص التاريخي، كيف تميّز بين « En 1962, le peuple célèbre sa liberté » و « Aujourd’hui encore, les historiens saluent ce courage »؟',
					hintAr: 'انظر إلى الإطار الزمني في بداية كل جملة (En 1962 مقابل Aujourd’hui encore).',
					expectedInput: 'الأول مضارع تاريخي/سردي (Présent de narration) يروي الماضي، والثاني مضارع التلفظ الحاضر (Présent d’énonciation)',
					revealAr: 'في بكالوريا اللغات الأجنبية قد يرد المضارع بقيمتين مختلفتين داخل نفس النص؛ العبرة دوماً بالمؤشر الزمني والمعنى السياقي!'
				}
			]
		},
		summary: {
			rulesAr: [
				'الاسترجاع الزمني (Rétrospection / Retour en arrière): قطع التسلسل الزمني للعودة إلى حدث سابق يفسّر الحدث الراهن، ويعتمد على Plus-que-parfait (avait/était + PP) ومؤشرات مثل: auparavant, quelques années plus tôt, jadis.',
				'الأسبقية الفورية في السرد التاريخي: بعد dès que / aussitôt que / à peine... que / après que مع جملة رئيسية في Passé simple، نستعمل Le passé antérieur (eut / furent + PP). مثال: Aussitôt qu’il eut prononcé son discours, l’assemblée l’approuva.',
				'القيم الثلاث للمضارع في النص التاريخي (مهم جداً في BAC LE): (1) Présent historique / de narration (مع تاريخ ماضٍ: لإحياء الحدث وتقريبه)؛ (2) Présent d’énonciation / actuel (مع aujourd’hui, de nos jours: زمن كتابة المقال)؛ (3) Présent de vérité générale (حكمة أو قاعدة عامة دائمة).',
				'تذكّر مطابقة اسم المفعول مع avoir حين يسبق المفعول به المباشر (COD) الفعل! مثال: « la lutte que les pionniers avaient préparée » (COD = que = la lutte مؤنث مفرد، لذا نضيف -e إلى préparée!).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Les trois valeurs du Présent au BAC LE',
				subtitle: 'Identifier la nuance exacte selon le contexte',
				columns: [
					{
						header: 'Historique',
						rule: 'Fait passé actualisé',
						examples: 'En 1931, Ben Badis fonde...'
					},
					{
						header: 'Énonciation',
						rule: 'Moment où l’auteur écrit',
						examples: 'Aujourd’hui, on commémore...'
					},
					{
						header: 'Vérité générale',
						rule: 'Loi ou maxime intemporelle',
						examples: 'L’histoire éclaire l’avenir.'
					}
				]
			}),
			visualCaptionAr: 'التمييز الدقيق بين قيم المضارع الثلاث في نصوص بكالوريا اللغات الأجنبية.',
			examples: [
				{
					problemAr: 'Justifiez l’emploi du plus-que-parfait : « Il publia en 1928 les chroniques qu’il avait patiemment rassemblées. »',
					solutionAr: 'Le plus-que-parfait exprime une antériorité (rétrospection) par rapport au passé simple « publia » ; notez aussi l’accord de « rassemblées » avec le COD antéposé « que » (= les chroniques).'
				},
				{
					problemAr: 'Identifiez la valeur des deux présents : « En 1957, la Casbah résiste avec dignité. Aujourd’hui, ses ruelles rappellent ce courage. »',
					solutionAr: '« résiste » : présent historique (de narration) ; « rappellent » : présent d’énonciation (actuel).'
				},
				{
					problemAr: 'Conjuguez au passé antérieur : « Dès que les dirigeants (rédiger) la proclamation, les courriers partirent. »',
					solutionAr: 'Dès que les dirigeants eurent rédigé la proclamation, les courriers partirent.'
				}
			],
			watchOutAr: 'انتبه في التمييز بين « dès que + Passé antérieur » (مع Passé simple) و« après que + Indicatif » (وليس Subjonctif! بعد avant que نستعمل Subjonctif، أما بعد après que فنستعمل Indicatif!).'
		},
		practice: [
			{
				questionAr: 'Dans : « Aussitôt qu’ils .......... les tracts, les militants gagnèrent les montagnes », complétez au passé antérieur :',
				options: ['eurent imprimé', 'avaient imprimé', 'ont imprimé', 'auront imprimé'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: Passé antérieur (eurent imprimé) يعبّر عن الأسبقية المباشرة قبل Passé simple (gagnèrent).',
					'خطأ: هذا Plus-que-parfait.',
					'خطأ: هذا Passé composé.',
					'خطأ: هذا Futur antérieur.'
				],
				explanationAr: 'يتكون Passé antérieur من المساعد avoir/être في Passé simple + اسم المفعول.'
			},
			{
				questionAr: 'Dans : « En 1962, la joie envahit les rues ; aujourd’hui encore, cette date demeure sacrée », quelles sont les deux valeurs du présent ?',
				options: [
					'Présent d’habitude puis présent de futur proche',
					'Présent historique (« envahit ») puis présent d’énonciation (« demeure »)',
					'Deux présents de vérité scientifique',
					'Présent de passé récent puis impératif'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: ليست عادة ولا مستقبلاً قريباً.',
					'صحيح: « envahit » مرتبط بـ 1962 (تاريخي)، و« demeure » مرتبط بـ aujourd’hui encore (تلفظي راهن).',
					'خطأ: الفعل الأول يروي واقعة محددة في 1962.',
					'خطأ: لا يوجد أمر هنا.'
				],
				explanationAr: 'التقاط المؤشرات الزمنية (En 1962 / aujourd’hui encore) يحسم قيمة المضارع بدقة.'
			},
			{
				questionAr: 'Pourquoi écrit-on « les écoles qu’ils avaient fondées » avec « -es » ?',
				options: [
					'Parce que le sujet « ils » est masculin pluriel',
					'Parce que tous les participes passés prennent -es',
					'Parce que le COD « que » (= les écoles, fém. plur.) est placé avant l’auxiliaire avoir',
					'Parce que le verbe est conjugué au présent'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: مع avoir لا نطابق مع الفاعل.',
					'خطأ: قاعدة خاطئة.',
					'أحسنت: يطابق اسم المفعول مع avoir إذا سبقه المفعول به المباشر (COD).',
					'خطأ: الفعل في Plus-que-parfait.'
				],
				explanationAr: 'مطابقة اسم المفعول مع avoir تكون مع الـ COD المتقدم على الفعل.'
			},
			{
				questionAr: 'Comment appelle-t-on le procédé par lequel un historien interrompt la chronologie pour revenir sur un événement antérieur ?',
				options: [
					'Une antiphrase',
					'Une exhortation',
					'Une énumération',
					'Une rétrospection (ou analepse / retour en arrière)'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: السخرية الضدية لا علاقة لها بالزمن.',
					'خطأ: التحريض يخص نص النداء.',
					'خطأ: التعداد أسلوب عرض لا استرجاع زمني.',
					'صحيح: العودة بالزمن إلى الوراء تسمى rétrospection (أو analepse).'
				],
				explanationAr: 'الاسترجاع الزمني يوضح أسباب الأحداث بالعودة إلى وقائع أسبق باستعمال Plus-que-parfait.'
			},
			{
				questionAr: 'Complétez correctement : « Après que les savants .......... cette revue, les lecteurs affluèrent. »',
				options: ['eurent fondé', 'aient fondé', 'fondassent', 'fonderont'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: بعد « après que » نستعمل صيغة Indicatif (هنا Passé antérieur ليتوافق مع affluèrent).',
					'خطأ: « après que » لا يأخذ Subjonctif بل Indicatif (بخلاف avant que).',
					'خطأ: Subjonctif imparfait خطأ بعد après que.',
					'خطأ: عدم توافق زمني مع الماضي البسيط.'
				],
				explanationAr: 'القاعدة الأكاديمية: avant que + subjonctif | après que + indicatif.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 5: Maîtriser le Compte Rendu Critique au BAC Langues Étrangères (8 points !)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_le_t1_crc_bac_le',
		slug: 'fre-3as-le-t1-crc-bac-le',
		grade: '3as_le',
		yearSubjectId: 788,
		trimesterId: 't1',
		sequenceId: 'projet1',
		sequenceTitleAr: 'المشروع 1: Textes et documents d’histoire (التحليل المعمّق للنص التاريخي — لغات أجنبية)',
		order: 5,
		titleAr: 'إتقان التقرير النقدي في بكالوريا لغات أجنبية (Compte Rendu Critique — 8 points !)',
		objectives: [
			'استيعاب الوزن الضخم للإنتاج الكتابي في بكالوريا اللغات الأجنبية (8 نقاط من 20 بمعامل 5 = 40 نقطة موزونة!)',
			'تحرير تقرير نقدي معمّق ومهيكل في 180 إلى 220 كلمة يتفوق على المستوى العادي بدقة التحليل وإعادة الصياغة الراقية',
			'صياغة فقرة نقدية عالية المستوى تقوّم القيمة الوثائقية، الموضوعية/الذاتية، الأسلوب، والبنية، مع فتح أفق فكري متزن'
		],
		keywordsAr: ['Compte rendu critique LE', '8 points', 'Coefficient 5', 'Évaluation stylistique', 'Reformulation experte'],
		discover: {
			scenarioAr:
				'في شعبة اللغات الأجنبية، الإنتاج الكتابي يساوي **8 نقاط كاملة** (وبالمعامل 5 يساوي 40 نقطة في المعدل العام!). التقرير النقدي في BAC LE يتطلب مستوى لغوياً وتحليلياً أرقى من مجرد تلخيص بسيط: دقة التقديم، إعادة صياغة كثيفة ومستقلة، وفقرة نقدية عميقة تعالج المضمون والشكل معاً.',
			svg: svgFrenchWritingBlueprint({
				title: 'Excellence au Compte Rendu Critique (BAC LE — 8 pts)',
				steps: [
					{
						stage: '1. Présentation (Accroche)',
						detail: 'Nature, titre, statut de l’auteur, source, thème exact, visée'
					},
					{
						stage: '2. Résumé analytique',
						detail: 'Condensation structurée au présent (3e pers.), verbes nuancés'
					},
					{
						stage: '3. Critique approfondie',
						detail: 'Fond (portée historique, sources) + Forme (style, objectivité, temps)'
					},
					{
						stage: '4. Nuance & Ouverture',
						detail: 'Limite constructive ou prolongement intellectuel maîtrisé'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الذي يميز الفقرة النقدية الممتازة في بكالوريا اللغات الأجنبية (8 نقاط) عن فقرة عادية؟',
					hintAr: 'تأمل المعايير الأربعة: المضمون، الشكل واللغة، الموقف التلفظي للكاتب، والاقتراح البنّاء.',
					expectedInput: 'تحليل مزدوج للمضمون (وثائقية الحجج وأهمية القضية) والشكل (دقة المعجم، الترابط، درجة الحياد/الالتزام) مع نقد لطيف مبرَّر',
					revealAr: 'في BAC LE يرتقي المترشح إلى مصطلحات دقيقة: la rigueur documentaire, la clarté de la progression chronologique, un lexique précis et soutenu, une objectivité maîtrisée.'
				},
				{
					promptAr: 'بدل تكرار « L’auteur dit que... » أربع مرات في التلخيص، ما البدائل الراقية التي ترفع علامة الأسلوب؟',
					hintAr: 'نوّع بين التسمية وأفعال التقرير الدقيقة حسب حركة الفقرة.',
					expectedInput: 'يستهل بـ évoque / rappelle، ثم démontre / met en exergue / souligne، ويختم بـ met en relief / conclut، مع استخدام التسمية',
					revealAr: 'تنويع أفعال التقرير (retrace, met en lumière, atteste, souligne, nuance, achève son analyse en montrant que) يُظهر تمكّن طالب اللغات الأجنبية.'
				},
				{
					promptAr: 'ما الحجم المثالي لتقرير نقدي رصين في بكالوريا لغات أجنبية؟',
					hintAr: 'أوسع قليلاً وأغنى تحليلاً من الشعب الأخرى دون إطالة مملة.',
					expectedInput: 'حوالي 180 إلى 220 كلمة (نحو ثلث النص الأصلي للتلخيص + فقرة نقدية ثرية من 6 إلى 8 أسطر)',
					revealAr: 'في 180-220 كلمة موزعة على 3 فقرات متناسقة، تبرهن على كفاءة لغوية عالية وتحكم تام في المنهجية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'معيار النجاح في BAC LE (8 نقاط): التقرير النقدي لا يكتفي بسرد الأفكار؛ بل يعكس قدرة المترشح على القراءة التحليلية الرفيعة وإعادة الصياغة بلغة فرنسية متينة (langue soutenue et fluide).',
				'الفقرة 1 — التقديم (4 أسطر): اذكر بدقة صفة الكاتب (l’historien / le chroniqueur)، العنوان، المصدر، التاريخ، نوع النص، المحور الدقيق، والغاية المزدوجة (informer et valoriser / dénoncer / commémorer).',
				'الفقرة 2 — التلخيص التحليلي (10 أسطر): رتّب الأفكار حسب منطق النص باستعمال التسمية والروابط المتقدمة (Tout d’abord, Par la suite, En outre, Enfin) وبأفعال تقرير دقيقة في المضارع وضمير الغائب دون أدنى نسخ حرفي.',
				'الفقرة 3 — التقويم النقدي المعمّق (6 إلى 8 أسطر): (أ) تقييم المضمون (ثراء التوثيق، راهنية الذاكرة، أمانة العرض)؛ (ب) تقييم الشكل (تدرج زمني محكم، توظيف المضارع التاريخي أو التسمية، وضوح وسلاسة الأسلوب)؛ (ج) استدراك نقدي مهذّب ومعلّل (Toutefois / Néanmoins, on peut regretter l’absence de... qui aurait enrichi...).'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Lexique soutenu du CRC (BAC LE — 8 pts)',
				rootLabel: 'Élever le niveau d’expression',
				rootSub: 'Expressions valorisées par les correcteurs LE',
				branches: [
					{
						label: 'Verbes de synthèse',
						rule: 'retrace, met en exergue',
						example: 'démontre, atteste, souligne'
					},
					{
						label: 'Jugement sur le fond',
						rule: 'rigueur documentaire',
						example: 'portée mémorielle indiscutable'
					},
					{
						label: 'Jugement sur la forme',
						rule: 'style limpide et soigné',
						example: 'progression chronologique cohérente'
					},
					{
						label: 'Nuance critique',
						rule: 'Toutefois / Néanmoins',
						example: 'un témoignage direct aurait enrichi...'
					}
				]
			}),
			visualCaptionAr: 'المعجم الأكاديمي الراقي الذي يصنع الفارق في التقرير النقدي بشعبة اللغات الأجنبية.',
			examples: [
				{
					problemAr: 'Transformez cette phrase ordinaire en style soutenu LE : « L’auteur dit que Ben Badis a ouvert des écoles. »',
					solutionAr: '« L’historien met en lumière l’impulsion décisive donnée par Cheikh Ben Badis à travers l’ouverture d’écoles libres. »'
				},
				{
					problemAr: 'Rédigez deux phrases critiques de niveau BAC LE combinant le fond et la forme.',
					solutionAr: '« À mon sens, ce texte se distingue tant par la solidité de ses repères chronologiques que par la sobriété élégante de son style. Néanmoins, l’intégration d’un témoignage d’époque aurait renforcé l’intensité humaine du récit. »'
				},
				{
					problemAr: 'Vérifiez la répartition officielle des 20 points au BAC 3AS Langues Étrangères.',
					solutionAr: '12 points Compréhension de l’écrit (6 pts lecture + 6 pts langue) + 8 points Production écrite = 20 points (Coefficient 5, Durée 03 h 30).'
				}
			],
			watchOutAr: 'في شعبة اللغات الأجنبية، احذر من خطأين: الإيجاز المخلّ في الفقرة النقدية (سطر واحد لا يستحق نقطة التميز!)، أو الانزلاق إلى أخطاء لغوية بسبب جمل طويلة جداً بلا علامات ترقيم؛ فالأناقة تكمن في الجمل المحكمة والواضحة.'
		},
		practice: [
			{
				questionAr: 'Quelle est la répartition officielle des points et la durée de l’épreuve de Français au BAC 3AS Langues Étrangères ?',
				options: [
					'12 points Compréhension (6+6) + 8 points Production écrite, coefficient 5, durée 03 h 30',
					'13 points Compréhension (7+6) + 7 points Production écrite, coefficient 3, durée 02 h 30',
					'14 points Compréhension (7+7) + 6 points Production écrite, coefficient 2, durée 02 h 30',
					'10 points Compréhension + 10 points Production écrite, coefficient 4, durée 02 h 00'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح 100%: 12 + 8 = 20، المعامل 5، المدة ثلاث ساعات ونصف.',
					'خطأ: هذا نظام شعبة آداب وفلسفة (3AS LP).',
					'خطأ: هذا نظام الشعب العلمية وتسيير واقتصاد.',
					'خطأ: نظام غير مطابق لشعبة اللغات الأجنبية.'
				],
				explanationAr: 'في بكالوريا اللغات الأجنبية تحتل الإنتاجية الكتابية 8 نقاط كاملة من 20 بمعامل 5.'
			},
			{
				questionAr: 'Laquelle de ces formulations d’évaluation critique atteint véritablement le niveau attendu en BAC Langues Étrangères ?',
				options: [
					'Ce texte est intéressant et j’aime bien l’histoire.',
					'Ce document séduit par la rigueur de sa chronologie et la clarté de son lexique, même si l’ajout d’une citation d’archive aurait accru sa force évocatrice.',
					'L’auteur a écrit trois paragraphes en français correct.',
					'Je pense que tout est parfait sans rien expliquer.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: عبارة بسيطة ومجملة بلا تعليل.',
					'ممتاز: تجمع بين نقد المضمون (الدقة الزمنية) والشكل (وضوح المعجم) والاستدراك البناء المعلل.',
					'خطأ: مجرد ملاحظة سطحية.',
					'خطأ: غياب التعليل النقدي.'
				],
				explanationAr: 'الفقرة النقدية في LE تحلّل المضمون والشكل وتختم باستدراك فكري بناء.'
			},
			{
				questionAr: 'Quel verbe de rapport remplace avantageusement le verbe répétitif « dit » pour montrer que l’auteur insiste sur une idée majeure ?',
				options: ['bavarde', 'efface', 'met en exergue / souligne', 'oublie'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: لفظ غير لائق بالأسلوب الأكاديمي.',
					'خطأ: عكس المعنى المطلوب.',
					'صحيح: « met en exergue » و « souligne » و « met en lumière » تبرز أهمية الفكرة بأسلوب راقٍ.',
					'خطأ: عكس المعنى.'
				],
				explanationAr: 'تنويع أفعال التقرير يبرهن على ثراء الرصيد المعجمي لطالب اللغات الأجنبية.'
			},
			{
				questionAr: 'Lors de la rédaction du résumé dans le CRC, comment condenser sans recopier une phrase longue du texte ?',
				options: [
					'En recopiant la moitié des mots tels quels',
					'En supprimant l’idée principale',
					'En changeant le sens historique des faits',
					'En recourant à la nominalisation et à des synonymes précis à la 3e personne'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: النسخ الجزئي يخفض علامة إعادة الصياغة.',
					'خطأ: يجب الحفاظ على كل فكرة رئيسية.',
					'خطأ: الأمانة العلمية شرط أساسي في التقرير.',
					'أحسنت: التسمية والمرادفات الدقيقة هي سر التلخيص الأكاديمي المحترف.'
				],
				explanationAr: 'تسمح التسمية والبدائل المعجمية بضغط المعنى بأمانة دون نسخ حرفي.'
			},
			{
				questionAr: 'Quelle longueur cible est la plus équilibrée pour un compte rendu critique soigné en BAC Langues Étrangères ?',
				options: ['Environ 180 à 220 mots bien structurés en 3 paragraphes', '30 mots en deux lignes', '800 mots sur quatre pages', 'Une liste à puces sans phrases'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: هذا الحجم يتيح عرضاً وافياً وتقييماً نقدياً ناضجاً مع ضبط الجودة اللغوية.',
					'خطأ: قصير جداً ولا يفي بمتطلبات 8 نقاط.',
					'خطأ: طويل أكثر من النص الأصلي نفسه.',
					'خطأ: التقرير يُكتب في فقرات مترابطة لا رؤوس أقلام.'
				],
				explanationAr: 'التوازن بين الإيجاز في التلخيص والعمق في النقد يتحقق غالباً بين 180 و220 كلمة.'
			}
		]
	}
];
