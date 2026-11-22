import type { GermanInteractiveLessonData } from '../../types';
import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';
import {
	svgGermanConjugationChart,
	svgGermanGrammarMap,
	svgGermanTenseTimeline
} from '../../svg-german';

export const LESSONS_2AS_LE_T1: GermanInteractiveLessonData[] = [
	{
		id: 'ger_lesson_2as_le_t1_persoenliches_leben_schule',
		slug: 'ger-2as-le-t1-persoenliches-leben-schule',
		grade: '2as_le',
		yearSubjectId: 783,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr:
			'المجال الأول: الحياة الخاصة والمدرسة وأساسيات النحو (Privatleben, Schule & Grundlagen der Grammatik)',
		order: 1,
		titleAr:
			'الحياة الشخصية والعائلة والمدرسة والأفعال المنفصلة في الحاضر (Privatleben, Schule & trennbare Verben)',
		objectives: [
			'إتقان التقديم الشخصي ووصف العائلة والحياة المدرسية اليومية باللغة الألمانية السليمة (Vorstellung, Familie, Schulalltag)',
			'تصريف الأفعال القياسية وغير القياسية في زمن الحاضر (Präsens) مع الانتباه لتغير الحركة الصوتية مع du و er/sie/es',
			'توظيف الأفعال المنفصلة (trennbare Verben) وتطبيق قاعدة القوس الجملي (Satzklammer) والتمييز بينها وبين الأفعال غير المنفصلة'
		],
		keywordsAr: [
			'Privatleben & Familie',
			'Schulalltag',
			'Präsens',
			'trennbare Verben',
			'Satzklammer',
			'التقديم الشخصي'
		],
		discover: {
			scenarioAr:
				'في حصة اللغة الألمانية للسنة الثانية ثانوي لغات أجنبية (2AS LE)، يكتب التلميذ أمين بطاقة تعارف لصديق مراسلة قائلاً: «Guten Tag! Ich heiße Amin, bin sechzehn Jahre alt und wohne mit meinen Eltern und meiner jüngeren Schwester in Constantine. Jeden Morgen stehe ich um halb sieben auf, frühstücke mit meiner Familie und gehe pünktlich ins Gymnasium. Um acht Uhr fängt der Unterricht an. Nachmittags bereite ich meine Hausaufgaben in der Schulbibliothek vor und helfe meiner Mutter zu Hause mit.» تأمّل اللوحة المرفقة واستخرج خصائص الأفعال المنفصلة.',
			svg: renderLessonIllustration('ger_03_bildung_sprachen_bibliothek', {
				lang: 'de',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'تأمل الجملتين «Ich stehe um halb sieben auf» و«Um acht Uhr fängt der Unterricht an». أين وُضع الجزء المصرف من الفعل وأين وُضعت السابقة (Präfix)؟',
					hintAr: 'انظر إلى الموقع الثاني في الجملة وإلى آخر كلمة في الجملة.',
					expectedInput: 'الفعل المصرف في الموقع الثاني والسابقة auf / an في نهاية الجملة',
					revealAr:
						'الأفعال المنفصلة (trennbare Verben) مثل aufstehen و anfangen تنفصل في الحاضر (Präsens): يبقى جذع الفعل مصرفاً في الموقع الثاني (Position 2) وتنتقل السابقة المشددة (auf, an, vor, mit...) إلى نهاية الجملة لتشكل القوس الجملي (Satzklammer).'
				},
				{
					promptAr:
						'ما التغير الصوتي الذي طرأ على الفعل «anfangen» في «der Unterricht fängt ... an»، وهل يحدث في ضمائر الجمع؟',
					hintAr: 'قارن أصل الفعل (a) بصيغة الغائب المفرد (ä).',
					expectedInput: 'تحول a إلى ä في الغائب المفرد ولا يحدث في الجمع',
					revealAr:
						'في الأفعال القوية ذات الحركة a أو e تتغير الحركة في المفرد مع du و er/sie/es فقط: anfangen (fängt an)، sprechen (spricht)، lesen (liest)، fahren (fährt)؛ أما في الجمع (wir, ihr, sie/Sie) فتبقى الحركة الأصلية.'
				},
				{
					promptAr:
						'استخرج من النص التمهيدي ثلاث مفردات تنتمي إلى الحياة المدرسية (Schule) وثلاث مفردات تنتمي إلى العائلة (Familie).',
					hintAr: 'ابحث عن أسماء المؤسسة والدروس والمكتبة وأفراد الأسرة.',
					expectedInput: 'Schule: Gymnasium, Unterricht, Hausaufgaben, Schulbibliothek | Familie: Eltern, Schwester, Mutter',
					revealAr:
						'الحقل المعجمي للمدرسة يشمل: Gymnasium (ثانوية)، Unterricht (درس)، Hausaufgaben (واجبات منزلية)، Schulbibliothek (مكتبة مدرسية)؛ وحقل العائلة يشمل: Eltern (الوالدان)، Schwester (أخت)، Mutter (أم)، Familie (عائلة).'
				}
			]
		},
		summary: {
			rulesAr: [
				'التقديم الشخصي والعائلي (Sich vorstellen): Ich heiße / Mein Name ist...; Ich bin 16 Jahre alt; Ich komme aus Algerien und wohne in...; Ich besuche die 2. Klasse des Gymnasiums (Zweig Fremdsprachen); In meiner Familie sind wir fünf Personen: meine Eltern, zwei Geschwister und ich.',
				'تصريف الحاضر (Präsens): النهايات القياسية هي (-e, -st, -t, -en, -t, -en). الأفعال القوية تغير حركتها فقط مع du و er/sie/es: e -> i/ie (sprechen -> du sprichst; lesen -> er liest; sehen -> sie sieht) و a -> ä (fahren -> er fährt; schlafen -> du schläfst). والفعلان المساعدان: sein (bin, bist, ist, sind, seid, sind) و haben (habe, hast, hat, haben, habt, haben).',
				'الأفعال المنفصلة (Trennbare Verben): السوابق المنفصلة المشددة هي: ab-, an-, auf-, aus-, bei-, ein-, fern-, mit-, nach-, vor-, weg-, zu-, zurück-. القاعدة: الفاعل + الفعل المصرف (الموقع 2) + المكملات + السابقة في آخر الجملة (Ich bereite den Text gut vor).',
				'الأفعال غير المنفصلة (Untrennbare Verben): السوابق غير المنفصلة غير المشددة لا تنفصل أبداً، وهي: be-, emp-, ent-, er-, ge-, miss-, ver-, zer- (مثل: verstehen -> Ich verstehe die Regel؛ besuchen -> Er besucht die Bibliothek).'
			],
			visualSvg: svgGermanGrammarMap({
				title: 'Präsens & trennbare Verben (2AS LE)',
				rootLabel: 'Verbposition im Aussagesatz',
				rootSub: 'Konjugiertes Verb immer auf Position 2',
				width: 580,
				branches: [
					{
						label: 'Präsens regulär',
						rule: '-e, -st, -t, -en, -t, -en',
						example: 'wir lernen Deutsch'
					},
					{
						label: 'Vokalwechsel',
						rule: 'du / er, sie, es: a->ä, e->i',
						example: 'er liest, sie fährt'
					},
					{
						label: 'Trennbar',
						rule: 'auf-, an-, ein-, mit-, vor-',
						example: 'Ich stehe um 6 Uhr auf.'
					},
					{
						label: 'Untrennbar',
						rule: 'be-, er-, ver-, ent-, zer-',
						example: 'Wir verstehen den Text.'
					}
				]
			}),
			visualCaptionAr: 'خريطة تصريف الحاضر وقواعد انفصال السوابق في الجملة الخبرية',
			examples: [
				{
					problemAr:
						'Bilde korrekte Sätze im Präsens: «a) Am Morgen / Nadia / aufstehen / um sechs Uhr. b) Unser Deutschlehrer / erklären / die Grammatik / klar. c) Du / lesen / gern / Sachbücher in der Bibliothek.»',
					solutionAr:
						'«a) Am Morgen steht Nadia um sechs Uhr auf. (تقدم الظرف فاحتل الموقع 1 وبقي الفعل المصرف في الموقع 2 والسابقة auf في النهاية) | b) Unser Deutschlehrer erklärt die Grammatik klar. (er- غير منفصلة) | c) Du liest gern Sachbücher in der Bibliothek. (تغير e إلى ie مع du)»'
				},
				{
					problemAr:
						'Ordne folgende Verben in trennbar oder untrennbar: «vorbereiten, verstehen, mithelfen, besuchen, zurückkommen, erzählen».',
					solutionAr:
						'Trennbar: vorbereiten (vor-), mithelfen (mit-), zurückkommen (zurück-). | Untrennbar: verstehen (ver-), besuchen (be-), erzählen (er-).'
				}
			],
			watchOutAr:
				'قاعدة V2 الذهبية في الألمانية: الفعل المصرف يحتل دائماً الموقع الثاني في الجملة الخبرية (ليس الكلمة الثانية بالضرورة، بل العنصر النحوي الثاني)! فإذا بدأنا بظرف زمان مثل «Jeden Tag» صار الفعل قبيل الفاعل: «Jeden Tag lerne ich Deutsch» وليس «Jeden Tag ich lerne Deutsch»!'
		},
		practice: [
			{
				questionAr:
					'Welcher Satz verwendet das trennbare Verb «vorbereiten» und die Wortstellung im Präsens grammatikalisch richtig?',
				options: [
					'Am Abend ich bereite meine Hausaufgaben sorgfältig vor.',
					'Am Abend bereite ich meine Hausaufgaben sorgfältig vor.',
					'Am Abend vorbereite ich meine Hausaufgaben sorgfältig.',
					'Am Abend bereite vor ich meine Hausaufgaben sorgfältig.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: بعد تصدر الظرف «Am Abend» (الموقع 1) يجب أن يأتي الفعل المصرف «bereite» مباشرة في الموقع 2 قبل الفاعل.',
					'أحسنت! الفعل المصرف «bereite» في الموقع 2 والسابقة المنفصلة «vor» في نهاية الجملة.',
					'خطأ: السابقة «vor-» سابقة منفصلة فلا تبقى ملتصقة بالفعل في الجملة الرئيسية.',
					'خطأ: القوس الجملي يفرض وضع «vor» في آخر الجملة لا بجانب الفعل.'
				],
				explanationAr:
					'في الجملة الخبرية يحتل الفعل المصرف الموقع الثاني دائماً، وتنتقل السابقة المنفصلة (vor-) إلى نهاية الجملة.'
			},
			{
				questionAr:
					'Welche Verbform ergänzt den Satz richtig: «Mein Bruder ...... jeden Tag eine halbe Stunde und ...... anschließend sehr gut Arabisch und Deutsch.»?',
				options: [
					'lest / sprecht',
					'liest / spricht',
					'liest / sprecht',
					'leset / spricht'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفعلان القويان lesen و sprechen يغيران حركتهما الصوتية مع الغائب المفرد (er/mein Bruder).',
					'ممتاز! مع «mein Bruder» (= er) يصبح lesen -> liest و sprechen -> spricht.',
					'خطأ: الفعل الثاني يحتاج أيضاً إلى تغير e -> i (spricht) ونهاية -t.',
					'خطأ: صيغة المفرد الغائب لـ lesen هي liest.'
				],
				explanationAr:
					'الأفعال القوية ذات الجذر e مثل lesen (e -> ie) و sprechen (e -> i) تتغير حركتها مع du و er/sie/es.'
			},
			{
				questionAr:
					'Welche Verbgruppe besteht ausschließlich aus UNTRENNBAREN Verben (ohne Präfixabtrennung im Präsens)?',
				options: [
					'verstehen, besuchen, erklären, entdecken',
					'aufstehen, verstehen, mithelfen, anfangen',
					'einkaufen, zurückkommen, besuchen, ausruhen',
					'vorbereiten, abfahren, zuhören, erzählen'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! السوابق ver-, be-, er-, ent- كلها سوابق غير منفصلة أبداً.',
					'خطأ: aufstehen و mithelfen و anfangen أفعال منفصلة.',
					'خطأ: einkaufen و zurückkommen و ausruhen أفعال منفصلة.',
					'خطأ: vorbereiten و abfahren و zuhören أفعال منفصلة.'
				],
				explanationAr:
					'السوابق غير المنفصلة الثماني هي: be-, emp-, ent-, er-, ge-, miss-, ver-, zer-، ولا تنفصل عن الفعل في الحاضر.'
			}
		]
	},
	{
		id: 'ger_lesson_2as_le_t1_verben_praesens_modalverben',
		slug: 'ger-2as-le-t1-verben-praesens-modalverben',
		grade: '2as_le',
		yearSubjectId: 783,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr:
			'المجال الأول: الحياة الخاصة والمدرسة وأساسيات النحو (Privatleben, Schule & Grundlagen der Grammatik)',
		order: 2,
		titleAr:
			'الأفعال المساعدة الجهية وبنية القوس الجملي (Modalverben & Satzklammer)',
		objectives: [
			'التمييز الدلالي الدقيق بين الأفعال الجهية الستة: müssen (الضرورة)، sollen (الواجب والتوصية)، können (القدرة والإمكانية)، dürfen (الإذن والمنع)، wollen (الإرادة)، mögen/möchten (الرغبة المهذبة)',
			'إتقان تصريف الأفعال الجهية في الحاضر (Präsens) مع الانتباه لغياب النهاية في الضميرين ich و er/sie/es وتغير الحركة في المفرد',
			'تطبيق قاعدة القوس الجملي (Satzklammer) مع وضع المصدر بدون zu في نهاية الجملة'
		],
		keywordsAr: [
			'Modalverben',
			'müssen / sollen / können',
			'dürfen / wollen / möchten',
			'Satzklammer',
			'Infinitiv am Satzende',
			'الأفعال الجهية'
		],
		discover: {
			scenarioAr:
				'يقرأ التلاميذ لوحة إرشادات داخل مكتبة الثانوية: «In der Schulbibliothek müssen alle Schülerinnen und Schüler leise sprechen. Man darf hier keine Speisen mitbringen, aber man kann viele Wörterbücher kostenlos ausleihen. Ihr sollt eure Aufgaben pünktlich abgeben. Ich möchte heute ein Buch über Al-Idrisi lesen, und mein Bruder will morgen einen Aufsatz schreiben.» لاحظ موقع كل فعل جهي وموقع المصدر المرافق له.',
			svg: svgGermanTenseTimeline({
				title: 'Modalverben im Präsens',
				tenseName: 'Satzklammer',
				formula: 'Subjekt + Modalverb (Pos. 2) + ... + Infinitiv (Ende)',
				activeZone: 'present',
				example: 'Jeder Schüler muss im Unterricht aufmerksam zuhören.',
				markers: 'heute, immer, in der Schule, im Alltag',
				width: 560
			}),
			steps: [
				{
					promptAr:
						'لاحظ الصيغ «Ich möchte», «mein Bruder will», «Man darf», «alle ... müssen»: ما الميزة الصرفية المشتركة بين ich و er/sie/es في تصريف الأفعال الجهية؟',
					hintAr: 'هل تأخذ النهاية -e مع ich أو النهاية -t مع er/sie/es/man؟',
					expectedInput: 'لا تأخذ نهاية (-e / -t) في المفرد الأول والثالث وتتشابه صيغتاهما',
					revealAr:
						'في المفرد يكون تصريف ich و er/sie/es متطابقاً تماماً وبدون نهاية: ich/er muss, kann, darf, will, soll, mag! كما يتغير جذر المفرد في müssen (ü->u), können (ö->a), dürfen (ü->a), wollen (o->i), mögen (ö->a)، بينما يعود الجذر الأصلي في الجمع (wir müssen, ihr könnt, sie dürfen).'
				},
				{
					promptAr:
						'ما الفرق في المعنى بين «Man darf hier nicht laut sprechen» و«Du musst das nicht heute machen»؟',
					hintAr: 'انتبه للفرق بين المنع (nicht dürfen) وعدم الضرورة (nicht müssen)!',
					expectedInput: 'nicht dürfen = ممنوع، أما nicht müssen = ليس ضرورياً (لا يلزم)',
					revealAr:
						'«nicht dürfen» تعني المنع التام (لا يُسمح)، مثل: Im Unterricht darf man nicht telefonieren. أما «nicht müssen» (أو nicht brauchen ... zu) فتعني انتفاء الضرورة فقط (لست مضطراً إلى...).'
				},
				{
					promptAr:
						'أين جاءت المصادر «sprechen», «mitbringen», «ausleihen», «lesen», «schreiben» في جمل النص؟ وهل استخدمت الأداة zu قبلها؟',
					hintAr: 'انظر إلى آخر كلمة في كل جملة.',
					expectedInput: 'جاءت في نهاية الجملة بدون الأداة zu',
					revealAr:
						'تشكل الأفعال الجهية قوساً جملياً (Satzklammer): الفعل الجهي مصرفاً في الموقع 2 والمصدر في آخر الجملة بدون zu. حتى الأفعال المنفصلة (مثل mitbringen, ausleihen) لا تنفصل حين تكون مصدراً في النهاية!'
				}
			]
		},
		summary: {
			rulesAr: [
				'دلالات الأفعال الجهية (Bedeutung der Modalverben): müssen (الاضطرار والواجب الذاتي أو الموضوعي)؛ sollen (الواجب الأخلاقي أو نصيحة/أمر من الغير)؛ können (القدرة والاستطاعة والإمكانية)؛ dürfen (الإذن، ومع nicht = المنع)؛ wollen (الإرادة والنية القوية)؛ mögen (الإعجاب) و möchten (الرغبة المهذبة).',
				'جدول التصريف الشاذ في المفرد (ich / du / er,sie,es): müssen (muss, musst, muss) | können (kann, kannst, kann) | dürfen (darf, darfst, darf) | wollen (will, willst, will) | sollen (soll, sollst, soll — بدون تغير صوتي!) | mögen (mag, magst, mag) | möchten (möchte, möchtest, möchte). وفي الجمع تعود الصيغ للقياس: wir/sie müssen, können, dürfen, wollen, sollen.',
				'القوس الجملي (Satzklammer): الفاعل + Modalverb (Pos. 2) + المكملات الزمنية والمكانية + Infinitiv (Ende) بدون zu. ومع الظرف في البداية: Heute muss ich drei Seiten lesen.',
				'فخ النفي الشهير: darf nicht = ممنوع (Verbot)؛ أما muss nicht = غير مضطر / ليس لزاماً (keine Pflicht).'
			],
			visualSvg: svgGermanConjugationChart({
				title: 'Modalverben im Überblick (2AS LE)',
				subtitle: '1. & 3. Person Singular endungslos und identisch!',
				width: 580,
				columns: [
					{
						header: 'Pflicht & Rat',
						rule: 'müssen / sollen',
						examples: 'ich muss | er soll'
					},
					{
						header: 'Können & Erlaubnis',
						rule: 'können / dürfen',
						examples: 'du kannst | man darf'
					},
					{
						header: 'Wunsch & Wille',
						rule: 'wollen / möchten',
						examples: 'sie will | wir möchten'
					}
				]
			}),
			visualCaptionAr: 'ملخص تصريف ودلالة الأفعال الجهية في اللغة الألمانية',
			examples: [
				{
					problemAr:
						'Ergänze das passende Modalverb im Präsens: «a) Unser Lehrer sagt: Ihr ...... die neuen Vokabeln täglich wiederholen. (Rat/Auftrag) b) Im Labor ...... man keine Getränke mitbringen. (Verbot) c) Sami spricht drei Sprachen; er ...... schon gut übersetzen. (Fähigkeit)»',
					solutionAr:
						'«a) sollt (توجيه من المعلم) | b) darf (نفي الإذن = منع) | c) kann (القدرة والمهارة)»'
				},
				{
					problemAr:
						'Bilde einen korrekten Satz mit Modalverb und trennbarem Verb: «Morgen / müssen / wir / früh / aufstehen.»',
					solutionAr:
						'«Morgen müssen wir früh aufstehen.» (المصدر المنفصل يبقى موحداً في نهاية الجملة).'
				}
			],
			watchOutAr:
				'انتبه لثلاثة أخطاء شائعة في 2AS: (1) لا تضع «t» في آخر «er muss» أو «er will» أو «er kann» (خطأ فادح قول: er kannt أو er willt!)؛ (2) لا تضع «zu» قبل المصدر بعد الفعل الجهي (نقول: Ich kann gut schwimmen وليس zu schwimmen)؛ (3) لا تغير حركة الفعل sollen في المفرد (er soll وليس er süll!).'
		},
		practice: [
			{
				questionAr:
					'Welche Reihe enthält ausschließlich korrekte Formen der 3. Person Singular (er/sie/man) im Präsens?',
				options: [
					'er kannt, sie musset, man darft, er willt',
					'er kann, sie muss, man darf, er will',
					'er können, sie müsst, man dürft, er wollt',
					'er kann, sie müsst, man darf, er soll'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: صيغ الغائب المفرد للأفعال الجهية لا تأخذ النهاية -t أبداً.',
					'ممتاز! الصيغ الدقيقة مع er/sie/man خالية من النهايات وبالتغير الصوتي الصحيح: kann, muss, darf, will.',
					'خطأ: هذه خلط بين الجمع وصيغة غير صحيحة.',
					'خطأ: الفعل müssen مع sie (هي) يصبح muss وليس müsst.'
				],
				explanationAr:
					'الأفعال الجهية في المفرد (ich و er/sie/es) لا تأخذ أي نهاية صرفية، وتتحول فيها الحركات باستثناء sollen.'
			},
			{
				questionAr:
					'Was bedeutet der Satz: «Du musst am Samstag nicht früh aufstehen, denn wir haben schulfrei.»?',
				options: [
					'Es ist dir streng verboten, früh aufzustehen.',
					'Es ist nicht nötig, dass du früh aufstehst.',
					'Du kannst am Samstag gar nicht schlafen.',
					'Du willst am Samstag in die Schule gehen.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: المنع يُعبر عنه بـ nicht dürfen وليس nicht müssen.',
					'أحسنت! «nicht müssen» تعني انتفاء الضرورة (لست مضطراً).',
					'خطأ: لا تعبر الجملة عن عدم القدرة.',
					'خطأ: الجملة تنفي الضرورة ولا تعبر عن الرغبة في الذهاب.'
				],
				explanationAr:
					'نفي müssen بـ nicht يعبر عن غياب الالتزام أو الضرورة (keine Pflicht)، بخلاف nicht dürfen الذي يفيد المنع.'
			},
			{
				questionAr:
					'Ordne die Wörter zu einem grammatisch einwandfreien Satz mit Satzklammer:',
				options: [
					'Heute möchten die Schüler in der Bibliothek einen Text vorbereiten.',
					'Heute die Schüler möchten vorbereiten einen Text in der Bibliothek.',
					'Heute möchten vorbereiten die Schüler in der Bibliothek einen Text.',
					'Heute möchten die Schüler einen Text zu vorbereiten in der Bibliothek.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! الفعل الجهي möchten في الموقع 2 والمصدر vorbereiten في آخر الجملة بدون zu.',
					'خطأ: الفعل المصرف يجب أن يكون في الموقع 2 والمصدر في النهاية.',
					'خطأ: يجب أن يفصل الفاعل والمكملات بين الفعل الجهي والمصدر.',
					'خطأ: لا نستخدم zu قبل المصدر بعد الأفعال الجهية.'
				],
				explanationAr:
					'القوس الجملي للأفعال الجهية يضع الفعل المصرف في الموقع 2 والمصدر غير المنفصل في النهاية المطلقة دون zu.'
			}
		]
	},
	{
		id: 'ger_lesson_2as_le_t1_artikel_kasus_akkusativ_dativ',
		slug: 'ger-2as-le-t1-artikel-kasus-akkusativ-dativ',
		grade: '2as_le',
		yearSubjectId: 783,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr:
			'المجال الأول: الحياة الخاصة والمدرسة وأساسيات النحو (Privatleben, Schule & Grundlagen der Grammatik)',
		order: 3,
		titleAr:
			'أدوات التعريف والتنكير والحالات الإعرابية وحروف الجر المكانية (Artikel, Kasus & Wechselpräpositionen)',
		objectives: [
			'التمييز الوظيفي بين حالات الإعراب الثلاث الأساسية في 2AS: الرفع (Nominativ) والنصب (Akkusativ) والجر (Dativ)',
			'إتقان تصريف أدوات التعريف (der, die, das, die) والتنكير (ein, eine, kein) وضمائر الملكية عبر الحالات الإعرابية الثلاث',
			'استعمال حروف الجر المكانية المتبادلة (Wechselpräpositionen) بدقة: Dativ مع السؤال Wo? (سكون) و Akkusativ مع السؤال Wohin? (حركة/اتجاه)'
		],
		keywordsAr: [
			'Nominativ',
			'Akkusativ',
			'Dativ',
			'bestimmte und unbestimmte Artikel',
			'Wechselpräpositionen',
			'الحالات الإعرابية'
		],
		discover: {
			scenarioAr:
				'تأمل وصف حجرة الدراسة والمكتبة: «Der Tisch (Nom.) steht in der Klasse. Der Schüler legt den Stift (Akk.) auf den Tisch (Wohin? -> Akk.) und stellt die Tasche neben das Regal. Jetzt liegt der Stift auf dem Tisch (Wo? -> Dat.) und das Heft liegt in dem (im) Rucksack. Dann hilft der Schüler seinem jüngeren Bruder (Dat.) bei den Hausaufgaben.» لاحظ كيف تغيرت أداة «der Tisch» من der إلى den ثم إلى dem!',
			svg: svgGermanGrammarMap({
				title: 'Kasus & Wechselpräpositionen (2AS LE)',
				rootLabel: 'Welcher Kasus wird gebraucht?',
				rootSub: 'Fragewort & Präposition bestimmen den Artikel',
				width: 580,
				branches: [
					{
						label: 'Nominativ',
						rule: 'Wer / Was? (Subjekt)',
						example: 'der, die, das, die'
					},
					{
						label: 'Akkusativ',
						rule: 'Wen / Was? (Objekt)',
						example: 'den, die, das, die'
					},
					{
						label: 'Dativ',
						rule: 'Wem? (+ -n im Plural)',
						example: 'dem, der, dem, den+n'
					},
					{
						label: 'Wechselpräp.',
						rule: 'Wo? -> Dat | Wohin? -> Akk',
						example: 'auf dem / auf den Tisch'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'قارن بين «legt den Stift auf den Tisch» و«liegt der Stift auf dem Tisch»: لماذا جاءت أداة المذكر den في الأولى ثم dem في الثانية؟',
					hintAr: 'هل الفعل legen يعبر عن حركة واتجاه (إلى أين؟) أم الفعل liegen يعبر عن سكون وموقع (أين؟)؟',
					expectedInput: 'legen (حركة/اتجاه: Wohin?) يأخذ Akkusativ (den)، و liegen (سكون: Wo?) يأخذ Dativ (dem)',
					revealAr:
						'حروف الجر التسعة (in, an, auf, unter, über, vor, hinter, neben, zwischen) تُسمى Wechselpräpositionen: تأخذ Akkusativ مع أفعال الاتجاه والحركة (legen, stellen, setzen, hängen, gehen -> Wohin?)، وتأخذ Dativ مع أفعال السكون والموضع (liegen, stehen, sitzen, hängen, sein -> Wo?).'
				},
				{
					promptAr:
						'في حالة النصب (Akkusativ)، أي جنس نحوي فقط يتغير فيه شكل الأداة مقارنة بحالة الرفع (Nominativ)؟',
					hintAr: 'انظر إلى: der/den، die/die، das/das، die/die.',
					expectedInput: 'المذكر المفرد فقط يتغير (der -> den، ein -> einen، mein -> meinen)',
					revealAr:
						'الملاحظة الذهبية: في Akkusativ لا يتغير سوى المذكر المفرد (maskulin: der -> den / ein -> einen / kein -> keinen / mein -> meinen)! أما المؤنث (die/eine) والمحايد (das/ein) والجمع (die/keine) فتبقى مطابقة تماماً للـ Nominativ.'
				},
				{
					promptAr:
						'لماذا استعملنا حالة الجر (Dativ) في عبارة «hilft der Schüler seinem jüngeren Bruder» وفي «bei den Hausaufgaben»؟',
					hintAr: 'فكر في الفعل helfen وحرف الجر bei.',
					expectedInput: 'الفعل helfen يطلب Dativ دائماً، وحرف الجر bei يطلب Dativ دائماً',
					revealAr:
						'بعض الأفعال مثل helfen, danken, gehören, gefallen, antworten تطلب مفعولاً في Dativ دائماً، كما أن حروف الجر (mit, nach, aus, zu, von, bei, seit) تطلب Dativ دائماً؛ وفي جمع Dativ نضيف -n إلى نهاية الاسم إن لم ينتهِ بـ -n أو -s (den Büchern, den Kindern).'
				}
			]
		},
		summary: {
			rulesAr: [
				'حالة الرفع (Nominativ — Wer? / Was?): للفاعل والاسم بعد sein/werden/bleiben. الأدوات: المذكر (der / ein / mein)، المؤنث (die / eine / meine)، المحايد (das / ein / mein)، الجمع (die / — / meine).',
				'حالة النصب (Akkusativ — Wen? / Was?): للمفعول به المباشر بعد معظم الأفعال (haben, lesen, schreiben, sehen, besuchen, brauchen)، وبعد حروف الجر الثابتة (für, durch, gegen, ohne, um). يتغير المذكر فقط: der -> den، ein -> einen، kein -> keinen، mein -> meinen.',
				'حالة الجر (Dativ — Wem?): بعد أفعال (helfen, danken, gefallen, gehören, antworten) وبعد حروف الجر (aus, bei, mit, nach, seit, von, zu). الأدوات: المذكر (dem / einem / meinem)، المؤنث (der / einer / meiner)، المحايد (dem / einem / meinem)، الجمع (den / — / meinen + الاسم ينتهي بـ -n غالباً).',
				'حروف الجر المتبادلة (Wechselpräpositionen: in, an, auf, über, unter, vor, hinter, neben, zwischen): مع السؤال Wo? (سكون: liegen, stehen, sitzen, bleiben, arbeiten in) -> Dativ؛ ومع السؤال Wohin? (حركة إلى مكان: legen, stellen, setzen, fahren, gehen in) -> Akkusativ. اختصارات شائعة: in dem = im، in das = ins، an dem = am، an das = ans، zu dem = zum، zu der = zur.'
			],
			visualSvg: svgGermanConjugationChart({
				title: 'Deklination der Artikel in 3 Kasus',
				subtitle: 'Bestimmte und unbestimmte Artikel (Nom. / Akk. / Dat.)',
				width: 580,
				columns: [
					{
						header: 'Nominativ (Wer?)',
						rule: 'M: der | F: die | N: das | Pl: die',
						examples: 'ein / eine / ein / meine'
					},
					{
						header: 'Akkusativ (Wen?)',
						rule: 'M: den | F: die | N: das | Pl: die',
						examples: 'einen / eine / ein / meine'
					},
					{
						header: 'Dativ (Wem?)',
						rule: 'M: dem | F: der | N: dem | Pl: den+n',
						examples: 'einem / einer / einem / meinen'
					}
				]
			}),
			visualCaptionAr: 'جدول تصريف أدوات التعريف والتنكير في الرفع والنصب والجر',
			examples: [
				{
					problemAr:
						'Ergänze Artikel oder Präpositionen im richtigen Kasus: «a) Ich lege (mein Buch, n.) auf (der Tisch, m.). b) Jetzt liegt (das Buch) auf (der Tisch). c) Amin hilft (sein Freund, m.) in (die Bibliothek, f.).»',
					solutionAr:
						'«a) mein Buch (Akk. neutral) / auf den Tisch (Wohin? -> Akk. maskulin). | b) das Buch (Nom.) / auf dem Tisch (Wo? -> Dat. maskulin). | c) seinem Freund (Dat. nach helfen) / in der Bibliothek (Wo? -> Dat. feminin).»'
				},
				{
					problemAr:
						'Setze ein: «Für ...... (unser Vater) kaufen wir ...... (ein neuer Kalender, m.) und danken ...... (die Lehrerin) für ihre Mühe.»',
					solutionAr:
						'«Für unseren Vater (für + Akk. mask.) kaufen wir einen neuen Kalender (Akk. mask.) und danken der Lehrerin (danken + Dat. fem.) für ihre Mühe.»'
				}
			],
			watchOutAr:
				'احذر من قاعدة جمع الـ Dativ ومن المؤنث في الـ Dativ! في Dativ تصبح أداة المؤنث «der» (مثل: in der Schule, mit der Mutter) فلا تخلطها بالمذكر Nominativ! وفي الجمع Dativ تصبح الأداة «den» مع إضافة «-n» لنهاية الاسم (مثل: mit den Schülern, mit den Büchern) ما لم ينتهِ أصلاً بـ -n أو -s (mit den Eltern / Autos).'
		},
		practice: [
			{
				questionAr:
					'Wähle den grammatisch richtigen Satz mit Akkusativ und Dativ:',
				options: [
					'Die Schülerin stellt ihre Tasche neben dem Stuhl und hilft ihren Bruder.',
					'Die Schülerin stellt ihre Tasche neben den Stuhl und hilft ihrem Bruder.',
					'Die Schülerin stellt ihrer Tasche neben den Stuhl und hilft ihren Bruder.',
					'Die Schülerin stellt ihre Tasche neben der Stuhl und hilft ihrem Bruder.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفعل stellen يطلب Akkusativ (neben den Stuhl) والفعل helfen يطلب Dativ (ihrem Bruder).',
					'ممتاز! stellen + Wohin -> Akkusativ (den Stuhl) و helfen -> Dativ (ihrem Bruder).',
					'خطأ: المفعول المباشر لـ stellen هو Akkusativ (ihre Tasche)، و helfen يطلب Dativ.',
					'خطأ: der Stuhl في Nominativ لا تصلح بعد neben + Wohin.'
				],
				explanationAr:
					'الفعل stellen يدل على الحركة (Wohin?) فيتلوه Akkusativ (den Stuhl)، بينما helfen فعل لازم مع Dativ (ihrem Bruder).'
			},
			{
				questionAr:
					'Ergänze den Satz: «Seit ...... Jahr wohne ich mit ...... Eltern in ...... ruhigen Straße.» (das Jahr, die Eltern Pl., die Straße)',
				options: [
					'einem / meinen / einer',
					'ein / meine / eine',
					'einen / meinen / der',
					'einem / meiner / einer'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! حروف الجر seit و mit تطلب Dativ دائماً، وفي جملة السكون in + Wo يأخذ Dativ: einem Jahr / meinen Eltern / einer ruhigen Straße.',
					'خطأ: حروف الجر seit و mit لا تأخذ Nominativ أو Akkusativ.',
					'خطأ: «das Jahr» محايد فيأخذ einem في Dativ وليس einen.',
					'خطأ: «Eltern» جمع فيأخذ meinen في Dativ وليس meiner.'
				],
				explanationAr:
					'حروف الجر seit و mit تطلب Dativ دائماً (einem Jahr, meinen Eltern)، و in للموقع الثابت (Wo?) تأخذ Dativ للمؤنث (einer Straße).'
			},
			{
				questionAr:
					'Wo steht das Verb richtig im Dativ Plural?',
				options: [
					'Der Lehrer spricht mit die Schüler über die Texte.',
					'Der Lehrer spricht mit den Schülern über die Texte.',
					'Der Lehrer spricht mit dem Schülern über den Texte.',
					'Der Lehrer spricht mit den Schüler über die Texten.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: mit يطلب Dativ والجمع في Dativ يأخذ den + -n.',
					'ممتاز! «mit den Schülern» (Dativ Plural) و«über die Texte» (über + Akkusativ هنا بمعنى «حول موضوع»).',
					'خطأ: dem للمفرد المذكر/المحايد وليس للجمع.',
					'خطأ: ينقص حرف -n في Schülern، و über بمعنى «عن» يأخذ Akkusativ (die Texte).'
				],
				explanationAr:
					'في صيغة Dativ Plural تصبح الأداة den ويضاف -n إلى الاسم الجمع (den Schülern)، بينما «über + موضوع» تأخذ Akkusativ.'
			}
		]
	},
	{
		id: 'ger_lesson_2as_le_t1_vergangenheit_perfekt_praeteritum',
		slug: 'ger-2as-le-t1-vergangenheit-perfekt-praeteritum',
		grade: '2as_le',
		yearSubjectId: 783,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr:
			'المجال الأول: الحياة الخاصة والمدرسة وأساسيات النحو (Privatleben, Schule & Grundlagen der Grammatik)',
		order: 4,
		titleAr:
			'الماضي المركب والماضي البسيط للأفعال المساعدة (Perfekt mit haben/sein & Präteritum von sein/haben)',
		objectives: [
			'صياغة الماضي المركب (Perfekt) باستعمال الفعل المساعد haben أو sein في الموقع الثاني واسم المفعول (Partizip II) في نهاية الجملة',
			'التمييز الدقيق بين الأفعال التي تأخذ «sein» (أفعال الانتقال والحركة من مكان لآخر وتغير الحالة + sein/bleiben/werden) والأفعال التي تأخذ «haben»',
			'تكوين اسم المفعول (Partizip II) للأفعال الضعيفة والقوية والمنفصلة وغير المنفصلة والأفعال المنتهية بـ -ieren، وتوظيف Präteritum لـ sein و haben و Modalverben'
		],
		keywordsAr: [
			'Perfekt',
			'haben vs sein',
			'Partizip II',
			'Präteritum (war / hatte)',
			'Satzklammer im Perfekt',
			'الماضي المركب'
		],
		discover: {
			scenarioAr:
				'يكتب كريم في مذكراته عن نهاية الأسبوع: «Am Freitag war ich sehr fleißig und hatte viel Zeit zum Lesen. Um sieben Uhr bin ich aufgestanden und habe mit meinen Eltern gefrühstückt. Danach sind wir zu meiner Großmutter gefahren. Am Nachmittag habe ich zwei Kapitel studiert und einen Brief an meinen Freund geschrieben. Am Abend sind wir glücklich nach Hause zurückgekommen.» لاحظ الأفعال المساعدة war/hatte و bin/habe.',
			svg: svgGermanTenseTimeline({
				title: 'Vergangenheit im Alltag (2AS LE)',
				tenseName: 'Perfekt & Präteritum',
				formula: 'haben / sein (Pos. 2) + ... + Partizip II (Ende) | war / hatte',
				activeZone: 'past',
				example: 'Gestern bin ich nach Tlemcen gefahren und habe viel gelernt.',
				markers: 'gestern, letzte Woche, am Freitag, vor einem Jahr',
				width: 560
			}),
			steps: [
				{
					promptAr:
						'قارن بين «bin ich aufgestanden / sind wir gefahren» وبين «habe gefrühstückt / habe geschrieben»: لماذا استُعمل «sein» في الأولى و«haben» في الثانية؟',
					hintAr: 'هل «النهوض» و«السفر» و«العودة» تدل على انتقال حركي أو تغير حالة، أم فعل متعدٍ/ثابت؟',
					expectedInput: 'sein لأفعال الحركة الانتقالية وتغير الحالة، و haben لبقية الأفعال المتعدية واللازمة الثابتة',
					revealAr:
						'يستعمل المساعد «sein» مع أفعال الانتقال المكاني (gehen, fahren, kommen, fliegen, laufen) وأفعال تغير الحالة (aufstehen, einschlafen, wachsen, sterben) ومع الأفعال الثلاثة: sein (gewesen), bleiben (geblieben), werden (geworden). أما باقي الأفعال (بما فيها الأفعال المتعدية والانعكاسية) فتأخذ «haben»!'
				},
				{
					promptAr:
						'انظر إلى أسماء المفعول الأربعة في النص: «aufgestanden», «gefrühstückt», «studiert», «geschrieben». لماذا لم يأخذ «studiert» السابقة ge- وأين دخلت ge- في «aufgestanden»؟',
					hintAr: 'لاحظ نهاية «-iert» والفعل المنفصل «aufstehen».',
					expectedInput: 'الأفعال المنتهية بـ -ieren (مثل studiert) والغير منفصلة لا تأخذ ge-، وفي المنفصلة تدخل ge بين السابقة والجذر (auf-ge-standen)',
					revealAr:
						'قواعد Partizip II الذهبية: (1) القياسي: ge- + Stamm + -t (gelernt)؛ (2) القوي: ge- + Stamm + -en مع تغير حركة أحياناً (geschrieben, gefahren)؛ (3) المنفصل: السابقة + ge + الجذر (aufgestanden, zurückgekommen)؛ (4) غير المنفصل (be-, er-, ver-...) أو المنتهي بـ -ieren: بدون ge- (verstanden, besucht, studiert)!'
				},
				{
					promptAr:
						'لماذا استعمل كريم «war ich» و«hatte viel Zeit» بدل «bin gewesen» و«habe gehabt» في الجملة الأولى؟',
					hintAr: 'كيف نُعبر غالباً عن sein و haben في الماضي في الألمانية الطبيعية؟',
					expectedInput: 'في الألمانية نُفضل صيغة Präteritum القصيرة war و hatte مع sein و haben',
					revealAr:
						'بالرغم من إمكانية قول «ist gewesen» أو «hat gehabt»، فإن المتحدثين والكتاب يفضلون دائماً Präteritum المختصر مع sein (war, warst, war, waren, wart, waren) و haben (hatte, hattest, hatte, hatten) ومع Modalverben (musste, konnte, wollte, durfte, sollte).'
				}
			]
		},
		summary: {
			rulesAr: [
				'بنية الماضي المركب (Perfekt): الفاعل + (haben أو sein مصرفاً في الموقع 2) + المكملات + Partizip II في آخر الجملة (Satzklammer). أمثلة: Wir haben gestern einen Text gelesen. / Ihr seid früh angekommen.',
				'متى نختار sein ومتى نختار haben؟ نختار «sein» في 3 حالات محددة: (1) حركة من نقطة أ إلى ب (gehen -> ist gegangen، fahren -> ist gefahren، kommen -> ist gekommen، reisen -> ist gereist، zurückkommen -> ist zurückgekommen)؛ (2) تغير حالة/وضع (aufstehen -> ist aufgestanden، einschlafen -> ist eingeschlafen)؛ (3) الأفعال الخاصة (sein -> ist gewesen، bleiben -> ist geblieben، werden -> ist geworden، passieren -> ist passiert). وتأخذ «haben» كل الأفعال ذات المفعول به المباشر وكل الأفعال الانعكاسية والأفعال الأخرى.',
				'صياغة اسم المفعول (Partizip II): الضعيف المنتظم: ge-...-t (machen -> gemacht، lernen -> gelernt)؛ القوي/الشاذ: ge-...-en (schreiben -> geschrieben، sprechen -> gesprochen، lesen -> gelesen، finden -> gefunden)؛ المنفصل: Präfix + ge + ... (vorbereiten -> vorbereitet، einladen -> eingeladen)؛ غير المنفصل (be-, er-, ver-, ent-, zer-): بدون ge- (erklären -> erklärt، verstehen -> verstanden)؛ المنتهي بـ -ieren: بدون ge- وتنتهي بـ -t (studieren -> studiert، telefonieren -> telefoniert).',
				'الماضي البسيط (Präteritum) للأفعال المساعدة والجهية: sein (ich war, du warst, er war, wir waren, ihr wart, sie waren)؛ haben (ich hatte, du hattest, er hatte, wir hatten, ihr hattet, sie hatten)؛ Modalverben بدون Umlaut (musste, konnte, durfte, wollte, sollte).'
			],
			visualSvg: svgGermanConjugationChart({
				title: 'Perfekt (haben / sein) & Präteritum',
				subtitle: 'Hilfsverb auf Pos. 2 + Partizip II am Satzende',
				width: 580,
				columns: [
					{
						header: 'Perfekt mit HABEN',
						rule: 'Objekt, Reflexiv, Ruhe',
						examples: 'habe gelernt / gelesen'
					},
					{
						header: 'Perfekt mit SEIN',
						rule: 'Bewegung, Wechsel, sein',
						examples: 'bin gefahren / aufgestanden'
					},
					{
						header: 'Präteritum (kurz)',
						rule: 'sein / haben / Modalverb',
						examples: 'ich war / hatte / konnte'
					}
				]
			}),
			visualCaptionAr: 'المقارنة التركيبية بين الماضي المركب بـ haben/sein والماضي البسيط المساعد',
			examples: [
				{
					problemAr:
						'Setze die Sätze ins Perfekt (oder Präteritum bei sein/haben): «a) Am Montag (fahren) wir mit dem Bus nach Algier. b) Dort (besuchen) meine Klasse die Nationalbibliothek. c) Am Abend (sein) alle Schüler sehr zufrieden.»',
					solutionAr:
						'«a) Am Montag sind wir mit dem Bus nach Algier gefahren. (حركة -> sein + gefahren) | b) Dort hat meine Klasse die Nationalbibliothek besucht. (غير منفصل بدون ge-) | c) Am Abend waren alle Schüler sehr zufrieden. (Präteritum von sein)»'
				},
				{
					problemAr:
						'Bilde das Partizip II dieser fünf Verben: «schreiben, vorbereiten, erklären, telefonieren, bleiben».',
					solutionAr:
						'«geschrieben (فعل قوي), vorbereitet (منفصل مع جذر مبدوء بـ be- غير منفصلة: بدون ge-), erklärt (غير منفصل: بدون ge-), telefoniert (نهاية -iert: بدون ge-), geblieben (فعل قوي مع sein)»'
				}
			],
			watchOutAr:
				'تنبيه مهم جداً في اسم المفعول: الأفعال مثل «vorbereiten» أو «verstehen» أو «studieren» لا تأخذ «ge-» أبداً (vorbereitet وليس vorgebereitet؛ studiert وليس gestudiert؛ verstanden وليس geverstanden)! ولا تنسَ أن الأفعال المنفصلة الحركية مثل «aufstehen» و«ankommen» تأخذ «sein» وليس «haben» (Ich bin aufgestanden وليس Ich habe aufgestanden).'
		},
		practice: [
			{
				questionAr:
					'Welcher Satz steht im Perfekt mit dem richtigen Hilfsverb und dem korrekten Partizip II?',
				options: [
					'Gestern habe ich nach Oran gefahren und bin ein Buch studiert.',
					'Gestern bin ich nach Oran gefahren und habe drei Stunden studiert.',
					'Gestern bin ich nach Oran gefahrt und habe drei Stunden gestudiert.',
					'Gestern habe ich nach Oran gefahrt und bin drei Stunden studiert.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: fahren يأخذ sein لأنه انتقال، و studieren يأخذ haben ولا يأخذ ge-.',
					'ممتاز! fahren يأخذ bin ... gefahren، و studieren يأخذ habe ... studiert (بدون ge-).',
					'خطأ: اسم المفعول من fahren هو gefahren وليس gefahrt، و studieren لا يأخذ ge-.',
					'خطأ: خلط كامل في المساعدين واسم المفعول.'
				],
				explanationAr:
					'الفعل fahren فعل انتقال مكاني فيأخذ sein واسم المفعول القوي gefahren، بينما studieren ينتهي بـ -ieren فيأخذ haben واسم المفعول studiert بدون ge-.'
			},
			{
				questionAr:
					'Ergänze die Lücken im Perfekt und Präteritum: «Letzte Woche ...... wir in Tlemcen, ...... die Große Moschee ...... und ...... um 19 Uhr zurück...... .»',
				options: [
					'waren / haben ... besucht / sind ... gekommen',
					'hatten / sind ... gebesucht / haben ... gekommen',
					'waren / haben ... gebesucht / sind ... gegekommen',
					'sind / haben ... besucht / hatten ... gekommen'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! waren (ماضي sein)، haben ... besucht (غير منفصل بدون ge-)، sind ... zurückgekommen (فعل حركة منفصل مع sein و ge- بين السابقة والجذر).',
					'خطأ: besuchen يأخذ haben ولا يأخذ ge-، و zurückkommen يأخذ sein.',
					'خطأ: besuchen (be-) بدون ge- و kommen اسم مفعوله gekommen.',
					'خطأ: الصيغة الأولى تحتاج waren والمقطع الثالث يحتاج sind.'
				],
				explanationAr:
					'zurückkommen يجمع قاعدة الفعل المنفصل وحركة الانتقال: sind ... zurückgekommen، و besuchen مبدوء بـ be- غير المنفصلة: haben ... besucht.'
			},
			{
				questionAr:
					'Welche Partizip-II-Reihe ist zu 100 % korrekt gebildet?',
				options: [
					'aufgestanden, geschrieben, verstanden, telefoniert',
					'aufgesteht, geschreibt, geverstanden, getelefoniert',
					'geaufstanden, geschrieben, verstandet, telefoniert',
					'aufgestanden, geschreibt, verstanden, getelefoniert'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! aufgestanden (منفصل)، geschrieben (قوي)، verstanden (غير منفصل بدون ge-)، telefoniert (نهاية -iert بدون ge-).',
					'خطأ: أخطاء شائعة في جميع الكلمات الأربع.',
					'خطأ: في الفعل المنفصل تدخل ge- بعد السابقة (aufgestanden) وليس قبلها.',
					'خطأ: schreiben قوي (geschrieben) و telefonieren بدون ge-.'
				],
				explanationAr:
					'مراعاة قواعد بناء اسم المفعول: المنفصل (auf-ge-standen)، القوي (geschrieben)، غير المنفصل (verstanden)، و -ieren (telefoniert).'
			}
		]
	}
];
