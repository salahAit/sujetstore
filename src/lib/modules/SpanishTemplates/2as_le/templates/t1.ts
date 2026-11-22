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

export const TEMPLATES_2AS_LE_T1: SpanishParameterizedTemplate[] = [
	// 1. Comprensión (7 pts) — true_false quiz
	{
		id: 'spa_tpl_2as_le_t1_comp_mundo_hispano',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'cultura_civilizacion',
		titleAr: 'I. Comprensión del texto : El mundo hispanohablante y los puentes lingüísticos (7 pts)',
		curriculumLessonId: 'spa_lesson_2as_le_t1_mundo_hispanohablante',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					useMap: true,
					passageTitle: 'El español: una lengua de encuentro entre continentes',
					paragraphs: [
						'El idioma español es hablado actualmente por más de quinientos millones de personas en el mundo y es lengua oficial en veintiún países repartidos por Europa, América y África. Gracias a esta gran extensión geográfica, aprender [[esta lengua]] permite al estudiante de Lenguas Extranjeras comunicarse con culturas muy diversas sin perder sus propias raíces.',
						'Para los jóvenes argelinos, el estudio del español resulta especialmente cercano por motivos históricos y mediterráneos. En el vocabulario cotidiano del español existen más de cuatro mil palabras de origen árabe, llamadas arabismos, que muestran siglos de intercambio científico, agrícola y comercial entre el mundo árabe y la Península Ibérica.',
						'Términos tan frecuentes como aceite, algodón, azúcar, alcalde, almohada o [[ojalá]] siguen vivos en la lengua moderna. Así, cada alumno que comienza a leer y escribir en español descubre un puente cultural auténtico que une ambas orillas del Mediterráneo.'
					],
					source: 'Revista escolar de Lenguas Extranjeras (texto adaptado)',
					glossary: [
						{ term: 'arabismo', meaning: 'palabra incorporada al español desde la lengua árabe' },
						{ term: 'orilla', meaning: 'borde o costa de un mar o de un río' }
					],
					q1: '1. ¿Cuál es la idea principal del texto y por qué el estudio del español tiene un vínculo especial con los estudiantes argelinos?',
					a1: 'Idea principal: la gran extensión mundial del español y su valor como puente cultural. Vínculo con Argelia: la cercanía mediterránea y la presencia de más de cuatro mil palabras de origen árabe (arabismos) en el léxico español.',
					tfItems: [
						{
							q: 'El español es idioma oficial únicamente en España y en África.',
							a: 'Falso',
							c: 'Es lengua oficial en veintiún países repartidos por Europa, América y África.',
							mark: '0.5'
						},
						{
							q: 'El vocabulario español conserva más de cuatro mil palabras procedentes del árabe.',
							a: 'Verdadero',
							c: 'Se llaman arabismos y proceden de siglos de intercambio científico, agrícola y comercial.',
							mark: '0.5'
						},
						{
							q: 'Palabras como «azúcar», «algodón» o «alcalde» desaparecieron del español actual.',
							a: 'Falso',
							c: 'Siguen vivas en la lengua moderna cotidiana.',
							mark: '0.5'
						}
					],
					q3: '3. Busca en el texto :\n  a) El sinónimo de «actualmente» o «hoy en día» (§1) y el antónimo de «lejano» (§2).\n  b) Cuatro palabras del campo léxico de la lengua o de los arabismos (§2-§3).',
					a3: 'a) Sinónimo: «actualmente» / «moderna»; Antónimo de lejano: «cercano». | b) Campo léxico: idioma, vocabulario, arabismos, aceite, algodón, azúcar, alcalde, almohada, ojalá.',
					q4: '4. ¿A qué palabras del texto remiten las expresiones subrayadas «esta lengua» (§1) y «ojalá» (indica su origen)?',
					a4: '«esta lengua» remite al idioma español. «ojalá» es un arabismo de uso frecuente en español que expresa deseo.',
					quizStatement:
						'Según el texto, los arabismos presentes en el español superan las cuatro mil palabras y reflejan siglos de intercambio científico, agrícola y comercial.',
					quizCorrect: true,
					quizExplanation:
						'العبارة صحيحة: يؤكد النص أن المفردات ذات الأصل العربي في الإسبانية تفوق أربعة آلاف كلمة في مجالات العلم والزراعة والتجارة.'
				},
				{
					useMap: false,
					passageTitle: 'Carta de presentación de Sofía desde Toledo',
					paragraphs: [
						'¡Hola, amigos de Argelia! Me llamo Sofía, tengo diecisiete años y vivo con mis padres y mi hermano menor en Toledo, una ciudad histórica situada en el centro de España. Curso el segundo año de bachillerato de idiomas porque me apasionan las lenguas, la caligrafía y la historia del Mediterráneo.',
						'En mi rutina diaria, me despierto temprano para repasar mis apuntes antes de ir al instituto. Durante el recreo converso con mis compañeras en la biblioteca y, por la tarde, ayudo a mi hermano con sus deberes. El año pasado visité la Mezquita de Córdoba con mi colegio y [[aquella visita]] despertó mi admiración por el arte andalusí.',
						'Actualmente participo en un taller escolar de correspondencia internacional. [[Mi objetivo]] es practicar francés y aprender más sobre vuestras ciudades como Constantina y Tremecén mientras os ayudo a perfeccionar vuestro español.'
					],
					source: 'Correspondencia escolar juvenil (texto adaptado)',
					glossary: [
						{ term: 'correspondencia', meaning: 'intercambio regular de cartas o mensajes educativos' },
						{ term: 'recreo', meaning: 'descanso entre las clases en el instituto' }
					],
					q1: '1. Preséntale al lector quién es Sofía (edad, ciudad, estudios) y qué experiencia cultural marcó su interés el año pasado.',
					a1: 'Sofía tiene diecisiete años, vive en Toledo (España) y cursa el segundo año de bachillerato de idiomas. El año pasado visitó la Mezquita de Córdoba, lo que despertó su admiración por el arte andalusí.',
					tfItems: [
						{
							q: 'Sofía vive en Toledo y es hija única en su familia.',
							a: 'Falso',
							c: 'Vive con sus padres y su hermano menor.',
							mark: '0.5'
						},
						{
							q: 'Sofía dedica parte de su tarde a ayudar a su hermano con las tareas escolares.',
							a: 'Verdadero',
							c: 'Por la tarde ayuda a su hermano con sus deberes.',
							mark: '0.5'
						},
						{
							q: 'El taller de correspondencia busca exclusivamente enseñar matemáticas.',
							a: 'Falso',
							c: 'Sirve para practicar lenguas y conocer ciudades e historia de ambos países.',
							mark: '0.5'
						}
					],
					q3: '3. Encuentra en el texto :\n  a) El sinónimo de «compañeros de estudio» (§2) y el antónimo de «mayor» (§1).\n  b) Tres palabras pertenecientes al ámbito escolar.',
					a3: 'a) Sinónimo: «compañeras»; Antónimo de mayor: «menor». | b) Ámbito escolar: bachillerato, apuntes, instituto, recreo, biblioteca, deberes.',
					q4: '4. ¿A qué remiten las expresiones subrayadas «aquella visita» (§2) y «Mi objetivo» (§3)?',
					a4: '«aquella visita» remite a la visita escolar a la Mezquita de Córdoba. «Mi objetivo» remite al propósito de practicar francés, conocer ciudades argelinas y ayudar a perfeccionar el español.',
					quizStatement:
						'Sofía manifiesta rechazo hacia la historia mediterránea y evita cualquier intercambio escolar con estudiantes extranjeros.',
					quizCorrect: false,
					quizExplanation:
						'العبارة خاطئة: صوفيا شغوفة باللغات وتاريخ المتوسط وتشارك بنشاط في ورشة مراسلة دولية مع طلبة الجزائر.'
				},
				{
					useMap: true,
					passageTitle: 'De la medina al diccionario: palabras viajeras',
					paragraphs: [
						'Cada palabra guarda una historia de encuentros humanos. Cuando un estudiante de 2AS abre un diccionario español, descubre con sorpresa que muchas palabras esenciales de la vida diaria provienen directamente del árabe clásico. Durante siglos, los tratados de astronomía, medicina y riego fueron traducidos y difundidos por el Mediterráneo.',
						'Así entraron en el español vocablos agrícolas como acequia, naranja, limón o berenjena, junto a palabras de la vida doméstica como alfombra, taza y jarra. Todas [[ellas]] conservaron la huella sonora del artículo árabe al- unido al sustantivo original.',
						'Hoy en día, conocer [[esta herencia compartida]] motiva a los estudiantes de Lenguas Extranjeras a estudiar con más entusiasmo, pues comprenden que el aprendizaje de un idioma nuevo también ilumina su propia memoria cultural.'
					],
					source: 'Cuaderno de lexicología hispano-árabe (texto adaptado)',
					glossary: [
						{ term: 'acequia', meaning: 'canal estrecho que conduce el agua para regar los cultivos' },
						{ term: 'huella', meaning: 'marca o rastro que permanece a lo largo del tiempo' }
					],
					q1: '1. ¿Qué explica el texto sobre el origen de muchas palabras cotidianas del español y en qué campos entraron principalmente?',
					a1: 'El texto explica que muchas palabras cotidianas del español provienen del árabe clásico gracias a la traducción y difusión de tratados y al contacto mediterráneo, especialmente en la agricultura (acequia, naranja) y la vida doméstica (alfombra, taza).',
					tfItems: [
						{
							q: 'Solo los términos militares pasaron del árabe al idioma español.',
							a: 'Falso',
							c: 'Entraron palabras de astronomía, medicina, riego, agricultura y vida doméstica.',
							mark: '0.5'
						},
						{
							q: 'El prefijo «al-» en varios vocablos españoles procede del artículo árabe.',
							a: 'Verdadero',
							c: 'Conservaron la huella sonora del artículo árabe al- unido al sustantivo.',
							mark: '0.5'
						},
						{
							q: 'Descubrir estas raíces comunes desanima a los alumnos de idiomas.',
							a: 'Falso',
							c: 'Los motiva a estudiar con más entusiasmo.',
							mark: '0.5'
						}
					],
					q3: '3. Busca en el texto :\n  a) El sinónimo de «palabras» (§2) y el antónimo de «olvido» (§3).\n  b) Clasifica cuatro arabismos citados en: agricultura / hogar.',
					a3: 'a) Sinónimo de palabras: «vocablos» (o términos); Antónimo de olvido: «memoria». | b) Agricultura: acequia, naranja, limón, berenjena; Hogar: alfombra, taza, jarra.',
					q4: '4. ¿A qué remiten las expresiones subrayadas «ellas» (§2) y «esta herencia compartida» (§3)?',
					a4: '«ellas» remite a las palabras agrícolas y domésticas de origen árabe citadas en el §2. «esta herencia compartida» remite al legado léxico y cultural árabe presente en el español.',
					quizStatement:
						'Conocer el origen árabe de numerosas palabras españolas ayuda a los estudiantes argelinos a reforzar su motivación al aprender el idioma.',
					quizCorrect: true,
					quizExplanation:
						'العبارة صحيحة: الفقرة الثالثة تؤكد أن إدراك هذا الإرث اللغوي المشترك يحفز تلاميذ اللغات الأجنبية على التعلم بحماس.'
				}
			];

			const v = rng.pick(variants);
			const content: ContentBlock[] = [];
			if (v.useMap) {
				content.push(
					buildIllustratedFigureBlock('spa_01_mundo_hispanohablante_mapa_mudo', {
						lang: 'es',
						mode: 'labeled',
						pins: [],
						width: '62%',
						maxHeight: 118,
						caption: 'Extensión geográfica del español y puente mediterráneo con Argelia'
					})
				);
			}
			content.push(
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
					content: '2. Di si es Verdadero o Falso y justifica según el texto :',
					mark: ''
				},
				{ type: 'true_false', items: v.tfItems },
				{ type: 'text', content: v.q3, answer: v.a3, mark: '2.0' },
				{ type: 'text', content: v.q4, answer: v.a4, mark: '1.5' }
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'true_false',
					questionText: v.quizStatement,
					questionTextAr: 'حدّد صحة أو خطأ العبارة الآتية حسب النص:',
					questionData: {
						correctAnswer: v.quizCorrect
					},
					explanation: v.quizExplanation
				},
				sujetExercise: {
					customTitle: 'I. Comprensión del texto',
					points: 7,
					instruction: 'Lee atentamente el texto y responde con precisión a las preguntas :',
					content
				},
				hints: [
					'اقرأ الفقرات الثلاث بتمعّن وحدّد موقع الإجابة داخل كل فقرة (§1، §2، §3).',
					'في أسئلة Verdadero / Falso استند دائماً إلى الجملة الدقيقة في النص للتعليل.',
					'للتأكد من عائد الكلمة المسطرة، اقرأ الجملة التي تسبقها مباشرة وطابق التذكير والعدد.'
				],
				solutionStepsAr: [
					'استخلاص الفكرة العامة والرابط الحضاري (2.0 نقطة).',
					'تحديد صحة أو خطأ العبارات مع التعليل النصي (1.5 نقطة).',
					'استخراج المترادفات والأضداد والحقل المعجمي (2.0 نقطة).',
					'تحديد عائد الكلمات المسطرة في النص (1.5 نقطة).'
				],
				finalAnswer: v.quizCorrect ? 'Verdadero' : 'Falso'
			};
		}
	},

	// 2. Comprensión (7 pts) — mcq quiz
	{
		id: 'spa_tpl_2as_le_t1_comp_rutina_pasado',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'comprension_lectora',
		titleAr: 'I. Comprensión del texto : Ámbito Personal, rutina sana y relatos en pasado (7 pts)',
		curriculumLessonId: 'spa_lesson_2as_le_t1_ambito_personal_rutina',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					useIllus: true,
					passageTitle: 'La nueva rutina equilibrada de Karim',
					paragraphs: [
						'Hasta el año pasado, Karim pasaba demasiadas horas frente al teléfono móvil y siempre se acostaba tarde. Como consecuencia, por las mañanas llegaba cansado al instituto y apenas tenía ganas de participar en clase. Un día, su hermano mayor le aconsejó cambiar [[aquel hábito]] y organizar su horario con seriedad.',
						'Desde hace dos meses, Karim ha transformado su rutina diaria: se despierta a las seis y media, ordena su habitación y repasa durante cuarenta minutos antes de desayunar en familia. Por la tarde, en lugar de perder el tiempo en pantallas, acude a la biblioteca municipal o practica atletismo con sus compañeros.',
						'Esta semana ha presentado una exposición oral brillante sobre los beneficios de la lectura y todos [[sus profesores]] han elogiado su constancia. Hoy Karim está muy satisfecho porque se siente más sereno y seguro de sí mismo.'
					],
					source: 'Relatos educativos juveniles (texto adaptado)',
					glossary: [
						{ term: 'constancia', meaning: 'firmeza y perseverancia en el cumplimiento de las tareas' },
						{ term: 'sereno', meaning: 'tranquilo, equilibrado y libre de agitación' }
					],
					q1: '1. ¿Qué problema tenía Karim hasta el año pasado y qué dos cambios concretos introdujo en su rutina diaria?',
					a1: 'Problema: pasaba demasiadas horas con el móvil, se acostaba tarde y llegaba cansado al instituto. Cambios: se despierta temprano para repasar antes de desayunar, y por la tarde va a la biblioteca o practica atletismo en vez de usar pantallas.',
					mcGroups: [
						{
							header: 'a) ¿Cómo se siente Karim al final del texto tras cambiar de hábitos?',
							options: [
								'Aburrido e indiferente ante los estudios',
								'Satisfecho, sereno y más seguro de sí mismo',
								'Cansado y sin tiempo para su familia'
							],
							correct: 'Satisfecho, sereno y más seguro de sí mismo',
							mark: '1.0'
						},
						{
							header: 'b) ¿Por qué se usa «está» en «Hoy Karim está muy satisfecho»?',
							options: [
								'Porque expresa la nacionalidad permanente de Karim',
								'Porque indica el estado anímico actual tras su esfuerzo',
								'Porque señala una hora exacta del día'
							],
							correct: 'Porque indica el estado anímico actual tras su esfuerzo',
							mark: '1.0'
						}
					],
					q3: '3. Encuentra en el texto :\n  a) Un sinónimo de «felicitado» o «alabado» (§3) y un antónimo de «temprano» (§1).\n  b) Dos verbos reflexivos de la rutina diaria en infinitivo.',
					a3: 'a) Sinónimo: «elogiado»; Antónimo de temprano: «tarde». | b) Verbos reflexivos: acostarse, despertarse, sentirse.',
					q4: '4. ¿A qué remiten «aquel hábito» (§1) y «sus profesores» (§3)? ¿Por qué emplea el texto el Pretérito Perfecto en el §3?',
					a4: '«aquel hábito» remite a pasar demasiadas horas con el móvil y acostarse tarde; «sus profesores» remite a los docentes de Karim. Se usa el Pretérito Perfecto en el §3 («ha presentado», «han elogiado») porque «esta semana» es un período temporal aún abierto conectado con el presente.',
					mcqQuestion: '¿Por qué el autor emplea el Pretérito Imperfecto («pasaba», «se acostaba», «llegaba») en el primer párrafo?',
					mcqQuestionAr: 'لماذا استعمل الكاتب زمن Pretérito Imperfecto في الفقرة الأولى؟',
					mcqCorrect: 'Para describir hábitos repetidos y una situación habitual en el pasado de Karim',
					mcqDistractors: [
						{
							text: 'Para expresar órdenes dirigidas a los compañeros de clase',
							diagnosticFeedback: 'خطأ: صيغة الأمر تختلف تماماً عن الماضي الوصفي.'
						},
						{
							text: 'Para anunciar un proyecto futuro del próximo trimestre',
							diagnosticFeedback: 'خطأ: السياق يبدأ بعبارة «Hasta el año pasado» في الماضي.'
						},
						{
							text: 'Para narrar una acción única realizada esta misma mañana',
							diagnosticFeedback: 'خطأ: هذه وظيفة Pretérito Perfecto، بينما «siempre» تشير للعادة الماضية.'
						}
					],
					mcqExplanation: 'يُستعمل Pretérito Imperfecto مع مؤشر «siempre» لوصف العادات المتكررة في الماضي.'
				},
				{
					useIllus: false,
					passageTitle: 'Un fin de semana solidario en las montañas de Chrea',
					paragraphs: [
						'El sábado pasado, mi familia y unos vecinos organizamos una salida educativa de senderismo hacia los cedros de Chrea. Antes de salir, mi padre preparó mochilas ligeras con agua y fruta, mientras mi madre y yo comprobábamos la ruta en el mapa.',
						'Al llegar al sendero, observamos un paisaje magnífico, aunque vimos algunos envases de plástico olvidados cerca de una fuente. Sin dudarlo, sacamos unas bolsas reutilizables y recogimos [[todos aquellos residuos]] para dejar limpio el lugar.',
						'Durante el descanso, mi abuelo nos contó cómo cuidaban los bosques cuando [[él]] era joven. Al volver a casa, todos estábamos cansados físicamente, pero muy orgullosos de haber combinado deporte sano, convivencia familiar y respeto a la naturaleza.'
					],
					source: 'Diario juvenil de ocio sano y naturaleza (texto adaptado)',
					glossary: [
						{ term: 'senderismo', meaning: 'actividad deportiva sana que consiste en caminar por rutas naturales' },
						{ term: 'envase', meaning: 'recipiente o botella que contiene alimentos o bebidas' }
					],
					q1: '1. ¿Qué actividad realizaron el protagonista y su familia el sábado pasado y qué problema ambiental encontraron en la ruta?',
					a1: 'Realizaron una salida de senderismo a Chrea en familia y encontraron envases de plástico abandonados cerca de una fuente, los cuales recogieron en bolsas reutilizables.',
					mcGroups: [
						{
							header: 'a) ¿Qué valores combinaron durante la jornada?',
							options: [
								'Competencia agresiva y uso excesivo de videojuegos',
								'Deporte sano, convivencia familiar y respeto a la naturaleza',
								'Comercio urbano y turismo de lujo'
							],
							correct: 'Deporte sano, convivencia familiar y respeto a la naturaleza',
							mark: '1.0'
						},
						{
							header: 'b) ¿Qué tiempo verbal predomina en las acciones puntuales del sábado pasado («organizamos», «vimos», «recogimos»)?',
							options: [
								'Pretérito Indefinido',
								'Futuro simple',
								'Presente de Subjuntivo'
							],
							correct: 'Pretérito Indefinido',
							mark: '1.0'
						}
					],
					q3: '3. Busca en el texto :\n  a) El sinónimo de «caminata por la naturaleza» (§1) y el antónimo de «sucio» (§2).\n  b) Tres sustantivos relacionados con la familia.',
					a3: 'a) Sinónimo: «senderismo»; Antónimo de sucio: «limpio». | b) Familia: familia, padre, madre, abuelo.',
					q4: '4. ¿A qué remiten las palabras subrayadas «todos aquellos residuos» (§2) y «él» (§3)?',
					a4: '«todos aquellos residuos» remite a los envases de plástico olvidados cerca de la fuente. «él» remite al abuelo del protagonista.',
					mcqQuestion: '¿Qué combinación correcta de tiempos aparece en «mi padre preparó mochilas, mientras mi madre y yo comprobábamos la ruta»?',
					mcqQuestionAr: 'ما الثنائية الزمنية المستعملة في جملة التحضير للرحلة؟',
					mcqCorrect: 'Pretérito Indefinido («preparó» = acción acabada) y Pretérito Imperfecto («comprobábamos» = acción simultánea en desarrollo)',
					mcqDistractors: [
						{
							text: 'Dos verbos en Pretérito Perfecto sobre acciones de hoy',
							diagnosticFeedback: 'خطأ: لا يوجد الفعل المساعد haber في هذه الجملة.'
						},
						{
							text: 'Presente de Indicativo y Condicional simple',
							diagnosticFeedback: 'خطأ: الحدث وقع السبت الماضي في زمنين ماضيين.'
						},
						{
							text: 'Futuro próximo y Presente de Subjuntivo',
							diagnosticFeedback: 'خطأ: الجملة سرد تاريخي لرحلة منتهية.'
						}
					],
					mcqExplanation: 'يُعبَّر عن الفعل المنجز في Indefinido (preparó) والفعل المستمر الموازي في الخلفية بـ Imperfecto (comprobábamos).'
				},
				{
					useIllus: true,
					passageTitle: 'Recuerdos de la biblioteca de mi abuelo en Tremecén',
					paragraphs: [
						'Cuando yo tenía diez años, visitaba cada verano la casa de mi abuelo en Tremecén. Era un hombre paciente, generoso y muy amante de la lectura que siempre llevaba un pequeño cuaderno para anotar palabras interesantes.',
						'En su salón había una estantería de madera llena de diccionarios y libros de geografía. Todas las tardes nos sentábamos en [[aquella sala luminosa]] y mi abuelo me explicaba la historia de las antiguas ciudades mediterráneas y el valor del esfuerzo honrado.',
						'Hace poco tiempo he vuelto a abrir [[su viejo cuaderno]] y he encontrado una dedicatoria suya sobre la importancia de aprender lenguas con humildad. Sigo recordando sus palabras cada vez que empiezo una nueva unidad de español.'
					],
					source: 'Memorias familiares y educativas (texto adaptado)',
					glossary: [
						{ term: 'estantería', meaning: 'mueble con baldas horizontales para ordenar libros' },
						{ term: 'humildad', meaning: 'virtud moral consistente en reconocer nuestras limitaciones sin orgullo' }
					],
					q1: '1. Describe brevemente el carácter del abuelo y qué hacían juntos todas las tardes en Tremecén.',
					a1: 'El abuelo era paciente, generoso y amante de la lectura. Todas las tardes se sentaban en la sala luminosa y él le explicaba la historia de las ciudades mediterráneas y el valor del esfuerzo honrado.',
					mcGroups: [
						{
							header: 'a) ¿Qué objeto ha vuelto a abrir el narrador recientemente?',
							options: [
								'Un periódico deportivo de la semana pasada',
								'El viejo cuaderno de anotaciones de su abuelo',
								'Una carta bancaria olvidada'
							],
							correct: 'El viejo cuaderno de anotaciones de su abuelo',
							mark: '1.0'
						},
						{
							header: 'b) ¿Qué expresa la perífrasis «Sigo recordando» al final del texto?',
							options: [
								'Una acción que terminó hace veinte años',
								'Una continuidad en el presente: el recuerdo sigue vivo',
								'Una obligación impuesta por otra persona'
							],
							correct: 'Una continuidad en el presente: el recuerdo sigue vivo',
							mark: '1.0'
						}
					],
					q3: '3. Extrae del texto :\n  a) Tres adjetivos calificativos que describen el carácter del abuelo (§1).\n  b) El antónimo de «oscura» (§2) y un sinónimo de «regresar» (§3).',
					a3: 'a) Adjetivos de carácter: paciente, generoso, amante (de la lectura). | b) Antónimo de oscura: «luminosa»; Sinónimo de regresar: «volver» («he vuelto»).',
					q4: '4. ¿A qué remiten «aquella sala luminosa» (§2) y «su viejo cuaderno» (§3)?',
					a4: '«aquella sala luminosa» remite al salón de la casa del abuelo donde estaba la estantería. «su viejo cuaderno» remite al cuaderno donde el abuelo anotaba palabras interesantes.',
					mcqQuestion: '¿Qué valor tiene la perífrasis «Sigo recordando» en la última frase del texto?',
					mcqQuestionAr: 'ما دلالة المركب الفعلي «Sigo recordando» في الجملة الأخيرة؟',
					mcqCorrect: 'Expresa una acción que empezó en el pasado y continúa produciéndose en el presente',
					mcqDistractors: [
						{
							text: 'Indica una acción que acaba de finalizar hace un segundo',
							diagnosticFeedback: 'خطأ: الماضي القريب جداً يُصاغ بـ acabar de + infinitivo.'
						},
						{
							text: 'Expresa una prohibición estricta en el aula',
							diagnosticFeedback: 'خطأ: لا تفيد المنع بل الاستمرار.'
						},
						{
							text: 'Señala una hipótesis irreal en el futuro',
							diagnosticFeedback: 'خطأ: seguir + gerundio تفيد الاستمرارية.'
						}
					],
					mcqExplanation: 'المركب الفعلي «seguir + gerundio» يعبر عن استمرار الفعل المتواصل حتى الحاضر.'
				}
			];

			const v = rng.pick(variants);
			const mcq = buildUniqueMcqOptions(v.mcqCorrect, v.mcqDistractors, rng);
			const content: ContentBlock[] = [];
			if (v.useIllus) {
				content.push(
					buildIllustratedFigureBlock('spa_03_educacion_idiomas_biblioteca', {
						lang: 'es',
						mode: 'labeled',
						pins: [],
						width: '62%',
						maxHeight: 118,
						caption: 'Lectura organizada y formación personal en 2AS LE'
					})
				);
			}
			content.push(
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
					content: '2. Marca la respuesta correcta según la lectura :',
					mark: ''
				},
				{ type: 'multiple_choice', groups: v.mcGroups },
				{ type: 'text', content: v.q3, answer: v.a3, mark: '1.5' },
				{ type: 'text', content: v.q4, answer: v.a4, mark: '1.5' }
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't1',
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
					instruction: 'Lee detenidamente el texto y contesta a las preguntas :',
					content
				},
				hints: [
					'تتبع المؤشرات الزمنية في كل فقرة لتمييز العادة الماضية من الحدث القريب المتصل بالحاضر.',
					'ابحث عن المترادفات والأضداد ضمن نفس الفئة النحوية (فعل بمثل زمنه/صيغته، وصفة بصفة).',
					'انتبه للمركبات الفعلية واستعمالات ser و estar المذكورة في النص.'
				],
				solutionStepsAr: [
					'الإجابة عن سؤال الفهم الصريح من النص (2.0 نقطة).',
					'اختيار الإجابتين الصحيحتين في الاختيار من متعدد (2.0 نقطة).',
					'استخراج المفردات والضمائر الانعكاسية أو الصفات (1.5 نقطة).',
					'تعيين العائد النحوي وتعليل الزمن أو الصيغة (1.5 نقطة).'
				],
				finalAnswer: v.mcqCorrect
			};
		}
	},

	// 3. Competencia lingüística (7 pts) — matching quiz + saveSpanishSvgAsset
	{
		id: 'spa_tpl_2as_le_t1_ling_pasados_perifrasis',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'conjugacion_modos',
		titleAr: 'II. Competencia lingüística : Familias léxicas, tiempos del pasado y perífrasis (7 pts)',
		curriculumLessonId: 'spa_lesson_2as_le_t1_tiempos_pasado',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					svgSlug: 'spa_2as_t1_ling_pasados_v0',
					svgContent: svgSpanishTenseTimeline({
						title: 'Contraste de pasados en 2AS LE',
						tenseName: 'Perfecto / Indefinido',
						formula: 'hoy -> he + participio | ayer -> indefinido',
						activeZone: 'past_to_present',
						example: 'Esta mañana he estudiado / Ayer visité el museo.',
						markers: 'hoy, ya (Perfecto) | ayer, en 2023 (Indefinido)',
						width: 560
					}),
					svgCaption: 'Esquema visual de oposición entre Pretérito Perfecto e Indefinido',
					wfRows: [
						{
							verbo: { given: true, value: 'organizar' },
							sustantivo: { value: 'organización', mark: '0.5' },
							adjetivo: { value: 'organizado/a', mark: '0.5' }
						},
						{
							verbo: { value: 'educar', mark: '0.5' },
							sustantivo: { given: true, value: 'educación' },
							adjetivo: { value: 'educativo/a', mark: '0.5' }
						}
					],
					q2: '2. Conjuga los verbos entre paréntesis en Pretérito Perfecto, Pretérito Indefinido o Pretérito Imperfecto según el marcador temporal :\n  a) Hoy nosotros ya (escribir) el resumen de la unidad.\n  b) El mes pasado mi hermana (tener) una buena nota en español.\n  c) Antes, cuando yo (vivir) en el pueblo, (caminar) al colegio cada mañana.',
					a2: 'a) hemos escrito (Pretérito Perfecto: participio irregular).\n  b) tuvo (Pretérito Indefinido irregular de tener).\n  c) vivía / caminaba (Pretérito Imperfecto de hábito pasado).',
					q3: '3. Reescribe las frases empleando la perífrasis verbal adecuada (tener que + inf. / acabar de + inf. / seguir + ger.) :\n  a) Hace dos minutos terminé mi tarea. (acabar de)\n  b) Es obligatorio repasar las conjugaciones irregulares. (nosotros: tener que)\n  c) Todavía practico la lectura en voz alta cada tarde. (seguir)',
					a3: 'a) Acabo de terminar mi tarea.\n  b) Tenemos que repasar las conjugaciones irregulares.\n  c) Sigo practicando la lectura en voz alta cada tarde.',
					q4: '4. Completa con el marcador temporal correcto (hoy, ayer, siempre) y concuerda el verbo en Presente reflexivo :\n  a) ............ mis primos (levantarse) a las siete porque tienen clase.\n  b) ............ hemos empezado la nueva lectura en el aula.\n  c) ............ fui con mi padre a comprar dos diccionarios nuevos.',
					a4: 'a) Siempre mis primos se levantan a las siete.\n  b) Hoy hemos empezado la nueva lectura.\n  c) Ayer fui con mi padre a comprar dos diccionarios nuevos.',
					pairs: [
						{ left: 'hoy / esta semana', right: 'Pretérito Perfecto (he escrito)' },
						{ left: 'ayer / el año pasado', right: 'Pretérito Indefinido (escribí)' },
						{ left: 'antes / todos los días (pasado)', right: 'Pretérito Imperfecto (escribía)' },
						{ left: 'hace un instante', right: 'acabar de + infinitivo' }
					],
					explanation:
						'تحدّد المؤشرات الزمنية الزمن الماضي الدقيق: hoy للماضي القريب، ayer للماضي المنقطع، antes للماضي الوصفي المستمر، وacabar de للحدث المنتهي للتو.'
				},
				{
					svgSlug: 'spa_2as_t1_ling_pasados_v1',
					svgContent: svgSpanishConjugationChart({
						title: 'Irregulares clave del Pretérito Indefinido',
						subtitle: 'Sin tilde en las formas fuertes (yo / él)',
						width: 560,
						columns: [
							{
								header: 'SER / IR',
								rule: 'Misma raíz fu-',
								examples: 'fui, fuiste, fue, fueron'
							},
							{
								header: 'HACER / DECIR',
								rule: 'Raíz hic- / dij-',
								examples: 'hice, hizo / dije, dijo'
							},
							{
								header: 'TENER / PODER',
								rule: 'Raíz tuv- / pud-',
								examples: 'tuve, tuvo / pude, pudo'
							}
						]
					}),
					svgCaption: 'Cuadro de verbos irregulares frecuentes en Pretérito Indefinido',
					wfRows: [
						{
							verbo: { given: true, value: 'respetar' },
							sustantivo: { value: 'respeto', mark: '0.5' },
							adjetivo: { value: 'respetuoso/a', mark: '0.5' }
						},
						{
							verbo: { value: 'estudiar', mark: '0.5' },
							sustantivo: { value: 'estudio / estudiante', mark: '0.5' },
							adjetivo: { given: true, value: 'estudioso/a' }
						}
					],
					q2: '2. Pon los verbos entre paréntesis en el tiempo del pasado conveniente :\n  a) En 2024 Amin (hacer) un viaje cultural a Constantina y (ver) sus puentes.\n  b) Todavía no (volver, tú) de la biblioteca municipal.\n  c) Mientras mis hermanos (leer) en silencio, empezó a llover.',
					a2: 'a) hizo / vio (Pretérito Indefinido).\n  b) has vuelto (Pretérito Perfecto: participio irregular vuelto).\n  c) leían (Pretérito Imperfecto en desarrollo).',
					q3: '3. Transforma estas oraciones del Presente al Pretérito Indefinido (cambia también «hoy» por «ayer») :\n  a) Hoy voy al instituto y digo la verdad al profesor.\n  b) Hoy no puedo entregar la ficha porque tengo fiebre.',
					a3: 'a) Ayer fui al instituto y dije la verdad al profesor.\n  b) Ayer no pude entregar la ficha porque tuve fiebre.',
					q4: '4. Completa con la perífrasis verbal adecuada en Presente (ir a + inf. / volver a + inf. / tener que + inf.) :\n  a) Mañana por la mañana nosotros ............ visitar la exposición del libro.\n  b) Como el texto es denso, yo ............ leerlo con calma otra vez.\n  c) Todos los alumnos ............ respetar las normas de la biblioteca.',
					a4: 'a) vamos a visitar (futuro próximo).\n  b) vuelvo a leerlo (repetición).\n  c) tienen que respetar (obligación).',
					pairs: [
						{ left: 'hacer (3.ª pers. sing. Indefinido)', right: 'hizo' },
						{ left: 'escribir (participio irregular)', right: 'escrito' },
						{ left: 'ir (3.ª pers. sing. Imperfecto)', right: 'iba' },
						{ left: 'volver (participio irregular)', right: 'vuelto' }
					],
					explanation:
						'الأفعال الشاذة في أزمنة الماضي: hizo (Indefinido)، escrito و vuelto (اسما مفعول)، و iba (Imperfecto لـ ir).'
				},
				{
					svgSlug: 'spa_2as_t1_ling_pasados_v2',
					svgContent: svgSpanishTenseTimeline({
						title: 'Narración en pasado: Imperfecto vs Indefinido',
						tenseName: 'Escena y Acción',
						formula: 'Mientras + Imperfecto | Acción puntual + Indefinido',
						activeZone: 'two_past',
						example: 'Llovía mucho cuando llegamos al instituto.',
						markers: 'siempre, de niño (Imperf.) | de repente, ayer (Indef.)',
						width: 560
					}),
					svgCaption: 'Relación entre acción de fondo (Imperfecto) y acción puntual (Indefinido)',
					wfRows: [
						{
							verbo: { given: true, value: 'colaborar' },
							sustantivo: { value: 'colaboración', mark: '0.5' },
							adjetivo: { value: 'colaborador/a', mark: '0.5' }
						},
						{
							verbo: { value: 'responsabilizar', mark: '0.5' },
							sustantivo: { given: true, value: 'responsabilidad' },
							adjetivo: { value: 'responsable', mark: '0.5' }
						}
					],
					q2: '2. Conjuga cada pareja verbal combinando Pretérito Imperfecto y Pretérito Indefinido :\n  a) Cuando mi padre (llegar) a casa, nosotros ya (estar) cenando.\n  b) De pequeño, Karim (ser) muy tímido, pero el año pasado (participar) en el club de oratoria.\n  c) Esta semana nosotros (hacer) dos ejercicios de gramática.',
					a2: 'a) llegó (Indefinido) / estábamos (Imperfecto).\n  b) era (Imperfecto) / participó (Indefinido).\n  c) hemos hecho (Pretérito Perfecto).',
					q3: '3. Forma el Pretérito Perfecto con los participios irregulares exactos :\n  a) Yo nunca (decir) mentiras a mis padres.\n  b) ¿(abrir, vosotros) ya el diccionario español?\n  c) La alumna (poner) sus libros ordenados sobre el pupitre.',
					a3: 'a) he dicho.\n  b) Habéis abierto.\n  c) ha puesto.',
					q4: '4. Conjuga los verbos reflexivos en Presente de Indicativo según el sujeto :\n  a) Mis amigos y yo (despertarse, e pasa a ie) a las seis.\n  b) Tú (vestirse, e pasa a i) con sencillez y orden.\n  c) La familia (reunirse) cada tarde para conversar.',
					a4: 'a) nos despertamos (sin diptongación en nosotros).\n  b) te vistes.\n  c) se reúne.',
					pairs: [
						{ left: 'decir (participio)', right: 'dicho' },
						{ left: 'abrir (participio)', right: 'abierto' },
						{ left: 'poner (participio)', right: 'puesto' },
						{ left: 'poder (1.ª pers. Indefinido)', right: 'pude' }
					],
					explanation:
						'مراجعة أسماء المفعول الشاذة (dicho, abierto, puesto) والماضي المنقطع الشاذ لـ poder (pude).'
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
					content: '1. Completa la tabla de derivación léxica (Verbo | Sustantivo | Adjetivo) :',
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
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'linguistic_competence',
				quizQuestion: {
					type: 'matching',
					questionText: 'Relaciona cada elemento de la izquierda con su forma verbal o valor correspondiente a la derecha:',
					questionTextAr: 'صل كل عنصر في اليمين بالصيغة أو الدلالة الزمنية الموافقة له في اليسار:',
					questionData: {
						pairs: v.pairs
					},
					explanation: v.explanation
				},
				sujetExercise: {
					customTitle: 'II. Competencia lingüística',
					points: 7,
					instruction: 'Resuelve los siguientes ejercicios de léxico, morfología y gramática :',
					content
				},
				hints: [
					'في جدول العائلة اللغوية، انتبه للنهايات القياسية للاسم (-ción, -o, -dad) والصفة (-ado, -ivo, -uoso, -ble).',
					'استعن بالمؤشرات الزمنية (hoy / ayer / antes) قبل تصريف أي فعل ماضٍ.',
					'تذكّر أن أسماء المفعول الشاذة (escrito, hecho, dicho, abierto, puesto, vuelto) لا تنتهي بـ -ado أو -ido.'
				],
				solutionStepsAr: [
					'إكمال جدول العائلة اللغوية (2.0 نقطة).',
					'تصريف الأفعال بدقة في أزمنة الماضي الثلاثة (2.0 نقطة).',
					'توظيف المركبات الفعلية أو التحويل الصحيح للأزمنة (1.5 نقطة).',
					'ضبط المؤشرات الزمنية أو الأفعال الانعكاسية (1.5 نقطة).'
				],
				finalAnswer: v.pairs.map((p) => `${p.left} = ${p.right}`).join(' | ')
			};
		}
	},

	// 4. Competencia lingüística (7 pts) — drag_drop quiz + saveSpanishSvgAsset
	{
		id: 'spa_tpl_2as_le_t1_ling_ser_estar_lexico',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'gramatica_sintaxis',
		titleAr: 'II. Competencia lingüística : Contraste ser / estar, perífrasis y clasificación léxica (7 pts)',
		curriculumLessonId: 'spa_lesson_2as_le_t1_perifrasis_ser_estar',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					svgSlug: 'spa_2as_t1_ling_ser_estar_v0',
					svgContent: svgSpanishConjugationChart({
						title: 'Usos esenciales: SER vs ESTAR',
						subtitle: 'Cualidad e identidad vs Ubicación y estado',
						width: 560,
						columns: [
							{
								header: 'SER',
								rule: 'Identidad, origen, hora',
								examples: 'Soy de Argel. Es puntual.'
							},
							{
								header: 'ESTAR',
								rule: 'Lugar, ánimo, gerundio',
								examples: 'Está en Orán. Está feliz.'
							},
							{
								header: 'CAMBIO DE SENTIDO',
								rule: 'Adjetivo + ser / estar',
								examples: 'ser listo / estar listo'
							}
						]
					}),
					svgCaption: 'Esquema contrastivo de los verbos ser y estar',
					classPrompt:
						'1. Clasifica las siguientes palabras del Ámbito Personal en las tres columnas de la tabla (trabajador, senderismo, sincero, lectura, respetuoso, solidaridad, voluntariado, paciencia, generosidad) :',
					classCols: [
						{ header: 'Adjetivos de carácter', items: ['trabajador', 'sincero', 'respetuoso'], mark: '0.5' },
						{ header: 'Valores y virtudes', items: ['solidaridad', 'paciencia', 'generosidad'], mark: '0.5' },
						{ header: 'Ocio sano', items: ['senderismo', 'lectura', 'voluntariado'], mark: '0.5' }
					],
					q2: '2. Completa con «ser» o «estar» conjugados en Presente de Indicativo :\n  a) Tremecén ............ en el oeste de Argelia y ............ una ciudad célebre por su historia.\n  b) Mis compañeros ............ muy contentos hoy porque ............ preparando la exposición.\n  c) La puerta de la biblioteca ............ abierta desde las ocho, aunque el edificio ............ antiguo.\n  d) ¿Qué hora ............ ahora? ............ las nueve y media de la mañana.',
					a2: 'a) está (ubicación) / es (definición).\n  b) están (ánimo) / están (gerundio).\n  c) está (resultado) / es (cualidad permanente).\n  d) es / Son (la hora).',
					q3: '3. Explica la diferencia de significado y completa cada pareja con «ser» o «estar» :\n  a) Sara ............ muy lista (inteligente), pero todavía no ............ lista (preparada) para salir.\n  b) El ejercicio ............ aburrido (tedioso por naturaleza), por eso los alumnos ............ aburridos (sienten tedio).\n  c) Esta fruta ............ muy buena (sabrosa) y el alumno ............ bueno (de buen carácter).',
					a3: 'a) es lista (ذكية) / está lista (مستعدة).\n  b) es aburrido (ممل) / están aburridos (يشعرون بالملل).\n  c) está buena (لذيذة) / es bueno (طيب الخلق).',
					q4: '4. Transforma estas frases utilizando «hay que + inf.» o «tener que + inf.» y busca el sinónimo de «educado» y «comenzar» :\n  a) Es obligatorio cuidar el material escolar. (hay que)\n  b) Vosotros debéis llegar puntuales al aula. (tener que)\n  c) Sinónimos : educado = ............ ; comenzar = ............ .',
					a4: 'a) Hay que cuidar el material escolar.\n  b) Tenéis que llegar puntuales al aula.\n  c) educado = cortés / respetuoso ; comenzar = empezar.',
					ddStem: 'Clasifica cada uso o expresión según corresponda a «SER» o «ESTAR»:',
					ddCategories: ['Usos de SER', 'Usos de ESTAR'],
					ddItems: [
						{ text: 'Expresar la hora (Son las diez)', category: 0 },
						{ text: 'Indicar nacionalidad u origen (Soy de Blida)', category: 0 },
						{ text: 'Indicar ubicación geográfica (Córdoba está en España)', category: 1 },
						{ text: 'Expresar estado de ánimo pasajero (Está contento hoy)', category: 1 }
					]
				},
				{
					svgSlug: 'spa_2as_t1_ling_ser_estar_v1',
					svgContent: svgSpanishConjugationChart({
						title: 'Perífrasis verbales frecuentes (2AS LE)',
						subtitle: 'Obligación, proceso continuo y acción reciente',
						width: 560,
						columns: [
							{
								header: 'Obligación',
								rule: 'tener que / deber + inf.',
								examples: 'Tengo que repasar hoy.'
							},
							{
								header: 'Continuidad',
								rule: 'seguir / estar + ger.',
								examples: 'Sigo leyendo en español.'
							},
							{
								header: 'Inmediatez',
								rule: 'acabar de / ir a + inf.',
								examples: 'Acabo de llegar.'
							}
						]
					}),
					svgCaption: 'Cuadro de perífrasis verbales de obligación, continuidad e inmediatez',
					classPrompt:
						'1. Clasifica estas seis expresiones según su función en la tabla (Me llamo Salma, Tengo que estudiar, Tengo dieciséis años, Sigo practicando, Acabo de leer, Vivo en Annaba) :',
					classCols: [
						{ header: 'Presentación personal', items: ['Me llamo Salma', 'Tengo dieciséis años', 'Vivo en Annaba'], mark: '0.5' },
						{ header: 'Obligación / Continuidad', items: ['Tengo que estudiar', 'Sigo practicando'], mark: '0.5' },
						{ header: 'Pasado reciente', items: ['Acabo de leer'], mark: '0.5' }
					],
					q2: '2. Elige entre «ser» o «estar» conjugados en Presente o Imperfecto según el contexto :\n  a) El diccionario ............ sobre la mesa de la biblioteca.\n  b) Mi profesora de español ............ de Constantina y ............ muy paciente.\n  c) Ayer por la tarde todos los estudiantes ............ muy atentos durante la charla.\n  d) La mesa del aula ............ de madera resistente.',
					a2: 'a) está (localización).\n  b) es (origen) / es (carácter).\n  c) estaban o estuvieron (estado de atención).\n  d) es (material).',
					q3: '3. Construye perífrasis verbales correctas con los elementos dados :\n  a) Hace un momento / nosotros / acabar de / terminar / el diálogo.\n  b) Todos los días / Nadia / seguir / mejorar / su pronunciación.\n  c) El próximo lunes / vosotros / ir a / visitar / la Biblioteca Nacional.',
					a3: 'a) Acabamos de terminar el diálogo.\n  b) Nadia sigue mejorando su pronunciación.\n  c) El próximo lunes vais a visitar la Biblioteca Nacional.',
					q4: '4. Da el antónimo de estas palabras de carácter y rutina añadiendo un prefijo negativo o usando otra palabra :\n  a) ordenado = ............ ; b) paciente = ............ ; c) temprano = ............ .',
					a4: 'a) desordenado ; b) impaciente ; c) tarde.',
					ddStem: 'Clasifica cada perífrasis verbal según la idea que expresa:',
					ddCategories: ['Obligación o Futuro próximo', 'Continuidad o Pasado reciente'],
					ddItems: [
						{ text: 'tener que estudiar', category: 0 },
						{ text: 'ir a presentar el proyecto', category: 0 },
						{ text: 'seguir practicando español', category: 1 },
						{ text: 'acabar de entregar la tarea', category: 1 }
					]
				},
				{
					svgSlug: 'spa_2as_t1_ling_ser_estar_v2',
					svgContent: svgSpanishConjugationChart({
						title: 'Verbos reflexivos y gustos personales',
						subtitle: 'Rutina diaria y concordancia con gustar',
						width: 560,
						columns: [
							{
								header: 'Reflexivos',
								rule: 'me, te, se, nos, os, se',
								examples: 'me levanto, nos vestimos'
							},
							{
								header: 'Singular (gusta)',
								rule: 'Sustantivo sing. o inf.',
								examples: 'Me gusta leer novelas.'
							},
							{
								header: 'Plural (gustan)',
								rule: 'Sustantivo en plural',
								examples: 'Me gustan los libros.'
							}
						]
					}),
					svgCaption: 'Resumen de verbos reflexivos y estructura de gustos en español',
					classPrompt:
						'1. Clasifica estos seis elementos en la tabla según la estructura gramatical (me gusta leer, me levanto temprano, me gustan los mapas, me visto deprisa, me interesa la historia, me acuesto a las diez) :',
					classCols: [
						{ header: 'Rutina (Reflexivos)', items: ['me levanto temprano', 'me visto deprisa', 'me acuesto a las diez'], mark: '0.5' },
						{ header: 'Gustar / Interesar (Sing.)', items: ['me gusta leer', 'me interesa la historia'], mark: '0.5' },
						{ header: 'Gustar (Plural)', items: ['me gustan los mapas'], mark: '0.5' }
					],
					q2: '2. Completa con «ser» o «estar» en la forma correcta del Presente :\n  a) ¿Dónde ............ el Instituto de Lenguas? ............ cerca del parque central.\n  b) Mis padres ............ profesores y ............ muy orgullosos de mi esfuerzo.\n  c) La comida de mi madre ............ muy buena (sabrosa), pero el restaurante hoy ............ cerrado.\n  d) Yo ............ estudiante de segundo año y hoy ............ preparado para el control.',
					a2: 'a) está / Está (ubicación).\n  b) son (profesión) / están (estado emocional).\n  c) está (sabor) / está (estado resultado).\n  d) soy (identidad) / estoy (preparado).',
					q3: '3. Corrige el error gramatical en cada una de estas cuatro frases habituales :\n  a) Yo soy dieciséis años.\n  b) Argel es en el norte de África.\n  c) A mi hermano le gusta los deportes sanos.\n  d) Nosotros nos despiertamos a las seis.',
					a3: 'a) Yo tengo dieciséis años.\n  b) Argel está en el norte de África.\n  c) A mi hermano le gustan los deportes sanos.\n  d) Nosotros nos despertamos a las seis.',
					q4: '4. Completa con la palabra interrogativa correcta con tilde (Cómo, Cuántos, Dónde, Qué) :\n  a) ¿............ idiomas hablas con fluidez?\n  b) ¿............ está situada la Mezquita de Córdoba?\n  c) ¿............ te organizas para estudiar por la tarde?',
					a4: 'a) Cuántos ; b) Dónde ; c) Cómo.',
					ddStem: 'Clasifica las oraciones según sean gramaticalmente correctas o incorrectas en español:',
					ddCategories: ['Oración correcta', 'Oración incorrecta (error frecuente)'],
					ddItems: [
						{ text: 'Tengo dieciséis años y vivo en Blida.', category: 0 },
						{ text: 'Granada está en el sur de España.', category: 0 },
						{ text: 'Soy dieciséis años y vivo Blida.', category: 1 },
						{ text: 'Granada es en el sur de España.', category: 1 }
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
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'linguistic_competence',
				quizQuestion: {
					type: 'drag_drop',
					questionText: v.ddStem,
					questionTextAr: 'صنّف العبارات الآتية بسحب كل منها إلى الفئة النحوية المناسبة:',
					questionData: {
						categories: v.ddCategories,
						items: rng.shuffle(v.ddItems)
					},
					explanation:
						'نستعمل ser للهوية والأصل والمهنة والساعة، وestar للموقع الجغرافي والحالة الظرفية والفعل المستمر، وننتبه لضبط المركبات الفعلية.'
				},
				sujetExercise: {
					customTitle: 'II. Competencia lingüística',
					points: 7,
					instruction: 'Completa las actividades lingüísticas propuestas a continuación :',
					content
				},
				hints: [
					'الموقع الجغرافي للمدن والدول والمباني يأخذ دائماً الفعل estar وليس ser.',
					'مع tener que و acabar de و ir a يأتي الفعل الثاني في المصدر، ومع seguir يأتي في صيغة gerundio (-ando / -iendo).',
					'تحقق في أفعال الإدغام الصوتي من عدم تغيير الجذر مع nosotros و vosotros.'
				],
				solutionStepsAr: [
					'تصنيف المفردات أو التراكيب في الجدول الثلاثي (1.5 نقطة).',
					'التمييز الدقيق بين ser و estar في السياق (2.0 نقطة).',
					'إنجاز التحويلات بالمركبات الفعلية أو تصحيح الأخطاء (2.0 نقطة).',
					'إيجاد الأضداد أو المترادفات أو أدوات الاستفهام المنبورة (1.5 نقطة).'
				],
				finalAnswer: v.ddItems.map((it) => `${it.text} : ${v.ddCategories[it.category]}`).join(' | ')
			};
		}
	},

	// 5. Expresión escrita (6 pts, integration) — ordering quiz
	{
		id: 'spa_tpl_2as_le_t1_writ_presentacion_rutina',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'expresion_escrita',
		titleAr: 'III. Expresión escrita : Presentación personal y rutina diaria equilibrada (6 pts)',
		curriculumLessonId: 'spa_lesson_2as_le_t1_ambito_personal_rutina',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					temaUnoPrompt:
						'Redacta un texto de presentación personal (100 a 130 palabras) dirigido a un estudiante corresponsal hispanohablante para presentarte y explicar cómo organizas tu rutina diaria sana.',
					temaUnoNotas: [
						'Saludo e identidad completa: nombre, edad, ciudad argelina y estudios en 2AS Lenguas Extranjeras.',
						'Descripción breve de tu familia y de dos rasgos positivos de tu carácter (responsable, solidario, constante).',
						'Rutina diaria con verbos reflexivos (despertarse, organizarse, repasar) y ocio sano (lectura, deporte, senderismo).',
						'Cierre cordial con una pregunta sobre su país o su instituto.'
					],
					temaDosPrompt:
						'Escribe un relato personal breve (100 a 130 palabras) contando una jornada educativa o excursión familiar memorable del curso pasado, combinando Pretérito Imperfecto y Pretérito Indefinido.',
					modelAnswer:
						'¡Hola, amigo! Me llamo Amin, tengo dieciséis años y vivo en Constantina, una ciudad histórica del este de Argelia. Estudio segundo año de bachillerato en la rama de Lenguas Extranjeras porque me apasionan el árabe, el francés, el inglés y el español.\n\nVivo con mis padres y mi hermana pequeña en un ambiente muy unido. Me considero una persona responsable, educada y trabajadora. Todos los días me despierto a las seis y media, desayuno en familia y salgo hacia el instituto. Por la tarde repaso mis apuntes con orden y, en mi tiempo libre, me gusta leer libros de historia o practicar natación.\n\nY tú, ¿cómo es tu rutina diaria en tu instituto? ¡Espero tu respuesta pronto!',
					rubricSummary:
						'Adecuación a las pautas y extensión (2.0 pts) | Uso correcto de verbos reflexivos, ser/estar y presente (2.0 pts) | Coherencia, vocabulario del Ámbito Personal y ortografía (2.0 pts)',
					orderedSteps: [
						'¡Hola! Me llamo Amin, tengo dieciséis años y vivo en Constantina.',
						'Estudio segundo año de Lenguas Extranjeras porque me interesan mucho los idiomas.',
						'Todos los días me despierto temprano, repaso mis clases y practico deporte sano.',
						'¿Cómo organizas tú tu jornada escolar? ¡Espero pronto tu carta!'
					],
					orderExplanation:
						'تبدأ بطاقة التقديم بالتحية والاسم والعمر والمدينة، ثم الدراسة، فالروتين اليومي، وتختم بسؤال وتوديع لطيف.'
				},
				{
					temaUnoPrompt:
						'Escribe un artículo breve (100 a 130 palabras) para la revista de tu instituto explicando qué hábitos diarios permiten a un alumno de 2AS LE equilibrar el estudio, la familia y el descanso sano.',
					temaUnoNotas: [
						'Importancia de levantarse temprano y planificar un horario claro sin distracciones digitales.',
						'Uso de perífrasis verbales de obligación y continuidad (tener que + inf., seguir + gerundio, hay que + inf.).',
						'Papel de la lectura diaria, el deporte moderado y la colaboración solidaria en casa.',
						'Conclusión motivadora con una recomendación práctica.'
					],
					temaDosPrompt:
						'Presenta a un miembro admirable de tu familia (tu padre, tu madre o tu abuelo) en 100 a 130 palabras, destacando su carácter, su profesión o actividad diaria y un buen consejo que siempre te ha dado.',
					modelAnswer:
						'Organizar bien el tiempo es clave para avanzar con serenidad en segundo año de Lenguas Extranjeras. Muchos estudiantes pierden horas valiosas frente al teléfono, pero es posible lograr un equilibrio sano cada día.\n\nEn primer lugar, tenemos que levantarnos temprano y fijar un horario realista para repasar las asignaturas principales. Además, hay que evitar las pantallas durante el estudio para mantener la concentración. Por la tarde, después de cumplir con los deberes, conviene ayudar en casa y dedicar tiempo a la lectura o al deporte al aire libre.\n\nEn conclusión, si seguimos practicando la disciplina y el descanso adecuado, alcanzaremos excelentes resultados escolares sin agotamiento.',
					rubricSummary:
						'Pertinencia y estructura en tres partes (2.0 pts) | Empleo adecuado de perífrasis verbales y reflexivos (2.0 pts) | Riqueza léxica, puntuación y ortografía (2.0 pts)',
					orderedSteps: [
						'Organizar bien el tiempo es fundamental para progresar con serenidad en el instituto.',
						'En primer lugar, tenemos que fijar un horario claro sin distracciones digitales.',
						'Además, por la tarde conviene combinar la lectura, la ayuda familiar y el deporte.',
						'En conclusión, la constancia diaria garantiza el éxito escolar y el bienestar personal.'
					],
					orderExplanation:
						'يتدرج المقال الإرشادي من الفكرة العامة إلى النصيحة الأولى ثم الإضافة ويُختم بالاستنتاج.'
				},
				{
					temaUnoPrompt:
						'Narra en primera persona (100 a 130 palabras) una experiencia positiva que hayas vivido este trimestre en clase de español o en la biblioteca escolar, combinando los tiempos del pasado.',
					temaUnoNotas: [
						'Situación inicial en Pretérito Imperfecto (cómo era el aula o qué hacías antes).',
						'Hechos concretos en Pretérito Indefinido (qué ocurrió aquel día) y Pretérito Perfecto (qué has aprendido esta semana).',
						'Uso correcto de al menos dos conectores temporales y del contraste ser / estar.',
						'Valoración personal final sobre tu progreso en español.'
					],
					temaDosPrompt:
						'Describe tu ciudad natal y un lugar tranquilo donde te gusta leer o estudiar (100 a 130 palabras), usando correctamente «ser», «estar» y adjetivos precisos.',
					modelAnswer:
						'Al principio del trimestre, leer textos largos en español me parecía bastante difícil y siempre dudaba al hablar en clase. La biblioteca del instituto estaba llena de libros interesantes, pero yo todavía no me atrevía a consultarlos.\n\nSin embargo, el martes pasado nuestro profesor organizó un taller en parejas. Cada alumno eligió un texto corto sobre ciudades hispanohablantes y preparó un resumen oral. Durante la actividad yo estuve muy atento y descubrí que entendía muchas palabras gracias al árabe.\n\nEsta semana ya he leído dos capítulos completos por mi cuenta y acabo de terminar mi primer cuaderno de vocabulario. Ahora estoy muy ilusionado y sigo practicando cada día con confianza.',
					rubricSummary:
						'Coherencia narrativa y respuesta al tema (2.0 pts) | Alternancia exacta de Imperfecto, Indefinido y Perfecto (2.0 pts) | Léxico apropiado y corrección ortográfica (2.0 pts)',
					orderedSteps: [
						'Al principio del trimestre, leer textos extensos en español me resultaba bastante difícil.',
						'Sin embargo, el martes pasado nuestro profesor organizó un taller práctico en la biblioteca.',
						'Durante aquella sesión estuve muy atento y redacté mi primer resumen sin errores.',
						'Esta semana ya he leído dos relatos completos y sigo practicando con entusiasmo.'
					],
					orderExplanation:
						'يسير السرد من الوضعية السابقة (Imperfecto) إلى الحدث المحوري (Indefinido) ثم النتيجة القريبة (Perfecto).'
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
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'ordering',
					questionText: 'Ordena las cuatro partes siguientes para construir un texto español coherente (del inicio a la conclusión):',
					questionTextAr: 'رتّب الجمل الأربع الآتية لتكوين فقرة إسبانية منسجمة من المقدمة إلى الخاتمة:',
					questionData: {
						items: scrambled.items,
						correctOrder: scrambled.correctOrder
					},
					explanation: v.orderExplanation
				},
				sujetExercise: {
					customTitle: 'III. Expresión escrita',
					points: 6,
					instruction: 'Elige UNO de los dos temas propuestos y redacta un texto coherente (100 a 130 palabras) :',
					content: [block]
				},
				hints: [
					'احترم التقسيم إلى ثلاث فقرات واضحة: مقدمة وجيزة، عرض منظم، وخاتمة لطيفة.',
					'إذا اخترت الموضوع الموجّه، أدرج كل عناصر Pautas في جمل مترابطة وتجنب سردها كنقاط.',
					'راجع علامات ¿...? و ¡...! والنبرة الصوتية والتوافق بين الفاعل والفعل قبل إنهاء التحرير.'
				],
				solutionStepsAr: [
					'استيفاء مضمون الموضوع المختار وتغطية جميع النقاط الموجّهة (2.0 نقطة).',
					'توظيف التراكيب المقررة (الأفعال الانعكاسية، ser/estar، أزمنة الماضي) بدقة (2.0 نقطة).',
					'سلامة الإملاء والترقيم الإسباني وتنظيم الفقرات (2.0 نقطة).'
				],
				finalAnswer: v.orderedSteps.join(' → ')
			};
		}
	},

	// 6. Expresión escrita (6 pts, integration) — cloze quiz
	{
		id: 'spa_tpl_2as_le_t1_writ_mundo_puente',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'expresion_escrita',
		titleAr: 'III. Expresión escrita : El idioma español como puente cultural y el pasado reciente (6 pts)',
		curriculumLessonId: 'spa_lesson_2as_le_t1_mundo_hispanohablante',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): SpanishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					temaUnoPrompt:
						'Redacta un texto expositivo-personal (100 a 130 palabras) explicando por qué aprender español resulta enriquecedor y cercano para un estudiante argelino de Lenguas Extranjeras.',
					temaUnoNotas: [
						'Extensión mundial del español (más de veinte países en Europa, América y África).',
						'Cercanía geográfica mediterránea e histórica entre Argelia y el mundo hispano.',
						'Ejemplos concretos de arabismos cotidianos (algodón, azúcar, alcalde, acequia, ojalá).',
						'Beneficios académicos y culturales para tu futuro como estudiante de lenguas.'
					],
					temaDosPrompt:
						'Imagina que recibes en tu ciudad a un estudiante hispanohablante de intercambio escolar. Redacta una guía breve (100 a 130 palabras) presentándole tu región, las costumbres de hospitalidad argelina y dos lugares históricos interesantes.',
					modelAnswer:
						'Estudiar español en la rama de Lenguas Extranjeras representa una oportunidad muy valiosa para los jóvenes argelinos. En primer lugar, el español es lengua oficial en veintiún países y nos permite dialogar con millones de personas en Europa, América y África.\n\nAdemás, al aprender este idioma descubrimos una cercanía histórica fascinante. En el léxico español existen miles de arabismos cotidianos, como azúcar, algodón, alcalde, acequia y ojalá, que nos recuerdan los lazos científicos y culturales del Mediterráneo. Reconocer estas raíces hace que el vocabulario sea más fácil de recordar.\n\nEn conclusión, dominar el español amplía nuestros horizontes intelectuales y nos prepara para compartir la riqueza de nuestra propia cultura con respeto y rigor.',
					rubricSummary:
						'Respuesta completa al tema y ejemplos precisos de arabismos (2.0 pts) | Corrección morfosintáctica y uso exacto de ser/estar (2.0 pts) | Cohesión mediante conectores, ortografía y claridad (2.0 pts)',
					clozeSentence: 'Más de cuatro mil palabras españolas de origen árabe, como azúcar o algodón, se ___ arabismos.',
					clozeCorrect: 'llaman',
					clozeDistractors: ['tienen', 'están', 'hacen'],
					clozeExplanation:
						'للتسمية بالصيغة الانعكاسية الجمع نستعمل «se llaman» (تُسمّى).'
				},
				{
					temaUnoPrompt:
						'Escribe una redacción breve (100 a 130 palabras) dando consejos prácticos a un compañero de 1AS que empieza a estudiar español el próximo curso y desea organizarse bien desde el principio.',
					temaUnoNotas: [
						'Recomendaciones sobre la pronunciación y los signos dobles de interrogación y exclamación (¿...?, ¡...!).',
						'Uso de las perífrasis verbales de obligación y continuidad (tener que + inf., deber + inf., seguir + ger.).',
						'Consejos sobre el uso del diccionario y la lectura gradual de textos cortos.',
						'Ánimo final destacando la constancia y el respeto.'
					],
					temaDosPrompt:
						'Cuenta en 100 a 130 palabras cómo pasaste tus últimas vacaciones en familia en una región de Argelia, utilizando correctamente el Pretérito Indefinido y el Pretérito Imperfecto.',
					modelAnswer:
						'¡Bienvenido al fascinante estudio del español! Si quieres avanzar con seguridad desde el primer trimestre, tienes que adoptar hábitos sencillos pero constantes.\n\nEn primer lugar, debes prestar mucha atención a la ortografía propia de esta lengua, especialmente a la tilde y a los signos dobles al principio y al final de las preguntas y exclamaciones. Además, te aconsejo llevar un cuaderno ordenado para anotar las familias de palabras y las expresiones más útiles. No olvides leer pequeños textos cada semana y consultar un buen diccionario bilingüe cuando encuentres dudas.\n\nEn definitiva, si sigues practicando diez minutos diarios con ilusión y constancia, lograrás hablar y escribir español con gran soltura.',
					rubricSummary:
						'Claridad del propósito orientador y uso de las pautas (2.0 pts) | Empleo correcto de perífrasis verbales e imperativo o presente (2.0 pts) | Coherencia, léxico educativo y acentuación (2.0 pts)',
					clozeSentence: 'Para aprobar todas las asignaturas con serenidad, los estudiantes ___ que organizar su horario diario.',
					clozeCorrect: 'tienen',
					clozeDistractors: ['acaban', 'siguen', 'están'],
					clozeExplanation:
						'المركب الفعلي للإلزام هو «tener que + infinitivo» (tienen que organizar).'
				},
				{
					temaUnoPrompt:
						'Redacta un texto breve (100 a 130 palabras) describiendo el encuentro reciente entre dos estudiantes de distintas regiones de Argelia en un concurso escolar de idiomas, empleando Pretérito Perfecto, Indefinido y el contraste ser / estar.',
					temaUnoNotas: [
						'Presentación de ambos alumnos (origen geográfico con «ser de» y ubicación del evento con «estar en»).',
						'Relato de cómo se conocieron y prepararon la prueba oral en Pretérito Indefinido.',
						'Balance de lo que han logrado esta semana en Pretérito Perfecto.',
						'Reflexión final sobre la amistad sana, el respeto y el amor al conocimiento.'
					],
					temaDosPrompt:
						'Redacta un perfil personal (100 a 130 palabras) explicando qué cualidades valoras más en un buen amigo o compañero de clase y cómo colaboráis juntos en el instituto.',
					modelAnswer:
						'El jueves pasado se celebró en Argel un encuentro regional de estudiantes de Lenguas Extranjeras. El certamen estuvo muy bien organizado en la biblioteca central, donde coincidieron Salma, que es de Ghardaïa, y Nadia, que viene de Orán.\n\nAl principio ambas estaban un poco nerviosas, pero enseguida conversaron con naturalidad sobre sus lecturas favoritas y prepararon juntas un diálogo en español. Durante la presentación mostraron gran seguridad y recibieron el aplauso de todos los asistentes.\n\nEsta semana las dos amigas ya han intercambiado apuntes y han decidido seguir colaborando a distancia. Sin duda, el estudio serio crea lazos de respeto y compañerismo duraderos.',
					rubricSummary:
						'Coherencia narrativa y desarrollo de las cuatro pautas (2.0 pts) | Precisión en Pretérito Indefinido, Perfecto y ser/estar (2.0 pts) | Léxico variado, ortografía y signos de puntuación (2.0 pts)',
					clozeSentence: 'La biblioteca central donde celebraron el encuentro ___ situada en el corazón de la ciudad.',
					clozeCorrect: 'está',
					clozeDistractors: ['es', 'tiene', 'hay'],
					clozeExplanation:
						'لتحديد الموقع المكاني أو الجغرافي لمبنى أو مدينة نستعمل دائماً الفعل estar (está situada).'
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
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'cloze',
					questionText: 'Completa la frase con la forma verbal más adecuada:',
					questionTextAr: 'أكمل الجملة الإسبانية بالفعل الصحيح نحوياً:',
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
					instruction: 'Elige UNO de los dos temas propuestos y escribe una redacción clara (100 a 130 palabras) :',
					content: [block]
				},
				hints: [
					'التزم بعدد الكلمات المطلوب (100 إلى 130 كلمة) واكتب بجمل واضحة خالية من الحشو.',
					'وظّف أدوات الربط البسيطة والفعالة مثل en primer lugar, además, sin embargo, en conclusión.',
					'تحقق من تطابق الصفة مع الموصوف في التذكير والتأنيث والإفراد والجمع.'
				],
				solutionStepsAr: [
					'تحديد الفكرة المحورية والالتزام بالموضوع المختار (2.0 نقطة).',
					'توظيف القواعد المدروسة في الفصل الأول بدقة (2.0 نقطة).',
					'الترابط النصي وسلامة الإملاء والترقيم (2.0 نقطة).'
				],
				finalAnswer: v.clozeCorrect
			};
		}
	}
];
