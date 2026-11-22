import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildSpanishClassificationTableBlock,
	buildSpanishPassageBlock,
	buildSpanishWordFamilyTableBlock,
	buildSpanishWrittenProductionBlock
} from '../../spanish-helpers';
import { saveSpanishSvgAsset, svgSpanishGrammarMap, svgSpanishWritingBlueprint } from '../../svg-spanish';
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
 * Parameterized Exam & Quiz Templates — Trimestre 3 : Ámbito Laboral-Económico y Páginas Eternas (6 templates)
 * Roles: 2 comprehension (7 pts) + 2 linguistic_competence (7 pts) + 2 written_expression (6 pts)
 */
export const TEMPLATES_3AS_LE_T3: SpanishParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (7 pts): Mundo del trabajo, emprendimiento y solidaridad
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_tpl_3as_le_t3_comp_trabajo_emprendimiento',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'comprension_lectora',
		titleAr: 'فهم النص (7 نقاط — لغات أجنبية): عالم الشغل، ريادة الأعمال والتضامن الاقتصادي',
		curriculumLessonId: 'spa_lesson_3as_le_t3_trabajo_emprendimiento_solidaridad',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Jóvenes emprendedores en el sector agrícola y tecnológico argelino',
					source: 'Adaptado de un reportaje sobre innovación juvenil y empleo',
					paragraphs: [
						'Cada vez más graduados argelinos optan por no esperar pasivamente un puesto administrativo y deciden crear sus propias empresas emergentes. En distintas provincias del país, antiguos compañeros de facultad unen su dominio técnico de la informática o la agronomía para diseñar sistemas de riego inteligente y plataformas de comercialización agrícola sin intermediarios abusivos.',
						'Aunque [[este camino]] exige superar trámites iniciales y aprender a gestionar presupuestos con prudencia, los jóvenes emprendedores destacan el valor de la formación continua y del trabajo en equipo. Si hubieran trabajado aislados sin compartir conocimientos, muchos proyectos habrían fracasado en los primeros meses.',
						'De este modo, el emprendimiento responsable no solo genera empleo digno y riqueza local, sino que fortalece [[el tejido económico]] mediante productos útiles y honrados.'
					],
					glossary: [
						{ term: 'empresa emergente', meaning: 'proyecto empresarial joven basado en la innovación' },
						{ term: 'intermediario', meaning: 'persona que media en la compraventa encareciendo el producto' }
					],
					mainIdeaHeader: '1. El texto destaca principalmente :',
					mainIdeaOptions: [
						'La iniciativa de jóvenes argelinos que crean empresas útiles combinando tecnología, agronomía y cooperación',
						'La obligación de esperar únicamente empleos administrativos sin emprender',
						'El fracaso inevitable de cualquier proyecto agrícola moderno'
					],
					mainIdeaCorrect:
						'La iniciativa de jóvenes argelinos que crean empresas útiles combinando tecnología, agronomía y cooperación',
					tfItems: [
						{
							q: 'Cada vez más jóvenes titulados prefieren esperar pasivamente en lugar de emprender.',
							a: 'Falso',
							c: 'Optan por no esperar pasivamente un puesto administrativo y crean sus propias empresas emergentes (§1).',
							mark: '0.5'
						},
						{
							q: 'Algunos proyectos combinan informática y agronomía para mejorar el riego y la venta directa.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'El camino del emprendimiento carece por completo de dificultades o trámites iniciales.',
							a: 'Falso',
							c: 'Exige superar trámites iniciales y aprender a gestionar presupuestos con prudencia (§2).',
							mark: '0.5'
						},
						{
							q: 'La cooperación y la formación continua han sido clave para evitar el fracaso de muchos proyectos.',
							a: 'Verdadero',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) ¿Qué dos ámbitos concretos desarrollan las empresas juveniles descritas en el párrafo 1?',
							a: 'Diseñan sistemas de riego inteligente y plataformas de comercialización agrícola sin intermediarios abusivos.',
							mark: '1'
						},
						{
							q: 'b) ¿Qué habría ocurrido si los jóvenes hubieran trabajado aislados según el párrafo 2?',
							a: 'Muchos proyectos habrían fracasado en los primeros meses.',
							mark: '0.75'
						},
						{
							q: 'c) ¿Qué doble beneficio aporta el emprendimiento responsable al cierre del texto (§3)?',
							a: 'Genera empleo digno y riqueza local, y fortalece el tejido económico con productos útiles y honrados.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «este camino» (§2)   b) «el tejido económico» (§3)',
					refAnswer:
						'a) «este camino» refiere a la iniciativa de crear empresas emergentes propias en lugar de esperar pasivamente.   b) «el tejido económico» alude a la red productiva y comercial de la economía local.',
					synthPrompt:
						'En tu opinión, ¿qué cualidades personales son indispensables para que un joven tenga éxito en su propio proyecto laboral? Responde en cuatro o cinco líneas.',
					synthAnswer:
						'A mi juicio, emprender un proyecto propio exige primero formación técnica sólida y disciplina en la gestión financiera. Además, se necesita paciencia para superar los primeros tropiezos, honradez con los clientes y disposición para cooperar con otros especialistas.',
					quizzes: {
						easy: {
							q: '¿Qué soluciones diseñan los jóvenes emprendedores argelinos mencionados en el párrafo 1?',
							correct: 'Sistemas de riego inteligente y plataformas de venta agrícola directa',
							wrong: [
								'Redes de ocio nocturno',
								'Cadenas de intermediarios abusivos',
								'Proyectos de turismo espacial'
							],
							explanation: 'تذكر الفقرة الأولى بوضوح أنظمتهم للري الذكي ومنصات التسويق الفلاحي المباشر.'
						} as McqSpec,
						medium: {
							q: '¿Qué expresa la oración condicional del párrafo 2 («Si hubieran trabajado aislados..., habrían fracasado»)?',
							correct: 'Una condición irreal del pasado (3.º tipo) que valora retrospectivamente la importancia de cooperar',
							wrong: [
								'Una orden directa dirigida a los agricultores',
								'Una costumbre futura segura',
								'Un rechazo del trabajo en equipo'
							],
							explanation: 'التركيب (Si + hubieran trabajado... habrían fracasado) هو شرط من النوع الثالث يبرز قيمة العمل الجماعي.'
						} as McqSpec,
						hard: {
							q: '¿Qué relación se establece en el párrafo 3 entre ética laboral y economía?',
							correct: 'La honradez y la utilidad social fortalecen la economía tanto como la generación de riqueza',
							wrong: [
								'La economía moderna debe prescindir de la ética',
								'Los empleos dignos impiden el desarrollo local',
								'Las empresas emergentes solo buscan la especulación'
							],
							explanation: 'تربط الخاتمة بين القيمة الاقتصادية (العمل والثروة) والقيمة الأخلاقية (النفع والأمانة).'
						} as McqSpec
					}
				},
				{
					title: 'La formación profesional y la iniciativa personal ante los nuevos oficios',
					source: 'Adaptado de una revista de orientación escolar y laboral',
					paragraphs: [
						'Durante mucho tiempo se pensó erróneamente que solo los estudios teóricos largos aseguraban un futuro laboral respetable. Hoy, el mercado exige técnicos altamente cualificados en energías renovables, mecánica de precisión, artesanía restauradora y gestión digital. La formación profesional responde precisamente a [[esta demanda real]].',
						'Aprender un oficio práctico con rigor científico dignifica a quien lo ejerce y facilita una inserción rápida en la vida activa. Cuando un joven domina tanto la habilidad manual como las normas de seguridad y los idiomas técnicos, aporta soluciones concretas a las necesidades de su ciudad.',
						'Por ello, valorar los institutos de formación profesional junto con las universidades permite aprovechar todos los talentos juveniles sin [[prejuicios sociales]] estériles.'
					],
					glossary: [
						{ term: 'inserción', meaning: 'incorporación efectiva de una persona al mundo laboral' },
						{ term: 'prejuicio', meaning: 'opinión previa negativa y sin fundamento objetivo' }
					],
					mainIdeaHeader: '1. El autor defiende la idea de que :',
					mainIdeaOptions: [
						'La formación profesional es una vía digna, moderna y esencial para la inserción laboral juvenil',
						'Solo los estudios teóricos merecen respeto en la sociedad',
						'Los oficios prácticos no necesitan ningún rigor técnico ni idiomas'
					],
					mainIdeaCorrect:
						'La formación profesional es una vía digna, moderna y esencial para la inserción laboral juvenil',
					tfItems: [
						{
							q: 'Actualmente existen sectores modernos que demandan técnicos cualificados, como las energías renovables.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'El texto considera que la formación profesional impide una inserción laboral rápida.',
							a: 'Falso',
							c: 'Facilita una inserción rápida en la vida activa y dignifica a quien ejerce el oficio (§2).',
							mark: '0.5'
						},
						{
							q: 'Dominar idiomas técnicos y normas de seguridad enriquece el trabajo del técnico.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'El autor propone enfrentar la universidad contra los institutos de formación profesional.',
							a: 'Falso',
							c: 'Propone valorar los institutos de formación profesional junto con las universidades (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Cita tres sectores actuales que demandan técnicos cualificados según el párrafo 1.',
							a: 'Energías renovables, mecánica de precisión, artesanía restauradora y gestión digital.',
							mark: '1'
						},
						{
							q: 'b) ¿Qué triple combinación convierte al joven técnico en un profesional valioso (§2)?',
							a: 'Unir la habilidad manual con el conocimiento de las normas de seguridad y los idiomas técnicos.',
							mark: '0.75'
						},
						{
							q: 'c) ¿Qué obstáculo cultural pide superar el texto en su conclusión (§3)?',
							a: 'Los prejuicios sociales estériles contra los oficios técnicos y manuales.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «esta demanda real» (§1)   b) «prejuicios sociales» (§3)',
					refAnswer:
						'a) «esta demanda real» alude a la necesidad urgente del mercado de contar con técnicos cualificados en sectores modernos y artesanales.   b) «prejuicios sociales» remite a la idea equivocada que infravalora los oficios manuales y técnicos.',
					synthPrompt:
						'¿Por qué resulta tan importante combatir los prejuicios contra los oficios manuales y técnicos en la sociedad? Desarrolla tu respuesta en cuatro o cinco líneas.',
					synthAnswer:
						'Combatir esos prejuicios es fundamental porque toda sociedad próspera depende del trabajo bien hecho en talleres, campos, hospitales e industrias. Además, orientar a cada joven según su verdadera vocación técnica evita el desempleo y convierte cualquier oficio honrado en una fuente de orgullo y servicio común.',
					quizzes: {
						easy: {
							q: '¿Qué profesiones actuales menciona el párrafo 1 como ejemplos de alta demanda técnica?',
							correct: 'Energías renovables, mecánica de precisión, artesanía restauradora y gestión digital',
							wrong: [
								'Tareas pasivas sin formación técnica',
								'Actividades basadas en el ocio pasivo',
								'Oficios ajenos a toda norma de seguridad'
							],
							explanation: 'تذكر الفقرة الأولى بوضوح القطاعات التقنية والحرفية والرقمية المطلوبة.'
						} as McqSpec,
						medium: {
							q: '¿Qué quiere decir el verbo «dignifica» en el párrafo 2 («Aprender un oficio práctico... dignifica a quien lo ejerce»)?',
							correct: 'Ennoblece y otorga respeto social y personal al trabajador honrado',
							wrong: [
								'Reduce los ingresos de las familias',
								'Prohíbe estudiar lenguas extranjeras',
								'Aísla al joven del mercado laboral'
							],
							explanation: 'الفعل «dignificar» يعني إضفاء الكرامة والاحترام على صاحب العمل المتقن.'
						} as McqSpec,
						hard: {
							q: '¿Qué función desempeña el adverbio «erróneamente» en la primera frase del texto?',
							correct: 'Marca la distancia crítica del autor frente a un prejuicio antiguo sobre los estudios teóricos',
							wrong: [
								'Expresa aprobación hacia los prejuicios sociales',
								'Introduce una fecha histórica medieval',
								'Describe una fórmula matemática'
							],
							explanation: 'الظرف التقييمي «erróneamente» أداة موقف واضحة يفند بها الكاتب فكرة مسبقة خاطئة.'
						} as McqSpec
					}
				},
				{
					title: 'Economía solidaria y cooperativas locales: trabajar juntos para prosperar',
					source: 'Adaptado de un análisis socioeconómico contemporáneo',
					paragraphs: [
						'En numerosas localidades rurales y urbanas, las pequeñas cooperativas productivas demuestran que la eficacia económica y la solidaridad no son opuestas. Reunidos en torno a talleres textiles, almazaras de aceite de oliva o servicios de reciclaje, varios trabajadores comparten herramientas, reducen gastos y garantizan precios justos tanto para el productor como para el consumidor.',
						'A diferencia de la competencia ciega que busca el beneficio rápido a costa de la calidad, [[el modelo cooperativo]] apuesta por la transparencia, la repartición equitativa de responsabilidades y el cuidado del entorno natural.',
						'Cuando la confianza mutua y la honradez rigen [[estas iniciativas colectivas]], el trabajo deja de ser una carga solitaria para convertirse en motor de cohesión y dignidad comunitaria.'
					],
					glossary: [
						{ term: 'almazara', meaning: 'molino tradicional o moderno donde se extrae el aceite de oliva' },
						{ term: 'equitativo', meaning: 'justo y proporcionado para cada participante' }
					],
					mainIdeaHeader: '1. La idea principal del texto muestra que :',
					mainIdeaOptions: [
						'Las cooperativas solidarias logran prosperidad económica uniendo transparencia, calidad y apoyo mutuo',
						'La solidaridad social es incompatible con cualquier actividad productiva',
						'La competencia ciega sin reglas protege mejor a los pequeños productores'
					],
					mainIdeaCorrect:
						'Las cooperativas solidarias logran prosperidad económica uniendo transparencia, calidad y apoyo mutuo',
					tfItems: [
						{
							q: 'Las cooperativas permiten compartir herramientas, reducir gastos y ofrecer precios justos.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'El texto afirma que eficacia económica y solidaridad son siempre incompatibles.',
							a: 'Falso',
							c: 'Las cooperativas demuestran justamente que eficacia económica y solidaridad no son opuestas (§1).',
							mark: '0.5'
						},
						{
							q: 'El modelo cooperativo prioriza el beneficio rápido por encima de la calidad.',
							a: 'Falso',
							c: 'A diferencia de la competencia ciega, apuesta por la transparencia y la calidad (§2).',
							mark: '0.5'
						},
						{
							q: 'La confianza mutua y la honradez transforman el trabajo colectivo en cohesión comunitaria.',
							a: 'Verdadero',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Cita dos ejemplos de actividades cooperativas locales mencionados en el párrafo 1.',
							a: 'Talleres textiles, almazaras de aceite de oliva y servicios de reciclaje.',
							mark: '0.75'
						},
						{
							q: 'b) ¿Qué tres principios definen el modelo cooperativo frente a la competencia ciega (§2)?',
							a: 'La transparencia, la repartición equitativa de responsabilidades y el cuidado del entorno natural.',
							mark: '1'
						},
						{
							q: 'c) ¿Qué transformación produce la honradez sobre el sentido del trabajo al final del texto (§3)?',
							a: 'Convierte el trabajo de una carga solitaria en motor de cohesión y dignidad comunitaria.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «el modelo cooperativo» (§2)   b) «estas iniciativas colectivas» (§3)',
					refAnswer:
						'a) «el modelo cooperativo» remite a la organización solidaria de trabajadores que comparten herramientas y beneficios justos.   b) «estas iniciativas colectivas» alude a las pequeñas cooperativas productivas locales.',
					synthPrompt:
						'¿Por qué crees que la cooperación y la transparencia resultan tan eficaces para los jóvenes que empiezan un negocio? Responde en cuatro o cinco líneas.',
					synthAnswer:
						'Unirse en una cooperativa permite a los jóvenes sumar competencias distintas, repartir los gastos iniciales y superar las dificultades con apoyo mutuo. Además, la transparencia y la honradez generan la confianza de los clientes, que es la base más sólida para que cualquier empresa dure.',
					quizzes: {
						easy: {
							q: '¿Qué ventajas económicas obtienen los trabajadores al reunirse en cooperativas locales (§1)?',
							correct: 'Comparten herramientas, reducen gastos y aseguran precios justos',
							wrong: [
								'Aumentan el desperdicio de materiales',
								'Eliminan la calidad de los productos',
								'Trabajan aislados sin ayuda mutua'
							],
							explanation: 'تذكر الفقرة الأولى الفوائد العملية للتعاونيات في تقاسم المعدات وتقليص التكاليف.'
						} as McqSpec,
						medium: {
							q: '¿Qué valores oponen al modelo cooperativo frente a la «competencia ciega» en el párrafo 2?',
							correct: 'La transparencia, la equidad en las responsabilidades y el cuidado ambiental',
							wrong: [
								'El lucro rápido a costa de la calidad',
								'La ocultación de las cuentas',
								'El abandono del entorno rural'
							],
							explanation: 'يقابل النص بين المنافسة العمياء والنموذج التعاوني الشفاف والعادل.'
						} as McqSpec,
						hard: {
							q: '¿Qué recurso sintáctico introduce la oposición entre ambos modelos económicos al inicio del párrafo 2?',
							correct: 'La locución prepositiva comparativa de contraste «A diferencia de»',
							wrong: [
								'Una subordinada final con «para que»',
								'Una interrogativa indirecta con «si»',
								'Un estilo directo entre guiones'
							],
							explanation: 'تفتتح العبارة «A diferencia de» المقابلة المنهجية بين نموذجين اقتصاديين.'
						} as McqSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildMcqPayload(
				chosen.quizzes[difficulty],
				`فهم النص BAC 3AS LE («${chosen.title}»): اختر الإجابة الصحيحة`,
				'راجع الفقرة المشار إليها وتأكد من القيم المهنية والتركيب النحوي الوارد فيها.',
				rng
			);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Comprensión del texto',
				points: 7,
				instruction: 'Lee atentamente este texto socioeconómico y contesta a las preguntas (7 puntos — BAC 3AS LE) :',
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
						content: `3. Responde de manera precisa a las preguntas siguientes :\n${chosen.openQuestions.map((x) => x.q).join('\n')}`,
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
				trimesterId: 't3',
				difficulty,
				domain: 'comprension_lectora',
				examRole: 'comprehension',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'ركز على المزايا الاقتصادية والأخلاقية لريادة الأعمال والتعاونيات في النص.',
					'في أسئلة «Falso»، استخرج الفكرة المضادة الدقيقة من الفقرة نفسها.',
					'في سؤال الرأي، اربط العمل الناجح بالكفاءة، الإتقان، والالتزام الأخلاقي.'
				],
				solutionStepsAr: [
					'تحديد الفكرة الرئيسية للنص (0.5 نقطة).',
					'الحكم على العبارات وتبرير الخطأ (2 نقطتان).',
					'الإجابة المعللة عن أسئلة الفهم الثلاثة (2.5 نقطة).',
					'تحديد الإحالات النصية وتحرير الرأي الشخصي (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. COMPREHENSION (7 pts): Páginas Eternas — Legado andalusí y magrebí
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_tpl_3as_le_t3_comp_paginas_eternas',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'cultura_civilizacion',
		titleAr: 'فهم النص (7 نقاط — لغات أجنبية): صفحات خالدة — الإرث العلمي والمعماري الأندلسي والمغاربي',
		curriculumLessonId: 'spa_lesson_3as_le_t3_paginas_eternas_legado_andalusi',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Córdoba, Medina Azahara y Al-Zahrawi : luz de la ciencia y la cirugía',
					source: 'Adaptado de una crónica sobre Páginas Eternas e historia científica',
					paragraphs: [
						'En el siglo X, Córdoba brillaba como una de las capitales intelectuales más avanzadas del mundo mediterráneo. Sus bibliotecas reunían cientos de miles de manuscritos traducidos y comentados, mientras la ciudad palatina de Medina Azahara asombraba a los viajeros por sus acequias, jardines botánicos y salones de mármol. En [[aquella urbe fecunda]] floreció el médico y cirujano Al-Zahrawi.',
						'Tras décadas de observación clínica, Al-Zahrawi redactó su monumental enciclopedia médica titulada Kitab al-Tasrif, en la que describió procedimientos quirúrgicos innovadores e ilustró más de doscientos instrumentos de precisión. Si no hubiera documentado minuciosamente sus hallazgos, las facultades europeas no habrían dispuesto durante cinco siglos de [[un manual tan fiable]].',
						'Recordar hoy la labor incansable de Al-Zahrawi y el esplendor de Córdoba nos enseña que la curiosidad científica y la ética médica forman un patrimonio común entre ambas orillas.'
					],
					glossary: [
						{ term: 'acequia', meaning: 'canal estrecho para conducir el agua de riego o fuentes' },
						{ term: 'minuciosamente', meaning: 'con gran atención a cada pequeño detalle' }
					],
					mainIdeaHeader: '1. Este texto histórico-cultural resalta principalmente :',
					mainIdeaOptions: [
						'El esplendor científico de Córdoba y la aportación médica universal de Al-Zahrawi',
						'El cierre de todas las bibliotecas de Medina Azahara en el siglo X',
						'La prohibición de ilustrar instrumentos quirúrgicos en Al-Ándalus'
					],
					mainIdeaCorrect:
						'El esplendor científico de Córdoba y la aportación médica universal de Al-Zahrawi',
					tfItems: [
						{
							q: 'En el siglo X, las bibliotecas de Córdoba albergaban cientos de miles de manuscritos.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'Medina Azahara carecía por completo de sistemas hidráulicos y jardines.',
							a: 'Falso',
							c: 'Asombraba a los viajeros por sus acequias, jardines botánicos y salones de mármol (§1).',
							mark: '0.5'
						},
						{
							q: 'Al-Zahrawi ilustró más de doscientos instrumentos quirúrgicos en Kitab al-Tasrif.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'La obra de Al-Zahrawi perdió toda influencia apenas un año después de su redacción.',
							a: 'Falso',
							c: 'Sirvió como manual fiable en facultades europeas durante cinco siglos (§2).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) ¿Qué elementos urbanos y culturales distinguían a Córdoba y Medina Azahara en el siglo X (§1)?',
							a: 'Sus grandes bibliotecas con cientos de miles de manuscritos, sus acequias, jardines botánicos y salones de mármol.',
							mark: '1'
						},
						{
							q: 'b) ¿Por qué fue tan decisivo Kitab al-Tasrif en la historia de la medicina (§2)?',
							a: 'Porque reunió décadas de observación clínica, describió cirugías innovadoras e ilustró más de doscientos instrumentos de precisión utilizados durante cinco siglos.',
							mark: '0.75'
						},
						{
							q: 'c) ¿Qué lección actual extrae el autor de este legado andalusí (§3)?',
							a: 'Que la curiosidad científica y la ética médica forman un patrimonio común entre el Magreb y España.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «aquella urbe fecunda» (§1)   b) «un manual tan fiable» (§2)',
					refAnswer:
						'a) «aquella urbe fecunda» remite a la Córdoba del siglo X (y su entorno de Medina Azahara).   b) «un manual tan fiable» alude a la enciclopedia médica Kitab al-Tasrif de Al-Zahrawi.',
					synthPrompt:
						'¿Por qué crees que el estudio de sabios como Al-Zahrawi dentro de Páginas Eternas fortalece el orgullo y la ambición científica de los jóvenes? Responde en cuatro o cinco líneas.',
					synthAnswer:
						'Estudiar la obra de Al-Zahrawi recuerda a los jóvenes que la ciencia rigurosa y la medicina experimental florecieron brillantemente en nuestra civilización. Además, su paciencia para observar y documentar cada instrumento inspira hoy a los estudiantes a perseguir la excelencia académica con humildad y perseverancia.',
					quizzes: {
						easy: {
							q: 'Al-Zahrawi redactó en Córdoba la enciclopedia quirúrgica Kitab al-Tasrif con ilustraciones de más de doscientos instrumentos.',
							correctAnswer: true,
							explanation: 'صحيح: تذكر الفقرة الثانية كتاب «التصريف» للزهراوي وأدواته الجراحية الدقيقة.'
						} as TfSpec,
						medium: {
							q: 'Según el párrafo 2, la obra médica de Al-Zahrawi nunca llegó a conocerse fuera de Córdoba.',
							correctAnswer: false,
							explanation: 'خطأ: اعتمدتها كليات الطب الأوروبية مرجعاً موثوقاً لخمسة قرون.'
						} as TfSpec,
						hard: {
							q: 'La frase «Si no hubiera documentado minuciosamente sus hallazgos...» constituye una condicional irreal del pasado que subraya el valor de la transmisión escrita.',
							correctAnswer: true,
							explanation: 'صحيح: هذا شرط غير متحقق في الماضي (3.º tipo) يبرز أثر التدوين العلمي.'
						} as TfSpec
					}
				},
				{
					title: 'De la Alhambra de Granada a Tremecén : arquitectura, agua y geometría',
					source: 'Adaptado de una reseña sobre arquitectura andalusí y magrebí',
					paragraphs: [
						'Quien contempla los arcos bicolores de la Mezquita de Córdoba, los patios serenos de la Alhambra de Granada o la Gran Mezquita de Tremecén percibe enseguida un mismo lenguaje estético y científico. Lejos de ser mera decoración, [[estas obras]] integran matemáticas, acústica e ingeniería hidráulica.',
						'En la Alhambra, el agua asciende por canales ocultos hasta surtidores equilibrados por pura gravedad sin motores modernos, refrescando el aire en verano. Del mismo modo, en la ciudad argelina de Tremecén, alminares proporcionados, aljibes y celosías geométricas muestran el diálogo artístico ininterrumpido entre Al-Ándalus y el Magreb.',
						'Preservar y estudiar [[este patrimonio compartido]] permite admirar cómo la belleza exterior nacía del rigor matemático y del respeto armonioso por la naturaleza.'
					],
					glossary: [
						{ term: 'celosía', meaning: 'tablero calado con figuras geométricas que tamiza la luz' },
						{ term: 'aljibe', meaning: 'depósito subterráneo destinado a recoger y conservar agua limpia' }
					],
					mainIdeaHeader: '1. La tesis principal del texto sostiene que :',
					mainIdeaOptions: [
						'La arquitectura de Córdoba, Granada y Tremecén une arte geométrico, ingeniería hidráulica y diálogo cultural',
						'Las construcciones de la Alhambra y Tremecén carecían de conocimientos matemáticos',
						'El agua de la Alhambra funcionaba mediante motores eléctricos modernos'
					],
					mainIdeaCorrect:
						'La arquitectura de Córdoba, Granada y Tremecén une arte geométrico, ingeniería hidráulica y diálogo cultural',
					tfItems: [
						{
							q: 'La Mezquita de Córdoba, la Alhambra y la Gran Mezquita de Tremecén comparten un lenguaje estético y científico.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'La arquitectura andalusí era pura decoración sin base matemática ni acústica.',
							a: 'Falso',
							c: 'Lejos de ser mera decoración, estas obras integran matemáticas, acústica e ingeniería hidráulica (§1).',
							mark: '0.5'
						},
						{
							q: 'Los surtidores de la Alhambra funcionaban aprovechando la gravedad natural del agua.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'Tremecén no conserva ninguna huella artística vinculada al arte andalusí.',
							a: 'Falso',
							c: 'Alminares proporcionados, aljibes y celosías geométricas muestran ese diálogo ininterrumpido (§2).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) ¿Qué tres disciplinas científicas se integran en los monumentos citados en el párrafo 1?',
							a: 'Las matemáticas, la acústica y la ingeniería hidráulica.',
							mark: '0.75'
						},
						{
							q: 'b) Explica cómo se lograba llevar y aprovechar el agua en los patios de la Alhambra (§2).',
							a: 'Mediante canales ocultos y surtidores equilibrados por pura gravedad sin motores modernos, lo que además refrescaba el aire.',
							mark: '1'
						},
						{
							q: 'c) ¿Qué relación muestra el texto entre la belleza artística y la naturaleza en el cierre (§3)?',
							a: 'La belleza nacía del rigor matemático unido al respeto armonioso por la naturaleza.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «estas obras» (§1)   b) «este patrimonio compartido» (§3)',
					refAnswer:
						'a) «estas obras» refiere a la Mezquita de Córdoba, la Alhambra de Granada y la Gran Mezquita de Tremecén.   b) «este patrimonio compartido» alude al conjunto arquitectónico y científico andalusí y magrebí común a España y Argelia.',
					synthPrompt:
						'¿Por qué es importante que los jóvenes conozcan los vínculos históricos y arquitectónicos entre ciudades como Tremecén, Córdoba y Granada? Responde en cuatro o cinco líneas.',
					synthAnswer:
						'Conocer estos vínculos demuestra que la cultura argelina y la arquitectura andalusí formaron una tradición común de ciencia, geometría y arte. Esta conciencia refuerza el respeto hacia nuestro patrimonio histórico como Tremecén y anima a cuidar estos monumentos mediante la restauración y el estudio.',
					quizzes: {
						easy: {
							q: 'La Alhambra de Granada lograba hacer circular el agua por sus patios y surtidores aprovechando la gravedad natural sin motores modernos.',
							correctAnswer: true,
							explanation: 'صحيح: تصف الفقرة الثانية هندسة المياه بالجاذبية الطبيعية في قصر الحمراء.'
						} as TfSpec,
						medium: {
							q: 'Según el texto, la ciudad de Tremecén es completamente ajena al diálogo arquitectónico entre el Magreb y Al-Ándalus.',
							correctAnswer: false,
							explanation: 'خطأ: تبرز الفقرة الثانية الجامع الكبير بتلمسان وزخارفه الهندسية والمعمارية كشاهد حي على هذا التبادل.'
						} as TfSpec,
						hard: {
							q: 'El término español «aljibe» citado en el párrafo 2 refleja la herencia histórica lingüística y técnica compartida entre el árabe y el español.',
							correctAnswer: true,
							explanation: 'صحيح: كلمة «aljibe» (الجب / الصهريج) من الكلمات العربية الأصيلة في الإسبانية.'
						} as TfSpec
					}
				},
				{
					title: 'Ibn Jaldún e Ibn Battuta : viajeros y observadores entre el Magreb y Al-Ándalus',
					source: 'Adaptado de una lectura de Páginas Eternas sobre historiografía y viajes',
					paragraphs: [
						'Antes de que existieran los medios de transporte modernos, dos sabios extraordinarios del siglo XIV recorrieron ciudades y caminos legando testimonios insustituibles. El viajero Ibn Battuta visitó tanto puertos argelinos como Bugía y Tremecén como las tierras de Al-Ándalus, anotando en su Rihlah la vida de las escuelas, los mercados y la hospitalidad de [[los habitantes]].',
						'Por su parte, el pensador Ibn Jaldún enseñó en Bugía y se retiró luego en la región argelina de Tiaret, en la Qal’a de Beni Salama, donde redactó su célebre Muqaddimah. En lugar de repetir relatos sin comprobar, [[el historiador]] propuso analizar las causas económicas, geográficas y morales que explican el auge y la decadencia de los pueblos.',
						'Leer hoy sus páginas invita a mirar nuestra historia con espíritu crítico y a comprender el valor eterno del rigor intelectual.'
					],
					glossary: [
						{ term: 'auge', meaning: 'momento de mayor desarrollo y prosperidad de una civilización' },
						{ term: 'testimonio', meaning: 'relato fiel de lo visto o estudiado directamente' }
					],
					mainIdeaHeader: '1. El texto pone de relieve :',
					mainIdeaOptions: [
						'La aportación viajera y científica de Ibn Battuta e Ibn Jaldún entre el Magreb, Argelia y Al-Ándalus',
						'El rechazo de la observación directa en la obra de Ibn Jaldún',
						'La ausencia de ciudades magrebíes en el itinerario de Ibn Battuta'
					],
					mainIdeaCorrect:
						'La aportación viajera y científica de Ibn Battuta e Ibn Jaldún entre el Magreb, Argelia y Al-Ándalus',
					tfItems: [
						{
							q: 'Ibn Battuta visitó ciudades argelinas como Bugía y Tremecén y también viajó por Al-Ándalus.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'Ibn Jaldún escribió su Muqaddimah en una ciudad europea en el siglo XIX.',
							a: 'Falso',
							c: 'La redactó en la Qal’a de Beni Salama, en la región argelina de Tiaret, en el siglo XIV (§2).',
							mark: '0.5'
						},
						{
							q: 'Ibn Jaldún examinó las causas económicas, geográficas y morales del auge y caída de las sociedades.',
							a: 'Verdadero',
							mark: '0.5'
						},
						{
							q: 'La obra de estos dos sabios carece de valor crítico para el lector contemporáneo.',
							a: 'Falso',
							c: 'Invita a mirar la historia con espíritu crítico y a valorar el rigor intelectual (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) ¿Qué aspectos de las ciudades anotaba Ibn Battuta en su obra Al-Rihlah (§1)?',
							a: 'La vida de las escuelas, los mercados y la hospitalidad de sus habitantes en ciudades como Bugía, Tremecén y Al-Ándalus.',
							mark: '0.75'
						},
						{
							q: 'b) ¿Qué método histórico innovador aplicó Ibn Jaldún en La Muqaddimah (§2)?',
							a: 'Evitó repetir relatos sin verificar y analizó las causas económicas, geográficas y morales que explican el auge y la decadencia de las civilizaciones.',
							mark: '1'
						},
						{
							q: 'c) ¿Qué relación geográfica concreta unió a Ibn Jaldún con Argelia según el párrafo 2?',
							a: 'Enseñó en Bugía y redactó su Muqaddimah en la Qal’a de Beni Salama (región de Tiaret).',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «los habitantes» (§1)   b) «el historiador» (§2)',
					refAnswer:
						'a) «los habitantes» remite a la población de las ciudades magrebíes y andalusíes visitadas por Ibn Battuta (Bugía, Tremecén y Al-Ándalus).   b) «el historiador» designa a Ibn Jaldún.',
					synthPrompt:
						'¿Por qué consideras actual el consejo de Ibn Jaldún de analizar las causas reales de los hechos en lugar de repetir informaciones sin comprobar? Responde en cuatro o cinco líneas.',
					synthAnswer:
						'El método crítico de Ibn Jaldún es hoy más necesario que nunca ante la rapidez con la que circulan noticias sin verificar. Analizar las causas profundas y exigir pruebas fiables evita errores históricos y nos educa como ciudadanos e investigadores rigurosos y responsables.',
					quizzes: {
						easy: {
							q: 'Ibn Battuta mencionó ciudades argelinas como Bugía y Tremecén junto con Al-Ándalus en su libro de viajes.',
							correctAnswer: true,
							explanation: 'صحيح: زار ابن بطوطة تلمسان وبجاية والأندلس وسجّل مشاهداته في «الرحلة».'
						} as TfSpec,
						medium: {
							q: 'En el párrafo 2, Ibn Jaldún se limitaba a copiar leyendas antiguas sin examinar las causas económicas o geográficas.',
							correctAnswer: false,
							explanation: 'خطأ: رفض ابن خلدون النقل الأعمى وحلل الأسباب الاقتصادية والجغرافية والأخلاقية.'
						} as TfSpec,
						hard: {
							q: 'Según el texto, la Qal’a de Beni Salama (Tiaret) y Bugía fueron escenarios fundamentales en la labor docente y de escritura de Ibn Jaldún.',
							correctAnswer: true,
							explanation: 'صحيح: درّس ابن خلدون ببجاية وألّف «المقدمة» بقلعة بني سلامة في تيارت.'
						} as TfSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildTfPayload(chosen.quizzes[difficulty]);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Comprensión del texto',
				points: 7,
				instruction: 'Lee atentamente esta página cultural sobre el legado andalusí y magrebí y responde (7 puntos — BAC 3AS LE) :',
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
						content: `3. Contesta con rigor a las siguientes preguntas :\n${chosen.openQuestions.map((x) => x.q).join('\n')}`,
						answer: chosen.openQuestions.map((x) => `${x.q.slice(0, 2)} ${x.a}`).join('\n'),
						mark: '2.5'
					},
					{
						type: 'text',
						content: `4. Precisa el referente de las expresiones subrayadas :\n${chosen.refPrompt}`,
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
				trimesterId: 't3',
				difficulty,
				domain: 'cultura_civilizacion',
				examRole: 'comprehension',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تثبت من الأعلام والمعالم التاريخية: قرطبة، الحمراء، تلمسان، الزهراوي، ابن خلدون، وابن بطوطة.',
					'في أسئلة «Falso»، استند دائماً إلى التبرير النصي الصريح داخل الفقرة.',
					'اربط إرث الماضي في سؤال التفكير بقيمة المنهج التجريبي والاجتهاد الدراسي اليوم.'
				],
				solutionStepsAr: [
					'تحديد الفكرة المحورية للنص الحضاري (0.5 نقطة).',
					'الحكم على العبارات وتصحيح الخطأ (2 نقطتان).',
					'الإجابة الدقيقة عن أسئلة الفهم الثلاثة (2.5 نقطة).',
					'تحديد المرجعيات النصية وتحرير فقرة الرأي (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. LINGUISTIC COMPETENCE (7 pts): Condicionales 1/2/3 y contraste modal (SVG)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_tpl_3as_le_t3_ling_condicionales_modal',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'conjugacion_modos',
		titleAr: 'الكفاءة اللغوية (7 نقاط — لغات أجنبية): الجمل الشرطية الثلاث والمقابلة الصيغية المتقدمة',
		curriculumLessonId: 'spa_lesson_3as_le_t3_condicionales_contraste_modal',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					mapTitle: 'Sistema Condicional y Contraste Modal BAC',
					mapRoot: 'Tres tipos condicionales con «si»',
					mapSub: 'Nunca futuro ni condicional tras «si» condicional',
					mapBranches: [
						{ label: '1.º Tipo (Real)', rule: 'Si + Pres. Ind. : Fut.', example: 'Si lees, aprenderás.' },
						{ label: '2.º Tipo (Irreal)', rule: 'Si + Imp. Subj. : Cond.', example: 'Si fuera, vería.' },
						{ label: '3.º Tipo (Pasado)', rule: 'Si + Plusc. : Cond. Comp.', example: 'Si hubiera ido, habría visto.' },
						{ label: 'Cuando (Futuro)', rule: 'cuando + Pres. Subj.', example: 'Cuando llegue, iré.' }
					],
					classPrompt:
						'1. Clasifica estas oraciones condicionales según pertenezcan al 2.º Tipo (irreal del presente) o al 3.º Tipo (irreal del pasado) : Si estudiara más, mejoraría - Si hubiera previsto el fallo, lo habría evitado - Si tuviéramos más tiempo, visitaríamos Tremecén - Si hubiesen cooperado antes, habrían prosperado.',
					classCols: [
						{
							header: '2.º Tipo (Irreal presente/futuro)',
							items: ['Si estudiara más, mejoraría', 'Si tuviéramos más tiempo, visitaríamos Tremecén'],
							mark: '0.75'
						},
						{
							header: '3.º Tipo (Irreal del pasado)',
							items: ['Si hubiera previsto el fallo, lo habría evitado', 'Si hubiesen cooperado antes, habrían prosperado'],
							mark: '0.75'
						}
					],
					conjPrompt:
						'2. Conjuga los verbos entre paréntesis respetando el tipo condicional y el contraste modal :\na) Si Al-Zahrawi no (escribir) Kitab al-Tasrif, la cirugía habría avanzado mucho más lento.\nb) Si las cooperativas reciben apoyo técnico este año, (crear) nuevos empleos rurales.\nc) En cuanto (terminar, tú) el examen mañana, llámame para comentar las preguntas.\nd) Trabajaré en ese proyecto siempre que el equipo (actuar) con transparencia.',
					conjAnswer:
						'a) hubiera escrito / hubiese escrito (3.º tipo).\nb) crearán (1.º tipo : futuro).\nc) termines (presente de subjuntivo tras en cuanto con valor de futuro).\nd) actúe (presente de subjuntivo tras siempre que).',
					transformPrompt:
						'3. Transforma las oraciones según se indica :\na) Pasa del 1.º tipo al 3.º tipo : «Si los jóvenes investigan el mercado, evitarán las pérdidas.»\nb) Sustituye «si» por «a condición de que» : «Te ayudaré con el proyecto si cumples el horario.»',
					transformAnswer:
						'a) Si los jóvenes hubieran (o hubiesen) investigado el mercado, habrían evitado las pérdidas.\nb) Te ayudaré con el proyecto a condición de que cumplas el horario.',
					clozePrompt:
						'4. Completa el texto con : hubiera conservado - visiten - habrían perdido - aprendieran.\nCuando los alumnos (1) .......... la Alhambra o Tremecén el próximo trimestre, entenderán mejor su geometría. Si no se (2) .......... ese legado escrito, los siglos (3) .......... una memoria valiosa; por eso los antiguos maestros pedían que todos (4) .......... con rigor.',
					clozeAnswer: '1) visiten   2) hubiera conservado   3) habrían perdido   4) aprendieran',
					quizzes: {
						easy: {
							q: 'Completa la condicional real (1.º tipo) evitando el error con «si»:',
							sentence: 'Si ___ el documento con calma, comprenderás todas las preguntas.',
							correct: 'lees',
							distractors: ['leerás', 'leerías', 'leyeras'],
							explanation: 'في النوع الأول نستعمل Presente de indicativo بعد «si» وليس المستقبل أو الشرطي.'
						} as ClozeSpec,
						medium: {
							q: 'Completa la condicional irreal del pasado (3.º tipo):',
							sentence: 'Si los artesanos hubieran restaurado el aljibe antes, no ___ tanta agua.',
							correct: 'habrían perdido',
							distractors: ['perderán', 'pierden', 'perdieran'],
							explanation: 'مع «Si + hubiera + participio» نستعمل في جواب الشرط Condicional compuesto: «habrían perdido».'
						} as ClozeSpec,
						hard: {
							q: 'Selecciona el modo exacto tras la locución condicional «siempre que»:',
							sentence: 'Las empresas jóvenes triunfarán siempre que ___ planificación y honradez.',
							correct: 'mantengan',
							distractors: ['mantienen', 'mantendrán', 'mantenían'],
							explanation: 'الرابط الشرطي «siempre que» (بشرط أن) يفرض صيغة Subjuntivo دائماً.'
						} as ClozeSpec
					}
				},
				{
					mapTitle: 'Condicionales y Nexos Temporales BAC',
					mapRoot: 'Contraste Indicativo vs. Subjuntivo',
					mapSub: 'Depende del valor real/habitual o futuro/hipotético',
					mapBranches: [
						{ label: 'Cuando (Hábito)', rule: '+ Indicativo', example: 'Cuando lee, aprende.' },
						{ label: 'Cuando (Futuro)', rule: '+ Pres. Subjuntivo', example: 'Cuando lea, aprenderá.' },
						{ label: 'Como si', rule: '+ Imp. / Plusc. Subj.', example: 'Habla como si supiera.' },
						{ label: 'Con tal de que', rule: '+ Subjuntivo siempre', example: 'Iré con tal de que vengas.' }
					],
					classPrompt:
						'1. Clasifica estas oraciones según el valor temporal o hipotético tras el nexo : Cuando llegues mañana, avísame - Cuando viaja, visita museos - Tan pronto como salga el sol, saldremos - Cuando visitó Córdoba, admiró los arcos.',
					classCols: [
						{
							header: 'Valor presente habitual o pasado (Indicativo)',
							items: ['Cuando viaja, visita museos', 'Cuando visitó Córdoba, admiró los arcos'],
							mark: '0.75'
						},
						{
							header: 'Valor futuro pendiente (Subjuntivo)',
							items: ['Cuando llegues mañana, avísame', 'Tan pronto como salga el sol, saldremos'],
							mark: '0.75'
						}
					],
					conjPrompt:
						'2. Conjuga correctamente los verbos entre paréntesis :\na) Si los investigadores (tener) mejores herramientas hoy, catalogarían todos los manuscritos.\nb) Si Ibn Battuta no (dictar) su Rihlah, desconoceríamos muchos detalles del siglo XIV.\nc) Describió Medina Azahara como si él mismo (contemplar) sus jardines en persona.\nd) Cuando (conseguir, nosotros) el título en junio, celebraremos el fruto del esfuerzo.',
					conjAnswer:
						'a) tuvieran / tuviesen (2.º tipo).\nb) hubiera dictado / hubiese dictado (3.º tipo).\nc) hubiera contemplado (pluscuamperfecto de subjuntivo tras como si).\nd) consigamos (presente de subjuntivo tras cuando con futuro).',
					transformPrompt:
						'3. Realiza las siguientes transformaciones :\na) Pasa del 2.º tipo al 3.º tipo : «Si valoráramos más la formación técnica, habría menos desempleo.»\nb) Reemplaza «cuando» pasado por «cuando» futuro : «Cuando leímos la Muqaddimah, entendimos su método.» (Usa : leer / entender en futuro)',
					transformAnswer:
						'a) Si hubiéramos valorado más la formación técnica, habría habido menos desempleo.\nb) Cuando leamos la Muqaddimah, entenderemos su método.',
					clozePrompt:
						'4. Completa con : hubieran planificado - tengan - supiera - aprenderías.\nSi tú visitaras la Gran Mezquita de Tremecén, (1) .......... mucha historia artística. El guía explicaba cada arco como si (2) .......... arquitectura clásica. Además, si los gestores anteriores (3) .......... antes la restauración, hoy todos disfrutarían mientras los estudiantes (4) .......... curiosidad por investigar.',
					clozeAnswer: '1) aprenderías   2) supiera   3) hubieran planificado   4) tengan',
					quizzes: {
						easy: {
							q: 'Elige la forma de 2.º tipo condicional (irreal del presente):',
							sentence: 'Si nosotros ___ más bibliotecas en los barrios, los jóvenes leerían mucho más.',
							correct: 'tuviéramos',
							distractors: ['tenemos', 'tendremos', 'tendríamos'],
							explanation: 'في النوع الثاني من الشرط نضع Imperfecto de subjuntivo بعد «si»: «tuviéramos».'
						} as ClozeSpec,
						medium: {
							q: 'Selecciona la conjugación correcta con valor futuro tras «cuando»:',
							sentence: 'Cuando los bachilleres ___ sus resultados en julio, prepararán la matrícula universitaria.',
							correct: 'reciban',
							distractors: ['reciben', 'recibirán', 'recibieron'],
							explanation: 'الجملة تدل على المستقبل (en julio, prepararán)، لذا نضع Presente de subjuntivo بعد «cuando»: «reciban».'
						} as ClozeSpec,
						hard: {
							q: 'Completa el 3.º tipo condicional en su prótasis (tras «si»):',
							sentence: 'Si el equipo ___ las pruebas con antelación, habría evitado el retraso de ayer.',
							correct: 'hubiera revisado',
							distractors: ['revisará', 'había revisado', 'revisaría'],
							explanation: 'جواب الشرط في Condicional compuesto (habría evitado) يفرض Pluscuamperfecto de subjuntivo بعد «si».'
						} as ClozeSpec
					}
				},
				{
					mapTitle: 'Dominio del 3.º Tipo y Modos Verbales',
					mapRoot: 'Precisión sintáctica en BAC 3AS LE',
					mapSub: 'Concordancia entre hipótesis pasada y consecuencias',
					mapBranches: [
						{ label: 'Prótasis 3.º', rule: 'Si + hubiera + participio', example: 'Si hubiera ahorrado...' },
						{ label: 'Apódosis 3.º', rule: 'habría + participio', example: '...habría fundado.' },
						{ label: 'Excepción mixta', rule: 'Pasado con efecto hoy', example: 'Si hubiera leído, hoy sabría.' },
						{ label: 'A menos que', rule: 'Siempre + Subjuntivo', example: 'Irán a menos que llueva.' }
					],
					classPrompt:
						'1. Clasifica estas oraciones según el nexo exija siempre Subjuntivo o admita alternancia modal : con tal de que lleguen - aunque está lloviendo - a menos que llueva - cuando termine el curso - antes de que salga - como si fuera fácil.',
					classCols: [
						{
							header: 'Exige Subjuntivo siempre',
							items: ['con tal de que lleguen', 'a menos que llueva', 'antes de que salga', 'como si fuera fácil'],
							mark: '0.75'
						},
						{
							header: 'Admite Indicativo o Subjuntivo',
							items: ['aunque está lloviendo', 'cuando termine el curso'],
							mark: '0.75'
						}
					],
					conjPrompt:
						'2. Completa con la forma verbal exacta :\na) No lograremos un empleo estable a menos que (formarse, nosotros) de manera continua.\nb) Si aquellos emprendedores no (compartir) sus conocimientos hace dos años, habrían cerrado el taller.\nc) Antes de que (empezar) la conferencia sobre Ibn Jaldún, revisa tus apuntes.\nd) Si hoy (tener, ellos) suficiente agua limpia, ampliarían el huerto comunitario.',
					conjAnswer:
						'a) nos formemos (presente de subjuntivo tras a menos que).\nb) hubieran compartido / hubiesen compartido (3.º tipo).\nc) empiece (presente de subjuntivo tras antes de que).\nd) tuvieran / tuviesen (2.º tipo).',
					transformPrompt:
						'3. Transforma siguiendo el modelo :\na) Transforma en 3.º tipo de condicional : «Como olvidaron verificar la fuente, cometieron un error.» (Empieza por : Si no...)\nb) Sustituye «si no» por «a menos que» : «El proyecto avanzará si no surge un gasto imprevisto.»',
					transformAnswer:
						'a) Si no hubieran olvidado verificar la fuente, no habrían cometido un error.\nb) El proyecto avanzará a menos que surja un gasto imprevisto.',
					clozePrompt:
						'4. Completa con : surja - hubiera dictado - hayan leído - habrían conocido.\nAntes de que (1) .......... cualquier duda sobre las fuentes históricas, conviene que los alumnos (2) .......... la introducción completa. Si Ibn Jaldún no (3) .......... su obra maestra, muchos historiadores no (4) .......... las leyes sociales del Magreb.',
					clozeAnswer: '1) surja   2) hayan leído   3) hubiera redactado / dictado   4) habrían conocido',
					quizzes: {
						easy: {
							q: 'Elige la opción obligatoria tras la conjunción temporal «antes de que»:',
							sentence: 'Guarda los manuscritos en un lugar seco antes de que la humedad los ___.',
							correct: 'dañe',
							distractors: ['daña', 'dañará', 'dañó'],
							explanation: 'الرابط الزمني «antes de que» يتبع دائماً بصيغة Subjuntivo: «dañe».'
						} as ClozeSpec,
						medium: {
							q: 'Completa la apódosis del 3.º tipo condicional:',
							sentence: 'Si los jóvenes hubieran formado una cooperativa hace un año, ya ___ sus costes iniciales.',
							correct: 'habrían reducido',
							distractors: ['reducirán', 'reducen', 'redujeran'],
							explanation: 'الشرط المستحيل في الماضي يقتضي Condicional compuesto في جواب الشرط: «habrían reducido».'
						} as ClozeSpec,
						hard: {
							q: 'Elige la forma exacta tras la locución restrictiva «a menos que»:',
							sentence: 'La campaña de plantación comenzará al alba a menos que ___ una tormenta fuerte.',
							correct: 'estalle',
							distractors: ['estalla', 'estallará', 'estallaría'],
							explanation: '«a menos que» (ما لم) تفرض دوماً Subjuntivo: «estalle».'
						} as ClozeSpec
					}
				}
			];

			const vIdx = rng.int(0, pool.length - 1);
			const chosen = pool[vIdx];
			const svgStr = svgSpanishGrammarMap({
				title: chosen.mapTitle,
				rootLabel: chosen.mapRoot,
				rootSub: chosen.mapSub,
				branches: chosen.mapBranches,
				width: 580
			});
			const svgPath = saveSpanishSvgAsset(`3as_le_t3_condicionales_v${vIdx + 1}`, svgStr);

			const { quizQuestion, finalAnswer } = buildClozePayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Competencia lingüística — B) Condicionales y contraste modal',
				points: 7,
				instruction: 'Consulta el mapa conceptual y resuelve los ejercicios de condicionales y contraste modal (7 puntos — BAC 3AS LE) :',
				content: [
					{
						type: 'image',
						src: svgPath,
						width: 'full',
						caption: 'Síntesis gramatical : Oraciones condicionales (1.º, 2.º y 3.º tipo) y contraste modal.'
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
				trimesterId: 't3',
				difficulty,
				domain: 'conjugacion_modos',
				examRole: 'linguistic_competence',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكّر القاعدة الذهبية: لا نضع أبداً Futuro أو Condicional مباشرة بعد «si» الشرطية.',
					'في النوع الثالث للماضي: Si + hubiera/hubiese + participio، والجواب habría + participio.',
					'روابط مثل antes de que, siempre que, a menos que, con tal de que تأخذ Subjuntivo دائماً.'
				],
				solutionStepsAr: [
					'تصنيف الجمل حسب نوع الشرط أو الصيغة (1.5 نقطة).',
					'تصريف الأفعال في الجمل الشرطية والزمنية (2 نقطتان).',
					'التحويل بين أنواع الشرط أو الروابط الشرطية البديلة (2 نقطتان).',
					'إكمال الفقرة المتكاملة بالصيغ الصحيحة (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. LINGUISTIC COMPETENCE (7 pts): Léxico, derivación y gramática laboral/cultural
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_tpl_3as_le_t3_ling_lexico_patrimonio_trabajo',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'lexico_morfologia',
		titleAr: 'الكفاءة اللغوية (7 نقاط — لغات أجنبية): الصرف، المرادفات والأضداد ومعجم العمل والتراث',
		curriculumLessonId: 'spa_lesson_3as_le_t3_trabajo_emprendimiento_solidaridad',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					classPrompt:
						'1. Clasifica estas palabras en el campo léxico del Trabajo y Emprendimiento o en el de Páginas Eternas : cooperativa - manuscrito - alminar - presupuesto - inserción laboral - aljibe.',
					classCols: [
						{ header: 'Trabajo y Emprendimiento', items: ['cooperativa', 'presupuesto', 'inserción laboral'], mark: '0.5' },
						{ header: 'Páginas Eternas', items: ['manuscrito', 'alminar', 'aljibe'], mark: '0.5' }
					],
					wordRows: [
						{
							verbo: { given: true, value: 'emprender' },
							sustantivo: { value: 'emprendimiento', mark: '0.25' },
							adjetivo: { value: 'emprendedor', mark: '0.25' }
						},
						{
							verbo: { value: 'cooperar', mark: '0.25' },
							sustantivo: { given: true, value: 'cooperación' },
							adjetivo: { value: 'cooperativo', mark: '0.25' }
						},
						{
							verbo: { value: 'prosperar', mark: '0.25' },
							sustantivo: { value: 'prosperidad', mark: '0.25' },
							adjetivo: { given: true, value: 'próspero' }
						}
					],
					lexPrompt:
						'3. Léxico en contexto :\na) Da un sinónimo de : auge (sust.) - honrado (adj.).\nb) Forma el antónimo añadiendo un prefijo : equitativo - empleo - transparente - estable.',
					lexAnswer:
						'a) auge = esplendor / apogeo | honrado = íntegro / honesto.\nb) inequitativo, desempleo, intransparente (u opaco), inestable.',
					grammarPrompt:
						'4. Transforma según la indicación :\na) Pasa a voz pasiva perifrástica : «Los artesanos restauraron la celosía geométrica de Tremecén.»\nb) Pasa al estilo indirecto en pasado : El cronista escribió : «Ayer visité Medina Azahara y mañana viajaré hacia Bugía.»',
					grammarAnswer:
						'a) La celosía geométrica de Tremecén fue restaurada por los artesanos.\nb) El cronista escribió que el día anterior había visitado Medina Azahara y al día siguiente viajaría hacia Bugía.',
					clozePrompt:
						'5. Completa el texto con : patrimonio - innovación - equidad - manuscritos.\nHonrar los antiguos (1) .......... de Al-Zahrawi e Ibn Jaldún no significa vivir en el pasado, sino valorar nuestro (2) .......... para impulsar hoy proyectos basados en la (3) .......... científica y la (4) .......... económica.',
					clozeAnswer: '1) manuscritos   2) patrimonio   3) innovación   4) equidad',
					quizzes: {
						easy: {
							q: 'Relaciona cada palabra de T3 con su antónimo morfológico:',
							pairs: [
								{ left: 'empleo', right: 'desempleo' },
								{ left: 'estable', right: 'inestable' },
								{ left: 'equitativo', right: 'inequitativo' },
								{ left: 'igualdad', right: 'desigualdad' }
							],
							explanation: 'تستعمل السوابق des- و in- لنفي الأسماء والصفات الاقتصادية.'
						} as MatchingSpec,
						medium: {
							q: 'Asocia cada verbo con su sustantivo derivado en el temario de T3:',
							pairs: [
								{ left: 'emprender', right: 'emprendimiento' },
								{ left: 'cooperar', right: 'cooperación' },
								{ left: 'prosperar', right: 'prosperidad' },
								{ left: 'restaurar', right: 'restauración' }
							],
							explanation: 'تذكّر لواحق الأسماء: -miento, -ción, -idad.'
						} as MatchingSpec,
						hard: {
							q: 'Une cada término patrimonial de origen árabe con su definición exacta en español:',
							pairs: [
								{ left: 'aljibe', right: 'depósito subterráneo de agua limpia' },
								{ left: 'almazara', right: 'molino para extraer aceite de oliva' },
								{ left: 'acequia', right: 'canal pequeño para conducir agua' },
								{ left: 'alminar', right: 'torre de una mezquita' }
							],
							explanation: 'تزخر الإسبانية بالكلمات ذات الأصل العربي في مجالات الماء والعمارة والزراعة.'
						} as MatchingSpec
					}
				},
				{
					classPrompt:
						'1. Clasifica estos elementos en Figuras y centros de Páginas Eternas o Conceptos de economía solidaria : Al-Zahrawi - ahorro compartido - Tremecén - formación profesional - Ibn Battuta - precio justo.',
					classCols: [
						{ header: 'Páginas Eternas', items: ['Al-Zahrawi', 'Tremecén', 'Ibn Battuta'], mark: '0.5' },
						{ header: 'Economía solidaria', items: ['ahorro compartido', 'formación profesional', 'precio justo'], mark: '0.5' }
					],
					wordRows: [
						{
							verbo: { given: true, value: 'innovar' },
							sustantivo: { value: 'innovación', mark: '0.25' },
							adjetivo: { value: 'innovador', mark: '0.25' }
						},
						{
							verbo: { value: 'dignificar', mark: '0.25' },
							sustantivo: { given: true, value: 'dignidad' },
							adjetivo: { value: 'digno', mark: '0.25' }
						},
						{
							verbo: { value: 'conservar', mark: '0.25' },
							sustantivo: { value: 'conservación', mark: '0.25' },
							adjetivo: { given: true, value: 'conservador / conservado' }
						}
					],
					lexPrompt:
						'3. Léxico en contexto :\na) Da un sinónimo de : prejuicio (sust.) - preservar (verbo).\nb) Forma el antónimo con prefijo de : productivo - material - capaz - útil.',
					lexAnswer:
						'a) prejuicio = tópico / idea preconcebida | preservar = proteger / custodiar.\nb) improductivo, inmaterial, incapaz, inútil.',
					grammarPrompt:
						'4. Completa con la estructura adecuada :\na) Si los historiadores del futuro (estudiar) nuestras cooperativas actuales, elogiarían su solidaridad.\nb) Pasa a pasiva refleja : «En las escuelas de Córdoba se traducían cientos de libros.» (Ya está en refleja; pasa a pasiva perifrástica : Cientos de libros...)',
					grammarAnswer:
						'a) estudiaran / estudiasen (2.º tipo).\nb) Cientos de libros eran traducidos en las escuelas de Córdoba.',
					clozePrompt:
						'5. Completa el texto con : cirugía - oficios - rigor - viajero.\nTanto un antiguo (1) .......... como Ibn Battuta como un pionero de la (2) .......... como Al-Zahrawi compartían el mismo (3) .......... en su labor, un ejemplo válido hoy para los nuevos (4) .......... técnicos.',
					clozeAnswer: '1) viajero   2) cirugía   3) rigor   4) oficios',
					quizzes: {
						easy: {
							q: 'Relaciona cada adjetivo con su antónimo por prefijación:',
							pairs: [
								{ left: 'productivo', right: 'improductivo' },
								{ left: 'capaz', right: 'incapaz' },
								{ left: 'material', right: 'inmaterial' },
								{ left: 'útil', right: 'inútil' }
							],
							explanation: 'تتحول in- إلى im- قبل الحرف p (improductivo) وتبقى in- قبل c و m و u.'
						} as MatchingSpec,
						medium: {
							q: 'Asocia cada figura histórica de Páginas Eternas con su ciudad o ámbito característico:',
							pairs: [
								{ left: 'Al-Zahrawi', right: 'Cirugía en Córdoba (Kitab al-Tasrif)' },
								{ left: 'Ibn Jaldún', right: 'La Muqaddimah en Qal’a de Beni Salama' },
								{ left: 'Ibn Battuta', right: 'Crónica de viajes (Al-Rihlah)' },
								{ left: 'Gran Mezquita', right: 'Arquitectura histórica en Tremecén' }
							],
							explanation: 'معرفة أعلام ومعالم محور «صفحات خالدة» تدعم فهم النصوص والتعبير الكتابي.'
						} as MatchingSpec,
						hard: {
							q: 'Relaciona cada expresión sintáctica con su descripción gramatical exacta:',
							pairs: [
								{ left: 'Si hubiera previsto...', right: 'Pluscuamperfecto de subjuntivo' },
								{ left: '...habría evitado el fallo.', right: 'Condicional compuesto' },
								{ left: 'Se traducían libros.', right: 'Voz pasiva refleja en imperfecto' },
								{ left: 'Fueron restaurados.', right: 'Voz pasiva perifrástica en indefinido' }
							],
							explanation: 'التمييز الدقيق بين الأزمنة والصيغ النحوية يضمن الإجابة المتقنة في البكالوريا.'
						} as MatchingSpec
					}
				},
				{
					classPrompt:
						'1. Clasifica los siguientes vocablos según su categoría o eje : artesanía - arquitectura - presupuesto - astronomía - cooperativa - geometría.',
					classCols: [
						{ header: 'Ámbito laboral', items: ['artesanía', 'presupuesto', 'cooperativa'], mark: '0.5' },
						{ header: 'Ciencia y arte histórico', items: ['arquitectura', 'astronomía', 'geometría'], mark: '0.5' }
					],
					wordRows: [
						{
							verbo: { given: true, value: 'producir' },
							sustantivo: { value: 'producción / productividad', mark: '0.25' },
							adjetivo: { value: 'productivo', mark: '0.25' }
						},
						{
							verbo: { value: 'transmitir', mark: '0.25' },
							sustantivo: { given: true, value: 'transmisión' },
							adjetivo: { value: 'transmisible', mark: '0.25' }
						},
						{
							verbo: { value: 'solidarizar', mark: '0.25' },
							sustantivo: { value: 'solidaridad', mark: '0.25' },
							adjetivo: { given: true, value: 'solidario' }
						}
					],
					lexPrompt:
						'3. Léxico en contexto :\na) Da un sinónimo de : decadencia (sust.) - edificar (verbo).\nb) Forma el antónimo con prefijo de : perecedero - formal - conocido - legible.',
					lexAnswer:
						'a) decadencia = declive / caída | edificar = construir / erigir.\nb) imperecedero, informal, desconocido, ilegible.',
					grammarPrompt:
						'4. Completa y transforma :\na) Si los jóvenes de ayer (contar) con bibliotecas digitales, habrían investigado aún más rápido.\nb) Une con «a pesar de» : «Había obstáculos financieros. Crearon la cooperativa agrícola.»',
					grammarAnswer:
						'a) hubieran contado / hubiesen contado (3.º tipo).\nb) A pesar de los obstáculos financieros, crearon la cooperativa agrícola.',
					clozePrompt:
						'5. Completa con : transmisión - herramientas - talento - mérito.\nLa (1) .......... de los saberes científicos exige trabajo colectivo. En cualquier época, el (2) .......... individual necesita (3) .......... adecuadas y constancia para alcanzar un (4) .......... duradero.',
					clozeAnswer: '1) transmisión   2) talento   3) herramientas   4) mérito',
					quizzes: {
						easy: {
							q: 'Relaciona cada palabra con su antónimo formado con prefijo:',
							pairs: [
								{ left: 'perecedero', right: 'imperecedero' },
								{ left: 'legible', right: 'ilegible' },
								{ left: 'conocido', right: 'desconocido' },
								{ left: 'formal', right: 'informal' }
							],
							explanation: 'تطبيق قواعد السوابق im-, i-, des-, in-.'
						} as MatchingSpec,
						medium: {
							q: 'Asocia cada verbo con su sustantivo derivado correcto:',
							pairs: [
								{ left: 'producir', right: 'producción' },
								{ left: 'transmitir', right: 'transmisión' },
								{ left: 'edificar', right: 'edificación' },
								{ left: 'conservar', right: 'conservación' }
							],
							explanation: 'انتبه لتغير الجذر الصرفي في transmitir إلى transmisión و producir إلى producción.'
						} as MatchingSpec,
						hard: {
							q: 'Empareja cada término elevado de BAC LE con su sinónimo contextual:',
							pairs: [
								{ left: 'decadencia', right: 'declive' },
								{ left: 'auge', right: 'esplendor' },
								{ left: 'edificar', right: 'construir' },
								{ left: 'custodiar', right: 'preservar' }
							],
							explanation: 'التمييز الدلالي الدقيق بين كلمات التراث والحضارة يرفع مستوى الإنشاء.'
						} as MatchingSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildMatchingPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Competencia lingüística — A) Léxico, derivación y síntesis gramatical',
				points: 7,
				instruction: 'Realiza los siguientes ejercicios de léxico, morfología y gramática (7 puntos — BAC 3AS LE) :',
				content: [
					{
						type: 'text',
						content: chosen.classPrompt
					},
					buildSpanishClassificationTableBlock({ columns: chosen.classCols }),
					{
						type: 'text',
						content: '2. Completa la tabla de derivación léxica (Verbo / Sustantivo / Adjetivo) :'
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
				trimesterId: 't3',
				difficulty,
				domain: 'lexico_morfologia',
				examRole: 'linguistic_competence',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكر تحويلات in- إلى im- (أمام p/b: imperecedero) وإلى i- (أمام l: ilegible).',
					'في جدول الاشتقاق، انتبه للأسماء المنتهية بـ -sión مثل transmisión أو -ción مثل producción.',
					'حافظ على مطابقة الزمن والمفعول في المبني للمجهول وفي الكلام غير المباشر.'
				],
				solutionStepsAr: [
					'التصنيف المعجمي في العمودين (1 نقطة).',
					'إكمال جدول الاشتقاق الثلاثي بدقة (1.5 نقطة).',
					'استخراج المرادفات وتكوين الأضداد بالسوابق (1.5 نقطة).',
					'تطبيق القواعد النحوية المركبة وتعبئة الفراغات (3 نقاط).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. WRITTEN EXPRESSION (6 pts — Integration): Emprendimiento y solidaridad
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_tpl_3as_le_t3_writ_emprendimiento_solidaridad',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'expresion_escrita',
		titleAr: 'التعبير الكتابي (6 نقاط — لغات أجنبية): عالم الشغل، ريادة الأعمال والتضامن الاقتصادي',
		curriculumLessonId: 'spa_lesson_3as_le_t3_metodologia_expresion_escrita',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					temaUnoPrompt:
						'Redacta un artículo de opinión (140 a 180 palabras) explicando por qué el emprendimiento juvenil y las cooperativas solidarias son una respuesta eficaz frente al desempleo.',
					temaUnoNotas: [
						'Mostrar la ventaja de tomar la iniciativa en lugar de esperar pasivamente.',
						'Explicar cómo la unión de competencias reduce riesgos y gastos iniciales.',
						'Destacar la importancia de la formación continua y la honradez comercial.'
					],
					temaDosPrompt:
						'«Todo oficio honrado, sea manual o universitario, merece el mismo respeto social.» Comenta esta afirmación en un texto argumentativo (140 a 180 palabras).',
					modelAnswer:
						'Frente al reto actual del desempleo juvenil, muchos jóvenes comprenden hoy que esperar pasivamente una vacante administrativa limita su futuro. Por ello, impulsar el emprendimiento y las cooperativas solidarias ofrece una salida constructiva y digna.\nEn primer lugar, emprender en equipo permite unir talentos complementarios : un técnico agrícola y un informático, por ejemplo, pueden diseñar juntos soluciones prácticas de riego o venta directa sin intermediarios abusivos. Además, la fórmula cooperativa reduce los costes iniciales y reparte las responsabilidades de forma equitativa.\nAunque iniciar un proyecto propio requiere paciencia frente a los trámites y una gestión prudente del presupuesto, la formación continua ayuda a superar los primeros tropiezos.\nEn definitiva, cuando los jóvenes unen innovación, espíritu solidario y trabajo honrado, no solo conquistan su autonomía económica, sino que impulsan el desarrollo real de su región.',
					rubricSummary:
						'Pertinencia y argumentos económicos claros (1.5) + Estructura de 4 párrafos con conectores (1.5) + Corrección gramatical (1.5) + Léxico laboral y ortografía (1.5).',
					quizzes: {
						easy: {
							q: 'Clasifica estas actitudes laborales en Cultura emprendedora o Pasividad laboral:',
							categories: ['Cultura emprendedora', 'Pasividad laboral'],
							items: [
								{ text: 'Crear una cooperativa local', category: 0 },
								{ text: 'Adquirir formación continua', category: 0 },
								{ text: 'Esperar sin buscar competencias', category: 1 },
								{ text: 'Despreciar los oficios prácticos', category: 1 }
							],
							explanation: 'تمييز السلوك المبادر عن الاتكالية السلبية هو لب محور العمل في البكالوريا.'
						} as DragDropSpec,
						medium: {
							q: 'Clasifica estos conceptos según pertenezcan a Ventajas de las cooperativas o a Exigencias del éxito:',
							categories: ['Ventajas cooperativas', 'Exigencias del éxito'],
							items: [
								{ text: 'Reducir costes iniciales juntos', category: 0 },
								{ text: 'Sumar talentos complementarios', category: 0 },
								{ text: 'Gestionar el presupuesto con rigor', category: 1 },
								{ text: 'Mantener transparencia comercial', category: 1 }
							],
							explanation: 'الإنتاج الحجاجي القوي يوازن بين ثمار المشروع وشروط نجاحه.'
						} as DragDropSpec,
						hard: {
							q: 'Clasifica estas frases según su función en la redacción BAC (Concesión vs. Conclusión):',
							categories: ['Fórmula concesiva (matiz)', 'Fórmula conclusiva (síntesis)'],
							items: [
								{ text: 'Aunque iniciar un proyecto exige paciencia', category: 0 },
								{ text: 'Si bien los trámites iniciales cuestan esfuerzo', category: 0 },
								{ text: 'En definitiva, unir innovación y ética', category: 1 },
								{ text: 'Por todo ello, el trabajo honrado dignifica', category: 1 }
							],
							explanation: 'الجمع بين جملة اعتراضية متزنة وخاتمة جامعة يرفع جودة النص الحجاجي.'
						} as DragDropSpec
					}
				},
				{
					temaUnoPrompt:
						'Escribe una carta formal al director de un centro de formación profesional solicitando organizar una feria escolar de orientación sobre nuevos oficios ecológicos y digitales (140 a 180 palabras).',
					temaUnoNotas: [
						'Respetar la estructura formal de la carta (lugar, fecha, saludo formal, trato de usted y despedida).',
						'Explicar la necesidad de informar a los estudiantes de secundaria sobre salidas técnicas modernas.',
						'Proponer charlas breves de jóvenes artesanos, técnicos solares y emprendedores locales.'
					],
					temaDosPrompt:
						'¿Por qué el dominio de las lenguas extranjeras multiplica las oportunidades laborales de los jóvenes técnicos y universitarios? Desarrolla tu respuesta en 140 a 180 palabras.',
					modelAnswer:
						'Setif, 9 de abril de 2026.\nEstimado Señor Director :\nMe dirijo respetuosamente a usted en representación de los alumnos de 3AS LE para proponerle la organización conjunta de una jornada de orientación sobre los nuevos oficios técnicos, ecológicos y digitales.\nMuchos estudiantes desconocen aún las salidas profesionales de sectores en pleno crecimiento, como el mantenimiento de placas solares, el riego inteligente o la gestión comercial en línea. Por ello, contar con testimonios de antiguos alumnos y jóvenes emprendedores de su centro permitiría disipar prejuicios sociales y mostrar la dignidad de la formación práctica.\nEsta actividad podría desarrollarse en el salón de actos de nuestro instituto durante una mañana del mes próximo.\nAgradeciendo de antemano su valiosa colaboración con nuestra orientación académica, le saluda atentamente un representante estudiantil.',
					rubricSummary:
						'Formato completo de carta formal (1.5) + Pertinencia de argumentos (1.5) + Uso correcto de usted y conectores (1.5) + Riqueza léxica y tildes (1.5).',
					quizzes: {
						easy: {
							q: 'Clasifica estos sectores según correspondan a Oficios ecológicos y digitales o a Prejuicios erróneos:',
							categories: ['Oficios modernos demandados', 'Prejuicios a superar'],
							items: [
								{ text: 'Instalación de energía solar', category: 0 },
								{ text: 'Gestión digital de proyectos', category: 0 },
								{ text: 'Infravalorar la formación técnica', category: 1 },
								{ text: 'Creer que solo vale la oficina', category: 1 }
							],
							explanation: 'الوعي بالمهن الحديثة يتطلب نبذ الأحكام المسبقة عن التكوين المهني.'
						} as DragDropSpec,
						medium: {
							q: 'Clasifica las partes siguientes según correspondan al Encabezamiento o al Cuerpo de la carta:',
							categories: ['Encabezamiento formal', 'Cuerpo argumentativo'],
							items: [
								{ text: 'Setif, 9 de abril de 2026', category: 0 },
								{ text: 'Estimado Señor Director', category: 0 },
								{ text: 'Proponer una jornada de orientación', category: 1 },
								{ text: 'Explicar las salidas técnicas reales', category: 1 }
							],
							explanation: 'التفريق بين الترويسة الشكلية ومضمون الرسالة ضروري لضبط القالب.'
						} as DragDropSpec,
						hard: {
							q: 'Clasifica estas expresiones según correspondan al Condicional de cortesía o al Subjuntivo de finalidad:',
							categories: ['Condicional de cortesía', 'Subjuntivo de finalidad'],
							items: [
								{ text: 'Esta actividad podría desarrollarse', category: 0 },
								{ text: 'Nos gustaría contar con su apoyo', category: 0 },
								{ text: 'Para que conozcan los oficios', category: 1 },
								{ text: 'A fin de que superen prejuicios', category: 1 }
							],
							explanation: 'استعمال الشرطي للتأدب (podría, gustaría) و Subjuntivo للغرض يزيد أناقة الرسالة الرسمية.'
						} as DragDropSpec
					}
				},
				{
					temaUnoPrompt:
						'Redacta un texto argumentativo (140 a 180 palabras) sobre la importancia de la ética profesional, la puntualidad y el trabajo bien hecho en cualquier empleo o empresa.',
					temaUnoNotas: [
						'Definir en qué consiste la ética laboral (honradez, cumplimiento de plazos y calidad).',
						'Mostrar sus efectos positivos sobre la confianza de clientes y compañeros.',
						'Concluir destacando que la rectitud moral es la mejor garantía de prestigio duradero.'
					],
					temaDosPrompt:
						'«La solidaridad en el trabajo no debilita la productividad, sino que la hace humana y sostenible.» Argumenta tu punto de vista en 140 a 180 palabras.',
					modelAnswer:
						'En el mundo laboral actual, la competencia técnica y los títulos académicos resultan necesarios, pero nunca bastan si faltan la honradez y el respeto por el trabajo bien hecho. ¿Por qué sigue siendo la ética profesional la piedra angular de todo éxito duradero?\nEn primer lugar, cumplir los plazos acordados, cuidar la calidad de cada servicio y actuar con transparencia generan la confianza de clientes y compañeros. Una empresa o un artesano que engaña para ganar más dinero a corto plazo pierde pronto su reputación.\nCiertamente, mantener el esmero diario exige constancia y esfuerzo incluso cuando nadie vigila; no obstante, esa integridad fortalece el clima de cooperación dentro del equipo y dignifica la tarea cotidiana.\nEn conclusión, la verdadera prosperidad laboral nace de unir capacidad profesional con rectitud moral, transformando cada oficio en un servicio honesto hacia la comunidad.',
					rubricSummary:
						'Claridad de la tesis ética (1.5) + Argumentación coherente con ejemplo y matiz (1.5) + Corrección gramatical (1.5) + Vocabulario y puntuación (1.5).',
					quizzes: {
						easy: {
							q: 'Clasifica estas conductas según expresen Ética profesional o Falta de ética:',
							categories: ['Ética profesional', 'Conducta perjudicial'],
							items: [
								{ text: 'Cumplir los plazos acordados', category: 0 },
								{ text: 'Cuidar la calidad del servicio', category: 0 },
								{ text: 'Engañar para ganar rápido', category: 1 },
								{ text: 'Descuidar la puntualidad diaria', category: 1 }
							],
							explanation: 'الأمانة والإتقان والانضباط هي أسس الثقة المهنية.'
						} as DragDropSpec,
						medium: {
							q: 'Clasifica estos argumentos según sean de Causa o de Consecuencia laboral:',
							categories: ['Causa ética en el trabajo', 'Consecuencia positiva'],
							items: [
								{ text: 'Actuar con transparencia diaria', category: 0 },
								{ text: 'Respetar los compromisos asumidos', category: 0 },
								{ text: 'Ganar prestigio duradero', category: 1 },
								{ text: 'Fortalecer la confianza mutua', category: 1 }
							],
							explanation: 'الربط بين السبب الأخلاقي والأثر الاقتصادي ينتج مقالاً إقناعياً متيناً.'
						} as DragDropSpec,
						hard: {
							q: 'Clasifica estos conectores según su papel en el párrafo de desarrollo:',
							categories: ['Introduce el argumento inicial', 'Introduce matiz y refutación'],
							items: [
								{ text: 'En primer lugar', category: 0 },
								{ text: 'Asimismo', category: 0 },
								{ text: 'Ciertamente... no obstante', category: 1 },
								{ text: 'Aunque exige constancia', category: 1 }
							],
							explanation: 'التنوع في الروابط يرتقي بالمقال إلى مستوى بكالوريا اللغات الأجنبية.'
						} as DragDropSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildDragDropPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'III. Expresión escrita',
				points: 6,
				instruction: 'Elige UNO de los dos temas propuestos y redáctalo respetando la estructura argumentativa BAC (6 puntos — BAC 3AS LE) :',
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
				trimesterId: 't3',
				difficulty,
				domain: 'expresion_escrita',
				examRole: 'written_expression',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تجنب العبارات العامة الغامضة؛ قدم أمثلة مهنية ملموسة (التعاونيات، الري الذكي، التكوين المهني).',
					'في الرسالة الرسمية استعمل ضمير الاحترام «usted» وفعلاً شرطياً للتأدب (podría, le agradecería).',
					'راقب علامات التشديد: economía, ética, agrícola, profesión, cooperación, crédito.'
				],
				solutionStepsAr: [
					'احترام نوع النص والموضوع المختار (1.5 نقطة).',
					'التصميم المنطقي والربط السليم بين الفقرات (1.5 نقطة).',
					'الدقة النحوية والصرفية (1.5 نقطة).',
					'ثراء المفردات وسلامة الترقيم والإملاء (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 6. WRITTEN EXPRESSION (6 pts — Integration): Páginas Eternas y Carta BAC (with SVG blueprint)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_tpl_3as_le_t3_writ_paginas_eternas_carta',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'expresion_escrita',
		titleAr: 'التعبير الكتابي (6 نقاط — لغات أجنبية): صفحات خالدة — الإرث العلمي الأندلسي والمغاربي',
		curriculumLessonId: 'spa_lesson_3as_le_t3_paginas_eternas_legado_andalusi',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					bpTitle: 'Plan BAC : Artículo sobre Páginas Eternas',
					bpSteps: [
						{ stage: 'Introducción', detail: 'Presentar el puente histórico Al-Ándalus y Magreb' },
						{ stage: 'Ciencia y arte', detail: 'Citar a Al-Zahrawi, Ibn Jaldún, Córdoba y Tremecén' },
						{ stage: 'Sentido actual', detail: 'Inspirar rigor y estudio sin nostalgia pasiva' },
						{ stage: 'Conclusión', detail: 'Honrar el legado construyendo el saber de hoy' }
					],
					temaUnoPrompt:
						'Redacta un artículo cultural (140 a 180 palabras) para el periódico de tu instituto destacando el valor científico y humano del legado andalusí y magrebí (Córdoba, la Alhambra, Tremecén, Al-Zahrawi, Ibn Jaldún e Ibn Battuta).',
					temaUnoNotas: [
						'Mencionar al menos dos ciudades emblemáticas (Córdoba, Granada o Tremecén) y dos figuras científicas (Al-Zahrawi, Ibn Jaldún o Ibn Battuta).',
						'Explicar qué valores científicos unían aquella época (observación, arquitectura hidráulica, bibliotecas).',
						'Concluir animando a los estudiantes actuales a imitar ese rigor intelectual.'
					],
					temaDosPrompt:
						'«Conocer el esplendor científico del pasado no sirve para presumir sin esfuerzo, sino para impulsar la investigación de hoy.» ¿Compartes esta reflexión? Argumenta en 140 a 180 palabras.',
					modelAnswer:
						'Hablar de Páginas Eternas es recordar una época luminosa en la que la ciencia, la arquitectura y el respeto por los libros unían las dos orillas del Mediterráneo. Desde la Córdoba de las grandes bibliotecas hasta la Alhambra de Granada y la Gran Mezquita de Tremecén, el patrimonio andalusí y magrebí sigue asombrando por su perfección.\nEn aquel ambiente florecieron sabios ejemplares. En medicina, Al-Zahrawi compiló su Kitab al-Tasrif ilustrando más de doscientos instrumentos quirúrgicos. Siglos más tarde, Ibn Battuta recorrió el Magreb y Oriente narrando el vigor de las escuelas, mientras Ibn Jaldún enseñaba en Bugía y redactaba en Tiaret su método histórico crítico en La Muqaddimah.\nAunque admirar este pasado llena de orgullo legítimo, la verdadera fidelidad exige evitar la nostalgia pasiva y recuperar su espíritu de observación, paciencia y disciplina.\nEn definitiva, honrar a los grandes maestros de Córdoba y del Magreb significa hoy estudiar con exigencia para aportar nuevas páginas de saber a nuestro tiempo.',
					rubricSummary:
						'Referencias culturales exactas (1.5) + Progresión argumentativa con matiz (1.5) + Gramática y concordancias (1.5) + Riqueza léxica y tildes (1.5).',
					quizzes: {
						easy: {
							q: 'Ordena las etapas del plan para redactar un ensayo sobre Páginas Eternas:',
							orderedItems: [
								'Presentar el diálogo científico entre Al-Ándalus y el Magreb',
								'Citar logros de Al-Zahrawi, Ibn Jaldún e Ibn Battuta',
								'Aclarar que el orgullo histórico exige esfuerzo actual',
								'Concluir llamando al rigor y al estudio presente'
							],
							explanation: 'التدرج السليم للمقال الثقافي: التعريف بالمحور، الاستشهاد بالأعلام، التوازن الفكري، ثم الخاتمة المحفزة.'
						} as OrderingSpec,
						medium: {
							q: 'Ordena cronológicamente los hitos históricos para contextualizar un texto cultural:',
							orderedItems: [
								'Siglo X : esplendor de Córdoba y cirugía de Al-Zahrawi',
								'Siglo XIV : viajes de Ibn Battuta por Tremecén y Al-Ándalus',
								'1375–1379 : redacción de La Muqaddimah de Ibn Jaldún en Tiaret',
								'Siglo XXI : deber juvenil de investigar y cuidar el patrimonio'
							],
							explanation: 'ضبط التسلسل الزمني (القرن 10 ثم القرن 14 ثم الحاضر) يمنع الخلط التاريخي في المقال.'
						} as OrderingSpec,
						hard: {
							q: 'Ordena las frases del cierre argumentativo combinando concesión y síntesis:',
							orderedItems: [
								'Ciertamente, contemplar la Alhambra y Tremecén despierta orgullo.',
								'Sin embargo, la memoria histórica no debe volverse pasiva.',
								'Solo si estudiamos con rigor prolongaremos esa herencia.',
								'De ese modo, el ayer iluminará los logros científicos de mañana.'
							],
							explanation: 'خاتمة نموذجية بالاعتراض والشرط والاستنتاج.'
						} as OrderingSpec
					}
				},
				{
					bpTitle: 'Plan BAC : Carta Cultural sobre Patrimonio',
					bpSteps: [
						{ stage: 'Encabezamiento', detail: 'Ciudad, fecha y saludo formal a la dirección' },
						{ stage: 'Motivo claro', detail: 'Proponer exposición o viaje escolar patrimonial' },
						{ stage: 'Argumentos', detail: 'Vincular arquitectura (Tremecén) con ciencia e idiomas' },
						{ stage: 'Despedida', detail: 'Agradecimiento cortés en usted y firma' }
					],
					temaUnoPrompt:
						'Escribe una carta formal al director de tu instituto proponiendo una exposición escolar sobre la arquitectura hidráulica y las figuras científicas de Al-Ándalus y Argelia (140 a 180 palabras).',
					temaUnoNotas: [
						'Incluir ciudad, fecha, saludo formal y empleo constante de «usted».',
						'Proponer paneles dedicados a Córdoba, la Alhambra, Tremecén, Al-Zahrawi e Ibn Jaldún.',
						'Explicar cómo esta exposición une historia, geometría, español y protección del agua.'
					],
					temaDosPrompt:
						'¿Qué enseñanzas sobre el respeto al agua y la armonía arquitectónica nos dejan monumentos como la Alhambra de Granada y Tremecén? Desarrolla tu reflexión en 140 a 180 palabras.',
					modelAnswer:
						'Argel, 22 de abril de 2026.\nEstimado Señor Director :\nPor medio de la presente, los alumnos de tercer año de Lenguas Extranjeras le solicitamos autorización para organizar en el vestíbulo del instituto una exposición titulada «Páginas Eternas : ciencia y arte entre Al-Ándalus y Argelia».\nA través de maquetas y carteles bilingües en español y árabe, nos gustaría mostrar cómo la Mezquita de Córdoba, la Alhambra de Granada y la Gran Mezquita de Tremecén unieron geometría, belleza e ingeniería hidráulica respetuosa con el agua. Asimismo, dedicaríamos un espacio especial a Al-Zahrawi, Ibn Battuta e Ibn Jaldún para recordar el método crítico y la curiosidad científica de nuestra historia.\nEsta iniciativa reforzaría nuestro dominio del español al explicar conceptos técnicos e históricos a los cursos inferiores.\nAgradeciendo de antemano su acogida favorable, le saluda respetuosamente el grupo de 3AS LE.',
					rubricSummary:
						'Estructura formal de carta (1.5) + Contenido cultural riguroso (1.5) + Uso correcto de usted y subjuntivo (1.5) + Léxico y ortografía (1.5).',
					quizzes: {
						easy: {
							q: 'Ordena las cuatro partes de la carta cultural dirigida al director:',
							orderedItems: [
								'Argel, 22 de abril de 2026. Estimado Señor Director :',
								'Solicitar autorización para una exposición cultural bilingüe',
								'Detallar las maquetas de Córdoba, Granada, Tremecén y sabios',
								'Agradecer la atención y despedirse con «le saluda respetuosamente»'
							],
							explanation: 'هيكلة الرسالة الرسمية تبدأ بالتاريخ والتحية ثم الطلب ثم التفاصيل العلمية ثم الوداع المهذب.'
						} as OrderingSpec,
						medium: {
							q: 'Ordena las ideas para justificar el valor educativo de una exposición patrimonial:',
							orderedItems: [
								'Presentar los monumentos de Córdoba, Granada y Tremecén',
								'Explicar su ingeniería hidráulica y proporción geométrica',
								'Destacar los aportes científicos de Al-Zahrawi e Ibn Jaldún',
								'Mostrar cómo el proyecto mejora también el español del alumnado'
							],
							explanation: 'ترابط واضح بين البعد المعماري والتاريخي والتربوي اللغوي.'
						} as OrderingSpec,
						hard: {
							q: 'Ordena estas oraciones para formar un párrafo culto con subjuntivo y estilo indirecto:',
							orderedItems: [
								'El profesor nos sugirió que preparáramos carteles en ambos idiomas.',
								'De ese modo, los visitantes comprenderán los arabismos técnicos.',
								'Si hubiéramos omitido la explicación científica, habría sido solo turismo.',
								'Así la exposición unirá historia, lengua y rigor matemático.'
							],
							explanation: 'تدرج متقن يدمج صيغة الشك في الماضي والشرط النوع الثالث والخاتمة.'
						} as OrderingSpec
					}
				},
				{
					bpTitle: 'Plan BAC : Arabismos y Diálogo Cultural',
					bpSteps: [
						{ stage: 'Apertura', detail: 'La huella del árabe en el léxico español actual' },
						{ stage: 'Ejemplos reales', detail: 'aljibe, acequia, almohada, ajedrez, tarifa' },
						{ stage: 'Raíz histórica', detail: 'Siglos de convivencia científica y comercial' },
						{ stage: 'Cierre', detail: 'Aprender español descubre puentes comunes' }
					],
					temaUnoPrompt:
						'Redacta un artículo breve (140 a 180 palabras) explicando por qué las palabras españolas de origen árabe (como aljibe, acequia, alcázar, ajedrez o algoritmo) muestran el profundo intercambio científico del pasado.',
					temaUnoNotas: [
						'Citar ejemplos reales de arabismos en español ligados a la ciencia, el agua o la vida diaria.',
						'Explicar cómo los centros de saber de Al-Ándalus y el Magreb transmitieron esos términos.',
						'Animar a los alumnos de español a descubrir con entusiasmo ese vínculo lingüístico.'
					],
					temaDosPrompt:
						'«Las bibliotecas y los traductores fueron el motor silencioso del esplendor científico andalusí y magrebí.» Desarrolla esta idea en 140 a 180 palabras.',
					modelAnswer:
						'Quien estudia lengua española desde Argelia descubre con grata sorpresa cientos de palabras familiares escondidas en el diccionario cotidiano. Términos como acequia, aljibe, alcázar, almohada, ajedrez, azúcar o algoritmo testimonian siglos de fecundo intercambio cultural y científico entre el mundo árabe y la Península Ibérica.\nEstas voces no llegaron por casualidad : entraron en el español gracias a la convivencia en las huertas, los mercados y las grandes bibliotecas de Córdoba, Toledo, Granada y ciudades magrebíes como Tremecén y Bugía. En ellas, traductores y sabios transmitieron tratados de medicina, matemáticas y astronomía que transformaron el pensamiento europeo.\nAunque el paso del tiempo haya modificado ligeramente la pronunciación original, cada arabismo conserva vivo el recuerdo de aquella época de diálogo intelectual.\nPor consiguiente, estudiar español en el Bachillerato no es aprender un idioma lejano, sino recorrer un puente vivo que enlaza nuestra propia historia con la cultura hispánica.',
					rubricSummary:
						'Pertinencia lingüística y ejemplos exactos (1.5) + Cohesión y progresión (1.5) + Gramática y precisión verbal (1.5) + Ortografía y estilo (1.5).',
					quizzes: {
						easy: {
							q: 'Ordena los pasos de la explicación sobre los arabismos del español:',
							orderedItems: [
								'Sorpresa grata al encontrar palabras familiares en español',
								'Ejemplificar con acequia, aljibe, ajedrez y algoritmo',
								'Explicar su transmisión mediante bibliotecas, agricultura y comercio',
								'Concluir viendo el español como puente histórico cercano'
							],
							explanation: 'تدرج منطقي من الملاحظة اللغوية إلى الأمثلة ثم التفسير التاريخي فالخاتمة.'
						} as OrderingSpec,
						medium: {
							q: 'Ordena estas ideas sobre la labor de las bibliotecas y traductores medievales:',
							orderedItems: [
								'Las bibliotecas reunieron manuscritos de medicina y matemáticas.',
								'Los traductores vertieron con rigor esos saberes al latín y romance.',
								'Gracias a esa labor, nuevas palabras técnicas pasaron al español.',
								'Por ello, el diálogo científico dejó una huella lingüística imborrable.'
							],
							explanation: 'سلسلة سببية تاريخية دقيقة حول دور الترجمة والمكتبات.'
						} as OrderingSpec,
						hard: {
							q: 'Ordena las frases del cierre valorativo con concesión y consecuencia:',
							orderedItems: [
								'Aunque los siglos hayan adaptado ligeramente cada sonido,',
								'el origen árabe de voces como aljibe sigue siendo transparente.',
								'Por consiguiente, aprender español revela raíces compartidas,',
								'lo que fortalece el diálogo respetuoso entre culturas mediterráneas.'
							],
							explanation: 'بناء تركيبي متماسك من الاعتراض بـ Aunque إلى النتيجة بـ Por consiguiente.'
						} as OrderingSpec
					}
				}
			];

			const vIdx = rng.int(0, pool.length - 1);
			const chosen = pool[vIdx];
			const svgStr = svgSpanishWritingBlueprint({
				title: chosen.bpTitle,
				steps: chosen.bpSteps
			});
			const svgPath = saveSpanishSvgAsset(`3as_le_t3_writing_v${vIdx + 1}`, svgStr);

			const { quizQuestion, finalAnswer } = buildOrderingPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'III. Expresión escrita',
				points: 6,
				instruction: 'Apóyate en el plan metodológico, elige UNO de los dos temas propuestos y redáctalo (6 puntos — BAC 3AS LE) :',
				content: [
					{
						type: 'image',
						src: svgPath,
						width: 'full',
						caption: 'Guía estructural de redacción BAC 3AS LE (6 puntos).'
					},
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
				trimesterId: 't3',
				difficulty,
				domain: 'expresion_escrita',
				examRole: 'written_expression',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تثبت من كتابة الأعلام والمواقع بالإسبانية بدقة: Córdoba, la Alhambra, Tremecén, Al-Zahrawi, Ibn Jaldún, Ibn Battuta.',
					'احترم تصميم الفقرات الأربع الظاهر في المخطط البصري ولا تخرج عن الموضوع.',
					'تجنب الحشو ووظّف جملاً مترابطة (En primer lugar, Aunque, Por consiguiente, En definitiva).'
				],
				solutionStepsAr: [
					'الاستيعاب الكامل للموضوع وتوظيف الشواهد الثقافية (1.5 نقطة).',
					'احترام البنية المنهجية للمقال أو الرسالة الرسمية (1.5 نقطة).',
					'سلامة النحو وتوظيف الشرط والشك بدقة (1.5 نقطة).',
					'غنى المفردات وسلامة التشديد والترقيم (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	}
];
