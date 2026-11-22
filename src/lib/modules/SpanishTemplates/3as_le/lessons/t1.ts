import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';
import {
	svgSpanishConjugationChart,
	svgSpanishGrammarMap,
	svgSpanishWordFormation
} from '../../svg-spanish';
import type { SpanishInteractiveLessonData } from '../../types';

/**
 * 3AS BAC Foreign Languages (لغات أجنبية — yearSubjectId: 793, coeff 4, 03h00, 7+7+6=20)
 * Interactive Lessons — Trimestre 1 : Ámbito Personal & Ámbito Educativo (4 lessons)
 */
export const LESSONS_3AS_LE_T1: SpanishInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 1: Ámbito Personal — La juventud moderna: sueños, esfuerzo y valores
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_lesson_3as_le_t1_juventud_valores',
		slug: 'spa-3as-le-t1-juventud-valores',
		grade: '3as_le',
		yearSubjectId: 793,
		trimesterId: 't1',
		sequenceId: 'unidad1',
		sequenceTitleAr: 'المحور الأول والثاني: الشباب والقيم والتربية واللغات (Ámbito Personal y Educativo)',
		order: 1,
		titleAr: 'الشباب المعاصر: الطموح، الجهد والقيم الأخلاقية (La juventud moderna: sueños, esfuerzo y valores)',
		objectives: [
			'تحليل نصوص المحور الشخصي (Ámbito Personal) حول طموحات الشباب، العمل الدؤوب، والتطوّع الاجتماعي في السياق الجزائري والعالم الناطق بالإسبانية',
			'استثمار المعجم الدقيق للقيم والالتزام (constancia, esfuerzo, honestidad, solidaridad, responsabilidad) في الفهم والتعبير الكتابي',
			'ربط الفكرة المحورية للنص بموقف شخصي معلّل بأسلوب بكالوريا اللغات الأجنبية (3AS LE)'
		],
		keywordsAr: [
			'Juventud (الشباب)',
			'Esfuerzo (الجهد)',
			'Constancia (المثابرة)',
			'Valores éticos (القيم الأخلاقية)',
			'Solidaridad (التضامن)',
			'Ámbito personal (المحور الشخصي)'
		],
		discover: {
			scenarioAr:
				'في بكالوريا شعبة اللغات الأجنبية، غالباً ما تتناول نصوص الوحدة الأولى (Ámbito Personal) التوازن بين أحلام الشباب (los sueños) والانضباط اليومي (la disciplina y el esfuerzo)، ودور القيم الأخلاقية والتكافل في بناء شخصية مسؤولة في الجزائر وفي العالم الناطق بالإسبانية.',
			svg: renderLessonIllustration('spa_01_mundo_hispanohablante_mapa_mudo', {
				lang: 'es',
				pins: []
			}),
			steps: [
				{
					promptAr: 'ما الفرق المنهجي في نصوص البكالوريا بين «el deseo pasivo» (الرغبة العابرة) و«la constancia» (المثابرة)؟',
					hintAr: 'تأمل كيف تحوّل النصوص الحلم إلى مشروع واقعي بالجهد والتخطيط.',
					expectedInput: 'الرغبة العابرة بلا عمل لا تكفي، أما المثابرة فهي الجهد المنتظم الذي يحقق الأهداف',
					revealAr: 'تشير نصوص BAC LE إلى أن الطموح (la ambición sana) يظل مجرد أمنية ما لم يقترن بالانضباط (la disciplina) والعمل الدؤوب (la constancia).'
				},
				{
					promptAr: 'اقرأ الجملة: «Aunque muchos jóvenes sueñen con resultados inmediatos, la verdadera madurez exige paciencia y servicio a la comunidad». استخرج قيمتين أساسيتين من هذه العبارة.',
					hintAr: 'ابحث عن الاسمين المجردين بعد الفعل «exige».',
					expectedInput: 'Paciencia (الصبر) و servicio a la comunidad (خدمة المجتمع)',
					revealAr: 'في نصوص القيم، تُبرز عبارات مثل la paciencia (الصبر) و el servicio a la comunidad (خدمة المجتمع) أن نجاح الفرد يكتمل حين ينفع محيطه.'
				},
				{
					promptAr: 'لماذا توظف أسئلة الفهم في BAC LE سؤال الرأي الشخصي: «¿Qué opinas sobre el compromiso juvenil?»؟',
					hintAr: 'فكّر في المطلوب: إبداء موقف واضح مدعوم بحجتين في 4 أسطر.',
					expectedInput: 'لقياس قدرة المترشح على التعبير عن رأي معلّل بالروابط المنطقية والمعجم السليم',
					revealAr: 'يُفتتح الجواب المثالي بعبارة رأي (En mi opinión / Desde mi punto de vista) متبوعة بتعليلين واضحين وخاتمة موجزة في أربعة أسطر متماسكة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'محاور الوحدة الأولى (Ámbito Personal): أحلام الشباب وطموحاتهم الدراسية، قيمة الجهد والمثابرة (el esfuerzo y la perseverancia)، الصدق والأمانة (la honradez)، والتضامن التطوعي (el voluntariado y la solidaridad).',
				'المعجم المفتاحي للفهم: alcanzar metas (بلوغ الأهداف)، superar obstáculos (تجاوز العقبات)، madurez (النضج)، compromiso cívico (الالتزام المدني)، gratitud hacia los padres (الاعتراف بفضل الوالدين).',
				'تحليل العبارات الضمنية والضمائر العائدة (Los referentes): عند سؤال «¿A qué se refiere la expresión subrayada?» نعود إلى الجملة السابقة لربط اسم الإشارة (este valor, dicha meta) أو الضمير بالمرجع الدقيق في النص.',
				'منهجية الإجابة عن سؤال الصواب والخطأ والتعليل (Verdadero / Falso y justificación): في البكالوريا يُصحّح الخطأ بجملة مقتبسة أو مصاغة بدقة من الفقرة المعنية دون الاكتفاء بكلمة «Falso».'
			],
			visualSvg: svgSpanishGrammarMap({
				title: 'Pilares del Ámbito Personal (BAC 3AS LE)',
				rootLabel: 'Juventud con propósito y ética',
				rootSub: 'Ejes temáticos y vocabulario clave de comprensión',
				branches: [
					{
						label: 'Esfuerzo',
						rule: 'Disciplina y estudio diario',
						example: 'superar metas con rigor'
					},
					{
						label: 'Honestidad',
						rule: 'Coherencia entre palabra y acto',
						example: 'actuar con rectitud moral'
					},
					{
						label: 'Solidaridad',
						rule: 'Ayuda mutua y voluntariado',
						example: 'servir al bien común'
					},
					{
						label: 'Equilibrio',
						rule: 'Uso sabio del tiempo libre',
						example: 'lectura, deporte y familia'
					}
				],
				width: 580
			}),
			visualCaptionAr: 'خريطة القيم الأساسية والمفاهيم المحورية في وحدة الشباب والمحور الشخصي لبكالوريا اللغات الأجنبية.',
			examples: [
				{
					problemAr: 'Pregunta de texto: «Explica por qué el autor afirma que el esfuerzo diario vale más que el talento aislado.»',
					solutionAr: 'El autor sostiene que el talento sin constancia se estanca, mientras que la disciplina cotidiana convierte cualquier capacidad en logros duraderos.'
				},
				{
					problemAr: 'Pregunta de reflexión (4 líneas): «¿Cómo pueden los jóvenes equilibrar sus ambiciones personales con el respeto a los valores familiares?»',
					solutionAr: 'Desde mi punto de vista, las metas personales cobran verdadero sentido cuando se apoyan en la gratitud y el diálogo familiar. En efecto, la orientación de los padres fortalece el carácter del estudiante y le ayuda a perseverar con humildad y responsabilidad en sus estudios.'
				}
			],
			watchOutAr: 'انتبه في أسئلة الفهم إلى الفخّ اللغوي بين «no solo ... sino también»؛ فالنص لا يرفض الطموح الشخصي بل يربطه بالمسؤولية الأخلاقية وخدمة المجتمع!'
		},
		practice: [
			{
				questionAr: 'En los textos del ámbito personal de 3AS LE, ¿qué valor completa al talento para garantizar el éxito académico?',
				options: [
					'La constancia y la disciplina cotidiana',
					'La improvisación sin planificación previa',
					'El abandono de todo esfuerzo ante las dificultades',
					'La búsqueda exclusiva de fama instantánea'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: المثابرة والانضباط اليومي هما الركيزة التي تحوّل الاستعداد الفطري إلى نجاح مستدام.',
					'خطأ: الارتجال يعارض التخطيط الجاد المطلوب في نصوص البكالوريا.',
					'خطأ: الاستسلام للعقبات يناقض قيمة المثابرة.',
					'خطأ: السعي للظهور السطحي يتعارض مع أخلاقيات الجهد الصادق.'
				],
				explanationAr: 'تربط نصوص المحور الشخصي النجاح الحقيقي بالمثابرة (la constancia) والانضباط (la disciplina).'
			},
			{
				questionAr: '¿Qué expresión introduce con mayor propiedad una opinión personal en una respuesta de comprensión del BAC?',
				options: [
					'A nadie le interesa este asunto.',
					'Desde mi punto de vista, considero que...',
					'Copio el primer párrafo sin cambios.',
					'Tal vez sí o tal vez no, da igual.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: أسلوب غير رسمي ولا يعبر عن تحليل منهجي.',
					'ممتاز: صيغة أكاديمية رصينة لافتتاح فقرة الرأي المعلل.',
					'خطأ: النسخ الحرفي من النص مرفوض في سؤال الرأي.',
					'خطأ: عبارة مترددة وضعيفة أسلوبياً.'
				],
				explanationAr: 'يُنصح دائماً بافتتاح سؤال التفكير في البكالوريا بصيغة أكاديمية واضحة مثل «Desde mi punto de vista» أو «En mi opinión».'
			},
			{
				questionAr: 'Al justificar un enunciado marcado como «Falso» en la comprensión lectora, ¿qué debes hacer?',
				options: [
					'Escribir únicamente la palabra Falso sin añadir nada',
					'Traducir toda la pregunta al árabe',
					'Indicar la información exacta del texto que contradice el enunciado',
					'Inventar un dato ajeno al documento leído'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: غياب التعليل يفقدك نصف العلامة في البكالوريا.',
					'خطأ: التصحيح يُكتب بالإسبانية انطلاقاً من النص.',
					'صحيح: يجب تقديم التصويب المستمد مباشرة من مضمون النص.',
					'خطأ: يجب الالتزام التام بمعلومات النص المعطى.'
				],
				explanationAr: 'تقتضي منهجية البكالوريا إرفاق كل حكم «Falso» بالتبرير النصي الصحيح.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 2: Ámbito Educativo — La educación, la lectura y los idiomas
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_lesson_3as_le_t1_educacion_idiomas',
		slug: 'spa-3as-le-t1-educacion-idiomas',
		grade: '3as_le',
		yearSubjectId: 793,
		trimesterId: 't1',
		sequenceId: 'unidad1',
		sequenceTitleAr: 'المحور الأول والثاني: الشباب والقيم والتربية واللغات (Ámbito Personal y Educativo)',
		order: 2,
		titleAr: 'التعليم، المطالعة واللغات الأجنبية كجسر للتقدّم (La educación, la lectura y los idiomas como puente de progreso)',
		objectives: [
			'استيعاب نصوص المحور التربوي (Ámbito Educativo) حول دور المدرسة، المطالعة الواعية، وتعلّم اللغات الأجنبية في تنمية الفكر النقدي',
			'إتقان المفردات الأكاديمية للتعليم والترجمة والحوار الحضاري (alfabetización, lectura crítica, plurilingüismo, intercambio cultural)',
			'ربط أهمية اللغات الأجنبية في الشعبة بالحفاظ على الهوية الوطنية والانفتاح العلمي المتزن'
		],
		keywordsAr: [
			'Educación (التربية والتعليم)',
			'Lectura (المطالعة)',
			'Idiomas (اللغات)',
			'Pensamiento crítico (الفكر النقدي)',
			'Biblioteca (المكتبة)',
			'Diálogo cultural (الحوار الثقافي)'
		],
		discover: {
			scenarioAr:
				'يحتلّ المحور التربوي مكانة مركزية في بكالوريا اللغات الأجنبية؛ إذ يعالج قضايا القراءة العميقة في المكتبات، دور الأستاذ والمربّي، وقيمة تعدد اللغات بوصفه جسر تواصل علمي لا يلغي اللغة الأم بل يثريها.',
			svg: renderLessonIllustration('spa_03_educacion_idiomas_biblioteca', {
				lang: 'es',
				pins: []
			}),
			steps: [
				{
					promptAr: 'في عبارة: «Dominar varios idiomas no debilita la lengua materna, sino que afina la comprensión del mundo», ما العلاقة بين اللغة الأم واللغات الأجنبية؟',
					hintAr: 'لاحظ أداة الربط «no ... sino que».',
					expectedInput: 'علاقة تكامل وإثراء، فاللغات الأجنبية لا تُضعف اللغة الأم بل تصقل فهم العالم',
					revealAr: 'تشدد نصوص BAC LE على أن إتقان لغات أجنبية مثل الإسبانية والفرنسية والإنجليزية يكمل التمكّن من اللغة العربية ويوسع آفاق البحث والترجمة.'
				},
				{
					promptAr: 'ماذا تعني عبارة «lectura profunda frente a la lectura superficial» في نصوص التربية؟',
					hintAr: 'قارن بين تأمل الكتب وبناء الحجة وبين التصفح السريع العابر.',
					expectedInput: 'القراءة المتأنية التي تنمّي التركيز والتحليل مقابل التصفح السطحي السريع',
					revealAr: 'La lectura profunda تمنح الطالب مفردات دقيقة، وصبراً على التحليل، وقدرة على صياغة فقرات رصينة في الامتحان.'
				},
				{
					promptAr: 'كيف تربط بين مشروع النهضة التعليمية في الجزائر (مثل مدارس جمعية العلماء بقيادة الشيخ عبد الحميد بن باديس) وموضوع التعليم؟',
					hintAr: 'استحضر دور المدارس الحرة والمكتبات في صون الهوية وبناء الوعي.',
					expectedInput: 'المدرسة والمكتبة كانتا دائماً حصن الهوية وبوابة النهضة العلمية والأخلاقية في الجزائر',
					revealAr: 'ذكر أمثلة ثقافية وتاريخية جزائرية رصينة مثل جهود الشيخ عبد الحميد بن باديس والشيخ محمد البشير الإبراهيمي يرفع جودة التعبير الكتابي في البكالوريا.'
				}
			]
		},
		summary: {
			rulesAr: [
				'محاور الوحدة الثانية (Ámbito Educativo): وظيفة المدرسة في بناء المواطن الواعي، أثر المطالعة الورقية والرقمية المنظمة، قيمة تعلّم اللغات الأجنبية والترجمة الأمينة، ودور المعلم في التوجيه التربوي.',
				'ثنائية الحفظ الآلي مقابل الفهم النقدي (memorización mecánica frente a comprensión crítica): تدعو النصوص التربوية إلى التحليل والمناقشة وربط المعرفة بالواقع.',
				'الأسلوب التفسيري والحجاجي في النصوص التربوية: يعتمد الكاتب التعريف (definición)، والمقارنة (comparación)، والمثال التاريخي أو الواقعي (ejemplificación) لإقناع القارئ بأهمية العلم.',
				'مؤشرات تحديد الغرض التواصلي للنص (La intención comunicativa): هل يهدف الكاتب إلى التوعية (concienciar)، أم إلى الإخبار والتفسير (informar y explicar)، أم إلى الإقناع (persuadir y argumentar)؟'
			],
			visualSvg: svgSpanishGrammarMap({
				title: 'Educación, Lectura e Idiomas (3AS LE)',
				rootLabel: 'El saber como puente de progreso',
				rootSub: 'Beneficios formativos del aprendizaje lingüístico',
				branches: [
					{
						label: 'Lectura crítica',
						rule: 'Amplía léxico y reflexión',
						example: 'comprender textos complejos'
					},
					{
						label: 'Plurilingüismo',
						rule: 'Acceso directo a la ciencia',
						example: 'traducir con fidelidad'
					},
					{
						label: 'Identidad viva',
						rule: 'Arraigo en la lengua propia',
						example: 'valorar la cultura nacional'
					},
					{
						label: 'Éxito en el BAC',
						rule: 'Expresión clara y ordenada',
						example: 'redactar ensayos coherentes'
					}
				],
				width: 580
			}),
			visualCaptionAr: 'محاور التحليل التربوي واللغوي في نصوص التربية والمطالعة وتعلم اللغات.',
			examples: [
				{
					problemAr: 'Pregunta de comprensión: «¿Cuál es la intención comunicativa principal de un texto que compara los beneficios de leer libros completos con el consumo rápido de titulares?»',
					solutionAr: 'Su intención es analizar la importancia de la lectura profunda y concienciar a los estudiantes sobre la necesidad de cultivar la atención crítica.'
				},
				{
					problemAr: 'Respuesta modelo breve: «¿Por qué aprender español y otras lenguas extranjeras resulta útil para el desarrollo de un país?»',
					solutionAr: 'El dominio de idiomas facilita el intercambio científico, la traducción rigurosa y la proyección cultural de nuestra sociedad en el ámbito internacional.'
				}
			],
			watchOutAr: 'عند تحديد الفكرة العامة (Idea general) أو نوع النص، تجنب صياغتها في كلمة واحدة عامة مثل «La educación»؛ بل اذكر العلاقة الدقيقة بين عناصر الموضوع (مثلاً: «El papel de la lectura y los idiomas en la formación crítica de los jóvenes»).'
		},
		practice: [
			{
				questionAr: 'Según la perspectiva educativa de 3AS LE, ¿qué efecto produce el aprendizaje sólido de lenguas extranjeras sobre la lengua materna?',
				options: [
					'La enriquece y desarrolla la capacidad comparativa del estudiante',
					'La borra por completo en pocas semanas',
					'Impide leer libros de historia nacional',
					'Elimina la necesidad de estudiar gramática'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: تعلم اللغات الأجنبية ينمّي الحس المقارن ويعمّق فهم بنية اللغة الأم.',
					'خطأ: هذا ادعاء مبالغ فيه ومخالف للواقع اللغوي.',
					'خطأ: إتقان اللغات يساعد في البحث التاريخي المقارن.',
					'خطأ: إتقان أي لغة يتطلب ضبط قواعدها.'
				],
				explanationAr: 'تقوم فلسفة شعبة اللغات الأجنبية على التكامل بين اللغة الأم واللغات الأجنبية.'
			},
			{
				questionAr: '¿Qué rasgo caracteriza a la «lectura profunda» frente a la consulta apresurada de mensajes breves?',
				options: [
					'La ausencia total de vocabulario técnico',
					'La atención sostenida, la reflexión y la comprensión global de las ideas',
					'La repetición mecánica sin entender el sentido',
					'El rechazo de las bibliotecas escolares'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: القراءة العميقة تثري المعجم العلمي والأدبي.',
					'صحيح: التركيز المستمر والتأمل وبناء المعنى الكلي سمات القراءة العميقة.',
					'خطأ: هذا وصف الحفظ الآلي غير الفاهم.',
					'خطأ: المكتبة هي الفضاء الطبيعي للقراءة العميقة.'
				],
				explanationAr: 'تميّز النصوص التربوية بين الفهم العميق المتأمل والتلقي السطحي السريع.'
			},
			{
				questionAr: '¿Cómo se formula correctamente la «idea general» de un texto educativo en el examen de BAC?',
				options: [
					'Con una oración sintética que resuma la tesis principal del autor sin copiar párrafos enteros',
					'Con una lista de diez números de página',
					'Escribiendo solo un adjetivo aislado',
					'Copiando literalmente el último ejercicio de lengua'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: الفكرة العامة تُصاغ في جملة جامعة موجزة تعكس محور النص ورسالة الكاتب.',
					'خطأ: الأرقام لا تعبّر عن الفكرة العامة.',
					'خطأ: الكلمة المفردة قاصرة عن نقل أطروحة النص.',
					'خطأ: النسخ الحرفي يُنقص التقييم.'
				],
				explanationAr: 'الفكرة العامة الجيدة جملة اسمية أو فعلية مركّزة تبرز محور النص وموقف صاحبه.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 3: El Subjuntivo (presente e imperfecto) en subordinadas
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_lesson_3as_le_t1_subjuntivo_subordinadas',
		slug: 'spa-3as-le-t1-subjuntivo-subordinadas',
		grade: '3as_le',
		yearSubjectId: 793,
		trimesterId: 't1',
		sequenceId: 'unidad1',
		sequenceTitleAr: 'المحور الأول والثاني: الشباب والقيم والتربية واللغات (Ámbito Personal y Educativo)',
		order: 3,
		titleAr: 'صيغة الشك (El Subjuntivo: presente e imperfecto) في الجمل الغائية والاعتراضية والمصدرية',
		objectives: [
			'ضبط تصريف المضارع المنصوب (Presente de subjuntivo) والماضي الناقص في صيغة الشك (Pretérito imperfecto de subjuntivo) مع الأفعال القياسية والشاذة',
			'تطبيق التوافق الزمني الدقيق (Correlación de tiempos) بين فعل الجملة الرئيسية وفعل الجملة التابعة في البكالوريا',
			'التمييز بين استعمال Indicativo و Subjuntivo بعد الروابط الغائية (para que, a fin de que)، والاعتراضية (aunque)، والأفعال الطلبية والتقييمية'
		],
		keywordsAr: [
			'Presente de subjuntivo',
			'Imperfecto de subjuntivo',
			'Subordinadas finales (para que)',
			'Subordinadas concesivas (aunque)',
			'Subordinadas sustantivas',
			'Correlación temporal (التوافق الزمني)'
		],
		discover: {
			scenarioAr:
				'يُعدّ تصريف واستعمال «El Subjuntivo» (سواء في الحاضر أو في الماضي الناقص) من أكثر أسئلة قواعد البكالوريا تكراراً. سرّه في تحديد نوع الجملة التابعة (غائية، اعتراضية، مصدرية) ثم مراقبة زمن الفعل الرئيسي لتطبيق التوافق الزمني الصحيح!',
			svg: svgSpanishGrammarMap({
				title: 'El Subjuntivo en Subordinadas (BAC 3AS LE)',
				rootLabel: '¿Indicativo o Subjuntivo?',
				rootSub: 'Depende del nexo, la actitud y el tiempo principal',
				branches: [
					{
						label: 'Finales',
						rule: 'Siempre Subjuntivo (para que)',
						example: 'Estudia para que logres tu meta.'
					},
					{
						label: 'Concesivas',
						rule: 'aunque + Ind. (real) / Subj. (hip.)',
						example: 'Aunque llueva mañana, iré.'
					},
					{
						label: 'Sustantivas',
						rule: 'Deseo, consejo o duda + que',
						example: 'Es preciso que leamos más.'
					},
					{
						label: 'Pasado (Imperf.)',
						rule: 'Verbo principal pasado + -ra/-se',
						example: 'Pidió que trabajaran juntos.'
					}
				],
				width: 580
			}),
			steps: [
				{
					promptAr: 'قارن بين الجملتين: «Estudio mucho para que mis padres estén orgullosos» و «Estudié mucho para que mis padres estuvieran orgullosos». ما الذي غيّر زمن فعل «estar»؟',
					hintAr: 'انظر إلى زمن الفعل الأول: «Estudio» (حاضر) مقابل «Estudié» (ماضٍ).',
					expectedInput: 'التوافق الزمني: الفعل الرئيسي في الحاضر يتطلب Presente de subjuntivo (estén)، وفي الماضي يتطلب Imperfecto de subjuntivo (estuvieran)',
					revealAr: 'هذه هي القاعدة الذهبية للتوافق الزمني: Presente / Futuro + Presente de subjuntivo؛ أما Pretérito indefinido / Imperfecto / Condicional + Imperfecto de subjuntivo (-ra / -se).'
				},
				{
					promptAr: 'كيف نشتق جذع Pretérito imperfecto de subjuntivo بسهولة من أي فعل إسباني؟',
					hintAr: 'فكّر في صيغة «ellos» في Pretérito indefinido (مثل tuvieron, dijeron, fueron) واحذف «-ron».',
					expectedInput: 'من ضمير ellos في Pretérito indefinido: نحذف -ron ونضيف -ra, -ras, -ra, -ramos, -rais, -ran',
					revealAr: 'طريقة مضمونة 100%: ellos tuvieron: نحذف -ron فيبقى جذع tuvie- ثم نضيف -ra/-se (tuviera, tuvieras, tuviera, tuviéramos, tuvierais, tuvieron/tuvieran).'
				},
				{
					promptAr: 'في الجملة: «Aunque tiene poco tiempo libre, colabora en la biblioteca» مقابل «Aunque tuviera poco tiempo libre, colaboraría». لماذا اختلف الصيغتان بعد «aunque»؟',
					hintAr: 'الأولى تعبر عن حقيقة واقعة متحققة، والثانية عن فرضية متخيّلة.',
					expectedInput: 'aunque + Indicativo للواقع الفعلي، و aunque + Subjuntivo للفرضية أو التحدي غير المؤكد',
					revealAr: 'بعد «aunque»: نستعمل Indicativo عندما نعرض حقيقة معروفة أو مؤكدة، ونستعمل Subjuntivo عندما نشير إلى احتمال أو عقبة افتراضية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الجمل الغائية (Subordinadas finales): الروابط «para que / a fin de que / con el objeto de que» تأخذ Subjuntivo دائماً عند اختلاف الفاعلين (أو Infinitivo مع para عند تطابق الفاعل: «Estudio para aprobar»).',
				'الجمل المصدرية (Subordinadas sustantivas): أفعال الإرادة، الرجاء، التوصية، الضرورة، والشك (querer que, esperar que, aconsejar que, exigir que, es necesario que, dudar que) تأخذ Subjuntivo عند اختلاف الفاعل؛ أما أفعال اليقين المثبتة (saber que, afirmar que, es evidente que) فتأخذ Indicativo (وتأخذ Subjuntivo إذا نُفيت: «No creo que sea...»).',
				'الجمل الاعتراضية (Subordinadas concesivas): «aunque / a pesar de que» + Indicativo لحقيقة واقعة، و + Subjuntivo لفرضية أو شرط مستقبلي أو صعوبة لم تُحسم بعد.',
				'التوافق الزمني (Correlación temporal): Presente / Pretérito perfecto / Futuro + Presente de subjuntivo؛ أما Pretérito indefinido / Imperfecto / Pluscuamperfecto / Condicional + Imperfecto de subjuntivo (-ra / -se).'
			],
			visualSvg: svgSpanishConjugationChart({
				title: 'Presente vs. Imperfecto de Subjuntivo',
				subtitle: 'Regla rápida de terminaciones y correlación',
				columns: [
					{
						header: 'Presente (-AR / -ER,-IR)',
						rule: '-e,-es,-e / -a,-as,-a',
						examples: 'hable, tenga, sea, vaya'
					},
					{
						header: 'Imperfecto (-ra / -se)',
						rule: 'Base ellos indefinido sin -ron',
						examples: 'tuviera, dijera, fuera, hiciera'
					},
					{
						header: 'Correlación clave',
						rule: 'Pres.->Pres.Subj | Pas.->Imp.Subj',
						examples: 'Pidió que leyéramos más.'
					}
				]
			}),
			visualCaptionAr: 'ملخص تصريف المضارع والماضي الناقص في صيغة الشك مع قاعدة التوافق الزمني.',
			examples: [
				{
					problemAr: 'Completa con la forma exacta: «El profesor recomendó a los alumnos que (leer) ensayos variados antes del examen.»',
					solutionAr: 'leyeran (o leyesen) — verbo principal en pretérito indefinido («recomendó») que exige pretérito imperfecto de subjuntivo.'
				},
				{
					problemAr: 'Elige entre indicativo y subjuntivo: «Es evidente que la lectura (mejorar) la expresión, pero dudo que (bastar) sin práctica escrita.»',
					solutionAr: 'mejora (indicativo tras certeza afirmativa «es evidente que») / baste (presente de subjuntivo tras duda «dudo que»).'
				}
			],
			watchOutAr: 'انتبه في Imperfecto de subjuntivo إلى التشديد الكتابي (la tilde) في صيغة «nosotros» دائماً: «habláramos, tuviéramos, fuéramos, leyéramos»!'
		},
		practice: [
			{
				questionAr: 'Elige la conjugación correcta según la correlación temporal: «La directora insistió en que todos los estudiantes .......... puntuales.»',
				options: [
					'fueran',
					'son',
					'serán',
					'sean'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الفعل الرئيسي «insistió» في الماضي، وفعل الطلب يتبع بـ Imperfecto de subjuntivo (fueran).',
					'خطأ: صيغة الحاضر الإخباري لا توافق الطلب ولا الماضي.',
					'خطأ: المستقبل البسيط غير صحيح مع فعل طلب في الماضي.',
					'خطأ: المضارع المنصوب (sean) يُستعمل إذا كان الفعل الرئيسي في الحاضر أو المستقبل.'
				],
				explanationAr: 'مع فعل إرادة أو إصرار في الماضي (insistió) نستخدم Pretérito imperfecto de subjuntivo.'
			},
			{
				questionAr: '¿Qué opción completa correctamente la oración final con el mismo sujeto: «Los jóvenes se preparan bien .......... alcanzar sus objetivos»? ',
				options: [
					'para que',
					'para',
					'aunque',
					'sin embargo'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: para que تُستعمل عند اختلاف الفاعلين وتُتبع بـ Subjuntivo وليس المصدر.',
					'ممتاز: عند تطابق الفاعل نستخدم para + Infinitivo (alcanzar).',
					'خطأ: aunque أداة اعتراض لا غاية.',
					'خطأ: sin embargo رابط استدراك.'
				],
				explanationAr: 'إذا كان الفاعل واحداً في الجملتين نربط الغاية بـ «para + infinitivo».'
			},
			{
				questionAr: '¿Cuál de estas frases expresa un hecho real y comprobado tras «aunque»?',
				options: [
					'Aunque llueva mañana, iremos a la biblioteca.',
					'Aunque tenga dudas, preguntará al profesor.',
					'Aunque la prueba fue exigente, los alumnos obtuvieron buenos resultados.',
					'Aunque viniera tarde, lo esperaríamos.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: «llueva» (subjuntivo) يعبر عن احتمال مستقبلي غير مؤكد.',
					'خطأ: «tenga» (subjuntivo) يشير إلى فرضية.',
					'صحيح: الفعل «fue» (indicativo) يعبر عن واقعة حقيقية منجزة.',
					'خطأ: «viniera» (imperfecto de subjuntivo) يعبر عن فرضية متخيلة.'
				],
				explanationAr: 'يأتي بعد «aunque» صيغة Indicativo عندما تكون العقبة حقيقية ومحققة.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 4: Morfología BAC: derivación, sinónimos y antónimos en contexto
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_lesson_3as_le_t1_morfologia_sinonimos_antonimos',
		slug: 'spa-3as-le-t1-morfologia-sinonimos-antonimos',
		grade: '3as_le',
		yearSubjectId: 793,
		trimesterId: 't1',
		sequenceId: 'unidad1',
		sequenceTitleAr: 'المحور الأول والثاني: الشباب والقيم والتربية واللغات (Ámbito Personal y Educativo)',
		order: 4,
		titleAr: 'الصرف والدلالة BAC: الاشتقاق الثلاثي (Verbo | Sustantivo | Adjetivo)، المرادفات والأضداد في السياق',
		objectives: [
			'إتقان إكمال جدول الاشتقاق الثلاثي في البكالوريا (Verbo | Sustantivo | Adjetivo) بتطبيق لواحق الأسماء والصفات القياسية',
			'استخراج المرادفات (Sinónimos) والأضداد (Antónimos) من النص أو صياغتها سياقياً مع احترام الفئة النحوية نفسها',
			'تكوين الأضداد الصرفية بالسوابق (in-/im-, des-, anti-, ir-) بدقة إملائية كاملة'
		],
		keywordsAr: [
			'Familia de palabras (عائلة الكلمات)',
			'Sustantivación (تكوين الأسماء)',
			'Sufijos (اللواحق)',
			'Prefijos negativos (سوابق النفي)',
			'Sinónimos (المرادفات)',
			'Antónimos (الأضداد)'
		],
		discover: {
			scenarioAr:
				'في قسم الكفاءة اللغوية (Competencia lingüística — 7 نقاط) في امتحان البكالوريا، تتكرر ثلاث تمارين أساسية: جدول الاشتقاق (Verbo / Sustantivo / Adjetivo)، استخراج المرادف أو الضد من النص مع مراعاة نوع الكلمة، وتكوين الأضداد بالسوابق المناسبة.',
			svg: svgSpanishWordFormation({
				title: 'Morfología y Derivación (BAC 3AS LE)',
				prefix: 'in- / des-',
				root: 'toler / educ',
				suffix: '-ancia / -ción',
				derivedWord: 'intolerancia / educación',
				meaningNote: 'Verbo (tolerar) : Sustantivo (tolerancia) : Adjetivo (tolerante)'
			}),
			steps: [
				{
					promptAr: 'أكمل سلسلة الاشتقاق انطلاقاً من الفعل «educar»: ما هو الاسم (Sustantivo) وما هي الصفة (Adjetivo)؟',
					hintAr: 'فكر في اللاحقة -ción للاسم واللاحقة -ivo للفة أو اسم المفعول -ado.',
					expectedInput: 'Verbo: educar | Sustantivo: educación | Adjetivo: educativo (o educado)',
					revealAr: 'اللواحق الأكثر شيوعاً للأسماء المجردة: -ción / -sión, -miento, -dad / -tad, -eza, -ancia / -encia؛ وللصفات: -ivo, -ble, -oso, -al, -ante.'
				},
				{
					promptAr: 'لماذا يُعدّ «responsable» (صفة) خاطئاً كمرادف لكلمة «compromiso» (اسم) في البكالوريا؟',
					hintAr: 'تذكر قاعدة التطابق النحوي في المرادفات والأضداد (Categoría gramatical).',
					expectedInput: 'لأن المرادف والضد يجب أن ينتميا إلى نفس الفئة النحوية (اسم مع اسم، فعل مع فعل، صفة مع صفة)',
					revealAr: 'قاعدة ذهبية في البكالوريا: مرادف الاسم اسم، ومرادف الفعل فعل (بنفس الزمن والمصدر إذا أمكن)، ومرادف الصفة صفة!'
				},
				{
					promptAr: 'ما القاعدة الإملائية للسابقة «in-» أمام الحروف (p, b) وأمام (r, l)؟',
					hintAr: 'جرّب نطق «in + posible» و «in + responsable».',
					expectedInput: 'تتحول إلى im- قبل p/b (imposible)، وإلى i- قبل r مع تشديد r (irresponsable) و i- قبل l (ilegal)',
					revealAr: 'تحوّلات in-: im- أمام b/p (imborrable, impaciente)؛ ir- أمام r (irresponsable, irreal)؛ i- أمام l (ilegal, ilógico).'
				}
			]
		},
		summary: {
			rulesAr: [
				'تكوين الأسماء (Sustantivos): من الفعل عبر -ción / -sión (educar: educación، decidir: decisión)، -miento (crecer: crecimiento، comprometer: compromiso)، -aje (aprender: aprendizaje)؛ ومن الصفة عبر -dad / -tad (honesto: honestidad، libre: libertad)، -eza (noble: nobleza)، -ancia / -encia (constante: constancia، prudente: prudencia).',
				'تكوين الصفات (Adjetivos): -ble / -able / -ible (respetar: respetable، acceder: accesible)، -ivo (educar: educativo)، -oso (esfuerzo: esforzado / valor: valioso)، -al (cultura: cultural)، -ante / -iente (perseverar: perseverante).',
				'تطابق الفئة النحوية في المرادف والضد: Verbo con verbo، Sustantivo con sustantivo، Adjetivo con adjetivo، Adverbio con adverbio (مثلاً: eficazmente = efectivamente، progresar = avanzar).',
				'سوابق الأضداد (Prefijos de oposición): in- (injusto)، im- أمام b/p (imposible)، ir- أمام r (irresponsable)، i- أمام l (ilegible)، des- (desigualdad, desmotivado).'
			],
			visualSvg: svgSpanishConjugationChart({
				title: 'Guía de Sufijos y Prefijos BAC',
				subtitle: 'Familia léxica y antonimia morfológica',
				columns: [
					{
						header: 'Sustantivos',
						rule: '-ción, -miento, -dad, -ancia',
						examples: 'formación, desarrollo, bondad'
					},
					{
						header: 'Adjetivos',
						rule: '-ivo, -ble, -oso, -al, -ante',
						examples: 'formativo, amable, valioso'
					},
					{
						header: 'Prefijos antónimos',
						rule: 'in-, im-, ir-, i-, des-',
						examples: 'imprudente, irreal, desigual'
					}
				]
			}),
			visualCaptionAr: 'دليل اللواحق والسوابق لبناء عائلات الكلمات والأضداد في بكالوريا الإسبانية.',
			examples: [
				{
					problemAr: 'Completa la familia de palabras: Verbo = perseverar | Sustantivo = .......... | Adjetivo = ..........',
					solutionAr: 'Sustantivo = perseverancia | Adjetivo = perseverante.'
				},
				{
					problemAr: 'Forma el antónimo mediante un prefijo adecuado: «prudente», «regular», «legal», «confianza».',
					solutionAr: 'imprudente (m ante p), irregular (r duplicada), ilegal (i ante l), desconfianza (prefijo des-).'
				}
			],
			watchOutAr: 'لا تستعمل لاحقة مخترعة مثل «educamiento» أو «respetación»! اعتمد اللواحق الحقيقية، وتأكد من مطابقة جنس وعدد الصفة عند استخراجها من النص في سؤال المرادفات!'
		},
		practice: [
			{
				questionAr: '¿Qué pareja completa correctamente la familia léxica del verbo «comprender» (Sustantivo y Adjetivo)?',
				options: [
					'comprensión / comprensivo',
					'comprendimiento / comprendoso',
					'comprendación / comprendal',
					'comprensaje / comprensente'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: من «comprender» نشتق الاسم «comprensión» والصفة «comprensivo / comprensible».',
					'خطأ: كلمات غير موجودة في القاموس الإسباني.',
					'خطأ: لاحقة غير صحيحة صرفياً.',
					'خطأ: اشتقاق خاطئ.'
				],
				explanationAr: 'من الفعل «comprender» يتشكل الاسم بـ -sión (comprensión) والصفة بـ -ivo (comprensivo).'
			},
			{
				questionAr: '¿Cuál es el antónimo morfológico correcto del adjetivo «responsable»?',
				options: [
					'inresponsable',
					'imresponsable',
					'irresponsable',
					'antiresponsable'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: أمام الحرف r تسقط n وتُضاعف r.',
					'خطأ: السابعة im- تُستعمل أمام p و b فقط.',
					'ممتاز: in + responsable تصبح irresponsable.',
					'خطأ: لا نستخدم anti- مع هذه الصفة.'
				],
				explanationAr: 'السابقة «in-» تتحول أمام الكلمات المبدوءة بـ «r» إلى «ir-» فتصبح «irresponsable».'
			},
			{
				questionAr: 'Si el texto pide un sinónimo del verbo «fomentar» (تعزيز/تشجيع), ¿qué opción respeta el sentido y la categoría gramatical?',
				options: [
					'impulso (sustantivo)',
					'promover (verbo)',
					'constructivo (adjetivo)',
					'activamente (adverbio)'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: «impulso» اسم وليس فعلاً.',
					'صحيح: «promover» فعل مصدر مطابق في المعنى والفئة النحوية لـ «fomentar».',
					'خطأ: «constructivo» صفة.',
					'خطأ: «activamente» ظرف.'
				],
				explanationAr: 'يجب أن يطابق المرادف الفئة النحوية للكلمة المطلوبة (فعل مقابل فعل: fomentar = promover).'
			}
		]
	}
];
