import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';
import {
	svgItalianConjugationChart,
	svgItalianGrammarMap,
	svgItalianTenseTimeline
} from '../../svg-italian';
import type { ItalianInteractiveLessonData } from '../../types';

/**
 * 3AS BAC Foreign Languages (لغات أجنبية — yearSubjectId: 795, coeff 4, 03h00, 7+7+6=20)
 * Interactive Lessons — Trimestre 2 : Alimentazione Halal, Artigianato, Scienza, Media & Congiuntivo / Discorso Indiretto (4 lessons)
 */
export const LESSONS_3AS_LE_T2: ItalianInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 1: Alimentazione Sana Mediterranea e Artigianato di Qualità
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_lesson_3as_le_t2_alimentazione_artigianato_qualita',
		slug: 'ita-3as-le-t2-alimentazione-artigianato-qualita',
		grade: '3as_le',
		yearSubjectId: 795,
		trimesterId: 't2',
		sequenceId: 'unita2',
		sequenceTitleAr:
			'المحور الثاني: التغذية الصحية الحلال، الحرف، العلم والإعلام وصيغة Congiuntivo والكلام غير المباشر (Alimentazione, Scienza & Congiuntivo)',
		order: 1,
		titleAr:
			'التغذية المتوسطية الصحية والحرف اليدوية الراقية (Alimentazione sana mediterranea e artigianato di qualità)',
		objectives: [
			'تحليل نصوص التغذية المتوازنة والمنتجات الزراعية الطبيعية في حوض المتوسط (olio d’oliva, verdure fresche, cereali integrali, datteri, agrumi, acqua pura) باللغة الإيطالية',
			'استكشاف محور الحرف اليدوية الراقية والمهن التقليدية الأصيلة (ceramica geometrica, tessuti artigianali, lavorazione del legno e del rame) كرافد للاقتصاد المحلي والهوية الثقافية',
			'استثمار المعجم الغذائي والحرفي الصحيح في الفهم والإنتاج الكتابي مع التوعية بمخاطر الوجبات السريعة والتبذير الغذائي'
		],
		keywordsAr: [
			'Dieta mediterranea (التغذية المتوسطية)',
			'Olio d’oliva e datteri (زيت الزيتون والتمور)',
			'Cereali e ortaggi (الحبوب والخضر)',
			'Artigianato (الحرف اليدوية)',
			'Ceramica geometrica (الخزف الهندسي)',
			'Spreco alimentare (التبذير الغذائي)'
		],
		discover: {
			scenarioAr:
				'يجمع المنهج الجزائري للغة الإيطالية في هذا المحور بين ثروات الأرض الطيبة في الجزائر وإيطاليا (زيت الزيتون الطبيعي، التمور، الحمضيات، الحبوب الكاملة، الخضر الموسمية، والماء النقي) وبين براعة الحرفيين في الخزف الهندسي والنسيج التقليدي المتوارث عبر الأجيال؛ مما يقدم نماذج أصيلة للتنمية المحلية المسؤولة.',
			svg: renderLessonIllustration('ita_06_alimentazione_sana_artigianato', {
				lang: 'it',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'اقرأ الجملة التالية: «Una dieta equilibrata a base di olio d’oliva naturale, legumi, cereali integrali, datteri e frutta di stagione protegge la salute ed evita gli eccessi del cibo industriale.» ما البديل الصحي الذي يقترحه الكاتب؟',
					hintAr: 'لاحظ العناصر الطبيعية المذكورة في مقابل الطعام الصناعي السريع.',
					expectedInput: 'التغذية المتوازنة القائمة على زيت الزيتون والبقول والحبوب الكاملة والتمور والفواكه الموسمية',
					revealAr:
						'تقوم التغذية المتوسطية السليمة والحلال على الاعتدال، اختيار المنتجات الطازجة الموسمية، تجنب الإسراف، وتقليص السكريات والدهون المصنعة.'
				},
				{
					promptAr:
						'في عبارة: «Nella bottega dell’artigiano, la ceramica geometrica e i tessuti lavorati a mano raccontano la pazienza e la maestria di un mestiere antico», ما القيمتان اللتان يبرزهما العمل الحرفي؟',
					hintAr: 'ابحث عن الاسمين بعد الفعل «raccontano».',
					expectedInput: 'الصبر (la pazienza) والمهارة والإتقان (la maestria)',
					revealAr:
						'يمثل الحرفي نموذجاً للعمل المتقن الصادق (lavoro eseguito con cura e pazienza) وللاقتصاد المحلي المستدام الذي يصون التراث الجمالي والهندسي.'
				},
				{
					promptAr:
						'اذكر مثالين عمليين للحد من التبذير الغذائي (spreco alimentare) وتشجيع الحرف المحلية في محيطك.',
					hintAr: 'فكر في شراء حاجتك الفعلية فقط، حفظ الطعام، واقتناء منتجات الحرفيين المحليين.',
					expectedInput: 'تخطيط المشتريات الغذائية حسب الحاجة دون إسراف، ودعم التعاونيات الحرفية المحلية',
					revealAr:
						'الربط بين صحة الغذاء، محاربة التبذير، ودعم الحرف اليدوية الوطنية مادة غنية لأسئلة الرأي الشخصي في بكالوريا الإيطالية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'ركائز التغذية الصحية الحلال في نصوص 3AS LE: زيت الزيتون البكر (olio extravergine d’oliva)، الخضر الطازجة والبقوليات (verdure fresche e legumi)، الحبوب الكاملة (cereali integrali)، التمور والحمضيات (datteri e agrumi)، وشرب الماء النقي بانتظام.',
				'مخاطر العادات الغذائية السريعة (cibo veloce / junk food): الإفراط في الملح والدهون المشبعة، قلة الألياف، والتبذير الغذائي (lo spreco alimentare) في مقابل التوجيه إلى الاعتدال والتوازن.',
				'ركائز الحرف اليدوية الراقية (L’artigianato di qualità): الخزف الهندسي المزخرف (la ceramica geometrica)، المنسوجات والسجاد التقليدي (tessuti e tappeti artigianali)، صناعة النحاس والخشب، والورشات التكوينية لنقل الخبرة للشباب.',
				'المعجم المفتاحي للمحور: alimentazione equilibrata (تغذية متوازنة)، prodotti naturali di stagione (منتجات طبيعية موسمية)، filiera corta (سلسلة إنتاج قصيرة محلية)، maestro artigiano (حرفي معلم)، sostenibilità economica (استدامة اقتصادية).'
			],
			visualSvg: svgItalianGrammarMap({
				title: 'Alimentazione Sana e Artigianato (3AS LE)',
				rootLabel: 'Qualità naturale e lavoro manuale',
				rootSub: 'Salute quotidiana e tradizione produttiva',
				branches: [
					{
						label: 'Dieta sana',
						rule: 'Olio d’oliva, ortaggi e acqua',
						example: 'cereali integrali e datteri'
					},
					{
						label: 'Anti-spreco',
						rule: 'Consumo sobrio e consapevole',
						example: 'evitare eccessi inutili'
					},
					{
						label: 'Ceramica e tessuti',
						rule: 'Motivi geometrici e qualità',
						example: 'botteghe storiche locali'
					},
					{
						label: 'Economia locale',
						rule: 'Trasmettere i mestieri ai giovani',
						example: 'cooperative artigianali'
					}
				],
				width: 580
			}),
			visualCaptionAr:
				'الخريطة المفهومية لوحدة التغذية المتوسطية الصحية والحرف اليدوية الراقية في البكالوريا.',
			examples: [
				{
					problemAr:
						'Domanda di comprensione: «Perché i nutrizionisti consigliano di preferire i prodotti locali di stagione rispetto ai cibi molto trasformati?»',
					solutionAr:
						'Perché conservano meglio le vitamine, contengono meno additivi artificiali, sostengono gli agricoltori locali e riducono l’impatto ambientale dei trasporti.'
				},
				{
					problemAr:
						'Riflessione personale (4 righe): «Come si può incoraggiare la gioventù a imparare i mestieri dell’artigianato tradizionale?»',
					solutionAr:
						'Per attirare i giovani verso l’artigianato occorre valorizzare queste professioni nelle scuole di formazione, creare borse di apprendistato presso i maestri artigiani e facilitare l’accesso a piccole cooperative moderne.'
				}
			],
			watchOutAr:
				'احذر الخلط بين «la dieta» (النظام الغذائي المتوازن بوجه عام) و«la dieta dimagrante»؛ وانتبه لجمع الأسماء ذات الشدة الأخيرة مثل «la qualità / le qualità» و«la città / le città» فلا يتغير شكلها في الجمع!'
		},
		practice: [
			{
				questionAr:
					'Quale combinazione rappresenta correttamente i pilastri di una sana alimentazione mediterranea?',
				options: [
					'Olio d’oliva naturale, verdure fresche, cereali integrali, datteri e acqua pura',
					'Esclusivamente bibite gassate zuccherate e spuntini fritti',
					'Pasti industriali ricchi di additivi consumati in fretta',
					'Rinuncia totale alla frutta e alle verdure di stagione'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: هذه المكونات الطبيعية تمثل نموذج التغذية الصحية المتوازنة.',
					'خطأ: المشروبات المحلاة والمقليات تضر بالتوازن الصحي.',
					'خطأ: الأطعمة فائقة التصنيع غير صحية عند الاعتماد عليها.',
					'خطأ: الفواكه والخضر الموسمية مصدر أساس للفيتامينات والألياف.'
				],
				explanationAr:
					'ترتكز التغذية المتوسطية الصحية على زيت الزيتون والخضر والحبوب الكاملة والفواكه الموسمية والماء النقي.'
			},
			{
				questionAr: 'Che cosa caratterizza il lavoro di una bottega artigianale autentica?',
				options: [
					'La produzione in serie senza controllo qualitativo',
					'La cura dei dettagli, la durata nel tempo e la trasmissione del sapere manuale',
					'L’abbandono delle tecniche geometriche tradizionali',
					'Lo spreco sistematico delle materie prime'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الإنتاج الآلي الجماعي يقابل الصناعة الواسعة لا الحرفة اليدوية.',
					'ممتاز: العناية بالتفاصيل والجودة ونقل المهارة سمات الحرف اليدوية الأصيلة.',
					'خطأ: الحرف التقليدية تحافظ على الزخرفة الهندسية الراقية.',
					'خطأ: الحرفي يتقن استثمار المواد الطبيعية دون تبذير.'
				],
				explanationAr:
					'يمتاز العمل الحرفي بالإتقان، الاستدامة، والحفاظ على الموروث الجمالي والتقني.'
			},
			{
				questionAr: 'Che cosa indica l’espressione «combattere lo spreco alimentare»?',
				options: [
					'Acquistare il doppio del cibo necessario',
					'Organizzare gli acquisti e utilizzare con misura gli alimenti per non gettare cibo buono',
					'Eliminare tutti i mercati contadini locali',
					'Consumare soltanto prodotti importati da lontano'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الشراء المفرط يسبب التبذير.',
					'صحيح: ترشيد الشراء والاستهلاك يمنع رمي الطعام السليم.',
					'خطأ: الأسواق المحلية تدعم المنتجات الطازجة والمستدامة.',
					'خطأ: الأولوية للمنتجات المحلية الطازجة.'
				],
				explanationAr:
					'عبارة «spreco alimentare» تعني التبذير الغذائي، ومكافحته تقوم على التخطيط والاعتدال.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 2: Scienza, Tecnologia, Ricerca Etica e Informazione Responsabile
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_lesson_3as_le_t2_scienza_tecnologia_informazione',
		slug: 'ita-3as-le-t2-scienza-tecnologia-informazione',
		grade: '3as_le',
		yearSubjectId: 795,
		trimesterId: 't2',
		sequenceId: 'unita2',
		sequenceTitleAr:
			'المحور الثاني: التغذية الصحية الحلال، الحرف، العلم والإعلام وصيغة Congiuntivo والكلام غير المباشر (Alimentazione, Scienza & Congiuntivo)',
		order: 2,
		titleAr:
			'العلوم، التكنولوجيا، البحث الأخلاقي والإعلام المسؤول (Scienza, tecnologia, ricerca e informazione responsabile)',
		objectives: [
			'تحليل نصوص المحور العلمي والإعلامي في البكالوريا حول التقدم العلمي، محو الأمية الرقمية (alfabetizzazione digitale)، والأمن المعلوماتي (sicurezza informatica)',
			'التمييز في النصوص الحجاجية بين مزايا الرقمنة التعليمية (biblioteche digitali, ricerca scientifica, didattica) ومخاطرها (disinformazione, dipendenza dagli schermi, violazione della privacy)',
			'توظيف المعجم العلمي والإعلامي الدقيق (fonti affidabili, verifica dei fatti, tutela dei dati, spirito critico, etica della ricerca)'
		],
		keywordsAr: [
			'Ricerca scientifica (البحث العلمي)',
			'Alfabetizzazione digitale (الثقافة الرقمية)',
			'Fonti affidabili (المصادر الموثوقة)',
			'Sicurezza dei dati (أمن البيانات)',
			'Disinformazione (التضليل الإعلامي)',
			'Etica digitale (الأخلاق الرقمية)'
		],
		discover: {
			scenarioAr:
				'تطرح نصوص العلوم والتكنولوجيا والإعلام في بكالوريا 3AS LE سؤالاً محورياً: كيف نحقق التوازن بين الاستفادة من المختبرات الحديثة والمنصات العلمية والصحافة الجادة وبين حماية الخصوصية والتركيز الدراسي والتمييز الدقيق بين المعلومة الموثوقة والشائعة الرقمية؟',
			svg: renderLessonIllustration('ita_05_scienza_tecnologia_informazione', {
				lang: 'it',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'تأمل العبارة: «La tecnologia è un ottimo strumento di studio se guidata dal senso critico, ma diventa un ostacolo se sostituisce la riflessione personale.» لخّص موقف الكاتب.',
					hintAr: 'قارن بين التقنية كأداة مساعدة وبين استبدال التفكير الشخصي.',
					expectedInput: 'التقنية مفيدة عندما يوجهها الفكر النقدي كأداة دعم، وضارة إذا حلت محل التفكير والجهد الشخصي',
					revealAr:
						'هذا التوازن المعتدل هو السمة الأبرز في مقالات البكالوريا: إقرار المنافع العلمية مع التنبيه إلى ضوابط الاستخدام الرشيد.'
				},
				{
					promptAr:
						'ما المقصود بمفهوم «verifica delle fonti» في الإعلام والبحث الرقمي؟',
					hintAr: 'كيف يتأكد القارئ أو الباحث أن الخبر أو المعطى العلمي صحيح قبل نشره؟',
					expectedInput: 'التحقق من موثوقية المصدر ومقارنة المعلومات بالمراجع العلمية المعتمدة قبل التصديق أو النشر',
					revealAr:
						'تشدد نصوص الصحافة المسؤولة على قاعدة «verificare prima di condividere» لمكافحة الأخبار الزائفة (notizie false).'
				},
				{
					promptAr:
						'كيف نربط بين المنهج العلمي عند Ibn Al-Haytham (الملاحظة والتجربة والبرهان) وبين التحقق الرقمي الحديث؟',
					hintAr: 'فكّر في عدم قبول أي فرضية دون دليل واضح وتجربة محققة.',
					expectedInput: 'كلاهما يقوم على التمحيص وعدم تقبل الادعاءات بلا برهان أو تحقق منهجي',
					revealAr:
						'الربط بين التراث العلمي التجريبي (مثل ابن الهيثم) وأخلاقيات البحث المعاصر يثري الإجابة التحليلية في البكالوريا.'
				}
			]
		},
		summary: {
			rulesAr: [
				'محاور الوحدة العلمية والإعلامية: البحث العلمي الأخلاقي في الطب والبيئة، التعلم عبر المكتبات الرقمية الموثوقة، حماية البيانات الشخصية (tutela dei dati personali / privacy)، ودور الصحافة الرصينة في تنوير الرأي العام.',
				'ثنائية الفوائد والمخاطر (Vantaggi e rischi): من الفوائد (accesso rapido al sapere, collaborazione scientifica, strumenti didattici)؛ ومن المخاطر (notizie false, dipendenza dagli schermi, perdita di concentrazione, rischi per la privacy).',
				'قواعد التحقق الإعلامي (Giornalismo serio e lettura critica): فحص هوية الكاتب والمؤسسة الناشرة، التأكد من التاريخ والسياق، التمييز بين الحقيقة الموثقة (il fatto verificato) والرأي المجرد (l’opinione), وحماية الخصوصية.',
				'المعجم المفتاحي للمحور: progresso scientifico (التقدم العلمي)، metodo sperimentale (المنهج التجريبي)، alfabetizzazione digitale (الثقافة الرقمية)، fonte autorevole (مصدر موثوق)، dipendenza digitale (الإدمان الرقمي)، uso responsabile (الاستعمال المسؤول).'
			],
			visualSvg: svgItalianGrammarMap({
				title: 'Scienza, Tecnologia e Media (3AS LE)',
				rootLabel: 'Innovazione con etica e rigore',
				rootSub: 'Equilibrio tra strumenti digitali e senso critico',
				branches: [
					{
						label: 'Ricerca etica',
						rule: 'Osservazione e prove chiare',
						example: 'metodo sperimentale serio'
					},
					{
						label: 'Verifica fonti',
						rule: 'Confrontare dati affidabili',
						example: 'frenare le notizie false'
					},
					{
						label: 'Privacy e dati',
						rule: 'Password sicure e prudenza',
						example: 'proteggere i dati personali'
					},
					{
						label: 'Studio attivo',
						rule: 'Tecnologia come supporto',
						example: 'non sostituire lo sforzo'
					}
				],
				width: 580
			}),
			visualCaptionAr:
				'المرتكزات الأربعة للتعامل الواعي مع العلوم والتكنولوجيا والإعلام في برنامج البكالوريا.',
			examples: [
				{
					problemAr:
						'Domanda di comprensione: «Quali due pericoli derivano dall’uso acritico delle informazioni raccolte in rete secondo il testo?»',
					solutionAr:
						'La diffusione di notizie false non verificate e l’indebolimento dell’autonomia di giudizio e della concentrazione nello studio.'
				},
				{
					problemAr:
						'Risposta argomentata (4–5 righe): «Perché le biblioteche cartacee e gli strumenti digitali dovrebbero collaborare anziché escludersi?»',
					solutionAr:
						'A mio parere, libri cartacei e strumenti digitali sono complementari. Le piattaforme serie offrono accesso rapido a enciclopedie e archivi lontani, mentre il libro cartaceo educa alla lettura lenta, profonda e priva di distrazioni.'
				}
			],
			watchOutAr:
				'في النصوص الحجاجية حول التكنولوجيا، راقب الروابط الاعتراضية والاستدراكية مثل «tuttavia, però, nonostante ciò, benché»؛ لأنها علامة انتقال الكاتب من عرض المنافع التقنية إلى بيان الشروط والمخاطر!'
		},
		practice: [
			{
				questionAr:
					'Che cosa significa praticare un’autentica «alfabetizzazione digitale» durante gli studi superiori?',
				options: [
					'Saper cercare, verificare l’affidabilità delle fonti e proteggere la propria privacy',
					'Condividere immediatamente ogni messaggio ricevuto senza controllarlo',
					'Copiare testi automatici senza leggerli né comprenderli',
					'Trascurare completamente i libri scolastici e le biblioteche'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الثقافة الرقمية السليمة تجمع بين مهارة البحث والتمحيص وحماية البيانات.',
					'خطأ: نشر الأخبار دون تحقق يغذي التضليل.',
					'خطأ: النقل الآلي يعطل الفهم وبناء الشخصية العلمية.',
					'خطأ: التكامل بين الكتاب والوسائل الرقمية المنضبطة هو الصواب.'
				],
				explanationAr:
					'تقوم «alfabetizzazione digitale» على الوعي النقدي، فحص المصادر، والأمان الرقمي.'
			},
			{
				questionAr:
					'In un articolo sulla ricerca scientifica, quale funzione svolge il connettivo «tuttavia»?',
				options: [
					'Introduce un limite, un contrasto o una cautela rispetto a quanto appena affermato',
					'Aggiunge semplicemente un sinonimo identico',
					'Indica l’ora esatta di un esperimento',
					'Sostituisce il punto esclamativo finale'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: «tuttavia» رابط استدراك مهم لتقديم التحفظ أو الشرط.',
					'خطأ: الإضافة تعبر عنها «inoltre» أو «pertanto» للنتيجة.',
					'خطأ: ليس ظرف زمان.',
					'خطأ: هو رابط منطقي نصي.'
				],
				explanationAr:
					'الروابط «tuttavia / però / ciò nonostante» تكشف التوازن الحجاجي في مقالات التكنولوجيا والإعلام.'
			},
			{
				questionAr:
					'Perché gli educatori sconsigliano l’uso passivo delle sintesi automatiche nello studio?',
				options: [
					'Perché riducono l’abitudine all’analisi autonoma e alla precisione lessicale',
					'Perché le biblioteche scolastiche vietano qualunque strumento elettronico',
					'Perché imparare a scrivere correttamente non serve al BAC',
					'Perché le fonti affidabili non esistono più'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الاعتماد السلبي يضعف التفكير المستقل ومهارة التعبير الشخصي.',
					'خطأ: الوسائل الرقمية مفيدة إذا استعملت بتوجيه وبحث واعٍ.',
					'خطأ: سلامة التعبير الكتابي أساسية في الامتحان.',
					'خطأ: توجد مؤسسات ومراجع علمية موثوقة.'
				],
				explanationAr:
					'التقنية وسيلة مساعدة للباحث والطالب وليست بديلاً عن الجهد العقلي والنقدي.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 3: Il Congiuntivo nei Quattro Tempi e la Consecutio Temporum
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_lesson_3as_le_t2_congiuntivo_quattro_tempi',
		slug: 'ita-3as-le-t2-congiuntivo-quattro-tempi',
		grade: '3as_le',
		yearSubjectId: 795,
		trimesterId: 't2',
		sequenceId: 'unita2',
		sequenceTitleAr:
			'المحور الثاني: التغذية الصحية الحلال، الحرف، العلم والإعلام وصيغة Congiuntivo والكلام غير المباشر (Alimentazione, Scienza & Congiuntivo)',
		order: 3,
		titleAr:
			'صيغة الشك بأزمنتها الأربعة والتوافق الزمني (Il congiuntivo: presente, passato, imperfetto, trapassato e concordanza)',
		objectives: [
			'ضبط تصريف الأزمنة الأربعة لصيغة Congiuntivo (presente, passato, imperfetto, trapassato) للأفعال القياسية والشاذة الشائعة في البكالوريا',
			'التمييز الدقيق بين الحالات التي تتطلب Congiuntivo (رأي شخصي، شك، رغبة، ضرورة، عاطفة، وروابط مثل affinché, benché, sebbene, prima che, senza che, purché) والحالات التي تأخذ Indicativo (يقين، حقيقة، dopo che, poiché)',
			'تطبيق قواعد التوافق الزمني (consecutio temporum) عند وجود الفعل الرئيسي في الحاضر/المستقبل مقابل وجوده في الماضي أو الشرطي'
		],
		keywordsAr: [
			'Congiuntivo presente e passato',
			'Congiuntivo imperfetto e trapassato',
			'Consecutio temporum (التوافق الزمني)',
			'Verbi di opinione e dubbio',
			'Congiunzioni subordinanti',
			'Verbi irregolari'
		],
		discover: {
			scenarioAr:
				'يُعدّ «Il congiuntivo» بأزمنته الأربعة حجر الزاوية في نحو السنة الثالثة ثانوي لغات أجنبية (3AS LE). يخطئ كثير من المترشحين في اختيار الزمن المناسب (مضارع أم ماضٍ؟ ناقص أم أسبق؟)؛ لذلك نربط اليوم تصريف الأزمنة الأربعة بجدول التوافق الزمني (consecutio temporum).',
			svg: svgItalianTenseTimeline({
				title: 'Il Congiuntivo nei Quattro Tempi',
				tenseName: 'Consecutio temporum (3AS LE)',
				formula: 'Reggente (Pres./Pass.) -> Contemp., Anter., Poster.',
				activeZone: 'two_past',
				example: 'Penso che studi (pres.) / Pensavo che studiasse (imperf.).',
				markers: 'che, benché, affinché, prima che, senza che, purché'
			}),
			steps: [
				{
					promptAr:
						'قارن بين الجملتين: (1) «Credo che la ricerca scientifica sia utile» و(2) «Credevo che la ricerca scientifica fosse utile». لماذا تغيّر «sia» إلى «fosse»؟',
					hintAr: 'انظر إلى زمن الفعل الأول: «Credo» (حاضر) مقابل «Credevo» (ماضٍ).',
					expectedInput: 'لأن الفعل الرئيسي في الحاضر يتطلب congiuntivo presente (sia)، وفي الماضي يتطلب congiuntivo imperfetto (fosse) للمزامنة',
					revealAr:
						'قاعدة التوافق الزمني: للتعبير عن المزامنة (contemporaneità)، بعد الحاضر نستعمل Congiuntivo presente، وبعد الماضي نستعمل Congiuntivo imperfetto!'
				},
				{
					promptAr:
						'ماذا يحدث إذا كان الحدث في الجملة التابعة قد تمّ «قبل» الفعل الرئيسي (anteriorità) في الماضي؟ مثلاً: «Non sapevo che gli studenti (finire) già il progetto.»',
					hintAr: 'نحتاج إلى زمن مركب في Congiuntivo يعبر عن الأسبقية في الماضي!',
					expectedInput: 'avessero finito (congiuntivo trapassato)',
					revealAr:
						'للتعبير عن الأسبقية (anteriorità): بعد فعل رئيسي في الحاضر نستعمل Congiuntivo passato (abbiano finito)؛ وبعد فعل رئيسي في الماضي نستعمل Congiuntivo trapassato (avessero finito)!'
				},
				{
					promptAr:
						'أي الجملتين تتطلب Indicativo وأيهما تتطلب Congiuntivo: (1) «So con certezza che l’olio d’oliva (fare) bene» و(2) «Sebbene il lavoro (essere) lungo, non ci arrendiamo»؟',
					hintAr: '«So con certezza che» تفيد اليقين، أما «Sebbene» (رغم أن) فتلزم Congiuntivo.',
					expectedInput: 'So con certezza che fa (indicativo) | Sebbene il lavoro sia lungo (congiuntivo)',
					revealAr:
						'تذكّر: أفعال اليقين المثبتة (so che, è certo che, è evidente che) تأخذ Indicativo؛ بينما أفعال الرأي/الشك/الضرورة والروابط (benché, sebbene, affinché, senza che, prima che, purché) تأخذ Congiuntivo!'
				}
			]
		},
		summary: {
			rulesAr: [
				'تصريف الأزمنة الأربعة: (1) Presente: -are (-i,-i,-i,-iamo,-iate,-ino)، -ere/-ire (-a,-a,-a,-iamo,-iate,-ano؛ مع -isc- لأفعال مثل capire -> capisca). الشواذ الأساسية: essere (sia), avere (abbia), fare (faccia), andare (vada), dare (dia), stare (stia), sapere (sappia), potere (possa), volere (voglia), dovere (debba), dire (dica).',
				'(2) Passato: congiuntivo presente di essere/avere (sia/abbia) + participio passato (che abbia studiato, che sia arrivato/a). (3) Imperfetto: -assi,-assi,-asse,-assimo,-aste,-assero / -essi... / -issi...؛ شواذ: essere (fossi, fossi, fosse, fossimo, foste, fossero), fare (facessi), dire (dicessi), dare (dessi), stare (stessi). (4) Trapassato: congiuntivo imperfetto di essere/avere (fossi/avessi) + participio passato.',
				'استعمالات Congiuntivo: بعد أفعال الرأي والاعتقاد (pensare, credere, ritenere, sembrare che)، الشك والرجاء والخوف والإرادة (dubitare, sperare, temere, volere, desiderare che)، التعابير غير الشخصية (è necessario, bisogna, è importante, è bene che)، والروابط الإلزامية (affinché, perché غائي، benché, sebbene, nonostante, prima che, senza che, purché, a patto che).',
				'قانون التوافق الزمني (Consecutio temporum): مع فعل رئيسي في الحاضر أو المستقبل (Penso / Penserò che...): Presente (للحاضر والمستقبل)، Passato (للماضي). مع فعل رئيسي في الماضي أو Condizionale presente (Pensavo / Vorrei che...): Imperfetto (للمزامنة أو المستقبل في الماضي)، Trapassato (للأسبقية في الماضي).'
			],
			visualSvg: svgItalianConjugationChart({
				title: 'Consecutio Temporum del Congiuntivo',
				subtitle: 'Scelta del tempo in base alla proposizione reggente',
				columns: [
					{
						header: 'Reggente al Presente',
						rule: 'Pres. (cont.) / Pass. (ant.)',
						examples: 'Credo che studi / abbia letto.'
					},
					{
						header: 'Reggente al Passato',
						rule: 'Imperf. (cont.) / Trapass. (ant.)',
						examples: 'Credevo che studiasse / avesse letto.'
					},
					{
						header: 'Congiunzioni fisse',
						rule: 'affinché, benché, prima che',
						examples: 'Benché piova, usciamo subito.'
					}
				],
				width: 580
			}),
			visualCaptionAr:
				'جدول التوافق الزمني بين الجملة الرئيسية وأزمنة Congiuntivo الأربعة في البكالوريا.',
			examples: [
				{
					problemAr:
						'Coniuga al tempo adatto del congiuntivo: «Prima che la riunione (cominciare), il preside desiderava che tutti (leggere) già il documento.»',
					solutionAr:
						'cominciasse (congiuntivo imperfetto per contemporaneità/posteriorità nel passato rispetto a «desiderava») / avessero letto (congiuntivo trapassato per anteriorità segnalata da «già» rispetto a «desiderava»!).'
				},
				{
					problemAr:
						'Scegli tra indicativo e congiuntivo: «È evidente che la dieta sana (migliorare) la vita, benché alcuni giovani non (prestare) attenzione.»',
					solutionAr:
						'migliora (indicativo dopo «è evidente che», certezza) / prestino (congiuntivo presente dopo «benché»).'
				}
			],
			watchOutAr:
				'انتبه إلى أمرين دقيقين في البكالوريا: (1) إذا تطابق الفاعل في الجملة الغائية أو بعد prima/senza نستخدم المصدر: «Studio per capire» و«Prima di partire» (لا «affinché io capisca» في الأسلوب الفصيح)؛ (2) بعد «è certo che / so che» نستعمل Indicativo لا Congiuntivo!'
		},
		practice: [
			{
				questionAr:
					'Completa rispettando la consecutio temporum: «Il professore sperava che gli alunni .......... le fonti prima di scrivere l’articolo.»',
				options: ['verificassero', 'verifichino', 'verificano', 'verificheranno'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح 100%: الفعل الرئيسي «sperava» في الماضي فيفرض Congiuntivo imperfetto (verificassero).',
					'خطأ: Congiuntivo presente يوافق الحاضر لا الماضي.',
					'خطأ: صيغة الإخباري لا تجوز بعد sperare.',
					'خطأ: المستقبل الإخباري لا يوافق فعل الرجاء في الماضي.'
				],
				explanationAr:
					'عندما يكون الفعل الرئيسي في الماضي (sperava)، نستخدم Congiuntivo imperfetto للدلالة على المزامنة أو المستقبل في الماضي.'
			},
			{
				questionAr:
					'Quale frase richiede il congiuntivo trapassato per esprimere anteriorità rispetto a un verbo principale al passato?',
				options: [
					'Credevamo che Marco avesse già consegnato il quaderno.',
					'Credevamo che Marco consegni il quaderno domani.',
					'Crediamo che Marco consegni il quaderno oggi.',
					'Sappiamo che Marco consegnò il quaderno ieri.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: «avesse consegnato» هو Congiuntivo trapassato يدل على حدث سابق على «credevamo».',
					'خطأ: «consegni» مضارع ولا ينسجم مع «credevamo».',
					'خطأ: الزمن الرئيسي حاضر والتابع حاضر.',
					'خطأ: فعل اليقين «sappiamo» يتبع بالإخباري.'
				],
				explanationAr:
					'التعبير عن حدث وقع قبل فعل رئيسي في الماضي يتطلب «congiuntivo trapassato» (avesse/fosse + participio).'
			},
			{
				questionAr:
					'Dopo quale delle seguenti espressioni si usa normalmente il modo indicativo e NON il congiuntivo?',
				options: ['Benché', 'Affinché', 'È evidente che', 'Senza che'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: «benché» (رغم أن) تلزم Congiuntivo.',
					'خطأ: «affinché» (لكي) تلزم Congiuntivo.',
					'صحيح: «È evidente che» تعبّر عن يقين موضوعي فتأخذ Indicativo.',
					'خطأ: «senza che» تلزم Congiuntivo.'
				],
				explanationAr:
					'أفعال وتعابير اليقين المثبتة (è evidente che, è sicuro che, so che) تأخذ صيغة الإخباري Indicativo.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 4: Il Discorso Diretto e Indiretto (Trasformazioni al Passato)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_lesson_3as_le_t2_discorso_diretto_indiretto',
		slug: 'ita-3as-le-t2-discorso-diretto-indiretto',
		grade: '3as_le',
		yearSubjectId: 795,
		trimesterId: 't2',
		sequenceId: 'unita2',
		sequenceTitleAr:
			'المحور الثاني: التغذية الصحية الحلال، الحرف، العلم والإعلام وصيغة Congiuntivo والكلام غير المباشر (Alimentazione, Scienza & Congiuntivo)',
		order: 4,
		titleAr:
			'الكلام المباشر وغير المباشر وتحويل الأزمنة والضمائر (Il discorso diretto e indiretto al passato)',
		objectives: [
			'إتقان التحويل الكامل من الكلام المباشر إلى غير المباشر عندما يكون فعل القول في الماضي (ha detto, disse, spiegò, chiese, domandò, ordinò)',
			'تطبيق جدول انزياح الأزمنة في الإيطالية بدقة: Presente إلى Imperfetto، Passato prossimo / Remoto إلى Trapassato prossimo، Futuro semplice إلى Condizionale passato، و Imperativo إلى «di + infinito» أو «che + congiuntivo imperfetto»',
			'تحويل الضمائر الشخصية وصفات الملكية ومؤشرات الزمان والمكان (oggi -> quel giorno, domani -> il giorno dopo, ieri -> il giorno prima, qui -> lì, questo -> quello)'
		],
		keywordsAr: [
			'Discorso diretto e indiretto',
			'Verbo introduttore al passato',
			'Condizionale passato (futuro nel passato)',
			'Trapassato prossimo',
			'Interrogative indirette',
			'Indicatori di tempo e luogo'
		],
		discover: {
			scenarioAr:
				'يُعدّ تحويل الحوار والتصريحات الصحفية من Discorso diretto إلى Discorso indiretto (أو العكس!) من أبرز تمارين النحو في بكالوريا الإيطالية 3AS LE. احفظ القاعدة الذهبية الخاصة بالإيطالية: المستقبل البسيط بعد فعل قول في الماضي يتحول في الإيطالية الفصيحة إلى «Condizionale passato» (وليس condizionale presente)!',
			svg: svgItalianGrammarMap({
				title: 'Discorso Diretto -> Indiretto (Passato)',
				rootLabel: 'Verbo reggente al passato (disse / chiese)',
				rootSub: 'Slittamento di tempi, pronomi e deittici',
				branches: [
					{
						label: 'Presente -> Impf.',
						rule: 'Studio ora -> studiava allora',
						example: 'Disse che leggeva spesso.'
					},
					{
						label: 'Passato -> Trapass.',
						rule: 'Ho visto / Vidi -> aveva visto',
						example: 'Spiegò che aveva finito.'
					},
					{
						label: 'Futuro -> Cond. Pass.',
						rule: 'Partirò -> sarebbe partito',
						example: 'Promise che sarebbe tornato.'
					},
					{
						label: 'Imperativo -> DI+inf.',
						rule: 'Leggi! -> di leggere / che leggesse',
						example: 'Gli chiese di verificare.'
					}
				],
				width: 580
			}),
			steps: [
				{
					promptAr:
						'حوّل الجملة التالية إلى الكلام غير المباشر: Il ricercatore disse: «Oggi analizzo questi dati e domani pubblicherò la relazione.»',
					hintAr: 'انتبه لـ 5 عناصر: oggi، analizzo (حاضر)، questi، domani، و pubblicherò (مستقبل).',
					expectedInput: 'Il ricercatore disse che quel giorno analizzava quei dati e il giorno dopo avrebbe pubblicato la relazione.',
					revealAr:
						'لاحظ: «oggi» -> «quel giorno»، «analizzo» (حاضر) -> «analizzava» (ناقص)، «questi» -> «quei»، «domani» -> «il giorno dopo»، و«pubblicherò» (مستقبل) -> «avrebbe pubblicato» (شرطي ماضٍ = futuro nel passato)!'
				},
				{
					promptAr:
						'كيف ننقل سؤالاً كلياً (نعم/لا) وسؤالاً جزئياً في الكلام غير المباشر: La giornalista chiese al medico: «Avete già controllato l’olio d’oliva? Quando arriveranno i risultati?»',
					hintAr: 'السؤال الكلي يربط بـ «se»، أما الجزئي فيحتفظ بأداة الاستفهام (quando, dove, come, perché).',
					expectedInput: 'La giornalista chiese al medico se avessero già controllato l’olio d’oliva e quando sarebbero arrivati i risultati.',
					revealAr:
						'بعد «chiese / domandò», الاستفهام الكلي يأخذ «se» (أحياناً مع congiuntivo trapassato أو indicativo trapassato prossimo: avessero/avevano controllato)، والمستقبل يتحول إلى condizionale passato (sarebbero arrivati)!'
				},
				{
					promptAr:
						'ما الصيغتان الصحيحتان لنقل الأمر: La professoressa disse agli studenti: «Verificate sempre la fonte!»؟',
					hintAr: 'الأشهر في الإيطالية «di + infinito»، ويمكن أيضاً «che + congiuntivo imperfetto».',
					expectedInput: 'La professoressa disse agli studenti di verificare sempre la fonte (o che verificassero sempre la fonte).',
					revealAr:
						'صيغة «di + infinito» هي الأكثر استعمالاً وأناقة لنقل الأمر في الإيطالية، وتجوز كذلك «che + congiuntivo imperfetto» (مع «ordinare / consigliare / dire di...»).'
				}
			]
		},
		summary: {
			rulesAr: [
				'تحويل الأزمنة بعد فعل قول في الماضي (disse, ha affermato, spiegò, raccontò): Presente indicativo يتحول إلى Imperfetto indicativo؛ Passato prossimo و Passato remoto يتحولان إلى Trapassato prossimo (aveva/era + participio)؛ Futuro semplice يتحول إلى Condizionale passato (avrebbe/sarebbe + participio)؛ Futuro anteriore يتحول إلى Condizionale passato.',
				'الأزمنة التي لا تتغير: Imperfetto، Trapassato prossimo، Condizionale presente e passato، Congiuntivo imperfetto e trapassato تبقى كما هي عادةً؛ أما Congiuntivo presente فيتحول إلى Congiuntivo imperfetto.',
				'تحويل الظروف والإشارات: ora / adesso -> allora / in quel momento؛ oggi -> quel giorno؛ ieri -> il giorno prima / il giorno precedente؛ domani -> il giorno dopo / il giorno seguente؛ la settimana scorsa -> la settimana precedente؛ fra tre giorni -> tre giorni dopo؛ qui / qua -> lì / là؛ questo -> quello؛ venire -> andare (تبعاً لسياق المتكلم).',
				'الجمل الاستفهامية والأمرية: الاستفهام الكلي يرتبط بـ «chiese se...» (دون علامات تنصيص أو استفهام!)؛ الاستفهام الجزئي يبقي الأداة (chiese dove / che cosa / perché / come...)؛ الأمر يتحول إلى «disse / chiese / consigliò di + infinito» (أو «di non + infinito» للنهي، أو «che + congiuntivo imperfetto»).'
			],
			visualSvg: svgItalianConjugationChart({
				title: 'Tabella Rapida del Discorso Indiretto',
				subtitle: 'Corrispondenze obbligatorie quando il verbo che introduce è al passato',
				columns: [
					{
						header: 'Presente / Passato',
						rule: 'Pres.: Impf. | Pass.: Trapass.',
						examples: 'leggo : leggeva | lessi : aveva letto'
					},
					{
						header: 'Futuro nel passato',
						rule: 'Futuro : Condizionale Passato',
						examples: 'partirò : sarebbe partito'
					},
					{
						header: 'Deittici chiave',
						rule: 'oggi, ieri, domani, qui',
						examples: 'quel giorno, prima, dopo, lì'
					}
				],
				width: 580
			}),
			visualCaptionAr:
				'جدول التحويل السريع للأزمنة والمؤشرات الزمنية والمكانية في الكلام غير المباشر بالإيطالية.',
			examples: [
				{
					problemAr:
						'Trasforma al discorso indiretto: L’artigiano spiegò ai visitatori: «Ieri ho finito questo vaso e fra due giorni lo consegnerò al museo.»',
					solutionAr:
						'L’artigiano spiegò ai visitatori che il giorno prima aveva finito quel vaso e due giorni dopo lo avrebbe consegnato al museo.'
				},
				{
					problemAr:
						'Trasforma al discorso diretto: Il direttore ordinò agli alunni di non sprecare l’acqua in laboratorio.',
					solutionAr:
						'Il direttore disse agli alunni: «Non sprecate l’acqua in laboratorio!»'
				}
			],
			watchOutAr:
				'احذر فخّ الترجمة الحرفية من الفرنسية أو الإسبانية! في الإيطالية، المستقبل بعد فعل قول في الماضي يتحول إلى Condizionale PASSATO («Disse che sarebbe venuto»)، وليس Condizionale presente (*«Disse che verrebbe» خطأ في القواعد القياسية للبكلوريا)!'
		},
		practice: [
			{
				questionAr:
					'Trasforma correttamente al discorso indiretto: Nadia disse: «Domani presenterò la mia ricerca in biblioteca.»',
				options: [
					'Nadia disse che il giorno dopo avrebbe presentato la sua ricerca in biblioteca.',
					'Nadia disse che domani presenterà la sua ricerca in biblioteca.',
					'Nadia disse che il giorno prima aveva presentato la sua ricerca in biblioteca.',
					'Nadia disse se il giorno dopo presenterebbe la sua ricerca in biblioteca.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح 100%: domani -> il giorno dopo، la mia -> la sua، والمستقبل presenterò -> Condizionale passato (avrebbe presentato).',
					'خطأ: بقي المؤشر الزمني والفعل دون تحويل إلى الماضي.',
					'خطأ: «il giorno prima» تعني أمس وليس غداً.',
					'خطأ: الجملة خبرية لا استفهامية (لا تستعمل se)، والشرطي الحاضر ليس مستقبل الماضي القياسي.'
				],
				explanationAr:
					'في الإيطالية القياسية يتحول Futuro semplice بعد فعل قول في الماضي إلى Condizionale passato، و«domani» إلى «il giorno dopo».'
			},
			{
				questionAr:
					'Come si trasforma un comando al discorso indiretto al passato: Il tecnico avvertì i ragazzi: «Non condividete le vostre password!»?',
				options: [
					'Il tecnico avvertì i ragazzi di non condividere le loro password.',
					'Il tecnico avvertì i ragazzi che non condividono le loro password.',
					'Il tecnico avvertì i ragazzi se non condividessero le loro password.',
					'Il tecnico avvertì i ragazzi di non condivideste le vostre password.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: النهي والأمر يتحولان إلى «di (non) + infinito» مع تحويل صفة الملكية إلى «le loro».',
					'خطأ: بقي الفعل في الحاضر الإخباري.',
					'خطأ: «se» للاستفهام لا للأمر.',
					'خطأ: لا يتبع حرف الجر «di» بفعل مصرف.'
				],
				explanationAr:
					'يتحول الأمر أو النهي المنقول غالباً إلى «di (non) + infinito» مع مطابقة الضمائر وصفات الملكية.'
			},
			{
				questionAr:
					'Quale forma assume l’espressione «l’anno scorso» nel passaggio al discorso indiretto con verbo reggente al passato?',
				options: [
					'l’anno prossimo',
					'l’anno precedente',
					'in questo istante',
					'fra un anno'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: «l’anno prossimo» تدل على المستقبل.',
					'صحيح: «l’anno scorso» تتحول إلى «l’anno precedente» (أو «l’anno prima»).',
					'خطأ: تدل على الحاضر.',
					'خطأ: تدل على المستقبل البعيد.'
				],
				explanationAr:
					'المؤشرات الزمنية الماضية مثل «ieri / l’anno scorso» تتحول إلى «il giorno prima / l’anno precedente».'
			}
		]
	}
];
