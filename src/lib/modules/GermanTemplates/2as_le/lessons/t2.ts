import type { GermanInteractiveLessonData } from '../../types';
import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';
import {
	svgGermanConjugationChart,
	svgGermanGrammarMap,
	svgGermanWordFormation
} from '../../svg-german';

export const LESSONS_2AS_LE_T2: GermanInteractiveLessonData[] = [
	{
		id: 'ger_lesson_2as_le_t2_gesunde_ernaehrung_sport',
		slug: 'ger-2as-le-t2-gesunde-ernaehrung-sport',
		grade: '2as_le',
		yearSubjectId: 783,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr:
			'المجال الثاني: الصحة والبيئة والجمل الجانبية واشتقاق المفردات (Gesundheit, Umwelt, Nebensätze & Wortbildung)',
		order: 1,
		titleAr:
			'التغذية الصحية الحلال والرياضة والتوازن اليومي (Gesunde Ernährung & Sport)',
		objectives: [
			'اكتساب الرصيد المعجمي الدقيق للتغذية الصحية السليمة والحلال (Olivenöl, Datteln, Vollkornbrot, Wasser, Obst, Gemüse) والرياضة المفيدة (Schwimmen, Radfahren, Wandern)',
			'توظيف الأفعال الانعكاسية (reflexive Verben: sich ernähren, sich bewegen, sich ausruhen) وصيغة الأمر الإرشادي (Imperativ) لتقديم نصائح صحية',
			'التمييز بين العادات الغذائية المفيدة والعادات المضرة بالصحة والتحصيل الدراسي (Fast Food, Zuckerkonsum, Schlafmangel)'
		],
		keywordsAr: [
			'gesunde Ernährung',
			'Sport & Bewegung',
			'reflexive Verben',
			'Imperativ',
			'Lebensweise',
			'التغذية والرياضة'
		],
		discover: {
			scenarioAr:
				'في مجلة الثانوية الصحية، يكتب طارق مقالاً حول سر نشاطه اليومي: «Wer im Unterricht konzentriert mitarbeiten möchte, muss auf eine gesunde und ausgewogene Ernährung achten. Ich ernähre mich gesund: Zum Frühstück esse ich Datteln, Vollkornbrot mit Olivenöl und frisches Obst, und dazu trinke ich klares Wasser oder Kräutertee. Nach der Schule bewege ich mich regelmäßig: Ich fahre Rad oder gehe schwimmen. Abends ruhe ich mich rechtzeitig aus.» تأمّل عناصر نمط الحياة المتوازن في الخريطة المرفقة.',
			svg: svgGermanGrammarMap({
				title: 'Gesund leben im Alltag (2AS LE)',
				rootLabel: 'Gesundheit & Wohlbefinden',
				rootSub: 'Halal-Ernährung, Bewegung und Erholung',
				width: 580,
				branches: [
					{
						label: 'Ernährung',
						rule: 'Obst, Gemüse, Olivenöl',
						example: 'Datteln, Vollkornbrot'
					},
					{
						label: 'Getränke',
						rule: 'Viel Wasser & Kräutertee',
						example: 'wenig Zucker trinken'
					},
					{
						label: 'Sport',
						rule: 'Regelmäßige Bewegung',
						example: 'Schwimmen, Radfahren'
					},
					{
						label: 'Erholung',
						rule: 'Genug Schlaf & Pausen',
						example: 'sich früh ausruhen'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'استخرج من نص طارق الأطعمة والمشروبات الصحية الحلال التي يتناولها صباحاً ثم الأنشطة الرياضية التي يمارسها.',
					hintAr: 'ابحث في جملة الفطور (Zum Frühstück...) وفي الجملة التي تليها.',
					expectedInput: 'Datteln, Vollkornbrot, Olivenöl, Obst, Wasser, Kräutertee | Rad fahren, schwimmen',
					revealAr:
						'تعتمد التغذية المتوازنة على الأغذية الطبيعية الحلال: التمر (Datteln)، خبز القمح الكامل (Vollkornbrot)، زيت الزيتون (Olivenöl)، الفواكه الطازجة (frisches Obst)، الماء وشاي الأعشاب (Wasser, Kräutertee)، مع ممارسة ركوب الدراجة (Rad fahren) والسباحة (schwimmen).'
				},
				{
					promptAr:
						'لاحظ الأفعال الانعكاسية الثلاثة في النص: «Ich ernähre mich», «bewege ich mich», «ruhe ich mich aus». ماذا تلاحظ عند تصريفها مع الضمير ich، وماذا تصبح مع wir و Sie؟',
					hintAr: 'تذكر الضمائر الانعكاسية في Akkusativ: mich, dich, sich, uns, euch, sich.',
					expectedInput: 'مع ich نستخدم mich، ومع wir نستخدم uns، ومع Sie/er/sie نستخدم sich',
					revealAr:
						'الأفعال الانعكاسية (reflexive Verben) تقترن بضمير انعكاسي يطابق الفاعل: ich ... mich، du ... dich، er/sie/es ... sich، wir ... uns، ihr ... euch، sie/Sie ... sich. أمثلة: Wir ernähren uns gesund. / Ihr bewegt euch viel.'
				},
				{
					promptAr:
						'حوّل نصيحة طارق «Du sollst jeden Tag viel Wasser trinken und frisches Gemüse essen» إلى صيغة الأمر المباشر (Imperativ mit du).',
					hintAr: 'تذكر حذف du ونهاية -st في الأمر (ومع essen يتغير e إلى i: iss!).',
					expectedInput: 'Trink jeden Tag viel Wasser und iss frisches Gemüse!',
					revealAr:
						'في صيغة الأمر للمفرد (du): نحذف الضمير du والنهاية -st: trinkst -> Trink! / bewegst -> Beweg dich! أما مع تغير الحركة e -> i/ie فيبقى التغير (essen -> Iss! / lesen -> Lies!) بينما يسقط الـ Umlaut في a -> ä (fahren -> Fahr!).'
				}
			]
		},
		summary: {
			rulesAr: [
				'معجم التغذية الصحية الحلال (Gesunde Ernährung): das Frühstück (الفطور)، das Vollkornbrot (الخبز الكامل)، das Olivenöl (زيت الزيتون)، die Datteln (التمر)، das Obst und Gemüse (الفواكه والخضر)، die Hülsenfrüchte (البقوليات)، der Fisch und das Geflügel (السمك والدواجن)، die Milchprodukte (مشتقات الحليب)، das Mineralwasser (الماء المعدني)، der Kräutertee (شاي الأعشاب). تجنب: Fast Food، المشروبات السكرية (Limonade mit viel Zucker).',
				'معجم الرياضة والصحة (Sport & Gesundheit): Sport treiben (يمارس الرياضة)، schwimmen gehen (يسبح)، Rad fahren (يركب الدراجة)، wandern (يتنزه مشياً)، das Gleichgewicht (التوازن)، die Ausdauer (التحمل)، die Konzentration (التركيز)، die Vorbeugung (الوقاية).',
				'الأفعال الانعكاسية في الصحة (Reflexive Verben): sich gesund ernähren (يتغذى صحياً)، sich regelmäßig bewegen (يتحرك بانتظام)، sich fit halten (يحافظ على لياقته)، sich ausruhen (يستريح)، sich konzentrieren (يركز)، sich wohl fühlen (يشعر بالارتياح). تصريف الضمير الانعكاسي: mich / dich / sich / uns / euch / sich.',
				'صيغة الأمر للإرشاد الصحي (Imperativ): للمفرد المألوف (du): جذع الفعل بدون -st (Trink Wasser! Iss Obst! Ruh dich aus!)؛ وللجمع المألوف (ihr): نفس صيغة الحاضر بدون الضمير ihr (Bewegt euch regelmäßig!)؛ وللاحترام (Sie): المصدر + Sie (Ernähren Sie sich ausgewogen! Nehmen Sie sich Zeit!).'
			],
			visualSvg: svgGermanConjugationChart({
				title: 'Reflexive Verben & Imperativ (Gesundheit)',
				subtitle: 'Rat und Gewohnheiten für ein gesundes Leben',
				width: 580,
				columns: [
					{
						header: 'Reflexivpronomen',
						rule: 'mich / dich / sich / uns / euch',
						examples: 'Wir ernähren uns gesund.'
					},
					{
						header: 'Imperativ (du)',
						rule: 'Ohne du / -st; e->i bleibt',
						examples: 'Trink Tee! Iss Datteln!'
					},
					{
						header: 'Imperativ (ihr / Sie)',
						rule: 'ihr ohne Pron. | Verb + Sie',
						examples: 'Bewegt euch! Ruhen Sie aus!'
					}
				]
			}),
			visualCaptionAr: 'قواعد الأفعال الانعكاسية وصيغة الأمر في النصوص الإرشادية الصحية',
			examples: [
				{
					problemAr:
						'Ergänze das Reflexivpronomen: «a) Nach dem Training ruhen wir ...... zehn Minuten aus. b) Warum bewegst du ...... am Wochenende nicht im Park? c) Alle Schüler müssen ...... im Unterricht gut konzentrieren.»',
					solutionAr:
						'«a) uns (wir -> uns) | b) dich (du -> dich) | c) sich (alle Schüler / sie -> sich)»'
				},
				{
					problemAr:
						'Bilde den Imperativ (du und Sie) für diese Gesundheitstipps: «a) frisches Gemüse essen; b) morgens Sport treiben; c) genug Wasser trinken».',
					solutionAr:
						'«a) Iss frisches Gemüse! / Essen Sie frisches Gemüse! | b) Treib morgens Sport! / Treiben Sie morgens Sport! | c) Trink genug Wasser! / Trinken Sie genug Wasser!»'
				}
			],
			watchOutAr:
				'احذر من أمر الفعلين القويين «essen» و«fahren» مع du: الفعل «essen» يحافظ على إبدال e->i فنقول «Iss langsam!» (وليس Ess!)، بينما الفعل «fahren» يسقط منه الـ Umlaut فنقول «Fahr vorsichtig Rad!» (وليس Fähr!). وكذلك مع «sein» الصيغة شاذة تماماً: «Sei aktiv! / Seid aktiv! / Seien Sie aktiv!».'
		},
		practice: [
			{
				questionAr:
					'Welche Antwort ergänzt beide Sätze über gesunde Lebensgewohnheiten korrekt? «Meine Geschwister und ich ernähren ...... ausgewogen, und unsere Großmutter ruht ...... nach dem Spaziergang aus.»',
				options: [
					'sich / uns',
					'uns / sich',
					'euch / sich',
					'mich / ihr'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفاعل «Meine Geschwister und ich» يساوي wir فيأخذ uns، والجدة هي sie فتأخذ sich.',
					'ممتاز! مع wir (أخي/أخواتي وأنا) نستعمل uns، ومع unsere Großmutter (sie) نستعمل sich.',
					'خطأ: euch تخص الضمير ihr وليس الجمع المتكلم wir.',
					'خطأ: mich للمتكلم المفرد ich و ihr ليست ضميراً انعكاسياً.'
				],
				explanationAr:
					'الفاعل المركب مع «und ich» يعامل معاملة «wir» فيأخذ الضمير الانعكاسي «uns»، والغائبة المفردة تأخذ «sich».'
			},
			{
				questionAr:
					'Welcher Imperativsatz für «du» ist grammatisch fehlerfrei gebildet?',
				options: [
					'Esst jeden Morgen zwei Datteln und fährst danach mit dem Fahrrad!',
					'Iss jeden Morgen drei Datteln und fahr danach mit dem Fahrrad!',
					'Ess jeden Morgen drei Datteln und fähr danach mit dem Fahrrad!',
					'Isst jeden Morgen drei Datteln und fahre danach mit dem Fahrrad!'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: خلط بين الجمع esst والمفرد fährst بالـ Umlaut.',
					'أحسنت! الأمر من essen مع du هو Iss (تبقى i)، ومن fahren هو fahr (يسقط الـ Umlaut وتُحذف -st).',
					'خطأ: essen يتحول إلى Iss وليس Ess، و fahren يسقط منه Umlaut.',
					'خطأ: لا تُضاف نهاية -t في أمر المفرد du.'
				],
				explanationAr:
					'أمر المفرد (du) يحافظ على تغير e -> i/ie (Iss! Lies!) ويسقط فيه الـ Umlaut a -> ä (Fahr!).'
			},
			{
				questionAr:
					'Welche Wortgruppe passt vollständig zu einer gesunden und erlaubten Ernährung?',
				options: [
					'Vollkornbrot, Olivenöl, Datteln, Mineralwasser, frisches Gemüse',
					'Fast Food, viel Zucker, Schlafmangel, stundenlanges Sitzen',
					'salzige Chips, künstliche Farbstoffe, kaum Bewegung',
					'Fertiggerichte, zu viel Koffein, unregelmäßige Mahlzeiten'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! كلها عناصر أصيلة للغذاء الصحي الحلال المتوازن.',
					'خطأ: الوجبات السريعة وقلة النوم تضر بالصحة والتركيز.',
					'خطأ: المأكولات المصنعة عالية الملح وقلة الحركة غير صحية.',
					'خطأ: الوجبات الجاهزة وعدم انتظام الأكل تضعف التوازن البدني.'
				],
				explanationAr:
					'الغذاء الصحي المتوازن يجمع بين الخبز الكامل وزيت الزيتون والتمر والخضر الطازجة والماء الكافي.'
			}
		]
	},
	{
		id: 'ger_lesson_2as_le_t2_umweltschutz_natur',
		slug: 'ger-2as-le-t2-umweltschutz-natur',
		grade: '2as_le',
		yearSubjectId: 783,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr:
			'المجال الثاني: الصحة والبيئة والجمل الجانبية واشتقاق المفردات (Gesundheit, Umwelt, Nebensätze & Wortbildung)',
		order: 2,
		titleAr:
			'حماية البيئة والطبيعة وترشيد الماء والنظافة في الإسلام (Umweltschutz, Natur & Wasser sparen)',
		objectives: [
			'اكتساب المفردات الأساسية للبيئة والتلوث والحلول المستدامة (Umweltschutz, Luftverschmutzung, Mülltrennung, Recycling, Aufforstung, erneuerbare Energien)',
			'ربط قيم الحفاظ على الماء والنظافة وحماية الغابات بالأخلاق الإسلامية (Sparsamkeit mit Wasser, Sauberkeit und Verantwortung für die Schöpfung)',
			'صياغة جمل التوعية والالتزام البيئي باستعمال man muss / wir sollten / es ist wichtig + zu + Infinitiv'
		],
		keywordsAr: [
			'Umweltschutz',
			'erneuerbare Energien',
			'Mülltrennung & Recycling',
			'Wasser sparen',
			'Sauberkeit & Verantwortung',
			'حماية البيئة'
		],
		discover: {
			scenarioAr:
				'يشارك تلاميذ السنة الثانية في يوم بيئي بالثانوية تحت شعار «Saubere Schule, grüne Zukunft». يقول المنسق: «Der Schutz der Natur und die Sauberkeit sind für uns eine moralische Pflicht. Im Islam gilt Sauberkeit als wesentlicher Teil des Glaubens, und wir dürfen kostbares Wasser niemals verschwenden. Deshalb sparen wir Wasser, trennen Papier und Glas für das Recycling, pflanzen junge Olivenbäume und nutzen Sonnen- und Windenergie.» تأمّل اللوحة التوضيحية واستخلص محاور حماية البيئة.',
			svg: renderLessonIllustration('ger_04_umweltschutz_erneuerbare_energien', {
				lang: 'de',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'ما الحلول الأربعة الممثلة في اللوحة المرفقة لحماية المحيط والطبيعة؟',
					hintAr: 'انظر إلى مفتاح اللوحة (Solarenergie, Windkraft, Recycling, Aufforstung).',
					expectedInput: 'الطاقة الشمسية، طاقة الرياح، إعادة التدوير وفرز النفايات، والتشجير وحماية الغابات',
					revealAr:
						'تبرز اللوحة أربعة حلول عملية متكاملة: الطاقة الشمسية الكهروضوئية (Solarenergie)، عنفات الرياح (Windkraftanlagen)، الفرز وإعادة التدوير (Mülltrennung und Recycling)، والتشجير وحماية الغابات (Aufforstung und Waldschutz).'
				},
				{
					promptAr:
						'كيف ربط النص بين حماية البيئة وترشيد الماء وبين القيم الإسلامية؟',
					hintAr: 'تأمل عبارة «Sauberkeit» وعبارة «Wasser niemals verschwenden».',
					expectedInput: 'النظافة ركن أخلاقي أساسي في الإسلام مع النهي عن الإسراف في الماء وإفساد الطبيعة',
					revealAr:
						'يؤكد النص التزاماً أخلاقياً أصيلاً: الطهارة والنظافة (Sauberkeit) من ركائز الإيمان والسلوك، والنهي عن تبذير الماء (Wasser verschwenden) وحفظ الغابات والتربة من التلوث مسؤولية كل فرد.'
				},
				{
					promptAr:
						'استخرج من النص التمهيدي أربعة أفعال تتعلق بالسلوك البيئي الإيجابي ثم اكتب مصدر كل منها.',
					hintAr: 'ابحث عن: sparen, trennen, pflanzen, nutzen.',
					expectedInput: 'Wasser sparen, Müll trennen, Bäume pflanzen, Sonnenenergie nutzen',
					revealAr:
						'التعابير الفعلية الأساسية في المجال البيئي: Wasser sparen (ترشيد الماء)، Müll trennen (فرز النفايات)، Bäume pflanzen (غرس الأشجار)، erneuerbare Energie nutzen (استعمال الطاقة المتجددة)، die Umwelt schützen (حماية البيئة).'
				}
			]
		},
		summary: {
			rulesAr: [
				'معجم المشكلات البيئية (Umweltprobleme): die Umweltverschmutzung (تلوث البيئة)، die Luftverschmutzung (تلوث الهواء)، das Abwasser (المياه المستعملة)، der Plastikmüll (النفايات البلاستيكية)، die Dürre und Wüstenbildung (الجفاف والتصحر)، der Klimawandel (التغير المناخي)، Wasser verschwenden (تبذير الماء).',
				'معجم الحلول البيئية (Umweltschutz & Lösungen): der Umweltschutz (حماية البيئة)، die Mülltrennung (فرز النفايات)، das Recycling / wiederverwerten (إعادة التدوير)، die Aufforstung (التشجير)، die Solarenergie (الطاقة الشمسية)، die Windkraft (طاقة الرياح)، nachhaltig handeln (التصرف باستدامة)، Strom und Wasser sparen (الاقتصاد في الكهرباء والماء).',
				'البعد القيمي والوطني: ربط مبادرة التشجير مثل السد الأخضر في الجزائر (der Grüne Damm in Algerien) ومحطات الطاقة الشمسية في الجنوب بقيم النظافة وعدم الإسراف (Sauberkeit und Sparsamkeit).',
				'تراكيب التوصية والالتزام: «Man muss den Müll richtig trennen»؛ «Wir sollten weniger Plastik verwenden»؛ «Es ist wichtig, Wasser zu sparen und Bäume zu pflanzen» (تركيب es ist wichtig + zu + Infinitiv).'
			],
			visualSvg: svgGermanGrammarMap({
				title: 'Umweltschutz & Nachhaltigkeit (2AS LE)',
				rootLabel: 'Verantwortung für die Natur',
				rootSub: 'Sauberkeit, Wassersparen & saubere Energie',
				width: 580,
				branches: [
					{
						label: 'Wasser sparen',
						rule: 'Keine Verschwendung',
						example: 'Hahn beim Waschen schließen'
					},
					{
						label: 'Mülltrennung',
						rule: 'Papier, Glas, Bio trennen',
						example: 'Recycling schützt Rohstoffe'
					},
					{
						label: 'Aufforstung',
						rule: 'Bäume gegen Wüste',
						example: 'Grüner Damm in Algerien'
					},
					{
						label: 'Saubere Energie',
						rule: 'Sonne & Wind nutzen',
						example: 'Solarenergie in der Sahara'
					}
				]
			}),
			visualCaptionAr: 'خريطة مفاهيم حماية البيئة والطاقات المتجددة والنظافة المسؤولة',
			examples: [
				{
					problemAr:
						'Ordne die sechs Begriffe in «Umweltproblem» oder «Umweltlösung»: «Plastikmüll, Solarenergie, Wasserverschwendung, Mülltrennung, Abgase, Aufforstung».',
					solutionAr:
						'Umweltproblem: Plastikmüll, Wasserverschwendung, Abgase. | Umweltlösung: Solarenergie, Mülltrennung, Aufforstung.'
				},
				{
					problemAr:
						'Formuliere zwei Umwelttipps mit «Es ist wichtig, ... zu + Infinitiv»:',
					solutionAr:
						'1) «Es ist wichtig, Papier und Glas sorgfältig zu trennen.» | 2) «Es ist wichtig, öffentliche Verkehrsmittel häufiger zu benutzen.»'
				}
			],
			watchOutAr:
				'انتبه لجنس الأسماء المركبة (Komposita) في المجال البيئي: في الألمانية يأخذ الاسم المركب دائماً جنس الكلمة الأخيرة! مثال: der Schutz -> der Umweltschutz (مذكر)، die Energie -> die Solarenergie (مؤنث)، die Trennung -> die Mülltrennung (مؤنث)، das Wasser -> das Trinkwasser (محايد).'
		},
		practice: [
			{
				questionAr:
					'Welcher Artikel passt jeweils genau zu den drei Umweltkomposita: «...... Umweltschutz, ...... Mülltrennung, ...... Trinkwasser»?',
				options: [
					'die Umweltschutz / der Mülltrennung / die Trinkwasser',
					'der Umweltschutz / die Mülltrennung / das Trinkwasser',
					'das Umweltschutz / die Mülltrennung / der Trinkwasser',
					'der Umweltschutz / der Mülltrennung / das Trinkwasser'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الكلمة الأخيرة هي التي تحدد أداة الاسم المركب.',
					'ممتاز! der Schutz -> der Umweltschutz، die Trennung -> die Mülltrennung، das Wasser -> das Trinkwasser.',
					'خطأ: Schutz مذكر (der) وليس محايداً (das).',
					'خطأ: كل كلمة تنتهي بـ -ung (مثل Trennung) تكون مؤنثة (die).'
				],
				explanationAr:
					'في الأسماء المركبة الألمانية (Komposita) يتبع الجنس والأداة دائماً الاسم الأساسي الأخير (Grundwort).'
			},
			{
				questionAr:
					'Welcher Satz drückt ein nachhaltiges und umweltfreundliches Verhalten aus?',
				options: [
					'Wir lassen beim Zähneputzen den Wasserhahn die ganze Zeit geöffnet.',
					'Wir trennen Papier, Glas und Kunststoff und nutzen erneuerbare Solarenergie.',
					'Wir werfen leere Flaschen einfach in den Schulhof oder in den Wald.',
					'Wir fällen gesunde Bäume ohne Grund und verschwenden elektrischen Strom.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: ترك الصنبور مفتوحاً هدر مرفوض للماء.',
					'أحسنت! فرز النفايات واستخدام الطاقة الشمسية سلوك بيئي مستدام.',
					'خطأ: رمي القارورات في الغابة أو فناء المدرسة يلوث المحيط.',
					'خطأ: قطع الأشجار وتبذير الكهرباء يضر بالبيئة.'
				],
				explanationAr:
					'الفرز الانتقائي (Mülltrennung) والاعتماد على الطاقة المتجددة (erneuerbare Energie) هما أساس التنمية المستدامة.'
			},
			{
				questionAr:
					'Welche Struktur mit «zu + Infinitiv» bei einem trennbaren Verb ist richtig?',
				options: [
					'Es ist notwendig, im Sommer junge Bäume einpflanzen zu.',
					'Es ist notwendig, im Sommer junge Bäume einzupflanzen.',
					'Es ist notwendig, im Sommer junge Bäume zu einpflanzen.',
					'Es ist notwendig, dass im Sommer junge Bäume einzupflanzen.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا تأتي zu بعد المصدر.',
					'ممتاز! في الأفعال المنفصلة (einpflanzen) تدخل الأداة zu بين السابقة والجذر (ein-zu-pflanzen).',
					'خطأ: لا توضع zu قبل السابقة المنفصلة.',
					'خطأ: لا نجمع بين dass و zu + Infinitiv في الجملة نفسها.'
				],
				explanationAr:
					'مع الأفعال المنفصلة في صيغة المصدر بـ zu تدخل «zu» بين السابقة والجذر: einpflanzen -> einzupflanzen، abgeben -> abzugeben.'
			}
		]
	},
	{
		id: 'ger_lesson_2as_le_t2_nebensaetze_weil_dass_wenn',
		slug: 'ger-2as-le-t2-nebensaetze_weil_dass_wenn',
		grade: '2as_le',
		yearSubjectId: 783,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr:
			'المجال الثاني: الصحة والبيئة والجمل الجانبية واشتقاق المفردات (Gesundheit, Umwelt, Nebensätze & Wortbildung)',
		order: 3,
		titleAr:
			'الجمل الجانبية ورتبة الفعل المصرف في النهاية (Nebensätze mit weil, da, dass, wenn)',
		objectives: [
			'التمييز الدلالي والتركيبي بين الروابط التبعية الأساسية في 2AS: السبب (weil, da)، الجملة المفعولية أو المكملة (dass)، والشرط/الزمن المتكرر (wenn)',
			'تطبيق القاعدة الصارمة للجملة الجانبية (Nebensatz): الفاصلة الإلزامية قبل الرابط + وضع الفعل المصرف في نهاية الجملة الجانبية تماماً (Verb am Ende)',
			'إتقان قاعدة قلب الترتيب (Inversion: Verb + Subjekt) في الجملة الرئيسية عندما تبدأ الجملة بالطرف الجانبي (Nebensatz + Komma + Verb + Subjekt)'
		],
		keywordsAr: [
			'Nebensätze',
			'weil / da (Kausal)',
			'dass (Objektsatz)',
			'wenn (Konditional)',
			'Verb am Ende & Inversion',
			'الجمل الجانبية'
		],
		discover: {
			scenarioAr:
				'اقرأ هذه الفقرة عن تنظيم الوقت والصحة: «Viele Schüler wissen, dass gesunde Ernährung die Konzentration stärkt. Ich treibe dreimal pro Woche Sport, weil ich fit bleiben möchte. Wenn man am Morgen früh aufsteht, hat man genug Ruhe für ein gesundes Frühstück. Da wir die Natur schützen müssen, bringen alle Kinder Mehrwegflaschen mit.» راقب الفاصلة وموقع الفعل المصرف في كل جملة تبدأ بـ dass أو weil أو wenn أو da!',
			svg: svgGermanGrammarMap({
				title: 'Nebensätze: weil, da, dass, wenn (2AS LE)',
				rootLabel: 'Komma + Konjunktion ... + Verb am Ende',
				rootSub: 'Das konjugierte Verb wandert ans Satzende',
				width: 580,
				branches: [
					{
						label: 'weil / da (Grund)',
						rule: 'Kausalsatz (Warum?)',
						example: '... weil ich Sport treibe.'
					},
					{
						label: 'dass (Inhalt)',
						rule: 'Nach wissen, glauben, hoffen',
						example: 'Ich weiß, dass es hilft.'
					},
					{
						label: 'wenn (Bedingung)',
						rule: 'Konditional / oft wiederholt',
						example: 'Wenn man spart, bleibt viel.'
					},
					{
						label: 'Inversion',
						rule: 'Nebensatz zuerst -> Verb + Subj.',
						example: 'Weil er lernt, hat er Erfolg.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'حدد الفعل المصرف وموقعه في الجملتين: «... weil ich fit bleiben möchte» و«Wenn man am Morgen früh aufsteht, ...». ماذا حدث لسابقة الفعل المنفصل «aufsteht»؟',
					hintAr: 'انظر إلى آخر كلمة في الجملة الجانبية في الحالتين.',
					expectedInput: 'الفعل المصرف (möchte, aufsteht) جاء في نهاية الجملة الجانبية، والفعل المنفصل اتصل ببعضه (aufsteht)',
					revealAr:
						'في الجملة الجانبية (Nebensatz) بعد weil, da, dass, wenn: (1) ينتقل الفعل المصرف دائماً إلى آخر الجملة؛ (2) مع الفعل الجهي أو الماضي المركب يسبق المصدر/اسم المفعول الفعل المساعد (bleiben möchte / gelernt hat)؛ (3) الفعل المنفصل لا ينفصل في الجملة الجانبية (aufsteht وليس steht ... auf)!'
				},
				{
					promptAr:
						'لاحظ ترتيب الكلمات بعد الفاصلة في: «Wenn man am Morgen früh aufsteht, hat man genug Ruhe...». لماذا جاء الفعل «hat» مباشرة بعد الفاصلة قبل الفاعل «man»؟',
					hintAr: 'كم موقعاً يشغله الطرف الجانبي بأكمله «Wenn man am Morgen früh aufsteht» داخل الجملة الكبرى؟',
					expectedInput: 'الجملة الجانبية كلها تشغل الموقع 1، فيأتي الفعل المصرف في الموقع 2 مباشرة بعد الفاصلة (Verb + Subjekt)',
					revealAr:
						'هذه قاعدة «Verb neben Verb / Inversion»: إذا بدأت الجملة بالطرف الجانبي (مثل Da... / Wenn... / Weil...) فإنه يحتل الموقع الأول (Pos. 1) بالكامل، لذلك يليه الفعل المصرف للرئيسية مباشرة بعد الفاصلة (Pos. 2) ثم الفاعل (hat man... / bringen alle...).'
				},
				{
					promptAr:
						'ما الفرق التداولي والتركيبي بين «weil» و«da» للتعبير عن السبب، وبين «weil» و«denn»؟',
					hintAr: 'أيهما يفضل البداية في الجملة (da)، وأيهما لا يغير موقع الفعل في الموقع 2 (denn)؟',
					expectedInput: 'da تتصدر الجملة غالباً (مع فعل في النهاية)، بينما denn رابط تنسيق يبقي الفعل في الموقع 2',
					revealAr:
						'«weil» و«da» أداتا ربط تبعيتان تضَعان الفعل المصرف في النهاية (وغالباً تبدأ da بالسبب المعروف: Da es regnet, bleiben wir drinnen). أما «denn» فهي رابطة تنسيق (مثل und/aber/oder) تترك الفعل في الموقع الثاني: Ich lerne Deutsch, denn die Sprache ist sehr interessant.'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة التركيبية للجملة الجانبية (Nebensatz): تُفصل الجملة الجانبية دائماً بفاصلة (Komma) عن الجملة الرئيسية، ويرتحل الفعل المصرف إلى آخر الجملة (Verb am Ende).',
				'روابط التبعية الأربع الرئيسية في 2AS: (1) السبب (Kausal): weil / da (بسبب / لأنّ)؛ (2) التكملة (Objektsatz): dass (أنّ — بعد wissen, denken, meinen, hoffen, sagen, es ist wichtig)؛ (3) الشرط أو الزمن المتكرر: wenn (إذا / كلما — للحاضر والمستقبل والعادة المتكررة).',
				'ترتيب الأفعال المركبة في نهاية الجملة الجانبية: مع Modalverb: [Infinitiv + Modalverb] (... weil wir Wasser sparen müssen)؛ مع Perfekt: [Partizip II + haben/sein] (... dass er gestern Sport getrieben hat)؛ مع فعل منفصل: يندمج الجزءان (... wenn der Unterricht um 8 Uhr anfängt).',
				'تقديم الجملة الجانبية (Nebensatz + Hauptsatz -> Inversion): إذا بدأنا بالطرف الجانبي صار هذا الطرف كله الموقع 1، فيأتي فعل الجملة الرئيسية في الموقع 2 مباشرة بعد الفاصلة ثم الفاعل: «Weil ich gesund bleiben will, treibe ich Sport.»'
			],
			visualSvg: svgGermanConjugationChart({
				title: 'Satzbau: Hauptsatz vs Nebensatz',
				subtitle: 'Position des konjugierten Verbs im Vergleich',
				width: 580,
				columns: [
					{
						header: 'Hauptsatz (denn)',
						rule: 'Verb bleibt auf Position 2',
						examples: 'Er lernt, denn er hat Prüfung.'
					},
					{
						header: 'Nebensatz (weil/dass)',
						rule: 'Verb wandert ans Ende',
						examples: '..., weil er früh aufsteht.'
					},
					{
						header: 'Inversion (Neb. + Haupt.)',
						rule: 'Komma -> Verb + Subjekt',
						examples: 'Wenn du übst, wirst du gut.'
					}
				]
			}),
			visualCaptionAr: 'مقارنة موقع الفعل المصرف في الجملة الرئيسية والجانبية وحالة القلب (Inversion)',
			examples: [
				{
					problemAr:
						'Verbinde die Sätze mit der angegebenen Konjunktion: «a) Nadia liest viel. Sie möchte ihren Wortschatz erweitern. (weil) b) Du stehst pünktlich auf. Du kommst rechtzeitig in die Schule. (Wenn ..., ...) c) Die Schüler wissen es: Recycling schützt die Wälder. (dass)»',
					solutionAr:
						'«a) Nadia liest viel, weil sie ihren Wortschatz erweitern möchte. | b) Wenn du pünktlich aufstehst, kommst du rechtzeitig in die Schule. (تندمج aufstehst ثم قلب kommst du) | c) Die Schüler wissen, dass Recycling die Wälder schützt.»'
				},
				{
					problemAr:
						'Forme den Satz mit «denn» in einen Satz mit «weil» um: «Ich trinke Kräutertee, denn ich habe Halsschmerzen.»',
					solutionAr:
						'«Ich trinke Kräutertee, weil ich Halsschmerzen habe.» (ينتقل habe من الموقع 2 إلى آخر الجملة).'
				}
			],
			watchOutAr:
				'احذر الخلط بين «das» (أداة التعريف أو اسم الإشارة للمحايد: das Buch / Das ist gut) و«dass» بحرفي s (أداة الربط التبعية التي تُرسل الفعل للنهاية: Ich hoffe, dass du kommst)! وكذلك انتبه لعدم وضع فاصلة بدون قلب الفاعل والفعل عندما يتصدر Nebensatz الجملة: خطأ قول «Wenn ich Zeit habe, ich lese» والصواب: «Wenn ich Zeit habe, lese ich»!'
		},
		practice: [
			{
				questionAr:
					'Welcher Kausalsatz mit «weil» zeigt die völlig richtige Verbstellung (auch beim trennbaren Modalverb-Gefüge)?',
				options: [
					'Salma geht gern in die Bibliothek, weil sie dort muss viele Bücher ausleihen.',
					'Salma geht gern in die Bibliothek, weil sie dort viele Bücher ausleihen muss.',
					'Salma geht gern in die Bibliothek, weil muss sie dort viele Bücher ausleihen.',
					'Salma geht gern in die Bibliothek, weil sie dort viele Bücher muss ausleihen.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفعل المصرف (muss) لا يبقى في الموقع الثاني بعد weil.',
					'ممتاز! المصدر (ausleihen) يأتي أولاً، والفعل الجهي المصرف (muss) يقع في النهاية المطلقة.',
					'خطأ: الترتيب غير صحيح؛ بعد weil يأتي الفاعل ثم المكملات فالأفعال في الآخر.',
					'خطأ: في القاعدة القياسية يسبق المصدر الفعل الجهي المصرف في نهاية الجملة الجانبية.'
				],
				explanationAr:
					'في الجملة الجانبية التي تحتوي على فعل جهي ومصدر، يأتي المصدر قبل الفعل الجهي المصرف الذي يختم الجملة (ausleihen muss).'
			},
			{
				questionAr:
					'Wie lautet die richtige Fortsetzung nach dem vorangestellten Nebensatz: «Wenn wir jeden Tag frisches Obst essen, ......»?',
				options: [
					'wir bleiben gesund und fit.',
					'bleiben wir gesund und fit.',
					'gesund bleiben wir und fit.',
					'wir gesund und fit bleiben.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: نسيان قاعدة القلب (Inversion) بعد الجملة الجانبية المتصدرة.',
					'أحسنت! الجملة الجانبية تشغل الموقع 1، فيلي الفاصلة الفعل المصرف «bleiben» مباشرة ثم الفاعل «wir».',
					'خطأ: لا تبدأ الجملة الرئيسية بعد الفاصلة بالصفة.',
					'خطأ: هذا ترتيب جملة جانبية أخرى، أما الجملة الثانية فهي الجملة الرئيسية!'
				],
				explanationAr:
					'عند تصدر الجملة الجانبية (Wenn-Satz) تحتل الموقع 1 بالكامل، فيأتي الفعل المصرف في الرئيسية مباشرة بعد الفاصلة (الموقع 2).'
			},
			{
				questionAr:
					'Entscheide zwischen «das», «dass», «weil» und «denn»: «Ich bin sicher, ...... man täglich Sport treiben sollte, ...... Bewegung stärkt das Herz.»',
				options: [
					'das / weil',
					'dass / denn',
					'dass / weil',
					'das / denn'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: بعد «Ich bin sicher» نحتاج أداة الربط dass (بـ ss)، والجملة الثانية فعلها في الموقع 2 (stärkt).',
					'ممتاز! «dass» للربط مع الفعل في النهاية (treiben sollte)، و«denn» لأن الفعل «stärkt» بقي في الموقع الثاني!',
					'خطأ: في الجملة الثانية الفعل «stärkt» جاء بعد الفاعل مباشرة في الموقع 2، مما يستوجب denn لا weil.',
					'خطأ: هنا أداة الربط المفعولية هي dass وليس أداة التعريف das.'
				],
				explanationAr:
					'نستخدم dass لربط الجملة المكملة، ونميز بين denn (الفعل في الموقع 2: Bewegung stärkt) و weil (الفعل في النهاية).'
			}
		]
	},
	{
		id: 'ger_lesson_2as_le_t2_komparativ_superlativ_wortbildung',
		slug: 'ger-2as-le-t2-komparativ_superlativ_wortbildung',
		grade: '2as_le',
		yearSubjectId: 783,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr:
			'المجال الثاني: الصحة والبيئة والجمل الجانبية واشتقاق المفردات (Gesundheit, Umwelt, Nebensätze & Wortbildung)',
		order: 4,
		titleAr:
			'صيغ المقارنة والتفضيل واشتقاق الكلمات وتركيبها (Komparativ, Superlativ & Wortbildung)',
		objectives: [
			'إتقان تكوين واستعمال درجات مقارنة الصفات والأحوال: المساواة (so + Positiv + wie)، التفوق (Komparativ -er + als)، والتفضيل المطلق (am ...-sten أو مع أداة التعريف der/die/das ...-ste)',
			'تطبيق قواعد التحول الصوتي (Umlaut: a->ä, o->ö, u->ü) في الصفات القصيرة وأهم الصيغ الشاذة (gut -> besser -> am besten, viel -> mehr -> am meisten, gern -> lieber -> am liebsten)',
			'فهم آليات اشتقاق الكلمات وتركيبها في الألمانية: السوابق واللواحق (-ung, -heit, -keit, -schaft, -lich, -ig, un-, -los) وعائلات الكلمات (Wortfamilie: Verb | Nomen | Adjektiv)'
		],
		keywordsAr: [
			'Komparativ (als)',
			'Superlativ (am ...-sten)',
			'Positiv (so ... wie)',
			'Umlaut & Unregelmäßige',
			'Wortbildung & Wortfamilie',
			'المقارنة والاشتقاق'
		],
		discover: {
			scenarioAr:
				'يحلل الأستاذ بطاقات مقارنة بيئية وصحية في القسم: «Frisches Wasser ist genauso wichtig wie gesunde Luft. Olivenöl ist gesünder als künstliche Fette, aber Datteln schmecken süßer. Unter allen Energien ist die Solarenergie im Süden Algeriens am effektivsten. Wenn wir gemeinsam handeln, übernehmen wir gesellschaftliche Verantwortung — niemand handelt verantwortungslos oder ungesund.» لاحظ درجات المقارنة (wie / als / am ...-sten) وكيف اشتُقت «Verantwortung» و«verantwortungslos» و«ungesund»!',
			svg: svgGermanWordFormation({
				title: 'Wortbildung: Präfix + Stamm + Suffix',
				prefix: 'ver-',
				root: 'antwort',
				suffix: '-lich',
				derivedWord: 'verantwortlich (Adjektiv)',
				meaningNote: 'Wortfamilie: verantworten (Verb) | Verantwortung (Nomen) | verantwortlich (Adj.)'
			}),
			steps: [
				{
					promptAr:
						'قارن بين أداتي المقارنة «wie» و«als» في النص: «genauso wichtig wie» و«gesünder als». متى نستعمل wie ومتى نستعمل als؟',
					hintAr: 'هل الأولى مقارنة تساوٍ أم اختلاف؟',
					expectedInput: 'wie للمساواة (Positiv)، و als للاختلاف والتفضيل (Komparativ)',
					revealAr:
						'قاعدة المقارنة الصارمة في الألمانية: للمساواة نستعمل «so / genauso + Positiv + wie» (مثال: Diese Übung ist so klar wie die erste)، ولعدم التساوي نستعمل «Komparativ (-er) + als» (مثال: Olivenöl ist gesünder als Butter).'
				},
				{
					promptAr:
						'لاحظ الكلمتين «gesünder» و«am effektivsten»: متى نضيف Umlaut في Komparativ، وماذا يحدث في Superlativ إذا انتهت الصفة بـ -d أو -t أو -s أو -ß أو -z؟',
					hintAr: 'انظر إلى الحرف قبل -sten في الصفة «gesund» أو «kurz» أو «wichtig».',
					expectedInput: 'الصفات أحادية المقطع ذات a/o/u تأخذ Umlaut غالباً، وإذا انتهت بـ t/d/s/ß/z أخذت -esten في Superlativ',
					revealAr:
						'الصفات القصيرة ذات المقطع الواحد مثل alt, jung, groß, kalt, warm, gesund تأخذ Umlaut: älter / am ältesten، jünger / am jüngsten، größer / am größten! كما نضيف -e- لتسهيل النطق (-esten) بعد d, t, s, ß, z, sch: gesund -> am gesündesten، kurz -> am kürzesten.'
				},
				{
					promptAr:
						'في النص وردت كلمة «ungesund» و«verantwortungslos»: ما وظيفة السابقة «un-» وما وظيفة اللاحقة «-los» في بناء الصفات؟',
					hintAr: 'قارن gesund / ungesund و Verantwortung / verantwortungslos.',
					expectedInput: 'un- تفيد النفي والضد، و -los تفيد الانعدام/الافتقار (بدون...)',
					revealAr:
						'أدوات الاشتقاق الأساسية في 2AS: السابقة un- تقلب المعنى للضد (gesund -> ungesund، möglich -> unmöglich)؛ واللاحقة -los تعني «بدون» (wasserlos, kostenlos, verantwortungslos)؛ ولواحق الأسماء المؤنثة (die) هي -ung, -heit, -keit, -schaft (die Ernährung, die Gesundheit, die Freundlichkeit, die Wissenschaft).'
				}
			]
		},
		summary: {
			rulesAr: [
				'درجات المقارنة (Steigerung der Adjektive): (1) المساواة (Positiv): genauso / so + Adjektiv + wie (Wasser ist so wichtig wie Schlaf)؛ (2) المقارنة (Komparativ): Adjektiv + -er + als (Obst ist gesünder als Süßigkeiten)؛ (3) التفضيل (Superlativ): مع الفعل am + Adjektiv + -(e)sten (Er läuft am schnellsten) أو قبل الاسم بالأداة der/die/das + Adjektiv + -(e)ste (die sauberste Stadt).',
				'تحولات وتغيرات مهمة: Umlaut في أحادية المقطع (alt -> älter -> am ältesten؛ jung -> jünger -> am jüngsten؛ stark -> stärker -> am stärksten؛ kalt -> kälter؛ warm -> wärmer؛ gesund -> gesünder -> am gesündesten). الصيغ الشاذة الأربعة الحتمية: gut -> besser -> am besten | viel -> mehr -> am meisten | gern -> lieber -> am liebsten | hoch -> höher -> am höchsten | nah -> näher -> am nächsten.',
				'اشتقاق الأسماء والصفات (Wortbildung): تكوين الأسماء المؤنثة بـ -ung (من الفعل: schützen -> die Schützung? لا، بل bilden -> die Bildung، trennen -> die Trennung، ernähren -> die Ernährung)، وبـ -heit / -keit (من الصفة: gesund -> die Gesundheit، sauber -> die Sauberkeit، freundlich -> die Freundlichkeit، möglich -> die Möglichkeit).',
				'تضاد الصفات وبناؤها (Adjektivbildung): un- (gesund -> ungesund)، -los = بدون (sinnlos, kostenlos)، -voll = مليء بـ (wertvoll, verantwortungsvoll)، -lich / -ig / -bar (freundlich, wichtig, trinkbar = صالح للشرب).'
			],
			visualSvg: svgGermanConjugationChart({
				title: 'Komparativ & Superlativ (2AS LE)',
				subtitle: 'Regelmäßig, Umlaut und unregelmäßige Formen',
				width: 580,
				columns: [
					{
						header: 'Positiv & Komparativ',
						rule: 'so ... wie | -er + als',
						examples: 'schnell -> schneller als'
					},
					{
						header: 'Umlaut & -esten',
						rule: 'a->ä, o->ö, u->ü',
						examples: 'alt -> älter -> am ältesten'
					},
					{
						header: 'Unregelmäßig',
						rule: 'gut / viel / gern / hoch',
						examples: 'besser, mehr, lieber, höher'
					}
				]
			}),
			visualCaptionAr: 'ملخص قواعد مقارنة الصفات والتفضيل في الألمانية',
			examples: [
				{
					problemAr:
						'Ergänze Positiv, Komparativ oder Superlativ (mit als / wie): «a) Datteln sind (gesund) ...... Bonbons. b) Das Fahrrad ist genauso (umweltfreundlich) ...... das Zu-Fuß-Gehen. c) Von allen Getränken mag ich klares Wasser (gern) ...... .»',
					solutionAr:
						'«a) gesünder als (تغير u->ü مع als) | b) umweltfreundlich wie (تساوٍ مع wie) | c) am liebsten (تفضيل شاذ لـ gern)»'
				},
				{
					problemAr:
						'Bilde das Nomen mit -ung, -heit oder -keit: «a) ernähren -> ...... ; b) sauber -> ...... ; c) gesund -> ...... ; d) umweltfreundlich -> ...... .»',
					solutionAr:
						'«a) die Ernährung | b) die Sauberkeit | c) die Gesundheit | d) die Umweltfreundlichkeit»'
				}
			],
			watchOutAr:
				'احذر من خطأين متكررين في الامتحان: (1) لا تستعمل «wie» مع صيغة Komparativ (خطأ: größer wie! الصواب دائماً: größer als، والمساواة: so groß wie)؛ (2) عند استخدام صيغة التفوق «gut» في المقارنة تصبح «besser» وليس «guter» أو «güter»، ومثلها «viel -> mehr» و«gern -> lieber».'
		},
		practice: [
			{
				questionAr:
					'Welche Ergänzung ist in beiden Vergleichen grammatisch fehlerfrei? «Für die Umwelt ist die Bahn ...... das Auto, aber das Fahrrad ist oft ...... so praktisch ...... der Bus.»',
				options: [
					'besser wie / genau / als',
					'besser als / genau / wie',
					'guter als / so / wie',
					'mehr gut als / genauso / als'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: عُكس استعمال als و wie؛ Komparativ يأخذ als والمساواة تأخذ wie.',
					'ممتاز! besser als (مقارنة شاذة لـ gut + als)، و genauso / genau so ... wie (للمساواة).',
					'خطأ: صيغة Komparativ لـ gut هي besser وليس guter.',
					'خطأ: لا نستخدم «mehr gut» في الألمانية بل «besser».'
				],
				explanationAr:
					'المقارنة الشاذة لـ gut هي besser متبوعة بـ als، والمساواة تُصاغ بـ (genau) so + Positiv + wie.'
			},
			{
				questionAr:
					'Welche Steigerungsreihe enthält eine unregelmäßige oder Umlaut-Steigerung ohne jeden Fehler?',
				options: [
					'viel - mehr - am meisten | gern - lieber - am liebsten',
					'viel - vieler - am vielsten | gut - besser - am gutsten',
					'alt - alter - am altesten | hoch - hocher - am hochsten',
					'gesund - gesunder - am gesundsten | gern - gerner - am gernsten'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! الصيغتان الشاذتان الأساسيتان: viel -> mehr -> am meisten و gern -> lieber -> am liebsten.',
					'خطأ: viel و gut صيغتان شاذتان بالكامل (mehr / besser / am besten).',
					'خطأ: alt يأخذ Umlaut (älter, am ältesten)، و hoch يصبح höher, am höchsten.',
					'خطأ: gesund يأخذ Umlaut و -esten (gesünder, am gesündesten)، و gern شاذ.'
				],
				explanationAr:
					'الصيغ الشاذة الأربع الكبرى في 2AS هي: gut-besser-am besten، viel-mehr-am meisten، gern-lieber-am liebsten، hoch-höher-am höchsten.'
			},
			{
				questionAr:
					'Welches abgeleitete Nomen und welches Gegenteil mit «un-» oder «-los» sind korrekt gebildet?',
				options: [
					'die Sauberung / die Gesundkeit / verantwortsun',
					'die Sauberkeit / die Gesundheit / verantwortungslos',
					'die Sauberheit / die Gesundung / ungesundlos',
					'die Trennheit / die Bildkeit / kostun'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: sauber تأخذ -keit و gesund تأخذ -heit.',
					'ممتاز! sauber -> die Sauberkeit، gesund -> die Gesundheit، Verantwortung -> verantwortungslos.',
					'خطأ: لا تجمع السابقة un- مع اللاحقة -los في الكلمة نفسها.',
					'خطأ: اللواحق المطبقة خاطئة (الصحيح: die Trennung، die Bildung، kostenlos).'
				],
				explanationAr:
					'الصفات المنتهية بـ -er/-el/-ig/-lich/-sam تأخذ اللاحقة -keit (die Sauberkeit)، وغيرها يأخذ -heit (die Gesundheit)، وتفيد -los الانعدام (verantwortungslos).'
			}
		]
	}
];
