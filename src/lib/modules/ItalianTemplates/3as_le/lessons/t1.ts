import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';
import {
	svgItalianConjugationChart,
	svgItalianGrammarMap,
	svgItalianWordFormation
} from '../../svg-italian';
import type { ItalianInteractiveLessonData } from '../../types';

/**
 * 3AS BAC Foreign Languages (لغات أجنبية — yearSubjectId: 795, coeff 4, 03h00, 7+7+6=20)
 * Interactive Lessons — Trimestre 1 : Famiglia, Istruzione, Patrimonio Mediterraneo & Morfologia / Passivo (4 lessons)
 */
export const LESSONS_3AS_LE_T1: ItalianInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 1: Famiglia, Istruzione, Lingue Straniere e Solidarietà
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_lesson_3as_le_t1_famiglia_educazione_solidarieta',
		slug: 'ita-3as-le-t1-famiglia-educazione-solidarieta',
		grade: '3as_le',
		yearSubjectId: 795,
		trimesterId: 't1',
		sequenceId: 'unita1',
		sequenceTitleAr:
			'المحور الأول: الأسرة، التربية، التراث المتوسطي والبناء الصرفي والنحوي (Famiglia, Patrimonio & Morfologia)',
		order: 1,
		titleAr:
			'الأسرة، التعليم، المطالعة والتضامن الشبابي (Famiglia, istruzione, lingue straniere e solidarietà)',
		objectives: [
			'تحليل نصوص المحور التربوي والأسري في بكالوريا اللغة الإيطالية (3AS LE) حول الحوار الأسري، المطالعة في المكتبة وتعلم اللغات الأجنبية',
			'توظيف المعجم الإيطالي الدقيق للقيم والتعليم والتكافل (dialogo familiare, lettura critica, impegno civile, volontariato, solidarietà) في الفهم والإنشاء',
			'إتقان منهجية الإجابة عن أسئلة الفهم في البكالوريا (Idea principale, Vero/Falso con giustificazione, referenti contestuali, riflessione personale)'
		],
		keywordsAr: [
			'Famiglia e dialogo (الأسرة والحوار)',
			'Istruzione e biblioteca (التعليم والمكتبة)',
			'Lingue straniere (اللغات الأجنبية)',
			'Lettura critica (المطالعة النقدية)',
			'Volontariato (التطوع)',
			'Solidarietà (التضامن)'
		],
		discover: {
			scenarioAr:
				'في بكالوريا شعبة اللغات الأجنبية (3AS LE)، تفتتح نصوص الفصل الأول بقضايا قريبة من واقع التلميذ الجزائري: التوازن بين طموح الشباب في الدراسة واحترام توجيه الوالدين، دور المكتبة المدرسية في صقل الفكر، وقيمة تعلم اللغة الإيطالية إلى جانب العربية بوصفها جسر معرفة وتعاون في الفضاء المتوسطي.',
			svg: renderLessonIllustration('ita_03_istruzione_lingue_biblioteca', {
				lang: 'it',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'اقرأ الجملة التالية: «Studiare le lingue straniere non indebolisce la lingua madre, ma affina la consapevolezza culturale dello studente.» ما العلاقة التي يقررها الكاتب بين اللغة الأم واللغات الأجنبية؟',
					hintAr: 'انتبه إلى التركيب المقارن «non indebolisce ..., ma affina ...».',
					expectedInput: 'علاقة تكامل وإثراء، فاللغات الأجنبية لا تضعف اللغة الأم بل تصقل الوعي الثقافي',
					revealAr:
						'تؤكد نصوص البكالوريا أن تعلم الإيطالية وغيرها من اللغات الأجنبية يكمل اللغة العربية ولا ينافسها، بل يفتح آفاق الترجمة الأمينة والحوار العلمي.'
				},
				{
					promptAr:
						'في عبارة: «Oltre alle conoscenze scolastiche, i giovani crescono grazie all’esempio dei genitori e al servizio solidale verso la comunità», استخرج ركيزتين تربويتين للنجاح.',
					hintAr: 'ابحث عن الاسمين المجرورين بعد «grazie a».',
					expectedInput: 'قدوة الوالدين (esempio dei genitori) وخدمة المجتمع بالتضامن (servizio solidale)',
					revealAr:
						'تربط نصوص المحور الأول التفوق الدراسي في الثانوية بالتربية الأسرية السليمة والمشاركة التطوعية في دعم التلاميذ وتنظيف الأحياء ونشر الكتب.'
				},
				{
					promptAr:
						'لماذا يُطلب في سؤال الفهم (Vero / Falso) بالبكالوريا كتابة التبرير (Giustificazione) عند وضع علامة «Falso»؟',
					hintAr: 'فكّر في طريقة التحقق من فهم المترشح للفقرة المعنية دون تخمين عشوائي.',
					expectedInput: 'لإثبات استيعاب المعلومة الدقيقة من النص وتصحيح الخطأ بجملة مقتبسة أو مصاغة من الفقرة',
					revealAr:
						'في تصحيح البكالوريا، تمنح العلامة الكاملة عندما يرفق المترشح الحكم «Falso» بالتبرير النصي الدقيق مع الإشارة إلى الفقرة (§1, §2, §3).'
				}
			]
		},
		summary: {
			rulesAr: [
				'محاور الوحدة الأولى في الفهم: الحوار والاحترام المتبادل داخل الأسرة (il rispetto verso i genitori e gli anziani)، أهمية القراءة المتأنية في المكتبة المدرسية مقارنة بالتصفح السطحي، وإتقان اللغات الأجنبية والترجمة الأمينة.',
				'المعجم المفتاحي الأساسي: impegno scolastico (الاجتهاد الدراسي)، costanza / perseveranza (المثابرة)، biblioteca scolastica (المكتبة المدرسية)، volontariato giovanile (التطوع الشبابي)، spirito critico (الروح النقدية)، identità culturale (الهوية الثقافية).',
				'فك الإحالات والضمائر في النص (I referenti): عندما يطلب السؤال تحديد مرجع كلمة مسطّرة مثل «questo percorso» أو «essa» أو «ciò», نعود إلى الجملة السابقة مباشرة لاستخراج الاسم أو الفكرة الدقيقة.',
				'صياغة سؤال الرأي الشخصي (Riflessione personale — 4/5 righe): ابدأ بعبارة رصينة مثل «A mio parere / Secondo me / Dal mio punto di vista»، قدّم حجتين واضحتين من الواقع، واختم بجملة تركيبية متوازنة.'
			],
			visualSvg: svgItalianGrammarMap({
				title: 'Famiglia, Istruzione e Solidarietà (3AS LE)',
				rootLabel: 'Crescita umana e scolastica',
				rootSub: 'Ejes tematici e lessico chiave per il BAC',
				branches: [
					{
						label: 'Famiglia',
						rule: 'Dialogo, ascolto e gratitudine',
						example: 'rispetto per i genitori'
					},
					{
						label: 'Lettura critica',
						rule: 'Studio attento in biblioteca',
						example: 'arricchire il lessico'
					},
					{
						label: 'Lingue straniere',
						rule: 'Ponte tra culture e saperi',
						example: 'tradurre con rigore'
					},
					{
						label: 'Solidarietà',
						rule: 'Aiuto reciproco e impegno',
						example: 'servire il bene comune'
					}
				],
				width: 580
			}),
			visualCaptionAr:
				'خريطة المفاهيم المحورية لوحدة الأسرة والتعليم واللغات الأجنبية والتضامن في بكالوريا الإيطالية.',
			examples: [
				{
					problemAr:
						'Domanda di comprensione: «Perché la lettura di libri completi nella biblioteca scolastica migliora la scrittura degli studenti?»',
					solutionAr:
						'Perché abitua alla concentrazione prolungata, amplia il vocabolario preciso e aiuta a seguire un ragionamento logico dall’inizio alla fine.'
				},
				{
					problemAr:
						'Risposta di opinione (4–5 righe): «Secondo te, in che modo il volontariato scolastico completa la formazione di un maturando?»',
					solutionAr:
						'Dal mio punto di vista, il volontariato scolastico insegna a organizzare il tempo con responsabilità e a collaborare con spirito fraterno. Aiutare i compagni più giovani o curare gli spazi dell’istituto rafforza l’empatia, l’umiltà e il senso civico senza ostacolare lo studio quotidiano.'
				}
			],
			watchOutAr:
				'احذر في أسئلة الفهم من الخلط بين «qual è» (دون فاصلة عليا أبداً في الإيطالية) و«qual’è» الخاطئة، ولا تكتفِ في إجابة الرأي الشخصي بنسخ جمل حرفية من النص بل عبّر بأسلوبك السليم!'
		},
		practice: [
			{
				questionAr:
					'Nei testi educativi della 3AS LE, quale effetto produce lo studio serio delle lingue straniere sulla lingua materna?',
				options: [
					'La rafforza sviluppando la capacità comparativa e la precisione espressiva',
					'La cancella completamente in poche settimane',
					'Impedisce di leggere testi scientifici nazionali',
					'Rende inutile lo studio della grammatica e del lessico'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: مقارنة التراكيب اللغوية تصقل الوعي باللغة الأم وتعزز الدقة التعبيرية.',
					'خطأ: تعلم اللغات لا يلغي اللغة الأم بل يكملها.',
					'خطأ: إتقان اللغات يدعم البحث العلمي المقارن.',
					'خطأ: ضبط القواعد والمعجم شرط أساس للتمكن اللغوي.'
				],
				explanationAr:
					'تؤكد نصوص شعبة اللغات الأجنبية التكامل المعرفي بين اللغة العربية واللغات الأجنبية المدروسة.'
			},
			{
				questionAr:
					'Quale espressione introduce nel modo più formale ed elegante una risposta di riflessione personale al BAC?',
				options: [
					'Non saprei proprio cosa dire.',
					'Dal mio punto di vista, ritengo che...',
					'Copio subito la prima riga del testo.',
					'Forse sì o forse no, è uguale.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: صيغة عامية ضعيفة لا تناسب الامتحان.',
					'ممتاز: عبارة أكاديمية رصينة لافتتاح الرأي المعلل في البكالوريا.',
					'خطأ: النسخ الحرفي يُفقد المترشح علامة الرأي الشخصي.',
					'خطأ: أسلوب متردد يفتقر إلى الحجاج.'
				],
				explanationAr:
					'يُستحسن دائماً بدء فقرة الرأي بصيغة واضحة مثل «Dal mio punto di vista» أو «A mio avviso».'
			},
			{
				questionAr:
					'Che cosa richiede obbligatoriamente la correzione di un’affermazione valutata «Falso» nella comprensione del testo?',
				options: [
					'Scrivere soltanto la lettera F senza alcuna spiegazione',
					'Tradurre l’intero brano in lingua araba',
					'Fornire la giustificazione esatta tratta dal paragrafo pertinente del testo',
					'Aggiungere un dato inventato estraneo al documento'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: غياب التبرير ينقص نصف العلامة أو يلغيها في بعض الأسئلة.',
					'خطأ: التبرير يُكتب بالإيطالية انطلاقاً من النص.',
					'صحيح: يجب تقديم التعليل النصي الدقيق الذي يدحض العبارة الخاطئة.',
					'خطأ: يجب الالتزام التام بمعلومات الوثيقة المقروءة.'
				],
				explanationAr:
					'تقتضي منهجية البكالوريا إرفاق كل عبارة «Falso» بتعليل دقيق مستخرج من النص.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 2: Patrimonio Mediterraneo, Architettura Algerina e Cartografia Storica
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_lesson_3as_le_t1_patrimonio_mediterraneo_cartografia',
		slug: 'ita-3as-le-t1-patrimonio-mediterraneo-cartografia',
		grade: '3as_le',
		yearSubjectId: 795,
		trimesterId: 't1',
		sequenceId: 'unita1',
		sequenceTitleAr:
			'المحور الأول: الأسرة، التربية، التراث المتوسطي والبناء الصرفي والنحوي (Famiglia, Patrimonio & Morfologia)',
		order: 2,
		titleAr:
			'التراث المعماري الجزائري والمتوسطي والخرائط العلمية (Patrimonio mediterraneo, architettura algerina e cartografia)',
		objectives: [
			'استكشاف النصوص الثقافية والحضارية حول المعالم المعمارية الجزائرية (Casbah di Algeri, Grande Moschea di Tlemcen, Valle dello M’Zab a Ghardaïa, Ponti di Costantina) باللغة الإيطالية',
			'تقدير الإسهامات العلمية التاريخية في الفضاء المتوسطي مثل الجغرافي ورسام الخرائط Al-Idrisi والطبيب الجراح Al-Zahrawi وعالم البصريات Ibn Al-Haytham والمؤرخ Ibn Khaldoun',
			'استثمار المعجم التراثي والعمراني الدقيق (patrimonio architettonico, tutela dei monumenti, cartografia, manoscritti, sostenibilità urbana)'
		],
		keywordsAr: [
			'Casbah di Algeri (قصبة الجزائر)',
			'Moschea di Tlemcen (جامع تلمسان)',
			'Valle dello M’Zab (وادي ميزاب)',
			'Al-Idrisi (الإدريسي رسام الخرائط)',
			'Al-Zahrawi (الزهراوي)',
			'Patrimonio (التراث المعماري)'
		],
		discover: {
			scenarioAr:
				'يربط البحر الأبيض المتوسط بين الجزائر وإيطاليا بجسور تاريخية وعلمية عميقة: من أزقة قصبة الجزائر العتيقة والجامع الكبير بتلمسان وعمارة وادي ميزاب المتكيفة مع المناخ الصحراوي، إلى أعمال الجغرافي Al-Idrisi الذي وضع خرائط متوسطية دقيقة في صقلية، ورسائل Al-Zahrawi الطبية، ومنهج Ibn Al-Haytham التجريبي. كل ذلك يشكّل مادة ثرية لنصوص الثقافة والحضارة في البكالوريا.',
			svg: renderLessonIllustration('ita_02_patrimonio_architettonico_mediterraneo', {
				lang: 'it',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'اقرأ العبارة التالية: «L’architettura tradizionale della Casbah di Algeri e della Valle dello M’Zab protegge dal calore estivo, raccoglie l’acqua piovana e favorisce la vita comunitaria.» ما المزايا الثلاث لهذا العمران؟',
					hintAr: 'لاحظ الأفعال الثلاثة المتتابعة: protegge, raccoglie, favorisce.',
					expectedInput: 'الحماية من الحرارة، تجميع مياه الأمطار، وتعزيز التكافل والعيش الجماعي',
					revealAr:
						'تُبرز النصوص أن العمارة التقليدية في القصبة ووادي ميزاب ليست مجرد جمال شكلي، بل هندسة بيئية مستدامة تخدم الإنسان والمناخ.'
				},
				{
					promptAr:
						'ما أبرز إنجاز اشتهر به الجغرافي Al-Idrisi في صقلية بالقرن الثاني عشر الميلادي؟ وكيف أسهم Al-Zahrawi في الطب؟',
					hintAr: 'الأول اشتهر برسم الخرائط الجغرافية والموسوعة الوصفية، والثاني بالجراحة والأدوات الطبية.',
					expectedInput: 'رسم الإدريسي خرائط دقيقة للبحر المتوسط والعالم في صقلية، وابتكر الزهراوي أدوات جراحية وطرق علاج موثقة',
					revealAr:
						'شكّلت مؤلفات Al-Idrisi في الجغرافيا وAl-Zahrawi في الطب وIbn Al-Haytham في البصريات مراجع علمية رصينة تُرجمت في حوض المتوسط.'
				},
				{
					promptAr:
						'اذكر معلمين تاريخيين جزائريين آخرين إضافة إلى القصبة ووادي ميزاب يمكن الاستشهاد بهما في موضوع التراث بالإيطالية.',
					hintAr: 'تذكر تلمسان وقسنطينة وبني حماد وتاسيلي.',
					expectedInput: 'La Grande Moschea di Tlemcen, I Ponti di Costantina, La Qal’a dei Beni Hammad',
					revealAr:
						'حفظ الأسماء الصحيحة بالإيطالية مثل «La Grande Moschea di Tlemcen» و«I Ponti di Costantina» و«La Valle dello M’Zab» يمنح التعبير الكتابي دقة ثقافية عالية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'المعالم الجزائرية المعتمدة في البكالوريا: La Casbah di Algeri (بنايتها الهندسية وأزقتها الظليلة)، La Grande Moschea di Tlemcen (زخرفتها الهندسية المتقنة)، La Valle dello M’Zab a Ghardaïa (الاستدامة العمرانية)، I Ponti di Costantina، La Qal’a dei Beni Hammad، و Tassili n’Ajjer.',
				'أعلام العلم والحضارة في الفضاء المتوسطي: Al-Idrisi (cartografo e geografo attivo in Sicilia, autore del Libro di Ruggero / Nuzhat al-Mushtaq)، Al-Zahrawi / Abulcasis (medico e chirurgo pioniere negli strumenti chirurgici)، Ibn Al-Haytham (ottica e metodo sperimentale)، Al-Khwarizmi (algebra)، Ibn Battuta (viaggiatore) و Ibn Khaldoun (storiografia e sociologia).',
				'رواد التعليم والإصلاح في الجزائر: الشيخ عبد الحميد بن باديس (Cheikh Abdelhamid Ben Badis)، الشيخ محمد البشير الإبراهيمي (Cheikh Mohamed Bachir El-Ibrahimi)، الشيخ مبارك الميلي (Cheikh Moubarek El-Mili)، ومفدي زكريا (Moufdi Zakaria).',
				'المعجم المفتاحي لوحدة التراث: tutela del patrimonio (صيانة التراث)، restauro conservativo (الترميم المحافظ)، manoscritti storici (المخطوطات التاريخية)، scambio scientifico (التبادل العلمي)، cartografia (علم الخرائط)، memoria collettiva (الذاكرة الجماعية).'
			],
			visualSvg: svgItalianGrammarMap({
				title: 'Patrimonio Mediterraneo e Scienza (3AS LE)',
				rootLabel: 'Architettura, storia e sapere',
				rootSub: 'Esempi algerini e mediterranei autorizzati',
				branches: [
					{
						label: 'Casbah e Tlemcen',
						rule: 'Urbanistica e moschee storiche',
						example: 'tutela dei centri antichi'
					},
					{
						label: 'Valle dello M’Zab',
						rule: 'Città nel deserto e risparmio',
						example: 'architettura sostenibile'
					},
					{
						label: 'Al-Idrisi',
						rule: 'Cartografia precisa in Sicilia',
						example: 'mappe del Mediterraneo'
					},
					{
						label: 'Al-Zahrawi',
						rule: 'Trattati e strumenti medici',
						example: 'rigore scientifico antico'
					}
				],
				width: 580
			}),
			visualCaptionAr:
				'المرتكزات المعمارية والعلمية لوحدة التراث المتوسطي وعلم الخرائط في بكالوريا اللغة الإيطالية.',
			examples: [
				{
					problemAr:
						'Domanda di comprensione: «Per quale ragione le opere di Al-Idrisi e Al-Zahrawi rimasero influenti per secoli lungo le sponde del Mediterraneo?»',
					solutionAr:
						'Perché si basavano sull’osservazione rigorosa, sulla descrizione accurata dei luoghi e degli strumenti e furono consultate da studiosi e traduttori di diverse regioni.'
				},
				{
					problemAr:
						'Domanda di sintesi (4 righe): «Come possono i giovani algerini contribuire oggi alla valorizzazione del patrimonio architettonico della propria città?»',
					solutionAr:
						'I giovani possono innanzitutto rispettare i monumenti storici durante le visite, partecipare a giornate di pulizia e sensibilizzazione nelle associazioni locali e documentare con rigore la storia di siti come la Casbah o Tlemcen mediante ricerche scolastiche.'
				}
			],
			watchOutAr:
				'احرص دائماً على كتابة الأسماء الجغرافية والتاريخية بالإيطالية دون أخطاء: «Algeri» (الجزائر العاصمة)، «Algeria» (الجزائر)، «Costantina» (قسنطينة)، «Sicilia» (صقلية)، «Mar Mediterraneo» (البحر المتوسط)!'
		},
		practice: [
			{
				questionAr:
					'Quale celebre studioso del XII secolo elaborò in Sicilia una descrizione geografica e cartografica dettagliata del bacino mediterraneo?',
				options: ['Al-Idrisi', 'Al-Khwarizmi', 'Ibn Battuta', 'Moufdi Zakaria'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الإدريسي (Al-Idrisi) هو الجغرافي ورسام الخرائط الذي أنجز موسوعته وخريطته الشهيرة في صقلية.',
					'خطأ: الخوارزمي عالم رياضيات وجبر.',
					'خطأ: ابن بطوطة رحالة من القرن الرابع عشر الميلادي.',
					'خطأ: مفدي زكريا شاعر جزائري معاصر.'
				],
				explanationAr:
					'اشتهر الإدريسي برسم الخرائط الجغرافية الدقيقة للبحر الأبيض المتوسط والعالم في القرن الثاني عشر.'
			},
			{
				questionAr:
					'Che cosa rende esemplare l’architettura tradizionale della Valle dello M’Zab a Ghardaïa secondo i testi di civiltà?',
				options: [
					'L’equilibrio tra geometria essenziale, protezione dal clima caldo e gestione dell’acqua',
					'L’uso esclusivo di grattacieli in vetro trasparente',
					'L’abbandono completo di qualsiasi spazio comunitario',
					'L’assenza di qualunque pianificazione urbana'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: عمارة وادي ميزاب تجمع بين الهندسة المتوازنة والحماية من الحر وتدبير المياه.',
					'خطأ: البنايات التقليدية تعتمد الحجر والجير والطين المتكيف مع الصحراء.',
					'خطأ: تنظيم القصور يعزز الحياة الجماعية والتضامن.',
					'خطأ: تشتهر قصور ميزاب بتخطيط عمراني دقيق ومتوارث.'
				],
				explanationAr:
					'تُدرس عمارة وادي ميزاب في البكالوريا بوصفها نموذجاً للاستدامة العمرانية والهندسية.'
			},
			{
				questionAr:
					'Quale termine italiano indica l’intervento attento per conservare un monumento antico senza alterarne l’autenticità?',
				options: [
					'La demolizione rapida',
					'Il restauro conservativo',
					'La dimenticanza totale',
					'L’abbandono strutturale'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الهدم يناقض صيانة التراث.',
					'ممتاز: «Il restauro conservativo» يعني الترميم المحافظ على أصالة المعلم.',
					'خطأ: يدل على الإهمال والنسيان.',
					'خطأ: ترك المعالم يعرضها للتلف.'
				],
				explanationAr:
					'مصطلح «tutela e restauro conservativo» أساسي في نصوص صيانة المعالم التاريخية.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 3: La Forma Attiva e la Forma Passiva (essere, venire, si passivante)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_lesson_3as_le_t1_forma_attiva_passiva',
		slug: 'ita-3as-le-t1-forma-attiva-passiva',
		grade: '3as_le',
		yearSubjectId: 795,
		trimesterId: 't1',
		sequenceId: 'unita1',
		sequenceTitleAr:
			'المحور الأول: الأسرة، التربية، التراث المتوسطي والبناء الصرفي والنحوي (Famiglia, Patrimonio & Morfologia)',
		order: 3,
		titleAr:
			'المبني للمعلوم والمبني للمجهول (La forma attiva e passiva con essere, venire e si passivante)',
		objectives: [
			'إتقان التحويل من المبني للمعلوم إلى المبني للمجهول في الأزمنة البسيطة والمركبة مع الحفاظ التام على الزمن الأصلي ومطابقة اسم المفعول (participio passato) جنساً وعدداً',
			'التمييز الدقيق بين استعمال المساعد «essere» (في جميع الأزمنة) والمساعد «venire» (في الأزمنة البسيطة فقط للتأكيد على الحدث) وصيغة «si passivante»',
			'تحديد وتوظيف مكمل الفاعل (complemento d’agente: da + persona/essere animato) ومكمل السبب الفاعل (complemento di causa efficiente: da + cosa/forza naturale)'
		],
		keywordsAr: [
			'Forma attiva e passiva',
			'Ausiliare essere / venire',
			'Si passivante',
			'Complemento d’agente',
			'Causa efficiente',
			'Accordo del participio'
		],
		discover: {
			scenarioAr:
				'ترد صيغة المبني للمجهول (La forma passiva) باستمرار في نصوص التراث والصحافة العلمية بامتحانات البكالوريا، ولا يكاد يخلو تمرين القواعد في الفصل الأول من سؤال التحويل من Attiva إلى Passiva أو العكس. المفتاح في خطوتين: نقل المفعول به المباشر ليصبح فاعلاً، ومطابقة اسم المفعول مع المساعد المناسب.',
			svg: svgItalianGrammarMap({
				title: 'Forma Attiva e Passiva (BAC 3AS LE)',
				rootLabel: 'Trasformazione attiva -> passiva',
				rootSub: 'Solo con verbi transitivi + complemento oggetto',
				branches: [
					{
						label: 'Con ESSERE',
						rule: 'Tutti i tempi semplici e composti',
						example: 'Il libro è stato letto da tutti.'
					},
					{
						label: 'Con VENIRE',
						rule: 'Solo tempi semplici (azione dinamica)',
						example: 'La moschea viene restaurata.'
					},
					{
						label: 'SI passivante',
						rule: 'si + verbo 3ª sing./pl. senza agente',
						example: 'Si leggono testi antichi.'
					},
					{
						label: 'DA + Agente',
						rule: 'Persona (agente) / Cosa (causa eff.)',
						example: 'scritto da Al-Idrisi / dal vento'
					}
				],
				width: 580
			}),
			steps: [
				{
					promptAr:
						'تأمل الجملة المعلومة: «Gli artigiani restaurano le antiche porte della Casbah». عند تحويلها إلى Passiva، ما التغير الذي يطرأ على الفعل واسم المفعول؟',
					hintAr: 'المفعول به «le antiche porte» مؤنث جمع، والفعل الأصلي في Presente indicativo.',
					expectedInput: 'Le antiche porte della Casbah sono (o vengono) restaurate dagli artigiani.',
					revealAr:
						'يُصرّف المساعد «essere» (أو «venire») في الزمن نفسه (Presente: sono / vengono)، ويتطابق اسم المفعول مع الفاعل المؤنث الجمع: «restaurate»، ويُسبق الفاعل الأصلي بحرف الجر المركب «dagli».'
				},
				{
					promptAr:
						'لماذا يصح قول «La mappa venne disegnata nel XII secolo» ولا يصح أبداً قول «La mappa è venuta disegnata» في المبني للمجهول؟',
					hintAr: 'تذكر شرط استعمال الفعل المساعد «venire» في الباسيف.',
					expectedInput: 'لأن venire يُستعمل في المبني للمجهول في الأزمنة البسيطة فقط وليس في الأزمنة المركبة',
					revealAr:
						'قاعدة ذهبية في البكالوريا: المساعد «venire» يحل محل «essere» في الأزمنة البسيطة فقط (presente, imperfetto, passato remoto, futuro semplice...)؛ أما في الأزمنة المركبة فنستعمل «essere» وحده: «è stata disegnata».'
				},
				{
					promptAr:
						'صنّف العبارتين حسب النوع النحوي لـ «da»: (1) «un trattato scritto da Al-Zahrawi» و(2) «muri erosi dal vento del deserto».',
					hintAr: 'الأول شخص عاقل، والثاني ظاهرة طبيعية غير عاقلة.',
					expectedInput: 'da Al-Zahrawi = complemento d’agente | dal vento = complemento di causa efficiente',
					revealAr:
						'إذا كان المنفّذ شخصاً أو كائناً حياً سُمّي «complemento d’agente»، وإذا كان شيئاً أو قوة طبيعية سُمّي «complemento di causa efficiente».'
				}
			]
		},
		summary: {
			rulesAr: [
				'قاعدة التحويل الأساسية: Soggetto + Verbo transitivo + Oggetto diventa Soggetto paziente + ESSERE (بنفس زمن الفعل الأصلي) + Participio passato (مطابقاً للفاعل الجديد جنساً وعدداً: -o, -a, -i, -e) + da / dal / dalla / dagli / dalle + Agente.',
				'تطابق الأزمنة مع «essere»: Presente (è letto)؛ Passato prossimo (è stato letto)؛ Imperfetto (era letto)؛ Trapassato prossimo (era stato letto)؛ Passato remoto (fu letto)؛ Futuro semplice (sarà letto). انتبه إلى بقاء «stato / stata / stati / state» دائماً في الأزمنة المركبة!',
				'المساعد «venire» بدل «essere»: يفيد إبراز الحدث أو الإجراء (azione in svolgimento)، ويُستعمل في الأزمنة البسيطة فقط (viene letto, veniva letto, verrà letto). يُمنع استعماله في الأزمنة المركبة (*è venuto letto خطأ نحوي جسيم!).',
				'صيغة «si passivante»: si + verbo alla 3ª persona singolare o plurale + soggetto paziente (دون ذكر complemento d’agente). يجب مطابقة الفعل للفاعل: «Si studia una lingua» (مفرد) مقابل «Si studiano tre lingue» (جمع).'
			],
			visualSvg: svgItalianConjugationChart({
				title: 'Coniugazione Passiva nei Tempi Principali',
				subtitle: 'Accordo obbligatorio del participio con il soggetto (-o/-a/-i/-e)',
				columns: [
					{
						header: 'Tempi semplici',
						rule: 'essere o venire + part.',
						examples: 'è / viene letta la pagina'
					},
					{
						header: 'Tempi composti',
						rule: 'SOLO essere + stato + part.',
						examples: 'è stata scritta da loro'
					},
					{
						header: 'Si passivante',
						rule: 'si + 3ª sing. o plur.',
						examples: 'Si conservano i manoscritti.'
					}
				],
				width: 580
			}),
			visualCaptionAr:
				'مقارنة صيغ المبني للمجهول في الأزمنة البسيطة والمركبة وصيغة si passivante في البكالوريا.',
			examples: [
				{
					problemAr:
						'Trasforma alla forma passiva: «Gli studenti avevano consultato molti dizionari nella biblioteca.»',
					solutionAr:
						'Molti dizionari erano stati consultati dagli studenti nella biblioteca. (الزمن Trapassato prossimo فيحافظ المساعد «essere» على الزمن نفسه: «erano stati» + اسم المفعول الجمع المذكر «consultati»).'
				},
				{
					problemAr:
						'Trasforma alla forma attiva: «L’opera geografica fu composta da Al-Idrisi nel XII secolo.»',
					solutionAr:
						'Al-Idrisi compose l’opera geografica nel XII secolo. (المساعد «fu» في Passato remoto، فيعود الفعل «comporre» إلى Passato remoto: «compose»).'
				}
			],
			watchOutAr:
				'خطآن شائعان في البكالوريا: (1) نسيان تحويل الزمن فيبقى «è» بدل «fu / sarà / è stato»؛ (2) استعمال «venire» في الزمن المركب مثل «è venuto restaurato» — الصواب دائماً «è stato restaurato»!'
		},
		practice: [
			{
				questionAr:
					'Qual è la trasformazione passiva corretta della frase: «I ricercatori hanno tradotto due manoscritti antichi»?',
				options: [
					'Due manoscritti antichi sono stati tradotti dai ricercatori.',
					'Due manoscritti antichi sono venuti tradotti dai ricercatori.',
					'Due manoscritti antichi sono tradotte dai ricercatori.',
					'Due manoscritti antichi furono tradotte dai ricercatori.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح 100%: الزمن Passato prossimo يصبح «sono stati tradotti» مع تطابق الجمع المذكر.',
					'خطأ: لا يُستعمل «venire» في الأزمنة المركبة أبداً.',
					'خطأ: تغيّر الزمن إلى الحاضر ولم يطابق اسم المفعول المذكر الجمع (manoscritti).',
					'خطأ: تغير الزمن إلى passato remoto واختل التذكير والتأنيث.'
				],
				explanationAr:
					'عند تحويل Passato prossimo إلى المبني للمجهول نستخدم «essere» في Passato prossimo (sono stati) + participio مطابق.'
			},
			{
				questionAr: 'In quale delle seguenti frasi il verbo «venire» è usato correttamente come ausiliare passivo?',
				options: [
					'I monumenti sono venuti protetti ogni anno.',
					'La biblioteca viene aperta alle otto del mattino.',
					'Il testo sarebbe venuto letto ieri.',
					'Le lettere erano venute spedite subito.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: زمن مركب لا يقبل venire.',
					'ممتاز: «viene aperta» زمن بسيط (presente indicativo) يبرز تكرار الفعل أو وقوعه.',
					'خطأ: الزمن المركب condizionale passato يأخذ «essere» (sarebbe stato letto).',
					'خطأ: الزمن المركب trapassato يأخذ «essere» (erano state spedite).'
				],
				explanationAr:
					'لا يصح استعمال «venire» كمساعد للمبني للمجهول إلا في الأزمنة البسيطة غير المركبة.'
			},
			{
				questionAr:
					'Nella frase «Le coste mediterranee furono modellate dalle onde del mare», quale funzione grammaticale svolge «dalle onde del mare»?',
				options: [
					'Complemento d’agente',
					'Complemento di causa efficiente',
					'Complemento oggetto diretto',
					'Soggetto paziente'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: «complemento d’agente» يخص الأشخاص والكائنات الحية.',
					'صحيح: الأمواج قوة طبيعية غير عاقلة، ولذلك تُعد «complemento di causa efficiente».',
					'خطأ: المفعول به المباشر لا يُسبق بحرف الجر «da».',
					'خطأ: الفاعل المريض هو «Le coste mediterranee».'
				],
				explanationAr:
					'الفاعل غير العاقل المسبوق بـ «da» في الجملة المبنية للمجهول يسمى «complemento di causa efficiente».'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 4: Morfologia BAC: Famiglie di Parole, Prefissi, Suffissi, Sinonimi e Contrari
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_lesson_3as_le_t1_morfologia_derivazione_sinonimi',
		slug: 'ita-3as-le-t1-morfologia-derivazione-sinonimi',
		grade: '3as_le',
		yearSubjectId: 795,
		trimesterId: 't1',
		sequenceId: 'unita1',
		sequenceTitleAr:
			'المحور الأول: الأسرة، التربية، التراث المتوسطي والبناء الصرفي والنحوي (Famiglia, Patrimonio & Morfologia)',
		order: 4,
		titleAr:
			'الصرف والاشتقاق BAC: عائلات الكلمات، السوابق واللواحق، المرادفات والأضداد (Morfologia, derivazione e lessico)',
		objectives: [
			'إتقان ملء جدول الاشتقاق الثلاثي في البكالوريا (Verbo | Sostantivo | Aggettivo) بتوظيف اللواحق الإيطالية القياسية بدقة إملائية',
			'تكوين الأضداد الصرفية بالسوابق الإيطالية (in-, im-, il-, ir-, dis-, s-) مع مراعاة قواعد التماثل الصوتي أمام (b/p, l, r)',
			'استخراج المرادفات (sinonimi) والأضداد (contrari / antonimi) من النص مع احترام الفئة النحوية نفسها (اسم باسم، فعل بفعل، صفة بصفة)'
		],
		keywordsAr: [
			'Famiglia di parole (عائلة الكلمات)',
			'Verbo | Sostantivo | Aggettivo',
			'Prefissi negativi (سوابق النفي)',
			'Suffissi nominali (لواحق الأسماء)',
			'Sinonimi (المرادفات)',
			'Contrari (الأضداد)'
		],
		discover: {
			scenarioAr:
				'في قسم الكفاءة اللغوية (Competenza linguistica — 7 punti) بامتحان البكالوريا للغة الإيطالية، يتكرر باستمرار جدول عائلات الكلمات (Verbo | Sostantivo | Aggettivo)، وتمرين استخراج المرادف أو الضد من النص، وتمرين نفي الصفات والأسماء بالسوابق المناسبة. إتقان هذه اللواحق والسوابق يضمن نقاطاً شبه ثابتة في كل دورة!',
			svg: svgItalianWordFormation({
				title: 'Derivazione Lessicale BAC (3AS LE)',
				prefix: 'in- / im- / ir-',
				root: 'respons / educ',
				suffix: '-ità / -zione',
				derivedWord: 'irresponsabilità / educazione',
				meaningNote: 'Verbo (educare) : Sostantivo (educazione) : Aggettivo (educativo)'
			}),
			steps: [
				{
					promptAr:
						'انطلاقاً من الفعل «educare» والفعل «costruire»، أكمل العائلة الثلاثية: Sostantivo و Aggettivo.',
					hintAr: 'تذكر اللاحقة -zione للأسماء و -ivo للصفات.',
					expectedInput: 'educare -> educazione -> educativo | costruire -> costruzione -> costruttivo',
					revealAr:
						'من أشهر اللواحق الإيطالية للاسم: -zione (educazione, formazione, costruzione)، -mento (cambiamento, miglioramento)، -ità/-età (qualità, responsabilità)؛ وللصفة: -ivo (educativo, costruttivo)، -abile/-ibile (responsabile, accessibile).'
				},
				{
					promptAr:
						'كيف تتغير السابقة السلبية «in-» عندما تسبق كلمات تبدأ بـ (p/b) أو (l) أو (r) كما في: possibile, legale, regolare؟',
					hintAr: 'جرّب دمج in + possibile و in + legale و in + regolare.',
					expectedInput: 'impossibile (im- أمام p/b)، illegale (il- أمام l)، irregolare (ir- أمام r)',
					revealAr:
						'قاعدة التماثل الإملائي للسابقة in- في الإيطالية: تصبح im- قبل b/p/m (impossibile, imbattibile)، و il- قبل l (illegale, illogico)، و ir- قبل r (irregolare, irresponsabile).'
				},
				{
					promptAr:
						'لماذا يُعد الجواب «progresso» (اسم) خاطئاً إذا طلب سؤال البكالوريا مرادفاً للفعل «progredire» (فعل)؟',
					hintAr: 'فكّر في قاعدة تطابق الفئة النحوية (categoria grammaticale).',
					expectedInput: 'لأن مرادف الفعل يجب أن يكون فعلاً (مثل avanzare أو migliorare)، ومرادف الاسم اسماً',
					revealAr:
						'في البكالوريا يُشترط تطابق الفئة النحوية (stessa categoria grammaticale) وتطابق العدد والجنس أو الزمن عند الإمكان: verbo = verbo, sostantivo = sostantivo, aggettivo = aggettivo!'
				}
			]
		},
		summary: {
			rulesAr: [
				'لواحق تكوين الأسماء (Sostantivi): -zione / -sione (informare -> informazione, comprendere -> comprensione)، -mento (sviluppare -> sviluppo / insegnare -> insegnamento)، -ità / -età (responsabile -> responsabilità, sincero -> sincerità)، -anza / -enza (perseverare -> perseveranza, conoscere -> conoscenza).',
				'لواحق تكوين الصفات (Aggettivi): -abile / -ibile (rispettare -> rispettabile, accedere -> accessibile)، -ivo (educare -> educativo, collaborare -> collaborativo)، -oso (valore -> valoroso, studio -> studioso)، -ale (cultura -> culturale)، -ante / -ente (costante, prudente).',
				'سوابق الأضداد (Prefissi contrari): in- (ingiusto, incerto)، im- أمام b/p/m (imprudente, immobile)، il- أمام l (illeggibile)، ir- أمام r (irrazionale)، dis- (disordine, disonesto)، s- (scorretto, sfiducia, sleale).',
				'قاعدة المرادفات والأضداد في النص: تحقق أولاً من نوع الكلمة (verbo / sostantivo / aggettivo / avverbio)، ثم افحص دلالتها داخل الجملة في الفقرة المشار إليها، وتجنب اللواحق المخترعة غير الموجودة في القاموس.'
			],
			visualSvg: svgItalianConjugationChart({
				title: 'Guida ai Suffissi e Prefissi (BAC 3AS LE)',
				subtitle: 'Formazione di sostantivi, aggettivi e contrari',
				columns: [
					{
						header: 'Sostantivi',
						rule: '-zione, -mento, -ità, -anza',
						examples: 'formazione, impegno, lealtà'
					},
					{
						header: 'Aggettivi',
						rule: '-ivo, -abile, -ale, -oso',
						examples: 'formativo, amabile, culturale'
					},
					{
						header: 'Prefissi contrari',
						rule: 'in-, im-, il-, ir-, dis-, s-',
						examples: 'imprudente, illegale, scorretto'
					}
				],
				width: 580
			}),
			visualCaptionAr:
				'الدليل المرجعي للواحق الأسماء والصفات وسوابق الأضداد في بكالوريا اللغة الإيطالية.',
			examples: [
				{
					problemAr:
						'Completa la famiglia di parole: Verbo = rispettare | Sostantivo = .......... | Aggettivo = ..........',
					solutionAr:
						'Sostantivo = rispetto | Aggettivo = rispettoso (o rispettabile).'
				},
				{
					problemAr:
						'Forma il contrario con un prefisso adeguato: «prudente», «legale», «regolare», «corretto», «ordinato».',
					solutionAr:
						'imprudente, illegale, irregolare, scorretto, disordinato.'
				}
			],
			watchOutAr:
				'تذكّر أن أسماء النوعية المختومة بـ «-ità» أو «-età» في الإيطالية تحمل شدّة نبرية إلزامية على الحرف الأخير في المفرد وتبقى ثابتة في الجمع: «la qualità / le qualità»، «la responsabilità / le responsabilità»!'
		},
		practice: [
			{
				questionAr:
					'Quale coppia completa correttamente la famiglia lessicale del verbo «comprendere» (Sostantivo e Aggettivo)?',
				options: [
					'comprensione / comprensivo',
					'comprendimento / comprendoso',
					'comprendazione / comprendale',
					'comprensività / comprenduto'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: من الفعل «comprendere» نشتق الاسم «comprensione» والصفة «comprensivo» (أو «comprensibile»).',
					'خطأ: اشتقاق غير صحيح غير موجود في الإيطالية.',
					'خطأ: لاحقة غير صحيحة لهذا الجذر.',
					'خطأ: «comprensività» اسم إضافي وليس تطابقاً قياسياً مع المطلوب.'
				],
				explanationAr:
					'الاسم المشتق القياسي من «comprendere» هو «comprensione» والصفة الشائعة هي «comprensivo» أو «comprensibile».'
			},
			{
				questionAr: 'Qual è il contrario morfologico corretto dell’aggettivo «responsabile»?',
				options: ['inresponsabile', 'imresponsabile', 'irresponsabile', 'disresponsabile'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: أمام الحرف r تتحول السابقة in- إلى ir-.',
					'خطأ: im- تسبق b و p و m فقط.',
					'ممتاز: in + responsabile يصبح «irresponsabile» بتضعيف حرف r.',
					'خطأ: لا تأخذ هذه الصفة السابقة dis-.'
				],
				explanationAr:
					'تتماثل السابقة «in-» مع الحرف «r» فتصبح «ir-» مثل: irresponsabile, irregolare.'
			},
			{
				questionAr:
					'Se la consegna chiede un sinonimo del verbo «promuovere» (يعزز/يشجع), quale parola rispetta sia il senso sia la categoria grammaticale?',
				options: [
					'promozione (sostantivo)',
					'incoraggiare (verbo)',
					'costruttivo (aggettivo)',
					'efficacemente (avverbio)'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: «promozione» اسم لا فعل.',
					'صحيح: «incoraggiare» فعل مصدر مطابق في المعنى والفئة النحوية لـ «promuovere».',
					'خطأ: «costruttivo» صفة.',
					'خطأ: «efficacemente» ظرف.'
				],
				explanationAr:
					'يجب دائماً مطابقة الفئة النحوية بين الكلمة المطلوبة ومرادفها أو ضدها في امتحان البكالوريا.'
			}
		]
	}
];
