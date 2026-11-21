import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap
} from '../../svg-french';
import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';

// ═══════════════════════════════════════════════════════════════════════════════
// SVGs — 4AP Trimestre 2 (Projet 2 : Les belles fêtes algériennes et islamiques)
// 100% Halal: Aïd El-Fitr, Aïd El-Adha, Yaoum El-Ilm (16 Avril), Fête de la réussite scolaire
// ═══════════════════════════════════════════════════════════════════════════════

const svgFetesDiscover = renderLessonIllustration('pri_lang_08_birthday_cake_party', {
	lang: 'fr',
	title: "Les belles fêtes de l'Aïd et de la réussite scolaire",
	customLegend: [
		{ num: '1', label: 'Partager un bon gâteau aux fruits en famille' },
		{ num: '2', label: "Décorer la salle pour la fête de la réussite à l'école" },
		{ num: '3', label: 'Offrir des cadeaux et des livres utiles aux lauréats' }
	]
});

const svgFetesSummary = svgFrenchGrammarMap({
	title: 'Vocabulaire des fêtes et du partage — رصيد الأعياد والتضامن',
	rootLabel: 'Les belles occasions',
	rootSub: 'Partage, prière, respect et savoir',
	branches: [
		{
			label: "Les deux Aïds",
			rule: 'prière, gâteaux, solidarité',
			example: 'Aïd Moubarak !',
			color: '#047857'
		},
		{
			label: 'Yaoum El-Ilm',
			rule: '16 Avril — savoir et lecture',
			example: 'Cheikh Ben Badis',
			color: '#1d4ed8'
		},
		{
			label: 'Fête scolaire',
			rule: 'féliciter, offrir des livres',
			example: 'Bravo pour ta réussite !',
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

const svgPossessifsDiscover = renderLessonIllustration('pri_ara_05_fresh_fruits_honey_basket', {
	lang: 'fr',
	title: "Les déterminants possessifs et l'alimentation saine",
	customLegend: [
		{ num: '1', label: 'Mon panier, ma pomme, mes fruits frais (mon / ma / mes)' },
		{ num: '2', label: 'Son miel pur, sa bonne huile, ses dattes (son / sa / ses)' }
	]
});

const svgPossessifsSummary = svgFrenchConjugationChart({
	title: 'Tableau des déterminants possessifs (4AP)',
	subtitle: 'Ils s’accordent avec le nom qui suit !',
	columns: [
		{
			header: 'Masculin sing.',
			rule: 'mon - ton - son',
			examples: 'mon cahier, son habit',
			color: '#1d4ed8'
		},
		{
			header: 'Féminin sing.',
			rule: 'ma - ta - sa',
			examples: 'ma famille, sa robe',
			color: '#047857'
		},
		{
			header: 'Pluriel (M/F)',
			rule: 'mes - tes - ses',
			examples: 'mes gâteaux, ses prix',
			color: '#b45309'
		}
	],
	width: 520,
	height: 210
});

const svgVerbes2gDiscover = svgFrenchConjugationChart({
	title: 'Être, Avoir et 2e groupe au présent',
	subtitle: 'Verbes essentiels du Trimestre 2 (4AP)',
	columns: [
		{
			header: 'ÊTRE',
			rule: 'suis, es, est',
			examples: 'sommes, êtes, sont',
			color: '#1d4ed8'
		},
		{
			header: 'AVOIR',
			rule: 'ai, as, a',
			examples: 'avons, avez, ont',
			color: '#047857'
		},
		{
			header: '2e groupe (FINIR)',
			rule: '-is, -is, -it',
			examples: '-issons, -issez, -issent',
			color: '#b45309'
		}
	],
	width: 520,
	height: 210
});

const svgVerbes2gSummary = svgFrenchGrammarMap({
	title: 'Conjuguer les verbes du 2e groupe au présent (-ir -> -issons)',
	rootLabel: 'finir / choisir / réussir',
	rootSub: 'Ex. : Nous finissons — Ils réussissent',
	branches: [
		{
			label: 'Singulier',
			rule: 'je -is | tu -is | il/elle -it',
			example: 'Je finis, elle choisit',
			color: '#1d4ed8'
		},
		{
			label: 'Nous / Vous',
			rule: 'nous -issons | vous -issez',
			example: 'Nous réussissons bien',
			color: '#047857'
		},
		{
			label: 'Ils / Elles',
			rule: 'ils / elles -issent',
			example: 'Ils finissent le travail',
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

const svgFemininDiscover = renderLessonIllustration('pri_lang_05_professions_tools', {
	lang: 'fr',
	title: 'Les métiers et la formation du féminin (+e / -er -> -ère)',
	customLegend: [
		{ num: '1', label: 'Un médecin / un infirmier -> une infirmière (-ère)' },
		{ num: '2', label: 'Un pompier courageux de la Protection civile' },
		{ num: '3', label: 'Un boulanger -> une boulangère (-er devient -ère)' },
		{ num: '4', label: 'Un enseignant -> une enseignante (+e)' }
	]
});

const svgFemininSummary = svgFrenchConjugationChart({
	title: 'Le féminin des noms et des adjectifs (4AP)',
	subtitle: 'Trois cas faciles à retenir',
	columns: [
		{
			header: 'Règle générale (+e)',
			rule: 'On ajoute -e',
			examples: 'grand -> grande / ami -> amie',
			color: '#1d4ed8'
		},
		{
			header: '-er -> -ère',
			rule: 'Accent grave sur le è',
			examples: 'premier -> première / léger -> légère',
			color: '#047857'
		},
		{
			header: 'Déjà en -e',
			rule: 'Ne change pas !',
			examples: 'un élève -> une élève / calme',
			color: '#b45309'
		}
	],
	width: 520,
	height: 210
});

// ═══════════════════════════════════════════════════════════════════════════════
// LESSONS_4AP_T2 (4 Lessons — yearSubjectId: 599)
// ═══════════════════════════════════════════════════════════════════════════════

export const LESSONS_4AP_T2: FrenchInteractiveLessonData[] = [
	{
		id: 'fre_lesson_4ap_t2_fetes_partage',
		slug: 'fre-4ap-t2-fetes-partage',
		grade: '4ap',
		yearSubjectId: 599,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الثاني: الأعياد الإسلامية والمناسبات السعيدة (Projet 2 : Les belles fêtes)',
		order: 1,
		titleAr: 'رصيد العيد ويوم العلم والتضامن (Vocabulaire de l’Aïd, de Yaoum El-Ilm et du partage)',
		objectives: [
			'حفظ مفردات الأعياد الإسلامية والمناسبات التربوية (Aïd El-Fitr, Aïd El-Adha, Yaoum El-Ilm 16 Avril, la réussite scolaire)',
			'استعمال عبارات التهنئة والمشاركة والأخوة (Aïd Moubarak, féliciter, partager, offrir, solidarité)',
			'التعبير عن قيم الإسلام في العيد وطلب العلم بجمل فرنسية واضحة'
		],
		keywordsAr: ["L'Aïd El-Fitr", "L'Aïd El-Adha", 'Yaoum El-Ilm', '16 Avril', 'partage / solidarité', 'réussite'],
		discover: {
			scenarioAr:
				'في صباح عيد الفطر المبارك، لبس أنس ثياباً جديدة وذهب مع والده إلى المسجد لصلاة العيد، ثم تبادل التهاني مع الجيران وتقاسموا الحلويات التقليدية. وفي 16 أفريل، احتفل في مدرسته بيوم العلم (Yaoum El-Ilm) وحفل النجاح المدرسي.',
			svg: svgFetesDiscover,
			steps: [
				{
					promptAr: 'ما العيدان الشرعيان اللذان يفرح بهما المسلمون كل عام؟',
					hintAr: 'عيد الفطر بعد رمضان وعيد الأضحى في ذي الحجة.',
					expectedInput: "L'Aïd El-Fitr et L'Aïd El-Adha",
					revealAr: 'العيدان المباركان هما: «L’Aïd El-Fitr» (عيد الفطر) و«L’Aïd El-Adha» (عيد الأضحى)، ونقول فيهما: «Aïd Moubarak !».'
				},
				{
					promptAr: 'في أيّ تاريخ نحتفل بيوم العلم (Yaoum El-Ilm) في الجزائر، تخليداً لذكرى الشيخ عبد الحميد بن باديس؟',
					hintAr: 'يوم السادس عشر من شهر أفريل.',
					expectedInput: '16 Avril',
					revealAr: 'يوم العلم (Yaoum El-Ilm) يكون في 16 أفريل (le 16 Avril)، ونشجّع فيه القراءة والعلم النافع اقتداءً بعلماء الجزائر مثل Cheikh Abdelhamid Ben Badis.'
				},
				{
					promptAr: 'ما الكلمة الفرنسية التي تعني «التقاسم / المشاركة» مع الفقراء والجيران في العيد؟',
					hintAr: 'تبدأ بـ le par...',
					expectedInput: 'le partage',
					revealAr: 'الكلمة هي «le partage» (المشاركة) و«la solidarité» (التضامن)؛ فالمسلم يشارك الفرحة والحلويات واللحم مع المحتاجين.'
				}
			]
		},
		summary: {
			rulesAr: [
				'عيد الفطر (L’Aïd El-Fitr): يأتي بعد شهر رمضان؛ نؤدي صلاة العيد (la prière de l’Aïd)، نلبس ثياباً جديدة (des habits neufs)، نتزاور ونأكل الحلويات التقليدية (des gâteaux traditionnels : makrout, baklawa).',
				'عيد الأضحى (L’Aïd El-Adha): عيد التضحية والتضامن (la solidarité et le partage)، نتقاسم فيه الأضحية مع الأقارب والفقراء (les pauvres).',
				'يوم العلم (Yaoum El-Ilm — le 16 Avril) وحفل النجاح المدرسي (la fête de la réussite scolaire): نكرّم فيهما المجتهدين ونقدّم لهم الكتب والجوائز (des livres et des prix).',
				'أفعال مفيدة للحديث عن المناسبات: préparer (يحضر)، offrir (يهدي)، partager (يتقاسم)، féliciter (يهنئ)، visiter (يزور).'
			],
			visualSvg: svgFetesSummary,
			visualCaptionAr: 'الرصيد اللغوي للأعياد الإسلامية ويوم العلم وحفل النجاح المدرسي',
			examples: [
				{
					problemAr: 'أكمل بالكلمة المناسبة (prière / partage / 16 Avril) :\n1) Le matin de l’Aïd, nous allons à la mosquée pour la ........\n2) Yaoum El-Ilm a lieu le ........',
					solutionAr: '1) la prière.\n2) le 16 Avril.'
				},
				{
					problemAr: 'ماذا تقول لصديقك يوم العيد، وماذا تقول له عند نجاحه في المدرسة؟',
					solutionAr: 'يوم العيد: «Aïd Moubarak !» — عند النجاح: «Félicitations pour ta réussite !».'
				}
			],
			watchOutAr:
				'في المناسبات والأعياد، نستعمل عبارات مهذّبة وإسلامية أصيلة مثل «Aïd Moubarak !» و«Félicitations !» ونبتعد عن الأعياد غير الإسلامية!'
		},
		practice: [
			{
				questionAr: 'في أيّ مناسبة نحتفل بعد انتهاء شهر رمضان المبارك؟',
				options: ["L'Aïd El-Adha", "L'Aïd El-Fitr", 'Yaoum El-Ilm', 'La rentrée scolaire'],
				correctIndex: 1,
				diagnosticFeedback: [
					'عيد الأضحى يأتي في شهر ذي الحجة.',
					'أحسنت! عيد الفطر (L’Aïd El-Fitr) يأتي مباشرة بعد شهر رمضان.',
					'يوم العلم يكون في 16 أفريل.',
					'الدخول المدرسي يكون في شهر سبتمبر.'
				],
				explanationAr: 'نحتفل بعيد الفطر المبارك (L’Aïd El-Fitr) بعد صيام شهر رمضان.'
			},
			{
				questionAr: 'ما تاريخ يوم العلم (Yaoum El-Ilm) في الجزائر؟',
				options: ['Le 1er Janvier', 'Le 16 Avril', 'Le 5 Juillet', 'Le 1er Novembre'],
				correctIndex: 1,
				diagnosticFeedback: [
					'ليس الأول من جانفي.',
					'ممتاز! يوم العلم يوافق 16 أفريل (le 16 Avril).',
					'5 جويلية هو عيد الاستقلال.',
					'1 نوفمبر هو ذكرى اندلاع الثورة.'
				],
				explanationAr: 'يوافق يوم العلم (Yaoum El-Ilm) تاريخ 16 أفريل في الجزائر.'
			},
			{
				questionAr: 'ما معنى الفعل «partager» المرتبط بعيد الأضحى وعيد الفطر؟',
				options: ['ينام', 'يتقاسم / يشارك', 'ينسى', 'يغضب'],
				correctIndex: 1,
				diagnosticFeedback: [
					'ينام هو dormir.',
					'رائع! «partager» تعني يتقاسم ويشارك الخير مع الآخرين.',
					'ينسى هو oublier.',
					'يغضب هو se fâcher.'
				],
				explanationAr: 'الفعل «partager» يدل على التقاسم والتكافل بين المسلمين.'
			},
			{
				questionAr: 'ماذا نهدي للتلاميذ المتفوقين في حفل النجاح المدرسي (la fête de la réussite)؟',
				options: ['des livres et des diplômes', 'des légumes', 'des moutons', 'des tapis'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! نهديهم كتباً مفيدة وشهادات تشجيعية (des livres et des diplômes).',
					'الخضر لا تُهدى كجائزة في حفل النجاح.',
					'الخروف يرتبط بعيد الأضحى.',
					'ليست الهدية المعتادة في حفل النجاح.'
				],
				explanationAr: 'في حفل النجاح المدرسي نكافئ المتفوقين بالكتب والشهادات.'
			},
			{
				questionAr: 'ما معنى الفعل «féliciter» باللغة العربية؟',
				options: ['يهنّئ', 'يبكي', 'يكسر', 'يغلق'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! féliciter تعني يهنّئ (مثل: Je félicite mon ami pour sa réussite).',
					'يبكي هو pleurer.',
					'يكسر هو casser.',
					'يغلق هو fermer.'
				],
				explanationAr: 'الفعل «féliciter» يعني يهنئ بالعيد أو بالنجاح.'
			}
		]
	},
	{
		id: 'fre_lesson_4ap_t2_possessifs',
		slug: 'fre-4ap-t2-possessifs',
		grade: '4ap',
		yearSubjectId: 599,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الثاني: الأعياد الإسلامية والمناسبات السعيدة (Projet 2 : Les belles fêtes)',
		order: 2,
		titleAr: 'صفات الملكية (Les déterminants possessifs : mon, ma, mes / ton, ta, tes / son, sa, ses)',
		objectives: [
			'اختيار صفة الملكية المناسبة حسب المالك (je / tu / il-elle) وحسب نوع الاسم وعددِه (مذكر / مؤنث / جمع)',
			'استعمال القاعدة الخاصة بتحويل ma / ta / sa إلى mon / ton / son قبل الاسم المؤنث المبدوء بحرف متحرك (mon école, son amie)',
			'توظيف صفات الملكية في جمل صحيحة عن العيد والأسرة والمدرسة'
		],
		keywordsAr: ['Déterminants possessifs', 'mon / ma / mes', 'ton / ta / tes', 'son / sa / ses', 'accord'],
		discover: {
			scenarioAr:
				'في صباح العيد، قال يوسف لأخته: «Je mets mon habit neuf, je salue ma grand-mère et je partage mes gâteaux avec mes voisins. Et toi, où est ta robe et où sont tes chaussures ?».',
			svg: svgPossessifsDiscover,
			steps: [
				{
					promptAr: 'لماذا استعمل يوسف «mon» قبل «habit»، و«ma» قبل «grand-mère»، و«mes» قبل «gâteaux»؟',
					hintAr: 'انظر إلى جنس وعدد كل اسم (مذكر، مؤنث، جمع).',
					expectedInput: 'masculin, féminin, pluriel',
					revealAr: 'لأن «habit» مذكر مفرد (mon)، و«grand-mère» مؤنث مفرد (ma)، و«gâteaux» جمع (mes).'
				},
				{
					promptAr: 'إذا أردنا الحديث عن كتاب أمين (ملكه هو)، هل نكتب «mon livre» أم «son livre»؟',
					hintAr: 'للمالك الغائب (il / elle) نستعمل son / sa / ses.',
					expectedInput: 'son livre',
					revealAr: 'نكتب «son livre» (كتابه)، و«sa famille» (عائلته)، و«ses amis» (أصدقاؤه).'
				},
				{
					promptAr: 'كلمة «école» مؤنثة، لكننا نقول «mon école» ولا نقول «ma école». لماذا؟',
					hintAr: 'انظر إلى الحرف الأول في كلمة école.',
					expectedInput: 'voyelle',
					revealAr: 'لأن كلمة «école» تبدأ بحرف متحرك (é)، فتتحول ma / ta / sa إلى «mon / ton / son» لتسهيل النطق: mon école, ton amie, son ardoise!'
				}
			]
		},
		summary: {
			rulesAr: [
				'صفات الملكية (les déterminants possessifs) توضع قبل الاسم لتبيّن لمن يعود الشيء، وتتبع الاسم الذي بعدها في الجنس والعدد.',
				'مع المتكلم (Je): mon (مذكر مفرد) — ma (مؤنث مفرد) — mes (جمع للمذكر والمؤنث).',
				'مع المخاطب (Tu): ton (مذكر مفرد) — ta (مؤنث مفرد) — tes (جمع). ومع الغائب (Il / Elle): son (مذكر) — sa (مؤنث) — ses (جمع).',
				'قاعدة مهمة: أمام اسم مؤنث مفرد يبدأ بحرف متحرك (أو h صامتة)، نستعمل «mon / ton / son» بدلاً من «ma / ta / sa» مثل: mon école، ton amie، son histoire.'
			],
			visualSvg: svgPossessifsSummary,
			visualCaptionAr: 'جدول صفات الملكية للمذكر والمؤنث والجمع في السنة الرابعة ابتدائي',
			examples: [
				{
					problemAr: 'أكمل بـ (mon / ma / mes) : ...... père — ...... mère — ...... cadeaux — ...... école',
					solutionAr: 'mon père — ma mère — mes cadeaux — mon école.'
				},
				{
					problemAr: 'أكمل بـ (son / sa / ses) : Meriem prépare ...... robe, ...... livre et ...... cahiers.',
					solutionAr: 'Meriem prépare sa robe, son livre et ses cahiers.'
				}
			],
			watchOutAr:
				'احذر الخطأ الشائع: نكتب «mon amie» و«son école» وليس «ma amie» أو «sa école» لأن الكلمة تبدأ بحرف متحرك!'
		},
		practice: [
			{
				questionAr: 'أكمل بصفة الملكية المناسبة: «Le jour de l’Aïd, je porte ...... bel habit.»',
				options: ['ma', 'mon', 'mes', 'sa'],
				correctIndex: 1,
				diagnosticFeedback: [
					'ma تستعمل للمؤنث فقط.',
					'أحسنت! habit مذكر مفرد والفاعل je، إذن نكتب «mon bel habit».',
					'mes للجمع، وكلمة habit هنا مفردة.',
					'sa تستعمل للمؤنث ومع الغائب.'
				],
				explanationAr: 'مع الفاعل «je» والاسم المذكر المفرد «habit» نستعمل «mon».'
			},
			{
				questionAr: 'أكمل الجملة: «Sara félicite ...... parents le matin de l’Aïd.»',
				options: ['son', 'sa', 'ses', 'mon'],
				correctIndex: 2,
				diagnosticFeedback: [
					'son للمفرد المذكر فقط.',
					'sa للمفرد المؤنث فقط.',
					'ممتاز! كلمة parents جمع والفاعل Sara (elle)، فنستعمل «ses parents».',
					'mon للمتكلم (je) والمفرد.'
				],
				explanationAr: 'مع الغائب (Sara = elle) والاسم الجمع (parents) نضع «ses».'
			},
			{
				questionAr: 'اختر العبارة الصحيحة للقول «مدرستي» بالفرنسية:',
				options: ['ma école', 'mon école', 'mes école', 'ta école'],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نكتب ma قبل كلمة تبدأ بحرف متحرك (é).',
					'رائع! نقول «mon école» لأن école تبدأ بحرف متحرك.',
					'mes للجمع و école مفردة.',
					'ta للمخاطب ولا توضع قبل حرف متحرك.'
				],
				explanationAr: 'قبل اسم مؤنث مفرد يبدأ بحرف متحرك (école, amie) نستعمل mon / ton / son.'
			},
			{
				questionAr: 'أكمل الجملة: «Tu ranges ...... livres et ...... trousse.»',
				options: ['ton / ta', 'tes / ta', 'ta / tes', 'mes / ma'],
				correctIndex: 1,
				diagnosticFeedback: [
					'livres جمع لذا يحتاج tes وليس ton.',
					'أحسنت! مع Tu: livres جمع -> tes، و trousse مؤنث مفرد -> ta.',
					'livres جمع و trousse مؤنث مفرد، الترتيب معكوس.',
					'الفاعل هو Tu وليس Je.'
				],
				explanationAr: 'مع الفاعل Tu: جمع -> tes livres، مؤنث مفرد -> ta trousse.'
			},
			{
				questionAr: 'أكمل الجملة: «Amine offre un livre à ...... amie Khadidja.»',
				options: ['sa', 'son', 'ses', 'ma'],
				correctIndex: 1,
				diagnosticFeedback: [
					'كلمة amie تبدأ بحرف متحرك (a) فتتحول sa إلى son.',
					'ممتاز! نقول «son amie» لأن amie تبدأ بحرف متحرك.',
					'amie مفردة وليست جمعاً.',
					'الفاعل Amine (il) وليس Je.'
				],
				explanationAr: 'تتحول sa إلى son قبل الحرف المتحرك لتسهيل النطق: son amie.'
			}
		]
	},
	{
		id: 'fre_lesson_4ap_t2_present_etre_avoir_2g',
		slug: 'fre-4ap-t2-present-etre-avoir-2g',
		grade: '4ap',
		yearSubjectId: 599,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الثاني: الأعياد الإسلامية والمناسبات السعيدة (Projet 2 : Les belles fêtes)',
		order: 3,
		titleAr: 'الحاضر: فعلا être و avoir وأفعال الفوج الثاني (Être, avoir et 2e groupe au présent)',
		objectives: [
			'تصريف فعلي «être» و«avoir» في الحاضر مع جميع الضمائر الستة (مفرداً وجمعاً)',
			'تمييز أفعال الفوج الثاني المنتهية بـ «-ir» والتي تأخذ «-issons» مع nous (finir, choisir, réussir)',
			'تطبيق نهايات الفوج الثاني في الحاضر (-is, -is, -it, -issons, -issez, -issent) دون أخطاء'
		],
		keywordsAr: ['Être au présent', 'Avoir au présent', '2e groupe', 'finir', 'choisir', 'réussir'],
		discover: {
			scenarioAr:
				'في حفل نهاية الفصل بمدرسة «الفتح»، قال المدير مسروراً: «Vous êtes des élèves sérieux ! Vous avez de bonnes notes et vous réussissez toujours. Nous finissons l’année dans la joie !».',
			svg: svgVerbes2gDiscover,
			steps: [
				{
					promptAr: 'كيف صُرّف الفعل «être» مع الضمير «Vous» والفعل «avoir» مع الضمير «Vous» في كلام المدير؟',
					hintAr: 'Vous êtes ... / Vous avez ...',
					expectedInput: 'êtes / avez',
					revealAr: 'تصريف être في الجمع: nous sommes, vous êtes, ils/elles sont. وتصريف avoir في الجمع: nous avons, vous avez, ils/elles ont.'
				},
				{
					promptAr: 'لاحظ الفعلين «réussissez» و«finissons». إلى أيّ فوج ينتميان وما مصدرهما؟',
					hintAr: 'المصدر ينتهي بـ -ir (réussir / finir) ومع nous نسمع -issons.',
					expectedInput: '2e groupe',
					revealAr: 'الفعلان «finir» و«réussir» (وكذلك «choisir») من أفعال الفوج الثاني (le 2e groupe) لأنها تنتهي بـ -ir وتأخذ «-issons» مع nous.'
				},
				{
					promptAr: 'صرّف الفعل «choisir» (اختار) مع الضمير «Il» ومع الضمير «Ils».',
					hintAr: 'مع Il نضيف -it، ومع Ils نضيف -issent.',
					expectedInput: 'il choisit / ils choisissent',
					revealAr: 'نحذف -ir من choisir فيبقى الجذر chois-، ثم نضيف: il choisit — ils choisissent.'
				}
			]
		},
		summary: {
			rulesAr: [
				'فعل «être» في الحاضر: je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont.',
				'فعل «avoir» في الحاضر: j’ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont.',
				'أفعال الفوج الثاني (les verbes du 2e groupe) تنتهي بـ «-ir» مثل: finir (أنهى)، choisir (اختار)، réussir (نجح)، grandir (كبر).',
				'نهايات الفوج الثاني في الحاضر: je -is | tu -is | il/elle -it | nous -issons | vous -issez | ils/elles -issent (لا تنسَ «-iss-» في الجمع!).'
			],
			visualSvg: svgVerbes2gSummary,
			visualCaptionAr: 'نهايات أفعال الفوج الثاني في الحاضر (مفرد وجمع)',
			examples: [
				{
					problemAr: 'صرّف الفعل (être / avoir) في الحاضر:\n1) Les enfants (être) ...... heureux le jour de l’Aïd.\n2) Nous (avoir) ...... des gâteaux traditionnels.',
					solutionAr: '1) Les enfants sont heureux le jour de l’Aïd.\n2) Nous avons des gâteaux traditionnels.'
				},
				{
					problemAr: 'صرّف الفعلين من الفوج الثاني في الحاضر:\n1) Elle (choisir) ...... un beau livre.\n2) Les élèves (réussir) ...... leur examen.',
					solutionAr: '1) Elle choisit un beau livre.\n2) Les élèves réussissent leur examen.'
				}
			],
			watchOutAr:
				'احذر نسيان حرفي «ss» في الجمع مع أفعال الفوج الثاني! نكتب «nous finissons, vous finissez, ils finissent» بحرفي s مزدوجين!'
		},
		practice: [
			{
				questionAr: 'أكمل بالفعل «être» في الحاضر: «Nous ...... fiers de notre réussite.»',
				options: ['êtes', 'sont', 'sommes', 'avons'],
				correctIndex: 2,
				diagnosticFeedback: [
					'êtes تستعمل مع vous.',
					'sont تستعمل مع ils / elles.',
					'أحسنت! مع الضمير Nous نقول: «Nous sommes».',
					'avons من فعل avoir وليس être.'
				],
				explanationAr: 'تصريف الفعل être مع الضمير nous هو «nous sommes».'
			},
			{
				questionAr: 'أكمل بالفعل «avoir» في الحاضر: «Les élèves ...... de jolis cadeaux.»',
				options: ['sont', 'ont', 'avons', 'avez'],
				correctIndex: 1,
				diagnosticFeedback: [
					'sont من فعل être وليس avoir.',
					'ممتاز! Les élèves = ils، وفعل avoir مع ils هو «ont».',
					'avons تستعمل مع nous.',
					'avez تستعمل مع vous.'
				],
				explanationAr: 'تصريف الفعل avoir مع الجمع الغائب (ils / elles) هو «ont».'
			},
			{
				questionAr: 'صرّف الفعل (finir) في الحاضر: «Je ...... mes devoirs avant la fête.»',
				options: ['fini', 'finis', 'finit', 'finissent'],
				correctIndex: 1,
				diagnosticFeedback: [
					'مع je نضيف النهاية -is وليس -i.',
					'رائع! «Je finis» بالنهاية -is.',
					'-it هي نهاية الضمير il / elle.',
					'-issent هي نهاية ils / elles.'
				],
				explanationAr: 'نهاية أفعال الفوج الثاني مع je و tu هي «-is»: je finis, tu finis.'
			},
			{
				questionAr: 'صرّف الفعل (choisir) في الحاضر: «Meriem ...... une belle histoire à la bibliothèque.»',
				options: ['choisis', 'choisit', 'choisissons', 'choisissent'],
				correctIndex: 1,
				diagnosticFeedback: [
					'choisis تستعمل مع je / tu.',
					'أحسنت! Meriem = elle، ونهاية الفوج الثاني مع elle هي -it: choisit.',
					'choisissons تستعمل مع nous.',
					'choisissent للجمع (ils/elles).'
				],
				explanationAr: 'مع المفرد الغائب (il / elle) نضيف «-it»: Meriem choisit.'
			},
			{
				questionAr: 'صرّف الفعل (réussir) في الحاضر: «Vous ...... grâce à votre travail.»',
				options: ['réussis', 'réussit', 'réussissons', 'réussissez'],
				correctIndex: 3,
				diagnosticFeedback: [
					'réussis مع je أو tu.',
					'réussit مع il أو elle.',
					'réussissons مع nous.',
					'ممتاز! مع الضمير Vous نضيف «-issez»: vous réussissez.'
				],
				explanationAr: 'نهاية الفوج الثاني في الحاضر مع vous هي «-issez».'
			}
		]
	},
	{
		id: 'fre_lesson_4ap_t2_feminin',
		slug: 'fre-4ap-t2-feminin',
		grade: '4ap',
		yearSubjectId: 599,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الثاني: الأعياد الإسلامية والمناسبات السعيدة (Projet 2 : Les belles fêtes)',
		order: 4,
		titleAr: 'تأنيث الأسماء والصفات (Le féminin des noms et des adjectifs : -e, -er / -ère)',
		objectives: [
			'تطبيق القاعدة العامة لتأنيث الأسماء والصفات بإضافة الحرف «-e» (grand -> grande, content -> contente, un ami -> une amie)',
			'تحويل الأسماء والصفات المنتهية بـ «-er» إلى «-ère» في المؤنث (premier -> première, boulanger -> boulangère, léger -> légère)',
			'معرفة أن الأسماء والصفات المنتهية أصلاً بـ «-e» لا تتغير في المؤنث (un élève calme -> une élève calme)'
		],
		keywordsAr: ['Le féminin', '+ e', '-er -> -ère', 'nom', 'adjectif', 'accord'],
		discover: {
			scenarioAr:
				'في يوم العلم (16 أفريل)، نالت خديجة الجائزة الأولى، فكتبت المعلمة على السبورة:\n— «Amine est le premier élève, il est content.»\n— «Khadidja est la première élève, elle est contente.»',
			svg: svgFemininDiscover,
			steps: [
				{
					promptAr: 'كيف تحوّلت الصفة «content» (مسرور) إلى المؤنث «contente» (مسرورة)؟',
					hintAr: 'أضفنا حرفاً واحداً في نهاية الكلمة.',
					expectedInput: '+ e',
					revealAr: 'القاعدة العامة لتأنيث الأسماء والصفات هي إضافة «-e» في النهاية: content -> contente، grand -> grande، un voisin -> une voisine.'
				},
				{
					promptAr: 'كيف تحوّلت كلمة «premier» (الأول) التي تنتهي بـ «-er» إلى المؤنث؟',
					hintAr: 'انظر إلى الحرف è ذي الشدة المائلة (accent grave).',
					expectedInput: 'première',
					revealAr: 'الكلمات المنتهية بـ «-er» تصبح في المؤنث «-ère» (مع accent grave على è): premier -> première، boulanger -> boulangère، léger -> légère.'
				},
				{
					promptAr: 'هل تغيّرت كلمة «élève» بين المذكر والمؤنث؟ ولماذا؟',
					hintAr: 'انظر إلى الحرف الأخير في كلمة élève.',
					expectedInput: 'non',
					revealAr: 'لم تتغيّر لأنها تنتهي أصلاً بالحرف «-e»! مثل: un élève calme -> une élève calme، un enfant sage -> une enfant sage.'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة العامة: لتأنيث الاسم أو الصفة نضيف «-e» في النهاية (un ami -> une amie | petit -> petite | content -> contente | joli -> jolie).',
				'الأسماء والصفات المنتهية بـ «-er» تصبح في المؤنث «-ère» (un boulanger -> une boulangère | un écolier -> une écolière | premier -> première | dernier -> dernière | léger -> légère).',
				'الأسماء والصفات المنتهية أصلاً بـ «-e» تبقى كما هي في المؤنث، ونغيّر الأداة فقط (un camarade calme -> une camarade calme).',
				'الصفة تتبع الاسم الموصوف دائماً في الجنس (مذكر أو مؤنث): «un gâteau délicieux / une robe verte / une fête joyeuse».'
			],
			visualSvg: svgFemininSummary,
			visualCaptionAr: 'قواعد تأنيث الأسماء والصفات المقررة في السنة الرابعة ابتدائي',
			examples: [
				{
					problemAr: 'حوّل إلى المؤنث: un petit écolier -> ............ | le premier voisin -> ............',
					solutionAr: 'une petite écolière | la première voisine.'
				},
				{
					problemAr: 'أكمل بالصفة المؤنثة المناسبة: La mosquée est (grand) ........ — Une tenue (léger) ........',
					solutionAr: 'La mosquée est grande. — Une tenue légère.'
				}
			],
			watchOutAr:
				'عند تحويل «-er» إلى «-ère» لا تنسَ وضع الشدة المائلة (accent grave) على الحرف «è»: première، boulangère، écolière!'
		},
		practice: [
			{
				questionAr: 'ما مؤنث الصفة «content» (مسرور)؟',
				options: ['content', 'contente', 'contentère', 'contents'],
				correctIndex: 1,
				diagnosticFeedback: [
					'content مذكر؛ يجب إضافة -e.',
					'أحسنت! مؤنث content هو «contente».',
					'نستعمل -ère فقط مع الكلمات المنتهية بـ -er.',
					'contents للجمع المذكر وليس المؤنث.'
				],
				explanationAr: 'حسب القاعدة العامة نضيف -e: content -> contente.'
			},
			{
				questionAr: 'ما مؤنث العبارة «un boulanger» (خبّاز)؟',
				options: ['une boulange', 'une boulangere', 'une boulangère', 'un boulangère'],
				correctIndex: 2,
				diagnosticFeedback: [
					'يجب الاحتفاظ بالحرف r وتحويل -er إلى -ère.',
					'لا تنسَ الشدة المائلة (accent grave) فوق الحرف è.',
					'ممتاز! -er تتحول إلى -ère: «une boulangère».',
					'يجب تحويل الأداة un إلى une أيضاً.'
				],
				explanationAr: 'الكلمات المنتهية بـ -er تتحول في المؤنث إلى -ère: un boulanger -> une boulangère.'
			},
			{
				questionAr: 'أكمل بالصفة المؤنثة الصحيحة: «Khadidja est la ...... de sa classe.» (premier)',
				options: ['premier', 'premiere', 'première', 'premiers'],
				correctIndex: 2,
				diagnosticFeedback: [
					'premier للمذكر.',
					'تُكتب الشدة المائلة على الحرف è: première.',
					'رائع! مؤنث premier هو «première».',
					'premiers جمع مذكر.'
				],
				explanationAr: 'مؤنث الصفة «premier» هو «première».'
			},
			{
				questionAr: 'ما مؤنث العبارة «un élève calme» (تلميذ هادئ)؟',
				options: ['une élèvee calmee', 'une élève calme', 'un élève calme', 'une élève calmère'],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نضيف e ثانية عندما تنتهي الكلمة أصلاً بـ e.',
					'أحسنت! الكلمتان تنتهيان بـ e فلا تتغيران، نغيّر فقط un إلى une.',
					'يجب تحويل الأداة un إلى une.',
					'calme تنتهي بـ e ولا تنتهي بـ er.'
				],
				explanationAr: 'الكلمات المنتهية بـ -e في المذكر تبقى كما هي في المؤنث.'
			},
			{
				questionAr: 'حوّل إلى المؤنث: «le dernier écolier» (آخر تلميذ):',
				options: [
					'la dernier écolier',
					'la dernière écolière',
					'la derniere ecoliere',
					'le dernière écolière'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'يجب تأنيث dernier و écolier أيضاً.',
					'ممتاز! كلاهما ينتهي بـ -er فيصبحان -ère: «la dernière écolière».',
					'لا تنسَ وضع الحركات (accents): dernière و écolière.',
					'يجب تحويل أداة التعريف le إلى la.'
				],
				explanationAr: 'le -> la | dernier -> dernière | écolier -> écolière.'
			}
		]
	}
];
