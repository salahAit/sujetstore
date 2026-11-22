import type { GermanInteractiveLessonData } from '../../types';
import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';
import {
	svgGermanGrammarMap,
	svgGermanTenseTimeline,
	svgGermanWritingBlueprint
} from '../../svg-german';

export const LESSONS_2AS_LE_T3: GermanInteractiveLessonData[] = [
	{
		id: 'ger_lesson_2as_le_t3_dach_laender_reisen',
		slug: 'ger-2as-le-t3-dach-laender-reisen',
		grade: '2as_le',
		yearSubjectId: 783,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr:
			'المجال الثالث: البلدان الناطقة بالألمانية والسفر والتكنولوجيا والتعبير الكتابي (D-A-CH-Länder, Reisen, Technik & Textproduktion)',
		order: 1,
		titleAr:
			'البلدان الناطقة بالألمانية والسفر والحوار المتوسطي (D-A-CH-Länder, Reisen & Mittelmeer)',
		objectives: [
			'التعرف الجغرافي والثقافي على البلدان الناطقة بالألمانية (D-A-CH: Deutschland, Österreich, die Schweiz) وعواصمها وأنهارها الكبرى وصلتها بحوض البحر الأبيض المتوسط',
			'إتقان معجم السفر والرحلات التعليمية والمواصلات النظيفة (Reise, Bahnhof, Fahrkarte, Gepäck, Sehenswürdigkeiten) مع إبراز المعالم الجزائرية وتراث الجغرافيين كالإدريسي',
			'استعمال حروف الجر المحلية الخاصة بالبلدان والاتجاهات ووسائل النقل (nach Deutschland, in die Schweiz, ans Meer, mit dem Zug, auf die Reise)'
		],
		keywordsAr: [
			'D-A-CH-Länder',
			'Deutschland / Österreich / Schweiz',
			'Reisen & Landeskunde',
			'lokale Präpositionen (nach / in / ans)',
			'Al-Idrisi & Mittelmeer',
			'البلدان الناطقة بالألمانية'
		],
		discover: {
			scenarioAr:
				'يفتتح أستاذ اللغة الألمانية مشروع الفصل الثالث بخريطة البلدان الناطقة بالألمانية وحوض المتوسط قائلاً: «Deutsch spricht man als Amtssprache vor allem in den drei D-A-CH-Ländern: Deutschland (Hauptstadt Berlin), Österreich (Hauptstadt Wien) und in der Schweiz (Hauptstadt Bern). Vom sonnigen Mittelmeer und Algerien — wo Städte wie die Kasbah von Algier, Tlemcen und das M’Zab-Tal liegen — reist man heute umweltfreundlich mit dem Zug über die Alpen. Schon der große Geograph Al-Idrisi zeichnete genaue Karten für Reisende!» تأمّل الخريطة الصماء المرفقة.',
			svg: renderLessonIllustration('ger_01_deutschsprachige_laender_stummkarte', {
				lang: 'de',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'ماذا تعني الأحرف D-A-CH على الخريطة، وما عاصمة كل بلد من هذه البلدان الثلاثة؟',
					hintAr: 'D = Deutschland، A = Austria (Österreich)، CH = Confoederatio Helvetica (Schweiz).',
					expectedInput: 'D = ألمانيا (برلين)، A = النمسا (فيينا)، CH = سويسرا (برن)',
					revealAr:
						'يرمز اختصار D-A-CH إلى الدول الثلاث الرئيسية الناطقة بالألمانية في وسط أوروبا: Deutschland وعاصمتها Berlin، وÖsterreich وعاصمتها Wien، وdie Schweiz وعاصمتها Bern (حيث تتعدد اللغات: الألمانية والفرنسية والإيطالية والرومانشية).'
				},
				{
					promptAr:
						'لاحظ استعمال حروف الجر المحلية في النص: «in der Schweiz» و«nach Deutschland» و«mit dem Zug». لماذا تأخذ «Schweiz» أداة التعريف وحرف الجر in، بينما لا تأخذ «Deutschland» و«Algerien» أداة؟',
					hintAr: 'هل اسم البلد «die Schweiz» مؤنث بأداة، أم محايد بدون أداة؟',
					expectedInput: 'البلدان ذات الأداة مثل die Schweiz تأخذ in (in die / in der)، والبلدان بدون أداة مثل Deutschland و Algerien تأخذ nach للاتجاه و in للسكون',
					revealAr:
						'قاعدة السفر مع أسماء الدول: الدول المحايدة بدون أداة (Deutschland, Österreich, Algerien) تأخذ «nach» للاتجاه (Ich reise nach Deutschland) و«in» للموقع (Ich bin in Algerien). أما الدول ذات الأداة مثل «die Schweiz» فتحتفظ بأداتها: للاتجاه «in die Schweiz» (Akk.) وللموقع «in der Schweiz» (Dat.).'
				},
				{
					promptAr:
						'اذكر ثلاثة معالم جزائرية أو شخصيات علمية تاريخية تصل الثقافة الجزائرية بعالم الجغرافيا والأسفار.',
					hintAr: 'انظر في النص إلى المعالم والعالم الجغرافي المذكور.',
					expectedInput: 'القصبة بالجزائر، الجامع الكبير بتلمسان، وادي ميزاب بغرداية، والجغرافي الإدريسي',
					revealAr:
						'تزخر الجزائر بمعالم حضارية متميزة للزيارة العلمية والثقافية مثل قصبة الجزائر (Kasbah von Algier)، والجامع الكبير بتلمسان، ووادي ميزاب بغرداية (M’Zab-Tal)، وجسور قسنطينة، إلى جانب التراث العلمي لرحالة وجغرافيي الحضارة الإسلامية مثل الإدريسي (Al-Idrisi) وابن بطوطة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'جغرافية بلدان D-A-CH: ألمانيا (Deutschland: 16 ولاية اتحادية، العاصمة Berlin، أنهارها der Rhein و die Elbe)؛ النمسا (Österreich: جمهورية ألبية، العاصمة Wien، نهر die Donau)؛ سويسرا (die Schweiz: دولة جبلية في جبال الألب، العاصمة Bern، أكبر مدنها Zürich).',
				'معجم السفر والسياحة الهادفة (Reisen & Landeskunde): der Bahnhof (محطة القطار)، der Flughafen (المطار)، die Fahrkarte (تذكرة السفر)، der Koffer / das Gepäck (الحقيبة/الأمتعة)، die Jugendherberge (بيت الشباب)، die Unterkunft (الإقامة)، die Sehenswürdigkeit (المعلم السياحي)، die Landkarte (الخريطة)، die Buchung (الحجز).',
				'حروف الجر للوجهات والوسائل (Lokale & modale Präpositionen): الدول والمدن بدون أداة: nach Berlin / nach Österreich / nach Algerien (اتجاه) و in Berlin / in Algerien (موقع)؛ الدول بأداة (die Schweiz): in die Schweiz (اتجاه) و in der Schweiz (موقع)؛ البحار والجبال: ans Mittelmeer (إلى البحر المتوسط) / am Mittelmeer (على شاطئه)، in die Alpen (نحو الألب) / in den Alpen (فيها)؛ وسائل النقل: mit dem Zug / mit dem Bus / mit dem Schiff / zu Fuß (سيراً على الأقدام).',
				'الجسور الحضارية والعلمية: إبراز قيمة السفر لطلب العلم واكتشاف العمارة الإسلامية والطبيعة، واقتفاء منهج الإدريسي وابن بطوطة في الدقة والاحترام المتبادل.'
			],
			visualSvg: svgGermanGrammarMap({
				title: 'D-A-CH-Länder & Reisepräpositionen (2AS LE)',
				rootLabel: 'Wohin? vs Wo? & Verkehrsmittel',
				rootSub: 'Deutschland (Berlin) | Österreich (Wien) | Schweiz (Bern)',
				width: 580,
				branches: [
					{
						label: 'Ohne Artikel',
						rule: 'Wohin: nach | Wo: in',
						example: 'nach Berlin / in Algerien'
					},
					{
						label: 'Mit Artikel (die)',
						rule: 'Wohin: in die | Wo: in der',
						example: 'in die Schweiz / in der'
					},
					{
						label: 'Meer & Gebirge',
						rule: 'ans Meer / in die Berge',
						example: 'am Mittelmeer / in Alpen'
					},
					{
						label: 'Verkehrsmittel',
						rule: 'mit + Dativ | zu Fuß',
						example: 'mit dem Zug / Bus fahren'
					}
				]
			}),
			visualCaptionAr: 'خريطة حروف الجر المحلية للبلدان الناطقة بالألمانية ووسائل السفر',
			examples: [
				{
					problemAr:
						'Ergänze die richtige Präposition (mit Artikel falls nötig): «a) Nächsten Sommer fliegt Salma ...... Deutschland und besucht eine Ausstellung ...... Berlin. b) Dann reist sie ...... dem Zug weiter ...... Schweiz und wandert ...... Alpen.»',
					solutionAr:
						'«a) nach Deutschland (اتجاه لبلد بدون أداة) / in Berlin (موقع داخل مدينة) | b) mit dem Zug (وسيلة نقل + Dativ) / in die Schweiz (اتجاه لبلد مؤنث بأداة) / in den Alpen (موقع في جبال جمع + Dativ)»'
				},
				{
					problemAr:
						'Nenne jeweils die Hauptstadt und den deutschen Namen der drei D-A-CH-Länder sowie zwei algerische Kulturstätten.',
					solutionAr:
						'«D-A-CH: Deutschland (Berlin), Österreich (Wien), die Schweiz (Bern). | Algerien: die Kasbah von Algier, das M’Zab-Tal in Ghardaïa, die Große Moschee von Tlemcen.»'
				}
			],
			watchOutAr:
				'احذر من الفخ الكلاسيكي مع «die Schweiz»: لا نقول أبداً «nach Schweiz» أو «nach die Schweiz»! لأن «die Schweiz» تحمل أداة تعريف مؤنثة فتأخذ دائماً «in die Schweiz» عند السفر إليها (Wohin?) و«in der Schweiz» عند الإقامة فيها (Wo?). وكذلك نقول «zu Fuß gehen» (سيراً على الأقدام) وليس «mit dem Fuß»!'
		},
		practice: [
			{
				questionAr:
					'Welche Präpositionen ergänzen die Reisebeschreibung genau? «Wir fahren zuerst ...... Zug ...... Wien und reisen dann weiter ...... Schweiz, um drei Tage ...... Bergen zu bleiben.»',
				options: [
					'mit dem / nach / nach / in die',
					'mit dem / nach / in die / in den',
					'durch den / in / in der / auf den',
					'mit der / zu / in die / in die'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: «die Schweiz» تأخذ in die للاتجاه، والبقاء في الجبال (Wo? + Plural) يأخذ in den Bergen.',
					'ممتاز! mit dem Zug (Dativ)، nach Wien (مدينة بدون أداة)، in die Schweiz (اتجاه لدولة بأداة)، in den Bergen (موقع في جمع + Dativ).',
					'خطأ: للوجهة نحو المدن نستعمل nach وليس in.',
					'خطأ: Zug مذكر (mit dem Zug) و bleiben يصف موقعاً ساكناً (Wo? -> Dativ: in den Bergen).'
				],
				explanationAr:
					'المدينة تأخذ nach، والدولة ذات الأداة المؤنثة تأخذ in die (Wohin?)، والموقع الجمع مع bleiben يأخذ Dativ Plural (in den Bergen).'
			},
			{
				questionAr:
					'Welche Zuordnung zwischen den drei D-A-CH-Ländern und ihren Hauptstädten ist völlig korrekt?',
				options: [
					'Deutschland: München | Österreich: Salzburg | Schweiz: Zürich',
					'Deutschland: Berlin | Österreich: Wien | Schweiz: Bern',
					'Deutschland: Hamburg | Österreich: Wien | Schweiz: Genf',
					'Deutschland: Berlin | Österreich: Graz | Schweiz: Basel'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: ميونخ وسالزبورغ وزيورخ مدن كبرى لكنها ليست العواصم الاتحادية.',
					'صحيح! برلين عاصمة ألمانيا، وفيينا عاصمة النمسا، وبرن عاصمة سويسرا.',
					'خطأ: هامبورغ وجنيف ليستا العاصمتين الرسميتين.',
					'خطأ: غراتس وبازل ليستا العاصمتين الرسميتين.'
				],
				explanationAr:
					'العواصم الرسمية لفضاء D-A-CH هي Berlin (ألمانيا)، Wien (النمسا)، وBern (سويسرا).'
			},
			{
				questionAr:
					'Welcher Satz nennt korrekt ein algerisches Kulturerbe und verwendet die Präposition «am» oder «im» richtig?',
				options: [
					'Algier liegt direkt am Mittelmeer, und die historische Kasbah steht im Herzen der Hauptstadt.',
					'Algier liegt direkt ans Mittelmeer, und die historische Kasbah steht ins Herz der Hauptstadt.',
					'Tlemcen liegt am Westen Algeriens und hat eine große Bibliothek nach Algier.',
					'Das M’Zab-Tal befindet sich in die Sahara und liegt mit dem Zug neben das Meer.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! الفعل liegen (سكون: Wo?) يطلب Dativ: am (= an dem) Mittelmeer و im (= in dem) Herzen.',
					'خطأ: ans و ins تستعملان للحركة والاتجاه (Wohin?) لا للموقع الجغرافي الثابت (liegen).',
					'خطأ: للجهة الجغرافية نقول im Westen وليس am Westen.',
					'خطأ: befinden sich يطلب Dativ (in der Sahara وليس in die Sahara).'
				],
				explanationAr:
					'الأفعال الجغرافية الثابتة مثل liegen و sich befinden تطلب حالة الجر (Dativ): am Mittelmeer، im Herzen، im Westen.'
			}
		]
	},
	{
		id: 'ger_lesson_2as_le_t3_medien_lesen_wissen',
		slug: 'ger-2as-le-t3-medien_lesen_wissen',
		grade: '2as_le',
		yearSubjectId: 783,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr:
			'المجال الثالث: البلدان الناطقة بالألمانية والسفر والتكنولوجيا والتعبير الكتابي (D-A-CH-Länder, Reisen, Technik & Textproduktion)',
		order: 2,
		titleAr:
			'وسائل الإعلام والمطالعة والكفاءة الرقمية المسؤولة (Medien, Lesen & digitale Kompetenz)',
		objectives: [
			'اكتساب المعجم الأساسي للإعلام الرقمي والورقي والعلوم والتكنولوجيا (digitale Medien, Suchmaschine, Wissensquelle, Datenschutz, Bildschirmzeit, gedrucktes Buch)',
			'تنمية التفكير النقدي في مقارنة الكتاب الورقي بالوسائط الرقمية والتحقق من موثوقية المعلومات (Quellen prüfen, seriös vs unzuverlässig)',
			'توظيف التراكيب المصدرية المتقدمة (Infinitivsätze mit um ... zu, ohne ... zu, statt ... zu) للتعبير عن الغاية والبديل والحالة'
		],
		keywordsAr: [
			'Medien & Lesen',
			'digitale Kompetenz',
			'Datenschutz & Quellenprüfung',
			'um ... zu / ohne ... zu / statt ... zu',
			'Wissenschaft & Technik',
			'الإعلام والتكنولوجيا'
		],
		discover: {
			scenarioAr:
				'في ندوة حول المعرفة والتقنية، تقول التلميذة سلمى: «Das Internet hilft uns sehr, um wissenschaftliche Artikel schnell zu finden und Fremdsprachen zu üben. Trotzdem darf man digitale Medien nicht kritiklos benutzen! Statt stundenlang ziellos auf einen Bildschirm zu schauen, sollte man gedruckte Bücher lesen und seine Quellen sorgfältig prüfen. Schon Gelehrte wie Ibn Al-Haytham betonten die genaue Beobachtung und Prüfung, ohne blinde Behauptungen zu übernehmen.» تأمّل اللوحة التوضيحية والتراكيب المصدرية الثلاثة.',
			svg: renderLessonIllustration('ger_05_wissenschaft_technologie_innovation', {
				lang: 'de',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'ما المحاور الأربعة للتكنولوجيا والمعرفة المسؤولة في اللوحة التوضيحية المرفقة؟',
					hintAr: 'راجع مفتاح اللوحة (Forschung & Labor, Informatik, sichere Informationsnetze, Verantwortung).',
					expectedInput: 'البحث العلمي والمخبر، الحوسبة والرقائق، شبكات المعلومات الآمنة، والابتكار المسؤول',
					revealAr:
						'تبرز اللوحة تكامل العلم والأخلاق الرقمية: التحليل المخبري والبحث (Forschung und Analyse)، المعلوماتية والتقنية (Informatik und Mikroelektronik)، أمن الشبكات والبيانات (Sichere Informationsnetze)، والابتكار التكنولوجي المسؤول (Verantwortungsvolle Innovation).'
				},
				{
					promptAr:
						'تأمل التراكيب الثلاثة في كلام سلمى: «um ... zu finden»، «Statt ... zu schauen»، و«ohne ... zu übernehmen». ما وظيفة كل تركيب منها؟',
					hintAr: 'أيها يدل على الهدف/الغاية، وأيها يدل على الاستبدال (بدلاً من)، وأيها يدل على النفي المصاحب (دون أن)؟',
					expectedInput: 'um ... zu للغاية، statt ... zu للبديل (بدلاً من)، ohne ... zu للنفي (دون أن)',
					revealAr:
						'تتطلب الجمل المصدرية الثلاث (um ... zu / statt ... zu / ohne ... zu) شرطاً جوهرياً: أن يكون الفاعل واحداً في شطري الجملة! ومع الأفعال المنفصلة تدخل zu في الوسط (z.B. um Informationen nachzuschlagen / statt Zeit zu verschwenden).'
				},
				{
					promptAr:
						'ما المنهج العلمي الذي أشار إليه النص عند العالم ابن الهيثم (Ibn Al-Haytham)، وكيف نطبقه على وسائل الإعلام الرقمية اليوم؟',
					hintAr: 'لاحظ عبارة «Beobachtung und Prüfung» مقابل «blinde Behauptungen».',
					expectedInput: 'الملاحظة الدقيقة والتحقق من المصادر وعدم تصديق الشائعات بدون دليل',
					revealAr:
						'أسّس ابن الهيثم منهج التثبت العلمي والتجريب والملاحظة الدقيقة ورفض التقليد الأعمى؛ وهو ما يطبق اليوم في الكفاءة الرقمية (Medienkompetenz) عبر التحقق من المصادر (Quellen prüfen) وحماية المعطيات الشخصية (Datenschutz).'
				}
			]
		},
		summary: {
			rulesAr: [
				'معجم الإعلام والمطالعة والتكنولوجيا (Medien, Lesen & Technik): das gedruckte Buch (الكتاب المطبوع)، die digitale Bibliothek (المكتبة الرقمية)، die Suchmaschine (محرك البحث)، die seriöse Quelle (المصدر الموثوق)، die Falschmeldung (الخبر الزائف)، der Datenschutz (حماية البيانات)، die Bildschirmzeit (وقت الشاشة)، die künstliche Intelligenz (الذكاء الاصطناعي)، die digitale Kompetenz (الكفاءة الرقمية).',
				'الجمل المصدرية الثلاث (Infinitivkonstruktionen mit zu): (1) الغاية (Final): um ... zu + Infinitiv (بمعنى لكي، بشرط وحدة الفاعل)؛ (2) البديل (Substitutiv): (an)statt ... zu + Infinitiv (بدلاً من أن)؛ (3) غياب الفعل المرافق (Modal negiert): ohne ... zu + Infinitiv (دون أن).',
				'ضوابط البناء: توضع فاصلة إلزامية قبل um / statt / ohne، ويأتي «zu + Infinitiv» في نهاية الجملة الجانبية؛ وإذا كان الفعل منفصلاً دخلت zu بين السابقة والجذر: um ein Buch auszuleihen / statt den Text abzuschreiben / ohne nachzudenken.',
				'المقارنة المتوازنة بين الإعلام الورقي والرقمي: الكتاب الورقي ينمي التركيز العميق (tiefe Konzentration)، بينما توفر الأدوات الرقمية سرعة البحث والاستماع للنطق بشرط احترام الوقت وحماية الخصوصية.'
			],
			visualSvg: svgGermanGrammarMap({
				title: 'Infinitivsätze & Medienkompetenz (2AS LE)',
				rootLabel: 'Gleiches Subjekt in beiden Satzteilen!',
				rootSub: 'Komma + Konjunktion + ... + (Präfix) zu + Infinitiv',
				width: 580,
				branches: [
					{
						label: 'um ... zu (Zweck)',
						rule: 'Absicht / Ziel (Wozu?)',
						example: 'Ich lese, um zu lernen.'
					},
					{
						label: 'statt ... zu (Ersatz)',
						rule: 'Alternative Handlung',
						example: 'Statt zu spielen, übt er.'
					},
					{
						label: 'ohne ... zu (Fehlen)',
						rule: 'Begleitende Verneinung',
						example: 'Prüfe, ohne blind zu teilen.'
					},
					{
						label: 'Trennbares Verb',
						rule: 'zu zwischen Präfix & Stamm',
						example: 'um Wörter nachzuschlagen'
					}
				]
			}),
			visualCaptionAr: 'قواعد الجمل المصدرية الثلاث (um...zu / statt...zu / ohne...zu) وتطبيقها الإعلامي',
			examples: [
				{
					problemAr:
						'Verbinde die Sätze mit «um ... zu», «statt ... zu» oder «ohne ... zu»: «a) Nadia besucht die Schulbibliothek. Sie möchte neue Fachbücher ausleihen. (um ... zu) b) Tarik überprüft jede Nachricht zuerst. Er teilt sie nicht sofort. (ohne ... zu) c) Am Abend solltest du ein Buch lesen. Du siehst nicht nur Videos. (statt ... zu)»',
					solutionAr:
						'«a) Nadia besucht die Schulbibliothek, um neue Fachbücher auszuleihen. (أداة zu تدخل بين aus و leihen) | b) Tarik überprüft jede Nachricht zuerst, ohne sie sofort zu teilen. | c) Am Abend solltest du ein Buch lesen, statt nur Videos zu sehen.»'
				},
				{
					problemAr:
						'Nenne zwei Vorteile und zwei Risiken digitaler Medien beim Lernen.',
					solutionAr:
						'«Vorteile: schneller Zugang zu Online-Wörterbüchern und seriösen Lernplattformen. | Risiken: Ablenkung durch zu lange Bildschirmzeit und unzuverlässige Falschmeldungen.»'
				}
			],
			watchOutAr:
				'احذر من خطأ فادح عند وجود فاعلين مختلفين! لا يمكنك أبداً استعمال «um ... zu» أو «ohne ... zu» إذا اختلف الفاعل في الجملتين! مثال: «الأستاذ يشرح الدرس لكي يفهم التلاميذ» لا يصح فيها um ... zu لأن الفاعل الأول «الأستاذ» والثاني «التلاميذ»، بل نستعمل هنا «damit» (وهو موضوع الدرس القادم): «Der Lehrer erklärt die Regel, damit die Schüler sie verstehen.»'
		},
		practice: [
			{
				questionAr:
					'Welche Satzverbindung mit dem trennbaren Verb «nachschlagen» und «um ... zu» ist syntaktisch einwandfrei?',
				options: [
					'Ich benutze ein gedrucktes Wörterbuch, um unbekannte Wörter nachschlagen zu.',
					'Ich benutze ein gedrucktes Wörterbuch, um unbekannte Wörter nachzuschlagen.',
					'Ich benutze ein gedrucktes Wörterbuch, um unbekannte Wörter zu nachschlagen.',
					'Ich benutze ein gedrucktes Wörterbuch, um ich unbekannte Wörter nachzuschlagen.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا تأتي zu في نهاية المصدر.',
					'أحسنت! تدخل zu بين السابقة المنفصلة nach والجذر schlagen: nachzuschlagen.',
					'خطأ: لا توضع zu قبل السابقة المنفصلة.',
					'خطأ: يُحذف الفاعل «ich» دائماً من الجملة المصدرية مع um ... zu.'
				],
				explanationAr:
					'في الجملة المصدرية (um ... zu) يُحذف الفاعل لأنه متطابق مع الجملة الرئيسية، وتدخل zu داخل الفعل المنفصل (nachzuschlagen).'
			},
			{
				questionAr:
					'Welche Konjunktion passt logisch in die Lücke? «Man darf eine Meldung aus dem Internet nicht einfach kopieren, ...... vorher die Quelle sorgfältig zu prüfen.»',
				options: [
					'um',
					'ohne',
					'statt',
					'damit'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: المعنى هو «دون التحقق من المصدر» وليس «لكي نتحقق».',
					'ممتاز! «ohne ... zu prüfen» تعني «دون أن تتحقق أولاً من المصدر».',
					'خطأ: الجملة الأولى تنفي النسخ، ثم يأتي النقص المرافق بـ ohne ... zu.',
					'خطأ: damit تأخذ جملة كاملة بفعل مصرف في النهاية لا صيغة zu + Infinitiv.'
				],
				explanationAr:
					'التركيب «ohne + ... + zu + Infinitiv» يعني «بدون أن...» ويؤدي معنى التحذير من النقص أو الإهمال.'
			},
			{
				questionAr:
					'Was gehört zu einer verantwortungsvollen digitalen Kompetenz (Medienkompetenz)?',
				options: [
					'Persönliche Passwörter öffentlich teilen und jede unbestätigte Nachricht weiterleiten',
					'Quellen kritisch überprüfen, den Datenschutz beachten und die Bildschirmzeit begrenzen',
					'Gedruckte Bücher vollständig abschaffen und nie ein Wörterbuch benutzen',
					'Aufsätze direkt von fremden Seiten abschreiben, ohne selbst zu denken'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: مشاركة كلمات السر والأخبار غير المؤكدة خطر رقمي.',
					'صحيح! التثبت من المصادر وحماية المعطيات وتقنين وقت الشاشة ركائز الكفاءة الرقمية.',
					'خطأ: الكتاب المطبوع والقاموس يظلان أساسيين للتركيز العميق.',
					'خطأ: النسخ الأعمى ينافي الأمانة العلمية والتعلم الحقيقي.'
				],
				explanationAr:
					'الكفاءة الرقمية المسؤولة تقوم على نقد المصادر، حماية الخصوصية (Datenschutz)، والاعتدال في استعمال الشاشات.'
			}
		]
	},
	{
		id: 'ger_lesson_2as_le_t3_futur_relativsaetze',
		slug: 'ger-2as-le-t3-futur_relativsaetze',
		grade: '2as_le',
		yearSubjectId: 783,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr:
			'المجال الثالث: البلدان الناطقة بالألمانية والسفر والتكنولوجيا والتعبير الكتابي (D-A-CH-Länder, Reisen, Technik & Textproduktion)',
		order: 3,
		titleAr:
			'المستقبل البسيط وجمل الوصل والروابط الغائية (Futur I, Relativsätze & finale Konnektoren)',
		objectives: [
			'صياغة زمن المستقبل البسيط (Futur I: werden + Infinitiv am Satzende) للتعبير عن الخطط المستقبلية والوعود والتوقعات',
			'بناء جمل الوصل (Relativsätze) وتحديد ضمير الوصل الدقيق (der, die, das, den, dem, denen) عبر قاعدة: الجنس والعدد من الاسم المرجعي (Bezugswort)، والإعراب من وظيفة الضمير داخل جملة الوصل',
			'التمييز التام بين «um ... zu + Infinitiv» (عند وحدة الفاعل) و«damit + Nebensatz» (عند اختلاف الفاعلين) للتعبير عن الغاية والهدف'
		],
		keywordsAr: [
			'Futur I (werden + Inf.)',
			'Relativsätze (Nom. / Akk. / Dat.)',
			'Relativpronomen',
			'damit vs um ... zu',
			'Verb am Ende',
			'المستقبل وجمل الوصل'
		],
		discover: {
			scenarioAr:
				'يقرأ التلاميذ خطة طالبٍ في 2AS للاستعداد للسنة النهائية (BAC): «Im nächsten Jahr werde ich fleißig für das Abitur lernen und viele deutsche Texte lesen. Das Wörterbuch, das auf meinem Schreibtisch liegt (Nom.), hilft mir jeden Tag. Der Freund, den ich gestern getroffen habe (Akk.), besucht die Stadtbibliothek, die ein ruhiger Lernort ist. Der Lehrer gibt uns klare Übungen, damit wir alle Regeln sicher beherrschen.» راقب أفعال Futur I وضمائر الوصل وdamit!',
			svg: svgGermanTenseTimeline({
				title: 'Zukunft & Pläne im Deutschen (2AS LE)',
				tenseName: 'Futur I',
				formula: 'werden (Pos. 2) + ... + Infinitiv (Ende)',
				activeZone: 'future',
				example: 'Nächstes Jahr werden wir das Abitur erfolgreich ablegen.',
				markers: 'morgen, nächste Woche, bald, im nächsten Jahr, in Zukunft',
				width: 560
			}),
			steps: [
				{
					promptAr:
						'انظر إلى التركيب «Im nächsten Jahr werde ich ... lernen und ... lesen». كيف نصرف الفعل المساعد «werden» في الحاضر مع الضمائر الستة، وأين يقع المصدر؟',
					hintAr: 'انتبه للتغير الصوتي مع du و er/sie/es (wirst / wird)!',
					expectedInput: 'ich werde, du wirst, er/sie/es wird, wir werden, ihr werdet, sie/Sie werden + المصدر في النهاية',
					revealAr:
						'يتكون Futur I من تصريف «werden» في الموقع 2: ich werde, du wirst, er/sie/es wird, wir werden, ihr werdet, sie/Sie werden + المصدر في نهاية الجملة (Satzklammer). انتبه لصيغة du wirst و er wird (بدون نهاية -t!).'
				},
				{
					promptAr:
						'قارن ضميري الوصل في «Das Wörterbuch, das auf meinem Schreibtisch liegt» و«Der Freund, den ich gestern getroffen habe»: ما الذي حدد جنس «das / den» وما الذي حدد حالته الإعرابية (Nom. / Akk.)؟',
					hintAr: 'مَن المرجع (Bezugswort)؟ وما وظيفة الضمير داخل جملة الوصل؟',
					expectedInput: 'الاسم المرجع يحدد الجنس والعدد (Wörterbuch محايد / Freund مذكر)، والفعل داخل جملة الوصل يحدد الحالة (liegt: Nom. -> das؛ treffen: Akk. -> den)',
					revealAr:
						'القاعدة الذهبية لجمل الوصل (Relativsätze): الجنس (مذكر/مؤنث/محايد) والعدد (مفرد/جمع) يأتيان من الاسم المرجعي في الجملة الرئيسية؛ أما الحالة الإعرابية (Nominativ/Akkusativ/Dativ) فتحددها وظيفة الضمير داخل جملة الوصل نفسها! (مثال Dativ مع helfen: Der Freund, dem ich helfe).'
				},
				{
					promptAr:
						'في الجملة الأخيرة: «Der Lehrer gibt uns klare Übungen, damit wir alle Regeln sicher beherrschen». لماذا استعملنا هنا «damit» وليس «um ... zu»؟',
					hintAr: 'من الفاعل في الشطر الأول (Der Lehrer) ومن الفاعل في الشطر الثاني (wir)؟',
					expectedInput: 'لأن الفاعلين مختلفان (الأستاذ يعطي، ونحن نتمكن)، فيجب استعمال damit + فعل مصرف في النهاية',
					revealAr:
						'عند تطابق الفاعل نستعمل «um ... zu» (أو «damit» إن شئنا، لكن «um ... zu» أفصح). أما عند اختلاف الفاعلين (Der Lehrer gibt ..., damit wir ...) فـ «damit» إجبارية مئة بالمئة ويتحول فعلها المصرف إلى آخر الجملة!'
				}
			]
		},
		summary: {
			rulesAr: [
				'المستقبل البسيط (Futur I): الصيغة = werden (في الموقع 2) + ... + Infinitiv (في النهاية). التصريف الدقيق لـ werden: ich werde, du wirst, er/sie/es wird, wir werden, ihr werdet, sie/Sie werden. يعبر عن النية والخطة (Ich werde Sprachen studieren) أو التوقع (Es wird morgen sonnig sein).',
				'جمل الوصل (Relativsätze): تُوضع دائماً بين فاصلتين إذا كانت وسط الجملة، ويرتحل الفعل المصرف فيها إلى آخر جملة الوصل. ضمائر الوصل في الحالات الثلاث: Nominativ (der, die, das, die) | Akkusativ (den, die, das, die) | Dativ (dem, der, dem, denen! لاحظ denen في الجمع!).',
				'تطبيق عملي على ضمائر الوصل مع حروف الجر: يسبق حرف الجر ضمير الوصل في حالة الجر أو النصب: «Das ist die Schule, in der ich lerne» (Wo? -> Dativ fem. = der)؛ «Das ist der Stift, mit dem ich schreibe» (mit + Dativ mask. = dem)؛ «Das sind die Bücher, für die ich mich interessiere» (für + Akk. Plural = die).',
				'الربط الغائي (Finale Konnektoren): وحدة الفاعل -> um ... zu + Infinitiv (Ich lerne Deutsch, um in Zukunft zu übersetzen). اختلاف الفاعلين -> damit + Subjekt + ... + Verb am Ende (Die Eltern unterstützen uns, damit wir konzentriert lernen).'
			],
			visualSvg: svgGermanGrammarMap({
				title: 'Relativsätze & Finale Konnektoren (2AS LE)',
				rootLabel: 'Bezugswort (Genus/Zahl) + Verb im Relativsatz (Kasus)',
				rootSub: 'Achtung im Dativ Plural: denen! | Damit bei zwei Subjekten',
				width: 580,
				branches: [
					{
						label: 'Nominativ',
						rule: 'der / die / das / die',
						example: 'Der Text, der kurz ist...'
					},
					{
						label: 'Akkusativ',
						rule: 'den / die / das / die',
						example: 'Der Film, den ich sah...'
					},
					{
						label: 'Dativ',
						rule: 'dem / der / dem / denen',
						example: 'Die Schüler, denen wir helfen'
					},
					{
						label: 'Final: damit / um',
						rule: '2 Subjekte -> damit',
						example: '... damit du es verstehst.'
					}
				]
			}),
			visualCaptionAr: 'خريطة ضمائر الوصل في الرفع والنصب والجر والتمييز بين damit و um...zu',
			examples: [
				{
					problemAr:
						'Ergänze das passende Relativpronomen: «a) Das ist der Reiseführer, ...... ich gestern gekauft habe. b) Die Bibliothek, in ...... wir oft lernen, ist sehr ruhig. c) Die Freunde, ...... ich bei den Aufgaben helfe, danken mir.»',
					solutionAr:
						'«a) den (الاسم المرجع der Reiseführer مذكر، و kaufen يأخذ Akkusativ -> den) | b) der (die Bibliothek مؤنث، و in + Wo يأخذ Dativ -> der) | c) denen (die Freunde جمع، و helfen يأخذ Dativ Plural -> denen)»'
				},
				{
					problemAr:
						'Bilde Futur I und verbinde final: «a) Morgen / werden / wir / eine Reise nach Constantine / machen. b) Mein Vater schenkt mir ein Wörterbuch. Ich soll deutsche Texte besser verstehen. (damit)»',
					solutionAr:
						'«a) Morgen werden wir eine Reise nach Constantine machen. | b) Mein Vater schenkt mir ein Wörterbuch, damit ich deutsche Texte besser verstehe. (اختلاف الفاعلين يفرض damit)»'
				}
			],
			watchOutAr:
				'تذكّر أمرين جوهريين يكثر السؤال عنهما في امتحانات 2AS: (1) ضمير الوصل في حالة Dativ Plural هو «denen» وليس «den» أو «denn» (مثال: Die Kinder, denen das Buch gehört...)؛ (2) عند تصريف Futur I مع er/sie/es نقول «wird» (بدون حرف t في النهاية، وليس «wirdt» أو «werdet»!).'
		},
		practice: [
			{
				questionAr:
					'Welche Reihe ergänzt alle drei Relativsätze fehlerfrei? «1) Das Buch, ...... mir gehört, ist neu. 2) Die Nachbarn, ...... wir oft helfen, sind dankbar. 3) Der Aufsatz, ...... sie heute schreibt, ist klar.»',
				options: [
					'das / den / der',
					'das / denen / den',
					'dem / denen / der',
					'was / dem / den'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: جمع Dativ بعد helfen هو denen وليس den، و der Aufsatz في Akkusativ يصبح den.',
					'ممتاز! das (das Buch فاعل لـ gehört)، denen (die Nachbarn جمع مع Dativ بعد helfen)، den (der Aufsatz مفعول به في Akkusativ لـ schreibt).',
					'خطأ: في الجملة الأولى das Buch هو الفاعل (Nominativ: das) وفي الثالثة Aufsatz مفعول به (den).',
					'خطأ: الأسماء المحددة لا تأخذ was كضمير وصل.'
				],
				explanationAr:
					'نحدد الجنس والعدد من الاسم المرجع ونحدد الحالة من الفعل داخل جملة الوصل: gehört (Nom. -> das)، helfen (Dat. Pl. -> denen)، schreibt (Akk. mask. -> den).'
			},
			{
				questionAr:
					'Wähle die richtige Futur-I-Form und den richtigen finalen Konnektor: «Nächstes Jahr ...... mein Bruder Informatik studieren, ...... unsere Schule bessere Programme entwickelt.»',
				options: [
					'werdet / um',
					'wird / damit',
					'wirst / damit',
					'wird / um ... zu'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: مع «mein Bruder» (= er) يصبح werden -> wird، والفاعلان مختلفان فيجب damit.',
					'أحسنت! wird (Futur I لـ mein Bruder) و damit لأن الفاعلين مختلفان (mein Bruder و unsere Schule).',
					'خطأ: wirst تخص الضمير du وليس الغائب mein Bruder.',
					'خطأ: um ... zu تتطلب وحدة الفاعل، بينما الفاعل الثاني هو unsere Schule.'
				],
				explanationAr:
					'تصريف werden مع er هو wird، واختلاف الفاعلين بين الجملتين يحتم استخدام damit + الفعل المصرف في النهاية.'
			},
			{
				questionAr:
					'Welcher Relativsatz mit Präposition ist grammatisch korrekt?',
				options: [
					'Die Stadt, in die wir nächstes Jahr fahren, liegt am Meer.',
					'Die Stadt, in der wir nächstes Jahr fahren, liegt am Meer.',
					'Die Stadt, nach der wir nächstes Jahr wohnen, ist sehr schön.',
					'Die Stadt, mit den wir sprechen, hat eine lange Geschichte.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! الفعل fahren يدل على الاتجاه (Wohin?) مع die Stadt المؤنثة، فيأخذ Akkusativ: in die.',
					'خطأ: fahren فعل حركة واتجاه فيطلب Akkusativ (in die) لا Dativ (in der).',
					'خطأ: السكن (wohnen) فعل موقع ثابت فيأخذ in der وليس nach der.',
					'خطأ: مع اسم مفرد مؤنث (die Stadt) لا نستعمل الجمع den.'
				],
				explanationAr:
					'مع حرف الجر المتبادل «in» وفعل الحركة «fahren» (Wohin?) نستخدم Akkusativ المؤنث: «in die».'
			}
		]
	},
	{
		id: 'ger_lesson_2as_le_t3_schriftlicher_ausdruck_methodik',
		slug: 'ger-2as-le-t3-schriftlicher_ausdruck_methodik',
		grade: '2as_le',
		yearSubjectId: 783,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr:
			'المجال الثالث: البلدان الناطقة بالألمانية والسفر والتكنولوجيا والتعبير الكتابي (D-A-CH-Länder, Reisen, Technik & Textproduktion)',
		order: 4,
		titleAr:
			'منهجية التعبير الكتابي: بناء المقال والرسالة الموجهة (Methodik des Schriftlichen Ausdrucks)',
		objectives: [
			'إتقان البنية المنهجية للموضوعين في الاختبار: الموضوع الموجه بالرؤوس والأفكار (Thema 1: Gelenkter Ausdruck mit Stichpunkten) والموضوع الحر (Thema 2: Freier Aufsatz)',
			'تنظيم النص إلى ثلاث مراحل متماسكة: المقدمة (Einleitung)، العرض بالحجج والأمثلة (Hauptteil)، والخاتمة بالتوصية أو الخلاصة (Schluss)',
			'توظيف أدوات الربط المتقدمة وصيغ التعبير عن الرأي (Redemittel: Meiner Meinung nach, Einerseits... andererseits, Erstens, Außerdem, Deshalb, Zusammenfassend)'
		],
		keywordsAr: [
			'Schriftlicher Ausdruck',
			'Einleitung - Hauptteil - Schluss',
			'Redemittel',
			'Konnektoren',
			'E-Mail / Erörterung',
			'منهجية التعبير الكتابي'
		],
		discover: {
			scenarioAr:
				'لتحضير التلاميذ للتحرير الكتابي في الامتحانات النهائية (6 نقاط)، يعرض الأستاذ خطة عمل من أربع مراحل على السبورة: «1. Thema genau lesen und Stichpunkte ordnen. 2. Einleitung: das Thema einführen und eine Frage stellen. 3. Hauptteil: zwei klare Argumente mit Konnektoren (Erstens..., Außerdem..., Einerseits... andererseits...) und passenden Nebensätzen entwickeln. 4. Schluss: eigene Meinung mit „Zusammenfassend lässt sich sagen, dass...“ oder „Meiner Meinung nach...“ abrunden.» تأمّل مخطط التحرير المرفق.',
			svg: svgGermanWritingBlueprint({
				title: 'Aufbau des Schriftlichen Ausdrucks (2AS LE)',
				steps: [
					{
						stage: 'Themaanalyse',
						detail: 'Textsorte (E-Mail / Aufsatz) & Stichpunkte prüfen'
					},
					{
						stage: 'Einleitung',
						detail: 'Allgemeiner Einstieg + zentrale Leitfrage'
					},
					{
						stage: 'Hauptteil',
						detail: 'Argumente mit Konnektoren, Beispielen & Nebensätzen'
					},
					{
						stage: 'Schluss',
						detail: 'Fazit, eigene Meinung & Ausblick / Empfehlung'
					}
				],
				width: 560
			}),
			steps: [
				{
					promptAr:
						'ما الفرق المنهجي بين «Thema 1 (Gelenkt)» و«Thema 2 (Frei)» في ورقة اختبار اللغة الألمانية، وكيف نضمن النقاط الكاملة في الموضوع الموجه؟',
					hintAr: 'هل نترك أياً من الرؤوس المطلوبة (Stichpunkte) في Thema 1؟',
					expectedInput: 'في Thema 1 يجب إدماج كل Stichpunkte في فقرات مترابطة، وفي Thema 2 يبني التلميذ أفكاره بحرية منظمة',
					revealAr:
						'في الاختبار يختار التلميذ موضوعاً واحداً فقط: في Thema 1 (الموجه) تُعطى عناصر إرشادية (Stichpunkte) يجب تحويلها كلها إلى جمل ألمانية مترابطة دون سردها كنقاط منفصلة! أما Thema 2 (الحر) فيختبر قدرة التلميذ على تنظيم موقف أو عرض أو رسالة من إنشائه الكامل.'
				},
				{
					promptAr:
						'تأمل العبارة «Meiner Meinung nach ist das Lesen sehr wichtig»: لماذا جاء الفعل «ist» مباشرة بعد «Meiner Meinung nach»؟',
					hintAr: 'تذكر قاعدة الموقع الثاني (V2) في الجملة الألمانية.',
					expectedInput: 'عبارة Meiner Meinung nach تحتل الموقع 1، فيأتي الفعل المصرف ist في الموقع 2 قبل الفاعل',
					revealAr:
						'عبارات افتتاح الرأي مثل «Meiner Meinung nach», «Einerseits», «Deshalb», «Zusammenfassend» تحتل الموقع الأول (Pos. 1)؛ لذلك يليها الفعل المصرف مباشرة في الموقع 2 (Inversion): «Deshalb müssen wir Wasser sparen» وليس «Deshalb wir müssen...»!'
				},
				{
					promptAr:
						'قارن بين بداية وخاتمة رسالة شخصية أو بريد إلكتروني (E-Mail / Brief) وبداية وخاتمة مقال إقناعي (Erörterung / Aufsatz).',
					hintAr: 'كيف نبدأ ونختم الرسالة إلى صديق مقابل المقال الموضوعي؟',
					expectedInput: 'الرسالة تبدأ بالتحية (Liebe/r...) وتختم بوداع (Viele Grüße)، والمقال يبدأ بتقديم عام ويختم بخلاصة وتوصية',
					revealAr:
						'الرسالة / البريد الإلكتروني (E-Mail): تحية (Liebe Salma, / Lieber Amin,) + فاصلة + حرف صغير في بداية السطر الموالي! + سؤال عن الحال + الموضوع + وداع (Viele Grüße / Dein Freund...). أما المقال (Aufsatz): عنوان أو مدخل عام -> عرض منظم بالروابط -> خاتمة موضوعية (Abschließend / Zusammenfassend).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الهيكل الثلاثي للإنشاء الألماني (Aufbau): (1) المقدمة (Einleitung: 2-3 أسطر): تقديم الموضوع بأهميته الراهنة دون إطالة مملة؛ (2) العرض (Hauptteil: فقرتان متوازنتان): تطوير الأفكار أو الحجج بالأمثلة، مع استثمار قواعد الفصل (weil, dass, wenn, damit, um...zu, Komparativ, Futur I)؛ (3) الخاتمة (Schluss: 2-3 أسطر): خلاصة، رأي شخصي متزن، أو توصية عملية.',
				'أدوات الترتيب والربط في العرض (Redemittel für den Hauptteil): للبدء: Erstens / Zunächst؛ للإضافة: Außerdem / Darüber hinaus / Ferner؛ للمقابلة بين جانبين: Einerseits ... andererseits؛ للنتيجة: Deshalb / Aus diesem Grund / Folglich؛ للاستدراك: Trotzdem / Dennoch / Jedoch (تأتي كلها في الموقع 1 فتفرض الفعل المصرف بعدها مباشرة!).',
				'عبارات الرأي والخاتمة (Meinung & Schluss): Meiner Meinung nach ... / Ich bin der Ansicht, dass ... / Ich bin überzeugt, dass ... / Zusammenfassend lässt sich sagen, dass ... / Abschließend empfehle ich, dass ... .',
				'قواعد الشكل والإملاء الألماني (Rechtschreibung & Form): كتابة جميع الأسماء بحرف كبير دائماً (die Schule, das Buch, das Wasser, die Umwelt)، وضع الفاصلة قبل كل رابط تبعي (weil, dass, wenn, damit, um ... zu) وقبل جملة الوصل، وتجنب تكرار الكلمات باستعمال الضمائر والمترادفات.'
			],
			visualSvg: svgGermanGrammarMap({
				title: 'Redemittel & Konnektoren (V2-Regel)',
				rootLabel: 'Konnektor auf Pos. 1 -> Verb auf Pos. 2!',
				rootSub: 'Nie Subjekt vor dem Verb nach deshalb / außerdem',
				width: 580,
				branches: [
					{
						label: 'Aufzählung',
						rule: 'Erstens / Außerdem',
						example: 'Außerdem liest er viel.'
					},
					{
						label: 'Abwägung',
						rule: 'Einerseits ... andererseits',
						example: 'Einerseits hilft das Netz...'
					},
					{
						label: 'Folge',
						rule: 'Deshalb / Aus diesem Grund',
						example: 'Deshalb sparen wir Wasser.'
					},
					{
						label: 'Fazit & Meinung',
						rule: 'Meiner Meinung nach...',
						example: 'Zusammenfassend gilt, dass...'
					}
				]
			}),
			visualCaptionAr: 'خريطة العبارات المنهجية وأدوات الربط مع احترام قاعدة الموقع الثاني للفعل',
			examples: [
				{
					problemAr:
						'Korrigiere die drei häufigsten Fehler in Schüleraufsätzen: «a) Deshalb ich lerne jeden Tag Deutsch. b) Ich denke dass gesunde ernährung wichtig ist. c) Liebe Amina, Ich schreibe dir aus Oran.»',
					solutionAr:
						'«a) Deshalb lerne ich jeden Tag Deutsch. (قاعدة V2 بعد Deshalb) | b) Ich denke, dass gesunde Ernährung wichtig ist. (فاصلة قبل dass + حرف كبير للاسم Ernährung) | c) Liebe Amina, ich schreibe dir aus Oran. (بعد الفاصلة في تحية الرسالة يُكتب الضمير ich بحرف صغير في الألمانية!)»'
				},
				{
					problemAr:
						'Formuliere eine kurze Einleitung und einen Schlusssatz zum Thema «Schulbibliothek und Lesen».',
					solutionAr:
						'Einleitung: «In der heutigen digitalen Welt stellt sich oft die Frage, welche Rolle gedruckte Bücher noch im Schulalltag spielen.» | Schluss: «Zusammenfassend bin ich überzeugt, dass regelmäßiges Lesen in der Schulbibliothek unsere Sprachkenntnisse nachhaltig stärkt.»'
				}
			],
			watchOutAr:
				'تنبيه منهجي ثمين لنيل العلامة الكاملة (6/6): بعد الروابط الظرفية (deshalb, trotzdem, außerdem, einerseits, meiner Meinung nach) يأتي الفعل المصرف مباشرة قبل الفاعل؛ أما بعد تحية الرسالة المتبوعة بفاصلة («Liebe Salma,») فيبدأ السطر التالي بحرف صغير («ich schreibe dir...» أو «vielen Dank für...») إلا إذا كان الكلمة الأولى اسماً أو ضمير الاحترام «Sie»!'
		},
		practice: [
			{
				questionAr:
					'Welcher Satz wendet die Konnektoren «einerseits ... andererseits» und «deshalb» grammatisch völlig fehlerfrei an?',
				options: [
					'Einerseits digitale Medien sind schnell, andererseits man darf nicht zu lange vor dem Bildschirm sitzen; deshalb ich lese Bücher.',
					'Einerseits sind digitale Medien schnell, andererseits darf man nicht zu lange vor dem Bildschirm sitzen; deshalb lese ich Bücher.',
					'Einerseits digitale Medien schnell sind, andererseits man nicht zu lange vor dem Bildschirm sitzen darf; deshalb lese ich Bücher.',
					'Einerseits sind digitale Medien schnell, andererseits man darf nicht zu lange sitzen; deshalb ich lese oft Bücher.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: بعد كل من einerseits و andererseits و deshalb يأتي الفعل المصرف في الموقع 2 قبل الفاعل.',
					'ممتاز! جميع الروابط الظرفية الثلاثة في الموقع 1 تلاها الفعل المصرف مباشرة (sind / darf / lese).',
					'خطأ: einerseits و andererseits ليستا أداتي تبعية، فلا يذهب الفعل معهما إلى آخر الجملة.',
					'خطأ: الفاعل سبق الفعل بعد andererseits وبعد deshalb.'
				],
				explanationAr:
					'الروابط الظرفية (Konjunktionaladverbien) مثل einerseits, andererseits, deshalb, außerdem تحتل الموقع 1 فتستدعي الفعل المصرف مباشرة في الموقع 2.'
			},
			{
				questionAr:
					'Wie beginnt man eine informelle E-Mail an einen Brieffreund auf Deutsch korrekt?',
				options: [
					'Lieber Tarik, Vielen Dank für deine letzte Nachricht!',
					'Lieber Tarik, vielen Dank für deine letzte Nachricht!',
					'Liebe Tarik: Vielen Dank für deine letzte Nachricht!',
					'Liebes Tarik, vielen dank für deine letzte Nachricht!'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: بعد الفاصلة في التحية يُكتب بداية السطر التالي بحرف صغير (vielen).',
					'أحسنت! للمذكر «Lieber Tarik,» ثم فاصلة، ويبدأ السطر التالي بحرف صغير (vielen)، مع كتابة الاسم Dank بحرف كبير.',
					'خطأ: المذكر يأخذ Lieber وتُستعمل الفاصلة لا النقطتان، ويُكتب بعد الفاصلة بحرف صغير.',
					'خطأ: Liebes للمحايد و Dank اسم فيُكتب بحرف كبير.'
				],
				explanationAr:
					'في الرسائل الألمانية المعيارية بعد فاصلة التحية (Lieber Tarik,) يبدأ النص بحرف صغير ما لم يكن اسماً أو صيغة Sie.'
			},
			{
				questionAr:
					'Welche Reihenfolge entspricht dem richtigen Aufbau eines Aufsatzes (Schriftlicher Ausdruck)?',
				options: [
					'Schluss -> Hauptteil -> Einleitung',
					'Einleitung -> Hauptteil (Argumente + Konnektoren) -> Schluss (Fazit)',
					'Stichpunkte abschreiben -> ohne Konnektoren -> Grußformel',
					'Hauptteil -> Überschrift -> ohne Einleitung direkt zum Fazit'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الخاتمة لا تأتي في البداية.',
					'صحيح! التدرج المنطقي هو: مقدمة تمهيدية، فعرض بالحجج والروابط، فخاتمة بالخلاصة والرأي.',
					'خطأ: يُمنع نسخ رؤوس الموضوع (Stichpunkte) حرفياً دون بناء فقرات متماسكة.',
					'خطأ: المقدمة والترتيب المنهجي ضروريان في التقييم.'
				],
				explanationAr:
					'المقال السليم يقوم على ثلاث فقرات واضحة: Einleitung (مقدمة)، Hauptteil (عرض بالحجج والأمثلة)، و Schluss (خاتمة مركزة).'
			}
		]
	}
];
