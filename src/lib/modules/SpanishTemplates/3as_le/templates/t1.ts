import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildSpanishClassificationTableBlock,
	buildSpanishPassageBlock,
	buildSpanishWordFamilyTableBlock,
	buildSpanishWrittenProductionBlock
} from '../../spanish-helpers';
import { saveSpanishSvgAsset, svgSpanishConjugationChart } from '../../svg-spanish';
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
 * Parameterized Exam & Quiz Templates — Trimestre 1 : Ámbito Personal y Educativo (6 templates)
 * Roles: 2 comprehension (7 pts) + 2 linguistic_competence (7 pts) + 2 written_expression (6 pts)
 */
export const TEMPLATES_3AS_LE_T1: SpanishParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (7 pts): Ámbito Personal — Juventud, esfuerzo y valores
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_tpl_3as_le_t1_comp_juventud_valores',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'comprension_lectora',
		titleAr: 'فهم النص (7 نقاط — لغات أجنبية): الشباب المعاصر، المثابرة والقيم الأخلاقية',
		curriculumLessonId: 'spa_lesson_3as_le_t1_juventud_valores',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Juventud y constancia: construir el futuro desde la disciplina diaria',
					source: 'Adaptado de un ensayo educativo sobre los jóvenes actuales',
					paragraphs: [
						'En una época marcada por la inmediatez y la búsqueda de resultados rápidos, numerosos jóvenes sienten la tentación de confundir el deseo con el logro. Sin embargo, los educadores recuerdan que ningún proyecto sólido nace de la improvisación: detrás de cada meta alcanzada hay horas silenciosas de lectura, revisión y [[perseverancia]].',
						'Lejos de apagar la ilusión juvenil, la disciplina cotidiana la protege y la orienta. Quien organiza su jornada escolar, escucha con respeto los consejos de sus padres y acepta corregir sus propios errores desarrolla una madurez serena que resiste cualquier tropiezo. De este modo, el esfuerzo constante transforma los sueños en competencias reales.',
						'Además, la verdadera valía de un estudiante no se mide solo por sus calificaciones individuales, sino por su actitud solidaria en el aula y en su barrio. Cuando los jóvenes unen rigor intelectual y [[compromiso ético]], se convierten en pilares de confianza para toda la sociedad.'
					],
					glossary: [
						{ term: 'inmediatez', meaning: 'deseo de obtener algo al instante, sin espera' },
						{ term: 'tropiezo', meaning: 'dificultad o fallo temporal en un camino' }
					],
					mainIdeaHeader: '1. La idea principal del texto destaca que :',
					mainIdeaOptions: [
						'La disciplina diaria y los valores solidarios convierten los sueños juveniles en logros duraderos',
						'Los jóvenes deben abandonar sus estudios ante la primera dificultad',
						'La improvisación garantiza mejores resultados que la constancia'
					],
					mainIdeaCorrect:
						'La disciplina diaria y los valores solidarios convierten los sueños juveniles en logros duraderos',
					tfItems: [
						{
							q: 'El ritmo actual lleva a algunos jóvenes a confundir un simple deseo con un logro real.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'Según el texto, la disciplina destruye la ilusión de los estudiantes.',
							a: 'Falso',
							c: 'Lejos de apagar la ilusión juvenil, la disciplina cotidiana la protege y la orienta (§2).',
							mark: '0.5'
						},
						{
							q: 'Escuchar a los padres y corregir los propios errores fortalece la madurez del joven.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'Para el autor, las notas individuales son el único criterio del valor de un joven.',
							a: 'Falso',
							c: 'También se mide por su actitud solidaria y su compromiso ético en el aula y en su barrio (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) ¿Qué distingue el éxito duradero de la simple improvisación según el primer párrafo?',
							a: 'Detrás de todo logro sólido hay horas silenciosas de lectura, revisión y perseverancia, y no resultados instantáneos.',
							mark: '0.75'
						},
						{
							q: 'b) Cita dos actitudes concretas que ayudan al estudiante a alcanzar la madurez (§2).',
							a: 'Organizar la jornada escolar, escuchar con respeto a los padres y aceptar corregir los propios errores.',
							mark: '1'
						},
						{
							q: 'c) ¿Por qué asocia el autor el rigor intelectual con la solidaridad al final del texto?',
							a: 'Porque ambos elementos unidos convierten a los jóvenes en ciudadanos responsables y pilares de confianza social.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «perseverancia» (indica su sentido contextual en §1)   b) «compromiso ético» (§3)',
					refAnswer:
						'a) «perseverancia» alude a la constancia firme y prolongada en el estudio y el trabajo.   b) «compromiso ético» remite a la conducta honesta, solidaria y responsable del joven hacia su entorno.',
					synthPrompt:
						'En tu opinión, ¿por qué la constancia diaria resulta más decisiva que el talento aislado para triunfar en el Bachillerato? Responde en cuatro o cinco líneas.',
					synthAnswer:
						'Desde mi punto de vista, la constancia diaria es el factor determinante del éxito académico porque el talento sin método suele dispersarse ante el cansancio. En cambio, quien repasa cada día con paciencia corrige sus lagunas a tiempo y llega al examen con serenidad y confianza.',
					quizzes: {
						easy: {
							q: 'Según el párrafo 1, ¿qué exige todo proyecto sólido detrás de cada meta alcanzada?',
							correct: 'Horas silenciosas de lectura, revisión y perseverancia',
							wrong: [
								'Improvisación rápida sin planificación',
								'Espera pasiva de resultados inmediatos',
								'Abandono del estudio en equipo'
							],
							explanation: 'النص يوضح في الفقرة الأولى أن النجاح الحقيقي يرتكز على القراءة والمراجعة والمثابرة.'
						} as McqSpec,
						medium: {
							q: '¿Cuál es el papel de la disciplina cotidiana según el párrafo 2 del texto?',
							correct: 'Proteger y orientar la ilusión juvenil transformando los sueños en competencias reales',
							wrong: [
								'Suprimir las metas personales del alumnado',
								'Evitar el diálogo respetuoso con los padres',
								'Limitar el aprendizaje a la memorización sin sentido'
							],
							explanation: 'تبرز الفقرة الثانية أن الانضباط يحمي الطموح ويوجهه نحو كفاءات حقيقية.'
						} as McqSpec,
						hard: {
							q: '¿Qué relación conceptual establece el párrafo 3 entre calificaciones escolares y compromiso ético?',
							correct: 'Son complementarios: el rigor intelectual alcanza su plenitud unido a la solidaridad social',
							wrong: [
								'El compromiso ético sustituye por completo al estudio académico',
								'Las calificaciones individuales impiden cualquier acción solidaria',
								'El autor rechaza el esfuerzo escolar en el instituto'
							],
							explanation: 'يجمع الكاتب في الخاتمة بين التفوق الفكري والالتزام الأخلاقي التضامني.'
						} as McqSpec
					}
				},
				{
					title: 'El voluntariado juvenil en Argelia: escuela de empatía y responsabilidad',
					source: 'Adaptado de una crónica juvenil mediterránea',
					paragraphs: [
						'Cada fin de semana, decenas de estudiantes argelinos de secundaria y universidad se reúnen en asociaciones locales para organizar clases de apoyo escolar, limpiar espacios verdes o distribuir libros en barrios populares. Lejos de ser una simple ocupación pasajera, [[esta labor voluntaria]] despierta una conciencia cívica profunda.',
						'Al colaborar con vecinos y mayores, el joven descubre realidades diversas y comprende que su bienestar personal está unido al progreso de su comunidad. Quienes participan en campañas solidarias aprenden a escuchar, a coordinar tareas en grupo y a administrar su tiempo sin descuidar sus obligaciones académicas.',
						'En definitiva, el voluntariado forja ciudadanos activos que no se limitan a señalar los problemas, sino que aportan [[soluciones prácticas]] con generosidad y humildad.'
					],
					glossary: [
						{ term: 'empatía', meaning: 'capacidad de comprender y compartir las necesidades del prójimo' },
						{ term: 'forjar', meaning: 'formar y fortalecer el carácter mediante la experiencia' }
					],
					mainIdeaHeader: '1. El texto tiene como propósito principal :',
					mainIdeaOptions: [
						'Valorar el voluntariado juvenil como escuela de empatía, organización y ciudadanía activa',
						'Desaconsejar la colaboración entre estudiantes y asociaciones locales',
						'Criticar la existencia de bibliotecas en los barrios populares'
					],
					mainIdeaCorrect:
						'Valorar el voluntariado juvenil como escuela de empatía, organización y ciudadanía activa',
					tfItems: [
						{
							q: 'Las actividades voluntarias incluyen apoyo escolar, cuidado ambiental y difusión de libros.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'Participar en el voluntariado impide al estudiante cumplir con sus deberes escolares.',
							a: 'Falso',
							c: 'Los voluntarios aprenden a administrar su tiempo sin descuidar sus obligaciones académicas (§2).',
							mark: '0.5'
						},
						{
							q: 'El trabajo en asociación ayuda a los jóvenes a coordinar tareas en equipo.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'Los voluntarios se limitan a criticar los problemas sociales sin actuar.',
							a: 'Falso',
							c: 'No se limitan a señalar los problemas, sino que aportan soluciones prácticas (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Enumera tres acciones concretas realizadas por los jóvenes voluntarios en el párrafo 1.',
							a: 'Organizar clases de apoyo escolar, limpiar espacios verdes y distribuir libros en barrios populares.',
							mark: '1'
						},
						{
							q: 'b) ¿Qué competencias personales desarrolla el joven mediante la colaboración comunitaria (§2)?',
							a: 'Aprende a escuchar, a coordinar tareas en grupo y a gestionar mejor su tiempo.',
							mark: '0.75'
						},
						{
							q: 'c) Explica el contraste expresado al final del texto con «no se limitan a..., sino que...» (§3).',
							a: 'Contrasta la actitud pasiva de quien solo critica con la actitud constructiva de quien propone y ejecuta soluciones prácticas.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «esta labor voluntaria» (§1)   b) «soluciones prácticas» (§3)',
					refAnswer:
						'a) «esta labor voluntaria» se refiere a las acciones de apoyo escolar, limpieza ambiental y distribución de libros.   b) «soluciones prácticas» alude a las iniciativas concretas y solidarias que los jóvenes aplican en su comunidad.',
					synthPrompt:
						'¿Consideras que el trabajo voluntario durante la etapa escolar prepara mejor al estudiante para su futura vida profesional? Justifica tu respuesta en cuatro o cinco líneas.',
					synthAnswer:
						'Sí, estoy convencido de que el voluntariado prepara eficazmente para la vida profesional. Por una parte, fomenta el sentido de la responsabilidad, la puntualidad y el trabajo en equipo. Por otra parte, enseña a comunicarse con respeto y a resolver problemas reales con iniciativa.',
					quizzes: {
						easy: {
							q: '¿Qué actividades realizan los jóvenes voluntarios los fines de semana según el párrafo 1?',
							correct: 'Apoyo escolar, limpieza de espacios verdes y distribución de libros',
							wrong: [
								'Competiciones comerciales privadas',
								'Viajes turísticos sin propósito social',
								'Actividades aisladas frente a pantallas'
							],
							explanation: 'تذكر الفقرة الأولى بوضوح ثلاث مبادرات تطوعية للشباب في الأحياء.'
						} as McqSpec,
						medium: {
							q: '¿A qué se refiere la expresión «esta labor voluntaria» en el primer párrafo?',
							correct: 'A las campañas juveniles de apoyo escolar, cuidado ecológico y reparto de libros',
							wrong: [
								'Al descanso obligatorio durante las vacaciones',
								'A los exámenes oficiales de fin de curso',
								'A la compra de teléfonos inteligentes'
							],
							explanation: 'تحيل عبارة «esta labor voluntaria» إلى الأنشطة المذكورة في الجملة الأولى.'
						} as McqSpec,
						hard: {
							q: '¿Qué función cumple la estructura «no se limitan a..., sino que...» en la conclusión (§3)?',
							correct: 'Resaltar el paso de la queja estéril a la acción ciudadana constructiva y solidaria',
							wrong: [
								'Indicar que los voluntarios descuidan sus estudios',
								'Expresar duda sobre la utilidad del trabajo en grupo',
								'Narrar un suceso histórico del siglo XIV'
							],
							explanation: 'تبرز الصيغة الحجاجية «no ... sino que» المقابلة بين الاكتفاء بالنقد والمبادرة العملية.'
						} as McqSpec
					}
				},
				{
					title: 'Los valores cívicos frente a la prisa moderna: paciencia, respeto y ejemplo',
					source: 'Adaptado de una reflexión pedagógica contemporánea',
					paragraphs: [
						'En las ciudades modernas, la aceleración de la vida diaria suele reducir los momentos de diálogo sereno entre generaciones. Algunos observadores temen que la prisa constante debilite gestos esenciales como escuchar al mayor, ceder el paso o agradecer con sinceridad un servicio recibido.',
						'No obstante, la experiencia escolar y familiar demuestra que los valores cívicos no pertenecen al pasado, sino que se renuevan cuando los adultos ofrecen [[un ejemplo coherente]]. Un joven aprende más de la honradez cotidiana que observa en casa y en el aula que de largos discursos teóricos desprovistos de práctica.',
						'Cultivar la cortesía, la paciencia y la integridad moral sigue siendo el cimiento indispensable para que [[nuestra convivencia]] sea armoniosa, justa y digna de confianza.'
					],
					glossary: [
						{ term: 'cívico', meaning: 'propio del ciudadano respetuoso con los derechos y deberes comunes' },
						{ term: 'cimiento', meaning: 'base firme sobre la que se construye un edificio o un proyecto' }
					],
					mainIdeaHeader: '1. Este documento reflexiona principalmente sobre :',
					mainIdeaOptions: [
						'La vigencia de los valores cívicos y el poder del ejemplo coherente en la educación juvenil',
						'La necesidad de suprimir el diálogo entre generaciones',
						'La superioridad de los discursos teóricos sobre los actos honestos'
					],
					mainIdeaCorrect:
						'La vigencia de los valores cívicos y el poder del ejemplo coherente en la educación juvenil',
					tfItems: [
						{
							q: 'La prisa de las ciudades modernas favorece siempre el diálogo sereno entre generaciones.',
							a: 'Falso',
							c: 'La aceleración de la vida diaria suele reducir los momentos de diálogo sereno (§1).',
							mark: '0.5'
						},
						{
							q: 'El autor sostiene que los valores cívicos han perdido toda utilidad en el presente.',
							a: 'Falso',
							c: 'Afirma que no pertenecen al pasado, sino que se renuevan mediante el ejemplo coherente (§2).',
							mark: '0.5'
						},
						{
							q: 'La conducta honesta diaria educa mejor que los discursos teóricos sin práctica.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'La cortesía, la paciencia y la integridad sostienen una convivencia justa.',
							a: 'Verdadero',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) ¿Qué consecuencias negativas puede acarrear la prisa moderna según el párrafo 1?',
							a: 'Puede reducir el diálogo entre generaciones y debilitar gestos cívicos como escuchar al mayor, ceder el paso o agradecer.',
							mark: '1'
						},
						{
							q: 'b) ¿Qué papel desempeña el ejemplo de los adultos frente a los discursos teóricos (§2)?',
							a: 'Un ejemplo coherente y honesto en casa y en el aula educa con mucha mayor eficacia que las teorías sin práctica.',
							mark: '0.75'
						},
						{
							q: 'c) Cita los tres valores destacados en el cierre del texto como base de la convivencia (§3).',
							a: 'La cortesía, la paciencia y la integridad moral.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «un ejemplo coherente» (§2)   b) «nuestra convivencia» (§3)',
					refAnswer:
						'a) «un ejemplo coherente» remite a la concordancia entre lo que los adultos predican y la honradez práctica de sus actos.   b) «nuestra convivencia» alude a la vida compartida en armonía dentro de la familia, la escuela y la sociedad.',
					synthPrompt:
						'¿Por qué crees que los pequeños gestos diarios de cortesía y respeto siguen siendo esenciales en la sociedad actual? Desarrolla tu respuesta en cuatro o cinco líneas.',
					synthAnswer:
						'Creo firmemente que la cortesía y el respeto diario humanizan la vida en común, especialmente en épocas de prisa. Un saludo amable, saber escuchar y cumplir la palabra dada evitan tensiones innecesarias, fortalecen la confianza mutua y convierten la escuela y la ciudad en espacios acogedores.',
					quizzes: {
						easy: {
							q: 'Según el párrafo 2, ¿de qué aprende más un joven en materia de valores?',
							correct: 'De la honradez cotidiana y el ejemplo coherente que observa en casa y en el aula',
							wrong: [
								'De discursos teóricos alejados de la práctica',
								'De la prisa y la falta de diálogo familiar',
								'De evitar cualquier norma de cortesía'
							],
							explanation: 'تؤكد الفقرة الثانية أثر القدوة الصادقة مقارنة بالكلام النظري المجرد.'
						} as McqSpec,
						medium: {
							q: '¿Qué valor gramatical y argumentativo tiene el conector «No obstante» al inicio del párrafo 2?',
							correct: 'Introduce una refutación o contraste frente al temor expresado en el párrafo 1',
							wrong: [
								'Enumera una lista cronológica de siglos pasados',
								'Expresa una causa técnica de contaminación',
								'Formula una pregunta retórica sin respuesta'
							],
							explanation: 'يرد الرابط «No obstante» للانتقال من مخاوف العصر إلى إثبات حيوية القيم بالقدوة.'
						} as McqSpec,
						hard: {
							q: '¿Qué significado posee la metáfora «cimiento indispensable» en la conclusión del texto (§3)?',
							correct: 'Base moral sólida sin la cual no puede sostenerse una convivencia justa y armoniosa',
							wrong: [
								'Un simple adorno superficial sin importancia real',
								'Una construcción arquitectónica exclusivamente antigua',
								'Un obstáculo para la educación juvenil'
							],
							explanation: 'تشبيه القيم بالأساس المتين (cimiento) يبرز ضرورتها لثبات التعايش الاجتماعي.'
						} as McqSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const spec = chosen.quizzes[difficulty];
			const { quizQuestion, finalAnswer } = buildMcqPayload(
				spec,
				`فهم النص BAC 3AS LE («${chosen.title}»): اختر الإجابة الصحيحة`,
				'عد إلى الفقرة المشار إليها في النص وتحقق من الفكرة أو الدلالة السياقية الدقيقة.',
				rng
			);

			const openAnswer = chosen.openQuestions.map((x) => `${x.q.slice(0, 2)} ${x.a}`).join('\n');

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
						answer: openAnswer,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `4. Precisa a qué remiten o qué significan en el texto las expresiones subrayadas :\n${chosen.refPrompt}`,
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
				trimesterId: 't1',
				difficulty,
				domain: 'comprension_lectora',
				examRole: 'comprehension',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'في أسئلة Verdadero / Falso، لا تنس تعليل كل عبارة خاطئة بجملة واضحة من النص.',
					'ميّز بين أدوات الاستدراك (Sin embargo, No obstante) لاستخلاص أطروحة الكاتب الحقيقية.',
					'في سؤال التفكير الشخصي (4–5 أسطر)، ابدأ بعبارة رأي رصينة وادعم موقفك بحجتين.'
				],
				solutionStepsAr: [
					'تحديد الفكرة الرئيسية للنص (0.5 نقطة).',
					'الحكم والتبرير النصي في عبارات الصواب والخطأ (2 نقطتان).',
					'الإجابة التحليلية عن أسئلة الفهم الثلاثة (2.5 نقطة).',
					'فك الإحالات النصية وصياغة الرأي الشخصي (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. COMPREHENSION (7 pts): Ámbito Educativo — Educación, lectura e idiomas
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_tpl_3as_le_t1_comp_educacion_idiomas',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'comprension_lectora',
		titleAr: 'فهم النص (7 نقاط — لغات أجنبية): التربية، المطالعة وتعلّم اللغات الأجنبية',
		curriculumLessonId: 'spa_lesson_3as_le_t1_educacion_idiomas',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Aprender idiomas extranjeros para dialogar sin olvidar las raíces',
					source: 'Adaptado de un artículo sobre el plurilingüismo en el Magreb',
					paragraphs: [
						'Cada año, miles de bachilleres eligen la especialidad de Lenguas Extranjeras atraídos por la posibilidad de conocer otras culturas y acceder a obras científicas universales. Quienes dudan de [[esta vocación]] suelen temer que el estudio de idiomas como el español o el inglés debilite el dominio de la lengua materna.',
						'Sin embargo, la lingüística moderna demuestra justamente lo contrario: comparar estructuras gramaticales, matices léxicos y refranes de distintas tradiciones afina la conciencia del propio idioma. Para traducir con fidelidad un pensamiento árabe al español, el estudiante necesita primero comprender con hondura su lengua de origen.',
						'De este modo, los idiomas extranjeros actúan como puentes de diálogo y respeto mutuo. Lejos de borrar la identidad, [[el plurilingüismo]] la proyecta con serenidad hacia el mundo y prepara traductores, docentes y mediadores culturales competentes.'
					],
					glossary: [
						{ term: 'vocación', meaning: 'inclinación sincera hacia un ámbito de estudio o profesión' },
						{ term: 'hondura', meaning: 'profundidad intelectual y dominio serio' }
					],
					mainIdeaHeader: '1. Según el texto, el aprendizaje de lenguas extranjeras :',
					mainIdeaOptions: [
						'Refuerza el conocimiento de la lengua materna y favorece el diálogo cultural',
						'Obliga al estudiante a renunciar a su identidad cultural',
						'Resulta útil únicamente para memorizar listas aisladas de palabras'
					],
					mainIdeaCorrect:
						'Refuerza el conocimiento de la lengua materna y favorece el diálogo cultural',
					tfItems: [
						{
							q: 'Algunos escépticos temen que aprender varios idiomas debilite la lengua materna.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'La lingüística moderna confirma que comparar idiomas empeora la propia lengua.',
							a: 'Falso',
							c: 'Demuestra lo contrario: comparar estructuras y matices afina la conciencia del propio idioma (§2).',
							mark: '0.5'
						},
						{
							q: 'Traducir con fidelidad exige comprender profundamente la lengua de origen.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'Según la conclusión, el plurilingüismo destruye la identidad nacional.',
							a: 'Falso',
							c: 'Lejos de borrar la identidad, la proyecta con serenidad hacia el mundo (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) ¿Qué dos beneficios atraen a los estudiantes hacia la rama de Lenguas Extranjeras (§1)?',
							a: 'Conocer otras culturas y acceder a obras científicas universales.',
							mark: '0.75'
						},
						{
							q: 'b) Explica por qué la traducción fortalece también la lengua materna (§2).',
							a: 'Porque para traducir con exactitud un pensamiento árabe al español hay que dominar primero los matices de la propia lengua.',
							mark: '1'
						},
						{
							q: 'c) ¿Qué tres perfiles profesionales menciona el texto en su cierre (§3)?',
							a: 'Traductores, docentes y mediadores culturales competentes.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «esta vocación» (§1)   b) «el plurilingüismo» (§3)',
					refAnswer:
						'a) «esta vocación» remite a la elección de estudiar la especialidad de Lenguas Extranjeras.   b) «el plurilingüismo» alude al dominio equilibrado de la lengua materna junto con varias lenguas extranjeras.',
					synthPrompt:
						'Como estudiante de Lenguas Extranjeras, ¿qué ventajas concretas aporta el dominio del español a tu formación cultural y académica? Responde en cuatro o cinco líneas.',
					synthAnswer:
						'Dominar el español me permite leer directamente textos históricos y científicos sobre el Mediterráneo y el legado andalusí sin intermediarios. Además, enriquece mi capacidad de expresión y análisis comparativo, abriéndome horizontes en la enseñanza, la traducción y la investigación universitaria.',
					quizzes: {
						easy: {
							q: 'La lingüística moderna demuestra que estudiar varios idiomas debilita inevitablemente el dominio de la lengua materna.',
							correctAnswer: false,
							explanation: 'خطأ: تبيّن الفقرة الثانية أن مقارنة اللغات تصقل الوعي باللغة الأم وتعزز إتقانها.'
						} as TfSpec,
						medium: {
							q: 'En el párrafo 2, el autor señala que para traducir fielmente del árabe al español es indispensable dominar primero la lengua de origen.',
							correctAnswer: true,
							explanation: 'صحيح: الترجمة الأمينة تتطلب أولاً فهماً عميقاً للغة الأصلية قبل النقل إلى الإسبانية.'
						} as TfSpec,
						hard: {
							q: 'En la conclusión del texto, el plurilingüismo se presenta como una amenaza inevitable contra la identidad cultural de los bachilleres.',
							correctAnswer: false,
							explanation: 'خطأ: تؤكد الخاتمة أن التعدد اللغوي يصون الهوية ويبني جسور الحوار الحضاري.'
						} as TfSpec
					}
				},
				{
					title: 'La biblioteca escolar y la lectura profunda en la era digital',
					source: 'Adaptado de una revista pedagógica de enseñanza secundaria',
					paragraphs: [
						'Aunque las pantallas ofrecen información inmediata, nada reemplaza el silencio fecundo de una biblioteca escolar bien cuidada. Frente al hábito de leer frases sueltas con prisa, abrir un libro completo invita a detenerse, seguir un razonamiento extenso y saborear la precisión de cada palabra.',
						'Los docentes observan que el alumnado habituado a [[esta lectura pausada]] redacta con mayor claridad, comete menos faltas ortográficas y distingue con facilidad las ideas principales de los simples ejemplos. Leer de manera profunda no es perder el tiempo: es entrenar la atención para pensar con autonomía.',
						'Por ello, revitalizar las bibliotecas de los institutos y organizar clubes semanales de comentario de textos constituye [[una inversión educativa]] urgente para formar lectores críticos y exigentes.'
					],
					glossary: [
						{ term: 'fecundo', meaning: 'productivo, enriquecedor para el espíritu' },
						{ term: 'autonomía', meaning: 'capacidad de pensar y aprender por uno mismo' }
					],
					mainIdeaHeader: '1. El propósito central del texto es :',
					mainIdeaOptions: [
						'Defender la lectura profunda y el papel insustituible de la biblioteca escolar en la formación crítica',
						'Prohibir completamente el uso educativo de las herramientas digitales',
						'Reducir la enseñanza secundaria a la consulta de frases breves'
					],
					mainIdeaCorrect:
						'Defender la lectura profunda y el papel insustituible de la biblioteca escolar en la formación crítica',
					tfItems: [
						{
							q: 'La lectura de libros completos ayuda a seguir un razonamiento extenso y valorar el vocabulario preciso.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'Quienes practican la lectura pausada suelen cometer más faltas ortográficas.',
							a: 'Falso',
							c: 'Redactan con mayor claridad y cometen menos faltas ortográficas (§2).',
							mark: '0.5'
						},
						{
							q: 'Para el autor, la lectura profunda entrena la atención y el pensamiento autónomo.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'El texto propone cerrar las bibliotecas de los institutos por ser obsoletas.',
							a: 'Falso',
							c: 'Propone revitalizarlas y organizar clubes semanales de comentario de textos (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) ¿Qué diferencia señala el párrafo 1 entre el consumo apresurado de pantallas y la lectura de un libro completo?',
							a: 'Las pantallas acostumbran a leer frases sueltas con prisa, mientras que el libro completo invita a detenerse, seguir razonamientos largos y apreciar el léxico preciso.',
							mark: '1'
						},
						{
							q: 'b) Menciona tres mejoras concretas observadas en los alumnos que leen con profundidad (§2).',
							a: 'Redactan con mayor claridad, cometen menos errores ortográficos y distinguen las ideas principales de los ejemplos.',
							mark: '0.75'
						},
						{
							q: 'c) ¿Qué dos iniciativas propone el autor en la conclusión para impulsar la lectura en los institutos (§3)?',
							a: 'Revitalizar las bibliotecas escolares y crear clubes semanales de comentario de textos.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «esta lectura pausada» (§2)   b) «una inversión educativa» (§3)',
					refAnswer:
						'a) «esta lectura pausada» se refiere al hábito de leer libros completos con calma, atención y rigor.   b) «una inversión educativa» remite a la revitalización de las bibliotecas escolares y a los clubes semanales de lectura.',
					synthPrompt:
						'¿Crees que un club de lectura en tu instituto ayudaría a mejorar tu nivel en español y otras lenguas? Argumenta en cuatro o cinco líneas.',
					synthAnswer:
						'Sin duda, un club semanal de lectura en español sería muy provechoso para todos los alumnos. Compartir comentarios sobre un artículo o un relato breve motiva a leer con regularidad, amplía el vocabulario activo y fortalece la seguridad al expresarse tanto por escrito como oralmente.',
					quizzes: {
						easy: {
							q: 'Según el texto, los estudiantes acostumbrados a leer libros completos cometen menos faltas ortográficas y redactan con mayor claridad.',
							correctAnswer: true,
							explanation: 'صحيح: تؤكد الفقرة الثانية تحسن الإملاء ووضوح التعبير لدى محبي القراءة المتأنية.'
						} as TfSpec,
						medium: {
							q: 'El autor afirma en el párrafo 2 que dedicar tiempo a la lectura profunda es una pérdida innecesaria frente al Bachillerato.',
							correctAnswer: false,
							explanation: 'خطأ: يصرّح الكاتب أن القراءة العميقة تدريب للانتباه وليست مضيعة للوقت.'
						} as TfSpec,
						hard: {
							q: 'En el párrafo 3, el autor califica la revitalización de bibliotecas y clubes de texto como una inversión educativa para formar lectores críticos.',
							correctAnswer: true,
							explanation: 'صحيح: تدعو الخاتمة إلى إحياء المكتبات المدرسية وإنشاء نوادي المطالعة لتحقيق النقد الواعي.'
						} as TfSpec
					}
				},
				{
					title: 'La herencia educativa de Cheikh Ben Badis y las escuelas reformistas',
					source: 'Adaptado de un estudio sobre historia cultural de Argelia',
					paragraphs: [
						'A comienzos del siglo XX, cuando el acceso a la enseñanza libre sufría severas trabas, el sabio argelino Cheikh Abdelhamid Ben Badis comprendió que la dignidad de un pueblo empieza en la escuela. En Constantina, junto con educadores íntegros como Cheikh Mohamed Bachir El-Ibrahimi, impulsó una red de escuelas libres donde la juventud aprendía lengua árabe, historia nacional, ciencias y valores morales.',
						'Lejos de encerrar la educación entre cuatro paredes, [[aquellos maestros]] cultivaron también el periodismo formativo mediante revistas como Al-Chihab y El-Bassaïr. Sus aulas formaron generaciones disciplinadas que unían el amor al saber con la conciencia cívica y el respeto a la verdad.',
						'Recordar hoy [[ese impulso pedagógico]] invita a cada estudiante actual a valorar el privilegio de estudiar en libertad y a honrar las aulas mediante el esfuerzo sincero.'
					],
					glossary: [
						{ term: 'traba', meaning: 'obstáculo o prohibición que dificulta una labor' },
						{ term: 'íntegro', meaning: 'persona recta, honesta y fiel a sus principios' }
					],
					mainIdeaHeader: '1. El texto destaca principalmente :',
					mainIdeaOptions: [
						'El proyecto educativo y cívico de Cheikh Ben Badis y los educadores reformistas como ejemplo vigente',
						'El rechazo de las ciencias y las bibliotecas en Constantina',
						'La desaparición completa de las revistas educativas en el siglo XX'
					],
					mainIdeaCorrect:
						'El proyecto educativo y cívico de Cheikh Ben Badis y los educadores reformistas como ejemplo vigente',
					tfItems: [
						{
							q: 'Cheikh Abdelhamid Ben Badis y Cheikh Mohamed Bachir El-Ibrahimi impulsaron escuelas libres en Argelia.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'En aquellas escuelas se enseñaba únicamente música y entretenimiento.',
							a: 'Falso',
							c: 'Se enseñaba lengua árabe, historia nacional, ciencias y valores morales (§1).',
							mark: '0.5'
						},
						{
							q: 'Revistas como Al-Chihab y El-Bassaïr prolongaron la labor educativa fuera del aula.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'Según el cierre, este legado educativo no aporta ninguna lección al estudiante de hoy.',
							a: 'Falso',
							c: 'Invita a cada estudiante actual a valorar la educación y esforzarse con sinceridad (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) ¿Qué materias y valores se impartían en las escuelas libres impulsadas en Constantina (§1)?',
							a: 'Lengua árabe, historia nacional, ciencias y valores morales.',
							mark: '0.75'
						},
						{
							q: 'b) ¿Qué papel desempeñaron las publicaciones Al-Chihab y El-Bassaïr junto a las escuelas (§2)?',
							a: 'Actuaron como medio de periodismo formativo que prolongó la labor educativa más allá de las aulas.',
							mark: '1'
						},
						{
							q: 'c) ¿Qué deber ético sugiere la conclusión del texto para el alumnado contemporáneo (§3)?',
							a: 'Valorar el privilegio de estudiar en libertad y honrar las aulas mediante un esfuerzo sincero.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «aquellos maestros» (§2)   b) «ese impulso pedagógico» (§3)',
					refAnswer:
						'a) «aquellos maestros» refiere a Cheikh Abdelhamid Ben Badis, Cheikh Mohamed Bachir El-Ibrahimi y los educadores de las escuelas libres.   b) «ese impulso pedagógico» alude al proyecto educativo, cultural y periodístico reformista del siglo XX.',
					synthPrompt:
						'¿De qué modo puede el ejemplo de los educadores históricos argelinos inspirar la actitud de un alumno de 3AS frente a sus estudios? Responde en cuatro o cinco líneas.',
					synthAnswer:
						'El ejemplo de educadores como Cheikh Ben Badis demuestra que el estudio requiere constancia, rectitud moral y amor por la cultura propia. Si ellos enseñaron y fundaron escuelas en condiciones muy difíciles, nosotros debemos aprovechar con gratitud y disciplina las oportunidades educativas actuales.',
					quizzes: {
						easy: {
							q: 'Cheikh Abdelhamid Ben Badis impulsó escuelas libres desde Constantina junto a educadores como Cheikh Mohamed Bachir El-Ibrahimi.',
							correctAnswer: true,
							explanation: 'صحيح: تذكر الفقرة الأولى دور الشيخ عبد الحميد بن باديس والشيخ البشير الإبراهيمي في تأسيس المدارس الحرة.'
						} as TfSpec,
						medium: {
							q: 'Las escuelas libres mencionadas en el texto prohibían el estudio de las ciencias y de la historia nacional.',
							correctAnswer: false,
							explanation: 'خطأ: تدرّس هذه المدارس اللغة العربية والتاريخ الوطني والعلوم والقيم الأخلاقية.'
						} as TfSpec,
						hard: {
							q: 'Al calificar la prensa reformista de «periodismo formativo», el texto subraya que las revistas Al-Chihab y El-Bassaïr extendían la misión educativa fuera del aula.',
							correctAnswer: true,
							explanation: 'صحيح: جمعت الصحافة الإصلاحية بين الإخبار والتربية الفكرية والأخلاقية.'
						} as TfSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const spec = chosen.quizzes[difficulty];
			const { quizQuestion, finalAnswer } = buildTfPayload(spec);
			const openAnswer = chosen.openQuestions.map((x) => `${x.q.slice(0, 2)} ${x.a}`).join('\n');

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Comprensión del texto',
				points: 7,
				instruction: 'Lee atentamente el texto y responde con rigor a las preguntas (7 puntos — BAC 3AS LE) :',
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
						content: `3. Responde a las siguientes preguntas de comprensión :\n${chosen.openQuestions.map((x) => x.q).join('\n')}`,
						answer: openAnswer,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `4. Identifica a qué aluden las expresiones subrayadas :\n${chosen.refPrompt}`,
						answer: chosen.refAnswer,
						mark: '1'
					},
					{
						type: 'text',
						content: `5. Opinión argumentada : ${chosen.synthPrompt}`,
						answer: chosen.synthAnswer,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't1',
				difficulty,
				domain: 'comprension_lectora',
				examRole: 'comprehension',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'في أسئلة التبرير، اقتبس الجملة الدالة من الفقرة المشار إليها أو صُغ معناها بإسبانية سليمة.',
					'تأكد من فهم الضمائر وأسماء الإشارة العائدة (esta vocación, aquellos maestros) بالعودة للجملة السابقة.',
					'احترم حجم الإجابة المطلوب في سؤال الرأي (4 إلى 5 أسطر) وتجنب التكرار.'
				],
				solutionStepsAr: [
					'تحديد الفكرة الرئيسية (0.5 نقطة).',
					'تصنيف وتصحيح عبارات الصواب والخطأ (2 نقطتان).',
					'الإجابة عن أسئلة التحليل النصي الثلاثة (2.5 نقطة).',
					'تحديد المرجع النصي وكتابة الرأي المعلل (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. LINGUISTIC COMPETENCE (7 pts): Morfología BAC, léxico y derivación
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_tpl_3as_le_t1_ling_morfologia_lexico',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'lexico_morfologia',
		titleAr: 'الكفاءة اللغوية (7 نقاط — لغات أجنبية): الاشتقاق الثلاثي، المرادفات والأضداد في السياق',
		curriculumLessonId: 'spa_lesson_3as_le_t1_morfologia_sinonimos_antonimos',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					classPrompt:
						'1. Clasifica los siguientes conceptos según pertenezcan al Ámbito Personal o al Ámbito Educativo : perseverancia - biblioteca - honradez - diccionario - autodisciplina - traducción.',
					classCols: [
						{ header: 'Valores personales', items: ['perseverancia', 'honradez', 'autodisciplina'], mark: '0.5' },
						{ header: 'Ámbito educativo', items: ['biblioteca', 'diccionario', 'traducción'], mark: '0.5' }
					],
					wordRows: [
						{
							verbo: { given: true, value: 'educar' },
							sustantivo: { value: 'educación', mark: '0.25' },
							adjetivo: { value: 'educativo', mark: '0.25' }
						},
						{
							verbo: { value: 'perseverar', mark: '0.25' },
							sustantivo: { given: true, value: 'perseverancia' },
							adjetivo: { value: 'perseverante', mark: '0.25' }
						},
						{
							verbo: { value: 'responsabilizar', mark: '0.25' },
							sustantivo: { value: 'responsabilidad', mark: '0.25' },
							adjetivo: { given: true, value: 'responsable' }
						}
					],
					lexPrompt:
						'3. Léxico en contexto :\na) Da un sinónimo de : constancia (sust.) - fomentar (verbo).\nb) Forma el antónimo añadiendo un prefijo adecuado : posible - legal - confiar - prudente.',
					lexAnswer:
						'a) constancia = perseverancia | fomentar = impulsar / promover.\nb) imposible, ilegal, desconfiar, imprudente.',
					grammarPrompt:
						'4. Completa y transforma aplicando el modo y tiempo adecuados :\na) Estudiamos lenguas extranjeras para que nuestro país (tener) mejores traductores.\nb) El profesor pidió a los alumnos que (leer) un ensayo cada semana.\nc) Transforma en oración final con el mismo sujeto : «Me esfuerzo todos los días con el objetivo de que yo apruebe el BAC.»',
					grammarAnswer:
						'a) tenga (presente de subjuntivo).\nb) leyeran / leyesen (imperfecto de subjuntivo).\nc) Me esfuerzo todos los días para aprobar el BAC.',
					clozePrompt:
						'5. Completa el enunciado con las palabras exactas : biblioteca - matices - esfuerzo - madurez.\nQuien visita con frecuencia la (1) .......... escolar adquiere (2) .......... intelectual, descubre nuevos (3) .......... de su idioma y valora el fruto del (4) .......... constante.',
					clozeAnswer: '1) biblioteca   2) madurez   3) matices   4) esfuerzo',
					quizzes: {
						easy: {
							q: 'Relaciona cada palabra con su antónimo morfológico formado con prefijo:',
							pairs: [
								{ left: 'responsable', right: 'irresponsable' },
								{ left: 'posible', right: 'imposible' },
								{ left: 'legal', right: 'ilegal' },
								{ left: 'confianza', right: 'desconfianza' }
							],
							explanation: 'تتحول in- إلى ir- أمام r، وإلى im- أمام p/b، وإلى i- أمام l، بينما تأخذ confianza السابقة des-.'
						} as MatchingSpec,
						medium: {
							q: 'Asocia cada verbo con su sustantivo derivado correcto en el temario BAC:',
							pairs: [
								{ left: 'educar', right: 'educación' },
								{ left: 'perseverar', right: 'perseverancia' },
								{ left: 'comprender', right: 'comprensión' },
								{ left: 'aprender', right: 'aprendizaje' }
							],
							explanation: 'الأسماء المشتقة تحافظ على الجذر الدلالي وتستعمل لواحق اللغة الإسبانية القياسية.'
						} as MatchingSpec,
						hard: {
							q: 'Une cada palabra de nivel BAC con su sinónimo de idéntica categoría gramatical:',
							pairs: [
								{ left: 'fomentar (verbo)', right: 'impulsar (verbo)' },
								{ left: 'tropiezo (sust.)', right: 'obstáculo (sust.)' },
								{ left: 'íntegro (adj.)', right: 'honrado (adj.)' },
								{ left: 'hondura (sust.)', right: 'profundidad (sust.)' }
							],
							explanation: 'في البكالوريا يجب مطابقة الفئة النحوية بين الكلمة ومرادفها (فعل/فعل، اسم/اسم، صفة/صفة).'
						} as MatchingSpec
					}
				},
				{
					classPrompt:
						'1. Clasifica estas palabras según su categoría morfológica o carga valorativa : solidaridad - improvisación - perseverante - desidia - riguroso - negligencia.',
					classCols: [
						{ header: 'Léxico positivo (mérito)', items: ['solidaridad', 'perseverante', 'riguroso'], mark: '0.5' },
						{ header: 'Léxico negativo (defecto)', items: ['improvisación', 'desidia', 'negligencia'], mark: '0.5' }
					],
					wordRows: [
						{
							verbo: { given: true, value: 'comprender' },
							sustantivo: { value: 'comprensión', mark: '0.25' },
							adjetivo: { value: 'comprensivo', mark: '0.25' }
						},
						{
							verbo: { value: 'respetar', mark: '0.25' },
							sustantivo: { given: true, value: 'respeto' },
							adjetivo: { value: 'respetuoso', mark: '0.25' }
						},
						{
							verbo: { value: 'valorar', mark: '0.25' },
							sustantivo: { value: 'valor', mark: '0.25' },
							adjetivo: { given: true, value: 'valioso' }
						}
					],
					lexPrompt:
						'3. Léxico en contexto :\na) Da el sinónimo exacto de : meta (sust.) - enriquecer (verbo).\nb) Escribe el antónimo con prefijo de : regular - tolerante - motivado - paciente.',
					lexAnswer:
						'a) meta = objetivo | enriquecer = ampliar / fortalecer.\nb) irregular, intolerante, desmotivado, impaciente.',
					grammarPrompt:
						'4. Conjuga y une con el nexo conveniente :\na) Aunque las pruebas (ser) exigentes este año, nadie se rendirá.\nb) Los docentes recomendaron que el alumnado (organizar) su horario con calma.\nc) Une con «a fin de que» : Leo literatura en español. Quiero mejorar mi estilo.',
					grammarAnswer:
						'a) sean (subjuntivo tras aunque hipotético/futuro).\nb) organizara / organizase (imperfecto de subjuntivo).\nc) Leo literatura en español a fin de mejorar mi estilo (mismo sujeto : a fin de + infinitivo).',
					clozePrompt:
						'5. Completa el párrafo con : vocabulario - paciencia - diccionario - diálogo.\nAprender un idioma requiere (1) .......... diaria. Consultar un buen (2) .......... amplía el (3) .......... activo y facilita el (4) .......... respetuoso entre culturas.',
					clozeAnswer: '1) paciencia   2) diccionario   3) vocabulario   4) diálogo',
					quizzes: {
						easy: {
							q: 'Relaciona cada adjetivo con su antónimo morfológico:',
							pairs: [
								{ left: 'regular', right: 'irregular' },
								{ left: 'paciente', right: 'impaciente' },
								{ left: 'tolerante', right: 'intolerante' },
								{ left: 'motivado', right: 'desmotivado' }
							],
							explanation: 'تشكل هذه الأضداد باستخدام السوابق الصرفية ir-, im-, in-, des-.'
						} as MatchingSpec,
						medium: {
							q: 'Empareja cada verbo con su sustantivo y adjetivo correspondientes:',
							pairs: [
								{ left: 'respetar', right: 'respeto / respetuoso' },
								{ left: 'valorar', right: 'valor / valioso' },
								{ left: 'cooperar', right: 'cooperación / cooperativo' },
								{ left: 'formar', right: 'formación / formativo' }
							],
							explanation: 'الربط السليم لعائلة الكلمات يساعد في حل جدول الاشتقاق الثلاثي في البكالوريا.'
						} as MatchingSpec,
						hard: {
							q: 'Relaciona cada concepto abstracto con su significado académico exacto:',
							pairs: [
								{ left: 'desidia', right: 'falta de cuidado e interés' },
								{ left: 'constancia', right: 'firmeza continua en el esfuerzo' },
								{ left: 'hondura', right: 'profundidad en el conocimiento' },
								{ left: 'esmero', right: 'cuidado riguroso al hacer algo' }
							],
							explanation: 'إدراك هذه الفروق الدلالية الرفيعة يدعم دقة أسئلة الفهم والتلخيص.'
						} as MatchingSpec
					}
				},
				{
					classPrompt:
						'1. Clasifica los siguientes términos en dos columnas : lectura crítica - distracción - aprendizaje - dispersión - rigor - superficialidad.',
					classCols: [
						{ header: 'Hábitos de éxito', items: ['lectura crítica', 'aprendizaje', 'rigor'], mark: '0.5' },
						{ header: 'Obstáculos al estudio', items: ['distracción', 'dispersión', 'superficialidad'], mark: '0.5' }
					],
					wordRows: [
						{
							verbo: { given: true, value: 'organizar' },
							sustantivo: { value: 'organización', mark: '0.25' },
							adjetivo: { value: 'organizado', mark: '0.25' }
						},
						{
							verbo: { value: 'superar', mark: '0.25' },
							sustantivo: { given: true, value: 'superación' },
							adjetivo: { value: 'superable', mark: '0.25' }
						},
						{
							verbo: { value: 'solidarizar', mark: '0.25' },
							sustantivo: { value: 'solidaridad', mark: '0.25' },
							adjetivo: { given: true, value: 'solidario' }
						}
					],
					lexPrompt:
						'3. Léxico en contexto :\na) Busca un sinónimo de : superar (verbo) - primordial (adj.).\nb) Forma el antónimo con prefijo de : borrable - directo - justo - orden.',
					lexAnswer:
						'a) superar = vencer / sobrepasar | primordial = fundamental / esencial.\nb) imborrable, indirecto, injusto, desorden.',
					grammarPrompt:
						'4. Completa con el modo verbal exacto :\na) Es imprescindible que la juventud (valorar) la lectura seria.\nb) Dudábamos de que aquel rumor (tener) fundamento real.\nc) Sustituye «aunque» por «a pesar de» : «Aunque había dificultades, completaron el proyecto.»',
					grammarAnswer:
						'a) valore (presente de subjuntivo).\nb) tuviera / tuviese (imperfecto de subjuntivo).\nc) A pesar de las dificultades, completaron el proyecto.',
					clozePrompt:
						'5. Completa las lagunas con : autonomía - errores - fuentes - hábito.\nCorregir nuestros propios (1) .......... refuerza la (2) .......... del estudiante. Del mismo modo, adquirir el (3) .......... de consultar (4) .......... fiables mejora todo trabajo escrito.',
					clozeAnswer: '1) errores   2) autonomía   3) hábito   4) fuentes',
					quizzes: {
						easy: {
							q: 'Une cada término con su antónimo morfológico formado mediante prefijo:',
							pairs: [
								{ left: 'borrable', right: 'imborrable' },
								{ left: 'justo', right: 'injusto' },
								{ left: 'orden', right: 'desorden' },
								{ left: 'directo', right: 'indirecto' }
							],
							explanation: 'السوابق im-, in-, des- تنفي المعنى مع مراعاة قواعد الإملاء.'
						} as MatchingSpec,
						medium: {
							q: 'Relaciona cada verbo con su sustantivo abstracto correspondiente:',
							pairs: [
								{ left: 'organizar', right: 'organización' },
								{ left: 'superar', right: 'superación' },
								{ left: 'decidir', right: 'decisión' },
								{ left: 'crecer', right: 'crecimiento' }
							],
							explanation: 'تذكّر لواحق الأسماء: -ción, -sión, -miento.'
						} as MatchingSpec,
						hard: {
							q: 'Asocia cada conector con su exigencia sintáctica exacta:',
							pairs: [
								{ left: 'aunque (hecho real)', right: 'Verbo en indicativo' },
								{ left: 'para que', right: 'Verbo en subjuntivo' },
								{ left: 'a pesar de', right: 'Sustantivo o infinitivo' },
								{ left: 'para (mismo sujeto)', right: 'Infinitivo directo' }
							],
							explanation: 'التمييز بين التراكيب التي تتطلب اسماً أو مصدراً وتلك التي تتطلب فعلاً مصرفاً أساسي في البكالوريا.'
						} as MatchingSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildMatchingPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Competencia lingüística — A) Léxico y morfología',
				points: 7,
				instruction: 'Realiza con precisión las siguientes actividades de léxico y gramática (7 puntos — BAC 3AS LE) :',
				content: [
					{
						type: 'text',
						content: chosen.classPrompt
					},
					buildSpanishClassificationTableBlock({ columns: chosen.classCols }),
					{
						type: 'text',
						content: '2. Completa la siguiente tabla morfológica (familia de palabras) :'
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
						content: chosen.grammarPrompt,
						answer: chosen.grammarAnswer,
						mark: '2'
					},
					{
						type: 'text',
						content: chosen.clozePrompt,
						answer: chosen.clozeAnswer,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't1',
				difficulty,
				domain: 'lexico_morfologia',
				examRole: 'linguistic_competence',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'في المرادفات والأضداد، حافظ دائماً على نفس الفئة النحوية (اسم مع اسم، فعل مع فعل، صفة مع صفة).',
					'تحقق من قواعد إملاء السابقة النفيية: im- قبل p و b، و ir- قبل r، و i- قبل l.',
					'عند تطابق الفاعل في الجملة الغائية، استعمل «para + infinitivo» بدل «para que + subjuntivo».'
				],
				solutionStepsAr: [
					'التصنيف الدلالي الصحيح في جدول العمودين (1 نقطة).',
					'إكمال جدول الاشتقاق الثلاثي بدقة إملائية (1.5 نقطة).',
					'إيجاد المرادفات وتكوين الأضداد بالسوابق المناسبة (1.5 نقطة).',
					'ضبط الصيغ النحوية في صيغة الشك وتعبئة الفراغات (3 نقاط).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. LINGUISTIC COMPETENCE (7 pts): Subjuntivo y subordinadas (with SVG chart)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_tpl_3as_le_t1_ling_subjuntivo_subordinadas',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'conjugacion_modos',
		titleAr: 'الكفاءة اللغوية (7 نقاط — لغات أجنبية): صيغة الشك (Subjuntivo) والتوافق الزمني في الجمل التابعة',
		curriculumLessonId: 'spa_lesson_3as_le_t1_subjuntivo_subordinadas',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					svgTitle: 'Esquema de Subjuntivo BAC 3AS LE',
					svgSub: 'Correlación temporal en subordinadas',
					svgCols: [
						{ header: 'Presente Subj.', rule: 'Tras pres. o fut.', examples: 'Quiero que leas más.' },
						{ header: 'Imperf. Subj.', rule: 'Tras pasado o cond.', examples: 'Pidió que leyéramos.' },
						{ header: 'Aunque + Ind/Subj', rule: 'Real vs. Hipótesis', examples: 'Aunque llueva, iré.' }
					],
					classPrompt:
						'1. Clasifica estas oraciones subordinadas según exijan Indicativo o Subjuntivo : Es evidente que estudia - Dudo que venga hoy - Aunque tenga poco tiempo, ayudará - Sé que dices la verdad - Para que comprendas mejor - Afirmó que había llegado.',
					classCols: [
						{
							header: 'Modo Indicativo',
							items: ['Es evidente que estudia', 'Sé que dices la verdad', 'Afirmó que había llegado'],
							mark: '0.75'
						},
						{
							header: 'Modo Subjuntivo',
							items: ['Dudo que venga hoy', 'Aunque tenga poco tiempo, ayudará', 'Para que comprendas mejor'],
							mark: '0.75'
						}
					],
					conjPrompt:
						'2. Conjuga los verbos entre paréntesis en presente o pretérito imperfecto de subjuntivo según corresponda :\na) Conviene que todos los alumnos (mantener) la calma durante la prueba.\nb) El director nos aconsejó que (aprovechar) los recursos de la biblioteca.\nc) Te presto este manual para que (poder) repasar los conectores.\nd) Quería que nosotros (tener) confianza en nuestro propio esfuerzo.',
					conjAnswer:
						'a) mantengan (presente de subjuntivo).\nb) aprovecháramos / aprovechásemos o aprovecharan (imperfecto de subjuntivo).\nc) puedas (presente de subjuntivo).\nd) tuviéramos / tuviésemos (imperfecto de subjuntivo).',
					transformPrompt:
						'3. Transforma las oraciones aplicando la correlación temporal en pasado :\na) «La profesora espera que los estudiantes redacten un ensayo claro.» (Cambia «espera» por «esperaba»)\nb) «Aunque hay obstáculos, no abandonaremos el proyecto.» (Transforma a hipótesis irreal en presente/futuro con imperfecto de subjuntivo)',
					transformAnswer:
						'a) La profesora esperaba que los estudiantes redactaran (o redactasen) un ensayo claro.\nb) Aunque hubiera (o hubiese) obstáculos, no abandonaríamos el proyecto.',
					clozePrompt:
						'4. Completa el texto con la forma correcta : sea - lean - tengan - logren.\nNuestros docentes desean que los jóvenes (1) .......... libros variados, (2) .......... espíritu crítico y (3) .......... superar el examen con éxito, aunque el camino (4) .......... exigente.',
					clozeAnswer: '1) lean   2) tengan   3) logren   4) sea',
					quizzes: {
						easy: {
							q: 'Selecciona la forma exacta del presente de subjuntivo tras una necesidad:',
							sentence: 'Es necesario que los alumnos ___ cada día con atención.',
							correct: 'lean',
							distractors: ['leen', 'leían', 'leerán'],
							explanation: 'العبارة «Es necesario que» تتبع بصيغة Presente de subjuntivo: «lean».'
						} as ClozeSpec,
						medium: {
							q: 'Completa respetando la correlación temporal con el verbo en pasado:',
							sentence: 'El tutor recomendó que todos nosotros ___ la fuente antes de responder.',
							correct: 'verificáramos',
							distractors: ['verifiquemos', 'verificamos', 'verificaremos'],
							explanation: 'فعل القول والتوصية في الماضي «recomendó» يفرض Pretérito imperfecto de subjuntivo: «verificáramos».'
						} as ClozeSpec,
						hard: {
							q: 'Elige la opción exacta para expresar una concesión real ya comprobada:',
							sentence: 'Aunque el ejercicio ___ muy largo ayer, lo terminamos a tiempo.',
							correct: 'fue',
							distractors: ['sea', 'haya sido', 'fuera'],
							explanation: 'الحدث وقع فعلاً بالأمس، لذا بعد «aunque» نختار Indicativo: «fue».'
						} as ClozeSpec
					}
				},
				{
					svgTitle: 'Subjuntivo en Finales y Concesivas',
					svgSub: 'Mismo sujeto vs. Sujetos distintos',
					svgCols: [
						{ header: 'Mismo sujeto', rule: 'para + infinitivo', examples: 'Leo para aprender más.' },
						{ header: 'Sujetos distintos', rule: 'para que + subjuntivo', examples: 'Leo para que aprendas.' },
						{ header: 'Duda y Negación', rule: 'No creo que + subj.', examples: 'No creo que sea tarde.' }
					],
					classPrompt:
						'1. Clasifica estas estructuras según expresen Finalidad o Concesión : para que mejoren - aunque llueva - a fin de lograr - a pesar de las trabas - con el objeto de difundir - por mucho que insista.',
					classCols: [
						{ header: 'Subordinadas Finales', items: ['para que mejoren', 'a fin de lograr', 'con el objeto de difundir'], mark: '0.75' },
						{ header: 'Subordinadas Concesivas', items: ['aunque llueva', 'a pesar de las trabas', 'por mucho que insista'], mark: '0.75' }
					],
					conjPrompt:
						'2. Pon los verbos entre paréntesis en el modo y tiempo convenientes :\na) No creo que la lectura profunda (ser) menos útil en la actualidad.\nb) El bibliotecario nos pidió que (devolver) los diccionarios en orden.\nc) Trabajamos con empeño a fin de que la revista escolar (salir) puntual.\nd) Creo firmemente que el esfuerzo diario (dar) siempre buenos frutos.',
					conjAnswer:
						'a) sea (subjuntivo tras opinión negada).\nb) devolviéramos / devolviésemos (imperfecto de subjuntivo).\nc) salga (presente de subjuntivo).\nd) da (indicativo tras opinión afirmativa).',
					transformPrompt:
						'3. Realiza las siguientes transformaciones sintácticas :\na) Pasa de afirmación a negación : «Pienso que ese método funciona sin esfuerzo.» (Empieza por : No pienso que...)\nb) Cambia el verbo principal al pasado : «Los padres quieren que sus hijos escojan una carrera honrada.»',
					transformAnswer:
						'a) No pienso que ese método funcione sin esfuerzo.\nb) Los padres querían (o quisieron) que sus hijos escogieran (o escogiesen) una carrera honrada.',
					clozePrompt:
						'4. Completa con : fuera - ayude - creas - trabajaran.\nNo (1) .......... que estudiar lenguas es difícil si organizas tu horario. El profesor exigió que los grupos (2) .......... unidos para que el debate (3) .......... enriquecedor y (4) .......... a todo el curso.',
					clozeAnswer: '1) creas   2) trabajaran   3) fuera   4) ayude',
					quizzes: {
						easy: {
							q: 'Completa la oración final con dos sujetos diferentes:',
							sentence: 'Te presto mis apuntes para que ___ repasar la gramática.',
							correct: 'puedas',
							distractors: ['puedes', 'podrás', 'podías'],
							explanation: 'تُتبع «para que» دوماً بصيغة Subjuntivo: «puedas».'
						} as ClozeSpec,
						medium: {
							q: 'Completa la oración sustantiva de opinión negada:',
							sentence: 'No creo que la prisa ___ la mejor consejera en un examen.',
							correct: 'sea',
							distractors: ['es', 'será', 'era'],
							explanation: 'أفعال الرأي المنفية مثل «No creo que» تتطلب Subjuntivo: «sea».'
						} as ClozeSpec,
						hard: {
							q: 'Completa manteniendo la concordancia con «pidieron» en pasado:',
							sentence: 'Los organizadores pidieron que los jóvenes ___ puntuales al acto.',
							correct: 'fueran',
							distractors: ['sean', 'son', 'serían'],
							explanation: 'وجود «pidieron» في الماضي يفرض Imperfecto de subjuntivo: «fueran».'
						} as ClozeSpec
					}
				},
				{
					svgTitle: 'Usos del Pretérito Imperfecto de Subjuntivo',
					svgSub: 'Formación desde ellos indefinido (-ra / -se)',
					svgCols: [
						{ header: 'Base irregular', rule: 'tuvieron : tuviera', examples: 'pudiera, supiera, hiciera' },
						{ header: 'Verbos -ir', rule: 'pidieron : pidiera', examples: 'sintiera, durmiera, leyera' },
						{ header: 'Como si', rule: 'Siempre Imp./Plusc. Subj.', examples: 'Habla como si supiera.' }
					],
					classPrompt:
						'1. Clasifica estos verbos en Presente de Subjuntivo o Pretérito Imperfecto de Subjuntivo : sepamos - supieran - digas - dijeran - hagamos - hicieran.',
					classCols: [
						{ header: 'Presente de Subjuntivo', items: ['sepamos', 'digas', 'hagamos'], mark: '0.75' },
						{ header: 'Imperfecto de Subjuntivo', items: ['supieran', 'dijeran', 'hicieran'], mark: '0.75' }
					],
					conjPrompt:
						'2. Conjuga en la forma exacta del subjuntivo :\na) Aunque mañana (hacer) calor, iremos temprano a la biblioteca.\nb) Nos rogó que (decir, nosotros) la verdad con serenidad.\nc) Hablaba español con tanta fluidez como si (vivir, ella) años en Córdoba.\nd) Ojalá todos los jóvenes (saber) valorar el tiempo.',
					conjAnswer:
						'a) haga (presente de subjuntivo).\nb) dijéramos / dijésemos (imperfecto de subjuntivo).\nc) hubiera vivido / viviera (subjuntivo tras como si).\nd) sepan (presente de subjuntivo tras ojalá realizable).',
					transformPrompt:
						'3. Reescribe las frases corrigiendo o transformando el tiempo :\na) Pasa al pasado : «Nos alegramos de que vengáis al debate escolar.»\nb) Transforma usando «sin que» : «Los voluntarios ayudaron al barrio. Nadie se enteró.»',
					transformAnswer:
						'a) Nos alegramos (o alegrábamos) de que vinierais (o vinieseis) al debate escolar.\nb) Los voluntarios ayudaron al barrio sin que nadie se enterara (o enterase).',
					clozePrompt:
						'4. Completa con : dijera - valoremos - tuvieran - aprendan.\nEs urgente que (1) .......... el esfuerzo silencioso. Nuestros mayores deseaban que los estudiantes (2) .......... paciencia, aunque nadie les (3) .......... que el éxito sería fácil, para que (4) .......... a resistir.',
					clozeAnswer: '1) valoremos   2) tuvieran   3) dijera   4) aprendan',
					quizzes: {
						easy: {
							q: 'Elige la forma exacta de presente de subjuntivo del verbo «saber»:',
							sentence: 'Ojalá los estudiantes ___ valorar cada hora de estudio.',
							correct: 'sepan',
							distractors: ['saben', 'sabrán', 'sabían'],
							explanation: 'صيغة Presente de subjuntivo من الفعل الشاذ saber هي «sepan».'
						} as ClozeSpec,
						medium: {
							q: 'Elige la conjugación obligatoria tras «como si»:',
							sentence: 'Respondió a todas las preguntas como si ___ de memoria la lección.',
							correct: 'supiera',
							distractors: ['sabe', 'sabrá', 'sepa'],
							explanation: 'الأداة «como si» لا تتبع أبداً بالحاضر، بل تأخذ Imperfecto أو Pluscuamperfecto de subjuntivo.'
						} as ClozeSpec,
						hard: {
							q: 'Completa la subordinada con «sin que» y verbo principal en pretérito indefinido:',
							sentence: 'Distribuyeron los libros en el barrio sin que el ruido ___ a los vecinos.',
							correct: 'molestara',
							distractors: ['molesta', 'moleste', 'molestará'],
							explanation: 'الرابط «sin que» يتطلب Subjuntivo، ومع الفعل الماضي «distribuyeron» يلزم Imperfecto de subjuntivo: «molestara».'
						} as ClozeSpec
					}
				}
			];

			const vIdx = rng.int(0, pool.length - 1);
			const chosen = pool[vIdx];
			const svgStr = svgSpanishConjugationChart({
				title: chosen.svgTitle,
				subtitle: chosen.svgSub,
				columns: chosen.svgCols
			});
			const svgPath = saveSpanishSvgAsset(`3as_le_t1_subjuntivo_v${vIdx + 1}`, svgStr);

			const { quizQuestion, finalAnswer } = buildClozePayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Competencia lingüística — B) Gramática y conjugación',
				points: 7,
				instruction: 'Observa el esquema visual y resuelve las actividades gramaticales (7 puntos — BAC 3AS LE) :',
				content: [
					{
						type: 'image',
						src: svgPath,
						width: 'full',
						caption: 'Síntesis visual : El Subjuntivo y la correlación temporal (BAC 3AS LE).'
					},
					{
						type: 'text',
						content: chosen.classPrompt
					},
					buildSpanishClassificationTableBlock({ columns: chosen.classCols }),
					{
						type: 'text',
						content: chosen.conjPrompt,
						answer: chosen.conjAnswer,
						mark: '2'
					},
					{
						type: 'text',
						content: chosen.transformPrompt,
						answer: chosen.transformAnswer,
						mark: '2'
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
				trimesterId: 't1',
				difficulty,
				domain: 'conjugacion_modos',
				examRole: 'linguistic_competence',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'راقب دائماً زمن الفعل في الجملة الرئيسية لتحديد ما إذا كان التابع في Presente أو Imperfecto de subjuntivo.',
					'تذكّر أن جذع Imperfecto de subjuntivo يُشتق من صيغة ellos في الماضي البسيط بحذف -ron.',
					'بعد «aunque»، يُستعمل Indicativo للحقيقة الواقعة و Subjuntivo للافتراض.'
				],
				solutionStepsAr: [
					'تصنيف الجمل بين Indicativo و Subjuntivo (1.5 نقطة).',
					'تصريف الأفعال وفق التوافق الزمني في صيغة الشك (2 نقطتان).',
					'إجراء التحويلات الزمنية والتركيبية (2 نقطتان).',
					'إكمال الفقرة بالصيغ الصحيحة (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. WRITTEN EXPRESSION (6 pts — Integration): Valores y juventud moderna
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_tpl_3as_le_t1_writ_valores_juventud',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'expresion_escrita',
		titleAr: 'التعبير الكتابي (6 نقاط — لغات أجنبية): القيم الأخلاقية، المثابرة والالتزام الشبابي',
		curriculumLessonId: 'spa_lesson_3as_le_t1_juventud_valores',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					temaUnoPrompt:
						'Redacta un artículo de opinión (140 a 180 palabras) para la revista de tu instituto explicando cómo pueden los jóvenes alcanzar sus metas académicas sin perder sus valores morales.',
					temaUnoNotas: [
						'Definir la diferencia entre el deseo pasajero y la constancia diaria.',
						'Destacar la importancia de la honradez, el respeto a los padres y la disciplina.',
						'Proponer ejemplos concretos de equilibrio entre estudio, lectura y solidaridad.'
					],
					temaDosPrompt:
						'«El voluntariado juvenil forma mejores estudiantes y mejores ciudadanos.» ¿Compartes esta afirmación? Redacta un texto argumentativo (140 a 180 palabras) justificando tu postura con razones y ejemplos.',
					modelAnswer:
						'Muchos jóvenes aspiran a brillar en sus estudios, pero olvidan a veces que el éxito verdadero no se sostiene sin valores éticos. ¿Cómo armonizar, pues, las ambiciones personales con la rectitud moral?\nEn primer lugar, conviene distinguir entre el simple deseo de triunfar y la constancia cotidiana. Quien organiza su jornada con disciplina y evita la trampa demuestra respeto hacia sí mismo y hacia sus docentes. Además, escuchar los consejos de los padres y ayudar a los compañeros en dificultad fortalece la madurez emocional necesaria para superar cualquier obstáculo académico.\nAunque la prisa moderna invite a buscar atajos fáciles, los logros duraderos siempre nacen del esfuerzo honrado y la paciencia. De igual modo, participar en campañas solidarias dentro del barrio enseña empatía y humildad.\nEn definitiva, unir la excelencia intelectual con la honestidad y el servicio al prójimo constituye el camino más seguro para construir un porvenir digno y ejemplar.',
					rubricSummary:
						'Adecuación al tema (1.5) + Coherencia y conectores (1.5) + Corrección gramatical y subjuntivo (1.5) + Riqueza léxica y ortografía (1.5).',
					quizzes: {
						easy: {
							q: 'Clasifica los siguientes conceptos según sirvan para abrir o para concluir un ensayo:',
							categories: ['Fórmulas de introducción', 'Fórmulas de conclusión'],
							items: [
								{ text: 'Hoy en día', category: 0 },
								{ text: 'En la actualidad', category: 0 },
								{ text: 'En definitiva', category: 1 },
								{ text: 'En conclusión', category: 1 }
							],
							explanation: 'تُستعمل «Hoy en día» و«En la actualidad» للاستهلال، بينما تُختتم المقالة بـ «En definitiva» و«En conclusión».'
						} as DragDropSpec,
						medium: {
							q: 'Clasifica estos conectores según expresen Adición u Oposición / Matiz:',
							categories: ['Conectores de adición', 'Conectores de oposición'],
							items: [
								{ text: 'Además', category: 0 },
								{ text: 'Asimismo', category: 0 },
								{ text: 'Sin embargo', category: 1 },
								{ text: 'No obstante', category: 1 }
							],
							explanation: 'الروابط «Además / Asimismo» تضيف الحجج، أما «Sin embargo / No obstante» فتفيد الاستدراك.'
						} as DragDropSpec,
						hard: {
							q: 'Clasifica estas expresiones según pertenezcan al registro formal del BAC o al registro coloquial a evitar:',
							categories: ['Registro formal BAC', 'Registro coloquial a evitar'],
							items: [
								{ text: 'Conviene señalar que', category: 0 },
								{ text: 'Desde mi punto de vista', category: 0 },
								{ text: 'Bueno, la verdad es que', category: 1 },
								{ text: 'Pasa que da igual', category: 1 }
							],
							explanation: 'يتطلب التعبير الكتابي في البكالوريا أسلوباً رصيناً خالياً من التعابير العامية.'
						} as DragDropSpec
					}
				},
				{
					temaUnoPrompt:
						'Escribe una carta argumentativa al director de tu instituto proponiendo la creación de un club de voluntariado estudiantil y explicando sus beneficios educativos y sociales (140 a 180 palabras).',
					temaUnoNotas: [
						'Incluir lugar, fecha, saludo formal («Estimado Señor Director:») y trato de «usted».',
						'Presentar tres actividades concretas (apoyo escolar, limpieza del patio, recogida de libros).',
						'Explicar cómo estas acciones fomentan la solidaridad y la gestión del tiempo.'
					],
					temaDosPrompt:
						'«La verdadera madurez de un joven se reconoce en su sentido de la responsabilidad hacia su familia y su comunidad.» Redacta un ensayo argumentativo (140 a 180 palabras) desarrollando esta idea.',
					modelAnswer:
						'Argel, 12 de noviembre de 2025.\nEstimado Señor Director :\nMe dirijo respetuosamente a usted en representación de los alumnos de 3AS para proponer la creación de un club de voluntariado escolar en nuestro instituto.\nConsideramos que dicha iniciativa complementaría nuestra formación académica mediante acciones concretas al servicio de la comunidad. Por ejemplo, podríamos organizar tutorías de repaso para los cursos inferiores, jornadas de cuidado de las zonas verdes y una campaña de intercambio de libros usados antes de los exámenes.\nAunque algunos teman que esta actividad reste tiempo al estudio, una planificación equilibrada de los fines de semana permitirá a los voluntarios cumplir con rigor todas sus tareas escolares y desarrollar cualidades esenciales como el trabajo en equipo y la empatía.\nEsperando que acoja favorablemente esta propuesta, le saluda atentamente el alumnado comprometido.',
					rubricSummary:
						'Formato de carta formal (1.5) + Argumentación clara y pautas cumplidas (1.5) + Uso correcto de usted y tiempos verbales (1.5) + Riqueza léxica y presentación (1.5).',
					quizzes: {
						easy: {
							q: 'Clasifica las partes siguientes según pertenezcan a la apertura o al cierre de una carta formal:',
							categories: ['Apertura de la carta', 'Cierre de la carta'],
							items: [
								{ text: 'Estimado Señor Director', category: 0 },
								{ text: 'Me dirijo respetuosamente a usted', category: 0 },
								{ text: 'Le saluda atentamente', category: 1 },
								{ text: 'Agradeciendo su atención', category: 1 }
							],
							explanation: 'تُفتتح الرسالة الرسمية بالتحية الموجهة للمدير وتُختتم بصيغة الشكر والوداع المهذب.'
						} as DragDropSpec,
						medium: {
							q: 'Clasifica los argumentos siguientes en Favor del voluntariado o Cautela de organización:',
							categories: ['Beneficios del voluntariado', 'Condición organizativa'],
							items: [
								{ text: 'Fomenta la empatía', category: 0 },
								{ text: 'Enseña trabajo en equipo', category: 0 },
								{ text: 'Exige horario equilibrado', category: 1 },
								{ text: 'No descuidar el repaso', category: 1 }
							],
							explanation: 'الفقرة المتزنة تبرز الفوائد وتضيف ضابطاً تنظيمياً للوقت الدراسي.'
						} as DragDropSpec,
						hard: {
							q: 'Clasifica estos verbos y pronombres según correspondan a una carta formal con «usted» o a una nota informal:',
							categories: ['Trato formal (usted)', 'Trato informal (tú)'],
							items: [
								{ text: 'Le agradezco su apoyo', category: 0 },
								{ text: 'Acuda al acto', category: 0 },
								{ text: 'Te mando un saludo', category: 1 },
								{ text: 'Pásate luego por clase', category: 1 }
							],
							explanation: 'الرسالة الموجهة لإدارة المؤسسة تفرض صيغة الاحترام «usted / su / le».'
						} as DragDropSpec
					}
				},
				{
					temaUnoPrompt:
						'Redacta un texto argumentativo (140 a 180 palabras) sobre el valor del esfuerzo frente a la búsqueda de resultados fáciles e inmediatos entre los jóvenes actuales.',
					temaUnoNotas: [
						'Describir brevemente la impaciencia provocada por la vida rápida moderna.',
						'Demostrar por qué la paciencia y la constancia producen competencias reales.',
						'Concluir con un llamamiento positivo a la autodisciplina.'
					],
					temaDosPrompt:
						'¿Por qué el respeto a los mayores y la cortesía cotidiana siguen siendo pilares esenciales en la sociedad argelina moderna? Responde mediante un artículo de opinión (140 a 180 palabras).',
					modelAnswer:
						'En la sociedad actual, acostumbrada a respuestas instantáneas, muchos jóvenes sienten la tentación de buscar resultados rápidos sin recorrer el camino paciente del aprendizaje. Sin embargo, ninguna competencia sólida se improvisa.\nEn primer lugar, el esfuerzo diario fortalece la voluntad y permite asimilar los conocimientos con profundidad. Quien repasa con constancia comprende lo que estudia, mientras que quien busca atajos olvida con la misma rapidez con la que memoriza. Además, los tropiezos superados mediante la disciplina enseñan humildad y resistencia frente a las pruebas de la vida.\nCiertamente, el camino exigente requiere sacrificio y organización del tiempo libre; no obstante, la satisfacción de alcanzar una meta gracias al mérito propio es incomparable.\nEn conclusión, cultivar la paciencia y el trabajo honrado no es una carga del pasado, sino la llave más fiable para conquistar el futuro con dignidad.',
					rubricSummary:
						'Pertinencia de la tesis (1.5) + Progresión lógica en 4 párrafos (1.5) + Precisión verbal y conectores (1.5) + Ortografía y estilo (1.5).',
					quizzes: {
						easy: {
							q: 'Clasifica estas actitudes en Valores de constancia o Tentaciones de prisa:',
							categories: ['Valores de constancia', 'Tentaciones de prisa'],
							items: [
								{ text: 'Planificar el repaso diario', category: 0 },
								{ text: 'Corregir los fallos propios', category: 0 },
								{ text: 'Buscar atajos fáciles', category: 1 },
								{ text: 'Dejar todo para la víspera', category: 1 }
							],
							explanation: 'ينجح المقال المنهجي في التمييز الواضح بين المثابرة والارتجال المستعجل.'
						} as DragDropSpec,
						medium: {
							q: 'Clasifica estos conectores según su función dentro del ensayo argumentativo:',
							categories: ['Causa o explicación', 'Concesión o contraste'],
							items: [
								{ text: 'Puesto que', category: 0 },
								{ text: 'Ya que', category: 0 },
								{ text: 'Aunque', category: 1 },
								{ text: 'No obstante', category: 1 }
							],
							explanation: '«Puesto que / Ya que» تعلّلان الفكرة، أما «Aunque / No obstante» فتقدمان التوازن الاعتراضي.'
						} as DragDropSpec,
						hard: {
							q: 'Clasifica estos elementos según formen parte de la Introducción o del Desarrollo:',
							categories: ['Función de la Introducción', 'Función del Desarrollo'],
							items: [
								{ text: 'Presentar el contexto general', category: 0 },
								{ text: 'Formular la pregunta central', category: 0 },
								{ text: 'Aportar dos argumentos claros', category: 1 },
								{ text: 'Ilustrar con ejemplos reales', category: 1 }
							],
							explanation: 'تضع المقدمة السياق والإشكالية، بينما يقدّم العرض الحجج والأمثلة.'
						} as DragDropSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildDragDropPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'III. Expresión escrita',
				points: 6,
				instruction: 'Elige UNO de los dos temas propuestos y redáctalo con corrección y coherencia (6 puntos — BAC 3AS LE) :',
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
				trimesterId: 't1',
				difficulty,
				domain: 'expresion_escrita',
				examRole: 'written_expression',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'اختر الموضوع الذي تتوفر فيه على أفضل رصيد معجمي (الرسالة الرسمية أو مقال الرأي).',
					'قسّم النص بوضوح إلى 4 فقرات: مقدمة إشكالية، حجتان متماسكتان مع مثال، اعتراض متزن، وخاتمة تركيبية.',
					'راجع قبل التسليم: تصريف Subjuntivo، مطابقة الصفات، وعلامات التشديد (tildes).'
				],
				solutionStepsAr: [
					'ملاءمة المضمون والالتزام بنوع النص المطلوب (1.5 نقطة).',
					'بناء التصميم الرباعي والربط بالروابط المنطقية (1.5 نقطة).',
					'سلامة النحو والصرف وتوظيف صيغة الشك (1.5 نقطة).',
					'ثراء المعجم ودقة الإملاء وعلامات الترقيم (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 6. WRITTEN EXPRESSION (6 pts — Integration): Educación, lectura e idiomas
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_tpl_3as_le_t1_writ_educacion_idiomas',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'expresion_escrita',
		titleAr: 'التعبير الكتابي (6 نقاط — لغات أجنبية): التربية، المطالعة وتعدد اللغات',
		curriculumLessonId: 'spa_lesson_3as_le_t1_educacion_idiomas',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					temaUnoPrompt:
						'Redacta un artículo de opinión (140 a 180 palabras) sobre el tema: «¿Por qué el estudio de los idiomas extranjeros y la lectura en biblioteca fortalecen nuestra propia identidad cultural?»',
					temaUnoNotas: [
						'Refutar la idea errónea de que aprender otras lenguas debilita la lengua materna.',
						'Mostrar cómo la lectura crítica y la traducción perfeccionan el dominio del propio idioma.',
						'Destacar el valor de la escuela y del libro como motores de progreso nacional.'
					],
					temaDosPrompt:
						'Escribe una carta dirigida al responsable de cultura de tu municipio proponiendo la ampliación y modernización de la biblioteca pública para los estudiantes de secundaria (140 a 180 palabras).',
					modelAnswer:
						'Vivimos en un mundo interconectado donde el dominio de varias lenguas se ha convertido en una herramienta académica imprescindible. Ante quienes temen que los idiomas extranjeros debiliten nuestras raíces, cabe preguntarse qué aporta realmente el plurilingüismo.\nEn primer lugar, comparar el español con el árabe obliga al estudiante a conocer mejor la gramática y los matices de su propia lengua materna. Nadie puede traducir con rigor si no domina primero sus orígenes lingüísticos. Además, el acceso directo a obras históricas, científicas y culturales en la biblioteca escolar amplía el pensamiento crítico.\nAunque algunas personas reduzcan los idiomas a simples utilidades turísticas, su verdadero valor reside en abrir puentes de respeto y cooperación científica entre los pueblos.\nEn conclusión, leer con profundidad y aprender lenguas extranjeras no borra nuestra identidad, sino que la enriquece y la proyecta con confianza hacia el futuro.',
					rubricSummary:
						'Tesis clara y pertinencia (1.5) + Organización en 4 párrafos con conectores (1.5) + Corrección gramatical (1.5) + Riqueza léxica y tildes (1.5).',
					quizzes: {
						easy: {
							q: 'Ordena las cuatro partes fundamentales de un artículo de opinión BAC:',
							orderedItems: [
								'Introducción y planteamiento del tema',
								'Primer argumento con ejemplo concreto',
								'Matiz o contraargumento equilibrado',
								'Conclusión y síntesis personal'
							],
							explanation: 'التصميم القياسي لمقال البكالوريا: مقدمة ثم عرض مدعّم ثم موازنة اعتراضية ثم خاتمة.'
						} as OrderingSpec,
						medium: {
							q: 'Ordena las etapas lógicas para argumentar a favor del plurilingüismo:',
							orderedItems: [
								'Presentar el debate sobre lenguas e identidad',
								'Refutar el temor al debilitamiento de la lengua materna',
								'Explicar cómo la traducción afina ambas lenguas',
								'Concluir destacando el diálogo cultural mutuo'
							],
							explanation: 'يتدرج الحجاج من طرح الإشكال إلى دحض الفكرة الخاطئة ثم تقديم البرهان والختام.'
						} as OrderingSpec,
						hard: {
							q: 'Ordena estos enunciados para formar un párrafo coherente sobre la biblioteca escolar:',
							orderedItems: [
								'Aunque las pantallas abundan, la biblioteca sigue siendo esencial.',
								'En efecto, el silencio de sus salas favorece la lectura pausada.',
								'Gracias a ello, el alumno mejora su ortografía y su reflexión.',
								'Por consiguiente, conviene apoyar y renovar las bibliotecas.'
							],
							explanation: 'تسلسل الروابط: Aunque (اعتراض تمهيدي) ثم En efecto (شرح) ثم Gracias a ello (أثر) ثم Por consiguiente (نتيجة).'
						} as OrderingSpec
					}
				},
				{
					temaUnoPrompt:
						'Escribe una carta formal al director de tu instituto solicitando la creación de un taller semanal de lectura y traducción de textos en español (140 a 180 palabras).',
					temaUnoNotas: [
						'Usar encabezamiento formal (ciudad, fecha y saludo a la dirección).',
						'Explicar dos objetivos del taller: ampliar el léxico y preparar mejor la prueba escrita del BAC.',
						'Proponer una organización concreta en la biblioteca escolar sin interferir con el horario oficial.'
					],
					temaDosPrompt:
						'«La lectura pausada de un libro completo forma la inteligencia mejor que la consulta apresurada de mensajes breves.» ¿Qué opinas? Desarrolla tu punto de vista en 140 a 180 palabras.',
					modelAnswer:
						'Constantina, 20 de noviembre de 2025.\nEstimado Señor Director :\nPor medio de la presente, los estudiantes de tercer año de Lenguas Extranjeras le solicitamos autorización para crear un taller semanal de lectura y traducción en español.\nNuestro objetivo principal es reforzar la comprensión lectora y enriquecer el vocabulario académico de cara al examen de Bachillerato. Asimismo, el intercambio de opiniones sobre textos culturales y científicos nos ayudará a redactar párrafos más coherentes y precisos.\nEl taller tendría lugar los martes por la tarde en la biblioteca del instituto, bajo la supervisión voluntaria de nuestro profesor, de modo que no interferiría en absoluto con las clases ordinarias.\nAgradeciendo de antemano su apoyo constante a las iniciativas educativas, le saluda respetuosamente el grupo de 3AS LE.',
					rubricSummary:
						'Estructura formal de carta (1.5) + Claridad de propuesta y argumentos (1.5) + Uso correcto de usted y subjuntivo (1.5) + Ortografía y registro (1.5).',
					quizzes: {
						easy: {
							q: 'Ordena las secciones obligatorias de una carta formal de arriba abajo:',
							orderedItems: [
								'Lugar y fecha en la parte superior',
								'Saludo formal dirigido al destinatario',
								'Cuerpo con el motivo y los argumentos',
								'Despedida cortés y firma del remitente'
							],
							explanation: 'الترتيب الشكلي للرسالة الرسمية: المكان والتاريخ، التحية، المتن، ثم الختام والتوقيع.'
						} as OrderingSpec,
						medium: {
							q: 'Ordena las ideas del cuerpo de una solicitud educativa dirigida al director:',
							orderedItems: [
								'Exponer claramente el motivo de la solicitud',
								'Detallar los beneficios académicos del taller',
								'Aclarar el horario y el respeto a las normas',
								'Agradecer la atención y despedirse con cortesía'
							],
							explanation: 'تبدأ الرسالة بالغرض ثم الفوائد ثم التفاصيل التنظيمية وأخيراً الشكر.'
						} as OrderingSpec,
						hard: {
							q: 'Ordena las oraciones para reconstruir una argumentación sobre la lectura profunda:',
							orderedItems: [
								'Hoy muchos jóvenes leen únicamente titulares fugaces.',
								'Sin embargo, la lectura breve no entrena la atención sostenida.',
								'En cambio, un libro completo exige seguir un hilo lógico.',
								'Por ello, debemos recuperar el hábito diario de leer libros.'
							],
							explanation: 'تسلسل منطقي متماسك: ملاحظة الواقع، استدراك، مقابلة بـ En cambio، ثم توصية ختامية.'
						} as OrderingSpec
					}
				},
				{
					temaUnoPrompt:
						'Redacta un texto expositivo-argumentativo (140 a 180 palabras) destacando el papel del docente y la escuela como pilares del progreso humano y moral en la sociedad.',
					temaUnoNotas: [
						'Explicar que la escuela no solo transmite datos, sino también valores de respeto y esfuerzo.',
						'Mencionar el ejemplo histórico de educadores argelinos que defendieron la enseñanza.',
						'Concluir animando a los jóvenes a valorar el saber y respetar a sus profesores.'
					],
					temaDosPrompt:
						'«Aprender un idioma es abrir una ventana nueva al conocimiento sin perder la propia casa.» Comenta esta frase mediante un ensayo argumentado (140 a 180 palabras).',
					modelAnswer:
						'Desde tiempos antiguos, la escuela ha sido el motor silencioso de toda sociedad que aspira al progreso y a la justicia. Lejos de limitarse a transmitir datos teóricos, el aula forma el carácter, enseña a dialogar con respeto y despierta el amor por la verdad.\nEn este proceso, la labor del docente resulta insustituible. Al guiar con paciencia a sus alumnos, el profesor no solo corrige errores lingüísticos o científicos, sino que transmite el valor del esfuerzo honrado. Así lo demostraron en nuestra historia educadores ejemplares como Cheikh Abdelhamid Ben Badis, quien consagró su vida a abrir escuelas libres para iluminar las conciencias.\nAunque la tecnología facilite hoy el acceso rápido a la información, ninguna pantalla sustituye la orientación humana y moral de un buen maestro.\nEn definitiva, honrar la escuela y estudiar con dedicación constituye el mejor homenaje a quienes siembran el saber en cada generación.',
					rubricSummary:
						'Pertinencia y ejemplo cultural preciso (1.5) + Cohesión y conectores (1.5) + Gramática y léxico elevado (1.5) + Ortografía y puntuación (1.5).',
					quizzes: {
						easy: {
							q: 'Ordena los pasos de redacción durante el examen oficial del Bachillerato:',
							orderedItems: [
								'Leer atentamente las consignas de ambos temas',
								'Elaborar un esquema breve en el borrador',
								'Redactar los cuatro párrafos con letra clara',
								'Revisar verbos, concordancias y tildes al final'
							],
							explanation: 'المنهجية الذهبية في البكالوريا: قراءة المطلوب، التخطيط في المسودة، التحرير، ثم المراجعة اللغوية.'
						} as OrderingSpec,
						medium: {
							q: 'Ordena las ideas principales del ensayo sobre la escuela y el docente:',
							orderedItems: [
								'Presentar la escuela como pilar intelectual y moral',
								'Destacar la guía insustituible del profesorado',
								'Ilustrar con el ejemplo histórico de las escuelas libres',
								'Concluir pidiendo gratitud y dedicación en el estudio'
							],
							explanation: 'التدرج من الفكرة العامة إلى دور الأستاذ ثم المثال التاريخي فالخاتمة.'
						} as OrderingSpec,
						hard: {
							q: 'Ordena las fases de un párrafo concesivo bien estructurado:',
							orderedItems: [
								'Ciertamente, la tecnología agiliza la búsqueda de datos.',
								'No obstante, los datos aislados no forman el criterio moral.',
								'Solo el diálogo educativo ayuda a interpretar con rigor.',
								'De ahí que el maestro siga siendo clave en el aula.'
							],
							explanation: 'يبنى الاعتراض الحجاجي بالاعتراف الجزئي ثم الاستدراك ثم التعليل ثم الاستنتاج.'
						} as OrderingSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildOrderingPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'III. Expresión escrita',
				points: 6,
				instruction: 'Elige UNO de los dos temas propuestos y redáctalo respetando la extensión y el registro exigidos (6 puntos — BAC 3AS LE) :',
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
				trimesterId: 't1',
				difficulty,
				domain: 'expresion_escrita',
				examRole: 'written_expression',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'في الرسالة الرسمية، لا تنس التاريخ والتحية الرسمية وصيغة المخاطب «usted» والخاتمة المهذبة.',
					'في مقال الرأي، تجنب النسخ من نص الفهم؛ وظّف معجمك الخاص وأمثلته المنظمة.',
					'حافظ على فقرات متوازنة (140–180 كلمة) واربط بينها بروابط منطقية واضحة.'
				],
				solutionStepsAr: [
					'فهم التعليمة واحترام القالب الشكلي المطلوب (1.5 نقطة).',
					'تسلسل الأفكار وتوازن الفقرات الأربع (1.5 نقطة).',
					'الدقة النحوية والصرفية (1.5 نقطة).',
					'المفردات الأكاديمية وعلامات التشديد والترقيم (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	}
];
