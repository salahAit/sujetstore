import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWritingBlueprint
} from '../../svg-french';

export const LESSONS_3AM_T3: FrenchInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// 1. La biographie et le portrait moral des savants musulmans et algériens
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_3am_t3_biographie_portrait',
		slug: 'fre-3am-t3-biographie-portrait',
		grade: '3am',
		yearSubjectId: 635,
		trimesterId: 't3',
		sequenceId: 'proj3',
		sequenceTitleAr: 'المشروع الثالث: السيرة وتثمين التراث (Biographie de savants et valorisation du patrimoine)',
		order: 1,
		titleAr: 'السيرة الغيرية والوصف المعنوي للعلماء (La biographie et le portrait moral)',
		objectives: [
			'التمييز بين السيرة الذاتية (Autobiographie : Je) والسيرة الغيرية (Biographie : Il / Elle)',
			'استخراج عناصر السيرة والوصف المعنوي (Portrait moral) لعلماء المسلمين والجزائر مثل ابن خلدون وابن الهيثم والشيخ الإبراهيمي'
		],
		keywordsAr: ['biographie', 'autobiographie', 'portrait moral', 'savants musulmans', 'Ibn Khaldoun'],
		discover: {
			scenarioAr:
				'اقرأ هذه الفقرة عن العالم المسلم ابن الهيثم: « Né à Bassora en 965, Ibn Al-Haytham était un savant curieux, rigoureux et persévérant. Il écrivit le célèbre Traité d’optique (Kitab Al-Manazir) et posa les bases de la méthode scientifique expérimentale. » هل يتحدث الكاتب عن نفسه أم عن شخصية أخرى؟',
			svg: svgFrenchGrammarMap({
				title: 'Biographie vs Autobiographie (3AM)',
				rootLabel: 'Raconter la vie d’un savant ou d’un poète',
				rootSub: 'Observer le pronom sujet, les dates et le portrait moral',
				branches: [
					{
						label: 'Biographie (Il / Elle)',
						rule: 'L’auteur raconte la vie d’un autre',
						example: 'Ibn Khaldoun rédigea la Muqaddima.',
						color: '#1d4ed8'
					},
					{
						label: 'Autobiographie (Je)',
						rule: 'L’auteur raconte sa propre vie',
						example: 'Je suis né dans un petit village.',
						color: '#047857'
					},
					{
						label: 'Portrait moral',
						rule: 'Qualités intellectuelles et humaines',
						example: 'rigoureux, modeste, érudit, généreux',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما نوع هذا النص عن ابن الهيثم: سيرة ذاتية (Autobiographie) أم سيرة غيرية (Biographie)؟ ولماذا؟',
					hintAr: 'لاحظ الضمير المستعمل (Il écrivit).',
					expectedInput: 'سيرة غيرية (Biographie) لأن الكاتب يستعمل ضمير الغائب (Il)',
					revealAr: 'ممتاز! في الـ Biographie يكون الكاتب مختلفاً عن الشخصية ويستعمل ضمير الغائب (il / elle)، أما في الـ Autobiographie فيستعمل (Je).'
				},
				{
					promptAr: 'استخرج ثلاث صفات معنوية (Portrait moral) لابن الهيثم من الفقرة.',
					hintAr: 'انظر بعد الفعل était un savant...',
					expectedInput: 'curieux, rigoureux, persévérant',
					revealAr: 'الوصف المعنوي (Le portrait moral) يبرز أخلاق العالم وصفاته الفكرية، بخلاف الوصف الجسدي (Le portrait physique).'
				},
				{
					promptAr: 'ما أشهر مؤلّف لابن خلدون الذي كتبه قرب تيارت بالجزائر؟',
					hintAr: 'يعني بالفرنسية L’Introduction.',
					expectedInput: 'La Muqaddima (المقدمة)',
					revealAr: 'أحسنت! كتب ابن خلدون « المقدمة » (La Muqaddima) بقلعة بني سلامة قرب تيارت في الجزائر سنة 1377.'
				}
			]
		},
		summary: {
			rulesAr: [
				'السيرة الغيرية (La biographie): نص يروي فيه كاتب حياة شخص حقيقي مشهور بضمير الغائب (il / elle) وفق تسلسل زمني من الميلاد إلى الإنجازات والوفاة.',
				'السيرة الذاتية (L’autobiographie): نص يروي فيه الكاتب حياته بنفسه بضمير المتكلم (je / moi / mon).',
				'الوصف المعنوي (Le portrait moral): يصف الأخلاق، الذكاء، العلم، والصفات النبيلة مثل: érudit (عالم متبحّر)، modeste (متواضع)، rigoureux (دقيق)، éloquent (فصيح)، persévérant (مثابر)، sage (حكيم).',
				'شخصيات علمية وأدبية إسلامية وجزائرية معتمدة في 3AM: Ibn Khaldoun، Ibn Al-Haytham، Al-Khwarizmi، Al-Zahrawi، Ibn Battouta، Fatima Al-Fihriya، Cheikh Mohamed Bachir El-Ibrahimi، Le poète Moufdi Zakaria، Le poète Mohamed El-Aïd Al-Khalifa.'
			],
			visualSvg: svgFrenchWritingBlueprint({
				title: 'Éléments d’une fiche biographique complète (3AM)',
				steps: [
					{ stage: 'Identité', detail: 'Nom complet, date et lieu de naissance (Ex. : Moufdi Zakaria, 1908, Beni Isguen).' },
					{ stage: 'Formation', detail: 'Études, voyages scientifiques et portrait moral (curieux, cultivé, dévoué).' },
					{ stage: 'Œuvres clés', detail: 'Livres, inventions ou poèmes (Ex. : l’hymne national Kassaman en 1955).' },
					{ stage: 'Postérité', detail: 'Date de décès et héritage toujours enseigné et admiré aujourd’hui.' }
				]
			}),
			visualCaptionAr: 'العناصر الأربعة لبطاقة التعريف البيوغرافية للعلماء والشعراء في الثالثة متوسط',
			examples: [
				{
					problemAr: 'حدّد نوع النص: « Né en 1889 à Ras El Oued, Cheikh Mohamed Bachir El-Ibrahimi maîtrisait la langue arabe avec une rare éloquence. »',
					solutionAr: 'C’est une biographie (emploi de la 3e personne, date et lieu de naissance, portrait moral et intellectuel).'
				},
				{
					problemAr: 'صنّف الصفتين: (une barbe blanche) و (un esprit brillant et modeste).',
					solutionAr: 'une barbe blanche : portrait physique | un esprit brillant et modeste : portrait moral.'
				}
			],
			watchOutAr:
				'عند ملء جدول الفهم (Fiche biographique)، التزم بالمعطيات الدقيقة من النص (Nom، Naissance، Domaine / Métier، Œuvre célèbre، Décès) دون نسخ فقرات كاملة!'
		},
		practice: [
			{
				questionAr: 'ما الذي يميّز السيرة الغيرية (La biographie) عن السيرة الذاتية (L’autobiographie)؟',
				options: [
					'تُكتب بضمير الغائب (il / elle) عن شخص آخر',
					'تُكتب دائماً بضمير المتكلم (je)',
					'لا تحتوي على تواريخ أو أماكن',
					'تتحدث فقط عن الحيوانات'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! السيرة الغيرية تروي حياة شخص آخر بضمير الغائب (il / elle).',
					'ضمير المتكلم (je) يخص السيرة الذاتية (autobiographie).',
					'التواريخ والأماكن أساسية في كل سيرة.',
					'السيرة تروي حياة شخصيات إنسانية حقيقية.'
				],
				explanationAr: 'في الـ Biographie يكتب المؤلف عن شخصية أخرى مستعملاً ضمير الغائب.'
			},
			{
				questionAr: 'أيّ مجموعة من الصفات تنتمي إلى الوصف المعنوي (Le portrait moral) لعالم مسلم؟',
				options: [
					'grand, mince, yeux noirs',
					'érudit, modeste, rigoureux, persévérant',
					'carré, rond, long, étroit',
					'chaud, froid, sec, humide'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه صفات جسدية (portrait physique).',
					'أحسنت! كلها صفات أخلاقية وفكرية (portrait moral).',
					'هذه صفات لأشكال هندسية.',
					'هذه صفات للطقس.'
				],
				explanationAr: 'الوصف المعنوي يعبّر عن الصفات الخُلقية والعلمية مثل érudit و modeste و rigoureux.'
			},
			{
				questionAr: 'من مؤلف النشيد الوطني الجزائري « قسماً » (Kassaman) سنة 1955؟',
				options: ['Ibn Al-Haytham', 'Le poète Moufdi Zakaria', 'Al-Idrisi', 'Ibn Battouta'],
				correctIndex: 1,
				diagnosticFeedback: [
					'ابن الهيثم عالم بصريات ورياضيات.',
					'ممتاز! الشاعر الجزائري مفدي زكريا ألّف نشيد قسماً سنة 1955.',
					'الإدريسي عالم جغرافيا وخرائط.',
					'ابن بطوطة رحّالة مشهور.'
				],
				explanationAr: 'مفدي زكريا (1908–1977) هو شاعر الثورة ومؤلف النشيد الوطني الجزائري قسماً.'
			},
			{
				questionAr: 'ما المجال العلمي الذي اشتهر فيه العالم المسلم ابن الهيثم (Ibn Al-Haytham)؟',
				options: ['البصريات والمنهج التجريبي (l’optique et la méthode expérimentale)', 'فن العمارة الرومانية', 'صناعة السفن البخارية', 'الشعر الملحمي'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! اشتهر ابن الهيثم بكتاب المناظر وتأسيس علم البصريات الحديث.',
					'ليس اختصاص ابن الهيثم.',
					'لم تكن السفن البخارية موجودة في عصره.',
					'كان عالماً في الفيزياء والبصريات والرياضيات.'
				],
				explanationAr: 'يُعدّ ابن الهيثم رائد علم البصريات والمنهج العلمي التجريبي بكتابه الشهير المناظر.'
			},
			{
				questionAr: 'اقرأ الجملة: « Je me souviens encore de mon premier cahier à l’école du village. » ما نوع هذا المقطع؟',
				options: ['Une biographie', 'Une autobiographie', 'Un fait divers', 'Une recette'],
				correctIndex: 1,
				diagnosticFeedback: [
					'السيرة الغيرية تستعمل il/elle وليس Je.',
					'ممتاز! وجود Je و mon وذكرى شخصية يدلّ على سيرة ذاتية (Autobiographie).',
					'ليس خبراً صحفياً.',
					'ليست وصفة طعام.'
				],
				explanationAr: 'استعمال ضمير المتكلم (Je) لاستحضار ذكريات الطفولة يميّز السيرة الذاتية (Autobiographie).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 2. Les expansions du nom (adjectif, complément du nom, relative, apposition)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_3am_t3_expansions_du_nom',
		slug: 'fre-3am-t3-expansions-du-nom',
		grade: '3am',
		yearSubjectId: 635,
		trimesterId: 't3',
		sequenceId: 'proj3',
		sequenceTitleAr: 'المشروع الثالث: السيرة وتثمين التراث (Biographie de savants et valorisation du patrimoine)',
		order: 2,
		titleAr: 'توسيع الاسم (Les expansions du nom : adjectif, complément du nom, relative, apposition)',
		objectives: [
			'التعرّف إلى الأنواع الأربعة لتوسيع الاسم (Les expansions du nom) وتحديد الاسم المنعوت (le nom noyau)',
			'إثراء وصف عالم أو معلم جزائري باستعمال النعت والمضاف إليه وجملة الصلة (qui / que / où / dont) والبدل'
		],
		keywordsAr: ['expansion du nom', 'adjectif qualificatif', 'complément du nom', 'proposition relative', 'apposition'],
		discover: {
			scenarioAr:
				'انظر كيف نُغني كلمة (une mosquée) البسيطة: 1) une mosquée magnifique (نعت) | 2) la mosquée de Tlemcen (مضاف إليه) | 3) une mosquée qui date de 1082 (جملة صلة) | 4) La Grande Mosquée, joyau de l’art islamique (بدل / apposition). كلها توسّع الاسم وتُثري الوصف!',
			svg: svgFrenchGrammarMap({
				title: 'Les 4 expansions du nom (3AM)',
				rootLabel: 'Enrichir un Groupe Nominal (GN)',
				rootSub: 'Toutes précisent et qualifient un « nom noyau »',
				branches: [
					{
						label: 'Adjectif épithète',
						rule: 'Placé près du nom',
						example: 'une citadelle ancienne',
						color: '#1d4ed8'
					},
					{
						label: 'Complément du nom',
						rule: 'Préposition (de, à, en) + nom',
						example: 'les ponts de Constantine',
						color: '#047857'
					},
					{
						label: 'Relative (PSR)',
						rule: 'Pronom (qui, que, où, dont)',
						example: 'un site qui attire les visiteurs',
						color: '#b45309'
					},
					{
						label: 'Apposition',
						rule: 'Séparée par des virgules',
						example: 'Timgad, ville antique, ...',
						color: '#7c3aed'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الكلمة التي تربط المضاف إليه بالاسم في (la mosquée de Tlemcen) و (des maisons en pierre)؟',
					hintAr: 'حروف جر قصيرة مثل de / à / en.',
					expectedInput: 'حرف جر (Une préposition : de, d’, du, à, en)',
					revealAr: 'المضاف إليه (Le complément du nom) يُربط دائماً بالاسم بواسطة حرف جر (de, à, en, sans, pour).'
				},
				{
					promptAr: 'ما الذي يميّز جملة الصلة (La proposition subordonnée relative — PSR) عن بقية التوسيعات؟',
					hintAr: 'تبدأ بضمير وصل (qui, que, où, dont) وتحتوي على فعل مصرف!',
					expectedInput: 'تبدأ بضمير وصل وتحتوي على فعل مصرف',
					revealAr: 'أحسنت! الـ PSR تبدأ بـ (qui, que, où, dont) وتحتوي على فعل مصرف، والاسم الذي تصفه يُسمى (l’antécédent).'
				},
				{
					promptAr: 'كيف نعرف البدل التوضيحي (L’apposition) في جملة مثل: « La Casbah, citadelle historique, domine la baie d’Alger. »؟',
					hintAr: 'انظر إلى علامات الترقيم التي تحيط بعبارة (citadelle historique).',
					expectedInput: 'يُفصل عن الاسم بفاصلتين (entre virgules)',
					revealAr: 'ممتاز! الـ Apposition تأتي غالباً محصورة بين فاصلتين وتضيف تعريفاً مرموقاً للمعلم أو العالم.'
				}
			]
		},
		summary: {
			rulesAr: [
				'النعت المباشر (L’adjectif qualificatif épithète): يتبع الاسم في النوع والعدد (مثال: des ruelles étroites، un savant célèbre).',
				'المضاف إليه (Le complément du nom — CDN): اسم أو مصدر مسبوق بحرف جر (de, à, en, pour) يحدّد الاسم (مثال: la vallée du M’Zab، l’architecture de la Casbah، un minaret en pierre).',
				'جملة الصلة (La proposition subordonnée relative — PSR): تبدأ بضمير وصل (qui للفاعل، que للمفعول به، où للمكان والزمان، dont للمسبوق بـ de) وتصف الاسم السابق (l’antécédent). مثال: La Kalâa des Béni Hammad est un site qui témoigne de notre histoire.',
				'البدل (L’apposition): اسم أو صفة مفصولة بفاصلة عن الاسم لتعريفه بدقة. مثال: Ibn Khaldoun, fondateur de la sociologie, séjourna à Tiaret.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Choisir le bon pronom relatif (PSR)',
				subtitle: 'Relier deux phrases pour enrichir la description d’un patrimoine',
				columns: [
					{
						header: 'qui (Sujet)',
						rule: 'Suivi d’un verbe',
						examples: 'le jardin qui abrite des plantes rares',
						color: '#1d4ed8'
					},
					{
						header: 'que / qu’ (COD)',
						rule: 'Suivi d’un sujet + verbe',
						examples: 'le livre qu’Ibn Al-Haytham a écrit',
						color: '#047857'
					},
					{
						header: 'où (Lieu / Temps)',
						rule: 'Indique le lieu / date',
						examples: 'la ville où naquit Cheikh Ben Badis',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'دليل اختيار ضمير الوصل الصحيح (qui / que / où) في تمارين توسيع الاسم',
			examples: [
				{
					problemAr: 'اربط الجملتين بضمير الوصل المناسب: « Nous avons visité le Jardin d’Essai du Hamma. Ce jardin se trouve à Alger. »',
					solutionAr: 'Nous avons visité le Jardin d’Essai du Hamma qui se trouve à Alger.'
				},
				{
					problemAr: 'حدّد نوع التوسيع المسطّر: « La Grande Mosquée de Tlemcen attire les historiens. »',
					solutionAr: 'Grande : adjectif qualificatif épithète | de Tlemcen : complément du nom (CDN).'
				}
			],
			watchOutAr:
				'لا تخلط بين (qui) و (que): بعد (qui) يأتي فعل مباشرة (qui protège)، أما بعد (que) فيأتي فاعل ثم فعل (que les visiteurs admirent)!'
		},
		practice: [
			{
				questionAr: 'ما نوع توسيع الاسم (de Constantine) في الجملة: « Les ponts de Constantine impressionnent les voyageurs. »؟',
				options: ['Adjectif qualificatif', 'Complément du nom', 'Proposition subordonnée relative', 'Apposition'],
				correctIndex: 1,
				diagnosticFeedback: [
					'de Constantine ليست صفة مفردة.',
					'ممتاز! حرف الجر (de) + اسم (Constantine) يُكوّن Complément du nom.',
					'لا يوجد ضمير وصل ولا فعل مصرف داخل التوسيع.',
					'ليست مفصولة بفاصلة لتعريف الاسم.'
				],
				explanationAr: 'العبارة (de Constantine) مسبوقة بحرف الجر (de) وتحدّد الاسم (Les ponts)، فهي Complément du nom.'
			},
			{
				questionAr: 'أكمل بضمير الوصل المناسب: « Timgad est une cité antique ...... attire des milliers de visiteurs. »',
				options: ['que', 'qui', 'où', 'dont'],
				correctIndex: 1,
				diagnosticFeedback: [
					'que تحتاج فاعلاً بعدها، وهنا بعدها الفعل attire مباشرة.',
					'أحسنت! qui تحلّ محل الفاعل ويأتي بعدها الفعل attire مباشرة.',
					'où تدل على المكان مع وجود فاعل وفعل بعدها.',
					'الفعل attirer لا يتعدّى بحرف الجر de.'
				],
				explanationAr: 'الضمير qui يعمل كفاعل للفعل attire مباشرة.'
			},
			{
				questionAr: 'أكمل بضمير الوصل المناسب: « Ghardaïa est la ville ...... se situe la célèbre Vallée du M’Zab. »',
				options: ['qui', 'que', 'où', 'dont'],
				correctIndex: 2,
				diagnosticFeedback: [
					'qui للفاعل، وهنا الفاعل موجود (la célèbre Vallée du M’Zab).',
					'que للمفعول به المباشر.',
					'ممتاز! où تعبّر عن المكان (حيث تقع وادي ميزاب).',
					'dont تعوّض اسماً مسبوقاً بـ de.'
				],
				explanationAr: 'لاسم المكان (la ville) المتبوع بفاعل وفعل، نستعمل ضمير الوصل (où).'
			},
			{
				questionAr: 'ما نوع التوسيع المحصور بين فاصلتين في الجملة: « Djamaâ El-Djazaïr, chef-d’œuvre architectural, possède le plus haut minaret du monde. »؟',
				options: ['Proposition relative', 'Apposition', 'Verbe d’état', 'Adverbe'],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا يوجد ضمير وصل ولا فعل مصرف.',
					'صحيح! العبارة (chef-d’œuvre architectural) بين فاصلتين هي Apposition.',
					'لا يوجد فعل داخل العبارة.',
					'ليست ظرفاً.'
				],
				explanationAr: 'العبارة الاسمية المفصولة بفاصلتين لتعريف المعلم هي Apposition.'
			},
			{
				questionAr: 'أكمل بضمير الوصل الصحيح: « La Muqaddima est l’ouvrage ...... Ibn Khaldoun a rédigé en Algérie. »',
				options: ['qui', 'qu’', 'où', 'dont'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الفاعل (Ibn Khaldoun) مذكور بعد الفراغ فلا نستعمل qui.',
					'ممتاز! ouvrage مفعول به مباشر (COD) للفعل a rédigé، وقبل حرف العلة تصبح que -> qu’.',
					'l’ouvrage كتاب وليس مكاناً.',
					'rédiger فعل متعدٍ مباشر لا يأخذ de.'
				],
				explanationAr: 'Ibn Khaldoun a rédigé quoi ? l’ouvrage (COD)، فنستعمل que وتتحول إلى qu’ أمام حرف العلة.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 3. Temps de la description et vocabulaire mélioratif
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_3am_t3_temps_description_melioratif',
		slug: 'fre-3am-t3-temps-description-melioratif',
		grade: '3am',
		yearSubjectId: 635,
		trimesterId: 't3',
		sequenceId: 'proj3',
		sequenceTitleAr: 'المشروع الثالث: السيرة وتثمين التراث (Biographie de savants et valorisation du patrimoine)',
		order: 3,
		titleAr: 'أزمنة الوصف والمعجم التثمينـي للتراث (Temps de la description et vocabulaire mélioratif)',
		objectives: [
			'توظيف الحاضر التقريري (Présent de description / vérité générale) والماضي الناقص (Imparfait descriptif) لوصف المعالم والعلماء',
			'استعمال المعجم الإيجابي التثميني (Vocabulaire mélioratif / valorisant) لإبراز قيمة التراث الجزائري'
		],
		keywordsAr: ['vocabulaire mélioratif', 'valorisant', 'présent de description', 'imparfait', 'patrimoine'],
		discover: {
			scenarioAr:
				'اقرأ هذا الوصف للقصبة: « La Casbah d’Alger est une merveille architecturale qui surplombe majestueusement la mer Méditerranée. Ses maisons blanches et ses mosquées anciennes reflètent un patrimoine exceptionnel. » ما الكلمات التي تعبّر عن الإعجاب وتثمين المعلم؟',
			svg: svgFrenchTenseTimeline({
				title: 'Présent descriptif vs Imparfait descriptif (3AM)',
				tenseName: 'Description du patrimoine et des figures',
				formula: 'Présent (monument actuel) | Imparfait (portrait du passé)',
				activeZone: 'present',
				example: 'La Vallée du M’Zab offre une architecture harmonieuse. | Ibn Khaldoun était brillant.',
				markers: 'aujourd’hui, toujours, depuis des siècles | autrefois, jadis'
			}),
			steps: [
				{
					promptAr: 'استخرج ثلاث كلمات إيجابية تثمينية (Vocabulaire mélioratif) من وصف القصبة أعلاه.',
					hintAr: 'اسم، ظرف، وصفة تعبّر عن الروعة والتميز.',
					expectedInput: 'merveille, majestueusement, exceptionnel',
					revealAr: 'هذه الكلمات تسمّى (vocabulaire mélioratif / valorisant) وتُبرز إعجاب الكاتب واعتزازه بالتراث.'
				},
				{
					promptAr: 'لماذا استعملنا زمن الحاضر (est, surplombe, reflètent) لوصف القصبة؟',
					hintAr: 'هل القصبة ما زالت قائمة اليوم؟',
					expectedInput: 'لأنه حاضر وصفي (Présent de description) يصف معلماً قائماً وحقيقة دائمة',
					revealAr: 'لوصف معلم جزائري موجود اليوم (القصبة، تيمقاد، جامع الجزائر) نستعمل الحاضر الوصفي (Présent de l’indicatif).'
				},
				{
					promptAr: 'وما الزمن الوصفي الأنسب عند رسم الوصف المعنوي لعالم عاش في الماضي مثل ابن خلدون أو الخوارزمي؟',
					hintAr: 'تأمّل: « Al-Khwarizmi était un mathématicien brillant et méthodique. »',
					expectedInput: 'الماضي الناقص (L’imparfait descriptif)',
					revealAr: 'ممتاز! الـ Imparfait هو الزمن المثالي لرسم الـ portrait لعالم عاش في القرون الماضية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'المعجم التثميني / الإيجابي (Le vocabulaire mélioratif / valorisant): كلمات تعبّر عن الجمال، العظمة، والأهمية الثقافية لتثمين معلم أو عالم، بعكس المعجم القدحي (péjoratif).',
				'أشهر الصفات التثمينية للمعالم: magnifique، majestueux، exceptionnel، splendide، remarquable، authentique، précieux، harmonieux، célèbre، historique.',
				'أشهر الأسماء والأفعال التثمينية: un joyau (جوهرة)، un chef-d’œuvre (تحفة)، une merveille (أعجوبة)، un trésor (كنز)، rayonner (يشعّ)، fasciner (يبهر)، témoigner de (يشهد على).',
				'الزمنان الوصفيان الأساسيان: الحاضر (Présent) لوصف المعالم القائمة اليوم وحقائقها الدائمة، والماضي الناقص (Imparfait) لوصف الشخصيات والأماكن في الماضي.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Palette du vocabulaire mélioratif (Patrimoine algérien)',
				subtitle: 'Remplacer les mots faibles (« beau », « bien ») par des mots riches',
				columns: [
					{
						header: 'Adjectifs forts',
						rule: 'Qualité et prestige',
						examples: 'majestueux, splendide, authentique',
						color: '#1d4ed8'
					},
					{
						header: 'Noms valorisants',
						rule: 'Image de valeur',
						examples: 'un joyau, un chef-d’œuvre, un trésor',
						color: '#047857'
					},
					{
						header: 'Verbes de valeur',
						rule: 'Effet sur le visiteur',
						examples: 'émerveiller, fasciner, témoigner',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'رصيد المعجم التثميني للارتقاء بأسلوب الوصف في السنة الثالثة متوسط',
			examples: [
				{
					problemAr: 'عوّض الصفة البسيطة (beau) بصفة تثمينية أقوى: « Le Tassili n’Ajjer est un beau musée naturel. »',
					solutionAr: 'Le Tassili n’Ajjer est un splendide (أو magnifique / remarquable) musée naturel.'
				},
				{
					problemAr: 'اذكر قيمة زمن الحاضر في الجملة: « La Grande Mosquée de Tlemcen possède une coupole finement sculptée. »',
					solutionAr: 'C’est un présent de description (حاضر وصفي يصف خصائص المعلم).'
				}
			],
			watchOutAr:
				'احذر التذكير والتأنيث في الصفات التثمينية! نكتب: (un site majestueux / une mosquée majestueuse)، و (un patrimoine précieux / une richesse précieuse)!'
		},
		practice: [
			{
				questionAr: 'ما الكلمة التي تنتمي إلى المعجم التثميني (Vocabulaire mélioratif)؟',
				options: ['banal', 'chef-d’œuvre', 'négligé', 'ordinaire'],
				correctIndex: 1,
				diagnosticFeedback: [
					'banal تعني عادي وممل (غير تثميني).',
					'ممتاز! chef-d’œuvre (تحفة فنية/معمارية) كلمة تثمينية قوية.',
					'négligé تعني مُهمَل (قدحي).',
					'ordinaire تعني عادي.'
				],
				explanationAr: 'كلمة (chef-d’œuvre) تُبرز الإعجاب والقيمة الرفيعة للمعلم.'
			},
			{
				questionAr: 'اختر التأنيث الصحيح للصفة (majestueux) في الجملة: « La Grande Mosquée d’Alger présente une salle de prière ...... . »',
				options: ['majestueux', 'majestueuse', 'majestueuses', 'majestue'],
				correctIndex: 1,
				diagnosticFeedback: [
					'salle اسم مؤنث مفرد لا يأخذ الصيغة المذكرة.',
					'أحسنت! الصفات المنتهية بـ -eux تصبح -euse في المؤنث المفرد.',
					'الفاعل مفرد وليس جمعاً.',
					'الصيغة الصحيحة هي majestueuse.'
				],
				explanationAr: 'مؤنث الصفة majestueux هو majestueuse (مثل précieux -> précieuse).'
			},
			{
				questionAr: 'ما الزمن الأنسب لإكمال وصف معلم جزائري قائم اليوم: « Le Jardin d’Essai du Hamma ...... des plantes venues de plusieurs continents. »؟',
				options: ['abrite', 'abritera', 'abrita', 'eut abrité'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! الحاضر الوصفي (abrite) يعبّر عن صفة دائمة للحديقة اليوم.',
					'الحديقة تضم النباتات الآن وليس في المستقبل فقط.',
					'الماضي البسيط للأحداث التاريخية المنتهية.',
					'لا حاجة للماضي الأسبق التام.'
				],
				explanationAr: 'لوصف معلم قائم وحقائقه المستمرة نستعمل الحاضر الوصفي (Présent de description).'
			},
			{
				questionAr: 'ما ضدّ (Vocabulaire mélioratif) في علم الدلالة؟',
				options: ['Vocabulaire péjoratif', 'Vocabulaire chronologique', 'Vocabulaire grammatical', 'Vocabulaire interrogatif'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! المعجم القدحي (péjoratif) يذم ويقلّل القيمة، عكس التثميني (mélioratif).',
					'الزمني يرتبط بالوقت.',
					'لا يوجد تصنيف بهذا المعنى.',
					'الاستفهامي يخص الأسئلة.'
				],
				explanationAr: 'Mélioratif (تثميني/إيجابي) يقابله Péjoratif (قدحي/سلبي).'
			},
			{
				questionAr: 'أيّ جملة تُثمن التراث الجزائري بأسلوب غني ومناسب لـ 3AM؟',
				options: [
					'La Vallée du M’Zab est un endroit.',
					'La Vallée du M’Zab est un joyau authentique qui fascine les architectes.',
					'La Vallée du M’Zab a des murs.',
					'Il y a des pierres à Ghardaïa.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'وصف فقير جداً بدون ألفاظ تثمينية.',
					'ممتاز! توظيف joyau و authentique و fascine مع جملة صلة (qui...).',
					'جملة بسيطة خالية من التثمين.',
					'وصف سطحي لا يُبرز قيمة المعلم.'
				],
				explanationAr: 'تجمع الجملة الثانية بين الاسم التثميني (joyau) والصفة (authentique) والفعل (fascine).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 4. Les homophones grammaticaux complexes (ce/se, c’est/s’est, peu/peut, ces/ses)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_3am_t3_homophones_grammaticaux',
		slug: 'fre-3am-t3-homophones-grammaticaux',
		grade: '3am',
		yearSubjectId: 635,
		trimesterId: 't3',
		sequenceId: 'proj3',
		sequenceTitleAr: 'المشروع الثالث: السيرة وتثمين التراث (Biographie de savants et valorisation du patrimoine)',
		order: 4,
		titleAr: 'المتجانسات الصوتية الإملائية (Les homophones : ce/se, c’est/s’est, peu/peut, ces/ses)',
		objectives: [
			'التمييز إملائياً ونحوياً بين (ce / se)، (c’est / s’est)، (ces / ses)، و (peu / peut)',
			'تطبيق حيل الاستبدال السريعة لتفادي الأخطاء الإملائية في الفروض والاختبارات'
		],
		keywordsAr: ['homophones', 'ce / se', 'c’est / s’est', 'ces / ses', 'peu / peut'],
		discover: {
			scenarioAr:
				'تأمّل هذه الجملة عن الخوارزمي: « Ce savant s’est illustré en algèbre ; c’est un pionnier dont on peut encore étudier ses découvertes. » لاحظ أن (ce/se) و (c’est/s’est) و (ces/ses) تُنطق متشابهة تماماً ولكن كتابتها ومعناها مختلفان!',
			svg: svgFrenchConjugationChart({
				title: 'Astuces infaillibles pour les homophones (3AM)',
				subtitle: 'Remplacer mentalement avant d’écrire !',
				columns: [
					{
						header: 'ce / se',
						rule: 'ce + nom | se + verbe',
						examples: 'ce monument | il se situe',
						color: '#1d4ed8'
					},
					{
						header: 'c’est / s’est',
						rule: 'cela est | me suis / t’es',
						examples: 'c’est un savant | il s’est formé',
						color: '#047857'
					},
					{
						header: 'peu / peut',
						rule: 'peu (contraire: beaucoup) | pouvait',
						examples: 'peu de temps | on peut visiter',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'كيف نميّز فوراً بين (ce) و (se)؟',
					hintAr: 'انظر إلى نوع الكلمة التي تأتي مباشرة بعدهما.',
					expectedInput: 'ce قبل الاسم المذكر المفرد، و se قبل الفعل الضميري',
					revealAr: 'سهل جداً: (ce) اسم إشارة يسبق اسماً (ce livre, ce pont)، أما (se) فضمير يسبق فعلاً (se trouver, se souvenir).'
				},
				{
					promptAr: 'ما الحيلة المضمونة للتمييز بين (c’est) و (s’est)؟',
					hintAr: 'جرّب تعويضها بـ (cela est) أو تصريفها مع (je me suis).',
					expectedInput: 'c’est تعوّض بـ (cela est)، أما s’est فتأتي قبل اسم مفعول لفعل ضميري',
					revealAr: 'ممتاز! « C’est une ville antique » (= Cela est une ville antique). أما « Il s’est consacré à la science » (مع je: Je me suis consacré).'
				},
				{
					promptAr: 'كيف نفرّق بين (peu) و (peut) في الجملة: « En peu de temps, le visiteur peut admirer la mosquée. »؟',
					hintAr: 'إحداهما فعل يمكن تحويله إلى الـ Imparfait (pouvait)، والأخرى ظرف كمية ضده beaucoup.',
					expectedInput: 'peu ظرف كمية (قليل)، و peut فعل pouvoir في الحاضر (يمكن تعويضه بـ pouvait)',
					revealAr: 'أحسنت! إذا صحّ استبدالها بـ (pouvait) نكتب (peut)، وإذا كان ضدها (beaucoup) نكتب (peu).'
				}
			]
		},
		summary: {
			rulesAr: [
				'ce / se: نكتب (ce) محدّد إشارة قبل اسم مذكر مفرد (ce savant, ce site) أو قبل ضمير الوصل (ce qui / ce que). ونكتب (se) ضميراً قبل فعل ضميري (se trouve, se souvient).',
				'c’est / s’est: نكتب (c’est) بمعنى (cela est) للتعريف والتقديم (C’est un chef-d’œuvre). ونكتب (s’est) في الماضي المركّب للأفعال الضميرية متبوعاً باسم مفعول (Il s’est distingué, Elle s’est installée).',
				'ces / ses: نكتب (ces) للإشارة إلى أشياء نُريها (ces monuments-là). ونكتب (ses) للملكية بمعنى (les siens / المملوكة له أو لها) مثل: Ibn Khaldoun et ses ouvrages (مؤلفاته).',
				'peu / peut / peux: نكتب (peu) للكمية القليلة (peu de visiteurs)، ونكتب (peut) مع il/elle/on (Il peut voyager -> pouvait)، ونكتب (peux) مع je/tu (Tu peux lire).'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Différencier « ces » et « ses » sans jamais se tromper',
				rootLabel: 'Les deux précèdent un nom au pluriel !',
				rootSub: 'Passer au singulier pour vérifier le sens',
				branches: [
					{
						label: 'ces (Démonstratif)',
						rule: 'Singulier : ce / cet / cette',
						example: 'ces ponts (= ce pont-là)',
						color: '#1d4ed8'
					},
					{
						label: 'ses (Possessif)',
						rule: 'Singulier : son / sa (à lui)',
						example: 'ses livres (= les livres d’Ibn Khaldoun)',
						color: '#047857'
					},
					{
						label: 'Astuce finale',
						rule: 'Ajouter « -là » ou « à lui »',
						example: 'ces villes-là | ses écrits à lui',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'طريقة التحويل إلى المفرد للتمييز المؤكد بين اسم الإشارة (ces) وصفة الملكية (ses)',
			examples: [
				{
					problemAr: 'أكمل بـ (c’est / s’est) و (ce / se): « ...... monument ...... trouve à Batna ; ...... un site qui ...... conservé durant des siècles. »',
					solutionAr: 'Ce monument se trouve à Batna ; c’est un site qui s’est conservé durant des siècles.'
				},
				{
					problemAr: 'أكمل بـ (peu / peut) و (ces / ses): « On ...... visiter Tlemcen en ...... de jours et découvrir ...... mosquées historiques. »',
					solutionAr: 'On peut visiter Tlemcen en peu de jours et découvrir ses mosquées historiques.'
				}
			],
			watchOutAr:
				'انتبه لـ (ce) قبل (qui / que): نكتب دائماً (ce qui m’impressionne / ce que j’admire) بحرف c وليس s!'
		},
		practice: [
			{
				questionAr: 'أكمل الجملة بالاختيار الصحيح: « La Kalâa des Béni Hammad ...... situe dans la wilaya de M’Sila ; ...... un joyau historique. »',
				options: ['ce / s’est', 'se / c’est', 'ce / c’est', 'se / s’est'],
				correctIndex: 1,
				diagnosticFeedback: [
					'situe فعل ضميري يتطلب se، و un joyau يتطلب c’est.',
					'ممتاز! se قبل الفعل (se situe)، و c’est (= cela est) قبل الاسم (un joyau).',
					'قبل الفعل situe نكتب se وليس ce.',
					'قبل الاسم un joyau نكتب c’est وليس s’est.'
				],
				explanationAr: 'الفعل الضميري يأخذ se (se situe)، والتعريف يأخذ c’est (= cela est).'
			},
			{
				questionAr: 'أكمل الجملة: « Cheikh El-Ibrahimi ...... consacré à l’enseignement ; ...... articles restent célèbres. »',
				options: ['c’est / ces', 's’est / ses', 'c’est / ses', 's’est / ces'],
				correctIndex: 1,
				diagnosticFeedback: [
					'consacré اسم مفعول لفعل ضميري (se consacrer) فيأخذ s’est.',
					'أحسنت! s’est consacré (فعل ضميري) + ses articles (مقالاته هو — ملكية).',
					'نحتاج s’est مع الفعل الضميري.',
					'المقالات تعود ملكيتها للشيخ الإبراهيمي فنستعمل ses.'
				],
				explanationAr: 'الفعل se consacrer في الماضي المركب يعطي s’est consacré، ومقالاته تأخذ صفة الملكية ses.'
			},
			{
				questionAr: 'اختر الإكمال الصحيح بـ (peu / peut): « Le touriste ...... admirer la Vallée du M’Zab en ...... de temps. »',
				options: ['peu / peut', 'peut / peu', 'peux / peu', 'peut / peux'],
				correctIndex: 1,
				diagnosticFeedback: [
					'عكست موقع الفعل والظرف.',
					'ممتاز! peut (= pouvait) فعل مع الفاعل المفرد، و peu ظرف كمية.',
					'مع الفاعل المفرد Le touriste (il) نكتب peut بـ t وليس x.',
					'بعد حرف الجر en نحتاج الظرف peu.'
				],
				explanationAr: 'الفعل pouvoir مع il هو peut، والظرف الدال على القلة هو peu.'
			},
			{
				questionAr: 'أكمل الجملة: « ...... savant algérien ...... rappelle parfaitement ...... années d’études. »',
				options: ['Se / ce / ces', 'Ce / se / ses', 'Ce / se / ces', 'Se / se / ses'],
				correctIndex: 1,
				diagnosticFeedback: [
					'قبل الاسم savant نكتب Ce، وقبل الفعل rappelle نكتب se.',
					'ممتاز! Ce savant (اسم إشارة) + se rappelle (فعل ضميري) + ses années (سنواته هو).',
					'سنوات دراسته تخصه هو فتأخذ صفة الملكية ses.',
					'قبل الاسم savant نكتب Ce وليس Se.'
				],
				explanationAr: 'Ce قبل الاسم، se قبل الفعل الضميري، و ses للملكية في الجمع.'
			},
			{
				questionAr: 'أيّ جملة خالية تماماً من الأخطاء الإملائية في المتجانسات؟',
				options: [
					'S’est ce que nous aimons dans se patrimoine.',
					'C’est ce que nous aimons dans ce patrimoine.',
					'C’est se que nous aimons dans ce patrimoine.',
					'S’est ce que nous aimons dans ce patrimoine.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'توجد أخطاء في S’est و se patrimoine.',
					'ممتاز! C’est (= Cela est) + ce que + ce patrimoine (قبل اسم).',
					'نكتب ce que وليس se que.',
					'نكتب C’est في البداية وليس S’est.'
				],
				explanationAr: 'الكتابة السليمة هي: C’est ce que nous aimons dans ce patrimoine.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 5. Rédiger une notice biographique ou valoriser un site algérien
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_3am_t3_rediger_biographie_patrimoine',
		slug: 'fre-3am-t3-rediger-biographie-patrimoine',
		grade: '3am',
		yearSubjectId: 635,
		trimesterId: 't3',
		sequenceId: 'proj3',
		sequenceTitleAr: 'المشروع الثالث: السيرة وتثمين التراث (Biographie de savants et valorisation du patrimoine)',
		order: 5,
		titleAr: 'منهجية كتابة نبذة بيوغرافية أو نص يثمن معلماً جزائرياً (Notice biographique / Patrimoine)',
		objectives: [
			'كتابة نبذة بيوغرافية منظمة عن عالم مسلم أو أديب جزائري انطلاقاً من بطاقة معطيات (Al-Khwarizmi, Ibn Khaldoun, Cheikh El-Ibrahimi)',
			'كتابة فقرة وصفية تثمينية لمعلم جزائري (جامع الجزائر، تيمقاد، وادي ميزاب، تلمسان) بتوظيف توسيعات الاسم والمعجم التثميني'
		],
		keywordsAr: ['notice biographique', 'valoriser le patrimoine', 'expansions du nom', 'production écrite', 'Algérie'],
		discover: {
			scenarioAr:
				'في اختبار الفصل الثالث 3AM، يُطلب منك إما كتابة نبذة عن عالم (مثل الخوارزمي أو ابن خلدون أو الشيخ الإبراهيمي) أو وصف معلم جزائري لتعريف السياح به (مثل جامع الجزائر أو قلعة بني حماد). ما الخطة التي تضمن لك 7/7 في كلتا الحالتين؟',
			svg: svgFrenchWritingBlueprint({
				title: 'Deux plans gagnants pour le Trimestre 3 (3AM)',
				steps: [
					{ stage: '1. Présentation', detail: 'Nom + lieu/date (biographie) OU nom + localisation (patrimoine).' },
					{ stage: '2. Portrait / Aspects', detail: 'Imparfait + qualités morales OU Présent + expansions du nom.' },
					{ stage: '3. Richesse lexicale', detail: 'Au moins 3 mots mélioratifs (joyau, célèbre, remarquable) + 1 PSR.' },
					{ stage: '4. Clôture fière', detail: 'Rappeler la valeur universelle et inviter à préserver ce legs.' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الفرق الأساسي في زمن الأفعال بين النبذة البيوغرافية لعالم راحل وبين وصف معلم قائم اليوم؟',
					hintAr: 'العالم عاش في الماضي، أما المعلم فما زال شامخاً اليوم.',
					expectedInput: 'النبذة البيوغرافية بالماضي (Passé simple/composé + Imparfait)، ووصف المعلم بالحاضر الوصفي',
					revealAr: 'ممتاز! غير أننا نستعمل الماضي المركّب أو المبني للمجهول عند ذكر سنة بناء المعلم (a été construit en 1082).'
				},
				{
					promptAr: 'كيف نُدخل ثلاثة أنواع من توسيع الاسم في جملة واحدة تصف معلماً جزائرياً؟',
					hintAr: 'استعمل صفة + مضاف إليه + جملة صلة (qui).',
					expectedInput: 'La Grande Mosquée de Tlemcen est un monument historique qui témoigne de l’art islamique.',
					revealAr: 'رائع! في جملة واحدة جمعت (Grande / historique = نعت)، (de Tlemcen = مضاف إليه)، و (qui témoigne... = جملة صلة).'
				},
				{
					promptAr: 'ما المراجعة الإملائية الأخيرة التي تقوم بها قبل تسليم ورقة الامتحان؟',
					hintAr: 'تذكّر درس المتجانسات الصوتية والصفات.',
					expectedInput: 'مراجعة ce/se، c’est/s’est، ces/ses، وتوافق الصفات والأفعال',
					revealAr: 'مراجعة سريعة لمدة دقيقتين تنقذك من الأخطاء المتكررة وتحفظ لك نقطة اللغة والإملاء كاملة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'لنبذة بيوغرافية ناجحة (8 إلى 12 سطراً): 1) عنوان يحمل اسم العالم وصفته (Ibn Khaldoun, un génie universel)، 2) الميلاد والنشأة والوصف المعنوي، 3) أهم المؤلفات والمنجزات العلمية، 4) الوفاة وأثره الخالد اليوم.',
				'لوصف وتثمين معلم جزائري (8 إلى 12 سطراً): 1) عنوان تثميني (La Vallée du M’Zab, joyau du Sahara)، 2) الموقع الجغرافي والتاريخ، 3) وصف المعلم بتوسيعات الاسم والمعجم التثميني، 4) دعوة لزيارته والمحافظة عليه.',
				'معالم جزائرية غنية للوصف: Djamaâ El-Djazaïr (Alger, 2020, minaret de 265 m)، La Casbah d’Alger (UNESCO 1992)، Timgad (Batna)، La Kalâa des Béni Hammad (M’Sila, 1007)، Les Ponts de Constantine، Le Jardin d’Essai du Hamma (Alger).',
				'قاعدة الـ 7/7: احترم جميع عناصر البطاقة المعطاة، اكتب فقرات واضحة بعلامات ترقيم سليمة، وظّف بدائل لغوية وتوسيعات للاسم ومعجماً تثمينياً.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Checklist de relecture avant de rendre sa copie (3AM)',
				rootLabel: 'Assurer les 7 points de la Production Écrite',
				rootSub: 'Pertinence + Cohérence + Correction linguistique + Présentation',
				branches: [
					{
						label: 'Contenu & Plan',
						rule: 'Titre + 3 paragraphes',
						example: 'Toutes les notes utilisées',
						color: '#1d4ed8'
					},
					{
						label: 'Langue 3AM T3',
						rule: 'Expansions + Mélioratif',
						example: 'adjectif + CDN + relative',
						color: '#047857'
					},
					{
						label: 'Orthographe',
						rule: 'Homophones et accords',
						example: 'ce/se, c’est/s’est, accords',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'شبكة المراجعة الذاتية لتحصيل العلامة الكاملة في الوضعية الإدماجية للفصل الثالث',
			examples: [
				{
					problemAr: 'اكتب جملتين لتقديم العالم المسلم الخوارزمي (Al-Khwarizmi).',
					solutionAr: 'Al-Khwarizmi fut un illustre mathématicien musulman du IXe siècle. Savant rigoureux et brillant, il fonda l’algèbre et légua à l’humanité des travaux qui marquèrent l’histoire des sciences.'
				},
				{
					problemAr: 'اكتب جملة ختامية تدعو للحفاظ على التراث الجزائري.',
					solutionAr: 'Ce patrimoine exceptionnel fait notre fierté : nous devons tous le protéger et le transmettre aux générations futures.'
				}
			],
			watchOutAr:
				'تجنّب كتابة نص بلا عنوان وبلا تقسيم إلى فقرات، وتجنّب تكرار الفعل (être) في كل جملة؛ نوّع بأفعال وصفية راقية مثل: (se situer, surplomber, abriter, offrir, témoigner de, fasciner).'
		},
		practice: [
			{
				questionAr: 'ما الفعل الوصفي الأدق لتحديد موقع معلم جزائري بدل تكرار (est)؟',
				options: ['se situe', 'mange', 'court', 'dort'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! se situe / se trouve يحدّدان الموقع بأسلوب جغرافي سليم.',
					'لا يصح للمعالم.',
					'لا يصح للمعالم.',
					'لا يصح للمعالم.'
				],
				explanationAr: 'الفعل (se situer) مثالي لتحديد الموقع الجغرافي للمعالم الجزائرية.'
			},
			{
				questionAr: 'أيّ جملة تحتوي على جملة صلة (PSR) ومعجم تثميني معاً؟',
				options: [
					'Djamaâ El-Djazaïr est à Alger.',
					'Djamaâ El-Djazaïr est un chef-d’œuvre qui fascine les visiteurs par son minaret élancé.',
					'Djamaâ El-Djazaïr a des murs blancs.',
					'Nous irons demain à Alger.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا توجد جملة صلة ولا كلمة تثمينية.',
					'أحسنت! chef-d’œuvre و fascine و élancé (معجم تثميني) + qui fascine... (جملة صلة).',
					'لا توجد جملة صلة ولا تثمين بارز.',
					'جملة عادية بدون وصف للمعلم.'
				],
				explanationAr: 'تجمع الجملة الثانية بين المعجم التثميني (chef-d’œuvre, fascine) وجملة الصلة (qui...).'
			},
			{
				questionAr: 'ما الاسم الذي اشتهر به العالم المسلم الزهراوي (Al-Zahrawi) في تاريخ العلوم؟',
				options: [
					'رائد الجراحة الحديثة والطب (pionnier de la chirurgie moderne)',
					'مكتشف القطب الجنوبي',
					'باني جسور قسنطينة',
					'شاعر النشيد الوطني'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! أبو القاسم الزهراوي هو أبو الجراحة ومؤلف كتاب التصريف.',
					'معلومة غير صحيحة.',
					'معلومة غير صحيحة.',
					'شاعر النشيد الوطني هو مفدي زكريا.'
				],
				explanationAr: 'اشتهر الطبيب المسلم الأندلسي الزهراوي بتطوير أدوات الجراحة وتأليف موسوعة التصريف.'
			},
			{
				questionAr: 'أيّ بداية تناسب نبذة بيوغرافية عن الشاعر محمد العيد آل خليفة؟',
				options: [
					'Hier, j’ai visité un jardin.',
					'Né en 1904 à Aïn El-Beïda, Mohamed El-Aïd Al-Khalifa fut l’un des plus grands poètes algériens.',
					'Mettez de l’eau dans le bol.',
					'Le vent souffle fort aujourd’hui.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذا مطلع قصة شخصية بضمير المتكلم.',
					'ممتاز! يبدأ بتاريخ ومكان الميلاد وتعريف الشخصية بضمير الغائب.',
					'هذه تعليمة وصفة.',
					'هذا وصف للطقس.'
				],
				explanationAr: 'النبذة البيوغرافية تبدأ بالتعريف بالشخصية وميلادها ومكانتها بضمير الغائب.'
			},
			{
				questionAr: 'ما الجملة الإملائية السليمة لإغلاق نص عن التراث الجزائري؟',
				options: [
					'Se patrimoine s’est une richesse que nous devons protéger.',
					'Ce patrimoine est une richesse précieuse que nous devons tous préserver.',
					'Ces patrimoine sont une richesse.',
					'Ce patrimoine peut beaucoup de visiteurs.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'أخطاء في Se و s’est.',
					'أحسنت! Ce قبل الاسم + صفة تثمينية précieuse + جملة صلة que nous devons préserver.',
					'Ces للجمع و patrimoine مفرد.',
					'peut يحتاج مصدراً بعده.'
				],
				explanationAr: 'الجملة الثانية سليمة إملائياً ونحوياً ومعبرة لتختم نصاً يثمن التراث.'
			}
		]
	}
];
