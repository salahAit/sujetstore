import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';
import {
	svgGermanConjugationChart,
	svgGermanGrammarMap,
	svgGermanWordFormation
} from '../../svg-german';
import type { GermanInteractiveLessonData } from '../../types';

/**
 * 3AS BAC Foreign Languages (لغات أجنبية — yearSubjectId: 794, coeff 4, 03h00, 7+7+6=20)
 * Interactive Lessons — Trimester 1 : Kultur, Kulturerbe, Landeskunde & Passiv-Konstruktionen (4 lessons)
 */
export const LESSONS_3AS_LE_T1: GermanInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 1: Algerisches Kulturerbe, Baukunst und islamische Wissenschaftstradition
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_lesson_3as_le_t1_kulturerbe_algerien_baukunst',
		slug: 'ger-3as-le-t1-kulturerbe-algerien-baukunst',
		grade: '3as_le',
		yearSubjectId: 794,
		trimesterId: 't1',
		sequenceId: 'einheit1',
		sequenceTitleAr:
			'المحور الأول: التراث المعماري والعلمي، الجغرافيا الاقتصادية والمبني للمجهول (Kultur, Landeskunde & Passiv)',
		order: 1,
		titleAr:
			'التراث الثقافي والمعماري الجزائري والتقاليد العلمية الإسلامية (Algerisches Kulturerbe, Baukunst und islamische Wissenschaftstradition)',
		objectives: [
			'تحليل نصوص التراث والحضارة في بكالوريا اللغة الألمانية حول المعالم الجزائرية العريقة (القصبة، الجامع الكبير بتلمسان، وادي ميزاب، قلعة بني حماد، جسور قسنطينة)',
			'استثمار المعجم الأكاديمي الدقيق للمعمار والعلم والتراث (das Kulturerbe, die Baukunst, die Denkmalpflege, die Handschrift, die Nachhaltigkeit) في الفهم والكتابة',
			'استحضار إسهامات علماء الحضارة الإسلامية المعتمدين (Al-Zahrawi, Al-Idrisi, Al-Khwarizmi, Ibn Al-Haytham, Ibn Khaldoun) بأسلوب ألماني رصين في البكالوريا'
		],
		keywordsAr: [
			'Kulturerbe (التراث الثقافي)',
			'Baukunst (فن العمارة)',
			'Kasbah von Algier (قصبة الجزائر)',
			'M’Zab-Tal (وادي ميزاب)',
			'Denkmalpflege (صيانة المعالم)',
			'Wissenschaftstradition (التقليد العلمي)'
		],
		discover: {
			scenarioAr:
				'تحتل نصوص التراث الثقافي والحضاري (Kultur und Kulturerbe) مكانة بارزة في امتحان البكالوريا لشعبة اللغات الأجنبية؛ حيث تربط بين عبقرية العمارة الجزائرية المتكيفة مع المناخ والبيئة (مثل قصبة الجزائر ووادي ميزاب بغرداية والجامع الكبير بتلمسان) وبين الأمانة العلمية لرواد العلوم الإسلامية في الطب والجغرافيا والرياضيات.',
			svg: renderLessonIllustration('ger_02_algerisches_kulturerbe_architektur', {
				lang: 'de',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'اقرأ الجملة التالية: „Die Architektur des M’Zab-Tals in Ghardaïa verbindet Ästhetik mit praktischem Klimaschutz.“ ما الميزتان اللتان تجمعهما عمارة وادي ميزاب؟',
					hintAr: 'لاحظ الاسمين المرتبطين بالفعل „verbindet ... mit ...“.',
					expectedInput: 'الجمال المعماري (Ästhetik) وحماية المناخ أو التكيف العملي مع البيئة الصحراوية (praktischer Klimaschutz)',
					revealAr:
						'تبرز نصوص البكالوريا أن التراث العمراني الجزائري — من قصور وادي ميزاب إلى أزقة القصبة الظليلة — يقوم على التوازن بين الجمال الهندسي والاستدامة البيئية.'
				},
				{
					promptAr:
						'في نص عن التراث العلمي الإسلامي، وردت عبارة: „Gelehrte wie Al-Zahrawi, Al-Idrisi und Al-Khwarizmi legten durch genaue Beobachtung den Grundstein für moderne Methoden.“ ما الركيزة المنهجية المشتركة لهؤلاء العلماء؟',
					hintAr: 'ابحث عن التركيب الجرّي المبدوء بـ „durch“.',
					expectedInput: 'الملاحظة الدقيقة والتجريب المنهجي (genaue Beobachtung)',
					revealAr:
						'أسّس الزهراوي في الجراحة والأدوات الطبية، والإدريسي في الخرائط الجغرافية، والخوارزمي في الجبر والحساب، وابن الهيثم في البصريات تقليداً علمياً قائماً على الدقة والتوثيق والأمانة.'
				},
				{
					promptAr:
						'عندما يطلب سؤال الفهم في البكالوريا تحديد دور الشباب في صيانة التراث (Denkmalpflege)، كيف تصوغ موقفاً معللاً بالألمانية؟',
					hintAr: 'ابدأ بعبارة رأي رسمية (Meines Erachtens ...) واربط الماضي بالمستقبل.',
					expectedInput: 'Meines Erachtens sollen junge Menschen historische Bauten schützen, da sie unsere kulturelle Identität bewahren.',
					revealAr:
						'الإجابة المثالية تربط بين الوعي التاريخي (historisches Bewusstsein) والمسؤولية العملية مثل احترام المعالم والمشاركة في التوثيق والترميم الواعي.'
				}
			]
		},
		summary: {
			rulesAr: [
				'محاور التراث المعماري الجزائري في البكالوريا: قصبة الجزائر (Die Kasbah von Algier) بتخطيطها الحضري العتيق، الجامع الكبير بتلمسان (Die Große Moschee von Tlemcen) بزخرفته الهندسية، وادي ميزاب بغرداية (Das M’Zab-Tal) كمدينة صحراوية مستدامة، جسور قسنطينة، وقلعة بني حماد.',
				'محاور التراث العلمي الإسلامي: الزهراوي (Al-Zahrawi / Abulcasis) في الطب والجراحة، الإدريسي (Al-Idrisi) في الجغرافيا ورسم الخرائط، الخوارزمي (Al-Khwarizmi) في الرياضيات والخوارزميات، ابن الهيثم (Ibn Al-Haytham) في علم الضوء والمنهج التجريبي، وابن خلدون (Ibn Khaldoun) في العمران والتاريخ.',
				'المعجم المفتاحي للنصوص: das Weltkulturerbe (التراث العالمي)، die Restaurierung (الترميم)، die Überlieferung (النقل والتراث المروي)، der Innenhof (الفناء الداخلي)، die Baukunst (فن البناء)، die Quelle (المصدر التاريخي)، bewahren / erhalten (يحفظ/يصون).',
				'منهجية الإجابة عن سؤال الفهم „Richtig oder Falsch mit Textbeleg“: في البكالوريا لا نكتفي بوضع كلمة Falsch، بل نذكر السطر أو الجملة الدقيقة من النص التي تصحح المعلومة بأسلوب سليم.'
			],
			visualSvg: svgGermanGrammarMap({
				title: 'Kulturerbe und Wissenschaft (BAC 3AS LE)',
				rootLabel: 'Algerisches & islamisches Erbe',
				rootSub: 'Architektur, Wissen und Verantwortung',
				branches: [
					{
						label: 'Baukunst',
						rule: 'Kasbah, Tlemcen, M’Zab',
						example: 'Klima & Form im Einklang'
					},
					{
						label: 'Wissenschaft',
						rule: 'Al-Zahrawi, Al-Khwarizmi',
						example: 'Al-Idrisi & Ibn Al-Haytham'
					},
					{
						label: 'Pflege',
						rule: 'Restaurierung & Schutz',
						example: 'Denkmäler aktiv bewahren'
					},
					{
						label: 'Wortschatz',
						rule: 'Nomen mit Artikel lernen',
						example: 'das Erbe, die Baukunst'
					}
				],
				width: 580
			}),
			visualCaptionAr:
				'خريطة المحاور الثقافية والعلمية لوحدة التراث المعماري والعلمي في بكالوريا اللغات الأجنبية.',
			examples: [
				{
					problemAr:
						'Textfrage: „Warum gilt das M’Zab-Tal in Ghardaïa heute als Vorbild für nachhaltiges Bauen?“',
					solutionAr:
						'Es gilt als Vorbild, weil die traditionellen Lehmbauten und engen Gassen vor Hitze schützen, Wasser sparsam nutzen und den Gemeinschaftssinn fördern.'
				},
				{
					problemAr:
						'Meinungsfrage (4–5 Sätze): „Welche Rolle spielen historische Handschriften und Denkmäler für die heutige Jugend?“',
					solutionAr:
						'Meines Erachtens bilden historische Handschriften und Bauwerke das Gedächtnis einer Gesellschaft. Sie zeigen jungen Menschen, wie frühere Generationen mit Wissen, Fleiß und Kreativität schwierige Probleme gelöst haben. Wer sein Kulturerbe kennt und schützt, geht mit größerem Selbstvertrauen in die Zukunft.'
				}
			],
			watchOutAr:
				'انتبه في نصوص التراث والتاريخ إلى التمييز بين أسماء العلماء المعتمدين في المنهج وتهجئتهم الألمانية الدقيقة: Al-Zahrawi, Al-Idrisi, Al-Khwarizmi, Ibn Al-Haytham, Ibn Khaldoun، ولا تخلط بين „erhalten“ (يصون/يحفظ أو يتلقى) حسب سياق الجملة!'
		},
		practice: [
			{
				questionAr:
					'Welche Eigenschaft zeichnet die traditionelle Baukunst in Städten wie der Kasbah von Algier oder dem M’Zab-Tal laut BAC-Texten besonders aus?',
				options: [
					'Die kluge Anpassung an das lokale Klima sowie die Verbindung von Funktion und Ästhetik',
					'Die ausschließliche Verwendung von ungeschütztem Glas und Stahl ohne Schatten',
					'Die vollständige Trennung von Wohnvierteln und Wasserversorgung',
					'Der Verzicht auf jede Form von handwerklicher Sorgfalt'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: تتميز العمارة الجزائرية الأصيلة بالتكيف المناخي والتناسق بين الوظيفة والجمال.',
					'خطأ: المباني الزجاجية غير المظللة تناقض حكمة العمارة التقليدية في القصبة ووادي ميزاب.',
					'خطأ: نظام توزيع المياه وتكامل الأحياء ركيزة أساسية في وادي ميزاب.',
					'خطأ: الإتقان الحرفي سمة بارزة في الزخرفة والبناء التقليدي.'
				],
				explanationAr:
					'تؤكد نصوص التراث في البكالوريا أن العمارة الجزائرية تجمع بين مراعاة المناخ (ساحلياً في القصبة وصحراوياً في ميزاب) والتماسك الاجتماعي.'
			},
			{
				questionAr:
					'Welcher Gelehrte aus der islamischen Wissenschaftstradition ist vor allem für seine Werke zur Algebra und systematischen Rechenkunst bekannt?',
				options: [
					'Al-Idrisi',
					'Al-Khwarizmi',
					'Ibn Battuta',
					'Moufdi Zakaria'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الإدريسي اشتهر أساساً بالجغرافيا ورسم الخرائط.',
					'صحيح: الخوارزمي رائد علم الجبر ومن اسمه اشتق مصطلح Algorithmus في الألمانية.',
					'خطأ: ابن بطوطة اشتهر بالرحلات والجغرافيا الوصفية.',
					'خطأ: مفدي زكريا شاعر جزائري معاصر.'
				],
				explanationAr:
					'يُذكر الخوارزمي (Al-Khwarizmi) في نصوص الحضارة والعلوم بوصفه مؤسس الجبر ومصدر كلمة Algorithmus.'
			},
			{
				questionAr:
					'Was verlangt eine vollständige „Richtig/Falsch“-Antwort im Textverständnis des algerischen Deutsch-BAC, wenn eine Aussage „Falsch“ ist?',
				options: [
					'Nur das Wort „Falsch“ ohne weiteren Satz aufschreiben',
					'Die Frage wörtlich ins Arabische übersetzen',
					'Einen genauen Textbeleg oder eine korrigierende Begründung aus dem Text anführen',
					'Eine völlig neue Geschichte außerhalb des Textes erfinden'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: غياب التعليل النصي يُفقد التلميذ جزءاً من العلامة.',
					'خطأ: التصحيح في البكالوريا يُكتب بالألمانية انطلاقاً من النص.',
					'صحيح: يجب إرفاق كل حكم „Falsch“ بالتبرير أو التصحيح الدقيق من النص.',
					'خطأ: يجب التقيد الصارم بمعلومات النص المرجعي.'
				],
				explanationAr:
					'تقتضي منهجية BAC 3AS LE تدعيم عبارة Falsch بدليل نصي واضح (Textbeleg / Begründung).'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 2: D-A-CH-Länder, Wirtschaft und Bildungsaustausch mit Algerien
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_lesson_3as_le_t1_deutschland_algerien_wirtschaft',
		slug: 'ger-3as-le-t1-deutschland-algerien-wirtschaft',
		grade: '3as_le',
		yearSubjectId: 794,
		trimesterId: 't1',
		sequenceId: 'einheit1',
		sequenceTitleAr:
			'المحور الأول: التراث المعماري والعلمي، الجغرافيا الاقتصادية والمبني للمجهول (Kultur, Landeskunde & Passiv)',
		order: 2,
		titleAr:
			'البلدان الناطقة بالألمانية (D-A-CH) والتبادل الاقتصادي والعلمي مع الجزائر (D-A-CH-Länder, Wirtschaft und Bildungsaustausch)',
		objectives: [
			'التعرف على الجغرافيا السياسية والاقتصادية لبلدان D-A-CH (ألمانيا، النمسا، سويسرا) في نصوص الحضارة والبلدان (Landeskunde)',
			'فهم مقومات الاقتصاد الألماني والتكوين المزدوج (duale Ausbildung) والشراكة الجزائرية-الألمانية في الصناعة والطاقات النظيفة والتعليم العالي',
			'توظيف معجم التبادل الأكاديمي والاقتصادي (der Mittelstand, die Berufsausbildung, das Stipendium, die Partnerschaft, der Technologietransfer) بدقة'
		],
		keywordsAr: [
			'D-A-CH-Länder (ألمانيا، النمسا، سويسرا)',
			'Wirtschaftspartnerschaft (الشراكة الاقتصادية)',
			'Duale Ausbildung (التكوين المزدوج)',
			'Bildungsaustausch (التبادل التربوي)',
			'Mittelstand (المؤسسات المتوسطة)',
			'Stipendium (المنحة الدراسية)'
		],
		discover: {
			scenarioAr:
				'يتناول محور معرفة البلدان الناطقة بالألمانية (Landeskunde) ثلاث دول رئيسية في قلب أوروبا هي ألمانيا والنمسا وسويسرا (D-A-CH)، كما يركز في المنهج الجزائري على جسور التعاون الاقتصادي والهندسي والعلمي بين هذه البلدان والجزائر، لاسيما في التكوين المهني، الهندسة، الطاقات المتجددة وتبادل المنح الجامعية.',
			svg: renderLessonIllustration('ger_01_deutschsprachige_laender_stummkarte', {
				lang: 'de',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'ماذا تعني الأحرف الثلاثة „D-A-CH“ في الجغرافيا اللغوية لأوروبا الوسطى؟',
					hintAr: 'تأمل لوحات التسجيل الدولية للبلدان الثلاثة الناطقة بالألمانية.',
					expectedInput: 'D لألمانيا (Deutschland)، و A للنمسا (Österreich/Austria)، و CH لسويسرا (Schweiz/Confoederatio Helvetica)',
					revealAr:
						'يرمز اختصار D-A-CH إلى الدول الثلاث الكبرى الناطقة بالألمانية: ألمانيا (عاصمتها برلين)، النمسا (عاصمتها فيينا)، وسويسرا (برن مدينة اتحادية مع 4 لغات وطنية).'
				},
				{
					promptAr:
						'اقرأ العبارة: „Das duale Ausbildungssystem verbindet theoretischen Unterricht in der Berufsschule mit praktischer Arbeit im Betrieb.“ كيف يعمل التكوين المهني المزدوج؟',
					hintAr: 'انتبه إلى كلمتي „theoretisch“ و„praktisch“ والمكانين المذكورين.',
					expectedInput: 'يجمع بين الدروس النظرية في المدرسة المهنية والتطبيق العملي داخل المؤسسة أو المصنع',
					revealAr:
						'يُعد نظام duale Ausbildung من أشهر ركائز الاقتصاد الألماني والنمساوي والسويسري؛ لأنه يخرّج تقنيين مؤهلين ميدانياً ويقلص بطالة الشباب.'
				},
				{
					promptAr:
						'كيف تستفيد الجزائر وألمانيا من التعاون في مجال التعليم والبحث العلمي؟',
					hintAr: 'فكر في المنح الدراسية، تعليم اللغات، والطاقات المتجددة ونقل التكنولوجيا.',
					expectedInput: 'عبر تبادل الطلاب والباحثين (Bildungsaustausch) والشراكات الهندسية في الطاقة الشمسية والصناعة',
					revealAr:
						'يقوم التعاون على الندّية والمنفعة المتبادلة: شراكة جامعية (Hochschulkooperation)، برامج منح (Stipendien)، ومشاريع تقنية وتكوينية مشتركة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'خريطة D-A-CH الأساسية: ألمانيا (Deutschland — 16 Bundesländer, Hauptstadt: Berlin)، النمسا (Österreich — Alpenrepublik, Hauptstadt: Wien)، سويسرا (die Schweiz — Bundesstaat mit vier Landessprachen: Deutsch, Französisch, Italienisch, Rätoromanisch).',
				'ركائز الاقتصاد في بلدان D-A-CH: المؤسسات الصغيرة والمتوسطة المبتكرة (der Mittelstand)، الصناعة الهندسية الدقيقة (Maschinenbau, Präzisionstechnik)، البحث والتطوير (Forschung und Entwicklung)، والتكوين المهني المزدوج (duale Berufsausbildung).',
				'محور الشراكة الجزائرية-الألمانية في النصوص: التبادل التجاري، التعاون الطاقوي والمائي، الشراكات الجامعية لتكوين المهندسين والمترجمين، وأهمية إتقان اللغة الألمانية كلغة علم وتقنية (Wissenschaftssprache).',
				'تنبيه منهجي لقراءة نصوص Landeskunde: انتبه إلى الأرقام والنسب المئوية (Prozentzahlen) والمقارنات بين الماضي والحاضر (früher / heute, steigend / sinkend) لأنها كثيراً ما تُمتحن في أسئلة الصواب والخطأ.'
			],
			visualSvg: svgGermanGrammarMap({
				title: 'D-A-CH und Partnerschaft mit Algerien',
				rootLabel: 'Deutschsprachiger Raum (D-A-CH)',
				rootSub: 'Geographie, Wirtschaft & Kooperation',
				branches: [
					{
						label: 'Deutschland (D)',
						rule: '16 Länder, Hauptstadt Berlin',
						example: 'Mittelstand & Ausbildung'
					},
					{
						label: 'Österreich (A)',
						rule: 'Alpenrepublik, Wien',
						example: 'Wasserkraft & Technik'
					},
					{
						label: 'Schweiz (CH)',
						rule: '4 Sprachen, Präzision',
						example: 'Forschung & Qualität'
					},
					{
						label: 'Algerien-Brücke',
						rule: 'Bildung & Solarenergie',
						example: 'Stipendien & Transfer'
					}
				],
				width: 580
			}),
			visualCaptionAr:
				'المقومات الجغرافية والاقتصادية لبلدان D-A-CH ومجالات الشراكة العلمية والاقتصادية مع الجزائر.',
			examples: [
				{
					problemAr:
						'Textfrage: „Welche Vorteile bietet das duale System für junge Berufseinsteiger?“',
					solutionAr:
						'Junge Menschen verbinden Theorie und Praxis direkt im Unternehmen, sammeln Berufserfahrung und haben danach sehr gute Chancen auf einen festen Arbeitsplatz.'
				},
				{
					problemAr:
						'Textfrage: „Warum gewinnt der akademische Austausch zwischen algerischen und deutschen Universitäten an Bedeutung?“',
					solutionAr:
						'Er fördert den gemeinsamen Wissensaustausch in Bereichen wie Ingenieurwesen, erneuerbare Energien und Fachübersetzung und stärkt das gegenseitige Verständnis.'
				}
			],
			watchOutAr:
				'في اللغة الألمانية، أسماء معظم البلدان محايدة بدون أداة (Deutschland, Österreich, Algerien)، لكن سويسرا مؤنثة تأخذ الأداة دائماً: „die Schweiz“ (في المجرور: „in der Schweiz“، وفي الاتجاه: „in die Schweiz“)!'
		},
		practice: [
			{
				questionAr:
					'Welche drei Länder bilden zusammen den sogenannten D-A-CH-Raum in Mitteleuropa?',
				options: [
					'Deutschland, Österreich und die Schweiz',
					'Deutschland, Dänemark und Belgien',
					'Algerien, Österreich und die Niederlande',
					'Spanien, die Schweiz und Schweden'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: D لألمانيا، A للنمسا، و CH لسويسرا.',
					'خطأ: الدنمارك وبلجيكا ليستا ضمن اختصار D-A-CH.',
					'خطأ: الجزائر شريك متوسطي لكنها ليست الحرف A في D-A-CH.',
					'خطأ: إسبانيا والسويد ليستا ضمن البلدان الناطقة بالألمانية.'
				],
				explanationAr:
					'يرمز اختصار D-A-CH إلى الدول الثلاث الرئيسية الناطقة بالألمانية: ألمانيا (D) والنمسا (A) وسويسرا (CH).'
			},
			{
				questionAr:
					'Welche präpositionale Verbindung ist im Deutschen grammatikalisch richtig, wenn man über ein Studium in der Schweiz spricht?',
				options: [
					'Ich studiere in Schweiz.',
					'Ich studiere in der Schweiz.',
					'Ich studiere nach die Schweiz.',
					'Ich studiere im Schweiz.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: كلمة Schweiz لا تُستعمل بلا أداة.',
					'ممتاز: die Schweiz مؤنثة فتأخذ في السكون (Wo?) حرف الجر in + Dativ: „in der Schweiz“.',
					'خطأ: للاتجاه نستخدم in die Schweiz وليس nach.',
					'خطأ: im = in dem تُستعمل للمذكر أو المحايد لا للمؤنث.'
				],
				explanationAr:
					'اسم الدولة „die Schweiz“ مؤنث يرافقه التعريف دائماً: „in der Schweiz“ (مكان) و„in die Schweiz“ (اتجاه).'
			},
			{
				questionAr:
					'Worin liegt das Hauptmerkmal der „dualen Berufsausbildung“ im deutschsprachigen Raum?',
				options: [
					'Sie findet ausschließlich online ohne praktische Übung statt.',
					'Sie verzichtet auf jede Prüfung oder Fachkompetenz.',
					'Sie kombiniert Theorie in der Berufsschule mit praktischer Ausbildung im Betrieb.',
					'Sie dauert nur zwei Tage vor dem Abitur.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: التطبيق الميداني عنصر أساسي في التكوين المزدوج.',
					'خطأ: التكوين المزدوج يخضع لامتحانات مهنية دقيقة.',
					'صحيح: الجمع بين المدرسة المهنية والمؤسسة الإنتاجية هو جوهر النظام المزدوج.',
					'خطأ: تمتد عادة من سنتين إلى ثلاث سنوات.'
				],
				explanationAr:
					'يجمع التكوين المزدوج (duale Ausbildung) بين التعليم النظري في المدرسة والخبرة العملية في المؤسسة.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 3: Vorgangspassiv & Zustandspassiv, Modalverben und Agens (von / durch)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_lesson_3as_le_t1_vorgangspassiv_zustandspassiv',
		slug: 'ger-3as-le-t1-vorgangspassiv-zustandspassiv',
		grade: '3as_le',
		yearSubjectId: 794,
		trimesterId: 't1',
		sequenceId: 'einheit1',
		sequenceTitleAr:
			'المحور الأول: التراث المعماري والعلمي، الجغرافيا الاقتصادية والمبني للمجهول (Kultur, Landeskunde & Passiv)',
		order: 3,
		titleAr:
			'المبني للمجهول للحدث والحالة (Vorgangspassiv & Zustandspassiv) مع الأفعال الناقصة وحروف الجر von/durch',
		objectives: [
			'التمييز الدقيق بين المبني للمجهول للحدث (Vorgangspassiv: werden + Partizip II) والمبني للمجهول للحالة (Zustandspassiv: sein + Partizip II)',
			'إتقان تصريف المبني للمجهول في الحاضر (Präsens) والماضي البسيط (Präteritum) والماضي المركب (Perfekt: ist ... worden) ومع الأفعال الناقصة (Modalverben)',
			'تحويل الجمل من المعلوم إلى المجهول والعكس في البكالوريا مع ضبط الفاعل الجديد (Akkusativobjekt -> Nominativ)، وبقاء المفعول لأجله (Dativ)، واستعمال von / durch'
		],
		keywordsAr: [
			'Vorgangspassiv (مجهول الحدث)',
			'Zustandspassiv (مجهول الحالة)',
			'Partizip II (اسم المفعول)',
			'Perfekt Passiv (ist ... worden)',
			'Modalverb + Passiv',
			'Agens: von / durch'
		],
		discover: {
			scenarioAr:
				'تُعدّ تراكيب المبني للمجهول (Passiv-Konstruktionen) عماد قسم القواعد في الفصل الأول لبكالوريا اللغات الأجنبية، لأنها كثيرًا ما تُوظَّف في نصوص التراث والاقتصاد والعلوم؛ حيث يكون التركيز على العمل المنجَز أو الأثر القائم بدل التركيز على الفاعل!',
			svg: svgGermanGrammarMap({
				title: 'Vorgangspassiv vs. Zustandspassiv',
				rootLabel: 'Passiv-System im Deutschen',
				rootSub: 'Handlung (werden) oder Ergebnis (sein)?',
				branches: [
					{
						label: 'Präsens Passiv',
						rule: 'werden + Partizip II',
						example: 'Die Moschee wird restauriert.'
					},
					{
						label: 'Präteritum Passiv',
						rule: 'wurde + Partizip II',
						example: 'Die Brücke wurde gebaut.'
					},
					{
						label: 'Perfekt Passiv',
						rule: 'ist + Partizip II + worden',
						example: 'Der Text ist übersetzt worden.'
					},
					{
						label: 'Zustandspassiv',
						rule: 'sein + Partizip II',
						example: 'Das Museum ist geöffnet.'
					}
				],
				width: 580
			}),
			steps: [
				{
					promptAr:
						'قارن بين الجملتين: (1) „Die Kasbah wird restauriert.“ و (2) „Die Kasbah ist restauriert.“ ما الفرق الدلالي بين الفعل المساعد „wird“ و„ist“؟',
					hintAr: 'الجملة الأولى تصف عملية الترميم الجارية الآن، والثانية تصف النتيجة النهائية بعد الانتهاء.',
					expectedInput: 'wird + Partizip II (Vorgangspassiv) تصف الحدث الجاري، و ist + Partizip II (Zustandspassiv) تصف الحالة الناتجة بعد اكتمال الحدث',
					revealAr:
						'Vorgangspassiv (werden + Partizip II) يركز على سيرورة الفعل (الحدث)، أما Zustandspassiv (sein + Partizip II) فيعبر عن الحالة الثابتة الناتجة عن الفعل.'
				},
				{
					promptAr:
						'لماذا نكتب في Perfekt Passiv: „Das Gesetz ist verabschiedet worden“ وليس „geworden“؟',
					hintAr: 'انتبه لقاعدة اسم المفعول من الفعل المساعد „werden“ داخل المبني للمجهول.',
					expectedInput: 'لأن الفعل المساعد werden في زمن Perfekt Passiv يفقد سابقة ge- فيصبح „worden“',
					revealAr:
						'في زمن Perfekt Passiv نستعمل دائماً: sein (ist/sind) + Partizip II + worden (بدون ge-)؛ بينما „geworden“ تُستعمل فقط عندما يكون werden فعلاً تاماً بمعنى «أصبح».'
				},
				{
					promptAr:
						'حوّل إلى المبني للمجهول مع الانتباه لحرف الجر المناسب للفاعل: „Die Ingenieure planen eine neue Solarstation.“ مقابل „Ein schweres Erdbeben zerstörte das alte Gebäude.“',
					hintAr: 'الأولى فاعلها أشخاص (عاقل) والثانية سبب طبيعي أو وسيلة (غير عاقل).',
					expectedInput: 'Eine neue Solarstation wird von den Ingenieuren geplant. / Das alte Gebäude wurde durch ein schweres Erdbeben zerstört.',
					revealAr:
						'نستعمل „von“ + Dativ مع الأشخاص والمؤسسات الفاعلة (Urheber/Person)، ونستعمل „durch“ + Akkusativ مع الوسائل والأسباب والظواهر (Mittel/Ursache).'
				}
			]
		},
		summary: {
			rulesAr: [
				'تصريف Vorgangspassiv: الحاضر (wird/werden + Partizip II)، الماضي البسيط (wurde/wurden + Partizip II)، الماضي المركب (ist/sind + Partizip II + worden)، الماضي التام (war/waren + Partizip II + worden)، المستقبل (wird/werden + Partizip II + werden).',
				'المبني للمجهول مع الأفعال الناقصة (Passiv mit Modalverben): في الحاضر (Modalverb مُصرّف + Partizip II + werden)، مثل: „Das Kulturerbe muss geschützt werden.“؛ وفي الماضي البسيط (musste/konnte/sollte + Partizip II + werden).',
				'التحويل من المعلوم إلى المجهول: المفعول به المنصوب (Akkusativ) يصبح فاعلاً مرفوعاً (Nominativ)؛ الفاعل الأصلي يُحذف (مع man) أو يُسبق بـ „von + Dativ“ (أشخاص/مؤسسات) أو „durch + Akkusativ“ (سبب/وسيلة)؛ أما المفعول غير المباشر (Dativ) فيبقى مجروراً كما هو: „Man hilft dem Schüler“ -> „Dem Schüler wird geholfen“ (الفعل مفرد غائب دائماً!).',
				'Zustandspassiv (sein + Partizip II): في الحاضر (ist/sind + Partizip II) وفي الماضي (war/waren + Partizip II)، ويعبّر عن الحالة المكتملة ولا يقبل عادة الأفعال الناقصة بـ werden.'
			],
			visualSvg: svgGermanConjugationChart({
				title: 'Passiv mit Modalverben und Agens',
				subtitle: 'Strukturregeln für Umformungen im BAC',
				columns: [
					{
						header: 'Modalverb Präsens',
						rule: 'muss/kann + P.II + werden',
						examples: 'Texte müssen geprüft werden.'
					},
					{
						header: 'Modalverb Präteritum',
						rule: 'musste/konnte + P.II + werden',
						examples: 'Der Bau musste saniert werden.'
					},
					{
						header: 'Agens: von vs. durch',
						rule: 'von+Dat(Person) / durch+Akk',
						examples: 'von Forschern / durch Regen'
					}
				],
				width: 560
			}),
			visualCaptionAr:
				'جدول تركيب المبني للمجهول مع الأفعال الناقصة والتمييز بين von و durch في البكالوريا.',
			examples: [
				{
					problemAr:
						'Aktiv-Passiv-Umformung (Präteritum + Modalverb): „Man konnte die historischen Manuskripte rechtzeitig retten.“',
					solutionAr:
						'Die historischen Manuskripte konnten rechtzeitig gerettet werden. („man“ entfällt im Passiv; Plural „Manuskripte“ erfordert „konnten“).'
				},
				{
					problemAr:
						'Passiv mit Dativobjekt: „Die Gemeinde dankt den ehrenamtlichen Helfern.“',
					solutionAr:
						'Den ehrenamtlichen Helfern wird von der Gemeinde gedankt. (Das Dativobjekt bleibt im Dativ, das Verb steht in der 3. Person Singular „wird“).'
				}
			],
			watchOutAr:
				'أخطاء البكالوريا الشائعة التي يجب تجنبها: (1) لا تترجم كلمة „man“ إلى „von man“ في المجهول، بل احذفها تماماً! (2) في Perfekt Passiv اكتب „worden“ لا „geworden“! (3) انتبه للأفعال المتعدية بالجر أو Dativ (helfen, danken, folgen) فهي لا تتحول إلى Nominativ!'
		},
		practice: [
			{
				questionAr:
					'Welche Form vervollständigt den Satz im Perfekt Passiv korrekt: „Die alte Bibliothek in Constantine .......... im letzten Jahr gründlich renoviert ...........“?',
				options: [
					'ist ... worden',
					'hat ... geworden',
					'wird ... geworden',
					'ist ... werden'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: Perfekt Passiv يتشكل من sein (ist) + Partizip II + worden.',
					'خطأ: لا نستخدم haben مع Passiv ولا نضع ge- أمام worden.',
					'خطأ: هذا مزج خاطئ بين الحاضر وgeworden.',
					'خطأ: في Perfekt نحتاج إلى worden وليس المصدر werden.'
				],
				explanationAr:
					'صيغة Perfekt Passiv القياسية هي: „sein + Partizip II + worden“.'
			},
			{
				questionAr:
					'Welche Passiv-Umformung von „Man muss die Umweltgesetze streng beachten“ ist grammatikalisch richtig?',
				options: [
					'Die Umweltgesetze müssen von man streng beachtet werden.',
					'Die Umweltgesetze muss streng beachtet werden.',
					'Die Umweltgesetze müssen streng beachtet werden.',
					'Die Umweltgesetze werden streng beachten gemusst.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: الضمير النكرة „man“ يُحذف في المجهول ولا يُسبق أبداً بـ von.',
					'خطأ: الفاعل الجديد „Die Umweltgesetze“ جمع فيتطلب „müssen“ لا „muss“.',
					'ممتاز: جمع الفاعل يوافق „müssen“ + Partizip II (beachtet) + werden في آخر الجملة.',
					'خطأ: تركيب غير ألماني.'
				],
				explanationAr:
					'عند وجود الفعل الناقص في المجهول، يتطابق الفعل الناقص مع الفاعل الجديد (الجمع هنا) ويأتي Partizip II + werden في النهاية، مع حذف man.'
			},
			{
				questionAr:
					'Welcher Satz beschreibt einen Zustand nach Abschluss der Handlung (Zustandspassiv)?',
				options: [
					'Das Stadttor wird gerade von Fachleuten gereinigt.',
					'Das Stadttor ist bereits gereinigt und für Besucher geöffnet.',
					'Das Stadttor wurde gestern von Handwerkern geprüft.',
					'Das Stadttor muss täglich kontrolliert werden.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: „wird ... gereinigt“ يعبر عن حدث جارٍ الآن (Vorgangspassiv).',
					'صحيح: „ist gereinigt / ist geöffnet“ (sein + Partizip II) يصف الحالة الناتجة المكتملة.',
					'خطأ: „wurde ... geprüft“ ماضٍ لحدث (Vorgangspassiv Präteritum).',
					'خطأ: يعبر عن ضرورة إنجاز فعل (Modalverb + Vorgangspassiv).'
				],
				explanationAr:
					'يتكوّن Zustandspassiv من الفعل المساعد sein + Partizip II ويعبر عن النتيجة أو الحالة القائمة.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 4: Wortbildung, Nominalisierung, Komposita & Synonyme/Antonyme im BAC
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_lesson_3as_le_t1_wortbildung_nominalisierung',
		slug: 'ger-3as-le-t1-wortbildung-nominalisierung',
		grade: '3as_le',
		yearSubjectId: 794,
		trimesterId: 't1',
		sequenceId: 'einheit1',
		sequenceTitleAr:
			'المحور الأول: التراث المعماري والعلمي، الجغرافيا الاقتصادية والمبني للمجهول (Kultur, Landeskunde & Passiv)',
		order: 4,
		titleAr:
			'بناء الكلمات، التحويل الاسمي، المركّبات، المرادفات والأضداد في البكالوريا (Wortbildung, Nominalisierung, Komposita & Synonyme/Antonyme)',
		objectives: [
			'إتقان ملء جدول عائلة الكلمات في البكالوريا (Verb | Nomen mit Artikel | Adjektiv) وفق اللواحق القياسية في الألمانية',
			'فهم قواعد الأسماء المركبة (Komposita: Bestimmungswort + Grundwort) وعناصر الربط (Fugenelemente) وتحديد أداة التعريف حسب الجزء الأخير',
			'استخراج المرادفات (Synonyme) وتكوين الأضداد (Antonyme / Gegenteile) عبر السوابق واللواحق مع الحفاظ على نفس القسم الكلامي (Wortart)'
		],
		keywordsAr: [
			'Wortbildung (بناء الكلمات)',
			'Nominalisierung (التحويل للاسم)',
			'Komposita (الأسماء المركبة)',
			'Wortfamilie (عائلة الكلمات)',
			'Synonyme (المرادفات)',
			'Antonyme (الأضداد)'
		],
		discover: {
			scenarioAr:
				'في القسم الثاني من امتحان البكالوريا (Sprachfähigkeit — 7 نقاط)، تتكرر دائماً تمارين بناء الكلمات: إكمال جدول (Verb | Nomen | Adjektiv)، تفكيك أو تركيب الأسماء المركبة (Komposita)، تحويل الجمل بالاسمية (Nominalisierung)، وتحديد المرادفات والأضداد.',
			svg: svgGermanWordFormation({
				title: 'Wortbildung und Ableitung (BAC 3AS LE)',
				prefix: 'ver- / un-',
				root: 'antwort / bild',
				suffix: '-ung / -lich',
				derivedWord: 'die Verantwortung / unverantwortlich',
				meaningNote: 'Verb (verantworten) : Nomen (die Verantwortung) : Adjektiv (verantwortlich)'
			}),
			steps: [
				{
					promptAr:
						'ما أداة التعريف الصحيحة للاسمين المركبين: „die Solaranlage“ و„das Kulturerbe“؟ وكيف نحددها دون خطأ؟',
					hintAr: 'انظر دائماً إلى الكلمة الأخيرة (Grundwort): die Anlage, das Erbe.',
					expectedInput: 'الجزء الأخير (Grundwort) يحدد أداة التعريف والجمع: die Anlage -> die Solaranlage، و das Erbe -> das Kulturerbe',
					revealAr:
						'القاعدة الذهبية للأسماء المركبة (Komposita): Grundwort (الكلمة الأخيرة) هو الذي يحدد جنس الاسم وأداته وصيغة جمعه، بينما يخصص Bestimmungswort (الكلمة الأولى) المعنى.'
				},
				{
					promptAr:
						'أكمل عائلة الكلمة انطلاقاً من الفعل „schützen“ و„bilden“: ما الاسم مع أداته وما الصفة؟',
					hintAr: 'تذكر الأسماء المجردة المنتهية بـ -ung (مؤنثة دائماً: die ...) والصفات بـ -end / -bar / -schützend.',
					expectedInput: 'schützen -> der Schutz / schützend (oder geschützt)؛ bilden -> die Bildung / gebildet (oder bildend)',
					revealAr:
						'كل اسم ينتهي باللواحق (-ung, -heit, -keit, -schaft, -tion, -tät) هو اسم مؤنث أداته „die“ دائماً، وكل اسم مصدر (das Lesen, das Forschen) أداته „das“.'
				},
				{
					promptAr:
						'لماذا يُعد الجواب „die Erhaltung“ خطأً إذا طلب الامتحان مرادفاً للفعل „bewahren“؟',
					hintAr: 'تأكد من القاعدة الذهبية للمرادفات والأضداد في البكالوريا (gleiche Wortart).',
					expectedInput: 'لأن „bewahren“ فعل والمرادف يجب أن يكون فعلاً في الصيغة نفسها مثل „erhalten“ أو „schützen“ وليس اسماً',
					revealAr:
						'في أسئلة Synonyme / Antonyme يجب التطابق التام في النوع النحوي: Verb = Verb، Nomen = Nomen، Adjektiv = Adjektiv!'
				}
			]
		},
		summary: {
			rulesAr: [
				'لواحق الأسماء وأدواتها الثابتة: -ung, -heit, -keit, -schaft, -tion, -tät, -ik تأخذ دائماً „die“ (مثل: die Bildung, die Gesundheit, die Freundlichkeit, die Wissenschaft, die Tradition)؛ أما الاسم المصدري (substantivierter Infinitiv) فيأخذ „das“ (مثل: das Lernen, das Kulturerbe).',
				'تحويل الجمل (Nominalisierung & Verbalisierung): مثل تحويل حرف الجر + اسم إلى جملة فعلية أو العكس: „zum Schutz der Umwelt“ <-> „um die Umwelt zu schützen“؛ „trotz des Regens“ <-> „obwohl es regnet“؛ „wegen des Fleißes“ <-> „weil er fleißig ist“.',
				'الأسماء المركبة (Komposita): تتكون من اسم+اسم (die Umweltschutzmaßnahme)، فعل+اسم (das Lernziel)، أو صفة+اسم (die Altstadt). قد يظهر رابط صوتي (Fugenelement) مثل -s- بعد -ung/-heit/-schaft (die Bildungsreform, der Arbeitsplatz) أو -n-/-en-.',
				'تكوين الأضداد (Antonyme): بالسوابق un- (unabhängig, unmöglich)، miss- (der Missbrauch, missverstehen)، des-/dis- (desinteressiert)، in-/il-/ir- (intolerant, illegal)، أو بعكس اللاحقة: -voll مقابل -los (verantwortungsvoll <-> verantwortungslos، sinnvoll <-> sinnlos).'
			],
			visualSvg: svgGermanConjugationChart({
				title: 'Suffixe, Artikel und Gegenteile (BAC)',
				subtitle: 'Sichere Wortbildung für Sprachfähigkeit',
				columns: [
					{
						header: 'Nomen (immer die)',
						rule: '-ung,-heit,-keit,-schaft,-tion',
						examples: 'Bildung, Freiheit, Wirtschaft'
					},
					{
						header: 'Adjektive',
						rule: '-lich,-ig,-bar,-voll,-los',
						examples: 'nützlich, nachhaltig, wertvoll'
					},
					{
						header: 'Antonym-Muster',
						rule: 'un-, miss-, -voll / -los',
						examples: 'unabhängig, sinnlos, Misserfolg'
					}
				],
				width: 560
			}),
			visualCaptionAr:
				'مرجع اللواحق والسوابق الثابتة لبناء الأسماء والصفات والأضداد في بكالوريا الألمانية.',
			examples: [
				{
					problemAr:
						'Wortfamilie ergänzen: Verb = „forschen“ | Nomen = .......... | Adjektiv = ..........',
					solutionAr:
						'Nomen = die Forschung (oder der Forscher) | Adjektiv = forschend (oder wissenschaftlich / erforschbar).'
				},
				{
					problemAr:
						'Nominalisierung: „Man renoviert die historischen Gebäude, um das kulturelle Erbe zu bewahren.“ (Ersetzen Sie den „um...zu“-Satz durch „zur + Nomen“!)',
					solutionAr:
						'Man renoviert die historischen Gebäude zur Bewahrung des kulturellen Erbes. (Die Präposition „zu“ verlangt Dativ -> „zu + der = zur“, danach folgt Genitiv).'
				}
			],
			watchOutAr:
				'لا تنسَ أبداً كتابة الأسماء الألمانية بحرف كبير (Großschreibung) في جدول عائلة الكلمات وفي التحويل الاسمي، مع كتابة أداة التعريف (der / die / das) أمام كل اسم لتضمن العلامة الكاملة!'
		},
		practice: [
			{
				questionAr:
					'Welcher Artikel gehört zu dem zusammengesetzten Nomen „...Klimaschutzprojekt“ (das Projekt / das Klima / der Schutz)?',
				options: [
					'der Klimaschutzprojekt',
					'die Klimaschutzprojekt',
					'das Klimaschutzprojekt',
					'den Klimaschutzprojekt'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: „der“ أداة الجزء الأوسط „Schutz“ وليس الكلمة الأخيرة.',
					'خطأ: الكلمة الأخيرة ليست مؤنثة.',
					'صحيح: الكلمة الأخيرة (Grundwort) هي „das Projekt“، لذا يأخذ المركب بأكمله „das“.',
					'خطأ: „den“ حالة نصب وليست أداة تعريف في المرفوع.'
				],
				explanationAr:
					'في الأسماء المركبة بالألمانية يحدد العنصر الأخير (das Grundwort: das Projekt) الجنس النحوي وأداة التعريف.'
			},
			{
				questionAr:
					'Wie lautet das passende Antonym zu „verantwortungsvoll“ (مسؤول) durch Suffixwechsel?',
				options: [
					'verantwortungslos',
					'verantwortungshaft',
					'unverantwortungsvoll',
					'missverantwortlich'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: اللاحقة „-los“ تقابل „-voll“ لتشكيل الضد الدقيق „verantwortungslos“ (عديم المسؤولية).',
					'خطأ: اللاحقة „-haft“ لا تشكل ضدًا.',
					'خطأ: مع الصفات المنتهية بـ -voll نستخدم عادة -los أو unverantwortlich.',
					'خطأ: تركيب غير موجود في الألمانية.'
				],
				explanationAr:
					'الزوج الصرفي (-voll مقابل -los) ينتج أضداداً قياسية مثل: wertvoll/wertlos، sinnvoll/sinnlos، verantwortungsvoll/verantwortungslos.'
			},
			{
				questionAr:
					'Welche Wortreihe gehört vollständig zur selben Wortfamilie wie das Verb „entwickeln“?',
				options: [
					'die Entwicklung / entwickelt (oder entwicklungsfähig)',
					'die Entwicklerung / entwickellich',
					'das Entwickel / entwickelhaft',
					'der Entwickeln / entwicklung'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: الاسم المؤنث هو „die Entwicklung“ والصفة „entwickelt / entwicklungsfähig“.',
					'خطأ: لواحق غير صحيحة في الألمانية.',
					'خطأ: صيغ غير صحيحة إملائياً وصرفياً.',
					'خطأ: الأداة وحرف البداية غير صحيحين للاسم.'
				],
				explanationAr:
					'من الفعل entwickeln نشتق الاسم المؤنث بـ -ung مع حرف كبير (die Entwicklung) والصفة المشتقة (entwickelt / entwicklungsfähig).'
			}
		]
	}
];
