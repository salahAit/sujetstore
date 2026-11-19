import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWordFormation,
	svgFrenchWritingBlueprint
} from '../../svg-french';

export const LESSONS_2AS_SCI_T1: FrenchInteractiveLessonData[] = [
	// [1] Les procédés explicatifs et la démarche scientifique
	{
		id: 'fre_lesson_2as_sci_t1_procedes_explicatifs',
		slug: 'fre-2as-sci-t1-procedes-explicatifs',
		grade: '2as_se',
		yearSubjectId: 675,
		trimesterId: 't1',
		sequenceId: 'proj1',
		sequenceTitleAr: 'المشروع 1: الخطاب العلمي الموضوعي والبرهنة العلمية',
		order: 1,
		titleAr: 'الأساليب التفسيرية والمنهج العلمي التجريبي (Les procédés explicatifs et la démarche scientifique)',
		objectives: [
			'التعرف على الأساليب التفسيرية الأساسية في النص العلمي (التعريف، إعادة الصياغة، التمثيل، التعداد، الوظيفة، التسمية)',
			'تحديد المراحل الأربع للمنهج العلمي التجريبي (الملاحظة، الفرضية، التجربة، القانون العلمي)',
			'استثمار هذه الأساليب لفهم النصوص العلمية حول البصريات والرياضيات والطاقة الشمسية'
		],
		keywordsAr: [
			'Procédés explicatifs',
			'Définition',
			'Reformulation',
			'Illustration',
			'Démarche scientifique',
			'Observation',
			'Expérimentation'
		],
		discover: {
			scenarioAr:
				'في القرن الحادي عشر، أسّس العالم المسلم ابن الهيثم (Ibn Al-Haytham) علم البصريات الحديث عبر منهج صارم: لاحظ دخول الضوء عبر ثقب صغير إلى غرفة مظلمة (observation)، ثم افترض أن الضوء ينتقل في خطوط مستقيمة (hypothèse)، وأجرى تجارب متكررة بالعدسات والمرايا (expérimentation) ليثبت في النهاية قانون الانعكاس (loi). ولتوضيح ذلك في نص علمي، نستخدم أساليب تفسيرية دقيقة مثل التعريف وإعادة الصياغة.',
			svg: svgFrenchWritingBlueprint({
				title: 'Les 4 étapes de la démarche scientifique',
				steps: [
					{ stage: 'Observation', detail: 'Constater un phénomène naturel ou physique précis', color: '#1d4ed8' },
					{ stage: 'Hypothèse', detail: 'Formuler une explication provisoire à vérifier', color: '#047857' },
					{ stage: 'Expérimentation', detail: 'Tester l’hypothèse par des mesures répétées', color: '#b45309' },
					{ stage: 'Loi scientifique', detail: 'Énoncer une règle générale et vérifiée', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'في الجملة: « L’optique est la branche de la physique qui étudie la lumière », ما الأسلوب التفسيري المستعمل؟',
					hintAr: 'لاحظ استعمال فعل الكينونة (est) لتحديد معنى مصطلح علمي.',
					expectedInput: 'التعريف (La définition)',
					revealAr:
						'الأسلوب هو التعريف (la définition)؛ إذ يوضح معنى المصطلح العلمي (l’optique) بواسطة الفعل (est) أو (désigne / consiste à).'
				},
				{
					promptAr: 'ماذا تفيد عبارة « c’est-à-dire » في قولنا: « La lumière se propage de façon rectiligne, c’est-à-dire en ligne droite »؟',
					hintAr: 'الكاتب يعيد شرح الكلمة الصعبة بعبارة أبسط للقارئ.',
					expectedInput: 'إعادة الصياغة (La reformulation)',
					revealAr:
						'تفيد إعادة الصياغة (la reformulation) لتبسيط مصطلح علمي (rectiligne) بعبارة أوضح (en ligne droite)، ومن مؤشراتها أيضا: autrement dit, en d’autres termes.'
				},
				{
					promptAr: 'ما المرحلة التي تلي صياغة الفرضية في المنهج التجريبي الذي اعتمده ابن الهيثم؟',
					hintAr: 'كيف يتأكد العالم من صحة فرضيته؟',
					expectedInput: 'التجربة (L’expérimentation)',
					revealAr:
						'تأتي التجربة (l’expérimentation) مباشرة بعد الفرضية للتحقق منها عمليا قبل استخلاص القانون العلمي (la loi).'
				}
			]
		},
		summary: {
			rulesAr: [
				'التعريف (La définition): يحدد مفهوم المصطلح بأفعال مثل: est, désigne, signifie, représente.',
				'التسمية (La dénomination): يعطي الاسم العلمي للظاهرة بعبارات مثل: s’appelle, est nommé(e), est appelé(e).',
				'إعادة الصياغة (La reformulation): تبسّط الفكرة بعبارات مثل: c’est-à-dire, autrement dit, en d’autres termes.',
				'التمثيل (L’illustration / L’exemple): يقرّب الفكرة بأمثلة واقعية عبر: par exemple, tel(le) que, comme, notamment.',
				'الوظيفة (La fonction) والتعداد (L’énumération): تبيّن الوظيفة دور الشيء (sert à, permet de)، ويسرد التعداد العناصر المتتابعة (d’abord, ensuite, enfin / deux points + virgules).',
				'تتدرّج البرهنة التجريبية في أربع مراحل ثابتة: الملاحظة (observation) -> الفرضية (hypothèse) -> التجربة (expérimentation) -> القانون أو النتيجة (loi / conclusion).'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Les principaux procédés explicatifs',
				rootLabel: 'Expliquer un fait scientifique',
				rootSub: 'Rendre le savoir clair et vérifiable',
				branches: [
					{ label: 'Définition', rule: 'est / désigne', example: 'L’algèbre est...' },
					{ label: 'Reformulation', rule: 'c’est-à-dire', example: 'autrement dit...' },
					{ label: 'Illustration', rule: 'par exemple', example: 'tels que le soleil' },
					{ label: 'Fonction', rule: 'sert à / permet', example: 'sert à capter' }
				]
			}),
			visualCaptionAr: 'خريطة الأساليب التفسيرية الأكثر توظيفا في نصوص البكالوريا والثانية ثانوي',
			examples: [
				{
					problemAr: 'Identifiez le procédé explicatif : « Le panneau photovoltaïque sert à transformer le rayonnement solaire en électricité. »',
					solutionAr: 'La fonction (الوظيفة)، بدليل العبارة (sert à transformer).'
				},
				{
					problemAr: 'Identifiez le procédé explicatif : « Les énergies renouvelables, telles que le solaire et l’éolien, réduisent la pollution. »',
					solutionAr: 'L’illustration / L’exemple (التمثيل)، بدليل الأداة (telles que).'
				},
				{
					problemAr: 'Classez ces étapes dans l’ordre scientifique : expérience / loi / observation / hypothèse.',
					solutionAr: '1. Observation  2. Hypothèse  3. Expérience  4. Loi.'
				}
			],
			watchOutAr:
				'لا تخلط بين التعريف (La définition) والتسمية (La dénomination): في التعريف نبدأ بالمصطلح ثم نشرحه (La photosynthèse est le processus...)، أما في التسمية فنشرح الظاهرة أولا ثم نسمّيها (Ce phénomène s’appelle la photosynthèse).'
		},
		practice: [
			{
				questionAr: 'Quel procédé explicatif est employé dans : « L’algorithme, autrement dit une suite finie d’opérations logiques, doit son nom à Al-Khwarizmi » ?',
				options: ['La reformulation', 'La fonction', 'L’énumération', 'La dénomination'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! عبارة « autrement dit » من أشهر مؤشرات إعادة الصياغة.',
					'الوظيفة تُعبّر عن الدور باستعمال sert à أو permet de.',
					'التعداد يسرد عدة عناصر متتالية.',
					'التسمية تستعمل s’appelle أو est nommé.'
				],
				explanationAr: 'العبارة « autrement dit » تعيد شرح مصطلح (algorithme) بصياغة مبسّطة، فهي reformulation.'
			},
			{
				questionAr: 'Dans la phrase « Ce phénomène optique s’appelle la réfraction », quel est le procédé explicatif ?',
				options: ['La comparaison', 'La dénomination', 'L’illustration', 'L’analyse'],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا توجد هنا أداة مقارنة مثل comme أو plus que.',
					'إجابة صحيحة! الفعل « s’appelle » يدل على التسمية (la dénomination).',
					'لا يوجد مثال مسبوق بـ par exemple أو tel que.',
					'التحليل يفصّل المكونات، وهنا نسمي الظاهرة فقط.'
				],
				explanationAr: 'استعمال الفعل (s’appelle) يقدّم الاسم العلمي للظاهرة، وهو أسلوب التسمية (la dénomination).'
			},
			{
				questionAr: 'Quel est l’ordre logique exact de la démarche scientifique expérimentale ?',
				options: [
					'Hypothèse - Loi - Observation - Expérience',
					'Observation - Expérience - Loi - Hypothèse',
					'Observation - Hypothèse - Expérimentation - Loi',
					'Loi - Observation - Hypothèse - Expérimentation'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'الملاحظة تسبق الفرضية دائما، والقانون يأتي في النهاية.',
					'الفرضية تُصاغ قبل التجربة لتوجيهها.',
					'ممتاز! الملاحظة ثم الفرضية ثم التجربة فأخيرا استخلاص القانون العلمي.',
					'القانون هو النتيجة النهائية لا نقطة البداية.'
				],
				explanationAr: 'يبدأ المنهج العلمي بالملاحظة، فصياغة فرضية، فالتجريب للتحقق منها، ثم إقرار القانون.'
			},
			{
				questionAr: 'Repérez la phrase qui contient un procédé de fonction :',
				options: [
					'Le silicium est un élément chimique abondant.',
					'La membrane permet de filtrer les sels contenus dans l’eau de mer.',
					'L’Algérie dispose de trois atouts : le soleil, l’espace et les ingénieurs.',
					'La chambre noire, c’est-à-dire un boîtier étanche à la lumière, fut utilisée par Ibn Al-Haytham.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه الجملة تمثل تعريفا (est un élément...).',
					'صحيح! عبارة « permet de filtrer » تبيّن وظيفة الغشاء.',
					'هذه الجملة تمثل تعدادا (énumération).',
					'هذه الجملة تمثل إعادة صياغة (c’est-à-dire).'
				],
				explanationAr: 'الوظيفة (la fonction) تبيّن دور الأداة أو العضو باستعمال: permet de / sert à / a pour rôle de.'
			},
			{
				questionAr: 'Quelle est la visée communicative principale d’un texte démonstratif scientifique ?',
				options: [
					'Informer, expliquer et démontrer un phénomène de manière objective',
					'Raconter un souvenir personnel émouvant',
					'Imposer une opinion personnelle sans preuve',
					'Faire rire le lecteur par une satire'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة دقيقة! النص العلمي البرهاني يهدف إلى الإعلام والشرح والبرهنة بموضوعية.',
					'سرد الذكريات يخص النص السردي الذاتي لا العلمي.',
					'البرهنة العلمية تعتمد على الأدلة والتجربة لا الرأي الشخصي المجرد.',
					'الهزل والسخرية يتنافيان مع طابع الخطاب العلمي.'
				],
				explanationAr: 'الغاية التواصلية للنص العلمي هي الإعلام والشرح والبرهنة الموضوعية على ظاهرة أو قانون.'
			}
		]
	},

	// [2] L'objectivité dans le discours scientifique
	{
		id: 'fre_lesson_2as_sci_t1_objectivite_scientifique',
		slug: 'fre-2as-sci-t1-objectivite-scientifique',
		grade: '2as_se',
		yearSubjectId: 675,
		trimesterId: 't1',
		sequenceId: 'proj1',
		sequenceTitleAr: 'المشروع 1: الخطاب العلمي الموضوعي والبرهنة العلمية',
		order: 2,
		titleAr: 'الموضوعية في الخطاب العلمي (Tournures impersonnelles, voix passive et effacement du « je »)',
		objectives: [
			'تحديد مؤشرات الحياد والموضوعية في النص العلمي (غياب ضمير المتكلم، الصيغ غير الشخصية، المبني للمجهول)',
			'التحويل السليم من المبني للمعلوم إلى المبني للمجهول مع مراعاة زمن الفعل وتوافق اسم المفعول',
			'توظيف الحاضر الدال على الحقيقة العامة (le présent de vérité générale) في الشرح العلمي'
		],
		keywordsAr: [
			'Objectivité',
			'Tournure impersonnelle',
			'Voix passive',
			'Effacement de l’énonciateur',
			'Présent de vérité générale',
			'Pronom on'
		],
		discover: {
			scenarioAr:
				'قارن بين جملتين تصفان تجربة الطاقة الشمسية: الجملة (أ): « Je pense que je peux capter les rayons solaires ». الجملة (ب): « Les rayons solaires sont captés par des cellules photovoltaïques ; il est établi que cette énergie réduit les émissions de carbone ». أي الجملتين تنتمي إلى الخطاب العلمي الموضوعي ولماذا؟',
			svg: svgFrenchGrammarMap({
				title: 'Les marques de l’objectivité scientifique',
				rootLabel: 'Effacement du « je »',
				rootSub: 'L’auteur reste neutre face aux faits',
				branches: [
					{ label: 'Voix passive', rule: 'être + participe passé', example: 'L’eau est filtrée.' },
					{ label: 'Impersonnel', rule: 'il + verbe (3e sg.)', example: 'Il existe un lien.' },
					{ label: 'Pronom « on »', rule: 'valeur générale', example: 'On observe que...' },
					{ label: 'Présent général', rule: 'fait toujours vrai', example: 'L’eau bout à 100 C.' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الذي اختفى في الجملة العلمية (ب) مقارنة بالجملة (أ)؟',
					hintAr: 'انظر إلى الضمائر الدالة على المتكلم (je) وأفعال الرأي الشخصي (je pense).',
					expectedInput: 'اختفاء ضمير المتكلم je وغياب الرأي الشخصي',
					revealAr:
						'اختفى ضمير المتكلم (je) وفعل الرأي الذاتي (je pense)، وهذا يُسمّى محو الذاتية (l’effacement de l’énonciateur).'
				},
				{
					promptAr: 'في عبارة « Les rayons solaires sont captés par des cellules »، ما الصيغة النحوية المستعملة؟',
					hintAr: 'لاحظ الفعل المساعد (sont) متبوعا باسم المفعول (captés) وحرف الجر (par).',
					expectedInput: 'المبني للمجهول (La voix passive)',
					revealAr:
						'إنها صيغة المبني للمجهول (la voix passive)، وتُستعمل للتركيز على الظاهرة العلمية (les rayons solaires) بدل الشخص القائم بالفعل.'
				},
				{
					promptAr: 'هل الضمير (il) في « Il est établi que... » يعود على شخص معيّن؟',
					hintAr: 'حاول استبدال (il) باسم شخص؛ هل يصح المعنى؟',
					expectedInput: 'لا، إنه ضمير غير شخصي (tournure impersonnelle)',
					revealAr:
						'لا يعود على أي شخص؛ إنه تركيب غير شخصي (tournure impersonnelle) يعزز الحياد العلمي مثل: il faut, il existe, il convient de.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الموضوعية (L’objectivité) تعني غياب علامات المتكلم (je, moi, mon) والأحكام الانفعالية، والتركيز على الحقائق والتجارب القابلة للتحقق.',
				'المبني للمجهول (La voix passive): يُصاغ بوضع المفعول به المباشر فاعلا + تصريف المساعد (être) في نفس زمن الجملة الأصلية + اسم المفعول (participe passé) مطابقا للفاعل في الجنس والعدد + par + الفاعل الأصلي.',
				'التراكيب غير الشخصية (Les tournures impersonnelles): تبدأ بالضمير المحايد (il) مثل: il est prouvé que, il existe, il faut, il s’agit de, il convient de.',
				'الضمير المحايد (on) والتركيب الضميري ذو المعنى المجهول: مثل (On constate que... / La lumière se réfléchit sur le miroir).',
				'الحاضر العلمي (Le présent de vérité générale): يُستخدم لصياغة القوانين العلمية الثابتة التي تبقى صحيحة في كل زمان ومكان.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Transformation : Voix active -> Voix passive',
				subtitle: 'Conserver toujours le même temps pour l’auxiliaire « être »',
				columns: [
					{ header: 'Présent', rule: 'est / sont + P.P.', examples: 'La plante absorbe -> est absorbée' },
					{ header: 'Passé composé', rule: 'a été / ont été + P.P.', examples: 'Il a prouvé -> a été prouvée' },
					{ header: 'Futur simple', rule: 'sera / seront + P.P.', examples: 'On mesurera -> sera mesurée' }
				]
			}),
			visualCaptionAr: 'قاعدة الحفاظ على زمن الفعل عند التحويل إلى المبني للمجهول في النص العلمي',
			examples: [
				{
					problemAr: 'Mettez à la voix passive : « Ibn Al-Haytham a démontré la propagation rectiligne de la lumière. »',
					solutionAr: 'La propagation rectiligne de la lumière a été démontrée par Ibn Al-Haytham. (توافق démontrée مع الفاعل المؤنث).'
				},
				{
					problemAr: 'Transformez en tournure impersonnelle objective : « Je constate que le désert reçoit un fort ensoleillement. »',
					solutionAr: 'Il est constaté que le désert reçoit un fort ensoleillement. (أو: On constate que...).'
				}
			],
			watchOutAr:
				'أكثر خطأ يتكرر في الامتحان عند التحويل للمبني للمجهول هو نسيان مطابقة اسم المفعول (participe passé) مع الفاعل الجديد المؤنث أو الجمع، أو تغيير زمن الفعل المساعد (être)!'
		},
		practice: [
			{
				questionAr: 'Quelle phrase illustre le mieux l’objectivité dans un discours scientifique ?',
				options: [
					'À mon avis, cette magnifique expérience me paraît incroyable.',
					'Il est établi que les cellules photovoltaïques convertissent la lumière en courant électrique.',
					'Je crois sincèrement que le soleil est notre meilleur ami.',
					'Nous adorons étudier les rayons lumineux en classe.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'تحتوي على علامات ذاتية (À mon avis, magnifique, me).',
					'إجابة صحيحة! تعتمد تركيبا غير شخصي (Il est établi que) وحاضر الحقيقة العامة دون أي ذاتية.',
					'تحتوي على ضمير المتكلم (Je crois) وعبارة انفعالية.',
					'تحتوي على ضمير (Nous) وفعل شعوري (adorons).'
				],
				explanationAr: 'الموضوعية تقوم على التراكيب غير الشخصية وغياب الضمائر الشخصية والألفاظ العاطفية.'
			},
			{
				questionAr: 'Choisissez la transformation passive correcte de : « Les ingénieurs installent des capteurs solaires. »',
				options: [
					'Des capteurs solaires ont été installés par les ingénieurs.',
					'Des capteurs solaires sont installés par les ingénieurs.',
					'Des capteurs solaires sont installé par les ingénieurs.',
					'Des capteurs solaires étaient installés par les ingénieurs.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'تغيّر الزمن إلى الماضي المركب بينما الجملة الأصلية في الحاضر (installent).',
					'ممتاز! الحاضر (sont) + مطابقة اسم المفعول للجمع المذكر (installés).',
					'ينقصها حرف الجمع (s) في اسم المفعول (installés).',
					'تغيّر الزمن إلى الماضي الناقص (imparfait).'
				],
				explanationAr: 'الفعل الأصلي (installent) في الحاضر، فيُصرّف (être) في الحاضر (sont) ويُطابق (installés) الجمع المذكر.'
			},
			{
				questionAr: 'Dans « L’eau pure gèle à zéro degré Celsius », quelle est la valeur du présent ?',
				options: [
					'Présent de narration',
					'Présent d’habitude personnelle',
					'Présent de vérité générale',
					'Présent de futur proche'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'حاضر السرد يُستعمل داخل قصة ماضية لتقريب الحدث.',
					'ليست عادة فردية بل قانون فيزيائي ثابت.',
					'صحيح! هذه حقيقة علمية ثابتة في كل زمان ومكان.',
					'لا تدل الجملة على حدث وشيك الوقوع.'
				],
				explanationAr: 'القوانين الفيزيائية والطبية الثابتة تُصاغ بحاضر الحقيقة العامة (présent de vérité générale).'
			},
			{
				questionAr: 'Laquelle de ces phrases contient une tournure impersonnelle ?',
				options: [
					'Il analyse les résultats dans son laboratoire.',
					'Il convient de vérifier chaque mesure avant de conclure.',
					'Il a rédigé un traité sur l’algèbre.',
					'Il observe les étoiles grâce à un instrument précis.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الضمير Il هنا شخصي يعود على باحث.',
					'أحسنت! « Il convient de » تركيب غير شخصي لا يعود فيه الضمير Il على أي إنسان.',
					'الضمير Il يعود على عالم محدد.',
					'الضمير Il يعود على راصد محدد.'
				],
				explanationAr: 'في التركيب غير الشخصي (il convient de / il faut / il existe)، الضمير (il) شكلي لا يمثل فاعلا حقيقيا.'
			},
			{
				questionAr: 'Transformez au passif : « La station a purifié l’eau saumâtre. »',
				options: [
					'L’eau saumâtre est purifiée par la station.',
					'L’eau saumâtre a été purifié par la station.',
					'L’eau saumâtre a été purifiée par la station.',
					'L’eau saumâtre sera purifiée par la station.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'الجملة الأصلية في الماضي المركب (a purifié) وليس الحاضر.',
					'كلمة (eau) مؤنثة، لذا يجب إضافة (e) التأنيث: purifiée.',
					'صحيح تماما! الزمن (a été) محفوظ واسم المفعول (purifiée) مطابق للمؤنث المفرد.',
					'غيّرت الزمن إلى المستقبل البسيط.'
				],
				explanationAr: 'الماضي المركب في المبني للمجهول = a/ont été + participe passé مع المطابقة (l’eau -> purifiée).'
			}
		]
	},

	// [3] L'expression de l'hypothèse et de la condition
	{
		id: 'fre_lesson_2as_sci_t1_hypothese_condition',
		slug: 'fre-2as-sci-t1-hypothese-condition',
		grade: '2as_se',
		yearSubjectId: 675,
		trimesterId: 't1',
		sequenceId: 'proj1',
		sequenceTitleAr: 'المشروع 1: الخطاب العلمي الموضوعي والبرهنة العلمية',
		order: 3,
		titleAr: 'التعبير عن الفرضية والشرط (L’expression de l’hypothèse et de la condition)',
		objectives: [
			'إتقان قواعد توافق الأزمنة مع أداة الشرط (si) في الحالات الثلاث (الحاضر، الماضي الناقص، الماضي التام)',
			'توظيف الأدوات البديلة للتعبير عن الفرضية والشرط (au cas où + conditionnel، à condition que + subjonctif، en cas de + nom)',
			'صياغة فرضيات علمية دقيقة ضمن خطوات البرهنة والتجربة'
		],
		keywordsAr: [
			'Hypothèse',
			'Condition',
			'Si + présent',
			'Si + imparfait',
			'Au cas où',
			'À condition que',
			'Conditionnel'
		],
		discover: {
			scenarioAr:
				'في مخبر الفيزياء، صاغ التلاميذ ثلاث فرضيات حول الطاقة الشمسية: (1) « Si l’angle du panneau est optimal, le rendement augmentera ». (2) « Si nous installions des panneaux sur tous les lycées, la facture énergétique diminuerait ». (3) « Au cas où le ciel serait couvert, des accumulateurs prendraient le relais ». لاحظ كيف يفرض كل رابط زمنا دقيقا للفعل.',
			svg: svgFrenchGrammarMap({
				title: 'Le système hypothétique avec « si » et ses équivalents',
				rootLabel: 'Hypothèse et Condition',
				rootSub: 'Respecter la concordance des temps et des modes',
				branches: [
					{ label: 'Si + Présent', rule: '-> Futur / Présent', example: 'Si on chauffe, il fond.' },
					{ label: 'Si + Imparfait', rule: '-> Conditionnel prés.', example: 'Si on triait, on gagnerait.' },
					{ label: 'Au cas où', rule: '+ Conditionnel', example: 'Au cas où il pleuvrait' },
					{ label: 'À condition que', rule: '+ Subjonctif', example: 'à condition qu’il soit pur' }
				]
			}),
			steps: [
				{
					promptAr: 'في الجملة الأولى « Si l’angle est optimal, le rendement augmentera », ما زمن فعل الشرط وزمن جواب الشرط؟',
					hintAr: 'لاحظ (est) ثم (augmentera).',
					expectedInput: 'si + présent ثم futur simple',
					revealAr:
						'فعل الشرط في الحاضر (est) وجواب الشرط في المستقبل البسيط (augmentera)، وتعبر هذه الصيغة عن شرط قابل للتحقق أو نتيجة علمية مؤكدة.'
				},
				{
					promptAr: 'ما الذي تغيّر في الجملة الثانية عندما صرّفنا الفعل بعد (si) في الـ imparfait (installions)؟',
					hintAr: 'انظر إلى نهاية الفعل (diminuerait) في الجزء الثاني.',
					expectedInput: 'جواب الشرط يُصرف في الـ conditionnel présent (diminuerait)',
					revealAr:
						'مع (si + imparfait) يأتي جواب الشرط في الشرطي الحاضر (conditionnel présent: diminuerait) للتعبير عن فرضية محتملة أو متخيّلة.'
				},
				{
					promptAr: 'هل يجوز أن نكتب « Si l’angle augmentera » في اللغة الفرنسية؟',
					hintAr: 'تذكر القاعدة الذهبية: أداة الشرط (si) لا يتبعها المستقبل ولا الشرطي أبدا.',
					expectedInput: 'لا، يُمنع استعمال المستقبل أو الشرطي مباشرة بعد si',
					revealAr:
						'أبدا! القاعدة الذهبية: لا يُستعمل (futur) ولا (conditionnel) مباشرة بعد أداة الشرط (si)؛ فنقول: Si l’angle augmente (وليس augmentera).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الحالة 1 (شرط محقق / قانون علمي): Si + présent -> présent أو futur simple أو impératif. مثال: Si la température atteint 100 °C, l’eau bout.',
				'الحالة 2 (فرضية محتملة / غير محققة في الحاضر): Si + imparfait -> conditionnel présent. مثال: Si les villes recyclaient mieux, la pollution reculerait.',
				'الحالة 3 (فرضية لم تتحقق في الماضي): Si + plus-que-parfait -> conditionnel passé. مثال: Si l’expérience avait réussi, le chercheur aurait publié la loi.',
				'الروابط البديلة: « au cas où / dans l’hypothèse où » يتبعهما toujours الشرطي (conditionnel)؛ و« à condition que / pourvu que / à moins que » يتبعها المنصوب (subjonctif).',
				'في الجملة البسيطة (المصدر أو الاسم): « en cas de + nom » و« à condition de + infinitif ».'
			],
			visualSvg: svgFrenchTenseTimeline({
				title: 'Concordance dans la phrase hypothétique',
				tenseName: 'Si + Imparfait -> Conditionnel présent',
				formula: 'Si + radical imparfait (-ais, -ait) -> radical futur + (-ais, -ait)',
				activeZone: 'future',
				example: 'Si l’eau manquait, les cultures souffriraient rapidement.',
				markers: 'si + imparfait | au cas où + conditionnel | à condition que + subjonctif'
			}),
			visualCaptionAr: 'التوافق الزمني بين جملة الشرط وجواب الشرط في البرهنة العلمية',
			examples: [
				{
					problemAr: 'Mettez les verbes aux temps qui conviennent : « Si les chercheurs (trouver) un meilleur filtre, le dessalement (coûter) moins cher. » (hypothèse éventuelle)',
					solutionAr: 'Si les chercheurs trouvaient (imparfait) un meilleur filtre, le dessalement coûterait (conditionnel présent) moins cher.'
				},
				{
					problemAr: 'Remplacez « si » par « à condition que » : « Le vaccin est efficace s’il est conservé au frais. »',
					solutionAr: 'Le vaccin est efficace à condition qu’il soit conservé au frais. (subjonctif présent : soit).'
				}
			],
			watchOutAr:
				'انتبه للفخ الأشهر في الفروض والاختبارات: « Les si n’aiment pas les -rai(s) »! لا تضع أبدا (futur) ولا (conditionnel) بعد أداة الشرط (si)، بل ضعهما بعد (au cas où) أو في جواب الشرط فقط.'
		},
		practice: [
			{
				questionAr: 'Complétez correctement : « Si l’on augmente la pression, le volume du gaz ........ . »',
				options: ['diminuerait', 'diminuait', 'diminue', 'aurait diminué'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الشرطي الحاضر يتطلب imparfait بعد si.',
					'الماضي الناقص لا يوافق الحاضر العلمي هنا.',
					'صحيح! Si + présent -> présent للتعبير عن قانون فيزيائي ثابت.',
					'الشرطي الماضي يتطلب plus-que-parfait بعد si.'
				],
				explanationAr: 'للتعبير عن قانون علمي ثابت نستعمل: Si + présent -> présent (أو futur simple).'
			},
			{
				questionAr: 'Choisissez la bonne conjugaison : « Si chaque foyer utilisait un chauffe-eau solaire, la consommation de gaz ........ nettement. »',
				options: ['baisse', 'baissera', 'baisserait', 'baissait'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الحاضر لا يتوافق مع (si + imparfait).',
					'المستقبل يتوافق مع (si + présent) وليس (imparfait).',
					'ممتاز! القاعدة هي: Si + imparfait (utilisait) -> conditionnel présent (baisserait).',
					'لا نكرر الـ imparfait في جواب الشرط.'
				],
				explanationAr: 'بما أن فعل الشرط (utilisait) في الـ imparfait، يكون جواب الشرط في الـ conditionnel présent (baisserait).'
			},
			{
				questionAr: 'Quel mode utilise-t-on après la locution « au cas où » ?',
				options: ['L’indicatif présent', 'Le conditionnel', 'L’impératif', 'L’infinitif'],
				correctIndex: 1,
				diagnosticFeedback: [
					'au cas où لا يتبعها الحاضر الإخباري.',
					'إجابة دقيقة! « au cas où » يتبعها دائما الشرطي (conditionnel).',
					'لا يُستعمل الأمر في الجملة الموصولة بـ au cas où.',
					'المصدر يأتي بعد (à condition de) لا (au cas où).'
				],
				explanationAr: 'الرابط « au cas où » يُتبع دائما بصيغة الشرطي: Au cas où la panne surviendrait...'
			},
			{
				questionAr: 'Complétez : « Cette expérience réussira à condition que la mesure ........ précise. »',
				options: ['est', 'sera', 'soit', 'serait'],
				correctIndex: 2,
				diagnosticFeedback: [
					'« à condition que » تفرض صيغة المنصوب (subjonctif) لا الإخباري.',
					'المستقبل غير صحيح بعد « à condition que ».',
					'أحسنت! (soit) هو الحاضر المنصوب (subjonctif présent) للفعل être.',
					'الشرطي يأتي بعد (au cas où) لا بعد (à condition que).'
				],
				explanationAr: 'العبارة « à condition que » تتطلب دائما subjonctif (être -> qu’elle soit).'
			},
			{
				questionAr: 'Quelle phrase est grammaticalement CORRECTE ?',
				options: [
					'Si le moteur surchaufferait, le système s’arrêterait.',
					'Si le moteur surchauffera, le système s’arrête.',
					'En cas de surchauffe, le système s’arrête automatiquement.',
					'Au cas où le moteur surchauffe, le système s’arrêterait.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ! يمنع استعمال conditionnel بعد أداة الشرط si.',
					'خطأ! يمنع استعمال futur بعد أداة الشرط si.',
					'صحيح 100%! « En cas de + nom » تعبير سليم ودقيق عن الشرط في جملة بسيطة.',
					'بعد « au cas où » يجب استعمال conditionnel (surchaufferait) لا présent.'
				],
				explanationAr: 'الجملة الثالثة صحيحة تماما لأن « en cas de » يُتبع باسم (surchauffe) مع حاضر علمي.'
			}
		]
	},

	// [4] Les rapports logiques de cause et de conséquence dans la démonstration
	{
		id: 'fre_lesson_2as_sci_t1_cause_consequence',
		slug: 'fre-2as-sci-t1-cause-consequence',
		grade: '2as_se',
		yearSubjectId: 675,
		trimesterId: 't1',
		sequenceId: 'proj1',
		sequenceTitleAr: 'المشروع 1: الخطاب العلمي الموضوعي والبرهنة العلمية',
		order: 4,
		titleAr: 'العلاقات المنطقية: السبب والنتيجة في البرهنة العلمية (La cause et la conséquence)',
		objectives: [
			'التمييز الدقيق بين علاقة السبب (la cause) وعلاقة النتيجة (la conséquence) داخل البرهنة العلمية',
			'اختيار الرابط المنطقي المناسب حسب التركيب النحوي (جملة مركبة أو جملة بسيطة + اسم) ودلالة السبب الإيجابية أو السلبية',
			'التحويل السليم من التعبير عن السبب إلى التعبير عن النتيجة (والعكس) دون الإخلال بالمعنى العلمي'
		],
		keywordsAr: [
			'Rapport logique',
			'Cause',
			'Conséquence',
			'Parce que',
			'Grâce à',
			'À cause de',
			'Par conséquent',
			'Si bien que'
		],
		discover: {
			scenarioAr:
				'تأمل هاتين الجملتين العلميتين: (1) « La température globale augmente parce que les gaz à effet de serre s’accumulent ». (2) « Les gaz à effet de serre s’accumulent ; par conséquent, la température globale augmente ». لاحظ أنهما تحملان الحقيقة العلمية نفسها لكن بزاوية ربط معكوسة.',
			svg: svgFrenchGrammarMap({
				title: 'Cause et Conséquence dans la démonstration',
				rootLabel: 'Lien logique scientifique',
				rootSub: 'Cause (Pourquoi ?) <-> Conséquence (Résultat ?)',
				branches: [
					{ label: 'Cause + Verbe', rule: 'parce que / car / comme', example: 'Comme il fait chaud...' },
					{ label: 'Cause + Nom', rule: 'grâce à (+) / à cause de (-)', example: 'grâce au soleil' },
					{ label: 'Conséq. Coord.', rule: 'donc / par conséquent', example: 'donc l’eau s’évapore' },
					{ label: 'Conséq. Sub.', rule: 'si bien que / tel... que', example: 'si bien qu’il gèle' }
				]
			}),
			steps: [
				{
					promptAr: 'في الجملة الأولى، ما هو السبب (la cause) وما هي النتيجة (la conséquence)؟',
					hintAr: 'السبب يقع أولا في الزمن ويجيب عن السؤال: لماذا؟',
					expectedInput: 'السبب تراكم الغازات، والنتيجة ارتفاع الحرارة',
					revealAr:
						'تراكم الغازات الدفيئة هو السبب (يأتي مباشرة بعد parce que)، وارتفاع الحرارة العالمية هو النتيجة.'
				},
				{
					promptAr: 'لماذا استعملنا « grâce à » مع إنجاز إيجابي و« à cause de » مع ضرر سلبي؟',
					hintAr: 'قارن بين: grâce à la vaccination و à cause de la pollution.',
					expectedInput: 'grâce à للسبب الإيجابي، و à cause de للسبب السلبي',
					revealAr:
						'تُستعمل « grâce à + nom » للسبب الإيجابي النافع، و« à cause de + nom » للسبب السلبي الضار، أما « en raison de + nom » فمحايدة.'
				},
				{
					promptAr: 'عندما نحول الجملة من السبب إلى النتيجة، ماذا يحدث لترتيب القضيتين؟',
					hintAr: 'انظر كيف انتقل (تراكم الغازات) إلى بداية الجملة الثانية قبل (par conséquent).',
					expectedInput: 'نضع السبب أولا ثم رابط النتيجة ثم النتيجة',
					revealAr:
						'في علاقة النتيجة نبدأ دائما بالسبب، ثم نضع رابط النتيجة (donc, c’est pourquoi, si bien que)، ثم نذكر النتيجة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'السبب (La cause) يجيب عن السؤال (Pourquoi ?)؛ أدواته مع الفعل: parce que, car (لا تأتي في بداية الجملة)، puisque, comme (تأتي دائما في بداية الجملة).',
				'السبب مع الاسم (Groupe nominal): grâce à (سبب إيجابي)، à cause de (سبب سلبي)، en raison de / suite à (سبب محايد)، faute de (بسبب غياب/نقص).',
				'النتيجة (La conséquence) تبرز الأثر المترتب؛ أدواتها: donc, alors, par conséquent, c’est pourquoi, d’où (+ nom), si bien que, de sorte que, tellement... que, si... que.',
				'للتحويل من السبب إلى النتيجة: [النتيجة + parce que + السبب] تصبح [السبب + donc / c’est pourquoi / si bien que + النتيجة].',
				'انتبه: في الجمل العلمية مع « si / tellement / tant... que »، نستعمل (si + adjectif/adverbe)، و(tellement de / tant de + nom).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Choisir le bon articulateur de cause ou conséquence',
				subtitle: 'Attention à la classe grammaticale qui suit l’outil',
				columns: [
					{ header: 'Cause (+ Nom)', rule: 'grâce à / à cause de', examples: 'grâce à la science' },
					{ header: 'Cause (+ Verbe)', rule: 'parce que / comme', examples: 'car l’air se dilate' },
					{ header: 'Conséquence', rule: 'donc / si bien que', examples: 'd’où une baisse' }
				]
			}),
			visualCaptionAr: 'مقارنة سريعة بين أدوات السبب والنتيجة حسب ما يليها (اسم أو فعل)',
			examples: [
				{
					problemAr: 'Transformez le rapport de cause en rapport de conséquence : « Le rendement baisse parce que la poussière recouvre les panneaux. »',
					solutionAr: 'La poussière recouvre les panneaux, si bien que (ou : par conséquent,) le rendement baisse.'
				},
				{
					problemAr: 'Remplacez la subordonnée par un groupe nominal : « La vision est nette parce que le cristallin est transparent. »',
					solutionAr: 'La vision est nette grâce à la transparence du cristallin.'
				}
			],
			watchOutAr:
				'أخطاء متكررة تجنبها: (1) لا تبدأ الجملة أبدا بـ (car) بل استعمل (Comme) في الصدارة. (2) لا تكتب (à cause de) مع نتيجة إيجابية مثل الشفاء أو النجاح، بل استعمل (grâce à). (3) عند عكس السبب إلى نتيجة، لا تُبقِ ترتيب الجملتين نفسه وإلا انقلب المعنى العلمي رأسا على عقب!'
		},
		practice: [
			{
				questionAr: 'Complétez par l’articulateur qui convient : « ........ la découverte des antibiotiques, de nombreuses infections bactériennes sont guéries. »',
				options: ['À cause de', 'Grâce à', 'Parce que', 'Donc'],
				correctIndex: 1,
				diagnosticFeedback: [
					'à cause de تُستعمل للسبب السلبي، والشفاء نتيجة إيجابية.',
					'أحسنت! « Grâce à » تُستعمل للسبب الإيجابي المتبوع باسم (la découverte).',
					'parce que يتبعها فعل مصرف لا اسم.',
					'donc رابط نتيجة لا سبب.'
				],
				explanationAr: 'لوجود اسم (la découverte) ونتيجة إيجابية (guéries)، نختار « Grâce à ».'
			},
			{
				questionAr: 'Quel rapport logique exprime la phrase : « Le Sahara reçoit un ensoleillement exceptionnel, si bien qu’il constitue un gisement énergétique majeur » ?',
				options: ['La cause', 'La conséquence', 'L’opposition', 'La condition'],
				correctIndex: 1,
				diagnosticFeedback: [
					'السبب ذُكر أولا، أما « si bien que » فتقدم ما ترتب عليه.',
					'صحيح! « si bien que » من أبرز أدوات الربط للنتيجة.',
					'لا يوجد تضاد بين القضيتين.',
					'لا يوجد شرط أو فرضية هنا.'
				],
				explanationAr: 'العبارة « si bien que » تُدخل جملة فرعية تعبر عن النتيجة (la conséquence).'
			},
			{
				questionAr: 'Transformez en rapport de cause sans changer le sens : « L’eau s’évapore vite ; par conséquent, les sols s’assèchent. »',
				options: [
					'L’eau s’évapore vite parce que les sols s’assèchent.',
					'Les sols s’assèchent parce que l’eau s’évapore vite.',
					'Les sols s’assèchent ; donc l’eau s’évapore vite.',
					'Comme les sols s’assèchent, l’eau s’évapore vite.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'عكست السبب والنتيجة! التبخر هو السبب لا الجفاف.',
					'إجابة ممتازة! الجفاف (النتيجة) سببه التبخر السريع (السبب).',
					'استعملت رابط نتيجة وعكست العلاقة المنطقية.',
					'Comme تأتي قبل السبب، وهنا وضعتها قبل النتيجة.'
				],
				explanationAr: 'السبب الأصلي هو (L’eau s’évapore vite)، فيأتي بعد (parce que) بينما تتقدم النتيجة (Les sols s’assèchent).'
			},
			{
				questionAr: 'Quel articulateur de cause se place OBLIGATOIREMENT en tête de phrase ?',
				options: ['car', 'parce que', 'comme', 'grâce à'],
				correctIndex: 2,
				diagnosticFeedback: [
					'car لا تُوضع أبدا في بداية الجملة.',
					'parce que تُوضع عادة في وسط الجملة.',
					'صحيح! « Comme » السببية تأتي دائما في بداية الجملة.',
					'يمكن أن تأتي grâce à في البداية أو الوسط.'
				],
				explanationAr: 'من قواعد التركيب في الفرنسية أن « Comme » الدالة على السبب تتصدر الجملة وجوبا.'
			},
			{
				questionAr: 'Choisissez la phrase correcte pour transformer la cause en groupe nominal : « Les récoltes ont diminué parce qu’il manque d’eau. »',
				options: [
					'Les récoltes ont diminué faute d’eau.',
					'Les récoltes ont diminué grâce à l’eau.',
					'Les récoltes ont diminué par conséquent d’eau.',
					'Les récoltes ont diminué puisque d’eau.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! « faute de + nom » تعبر بدقة عن السبب الناتج عن النقص أو الغياب.',
					'grâce à للسبب الإيجابي وتغيّر المعنى هنا.',
					'par conséquent لا تتبع بـ de + nom.',
					'puisque تتبع بجملة فعلية لا اسم.'
				],
				explanationAr: 'العبارة « faute de + nom » (بدون أداة تعريف) تعبّر عن سبب ناتج عن انعدام أو نقص شيء ما.'
			}
		]
	},

	// [5] Le compte rendu objectif d'un texte scientifique
	{
		id: 'fre_lesson_2as_sci_t1_compte_rendu_objectif',
		slug: 'fre-2as-sci-t1-compte-rendu-objectif',
		grade: '2as_se',
		yearSubjectId: 675,
		trimesterId: 't1',
		sequenceId: 'proj1',
		sequenceTitleAr: 'المشروع 1: الخطاب العلمي الموضوعي والبرهنة العلمية',
		order: 5,
		titleAr: 'منهجية كتابة التقرير الموضوعي لنص علمي (Le compte rendu objectif)',
		objectives: [
			'إتقان هيكل التقرير الموضوعي في مرحلتيه: التقديم الباراتكستي (l’accroche) ثم التلخيص الموضوعي للأفكار الأساسية',
			'توظيف ضمير الغائب (l’auteur, il) وأفعال التقرير المناسبة (explique, démontre, souligne, conclut) مع التزام الحياد التام',
			'تجنب النسخ الحرفي لجمل النص الأصلي وتجنب إدراج الرأي الشخصي في التقرير الموضوعي'
		],
		keywordsAr: [
			'Compte rendu objectif',
			'Accroche',
			'Paratexte',
			'Idées essentielles',
			'Reformulation',
			'Troisième personne',
			'Visée informative'
		],
		discover: {
			scenarioAr:
				'في اختبار الفصل الأول للسنة الثانية ثانوي علمي، يُقترح عليك دائما « Sujet 1 : Faites le compte rendu objectif du texte ». لتحقيق العلامة الكاملة (6/6)، لا يكفي تلخيص النص عشوائيا؛ بل يجب تقديم بطاقة تعريفية موجزة للنص أولا، ثم عرض أفكاره الأساسية بأسلوبك الخاص وبضمير الغائب دون إضافة أي رأي شخصي.',
			svg: svgFrenchWritingBlueprint({
				title: 'Plan officiel du Compte Rendu Objectif (2AS)',
				steps: [
					{ stage: '1. Accroche', detail: 'Type, titre, auteur, source, thème et visée du texte', color: '#1d4ed8' },
					{ stage: '2. Idée centrale', detail: 'L’auteur commence par présenter / définir le phénomène', color: '#047857' },
					{ stage: '3. Développement', detail: 'Ensuite, il explique / démontre les causes et effets', color: '#b45309' },
					{ stage: '4. Clôture', detail: 'Enfin, il conclut en soulignant l’importance de...', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'ما العناصر التي نجمعها في الفقرة الأولى (المقدمة / l’accroche) للتقرير الموضوعي؟',
					hintAr: 'انظر إلى العنوان، اسم الكاتب، المصدر، موضوع النص، والغاية التواصلية.',
					expectedInput: 'نوع النص وعنوانه وكاتبه ومصدره وموضوعه وغايته',
					revealAr:
						'نذكر في جملة مترابطة: طبيعة النص (texte explicatif/scientifique)، عنوانه، كاتبه، مصدره، الفكرة العامة (thème)، وغايته (dans le but d’informer et d’expliquer).'
				},
				{
					promptAr: 'لماذا نمنع استعمال عبارات مثل « Je trouve ce texte intéressant » في التقرير الموضوعي؟',
					hintAr: 'انتبه لكلمة (objectif) في عنوان المهارة.',
					expectedInput: 'لأن التقرير الموضوعي يتطلب الحياد التام دون إبداء رأي شخصي',
					revealAr:
						'التقرير الموضوعي (objectif) يقتصر على نقل مضمون النص بأمانة وحياد دون نقد أو رأي شخصي (عكس التقرير النقدي critique المقرر في الشعب الأدبية).'
				},
				{
					promptAr: 'ما الضمير والزمن المعتمدان عند صياغة التقرير الموضوعي؟',
					hintAr: 'نحن نتحدث عن الكاتب (L’auteur / Il) ونعرض أفكاره الآن.',
					expectedInput: 'ضمير الغائب (il / l’auteur) والزمن الحاضر (le présent)',
					revealAr:
						'نكتب بضمير الغائب (l’auteur / le journaliste / il) ونستعمل الحاضر (présent de l’indicatif) مع أفعال تقرير متنوعة: explique, montre, précise, conclut.'
				}
			]
		},
		summary: {
			rulesAr: [
				'حجم التقرير الموضوعي: يمثّل تقريبا ثلث (1/3) حجم النص الأصلي (نحو 80 إلى 110 كلمة في اختبار 2AS).',
				'الفقرة 1 (التقديم / L’accroche): « Ce texte explicatif intitulé "...", écrit par [Auteur] et extrait de [Source], traite de [Thème]. L’auteur vise à informer le lecteur sur... »',
				'الفقرة 2 (العرض الموضوعي / Le résumé): نعرض الأفكار الأساسية مرتّبة باستعمال الروابط المنطقية وأفعال التقرير: D’abord, l’auteur définit... Ensuite, il explique que... De plus, il montre que... Enfin, il conclut que...',
				'قواعد ذهبية: (1) أعد صياغة الأفكار بأسلوبك وتجنب النسخ الحرفي. (2) احذف الأمثلة الطويلة والتفاصيل الثانوية. (3) التزم بضمير الغائب والحاضر وابتعد تماما عن « je » والرأي الشخصي.'
			],
			visualSvg: svgFrenchWordFormation({
				title: 'Formule gagnante du Compte Rendu Objectif',
				prefix: 'Accroche (Paratexte)',
				root: 'Résumé (3e pers.)',
				suffix: 'Zéro avis personnel',
				derivedWord: 'Compte rendu objectif réussi (6 / 6)',
				meaningNote: 'Fidélité aux idées + Reformulation + Articulateurs + Langue correcte'
			}),
			visualCaptionAr: 'المعادلة المنهجية لإنجاز تقرير موضوعي متكامل لنص علمي',
			examples: [
				{
					problemAr: 'Rédigez l’accroche d’un texte intitulé « L’énergie solaire en Algérie », publié dans Revue Sciences Maghreb (2025), sans nom d’auteur.',
					solutionAr: 'Ce texte explicatif intitulé « L’énergie solaire en Algérie », publié dans la Revue Sciences Maghreb en 2025, aborde le potentiel photovoltaïque du pays dans le but d’informer et d’expliquer son fonctionnement.'
				},
				{
					problemAr: 'Reformulez objectivement cette phrase du texte : « Grâce à ses expériences rigoureuses sur les lentilles, Ibn Al-Haytham a prouvé que l’œil reçoit la lumière. »',
					solutionAr: 'L’auteur rappelle qu’Ibn Al-Haytham a démontré expérimentalement que la vision résulte de la réception de la lumière par l’œil.'
				}
			],
			watchOutAr:
				'احذر من خطأين يضيعان النقاط في السوجي 1: لا تكتب « Dans ce texte, je vais vous parler de... » (لأن المتحدث هو الكاتب لا أنت)، ولا تنسَ ذكر العنوان والمصدر إذا كانا موجودين في النص.'
		},
		practice: [
			{
				questionAr: 'Quelles informations doivent impérativement figurer dans l’introduction (l’accroche) d’un compte rendu objectif ?',
				options: [
					'Uniquement le nombre de lignes du texte',
					'Le type, le titre, l’auteur/source (si présents), le thème et la visée communicative',
					'Votre opinion personnelle sur le style de l’auteur',
					'Tous les exemples chiffrés du texte recopiés mot à mot'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'عدد الأسطر غير ضروري ولا يعرّف بمضمون النص.',
					'إجابة ممتازة! هذه هي العناصر المنهجية الكاملة لمقدمة التقرير الموضوعي.',
					'الرأي الشخصي ممنوع في التقرير الموضوعي.',
					'التفاصيل والأمثلة الطويلة تُحذف ولا تُنسخ حرفيا.'
				],
				explanationAr: 'المقدمة التعريفية (l’accroche) تقدّم بطاقة النص: نوعه وعنوانه وكاتبه/مصدره وموضوعه وغايته.'
			},
			{
				questionAr: 'Quel pronom personnel et quel temps doit-on privilégier dans le compte rendu objectif ?',
				options: [
					'La 1re personne (je) et le futur simple',
					'La 2e personne (tu) et l’impératif',
					'La 3e personne (l’auteur / il) et le présent de l’indicatif',
					'La 1re personne (nous) et le passé simple'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'ضمير المتكلم (je) يخرق قاعدة الموضوعية.',
					'لا نوجّه أوامر للقارئ في التقرير الموضوعي.',
					'صحيح! نستعمل ضمير الغائب (l’auteur / il) والحاضر الإخباري.',
					'ضمير المتكلم والماضي البسيط لا يناسبان التقرير الموضوعي.'
				],
				explanationAr: 'ننسب الأفكار إلى الكاتب بضمير الغائب (l’auteur explique, démontre...) في الزمن الحاضر.'
			},
			{
				questionAr: 'Laquelle de ces phrases est INCORRECTE dans un compte rendu objectif ?',
				options: [
					'D’abord, l’auteur définit le principe de l’osmose inverse.',
					'Ensuite, il explique les avantages écologiques de cette méthode.',
					'À mon avis, l’auteur a très bien écrit ce texte passionnant.',
					'Enfin, il souligne la nécessité de préserver les ressources en eau.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'صياغة موضوعية ممتازة.',
					'صياغة موضوعية سليمة.',
					'أحسنت في اكتشاف الخطأ! عبارة « À mon avis... très bien écrit » حكم ذاتي ممنوع في التقرير الموضوعي.',
					'خاتمة موضوعية سليمة.'
				],
				explanationAr: 'التقرير الموضوعي يخلو تماما من التقييم الذاتي (à mon avis, passionnant, très bien écrit).'
			},
			{
				questionAr: 'Quel ensemble de verbes est le plus adapté pour rapporter les étapes d’un texte scientifique ?',
				options: [
					'définit, explique, démontre, conclut',
					'rêve, pleure, imagine, chante',
					'ordonne, interdit, menace, punit',
					'invente, plaisante, exagère, rit'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! هذه أفعال تقرير موضوعية دقيقة تناسب الخطاب العلمي.',
					'أفعال وجدانية وخيالية لا تناسب النص العلمي.',
					'أفعال أمرية وردعية لا تعبّر عن البرهنة العلمية.',
					'أفعال هزلية لا تناسب النص العلمي.'
				],
				explanationAr: 'نستخدم أفعال التقرير العلمية الدقيقة مثل: définit, présente, explique, démontre, précise, souligne, conclut.'
			},
			{
				questionAr: 'Que faut-il faire face aux exemples longs et aux chiffres secondaires du texte original ?',
				options: [
					'Les recopier intégralement pour allonger le compte rendu',
					'Les supprimer ou les synthétiser pour ne garder que l’idée essentielle',
					'Les remplacer par des histoires inventées',
					'Les placer dans le titre du compte rendu'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'النسخ الحرفي وإطالة النص يُفقد التقرير خاصية التكثيف.',
					'صحيح! التقرير الموضوعي يختزل التفاصيل الثانوية ويحافظ على الأفكار الأساسية بأسلوب مقتضب.',
					'لا يجوز إضافة معلومات من خارج النص الأصلي.',
					'العنوان لا يحتمل تفاصيل النص.'
				],
				explanationAr: 'التقرير الموضوعي يركّز على الأفكار الجوهرية ويحذف التفاصيل الفرعية دون إضافة أفكار خارجية.'
			}
		]
	}
];
