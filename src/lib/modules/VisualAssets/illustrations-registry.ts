// ============================================================================
// SujetStore Visual Assets Registry — 68 Curated Textbook Illustrations
// Dual-format delivery:
//   - Web Lessons (4G fast): /documents/illustrations/<category>/<id>.webp
//   - Typst Exam PDFs (#FFFFFF print-ready): /documents/illustrations/<category>/<id>.jpg
// Strictly Shariah-compliant (zero animate faces/beings) & 100% text-free art
// with crisp vector callouts/legends rendered natively in HTML/Svelte & Typst.
// ============================================================================

import type { IllustratedFigureBlock } from '../SujetBuilder/types';

export type IllustrationCategory =
	| 'sciences'
	| 'math'
	| 'islamic'
	| 'arabic'
	| 'languages'
	| 'history_geo'
	| 'spanish';

export interface IllustrationPinSpec {
	num: string | number;
	xPct: number;
	yPct: number;
	color?: string;
}

export interface IllustrationLegendSpec {
	num: string;
	label: string;
}

export interface IllustrationAssetMeta {
	id: string;
	category: IllustrationCategory;
	titleAr: string;
	titleFr?: string;
	titleEn?: string;
	titleEs?: string;
	legendAr: IllustrationLegendSpec[];
	legendFr?: IllustrationLegendSpec[];
	legendEn?: IllustrationLegendSpec[];
	legendEs?: IllustrationLegendSpec[];
	defaultPins?: IllustrationPinSpec[];
}

export const ILLUSTRATIONS_CATALOG = {
	// ═══════════════════════════════════════════════════════════════════════════
	// 1. PRIMARY SCIENTIFIC EDUCATION (1AP–5AP) — Plates 01..10
	// ═══════════════════════════════════════════════════════════════════════════
	sci_01_seed_germination: {
		id: 'sci_01_seed_germination',
		category: 'sciences',
		titleAr: 'مراحل إنتاش البذرة ونمو النبتة الفتية',
		legendAr: [
			{ num: '1', label: 'انتفاخ البذرة وبروز الجذير نحو الأسفل' },
			{ num: '2', label: 'نمو الجذور وتقوّس السويقة فوق التربة' },
			{ num: '3', label: 'تفتّح الفلقتين وظهور البرعم الهوائي (العجز)' },
			{ num: '4', label: 'نبتة فتية كاملة ذات جذور وساق وأوراق خضراء' }
		]
	},
	sci_02_plant_flower_anatomy: {
		id: 'sci_02_plant_flower_anatomy',
		category: 'sciences',
		titleAr: 'أعضاء النبتة الزهرية ومقطع طولي في الزهرة',
		legendAr: [
			{ num: '1', label: 'المجموع الجذري (امتصاص الماء والأملاح المعدنية)' },
			{ num: '2', label: 'الساق والأوراق الخضراء' },
			{ num: '3', label: 'التويج (البتلات الملونة) والكأس (السبلات)' },
			{ num: '4', label: 'الأسدية (المئبر حاملاً حبوب الطلع) والمدقة (المبيض والبويضات)' }
		]
	},
	sci_03_healthy_food_groups: {
		id: 'sci_03_healthy_food_groups',
		category: 'sciences',
		titleAr: 'المجموعات الغذائية الأساسية للراتب المتوازن',
		legendAr: [
			{ num: '1', label: 'الخضر والفواكه (أغذية الوقاية والفيتامينات والألياف)' },
			{ num: '2', label: 'الحبوب والخبز الكامل والزيوت النباتية (أغذية الطاقة)' },
			{ num: '3', label: 'البقوليات والحليب ومشتقاته (أغذية البناء والنمو)' },
			{ num: '4', label: 'الماء الشروب والأملاح المعدنية (ضروري للحياة)' }
		]
	},
	sci_04_water_cycle: {
		id: 'sci_04_water_cycle',
		category: 'sciences',
		titleAr: 'دورة الماء في الطبيعة وتجدّد الموارد المائية',
		legendAr: [
			{ num: '1', label: 'تبخّر مياه البحار والمحيطات بفعل حرارة الشمس' },
			{ num: '2', label: 'تكاثف بخار الماء في الطبقات الباردة وتشكّل السحب' },
			{ num: '3', label: 'تساقط الأمطار والثلوج على المرتفعات والسهول' },
			{ num: '4', label: 'جريان الأودية والأنهار وعودة المياه نحو البحر' }
		]
	},
	sci_05_states_of_water: {
		id: 'sci_05_states_of_water',
		category: 'sciences',
		titleAr: 'الحالات الفيزيائية الثلاث للماء وتحوّلاتها الحرارية',
		legendAr: [
			{ num: '1', label: 'الحالة الصلبة (جليد تحت 0°C — شكل وحجم ثابتان)' },
			{ num: '2', label: 'الحالة السائلة (ماء سائل — يأخذ شكل الإناء)' },
			{ num: '3', label: 'الحالة الغازية (بخار الماء عند الغليان 100°C)' }
		]
	},
	sci_06_simple_electric_circuit: {
		id: 'sci_06_simple_electric_circuit',
		category: 'sciences',
		titleAr: 'عناصر الدارة الكهربائية البسيطة',
		legendAr: [
			{ num: '1', label: 'العمود الكهربائي (المولّد ذو القطبين الموجب والسالب)' },
			{ num: '2', label: 'القاطعة البسيطة (للتحكم في فتح وغلق الدارة)' },
			{ num: '3', label: 'أسلاك التوصيل النحاسية المعزولة' },
			{ num: '4', label: 'المصباح الكهربائي المتوهج (الحبابة والعقب والقتير المركزي)' }
		]
	},
	sci_07_earth_day_night_sun: {
		id: 'sci_07_earth_day_night_sun',
		category: 'sciences',
		titleAr: 'دوران الأرض حول محورها وتعاقب الليل والنهار',
		legendAr: [
			{ num: '1', label: 'أشعة الشمس المضيئة المتوازية' },
			{ num: '2', label: 'نصف الكرة الأرضية المقابل للشمس (النهار)' },
			{ num: '3', label: 'نصف الكرة الأرضية في الظل (الليل)' },
			{ num: '4', label: 'محور دوران الأرض المائل (دورة كاملة كل 24 ساعة)' }
		]
	},
	sci_08_tooth_molar_section: {
		id: 'sci_08_tooth_molar_section',
		category: 'sciences',
		titleAr: 'مقطع طولي في ضرس يوضح البنية التشريحية للسن',
		legendAr: [
			{ num: '1', label: 'طبقة الميناء الخارجية الصلبة (التاج)' },
			{ num: '2', label: 'طبقة العاج المتوسطة' },
			{ num: '3', label: 'لب السن الغني بالأوعية الدموية والألياف الحسية' },
			{ num: '4', label: 'اللثة وجذر السن المغروس في عظم الفك' }
		]
	},
	sci_09_lungs_ribcage_breathing: {
		id: 'sci_09_lungs_ribcage_breathing',
		category: 'sciences',
		titleAr: 'المسالك التنفسية والرئتان والحجاب الحاجز',
		legendAr: [
			{ num: '1', label: 'الرغامى (القصبة الهوائية الحلقية)' },
			{ num: '2', label: 'القصبتان الهوائيتان وتفرعات القصيبات' },
			{ num: '3', label: 'الرئتان الإسفنجيتان الورديتان' },
			{ num: '4', label: 'عضلة الحجاب الحاجز (تتحكم في الشهيق والزفير)' }
		]
	},
	sci_10_recycling_solar_energy: {
		id: 'sci_10_recycling_solar_energy',
		category: 'sciences',
		titleAr: 'الفرز الانتقائي للنفايات ومصادر الطاقة المتجددة النظيفة',
		legendAr: [
			{ num: '1', label: 'حاويات الفرز الانتقائي لإعادة التدوير (ورق، بلاستيك، زجاج، عضوي)' },
			{ num: '2', label: 'الألواح الشمسية الكهروضوئية' },
			{ num: '3', label: 'عنفة توليد الكهرباء بطاقة الرياح' }
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 2. MIDDLE SCHOOL SNV (1AM–4AM BEM) — Plates 11..23
	// ═══════════════════════════════════════════════════════════════════════════
	sci_11_leaf_photosynthesis_stomata: {
		id: 'sci_11_leaf_photosynthesis_stomata',
		category: 'sciences',
		titleAr: 'مقر التركيب الضوئي في الورقة الخضراء وبنية الثغر الورقي',
		legendAr: [
			{ num: '1', label: 'نصل الورقة اليخضورية المعرّضة للضوء' },
			{ num: '2', label: 'عروق الورقة الناقلة للنسغ الناقص والنسغ الكامل' },
			{ num: '3', label: 'خليتان حارستان كلويتا الشكل غنيتان بالصانعات الخضراء' },
			{ num: '4', label: 'فتحة الثغر الورقي (مبادلات CO2 و O2 والنتح)' }
		]
	},
	sci_12_digestive_tract_organs: {
		id: 'sci_12_digestive_tract_organs',
		category: 'sciences',
		titleAr: 'أعضاء الأنبوب الهضمي والغدد الملحقة عند الإنسان',
		legendAr: [
			{ num: '1', label: 'المريء ثم المعدة (الهضم الآلي والكيميائي للبروتينات)' },
			{ num: '2', label: 'الكبد والحويصل الصفراوي (إفراز الصفراء لاستحلاب الدسم)' },
			{ num: '3', label: 'البنكرياس (المعثكلة — إفراز العصارة البنكرياسية)' },
			{ num: '4', label: 'المعي الدقيق (نهاية الهضم والامتصاص) والمعي الغليظ' }
		]
	},
	sci_13_intestinal_villus: {
		id: 'sci_13_intestinal_villus',
		category: 'sciences',
		titleAr: 'البنية التشريحية للزغابة المعوية وطريقا الامتصاص (4AM BEM)',
		legendAr: [
			{ num: '1', label: 'ظهارة معوية من صف واحد من الخلايا المعوية (ميكروزغابات)' },
			{ num: '2', label: 'وعاء بلغمي (لمفاوي) مركزي — الطريق اللمفاوي (أحماض دسمة + غليسيرول)' },
			{ num: '3', label: 'شبكة الشعيرات الدموية (شريان وارد ووريد صادر) — الطريق الدموي' },
			{ num: '4', label: 'مغذيات الطريق الدموي (غلوكوز، أحماض أمينية، ماء، شوارد، فيتامينات)' }
		]
	},
	sci_14_pulmonary_alveolus: {
		id: 'sci_14_pulmonary_alveolus',
		category: 'sciences',
		titleAr: 'بنية الأسناخ الرئوية ومقر المبادلات الغازية التنفسية',
		legendAr: [
			{ num: '1', label: 'قصيبة هوائية رئوية حاملة للهواء السنخي' },
			{ num: '2', label: 'حويصل رئوي مكوّن من أسناخ رئوية جدارها رقيق جداً' },
			{ num: '3', label: 'دم داخل قادم من القلب الأيمن (غني بـ CO2 قاتم اللون)' },
			{ num: '4', label: 'دم خارج عائد للقلب الأيسر (محمّل بـ O2 قانئ اللون)' }
		]
	},
	sci_15_heart_cross_section: {
		id: 'sci_15_heart_cross_section',
		category: 'sciences',
		titleAr: 'مقطع طولي في القلب والأوعية الدموية الكبرى',
		legendAr: [
			{ num: '1', label: 'الأذينة اليمنى والبطين الأيمن (القلب الأيمن — دم غني بـ CO2)' },
			{ num: '2', label: 'الأذينة اليسرى والبطين الأيسر ذو الجدار العضلي السميك (دم غني بـ O2)' },
			{ num: '3', label: 'الدسامات (الصمامات) الأذينية-البطينية والسينية والجدار الفاصل' },
			{ num: '4', label: 'الشريان الأبهر والشريان الرئوي والأوردة الجوفاء والرئوية' }
		]
	},
	sci_16_kidney_urinary_nephron: {
		id: 'sci_16_kidney_urinary_nephron',
		category: 'sciences',
		titleAr: 'مقطع طولي في الكلية ومقر تصفية الدم وتشكيل البول',
		legendAr: [
			{ num: '1', label: 'المنطقة القشرية والمنطقة اللبية (أهرامات مالبيغي)' },
			{ num: '2', label: 'الشريان الكلوي (دم وارد محمّل بالفضلات الآزوتية كالبولة)' },
			{ num: '3', label: 'الوريد الكلوي (دم صادر مصفّى وثابت التركيب)' },
			{ num: '4', label: 'الحويضة ثم الحالب الناقل للبول نحو المثانة' }
		]
	},
	sci_17_blood_smear_cells: {
		id: 'sci_17_blood_smear_cells',
		category: 'sciences',
		titleAr: 'الفحص المجهري لسحبة دموية ملوّنة (مكونات الدم الأربعة)',
		legendAr: [
			{ num: '1', label: 'كريات دموية حمراء مقعّرة الوجهين عديمة النواة (نقل الغازات بالهيموغلوبين)' },
			{ num: '2', label: 'كريات دموية بيضاء ذات أنوية مفصّصة أو كروية (الدفاع المناعي)' },
			{ num: '3', label: 'صفائح دموية سيتوبلازمية دقيقة (تخثّر الدم ووقف النزيف)' },
			{ num: '4', label: 'المصورة (البلازما — السائل البيني الناقل للمغذيات والفضلات)' }
		]
	},
	sci_18_phagocytosis_stages: {
		id: 'sci_18_phagocytosis_stages',
		category: 'sciences',
		titleAr: 'المراحل الأربعة لظاهرة البلعمة الخلوية اللانوعية (4AM BEM)',
		legendAr: [
			{ num: '1', label: 'مرحلة الانجذاب والالتصاق بالميكروب' },
			{ num: '2', label: 'مرحلة الإحاطة بتشكيل الأرجل الكاذبة والابتلاع' },
			{ num: '3', label: 'مرحلة الهضم الخلوي بتدخّل أنزيمات الليزوزوم داخل الفجوة الهاضمة' },
			{ num: '4', label: 'مرحلة الإطراح الخلوي لبقايا الميكروب المهضوم' }
		]
	},
	sci_19_neuron_synapse_arc: {
		id: 'sci_19_neuron_synapse_arc',
		category: 'sciences',
		titleAr: 'بنية الخلية العصبية (العصبون المحرّك) واللوحة المحرّكة (4AM BEM)',
		legendAr: [
			{ num: '1', label: 'الجسم الخلوي النجمي المحتوي على النواة والزوائد الشجيرية' },
			{ num: '2', label: 'المحور الأسطواني المحاط بغمد النخاعين واختناقات رانفييه' },
			{ num: '3', label: 'التفرعات النهائية والأزرار المشبكية' },
			{ num: '4', label: 'الألياف العضلية المخطّطة (العضو المنفّذ عبر مشبك عصبي-عضلي)' }
		]
	},
	sci_20_geology_fault_folds: {
		id: 'sci_20_geology_fault_folds',
		category: 'sciences',
		titleAr: 'التشوّهات التكتونية (الطيات والفوالق) وبؤرة الزلزال والمركز السطحي (3AM)',
		legendAr: [
			{ num: '1', label: 'طية محدّبة ومقعّرة في الصخور الرسوبية المرنة' },
			{ num: '2', label: 'فالق (انكسار وانزلاق في الصخور الصلبة بسبب قوى الانضغاط)' },
			{ num: '3', label: 'البؤرة الزلزالية في العمق وانتشار الأمواج الزلزالية' },
			{ num: '4', label: 'المركز السطحي للزلزال شاقولياً فوق البؤرة (أشدّ الخسائر)' }
		]
	},
	sci_21_subduction_volcano: {
		id: 'sci_21_subduction_volcano',
		category: 'sciences',
		titleAr: 'ظاهرة الغوص التكتوني والبركنة الانفجارية المرتبطة بها (3AM)',
		legendAr: [
			{ num: '1', label: 'غوص الليتوسفير المحيطي الكثيف تحت الليتوسفير القاري عند الخندق المحيطي' },
			{ num: '2', label: 'الانصهار الجزئي في الرداء وتشكّل الماغما اللزجة الغنية بالغازات' },
			{ num: '3', label: 'الغرفة الماغماتية والمدخنة البركانية الصاعدة' },
			{ num: '4', label: 'بركان انفجاري يلفظ الرماد والقذائف البركانية' }
		]
	},
	sci_22_oceanic_ridge_spreading: {
		id: 'sci_22_oceanic_ridge_spreading',
		category: 'sciences',
		titleAr: 'نشاط الظهرة المحيطية وتيارات الحمل الحراري واتساع قاع المحيط (3AM)',
		legendAr: [
			{ num: '1', label: 'تيارات الحمل الحراري الصاعدة في الأستينوسفير (الرداء الماغماتي)' },
			{ num: '2', label: 'خسف الظهرة المحيطية وصعود الماغما البازلتية' },
			{ num: '3', label: 'تشكّل لوح محيطي بازلتي حديث متناظر الجانبين وتباعد القارات' }
		]
	},
	sci_23_soil_horizons_aquifer: {
		id: 'sci_23_soil_horizons_aquifer',
		category: 'sciences',
		titleAr: 'آفاق التربة الزراعية وبنية الجيب المائي الجوفي (3AM)',
		legendAr: [
			{ num: '1', label: 'الأفق السطحي الدبالي الغني بالمواد العضوية وجذور النباتات' },
			{ num: '2', label: 'الأفق المعدني التراكمي وأفق تفكّك الصخرة الأم' },
			{ num: '3', label: 'جيب مائي جوفي مشبّع بالماء المتسرّب عبر الصخور النفوذة' },
			{ num: '4', label: 'طبقة غضارية (طينية) غير نفوذة حابسة للماء الجوفي فوق الصخرة الأم' }
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 3. SECONDARY & BAC SNV (1AS–3AS BAC) — Plates 24..36
	// ═══════════════════════════════════════════════════════════════════════════
	sci_24_plant_mitosis_phases: {
		id: 'sci_24_plant_mitosis_phases',
		category: 'sciences',
		titleAr: 'المراحل الأربع للانقسام الخيطي المتساوي في خلية نباتية ميرستيمية (1AS)',
		legendAr: [
			{ num: '1', label: 'المرحلة التمهيدية: تحلزن الصبغيات المضاعفة وزوال الغلاف النووي' },
			{ num: '2', label: 'المرحلة الاستوائية: انتظام الصبغيات في خط استواء الخلية (اللوحة الاستوائية)' },
			{ num: '3', label: 'المرحلة الانفصالية: انشطار الجزء المركزي وهجرة كروماتيدات كل صبغي للقطبين' },
			{ num: '4', label: 'المرحلة النهائية: تشكّل نواتين بنتين والصفيحة الخلوية الوسطى' }
		]
	},
	sci_25_xylem_phloem_vessels: {
		id: 'sci_25_xylem_phloem_vessels',
		category: 'sciences',
		titleAr: 'مقارنة البنية النسيجية للأوعية الخشبية والأوعية اللحائية (1AS)',
		legendAr: [
			{ num: '1', label: 'الوعاء الخشبي: خلايا ميتة متطاولة مدعّمة بالخشبين لنقل النسغ الخام صعوداً' },
			{ num: '2', label: 'الأنبوب الغربالي اللحائي: خلايا حية عديمة النواة لنقل النسغ الكامل' },
			{ num: '3', label: 'الغربال (صفيحة عرضية مثقّبة بين الخلايا الغربالية)' },
			{ num: '4', label: 'الخلية المرافقة ذات النواة الضرورية لحيوية وتجديد الأنبوب الغربالي' }
		]
	},
	sci_26_dna_double_helix: {
		id: 'sci_26_dna_double_helix',
		category: 'sciences',
		titleAr: 'البنية الجزيئية الحلزونية المزدوجة للـ ADN (نموذج واطسون وكريك — 2AS)',
		legendAr: [
			{ num: '1', label: 'سلسلتان متعاكستان في الاتجاه (3\'->5\' و 5\'->3\') من السكر الريبي منقوص الأكسجين والفوسفات' },
			{ num: '2', label: 'تكامل القواعد الآزوتية (A مع T برابطتين هيدروجينيتين، و C مع G بثلاث روابط)' },
			{ num: '3', label: 'الالتفاف الحلزوني المزدوج المستقر حاملاً للمعلومة الوراثية بتسلسل النيكليوتيدات' }
		]
	},
	sci_27_eukaryotic_cell_ultrastructure: {
		id: 'sci_27_eukaryotic_cell_ultrastructure',
		category: 'sciences',
		titleAr: 'البنية الحجيرية الفوق مجهرية للخلية حقيقية النواة (2AS / 3AS)',
		legendAr: [
			{ num: '1', label: 'النواة المحاطة بغلاف نووي مثقّب وبداخلها النوية والصبغين' },
			{ num: '2', label: 'الشبكة الهيولية الفعّالة (المحبّبة بالريبوزومات — مقر تركيب البروتين)' },
			{ num: '3', label: 'جهاز غولجي والحويصلات الإفرازية (نضج وتوجيه البروتينات)' },
			{ num: '4', label: 'الميتوكوندري (مقر الأكسدة التنفسية وإنتاج الـ ATP) والغشاء الهيولي' }
		]
	},
	sci_28_chloroplast_ultrastructure: {
		id: 'sci_28_chloroplast_ultrastructure',
		category: 'sciences',
		titleAr: 'البنية الفوق مجهرية والحجيرية للصانعة الخضراء (3AS BAC)',
		legendAr: [
			{ num: '1', label: 'غلاف الصانعة المزدوج (غشاء خارجي وغشاء داخلي أملس)' },
			{ num: '2', label: 'الحشوة (Stroma): مقر المرحلة الكيموحيوية وحلقة كالفن وتثبيت CO2' },
			{ num: '3', label: 'تراكب كييسات التيلاكويد (البذيرة / الغرانوم): مقر المرحلة الكيموضوئية' },
			{ num: '4', label: 'صفائح حشوية، حبيبات نشاء مؤقتة، و ADN حلقي وريبوزومات خاصة' }
		]
	},
	sci_29_mitochondrion_ultrastructure: {
		id: 'sci_29_mitochondrion_ultrastructure',
		category: 'sciences',
		titleAr: 'البنية الفوق مجهرية للميتوكوندري ومقر الفسفرة التأكسدية (3AS BAC)',
		legendAr: [
			{ num: '1', label: 'الغشاء الخارجي الأملس والفراغ بين الغشاءين' },
			{ num: '2', label: 'الغشاء الداخلي المتعرّج (الأعراف): مقر السلسلة التنفسية والـ ATP سنتاز' },
			{ num: '3', label: 'الكرات المذنّبة (أنزيم ATP سنتاز المفسفر للـ ADP إلى ATP)' },
			{ num: '4', label: 'المادة الأساسية (Matrix): مقر حلقة كريبس وأكسدة حمض البيروفيك' }
		]
	},
	sci_30_ribosome_translation: {
		id: 'sci_30_ribosome_translation',
		category: 'sciences',
		titleAr: 'آلية الترجمة ودمج الأحماض الأمينية على مستوى الريبوزوم الوظيفي (3AS BAC)',
		legendAr: [
			{ num: '1', label: 'تحت الوحدة الكبرى (الموقعان التحفيزيان P و A) وتحت الوحدة الصغرى للريبوزوم' },
			{ num: '2', label: 'خيط الـ ARNm الحامل للشفرة الوراثية في شكل رامزات ثلاثية (5\' -> 3\')' },
			{ num: '3', label: 'جزيئات الـ ARNt الناقلة للأحماض الأمينية والرامزة المضادة المتكاملة' },
			{ num: '4', label: 'السلسلة الببتيدية المتشكّلة بروابط ببتيدية وفق تتابع رامزات الـ ARNm' }
		]
	},
	sci_31_enzyme_active_site: {
		id: 'sci_31_enzyme_active_site',
		category: 'sciences',
		titleAr: 'الموقع الفعّال للأنزيم وآلية التكامل المحفّز (E + S <-> ES -> E + P — 3AS BAC)',
		legendAr: [
			{ num: '1', label: 'الأنزيم (E) ببنيته الفراغية الوظيفية وموقعه الفعّال مقابل الركيزة النوعية (S)' },
			{ num: '2', label: 'تشكّل المعقّد أنزيم-مادة التفاعل (ES) بروابط انتقالية ضعيفة وتكامل محفّز' },
			{ num: '3', label: 'تحرير النواتج (P) واسترجاع الأنزيم لبنيته الأصلية دون أن يُستهلك' }
		]
	},
	sci_32_antibody_immune_complex: {
		id: 'sci_32_antibody_immune_complex',
		category: 'sciences',
		titleAr: 'البنية الجزيئية للجسم المضاد (IgG) وتشكّل المعقّد المناعي النوعي (3AS BAC)',
		legendAr: [
			{ num: '1', label: 'سلسلتان ثقيلتان وسلسلتان خفيفتان مترابطة بجسور ثنائية الكبريت (-S-S-)' },
			{ num: '2', label: 'المنطقة المتغيّرة (مقر التثبيت النوعي لمحدّد المستضد بالتكامل البنيوي)' },
			{ num: '3', label: 'المنطقة الثابتة (موقع التثبيت على مستقبلات البلعميات الكبيرة لتنشيط البلعمة)' },
			{ num: '4', label: 'المستضد ومحدّداته السطحية (إبطال المفعول بتشكيل المعقّد المناعي)' }
		]
	},
	sci_33_fluid_mosaic_membrane: {
		id: 'sci_33_fluid_mosaic_membrane',
		category: 'sciences',
		titleAr: 'النموذج الفسيفسائي المائع للغشاء الهيولي ومؤشرات الذات (CMH — 3AS BAC)',
		legendAr: [
			{ num: '1', label: 'طبقة مضاعفة من الفوسفوليبيدات (أقطاب محبّة للماء وأذيال كارهة للماء) وكولسترول' },
			{ num: '2', label: 'بروتينات ضمنية مخترقة للطبقتين (قنوات ومضخات) وبروتينات سطحية' },
			{ num: '3', label: 'غليكوبروتينات وغليكوليبيدات على السطح الخارجي فقط (محدّدات الذات CMH)' }
		]
	},
	sci_34_hiv_retrovirus_structure: {
		id: 'sci_34_hiv_retrovirus_structure',
		category: 'sciences',
		titleAr: 'البنية الدقيقة لفيروس فقدان المناعة المكتسبة (VIH — فيروس رجعي 3AS BAC)',
		legendAr: [
			{ num: '1', label: 'غلاف دسمي مرصّع ببروتينات الغلاف السكرية gp120 و gp41 (تستهدف LT4 عبر CD4)' },
			{ num: '2', label: 'محفظة بروتينية خارجية ومحفظة داخلية مخروطية الشكل' },
			{ num: '3', label: 'خيطان متماثلان من الـ ARN الفيروسي (الذخيرة الوراثية)' },
			{ num: '4', label: 'أنزيم الاستنساخ العكسي (يحوّل ARN الفيروسي إلى ADN فيروسي داخل LT4)' }
		]
	},
	sci_35_chemical_synapse: {
		id: 'sci_35_chemical_synapse',
		category: 'sciences',
		titleAr: 'البنية الدقيقة للمشبك الكيميائي وآلية النقل المشبكي (3AS BAC)',
		legendAr: [
			{ num: '1', label: 'النهاية المحورية قبل المشبكية غنية بحويصلات المبلّغ العصبي الكيميائي (الأستيل كولين)' },
			{ num: '2', label: 'قنوات Ca2+ الفولطية وتدفق الكالسيوم المحفّز للطرح الخلوي في الشق المشبكي' },
			{ num: '3', label: 'تثبّت المبلّغ الكيميائي على المستقبلات القنوية النوعية للغشاء بعد المشبكي' },
			{ num: '4', label: 'انفتاح القنوات الكيميائية وتوليد كمون بعد مشبكي تنبيهي (PPSE) أو تثبيطي (PPSI)' }
		]
	},
	sci_36_membrane_channels_pump: {
		id: 'sci_36_membrane_channels_pump',
		category: 'sciences',
		titleAr: 'البروتينات الغشائية المتدخلة في كمون الراحة وكمون العمل (3AS BAC)',
		legendAr: [
			{ num: '1', label: 'قنوات الميز (التسرّب) المفتوحة باستمرار لشوارد K+ و Na+ حسب تدرّج التركيز' },
			{ num: '2', label: 'القنوات الفولطية المرتبطة بالفولطية (زوال الاستقطاب بـ Na+ وعودته بـ K+)' },
			{ num: '3', label: 'مضخة الصوديوم والبوتاسيوم (Na+/K+) المستهلكة للـ ATP (نقل فعّال عكس التدرج 3Na+ مقابل 2K+)' }
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 4. PRIMARY MATHEMATICS (1AP–5AP) — Plates 37..44
	// ═══════════════════════════════════════════════════════════════════════════
	pri_math_01_apple_baskets: {
		id: 'pri_math_01_apple_baskets',
		category: 'math',
		titleAr: 'أَعُدُّ وَأَجْمَعُ حَبَّاتِ التُّفَّاحِ فِي السَّلَّتَيْنِ',
		legendAr: [
			{ num: '1', label: 'السَّلَّةُ الأُولَى: 5 تُفَّاحَاتٍ حَمْرَاءَ' },
			{ num: '2', label: 'السَّلَّةُ الثَّانِيَةُ: 4 تُفَّاحَاتٍ خَضْرَاءَ (المَجْمُوعُ: 5 + 4 = 9)' }
		]
	},
	pri_math_02_colored_pencils_bundles: {
		id: 'pri_math_02_colored_pencils_bundles',
		category: 'math',
		titleAr: 'التَّجْمِيعُ بِالعَشَرَاتِ وَالوَحَدَاتِ (حُزَمُ الأَقْلَامِ المُلَوَّنَةِ)',
		legendAr: [
			{ num: '1', label: 'حُزْمَتَا العَشَرَاتِ المَرْبُوطَتَانِ (مَرْتَبَةُ العَشَرَاتِ)' },
			{ num: '2', label: 'الأَقْلَامُ وَالكُرَيَّاتُ المُنْفَرِدَةُ (مَرْتَبَةُ الوَحَدَاتِ)' }
		]
	},
	pri_math_03_base_ten_blocks: {
		id: 'pri_math_03_base_ten_blocks',
		category: 'math',
		titleAr: 'تَمْثِيلُ الأَعْدَادِ بِالصَّفَائِحِ وَالأَعْمِدَةِ وَالمُكَعَّبَاتِ',
		legendAr: [
			{ num: '1', label: 'صَفَائِحُ المِئَاتِ الخَضْرَاءُ (100 وَحْدَةٍ لِكُلِّ صَفِيحَةٍ)' },
			{ num: '2', label: 'أَعْمِدَةُ العَشَرَاتِ الزَّرْقَاءُ (10 وَحَدَاتٍ لِكُلِّ عَمُودٍ)' },
			{ num: '3', label: 'مُكَعَّبَاتُ الوَحَدَاتِ الصَّفْرَاءُ المُنْفَرِدَةُ' }
		]
	},
	pri_math_04_two_pan_balance: {
		id: 'pri_math_04_two_pan_balance',
		category: 'math',
		titleAr: 'قِيَاسُ الكُتَلِ وَالمُقَارَنَةُ بِالمِيزَانِ ذِي الكِفَّتَيْنِ (روبرفال)',
		legendAr: [
			{ num: '1', label: 'الجِسْمُ المُرَادُ وَزْنُهُ فِي الكِفَّةِ الأُولَى' },
			{ num: '2', label: 'العِيَارَاتُ المَعْدِنِيَّةُ المِعْيَارِيَّةُ (غ / كغ) فِي حَالَةِ تَوَازُنٍ أُفُقِيٍّ' }
		]
	},
	pri_math_05_analog_clock_ticks: {
		id: 'pri_math_05_analog_clock_ticks',
		category: 'math',
		titleAr: 'قِرَاءَةُ السَّاعَةِ ذَاتِ العَقْرَبَيْنِ وَحِسَابُ المُدَدِ',
		legendAr: [
			{ num: '1', label: 'العَقْرَبُ الصَّغِيرُ الأَحْمَرُ يَدُلُّ عَلَى السَّاعَاتِ' },
			{ num: '2', label: 'العَقْرَبُ الكَبِيرُ الأَزْرَقُ يَدُلُّ عَلَى الدَّقَائِقِ (دَوْرَةٌ كَامِلَةٌ = 60 دَقِيقَةً)' }
		]
	},
	pri_math_06_3d_geometric_solids: {
		id: 'pri_math_06_3d_geometric_solids',
		category: 'math',
		titleAr: 'المُجَسَّمَاتُ الهَنْدَسِيَّةُ المَأْلُوفَةُ وَخَوَاصُّهَا (الأَوْجُهُ وَالأَحْرُفُ وَالرُّؤُوسُ)',
		legendAr: [
			{ num: '1', label: 'المُكَعَّبُ وَمُتَوَازِي المُسْتَطِيلَاتِ وَالهَرَمُ (تَتَدَحْرَجُ أَمْ تَنْزَلِقُ؟)' },
			{ num: '2', label: 'الأُسْطُوَانَةُ وَالمَخْرُوطُ وَالكُرَةُ (ذَاتُ سُطُوحٍ مُنْحَنِيَةٍ)' }
		]
	},
	pri_math_07_measuring_vessels_liter: {
		id: 'pri_math_07_measuring_vessels_liter',
		category: 'math',
		titleAr: 'قِيَاسُ السِّعَاتِ وَمُقَارَنَتُهَا (اللِّتْرُ L وَأَجْزَاؤُهُ dL, cL, mL)',
		legendAr: [
			{ num: '1', label: 'إِبْرِيقٌ كَبِيرٌ مُدَرَّجٌ لِقِيَاسِ اللِّتْرِ (1 L = 100 cL = 1000 mL)' },
			{ num: '2', label: 'مِخْبَارٌ وَكَأْسٌ مُدَرَّجَانِ لِقِيَاسِ السِّعَاتِ الصَّغِيرَةِ' }
		]
	},
	pri_math_08_geometry_tools_set: {
		id: 'pri_math_08_geometry_tools_set',
		category: 'math',
		titleAr: 'أَدَوَاتُ الإِنْشَاءِ الهَنْدَسِيِّ المَدْرَسِيَّةُ',
		legendAr: [
			{ num: '1', label: 'المِسْطَرَةُ المُدَرَّجَةُ (قِيَاسُ الأَطْوَالِ وَاسْتِقَامِيَّةُ النُّقَطِ)' },
			{ num: '2', label: 'الكُوسُ القَائِمُ (التَّحَقُّقُ مِنَ الزَّاوِيَةِ القَائِمَةِ وَالتَّعَامُدِ)' },
			{ num: '3', label: 'المِدْوَرُ وَالمِنْقَلَةُ (رَسْمُ الدَّائِرَةِ وَمُقَارَنَةُ الأَطْوَالِ وَالزَّوَايَا)' }
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 5. PRIMARY ISLAMIC EDUCATION (1AP–5AP) — Plates 45..52
	// ═══════════════════════════════════════════════════════════════════════════
	pri_isl_01_masjid_al_haram_kaaba: {
		id: 'pri_isl_01_masjid_al_haram_kaaba',
		category: 'islamic',
		titleAr: 'الكَعْبَةُ المُشَرَّفَةُ وَالمَسْجِدُ الحَرَامُ — قِبْلَةُ المُسْلِمِينَ',
		legendAr: [
			{ num: '1', label: 'الكَعْبَةُ المُشَرَّفَةُ بَيْتُ اللهِ الحَرَامُ بِمَكَّةَ المُكَرَّمَةِ' },
			{ num: '2', label: 'أَرْوِقَةُ وَمَآذِنُ المَسْجِدِ الحَرَامِ (قِبْلَةُ الصَّلَاةِ وَمَقْصِدُ الحَجِّ)' }
		]
	},
	pri_isl_02_masjid_an_nabawi: {
		id: 'pri_isl_02_masjid_an_nabawi',
		category: 'islamic',
		titleAr: 'المَسْجِدُ النَّبَوِيُّ الشَّرِيفُ بِالمَدِينَةِ المُنَوَّرَةِ',
		legendAr: [
			{ num: '1', label: 'القُبَّةُ الخَضْرَاءُ وَمَآذِنُ المَسْجِدِ النَّبَوِيِّ الشَّرِيفِ' },
			{ num: '2', label: 'أَوَّلُ عَمَلٍ بَنَاهُ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ بَعْدَ الهِجْرَةِ إِلَى المَدِينَةِ المُنَوَّرَةِ' }
		]
	},
	pri_isl_03_masjid_al_aqsa: {
		id: 'pri_isl_03_masjid_al_aqsa',
		category: 'islamic',
		titleAr: 'المَسْجِدُ الأَقْصَى المُبَارَكُ — أُولَى القِبْلَتَيْنِ وَثَالِثُ الحَرَمَيْنِ',
		legendAr: [
			{ num: '1', label: 'المُصَلَّى القِبْلِيُّ وَسَاحَاتُ المَسْجِدِ الأَقْصَى المُبَارَكِ بِالقُدْسِ الشَّرِيفِ' },
			{ num: '2', label: 'أَشْجَارُ الزَّيْتُونِ المُبَارَكَةُ فِي أَرْضِ الإِسْرَاءِ وَالمِعْرَاجِ' }
		]
	},
	pri_isl_04_mushaf_wooden_stand: {
		id: 'pri_isl_04_mushaf_wooden_stand',
		category: 'islamic',
		titleAr: 'القُرْآنُ الكَرِيمُ كَلَامُ اللهِ تَعَالَى وَآدَابُ تِلَاوَتِهِ',
		legendAr: [
			{ num: '1', label: 'المُصْحَفُ الشَّرِيفُ مَرْفُوعاً بِتَوْقِيرٍ وَطَهَارَةٍ عَلَى الرَّحْلِ الخَشَبِيِّ' },
			{ num: '2', label: 'الاسْتِعَاذَةُ وَالبَسْمَلَةُ وَالتَّرْتِيلُ وَالتَّدَبُّرُ عِنْدَ التِّلَاوَةِ' }
		]
	},
	pri_isl_05_wudu_water_pitcher: {
		id: 'pri_isl_05_wudu_water_pitcher',
		category: 'islamic',
		titleAr: 'الطَّهَارَةُ شَطْرُ الإِيمَانِ: الوُضُوءُ بِالمَاءِ الطَّهُورِ وَالتَّيَمُّمُ بِالصَّعِيدِ الطَّيِّبِ',
		legendAr: [
			{ num: '1', label: 'المَاءُ الطَّهُورُ الصَّافِي مَعَ الاقْتِصَادِ وَعَدَمِ الإِسْرَافِ فِي الوُضُوءِ' },
			{ num: '2', label: 'الحَجَرُ وَالصَّعِيدُ الطَّيِّبُ النَّظِيفُ لِلتَّيَمُّمِ عِنْدَ فَقْدِ المَاءِ أَوِ المَرَضِ' }
		]
	},
	pri_isl_06_ramadan_dates_milk: {
		id: 'pri_isl_06_ramadan_dates_milk',
		category: 'islamic',
		titleAr: 'شَهْرُ رَمَضَانَ المُبَارَكُ وَآدَابُ الصِّيَامِ وَالإِفْطَارِ',
		legendAr: [
			{ num: '1', label: 'تَعْجِيلُ الفِطْرِ عَلَى التَّمَرَاتِ أَوِ المَاءِ اقْتِدَاءً بِالسُّنَّةِ النَّبَوِيَّةِ' },
			{ num: '2', label: 'هِلَالُ شَهْرِ الصِّيَامِ وَالذِّكْرِ وَالدُّعَاءِ وَالجُودِ' }
		]
	},
	pri_isl_07_wheat_olive_zakat: {
		id: 'pri_isl_07_wheat_olive_zakat',
		category: 'islamic',
		titleAr: 'نِعَمُ اللهِ تَعَالَى وَفَضْلُ الزَّكَاةِ وَالصَّدَقَةِ وَإِكْرَامِ الفَقِيرِ',
		legendAr: [
			{ num: '1', label: 'سَنَابِلُ الحُبُوبِ وَثِمَارُ الزَّيْتُونِ وَالتَّمْرِ وَالرُّمَّانِ' },
			{ num: '2', label: 'شُكْرُ النِّعْمَةِ بِأَدَاءِ حَقِّ اللهِ فِيهَا (الزَّكَاةُ وَالإِيثَارُ وَالبَذْلُ)' }
		]
	},
	pri_isl_08_goodly_olive_tree: {
		id: 'pri_isl_08_goodly_olive_tree',
		category: 'islamic',
		titleAr: 'مَثَلُ الكَلِمَةِ الطَّيِّبَةِ وَالأَخْلَاقِ الحَسَنَةِ كَالشَّجَرَةِ الطَّيِّبَةِ',
		legendAr: [
			{ num: '1', label: 'الأَصْلُ الثَّابِتُ الرَّاسِخُ فِي القَلْبِ: التَّوْحِيدُ وَالإِخْلَاصُ للهِ تَعَالَى' },
			{ num: '2', label: 'الفُرُوعُ وَالثِّمَارُ اليَانِعَةُ: الصِّدْقُ، الأَمَانَةُ، بِرُّ الوَالِدَيْنِ، وَالاسْتِقَامَةُ' }
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 6. PRIMARY ARABIC LANGUAGE THEMES (1AP–5AP) — Plates 53..60
	// ═══════════════════════════════════════════════════════════════════════════
	pri_ara_01_school_bag_supplies: {
		id: 'pri_ara_01_school_bag_supplies',
		category: 'arabic',
		titleAr: 'مَقْطَعُ الحَيَاةِ المَدْرَسِيَّةِ: أُحَافِظُ عَلَى مِحْفَظَتِي وَكُتُبِي وَأَدَوَاتِي',
		legendAr: [
			{ num: '1', label: 'المِحْفَظَةُ المُرَتَّبَةُ وَالكُتُبُ وَالكَرَارِيسُ النَّظِيفَةُ' },
			{ num: '2', label: 'المِقْلَمَةُ وَالأَقْلَامُ وَأَدَوَاتُ الجِدِّ وَالاجْتِهَادِ' }
		]
	},
	pri_ara_02_warm_algerian_home: {
		id: 'pri_ara_02_warm_algerian_home',
		category: 'arabic',
		titleAr: 'مَقْطَعُ العَائِلَةِ: دِفْءُ البَيْتِ الجَزَائِرِيِّ وَالنِّظَامُ وَالتَّعَاوُنُ',
		legendAr: [
			{ num: '1', label: 'الزَّرْبِيَّةُ التَّقْلِيدِيَّةُ الأَصِيلَةُ وَأَثَاثُ غُرْفَةِ الاسْتِقْبَالِ المُرَتَّبُ' },
			{ num: '2', label: 'صِينِيَّةُ الإِكْرَامِ وَمَكْتَبَةُ البَيْتِ العَامِرِ بِالمَوَدَّةِ وَالآدَابِ' }
		]
	},
	pri_ara_03_algerian_village_orchard: {
		id: 'pri_ara_03_algerian_village_orchard',
		category: 'arabic',
		titleAr: 'مَقْطَعُ الحَيِّ وَالقَرْيَةِ: جَمَالُ الرِّيفِ الجَزَائِرِيِّ وَبَسَاتِينِ الزَّيْتُونِ',
		legendAr: [
			{ num: '1', label: 'البُيُوتُ الرِّيفِيَّةُ البَيْضَاءُ ذَاتُ القَرْمِيدِ الأَحْمَرِ عَلَى السُّفُوحِ الخَضْرَاءِ' },
			{ num: '2', label: 'حُقُولُ الفِلَاحَةِ وَأَشْجَارُ الزَّيْتُونِ وَالتِّينِ وَالهَوَاءُ النَّقِيُّ' }
		]
	},
	pri_ara_04_algeria_flag_martyrs_memorial: {
		id: 'pri_ara_04_algeria_flag_martyrs_memorial',
		category: 'arabic',
		titleAr: 'مَقْطَعُ الهُوِيَّةِ وَالوَطَنِ: الجَزَائِرُ الحَبِيبَةُ وَرَايَةُ الشُّهَدَاءِ',
		legendAr: [
			{ num: '1', label: 'مَقَامُ الشَّهِيدِ الشَّامِخُ وَمَعَالِمُ القَصَبَةِ العَتِيقَةِ' },
			{ num: '2', label: 'العَلَمُ الوَطَنِيُّ الجَزَائِرِيُّ رَمْزُ السِّيَادَةِ وَالتَّضْحِيَةِ وَالوَفَاءِ' }
		]
	},
	pri_ara_05_fresh_fruits_honey_basket: {
		id: 'pri_ara_05_fresh_fruits_honey_basket',
		category: 'arabic',
		titleAr: 'مَقْطَعُ التَّغْذِيَةِ وَالصِّحَّةِ: غِذَائِي الطَّبِيعِيُّ سِرُّ عَافِيَتِي وَنَشَاطِي',
		legendAr: [
			{ num: '1', label: 'سَلَّةُ الخُضَرِ وَالفَوَاكِهِ الطَّازَجَةِ الغَنِيَّةِ بِالفَوَائِدِ' },
			{ num: '2', label: 'العَسَلُ الصَّافِي وَزَيْتُ الزَّيْتُونِ المُبَارَكُ (اجْتِنَابُ الأَغْذِيَةِ المُصَنَّعَةِ الضَّارَّةِ)' }
		]
	},
	pri_ara_06_four_seasons_trees: {
		id: 'pri_ara_06_four_seasons_trees',
		category: 'arabic',
		titleAr: 'مَقْطَعُ الطَّبِيعَةِ وَالبِيئَةِ: بَدِيعُ صُنْعِ اللهِ فِي الفُصُولِ الأَرْبَعَةِ',
		legendAr: [
			{ num: '1', label: 'أَزْهَارُ الرَّبِيعِ البَهِيجَةُ وَثِمَارُ الصَّيْفِ اليَانِعَةُ' },
			{ num: '2', label: 'أَوْرَاقُ الخَرِيفِ الذَّهَبِيَّةُ وَثُلُوجُ الشِّتَاءِ البَيْضَاءُ النَّافِعَةُ' }
		]
	},
	pri_ara_07_science_library_telescope: {
		id: 'pri_ara_07_science_library_telescope',
		category: 'arabic',
		titleAr: 'مَقْطَعُ العِلْمِ وَالابْتِكَارِ: بِالقِرَاءَةِ وَالبَحْثِ نَبْنِي المُسْتَقْبَلَ',
		legendAr: [
			{ num: '1', label: 'الكُتُبُ النَّافِعَةُ وَالمِكْبَرَةُ وَمُجَسَّمُ الكُرَةِ الأَرْضِيَّةِ' },
			{ num: '2', label: 'المِنْظَارُ الفَلَكِيُّ وَالحَاسُوبُ لِلتَّعَلُّمِ النَّافِعِ وَالاكْتِشَافِ' }
		]
	},
	pri_ara_08_sahara_oasis_dunes: {
		id: 'pri_ara_08_sahara_oasis_dunes',
		category: 'arabic',
		titleAr: 'مَقْطَعُ الأَسْفَارِ وَالرِّحَلَاتِ: سِحْرُ الوَاحَاتِ وَالصَّحْرَاءِ الجَزَائِرِيَّةِ الكُبْرَى',
		legendAr: [
			{ num: '1', label: 'الكُثْبَانُ الرَّمْلِيَّةُ الذَّهَبِيَّةُ المُمْتَدَّةُ عِنْدَ الأَصِيلِ' },
			{ num: '2', label: 'عَيْنُ الوَاحَةِ الصَّافِيَةُ وَبَسَاتِينُ النَّخِيلِ البَاسِقَاتِ' }
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 7. PRIMARY FRENCH & ENGLISH (3AP–5AP) — Plates 61..68
	// ═══════════════════════════════════════════════════════════════════════════
	pri_lang_01_red_bus_train: {
		id: 'pri_lang_01_red_bus_train',
		category: 'languages',
		titleAr: 'وسائل النقل البرية',
		titleFr: 'Les moyens de transport terrestre',
		titleEn: 'Land Means of Transport',
		legendAr: [
			{ num: '1', label: 'حافلة المدرسة / المدينة' },
			{ num: '2', label: 'قطار المسافرين السريع' }
		],
		legendFr: [
			{ num: '1', label: 'Le bus scolaire (un autobus jaune)' },
			{ num: '2', label: 'Le train rapide sur les rails' }
		],
		legendEn: [
			{ num: '1', label: 'A yellow school bus (by bus)' },
			{ num: '2', label: 'A fast passenger train (by train)' }
		]
	},
	pri_lang_02_airplane_ship: {
		id: 'pri_lang_02_airplane_ship',
		category: 'languages',
		titleAr: 'وسائل النقل الجوية والبحرية',
		titleFr: 'En voyage : par avion et par bateau',
		titleEn: 'Travelling by Plane and by Ship',
		legendAr: [
			{ num: '1', label: 'الطائرة في السماء' },
			{ num: '2', label: 'السفينة في البحر' }
		],
		legendFr: [
			{ num: '1', label: "L'avion dans le ciel (voyager par avion)" },
			{ num: '2', label: 'Le bateau sur la mer bleue (voyager en bateau)' }
		],
		legendEn: [
			{ num: '1', label: 'An airplane in the sky (by plane)' },
			{ num: '2', label: 'A ship sailing on the blue sea (by ship)' }
		]
	},
	pri_lang_03_weather_icons_quad: {
		id: 'pri_lang_03_weather_icons_quad',
		category: 'languages',
		titleAr: 'حالة الطقس والفصول',
		titleFr: 'Quel temps fait-il ? — La météo et les saisons',
		titleEn: 'What is the Weather Like? — Weather & Seasons',
		legendAr: [
			{ num: '1', label: 'مشمس ودافئ' },
			{ num: '2', label: 'ممطر وقوس قزح' },
			{ num: '3', label: 'مثلج وبارد' },
			{ num: '4', label: 'عاصف (رياح)' }
		],
		legendFr: [
			{ num: '1', label: 'Il fait beau / Il y a du soleil' },
			{ num: '2', label: 'Il pleut et voici un arc-en-ciel' },
			{ num: '3', label: 'Il neige et il fait froid' },
			{ num: '4', label: 'Il y a du vent' }
		],
		legendEn: [
			{ num: '1', label: 'It is sunny and warm' },
			{ num: '2', label: 'It is rainy with a rainbow' },
			{ num: '3', label: 'It is snowy and cold' },
			{ num: '4', label: 'It is windy' }
		]
	},
	pri_lang_04_house_rooms_cutaway: {
		id: 'pri_lang_04_house_rooms_cutaway',
		category: 'languages',
		titleAr: 'غرف المنزل والحديقة',
		titleFr: 'Ma maison et ses pièces',
		titleEn: 'My House and Its Rooms',
		legendAr: [
			{ num: '1', label: 'غرفة النوم' },
			{ num: '2', label: 'الحمام' },
			{ num: '3', label: 'المطبخ' },
			{ num: '4', label: 'غرفة الجلوس والحديقة' }
		],
		legendFr: [
			{ num: '1', label: 'La chambre à coucher (le lit, la lampe)' },
			{ num: '2', label: 'La salle de bains (le lavabo, la baignoire)' },
			{ num: '3', label: 'La cuisine propre et rangée' },
			{ num: '4', label: 'Le salon et le petit jardin fleuri' }
		],
		legendEn: [
			{ num: '1', label: 'The bedroom (a tidy bed and a lamp)' },
			{ num: '2', label: 'The bathroom (a sink and a bathtub)' },
			{ num: '3', label: 'The kitchen (cupboards and a cooker)' },
			{ num: '4', label: 'The living room and the small flower garden' }
		]
	},
	pri_lang_05_professions_tools: {
		id: 'pri_lang_05_professions_tools',
		category: 'languages',
		titleAr: 'المهن النبيلة وأدواتها',
		titleFr: 'Les métiers et leurs outils de travail',
		titleEn: 'Jobs, Occupations and Their Tools',
		legendAr: [
			{ num: '1', label: 'الطبيب (سماعة وحقيبة إسعاف)' },
			{ num: '2', label: 'عون الحماية المدنية (خوذة الإطفاء)' },
			{ num: '3', label: 'الخباز (الخبز والسنابل)' },
			{ num: '4', label: 'المعلم (السبورة والكتب)' }
		],
		legendFr: [
			{ num: '1', label: 'Le médecin : le stéthoscope et la trousse de secours' },
			{ num: '2', label: "Le pompier : le casque rouge et la lance à eau" },
			{ num: '3', label: 'Le boulanger : le bon pain chaud et le blé' },
			{ num: '4', label: "L'enseignant(e) : le tableau vert, la craie et les livres" }
		],
		legendEn: [
			{ num: '1', label: 'Doctor / Nurse: stethoscope and first-aid kit' },
			{ num: '2', label: 'Firefighter: red safety helmet and water hose' },
			{ num: '3', label: 'Baker: fresh bread loaves and golden wheat' },
			{ num: '4', label: 'Teacher: classroom board, chalk, ruler and books' }
		]
	},
	pri_lang_06_hygiene_washbasin: {
		id: 'pri_lang_06_hygiene_washbasin',
		category: 'languages',
		titleAr: 'النظافة اليومية والعادات الصحية',
		titleFr: "L'hygiène corporelle au quotidien",
		titleEn: 'Daily Hygiene and Healthy Habits',
		legendAr: [
			{ num: '1', label: 'المغسلة والماء النظيف' },
			{ num: '2', label: 'فرشاة ومعجون الأسنان' },
			{ num: '3', label: 'الصابون والمنشفة النظيفة' }
		],
		legendFr: [
			{ num: '1', label: "Se laver les mains à l'eau propre au lavabo" },
			{ num: '2', label: 'Se brosser les dents avec la brosse à dents et le dentifrice' },
			{ num: '3', label: 'Utiliser du savon et une serviette propre' }
		],
		legendEn: [
			{ num: '1', label: 'Wash hands with clean running water at the sink' },
			{ num: '2', label: 'Brush teeth with a toothbrush and toothpaste' },
			{ num: '3', label: 'Use soap and dry with a clean towel' }
		]
	},
	pri_lang_07_clean_park_planting: {
		id: 'pri_lang_07_clean_park_planting',
		category: 'languages',
		titleAr: 'التشجير وحماية المحيط',
		titleFr: 'Protégeons notre environnement et plantons des arbres',
		titleEn: 'Planting Trees and Keeping Our Park Clean',
		legendAr: [
			{ num: '1', label: 'غرس شجيرة فتية في التربة' },
			{ num: '2', label: 'سقي الأزهار بمرش الماء' },
			{ num: '3', label: 'وضع النفايات في سلة المهملات' }
		],
		legendFr: [
			{ num: '1', label: 'Planter un jeune arbuste vert dans la terre' },
			{ num: '2', label: "Arroser les fleurs avec l'arrosoir" },
			{ num: '3', label: 'Jeter les déchets dans la poubelle du jardin' }
		],
		legendEn: [
			{ num: '1', label: 'Plant a young green sapling in the soil' },
			{ num: '2', label: 'Water the flowers with a watering can' },
			{ num: '3', label: 'Keep the park clean using the waste bin' }
		]
	},
	pri_lang_08_birthday_cake_party: {
		id: 'pri_lang_08_birthday_cake_party',
		category: 'languages',
		titleAr: 'حفلة النجاح والاحتفال المدرسي',
		titleFr: 'Une belle fête réussie : gâteau, ballons et cadeaux',
		titleEn: 'Celebration Time: Cake, Balloons and Gifts',
		legendAr: [
			{ num: '1', label: 'كعكة الفواكه اللذيذة' },
			{ num: '2', label: 'البالونات الملونة' },
			{ num: '3', label: 'علب الهدايا' }
		],
		legendFr: [
			{ num: '1', label: 'Un délicieux gâteau aux fraises' },
			{ num: '2', label: 'Des ballons multicolores' },
			{ num: '3', label: 'Des boîtes de cadeaux avec des rubans' }
		],
		legendEn: [
			{ num: '1', label: 'A delicious strawberry cake' },
			{ num: '2', label: 'Colorful party balloons' },
			{ num: '3', label: 'Wrapped gift boxes with ribbons' }
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 7. HISTORY & GEOGRAPHY (3AP–3AS BAC) — Self-Labeled & Numbered Mute Maps
	// ZERO coordinate-overlay pins! All labels or numbers (1)..(6) are baked directly
	// into the Nano Banana plate artwork on pure #FFFFFF backgrounds.
	// ═══════════════════════════════════════════════════════════════════════════
	hg_01_timeline_historical_sources: {
		id: 'hg_01_timeline_historical_sources',
		category: 'history_geo',
		titleAr: 'مراحل العصور التاريخية ومصادر المعلومة التاريخية',
		defaultPins: [],
		legendAr: []
	},
	hg_02_compass_directions_map_key: {
		id: 'hg_02_compass_directions_map_key',
		category: 'history_geo',
		titleAr: 'وردة الرياح والجهات الأساسية وعناصر الخريطة',
		defaultPins: [],
		legendAr: []
	},
	hg_03_algeria_relief_climate_cross_section: {
		id: 'hg_03_algeria_relief_climate_cross_section',
		category: 'history_geo',
		titleAr: 'مقطع تضاريسي ومناخي للجزائر من الشمال إلى الجنوب',
		defaultPins: [],
		legendAr: []
	},
	hg_04_numidia_roman_monuments_algeria: {
		id: 'hg_04_numidia_roman_monuments_algeria',
		category: 'history_geo',
		titleAr: 'المعالم الأثرية في بلاد المغرب القديم ونوميديا',
		defaultPins: [],
		legendAr: []
	},
	hg_05_islamic_states_maghrib_landmarks: {
		id: 'hg_05_islamic_states_maghrib_landmarks',
		category: 'history_geo',
		titleAr: 'معالم الدول الإسلامية المستقلة في المغرب الإسلامي',
		defaultPins: [],
		legendAr: []
	},
	hg_06_ottoman_algeria_fleet_citadel: {
		id: 'hg_06_ottoman_algeria_fleet_citadel',
		category: 'history_geo',
		titleAr: 'الأسطول البحري الجزائري والقصبة في العهد العثماني',
		defaultPins: [],
		legendAr: []
	},
	hg_07_soummam_congress_november_landmarks: {
		id: 'hg_07_soummam_congress_november_landmarks',
		category: 'history_geo',
		titleAr: 'معالم الثورة التحريرية المظفرة (1954 – 1962)',
		defaultPins: [],
		legendAr: []
	},
	hg_08_earth_lat_lon_climate_zones: {
		id: 'hg_08_earth_lat_lon_climate_zones',
		category: 'history_geo',
		titleAr: 'الإحداثيات الجغرافية والنطاقات المناخية الكبرى',
		defaultPins: [],
		legendAr: []
	},
	hg_09_algeria_natural_hazards_prevention: {
		id: 'hg_09_algeria_natural_hazards_prevention',
		category: 'history_geo',
		titleAr: 'المخاطر الطبيعية الكبرى في الجزائر وطرق الوقاية منها',
		defaultPins: [],
		legendAr: []
	},
	hg_10_global_north_south_trade_divide: {
		id: 'hg_10_global_north_south_trade_divide',
		category: 'history_geo',
		titleAr: 'خريطة الفاصل الاقتصادي بين عالم الشمال المتقدم وعالم الجنوب',
		defaultPins: [],
		legendAr: []
	},
	hg_11_algeria_mute_map_regions_4: {
		id: 'hg_11_algeria_mute_map_regions_4',
		category: 'history_geo',
		titleAr: 'خريطة الأقاليم التضاريسية الكبرى في الجزائر',
		defaultPins: [],
		legendAr: [
			{ num: '1', label: 'الشريط الساحلي وإقليم التل' },
			{ num: '2', label: 'السهول والهضاب العليا' },
			{ num: '3', label: 'سلسلة الأطلس الصحراوي' },
			{ num: '4', label: 'الإقليم الصحراوي الجنوبي' }
		]
	},
	hg_12_algeria_six_historical_wilayas_map: {
		id: 'hg_12_algeria_six_historical_wilayas_map',
		category: 'history_geo',
		titleAr: 'خريطة التقسيم العسكري للثورة الجزائرية (الولايات التاريخية الست — مؤتمر الصومام 1956)',
		defaultPins: [],
		legendAr: [
			{ num: '1', label: 'الولاية الأولى (الأوراس النمامشة)' },
			{ num: '2', label: 'الولاية الثانية (الشمال القسنطيني)' },
			{ num: '3', label: 'الولاية الثالثة (القبائل)' },
			{ num: '4', label: 'الولاية الرابعة (الجزائر والوسط)' },
			{ num: '5', label: 'الولاية الخامسة (وهران والغرب)' },
			{ num: '6', label: 'الولاية السادسة (الصحراء)' }
		]
	},
	hg_13_maghrib_mediterranean_mute_map: {
		id: 'hg_13_maghrib_mediterranean_mute_map',
		category: 'history_geo',
		titleAr: 'خريطة دول المغرب العربي وحوض البحر الأبيض المتوسط',
		defaultPins: [],
		legendAr: [
			{ num: '1', label: 'الجزائر' },
			{ num: '2', label: 'تونس' },
			{ num: '3', label: 'المغرب الأقصى' },
			{ num: '4', label: 'ليبيا' },
			{ num: '5', label: 'موريتانيا' },
			{ num: '6', label: 'البحر الأبيض المتوسط' }
		]
	},
	hg_14_world_continents_oceans_mute_map: {
		id: 'hg_14_world_continents_oceans_mute_map',
		category: 'history_geo',
		titleAr: 'خريطة العالم للقارات والمحيطات الكبرى',
		defaultPins: [],
		legendAr: [
			{ num: '1', label: 'قارة إفريقيا' },
			{ num: '2', label: 'قارة آسيا' },
			{ num: '3', label: 'قارة أوروبا' },
			{ num: '4', label: 'قارة أمريكا' },
			{ num: '5', label: 'المحيط الأطلسي' },
			{ num: '6', label: 'المحيط الهادي' }
		]
	},
	hg_15_cold_war_europe_world_mute_map: {
		id: 'hg_15_cold_war_europe_world_mute_map',
		category: 'history_geo',
		titleAr: 'خريطة بؤر التوتر وأقطاب الحرب الباردة (1945 – 1989)',
		defaultPins: [],
		legendAr: [
			{ num: '1', label: 'الولايات المتحدة الأمريكية' },
			{ num: '2', label: 'الاتحاد السوفياتي' },
			{ num: '3', label: 'ألمانيا (أزمة برلين 1948 و1961)' },
			{ num: '4', label: 'كوبا (أزمة الصواريخ 1962)' },
			{ num: '5', label: 'شبه الجزيرة الكورية (1950–1953)' },
			{ num: '6', label: 'مصر (العدوان الثلاثي وقناة السويس 1956)' }
		]
	},
	hg_16_global_economic_poles_mute_map: {
		id: 'hg_16_global_economic_poles_mute_map',
		category: 'history_geo',
		titleAr: 'خريطة الأقطاب الاقتصادية العالمية الكبرى والقوى الصاعدة',
		defaultPins: [],
		legendAr: [
			{ num: '1', label: 'الولايات المتحدة الأمريكية' },
			{ num: '2', label: 'الاتحاد الأوروبي' },
			{ num: '3', label: 'شرق وجنوب شرق آسيا' },
			{ num: '4', label: 'البرازيل' },
			{ num: '5', label: 'الهند' },
			{ num: '6', label: 'الجزائر' }
		]
	},
	// ═══════════════════════════════════════════════════════════════════════════
	// 6. SECONDARY SPANISH LANGUAGE (2AS–3AS LE) — Plates spa_01..spa_06
	// ═══════════════════════════════════════════════════════════════════════════
	spa_01_mundo_hispanohablante_mapa_mudo: {
		id: 'spa_01_mundo_hispanohablante_mapa_mudo',
		category: 'spanish',
		titleAr: 'خريطة صماء للعالم الناطق بالإسبانية وحوض المتوسط',
		titleEs: 'Mapa mudo del mundo hispanohablante y el Mediterráneo',
		defaultPins: [],
		legendAr: [
			{ num: '1', label: 'إسبانيا (شبه الجزيرة الإيبيرية)' },
			{ num: '2', label: 'الجزائر (الضفة الجنوبية للمتوسط)' },
			{ num: '3', label: 'المكسيك (أمريكا الشمالية والوسطى)' },
			{ num: '4', label: 'الأرجنتين (أمريكا الجنوبية)' },
			{ num: '5', label: 'المحيط الأطلسي والبحر الأبيض المتوسط' }
		],
		legendEs: [
			{ num: '1', label: 'España (Península Ibérica)' },
			{ num: '2', label: 'Argelia (Norte de África)' },
			{ num: '3', label: 'México (Hispanoamérica)' },
			{ num: '4', label: 'Argentina (Cono Sur)' },
			{ num: '5', label: 'Océano Atlántico y Mar Mediterráneo' }
		]
	},
	spa_02_patrimonio_andalusi_arquitectura: {
		id: 'spa_02_patrimonio_andalusi_arquitectura',
		category: 'spanish',
		titleAr: 'روائع العمارة الأندلسية والمغاربية المشتركة',
		titleEs: 'Esplendor de la arquitectura andalusí y magrebí',
		defaultPins: [],
		legendAr: [
			{ num: '1', label: 'أقواس مسجد قرطبة التاريخية' },
			{ num: '2', label: 'فناء قصر الحمراء بغرناطة والزخارف الهندسية' },
			{ num: '3', label: 'المآذن الموحدية والزيانية (إشبيلية وتلمسان)' }
		],
		legendEs: [
			{ num: '1', label: 'Arcos bicolores de Córdoba' },
			{ num: '2', label: 'Patio de la Alhambra de Granada' },
			{ num: '3', label: 'Alminares históricos de Sevilla y Tremecén' }
		]
	},
	spa_03_educacion_idiomas_biblioteca: {
		id: 'spa_03_educacion_idiomas_biblioteca',
		category: 'spanish',
		titleAr: 'التعليم وتعلّم اللغات الأجنبية والبحث المعرفي',
		titleEs: 'La educación, los idiomas y el acceso al conocimiento',
		defaultPins: [],
		legendAr: [
			{ num: '1', label: 'المطالعة والكتاب (Lectura y conocimiento)' },
			{ num: '2', label: 'تعلّم اللغات والترجمة (Aprendizaje de idiomas)' },
			{ num: '3', label: 'البحث الرقمي المنظم (Investigación digital)' },
			{ num: '4', label: 'النجاح والتفوّق الدراسي (Éxito académico)' }
		],
		legendEs: [
			{ num: '1', label: 'Lectura y conocimiento en biblioteca' },
			{ num: '2', label: 'Aprendizaje de lenguas extranjeras' },
			{ num: '3', label: 'Investigación académica rigurosa' },
			{ num: '4', label: 'Éxito educativo y formación integral' }
		]
	},
	spa_04_medio_ambiente_energias_limpias: {
		id: 'spa_04_medio_ambiente_energias_limpias',
		category: 'spanish',
		titleAr: 'حماية البيئة والطاقات النظيفة والتنمية المستدامة',
		titleEs: 'Protección del medio ambiente y energías limpias',
		defaultPins: [],
		legendAr: [
			{ num: '1', label: 'الطاقة الشمسية (Energía solar)' },
			{ num: '2', label: 'طاقة الرياح (Energía eólica)' },
			{ num: '3', label: 'التشجير وحماية الغابات (Reforestación)' },
			{ num: '4', label: 'ترشيد استهلاك المياه (Ahorro del agua)' }
		],
		legendEs: [
			{ num: '1', label: 'Energía solar fotovoltaica' },
			{ num: '2', label: 'Energía eólica renovable' },
			{ num: '3', label: 'Reforestación y cuidado de bosques' },
			{ num: '4', label: 'Ahorro y preservación del agua' }
		]
	},
	spa_05_tecnologia_comunicacion_responsable: {
		id: 'spa_05_tecnologia_comunicacion_responsable',
		category: 'spanish',
		titleAr: 'التكنولوجيات الحديثة والاتصال الرقمي المسؤول',
		titleEs: 'Nuevas tecnologías y comunicación digital responsable',
		defaultPins: [],
		legendAr: [
			{ num: '1', label: 'الابتكار العلمي والرقمي (Innovación científica)' },
			{ num: '2', label: 'الأمن الرقمي وحماية الخصوصية (Seguridad digital)' },
			{ num: '3', label: 'التعليم الإلكتروني (Educación en línea)' },
			{ num: '4', label: 'الاستعمال المتوازن والمسؤول (Uso responsable)' }
		],
		legendEs: [
			{ num: '1', label: 'Innovación científica y técnica' },
			{ num: '2', label: 'Seguridad digital y protección de datos' },
			{ num: '3', label: 'Educación en línea y bibliotecas virtuales' },
			{ num: '4', label: 'Uso equilibrado y responsable' }
		]
	},
	spa_06_mundo_laboral_emprendimiento: {
		id: 'spa_06_mundo_laboral_emprendimiento',
		category: 'spanish',
		titleAr: 'عالم الشغل وريادة الأعمال الشبابية والتضامن',
		titleEs: 'El mundo laboral, el emprendimiento y la solidaridad',
		defaultPins: [],
		legendAr: [
			{ num: '1', label: 'التكوين المهني والتأهيل (Formación profesional)' },
			{ num: '2', label: 'ريادة الأعمال والمشاريع الناشئة (Emprendimiento)' },
			{ num: '3', label: 'الصناعة والابتكار الإنتاجي (Industria e innovación)' },
			{ num: '4', label: 'التضامن والتنمية المستدامة (Desarrollo sostenible)' }
		],
		legendEs: [
			{ num: '1', label: 'Formación profesional y capacitación' },
			{ num: '2', label: 'Emprendimiento juvenil y proyectos' },
			{ num: '3', label: 'Innovación productiva e industria' },
			{ num: '4', label: 'Solidaridad y desarrollo sostenible' }
		]
	}
} as const satisfies Record<string, IllustrationAssetMeta>;

export type IllustrationId = keyof typeof ILLUSTRATIONS_CATALOG;

export function getIllustrationWebpUrl(id: IllustrationId): string {
	const meta = ILLUSTRATIONS_CATALOG[id];
	return `/documents/illustrations/${meta.category}/${meta.id}.webp`;
}

export function getIllustrationJpgUrl(id: IllustrationId): string {
	const meta = ILLUSTRATIONS_CATALOG[id];
	return `/documents/illustrations/${meta.category}/${meta.id}.jpg`;
}

/**
 * Produces a serialized `{"kind":"illustrated",...}` string consumed natively by
 * `InteractiveLessonPlayer.svelte` (loads fast `.webp` + interactive vector legend/pins).
 */
export function renderLessonIllustration(
	id: IllustrationId,
	opts?: {
		title?: string;
		lang?: 'ar' | 'fr' | 'en' | 'es';
		pins?: IllustrationPinSpec[];
		customLegend?: IllustrationLegendSpec[];
		hideLegend?: boolean;
	}
): string {
	const meta = ILLUSTRATIONS_CATALOG[id] as IllustrationAssetMeta;
	const lang = opts?.lang ?? 'ar';
	const defaultTitle =
		lang === 'fr'
			? (meta.titleFr ?? meta.titleAr)
			: lang === 'en'
				? (meta.titleEn ?? meta.titleAr)
				: lang === 'es'
					? (meta.titleEs ?? meta.titleAr)
					: meta.titleAr;
	const defaultLegend =
		lang === 'fr'
			? (meta.legendFr ?? meta.legendAr)
			: lang === 'en'
				? (meta.legendEn ?? meta.legendAr)
				: lang === 'es'
					? (meta.legendEs ?? meta.legendAr)
					: meta.legendAr;

	return JSON.stringify({
		kind: 'illustrated',
		src: getIllustrationWebpUrl(id),
		title: opts?.title ?? defaultTitle,
		pins: opts?.pins ?? meta.defaultPins ?? [],
		legend: opts?.hideLegend ? [] : (opts?.customLegend ?? defaultLegend),
		isLtr: lang === 'fr' || lang === 'en' || lang === 'es'
	});
}

/**
 * Produces a ready-to-compile SujetBuilder `IllustratedFigureBlock` using the `#FFFFFF` `.jpg`
 * textbook plate + crisp vector Typst title/pins/legend (supports both `labeled` & `quiz` modes).
 */
export function buildIllustratedFigureBlock(
	id: IllustrationId,
	opts?: {
		title?: string;
		lang?: 'ar' | 'fr' | 'en' | 'es';
		mode?: 'labeled' | 'quiz' | 'image_only';
		width?: number | string;
		maxHeight?: number;
		caption?: string;
		markPerItem?: string;
		pins?: IllustrationPinSpec[];
		customLegend?: Array<{ num: string | number; label: string; mark?: string | number }>;
	}
): IllustratedFigureBlock {
	const meta = ILLUSTRATIONS_CATALOG[id] as IllustrationAssetMeta;
	const lang = opts?.lang ?? 'ar';
	const mode = opts?.mode ?? 'labeled';
	const defaultTitle =
		lang === 'fr'
			? (meta.titleFr ?? meta.titleAr)
			: lang === 'en'
				? (meta.titleEn ?? meta.titleAr)
				: lang === 'es'
					? (meta.titleEs ?? meta.titleAr)
					: meta.titleAr;
	const rawLegend =
		opts?.customLegend ??
		(lang === 'fr'
			? (meta.legendFr ?? meta.legendAr)
			: lang === 'en'
				? (meta.legendEn ?? meta.legendAr)
				: lang === 'es'
					? (meta.legendEs ?? meta.legendAr)
					: meta.legendAr);

	return {
		type: 'illustrated_figure',
		src: getIllustrationJpgUrl(id),
		title: opts?.title ?? defaultTitle,
		width: opts?.width ?? '66%',
		maxHeight: opts?.maxHeight ?? 138,
		pins: (opts?.pins ?? meta.defaultPins ?? []).map((p) => ({
			num: p.num,
			xPct: p.xPct,
			yPct: p.yPct,
			color: p.color
		})),
		legend:
			mode === 'image_only'
				? []
				: rawLegend.map((it) => ({
						num: it.num,
						label: it.label,
						mark: 'mark' in it && it.mark !== undefined ? it.mark : opts?.markPerItem
					})),
		legendMode: mode === 'quiz' ? 'quiz' : 'labeled',
		caption: opts?.caption
	};
}
