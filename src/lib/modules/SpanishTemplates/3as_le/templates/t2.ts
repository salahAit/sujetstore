import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildSpanishClassificationTableBlock,
	buildSpanishPassageBlock,
	buildSpanishWordFamilyTableBlock,
	buildSpanishWrittenProductionBlock
} from '../../spanish-helpers';
import { saveSpanishSvgAsset, svgSpanishTenseTimeline } from '../../svg-spanish';
import type {
	Difficulty,
	QuizQuestionPayload,
	SpanishGeneratedExerciseInstance,
	SpanishParameterizedTemplate
} from '../../types';

interface McqSpec {
	q: string;
	correct: string;
	wrong: [string, string, string];
	explanation: string;
}

interface TfSpec {
	q: string;
	correctAnswer: boolean;
	explanation: string;
}

interface MatchingSpec {
	q: string;
	pairs: Array<{ left: string; right: string }>;
	explanation: string;
}

interface ClozeSpec {
	q: string;
	sentence: string;
	correct: string;
	distractors: [string, string, string];
	explanation: string;
}

interface DragDropSpec {
	q: string;
	categories: [string, string];
	items: Array<{ text: string; category: 0 | 1 }>;
	explanation: string;
}

interface OrderingSpec {
	q: string;
	orderedItems: [string, string, string, string];
	explanation: string;
}

function buildMcqPayload(
	spec: McqSpec,
	questionTextAr: string,
	feedbackWrong: string,
	rng: SeededRng
): { quizQuestion: QuizQuestionPayload; finalAnswer: string } {
	const mcq = buildUniqueMcqOptions(
		spec.correct,
		spec.wrong.map((w) => ({ text: w, diagnosticFeedback: feedbackWrong })),
		rng
	);
	return {
		finalAnswer: spec.correct,
		quizQuestion: {
			type: 'mcq',
			questionText: spec.q,
			questionTextAr,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: spec.explanation
		}
	};
}

function buildTfPayload(spec: TfSpec): { quizQuestion: QuizQuestionPayload; finalAnswer: string } {
	return {
		finalAnswer: spec.correctAnswer ? 'Verdadero' : 'Falso',
		quizQuestion: {
			type: 'true_false',
			questionText: spec.q,
			questionTextAr: `صحيح أم خطأ حسب النص والمحور: ${spec.q}`,
			questionData: {
				correctAnswer: spec.correctAnswer
			},
			explanation: spec.explanation
		}
	};
}

function buildMatchingPayload(
	spec: MatchingSpec,
	rng: SeededRng
): { quizQuestion: QuizQuestionPayload; finalAnswer: string } {
	const pairs = rng.shuffle(spec.pairs);
	return {
		finalAnswer: pairs.map((p) => `${p.left} = ${p.right}`).join(' | '),
		quizQuestion: {
			type: 'matching',
			questionText: spec.q,
			questionTextAr: `اربط كل عنصر في اليمين بما يناسبه في اليسار: ${spec.q}`,
			questionData: { pairs },
			explanation: spec.explanation
		}
	};
}

function buildClozePayload(
	spec: ClozeSpec,
	rng: SeededRng
): { quizQuestion: QuizQuestionPayload; finalAnswer: string } {
	const distractors = spec.distractors.filter((d) => d !== spec.correct).slice(0, 3);
	const options = rng.shuffle([spec.correct, ...distractors]);
	const correctIndex = options.indexOf(spec.correct);
	return {
		finalAnswer: spec.correct,
		quizQuestion: {
			type: 'cloze',
			questionText: spec.q,
			questionTextAr: `أكمل الفراغ بالصيغة الدقيقة: ${spec.q}`,
			questionData: {
				sentence: spec.sentence,
				options,
				correctIndex
			},
			explanation: spec.explanation
		}
	};
}

function buildDragDropPayload(
	spec: DragDropSpec,
	rng: SeededRng
): { quizQuestion: QuizQuestionPayload; finalAnswer: string } {
	const items = rng.shuffle(spec.items);
	return {
		finalAnswer: spec.items.map((it) => `${it.text} (${spec.categories[it.category]})`).join(' | '),
		quizQuestion: {
			type: 'drag_drop',
			questionText: spec.q,
			questionTextAr: `صنّف العبارات الآتية في الفئة المناسبة: ${spec.q}`,
			questionData: {
				categories: spec.categories,
				items
			},
			explanation: spec.explanation
		}
	};
}

function buildOrderingPayload(
	spec: OrderingSpec,
	rng: SeededRng
): { quizQuestion: QuizQuestionPayload; finalAnswer: string } {
	const shuffled = rng.shuffle(spec.orderedItems);
	if (shuffled.length > 1 && shuffled.every((x, i) => x === spec.orderedItems[i])) {
		[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
	}
	const correctOrder = spec.orderedItems.map((item) => shuffled.indexOf(item));
	return {
		finalAnswer: spec.orderedItems.join(' | '),
		quizQuestion: {
			type: 'ordering',
			questionText: spec.q,
			questionTextAr: `رتّب مراحل التحرير أو الفكر ترتيباً منهجياً من الأول إلى الأخير: ${spec.q}`,
			questionData: {
				items: shuffled,
				correctOrder
			},
			explanation: spec.explanation
		}
	};
}

/**
 * 3AS BAC Foreign Languages (لغات أجنبية — yearSubjectId: 793, coeff 4, 03h00, 7+7+6=20)
 * Parameterized Exam & Quiz Templates — Trimestre 2 : Ámbito Científico-Tecnológico y Medio Ambiente (6 templates)
 * Roles: 2 comprehension (7 pts) + 2 linguistic_competence (7 pts) + 2 written_expression (6 pts)
 */
export const TEMPLATES_3AS_LE_T2: SpanishParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (7 pts): Tecnología digital y uso responsable
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_tpl_3as_le_t2_comp_tecnologia_digital',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'comprension_lectora',
		titleAr: 'فهم النص (7 نقاط — لغات أجنبية): التكنولوجيا، محو الأمية الرقمية والأمن المعلوماتي',
		curriculumLessonId: 'spa_lesson_3as_le_t2_tecnologia_responsable',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Alfabetización digital: navegar con criterio en la sociedad de la información',
					source: 'Adaptado de un ensayo sobre comunicación y educación científica',
					paragraphs: [
						'Nunca antes había circulado tanta información al alcance de un solo clic. Bibliotecas universitarias, bases documentales y cursos gratuitos permiten a cualquier joven estudiar desde su ciudad. Sin embargo, los especialistas advierten que saber manejar una pantalla no equivale automáticamente a estar formado: hoy urge adquirir una auténtica [[alfabetización digital]].',
						'Esta competencia consiste en verificar la procedencia de cada dato antes de difundirlo, distinguir los artículos científicos contrastados de los rumores sensacionalistas y proteger con prudencia la vida privada. Quien comparte un titular sin comprobar [[su fuente]] contribuye involuntariamente a propagar la desinformación.',
						'Por consiguiente, la escuela y la familia desempeñan un papel decisivo para formar usuarios críticos, capaces de convertir la tecnología en una aliada del conocimiento y nunca en una distracción constante.'
					],
					glossary: [
						{ term: 'contrastado', meaning: 'comprobado mediante pruebas y fuentes rigurosas' },
						{ term: 'desinformación', meaning: 'difusión de noticias falsas o manipuladas' }
					],
					mainIdeaHeader: '1. La tesis fundamental del texto afirma que :',
					mainIdeaOptions: [
						'Usar Internet con provecho exige alfabetización digital, verificación de fuentes y espíritu crítico',
						'Tener acceso rápido a las pantallas garantiza por sí solo el conocimiento científico',
						'Las bibliotecas universitarias deberían cerrar sus archivos digitales'
					],
					mainIdeaCorrect:
						'Usar Internet con provecho exige alfabetización digital, verificación de fuentes y espíritu crítico',
					tfItems: [
						{
							q: 'Saber utilizar un teléfono o una pantalla basta para considerar que alguien tiene formación digital.',
							a: 'Falso',
							c: 'Los especialistas advierten que manejar una pantalla no equivale automáticamente a estar formado (§1).',
							mark: '0.5'
						},
						{
							q: 'La alfabetización digital incluye comprobar el origen de los datos antes de compartirlos.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'Difundir un titular sin verificar su fuente ayuda a evitar las noticias falsas.',
							a: 'Falso',
							c: 'Quien comparte un titular sin comprobar su fuente contribuye a propagar la desinformación (§2).',
							mark: '0.5'
						},
						{
							q: 'El autor propone que la tecnología sea una aliada del saber gracias a la educación crítica.',
							a: 'Verdadero',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) ¿Qué oportunidades positivas ofrece el acceso digital según el primer párrafo?',
							a: 'Permite consultar bibliotecas universitarias, bases documentales y cursos gratuitos desde cualquier ciudad.',
							mark: '0.75'
						},
						{
							q: 'b) Enumera las tres capacidades que definen la alfabetización digital en el párrafo 2.',
							a: 'Verificar la procedencia de los datos, distinguir artículos contrastados de rumores sensacionalistas y proteger la vida privada.',
							mark: '1'
						},
						{
							q: 'c) ¿Qué misión atribuye el párrafo 3 a la escuela y a la familia?',
							a: 'Formar usuarios críticos que conviertan la tecnología en aliada del conocimiento y no en distracción.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «alfabetización digital» (§1)   b) «su fuente» (§2)',
					refAnswer:
						'a) «alfabetización digital» remite al conjunto de competencias críticas y éticas para verificar información y proteger la privacidad en línea.   b) «su fuente» alude al origen y autoría del titular que se pretende compartir.',
					synthPrompt:
						'¿Qué criterios concretos aplicas tú antes de dar crédito a una noticia leída en Internet? Explícalo en cuatro o cinco líneas.',
					synthAnswer:
						'Antes de creer o compartir una información digital, compruebo si procede de un organismo científico o un medio fiable y si cita pruebas verificables. Además, contrasto el dato en varias fuentes distintas y desconfío de los titulares alarmistas que buscan solo llamar la atención.',
					quizzes: {
						easy: {
							q: 'Según el párrafo 2, ¿qué ocurre cuando alguien comparte un titular sin comprobar su fuente?',
							correct: 'Contribuye involuntariamente a propagar la desinformación',
							wrong: [
								'Mejora la calidad científica de las bibliotecas',
								'Protege automáticamente su vida privada',
								'Demuestra una sólida alfabetización digital'
							],
							explanation: 'توضح الفقرة الثانية أن نشر الخبر دون التثبت من مصدره يغذي التضليل الإعلامي.'
						} as McqSpec,
						medium: {
							q: '¿Qué contraste establece el conector «Sin embargo» en el párrafo 1?',
							correct: 'Entre la enorme abundancia técnica de información y la necesidad urgente de criterio formativo',
							wrong: [
								'Entre las bibliotecas antiguas de Córdoba y la agricultura',
								'Entre el precio de los libros y la energía eólica',
								'Entre dos dialectos regionales'
							],
							explanation: 'يقابل الرابط «Sin embargo» بين توفر المعلومة رقمياً والحاجة الملحة إلى التكوين النقدي.'
						} as McqSpec,
						hard: {
							q: '¿Cuál es el referente exacto del posesivo «su» en «sin comprobar su fuente» (§2)?',
							correct: 'Un titular encontrado en línea',
							wrong: [
								'La escuela secundaria',
								'La familia del alumno',
								'Las bibliotecas universitarias'
							],
							explanation: 'الضمير الملكي «su» يعود إلى «un titular» في الجملة نفسها.'
						} as McqSpec
					}
				},
				{
					title: 'Inteligencia artificial en la educación: herramienta de apoyo, nunca sustituto del esfuerzo',
					source: 'Adaptado de un foro universitario sobre innovación pedagógica',
					paragraphs: [
						'La aparición de programas capaces de redactar resúmenes, traducir párrafos y resolver ejercicios en segundos ha generado un intenso debate en los institutos. Muchos docentes reconocen que [[estas aplicaciones]] pueden ahorrar tiempo al organizar apuntes, explicar conceptos difíciles o proponer ejercicios de práctica.',
						'No obstante, confiar toda tarea escolar a una máquina conlleva un riesgo evidente: el estudiante que no redacta ni corrige sus propios borradores pierde progresivamente el hábito de pensar por sí mismo. La verdadera inteligencia humana crece cuando se enfrenta a una duda, busca argumentos y aprende de cada rectificación.',
						'Por ello, los programas automáticos deben emplearse con honestidad intelectual, únicamente como apoyo complementario bajo [[la guía docente]], jamás como sustituto del estudio personal.'
					],
					glossary: [
						{ term: 'borrador', meaning: 'primera versión provisional de un texto antes de corregirlo' },
						{ term: 'rectificación', meaning: 'corrección de un fallo tras revisarlo' }
					],
					mainIdeaHeader: '1. El autor defiende la postura de que las herramientas automáticas :',
					mainIdeaOptions: [
						'Son útiles como apoyo complementario si no sustituyen el esfuerzo ni la reflexión del estudiante',
						'Deben reemplazar por completo el trabajo personal y las clases presenciales',
						'Resultan incapaces de organizar apuntes o proponer ejercicios'
					],
					mainIdeaCorrect:
						'Son útiles como apoyo complementario si no sustituyen el esfuerzo ni la reflexión del estudiante',
					tfItems: [
						{
							q: 'Algunos profesores admiten que las aplicaciones digitales sirven para organizar apuntes y practicar ejercicios.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'Delegar todas las redacciones a una máquina fortalece el hábito de pensar con autonomía.',
							a: 'Falso',
							c: 'El estudiante pierde progresivamente el hábito de pensar por sí mismo (§2).',
							mark: '0.5'
						},
						{
							q: 'La inteligencia humana se desarrolla enfrentando dudas y corrigiendo los propios borradores.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'El texto aconseja usar la inteligencia artificial con honestidad intelectual como mero apoyo.',
							a: 'Verdadero',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Cita dos usos pedagógicos útiles de las aplicaciones digitales mencionados en el párrafo 1.',
							a: 'Organizar apuntes, explicar conceptos difíciles o proponer ejercicios de práctica.',
							mark: '0.75'
						},
						{
							q: 'b) ¿Qué peligro principal señala el párrafo 2 si el alumno delega toda su tarea a la máquina?',
							a: 'Pierde progresivamente la capacidad de redactar, pensar por sí mismo y aprender de sus errores.',
							mark: '1'
						},
						{
							q: 'c) ¿Bajo qué condición ética deben emplearse estos programas según la conclusión (§3)?',
							a: 'Con honestidad intelectual y únicamente como apoyo complementario bajo la orientación del profesor.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «estas aplicaciones» (§1)   b) «la guía docente» (§3)',
					refAnswer:
						'a) «estas aplicaciones» se refiere a los programas de inteligencia artificial capaces de resumir, traducir o proponer ejercicios.   b) «la guía docente» alude al acompañamiento y criterio pedagógico del profesorado.',
					synthPrompt:
						'¿Por qué consideras insustituible la redacción personal en el aprendizaje de una lengua extranjera? Responde en cuatro o cinco líneas.',
					synthAnswer:
						'Considero insustituible la redacción personal porque escribir obliga a recordar el vocabulario, aplicar la gramática y ordenar las ideas con lógica propia. Cuando una máquina escribe en nuestro lugar, no adquirimos fluidez ni seguridad para defendernos el día del examen.',
					quizzes: {
						easy: {
							q: 'Según el párrafo 1, ¿para qué pueden ser útiles ciertas aplicaciones educativas?',
							correct: 'Para organizar apuntes, aclarar dudas y proponer ejercicios de práctica',
							wrong: [
								'Para presentarse en lugar del alumno al examen',
								'Para impedir el trabajo del profesorado',
								'Para evitar toda lectura en la biblioteca'
							],
							explanation: 'تذكر الفقرة الأولى الفوائد العملية المساعدة لهذه الأدوات تحت إشراف المدرس.'
						} as McqSpec,
						medium: {
							q: '¿Qué consecuencia negativa advierte el párrafo 2 cuando un estudiante nunca corrige sus propios borradores?',
							correct: 'Pierde el hábito de pensar de forma autónoma y de aprender mediante la rectificación',
							wrong: [
								'Aumenta su velocidad de escritura a mano',
								'Domina mejor los conectores del Bachillerato',
								'Mejora automáticamente su ortografía'
							],
							explanation: 'تركز الفقرة الثانية على فقدان الاستقلالية الذهنية عند غياب المجهود الشخصي.'
						} as McqSpec,
						hard: {
							q: '¿Qué tono argumentativo adopta el autor respecto a la inteligencia artificial educativa?',
							correct: 'Un tono equilibrado y matizado: reconoce su utilidad práctica, pero rechaza la pasividad',
							wrong: [
								'Un rechazo absoluto de toda herramienta informática',
								'Un entusiasmo ciego sin advertencias éticas',
								'Una indiferencia total hacia los exámenes'
							],
							explanation: 'يتبنى النص موقفاً معتدلاً يقبل التقنية كأداة مساعدة ويرفض استبدال الجهد البشري.'
						} as McqSpec
					}
				},
				{
					title: 'Protección de datos personales y ética comunicativa entre los jóvenes',
					source: 'Adaptado de una guía de seguridad informática escolar',
					paragraphs: [
						'Cada fotografía publicada, cada comentario y cada registro en una plataforma gratuita deja una huella digital duradera. Muchos jóvenes comparten datos íntimos, direcciones o horarios escolares sin imaginar que [[esa información]] puede ser recopilada, analizada o utilizada sin su consentimiento.',
						'Además de la seguridad técnica —como emplear contraseñas robustas y evitar redes abiertas desconocidas—, la ciudadanía digital exige también respeto hacia la reputación ajena. Difundir la imagen de un compañero sin permiso o participar en burlas anónimas hiere la dignidad humana y degrada la convivencia.',
						'Educar en la prudencia tecnológica significa recordar que detrás de cada pantalla hay personas reales cuyos derechos merecen [[el mismo respeto]] que en la vida cotidiana.'
					],
					glossary: [
						{ term: 'huella digital', meaning: 'rastro permanente de datos que dejamos al navegar por Internet' },
						{ term: 'consentimiento', meaning: 'permiso libre y expreso de una persona' }
					],
					mainIdeaHeader: '1. Este texto tiene como finalidad principal :',
					mainIdeaOptions: [
						'Concienciar a los jóvenes sobre la privacidad de sus datos y la ética del respeto en línea',
						'Animar a publicar horarios y direcciones privadas en plataformas públicas',
						'Explicar la historia técnica de los cables submarinos'
					],
					mainIdeaCorrect:
						'Concienciar a los jóvenes sobre la privacidad de sus datos y la ética del respeto en línea',
					tfItems: [
						{
							q: 'Las publicaciones y registros en plataformas gratuitas dejan una huella digital permanente.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'Los datos personales compartidos sin cuidado jamás pueden usarse sin consentimiento.',
							a: 'Falso',
							c: 'Pueden ser recopilados, analizados o utilizados sin su consentimiento (§1).',
							mark: '0.5'
						},
						{
							q: 'La ciudadanía digital abarca tanto la seguridad técnica como el respeto a la dignidad ajena.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'El anonimato en línea justifica difundir imágenes de compañeros sin su permiso.',
							a: 'Falso',
							c: 'Hacerlo hiere la dignidad humana y degrada la convivencia (§2).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) ¿Qué datos imprudentes suelen compartir algunos jóvenes en línea según el párrafo 1?',
							a: 'Fotografías personales, datos íntimos, direcciones y horarios escolares.',
							mark: '0.75'
						},
						{
							q: 'b) Cita dos medidas técnicas de seguridad digital mencionadas en el párrafo 2.',
							a: 'Emplear contraseñas robustas y evitar redes abiertas desconocidas.',
							mark: '1'
						},
						{
							q: 'c) ¿Qué principio ético resume la conclusión del texto (§3)?',
							a: 'Las personas detrás de las pantallas merecen el mismo respeto a sus derechos y dignidad que en la vida cotidiana.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «esa información» (§1)   b) «el mismo respeto» (§3)',
					refAnswer:
						'a) «esa información» alude a los datos íntimos, fotografías, direcciones y horarios publicados sin cautela.   b) «el mismo respeto» refiere a la consideración y cortesía debidas a los derechos y la dignidad de cada persona.',
					synthPrompt:
						'¿Qué consejo práctico darías a un compañero de clase para navegar con seguridad y respeto? Escribe tu respuesta en cuatro o cinco líneas.',
					synthAnswer:
						'Le aconsejaría usar contraseñas largas y distintas en cada cuenta, evitar publicar datos familiares o ubicaciones privadas y pedir siempre permiso antes de compartir una fotografía donde aparezca otra persona. La prudencia y la cortesía deben acompañarnos también en el mundo digital.',
					quizzes: {
						easy: {
							q: '¿Qué es la «huella digital» según el párrafo 1?',
							correct: 'El rastro duradero de datos que deja cada actividad o registro en Internet',
							wrong: [
								'Una marca física en la pantalla del ordenador',
								'Un libro antiguo conservado en biblioteca',
								'Un tipo de energía limpia renovable'
							],
							explanation: 'توضح الفقرة الأولى والمفردات المرفقة أن البصمة الرقمية هي الأثر الدائم للبيانات على الشبكة.'
						} as McqSpec,
						medium: {
							q: '¿Qué dos dimensiones une la «ciudadanía digital» en el párrafo 2?',
							correct: 'La seguridad técnica (contraseñas, redes seguras) y la ética de respeto hacia los demás',
							wrong: [
								'El entretenimiento nocturno y la velocidad de descarga',
								'La compra de equipos y el olvido de la privacidad',
								'El aislamiento escolar y el anonimato ofensivo'
							],
							explanation: 'تجمع المواطنة الرقمية بين الوقاية التقنية والأخلاق التواصلية.'
						} as McqSpec,
						hard: {
							q: '¿Por qué emplea el autor la expresión «detrás de cada pantalla hay personas reales» (§3)?',
							correct: 'Para recordar que las normas morales y legales de la convivencia rigen igualmente en Internet',
							wrong: [
								'Para afirmar que las pantallas no tienen utilidad educativa',
								'Para recomendar el uso de redes abiertas públicas',
								'Para negar la existencia de la huella digital'
							],
							explanation: 'ترسّخ العبارة مبدأ تكافؤ الأخلاق والحقوق بين العالمين الواقعي والرقمي.'
						} as McqSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildMcqPayload(
				chosen.quizzes[difficulty],
				`فهم النص BAC 3AS LE («${chosen.title}»): اختر الإجابة الصحيحة`,
				'راجع الفقرة المناسبة في النص وتثبت من الفكرة أو الضمير العائد.',
				rng
			);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Comprensión del texto',
				points: 7,
				instruction: 'Lee atentamente el siguiente texto y responde a las preguntas (7 puntos — BAC 3AS LE) :',
				content: [
					buildSpanishPassageBlock({
						title: chosen.title,
						paragraphs: chosen.paragraphs,
						source: chosen.source,
						numberedParagraphs: true,
						glossary: chosen.glossary
					}),
					{
						type: 'multiple_choice',
						groups: [
							{
								header: chosen.mainIdeaHeader,
								options: chosen.mainIdeaOptions,
								correct: chosen.mainIdeaCorrect,
								mark: '0.5'
							}
						]
					},
					{
						type: 'true_false',
						items: chosen.tfItems
					},
					{
						type: 'text',
						content: `3. Contesta con precisión a las siguientes preguntas :\n${chosen.openQuestions.map((x) => x.q).join('\n')}`,
						answer: chosen.openQuestions.map((x) => `${x.q.slice(0, 2)} ${x.a}`).join('\n'),
						mark: '2.5'
					},
					{
						type: 'text',
						content: `4. Precisa a qué remiten las expresiones subrayadas :\n${chosen.refPrompt}`,
						answer: chosen.refAnswer,
						mark: '1'
					},
					{
						type: 'text',
						content: `5. Reflexión personal : ${chosen.synthPrompt}`,
						answer: chosen.synthAnswer,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't2',
				difficulty,
				domain: 'comprension_lectora',
				examRole: 'comprehension',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تحقق من أدوات المقابلة والاستدراك (Sin embargo, No obstante) لفهم الموقف المتوازن للكاتب.',
					'علّل كل حكم «Falso» بإشارة دقيقة إلى الفقرة المناسبة في النص.',
					'احترم السياق التربوي والأخلاقي في جواب الرأي الشخصي (4 إلى 5 أسطر).'
				],
				solutionStepsAr: [
					'تحديد الفكرة العامة (0.5 نقطة).',
					'الحكم والتعليل على عبارات الصواب والخطأ (2 نقطتان).',
					'الإجابة عن أسئلة التحليل النصي الثلاثة (2.5 نقطة).',
					'تحديد المراجع النصية وصياغة الرأي الشخصي (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. COMPREHENSION (7 pts): Medio ambiente, cambio climático y energías limpias
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_tpl_3as_le_t2_comp_ecologia_energias',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'comprension_lectora',
		titleAr: 'فهم النص (7 نقاط — لغات أجنبية): البيئة، التغير المناخي والطاقات المتجددة',
		curriculumLessonId: 'spa_lesson_3as_le_t2_medio_ambiente_energias',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'El potencial solar del Sáhara argelino y la transición hacia energías limpias',
					source: 'Adaptado de un informe científico sobre energía sostenible en el Mediterráneo',
					paragraphs: [
						'Ante el aumento sostenido de las temperaturas y la necesidad de reducir las emisiones contaminantes, los países mediterráneos impulsan la transición desde los combustibles fósiles hacia las energías limpias. En este escenario, el sur de Argelia destaca por recibir una de las mayores radiaciones solares del planeta a lo largo de todo el año.',
						'Las centrales fotovoltaicas y los parques eólicos construidos en regiones áridas permiten generar electricidad sin agotar los recursos naturales. Además, [[estas instalaciones]] fomentan la investigación técnica en las universidades locales y crean empleos cualificados para jóvenes ingenieros y técnicos de mantenimiento.',
						'No obstante, aprovechar la energía del sol exige combinar la inversión científica con el ahorro cotidiano de electricidad y agua en cada hogar, demostrando que [[el desarrollo sostenible]] es una tarea compartida.'
					],
					glossary: [
						{ term: 'radiación solar', meaning: 'cantidad de energía luminosa y térmica que llega del sol' },
						{ term: 'sostenible', meaning: 'que satisface las necesidades actuales sin comprometer las generaciones futuras' }
					],
					mainIdeaHeader: '1. La idea central del artículo explica que :',
					mainIdeaOptions: [
						'El gran potencial solar argelino impulsa energías limpias, empleo técnico y responsabilidad ciudadana',
						'Las centrales fotovoltaicas consumen más combustibles fósiles que el carbón',
						'El ahorro doméstico de electricidad resulta inútil frente al clima'
					],
					mainIdeaCorrect:
						'El gran potencial solar argelino impulsa energías limpias, empleo técnico y responsabilidad ciudadana',
					tfItems: [
						{
							q: 'El sur de Argelia cuenta con una de las mayores radiaciones solares del planeta.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'Las centrales solares y eólicas agotan rápidamente los recursos naturales.',
							a: 'Falso',
							c: 'Permiten generar electricidad sin agotar los recursos naturales (§2).',
							mark: '0.5'
						},
						{
							q: 'La transición energética favorece la formación y el empleo de jóvenes ingenieros locales.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'Según la conclusión, el desarrollo sostenible depende solo de las fábricas y nunca de los hogares.',
							a: 'Falso',
							c: 'Exige combinar la inversión científica con el ahorro cotidiano en cada hogar, como tarea compartida (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) ¿Por qué razón buscan los países mediterráneos sustituir gradualmente los combustibles fósiles (§1)?',
							a: 'Para hacer frente al aumento de las temperaturas y reducir las emisiones contaminantes.',
							mark: '0.75'
						},
						{
							q: 'b) Señala dos beneficios económicos y académicos de los proyectos solares locales (§2).',
							a: 'Fomentan la investigación técnica en las universidades y crean empleos cualificados para jóvenes ingenieros y técnicos.',
							mark: '1'
						},
						{
							q: 'c) ¿Qué deber ciudadano complementa la inversión científica en el cierre del texto (§3)?',
							a: 'El ahorro cotidiano de electricidad y agua en cada hogar.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «estas instalaciones» (§2)   b) «el desarrollo sostenible» (§3)',
					refAnswer:
						'a) «estas instalaciones» alude a las centrales fotovoltaicas y los parques eólicos construidos en regiones áridas.   b) «el desarrollo sostenible» remite al modelo de progreso limpio y equilibrado que une ciencia energética y ahorro ciudadano.',
					synthPrompt:
						'¿Por qué crees que apostar por la energía solar es una oportunidad clave para la juventud argelina? Responde en cuatro o cinco líneas.',
					synthAnswer:
						'Apostar por la energía solar aprovecha un recurso natural abundante y limpio que posee nuestro país durante todo el año. Además, abre nuevos campos profesionales en ingeniería, mantenimiento técnico e investigación universitaria, protegiendo al mismo tiempo el medio ambiente para las próximas generaciones.',
					quizzes: {
						easy: {
							q: 'El sur de Argelia posee una de las radiaciones solares más elevadas del planeta durante todo el año.',
							correctAnswer: true,
							explanation: 'صحيح: تؤكد الفقرة الأولى ارتفاع الإشعاع الشمسي في الجنوب الجزائري على مدار العام.'
						} as TfSpec,
						medium: {
							q: 'Según el párrafo 2, las centrales solares y eólicas destruyen la investigación científica en las universidades locales.',
							correctAnswer: false,
							explanation: 'خطأ: تدعم هذه المشاريع البحث العلمي الجامعي وتخلق وظائف مؤهلة للشباب.'
						} as TfSpec,
						hard: {
							q: 'En la conclusión del texto, el autor vincula el éxito de la transición energética tanto con la inversión científica como con el ahorro cotidiano en los hogares.',
							correctAnswer: true,
							explanation: 'صحيح: التنمية المستدامة في الفقرة الأخيرة مسؤولية مشتركة بين العلم وسلوك الأسر.'
						} as TfSpec
					}
				},
				{
					title: 'Reforestación y defensa de los bosques mediterráneos contra la sequía',
					source: 'Adaptado de un boletín de agronomía y protección forestal',
					paragraphs: [
						'Cada verano, las olas de calor y la negligencia humana amenazan valiosas hectáreas de bosques en el norte de África y la cuenca mediterránea. Cuando desaparece la cubierta vegetal, la lluvia arrastra el suelo fértil, disminuye la biodiversidad y avanza con fuerza [[la desertificación]].',
						'Para frenar este deterioro, agrónomos, estudiantes y voluntarios impulsan campañas de reforestación con especies autóctonas resistentes a la sequía, como el alcornoque y el cedro, mientras rehabilitan barreras verdes que protegen las tierras agrícolas del viento seco del sur.',
						'Cuidar un árbol recién plantado, evitar el fuego en las excursiones y denunciar la tala ilegal constituyen [[gestos sencillos]] que defienden la vida y garantizan el equilibrio climático.'
					],
					glossary: [
						{ term: 'especies autóctonas', meaning: 'árboles o plantas originarios y adaptados al clima de la región' },
						{ term: 'tala ilegal', meaning: 'corte prohibido y abusivo de árboles' }
					],
					mainIdeaHeader: '1. El texto subraya ante todo :',
					mainIdeaOptions: [
						'La urgencia de proteger los bosques y reforestar con especies adaptadas para frenar la desertificación',
						'La imposibilidad de plantar árboles resistentes en zonas mediterráneas',
						'Los beneficios de destruir la cubierta vegetal de las montañas'
					],
					mainIdeaCorrect:
						'La urgencia de proteger los bosques y reforestar con especies adaptadas para frenar la desertificación',
					tfItems: [
						{
							q: 'La pérdida de cubierta vegetal facilita la erosión del suelo y el avance de la desertificación.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'Las campañas de reforestación utilizan plantas extranjeras incapaces de resistir el calor.',
							a: 'Falso',
							c: 'Emplean especies autóctonas resistentes a la sequía como el alcornoque y el cedro (§2).',
							mark: '0.5'
						},
						{
							q: 'Las barreras verdes protegen los cultivos frente al viento seco.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'El ciudadano común no puede colaborar con la defensa forestal.',
							a: 'Falso',
							c: 'Cuidar árboles, evitar el fuego y denunciar la tala ilegal son gestos sencillos al alcance de todos (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) ¿Qué tres consecuencias graves provoca la desaparición de los bosques (§1)?',
							a: 'La lluvia arrastra el suelo fértil, disminuye la biodiversidad y avanza la desertificación.',
							mark: '1'
						},
						{
							q: 'b) ¿Qué criterio técnico siguen los agrónomos al elegir los árboles para reforestar (§2)?',
							a: 'Seleccionan especies autóctonas resistentes a la sequía, como el alcornoque y el cedro.',
							mark: '0.75'
						},
						{
							q: 'c) Menciona dos acciones cívicas concretas propuestas en el párrafo 3.',
							a: 'Cuidar los árboles recién plantados, evitar el fuego en las excursiones o denunciar la tala ilegal.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «la desertificación» (§1)   b) «gestos sencillos» (§3)',
					refAnswer:
						'a) «la desertificación» designa la degradación progresiva de la tierra fértil hacia condiciones desérticas.   b) «gestos sencillos» alude a cuidar los árboles plantados, evitar hacer fuego y denunciar la tala ilegal.',
					synthPrompt:
						'¿Por qué resulta fundamental involucrar a los jóvenes escolares en las jornadas de plantación de árboles? Explícalo en cuatro o cinco líneas.',
					synthAnswer:
						'Involucrar a los jóvenes en la plantación de árboles despierta desde temprano el respeto hacia la naturaleza. Quien planta y riega un árbol con sus propias manos comprende el tiempo que tarda en crecer y aprende a proteger los bosques contra los incendios y la negligencia.',
					quizzes: {
						easy: {
							q: 'La desaparición de la cubierta vegetal facilita que la lluvia erosione el suelo fértil y avance la desertificación.',
							correctAnswer: true,
							explanation: 'صحيح: تشرح الفقرة الأولى أن زوال الغطاء النباتي يعرّي التربة ويسرّع التصحر.'
						} as TfSpec,
						medium: {
							q: 'Las campañas forestales descritas en el párrafo 2 prefieren árboles que no resisten la sequía ni el clima local.',
							correctAnswer: false,
							explanation: 'خطأ: يختار المهندسون الزراعيون أصنافاً محلية مقاومة للجفاف كالبلوط الفليني والأرز.'
						} as TfSpec,
						hard: {
							q: 'El texto combina la acción técnica de los agrónomos (reforestación y barreras verdes) con la responsabilidad cívica cotidiana de los ciudadanos.',
							correctAnswer: true,
							explanation: 'صحيح: يتكامل العمل العلمي الزراعي في الفقرة 2 مع السلوك المدني الوقائي في الفقرة 3.'
						} as TfSpec
					}
				},
				{
					title: 'La economía circular y la gestión responsable del agua en las ciudades',
					source: 'Adaptado de un análisis ambiental urbano',
					paragraphs: [
						'Durante décadas, el modelo lineal de consumo —extraer, fabricar, usar y tirar— generó montañas de desechos plásticos y un derroche alarmante de agua potable. Frente a [[esta tendencia]], las ciudades modernas impulsan hoy la economía circular, basada en reparar, reutilizar y reciclar los materiales antes de convertirlos en basura.',
						'En el caso del agua, recurso vital cada vez más escaso, se instalan sistemas de depuración que permiten aprovechar las aguas tratadas para el riego de parques y cultivos, al tiempo que se reparan fugas en las redes urbanas y se moderniza el riego agrícola por goteo.',
						'Sin embargo, ninguna infraestructura bastará si la población no abandona el despilfarro diario: cerrar el grifo a tiempo y separar los envases son actos de justicia hacia [[quienes vendrán después]].'
					],
					glossary: [
						{ term: 'depuración', meaning: 'proceso técnico de limpieza y purificación del agua usada' },
						{ term: 'despilfarro', meaning: 'gasto excesivo e inútil de un recurso valioso' }
					],
					mainIdeaHeader: '1. El texto trata principalmente sobre :',
					mainIdeaOptions: [
						'La economía circular y el uso racional del agua mediante reciclaje, tecnología y ahorro ciudadano',
						'La defensa del consumo lineal basado en usar y tirar sin límites',
						'La inutilidad de reparar las fugas de agua en las redes urbanas'
					],
					mainIdeaCorrect:
						'La economía circular y el uso racional del agua mediante reciclaje, tecnología y ahorro ciudadano',
					tfItems: [
						{
							q: 'El modelo de «extraer, fabricar, usar y tirar» redujo notablemente los residuos plásticos.',
							a: 'Falso',
							c: 'Generó montañas de desechos plásticos y un derroche alarmante de agua potable (§1).',
							mark: '0.5'
						},
						{
							q: 'La economía circular apuesta por reparar, reutilizar y reciclar los materiales.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'Las aguas depuradas pueden aprovecharse para regar parques y cultivos.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'Las infraestructuras técnicas hacen innecesario el ahorro doméstico del agua.',
							a: 'Falso',
							c: 'Ninguna infraestructura bastará si la población no abandona el despilfarro diario (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) ¿En qué tres acciones se fundamenta la economía circular frente al modelo lineal (§1)?',
							a: 'En reparar, reutilizar y reciclar los materiales antes de desecharlos.',
							mark: '0.75'
						},
						{
							q: 'b) Cita dos medidas técnicas aplicadas para proteger los recursos hídricos (§2).',
							a: 'Instalar plantas de depuración para riego, reparar fugas urbanas o emplear el riego por goteo.',
							mark: '1'
						},
						{
							q: 'c) ¿Por qué califica el autor el ahorro doméstico como un acto de «justicia» al final del texto (§3)?',
							a: 'Porque preservar el agua y reciclar protege los recursos que necesitarán las generaciones futuras.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «esta tendencia» (§1)   b) «quienes vendrán después» (§3)',
					refAnswer:
						'a) «esta tendencia» remite al modelo lineal de consumo basado en extraer, fabricar, usar y tirar generando desechos y derroche.   b) «quienes vendrán después» alude a las futuras generaciones.',
					synthPrompt:
						'¿Qué medidas concretas propones para evitar el desperdicio de agua y papel en tu entorno escolar y familiar? Responde en cuatro o cinco líneas.',
					synthAnswer:
						'En casa y en el instituto debemos reparar enseguida cualquier grifo que gotee y utilizar botellas reutilizables en lugar de plástico desechable. Asimismo, conviene aprovechar ambas caras de cada hoja de papel y depositar los envases en contenedores de reciclaje para proteger los recursos comunes.',
					quizzes: {
						easy: {
							q: 'La economía circular se basa en reparar, reutilizar y reciclar los materiales en lugar de tirarlos tras un solo uso.',
							correctAnswer: true,
							explanation: 'صحيح: تصف الفقرة الأولى الاقتصاد الدائري بأنه إصلاح وإعادة استخدام وإعادة تدوير.'
						} as TfSpec,
						medium: {
							q: 'El párrafo 2 sostiene que el agua depurada no puede emplearse nunca para el riego de parques verdes.',
							correctAnswer: false,
							explanation: 'خطأ: تبيّن الفقرة الثانية استخدام المياه المعالجة في سقي الحدائق والمحاصيل.'
						} as TfSpec,
						hard: {
							q: 'La expresión «quienes vendrán después» en el cierre del texto hace referencia a las generaciones futuras.',
							correctAnswer: true,
							explanation: 'صحيح: تشير العبارة إلى الأجيال القادمة التي لها حق في الموارد المائية.'
						} as TfSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildTfPayload(chosen.quizzes[difficulty]);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Comprensión del texto',
				points: 7,
				instruction: 'Lee detenidamente este documento ambiental y responde a las preguntas (7 puntos — BAC 3AS LE) :',
				content: [
					buildSpanishPassageBlock({
						title: chosen.title,
						paragraphs: chosen.paragraphs,
						source: chosen.source,
						numberedParagraphs: true,
						glossary: chosen.glossary
					}),
					{
						type: 'multiple_choice',
						groups: [
							{
								header: chosen.mainIdeaHeader,
								options: chosen.mainIdeaOptions,
								correct: chosen.mainIdeaCorrect,
								mark: '0.5'
							}
						]
					},
					{
						type: 'true_false',
						items: chosen.tfItems
					},
					{
						type: 'text',
						content: `3. Responde a las siguientes preguntas :\n${chosen.openQuestions.map((x) => x.q).join('\n')}`,
						answer: chosen.openQuestions.map((x) => `${x.q.slice(0, 2)} ${x.a}`).join('\n'),
						mark: '2.5'
					},
					{
						type: 'text',
						content: `4. Indica a qué se refieren las expresiones subrayadas :\n${chosen.refPrompt}`,
						answer: chosen.refAnswer,
						mark: '1'
					},
					{
						type: 'text',
						content: `5. Reflexión personal : ${chosen.synthPrompt}`,
						answer: chosen.synthAnswer,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't2',
				difficulty,
				domain: 'comprension_lectora',
				examRole: 'comprehension',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'ميّز في النصوص البيئية بين أسباب الأزمة (Causas) والحلول التقنية والمدنية (Soluciones).',
					'انتبه للمرجعيات العائدة (estas instalaciones, esta tendencia, quienes vendrán después).',
					'ادعم إجابة «Falso» بالتبرير النصي الدقيق من الفقرة المعنية.'
				],
				solutionStepsAr: [
					'تحديد الفكرة المركزية للنص (0.5 نقطة).',
					'تصحيح عبارات الصواب والخطأ بالتبرير النصي (2 نقطتان).',
					'الإجابة المعللة عن أسئلة الفهم الثلاثة (2.5 نقطة).',
					'تحديد الإحالات النصية وتحرير الرأي البيئي الشخصي (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. LINGUISTIC COMPETENCE (7 pts): Voz pasiva y conectores argumentativos
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_tpl_3as_le_t2_ling_pasiva_conectores',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'gramatica_sintaxis',
		titleAr: 'الكفاءة اللغوية (7 نقاط — لغات أجنبية): المبني للمجهول (Perifrástica y Refleja) والروابط الحجاجية',
		curriculumLessonId: 'spa_lesson_3as_le_t2_voz_pasiva_conectores',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					classPrompt:
						'1. Clasifica estas formas verbales en Pasiva perifrástica o Pasiva refleja : fueron instalados - se reciclan - han sido protegidas - se difundió - será evaluada - se construyen.',
					classCols: [
						{ header: 'Pasiva perifrástica', items: ['fueron instalados', 'han sido protegidas', 'será evaluada'], mark: '0.5' },
						{ header: 'Pasiva refleja', items: ['se reciclan', 'se difundió', 'se construyen'], mark: '0.5' }
					],
					wordRows: [
						{
							verbo: { given: true, value: 'contaminar' },
							sustantivo: { value: 'contaminación', mark: '0.25' },
							adjetivo: { value: 'contaminante / contaminado', mark: '0.25' }
						},
						{
							verbo: { value: 'proteger', mark: '0.25' },
							sustantivo: { given: true, value: 'protección' },
							adjetivo: { value: 'protector / protegido', mark: '0.25' }
						},
						{
							verbo: { value: 'informar', mark: '0.25' },
							sustantivo: { value: 'información', mark: '0.25' },
							adjetivo: { given: true, value: 'informativo' }
						}
					],
					lexPrompt:
						'3. Léxico en contexto :\na) Da un sinónimo de : mitigar (verbo) - fiable (adj.).\nb) Forma el antónimo con prefijo de : habitable - renovable - seguro - informado.',
					lexAnswer:
						'a) mitigar = aliviar / reducir | fiable = seguro / contrastado.\nb) inhabitable, no renovable (o irrenovable), inseguro, desinformado.',
					passivePrompt:
						'4. Transforma según la voz indicada :\na) Pasa a voz pasiva perifrástica : «Los voluntarios plantaron tres mil cedros en la montaña.»\nb) Pasa a voz pasiva refleja : «Las autoridades modernas repararán las fugas urbanas.»',
					passiveAnswer:
						'a) Tres mil cedros fueron plantados por los voluntarios en la montaña.\nb) Se repararán las fugas urbanas.',
					connPrompt:
						'5. Completa el párrafo con el conector correcto : por lo tanto - a pesar de - ya que - además.\n(1) .......... la sequía estival, las plantas solares produjeron energía limpia, (2) .......... el sur recibe abundante radiación todo el año. (3) .........., redujeron las emisiones y, (4) .........., impulsaron la economía local.',
					connAnswer: '1) A pesar de   2) ya que   3) Además / Por lo tanto   4) por lo tanto / además',
					quizzes: {
						easy: {
							q: 'Relaciona cada conector argumentativo con su relación lógica:',
							pairs: [
								{ left: 'puesto que', right: 'Causa' },
								{ left: 'por consiguiente', right: 'Consecuencia' },
								{ left: 'sin embargo', right: 'Oposición' },
								{ left: 'además', right: 'Adición' }
							],
							explanation: 'تصنيف الروابط الحجاجية الأربعة يضمن تماسك المقال وسلامة الفهم.'
						} as MatchingSpec,
						medium: {
							q: 'Asocia cada oración activa con su transformación correcta en voz pasiva:',
							pairs: [
								{ left: 'Instalan paneles solares.', right: 'Se instalan paneles solares.' },
								{ left: 'Instaló un panel solar.', right: 'Un panel solar fue instalado.' },
								{ left: 'Protegerán los bosques.', right: 'Los bosques serán protegidos.' },
								{ left: 'Han reciclado las botellas.', right: 'Las botellas han sido recicladas.' }
							],
							explanation: 'المبني للمجهول يحافظ على زمن الفعل الأصلي ويطابق الاسم جنساً وعدداً.'
						} as MatchingSpec,
						hard: {
							q: 'Une cada conector con la categoría gramatical que exige inmediatamente después:',
							pairs: [
								{ left: 'a pesar de', right: 'Sintagma nominal o infinitivo' },
								{ left: 'aunque (hecho real)', right: 'Verbo en indicativo' },
								{ left: 'debido a', right: 'Sustantivo de causa' },
								{ left: 'para que', right: 'Verbo en subjuntivo' }
							],
							explanation: 'تمييز البنية النحوية بعد كل رابط يمنع الأخطاء التركيبية في البكالوريا.'
						} as MatchingSpec
					}
				},
				{
					classPrompt:
						'1. Clasifica los conectores siguientes en Causa/Consecuencia u Oposición/Concesión : dado que - no obstante - así que - a pesar de - puesto que - sin embargo.',
					classCols: [
						{ header: 'Causa / Consecuencia', items: ['dado que', 'así que', 'puesto que'], mark: '0.5' },
						{ header: 'Oposición / Concesión', items: ['no obstante', 'a pesar de', 'sin embargo'], mark: '0.5' }
					],
					wordRows: [
						{
							verbo: { given: true, value: 'reciclar' },
							sustantivo: { value: 'reciclaje', mark: '0.25' },
							adjetivo: { value: 'reciclable / reciclado', mark: '0.25' }
						},
						{
							verbo: { value: 'ahorrar', mark: '0.25' },
							sustantivo: { given: true, value: 'ahorro' },
							adjetivo: { value: 'ahorrativo', mark: '0.25' }
						},
						{
							verbo: { value: 'investigar', mark: '0.25' },
							sustantivo: { value: 'investigación', mark: '0.25' },
							adjetivo: { given: true, value: 'investigador' }
						}
					],
					lexPrompt:
						'3. Léxico en contexto :\na) Da un sinónimo de : escasez (sust.) - impulsar (verbo).\nb) Forma el antónimo con prefijo de : agotable - responsable - útil - equilibrio.',
					lexAnswer:
						'a) escasez = falta / insuficiencia | impulsar = fomentar / promover.\nb) inagotable, irresponsable, inútil, desequilibrio.',
					passivePrompt:
						'4. Transforma correctamente :\na) Pasa a voz activa : «Las fuentes digitales fueron verificadas por los estudiantes.»\nb) Corrige la concordancia en pasiva refleja : «Se vende dos placas solares en el taller.»',
					passiveAnswer:
						'a) Los estudiantes verificaron las fuentes digitales.\nb) Se venden dos placas solares en el taller.',
					connPrompt:
						'5. Completa con : debido a - aunque - por ello - asimismo.\n(1) .......... las altas temperaturas, debemos ahorrar agua. (2) .......... los equipos modernos ayudan, (3) .......... es vital educar a la ciudadanía y, (4) .........., sancionar los vertidos contaminantes.',
					connAnswer: '1) Debido a   2) Aunque   3) por ello   4) asimismo',
					quizzes: {
						easy: {
							q: 'Relaciona cada palabra ecológica con su antónimo morfológico:',
							pairs: [
								{ left: 'agotable', right: 'inagotable' },
								{ left: 'útil', right: 'inútil' },
								{ left: 'equilibrio', right: 'desequilibrio' },
								{ left: 'protección', right: 'desprotección' }
							],
							explanation: 'تستعمل السوابق in- و des- لنفي الدلالة في المعجم البيئي.'
						} as MatchingSpec,
						medium: {
							q: 'Empareja cada verbo ambiental o científico con su sustantivo derivado:',
							pairs: [
								{ left: 'contaminar', right: 'contaminación' },
								{ left: 'reciclar', right: 'reciclaje' },
								{ left: 'ahorrar', right: 'ahorro' },
								{ left: 'depurar', right: 'depuración' }
							],
							explanation: 'معرفة اللواحق القياسية (-ción, -aje) يحسم جدول الاشتقاق في البكالوريا.'
						} as MatchingSpec,
						hard: {
							q: 'Relaciona cada oración pasiva con su regla exacta de concordancia:',
							pairs: [
								{ left: 'Fueron creadas dos leyes.', right: 'Participio femenino plural con ser' },
								{ left: 'Se crean dos leyes.', right: 'Verbo en 3.ª pers. plural sin agente' },
								{ left: 'La ley fue creada.', right: 'Participio femenino singular con ser' },
								{ left: 'Se crea una ley.', right: 'Verbo en 3.ª pers. singular sin agente' }
							],
							explanation: 'المطابقة تحكم كلاً من اسم المفعول مع ser، والفعل مع الفاعل المريض في pasiva refleja.'
						} as MatchingSpec
					}
				},
				{
					classPrompt:
						'1. Clasifica estas expresiones según pertenezcan al ámbito tecnológico o al ámbito ambiental : ciberseguridad - reforestación - contraseña - desertificación - privacidad - riego por goteo.',
					classCols: [
						{ header: 'Ámbito tecnológico', items: ['ciberseguridad', 'contraseña', 'privacidad'], mark: '0.5' },
						{ header: 'Ámbito ambiental', items: ['reforestación', 'desertificación', 'riego por goteo'], mark: '0.5' }
					],
					wordRows: [
						{
							verbo: { given: true, value: 'desarrollar' },
							sustantivo: { value: 'desarrollo', mark: '0.25' },
							adjetivo: { value: 'desarrollado', mark: '0.25' }
						},
						{
							verbo: { value: 'verificar', mark: '0.25' },
							sustantivo: { given: true, value: 'verificación' },
							adjetivo: { value: 'verificable', mark: '0.25' }
						},
						{
							verbo: { value: 'sostener', mark: '0.25' },
							sustantivo: { value: 'sostenibilidad', mark: '0.25' },
							adjetivo: { given: true, value: 'sostenible' }
						}
					],
					lexPrompt:
						'3. Léxico en contexto :\na) Da un sinónimo de : despilfarro (sust.) - preservar (verbo).\nb) Forma el antónimo con prefijo de : fiable - reparable - legal - contaminado.',
					lexAnswer:
						'a) despilfarro = derroche | preservar = conservar / cuidar.\nb) poco fiable / desconfiable (o infiable) - irreparable - ilegal - incontaminado (o no contaminado).',
					passivePrompt:
						'4. Transforma a las dos formas de voz pasiva :\n«Los ingenieros han diseñado nuevos filtros de agua.»\na) Voz pasiva perifrástica : ..........\nb) Voz pasiva refleja : ..........',
					passiveAnswer:
						'a) Nuevos filtros de agua han sido diseñados por los ingenieros.\nb) Se han diseñado nuevos filtros de agua.',
					connPrompt:
						'5. Completa con : sin embargo - puesto que - a fin de - en conclusión.\nInstalamos sensores digitales (1) .......... ahorrar electricidad. (2) .........., la tecnología sola no basta, (3) .......... la educación ciudadana sigue siendo esencial. (4) .........., ciencia y ética deben caminar juntas.',
					connAnswer: '1) a fin de   2) Sin embargo   3) puesto que   4) En conclusión',
					quizzes: {
						easy: {
							q: 'Asocia cada término de T2 con su definición precisa:',
							pairs: [
								{ left: 'despilfarro', right: 'derroche inútil de un recurso' },
								{ left: 'ciberseguridad', right: 'protección de sistemas y datos' },
								{ left: 'reforestación', right: 'plantación nueva de árboles' },
								{ left: 'verificación', right: 'comprobación rigurosa de un dato' }
							],
							explanation: 'تثبيت معاني المصطلحات العلمية والبيئية يعزز الدقة في الفهم والإنشاء.'
						} as MatchingSpec,
						medium: {
							q: 'Relaciona cada verbo en voz activa con el participio concordado correcto en voz pasiva:',
							pairs: [
								{ left: 'diseñar (las redes)', right: 'han sido diseñadas' },
								{ left: 'proteger (los oasis)', right: 'fueron protegidos' },
								{ left: 'aprobar (la ley)', right: 'será aprobada' },
								{ left: 'construir (el parque)', right: 'ha sido construido' }
							],
							explanation: 'اسم المفعول مع «ser» يطابق دائماً الفاعل المريض في التذكير والتأنيث والإفراد والجمع.'
						} as MatchingSpec,
						hard: {
							q: 'Asocia cada nexo lógico con un sinónimo equivalente de igual categoría:',
							pairs: [
								{ left: 'no obstante', right: 'sin embargo' },
								{ left: 'puesto que', right: 'ya que' },
								{ left: 'por consiguiente', right: 'por lo tanto' },
								{ left: 'a causa de', right: 'debido a' }
							],
							explanation: 'تنويع الروابط المتكافئة يمنع التكرار ويرفع قيمة التعبير الكتابي.'
						} as MatchingSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildMatchingPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Competencia lingüística — A) Voz pasiva, léxico y conectores',
				points: 7,
				instruction: 'Resuelve cuidadosamente las siguientes actividades lingüísticas (7 puntos — BAC 3AS LE) :',
				content: [
					{
						type: 'text',
						content: chosen.classPrompt
					},
					buildSpanishClassificationTableBlock({ columns: chosen.classCols }),
					{
						type: 'text',
						content: '2. Completa el cuadro morfológico (Verbo / Sustantivo / Adjetivo) :'
					},
					buildSpanishWordFamilyTableBlock(chosen.wordRows),
					{
						type: 'text',
						content: chosen.lexPrompt,
						answer: chosen.lexAnswer,
						mark: '1.5'
					},
					{
						type: 'text',
						content: chosen.passivePrompt,
						answer: chosen.passiveAnswer,
						mark: '2'
					},
					{
						type: 'text',
						content: chosen.connPrompt,
						answer: chosen.connAnswer,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't2',
				difficulty,
				domain: 'gramatica_sintaxis',
				examRole: 'linguistic_competence',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'في Pasiva perifrástica، طابق اسم المفعول جنساً وعدداً مع الفاعل الجديد وحافظ على نفس الزمن.',
					'في Pasiva refleja، يطابق الفعل الفاعل المريض في الإفراد والجمع (se vende / se venden) دون ذكر «por + agente».',
					'راقب الفرق النحوي بين «a pesar de / debido a» (+ اسم) و«aunque / ya que» (+ فعل مصرف).'
				],
				solutionStepsAr: [
					'التصنيف النحوي أو الدلالي في الجدول (1 نقطة).',
					'إكمال جدول الاشتقاق الثلاثي بدقة (1.5 نقطة).',
					'المرادفات والأضداد بالسوابق المناسبة (1.5 نقطة).',
					'التحويل بين المبني للمعلوم والمجهول وتوظيف الروابط الحجاجية (3 نقاط).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. LINGUISTIC COMPETENCE (7 pts): Estilo indirecto en pasado (with SVG timeline)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_tpl_3as_le_t2_ling_estilo_indirecto',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'gramatica_sintaxis',
		titleAr: 'الكفاءة اللغوية (7 نقاط — لغات أجنبية): الكلام غير المباشر في الماضي وتحويل الأزمنة والظروف',
		curriculumLessonId: 'spa_lesson_3as_le_t2_estilo_indirecto_pasado',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					svgTitle: 'Estilo Indirecto (Verbo en Pasado)',
					svgTense: 'Desplazamiento verbal y deíctico',
					svgFormula: 'dijo que : Pres. a Imp. | Indef. a Plusc. | Fut. a Cond.',
					svgExample: '«Hoy pruebo esto» : Dijo que ese día probaba aquello.',
					svgMarkers: 'hoy / ese día | mañana / al día siguiente | ayer / el día anterior',
					classPrompt:
						'1. Clasifica estas expresiones según pertenezcan al Estilo Directo o al Estilo Indirecto en pasado : hoy mismo - el día anterior - ahora - al día siguiente - este informe - aquel día.',
					classCols: [
						{ header: 'Estilo Directo', items: ['hoy mismo', 'ahora', 'este informe'], mark: '0.75' },
						{ header: 'Estilo Indirecto (pasado)', items: ['el día anterior', 'al día siguiente', 'aquel día'], mark: '0.75' }
					],
					directToIndirectPrompt:
						'2. Transforma al estilo indirecto empezando con el verbo en pasado :\na) La investigadora explicó : «Hoy analizamos los datos solares y mañana presentaremos el proyecto.»\nb) El técnico ordenó a los estudiantes : «No compartáis vuestra clave aquí.»',
					directToIndirectAnswer:
						'a) La investigadora explicó que ese día analizaban los datos solares y al día siguiente presentarían el proyecto.\nb) El técnico ordenó a los estudiantes que no compartieran (o compartiesen) su clave allí.',
					interrogativePrompt:
						'3. Pasa estas preguntas al estilo indirecto en pasado :\na) La periodista preguntó al ingeniero : «¿Habéis instalado nuevos paneles en este instituto?»\nb) El profesor preguntó : «¿Dónde guardasteis los resultados ayer?»',
					interrogativeAnswer:
						'a) La periodista preguntó al ingeniero si habían instalado nuevos paneles en aquel instituto.\nb) El profesor preguntó dónde habían guardado los resultados el día anterior.',
					clozePrompt:
						'4. Completa el relato en estilo indirecto con : habían plantado - protegería - regaran - al día siguiente.\nEl responsable ecológico anunció que (1) .......... comenzaría la campaña y añadió que el año anterior ya (2) .......... mil cedros. Además, pidió a los jóvenes que (3) .......... cada árbol porque eso (4) .......... todo el bosque.',
					clozeAnswer: '1) al día siguiente   2) habían plantado   3) regaran   4) protegería',
					quizzes: {
						easy: {
							q: 'Transforma al estilo indirecto el presente tras un verbo en pasado:',
							sentence: 'El científico dijo : «Ahora medimos la energía solar.» : Dijo que entonces ___ la energía solar.',
							correct: 'medían',
							distractors: ['miden', 'medirán', 'midieron'],
							explanation: 'المضارع الإخباري «medimos» يتحول في الكلام غير المباشر بالماضي إلى Imperfecto: «medían».'
						} as ClozeSpec,
						medium: {
							q: 'Transforma la orden al estilo indirecto en pasado:',
							sentence: 'La profesora aconsejó a los alumnos : «Contrastad cada fuente.» : Les aconsejó que ___ cada fuente.',
							correct: 'contrastaran',
							distractors: ['contrastan', 'contrastaron', 'contrastarán'],
							explanation: 'الأمر المنقول بعد فعل قول في الماضي يتحول إلى Imperfecto de subjuntivo: «contrastaran».'
						} as ClozeSpec,
						hard: {
							q: 'Completa la interrogativa total y temporal en estilo indirecto en pasado:',
							sentence: 'El director preguntó : «¿Recibisteis ayer los libros?» : Preguntó ___ habían recibido los libros el día anterior.',
							correct: 'si',
							distractors: ['que si', 'cuando', 'como'],
							explanation: 'الاستفهام الكلي يربط مباشرة بأداة الشرط الاستفهامية «si» دون «que».'
						} as ClozeSpec
					}
				},
				{
					svgTitle: 'Estilo Indirecto : Pasados e Imperativo',
					svgTense: 'Indefinido / Perfecto a Pluscuamperfecto',
					svgFormula: 'pidió que + Imperfecto de Subjuntivo (-ra / -se)',
					svgExample: '«¿Visteis el vídeo?» : Preguntó si habían visto el vídeo.',
					svgMarkers: 'aquí / allí | hace un año / un año antes | venir / ir',
					classPrompt:
						'1. Clasifica estas transformaciones verbales según correspondan a : Futuro a Condicional o Pasado a Pluscuamperfecto : vendría - había leído - harían - habían comprobado - protegería - había escrito.',
					classCols: [
						{ header: 'Futuro a Condicional', items: ['vendría', 'harían', 'protegería'], mark: '0.75' },
						{ header: 'Pasado a Pluscuamperfecto', items: ['había leído', 'habían comprobado', 'había escrito'], mark: '0.75' }
					],
					directToIndirectPrompt:
						'2. Pasa al estilo indirecto en pasado :\na) El ingeniero afirmó : «Ayer detectamos una fuga y la reparamos enseguida.»\nb) La bibliotecaria pidió : «Devolved los manuales mañana en perfecto estado.»',
					directToIndirectAnswer:
						'a) El ingeniero afirmó que el día anterior habían detectado una fuga y la habían reparado enseguida.\nb) La bibliotecaria pidió que devolvieran (o devolviesen) los manuales al día siguiente en perfecto estado.',
					interrogativePrompt:
						'3. Transforma al estilo directo o indirecto según corresponda :\na) Pasa al indirecto : El periodista preguntó : «¿Cuándo inaugurarán esta planta solar?»\nb) Pasa al directo : El tutor dijo que aquel mes revisarían todos los apuntes.',
					interrogativeAnswer:
						'a) El periodista preguntó cuándo inaugurarían aquella planta solar.\nb) El tutor dijo : «Este mes revisaremos todos los apuntes.»',
					clozePrompt:
						'4. Completa con : habían comprobado - cuidaran - allí - reducirían.\nDurante la conferencia, el experto señaló que (1) .......... se instalaban filtros nuevos y recordó que ya (2) .......... su eficacia. Finalmente, rogó a todos que (3) .......... el consumo porque así (4) .......... la huella hídrica.',
					clozeAnswer: '1) allí   2) habían comprobado   3) cuidaran   4) reducirían',
					quizzes: {
						easy: {
							q: 'Elige el desplazamiento correcto del futuro simple en estilo indirecto en pasado:',
							sentence: 'Prometió : «Publicaremos los datos mañana.» : Prometió que ___ los datos al día siguiente.',
							correct: 'publicarían',
							distractors: ['publicarán', 'publican', 'publicaban'],
							explanation: 'المستقبل البسيط يتحول بعد فعل قول في الماضي إلى Condicional simple: «publicarían».'
						} as ClozeSpec,
						medium: {
							q: 'Transforma el pretérito perfecto en estilo indirecto en pasado:',
							sentence: 'Explicó : «He ahorrado mucha agua este año.» : Explicó que ___ mucha agua aquel año.',
							correct: 'había ahorrado',
							distractors: ['ahorraría', 'ahorra', 'ahorre'],
							explanation: 'Pretérito perfecto و Indefinido يتحولان إلى Pluscuamperfecto: «había ahorrado».'
						} as ClozeSpec,
						hard: {
							q: 'Selecciona la transformación correcta de lugar y verbo en estilo indirecto en pasado:',
							sentence: 'La guía dijo : «Venid aquí dentro de una hora.» : Dijo que ___ allí una hora después.',
							correct: 'fueran',
							distractors: ['vienen', 'vendrán', 'vinimos'],
							explanation: 'الأمر «venid» يتحول إلى Imperfecto de subjuntivo مع تحول «venir» إلى «ir» («fueran») و«aquí» إلى «allí».'
						} as ClozeSpec
					}
				},
				{
					svgTitle: 'Estilo Indirecto : Interrogativas y Deícticos',
					svgTense: 'Si (total) vs. Pronombre interrogativo (parcial)',
					svgFormula: 'preguntó + si / qué / cómo / dónde / cuándo',
					svgExample: '«¿Qué buscas aquí?» : Preguntó qué buscaba allí.',
					svgMarkers: 'este / aquel | ahora / entonces | dentro de / después',
					classPrompt:
						'1. Clasifica estas oraciones según sean Interrogativas totales (con si) o Interrogativas parciales (con tilde) : Preguntó si vendrían - Quiso saber cuándo empezaba - Indagó cómo funcionaba el filtro - Preguntó si habían ahorrado agua - Consultó dónde estaba la biblioteca - Verificó si el dato era cierto.',
					classCols: [
						{ header: 'Interrogativa total (si)', items: ['Preguntó si vendrían', 'Preguntó si habían ahorrado agua', 'Verificó si el dato era cierto'], mark: '0.75' },
						{ header: 'Interrogativa parcial', items: ['Quiso saber cuándo empezaba', 'Indagó cómo funcionaba el filtro', 'Consultó dónde estaba la biblioteca'], mark: '0.75' }
					],
					directToIndirectPrompt:
						'2. Transforma al estilo indirecto en pasado :\na) El profesor declaró : «La tecnología ha transformado nuestro método de estudio.»\nb) Los vecinos rogaron : «Proteged el bosque de este valle.»',
					directToIndirectAnswer:
						'a) El profesor declaró que la tecnología había transformado su método de estudio.\nb) Los vecinos rogaron que protegieran (o protegiesen) el bosque de aquel valle.',
					interrogativePrompt:
						'3. Completa el paso del estilo directo al indirecto en pasado :\na) La estudiante preguntó : «¿Puedo consultar estos archivos digitales hoy?»\nb) El agrónomo preguntó : «¿Por qué no regaron los olivos la semana pasada?»',
					interrogativeAnswer:
						'a) La estudiante preguntó si podía consultar aquellos archivos digitales ese día.\nb) El agrónomo preguntó por qué no habían regado los olivos la semana anterior.',
					clozePrompt:
						'4. Completa con : el día anterior - cerraran - si - había revisado.\nLa directora preguntó al grupo (1) .......... alguien (2) .......... los informes enviados (3) .......... y les pidió que (4) .......... las ventanas antes de salir.',
					clozeAnswer: '1) si   2) había revisado   3) el día anterior   4) cerraran',
					quizzes: {
						easy: {
							q: 'Elige la transformación correcta del adjetivo demostrativo y del adverbio temporal:',
							sentence: 'Dijo : «Leeré este artículo hoy.» : Dijo que leería ___ artículo ese día.',
							correct: 'aquel',
							distractors: ['este', 'aquí', 'ahora'],
							explanation: 'اسم الإشارة القريب «este» يتحول إلى «aquel» أو «ese» عند النقل في الماضي.'
						} as ClozeSpec,
						medium: {
							q: 'Completa la interrogativa parcial con tilde y desplazamiento verbal:',
							sentence: 'Me preguntó : «¿Cómo resolviste el ejercicio?» : Me preguntó ___ había resuelto el ejercicio.',
							correct: 'cómo',
							distractors: ['si', 'como si', 'aunque'],
							explanation: 'تحتفظ أداة الاستفهام «cómo» بالعلامة الكتابية (tilde) في الاستفهام غير المباشر.'
						} as ClozeSpec,
						hard: {
							q: 'Completa correctamente el paso de «la semana pasada» y el verbo en indefinido:',
							sentence: 'Señaló : «Plantamos cien pinos la semana pasada.» : Señaló que ___ cien pinos la semana anterior.',
							correct: 'habían plantado',
							distractors: ['plantarán', 'plantarían', 'plantan'],
							explanation: 'يتحول الماضي البسيط (plantamos) إلى Pluscuamperfecto (habían plantado) و«la semana pasada» إلى «la semana anterior».'
						} as ClozeSpec
					}
				}
			];

			const vIdx = rng.int(0, pool.length - 1);
			const chosen = pool[vIdx];
			const svgStr = svgSpanishTenseTimeline({
				title: chosen.svgTitle,
				tenseName: chosen.svgTense,
				formula: chosen.svgFormula,
				activeZone: 'two_past',
				example: chosen.svgExample,
				markers: chosen.svgMarkers
			});
			const svgPath = saveSpanishSvgAsset(`3as_le_t2_indirecto_v${vIdx + 1}`, svgStr);

			const { quizQuestion, finalAnswer } = buildClozePayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Competencia lingüística — B) Estilo indirecto en pasado',
				points: 7,
				instruction: 'Apóyate en la línea temporal y realiza las transformaciones del estilo indirecto (7 puntos — BAC 3AS LE) :',
				content: [
					{
						type: 'image',
						src: svgPath,
						width: 'full',
						caption: 'Esquema temporal : Retroceso de tiempos y marcadores en estilo indirecto en pasado.'
					},
					{
						type: 'text',
						content: chosen.classPrompt
					},
					buildSpanishClassificationTableBlock({ columns: chosen.classCols }),
					{
						type: 'text',
						content: chosen.directToIndirectPrompt,
						answer: chosen.directToIndirectAnswer,
						mark: '2.5'
					},
					{
						type: 'text',
						content: chosen.interrogativePrompt,
						answer: chosen.interrogativeAnswer,
						mark: '1.5'
					},
					{
						type: 'text',
						content: chosen.clozePrompt,
						answer: chosen.clozeAnswer,
						mark: '1.5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't2',
				difficulty,
				domain: 'gramatica_sintaxis',
				examRole: 'linguistic_competence',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكّر التحويلات الأربع الأساسية بعد فعل قول في الماضي: Presente إلى Imperfecto، الماضي إلى Pluscuamperfecto، المستقبل إلى Condicional، والأمر إلى Imperfecto de subjuntivo.',
					'احذف المزدوجتين وعلامتي الاستفهام، وحوّل الضمائر (nuestro إلى su) وظروف الزمان والمكان (hoy إلى ese día، aquí إلى allí).',
					'في الاستفهام الكلي استعمل «preguntó si» دون «que».'
				],
				solutionStepsAr: [
					'تصنيف المؤشرات الزمنية والصيغ بين المباشر وغير المباشر (1.5 نقطة).',
					'تحويل الجمل الخبرية والأمرية إلى غير المباشر في الماضي (2.5 نقطة).',
					'تحويل الجمل الاستفهامية الكلية والجزئية أو العكسية (1.5 نقطة).',
					'إكمال الفقرة التحويلية بدقة (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. WRITTEN EXPRESSION (6 pts — Integration): Tecnología y ética digital
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_tpl_3as_le_t2_writ_tecnologia_etica',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'expresion_escrita',
		titleAr: 'التعبير الكتابي (6 نقاط — لغات أجنبية): التكنولوجيا الحديثة، الذكاء الاصطناعي والأخلاق الرقمية',
		curriculumLessonId: 'spa_lesson_3as_le_t2_tecnologia_responsable',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					temaUnoPrompt:
						'Redacta un artículo de opinión (140 a 180 palabras) sobre el uso equilibrado de Internet y las pantallas entre los estudiantes de secundaria.',
					temaUnoNotas: [
						'Destacar dos ventajas académicas claras (bibliotecas digitales, práctica de idiomas).',
						'Advertir contra dos riesgos frecuentes (distracción, noticias no contrastadas).',
						'Proponer reglas prácticas de horario y verificación de fuentes.'
					],
					temaDosPrompt:
						'«Las herramientas automáticas pueden ayudar al estudiante, pero nunca deben sustituir su esfuerzo personal.» Desarrolla tu postura en un ensayo argumentado (140 a 180 palabras).',
					modelAnswer:
						'Hoy en día, resulta imposible imaginar la vida estudiantil sin el apoyo de Internet. Sin embargo, entre quienes celebran todas sus facilidades y quienes temen sus distracciones, conviene defender un uso equilibrado y consciente.\nPor una parte, la red ofrece ventajas innegables para los bachilleres: permite consultar diccionarios fiables, acceder a bibliotecas digitales y escuchar documentos en lenguas extranjeras. Utilizada con método, ahorra tiempo y amplía el horizonte científico.\nPor otra parte, la exposición excesiva a las pantallas fragmenta la atención y expone a los jóvenes a rumores no contrastados o a la pérdida de privacidad. Por ello, conviene fijar un horario limitado para la conexión y verificar siempre el origen de cada dato.\nEn conclusión, la tecnología es una herramienta valiosa únicamente cuando permanece al servicio del estudio y no sustituye jamás la lectura serena ni el esfuerzo personal.',
					rubricSummary:
						'Pertinencia y equilibrio argumentativo (1.5) + Cohesión y conectores (1.5) + Corrección gramatical (1.5) + Léxico digital adecuado y tildes (1.5).',
					quizzes: {
						easy: {
							q: 'Clasifica estos elementos según correspondan a Ventajas académicas o a Riesgos digitales:',
							categories: ['Ventajas académicas', 'Riesgos digitales'],
							items: [
								{ text: 'Consultar diccionarios fiables', category: 0 },
								{ text: 'Acceder a bibliotecas digitales', category: 0 },
								{ text: 'Creer noticias no contrastadas', category: 1 },
								{ text: 'Perder concentración por pantallas', category: 1 }
							],
							explanation: 'التفريق بين المزايا الدراسية والمخاطر التقنية يبني تصميم المقال المتوازن.'
						} as DragDropSpec,
						medium: {
							q: 'Clasifica estas acciones según pertenezcan a la Seguridad digital o a la Desprudencia en línea:',
							categories: ['Ciudadanía digital segura', 'Práctica imprudente'],
							items: [
								{ text: 'Usar contraseñas robustas', category: 0 },
								{ text: 'Comprobar la fuente oficial', category: 0 },
								{ text: 'Publicar horarios familiares', category: 1 },
								{ text: 'Conectarse a redes abiertas desconocidas', category: 1 }
							],
							explanation: 'الممارسة الرقمية الآمنة تقوم على حماية المعطيات والتأكد من المصادر.'
						} as DragDropSpec,
						hard: {
							q: 'Clasifica estos enunciados según correspondan a la Tesis equilibrada o a una Postura extrema a evitar:',
							categories: ['Tesis equilibrada BAC', 'Postura extrema a evitar'],
							items: [
								{ text: 'La tecnología es útil bajo criterio crítico', category: 0 },
								{ text: 'El esfuerzo propio es insustituible', category: 0 },
								{ text: 'Hay que prohibir toda informática escolar', category: 1 },
								{ text: 'Las máquinas piensan mejor que todo docente', category: 1 }
							],
							explanation: 'تقدّر مصححات البكالوريا الرأي المتزن الذي يتجنب الغلو والانبهار الساذج.'
						} as DragDropSpec
					}
				},
				{
					temaUnoPrompt:
						'Escribe una carta formal al director de tu instituto proponiendo una jornada de sensibilización sobre ciberseguridad, privacidad de datos y verificación de fuentes (140 a 180 palabras).',
					temaUnoNotas: [
						'Respetar la estructura formal de la carta (fecha, saludo, usted, despedida).',
						'Explicar la importancia de proteger la huella digital y el respeto a la imagen ajena.',
						'Proponer talleres prácticos guiados por profesores de informática y lenguas.'
					],
					temaDosPrompt:
						'¿Por qué sigue siendo irremplazable la lectura en papel frente a los dispositivos electrónicos durante la preparación del Bachillerato? Argumenta en 140 a 180 palabras.',
					modelAnswer:
						'Orán, 18 de febrero de 2026.\nEstimado Señor Director :\nMe dirijo atentamente a usted para proponer la organización de una jornada escolar dedicada a la seguridad digital y al uso responsable de la información.\nEn la actualidad, muchos alumnos comparten fotografías o datos personales en Internet sin conocer el alcance real de su huella digital ni el riesgo de las noticias falsas. Una charla práctica les enseñaría a crear contraseñas seguras, proteger su privacidad y respetar la imagen de sus compañeros evitando difundir contenidos sin consentimiento.\nEsta actividad podría contar con la participación de nuestros profesores de informática y de idiomas, quienes mostrarían ejemplos concretos de fuentes fiables para estudiar.\nAgradeciendo de antemano su interés por la formación integral del alumnado, le saluda respetuosamente un estudiante de 3AS LE.',
					rubricSummary:
						'Formato de carta formal (1.5) + Coherencia de argumentos (1.5) + Uso correcto de usted y tiempos (1.5) + Léxico y ortografía (1.5).',
					quizzes: {
						easy: {
							q: 'Clasifica los conectores siguientes según expresen Causa o Finalidad:',
							categories: ['Conectores de causa', 'Conectores de finalidad'],
							items: [
								{ text: 'Porque', category: 0 },
								{ text: 'Puesto que', category: 0 },
								{ text: 'Para que', category: 1 },
								{ text: 'Con el fin de', category: 1 }
							],
							explanation: '«Porque / Puesto que» تشرحان السبب، أما «Para que / Con el fin de» فتبينان الغاية.'
						} as DragDropSpec,
						medium: {
							q: 'Clasifica estas propuestas según su tema en Privacidad técnica o Ética comunicativa:',
							categories: ['Privacidad técnica', 'Ética comunicativa'],
							items: [
								{ text: 'Proteger contraseñas privadas', category: 0 },
								{ text: 'Cuidar la huella digital', category: 0 },
								{ text: 'Pedir permiso antes de publicar fotos', category: 1 },
								{ text: 'Evitar burlas anónimas', category: 1 }
							],
							explanation: 'تتفرع المواطنة الرقمية إلى أمن المعطيات واحترام كرامة الآخرين.'
						} as DragDropSpec,
						hard: {
							q: 'Clasifica estas fórmulas de una carta formal según su función:',
							categories: ['Exponer petición con cortesía', 'Despedirse formalmente'],
							items: [
								{ text: 'Me dirijo a usted para solicitar', category: 0 },
								{ text: 'Quisiéramos proponer una jornada', category: 0 },
								{ text: 'Le saluda atentamente', category: 1 },
								{ text: 'Agradeciendo de antemano su atención', category: 1 }
							],
							explanation: 'احترام التدرج الشكلي للرسالة الرسمية يزيد العلامة المنهجية في البكالوريا.'
						} as DragDropSpec
					}
				},
				{
					temaUnoPrompt:
						'Redacta un texto expositivo-argumentativo (140 a 180 palabras) comparando la lectura tradicional en papel con la lectura digital en las pantallas durante el estudio.',
					temaUnoNotas: [
						'Presentar la utilidad de ambos soportes en contextos diferentes.',
						'Señalar por qué el libro impreso favorece la concentración profunda y el subrayado.',
						'Concluir recomendando una combinación inteligente de libros y archivos digitales fiables.'
					],
					temaDosPrompt:
						'«La alfabetización digital es tan necesaria hoy como saber leer y escribir.» ¿Estás de acuerdo? Justifica tu opinión en un ensayo de 140 a 180 palabras.',
					modelAnswer:
						'El avance de los dispositivos electrónicos ha transformado profundamente nuestros hábitos de lectura. Mientras algunos jóvenes prefieren consultar apuntes digitales por su comodidad, muchos estudiantes siguen confiando en el libro impreso para preparar exámenes exigentes.\nPor un lado, el soporte digital destaca por su ligereza y rapidez de búsqueda: permite transportar decenas de diccionarios y consultar artículos actualizados en pocos segundos. No obstante, las notificaciones constantes de las pantallas suelen interrumpir la concentración profunda.\nPor otro lado, el papel invita a leer con pausa, hacer anotaciones al margen y memorizar mejor la estructura visual de cada página sin cansar la vista.\nEn definitiva, ambos formatos no son enemigos: combinar la agilidad de las fuentes digitales fiables con el rigor sereno de los libros impresos constituye la estrategia más eficaz para aprender.',
					rubricSummary:
						'Comparación estructurada (1.5) + Conectores de contraste y síntesis (1.5) + Gramática correcta (1.5) + Vocabulario y puntuación (1.5).',
					quizzes: {
						easy: {
							q: 'Clasifica estas ventajas según pertenezcan al Libro impreso o al Soporte digital:',
							categories: ['Ventajas del libro impreso', 'Ventajas del soporte digital'],
							items: [
								{ text: 'Ausencia de notificaciones distractoras', category: 0 },
								{ text: 'Subrayado y notas al margen', category: 0 },
								{ text: 'Búsqueda instantánea de términos', category: 1 },
								{ text: 'Acceso remoto a archivos científicos', category: 1 }
							],
							explanation: 'الموازنة الموضوعية تمنح كل دعامة مزاياها العملية.'
						} as DragDropSpec,
						medium: {
							q: 'Clasifica estos marcadores discursivos para organizar un texto comparativo:',
							categories: ['Primer polo comparativo', 'Segundo polo y contraste'],
							items: [
								{ text: 'Por un lado', category: 0 },
								{ text: 'En primer lugar', category: 0 },
								{ text: 'Por otro lado', category: 1 },
								{ text: 'En cambio', category: 1 }
							],
							explanation: 'تستعمل «Por un lado / Por otro lado» و«En cambio» لبناء مقالة المقارنة بوضوح.'
						} as DragDropSpec,
						hard: {
							q: 'Clasifica estas oraciones según empleen Pasiva perifrástica o Pasiva refleja:',
							categories: ['Pasiva perifrástica', 'Pasiva refleja'],
							items: [
								{ text: 'Los archivos fueron revisados ayer.', category: 0 },
								{ text: 'La red será protegida pronto.', category: 0 },
								{ text: 'Se revisan las fuentes científicas.', category: 1 },
								{ text: 'Se comparten apuntes útiles.', category: 1 }
							],
							explanation: 'توظيف صيغ المبني للمجهول في الإنشاء يمنح الأسلوب طابعاً أكاديمياً موضوعياً.'
						} as DragDropSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildDragDropPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'III. Expresión escrita',
				points: 6,
				instruction: 'Elige UNO de los dos temas propuestos y redáctalo con claridad y rigor (6 puntos — BAC 3AS LE) :',
				content: [
					buildSpanishWrittenProductionBlock({
						temaUnoTitle: 'Tema 1 (Guiado — 6 pts) :',
						temaUnoPrompt: chosen.temaUnoPrompt,
						temaUnoNotas: chosen.temaUnoNotas,
						temaDosPrompt: chosen.temaDosPrompt,
						modelAnswer: chosen.modelAnswer,
						rubricSummary: chosen.rubricSummary,
						mark: '6'
					})
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't2',
				difficulty,
				domain: 'expresion_escrita',
				examRole: 'written_expression',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'حافظ على موقف حجاجي متزن: إبراز المنافع العلمية للتكنولوجيا مع التنبيه إلى ضوابط الخصوصية والنقد.',
					'وظف أدوات المقارنة والاستدراك (Por un lado / Por otro lado, Sin embargo, No obstante).',
					'راقب علامات التشديد في الكلمات التقنية: tecnología, informática, información, científica, hábito.'
				],
				solutionStepsAr: [
					'الالتزام بالتعليمة والمعطيات الموجهة (1.5 نقطة).',
					'بناء التصميم المقارن أو الرسالة الرسمية بفقرات متماسكة (1.5 نقطة).',
					'توظيف الروابط والمبني للمجهول أو صيغة الشك بسلامة (1.5 نقطة).',
					'دقة المعجم والإملاء والترقيم (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 6. WRITTEN EXPRESSION (6 pts — Integration): Ecología, agua y energías limpias
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_tpl_3as_le_t2_writ_ecologia_futuro',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'expresion_escrita',
		titleAr: 'التعبير الكتابي (6 نقاط — لغات أجنبية): حماية البيئة، ترشيد الماء والطاقات النظيفة',
		curriculumLessonId: 'spa_lesson_3as_le_t2_medio_ambiente_energias',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					temaUnoPrompt:
						'Redacta un artículo de opinión (140 a 180 palabras) sobre la transición hacia la energía solar y el papel de los jóvenes en la protección ambiental de Argelia.',
					temaUnoNotas: [
						'Explicar la ventaja climática del Sáhara argelino y la reducción de emisiones.',
						'Relacionar los proyectos científicos con acciones ciudadanas (reforestación y ahorro de agua).',
						'Concluir subrayando la responsabilidad hacia las generaciones futuras.'
					],
					temaDosPrompt:
						'«Cuidar el agua potable es un deber moral y ciudadano que empieza en cada casa.» Desarrolla esta afirmación en un ensayo argumentado (140 a 180 palabras).',
					modelAnswer:
						'El calentamiento global y la escasez progresiva de lluvias exigen respuestas urgentes y solidarias. En este contexto, impulsar las energías limpias y educar en la sobriedad cotidiana representan dos pilares inseparables.\nEn primer lugar, Argelia cuenta con un recurso solar extraordinario en sus regiones del sur. Aprovechar la energía fotovoltaica y la eólica permite producir electricidad renovable sin contaminar la atmósfera, al mismo tiempo que impulsa la investigación universitaria y genera empleos técnicos para los jóvenes.\nNo obstante, la tecnología energética no basta si descuidamos los gestos diarios. Participar en campañas de reforestación contra la desertificación, evitar los incendios forestales y racionalizar el consumo de agua en cada vivienda son acciones decisivas al alcance de todos.\nEn definitiva, proteger el medio ambiente une ciencia y conciencia moral : solo cuidando hoy la tierra y el agua dejaremos un país habitable a las generaciones futuras.',
					rubricSummary:
						'Tesis ambiental clara (1.5) + Integración de soluciones científicas y cívicas (1.5) + Corrección gramatical (1.5) + Vocabulario ecológico y tildes (1.5).',
					quizzes: {
						easy: {
							q: 'Ordena lógicamente las etapas de un artículo sobre la transición energética:',
							orderedItems: [
								'Presentar el desafío climático actual',
								'Destacar el potencial solar y eólico limpio',
								'Añadir las acciones ciudadanas de ahorro y reforestación',
								'Concluir recordando el deber hacia el futuro'
							],
							explanation: 'تبدأ المقالة بالتشخيص المناخي، ثم الحل الطاقوي، ثم الدور المواطني، وتُختتم بالالتزام تجاه المستقبل.'
						} as OrderingSpec,
						medium: {
							q: 'Ordena estos enunciados para formar un párrafo causal sobre la energía limpia:',
							orderedItems: [
								'Los combustibles fósiles aumentan las emisiones contaminantes.',
								'Por consiguiente, resulta urgente apostar por energías renovables.',
								'En este sentido, la radiación solar del sur ofrece una ventaja única.',
								'Así se logra producir electricidad limpia y crear empleos técnicos.'
							],
							explanation: 'التسلسل السببي: المشكلة (الوقود الأحفوري)، النتيجة (Por consiguiente)، التوضيح (En este sentido)، ثم الأثر الإيجابي.'
						} as OrderingSpec,
						hard: {
							q: 'Ordena estas frases respetando la coherencia de la voz pasiva y los conectores:',
							orderedItems: [
								'Durante años, numerosos suelos fértiles fueron amenazados por la sequía.',
								'Sin embargo, recientemente se han plantado especies autóctonas resistentes.',
								'Gracias a ello, las tierras agrícolas quedan protegidas del viento seco.',
								'En conclusión, la reforestación frena con eficacia la desertificación.'
							],
							explanation: 'انتقال زمني ومنطقي محكم باستعمال المبني للمجهول بنوعيه والروابط المناسبة.'
						} as OrderingSpec
					}
				},
				{
					temaUnoPrompt:
						'Escribe una carta argumentativa al alcalde de tu ciudad proponiendo un plan escolar de reciclaje selectivo y ahorro de agua en los institutos y barrios (140 a 180 palabras).',
					temaUnoNotas: [
						'Adoptar el formato completo de carta formal con lugar, fecha y saludo oficial.',
						'Proponer medidas concretas basadas en las «tres R» (reducir, reutilizar y reciclar).',
						'Mostrar cómo la colaboración entre municipio y estudiantes protege el entorno urbano.'
					],
					temaDosPrompt:
						'¿Por qué combatir el derroche doméstico de alimentos, papel y agua contribuye tanto a la ecología como a la justicia social? Argumenta en 140 a 180 palabras.',
					modelAnswer:
						'Tremecén, 4 de marzo de 2026.\nEstimado Señor Alcalde :\nEn nombre de los estudiantes de nuestro instituto, me dirijo respetuosamente a usted para presentar una propuesta de reciclaje selectivo y ahorro de agua en los centros escolares del municipio.\nObservamos con preocupación que gran cantidad de papel y envases plásticos terminan mezclados en los residuos comunes, mientras algunas fugas en fuentes públicas desperdician agua potable. Por ello, proponemos instalar contenedores diferenciados en cada patio escolar y revisar periódicamente las tuberías municipales.\nAsimismo, los alumnos podríamos organizar brigadas voluntarias de sensibilización para difundir la regla de reducir, reutilizar y reciclar entre las familias del barrio, fortaleciendo la economía circular local.\nEsperando que nuestra iniciativa merezca su amable atención, le saluda atentamente el alumnado de 3AS LE.',
					rubricSummary:
						'Formato formal de carta (1.5) + Propuestas ecológicas concretas (1.5) + Uso correcto de usted y conectores (1.5) + Ortografía y estilo (1.5).',
					quizzes: {
						easy: {
							q: 'Ordena los tres principios ecológicos según el orden lógico de las «tres R»:',
							orderedItems: [
								'Reducir el consumo innecesario desde el origen',
								'Reutilizar envases y hojas siempre que sea posible',
								'Reciclar los materiales separados por tipo',
								'Sensibilizar a la comunidad para consolidar el hábito'
							],
							explanation: 'التسلسل البيئي السليم: تقليص الاستهلاك أولاً، ثم إعادة الاستعمال، ثم التدوير، ثم التوعية.'
						} as OrderingSpec,
						medium: {
							q: 'Ordena las partes de la carta formal enviada al alcalde:',
							orderedItems: [
								'Tremecén, 4 de marzo de 2026. Estimado Señor Alcalde :',
								'Exponer el problema de residuos y fugas de agua',
								'Proponer contenedores selectivos y brigadas escolares',
								'Agradecer la atención y despedirse atentamente'
							],
							explanation: 'التنظيم المنهجي للرسالة البلدية يبدأ بالتاريخ والتحية ثم التشخيص ثم الحل ثم الختام.'
						} as OrderingSpec,
						hard: {
							q: 'Ordena estas ideas para construir una argumentación sobre el agua potable:',
							orderedItems: [
								'El agua dulce es un recurso limitado y cada vez más escaso.',
								'A pesar de ello, todavía se pierde mucha agua por fugas y descuidos.',
								'Por tanto, urge combinar riego por goteo y reparación de redes.',
								'De igual modo, cada ciudadano debe cerrar el grifo sin derrochar.'
							],
							explanation: 'بناء حجاجي محكم من التشخيص إلى التناقض ثم الحل التقني ثم المسؤولية الفردية.'
						} as OrderingSpec
					}
				},
				{
					temaUnoPrompt:
						'Redacta un artículo de concienciación (140 a 180 palabras) explicando las causas de la degradación forestal y proponiendo acciones eficaces para defender nuestros bosques y oasis.',
					temaUnoNotas: [
						'Indicar dos causas principales (olas de calor, negligencia o tala abusiva).',
						'Explicar el papel de las especies autóctonas y la vigilancia ciudadana.',
						'Utilizar conectores de causa, consecuencia y finalidad.'
					],
					temaDosPrompt:
						'«La defensa del medio ambiente requiere tanto leyes firmes como una educación ecológica sólida desde la escuela.» Comenta esta idea en 140 a 180 palabras.',
					modelAnswer:
						'Nuestros bosques y oasis constituyen un escudo vivo contra el calor extremo y la desertificación. Sin embargo, cada año se ven amenazados por las sequías prolongadas, los descuidos humanos con el fuego y la tala abusiva.\nCuando desaparece la cubierta forestal, la lluvia erosiona la tierra fértil y numerosos seres vivos pierden su refugio natural. Para frenar este proceso, resulta imprescindible impulsar campañas de reforestación con especies autóctonas adaptadas al clima seco, tal como se hace al proteger las barreras verdes y las foggaras tradicionales.\nAdemás de las leyes que sancionan la destrucción forestal, la educación ecológica en los institutos enseña a los jóvenes a respetar el entorno y a colaborar en jornadas de plantación.\nEn conclusión, defender cada árbol equivale a proteger el aire limpio, el agua y el futuro agrícola de toda nuestra sociedad.',
					rubricSummary:
						'Causas y soluciones bien articuladas (1.5) + Conectores de causa, efecto y fin (1.5) + Gramática correcta (1.5) + Riqueza léxica (1.5).',
					quizzes: {
						easy: {
							q: 'Ordena la cadena causa-efecto-solución en un texto sobre los bosques:',
							orderedItems: [
								'Causa : descuidos con el fuego y tala abusiva',
								'Efecto : erosión del suelo y avance de la desertificación',
								'Solución técnica : reforestación con especies autóctonas',
								'Solución cívica : educación ecológica y vigilancia escolar'
							],
							explanation: 'التدرج الطبيعي للمقال البيئي: السبب، ثم النتيجة، ثم العلاج التقني والمواطني.'
						} as OrderingSpec,
						medium: {
							q: 'Ordena estos enunciados para formar la conclusión de un artículo ecológico:',
							orderedItems: [
								'En definitiva, proteger el medio ambiente exige compromiso diario.',
								'Tanto las leyes como la escuela cumplen una función esencial.',
								'Si actuamos hoy con responsabilidad, frenaremos el deterioro.',
								'De este modo garantizaremos recursos limpios para el mañana.'
							],
							explanation: 'تجمع الخاتمة التركيبية خلاصة الفكرة، التكامل، الشرط الإيجابي، والأفق المستقبلي.'
						} as OrderingSpec,
						hard: {
							q: 'Ordena las oraciones respetando el uso exacto de los nexos lógicos:',
							orderedItems: [
								'Aunque los veranos son cada vez más secos, aún podemos actuar.',
								'En efecto, la plantación de especies autóctonas fortalece el suelo.',
								'Asimismo, el riego eficiente evita pérdidas innecesarias de agua.',
								'Por ello, ciencia y solidaridad ciudadana deben ir de la mano.'
							],
							explanation: 'تنسيق الروابط: Aunque (اعتراض)، En efecto (إثبات)، Asimismo (إضافة)، Por ello (استنتاج).'
						} as OrderingSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildOrderingPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'III. Expresión escrita',
				points: 6,
				instruction: 'Elige UNO de los dos temas propuestos y redáctalo con coherencia y precisión léxica (6 puntos — BAC 3AS LE) :',
				content: [
					buildSpanishWrittenProductionBlock({
						temaUnoTitle: 'Tema 1 (Guiado — 6 pts) :',
						temaUnoPrompt: chosen.temaUnoPrompt,
						temaUnoNotas: chosen.temaUnoNotas,
						temaDosPrompt: chosen.temaDosPrompt,
						modelAnswer: chosen.modelAnswer,
						rubricSummary: chosen.rubricSummary,
						mark: '6'
					})
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't2',
				difficulty,
				domain: 'expresion_escrita',
				examRole: 'written_expression',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'نظّم أفكارك في البيئة حسب: التشخيص (الأسباب والآثار) ثم الحلول التقنية (طاقات نظيفة، تشجير) ثم الحلول المواطنية.',
					'وظف جملة شرطية من النوع الأول أو الثاني لتعزيز الإقناع (Si protegemos..., garantizaremos...).',
					'تأكد من كتابة التشديد في الكلمات البيئية: energía, eólica, desertificación, ecológico, hídrico.'
				],
				solutionStepsAr: [
					'استيفاء محاور الموضوع المختار (1.5 نقطة).',
					'تسلسل الفقرات وتوظيف الروابط السببية والغائية (1.5 نقطة).',
					'سلامة التصريف، المطابقة، وصيغ المبني للمجهول والشرط (1.5 نقطة).',
					'دقة المعجم البيئي وسلامة الإملاء والترقيم (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	}
];
