import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';
import {
	svgSpanishConjugationChart,
	svgSpanishGrammarMap,
	svgSpanishTenseTimeline,
	svgSpanishWritingBlueprint
} from '../../svg-spanish';
import type { SpanishInteractiveLessonData } from '../../types';

/**
 * 3AS BAC Foreign Languages (لغات أجنبية — yearSubjectId: 793, coeff 4, 03h00, 7+7+6=20)
 * Interactive Lessons — Trimestre 3 : Ámbito Laboral-Económico & Páginas Eternas (4 lessons)
 */
export const LESSONS_3AS_LE_T3: SpanishInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 1: Ámbito Laboral-Económico — Trabajo, emprendimiento y solidaridad
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_lesson_3as_le_t3_trabajo_emprendimiento_solidaridad',
		slug: 'spa-3as-le-t3-trabajo-emprendimiento-solidaridad',
		grade: '3as_le',
		yearSubjectId: 793,
		trimesterId: 't3',
		sequenceId: 'unidad3',
		sequenceTitleAr: 'المحور الخامس والسادس: عالم الشغل وريادة الأعمال وصفحات خالدة (Ámbito Laboral y Páginas Eternas)',
		order: 1,
		titleAr: 'عالم الشغل، ريادة الأعمال الشبابية والتضامن الاقتصادي (El mundo del trabajo, el emprendimiento juvenil y la solidaridad)',
		objectives: [
			'تحليل نصوص المحور الاقتصادي والمهني حول التكوين المهني، المبادرة الفردية، المشاريع الناشئة للشباب (emprendimiento)، والعمل التعاوني المتضامن',
			'إتقان المصطلحات الاقتصادية والمهنية الأساسية (inserción laboral, formación profesional, iniciativa, cooperativa, productividad, ética laboral)',
			'ربط النجاح الاقتصادي في إجابات البكالوريا بقيم الإتقان، النزاهة المهنية، وروح التضامن الاجتماعي'
		],
		keywordsAr: [
			'Mundo laboral (عالم الشغل)',
			'Emprendimiento (ريادة الأعمال)',
			'Formación profesional (التكوين المهني)',
			'Solidaridad económica (التضامن الاقتصادي)',
			'Iniciativa juvenil (مبادرة الشباب)',
			'Ética profesional (أخلاقيات المهنة)'
		],
		discover: {
			scenarioAr:
				'في الفصل الثالث من برنامج البكالوريا، ينتقل الطالب إلى عالم الشغل والاقتصاد (Ámbito Laboral-Económico): كيف يواجه الشباب البطالة عبر التكوين المستمر وريادة الأعمال (emprendimiento) والتعاونيات المحلية التي تجمع بين الابتكار وخدمة المجتمع؟',
			svg: renderLessonIllustration('spa_06_mundo_laboral_emprendimiento', {
				lang: 'es',
				pins: []
			}),
			steps: [
				{
					promptAr: 'ما المقصود بمصطلح «el emprendimiento juvenil» في نصوص الاقتصاد والعمل؟ وكيف يختلف عن انتظار الوظيفة التقليدية؟',
					hintAr: 'فكّر في المبادرة لإنشاء مشروع إنتاجي أو خدمي يحل مشكلة محلية ويخلق مناصب شغل.',
					expectedInput: 'قدرة الشباب على إطلاق مشاريع مبتكرة ومستقلة تخلق قيمة اقتصادية وفرص عمل بدل الاكتفاء بالانتظار',
					revealAr: 'تشجع نصوص 3AS LE ثقافة المبادرة (la iniciativa) والابتكار (la innovación) والتكوين المستمر لتحويل الأفكار العلمية والزراعية والتقنية إلى مشاريع ناجحة.'
				},
				{
					promptAr: 'لماذا تربط نصوص المنهج دائماً بين «la productividad» (الإنتاجية) و«la solidaridad y la ética» (التضامن والأخلاق)؟',
					hintAr: 'هل يكفي الربح المادي وحده لتحقيق تنمية عادلة ومستدامة؟',
					expectedInput: 'لأن العمل المثمر يقوم على الأمانة والإتقان والتكافل بين العمال وخدمة حاجات المجتمع الحقيقية',
					revealAr: 'النموذج الاقتصادي السليم في BAC LE يرفض الجشع والغش ويرتكز على الإتقان (el trabajo bien hecho)، والتعاون (las cooperativas)، والتضامن.'
				},
				{
					promptAr: 'اقرأ العبارة: «La formación profesional y el dominio de las lenguas multiplican las oportunidades de inserción laboral». ما العاملان المذكوران لفرص التوظيف؟',
					hintAr: 'ابحث عن المركبين الاسميين قبل الفعل «multiplican».',
					expectedInput: 'التكوين المهني وإتقان اللغات الأجنبية',
					revealAr: 'يربط النص بين مهارات الميدان (التكوين المهني والتقني) والقدرة التواصلية باللغات لتوسيع آفاق الشاب في سوق العمل.'
				}
			]
		},
		summary: {
			rulesAr: [
				'قضايا المحور المهني والاقتصادي: الانتقال من الدراسة إلى الحياة العملية (la transición al mundo laboral)، أهمية التكوين المهني والجامعي، مكافحة البطالة (el desempleo) عبر المشاريع الناشئة (empresas emergentes)، والاقتصاد التضامني (economía solidaria y cooperativas).',
				'ثنائية التحول المهني: المهن التقليدية (oficios tradicionales) والمهن الرقمية والبيئية الجديدة (empleos verdes y tecnológicos).',
				'القيم المهنية المتكررة في البكالوريا: الكفاءة (la competencia)، الأمانة والإتقان (la honradez y el rigor)، العمل الجماعي (el trabajo en equipo)، والمثابرة أمام عقبات التأسيس (superar los primeros tropiezos).',
				'صياغة الحجج الاقتصادية في التعبير: استعمل تعابير مثل «fomentar el empleo juvenil»، «impulsar la producción local»، «conciliar la eficacia económica con la justicia social».'
			],
			visualSvg: svgSpanishGrammarMap({
				title: 'Emprendimiento y Trabajo Solidario (BAC 3AS LE)',
				rootLabel: 'Cultura laboral responsable',
				rootSub: 'Claves para el empleo juvenil y el desarrollo',
				branches: [
					{
						label: 'Formación',
						rule: 'Capacitación técnica continua',
						example: 'adaptarse a nuevos oficios'
					},
					{
						label: 'Emprendimiento',
						rule: 'Iniciativa propia e innovación',
						example: 'crear proyectos productivos'
					},
					{
						label: 'Solidaridad',
						rule: 'Cooperativas y apoyo mutuo',
						example: 'prosperidad compartida'
					},
					{
						label: 'Ética laboral',
						rule: 'Rigor, honradez y esmero',
						example: 'dignidad del trabajo honrado'
					}
				],
				width: 580
			}),
			visualCaptionAr: 'المرتكزات الأربعة لثقافة العمل وريادة الأعمال والتضامن الاقتصادي في برنامج الثالثة ثانوي.',
			examples: [
				{
					problemAr: 'Pregunta de texto: «¿De qué manera contribuyen las cooperativas juveniles a fortalecer la economía local?»',
					solutionAr: 'Permiten unir recursos y conocimientos técnicos, reducir los costes iniciales, generar empleo estable en la región y promover el desarrollo solidario.'
				},
				{
					problemAr: 'Respuesta de reflexión (4 líneas): «¿Por qué es importante valorar tanto la formación profesional como los estudios universitarios?»',
					solutionAr: 'En mi opinión, una sociedad equilibrada necesita tanto investigadores universitarios como técnicos cualificados en oficios prácticos. La formación profesional aporta soluciones concretas a la industria y la agricultura, dignifica el trabajo manual y facilita una rápida inserción laboral para los jóvenes.'
				}
			],
			watchOutAr: 'انتبه في أسئلة المفردات إلى التمييز بين «el desempleo / el paro» (البطالة)، و«el empleo / el puesto de trabajo» (الوظيفة)، و«el empresario / el emprendedor» (رائد الأعمال)!'
		},
		practice: [
			{
				questionAr: '¿Qué caracteriza principalmente a un joven emprendedor según los textos del ámbito laboral de 3AS LE?',
				options: [
					'La capacidad de tomar la iniciativa, formarse y crear proyectos útiles para su comunidad',
					'La espera pasiva sin adquirir ninguna competencia nueva',
					'El rechazo del trabajo en equipo y de toda norma ética',
					'El abandono inmediato ante la primera dificultad'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: المبادرة، والتكوين، وتأسيس مشاريع نافعة للمجتمع هي جوهر ريادة الأعمال.',
					'خطأ: الانتظار السلبي يناقض روح المبادرة.',
					'خطأ: التعاون والأمانة أساس الاستمرارية.',
					'خطأ: الصبر والمثابرة شرطان لنجاح أي مشروع.'
				],
				explanationAr: 'تقوم ريادة الأعمال على المبادرة المسؤولة، التكوين التقني، والمثابرة.'
			},
			{
				questionAr: '¿Qué significa la expresión «economía solidaria» en el temario de Bachillerato?',
				options: [
					'Un modelo basado exclusivamente en la especulación individual',
					'Un enfoque que une la actividad productiva con la cooperación, la equidad y el apoyo social',
					'La supresión total de la formación profesional',
					'El desperdicio de los recursos agrícolas locales'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: التضامن يعارض الأنانية والمضاربة المفرطة.',
					'ممتاز: الاقتصاد التضامني يوفق بين الإنتاج والتعاون والعدالة الاجتماعية.',
					'خطأ: التكوين المهني رافد أساس للاقتصاد التضامني.',
					'خطأ: يحرص على تثمين الموارد المحلية وحفظها.'
				],
				explanationAr: 'يربط الاقتصاد التضامني الكفاءة الإنتاجية بالتعاونيات والمنفعة المشتركة.'
			},
			{
				questionAr: 'En una tabla léxica del BAC, ¿cuál es el antónimo exacto del sustantivo «desempleo»?',
				options: [
					'trabajo o empleo',
					'desempleado',
					'laboral',
					'emprender'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: «desempleo» اسم، فضدّه الصحيح هو الاسم «empleo / trabajo».',
					'خطأ: «desempleado» صفة أو اسم فاعل ولا يقابل المصدر في الفئة والدلالة.',
					'خطأ: «laboral» صفة.',
					'خطأ: «emprender» فعل.'
				],
				explanationAr: 'مراعاة الفئة النحوية واجب أساسي في تمارين المرادفات والأضداد.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 2: Páginas Eternas — El legado científico andalusí y magrebí
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_lesson_3as_le_t3_paginas_eternas_legado_andalusi',
		slug: 'spa-3as-le-t3-paginas-eternas-legado-andalusi',
		grade: '3as_le',
		yearSubjectId: 793,
		trimesterId: 't3',
		sequenceId: 'unidad3',
		sequenceTitleAr: 'المحور الخامس والسادس: عالم الشغل وريادة الأعمال وصفحات خالدة (Ámbito Laboral y Páginas Eternas)',
		order: 2,
		titleAr: 'صفحات خالدة: الإرث العلمي والمعماري الأندلسي والمغاربي (Páginas Eternas: el legado científico andalusí y magrebí)',
		objectives: [
			'استكشاف نصوص «Páginas Eternas» حول الحضارة الأندلسية والمغاربية المشتركة: قرطبة، الحمراء بغرناطة، وتلمسان (المسجد الكبير ومنارتها التاريخية)',
			'التعرّف على إسهامات أعلام العلم والتأريخ والرحلة المعتمدين: الزهراوي (Al-Zahrawi)، ابن خلدون (Ibn Jaldún)، وابن بطوطة (Ibn Battuta)',
			'تحليل الأثر الحضاري والعلمي لهذا التراث في الثقافة الإسبانية والجزائرية بأسلوب بكالوريا اللغات الأجنبية'
		],
		keywordsAr: [
			'Córdoba y la Alhambra (قرطبة والحمراء)',
			'Tremecén (تلمسان)',
			'Al-Zahrawi (الزهراوي)',
			'Ibn Jaldún (ابن خلدون)',
			'Ibn Battuta (ابن بطوطة)',
			'Legado científico (الإرث العلمي)'
		],
		discover: {
			scenarioAr:
				'يُختتم برنامج الإسبانية للبكالوريا بمحور «Páginas Eternas» (صفحات خالدة)، الذي يسلط الضوء على الإشعاع العلمي والمعماري المشترك بين الأندلس والمغرب العربي: من جراحة الزهراوي بقرطبة وبديع هندسة الحمراء إلى حاضرة تلمسان العلمية، ومن مقدمة ابن خلدون بالجزائر إلى رحلات ابن بطوطة.',
			svg: renderLessonIllustration('spa_02_patrimonio_andalusi_arquitectura', {
				lang: 'es',
				pins: []
			}),
			steps: [
				{
					promptAr: 'ما الإسهام العلمي الأبرز للطبيب الأندلسي «Al-Zahrawi» (الزهراوي) في تاريخ الطب بقرطبة؟',
					hintAr: 'تذكر كتابه الموسوعي في الجراحة «Kitab al-Tasrif» ومئتي أداة جراحية.',
					expectedInput: 'أسّس الجراحة الحديثة في كتابه «التصريف» بقرطبة وصمّم مئات الأدوات الجراحية الدقيقة',
					revealAr: 'عاش أبو القاسم الزهراوي في قرطبة والزهراء (Medina Azahara)، ووضع موسوعة «التصريف لمن عجز عن التأليف» التي ظلت مرجعاً طبياً عالمياً لقرون.'
				},
				{
					promptAr: 'ما الرابط التاريخي الوثيق بين المؤرخ «Ibn Jaldún» (ابن خلدون) والجزائر والمعمار الأندلسي المغاربي في تلمسان؟',
					hintAr: 'تذكر تدريسه في بجاية، وكتابته «المقدمة» بقلعة بني سلامة قرب تيارت، ومكانة تلمسان العلمية.',
					expectedInput: 'درّس ابن خلدون ببجاية وألّف «المقدمة» في قلعة بني سلامة بالجزائر، وارتبطت تلمسان وإشبيلية وقرطبة بتبادل علمي ومعماري عميق',
					revealAr: 'يُبرز محور Páginas Eternas وحدة الضفتين في العلم والعمارة: أقواس قرطبة، زخارف الحمراء بغرناطة، والجامع الكبير بتلمسان.'
				},
				{
					promptAr: 'ما قيمة رحلة «Ibn Battuta» (ابن بطوطة) ومشاهداته عبر المدن المغاربية كـتلمسان وبجاية وصولاً إلى آسيا؟',
					hintAr: 'فكر في التوثيق الجغرافي والثقافي للحياة العلمية والعمران.',
					expectedInput: 'وثّق عبر «الرحلة» شبكات العلم والمدارس والعمارة والتجارة بين المغرب والأندلس والعالم الإسلامي',
					revealAr: 'مؤلفات الزهراوي وابن خلدون وابن بطوطة والفلكيين والرحالة مثل الإدريسي برهنت أن المنهج التجريبي والملاحظة الدقيقة أُسّسا في حواضر العلم الإسلامية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'أعلام ومراكز «Páginas Eternas» المعتمدة في 3AS LE: قرطبة (la Mezquita de Córdoba و Medina Azahara)، غرناطة (la Alhambra)، إشبيلية (la Giralda)، وتلمسان (la Gran Mezquita de Tremecén) وبجاية وقلعة بني حماد.',
				'الشخصيات العلمية والتاريخية البارزة: Al-Zahrawi (رائد الجراحة والأدوات الطبية)، Ibn Jaldún (مؤسس علم العمران والتاريخ النقدي في المقدمة)، Ibn Battuta (الرحالة والموثق الحضاري)، Al-Idrisi (الجغرافي صاحب الخرائط الدقيقة)، و Ibn Al-Haytham (مؤسس المنهج التجريبي في البصريات).',
				'الإرث اللغوي الإسباني من العربية (Los arabismos): مئات الكلمات الإسبانية اليومية أصلها عربي من هذا التفاعل التاريخي (aceituna, almohada, ajedrez, alcázar, aljibe, tarifa, azúcar, algoritmo).',
				'الأثر الحضاري في البكالوريا: الاعتزاز بالإرث العلمي والأندلسي والمغاربي لا يقف عند التغني بالماضي، بل يحفّز الشباب اليوم على إحياء قيم البحث والانضباط العلمي والاجتهاد.'
			],
			visualSvg: svgSpanishGrammarMap({
				title: 'Páginas Eternas: Legado Andalusí y Magrebí',
				rootLabel: 'Ciencia, Arte y Memoria Compartida',
				rootSub: 'Puentes históricos entre Al-Ándalus y el Magreb',
				branches: [
					{
						label: 'Córdoba y Al-Zahrawi',
						rule: 'Cirugía y bibliotecas',
						example: 'Kitab al-Tasrif y arcos'
					},
					{
						label: 'Alhambra y Tremecén',
						rule: 'Geometría, agua y caligrafía',
						example: 'patios, aljibes y mezquitas'
					},
					{
						label: 'Ibn Jaldún',
						rule: 'Historia crítica en Argelia',
						example: 'La Muqaddimah (Tiaret)'
					},
					{
						label: 'Ibn Battuta',
						rule: 'Crónica de viajes y saber',
						example: 'Tlemcen, Bugía y Oriente'
					}
				],
				width: 580
			}),
			visualCaptionAr: 'خريطة المعالم والأعلام المعتمدين في محور صفحات خالدة (Páginas Eternas).',
			examples: [
				{
					problemAr: 'Pregunta de texto: «¿Qué elementos arquitectónicos y científicos demuestran el diálogo histórico entre Al-Ándalus y ciudades argelinas como Tremecén?»',
					solutionAr: 'El uso de arcos polilobulados, la geometría ornamental, los alminares de proporción armónica y la circulación de sabios y manuscritos entre Córdoba, Granada, Bugía y Tremecén.'
				},
				{
					problemAr: 'Reflexión BAC (4 líneas): «¿Cómo puede inspirar el legado de Al-Zahrawi e Ibn Jaldún a los jóvenes estudiantes de hoy?»',
					solutionAr: 'El ejemplo de Al-Zahrawi e Ibn Jaldún demuestra que la observación rigurosa, la paciencia investigadora y la pasión por los libros permiten realizar aportaciones universales. Conocer este patrimonio debe impulsarnos hoy a estudiar con disciplina y excelencia.'
				}
			],
			watchOutAr: 'احرص في أسئلة وكتابة «Páginas Eternas» على كتابة الأسماء بالألفبائية الإسبانية المعتمدة بدقة: «Córdoba, Alhambra, Tremecén, Al-Zahrawi, Ibn Jaldún, Ibn Battuta» دون الخلط مع أسماء أو شخصيات خارجة عن المنهج!'
		},
		practice: [
			{
				questionAr: '¿Qué célebre obra médica compiló Al-Zahrawi en la Córdoba andalusí, ilustrando más de doscientos instrumentos quirúrgicos?',
				options: [
					'Kitab al-Tasrif',
					'La Rihlah de viajes',
					'La Muqaddimah histórica',
					'Un manual de navegación fluvial'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: موسوعة «التصريف» (Kitab al-Tasrif) للزهراوي كانت مرجع الجراحة الأول لقرون.',
					'خطأ: «الرحلة» لابن بطوطة.',
					'خطأ: «المقدمة» لابن خلدون.',
					'خطأ: الزهراوي كان طبيباً وجراحاً.'
				],
				explanationAr: 'ألف الزهراوي كتاب «التصريف» في قرطبة ووضع فيه أسس الجراحة والأدوات الطبية.'
			},
			{
				questionAr: '¿Qué relación histórica vincula directamente a Ibn Jaldún con el territorio argelino?',
				options: [
					'Enseñó en Bugía y redactó su famosa Muqaddimah en la Qal’a de Beni Salama (región de Tiaret)',
					'Construyó la Torre de Sevilla en el siglo XIX',
					'Fue un arquitecto moderno de puentes metálicos',
					'Nunca visitó ninguna ciudad del Magreb'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: درّس ابن خلدون ببجاية واعتكف بقلعة بني سلامة (تيارت) لكتابة «المقدمة».',
					'خطأ: مئذنة إشبيلية تعود للعصر الموحدي.',
					'خطأ: ابن خلدون عاش في القرن الرابع عشر الميلادي.',
					'خطأ: تنقل في حواضر المغرب العربي ومنها تلمسان وبجاية وتيارت.'
				],
				explanationAr: 'تربط الجزائر بابن خلدون محطات علمية حاسمة في بجاية وتلمسان وقلعة بني سلامة.'
			},
			{
				questionAr: '¿Qué ciudad argelina destaca en «Páginas Eternas» por su Gran Mezquita y sus lazos arquitectónicos con el arte andalusí?',
				options: [
					'Tremecén (Tlemcen)',
					'Madrid',
					'Lisboa',
					'Valencia moderna'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: تلمسان حاضرة الفن الأندلسي المغاربي وجامعها الكبير نموذج رائع في المنهج.',
					'خطأ: ليست مدينة جزائرية.',
					'خطأ: عاصمة البرتغال.',
					'خطأ: إجابة غير مطابقة للسؤال.'
				],
				explanationAr: 'تُعدّ تلمسان وجامعها الكبير جوهرة التراث المعماري والعلمي المغاربي الأندلسي في الجزائر.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 3: Oraciones condicionales (1.º, 2.º y 3.º tipo) y contraste modal
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_lesson_3as_le_t3_condicionales_contraste_modal',
		slug: 'spa-3as-le-t3-condicionales-contraste-modal',
		grade: '3as_le',
		yearSubjectId: 793,
		trimesterId: 't3',
		sequenceId: 'unidad3',
		sequenceTitleAr: 'المحور الخامس والسادس: عالم الشغل وريادة الأعمال وصفحات خالدة (Ámbito Laboral y Páginas Eternas)',
		order: 3,
		titleAr: 'الجمل الشرطية الثلاث والمقابلة الصيغية المتقدمة (Las oraciones condicionales: 1.º, 2.º y 3.º tipo y contraste modal)',
		objectives: [
			'إتقان الصيغ الثلاث للجمل الشرطية مع «si»: النوع الأول (الواقعي/المحتمل)، النوع الثاني (الافتراضي غير المتحقق في الحاضر)، والنوع الثالث (المستحيل في الماضي: Si + pluscuamperfecto de subjuntivo مع condicional compuesto)',
			'تجنّب الخطأ القاتل المتمثل في استعمال Futuro أو Condicional مباشرة بعد «si» الشرطية',
			'التمييز المتقدم بين Indicativo و Subjuntivo مع روابط الشرط البديلة (siempre que, a condición de que, con tal de que, como si) والموصولية والظرفية الزمنية (cuando + subjuntivo للمستقبل)'
		],
		keywordsAr: [
			'Condicional real (النوع الأول)',
			'Condicional irreal del presente (النوع الثاني)',
			'Condicional irreal del pasado (النوع الثالث)',
			'Pluscuamperfecto de subjuntivo',
			'Condicional compuesto',
			'Contraste modal (المقابلة الصيغية)'
		],
		discover: {
			scenarioAr:
				'يُعدّ نظام الشرط بأنواعه الثلاثة (خاصة النوع الثالث: «Si hubiera estudiado..., habría aprobado») والمقابلة الصيغية (Indicativo مقابل Subjuntivo بعد cuando / aunque / como si / siempre que) تاج قواعد السنة الثالثة ثانوي لغات أجنبية.',
			svg: svgSpanishGrammarMap({
				title: 'Las 3 Oraciones Condicionales (BAC 3AS LE)',
				rootLabel: 'Sistema condicional con «si»',
				rootSub: 'Nunca usar futuro ni condicional justo tras «si» condicional',
				branches: [
					{
						label: '1.º Tipo (Real)',
						rule: 'Si + Pres. Ind. : Fut. / Pres.',
						example: 'Si trabajas, triunfarás.'
					},
					{
						label: '2.º Tipo (Irreal pres.)',
						rule: 'Si + Imp. Subj. : Cond. simple',
						example: 'Si tuviera tiempo, leería más.'
					},
					{
						label: '3.º Tipo (Irreal pas.)',
						rule: 'Si + Plusc. Subj. : Cond. comp.',
						example: 'Si hubiera ido, habría visto.'
					},
					{
						label: 'Nexos con Subj.',
						rule: 'siempre que, a condición de que',
						example: 'Te ayudaré con tal de que sigas.'
					}
				],
				width: 580
			}),
			steps: [
				{
					promptAr: 'تأمل الجملة: «Si los estudiantes hubieran revisado las fuentes, no habrían cometido ese error». ما نوع هذا الشرط وما الأزمنة المستعملة؟',
					hintAr: 'لاحظ «hubieran + participio» في جملة الشرط و«habrían + participio» في جواب الشرط.',
					expectedInput: 'النوع الثالث (شرط غير متحقق في الماضي): Si + Pluscuamperfecto de subjuntivo، والجواب Condicional compuesto',
					revealAr: 'في النوع الثالث نستعمل: Si + hubiera/hubiese + participio، وفي جواب الشرط: habría/habrías/... + participio (ويجوز أيضاً hubiera + participio).'
				},
				{
					promptAr: 'لماذا تكون الجملة التالية خاطئة نحوياً: «Si tendré tiempo mañana, visitaré el museo de Tremecén»؟ وكيف نصححها؟',
					hintAr: 'هل يصح استعمال Futuro simple بعد «si» الشرطية؟',
					expectedInput: 'لا يُستعمل المستقبل ولا الشرطي بعد «si» الشرطية أبداً؛ الصواب: «Si tengo tiempo mañana, visitaré...»',
					revealAr: 'تذكّر هذه القاعدة المحورية في BAC LE: بعد «si» الشرطية لا نضع أبداً Futuro ولا Condicional، بل نضع Presente de indicativo (للنوع 1) أو Imperfecto de subjuntivo (للنوع 2) أو Pluscuamperfecto de subjuntivo (للنوع 3)!'
				},
				{
					promptAr: 'قارن بين: «Cuando termina sus estudios, busca empleo» (عادة) و«Cuando termine sus estudios, fundará una cooperativa» (مستقبل). لماذا تغيّر الصيغة بعد «cuando»؟',
					hintAr: 'انظر إلى الزمن المقصود في الجملة الرئيسية: عادة حاضرة مقابل فعل مستقبلي لم يتحقق بعد.',
					expectedInput: 'cuando + Indicativo للعادة والحقيقة والماضي، و cuando + Presente de subjuntivo للإشارة إلى المستقبل',
					revealAr: 'ينطبق هذا التمييز على جميع الظروف الزمنية (cuando, en cuanto, tan pronto como, hasta que): Indicativo للماضي والعادة، وSubjuntivo للمستقبل!'
				}
			]
		},
		summary: {
			rulesAr: [
				'النوع الأول (Condicional real o posible): Si + Presente de indicativo، والجواب Presente / Futuro simple / Imperativo (مثال: Si ahorras agua, protegerás la tierra).',
				'النوع الثاني (Condicional irreal del presente/futuro): Si + Pretérito imperfecto de subjuntivo (-ra / -se)، والجواب Condicional simple (مثال: Si tuviéramos más bibliotecas, leeríamos mucho más).',
				'النوع الثالث (Condicional irreal del pasado): Si + Pretérito pluscuamperfecto de subjuntivo (hubiera/hubiese + participio)، والجواب Condicional compuesto (habría + participio) (مثال: Si Al-Zahrawi no hubiera documentado sus instrumentos, la cirugía habría tardado más en avanzar).',
				'المقابلة الصيغية المتقدمة: (1) «como si» يأخذ دائماً Imperfecto أو Pluscuamperfecto de subjuntivo؛ (2) «siempre que / con tal de que / a condición de que» تأخذ Subjuntivo دائماً؛ (3) «cuando / en cuanto / hasta que» تأخذ Subjuntivo إذا كان الفعل الرئيسي في المستقبل أو الأمر.'
			],
			visualSvg: svgSpanishTenseTimeline({
				title: 'Condicional 3.º Tipo (Irreal del Pasado)',
				tenseName: 'Si + Pluscuamperfecto Subj. : Condicional Comp.',
				formula: 'Si + hubiera(s)/hubiese + participio, habría(s) + participio',
				activeZone: 'two_past',
				example: 'Si hubiera planificado antes, habría lanzado su proyecto.',
				markers: 'si + hubiera + -ado/-ido | habría + -ado/-ido'
			}),
			visualCaptionAr: 'تمثيل زمني للنوع الثالث من الجمل الشرطية (الندم والفرضية غير المتحققة في الماضي).',
			examples: [
				{
					problemAr: 'Completa en 3.º tipo: «Si los redactores (comprobar) el dato ayer, no (publicar) la noticia equivocada.»',
					solutionAr: 'hubieran comprobado (o hubiesen comprobado) / habrían publicado.'
				},
				{
					problemAr: 'Elige entre indicativo y subjuntivo: «En cuanto (recibir, tú) el diploma mañana, (poder) presentar tu solicitud.»',
					solutionAr: 'recibas (subjuntivo tras «en cuanto» con valor de futuro) / podrás (futuro simple).'
				}
			],
			watchOutAr: 'تحقق دائماً في أسئلة «cuando / en cuanto / mientras / aunque» من وجود علامة زمنية مستقبلية (mañana, el próximo año, futuro, imperativo)؛ فهي المفتاح الذي يحسم اختيار Subjuntivo بدلاً من Indicativo!'
		},
		practice: [
			{
				questionAr: 'Completa la oración condicional de 3.º tipo: «Si el equipo .......... los paneles antes del verano, habría producido más energía.»',
				options: [
					'había instalado',
					'hubiera instalado',
					'instalará',
					'instalaría'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: صيغة Indicativo لا تُستعمل في النوع الثالث بعد «si».',
					'صحيح 100%: Si + Pluscuamperfecto de subjuntivo (hubiera instalado) يتوافق مع Condicional compuesto (habría producido).',
					'خطأ: لا نضع المستقبل بعد «si» الشرطية.',
					'خطأ: لا نضع الشرطي البسيط بعد «si» الشرطية.'
				],
				explanationAr: 'قاعدة النوع الثالث في الماضي: Si + hubiera/hubiese + participio، والجواب habría + participio.'
			},
			{
				questionAr: '¿Qué opción respeta la regla de la condicional real (1.º tipo)?',
				options: [
					'Si tendrás disciplina, alcanzarás tus objetivos.',
					'Si tendrías disciplina, alcanzarás tus objetivos.',
					'Si tienes disciplina, alcanzarás tus objetivos.',
					'Si hubieras tenido disciplina, alcanzarás tus objetivos.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: ممنوع وضع Futuro بعد «si» الشرطية.',
					'خطأ: ممنوع وضع Condicional بعد «si» الشرطية.',
					'ممتاز: Si + Presente de indicativo (tienes) مع Futuro (alcanzarás).',
					'خطأ: خلط بين النوع الثالث والنوع الأول.'
				],
				explanationAr: 'في الشرط الواقعي (1.º tipo) نستعمل الحاضر الإخباري بعد «si» ثم المستقبل أو الحاضر أو الأمر.'
			},
			{
				questionAr: 'Completa adecuadamente con valor de futuro: «Tan pronto como .......... las becas, te avisaremos por correo.»',
				options: [
					'salen',
					'saldrán',
					'salgan',
					'salieron'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: الحاضر الإخباري يعبر عن العادة المتكررة لا عن حدث مستقبلي منتظر.',
					'خطأ: لا يتبع الرابط «tan pronto como» بالمستقبل.',
					'صحيح: الرابط الزمني «tan pronto como» مع مستقبل رئيسي (avisaremos) يفرض Presente de subjuntivo (salgan).',
					'خطأ: «salieron» تدل على الماضي المنجز.'
				],
				explanationAr: 'الروابط الزمنية (cuando, tan pronto como, en cuanto) تأخذ Subjuntivo عندما يشير السياق إلى المستقبل.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 4: Metodología BAC de Expresión Escrita
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'spa_lesson_3as_le_t3_metodologia_expresion_escrita',
		slug: 'spa-3as-le-t3-metodologia-expresion-escrita',
		grade: '3as_le',
		yearSubjectId: 793,
		trimesterId: 't3',
		sequenceId: 'unidad3',
		sequenceTitleAr: 'المحور الخامس والسادس: عالم الشغل وريادة الأعمال وصفحات خالدة (Ámbito Laboral y Páginas Eternas)',
		order: 4,
		titleAr: 'منهجية التعبير الكتابي في البكالوريا: مقال الرأي والرسالة الحجاجية (Artículo de opinión y carta argumentativa)',
		objectives: [
			'تخطيط وتحرير موضوعي التعبير الكتابي في امتحان البكالوريا (Tema 1: Guiado مع معطيات مساعدة / Tema 2: Libre حجاجي حر) في حدود 140 إلى 180 كلمة',
			'إتقان البنية المنهجية لمقال الرأي (Artículo de opinión) والرسالة الحجاجية الرسمية (Carta argumentativa formal)',
			'تجنّب الأخطاء الشائعة في الصياغة، والربط المنطقي، وتوافق الأزمنة، والالتزام بالمعجم الرسمي والترقيم الإسباني'
		],
		keywordsAr: [
			'Expresión escrita (التعبير الكتابي)',
			'Artículo de opinión (مقال الرأي)',
			'Carta argumentativa (الرسالة الحجاجية)',
			'Tesis y argumentos (الأطروحة والحجج)',
			'Contraargumento (الحجة المضادة)',
			'Baremo BAC (سلم التنقيط)'
		],
		discover: {
			scenarioAr:
				'تُخصّص ست نقاط كاملة (6/20 × معامل 4 = 24 نقطة موزونة!) للتعبير الكتابي في بكالوريا اللغات الأجنبية، مع خيارين للمترشح: Tema 1 (موجه بنقاط مساعدة) أو Tema 2 (حر). النجاح في نيل 5.5 أو 6/6 يقوم على تصميم رباعي واضح ولغة دقيقة خالية من الحشو.',
			svg: svgSpanishWritingBlueprint({
				title: 'Plan BAC: Artículo y Carta Argumentativa',
				steps: [
					{
						stage: '1. Introducción',
						detail: 'Contexto actual + pregunta o tesis clara (3 líneas)'
					},
					{
						stage: '2. Argumentos',
						detail: 'Dos razones con conectores + ejemplo concreto'
					},
					{
						stage: '3. Matiz / Concesión',
						detail: 'Aunque... / Sin embargo... + refutación serena'
					},
					{
						stage: '4. Conclusión',
						detail: 'Síntesis personal + recomendación constructiva'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما العناصر الشكلية التي تميّز الرسالة الحجاجية الرسمية (Carta formal) عن مقال الرأي العام (Artículo de opinión)؟',
					hintAr: 'تذكر المكان والتاريخ، تحية الافتتاح الرسمية (Estimado/a director/a)، وصيغة الختام المهذبة.',
					expectedInput: 'الرسالة الرسمية تتضمن المكان والتاريخ، تحية افتتاح رسمية بصيغة usted، وعبارة ختام مهذبة مثل Atentamente',
					revealAr: 'في الرسالة الرسمية نستعمل ضمير الاحترام (usted / ustedes): «Me dirijo a usted con el fin de...» ونختم بـ «Atentamente» أو «Reciba un cordial saludo»؛ أما المقال فيبدأ بعنوان موجز ومقدمة إشكالية.'
				},
				{
					promptAr: 'كيف نرفع جودة العرض في الفقرة الثانية باستعمال الاعتراض المتوازن (Concesión y matiz)؟',
					hintAr: 'ابدأ بالاعتراف الجزئي بفكرة مخالفة (Es cierto que... / Aunque...) ثم استدرك عليها (sin embargo / no obstante...).',
					expectedInput: 'الاعتراف الجزئي بجانب من الرأي المخالف ثم الاستدراك عليه بحجة أقوى لتعزيز المصداقية',
					revealAr: 'الكتابة الحجاجية الناضجة لا تكتفي بسرد جانب واحد؛ بل توازن بقولنا: «Si bien es cierto que la tecnología agiliza la búsqueda, no obstante requiere criterio crítico».'
				},
				{
					promptAr: 'ما معايير سلم التصحيح الرسمي (Baremo de evaluación — 6 pts) التي يركز عليها المصححون في BAC 3AS LE؟',
					hintAr: 'فكر في: ملاءمة الموضوع، التماسك والروابط، السلامة النحوية والصرفية، وثراء المعجم.',
					expectedInput: 'الملاءمة للمطلوب، تنظيم الفقرات والروابط، صحة النحو والتصريف، وغنى المفردات والترقيم',
					revealAr: 'تجنب الجمل المترجمة حرفياً من العربية أو الفرنسية، وراجع دائماً تصريف الأفعال بعد para que / aunque / si، ومطابقة الصفات وأسماء المفعول، ووضع علامات التشديد (tildes)!'
				}
			]
		},
		summary: {
			rulesAr: [
				'تقسيم المهام في البكالوريا (140–180 كلمة): المقدمة (3 أسطر: التمهيد + الإشكالية أو الأطروحة)؛ العرض في فقرتين (الفقرة 1: حجتان مؤيدتان مع أمثلة من الواقع أو التراث الجزائري/الأندلسي؛ الفقرة 2: اعتراض جزئي + حجة مضادة أو حلول عملية)؛ الخاتمة (3 أسطر: خلاصة مركزة + توصية مستقبلية).',
				'رصيد الروابط الفاخرة للتحرير: للاستهلال (En la actualidad, hoy en día)؛ للترتيب (En primer lugar, además, asimismo)؛ للتمثيل (Por ejemplo, tal es el caso de)؛ للاستدراك والاعتراض (Sin embargo, no obstante, aunque, si bien)؛ للخاتمة (En conclusión, en definitiva, por todo lo expuesto).',
				'خصائص الرسالة الحجاجية الرسمية (Carta al director / Carta formal): المكان والتاريخ في الأعلى، التحية الرسمية (Estimado Señor Director: / Distinguida Directora:)، صياغة الطلب أو الرأي بأدب مع usted، وعبارة الختام (Le saluda atentamente).',
				'قائمة المراجعة النهائية قبل تسليم الورقة (5 دقائق): (1) هل أجبت عن جميع النقاط المطلوبة؟ (2) هل استعملت Subjuntivo حيث يلزم؟ (3) هل راجعت التذكير والتأنيث والجمع؟ (4) هل كتبت بعلامات التشديد والترقيم الإسبانية الصحيحة (¿ ¡ , . :)؟'
			],
			visualSvg: svgSpanishConjugationChart({
				title: 'Géneros de Expresión Escrita BAC',
				subtitle: 'Estructura y registro exigidos (6 puntos)',
				columns: [
					{
						header: 'Artículo de opinión',
						rule: 'Título + tesis + 2 párrafos + cierre',
						examples: 'En mi opinión / En definitiva'
					},
					{
						header: 'Carta argumentativa',
						rule: 'Fecha + saludo formal + cuerpo + firma',
						examples: 'Estimado director: / Atentamente'
					},
					{
						header: 'Control lingüístico',
						rule: 'Conectores + Subjuntivo + tildes',
						examples: 'para que mejore / aunque sea'
					}
				]
			}),
			visualCaptionAr: 'مقارنة البنية الشكلية واللغوية لمقال الرأي والرسالة الحجاجية في البكالوريا.',
			examples: [
				{
					problemAr: 'Modelo de introducción y tesis (tema educativo): «¿Cómo fomentar el hábito de la lectura entre los jóvenes?»',
					solutionAr: 'Hoy en día, la rapidez de las pantallas ha reducido en muchos jóvenes el gusto por los libros completos. Sin embargo, leer con atención sigue siendo indispensable para desarrollar el pensamiento crítico. Por ello, conviene analizar qué medidas prácticas pueden devolver a la biblioteca un lugar central en la vida estudiantil.'
				},
				{
					problemAr: 'Modelo de apertura y cierre de carta formal al director del instituto:',
					solutionAr: 'Argel, 15 de mayo de 2026. Estimado Señor Director: Me dirijo respetuosamente a usted en nombre de los alumnos de 3AS para proponer la creación de un club semanal de lectura en español... Agradeciendo de antemano su atención, le saluda atentamente, un representante estudiantil.'
				}
			],
			watchOutAr: 'لا تنسَ وضع علامة الفاصلة بعد الروابط الافتتاحية مثل «En primer lugar, ...» و«Sin embargo, ...» و«En conclusión, ...»، ولا تكتب موضوعاً خالياً من تقسيم الفقرات الواضح!'
		},
		practice: [
			{
				questionAr: '¿Qué elementos formales son indispensables en una carta argumentativa dirigida al director de una revista o instituto?',
				options: [
					'Lugar y fecha, saludo formal con «usted», desarrollo argumentado y despedida cortés',
					'Únicamente una lista de verbos en infinitivo sin saludo',
					'Expresiones coloquiales abreviadas propias de mensajes rápidos',
					'Copiar el texto de comprensión palabra por palabra'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: هذه هي الأركان الشكلية والمضمونية الكاملة للرسالة الرسمية الحجاجية.',
					'خطأ: غياب التحية والبنية يفقد النص طابع الرسالة.',
					'خطأ: السجل اللغوي للرسالة الرسمية يجب أن يكون محترماً ورصيناً.',
					'خطأ: النسخ يلغي جهد التعبير الكتابي.'
				],
				explanationAr: 'تتطلب الرسالة الرسمية (Carta formal) احترام القالب المنهجي والتخاطب بصيغة usted.'
			},
			{
				questionAr: '¿Para qué sirve incluir una frase concesiva («Si bien es cierto que..., no obstante...») en el desarrollo de un ensayo BAC?',
				options: [
					'Para demostrar madurez crítica reconociendo un matiz antes de reforzar la propia tesis',
					'Para contradecirse sin ofrecer ninguna conclusión',
					'Para eliminar todos los conectores lógicos del texto',
					'Para evitar usar signos de puntuación'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: الموازنة الاعتراضية تبرهن على عمق التحليل ووضوح الرؤية الحجاجية.',
					'خطأ: التوازن المنهجي يعزز الأطروحة ولا ينقضها.',
					'خطأ: الجملة الاعتراضية نفسها تقوم على الروابط المنطقية.',
					'خطأ: تحتاج علامات ترقيم دقيقة.'
				],
				explanationAr: 'إبراز الاعتراض والرد الرصين عليه من أقوى أساليب الإقناع في بكالوريا اللغات الأجنبية.'
			},
			{
				questionAr: '¿Cuál de estas frases es la más adecuada para cerrar un artículo de opinión de BAC 3AS LE?',
				options: [
					'Bueno, eso es todo, adiós amigos.',
					'En definitiva, solo uniendo la formación rigurosa con los valores éticos construiremos un futuro próspero.',
					'No tengo nada más que decir porque ya se acabó la hoja.',
					'Fin del papel.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: أسلوب عامي غير مناسب لامتحان البكالوريا.',
					'صحيح: خاتمة تركيبية رصينة تلخص الأطروحة وتفتح أفقاً إيجابياً.',
					'خطأ: عبارة ضعيفة جداً.',
					'خطأ: تفتقر إلى أي قيمة فكرية أو أسلوبية.'
				],
				explanationAr: 'تُختتم المقالات في البكالوريا برابط ختامي رصين (En definitiva / En conclusión) وجملة جامعة مؤثرة.'
			}
		]
	}
];
