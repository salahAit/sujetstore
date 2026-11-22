import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type {
	ExamDocument,
	ExamMetadata,
	ExerciseBlock,
	TemplateId
} from '../../modules/SujetBuilder/types';
import { saveSvgAsset } from '../../modules/MathTemplates/svg-helpers';
import {
	svgCobwebSequencePlot,
	svgFunctionCurvePlot,
	svgVariationTable
} from '../../modules/MathTemplates/svg-secondary';

export type LitMathAcademicYear = '2023' | '2024' | '2025';

export type LitMathTrackId = '3as_lp' | '3as_le';
export type LitMathStreamId = 'LP' | 'LE';
export type LitMathYearSubjectId = 768 | 787;

export interface OfficialBacLitMathPaperSpec {
	slug: string;
	academicYear: LitMathAcademicYear;
	topicNumber: 1 | 2;
	sessionAr: string;
	subjectId: 'MAT-LIT';
	coefficient: 2;
	duration: '02 ساعات و30 دقيقة';
	pointsSplit: readonly [6, 6, 8];
	templateId: Extract<TemplateId, 'secondary/bac_official'>;
	titleAr: string;
	themesAr: string[];
	examDoc: ExamDocument;
}

export interface OfficialBacLitMathBinding {
	slug: string;
	bindingSlug: string;
	paperSlug: string;
	grade: LitMathTrackId;
	yearSubjectId: LitMathYearSubjectId;
	subjectId: 'MAT-LIT';
	streamId: LitMathStreamId;
	streamNameAr: 'آداب وفلسفة' | 'لغات أجنبية';
	academicYear: LitMathAcademicYear;
	topicNumber: 1 | 2;
	sessionAr: string;
	coefficient: 2;
	duration: '02 ساعات و30 دقيقة';
	pointsSplit: readonly [6, 6, 8];
	templateId: Extract<TemplateId, 'secondary/bac_official'>;
	titleAr: string;
	themesAr: string[];
	examDoc: ExamDocument;
}

/** Resolves an asset path returned by `saveSvgAsset` for Typst `#image(...)` inside `answer` strings. */
function typstSvgPath(publicUrl: string): string {
	const rel = publicUrl.replace(/^\/+/, '');
	if (existsSync(resolve(process.cwd(), 'static', rel))) {
		return `/static/${rel}`;
	}
	return `/data/media/${rel}`;
}

function buildLitMetadata(
	year: LitMathAcademicYear,
	topicNumber: 1 | 2,
	streamId = 'LP/LE',
	streamName = 'آداب وفلسفة + لغات أجنبية'
): ExamMetadata {
	const sessionAr = `دورة جوان ${year}`;
	return {
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي',
		streamId,
		streamName,
		subjectId: 'MAT-LIT',
		subjectName: 'الرياضيات',
		trimesterId: 't3',
		trimesterName: 'دورة بكالوريا رسمية',
		docType: 'exam',
		academicYear: year,
		duration: '02 ساعات و30 دقيقة',
		coefficient: 2,
		examSessionAr: sessionAr,
		topicNumber,
		font: 'Arabic Transparent',
		customDocTitle: 'امتحان بكالوريا التعليم الثانوي',
		siteUrl: 'https://sujetstore.com'
	};
}

function buildLitPaperSpec(opts: {
	year: LitMathAcademicYear;
	topicNumber: 1 | 2;
	themesAr: string[];
	exercises: [ExerciseBlock, ExerciseBlock, ExerciseBlock];
}): OfficialBacLitMathPaperSpec {
	const slug = `bac-${opts.year}-3as-lit-math-s${opts.topicNumber}`;
	const sessionAr = `دورة جوان ${opts.year}`;
	const topicLabel = opts.topicNumber === 1 ? 'الموضوع الأول' : 'الموضوع الثاني';
	const examDoc: ExamDocument = {
		metadata: buildLitMetadata(opts.year, opts.topicNumber),
		exercises: opts.exercises
	};

	return {
		slug,
		academicYear: opts.year,
		topicNumber: opts.topicNumber,
		sessionAr,
		subjectId: 'MAT-LIT',
		coefficient: 2,
		duration: '02 ساعات و30 دقيقة',
		pointsSplit: [6, 6, 8] as const,
		templateId: 'secondary/bac_official',
		titleAr: `بكالوريا رسمية في الرياضيات — شعبتا آداب وفلسفة ولغات أجنبية (${sessionAr} - ${topicLabel})`,
		themesAr: opts.themesAr,
		examDoc
	};
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. دورة جوان 2023 — الشّعب الأدبية واللغات — الموضوع الأول
// ت1 (6ن): الموافقات بترديد 5    | ت2 (6ن): المتتالية الحسابية والهندسية
// ت3 (8ن): دالة كثير حدود من الدرجة 3
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2023LitS1(): OfficialBacLitMathPaperSpec {
	const ex3VarUrl = saveSvgAsset(
		'bac_ext_2023_lit_s1_ex3_var',
		svgVariationTable({
			xValues: ['-∞', '0', '2', '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '+' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '-' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '+' }
			],
			variations: [
				{ value: '-∞', position: 'bottom' },
				{ value: '4', position: 'top' },
				{ value: '0', position: 'bottom' },
				{ value: '+∞', position: 'top' }
			],
			fnName: 'f(x)',
			derivName: "f'(x)"
		})
	);

	const ex3CfUrl = saveSvgAsset(
		'bac_ext_2023_lit_s1_ex3_cf',
		svgFunctionCurvePlot({
			xMin: -1.8,
			xMax: 3.4,
			yMin: -2.0,
			yMax: 6.0,
			fn: (x) => x * x * x - 3 * x * x + 4,
			curveLabel: '(Cf)',
			tangents: [{ x: 1, y: 2, slope: -3, halfSpan: 1.1, color: '#059669' }],
			points: [
				{ x: -1, y: 0, label: '(-1;0)', color: '#15803d' },
				{ x: 0, y: 4, label: 'A(0;4)', color: '#dc2626' },
				{ x: 1, y: 2, label: 'I(1;2)', color: '#7c3aed' },
				{ x: 2, y: 0, label: 'B(2;0)', color: '#0f172a' }
			],
			width: 360,
			height: 245
		})
	);

	const exercises: [ExerciseBlock, ExerciseBlock, ExerciseBlock] = [
		{
			id: 'bac_2023_lit_s1_ex1',
			num: 'الأول',
			points: 6,
			instruction: 'نعتبر العددين الطبيعيين $a = 2023$ و $b = 1444$.',
			content: [
				{
					type: 'text',
					content: '1) عيّن باقي القسمة الإقليدية لكلّ من $a$ و $b$ على $5$.',
					answer:
						'1) لدينا $2023 = 5 times 404 + 3$ ومنه $a equiv 3 [5]$، ولدينا $1444 = 5 times 288 + 4$ ومنه $b equiv 4 [5]$ (أو $b equiv -1 [5]$).',
					mark: '1'
				},
				{
					type: 'text',
					content: '2) ادرس، حسب قيم العدد الطبيعي $n$، بواقي القسمة الإقليدية للعدد $3^n$ على $5$.',
					answer:
						'2) نحسب البواقي الأولى: $3^0 equiv 1 [5]$، $3^1 equiv 3 [5]$، $3^2 equiv 4 [5]$، $3^3 equiv 2 [5]$، $3^4 equiv 1 [5]$.\nالقسمة دورية دورها $4$. من أجل كلّ $k in bb(N)$:\n\n- إذا كان $n = 4 k$: $3^(4 k) equiv 1 [5]$.\n\n- إذا كان $n = 4 k + 1$: $3^(4 k + 1) equiv 3 [5]$.\n\n- إذا كان $n = 4 k + 2$: $3^(4 k + 2) equiv 4 [5]$.\n\n- إذا كان $n = 4 k + 3$: $3^(4 k + 3) equiv 2 [5]$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3) أ) استنتج باقي القسمة الإقليدية للعدد $a^(1444) + b^(2023)$ على $5$.\n\nب) تحقّق أنّه من أجل كلّ عدد طبيعي $n$: $a^(4 n + 2) + 4 b^(2 n) equiv 3 [5]$.',
					answer:
						'3) أ) لدينا $1444 = 4 times 361$، إذن $a^(1444) equiv 3^(1444) equiv 1 [5]$.\nولدينا $b equiv -1 [5]$ ومنه $b^(2023) equiv (-1)^(2023) equiv -1 equiv 4 [5]$.\nإذن $a^(1444) + b^(2023) equiv 1 + 4 = 5 equiv 0 [5]$، فالباقي هو $0$.\n\nب) من أجل كلّ $n in bb(N)$: $a^(4 n + 2) equiv 3^(4 n + 2) equiv 4 [5]$ و $b^(2 n) equiv (-1)^(2 n) = 1 [5]$، ومنه $a^(4 n + 2) + 4 b^(2 n) equiv 4 + 4(1) = 8 equiv 3 [5]$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) عيّن قيم العدد الطبيعي $n$ التي يكون من أجلها العدد $A_n = 2023^(4 n + 1) + 1444^n + 3 n$ قابلاً للقسمة على $5$.',
					answer:
						'4) لدينا $2023^(4 n + 1) equiv 3^(4 n + 1) equiv 3 [5]$ و $1444^n equiv (-1)^n [5]$:\n\n- الحالة الأولى ($n = 2 k$ زوجي): $3 + 1 + 3(2 k) equiv 4 + k equiv 0 [5] arrow.l.r.double k equiv 1 [5] arrow.l.r.double k = 5 m + 1$، ومنه $n = 10 m + 2$ ($m in bb(N)$).\n\n- الحالة الثانية ($n = 2 k + 1$ فردي): $3 - 1 + 3(2 k + 1) = 6 k + 5 equiv k equiv 0 [5] arrow.l.r.double k = 5 m$، ومنه $n = 10 m + 1$ ($m in bb(N)$).\n\nإذن قيم $n$ هي $n = 10 m + 1$ أو $n = 10 m + 2$ مع $m in bb(N)$.',
					mark: '2'
				}
			]
		},
		{
			id: 'bac_2023_lit_s1_ex2',
			num: 'الثاني',
			points: 6,
			instruction:
				'$(u_n)$ متتالية حسابية معرّفة على $bb(N)$ بحدّها الأول $u_0$ وأساسها $r$ حيث: $u_1 + u_3 = 20$ و $u_2 - u_0 = 6$.',
			content: [
				{
					type: 'text',
					content: '1) عيّن الأساس $r$ والحدّ الأول $u_0$ للمتتالية $(u_n)$.',
					answer:
						'1) لدينا $u_2 - u_0 = 2 r = 6 arrow.r.double r = 3$.\nوبخاصية الوسط الحسابي $u_1 + u_3 = 2 u_2 = 20 arrow.r.double u_2 = 10$، ومنه $u_0 = u_2 - 2 r = 10 - 6 = 4$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'2) أ) اكتب عبارة الحدّ العام $u_n$ بدلالة $n$.\n\nب) هل العدد $2023$ حدّ من حدود المتتالية $(u_n)$؟ برّر إجابتك.',
					answer:
						'2) أ) من أجل كلّ $n in bb(N)$: $u_n = u_0 + n r = 3 n + 4$.\n\nب) نحلّ المعادلة $3 n + 4 = 2023 arrow.l.r.double 3 n = 2019 arrow.l.r.double n = 673 in bb(N)$؛ نعم، العدد $2023$ حدّ من حدود المتتالية وهو $u_(673)$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3) احسب بدلالة $n$ المجموع $S_n = u_0 + u_1 + dots + u_n$، ثمّ عيّن العدد الطبيعي $n$ بحيث يكون $S_n = 246$.',
					answer:
						'3) $S_n = frac(n + 1, 2)(u_0 + u_n) = frac(n + 1, 2)(3 n + 8)$.\nالمعادلة $S_n = 246$ تكافئ $(n + 1)(3 n + 8) = 492 arrow.l.r.double 3 n^2 + 11 n - 484 = 0$.\nالمميّز $Delta = 121 + 5808 = 5929 = 77^2$، والحلّ الطبيعي هو $n = frac(-11 + 77, 6) = 11$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) نعتبر المتتالية $(v_n)$ المعرّفة على $bb(N)$ بـ: $v_n = 2^(u_n)$.\n\nأثبت أنّ $(v_n)$ متتالية هندسية يُطلب تعيين أساسها وحدّها الأول، ثمّ احسب بدلالة $n$ المجموع $T_n = v_0 + v_1 + dots + v_n$.',
					answer:
						'4) من أجل كلّ $n in bb(N)$: $frac(v_(n+1), v_n) = frac(2^(u_(n+1)), 2^(u_n)) = 2^(u_(n+1) - u_n) = 2^3 = 8$.\nفالمتتالية $(v_n)$ هندسية أساسها $q = 8$ وحدّها الأول $v_0 = 2^4 = 16$.\nالمجموع: $T_n = 16 frac(8^(n+1) - 1, 8 - 1) = frac(16, 7)(8^(n+1) - 1)$.',
					mark: '1.5'
				}
			]
		},
		{
			id: 'bac_2023_lit_s1_ex3',
			num: 'الثالث',
			points: 8,
			instruction:
				'نعتبر الدالة $f$ المعرّفة على $bb(R)$ بـ: $f(x) = x^3 - 3 x^2 + 4$، و $(C_f)$ تمثيلها البياني في المعلم المتعامد والمتجانس $(O ; arrow(i), arrow(j))$.',
			content: [
				{
					type: 'text',
					content: '1) احسب $lim_(x arrow.r -oo) f(x)$ و $lim_(x arrow.r +oo) f(x)$.',
					answer:
						'1) $lim_(x arrow.r -oo) f(x) = lim_(x arrow.r -oo) x^3 = -oo$، و $lim_(x arrow.r +oo) f(x) = lim_(x arrow.r +oo) x^3 = +oo$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'2) احسب الدالة المشتقة $f\'(x)$، ثمّ ادرس إشارتها واستنتج اتجاه تغيّر الدالة $f$ وشكّل جدول تغيّراتها.',
					answer: `2) من أجل كلّ $x in bb(R)$: $f'(x) = 3 x^2 - 6 x = 3 x (x - 2)$.
تنعدم $f'(x)$ عند $0$ و $2$: فالدالة $f$ متزايدة تماماً على كلّ من $]-oo ; 0]$ و $[2 ; +oo[$، ومتناقصة تماماً على $[0 ; 2]$، مع $f(0) = 4$ و $f(2) = 0$.

#align(center)[#image("${typstSvgPath(ex3VarUrl)}", width: 58%)]`,
					mark: '2'
				},
				{
					type: 'text',
					content:
						'3) أ) بيّن أنّ النقطة $I(1 ; 2)$ هي نقطة انعطاف للمنحني $(C_f)$ ومركز تناظر له.\n\nب) اكتب معادلة المماس $(T)$ للمنحني $(C_f)$ عند النقطة $I$.',
					answer:
						'3) أ) $f\'\'(x) = 6 x - 6 = 6(x - 1)$ تنعدم وتغيّر إشارتها عند $x = 1$، ومع $f(1) = 2$ فإنّ $I(1 ; 2)$ نقطة انعطاف.\nمركز التناظر: من أجل كلّ $x in bb(R)$ لدينا $2 - x in bb(R)$ و:\n$f(2 - x) + f(x) = (2 - x)^3 - 3(2 - x)^2 + 4 + x^3 - 3 x^2 + 4 = 4 = 2(2)$، إذن $I(1 ; 2)$ مركز تناظر لـ $(C_f)$.\n\nب) $f\'(1) = 3 - 6 = -3$، ومنه معادلة المماس $(T)$: $y = -3(x - 1) + 2 = -3 x + 5$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) تحقّق أنّه من أجل كلّ $x in bb(R)$: $f(x) = (x + 1)(x - 2)^2$، ثمّ عيّن نقط تقاطع $(C_f)$ مع محوري الإحداثيات.',
					answer:
						'4) بالنشر: $(x + 1)(x^2 - 4 x + 4) = x^3 - 3 x^2 + 4 = f(x)$.\nمع محور الفواصل ($f(x) = 0$): النقطتان $(-1 ; 0)$ و $(2 ; 0)$.\nمع محور التراتيب ($x = 0$): النقطة $A(0 ; 4)$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'5) ارسم المماس $(T)$ والمنحني $(C_f)$، ثمّ ناقش بيانياً حسب قيم الوسيط الحقيقي $m$ عدد حلول المعادلة $f(x) = m$.',
					answer: `5) التمثيل البياني للمماس $(T)$ والمنحني $(C_f)$:

#align(center)[#image("${typstSvgPath(ex3CfUrl)}", width: 58%)]

المناقشة البيانية الأفقية (تقاطع $(C_f)$ مع المستقيم $y = m$):

- لمّا $m < 0$ أو $m > 4$: للمعادلة حلّ وحيد.

- لمّا $m = 0$ أو $m = 4$: للمعادلة حلّان متمايزان.

- لمّا $0 < m < 4$: للمعادلة ثلاث حلول متمايزة.`,
					mark: '2.5'
				}
			]
		}
	];

	return buildLitPaperSpec({
		year: '2023',
		topicNumber: 1,
		themesAr: [
			'القسمة الإقليدية والموافقات بترديد 5',
			'المتتاليات الحسابية والهندسية',
			'دراسة دالة كثير حدود من الدرجة 3 والمناقشة البيانية'
		],
		exercises
	});
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. دورة جوان 2023 — الشّعب الأدبية واللغات — الموضوع الثاني
// ت1 (6ن): الموافقات بترديد 9    | ت2 (6ن): المتتالية الهندسية
// ت3 (8ن): الدالة التناظرية (الكسرية)
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2023LitS2(): OfficialBacLitMathPaperSpec {
	const ex3CfUrl = saveSvgAsset(
		'bac_ext_2023_lit_s2_ex3_cf',
		svgFunctionCurvePlot({
			xMin: -3.2,
			xMax: 5.2,
			yMin: -2.2,
			yMax: 6.2,
			fn: (x) => (Math.abs(x - 1) < 0.08 ? Number.NaN : (2 * x - 1) / (x - 1)),
			curveLabel: '(Cf)',
			asymptotes: [
				{ kind: 'vertical', value: 1, label: 'x = 1', color: '#dc2626' },
				{ kind: 'horizontal', value: 2, label: 'y = 2', color: '#059669' }
			],
			tangents: [{ x: 2, y: 3, slope: -1, halfSpan: 1.4, color: '#7c3aed' }],
			points: [
				{ x: 0, y: 1, label: '(0;1)', color: '#0f172a' },
				{ x: 0.5, y: 0, label: '(0.5;0)', color: '#15803d' },
				{ x: 2, y: 3, label: 'A(2;3)', color: '#7c3aed' },
				{ x: 1, y: 2, label: 'Ω(1;2)', color: '#dc2626' }
			],
			width: 360,
			height: 245
		})
	);

	const exercises: [ExerciseBlock, ExerciseBlock, ExerciseBlock] = [
		{
			id: 'bac_2023_lit_s2_ex1',
			num: 'الأول',
			points: 6,
			instruction: 'نعتبر العددين الطبيعيين $a = 2023$ و $b = 1444$.',
			content: [
				{
					type: 'text',
					content:
						'1) عيّن باقي القسمة الإقليدية لكلّ من $a$ و $b$ على $9$، ثمّ استنتج باقي قسمة $a times b$ على $9$.',
					answer:
						'1) مجموع أرقام $2023$ هو $7$ ومنه $a equiv 7 [9]$، ومجموع أرقام $1444$ هو $13 equiv 4 [9]$ ومنه $b equiv 4 [9]$.\nومنه $a times b equiv 7 times 4 = 28 equiv 1 [9]$.',
					mark: '1'
				},
				{
					type: 'text',
					content: '2) ادرس، حسب قيم العدد الطبيعي $n$، بواقي القسمة الإقليدية للعدد $7^n$ على $9$.',
					answer:
						'2) لدينا $7^0 equiv 1 [9]$، $7^1 equiv 7 [9]$، $7^2 = 49 equiv 4 [9]$، و $7^3 = 343 equiv 1 [9]$ (الدور $3$).\nمن أجل كلّ $k in bb(N)$: $7^(3 k) equiv 1 [9]$، $7^(3 k + 1) equiv 7 [9]$، و $7^(3 k + 2) equiv 4 [9]$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3) استنتج باقي القسمة الإقليدية للعدد $2023^(1444) + 1444^(2023)$ على $9$ (لاحظ أنّ $4 equiv 7^2 [9]$).',
					answer:
						'3) لدينا $1444 = 3 times 481 + 1$، إذن $2023^(1444) equiv 7^(3 times 481 + 1) equiv 7 [9]$.\nولدينا $1444 equiv 4 equiv 7^2 [9]$، ومنه $1444^(2023) equiv 7^(4046) = 7^(3 times 1348 + 2) equiv 4 [9]$.\nإذن $2023^(1444) + 1444^(2023) equiv 7 + 4 = 11 equiv 2 [9]$، فالباقي هو $2$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) عيّن كلّ الأعداد الطبيعية $n$ التي تحقّق: $2023^n + 1444^n + 3 n + 4 equiv 0 [9]$.',
					answer:
						'4) الموافقة تكافئ $7^n + 4^n + 3 n + 4 equiv 0 [9]$، ونعلم أنّ $4^n equiv 7^(2 n) [9]$:\n\n- من أجل $n = 3 k$: $1 + 1 + 9 k + 4 equiv 6 != 0 [9]$ (لا يوجد حلّ).\n\n- من أجل $n = 3 k + 1$: $7 + 4 + 3(3 k + 1) + 4 = 18 + 9 k equiv 0 [9]$ (محقّقة دوماً!).\n\n- من أجل $n = 3 k + 2$: $4 + 7 + 3(3 k + 2) + 4 = 21 + 9 k equiv 3 != 0 [9]$ (لا يوجد حلّ).\n\nإذن القيم المطلوبة هي $n = 3 k + 1$ مع $k in bb(N)$.',
					mark: '2'
				}
			]
		},
		{
			id: 'bac_2023_lit_s2_ex2',
			num: 'الثاني',
			points: 6,
			instruction:
				'$(v_n)$ متتالية هندسية حدودها موجبة تماماً، حدّها الأول $v_0$ وأساسها $q$، حيث: $v_1 times v_3 = 324$ و $v_0 + v_1 = 8$.',
			content: [
				{
					type: 'text',
					content: '1) احسب الحدّ $v_2$، ثمّ عيّن الأساس $q$ والحدّ الأول $v_0$.',
					answer:
						'1) بخاصية الوسط الهندسي $v_1 times v_3 = v_2^2 = 324$، وبما أنّ $v_2 > 0$ فإنّ $v_2 = sqrt(324) = 18$.\nلدينا $v_0(1 + q) = 8$ و $v_0 q^2 = 18$؛ بالقسمة نجد $frac(1 + q, q^2) = frac(4, 9) arrow.l.r.double 4 q^2 - 9 q - 9 = 0$.\nالمميّز $Delta = 81 + 144 = 225 = 15^2$، وبما أنّ $q > 0$ نجد $q = frac(9 + 15, 8) = 3$، ومنه $v_0 = frac(18, 9) = 2$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content: '2) اكتب $v_n$ بدلالة $n$، وادرس اتجاه تغيّر المتتالية $(v_n)$.',
					answer:
						'2) من أجل كلّ $n in bb(N)$: $v_n = 2 times 3^n$.\nالرتابة: $v_(n+1) - v_n = 2 times 3^(n+1) - 2 times 3^n = 4 times 3^n > 0$، فالمتتالية $(v_n)$ متزايدة تماماً.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3) احسب بدلالة $n$ المجموع $S_n = v_0 + v_1 + dots + v_n$، ثمّ عيّن $n$ بحيث يكون $S_n = 242$.',
					answer:
						'3) $S_n = 2 frac(3^(n+1) - 1, 3 - 1) = 3^(n+1) - 1$.\nالمعادلة $3^(n+1) - 1 = 242 arrow.l.r.double 3^(n+1) = 243 = 3^5 arrow.l.r.double n + 1 = 5 arrow.l.r.double n = 4$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) نضع من أجل كلّ $n in bb(N)$: $u_n = v_n + 2 n - 1$. احسب بدلالة $n$ المجموع $T_n = u_0 + u_1 + dots + u_n$.',
					answer:
						'4) نضع $w_n = 2 n - 1$، وهي متتالية حسابية أساسها $2$ وحدّها الأول $w_0 = -1$.\nمجموعها $sum_(k=0)^n w_k = frac(n + 1, 2)(-1 + 2 n - 1) = (n + 1)(n - 1) = n^2 - 1$.\nإذن $T_n = S_n + (n^2 - 1) = 3^(n+1) + n^2 - 2$.',
					mark: '1.5'
				}
			]
		},
		{
			id: 'bac_2023_lit_s2_ex3',
			num: 'الثالث',
			points: 8,
			instruction:
				'نعتبر الدالة التناظرية $f$ المعرّفة على $D_f = bb(R) - \{1\}$ بـ: $f(x) = frac(2 x - 1, x - 1)$، و $(C_f)$ تمثيلها البياني في المعلم المتعامد والمتجانس $(O ; arrow(i), arrow(j))$.',
			content: [
				{
					type: 'text',
					content:
						'1) احسب نهايات الدالة $f$ عند أطراف مجموعة تعريفها، ثمّ فسّر النتائج هندسياً.',
					answer:
						'1) النهايات عند $-oo$ و $+oo$:\n$lim_(x arrow.r -oo) f(x) = lim_(x arrow.r +oo) f(x) = lim_(x arrow.r +oo) frac(2 x, x) = 2$، فالمستقيم ذو المعادلة $y = 2$ مقارب أفقي لـ $(C_f)$ بجوار $-oo$ و $+oo$.\nعند $1$: $lim_(x arrow.r 1^-) f(x) = -oo$ و $lim_(x arrow.r 1^+) f(x) = +oo$، فالمستقيم ذو المعادلة $x = 1$ مقارب عمودي لـ $(C_f)$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'2) تحقّق أنّه من أجل كلّ $x != 1$: $f(x) = 2 + frac(1, x - 1)$، ثمّ أثبت أنّ النقطة $Omega (1 ; 2)$ مركز تناظر للمنحني $(C_f)$.',
					answer:
						'2) $2 + frac(1, x - 1) = frac(2 x - 2 + 1, x - 1) = frac(2 x - 1, x - 1) = f(x)$.\nمركز التناظر: من أجل كلّ $x in D_f$ لدينا $2 - x in D_f$ و:\n$f(2 - x) + f(x) = 2 + frac(1, 1 - x) + 2 + frac(1, x - 1) = 4 = 2(2)$، إذن $Omega (1 ; 2)$ مركز تناظر لـ $(C_f)$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'3) احسب الدالة المشتقة $f\'(x)$، ثمّ استنتج اتجاه تغيّر الدالة $f$ وشكّل جدول تغيّراتها.',
					answer: `3) من أجل كلّ $x in D_f$: $f'(x) = frac(2(x - 1) - (2 x - 1), (x - 1)^2) = frac(-1, (x - 1)^2) < 0$.
فالدالة $f$ متناقصة تماماً على كلّ من المجالين $]-oo ; 1[$ و $]1 ; +oo[$.

#align(center)[#[#set text(dir: ltr); #table(columns: 4, align: center + horizon, inset: 5pt, [$x$], [$-oo$], [$1$], [$+oo$], [$f'(x)$], [$-$], [$||$], [$-$], [$f(x)$], [$2 arrow.b -oo$], [$||$], [$+oo arrow.b 2$])]]`,
					mark: '2'
				},
				{
					type: 'text',
					content:
						'4) عيّن نقط تقاطع $(C_f)$ مع محوري الإحداثيات، واكتب معادلة المماس $(T)$ للمنحني $(C_f)$ عند النقطة $A$ ذات الفاصلة $2$.',
					answer:
						'4) التقاطع مع المحورين: مع محور الفواصل في $(frac(1, 2) ; 0)$، ومع محور التراتيب في $(0 ; 1)$.\nالمماس $(T)$ عند $A(2 ; 3)$: لدينا $f\'(2) = -1$، ومنه $(T) : y = -(x - 2) + 3 = -x + 5$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'5) ارسم المقاربين والمماس $(T)$ والمنحني $(C_f)$، ثمّ حلّ بيانياً المتراجحة $f(x) >= 3$.',
					answer: `5) التمثيل البياني للمقاربين والمماس $(T)$ والمنحني $(C_f)$:

#align(center)[#image("${typstSvgPath(ex3CfUrl)}", width: 58%)]

حلول المتراجحة $f(x) >= 3$ بيانياً هي فواصل نقط $(C_f)$ الواقعة فوق أو على المستقيم $y = 3$: $S = ]1 ; 2]$.`,
					mark: '2'
				}
			]
		}
	];

	return buildLitPaperSpec({
		year: '2023',
		topicNumber: 2,
		themesAr: [
			'الموافقات بترديد 9 وتطبيقاتها',
			'المتتالية الهندسية ومجموعها',
			'دراسة الدالة التناظرية ومركز التناظر'
		],
		exercises
	});
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. دورة جوان 2024 — الشّعب الأدبية واللغات — الموضوع الأول
// ت1 (6ن): الموافقات بترديد 7    | ت2 (6ن): المتتالية التراجعية
// ت3 (8ن): القراءة البيانية لـ (Cf) ودراسة دالة تكعيبية
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2024LitS1(): OfficialBacLitMathPaperSpec {
	const ex2CobwebUrl = saveSvgAsset(
		'bac_ext_2024_lit_s1_ex2_cobweb',
		svgCobwebSequencePlot({
			xMin: 2,
			xMax: 13,
			yMin: 2,
			yMax: 13,
			fn: (x) => 2 * x - 3,
			u0: 5,
			steps: 2
		})
	);

	const ex3CfSubjUrl = saveSvgAsset(
		'bac_ext_2024_lit_s1_ex3_cf_subj',
		svgFunctionCurvePlot({
			xMin: -2.2,
			xMax: 3.4,
			yMin: -5.5,
			yMax: 1.5,
			fn: (x) => -x * x * x + 3 * x * x - 4,
			curveLabel: '(Cf)',
			points: [
				{ x: -1, y: 0, label: '', color: '#0f172a' },
				{ x: 0, y: -4, label: '', color: '#dc2626' },
				{ x: 2, y: 0, label: '', color: '#dc2626' }
			],
			width: 315,
			height: 225
		})
	);

	const ex3VarSolUrl = saveSvgAsset(
		'bac_ext_2024_lit_s1_ex3_var',
		svgVariationTable({
			xValues: ['-∞', '0', '2', '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '-' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '+' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '-' }
			],
			variations: [
				{ value: '+∞', position: 'top' },
				{ value: '-4', position: 'bottom' },
				{ value: '0', position: 'top' },
				{ value: '-∞', position: 'bottom' }
			],
			fnName: 'f(x)',
			derivName: "f'(x)"
		})
	);

	const ex3CfSolUrl = saveSvgAsset(
		'bac_ext_2024_lit_s1_ex3_cf_sol',
		svgFunctionCurvePlot({
			xMin: -2.0,
			xMax: 3.2,
			yMin: -5.5,
			yMax: 1.5,
			fn: (x) => -x * x * x + 3 * x * x - 4,
			curveLabel: '(Cf)',
			tangents: [{ x: 1, y: -2, slope: 3, halfSpan: 1.0, color: '#059669' }],
			points: [
				{ x: -1, y: 0, label: '(-1;0)', color: '#15803d' },
				{ x: 0, y: -4, label: 'A(0;-4)', color: '#dc2626' },
				{ x: 1, y: -2, label: 'I(1;-2)', color: '#7c3aed' },
				{ x: 2, y: 0, label: 'B(2;0)', color: '#0f172a' }
			],
			width: 360,
			height: 245
		})
	);

	const exercises: [ExerciseBlock, ExerciseBlock, ExerciseBlock] = [
		{
			id: 'bac_2024_lit_s1_ex1',
			num: 'الأول',
			points: 6,
			instruction: 'نعتبر العددين الطبيعيين $a = 2024$ و $b = 1962$.',
			content: [
				{
					type: 'text',
					content: '1) عيّن باقي القسمة الإقليدية لكلّ من $a$ و $b$ على $7$.',
					answer:
						'1) $2024 = 7 times 289 + 1$ ومنه $a equiv 1 [7]$، و $1962 = 7 times 280 + 2$ ومنه $b equiv 2 [7]$.',
					mark: '1'
				},
				{
					type: 'text',
					content: '2) ادرس، حسب قيم العدد الطبيعي $n$، بواقي القسمة الإقليدية للعدد $2^n$ على $7$.',
					answer:
						'2) لدينا $2^0 equiv 1 [7]$، $2^1 equiv 2 [7]$، $2^2 equiv 4 [7]$، $2^3 equiv 1 [7]$ (الدور $3$).\nمن أجل كلّ $k in bb(N)$: $2^(3 k) equiv 1 [7]$، $2^(3 k + 1) equiv 2 [7]$، و $2^(3 k + 2) equiv 4 [7]$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3) أ) استنتج باقي القسمة الإقليدية للعدد $1962^(2024) + 2024^(1962) + 4$ على $7$.\n\nب) بيّن أنّه من أجل كلّ $n in bb(N)$: $1962^(3 n + 1) + 2024^n + 4 equiv 0 [7]$.',
					answer:
						'3) أ) $2024 = 3 times 674 + 2$، إذن $1962^(2024) equiv 2^2 = 4 [7]$، و $2024^(1962) equiv 1^(1962) = 1 [7]$.\nومنه $1962^(2024) + 2024^(1962) + 4 equiv 4 + 1 + 4 = 9 equiv 2 [7]$، فالباقي هو $2$.\n\nب) من أجل كلّ $n in bb(N)$: $1962^(3 n + 1) equiv 2^(3 n + 1) equiv 2 [7]$ و $2024^n equiv 1^n = 1 [7]$، إذن $2 + 1 + 4 = 7 equiv 0 [7]$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) عيّن قيم العدد الطبيعي $n$ التي يحقّق من أجلها: $1962^(3 n) + 2 n + 2024 equiv 0 [7]$.',
					answer:
						'4) لدينا $1962^(3 n) equiv 2^(3 n) equiv 1 [7]$ و $2024 equiv 1 [7]$، فتصبح الموافقة $2 n + 2 equiv 0 [7]$ أي $2(n + 1) equiv 0 [7]$.\nبما أنّ $"PGCD"(2 ; 7) = 1$ فإنّ $n + 1 equiv 0 [7]$، أي $n equiv 6 [7]$، ومنه $n = 7 k + 6$ مع $k in bb(N)$.',
					mark: '2'
				}
			]
		},
		{
			id: 'bac_2024_lit_s1_ex2',
			num: 'الثاني',
			points: 6,
			instruction:
				'$(u_n)$ متتالية عددية معرّفة على $bb(N)$ بـ: $u_0 = 5$ ومن أجل كلّ $n in bb(N)$: $u_(n+1) = 2 u_n - 3$.',
			content: [
				{
					type: 'text',
					content:
						'1) احسب الحدود $u_1$، $u_2$ و $u_3$، ثمّ برهن بالتراجع أنّه من أجل كلّ $n in bb(N)$: $u_n > 3$.',
					answer: `1) $u_1 = 2(5) - 3 = 7$، $u_2 = 2(7) - 3 = 11$، $u_3 = 2(11) - 3 = 19$.
البرهان بالتراجع للخاصية $u_n > 3$:

- من أجل $n = 0$: $u_0 = 5 > 3$ محقّقة.

- نفرض $u_n > 3$: بضرب الطرفين في $2$ ثمّ طرح $3$ نجد $2 u_n - 3 > 6 - 3 = 3$، أي $u_(n+1) > 3$.

#align(center)[#image("${typstSvgPath(ex2CobwebUrl)}", width: 52%)]`,
					mark: '1'
				},
				{
					type: 'text',
					content: '2) ادرس اتجاه تغيّر المتتالية $(u_n)$.',
					answer:
						'2) من أجل كلّ $n in bb(N)$: $u_(n+1) - u_n = (2 u_n - 3) - u_n = u_n - 3 > 0$ (لأنّ $u_n > 3$).\nإذن المتتالية $(u_n)$ متزايدة تماماً على $bb(N)$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'3) نضع من أجل كلّ $n in bb(N)$: $v_n = u_n - 3$.\n\nأ) أثبت أنّ $(v_n)$ متتالية هندسية أساسها $q = 2$ وحدّها الأول $v_0 = 2$.\n\nب) اكتب $v_n$ ثمّ $u_n$ بدلالة $n$، وعيّن العدد الطبيعي $n$ بحيث $u_n = 515$.',
					answer:
						'3) أ) $v_(n+1) = u_(n+1) - 3 = 2 u_n - 6 = 2(u_n - 3) = 2 v_n$، و $v_0 = u_0 - 3 = 2$.\n\nب) $v_n = 2 times 2^n = 2^(n+1)$، ومنه $u_n = 2^(n+1) + 3$.\nالمعادلة $u_n = 515$ تكافئ $2^(n+1) = 512 = 2^9 arrow.l.r.double n + 1 = 9 arrow.l.r.double n = 8$.',
					mark: '2'
				},
				{
					type: 'text',
					content: '4) احسب بدلالة $n$ المجموع: $S_n = u_0 + u_1 + dots + u_n$.',
					answer:
						'4) $S_n = sum_(k=0)^n (v_k + 3) = 2 frac(2^(n+1) - 1, 2 - 1) + 3(n + 1) = 2^(n+2) - 2 + 3 n + 3 = 2^(n+2) + 3 n + 1$.',
					mark: '2'
				}
			]
		},
		{
			id: 'bac_2024_lit_s1_ex3',
			num: 'الثالث',
			points: 8,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content:
								'*I)* $(C_f)$ التمثيل البياني المقابل للدّالة $f$ المعرّفة والقابلة للاشتقاق على $bb(R)$.\n\nبقراءة بيانية، عيّن كلاًّ من: $f(0)$، $f(2)$، $f\'(0)$، $f\'(2)$، ثمّ حدّد إشارة $f(x)$ على $bb(R)$.',
							answer:
								'*I)* بقراءة بيانية: $f(0) = -4$، $f(2) = 0$، وبما أنّ عند $x = 0$ و $x = 2$ قيمتين حديتين محليتين فإنّ $f\'(0) = 0$ و $f\'(2) = 0$.\nإشارة $f(x)$: موجبة تماماً على $]-oo ; -1[$، معدومة عند $-1$ و $2$، وسالبة تماماً على $]-1 ; 2[ union ]2 ; +oo[$.',
							mark: '2'
						},
						{
							type: 'image',
							src: ex3CfSubjUrl,
							caption: 'المنحني البياني $(C_f)$ في الجزء الأول'
						}
					]
				},
				{
					type: 'text',
					content:
						'*II)* نضع الآن من أجل كلّ $x in bb(R)$: $f(x) = -x^3 + 3 x^2 - 4$.\n\n1) احسب $lim_(x arrow.r -oo) f(x)$ و $lim_(x arrow.r +oo) f(x)$.',
					answer:
						'*II)* 1) $lim_(x arrow.r -oo) f(x) = lim_(x arrow.r -oo) (-x^3) = +oo$، و $lim_(x arrow.r +oo) f(x) = lim_(x arrow.r +oo) (-x^3) = -oo$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'2) احسب $f\'(x)$، وادرس اتجاه تغيّر الدالة $f$ ثمّ شكّل جدول تغيّراتها.',
					answer: `2) $f'(x) = -3 x^2 + 6 x = -3 x (x - 2)$.
تنعدم $f'(x)$ عند $0$ و $2$: فالدالة $f$ متناقصة تماماً على $]-oo ; 0]$ و $[2 ; +oo[$، ومتزايدة تماماً على $[0 ; 2]$.

#align(center)[#image("${typstSvgPath(ex3VarSolUrl)}", width: 58%)]`,
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3) أثبت أنّ النقطة $I(1 ; -2)$ نقطة انعطاف ومركز تناظر للمنحني $(C_f)$، ثمّ اكتب معادلة المماس $(T)$ عند $I$.',
					answer:
						'3) $f\'\'(x) = -6 x + 6 = -6(x - 1)$ تنعدم وتغيّر إشارتها عند $x = 1$، ومع $f(1) = -2$ فإنّ $I(1 ; -2)$ نقطة انعطاف.\nالتناظر: $f(2 - x) + f(x) = -(2 - x)^3 + 3(2 - x)^2 - 4 - x^3 + 3 x^2 - 4 = -4 = 2(-2)$.\nمعادلة $(T)$: $f\'(1) = 3$ ومنه $y = 3(x - 1) - 2 = 3 x - 5$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) تحقّق أنّ $f(x) = -(x + 1)(x - 2)^2$، وحلّ المتراجحة $f(x) >= 0$، ثمّ ارسم $(T)$ و $(C_f)$ وناقش بيانياً حسب قيم $m$ عدد حلول المعادلة $f(x) = m$.',
					answer: `4) $-(x + 1)(x^2 - 4 x + 4) = -x^3 + 3 x^2 - 4 = f(x)$.
حلول $f(x) >= 0$ هي $S = ]-oo ; -1] union \{2\}$.

#align(center)[#image("${typstSvgPath(ex3CfSolUrl)}", width: 58%)]

المناقشة البيانية الأفقية للمعادلة $f(x) = m$:

- لمّا $m < -4$ أو $m > 0$: حلّ وحيد.

- لمّا $m = -4$ أو $m = 0$: حلّان متمايزان.

- لمّا $-4 < m < 0$: ثلاث حلول متمايزة.`,
					mark: '2'
				}
			]
		}
	];

	return buildLitPaperSpec({
		year: '2024',
		topicNumber: 1,
		themesAr: [
			'الموافقات بترديد 7',
			'المتتاليات التراجعية والتخمين البياني',
			'القراءة البيانية ودراسة دالة كثير حدود من الدرجة 3'
		],
		exercises
	});
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4. دورة جوان 2024 — الشّعب الأدبية واللغات — الموضوع الثاني
// ت1 (6ن): الموافقات بترديد 7    | ت2 (6ن): المتتاليات الحسابية والهندسية
// ت3 (8ن): الدالة التناظرية (الكسرية)
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2024LitS2(): OfficialBacLitMathPaperSpec {
	const ex3CfUrl = saveSvgAsset(
		'bac_ext_2024_lit_s2_ex3_cf',
		svgFunctionCurvePlot({
			xMin: -4.2,
			xMax: 3.2,
			yMin: -3.2,
			yMax: 5.2,
			fn: (x) => (Math.abs(x + 1) < 0.08 ? Number.NaN : (x + 3) / (x + 1)),
			curveLabel: '(Cf)',
			asymptotes: [
				{ kind: 'vertical', value: -1, label: 'x = -1', color: '#dc2626' },
				{ kind: 'horizontal', value: 1, label: 'y = 1', color: '#059669' }
			],
			tangents: [{ x: 1, y: 2, slope: -0.5, halfSpan: 1.6, color: '#7c3aed' }],
			points: [
				{ x: -3, y: 0, label: '(-3;0)', color: '#15803d' },
				{ x: 0, y: 3, label: '(0;3)', color: '#0f172a' },
				{ x: 1, y: 2, label: 'A(1;2)', color: '#7c3aed' },
				{ x: -1, y: 1, label: 'Ω(-1;1)', color: '#dc2626' }
			],
			width: 360,
			height: 245
		})
	);

	const exercises: [ExerciseBlock, ExerciseBlock, ExerciseBlock] = [
		{
			id: 'bac_2024_lit_s2_ex1',
			num: 'الأول',
			points: 6,
			instruction: 'نعتبر العددين الطبيعيين $a = 2024$ و $b = 1445$.',
			content: [
				{
					type: 'text',
					content: '1) عيّن باقي القسمة الإقليدية لكلّ من $a$ و $b$ على $7$.',
					answer:
						'1) $2024 = 7 times 289 + 1$ ومنه $a equiv 1 [7]$، و $1445 = 7 times 206 + 3$ ومنه $b equiv 3 [7]$.',
					mark: '1'
				},
				{
					type: 'text',
					content: '2) ادرس، حسب قيم العدد الطبيعي $n$، بواقي القسمة الإقليدية للعدد $3^n$ على $7$.',
					answer:
						'2) لدينا $3^0 equiv 1 [7]$، $3^1 equiv 3 [7]$، $3^2 equiv 2 [7]$، $3^3 equiv 6 [7]$، $3^4 equiv 4 [7]$، $3^5 equiv 5 [7]$، و $3^6 equiv 1 [7]$ (الدور $6$).\nمن أجل كلّ $k in bb(N)$: البواقي على الترتيب من أجل $n = 6 k + r$ ($r in \{0, 1, 2, 3, 4, 5\}$) هي $1, 3, 2, 6, 4, 5$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3) أ) استنتج باقي قسمة $1445^(2024) + 2024^(1445) + 3$ على $7$.\n\nب) بيّن أنّه من أجل كلّ $n in bb(N)$: $1445^(6 n + 4) + 2024^n + 2 equiv 0 [7]$.',
					answer:
						'3) أ) $2024 = 6 times 337 + 2$، إذن $1445^(2024) equiv 3^2 = 2 [7]$، و $2024^(1445) equiv 1^(1445) = 1 [7]$.\nومنه $1445^(2024) + 2024^(1445) + 3 equiv 2 + 1 + 3 = 6 [7]$.\n\nب) $1445^(6 n + 4) equiv 3^(6 n + 4) equiv 4 [7]$ و $2024^n equiv 1 [7]$، ومنه $4 + 1 + 2 = 7 equiv 0 [7]$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) عيّن قيم العدد الطبيعي $n$ التي يكون من أجلها: $1445^(6 n + 3) + 3 n + 2024 equiv 0 [7]$.',
					answer:
						'4) لدينا $1445^(6 n + 3) equiv 3^(6 n + 3) equiv 6 equiv -1 [7]$ و $2024 equiv 1 [7]$.\nتصبح الموافقة $-1 + 3 n + 1 equiv 0 [7]$ أي $3 n equiv 0 [7]$؛ وبما أنّ $"PGCD"(3 ; 7) = 1$ فإنّ $n equiv 0 [7]$، أي $n = 7 k$ مع $k in bb(N)$.',
					mark: '2'
				}
			]
		},
		{
			id: 'bac_2024_lit_s2_ex2',
			num: 'الثاني',
			points: 6,
			instruction:
				'$(u_n)$ متتالية حسابية معرّفة على $bb(N)$، حدّها الأول $u_0$ وأساسها $r$، حيث: $u_3 + u_5 + u_7 = 36$ و $u_1 = 4$.',
			content: [
				{
					type: 'text',
					content: '1) احسب $u_5$، ثمّ استنتج الأساس $r$ والحدّ الأول $u_0$.',
					answer:
						'1) بخاصية الوسط الحسابي $u_3 + u_7 = 2 u_5$، ومنه $3 u_5 = 36 arrow.r.double u_5 = 12$.\nلدينا $u_5 - u_1 = 4 r = 12 - 4 = 8 arrow.r.double r = 2$، و $u_0 = u_1 - r = 4 - 2 = 2$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content: '2) اكتب $u_n$ بدلالة $n$، ثمّ احسب بدلالة $n$ المجموع $S_n = u_0 + u_1 + dots + u_n$.',
					answer:
						'2) من أجل كلّ $n in bb(N)$: $u_n = u_0 + n r = 2 n + 2$.\nالمجموع: $S_n = frac(n + 1, 2)(2 + 2 n + 2) = (n + 1)(n + 2)$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content: '3) هل العدد $2024$ حدّ من حدود $(u_n)$؟ وإن كان كذلك، فما رتبته؟',
					answer:
						'3) $2 n + 2 = 2024 arrow.l.r.double 2 n = 2022 arrow.l.r.double n = 1011 in bb(N)$.\nنعم، $2024$ هو الحدّ $u_(1011)$، وبما أنّ الحدّ الأول هو $u_0$ فإنّ رتبته هي $1011 + 1 = 1012$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) نعتبر المتتالية $(v_n)$ المعرّفة على $bb(N)$ بـ: $v_n = 3 (frac(1, 2))^n$.\n\nأثبت أنّ $(v_n)$ هندسية متناقصة تماماً، ثمّ احسب بدلالة $n$ المجموع $T_n = v_0 + v_1 + dots + v_n$.',
					answer:
						'4) $v_(n+1) = frac(1, 2) v_n$ وحدّها الأول $v_0 = 3$؛ وبما أنّ $v_(n+1) - v_n = -frac(3, 2) (frac(1, 2))^n < 0$ فهي متناقصة تماماً.\nالمجموع: $T_n = 3 frac(1 - (frac(1, 2))^(n+1), 1 - frac(1, 2)) = 6 [1 - (frac(1, 2))^(n+1)]$.',
					mark: '1.5'
				}
			]
		},
		{
			id: 'bac_2024_lit_s2_ex3',
			num: 'الثالث',
			points: 8,
			instruction:
				'نعتبر الدالة $f$ المعرّفة على $D_f = bb(R) - \{-1\}$ بـ: $f(x) = frac(x + 3, x + 1)$، و $(C_f)$ تمثيلها البياني في المعلم المتعامد والمتجانس $(O ; arrow(i), arrow(j))$.',
			content: [
				{
					type: 'text',
					content: '1) احسب نهايات الدالة $f$ عند أطراف $D_f$ وفسّر النتائج هندسياً.',
					answer:
						'1) $lim_(x arrow.r -oo) f(x) = lim_(x arrow.r +oo) f(x) = 1$، فالمستقيم $y = 1$ مقارب أفقي لـ $(C_f)$ بجوار $-oo$ و $+oo$.\n$lim_(x arrow.r -1^-) f(x) = -oo$ و $lim_(x arrow.r -1^+) f(x) = +oo$، فالمستقيم $x = -1$ مقارب عمودي لـ $(C_f)$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'2) بيّن أنّه من أجل كلّ $x != -1$: $f(x) = 1 + frac(2, x + 1)$، ثمّ أثبت أنّ النقطة $Omega (-1 ; 1)$ مركز تناظر للمنحني $(C_f)$.',
					answer:
						'2) $1 + frac(2, x + 1) = frac(x + 1 + 2, x + 1) = frac(x + 3, x + 1) = f(x)$.\nمركز التناظر: $f(-2 - x) + f(x) = 1 + frac(2, -1 - x) + 1 + frac(2, x + 1) = 2 = 2(1)$، إذن $Omega (-1 ; 1)$ مركز تناظر لـ $(C_f)$.',
					mark: '1'
				},
				{
					type: 'text',
					content: '3) احسب $f\'(x)$ وادرس اتجاه تغيّر الدالة $f$ ثمّ شكّل جدول تغيّراتها.',
					answer: `3) من أجل كلّ $x in D_f$: $f'(x) = frac(-2, (x + 1)^2) < 0$، فالدالة $f$ متناقصة تماماً على $]-oo ; -1[$ وعلى $]-1 ; +oo[$.

#align(center)[#[#set text(dir: ltr); #table(columns: 4, align: center + horizon, inset: 5pt, [$x$], [$-oo$], [$-1$], [$+oo$], [$f'(x)$], [$-$], [$||$], [$-$], [$f(x)$], [$1 arrow.b -oo$], [$||$], [$+oo arrow.b 1$])]]`,
					mark: '2'
				},
				{
					type: 'text',
					content:
						'4) عيّن نقط تقاطع $(C_f)$ مع محوري الإحداثيات، واكتب معادلة المماس $(T)$ للمنحني $(C_f)$ عند النقطة $A$ ذات الفاصلة $1$.',
					answer:
						'4) التقاطع مع المحورين: مع محور الفواصل في $(-3 ; 0)$، ومع محور التراتيب في $(0 ; 3)$.\nالمماس عند $A(1 ; 2)$: لدينا $f\'(1) = -frac(2, 4) = -frac(1, 2)$، فمعادلة $(T)$ هي: $y = -frac(1, 2)(x - 1) + 2 = -frac(1, 2) x + frac(5, 2)$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'5) ارسم المقاربين والمماس $(T)$ والمنحني $(C_f)$، ثمّ حلّ بيانياً المتراجحة $f(x) <= 2$.',
					answer: `5) التمثيل البياني للمقاربين والمماس $(T)$ والمنحني $(C_f)$:

#align(center)[#image("${typstSvgPath(ex3CfUrl)}", width: 58%)]

حلول المتراجحة $f(x) <= 2$ بيانياً هي فواصل نقط $(C_f)$ الواقعة تحت أو على المستقيم $y = 2$: $S = ]-oo ; -1[ union [1 ; +oo[$.`,
					mark: '2'
				}
			]
		}
	];

	return buildLitPaperSpec({
		year: '2024',
		topicNumber: 2,
		themesAr: [
			'الموافقات بترديد 7 (دور 6)',
			'المتتاليات الحسابية والهندسية',
			'الدالة التناظرية والمماس وحل متراجحة بيانياً'
		],
		exercises
	});
}

// ═══════════════════════════════════════════════════════════════════════════════
// 5. دورة جوان 2025 — الشّعب الأدبية واللغات — الموضوع الأول
// ت1 (6ن): الموافقات بترديد 7    | ت2 (6ن): المتتالية التراجعية (1/3 u_n + 4)
// ت3 (8ن): دالة كثير حدود من الدرجة 3 (x^3 - 3x + 2)
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2025LitS1(): OfficialBacLitMathPaperSpec {
	const ex2CobwebUrl = saveSvgAsset(
		'bac_ext_2025_lit_s1_ex2_cobweb',
		svgCobwebSequencePlot({
			xMin: -0.5,
			xMax: 7,
			yMin: -0.5,
			yMax: 7,
			fn: (x) => x / 3 + 4,
			u0: 0,
			steps: 3,
			fixedPoint: 6
		})
	);

	const ex3VarUrl = saveSvgAsset(
		'bac_ext_2025_lit_s1_ex3_var',
		svgVariationTable({
			xValues: ['-∞', '-1', '1', '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '+' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '-' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '+' }
			],
			variations: [
				{ value: '-∞', position: 'bottom' },
				{ value: '4', position: 'top' },
				{ value: '0', position: 'bottom' },
				{ value: '+∞', position: 'top' }
			],
			fnName: 'f(x)',
			derivName: "f'(x)"
		})
	);

	const ex3CfUrl = saveSvgAsset(
		'bac_ext_2025_lit_s1_ex3_cf',
		svgFunctionCurvePlot({
			xMin: -2.6,
			xMax: 2.6,
			yMin: -2.0,
			yMax: 5.5,
			fn: (x) => x * x * x - 3 * x + 2,
			curveLabel: '(Cf)',
			tangents: [{ x: 0, y: 2, slope: -3, halfSpan: 1.0, color: '#059669' }],
			points: [
				{ x: -2, y: 0, label: '(-2;0)', color: '#15803d' },
				{ x: -1, y: 4, label: '(-1;4)', color: '#dc2626' },
				{ x: 0, y: 2, label: 'I(0;2)', color: '#7c3aed' },
				{ x: 1, y: 0, label: '(1;0)', color: '#0f172a' }
			],
			width: 360,
			height: 245
		})
	);

	const exercises: [ExerciseBlock, ExerciseBlock, ExerciseBlock] = [
		{
			id: 'bac_2025_lit_s1_ex1',
			num: 'الأول',
			points: 6,
			instruction: 'نعتبر العددين الطبيعيين $a = 2025$ و $b = 1446$.',
			content: [
				{
					type: 'text',
					content: '1) عيّن باقي القسمة الإقليدية لكلّ من $a$ و $b$ على $7$.',
					answer:
						'1) $2025 = 7 times 289 + 2$ ومنه $a equiv 2 [7]$، و $1446 = 7 times 206 + 4$ ومنه $b equiv 4 [7]$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'2) ادرس، حسب قيم العدد الطبيعي $n$، بواقي القسمة الإقليدية للعدد $2^n$ على $7$، ثمّ استنتج بواقي $4^n$ على $7$.',
					answer:
						'2) $2^0 equiv 1 [7]$، $2^1 equiv 2 [7]$، $2^2 equiv 4 [7]$، و $2^3 equiv 1 [7]$ (الدور $3$).\nوبما أنّ $4^n = 2^(2 n)$ فإنّ بواقي $4^n$ على $7$ هي:\n\n- من أجل $n = 3 k$: $4^(3 k) equiv 1 [7]$.\n\n- من أجل $n = 3 k + 1$: $4^(3 k + 1) equiv 4 [7]$.\n\n- من أجل $n = 3 k + 2$: $4^(3 k + 2) equiv 2 [7]$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3) بيّن أنّه من أجل كلّ عدد طبيعي $n$: $2025^(3 n) + 1446^(3 n) + 5 equiv 0 [7]$، ثمّ احسب باقي قسمة $2025^(1446) + 1446^(2025)$ على $7$.',
					answer:
						'3) $2025^(3 n) + 1446^(3 n) + 5 equiv 2^(3 n) + 4^(3 n) + 5 equiv 1 + 1 + 5 = 7 equiv 0 [7]$.\nلدينا $1446 = 3 times 482$ و $2025 = 3 times 675$، ومنه $2025^(1446) + 1446^(2025) equiv 1 + 1 = 2 [7]$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) عيّن قيم العدد الطبيعي $n$ التي يحقّق من أجلها: $2025^(3 n + 1) + 1446^(3 n + 2) + 3 n equiv 0 [7]$.',
					answer:
						'4) $2025^(3 n + 1) equiv 2 [7]$ و $1446^(3 n + 2) equiv 4^(3 n + 2) equiv 2 [7]$.\nتصبح الموافقة $2 + 2 + 3 n equiv 0 [7] arrow.l.r.double 3 n + 4 equiv 0 [7] arrow.l.r.double 3 n equiv 3 [7]$.\nبما أنّ $"PGCD"(3 ; 7) = 1$ فإنّ $n equiv 1 [7]$، أي $n = 7 k + 1$ مع $k in bb(N)$.',
					mark: '2'
				}
			]
		},
		{
			id: 'bac_2025_lit_s1_ex2',
			num: 'الثاني',
			points: 6,
			instruction:
				'$(u_n)$ المتتالية العددية المعرّفة على $bb(N)$ بـ: $u_0 = 0$ ومن أجل كلّ $n in bb(N)$: $u_(n+1) = frac(1, 3) u_n + 4$.',
			content: [
				{
					type: 'text',
					content: '1) احسب الحدود $u_1$، $u_2$ و $u_3$، ثمّ مثّلها على محور الفواصل.',
					answer: `1) $u_1 = 4$، $u_2 = frac(4, 3) + 4 = frac(16, 3)$، و $u_3 = frac(16, 9) + 4 = frac(52, 9)$.

#align(center)[#image("${typstSvgPath(ex2CobwebUrl)}", width: 52%)]`,
					mark: '1'
				},
				{
					type: 'text',
					content:
						'2) برهن بالتراجع أنّه من أجل كلّ $n in bb(N)$: $0 <= u_n < 6$، ثمّ بيّن أنّ $(u_n)$ متزايدة تماماً.',
					answer:
						'2) من أجل $n = 0$: $0 <= u_0 = 0 < 6$ محقّقة. نفرض $0 <= u_n < 6$: نجد $0 <= frac(1, 3) u_n < 2 arrow.r.double 4 <= u_(n+1) < 6$، ومنه $0 <= u_(n+1) < 6$.\nالرتابة: $u_(n+1) - u_n = -frac(2, 3) u_n + 4 = frac(2, 3)(6 - u_n) > 0$، فالمتتالية $(u_n)$ متزايدة تماماً.',
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'3) نضع $v_n = u_n - 6$. أثبت أنّ $(v_n)$ هندسية أساسها $frac(1, 3)$ وحدّها الأول $v_0 = -6$، ثمّ اكتب $v_n$ و $u_n$ بدلالة $n$ واحسب $lim_(n arrow.r +oo) u_n$.',
					answer:
						'3) $v_(n+1) = frac(1, 3) u_n - 2 = frac(1, 3)(u_n - 6) = frac(1, 3) v_n$، و $v_0 = -6$.\nومنه $v_n = -6 (frac(1, 3))^n$ و $u_n = 6 - 6 (frac(1, 3))^n$، وبالتالي $lim_(n arrow.r +oo) u_n = 6$.',
					mark: '1.75'
				},
				{
					type: 'text',
					content: '4) احسب بدلالة $n$ المجموع: $S_n = u_0 + u_1 + dots + u_n$.',
					answer:
						'4) $sum_(k=0)^n v_k = -6 frac(1 - (frac(1, 3))^(n+1), 1 - frac(1, 3)) = -9 [1 - (frac(1, 3))^(n+1)] = -9 + 3 (frac(1, 3))^n$.\nإذن $S_n = 6(n + 1) + sum_(k=0)^n v_k = 6 n - 3 + 3 (frac(1, 3))^n$.',
					mark: '2'
				}
			]
		},
		{
			id: 'bac_2025_lit_s1_ex3',
			num: 'الثالث',
			points: 8,
			instruction:
				'نعتبر الدالة $f$ المعرّفة على $bb(R)$ بـ: $f(x) = x^3 - 3 x + 2$، و $(C_f)$ تمثيلها البياني في المعلم المتعامد والمتجانس $(O ; arrow(i), arrow(j))$.',
			content: [
				{
					type: 'text',
					content: '1) احسب $lim_(x arrow.r -oo) f(x)$ و $lim_(x arrow.r +oo) f(x)$.',
					answer:
						'1) $lim_(x arrow.r -oo) f(x) = lim_(x arrow.r -oo) x^3 = -oo$، و $lim_(x arrow.r +oo) f(x) = lim_(x arrow.r +oo) x^3 = +oo$.',
					mark: '1'
				},
				{
					type: 'text',
					content: '2) احسب $f\'(x)$ وادرس إشارتها، ثمّ شكّل جدول تغيّرات الدالة $f$.',
					answer: `2) $f'(x) = 3 x^2 - 3 = 3(x - 1)(x + 1)$، تنعدم عند $-1$ و $1$؛ فـ $f$ متزايدة تماماً على $]-oo ; -1]$ و $[1 ; +oo[$، ومتناقصة تماماً على $[-1 ; 1]$، مع $f(-1) = 4$ و $f(1) = 0$.

#align(center)[#image("${typstSvgPath(ex3VarUrl)}", width: 58%)]`,
					mark: '2'
				},
				{
					type: 'text',
					content:
						'3) أثبت أنّ $I(0 ; 2)$ نقطة انعطاف ومركز تناظر للمنحني $(C_f)$، ثمّ اكتب معادلة المماس $(T)$ للمنحني $(C_f)$ عند $I$.',
					answer:
						'3) $f\'\'(x) = 6 x$ تنعدم وتغيّر إشارتها عند $x = 0$، ومع $f(0) = 2$ فإنّ $I(0 ; 2)$ نقطة انعطاف.\nالتناظر: $f(-x) + f(x) = (-x^3 + 3 x + 2) + (x^3 - 3 x + 2) = 4 = 2(2)$، إذن $I(0 ; 2)$ مركز تناظر لـ $(C_f)$.\nمعادلة $(T)$: $f\'(0) = -3$، ومنه $y = -3 x + 2$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) تحقّق أنّ $f(x) = (x - 1)^2 (x + 2)$ واستنتج نقط تقاطع $(C_f)$ مع محوري الإحداثيات.',
					answer:
						'4) $(x^2 - 2 x + 1)(x + 2) = x^3 - 3 x + 2 = f(x)$.\nنقط التقاطع مع محور الفواصل هي $(-2 ; 0)$ و $(1 ; 0)$، ومع محور التراتيب هي $I(0 ; 2)$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'5) ارسم $(T)$ و $(C_f)$، ثمّ ناقش بيانياً حسب قيم الوسيط الحقيقي $m$ عدد حلول المعادلة $f(x) = m$.',
					answer: `5) التمثيل البياني للمماس $(T)$ والمنحني $(C_f)$:

#align(center)[#image("${typstSvgPath(ex3CfUrl)}", width: 58%)]

المناقشة البيانية الأفقية للمعادلة $f(x) = m$:

- لمّا $m < 0$ أو $m > 4$: حلّ وحيد.

- لمّا $m = 0$ أو $m = 4$: حلّان متمايزان.

- لمّا $0 < m < 4$: ثلاث حلول متمايزة.`,
					mark: '2.5'
				}
			]
		}
	];

	return buildLitPaperSpec({
		year: '2025',
		topicNumber: 1,
		themesAr: [
			'الموافقات بترديد 7',
			'المتتاليات التراجعية والبرهان بالتراجع',
			'دالة كثير حدود من الدرجة 3 ومركز التناظر'
		],
		exercises
	});
}

// ═══════════════════════════════════════════════════════════════════════════════
// 6. دورة جوان 2025 — الشّعب الأدبية واللغات — الموضوع الثاني
// ت1 (6ن): اختيار من متعدد مع التبرير | ت2 (6ن): المتتاليات الحسابية والهندسية
// ت3 (8ن): استنتاج عبارة دالة تكعيبية من جدول تغيّراتها المعطى في الموضوع
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2025LitS2(): OfficialBacLitMathPaperSpec {
	const ex3VarSubjUrl = saveSvgAsset(
		'bac_ext_2025_lit_s2_ex3_var_subj',
		svgVariationTable({
			xValues: ['-∞', '-1', '1', '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '+' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '-' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '+' }
			],
			variations: [
				{ value: '-∞', position: 'bottom' },
				{ value: '6', position: 'top' },
				{ value: '2', position: 'bottom' },
				{ value: '+∞', position: 'top' }
			],
			fnName: 'f(x)',
			derivName: "f'(x)"
		})
	);

	const ex3CfSolUrl = saveSvgAsset(
		'bac_ext_2025_lit_s2_ex3_cf',
		svgFunctionCurvePlot({
			xMin: -2.8,
			xMax: 2.6,
			yMin: -1.5,
			yMax: 7.5,
			fn: (x) => x * x * x - 3 * x + 4,
			curveLabel: '(Cf)',
			tangents: [{ x: 0, y: 4, slope: -3, halfSpan: 1.0, color: '#059669' }],
			points: [
				{ x: -2.196, y: 0, label: 'α', color: '#dc2626' },
				{ x: -1, y: 6, label: '(-1;6)', color: '#dc2626' },
				{ x: 0, y: 4, label: 'I(0;4)', color: '#7c3aed' },
				{ x: 1, y: 2, label: '(1;2)', color: '#0f172a' }
			],
			width: 360,
			height: 245
		})
	);

	const exercises: [ExerciseBlock, ExerciseBlock, ExerciseBlock] = [
		{
			id: 'bac_2025_lit_s2_ex1',
			num: 'الأول',
			points: 6,
			instruction:
				'في كلّ سؤال من الأسئلة الأربعة الآتية، اختر الإجابة الصحيحة الوحيدة من بين الاقتراحات الثلاثة مع التبرير:',
			content: [
				{
					type: 'text',
					content:
						'1) باقي القسمة الإقليدية للعدد $2025^(2025)$ على $7$ يساوي:\n\nأ) $1$ #h(24pt) ب) $2$ #h(24pt) جـ) $4$',
					answer:
						'1) الإجابة الصحيحة هي *أ) $1$*؛ لأنّ $2025 equiv 2 [7]$ و $2025 = 3 times 675$، ومنه $2025^(2025) equiv (2^3)^(675) equiv 1^(675) = 1 [7]$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'2) $(u_n)$ متتالية حسابية حيث $u_2 = 7$ و $u_6 = 19$. أساسها $r$ وحدّها الأول $u_0$ هما على الترتيب:\n\nأ) $r = 3$ و $u_0 = 1$ #h(18pt) ب) $r = 4$ و $u_0 = -1$ #h(18pt) جـ) $r = 3$ و $u_0 = 4$',
					answer:
						'2) الإجابة الصحيحة هي *أ) $r = 3$ و $u_0 = 1$*؛ لأنّ $u_6 - u_2 = 4 r = 12 arrow.r.double r = 3$، و $u_0 = u_2 - 2 r = 7 - 6 = 1$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3) مجموع الحدود العشرة الأولى من المتتالية الهندسية $(v_n)$ ذات الحدّ الأول $v_0 = 2$ والأساس $q = 2$ هو:\n\nأ) $1022$ #h(24pt) ب) $2046$ #h(24pt) جـ) $2048$',
					answer:
						'3) الإجابة الصحيحة هي *ب) $2046$*؛ لأنّ $v_0 + v_1 + dots + v_9 = 2 frac(2^(10) - 1, 2 - 1) = 2(1024 - 1) = 2046$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) معامل توجيه المماس لمنحني الدالة $g(x) = x^3 - 6 x^2 + 9 x - 1$ عند نقطة انعطافه هو:\n\nأ) $-3$ #h(24pt) ب) $0$ #h(24pt) جـ) $3$',
					answer:
						'4) الإجابة الصحيحة هي *أ) $-3$*؛ لأنّ $g\'(x) = 3 x^2 - 12 x + 9$ و $g\'\'(x) = 6 x - 12$ تنعدم عند $x = 2$، ومنه $g\'(2) = 12 - 24 + 9 = -3$.',
					mark: '1.5'
				}
			]
		},
		{
			id: 'bac_2025_lit_s2_ex2',
			num: 'الثاني',
			points: 6,
			instruction:
				'نعتبر المتتالية الحسابية $(u_n)$ المعرّفة على $bb(N)$ بحدّها الأول $u_0 = 5$ وأساسها $r = 4$، والمتتالية الهندسية $(v_n)$ المعرّفة على $bb(N)$ بحدّها الأول $v_0 = 3$ وأساسها $q = 2$.',
			content: [
				{
					type: 'text',
					content:
						'1) اكتب عبارة الحدّ العام $u_n$ بدلالة $n$، ثمّ تحقّق أنّ العدد $2025$ حدّ من حدود $(u_n)$ محدّداً رتبته.',
					answer:
						'1) $u_n = u_0 + n r = 4 n + 5$.\nالمعادلة $4 n + 5 = 2025 arrow.l.r.double 4 n = 2020 arrow.l.r.double n = 505 in bb(N)$.\nإذن $2025 = u_(505)$ ورتبته هي $506$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'2) احسب بدلالة $n$ المجموع $S_n = u_0 + u_1 + dots + u_n$، ثمّ عيّن العدد الطبيعي $n$ بحيث يكون $S_n = 275$.',
					answer:
						'2) $S_n = frac(n + 1, 2)(5 + 4 n + 5) = (n + 1)(2 n + 5) = 2 n^2 + 7 n + 5$.\nالمعادلة $2 n^2 + 7 n + 5 = 275 arrow.l.r.double 2 n^2 + 7 n - 270 = 0$.\nالمميّز $Delta = 49 + 2160 = 2209 = 47^2$، والحلّ الطبيعي هو $n = frac(-7 + 47, 4) = 10$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content: '3) اكتب $v_n$ بدلالة $n$، واحسب بدلالة $n$ المجموع $T_n = v_0 + v_1 + dots + v_n$.',
					answer:
						'3) $v_n = 3 times 2^n$، والمجموع $T_n = 3 frac(2^(n+1) - 1, 2 - 1) = 3(2^(n+1) - 1)$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) نضع $w_n = u_n + v_n$. احسب بدلالة $n$ المجموع $W_n = w_0 + w_1 + dots + w_n$، ثمّ احسب $W_4$.',
					answer:
						'4) $W_n = S_n + T_n = (n + 1)(2 n + 5) + 3(2^(n+1) - 1)$.\nمن أجل $n = 4$: $W_4 = 5 times 13 + 3(32 - 1) = 65 + 93 = 158$.',
					mark: '1.5'
				}
			]
		},
		{
			id: 'bac_2025_lit_s2_ex3',
			num: 'الثالث',
			points: 8,
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1fr'],
					children: [
						{
							type: 'text',
							content:
								'نعتبر الدالة كثير الحدود $f$ المعرّفة على $bb(R)$ بـ: $f(x) = a x^3 + b x + c$ حيث $a, b, c$ أعداد حقيقية، وجدول تغيّراتها معطى في الشكل المقابل.\n\n1) باستعمال معطيات جدول التغيّرات، عيّن الأعداد $a$ و $b$ و $c$ وتحقّق أنّ $f(x) = x^3 - 3 x + 4$.',
							answer:
								'1) لدينا $f\'(x) = 3 a x^2 + b$. من الجدول: $f\'(1) = 0 arrow.r.double 3 a + b = 0 arrow.r.double b = -3 a$.\nولدينا $f(1) = 2 arrow.r.double a + b + c = -2 a + c = 2$، و $f(-1) = 6 arrow.r.double -a - b + c = 2 a + c = 6$.\nبالجمع نجد $2 c = 8 arrow.r.double c = 4$، وبالطرح $4 a = 4 arrow.r.double a = 1$ و $b = -3$. إذن $f(x) = x^3 - 3 x + 4$.',
							mark: '2'
						},
						{
							type: 'image',
							src: ex3VarSubjUrl,
							caption: 'جدول تغيّرات الدالة $f$'
						}
					]
				},
				{
					type: 'text',
					content:
						'2) أثبت أنّ النقطة $I(0 ; 4)$ نقطة انعطاف ومركز تناظر للمنحني $(C_f)$، ثمّ اكتب معادلة المماس $(T)$ للمنحني $(C_f)$ عند النقطة $I$.',
					answer:
						'2) $f\'\'(x) = 6 x$ تنعدم وتغيّر إشارتها عند $x = 0$، ومع $f(0) = 4$ فإنّ $I(0 ; 4)$ نقطة انعطاف.\nالتناظر: $f(-x) + f(x) = (-x^3 + 3 x + 4) + (x^3 - 3 x + 4) = 8 = 2(4)$، إذن $I(0 ; 4)$ مركز تناظر لـ $(C_f)$.\nمعادلة $(T)$: $f\'(0) = -3$، ومنه $y = -3 x + 4$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3) بيّن أنّ المعادلة $f(x) = 0$ تقبل حلّاً وحيداً $alpha$ على $bb(R)$، ثمّ تحقّق أنّ $-2.2 < alpha < -2.1$.',
					answer:
						'3) على $[-1 ; +oo[$: القيمة الصغرى هي $f(1) = 2 > 0$، فلا تقبل المعادلة حلولاً على $[-1 ; +oo[$.\nعلى $]-oo ; -1]$: $f$ مستمرة ومتزايدة تماماً من $-oo$ إلى $6$، ولدينا $f(-2.2) = -0.048 < 0$ و $f(-2.1) = 1.039 > 0$؛ إذن تقبل $f(x) = 0$ حلّاً وحيداً $alpha in ]-2.2 ; -2.1[$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) ارسم المماس $(T)$ والمنحني $(C_f)$، ثمّ حلّ بيانياً المتراجحة $f(x) <= 4$ وناقش حسب قيم الوسيط الحقيقي $m$ عدد حلول المعادلة $f(x) = m$.',
					answer: `4) التمثيل البياني للمماس $(T)$ والمنحني $(C_f)$:

#align(center)[#image("${typstSvgPath(ex3CfSolUrl)}", width: 58%)]

حلول $f(x) <= 4$: تقاطع $(C_f)$ مع المستقيم $y = 4$ يعطي $x^3 - 3 x = 0 arrow.l.r.double x in \{-sqrt(3) ; 0 ; sqrt(3)\}$، ومن البيان $S = ]-oo ; -sqrt(3)] union [0 ; sqrt(3)]$.

المناقشة البيانية الأفقية للمعادلة $f(x) = m$:

- لمّا $m < 2$ أو $m > 6$: حلّ وحيد.

- لمّا $m = 2$ أو $m = 6$: حلّان متمايزان.

- لمّا $2 < m < 6$: ثلاث حلول متمايزة.`,
					mark: '3'
				}
			]
		}
	];

	return buildLitPaperSpec({
		year: '2025',
		topicNumber: 2,
		themesAr: [
			'اختيار من متعدد في الموافقات والمتتاليات والاشتقاق',
			'المتتاليات الحسابية والهندسية والمجموع المختلط',
			'استنتاج عبارة دالة تكعيبية من جدول تغيّراتها'
		],
		exercises
	});
}

export const OFFICIAL_BAC_LIT_MATH_PAPERS: OfficialBacLitMathPaperSpec[] = [
	buildBac2023LitS1(),
	buildBac2023LitS2(),
	buildBac2024LitS1(),
	buildBac2024LitS2(),
	buildBac2025LitS1(),
	buildBac2025LitS2()
];

interface LitTrackBindingProfile {
	grade: LitMathTrackId;
	yearSubjectId: LitMathYearSubjectId;
	streamId: LitMathStreamId;
	streamNameAr: 'آداب وفلسفة' | 'لغات أجنبية';
	slugTrack: '3as-lp' | '3as-le';
}

const LIT_TRACK_PROFILES: readonly LitTrackBindingProfile[] = [
	{
		grade: '3as_lp',
		yearSubjectId: 768,
		streamId: 'LP',
		streamNameAr: 'آداب وفلسفة',
		slugTrack: '3as-lp'
	},
	{
		grade: '3as_le',
		yearSubjectId: 787,
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		slugTrack: '3as-le'
	}
];

/**
 * All 12 DB bindings for Literary BAC Math (`MAT-LIT`):
 * - 6 bindings for `3as_lp` (`yearSubjectId: 768`, `bac-YEAR-3as-lp-math-sN`)
 * - 6 bindings for `3as_le` (`yearSubjectId: 787`, `bac-YEAR-3as-le-math-sN`)
 * Sharing the 6 compiled canonical literary PDFs (`bac-YEAR-3as-lit-math-sN`),
 * with customized `examDoc.metadata` per binding.
 */
export const ALL_OFFICIAL_BAC_LIT_MATH_BINDINGS: OfficialBacLitMathBinding[] =
	LIT_TRACK_PROFILES.flatMap((profile) =>
		OFFICIAL_BAC_LIT_MATH_PAPERS.map((paper) => {
			const slug = `bac-${paper.academicYear}-${profile.slugTrack}-math-s${paper.topicNumber}`;
			const topicLabel = paper.topicNumber === 1 ? 'الموضوع الأول' : 'الموضوع الثاني';
			return {
				slug,
				bindingSlug: slug,
				paperSlug: paper.slug,
				grade: profile.grade,
				yearSubjectId: profile.yearSubjectId,
				subjectId: 'MAT-LIT',
				streamId: profile.streamId,
				streamNameAr: profile.streamNameAr,
				academicYear: paper.academicYear,
				topicNumber: paper.topicNumber,
				sessionAr: paper.sessionAr,
				coefficient: 2,
				duration: '02 ساعات و30 دقيقة',
				pointsSplit: paper.pointsSplit,
				templateId: 'secondary/bac_official',
				titleAr: `بكالوريا رسمية في الرياضيات — شعبة ${profile.streamNameAr} (${paper.sessionAr} - ${topicLabel})`,
				themesAr: paper.themesAr,
				examDoc: {
					metadata: {
						...paper.examDoc.metadata,
						streamId: profile.streamId,
						streamName: profile.streamNameAr
					},
					exercises: paper.examDoc.exercises
				}
			};
		})
	);

export function buildOfficialBac3asLit(): OfficialBacLitMathPaperSpec[] {
	return OFFICIAL_BAC_LIT_MATH_PAPERS;
}
