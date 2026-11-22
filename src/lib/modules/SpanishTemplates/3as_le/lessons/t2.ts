import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';
import {
	svgSpanishConjugationChart,
	svgSpanishGrammarMap,
	svgSpanishTenseTimeline
} from '../../svg-spanish';
import type { SpanishInteractiveLessonData } from '../../types';

/**
 * 3AS BAC Foreign Languages (لغات أجنبية — yearSubjectId: 793, coeff 4, 03h00, 7+7+6=20)
 * Interactive Lessons — Trimestre 2 : Ámbito Científico-Tecnológico & Medio Ambiente (4 lessons)
 */
export const LESSONS_3AS_LE_T2: SpanishInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 1: Ámbito Científico-Tecnológico — Nuevas tecnologías y uso responsable
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_lesson_3as_le_t2_tecnologia_responsable',
		slug: 'spa-3as-le-t2-tecnologia-responsable',
		grade: '3as_le',
		yearSubjectId: 793,
		trimesterId: 't2',
		sequenceId: 'unidad2',
		sequenceTitleAr: 'المحور الثالث والرابع: التكنولوجيا المسؤولة والبيئة والطاقات النظيفة (Ciencia, Tecnología y Medio Ambiente)',
		order: 1,
		titleAr: 'التكنولوجيات الحديثة، محو الأمية الرقمية والاستعمال المسؤول (Las nuevas tecnologías y el uso responsable)',
		objectives: [
			'تحليل نصوص المحور العلمي والتكنولوجي في البكالوريا حول إيجابيات الرقمنة ومخاطر الإدمان الرقمي والتضليل المعلوماتي',
			'توظيف المعجم التقني والأخلاقي (alfabetización digital, privacidad, fuentes fiables, brecha digital, criterio crítico) بدقة',
			'الموازنة في الإجابات الحجاجية بين فوائد التكنولوجيا التعليمية وضرورة حماية الخصوصية والتركيز الدراسي'
		],
		keywordsAr: [
			'Alfabetización digital (محو الأمية الرقمية)',
			'Privacidad (الخصوصية)',
			'Fuentes fiables (المصادر الموثوقة)',
			'Uso responsable (الاستعمال المسؤول)',
			'Inteligencia artificial (الذكاء الاصطناعي)',
			'Brecha digital (الفجوة الرقمية)'
		],
		discover: {
			scenarioAr:
				'تركّز نصوص الفصل الثاني في BAC 3AS LE على التحوّل الرقمي (la transformación digital): كيف نستفيد من المنصات التعليمية والمكتبات الرقمية والذكاء الاصطناعي دون الوقوع في الكسل الذهني أو انتهاك الخصوصية أو تصديق الشائعات؟',
			svg: renderLessonIllustration('spa_05_tecnologia_comunicacion_responsable', {
				lang: 'es',
				pins: []
			}),
			steps: [
				{
					promptAr: 'ما المقصود بمفهوم «la alfabetización digital» في نصوص البكالوريا الحديثة؟ هل هو مجرد امتلاك هاتف ذكي؟',
					hintAr: 'فكر في القدرة على التحقق من المصادر، حماية البيانات، واستعمال الأدوات الرقمية بوعي أخلاقي.',
					expectedInput: 'القدرة على استخدام التكنولوجيا بوعي نقدي والتحقق من موثوقية المعلومات وحماية الخصوصية',
					revealAr: 'Alfabetización digital تعني التمكّن من البحث المنظم، تمييز الخبر الصحيح عن المضلّل (desinformación)، واحترام الأمان الرقمي (ciberseguridad).'
				},
				{
					promptAr: 'في الجملة: «La herramienta tecnológica es un excelente servidor, pero un pésimo amo», كيف تلخص موقف الكاتب؟',
					hintAr: 'الكاتب يميز بين التكنولوجيا كوسيلة مساعدة وبين السيطرة على حياة الطالب.',
					expectedInput: 'التكنولوجيا نافعة عندما يوجّهها الإنسان بعقلانية، ومضرّة إذا تحكّمت في وقته وإرادته',
					revealAr: 'يعتمد كتّاب البكالوريا هذه المقابلة المعتدلة: إثبات الفائدة العلمية للتكنولوجيا مع التحذير من الإفراط والتبعية الرقمية.'
				},
				{
					promptAr: 'اذكر طريقتين عمليتين لحماية الخصوصية والأصالة الفكرية أثناء التحضير للبكالوريا عبر الإنترنت.',
					hintAr: 'فكر في كلمات المرور ومراجعة المصادر الأكاديمية والاعتماد على الجهد الشخصي.',
					expectedInput: 'عدم نشر البيانات الشخصية، والتحقق من المصادر العلمية المعتمدة وتجنب النسخ الآلي',
					revealAr: 'حماية البيانات (protección de datos) والأمانة العلمية (integridad académica) ركيزتان محوريتان في أسئلة التفكير النقدي لهذا المحور.'
				}
			]
		},
		summary: {
			rulesAr: [
				'إشكالية المحور التكنولوجي: التكنولوجيا ليست خيراً مطلقاً ولا شراً مطلقاً؛ بل تتوقف قيمتها على حسن توظيف الإنسان لها (un uso ético, equilibrado y educativo).',
				'ثنائية المنافع والمخاطر (Ventajas frente a riesgos): من المنافع (Acceso rápido al conocimiento, educación a distancia, traducción técnica, investigación científica)؛ ومن المخاطر (Dependencia de pantallas, noticias falsas, pérdida de privacidad, aislamiento familiar).',
				'تنظيم الجدول المقارن في أسئلة النص (Tabla de clasificación): في البكالوريا قد يُطلب تصنيف عبارات النص إلى «Beneficios / Ventajas» و«Riesgos / Inconvenientes» انطلاقاً من الفقرات بدقة.',
				'موقف الطالب الناضج في التعبير الكتابي: تجنب التطرف (لا رفض أعمى للتقنية ولا انبهار ساذج بها)، واقترح حلولاً واقعية مثل تقنين وقت الشاشات ومقارنة المصادر.'
			],
			visualSvg: svgSpanishGrammarMap({
				title: 'Tecnología y Ética Digital (BAC 3AS LE)',
				rootLabel: 'Alfabetización digital responsable',
				rootSub: 'Equilibrio entre innovación técnica y criterio humano',
				branches: [
					{
						label: 'Educación',
						rule: 'Aulas virtuales y bibliotecas',
						example: 'acceso universal al saber'
					},
					{
						label: 'Verificación',
						rule: 'Contrastar fuentes rigurosas',
						example: 'frenar la desinformación'
					},
					{
						label: 'Privacidad',
						rule: 'Proteger datos personales',
						example: 'navegación segura y cauta'
					},
					{
						label: 'Esfuerzo propio',
						rule: 'Tecnología como mero apoyo',
						example: 'cultivar criterio propio'
					}
				],
				width: 580
			}),
			visualCaptionAr: 'المرتكزات الأربعة للاستعمال المسؤول للتكنولوجيا في نصوص ومقالات البكالوريا.',
			examples: [
				{
					problemAr: 'Pregunta de texto: «Cita dos riesgos de la sobreexposición a las pantallas mencionados habitualmente en el ámbito tecnológico.»',
					solutionAr: 'La disminución de la concentración lectora y la vulnerabilidad ante la desinformación o la pérdida de privacidad.'
				},
				{
					problemAr: 'Síntesis argumentativa breve: «¿Puede la inteligencia artificial sustituir al profesor en el aula?»',
					solutionAr: 'No puede sustituirlo por completo, porque aunque procesa datos con rapidez, carece de empatía pedagógica, criterio ético y acompañamiento humano personalizado.'
				}
			],
			watchOutAr: 'في النصوص الحجاجية حول التكنولوجيا، راقب أدوات الاستدراك مثل «sin embargo, no obstante, aunque»؛ لأنها تكشف انتقال الكاتب من عرض الفوائد إلى التنبيه إلى المخاطر!'
		},
		practice: [
			{
				questionAr: '¿Qué define mejor el concepto de «alfabetización digital» en un contexto académico de BAC LE?',
				options: [
					'Saber buscar, evaluar fuentes fiables y proteger la privacidad con sentido crítico',
					'Pasar toda la noche enviando mensajes sin verificar su veracidad',
					'Copiar respuestas automáticas sin leer ni reflexionar',
					'Compartir datos privados en cualquier sitio desconocido'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: محو الأمية الرقمية يجمع بين المهارة التقنية والنقد المعرفي والأمان الرقمي.',
					'خطأ: هذا سلوك غير منضبط يضعف التركيز.',
					'خطأ: الاتكال الآلي يعطل الفكر النقدي.',
					'خطأ: التفريط في البيانات يهدد الخصوصية.'
				],
				explanationAr: 'تشمل الثقافة الرقمية السليمة مهارة التمحيص، وتوثيق المعلومة، وحماية المعطيات الشخصية.'
			},
			{
				questionAr: 'En un texto expositivo-argumentativo sobre internet, ¿qué función cumple el conector «sin embargo»?',
				options: [
					'Introducir una suma de ejemplos idénticos',
					'Marcar un contraste o límite tras presentar las ventajas iniciales',
					'Indicar la fecha exacta de un acontecimiento histórico',
					'Cerrar definitivamente un diálogo informal'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الإضافة تعبر عنها «además» أو «asimismo».',
					'ممتاز: «sin embargo» أداة استدراك تقابل بين الإيجابيات والمخاطر أو الشروط.',
					'خطأ: ليس رابطاً زمنياً.',
					'خطأ: رابط منطقي أكاديمي للاستدراك.'
				],
				explanationAr: 'تستعمل نصوص التكنولوجيا «sin embargo / no obstante» للانتقال من المزايا إلى المخاطر والضوابط.'
			},
			{
				questionAr: '¿Por qué advierten los textos educativos contra el uso pasivo de herramientas automáticas en el estudio?',
				options: [
					'Porque atrofian el hábito de análisis y la autonomía intelectual del estudiante',
					'Porque las bibliotecas digitales están prohibidas por ley',
					'Porque aprender vocabulario nuevo resulta innecesario',
					'Porque leer libros completos impide aprobar exámenes'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الاعتماد الكلي يضعف التحليل الشخصي والقدرة على الصياغة المستقلة.',
					'خطأ: المكتبات الرقمية وسيلة بحث مفيدة عند توظيفها بوعي.',
					'خطأ: إثراء المعجم أساس النجاح في اللغات.',
					'خطأ: القراءة العميقة ترفع مستوى التحصيل.'
				],
				explanationAr: 'تدعو نصوص المحور العلمي إلى توظيف التقنية لدعم التعلم لا لإلغاء الجهد الذهني.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 2: Medio Ambiente — Cambio climático y energías limpias
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_lesson_3as_le_t2_medio_ambiente_energias',
		slug: 'spa-3as-le-t2-medio-ambiente-energias',
		grade: '3as_le',
		yearSubjectId: 793,
		trimesterId: 't2',
		sequenceId: 'unidad2',
		sequenceTitleAr: 'المحور الثالث والرابع: التكنولوجيا المسؤولة والبيئة والطاقات النظيفة (Ciencia, Tecnología y Medio Ambiente)',
		order: 2,
		titleAr: 'البيئة، التغير المناخي والطاقات النظيفة (El medio ambiente, el cambio climático y las energías limpias)',
		objectives: [
			'تحليل نصوص حماية البيئة والتنمية المستدامة والطاقات المتجددة (شمسية وريحية) في الجزائر وحوض المتوسط',
			'التمييز الدقيق بين أسباب التدهور البيئي (Causas)، نتائجه (Consecuencias)، وحلوله المستدامة (Soluciones)',
			'توظيف المعجم البيئي المتقدم (calentamiento global, energías renovables, desertificación, economía circular, desarrollo sostenible) في الفهم والإنشاء'
		],
		keywordsAr: [
			'Medio ambiente (البيئة)',
			'Energías limpias (الطاقات النظيفة)',
			'Desarrollo sostenible (التنمية المستدامة)',
			'Desertificación (التصحر)',
			'Reciclaje (إعادة التدوير)',
			'Preservación del agua (حماية المياه)'
		],
		discover: {
			scenarioAr:
				'تُبرز نصوص البيئة في بكالوريا الإسبانية الإمكانات الكبيرة للجزائر والمتوسط في الطاقة الشمسية (energía solar fotovoltaica)، وإعادة التشجير (reforestación / السد الأخضر)، وترشيد المياه، مع دعوة الشباب إلى تبنّي سلوك بيئي واعٍ.',
			svg: renderLessonIllustration('spa_04_medio_ambiente_energias_limpias', {
				lang: 'es',
				pins: []
			}),
			steps: [
				{
					promptAr: 'ما الفرق في التحليل البيئي بين «energías fósiles» (الطاقات الأحفورية) و«energías renovables» (الطاقات المتجددة)؟',
					hintAr: 'قارن من حيث الاستدامة والانبعاثات الكربونية.',
					expectedInput: 'الطاقات الأحفورية ملوثة وقابلة للنضوب، أما المتجددة كالشمس والرياح فنظيفة ومستدامة',
					revealAr: 'تُعرف الطاقات النظيفة بأنها inagotables y menos contaminantes (لا تنضب وأقل تلويثاً) مثل الطاقة الشمسية وطاقة الرياح (energía eólica).'
				},
				{
					promptAr: 'صنّف العبارات الآتية إلى سبب (Causa) ونتيجة (Consecuencia): «emisión excesiva de gases» و «avance de la desertificación y sequías prolongadas».',
					hintAr: 'أيّهما يؤدي إلى الآخر؟',
					expectedInput: 'emisión excesiva de gases = Causa | desertificación y sequías = Consecuencia',
					revealAr: 'في تمارين الجدول بالبكالوريا، تتكرر ثنائية (Causas / Consecuencias) أو (Problemas / Soluciones) في نصوص البيئة.'
				},
				{
					promptAr: 'كيف يسهم مفهوم «la economía circular» (الاقتصاد الدائري) و«las tres R» في حماية الموارد؟',
					hintAr: 'تذكر الأفعال الثلاثة: Reducir, Reutilizar, Reciclar.',
					expectedInput: 'عبر التقليل من الاستهلاك، إعادة الاستعمال، وإعادة التدوير للحد من النفايات والتبذير',
					revealAr: 'الاقتصاد الدائري يقوم على تقليص النفايات (reducir residuos)، إعادة التدوير (reciclar)، وترشيد الماء والطاقة، وهو متوافق مع النهي عن الإسراف والتبذير.'
				}
			]
		},
		summary: {
			rulesAr: [
				'محاور نصوص البيئة: الاحتباس الحراري (el calentamiento global)، التصحر وحماية الغابات (la lucha contra la desertificación y los incendios)، ندرة المياه (la escasez hídrica)، والانتقال الطاقوي نحو الطاقات النظيفة.',
				'النموذج الجزائري والمتوسطي: مشاريع الطاقة الشمسية في الجنوب، مشروع السد الأخضر (la Barrera Verde)، وأنظمة السقي التقليدية المقتصدة كالفقارة (las foggaras).',
				'ثنائية التحليل السببي: Causas (tala indiscriminada, combustibles fósiles, despilfarro) مقابل Consecuencias (sequía, pérdida de biodiversidad, olas de calor) و Soluciones (reforestación, energía solar, reciclaje, educación ecológica).',
				'المعجم الدقيق للحفاظ على البيئة: concienciar (التوعية)، preservar (الحفاظ على)، mitigar (التخفيف من)، transición energética (الانتقال الطاقوي)، huella ecológica (البصمة البيئية).'
			],
			visualSvg: svgSpanishGrammarMap({
				title: 'Ecología y Desarrollo Sostenible (BAC 3AS LE)',
				rootLabel: 'Protección ambiental integral',
				rootSub: 'Diagnóstico climático y soluciones sostenibles',
				branches: [
					{
						label: 'Energía solar',
						rule: 'Fuente limpia e inagotable',
						example: 'plantas solares en el Sáhara'
					},
					{
						label: 'Reforestación',
						rule: 'Frenar erosión y desertificación',
						example: 'cuidar bosques y oasis'
					},
					{
						label: 'Agua y ahorro',
						rule: 'Uso racional sin despilfarro',
						example: 'riego eficiente y consumo justo'
					},
					{
						label: 'Reciclaje',
						rule: 'Reducir, reutilizar, reciclar',
						example: 'economía circular local'
					}
				],
				width: 580
			}),
			visualCaptionAr: 'المحاور البيئية والطاقوية الأربعة الأساسية في برنامج الثالثة ثانوي لغات أجنبية.',
			examples: [
				{
					problemAr: 'Pregunta de texto: «¿Por qué constituye el desierto argelino una oportunidad estratégica para la transición energética?»',
					solutionAr: 'Por su elevada radiación solar durante todo el año, lo que permite generar energía eléctrica limpia y reducir la dependencia de los combustibles fósiles.'
				},
				{
					problemAr: 'Propuesta de solución (4 líneas): «¿Qué acciones concretas pueden realizar los estudiantes en su instituto a favor del medio ambiente?»',
					solutionAr: 'Los estudiantes pueden organizar campañas de ahorro de agua y electricidad, instalar puntos de recogida selectiva de papel y plástico, y participar en jornadas de plantación de árboles en el patio escolar y en su barrio.'
				}
			],
			watchOutAr: 'انتبه في النصوص البيئية إلى التمييز بين أفعال زيادة الخطر (agravar, acelerar, amenazar) وأفعال التخفيف والعلاج (frenar, mitigar, paliar, revertir) عند الإجابة عن أسئلة المرادفات والأضداد!'
		},
		practice: [
			{
				questionAr: '¿Qué combinación representa exclusivamente fuentes de energía limpia y renovable?',
				options: [
					'Energía solar fotovoltaica y energía eólica',
					'Carbón mineral y petróleo crudo',
					'Plásticos quemados y gasóleo pesado',
					'Residuos tóxicos y combustibles fósiles'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الطاقة الشمسية وطاقة الرياح طاقتان متجددتان ونظيفتان.',
					'خطأ: الفحم والبترول من الطاقات الأحفورية غير المتجددة.',
					'خطأ: حرق البلاستيك والوقود الثقيل يلوّث الهواء بشدة.',
					'خطأ: مواد ملوّثة وغير مستدامة.'
				],
				explanationAr: 'الطاقات النظيفة المتجددة تعتمد أساساً على الشمس (solar)، والرياح (eólica)، والمياه (hidráulica).'
			},
			{
				questionAr: 'En un texto ecológico, ¿qué significa la expresión «mitigar los efectos de la sequía»?',
				options: [
					'Aumentar intencionadamente la pérdida de agua',
					'Suavizar y reducir los impactos negativos de la falta de lluvia',
					'Suspender todos los proyectos agrícolas',
					'Ignorar el desperdicio doméstico'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: هذا عكس معنى الفعل mitigar.',
					'ممتاز: mitigar تعني التخفيف أو الحد من الآثار السلبية.',
					'خطأ: الزراعة المستدامة جزء من الحل عبر الري المقتصد.',
					'خطأ: مكافحة التبذير أولوية بيئية.'
				],
				explanationAr: 'الفعل «mitigar» أو «paliar» في نصوص البكالوريا يعني التخفيف من شدة الضرر البيئي.'
			},
			{
				questionAr: '¿Qué principio resume correctamente la regla ecológica de las «tres R»?',
				options: [
					'Romper, rechazar y remplazar bosques',
					'Reducir, reutilizar y reciclar',
					'Repetir, retrasar y olvidar el agua',
					'Rápido, ruidoso y reciente'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: تدمير الغابات من الممارسات المضرة.',
					'صحيح: تقليص النفايات، إعادة الاستخدام، وإعادة التدوير.',
					'خطأ: شعارات غير حقيقية.',
					'خطأ: لا علاقة لها بالاقتصاد الدائري.'
				],
				explanationAr: 'تقوم ثقافة الاستدامة على «Reducir, Reutilizar, Reciclar».'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 3: El estilo indirecto en pasado (transformaciones verbales y temporales)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_lesson_3as_le_t2_estilo_indirecto_pasado',
		slug: 'spa-3as-le-t2-estilo-indirecto-pasado',
		grade: '3as_le',
		yearSubjectId: 793,
		trimesterId: 't2',
		sequenceId: 'unidad2',
		sequenceTitleAr: 'المحور الثالث والرابع: التكنولوجيا المسؤولة والبيئة والطاقات النظيفة (Ciencia, Tecnología y Medio Ambiente)',
		order: 3,
		titleAr: 'الكلام غير المباشر في الماضي: التحويلات الزمنية والمكانية (El estilo indirecto en pasado)',
		objectives: [
			'إتقان تحويل الجمل الخبرية، الاستفهامية (الكلية بـ si والجزئية بأدوات الاستفهام)، والأمرية من الكلام المباشر إلى غير المباشر عندما يكون فعل القول في الماضي',
			'تطبيق جدول التحويلات الزمنية بدقة: Presente إلى Imperfecto، Indefinido/Perfecto إلى Pluscuamperfecto، Futuro إلى Condicional، Imperativo إلى Imperfecto de subjuntivo',
			'ضبط تحويل الضمائر ومؤشرات الزمان والمكان (hoy/ese día, mañana/al día siguiente, ayer/el día anterior, aquí/allí)'
		],
		keywordsAr: [
			'Estilo indirecto (الكلام غير المباشر)',
			'Verbo introductor en pasado (فعل القول في الماضي)',
			'Transformación verbal (تحويل الأزمنة)',
			'Deícticos temporales (الظروف الزمنية)',
			'Interrogativas indirectas (الاستفهام غير المباشر)',
			'Imperativo en subjuntivo (تحويل الأمر)'
		],
		discover: {
			scenarioAr:
				'يُعدّ تحويل الكلام إلى غير المباشر في الماضي (El estilo indirecto en pasado) تمريناً أساسياً وثابتاً في البكالوريا! حين يكون فعل القول في الماضي (dijo, afirmó, preguntó, pidió)، لا تتغير الأزمنة فقط، بل تتبدل الضمائر وأسماء الإشارة وظروف الزمان والمكان كذلك.',
			svg: svgSpanishTenseTimeline({
				title: 'Estilo Indirecto en Pasado',
				tenseName: 'Retroceso temporal sistemático',
				formula: 'Verbo pasado (dijo que) + tiempo desplazado atrás',
				activeZone: 'two_past',
				example: 'Dijo: «Ayer leí esto» : Dijo que el día anterior había leído aquello.',
				markers: 'hoy/ese día, mañana/al día siguiente, ayer/el día anterior'
			}),
			steps: [
				{
					promptAr: 'حوّل إلى غير المباشر: El investigador explicó: «Hoy probamos un panel solar nuevo y mañana presentaremos el informe.»',
					hintAr: 'انتبه لتغيّر cuatro عناصر: hoy، الفعل probamos (حاضر)، mañana، والفعل presentaremos (مستقبل).',
					expectedInput: 'El investigador explicó que ese día probaban un panel solar nuevo y al día siguiente presentarían el informe.',
					revealAr: 'الحاضر «probamos» يتحول إلى Imperfecto «probaban»، والمستقبل «presentaremos» إلى Condicional «presentarían»، و«hoy» إلى «ese día» أو «aquel día»، و«mañana» إلى «al día siguiente».'
				},
				{
					promptAr: 'ماذا يحدث عندما ننقل جملة أمرية في الماضي: La profesora ordenó a los alumnos: «Verificad la fuente antes de compartirla»؟',
					hintAr: 'الأمر في المباشر يصبح «que + Pretérito imperfecto de subjuntivo»!',
					expectedInput: 'La profesora ordenó a los alumnos que verificaran la fuente antes de compartirla.',
					revealAr: 'تحويل الأمر مع فعل قول في الماضي قاعدة ذهبية في BAC LE: «pidió / ordenó / aconsejó + que + Imperfecto de subjuntivo» (verificaran / verificasen).'
				},
				{
					promptAr: 'كيف نميّز بين الاستفهام الكلي (نعم/لا) والجزئي (qué, dónde, cuándo, cómo) في الكلام غير المباشر؟',
					hintAr: 'الاستفهام الكلي يأخذ «si»؛ أما الجزئي فيحتفظ بأداة الاستفهام مع التشديد (tilde).',
					expectedInput: 'الاستفهام الكلي يربط بـ preguntó si؛ أما الجزئي فيحتفظ بأداة الاستفهام (preguntó dónde / qué / cuándo)',
					revealAr: 'مثال: «¿Habéis reciclado el papel?» يصبح «Preguntó si habían reciclado el papel»؛ و«¿Dónde instalasteis los sensores?» يصبح «Preguntó dónde habían instalado los sensores».'
				}
			]
		},
		summary: {
			rulesAr: [
				'تحويل الأزمنة بعد فعل قول في الماضي (dijo / afirmó / señaló / preguntó): Presente يتحول إلى Pretérito imperfecto؛ Pretérito perfecto و Pretérito indefinido يتحولان إلى Pretérito pluscuamperfecto (había + participio)؛ Futuro simple يتحول إلى Condicional simple؛ Futuro perfecto يتحول إلى Condicional compuesto؛ Presente de subjuntivo و Imperativo يتحولان إلى Pretérito imperfecto de subjuntivo.',
				'ملاحظة مهمة: Pretérito imperfecto و Pretérito pluscuamperfecto و Condicional تبقى كما هي دون تغيير إضافي في الكلام غير المباشر.',
				'تحويل الظروف والإشارات: ahora يصبح entonces / en ese momento؛ hoy يصبح ese día / aquel día؛ ayer يصبح el día anterior / la víspera؛ mañana يصبح al día siguiente / el día después؛ este/esta يصبح ese/esa أو aquel/aquella؛ aquí يصبح allí؛ venir يصبح ir (تبعاً للمتحدث).',
				'الجمل الاستفهامية والأمرية: الاستفهام الكلي يأخذ «preguntó si...» (دون que!)؛ الاستفهام الجزئي يحافظ على الأداة المشددة «preguntó qué / cómo / por qué...»؛ الأمر يأخذ «pidió / rogó / ordenó que + Imperfecto de subjuntivo».'
			],
			visualSvg: svgSpanishConjugationChart({
				title: 'Cambios en Estilo Indirecto (Pasado)',
				subtitle: 'Correspondencia exacta tras «dijo / preguntó / pidió»',
				columns: [
					{
						header: 'Presente / Futuro',
						rule: 'Pres.: Imperf. | Fut.: Condic.',
						examples: 'leo : leía | iré : iría'
					},
					{
						header: 'Pasados',
						rule: 'Perf. / Indef.: Pluscuamperf.',
						examples: 'vi / he visto : había visto'
					},
					{
						header: 'Imperativo / Subj.',
						rule: 'Ambos : Imperf. Subjuntivo',
						examples: 'Hazlo : que lo hiciera'
					}
				]
			}),
			visualCaptionAr: 'الجدول المرجعي السريع لتحويل الأزمنة في الكلام غير المباشر في الماضي.',
			examples: [
				{
					problemAr: 'Pasa al estilo indirecto: El técnico advirtió: «No compartáis vuestra contraseña aquí ni ahora.»',
					solutionAr: 'El técnico advirtió que no compartieran (o compartiesen) su contraseña allí ni entonces.'
				},
				{
					problemAr: 'Pasa al estilo indirecto: La periodista preguntó al ingeniero: «¿Cuándo instalaron los primeros paneles en este municipio?»',
					solutionAr: 'La periodista preguntó al ingeniero cuándo habían instalado los primeros paneles en aquel municipio.'
				}
			],
			watchOutAr: 'احذر وضع «que» قبل «si» في الاستفهام الكلي إذا لم يكن هناك تنبيه خاص: نكتب «Preguntó si venían» وليس «Preguntó que si»! ولا تنس حذف علامتي التنصيص (« ») وعلامتي الاستفهام (¿ ?).'
		},
		practice: [
			{
				questionAr: 'Transforma al estilo indirecto: El experto afirmó: «Ayer descubrimos un error en el programa.»',
				options: [
					'El experto afirmó que el día anterior habían descubierto un error en el programa.',
					'El experto afirmó que ayer descubrían un error en el programa.',
					'El experto afirmó que al día siguiente descubrirían un error en el programa.',
					'El experto afirmó si el día anterior descubrieron un error en el programa.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح 100%: ayer تحولت إلى el día anterior، و descubrimos (ماضٍ بسيط) إلى habían descubierto (ماضٍ أسبق).',
					'خطأ: لم يتم تحويل «ayer» ولا زمن الماضي البسيط.',
					'خطأ: معنى مستقبلي مناقض لـ «ayer».',
					'خطأ: هذه جملة خبرية لا استفهامية.'
				],
				explanationAr: 'في الكلام غير المباشر في الماضي يتحول Pretérito indefinido إلى Pluscuamperfecto و«ayer» إلى «el día anterior».'
			},
			{
				questionAr: '¿Cómo se transforma correctamente una orden en estilo indirecto en pasado: La profesora dijo al alumno: «Lee el artículo con atención»?',
				options: [
					'La profesora le dijo que lee el artículo con atención.',
					'La profesora le dijo que leyera el artículo con atención.',
					'La profesora le dijo si leyera el artículo con atención.',
					'La profesora le dijo que leerá el artículo con atención.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: بقي الفعل في الحاضر الإخباري.',
					'ممتاز: الأمر يتحول إلى «que + Pretérito imperfecto de subjuntivo» (leyera).',
					'خطأ: أداة «si» خاصة بالاستفهام لا بالأمر.',
					'خطأ: المستقبل لا ينقل صيغة الأمر في الماضي.'
				],
				explanationAr: 'الأمر المنقول في الماضي يتحول دوماً إلى Pretérito imperfecto de subjuntivo.'
			},
			{
				questionAr: '¿Qué forma adopta la expresión temporal «dentro de dos días» cuando se pasa al estilo indirecto en pasado?',
				options: [
					'dos días antes',
					'dos días después',
					'la víspera',
					'en este instante'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: هذه مقابل «hace dos días».',
					'صحيح: «dentro de X tiempo» تتحول إلى «X tiempo después».',
					'خطأ: «la víspera» مقابل «ayer / anoche».',
					'خطأ: تدل على الحاضر لا المستقبل المنقول.'
				],
				explanationAr: 'يتغير المؤشر المستقبلي «dentro de dos días» في الماضي إلى «dos días después» أو «al cabo de dos días».'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 4: Voz pasiva perifrástica y refleja y conectores argumentativos
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_lesson_3as_le_t2_voz_pasiva_conectores',
		slug: 'spa-3as-le-t2-voz-pasiva-conectores',
		grade: '3as_le',
		yearSubjectId: 793,
		trimesterId: 't2',
		sequenceId: 'unidad2',
		sequenceTitleAr: 'المحور الثالث والرابع: التكنولوجيا المسؤولة والبيئة والطاقات النظيفة (Ciencia, Tecnología y Medio Ambiente)',
		order: 4,
		titleAr: 'المبني للمجهول بنوعيه والروابط الحجاجية (La voz pasiva perifrástica y refleja y conectores argumentativos)',
		objectives: [
			'التمييز الدقيق والتحويل السليم بين المبني للمعلوم والمبني للمجهول التحليلي (Pasiva perifrástica: ser + participio) والمبني للمجهول الضمائري (Pasiva refleja: se + verbo en 3.ª persona)',
			'مراعاة مطابقة اسم المفعول (concordancia en género y número) في الباسيفا التحليلية ومطابقة الفعل للفاعل الجمع في الباسيفا الانعكاسية (se + verbos en plural)',
			'تصنيف وتوظيف الروابط الحجاجية المتقدمة (causa, consecuencia, oposición/concesión, adición, finalidad) في نصوص البكالوريا'
		],
		keywordsAr: [
			'Pasiva perifrástica (ser + participio)',
			'Pasiva refleja (se + verbo)',
			'Complemento agente (por...)',
			'Concordancia (المطابقة)',
			'Conectores lógicos (الروابط المنطقية)',
			'Argumentación (الحجاج)'
		],
		discover: {
			scenarioAr:
				'تكثر في نصوص التكنولوجيا والبيئة صيغ المبني للمجهول لإبراز الاكتشافات والإجراءات (مثل: «Se instalaron placas solares» أو «Los residuos fueron reciclados por los voluntarios»). كما يطالب المترشح في البكالوريا بالتحويل بين الصيغتين وربط الأفكار بالروابط المنطقية الدقيقة.',
			svg: svgSpanishConjugationChart({
				title: 'Pasiva Perifrástica vs. Pasiva Refleja',
				subtitle: 'Estructuras clave de transformación en BAC 3AS LE',
				columns: [
					{
						header: 'Pasiva perifrástica',
						rule: 'Suj. pac. + ser + part. (+ por)',
						examples: 'El bosque fue protegido por todos.'
					},
					{
						header: 'Pasiva refleja',
						rule: 'se + V (3.ª sing./pl.) + Suj. pac.',
						examples: 'Se plantaron miles de árboles.'
					},
					{
						header: 'Conectores clave',
						rule: 'Causa / Efecto / Oposición',
						examples: 'puesto que / por ello / no obstante'
					}
				]
			}),
			steps: [
				{
					promptAr: 'تأمل الجملة: «Los ingenieros diseñaron dos plataformas educativas». حوّلها أولاً إلى Pasiva perifrástica ثم إلى Pasiva refleja.',
					hintAr: 'في الأولى: «ser» في الماضي البسيط (fueron) + participio مطابق؛ وفي الثانية: «se + diseñaron» دون ذكر الفاعل.',
					expectedInput: 'Perifrástica: Dos plataformas educativas fueron diseñadas por los ingenieros. | Refleja: Se diseñaron dos plataformas educativas.',
					revealAr: 'لاحظ المطابقة في كلتا الحالتين: «diseñadas» (مؤنث جمع) في الأولى؛ و«Se diseñaron» (فعل جمع لأن الفاعل dos plataformas جمع) في الثانية!'
				},
				{
					promptAr: 'ما الخطأ الشائع في الجملة: «Se vende botellas reciclables»؟ وكيف نصحّحه؟',
					hintAr: 'في Pasiva refleja، الكلمة بعد الفعل هي الفاعل المريض (sujeto paciente) وليست مفعولاً به!',
					expectedInput: 'الفعل يجب أن يطابق الفاعل الجمع «botellas»، فنكتب: «Se venden botellas reciclables»',
					revealAr: 'نقطة فحص متكررة في BAC LE: «Se vende una casa» (مفرد) مقابل «Se venden varias casas» (جمع)!'
				},
				{
					promptAr: 'صنّف الروابط التالية حسب معناها المنطقي: «debido a que»، «por consiguiente»، «sin embargo»، «además».',
					hintAr: 'أربعة حقول: السبب، النتيجة، الاستدراك/المعارضة، الإضافة.',
					expectedInput: 'debido a que (Causa) | por consiguiente (Consecuencia) | sin embargo (Oposición) | además (Adición)',
					revealAr: 'إتقان الروابط المنطقية يحسّن العلامة في قسمي الفهم واللغة والتعبير الكتابي معاً.'
				}
			]
		},
		summary: {
			rulesAr: [
				'المبني للمجهول التحليلي (Voz pasiva perifrástica): Sujeto paciente + SER (مصرفاً في نفس زمن الجملة الأصلية) + Participio (مطابقاً للفاعل جنساً وعدداً) + por + Complemento agente.',
				'تذكّر أن اسم المفعول مع الفعل «ser» يتغيّر دائماً حسب الفاعل: sido/a/os/as (مثلاً: La ley fue aprobada؛ Los proyectos han sido financiados).',
				'المبني للمجهول الضمائري (Pasiva refleja): se + verbo en 3.ª persona (singular o plural حسب عدد الفاعل غير العاقل). لا نذكر معها «por + agente» لأن هدفها التركيز على الفعل نفسه أو العموم.',
				'جدول الروابط الحجاجية: Causa (porque, ya que, puesto que, dado que, a causa de + اسم)؛ Consecuencia (por lo tanto, por consiguiente, así que, de modo que)؛ Oposición/Concesión (sin embargo, no obstante, aunque, a pesar de + اسم)؛ Adición (además, asimismo, igualmente).'
			],
			visualSvg: svgSpanishGrammarMap({
				title: 'Conectores Argumentativos BAC (3AS LE)',
				rootLabel: 'Cohesión lógica del discurso',
				rootSub: 'Seleccionar el nexo según la relación sintáctica',
				branches: [
					{
						label: 'Causa',
						rule: 'Verbo / Sustantivo',
						example: 'ya que / debido a + sust.'
					},
					{
						label: 'Consecuencia',
						rule: 'Introduce resultado lógico',
						example: 'por lo tanto / por ello'
					},
					{
						label: 'Oposición',
						rule: 'Contrasta dos argumentos',
						example: 'no obstante / sin embargo'
					},
					{
						label: 'Concesión',
						rule: 'Obstáculo que no impide',
						example: 'a pesar de + sust./inf.'
					}
				],
				width: 580
			}),
			visualCaptionAr: 'تصنيف الروابط الحجاجية حسب نوع العلاقة والتركيب النحوي اللاحق لها.',
			examples: [
				{
					problemAr: 'Transforma a pasiva perifrástica: «La comunidad científica evaluará las nuevas fuentes de energía.»',
					solutionAr: 'Las nuevas fuentes de energía serán evaluadas por la comunidad científica.'
				},
				{
					problemAr: 'Elige el conector correcto: «.......... la sequía estival, los agricultores conservaron sus cultivos gracias al riego localizado.» (Porque / A pesar de / Por lo tanto)',
					solutionAr: 'A pesar de (expresa concesión y va seguido directamente del sintagma nominal «la sequía estival», mientras que «porque» exige un verbo conjugado).'
				}
			],
			watchOutAr: 'انتبه جيداً للفرق التركيبي: «porque / ya que / aunque» تُتبع بجملة فعلية كاملة، بينما «a causa de / debido a / a pesar de» تُتبع باسم أو مصدر (Sustantivo o Infinitivo)!'
		},
		practice: [
			{
				questionAr: '¿Cuál es la transformación correcta a voz pasiva perifrástica de: «El ayuntamiento inauguró dos centros de reciclaje»?',
				options: [
					'Dos centros de reciclaje fueron inaugurados por el ayuntamiento.',
					'Dos centros de reciclaje fue inaugurado por el ayuntamiento.',
					'Dos centros de reciclaje serán inaugurados por el ayuntamiento.',
					'Dos centros de reciclaje son inauguradas por el ayuntamiento.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الفعل في الماضي البسيط (fueron) واسم المفعول مطابق للمذكر الجمع (inaugurados).',
					'خطأ: غياب المطابقة في العدد للفاعل الجمع.',
					'خطأ: تبدّل الزمن من الماضي إلى المستقبل.',
					'خطأ: تغيّر الزمن والجنس (مؤنث بدل مذكر).'
				],
				explanationAr: 'يجب الحفاظ على زمن الفعل الأصلي ومطابقة اسم المفعول للفاعل الجديد جنساً وعدداً.'
			},
			{
				questionAr: 'Elige la oración correcta en pasiva refleja:',
				options: [
					'Se publicó tres informes ambientales ayer.',
					'Se publicaron tres informes ambientales ayer.',
					'Se publicaron tres informes ambientales por el ministerio.',
					'Se publicando tres informes ambientales.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفاعل جمع (tres informes)، فيلزم جمع الفعل.',
					'ممتاز: se + الفعل في صيغة الجمع (publicaron) متطابقاً مع الفاعل الجمع.',
					'خطأ: الباسيفا الانعكاسية لا تأخذ مكمل الفاعل «por...» عادةً في البكالوريا.',
					'خطأ: تركيب نحوي خاطئ بصيغة الحال.'
				],
				explanationAr: 'في Pasiva refleja يطابق الفعل الفاعل المريض في الإفراد والجمع (se publicaron tres informes).'
			},
			{
				questionAr: 'Completa con el conector adecuado ante un sustantivo: «.......... los avances tecnológicos, debemos mantener el contacto humano.»',
				options: [
					'Aunque',
					'Porque',
					'A pesar de',
					'Por consiguiente'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: «aunque» تحتاج إلى فعل مصرف ولا تتبع باسم مباشرة.',
					'خطأ: «porque» رابط سببي متبوع بجملة فعلية.',
					'صحيح: «A pesar de» رابط اعتراضي يتبعه المركب الاسمي مباشرة.',
					'خطأ: «por consiguiente» تفيد النتيجة لا الاعتراض.'
				],
				explanationAr: 'نستخدم «A pesar de» قبل الأسماء والمصادر للتعبير عن الاعتراض.'
			}
		]
	}
];
