import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchPrimaryCards
} from '../../svg-french';

// ═══════════════════════════════════════════════════════════════════════════════
// SVGs — 3AP Trimestre 2 (Projet 2 : En famille ! / Les animaux et les fruits)
// ═══════════════════════════════════════════════════════════════════════════════

const svgFamilleDiscover = svgFrenchPrimaryCards({
	title: 'Les membres de la famille — أفراد العائلة',
	subtitle: 'Voici ma famille en Algérie',
	cards: [
		{ word: 'le père', arabic: 'الأب (papa)', color: '#1d4ed8' },
		{ word: 'la mère', arabic: 'الأم (maman)', color: '#047857' },
		{ word: 'le frère', arabic: 'الأخ', color: '#d97706' },
		{ word: 'la sœur', arabic: 'الأخت', color: '#7c3aed' }
	],
	width: 520,
	height: 185
});

const svgFamilleSummary = svgFrenchGrammarMap({
	title: 'Présenter sa famille — تقديم أفراد العائلة',
	rootLabel: 'Ma famille (عائلتي)',
	rootSub: 'Voici mon... / Voici ma...',
	branches: [
		{
			label: 'Les parents',
			rule: 'le père / la mère',
			example: 'Voici mon père Karim.',
			color: '#1d4ed8'
		},
		{
			label: 'Frère et sœur',
			rule: 'le frère / la sœur',
			example: 'Voici ma sœur Aya.',
			color: '#047857'
		},
		{
			label: 'Grands-parents',
			rule: 'grand-père / grand-mère',
			example: 'J’aime ma grand-mère.',
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

const svgSonsDiscover = svgFrenchPrimaryCards({
	title: 'Les sons complexes : ou, on, oi, ch — الأصوات المركّبة',
	subtitle: 'Deux lettres qui forment un seul son',
	cards: [
		{ word: 'ou', arabic: 'poule - mouton', color: '#2563eb' },
		{ word: 'on', arabic: 'maison - ballon', color: '#059669' },
		{ word: 'oi', arabic: 'poire - poisson', color: '#d97706' },
		{ word: 'ch', arabic: 'chat - cheval', color: '#7c3aed' }
	],
	width: 520,
	height: 185
});

const svgSonsSummary = svgFrenchConjugationChart({
	title: 'Bien lire les sons : ou / on / oi / ch — قراءة الأصوات المركبة',
	subtitle: 'Ne confonds pas «ou» et «on» !',
	columns: [
		{
			header: 'ou / on',
			rule: 'ou (أو) | on (أون أنفية)',
			examples: 'poule / maison',
			color: '#1d4ed8'
		},
		{
			header: 'oi',
			rule: 'se lit «wa» (وا)',
			examples: 'poire, oiseau, étoile',
			color: '#047857'
		},
		{
			header: 'ch',
			rule: 'se lit «ch» (ش)',
			examples: 'chat, vache, cheval',
			color: '#b45309'
		}
	],
	width: 520,
	height: 210
});

const svgAnimauxDiscover = svgFrenchPrimaryCards({
	title: 'Les animaux de la ferme — حيوانات المزرعة',
	subtitle: 'Les animaux utiles dans la ferme de grand-père',
	cards: [
		{ word: 'la vache', arabic: 'البقرة', color: '#2563eb' },
		{ word: 'le mouton', arabic: 'الخروف', color: '#059669' },
		{ word: 'la poule', arabic: 'الدجاجة', color: '#d97706' },
		{ word: 'le cheval', arabic: 'الحصان', color: '#7c3aed' }
	],
	width: 520,
	height: 185
});

const svgAnimauxSummary = svgFrenchGrammarMap({
	title: 'Les animaux domestiques et de la ferme — الحيوانات الأليفة',
	rootLabel: 'À la ferme (في المزرعة)',
	rootSub: 'Chaque animal est utile',
	branches: [
		{
			label: 'La vache',
			rule: 'Elle donne du lait',
			example: 'La vache mange de l’herbe.',
			color: '#1d4ed8'
		},
		{
			label: 'La poule',
			rule: 'Elle donne des œufs',
			example: 'La poule picore du grain.',
			color: '#047857'
		},
		{
			label: 'Le mouton',
			rule: 'Il donne de la laine',
			example: 'Le mouton est blanc.',
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

const svgEtreAvoirDiscover = svgFrenchPrimaryCards({
	title: 'Être et Avoir au présent — فعلا الكينونة والملكية',
	subtitle: 'Avec je, tu, il, elle (المفرد)',
	cards: [
		{ word: 'Je suis', arabic: 'أنا (أكون)', color: '#2563eb' },
		{ word: 'Il / Elle est', arabic: 'هو / هي (يكون)', color: '#059669' },
		{ word: "J'ai", arabic: 'أنا عندي', color: '#d97706' },
		{ word: 'Il / Elle a', arabic: 'هو / هي عنده', color: '#7c3aed' }
	],
	width: 520,
	height: 185
});

const svgEtreAvoirSummary = svgFrenchConjugationChart({
	title: 'Masculin/Féminin + Être & Avoir au présent',
	subtitle: 'Bases essentielles de 3AP — Trimestre 2',
	columns: [
		{
			header: 'Féminin (+e)',
			rule: 'un -> une / + e',
			examples: 'un ami -> une amie',
			color: '#1d4ed8'
		},
		{
			header: 'Verbe ÊTRE',
			rule: 'je suis, tu es, il/elle est',
			examples: 'Amine est gentil.',
			color: '#047857'
		},
		{
			header: 'Verbe AVOIR',
			rule: "j'ai, tu as, il/elle a",
			examples: 'Sara a un chat.',
			color: '#b45309'
		}
	],
	width: 520,
	height: 210
});

// ═══════════════════════════════════════════════════════════════════════════════
// LESSONS_3AP_T2 (4 Lessons — yearSubjectId: 592)
// ═══════════════════════════════════════════════════════════════════════════════

export const LESSONS_3AP_T2: FrenchInteractiveLessonData[] = [
	{
		id: 'fre_lesson_3ap_t2_famille',
		slug: 'fre-3ap-t2-famille',
		grade: '3ap',
		yearSubjectId: 592,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الثاني: مع العائلة والحيوانات (Projet 2 : En famille !)',
		order: 1,
		titleAr: 'أفراد العائلة (Les membres de la famille)',
		objectives: [
			'حفظ أسماء أفراد العائلة بالفرنسية (le père, la mère, le frère, la sœur, le grand-père, la grand-mère)',
			'تقديم أفراد العائلة بجمل قصيرة باستعمال: Voici mon... / Voici ma...',
			'التمييز بين أفراد العائلة المذكرين (mon / le) والمؤنثين (ma / la)'
		],
		keywordsAr: ['La famille', 'le père', 'la mère', 'le frère', 'la sœur', 'grand-père / grand-mère'],
		discover: {
			scenarioAr:
				'في يوم الجمعة، تجتمع عائلة يوسف في بيت الجدّ. يمسك يوسف ألبوم صور الأسرة ويقدّم أفراد عائلته لصديقه أمين باللغة الفرنسية: «Voici mon père, voici ma mère et voici ma petite sœur Lina».',
			svg: svgFamilleDiscover,
			steps: [
				{
					promptAr: 'كيف نسمّي «الأب» و«الأم» باللغة الفرنسية؟',
					hintAr: 'الأب: le père (أو papa)، والأم: la mère (أو maman).',
					expectedInput: 'le père et la mère',
					revealAr: 'الأب هو «le père» (papa) والأم هي «la mère» (maman).'
				},
				{
					promptAr: 'ما الكلمة الفرنسية التي تعني «الأخت» وما الكلمة التي تعني «الأخ»؟',
					hintAr: 'الأخ: le frère، والأخت: la sœur.',
					expectedInput: 'la sœur et le frère',
					revealAr: 'الأخ هو «le frère» (مذكر)، والأخت هي «la sœur» (مؤنث).'
				},
				{
					promptAr: 'كيف يقدّم يوسف جدّته بالفرنسية باستعمال «Voici...»؟',
					hintAr: 'الجدّة مؤنث، فنستعمل «ma grand-mère».',
					expectedInput: 'Voici ma grand-mère',
					revealAr: 'يقول يوسف: «Voici ma grand-mère.» (هذه جدّتي)، وللجدّ يقول: «Voici mon grand-père.».'
				}
			]
		},
		summary: {
			rulesAr: [
				'الوالدان: le père (papa = الأب)، la mère (maman = الأم).',
				'الإخوة: le frère (الأخ)، la sœur (الأخت).',
				'الأجداد: le grand-père (الجدّ)، la grand-mère (الجدّة)، ونضيف أيضاً l’oncle (العم/الخال) و la tante (العمة/الخالة).',
				'لتقديم فرد من العائلة نقول: «Voici mon + مذكر» (Voici mon père) و«Voici ma + مؤنث» (Voici ma mère).'
			],
			visualSvg: svgFamilleSummary,
			visualCaptionAr: 'شجرة العائلة البسيطة وأسلوب تقديم الأفراد بـ Voici mon / Voici ma',
			examples: [
				{
					problemAr: 'أكمل بـ «mon» أو «ma» : Voici ...... frère Omar. — Voici ...... sœur Meriem.',
					solutionAr: 'Voici mon frère Omar. — Voici ma sœur Meriem.'
				},
				{
					problemAr: 'اربط كل كلمة بمعناها بالعربية: le grand-père — la tante — la mère',
					solutionAr: 'le grand-père (الجدّ) — la tante (العمة/الخالة) — la mère (الأم).'
				}
			],
			watchOutAr:
				'انتبه للفرق بين «mon» للمذكر (mon père, mon frère, mon grand-père) و«ma» للمؤنث (ma mère, ma sœur, ma grand-mère)!'
		},
		practice: [
			{
				questionAr: 'ما معنى كلمة «la sœur» باللغة العربية؟',
				options: ['الأم', 'الأخت', 'الجدّة', 'العمة'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الأم هي la mère.',
					'أحسنت! la sœur تعني الأخت.',
					'الجدّة هي la grand-mère.',
					'العمة هي la tante.'
				],
				explanationAr: 'كلمة «la sœur» تعني الأخت، و«le frère» تعني الأخ.'
			},
			{
				questionAr: 'اختر الجملة الصحيحة لتقديم الجدّ:',
				options: ['Voici ma grand-père.', 'Voici mon grand-père.', 'Voici la grand-père.', 'Voici une grand-père.'],
				correctIndex: 1,
				diagnosticFeedback: [
					'ma تستعمل للمؤنث فقط، والجدّ مذكر.',
					'ممتاز! grand-père مذكر فنستعمل mon: Voici mon grand-père.',
					'la أداة تعريف للمؤنث فقط.',
					'une أداة تنكير للمؤنث فقط.'
				],
				explanationAr: 'نستعمل «mon» قبل الأسماء المذكرة مثل: mon père, mon frère, mon grand-père.'
			},
			{
				questionAr: 'كيف نقول «هذه أمي» باللغة الفرنسية؟',
				options: ['Voici mon mère.', 'Voici ma mère.', 'Voici le mère.', 'Voici un mère.'],
				correctIndex: 1,
				diagnosticFeedback: [
					'mère مؤنث، لذا لا نضع قبلها mon.',
					'رائع! «Voici ma mère.» تعني هذه أمي.',
					'le للمذكر فقط.',
					'un للمذكر فقط.'
				],
				explanationAr: 'الاسم «mère» مؤنث مفرد، لذا نقول: Voici ma mère.'
			},
			{
				questionAr: 'ما الكلمة التي تعني «الجدّة» بالفرنسية؟',
				options: ['la mère', 'la sœur', 'la grand-mère', 'la tante'],
				correctIndex: 2,
				diagnosticFeedback: [
					'la mère تعني الأم.',
					'la sœur تعني الأخت.',
					'أحسنت! la grand-mère تعني الجدّة.',
					'la tante تعني العمة أو الخالة.'
				],
				explanationAr: 'الجدّة بالفرنسية هي «la grand-mère».'
			},
			{
				questionAr: 'أيّ كلمة دخيلة لا تنتمي إلى أفراد العائلة؟',
				options: ['le père', 'le frère', 'le cahier', 'la grand-mère'],
				correctIndex: 2,
				diagnosticFeedback: [
					'le père (الأب) من أفراد العائلة.',
					'le frère (الأخ) من أفراد العائلة.',
					'ممتاز! le cahier (الكراس) أداة مدرسية وليس من أفراد العائلة.',
					'la grand-mère (الجدّة) من أفراد العائلة.'
				],
				explanationAr: 'كلمة cahier أداة مدرسية، بينما البقية من أفراد العائلة.'
			}
		]
	},
	{
		id: 'fre_lesson_3ap_t2_sons_complexes',
		slug: 'fre-3ap-t2-sons-complexes',
		grade: '3ap',
		yearSubjectId: 592,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الثاني: مع العائلة والحيوانات (Projet 2 : En famille !)',
		order: 2,
		titleAr: 'الأصوات المركّبة البسيطة (Les sons complexes : ou, on, oi, ch)',
		objectives: [
			'تمييز ونطق الأصوات المركّبة الأربعة: ou، on، oi، ch داخل الكلمات',
			'التمييز الدقيق بين الصوت «ou» (مثل poule) والصوت «on» (مثل maison)',
			'إكمال وتصنيف كلمات فرنسية بسيطة حسب الصوت الذي تحتويه'
		],
		keywordsAr: ['ou', 'on', 'oi', 'ch', 'poule / mouton', 'chat / poire'],
		discover: {
			scenarioAr:
				'في مزرعة الجدّ، سمعت خديجة أصوات الحيوانات ورأت صوراً مكتوباً تحتها: «poule, mouton, poisson, chat». لاحظت أن حرفين يجتمعان معاً ليعطيا صوتاً جديداً جميلاً!',
			svg: svgSonsDiscover,
			steps: [
				{
					promptAr: 'ما الصوت المركّب المشترك بين كلمتي «poule» (دجاجة) و«rouge» (أحمر)؟',
					hintAr: 'حرف o متبوع بحرف u.',
					expectedInput: 'ou',
					revealAr: 'الحرفان «o + u» يُنطقان معاً «ou» مثل: poule, rouge, loup, mouton.'
				},
				{
					promptAr: 'ما الصوت الذي نسمعه في نهاية كلمة «mai-son» (منزل) و«bal-lon» (كرة)؟',
					hintAr: 'حرف o متبوع بحرف n.',
					expectedInput: 'on',
					revealAr: 'الصوت هو «on» مثل: maison, ballon, bonbon, mouton (لاحظ أن mouton تجمع الصوتين ou و on!).'
				},
				{
					promptAr: 'ما الصوت الذي يبدأ به اسما الحيوانين «chat» (قط) و«cheval» (حصان)؟',
					hintAr: 'حرف c مع حرف h يُنطق «ش».',
					expectedInput: 'ch',
					revealAr: 'الحرفان «c + h» يُنطقان «ش» مثل: chat, cheval, vache, chemise؛ أما «o + i» فيُنطق «وا» مثل: poire, oiseau.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الصوت «ou» (o + u): يُنطق مثل الضمّة الطويلة في (poule, mouton, rouge, souris).',
				'الصوت «on» (o + n): صوت أنفي نجده في (maison, ballon, bonbon, mouton, poisson).',
				'الصوت «oi» (o + i): يُنطق «وا» مثل (poire, oiseau, étoile, poisson, noir).',
				'الصوت «ch» (c + h): يُنطق «ش» مثل (chat, cheval, vache, chemise, chèvre).'
			],
			visualSvg: svgSonsSummary,
			visualCaptionAr: 'مقارنة سريعة للأصوات المركّبة الأربعة (ou, on, oi, ch) مع أمثلة سهلة',
			examples: [
				{
					problemAr: 'صنّف الكلمات الآتية حسب الصوت (ou / oi / ch) : vache — poule — poire',
					solutionAr: 'ou : poule — oi : poire — ch : vache.'
				},
				{
					problemAr: 'أكمل بالمقطع الصحيح (on / ch / oi) : un ....at — un pois.... — une p....re',
					solutionAr: 'un chat — un poisson (يوجد فيها oi و on) — une poire.'
				}
			],
			watchOutAr:
				'لا تخلط بين «ou» و«on» عند الكتابة! الحرف «u» مفتوح للأعلى (poule)، أما «n» فمفتوح للأسفل (maison)!'
		},
		practice: [
			{
				questionAr: 'أيّ كلمة تحتوي على الصوت «ou»؟',
				options: ['chat', 'poule', 'poire', 'maison'],
				correctIndex: 1,
				diagnosticFeedback: [
					'كلمة chat تحتوي على الصوت ch.',
					'أحسنت! كلمة «poule» تحتوي على الصوت ou.',
					'كلمة poire تحتوي على الصوت oi.',
					'كلمة maison تحتوي على الصوت on.'
				],
				explanationAr: 'في كلمة «poule» (دجاجة) نجد الحرفين o + u = ou.'
			},
			{
				questionAr: 'ما الصوت المركّب في كلمة «cheval» (حصان)؟',
				options: ['ou', 'on', 'oi', 'ch'],
				correctIndex: 3,
				diagnosticFeedback: [
					'لا يوجد الحرفان ou في كلمة cheval.',
					'لا يوجد الصوت on في كلمة cheval.',
					'لا يوجد الصوت oi في كلمة cheval.',
					'ممتاز! كلمة «cheval» تبدأ بالصوت «ch» (ش).'
				],
				explanationAr: 'كلمة «cheval» تبدأ بـ c + h = ch.'
			},
			{
				questionAr: 'اختر الكلمة التي تحتوي على الصوت «oi» (يُنطق وا):',
				options: ['oiseau', 'mouton', 'vache', 'bonbon'],
				correctIndex: 0,
				diagnosticFeedback: [
					'رائع! كلمة «oiseau» (عصفور) تبدأ بالصوت oi.',
					'كلمة mouton تحتوي على ou و on.',
					'كلمة vache تحتوي على ch.',
					'كلمة bonbon تحتوي على on.'
				],
				explanationAr: 'كلمة «oiseau» تبدأ بالحرفين o + i = oi.'
			},
			{
				questionAr: 'ما الكلمة التي تحتوي على الصوتين «ou» و«on» معاً؟',
				options: ['chat', 'poule', 'mouton', 'poire'],
				correctIndex: 2,
				diagnosticFeedback: [
					'كلمة chat فيها الصوت ch فقط.',
					'كلمة poule فيها الصوت ou فقط.',
					'أحسنت! كلمة «mou-ton» تجمع الصوت ou في المقطع الأول و on في المقطع الثاني.',
					'كلمة poire فيها الصوت oi فقط.'
				],
				explanationAr: 'كلمة «mouton» (خروف) تتكون من mou (ou) + ton (on).'
			},
			{
				questionAr: 'أكمل الكلمة بالصوت المناسب لتعني «منزل»: une mais....',
				options: ['ou', 'on', 'oi', 'ch'],
				correctIndex: 1,
				diagnosticFeedback: [
					'maisou ليست كلمة صحيحة.',
					'ممتاز! «une maison» تعني منزل وتنتهي بالصوت on.',
					'maisoi ليست كلمة صحيحة.',
					'maisch ليست كلمة صحيحة.'
				],
				explanationAr: 'كلمة منزل بالفرنسية هي «maison» وتنتهي بالصوت on.'
			}
		]
	},
	{
		id: 'fre_lesson_3ap_t2_animaux',
		slug: 'fre-3ap-t2-animaux',
		grade: '3ap',
		yearSubjectId: 592,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الثاني: مع العائلة والحيوانات (Projet 2 : En famille !)',
		order: 3,
		titleAr: 'الحيوانات الأليفة وحيوانات المزرعة (Les animaux domestiques et de la ferme)',
		objectives: [
			'تسمية حيوانات المزرعة والحيوانات الأليفة بالفرنسية (chat, vache, mouton, poule, cheval, lapin, chèvre)',
			'التعرف على فائدة كل حيوان في المزرعة بجمل بسيطة (lait, œufs, laine)',
			'وصف حيوان أليف بجملتين قصيرتين مع احترام الرفق بالحيوان'
		],
		keywordsAr: ['Les animaux', 'la ferme', 'le chat', 'la vache', 'le mouton', 'la poule / le cheval'],
		discover: {
			scenarioAr:
				'في عطلة الربيع، زار بلال مزرعة جدّه في البليدة. رأى بقرة تأكل العشب، وخروفاً أبيض، ودجاجات تلتقط الحبوب، وحصاناً سريعاً. فرح بلال وقال: «Les animaux de la ferme sont très utiles !».',
			svg: svgAnimauxDiscover,
			steps: [
				{
					promptAr: 'ما الحيوان الذي يعطينا الحليب (le lait) في المزرعة؟',
					hintAr: 'اسمها بالفرنسية la vache.',
					expectedInput: 'la vache',
					revealAr: 'البقرة «la vache» (وكذلك الماعز la chèvre) تعطينا الحليب الطازج: «La vache donne du lait.».'
				},
				{
					promptAr: 'ما الحيوان الذي يعطينا البيض (les œufs) في المزرعة؟',
					hintAr: 'الدجاجة بالفرنسية تبدأ بحرف p وفيها الصوت ou.',
					expectedInput: 'la poule',
					revealAr: 'الدجاجة «la poule» تعطينا البيض: «La poule donne des œufs.».'
				},
				{
					promptAr: 'ما اسم «الخروف» و«القط» باللغة الفرنسية؟',
					hintAr: 'الخروف: le mouton، والقط: le chat.',
					expectedInput: 'le mouton et le chat',
					revealAr: 'الخروف هو «le mouton» ويعطينا الصوف (la laine)، والقط هو «le chat» وهو حيوان أليف لطيف.'
				}
			]
		},
		summary: {
			rulesAr: [
				'حيوانات المزرعة المذكرة: le chat (القط)، le mouton (الخروف)، le cheval (الحصان)، le lapin (الأرنب)، le coq (الديك).',
				'حيوانات المزرعة المؤنثة: la vache (البقرة)، la poule (الدجاجة)، la chèvre (الماعز).',
				'فوائد حيوانات المزرعة: La vache donne du lait (الحليب) — La poule donne des œufs (البيض) — Le mouton donne de la laine (الصوف).',
				'الإسلام يعلّمنا الرفق بالحيوان وإطعامه: «Je protège les animaux et je leur donne de l’eau.».'
			],
			visualSvg: svgAnimauxSummary,
			visualCaptionAr: 'حيوانات المزرعة وفائدة كل حيوان في جمل سهلة للحفظ',
			examples: [
				{
					problemAr: 'أكمل الجمل بالكلمة المناسبة (lait / œufs / laine) :\n1) La vache donne du ........\n2) La poule donne des ........',
					solutionAr: '1) La vache donne du lait.\n2) La poule donne des œufs.'
				},
				{
					problemAr: 'ترجم إلى الفرنسية: أرنب — حصان — قط.',
					solutionAr: 'un lapin — un cheval — un chat.'
				}
			],
			watchOutAr:
				'انتبه لتذكير وتأنيث أسماء الحيوانات: نقول «le cheval» و«le mouton» (مذكر)، ونقول «la vache» و«la poule» و«la chèvre» (مؤنث)!'
		},
		practice: [
			{
				questionAr: 'ما الحيوان الذي يعطينا الحليب (le lait)؟',
				options: ['le chat', 'la poule', 'la vache', 'le lapin'],
				correctIndex: 2,
				diagnosticFeedback: [
					'القط (le chat) حيوان أليف لا يعطينا الحليب.',
					'الدجاجة (la poule) تعطينا البيض.',
					'أحسنت! البقرة «la vache» تعطينا الحليب (le lait).',
					'الأرنب (le lapin) يأكل الجزر ولا يعطينا الحليب.'
				],
				explanationAr: 'البقرة (la vache) تعطينا الحليب: La vache donne du lait.'
			},
			{
				questionAr: 'ماذا تعطينا الدجاجة (la poule)؟',
				options: ['du lait', 'des œufs', 'de la laine', 'des livres'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الحليب تعطيه البقرة والماعز.',
					'ممتاز! الدجاجة تعطينا البيض (des œufs).',
					'الصوف يعطيه الخروف (le mouton).',
					'des livres تعني كتباً!'
				],
				explanationAr: 'الدجاجة تعطينا البيض: La poule donne des œufs.'
			},
			{
				questionAr: 'ما معنى كلمة «le cheval» باللغة العربية؟',
				options: ['الخروف', 'الحصان', 'الأرنب', 'الديك'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الخروف هو le mouton.',
					'رائع! le cheval تعني الحصان.',
					'الأرنب هو le lapin.',
					'الديك هو le coq.'
				],
				explanationAr: 'كلمة «le cheval» تعني الحصان.'
			},
			{
				questionAr: 'اختر الأداة الصحيحة لكلمة «chèvre» (ماعز):',
				options: ['un chèvre', 'le chèvre', 'la chèvre', "l'chèvre"],
				correctIndex: 2,
				diagnosticFeedback: [
					'كلمة chèvre مؤنث وليست مذكرة.',
					'le تستعمل للمذكر فقط.',
					'أحسنت! نقول «la chèvre» أو «une chèvre».',
					'الكلمة تبدأ بحرف ساكن (c) وليس بحرف متحرك.'
				],
				explanationAr: 'الماعز بالفرنسية اسم مؤنث: la chèvre / une chèvre.'
			},
			{
				questionAr: 'أيّ كلمة تعني «الأرنب» الذي يحبّ أكل الجزر (les carottes)؟',
				options: ['le mouton', 'le lapin', 'la poule', 'le coq'],
				correctIndex: 1,
				diagnosticFeedback: [
					'le mouton هو الخروف.',
					'ممتاز! le lapin هو الأرنب.',
					'la poule هي الدجاجة.',
					'le coq هو الديك.'
				],
				explanationAr: 'الأرنب بالفرنسية هو «le lapin».'
			}
		]
	},
	{
		id: 'fre_lesson_3ap_t2_genre_etre_avoir',
		slug: 'fre-3ap-t2-genre-etre-avoir',
		grade: '3ap',
		yearSubjectId: 592,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الثاني: مع العائلة والحيوانات (Projet 2 : En famille !)',
		order: 4,
		titleAr: 'المذكر والمؤنث وفِعلا être و avoir في الحاضر (Masculin/Féminin et être/avoir)',
		objectives: [
			'تحويل الأسماء البسيطة من المذكر إلى المؤنث بإضافة الحرف «-e» وتغيير الأداة (un -> une)',
			'تصريف الفعل «être» في الحاضر مع ضمائر المفرد (je suis, tu es, il est, elle est)',
			'تصريف الفعل «avoir» في الحاضر مع ضمائر المفرد (j’ai, tu as, il a, elle a)'
		],
		keywordsAr: ['Masculin / Féminin', 'être', 'avoir', 'je suis / il est', "j'ai / il a", 'présent'],
		discover: {
			scenarioAr:
				'تقرأ لينا جملتين كتبتهما على كراسها: «Amine est un ami. Il a un lapin.» ثم أرادت التحدث عن صديقتها سارة فقالت: «Sara est une amie. Elle a une lapine.». لاحظت كيف تغيّر الاسم والفعل!',
			svg: svgEtreAvoirDiscover,
			steps: [
				{
					promptAr: 'كيف حوّلنا «un ami» (صديق) إلى المؤنث (صديقة)؟',
					hintAr: 'غيّرنا un إلى une وأضفنا حرفاً واحداً في النهاية.',
					expectedInput: 'une amie',
					revealAr: 'لتحويل كثير من الأسماء إلى المؤنث، نبدّل «un» بـ «une» ونضيف «-e» في النهاية: un ami -> une amie، un voisin -> une voisine.'
				},
				{
					promptAr: 'كيف نصرّف فعل الكينونة «être» مع الضمير «Je» ومع الضمير «Il / Elle»؟',
					hintAr: 'Je suis ... / Il est ...',
					expectedInput: 'suis / est',
					revealAr: 'نقول: Je suis élève. — Tu es gentil. — Il est content. — Elle est contente.'
				},
				{
					promptAr: 'كيف نصرّف فعل الملكية «avoir» مع الضمير «Elle» في جملة: «Elle .... un cahier»؟',
					hintAr: "j'ai, tu as, il/elle a.",
					expectedInput: 'a',
					revealAr: 'نقول: «Elle a un cahier.» (عندها كراس)، ومع Je نقول «J’ai»، ومع Tu نقول «Tu as».'
				}
			]
		},
		summary: {
			rulesAr: [
				'التحويل إلى المؤنث (le féminin): نغيّر الأداة (un -> une / le -> la) ونضيف غالباً «-e» في آخر الكلمة مثل: un ami -> une amie، un voisin -> une voisine، un lapin -> une lapine.',
				'تصريف الفعل «être» في الحاضر (المفرد): je suis — tu es — il est — elle est.',
				'تصريف الفعل «avoir» في الحاضر (المفرد): j’ai — tu as — il a — elle a.',
				'نستعمل «être» للوصف أو الصفة (Amine est poli)، ونستعمل «avoir» للملكية والعمر (Amine a 8 ans. Il a un cartable).'
			],
			visualSvg: svgEtreAvoirSummary,
			visualCaptionAr: 'ملخص التحويل إلى المؤنث وتصريف فعلي être و avoir في الحاضر مع المفرد',
			examples: [
				{
					problemAr: 'حوّل إلى المؤنث: un ami -> ........ | un voisin -> ........',
					solutionAr: 'un ami -> une amie | un voisin -> une voisine.'
				},
				{
					problemAr: 'أكمل بـ (suis / est / ai / a) :\n1) Je ...... en 3AP.\n2) Karim ...... un beau livre.',
					solutionAr: '1) Je suis en 3AP.\n2) Karim a un beau livre.'
				}
			],
			watchOutAr:
				'انتبه للفارق الصغير في الكتابة بين «tu es» (فعل être مع tu) و«il est» (فعل être مع il)، وبين «tu as» (مع s) و«il a» (بدون s)!'
		},
		practice: [
			{
				questionAr: 'ما مؤنث العبارة «un ami» (صديق)؟',
				options: ['un amie', 'une ami', 'une amie', 'le amie'],
				correctIndex: 2,
				diagnosticFeedback: [
					'يجب تغيير الأداة un إلى une أيضاً.',
					'يجب إضافة حرف e في نهاية ami لتصبح amie.',
					'أحسنت! مؤنث un ami هو «une amie».',
					'le أداة تعريف للمذكر فقط.'
				],
				explanationAr: 'لتحويل un ami إلى المؤنث نغيّر un إلى une ونضيف e: une amie.'
			},
			{
				questionAr: 'أكمل الجملة بالفعل «être» في الحاضر: «Je ...... élève en 3AP.»',
				options: ['es', 'suis', 'est', 'ai'],
				correctIndex: 1,
				diagnosticFeedback: [
					'es تستعمل مع الضمير tu.',
					'ممتاز! مع الضمير Je نقول: «Je suis».',
					'est تستعمل مع il أو elle.',
					'ai من فعل avoir وليس être.'
				],
				explanationAr: 'تصريف être مع je هو «je suis».'
			},
			{
				questionAr: 'أكمل الجملة بالفعل «avoir» في الحاضر: «Meriem ...... une belle trousse.»',
				options: ['ai', 'as', 'a', 'est'],
				correctIndex: 2,
				diagnosticFeedback: [
					'ai تستعمل مع الضمير je فقط.',
					'as تستعمل مع الضمير tu فقط.',
					'رائع! Meriem = elle، وفعل avoir مع elle هو «a».',
					'est من فعل être وليس للملكية.'
				],
				explanationAr: 'لأن Meriem تعوّض بالضمير elle، نكتب: Meriem a une belle trousse.'
			},
			{
				questionAr: 'أكمل الجملة بشكل صحيح: «Tu ...... un gentil frère.»',
				options: ['a', 'as', 'ai', 'est'],
				correctIndex: 1,
				diagnosticFeedback: [
					'a تستعمل مع il/elle بدون s.',
					'أحسنت! مع الضمير tu نضيف s دائماً: «Tu as».',
					"ai تستعمل مع j' فقط.",
					'est من فعل être مع il/elle.'
				],
				explanationAr: 'تصريف الفعل avoir مع الضمير tu هو «tu as».'
			},
			{
				questionAr: 'اختر الجملة الصحيحة باستعمال الفعل «être»:',
				options: ['Le chat suis blanc.', 'Le chat es blanc.', 'Le chat est blanc.', 'Le chat a blanc.'],
				correctIndex: 2,
				diagnosticFeedback: [
					'suis تستعمل مع je فقط.',
					'es تستعمل مع tu فقط.',
					'ممتاز! Le chat = il، فنقول: «Le chat est blanc.» (القط أبيض).',
					'نستعمل être للوصف باللون وليس avoir.'
				],
				explanationAr: 'الفاعل «Le chat» يعوّض بـ «il»، وتصريف être معه هو «est».'
			}
		]
	}
];
