import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';
import {
	svgItalianConjugationChart,
	svgItalianGrammarMap,
	svgItalianWritingBlueprint
} from '../../svg-italian';
import type { ItalianInteractiveLessonData } from '../../types';

/**
 * 3AS BAC Foreign Languages (لغات أجنبية — yearSubjectId: 795, coeff 4, 03h00, 7+7+6=20)
 * Interactive Lessons — Trimestre 3 : Ecologia, Algeria Verde, Lavoro, Periodo Ipotetico & Saggio BAC (4 lessons)
 */
export const LESSONS_3AS_LE_T3: ItalianInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 1: Tutela dell’Ambiente, Energie Rinnovabili e Algeria Verde
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_lesson_3as_le_t3_ambiente_energie_algeria_verde',
		slug: 'ita-3as-le-t3-ambiente-energie-algeria-verde',
		grade: '3as_le',
		yearSubjectId: 795,
		trimesterId: 't3',
		sequenceId: 'unita3',
		sequenceTitleAr:
			'المحور الثالث: البيئة والجزائر الخضراء، عالم الشغل، الجملة الشرطية ومنهجية البكالوريا (Ecologia, Lavoro & Saggio BAC)',
		order: 1,
		titleAr:
			'البيئة، الطاقات المتجددة ومشروع الجزائر الخضراء (Ambiente, energie rinnovabili e Algeria verde)',
		objectives: [
			'تحليل نصوص البيئة والتنمية المستدامة في البكالوريا حول الطاقة الشمسية وطاقة الرياح، الاقتصاد الدائري، وترشيد المياه في الجزائر وحوض المتوسط',
			'إتقان التمييز السببي في النصوص البيئية بين أسباب التدهور (cause)، آثاره (conseguenze)، والحلول المستدامة (soluzioni)',
			'استثمار المعجم البيئي والطاقوي المتقدم (energie rinnovabili, pannelli solari, energia eolica, rimboschimento, raccolta differenziata, sviluppo sostenibile)'
		],
		keywordsAr: [
			'Energie rinnovabili (الطاقات المتجددة)',
			'Energia solare ed eolica (الشمسية والريحية)',
			'Rimboschimento (التشجير)',
			'Algeria verde (الجزائر الخضراء)',
			'Riciclaggio (إعادة التدوير)',
			'Risparmio idrico (ترشيد المياه)'
		],
		discover: {
			scenarioAr:
				'يمثّل موضوع البيئة والانتقال الطاقوي في الجزائر والمتوسط (tutela dell’ambiente e transizione energetica) أحد أكثر محاور البكالوريا حضوراً: من استثمار الإشعاع الشمسي في الصحراء الجزائرية ومشاريع التشجير (la Diga Verde / Algeria Verde)، إلى مبادرات الشباب في الفرز الانتقائي وحماية الغابات من الحرائق.',
			svg: renderLessonIllustration('ita_04_ambiente_energie_rinnovabili', {
				lang: 'it',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'اقرأ الجملة التالية: «Le energie fossili si esauriscono e inquinano l’atmosfera, mentre l’energia solare ed eolica sono fonti pulite e inesauribili.» ما الفرقان المذكوران بين النوعين؟',
					hintAr: 'انظر إلى الأفعال والصفات المقابلة قبل وبعد «mentre».',
					expectedInput: 'الطاقات الأحفورية تنضب وتلوث الجو، بينما الشمسية والريحية نظيفتان ولا تنضبان',
					revealAr:
						'المقارنة بين «combustibili fossili» و«energie rinnovabili / pulite» أساسية في أسئلة الفهم والتصنيف بالبكالوريا.'
				},
				{
					promptAr:
						'صنّف العبارتين التاليتين إلى سبب (Causa) ونتيجة (Conseguenza): (1) «taglio indiscriminato degli alberi» و(2) «avanzata della desertificazione».',
					hintAr: 'أيّهما يؤدي إلى الآخر بيئياً؟',
					expectedInput: 'taglio indiscriminato = Causa | avanzata della desertificazione = Conseguenza',
					revealAr:
						'يتكرر تمرين التصنيف الثنائي (Cause / Conseguenze أو Problemi / Soluzioni) في نصوص البيئة بالبكالوريا.'
				},
				{
					promptAr:
						'كيف تجسد عبارة «ridurre, riutilizzare e riciclare» (le tre R) قيمة الأخلاق البيئية ونبذ التبذير؟',
					hintAr: 'فكّر في تقليص النفايات وإعادة الاستعمال والتدوير المنظم.',
					expectedInput: 'عبر تقليل الاستهلاك المفرط، إعادة استخدام الأدوات الصالحة، وإعادة تدوير الورق والبلاستيك والزجاج',
					revealAr:
						'ثقافة «economia circolare» و«raccolta differenziata» تعبر عن مسؤولية الفرد والمؤسسة نحو الموارد الطبيعية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'محاور نصوص البيئة: التغير المناخي (cambiamento climatico / riscaldamento globale)، مكافحة التصحر وحرائق الغابات (lotta alla desertificazione e agli incendi)، ندرة المياه والري المقتصد (scarsità idrica e irrigazione mirata)، والطاقات المتجددة.',
				'النموذج الجزائري في النصوص: مشروع السد الأخضر / الجزائر الخضراء (Diga Verde / Algeria Verde) بالتشجير المنتظم، واستغلال الطاقة الشمسية وطاقة الرياح في المناطق المشمسة.',
				'الأفعال والمصطلحات المفتاحية: aggravare / minacciare (يزيد خطورة/يهدد) مقابل frenare / mitigare / tutelare (يكبح/يخفف/يحمي)؛ impronta ecologica (البصمة البيئية)، raccolta differenziata (الفرز الانتقائي للنفايات)، sviluppo sostenibile (التنمية المستدامة).',
				'تنظيم الحجج البيئية في البكالوريا: اربط دائماً بين التشخيص الدقيق للمشكل (emissioni eccessive, spreco d’acqua) والحلول العملية المدرسية والوطنية (piantare alberi, impianti fotovoltaici, educazione ecologica).'
			],
			visualSvg: svgItalianGrammarMap({
				title: 'Ecologia e Algeria Verde (BAC 3AS LE)',
				rootLabel: 'Sviluppo sostenibile condiviso',
				rootSub: 'Transizione energetica e tutela delle risorse',
				branches: [
					{
						label: 'Solare ed eolica',
						rule: 'Energie pulite e inesauribili',
						example: 'impianti nel Sahara algerino'
					},
					{
						label: 'Rimboschimento',
						rule: 'Frenare erosione e siccità',
						example: 'progetto Algeria Verde'
					},
					{
						label: 'Acqua e risparmio',
						rule: 'Irrigazione attenta senza sprechi',
						example: 'tutelare ogni goccia'
					},
					{
						label: 'Economia circolare',
						rule: 'Ridurre, riutilizzare, riciclare',
						example: 'raccolta differenziata a scuola'
					}
				],
				width: 580
			}),
			visualCaptionAr:
				'المحاور البيئية والطاقوية الأربعة الأساسية لوحدة البيئة والجزائر الخضراء في البكالوريا.',
			examples: [
				{
					problemAr:
						'Domanda di comprensione: «Perché il rimboschimento regolare è definito nel testo uno scudo naturale contro la desertificazione?»',
					solutionAr:
						'Perché le radici degli alberi trattengono il suolo fertile, favoriscono l’infiltrazione dell’acqua piovana e proteggono le terre agricole dai venti aridi.'
				},
				{
					problemAr:
						'Riflessione personale (4 righe): «Quali gesti quotidiani possono compiere gli studenti nel proprio liceo per proteggere l’ambiente?»',
					solutionAr:
						'Nel nostro liceo possiamo chiudere sempre i rubinetti dopo l’uso, spegnere le luci nelle aule vuote, organizzare punti di raccolta differenziata per la carta e partecipare alle campagne annuali di piantumazione di alberi.'
				}
			],
			watchOutAr:
				'فرّق بدقة عند الإجابة عن المرادفات والأضداد بين أفعال الخطر والتدهور (peggiorare, inquinare, distruggere) وأفعال الصيانة والإصلاح (preservare, depurare, rigenerare)!'
		},
		practice: [
			{
				questionAr:
					'Quale coppia indica esclusivamente fonti di energia pulita e rinnovabile?',
				options: [
					'Energia solare fotovoltaica ed energia eolica',
					'Carbone minerale e petrolio greggio',
					'Gasolio pesante e plastica bruciata',
					'Combustibili fossili non trattati'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الطاقة الشمسية وطاقة الرياح مصدران متجددان نظيفان.',
					'خطأ: الفحم والبترول من الطاقات الأحفورية المحدودة والملوثة.',
					'خطأ: حرق البلاستيك والوقود الثقيل ملوث جداً.',
					'خطأ: الوقود الأحفوري غير متجدد.'
				],
				explanationAr:
					'الطاقات المتجددة تعتمد أساساً على الشمس (solare) والرياح (eolica) والمياه (idroelettrica).'
			},
			{
				questionAr:
					'In un testo ecologico, che cosa significa il verbo «mitigare» nella frase «mitigare gli effetti della siccità»?',
				options: [
					'Aggravare volontariamente la mancanza d’acqua',
					'Attenuare e ridurre i danni causati dalla scarsità di pioggia',
					'Abbandonare qualsiasi progetto di rimboschimento',
					'Aumentare lo spreco domestico'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: هذا عكس المعنى تماماً.',
					'ممتاز: «mitigare» تعني التخفيف والحد من الآثار السلبية.',
					'خطأ: التشجير يسهم في مواجهة الجفاف والتصحر.',
					'خطأ: التبذير يفاقم الأزمة المائية.'
				],
				explanationAr:
					'الفعل «mitigare» أو «attenuare» يكثر في نصوص البيئة بمعنى التخفيف من حدة الضرر.'
			},
			{
				questionAr: 'Quale sequenza riassume correttamente la regola ecologica delle «tre R»?',
				options: [
					'Ridurre, riutilizzare e riciclare',
					'Rompere, rifiutare e rovinare',
					'Ritardare, ripetere e dimenticare',
					'Rallentare ogni iniziativa verde'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: تقليص الاستهلاك، إعادة الاستعمال، وإعادة التدوير.',
					'خطأ: أفعال سلبية لا صلة لها بالبيئة.',
					'خطأ: لا علاقة لها بالاقتصاد الدائري.',
					'خطأ: تتعارض مع الاستدامة.'
				],
				explanationAr:
					'قاعدة الاقتصاد الدائري تقوم على «Ridurre, Riutilizzare, Reciclare».'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 2: Geografia del Mediterraneo, Formazione Professionale e Mondo del Lavoro
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_lesson_3as_le_t3_mediterraneo_mondo_lavoro',
		slug: 'ita-3as-le-t3-mediterraneo-mondo-lavoro',
		grade: '3as_le',
		yearSubjectId: 795,
		trimesterId: 't3',
		sequenceId: 'unita3',
		sequenceTitleAr:
			'المحور الثالث: البيئة والجزائر الخضراء، عالم الشغل، الجملة الشرطية ومنهجية البكالوريا (Ecologia, Lavoro & Saggio BAC)',
		order: 2,
		titleAr:
			'جغرافيا المتوسط، التكوين المهني وعالم الشغل والمبادرة (Mediterraneo, formazione professionale e mondo del lavoro)',
		objectives: [
			'توظيف المعطيات الجغرافية الأساسية لإيطاليا وحوض البحر الأبيض المتوسط (Italia, Algeria, Sicilia, Mar Mediterraneo, Mar Adriatico) في سياقات الثقافة والتبادل الاقتصادي المشروع',
			'تحليل نصوص عالم الشغل في البكالوريا حول التكوين المهني (formazione professionale)، المهن الخضراء والرقمية، والتعاونيات الشبابية وريادة الأعمال (imprenditoria giovanile)',
			'ربط النجاح المهني في التعبير الكتابي بقيم الكفاءة، الأمانة، إتقان العمل (etica del lavoro)، والتضامن الاقتصادي'
		],
		keywordsAr: [
			'Bacino del Mediterraneo (حوض المتوسط)',
			'Mondo del lavoro (عالم الشغل)',
			'Formazione professionale (التكوين المهني)',
			'Imprenditoria giovanile (ريادة الأعمال الشبابية)',
			'Cooperative solidali (التعاونيات المتضامنة)',
			'Etica professionale (أخلاقيات المهنة)'
		],
		discover: {
			scenarioAr:
				'يجمع البحر الأبيض المتوسط بين الجزائر وإيطاليا وصقلية في فضاء جغرافي وتجاري حيوي. في الفصل الثالث من برنامج 3AS LE، ينفتح هذا الفضاء على قضايا عالم الشغل: كيف يوظف الشباب التكوين المهني والجامعي واللغات الأجنبية لإطلاق مشاريع إنتاجية وتعاونيات أخلاقية ناجحة؟',
			svg: renderLessonIllustration('ita_01_italia_mediterraneo_carta_muta', {
				lang: 'it',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'تأمل الخريطة المتوسطية: ما اسم البحر الواقع شرقي شبه الجزيرة الإيطالية، وما اسم الجزيرة الكبيرة الفاصلة بين شمال إفريقيا وشبه الجزيرة؟',
					hintAr: 'راجع مفتاح الخريطة الجغرافية لإيطاليا والبحر المتوسط.',
					expectedInput: 'البحر الأدرياتيكي (Mar Adriatico) وجزيرة صقلية (Sicilia)',
					revealAr:
						'تمتد إيطاليا كشبه جزيرة في قلب البحر المتوسط (Mar Mediterraneo)، يحدها شرقاً البحر الأدرياتيكي (Mar Adriatico)، وتقع جنوبها جزيرة صقلية (Sicilia) القريبة من سواحل شمال إفريقيا والجزائر.'
				},
				{
					promptAr:
						'في الجملة: «La formazione professionale continua e la padronanza delle lingue straniere moltiplicano le opportunità di inserimento lavorativo», ما العاملان الرئيسيان لفرص التوظيف؟',
					hintAr: 'ابحث عن المركبين الاسميين قبل الفعل «moltiplicano».',
					expectedInput: 'التكوين المهني المستمر وإتقان اللغات الأجنبية',
					revealAr:
						'تؤكد نصوص عالم الشغل أن الجمع بين المهارة التطبيقية (competenze pratiche) واللغات الأجنبية يفتح آفاق العمل في الترجمة والزراعة المستدامة والتكنولوجيا والتجارة.'
				},
				{
					promptAr:
						'لماذا تشجع نصوص البكالوريا نموذج «le cooperative giovanili» (التعاونيات الشبابية)؟',
					hintAr: 'فكر في تقاسم الخبرة وتقليل التكاليف وتعزيز روح التضامن.',
					expectedInput: 'لأنها تجمع الكفاءات وتقلل التكاليف الأولية وتخلق فرص عمل متضامنة في المجتمع المحلي',
					revealAr:
						'العمل التعاوني القائم على الأمانة والإتقان يعالج البطالة (disoccupazione) دون أنانية أو مضاربة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الجغرافيا الأساسية للمتوسط بالإيطالية: La Penisola Italiana (شبه الجزيرة الإيطالية)، il Nord Africa e l’Algeria (شمال إفريقيا والجزائر)، l’isola di Sicilia (جزيرة صقلية)، il Mar Mediterraneo (البحر الأبيض المتوسط)، il Mar Adriatico (البحر الأدرياتيكي)، gli Appennini e le Alpi (جبال الأبنين والألب).',
				'محاور عالم الشغل الحديث: الانتقال من المدرسة إلى المهنة (transizione scuola-lavoro)، التكوين المهني المتخصص (formazione tecnica e artigianale)، الوظائف الخضراء والرقمية (mestieri verdi e digitali)، وإطلاق المؤسسات الناشئة (imprenditoria giovanile).',
				'الأخلاق المهنية في نصوص 3AS LE: الأمانة والصدق (onestà)، الإتقان والانضباط (rigore e lavoro ben fatto)، العمل الجماعي (lavoro di squadra)، والمثابرة أمام صعوبات البداية.',
				'المعجم الدقيق للعمل والاقتصاد: disoccupazione (البطالة)، inserimento lavorativo (الإدماج المهني)، qualifica professionale (تأهيل مهني)، cooperativa agricola/artigianale (تعاونية فلاحية/حرفية)، produttività etica (إنتاجية أخلاقية).'
			],
			visualSvg: svgItalianGrammarMap({
				title: 'Mediterraneo e Mondo del Lavoro (3AS LE)',
				rootLabel: 'Competenze, cooperazione e lavoro onesto',
				rootSub: 'Dal bacino mediterraneo ai nuovi mestieri',
				branches: [
					{
						label: 'Geografia',
						rule: 'Italia, Algeria e Sicilia',
						example: 'ponte sul Mar Mediterraneo'
					},
					{
						label: 'Formazione',
						rule: 'Apprendimento continuo e lingue',
						example: 'competenze tecniche solide'
					},
					{
						label: 'Imprenditoria',
						rule: 'Iniziativa locale e creativa',
						example: 'progetti verdi e digitali'
					},
					{
						label: 'Cooperative',
						rule: 'Solidarietà e lavoro di squadra',
						example: 'prosperità condivisa'
					}
				],
				width: 580
			}),
			visualCaptionAr:
				'خريطة الترابط بين الجغرافيا المتوسطية والتكوين المهني وريادة الأعمال المتضامنة.',
			examples: [
				{
					problemAr:
						'Domanda di comprensione: «In che modo la cooperazione tra giovani diplomati aiuta a superare le difficoltà iniziali di un’attività produttiva?»',
					solutionAr:
						'Unendo competenze diverse, dividendo i costi di avviamento e garantendo un sostegno morale e organizzativo reciproco.'
				},
				{
					problemAr:
						'Risposta personale (4 righe): «Perché è importante valorizzare sia l’università sia la formazione professionale?»',
					solutionAr:
						'Una società equilibrata ha bisogno tanto di ricercatori universitari quanto di tecnici qualificati nei mestieri pratici. La formazione professionale risponde ai bisogni concreti dell’agricoltura, dell’artigianato e dell’industria, offrendo ai giovani un lavoro dignitoso.'
				}
			],
			watchOutAr:
				'انتبه للمذكر والمؤنث والمقابلات الدقيقة في مفردات الشغل: «la disoccupazione» (البطالة — مؤنث)، «l’impiego / il posto di lavoro» (المنصب الوظيفي — مذكر)، و«il mestiere» (الحرفة/المهنة — مذكر رغم نهايته بـ -e)!'
		},
		practice: [
			{
				questionAr:
					'Quale mare bagna la costa orientale della penisola italiana nella geografia mediterranea?',
				options: ['Il Mar Adriatico', 'Il Mar Rosso', 'L’Oceano Pacifico', 'Il Mar Baltico'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: يحد البحر الأدرياتيكي الساحل الشرقي لشبه الجزيرة الإيطالية.',
					'خطأ: البحر الأحمر بين إفريقيا وآسيا.',
					'خطأ: المحيط الهادئ خارج الحوض المتوسطي.',
					'خطأ: بحر البلطيق في شمال أوروبا.'
				],
				explanationAr:
					'يقع البحر الأدرياتيكي (Mar Adriatico) شرق إيطاليا داخل حوض المتوسط.'
			},
			{
				questionAr:
					'Che cosa caratterizza principalmente un giovane imprenditore responsabile nei testi del BAC 3AS LE?',
				options: [
					'L’iniziativa creativa unita all’onestà, allo studio e al servizio della comunità',
					'L’attesa passiva senza aggiornare mai le proprie competenze',
					'La ricerca di guadagni rapidi senza controllo della qualità',
					'Il rifiuto di collaborare in gruppo'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: المبادرة الجادة المقترنة بالأمانة والتكوين وخدمة المجتمع.',
					'خطأ: الاتكال السلبي يناقض روح المبادرة.',
					'خطأ: أخلاقيات العمل تفرض الجودة والأمانة.',
					'خطأ: العمل الجماعي أساس النجاح التعاوني.'
				],
				explanationAr:
					'تجمع ثقافة ريادة الأعمال السليمة بين الابتكار التقني والأمانة المهنية والتضامن.'
			},
			{
				questionAr:
					'Perché l’apprendimento delle lingue straniere rappresenta un vantaggio concreto nel mondo del lavoro mediterraneo?',
				options: [
					'Agevola la comunicazione tecnica, la traduzione e gli scambi commerciali leciti',
					'Sostituisce completamente il bisogno di qualsiasi mestiere pratico',
					'Impedisce di lavorare nel proprio Paese',
					'Rende inutile la precisione scritta'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: إتقان اللغات ييسر التواصل المهني والترجمة والتعاون الإقليمي.',
					'خطأ: اللغات تكمل الكفاءة المهنية ولا تغني عن التخصص.',
					'خطأ: اللغات تخدم المؤسسات الوطنية والتبادل الدولي.',
					'خطأ: الدقة الكتابية ضرورية في العقود والمراسلات.'
				],
				explanationAr:
					'اللغات الأجنبية تزيد القابلية للتوظيف وتدعم التعاون العلمي والاقتصادي.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 3: Periodo Ipotetico, Pronomi Combinati, CI/NE e Connettivi Argomentativi
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_lesson_3as_le_t3_periodo_ipotetico_pronomi_connettivi',
		slug: 'ita-3as-le-t3-periodo-ipotetico-pronomi-connettivi',
		grade: '3as_le',
		yearSubjectId: 795,
		trimesterId: 't3',
		sequenceId: 'unita3',
		sequenceTitleAr:
			'المحور الثالث: البيئة والجزائر الخضراء، عالم الشغل، الجملة الشرطية ومنهجية البكالوريا (Ecologia, Lavoro & Saggio BAC)',
		order: 3,
		titleAr:
			'الجملة الشرطية بأنواعها الثلاثة، الضمائر المركبة وCI/NE والروابط الحجاجية (Periodo ipotetico, pronomi combinati e connettivi)',
		objectives: [
			'إتقان بناء وتحويل الأنواع الثلاثة للجملة الشرطية (Periodo ipotetico: 1º tipo realtà, 2º tipo possibilità, 3º tipo irrealtà nel passato) مع الحذر التام من الخطأ الشائع (*se avrei)',
			'توظيف الضمائر المركبة (pronomi combinati: glielo, me ne, te la, ce li, ve ne) والجزئيات الضميرية (ci / ne) مع مطابقة اسم المفعول في Passato prossimo',
			'ربط الأفكار في الجمل المركبة بالروابط الحجاجية الدقيقة (poiché, siccome, dato che, pertanto, quindi, tuttavia, benché, nonostante)'
		],
		keywordsAr: [
			'Periodo ipotetico 1º / 2º / 3º tipo',
			'Congiuntivo imperfetto e trapassato',
			'Condizionale presente e passato',
			'Pronomi combinati (glielo, me ne)',
			'Particelle ci e ne',
			'Connettivi argomentativi'
		],
		discover: {
			scenarioAr:
				'تشتهر تمارين القواعد في الفصل الثالث وبكالوريا اللغة الإيطالية بثلاثي ذهبي: (1) الجملة الشرطية بأنواعها الثلاثة (حقيقة، إمكان، استحالة في الماضي)، (2) الضمائر المركبة مع ci/ne لتجنب التكرار، (3) الروابط المنطقية الحجاجية التي تصنع تماسك المقال.',
			svg: svgItalianGrammarMap({
				title: 'Periodo Ipotetico e Pronomi (BAC 3AS LE)',
				rootLabel: 'Sintassi avanzata di 3AS LE',
				rootSub: 'Tre tipi ipotetici, pronomi combinati e nessi logici',
				branches: [
					{
						label: '1º tipo (Realtà)',
						rule: 'Se + Ind. pres./fut. -> Ind.',
						example: 'Se studi, riuscirai bene.'
					},
					{
						label: '2º tipo (Possib.)',
						rule: 'Se + Cong. impf. -> Cond. pres.',
						example: 'Se studiassi, riusciresti.'
					},
					{
						label: '3º tipo (Irrealtà)',
						rule: 'Se + Cong. trap. -> Cond. pass.',
						example: 'Se avessi studiato, saresti...'
					},
					{
						label: 'Pronomi + CI/NE',
						rule: 'mi/ti/gli/ci/vi -> me/te/glie/ce/ve',
						example: 'Glielo do. / Ne ho letti tre.'
					}
				],
				width: 580
			}),
			steps: [
				{
					promptAr:
						'حوّل الجملة الشرطية من النوع الأول (Realtà) إلى النوع الثاني (Possibilità) ثم النوع الثالث (Irrealtà nel passato): «Se pianteremo più alberi, proteggeremo il suolo.»',
					hintAr: 'في 2º tipo: Se + congiuntivo imperfetto -> condizionale presente؛ وفي 3º tipo: Se + congiuntivo trapassato -> condizionale passato.',
					expectedInput: '2º tipo: Se piantassimo più alberi, proteggeremmo il suolo. | 3º tipo: Se avessimo piantato più alberi, avremmo protetto il suolo.',
					revealAr:
						'تذكر القاعدة الصارمة: لا يدخل Condizionale أبداً داخل جملة «Se» الشرطية! نقول «Se piantassimo» لا *«Se pianteremmo»!'
				},
				{
					promptAr:
						'عوّض الأسماء المكررة بضمير مركب (pronome combinato): «Ho prestato il dizionario a Karim -> ......... ho prestato.» و «Ho comprato quattro libri -> ......... ho comprati quattro.»',
					hintAr: 'في الأولى: gli + lo = glielo؛ وفي الثانية: الضمير الكمي ne مع مطابقة «comprati» للمذكر الجمع.',
					expectedInput: 'Gliel’ho prestato (o Glielo ho prestato). | Ne ho comprati quattro.',
					revealAr:
						'مع الأفعال المركبة (avere + participio)، الضمائر المباشرة (lo, la, li, le) والضمير الجزئي (ne) تفرض مطابقة اسم المفعول جنساً وعدداً مع الكلمة المحذوفة!'
				},
				{
					promptAr:
						'اختر الرابط المنطقي الأنسب: «......... l’impianto solare costi molto all’inizio, riduce subito le spese elettriche» (Poiché / Benché / Pertanto).',
					hintAr: 'الفعل «costi» في Congiuntivo والمعنى يفيد الاعتراض (رغم أن).',
					expectedInput: 'Benché (concessivo + congiuntivo)',
					revealAr:
						'لاحظ أن «Benché» تلتقي مع Congiuntivo للربط الاعتراضي، بينما «Poiché» (لأن) و«Pertanto» (لذلك) تلتقيان مع Indicativo!'
				}
			]
		},
		summary: {
			rulesAr: [
				'الجملة الشرطية (Periodo ipotetico): (1) 1º tipo della realtà: Se + presente/futuro -> presente/futuro/imperativo (Se risparmiamo acqua, salviamo le oasi). (2) 2º tipo della possibilità: Se + congiuntivo imperfetto -> condizionale presente (Se avessi tempo, imparerei un mestiere). (3) 3º tipo dell’irrealtà nel passato: Se + congiuntivo trapassato -> condizionale passato (Se avessero verificato la fonte, non avrebbero sbagliato).',
				'الضمائر المركبة (Pronomi combinati): الضمائر غير المباشرة mi, ti, ci, vi تتغير إلى me, te, ce, ve قبل lo, la, li, le, ne (me lo, te la, ce li, ve ne). أما gli و le (مفرد مؤنث/مذكر أو جمع) فتندمج جميعها في صيغة واحدة: glielo, gliela, glieli, gliele, gliene!',
				'الجزئيتان الضميريتان CI و NE: تحل «ci» محل المكان (Vado in biblioteca -> Ci vado) أو التركيب المسبوق بـ a/in/su/con (Penso all’esame -> Ci penso)؛ وتحل «ne» محل جزء أو كمية أو المسبوق بـ di/da (Quanti libri leggi? -> Ne leggo due؛ Parliamo del progetto -> Ne parliamo). مع passato prossimo، يتطابق اسم المفعول مع «ne»: Ne ho letti due (جمع مذكر) / Ne ho letta una (مفرد مؤنث).',
				'الروابط الحجاجية المتقدمة: Causa (poiché, siccome, dato che, a causa di + اسم)؛ Conseguenza (pertanto, quindi, dunque, di conseguenza)؛ Concessione/Opposizione (benché/sebbene + congiuntivo؛ nonostante + اسم/che+cong.؛ tuttavia, però, invece)؛ Aggiunta/Conclusione (inoltre, innanzitutto, in conclusione, in definitiva).'
			],
			visualSvg: svgItalianConjugationChart({
				title: 'Schema dei Tre Tipi del Periodo Ipotetico',
				subtitle: 'Attenzione: mai il condizionale subito dopo il «SE» ipotetico!',
				columns: [
					{
						header: '1º Tipo (Realtà)',
						rule: 'Se + Ind. -> Ind. / Imp.',
						examples: 'Se lavori, ottieni risultati.'
					},
					{
						header: '2º Tipo (Possibilità)',
						rule: 'Se + Cong. impf. -> Cond. pres.',
						examples: 'Se lavorassi, otterresti molto.'
					},
					{
						header: '3º Tipo (Irrealtà)',
						rule: 'Se + Cong. trap. -> Cond. pass.',
						examples: 'Se avessi lavorato, avresti...'
					}
				],
				width: 580
			}),
			visualCaptionAr:
				'المقارنة البصرية الصارمة لأنواع الجملة الشرطية الثلاثة في امتحان البكالوريا.',
			examples: [
				{
					problemAr:
						'Completa il periodo ipotetico: «Se l’anno scorso i giovani (creare) una cooperativa agricola, oggi (lavorare) già nella propria regione.» (Periodo ipotetico misto: passato -> presente)',
					solutionAr:
						'avessero creato (protasi 3º tipo riferita al passato) / lavorerebbero (apodosi 2º tipo riferita al presente «oggi»!).'
				},
				{
					problemAr:
						'Sostituisci con un pronome combinato: «Quando porti gli appunti a Sofia?» -> «......... porto domani.»',
					solutionAr:
						'Glieli porto domani. (a Sofia = le -> glie- + gli appunti = li -> glieli).'
				}
			],
			watchOutAr:
				'أخطر خطأين في الإيطالية بالبكالوريا: (1) وضع Condizionale بعد «Se» مثل *«Se avrei tempo, verrei» — الصواب: «Se avessi tempo, verrei»؛ (2) نسيان مطابقة اسم المفعول مع «ne» عند ذكر العدد أو الكمية: «Ho letto tre articoli -> Ne ho letti tre»!'
		},
		practice: [
			{
				questionAr:
					'Quale frase costruisce correttamente un periodo ipotetico del 2º tipo (possibilità)?',
				options: [
					'Se utilizzassimo più pannelli solari, ridurremmo le emissioni inquinanti.',
					'Se utilizzeremmo più pannelli solari, ridurremmo le emissioni inquinanti.',
					'Se utilizziamo più pannelli solari, ridurremmo le emissioni inquinanti.',
					'Se avessimo utilizzato più pannelli solari, ridurremo le emissioni inquinanti.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح 100%: «Se + congiuntivo imperfetto (utilizzassimo) -> condizionale presente (ridurremmo)».',
					'خطأ: يُمنع وضع condizionale بعد أداة الشرط «Se».',
					'خطأ: خلط غير متناسق بين الحاضر الإخباري والشرطي الحاضر.',
					'خطأ: خلط غير متطابق بين trapassato والمستقبل.'
				],
				explanationAr:
					'يتكوّن النوع الثاني من الجملة الشرطية من «Se + congiuntivo imperfetto» في الشرط و«condizionale presente» في الجواب.'
			},
			{
				questionAr:
					'Completa con il pronome combinato e l’accordo corretti: «Hai chiesto le informazioni alla direttrice? — Sì, ......... ho ......... ieri.»',
				options: [
					'gliele / chieste',
					'le li / chiesto',
					'glielo / chiesti',
					'ce le / chiesto'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: «alla direttrice» + «le informazioni (f. pl.)» = «gliele»، ويطابق اسم المفعول المؤنث الجمع: «chieste».',
					'خطأ: لا يُفصل الضميران ولا يُبقى اسم المفعول مفرداً.',
					'خطأ: «glielo» للمذكر المفرد لا للمؤنث الجمع.',
					'خطأ: «ce» تشير إلينا لا إليها.'
				],
				explanationAr:
					'الضمائر المركبة مع «a lei / a lui / a loro» تتحول جميعها إلى «glie-»، وتتطابق «lo, la, li, le» مع اسم المفعول.'
			},
			{
				questionAr:
					'Completa con la particella adatta e il participio concordato: «Quante pagine del saggio hai rivisto? — ......... ho ......... dieci.»',
				options: [
					'Ne / riviste',
					'Ci / rivisto',
					'Ne / rivisto',
					'Le / rivista'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: مع الكمية المحددة «dieci» نستخدم «ne» ونطابق اسم المفعول مع «pagine» المؤنث الجمع: «riviste».',
					'خطأ: «ci» لا تحل محل الكميات.',
					'خطأ: غياب مطابقة اسم المفعول للجمع المؤنث.',
					'خطأ: لا نستخدم «le» عند التصريح بالعدد «dieci» بعد الفعل.'
				],
				explanationAr:
					'عند وجود عدد أو محدد كمية بعد الفعل، نستعمل الضمير الجزئي «ne» مع مطابقة اسم المفعول للشيء المعدود.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 4: Metodologia della Prova di Maturità (BAC) e Produzione Scritta
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_lesson_3as_le_t3_metodologia_prova_bac_scrittura',
		slug: 'ita-3as-le-t3-metodologia-prova-bac-scrittura',
		grade: '3as_le',
		yearSubjectId: 795,
		trimesterId: 't3',
		sequenceId: 'unita3',
		sequenceTitleAr:
			'المحور الثالث: البيئة والجزائر الخضراء، عالم الشغل، الجملة الشرطية ومنهجية البكالوريا (Ecologia, Lavoro & Saggio BAC)',
		order: 4,
		titleAr:
			'منهجية امتحان البكالوريا والإنتاج الكتابي (Metodologia della prova BAC: comprensione, grammatica e saggio argomentativo)',
		objectives: [
			'التحكم الشامل في هيكلة امتحان اللغة الإيطالية للبكالوريا (3AS LE, مدة 03h00, معامل 4): القسم الأول الفهم (7 pti)، القسم الثاني الكفاءة اللغوية (7 pti)، والقسم الثالث الإنتاج الكتابي (6 pti)',
			'إتقان كتابة موضوع الإنتاج الكتابي في الاختيارين: Traccia 1 (Guidata بنقاط مساعدة) أو Traccia 2 (Libera حجاجية حرة) بصيغة المقال الحجاجي (saggio argomentativo) أو الرسالة الرسمية (lettera formale) في 120–145 كلمة متماسكة',
			'تطبيق قائمة المراجعة النهائية لتفادي الأخطاء القاتلة: حروف الجر المركبة، التوافق الزمني في Congiuntivo و Periodo ipotetico، النبْر الإملائي، وعلامات الترقيم'
		],
		keywordsAr: [
			'Prova BAC 3AS LE (7+7+6=20)',
			'Traccia 1 Guidata / Traccia 2 Libera',
			'Saggio argomentativo (المقال الحجاجي)',
			'Lettera formale (الرسالة الرسمية)',
			'Griglia di valutazione (شبكة التنقيط)',
			'Revisione finale (المراجعة النهائية)'
		],
		discover: {
			scenarioAr:
				'في يوم امتحان البكالوريا (03h00 — معامل 4)، يوزع المترشح الذكي وقته بدقة: 55 دقيقة لقراءة النص والإجابة عن Comprensione del testo (7 pti)، و55 دقيقة لتمارين Competenza linguistica (7 pti)، و60 دقيقة كاملة لبناء ومراجعة Produzione scritta (6 pti)، مع 10 دقائق مراجعة شاملة.',
			svg: svgItalianWritingBlueprint({
				title: 'Struttura del Saggio e Lettera BAC (6 pti)',
				steps: [
					{
						stage: '1. Introduzione',
						detail: 'Contesto attuale + domanda o tesi chiara (3 righe)'
					},
					{
						stage: '2. Argomenti',
						detail: 'Due ragioni ordinate + esempio concreto algerino'
					},
					{
						stage: '3. Concessione',
						detail: 'Benché / Tuttavia + risposta equilibrata e pratica'
					},
					{
						stage: '4. Conclusione',
						detail: 'Sintesi chiara + proposta costruttiva (3 righe)'
					}
				],
				width: 580
			}),
			steps: [
				{
					promptAr:
						'ما الفرق التنظيمي بين «Traccia 1 (Guidata)» و«Traccia 2 (Libera)» في القسم الثالث للبكالوريا، وما القاعدة الأهم في اختيار أحدهما؟',
					hintAr: 'Traccia 1 تمنحك نقاط توجيه معجمية وفكرية، بينما Traccia 2 حرة الصياغة؛ اختر ما تتقن معجمه.',
					expectedInput: 'الأولى موجهة بعناصر مساعدة والثانية حرة، والمترشح يختار واحدة فقط يمتلك فيها رصيداً لغوياً أقوى',
					revealAr:
						'حذارِ من إضاعة الوقت في كتابة كلا الموضوعين! اختر موضوعاً واحداً فقط (Scegli UNA traccia)، واستثمر النقاط المعطاة في Traccia 1 إن اخترتها لتكوين فقرات مترابطة دون نسخ حرفي.'
				},
				{
					promptAr:
						'ما العناصر الشكلية الإلزامية إذا طُلبت «Lettera formale al preside / direttore» في الإنتاج الكتابي؟',
					hintAr: 'تذكر المكان والتاريخ، تحية الافتتاح الرسمية (Gentile / Egregio Signor Direttore,)، وصيغة الاحترام «Lei» والختام.',
					expectedInput: 'المكان والتاريخ، التحية الرسمية، ضمير الاحترام Lei، عرض المطلب والحجج، وعبارة الختام المهذبة مثل Cordiali saluti',
					revealAr:
						'في الرسالة الرسمية الإيطالية نستخدم ضمير الاحترام «Lei» بأول حرف كبير اختيارياً مع أفعال المفرد الغائب: «Le chiedo / Mi rivolgo a Lei / La ringrazio» ونختم بـ «Distinti saluti» أو «Cordiali saluti».'
				},
				{
					promptAr:
						'كيف تجعل فقرة العرض في المقال الحجاجي (120–145 parola) أكثر إقناعاً ونضجاً أمام المصحح؟',
					hintAr: 'فكر في الاعتراض المتوازن (Benché..., tuttavia...) والمثال الثقافي أو العلمي الدقيق.',
					expectedInput: 'بتنظيم حجتين واضحتين مع مثال واقعي، وإضافة جملة اعتراضية متزنة بالروابط الدقيقة',
					revealAr:
						'تجنب الحشو والإطالة أو الخروج عن الموضوع؛ 120 إلى 145 كلمة منظمة في 4 فقرات خالية من الأخطاء النحوية تضمن أعلى علامة في شبكة التقييم!'
				}
			]
		},
		summary: {
			rulesAr: [
				'إدارة الزمن في امتحان البكالوريا (3 ساعات، 20 نقطة): القسم I Comprensione del testo (7 pti — نحو 55 دقيقة): اقرأ النص 3 مرات، وحدد الفقرات (§1, §2, §3)، وأجب من النص دون نسخ أعمى، مع تعليل كل عبارة «Falso». القسم II Competenza linguistica (7 pti — نحو 55 دقيقة): تصنيف، جدول عائلة الكلمات، مرادفات/أضداد، تحويل نحوي (passivo / congiuntivo / indiretto / ipotetico)، وملء الفراغات.',
				'القسم III Produzione scritta (6 pti — 60 دقيقة، 120–145 كلمة): شبكة التقييم المعتمدة (Griglia): Pertinenza e rispetto delle consegne (1.5 pti) + Coerenza e coesione / connettivi (1.5 pti) + Correttezza grammaticale e verbale (1.5 pti) + Ricchezza lessicale e ortografia (1.5 pti).',
				'رصيد الروابط الفاخرة للتحرير الإيطالي: للاستهلال (Al giorno d’oggi, Oggigiorno, Negli ultimi anni)؛ للترتيب والإضافة (Innanzitutto, In primo luogo, Inoltre, Per di più)؛ للتمثيل (Ad esempio, Come dimostrano...)؛ للاستدراك والاعتراض (Tuttavia, Eppure, Benché + cong., Nonostante ciò)؛ للخاتمة (In conclusione, In definitiva, Pertanto).',
				'قائمة المراجعة النهائية (Controllo finale — 10 minuti): (1) مراجعة تطابق الفاعل والفعل والموصوف والصفة؛ (2) فحص Congiuntivo و Periodo ipotetico؛ (3) التدقيق في «è / e»، «dà / da»، «lì / li»، «perché / poiché / affinché»، و«qual è» (بلا فاصلة عليا)؛ (4) التأكد من نظافة الورقة ووضوح تقسيم الفقرات.'
			],
			visualSvg: svgItalianConjugationChart({
				title: 'Generi di Scrittura BAC (6 pti)',
				subtitle: 'Modelli pronti per 120–145 parole ordinate',
				columns: [
					{
						header: 'Saggio argomentativo',
						rule: '4 paragrafi + tesi + esempi',
						examples: 'Innanzitutto / Tuttavia / Quindi'
					},
					{
						header: 'Lettera formale',
						rule: 'Luogo/data + Lei + saluto finale',
						examples: 'Gentile Direttore, / Distinti saluti'
					},
					{
						header: 'Controllo finale',
						rule: 'Accordi, accenti, congiuntivo',
						examples: 'qual è, perché, affinché sia'
					}
				],
				width: 580
			}),
			visualCaptionAr:
				'ملخص القالبين الأساسيين للإنتاج الكتابي في البكالوريا وضوابط المراجعة اللغوية النهائية.',
			examples: [
				{
					problemAr:
						'Modello di introduzione per saggio BAC (tema ecologico): «Come tutelare l’ambiente attraverso le energie pulite e l’impegno giovanile?»',
					solutionAr:
						'Al giorno d’oggi, la salvaguardia dell’ambiente rappresenta una delle sfide più urgenti per il futuro del Mediterraneo. Di fronte alla scarsità d’acqua e all’inquinamento, conviene chiedersi come possano i cittadini e i giovani promuovere uno sviluppo davvero sostenibile.'
				},
				{
					problemAr:
						'Modello di apertura e chiusura di una lettera formale al preside del liceo:',
					solutionAr:
						'Algeri, 18 maggio 2026. Gentile Signor Preside, Le scriviamo a nome della classe 3AS LE per proporre l’organizzazione di una giornata dedicata alla lettura e alla tutela ambientale nel nostro istituto... RingraziandoLa per la cortese attenzione, Le porgiamo i nostri più distinti saluti.'
				}
			],
			watchOutAr:
				'لا تنسَ وضع الفاصلة بعد الروابط الافتتاحية مثل «Innanzitutto, ...» و«Tuttavia, ...» و«In conclusione, ...»، ولا تستخدم أبداً العبارات العامية أو الحروف المختصرة الخاصة بالرسائل الهاتفية!'
		},
		practice: [
			{
				questionAr:
					'Quale registro linguistico e pronome di cortesia sono obbligatori in una lettera formale indirizzata al preside del liceo?',
				options: [
					'Il registro formale con l’uso coerente del pronome «Lei»',
					'Il registro familiare con il pronome «tu»',
					'Abbreviazioni informali da messaggistica breve',
					'Solo verbi all’infinito senza formule di saluto'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الرسالة الرسمية في الإيطالية تفرض السجل الرصين وصيغة الاحترام «Lei».',
					'خطأ: «tu» تُستعمل للأصدقاء والأهل لا لإدارة المؤسسة.',
					'خطأ: الاختصارات العامية مرفوضة في البكالوريا.',
					'خطأ: يجب احترام هيكل الرسالة وتحيتها الافتتاحية والختامية.'
				],
				explanationAr:
					'الرسالة الرسمية (lettera formale) تتطلب صيغة الاحترام «Lei» وتصريف الفعل مع الغائب المفرد.'
			},
			{
				questionAr:
					'Quale delle seguenti frasi è scritta in modo ortograficamente perfetto per la revisione finale del BAC?',
				options: [
					'Qual è la soluzione più efficace affinché il progetto riesca?',
					'Qual’è la soluzione piu efficace affinche il progetto riesca?',
					'Qual è la soluzione piú efficace perchè il progetto riesce?',
					'Qual’è la soluzione più efficace se riuscirebbe il progetto?'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: «Qual è» دون فاصلة عليا، و«più» بالنبْر النازل، و«affinché» بالنبْر الصاعد متبوعة بـ Congiuntivo (riesca).',
					'خطأ: «Qual’è» خطأ إملائي شائع، كما سقطت شدّة «più» و«affinché».',
					'خطأ: «piú» و«perchè» بنبْر مقلوب، و«affinché» تتبع بـ Congiuntivo.',
					'خطأ: «Qual’è» خاطئة وكذلك *«se riuscirebbe».'
				],
				explanationAr:
					'في الإيطالية نكتب «qual è» دون فاصلة عليا، و«più» بالنبْر النازل (accento grave)، و«affinché / perché» بالنبْر الصاعد (accento acuto).'
			},
			{
				questionAr:
					'Come conviene chiudere in modo efficace un saggio argomentativo da 120–145 parole al BAC?',
				options: [
					'Con un connettivo conclusivo chiaro («In definitiva, ...») che sintetizzi la tesi e offra una proposta concreta',
					'Interrompendo bruscamente l’ultimo argomento senza conclusione',
					'Copiando parola per parola il testo di comprensione',
					'Scrivendo «Fine del foglio» senza alcuna frase compiuta'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الخاتمة التركيبية الواضحة تترك انطباعاً ممتازاً لدى المصحح.',
					'خطأ: غياب الخاتمة يخل بتماسك المقال.',
					'خطأ: النسخ من نص الفهم يفقد المترشح علامة الإنتاج الكتابي.',
					'خطأ: عبارة ضعيفة لا قيمة حجاجية لها.'
				],
				explanationAr:
					'المقال الجيد ينتهي بفقرة ختامية موجزة تجمع الخلاصة وتفتح أفقاً عملياً.'
			}
		]
	}
];
