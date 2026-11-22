import type { ItalianInteractiveLessonData } from '../../types';
import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';
import {
	svgItalianConjugationChart,
	svgItalianGrammarMap,
	svgItalianTenseTimeline
} from '../../svg-italian';

export const LESSONS_2AS_LE_T1: ItalianInteractiveLessonData[] = [
	{
		id: 'ita_lesson_2as_le_t1_vita_quotidiana_scuola',
		slug: 'ita-2as-le-t1-vita-quotidiana-scuola',
		grade: '2as_le',
		yearSubjectId: 784,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr:
			'المجال الأول: الحياة اليومية، الأسرة، المدرسة، السكن وأساسيات النحو (Vita quotidiana, famiglia, scuola, casa e basi grammaticali)',
		order: 1,
		titleAr:
			'الحياة اليومية والأسرة والمدرسة والتقديم الشخصي (Vita quotidiana, famiglia e scuola)',
		objectives: [
			'إتقان التقديم الشخصي الكامل باللغة الإيطالية (الاسم، العمر، الأصل، السكن، الشعبة الدراسية واللغات)',
			'توظيف المعجم الأساسي للأسرة والحياة المدرسية اليومية والقيم التربوية البناءة داخل القسم والمكتبة',
			'ضبط قواعد النطق والإملاء الخاصة بالحروف المركبة الإيطالية (c/g, ch/gh, gn, gli, sci/sce)'
		],
		keywordsAr: [
			'presentazione personale',
			'famiglia e valori',
			'vita scolastica',
			'biblioteca e lingue',
			'pronuncia italiana',
			'التقديم الشخصي'
		],
		discover: {
			scenarioAr:
				'في أول حصة للغة الإيطالية للسنة الثانية ثانوي لغات أجنبية (2AS LE)، يقدم التلميذ كريم نفسه لزملائه قائلاً: «Ciao a tutti! Mi chiamo Karim, ho sedici anni, sono algerino di Costantina e abito con i miei genitori e mia sorella minore Salma. Frequento il secondo anno di Lingue Straniere: studio l’arabo, il francese, l’inglese e l’italiano. Ogni pomeriggio vado nella biblioteca del liceo per consultare il dizionario e fare i compiti.» تأمل اللوحة المرفقة واكتشف عناصر التقديم الشخصي والحياة المدرسية.',
			svg: renderLessonIllustration('ita_03_istruzione_lingue_biblioteca', {
				lang: 'it',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'استخرج من عبارة التقديم الأفعال التي استعملها كريم للتعبير عن اسمه وعمره وجنسيته وسكنه ودراسته.',
					hintAr: 'لاحظ الصيغ: Mi chiamo..., ho..., sono..., abito..., frequento... .',
					expectedInput: 'chiamarsi, avere, essere, abitare, frequentare / studiare',
					revealAr:
						'للتقديم الشخصي الأساسي في الإيطالية نستعمل: chiamarsi (للاسم: Mi chiamo Karim)، avere (للعمر: Ho sedici anni)، essere (للجنسية والأصل: Sono algerino di Costantina)، abitare / vivere (للسكن: Abito con i miei genitori)، و frequentare / studiare (للدراسة واللغات).'
				},
				{
					promptAr:
						'انطلاقاً من النص واللوحة المرفقة، صنف ست كلمات إيطالية بين حقل «الأسرة» وحقل «المدرسة والمكتبة».',
					hintAr: 'ابحث عن أفراد العائلة وأماكن الدراسة وأدواتها.',
					expectedInput: 'Famiglia: genitori, sorella | Scuola: liceo, biblioteca, dizionario, compiti',
					revealAr:
						'حقل الأسرة يشمل: i genitori (الوالدان)، la sorella (الأخت)، la famiglia (العائلة)؛ وحقل المدرسة والمكتبة يشمل: il liceo (الثانوية)، la biblioteca (المكتبة)، il dizionario (القاموس)، i compiti (الواجبات المدرسية)، le lingue straniere (اللغات الأجنبية).'
				},
				{
					promptAr:
						'لماذا نُطق حرف c في «ciao / dieci» ناعماً، بينما استعملنا «ch» في «mi chiamo / che»؟ وما قاعدة نطق «gn» و«gli»؟',
					hintAr: 'انظر إلى الحرف الذي يلي c أو g وإلى دور حرف h في الإيطالية.',
					expectedInput: 'c/g قبل e و i تنطق ناعمة، وتضاف h قبل e/i لتنطق صلبة',
					revealAr:
						'في الإيطالية، c و g تنطقان ناعمتين قبل e و i (*ciao, cena, giorno, gelato*)؛ وإذا أردنا النطق الصلب قبل e/i نضيف حرف h الصامت (*chiamo, chiave, ghiro, funghi*). كما يُنطق gn مثل ني (famiglia لا، بل *compagno*)، و gli مثل لْيِ (*famiglia, foglio*).'
				}
			]
		},
		summary: {
			rulesAr: [
				'بطاقة التقديم الشخصي (La presentazione personale): Mi chiamo / Il mio nome è... (الاسم)؛ Ho sedici / diciassette anni (العمر باستعمال avere دائماً)؛ Sono algerino/a, vengo da... (الجنسية والأصل)؛ Abito a... con la mia famiglia (السكن)؛ Frequento la seconda classe del liceo, indirizzo Lingue Straniere (المستوى والشعبة).',
				'معجم الأسرة والروابط الاجتماعية (La famiglia e i valori): i genitori (الوالدان)، il padre / la madre (الأب/الأم)، il fratello / la sorella (الأخ/الأخت)، i nonni (الأجداد)، gli zii (الأعمام/الأخوال)، i cugini (أبناء العم/الخال). القيم الأسرية: il rispetto (الاحترام)، la collaborazione (التعاون)، l’educazione (التهذيب)، l’onestà (الصدق).',
				'معجم المدرسة والحياة اليومية (La vita scolastica): il liceo (الثانوية)، l’aula (القسم)، la biblioteca (المكتبة)، il dizionario bilingue (القاموس الثنائي)، l’orario scolastico (الجدول الزمني)، le materie (المواد الدراسية)، i compiti (الواجبات)، la lettura (المطالعة)، l’impegno (الاجتهاد).',
				'قواعد النطق والإملاء الأساسية (Fonetica e ortografia): c/g + a, o, u (صلبة: *casa, gatto*)؛ c/g + e, i (ناعمة: *cento, giro*)؛ ch/gh + e, i (صلبة: *chiedere, ghiaccio*)؛ sc + e, i (ش: *scienza, scegliere*)؛ sch + e, i (سك: *scheda, schiena*)؛ gn (*compagno, lavagna*)؛ gli (*famiglia, consigli*).'
			],
			visualSvg: svgItalianGrammarMap({
				title: 'Presentazione, famiglia e vita scolastica (2AS LE)',
				rootLabel: 'Presentarsi in italiano',
				rootSub: 'Identità, famiglia, scuola e ortografia',
				width: 580,
				branches: [
					{
						label: 'Identità',
						rule: 'chiamarsi + essere + avere',
						example: 'Mi chiamo Karim, ho 16 anni.'
					},
					{
						label: 'Famiglia',
						rule: 'Parentela e rispetto',
						example: 'genitori, sorella, nonni'
					},
					{
						label: 'Scuola e studio',
						rule: 'Liceo e biblioteca',
						example: 'dizionario, compiti, lingue'
					},
					{
						label: 'Pronuncia chiave',
						rule: 'ch/gh vs c/g, gn, gli',
						example: 'chiamo, famiglia, compagno'
					}
				]
			}),
			visualCaptionAr: 'الخريطة المعرفية للتقديم الشخصي والأسرة والحياة المدرسية في الإيطالية',
			examples: [
				{
					problemAr:
						'Completa la presentazione di Nadia: «Buongiorno! Mi ...... (chiamare) Nadia, ...... (avere) diciassette anni, ...... (essere) di Tlemcen e ...... (frequentare) il secondo anno di Lingue Straniere.»',
					solutionAr:
						'«Buongiorno! Mi chiamo Nadia, ho diciassette anni, sono di Tlemcen e frequento il secondo anno di Lingue Straniere.»'
				},
				{
					problemAr:
						'Distingui la pronuncia dura da quella dolce in queste quattro parole: «chiedere, cena, scheda, scegliere».',
					solutionAr:
						'Suono duro (k / sk): chiedere (ch+i), scheda (sch+e). | Suono dolce (c / sc): cena (c+e), scegliere (sc+e).'
				}
			],
			watchOutAr:
				'احذر من خطأين متكررين في السنة الثانية ثانوي: (1) التعبير عن العمر بالفعل essere (لا تقل *Sono 16 anni* بل الصواب دائماً *Ho 16 anni* باستعمال avere)؛ (2) الخلط بين *la biblioteca* (مكتبة المطالعة والاستعارة في المدرسة أو المدينة) و *la libreria* (المكتبة التجارية لبيع الكتب والأدوات).'
		},
		practice: [
			{
				questionAr:
					'Quale frase esprime correttamente l’età, l’origine e il percorso scolastico di uno studente di 2AS LE?',
				options: [
					'Sono sedici anni, ho di Algeri e studio in libreria.',
					'Ho sedici anni, sono di Algeri e frequento il liceo di Lingue Straniere.',
					'Mi chiamo sedici anni, abito Algeri e faccio biblioteca.',
					'Abito sedici anni, vengo Algeri e sono un dizionario.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: نستخدم avere للعمر و essere للأصل، كما أن libreria تعني متجر بيع الكتب.',
					'ممتاز! التعبير الدقيق هو: Ho sedici anni (العمر بـ avere)، sono di Algeri (الأصل بـ essere di)، و frequento il liceo.',
					'خطأ: llamarsi/chiamarsi مخصص للاسم فقط، ويُشترط حرف الجر a قبل المدينة مع abitare.',
					'خطأ: الأفعال والأسماء غير متوافقة مع المعنى.'
				],
				explanationAr:
					'في اللغة الإيطالية يُعبر عن العمر بالفعل avere (Ho 16 anni)، وعن الأصل بالفعل essere + di (Sono di Algeri)، وعن الانتساب المدرسي بـ frequentare il liceo.'
			},
			{
				questionAr:
					'In quale gruppo tutte le parole contengono il suono duro /k/ o /g/ grazie alla lettera muta «h»?',
				options: [
					'ciao, gelato, scienza, giorno',
					'chiave, scheda, funghi, dialogo',
					'cena, pagina, scegliere, amici',
					'giardino, cinque, pesce, cugino'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: هذه الكلمات تحتوي على أصوات ناعمة أمام e و i دون حرف h.',
					'صحيح! chiave (ch), scheda (sch), funghi (gh) تحافظ على النطق الصلب بوجود h، و dialogo فيها g صلبة أمام o.',
					'خطأ: cena و pagina و scegliere و amici كلها بأصوات ناعمة.',
					'خطأ: giardino و cinque و pesce و cugino تحتوي على مقاطع ناعمة.'
				],
				explanationAr:
					'إضافة حرف h بعد c و g و sc قبل الحرفين e و i تحفظ النطق الصلب (/k/, /g/, /sk/) كما في chiave, scheda, funghi.'
			},
			{
				questionAr:
					'Che differenza di significato c’è tra «la biblioteca» e «la libreria» in italiano?',
				options: [
					'La biblioteca è il negozio dove si comprano i quaderni; la libreria è una stanza di casa.',
					'La biblioteca è il luogo dove si leggono e si prendono in prestito i libri; la libreria è il negozio dove si vendono i libri.',
					'Sono sinonimi identici in tutte le città.',
					'La biblioteca serve solo per lo sport e la libreria solo per mangiare.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: هذا عكس المعنى الحقيقي للكلمين.',
					'أحسنت! biblioteca = مكتبة المطالعة والاستعارة، بينما libreria = متجر بيع الكتب (أو رف الكتب في البيت).',
					'خطأ: بينهما فرق وظيفي واضح ويشكلان خلطاً شائعاً بسبب الفرنسية.',
					'خطأ: كلاهما مرتبطان بالكتب لا بالرياضة والطعام.'
				],
				explanationAr:
					'في الإيطالية: la biblioteca هي مكتبة القراءة والبحث والإعارة، أما la libreria فهي المكتبة التجارية التي تبيع الكتب.'
			}
		]
	},
	{
		id: 'ita_lesson_2as_le_t1_presente_verbi_riflessivi',
		slug: 'ita-2as-le-t1-presente-verbi-riflessivi',
		grade: '2as_le',
		yearSubjectId: 784,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr:
			'المجال الأول: الحياة اليومية، الأسرة، المدرسة، السكن وأساسيات النحو (Vita quotidiana, famiglia, scuola, casa e basi grammaticali)',
		order: 2,
		titleAr:
			'المضارع الإخباري والأفعال الانعكاسية في الروتين اليومي (Presente indicativo e verbi riflessivi)',
		objectives: [
			'تصريف الأفعال القياسية للمجموعات الثلاث (-are, -ere, -ire) بما فيها أفعال المجموعة الثالثة ذات اللاحقة -isc- في زمن المضارع',
			'إتقان تصريف الأفعال غير القياسية الأساسية (essere, avere, fare, andare, venire, dire, uscire, potere, dovere, volere)',
			'توظيف الأفعال الانعكاسية (alzarsi, prepararsi, svegliarsi, vestirsi) مع الضمائر الانعكاسية المناسبة لوصف الروتين اليومي'
		],
		keywordsAr: [
			'presente indicativo',
			'coniugazioni -are -ere -ire',
			'verbi in -isc-',
			'verbi riflessivi',
			'alzarsi e prepararsi',
			'المضارع والأفعال الانعكاسية'
		],
		discover: {
			scenarioAr:
				'تأمل مذكرة أمينة اليومية عن تنظيم وقتها: «Ogni mattina mi sveglio alle sei e mezza, mi alzo subito, mi lavo la faccia e faccio colazione con mia madre. Poi mi preparo con ordine e vado al liceo a piedi. In classe leggiamo testi interessanti, capiamo le regole e finiamo gli esercizi in tempo. La sera riordino i quaderni e aiuto i miei fratelli.» لاحظ كيف يتغير آخر الفعل مع كل ضمير، وكيف ترافق الضمائر الانعكاسية أفعال الروتين.',
			svg: svgItalianTenseTimeline({
				title: 'Abitudini e azioni attuali',
				tenseName: 'Presente Indicativo',
				formula: 'radice + desinenze (-o, -i, -a/-e, -iamo, -ate/-ete/-ite, -ano/-ono)',
				activeZone: 'present',
				example: 'Ogni giorno mi alzo presto, studio e finisco i compiti.',
				markers: 'ogni giorno, sempre, di solito, spesso, adesso, oggi',
				width: 580
			}),
			steps: [
				{
					promptAr:
						'استخرج من النص فعلين انعكاسيين (verbi riflessivi) مع الضمير المصاحب لهما، وحدد مصدرهما قبل التصريف.',
					hintAr: 'ابحث عن الضمير mi قبل الفعل في وصف الصباح.',
					expectedInput: 'mi sveglio (svegliarsi), mi alzo (alzarsi), mi lavo (lavarsi), mi preparo (prepararsi)',
					revealAr:
						'الأفعال الانعكاسية في النص هي: mi sveglio (من svegliarsi)، mi alzo (من alzarsi)، mi lavo (من lavarsi)، و mi preparo (من prepararsi). يتكوّن المصدر بحذف حرف e الأخير وإضافة -si، وعند التصريف نضع الضمير (mi, ti, si, ci, vi, si) قبل الفعل.'
				},
				{
					promptAr:
						'انظر إلى الفعلين «capiamo» (من capire) و«finiamo» (من finire) في النص: ماذا يحدث لهذين الفعلين مع الضمائر (io, tu, lui/lei, loro)؟',
					hintAr: 'تذكر مجموعة الأفعال التي تضيف مقطع -isc- في المفرد والغائب جمع.',
					expectedInput: 'تضيف -isc- مع io/tu/lui/loro (capisco, capisci...) وتسقط في noi/voi (capiamo, capite)',
					revealAr:
						'أفعال مثل capire, finire, preferire, costruire, pulire تأخذ اللاحقة -isc- بين الجذر والنهاية في المفرد الثلاثة والغائب جمع (finisco, finisci, finisce, finiscono)، وتعود إلى التصريف العادي مع noi و voi (finiamo, finite)!'
				},
				{
					promptAr:
						'ما الصيغة الأصلية للفعلين غير المنتظمين «faccio» و«vado» في النص، وكيف يتصرفان مع noi و loro؟',
					hintAr: 'الأول بمعنى يفعل/يعمل والثاني بمعنى يذهب.',
					expectedInput: 'fare (noi facciamo, loro fanno) و andare (noi andiamo, loro vanno)',
					revealAr:
						'«faccio» من الفعل fare (faccio, fai, fa, facciamo, fate, fanno)؛ و«vado» من الفعل andare (vado, vai, va, andiamo, andate, vanno).'
				}
			]
		},
		summary: {
			rulesAr: [
				'المضارع الإخباري القياسي (Presente regolare): المجموعة الأولى `-are` (parlare: *parlo, parli, parla, parliamo, parlate, parlano*)؛ المجموعة الثانية `-ere` (scrivere: *scrivo, scrivi, scrive, scriviamo, scrivete, scrivono*)؛ المجموعة الثالثة `-ire` نوعان: قياسي (partire: *parto, parti, parte, partiamo, partite, partono*) ومجموعة `-isc-` (finire, capire, preferire, pulire: *finisco, finisci, finisce, finiamo, finite, finiscono*).',
				'الأفعال غير القياسية الأساسية (Verbi irregolari frequenti): `essere` (*sono, sei, è, siamo, siete, sono*)؛ `avere` (*ho, hai, ha, abbiamo, avete, hanno*)؛ `andare` (*vado, vai, va, andiamo, andate, vanno*)؛ `fare` (*faccio, fai, fa, facciamo, fate, fanno*)؛ `venire` (*vengo, vieni, viene, veniamo, venite, vengono*)؛ `uscire` (*esco, esci, esce, usciamo, uscite, escono*)؛ `dire` (*dico, dici, dice, diciamo, dite, dicono*).',
				'الأفعال الناقصة (Verbi modali + infinito): `dovere` (*devo, devi, deve, dobbiamo, dovete, devono*) للوجوب؛ `potere` (*posso, puoi, può, possiamo, potete, possono*) للاستطاعة؛ `volere` (*voglio, vuoi, vuole, vogliamo, volete, vogliono*) للرغبة — يتبعها دائماً الفعل الثاني في المصدر (*Devo studiare*).',
				'الأفعال الانعكاسية (Verbi riflessivi): تستعمل الضمائر `mi, ti, si, ci, vi, si` وتدل على أن الفعل يقع على الفاعل نفسه، مثل `alzarsi` (*mi alzo, ti alzi, si alza, ci alziamo, vi alzate, si alzano*)، و`prepararsi`، و`vestirsi`، و`svegliarsi`. مع الأفعال الناقصة يمكن وضع الضمير قبل الفعل الناقص أو لصقه بنهاية المصدر (*Mi devo alzare* أو *Devo alzarmi*).'
			],
			visualSvg: svgItalianConjugationChart({
				title: 'Presente Indicativo e Verbi Riflessivi',
				subtitle: 'Coniugazioni regolari, gruppo -isc- e riflessivi',
				width: 580,
				columns: [
					{
						header: 'Regolari (-are/-ere)',
						rule: '-o, -i, -a/-e, -iamo, -ate/-ete, -ano/-ono',
						examples: 'parliamo, scrivono'
					},
					{
						header: 'Gruppo -isc- (-ire)',
						rule: 'Solo io, tu, lui/lei, loro',
						examples: 'capisco, finisci, capiamo'
					},
					{
						header: 'Riflessivi (alzarsi)',
						rule: 'mi, ti, si, ci, vi, si + verbo',
						examples: 'mi alzo, ci prepariamo'
					}
				]
			}),
			visualCaptionAr: 'خلاصة تصريف المضارع الإخباري والأفعال الانعكاسية في مستوى 2AS LE',
			examples: [
				{
					problemAr:
						'Coniuga i verbi tra parentesi al Presente Indicativo: «La mattina io e mio fratello (svegliarsi) alle sei, (fare) colazione insieme e poi (andare) al liceo.»',
					solutionAr:
						'«La mattina io e mio fratello ci svegliamo alle sei (noi), facciamo colazione insieme e poi andiamo al liceo.»'
				},
				{
					problemAr:
						'Completa con il verbo in -isc- o irregolare adatto: «Gli studenti (preferire) studiare in silenzio e Salma (uscire) dalla biblioteca alle quattro.»',
					solutionAr:
						'«Gli studenti preferiscono studiare in silenzio e Salma esce dalla biblioteca alle quattro.»'
				}
			],
			watchOutAr:
				'احذر من ثلاثة أخطاء شائعة في تصريف المضارع: (1) إقحام `-isc-` في `noi` و `voi` (الصواب *noi finiamo, voi capite* وليس *finisciamo*)؛ (2) نسيان تحويل الحرف e إلى i في `io/tu/lui` لبعض الأفعال أو نسيان الجذر المتغير في `uscire` (*esco* لا *usco*)؛ (3) الخلط في الضمائر الانعكاسية عندما يكون الفاعل اسماً جمعاً مثل *i miei amici e io* (= noi -> *ci prepariamo* وليس *si prepariamo*).'
		},
		practice: [
			{
				questionAr:
					'Quale frase contiene la coniugazione corretta del verbo «finire» (-isc-) al Presente Indicativo?',
				options: [
					'Noi finisciamo gli esercizi e voi finiscite il testo.',
					'Noi finiamo gli esercizi e gli studenti finiscono il testo.',
					'Io fino i compiti e tu fini presto.',
					'Loro finono i compiti e noi finimo presto.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: اللاحقة -isc- لا تدخل أبداً على ضميري noi و voi.',
					'ممتاز! تسقط -isc- مع noi (finiamo) وتظهر مع loro (finiscono).',
					'خطأ: الفعل finire يأخذ -isc- مع io و tu (finisco, finisci).',
					'خطأ: صيغ التصريف لا تحترم نهايات المجموعة الثالثة ولا -isc-.'
				],
				explanationAr:
					'الأفعال ذات اللاحقة -isc- مثل finire و capire تأخذ -isc- في (io, tu, lui/lei, loro) وتسقطها في (noi, voi): finiamo, finite.'
			},
			{
				questionAr:
					'Completa correttamente la frase sulla routine quotidiana: «Mio fratello e io ...... alle sei e mezzo e ...... subito per la scuola.»',
				options: [
					'si svegliamo / si prepariamo',
					'ci svegliamo / ci prepariamo',
					'mi sveglio / vi preparate',
					'ci svegliate / ci preparano'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفاعل «Mio fratello e io» يعادل noi ويأخذ الضمير ci وليس si.',
					'أحسنت! مع الفاعل نحن (noi) نستعمل الضمير الانعكاسي ci ونهاية -iamo.',
					'خطأ: الضمائر لا تطابق الفاعل الجمع نحن.',
					'خطأ: نهايات الفعل (-ate, -ano) لا تطابق الضمير ci.'
				],
				explanationAr:
					'عبارة «Mio fratello e io» تعني «نحن» (noi)، فيطابقها الضمير الانعكاسي ci وتصريف الفعل بـ -iamo.'
			},
			{
				questionAr:
					'Scegli la serie che riunisce soltanto forme corrette di verbi irregolari per la 1ª persona singolare (io) al Presente:',
				options: [
					'io ando, io facio, io usco, io dico',
					'io vado, io faccio, io esco, io dico',
					'io vengo, io poto, io volo, io sapo',
					'io sono, io ho, io ando, io venio'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الصيغ القياسية المفترضة خاطئة لأفعال andare و fare و uscire.',
					'صحيح! vado (andare)، faccio (fare)، esco (uscire)، dico (dire) كلها صيغ سليمة.',
					'خطأ: تصريف potere و volere و sapere هو posso, voglio, so.',
					'خطأ: تصريف andare و venire هو vado و vengo.'
				],
				explanationAr:
					'الأفعال غير القياسية الأساسية في المفرد المتكلم هي: vado, faccio, esco, dico, vengo, posso, voglio, devo, so.'
			}
		]
	},
	{
		id: 'ita_lesson_2as_le_t1_articoli_preposizioni_semplici_articolate',
		slug: 'ita-2as-le-t1-articoli-preposizioni-semplici-articolate',
		grade: '2as_le',
		yearSubjectId: 784,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr:
			'المجال الأول: الحياة اليومية، الأسرة، المدرسة، السكن وأساسيات النحو (Vita quotidiana, famiglia, scuola, casa e basi grammaticali)',
		order: 3,
		titleAr:
			'أدوات التعريف والتنكير وحروف الجر البسيطة والمركبة (Articoli e preposizioni semplici e articolate)',
		objectives: [
			'التمييز الدقيق بين أدوات التعريف المذكرة والمؤنثة مفرداً وجمعاً (il/lo/la/l’ -> i/gli/le) حسب الحرف الأول من الكلمة',
			'استعمال أدوات التنكير (un, uno, una, un’) دون الوقوع في خطأ الفاصلة العليا مع المذكر المبدوء بحرف متحرك',
			'إتقان تركيب حروف الجر البسيطة (di, a, da, in, con, su, per, tra, fra) وحروف الجر المركبة مع أدوات التعريف (del, al, dal, nel, sul...)'
		],
		keywordsAr: [
			'articoli determinativi',
			'articoli indeterminativi',
			'preposizioni semplici',
			'preposizioni articolate',
			'il lo la l’ i gli le',
			'أدوات التعريف وحروف الجر'
		],
		discover: {
			scenarioAr:
				'اقرأ وصف قاعة الدراسة والمكتبة في بداية الفصل الأول: «Nello zaino di Yassin ci sono un libro di grammatica, uno strumento da disegno, un orologio e un’agenda. Sul tavolo della biblioteca c’è lo schedario degli studenti, e alle otto i compagni entrano nell’aula con l’insegnante d’italiano.» تأمل الكلمات المسطرة والمركبات مثل «Nello», «della», «degli», «alle», «nell’».',
			svg: svgItalianConjugationChart({
				title: 'Articoli determinativi e indeterminativi',
				subtitle: 'Scelta secondo la lettera iniziale della parola',
				width: 580,
				columns: [
					{
						header: 'Maschile consonante',
						rule: 'il -> i | un',
						examples: 'il libro / i libri / un libro'
					},
					{
						header: 'Maschile s+cons, z, gn',
						rule: 'lo -> gli | uno',
						examples: 'lo zaino / gli zaini / uno zaino'
					},
					{
						header: 'Vocale (M vs F)',
						rule: 'l’ -> gli/le | un vs un’',
						examples: 'un amico / un’amica'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'لماذا استعملنا «uno» و«lo» مع كلمتي zaino و schedario، بينما استعملنا «un» مع libro و orologio و «un’» مع agenda؟',
					hintAr: 'لاحظ الحرف أو المقطع الذي تبدأ به كل كلمة وجنسها النحوي.',
					expectedInput: 'zaino و schedario مذكر مبدوء بـ z و s+consonante؛ libro مذكر بحرف ساكن؛ orologio مذكر بحرف متحرك بدون فاصلة؛ agenda مؤنث بحرف متحرك مع فاصلة',
					revealAr:
						'في المذكر: نستعمل `lo / uno` (وفي الجمع `gli`) قبل z أو s متبوعة بساكن أو gn/ps/x/y؛ ونستعمل `l’ / un` (بلا فاصلة عليا!) قبل الحرف المتحرك؛ و`il / un` قبل بقية الحروف الساكنة. أما في المؤنث فنستعمل `la / una` قبل الساكن، و`l’ / un’` (بالفاصلة العليا) قبل الحرف المتحرك.'
				},
				{
					promptAr:
						'فكّك حروف الجر المركبة الآتية من النص إلى حرف جر بسيط + أداة تعريف: «nello»، «della»، «degli»، «alle»، «nell’».',
					hintAr: 'تذكر حروف الجر الخمسة التي تندمج إلزامياً مع أداة التعريف: di, a, da, in, su.',
					expectedInput: 'nello = in + lo | della = di + la | degli = di + gli | alle = a + le | nell’ = in + l’',
					revealAr:
						'الحروف الخمسة (`di, a, da, in, su`) تتحد إلزامياً مع أداة التعريف التالية فتتحول إلى حروف جر مركبة: `in + lo = nello`، `di + la = della`، `di + gli = degli`، `a + le = alle`، `in + l’ = nell’`.'
				},
				{
					promptAr:
						'لماذا بقي حرف الجر «con» منفصلاً في «con l’insegnante» و«di» منفصلاً في «un libro di grammatica»؟',
					hintAr: 'هل يوجد أداة تعريف بعد di في «libro di grammatica»؟ وما وضع الحروف con/per/tra/fra؟',
					expectedInput: 'di grammatica اسم نكرة دون أداة تعريف؛ و con لا يندمج عادة في الإيطالية الحديثة',
					revealAr:
						'لا يتحول حرف الجر إلى مركب إلا عند وجود أداة تعريف بعده (un libro di grammatica لا أداة تعريف فيه)، كما أن الحروف `con, per, tra, fra` تبقى في الإيطالية المعاصرة منفصلة عن أداة التعريف (ما عدا col أحياناً بمعنى con + il).'
				}
			]
		},
		summary: {
			rulesAr: [
				'أدوات التعريف (Articoli determinativi): للمذكر المفرد: `il` (أمام ساكن عادي -> جمع `i`)؛ `lo` (أمام s+ساكن، z، gn، ps، x، y -> جمع `gli`)؛ `l’` (أمام حرف متحرك -> جمع `gli`). للمؤنث المفرد: `la` (أمام ساكن -> جمع `le`)؛ `l’` (أمام حرف متحرك -> جمع `le`).',
				'أدوات التنكير (Articoli indeterminativi): للمذكر: `un` أمام ساكن عادي أو حرف متحرك (*un quaderno, un albero*)، و`uno` أمام s+ساكن، z، gn، ps (*uno studente, uno zaino*). للمؤنث: `una` أمام ساكن (*una casa*)، و`un’` أمام حرف متحرك (*un’aula, un’ora*).',
				'حروف الجر البسيطة (Preposizioni semplici): `di` (ملكية/مادة/أصل: *Sono di Orano*)، `a` (اتجاه/مدينة/ساعة: *Vado a scuola, alle otto*)، `da` (من/عند شخص: *Vengo da Algeri, vado dal medico*)، `in` (داخل/بلد/وسيلة نقل: *Vivo in Algeria, vado in treno*)، `con` (مع)، `su` (فوق/موضوع)، `per` (لأجل/نحو)، `tra / fra` (بين/خلال مدة).',
				'حروف الجر المركبة (Preposizioni articolate): تندمج `di (-> de-), a, da, in (-> ne-), su` مع `il, lo, l’, la, i, gli, le` هكذا: `del, dello, dell’, della, dei, degli, delle`؛ `al, allo, all’, alla, ai, agli, alle`؛ `dal, dallo...`؛ `nel, nello, nell’, nella, nei, negli, nelle`؛ `sul, sullo, sull’, sulla, sui, sugli, sulle`.'
			],
			visualSvg: svgItalianGrammarMap({
				title: 'Preposizioni semplici e articolate',
				rootLabel: 'Preposizione + Articolo = Articolata',
				rootSub: 'Solo di, a, da, in, su si fondono sempre',
				width: 580,
				branches: [
					{
						label: 'DI -> DE-',
						rule: 'Possesso e argomento',
						example: 'del libro, della scuola, degli'
					},
					{
						label: 'A -> A-',
						rule: 'Orario, luogo e termine',
						example: 'al liceo, allo stadio, alle 8'
					},
					{
						label: 'IN -> NE-',
						rule: 'Stato o moto in luogo',
						example: 'nel cortile, nello zaino, nell’aula'
					},
					{
						label: 'DA / SU',
						rule: 'Origine o superficie',
						example: 'dal nonno, sul tavolo, sulla'
					}
				]
			}),
			visualCaptionAr: 'خريطة حروف الجر البسيطة والمركبة الأساسية في الإيطالية',
			examples: [
				{
					problemAr:
						'Scegli l’articolo giusto (determinativo e indeterminativo) per: «studente, ora, amico, zaini (pl.)».',
					solutionAr:
						'lo studente / uno studente | l’ora / un’ora | l’amico / un amico (senza apostrofo!) | gli zaini.'
				},
				{
					problemAr:
						'Unisci la preposizione all’articolo: «a) (in + la) biblioteca | b) (di + gli) studenti | c) (su + il) quaderno | d) (a + lo) stadio».',
					solutionAr:
						'a) nella biblioteca | b) degli studenti | c) sul quaderno | d) allo stadio.'
				}
			],
			watchOutAr:
				'القاعدة الذهبية للفاصلة العليا في التنكير: لا نضع الفاصلة العليا أبداً مع المذكر المبدوء بحرف متحرك! نكتب «un amico» و«un esercizio» و«un orologio» بلا فاصلة لأن `un` مذكر مستقل؛ بينما المؤنث هو الذي يُحذف منه حرف a فيصبح «un’amica» و«un’aula» بالفاصلة العليا!'
		},
		practice: [
			{
				questionAr:
					'Quale serie usa correttamente gli articoli indeterminativi e determinativi davanti ai sostantivi indicati?',
				options: [
					'un’amico, un studente, il zaino, i studenti',
					'un amico, uno studente, lo zaino, gli studenti',
					'uno amico, un studente, lo zaino, i studenti',
					'un amico, un’ora, il zaini, gli amici'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: un amico بلا فاصلة، و studente/zaino يأخذان uno/lo وفي الجمع gli.',
					'ممتاز! un amico (مذكر دون فاصلة)، uno studente و lo zaino و gli studenti (s+ساكن و z).',
					'خطأ: uno لا تأتي قبل الحرف المتحرك، و i لا تأتي قبل s+ساكن.',
					'خطأ: لا نجمع il zaini (الصواب gli zaini).'
				],
				explanationAr:
					'المذكر المبدوء بحرف متحرك يأخذ un بلا فاصلة عليا، والكلمات المبدوءة بـ s+ساكن أو z تأخذ uno/lo في المفرد و gli في الجمع.'
			},
			{
				questionAr:
					'Completa con le preposizioni articolate esatte: «I libri ...... (di + gli) alunni sono ...... (su + il) banco ...... (in + la) nuova aula.»',
				options: [
					'dei / sullo / nella',
					'degli / sul / nella',
					'di gli / su il / in la',
					'delli / sul / nella'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: di + gli تصبح degli، و su + il تصبح sul.',
					'أحسنت! di + gli = degli، su + il = sul، in + la = nella.',
					'خطأ: لا تبقى هذه الحروف منفصلة أمام أداة التعريف.',
					'خطأ: الصيغة «delli» غير موجودة في الإيطالية.'
				],
				explanationAr:
					'حروف الجر الخمسة (di, a, da, in, su) تندمج إجبارياً مع أداة التعريف: degli (di+gli), sul (su+il), nella (in+la).'
			},
			{
				questionAr:
					'Quale frase contiene una preposizione geografica semplice corretta?',
				options: [
					'Vivo a Algeria e studio in Costantina.',
					'Vivo in Algeria e studio a Costantina.',
					'Vivo nel Costantina e studio nella Italia.',
					'Vado in Roma e abito a Italia.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الدولة تأخذ in والمدينة تأخذ a.',
					'ممتاز! نستعمل in مع أسماء الدول والمناطق (in Algeria, in Italia)، و a مع أسماء المدن (a Costantina, a Roma).',
					'خطأ: المدن والدول في الاستعمال العادي بلا نعت لا تأخذ حروف جر مركبة.',
					'خطأ: عكس الترتيب بين المدينة والدولة.'
				],
				explanationAr:
					'في التعبير عن المكان مع الأسماء الجغرافية المجردة: `in` للبلدان والقارات والجزر الكبرى (`in Algeria, in Italia`) و`a` للمدن (`a Costantina, a Roma`).'
			}
		]
	},
	{
		id: 'ita_lesson_2as_le_t1_casa_citta_abitudini',
		slug: 'ita-2as-le-t1-casa-citta-abitudini',
		grade: '2as_le',
		yearSubjectId: 784,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr:
			'المجال الأول: الحياة اليومية، الأسرة، المدرسة، السكن وأساسيات النحو (Vita quotidiana, famiglia, scuola, casa e basi grammaticali)',
		order: 4,
		titleAr:
			'المنزل والحي وعادات الدراسة البناءة (La casa, il quartiere e le buone abitudini di studio)',
		objectives: [
			'وصف غرف المنزل ومرافق الحي والمدينة باستعمال «c’è / ci sono» وحروف وظروف المكان بدقة',
			'إتقان قواعد المطابقة في النوع والعدد للأسماء والصفات (-o/-a/-e و -ca/-ga -> -che/-ghe)',
			'التعبير عن العادات الدراسية البناءة وتنظيم الوقت بين المراجعة والقراءة والراحة السليمة'
		],
		keywordsAr: [
			'casa e stanze',
			'quartiere e città',
			'c’è e ci sono',
			'accordo nomi aggettivi',
			'abitudini di studio',
			'المنزل والحي'
		],
		discover: {
			scenarioAr:
				'يصف طارق بيته وحيه في حوار مدرسي: «La mia famiglia abita in un appartamento luminoso al secondo piano. In casa ci sono un soggiorno accogliente, tre camere da letto, una cucina ordinata e un balcone soleggiato. Nella mia stanza c’è una scrivania vicino alla finestra. Nel quartiere, davanti alla moschea c’è un giardino pubblico e accanto alla scuola ci sono una biblioteca silenziosa e due fermate dell’autobus.» تأمل التركيبين «c’è» و«ci sono» ومطابقة الصفات.',
			svg: svgItalianGrammarMap({
				title: 'Casa, quartiere e buone abitudini (2AS LE)',
				rootLabel: 'Descrivere spazi e abitudini',
				rootSub: 'Esistenza, posizione e concordanza',
				width: 580,
				branches: [
					{
						label: 'C’è / Ci sono',
						rule: 'Singolare vs Plurale',
						example: 'C’è un tavolo. Ci sono sedie.'
					},
					{
						label: 'La casa',
						rule: 'Stanze e arredamento',
						example: 'soggiorno, camera, scrivania'
					},
					{
						label: 'Il quartiere',
						rule: 'Preposizioni di luogo',
						example: 'vicino a, davanti a, tra'
					},
					{
						label: 'Accordo',
						rule: 'Genere e numero',
						example: 'case pulite, quartieri verdi'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'متى استعمل طارق «c’è» ومتى استعمل «ci sono» في وصف البيت والحي؟',
					hintAr: 'انظر إلى عدد الاسم المذكور بعد كل تركيب (مفرد أم جمع).',
					expectedInput: 'c’è للمفرد (una scrivania, un giardino) و ci sono للجمع أو لعدة أشياء معطوفة',
					revealAr:
						'نستعمل `c’è` (يوجد) مع الاسم المفرد أو غير المعدود (*C’è una scrivania, c’è una biblioteca*)، ونستعمل `ci sono` (يوجد للجمع) مع الاسم الجمع أو عند تعداد عدة عناصر (*Ci sono tre camere*, *Ci sono un soggiorno, tre camere e una cucina*).'
				},
				{
					promptAr:
						'استخرج من النص ثلاثة ظروف مكانية مسبوقة أو متبوعة بحرف جر لوصف موقع المرافق في الحي.',
					hintAr: 'ابحث عن الكلمات التي تحدد القرب أو الجهة بالنسبة للنافذة والمسجد والمدرسة.',
					expectedInput: 'vicino alla finestra, davanti alla moschea, accanto alla scuola',
					revealAr:
						'محددات المكان الشائعة في وصف البيت والحي هي: `vicino a` (قرب)، `lontano da` (بعيد عن)، `davanti a` (أمام)، `dietro (a)` (خلف)، `accanto a` (بجانب)، `tra / fra` (بين)، `di fronte a` (مقابل).'
				},
				{
					promptAr:
						'حوّل العبارات الآتية من المفرد إلى الجمع مع مراعاة نهاية الاسم والصفة: «una stanza luminosa»، «un quartiere verde»، «una biblioteca antica».',
					hintAr: 'تذكر قاعدة -ca في الجمع المؤنث (-che) والصفات المنتهية بـ -e (-i).',
					expectedInput: 'stanze luminose, quartieri verdi, biblioteche antiche',
					revealAr:
						'في الجمع: «una stanza luminosa -> stanze luminose» (-a تصبح -e)؛ «un quartiere verde -> quartieri verdi» (-e تصبح -i في المذكر والمؤنث)؛ و«una biblioteca antica -> biblioteche antiche» (لأن -ca/-ga تتحول في الجمع المؤنث إلى -che/-ghe للحفاظ على النطق الصلب).'
				}
			]
		},
		summary: {
			rulesAr: [
				'التعبير عن الوجود في المكان: `c’è` (للمفرد: *Nel quartiere c’è una piazza*)، و`ci sono` (للجمع: *In casa ci sono molti libri*). في النفي: `Non c’è rumore` / `Non ci sono macchine`. في السؤال: *Che cosa c’è vicino a casa tua?*',
				'معجم البيت والحي (La casa e il quartiere): l’appartamento (الشقة)، l’ingresso (المدخل)، il soggiorno (غرفة الجلوس)، la cucina (المطبخ)، la camera da letto (غرفة النوم)، il bagno (الحمام)، la scrivania (المكتب)، la libreria (خزانة الكتب)، la piazza (الساحة)، il parco / il giardino pubblico (الحديقة العامة)، la farmacia (الصيدلية)، la stazione (المحطة).',
				'محددات المكان (Preposizioni e locuzioni di luogo): `vicino a` (قرب) عكسها `lontano da` (بعيد عن)؛ `davanti a` (أمام) عكسها `dietro a` (خلف)؛ `sopra` (فوق) عكسها `sotto` (تحت)؛ `dentro` (داخل) عكسها `fuori` (خارج)؛ `a destra di` (عن يمين) و `a sinistra di` (عن يسار).',
				'قواعد الجمع ومطابقة الصفات: الأسماء/الصفات بـ `-o` -> `-i`؛ بـ `-a` -> `-e` (أو `-i` إن كانت أسماء مذكر بـ -a مثل *il programma -> i programmi*)؛ بـ `-e` -> `-i` (*studente intelligente -> studenti intelligenti*). الأسماء المنتهية بـ `-ca/-ga` تأخذ دائماً `-che/-ghe` في الجمع المؤنث (*amica -> amiche*, *biblioteca -> biblioteche*)؛ والأسماء المنبورة على الآخر مثل *la città* لا تتغير في الجمع (*le città*).'
			],
			visualSvg: svgItalianConjugationChart({
				title: 'Concordanza di nomi e aggettivi in italiano',
				subtitle: 'Singolare -> Plurale e particolarità ortografiche',
				width: 580,
				columns: [
					{
						header: 'Tipo -o / -a',
						rule: '-o -> -i | -a -> -e',
						examples: 'libro nuovo -> libri nuovi'
					},
					{
						header: 'Tipo -e (M e F)',
						rule: 'Sempre -i al plurale',
						examples: 'città grande -> città grandi'
					},
					{
						header: 'Ortografia -ca/-ga',
						rule: 'Prendono la h: -che/-ghe',
						examples: 'biblioteca antica -> biblioteche antiche'
					}
				]
			}),
			visualCaptionAr: 'دليل مطابقة الأسماء والصفات وحالات الجمع الخاصة في الإيطالية',
			examples: [
				{
					problemAr:
						'Completa con «c’è» o «ci sono» e la preposizione di luogo adatta: «Nella mia camera ...... una libreria moderna e ...... alla scrivania ...... due sedie.»',
					solutionAr:
						'«Nella mia camera c’è una libreria moderna e vicino (o accanto) alla scrivania ci sono due sedie.»'
				},
				{
					problemAr:
						'Volgi al plurale: «una città storica», «una strada pulita e lunga», «un quartiere tranquillo e verde».',
					solutionAr:
						'«città storiche» (città resta invariabile, storica -> storiche), «strade pulite e lunghe» (lunga -> lunghe), «quartieri tranquilli e verdi».'
				}
			],
			watchOutAr:
				'احذر من حرف الجر المرافق لمحددات المكان: نقول `lontano DA` (*lontano dal centro* بعيد عن المركز) وليس `a`؛ بينما نقول `vicino A`, `davanti A`, `accanto A`, `di fronte A` (*vicino alla scuola, davanti al parco*). كما لا تتغير الكلمات المختومة بحرف متحرك منبور مثل *la città -> le città*، *l’università -> le università*.'
		},
		practice: [
			{
				questionAr:
					'Quale frase completa correttamente lo spazio con «c’è / ci sono» e le preposizioni di luogo?',
				options: [
					'Nel quartiere c’è molti negozi e la mia scuola è vicino dal parco.',
					'Nel quartiere ci sono molti negozi e la mia scuola è vicino al parco.',
					'Nel quartiere ci sono una moschea e la fermata è lontano al centro.',
					'Nel quartiere c’è tre giardini e la biblioteca è accanto del liceo.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: molti negozi جمع فتأخذ ci sono، و vicino تأخذ a وليس da.',
					'ممتاز! ci sono مع الجمع (molti negozi)، و vicino a (vicino al parco) مطابقة للقاعدة.',
					'خطأ: una moschea مفرد (c’è)، و lontano تأخذ da وليس a.',
					'خطأ: tre giardini جمع (ci sono)، و accanto تأخذ a وليس di.'
				],
				explanationAr:
					'تأخذ `c’è` المفرد و`ci sono` الجمع؛ ويستعمل حرف الجر `a` بعد vicino/accanto/davanti بينما يستعمل `da` بعد lontano.'
			},
			{
				questionAr:
					'Scegli il plurale corretto delle seguenti espressioni: «la biblioteca pubblica», «la città antica», «la strada lunga».',
				options: [
					'le bibliotece pubbliche, le città antici, le strade lunge',
					'le biblioteche pubbliche, le città antiche, le strade lunghe',
					'le biblioteche pubblici, le città antiche, le strade lunghi',
					'i biblioteche pubbliche, le cittài antiche, le strade lunghe'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: سقط حرف h في bibliotece و lunge وتغير نوع antici.',
					'صحيح! -ca/-ga تتحول في المؤنث الجمع إلى -che/-ghe، وتبقى città ثابتة دون تغيير.',
					'خطأ: الجمع المؤنث لا ينتهي بـ -i في questa صفة.',
					'خطأ: أداة جمع المؤنث هي le ولا تضاف i إلى città.'
				],
				explanationAr:
					'للحفاظ على النطق الصلب في الجمع المؤنث، تتحول -ca/-ga إلى -che/-ghe (biblioteche pubbliche, antiche, lunghe) وتبقى città ثابتة.'
			},
			{
				questionAr:
					'Quale abitudine descrive meglio uno studente organizzato e responsabile di 2AS LE?',
				options: [
					'Rimandare sempre i compiti a mezzanotte davanti a molti schermi.',
					'Tenere la scrivania in ordine, leggere ogni giorno in un luogo tranquillo e dividere il tempo tra studio e riposo.',
					'Dimenticare il dizionario a casa e studiare solo il giorno prima dell’esame.',
					'Passare tutto il pomeriggio senza pianificazione né lettura.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: السهر المتأخر أمام الشاشات يضعف التركيز.',
					'ممتاز! تنظيم المكتب والمطالعة اليومية وتوزيع الوقت بين الدراسة والراحة هي ركائز النجاح.',
					'خطأ: التأجيل لليلة الامتحان عادة سلبية.',
					'خطأ: غياب التخطيط والمطالعة يعيق التحصيل.'
				],
				explanationAr:
					'التفوق الدراسي يقوم على الانضباط اليومي وتنظيم فضاء الدراسة والموازنة بين المراجعة والراحة.'
			}
		]
	}
];
