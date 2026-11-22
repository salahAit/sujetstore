import type { ExerciseBlock } from '../../modules/SujetBuilder/types';
import {
	buildSpanishClassificationTableBlock,
	buildSpanishPassageBlock,
	buildSpanishWordFamilyTableBlock,
	buildSpanishWrittenProductionBlock
} from '../../modules/SpanishTemplates/spanish-helpers';
import { saveSpanishSvgAsset, svgSpanishGrammarMap } from '../../modules/SpanishTemplates/svg-spanish';
import { buildIllustratedFigureBlock } from '../../modules/VisualAssets/illustrations-registry';
import { buildOfficialSpanishBacPaper, type OfficialSpanishBacPaperSpec } from './types';

// ============================================================================
// 1. BAC 2023 — Tema 1 (bac-2023-3as-le-spanish-t1)
// Ámbito Educativo y Juvenil: aprendizaje de idiomas, lectura y juventud
// ============================================================================

function buildBac2023SpanishT1(): OfficialSpanishBacPaperSpec {
	const comp: ExerciseBlock = {
		id: 'es_2023_t1_comp',
		customTitle: 'I. Comprensión del texto',
		points: 7,
		instruction: 'Lee atentamente el siguiente texto y responde con precisión a las cuestiones.',
		content: [
			buildSpanishPassageBlock({
				title: 'Aprender lenguas y cultivar la lectura: llaves del porvenir juvenil',
				paragraphs: [
					'En las aulas de secundaria y en las bibliotecas escolares, muchos jóvenes descubren que el estudio riguroso de las lenguas extranjeras abre puertas insospechadas hacia la ciencia, la traducción y el diálogo respetuoso entre pueblos. Sin embargo, los docentes coinciden en señalar que [[esta preparación]] lingüística alcanza su verdadero vigor cuando se apoya en una base firme: el hábito constante de la lectura reflexiva y el dominio cuidado de la lengua materna.',
					'Leer obras formativas, ensayos históricos o artículos divulgativos en formato impreso exige paciencia, concentración y espíritu analítico. A diferencia de la lectura apresurada de mensajes breves en pantalla, el libro invita al estudiante a detenerse ante cada argumento, ampliar su vocabulario con exactitud y contrastar ideas con serenidad intelectual.',
					'Por otro lado, el aprendizaje del español en Argelia ofrece a los alumnos de Lenguas Extranjeras un puente privilegiado con el Mediterráneo y el mundo hispano. [[Quienes]] perseveran en la práctica diaria de la escritura, la consulta de diccionarios y la redacción ordenada logran expresar sus convicciones con claridad, cortesía y madurez académica.',
					'Así pues, formar a una juventud responsable no consiste únicamente en acumular títulos, sino en sembrar curiosidad sana, constancia en el esfuerzo y respeto hacia los maestros. Cuando la escuela y la familia alientan la lectura diaria, el idioma deja de ser una simple asignatura para convertirse en un instrumento duradero de progreso personal y servicio a la comunidad.'
				],
				source: 'Cuadernos de Pedagogía y Lenguas del Mediterráneo, Edición SujetStore',
				numberedParagraphs: true,
				glossary: [
					{
						term: 'vigor',
						meaning: 'fuerza, solidez o energía intelectual que hace eficaz una actividad'
					},
					{
						term: 'serenidad intelectual',
						meaning: 'actitud tranquila, objetiva y reflexiva al analizar ideas o textos'
					},
					{
						term: 'constancia',
						meaning: 'perseverancia y dedicación continua en el estudio o el trabajo'
					}
				]
			}),
			buildIllustratedFigureBlock('spa_03_educacion_idiomas_biblioteca', {
				lang: 'es',
				mode: 'labeled',
				pins: [],
				width: '62%',
				maxHeight: 128,
				caption: 'Documento visual: La lectura en biblioteca y el aprendizaje de lenguas extranjeras.'
			}),
			{
				type: 'text',
				content: '#strong[1.] Elige la respuesta correcta marcando la casilla correspondiente.'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: 'Según el texto, el aprendizaje eficaz de lenguas extranjeras requiere principalmente:',
						options: [
							'sustituir por completo los libros impresos por mensajes breves en pantalla',
							'combinar el hábito de la lectura reflexiva, el dominio de la lengua materna y la perseverancia',
							'limitar el estudio únicamente a la memorización rápida de exámenes'
						],
						correct:
							'combinar el hábito de la lectura reflexiva, el dominio de la lengua materna y la perseverancia',
						mark: '1'
					}
				]
			},
			{
				type: 'text',
				content:
					'#strong[2.] Di si las siguientes afirmaciones son Verdaderas o Falsas y justifica cada respuesta con elementos del texto.'
			},
			{
				type: 'true_false',
				items: [
					{
						q: 'a) Para dominar bien una lengua extranjera conviene descuidar la lengua materna.',
						a: 'Falso',
						c: 'El texto indica que la preparación lingüística alcanza su vigor cuando se apoya en la lectura reflexiva y el dominio cuidado de la lengua materna (§1).',
						mark: '0.5'
					},
					{
						q: 'b) La lectura pausada de un libro impreso favorece la concentración y el espíritu analítico.',
						a: 'Verdadero',
						c: 'Leer obras en formato impreso exige paciencia, concentración y espíritu analítico, e invita a ampliar el vocabulario con exactitud (§2).',
						mark: '0.5'
					},
					{
						q: 'c) La consulta de diccionarios y la práctica diaria de la escritura ayudan a redactar con madurez.',
						a: 'Verdadero',
						c: 'Quienes perseveran en la práctica diaria, la consulta de diccionarios y la redacción ordenada logran expresarse con claridad y madurez académica (§3).',
						mark: '0.5'
					},
					{
						q: 'd) La formación integral del joven se reduce exclusivamente a obtener un título escolar.',
						a: 'Falso',
						c: 'Formar a una juventud responsable no consiste únicamente en acumular títulos, sino en sembrar curiosidad sana, constancia y respeto hacia los maestros (§4).',
						mark: '0.5'
					}
				]
			},
			{
				type: 'text',
				content: '#strong[3.] Contesta de forma redactada a las siguientes preguntas de comprensión.'
			},
			{
				type: 'text',
				content:
					'a) ¿Qué diferencias establece el segundo párrafo entre la lectura de libros impresos y la lectura apresurada en pantalla?',
				answer:
					'a) Mientras que la lectura en pantalla suele ser breve y apresurada, el libro impreso exige paciencia y concentración, permite analizar cada argumento, enriquecer el vocabulario y contrastar ideas con serenidad.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'b) ¿Por qué se afirma en el párrafo 4 que la lectura y los idiomas sirven a la comunidad?',
				answer:
					'b) Porque cuando la escuela y la familia fomentan estos hábitos, el idioma se transforma en una herramienta duradera de progreso personal, responsabilidad ética y servicio útil a la sociedad.',
				mark: '1'
			},
			{
				type: 'text',
				content: '#strong[4.] ¿A quién o a qué se refieren las palabras subrayadas en el texto?'
			},
			{
				type: 'text',
				content: 'a) «esta preparación» (§1) se refiere a : ............................',
				answer: 'a) Se refiere al estudio riguroso de las lenguas extranjeras.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) «Quienes» (§3) se refiere a : ............................',
				answer: 'b) Se refiere a los alumnos de Lenguas Extranjeras que estudian español en Argelia.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[5.] Completa el siguiente cuadro de síntesis con información del texto.'
			},
			{
				type: 'table',
				headers: ['Pilar formativo', 'Beneficio señalado en el texto'],
				cells: [],
				rows: [
					[
						{ content: 'Lectura reflexiva en biblioteca', bold: true },
						{
							content: '....................',
							answer: 'Desarrolla la concentración, el espíritu analítico y enriquece el vocabulario con exactitud.',
							mark: '0.5'
						}
					],
					[
						{ content: 'Estudio perseverante del español', bold: true },
						{
							content: '....................',
							answer: 'Tiende un puente con el Mediterráneo y permite expresarse con claridad y madurez académica.',
							mark: '0.5'
						}
					]
				],
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			}
		]
	};

	const ling: ExerciseBlock = {
		id: 'es_2023_t1_ling',
		customTitle: 'II. Competencia lingüística',
		points: 7,
		instruction: 'Realiza los ejercicios de léxico y morfosintaxis con rigor ortográfico.',
		content: [
			{
				type: 'text',
				content: '#strong[A. Léxico (3 puntos)]'
			},
			{
				type: 'text',
				content: '#strong[1.] Busca en el texto un sinónimo para cada una de las siguientes palabras :'
			},
			{
				type: 'text',
				content: 'a) preciso / meticuloso (§1) = ............................',
				answer: 'a) riguroso',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) estimulan / animan (§4) = ............................',
				answer: 'b) alientan',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[2.] Completa la tabla de familia de palabras según el modelo español.'
			},
			buildSpanishWordFamilyTableBlock([
				{
					verbo: { given: true, value: 'comprender' },
					sustantivo: { value: 'comprensión', mark: '0.25' },
					adjetivo: { value: 'comprensible / comprensivo', mark: '0.25' }
				},
				{
					verbo: { value: 'fortalecer', mark: '0.25' },
					sustantivo: { given: true, value: 'fortaleza / fortalecimiento' },
					adjetivo: { value: 'fuerte / fortalecido', mark: '0.25' }
				}
			]),
			{
				type: 'text',
				content:
					'#strong[3.] Clasifica las expresiones en la tabla : #emph[diccionarios ; perseverancia ; bibliotecas escolares ; respeto hacia los maestros ; lectura reflexiva ; constancia en el esfuerzo].'
			},
			buildSpanishClassificationTableBlock({
				columns: [
					{
						header: 'Campo léxico de la lectura y estudio',
						items: ['diccionarios', 'bibliotecas escolares', 'lectura reflexiva'],
						mark: '0.5'
					},
					{
						header: 'Campo léxico de los valores juveniles',
						items: ['perseverancia', 'respeto hacia los maestros', 'constancia en el esfuerzo'],
						mark: '0.5'
					}
				]
			}),
			{
				type: 'text',
				content: '#strong[B. Morfosintaxis (4 puntos)]'
			},
			{
				type: 'text',
				content:
					'#strong[4.] Conjuga los verbos entre paréntesis en presente de subjuntivo o presente de indicativo según convenga :'
			},
			{
				type: 'text',
				content:
					'a) Es imprescindible que los estudiantes #strong[(leer)] obras formativas con atención cada semana.',
				answer: 'a) Es imprescindible que los estudiantes lean obras formativas con atención cada semana.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Cuando un joven #strong[(adquirir)] un nuevo vocabulario, su expresión escrita mejora notablemente.',
				answer:
					'b) Cuando un joven adquiere un nuevo vocabulario, su expresión escrita mejora notablemente.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[5.] Transforma la siguiente oración a la voz pasiva :\n« Los docentes fomentan la lectura diaria en las bibliotecas escolares. »',
				answer:
					'La lectura diaria es fomentada por los docentes en las bibliotecas escolares.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'#strong[6.] Pasa la siguiente frase al estilo indirecto :\nLa profesora recomendó a sus alumnos : « Leed textos variados y anotad las expresiones útiles. »',
				answer:
					'La profesora recomendó a sus alumnos que leyeran (o leyesen) textos variados y que anotaran (o anotasen) las expresiones útiles.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'#strong[7.] Une las dos oraciones mediante « para que + presente de subjuntivo » :\n« La familia anima a los hijos a leer. Los jóvenes desarrollan un criterio maduro. »',
				answer:
					'La familia anima a los hijos a leer para que los jóvenes desarrollen un criterio maduro.',
				mark: '1'
			}
		]
	};

	const expr: ExerciseBlock = {
		id: 'es_2023_t1_expr',
		customTitle: 'III. Expresión escrita',
		points: 6,
		instruction: 'Elige uno de los dos temas y redacta un texto estructurado de unas 120 a 150 palabras.',
		content: [
			buildSpanishWrittenProductionBlock({
				temaUnoTitle: 'Tema 1 (Guiado) :',
				temaUnoPrompt:
					'Con motivo de la semana cultural de tu instituto, redacta un artículo breve (120–150 palabras) para el boletín escolar explicando por qué la lectura de libros y el aprendizaje del español fortalecen la formación académica y personal de los estudiantes.',
				temaUnoNotas: [
					'Presenta el papel del libro frente a la distracción digital.',
					'Explica dos beneficios intelectuales de dominar idiomas extranjeros.',
					'Utiliza al menos dos estructuras con subjuntivo y conectores de orden y finalidad.'
				],
				temaDosPrompt:
					'« Quien domina su lengua propia y estudia otras lenguas con rigor amplía sus horizontes sin perder sus raíces. » Redacta un texto argumentativo (120–150 palabras) defendiendo esta idea con argumentos claros y ejemplos educativos.',
				rubricSummary:
					'Adecuación al tema y cumplimiento de las pautas (2 pts) ; coherencia estructural y uso adecuado de conectores (1.5 pt) ; corrección morfosintáctica, empleo del subjuntivo y riqueza léxica (1.5 pt) ; ortografía, acentuación y presentación (1 pt).',
				modelAnswer:
					'En nuestra etapa secundaria, cultivar el hábito de la lectura y estudiar lenguas extranjeras constituyen dos pilares esenciales para alcanzar una formación sólida. Aunque las pantallas ofrecen información inmediata, solo el libro impreso permite que los estudiantes desarrollen paciencia, concentración y rigor en el análisis de las ideas.\n\nPor un lado, leer con frecuencia en nuestra lengua materna ordena el pensamiento y enriquece el léxico. Por otro lado, aprender español nos abre las puertas de bibliotecas universitarias, estudios históricos del Mediterráneo y obras científicas redactadas en todo el mundo hispanohablante. Conviene que cada alumno dedique media hora diaria a consultar un buen libro y a practicar la escritura en su cuaderno.\n\nEn conclusión, la constancia en la lectura y el aprendizaje serio de los idiomas forman jóvenes cultos, respetuosos con sus docentes y preparados para servir con eficacia a su sociedad.',
				mark: '6'
			})
		]
	};

	return buildOfficialSpanishBacPaper({
		slug: 'bac-2023-3as-le-spanish-t1',
		academicYear: '2023',
		topicNumber: 1,
		ambitoEs: 'Ámbito Educativo y Juvenil',
		titleTopicEs: 'Aprendizaje de idiomas, lectura y formación de la juventud',
		titleTopicAr: 'تعلّم اللغات والمطالعة وتكوين الشباب',
		themesEs: [
			'Ámbito Educativo y Juvenil',
			'Aprendizaje de idiomas',
			'Lectura reflexiva',
			'Subjuntivo, pasiva y estilo indirecto'
		],
		themesAr: [
			'المجال التربوي والشباني',
			'تعلّم اللغات الأجنبية',
			'المطالعة والتكوين العلمي',
			'المنصوب والمبني للمجهول والأسلوب غير المباشر'
		],
		exercises: [comp, ling, expr]
	});
}

// ============================================================================
// 2. BAC 2023 — Tema 2 (bac-2023-3as-le-spanish-t2)
// Ámbito Científico y Tecnológico: tecnología responsable + SVG diagram
// ============================================================================

function buildBac2023SpanishT2(): OfficialSpanishBacPaperSpec {
	const svgSubjuntivoUrl = saveSpanishSvgAsset(
		'bac-2023-spa-t2-subjuntivo-tecnologia',
		svgSpanishGrammarMap({
			title: 'Uso del subjuntivo en el ámbito científico-tecnológico',
			rootLabel: 'Oraciones subordinadas',
			rootSub: 'Valoración, finalidad y concesión',
			branches: [
				{
					label: 'Valoración',
					rule: 'Es necesario que + subj.',
					example: 'protejan sus datos',
					color: '#b91c1c'
				},
				{
					label: 'Finalidad',
					rule: 'para que + subjuntivo',
					example: 'aprendan con orden',
					color: '#047857'
				},
				{
					label: 'Concesión',
					rule: 'aunque + subj. (hipótesis)',
					example: 'surjan nuevas redes',
					color: '#1d4ed8'
				}
			],
			width: 560,
			height: 245
		})
	);

	const comp: ExerciseBlock = {
		id: 'es_2023_t2_comp',
		customTitle: 'I. Comprensión del texto',
		points: 7,
		instruction: 'Lee con atención el siguiente texto divulgativo y contesta a las preguntas.',
		content: [
			buildSpanishPassageBlock({
				title: 'La tecnología al servicio del conocimiento: entre innovación y responsabilidad',
				paragraphs: [
					'En las últimas décadas, las plataformas educativas digitales, los simuladores científicos y las bibliotecas virtuales han transformado profundamente el acceso a la información académica. Gracias a [[estas herramientas]], un estudiante puede consultar manuales especializados, verificar datos experimentales y repasar lecciones desde cualquier ciudad sin depender únicamente de la distancia geográfica.',
					'No obstante, el progreso técnico pierde su valor formativo cuando se emplea sin discernimiento ni horarios definidos. Diversos educadores advierten que el uso desmedido de dispositivos conectados fragmenta la atención, reduce el tiempo dedicado al descanso saludable y expone a los usuarios a noticias no contrastadas o a riesgos para su privacidad digital.',
					'Por esa razón, la verdadera alfabetización digital no consiste solo en manejar aplicaciones modernas con rapidez, sino en saber seleccionar fuentes fiables, proteger la información personal y respetar la propiedad intelectual de los autores. La ética informática exige verificar cada dato antes de difundirlo y mantener siempre el respeto hacia los demás en el intercambio electrónico.',
					'En definitiva, la tecnología es una excelente aliada del estudio y la investigación científica siempre que permanezca bajo la guía de la razón y los valores humanos. Lograr [[ello]] requiere una educación tecnológica equilibrada donde la innovación técnica camine de la mano con la responsabilidad individual.'
				],
				source: 'Revista de Ciencia, Ética Digital y Educación, Edición SujetStore',
				numberedParagraphs: true,
				glossary: [
					{
						term: 'discernimiento',
						meaning: 'capacidad de distinguir con sensatez lo útil y verdadero de lo perjudicial'
					},
					{
						term: 'alfabetización digital',
						meaning: 'conjunto de conocimientos para usar las tecnologías con seguridad, ética y eficacia'
					},
					{
						term: 'privacidad digital',
						meaning: 'protección de los datos personales frente a usos indebidos en la red'
					}
				]
			}),
			buildIllustratedFigureBlock('spa_05_tecnologia_comunicacion_responsable', {
				lang: 'es',
				mode: 'labeled',
				pins: [],
				width: '62%',
				maxHeight: 128,
				caption: 'Documento visual: Ejes de la innovación educativa y la seguridad digital responsable.'
			}),
			{
				type: 'text',
				content: '#strong[1.] Escoge la opción que mejor resume el propósito comunicativo del texto.'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: 'La intención principal del autor al redactar este texto es :',
						options: [
							'rechazar por completo el empleo de ordenadores en los centros educativos',
							'destacar el valor educativo de las tecnologías digitales insistiendo en su uso ético y equilibrado',
							'promocionar la compra de teléfonos móviles de última generación'
						],
						correct:
							'destacar el valor educativo de las tecnologías digitales insistiendo en su uso ético y equilibrado',
						mark: '1'
					}
				]
			},
			{
				type: 'text',
				content:
					'#strong[2.] Indica si estas afirmaciones son Verdaderas o Falsas justificando cada una desde el texto.'
			},
			{
				type: 'true_false',
				items: [
					{
						q: 'a) Las bibliotecas virtuales facilitan la consulta de manuales académicos sin barreras geográficas.',
						a: 'Verdadero',
						c: 'El estudiante puede consultar manuales especializados y repasar lecciones desde cualquier ciudad sin depender de la distancia geográfica (§1).',
						mark: '0.5'
					},
					{
						q: 'b) El uso ilimitado de pantallas mejora la capacidad de atención y el descanso del alumno.',
						a: 'Falso',
						c: 'El texto advierte que el uso desmedido fragmenta la atención y reduce el tiempo dedicado al descanso saludable (§2).',
						mark: '0.5'
					},
					{
						q: 'c) La alfabetización digital se limita únicamente a saber pulsar aplicaciones con velocidad.',
						a: 'Falso',
						c: 'No consiste solo en manejar aplicaciones con rapidez, sino en seleccionar fuentes fiables, proteger la información y respetar la propiedad intelectual (§3).',
						mark: '0.5'
					},
					{
						q: 'd) Toda información encontrada en la red debe contrastarse antes de compartirla.',
						a: 'Verdadero',
						c: 'La ética informática exige verificar cada dato antes de difundirlo (§3).',
						mark: '0.5'
					}
				]
			},
			{
				type: 'text',
				content: '#strong[3.] Responde con tus propias palabras a las siguientes cuestiones.'
			},
			{
				type: 'text',
				content:
					'a) ¿Qué consecuencias negativas provoca el uso excesivo y sin criterio de los dispositivos conectados?',
				answer:
					'a) Provoca dispersión de la atención, disminución del descanso saludable, exposición a informaciones no verificadas y vulnerabilidad de los datos personales.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'b) Enumera tres principios éticos que caracterizan a una verdadera alfabetización digital según el párrafo 3.',
				answer:
					'b) Saber seleccionar fuentes fiables, proteger la privacidad personal, respetar la propiedad intelectual de los autores y verificar los datos antes de difundirlos (tres principios).',
				mark: '1'
			},
			{
				type: 'text',
				content: '#strong[4.] Precisa a qué remiten los elementos subrayados en el texto :'
			},
			{
				type: 'text',
				content: 'a) «estas herramientas» (§1) remite a : ............................',
				answer:
					'a) Remite a las plataformas educativas digitales, los simuladores científicos y las bibliotecas virtuales.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) «ello» (§4) remite a : ............................',
				answer:
					'b) Remite a mantener la tecnología bajo la guía de la razón y los valores humanos como aliada del estudio.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[5.] Completa el cuadro comparativo con ideas clave del texto.'
			},
			{
				type: 'table',
				headers: ['Dimensión tecnológica', 'Exigencia o medida recomendada'],
				cells: [],
				rows: [
					[
						{ content: 'Innovación educativa', bold: true },
						{
							content: '....................',
							answer: 'Aprovechar simuladores y bibliotecas virtuales con horarios definidos y criterio.',
							mark: '0.5'
						}
					],
					[
						{ content: 'Seguridad y ética digital', bold: true },
						{
							content: '....................',
							answer: 'Proteger la privacidad personal, verificar cada dato y respetar la propiedad intelectual.',
							mark: '0.5'
						}
					]
				],
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			}
		]
	};

	const ling: ExerciseBlock = {
		id: 'es_2023_t2_ling',
		customTitle: 'II. Competencia lingüística',
		points: 7,
		instruction: 'Observa el esquema gramatical y responde con precisión a los apartados A y B.',
		content: [
			{
				type: 'text',
				content: '#strong[A. Léxico (3 puntos)]'
			},
			{
				type: 'text',
				content: '#strong[1.] Encuentra en el texto el antónimo de cada palabra propuesta :'
			},
			{
				type: 'text',
				content: 'a) moderado / equilibrado (§2) ≠ ............................',
				answer: 'a) desmedido',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) dudosas / poco seguras (§3) ≠ ............................',
				answer: 'b) fiables',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[2.] Completa la siguiente tabla morfológica.'
			},
			buildSpanishWordFamilyTableBlock([
				{
					verbo: { given: true, value: 'innovar' },
					sustantivo: { value: 'innovación', mark: '0.25' },
					adjetivo: { value: 'innovador', mark: '0.25' }
				},
				{
					verbo: { value: 'proteger', mark: '0.25' },
					sustantivo: { given: true, value: 'protección' },
					adjetivo: { value: 'protector / protegido', mark: '0.25' }
				}
			]),
			{
				type: 'text',
				content:
					'#strong[3.] Clasifica las siguientes expresiones : #emph[simuladores científicos ; uso desmedido ; bibliotecas virtuales ; noticias no contrastadas ; plataformas educativas ; fragmentación de la atención].'
			},
			buildSpanishClassificationTableBlock({
				columns: [
					{
						header: 'Aportes de la innovación educativa',
						items: ['simuladores científicos', 'bibliotecas virtuales', 'plataformas educativas'],
						mark: '0.5'
					},
					{
						header: 'Riesgos del mal uso digital',
						items: ['uso desmedido', 'noticias no contrastadas', 'fragmentación de la atención'],
						mark: '0.5'
					}
				]
			}),
			{
				type: 'text',
				content: '#strong[B. Morfosintaxis (4 puntos)]'
			},
			{
				type: 'image',
				src: svgSubjuntivoUrl,
				width: 'full',
				caption: 'Figura: Esquema de subordinadas con subjuntivo aplicadas al ámbito tecnológico.'
			},
			{
				type: 'text',
				content:
					'#strong[4.] Pon los verbos entre paréntesis en presente de subjuntivo o presente de indicativo :'
			},
			{
				type: 'text',
				content:
					'a) Es necesario que los jóvenes #strong[(verificar)] siempre el origen de las noticias científicas.',
				answer: 'a) Es necesario que los jóvenes verifiquen siempre el origen de las noticias científicas.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Sabemos con certeza que las bibliotecas digitales #strong[(facilitar)] el estudio autónomo.',
				answer: 'b) Sabemos con certeza que las bibliotecas digitales facilitan el estudio autónomo.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[5.] Expresa finalidad sustituyendo « con el objetivo de + infinitivo » por « para que + subjuntivo » :\n« El docente organiza talleres digitales con el objetivo de que los alumnos aprendan a investigar con orden. »',
				answer:
					'El docente organiza talleres digitales para que los alumnos aprendan a investigar con orden.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'#strong[6.] Expresa una concesión hipotética utilizando « aunque + presente de subjuntivo » :\n« Pese a aparecer nuevas redes cada año, el criterio humano seguirá siendo indispensable. »',
				answer:
					'Aunque aparezcan nuevas redes cada año, el criterio humano seguirá siendo indispensable.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'#strong[7.] Completa cada enunciado con el conector adecuado : #emph[sin embargo] / #emph[por consiguiente].'
			},
			{
				type: 'text',
				content: 'a) Internet ofrece miles de archivos valiosos ; ............, exige espíritu crítico.',
				answer: 'a) sin embargo',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) Protegió su cuenta con una contraseña robusta ; ............, evitó robos de datos.',
				answer: 'b) por consiguiente',
				mark: '0.5'
			}
		]
	};

	const expr: ExerciseBlock = {
		id: 'es_2023_t2_expr',
		customTitle: 'III. Expresión escrita',
		points: 6,
		instruction: 'Elige UNO de los dos temas y redacta un texto coherente de 120 a 150 palabras.',
		content: [
			buildSpanishWrittenProductionBlock({
				temaUnoTitle: 'Tema 1 (Guiado) :',
				temaUnoPrompt:
					'El club científico de tu centro organiza una jornada sobre « Seguridad y equilibrio digital ». Redacta un artículo orientativo (120–150 palabras) con recomendaciones prácticas para aprovechar las herramientas tecnológicas en el estudio sin descuidar la salud ni la ética.',
				temaUnoNotas: [
					'Menciona dos ventajas educativas de la informática y los simuladores.',
					'Propón tres reglas de seguridad digital y control del tiempo ante las pantallas.',
					'Emplea conectores de contraste y consecuencia.'
				],
				temaDosPrompt:
					'¿Crees que los recursos digitales llegarán a sustituir al libro impreso y a la orientación directa del profesor en el aula? Expón tu punto de vista razonado en un ensayo de 120 a 150 palabras.',
				rubricSummary:
					'Pertinencia de ideas y respeto del tema (2 pts) ; organización lógica y conectores (1.5 pt) ; dominio gramatical, subjuntivo y léxico científico-educativo (1.5 pt) ; ortografía y claridad expresiva (1 pt).',
				modelAnswer:
					'Las herramientas digitales han revolucionado el aprendizaje contemporáneo al poner bibliotecas virtuales y simuladores científicos al alcance de cualquier estudiante. Sin embargo, para que la tecnología favorezca verdaderamente el éxito académico, resulta indispensable utilizarla con orden, ética y equilibrio.\n\nEn primer lugar, conviene fijar horarios precisos de estudio frente a la pantalla, de modo que el ordenador no reste horas al descanso ni a la lectura serena en papel. En segundo lugar, es fundamental que los jóvenes protejan su privacidad mediante contraseñas seguras y eviten difundir contenidos sin confirmar antes su fiabilidad científica. Por último, recordar la propiedad intelectual honra el esfuerzo de quienes investigan y escriben.\n\nEn resumen, la innovación digital alcanza su mayor utilidad cuando sirve de apoyo al pensamiento reflexivo y permanece guiada por la responsabilidad moral del estudiante.',
				mark: '6'
			})
		]
	};

	return buildOfficialSpanishBacPaper({
		slug: 'bac-2023-3as-le-spanish-t2',
		academicYear: '2023',
		topicNumber: 2,
		ambitoEs: 'Ámbito Científico y Tecnológico',
		titleTopicEs: 'Uso responsable de la tecnología e innovación educativa',
		titleTopicAr: 'الاستعمال المسؤول للتكنولوجيا والابتكار التعليمي',
		themesEs: [
			'Ámbito Científico y Tecnológico',
			'Innovación educativa',
			'Seguridad digital',
			'Subjuntivo y conectores lógicos'
		],
		themesAr: [
			'المجال العلمي والتكنولوجي',
			'الابتكار التعليمي',
			'الأمن الرقمي',
			'جمل الغاية والاعتراض والروابط المنطقية'
		],
		exercises: [comp, ling, expr]
	});
}

// ============================================================================
// 3. BAC 2024 — Tema 1 (bac-2024-3as-le-spanish-t1)
// Ámbito Medioambiental: energías limpias, preservación del agua y ecología
// ============================================================================

function buildBac2024SpanishT1(): OfficialSpanishBacPaperSpec {
	const comp: ExerciseBlock = {
		id: 'es_2024_t1_comp',
		customTitle: 'I. Comprensión del texto',
		points: 7,
		instruction: 'Lee detenidamente el texto sobre ecología y contesta a las cuestiones.',
		content: [
			buildSpanishPassageBlock({
				title: 'Agua y sol: pilares del desarrollo sostenible en el Mediterráneo y el Sáhara',
				paragraphs: [
					'El cambio climático, las olas de calor prolongadas y la presión demográfica obligan hoy a las sociedades mediterráneas a replantear su relación con los recursos naturales. La desertificación y la contaminación atmosférica ya no son amenazas lejanas, sino desafíos concretos que exigen respuestas científicas inmediatas y un cambio profundo en los hábitos cotidianos.',
					'Entre todas las prioridades ecológicas, la preservación del agua ocupa el primer lugar. Debido a la irregularidad de las lluvias, cada gota malgastada en el riego ineficiente o en el consumo doméstico compromete el equilibrio de las futuras generaciones. Si las comunidades urbanas y rurales adoptaran sistemas de riego localizado y evitaran el despilfarro diario, protegerían [[este recurso vital]] frente a la sequía.',
					'Paralelamente, la transición energética hacia fuentes limpias avanza con fuerza en el norte de África y en el sur de Europa. El aprovechamiento de la energía solar fotovoltaica y de la energía eólica permite generar electricidad sin emitir gases contaminantes. [[Estas soluciones]] renovables, combinadas con campañas escolares de reforestación, frenan el avance de las dunas y regeneran los suelos fatigados.',
					'Con todo, las infraestructuras técnicas por sí solas no bastarían sin una auténtica conciencia ecológica ciudadana. Ahorrar agua en casa, plantar un árbol en el barrio y reciclar los residuos sólidos son gestos sencillos que demuestran gratitud hacia los dones de la naturaleza y responsabilidad hacia quienes heredarán la tierra.'
				],
				source: 'Observatorio Mediterráneo de Ecología y Energías Limpias, Edición SujetStore',
				numberedParagraphs: true,
				glossary: [
					{
						term: 'desertificación',
						meaning: 'degradación progresiva del suelo fértil en zonas secas o semiáridas'
					},
					{
						term: 'despilfarro',
						meaning: 'gasto excesivo, innecesario y poco responsable de un bien escaso'
					},
					{
						term: 'fotovoltaica',
						meaning: 'tecnología que transforma directamente la radiación solar en electricidad'
					}
				]
			}),
			buildIllustratedFigureBlock('spa_04_medio_ambiente_energias_limpias', {
				lang: 'es',
				mode: 'labeled',
				pins: [],
				width: '62%',
				maxHeight: 128,
				caption: 'Documento visual: Fuentes de energía renovable, reforestación y ahorro del agua.'
			}),
			{
				type: 'text',
				content: '#strong[1.] Selecciona la idea central que resume el texto.'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: 'El texto sostiene fundamentalmente que :',
						options: [
							'la protección ambiental requiere cuidar el agua, impulsar energías limpias y fomentar hábitos ciudadanos responsables',
							'las energías fósiles no tienen ningún efecto sobre el calentamiento global',
							'solo las grandes empresas deben preocuparse por el ahorro del agua'
						],
						correct:
							'la protección ambiental requiere cuidar el agua, impulsar energías limpias y fomentar hábitos ciudadanos responsables',
						mark: '1'
					}
				]
			},
			{
				type: 'text',
				content:
					'#strong[2.] Di si es Verdadero o Falso y justifica cada respuesta citando o parafraseando el texto.'
			},
			{
				type: 'true_false',
				items: [
					{
						q: 'a) La desertificación y la contaminación del aire son problemas que pertenecen únicamente a un futuro remoto.',
						a: 'Falso',
						c: 'No son amenazas lejanas, sino desafíos concretos que exigen respuestas científicas inmediatas (§1).',
						mark: '0.5'
					},
					{
						q: 'b) El riego localizado contribuye a proteger el agua frente a periodos de sequía.',
						a: 'Verdadero',
						c: 'Si las comunidades adoptaran sistemas de riego localizado y evitaran el despilfarro, protegerían este recurso vital frente a la sequía (§2).',
						mark: '0.5'
					},
					{
						q: 'c) La energía solar fotovoltaica y la eólica producen electricidad reduciendo los gases contaminantes.',
						a: 'Verdadero',
						c: 'El aprovechamiento de la energía solar fotovoltaica y eólica permite generar electricidad sin emitir gases contaminantes (§3).',
						mark: '0.5'
					},
					{
						q: 'd) Las instalaciones técnicas bastan para resolver la crisis ecológica sin la participación ciudadana.',
						a: 'Falso',
						c: 'Las infraestructuras técnicas por sí solas no bastarían sin una auténtica conciencia ecológica ciudadana (§4).',
						mark: '0.5'
					}
				]
			},
			{
				type: 'text',
				content: '#strong[3.] Contesta de manera clara a las preguntas siguientes.'
			},
			{
				type: 'text',
				content:
					'a) ¿Qué papel desempeña la combinación de energías limpias y reforestación según el párrafo 3?',
				answer:
					'a) Genera electricidad sin contaminar, detiene el avance de las dunas desérticas y ayuda a regenerar los suelos empobrecidos.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'b) ¿Qué gestos cotidianos ejemplifican la conciencia ecológica ciudadana en el último párrafo?',
				answer:
					'b) Ahorrar agua en el hogar, plantar árboles en el vecindario y reciclar los desechos sólidos.',
				mark: '1'
			},
			{
				type: 'text',
				content: '#strong[4.] Indica a qué se refieren las expresiones subrayadas en el texto :'
			},
			{
				type: 'text',
				content: 'a) «este recurso vital» (§2) se refiere a : ............................',
				answer: 'a) Se refiere al agua.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) «Estas soluciones» (§3) se refiere a : ............................',
				answer: 'b) Se refiere a las energías renovables (la energía solar fotovoltaica y la energía eólica).',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[5.] Completa la tabla de problemas y medidas sostenibles según el texto.'
			},
			{
				type: 'table',
				headers: ['Desafío ecológico', 'Medida sostenible propuesta'],
				cells: [],
				rows: [
					[
						{ content: 'Escasez e irregularidad de lluvias', bold: true },
						{
							content: '....................',
							answer: 'Sistemas de riego localizado y ahorro diario del agua doméstica.',
							mark: '0.5'
						}
					],
					[
						{ content: 'Emisiones contaminantes y degradación del suelo', bold: true },
						{
							content: '....................',
							answer: 'Energía solar fotovoltaica, energía eólica y campañas de reforestación.',
							mark: '0.5'
						}
					]
				],
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			}
		]
	};

	const ling: ExerciseBlock = {
		id: 'es_2024_t1_ling',
		customTitle: 'II. Competencia lingüística',
		points: 7,
		instruction: 'Responde con exactitud a las actividades de léxico y gramática.',
		content: [
			{
				type: 'text',
				content: '#strong[A. Léxico (3 puntos)]'
			},
			{
				type: 'text',
				content: '#strong[1.] Localiza en el texto :'
			},
			{
				type: 'text',
				content: 'a) Un sinónimo de « conservación / cuidado » (§2) : ............................',
				answer: 'a) preservación',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) Un antónimo de « ahorro / economía » (§2) : ............................',
				answer: 'b) despilfarro',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[2.] Completa la tabla de derivación léxica.'
			},
			buildSpanishWordFamilyTableBlock([
				{
					verbo: { given: true, value: 'preservar' },
					sustantivo: { value: 'preservación', mark: '0.25' },
					adjetivo: { value: 'preservado', mark: '0.25' }
				},
				{
					verbo: { value: 'contaminar', mark: '0.25' },
					sustantivo: { given: true, value: 'contaminación' },
					adjetivo: { value: 'contaminante / contaminado', mark: '0.25' }
				}
			]),
			{
				type: 'text',
				content:
					'#strong[3.] Clasifica los términos en el cuadro : #emph[energía solar ; sequía ; reforestación ; desertificación ; riego localizado ; contaminación atmosférica].'
			},
			buildSpanishClassificationTableBlock({
				columns: [
					{
						header: 'Soluciones y energías limpias',
						items: ['energía solar', 'reforestación', 'riego localizado'],
						mark: '0.5'
					},
					{
						header: 'Amenazas medioambientales',
						items: ['sequía', 'desertificación', 'contaminación atmosférica'],
						mark: '0.5'
					}
				]
			}),
			{
				type: 'text',
				content: '#strong[B. Morfosintaxis (4 puntos)]'
			},
			{
				type: 'text',
				content: '#strong[4.] Completa las oraciones condicionales conjugando correctamente los verbos :'
			},
			{
				type: 'text',
				content:
					'a) Si todos los ciudadanos #strong[(reciclar)] sus residuos, nuestras ciudades estarán más limpias.',
				answer:
					'a) Si todos los ciudadanos reciclan sus residuos, nuestras ciudades estarán más limpias.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Si los municipios invirtieran más en energía solar, #strong[(reducir)] drásticamente las emisiones.',
				answer:
					'b) Si los municipios invirtieran más en energía solar, reducirían drásticamente las emisiones.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[5.] Transforma la siguiente condicional real al segundo tipo (condicional hipotética : Si + imperfecto de subjuntivo, condicional simple) :\n« Si cuidamos los bosques, frenaremos el avance del desierto. »',
				answer:
					'Si cuidáramos (o cuidásemos) los bosques, frenaríamos el avance del desierto.',
				mark: '1'
			},
			{
				type: 'text',
				content: '#strong[6.] Completa con los conectores causales o consecutivos adecuados :'
			},
			{
				type: 'text',
				content:
					'a) Las lluvias han disminuido este año ; ............, conviene racionalizar el riego agrícola. (#emph[porque / por lo tanto])',
				answer: 'a) por lo tanto',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Los paneles fotovoltaicos resultan rentables en el sur ............ la abundante radiación solar. (#emph[debido a / sin embargo])',
				answer: 'b) debido a',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[7.] Reescribe la frase sustituyendo « Es necesario + infinitivo » por « Hay que + infinitivo » o « Debemos + infinitivo » según corresponda :\n« Es necesario preservar cada gota de agua y plantar árboles autóctonos. »',
				answer:
					'Debemos preservar cada gota de agua y plantar árboles autóctonos. (También válido: Hay que preservar cada gota de agua y plantar árboles autóctonos.)',
				mark: '1'
			}
		]
	};

	const expr: ExerciseBlock = {
		id: 'es_2024_t1_expr',
		customTitle: 'III. Expresión escrita',
		points: 6,
		instruction: 'Elige UNO de los dos temas propuestos y redacta un texto de 120 a 150 palabras.',
		content: [
			buildSpanishWrittenProductionBlock({
				temaUnoTitle: 'Tema 1 (Guiado) :',
				temaUnoPrompt:
					'Redacta una carta abierta dirigida al director de tu instituto (120–150 palabras) proponiendo organizar una « Jornada Verde » dedicada a la plantación de árboles, la instalación de papeleras de reciclaje y la sensibilización sobre el ahorro del agua.',
				temaUnoNotas: [
					'Respeta la estructura formal de la carta (saludo respetuoso, motivo, propuestas concretas y despedida).',
					'Incluye una oración condicional hipotética y dos conectores de causa o finalidad.',
					'Destaca la colaboración entre alumnos, profesores y personal del centro.'
				],
				temaDosPrompt:
					'« La transición hacia las energías solar y eólica no es un lujo, sino una necesidad vital para proteger el planeta y garantizar un futuro próspero. » Desarrolla esta afirmación en un ensayo argumentativo de 120 a 150 palabras.',
				rubricSummary:
					'Adecuación al formato y contenido ambiental (2 pts) ; coherencia textual y uso de conectores (1.5 pt) ; corrección de las condicionales, tiempos verbales y vocabulario ecológico (1.5 pt) ; ortografía y presentación (1 pt).',
				modelAnswer:
					'Estimado señor Director :\n\nEn nombre del club ecológico de tercer año, le escribo para proponer la organización de una « Jornada Verde » en nuestro instituto durante el próximo mes. Ante el aumento del calor y la escasez de lluvias, consideramos urgente fomentar hábitos responsables entre los estudiantes.\n\nSi contáramos con su autorización, plantaríamos veinte olivos y cipreses en el patio exterior y colocaríamos contenedores diferenciados para papel y plástico. Asimismo, prepararíamos carteles bilingües sobre el cierre correcto de los grifos, debido a que cada gota ahorrada cuenta para el bienestar común. Estas actividades permitirán que el alumnado participe activamente en el cuidado de su entorno.\n\nAgradeciendo de antemano su atención y apoyo continuo, le saluda atentamente el representante del club ecológico.',
				mark: '6'
			})
		]
	};

	return buildOfficialSpanishBacPaper({
		slug: 'bac-2024-3as-le-spanish-t1',
		academicYear: '2024',
		topicNumber: 1,
		ambitoEs: 'Ámbito Medioambiental',
		titleTopicEs: 'Energías limpias, preservación del agua y conciencia ecológica',
		titleTopicAr: 'الطاقات النظيفة والحفاظ على المياه والوعي البيئي',
		themesEs: [
			'Ámbito Medioambiental',
			'Energías renovables',
			'Ahorro del agua',
			'Oraciones condicionales y conectores'
		],
		themesAr: [
			'المجال البيئي',
			'الطاقات المتجددة',
			'ترشيد استهلاك المياه',
			'الجمل الشرطية والروابط'
		],
		exercises: [comp, ling, expr]
	});
}

// ============================================================================
// 4. BAC 2024 — Tema 2 (bac-2024-3as-le-spanish-t2)
// Páginas Eternas y Patrimonio Andalusí-Magrebí: Córdoba, Granada, Tremecén,
// Ibn Jaldún y Al-Idrisi + Pretéritos e imperfecto de subjuntivo
// ============================================================================

function buildBac2024SpanishT2(): OfficialSpanishBacPaperSpec {
	const comp: ExerciseBlock = {
		id: 'es_2024_t2_comp',
		customTitle: 'I. Comprensión del texto',
		points: 7,
		instruction: 'Lee atentamente este texto histórico-cultural y responde a las preguntas.',
		content: [
			buildSpanishPassageBlock({
				title: 'Páginas eternas de ciencia y arquitectura entre Al-Ándalus y el Magreb',
				paragraphs: [
					'Durante varios siglos de esplendor intelectual, las ciudades de Córdoba, Granada, Sevilla y Tremecén formaron un espacio compartido donde la geometría, la hidráulica y el amor por el saber alcanzaron cumbres admirables. Quien contempla hoy los arcos bicolores de la Mezquita de Córdoba, los patios serenos de la Alhambra granadina o el alminar histórico de la Gran Mezquita de Tremecén descubre una misma armonía entre piedra, luz y cálculo matemático.',
					'El legado de [[estas ciudades]] no se limitó a la belleza de sus monumentos, sino que brilló especialmente en sus bibliotecas y escuelas científicas. En sus aulas, copistas y traductores trabajaron con rigor para que los manuscritos de medicina, astronomía y botánica se conservaran intactos. El célebre cirujano andalusí Al-Zahrawi sistematizó instrumentos quirúrgicos innovadores, mientras que la pionera Fátima Al-Fihriya inspiró un modelo duradero de enseñanza universitaria abierta al estudio metódico.',
					'En ese mismo horizonte mediterráneo destacaron dos figuras universales vinculadas estrechamente al norte de África y a la península ibérica. El geógrafo Al-Idrisi redactó tratados minuciosos acompañados de mapas sorprendentemente precisos de mares y continentes, y el gran pensador Ibn Jaldún, quien escribió parte de su obra cerca de Tremecén, sentó las bases de la historiografía crítica y de la ciencia de la sociedad humana, dejando en [[sus obras]] un método riguroso para analizar el auge y el declive de las civilizaciones.',
					'Conservar hoy este patrimonio común no responde a una nostalgia inmóvil, sino al deseo de inspirar a las nuevas generaciones. Estudiar aquellos siglos demuestra que la fidelidad a los valores propios y la disciplina científica convierten el diálogo entre las dos orillas del Mediterráneo en una fuente fecunda de progreso.'
				],
				source: 'Páginas Eternas del Patrimonio Andalusí-Magrebí, Edición SujetStore',
				numberedParagraphs: true,
				glossary: [
					{
						term: 'alminar',
						meaning: 'torre elevada de una mezquita desde donde se llama a la oración'
					},
					{
						term: 'historiografía crítica',
						meaning: 'estudio riguroso de la historia basado en la verificación de las causas y fuentes'
					},
					{
						term: 'fecunda',
						meaning: 'muy productiva, rica en resultados culturales y científicos'
					}
				]
			}),
			buildIllustratedFigureBlock('spa_02_patrimonio_andalusi_arquitectura', {
				lang: 'es',
				mode: 'labeled',
				pins: [],
				width: '62%',
				maxHeight: 128,
				caption: 'Documento visual: Joyas de la arquitectura histórica andalusí y magrebí.'
			}),
			{
				type: 'text',
				content: '#strong[1.] Elige la respuesta correcta marcando la opción adecuada.'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: 'El tema central del texto es :',
						options: [
							'las técnicas modernas de construcción de rascacielos en Europa',
							'el legado arquitectónico y científico compartido entre Al-Ándalus y el Magreb y su vigencia educativa',
							'los viajes comerciales por el océano Pacífico en el siglo veinte'
						],
						correct:
							'el legado arquitectónico y científico compartido entre Al-Ándalus y el Magreb y su vigencia educativa',
						mark: '1'
					}
				]
			},
			{
				type: 'text',
				content:
					'#strong[2.] Di si las siguientes afirmaciones son Verdaderas o Falsas y justifica cada una según el texto.'
			},
			{
				type: 'true_false',
				items: [
					{
						q: 'a) Los monumentos de Córdoba, Granada y Tremecén muestran una armonía basada en el cálculo matemático.',
						a: 'Verdadero',
						c: 'Contemplar la Mezquita de Córdoba, la Alhambra de Granada y la Gran Mezquita de Tremecén revela una misma armonía entre piedra, luz y cálculo matemático (§1).',
						mark: '0.5'
					},
					{
						q: 'b) La herencia cultural de Al-Ándalus y el Magreb se redujo exclusivamente a sus edificios.',
						a: 'Falso',
						c: 'Su legado no se limitó a la belleza de sus monumentos, sino que brilló especialmente en sus bibliotecas y escuelas científicas (§2).',
						mark: '0.5'
					},
					{
						q: 'c) Ibn Jaldún redactó parte de su obra cerca de Tremecén y renovó el estudio crítico de la historia.',
						a: 'Verdadero',
						c: 'Ibn Jaldún escribió parte de su obra cerca de Tremecén y sentó las bases de la historiografía crítica y de la ciencia de la sociedad humana (§3).',
						mark: '0.5'
					},
					{
						q: 'd) Preservar este patrimonio histórico sirve únicamente para vivir anclados en el pasado sin utilidad actual.',
						a: 'Falso',
						c: 'No responde a una nostalgia inmóvil, sino al deseo de inspirar a las nuevas generaciones y mostrar que el rigor científico hace fecundo el diálogo (§4).',
						mark: '0.5'
					}
				]
			},
			{
				type: 'text',
				content: '#strong[3.] Responde de forma redactada a las preguntas siguientes.'
			},
			{
				type: 'text',
				content:
					'a) ¿Qué papel desempeñaron Al-Zahrawi y Fátima Al-Fihriya dentro de la tradición científica citada en el párrafo 2?',
				answer:
					'a) Al-Zahrawi sistematizó instrumentos quirúrgicos innovadores en medicina, mientras que Fátima Al-Fihriya inspiró un modelo duradero de enseñanza universitaria metódica.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'b) ¿Por qué se consideran importantes los trabajos de Al-Idrisi para el conocimiento geográfico?',
				answer:
					'b) Porque redactó tratados geográficos minuciosos acompañados de mapas sorprendentemente precisos de mares y continentes.',
				mark: '1'
			},
			{
				type: 'text',
				content: '#strong[4.] Indica a quién o a qué remiten los términos subrayados en el texto :'
			},
			{
				type: 'text',
				content: 'a) «estas ciudades» (§2) se refiere a : ............................',
				answer: 'a) Se refiere a Córdoba, Granada, Sevilla y Tremecén.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) «sus obras» (§3) se refiere a : ............................',
				answer: 'b) Se refiere a las obras del historiador y pensador Ibn Jaldún.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[5.] Completa la ficha histórica con los datos precisos del párrafo 3.'
			},
			{
				type: 'table',
				headers: ['Sabio citado', 'Disciplina y aportación destacada'],
				cells: [],
				rows: [
					[
						{ content: 'Al-Idrisi', bold: true },
						{
							content: '....................',
							answer: 'Geografía : tratados detallados y mapas precisos de mares y continentes.',
							mark: '0.5'
						}
					],
					[
						{ content: 'Ibn Jaldún', bold: true },
						{
							content: '....................',
							answer: 'Historiografía crítica y ciencia social : método para analizar el auge y declive civilizatorio.',
							mark: '0.5'
						}
					]
				],
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			}
		]
	};

	const ling: ExerciseBlock = {
		id: 'es_2024_t2_ling',
		customTitle: 'II. Competencia lingüística',
		points: 7,
		instruction: 'Realiza con esmero las actividades de léxico y gramática histórica.',
		content: [
			{
				type: 'text',
				content: '#strong[A. Léxico (3 puntos)]'
			},
			{
				type: 'text',
				content: '#strong[1.] Extrae del texto un sinónimo para cada palabra :'
			},
			{
				type: 'text',
				content: 'a) brillantez / grandeza (§1) = ............................',
				answer: 'a) esplendor',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) herencia cultural (§2) = ............................',
				answer: 'b) legado (o patrimonio)',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[2.] Completa el cuadro de familia de palabras.'
			},
			buildSpanishWordFamilyTableBlock([
				{
					verbo: { given: true, value: 'construir' },
					sustantivo: { value: 'construcción', mark: '0.25' },
					adjetivo: { value: 'constructivo / construido', mark: '0.25' }
				},
				{
					verbo: { value: 'heredar', mark: '0.25' },
					sustantivo: { given: true, value: 'herencia' },
					adjetivo: { value: 'hereditario / heredado', mark: '0.25' }
				}
			]),
			{
				type: 'text',
				content:
					'#strong[3.] Clasifica las expresiones siguientes : #emph[arcos bicolores ; mapas precisos ; patios de la Alhambra ; tratados de astronomía ; alminar de Tremecén ; historiografía crítica].'
			},
			buildSpanishClassificationTableBlock({
				columns: [
					{
						header: 'Patrimonio arquitectónico',
						items: ['arcos bicolores', 'patios de la Alhambra', 'alminar de Tremecén'],
						mark: '0.5'
					},
					{
						header: 'Aportes científicos e intelectuales',
						items: ['mapas precisos', 'tratados de astronomía', 'historiografía crítica'],
						mark: '0.5'
					}
				]
			}),
			{
				type: 'text',
				content: '#strong[B. Morfosintaxis (4 puntos)]'
			},
			{
				type: 'text',
				content:
					'#strong[4.] Elige o conjuga entre pretérito indefinido y pretérito imperfecto según el contexto histórico :'
			},
			{
				type: 'text',
				content:
					'a) Mientras las bibliotecas de Córdoba #strong[(albergar)] miles de volúmenes, Al-Idrisi #strong[(trazar)] sus famosos mapas.',
				answer:
					'a) Mientras las bibliotecas de Córdoba albergaban miles de volúmenes, Al-Idrisi trazó sus famosos mapas.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) En la época de Tremecén, Ibn Jaldún #strong[(redactar)] páginas decisivas mientras los artesanos #strong[(decorar)] los patios.',
				answer:
					'b) En la época de Tremecén, Ibn Jaldún redactó páginas decisivas mientras los artesanos decoraban los patios.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[5.] Conjuga los verbos en imperfecto de subjuntivo :'
			},
			{
				type: 'text',
				content:
					'a) Los sabios deseaban que los estudiantes #strong[(conservar)] los manuscritos con respeto.',
				answer:
					'a) Los sabios deseaban que los estudiantes conservaran (o conservasen) los manuscritos con respeto.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Era indispensable que las escuelas #strong[(tener)] traductores bien preparados.',
				answer:
					'b) Era indispensable que las escuelas tuvieran (o tuviesen) traductores bien preparados.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[6.] Pasa la oración a la voz pasiva en pasado :\n« Al-Idrisi elaboró mapas geográficos de gran exactitud en el siglo XII. »',
				answer:
					'Mapas geográficos de gran exactitud fueron elaborados por Al-Idrisi en el siglo XII.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'#strong[7.] Transforma la frase al estilo indirecto :\nEl historiador afirmó : « Las ciudades de Córdoba y Tremecén dejaron un ejemplo admirable de rigor científico. »',
				answer:
					'El historiador afirmó que las ciudades de Córdoba y Tremecén habían dejado (o dejaron) un ejemplo admirable de rigor científico.',
				mark: '1'
			}
		]
	};

	const expr: ExerciseBlock = {
		id: 'es_2024_t2_expr',
		customTitle: 'III. Expresión escrita',
		points: 6,
		instruction: 'Elige UNO de los dos temas propuestos y redacta una composición de 120 a 150 palabras.',
		content: [
			buildSpanishWrittenProductionBlock({
				temaUnoTitle: 'Tema 1 (Guiado) :',
				temaUnoPrompt:
					'Para la revista cultural de tu instituto, redacta un artículo divulgativo (120–150 palabras) presentando la riqueza del patrimonio arquitectónico y científico compartido entre Córdoba, Granada y Tremecén, destacando a figuras como Al-Idrisi e Ibn Jaldún.',
				temaUnoNotas: [
					'Menciona al menos dos monumentos históricos y dos aportes científicos.',
					'Combina correctamente pretérito indefinido e imperfecto en la narración histórica.',
					'Concluye explicando por qué la juventud actual debe conocer y proteger este legado.'
				],
				temaDosPrompt:
					'« Conocer nuestra historia y proteger los monumentos antiguos nos ayuda a comprender el presente y a construir un futuro más sabio. » Escribe un texto argumentativo (120–150 palabras) defendiendo esta idea.',
				rubricSummary:
					'Fidelidad histórica y desarrollo pertinente del tema (2 pts) ; estructura clara en tres partes y cohesión (1.5 pt) ; empleo correcto de los pretéritos, imperfecto de subjuntivo y léxico cultural (1.5 pt) ; ortografía y presentación (1 pt).',
				modelAnswer:
					'Entre las ciudades de Córdoba, Granada y Tremecén existe un lazo histórico profundo que une la belleza arquitectónica con la excelencia científica. Quien visita hoy la Mezquita de Córdoba, la Alhambra granadina o la Gran Mezquita de Tremecén percibe cómo los arquitectos de aquella época aplicaron la geometría con maestría.\n\nAl mismo tiempo, las escuelas y bibliotecas de ambas orillas impulsaron avances decisivos. Sabios como Al-Idrisi trazaron mapas detallados del mundo conocido, mientras que Ibn Jaldún elaboró cerca de Tremecén un método riguroso para explicar la evolución de las sociedades. Aquellos maestros deseaban que las generaciones posteriores conservaran ese amor por el estudio veraz.\n\nPor ello, proteger este patrimonio no es un simple recuerdo del pasado, sino un estímulo vivo para que los jóvenes sigan cultivando la ciencia y la cultura.',
				mark: '6'
			})
		]
	};

	return buildOfficialSpanishBacPaper({
		slug: 'bac-2024-3as-le-spanish-t2',
		academicYear: '2024',
		topicNumber: 2,
		ambitoEs: 'Páginas Eternas y Patrimonio Andalusí-Magrebí',
		titleTopicEs: 'Legado científico y arquitectónico de Córdoba, Granada, Tremecén, Ibn Jaldún y Al-Idrisi',
		titleTopicAr: 'الإرث العلمي والمعماري في قرطبة وغرناطة وتلمسان وابن خلدون والإدريسي',
		themesEs: [
			'Patrimonio Andalusí-Magrebí',
			'Córdoba, Granada y Tremecén',
			'Ibn Jaldún y Al-Idrisi',
			'Pretéritos e imperfecto de subjuntivo'
		],
		themesAr: [
			'التراث الأندلسي المغاربي',
			'قرطبة وغرناطة وتلمسان',
			'ابن خلدون والإدريسي',
			'أزمنة الماضي والمنصوب الماضي'
		],
		exercises: [comp, ling, expr]
	});
}

// ============================================================================
// 5. BAC 2025 — Tema 1 (bac-2025-3as-le-spanish-t1)
// Ámbito Laboral, Emprendimiento y Solidaridad
// ============================================================================

function buildBac2025SpanishT1(): OfficialSpanishBacPaperSpec {
	const comp: ExerciseBlock = {
		id: 'es_2025_t1_comp',
		customTitle: 'I. Comprensión del texto',
		points: 7,
		instruction: 'Lee detenidamente el artículo sobre empleo juvenil y responde a las cuestiones.',
		content: [
			buildSpanishPassageBlock({
				title: 'Emprender con valores: el impulso solidario de la juventud hacia el empleo sostenible',
				paragraphs: [
					'En muchas regiones mediterráneas y del norte de África, miles de jóvenes titulados buscan cada año vías dignas para integrarse en la vida profesional. Frente a la espera pasiva de un puesto fijo, cada vez más graduados apuestan por la formación práctica, el emprendimiento responsable y la creación de pequeñas empresas orientadas a resolver necesidades reales de sus comunidades.',
					'El éxito de [[esta dinámica]] no depende únicamente de una buena idea inicial, sino de la capacitación técnica continua y de la cooperación solidaria. En los talleres de artesanía renovada, la agricultura biológica o los servicios informáticos, agruparse en cooperativas permite compartir equipos, reducir gastos y acompañarse mutuamente durante los primeros meses de actividad.',
					'Asimismo, los expertos en economía social subrayan que la verdadera prosperidad laboral se asienta sobre la probidad y el trabajo bien ejecutado. Quien cumple los plazos, cuida la calidad de su producto y trata con justicia a clientes y compañeros construye una reputación duradera. Al contrario de la búsqueda precipitada de beneficios fáciles, [[aquellos proyectos]] que unen honradez y respeto medioambiental resisten mejor las crisis.',
					'Por todo ello, resulta urgente que las universidades, los centros de formación profesional y las asociaciones locales orienten a los jóvenes con asesoramiento claro. Cuando la iniciativa juvenil recibe formación seria y apoyo solidario, el trabajo deja de ser una simple fuente de ingresos para transformarse en un motor de dignidad humana y desarrollo sostenible.'
				],
				source: 'Foro Mediterráneo de Formación, Trabajo y Solidaridad, Edición SujetStore',
				numberedParagraphs: true,
				glossary: [
					{
						term: 'emprendimiento',
						meaning: 'iniciativa de crear y gestionar un proyecto productivo o de servicios con responsabilidad'
					},
					{
						term: 'cooperativa',
						meaning: 'asociación autónoma de personas que trabajan unidas con reparto justo de esfuerzos'
					},
					{
						term: 'probidad',
						meaning: 'honradez íntegra, rectitud y cumplimiento fiel de los compromisos laborales'
					}
				]
			}),
			buildIllustratedFigureBlock('spa_06_mundo_laboral_emprendimiento', {
				lang: 'es',
				mode: 'labeled',
				pins: [],
				width: '62%',
				maxHeight: 128,
				caption: 'Documento visual: Formación profesional, emprendimiento juvenil y economía solidaria.'
			}),
			{
				type: 'text',
				content: '#strong[1.] Marca la opción que expresa fielmente la idea esencial del texto.'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: 'Según el autor, la inserción laboral duradera de los jóvenes se fortalece mediante :',
						options: [
							'la formación práctica, la cooperación solidaria, la honradez y el respeto ambiental',
							'la búsqueda exclusiva de ganancias rápidas sin capacitación previa',
							'el abandono definitivo de la formación profesional y las cooperativas'
						],
						correct:
							'la formación práctica, la cooperación solidaria, la honradez y el respeto ambiental',
						mark: '1'
					}
				]
			},
			{
				type: 'text',
				content:
					'#strong[2.] Señala si los enunciados son Verdaderos o Falsos y justifica cada respuesta con el texto.'
			},
			{
				type: 'true_false',
				items: [
					{
						q: 'a) Cada vez más jóvenes graduados prefieren iniciativas útiles para su entorno en lugar de esperar pasivamente.',
						a: 'Verdadero',
						c: 'Frente a la espera pasiva, cada vez más graduados apuestan por el emprendimiento responsable y empresas orientadas a necesidades reales (§1).',
						mark: '0.5'
					},
					{
						q: 'b) Las cooperativas juveniles impiden compartir herramientas y aumentan los gastos individuales.',
						a: 'Falso',
						c: 'Agruparse en cooperativas permite compartir equipos, reducir gastos y acompañarse mutuamente durante los primeros meses (§2).',
						mark: '0.5'
					},
					{
						q: 'c) La honradez profesional y la calidad del producto consolidan una reputación fiable a largo plazo.',
						a: 'Verdadero',
						c: 'Quien cumple los plazos, cuida la calidad y trata con justicia a clientes y compañeros construye una reputación duradera (§3).',
						mark: '0.5'
					},
					{
						q: 'd) Los centros de formación profesional no tienen ningún papel en la orientación de los emprendedores.',
						a: 'Falso',
						c: 'Resulta urgente que las universidades, los centros de formación profesional y las asociaciones orienten a los jóvenes con asesoramiento claro (§4).',
						mark: '0.5'
					}
				]
			},
			{
				type: 'text',
				content: '#strong[3.] Responde con claridad a las preguntas de comprensión.'
			},
			{
				type: 'text',
				content:
					'a) ¿Qué diferencia señala el párrafo 3 entre el emprendimiento ético y la búsqueda precipitada de lucro fácil?',
				answer:
					'a) Mientras que el beneficio fácil carece de solidez moral, los proyectos basados en la probidad, la calidad del trabajo y el respeto medioambiental ganan confianza y resisten mejor las crisis.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'b) ¿En qué sectores productivos destaca el texto la eficacia del trabajo cooperativo?',
				answer:
					'b) En la artesanía renovada, la agricultura biológica y los servicios informáticos.',
				mark: '1'
			},
			{
				type: 'text',
				content: '#strong[4.] ¿A qué se refieren las expresiones subrayadas en el texto ?'
			},
			{
				type: 'text',
				content: 'a) «esta dinámica» (§2) se refiere a : ............................',
				answer:
					'a) Se refiere a la apuesta juvenil por la formación práctica, el emprendimiento responsable y la creación de pequeñas empresas.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) «aquellos proyectos» (§3) se refiere a : ............................',
				answer: 'b) Se refiere a los proyectos que unen honradez y respeto medioambiental.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[5.] Completa la tabla resumen con datos del texto.'
			},
			{
				type: 'table',
				headers: ['Pilar laboral', 'Efecto concreto señalado en el texto'],
				cells: [],
				rows: [
					[
						{ content: 'Cooperativas solidarias', bold: true },
						{
							content: '....................',
							answer: 'Permiten compartir equipos, reducir gastos y acompañarse al inicio de la actividad.',
							mark: '0.5'
						}
					],
					[
						{ content: 'Ética y trabajo bien hecho', bold: true },
						{
							content: '....................',
							answer: 'Construyen reputación duradera y convierten el trabajo en motor de dignidad humana.',
							mark: '0.5'
						}
					]
				],
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			}
		]
	};

	const ling: ExerciseBlock = {
		id: 'es_2025_t1_ling',
		customTitle: 'II. Competencia lingüística',
		points: 7,
		instruction: 'Resuelve cuidadosamente las actividades de léxico y morfosintaxis.',
		content: [
			{
				type: 'text',
				content: '#strong[A. Léxico (3 puntos)]'
			},
			{
				type: 'text',
				content: '#strong[1.] Busca en el texto el antónimo de cada una de las siguientes palabras :'
			},
			{
				type: 'text',
				content: 'a) activa / emprendedora (§1) ≠ ............................',
				answer: 'a) pasiva',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) aumentar / incrementar (§2) ≠ ............................',
				answer: 'b) reducir',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[2.] Completa la tabla de formación de palabras.'
			},
			buildSpanishWordFamilyTableBlock([
				{
					verbo: { given: true, value: 'cooperar' },
					sustantivo: { value: 'cooperación / cooperativa', mark: '0.25' },
					adjetivo: { value: 'cooperativo', mark: '0.25' }
				},
				{
					verbo: { value: 'emprender', mark: '0.25' },
					sustantivo: { given: true, value: 'emprendimiento' },
					adjetivo: { value: 'emprendedor', mark: '0.25' }
				}
			]),
			{
				type: 'text',
				content:
					'#strong[3.] Clasifica los términos siguientes : #emph[probidad ; agricultura biológica ; honradez ; servicios informáticos ; cumplimiento de plazos ; artesanía renovada].'
			},
			buildSpanishClassificationTableBlock({
				columns: [
					{
						header: 'Cualidades del emprendedor ético',
						items: ['probidad', 'honradez', 'cumplimiento de plazos'],
						mark: '0.5'
					},
					{
						header: 'Sectores de empleo sostenible',
						items: ['agricultura biológica', 'servicios informáticos', 'artesanía renovada'],
						mark: '0.5'
					}
				]
			}),
			{
				type: 'text',
				content: '#strong[B. Morfosintaxis (4 puntos)]'
			},
			{
				type: 'text',
				content:
					'#strong[4.] Completa las oraciones utilizando las perífrasis verbales o el futuro simple :'
			},
			{
				type: 'text',
				content:
					'a) Los jóvenes aprendices #strong[(seguir + gerundio de perfeccionar)] sus destrezas técnicas cada trimestre.',
				answer:
					'a) Los jóvenes aprendices siguen perfeccionando sus destrezas técnicas cada trimestre.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) El próximo año, nuestra cooperativa #strong[(ofrecer)] soluciones ecológicas a las escuelas locales.',
				answer:
					'b) El próximo año, nuestra cooperativa ofrecerá soluciones ecológicas a las escuelas locales.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[5.] Conjuga los verbos entre paréntesis en presente de subjuntivo tras expresiones de deseo o necesidad :'
			},
			{
				type: 'text',
				content:
					'a) Es fundamental que las instituciones #strong[(apoyar)] los proyectos solidarios de la juventud.',
				answer:
					'a) Es fundamental que las instituciones apoyen los proyectos solidarios de la juventud.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Recomendamos que los recién graduados #strong[(capacitarse)] antes de abrir un taller propio.',
				answer:
					'b) Recomendamos que los recién graduados se capaciten antes de abrir un taller propio.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[6.] Completa con « por » o « para » según corresponda :'
			},
			{
				type: 'text',
				content:
					'a) Trabajaron con constancia ............ lograr la certificación de calidad de su empresa.',
				answer: 'a) para',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) El proyecto fue felicitado ............ la comisión local de desarrollo sostenible.',
				answer: 'b) por',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[7.] Pasa al estilo indirecto :\nLa directora del centro declaró : « Estos proyectos solidarios crearán empleos duraderos este año. »',
				answer:
					'La directora del centro declaró que aquellos proyectos solidarios crearían empleos duraderos aquel año.',
				mark: '1'
			}
		]
	};

	const expr: ExerciseBlock = {
		id: 'es_2025_t1_expr',
		customTitle: 'III. Expresión escrita',
		points: 6,
		instruction: 'Elige UNO de los dos temas propuestos y escribe un texto de 120 a 150 palabras.',
		content: [
			buildSpanishWrittenProductionBlock({
				temaUnoTitle: 'Tema 1 (Guiado) :',
				temaUnoPrompt:
					'Formas parte de una asociación juvenil de tu ciudad. Redacta una propuesta breve (120–150 palabras) dirigida al consejo municipal para crear un taller cooperativo de capacitación digital y reciclaje dirigido a jóvenes en busca de empleo.',
				temaUnoNotas: [
					'Presenta el objetivo del taller y dos actividades concretas.',
					'Explica cómo beneficia tanto al empleo juvenil como al cuidado ambiental.',
					'Usa al menos una perífrasis de obligación y un conector de finalidad.'
				],
				temaDosPrompt:
					'« El trabajo honesto y bien perfeccionado ennoblece a la persona y fortalece el progreso de toda la sociedad. » Redacta un ensayo argumentativo (120–150 palabras) desarrollando esta idea con ejemplos concretos.',
				rubricSummary:
					'Pertinencia de los argumentos y estructura (2 pts) ; cohesión y progresión lógica (1.5 pt) ; corrección gramatical en subjuntivo, preposiciones y léxico laboral (1.5 pt) ; ortografía y presentación (1 pt).',
				modelAnswer:
					'Integrar a los jóvenes en el mundo laboral exige combinar la iniciativa personal con la formación práctica y el sentido de la solidaridad. Por esta razón, nuestra asociación propone impulsar un taller cooperativo que una la capacitación informática con el reciclaje responsable de material escolar.\n\nEn este espacio, los participantes aprenderán gestión administrativa, diseño técnico y reparación de ordenadores para dotar a bibliotecas de barrio. Con el fin de que el proyecto perdure, debemos trabajar con probidad, puntualidad y exigencia de calidad en cada tarea asumida. Además, la fórmula cooperativa permitirá que los jóvenes compartan recursos y se apoyen mutuamente al iniciar su trayectoria profesional.\n\nEn conclusión, cuando la juventud une honradez, esfuerzo constante y cooperación útil, el empleo se convierte en fuente de dignidad y bienestar para toda la comunidad.',
				mark: '6'
			})
		]
	};

	return buildOfficialSpanishBacPaper({
		slug: 'bac-2025-3as-le-spanish-t1',
		academicYear: '2025',
		topicNumber: 1,
		ambitoEs: 'Ámbito Laboral, Emprendimiento y Solidaridad',
		titleTopicEs: 'Iniciativas juveniles, cooperación y empleo sostenible',
		titleTopicAr: 'المبادرات الشبانية والتعاون والتشغيل المستدام',
		themesEs: [
			'Ámbito Laboral',
			'Emprendimiento juvenil',
			'Cooperación y solidaridad',
			'Perífrasis, preposiciones y estilo indirecto'
		],
		themesAr: [
			'عالم الشغل',
			'ريادة الأعمال الشبانية',
			'التعاون والتضامن',
			'الأفعال المركبة وحروف الجر والأسلوب غير المباشر'
		],
		exercises: [comp, ling, expr]
	});
}

// ============================================================================
// 6. BAC 2025 — Tema 2 (bac-2025-3as-le-spanish-t2)
// Diálogo Cultural y Mundo Hispanohablante + Mapa mudo quiz (pins: [])
// ============================================================================

function buildBac2025SpanishT2(): OfficialSpanishBacPaperSpec {
	const comp: ExerciseBlock = {
		id: 'es_2025_t2_comp',
		customTitle: 'I. Comprensión del texto',
		points: 7,
		instruction:
			'Lee el texto sobre el mundo hispanohablante y el Mediterráneo, luego responde a las preguntas y completa el mapa mudo.',
		content: [
			buildSpanishPassageBlock({
				title: 'El español, puente de diálogo entre el Magreb, el Mediterráneo y el mundo hispano',
				paragraphs: [
					'Hablado por cientos de millones de personas a ambos lados del océano Atlántico, el español figura hoy entre las lenguas internacionales de mayor alcance académico, científico y comercial. Para los estudiantes de Argelia, situada en la encrucijada natural del norte de África y el Mediterráneo, dominar [[este puente lingüístico]] representa una oportunidad privilegiada para dialogar directamente con España y con las diversas naciones de Hispanoamérica, desde México hasta Argentina.',
					'La proximidad geográfica entre la península ibérica y la orilla meridional mediterránea ha favorecido durante siglos numerosos intercambios de palabras, técnicas agrícolas, recetas culinarias y conocimientos marítimos. Hoy, las universidades de [[ambas orillas]] impulsan programas de traducción, becas de investigación y congresos compartidos que fortalecen la comprensión mutua sin borrar las particularidades culturales de cada país.',
					'Sin embargo, el verdadero diálogo intercultural solo prospera cuando descansa en el respeto recíproco y la honestidad intelectual. Conocer la lengua del interlocutor no significa imitar ciegamente costumbres ajenas, sino acercarse a su historia y a su acervo científico con lucidez, aportando al mismo tiempo el valor de nuestra propia identidad argelina y árabe.',
					'Así, cuando un joven aprende a escuchar y a expresarse con corrección en español, amplía su visión del mundo y combate los prejuicios mediante el conocimiento directo. En un planeta cada vez más interconectado, las lenguas extranjeras sirven como caminos de paz, cooperación universitaria y entendimiento sereno entre los pueblos.'
				],
				source: 'Anuario de Estudios Hispánicos y Mediterráneos, Edición SujetStore',
				numberedParagraphs: true,
				glossary: [
					{
						term: 'encrucijada',
						meaning: 'punto de encuentro geográfico o cultural entre varias regiones'
					},
					{
						term: 'acervo',
						meaning: 'conjunto de bienes culturales, científicos y morales acumulados por una comunidad'
					},
					{
						term: 'prejuicios',
						meaning: 'opiniones previas y poco fundadas emitidas antes de conocer la realidad'
					}
				]
			}),
			{
				type: 'text',
				content: '#strong[1.] Selecciona la opción correcta para completar el enunciado.'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: 'La tesis principal que defiende el texto es que el estudio del español :',
						options: [
							'obliga a abandonar la identidad cultural propia para imitar otras sociedades',
							'impulsa la cooperación académica y el diálogo respetuoso entre Argelia, el Mediterráneo y el mundo hispano',
							'carece de interés fuera de la península ibérica'
						],
						correct:
							'impulsa la cooperación académica y el diálogo respetuoso entre Argelia, el Mediterráneo y el mundo hispano',
						mark: '1'
					}
				]
			},
			{
				type: 'text',
				content:
					'#strong[2.] Di si es Verdadero o Falso y justifica cada respuesta con el texto.'
			},
			{
				type: 'true_false',
				items: [
					{
						q: 'a) El idioma español se habla únicamente en España y carece de presencia en América.',
						a: 'Falso',
						c: 'Es hablado a ambos lados del océano Atlántico, tanto en España como en naciones de Hispanoamérica desde México hasta Argentina (§1).',
						mark: '0.5'
					},
					{
						q: 'b) Las universidades de ambas orillas del Mediterráneo fomentan programas de traducción e investigación conjunta.',
						a: 'Verdadero',
						c: 'Las universidades de ambas orillas impulsan programas de traducción, becas de investigación y congresos compartidos (§2).',
						mark: '0.5'
					},
					{
						q: 'c) Dialogar en otro idioma implica renunciar a los valores e identidad propios.',
						a: 'Falso',
						c: 'Conocer la lengua del interlocutor no significa imitar ciegamente costumbres ajenas, sino aportar también el valor de nuestra propia identidad argelina y árabe (§3).',
						mark: '0.5'
					},
					{
						q: 'd) El conocimiento directo de otras lenguas contribuye a superar los prejuicios.',
						a: 'Verdadero',
						c: 'Cuando un joven aprende a expresarse en español, amplía su visión del mundo y combate los prejuicios mediante el conocimiento directo (§4).',
						mark: '0.5'
					}
				]
			},
			{
				type: 'text',
				content: '#strong[3.] Contesta de forma redactada a las preguntas siguientes.'
			},
			{
				type: 'text',
				content:
					'a) ¿Qué ámbitos históricos y actuales de intercambio mediterráneo menciona el segundo párrafo?',
				answer:
					'a) Históricamente menciona palabras, técnicas agrícolas, recetas culinarias y conocimientos marítimos ; en la actualidad cita programas universitarios de traducción, becas de investigación y congresos compartidos.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'b) ¿Bajo qué condiciones resulta auténtico y fecundo el diálogo intercultural según el párrafo 3?',
				answer:
					'b) Cuando se basa en el respeto recíproco y la honestidad intelectual, evitando la imitación ciega y manteniendo con orgullo la identidad cultural propia.',
				mark: '1'
			},
			{
				type: 'text',
				content: '#strong[4.] ¿A qué remiten las expresiones subrayadas en el texto ?'
			},
			{
				type: 'text',
				content: 'a) «este puente lingüístico» (§1) remite a : ............................',
				answer: 'a) Remite al idioma español (la lengua española).',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) «ambas orillas» (§2) remite a : ............................',
				answer:
					'b) Remite a la península ibérica (orilla norte) y el norte de África / Argelia (orilla meridional del Mediterráneo).',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[5.] Observa el mapa mudo del mundo hispanohablante y el Mediterráneo e identifica los cinco espacios geográficos numerados del (1) al (5) :'
			},
			buildIllustratedFigureBlock('spa_01_mundo_hispanohablante_mapa_mudo', {
				lang: 'es',
				mode: 'quiz',
				pins: [],
				width: '66%',
				maxHeight: 142,
				markPerItem: '0.2'
			})
		]
	};

	const ling: ExerciseBlock = {
		id: 'es_2025_t2_ling',
		customTitle: 'II. Competencia lingüística',
		points: 7,
		instruction: 'Responde con precisión a los ejercicios de léxico y morfosintaxis.',
		content: [
			{
				type: 'text',
				content: '#strong[A. Léxico (3 puntos)]'
			},
			{
				type: 'text',
				content: '#strong[1.] Extrae del texto un sinónimo para cada palabra siguiente :'
			},
			{
				type: 'text',
				content: 'a) cercanía (§2) = ............................',
				answer: 'a) proximidad',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) mutuo / compartido (§3) = ............................',
				answer: 'b) recíproco',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[2.] Completa la tabla de familia de palabras.'
			},
			buildSpanishWordFamilyTableBlock([
				{
					verbo: { given: true, value: 'dialogar' },
					sustantivo: { value: 'diálogo', mark: '0.25' },
					adjetivo: { value: 'dialogante', mark: '0.25' }
				},
				{
					verbo: { value: 'traducir', mark: '0.25' },
					sustantivo: { given: true, value: 'traducción / traductor' },
					adjetivo: { value: 'traducible / traducido', mark: '0.25' }
				}
			]),
			{
				type: 'text',
				content:
					'#strong[3.] Clasifica las expresiones en el cuadro : #emph[Argelia ; respeto recíproco ; Hispanoamérica ; honestidad intelectual ; Mar Mediterráneo ; entendimiento sereno].'
			},
			buildSpanishClassificationTableBlock({
				columns: [
					{
						header: 'Espacios geográficos citados',
						items: ['Argelia', 'Hispanoamérica', 'Mar Mediterráneo'],
						mark: '0.5'
					},
					{
						header: 'Valores del intercambio cultural',
						items: ['respeto recíproco', 'honestidad intelectual', 'entendimiento sereno'],
						mark: '0.5'
					}
				]
			}),
			{
				type: 'text',
				content: '#strong[B. Morfosintaxis (4 puntos)]'
			},
			{
				type: 'text',
				content:
					'#strong[4.] Conjuga los verbos entre paréntesis en indicativo o subjuntivo en estas oraciones temporales con « cuando » :'
			},
			{
				type: 'text',
				content:
					'a) Cuando los estudiantes argelinos #strong[(viajar)] el próximo semestre a un congreso de traducción, presentarán sus trabajos.',
				answer:
					'a) Cuando los estudiantes argelinos viajen el próximo semestre a un congreso de traducción, presentarán sus trabajos.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Siempre que #strong[(leer)] textos científicos en otra lengua, ampliamos nuestros horizontes.',
				answer:
					'b) Siempre que leemos textos científicos en otra lengua, ampliamos nuestros horizontes.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[5.] Completa con la forma adecuada de « ser » o « estar » :'
			},
			{
				type: 'text',
				content: 'a) Argelia ............ situada en una encrucijada estratégica del Mediterráneo.',
				answer: 'a) está',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) El respeto mutuo ............ una condición esencial para el diálogo intercultural.',
				answer: 'b) es',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[6.] Transforma la oración utilizando « aunque + presente de subjuntivo » :\n« Existen diferencias geográficas entre continentes, pero el idioma acerca a las universidades. »',
				answer:
					'Aunque existan diferencias geográficas entre continentes, el idioma acerca a las universidades.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'#strong[7.] Pasa al estilo indirecto :\nLa profesora de español explicó a su clase : « El intercambio cultural enriquece la formación cuando conservamos nuestra identidad. »',
				answer:
					'La profesora de español explicó a su clase que el intercambio cultural enriquecía (o enriquece) la formación cuando conservaban (o conservamos) su (nuestra) identidad.',
				mark: '1'
			}
		]
	};

	const expr: ExerciseBlock = {
		id: 'es_2025_t2_expr',
		customTitle: 'III. Expresión escrita',
		points: 6,
		instruction: 'Elige UNO de los dos temas propuestos y redacta un texto de 120 a 150 palabras.',
		content: [
			buildSpanishWrittenProductionBlock({
				temaUnoTitle: 'Tema 1 (Guiado) :',
				temaUnoPrompt:
					'Tu instituto recibe a una delegación de estudiantes y profesores hispanohablantes en un encuentro académico sobre traducción y ciencias mediterráneas. Redacta un breve discurso de bienvenida (120–150 palabras) destacando el valor del idioma español como puente de amistad y cooperación.',
				temaUnoNotas: [
					'Saluda cordialmente a los invitados y presenta brevemente el interés del español en Argelia.',
					'Menciona dos ámbitos de cooperación deseables (traducción, intercambios universitarios o historia compartida).',
					'Utiliza una oración temporal con cuando + subjuntivo y distingue bien ser y estar.'
				],
				temaDosPrompt:
					'« Aprender una lengua extranjera nos ayuda a comprender otras culturas sin debilitar el aprecio por la nuestra. » Explica y argumenta esta idea en una redacción de 120 a 150 palabras.',
				rubricSummary:
					'Adecuación comunicativa y tono respetuoso (2 pts) ; organización en introducción, desarrollo y cierre con conectores (1.5 pt) ; uso correcto de ser/estar, subjuntivo temporal y léxico intercultural (1.5 pt) ; ortografía y presentación (1 pt).',
				modelAnswer:
					'Estimados profesores y estudiantes invitados :\n\nEs un gran honor darles la bienvenida a nuestro instituto en Argelia, tierra situada en el corazón del Mediterráneo. Para nuestra sección de Lenguas Extranjeras, el estudio del español representa un puente fecundo entre el norte de África, la península ibérica y las naciones hispanoamericanas.\n\nCuando compartamos estos días de diálogo académico, descubriremos cuánto nos unen la historia de la ciencia, el arte de la traducción y el interés por la investigación universitaria. Aprender el idioma del otro nos permite escuchar con respeto, eliminar prejuicios y colaborar en proyectos útiles, manteniendo siempre con orgullo nuestras raíces culturales y valores propios.\n\nEsperamos que su estancia entre nosotros sea fructífera y que este encuentro impulse nuevos lazos duraderos de amistad y saber.',
				mark: '6'
			})
		]
	};

	return buildOfficialSpanishBacPaper({
		slug: 'bac-2025-3as-le-spanish-t2',
		academicYear: '2025',
		topicNumber: 2,
		ambitoEs: 'Diálogo Cultural y Mundo Hispanohablante',
		titleTopicEs: 'Intercambio lingüístico en el Mediterráneo y el mundo hispanohablante',
		titleTopicAr: 'التبادل اللغوي في حوض المتوسط والعالم الناطق بالإسبانية',
		themesEs: [
			'Diálogo Cultural',
			'Mundo Hispanohablante',
			'Mediterráneo y Argelia',
			'Mapa mudo, temporales y ser/estar'
		],
		themesAr: [
			'الحوار الثقافي',
			'العالم الناطق بالإسبانية',
			'المتوسط والجزائر',
			'الخريطة الصماء وجمل الزمان'
		],
		exercises: [comp, ling, expr]
	});
}

export const OFFICIAL_BAC_SPANISH_PAPERS: OfficialSpanishBacPaperSpec[] = [
	buildBac2023SpanishT1(),
	buildBac2023SpanishT2(),
	buildBac2024SpanishT1(),
	buildBac2024SpanishT2(),
	buildBac2025SpanishT1(),
	buildBac2025SpanishT2()
];
