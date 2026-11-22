import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	SpanishGeneratedExerciseInstance,
	SpanishParameterizedTemplate
} from '../../types';
import {
	buildSpanishClassificationTableBlock,
	buildSpanishPassageBlock,
	buildSpanishWordFamilyTableBlock,
	buildSpanishWrittenProductionBlock
} from '../../spanish-helpers';
import {
	saveSpanishSvgAsset,
	svgSpanishConjugationChart,
	svgSpanishGrammarMap,
	svgSpanishWordFormation
} from '../../svg-spanish';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';

function scrambleOrdering(
	orderedItems: string[],
	rng: SeededRng
): {
	items: string[];
	correctOrder: number[];
} {
	const n = orderedItems.length;
	const indices = Array.from({ length: n }, (_, i) => i);
	let perm = rng.shuffle(indices);
	if (perm.every((v, i) => v === i) && n >= 2) {
		perm = [...indices.slice(1), indices[0]];
	}
	const items = perm.map((i) => orderedItems[i]);
	const correctOrder = indices.map((orig) => perm.indexOf(orig));
	return { items, correctOrder };
}

export const TEMPLATES_2AS_LE_T2: SpanishParameterizedTemplate[] = [
	// 1. Comprensión (7 pts) — true_false quiz
	{
		id: 'spa_tpl_2as_le_t2_comp_lectura_educacion',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'comprension_lectora',
		titleAr: 'I. Comprensión del texto : Lectura, bibliotecas e idiomas en el instituto (7 pts)',
		curriculumLessonId: 'spa_lesson_2as_le_t2_ambito_educativo',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					passageTitle: 'El valor insustituible del libro en la era digital',
					paragraphs: [
						'Aunque hoy disponemos de bibliotecas digitales y pantallas rápidas, la lectura pausada de un libro impreso sigue siendo irremplazable para formar un espíritu reflexivo. Diversos estudios pedagógicos demuestran que leer en papel favorece la concentración profunda y mejora la memoria visual sin las interrupciones constantes de los mensajes electrónicos.',
						'En el instituto, muchos docentes recomiendan que los alumnos de Lenguas Extranjeras dediquen al menos veinte minutos diarios a leer relatos, biografías históricas o artículos divulgativos. Al consultar un diccionario junto al libro, el estudiante comprende los matices de cada palabra y enriquece su propia expresión escrita.',
						'Por supuesto, las herramientas digitales resultan muy útiles cuando se emplean con criterio para verificar fechas o escuchar la pronunciación correcta. Sin embargo, es imprescindible que [[el hábito lector]] ocupe un lugar central en [[nuestra formación académica]].'
					],
					source: 'Cuadernos de Pedagogía y Lenguas (texto adaptado)',
					glossary: [
						{ term: 'irremplazable', meaning: 'que no puede ser sustituido por otra cosa con igual eficacia' },
						{ term: 'matiz', meaning: 'diferencia sutil o grado delicado en el significado de una palabra' }
					],
					q1: '1. ¿Qué ventajas educativas atribuye el texto a la lectura en papel frente a las pantallas y qué utilidad reconoce a las herramientas digitales?',
					a1: 'Lectura en papel: favorece la concentración profunda, mejora la memoria visual y evita interrupciones electrónicas. Herramientas digitales: son útiles si se usan con criterio para verificar fechas o escuchar la pronunciación.',
					tfItems: [
						{
							q: 'El texto afirma que las bibliotecas digitales han hecho inútiles los libros impresos.',
							a: 'Falso',
							c: 'Señala que la lectura pausada de un libro impreso sigue siendo irremplazable.',
							mark: '0.5'
						},
						{
							q: 'Los profesores aconsejan leer veinte minutos cada día acompañados de un diccionario.',
							a: 'Verdadero',
							c: 'Recomiendan dedicar al menos veinte minutos diarios y consultar un diccionario junto al libro.',
							mark: '0.5'
						},
						{
							q: 'Según el §3, conviene rechazar cualquier recurso digital incluso para la pronunciación.',
							a: 'Falso',
							c: 'Reconoce que las herramientas digitales son muy útiles cuando se emplean con criterio.',
							mark: '0.5'
						}
					],
					q3: '3. Busca en el texto :\n  a) El sinónimo de «aconsejan» (§2) y el antónimo de «superficial» (§1).\n  b) Tres palabras pertenecientes al campo léxico de la lectura y el estudio.',
					a3: 'a) Sinónimo de aconsejan: «recomiendan»; Antónimo de superficial: «profunda». | b) Campo léxico: lectura, libro, diccionario, expresión escrita, formación académica.',
					q4: '4. ¿A qué remite «nuestra formación académica» (§3) y qué modo verbal exige la expresión «recomiendan que los alumnos dediquen» (§2)?',
					a4: '«nuestra formación académica» remite a la educación integral de los estudiantes de Lenguas Extranjeras. «recomiendan que» exige el Presente de Subjuntivo («dediquen») porque expresa una recomendación con cambio de sujeto.',
					quizStatement:
						'Según la lectura, consultar el diccionario mientras se lee un texto en español ayuda al estudiante a captar los matices del vocabulario y mejorar su escritura.',
					quizCorrect: true,
					quizExplanation:
						'العبارة صحيحة: تؤكد الفقرة الثانية أن الاستعانة بالقاموس أثناء القراءة تُكسب المتعلم دلالات المفردات الدقيقة وتُثري تعبيره الكتابي.'
				},
				{
					passageTitle: 'Fátima Al-Fihriya y las bibliotecas como memoria viva del saber',
					paragraphs: [
						'En el siglo IX, una mujer culta y generosa llamada Fátima Al-Fihriya impulsó en Fez la fundación de la célebre institución de Al-Qarawiyyin, cuya biblioteca histórica acogió durante siglos a investigadores venidos de todo el mundo mediterráneo. Su iniciativa demuestra que la educación sólida nace de la constancia y del servicio al bien común.',
						'En las aulas de aquel centro se enseñaban gramática, medicina, astronomía y lenguas, y se conservaban miles de manuscritos cuidadosamente copiados. Los maestros insistían en que cada estudiante discutiera con respeto y comprobara sus fuentes antes de redactar un tratado.',
						'Hoy en día, visitar una biblioteca moderna sigue teniendo el mismo sentido noble: aprender a pensar con rigor. Por eso, los profesores desean que los jóvenes valoren [[estos espacios silenciosos]] y cultiven [[el gusto por el estudio serio]].'
					],
					source: 'Revista de Historia de la Educación Mediterránea (texto adaptado)',
					glossary: [
						{ term: 'manuscrito', meaning: 'libro o documento escrito a mano antes de la imprenta' },
						{ term: 'rigor', meaning: 'exactitud y seriedad metodológica en el trabajo intelectual' }
					],
					q1: '1. ¿Qué legado educativo dejó Fátima Al-Fihriya y qué exigían los maestros a los estudiantes de aquel centro?',
					a1: 'Impulsó en el siglo IX la fundación de Al-Qarawiyyin y su biblioteca histórica, que acogió a investigadores de todo el Mediterráneo. Los maestros exigían discutir con respeto y comprobar las fuentes antes de redactar un tratado.',
					tfItems: [
						{
							q: 'La institución de Al-Qarawiyyin se limitaba exclusivamente a enseñar música y danza.',
							a: 'Falso',
							c: 'Se enseñaban gramática, medicina, astronomía y lenguas, y se conservaban miles de manuscritos.',
							mark: '0.5'
						},
						{
							q: 'Los docentes pedían a los estudiantes que verificaran sus fuentes antes de escribir.',
							a: 'Verdadero',
							c: 'Insistían en que cada estudiante comprobara sus fuentes antes de redactar un tratado.',
							mark: '0.5'
						},
						{
							q: 'Según el §3, las bibliotecas actuales han perdido todo sentido educativo.',
							a: 'Falso',
							c: 'Visitar una biblioteca moderna sigue teniendo el mismo sentido noble: aprender a pensar con rigor.',
							mark: '0.5'
						}
					],
					q3: '3. Encuentra en el texto :\n  a) El sinónimo de «famosa» (§1) y el antónimo de «ruidosos» (§3).\n  b) Tres palabras de la familia o campo léxico del saber y los libros.',
					a3: 'a) Sinónimo de famosa: «célebre»; Antónimo de ruidosos: «silenciosos». | b) Campo léxico: biblioteca, manuscritos, investigadores, maestros, estudiante, estudio.',
					q4: '4. ¿A qué remiten «estos espacios silenciosos» (§3) y «el gusto por el estudio serio» (§3)? ¿Por qué «valoren» y «cultiven» están en Subjuntivo?',
					a4: '«estos espacios silenciosos» remite a las bibliotecas modernas. «valoren» y «cultiven» están en Presente de Subjuntivo porque dependen del verbo de deseo «desean que» con cambio de sujeto (los profesores / los jóvenes).',
					quizStatement:
						'Según el texto, en la antigua institución de Al-Qarawiyyin no se daba ninguna importancia a la comprobación de las fuentes escritas.',
					quizCorrect: false,
					quizExplanation:
						'العبارة خاطئة: تؤكد الفقرة الثانية أن الأساتذة كانوا يشددون على احترام النقاش والتحقق الدقيق من المصادر قبل التأليف.'
				},
				{
					passageTitle: 'Aprender lenguas extranjeras: una ventana al conocimiento científico',
					paragraphs: [
						'En la sociedad actual del conocimiento, estudiar varias lenguas extranjeras constituye una herramienta intelectual de primer orden. Para el alumnado de la rama de Lenguas Extranjeras, dominar el español junto al árabe, el francés y el inglés abre el acceso directo a manuales universitarios, congresos internacionales y fuentes documentales variadas.',
						'Además, la comparación constante entre dos sistemas lingüísticos agudiza la capacidad de análisis lógico. Cuando un estudiante traduce con cuidado una idea del español al árabe, descubre la estructura profunda de su propia lengua materna y evita las traducciones literales incorrectas.',
						'Por ello, es necesario que los institutos fomenten los talleres de conversación y lectura guiada. Si cada alumno mantiene la curiosidad intelectual y respeta el esfuerzo diario, convertirá [[las lenguas aprendidas]] en [[un instrumento de progreso y diálogo]].'
					],
					source: 'Boletín Universitario de Didáctica de Lenguas (texto adaptado)',
					glossary: [
						{ term: 'agudizar', meaning: 'hacer más penetrante, preciso o fino el pensamiento' },
						{ term: 'traducción literal', meaning: 'traducción palabra por palabra que a menudo pierde el sentido real' }
					],
					q1: '1. ¿Qué dos beneficios principales aporta el aprendizaje de varias lenguas extranjeras según los párrafos 1 y 2?',
					a1: '1) Abre el acceso directo a manuales universitarios, congresos y fuentes documentales; 2) agudiza la capacidad de análisis lógico al comparar sistemas lingüísticos y perfecciona el dominio de la lengua materna.',
					tfItems: [
						{
							q: 'Dominar varias lenguas permite consultar directamente fuentes documentales y congresos científicos.',
							a: 'Verdadero',
							c: 'Abre el acceso directo a manuales universitarios, congresos y fuentes documentales.',
							mark: '0.5'
						},
						{
							q: 'Traducir con cuidado del español al árabe empeora el conocimiento de la lengua materna.',
							a: 'Falso',
							c: 'Al contrario, descubre la estructura profunda de la lengua materna y evita errores.',
							mark: '0.5'
						},
						{
							q: 'El texto recomienda suprimir los talleres de lectura guiada en los institutos.',
							a: 'Falso',
							c: 'Afirma que es necesario que los institutos fomenten talleres de conversación y lectura guiada.',
							mark: '0.5'
						}
					],
					q3: '3. Busca en el texto :\n  a) Un sinónimo de «mejora / afina» (§2) y un antónimo de «descuidado / negligencia» (§2-§3).\n  b) Dos sustantivos derivados terminados en «-ción» o «-aje» en el texto.',
					a3: 'a) Sinónimo: «agudiza»; Antónimo: «cuidado» o «esfuerzo». | b) Sustantivos derivados: comparación, traducción, conversación, aprendizaje.',
					q4: '4. ¿A qué remite «las lenguas aprendidas» (§3) y qué función cumple «es necesario que los institutos fomenten»?',
					a4: '«las lenguas aprendidas» remite al español, francés e inglés estudiados por el alumnado. «es necesario que... fomenten» expresa necesidad impersonal y exige Presente de Subjuntivo («fomenten»).',
					quizStatement:
						'Comparar el español con el árabe ayuda a desarrollar el análisis lógico y a evitar traducciones literales equivocadas.',
					quizCorrect: true,
					quizExplanation:
						'العبارة صحيحة: الفقرة الثانية توضح أن المقارنة الواعية بين النظامين اللغويين تصقل التحليل المنطقي وتجنب الترجمة الحرفية الخاطئة.'
				}
			];

			const v = rng.pick(variants);
			const content: ContentBlock[] = [
				buildIllustratedFigureBlock('spa_03_educacion_idiomas_biblioteca', {
					lang: 'es',
					mode: 'labeled',
					pins: [],
					width: '62%',
					maxHeight: 118,
					caption: 'Lectura, idiomas y formación educativa en 2AS LE'
				}),
				buildSpanishPassageBlock({
					title: v.passageTitle,
					paragraphs: v.paragraphs,
					source: v.source,
					numberedParagraphs: true,
					glossary: v.glossary
				}),
				{ type: 'text', content: v.q1, answer: v.a1, mark: '2.0' },
				{
					type: 'text',
					content: '2. Indica si es Verdadero o Falso justificando tu respuesta con el texto :',
					mark: ''
				},
				{ type: 'true_false', items: v.tfItems },
				{ type: 'text', content: v.q3, answer: v.a3, mark: '2.0' },
				{ type: 'text', content: v.q4, answer: v.a4, mark: '1.5' }
			];

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'true_false',
					questionText: v.quizStatement,
					questionTextAr: 'حدّد صحة أو خطأ العبارة الآتية بناءً على النص:',
					questionData: {
						correctAnswer: v.quizCorrect
					},
					explanation: v.quizExplanation
				},
				sujetExercise: {
					customTitle: 'I. Comprensión del texto',
					points: 7,
					instruction: 'Lee atentamente la lámina y el texto y responde a las cuestiones :',
					content
				},
				hints: [
					'اربط أفكار النص باللوحة التربوية (المطالعة، اللغات، البحث الموثوق، والنجاح).',
					'علل دائماً عبارات الصواب والخطأ بجملة واضحة من الفقرة المعنية.',
					'لاحظ أفعال المضارع المنصوب (Subjuntivo) الواردة بعد عبارات التمني والضرورة.'
				],
				solutionStepsAr: [
					'استخراج الفكرة الرئيسية والفوائد التربوية (2.0 نقطة).',
					'الحكم بالصواب أو الخطأ مع التعليل النصي (1.5 نقطة).',
					'الرصيد المعجمي: المترادفات والأضداد والمشتقات (2.0 نقطة).',
					'تحديد العائد النحوي وتعليل صيغة Subjuntivo (1.5 نقطة).'
				],
				finalAnswer: v.quizCorrect ? 'Verdadero' : 'Falso'
			};
		}
	},

	// 2. Comprensión (7 pts) — mcq quiz
	{
		id: 'spa_tpl_2as_le_t2_comp_vida_escolar',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'comprension_lectora',
		titleAr: 'I. Comprensión del texto : Vida escolar, esfuerzo y carta educativa (7 pts)',
		curriculumLessonId: 'spa_lesson_2as_le_t2_presente_subjuntivo',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					passageTitle: 'Propuesta de los alumnos de 2AS para crear un rincón de lectura',
					paragraphs: [
						'Estimado Sr. Director: Los alumnos de segundo año de Lenguas Extranjeras nos dirigimos a usted con respeto para proponer la creación de un rincón de lectura bilingüe en la biblioteca de nuestro instituto. Hemos observado que muchos compañeros desean practicar español fuera de clase, pero no siempre encuentran libros adaptados a su nivel.',
						'Por esta razón, sugerimos que la biblioteca reserve dos estanterías para novelas juveniles, diccionarios ilustrados y revistas culturales en español. Asimismo, los delegados de clase queremos organizar cada jueves una sesión de intercambio literario donde los estudiantes lean en voz alta y compartan resúmenes críticos.',
						'Esperamos que usted apruebe [[esta iniciativa educativa]] y nos permita colaborar en el orden y cuidado de los libros. Creemos firmemente que [[este espacio]] fortalecerá el hábito de la lectura y el compañerismo en todo el centro. Atentamente, los alumnos de 2AS LE.'
					],
					source: 'Correspondencia escolar modelo — 2AS LE',
					glossary: [
						{ term: 'rincón de lectura', meaning: 'espacio tranquilo y dedicado especialmente a la lectura en un centro' },
						{ term: 'delegado', meaning: 'alumno elegido para representar con responsabilidad a su grupo' }
					],
					q1: '1. ¿Qué tipo de documento es el texto, quién lo envía y qué solicita exactamente al director del instituto?',
					a1: 'Es una carta educativa formal enviada por los alumnos de 2AS Lenguas Extranjeras al director del instituto para solicitar la creación de un rincón de lectura bilingüe y reservar dos estanterías para libros y diccionarios en español.',
					mcGroups: [
						{
							header: 'a) ¿Qué actividad quieren organizar los delegados cada jueves?',
							options: [
								'Una sesión de lectura en voz alta y resúmenes críticos',
								'Un torneo de videojuegos en la sala informática',
								'Una venta comercial de cuadernos usados'
							],
							correct: 'Una sesión de lectura en voz alta y resúmenes críticos',
							mark: '1.0'
						},
						{
							header: 'b) ¿Por qué emplean la forma «usted» en toda la carta?',
							options: [
								'Porque hablan con varios amigos cercanos de su edad',
								'Porque se trata de una carta formal dirigida a una autoridad escolar',
								'Porque quieren expresar una acción del pasado remoto'
							],
							correct: 'Porque se trata de una carta formal dirigida a una autoridad escolar',
							mark: '1.0'
						}
					],
					q3: '3. Extrae del texto :\n  a) La fórmula de saludo inicial y la fórmula de despedida formal.\n  b) Dos verbos en Presente de Subjuntivo motivados por deseo o sugerencia.',
					a3: 'a) Saludo: «Estimado Sr. Director:»; Despedida: «Atentamente,». | b) Verbos en Subjuntivo: «reserve» (sugerimos que), «lean / compartan» (donde), «apruebe / permita» (esperamos que).',
					q4: '4. ¿A qué remiten «esta iniciativa educativa» (§3) y «este espacio» (§3)?',
					a4: 'Ambos remiten a la creación del rincón de lectura bilingüe en español dentro de la biblioteca del instituto.',
					mcqQuestion: '¿Por qué los alumnos escriben «sugerimos que la biblioteca reserve» y «esperamos que usted apruebe» en Presente de Subjuntivo?',
					mcqQuestionAr: 'لماذا استُعمل فعلا «reserve» و «apruebe» في صيغة Presente de Subjuntivo؟',
					mcqCorrect: 'Porque «sugerir que» y «esperar que» expresan sugerencia o deseo con dos sujetos distintos',
					mcqDistractors: [
						{
							text: 'Porque los dos verbos tienen exactamente el mismo sujeto',
							diagnosticFeedback: 'خطأ: الفاعل الأول هو التلاميذ والفاعل الثاني هو المكتبة أو المدير.'
						},
						{
							text: 'Porque describen un recuerdo habitual de la infancia',
							diagnosticFeedback: 'خطأ: تلك وظيفة Pretérito Imperfecto.'
						},
						{
							text: 'Porque «sugerir» y «esperar» siempre exigen Futuro simple',
							diagnosticFeedback: 'خطأ: أفعال التمني والاقتراح عند اختلاف الفاعلين تفرض Subjuntivo.'
						}
					],
					mcqExplanation: 'عند اختلاف الفاعلين بعد أفعال الاقتراح والتمني (sugerir que / esperar que) يجب استعمال Presente de Subjuntivo.'
				},
				{
					passageTitle: 'El legado pedagógico de Cheikh Abdelhamid Ben Badis: ciencia y ética',
					paragraphs: [
						'A lo largo de la historia educativa argelina, la figura de Cheikh Abdelhamid Ben Badis ocupa un lugar luminoso por su incansable defensa de la instrucción y de la moral recta. Desde las aulas de Constantina, dedicó su vida a formar jóvenes capaces de unir el conocimiento sólido con la humildad y el servicio a su comunidad.',
						'En sus enseñanzas insistía en que la verdadera escuela no busca llenar la memoria de datos pasajeros, sino despertar la razón y cultivar el carácter. Por eso aconsejaba a sus discípulos que leyeran con constancia, que respetaran a sus maestros y que aprovecharan cada hora de la juventud en tareas útiles.',
						'Hoy en día, [[aquel ejemplo de exigencia serena]] sigue inspirando a los alumnos de secundaria. Cuando un estudiante estudia con disciplina, honra [[esta noble tradición]] que considera la educación como el pilar más firme de la dignidad humana.'
					],
					source: 'Semblanzas pedagógicas argelinas (texto adaptado)',
					glossary: [
						{ term: 'discípulo', meaning: 'alumno o persona que sigue las enseñanzas de un maestro' },
						{ term: 'pilar', meaning: 'base fundamental sobre la que se sostiene algo importante' }
					],
					q1: '1. ¿Qué objetivo perseguía Cheikh Abdelhamid Ben Badis en su labor educativa y qué tres consejos daba a sus alumnos?',
					a1: 'Buscaba formar jóvenes que unieran el conocimiento sólido con la humildad y el servicio a la comunidad, despertando la razón y cultivando el carácter. Consejos: leer con constancia, respetar a los maestros y aprovechar cada hora de la juventud en tareas útiles.',
					mcGroups: [
						{
							header: 'a) Según el §2, ¿qué debe hacer la verdadera escuela?',
							options: [
								'Limitarse a repetir datos pasajeros sin reflexionar',
								'Despertar la razón y cultivar el carácter moral del alumno',
								'Evitar la lectura y los hábitos de disciplina'
							],
							correct: 'Despertar la razón y cultivar el carácter moral del alumno',
							mark: '1.0'
						},
						{
							header: 'b) ¿Qué tiempo verbal predomina en «aconsejaba... que leyeran, que respetaran y que aprovecharan»?',
							options: [
								'Imperfecto de Subjuntivo tras consejo en pasado',
								'Pretérito Perfecto compuesto',
								'Presente de Indicativo habitual'
							],
							correct: 'Imperfecto de Subjuntivo tras consejo en pasado',
							mark: '1.0'
						}
					],
					q3: '3. Busca en el texto :\n  a) El sinónimo de «dedicación firme o perseverancia» (§2) y el antónimo de «orgullo / soberbia» (§1).\n  b) Tres sustantivos relacionados con los valores morales y educativos.',
					a3: 'a) Sinónimo: «constancia»; Antónimo de orgullo: «humildad». | b) Valores: instrucción, moral, conocimiento, humildad, servicio, disciplina, dignidad.',
					q4: '4. ¿A qué remiten «aquel ejemplo de exigencia serena» (§3) y «esta noble tradición» (§3)?',
					a4: '«aquel ejemplo de exigencia serena» remite a la labor y los consejos educativos de Cheikh Abdelhamid Ben Badis. «esta noble tradición» remite a la tradición pedagógica que une saber riguroso y formación moral.',
					mcqQuestion: '¿Qué contraste educativo fundamental defiende el texto en el segundo párrafo?',
					mcqQuestionAr: 'ما المقابلة التربوية الجوهرية التي يبرزها النص في الفقرة الثانية؟',
					mcqCorrect: 'Oponer la memorización pasajera sin reflexión a una educación que despierta la razón y forma el carácter',
					mcqDistractors: [
						{
							text: 'Oponer el estudio de las ciencias al estudio de la lengua árabe',
							diagnosticFeedback: 'خطأ: النص يدعو لتكامل العلم والأخلاق واللغات.'
						},
						{
							text: 'Rechazar la presencia de maestros en las aulas',
							diagnosticFeedback: 'خطأ: النص يوصي باحترام المعلمين.'
						},
						{
							text: 'Afirmar que la juventud debe dedicar todo su tiempo al ocio pasivo',
							diagnosticFeedback: 'خطأ: يوصي باستثمار ساعات الشباب في الأعمال النافعة.'
						}
					],
					mcqExplanation: 'يميز النص بين الحفظ الآلي العابر وبين التربية الحقّة التي توقظ العقل وتبني الخلق.'
				},
				{
					passageTitle: 'El uso inteligente de la tecnología en el estudio escolar',
					paragraphs: [
						'En los últimos años, los ordenadores y las tabletas han entrado con fuerza en la vida escolar. Utilizados con medida y sentido crítico, ofrecen acceso inmediato a enciclopedias digitales, diccionarios sonoros y mapas interactivos que facilitan la comprensión de temas complejos.',
						'No obstante, muchos educadores advierten sobre un riesgo frecuente: copiar información sin leerla ni analizarla. Cuando un estudiante entrega un trabajo copiado literalmente, no desarrolla su capacidad de redactar ni adquiere verdadero conocimiento. Además, estudiar con notificaciones encendidas divide la atención.',
						'Por lo tanto, conviene que cada joven adopte [[una regla sencilla]]: apagar las distracciones mientras repasa, tomar notas manuscritas en su cuaderno y usar la pantalla solo como apoyo. Así, la tecnología será [[una aliada fiel]] del aprendizaje y nunca su sustituta.'
					],
					source: 'Observatorio Escolar de Innovación Responsable (texto adaptado)',
					glossary: [
						{ term: 'notificación', meaning: 'aviso sonoro o visual de un mensaje que interrumpe la tarea' },
						{ term: 'aliada', meaning: 'persona o herramienta que colabora positivamente para lograr un fin' }
					],
					q1: '1. ¿Qué ventajas ofrecen las herramientas digitales usadas con medida y qué dos riesgos señala el párrafo 2?',
					a1: 'Ventajas: acceso rápido a enciclopedias digitales, diccionarios sonoros y mapas interactivos. Riesgos: 1) copiar información sin leerla ni analizarla (lo que impide aprender a redactar); 2) estudiar con notificaciones encendidas, que divide la atención.',
					mcGroups: [
						{
							header: 'a) ¿Qué recomienda el texto para que la tecnología sea una aliada del aprendizaje?',
							options: [
								'Apagar las distracciones, tomar notas a mano y usar la pantalla solo como apoyo',
								'Abandonar los cuadernos escritos y depender de copiar textos enteros',
								'Leer siempre con todas las notificaciones activadas'
							],
							correct: 'Apagar las distracciones, tomar notas a mano y usar la pantalla solo como apoyo',
							mark: '1.0'
						},
						{
							header: 'b) ¿Qué relación lógica introduce la locución «No obstante» al inicio del §2?',
							options: [
								'Causa directa',
								'Oposición / contraste',
								'Finalidad o propósito'
							],
							correct: 'Oposición / contraste',
							mark: '1.0'
						}
					],
					q3: '3. Busca en el texto :\n  a) El sinónimo de «peligro» (§2) y el antónimo de «encendidas» o «apagar» (§2-§3).\n  b) Dos palabras derivadas con sufijos del ámbito tecnológico o educativo.',
					a3: 'a) Sinónimo de peligro: «riesgo»; Antónimo: apagar / encendidas. | b) Derivadas: comprensión, información, aprendizaje, educadores, notificación.',
					q4: '4. ¿A qué remiten «una regla sencilla» (§3) y «una aliada fiel» (§3)?',
					a4: '«una regla sencilla» remite a apagar las distracciones, tomar notas manuscritas y usar la pantalla solo como apoyo. «una aliada fiel» remite a la tecnología usada con equilibrio.',
					mcqQuestion: '¿Por qué el autor emplea el Presente de Subjuntivo «adopte» en «conviene que cada joven adopte una regla sencilla»?',
					mcqQuestionAr: 'لماذا جاء الفعل «adopte» في صيغة Presente de Subjuntivo؟',
					mcqCorrect: 'Porque la expresión impersonal de conveniencia «conviene que» rige Subjuntivo',
					mcqDistractors: [
						{
							text: 'Porque «adopte» es la 1.ª persona del Pretérito Indefinido',
							diagnosticFeedback: 'خطأ: الماضي المنقطع هو adopté بنبرة على الآخر وبمعنى مختلف.'
						},
						{
							text: 'Porque el texto narra un suceso ocurrido el siglo pasado',
							diagnosticFeedback: 'خطأ: النص ينصح الحاضر والمستقبل التربوي.'
						},
						{
							text: 'Porque «conviene que» expresa certeza absoluta en pasado',
							diagnosticFeedback: 'خطأ: عبارات الملاءمة والضرورة (conviene que, es necesario que) تفرض Subjuntivo.'
						}
					],
					mcqExplanation: 'العبارة غير الشخصية «conviene que» (من المستحسن أن) تستلزم صيغة Presente de Subjuntivo.'
				}
			];

			const v = rng.pick(variants);
			const mcq = buildUniqueMcqOptions(v.mcqCorrect, v.mcqDistractors, rng);

			const content: ContentBlock[] = [
				buildSpanishPassageBlock({
					title: v.passageTitle,
					paragraphs: v.paragraphs,
					source: v.source,
					numberedParagraphs: true,
					glossary: v.glossary
				}),
				{ type: 'text', content: v.q1, answer: v.a1, mark: '2.0' },
				{
					type: 'text',
					content: '2. Selecciona la opción correcta según el texto :',
					mark: ''
				},
				{ type: 'multiple_choice', groups: v.mcGroups },
				{ type: 'text', content: v.q3, answer: v.a3, mark: '1.5' },
				{ type: 'text', content: v.q4, answer: v.a4, mark: '1.5' }
			];

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'mcq',
					questionText: v.mcqQuestion,
					questionTextAr: v.mcqQuestionAr,
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: v.mcqExplanation
				},
				sujetExercise: {
					customTitle: 'I. Comprensión del texto',
					points: 7,
					instruction: 'Lee cuidadosamente el texto y contesta a todas las preguntas :',
					content
				},
				hints: [
					'تنبّه لنوع النص (رسالة رسمية / مقال تربوي / سيرة تعليمية) عند الإجابة عن السؤال الأول.',
					'راجع محفزات المضارع المنصوب في النص (esperar que, sugerir que, convenir que).',
					'استعن بالمسرد أسفل النص (Glosario) لفهم المفردات الدقيقة.'
				],
				solutionStepsAr: [
					'تحديد طبيعة النص وأفكاره الأساسية (2.0 نقطة).',
					'اختيار الإجابات الصحيحة في الفهم (2.0 نقطة).',
					'استخراج المعجم أو الصيغ المطلوبة بدقة (1.5 نقطة).',
					'تعيين العائد النحوي للعبارات المسطرة (1.5 نقطة).'
				],
				finalAnswer: v.mcqCorrect
			};
		}
	},

	// 3. Competencia lingüística (7 pts) — matching quiz + saveSpanishSvgAsset
	{
		id: 'spa_tpl_2as_le_t2_ling_subjuntivo_deseos',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'conjugacion_modos',
		titleAr: 'II. Competencia lingüística : Presente de Subjuntivo, deseo, recomendación y sujetos (7 pts)',
		curriculumLessonId: 'spa_lesson_2as_le_t2_presente_subjuntivo',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					svgSlug: 'spa_2as_t2_ling_subjuntivo_v0',
					svgContent: svgSpanishGrammarMap({
						title: 'Desencadenantes del Presente de Subjuntivo',
						rootLabel: 'Verbo 1 + que + Verbo 2 (Subjuntivo)',
						rootSub: 'Obligatorio cuando cambian los sujetos',
						width: 560,
						branches: [
							{
								label: 'Deseo',
								rule: 'espero / deseo que',
								example: 'Espero que leas mucho.'
							},
							{
								label: 'Consejo',
								rule: 'recomiendo / aconsejo',
								example: 'Aconsejo que estudies.'
							},
							{
								label: 'Necesidad',
								rule: 'es necesario / preciso',
								example: 'Es preciso que vengas.'
							},
							{
								label: 'Mismo sujeto',
								rule: 'Infinitivo sin QUE',
								example: 'Quiero leer más libros.'
							}
						]
					}),
					svgCaption: 'Mapa conceptual de los usos del Presente de Subjuntivo en 2AS LE',
					classPrompt:
						'1. Clasifica estas seis oraciones en las tres columnas de la tabla (Quiero aprender español ; Espero que apruebes ; Es evidente que lees bien ; Recomiendo que repaséis ; Deseo visitar Córdoba ; Es verdad que trabajas mucho) :',
					classCols: [
						{ header: 'Indicativo (Certeza)', items: ['Es evidente que lees bien', 'Es verdad que trabajas mucho'], mark: '0.5' },
						{ header: 'Infinitivo (Mismo sujeto)', items: ['Quiero aprender español', 'Deseo visitar Córdoba'], mark: '0.5' },
						{ header: 'Subjuntivo (2 sujetos)', items: ['Espero que apruebes', 'Recomiendo que repaséis'], mark: '0.5' }
					],
					q2: '2. Conjuga los verbos entre paréntesis en Presente de Subjuntivo o en Infinitivo según corresponda :\n  a) Los profesores esperan que todos los alumnos (leer) con atención.\n  b) Yo quiero (mejorar) mi pronunciación antes del examen oral.\n  c) Es importante que tú (tener) paciencia y (escribir) un borrador.\n  d) El director aconseja que nosotros (mantener) limpia la biblioteca.',
					a2: 'a) lean (Subjuntivo).\n  b) mejorar (Infinitivo: mismo sujeto).\n  c) tengas / escribas (Subjuntivo).\n  d) mantengamos (Subjuntivo).',
					q3: '3. Transforma estos consejos directos en recomendaciones formales usando «Recomiendo que...» o «Es necesario que...» :\n  a) Vosotros debéis consultar el diccionario bilingüe.\n  b) Tú debes ser puntual y respetar los horarios de clase.\n  c) Los estudiantes deben ir a la biblioteca dos veces por semana.',
					a3: 'a) Recomiendo que vosotros consultéis el diccionario bilingüe.\n  b) Es necesario que tú seas puntual y respetes los horarios de clase.\n  c) Recomiendo que los estudiantes vayan a la biblioteca dos veces por semana.',
					q4: '4. Completa con la forma exacta de los verbos irregulares en Presente de Subjuntivo (ser, estar, ir, saber, dar) :\n  a) Ojalá el ambiente en clase ............ (ser) siempre respetuoso.\n  b) Espero que vosotros ............ (estar) tranquilos durante la prueba.\n  c) Deseo que mi hermana ............ (ir) al taller de caligrafía y ............ (saber) aprovecharlo.',
					a4: 'a) sea ; b) estéis ; c) vaya / sepa.',
					pairs: [
						{ left: 'esperar que (tú / ser)', right: 'seas' },
						{ left: 'recomendar que (nosotros / ir)', right: 'vayamos' },
						{ left: 'es necesario que (ellos / tener)', right: 'tengan' },
						{ left: 'mismo sujeto (yo / querer / estudiar)', right: 'quiero estudiar' }
					],
					explanation:
						'بعد عبارات التمني والتوصية والضرورة باختلاف الفاعل نصرف في Subjuntivo (seas, vayamos, tengan)، وعند تطابق الفاعل نستعمل المصدر.'
				},
				{
					svgSlug: 'spa_2as_t2_ling_subjuntivo_v1',
					svgContent: svgSpanishConjugationChart({
						title: 'Cambios ortográficos y de raíz en Subjuntivo',
						subtitle: 'Reglas clave para escribir sin faltas',
						width: 560,
						columns: [
							{
								header: '-CAR / -GAR / -ZAR',
								rule: 'qu / gu / c ante -e',
								examples: 'busque, llegue, organice'
							},
							{
								header: 'E -> IE / O -> UE',
								rule: 'No cambia en nosotros',
								examples: 'piense / pensemos'
							},
							{
								header: 'E -> I (ir)',
								rule: 'Cambia en todas',
								examples: 'pida, pidas, pidamos'
							}
						]
					}),
					svgCaption: 'Cuadro de alternancias ortográficas y vocálicas en Presente de Subjuntivo',
					classPrompt:
						'1. Clasifica estos seis verbos conjugados en Presente de Subjuntivo según su regla de formación (busque, organicemos, pidamos, vuelvas, sepáis, vayamos) :',
					classCols: [
						{ header: 'Cambio ortográfico', items: ['busque (-car pasa a qu)', 'organicemos (-zar pasa a c)'], mark: '0.5' },
						{ header: 'Cambio vocálico', items: ['pidamos (e pasa a i)', 'vuelvas (o pasa a ue)'], mark: '0.5' },
						{ header: 'Irregulares DISHES', items: ['sepáis (saber)', 'vayamos (ir)'], mark: '0.5' }
					],
					q2: '2. Conjuga los verbos entre paréntesis en Presente de Subjuntivo cuidando la ortografía :\n  a) El profesor pide que nosotros (buscar) fuentes fiables en la biblioteca.\n  b) Es conveniente que tú (organizar) tus apuntes antes del control.\n  c) Espero que los invitados (llegar) puntuales a la conferencia.\n  d) Recomiendo que vosotros (empezar, e pasa a ie) el repaso hoy mismo.',
					a2: 'a) busquemos (-car pasa a qu).\n  b) organices (-zar pasa a c).\n  c) lleguen (-gar pasa a gu).\n  d) empecéis (-zar pasa a c, sin diptongación en vosotros).',
					q3: '3. Completa eligiendo entre Indicativo y Subjuntivo según el sentido de certeza o duda/negación :\n  a) Creo que la lectura (ser) fundamental para aprender idiomas.\n  b) No creo que este ejercicio (ser) imposible si estudiamos juntos.\n  c) Es evidente que los diccionarios (ayudar) mucho; pero dudo que un traductor automático los (sustituir).',
					a3: 'a) es (Indicativo: creo que afirmativo).\n  b) sea (Subjuntivo: no creo que negativo).\n  c) ayudan (Indicativo: es evidente que) / sustituya (Subjuntivo: dudo que).',
					q4: '4. Corrige el error modal o conjugación incorrecta en estas tres frases :\n  a) Deseo que vosotros leéis más libros este trimestre.\n  b) Quiero que apruebo todas las asignaturas.\n  c) Es necesario que tú sabes estas reglas.',
					a4: 'a) Deseo que vosotros leáis más libros este trimestre.\n  b) Quiero aprobar todas las asignaturas.\n  c) Es necesario que tú sepas estas reglas.',
					pairs: [
						{ left: 'buscar (yo, Subjuntivo)', right: 'busque' },
						{ left: 'llegar (ellos, Subjuntivo)', right: 'lleguen' },
						{ left: 'organizar (tú, Subjuntivo)', right: 'organices' },
						{ left: 'pedir (nosotros, Subjuntivo)', right: 'pidamos' }
					],
					explanation:
						'تتغير نهايات -car/-gar/-zar قبل -e في Subjuntivo (busque, lleguen, organices)، كما تحافظ أفعال -ir على التغيير مع nosotros (pidamos).'
				},
				{
					svgSlug: 'spa_2as_t2_ling_subjuntivo_v2',
					svgContent: svgSpanishConjugationChart({
						title: 'Presente de Subjuntivo desde la raíz de YO',
						subtitle: 'Quitar -o del presente y añadir vocal contraria',
						width: 560,
						columns: [
							{
								header: 'TENER -> teng-',
								rule: 'tengo -> tenga',
								examples: 'tenga, tengas, tengamos'
							},
							{
								header: 'HACER -> hag-',
								rule: 'hago -> haga',
								examples: 'haga, hagas, hagáis'
							},
							{
								header: 'CONOCER -> conozc-',
								rule: 'conozco -> conozca',
								examples: 'conozca, conozcan'
							}
						]
					}),
					svgCaption: 'Derivación de subjuntivos irregulares desde la 1.ª persona de Indicativo',
					classPrompt:
						'1. Clasifica estas seis frases según expresen «Deseo», «Necesidad» o «Finalidad» (Ojalá aprendamos bien ; Hace falta que estudies ; Lee para que comprendas mejor ; Espero que tengas éxito ; Es preciso que vengáis ; Practicamos a fin de que hablen con fluidez) :',
					classCols: [
						{ header: 'Deseo', items: ['Ojalá aprendamos bien', 'Espero que tengas éxito'], mark: '0.5' },
						{ header: 'Necesidad', items: ['Hace falta que estudies', 'Es preciso que vengáis'], mark: '0.5' },
						{ header: 'Finalidad', items: ['Lee para que comprendas mejor', 'Practicamos a fin de que hablen con fluidez'], mark: '0.5' }
					],
					q2: '2. Conjuga en Presente de Subjuntivo usando la raíz irregular de «yo» :\n  a) Espero que tú (hacer) un esquema claro antes de redactar.\n  b) Es necesario que vosotros (conocer) las normas de la carta formal.\n  c) La directora pide que los delegados (decir) su opinión con respeto.\n  d) Deseo que todos nosotros (salir) satisfechos del examen.',
					a2: 'a) hagas ; b) conozcáis ; c) digan ; d) salgamos.',
					q3: '3. Une cada pareja de oraciones usando «para + infinitivo» o «para que + Subjuntivo» según los sujetos :\n  a) Salma consulta el diccionario. Salma quiere evitar faltas de ortografía.\n  b) El profesor explica con ejemplos. Los alumnos comprenden la regla.\n  c) Nosotros preparamos fichas de lectura. Nosotros repasamos mejor.',
					a3: 'a) Salma consulta el diccionario para evitar faltas de ortografía. (Mismo sujeto).\n  b) El profesor explica con ejemplos para que los alumnos comprendan la regla. (Sujetos distintos).\n  c) Nosotros preparamos fichas de lectura para repasar mejor. (Mismo sujeto).',
					q4: '4. Completa el diálogo escolar con tres formas de Presente de Subjuntivo (estar, poder, venir) :\n  —¡Ojalá hoy ............ (estar) abierto el club de lectura! —Sí, espero que tú ............ (poder) entrar y que Nadia también ............ (venir) con sus apuntes.',
					a4: 'esté / puedas / venga.',
					pairs: [
						{ left: 'hacer (tú, Subjuntivo)', right: 'hagas' },
						{ left: 'conocer (él, Subjuntivo)', right: 'conozca' },
						{ left: 'decir (ellos, Subjuntivo)', right: 'digan' },
						{ left: 'salir (nosotros, Subjuntivo)', right: 'salgamos' }
					],
					explanation:
						'تُبنى هذه الأفعال في Subjuntivo انطلاقاً من جذر yo في المضارع الإخباري: hago→hagas, conozco→conozca, digo→digan, salgo→salgamos.'
				}
			];

			const v = rng.pick(variants);
			const svgPath = saveSpanishSvgAsset(v.svgSlug, v.svgContent);

			const content: ContentBlock[] = [
				{
					type: 'image',
					src: svgPath,
					width: '76%',
					caption: v.svgCaption
				},
				{ type: 'text', content: v.classPrompt, mark: '' },
				buildSpanishClassificationTableBlock({ columns: v.classCols }),
				{ type: 'text', content: v.q2, answer: v.a2, mark: '2.0' },
				{ type: 'text', content: v.q3, answer: v.a3, mark: '2.0' },
				{ type: 'text', content: v.q4, answer: v.a4, mark: '1.5' }
			];

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'linguistic_competence',
				quizQuestion: {
					type: 'matching',
					questionText: 'Empareja cada estructura o verbo de la izquierda con su forma exacta en Presente de Subjuntivo o Infinitivo:',
					questionTextAr: 'صل كل تعبير في اليمين بالتصريف الصحيح الموافق له في اليسار:',
					questionData: {
						pairs: v.pairs
					},
					explanation: v.explanation
				},
				sujetExercise: {
					customTitle: 'II. Competencia lingüística',
					points: 7,
					instruction: 'Realiza los ejercicios de modo verbal, sintaxis y morfología del Subjuntivo :',
					content
				},
				hints: [
					'تأكد أولاً من الفاعلين: نفس الفاعل يستعمل المصدر بدون que؛ واختلاف الفاعلين يفرض que + Subjuntivo.',
					'مع «Creo que» المثبتة نضع Indicativo، ولا يتحول إلى Subjuntivo إلا عند النفي «No creo que».',
					'تذكر تغيرات الإملاء قبل e: buscar → busque؛ llegar → llegue؛ organizar → organice.'
				],
				solutionStepsAr: [
					'التصنيف السليم في الجدول الثلاثي (1.5 نقطة).',
					'تصريف الأفعال في Subjuntivo أو Infinitivo بدقة (2.0 نقطة).',
					'إعادة الصياغة أو التمييز بين Indicativo و Subjuntivo (2.0 نقطة).',
					'إتمام الجمل بالشواذ أو تصحيح الأخطاء الصرفية (1.5 نقطة).'
				],
				finalAnswer: v.pairs.map((p) => `${p.left} = ${p.right}`).join(' | ')
			};
		}
	},

	// 4. Competencia lingüística (7 pts) — drag_drop quiz + saveSpanishSvgAsset
	{
		id: 'spa_tpl_2as_le_t2_ling_derivacion_familias',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'lexico_morfologia',
		titleAr: 'II. Competencia lingüística : Derivación léxica (Verbo | Sustantivo | Adjetivo), prefijos y sinónimos (7 pts)',
		curriculumLessonId: 'spa_lesson_2as_le_t2_derivacion_lexica',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					svgSlug: 'spa_2as_t2_ling_derivacion_v0',
					svgContent: svgSpanishWordFormation({
						title: 'Morfología derivativa: prefijo + raíz + sufijo',
						prefix: 'in-',
						root: 'comprens',
						suffix: '-ible',
						derivedWord: 'incomprensible (adjetivo negativo)',
						meaningNote: 'in- niega el sentido; -ible forma un adjetivo de posibilidad.'
					}),
					svgCaption: 'Ejemplo visual de formación de palabras por prefijación y sufijación',
					wfRows: [
						{
							verbo: { given: true, value: 'aprender' },
							sustantivo: { value: 'aprendizaje', mark: '0.5' },
							adjetivo: { value: 'aprendible', mark: '0.5' }
						},
						{
							verbo: { value: 'informar', mark: '0.5' },
							sustantivo: { given: true, value: 'información' },
							adjetivo: { value: 'informativo/a', mark: '0.5' }
						}
					],
					q2: '2. Forma el antónimo de cada palabra empleando el prefijo negativo exacto (in-, im-, i-, des-) y úsalo en una frase corta :\n  a) legible → ............ ; b) responsable → ............ ;\n  c) posible → ............ ; d) orden → ............ .',
					a2: 'a) ilegible (una sola l) ; b) irresponsable (doble rr) ; c) imposible (im- ante p) ; d) desorden.',
					q3: '3. Sustituye la palabra subrayada en cada oración por un sinónimo preciso del ámbito educativo (finalizar, mejorar, fundamental, estudiante) :\n  a) El alumno (............) de 2AS prepara sus fichas con esmero.\n  b) La lectura diaria es esencial (............) para progresar.\n  c) Espero perfeccionar (............) mi expresión antes de terminar (............) el curso.',
					a3: 'a) estudiante ; b) fundamental ; c) mejorar / finalizar.',
					q4: '4. Nominaliza estas tres oraciones transformando el verbo en sustantivo (ejemplo: Los jóvenes leen más → La lectura de los jóvenes) :\n  a) Los alumnos comprenden rápidamente las reglas.\n  b) La biblioteca adquiere nuevos diccionarios.\n  c) Los profesores evalúan los proyectos escolares.',
					a4: 'a) La rápida comprensión de las reglas por los alumnos.\n  b) La adquisición de nuevos diccionarios por la biblioteca.\n  c) La evaluación de los proyectos escolares por los profesores.',
					ddStem: 'Clasifica cada palabra derivada según su categoría gramatical (Sustantivo o Adjetivo):',
					ddCategories: ['Sustantivos derivados (-ción / -miento / -dad)', 'Adjetivos derivados (-ivo / -ble / -oso)'],
					ddItems: [
						{ text: 'educación', category: 0 },
						{ text: 'conocimiento', category: 0 },
						{ text: 'solidaridad', category: 0 },
						{ text: 'comprensible', category: 1 },
						{ text: 'informativo', category: 1 },
						{ text: 'respetuoso', category: 1 }
					]
				},
				{
					svgSlug: 'spa_2as_t2_ling_derivacion_v1',
					svgContent: svgSpanishWordFormation({
						title: 'Prefijo de repetición + raíz verbal + sufijo nominal',
						prefix: 're-',
						root: 'organiza',
						suffix: '-ción',
						derivedWord: 'reorganización (volver a organizar)',
						meaningNote: 're- indica repetición; -ción forma un sustantivo femenino.'
					}),
					svgCaption: 'Esquema de derivación mediante el prefijo re- y el sufijo nominal -ción',
					wfRows: [
						{
							verbo: { given: true, value: 'leer' },
							sustantivo: { value: 'lectura', mark: '0.5' },
							adjetivo: { value: 'legible', mark: '0.5' }
						},
						{
							verbo: { value: 'pensar', mark: '0.5' },
							sustantivo: { value: 'pensamiento', mark: '0.5' },
							adjetivo: { given: true, value: 'pensativo/a' }
						}
					],
					q2: '2. Descompón en «Prefijo + Raíz + Sufijo» estas cuatro palabras derivadas y explica su significado :\n  a) relectura ; b) desorganización ; c) ilógico ; d) incalculable.',
					a2: 'a) re- + lect- + -ura (acción de volver a leer).\n  b) des- + organiza- + -ción (falta de orden o estructura).\n  c) i- + lógic- + -o (contrario a la lógica).\n  d) in- + calcul- + -able (que no se puede calcular).',
					q3: '3. Relaciona o empareja por escrito cada palabra con su antónimo adecuado (fracaso, suspender, complejo, distracción) :\n  a) éxito ≠ ............ ; b) aprobar ≠ ............ ;\n  c) sencillo ≠ ............ ; d) concentración ≠ ............ .',
					a3: 'a) fracaso ; b) suspender ; c) complejo ; d) distracción.',
					q4: '4. Completa los huecos con la palabra exacta de la familia de «enseñar» y «investigar» (Verbo, Sustantivo o Adjetivo) :\n  a) La ............ (sustantivo de enseñar) de idiomas exige constancia.\n  b) Los alumnos realizan una ............ (sustantivo de investigar) en la biblioteca.\n  c) Nadia es una joven ............ (adjetivo de investigar) muy curiosa.',
					a4: 'a) enseñanza ; b) investigación ; c) investigadora.',
					ddStem: 'Clasifica cada palabra derivada según el significado de su prefijo:',
					ddCategories: ['Negación / Contrario (in-, im-, i-, des-)', 'Repetición (re-)'],
					ddItems: [
						{ text: 'imposible', category: 0 },
						{ text: 'irresponsable', category: 0 },
						{ text: 'desconocer', category: 0 },
						{ text: 'releer', category: 1 },
						{ text: 'rehacer', category: 1 },
						{ text: 'reorganizar', category: 1 }
					]
				},
				{
					svgSlug: 'spa_2as_t2_ling_derivacion_v2',
					svgContent: svgSpanishWordFormation({
						title: 'Derivación adjetival a partir de un sustantivo',
						prefix: '—',
						root: 'respet',
						suffix: '-uoso',
						derivedWord: 'respetuoso (que muestra respeto)',
						meaningNote: 'El sufijo -oso/-uoso convierte el sustantivo en adjetivo calificativo.'
					}),
					svgCaption: 'Esquema de sufijación adjetival en el vocabulario de valores escolares',
					wfRows: [
						{
							verbo: { given: true, value: 'conocer' },
							sustantivo: { value: 'conocimiento', mark: '0.5' },
							adjetivo: { value: 'conocido/a', mark: '0.5' }
						},
						{
							verbo: { value: 'razonar', mark: '0.5' },
							sustantivo: { given: true, value: 'razonamiento' },
							adjetivo: { value: 'razonable', mark: '0.5' }
						}
					],
					q2: '2. Forma sustantivos abstractos a partir de estos cuatro adjetivos usando -dad, -tad o -eza :\n  a) solidario → ............ ; b) libre → ............ ;\n  c) rico → ............ ; d) responsable → ............ .',
					a2: 'a) solidaridad ; b) libertad ; c) riqueza (cambia c por qu ante e) ; d) responsabilidad.',
					q3: '3. Distingue en dos frases breves la diferencia léxica entre :\n  a) «la biblioteca» y «la librería».\n  b) «aprobar» y «suspender».',
					a3: 'a) «En la biblioteca del instituto consultamos diccionarios gratuitos; en la librería compramos cuadernos y libros nuevos.»\n  b) «Si repasamos cada día aprobaremos el examen; si descuidamos el estudio podemos suspenderlo.»',
					q4: '4. Completa las frases con el conector o la forma léxica correcta (sin embargo, en primer lugar, además) :\n  a) ............ debemos leer con calma el enunciado antes de responder.\n  b) La red digital ofrece datos útiles; ............, es preciso verificar siempre su fiabilidad.\n  c) ............ conviene anotar las ideas clave en un esquema claro.',
					a4: 'a) En primer lugar, ; b) sin embargo, ; c) Además,.',
					ddStem: 'Clasifica cada término según pertenezca al subcampo de «Lectura y Biblioteca» o «Evaluación y Estudio»:',
					ddCategories: ['Lectura y Biblioteca', 'Evaluación y Estudio'],
					ddItems: [
						{ text: 'diccionario bilingüe', category: 0 },
						{ text: 'ficha de lectura', category: 0 },
						{ text: 'manuscrito histórico', category: 0 },
						{ text: 'repaso diario', category: 1 },
						{ text: 'aprobar el examen', category: 1 },
						{ text: 'nota sobresaliente', category: 1 }
					]
				}
			];

			const v = rng.pick(variants);
			const svgPath = saveSpanishSvgAsset(v.svgSlug, v.svgContent);

			const content: ContentBlock[] = [
				{
					type: 'image',
					src: svgPath,
					width: '76%',
					caption: v.svgCaption
				},
				{
					type: 'text',
					content: '1. Completa la tabla de familias léxicas (Verbo | Sustantivo | Adjetivo) :',
					mark: ''
				},
				buildSpanishWordFamilyTableBlock(v.wfRows),
				{ type: 'text', content: v.q2, answer: v.a2, mark: '2.0' },
				{ type: 'text', content: v.q3, answer: v.a3, mark: '1.5' },
				{ type: 'text', content: v.q4, answer: v.a4, mark: '1.5' }
			];

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'linguistic_competence',
				quizQuestion: {
					type: 'drag_drop',
					questionText: v.ddStem,
					questionTextAr: 'اسحب كل كلمة أو عبارة إلى الفئة الصرفية أو الدلالية الصحيحة:',
					questionData: {
						categories: v.ddCategories,
						items: rng.shuffle(v.ddItems)
					},
					explanation:
						'تحدّد اللواحق الصنف النحوي للكلمة (-ción/-miento/-dad للاسم، -ivo/-ble/-oso للصفة)، بينما تغير السوابق المعنى (in-/im-/i-/des- للنفي، وre- للتكرار).'
				},
				sujetExercise: {
					customTitle: 'II. Competencia lingüística',
					points: 7,
					instruction: 'Resuelve las actividades de derivación léxica, prefijación y vocabulario :',
					content
				},
				hints: [
					'في الإسبانية تُكتب ilegible و ilógico بلام واحدة (i- + l)، بينما تتضاعف r في irresponsable (i- + rr).',
					'اللاحقة -ción بالـ c الإسبانية (la educación، la información) وليس -tion.',
					'عند التحويل الاسمي (nominalización)، ابحث عن الاسم المشتق من الفعل وحوّل الفاعل إلى مضاف بعد por أو de.'
				],
				solutionStepsAr: [
					'إكمال جدول العائلة اللغوية (2.0 نقطة).',
					'تكوين الأضداد أو تفكيك الكلمات أو اشتقاق الأسماء المجردة (2.0 نقطة).',
					'تحديد المترادفات أو الأضداد أو الفروق المعجمية (1.5 نقطة).',
					'إنجاز التحويل الاسمي أو إكمال الجمل السياقية (1.5 نقطة).'
				],
				finalAnswer: v.ddItems.map((it) => `${it.text} : ${v.ddCategories[it.category]}`).join(' | ')
			};
		}
	},

	// 5. Expresión escrita (6 pts, integration) — ordering quiz
	{
		id: 'spa_tpl_2as_le_t2_writ_argumento_educativo',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'expresion_escrita',
		titleAr: 'III. Expresión escrita : Párrafo argumentativo sobre lectura, idiomas y esfuerzo (6 pts)',
		curriculumLessonId: 'spa_lesson_2as_le_t2_expresion_escrita_guiada',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					temaUnoPrompt:
						'Redacta un texto argumentativo breve (110 a 140 palabras) defendiendo la importancia de la lectura diaria de libros frente al exceso de distracción digital en los jóvenes.',
					temaUnoNotas: [
						'Introducción clara formulando tu tesis sobre el valor formativo de la lectura.',
						'Dos argumentos sólidos introducidos por conectores (En primer lugar... / Además...) apoyados con un ejemplo escolar.',
						'Empleo de al menos dos verbos en Presente de Subjuntivo tras deseo, recomendación o necesidad (espero que, es necesario que).',
						'Conclusión equilibrada que integre el uso responsable de la tecnología como simple apoyo.'
					],
					temaDosPrompt:
						'Escribe una redacción argumentativa (110 a 140 palabras) explicando por qué el esfuerzo constante y la honradez intelectual valen más que el éxito fácil o copiado.',
					modelAnswer:
						'En la actualidad, muchos jóvenes pasan demasiado tiempo ante las pantallas y descuidan el hábito de leer libros. Sin embargo, pienso que la lectura diaria sigue siendo la base más sólida para pensar con claridad y escribir con precisión.\n\nEn primer lugar, leer obras impresas desarrolla la concentración profunda y amplía nuestro vocabulario de manera natural. Por ejemplo, quien consulta un diccionario mientras lee comprende mucho mejor los matices de su idioma y de las lenguas extranjeras. Además, los libros fomentan la reflexión paciente frente a la prisa superficial de las redes.\n\nEn conclusión, aunque las herramientas digitales sirven para buscar datos útiles, es necesario que los estudiantes dediquen cada día un tiempo tranquilo a la lectura para fortalecer su formación académica.',
					rubricSummary:
						'Tesis clara y desarrollo de las cuatro pautas (2.0 pts) | Empleo correcto de conectores organizadores y Presente de Subjuntivo (2.0 pts) | Cohesión, vocabulario educativo y ortografía (2.0 pts)',
					orderedSteps: [
						'En la actualidad, muchos jóvenes pasan largas horas frente a las pantallas y olvidan los libros.',
						'En primer lugar, la lectura diaria en papel desarrolla la concentración profunda y el léxico.',
						'Además, consultar un diccionario ayuda a comprender los matices del idioma con rigor.',
						'En conclusión, es necesario que la lectura ocupe un lugar diario en nuestra formación.'
					],
					orderExplanation:
						'يتبع النص الحجاجي الترتيب المنطقي: طرح الإشكال والأطروحة، الحجة الأولى، الحجة الثانية، ثم الخاتمة بالتوصية.'
				},
				{
					temaUnoPrompt:
						'Elabora un párrafo argumentativo guiado (110 a 140 palabras) sobre las ventajas de estudiar lenguas extranjeras en el bachillerato y cómo aprenderlas con eficacia.',
					temaUnoNotas: [
						'Tesis inicial destacando las lenguas extranjeras como puente cultural y científico.',
						'Argumento 1: acceso directo a fuentes de conocimiento y libros internacionales.',
						'Argumento 2: comparación enriquecedora con la lengua materna árabe y mejora de la memoria.',
						'Recomendación final empleando «recomiendo que» o «conviene que» + Presente de Subjuntivo.'
					],
					temaDosPrompt:
						'Redacta un artículo de opinión escolar (110 a 140 palabras) sobre el papel fundamental del profesor y el respeto mutuo en el aula para lograr un aprendizaje de calidad.',
					modelAnswer:
						'Estudiar lenguas extranjeras en la rama de Lenguas Extranjeras abre horizontes intelectuales muy amplios para los jóvenes argelinos. Lejos de ser una carga, cada nuevo idioma nos ofrece herramientas valiosas para comprender el mundo.\n\nEn primer lugar, conocer varias lenguas permite consultar manuales científicos, bibliotecas internacionales y obras históricas sin depender únicamente de resúmenes ajenos. Además, comparar la gramática del español con la del árabe agudiza nuestra capacidad de análisis lógico y nos ayuda a expresarnos con mayor claridad en nuestra propia lengua.\n\nEn resumen, recomiendo que todos los compañeros practiquen la lectura y escuchen diálogos educativos con constancia, pues solo el trabajo regular convierte una lengua extranjera en un verdadero instrumento de diálogo y cultura.',
					rubricSummary:
						'Pertinencia de los argumentos y fidelidad a las pautas (2.0 pts) | Uso exacto de conectores y Presente de Subjuntivo (2.0 pts) | Riqueza léxica, puntuación y ortografía (2.0 pts)',
					orderedSteps: [
						'Aprender lenguas extranjeras constituye una puerta abierta hacia el conocimiento científico y cultural.',
						'En primer lugar, permite consultar directamente obras y fuentes académicas internacionales.',
						'Además, comparar diferentes sistemas lingüísticos agudiza el análisis lógico del estudiante.',
						'Por todo ello, recomiendo que practiquemos cada idioma con constancia y respeto.'
					],
					orderExplanation:
						'ينتقل الترتيب من الأطروحة إلى الحجة العلمية الأولى، ثم الحجة اللغوية الثانية، ويُختم بالتوصية في Subjuntivo.'
				},
				{
					temaUnoPrompt:
						'Escribe un texto argumentativo (110 a 140 palabras) analizando el valor del trabajo en equipo y de la biblioteca escolar en la preparación de los exámenes de 2AS.',
					temaUnoNotas: [
						'Planteamiento: estudiar en solitario frente a la colaboración ordenada en biblioteca.',
						'Beneficios del trabajo cooperativo respetuoso (explicar dudas, contrastar apuntes, motivarse).',
						'Necesidad de mantener el silencio, el orden y la puntualidad en la biblioteca.',
						'Conclusión con una invitación constructiva usando Presente de Subjuntivo.'
					],
					temaDosPrompt:
						'Redacta una reflexión personal (110 a 140 palabras) explicando cuál es tu asignatura favorita del bachillerato, qué dificultades superaste al estudiarla y qué consejos darías a otro alumno.',
					modelAnswer:
						'Preparar los exámenes trimestrales exige constancia individual, pero colaborar con los compañeros en la biblioteca escolar multiplica los resultados cuando se trabaja con seriedad y respeto.\n\nPor una parte, explicar una regla gramatical a un amigo nos obliga a comprenderla con total claridad y a detectar posibles lagunas en nuestros propios apuntes. Por otra parte, compartir diccionarios y fichas de lectura fomenta el compañerismo sano y reduce el cansancio antes de las pruebas. Naturalmente, esta cooperación solo funciona si respetamos el silencio y el horario del centro.\n\nEn definitiva, conviene que los estudiantes formen pequeños grupos de estudio responsables y mantengan el orden en la biblioteca para avanzar juntos hacia el éxito escolar.',
					rubricSummary:
						'Adecuación temática y equilibrio argumentativo (2.0 pts) | Precisión gramatical en Subjuntivo y conectores (2.0 pts) | Vocabulario del Ámbito Educativo y corrección formal (2.0 pts)',
					orderedSteps: [
						'La preparación seria de los exámenes combina el esfuerzo individual con la colaboración escolar.',
						'Por una parte, explicar una lección a un compañero refuerza nuestra propia comprensión.',
						'Por otra parte, compartir fichas en la biblioteca fortalece el compañerismo y la disciplina.',
						'En definitiva, conviene que trabajemos en pequeños grupos respetando el silencio de la sala.'
					],
					orderExplanation:
						'تربط الجمل الأربع بين المقدمة المتوازنة والحجتين التنظيميتين (Por una parte / Por otra parte) والخاتمة.'
				}
			];

			const v = rng.pick(variants);
			const scrambled = scrambleOrdering(v.orderedSteps, rng);

			const block = buildSpanishWrittenProductionBlock({
				temaUnoTitle: 'Tema 1 (Guiado) :',
				temaUnoPrompt: v.temaUnoPrompt,
				temaUnoNotas: v.temaUnoNotas,
				temaDosPrompt: v.temaDosPrompt,
				modelAnswer: v.modelAnswer,
				rubricSummary: v.rubricSummary,
				mark: '6'
			});

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'ordering',
					questionText: 'Ordena las cuatro partes del párrafo argumentativo desde la tesis inicial hasta la conclusión:',
					questionTextAr: 'رتّب الجمل الأربع لبناء فقرة حجاجية تربوية سليمة من المقدمة إلى الخاتمة:',
					questionData: {
						items: scrambled.items,
						correctOrder: scrambled.correctOrder
					},
					explanation: v.orderExplanation
				},
				sujetExercise: {
					customTitle: 'III. Expresión escrita',
					points: 6,
					instruction: 'Elige UNO de los dos temas propuestos y redacta un texto argumentativo (110 a 140 palabras) :',
					content: [block]
				},
				hints: [
					'تأكد من تقديم أطروحة واضحة في السطرين الأولين ثم ادعمها بحجتين مرتبطتين بأمثلة من واقع الدراسة.',
					'وظف رابطين تنظيميين (En primer lugar / Además / En conclusión) وفعلين في Presente de Subjuntivo.',
					'راقب التهجئة الإسبانية الصحيحة للكلمات التعليمية (biblioteca, diccionario, educación, comprensión).'
				],
				solutionStepsAr: [
					'صياغة الأطروحة والحجتين مع استيفاء المعطيات الموجّهة (2.0 نقطة).',
					'سلامة التصريف خاصة في Presente de Subjuntivo والروابط المنطقية (2.0 نقطة).',
					'الرصيد المعجمي التربوي والإملاء وعلامات الترقيم (2.0 نقطة).'
				],
				finalAnswer: v.orderedSteps.join(' → ')
			};
		}
	},

	// 6. Expresión escrita (6 pts, integration) — cloze quiz
	{
		id: 'spa_tpl_2as_le_t2_writ_carta_educativa',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'expresion_escrita',
		titleAr: 'III. Expresión escrita : Carta educativa formal y consejos de estudio (6 pts)',
		curriculumLessonId: 'spa_lesson_2as_le_t2_expresion_escrita_guiada',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					temaUnoPrompt:
						'En nombre de tu clase de 2AS LE, redacta una carta educativa formal (110 a 140 palabras) dirigida al director o directora de tu instituto para solicitar la creación de un taller semanal de debate y lectura en español.',
					temaUnoNotas: [
						'Encabezado correcto (ciudad, fecha) y saludo formal con dos puntos (Estimado Sr. Director:).',
						'Presentación respetuosa del motivo en tratamiento de «usted» y explicación de dos beneficios pedagógicos del taller.',
						'Compromiso concreto de los alumnos para mantener la disciplina y el cuidado de la sala.',
						'Empleo de Presente de Subjuntivo (solicitamos que autorice / esperamos que apruebe) y despedida formal con firma.'
					],
					temaDosPrompt:
						'Escribe una carta amistosa pero educativa (110 a 140 palabras) a un primo menor que empieza el instituto, aconsejándole cómo estudiar con método, respetar a sus profesores y aprovechar la biblioteca.',
					modelAnswer:
						'Orán, 12 de febrero de 2026\n\nEstimado Sr. Director:\n\nLos alumnos de segundo año de Lenguas Extranjeras nos dirigimos a usted con todo respeto para solicitar su autorización con el fin de crear un taller semanal de lectura y debate en español en la biblioteca del centro.\n\nConsideramos que esta actividad nos permitirá mejorar la comprensión lectora, practicar la expresión oral y fomentar el gusto por los libros impresos. Además, nos comprometemos a respetar el horario establecido, guardar silencio y cuidar con esmero todos los diccionarios y manuales.\n\nEsperamos que usted apruebe esta propuesta educativa que beneficiará a todo el alumnado de idiomas. Agradeciendo de antemano su amable atención, le saludan atentamente,\n\nLos estudiantes de 2AS LE',
					rubricSummary:
						'Formato completo de carta formal y uso exacto de «usted» (2.0 pts) | Argumentos claros y verbos en Presente de Subjuntivo (2.0 pts) | Registro formal, léxico educativo y ortografía (2.0 pts)',
					clozeSentence: 'Estimado Sr. Director: Esperamos que usted ___ nuestra solicitud para abrir el club de lectura.',
					clozeCorrect: 'apruebe',
					clozeDistractors: ['aprueba', 'aprobará', 'aprobó'],
					clozeExplanation:
						'بعد فعل التمني «Esperamos que» مع ضمير الاحترام usted يجب استعمال Presente de Subjuntivo: apruebe (من aprobar: o→ue).'
				},
				{
					temaUnoPrompt:
						'Redacta una carta formal (110 a 140 palabras) al responsable de la biblioteca municipal de tu ciudad para pedir la adquisición de diccionarios bilingües y libros adaptados de lengua española para estudiantes de secundaria.',
					temaUnoNotas: [
						'Lugar, fecha, saludo formal y exposición clara de la necesidad detectada por los alumnos de 2AS LE.',
						'Dos razones que justifiquen cómo estos libros ayudarán a jóvenes lectores e investigadores.',
						'Uso correcto del tratamiento «usted» y al menos dos verbos en Presente de Subjuntivo.',
						'Fórmula de cortesía final y firma.'
					],
					temaDosPrompt:
						'Redacta un breve ensayo (110 a 140 palabras) respondiendo a esta pregunta: «¿Por qué aprender a redactar bien en lenguas extranjeras sigue siendo esencial en la época de las herramientas automáticas?»',
					modelAnswer:
						'Tremecén, 20 de febrero de 2026\n\nDistinguida Sra. Directora de la Biblioteca:\n\nMe dirijo a usted en representación de varios estudiantes de Lenguas Extranjeras para exponerle una necesidad importante de nuestro grupo. Actualmente acudimos cada semana a su sala de lectura para preparar trabajos escolares, pero echamos en falta diccionarios bilingües actualizados y lecturas graduadas en español.\n\nPor este motivo, le pedimos amablemente que considere la compra de diez obras básicas de consulta y literatura juvenil. Estos ejemplares permitirán que decenas de alumnos mejoren su vocabulario y desarrollen hábitos de estudio rigurosos.\n\nDeseamos que nuestra petición reciba una acogida favorable y quedamos a su disposición para colaborar como voluntarios en la clasificación. Le saluda respetuosamente,\n\nSalma B., alumna de 2AS LE',
					rubricSummary:
						'Estructura epistolar formal y registro cortés con «usted» (2.0 pts) | Corrección gramatical en Subjuntivo y conectores (2.0 pts) | Precisión léxica, puntuación y limpieza (2.0 pts)',
					clozeSentence: 'Le pedimos amablemente que la biblioteca ___ nuevos diccionarios de español.',
					clozeCorrect: 'adquiera',
					clozeDistractors: ['adquiere', 'adquirió', 'adquirir'],
					clozeExplanation:
						'فعل الطلب «pedimos que» يستوجب صيغة Presente de Subjuntivo للفعل adquirir (e→ie): adquiera.'
				},
				{
					temaUnoPrompt:
						'Escribe una carta educativa (110 a 140 palabras) dirigida a los compañeros de primer año de secundaria dándoles consejos prácticos para organizar el estudio, consultar fuentes fiables y evitar el fracaso escolar.',
					temaUnoNotas: [
						'Saludo cordial pero respetuoso y propósito de la carta.',
						'Consejos concretos sobre organización diaria, lectura de libros y control de distracciones digitales.',
						'Uso variado de estructuras de recomendación (recomiendo que + Subjuntivo, es necesario que + Subjuntivo, hay que + infinitivo).',
						'Despedida motivadora deseando éxito en el curso.'
					],
					temaDosPrompt:
						'Redacta un texto expositivo-argumentativo (110 a 140 palabras) describiendo cómo debería ser una biblioteca escolar ideal para estimular la lectura y el diálogo intelectual.',
					modelAnswer:
						'Constantina, 25 de febrero de 2026\n\nQueridos compañeros de primer año:\n\nOs escribimos esta carta desde segundo año de Lenguas Extranjeras para compartir algunos consejos útiles ante los próximos exámenes. Sabemos que el cambio de etapa exige mayor autonomía, pero con método todo resulta más sencillo.\n\nEn primer lugar, es necesario que planifiquéis vuestras horas de estudio desde el principio de la semana y toméis apuntes propios en clase. Además, os recomendamos que consultéis diccionarios fiables y apaguéis el teléfono mientras repasáis. Hay que recordar que la constancia diaria vale mucho más que estudiar a última hora.\n\nEsperamos que estas orientaciones os ayuden a aprobar todas las materias con serenidad. ¡Mucho ánimo y éxito!\n\nVuestros compañeros de 2AS LE',
					rubricSummary:
						'Adecuación al destinatario y cumplimiento de las pautas (2.0 pts) | Uso preciso de Subjuntivo con vosotros y perífrasis (2.0 pts) | Coherencia, tono constructivo y ortografía (2.0 pts)',
					clozeSentence: 'Os recomendamos que ___ vuestros apuntes cada tarde para lograr mejores resultados.',
					clozeCorrect: 'repaséis',
					clozeDistractors: ['repasáis', 'repasaréis', 'repasasteis'],
					clozeExplanation:
						'بعد فعل التوصية «recomendamos que» مع الضمير vosotros نصرف الفعل repasar (-ar) في Presente de Subjuntivo: repaséis.'
				}
			];

			const v = rng.pick(variants);
			const clozeOptions = rng.shuffle([v.clozeCorrect, ...v.clozeDistractors]);
			const clozeCorrectIndex = clozeOptions.indexOf(v.clozeCorrect);

			const block = buildSpanishWrittenProductionBlock({
				temaUnoTitle: 'Tema 1 (Guiado) :',
				temaUnoPrompt: v.temaUnoPrompt,
				temaUnoNotas: v.temaUnoNotas,
				temaDosPrompt: v.temaDosPrompt,
				modelAnswer: v.modelAnswer,
				rubricSummary: v.rubricSummary,
				mark: '6'
			});

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'cloze',
					questionText: 'Completa el fragmento de carta educativa con la forma exacta del Presente de Subjuntivo:',
					questionTextAr: 'أكمل مقطع الرسالة التربوية بالصيغة الدقيقة في زمن Presente de Subjuntivo:',
					questionData: {
						sentence: v.clozeSentence,
						options: clozeOptions,
						correctIndex: clozeCorrectIndex
					},
					explanation: v.clozeExplanation
				},
				sujetExercise: {
					customTitle: 'III. Expresión escrita',
					points: 6,
					instruction: 'Elige UNO de los dos temas propuestos y redacta una carta o texto claro (110 a 140 palabras) :',
					content: [block]
				},
				hints: [
					'إذا اخترت الرسالة الرسمية فلا تنسَ: المكان والتاريخ في الأعلى، نقطتان بعد التحية، وصيغة الاحترام usted.',
					'وظف أفعال التوصية والرجاء متبوعة بـ Presente de Subjuntivo عند اختلاف الفاعلين.',
					'حافظ على أسلوب مهذب وواضح مع خاتمة مناسبة وتوقيع.'
				],
				solutionStepsAr: [
					'احترام أركان الرسالة التربوية أو المقال واستيفاء المعطيات (2.0 نقطة).',
					'ضبط تصريف Presente de Subjuntivo وصيغة المخاطب (2.0 نقطة).',
					'ثراء المفردات وسلامة الترقيم والإملاء الإسباني (2.0 نقطة).'
				],
				finalAnswer: v.clozeCorrect
			};
		}
	}
];
