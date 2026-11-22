import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';
import {
	svgGermanConjugationChart,
	svgGermanGrammarMap,
	svgGermanTenseTimeline
} from '../../svg-german';
import type { GermanInteractiveLessonData } from '../../types';

/**
 * 3AS BAC Foreign Languages (لغات أجنبية — yearSubjectId: 794, coeff 4, 03h00, 7+7+6=20)
 * Interactive Lessons — Trimester 2 : Wissenschaft, Medien, Umwelt & Komplexe Nebensätze (4 lessons)
 */
export const LESSONS_3AS_LE_T2: GermanInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 1: Wissenschaft, Medizinische Innovation & Digitale Verantwortung
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_lesson_3as_le_t2_wissenschaft_technologie',
		slug: 'ger-3as-le-t2-wissenschaft-technologie',
		grade: '3as_le',
		yearSubjectId: 794,
		trimesterId: 't2',
		sequenceId: 'einheit2',
		sequenceTitleAr:
			'المحور الثاني: العلوم والتكنولوجيا، حماية البيئة والجمل المركّبة (Wissenschaft, Umwelt & Komplexe Nebensätze)',
		order: 1,
		titleAr:
			'العلوم، الابتكار الطبي والوعي الرقمي المسؤول (Wissenschaft, medizinische Innovation und digitale Verantwortung)',
		objectives: [
			'تحليل نصوص العلوم والتكنولوجيا في البكالوريا حول التقدم الطبي، الرقمنة التعليمية، أخلاقيات البحث العلمي، ومخاطر الاعتماد المفرط على الشاشات',
			'توظيف المعجم العلمي والرقمي الدقيق (die Forschung, die Diagnostik, die Medienkompetenz, der Datenschutz, die Quellenprüfung, die Verantwortung)',
			'بناء مواقف حجاجية متوازنة بالألمانية توازن بين منافع الابتكار التقني وحماية الخصوصية والفكر النقدي المستقل'
		],
		keywordsAr: [
			'Wissenschaft (العلوم)',
			'Medizinische Innovation (الابتكار الطبي)',
			'Medienkompetenz (الكفاءة الإعلامية)',
			'Datenschutz (حماية البيانات)',
			'Quellenprüfung (فحص المصادر)',
			'Verantwortung (المسؤولية)'
		],
		discover: {
			scenarioAr:
				'في الفصل الثاني من برنامج 3AS LE، يتناول المنهج قضايا العلم والتقنية والإعلام: كيف تُسهم الابتكارات الطبية والمختبرات الحديثة في خدمة الإنسان، وكيف يطوّر الطالب كفاءة رقمية واعية (Medienkompetenz) تحميه من التضليل المعلوماتي ومن الكسل الذهني؟',
			svg: renderLessonIllustration('ger_05_wissenschaft_technologie_innovation', {
				lang: 'de',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'اقرأ العبارة: „Medienkompetenz bedeutet nicht bloß, ein Gerät schnell zu bedienen, sondern Informationen kritisch zu prüfen und persönliche Daten zu schützen.“ ما الركيزتان الأساسيتان للكفاءة الإعلامية؟',
					hintAr: 'لاحظ الجملتين المصدريتين بعد „sondern“.',
					expectedInput: 'فحص المعلومات بنقد واعٍ (kritisch prüfen) وحماية المعطيات الشخصية (persönliche Daten schützen)',
					revealAr:
						'الكفاءة الرقمية الحقيقية (Medienkompetenz) في نصوص البكالوريا هي مهارة التثبت من المصادر الموثوقة (seriöse Quellen) وصون الخصوصية (Datenschutz).'
				},
				{
					promptAr:
						'في مجال الطب والعلوم: „Moderne Diagnoseverfahren unterstützen Ärztinnen und Ärzte, ersetzen aber weder Fachwissen noch menschliche Fürsorge.“ ما حدود التقنية الطبية حسب هذه الجملة؟',
					hintAr: 'تأمل الفعلين „unterstützen“ (تساعد) و„ersetzen ... nicht“ (لا تعوّض).',
					expectedInput: 'الأجهزة الطبية تساعد الطبيب في التشخيص لكنها لا تعوّض العلم الدقيق ولا الرعاية الإنسانية',
					revealAr:
						'تنطلق نصوص BAC 3AS LE من مبدأ أخلاقي واضح: الآلة أداة مساعدة (Hilfsmittel)، والإنسان هو صاحب المسؤولية والأمانة العلمية (Ethik).'
				},
				{
					promptAr:
						'اذكر حجتين متوازنتين للإجابة عن سؤال الرأي في البكالوريا: „Sollten digitale Hilfsmittel beim Lernen begrenzt werden?“',
					hintAr: 'وظّف صيغة الموازنة: „Einerseits ... andererseits ...“.',
					expectedInput: 'Einerseits erleichtern digitale Bibliotheken die Recherche, andererseits erfordert echtes Verständnis konzentriertes eigenes Lesen und Denken.',
					revealAr:
						'الموقف المتوازن الذي يحصل على العلامة الكاملة يثبت منافع البحث العلمي الرقمي، ويحذّر في الوقت نفسه من تشتت الانتباه أو الاتكال السلبي.'
				}
			]
		},
		summary: {
			rulesAr: [
				'محاور الوحدة العلمية والتقنية: التقدم الطبي والوقاية الصحية (medizinische Diagnostik und Hygiene)، البحث العلمي والأمانة الفكرية، التحوّل الرقمي في التعليم (E-Learning und digitale Bibliotheken)، وأخلاقيات التعامل مع الخوارزميات والذكاء التقني.',
				'مخاطر الاستعمال غير المنضبط للشبكات: انتشار الأخبار الزائفة (Falschmeldungen / Desinformation)، ضعف التركيز القرائي (Konzentrationsverlust)، انتهاك الخصوصية (Datenmissbrauch)، والاتكال الذهني المفرط.',
				'ثنائية الحجاج في البكالوريا (Vorteile vs. Nachteile / Chancen vs. Risiken): يعتمد النص العلمي-التفسيري أدوات التقابل مثل „zwar ... aber“, „einerseits ... andererseits“, „im Gegensatz dazu“ لتمييز الفائدة عن الضرر.',
				'معجم أساسي للامتحان: die Forschungsergebnisse (نتائج البحث)، die Anwendung (التطبيق)، die Zuverlässigkeit (الموثوقية)، der Fortschritt (التقدم)، überprüfen (يتحقق من)، vertraulich (سري/خاص).'
			],
			visualSvg: svgGermanGrammarMap({
				title: 'Wissenschaft, Medien und Ethik (BAC 3AS)',
				rootLabel: 'Fortschritt mit Verantwortung',
				rootSub: 'Chancen der Technik und Schutz des Denkens',
				branches: [
					{
						label: 'Medizin',
						rule: 'Präzise Diagnose & Pflege',
						example: 'Technik dient dem Wohl'
					},
					{
						label: 'Quellenkritik',
						rule: 'Fakten genau überprüfen',
						example: 'seriöse Daten vergleichen'
					},
					{
						label: 'Datenschutz',
						rule: 'Privatsphäre sichern',
						example: 'vorsichtig im Netz handeln'
					},
					{
						label: 'Lernethik',
						rule: 'Selbstständig denken',
						example: 'Technik nur als Stütze'
					}
				],
				width: 580
			}),
			visualCaptionAr:
				'المبادئ الأربعة للبحث العلمي والوعي الرقمي المسؤول في برنامج الثالثة ثانوي.',
			examples: [
				{
					problemAr:
						'Textfrage: „Welche Gefahren entstehen laut modernen Medientexten, wenn Jugendliche Meldungen ungeprüft weiterleiten?“',
					solutionAr:
						'Falschmeldungen verbreiten sich rasch, Verwirrung und Misstrauen wachsen, und sachliche Diskussionen werden erschwert.'
				},
				{
					problemAr:
						'Meinungsfrage (4–5 Sätze): „Wie können Schülerinnen und Schüler digitale Werkzeuge sinnvoll für das Abitur nutzen?“',
					solutionAr:
						'Meines Erachtens sollten Jugendliche digitale Angebote gezielt und zeitlich begrenzt einsetzen. Seriöse Online-Wörterbücher und Fachartikel unterstützen die Vorbereitung sinnvoll, solange das eigenständige Lesen, Schreiben und Üben im Mittelpunkt bleibt.'
				}
			],
			watchOutAr:
				'انتبه في نصوص التكنولوجيا إلى الفرق بين „die Erfindung“ (الاختراع لشيء لم يكن موجوداً) و„die Entdeckung“ (الاكتشاف لظاهرة طبيعية موجودة)، وبين „aktuell“ (راهن/حالي) و„wirklich / tatsächlich“ (فعلي)!'
		},
		practice: [
			{
				questionAr:
					'Was beschreibt den Begriff „Medienkompetenz“ im schulischen Kontext von 3AS LE am genauesten?',
				options: [
					'Informationen kritisch prüfen, seriöse Quellen wählen und persönliche Daten schützen',
					'Jeden Beitrag sofort ohne Nachdenken teilen',
					'Auf jedes Fachbuch und jedes gedruckte Wörterbuch verzichten',
					'Die Bildschirmzeit bis spät in die Nacht ausdehnen'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الكفاءة الإعلامية تعني التمحيص النقدي للمصادر وحماية البيانات.',
					'خطأ: المشاركة المتسرعة تنشر الأخبار المضللة.',
					'خطأ: الكتب والقواميس الموثوقة أساس التعلم الرصين.',
					'خطأ: الإفراط في الشاشات يضر بالصحة والتركيز.'
				],
				explanationAr:
					'تقوم Medienkompetenz على الفحص النقدي، واختيار المصادر الرصينة، واحترام الأمان الرقمي.'
			},
			{
				questionAr:
					'Welche Haltung gegenüber der modernen Technik vertreten BAC-Texte zur Wissenschaftsethik?',
				options: [
					'Technik sollte wissenschaftliches Wissen und menschliche Verantwortung vollständig ersetzen.',
					'Fortschritt muss dem Menschen dienen und von ethischer Kontrolle begleitet werden.',
					'Forschung sollte ohne jede Überprüfung durchgeführt werden.',
					'Digitale Geräte sind ausschließlich für Unterhaltung gedacht.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: التقنية لا تحل محل الضمير الإنساني والمسؤولية.',
					'ممتاز: التقدم العلمي النافع يُسخَّر لخدمة الإنسان ويُضبط بالأخلاق.',
					'خطأ: المنهج العلمي يقوم على التحقق والتدقيق.',
					'خطأ: النصوص تركز على التوظيف العلمي والتعليمي.'
				],
				explanationAr:
					'تؤكد نصوص البكالوريا أن التقنية وسيلة مساعدة يضبطها العقل والأخلاق.'
			},
			{
				questionAr:
					'Welcher Satz verwendet das Wort „Entdeckung“ (اكتشاف) fachsprachlich richtig?',
				options: [
					'Die Entdeckung eines neuen Planeten begeisterte die Astronomen.',
					'Der Ingenieur machte eine Entdeckung eines neuen Fahrradreifens aus Holz.',
					'Die Entdeckung der täglichen Hausaufgabe dauert fünf Stunden.',
					'Jede Entdeckung eines Briefes kostet zwei Briefmarken.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الكوكب موجود في الكون فيُكتشف (Entdeckung)، بخلاف الآلة المصنوعة (Erfindung).',
					'خطأ: صنع إطار دراجة يُعد اختراعاً أو تطويراً تقنياً (Erfindung).',
					'خطأ: الواجب المنزلي يُنجز (Erledigung / Bearbeitung).',
					'خطأ: سياق غير صحيح لمعنى Entdeckung.'
				],
				explanationAr:
					'يميز المعجم العلمي الألماني بين Entdeckung (اكتشاف ظاهرة أو جرم موجود) وErfindung (اختراع جهاز مبتكر).'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 2: Umweltschutz, Solarenergie in der Sahara & Nachhaltigkeit
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_lesson_3as_le_t2_umweltschutz_energien',
		slug: 'ger-3as-le-t2-umweltschutz-energien',
		grade: '3as_le',
		yearSubjectId: 794,
		trimesterId: 't2',
		sequenceId: 'einheit2',
		sequenceTitleAr:
			'المحور الثاني: العلوم والتكنولوجيا، حماية البيئة والجمل المركّبة (Wissenschaft, Umwelt & Komplexe Nebensätze)',
		order: 2,
		titleAr:
			'حماية البيئة، الطاقة الشمسية في الصحراء والاستدامة (Klimaschutz, Solarenergie in der Sahara und Nachhaltigkeit)',
		objectives: [
			'فهم نصوص البيئة والطاقة في البكالوريا: التغير المناخي، الطاقات المتجددة (الطاقة الشمسية في الصحراء الجزائرية وطاقة الرياح)، إعادة التدوير والتشجير',
			'استثمار المعجم البيئي الدقيق (der Klimawandel, die Solarenergie, die Nachhaltigkeit, die Aufforstung, die Mülltrennung, der CO2-Ausstoß)',
			'الربط بين الحلول التقنية الكبرى (المزارع الشمسية، السد الأخضر) والسلوك الفردي المسؤول للمواطن الشاب في حفظ الماء والطاقة'
		],
		keywordsAr: [
			'Umweltschutz (حماية البيئة)',
			'Solarenergie (الطاقة الشمسية)',
			'Nachhaltigkeit (الاستدامة)',
			'Aufforstung (التشجير)',
			'Mülltrennung (فرز النفايات)',
			'Ressourcenschonung (حفظ الموارد)'
		],
		discover: {
			scenarioAr:
				'يحتل ملف البيئة والطاقات المتجددة (Umweltschutz und erneuerbare Energien) صدارة نصوص الفصل الثاني في البكالوريا؛ لاسيما أن الجزائر تمتلك في صحرائها إحدى أغنى مناطق الإشعاع الشمسي في العالم، إلى جانب مشاريع التشجير (Aufforstung / Grüner Damm) ومحطات التحلية وإعادة التدوير.',
			svg: renderLessonIllustration('ger_04_umweltschutz_erneuerbare_energien', {
				lang: 'de',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'اقرأ الجملة: „Nachhaltigkeit bedeutet, heute so zu wirtschaften, dass künftige Generationen ihre Bedürfnisse ebenso erfüllen können.“ ما جوهر مفهوم الاستدامة؟',
					hintAr: 'لاحظ الربط بين الحاضر (heute) والأجيال القادمة (künftige Generationen).',
					expectedInput: 'تلبية حاجات الحاضر في الاقتصاد والموارد دون استنزاف حق الأجيال القادمة',
					revealAr:
						'الاستدامة (Nachhaltigkeit) تجمع بين التوازن البيئي، والعدالة بين الأجيال، وترشيد استهلاك الماء والطاقة.'
				},
				{
					promptAr:
						'لماذا تُعد الصحراء الجزائرية موقعاً استراتيجياً للطاقة الشمسية (Solarenergie / Photovoltaik)؟',
					hintAr: 'فكر في عدد ساعات السطوع الشمسي والمساحات الواسعة وقربها من الأسواق.',
					expectedInput: 'بفضل السطوع الشمسي الكثيف طوال السنة والمساحات الشاسعة المناسبة للمحطات الشمسية',
					revealAr:
						'تمنح ساعات الإشعاع الشمسي المرتفعة (hohe Sonneneinstrahlung) إمكانات ضخمة لإنتاج الكهرباء النظيفة والهيدروجين الأخضر وتطوير الري الفلاحي.'
				},
				{
					promptAr:
						'إلى جانب المشاريع الكبرى، ما الإجراءات اليومية البسيطة التي يطالب بها التلاميذ في نصوص حماية البيئة؟',
					hintAr: 'اذكر ثلاثة أفعال يومية تتعلق بالنفايات والماء والكهرباء والأشجار.',
					expectedInput: 'فرز النفايات وإعادة التدوير (Mülltrennung & Recycling)، الاقتصاد في الماء والكهرباء، والمشاركة في حملات التشجير (Aufforstung)',
					revealAr:
						'تربط نصوص البكالوريا بين سياسات الطاقة النظيفة (Energiewende) والتربية البيئية اليومية (Umweltbewusstsein im Alltag).'
				}
			]
		},
		summary: {
			rulesAr: [
				'محاور النصوص البيئية في 3AS LE: الاحتباس الحراري وتغير المناخ (die Erderwärmung / der Klimawandel)، التلوث (die Luft- und Wasserverschmutzung)، الانتقال الطاقوي (die Energiewende)، مكافحة التصحر (Bekämpfung der Wüstenbildung)، والاقتصاد الدائري (Kreislaufwirtschaft / Recycling).',
				'ثنائية الأسباب والحلول (Ursachen und Lösungen): الأسباب (fossile Brennstoffe, Abgase, Verschwendung, Abholzung)؛ الحلول (Solarkraftwerke, Windkraftanlagen, Aufforstung, öffentliche Verkehrsmittel, Wassersparen).',
				'قراءة الخرائط المفاهيمية والبيانية في النصوص: في البكالوريا غالباً ما يطلب جدول التصنيف الفصل بين „Umweltprobleme / Gefahren“ و„Lösungsmaßnahmen / Umweltschutz“.',
				'صياغة المقترحات البيئية بالألمانية: استعمل أفعال الضرورة والتوصية مثل „man sollte“, „es ist notwendig, ... zu ...“, „wir müssen Ressourcen schonen“.'
			],
			visualSvg: svgGermanGrammarMap({
				title: 'Umweltschutz und Nachhaltigkeit (BAC)',
				rootLabel: 'Verantwortung für die Natur',
				rootSub: 'Saubere Energie, Wasser & Wald',
				branches: [
					{
						label: 'Solarenergie',
						rule: 'Sahara-Sonne sauber nutzen',
						example: 'Strom ohne CO2-Ausstoß'
					},
					{
						label: 'Wind & Wasser',
						rule: 'Erneuerbare Quellen mixen',
						example: 'Versorgung stabil sichern'
					},
					{
						label: 'Recycling',
						rule: 'Müll trennen & sparen',
						example: 'Rohstoffe wiederverwenden'
					},
					{
						label: 'Aufforstung',
						rule: 'Grüner Damm schützt Boden',
						example: 'Wüstenbildung bremsen'
					}
				],
				width: 580
			}),
			visualCaptionAr:
				'المحاور الأربعة للاستدامة وحماية البيئة والطاقات النظيفة في البكالوريا.',
			examples: [
				{
					problemAr:
						'Textfrage: „Welchen Beitrag leistet ein Aufforstungsprojekt wie der Grüne Damm gegen den Klimawandel?“',
					solutionAr:
						'Bäume halten den fruchtbaren Boden fest, bremsen die Ausbreitung der Wüste, speichern Kohlendioxid und verbessern das lokale Mikroklima.'
				},
				{
					problemAr:
						'Meinungsfrage (4–5 Sätze): „Kann ein einzelner Jugendlicher überhaupt etwas für den Umweltschutz tun?“',
					solutionAr:
						'Ja, jeder Einzelne trägt spürbar zum Umweltschutz bei. Wer Wasser beim Zähneputzen spart, Licht ausschaltet, Abfälle trennt und an schulischen Baumpflanzaktionen teilnimmt, verändert sein direktes Umfeld und setzt ein positives Vorbild für andere.'
				}
			],
			watchOutAr:
				'احذر الخلط بين „sparen“ (يقتصد في المال أو الماء أو الطاقة: Wasser sparen) و„retten“ (ينقذ من خطر: die Natur retten) و„schützen“ (يحمي: die Umwelt schützen)! فلكل فعل سياقه الدلالي الدقيق في النصوص.'
		},
		practice: [
			{
				questionAr:
					'Welche Energieformen gehören im Deutschunterricht zu den „erneuerbaren Energien“?',
				options: [
					'Solarenergie, Windkraft und Wasserkraft',
					'Braunkohle, Erdöl und Erdgas',
					'Ausschließlich Steinkohle',
					'Einmalige Wegwerfbatterien'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الشمس والرياح والمياه مصادر متجددة ونظيفة.',
					'خطأ: الفحم والنفط والغاز مصادر أحفورية غير متجددة (fossile Energieträger).',
					'خطأ: الفحم الحجري مصدر أحفوري ملوث.',
					'خطأ: البطاريات ليست مصدر طاقة متجددة بل وسيلة تخزين.'
				],
				explanationAr:
					'الطاقات المتجددة (erneuerbare Energien) هي التي تتجدد طبيعياً ولا تنضب كالطاقة الشمسية والرياح والمياه.'
			},
			{
				questionAr:
					'Welchen Zweck verfolgt die „Aufforstung“ (التشجير) in halbtrockenen Regionen?',
				options: [
					'Sie vergrößert absichtlich die Bodenerosion.',
					'Sie schützt den Boden vor Wüstenbildung, speichert CO2 und fördert die Artenvielfalt.',
					'Sie verhindert die Nutzung von Sonnenlicht für Pflanzen.',
					'Sie ersetzt jede Trinkwasserquelle.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: التشجير يكافح تعرية التربة ولا يزيدها.',
					'ممتاز: الأشجار تثبت التربة وتكافح التصحر وتمتص ثاني أكسيد الكربون.',
					'خطأ: النباتات تعتمد على الضوء في التركيب الضوئي.',
					'خطأ: الغابات تحفظ رطوبة التربة وتدعم دورة الماء.'
				],
				explanationAr:
					'تؤدي مشاريع التشجير دوراً حاسماً في تثبيت التربة، وصد التصحر (Wüstenbildung)، وتحسين المناخ المحلي.'
			},
			{
				questionAr:
					'Welcher deutsche Satz drückt das Gebot der „Nachhaltigkeit“ sprachlich exakt aus?',
				options: [
					'Wir verbrauchen heute alles, ohne an die nächste Generation zu denken.',
					'Wir nutzen natürliche Ressourcen so sparsam, dass sie auch künftigen Generationen erhalten bleiben.',
					'Wir verbrennen wertvolle Rohstoffe möglichst schnell.',
					'Wir werfen wiederverwertbare Materialien ungetrennt weg.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الاستهلاك الجائر يناقض الاستدامة.',
					'صحيح: جوهر Nachhaltigkeit هو الحفاظ على الموارد للأجيال القادمة.',
					'خطأ: تبديد الموارد يتنافى مع الاقتصاد المستدام.',
					'خطأ: عدم فرز النفايات يعيق إعادة التدوير.'
				],
				explanationAr:
					'تتحقق الاستدامة عبر ترشيد استغلال الموارد (sparsame Nutzung) بما يضمن استمرارها للأجيال المقبلة.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 3: Finalsätze (um...zu / damit), Konzessivsätze & Konsekutivsätze
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_lesson_3as_le_t2_finalsatz_konzessivsatz_konsekutive',
		slug: 'ger-3as-le-t2-finalsatz-konzessivsatz-konsekutive',
		grade: '3as_le',
		yearSubjectId: 794,
		trimesterId: 't2',
		sequenceId: 'einheit2',
		sequenceTitleAr:
			'المحور الثاني: العلوم والتكنولوجيا، حماية البيئة والجمل المركّبة (Wissenschaft, Umwelt & Komplexe Nebensätze)',
		order: 3,
		titleAr:
			'الجمل الغائية والاعتراضية والنتائجية (Finalsätze: um...zu / damit, Konzessivsätze: obwohl / trotzdem & Konsekutivsätze: sodass)',
		objectives: [
			'التمييز الدقيق بين الجملة الغائية بـ „um ... zu + Infinitiv“ (عند تطابق الفاعل) و„damit + Nebensatz“ (عند اختلاف الفاعل أو تطابقه)',
			'إتقان بناء الجمل الاعتراضية (Konzessivsätze) باستخدام „obwohl / obgleich“ (نهاية الفعل في الجملة التابعة) مقابل „trotzdem“ (جملة رئيسية مع قلب الفاعل والفعل) و„trotz + Genitiv“',
			'ضبط الجمل النتائجية (Konsekutivsätze) باستخدام „sodass / so ..., dass“ مقابل „deshalb / daher / folglich“ دون أخطاء في موضع الفعل (Verbposition)'
		],
		keywordsAr: [
			'Finalsatz (um...zu / damit)',
			'Konzessivsatz (obwohl / trotzdem)',
			'Konsekutivsatz (sodass / deshalb)',
			'Subjektgleichheit (تطابق الفاعل)',
			'Verb-Endstellung (الفعل في النهاية)',
			'Inversion (القلب في الجملة الرئيسية)'
		],
		discover: {
			scenarioAr:
				'تُشكّل الجمل التابعة المعقدة (Finalsätze, Konzessivsätze, Konsekutivsätze) العمود الفقري لأسئلة التراكيب والتحويل في البكالوريا؛ فمعرفة ما إذا كان الرابط يطلب „Nebensatz“ (الفعل المصرف في الأخير) أو „Hauptsatz“ (الفعل في الموقع الثاني) أو „Infinitivsatz“ تضمن لك نقاط القواعد والتعبير!',
			svg: svgGermanGrammarMap({
				title: 'Finalsätze, Konzessiv & Konsekutiv',
				rootLabel: 'Komplexe Satzverknüpfung',
				rootSub: 'Bedeutung und Verbstellung genau beachten',
				branches: [
					{
						label: 'um ... zu',
						rule: 'Gleiches Subjekt + Inf.',
						example: 'Sie lernt, um zu bestehen.'
					},
					{
						label: 'damit',
						rule: 'Subjekte oft verschieden',
						example: 'Er hilft, damit wir siegen.'
					},
					{
						label: 'obwohl / trotzdem',
						rule: 'NS (Ende) vs. HS (Pos. 2)',
						example: 'Obwohl es regnet, geht er.'
					},
					{
						label: 'sodass / deshalb',
						rule: 'Folge: NS vs. HS-Adverb',
						example: 'Er übt, sodass er sicher ist.'
					}
				],
				width: 580
			}),
			steps: [
				{
					promptAr:
						'قارن بين: (1) „Wir sparen Wasser, um die Umwelt zu schützen.“ و (2) „Die Schule pflanzt Bäume, damit die Schüler Schatten haben.“ متى نستخدم „um...zu“ ومتى يلزم „damit“؟',
					hintAr: 'راقب فاعل الجملة الأولى وفاعل الجملة الثانية في كل مثال.',
					expectedInput: 'نستخدم „um ... zu + Infinitiv“ عند تطابق الفاعل (نفس الفاعل)، و„damit“ عند اختلاف الفاعلين (أو لذكر الفاعل)',
					revealAr:
						'إذا كان الفاعل واحداً („wir“ يحفظ الماء و„wir“ يحمي البيئة) فـ „um ... zu + Infinitiv“ هو الخيار النموذجي (ونحذف الفعل الناقص مثل wollen/möchten). وإذا اختلف الفاعلان („die Schule“ مقابل „die Schüler“) وجب استعمال „damit“!'
				},
				{
					promptAr:
						'أين يقع الفعل المصرف في „Obwohl die Technik teuer ist, lohnt sich Solarenergie“ مقابل „Die Technik ist teuer; trotzdem lohnt sich Solarenergie“؟',
					hintAr: 'لاحظ أن „obwohl“ أداة ربط فرعية (Subjunktion)، بينما „trotzdem“ ظرف ربط (Konjunktionaladverb) في جملة رئيسية.',
					expectedInput: 'مع „obwohl“ يأتي الفعل المصرف في نهاية الجملة التابعة (ist)، ومع „trotzdem“ يأتي الفعل مباشرة في الموقع الثاني (lohnt sich)',
					revealAr:
						'فرق حاسم في البكالوريا: obwohl / sodass / damit (فعل في النهاية)؛ بينما trotzdem / deshalb / folglich تأخذ الموقع 1 في الجملة الرئيسية فيتبعها الفعل مباشرة في الموقع 2 (Inversion)!'
				},
				{
					promptAr:
						'كيف نضع „zu“ مع الفعل المنفصل (trennbares Verb) داخل تركيب „um ... zu“؟ مثال: „recyceln / einsammeln / vorbereiten“.',
					hintAr: 'تذكّر موضع „zu“ بين البادئة المنفصلة وجذر الفعل.',
					expectedInput: 'تدخل „zu“ بين البادئة المنفصلة وجذر الفعل في كلمة واحدة: einzusammeln, vorzubereiten',
					revealAr:
						'الأفعال المنفصلة تأخذ „zu“ في الوسط: einsammeln -> einzusammeln، abschalten -> abzuschalten؛ أما غير المنفصلة فتأتي „zu“ قبلها منفصلة: zu erforschen, zu verstehen.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الجمل الغائية (Finalsätze — الهدف): السؤال بـ „Wozu? / Zu welchem Zweck?“. إذا اتحد الفاعل: „um ... zu + Infinitiv“ (ونحذف wollen/sollen/möchten عند التحويل!). إذا اختلف الفاعلان: „damit + Subjekt + ... + konjugiertes Verb am Ende“. التحويل الاسمي: „zu / zum / zur + Nomen im Dativ“.',
				'الجمل الاعتراضية (Konzessivsätze — التناقض غير المتوقع): „obwohl / obgleich“ (جملة تابعة: الفعل في النهاية)؛ „trotzdem / dennoch“ (جملة رئيسية: ظرف في الموقع 1 + الفعل في الموقع 2 + الفاعل)؛ التركيب الاسمي: „trotz + Genitiv“ (مثل: trotz des hohen Preises).',
				'الجمل النتائجية (Konsekutivsätze — النتيجة): „sodass“ أو „so + Adjektiv/Adverb ..., dass“ (جملة تابعة: الفعل في النهاية)؛ مقابل „deshalb / daher / deswegen / folglich“ (جملة رئيسية: الفعل في الموقع 2!).',
				'قاعدة الفاصلة (Kommasetzung): في الألمانية تُفصل كل جملة تابعة (um...zu, damit, obwohl, sodass, dass) بفاصلة إلزامية عن الجملة الرئيسية.'
			],
			visualSvg: svgGermanConjugationChart({
				title: 'Satzstellung der Konnektoren (BAC)',
				subtitle: 'Nebensatz vs. Hauptsatz vs. Nominalstil',
				columns: [
					{
						header: 'Nebensatz (Verb-Ende)',
						rule: 'damit / obwohl / sodass',
						examples: '..., obwohl es viel Arbeit kostet.'
					},
					{
						header: 'Hauptsatz (Pos. 2)',
						rule: 'trotzdem / deshalb / folglich',
						examples: '...; trotzdem spart man Zeit.'
					},
					{
						header: 'Infinitiv / Nomen',
						rule: 'um...zu / trotz+Gen / zur+Dat',
						examples: 'trotz des Regens / zur Pflege'
					}
				],
				width: 560
			}),
			visualCaptionAr:
				'مقارنة موضع الفعل المصرف بين الجمل التابعة، الجمل الرئيسية، والتحويل الاسمي.',
			examples: [
				{
					problemAr:
						'Finalsatz bilden (gleiches Subjekt): „Die Schülerin wiederholt jeden Tag ihre Lektionen. Sie will das Abitur mit Auszeichnung bestehen.“',
					solutionAr:
						'Die Schülerin wiederholt jeden Tag ihre Lektionen, um das Abitur mit Auszeichnung zu bestehen. (Das Modalverb „will“ entfällt in der „um...zu“-Konstruktion).'
				},
				{
					problemAr:
						'Konzessivsatz umformen: „Trotz der langen Trockenheit gedeihen die Dattelpalmen in der Oase.“ (Formen Sie mit „obwohl“ um!)',
					solutionAr:
						'Obwohl es lange trocken ist (oder: Obwohl eine lange Trockenheit herrscht), gedeihen die Dattelpalmen in der Oase.'
				}
			],
			watchOutAr:
				'إياك أن تضع „will / möchte / kann“ داخل „um ... zu“! فالجملة: „... um bestehen zu wollen“ خاطئة؛ نحذف „will/möchte“ ونضع المصدر الأساسي فقط: „... um zu bestehen“! وإذا وجدت „trotzdem“ فاحذر وضع الفعل في آخر الجملة.'
		},
		practice: [
			{
				questionAr:
					'Welche Finalkonstruktion ist bei zwei verschiedenen Subjekten grammatikalisch richtig: „Der Lehrer erklärt die Regel deutlich, .......... alle Lernenden sie sofort verstehen“?',
				options: [
					'um ... zu',
					'damit',
					'obwohl',
					'trotzdem'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: فاعل الجملة الأولى (der Lehrer) يختلف عن فاعل الثانية (alle Lernenden)، لذا يمتنع um...zu.',
					'صحيح: لاختلاف الفاعلين نستخدم أداة الغاية „damit“ مع فعل مصرف في النهاية.',
					'خطأ: obwohl تفيد الاعتراض لا الغاية.',
					'خطأ: trotzdem ظرف اعتراض وليس أداة غاية.'
				],
				explanationAr:
					'عند اختلاف الفاعلين في الجملة الغائية نستخدم „damit“ وجوباً.'
			},
			{
				questionAr:
					'Welcher Satz verwendet das Konzessivadverb „trotzdem“ mit korrekter deutscher Wortstellung?',
				options: [
					'Die Solarpanels kosten Geld; trotzdem sie auf lange Sicht sehr rentabel sind.',
					'Die Solarpanels kosten Geld; trotzdem sind sie auf lange Sicht sehr rentabel.',
					'Die Solarpanels kosten Geld, trotzdem sind sie rentabel sein.',
					'Trotzdem die Solarpanels Geld kosten, sind sie rentabel.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: وضع الفعل „sind“ في النهاية خطأ شائع مع trotzdem؛ فـ trotzdem جملة رئيسية.',
					'ممتاز: trotzdem (الموقع 1) + الفعل المصرف „sind“ (الموقع 2) + الفاعل „sie“.',
					'خطأ: تكرار غير صحيح للفعل.',
					'خطأ: في الألمانية الفصحى تُستعمل „obwohl“ هنا لا „trotzdem“.'
				],
				explanationAr:
					'الظرف „trotzdem“ يبدأ جملة رئيسية فيأتي الفعل المصرف في الموقع الثاني مباشرة بعده.'
			},
			{
				questionAr:
					'Wie lautet die richtige „um ... zu“-Form mit dem trennbaren Verb „einsparen“?',
				options: [
					'Wir schalten ungenutzte Geräte ab, um wertvolle Energie zu einsparen.',
					'Wir schalten ungenutzte Geräte ab, um wertvolle Energie einzusparen.',
					'Wir schalten ungenutzte Geräte ab, damit wertvolle Energie einzusparen.',
					'Wir schalten ungenutzte Geräte ab, um wertvolle Energie einsparen.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: في الأفعال المنفصلة تدخل „zu“ بعد البادئة „ein-“ لا قبلها.',
					'صحيح: الفعل المنفصل „einsparen“ يصبح „einzusparen“ في كلمة واحدة.',
					'خطأ: „damit“ لا تأخذ مصدرية بـ zu.',
					'خطأ: لا بد من وجود „zu“ في تركيب um ... zu.'
				],
				explanationAr:
					'في الأفعال المنفصلة مثل einsparen / abschalten / vorbereiten تتوسط „zu“ بين البادئة وجذر الفعل: einzusparen.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 4: Indirekte Rede (dass / Konjunktiv I) & Relativsätze mit Präpositionen
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_lesson_3as_le_t2_indirekte_rede_relativsaetze',
		slug: 'ger-3as-le-t2-indirekte-rede-relativsaetze',
		grade: '3as_le',
		yearSubjectId: 794,
		trimesterId: 't2',
		sequenceId: 'einheit2',
		sequenceTitleAr:
			'المحور الثاني: العلوم والتكنولوجيا، حماية البيئة والجمل المركّبة (Wissenschaft, Umwelt & Komplexe Nebensätze)',
		order: 4,
		titleAr:
			'الكلام المنقول وجمل الموصول بحروف الجر (Indirekte Rede mit dass / Konjunktiv I & Komplexe Relativsätze mit Präpositionen)',
		objectives: [
			'تحويل الكلام المباشر (direkte Rede) إلى غير المباشر (indirekte Rede) عبر „dass“ وأدوات الاستفهام غير المباشرة („ob“ / W-Wörter) مع تغيير الضمائر والظروف الزمنية',
			'استعمال صيغة „Konjunktiv I“ في التقارير الصحفية والعلمية (er sei, er habe, er könne, er werde) واللجوء إلى „Konjunktiv II / würde“ عند تطابق الصيغة مع الحاضر الإخباري (Indikativ)',
			'بناء جمل الموصول المعقدة (Relativsätze) بحالة الإضافة (dessen / deren) وبحروف الجر (in dem, mit denen, über die) وبـ „wo(r) + Präposition“ بعد الكلمات غير المحددة'
		],
		keywordsAr: [
			'Indirekte Rede (الكلام المنقول)',
			'Konjunktiv I (sei, habe, könne)',
			'Indirekte Frage (ob / W-Wort)',
			'Relativpronomen (dessen / deren)',
			'Präposition + Relativpronomen',
			'Relativadverb (wofür / worüber)'
		],
		discover: {
			scenarioAr:
				'في النصوص الصحفية والعلمية للبكالوريا، كثيراً ما ينقل الكاتب تصريحات باحثين أو تقارير تقنية بصيغة الكلام المنقول (Indirekte Rede / Konjunktiv I)، كما يستخدم جمل الموصول الدقيقة (Relativsätze mit Präpositionen und Genitiv) لتعريف المصطلحات العلمية.',
			svg: svgGermanTenseTimeline({
				title: 'Indirekte Rede und Konjunktiv I',
				tenseName: 'Berichtsstil im BAC',
				formula: 'Subjekt + erklärt, dass ... (Verb Ende) / Konj. I',
				activeZone: 'present',
				example: 'Die Forscherin betont, dass das Verfahren zuverlässig sei.',
				markers: 'sagen, berichten, betonen, erklären, fragen ob/wie'
			}),
			steps: [
				{
					promptAr:
						'قارن: „Der Ingenieur sagt: Ich prüfe heute die neue Anlage.“ -> كيف تصبح في الكلام المنقول؟ (الضمير والظرف والصيغة)',
					hintAr: 'يتغير „ich“ إلى „er“، و„heute“ إلى „an jenem Tag“ إذا لزم السياق، ويمكن استعمال „dass ... prüfe / prüfen würde“.',
					expectedInput: 'Der Ingenieur sagt, dass er heute (oder an jenem Tag) die neue Anlage prüfe (oder prüft).',
					revealAr:
						'في الكلام المنقول نغيّر الضمائر الشخصية والملكية بما يناسب المتكلم الجديد، ونحافظ على زمن الحدث عبر Konjunktiv I (المشتق من جذع المصدر + -e, -est, -e, -en, -et, -en).'
				},
				{
					promptAr:
						'لماذا نستعمل „ob“ في „Sie fragt, ob das Labor geöffnet sei“ بينما نحتفظ بأداة السؤال في „Sie fragt, wann das Labor öffne“؟',
					hintAr: 'ميّز بين السؤال المغلق (Ja/Nein-Frage) والسؤال المفتوح (W-Frage).',
					expectedInput: 'الأسئلة المغلقة (Ja/Nein-Fragen) تأخذ „ob“، أما أسئلة الاستفهام (W-Fragen) فتحتفظ بأداة الاستفهام مثل wann/wie/warum',
					revealAr:
						'في كلتا الحالتين تكون الجملة الاستفهامية غير المباشرة جملة تابعة (Nebensatz) يوضع فيها الفعل المصرف في النهاية مع نقطة في آخر الجملة بدل علامة الاستفهام!'
				},
				{
					promptAr:
						'في جملة الموصول: „Das ist das Labor, in .......... wir forschen“ و„Die Forscher, .......... Ideen überzeugen, gewinnen Preise.“ ما اسما الموصول الصحيحان؟',
					hintAr: 'في الأولى: „in“ + Dativ للمحايد „das Labor“؛ وفي الثانية: جمع مضاف إليه (Genitiv Plural) قبل „Ideen“.',
					expectedInput: 'in dem (لأن in + das Labor في السكون = Dativ neutrum) و deren (لأنها Genitiv للجمع „die Forscher“)',
					revealAr:
						'قاعدة جمل الموصول الثابتة: جنس وعدد اسم الموصول يأتي من الاسم المرجعي (Bezugswort)، أما حالة الإعراب (Kasus) فتأتي من وظيفته أو حرف الجر داخل جملة الموصول!'
				}
			]
		},
		summary: {
			rulesAr: [
				'بناء Konjunktiv I: جذع المصدر + نهايات (-e, -est, -e, -en, -et, -en)؛ وأهم صيغه في البكالوريا هي الضمير الغائب المفرد (er/sie/es): sei (sein), habe (haben), werde (werden), könne (können), müsse (müssen), solle (sollen), wisse (wissen), gebe (geben).',
				'قاعدة الاستبدال في Konjunktiv I (Ersatzregel): إذا تطابقت صيغة Konjunktiv I مع المضارع الإخباري (وهذا يحدث غالباً مع الجمع „sie/wir“ مثل „sie haben = sie haben“)، نستعمل صيغة Konjunktiv II („sie hätten, sie wären, sie würden + Infinitiv“). وللتعبير عن الماضي في الكلام المنقول نستعمل „sei/habe + Partizip II“ (مثل: er habe geforscht / sei gereist).',
				'الجمل الاستفهامية والطلبية المنقولة: Ja/Nein-Frage -> „ob“؛ W-Frage -> „wer/was/wann/wo/warum/wie“؛ الأمر والنصيحة -> „sollen / mögen“ في Konjunktiv I (مثل: Der Arzt sagte, der Patient solle viel trinken).',
				'جمل الموصول المعقدة: المضاف إليه (Genitiv) للمذكر والمحايد „dessen“ وللمؤنث والجمع „deren“؛ مع حروف الجر يسبق حرف الجر اسم الموصول („das Projekt, an dem ...“, „die Methode, mit der ...“, „die Ziele, für die ...“). بعد الضمائر غير المحددة (alles, etwas, nichts, vieles, das) نستعمل „was“ أو „wo(r)+Präposition“ (مثل: alles, worüber wir sprachen).'
			],
			visualSvg: svgGermanGrammarMap({
				title: 'Indirekte Rede & Relativsätze (BAC)',
				rootLabel: 'Bericht & Präzisierung im Satz',
				rootSub: 'Konjunktiv I und Relativpronomen mit Kasus',
				branches: [
					{
						label: 'dass / ob / W-Wort',
						rule: 'Nebensatz, Verb am Ende',
						example: 'Sie fragt, ob er Zeit habe.'
					},
					{
						label: 'Konjunktiv I',
						rule: 'sei, habe, könne, werde',
						example: 'Bei Gleichheit: hätten/wären'
					},
					{
						label: 'Genitiv-Relativ',
						rule: 'dessen (m/n) / deren (f/Pl)',
						example: 'die Stadt, deren Erbe lebt'
					},
					{
						label: 'Präp. + Relativ',
						rule: 'Kasus nach Präposition',
						example: 'das Buch, in dem ich lese'
					}
				],
				width: 580
			}),
			visualCaptionAr:
				'ملخص قواعد الكلام المنقول وجمل الموصول بالجر والإضافة لبكالوريا اللغات الأجنبية.',
			examples: [
				{
					problemAr:
						'Indirekte Rede (Direkt -> Indirekt): Die Wissenschaftlerin erklärte: „Wir haben neue Solarzellen getestet, und sie liefern stabile Energie.“',
					solutionAr:
						'Die Wissenschaftlerin erklärte, sie hätten neue Solarzellen getestet und diese würden stabile Energie liefern. (Ersatz durch Konjunktiv II „hätten / würden liefern“, da Plural „haben/liefern“ mit dem Indikativ identisch ist).'
				},
				{
					problemAr:
						'Relativsatz mit Präposition verbinden: „Das ist die neue Technik. Viele junge Ingenieure interessieren sich für diese Technik.“',
					solutionAr:
						'Das ist die neue Technik, für die sich viele junge Ingenieure interessieren. („sich interessieren für“ + Akkusativ -> feminin „die“).'
				}
			],
			watchOutAr:
				'انتبه لعدم وضع فاصلة أو تغيير جنس „dessen / deren“ حسب الاسم الذي بعده! فالمحدد لـ „dessen“ أو „deren“ هو المالك السابق لها (Der Autor, dessen Buch... / Die Autorin, deren Buch... / Die Bücher, deren Themen...)!'
		},
		practice: [
			{
				questionAr:
					'Welche Form des Konjunktivs I steht in der 3. Person Singular (er/sie/es) des Verbs „sein“ in der indirekten Rede?',
				options: [
					'ist',
					'sei',
					'wäre',
					'seid'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: „ist“ صيغة الحاضر الإخباري (Indikativ).',
					'صحيح: „sei“ هي الصيغة القياسية والوحيدة في Konjunktiv I للغائب المفرد من sein.',
					'خطأ: „wäre“ صيغة Konjunktiv II تُستعمل للشرط غير الواقعي أو عند تطابق Konjunktiv I مع Indikativ (وليس هنا لأن sei متميزة).',
					'خطأ: „seid“ صيغة المخاطب الجمع في Indikativ/Imperativ.'
				],
				explanationAr:
					'الفعل sein فريد في Konjunktiv I لأن صيغه متميزة واضحة: ich sei, du seist, er/sie/es sei.'
			},
			{
				questionAr:
					'Welches Relativpronomen ergänzt den Satz korrekt: „Die Professorin, .......... Artikel wir gestern besprochen haben, leitet das Forschungszentrum“?',
				options: [
					'dessen',
					'deren',
					'denen',
					'der'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: „dessen“ تُستعمل للمالك المذكر أو المحايد لا للمؤنث „Die Professorin“.',
					'ممتاز: المالك هو „Die Professorin“ (مؤنث مفرد)، لذلك نختار Genitiv „deren“ بصرف النظر عن جنس „Artikel“.',
					'خطأ: „denen“ صيغة Dativ Plural ولا تعبر عن الإضافة.',
					'خطأ: „der“ ليست صيغة الإضافة الملكية هنا.'
				],
				explanationAr:
					'تتبع „dessen“ (مذكر/محايد) و„deren“ (مؤنث/جمع) جنس وعدد الاسم المرجعي السابق (die Professorin).'
			},
			{
				questionAr:
					'Wie lautet der korrekte Relativsatz mit Präposition: „Die Methode (f.), .......... wir das Wasser reinigen, ist umweltfreundlich“ (durch + Akk. / mit + Dat.)?',
				options: [
					'mit der',
					'mit die',
					'mit dem',
					'mit dessen'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: حرف الجر „mit“ يطلب Dativ، وكلمة „Methode“ مؤنث مفرد، فالمجرور المؤنث هو „der“.',
					'خطأ: „mit“ لا يجر بالمنصوب „die“.',
					'خطأ: „dem“ للمذكر والمحايد لا للمؤنث.',
					'خطأ: „dessen“ للإضافة لا بعد حرف الجر „mit“.'
				],
				explanationAr:
					'حرف الجر „mit“ يستوجب حالة المجرور (Dativ)، ومع الاسم المؤنث „die Methode“ يصبح ضمير الموصول „der“: „mit der“.'
			}
		]
	}
];
