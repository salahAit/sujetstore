import type { SpanishInteractiveLessonData } from '../../types';
import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';
import {
	svgSpanishConjugationChart,
	svgSpanishGrammarMap,
	svgSpanishTenseTimeline
} from '../../svg-spanish';

export const LESSONS_2AS_LE_T3: SpanishInteractiveLessonData[] = [
	{
		id: 'spa_lesson_2as_le_t3_solidaridad_medio_ambiente',
		slug: 'spa-2as-le-t3-solidaridad_medio_ambiente',
		grade: '2as_le',
		yearSubjectId: 782,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr:
			'المشروع الثالث: المجال الاجتماعي والثقافي والبيئي (Ámbito Social, Cultural y Ambiental)',
		order: 1,
		titleAr:
			'التضامن والتعايش المواطن وحماية البيئة والطاقات النظيفة (Solidaridad y medio ambiente)',
		objectives: [
			'اكتساب المعجم الأساسي للتضامن الاجتماعي والتطوع والتعايش المدني المسؤول (solidaridad, voluntariado, convivencia)',
			'توظيف معجم حماية البيئة، التشجير، ترشيد المياه، والطاقات المتجددة النظيفة (energía solar, eólica, reforestación, ahorro del agua)',
			'صياغة مقترحات عملية وتوصيات بيئية واجتماعية باستعمال صيغ الالتزام والمضارع المنصوب (hay que, debemos, es imprescindible que)'
		],
		keywordsAr: [
			'solidaridad',
			'convivencia ciudadana',
			'medio ambiente',
			'energías limpias',
			'reforestación',
			'البيئة والتضامن'
		],
		discover: {
			scenarioAr:
				'في يوم تطوعي لغرس الأشجار وتنظيف الحي، كتب طلاب نادي البيئة في لوحة المدرسة: «La protección de la naturaleza y la solidaridad vecinal caminan juntas. Si cada familia ahorra agua, separa los residuos y cuida los árboles de su barrio, nuestra ciudad será más habitable. Además, proyectos como la Barrera Verde en Argelia y la energía solar fotovoltaica demuestran que es imprescindible proteger el medio ambiente para las futuras generaciones.» تأمّل اللوحة التوضيحية المرفقة واستخرج محاورها.',
			svg: renderLessonIllustration('spa_04_medio_ambiente_energias_limpias', {
				lang: 'es',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'ما الحلول البيئية الأربعة الممثلة في اللوحة المرفقة والمرتبطة بحماية البيئة في الجزائر والعالم؟',
					hintAr: 'انظر إلى مفتاح اللوحة: الطاقة الشمسية، طاقة الرياح، التشجير، والماء.',
					expectedInput: 'الطاقة الشمسية، طاقة الرياح، التشجير وحماية الغابات، وترشيد استهلاك المياه',
					revealAr:
						'تجمع اللوحة ركائز التنمية المستدامة: الطاقة الشمسية الكهروضوئية (energía solar fotovoltaica)، طاقة الرياح المتجددة (energía eólica)، التشجير ومحاربة التصحر مثل السد الأخضر (reforestación y la Barrera Verde)، وترشيد الماء (ahorro del agua).'
				},
				{
					promptAr:
						'استخرج من النص التمهيدي ثلاث عبارات تدل على السلوك المواطن المتضامن والمحافظ على المحيط.',
					hintAr: 'ابحث عن الأفعال الثلاثة بعد «Si cada familia...» وعبارة «solidaridad vecinal».',
					expectedInput: 'solidaridad vecinal, ahorra agua, separa los residuos, cuida los árboles',
					revealAr:
						'السلوك المواطن يتجلى في التضامن الجواري (solidaridad vecinal)، الاقتصاد في الماء (ahorrar agua)، فرز النفايات (separar los residuos)، وغرس الأشجار وحمايتها (cuidar los árboles).'
				},
				{
					promptAr:
						'حوّل النصيحة «Hay que ahorrar el agua» إلى جملة تبدأ بـ «Es imprescindible que los ciudadanos...» مستعملاً Presente de Subjuntivo.',
					hintAr: 'تذكّر قاعدة تصريف الفعل ahorrar (-ar) في Subjuntivo.',
					expectedInput: 'Es imprescindible que los ciudadanos ahorren el agua',
					revealAr:
						'بعد عبارة الضرورة «Es imprescindible que» ننتقل إلى صيغة المضارع المنصوب: «Es imprescindible que los ciudadanos ahorren el agua y protejan los bosques.»'
				}
			]
		},
		summary: {
			rulesAr: [
				'معجم التضامن والتعايش المواطن (Solidaridad y convivencia): el voluntariado (التطوع)، la ayuda mutua (التعاون المتبادل)، respetar a los mayores (توقير الكبار)، el bien común (الصالح العام)، la generosidad (الكرم والبذل)، el civismo (السلوك المدني الحضاري).',
				'معجم البيئة والطاقات النظيفة (Medio ambiente y energías limpias): la contaminación (التلوث)، la desertificación (التصحر)، la sequía (الجفاف)، el reciclaje (إعادة التدوير)، la reforestación (التشجير)، la energía solar y eólica (الطاقة الشمسية والريحية)، el desarrollo sostenible (التنمية المستدامة).',
				'صيغ الدعوة للعمل والتوعية (Expresar compromiso y deber): للوجوب العام (hay que + infinitivo؛ es necesario + infinitivo)؛ وللمخاطبة المباشرة أو الجمع (debemos + infinitivo؛ es imprescindible / urgente que + subjuntivo).',
				'النماذج الوطنية والعالمية الملهمة: إبراز مبادرات التشجير مثل السد الأخضر الجزائري (la Barrera Verde) والمشاريع التضامنية في المدارس والأحياء، ومحطات الطاقة الشمسية في الجنوب الجزائري.'
			],
			visualSvg: svgSpanishGrammarMap({
				title: 'Compromiso cívico y ecológico (2AS LE)',
				rootLabel: 'Construir una sociedad solidaria y limpia',
				rootSub: 'Acciones ciudadanas + Energías renovables',
				width: 580,
				branches: [
					{
						label: 'Solidaridad',
						rule: 'Ayuda mutua y civismo',
						example: 'voluntariado, respeto, apoyo'
					},
					{
						label: 'Agua y bosques',
						rule: 'Ahorro y reforestación',
						example: 'Barrera Verde, regar poco'
					},
					{
						label: 'Reciclaje',
						rule: 'Reducir y reutilizar',
						example: 'separar papel y vidrio'
					},
					{
						label: 'Energía limpia',
						rule: 'Sol y viento sostenibles',
						example: 'paneles solares, aerogeneradores'
					}
				]
			}),
			visualCaptionAr: 'محاور المواطنة التضامنية والبيئية في الوحدة الأولى من الفصل الثالث',
			examples: [
				{
					problemAr:
						'Clasifica estos seis conceptos en «Problemas ambientales» o «Soluciones sostenibles»: sequía, energía solar, deforestación, reciclaje, contaminación acústica, reforestación.',
					solutionAr:
						'Problemas ambientales: sequía, deforestación, contaminación acústica. | Soluciones sostenibles: energía solar, reciclaje, reforestación.'
				},
				{
					problemAr:
						'Redacta dos recomendaciones ecológicas usando «Hay que + infinitivo» y «Es necesario que + subjuntivo».',
					solutionAr:
						'1) «Hay que separar el papel y el plástico en los contenedores de reciclaje.» | 2) «Es necesario que las ciudades instalen más paneles solares.»'
				}
			],
			watchOutAr:
				'انتبه للجنس النحوي في المفردات البيئية: نقول «el medio ambiente» و«el reciclaje» و«el agua» (مفرد مؤنث لكنه يأخذ el في المفرد مثل el agua limpia، والجمع las aguas limpias!) و«la energía renovable» و«la contaminación».'
		},
		practice: [
			{
				questionAr:
					'¿Qué opción reúne exclusivamente energías limpias y acciones ecológicas sostenibles?',
				options: [
					'energía solar, energía eólica, reforestación, reciclaje',
					'deforestación, derroche de agua, vertido de plásticos, humo',
					'petróleo pesado, carbón, tala ilegal de bosques, sequía',
					'ruido urbano, residuos tóxicos, erosión, desertificación'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! الطاقة الشمسية والريحية والتشجير والتدوير كلها حلول بيئية مستدامة.',
					'خطأ: إزالة الغابات وهدر الماء من أسباب التدهور البيئي.',
					'خطأ: الوقود الأحفوري والقطع الجائر ملوثات بيئية.',
					'خطأ: التلوث الضوضائي والتصحر مشكلات لا حلول.'
				],
				explanationAr:
					'الطاقات النظيفة (solar, eólica) والتشجير (reforestación) وإعادة التدوير (reciclaje) هي ركائز التنمية المستدامة.'
			},
			{
				questionAr:
					'Elige la forma correcta del artículo y del adjetivo en singular para el sustantivo «agua»:',
				options: [
					'la agua limpio',
					'el agua limpia',
					'los agua limpias',
					'la agua limpias'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: «agua» اسم مؤنث فيتبع صفة مؤنثة (limpia)، ولتلاقي الصوائت يأخذ أداة el.',
					'أحسنت! نقول «el agua limpia» (اسم مؤنث مبدوء بـ á منبورة يأخذ el في المفرد وتبقى الصفة مؤنثة limpia).',
					'خطأ: عدم تطابق العدد بين los و agua.',
					'خطأ: عدم تطابق العدد والأداة.'
				],
				explanationAr:
					'الأسماء المؤنثة المبدوءة بـ a- أو ha- منبورة مثل agua و aula تأخذ أداة التعريف el في المفرد وتبقى صفاتها مؤنثة (el agua limpia).'
			},
			{
				questionAr:
					'¿Qué oración expresa un deber ciudadano con la estructura gramatical correcta?',
				options: [
					'Es imprescindible que los vecinos cuidan el jardín del barrio.',
					'Es imprescindible que los vecinos cuiden el jardín del barrio.',
					'Hay que que todos plantamos más árboles.',
					'Debemos que respetar a las personas mayores.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: بعد «Es imprescindible que» يلزم Presente de Subjuntivo (cuiden) لا الإخباري.',
					'ممتاز! التعبير «Es imprescindible que» يتبعه المضارع المنصوب (cuiden).',
					'خطأ: «hay que» يتبعه المصدر مباشرة بدون que ثانية.',
					'خطأ: «debemos» يتبعه المصدر مباشرة بدون que (Debemos respetar).'
				],
				explanationAr:
					'التعبير غير الشخصي «Es imprescindible que» يتطلب Subjuntivo (cuiden)، بينما «hay que» و«debemos» يتبعهما المصدر مباشرة.'
			}
		]
	},
	{
		id: 'spa_lesson_2as_le_t3_conectores_logicos',
		slug: 'spa-2as-le-t3-conectores_logicos',
		grade: '2as_le',
		yearSubjectId: 782,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr:
			'المشروع الثالث: المجال الاجتماعي والثقافي والبيئي (Ámbito Social, Cultural y Ambiental)',
		order: 2,
		titleAr:
			'الروابط المنطقية: السبب والنتيجة والتعارض والغاية (Conectores lógicos y modo verbal)',
		objectives: [
			'التمييز الدلالي والتركيبي بين روابط السبب (porque, ya que, puesto que, debido a) وروابط النتيجة (por lo tanto, así que, por consiguiente)',
			'استعمال روابط التعارض والاستدراك بدقة (pero, sin embargo, no obstante, aunque) مع ضبط الفرق بين «aunque + Indicativo» و«aunque + Subjuntivo»',
			'توظيف روابط الغاية مع احترام قاعدة تطابق الفاعل: «para + infinitivo» مقابل «para que + Presente de Subjuntivo»'
		],
		keywordsAr: [
			'conectores lógicos',
			'causa y consecuencia',
			'concesión (aunque)',
			'finalidad (para que)',
			'sin embargo / por lo tanto',
			'الروابط المنطقية'
		],
		discover: {
			scenarioAr:
				'اقرأ هذا المقطع التوعوي وراقب الروابط المنطقية الملونة بالصيغ: «Debemos ahorrar agua porque las lluvias son irregulares en nuestra región. Por lo tanto, muchos municipios instalan sistemas de riego por goteo para que los agricultores aprovechen cada gota. Aunque el proyecto requiere esfuerzo, todos los vecinos colaboran con entusiasmo.» لاحظ العلاقات المنطقية الأربع وصيغ الأفعال بعد cada nexo.',
			svg: svgSpanishGrammarMap({
				title: 'Conectores lógicos esenciales (2AS LE)',
				rootLabel: 'Relaciones lógicas en el texto',
				rootSub: 'Cada nexo organiza la idea y rige un modo',
				width: 580,
				branches: [
					{
						label: 'Causa',
						rule: 'porque, ya que (+ Ind.)',
						example: 'Reciclo porque cuido la tierra.'
					},
					{
						label: 'Consecuencia',
						rule: 'por lo tanto, así que',
						example: 'Llueve poco; por lo tanto, ahorro.'
					},
					{
						label: 'Concesión',
						rule: 'aunque / sin embargo',
						example: 'Aunque llueva, iremos.'
					},
					{
						label: 'Finalidad',
						rule: 'para que (+ Subj.) / para',
						example: 'Estudio para que aprendas.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'حدد العلاقة المنطقية لكل من الروابط الأربعة في النص: «porque»، «Por lo tanto»، «para que»، و«Aunque».',
					hintAr: 'أيها يفسر السبب، وأيها يعرض النتيجة، وأيها الغاية، وأيها الاستدراك رغم العائق؟',
					expectedInput: 'porque (سبب)، por lo tanto (نتيجة)، para que (غاية)، aunque (استدراك/تنازل)',
					revealAr:
						'«porque» تعبر عن السبب (causa)؛ «por lo tanto» عن النتيجة (consecuencia)؛ «para que» عن الغاية (finalidad)؛ و«aunque» عن الاستدراك والتنازل (concesión).'
				},
				{
					promptAr:
						'لماذا جاء الفعل «aprovechen» بعد «para que» في صيغة Presente de Subjuntivo، وما البديل لو كان الفاعل واحداً؟',
					hintAr: 'قارن بين «los municipios instalan... para que los agricultores aprovechen» وبين «los agricultores instalan... para aprovechar».',
					expectedInput: 'para que تفرض Subjuntivo لاختلاف الفاعلين؛ وعند وحدة الفاعل نستعمل para + infinitivo',
					revealAr:
						'روابط الغاية «para que / a fin de que» تتبع دائماً بـ Subjuntivo (فاعلان مختلفان)؛ وعندما يكون الفاعل نفسه نستعمل حرف الجر «para / a fin de + infinitivo».'
				},
				{
					promptAr:
						'تأمل «Aunque el proyecto requiere esfuerzo» (بالإخباري requiere): متى نستعمل Indicativo بعد «aunque» ومتى نستعمل Subjuntivo؟',
					hintAr: 'هل تطلّب الجهد حقيقة معروفة أم احتمال لم يتحقق بعد؟',
					expectedInput: 'aunque + Indicativo للحقيقة الواقعية المعروفة، و aunque + Subjuntivo للافتراض أو المستقبل غير المؤكد',
					revealAr:
						'قاعدة راقية في 2AS LE: «aunque + Indicativo» تشير إلى حقيقة واقعة معلومة للمتكلم (رغم أن المشروع يتطلب فعلاً جهداً)؛ بينما «aunque + Subjuntivo» تشير إلى شرط أو احتمال غير مؤكد أو مستقبلي (حتى لو تطلّب جهداً أكبر، سنتعاون).'
				}
			]
		},
		summary: {
			rulesAr: [
				'روابط السبب (Conectores de causa): porque, ya que, puesto que, como (في بداية الجملة غالباً) + Indicativo؛ وروابط اسمية: a causa de / debido a + sustantivo (مثال: Debido a la sequía, cuidamos el agua).',
				'روابط النتيجة (Conectores de consecuencia): por lo tanto, por consiguiente, así que, de modo que, en consecuencia + Indicativo (تأتي بعد السبب لتقديم الأثر المترتب عنه).',
				'روابط التعارض والاستدراك (Oposición y concesión): للتعارض المباشر: pero, sin embargo, no obstante, en cambio؛ وللاستدراك (رغم أن): aunque + Indicativo (حقيقة واقعة) / aunque + Subjuntivo (احتمال أو صعوبة مفترضة)، و a pesar de + sustantivo / infinitivo.',
				'روابط الغاية (Conectores de finalidad): para, a fin de + infinitivo (عند وحدة الفاعل)؛ و para que, a fin de que, con el objetivo de que + Presente de Subjuntivo (عند اختلاف الفاعلين).'
			],
			visualSvg: svgSpanishConjugationChart({
				title: 'Modo verbal según el conector lógico',
				subtitle: 'Regla práctica para evitar errores en 2AS LE',
				width: 580,
				columns: [
					{
						header: 'Siempre Indicativo',
						rule: 'Causa y Consecuencia',
						examples: 'porque, ya que, por lo tanto'
					},
					{
						header: 'Siempre Subjuntivo',
						rule: 'Finalidad (2 sujetos)',
						examples: 'para que, a fin de que'
					},
					{
						header: 'Ind. o Subj.',
						rule: 'Concesión (aunque)',
						examples: 'hecho real vs hipótesis'
					}
				]
			}),
			visualCaptionAr: 'المرجع السريع لتوافق الصيغ الفعلية مع الروابط المنطقية',
			examples: [
				{
					problemAr:
						'Une las dos frases con el conector indicado: «Las energías limpias reducen la contaminación. Muchos países construyen parques solares.» (Consecuencia: por lo tanto).',
					solutionAr:
						'«Las energías limpias reducen la contaminación; por lo tanto, muchos países construyen parques solares.»'
				},
				{
					problemAr:
						'Elige entre «para» y «para que» y conjuga si hace falta: «Reciclamos los cuadernos viejos ...... (proteger) los bosques y colaboramos ...... nuestros hijos (vivir) en un entorno sano.»',
					solutionAr:
						'«Reciclamos los cuadernos viejos para proteger los bosques (نفس الفاعل) y colaboramos para que nuestros hijos vivan en un entorno sano (فاعلان مختلفان → Subjuntivo).»'
				}
			],
			watchOutAr:
				'احذر من الفرق الدقيق بين «porque» (كلمة واحدة متصلة بمعنى لأنّ للإجابة والتعليل)، و«por qué» (منفصلة ومنبورة للاستفهام بمعنى لماذا)، و«el porqué» (بمعنى السبب كاسم). كذلك تذكر وضع فاصلة بعد الروابط المستقلة مثل «Sin embargo,» و«Por lo tanto,».'
		},
		practice: [
			{
				questionAr:
					'Completa con el conector lógico adecuado: «El consumo responsable evita el derroche; ......, debemos cerrar bien el grifo cada día.»',
				options: [
					'porque',
					'por lo tanto',
					'aunque',
					'para que'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الجملة الثانية نتيجة للأولى وليست سبباً لها.',
					'ممتاز! «por lo tanto» (ولذلك/وبالتالي) تربط السبب بالنتيجة المترتبة عنه.',
					'خطأ: لا يوجد تعارض بين تجنب التبذير وإغلاق الصنبور.',
					'خطأ: «para que» يتبعها فاعل آخر وفعل في Subjuntivo.'
				],
				explanationAr:
					'الجملة الثانية تقدم النتيجة العملية للمبدأ الأول، لذا نربطها بـ «por lo tanto» (وبالتالي).'
			},
			{
				questionAr:
					'¿Qué diferencia hay entre «Aunque hace calor, plantamos árboles» y «Aunque haga calor mañana, plantaremos árboles»?',
				options: [
					'Ninguna; ambos verbos expresan una acción pasada.',
					'«hace» expresa un hecho real comprobado; «haga» expresa una hipótesis futura o eventual.',
					'«hace» es subjuntivo y «haga» es indicativo.',
					'«aunque» solo se usa al final de la oración.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الأول في الحاضر الإخباري للواقع الحالي، والثاني منصوب للافتراض المستقبلي.',
					'أحسنت! aunque + Indicativo = واقع مشاهد؛ aunque + Subjuntivo = احتمال مستقبلي غير مؤكد.',
					'خطأ: العكس تماماً؛ hace إخباري و haga منصوب.',
					'خطأ: «aunque» تربط جملتين وتأتي غالباً في الصدر أو الوسط.'
				],
				explanationAr:
					'الربط بـ aunque يغيّر المعنى حسب الصيغة: الإخباري للحقيقة الراهنة (hace calor)، والمنصوب للفرضية المستقبلية (haga calor mañana).'
			},
			{
				questionAr:
					'Elige la opción correcta para expresar la finalidad cuando cambian los sujetos: «Los profesores organizan campañas ecológicas ...... los jóvenes ...... la naturaleza.»',
				options: [
					'para / respetan',
					'para que / respeten',
					'ya que / respeten',
					'sin embargo / respetan'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفاعلان مختلفان (الأساتذة ≠ الشباب)، فيجب «para que + Subjuntivo».',
					'ممتاز! «para que» مع اختلاف الفاعلين يفرض Presente de Subjuntivo (respeten).',
					'خطأ: «ya que» للسبب ولا تدل على الغاية ولا تأخذ Subjuntivo.',
					'خطأ: «sin embargo» للاستدراك.'
				],
				explanationAr:
					'عند اختلاف الفاعل في جملة الغاية نستعمل «para que + Presente de Subjuntivo» (respeten).'
			}
		]
	},
	{
		id: 'spa_lesson_2as_le_t3_oraciones_condicionales',
		slug: 'spa-2as-le-t3-oraciones_condicionales',
		grade: '2as_le',
		yearSubjectId: 782,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr:
			'المشروع الثالث: المجال الاجتماعي والثقافي والبيئي (Ámbito Social, Cultural y Ambiental)',
		order: 3,
		titleAr:
			'الجمل الشرطية الواقعية والممكنة (Oraciones condicionales: Tipo 1 y Tipo 2)',
		objectives: [
			'بناء الجمل الشرطية الواقعية من النوع الأول (Tipo 1: Si + Presente de Indicativo → Futuro simple / Presente / Imperativo)',
			'إتقان بناء الجمل الشرطية الممكنة أو الافتراضية من النوع الثاني (Tipo 2: Si + Imperfecto de Subjuntivo → Condicional simple)',
			'اشتقاق صيغة Imperfecto de Subjuntivo (-ra / -se) انطلاقاً من الضمير الثالث جمع في الماضي المنقطع، وتصريف Condicional simple مع الشواذ الأساسية'
		],
		keywordsAr: [
			'oraciones condicionales',
			'condicional real (Tipo 1)',
			'condicional posible (Tipo 2)',
			'imperfecto de subjuntivo',
			'condicional simple',
			'الجمل الشرطية'
		],
		discover: {
			scenarioAr:
				'تأمل هاتين الجملتين في لوحة توعية بيئية ومدنية بالثانوية: (1) «Si reciclamos el papel y ahorramos energía hoy, protegeremos nuestros bosques mañana.» (2) «Si todos los habitantes usaran el transporte público con frecuencia, habría menos contaminación en nuestras ciudades.» قارن بين زمن الشرط وجواب الشرط في النوعين.',
			svg: svgSpanishTenseTimeline({
				title: 'Oraciones Condicionales: Tipo 1 vs Tipo 2',
				tenseName: 'Real / Hipotética',
				formula: 'Si + Pres -> Fut (Tipo 1) | Si + Imp. Subj -> Cond (Tipo 2)',
				activeZone: 'future',
				example: 'Si plantamos árboles, habrá sombra / Si plantáramos, habría.',
				markers: 'Tipo 1 = probable | Tipo 2 = hipótesis (-ra/-se + -ría)',
				width: 560
			}),
			steps: [
				{
					promptAr:
						'حدّد زمن فعل الشرط وزمن جواب الشرط في الجملة الأولى (1) والجملة الثانية (2).',
					hintAr: 'لاحظ: «reciclamos / protegeremos» مقابل «usaran / habría».',
					expectedInput: 'في (1): Presente + Futuro؛ وفي (2): Imperfecto de Subjuntivo + Condicional simple',
					revealAr:
						'النوع الأول الواقعي (Tipo 1): «Si + Presente de Indicativo → Futuro simple» (أو الحاضر/الأمر)؛ والنوع الثاني الافتراضي الممكن (Tipo 2): «Si + Imperfecto de Subjuntivo → Condicional simple».'
				},
				{
					promptAr:
						'كيف نصوغ صيغة «usaran» أو «tuvieran» في Imperfecto de Subjuntivo؟ ومن أي زمن نشتق الجذر؟',
					hintAr: 'خذ صيغة «ellos» في Pretérito Indefinido: ellos usaron / ellos tuvieron!',
					expectedInput: 'من ضمير ellos في Pretérito Indefinido بعد حذف -ron وإضافة -ra أو -se',
					revealAr:
						'الطريقة الذهبية لبناء Imperfecto de Subjuntivo لجميع الأفعال القياسية والشاذة: نذهب إلى ضمير ellos في Pretérito Indefinido (مثل: hablaron, tuvieron, hicieron, fueron)، نحذف «-ron» فيبقى الجذر (habla-, tuvie-, hicie-, fue-) ونضيف (-ra, -ras, -ra, -ramos, -rais, -ran) أو (-se, -ses, ...).'
				},
				{
					promptAr:
						'ما قاعدة تصريف Condicional simple مثل «habría» أو «protegería»؟ وما أشهر الجذور الشاذة فيه؟',
					hintAr: 'هي نفس جذور Futuro simple مضافاً إليها نهايات (-ía, -ías, -ía...).',
					expectedInput: 'المصدر الكامل + (-ía, -ías, -ía...)؛ والشواذ: tendría, haría, podría, habría, saldría',
					revealAr:
						'Condicional simple يتكون من المصدر الكامل + (-ía, -ías, -ía, -íamos, -íais, -ían)، ويشترك في الجذور الشاذة ذاتها مع المستقبل: tener→tendría، hacer→haría، poder→podría، haber→habría، decir→diría، saber→sabría، poner→pondría.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الشرط الواقعي الممكن تحققه (Tipo 1 — Condicional real): «Si + Presente de Indicativo → Futuro simple / Presente / Imperativo». مثال: «Si estudias con constancia, aprobarás con éxito.» / «Si ves basura en el patio, recógela.»',
				'الشرط الافتراضي أو قليل الاحتمال في الحاضر والمستقبل (Tipo 2 — Condicional posible o hipotético): «Si + Imperfecto de Subjuntivo → Condicional simple». مثال: «Si tuviéramos más parques verdes, respiraríamos aire más puro.»',
				'قاعدة اشتقاق Imperfecto de Subjuntivo بدون أي شواذ في النهايات: من (ellos في Indefinido) بحذف -on وإضافة (-a, -as, -a, -amos [بنبرة على ما قبلها!], -ais, -an)، أو (-ron → -ra/-se): ser/ir (fueron → fuera)؛ tener (tuvieron → tuviera)؛ hacer (hicieron → hiciera)؛ poder (pudieron → pudiera)؛ estar (estuvieron → estuviera)؛ saber (supieron → supiera).',
				'الشرطي البسيط (Condicional simple): المصدر + (-ía, -ías, -ía, -íamos, -íais, -ían). الجذور الشاذة الـ 12 نفسها للمستقبل والشرطي: tener→tendr-، poder→podr-، hacer→har-، decir→dir-، haber→habr-، saber→sabr-، poner→pondr-، venir→vendr-، salir→saldr-، querer→querr-، valer→valdr-، caber→cabr-.'
			],
			visualSvg: svgSpanishConjugationChart({
				title: 'Estructura de las Condicionales (Tipo 1 y 2)',
				subtitle: 'Regla de oro: nunca futuro ni condicional tras SI',
				width: 580,
				columns: [
					{
						header: 'Tipo 1 (Real)',
						rule: 'Si + Presente -> Futuro',
						examples: 'Si reciclas, protegerás.'
					},
					{
						header: 'Tipo 2 (Hipotética)',
						rule: 'Si + Imp. Subj -> Condic.',
						examples: 'Si reciclaras, protegerías.'
					},
					{
						header: 'Imp. Subj. (-ra)',
						rule: 'ellos Indef. (-ron -> -ra)',
						examples: 'tuviera, hiciera, fuera'
					}
				]
			}),
			visualCaptionAr: 'المعادلة الصرفية الذهبية للجمل الشرطية من النوعين الأول والثاني',
			examples: [
				{
					problemAr:
						'Transforma esta oración condicional del Tipo 1 al Tipo 2: «Si los ciudadanos plantan más árboles, las ciudades tendrán menos calor en verano.»',
					solutionAr:
						'«Si los ciudadanos plantaran (o plantasen) más árboles, las ciudades tendrían menos calor en verano.»'
				},
				{
					problemAr:
						'Conjuga correctamente los verbos entre paréntesis: «Si yo (poder) viajar el próximo mes, (visitar) Córdoba y Granada para admirar su arquitectura.»',
					solutionAr:
						'«Si yo pudiera (Imperfecto de Subjuntivo de poder) viajar el próximo mes, visitaría (Condicional simple) Córdoba y Granada para admirar su arquitectura.»'
				}
			],
			watchOutAr:
				'الخطأ الممنوع قطعياً بعد أداة الشرط «Si» في الإسبانية: لا يوضع بعد «Si» الشرطية لا Futuro (مثل «Si estudiarás») ولا Condicional (مثل «Si tendrías») ولا Presente de Subjuntivo (مثل «Si tengas»)! بعد «Si» نضع دائماً Presente de Indicativo (في النوع 1) أو Imperfecto de Subjuntivo (في النوع 2).'
		},
		practice: [
			{
				questionAr:
					'¿Cuál de estas oraciones condicionales del Tipo 1 (real) es gramaticalmente correcta?',
				options: [
					'Si cuidarás el agua hoy, mañana tendrás reservas suficientes.',
					'Si cuides el agua hoy, mañana tendrás reservas suficientes.',
					'Si cuidas el agua hoy, mañana tendrás reservas suficientes.',
					'Si cuidarías el agua hoy, mañana tendrás reservas suficientes.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: لا نضع المستقبل بعد أداة الشرط si.',
					'خطأ: لا نضع Presente de Subjuntivo بعد si الشرطية.',
					'ممتاز! النوع الأول: Si + Presente de Indicativo (cuidas) → Futuro simple (tendrás).',
					'خطأ: لا نضع Condicional بعد si الشرطية.'
				],
				explanationAr:
					'في الشرط الواقعي (Tipo 1) يأتي فعل الشرط بعد si في Presente de Indicativo وجواب الشرط في Futuro أو Presente أو Imperativo.'
			},
			{
				questionAr:
					'Completa correctamente la oración condicional del Tipo 2 (hipotética): «Si nosotros ...... (tener) más paneles solares en el instituto, ...... (ahorrar) mucha electricidad.»',
				options: [
					'tendríamos / ahorraríamos',
					'tuviéramos / ahorraríamos',
					'tengamos / ahorraremos',
					'tuvimos / ahorrábamos'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا يجوز وضع Condicional في جملة الشرط بعد si.',
					'أحسنت! tuviéramos (Imperfecto de Subjuntivo من tuvieron) + ahorraríamos (Condicional simple).',
					'خطأ: هذا خلط بين Presente de Subjuntivo والمستقبل.',
					'خطأ: هذا ماضٍ منقطع وماضٍ مستمر إخباريان.'
				],
				explanationAr:
					'في النوع الثاني نشتق Imperfecto de Subjuntivo من tuvieron فتصبح tuviéramos (مع النبرة على é في nosotros)، وجواب الشرط ahorraríamos.'
			},
			{
				questionAr:
					'¿Cómo se forma correctamente la 1.ª persona del singular en Imperfecto de Subjuntivo de los verbos «hacer» e «ir»?',
				options: [
					'haciera / ira',
					'hiciera / fuera',
					'haga / vaya',
					'haría / iría'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الجذر الشاذ في Indefinido هو hicieron و fueron.',
					'صحيح! من hicieron نشتق hiciera، ومن fueron نشتق fuera.',
					'خطأ: هذه صيغ Presente de Subjuntivo.',
					'خطأ: هذه صيغ Condicional simple.'
				],
				explanationAr:
					'نعتمد دائماً على صيغة ellos في Indefinido: hicieron → hiciera، و fueron → fuera.'
			}
		]
	},
	{
		id: 'spa_lesson_2as_le_t3_patrimonio_andalusi_magrebi',
		slug: 'spa-2as-le-t3-patrimonio_andalusi_magrebi',
		grade: '2as_le',
		yearSubjectId: 782,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr:
			'المشروع الثالث: المجال الاجتماعي والثقافي والبيئي (Ámbito Social, Cultural y Ambiental)',
		order: 4,
		titleAr:
			'التراث الأندلسي والمغاربي المشترك: قرطبة وغرناطة وتلمسان وغرداية (Patrimonio andalusí y magrebí)',
		objectives: [
			'التعرف على أبرز المعالم المعمارية والهندسية المشتركة بين الأندلس والمغرب الإسلامي (قرطبة، غرناطة، إشبيلية، تلمسان، غرداية)',
			'تقدير الإسهامات العلمية والحضارية للعلماء المسلمين مثل الزهراوي والإدريسي وابن خلدون وابن بطوطة وفاطمة الفهرية باللغة الإسبانية',
			'إنتاج نصوص وصفية وتاريخية بالعناصر الثقافية والزمنية المدروسة (أزمنة الماضي، الروابط، والمفردات المعمارية)'
		],
		keywordsAr: [
			'patrimonio andalusí',
			'patrimonio magrebí',
			'Córdoba y Granada',
			'Tremecén y Ghardaïa',
			'arquitectura hidráulica',
			'التراث المشترك'
		],
		discover: {
			scenarioAr:
				'في رحلة افتراضية لطلبة 2AS LE حول العمارة المشتركة بين ضفتي المتوسط، يعرض الأستاذ هذه البطاقة: «Quien visita la Mezquita de Córdoba, los patios geométricos de la Alhambra de Granada y la Gran Mezquita de Tremecén descubre una misma armonía artística basada en el arco de herradura, la caligrafía y el respeto al agua. Más al sur, en Argelia, el Valle del M’Zab en Ghardaïa muestra un urbanismo bioclimático ejemplar adaptado al desierto.» تأمّل اللوحة المرفقة واستخلص القواسم المشتركة.',
			svg: renderLessonIllustration('spa_02_patrimonio_andalusi_arquitectura', {
				lang: 'es',
				pins: []
			}),
			steps: [
				{
					promptAr:
						'ما المعالم المعمارية الأندلسية والمغاربية المذكورة في النص واللوحة المرفقة؟',
					hintAr: 'اذكر المدن الأربع ومعالمها البارزة في الأندلس والجزائر.',
					expectedInput: 'مسجد قرطبة، قصر الحمراء بغرناطة، مئذنة إشبيلية، الجامع الكبير بتلمسان، ووادي مزاب بغرداية',
					revealAr:
						'يربط هذا الإرث الحضاري بين روائع الأندلس (La Mezquita de Córdoba, Medina Azahara, La Alhambra de Granada, La Giralda de Sevilla) وروائع الجزائر والمغرب الإسلامي (La Gran Mezquita de Tremecén, El Valle del M’Zab en Ghardaïa, La Casbah de Argel, La Qal’a de los Beni Hammad).'
				},
				{
					promptAr:
						'استخرج من النص التمهيدي ثلاثة عناصر هندسية أو جمالية مشتركة تجمع بين هذه المعالم.',
					hintAr: 'انظر إلى العبارة: «basada en el arco..., la... y el...».',
					expectedInput: 'قوس حدوة الفرس، الخط العربي، والهندسة المائية البيئية',
					revealAr:
						'من أبرز العناصر المشتركة في العمارة الأندلسية والمغاربية: الأقواس المزدوجة وحدوة الفرس (arcos bicolores y de herradura)، الزخرفة الهندسية والنباتية والخط العربي دون تجسيم (geometría y caligrafía)، والهندسة المائية وتكييف العمران مع المناخ (acequias y urbanismo bioclimático).'
				},
				{
					promptAr:
						'كيف أسهم علماء الأندلس والمغرب الإسلامي في المعرفة الإنسانية حسب ما مرّ معك من التراث المعتمد؟',
					hintAr: 'اذكر مجالات الزهراوي والإدريسي وابن خلدون وابن بطوطة.',
					expectedInput: 'الزهراوي في الجراحة، الإدريسي في الخرائط والجغرافيا، ابن خلدون في علم الاجتماع والتاريخ، وابن بطوطة في الرحلات',
					revealAr:
						'ترافق الازدهار المعماري مع إشعاع علمي باهر: Al-Zahrawi في الجراحة بقرطبة، Al-Idrisi في رسم الخرائط، Ibn Jaldún الذي دوّن المقدمة في قلعة بني سلامة بتيارت/الجزائر، الرحالة Ibn Battuta، و Fátima Al-Fihriya مؤسسة جامع القرويين.'
				}
			]
		},
		summary: {
			rulesAr: [
				'معالم الأندلس والجزائر المشتركة: في الأندلس: La Mezquita de Córdoba (الأقواس المزدوجة الحمراء والبيضاء)، Medina Azahara، La Alhambra de Granada (الحدائق والسواقي والزخارف الهندسية)، La Giralda de Sevilla؛ وفي الجزائر: La Gran Mezquita de Tremecén (تلمسان)، El Valle del M’Zab en Ghardaïa (العمران الصحراوي المستدام)، La Casbah de Argel، Los Puentes de Constantina، La Qal’a de los Beni Hammad.',
				'المفردات المعمارية والتراثية (Vocabulario arquitectónico y cultural): el patrimonio (التراث)، el arco de herradura (قوس حدوة الفرس)، el patio (الفناء الداخلي)، el alminar (المئذنة)، la acequia (الساقية المائية)، el azulejo (الزليج)، la caligrafía (فن الخط)، conservar / preservar (الحفاظ على)، restaurar (ترميم).',
				'شخصيات علمية وحضارية في الذاكرة المتوسطية: Al-Zahrawi (رائد الجراحة بقرطبة)، Al-Idrisi (الجغرافي وصاحب الخرائط)، Ibn Jaldún (مؤسس علم العمران البشري)، Ibn Battuta (الرحالة)، Fátima Al-Fihriya (راعية العلم والتعليم)، والشيخ عبد الحميد بن باديس (Cheikh Abdelhamid Ben Badis رائد النهضة العلمية في الجزائر).',
				'توظيف القواعد المكتسبة في وصف التراث: الجمع بين Pretérito Indefinido (لتأريخ البناء أو الحدث)، Presente (لوصف المعلم الباقي وحمايته)، و Conectores/Condicionales (للدعوة إلى صيانة الإرث التاريخي للأجيال القادمة).'
			],
			visualSvg: svgSpanishGrammarMap({
				title: 'Diálogo cultural: Al-Ándalus y el Magreb',
				rootLabel: 'Patrimonio compartido e historia científica',
				rootSub: 'Arquitectura sostenible + Legado intelectual',
				width: 580,
				branches: [
					{
						label: 'Córdoba',
						rule: 'Mezquita y ciencia médica',
						example: 'Arcos bicolores, Al-Zahrawi'
					},
					{
						label: 'Granada',
						rule: 'Alhambra y patios de agua',
						example: 'Geometría, acequias, jardines'
					},
					{
						label: 'Tremecén',
						rule: 'Gran Mezquita y arte',
						example: 'Alminar y talla geométrica'
					},
					{
						label: 'Ghardaïa',
						rule: 'Valle del M’Zab bioclimático',
						example: 'Reparto justo del agua'
					}
				]
			}),
			visualCaptionAr: 'خريطة التراث الحضاري والعلمي المشترك بين الأندلس والمغرب العربي',
			examples: [
				{
					problemAr:
						'Completa esta breve ficha cultural con la palabra exacta: «La Gran Mezquita de ...... en Argelia y los arcos bicolores de la Mezquita de ...... en Andalucía comparten una misma tradición artística.»',
					solutionAr:
						'«La Gran Mezquita de Tremecén en Argelia y los arcos bicolores de la Mezquita de Córdoba en Andalucía comparten una misma tradición artística.»'
				},
				{
					problemAr:
						'Relaciona cada figura histórica con su aporte principal: Al-Zahrawi, Al-Idrisi, Ibn Jaldún.',
					solutionAr:
						'Al-Zahrawi: tratado ilustrado de cirugía en Córdoba (Al-Tasrif). | Al-Idrisi: cartografía científica del mundo mediterráneo. | Ibn Jaldún: fundador de la sociología histórica (Al-Muqaddima).'
				}
			],
			watchOutAr:
				'احرص عند كتابة الأسماء الجغرافية والتاريخية بالإسبانية على الضبط الإملائي الصحيح: «Córdoba» (بنبرة على o الأولى)، «Al-Ándalus» (بنبرة على Á)، «Tremecén» (بترجمة تلمسان الإسبانية الصحيحة والنبرة على é)، «Ghardaïa» أو «El Valle del M’Zab»، «Ibn Jaldún» (بحرف J لا Kh في الكتابة الإسبانية التقليدية!).'
		},
		practice: [
			{
				questionAr:
					'¿Qué ciudades forman el eje arquitectónico andalusí-argelino estudiado en este tema?',
				options: [
					'Córdoba y Granada en Andalucía; Tremecén y Ghardaïa en Argelia',
					'Londres y Dublín en el Atlántico; Oslo y Helsinki en el Norte',
					'Tokio y Seúl en Asia; Sídney en Oceanía',
					'París y Bruselas en Europa; Montreal en América'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! قرطبة وغرناطة في الأندلس وتلمسان وغرداية في الجزائر تشكل قلب هذا الحوار المعماري.',
					'خطأ: مدن أوروبية غير مرتبطة بالتراث الأندلسي المغاربي.',
					'خطأ: مدن شرق آسيوية وأسترالية.',
					'خطأ: مدن فرنكوفونية غير معنية بالمحور الأندلسي.'
				],
				explanationAr:
					'يجسد المحور قرطبة–غرناطة–تلمسان–غرداية وحدة الفن الهندسي والمائي الإسلامي في غرب المتوسط.'
			},
			{
				questionAr:
					'¿Qué rasgo destaca de manera especial en el urbanismo del Valle del M’Zab (Ghardaïa) y en los patios de la Alhambra?',
				options: [
					'El uso exclusivo de rascacielos de vidrio en medio del mar',
					'La adaptación bioclimática, la geometría y el reparto solidario e ingenioso del agua',
					'La prohibición total de jardines, patios y bibliotecas',
					'La ausencia absoluta de arcos o materiales locales'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: العمارة التقليدية تعتمد على مواد محلية كالطين والحجر والجص لا ناطحات الزجاج.',
					'أحسنت! الهندسة البيئية وتوزيع المياه العادل والزخرفة الهندسية من أبرز خصائص العمران الأندلسي والمغاربي.',
					'خطأ: بالعكس، الحدائق والأفنية والكتاتيب والمكتبات ركائز أساسية فيها.',
					'خطأ: تشتهر بأقواسها والمواد المحلية المكيفة للمناخ.'
				],
				explanationAr:
					'اعتمد المعمار في غرداية وغرناطة على التكيف البيئي، استغلال الظل والتهوية، ونظام دقيق وعادل لتوزيع المياه.'
			},
			{
				questionAr:
					'Señala la relación exacta entre el sabio y su obra científica:',
				options: [
					'Al-Idrisi — enciclopedia médica de treinta tomos sobre cirugía en Córdoba',
					'Al-Zahrawi — tratado ilustrado de cirugía e instrumentos médicos en Córdoba',
					'Ibn Battuta — fundador de la geometría analítica moderna en Madrid',
					'Ibn Jaldún — construcción de la Torre Giralda en el siglo XX'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: صاحب الموسوعة الجراحية هو الزهراوي، أما الإدريسي فعالم جغرافيا وخرائط.',
					'ممتاز! الزهراوي (Al-Zahrawi) هو الطبيب الجراح القرطبي صاحب موسوعة التصريف.',
					'خطأ: ابن بطوطة رحالة شهير لا مهندساً في مدريد.',
					'خطأ: ابن خلدون مؤرخ ومؤسس علم الاجتماع في القرن 14م.'
				],
				explanationAr:
					'ألف الطبيب الأندلسي الزهراوي موسوعة «التصريف» الطبية بقرطبة، واشتهر الإدريسي بالخرائط، وابن خلدون بعلم العمران.'
			}
		]
	}
];
