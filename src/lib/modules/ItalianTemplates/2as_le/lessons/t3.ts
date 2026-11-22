import type { ItalianInteractiveLessonData } from '../../types';
import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';
import {
	svgItalianGrammarMap,
	svgItalianTenseTimeline,
	svgItalianWordFormation,
	svgItalianWritingBlueprint
} from '../../svg-italian';

export const LESSONS_2AS_LE_T3: ItalianInteractiveLessonData[] = [
	{
		id: 'ita_lesson_2as_le_t3_natura_tutela_ambiente',
		slug: 'ita-2as-le-t3-natura-tutela-ambiente',
		grade: '2as_le',
		yearSubjectId: 784,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr:
			'المجال الثالث: البيئة، المطالعة، التكنولوجيا المسؤولة ومنهجية التعبير الكتابي (Ambiente, lettura, tecnologia, futuro e scrittura)',
		order: 1,
		titleAr:
			'حماية الطبيعة والفرز الانتقائي والطاقات المتجددة (Natura e tutela dell’ambiente)',
		objectives: [
			'اكتساب المعجم الإيطالي الأساسي لحماية البيئة، الفرز الانتقائي للنفايات، ترشيد الماء، والتشجير (tutela ambientale, riciclaggio, risparmio idrico, rimboschimento)',
			'التعرف على مصادر الطاقة المتجددة النظيفة في الجزائر والعالم (energia solare, energia eolica, Diga Verde)',
			'صياغة مقترحات عملية وتوصيات بيئية واضحة باستعمال صيغ الالتزام والمبادرة الجماعية (bisogna, dobbiamo, è necessario + infinito)'
		],
		keywordsAr: [
			'tutela dell’ambiente',
			'raccolta differenziata',
			'riciclaggio',
			'risparmio dell’acqua',
			'energie rinnovabili',
			'حماية البيئة'
		],
		discover: {
			scenarioAr:
				'في أسبوع البيئة بالثانوية، يقرأ طلاب 2AS LE نشرة النادي الأخضر: «La tutela della natura comincia dai gesti quotidiani di ogni studente. A scuola pratichiamo la raccolta differenziata di carta, plastica e vetro e chiudiamo subito i rubinetti per evitare lo spreco d’acqua. In Algeria, il rimboschimento della Diga Verde e le centrali di energia solare ed eolica mostrano che è necessario proteggere l’ambiente e ridurre l’inquinamento per le generazioni future.» تأمل اللوحة المرفقة واستخرج محاور التنمية المستدامة.',
			svg: renderLessonIllustration('ita_04_ambiente_energie_rinnovabili', {
				lang: 'it',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'ما الحلول البيئية الأربعة الظاهرة في اللوحة التوضيحية المرفقة والتي تعكس رؤية «الجزائر الخضراء»؟',
					hintAr: 'انظر إلى مفتاح اللوحة (الشمس، الرياح، إعادة التدوير، والتشجير).',
					expectedInput: 'الطاقة الشمسية، طاقة الرياح، الفرز وإعادة التدوير، والتشجير وحماية الغابات',
					revealAr:
						'تجمع اللوحة أربع ركائز لحماية الطبيعة: الطاقة الشمسية النظيفة (*energia solare pulita*)، طاقة الرياح المستدامة (*energia eolica sostenibile*)، الفرز الانتقائي وإعادة التدوير (*raccolta differenziata e riciclaggio*)، والتشجير وحماية المساحات الخضراء (*rimboschimento e tutela del verde*).'
				},
				{
					promptAr:
						'استخرج من النص التمهيدي أربعة أفعال تدل على السلوك البيئي الإيجابي في المدرسة والمجتمع.',
					hintAr: 'ابحث عن الأفعال بعد «pratichiamo...»، «chiudiamo...»، و«è necessario...».',
					expectedInput: 'praticare la raccolta differenziata, chiudere i rubinetti / evitare lo spreco d’acqua, proteggere l’ambiente, ridurre l’inquinamento',
					revealAr:
						'الأفعال والسلوكيات الإيجابية هي: `praticare la raccolta differenziata` (ممارسة الفرز الانتقائي)، `evitare lo spreco d’acqua` (تجنب هدر الماء)، `proteggere l’ambiente` (حماية البيئة)، و`ridurre l’inquinamento` (تقليل التلوث).'
				},
				{
					promptAr:
						'حوّل العبارة «È necessario proteggere gli alberi» إلى نصيحة تبدأ بـ «Dobbiamo...» ثم إلى قاعدة عامة بـ «Bisogna...».',
					hintAr: 'كلا الصيغتين (dobbiamo و bisogna) تتبعهما صيغة المصدر مباشرة.',
					expectedInput: 'Dobbiamo proteggere gli alberi / Bisogna proteggere gli alberi',
					revealAr:
						'نقول: «Dobbiamo proteggere gli alberi e rispettare il verde» (التزام جماعي)، أو «Bisogna proteggere gli alberi e risparmiare l’acqua» (قاعدة عامة).'
				}
			]
		},
		summary: {
			rulesAr: [
				'معجم المشكلات البيئية (I problemi ambientali): `l’inquinamento` (التلوث)، `i rifiuti` (النفايات)، `lo spreco d’acqua` (هدر الماء)، `la siccità` (الجفاف)، `la desertificazione` (التصحر)، `il disboscamento` (قطع الأشجار)، `i gas di scarico` (غازات العادم).',
				'معجم الحلول البيئية والطاقات النظيفة (Le soluzioni sostenibili): `la tutela dell’ambiente` (حماية البيئة)، `la raccolta differenziata` (الفرز الانتقائي)، `il riciclaggio` (إعادة التدوير)، `il riutilizzo` (إعادة الاستعمال)، `il rimboschimento` (التشجير)، `il risparmio idrico` (ترشيد الماء)، `l’energia solare` (الطاقة الشمسية)، `l’energia eolica` (طاقة الرياح)، `la Diga Verde` (السد الأخضر الجزائري).',
				'صيغ الدعوة والإلزام البيئي: `dovere + infinito` (*Dobbiamo separare la carta dalla plastica*)، `bisogna + infinito` (*Bisogna spegnere le luci inutili*)، `è importante / è urgente / conviene + infinito` (*Conviene usare borracce riutilizzabili*).',
				'أفعال العمل البيئي اليومي: `risparmiare` (يوفر/يرشد)، `riciclare` (يعيد تدوير)، `piantare` (يغرس)، `pulire` (ينظف)، `conservare` (يحافظ على)، `ridurre` (يقلص)، `rispettare` (يحترم).'
			],
			visualSvg: svgItalianGrammarMap({
				title: 'Tutela dell’ambiente e sviluppo sostenibile',
				rootLabel: 'Proteggere il nostro pianeta',
				rootSub: 'Gesti quotidiani + Energie rinnovabili',
				width: 580,
				branches: [
					{
						label: 'Acqua e boschi',
						rule: 'Risparmio e rimboschimento',
						example: 'chiudere i rubinetti, piantare'
					},
					{
						label: 'Riciclaggio',
						rule: 'Raccolta differenziata',
						example: 'carta, vetro, plastica, organico'
					},
					{
						label: 'Energie pulite',
						rule: 'Sole e vento rinnovabili',
						example: 'pannelli solari, pale eoliche'
					},
					{
						label: 'Espressioni',
						rule: 'Dovere e responsabilità',
						example: 'Dobbiamo ridurre i rifiuti.'
					}
				]
			}),
			visualCaptionAr: 'محاور التربية البيئية والطاقات المتجددة في الوحدة الأولى من الفصل الثالث',
			examples: [
				{
					problemAr:
						'Classifica questi sei vocaboli in «Problemi» o «Soluzioni»: inquinamento, energia eolica, siccità, raccolta differenziata, spreco idrico, rimboschimento.',
					solutionAr:
						'Problemi: inquinamento, siccità, spreco idrico. | Soluzioni: energia eolica, raccolta differenziata, rimboschimento.'
				},
				{
					problemAr:
						'Scrivi due consigli concreti per proteggere l’ambiente a scuola usando «Bisogna» e «Dobbiamo».',
					solutionAr:
						'1) «Bisogna gettare i rifiuti nei contenitori della raccolta differenziata.» | 2) «Dobbiamo chiudere sempre i rubinetti per non sprecare l’acqua.»'
				}
			],
			watchOutAr:
				'انتبه للنوع والعدد في المفردات البيئية الأساسية: كلمة `l’acqua` مؤنثة مفردة وتأخذ `l’` (*l’acqua pulita*, وفي الجمع *le acque pulite*)؛ أما كلمة `l’ambiente` فهي مذكرة (*un ambiente sano*, *l’ambiente naturale*، والجمع *gli ambienti*)؛ وكلمة `il rifiuto` جمعها `i rifiuti`.'
		},
		practice: [
			{
				questionAr:
					'Quale insieme di espressioni riunisce soltanto azioni e fonti positive per la tutela dell’ambiente?',
				options: [
					'rimboschimento, raccolta differenziata, energia solare, risparmio d’acqua',
					'disboscamento, spreco idrico, rifiuti plastici abbandonati, fumo',
					'inquinamento marino, siccità, desertificazione, traffico eccessivo',
					'uso di plastica monouso, luci sempre accese, taglio degli alberi'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! التشجير والفرز الانتقائي والطاقة الشمسية وترشيد الماء كلها حلول بيئية مستدامة.',
					'خطأ: إزالة الغابات وهدر الماء والنفايات المرمية أسباب تدهور بيئي.',
					'خطأ: التلوث والجفاف والتصحر مشكلات بيئية.',
					'خطأ: البلاستيك أحادي الاستعمال وإهدار الكهرباء سلوكيات ضارة.'
				],
				explanationAr:
					'الحلول البيئية تشمل التشجير (rimboschimento)، والفرز الانتقائي (raccolta differenziata)، والطاقة الشمسية (energia solare)، وترشيد الماء.'
			},
			{
				questionAr:
					'Scegli l’articolo e l’aggettivo corretti per «ambiente» e «acqua» al singolare:',
				options: [
					'la ambiente pulita / il acqua fresca',
					'l’ambiente pulito / l’acqua fresca',
					'un’ambiente pulito / una acqua fresco',
					'lo ambiente pulito / l’acqua fresco'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: ambiente اسم مذكر و acqua اسم مؤنث مبدوء بحرف متحرك.',
					'أحسنت! l’ambiente pulito (مذكر مع l’ دون فاصلة في un ambiente) و l’acqua fresca (مؤنث).',
					'خطأ: un ambiente مذكر دون فاصلة عليا، و acqua مؤنث فتأخذ fresca.',
					'خطأ: نستخدم l’ أمام الحرف المتحرك وليس lo.'
				],
				explanationAr:
					'`ambiente` اسم مذكر (l’ambiente pulito)، و`acqua` اسم مؤنث (l’acqua fresca).'
			},
			{
				questionAr:
					'Che cos’è la «raccolta differenziata» citata nei testi ambientali scolastici?',
				options: [
					'Bruciare tutti i rifiuti insieme nel cortile della scuola.',
					'Separare i rifiuti secondo il materiale (carta, plastica, vetro, organico) per riciclarli.',
					'Lasciare le bottiglie di plastica nei parchi pubblici.',
					'Lasciare aperto il rubinetto durante tutta la giornata.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: حرق النفايات يسبب تلوثاً خطيراً للهواء.',
					'صحيح! «raccolta differenziata» تعني الفرز الانتقائي للنفايات حسب المادة لإعادة تدويرها.',
					'خطأ: ترك البلاستيك في الحدائق يضر بالطبيعة.',
					'خطأ: هذا هدر للماء لا علاقة له بالفرز.'
				],
				explanationAr:
					'الفرز الانتقائي (raccolta differenziata) هو فصل الورق والبلاستيك والزجاج والمواد العضوية لتسهيل إعادة التدوير (riciclaggio).'
			}
		]
	},
	{
		id: 'ita_lesson_2as_le_t3_lettura_tecnologia_responsabile',
		slug: 'ita-2as-le-t3-lettura-tecnologia-responsabile',
		grade: '2as_le',
		yearSubjectId: 784,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr:
			'المجال الثالث: البيئة، المطالعة، التكنولوجيا المسؤولة ومنهجية التعبير الكتابي (Ambiente, lettura, tecnologia, futuro e scrittura)',
		order: 2,
		titleAr:
			'المطالعة الهادفة والاستعمال المسؤول للتكنولوجيا والإعلام (Lettura e tecnologia responsabile)',
		objectives: [
			'تعزيز الرصيد المعجمي للمطالعة الجادة، البحث العلمي، والتكنولوجيا المسؤولة (lettura seria, fonti affidabili, sicurezza dei dati)',
			'تحليل التوازن المطلوب بين الكتاب الورقي والموارد الرقمية التعليمية وتفادي التشتت والأخبار الزائفة',
			'صياغة آراء وحجج متزنة بالإيطالية للتعبير عن القيمة التربوية للعلم والمعلومة الموثوقة'
		],
		keywordsAr: [
			'lettura e libri',
			'tecnologia responsabile',
			'fonti affidabili',
			'sicurezza informatica',
			'equilibrio digitale',
			'المطالعة والتكنولوجيا'
		],
		discover: {
			scenarioAr:
				'في ملف العدد الجديد من مجلة الثانوية، يكتب التلاميذ: «Oggi i ragazzi usano ogni giorno il computer e le biblioteche digitali per studiare le lingue e la scienza. Tuttavia, la lettura attenta di un libro stampato resta fondamentale per allenare la memoria e la concentrazione profonda. Un uso responsabile della tecnologia significa verificare l’affidabilità delle fonti, curare la sicurezza dei dati personali e spegnere gli schermi prima di dormire per proteggere la salute.» تأمل اللوحة المرفقة واكتشف ركائز المعرفة المتوازنة.',
			svg: renderLessonIllustration('ita_05_scienza_tecnologia_informazione', {
				lang: 'it',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'ما المحاور الأربعة للمعرفة والتكنولوجيا المسؤولة التي تعرضها اللوحة المرفقة؟',
					hintAr: 'انظر إلى مفتاح اللوحة (المخبر، التعلم الرقمي، الأمن المعلوماتي، والإعلام الجاد).',
					expectedInput: 'البحث العلمي، التعلم الرقمي والكتب، الأمن المعلوماتي وحماية البيانات، والاتصال والإعلام الجاد',
					revealAr:
						'تبرز اللوحة أربعة أركان: البحث العلمي المخبري (*microscopio e ricerca scientifica*)، التعلم الرقمي المقرون بالكتب (*apprendimento digitale e libri*)، الأمن المعلوماتي وحماية البيانات (*sicurezza informatica e dati*)، والاتصال والإعلام الجاد (*comunicazione e giornalismo serio*).'
				},
				{
					promptAr:
						'لماذا يرى النص أن الكتاب الورقي لا يزال أساسياً رغم توفر الحاسوب والمكتبات الرقمية؟',
					hintAr: 'ابحث في الجملة الثانية عن فائدتي القراءة المتأنية.',
					expectedInput: 'لتقوية الذاكرة والتركيز العميق بعيداً عن تشتت الشاشات',
					revealAr:
						'يؤكد النص أن القراءة الهادئة للكتاب المطبوع (`libro stampato`) تقوّي الذاكرة (`memoria`) وتنمي التركيز العميق (`concentrazione profonda`).'
				},
				{
					promptAr:
						'استخرج من النص ثلاث قواعد للاستعمال المسؤول للتكنولوجيا والإعلام الرقمي.',
					hintAr: 'انظر إلى الجملة الأخيرة بعد «Un uso responsabile della tecnologia significa...».',
					expectedInput: 'التحقق من موثوقية المصادر، حماية أمن البيانات الشخصية، وإطفاء الشاشات قبل النوم',
					revealAr:
						'ركائز الاستخدام المسؤول هي: (1) التحقق من موثوقية المصادر (`verificare l’affidabilità delle fonti`)؛ (2) حماية أمن البيانات الشخصية (`sicurezza dei dati personali`)؛ (3) إطفاء الشاشات قبل النوم حفاظاً على الصحة والراحة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'معجم القراءة والثقافة العلمية (Lettura e conoscenza): `il libro cartaceo` (الكتاب الورقي)، `la biblioteca` (المكتبة)، `la lettura critica` (القراءة النقدية)، `la scheda di lettura` (بطاقة المطالعة)، `la ricerca scientifica` (البحث العلمي)، `il ragionamento` (التفكير المنطقي)، `la concentrazione` (التركيز).',
				'معجم التكنولوجيا والاتصال المسؤول (Tecnologia e uso responsabile): `il computer` (الحاسوب)، `la rete` (الشبكة)، `la piattaforma educativa` (المنصة التعليمية)، `le fonti affidabili` (المصادر الموثوقة)، `verificare i dati` (التحقق من المعطيات)، `le notizie false` (الأخبار الزائفة)، `la sicurezza informatica` (الأمن المعلوماتي)، `la riservatezza / privacy` (الخصوصية).',
				'الموازنة بين الفوائد والمخاطر (Vantaggi vs Rischi): الفوائد (`accesso rapido ai dizionari, corsi educativi a distanza, ricerca documentaria`)؛ المخاطر (`distrazione continua, affaticamento degli occhi, diffusione di informazioni non verificate, perdita di tempo`).',
				'تذكير نحوي وإملائي: الأسماء الدخيلة المنتهية بساكن في الإيطالية لا تتغير في الجمع (`il computer -> i computer`, `il tablet -> i tablet`, `il file -> i file`, `il sito web -> i siti web`).'
			],
			visualSvg: svgItalianGrammarMap({
				title: 'Lettura e tecnologia responsabile (2AS LE)',
				rootLabel: 'Informazione seria ed equilibrio',
				rootSub: 'Libro cartaceo + Strumenti digitali sicuri',
				width: 580,
				branches: [
					{
						label: 'Libro cartaceo',
						rule: 'Memoria e concentrazione',
						example: 'leggere 20 minuti al giorno'
					},
					{
						label: 'Fonti affidabili',
						rule: 'Controllo prima di condividere',
						example: 'verificare autore e dati'
					},
					{
						label: 'Sicurezza dati',
						rule: 'Tutela della privacy',
						example: 'password sicure e rispetto'
					},
					{
						label: 'Salute e tempo',
						rule: 'Equilibrio con gli schermi',
						example: 'pause regolari e buon sonno'
					}
				]
			}),
			visualCaptionAr: 'خريطة التكامل بين المطالعة الورقية والاستعمال المسؤول للتكنولوجيا',
			examples: [
				{
					problemAr:
						'Volgi al plurale queste espressioni tecnologiche: «il computer moderno», «il sito affidabile», «la notizia verificata», «l’informazione scientifica».',
					solutionAr:
						'«i computer moderni» (computer resta invariabile!), «i siti affidabili», «le notizie verificate», «le informazioni scientifiche» (-azione -> -azioni).'
				},
				{
					problemAr:
						'Esprimi in italiano un’opinione equilibrata sul rapporto tra libri stampati e risorse digitali.',
					solutionAr:
						'«Le risorse digitali sono utili per cercare dati rapidamente, ma il libro cartaceo rimane insostituibile per studiare con calma e profondità.»'
				}
			],
			watchOutAr:
				'احذر من جمع الكلمات التقنية المنتهية بحرف ساكن بإضافة `-s` الإنجليزية أو الفرنسية! في الإيطالية، الأسماء الدخيلة لا تتغير في الجمع أبداً؛ فقط نغيّر أداة التعريف والصفة: نقول «**i computer portatili**» و«**i tablet nuovi**» و«**gli e-book utili**»، وليس *i computers*!'
		},
		practice: [
			{
				questionAr:
					'Quale abitudine digitale rispetta davvero i princìpi della sicurezza e del rigore informativo?',
				options: [
					'Condividere immediatamente ogni messaggio senza leggerne la fonte.',
					'Verificare l’affidabilità della fonte, proteggere i dati personali e bilanciare lo studio tra libri ed esercizi digitali.',
					'Pubblicare i propri dati privati e le password su siti sconosciuti.',
					'Sostituire completamente la lettura e il sonno con gli schermi.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: نشر الأخبار دون تثبت يروّج للمعلومات المغلوطة.',
					'ممتاز! التحقق من المصادر وحماية البيانات والتوازن بين الكتاب والرقمي هو الاستعمال المسؤول.',
					'خطأ: إفشاء البيانات وكلمات المرور يعرض الأمان الرقمي للخطر.',
					'خطأ: الإفراط في الشاشات يضر بالصحة والتحصيل.'
				],
				explanationAr:
					'الاستخدام المسؤول يجمع بين التثبت من المصادر (affidabilità delle fonti)، وأمن البيانات (sicurezza dei dati)، والاعتدال الزمني.'
			},
			{
				questionAr:
					'Qual è il plurale corretto delle parole «il computer utile», «la ricerca seria», «il dato scientifico»?',
				options: [
					'i computers utili, le ricerce serie, i dati scientifici',
					'i computer utili, le ricerche serie, i dati scientifici',
					'gli computer utili, le ricerche serii, i dato scientifici',
					'i computer utilo, le ricerchi serie, le dati scientifiche'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: كلمة computer لا تأخذ s في الجمع، و ricerca تأخذ h (ricerche).',
					'أحسنت! i computer utili (دون s)، le ricerche serie (تضاف h في -ca/-ga)، i dati scientifici.',
					'خطأ: قبل c لا نستعمل gli، وصفة seria في المؤنث الجمع هي serie.',
					'خطأ: أخطاء في مطابقة الصفات والنوع.'
				],
				explanationAr:
					'في الإيطالية: الأسماء الدخيلة بساكن (`computer`) تبقى ثابتة في الجمع، والأسماء المختومة بـ `-ca` (`ricerca`) تأخذ `h` (`ricerche`).'
			},
			{
				questionAr:
					'Che cosa significa l’espressione «verificare l’affidabilità delle fonti»?',
				options: [
					'Comprare un computer nuovo ogni mese.',
					'Controllare che l’autore e i dati di un’informazione siano seri, documentati e veritieri.',
					'Cancellare tutti i libri dalla biblioteca del liceo.',
					'Copiare un testo lungo senza leggerlo.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا صلة لها بشراء الأجهزة.',
					'صحيح! تعني التحقق من جدية الكاتب وتوثيق المعطيات وصدق الخبر.',
					'خطأ: عكس البحث المنهجي.',
					'خطأ: النسخ الأعمى ينافي الأمانة العلمية.'
				],
				explanationAr:
					'`Affidabilità delle fonti` تعني موثوقية المصادر، وفعل `verificare` يعني التحقق والتدقيق العلمي.'
			}
		]
	},
	{
		id: 'ita_lesson_2as_le_t3_futuro_pronomi_diretti_indiretti',
		slug: 'ita-2as-le-t3-futuro-pronomi-diretti-indiretti',
		grade: '2as_le',
		yearSubjectId: 784,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr:
			'المجال الثالث: البيئة، المطالعة، التكنولوجيا المسؤولة ومنهجية التعبير الكتابي (Ambiente, lettura, tecnologia, futuro e scrittura)',
		order: 3,
		titleAr:
			'المستقبل البسيط والضمائر المباشرة وغير المباشرة والاشتقاق الصرفي (Futuro semplice, pronomi e morfologia)',
		objectives: [
			'تصريف الأفعال القياسية وغير القياسية في زمن المستقبل البسيط (Futuro semplice: -are -> -erò، وتغييرات -care/-gare و -ciare/-giare، والشواذ sarò, avrò, farò, andrò, verrò, potrò, dovrò)',
			'التمييز الدقيق بين الضمائر المباشرة (mi, ti, lo, la, ci, vi, li, le) والضمائر غير المباشرة (mi, ti, gli, le, ci, vi, gli) وضبط مطابقة اسم المفعول مع الضمائر المباشرة',
			'استثمار الاشتقاق الصرفي وبناء العائلات اللغوية (Verbo | Sostantivo | Aggettivo) بالسوابق واللواحق الإيطالية'
		],
		keywordsAr: [
			'futuro semplice',
			'pronomi diretti',
			'pronomi indiretti',
			'morfologia lessicale',
			'verbo sostantivo aggettivo',
			'المستقبل والضمائر والمورفولوجيا'
		],
		discover: {
			scenarioAr:
				'يخطط طارق وزملاؤه لمشاريع السنة المقبلة: «L’anno prossimo frequenteremo il terzo anno e lavoreremo con ancora più impegno. Se troverò un libro utile sul riciclaggio, lo leggerò con attenzione e lo presterò ai compagni. Quando vedrò il nostro professore, gli chiederò alcuni consigli, e lui ci darà nuove schede. Così faremo un lavoro davvero riutilizzabile e informativo!» لاحظ أفعال المستقبل والضمائر «lo / gli / ci» والاشتقاق «riutilizzabile / informativo».',
			svg: svgItalianTenseTimeline({
				title: 'Progetti e previsioni',
				tenseName: 'Futuro Semplice',
				formula: 'radice (-ar -> -er, -er/-ir) + -ò, -ai, -à, -emo, -ete, -anno',
				activeZone: 'future',
				example: 'Domani scriverò la sintesi e la consegnerò al professore.',
				markers: 'domani, la settimana prossima, tra due giorni, in futuro',
				width: 580
			}),
			steps: [
				{
					promptAr:
						'لاحظ الصيغ المستقبلية في النص: «frequenteremo» (من frequentare) و«faremo» (من fare). كيف تتغير لاحقة -are في Futuro Semplice وما أبرز الشواذ؟',
					hintAr: 'انظر إلى حرف a في -are الذي تحوّل إلى e، وإلى اختصار الجذر في fare/essere/avere.',
					expectedInput: 'في -are تتحول a إلى e (-erò, -eremo)، أما الشواذ فتختصر جذرها مثل farò, sarò, avrò, andrò, verrò',
					revealAr:
						'في المستقبل البسيط (Futuro Semplice): المجموعتان `-are` و`-ere` تشتركان في الجذر `-er-` (*parlerò, leggerò*) والمجموعة `-ire` تحتفظ بـ `-ir-` (*finirò*). أما الأفعال الشاذة فتسقط حركة أو تتبدل: `essere -> sarò`, `avere -> avrò`, `fare -> farò`, `andare -> andrò`, `venire -> verrò`, `potere -> potrò`, `dovere -> dovrò`, `volere -> vorrò`, `vedere -> vedrò`, `sapere -> saprò`.'
				},
				{
					promptAr:
						'فرق بين الضميرين في «lo leggerò» (من leggere un libro) و«gli chiederò» (من chiedere al professore): أيهما مباشر وأيهما غير مباشر؟',
					hintAr: 'هل الفعل leggere يأخذ مفعولاً مباشراً (che cosa?) أم بحرف الجر a (a chi?)؟',
					expectedInput: 'lo ضمير مباشر يعوّض المفعول به المباشر (il libro)، و gli ضمير غير مباشر يعوّض a + شخص (al professore)',
					revealAr:
						'الضمير المباشر (`lo, la, li, le`) يحل محل المفعول به المباشر دون حرف جر (*Leggo il libro -> Lo leggo*؛ *Compro le riviste -> Le compro*). أما الضمير غير المباشر (`gli` للمذكر المفرد والجمع، `le` للمؤنث المفرد) فيحل محل `a + persona` (*Chiedo al professore -> Gli chiedo*؛ *Scrivo a mia sorella -> Le scrivo*).'
				},
				{
					promptAr:
						'حلّل البنية الصرفية للكلمة «riutilizzabile» (السابقة + الجذر + اللاحقة)، وما الفعل والاسم المشتقان من الجذر نفسه؟',
					hintAr: 'فكر في: ri- + utilizz(are) + -abile.',
					expectedInput: 'ri- (سابقة التكرار) + utilizz- (جذر utilizzare) + -abile (لاحقة الصفة)؛ والاسم utilizzazione / utilizzo',
					revealAr:
						'الاشتقاق الصرفي في الإيطالية يربط العائلة اللغوية (`Verbo | Sostantivo | Aggettivo`): من الفعل `utilizzare` نصوغ الاسم `utilizzazione / utilizzo` والصفة `utilizzabile` ومع السابقة `ri-` تصبح `riutilizzabile` (قابل لإعادة الاستعمال)!'
				}
			]
		},
		summary: {
			rulesAr: [
				'المستقبل البسيط (Futuro Semplice): النهايات لكل الأفعال هي `-ò, -ai, -à, -emo, -ete, -anno` (بهمزة/نبرة وجوبية على المفرد الأول والثالث `-ò, -à`!). التعديلات الإملائية: `-care/-gare` تضيف `h` (*cercherò, pagherai*) و`-ciare/-giare` تحذف `i` (*comincerò, viaggeremo*). الشواذ الرئيسية: `essere (sarò), avere (avrò), fare (farò), dare (darò), stare (starò), andare (andrò), venire (verrò), potere (potrò), dovere (dovrò), volere (vorrò), sapere (saprò), vedere (vedrò), rimanere (rimarrò), tenere (terrò)`.',
				'الضمائر المباشرة (Pronomi diretti — chi? / che cosa?): `mi, ti, lo, la, ci, vi, li, le`. توضع قبل الفعل المصرف (*Ascolto la lezione -> La ascolto*) أو تلصق بنهاية المصدر (*Devo leggerlo*). قاعدة حاسمة في الماضي المركب: مع `lo, la, li, le` يتطابق اسم المفعول وجوباً مع الضمير المباشر (*Ho visto i ragazzi -> Li ho visti*; *Ho scritto la lettera -> L’ho scritta*)!',
				'الضمائر غير المباشرة (Pronomi indiretti — a chi?): `mi, ti, gli (a lui / a loro), le (a lei), ci, vi`. توضع قبل الفعل المصرف (*Telefono a mia madre -> Le telefono*; *Offro un libro a Marco -> Gli offro un libro*; *Parlo ai compagni -> Gli parlo*) — ولا يحدث معها تطابق في اسم المفعول أبداً (*Le ho telefonato*).',
				'المورفولوجيا واشتقاق العائلة اللغوية (Verbo | Sostantivo | Aggettivo): لواحق الأسماء الشائعة (`-zione, -mento, -anza/-enza, -ità`: *proteggere -> protezione*, *informare -> informazione*, *cambiare -> cambiamento*, *responsabile -> responsabilità*)؛ ولواحق الصفات (`-bile, -ivo, -ale, -oso, -ato`: *rispettare -> rispettoso*, *informare -> informativo*, *riciclare -> riciclabile*)؛ وسوابق النفي والتكرار (`in-, im-, ir-, dis-, s-, ri-`).'
			],
			visualSvg: svgItalianWordFormation({
				title: 'Morfologia lessicale : Prefisso + Radice + Suffisso',
				prefix: 'ri-',
				root: 'utilizz-',
				suffix: '-abile',
				derivedWord: 'riutilizzabile (agg.)',
				meaningNote: 'Verbo: riutilizzare | Sostantivo: riutilizzo',
				width: 560
			}),
			visualCaptionAr: 'نموذج الاشتقاق الصرفي للعائلة اللغوية (فعل — اسم — صفة) في الإيطالية',
			examples: [
				{
					problemAr:
						'Coniuga al Futuro Semplice: «L’anno prossimo noi (cercare) fonti affidabili, (fare) progetti ecologici e (andare) alla biblioteca nazionale.»',
					solutionAr:
						'«L’anno prossimo noi cercheremo (con h!) fonti affidabili, faremo (irreg.) progetti ecologici e andremo (irreg.) alla biblioteca nazionale.»'
				},
				{
					problemAr:
						'Sostituisci con il pronome diretto o indiretto adatto (attenzione al Passato Prossimo!): «a) Ho comprato questi libri -> ...... ho comprat... ieri. b) Scrivo un messaggio a mia cugina -> ...... scrivo oggi.»',
					solutionAr:
						'«a) Li ho comprati ieri (pronome diretto li -> accordo -i!). | b) Le scrivo oggi (pronome indiretto a lei -> le).»'
				}
			],
			watchOutAr:
				'احذر من خطأين امتحانين رئيسيين: (1) الخلط بين `le` المباشرة (للجمع المؤنث: *Compro le mele -> **Le** compro / **Le** ho comprate*) و `le` غير المباشرة (للمفرد المؤنث: *Scrivo a mia sorella -> **Le** scrivo / **Le** ho scritto* دون تغيير -o)؛ (2) في المستقبل، لا تنسَ النبرة (`accento grave`) على `io` و`lui/lei` (*sarò, farà, andrò, studierà*), ولا تنسَ `h` في `-care/-gare` (*cercherò, navigheremo*)!'
		},
		practice: [
			{
				questionAr:
					'Quale frase contiene soltanto forme corrette del Futuro Semplice?',
				options: [
					'Domani io cercerò il testo, noi faremo gli esercizi e loro anderanno a casa.',
					'Domani io cercherò il testo, noi faremo gli esercizi e loro andranno a casa.',
					'Domani io cerchero il testo, noi faramo gli esercizi e loro andranno a casa.',
					'Domani io cercherò il testo, noi faceremo gli esercizi e loro verrano a casa.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: cercerò ينقصها حرف h (cercherò)، و anderanno الصواب فيها andranno.',
					'ممتاز! cercherò (إضافة h)، faremo و andranno (جذور مستقبل شاذة مضبوطة مع النبرة).',
					'خطأ: سقطت النبرة من cercherò والنهاية الصحيحة مع noi هي -emo (faremo).',
					'خطأ: الجذر الشاذ لـ fare هو far- و لـ venire هو verr- (verranno).'
				],
				explanationAr:
					'في المستقبل البسيط: `-care` تضيف `h` (`cercherò`)، و`fare -> faremo`، و`andare -> andranno`، مع نبرة إجبارية على المفرد الأول والثالث.'
			},
			{
				questionAr:
					'Completa con il pronome corretto e il participio concordato: «Ho trovato le riviste italiane in biblioteca e ...... ho lett... con interesse; poi ho incontrato Salma e ...... ho chiesto un consiglio.»',
				options: [
					'li / letti / gli',
					'le / lette / le',
					'le / letto / gli',
					'la / letta / ci'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: le riviste جمع مؤنث فتأخذ le مع lette، و Salma مؤنث مفرد تأخذ le (a lei).',
					'أحسنت! le (تعوّض le riviste، فيتطابق اسم المفعول: lette)، و le في الثانية تعوّض a Salma (ضمير غير مباشر).',
					'خطأ: مع الضمير المباشر le يجب مطابقة اسم المفعول إلى lette، و a Salma تأخذ le لا gli.',
					'خطأ: la للمفرد بينما riviste جمع.'
				],
				explanationAr:
					'الضمير المباشر الجمع المؤنث `le` يفرض مطابقة اسم المفعول (`le ho lette`)، والضمير غير المباشر لـ «a Salma» هو `le` (`le ho chiesto`).'
			},
			{
				questionAr:
					'Quale terna «Verbo | Sostantivo | Aggettivo» è morfologicamente corretta in italiano?',
				options: [
					'proteggere | proteziona | proteggibile',
					'informare | informazione | informativo',
					'educare | educamento | educazione',
					'riciclare | riciclo | ricicliamo'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الاسم الصحيح من proteggere هو protezione والصفة protettivo.',
					'صحيح! informare (فعل) | informazione (اسم) | informativo (صفة).',
					'خطأ: educazione اسم لا صفة (الصفة هي educativo).',
					'خطأ: ricicliamo فعل مصرف لا صفة (الصفة هي riciclabile).'
				],
				explanationAr:
					'العائلة اللغوية الكاملة تفرق بدقة بين الفعل في المصدر (informare)، والاسم (informazione)، والصفة (informativo).'
			}
		]
	},
	{
		id: 'ita_lesson_2as_le_t3_metodologia_produzione_scritta',
		slug: 'ita-2as-le-t3-metodologia-produzione-scritta',
		grade: '2as_le',
		yearSubjectId: 784,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr:
			'المجال الثالث: البيئة، المطالعة، التكنولوجيا المسؤولة ومنهجية التعبير الكتابي (Ambiente, lettura, tecnologia, futuro e scrittura)',
		order: 4,
		titleAr:
			'منهجية التحرير الكتابي والروابط المنطقية (Metodologia della produzione scritta e connettivi)',
		objectives: [
			'بناء نص إيطالي متماسك من 100 إلى 130 كلمة وفق الهيكلة الثلاثية المعتمدة (introduzione, svolgimento, conclusione)',
			'توظيف الروابط المنطقية والزمنية بدقة لتنظيم الأفكار (innanzitutto, inoltre, tuttavia, pertanto, in conclusione)',
			'التمييز بين أساليب الكتابة المقررة في 2AS LE (النص الإخباري/الإقناعي، الرسالة أو البريد الإلكتروني، والمقال المدرسي) مع مراجعة الأخطاء الشائعة'
		],
		keywordsAr: [
			'produzione scritta',
			'struttura del testo',
			'connettivi logici',
			'lettera e articolo',
			'revisione grammaticale',
			'منهجية الإنتاج الكتابي'
		],
		discover: {
			scenarioAr:
				'يستعد تلاميذ 2AS LE للامتحان الفصلي بقراءة نموذج تطبيقي: «La tutela dell’ambiente riguarda ogni studente responsabile. Innanzitutto, a scuola possiamo fare la raccolta differenziata e risparmiare l’acqua. Inoltre, è utile promuovere la lettura su carta per ridurre l’uso eccessivo dei dispositivi digitali. Tuttavia, molti ragazzi dimenticano ancora questi semplici gesti. In conclusione, se collaboreremo insieme ogni giorno, renderemo il nostro liceo più pulito e accogliente.» تأمل الروابط المسطرة وكيف انتقل النص من المقدمة إلى العرض ثم الخاتمة.',
			svg: svgItalianGrammarMap({
				title: 'Connettivi logici per la produzione scritta',
				rootLabel: 'Collegare le idee con coerenza',
				rootSub: 'Ordine, aggiunta, contrasto e conclusione',
				width: 580,
				branches: [
					{
						label: 'Ordine',
						rule: 'Aprire e guidare il testo',
						example: 'Innanzitutto, In primo luogo, Poi'
					},
					{
						label: 'Aggiunta / Causa',
						rule: 'Sviluppare argomenti',
						example: 'Inoltre, Perché, Poiché, Infatti'
					},
					{
						label: 'Contrasto',
						rule: 'Introdurre un limite',
						example: 'Tuttavia, Però, Al contrario'
					},
					{
						label: 'Conclusione',
						rule: 'Chiudere con sintesi',
						example: 'Pertanto, In conclusione, Dunque'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'قسّم النموذج السابق إلى أجزائه الثلاثة (المقدمة، العرض، الخاتمة)، وحدد وظيفة كل جزء.',
					hintAr: 'الجملة الأولى تقدم الموضوع، الوسطى تشرح الحجج، والأخيرة تلخص وتفتح أفقاً.',
					expectedInput: 'Introduzione (عرض الموضوع) -> Svolgimento (الأفكار والحجج والاعتراض) -> Conclusione (الخلاصة والتوصية)',
					revealAr:
						'يتبع النص بنية منهجية دقيقة: (1) **Introduzione** (جملة تمهيدية تعرّف بأهمية الموضوع)؛ (2) **Svolgimento** (تطوير الفكرتين بالروابط *Innanzitutto / Inoltre* مع ذكر التحدي بـ *Tuttavia*)؛ (3) **Conclusione** (خلاصة مسؤولة تربط العمل بالنتيجة المستقبلية بـ *In conclusione*).'
				},
				{
					promptAr:
						'ما المعنى المنطقي لكل رابط من الروابط الأربعة الآتية: «Innanzitutto», «Inoltre», «Tuttavia», «Pertanto»؟',
					hintAr: 'طابق بين البدء، الإضافة، الاستدراك/التعارض، والنتيجة.',
					expectedInput: 'Innanzitutto (أولاً)، Inoltre (علاوة على ذلك)، Tuttavia (ومع ذلك)، Pertanto (ولذلك/وبالتالي)',
					revealAr:
						'`Innanzitutto` لترتيب الفكرة الأولى؛ `Inoltre` لإضافة حجة جديدة؛ `Tuttavia` للاستدراك أو إظهار وجهة نظر مقابلة؛ و`Pertanto / Quindi` لبيان النتيجة المنطقية.'
				},
				{
					promptAr:
						'إذا طُلب منك كتابة «رسالة أو بريد إلكتروني» بدلاً من «مقال مدرسي»، ما العناصر الشكلية التي يجب إضافتها في البداية والنهاية؟',
					hintAr: 'فكر في المكان والتاريخ، عبارة التحية الافتتاحية، وعبارة الختام.',
					expectedInput: 'التاريخ والمكان (اختيارياً)، صيغة التحية (Caro/Cara... أو Gentile...)، والختام الودي أو الرسمي مع التوقيع',
					revealAr:
						'تتميز الرسالة أو البريد الإلكتروني بـ: صيغة الافتتاح (`Caro amico, / Cara Salma,` للودية؛ أو `Gentile Professore,` للرسمية)، ثم عرض الموضوع بفقرات واضحة، ثم سؤال ودي وخاتمة مناسبة (`Un caro saluto, / Cordiali saluti,`) متبوعة بالاسم.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الهيكلة الثلاثية للموضوع (100–130 كلمة): **Introduzione** (تمهيد مباشر للفكرة العامة في سطرين أو ثلاثة)؛ **Svolgimento** (فقرة أو فقرتان لتطوير العناصر المطلوبة في *Punti di riflessione* بأسلوب مترابط لا كرؤوس أقلام)؛ **Conclusione** (خلاصة تركيبية أو دعوة بناءة أو سؤال ختامي في الرسالة).',
				'خريطة الروابط المنطقية (Connettivi): الترتيب (`Innanzitutto, In primo luogo, Poi, Infine`)؛ الإضافة (`Inoltre, Per di più, Anche`)؛ السبب (`Perché, Poiché, Siccome`)؛ النتيجة (`Quindi, Perciò, Pertanto, Di conseguenza`)؛ الاستدراك (`Tuttavia, Però, Nonostante ciò`)؛ الخاتمة (`In conclusione, In sintesi, Insomma`).',
				'أنماط الكتابة في 2AS LE: (أ) **Articolo scolastico / Testo espositivo** (عنوان قصير دال، أسلوب موضوعي واضح يجمع بين الحاضر والمستقبل أو الماضي حسب الموضوع)؛ (ب) **Diario / Racconto personale** (توظيف سليم للماضي المركب والماضي الناقص وأدوات الربط الزمني)؛ (ج) **Lettera / Email** (تحية افتتاحية وخاتمة مطابقتان للمرسل إليه).',
				'قائمة المراجعة النهائية (Autocontrollo): التحقق من (1) تغطية كل نقاط *Traccia 1* أو وضوح الفكرة في *Traccia 2*؛ (2) مطابقة الفعل للفاعل والأزمنة والنبرة على `-ò/-à` و`è`؛ (3) أدوات التعريف وحروف الجر المركبة وصفات الملكية؛ (4) علامات الترقيم وتقسيم الفقرات بوضوح.'
			],
			visualSvg: svgItalianWritingBlueprint({
				title: 'Schema della Produzione Scritta (2AS LE)',
				width: 580,
				steps: [
					{
						stage: 'Introduzione',
						detail: 'Presenta il tema in modo chiaro e diretto (2-3 righe).'
					},
					{
						stage: 'Svolgimento',
						detail: 'Sviluppa i punti con esempi concreti e frasi legate.'
					},
					{
						stage: 'Connettivi',
						detail: 'Usa: Innanzitutto, Inoltre, Tuttavia, Pertanto.'
					},
					{
						stage: 'Conclusione',
						detail: 'Chiudi con una sintesi positiva e controlla gli accordi.'
					}
				]
			}),
			visualCaptionAr: 'المخطط المنهجي المعتمد لبناء التعبير الكتابي في فروض واختبارات 2AS LE',
			examples: [
				{
					problemAr:
						'Collega queste due frasi con il connettivo logico più preciso (tuttavia / pertanto / inoltre): «a) Gli strumenti digitali offrono dizionari veloci. ......, è necessario verificare sempre le fonti. b) Maria ha studiato ogni giorno con metodo. ......, ha ottenuto ottimi risultati.»',
					solutionAr:
						'«a) Tuttavia (contrasto/precauzione). | b) Pertanto / Perciò (conseguenza logica).»'
				},
				{
					problemAr:
						'Scrivi un’apertura e una chiusura adatte per un’email amichevole a uno studente italiano di nome Luca.',
					solutionAr:
						'Apertura: «Ciao Luca, come stai? Ti scrivo da Costantina per raccontarti la nostra settimana ecologica al liceo.» | Chiusura: «Aspetto presto una tua risposta. Un caro saluto, Karim.»'
				}
			],
			watchOutAr:
				'احذر من خطأين ينقصان العلامة في الإنتاج الكتابي: (1) نقل عناصر «Punti di riflessione» كقائمة نقاط مفككة بدلاً من صياغتها في فقرات مترابطة بالروابط المنطقية؛ (2) الخلط بين `perché` و `siccome / poiché`: لا نبدأ الجملة في الإيطالية عادة بـ `Perché` للسبب إلا في الإجابة المباشرة عن سؤال، بل نبدأ السبب في أول الجملة بـ `Poiché` أو `Siccome`!'
		},
		practice: [
			{
				questionAr:
					'Quale sequenza di connettivi logici rispetta l’ordine naturale di un testo espositivo (apertura -> aggiunta -> contrasto -> chiusura)?',
				options: [
					'In conclusione -> Tuttavia -> Innanzitutto -> Inoltre',
					'Innanzitutto -> Inoltre -> Tuttavia -> In conclusione',
					'Tuttavia -> In conclusione -> Pertanto -> Innanzitutto',
					'Inoltre -> Innanzitutto -> In sintesi -> Poi'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا نبدأ المقال بـ In conclusione.',
					'ممتاز! Innanzitutto (البدء) -> Inoltre (الإضافة) -> Tuttavia (الاستدراك) -> In conclusione (الخاتمة).',
					'خطأ: وضع الخاتمة في الوسط والافتتاح في النهاية يفكك التماسك.',
					'خطأ: الترتيب غير منطقي.'
				],
				explanationAr:
					'تسلسل الروابط المنطقية السليم ينتقل من الافتتاح (Innanzitutto) إلى الإضافة (Inoltre) فالاستدراك (Tuttavia) ثم الخاتمة (In conclusione).'
			},
			{
				questionAr:
					'Completa con il connettivo causale adatto all’inizio della frase: «...... il libro cartaceo favorisce la concentrazione, molti insegnanti lo consigliano ogni giorno.»',
				options: [
					'Tuttavia',
					'Poiché',
					'Quindi',
					'In conclusione'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: tuttavia تعبر عن التعارض لا عن السبب.',
					'أحسنت! `Poiché` (مثل Siccome) تبدأ الجملة السببية قبل النتيجة في اللغة الإيطالية.',
					'خطأ: quindi تعبر عن النتيجة وتوضع قبل النتيجة لا قبل السبب.',
					'خطأ: in conclusione رابط ختامي.'
				],
				explanationAr:
					'لتقديم السبب في بداية الجملة نستعمل `Poiché` أو `Siccome` (بمعنى: بما أن / لأن).'
			},
			{
				questionAr:
					'Quale coppia di formule appartiene al registro cortese adatto a una lettera per un compagno di scambio scolastico?',
				options: [
					'Caro amico, ... / Un caro saluto,',
					'Egr. Direttore, ... / Con osservanza burocratica,',
					'Fine del testo. / Rispondi subito!',
					'Capitolo primo: / Nota bene:'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! «Caro amico,» للبدء و«Un caro saluto,» للختام الودي المهذب.',
					'خطأ: هذه صيغ إدارية رسمية شديدة الجفاف لصديق مراسلة.',
					'خطأ: عبارة «Rispondi subito!» غير مهذبة.',
					'خطأ: هذه عناوين فصول وليست صيغ مراسلة.'
				],
				explanationAr:
					'في الرسائل الموجهة للأصدقاء والزملاء نستخدم صيغاً مهذبة دافئة مثل `Caro/a...` و`Un caro saluto`.'
			}
		]
	}
];
