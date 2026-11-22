import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';
import {
	svgGermanConjugationChart,
	svgGermanGrammarMap,
	svgGermanTenseTimeline,
	svgGermanWritingBlueprint
} from '../../svg-german';
import type { GermanInteractiveLessonData } from '../../types';

/**
 * 3AS BAC Foreign Languages (لغات أجنبية — yearSubjectId: 794, coeff 4, 03h00, 7+7+6=20)
 * Interactive Lessons — Trimester 3 : Arbeitswelt, Jugend, Konjunktiv II & BAC-Aufsatztraining (4 lessons)
 */
export const LESSONS_3AS_LE_T3: GermanInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 1: Arbeitswelt, Berufsausbildung, Unternehmertum & Solidarität
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_lesson_3as_le_t3_arbeitswelt_unternehmertum',
		slug: 'ger-3as-le-t3-arbeitswelt-unternehmertum',
		grade: '3as_le',
		yearSubjectId: 794,
		trimesterId: 't3',
		sequenceId: 'einheit3',
		sequenceTitleAr:
			'المحور الثالث: عالم الشغل والشباب، صيغة الافتراض والصفة ومنهجية البكالوريا (Arbeitswelt, Konjunktiv II & BAC-Training)',
		order: 1,
		titleAr:
			'عالم الشغل، التكوين المهني، ريادة الأعمال الشبابية والتضامن (Arbeitswelt, Berufsausbildung, Unternehmertum & Solidarität)',
		objectives: [
			'تحليل نصوص عالم الشغل في البكالوريا حول التكوين المهني، ريادة المشاريع الشبابية (Unternehmertum)، المهن اليدوية والتقنية، والتعاون التضامني (Solidarität)',
			'استثمار المعجم المهني والاقتصادي الدقيق (die Berufsausbildung, die Existenzgründung, das Handwerk, die Zuverlässigkeit, die Weiterbildung, der Teamgeist)',
			'ربط النجاح المهني في الفهم والتعبير بقيم الأمانة والإتقان (Arbeitsethik) والعمل الجماعي النافع للمجتمع'
		],
		keywordsAr: [
			'Arbeitswelt (عالم الشغل)',
			'Berufsausbildung (التكوين المهني)',
			'Unternehmertum (ريادة الأعمال)',
			'Handwerk (الحرف والصناعة)',
			'Weiterbildung (التكوين المستمر)',
			'Solidarität (التضامن)'
		],
		discover: {
			scenarioAr:
				'يعالج الفصل الثالث من برنامج 3AS LE تحديات انتقال الشباب من المدرسة إلى الحياة المهنية (Berufsorientierung und Arbeitswelt): كيف تفتح المبادرة الفردية والتكوين المهني والتعاونيات التضامنية آفاقاً منتجة للشباب بعيداً عن البطالة والانتظار السلبي؟',
			svg: renderLessonIllustration('ger_06_arbeitswelt_berufsausbildung', {
				lang: 'de',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'اقرأ الجملة: „Junge Unternehmerinnen und Unternehmer schaffen nicht nur für sich selbst ein Einkommen, sondern lösen konkrete Probleme ihrer Region.“ ما الدور المزدوج لريادة الأعمال الشبابية؟',
					hintAr: 'لاحظ التركيب „nicht nur ..., sondern ...“.',
					expectedInput: 'تحقيق دخل مستقل لصاحب المشروع وتقديم حلول عملية لمشكلات المجتمع المحلي وخلق فرص عمل',
					revealAr:
						'تشدد نصوص BAC 3AS LE على أن المشروع الناجح يجمع بين الجدوى الاقتصادية (Wirtschaftlichkeit) والمنفعة الاجتماعية (gesellschaftlicher Nutzen).'
				},
				{
					promptAr:
						'لماذا لم يعد التمييز القديم بين العمل اليدوي/التقني والعمل الفكري مقبولاً في النصوص الاقتصادية الحديثة؟',
					hintAr: 'فكر في حاجة الاقتصاد إلى الحرفيين المهرة والمهندسين المؤهلين في وقت واحد.',
					expectedInput: 'لأن كل مهنة شريفة تتطلب مهارة وإتقاناً وتدريباً مستمراً، والمجتمع بحاجة متكاملة إلى الحرفي والمهندس والأستاذ',
					revealAr:
						'تُبرز نصوص التكوين المهني قيمة „das Handwerk“ والتقنيات الحديثة مع الدعوة إلى „lebenslanges Lernen“ (التعلم مدى الحياة).'
				},
				{
					promptAr:
						'ما أبرز القيم الأخلاقية التي يتوقعها أي رب عمل أو فريق عمل في المؤسسة؟',
					hintAr: 'فكر في الوقت، الأمانة، وروح الفريق.',
					expectedInput: 'الالتزام بالوقت (Pünktlichkeit)، الموثوقية والأمانة (Zuverlässigkeit und Ehrlichkeit)، وروح التعاون (Teamfähigkeit)',
					revealAr:
						'يؤكد أرباب العمل والمكونون دائماً أن المهارة التقنية تكتمل بالانضباط الأخلاقي والتواصل المحترم داخل الفريق.'
				}
			]
		},
		summary: {
			rulesAr: [
				'محاور الوحدة المهنية: اختيار المهنة حسب الميول والكفاءات (Berufswahl nach Neigung und Eignung)، أهمية التكوين المهني والتطبيقي، إطلاق المشاريع الناشئة والتعاونيات (Gründung kleiner Betriebe und Genossenschaften)، والتكوين المستمر (Weiterbildung) لمواكبة تطور المهن.',
				'ثنائية سوق العمل المعاصر: تحولات الرقمنة في المصانع والمكاتب، الحاجة إلى المهن الخضراء (grüne Berufe in Umwelttechnik und Solarenergie)، وأهمية إتقان اللغات الأجنبية في العقود والوثائق التقنية.',
				'المعجم المفتاحي للفهم والكتابة: die Arbeitslosigkeit (البطالة)، die Berufserfahrung (الخبرة المهنية)، die Fachkraft (الكفاءة المختصة)، die Genossenschaft (التعاونية)، die Eigeninitiative (المبادرة الذاتية)، gewissenhaft (بضمير مهني متقن).',
				'توظيف أمثلة واقعية في البكالوريا: عند كتابة فقرة عن تشغيل الشباب، اذكر مبادرات ملموسة مثل ورشات الصيانة الشمسية، مكاتب الترجمة التقنية، والزراعة المستدامة والتعاونيات الحرفية.'
			],
			visualSvg: svgGermanGrammarMap({
				title: 'Arbeitswelt und Unternehmertum (BAC)',
				rootLabel: 'Erfolgreicher Berufseinstieg',
				rootSub: 'Qualifikation, Initiative und Solidarität',
				branches: [
					{
						label: 'Ausbildung',
						rule: 'Praxis & Theorie verbinden',
						example: 'duale Fachkompetenz'
					},
					{
						label: 'Gründung',
						rule: 'Lokale Bedarfe erkennen',
						example: 'eigene Projekte starten'
					},
					{
						label: 'Berufsethik',
						rule: 'Fleiß, Treue, Sorgfalt',
						example: 'Vertrauen im Team bauen'
					},
					{
						label: 'Solidarität',
						rule: 'Genossenschaft & Hilfe',
						example: 'gemeinsam stark handeln'
					}
				],
				width: 580
			}),
			visualCaptionAr:
				'ركائز الاندماج المهني وريادة الأعمال والتضامن الاقتصادي في برنامج السنة الثالثة ثانوي.',
			examples: [
				{
					problemAr:
						'Textfrage: „Warum ist lebenslange Weiterbildung in modernen Berufen unverzichtbar?“',
					solutionAr:
						'Weil sich Arbeitsmethoden und Werkzeuge stetig weiterentwickeln; nur wer regelmäßig dazulernt, bleibt fachlich kompetent und vielseitig einsetzbar.'
				},
				{
					problemAr:
						'Meinungsfrage (4–5 Sätze): „Welche Eigenschaften braucht ein junger Mensch, um ein eigenes kleines Unternehmen erfolgreich zu führen?“',
					solutionAr:
						'Meines Erachtens benötigt ein junger Gründer zunächst eine gründliche fachliche Vorbereitung und einen realistischen Finanzplan. Ebenso wichtig sind Geduld bei ersten Schwierigkeiten, Ehrlichkeit gegenüber Kundinnen und Kunden sowie die Bereitschaft, im Team verantwortungsvoll zu arbeiten.'
				}
			],
			watchOutAr:
				'احذر الخلط بين الكلمات المتشابهة في عالم الشغل: „der Beruf“ (المهنة التي يتأهل لها المرء)، و„die Arbeit“ (العمل عموماً، بدون جمع عادة)، و„die Stelle / der Arbeitsplatz“ (منصب الشغل)، و„das Praktikum“ (التربص الميداني المؤقت، وجمعه die Praktika)!'
		},
		practice: [
			{
				questionAr:
					'Welche Bedeutung hat der Begriff „Weiterbildung“ in Texten über die moderne Arbeitswelt?',
				options: [
					'Das regelmäßige Erlernen neuer Fähigkeiten nach Abschluss der ersten Ausbildung',
					'Die endgültige Beendigung jeder beruflichen Tätigkeit',
					'Der Verzicht auf jede praktische Erfahrung im Betrieb',
					'Eine einmalige Pause ohne Bezug zum Beruf'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: التكوين المستمر يعني تطوير الكفاءات طوال المسار المهني.',
					'خطأ: التوقف عن العمل يعني التقاعد أو البطالة.',
					'خطأ: الخبرة العملية ركيزة أساسية.',
					'خطأ: التكوين المستمر تعلمٌ وتأهيل وليس إجازة.'
				],
				explanationAr:
					'يشير مصطلح Weiterbildung إلى مواصلة التأهيل واكتساب معارف جديدة لمواكبة تطور المهن.'
			},
			{
				questionAr:
					'Welcher Satz gebraucht die Berufsbegriffe „Beruf“, „Stelle“ und „Praktikum“ sprachlich korrekt?',
				options: [
					'Während des Praktikums lernt sie den Arbeitsalltag kennen, bevor sie eine feste Stelle sucht.',
					'Er macht ein festes Beruf für zwei Tage ohne Arbeit.',
					'Sie sucht ein Praktikum für ihre gesamte Rente.',
					'Die Arbeit sind sehr viele Praktikum.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: التربص (das Praktikum) يمهد للتعرف على الواقع المهني قبل البحث عن منصب قار (eine feste Stelle).',
					'خطأ: Beruf مذكر (ein fester Beruf) والاستعمال غير سليم.',
					'خطأ: التربص يسبق الوظيفة ولا يخص التقاعد.',
					'خطأ: تركيب نحوي ومفرداتي خاطئ.'
				],
				explanationAr:
					'التفريق بين Praktikum (تربص تدريبي)، Stelle (منصب عمل)، وBeruf (مهنة/حرفة) ضروري في الفهم والتعبير.'
			},
			{
				questionAr:
					'Warum betonen wirtschaftliche Texte in 3AS LE den Wert von Genossenschaften und Teamarbeit?',
				options: [
					'Weil junge Menschen durch geteilte Ressourcen, gegenseitige Hilfe und Vertrauen nachhaltiger gründen können',
					'Weil Einzelarbeit immer gesetzlich verboten ist',
					'Weil Teamarbeit jede Planung überflüssig macht',
					'Weil Zuverlässigkeit in der Wirtschaft unwichtig ist'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: التعاونيات وتقاسم الخبرات والموارد يخففان أعباء الانطلاق ويعززان التضامن.',
					'خطأ: العمل الفردي غير ممنوع لكن التعاون يضاعف فرص النجاح.',
					'خطأ: التخطيط المالي والتقني ضروري دائماً.',
					'خطأ: الموثوقية والأمانة أساس الثقة في المعاملات.'
				],
				explanationAr:
					'يرتبط النجاح الاقتصادي في نصوص البكالوريا بالتعاون (Genossenschaft)، وتوزيع الأدوار، والأمانة المهنية.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 2: Bildung, Mehrsprachigkeit, Schulbibliothek & Studienkompetenz
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_lesson_3as_le_t3_bildung_sprachen_zukunft',
		slug: 'ger-3as-le-t3-bildung-sprachen-zukunft',
		grade: '3as_le',
		yearSubjectId: 794,
		trimesterId: 't3',
		sequenceId: 'einheit3',
		sequenceTitleAr:
			'المحور الثالث: عالم الشغل والشباب، صيغة الافتراض والصفة ومنهجية البكالوريا (Arbeitswelt, Konjunktiv II & BAC-Training)',
		order: 2,
		titleAr:
			'التربية، تعدد اللغات، المكتبة المدرسية وكفاءة التعليم الجامعي (Mehrsprachigkeit, Schulbibliothek und Studienkompetenz)',
		objectives: [
			'تحليل نصوص التربية وتعلم اللغات حول قيمة تعدد اللغات (Mehrsprachigkeit)، الترجمة الأمينة، ودور المكتبة المدرسية في بناء القراءة العميقة',
			'استخلاص الدروس من تراث التعليم الإصلاحي الجزائري (المدارس الحرة والجمعيات العلمية بقيادة الشيخ عبد الحميد بن باديس والشيخ محمد البشير الإبراهيمي)',
			'توظيف معجم التعليم الجامعي والبحث (die Studienkompetenz, die Übersetzung, das tiefgehende Lesen, die Sprachbeherrschung, die Fachliteratur) في البكالوريا'
		],
		keywordsAr: [
			'Mehrsprachigkeit (تعدد اللغات)',
			'Schulbibliothek (المكتبة المدرسية)',
			'Tiefgehendes Lesen (القراءة العميقة)',
			'Studienkompetenz (الكفاءة الجامعية)',
			'Übersetzung (الترجمة)',
			'Muttersprache (اللغة الأم)'
		],
		discover: {
			scenarioAr:
				'في المرحلة النهائية قبل امتحان البكالوريا، تتناول النصوص التربوية معنى التخصص في شعبة اللغات الأجنبية: كيف يصبح تعلم الألمانية إلى جانب العربية والفرنسية والإنجليزية جسراً إلى الجامعات والمكتبات العلمية دون المساس بالهوية واللغة الأم؟',
			svg: renderLessonIllustration('ger_03_bildung_sprachen_bibliothek', {
				lang: 'de',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'اقرأ العبارة: „Fremdsprachen verdrängen nicht die Muttersprache, sondern schärfen durch den Sprachvergleich das Bewusstsein für den eigenen Ausdruck.“ ما أثر اللغات الأجنبية في اللغة الأم؟',
					hintAr: 'ركز على الفعلين „verdrängen nicht“ و„schärfen“.',
					expectedInput: 'اللغات الأجنبية لا تزاحم اللغة الأم بل تصقل الوعي ببلاغتها وقواعدها عبر المقارنة اللغوية',
					revealAr:
						'لترجمة نص من العربية إلى الألمانية أو العكس بدقة، يحتاج المترجم أولاً إلى التمكن العميق من لغته العربية الأم ومعجمها ودلالاتها.'
				},
				{
					promptAr:
						'كيف تُميّز نصوص البكالوريا بين „tiefgehendes Lesen“ (القراءة المتأنية في المكتبة) و„flüchtiges Überfliegen“ (التصفح العابر السريع)؟',
					hintAr: 'قارن بين أثر القراءتين في التركيز، والإملاء، وبناء الحجة.',
					expectedInput: 'القراءة المتأنية الكاملة تنمّي التركيز والإملاء والتحليل المنطقي، بينما التصفح السريع لا يبني معرفة عميقة',
					revealAr:
						'توفر المكتبة المدرسية الهدوء اللازم لتتبع الفكرة الطويلة، واستعمال القاموس الورقي أو العلمي، وبناء رصيد تعبيري متماسك.'
				},
				{
					promptAr:
						'ما النموذج التاريخي الجزائري الملهم في بناء المدارس ونشر العلم وربطه بالهوية والأخلاق؟',
					hintAr: 'تذكر رواد المدارس الحرة والصحافة الإصلاحية في قسنطينة والجزائر خلال القرن العشرين.',
					expectedInput: 'جهود الشيخ عبد الحميد بن باديس والشيخ محمد البشير الإبراهيمي في تأسيس المدارس الحرة ونشر المعرفة والوعي الأخلاقي',
					revealAr:
						'إبراز دور العلماء المصلحين الجزائريين مثل Scheich Abdelhamid Ben Badis وScheich Mohamed Bachir El-Ibrahimi يمنح إجابات البكالوريا عمقاً حضارياً موثوقاً.'
				}
			]
		},
		summary: {
			rulesAr: [
				'محاور التربية واللغات في 3AS LE: وظيفة المدرسة في بناء الفكر النقدي والأخلاقي، قيمة المطالعة المستمرة في المكتبات، دور الأستاذ والموجه التربوي، وأهمية اللغات الأجنبية والترجمة الأمينة في البحث الجامعي.',
				'مقارنة أساليب التحصيل: الحفظ الآلي العابر (auswendig lernen ohne Verständnis) مقابل الفهم التحليلي المنظم (analytisches Verstehen und eigenständiges Formulieren).',
				'معجم الوحدة اللغوية والجامعية: die Sprachkenntnisse (المعارف اللغوية)، der Wortschatz (الرصيد المعجمي)، das Wörterbuch (القاموس)، die Rechtschreibung (الإملاء)، die Argumentation (الحجاج)، die Hochschulreife (الأهلية الجامعية / البكالوريا).',
				'قيمة الهوية والانفتاح المتزن: إتقان الألمانية يفتح أبواب الهندسة والترجمة والبحث العلمي في D-A-CH، مع بقاء اللغة العربية والقيم الوطنية ركيزة أساسية للشخصية الجزائرية.'
			],
			visualSvg: svgGermanGrammarMap({
				title: 'Bildung, Sprachen & Bibliothek (3AS LE)',
				rootLabel: 'Mehrsprachige Studienkompetenz',
				rootSub: 'Tiefe Bildung und kulturelle Verwurzelung',
				branches: [
					{
						label: 'Muttersprache',
						rule: 'Basis für klares Denken',
						example: 'präzise Übersetzung'
					},
					{
						label: 'Fremdsprachen',
						rule: 'Zugang zu Fachliteratur',
						example: 'Deutsch im Studium nutzen'
					},
					{
						label: 'Bibliothek',
						rule: 'Ruhe & tiefes Lesen',
						example: 'Konzentration trainieren'
					},
					{
						label: 'Studienwahl',
						rule: 'Neigung, Fleiß & Methode',
						example: 'Übergang zum Studium'
					}
				],
				width: 580
			}),
			visualCaptionAr:
				'ركائز الكفاءة اللغوية والجامعية في نصوص التربية والمكتبة وتعدد اللغات.',
			examples: [
				{
					problemAr:
						'Textfrage: „Welche konkreten Vorteile bringt ein regelmäßiger Besuch der Schulbibliothek für Abiturientinnen und Abiturienten?“',
					solutionAr:
						'Er fördert ruhige Konzentration, erweitert den Fachwortschatz, verbessert die Rechtschreibung und schult den Umgang mit zuverlässigen Nachschlagewerken.'
				},
				{
					problemAr:
						'Meinungsfrage (4–5 Sätze): „Warum lohnt es sich im Zweig Fremdsprachen, Deutsch gründlich zu erlernen?“',
					solutionAr:
						'Das gründliche Erlernen der deutschen Sprache erweitert unseren geistigen Horizont und stärkt das logische Denken durch klare grammatische Strukturen. Zudem eröffnet Deutsch hervorragende berufliche und akademische Wege in Übersetzung, Forschung, Tourismus und internationaler Wirtschaftskooperation.'
				}
			],
			watchOutAr:
				'لا تكتب في مقالاتك بالألمانية عبارة „ich lerne Deutsch“ بكثرة مكررة؛ نوّع بأساليب راقية مثل: „die deutsche Sprache beherrschen“, „Fremdsprachenkenntnisse vertiefen“, „einen Zugang zur Fachliteratur gewinnen“!'
		},
		practice: [
			{
				questionAr:
					'Welche Wirkung hat das Erlernen von Fremdsprachen laut dem Lehrplan 3AS LE auf die Muttersprache?',
				options: [
					'Es vertieft das Sprachbewusstsein und stärkt die Ausdrucksfähigkeit auch in der Muttersprache.',
					'Es löscht die Grammatik der Muttersprache vollständig aus.',
					'Es verbietet die Nutzung von Bibliotheken und Sachbüchern.',
					'Es macht jede Rechtschreibregel überflüssig.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: المقارنة بين اللغات والترجمة تعمق الإدراك الدقيق لقواعد اللغة الأم ومفرداتها.',
					'خطأ: تعلم اللغات يتكامل مع اللغة الأم ولا يمحوها.',
					'خطأ: المكتبة والكتب المعرفية ركيزة لتعلم اللغات.',
					'خطأ: إتقان اللغات يتطلب دقة الإملاء والنحو.'
				],
				explanationAr:
					'تقوم فلسفة شعبة اللغات الأجنبية على أن تعدد اللغات يثري الحس اللغوي والقدرة المقارنة دون المساس بالهوية.'
			},
			{
				questionAr:
					'Welche algerischen Persönlichkeiten gelten in den Kultur- und Bildungstexten als Vorbilder für freie Schulen und Wissenspflege im 20. Jahrhundert?',
				options: [
					'Scheich Abdelhamid Ben Badis und Scheich Mohamed Bachir El-Ibrahimi',
					'Ausschließlich antike Mythenfiguren',
					'Nur Sportvereine aus Übersee',
					'Fiktive Romanfiguren ohne geschichtlichen Bezug'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: أسهم الشيخ عبد الحميد بن باديس والشيخ محمد البشير الإبراهيمي في نهضة المدارس الحرة والتربية الأخلاقية والعلمية بالجزائر.',
					'خطأ: الأساطير غير مقبولة وغير تاريخية.',
					'خطأ: لا صلة لها بالنهضة التعليمية.',
					'خطأ: هؤلاء أعلام تاريخيون حقيقيون معتمدون في التراث الجزائري.'
				],
				explanationAr:
					'يُعد الشيخ عبد الحميد بن باديس والشيخ محمد البشير الإبراهيمي رمزين بارزين للنهضة التربوية والصحافة الإصلاحية في الجزائر.'
			},
			{
				questionAr:
					'Was unterscheidet „tiefgehendes Lesen“ in der Bibliothek vom flüchtigen Lesen kurzer Nachrichten?',
				options: [
					'Es trainiert anhaltende Aufmerksamkeit, logisches Textverstehen und präzisen Stil.',
					'Es vermeidet absichtlich jedes neue Fachwort.',
					'Es dient lediglich dem schnellen Scrollen ohne Verstehen.',
					'Es ersetzt jedes Gespräch mit der Lehrkraft.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: القراءة المتعمقة تنمي التركيز والفهم الشامل والأسلوب السليم.',
					'خطأ: القراءة العميقة تثري المعجم المتخصص.',
					'خطأ: هذا وصف القراءة السطحية السريعة.',
					'خطأ: المكتبة تكمل دور الأستاذ داخل القسم.'
				],
				explanationAr:
					'تؤكد النصوص التربوية أن القراءة المتأنية للكتب والمقالات الكاملة هي أساس الكفاءة الجامعية.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 3: Konjunktiv II (Gegenwart/Vergangenheit), irreale Konditionalsätze & Adjektivdeklination
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_lesson_3as_le_t3_konjunktiv2_adjektivdeklination',
		slug: 'ger-3as-le-t3-konjunktiv2-adjektivdeklination',
		grade: '3as_le',
		yearSubjectId: 794,
		trimesterId: 't3',
		sequenceId: 'einheit3',
		sequenceTitleAr:
			'المحور الثالث: عالم الشغل والشباب، صيغة الافتراض والصفة ومنهجية البكالوريا (Arbeitswelt, Konjunktiv II & BAC-Training)',
		order: 3,
		titleAr:
			'صيغة الافتراض والشرط غير الواقعي (Konjunktiv II) وإعراب الصفات (Adjektivdeklination)',
		objectives: [
			'تصريف واستعمال صيغة الافتراض والتمني (Konjunktiv II) في الحاضر (wäre, hätte, könnte, müsste, würde + Infinitiv) وفي الماضي غير القابل للتدارك (hätte/wäre + Partizip II)',
			'صياغة جمل الشرط غير الواقعية (irreale Konditionalsätze) بـ „wenn“ أو بدون „wenn“ مع تقديم الفعل، والتعبير عن التمني والندم („Wenn doch / Hätte ich doch nur...!“)',
			'إتقان نهايات الصفات الوصفية (Adjektivdeklination) بعد أداة التعريف (bestimmter Artikel)، وأداة التنكير/النفي/الملكية (ein/kein/mein)، وبدون أداة (Nullartikel) في الحالات الأربع'
		],
		keywordsAr: [
			'Konjunktiv II Gegenwart',
			'Konjunktiv II Vergangenheit',
			'Irrealer Konditionalsatz',
			'Irrealer Wunschsatz',
			'Adjektivdeklination',
			'Schwache / Gemischte / Starke Deklination'
		],
		discover: {
			scenarioAr:
				'تُمتحن صيغة Konjunktiv II وإعراب الصفات (Adjektivdeklination) بكثافة في بكالوريا 3AS LE؛ لأنها تمكّن الطالب من التعبير عن النصائح المهذبة، الفرضيات غير الواقعية في الحاضر والماضي، ووصف الأسماء بدقة صرفية عالية.',
			svg: svgGermanTenseTimeline({
				title: 'Konjunktiv II & Irreale Bedingung',
				tenseName: 'Gegenwart vs. Vergangenheit',
				formula: 'wäre/hätte/würde+Inf. | hätte/wäre+Partizip II',
				activeZone: 'past',
				example: 'Hätte er früher geübt, wäre die Prüfung leichter gewesen.',
				markers: 'wenn, falls, doch nur, sonst, beinahe, fast'
			}),
			steps: [
				{
					promptAr:
						'قارن بين الجملتين: (1) „Wenn ich mehr Zeit hätte, würde ich ein zweites Buch lesen.“ و (2) „Wenn ich gestern mehr Zeit gehabt hätte, hätte ich das Buch zu Ende gelesen.“ ما الفرق الزمني؟',
					hintAr: 'الأولى تتعلق بالحاضر أو المستقبل المتخيل، والثانية بحدث ماضٍ انتهى ولا يمكن تغييره.',
					expectedInput: 'الجملة الأولى تعبر عن فرضية في الحاضر (hätte / würde lesen)، والثانية عن ندم أو فرضية منتهية في الماضي (gehabt hätte / hätte gelesen)',
					revealAr:
						'في Konjunktiv II للحاضر نستعمل: wäre, hätte, könnte, müsste, sollte أو würde + Infinitiv؛ وفي الماضي نستعمل وجوباً: hätte / wäre + Partizip II (حيث يصبح wäre/hätte في الأخير داخل جملة wenn!).'
				},
				{
					promptAr:
						'كيف نحذف „wenn“ في الجملة الشرطية غير الواقعية: „Wenn sie fleißiger gearbeitet hätte, wäre sie besser vorbereitet gewesen.“؟',
					hintAr: 'قدّم الفعل المصرف „hätte“ إلى الموقع الأول في الجملة ثم أضف „dann/so“ في الجملة الثانية.',
					expectedInput: 'Hätte sie fleißiger gearbeitet, (dann/so) wäre sie besser vorbereitet gewesen.',
					revealAr:
						'قاعدة التقديم (uneingeleiteter Konditionalsatz): نحذف „wenn“ ونبدأ بالفعل المصرف (Hätte / Wäre / Könnte / Würde)، ويبقى المعنى الشرطي كاملاً!'
				},
				{
					promptAr:
						'لماذا نكتب „der fleißigE Schüler“ (حرف e) مقابل „ein fleißigER Schüler“ (حرف er) في المرفوع المذكر؟',
					hintAr: 'انظر إلى الأداة السابقة: هل تظهر „der“ علامة الجنس المذكر (-r) أم لا؟',
					expectedInput: 'لأن „der“ تحمل علامة المذكر (-r) فتأخذ الصفة نهاية ضعيفة (-e)، بينما „ein“ لا تظهر علامة المذكر فتتحمل الصفة النهاية (-er)',
					revealAr:
						'هذا هو سر إعراب الصفة في الألمانية: متى ظهرت إشارة الحالة والجنس بوضوح في الأداة (der/die/das/dieser) اكتفت الصفة بنهاية ضعيفة (-e / -en)؛ ومتى غابت الإشارة عن الأداة (ein, kein, mein في المرفوع المذكر والمحايد، أو عند غياب الأداة تماماً) أخذت الصفة العلامة القوية (-er / -es / -e)!'
				}
			]
		},
		summary: {
			rulesAr: [
				'Konjunktiv II في الحاضر: للأفعال المساعدة والناقصة نستعمل الصيغ الخاصة (sein -> wäre, haben -> hätte, werden -> würde, können -> könnte, müssen -> müsste, sollen -> sollte, dürfen -> dürfte)؛ أما بقية الأفعال فنستعمل معها غالباً „würde + Infinitiv“ (مثل: würde forschen, würde übersetzen).',
				'Konjunktiv II في الماضي: „hätte / wäre + Partizip II“ (حسب الفعل الأصلي إن كان يأخذ haben أو sein!). وعند وجود فعل ناقص في الماضي: „hätte + Infinitiv + Modalverb im Infinitiv“ (مثل: Er hätte früher anfangen müssen).',
				'تحويل الجمل الحقيقية إلى غير واقعية (Real -> Irreal): نُغيّر النفي والإثبات! فإذا كانت الحقيقة: „Er hat keine Zeit, deshalb besucht er den Kurs nicht“ تصبح في الافتراض: „Wenn er Zeit hätte, würde er den Kurs besuchen“ (نسقط النفي أو نضيفه بعكس الواقع!).',
				'خلاصة Adjektivdeklination: (1) بعد der/die/das/dieser/jeder: فقط -e (في Nominativ المفرد وفي Akkusativ المؤنث والمحايد) و-en في كل الباقي (Dativ، Genitiv، المذكر Akkusativ، وكل الجمع!). (2) بعد ein/kein/mein: مثل الضعيف تماماً عدا 3 خانات تتحمل علامة الجنس الغائبة: المذكر Nominativ (-er)، المحايد Nom/Akk (-es)، المؤنث Nom/Akk (-e). (3) بدون أداة (Nullartikel): تأخذ الصفة نهاية أداة التعريف نفسها (مثل: frisches Wasser, mit großem Fleiß, gute Ideen).'
			],
			visualSvg: svgGermanConjugationChart({
				title: 'Adjektivdeklination im Überblick',
				subtitle: 'Endungen nach Artikeltyp im BAC',
				columns: [
					{
						header: 'Bestimmter Artikel',
						rule: 'der/die/das -> -e oder -en',
						examples: 'der kluge Plan / mit dem klugen'
					},
					{
						header: 'Unbest. Artikel',
						rule: 'ein/kein/mein: -er/-es/-e/-en',
						examples: 'ein fleißiger Schüler / eines guten'
					},
					{
						header: 'Ohne Artikel',
						rule: 'Starke Endung wie der/die/das',
						examples: 'frischer Mut / mit großem Fleiß'
					}
				],
				width: 560
			}),
			visualCaptionAr:
				'الجدول التركيبي المختصر لإعراب الصفات الألمانية وفق نوع الأداة والحالة الإعرابية.',
			examples: [
				{
					problemAr:
						'Real -> Irreal (Vergangenheit): „Die Schülerin hat die Wörter nicht nachgeschlagen, deshalb hat sie einen Fehler gemacht.“',
					solutionAr:
						'Wenn die Schülerin die Wörter nachgeschlagen hätte, hätte sie keinen Fehler gemacht. (Ohne „wenn“: Hätte die Schülerin die Wörter nachgeschlagen, so hätte sie keinen Fehler gemacht.)'
				},
				{
					problemAr:
						'Adjektivdeklination ergänzen: „Mit (groß) Begeisterung lasen die (fleißig) Jugendlichen einen (interessant) Bericht über (sauber) Energie.“',
					solutionAr:
						'Mit großer Begeisterung (Dat. f. ohne Artikel) lasen die fleißigen Jugendlichen (Nom. Pl. mit best. Art.) einen interessanten Bericht (Akk. m. mit unbest. Art.) über saubere Energie (Akk. f. ohne Artikel).'
				}
			],
			watchOutAr:
				'احذر خطأً شائعاً في Konjunktiv II للماضي: الأفعال الدالة على الحركة أو التحول أو sein/bleiben تأخذ „wäre + Partizip II“ لا „hätte“ (مثل: wäre gegangen, wäre geblieben, wäre gewesen)؛ ولا تنسَ أن „Real -> Irreal“ يقلب النفي والإثبات!'
		},
		practice: [
			{
				questionAr:
					'Welche Konjunktiv-II-Form beschreibt eine irreale Situation in der Vergangenheit korrekt: „Wenn der Bewerber das Dokument rechtzeitig geschickt .........., .......... er zum Gespräch eingeladen worden“?',
				options: [
					'hätte ... wäre',
					'hat ... wird',
					'hätte ... würde',
					'wäre ... hätte'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: schicken يأخذ haben (geschickt hätte)، والمبني للمجهول في الماضي التام الافتراضي يأخذ „wäre ... eingeladen worden“.',
					'خطأ: „hat / wird“ صيغ إخبارية حقيقية وليست افتراضية.',
					'خطأ: هنا مبني للمجهول مكتمل في الماضي (eingeladen worden) فيلزم „wäre“ لا „würde“.',
					'خطأ: عكس الفعلين المساعدين غير صحيح.'
				],
				explanationAr:
					'الفعل schicken يأخذ haben في الماضي (hätte geschickt)، بينما المبني للمجهول في الماضي الافتراضي يتشكل من „wäre + Partizip II + worden“.'
			},
			{
				questionAr:
					'Welche Adjektivendungen passen exakt: „Ein (erfahren) Ingenieur gibt den (jung) Auszubildenden (wertvoll) Ratschläge“?',
				options: [
					'erfahrener / jungen / wertvolle',
					'erfahrene / junge / wertvollen',
					'erfahrenen / junger / wertvoller',
					'erfahrener / junge / wertvolles'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: erfahrener (Nom. m. nach ein)، jungen (Dat. Pl. nach den)، wertvolle (Akk. Pl. ohne Artikel).',
					'خطأ: „erfahrene“ ناقص إشارة المذكر بعد ein، و„wertvollen“ لا يوافق الجمع المنصوب بلا أداة.',
					'خطأ: خلط في الحالات الإعرابية.',
					'خطأ: „Ratschläge“ جمع وليس محايداً مفرداً.'
				],
				explanationAr:
					'تحديد الحالة (Nominativ / Dativ / Akkusativ) ثم الجنس والعدد ثم نوع الأداة (ein / den / Nullartikel) يضمن نهاية الصفة بدقة.'
			},
			{
				questionAr:
					'Wie lautet der irreale Konditionalsatz ohne „wenn“ zu: „Wenn wir sauberes Wasser sparsam nutzen würden, könnten wir Dürren mildern“?',
				options: [
					'Würden wir sauberes Wasser sparsam nutzen, könnten wir Dürren mildern.',
					'Nutzen wir sauberes Wasser sparsam würden, könnten wir Dürren mildern.',
					'Wir würden sauberes Wasser sparsam nutzen, wenn könnten wir Dürren mildern.',
					'Sparsam nutzen würden wir sauberes Wasser, könnten wir Dürren mildern.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: عند حذف wenn يتصدر الفعل المصرف „Würden“ الجملة الأولى ويبقى المصدر „nutzen“ في آخرها.',
					'خطأ: ترتيب غير ألماني للفعل المصرف.',
					'خطأ: „wenn“ بقيت وأخطأت في موقع الفعل.',
					'خطأ: الجملة الشرطية بلا wenn تبدأ مباشرة بالفعل المصرف.'
				],
				explanationAr:
					'في الجملة الشرطية المحذوفة „wenn“ يوضع الفعل المصرف في المركز الأول: „Würden / Hätten / Wären + Subjekt ...“.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 4: Systematische BAC-Prüfungsmethodik (I, II, III: Erörterung / Stellungnahme)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_lesson_3as_le_t3_bac_aufsatz_methodik',
		slug: 'ger-3as-le-t3-bac-aufsatz-methodik',
		grade: '3as_le',
		yearSubjectId: 794,
		trimesterId: 't3',
		sequenceId: 'einheit3',
		sequenceTitleAr:
			'المحور الثالث: عالم الشغل والشباب، صيغة الافتراض والصفة ومنهجية البكالوريا (Arbeitswelt, Konjunktiv II & BAC-Training)',
		order: 4,
		titleAr:
			'المنهجية الشاملة لامتحان البكالوريا: الفهم، الكفاءة اللغوية وتحرير المقال (BAC-Prüfungsmethodik: Textverständnis, Sprachfähigkeit & Erörterung)',
		objectives: [
			'ضبط استراتيجية التعامل مع أقسام امتحان بكالوريا الألمانية الثلاثة: I. Textverständnis (7 Pkt.) + II. Sprachfähigkeit (7 Pkt.) + III. Schriftlicher Ausdruck (6 Pkt.) = 20 Pkt.',
			'إتقان المفاضلة الذكية بين „Thema 1 (Gelenkt)“ (الموضوع الموجه برؤوس الأقلام) و„Thema 2 (Frei)“ (الموضوع الحر) وبناء تصميم رباعي متماسك في 120–145 كلمة',
			'توظيف الروابط المنطقية والأكاديمية (Redemittel für Einleitung, Pro/Kontra, Schluss) وإجراء مراجعة لغوية نهائية قبل تسليم الورقة'
		],
		keywordsAr: [
			'BAC-Methodik (منهجية البكالوريا)',
			'Thema 1 Gelenkt (الموضوع الموجه)',
			'Thema 2 Frei (الموضوع الحر)',
			'Erörterung / Stellungnahme (المقال الحجاجي)',
			'Redemittel (التعابير المفتاحية)',
			'Korrekturlesen (المراجعة النهائية)'
		],
		discover: {
			scenarioAr:
				'لا يُقاس التفوق في بكالوريا اللغة الألمانية (المعامل 4، المدة 3 ساعات) بكمية الحفظ فقط، بل بإدارة الوقت، قراءة التعليمات بدقة، اختيار الموضوع الأنسب في التعبير الكتابي، وتطبيق قائمة المراجعة اللغوية على كل فقرة!',
			svg: svgGermanWritingBlueprint({
				title: 'BAC-Schreibplan (Schriftlicher Ausdruck)',
				steps: [
					{ stage: 'Einleitung', detail: 'Thema einführen und Leitfrage klar stellen' },
					{ stage: 'Pro-Argumente', detail: 'Zwei Gründe mit konkretem Beispiel belegen' },
					{ stage: 'Gegenargument', detail: 'Einschränkung mit Obwohl / Einerseits abwägen' },
					{ stage: 'Schlussfolgerung', detail: 'Eigene Stellungnahme und Ausblick formulieren' }
				]
			}),
			steps: [
				{
					promptAr:
						'كيف تختار بذكاء بين Thema 1 (Gelenkt) و Thema 2 (Frei) في القسم الثالث من امتحان البكالوريا؟',
					hintAr: 'فكر في وجود المعطيات المساعدة (Stichpunkte) ومدى توفر الرصيد المعجمي الدقيق لديك.',
					expectedInput: 'أفحص الموضوعين في المسودة وأختار الموضوع الذي أمتلك فيه أكبر رصيد معجمي وأفكار منظمة، وغالباً يمنح Thema 1 إطاراً مساعداً آمناً بالمعطيات',
					revealAr:
						'تأكد دائماً من الكتابة في موضوع واحد فقط („Wählen Sie EINES der beiden Themen“)، واستثمر رؤوس الأقلام في Thema 1 لإغناء أفكارك مع صياغتها في جمل تامة مرتبطة.'
				},
				{
					promptAr:
						'اقرأ العبارة الافتتاحية: „In der heutigen Gesellschaft wird oft darüber diskutiert, welche Rolle ... spielt.“ ما وظيفة المقدمة (Einleitung) في مقال البكالوريا؟',
					hintAr: 'تجنب الإطالة؛ المقدمة تضع الإطار العام ثم تطرح الإشكالية في 2–3 جمل.',
					expectedInput: 'تمهيد موجز يوضح أهمية الموضوع راهناً وينتهي بسؤال محوري يفتح باب النقاش',
					revealAr:
						'المقدمة الناجحة قصيرة ومباشرة (25–30 كلمة)، تليها فقرتا العرض (Pro-Argumente + Abwägung) ثم الخاتمة المركزة (20–25 كلمة) ليبلغ المجموع نحو 120–145 كلمة متوازنة.'
				},
				{
					promptAr:
						'ما الأخطاء اللغوية الخمسة التي يجب فحصها في آخر 10 دقائق (Korrekturlesen) على ورقة البكالوريا؟',
					hintAr: 'فكر في موقع الفعل، الحروف الكبيرة، الأدوات، نهاية الصفات، وتوافق الفاعل والفعل.',
					expectedInput: 'الكتابة الكبيرة للأسماء (Großschreibung)، موقع الفعل في الجملة الرئيسية والتابعة، تطابق الفاعل والفعل، حروف الجر والحالات، وعلامات الترقيم والفاصلة قبل dass/weil/obwohl',
					revealAr:
						'المراجعة المنهجية في الدقائق الأخيرة تنقذ التلميذ من أخطاء عفوية وتضمن علامة اللغة (Sprachrichtigkeit) كاملة تقريباً!'
				}
			]
		},
		summary: {
			rulesAr: [
				'توزيع الزمن والنقاط (03 Std. 00 / 20 Punkte): I. Textverständnis (7 Pkt. — ~55 دقيقة لقراءة النص 3 مرات والإجابة بدقة دون نسخ حرفي أعمى في الأسئلة المفتوحة)، II. Sprachfähigkeit (7 Pkt. — ~55 دقيقة لجدول التصنيف واشتقاق الكلمات والروابط والأزمنة)، III. Schriftlicher Ausdruck (6 Pkt. — ~60 دقيقة للتخطيط والتحرير والمراجعة).',
				'قائمة التعابير الذهبية للمقال (Redemittel BAC): للمقدمة („In der heutigen Welt gewinnt ... zunehmend an Bedeutung“, „Es stellt sich die Frage, ob ...“)؛ لعرض الحجج („Erstens lässt sich feststellen, dass ...“, „Darüber hinaus trägt ... dazu bei, dass ...“, „Ein konkretes Beispiel dafür ist ...“)؛ للموازنة („Einerseits ..., andererseits ...“, „Obwohl ..., sollte man nicht übersehen, dass ...“)؛ للخاتمة („Zusammenfassend bin ich der Ansicht, dass ...“, „Abschließend lässt sich sagen, dass ...“).',
				'تجنب النسخ الممنوع: لا تنسخ فقرات نص الفهم في التعبير الكتابي؛ فالمصحح يبحث عن أسلوبك الشخصي وتوظيف قواعد المنهج (Passiv, um...zu, obwohl, Konjunktiv II, Relativsätze) ضمن سياق طبيعي.',
				'انضباط الشكل والحجم: التزم بحجم 120–145 كلمة مقسمة على 4 فقرات مرئية بوضوح (مسافة بادئة أو سطر فارغ بين الفقرات) وبخط مقروء نظيف.'
			],
			visualSvg: svgGermanConjugationChart({
				title: 'Die 3 Teile der BAC-Prüfung (20 Pkt.)',
				subtitle: 'Zeitmanagement und Punkteverteilung',
				columns: [
					{
						header: 'I. Textverständnis',
						rule: '7 Pkt. (~55 Min.)',
						examples: 'Idee, R/F+Beleg, W-Fragen'
					},
					{
						header: 'II. Sprachfähigkeit',
						rule: '7 Pkt. (~55 Min.)',
						examples: 'Wortbildung, Passiv, Syntax'
					},
					{
						header: 'III. Ausdruck',
						rule: '6 Pkt. (~60 Min.)',
						examples: '1 Thema, 4 Absätze, 120-145 W.'
					}
				],
				width: 560
			}),
			visualCaptionAr:
				'الهيكلة الرسمية لامتحان بكالوريا اللغة الألمانية وتوزيع النقاط والوقت عبر الأجزاء الثلاثة.',
			examples: [
				{
					problemAr:
						'Einleitung & Schluss für das Thema „Solarenergie in Algerien“ (Musterbausteine):',
					solutionAr:
						'Einleitung: Angesichts des Klimawandels rücken erneuerbare Energien weltweit in den Mittelpunkt. Warum bietet gerade die algerische Sahara dafür besondere Chancen? | Schluss: Zusammenfassend lässt sich sagen, dass Investitionen in Solarenergie sowohl die Umwelt schützen als auch qualifizierte Arbeitsplätze für junge Fachkräfte schaffen.'
				},
				{
					problemAr:
						'Fehlerkorrektur vor Abgabe (Finde 3 typische Fehler): „Obwohl die bildung wichtig ist, viele jugendliche vergessen täglich zu lesen.“',
					solutionAr:
						'Korrigiert: „Obwohl die Bildung wichtig ist, vergessen viele Jugendliche täglich zu lesen.“ (1. Großschreibung: Bildung, Jugendliche; 2. Verb-Zweit-Stellung im Hauptsatz nach vorangestelltem Nebensatz: „vergessen“ direkt nach dem Komma!).'
				}
			],
			watchOutAr:
				'تذكّر القاعدة الذهبية لترتيب الكلمات بعد الجملة التابعة الابتدائية (Nebensatz am Anfang): الجملة التابعة بأكملها تحتل الموقع 1، لذلك يبدأ الجملة الرئيسية مباشرة بالفعل المصرف بعد الفاصلة („Obwohl es schwer ist, GILT Disziplin als Schlüssel“)!'
		},
		practice: [
			{
				questionAr:
					'Welche Wortstellung im Hauptsatz ist nach einem vorangestellten Nebensatz (z. B. „Obwohl das Thema anspruchsvoll ist, ...“) richtig?',
				options: [
					'Das konjugierte Verb folgt direkt nach dem Komma auf Position 1 des Hauptsatzes.',
					'Das Subjekt steht immer vor dem konjugierten Verb nach dem Komma.',
					'Alle Verben stehen am Ende des gesamten Satzes.',
					'Man lässt das konjugierte Verb des Hauptsatzes einfach weg.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الجملة التابعة تحتل الموقع 1، فيأتي الفعل المصرف في الجملة الرئيسية مباشرة بعد الفاصلة.',
					'خطأ: تقديم الفاعل بعد الفاصلة يكسر قاعدة Verb-Zweit-Stellung.',
					'خطأ: الفعل في الجملة الرئيسية يكون في الموقع الثاني، لا في الأخير.',
					'خطأ: الجملة الرئيسية تحتاج إلى فعل مصرف.'
				],
				explanationAr:
					'قاعدة „Nebensatz-Hauptsatz (Verb-Komma-Verb)“ تفرض مجيء الفعل المصرف للجملة الرئيسية مباشرة بعد الفاصلة.'
			},
			{
				questionAr:
					'Welcher Redemittel-Block passt am besten zum Beginn der Schlussfolgerung (Fazit) einer BAC-Erörterung?',
				options: [
					'Zusammenfassend lässt sich sagen, dass ...',
					'Erstens muss man erwähnen, dass ...',
					'Zum Beispiel habe ich gestern ...',
					'Hallo liebe Freunde, wie geht es euch?'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: صيغة أكاديمية رصينة لافتتاح الخاتمة التلخيصية.',
					'خطأ: „Erstens“ تستعمل لافتتاح الحجة الأولى في العرض.',
					'خطأ: مثال شخصي عابر لا يفتتح الخاتمة.',
					'خطأ: أسلوب شفهي غير لائق بمقال البكالوريا.'
				],
				explanationAr:
					'تفتتح الخاتمة بأدوات الاستنتاج والتلخيص مثل „Zusammenfassend lässt sich sagen“ أو „Abschließend bin ich der Ansicht“.'
			},
			{
				questionAr:
					'Welche Umfangs- und Strukturvorgabe sichert beim „Schriftlichen Ausdruck“ (6 Punkte) eine ausgewogene Bewertung?',
				options: [
					'Ein gewähltes Thema, rund 120 bis 145 Wörter, klar gegliedert in Einleitung, Hauptteil (Pro/Abwägung) und Schluss',
					'Beide Themen gleichzeitig in jeweils drei unvollständigen Stichwörtern beantworten',
					'Den gesamten Lesetext aus Teil I wörtlich abschreiben',
					'Einen einzigen Absatz ohne Punkt und Komma schreiben'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الالتزام بموضوع واحد (120–145 كلمة) ضمن تصميم رباعي مترابط يحقق أعلى تقييم.',
					'خطأ: يُمنع دمج الموضوعين أو الاكتفاء برؤوس أقلام غير محررة.',
					'خطأ: النسخ من نص الفهم لا يُحتسب تعبيراً شخصياً.',
					'خطأ: غياب الفقرات والترقيم يضعف الانسجام.'
				],
				explanationAr:
					'يتطلب القسم الثالث من البكالوريا اختيار موضوع واحد وتحرير نص مترابط من 4 فقرات بطول 120–145 كلمة.'
			}
		]
	}
];
