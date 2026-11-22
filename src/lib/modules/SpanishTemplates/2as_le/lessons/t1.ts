import type { SpanishInteractiveLessonData } from '../../types';
import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';
import {
	svgSpanishConjugationChart,
	svgSpanishGrammarMap,
	svgSpanishTenseTimeline
} from '../../svg-spanish';

export const LESSONS_2AS_LE_T1: SpanishInteractiveLessonData[] = [
	{
		id: 'spa_lesson_2as_le_t1_mundo_hispanohablante',
		slug: 'spa-2as-le-t1-mundo-hispanohablante',
		grade: '2as_le',
		yearSubjectId: 782,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr:
			'المشروع الأول: الوحدة التمهيدية والمجال الشخصي (Unidad Puente y Ámbito Personal)',
		order: 1,
		titleAr:
			'العالم الناطق بالإسبانية والتقديم الشخصي (El mundo hispanohablante y presentación personal)',
		objectives: [
			'التعرف على الانتشار الجغرافي والثقافي للغة الإسبانية عبر القارات والروابط التاريخية واللغوية بين العربية والإسبانية (los arabismos)',
			'إتقان التقديم الشخصي الكامل باللغة الإسبانية (الاسم، العمر، الأصل، السكن، اللغات والاهتمامات الهادفة)',
			'توظيف علامات الترقيم والنبْر الصوتي الإسباني (¿...?, ¡...!, ñ, la tilde) بدقة في الكتابة والقراءة'
		],
		keywordsAr: [
			'el mundo hispanohablante',
			'presentación personal',
			'los arabismos',
			'llamarse / vivir en',
			'la tilde',
			'التقديم الشخصي'
		],
		discover: {
			scenarioAr:
				'في حصة اللغة الإسبانية للسنة الثانية ثانوي لغات أجنبية (2AS LE)، يفتتح الأستاذ الوحدة التمهيدية (Unidad Puente) بخريطة العالم الناطق بالإسبانية قائلاً: «¡Hola! Me llamo Yasin, tengo dieciséis años, soy argelino de Constantina y estudio lenguas extranjeras. ¿Sabéis que el español cuenta con más de cuatro mil palabras de origen árabe como algodón, azúcar, alcalde o almohada?» تأمّل الخريطة المرفقة واكتشف سعة الفضاء الإسباني وجسوره المعرفية.',
			svg: renderLessonIllustration('spa_01_mundo_hispanohablante_mapa_mudo', {
				lang: 'es',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'انطلاقاً من الخريطة ومن عبارة التقديم، ما الأفعال الثلاثة الأساسية التي استعملها ياسين للتعريف بنفسه (الاسم، العمر، الجنسية والأصل)؟',
					hintAr: 'لاحظ الصيغ: Me llamo..., tengo..., soy... .',
					expectedInput: 'llamarse / tener / ser',
					revealAr:
						'للتقديم الشخصي الأساسي باللغة الإسبانية نستعمل: llamarse (للاسم: Me llamo...), tener (للعمر: Tengo dieciséis años), و ser (للجنسية والأصل والصفة الدائمة: Soy argelino de Constantina).'
				},
				{
					promptAr:
						'اذكر ثلاث كلمات إسبانية مشهورة مقتبسة من اللغة العربية (arabismos) وردت في النص التمهيدي أو تعرفها، وبين دلالتها الحضارية.',
					hintAr: 'تبدأ الكثير منها بمقطع al- المأخوذ من «الـ» التعريف العربية.',
					expectedInput: 'algodón, azúcar, alcalde, almohada',
					revealAr:
						'تضم الإسبانية آلاف الألفاظ ذات الأصل العربي (los arabismos) مثل: algodón (القطن)، azúcar (السكر)، alcalde (القاضي/العمدة)، almohada (المخدة)، aceituna (الزيتونة)، و ojalá (إن شاء الله / لو شاء الله)، وهو ما يبرهن على عمق التبادل العلمي والثقافي المتوسطي.'
				},
				{
					promptAr:
						'ما الخصائص الإملائية الفريدة في كتابة السؤال والتعجب باللغة الإسبانية كما ظهر في «¡Hola!» و«¿Sabéis...?»؟',
					hintAr: 'انظر إلى بداية ونهاية الجملة الاستفهامية والتعجبية.',
					expectedInput: 'علامتا الاستفهام والتعجب المقلوبتان في البداية ¿ ¡',
					revealAr:
						'تتميز اللغة الإسبانية بوضع علامة مقلوبة في بداية الجملة الاستفهامية (¿) والتعجبية (¡) وعلامة عادية في نهايتها (? / !)، كما تنفرد بحرف (ñ) والنبْر (la tilde: á, é, í, ó, ú).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الانتشار الجغرافي (El mundo hispanohablante): اللغة الإسبانية لغة رسمية في 21 بلداً تمتد عبر أوروبا (España)، أمريكا اللاتينية (México, Colombia, Argentina, Perú, Chile...)، وإفريقيا (Guinea Ecuatorial)، ويتحدث بها مئات الملايين في العالم.',
				'بطاقة التقديم الشخصي المتقدمة (Presentación personal en 2AS): الاسم (Me llamo / Mi nombre es)، العمر (Tengo dieciséis años)، الأصل والوطن (Soy argelino/a, vengo de...)، السكن (Vivo en...)، الدراسة واللغات (Curso segundo año de secundaria en la rama de Lenguas Extranjeras; hablo árabe, francés, inglés y aprendo español)، والهوايات الهادفة (En mi tiempo libre me gusta leer, practicar deporte o aprender idiomas).',
				'الجسر العربي-الإسباني (Los arabismos): دخول مفردات عربية كثيرة إلى المعجم الإسباني في مجالات الزراعة والعلوم والإدارة والعمارة، مثل: aceite (الزيت)، álgebra (الجبر)، algoritmo (الخوارزمية)، alcázar (القصر)، almacén (المخزن)، tarifa (التعريفة).',
				'الترقيم والنبر (Puntuación y acentuación): إلزامية فتح الجملة الاستفهامية بـ ¿ وإغلاقها بـ ?، والتعجبية بـ ¡ وإغلاقها بـ !، ومراعاة الشدّة الصوتية (la tilde) التي تميز أحياناً بين معنيين (مثل: sí = نعم / si = إذا؛ él = هو / el = أداة تعريف).'
			],
			visualSvg: svgSpanishGrammarMap({
				title: 'Presentación personal y puentes culturales (2AS LE)',
				rootLabel: 'Presentarse en español',
				rootSub: 'Datos personales, estudios y vocabulario clave',
				width: 580,
				branches: [
					{
						label: 'Identidad',
						rule: 'llamarse + ser + tener',
						example: 'Me llamo Amin, soy de Argel.'
					},
					{
						label: 'Residencia',
						rule: 'vivir en + barrio/ciudad',
						example: 'Vivo en Orán con mi familia.'
					},
					{
						label: 'Estudios LE',
						rule: 'estudiar / cursar 2AS',
						example: 'Estudio cuatro idiomas.'
					},
					{
						label: 'Arabismos',
						rule: 'Huella léxica árabe',
						example: 'azúcar, alcalde, ojalá'
					}
				]
			}),
			visualCaptionAr: 'الخريطة الذهنية للتقديم الشخصي والجسور اللغوية في الوحدة التمهيدية',
			examples: [
				{
					problemAr:
						'Completa la presentación personal de Salma: «¡Hola! Me (llamarse) Salma, (tener) diecisiete años y (vivir) en Tremecén. (Estudiar) el segundo año de Lenguas Extranjeras.»',
					solutionAr:
						'«¡Hola! Me llamo Salma, tengo diecisiete años y vivo en Tremecén. Estudio el segundo año de Lenguas Extranjeras.»'
				},
				{
					problemAr:
						'Identifica el significado español de estos tres arabismos y úsalos en una frase breve: «ojalá», «almacén», «aceituna».',
					solutionAr:
						'ojalá (ليت / إن شاء الله)، almacén (مخزن)، aceituna (زيتونة). Ejemplo: «¡Ojalá visite pronto las bibliotecas históricas!»'
				}
			],
			watchOutAr:
				'احذر من خطأين شائعين لدى متعلمي الإسبانية في 2AS: (1) التعبير عن العمر بـ «Soy dieciséis años» — الصواب دائماً استعمال الفعل tener: «Tengo dieciséis años»؛ (2) نسيان علامتي الاستفهام والتعجب المقلوبتين في البداية (¿...?, ¡...!).'
		},
		practice: [
			{
				questionAr:
					'¿Cuál de las siguientes oraciones expresa correctamente la edad y el origen de un estudiante argelino?',
				options: [
					'Soy dieciséis años y tengo de Blida.',
					'Tengo dieciséis años y soy de Blida.',
					'Estoy dieciséis años y vivo Blida.',
					'Me llamo dieciséis años y soy en Blida.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا نستخدم الفعل ser للعمر ولا tener للأصل.',
					'ممتاز! نستعمل «tener + años» للعمر و «ser de + ciudad/país» للأصل.',
					'خطأ: لا نستخدم estar للعمر ويلزم حرف الجر en بعد vivir.',
					'خطأ: llamarse مخصص للاسم فقط.'
				],
				explanationAr:
					'في اللغة الإسبانية يُعبَّر عن العمر بالفعل tener (Tengo 16 años) وعن الأصل والجنسية بالفعل ser (Soy de Blida / Soy argelino).'
			},
			{
				questionAr:
					'¿Qué grupo de palabras españolas reúne exclusivamente ejemplos auténticos de arabismos?',
				options: [
					'algodón, almohada, alcalde, aceituna',
					'ventana, libro, escuela, ordenador',
					'lápiz, pizarra, cuaderno, hermano',
					'montaña, invierno, primavera, cielo'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! كلها كلمات إسبانية من أصل عربي (القطن، المخدة، القاضي، الزيتونة).',
					'خطأ: هذه كلمات ذات أصل لاتيني.',
					'خطأ: مفردات مدرسية وعائلية من أصل لاتيني.',
					'خطأ: ألفاظ طبيعية من أصل لاتيني.'
				],
				explanationAr:
					'تُعد الكلمات التي تبدأ بـ al- أو a- مثل algodón وalmohada وalcalde وaceituna من أشهر الكلمات العربية الأصل في الإسبانية (arabismos).'
			},
			{
				questionAr:
					'Señala la frase escrita con la puntuación y acentuación españolas correctas:',
				options: [
					'Como te llamas y cuantos idiomas hablas?',
					'¿Como té llamas y cuantos idiómas hablas!',
					'¿Cómo te llamas y cuántos idiomas hablas?',
					'¡Cómo te llamas y cuántos idiomas hablas?'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: تنقصها علامة الاستفهام المقلوبة ¿ والنبرة على أداتي الاستفهام cómo وcuántos.',
					'خطأ: خلط بين الاستفهام والتعجب مع أخطاء في النبر.',
					'ممتاز! تحترم علامتي ¿...? والنبرة الإجبارية على أداتي الاستفهام cómo و cuántos.',
					'خطأ: الجملة سؤال مباشر فتبدأ بـ ¿ وليس ¡.'
				],
				explanationAr:
					'الأسئلة المباشرة تبدأ بـ ¿ وتنتهي بـ ?، وتأخذ أدوات الاستفهام (cómo, cuántos, qué, dónde) نبرة صوتية (tilde) دائماً.'
			}
		]
	},
	{
		id: 'spa_lesson_2as_le_t1_ambito_personal_rutina',
		slug: 'spa-2as-le-t1-ambito-personal-rutina',
		grade: '2as_le',
		yearSubjectId: 782,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr:
			'المشروع الأول: الوحدة التمهيدية والمجال الشخصي (Unidad Puente y Ámbito Personal)',
		order: 2,
		titleAr:
			'المجال الشخصي: الروتين اليومي، الطباع، الأسرة والهوايات الهادفة (Ámbito Personal)',
		objectives: [
			'وصف الروتين اليومي المنظم (la rutina diaria) باستخدام الأفعال الانعكاسية (los verbos reflexivos) والأفعال غير المنتظمة في المضارع (diptongación e irregularidades)',
			'إغناء الرصيد المعجمي لوصف الطباع والأخلاق الحميدة والروابط الأسرية والهوايات الهادفة السليمة',
			'التمييز الدقيق بين المعجب به والموصوف في عبارات الرأي والهوايات (me gusta / me interesa / prefiero)'
		],
		keywordsAr: [
			'rutina diaria',
			'verbos reflexivos',
			'carácter y valores',
			'familia',
			'ocio sano',
			'المجال الشخصي'
		],
		discover: {
			scenarioAr:
				'يكتب أمين في مذكراته المدرسية عن يومه المتوازن: «Todos los días me despierto muy temprano, rezo la oración del alba, me lavo la cara y desayuno con mis padres y mi hermana menor. A las ocho voy al instituto. Por la tarde repaso mis lecciones en la biblioteca y, en mi tiempo libre, me gusta leer libros de historia, practicar natación o ayudar en actividades solidarias porque soy una persona responsable y disciplinada.» لاحظ الأفعال الانعكاسية وصفاته الشخصية وهواياته.',
			svg: renderLessonIllustration('spa_03_educacion_idiomas_biblioteca', {
				lang: 'es',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'استخرج من النص فعلين انعكاسيين (verbos reflexivos) مع تحديد الضمير الانعكاسي المصاحب لهما والتغير الصوتي في «me despierto».',
					hintAr: 'ابحث عن الضمير me قبل الفعل.',
					expectedInput: 'me despierto (despertarse: e pasa a ie) y me lavo (lavarse)',
					revealAr:
						'الفعلان الانعكاسيان هما: me despierto (من despertarse، حيث تتحول e إلى ie في المضارع مع المفرد والغائب جمع) و me lavo (من lavarse).'
				},
				{
					promptAr:
						'ما القيم والأخلاق الأسرية والشخصية والهوايات الهادفة (ocio sano) التي يعكسها يوم أمين؟',
					hintAr: 'لاحظ وقت الاستيقاظ، الفطور الأسري، المراجعة، القراءة، السباحة، والعمل التضامني.',
					expectedInput: 'الانتظام والمسؤولية، صلة الأسرة، القراءة والرياضة والتطوع التضامني',
					revealAr:
						'يجسد النص نموذج التلميذ الواعي في 2AS LE: توازن بين الواجب الديني والأسري، الانضباط الدراسي، واستثمار الفراغ في هوايات مفيدة (leer, practicar deporte, senderismo, dibujo, voluntariado).'
				},
				{
					promptAr:
						'لماذا قلنا «me gusta leer» (بالمفرد gusta) ولو أضفنا اسماً جمعاً مثل «los libros» كيف يتغير الفعل gustar؟',
					hintAr: 'في الإسبانية الفاعل النحوي لـ gustar هو الشيء المحبوب وليس المتكلم.',
					expectedInput: 'مع المصدر أو المفرد نستعمل gusta، ومع الجمع نستعمل gustan',
					revealAr:
						'مع المصدر (me gusta leer) أو الاسم المفرد (me gusta la lectura) يبقى الفعل gustar بصيغة المفرد؛ ومع الاسم الجمع يصبح gustan (me gustan los libros educativos).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الأفعال الانعكاسية في الروتين اليومي (Verbos reflexivos): تقترن بالضمائر (me, te, se, nos, os, se) وتصف الأفعال التي تعود على الفاعل نفسه، مثل: despertarse (e→ie: me despierto)، levantarse، acostarse (o→ue: me acuesto)، vestirse (e→i: me visto)، asearse، organizarse.',
				'أهم التحولات الصوتية في المضارع (Presente de Indicativo): الإدغام الصوتي (Diptongación): e→ie (despertar, empezar, querer, entender)؛ o→ue (volver, poder, dormir, almorzar)؛ والإبدال الصوتي e→i (pedir, seguir, vestir)؛ وأفعال غير منتظمة شائعة في المفرد الأول (tengo, hago, salgo, pongo, voy, sé).',
				'معجم الطباع والأسرة والهوايات (Carácter, familia y ocio sano): الصفات الأخلاقية (responsable, trabajador, sincero, educado, solidario, paciente, respetuoso, organizado)؛ القرابة (padres, abuelos, hermanos, tíos, primos)؛ والهوايات السليمة (la lectura, el deporte, la caligrafía, el dibujo, el senderismo, el voluntariado).',
				'التعبير عن الميول والاهتمامات (Gustos e intereses): أفعال من نمط gustar / interesar / encantar تأتي بـ (a mí me / a ti te / a él le...) وتطابق ما يليها مفرداً وجمعاً (me interesa el español / me interesan las lenguas extranjeras).'
			],
			visualSvg: svgSpanishConjugationChart({
				title: 'Presente de Indicativo en la rutina diaria',
				subtitle: 'Reflexivos, diptongación e irregulares clave',
				width: 580,
				columns: [
					{
						header: 'Reflexivos',
						rule: 'Pronombre + verbo',
						examples: 'me levanto, se organiza'
					},
					{
						header: 'Diptongación',
						rule: 'e -> ie | o -> ue',
						examples: 'despierto, vuelvo, duermo'
					},
					{
						header: 'Irregulares (yo)',
						rule: '1.ª persona especial',
						examples: 'hago, salgo, voy, tengo'
					}
				]
			}),
			visualCaptionAr: 'خلاصة تصريف أفعال الروتين اليومي في الحاضر الإخباري',
			examples: [
				{
					problemAr:
						'Conjuga los verbos entre paréntesis en Presente de Indicativo: «Por la mañana, Nadia (despertarse) a las seis, (vestirse) rápido y (salir) hacia el instituto.»',
					solutionAr:
						'«Por la mañana, Nadia se despierta a las seis, se viste rápido y sale hacia el instituto.»'
				},
				{
					problemAr:
						'Elige entre «gusta / gustan» e «interesa / interesan»: «A mis compañeros les ...... (gustar) las novelas históricas y a mí me ...... (interesar) aprender idiomas.»',
					solutionAr:
						'«A mis compañeros les gustan las novelas históricas (جمع) y a mí me interesa aprender idiomas (مصدر).»'
				}
			],
			watchOutAr:
				'تنبيه هام في الإدغام الصوتي (e→ie و o→ue): لا يقع هذا التغير إطلاقاً في ضميري الجمع الأول والثاني (nosotros / vosotros)! نقول: yo me despierto، لكن nosotros nos despertamos و vosotros os despertáis.'
		},
		practice: [
			{
				questionAr:
					'Completa correctamente la frase sobre la rutina diaria: «Mis hermanos y yo siempre ...... temprano los días de clase.»',
				options: [
					'se levantamos',
					'nos levantamos',
					'me levanto',
					'nos levantimos'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفاعل «Mis hermanos y yo» (= nosotros) يأخذ الضمير الانعكاسي nos وليس se.',
					'ممتاز! الفاعل نحن (nosotros) يطابق الضمير nos مع التصريف المنتظم levantamos.',
					'خطأ: me levanto تخص ضمير المتكلم المفرد yo فقط.',
					'خطأ: الفعل levantar من المجموعة الأولى (-ar) فينتهي بـ -amos لا -imos.'
				],
				explanationAr:
					'مع الفاعل «Mis hermanos y yo» (= nosotros)، نستعمل الضمير الانعكاسي nos ونهاية -amos في المضارع.'
			},
			{
				questionAr:
					'¿Cuál es la conjugación correcta del verbo «despertarse» para «tú» y «nosotros» en Presente?',
				options: [
					'tú te despiertas / nosotros nos despiertamos',
					'tú te despertas / nosotros nos despertamos',
					'tú te despiertas / nosotros nos despertamos',
					'tú se despierta / nosotros os despertáis'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: لا يحدث الإدغام (e→ie) مع الضمير nosotros.',
					'خطأ: الفعل despertarse يُدغم إلى ie مع الضمير tú.',
					'أحسنت! الإدغام يقع مع tú (despiertas) ويسقط مع nosotros (despertamos).',
					'خطأ: ضمائر الانعكاس غير مطابقة للفاعل.'
				],
				explanationAr:
					'أفعال الإدغام الصوتي تحتفظ بأصلها في الضميرين nosotros و vosotros (nos despertamos).'
			},
			{
				questionAr:
					'Elige la opción gramaticalmente correcta para expresar gustos sanos:',
				options: [
					'A mi hermana le gustan la lectura y el senderismo en la montaña.',
					'A mi hermana le gusta los deportes de equipo.',
					'A mi hermana le encanta los libros de ciencia y las revistas.',
					'Yo gusto mucho leer por la tarde.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! عند وجود اسمين مفردين متعاطفين (la lectura y el senderismo) يُجمع الفعل (gustan).',
					'خطأ: الفاعل «los deportes» جمع، لذا يلزم gustan.',
					'خطأ: الفاعل «los libros y las revistas» جمع، لذا يلزم encantan وليس encanta.',
					'خطأ: لا نقول yo gusto بهذا المعنى، بل A mí me gusta.'
				],
				explanationAr:
					'عند عطف اسمين مفردين (la lectura y el senderismo) يُعاملان معاملة الجمع فيأخذ الفعل gustar صيغة الجمع gustan.'
			}
		]
	},
	{
		id: 'spa_lesson_2as_le_t1_tiempos_pasado',
		slug: 'spa-2as-le-t1-tiempos-pasado',
		grade: '2as_le',
		yearSubjectId: 782,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr:
			'المشروع الأول: الوحدة التمهيدية والمجال الشخصي (Unidad Puente y Ámbito Personal)',
		order: 3,
		titleAr:
			'أزمنة الماضي: الماضي القريب والمنقطع والمستمر (Pretérito Perfecto, Indefinido e Imperfecto)',
		objectives: [
			'التمييز الدلالي والتركيبي بين Pretérito Perfecto (الماضي المتصل بالحاضر) و Pretérito Indefinido (الماضي المنقطع المحدد)',
			'توظيف Pretérito Imperfecto لوصف العادات والملامح والخلفيات الزمنية في الماضي مع الجمع بينه وبين Indefinido في السرد',
			'ضبط تصريف أبرز الأفعال القياسية والشاذة في أزمنة الماضي الثلاثة ومؤشراتها الزمنية بدقة'
		],
		keywordsAr: [
			'pretérito perfecto',
			'pretérito indefinido',
			'pretérito imperfecto',
			'marcadores temporales',
			'narración en pasado',
			'أزمنة الماضي'
		],
		discover: {
			scenarioAr:
				'اقرأ هذه الفقرة عن تجربة دراسية متميزة: «Cuando era pequeña, Nadia siempre leía cuentos antes de dormir. El año pasado ganó el primer premio de redacción en español y viajó con su clase a Argel. Esta semana ha empezado un nuevo proyecto en la biblioteca y ya ha escrito tres resúmenes brillantes.» لاحظ كيف اجتمع في الفقرة أزمنة الماضي الثلاثة: era/leía و ganó/viajó و ha empezado/ha escrito!',
			svg: svgSpanishTenseTimeline({
				title: 'Pasado reciente vs Pasado terminado',
				tenseName: 'Perfecto / Indefinido',
				formula: 'hoy -> he escrito | ayer -> escribí | antes -> escribía',
				activeZone: 'past_to_present',
				example: 'Esta semana he leído mucho / Ayer terminé el libro.',
				markers: 'hoy, ya (Perfecto) | ayer, en 2024 (Indefinido) | antes (Imperfecto)',
				width: 560
			}),
			steps: [
				{
					promptAr:
						'ما الفرق بين الزمن المستعمل مع «El año pasado» (ganó, viajó) والزمن المستعمل مع «Esta semana» (ha empezado, ha escrito)؟',
					hintAr: 'هل «العام الماضي» انتهى كلياً أم لا يزال «هذا الأسبوع» مستمراً حتى اللحظة؟',
					expectedInput: 'El año pasado يأخذ Indefinido لأنه زمن منقضٍ، و Esta semana يأخذ Perfecto لأنه متصل بالحاضر',
					revealAr:
						'يُستعمل Pretérito Indefinido لأحداث مكتملة في فترة زمنية منتهية تماماً (ayer, el año pasado, en 2023)؛ أما Pretérito Perfecto فيرتبط بفترة لم تنته بعد أو أثرها مستمر في الحاضر (hoy, esta semana, este mes, ya, todavía no).'
				},
				{
					promptAr:
						'لماذا استُعمل الزمن Pretérito Imperfecto في «Cuando era pequeña, Nadia siempre leía cuentos»؟',
					hintAr: 'هل القراءة وقعت مرة واحدة أم كانت عادة متكررة ووصفاً لمرحلة الطفولة؟',
					expectedInput: 'لوصف مرحلة ماضية وعادة متكررة في الطفولة',
					revealAr:
						'Pretérito Imperfecto هو زمن الوصف والعادة والحدث المستمر في الخلفية الماضية (siempre, de niño, antes, todos los veranos).'
				},
				{
					promptAr:
						'كيف نصوغ الفعل في Pretérito Perfecto، وما اسم المفعول الشاذ (participio irregular) للفعل «escribir» الوارد في النص؟',
					hintAr: 'تأمل التركيب «ha escrito».',
					expectedInput: 'haber في الحاضر + اسم المفعول؛ واسم المفعول الشاذ هو escrito',
					revealAr:
						'يتكون Pretérito Perfecto من المضارع المساعد haber (he, has, ha, hemos, habéis, han) + اسم المفعول (-ado / -ido)، مع الانتباه لأسماء المفعول الشاذة: escrito, hecho, dicho, visto, vuelto, abierto, puesto, resuelto.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الماضي القريب (Pretérito Perfecto): haber (he, has, ha, hemos, habéis, han) + participio (-ado / -ido؛ وشواذ: hecho, dicho, escrito, visto, abierto, puesto, vuelto). يدل على حدث وقع في زمن غير منتهٍ (hoy, esta mañana, esta semana, este año, ya, nunca, todavía no).',
				'الماضي المنقطع (Pretérito Indefinido): يدل على فعل منجز ومحدد زمنياً في الماضي المنقضي (ayer, anoche, el mes pasado, en 2020). نهايات المنتظم (-ar: -é, -aste, -ó, -amos, -asteis, -aron؛ -er/-ir: -í, -iste, -ió, -imos, -isteis, -ieron). أشهر الشواذ: ir/ser (fui, fuiste, fue...), hacer (hice, hizo), tener (tuve), estar (estuve), poder (pude), decir (dije), venir (vine).',
				'الماضي المستمر/الوصفي (Pretérito Imperfecto): يصف الأشخاص والأماكن والأحوال والعادات المتكررة في الماضي (antes, siempre, cada día, mientras). نهاياته: (-ar: -aba, -abas, -aba, -ábamos, -abais, -aban؛ -er/-ir: -ía, -ías, -ía, -íamos, -íais, -ían). وشواذه الثلاثة فقط: ser (era...), ir (iba...), ver (veía...).',
				'التكامل السردي (Imperfecto + Indefinido): في القصة والحدث الماضي، يصف Imperfecto الإطار والجو والعادة أو الفعل الجاري، ويأتي Indefinido ليذكر الحدث الفجائي أو الأساسي المتقدم بالسرد: «Mientras leíamos en silencio (Imperfecto), llegó el profesor (Indefinido).»'
			],
			visualSvg: svgSpanishConjugationChart({
				title: 'Tres tiempos fundamentales del pasado',
				subtitle: 'Estructura, usos y verbos clave en 2AS LE',
				width: 580,
				columns: [
					{
						header: 'Pret. Perfecto',
						rule: 'hoy / esta semana / ya',
						examples: 'he hablado, ha escrito'
					},
					{
						header: 'Pret. Indefinido',
						rule: 'ayer / en 2024 / pasado',
						examples: 'hablé, fui, tuve, hice'
					},
					{
						header: 'Pret. Imperfecto',
						rule: 'antes / siempre / escena',
						examples: 'hablaba, era, iba, veía'
					}
				]
			}),
			visualCaptionAr: 'المقارنة التركيبية والزمنية بين أزمنة الماضي الثلاثة',
			examples: [
				{
					problemAr:
						'Elige entre Pretérito Perfecto e Indefinido: «El lunes pasado (ir, nosotros) al museo y hoy ya (redactar, yo) el informe completo.»',
					solutionAr:
						'«El lunes pasado fuimos al museo (منقطع منتهٍ) y hoy ya he redactado el informe completo (زمن ما زال قائماً).»'
				},
				{
					problemAr:
						'Combina Imperfecto e Indefinido: «Mientras mi hermano (estudiar) árabe en la sala, nuestro padre (volver) de la librería.»',
					solutionAr:
						'«Mientras mi hermano estudiaba árabe en la sala, nuestro padre volvió de la librería.»'
				}
			],
			watchOutAr:
				'احذر من الخطأ في اسم المفعول الشاذ مع haber (لا تقل «ha escribido» بل «ha escrito»، ولا «he hacido» بل «he hecho»)، وانتبه أيضاً إلى عدم الخلط في Pretérito Indefinido بين «hice» (أنا) و«hizo» (هو/هي بتحويل c إلى z قبل o).'
		},
		practice: [
			{
				questionAr:
					'Completa con el tiempo adecuado según el marcador temporal: «Todavía no ...... el trabajo de español, pero ayer ...... todos los apuntes necesarios.»',
				options: [
					'terminé / he buscado',
					'he terminado / busqué',
					'terminaba / buscaba',
					'he terminado / he buscado'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: عكس الترتيب الزمني لـ todavía no و ayer.',
					'أحسنت! «todavía no» ترتبط بالحاضر فتأخذ Perfecto (he terminado)، و«ayer» زمن منقطع يأخذ Indefinido (busqué).',
					'خطأ: ليست عادة أو وصفاً مستمراً.',
					'خطأ: «ayer» زمن منقضٍ لا يأخذ Perfecto في الإسبانية المعيارية.'
				],
				explanationAr:
					'المؤشر «todavía no» يستدعي Pretérito Perfecto (he terminado)، بينما «ayer» يستدعي Pretérito Indefinido (busqué).'
			},
			{
				questionAr:
					'¿Qué combinación de verbos completa correctamente esta escena narrativa?: «De niño mi abuelo ...... en un pueblo tranquilo y en 1998 ...... a la capital.»',
				options: [
					'vivió / se trasladaba',
					'vivía / se trasladó',
					'ha vivido / se trasladó',
					'viva / se trasladará'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: «De niño» تصف مرحلة دائمة متكررة في الماضي (Imperfecto)، و 1998 حدثاً منجزاً (Indefinido).',
					'ممتاز! vivía (Imperfecto) لوصف مرحلة الطفولة، و se trasladó (Indefinido) للحدث المحدد بسنة 1998.',
					'خطأ: الصبا البعيد لا يناسبه الماضي القريب.',
					'خطأ: خلط غير منطقي بين الحاضر المنصوب والمستقبل.'
				],
				explanationAr:
					'في السرد الماضي، يصف Imperfecto الخلفية والعادة (De niño vivía)، ويسجل Indefinido الواقعة المحددة بزمن (en 1998 se trasladó).'
			},
			{
				questionAr:
					'Identifica la serie que contiene únicamente formas correctas del Pretérito Indefinido (3.ª persona del singular):',
				options: [
					'fue, hizó, tuvió, dijó',
					'fue, hizo, tuvo, dijo',
					'iba, hacía, tenía, decía',
					'ha sido, ha hecho, ha tenido, ha dicho'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الأفعال الشاذة القوية في Indefinido لا تأخذ نبرة على الآخر (hizo, tuvo, dijo وليس «hizó»).',
					'صحيح! fue (ser/ir)، hizo (hacer)، tuvo (tener)، dijo (decir) كلها صيغ دقيقة.',
					'خطأ: هذه صيغ Pretérito Imperfecto.',
					'خطأ: هذه صيغ Pretérito Perfecto.'
				],
				explanationAr:
					'الأفعال الشاذة في Indefinido (hacer, tener, decir, poder, estar) صيغ غير منبورة النهاية في الغائب المفرد: hizo, tuvo, dijo, pudo, estuvo.'
			}
		]
	},
	{
		id: 'spa_lesson_2as_le_t1_perifrasis_ser_estar',
		slug: 'spa-2as-le-t1-perifrasis_ser_estar',
		grade: '2as_le',
		yearSubjectId: 782,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr:
			'المشروع الأول: الوحدة التمهيدية والمجال الشخصي (Unidad Puente y Ámbito Personal)',
		order: 4,
		titleAr:
			'المركبات الفعلية والفرق بين الكينونة الدائمة والعابرة (Perífrasis verbales y contraste ser / estar)',
		objectives: [
			'توظيف المركبات الفعلية الأساسية (perífrasis verbales) للتعبير عن الإلزام والاستمرار والماضي القريب جداً والمستقبل القريب',
			'التمييز الدقيق بين استعمالات الفعلين ser و estar في الوصف والهوية والموقع الجغرافي والحالة العابرة أو الناتجة عن فعل',
			'إدراك تغير المعنى في الصفات التي تقبل ser و estar معاً (como listo, bueno, atento, abierto)'
		],
		keywordsAr: [
			'perífrasis verbales',
			'tener que + infinitivo',
			'seguir + gerundio',
			'acabar de + infinitivo',
			'contraste ser / estar',
			'المركبات الفعلية'
		],
		discover: {
			scenarioAr:
				'تأمل الحوار القصير بين صديقين في فناء الثانوية: «—Karim, ¿estás listo para la exposición de español? —Sí, acabo de revisar mis tarjetas y tengo que entregar el esquema ahora. Constantina es una ciudad histórica, pero hoy está muy soleada. Además, sigo practicando la pronunciación cada día porque quiero mejorar.» لاحظ ثلاثة مركبات فعلية واستعمالات ser و estar.',
			svg: svgSpanishGrammarMap({
				title: 'Perífrasis verbales clave en 2AS LE',
				rootLabel: 'Verbo auxiliar + (nexo) + Verbo',
				rootSub: 'Expresan obligación, continuidad o momento',
				width: 580,
				branches: [
					{
						label: 'Obligación',
						rule: 'tener que + infinitivo',
						example: 'Tengo que estudiar hoy.'
					},
					{
						label: 'Pasado reciente',
						rule: 'acabar de + infinitivo',
						example: 'Acabo de leer el texto.'
					},
					{
						label: 'Continuidad',
						rule: 'seguir + gerundio',
						example: 'Sigo practicando español.'
					},
					{
						label: 'Futuro próximo',
						rule: 'ir a + infinitivo',
						example: 'Voy a redactar la carta.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'حدّد معنى كل من المركبات الفعلية الثلاثة الواردة في الحوار: «acabo de revisar»، «tengo que entregar»، و«sigo practicando».',
					hintAr: 'أيها يدل على فعل تمّ للتو، وأيها يدل على واجب، وأيها يدل على الاستمرار؟',
					expectedInput: 'acabo de (ماضٍ قريب جداً)، tengo que (إلزام)، sigo + gerundio (استمرارية)',
					revealAr:
						'«acabar de + infinitivo» يفيد حدثاً انتهى للتو (للتو راجعت)؛ «tener que + infinitivo» يفيد الإلزام الشخصي (يجب أن أسلم)؛ و«seguir + gerundio» يفيد مواصلة العمل دون انقطاع (أواصل التدرب).'
				},
				{
					promptAr:
						'لماذا قال كريم «Constantina es una ciudad histórica» ثم «hoy está muy soleada»؟',
					hintAr: 'قارن بين الصفة الجوهرية الثابتة والوضع المناخي العابر اليوم.',
					expectedInput: 'es للصفة الجوهرية الدائمة، و está للحالة العابرة اليوم',
					revealAr:
						'نستعمل ser للتعريف والصفة الدائمة الجوهرية (ciudad histórica)، ونستعمل estar للأحوال الظرفية العابرة المتغيرة (hoy está soleada).'
				},
				{
					promptAr:
						'ما معنى «¿estás listo?» في الحوار، وكيف يتغير المعنى لو قلنا «¿eres listo?»؟',
					hintAr: 'فكر في الفرق بين الاستعداد لشيء الآن وبين الذكاء كصفة شخصية.',
					expectedInput: 'estar listo = مستعد/جاهز؛ ser listo = ذكي/فطن',
					revealAr:
						'تتغير دلالة بعض الصفات بتغير الفعل المساعد: «estar listo» تعني مستعداً وجاهزاً، بينما «ser listo» تعني ذكياً وفطناً!'
				}
			]
		},
		summary: {
			rulesAr: [
				'المركبات الفعلية الأساسية (Perífrasis verbales): (1) الإلزام: tener que + infinitivo / deber + infinitivo (أمر ضروري؛ وللإلزام العام بدون فاعل: hay que + infinitivo)؛ (2) الماضي القريب جداً: acabar de + infinitivo (في الحاضر أو Imperfecto: acababa de...)؛ (3) الاستمرار والتطور: estar + gerundio / seguir + gerundio / llevar + tiempo + gerundio؛ (4) القرب المستقبلي والتكرار: ir a + infinitivo / volver a + infinitivo.',
				'استعمالات SER (الجوهر والهوية): الهوية والتعريف، الجنسية والأصل (es de Orán)، المهنة (es profesora)، الصفات المميزة الدائمة (es responsable)، المادة (es de madera)، الساعة والتاريخ (son las diez)، والملكية (es mío).',
				'استعمالات ESTAR (الموقع والحال): الموقع الجغرافي للأشياء والأماكن والمدن دائماً بـ estar حتى لو كان ثابتاً (Argel está en el norte de África)!، والحالة النفسية أو الصحية أو الجسدية المتغيرة (está contento, está cansado)، والنتائج الظرفية (la puerta está abierta)، وصيغة الاستمرار (está leyendo).',
				'صفات يتغير معناها بين ser و estar: ser listo (ذكي) / estar listo (مستعد)؛ ser bueno (طيب الخلق/صالح) / estar bueno (لذيذ/بصحة جيدة)؛ ser aburrido (مملّ بطبعه) / estar aburrido (يشعر بالملل)؛ ser atento (مهذب ولبق) / estar atento (منتبه ويقظ).'
			],
			visualSvg: svgSpanishConjugationChart({
				title: 'Contraste esencial: SER vs ESTAR',
				subtitle: 'Identidad, localización y cambio de significado',
				width: 580,
				columns: [
					{
						header: 'SER (Esencia)',
						rule: 'Origen, profesión, hora',
						examples: 'Es argelino. Son las nueve.'
					},
					{
						header: 'ESTAR (Estado/Lugar)',
						rule: 'Ubicación, ánimo, gerundio',
						examples: 'Orán está al oeste. Está feliz.'
					},
					{
						header: 'Cambio de sentido',
						rule: 'Mismo adjetivo, distinto uso',
						examples: 'ser listo vs estar listo'
					}
				]
			}),
			visualCaptionAr: 'دليل التفريق الدقيق بين ser و estar في مستوى الثانية ثانوي',
			examples: [
				{
					problemAr:
						'Sustituye las expresiones entre paréntesis por la perífrasis adecuada: «Hace un minuto terminé la lectura (= ......) y debo practicar más (= ......).»',
					solutionAr:
						'«Acabo de terminar la lectura y tengo que (o debo) practicar más.»'
				},
				{
					problemAr:
						'Completa con «ser» o «estar» en Presente: «La Biblioteca Nacional ...... en Argel, ...... un edificio moderno y los alumnos ...... muy atentos durante la visita.»',
					solutionAr:
						'«La Biblioteca Nacional está en Argel (موقع جغرافي), es un edificio moderno (صفة جوهرية) y los alumnos están muy atentos durante la visita (حالة انتباه ظرفية).»'
				}
			],
			watchOutAr:
				'أكبر فخ امتحاني في 2AS LE هو تحديد الموقع الجغرافي لمدينة أو معلم ثابت: قد يظن الطالب أن الموقع ثابت فيستعمل ser، وهذا خطأ! في الإسبانية أي موقع جغرافي (لإنسان أو بناية أو مدينة أو دولة) يأخذ دائماً ESTAR: «Córdoba está en Andalucía» و «Tremecén está en el oeste de Argelia».'
		},
		practice: [
			{
				questionAr:
					'¿Qué frase emplea correctamente «ser» y «estar» para la ubicación geográfica y una cualidad permanente?',
				options: [
					'La Mezquita de Córdoba es en España y está un monumento histórico.',
					'La Mezquita de Córdoba está en España y es un monumento histórico.',
					'La Mezquita de Córdoba está en España y está un monumento histórico.',
					'La Mezquita de Córdoba es en España y es un monumento histórico.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: عُكس استعمال الفعلين؛ الموقع يأخذ estar والتعريف الدائم يأخذ ser.',
					'ممتاز! الموقع الجغرافي دائماً بـ estar (está en España)، والتعريف الجوهري بـ ser (es un monumento).',
					'خطأ: التعريف بالاسم (un monumento histórico) لا يأخذ estar.',
					'خطأ: الموقع الجغرافي لا يأخذ ser إطلاقاً.'
				],
				explanationAr:
					'الموقع المكاني أو الجغرافي يأخذ دائماً estar، بينما التعريف والتصنيف الاسمي والصفات الجوهرية تأخذ ser.'
			},
			{
				questionAr:
					'¿Qué perífrasis verbal expresa exactamente que una acción acaba de ocurrir hace unos instantes?',
				options: [
					'Seguir + gerundio',
					'Acabar de + infinitivo',
					'Tener que + infinitivo',
					'Ir a + infinitivo'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: seguir + gerundio تفيد الاستمرار في الفعل.',
					'صحيح! «acabar de + infinitivo» تعبر عن حدث وقع للتو.',
					'خطأ: tener que + infinitivo تعبر عن الإلزام.',
					'خطأ: ir a + infinitivo تعبر عن المستقبل القريب.'
				],
				explanationAr:
					'المركب «acabar de + infinitivo» يعني أن الفاعل قد أتم الفعل لتوّه (مثال: Acabo de llegar).'
			},
			{
				questionAr:
					'¿Qué significa la oración «Mis compañeros son muy listos, pero todavía no están listos para el debate»?',
				options: [
					'Son puntuales, pero no están despiertos.',
					'Son inteligentes, pero todavía no están preparados.',
					'Son altos, pero todavía no están cansados.',
					'Son amables, pero no están en el aula.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: هذه دلالات صفات أخرى.',
					'أحسنت! «ser listo» = ذكي، بينما «estar listo» = مستعد وجاهز.',
					'خطأ: لا صلة لها بالطول أو التعب.',
					'خطأ: لا تعبر عن اللباقة والمكان.'
				],
				explanationAr:
					'الصفة listo يتغير معناها جذرياً: مع ser تعني الذكاء والفطنة، ومع estar تعني الجاهزية والاستعداد.'
			}
		]
	}
];
