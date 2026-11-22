import type { ItalianInteractiveLessonData } from '../../types';
import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';
import {
	svgItalianConjugationChart,
	svgItalianGrammarMap,
	svgItalianTenseTimeline
} from '../../svg-italian';

export const LESSONS_2AS_LE_T2: ItalianInteractiveLessonData[] = [
	{
		id: 'ita_lesson_2as_le_t2_alimentazione_sana_sport',
		slug: 'ita-2as-le-t2-alimentazione-sana-sport',
		grade: '2as_le',
		yearSubjectId: 784,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr:
			'المجال الثاني: التغذية الصحية الحلال، الأسفار في المتوسط وأزمنة الماضي والصفات (Alimentazione sana, viaggi nel Mediterraneo, passato e comparativi)',
		order: 1,
		titleAr:
			'التغذية الصحية الحلال والرياضة والحرف اليدوية (Alimentazione sana mediterranea e sport)',
		objectives: [
			'اكتساب المعجم الإيطالي المتكامل للتغذية الصحية الحلال والمتوازنة في حوض المتوسط (زيت الزيتون، الحبوب، الخضر، الفواكه، التمور، العسل والماء)',
			'ربط التغذية السليمة بالممارسة الرياضية المنتظمة والعادات اليومية الصحية وتجنب الإكثار من السكريات والوجبات السريعة',
			'توظيف أدوات التجزئة (partitivo: del, della, dei, delle) وأفعال النصيحة الصحية في جمل إيطالية سليمة'
		],
		keywordsAr: [
			'alimentazione sana',
			'dieta mediterranea',
			'olio d’oliva e cereali',
			'sport e salute',
			'artigianato mediterraneo',
			'التغذية الصحية الحلال'
		],
		discover: {
			scenarioAr:
				'في أسبوع الصحة المدرسية بالثانوية، يعد تلاميذ 2AS LE ملصقاً إيطالياً بعنوان «Salute e buon gusto nel Mediterraneo»: «Per crescere bene e studiare con energia, bisogna seguire una dieta mediterranea sana e naturale. La mattina conviene mangiare pane integrale con olio d’oliva, miele e un po’ di frutta fresca o datteri; a pranzo sono ottimi i legumi, le verdure di stagione, il pesce e molta acqua pura. Inoltre, praticare uno sport come il nuoto, la corsa o la camminata mantiene il corpo sano.» تأمل اللوحة المرفقة واستخلص عناصر التغذية الصحية.',
			svg: renderLessonIllustration('ita_06_alimentazione_sana_artigianato', {
				lang: 'it',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'ما المجموعات الغذائية الطبيعية الأربع التي تبرزها اللوحة التوضيحية المرفقة والنص التمهيدي؟',
					hintAr: 'انظر إلى مفتاح اللوحة وإلى الأغذية المذكورة للفطور والغداء.',
					expectedInput: 'زيت الزيتون والخضر، الحبوب الكاملة والتمور، الفواكه الطازجة والماء، والحرف التقليدية الراقية',
					revealAr:
						'تجمع اللوحة أركان الغذاء المتوسطي الأصيل والحلال: زيت الزيتون الطبيعي والخضر الطازجة (*olio d’oliva e ortaggi*)، الحبوب الكاملة والتمور (*cereali integrali e datteri*)، الفواكه الموسمية والماء النقي (*frutta fresca e acqua*)، إلى جانب الخزف الهندسي والنسيج التقليدي (*ceramica geometrica e tessuti artigianali*).'
				},
				{
					promptAr:
						'استخرج من النص التمهيدي أربعة أفعال أو تعبيرات صحية تتعلق بالأكل والرياضة.',
					hintAr: 'ابحث عن صيغ النصيحة (bisogna..., conviene...) وأسماء الرياضات.',
					expectedInput: 'bisogna seguire una dieta sana, conviene mangiare, praticare uno sport, nuoto / corsa / camminata',
					revealAr:
						'التعبيرات الصحية هي: `seguire una dieta sana` (اتباع نظام غذائي صحي)، `mangiare pane integrale / verdure`، `praticare uno sport` (ممارسة رياضة مثل `il nuoto` السباحة، `la corsa` الجري، `la camminata` المشي)، و `mantenere il corpo sano`.'
				},
				{
					promptAr:
						'ماذا تعني الصيغ: «un po’ di frutta»، «del pane integrale»، «delle verdure»؟ وكيف تتكون أداة التجزئة (articolo partitivo)؟',
					hintAr: 'تشبه أداة التجزئة في شكلها حرف الجر المركب (di + il/la/i/le).',
					expectedInput: 'تتكون من di + أداة التعريف وتدل على كمية غير محددة من الغذاء',
					revealAr:
						'أدوات التجزئة (`articolo partitivo`) تصاغ بدمج `di` مع أداة التعريف (`del, dello, dell’, della, dei, degli, delle`) للدلالة على جزء أو كمية غير محددة: `del pane` (بعض الخبز)، `dell’olio` (قليل من الزيت)، `delle verdure` (بعض الخضر)، أو نستعمل `un po’ di + اسم مفرد`.'
				}
			]
		},
		summary: {
			rulesAr: [
				'معجم التغذية الصحية الحلال (Alimentazione sana e naturale): `l’olio d’oliva` (زيت الزيتون)، `il grano integrale` (القمح الكامل)، `la semola` (السميد)، `il pane fatto in casa` (الخبز المنزلي)، `le verdure` (الخضر)، `i legumi` (البقوليات: `ceci` حمص، `lenticchie` عدس)، `la frutta di stagione` (الفواكه الموسمية: `arance, mele, datteri, fichi`)، `il miele` (العسل)، `il latte` (الحليب)، `il pesce` (السمك)، `la carne bianca halal` (اللحم الأبيض الحلال)، `l’acqua pura` (الماء النقي).',
				'الوجبات اليومية والعادات الحسنة (I pasti e le abitudini): `la colazione` (الفطور)، `il pranzo` (الغداء)، `la merenda` (اللمجة)، `la cena` (العشاء). أفعال متصلة: `fare colazione`, `pranzare`, `cenare`, `cucinare`, `condire con olio d’oliva`, `bere molta acqua`, `evitare il cibo spazzatura` (تجنب الوجبات السريعة غير الصحية).',
				'أدوات التجزئة والتعبير عن الكمية (Partitivo e quantità): `del / dell’ / della / dei / degli / delle` بمعنى «قليل من / بعض» (*Bevo dell’acqua; mangio delle mele*)؛ و تعبيرات الكمية: `un piatto di` (طبق من)، `un bicchiere di` (كوب من)، `un cucchiaio d’olio` (ملعقة زيت)، `abbastanza / troppo / poco`.',
				'الرياضة والحرف التقليدية الأصيلة: ممارسة الرياضة (`il nuoto, la corsa, il calcio, il ciclismo, l’escursionismo`)؛ وتثمين الصناعة التقليدية الراقية في المتوسط (`la ceramica geometrica, la tessitura tradizionale, il legno intagliato`).'
			],
			visualSvg: svgItalianGrammarMap({
				title: 'Alimentazione sana e sport (2AS LE)',
				rootLabel: 'Stile di vita sano ed equilibrato',
				rootSub: 'Dieta mediterranea genuina + Attività fisica',
				width: 580,
				branches: [
					{
						label: 'Alimenti base',
						rule: 'Naturali e integrali',
						example: 'olio d’oliva, grano, legumi'
					},
					{
						label: 'Frutta e acqua',
						rule: 'Energia e idratazione',
						example: 'datteri, agrumi, acqua pura'
					},
					{
						label: 'Sport regolare',
						rule: 'Movimento ogni giorno',
						example: 'nuoto, corsa, escursionismo'
					},
					{
						label: 'Partitivo',
						rule: 'di + articolo determinativo',
						example: 'del pane, dell’olio, delle mele'
					}
				]
			}),
			visualCaptionAr: 'خريطة الغذاء الصحي الحلال والرياضة والتراكيب الدالة على الكمية',
			examples: [
				{
					problemAr:
						'Completa con l’articolo partitivo esatto (del, dell’, della, delle): «Per una merenda sana prendo ...... frutta fresca, ...... datteri (dei/degli) e ...... acqua minerale.»',
					solutionAr:
						'«Per una merenda sana prendo della frutta fresca, dei datteri e dell’acqua minerale.»'
				},
				{
					problemAr:
						'Dai due consigli utili a un compagno che mangia troppi dolci industriali e non fa movimento.',
					solutionAr:
						'1) «Bisogna ridurre gli zuccheri e mangiare più verdure e frutta di stagione.» | 2) «Conviene fare trenta minuti di camminata o nuoto ogni giorno.»'
				}
			],
			watchOutAr:
				'انتبه للفرق بين صيغة الجمع في التجزئة: مع `datteri` نستعمل `dei datteri` (لأنها تبدأ بـ d)، بينما مع `agrumi` أو `ortaggi` أو `alimenti` نستخدم `degli` (`degli agrumi, degli ortaggi`)! كما أن كلمة `la frutta` في الإيطالية تستعمل عادة بالمفرد الجمعي للدلالة على الفاكهة عموماً (*mangio molta frutta*).'
		},
		practice: [
			{
				questionAr:
					'Quale menù rispetta pienamente i princìpi di un’alimentazione mediterranea sana, naturale ed equilibrata?',
				options: [
					'Bibite gassate zuccherate, patatine fritte e merendine industriali.',
					'Pane integrale con olio d’oliva, zuppa di legumi, verdure fresche, frutta di stagione e acqua.',
					'Solo dolci al cioccolato a pranzo e a cena senza acqua.',
					'Pasti molto salati consumati velocemente davanti alla televisione.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: المشروبات الغازية والوجبات السريعة غنية بالسكريات والدهون الضارة.',
					'ممتاز! هذا هو النموذج الصحي المتكامل: خبز كامل وزيت زيتون وبقوليات وخضر وفواكه وماء.',
					'خطأ: الاقتصار على الحلويات يسبب خللاً غذائياً.',
					'خطأ: الإكثار من الملح والأكل السريع أمام الشاشات عادات غير صحية.'
				],
				explanationAr:
					'النظام الغذائي المتوازن يعتمد على زيت الزيتون والحبوب الكاملة والبقوليات والخضر والفواكه والماء النقي.'
			},
			{
				questionAr:
					'Scegli gli articoli partitivi corretti per completare la frase: «A colazione bevo ...... latte caldo, prendo ...... pane con ...... miele e ...... mandorle.»',
				options: [
					'della / dello / della / degli',
					'del / del / del / delle',
					'dei / della / degli / della',
					'dell’ / dei / del / dei'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: latte و pane و miele أسماء مذكرة مفردة تأخذ del، و mandorle جمع مؤنث.',
					'أحسنت! del latte, del pane, del miele (مذكر مفرد بساكن)، و delle mandorle (جمع مؤنث).',
					'خطأ: dei للجمع المذكر و della للمفرد المؤنث.',
					'خطأ: dell’ تأتي قبل حرف متحرك فقط.'
				],
				explanationAr:
					'تتطابق أداة التجزئة مع جنس الاسم وعدده: `del` مع المذكر المفرد المبدوء بساكن عادي، و`delle` مع الجمع المؤنث.'
			},
			{
				questionAr:
					'Quale combinazione associa correttamente il tipo di pasto al verbo italiano corrispondente?',
				options: [
					'la colazione -> fare colazione | il pranzo -> pranzare | la cena -> cenare',
					'la colazione -> pranzare | il pranzo -> cenare | la cena -> fare merenda',
					'il pranzo -> fare colazione | la merenda -> dormire | la cena -> studiare',
					'la colazione -> cenare | il pranzo -> bere | la cena -> fare colazione'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! الفطور = fare colazione، الغداء = pranzare، العشاء = cenare.',
					'خطأ: خلط بين أوقات الوجبات الثلاث.',
					'خطأ: الأفعال لا تطابق الوجبات.',
					'خطأ: عكس بين الفطور والعشاء.'
				],
				explanationAr:
					'في الإيطالية نقول: fare colazione (فطور الصباح)، pranzare (الغداء)، fare merenda (اللمجة)، و cenare (العشاء).'
			}
		]
	},
	{
		id: 'ita_lesson_2as_le_t2_passato_prossimo_vs_imperfetto',
		slug: 'ita-2as-le-t2-passato-prossimo-vs-imperfetto',
		grade: '2as_le',
		yearSubjectId: 784,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr:
			'المجال الثاني: التغذية الصحية الحلال، الأسفار في المتوسط وأزمنة الماضي والصفات (Alimentazione sana, viaggi nel Mediterraneo, passato e comparativi)',
		order: 2,
		titleAr:
			'الماضي المركب والماضي الناقص الوصفي (Passato prossimo vs Imperfetto)',
		objectives: [
			'صياغة الماضي المركب (Passato prossimo) بدقة مع التمييز الحاسم بين الفعل المساعد avere والفعل المساعد essere ومطابقة اسم المفعول',
			'ضبط أبرز أسماء المفعول الشاذة (participi irregolari: fatto, scritto, letto, visto, detto, preso, aperto, nato, stato, venuto)',
			'توظيف الماضي الناقص (Imperfetto) لوصف المشاهد والأحوال والعادات المتكررة، والجمع بينه وبين Passato prossimo في السرد'
		],
		keywordsAr: [
			'passato prossimo',
			'essere vs avere',
			'accordo participio passato',
			'imperfetto descrittivo',
			'participi irregolari',
			'الماضي المركب والناقص'
		],
		discover: {
			scenarioAr:
				'اقرأ هذه الفقرة السردية عن رحلة عائلية: «Quando ero piccolo, ogni estate andavo dai miei nonni in campagna e raccoglievamo insieme i fichi maturi. Il giardino era sempre verde e l’aria profumava di menta. Sabato scorso, invece, mia sorella e io siamo partiti presto per visitare la Grande Moschea di Tlemcen: abbiamo fatto molte foto, ho scritto una pagina di diario e siamo tornati a casa contenti.» لاحظ الفرق بين الأفعال الزرقاء الوصفية (ero, andavo, profumava) والأفعال المنجزة (siamo partiti, abbiamo fatto, ho scritto).',
			svg: svgItalianTenseTimeline({
				title: 'Passato Prossimo vs Imperfetto',
				tenseName: 'Azione conclusa vs Descrizione',
				formula: 'Imperfetto (sfondo/abitudine) | Passato Prossimo (evento compiuto)',
				activeZone: 'two_past',
				example: 'Mentre studiavamo in biblioteca, è arrivato il professore.',
				markers: 'ieri, sabato scorso (P. Pross.) | sempre, da piccolo (Imperf.)',
				width: 580
			}),
			steps: [
				{
					promptAr:
						'لماذا أخذ الفعل «siamo partiti / siamo tornati» المساعد essere وتغير آخره إلى (-i)، بينما أخذ «abbiamo fatto / ho scritto» المساعد avere وبقي آخره (-o)؟',
					hintAr: 'انظر إلى طبيعة الفعل (حركة/انتقال أم فعل متعدٍّ) وإلى مطابقة اسم المفعول.',
					expectedInput: 'أفعال الحركة والانعكاس تأخذ essere ويطابق اسم المفعول الفاعل؛ والأفعال المتعدية تأخذ avere ولا يطابق الفاعل',
					revealAr:
						'في Passato Prossimo، تأخذ أفعال الحركة والبقاء والتغير (مثل *andare, partire, tornare, arrivare, venire, stare, essere, rimanere*) وجميع الأفعال الانعكاسية المساعد `essere`، ويتطابق اسم المفعول فيها مع الفاعل (`-o, -a, -i, -e`). أما الأفعال المتعدية (مثل *fare, scrivere, leggere, vedere*) فتأخذ `avere` ويبقى اسم المفعول بصيغة `-o`.'
				},
				{
					promptAr:
						'استخرج من النص ثلاثة أفعال في زمن Imperfetto، وبين لماذا استعمل الكاتب هذا الزمن في الجزء الأول.',
					hintAr: 'ابحث عن المؤشر الزمني «Quando ero piccolo, ogni estate...».',
					expectedInput: 'ero, andavo, raccoglievamo, era, profumava — لوصف الطفولة والبيئة والعادة المتكررة',
					revealAr:
						'الأفعال `ero, andavo, raccoglievamo, era, profumava` في زمن Imperfetto، وقد استُعملت لوصف مرحلة الطفولة، والعادات الصيفية المتكررة (`ogni estate`)، والإطار الطبيعي (`Il giardino era verde`).'
				},
				{
					promptAr:
						'ما اسم المفعول الشاذ (participio passato irregolare) للفعلين «fare -> fatto» و«scrivere -> scritto» الواردين في النص؟ واذكر ثلاثة أمثلة شاذة أخرى.',
					hintAr: 'فكر في leggere, vedere, dire, prendere, aprire.',
					expectedInput: 'fatto, scritto، ومن الشواذ: letto, visto, detto, preso, aperto',
					revealAr:
						'من أشهر أسماء المفعول الشاذة في الإيطالية: `fare -> fatto`, `scrivere -> scritto`, `leggere -> letto`, `vedere -> visto`, `dire -> detto`, `prendere -> preso`, `aprire -> aperto`, `chiudere -> chiuso`, `venire -> venuto`, `nascere -> nato`, `essere -> stato`.'
				}
			]
		},
		summary: {
			rulesAr: [
				'تكوين الماضي المركب (Passato Prossimo): المضارع من `avere` أو `essere` + اسم المفعول (`-are -> -ato`, `-ere -> -uto`, `-ire -> -ito`). شواذ رئيسية: `fare (fatto), dire (detto), leggere (letto), scrivere (scritto), vedere (visto), prendere (preso), aprire (aperto), chiudere (chiuso), mettere (messo), rispondere (risposto), essere (stato), venire (venuto), nascere (nato)`.',
				'اختيار المساعد والمطابقة (Avere vs Essere): يأخذ `avere` الأفعال المتعدية (*Ho letto il testo*), وأغلب الأفعال غير المتعدية الدالة على نشاط (*abbiamo camminato, ho dormito*). يأخذ `essere` أفعال الحركة الموجهة والبقاء والتغير (*andare, venire, partire, arrivare, entrare, uscire, tornare, rimanere, stare, essere, diventare, nascere*) و**كل الأفعال الانعكاسية** (*mi sono alzato/a, ci siamo preparati/e*). مع `essere` تجب المطابقة: *Maria è uscita; i ragazzi sono partiti; le ragazze sono arrivate*.',
				'تكوين واستعمالات الماضي الناقص (Imperfetto): الجذر + `-vo, -vi, -va, -vamo, -vate, -vano` (*parlavo, leggevo, partivo*). شواذ قليلة جداً: `essere` (*ero, eri, era, eravamo, eravate, erano*), `fare` (*facevo...*), `dire` (*dicevo...*), `bere` (*bevevo...*). يدل على العادة الماضية (*sempre, da bambino, ogni giorno*)، والوصف (*faceva freddo, era gentile*)، والفعل المستمر في الخلفية (*mentre studiavo*).',
				'التكامل السردي في القصة: Imperfetto = الخلفية أو الحدث المستمر؛ Passato Prossimo = الحدث المفاجئ أو المكتمل المحدد بوقت (*Mentre leggevamo in biblioteca, è suonata la campanella*).'
			],
			visualSvg: svgItalianConjugationChart({
				title: 'Passato Prossimo vs Imperfetto',
				subtitle: 'Ausiliari, accordo del participio e usi narrativi',
				width: 580,
				columns: [
					{
						header: 'Ausiliare AVERE',
						rule: 'Transitivo, participio in -o',
						examples: 'Ho scritto, abbiamo letto'
					},
					{
						header: 'Ausiliare ESSERE',
						rule: 'Moto, stato, riflessivi (-o/-a/-i/-e)',
						examples: 'È partita, ci siamo alzati'
					},
					{
						header: 'IMPERFETTO',
						rule: 'Abitudine e descrizione',
						examples: 'Ero, faceva, andavamo sempre'
					}
				]
			}),
			visualCaptionAr: 'المقارنة التركيبية والوظيفية بين الماضي المركب والماضي الناقص في الإيطالية',
			examples: [
				{
					problemAr:
						'Coniuga al Passato Prossimo: «Ieri Salma e Nadia (partire) alle sette, (prendere) l’autobus e (visitare) il museo; poi (prepararsi) per la lezione.»',
					solutionAr:
						'«Ieri Salma e Nadia sono partite alle sette (essere + -e), hanno preso l’autobus (avere + preso) e hanno visitato il museo; poi si sono preparate per la lezione (riflessivo -> essere + -e).»'
				},
				{
					problemAr:
						'Scegli tra Imperfetto e Passato Prossimo: «Mentre noi (cenare) in famiglia, mio zio (arrivare) con un cesto di datteri.»',
					solutionAr:
						'«Mentre noi cenavamo (Imperfetto: azione in corso) in famiglia, mio zio è arrivato (Passato Prossimo: azione puntuale) con un cesto di datteri.»'
				}
			],
			watchOutAr:
				'قاعدة امتحانية ذهبية في 2AS LE: جميع الأفعال الانعكاسية تأخذ دائماً المساعد `essere` في Passato Prossimo مهما كان معناها، ويتطابق اسم المفعول مع الفاعل! فلا تقل أبداً «*Maria si ha alzata*»، بل «**Maria si è alzata**»؛ ولا «*Ci abbiamo svegliati*»، بل «**Ci siamo svegliati**».'
		},
		practice: [
			{
				questionAr:
					'Quale frase applica esattamente l’ausiliare «essere» e l’accordo del participio passato al Passato Prossimo?',
				options: [
					'Le mie sorelle hanno uscite presto e si hanno preparato bene.',
					'Le mie sorelle sono uscite presto e si sono preparate bene.',
					'Le mie sorelle sono uscito presto e si sono preparato bene.',
					'Le mie sorelle hanno uscito presto e sono preparate bene.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: uscita و prepararsi تأخذان المساعد essere لا avere.',
					'ممتاز! الفعل uscire وفعل الانعكاس prepararsi يأخذان essere وتطابقت النهاية (-e) مع جمع المؤنث (le mie sorelle).',
					'خطأ: نقصت مطابقة اسم المفعول (-e) مع جمع المؤنث.',
					'خطأ: uscire لا يأخذ avere، وانعكاس prepararsi يحتاج الضمير si.'
				],
				explanationAr:
					'الفعل uscire والأفعال الانعكاسية تأخذ دائماً المساعد essere، فيطابق اسم المفعول الفاعل المؤنث الجمع بـ `-e` (uscite, preparate).'
			},
			{
				questionAr:
					'Scegli la serie corretta di participi passati irregolari (fare, leggere, vedere, aprire):',
				options: [
					'facciuto, leggito, veduto, aprito',
					'fatto, letto, visto, aperto',
					'fatto, leggito, visto, aprito',
					'fatto, letto, vedeto, aperto'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: هذه أفعال ذات أسماء مفعول شاذة لا تتبع القياس العادي.',
					'صحيح! fatto (fare), letto (leggere), visto (vedere), aperto (aprire).',
					'خطأ: leggere -> letto و aprire -> aperto.',
					'خطأ: vedere يأخذ عادة visto (أو veduto، وليس vedeto).'
				],
				explanationAr:
					'أسماء المفعول الشاذة الأربعة الأساسية هي: fare -> fatto، leggere -> letto، vedere -> visto، aprire -> aperto.'
			},
			{
				questionAr:
					'Completa combinando Imperfetto e Passato Prossimo: «Da bambino Karim ...... in campagna ogni agosto, ma l’anno scorso ...... a Costantina.»',
				options: [
					'è andato / andava',
					'andava / è andato',
					'va / andrà',
					'è andato / è andato'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: عكس الترتيب الزمني بين العادة الطفولية المتكررة والحدث المحدد بـ l’anno scorso.',
					'أحسنت! «Da bambino... ogni agosto» عادة ماضية متكررة (andava = Imperfetto)، و«l’anno scorso» حدث منتهٍ محدد (è andato = Passato Prossimo).',
					'خطأ: خلط بين الحاضر والمستقبل في سياق ماضٍ.',
					'خطأ: العادة المتكررة في الطفولة تستوجب Imperfetto.'
				],
				explanationAr:
					'المؤشرات الدالة على التكرار في الماضي (da bambino, ogni agosto) تستدعي Imperfetto (andava)، بينما الحدث المحدد بسنة منتهية (l’anno scorso) يستدعي Passato Prossimo (è andato).'
			}
		]
	},
	{
		id: 'ita_lesson_2as_le_t2_viaggi_geografia_mediterraneo',
		slug: 'ita-2as-le-t2-viaggi_geografia_mediterraneo',
		grade: '2as_le',
		yearSubjectId: 784,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr:
			'المجال الثاني: التغذية الصحية الحلال، الأسفار في المتوسط وأزمنة الماضي والصفات (Alimentazione sana, viaggi nel Mediterraneo, passato e comparativi)',
		order: 3,
		titleAr:
			'الأسفار وجغرافية حوض البحر الأبيض المتوسط (Viaggi e geografia del Mediterraneo)',
		objectives: [
			'التعرف على الجغرافيا الأساسية لإيطاليا والجزائر وحوض البحر الأبيض المتوسط والمدن التاريخية الكبرى على الضفتين',
			'استعمال حروف الجر الجغرافية بدقة مع القارات والبلدان والجزر والمدن (in Italia, in Sicilia, a Roma, ad Algeri, da Orano)',
			'اكتساب معجم السفر الثقافي والتعرف على الجسر العلمي بين العربية والإيطالية في الخرائط والمفردات (cartografia di Al-Idrisi e arabismi)'
		],
		keywordsAr: [
			'geografia mediterranea',
			'Italia e Algeria',
			'carta muta',
			'preposizioni geografiche',
			'viaggio culturale',
			'الأسفار والمتوسط'
		],
		discover: {
			scenarioAr:
				'يتأمل طلاب 2AS LE الخريطة الصماء لحوض البحر الأبيض المتوسط ويقرؤون هذه الفقرة: «L’Italia è una penisola situata nel cuore del Mar Mediterraneo e bagnata a est dal Mar Adriatico; comprende due grandi isole, la Sicilia e la Sardegna. Sulla sponda sud si trova l’Algeria, con città storiche come Algeri, Costantina e Tlemcen. Nel XII secolo il celebre geografo Al-Idrisi lavorò in Sicilia e disegnò mappe precise del Mediterraneo. Oggi un viaggio da Algeri a Palermo unisce ancora cultura, geografia e rispetto.»',
			svg: renderLessonIllustration('ita_01_italia_mediterraneo_carta_muta', {
				lang: 'it',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'انطلاقاً من الخريطة الصماء ومفتاحها (الأرقام 1 إلى 5)، حدد أسماء الكيانات الجغرافية الخمسة بالإيطالية.',
					hintAr: 'تتوزع بين شبه الجزيرة، البلد المغاربي، الجزيرة، والبحرين.',
					expectedInput: '1 Italia, 2 Algeria, 3 Sicilia, 4 Mar Mediterraneo, 5 Mar Adriatico',
					revealAr:
						'المعالم الخمسة على الخريطة الصماء هي: (1) `Italia` (إيطاليا)، (2) `Algeria` (الجزائر)، (3) `Sicilia` (جزيرة صقلية)، (4) `Mar Mediterraneo` (البحر الأبيض المتوسط)، و(5) `Mar Adriatico` (البحر الأدرياتيكي).'
				},
				{
					promptAr:
						'تأمل العبارات الجغرافية: «in Sicilia», «in Italia», «a Palermo», «da Algeri». ما القاعدة التي تفصل بين «in» و«a»؟',
					hintAr: 'هل Sicilia و Italia مدن أم دول وجزر كبرى؟ وماذا عن Palermo و Algeri؟',
					expectedInput: 'in مع الدول والقارات والمناطق والجزر الكبرى، و a مع المدن والجزر الصغيرة',
					revealAr:
						'تُستعمل `in` مع القارات والدول والمناطق والجزر الكبرى (*in Africa, in Algeria, in Italia, in Sicilia, in Lombardia*)؛ وتُستعمل `a` (أو `ad` قبل حرف متحرك أحياناً) مع المدن (*a Roma, a Costantina, a Palermo, ad Algeri*)؛ وتُستعمل `da` لنقطة الانطلاق (*da Algeri*).'
				},
				{
					promptAr:
						'ما الإرث العلمي والتاريخي الذي يجسده الجغرافي الإدريسي (Al-Idrisi) في المتوسط، وما أشهر الكلمات العربية التي دخلت الإيطالية عبر الملاحة والتجارة؟',
					hintAr: 'فكر في مجالات التجارة والميناء والفلاحة والعلوم.',
					expectedInput: 'خرائط الإدريسي في صقلية، وكلمات مثل dogana, tariffa, arsenale, zucchero, limone',
					revealAr:
						'وضع الجغرافي الإدريسي خرائط وموسوعات جغرافية دقيقة للبحر المتوسط في صقلية في القرن الثاني عشر، كما انتقلت إلى الإيطالية كلمات عربية عريقة في الملاحة والتجارة والزراعة مثل `arsenale` (دار الصناعة)، `dogana` (الديوان/الجمرك)، `tariffa` (التعريفة)، `zucchero` (السكر)، `limone` (الليمون)، `zafferano` (الزعفران)، و`carciofo` (الخرشوف).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الجغرافيا الأساسية (Italia e Algeria nel Mediterraneo): إيطاليا شبه جزيرة (`penisola`) عاصمتها `Roma`، ومن مدنها الكبرى `Milano, Torino, Venezia, Firenze, Napoli, Palermo`؛ يحدها شمالاً جبال الألب (`le Alpi`) وتخترقها سلسلة الأبينيني (`gli Appennini`)، وتحيط بها بحار `Tirreno, Ionio, Adriatico, Mediterraneo`. والجزائر بلد متوسطي عريق يزخر بتراث معماري عالمي (`la Casbah di Algeri, i Ponti di Costantina, la Grande Moschea di Tlemcen, la Valle dello M’Zab`).',
				'حروف الجر الجغرافية (Stato e moto in luogo geografico): `in` + قارة / بلد / إقليم / جزيرة كبرى (*in Europa, in Algeria, in Italia, in Toscana, in Sicilia, in Sardegna*)؛ `a` + مدينة / بلدة (*a Roma, a Firenze, a Orano, ad Algeri*)؛ `da` للانطلاق (*partiamo da Algeri*)؛ `per` للوجهة مع الفعل `partire` (*partiamo per l’Italia*).',
				'معجم السفر المنظم (Lessico del viaggio): `il viaggio d’istruzione` (رحلة دراسية)، `l’itinerario` (مسار الرحلة)، `il biglietto` (التذكرة)، `la valigia` (الحقيبة)، `il passaporto` (جواز السفر)، `l’aeroporto / il porto / la stazione` (المطار/الميناء/المحطة)، `l’alloggio` (الإقامة)، `la guida turistica` (الدليل السياحي)، `rispettare le usanze locali` (احترام الأعراف المحلية).',
				'التبادل العلمي المتوسطي والكلمات ذات الأصل العربي: إسهام العلماء في علم الخرائط والطب والرياضيات (*Al-Idrisi, Al-Khwarizmi, Ibn Al-Haytham, Ibn Battuta*)، وبقاء مفردات عربية في الإيطالية مثل `algebra, algoritmo, arsenale, dogana, tariffa, materasso, zucchero, cotone, zafferano`.'
			],
			visualSvg: svgItalianGrammarMap({
				title: 'Viaggi e preposizioni geografiche (2AS LE)',
				rootLabel: 'Orientarsi nel Mediterraneo',
				rootSub: 'Stato in luogo, moto a luogo e partenza',
				width: 580,
				branches: [
					{
						label: 'IN + Paese / Isola',
						rule: 'Continenti, stati, regioni',
						example: 'in Algeria, in Italia, in Sicilia'
					},
					{
						label: 'A + Città',
						rule: 'Centri urbani (ad + vocale)',
						example: 'a Roma, a Tlemcen, ad Algeri'
					},
					{
						label: 'DA / PER',
						rule: 'Origine vs Destinazione',
						example: 'parto da Orano per Palermo'
					},
					{
						label: 'Carta muta',
						rule: 'Italia e Mediterraneo',
						example: 'Sicilia, Mar Adriatico, Algeria'
					}
				]
			}),
			visualCaptionAr: 'خريطة حروف الجر الجغرافية والأسفار في حوض البحر الأبيض المتوسط',
			examples: [
				{
					problemAr:
						'Completa con «in, a, da, per» secondo la regola geografica: «Domani mia cugina parte ...... Costantina ...... andare ...... Italia; prima si ferma ...... Sicilia e poi va ...... Firenze.»',
					solutionAr:
						'«Domani mia cugina parte da Costantina per andare in Italia; prima si ferma in Sicilia (grande isola) e poi va a Firenze (città).»'
				},
				{
					problemAr:
						'Spiega il significato di quattro parole italiane di origine araba legate ai viaggi e al commercio: «dogana, tariffa, arsenale, zucchero».',
					solutionAr:
						'dogana (الجمارك / الديوان), tariffa (التعريفة), arsenale (دار الصناعة / الترسانة), zucchero (السكر).'
				}
			],
			watchOutAr:
				'احذر من فخين امتحانيين في حروف الجر الجغرافية: (1) مع الفعل `partire` نحو بلد أو مدينة لا نستعمل `a` أو `in` بل `PER`: نقول «Parto **per** l’Italia / **per** Roma» (أغادر متجهاً إلى إيطاليا/روما)، بينما مع `andare` نقول «Vado **in** Italia / **a** Roma»؛ (2) الجزر الكبرى (`Sicilia, Sardegna`) تأخذ `in` وليس `a`!'
		},
		practice: [
			{
				questionAr:
					'Quale frase usa correttamente tutte le preposizioni geografiche con paesi, grandi isole e città?',
				options: [
					'Abito a Algeria, viaggio spesso a Sicilia e studio in Costantina.',
					'Abito in Algeria, viaggio spesso in Sicilia e studio a Costantina.',
					'Parto per Algeri in Italia e arrivo in Palermo.',
					'Vivo nel Tlemcen e vado a Sardegna.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الدولة والجزيرة الكبرى تأخذان in، والمدينة تأخذ a.',
					'ممتاز! in Algeria (بلد)، in Sicilia (جزيرة كبرى)، و a Costantina (مدينة).',
					'خطأ: نستخدم da لنقطة الانطلاق و per للوجهة مع partire، و Palermo مدينة تأخذ a.',
					'خطأ: Tlemcen مدينة (a) و Sardegna جزيرة كبرى (in).'
				],
				explanationAr:
					'القاعدة الجغرافية الثابتة: `in` للدول والقارات والجزر الكبرى (Algeria, Italia, Sicilia, Sardegna) و`a` للمدن (Costantina, Roma, Palermo).'
			},
			{
				questionAr:
					'Completa con il verbo «partire»: «Gli studenti di 2AS ...... da Orano ...... Milano per partecipare a un concorso culturale.»',
				options: [
					'partono / a',
					'partono / per',
					'partiscono / in',
					'partono / da'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفعل partire يأخذ حرف الجر per مع الوجهة وليس a.',
					'أحسنت! الفعل partire يتصرف قياسياً (partono بلا -isc-) ويأخذ `da` للانطلاق و`per` للوجهة.',
					'خطأ: الفعل partire لا ينتمي لمجموعة -isc- (الصواب partono).',
					'خطأ: تكرار da غير صحيح للوجهة.'
				],
				explanationAr:
					'الفعل `partire` قياسي في الحاضر (parto, parti, parte, partiamo, partite, partono) ويُتبع بحرف `da` لمكان المغادرة و`per` للوجهة.'
			},
			{
				questionAr:
					'Quale mare bagna la costa orientale dell’Italia ed è indicato al numero 5 della carta muta?',
				options: [
					'Il Mar Baltico',
					'Il Mar Adriatico',
					'L’Oceano Atlantico',
					'Il Mar Rosso'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: بحر البلطيق يقع في شمال أوروبا.',
					'صحيح! البحر الأدرياتيكي (Mar Adriatico) يحد الساحل الشرقي لإيطاليا.',
					'خطأ: المحيط الأطلسي يقع غرب أوروبا وإفريقيا.',
					'خطأ: البحر الأحمر يفصل إفريقيا عن شبه الجزيرة العربية.'
				],
				explanationAr:
					'البحر الأدرياتيكي (Mar Adriatico) يقع شرق شبه الجزيرة الإيطالية، ويمثل الرقم 5 في الخريطة الصماء.'
			}
		]
	},
	{
		id: 'ita_lesson_2as_le_t2_possessivi_comparativo_superlativo',
		slug: 'ita-2as-le-t2-possessivi-comparativo-superlativo',
		grade: '2as_le',
		yearSubjectId: 784,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr:
			'المجال الثاني: التغذية الصحية الحلال، الأسفار في المتوسط وأزمنة الماضي والصفات (Alimentazione sana, viaggi nel Mediterraneo, passato e comparativi)',
		order: 4,
		titleAr:
			'صفات الملكية وأساليب المقارنة والتفضيل (Possessivi, comparativo e superlativo)',
		objectives: [
			'ضبط استخدام صفات الملكية الإيطالية (il mio, la tua, i suoi, il loro...) والقاعدة الخاصة بأسماء القرابة المفردة وغير المنعوتة',
			'إتقان تكوين أسلوب المقارنة (più / meno... di vs che، و così... come / tanto... quanto) في مقارنة المدن والكتب والعادات',
			'التمييز بين التفضيل النسبي (il più... di) والتفضيل المطلق (-issimo / molto) وصيغهما غير القياسية (migliore / ottimo, peggiore / pessimo)'
		],
		keywordsAr: [
			'aggettivi possessivi',
			'nomi di famiglia',
			'comparativo di vs che',
			'superlativo relativo',
			'superlativo assoluto',
			'الملكية والمقارنة والتفضيل'
		],
		discover: {
			scenarioAr:
				'اقرأ مقارنة طارق بين أفراد عائلته ومدينتين متوسطيتين: «Mio padre e mia madre lavorano con dedizione, mentre i miei nonni abitano in una casa tranquilla vicino al mare. Anche la mia cara sorella ama leggere, e il loro cugino studia lingue con noi. Secondo me, Costantina è più antica di molte città moderne, ma studiare la storia è più interessante che difficile. La biblioteca centrale è la sala più silenziosa del liceo ed è davvero bellissima!»',
			svg: svgItalianConjugationChart({
				title: 'Aggettivi possessivi e nomi di famiglia',
				subtitle: 'Quando cade l’articolo determinativo e quando resta',
				width: 580,
				columns: [
					{
						header: 'Senza articolo',
						rule: 'Famiglia singolare pura',
						examples: 'mio padre, mia sorella, suo zio'
					},
					{
						header: 'Con articolo (Plurale/Loro)',
						rule: 'Sempre plurale o con LORO',
						examples: 'i miei genitori, il loro cugino'
					},
					{
						header: 'Con articolo (Modificato)',
						rule: 'Aggettivo o diminutivo',
						examples: 'la mia cara madre, il mio fratellino'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'لماذا حُذفت أداة التعريف في «mio padre» و«mia madre»، وبقيت في «i miei nonni» و«la mia cara sorella» و«il loro cugino»؟',
					hintAr: 'راقب أربعة شروط: المفرد، وعدم وجود صفة أو تصغير، وألا تكون الصفة loro.',
					expectedInput: 'تسقط الأداة فقط مع اسم القرابة المفرد المجرد من النعت والتصغير وغير المسبوق بـ loro',
					revealAr:
						'تسقط أداة التعريف أمام صفة الملكية في حالة واحدة فقط: عندما يكون اسم القرابة **مفرداً ومجرداً من أي صفة أو تصغير** وغير مسبوق بـ `loro` (*mio padre, mia madre, tuo fratello, sua zia*). وتعود الأداة فوراً في الجمع (*i miei nonni*)، ومع `loro` (*il loro cugino*)، ومع النعت أو التصغير (*la mia cara sorella, il mio fratellino*)!'
				},
				{
					promptAr:
						'لاحظ الجملتين: «Costantina è più antica di molte città» و«la storia è più interessante che difficile». متى نستعمل «di» ومتى نستعمل «che» في المقارنة؟',
					hintAr: 'قارن ما بعد più/meno: هل نقارن بين اسمين أم بين صفتين للشيء نفسه؟',
					expectedInput: 'di عند مقارنة عنصرين (اسمين/ضميرين)، و che عند مقارنة صفتين أو فعلين أو جار ومجرور',
					revealAr:
						'نستعمل `di` (أو حرفاً مركباً مثل `del, della`) عندما نقارن شيئين أو شخصين عبر الاسمين أو الضميرين (*Algeri è più grande di Orano*). ونستعمل `che` عندما نقارن بين **صفتين** أو **فعلين** أو **اسمين مسبوقين بحرف جر** أو **ظرفين** (*Studiare è più utile che faticoso*; *Leggo più in biblioteca che a casa*).'
				},
				{
					promptAr:
						'ما الفرق بين «la sala più silenziosa del liceo» و«bellissima» في آخر النص؟',
					hintAr: 'الأولى تقارن القاعة ببقية قاعات الثانوية، والثانية تصف جمالها بإطلاق.',
					expectedInput: 'الأولى تفضيل نسبي (superlativo relativo) والثانية تفضيل مطلق (superlativo assoluto)',
					revealAr:
						'«la più silenziosa del liceo» هي تفضيل نسبي (`superlativo relativo`: أداة تعريف + più/meno + صفة + di)؛ أما «bellissima» فهي تفضيل مطلق (`superlativo assoluto`: جذر الصفة + `-issimo/-a/-i/-e` أو `molto + aggettivo`).'
				}
			]
		},
		summary: {
			rulesAr: [
				'صفات الملكية (Aggettivi possessivi): `il mio / la mia / i miei / le mie`؛ `il tuo...`؛ `il suo...`؛ `il nostro...`؛ `il vostro...`؛ `il loro / la loro / i loro / le loro` (`loro` لا تتغير نهايتها أبداً، وتتبعها دائماً أداة التعريف!). القاعدة الحاسمة: يتطابق ضمير الملكية في النوع والعدد مع **الشيء المملوك** لا مع المالك (*Marco cerca la sua penna*؛ *Nadia legge il suo libro*).',
				'قاعدة القرابة (I nomi di famiglia): بلا أداة تعريف في المفرد المجرد (*mio padre, mia sorella, tuo zio, suo nonno*)؛ وبأداة تعريف إلزامية في الجمع (*i miei fratelli*)، ومع `loro` (*la loro madre*)، ومع الصفة أو التصغير (*la mia sorellina, il tuo bravo cugino*)، ومع الكلمتين العائليتين `la mamma, il papà` (*la mia mamma*).',
				'أسلوب المقارنة (Il comparativo): أكثر/أقل + `di` بين اسمين أو ضميرين (*La Sicilia è più grande della Sardegna*؛ *Tu sei più alto di me*)؛ أكثر/أقل + `che` بين صفتين أو فعلين أو كميتين أو عبارتين بالجر (*Questo esercizio è più lungo che difficile*; *Preferisco leggere che guardare la TV*). التساوي: `(così)... come` أو `(tanto)... quanto`.',
				'التفضيل النسبي والمطلق (Superlativo relativo e assoluto): النسبي (`il/la/i/le + più/meno + agg. + di`: *Il Nilo è il fiume più lungo dell’Africa*)؛ والمطلق (`-issimo/-a/-i/-e` أو `molto/estremamente`: *utilissimo, chiarissima*). صيغ شاذة مهمة: `buono -> migliore / ottimo`؛ `cattivo -> peggiore / pessimo`؛ `grande -> maggiore / massimo`؛ `piccolo -> minore / minimo`.'
			],
			visualSvg: svgItalianGrammarMap({
				title: 'Comparativo e Superlativo in italiano',
				rootLabel: 'Gradi dell’aggettivo qualificativo',
				rootSub: 'Confronto tra due elementi o grado massimo',
				width: 580,
				branches: [
					{
						label: 'Più / Meno + DI',
						rule: 'Tra due nomi o pronomi',
						example: 'L’olio è più sano del burro.'
					},
					{
						label: 'Più / Meno + CHE',
						rule: 'Due aggettivi, verbi o prep.',
						example: 'È più utile che difficile.'
					},
					{
						label: 'Sup. Relativo',
						rule: 'il/la + più/meno + agg. + di',
						example: 'il libro più letto della classe'
					},
					{
						label: 'Sup. Assoluto',
						rule: '-issimo / molto / ottimo',
						example: 'chiarissimo, ottimo lavoro'
					}
				]
			}),
			visualCaptionAr: 'خريطة درجات المقارنة والتفضيل النسبي والمطلق في الإيطالية',
			examples: [
				{
					problemAr:
						'Inserisci l’articolo solo dove è obbligatorio: «...... mia madre prepara la cena, ...... miei fratelli apparecchiano la tavola e ...... loro nonno racconta una storia con ...... sua cara nipote.»',
					solutionAr:
						'«Mia madre (senza articolo) prepara la cena, i miei fratelli (plurale -> i) apparecchiano la tavola e il loro nonno (loro -> il) racconta una storia con la sua cara nipote (aggettivo cara -> la).»'
				},
				{
					problemAr:
						'Completa con «di» o «che»: «a) La lettura è più formativa ...... noiosa. b) La biblioteca è più silenziosa ...... cortile (di+il).»',
					solutionAr:
						'«a) che (due aggettivi: formativa / noiosa). | b) del (confronto tra due nomi: biblioteca / cortile -> di + il = del).»'
				}
			],
			watchOutAr:
				'احذر من ثلاثة أخطاء شائعة في التفضيل والملكية: (1) لا تستعمل «più buono» أو «più migliore» معاً، بل `migliore` (للمقارنة) أو `ottimo` (للتفضيل المطلق)؛ (2) مع `loro` نضع أداة التعريف دائماً حتى مع القرابة المفردة (*il loro padre* وليس *loro padre*)؛ (3) بعد `il più...` في التفضيل النسبي نربط المجموعة بحرف الجر `di` (وليس `in`): *la città più antica **della** regione*.'
		},
		practice: [
			{
				questionAr:
					'In quale frase gli aggettivi possessivi con i nomi di famiglia sono usati senza errori?',
				options: [
					'Il mio zio abita a Orano, miei zii abitano a Blida e loro cugino studia a Algeri.',
					'Mio zio abita a Orano, i miei zii abitano a Blida e il loro cugino studia ad Algeri.',
					'Mio caro zio abita a Orano, miei cugini studiano bene e la mia sorella legge.',
					'La mia madre e il mio padre lavorano insieme con miei nonni.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: تسقط الأداة أمام zio (مفرد مجرد)، وتلزم أمام miei zii (جمع) و il loro cugino (loro).',
					'ممتاز! Mio zio (مفرد مجرد بدون أداة)، i miei zii (جمع بأداة)، و il loro cugino (loro بأداة دائماً).',
					'خطأ: وجود صفة caro يفرض الأداة (il mio caro zio)، وتبقى sorella دون أداة إذا لم تنعت.',
					'خطأ: المفرد المجرد madre و padre لا يأخذان الأداة، بينما الجمع nonni يأخذ i.'
				],
				explanationAr:
					'تسقط أداة التعريف فقط مع اسم القرابة المفرد المجرد دون loro؛ وتعود مع الجمع ومع loro ومع النعت/التصغير.'
			},
			{
				questionAr:
					'Scegli la forma esatta tra «di / del» e «che» nelle due frasi: «Questo dizionario è più completo ...... vecchio» e «Scrivere a mano è più utile ...... copiare senza leggere».',
				options: [
					'che / di',
					'del / che',
					'di / che',
					'che / del'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: في الجملة الأولى نقارن بين اسمين (questo dizionario و il vecchio)، وفي الثانية بين مصدرين.',
					'أحسنت! «del vecchio» (di + il بين اسمين)، و«che copiare» (مقارنة بين فعلين بالمصدر).',
					'خطأ: davanti a quello vecchio -> del vecchio (di + il).',
					'خطأ: عكس القاعدتين.'
				],
				explanationAr:
					'تُستعمل `di` (المركبة مع الأداة: del) عند مقارنة اسمين، و`che` عند مقارنة فعلين في المصدر أو صفتين.'
			},
			{
				questionAr:
					'Quale frase esprime correttamente un superlativo relativo e un superlativo assoluto irregolare?',
				options: [
					'È il più ottimo libro nella biblioteca e il lavoro più bello nel mondo.',
					'È il libro più interessante della biblioteca e il tuo riassunto è ottimo.',
					'È il libro più interessante in biblioteca e il tuo riassunto è molto buonissimo.',
					'È libro più ottimo della classe e il più migliore progetto.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا نجمع più مع ottimo، ونستخدم di بعد التفضيل النسبي لا in.',
					'ممتاز! «il libro più interessante della biblioteca» (تفضيل نسبي + di) و «ottimo» (تفضيل مطلق غير قياسي سليم).',
					'خطأ: لا نجمع molto مع -issimo ولا نصوغ buonissimo مع molto.',
					'خطأ: «più ottimo» و«più migliore» صيغتان مضاعفتان خاطئتان.'
				],
				explanationAr:
					'التفضيل النسبي يربط المفضَّل بـ `di` (`della biblioteca`)، ولا يجتمع `più` أو `molto` مع صيغ التفضيل المطلقة مثل `ottimo` و `-issimo`.'
			}
		]
	}
];
