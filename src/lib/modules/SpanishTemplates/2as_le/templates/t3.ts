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
	svgSpanishGrammarMap,
	svgSpanishTenseTimeline
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

export const TEMPLATES_2AS_LE_T3: SpanishParameterizedTemplate[] = [
	// 1. Comprensión (7 pts) — true_false quiz
	{
		id: 'spa_tpl_2as_le_t3_comp_ecologia_solidaridad',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'comprension_lectora',
		titleAr: 'I. Comprensión del texto : Solidaridad ciudadana, ecología y energías limpias (7 pts)',
		curriculumLessonId: 'spa_lesson_2as_le_t3_solidaridad_medio_ambiente',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					passageTitle: 'La Barrera Verde y las energías limpias: defensa del futuro común',
					paragraphs: [
						'Frente al avance de la sequía y la erosión del suelo, Argelia emprendió hace décadas un ambicioso proyecto de reforestación conocido como la Barrera Verde. Su objetivo principal consiste en frenar la desertificación mediante millones de árboles resistentes que protegen las tierras agrícolas y conservan la humedad natural.',
						'En los últimos años, [[este esfuerzo ecológico]] se ha visto reforzado por parques de energía solar fotovoltaica en el sur del país y turbinas eólicas en las zonas ventosas. Si aprovechamos estas fuentes renovables con tecnología local, reduciremos las emisiones contaminantes y aseguraremos electricidad limpia para las escuelas y los hogares.',
						'Sin embargo, los grandes proyectos estatales necesitan la colaboración diaria de cada ciudadano. Por lo tanto, es fundamental que los jóvenes ahorren el agua, eviten arrojar plásticos en los bosques y participen en campañas escolares de plantación para construir [[un entorno sano y solidario]].'
					],
					source: 'Cuaderno de Ecología Mediterránea y Magrebí (texto adaptado)',
					glossary: [
						{ term: 'reforestación', meaning: 'plantación ordenada de árboles en terrenos amenazados o despoblados' },
						{ term: 'erosión', meaning: 'desgaste progresivo de la capa fértil del suelo por el viento o el agua' }
					],
					q1: '1. ¿Qué problema ambiental combate la Barrera Verde en Argelia y con qué dos tipos de energías limpias se complementa este esfuerzo?',
					a1: 'Combate el avance de la sequía, la erosión del suelo y la desertificación mediante millones de árboles. Se complementa con la energía solar fotovoltaica (en el sur) y la energía eólica (en zonas ventosas).',
					tfItems: [
						{
							q: 'La Barrera Verde protege las tierras agrícolas y conserva la humedad del suelo.',
							a: 'Verdadero',
							c: 'Frena la desertificación mediante millones de árboles resistentes que protegen los suelos.',
							mark: '0.5'
						},
						{
							q: 'Las energías solar y eólica aumentan las emisiones contaminantes en las ciudades.',
							a: 'Falso',
							c: 'Al aprovechar fuentes renovables, reducen las emisiones contaminantes y aportan electricidad limpia.',
							mark: '0.5'
						},
						{
							q: 'El ciudadano común no tiene ninguna responsabilidad en la conservación del medio ambiente.',
							a: 'Falso',
							c: 'El §3 afirma que los proyectos necesitan la colaboración diaria de cada ciudadano (ahorro de agua y limpieza).',
							mark: '0.5'
						}
					],
					q3: '3. Busca en el texto :\n  a) Un sinónimo de «detener o contener» (§1) y un antónimo de «derrochen» (§3).\n  b) Cuatro sustantivos pertenecientes al campo léxico del medio ambiente.',
					a3: 'a) Sinónimo de detener: «frenar»; Antónimo de derrochen: «ahorren». | b) Campo léxico: sequía, erosión, reforestación, desertificación, árboles, energía solar, agua, bosques.',
					q4: '4. ¿A qué remiten «este esfuerzo ecológico» (§2) y «un entorno sano y solidario» (§3)? Identifica la oración condicional real del §2.',
					a4: '«este esfuerzo ecológico» remite al proyecto de reforestación de la Barrera Verde. «un entorno sano y solidario» remite al medio ambiente protegido mediante la acción cívica. Condicional real (Tipo 1): «Si aprovechamos estas fuentes renovables..., reduciremos las emisiones...».',
					quizStatement:
						'El texto sostiene que el éxito ecológico depende únicamente de las grandes instalaciones estatales sin necesidad de hábitos responsables en los ciudadanos.',
					quizCorrect: false,
					quizExplanation:
						'العبارة خاطئة: تؤكد الفقرة الثالثة أن المشاريع الكبرى تحتاج إلى تعاون المواطن اليومي في ترشيد الماء والنظافة والتشجير.'
				},
				{
					passageTitle: 'Jóvenes voluntarios por un barrio limpio y solidario',
					paragraphs: [
						'El sábado por la mañana, un grupo de alumnos de segundo año de Lenguas Extranjeras organizó una jornada cívica en su barrio junto con padres y vecinos mayores. Provistos de guantes y herramientas ligeras, limpiaron el parque infantil, repararon los bancos de madera y plantaron veinte olivos jóvenes.',
						'Además, los estudiantes colocaron carteles bilingües para recordar la importancia de separar el papel y el vidrio, ya que el reciclaje disminuye el volumen de residuos urbanos. Aunque la tarea exigió varias horas bajo el sol, [[aquella colaboración generosa]] fortaleció la convivencia entre todas las generaciones del vecindario.',
						'Al terminar la actividad, una vecina anciana agradeció el gesto y dijo que si todos los barrios cuidaran así sus espacios comunes, las ciudades serían lugares más amables. [[Los jóvenes participantes]] regresaron cansados pero satisfechos de haber servido al bien común.'
					],
					source: 'Crónica de Civismo Escolar (texto adaptado)',
					glossary: [
						{ term: 'bien común', meaning: 'beneficio compartido que favorece a toda la sociedad sin exclusión' },
						{ term: 'convivencia', meaning: 'vida compartida en armonía y respeto mutuo entre vecinos' }
					],
					q1: '1. ¿Qué tres acciones concretas realizaron los alumnos y vecinos el sábado por la mañana y qué propósito tenían los carteles bilingües?',
					a1: 'Limpiaron el parque infantil, repararon los bancos de madera y plantaron veinte olivos jóvenes. Los carteles recordaban la importancia de separar el papel y el vidrio para favorecer el reciclaje.',
					tfItems: [
						{
							q: 'Solo participaron niños pequeños sin ayuda de vecinos adultos.',
							a: 'Falso',
							c: 'Participaron alumnos de 2AS LE junto con padres y vecinos mayores.',
							mark: '0.5'
						},
						{
							q: 'El reciclaje ayuda a reducir la cantidad de residuos en las ciudades.',
							a: 'Verdadero',
							c: 'El §2 indica que el reciclaje disminuye el volumen de residuos urbanos.',
							mark: '0.5'
						},
						{
							q: 'La jornada debilitó las relaciones entre jóvenes y personas mayores.',
							a: 'Falso',
							c: 'Fortaleció la convivencia entre todas las generaciones del vecindario.',
							mark: '0.5'
						}
					],
					q3: '3. Encuentra en el texto :\n  a) El sinónimo de «reduce» (§2) y el antónimo de «egoísta» (§2).\n  b) Tres expresiones que reflejan solidaridad y convivencia ciudadana.',
					a3: 'a) Sinónimo: «disminuye»; Antónimo de egoísta: «generosa». | b) Expresiones: jornada cívica, colaboración generosa, convivencia, bien común.',
					q4: '4. ¿A qué remiten «aquella colaboración generosa» (§2) y «Los jóvenes participantes» (§3)? ¿Qué tipo de oración condicional pronuncia la vecina en el §3?',
					a4: '«aquella colaboración generosa» remite a la jornada de limpieza, reparación y plantación en el parque. «Los jóvenes participantes» remite a los alumnos de 2AS LE. La vecina usa una condicional del Tipo 2 (hipotética/posible): «si todos los barrios cuidaran..., las ciudades serían...».',
					quizStatement:
						'Según la crónica, la actividad voluntaria en el barrio unió el cuidado del medio ambiente con el respeto y la convivencia entre generaciones.',
					quizCorrect: true,
					quizExplanation:
						'العبارة صحيحة: النشاط التطوعي جمع بين التشجير وإعادة التدوير وبين توطيد التعايش والاحترام بين الشباب وكبار السن.'
				},
				{
					passageTitle: 'El agua: un tesoro vital que debemos preservar entre todos',
					paragraphs: [
						'En las regiones mediterráneas y semiáridas, el agua dulce constituye un recurso tan valioso como limitado. A causa del crecimiento urbano y de los períodos de sequía irregular, muchas fuentes naturales sufren una presión creciente que exige un cambio urgente en nuestros hábitos cotidianos.',
						'En la agricultura moderna, el riego por goteo permite ahorrar hasta la mitad del consumo habitual, ya que lleva el agua directamente a la raíz de cada planta sin evaporación inútil. Asimismo, en el hogar debemos cerrar el grifo al lavarnos y reparar de inmediato cualquier fuga, para que no se pierda ni una gota.',
						'Si cada familia educa a los niños en [[este respeto al agua]], protegeremos las reservas subterráneas para el futuro. Al fin y al cabo, cuidar [[este elemento esencial]] es una muestra concreta de responsabilidad moral y solidaridad con quienes vendrán después.'
					],
					source: 'Guía Educativa del Agua y Desarrollo Sostenible (texto adaptado)',
					glossary: [
						{ term: 'riego por goteo', meaning: 'técnica agrícola eficiente que suministra agua gota a gota a la raíz' },
						{ term: 'fuga', meaning: 'escape involuntario de agua por una tubería o grifo mal cerrado' }
					],
					q1: '1. ¿Por qué sufre presión el agua dulce en las regiones mediterráneas y qué soluciones concretas propone el texto en la agricultura y en el hogar?',
					a1: 'Por el crecimiento urbano y la sequía irregular. Soluciones: en agricultura, el riego por goteo (ahorra hasta la mitad); en el hogar, cerrar el grifo al lavarse y reparar cualquier fuga de inmediato.',
					tfItems: [
						{
							q: 'El riego por goteo desperdicia más agua por evaporación que otros métodos.',
							a: 'Falso',
							c: 'Permite ahorrar hasta la mitad del consumo porque lleva el agua directamente a la raíz sin evaporación inútil.',
							mark: '0.5'
						},
						{
							q: 'Reparar rápidamente las fugas en casa contribuye a preservar las reservas hídricas.',
							a: 'Verdadero',
							c: 'Evita que se pierda ni una gota y protege las reservas para el futuro.',
							mark: '0.5'
						},
						{
							q: 'El texto considera que educar a los niños en el ahorro del agua es innecesario.',
							a: 'Falso',
							c: 'Si cada familia educa a los niños en este respeto, protegeremos las reservas subterráneas.',
							mark: '0.5'
						}
					],
					q3: '3. Busca en el texto :\n  a) El sinónimo de «conservar / cuidar» (título o §3) y el antónimo de «abundante / ilimitado» (§1).\n  b) Identifica un conector de causa (§2) y un conector de finalidad (§2).',
					a3: 'a) Sinónimo: «preservar» o «proteger»; Antónimo: «limitado». | b) Causa: «ya que»; Finalidad: «para que».',
					q4: '4. ¿A qué remiten «este respeto al agua» (§3) y «este elemento esencial» (§3)? ¿Por qué «se pierda» está en Subjuntivo tras «para que»?',
					a4: '«este respeto al agua» remite al conjunto de hábitos de ahorro y cuidado descritos en el §2; «este elemento esencial» remite al agua dulce. «se pierda» está en Presente de Subjuntivo porque el nexo de finalidad «para que» siempre rige Subjuntivo al expresar un propósito.',
					quizStatement:
						'El texto indica que el riego por goteo ayuda a ahorrar hasta la mitad del consumo de agua al dirigirla directamente hacia la raíz.',
					quizCorrect: true,
					quizExplanation:
						'العبارة صحيحة: تؤكد الفقرة الثانية أن الري بالتنقيط يوفر حتى نصف الاستهلاك لإيصاله الماء مباشرة إلى الجذور.'
				}
			];

			const v = rng.pick(variants);
			const content: ContentBlock[] = [
				buildIllustratedFigureBlock('spa_04_medio_ambiente_energias_limpias', {
					lang: 'es',
					mode: 'labeled',
					pins: [],
					width: '62%',
					maxHeight: 118,
					caption: 'Energías limpias, reforestación y protección del agua'
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
					content: '2. Di si es Verdadero o Falso y justifica con el texto :',
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
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'true_false',
					questionText: v.quizStatement,
					questionTextAr: 'حدّد صحة أو خطأ الفكرة الآتية حسب النص:',
					questionData: {
						correctAnswer: v.quizCorrect
					},
					explanation: v.quizExplanation
				},
				sujetExercise: {
					customTitle: 'I. Comprensión del texto',
					points: 7,
					instruction: 'Observa la lámina, lee atentamente el texto y responde a las preguntas :',
					content
				},
				hints: [
					'استثمر اللوحة البيئية (الطاقة الشمسية، الريحية، التشجير، ترشيد الماء) لفهم المعجم السياقي للنص.',
					'انتبه للروابط المنطقية (ya que, aunque, por lo tanto, para que) ولجمل الشرط في النص.',
					'اذكر التبرير النصي الدقيق في كل سؤال صواب أو خطأ.'
				],
				solutionStepsAr: [
					'الإجابة عن سؤال الفهم المركزي والحلول البيئية (2.0 نقطة).',
					'الحكم على العبارات الثلاث بالصواب أو الخطأ مع التعليل (1.5 نقطة).',
					'استخراج المترادفات والأضداد والحقل المعجمي أو الروابط (2.0 نقطة).',
					'تحديد العائد النحوي وتحليل الجملة الشرطية أو المنصوب (1.5 نقطة).'
				],
				finalAnswer: v.quizCorrect ? 'Verdadero' : 'Falso'
			};
		}
	},

	// 2. Comprensión (7 pts) — mcq quiz
	{
		id: 'spa_tpl_2as_le_t3_comp_patrimonio_andalusi',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'cultura_civilizacion',
		titleAr: 'I. Comprensión del texto : Patrimonio andalusí y magrebí compartido (7 pts)',
		curriculumLessonId: 'spa_lesson_2as_le_t3_patrimonio_andalusi_magrebi',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					passageTitle: 'De Córdoba a Tremecén: un diálogo en piedra y armonía',
					paragraphs: [
						'Quien contempla los arcos bicolores de la Mezquita de Córdoba y luego visita la Gran Mezquita de Tremecén en Argelia percibe de inmediato una estrecha hermandad artística. En ambas orillas del Mediterráneo, los arquitectos andalusíes y magrebíes unieron el ingenio geométrico con el respeto a la luz natural y al equilibrio estructural.',
						'En Córdoba y en Granada, la madera tallada, los azulejos simétricos y la caligrafía árabe transformaron patios serenos en espacios de contemplación y estudio. Del mismo modo, en Tremecén y en la Casbah de Argel, [[estos oficios artesanales]] perduraron gracias a maestros alarifes que transmitieron sus técnicas de generación en generación.',
						'Hoy en día, preservar [[este patrimonio arquitectónico compartido]] exige el cuidado conjunto de las instituciones y de la juventud. Si conocemos y respetamos nuestros monumentos, conservaremos viva la memoria de un tiempo fecundo de saber y belleza.'
					],
					source: 'Cuadernos de Arquitectura Mediterránea (texto adaptado)',
					glossary: [
						{ term: 'alarife', meaning: 'maestro arquitecto o constructor experto en obras tradicionales' },
						{ term: 'fecundo', meaning: 'muy productivo, rico en resultados culturales y científicos' }
					],
					q1: '1. ¿Qué parentesco artístico destaca el texto entre Córdoba, Granada y Tremecén, y quiénes transmitieron dichas técnicas?',
					a1: 'Destaca una estrecha hermandad artística basada en el ingenio geométrico, los arcos, la luz natural, la madera tallada, los azulejos y la caligrafía árabe. Transmitieron estas técnicas los maestros alarifes de generación en generación.',
					mcGroups: [
						{
							header: 'a) ¿Qué elementos decorativos caracterizan los patios mencionados en el §2?',
							options: [
								'Muros de hormigón gris sin ninguna geometría',
								'Madera tallada, azulejos simétricos y caligrafía árabe',
								'Anuncios luminosos modernos y pantallas gigantes'
							],
							correct: 'Madera tallada, azulejos simétricos y caligrafía árabe',
							mark: '1.0'
						},
						{
							header: 'b) Según el §3, ¿qué debemos hacer para conservar viva la memoria histórica?',
							options: [
								'Conocer y respetar juntos nuestros monumentos históricos',
								'Cerrar las mezquitas y palacios antiguos a los estudiantes',
								'Sustituir los edificios históricos por centros comerciales'
							],
							correct: 'Conocer y respetar juntos nuestros monumentos históricos',
							mark: '1.0'
						}
					],
					q3: '3. Busca en el texto :\n  a) El sinónimo de «conservar o proteger» (§3) y el antónimo de «olvidaron o desaparecieron» (§2).\n  b) Tres palabras pertenecientes al campo léxico de la arquitectura.',
					a3: 'a) Sinónimo: «preservar»; Antónimo: «perduraron». | b) Arquitectura: arcos, arquitectos, madera tallada, azulejos, patios, alarifes, monumentos.',
					q4: '4. ¿A qué remiten «estos oficios artesanales» (§2) y «este patrimonio arquitectónico compartido» (§3)?',
					a4: '«estos oficios artesanales» remite al trabajo de madera tallada, azulejos simétricos y caligrafía árabe. «este patrimonio arquitectónico compartido» remite a los monumentos históricos andalusíes y magrebíes (Córdoba, Granada, Tremecén, Casbah de Argel).',
					mcqQuestion: '¿Qué relación temporal y condicional expresa la última frase del texto («Si conocemos y respetamos nuestros monumentos, conservaremos viva la memoria...»)?',
					mcqQuestionAr: 'ما نوع الجملة الشرطية في الجملة الأخيرة من النص؟',
					mcqCorrect: 'Oración condicional real (Tipo 1): Si + Presente de Indicativo con Futuro simple',
					mcqDistractors: [
						{
							text: 'Oración condicional hipotética (Tipo 2) con Imperfecto de Subjuntivo',
							diagnosticFeedback: 'خطأ: الفعل «conocemos» في الحاضر الإخباري لا Imperfecto de Subjuntivo.'
						},
						{
							text: 'Oración de finalidad introducida por «para que»',
							diagnosticFeedback: 'خطأ: تبدأ الجملة بأداة الشرط «Si».'
						},
						{
							text: 'Narración en Pretérito Indefinido sobre el siglo X',
							diagnosticFeedback: 'خطأ: الأفعال في الحاضر والمستقبل للدلالة على شرط واقعي.'
						}
					],
					mcqExplanation: 'الجملة «Si conocemos..., conservaremos...» تمثل الشرط الواقعي (Tipo 1: Si + Presente → Futuro).'
				},
				{
					passageTitle: 'La Alhambra de Granada y el Valle del M’Zab: sabiduría con el agua',
					paragraphs: [
						'Tanto en los palacios de la Alhambra de Granada como en los cinco ksours del Valle del M’Zab en Ghardaïa, el agua nunca fue un simple adorno, sino un bien precioso administrado con sabiduría técnica. En Granada, un sistema ingenioso de acequias conducía el agua desde la montaña hasta los jardines y fuentes sin desperdiciar una sola gota.',
						'De manera parecida, en el sur argelino, los habitantes de Ghardaïa diseñaron presas subterráneas y canales tradicionales para captar las lluvias escasas y repartir [[el riego]] de forma justa entre todos los palmerales. Sus viviendas encaladas, orientadas según el viento y el sol, constituyen un modelo admirado de urbanismo bioclimático.',
						'Si las ciudades actuales estudiaran mejor [[estas soluciones tradicionales]], ahorrarían energía eléctrica y combatirían el calor extremo con medios naturales. Por eso, ambos lugares han sido reconocidos como patrimonio universal de gran valor humano.'
					],
					source: 'Estudios de Ingeniería Hidráulica y Urbanismo Tradicional (texto adaptado)',
					glossary: [
						{ term: 'encalada', meaning: 'pintada de blanco con cal para reflejar el calor solar' },
						{ term: 'bioclimático', meaning: 'diseñado para aprovechar el clima y reducir el consumo energético' }
					],
					q1: '1. ¿Qué rasgo común une a la Alhambra de Granada y al Valle del M’Zab de Ghardaïa respecto al uso del agua?',
					a1: 'En ambos lugares el agua se consideró un bien precioso y se administró con ingeniería eficiente y justa: en Granada mediante acequias desde la montaña sin derroche, y en Ghardaïa mediante presas subterráneas y canales para repartir el agua entre los palmerales.',
					mcGroups: [
						{
							header: 'a) ¿Para qué sirven las viviendas encaladas y bien orientadas de Ghardaïa?',
							options: [
								'Para reflejar el calor y lograr un urbanismo bioclimático adaptado al desierto',
								'Para consumir la mayor cantidad posible de electricidad',
								'Para impedir la entrada de luz en las escuelas'
							],
							correct: 'Para reflejar el calor y lograr un urbanismo bioclimático adaptado al desierto',
							mark: '1.0'
						},
						{
							header: 'b) ¿Qué tiempo y modo verbal aparecen en «Si las ciudades estudiaran..., ahorrarían...»?',
							options: [
								'Tipo 2: Imperfecto de Subjuntivo + Condicional simple',
								'Tipo 1: Presente de Indicativo + Futuro simple',
								'Pretérito Perfecto + Imperativo'
							],
							correct: 'Tipo 2: Imperfecto de Subjuntivo + Condicional simple',
							mark: '1.0'
						}
					],
					q3: '3. Encuentra en el texto :\n  a) El sinónimo de «poco abundantes» (§2) y el antónimo de «derrochar» (§1).\n  b) Tres palabras relacionadas con la gestión del agua.',
					a3: 'a) Sinónimo: «escasas»; Antónimo de derrochar: «ahorrar» (o no desperdiciar). | b) Agua: acequias, fuentes, presas, canales, riego, lluvias.',
					q4: '4. ¿A qué remiten «el riego» (§2) y «estas soluciones tradicionales» (§3)?',
					a4: '«el riego» remite al agua captada de las lluvias para los palmerales de Ghardaïa. «estas soluciones tradicionales» remite a la gestión hidráulica de acequias y presas y al urbanismo bioclimático encalado.',
					mcqQuestion: '¿Qué expresa el condicional del §3 («Si las ciudades actuales estudiaran mejor estas soluciones, ahorrarían energía»)?',
					mcqQuestionAr: 'ما الدلالة الشرطية للجملة «Si las ciudades actuales estudiaran..., ahorrarían...»؟',
					mcqCorrect: 'Una hipótesis posible o recomendación reflexiva (Condicional Tipo 2)',
					mcqDistractors: [
						{
							text: 'Un hecho histórico terminado en el siglo XII',
							diagnosticFeedback: 'خطأ: هذا ليس سرداً لواقعة ماضية بل فرضية حالية/مستقبلية.'
						},
						{
							text: 'Una orden directa a los agricultores',
							diagnosticFeedback: 'خطأ: لا يوجد فعل أمر.'
						},
						{
							text: 'Una acción realizada hoy mismo por la mañana',
							diagnosticFeedback: 'خطأ: تلك دلالة Pretérito Perfecto.'
						}
					],
					mcqExplanation: 'صيغة «Si + Imperfecto de Subjuntivo (estudiaran) → Condicional (ahorrarían)» تعبر عن الشرط الافتراضي الممكن (Tipo 2).'
				},
				{
					passageTitle: 'Al-Idrisi y Al-Zahrawi: ciencia y rigor entre Al-Ándalus y el Magreb',
					paragraphs: [
						'La civilización islámica occidental brilló también por sus grandes científicos, cuyas obras iluminaron todo el Mediterráneo. En Córdoba, hacia el año mil, el médico Al-Zahrawi compuso un tratado enciclopédico donde describió con dibujos precisos más de doscientos instrumentos quirúrgicos e insistió en la higiene clínica para evitar infecciones.',
						'Un siglo más tarde, el geógrafo Al-Idrisi recorrió las rutas comerciales entre Al-Ándalus, el norte de África y Sicilia para dibujar mapas detallados donde figuraban ciudades portuarias como Argel, Orán y Bugía. En lugar de repetir mitos antiguos, [[este sabio]] interrogó a viajeros reales para comprobar cada distancia.',
						'Por su parte, Ibn Jaldún redactó posteriormente en tierras argelinas su célebre introducción a la historia humana. Conviene que los jóvenes de hoy conozcan [[a estos maestros de la observación]], ya que su método riguroso sigue siendo un modelo intelectual admirable.'
					],
					source: 'Historia de las Ciencias en el Mediterráneo Occidental (texto adaptado)',
					glossary: [
						{ term: 'quirúrgico', meaning: 'relativo a las operaciones médicas y a sus instrumentos de precisión' },
						{ term: 'mito', meaning: 'relato imaginario sin comprobación científica ni histórica' }
					],
					q1: '1. ¿Qué aporte científico distinguió a Al-Zahrawi en Córdoba y qué método empleó Al-Idrisi para elaborar sus mapas?',
					a1: 'Al-Zahrawi compuso un tratado médico donde describió e ilustró más de doscientos instrumentos quirúrgicos e insistió en la higiene clínica. Al-Idrisi interrogó a viajeros reales para comprobar las distancias en vez de repetir mitos antiguos.',
					mcGroups: [
						{
							header: 'a) ¿Qué puertos argelinos aparecen mencionados en los mapas de Al-Idrisi según el §2?',
							options: [
								'Argel, Orán y Bugía',
								'Madrid, Toledo y Córdoba',
								'Ghardaïa, Tamanrasset y Adrar'
							],
							correct: 'Argel, Orán y Bugía',
							mark: '1.0'
						},
						{
							header: 'b) ¿Qué relación lógica introduce la locución «ya que» en la última frase?',
							options: [
								'Causa / explicación',
								'Oposición / contraste',
								'Condición imposible'
							],
							correct: 'Causa / explicación',
							mark: '1.0'
						}
					],
					q3: '3. Busca en el texto :\n  a) El sinónimo de «verificar / confirmar» (§2) y el antónimo de «modernos» (§2).\n  b) Tres palabras de la familia o campo léxico de la ciencia y la investigación.',
					a3: 'a) Sinónimo: «comprobar»; Antónimo de modernos: «antiguos». | b) Ciencia: médicos, tratado, instrumentos quirúrgicos, geógrafo, mapas, sabio, método riguroso.',
					q4: '4. ¿A qué remiten «este sabio» (§2) y «a estos maestros de la observación» (§3)?',
					a4: '«este sabio» remite al geógrafo Al-Idrisi. «a estos maestros de la observación» remite a Al-Zahrawi, Al-Idrisi e Ibn Jaldún.',
					mcqQuestion: '¿Por qué razón escribió el autor «Conviene que los jóvenes de hoy conozcan» con «conozcan» en Presente de Subjuntivo?',
					mcqQuestionAr: 'لماذا صُرّف الفعل «conozcan» في زمن Presente de Subjuntivo؟',
					mcqCorrect: 'Porque la expresión impersonal de conveniencia «Conviene que» exige Subjuntivo',
					mcqDistractors: [
						{
							text: 'Porque «ya que» al final de la frase impone Subjuntivo',
							diagnosticFeedback: 'خطأ: «ya que» للسبب وتأخذ Indicativo دائماً.'
						},
						{
							text: 'Porque es un verbo en Pretérito Indefinido del siglo XI',
							diagnosticFeedback: 'خطأ: السياق في الحاضر بعد Conviene que.'
						},
						{
							text: 'Porque los dos verbos tienen el mismo sujeto gramatical',
							diagnosticFeedback: 'خطأ: «Conviene» غير شخصية والفعل الثاني فاعله «los jóvenes».'
						}
					],
					mcqExplanation: 'العبارة غير الشخصية «Conviene que» تفرض Presente de Subjuntivo (conozcan).'
				}
			];

			const v = rng.pick(variants);
			const mcq = buildUniqueMcqOptions(v.mcqCorrect, v.mcqDistractors, rng);

			const content: ContentBlock[] = [
				buildIllustratedFigureBlock('spa_02_patrimonio_andalusi_arquitectura', {
					lang: 'es',
					mode: 'labeled',
					pins: [],
					width: '62%',
					maxHeight: 118,
					caption: 'Esplendor arquitectónico compartido entre Al-Ándalus y el Magreb'
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
					content: '2. Escoge la respuesta adecuada según el texto :',
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
				trimesterId: 't3',
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
					instruction: 'Observa la imagen cultural, lee el texto con atención y contesta :',
					content
				},
				hints: [
					'اربط أسماء المدن والمعالم (قرطبة، غرناطة، تلمسان، غرداية) بخصائصها المعمارية والعلمية.',
					'ميّز في النص بين الجملة الشرطية الواقعية (Si + Presente) والجملة الافتراضية (Si + Imp. Subj.).',
					'تأكد من العائد الدقيق للضمائر والبدائل المعجمية المسطرة في النص.'
				],
				solutionStepsAr: [
					'استخلاص أوجه التشابه أو الإسهام العلمي من النص (2.0 نقطة).',
					'اختيار الإجابات السليمة في الاختيار من متعدد (2.0 نقطة).',
					'استخراج المترادفات والأضداد والحقول أو الروابط (1.5 نقطة).',
					'تعيين العائد النحوي للمسطرات في النص (1.5 نقطة).'
				],
				finalAnswer: v.mcqCorrect
			};
		}
	},

	// 3. Competencia lingüística (7 pts) — matching quiz + saveSpanishSvgAsset
	{
		id: 'spa_tpl_2as_le_t3_ling_conectores_logicos',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'gramatica_sintaxis',
		titleAr: 'II. Competencia lingüística : Conectores lógicos, modo verbal y derivación ecológica (7 pts)',
		curriculumLessonId: 'spa_lesson_2as_le_t3_conectores_logicos',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					svgSlug: 'spa_2as_t3_ling_conectores_v0',
					svgContent: svgSpanishGrammarMap({
						title: 'Conectores lógicos y selección de modo',
						rootLabel: 'Relaciones lógicas en el texto (2AS LE)',
						rootSub: 'Causa, Consecuencia, Concesión y Finalidad',
						width: 560,
						branches: [
							{
								label: 'Causa (+ Ind.)',
								rule: 'porque, ya que, puesto que',
								example: 'Reciclo ya que cuido el mar.'
							},
							{
								label: 'Consec. (+ Ind.)',
								rule: 'por lo tanto, así que',
								example: 'Falta agua; por lo tanto, ahorro.'
							},
							{
								label: 'Concesión',
								rule: 'sin embargo / aunque',
								example: 'Aunque llueva, plantaremos.'
							},
							{
								label: 'Finalidad (+ Subj.)',
								rule: 'para que / a fin de que',
								example: 'Limpio para que vivas sano.'
							}
						]
					}),
					svgCaption: 'Esquema de los conectores lógicos y su régimen modal',
					wfRows: [
						{
							verbo: { given: true, value: 'contaminar' },
							sustantivo: { value: 'contaminación', mark: '0.5' },
							adjetivo: { value: 'contaminante', mark: '0.5' }
						},
						{
							verbo: { value: 'proteger', mark: '0.5' },
							sustantivo: { given: true, value: 'protección' },
							adjetivo: { value: 'protector/a', mark: '0.5' }
						}
					],
					q2: '2. Completa cada hueco con el conector lógico apropiado (porque, por lo tanto, aunque, sin embargo, para que) :\n  a) Cuidamos los árboles del barrio ............ limpian el aire y dan sombra.\n  b) El suelo sufre sequía; ............, debemos instalar sistemas de riego por goteo.\n  c) Los vecinos colaboraron en la limpieza ............ todos los niños disfruten del parque.\n  d) El proyecto requiere paciencia; ............, los resultados serán muy beneficiosos.',
					a2: 'a) porque (causa) ; b) por lo tanto (consecuencia) ; c) para que (finalidad + Subjuntivo) ; d) sin embargo (oposición).',
					q3: '3. Une cada pareja de frases según la relación lógica pedida respetando el modo verbal :\n  a) Los jóvenes recogen los envases de vidrio. Quieren reciclarlos. (Finalidad: para — atención al sujeto)\n  b) Los ciudadanos ahorran electricidad. Las facturas bajan y el planeta respira. (Finalidad: para que)\n  c) Hay poco tiempo libre. Participamos en la campaña solidaria. (Concesión real: aunque)',
					a3: 'a) Los jóvenes recogen los envases de vidrio para reciclarlos. (Mismo sujeto).\n  b) Los ciudadanos ahorran electricidad para que las facturas bajen y el planeta respire. (Subjuntivo).\n  c) Aunque hay poco tiempo libre, participamos en la campaña solidaria. (Indicativo: hecho real).',
					q4: '4. Conjuga el verbo entre paréntesis en Indicativo o Subjuntivo después del conector :\n  a) Ya que la energía solar (ser) limpia, cada vez más escuelas la utilizan.\n  b) A fin de que nuestro barrio (estar) ordenado, colocamos papeleras nuevas.\n  c) Aunque mañana (hacer) mucho viento, saldremos a plantar los olivos.',
					a4: 'a) es (Indicativo tras ya que) ; b) esté (Subjuntivo tras a fin de que) ; c) haga (Subjuntivo tras aunque: hipótesis futura).',
					pairs: [
						{ left: 'porque / ya que', right: 'Causa (+ Indicativo)' },
						{ left: 'por lo tanto / así que', right: 'Consecuencia (+ Indicativo)' },
						{ left: 'para que / a fin de que', right: 'Finalidad (+ Subjuntivo)' },
						{ left: 'sin embargo / no obstante', right: 'Oposición o contraste' }
					],
					explanation:
						'روابط السبب والنتيجة تأخذ الإخباري (Indicativo)، وروابط الغاية مع فاعلين مختلفين (para que, a fin de que) تفرض Subjuntivo.'
				},
				{
					svgSlug: 'spa_2as_t3_ling_conectores_v1',
					svgContent: svgSpanishGrammarMap({
						title: 'Contraste modal con AUNQUE y PARA / PARA QUE',
						rootLabel: 'Elegir Indicativo, Subjuntivo o Infinitivo',
						rootSub: 'Depende del hecho real vs hipótesis y del sujeto',
						width: 560,
						branches: [
							{
								label: 'aunque + Ind.',
								rule: 'Hecho real conocido',
								example: 'Aunque llueve, salimos.'
							},
							{
								label: 'aunque + Subj.',
								rule: 'Hipótesis o futuro incierto',
								example: 'Aunque llueva, saldremos.'
							},
							{
								label: 'para + Inf.',
								rule: 'Mismo sujeto en 2 verbos',
								example: 'Ahorro para cuidar el agua.'
							},
							{
								label: 'para que + Subj.',
								rule: 'Dos sujetos distintos',
								example: 'Ahorro para que haya agua.'
							}
						]
					}),
					svgCaption: 'Regla contrastiva para aunque y conectores de finalidad',
					wfRows: [
						{
							verbo: { given: true, value: 'reciclar' },
							sustantivo: { value: 'reciclaje', mark: '0.5' },
							adjetivo: { value: 'reciclable', mark: '0.5' }
						},
						{
							verbo: { value: 'conservar', mark: '0.5' },
							sustantivo: { value: 'conservación', mark: '0.5' },
							adjetivo: { given: true, value: 'conservador/a' }
						}
					],
					q2: '2. Completa eligiendo entre «porque», «por qué» o «debido a» y conjuga si es necesario :\n  a) ¿............ debemos proteger el Valle del M’Zab? —............ es un tesoro arquitectónico y ecológico.\n  b) ............ la escasez de lluvias, es necesario que los jardines (tener) riego por goteo.\n  c) Respetamos los monumentos históricos ya que (formar) parte de nuestra identidad.',
					a2: 'a) Por qué / Porque ; b) Debido a / tengan (Subjuntivo tras es necesario que) ; c) forman (Indicativo tras ya que).',
					q3: '3. Reescribe cada oración sustituyendo el conector subrayado por otro equivalente sin cambiar el sentido :\n  a) Plantamos árboles ya que frenan la erosión. (puesto que)\n  b) Ahorramos agua; por consiguiente, protegemos el futuro. (por lo tanto)\n  c) A pesar de la distancia, visitaron Tremecén. (aunque + verbo conjugado)',
					a3: 'a) Plantamos árboles puesto que frenan la erosión.\n  b) Ahorramos agua; por lo tanto, protegemos el futuro.\n  c) Aunque había distancia (o Aunque estaba lejos), visitaron Tremecén.',
					q4: '4. Completa con Indicativo o Subjuntivo tras «aunque» o «para que» :\n  a) Aunque ahora (hacer) calor, los alarifes diseñaron patios frescos.\n  b) Restauran la antigua fuente para que los visitantes la (admirar).\n  c) Aunque el camino (ser) largo el próximo sábado, iremos a la jornada de reforestación.',
					a4: 'a) hace (hecho real actual) ; b) admiren (Subjuntivo tras para que) ; c) sea (hipótesis futura).',
					pairs: [
						{ left: 'para + infinitivo', right: 'Finalidad con el mismo sujeto' },
						{ left: 'para que + Subjuntivo', right: 'Finalidad con sujetos distintos' },
						{ left: 'aunque + Indicativo', right: 'Concesión de un hecho real' },
						{ left: 'aunque + Subjuntivo', right: 'Concesión de una hipótesis futura' }
					],
					explanation:
						'التمييز الدقيق: نفس الفاعل يأخذ «para + infinitivo» واختلاف الفاعلين يأخذ «para que + Subjuntivo»؛ و «aunque» تأخذ الإخباري للواقع والمنصوب للافتراض.'
				},
				{
					svgSlug: 'spa_2as_t3_ling_conectores_v2',
					svgContent: svgSpanishGrammarMap({
						title: 'Familias léxicas y nexos del ámbito cívico',
						rootLabel: 'Construir argumentos cívicos y culturales',
						rootSub: 'Sustantivos abstractos + Conectores claros',
						width: 560,
						branches: [
							{
								label: 'Solidaridad',
								rule: 'solidario -> solidaridad',
								example: 'ayuda, voluntariado, apoyo'
							},
							{
								label: 'Sostenibilidad',
								rule: 'sostener -> sostenible',
								example: 'energía limpia, ahorro'
							},
							{
								label: 'Causa nominal',
								rule: 'a causa de / debido a',
								example: 'Debido a la sequía...'
							},
							{
								label: 'Oposición',
								rule: 'en cambio / no obstante',
								example: 'No obstante, colaboramos.'
							}
						]
					}),
					svgCaption: 'Vocabulario cívico-ambiental y conectores de argumentación',
					wfRows: [
						{
							verbo: { given: true, value: 'reforestar' },
							sustantivo: { value: 'reforestación', mark: '0.5' },
							adjetivo: { value: 'reforestado/a', mark: '0.5' }
						},
						{
							verbo: { value: 'solidarizarse', mark: '0.5' },
							sustantivo: { given: true, value: 'solidaridad' },
							adjetivo: { value: 'solidario/a', mark: '0.5' }
						}
					],
					q2: '2. Completa el párrafo con cuatro conectores de la lista (ya que, por lo tanto, aunque, para que, sin embargo) :\n  «Las fuentes naturales son limitadas; ............, debemos cerrar el grifo con cuidado ............ no se pierda agua. ............ cuesta cambiar viejas costumbres, cada gesto cuenta ............ el futuro depende de nuestra responsabilidad.»',
					a2: 'por lo tanto / para que / Aunque / ya que.',
					q3: '3. Transforma las causas nominales en oraciones con «porque» y viceversa :\n  a) Debido a la reforestación, disminuye la erosión del suelo.\n  b) Limpiamos las calles porque queremos una ciudad sana. (a causa de / gracias a)',
					a3: 'a) Disminuye la erosión del suelo porque (o gracias a que) se realiza la reforestación.\n  b) Gracias al deseo de una ciudad sana, limpiamos las calles (o Por el cuidado de la salud urbana...).',
					q4: '4. Elige el artículo y la concordancia correctos para los sustantivos del ámbito ambiental :\n  a) (El / La) agua (limpio / limpia) es indispensable en los palmerales.\n  b) (El / La) medio ambiente (sano / sana) requiere educación ciudadana.\n  c) (Las / Los) energías (renovables / renovable) sustituyen a los combustibles contaminantes.',
					a4: 'a) El agua limpia ; b) El medio ambiente sano ; c) Las energías renovables.',
					pairs: [
						{ left: 'debido a + sustantivo', right: 'Causa con grupo nominal' },
						{ left: 'a pesar de + sustantivo', right: 'Concesión con grupo nominal' },
						{ left: 'el agua limpia', right: 'Sustantivo femenino con artículo el en singular' },
						{ left: 'las aguas limpias', right: 'Vuelve al artículo femenino las en plural' }
					],
					explanation:
						'الاسم المؤنث «agua» يأخذ «el» في المفرد (el agua limpia) وتعود الأداة إلى المؤنث في الجمع (las aguas limpias)، بينما «debido a» و«a pesar de» تتبعان باسم أو مصدر.'
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
					content: '1. Completa la tabla de familias léxicas del ámbito social y ambiental (Verbo | Sustantivo | Adjetivo) :',
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
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'linguistic_competence',
				quizQuestion: {
					type: 'matching',
					questionText: 'Relaciona cada conector o estructura de la izquierda con su función o régimen gramatical exacto:',
					questionTextAr: 'صل كل رابط أو تركيب في اليمين بدلالته أو نظامه النحوي الصحيح في اليسار:',
					questionData: {
						pairs: v.pairs
					},
					explanation: v.explanation
				},
				sujetExercise: {
					customTitle: 'II. Competencia lingüística',
					points: 7,
					instruction: 'Completa los ejercicios sobre familias léxicas, conectores lógicos y modos verbales :',
					content
				},
				hints: [
					'تحقق دائماً من العلاقة المعنوية بين الجملتين (سبب؟ نتيجة؟ تعارض؟ غاية؟) قبل اختيار الرابط.',
					'مع para que و a fin de que نصرف الفعل في Presente de Subjuntivo عند اختلاف الفاعلين.',
					'مع aunque نستعمل Indicativo للواقع المعلوم و Subjuntivo للفرضية المستقبلية.'
				],
				solutionStepsAr: [
					'إكمال جدول العائلة اللغوية (2.0 نقطة).',
					'اختيار الروابط المنطقية المناسبة في السياق (2.0 نقطة).',
					'الربط أو التحويل النحوي بين الجمل (1.5 نقطة).',
					'ضبط الصيغة الفعلية أو المطابقة النحوية (1.5 نقطة).'
				],
				finalAnswer: v.pairs.map((p) => `${p.left} = ${p.right}`).join(' | ')
			};
		}
	},

	// 4. Competencia lingüística (7 pts) — drag_drop quiz + saveSpanishSvgAsset
	{
		id: 'spa_tpl_2as_le_t3_ling_condicionales',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'conjugacion_modos',
		titleAr: 'II. Competencia lingüística : Oraciones condicionales (Tipo 1 y Tipo 2) y léxico cultural (7 pts)',
		curriculumLessonId: 'spa_lesson_2as_le_t3_oraciones_condicionales',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					svgSlug: 'spa_2as_t3_ling_condicionales_v0',
					svgContent: svgSpanishTenseTimeline({
						title: 'Oraciones Condicionales: Tipo 1 vs Tipo 2',
						tenseName: 'Real / Posible',
						formula: 'Si + Presente -> Futuro | Si + Imp. Subj -> Condicional',
						activeZone: 'future',
						example: 'Si cuidamos el agua, habrá vida / Si cuidáramos, habría.',
						markers: 'Nunca Futuro ni Condicional inmediatamente tras SI',
						width: 560
					}),
					svgCaption: 'Esquema comparativo de las oraciones condicionales reales e hipotéticas',
					classPrompt:
						'1. Clasifica estas seis frases o formas verbales en las tres columnas de la tabla (Si ahorras agua, ayudarás al país ; Si plantáramos olivos, habría sombra ; tuvieron pasa a tuviera ; Si respetas el patrimonio, lo conservarás ; Si tuvieras tiempo, visitarías Córdoba ; hicieron pasa a hiciera) :',
					classCols: [
						{ header: 'Condicional Tipo 1 (Real)', items: ['Si ahorras agua, ayudarás al país', 'Si respetas el patrimonio, lo conservarás'], mark: '0.5' },
						{ header: 'Condicional Tipo 2 (Posible)', items: ['Si plantáramos olivos, habría sombra', 'Si tuvieras tiempo, visitarías Córdoba'], mark: '0.5' },
						{ header: 'Raíz Imp. Subjuntivo', items: ['tuvieron : tuviera', 'hicieron : hiciera'], mark: '0.5' }
					],
					q2: '2. Conjuga los verbos entre paréntesis respetando el tipo de oración condicional :\n  a) Si todos los alumnos (separar) el papel usado, (proteger, nosotros) muchos árboles. (Tipo 1)\n  b) Si mi instituto (tener) paneles solares en el techo, (ahorrar) mucha energía. (Tipo 2)\n  c) Si tú (visitar) Tremecén, (admirar) la Gran Mezquita. (Tipo 1)\n  d) Si vosotros (poder) participar en el voluntariado, (ayudar) a los vecinos mayores. (Tipo 2)',
					a2: 'a) separan / protegeremos.\n  b) tuviera o tuviese / ahorraría.\n  c) visitas / admirarás.\n  d) pudierais o pudieseis / ayudaríais.',
					q3: '3. Transforma estas dos condiciones reales (Tipo 1) en condiciones posibles/hipotéticas (Tipo 2) :\n  a) Si los ciudadanos usan menos plástico, las playas estarán más limpias.\n  b) Si hacemos un mapa de los monumentos andalusíes, los turistas los conocerán mejor.',
					a3: 'a) Si los ciudadanos usaran menos plástico, las playas estarían más limpias.\n  b) Si hiciéramos un mapa de los monumentos andalusíes, los turistas los conocerían mejor.',
					q4: '4. Escribe el sinónimo de dos palabras culturales y forma un adjetivo derivado :\n  a) Sinónimo de «conservar» = ............ ; Sinónimo de «legado» = ............ .\n  b) Adjetivo de «arquitectura» = ............ ; Adjetivo de «sostenibilidad» = ............ .',
					a4: 'a) conservar = preservar / cuidar ; legado = herencia / patrimonio.\n  b) arquitectónico/a ; sostenible.',
					ddStem: 'Clasifica cada oración condicional según corresponda al Tipo 1 (Real) o al Tipo 2 (Hipotética/Posible):',
					ddCategories: ['Condicional Tipo 1 (Si + Presente con Futuro o Imperativo)', 'Condicional Tipo 2 (Si + Imp. Subj. con Condicional)'],
					ddItems: [
						{ text: 'Si reciclas el vidrio, reducirás los residuos.', category: 0 },
						{ text: 'Si ves un grifo abierto, ciérralo enseguida.', category: 0 },
						{ text: 'Si plantáramos más bosques, frenaríamos la erosión.', category: 1 },
						{ text: 'Si tuviera tiempo libre, visitaría el Valle del M’Zab.', category: 1 }
					]
				},
				{
					svgSlug: 'spa_2as_t3_ling_condicionales_v1',
					svgContent: svgSpanishTenseTimeline({
						title: 'Derivación del Imperfecto de Subjuntivo',
						tenseName: 'Raíz de ELLOS Indef.',
						formula: 'tuvieron -> tuviera | fueron -> fuera | pudieron -> pudiera',
						activeZone: 'past',
						example: 'Si yo fuera arquitecto, diseñaría casas bioclimáticas.',
						markers: 'Se forma quitando -ron y añadiendo -ra / -se',
						width: 560
					}),
					svgCaption: 'Regla única de formación del Imperfecto de Subjuntivo desde Indefinido',
					classPrompt:
						'1. Clasifica estas seis formas verbales según su tiempo y modo (tendría, tuviera, ahorrará, cuidemos, haría, supiera) :',
					classCols: [
						{ header: 'Imperfecto de Subjuntivo', items: ['tuviera', 'supiera'], mark: '0.5' },
						{ header: 'Condicional simple', items: ['tendría', 'haría'], mark: '0.5' },
						{ header: 'Futuro / Pres. Subjuntivo', items: ['ahorrará (Fut.)', 'cuidemos (Pres. Subj.)'], mark: '0.5' }
					],
					q2: '2. Completa cada oración del Tipo 2 con la pareja verbal exacta (Imperfecto de Subjuntivo + Condicional simple) :\n  a) Si yo (ser) responsable municipal, (aumentar) las zonas verdes del barrio.\n  b) Si nosotros (saber) cómo funcionaban las acequias de Granada, (entender) mejor el ahorro del agua.\n  c) Si la gente (hacer) más voluntariado, la convivencia (ser) más armoniosa.\n  d) Si vosotros (venir) a Ghardaïa, (ver) las viviendas encaladas.',
					a2: 'a) fuera / aumentaría.\n  b) supiéramos / entenderíamos.\n  c) hiciera / sería.\n  d) vinierais / veríais.',
					q3: '3. Corrige el error gramatical típico tras «Si» en estas tres frases :\n  a) Si estudiarás todos los días, aprobarás sin problema.\n  b) Si tendríamos más parques solares, habría menos humo.\n  c) Si tengas tiempo esta tarde, acompáñame al taller solidario.',
					a3: 'a) Si estudias todos los días, aprobarás sin problema.\n  b) Si tuviéramos más parques solares, habría menos humo.\n  c) Si tienes tiempo esta tarde, acompáñame al taller solidario.',
					q4: '4. Completa con el vocabulario exacto del patrimonio compartido (acequias, herradura, caligrafía, alminar) :\n  a) Los arcos de ............ caracterizan la Mezquita de Córdoba y Tremecén.\n  b) Las ............ conducen el agua hacia los jardines de la Alhambra.\n  c) El ............ de Sevilla y la ............ árabe embellecen el patrimonio.',
					a4: 'a) herradura ; b) acequias ; c) alminar / caligrafía.',
					ddStem: 'Clasifica estas formas verbales irregulares según pertenezcan al «Imperfecto de Subjuntivo» o al «Condicional Simple»:',
					ddCategories: ['Imperfecto de Subjuntivo (tras SI en Tipo 2)', 'Condicional Simple (Consecuencia en Tipo 2)'],
					ddItems: [
						{ text: 'fuera (de ser/ir)', category: 0 },
						{ text: 'hiciera (de hacer)', category: 0 },
						{ text: 'pudiera (de poder)', category: 0 },
						{ text: 'sería (de ser)', category: 1 },
						{ text: 'haría (de hacer)', category: 1 },
						{ text: 'podría (de poder)', category: 1 }
					]
				},
				{
					svgSlug: 'spa_2as_t3_ling_condicionales_v2',
					svgContent: svgSpanishTenseTimeline({
						title: 'Condicional Tipo 1: Presente + Futuro / Imperativo',
						tenseName: 'Consejos y Previsión',
						formula: 'Si + Presente -> Futuro simple o Imperativo afirmativo',
						activeZone: 'present',
						example: 'Si ves basura en el patio, recógela con civismo.',
						markers: 'Condición probable y mandato cívico directo',
						width: 560
					}),
					svgCaption: 'Empleo de la condición real Tipo 1 con Futuro e Imperativo',
					classPrompt:
						'1. Clasifica estos seis elementos en la tabla (proteger el agua, reducir emisiones, si reciclas ahorrarás, si hubiera sol instalaríamos placas, si ves un problema avisa, si viajáramos veríamos Granada) :',
					classCols: [
						{ header: 'Tipo 1 (+ Futuro / Imperativo)', items: ['si reciclas ahorrarás', 'si ves un problema avisa'], mark: '0.5' },
						{ header: 'Tipo 2 (+ Condicional)', items: ['si hubiera sol instalaríamos placas', 'si viajáramos veríamos Granada'], mark: '0.5' },
						{ header: 'Acciones ecológicas', items: ['proteger el agua', 'reducir emisiones'], mark: '0.5' }
					],
					q2: '2. Conjuga correctamente los verbos en Tipo 1 o Tipo 2 según el sentido y el tiempo dado :\n  a) Si mañana (llover) poco, los agricultores (necesitar) riego controlado. (Tipo 1)\n  b) Si vosotros (cuidar) los libros antiguos, (conservar) la historia común. (Tipo 1)\n  c) Si cada familia (separar) sus residuos hoy mismo, la ciudad (estar) mucho más limpia. (Tipo 2)\n  d) Si ellos (estar) en Córdoba ahora, (visitar) Medina Azahara. (Tipo 2)',
					a2: 'a) llueve / necesitarán.\n  b) cuidáis / conservaréis.\n  c) separara / estaría.\n  d) estuvieran / visitarían.',
					q3: '3. Completa libremente pero con corrección gramatical estas dos condiciones :\n  a) Si participamos en el club ecológico del instituto, ............ (Tipo 1: Futuro).\n  b) Si yo pudiera restaurar un monumento antiguo de mi ciudad, ............ (Tipo 2: Condicional).',
					a3: 'a) (ejemplo) plantaremos nuevos árboles en el patio.\n  b) (ejemplo) conservaría sus arcos y abriría una sala de lectura.',
					q4: '4. Escribe el antónimo de estas palabras del ámbito social y ambiental (limpio, derrochar, egoísta, destruir) :\n  a) limpio ≠ ............ ; b) derrochar ≠ ............ ;\n  c) egoísta ≠ ............ ; d) destruir ≠ ............ .',
					a4: 'a) sucio / contaminado ; b) ahorrar / conservar ; c) solidario / generoso ; d) construir / preservar.',
					ddStem: 'Clasifica cada forma verbal según sea válida o prohibida inmediatamente después de «Si» condicional:',
					ddCategories: ['Permitido tras SI condicional', 'Prohibido tras SI condicional'],
					ddItems: [
						{ text: 'cuidas (Presente de Indicativo)', category: 0 },
						{ text: 'cuidaras (Imperfecto de Subjuntivo)', category: 0 },
						{ text: 'cuidarás (Futuro simple)', category: 1 },
						{ text: 'cuidarías (Condicional simple)', category: 1 }
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
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'linguistic_competence',
				quizQuestion: {
					type: 'drag_drop',
					questionText: v.ddStem,
					questionTextAr: 'اسحب كل عنصر إلى الفئة الشرطية أو الصرفية المناسبة:',
					questionData: {
						categories: v.ddCategories,
						items: rng.shuffle(v.ddItems)
					},
					explanation:
						'الشرط الواقعي (Tipo 1) يستعمل Si + Presente → Futuro/Imperativo، والشرط الممكن (Tipo 2) يستعمل Si + Imp. Subjuntivo → Condicional، ولا يأتي Futuro أو Condicional بعد Si أبداً.'
				},
				sujetExercise: {
					customTitle: 'II. Competencia lingüística',
					points: 7,
					instruction: 'Resuelve las actividades sobre oraciones condicionales y léxico cultural-ambiental :',
					content
				},
				hints: [
					'تذكر القاعدة الذهبية: لا يقع أبداً Futuro ولا Condicional بعد أداة الشرط Si مباشرة.',
					'لصياغة Imperfecto de Subjuntivo خذ ضمير ellos في Indefinido (tuvieron, hicieron, fueron) واحذف -ron ثم أضف -ra.',
					'راجع الجذور الشاذة للشرطي البسيط (tendría, haría, podría, habría, sabría).'
				],
				solutionStepsAr: [
					'التصنيف في الجدول الثلاثي (1.5 نقطة).',
					'تصريف أفعال الجمل الشرطية بدقة في النوعين (2.0 نقطة).',
					'التحويل من النوع 1 إلى النوع 2 أو تصحيح الأخطاء (2.0 نقطة).',
					'إتمام الترادف والتضاد أو المفردات الثقافية (1.5 نقطة).'
				],
				finalAnswer: v.ddItems.map((it) => `${it.text} : ${v.ddCategories[it.category]}`).join(' | ')
			};
		}
	},

	// 5. Expresión escrita (6 pts, integration) — ordering quiz
	{
		id: 'spa_tpl_2as_le_t3_writ_ecologia_solidaridad',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'expresion_escrita',
		titleAr: 'III. Expresión escrita : Campaña ecológica, ahorro del agua y solidaridad ciudadana (6 pts)',
		curriculumLessonId: 'spa_lesson_2as_le_t3_solidaridad_medio_ambiente',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					temaUnoPrompt:
						'Tu instituto lanza la semana del medio ambiente. Redacta un texto de concienciación (110 a 140 palabras) proponiendo medidas concretas para ahorrar agua, plantar árboles y fomentar el reciclaje.',
					temaUnoNotas: [
						'Diagnóstico breve del problema ambiental (sequía, desperdicio de agua, exceso de plásticos).',
						'Tres propuestas prácticas para los alumnos y las familias (cerrar grifos, separar papel y vidrio, plantar árboles).',
						'Uso obligatorio de al menos dos conectores lógicos (porque, por lo tanto, aunque, para que) y una oración condicional (Tipo 1 o Tipo 2).',
						'Llamamiento final solidario destacando la responsabilidad compartida.'
					],
					temaDosPrompt:
						'Escribe una redacción (110 a 140 palabras) explicando qué harías para mejorar la convivencia y las zonas verdes de tu ciudad si fueras responsable de un proyecto juvenil municipal. (Emplea oraciones condicionales del Tipo 2).',
					modelAnswer:
						'Proteger el medio ambiente es un deber cívico y moral que nos concierne a todos. En los últimos años, la sequía irregular y la acumulación de envases plásticos amenazan el equilibrio de nuestras ciudades y bosques.\n\nPor lo tanto, cada alumno y cada familia debe adoptar hábitos sencillos pero decisivos. En primer lugar, es imprescindible ahorrar el agua cerrando bien los grifos y evitando el riego excesivo. Además, conviene separar el papel y el vidrio en contenedores adecuados para que el reciclaje disminuya los residuos. Si plantamos más árboles en los patios escolares y en los parques, protegeremos el suelo contra la erosión y disfrutaremos de sombra natural.\n\nEn conclusión, aunque un gesto individual parezca pequeño, la solidaridad de toda la comunidad garantizará un entorno limpio y sano para las generaciones futuras.',
					rubricSummary:
						'Cumplimiento de las pautas cívico-ecológicas (2.0 pts) | Uso preciso de conectores lógicos y condicionales (2.0 pts) | Riqueza léxica ambiental, concordancia y ortografía (2.0 pts)',
					orderedSteps: [
						'Proteger la naturaleza es una responsabilidad moral que exige el compromiso de toda la sociedad.',
						'Por lo tanto, debemos ahorrar el agua dulce y separar los residuos reciclables cada día.',
						'Si plantamos nuevos árboles en los barrios, frenaremos la erosión y limpiaremos el aire.',
						'En conclusión, la solidaridad ciudadana asegurará un entorno sano para las futuras generaciones.'
					],
					orderExplanation:
						'يبدأ نص التوعية بالمبدأ العام، ثم الإجراءات العملية بالنتيجة (Por lo tanto)، فالشرط الواقعي (Si plantamos...)، ويُختم بالاستنتاج التضامني.'
				},
				{
					temaUnoPrompt:
						'Redacta una crónica escolar (110 a 140 palabras) relatando o proyectando una jornada de solidaridad y voluntariado en tu barrio (ayuda a vecinos mayores, limpieza de espacios verdes, respeto mutuo).',
					temaUnoNotas: [
						'Motivo de la iniciativa solidaria y participación de jóvenes, padres y vecinos.',
						'Descripción ordenada de las tareas realizadas (plantar, limpiar, acompañar y escuchar a los mayores).',
						'Empleo de conectores de causa, consecuencia y finalidad (ya que, así que, a fin de que).',
						'Reflexión final sobre el valor humano de la solidaridad y la convivencia.'
					],
					temaDosPrompt:
						'Escribe un artículo argumentativo (110 a 140 palabras) defendiendo la transición hacia las energías limpias (solar y eólica) como alternativa sostenible frente a la contaminación actual.',
					modelAnswer:
						'El pasado sábado, varios estudiantes de 2AS y vecinos voluntarios organizamos una jornada solidaria en nuestro barrio para mejorar los espacios comunes. Desde primera hora nos dividimos en grupos organizados, ya que queríamos avanzar con eficacia y respeto.\n\nUn equipo limpió el jardín cercano y plantó diez jóvenes olivos, mientras otro grupo reparaba los bancos y llevaba compras a dos vecinos ancianos que viven solos. Además, pintamos carteles cívicos a fin de que los niños pequeños aprendan a cuidar las plantas y el agua del parque.\n\nAl caer la tarde estábamos cansados, así que descansamos juntos compartiendo té y experiencias. Sin duda, si practicáramos más a menudo esta ayuda mutua, nuestras ciudades serían mucho más fraternas y limpias.',
					rubricSummary:
						'Estructura coherente y desarrollo de las cuatro pautas (2.0 pts) | Uso correcto de conectores y tiempos verbales o condicionales (2.0 pts) | Vocabulario de solidaridad, puntuación y ortografía (2.0 pts)',
					orderedSteps: [
						'El sábado pasado organizamos una jornada solidaria en nuestro barrio con vecinos y estudiantes.',
						'Un equipo limpió el jardín y plantó olivos, mientras otro ayudaba a las personas mayores.',
						'Además, colocamos carteles cívicos a fin de que todos cuiden las plantas y el parque.',
						'Si practicáramos más a menudo esta ayuda mutua, nuestras ciudades serían mucho más fraternas.'
					],
					orderExplanation:
						'يتسلسل النص من الحدث التطوعي إلى تفاصيل العمل فالغاية التربوية (a fin de que) والشرط الافتراضي الختامي (Tipo 2).'
				},
				{
					temaUnoPrompt:
						'Responde por escrito (110 a 140 palabras) a la siguiente situación hipotética: «¿Qué cambios ecológicos y solidarios impulsarías si tuvieras la responsabilidad de dirigir la campaña verde de tu instituto durante todo el curso?»',
					temaUnoNotas: [
						'Introducción planteando la hipótesis con una oración condicional del Tipo 2 (Si dirigiera... / Si tuviera...).',
						'Tres propuestas concretas (energía solar en el centro, papeleras de reciclaje, huerto escolar o charlas de concienciación).',
						'Uso exacto de Imperfecto de Subjuntivo, Condicional simple y conectores lógicos.',
						'Conclusión explicando los beneficios duraderos para los estudiantes.'
					],
					temaDosPrompt:
						'Redacta un breve ensayo (110 a 140 palabras) sobre el valor vital del agua en Argelia y los gestos cotidianos que cada joven debe respetar para evitar su derroche.',
					modelAnswer:
						'Si yo tuviera la responsabilidad de dirigir la campaña verde de mi instituto, impulsaría medidas prácticas que unieran la educación científica con el compromiso ciudadano.\n\nEn primer lugar, organizaría brigadas estudiantiles de reciclaje para que cada aula separara el papel usado y los envases limpios. Además, si el centro instalara paneles solares en el techo del gimnasio, ahorraría energía eléctrica y serviría como ejemplo vivo para los alumnos de ciencias. También crearía un pequeño huerto escolar con riego por goteo, ya que este sistema aprovecha el agua sin desperdiciarla.\n\nEn resumen, todas estas acciones demostrarían que cuando la juventud actúa con conciencia y orden, la escuela se transforma en un motor de desarrollo sostenible.',
					rubricSummary:
						'Desarrollo completo de las propuestas hipotéticas (2.0 pts) | Precisión en Tipo 2 (Si + Imp. Subj. con Condicional) y conectores (2.0 pts) | Vocabulario ambiental y corrección formal (2.0 pts)',
					orderedSteps: [
						'Si yo dirigiera la campaña verde del instituto, uniría la educación con la acción cívica.',
						'En primer lugar, crearía equipos de reciclaje para que cada aula separara el papel usado.',
						'Además, si instaláramos paneles solares en el techo, ahorraríamos energía limpia cada día.',
						'En resumen, estas medidas harían de la escuela un verdadero ejemplo de desarrollo sostenible.'
					],
					orderExplanation:
						'تبدأ الفقرة بالفرضية (Tipo 2)، تليها الإجراءات بالغاية والشرط، وتُختم بالخلاصة المنسجمة.'
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
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'ordering',
					questionText: 'Ordena las cuatro partes siguientes para formar una redacción ecológica coherente:',
					questionTextAr: 'رتّب الجمل الأربع الآتية لتكوين نص بيئي وتضامني مترابط:',
					questionData: {
						items: scrambled.items,
						correctOrder: scrambled.correctOrder
					},
					explanation: v.orderExplanation
				},
				sujetExercise: {
					customTitle: 'III. Expresión escrita',
					points: 6,
					instruction: 'Elige UNO de los dos temas propuestos y redacta un texto bien estructurado (110 a 140 palabras) :',
					content: [block]
				},
				hints: [
					'ادمج على الأقل رابطين منطقيين (por lo tanto, ya que, aunque, para que) وجملة شرطية واضحة (Tipo 1 أو Tipo 2).',
					'استحضر مفردات البيئة والطاقة النظيفة والتضامن (ahorrar agua, reciclaje, energía solar, reforestación, solidaridad).',
					'انتبه لتوافق «el agua limpia» في المفرد و«las aguas limpias» في الجمع.'
				],
				solutionStepsAr: [
					'تغطية محاور الموضوع البيئي/التضامني كاملة (2.0 نقطة).',
					'توظيف الجمل الشرطية والروابط المنطقية بسلامة تامة (2.0 نقطة).',
					'ثراء المعجم البيئي والإملاء وعلامات الترقيم (2.0 نقطة).'
				],
				finalAnswer: v.orderedSteps.join(' → ')
			};
		}
	},

	// 6. Expresión escrita (6 pts, integration) — cloze quiz
	{
		id: 'spa_tpl_2as_le_t3_writ_patrimonio_cultural',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'expresion_escrita',
		titleAr: 'III. Expresión escrita : Patrimonio andalusí-magrebí compartido y memoria científica (6 pts)',
		curriculumLessonId: 'spa_lesson_2as_le_t3_patrimonio_andalusi_magrebi',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					temaUnoPrompt:
						'Redacta una crónica cultural (110 a 140 palabras) comparando la arquitectura compartida entre Andalucía (Córdoba, Granada) y Argelia (Tremecén, Ghardaïa) y destacando por qué debemos conservar este patrimonio.',
					temaUnoNotas: [
						'Mención precisa de los monumentos de ambas orillas (Mezquita de Córdoba, Alhambra de Granada, Gran Mezquita de Tremecén, Valle del M’Zab en Ghardaïa).',
						'Elementos comunes: arcos de herradura, geometría, caligrafía y gestión ingeniosa del agua.',
						'Empleo de conectores de comparación/consecuencia y una oración condicional (Tipo 1 o Tipo 2).',
						'Conclusión llamando a preservar y estudiar este patrimonio común.'
					],
					temaDosPrompt:
						'Presenta en 110 a 140 palabras el aporte de dos grandes figuras científicas de la civilización islámica (Al-Zahrawi, Al-Idrisi o Ibn Jaldún) y explica qué lecciones de rigor y esfuerzo ofrecen a la juventud actual.',
					modelAnswer:
						'Las dos orillas del Mediterráneo conservan un patrimonio arquitectónico extraordinario que testimonia siglos de diálogo artístico y científico. Al comparar la Mezquita de Córdoba y la Alhambra de Granada con la Gran Mezquita de Tremecén y el Valle del M’Zab en Ghardaïa, observamos una profunda armonía común.\n\nEn estas ciudades históricas, los arcos de herradura, la caligrafía y la geometría se unen a un respeto ejemplar por la luz y el clima. Además, tanto las acequias granadinas como los canales subterráneos del M’Zab muestran una sabiduría hidráulica sorprendente para ahorrar y repartir el agua con justicia.\n\nPor lo tanto, si cuidamos y estudiamos estos monumentos con seriedad, protegeremos una memoria viva que une el arte, la ciencia y el desarrollo sostenible.',
					rubricSummary:
						'Precisión cultural y desarrollo de todas las pautas (2.0 pts) | Corrección en tiempos verbales, conectores y condicionales (2.0 pts) | Vocabulario arquitectónico, acentuación y coherencia (2.0 pts)',
					clozeSentence: 'Los arquitectos andalusíes y magrebíes construyeron acequias para ___ el agua sin desperdiciarla.',
					clozeCorrect: 'conducir',
					clozeDistractors: ['conduzcan', 'conducía', 'conducirían'],
					clozeExplanation:
						'لأن الفاعل واحد (المهندسون هم من بنوا السواقي وهم من يوصلون الماء)، نستعمل «para + infinitivo» (para conducir).'
				},
				{
					temaUnoPrompt:
						'Escribe una carta cultural o artículo escolar (110 a 140 palabras) proponiendo organizar una exposición en tu instituto sobre el legado de Córdoba, Granada, Tremecén y Ghardaïa, resaltando su valor educativo.',
					temaUnoNotas: [
						'Propuesta de la exposición (láminas de monumentos, mapas de Al-Idrisi, maquetas de acequias y patios).',
						'Beneficios culturales y lingüísticos para los estudiantes de Lenguas Extranjeras.',
						'Uso correcto de Presente de Subjuntivo o condicionales (Si organizáramos..., aprenderíamos...) y conectores lógicos.',
						'Cierre invitando a profesores y alumnos a colaborar.'
					],
					temaDosPrompt:
						'Redacta una reflexión personal (110 a 140 palabras) sobre el deber ciudadano de proteger los monumentos históricos y los manuscritos antiguos frente al deterioro y el abandono.',
					modelAnswer:
						'Para cerrar el tercer trimestre con un proyecto motivador, proponemos organizar en el instituto una exposición titulada «Puentes de piedra y saber entre Al-Ándalus y el Magreb». En ella presentaríamos láminas de la Mezquita de Córdoba, de la Alhambra de Granada, de Tremecén y del Valle del M’Zab.\n\nSi realizáramos esta actividad junto con las clases de historia y español, los alumnos comprenderíamos mejor cómo el arco de herradura, la caligrafía y el urbanismo bioclimático unen ambas culturas. Además, incluiríamos fichas sobre Al-Idrisi y Al-Zahrawi para que todos los visitantes valoren el rigor científico de nuestros antepasados.\n\nEn conclusión, esperamos que la dirección apoye esta iniciativa cultural que fortalece el orgullo sano por nuestra historia y el dominio del idioma español.',
					rubricSummary:
						'Claridad del proyecto cultural y cumplimiento de las pautas (2.0 pts) | Precisión gramatical en Subjuntivo, Condicional y conectores (2.0 pts) | Léxico histórico-arquitectónico y ortografía impecable (2.0 pts)',
					clozeSentence: 'Si los estudiantes ___ la historia de Tremecén y Córdoba, comprenderían sus lazos artísticos.',
					clozeCorrect: 'investigaran',
					clozeDistractors: ['investigarán', 'investigarían', 'investiguen'],
					clozeExplanation:
						'في جملة الشرط من النوع الثاني (جوابها comprenderían في Condicional)، نستعمل Imperfecto de Subjuntivo: investigaran.'
				},
				{
					temaUnoPrompt:
						'Redacta un texto informativo y reflexivo (110 a 140 palabras) sobre los sabios medievales Al-Idrisi, Al-Zahrawi e Ibn Jaldún, explicando por qué su método de observación y viaje sigue siendo ejemplar hoy.',
					temaUnoNotas: [
						'Presentación breve de cada figura (cirugía ilustrada en Córdoba, cartografía verificada con viajeros, estudio histórico-social en Argelia).',
						'Uso preciso del Pretérito Indefinido para hechos históricos y del Presente para su vigencia actual.',
						'Al menos dos conectores lógicos (ya que, por consiguiente, aunque) y vocabulario científico.',
						'Conclusión destacando la curiosidad intelectual, la honestidad y la constancia.'
					],
					temaDosPrompt:
						'Imagina que guías a un visitante hispanohablante por dos lugares emblemáticos de Argelia (la Casbah de Argel, Constantina, Tremecén o Ghardaïa). Escribe la presentación (110 a 140 palabras) explicando su historia y arquitectura.',
					modelAnswer:
						'A lo largo de la historia mediterránea, varios sabios musulmanes marcaron el progreso de la ciencia gracias a la observación directa y al trabajo paciente. En el siglo XI, el médico cordobés Al-Zahrawi redactó un tratado ilustrado de cirugía donde insistió en la higiene clínica para evitar infecciones.\n\nPosteriormente, el geógrafo Al-Idrisi entrevistó a navegantes reales con el fin de dibujar mapas fieles del Mediterráneo y del Magreb, ya que rechazaba las leyendas sin pruebas. Del mismo modo, Ibn Jaldún escribió en tierras argelinas una obra fundamental para analizar las sociedades humanas.\n\nEn conclusión, aunque hayan pasado muchos siglos, el método riguroso de estos maestros sigue enseñándonos que el verdadero saber exige humildad, verificación y constancia diaria.',
					rubricSummary:
						'Exactitud histórica y cobertura de los tres sabios (2.0 pts) | Alternancia exacta de Pretérito Indefinido y Presente + conectores (2.0 pts) | Calidad estilística, acentuación y presentación (2.0 pts)',
					clozeSentence: 'Al-Idrisi entrevistó a numerosos viajeros reales ___ rechazaba las leyendas sin comprobación.',
					clozeCorrect: 'ya que',
					clozeDistractors: ['para que', 'por lo tanto', 'aunque'],
					clozeExplanation:
						'الجملة الثانية تعلل سبب استجواب المسافرين، لذا نربطها برابط السبب «ya que» (لأنّ).'
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
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'cloze',
					questionText: 'Completa la oración cultural con la palabra o el nexo correcto:',
					questionTextAr: 'أكمل العبارة الثقافية بالخيار النحوي أو الرابط المنطقي السليم:',
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
					instruction: 'Elige UNO de los dos temas propuestos y redacta una composición clara (110 a 140 palabras) :',
					content: [block]
				},
				hints: [
					'تأكد من الإملاء الصحيح لأسماء المدن والأعلام (Córdoba, Granada, Al-Ándalus, Tremecén, Ghardaïa, Ibn Jaldún).',
					'اربط بين الماضي التاريخي (Pretérito Indefinido) ودلالة الحاضر والمستقبل (Presente / Condicionales).',
					'وظف مفردات العمارة والبيئة والتراث المائي (arco de herradura, acequia, patio, urbanismo bioclimático).'
				],
				solutionStepsAr: [
					'تغطية العناصر الحضارية والعلمية المطلوبة بدقة (2.0 نقطة).',
					'سلامة الأزمنة والشرط والروابط المنطقية (2.0 نقطة).',
					'جمال الأسلوب والإملاء والترقيم الإسباني (2.0 نقطة).'
				],
				finalAnswer: v.clozeCorrect
			};
		}
	}
];
