import type { SpanishInteractiveLessonData } from '../../types';
import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';
import {
	svgSpanishConjugationChart,
	svgSpanishGrammarMap,
	svgSpanishWordFormation,
	svgSpanishWritingBlueprint
} from '../../svg-spanish';

export const LESSONS_2AS_LE_T2: SpanishInteractiveLessonData[] = [
	{
		id: 'spa_lesson_2as_le_t2_ambito_educativo',
		slug: 'spa-2as-le-t2-ambito-educativo',
		grade: '2as_le',
		yearSubjectId: 782,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الثاني: المجال التربوي والتعليمي (Ámbito Educativo)',
		order: 1,
		titleAr:
			'المجال التربوي: الحياة المدرسية، المطالعة وتعلّم اللغات (Ámbito Educativo)',
		objectives: [
			'اكتساب الرصيد المعجمي الدقيق للحياة المدرسية، المطالعة المنتظمة، تعلّم اللغات الأجنبية والبحث التربوي المنظم',
			'تحليل أهمية التوازن بين الكتاب الورقي والمصادر الرقمية الموثوقة في بناء الفكر النقدي لدى تلميذ اللغات الأجنبية',
			'التعبير باللغة الإسبانية عن العادات الدراسية السليمة وآداب الحوار داخل المؤسسة التربوية والمكتبة'
		],
		keywordsAr: [
			'ámbito educativo',
			'vida escolar',
			'lectura y biblioteca',
			'aprendizaje de idiomas',
			'investigación rigurosa',
			'المجال التربوي'
		],
		discover: {
			scenarioAr:
				'في افتتاح أسبوع اللغات والمطالعة بالثانوية، يقرأ التلاميذ هذا النص القصير: «Aprender una lengua extranjera no consiste solo en memorizar listas de palabras; es abrir una puerta hacia el conocimiento científico y el diálogo respetuoso. En la biblioteca del instituto, los alumnos de 2AS consultan diccionarios, redactan fichas de lectura y comparan fuentes digitales fiables para mejorar su expresión escrita y oral.» تأمّل اللوحة المرفقة واستخلص ركائز المجال التربوي.',
			svg: renderLessonIllustration('spa_03_educacion_idiomas_biblioteca', {
				lang: 'es',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'ما الركائز الأربع للمجال التربوي التي تظهر في النص التمهيدي وفي اللوحة التوضيحية المرفقة؟',
					hintAr: 'انظر إلى مفتاح اللوحة (الكتاب، اللغات، البحث الأكاديمي، والنجاح التربوي).',
					expectedInput: 'المطالعة، تعلم اللغات الأجنبية، البحث العلمي المنظم، والتفوق الدراسي',
					revealAr:
						'يرتكز المجال التربوي (Ámbito Educativo) على تكامل أربعة أعمدة: المطالعة في المكتبة (lectura en biblioteca)، إتقان اللغات الأجنبية (aprendizaje de idiomas)، البحث المنهجي الموثق (investigación rigurosa)، والتكوين المتكامل والنجاح (éxito educativo).'
				},
				{
					promptAr:
						'استخرج من النص التمهيدي ثلاث كلمات تنتمي إلى الحقل المعجمي للمدرسة والتعلّم (campo léxico de la educación).',
					hintAr: 'ابحث عن أسماء الأماكن والأدوات والأنشطة الدراسية.',
					expectedInput: 'biblioteca, instituto, diccionarios, fichas de lectura, alumnos',
					revealAr:
						'من أبرز ألفاظ الحقل المعجمي التعليمي في النص: instituto (ثانوية)، biblioteca (مكتبة)، diccionarios (قواميس)، fichas de lectura (بطاقات قراءة)، expresión escrita (تعبير كتابي).'
				},
				{
					promptAr:
						'لماذا حذّر النص من اختزال تعلّم اللغة في حفظ القوائم المعزولة وأكّد على «fuentes digitales fiables»؟',
					hintAr: 'فكر في فرق الحفظ الآلي عن الفهم والمصداقية العلمية.',
					expectedInput: 'لأن اللغة أداة للتفكير والمعرفة والتواصل المسؤول وليست مجرد مفردات معزولة',
					revealAr:
						'إتقان اللغات الأجنبية يمكّن المتعلم من قراءة المصادر الموثوقة (fuentes fiables)، مقارنة المعلومات بوعي نقدي، والانفتاح على العلوم مع الاعتزاز بهويته.'
				}
			]
		},
		summary: {
			rulesAr: [
				'معجم الحياة المدرسية (La vida escolar): el instituto (الثانوية)، el aula (القسم)، la biblioteca (المكتبة)، el horario (جدول الحصص)، la asignatura (المادة الدراسية)، los apuntes (الدروس الملخصة)، el repaso (المراجعة)، la constancia (المواظبة)، el esfuerzo (الاجتهاد).',
				'معجم المطالعة وتعلّم اللغات (Lectura e idiomas): fomentar la lectura (تشجيع المطالعة)، el diccionario bilingüe (القاموس الثنائي)، la comprensión lectora (فهم المقروء)، enriquecer el vocabulario (إثراء الرصيد المعجمي)، traducir con precisión (الترجمة بدقة)، el intercambio cultural (التبادل الثقافي).',
				'البحث المنهجي والأخلاق الرقمية (Investigación y uso responsable): verificar las fuentes (التحقق من المصادر)، evitar la distracción digital (تجنب التشتت الرقمي)، contrastar los datos (مقارنة المعطيات)، citar con honradez (الإسناد بأمانة).',
				'تعبيرات تقييمية للمجال التربوي: «La lectura diaria desarrolla la concentración», «El aprendizaje de lenguas fortalece la capacidad analítica», «Un estudiante organizado distribuye su tiempo entre el estudio y el descanso sano».'
			],
			visualSvg: svgSpanishGrammarMap({
				title: 'Pilares del Ámbito Educativo (2AS LE)',
				rootLabel: 'Formación integral del alumno',
				rootSub: 'Educación, lectura, idiomas y rigor',
				width: 580,
				branches: [
					{
						label: 'Vida escolar',
						rule: 'Instituto y constancia',
						example: 'horario, repaso, deberes'
					},
					{
						label: 'Lectura crítica',
						rule: 'Libros y bibliotecas',
						example: 'diccionario, ficha, análisis'
					},
					{
						label: 'Idiomas (LE)',
						rule: 'Comprender y dialogar',
						example: 'español, léxico, cultura'
					},
					{
						label: 'Rigor digital',
						rule: 'Fuentes fiables',
						example: 'verificar antes de copiar'
					}
				]
			}),
			visualCaptionAr: 'المحاور الأربعة الكبرى لوحدة المجال التربوي في السنة الثانية ثانوي',
			examples: [
				{
					problemAr:
						'Clasifica estas seis palabras según su subcampo educativo: «diccionario, horario, ficha de lectura, asignatura, fuente fiable, resumen crítico».',
					solutionAr:
						'1) Vida escolar: horario, asignatura. | 2) Lectura y estudio: diccionario, ficha de lectura, resumen crítico. | 3) Investigación: fuente fiable.'
				},
				{
					problemAr:
						'Redacta dos consejos educativos claros sobre el uso equilibrado de Internet en el estudio.',
					solutionAr:
						'1) «Conviene consultar enciclopedias y bibliotecas digitales fiables para completar las lecciones.» | 2) «Es necesario evitar las pantallas antes de dormir para descansar bien.»'
				}
			],
			watchOutAr:
				'فرّق إملائياً ودلالياً بين الكلمات المتقاربة في المجال التربوي: «aprobar un examen» (ينجح في امتحان) عكسها «suspender» (يرسب)، ولا تخلط بين «la biblioteca» (المكتبة للمطالعة والاستعارة) و«la librería» (المكتبة التجارية لبيع الكتب)!'
		},
		practice: [
			{
				questionAr:
					'¿Qué diferencia léxica existe en español entre «la biblioteca» y «la librería»?',
				options: [
					'En la biblioteca se leen y prestan libros; en la librería se venden libros.',
					'En la biblioteca solo hay ordenadores y en la librería solo cuadernos.',
					'Son sinónimos exactos que se usan de manera indistinta.',
					'La biblioteca es solo para primaria y la librería para la universidad.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! هذا تمييز معجمي شهير (falso amigo): biblioteca = مكتبة مطالعة واستعارة، librería = متجر بيع الكتب.',
					'خطأ: التمييز قائم على الاستعارة والمطالعة مقابل البيع.',
					'خطأ: ليستا مترادفتين في الإسبانية.',
					'خطأ: لا علاقة له بالمرحلة الدراسية.'
				],
				explanationAr:
					'انتبه لهذه الكلمة الخادعة (falso amigo مع الفرنسية): la biblioteca للمطالعة والاستعارة، بينما la librería هي محل بيع الكتب.'
			},
			{
				questionAr:
					'Elige el conjunto de palabras que pertenece íntegramente al campo léxico de la enseñanza y el aprendizaje:',
				options: [
					'asignatura, apuntes, diccionario, instituto',
					'bosque, energía eólica, reciclaje, sequía',
					'aeropuerto, equipaje, pasaporte, aduana',
					'ladrillo, cemento, puente, alcantarilla'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! كلها مفردات أصيلة في المجال التعليمي والتربوي.',
					'خطأ: هذه مفردات المجال البيئي.',
					'خطأ: هذه مفردات السفر والنقل.',
					'خطأ: هذه مفردات البناء والعمران.'
				],
				explanationAr:
					'المفردات asignatura (مادة)، apuntes (ملخصات)، diccionario (قاموس)، instituto (ثانوية) تشكّل نواة الحقل المعجمي التربوي.'
			},
			{
				questionAr:
					'¿Cuál de las siguientes afirmaciones refleja un hábito de investigación académica rigurosa?',
				options: [
					'Copiar el primer resultado de internet sin leerlo ni comprobar su autoría.',
					'Contrastar varias fuentes fiables, tomar notas propias y redactar con claridad.',
					'Memorizar frases aisladas sin comprender su contexto gramatical.',
					'Dejar toda la preparación de los exámenes para la última noche.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: النسخ الأعمى ينافي الأمانة والمنهجية العلمية.',
					'أحسنت! مقارنة المصادر الموثوقة والتلخيص الشخصي أساس البحث الجاد.',
					'خطأ: الحفظ الآلي دون فهم لا يبني كفاءة لغوية.',
					'خطأ: التسويف يضر بالتحصيل والتركيز.'
				],
				explanationAr:
					'المنهجية الأكاديمية في 2AS LE تقوم على التحقق من المصادر (contrastar fuentes) والتلخيص الشخصي المنظم.'
			}
		]
	},
	{
		id: 'spa_lesson_2as_le_t2_presente_subjuntivo',
		slug: 'spa-2as-le-t2-presente_subjuntivo',
		grade: '2as_le',
		yearSubjectId: 782,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الثاني: المجال التربوي والتعليمي (Ámbito Educativo)',
		order: 2,
		titleAr:
			'صيغة التمني والاحتمال والتوصية: المضارع المنصوب (Presente de Subjuntivo)',
		objectives: [
			'إتقان بناء صيغة Presente de Subjuntivo للأفعال المنتظمة (-ar → -e ؛ -er/-ir → -a) والأفعال ذات التغيرات الجذرية والإملائية (-car/-gar/-zar)',
			'حفظ تصريف الأفعال الشاذة الأساسية في Presente de Subjuntivo (ser, ir, estar, dar, saber, haber, tener, hacer, poder)',
			'التفريق النحوي الدقيق بين استعمال المصدر (infinitivo) عند وحدة الفاعل واستعمال «que + subjuntivo» عند اختلاف الفاعلين في التمني والتوصية والضرورة'
		],
		keywordsAr: [
			'presente de subjuntivo',
			'deseo y recomendación',
			'necesidad (es necesario que)',
			'verbos irregulares',
			'mismo sujeto vs sujeto distinto',
			'المضارع المنصوب'
		],
		discover: {
			scenarioAr:
				'اقرأ نصيحة الأستاذة لطلبة الثانية ثانوي: «Quiero que leáis con atención cada enunciado y recomiendo que repaséis el vocabulario cada día. Es necesario que la biblioteca tenga nuevos diccionarios para que todos los alumnos puedan consultarlos. Por supuesto, yo también quiero mejorar mis clases y espero que vosotros consigáis excelentes resultados.» تأمّل الأفعال المنصوبة بعد «que».',
			svg: svgSpanishGrammarMap({
				title: 'Usos clave del Presente de Subjuntivo (2AS LE)',
				rootLabel: 'Verbo 1 (deseo / consejo) + que + Subjuntivo',
				rootSub: 'Siempre con dos sujetos diferentes',
				width: 580,
				branches: [
					{
						label: 'Deseo',
						rule: 'espero / deseo / quiero que',
						example: 'Espero que tengas éxito.'
					},
					{
						label: 'Recomendación',
						rule: 'recomiendo / aconsejo que',
						example: 'Aconsejo que leas más.'
					},
					{
						label: 'Necesidad',
						rule: 'es necesario / hace falta',
						example: 'Es preciso que estudien.'
					},
					{
						label: 'Finalidad',
						rule: 'para que / a fin de que',
						example: 'Lo explico para que entiendas.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'تأمل الأفعال «leáis» (من leer) و«repaséis» (من repasar) في الجملة الأولى: كيف تبادلت نهايات الأفعال -ar و -er/-ir بين الإخباري والمنصوب؟',
					hintAr: 'في الإخباري: vosotros repasáis / leéis؛ أما في المنصوب: repaséis / leáis!',
					expectedInput: 'أفعال -ar تأخذ حرف e في النهاية، وأفعال -er/-ir تأخذ حرف a',
					revealAr:
						'القاعدة الذهبية لصياغة Presente de Subjuntivo: نقلب الحرف المميز! أفعال المجموعة الأولى (-ar) تأخذ نهايات (-e, -es, -e, -emos, -éis, -en)، وأفعال المجموعتين الثانية والثالثة (-er/-ir) تأخذ نهايات (-a, -as, -a, -amos, -áis, -an).'
				},
				{
					promptAr:
						'قارن بين: «Quiero que leáis con atención» و«Quiero mejorar mis clases». لماذا جاء الأول بـ «que + subjuntivo» والثاني بالمصدر «mejorar»؟',
					hintAr: 'عدّ الفاعلين في كل جملة: من يريد ومن يقرأ؟ ومن يريد ومن يُحسّن؟',
					expectedInput: 'عند اختلاف الفاعلين نستعمل que + subjuntivo، وعند تطابق الفاعل نستعمل المصدر',
					revealAr:
						'قاعدة حاسمة في الامتحانات: إذا كان فاعل الفعل الأول هو نفسه فاعل الفعل الثاني (yo quiero / yo mejorar) نمتنع عن Subjuntivo ونستعمل المصدر (Quiero mejorar)؛ وإذا اختلف الفاعلان (yo quiero / vosotros leer) نستعمل وجوباً «que + subjuntivo».'
				},
				{
					promptAr:
						'ما جذر الفعلين «tenga» (من tener) و«puedan» (من poder) في المضارع المنصوب؟ ومن أين اشتُق الجذر؟',
					hintAr: 'تذكّر تصريف ضمير المتكلم yo في المضارع الإخباري: yo tengo / yo puedo.',
					expectedInput: 'من جذر الضمير yo في المضارع الإخباري (teng- و pued-)',
					revealAr:
						'معظم الأفعال غير المنتظمة في Subjuntivo تأخذ جذر المتكلم المفرد (yo) في Presente de Indicativo بعد حذف حرف -o: tengo → teng- (tenga, tengas...)؛ hago → hag- (haga)؛ digo → dig- (diga)؛ conozco → conozc- (conozca)؛ salgo → salg- (salga)!'
				}
			]
		},
		summary: {
			rulesAr: [
				'قاعدة الاشتقاق من جذر (yo): نأخذ صيغة «yo» في المضارع الإخباري، نحذف «-o»، ونضيف نهايات الصرف العكسي: -ar → (-e, -es, -e, -emos, -éis, -en)؛ و -er/-ir → (-a, -as, -a, -amos, -áis, -an). مثال: hablar → hable؛ comer → coma؛ vivir → viva؛ tener (tengo) → tenga؛ hacer (hago) → haga.',
				'الأفعال الستة الشاذة كلياً (DISHES): dar (dé, des, dé, demos, deis, den)؛ ir (vaya, vayas, vaya, vayamos, vayáis, vayan)؛ ser (sea, seas, sea, seamos, seáis, sean)؛ haber (haya...)؛ estar (esté, estés, esté, estemos, estéis, estén)؛ saber (sepa, sepas, sepa, sepamos, sepáis, sepan).',
				'التغيرات الجذرية والإملائية: (1) أفعال -ar/-er ذات الإدغام (e→ie, o→ue مثل pensar→piense, volver→vuelva) لا تتغير في nosotros/vosotros (pensemos, volvamos)؛ (2) أفعال -ir (pedir, dormir, sentir) يُبدَل حرفها أيضاً في nosotros/vosotros إلى i/u (pidamos, durmamos, sintamos)؛ (3) تغيرات إملائية قبل -e: -car→qu (buscar→busque)، -gar→gu (llegar→llegue)، -zar→c (organizar→organice).',
				'محفزات Presente de Subjuntivo الرئيسية: التمني والإرادة (querer que, desear que, esperar que, ojalá + subj.)؛ النصيحة والتوصية والأمر المهذب (recomendar que, aconsejar que, pedir que, prohibir que)؛ الحاجة والتقييم غير الشخصي (es necesario que, es importante que, conviene que, es mejor que)؛ والغاية (para que, a fin de que).'
			],
			visualSvg: svgSpanishConjugationChart({
				title: 'Formación del Presente de Subjuntivo',
				subtitle: 'Regulares, raíz de YO e irregulares DISHES',
				width: 580,
				columns: [
					{
						header: 'Verbos en -AR',
						rule: 'Terminaciones en -E',
						examples: 'hable, pienses, busquen'
					},
					{
						header: 'Verbos -ER / -IR',
						rule: 'Terminaciones en -A',
						examples: 'lea, escribas, pidamos'
					},
					{
						header: 'Irregulares clave',
						rule: 'DISHES y raíz de yo',
						examples: 'sea, vaya, esté, tenga'
					}
				]
			}),
			visualCaptionAr: 'المرجع السريع لتصريف المضارع المنصوب في اللغة الإسبانية',
			examples: [
				{
					problemAr:
						'Conjuga en Presente de Subjuntivo o Infinitivo según el sujeto: «El profesor recomienda que nosotros (leer) más y yo deseo (aprender) bien el español.»',
					solutionAr:
						'«El profesor recomienda que nosotros leamos más (فاعلان مختلفان → Subjuntivo) y yo deseo aprender bien el español (نفس الفاعل → Infinitivo).»'
				},
				{
					problemAr:
						'Aplica los cambios ortográficos y los irregulares: «Espero que tú (buscar) buenas fuentes, (organizar) tus apuntes y (ser) muy constante.»',
					solutionAr:
						'«Espero que tú busques buenas fuentes (-car→qu), organices tus apuntes (-zar→c) y seas muy constante (ser→sea).»'
				}
			],
			watchOutAr:
				'احذر من فخين كلاسيكيين في Subjuntivo: (1) مع عبارة التأكد غير المنفية «Es verdad que / Creo que / Es evidente que» نستعمل INDICATIVO لا Subjuntivo! لا ينتصب الفعل إلا عند النفي («No creo que sea difícil»)؛ (2) في تغيرات الإملاء لـ buscar / llegar / organizar نعدل الحرف قبل e: busque, llegue, organice.'
		},
		practice: [
			{
				questionAr:
					'Completa correctamente las dos frases respetando la regla del sujeto: «Quiero ...... más libros y espero que mi hermano ...... conmigo a la biblioteca.»',
				options: [
					'que lea / viene',
					'leer / venga',
					'leyendo / vendrá',
					'leer / viene'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: عند وحدة الفاعل (yo quiero / yo leer) نستخدم المصدر، وبعد espero que يلزم Subjuntivo.',
					'ممتاز! نفس الفاعل يأخذ المصدر (leer)، واختلاف الفاعلين بعد espero que يفرض Subjuntivo (venga من venir/vengo).',
					'خطأ: لا يستعمل gerundio بعد querer ولا futuro بعد espero que.',
					'خطأ: الفعل الثاني viene في الإخباري مع أنه مسبوق بـ espero que.'
				],
				explanationAr:
					'مع تطابق الفاعل نستعمل المصدر (Quiero leer)، ومع اختلاف الفاعلين بعد فعل التمني نستعمل Presente de Subjuntivo (espero que venga).'
			},
			{
				questionAr:
					'Elige la forma exacta en Presente de Subjuntivo: «Es imprescindible que los estudiantes ...... (organizar) su tiempo y ...... (buscar) fuentes fiables.»',
				options: [
					'organizen / buscen',
					'organicen / busquen',
					'organizan / buscan',
					'organizarán / buscarán'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: قبل حرف e تتحول z إلى c و c إلى qu حفاظاً على النطق.',
					'أحسنت! organicen (-zar → -ce-) و busquen (-car → -que-) مضبوطتان إملائياً.',
					'خطأ: هذه صيغ المضارع الإخباري بعد «Es imprescindible que».',
					'خطأ: لا نضع المستقبل بعد عبارة الوجوب «Es imprescindible que».'
				],
				explanationAr:
					'الأفعال المنتهية بـ -zar تغيّر z إلى c (organicen)، والمنتهية بـ -car تغيّر c إلى qu (busquen) قبل نهايات -e في Subjuntivo.'
			},
			{
				questionAr:
					'¿Cuál de estas oraciones contiene un verbo irregular correctamente conjugado en Presente de Subjuntivo?',
				options: [
					'Deseo que todos los alumnos sean respetuosos y vayan a la biblioteca.',
					'Deseo que todos los alumnos son respetuosos y van a la biblioteca.',
					'Deseo que todos los alumnos sientan? No, esperan que hayas éxito?',
					'Ojalá el examen es fácil y tengamos mucho tiempo.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! الفعلان الشاذان ser (sean) و ir (vayan) مصرفان بدقة في Presente de Subjuntivo.',
					'خطأ: son و van في المضارع الإخباري.',
					'خطأ: صيغة مضطربة وغير سليمة نحوياً.',
					'خطأ: بعد Ojalá يجب أن يكون الفعل الأول أيضاً في Subjuntivo (sea).'
				],
				explanationAr:
					'تصريف ser و ir في Presente de Subjuntivo للجمع الغائب هو sean و vayan (من شواذ DISHES).'
			}
		]
	},
	{
		id: 'spa_lesson_2as_le_t2_derivacion_lexica',
		slug: 'spa-2as-le-t2-derivacion-lexica',
		grade: '2as_le',
		yearSubjectId: 782,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الثاني: المجال التربوي والتعليمي (Ámbito Educativo)',
		order: 3,
		titleAr:
			'الاشتقاق المعجمي والسوابق واللواحق والترادف والتضاد (Derivación léxica: Verbo | Sustantivo | Adjetivo)',
		objectives: [
			'بناء جدول العائلة اللغوية الكامل (Verbo | Sustantivo | Adjetivo) لمفردات المجال التربوي والعلمي في 2AS LE',
			'إتقان أبرز اللواحق الاسمية (-ción, -sión, -miento, -dad, -ez, -anza) واللواحق الصفاتية (-ivo, -ble, -oso, -al, -dor)',
			'توظيف السوابق الدلالية (in-/im-/i-, des-, re-, anti-) لاستنتاج الأضداد وفهم الكلمات الجديدة، والتمييز بين الترادف والتضاد السياقي'
		],
		keywordsAr: [
			'derivación léxica',
			'familia de palabras',
			'prefijos y sufijos',
			'sinónimos y antónimos',
			'verbo / sustantivo / adjetivo',
			'الاشتقاق المعجمي'
		],
		discover: {
			scenarioAr:
				'في تمرين البناء اللغوي بالامتحان، يُطلب منك غالباً إكمال جدول العائلة اللغوية أو استخراج ضد كلمة بإضافة سابقة مثل: «educar → educación → educativo»، «comprender → comprensión → comprensible → incomprensible»، «leer → lectura → legible → ilegible». تأمّل كيف تتحول الكلمة بين الفعل والاسم والصفة والنفي.',
			svg: svgSpanishWordFormation({
				title: 'Derivación léxica en español (Prefijo + Raíz + Sufijo)',
				prefix: 'in-',
				root: 'comprens',
				suffix: '-ible',
				derivedWord: 'incomprensible (que no se puede comprender)',
				meaningNote:
					'El prefijo cambia el sentido (negación); el sufijo define la categoría gramatical.'
			}),
			steps: [
				{
					promptAr:
						'قارن بين الكلمتين: «comprensible» و «incomprensible». ماذا غيّرت اللاحقة «-ible» وماذا غيّرت السابقة «in-»؟',
					hintAr: 'هل بقي الصنف النحوي صفة بعد إضافة in-؟',
					expectedInput: 'اللاحقة -ible تصوغ صفة بمعنى القابلية، والسابقة in- تنفي المعنى دون تغيير الصنف',
					revealAr:
						'القاعدة المورفولوجية: اللاحقة (sufijo) تغير الصنف النحوي للكلمة (من فعل إلى اسم أو صفة)، بينما السابقة (prefijo: in-, im-, i-, des-, re-) تغير المعنى فقط (النفي أو التكرار) وتبقي الصنف النحوي كما هو.'
				},
				{
					promptAr:
						'لماذا صار نفي «posible» هو «imposible» (بـ im-)، ونفي «legible» هو «ilegible» (بـ i-)، ونفي «necesario» هو «innecesario» (بـ in-)؟',
					hintAr: 'انظر إلى الحرف الأول في الجذر بعد السابقة.',
					expectedInput: 'تتحول in- إلى im- قبل p/b وإلى i- قبل l/r',
					revealAr:
						'قانون التكيف الإملائي للسابقة النافية in-: تكتب im- قبل p أو b (imposible, imborrable)؛ وتكتب i- فقط (وليس il- أو ir- مفردة، بل r تتضاعف إلى rr!) قبل l أو r: legal → ilegal؛ responsable → irresponsable!'
				},
				{
					promptAr:
						'أكمل شفوياً العائلة اللغوية للفعل «investigar»: ما الاسم وما الصفة؟',
					hintAr: 'الاسم ينتهي بـ -ción والصفة بـ -dor أو -tivo.',
					expectedInput: 'investigar (verbo) | investigación (sustantivo) | investigador / investigativo (adjetivo)',
					revealAr:
						'من الفعل «investigar» نشتق الاسم «la investigación» والصفة/الاسم الفاعل «investigador/a».'
				}
			]
		},
		summary: {
			rulesAr: [
				'جدول العائلة اللغوية (Verbo | Sustantivo | Adjetivo): أمثلة محورية في 2AS LE: educar | educación | educativo؛ aprender | aprendizaje | aprendible؛ enseñar | enseñanza | enseñable؛ leer | lectura | legible؛ escribir | escritura | escrito؛ pensar | pensamiento | pensativo؛ respetar | respeto | respetuoso؛ responsabilizar | responsabilidad | responsable.',
				'أشهر اللواحق الاسمية (Sufijos nominales): -ción / -sión (educación, comprensión)، -miento (aprendizaje/conocimiento/pensamiento)، -dad / -tad (responsabilidad, solidaridad, libertad)، -ez / -eza (madurez, riqueza)، -anza (enseñanza, confianza).',
				'أشهر اللواحق الصفاتية (Sufijos adjetivales): -ivo/-iva (educativo, informativo)، -ble (legible, responsable, comprensible)، -oso/-osa (respetuoso, estudioso, valioso)، -al (cultural, escolar, ambiental)، -dor/-dora (trabajador, innovador).',
				'السوابق الدلالية والترادف والتضاد (Prefijos, sinónimos y antónimos): النفي بـ in-/im-/i- (capaz/incapaz, paciente/impaciente, lógico/ilógico, real/irreal [تضاعف r إلى rr!])؛ النفي أو العكس بـ des- (orden/desorden, conocer/desconocer)؛ التكرار بـ re- (leer/releer, redactar/reredactar [أو rehacer]). الترادف (sinónimos: alumno = estudiante؛ comenzar = empezar؛ lograr = conseguir؛ fundamental = esencial) والتضاد (antónimos: éxito / fracaso؛ fácil / difícil؛ ventaja / inconveniente).'
			],
			visualSvg: svgSpanishGrammarMap({
				title: 'Mecanismos de derivación léxica (2AS LE)',
				rootLabel: 'Ampliar el vocabulario español',
				rootSub: 'Sufijos de categoría + Prefijos de sentido',
				width: 580,
				branches: [
					{
						label: 'Sustantivos',
						rule: '-ción, -miento, -dad',
						example: 'educación, conocimiento'
					},
					{
						label: 'Adjetivos',
						rule: '-ivo, -ble, -oso, -al',
						example: 'educativo, legible, escolar'
					},
					{
						label: 'Prefijos neg.',
						rule: 'in-, im-, i-, des-',
						example: 'imposible, ilegal, desorden'
					},
					{
						label: 'Repetición',
						rule: 'Prefijo re- (otra vez)',
						example: 'releer, rehacer, revisar'
					}
				]
			}),
			visualCaptionAr: 'آليات الاشتقاق المعجمي لبناء جدول الفعل والاسم والصفة في الامتحان',
			examples: [
				{
					problemAr:
						'Completa la tabla «Verbo | Sustantivo | Adjetivo» para estas tres raíces: a) educar ; b) ...... | comprensión | ...... ; c) respetar | ...... | ...... .',
					solutionAr:
						'a) educar | educación | educativo/a ; b) comprender | comprensión | comprensible (o comprensivo) ; c) respetar | respeto | respetuoso/a.'
				},
				{
					problemAr:
						'Forma el antónimo por prefijación de: «responsable», «posible», «lógico», «ordenado».',
					solutionAr:
						'irresponsable (تضاعف r بعد i-)، imposible (im- قبل p)، ilógico (i- قبل l)، desordenado (des-).'
				}
			],
			watchOutAr:
				'احذر من خطأين إملائيين في الامتحان: (1) في الإسبانية لا نكتب «illógico» بحرفي l بل «ilógico» بلام واحدة! أما حرف r فيتضاعف بين حرفي علة للحفاظ على النطق القوي: «irresponsable»، «irreal»! (2) انتبه لعدم الخلط بين الفرنسية والإسبانية في -tion الفرنسية مقابل -ción الإسبانية (la educación، وليس «éducation»).'
		},
		practice: [
			{
				questionAr:
					'¿Cuál es la serie correcta que completa la familia de palabras (Verbo | Sustantivo | Adjetivo) de «comprender»?',
				options: [
					'comprender | comprendimiento | comprendioso',
					'comprender | comprensión | comprensible',
					'comprender | comprensivo | comprensión',
					'comprender | comprensa | comprensor'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الاسم الصحيح من comprender هو comprensión وليس comprendimiento.',
					'ممتاز! comprender (فعل) | comprensión (اسم) | comprensible / comprensivo (صفة).',
					'خطأ: عكس الترتيب بين الاسم والصفة.',
					'خطأ: صيغ غير قياسية في الإسبانية.'
				],
				explanationAr:
					'الفعل comprender يشتق منه الاسم la comprensión والصفة comprensible (قابل للفهم) أو comprensivo (متفهم).'
			},
			{
				questionAr:
					'Señala el grupo de antónimos correctamente formados mediante prefijos negativos en español:',
				options: [
					'inposible, illógico, inresponsable, desordenado',
					'imposible, ilógico, irresponsable, desordenado',
					'imposible, illógico, iresponsable, desordenado',
					'inposible, ilógico, irresponsable, inordenado'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: نكتب im- قبل p، و i- بلام واحدة في ilógico، و rr في irresponsable.',
					'أحسنت! imposible (im- + p)، ilógico (i- + l)، irresponsable (i- + rr)، desordenado (des-).',
					'خطأ: ilógico بلام واحدة و irresponsable براءين.',
					'خطأ: imposible بالميم و desordenado بالسابقة des-.'
				],
				explanationAr:
					'تخضع السابقة النافية in- لثلاث قواعد إملائية: im- قبل p/b، و i- قبل l (ilógico)، وتضاعف r إلى rr بين علتين (irresponsable).'
			},
			{
				questionAr:
					'¿Qué sufijo transforma los verbos «conocer» y «pensar» en sustantivos abstractos?',
				options: [
					'-ble (conocible, pensable)',
					'-oso (conocioso, pensoso)',
					'-miento (conocimiento, pensamiento)',
					'-ivo (conocitivo, pensivo)'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: -ble تصوغ صفة لا اسماً.',
					'خطأ: -oso لاحقة صفاتية.',
					'صحيح! اللاحقة -miento تُكوّن أسماءً مجردة من الأفعال: el conocimiento و el pensamiento.',
					'خطأ: -ivo تصوغ صفة.'
				],
				explanationAr:
					'اللاحقة الاسمية -miento من أهم لواحق الأسماء المشتقة من الأفعال في المجال التعليمي (conocimiento, pensamiento, razonamiento).'
			}
		]
	},
	{
		id: 'spa_lesson_2as_le_t2_expresion_escrita_guiada',
		slug: 'spa-2as-le-t2-expresion_escrita_guiada',
		grade: '2as_le',
		yearSubjectId: 782,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الثاني: المجال التربوي والتعليمي (Ámbito Educativo)',
		order: 4,
		titleAr:
			'التعبير الكتابي الموجّه في الثانية ثانوي: الفقرة الحجاجية والرسالة التربوية (Expresión escrita guiada)',
		objectives: [
			'بناء فقرة حجاجية متماسكة (párrafo argumentativo) حول قضية تربوية انطلاقاً من معطيات موجّهة (pautas)',
			'إتقان البنية الشكلية واللغوية للرسالة التربوية الرسمية (carta educativa formal) الموجّهة لإدارة الثانوية أو المكتبة',
			'توظيف الروابط التنظيمية والحجاجية (en primer lugar, además, por ejemplo, en conclusión) مع أفعال الرأي وPresente de Subjuntivo عند الاقتضاء'
		],
		keywordsAr: [
			'expresión escrita guiada',
			'párrafo argumentativo',
			'carta educativa formal',
			'tesis y argumentos',
			'conectores organizadores',
			'التعبير الكتابي الموجّه'
		],
		discover: {
			scenarioAr:
				'في الجزء الثالث من امتحان اللغة الإسبانية (6 نقاط)، يختار تلميذ 2AS LE بين الموضوع الموجّه (Tema 1: Guiado) المزوّد بمؤشرات ومعطيات (pautas) وبين الموضوع الحر (Tema 2: Libre). تأمّل مراحل بناء الفقرة الحجاجية المتكاملة في المخطط البصري المرفق.',
			svg: svgSpanishWritingBlueprint({
				title: 'Plan del párrafo argumentativo en 2AS LE',
				width: 580,
				steps: [
					{
						stage: '1. Introducción',
						detail: 'Presentar el tema y formular la tesis con claridad.'
					},
					{
						stage: '2. Argumentos',
						detail: 'En primer lugar... Además... (2 o 3 razones sólidas).'
					},
					{
						stage: '3. Ejemplos',
						detail: 'Por ejemplo... Concretar con la vida escolar real.'
					},
					{
						stage: '4. Conclusión',
						detail: 'En conclusión... Cerrar con una recomendación.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'ما الفرق بين الموضوع الأول الموجّه (Tema 1 Guiado) والموضوع الثاني الحر (Tema 2 Libre) في ورقة الامتحان؟',
					hintAr: 'هل يلتزم التلميذ في Tema 1 بالنقاط المعطاة في Pautas أم يتجاهلها؟',
					expectedInput: 'Tema 1 يزود التلميذ بنقاط وإرشادات معجمية يجب توظيفها كلها وتوسيعها، وTema 2 حر يعتمد على تخطيط التلميذ',
					revealAr:
						'في الموضوع الموجّه (Tema 1)، تمنحك الورقة مؤشرات مساعدة (pautas y recursos léxicos)؛ ويجب دمج جميع تلك العناصر في فقرة مترابطة دون سردها كقائمة نقاط جافة!'
				},
				{
					promptAr:
						'لماذا نبدأ الجملة بـ «En primer lugar», «Además», «Por ejemplo» و«En conclusión» في الفقرة الحجاجية التربوية؟',
					hintAr: 'تسمى هذه الكلمات أدوات الربط التنظيمي (conectores organizadores).',
					expectedInput: 'لضمان التدرج المنطقي وتنظيم الأفكار وربط الحجج بالأمثلة والخاتمة',
					revealAr:
						'الروابط التنظيمية (en primer lugar, por una parte, además, sin embargo, en conclusión) تمنح النص انسجاماً (coherencia y cohesión) وترفع علامة الإتقان المنهجي.'
				},
				{
					promptAr:
						'ما العناصر الأربعة الأساسية التي تميز الرسالة التربوية الرسمية (Carta educativa formal) الموجّهة لمدير الثانوية؟',
					hintAr: 'تذكر أعلى الرسالة، التحية الرسمية، مضمون الطلب باحترام، والخاتمة.',
					expectedInput: 'المكان والتاريخ، التحية الرسمية (Estimado/a director/a)، جسم الرسالة، وعبارة الوداع والتوقيع',
					revealAr:
						'تتكون الرسالة الرسمية من: (1) Lugar y fecha؛ (2) Saludo formal (Estimado director / Distinguida directora:)؛ (3) Cuerpo claro (عرض الغرض والمبررات بصيغة usted وأفعال التوصية مثل solicitamos que / esperamos que + Subjuntivo)؛ (4) Despedida formal y firma (Atentamente, los alumnos de 2AS LE).'
				}
			]
		},
		summary: {
			rulesAr: [
				'منهجية الفقرة الحجاجية (Párrafo argumentativo — 100 إلى 130 كلمة): (1) المقدمة والطرح (En la actualidad... / Pienso que...)؛ (2) الحجة الأولى مع مثال (En primer lugar... Por ejemplo...)؛ (3) الحجة الثانية أو الاستدراك (Además... Aunque...)؛ (4) الخاتمة والتوصية (En conclusión, es necesario que... / Debemos fomentar...).',
				'توظيف المعطيات الموجّهة (Pautas): عند اختيار Tema 1 (Guiado)، حوّل كل نقطة إرشادية إلى جملة إسبانية تامة ومصرفة زمنياً، واربط بينها بالروابط المنطقية (porque, por lo tanto, además, para que) بدلاً من وضع مطات!',
				'هيكلة الرسالة التربوية الرسمية (Carta educativa formal): المكان والتاريخ في الأعلى يميناً (Constantina, 15 de febrero de 2026)؛ التحية الرسمية بنقطتين (Estimado Sr. Director:)؛ الافتتاحية المحددة للغرض (Me dirijo a usted con el debido respeto para proponer...)؛ عرض الفوائد التربوية؛ الختام المهذب (Esperando una respuesta favorable, le saluda atentamente...).',
				'معايير التنقيط الرسمية في Expresión Escrita (6 نقاط): (1) الملاءمة وتغطية المطلوب (Pertinencia: 2 pts)؛ (2) الانسجام والربط المنطقي (Coherencia y conectores: 1.5 pt)؛ (3) السلامة اللغوية وتصريف الأفعال والـ Subjuntivo (Corrección gramatical: 1.5 pt)؛ (4) ثراء المعجم والإملاء وتنظيم الورقة (Léxico y presentación: 1 pt).'
			],
			visualSvg: svgSpanishWritingBlueprint({
				title: 'Estructura de la Carta Educativa Formal',
				width: 580,
				steps: [
					{
						stage: '1. Encabezado',
						detail: 'Ciudad y fecha + Destinatario (Sr./Sra. Director/a).'
					},
					{
						stage: '2. Saludo formal',
						detail: 'Estimado/a Director/a: (dos puntos al final).'
					},
					{
						stage: '3. Cuerpo',
						detail: 'Motivo + argumentos claros + peticiones (usted).'
					},
					{
						stage: '4. Despedida',
						detail: 'Atentamente / Le saluda cordialmente + Firma.'
					}
				]
			}),
			visualCaptionAr: 'المخطط الهيكلي المعتمد لكتابة الرسالة التربوية الرسمية في الإسبانية',
			examples: [
				{
					problemAr:
						'Transforma estas tres pautas en una breve secuencia argumentativa coherente: [lectura diaria / ampliar vocabulario / mejorar redacción].',
					solutionAr:
						'«En primer lugar, la lectura diaria en español amplía nuestro vocabulario de forma natural. Además, al observar modelos bien escritos, aprendemos a estructurar mejor nuestras propias redacciones.»'
				},
				{
					problemAr:
						'Redacta el saludo, la frase inicial de motivo y la despedida de una carta formal al director del instituto para crear un club de lectura.',
					solutionAr:
						'«Estimado Director: Me dirijo a usted en nombre de los alumnos de 2AS LE para solicitar su autorización con el fin de crear un club semanal de lectura en español... Atentamente, los estudiantes de 2AS LE.»'
				}
			],
			watchOutAr:
				'انتبه لثلاثة أخطاء شائعة في الرسالة الإسبانية: (1) بعد التحية الرسمية نضع نقطتين (:) لا فاصلة! مثال: «Estimado Sr. Director:» ثم نبدأ السطر الموالي بحرف كبير؛ (2) في الرسالة الرسمية لمدير أو مسؤول نخاطبه بصيغة الاحترام «usted» (الضمير الثالث: usted، su، le) لا بـ tú!؛ (3) تجنب ترجمة التحيات الفرنسية حرفياً وحافظ على الصيغ الإسبانية الأصيلة.'
		},
		practice: [
			{
				questionAr:
					'En una carta formal en español dirigida al director del instituto, ¿qué puntuación y tratamiento son correctos en el saludo inicial?',
				options: [
					'Querido director, (y tutearlo con «tú»)',
					'Estimado Sr. Director: (y tratarlo de «usted»)',
					'¡Hola amigo director! (y tratarlo de «vosotros»)',
					'Estimado Sr. Director; (sin firma al final)'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: في الإسبانية نضع نقطتين بعد التحية ونستعمل «Estimado» وصيغة الاحترام «usted».',
					'ممتاز! التحية الرسمية تُختم بنقطتين (:) ونستعمل صيغة الاحترام usted.',
					'خطأ: أسلوب عامي مرفوض في المراسلة الإدارية.',
					'خطأ: لا نختم التحية بفاصلة منقوطة وتلزم الخاتمة والتوقيع.'
				],
				explanationAr:
					'في المراسلة الرسمية الإسبانية نكتب «Estimado Sr. Director:» بنقطتين، ونعتمد ضمير الاحترام «usted» في كامل الجسم.'
			},
			{
				questionAr:
					'¿Cuál es la mejor manera de aprovechar las «pautas» (notas guiadas) en el Tema 1 de Expresión Escrita?',
				options: [
					'Copiar las notas tal cual con guiones sin redactar oraciones completas.',
					'Integrar todas las pautas en un texto fluido y bien enlazado mediante conectores lógicos.',
					'Ignorar las pautas y escribir sobre un tema completamente distinto.',
					'Escribir únicamente tres palabras por cada pauta.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: ترك المعطيات في شكل قائمة نقطية يُفقد النص طابعه الإنشائي.',
					'أحسنت! دمج جميع المعطيات الموجّهة في فقرات مترابطة بالروابط المنطقية هو المطلوب.',
					'خطأ: تجاهل المعطيات يخل بمطلب الملاءمة (pertinencia).',
					'خطأ: يجب بلوغ الحجم المطلوب بجمل تامة ومتنوعة.'
				],
				explanationAr:
					'المطلوب في Tema 1 هو تحويل الأفكار الموجّهة إلى نص متكامل ومترابط باستعمال الروابط الزمنية والمنطقية.'
			},
			{
				questionAr:
					'Señala el conector adecuado para introducir el cierre y una recomendación final en un texto argumentativo:',
				options: [
					'En primer lugar,',
					'Por ejemplo,',
					'En conclusión,',
					'Sin embargo,'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: هذا رابط لافتتاح الحجة الأولى.',
					'خطأ: هذا رابط للتمثيل داخل العرض.',
					'صحيح! «En conclusión,» (أو «En definitiva,») تفتح الخاتمة والتوصية النهائية.',
					'خطأ: هذا رابط للاستدراك والتعارض.'
				],
				explanationAr:
					'تُستعمل روابط مثل En conclusión أو En resumen أو Por todo ello لفتح الخاتمة وتلخيص الموقف.'
			}
		]
	}
];
