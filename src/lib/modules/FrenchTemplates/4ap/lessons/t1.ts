import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchPrimaryCards,
	svgFrenchTenseTimeline
} from '../../svg-french';

// ═══════════════════════════════════════════════════════════════════════════════
// SVGs — 4AP Trimestre 1 (Projet 1 : C'est notre quartier !)
// ═══════════════════════════════════════════════════════════════════════════════

const svgQuartierDiscover = svgFrenchPrimaryCards({
	title: 'Les lieux de notre quartier — مرافق حينا',
	subtitle: 'Situer sa maison dans le quartier (4AP)',
	cards: [
		{ word: 'la mosquée', arabic: 'المسجد', color: '#059669' },
		{ word: "l'école", arabic: 'المدرسة', color: '#2563eb' },
		{ word: 'la bibliothèque', arabic: 'المكتبة', color: '#7c3aed' },
		{ word: 'la boulangerie', arabic: 'المخبزة', color: '#d97706' }
	],
	width: 520,
	height: 185
});

const svgQuartierSummary = svgFrenchGrammarMap({
	title: 'Situer un lieu dans le quartier — تحديد موقع مكان في الحي',
	rootLabel: 'Où est ta maison ?',
	rootSub: 'Les indicateurs de lieu',
	branches: [
		{
			label: 'À côté / Près de',
			rule: 'Lieu proche (قريب من)',
			example: "près de l'école",
			color: '#1d4ed8'
		},
		{
			label: 'En face de',
			rule: 'De l’autre côté (مقابل)',
			example: 'en face de la mosquée',
			color: '#047857'
		},
		{
			label: 'Loin de / Entre',
			rule: 'Distance ou milieu',
			example: 'entre le jardin et la poste',
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

const svgTypesPhrasesDiscover = svgFrenchPrimaryCards({
	title: 'Déclarative ou Interrogative ? — الجملة الخبرية والاستفهامية',
	subtitle: 'Observe la ponctuation à la fin de chaque phrase',
	cards: [
		{ word: 'Déclarative (.)', arabic: 'تُخبر بمعلومة', color: '#2563eb' },
		{ word: 'Interrogative (?)', arabic: 'تطرح سؤالاً', color: '#059669' },
		{ word: 'Est-ce que... ?', arabic: 'هل...؟', color: '#d97706' }
	],
	width: 520,
	height: 185
});

const svgTypesPhrasesSummary = svgFrenchGrammarMap({
	title: 'La phrase déclarative et la phrase interrogative',
	rootLabel: 'Les deux types de phrases (4AP)',
	rootSub: 'Sens + Signe de ponctuation',
	branches: [
		{
			label: 'Déclarative (.)',
			rule: 'Donne une information',
			example: "J'habite près du jardin.",
			color: '#1d4ed8'
		},
		{
			label: 'Interrogative (?)',
			rule: 'Pose une question',
			example: 'Où habites-tu ?',
			color: '#047857'
		},
		{
			label: 'Avec Est-ce que',
			rule: 'Est-ce que + phrase + ?',
			example: 'Est-ce que tu lis ?',
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

const svgPronomsVerbesDiscover = svgFrenchTenseTimeline({
	title: 'Le présent des verbes du 1er groupe (-er)',
	tenseName: 'Présent',
	formula: 'Radical + (-e, -es, -e, -ons, -ez, -ent)',
	activeZone: 'present',
	example: "Aujourd'hui, nous habitons dans un quartier calme.",
	markers: "aujourd'hui, maintenant, chaque jour",
	width: 520,
	height: 215
});

const svgPronomsVerbesSummary = svgFrenchConjugationChart({
	title: 'Pronoms sujets + Verbe HABITER au présent',
	subtitle: 'On enlève -er et on ajoute les terminaisons du présent',
	columns: [
		{
			header: 'Singulier',
			rule: "j'habite / tu habites",
			examples: 'il / elle habite',
			color: '#1d4ed8'
		},
		{
			header: 'Pluriel',
			rule: 'nous habitons / vous habitez',
			examples: 'ils / elles habitent',
			color: '#047857'
		},
		{
			header: 'Substituts',
			rule: 'Amine -> il | Sara -> elle',
			examples: 'Les voisins -> ils',
			color: '#b45309'
		}
	],
	width: 520,
	height: 210
});

const svgNomsPonctDiscover = svgFrenchPrimaryCards({
	title: 'Nom propre ou Nom commun ? — اسم العلم واسم الجنس',
	subtitle: 'Le nom propre prend toujours une MAJUSCULE !',
	cards: [
		{ word: 'Amine / Alger', arabic: 'Nom propre (علم)', color: '#1d4ed8' },
		{ word: 'un quartier', arabic: 'Nom commun (مشترك)', color: '#047857' },
		{ word: 'la mosquée', arabic: 'Nom commun (مشترك)', color: '#d97706' },
		{ word: '.  ?  !  ,', arabic: 'La ponctuation', color: '#7c3aed' }
	],
	width: 520,
	height: 185
});

const svgNomsPonctSummary = svgFrenchConjugationChart({
	title: 'Noms propres, noms communs et ponctuation',
	subtitle: 'Deux règles simples pour bien écrire en 4AP',
	columns: [
		{
			header: 'Nom propre',
			rule: 'Personne, ville, pays (Majuscule)',
			examples: 'Youssef, Oran, Algérie',
			color: '#1d4ed8'
		},
		{
			header: 'Nom commun',
			rule: 'Précédé de un, une, le, la...',
			examples: 'une école, le jardin',
			color: '#047857'
		},
		{
			header: 'Ponctuation',
			rule: '. (fin) | ? (question) | ! (joie)',
			examples: ', (petite pause)',
			color: '#b45309'
		}
	],
	width: 520,
	height: 210
});

// ═══════════════════════════════════════════════════════════════════════════════
// LESSONS_4AP_T1 (4 Lessons — yearSubjectId: 599)
// ═══════════════════════════════════════════════════════════════════════════════

export const LESSONS_4AP_T1: FrenchInteractiveLessonData[] = [
	{
		id: 'fre_lesson_4ap_t1_quartier',
		slug: 'fre-4ap-t1-quartier',
		grade: '4ap',
		yearSubjectId: 599,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: "المشروع الأول: هذا حيّنا! (Projet 1 : C'est notre quartier !)",
		order: 1,
		titleAr: 'تحديد موقع المنزل ومرافق الحي (Situer sa maison et les lieux du quartier)',
		objectives: [
			'حفظ أسماء أهم مرافق الحي بالفرنسية (la mosquée, l’école, la bibliothèque, la boulangerie, le jardin, la poste)',
			'توظيف مؤشرات المكان لتحديد موقع المنزل بدقة (près de, loin de, en face de, à côté de, entre)',
			'وصف طريق المدرسة أو موقع البيت بجمل قصيرة ومفيدة'
		],
		keywordsAr: ['Le quartier', 'la mosquée', 'la bibliothèque', 'la boulangerie', 'en face de', 'à côté de'],
		discover: {
			scenarioAr:
				'انتقل كريم حديثاً إلى حيّ هادئ في قسنطينة. سأله زميله بلال عن موقع منزله الجديد، فأجابه كريم: «Ma maison est en face de la mosquée et à côté de la boulangerie, tout près de l’école !».',
			svg: svgQuartierDiscover,
			steps: [
				{
					promptAr: 'ما اسم «المسجد» و«المكتبة» و«المخبزة» باللغة الفرنسية؟',
					hintAr: 'المسجد: la mosquée، المكتبة: la bibliothèque، المخبزة: la boulangerie.',
					expectedInput: 'la mosquée, la bibliothèque, la boulangerie',
					revealAr: 'مرافق الحي الأساسية: la mosquée (المسجد)، l’école (المدرسة)، la bibliothèque (المكتبة)، la boulangerie (المخبزة)، le jardin public (الحديقة العمومية).'
				},
				{
					promptAr: 'ما العبارة التي استعملها كريم ليقول «مقابل المسجد»؟',
					hintAr: 'عبارة من ثلاث كلمات تبدأ بـ en face...',
					expectedInput: 'en face de',
					revealAr: 'استعمل كريم «en face de» (مقابل)، و«à côté de» (بجانب)، و«près de» (قريب من).'
				},
				{
					promptAr: 'ما ضدّ عبارة «près de» (قريب من) بالفرنسية؟',
					hintAr: 'بعيد عن: loin de.',
					expectedInput: 'loin de',
					revealAr: 'ضدّ «près de» هو «loin de» (بعيد عن)، مثل: «La gare est loin de ma maison.».'
				}
			]
		},
		summary: {
			rulesAr: [
				'مرافق الحي (les lieux du quartier): la mosquée (المسجد)، l’école (المدرسة)، la bibliothèque (المكتبة)، la boulangerie (المخبزة)، le jardin (الحديقة)، la pharmacie (الصيدلية)، la poste (البريد).',
				'مؤشرات المكان (les indicateurs de lieu): près de (قريب من)، loin de (بعيد عن)، en face de (مقابل)، à côté de (بجانب)، entre... et... (بين... و...).',
				'انتبه للدمج مع المذكر: de + le تصبح «du» (près du jardin، en face du stade)، أما مع المؤنث فتبقى «de la» (près de la mosquée) ومع الحرف المتحرك «de l’» (en face de l’école).',
				'مثال كامل: «J’habite dans un quartier propre. Ma maison se trouve à côté de la bibliothèque et près du jardin.».'
			],
			visualSvg: svgQuartierSummary,
			visualCaptionAr: 'مؤشرات المكان الأساسية لتحديد موقع المنزل والمرافق في الحي',
			examples: [
				{
					problemAr: 'أكمل بـ (du / de la / de l’) : Ma maison est près ...... école et en face ...... jardin.',
					solutionAr: 'Ma maison est près de l’école et en face du jardin.'
				},
				{
					problemAr: 'اذكر أين نشتري الخبز وأين نستعير الكتب في الحي بالفرنسية.',
					solutionAr: 'On achète le pain à la boulangerie. On emprunte des livres à la bibliothèque.'
				}
			],
			watchOutAr:
				'لا تكتب أبداً «près de le jardin»! بل ادمج de + le لتصبح «du»: «près du jardin» و«à côté du marché»!'
		},
		practice: [
			{
				questionAr: 'في أيّ مكان في الحي نشتري الخبز الساخن (le pain)؟',
				options: ['à la bibliothèque', 'à la boulangerie', 'au jardin', 'à la poste'],
				correctIndex: 1,
				diagnosticFeedback: [
					'في المكتبة (la bibliothèque) نقرأ ونستعير الكتب.',
					'أحسنت! نشتري الخبز من المخبزة (la boulangerie).',
					'الحديقة (le jardin) مكان للراحة والمشي.',
					'البريد (la poste) لإرسال الرسائل والطرود.'
				],
				explanationAr: 'المخبزة بالفرنسية هي «la boulangerie».'
			},
			{
				questionAr: 'ما معنى عبارة «en face de la mosquée» باللغة العربية؟',
				options: ['بعيداً عن المسجد', 'مقابل المسجد', 'خلف المسجد', 'داخل المسجد'],
				correctIndex: 1,
				diagnosticFeedback: [
					'بعيداً عن هي loin de.',
					'ممتاز! en face de تعني مقابل.',
					'خلف هي derrière.',
					'داخل هي dans.'
				],
				explanationAr: 'العبارة «en face de» تعني مقابل.'
			},
			{
				questionAr: 'أكمل الجملة بالأداة الصحيحة: «Mon école est près ...... jardin public.»',
				options: ['de la', 'de le', 'du', "de l'"],
				correctIndex: 2,
				diagnosticFeedback: [
					'jardin اسم مذكر وليس مؤنثاً.',
					'في الفرنسية ندمج de + le لتصبح du.',
					'رائع! لأن jardin مذكر مفرد (le jardin)، نقول: près du jardin.',
					'jardin تبدأ بحرف ساكن (j) وليس متحركاً.'
				],
				explanationAr: 'القاعدة: de + le = du -> près du jardin.'
			},
			{
				questionAr: 'ما ضدّ مؤشر المكان «près de» (قريب من)؟',
				options: ['à côté de', 'loin de', 'en face de', 'entre'],
				correctIndex: 1,
				diagnosticFeedback: [
					'à côté de تعني بجانب (وهي تدل على القرب).',
					'أحسنت! ضدّ près de (قريب من) هو loin de (بعيد عن).',
					'en face de تعني مقابل.',
					'entre تعني بين.'
				],
				explanationAr: 'près de (قريب من) عكسها loin de (بعيد عن).'
			},
			{
				questionAr: 'أين يذهب التلاميذ في الحي لقراءة القصص المفيدة واستعارة الكتب؟',
				options: ['à la boulangerie', 'à la pharmacie', 'à la bibliothèque', 'au marché'],
				correctIndex: 2,
				diagnosticFeedback: [
					'المخبزة لشراء الخبز.',
					'الصيدلية لشراء الدواء.',
					'ممتاز! المكتبة (la bibliothèque) مخصصة للقراءة والكتب.',
					'السوق لشراء الخضر والفواكه.'
				],
				explanationAr: 'المكتبة بالفرنسية هي «la bibliothèque».'
			}
		]
	},
	{
		id: 'fre_lesson_4ap_t1_types_phrases',
		slug: 'fre-4ap-t1-types-phrases',
		grade: '4ap',
		yearSubjectId: 599,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: "المشروع الأول: هذا حيّنا! (Projet 1 : C'est notre quartier !)",
		order: 2,
		titleAr: 'الجملة الخبرية والجملة الاستفهامية (La phrase déclarative et la phrase interrogative)',
		objectives: [
			'التمييز الدقيق بين الجملة الخبرية (déclarative) التي تنتهي بنقطة (.) والاستفهامية (interrogative) التي تنتهي بعلامة استفهام (?)',
			'تحويل جملة خبرية إلى جملة استفهامية بطريقتين سهلتين (بإضافة Est-ce que أو بتغيير النبرة وعلامة الاستفهام)',
			'استعمال أدوات الاستفهام البسيطة (Où ? Comment ? Qui ?)'
		],
		keywordsAr: ['Phrase déclarative', 'Phrase interrogative', 'Point (.)', 'Point d’interrogation (?)', 'Est-ce que'],
		discover: {
			scenarioAr:
				'في حوار بين آية وصديقتها الجديدة، لاحظت آية نوعين من الجمل:\n— «Où habites-tu ?»\n— «J’habite près de la bibliothèque.»\nسألت نفسها: ما الفرق بين الجملة الأولى والثانية؟',
			svg: svgTypesPhrasesDiscover,
			steps: [
				{
					promptAr: 'أيّ جملة تطرح سؤالاً؟ وبأيّ علامة ترقيم تنتهي؟',
					hintAr: 'انظر إلى علامة الاستفهام (?).',
					expectedInput: 'Où habites-tu ?',
					revealAr: 'الجملة «Où habites-tu ?» تطرح سؤالاً وتنتهي بعلامة استفهام (?)؛ نسميها جملة استفهامية (une phrase interrogative).'
				},
				{
					promptAr: 'ماذا نسمّي الجملة «J’habite près de la bibliothèque.» التي تعطي معلومة وتنتهي بنقطة (.)؟',
					hintAr: 'تُسمّى بالفرنسية une phrase déclarative.',
					expectedInput: 'phrase déclarative',
					revealAr: 'الجملة التي تخبرنا بمعلومة وتنتهي بنقطة (.) تُسمّى جملة خبرية (une phrase déclarative).'
				},
				{
					promptAr: 'حوّل الجملة «Tu habites dans ce quartier.» إلى جملة استفهامية بإضافة «Est-ce que» في البداية.',
					hintAr: 'نكتب Est-ce que + tu habites dans ce quartier + ?',
					expectedInput: 'Est-ce que tu habites dans ce quartier ?',
					revealAr: 'نحصل على: «Est-ce que tu habites dans ce quartier ?» (ولا ننسى وضع علامة الاستفهام ? في النهاية!).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الجملة الخبرية (la phrase déclarative): تعطي معلومة أو تصف شيئاً، وتبدأ بحرف كبير وتنتهي بنقطة ( . ) مثل: «Notre quartier est propre.».',
				'الجملة الاستفهامية (la phrase interrogative): تطرح سؤالاً، وتبدأ بحرف كبير وتنتهي بعلامة استفهام ( ? ) مثل: «Où est la mosquée ?».',
				'لتحويل جملة خبرية إلى استفهامية، أسهل طريقتين هما: 1) وضع «Est-ce que» في البداية + علامة (?) مثل: «Est-ce que tu aimes ton quartier ?». 2) استبدال النقطة بعلامة (?) مع رفع الصوت: «Tu aimes ton quartier ?».',
				'أدوات استفهام مفيدة: Où (أين؟ للمكان) — Qui (مَن؟ للشخص) — Quand (متى؟ للزمان) — Comment (كيف؟).'
			],
			visualSvg: svgTypesPhrasesSummary,
			visualCaptionAr: 'الفرق بين الجملة الخبرية (.) والجملة الاستفهامية (?) وطريقة التحويل بـ Est-ce que',
			examples: [
				{
					problemAr: 'حدّد نوع كل جملة (déclarative / interrogative) :\n1) La boulangerie est ouverte.\n2) Est-ce que tu vas à la bibliothèque ?',
					solutionAr: '1) Phrase déclarative (تنتهي بنقطة وتخبر بمعلومة).\n2) Phrase interrogative (تنتهي بـ ? وتطرح سؤالاً).'
				},
				{
					problemAr: 'حوّل إلى جملة استفهامية باستعمال «Est-ce que» : «Amine aime son école.»',
					solutionAr: 'Est-ce qu’Amine aime son école ?'
				}
			],
			watchOutAr:
				'انتبه! أمام حرف متحرك مثل (il, elle, Amine)، تتحول «Est-ce que» إلى «Est-ce qu’» مثل: «Est-ce qu’il habite à Alger ?»!'
		},
		practice: [
			{
				questionAr: 'ما نوع الجملة: «La mosquée est près de ma maison.»؟',
				options: ['Phrase interrogative', 'Phrase déclarative', 'Phrase impérative', 'ليست جملة'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الجملة الاستفهامية تطرح سؤالاً وتنتهي بعلامة ?.',
					'أحسنت! هذه جملة خبرية (déclarative) تعطي معلومة وتنتهي بنقطة.',
					'ليست جملة أمرية.',
					'هي جملة كاملة تبدأ بحرف كبير وتنتهي بنقطة.'
				],
				explanationAr: 'الجملة الخبرية (déclarative) تخبرنا بمعلومة وتنتهي بنقطة (.).'
			},
			{
				questionAr: 'بأيّ علامة ترقيم تنتهي الجملة الاستفهامية (la phrase interrogative) دائماً؟',
				options: ['النقطة ( . )', 'علامة الاستفهام ( ? )', 'الفاصلة ( , )', 'النقطتان ( : )'],
				correctIndex: 1,
				diagnosticFeedback: [
					'النقطة لختم الجملة الخبرية.',
					'ممتاز! الجملة الاستفهامية تنتهي دائماً بعلامة استفهام (?).',
					'الفاصلة للتوقف القصير داخل الجملة.',
					'النقطتان للشرح أو بداية القول.'
				],
				explanationAr: 'كل جملة استفهامية تنتهي بعلامة الاستفهام (?).'
			},
			{
				questionAr: 'اختر التحويل الصحيح للجملة «Tu habites près du jardin.» إلى جملة استفهامية بـ «Est-ce que»:',
				options: [
					'Est-ce que tu habites près du jardin.',
					'Est-ce que tu habites près du jardin ?',
					'Tu est-ce que habites près du jardin ?',
					'Est-ce que habites tu près du jardin ?'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'نسيت علامة الاستفهام (?) في النهاية!',
					'رائع! نضع Est-ce que في الأول ونختم بعلامة الاستفهام (?).',
					'Est-ce que تأتي في بداية الجملة قبل الفاعل.',
					'مع Est-ce que نحافظ على الترتيب الطبيعي: tu habites.'
				],
				explanationAr: 'الصيغة الصحيحة: Est-ce que + الفاعل + الفعل + التكملة + ?'
			},
			{
				questionAr: 'ما أداة الاستفهام المناسبة للسؤال عن المكان في الجملة: «...... se trouve la bibliothèque ?»',
				options: ['Qui', 'Où', 'Combien', 'Comment'],
				correctIndex: 1,
				diagnosticFeedback: [
					'Qui تسأل عن الشخص (مَن؟).',
					'أحسنت! أداة الاستفهام «Où» (أين؟) تسأل عن المكان.',
					'Combien تسأل عن العدد أو الكمية.',
					'Comment تسأل عن الكيفية أو الحال.'
				],
				explanationAr: 'للسؤال عن المكان نستعمل دائماً أداة الاستفهام «Où».'
			},
			{
				questionAr: 'كيف نكتب «Est-ce que» أمام اسم «Amine» (يبدأ بحرف متحرك)؟',
				options: [
					'Est-ce que Amine lit un livre ?',
					"Est-ce qu'Amine lit un livre ?",
					'Est-ce qui Amine lit un livre ?',
					'Est-ce que Amine lit un livre.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'نحذف e من que قبل الحرف المتحرك A ونضع فاصلة عليا.',
					"ممتاز! نكتب «Est-ce qu'Amine lit un livre ?».",
					'لا نكتب qui هنا بل qu’.',
					'ينقصها حذف e وعلامة الاستفهام.'
				],
				explanationAr: "أمام حرف متحرك تصبح «Est-ce que» -> «Est-ce qu'»."
			}
		]
	},
	{
		id: 'fre_lesson_4ap_t1_pronoms_verbes1',
		slug: 'fre-4ap-t1-pronoms-verbes1',
		grade: '4ap',
		yearSubjectId: 599,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: "المشروع الأول: هذا حيّنا! (Projet 1 : C'est notre quartier !)",
		order: 3,
		titleAr: 'ضمائر الفاعل وتصريف أفعال الفوج الأول في الحاضر (Pronoms sujets et 1er groupe au présent)',
		objectives: [
			'معرفة ضمائر الفاعل الثمانية (je, tu, il, elle, nous, vous, ils, elles) وتعويض الاسم الفاعل بالضمير المناسب',
			'تصريف أفعال الفوج الأول (-er) في الحاضر بدقة (habiter, aimer, marcher, étudier, nettoyer)',
			'التمييز بين نهايات المفرد (-e, -es, -e) ونهايات الجمع (-ons, -ez, -ent)'
		],
		keywordsAr: ['Pronoms sujets', 'je / tu / il / elle', 'nous / vous / ils / elles', '1er groupe', 'habiter / aimer'],
		discover: {
			scenarioAr:
				'في مشروع القسم، كتب التلاميذ ثلاث جمل عن حيّهم:\n1) «Amine habite près de la mosquée.» -> «Il habite près de la mosquée.»\n2) «Sara et Meriem aiment leur quartier.» -> «Elles aiment leur quartier.»\n3) «Nous nettoyons notre cour.»',
			svg: svgPronomsVerbesDiscover,
			steps: [
				{
					promptAr: 'بأيّ ضمير عوّضنا الفاعل «Amine»؟ وبأيّ ضمير عوّضنا «Sara et Meriem»؟',
					hintAr: 'Amine مفرد مذكر، و Sara et Meriem جمع مؤنث.',
					expectedInput: 'Il / Elles',
					revealAr: 'نعوّض المفرد المذكر بـ «Il»، والمفرد المؤنث بـ «Elle»، والجمع المذكر (أو المختلط) بـ «Ils»، والجمع المؤنث بـ «Elles».'
				},
				{
					promptAr: 'ماذا أضفنا إلى جذر الفعل «nettoy-» مع الضمير «Nous»؟',
					hintAr: 'انظر إلى نهاية كلمة nettoyons.',
					expectedInput: 'ons',
					revealAr: 'مع الضمير «Nous» نضيف دائماً «-ons»، ومع «Vous» نضيف «-ez»، ومع «Ils / Elles» نضيف «-ent».'
				},
				{
					promptAr: 'صرّف الفعل «marcher» (مشى) في الحاضر مع الضمير «Vous».',
					hintAr: 'احذف -er وأضف نهاية vous (-ez).',
					expectedInput: 'vous marchez',
					revealAr: 'نحذف -er من marcher فيبقى الجذر march-، ونضيف -ez فنحصل على: «Vous marchez vers l’école.».'
				}
			]
		},
		summary: {
			rulesAr: [
				'ضمائر الفاعل (les pronoms personnels sujets): للمفرد (je, tu, il, elle) وللجمع (nous, vous, ils, elles).',
				'تعويض الاسم بالضمير: مفرد مذكر -> il (le voisin -> il) | مفرد مؤنث -> elle (la maison -> elle) | جمع مذكر أو مذكر+مؤنث -> ils (Amine et Sara -> ils) | جمع مؤنث -> elles (les filles -> elles).',
				'تصريف أفعال الفوج الأول (-er) في الحاضر: نحذف «-er» ونضيف النهايات الستة: je -e | tu -es | il/elle -e | nous -ons | vous -ez | ils/elles -ent.',
				'مثال (habiter): j’habite, tu habites, il/elle habite, nous habitons, vous habitez, ils/elles habitent.'
			],
			visualSvg: svgPronomsVerbesSummary,
			visualCaptionAr: 'ضمائر الفاعل وتصريف الفعل habiter في الحاضر مع قاعدة تعويض الأسماء',
			examples: [
				{
					problemAr: 'عوّض الفاعل المسطر بالضمير المناسب (Il / Elle / Ils / Elles) :\n1) La bibliothèque est calme.\n2) Les voisins nettoient la rue.',
					solutionAr: '1) Elle est calme.\n2) Ils nettoient la rue.'
				},
				{
					problemAr: 'صرّف الفعلين في الحاضر: Tu (habiter) ...... à Blida. — Nous (aimer) ...... notre quartier.',
					solutionAr: 'Tu habites à Blida. — Nous aimons notre quartier.'
				}
			],
			watchOutAr:
				'تذكّر! إذا اجتمع مذكر ومؤنث في الجمع مثل «Amine et Sara» فإننا نعوّضهما بالضمير «Ils» وليس «Elles»!'
		},
		practice: [
			{
				questionAr: 'بأيّ ضمير نعوّض الفاعل «Meriem et Lina»؟',
				options: ['Elle', 'Ils', 'Elles', 'Nous'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Elle للمفرد المؤنث (بنت واحدة فقط).',
					'Ils للجمع المذكر أو المختلط.',
					'أحسنت! Meriem et Lina جمع مؤنث فنستعمل «Elles».',
					'Nous تستعمل عندما أكون أنا معهم (moi).'
				],
				explanationAr: 'مريم ولينا اسمان مؤنثان في الجمع -> الضمير هو «Elles».'
			},
			{
				questionAr: 'بأيّ ضمير نعوّض الفاعل «Bilal et sa sœur»؟',
				options: ['Il', 'Elle', 'Ils', 'Elles'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الفاعل جمع (شخصان) وليس مفرداً.',
					'الفاعل جمع وليس مفرداً مؤنثاً.',
					'ممتاز! عند اجتماع مذكر (Bilal) ومؤنث (sa sœur) نستعمل الضمير «Ils».',
					'Elles تستعمل فقط عندما يكون الجميع مؤنثاً.'
				],
				explanationAr: 'في الفرنسية، الجمع المختلط (مذكر + مؤنث) يُعوّض بالضمير «Ils».'
			},
			{
				questionAr: 'صرّف الفعل (habiter) في الحاضر: «Vous ...... près de la mosquée.»',
				options: ['habite', 'habitons', 'habitez', 'habitent'],
				correctIndex: 2,
				diagnosticFeedback: [
					'habite للمفرد (je/il/elle).',
					'habitons للضمير nous.',
					'رائع! مع الضمير Vous نضيف النهاية «-ez»: vous habitez.',
					'habitent للضمير ils / elles.'
				],
				explanationAr: 'نهاية أفعال الفوج الأول مع الضمير vous هي دائماً «-ez».'
			},
			{
				questionAr: 'صرّف الفعل (étudier) في الحاضر: «Nous ...... le français à l’école.»',
				options: ['étudie', 'étudies', 'étudions', 'étudient'],
				correctIndex: 2,
				diagnosticFeedback: [
					'étudie للمفرد (je/il/elle).',
					'étudies للضمير tu.',
					'أحسنت! مع الضمير Nous نضيف «-ons»: nous étudions.',
					'étudient للضمير ils/elles.'
				],
				explanationAr: 'نهاية أفعال الفوج الأول مع الضمير nous هي دائماً «-ons».'
			},
			{
				questionAr: 'أكمل بالفعل (marcher) في الحاضر: «Les élèves ...... sur le trottoir.»',
				options: ['marche', 'marches', 'marchez', 'marchent'],
				correctIndex: 3,
				diagnosticFeedback: [
					'marche للمفرد فقط، والفاعل هنا جمع (Les élèves).',
					'marches تستعمل مع tu فقط.',
					'marchez تستعمل مع vous فقط.',
					'ممتاز! Les élèves = Ils -> «marchent» بالنهاية -ent.'
				],
				explanationAr: 'الفاعل «Les élèves» جمع (ils)، إذن نضع النهاية «-ent».'
			}
		]
	},
	{
		id: 'fre_lesson_4ap_t1_noms_ponctuation',
		slug: 'fre-4ap-t1-noms-ponctuation',
		grade: '4ap',
		yearSubjectId: 599,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: "المشروع الأول: هذا حيّنا! (Projet 1 : C'est notre quartier !)",
		order: 4,
		titleAr: 'اسم العلم واسم الجنس وعلامات الترقيم (Les noms propres, noms communs et ponctuation)',
		objectives: [
			'التمييز بين اسم العلم (le nom propre : يبدأ بحرف كبير دون أداة غالباً) واسم الجنس (le nom commun : يسبقه محدّد)',
			'استعمال علامات الترقيم الأساسية في موضعها الصحيح (النقطة . ، الاستفهام ? ، التعجب ! ، الفاصلة ,)',
			'تصحيح فقرة قصيرة بإضافة الحروف الكبيرة وعلامات الترقيم الناقصة'
		],
		keywordsAr: ['Nom propre', 'Nom commun', 'Majuscule', 'Ponctuation', '. ? ! ,'],
		discover: {
			scenarioAr:
				'قرأ عمر جملة عن وطنه وحيه: «Youssef habite à Tlemcen, dans un beau quartier : quelle belle ville !». لاحظ وجود أسماء تبدأ بحروف كبيرة وأسماء أخرى تسبقها أدوات (un, une) وعلامات ترقيم متنوعة.',
			svg: svgNomsPonctDiscover,
			steps: [
				{
					promptAr: 'في الجملة السابقة، ما اسما العلم (les noms propres)؟ ولماذا؟',
					hintAr: 'اسم شخص (Youssef) واسم مدينة (Tlemcen).',
					expectedInput: 'Youssef et Tlemcen',
					revealAr: '«Youssef» و«Tlemcen» اسما علم (noms propres)؛ الأول اسم شخص والثاني اسم مدينة، وكلاهما يبدأ بحرف كبير (majuscule).'
				},
				{
					promptAr: 'استخرج اسمي جنس (noms communs) من الجملة نفسها.',
					hintAr: 'اسمان يدلّان على مكان عام (quartier / ville).',
					expectedInput: 'quartier et ville',
					revealAr: '«quartier» و«ville» اسما جنس (noms communs) لأن كل مدينة تُسمى ville وكل حيّ يُسمى quartier وتسبقهما أدوات مثل un / une.'
				},
				{
					promptAr: 'ما دور علامة التعجب ( ! ) في نهاية «Quelle belle ville !» وما دور الفاصلة ( , )؟',
					hintAr: 'علامة ! للتعبير عن الدهشة أو الفرح، والفاصلة لتوقف قصير.',
					expectedInput: 'exclamation / pause',
					revealAr: 'علامة التعجب (!) تعبّر عن الدهشة أو الإعجاب أو الفرح، والفاصلة (,) تفيد توقفاً قصيراً بين عناصر الجملة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'اسم العلم (le nom propre): يدل على شخص معيّن (Amine, Khadidja) أو مدينة (Alger, Oran, Batna) أو بلد (Algérie)، ويبدأ دائماً بحرف كبير (majuscule).',
				'اسم الجنس (le nom commun): يدل على أي شخص أو حيوان أو مكان أو شيء بصفة عامة، ويسبقه غالباً محدّد (un, une, le, la, les) مثل: une école, le jardin, un voisin.',
				'علامات الترقيم في نهاية الجملة: النقطة ( . ) للجملة الخبرية، علامة الاستفهام ( ? ) للسؤال، وعلامة التعجب ( ! ) للإعجاب أو الفرح أو التحية (Bonjour !).',
				'الفاصلة ( , ): توضع داخل الجملة لتوقف قصير أو للفصل بين كلمات متتابعة مثل: «Dans mon quartier, il y a une mosquée, une école et un jardin.».'
			],
			visualSvg: svgNomsPonctSummary,
			visualCaptionAr: 'ملخص الفرق بين اسم العلم واسم الجنس مع وظيفة كل علامة ترقيم',
			examples: [
				{
					problemAr: 'صنّف الكلمات في جدول (Nom propre / Nom commun) : Oran — école — Fatima — boulangerie',
					solutionAr: 'Nom propre : Oran, Fatima.\nNom commun : école, boulangerie.'
				},
				{
					problemAr: 'ضع علامة الترقيم المناسبة (. / ? / !) :\n1) Où est la poste ......\n2) Quel beau jardin ......\n3) Mon école est grande ......',
					solutionAr: '1) Où est la poste ?\n2) Quel beau jardin !\n3) Mon école est grande.'
				}
			],
			watchOutAr:
				'انتبه! إذا جاء اسم الجنس في أول الجملة مثل «La mosquée est grande.» فحرفه الكبير هو فقط لأنه بداية الجملة، لكنه يبقى اسم جنس (nom commun) وليس اسم علم!'
		},
		practice: [
			{
				questionAr: 'أيّ كلمة من الكلمات الآتية هي «اسم علم» (nom propre)؟',
				options: ['un quartier', 'une rue', 'Constantine', 'la boulangerie'],
				correctIndex: 2,
				diagnosticFeedback: [
					'un quartier اسم جنس (nom commun) يسبقه محدّد.',
					'une rue اسم جنس (nom commun).',
					'أحسنت! Constantine اسم مدينة (اسم علم) ويبدأ بحرف كبير.',
					'la boulangerie اسم جنس.'
				],
				explanationAr: 'أسماء المدن والأشخاص والبلدان مثل «Constantine» هي أسماء علم (noms propres).'
			},
			{
				questionAr: 'أيّ كلمة من الكلمات الآتية هي «اسم جنس» (nom commun)؟',
				options: ['Amine', 'Algérie', 'bibliothèque', 'Tlemcen'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Amine اسم علم (اسم شخص).',
					'Algérie اسم علم (اسم بلد).',
					'ممتاز! bibliothèque اسم جنس (nom commun) ويسبقه المحدّد une / la.',
					'Tlemcen اسم علم (اسم مدينة).'
				],
				explanationAr: '«bibliothèque» اسم مشترك يطلق على أي مكتبة، فهو nom commun.'
			},
			{
				questionAr: 'ما علامة الترقيم المناسبة لنهاية الجملة: «Quel magnifique quartier ......»؟',
				options: ['النقطة ( . )', 'علامة الاستفهام ( ? )', 'علامة التعجب ( ! )', 'الفاصلة ( , )'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الجملة تعبّر عن الإعجاب (Quel...) فتناسبها علامة التعجب.',
					'هذه ليست جملة سؤال بل جملة تعجب.',
					'رائع! نضع علامة التعجب (!) للتعبير عن الإعجاب: «Quel magnifique quartier !».',
					'الفاصلة لا توضع في نهاية الجملة.'
				],
				explanationAr: 'الجملة المبدوءة بـ «Quel / Quelle» للإعجاب تُختم بعلامة التعجب (!).'
			},
			{
				questionAr: 'ما علامة الترقيم التي نفصل بها بين الأشياء المتعددة في القائمة: «J’ai un livre ...... un cahier et un stylo.»؟',
				options: ['علامة الاستفهام ( ? )', 'الفاصلة ( , )', 'علامة التعجب ( ! )', 'النقطة ( . )'],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا يوجد سؤال داخل القائمة.',
					'أحسنت! نضع الفاصلة (,) للفصل بين العناصر المتتابعة داخل الجملة.',
					'لا نضع علامة تعجب وسط القائمة.',
					'النقطة توضع في نهاية الجملة فقط.'
				],
				explanationAr: 'الفاصلة (,) تُستعمل للفصل بين العناصر في التعداد داخل الجملة الواحدة.'
			},
			{
				questionAr: 'اختر الجملة المكتوبة كتابة صحيحة من حيث الحروف الكبيرة والترقيم:',
				options: [
					'sara habite à béjaïa',
					'Sara habite à béjaïa.',
					'Sara habite à Béjaïa.',
					'sara habite à Béjaïa?'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'تنقصها الحروف الكبيرة والنقطة.',
					'اسم المدينة Béjaïa اسم علم ويجب أن يبدأ بحرف كبير B.',
					'ممتاز! Sara و Béjaïa بحرفين كبيرين والجملة الخبرية تنتهي بنقطة.',
					'هذه جملة خبرية وليست سؤالاً، واسم Sara يجب أن يبدأ بحرف كبير.'
				],
				explanationAr: 'أسماء العلم (Sara, Béjaïa) تبدأ بحرف كبير، والجملة الخبرية تنتهي بنقطة.'
			}
		]
	}
];
