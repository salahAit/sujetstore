import type { ExamDocument, ExamMetadata, ExerciseBlock } from '../../modules/SujetBuilder/types';
import { saveSvgAsset } from '../../modules/MathTemplates/svg-helpers';
import {
	svgCobwebSequencePlot,
	svgFunctionCurvePlot,
	svgProbabilityTree,
	svgVariationTable
} from '../../modules/MathTemplates/svg-secondary';
import type { OfficialBacPaperRecord } from './types';

/** Inline Typst math helper for expressions containing `overline(...)` (conjugate / complement). */
function mathInline(expr: string): string {
	return `#math.equation(eval("${expr}", mode: "math"))`;
}

function buildMetadata(year: '2023' | '2024' | '2025'): ExamMetadata {
	return {
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي',
		streamId: 'SE',
		streamName: 'علوم تجريبية',
		subjectId: 'MAT-SE',
		subjectName: 'الرياضيات',
		trimesterId: 't3',
		trimesterName: 'دورة بكالوريا رسمية',
		docType: 'exam',
		academicYear: year,
		duration: '03 ساعات و30 دقيقة',
		coefficient: 5,
		examSessionAr: 'دورة جوان ' + year,
		topicNumber: 1,
		customDocTitle: 'امتحان بكالوريا التعليم الثانوي (موضوع رسمي مُعاد تنسيقه)',
		siteUrl: 'https://sujetstore.com'
	};
}

function buildRecord(
	year: '2023' | '2024' | '2025',
	exercises: ExerciseBlock[]
): OfficialBacPaperRecord {
	const examDoc: ExamDocument = {
		metadata: buildMetadata(year),
		exercises
	};

	return {
		slug: `bac-${year}-3as-se-math`,
		grade: '3as_se',
		yearSubjectId: 682,
		streamId: 'SE',
		streamNameAr: 'علوم تجريبية',
		academicYear: year,
		sessionAr: 'دورة جوان ' + year,
		coefficient: 5,
		duration: '03 ساعات و30 دقيقة',
		titleAr: `بكالوريا رسمية في الرياضيات — شعبة علوم تجريبية (دورة جوان ${year} - الموضوع الأول)`,
		sourcePdfRelPath: `pipeline/references/3as_se/03_bac_official_archive/bac_${year}_3as_se_math.pdf`,
		sourceSolutionPdfRelPath: `pipeline/references/3as_se/03_bac_official_archive/bac_${year}_3as_se_math_sol.pdf`,
		examDoc
	};
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. دورة جوان 2023 — شعبة علوم تجريبية — الموضوع الأول
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2023Se(): OfficialBacPaperRecord {
	const ex1TreeSolUrl = saveSvgAsset(
		'bac_2023_se_ex1_tree_sol',
		svgProbabilityTree({
			firstLevel: [
				{
					label: 'U1',
					probLabel: '1/2',
					children: [
						{ label: 'A', probLabel: '3/5' },
						{ label: 'C', probLabel: '2/5' }
					]
				},
				{
					label: 'U2',
					probLabel: '1/2',
					children: [
						{ label: 'A', probLabel: '1/6' },
						{ label: 'B', probLabel: '1/6' },
						{ label: 'C', probLabel: '4/6' }
					]
				}
			]
		})
	);

	const ex4GammaSubjUrl = saveSvgAsset(
		'bac_2023_se_ex4_gamma_subj',
		svgFunctionCurvePlot({
			xMin: -2,
			xMax: 1.5,
			yMin: -2,
			yMax: 4,
			fn: (x) => (2 * x - 1) * Math.exp(2 * x),
			curveLabel: '(Γ)',
			asymptotes: [{ kind: 'horizontal', value: 1, label: '(D): y = 1', color: '#0f172a' }],
			points: [{ x: 0.639, y: 1, label: 'A(α ; 1)', color: '#dc2626' }],
			width: 310,
			height: 225
		})
	);

	const ex4VarSolUrl = saveSvgAsset(
		'bac_2023_se_ex4_var_sol',
		svgVariationTable({
			xValues: ['-∞', 'α', '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '-' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '+' }
			],
			variations: [
				{ value: '+∞', position: 'top' },
				{ value: 'f(α)', position: 'bottom' },
				{ value: '+∞', position: 'top' }
			],
			fnName: 'f(x)',
			derivName: "f'(x)"
		})
	);

	const yTan2023 = (1 - Math.E) / 2;
	const ex4CfSolUrl = saveSvgAsset(
		'bac_2023_se_ex4_cf_sol',
		svgFunctionCurvePlot({
			xMin: -2.2,
			xMax: 1.6,
			yMin: -1.6,
			yMax: 4.2,
			fn: (x) => (x - 1) * (Math.exp(2 * x) - 1),
			curveLabel: '(Cf)',
			asymptotes: [{ kind: 'oblique', a: -1, b: 1, label: '(Δ): y = -x + 1', color: '#dc2626' }],
			tangents: [{ x: 0.5, y: yTan2023, slope: -1, halfSpan: 2.2, color: '#059669' }],
			points: [
				{ x: 0, y: 0, label: 'O', color: '#0f172a' },
				{ x: 1, y: 0, label: '(1;0)', color: '#15803d' },
				{ x: 0.639, y: -0.93, label: '(α;f(α))', color: '#7c3aed' }
			],
			width: 360,
			height: 250
		})
	);

	const exercises: ExerciseBlock[] = [
		{
			id: 'bac_2023_se_ex1',
			num: 'الأول',
			points: 4,
			instruction:
				'يحتوي صندوق $U_1$ على $5$ كريات تحمل الأرقام $1 ، 1 ، 1 ، 2 ، 3$ ويحتوي صندوق $U_2$ على $4$ كريات تحمل الأرقام $1 ، 1 ، 2 ، 2$ (كل الكريات متماثلة ولا نفرق بينها عند اللمس). نختار عشوائيا أحد الصندوقين ونسحب منه عشوائيا كريتين في آن واحد.',
			content: [
				{
					type: 'text',
					content:
						'1) نعتبر الحوادث: $A$: "سحب كريتين تحملان رقمين فرديين"، $B$: "سحب كريتين تحملان رقمين زوجيين"، $C$: "سحب كريتين إحداهما تحمل رقما فرديا والأخرى تحمل رقما زوجيا". \\\nأ) أنجز الشجرة التي تُنمذج هذه التجربة.',
					answer: `1) أ) إنجاز شجرة الاحتمالات التي تنمذج التجربة ($P(U_1) = P(U_2) = frac(1, 2)$):
- من $U_1$ ($C_5^2 = 10$ حالات، به $4$ كريات فردية وكرية واحدة زوجية): $P_(U_1) (A) = frac(C_4^2, C_5^2) = frac(3, 5)$، $P_(U_1) (B) = 0$، و $P_(U_1) (C) = frac(C_4^1 times C_1^1, C_5^2) = frac(2, 5)$.
- من $U_2$ ($C_4^2 = 6$ حالات، به كريتان فرديتان وكريتان زوجيتان): $P_(U_2) (A) = frac(C_2^2, C_4^2) = frac(1, 6)$، $P_(U_2) (B) = frac(C_2^2, C_4^2) = frac(1, 6)$، و $P_(U_2) (C) = frac(C_2^1 times C_2^1, C_4^2) = frac(4, 6)$.
#align(center)[#image("/static${ex1TreeSolUrl}", width: 50%)]`,
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'ب) بيّن أنّ $P(A) = frac(23, 60)$ و $P(B) = frac(1, 12)$ ثمّ احسب $P(C)$.',
					answer:
						'ب) بتطبيق دستور الاحتمالات الكلية:\n- $P(A) = P(U_1) times P_(U_1) (A) + P(U_2) times P_(U_2) (A) = frac(1, 2) times frac(3, 5) + frac(1, 2) times frac(1, 6) = frac(3, 10) + frac(1, 12) = frac(23, 60)$.\n- $P(B) = P(U_2) times P_(U_2) (B) = frac(1, 2) times frac(1, 6) = frac(1, 12)$.\n- بما أنّ الحوادث $A$، $B$، $C$ تشكّل تجزئة لمجموعة المخارج فإنّ: $P(C) = 1 - (P(A) + P(B)) = 1 - (frac(23, 60) + frac(5, 60)) = frac(32, 60) = frac(8, 15)$.',
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'2) نفرغ محتوى الصندوقين $U_1$ و $U_2$ في صندوق جديد $U_3$ ثمّ نسحب منه عشوائيا كريتين في آن واحد. \\\n$X$ المتغيّر العشوائي الذي يرفق بكل عملية سحب لكريتين جُداء الرقمين المسجلين عليهما. \\\nأ) برّر أنّ مجموعة قيم المتغيّر العشوائي $X$ هي ${1 ; 2 ; 3 ; 4 ; 6}$.',
					answer:
						'2) أ) الصندوق $U_3$ يضمّ $9$ كريات موزعة كما يلي: $5$ كريات تحمل الرقم $1$، و $3$ كريات تحمل الرقم $2$، وكرية واحدة فقط تحمل الرقم $3$. \\\nعند سحب كريتين في آن واحد، الجداءات الممكنة للرقمين المسجلين هي: $1 times 1 = 1$، $1 times 2 = 2$، $1 times 3 = 3$، $2 times 2 = 4$، و $2 times 3 = 6$ (يستحيل الحصول على $9$ لوجود كرية وحيدة تحمل الرقم $3$). إذن مجموعة قيم $X$ هي ${1 ; 2 ; 3 ; 4 ; 6}$.',
					mark: '0.5'
				},
				{
					type: 'text',
					content:
						'ب) عيّن قانون الاحتمال للمتغيّر العشوائي $X$ ثمّ احسب أمله الرياضياتي $E(X)$.',
					answer: `ب) عدد الحالات الممكنة لسحب كريتين من $9$ هو $C_9^2 = 36$: \\\n$P(X = 1) = frac(C_5^2, 36) = frac(10, 36)$، $P(X = 2) = frac(C_5^1 times C_3^1, 36) = frac(15, 36)$، $P(X = 3) = frac(C_5^1 times C_1^1, 36) = frac(5, 36)$، $P(X = 4) = frac(C_3^2, 36) = frac(3, 36)$، و $P(X = 6) = frac(C_3^1 times C_1^1, 36) = frac(3, 36)$.
#align(center)[#[#set text(dir: ltr); #table(columns: 6, align: center + horizon, inset: 5pt, [$x_i$], [$1$], [$2$], [$3$], [$4$], [$6$], [$P(X = x_i)$], [$frac(10, 36)$], [$frac(15, 36)$], [$frac(5, 36)$], [$frac(3, 36)$], [$frac(3, 36)$])]]
الأمل الرياضياتي: $E(X) = frac(1 times 10 + 2 times 15 + 3 times 5 + 4 times 3 + 6 times 3, 36) = frac(85, 36)$.`,
					mark: '1.5'
				}
			]
		},
		{
			id: 'bac_2023_se_ex2',
			num: 'الثاني',
			points: 4,
			instruction: 'أجب بصحيح أو خاطئ مع التبرير في كل حالة من الحالات الآتية:',
			content: [
				{
					type: 'text',
					content:
						'1) حلّ المعادلة التفاضلية $y\' = 2 y + 6$ الذي يحقّق $y(ln 2) = 25$ هو الدالة $h$ المعرّفة على $bb(R)$ بـ: $h(x) = 7 e^(2 x) - 3$.',
					answer:
						'1) *صحيح*: لأنّ الحلول العامة للمعادلة التفاضلية $y\' = 2 y + 6$ على $bb(R)$ هي الدوال $x arrow.r.bar k e^(2 x) - 3$ ($k in bb(R)$). ومن الشرط $h(ln 2) = 25$ نجد $k e^(2 ln 2) - 3 = 25 arrow.l.r.double 4 k = 28 arrow.l.r.double k = 7$، ومنه $h(x) = 7 e^(2 x) - 3$.',
					mark: '1'
				},
				{
					type: 'text',
					content: '2) $lim_(x arrow.r +oo) [x - ln(e^x - 1)] = +oo$.',
					answer:
						'2) *خاطئ*: لأنّ من أجل $x > 0$ لدينا $x - ln(e^x - 1) = x - ln(e^x (1 - e^(-x))) = x - x - ln(1 - e^(-x)) = -ln(1 - e^(-x))$، وبما أنّ $lim_(x arrow.r +oo) e^(-x) = 0$ فإنّ $lim_(x arrow.r +oo) [x - ln(e^x - 1)] = 0 != +oo$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'3) القيمة المتوسطة للدالة $x arrow.r.bar x (x^2 + 1)^2$ على المجال $[0 ; 2]$ هي $31$.',
					answer:
						'3) *خاطئ*: لأنّ القيمة المتوسطة على المجال $[0 ; 2]$ تساوي: \\\n$m = frac(1, 2 - 0) integral_0^2 x (x^2 + 1)^2 dif x = [frac(1, 12) (x^2 + 1)^3]_0^2 = frac(125 - 1, 12) = frac(124, 12) = frac(31, 3) != 31$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'4) $(v_n)$ المتتالية المعرّفة على $bb(N)$ بـ: $v_n = integral_n^(n+1) e^(-x + 3) dif x$. \\\nمن أجل كل عدد طبيعي $n$، $v_0 + v_1 + ... + v_n = e^3 - e^(-n + 2)$.',
					answer:
						'4) *صحيح*: لأنّ باستعمال علاقة شال للتكامل: \\\n$v_0 + v_1 + ... + v_n = integral_0^1 e^(-x + 3) dif x + integral_1^2 e^(-x + 3) dif x + ... + integral_n^(n+1) e^(-x + 3) dif x = integral_0^(n+1) e^(-x + 3) dif x = [-e^(-x + 3)]_0^(n+1) = e^3 - e^(-n + 2)$.',
					mark: '1'
				}
			]
		},
		{
			id: 'bac_2023_se_ex3',
			num: 'الثالث',
			points: 5,
			instruction:
				'$(u_n)$ المتتالية المعرّفة بـ: $u_0 = frac(1, 2)$ ومن أجل كل عدد طبيعي $n$، $u_(n+1) = -1 + frac(2, 2 - u_n)$.',
			content: [
				{
					type: 'text',
					content: '1) أ) برهن بالتراجع أنّه: من أجل كلّ عدد طبيعي $n$، $0 < u_n <= frac(1, 2)$.',
					answer:
						'1) أ) البرهان بالتراجع:\n- من أجل $n = 0$: لدينا $u_0 = frac(1, 2)$ ومنه $0 < u_0 <= frac(1, 2)$ محقّقة.\n- نفرض صحّة $0 < u_n <= frac(1, 2)$ من أجل عدد طبيعي كيفي $n$، ونثبت صحّتها من أجل $n + 1$: من الفرض $frac(3, 2) <= 2 - u_n < 2 arrow.l.r.double 1 < frac(2, 2 - u_n) <= frac(4, 3)$، وبإضافة $-1$ نجد $0 < u_(n+1) <= frac(1, 3) <= frac(1, 2)$.\nإذن من أجل كل $n in bb(N)$: $0 < u_n <= frac(1, 2)$.',
					mark: '1'
				},
				{
					type: 'text',
					content: 'ب) بيّن أنّ المتتالية $(u_n)$ متناقصة تماما.',
					answer:
						'ب) من أجل كل $n in bb(N)$: $u_(n+1) - u_n = -1 + frac(2, 2 - u_n) - u_n = frac((u_n - 1) u_n, 2 - u_n)$. \\\nبما أنّ $0 < u_n <= frac(1, 2)$ فإنّ $u_n > 0$، $2 - u_n > 0$، و $u_n - 1 < 0$، ومنه $u_(n+1) - u_n < 0$، فالمتتالية $(u_n)$ متناقصة تماما على $bb(N)$.',
					mark: '0.5'
				},
				{
					type: 'text',
					content:
						'2) نضع: من أجل كلّ عدد طبيعي $n$، $v_n = frac(1, u_n) - 1$. \\\nأ) أثبت أنّ المتتالية $(v_n)$ هندسية أساسها $2$ ثمّ اكتب عبارة $v_n$ بدلالة $n$.',
					answer:
						'2) أ) لدينا $u_(n+1) = frac(u_n, 2 - u_n)$، ومنه من أجل كل $n in bb(N)$: \\\n$v_(n+1) = frac(1, u_(n+1)) - 1 = frac(2 - u_n, u_n) - 1 = frac(2 (1 - u_n), u_n) = 2 (frac(1, u_n) - 1) = 2 v_n$. \\\nفالمتتالية $(v_n)$ هندسية أساسها $q = 2$ وحدّها الأول $v_0 = frac(1, u_0) - 1 = 1$، ومنه $v_n = v_0 times q^n = 2^n$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'ب) استنتج أنّه: من أجل كلّ عدد طبيعي $n$، $u_n = frac(1, 2^n + 1)$ ثمّ احسب $lim_(n arrow.r +oo) u_n$.',
					answer:
						'ب) من $v_n = frac(1, u_n) - 1$ نجد $u_n = frac(1, v_n + 1) = frac(1, 2^n + 1)$ من أجل كل عدد طبيعي $n$. \\\nوبما أنّ $lim_(n arrow.r +oo) 2^n = +oo$ فإنّ $lim_(n arrow.r +oo) u_n = 0$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'3) نضع: من أجل كلّ عدد طبيعي $n$، $S_n = v_0 + v_1 + ... + v_n$ و $T_n = frac(1, u_0) + frac(1, u_1) + ... + frac(1, u_n)$. \\\nاحسب $S_n$ بدلالة $n$ ثمّ بيّن أنّه من أجل كلّ عدد طبيعي $n$، $T_n = 2^(n+1) + n$.',
					answer:
						'3) $S_n$ مجموع $n + 1$ حدّاً متتابعاً من متتالية هندسية أساسها $2$ وحدّها الأول $v_0 = 1$: $S_n = v_0 frac(1 - q^(n+1), 1 - q) = 2^(n+1) - 1$. \\\nولدينا من أجل كل $k in bb(N)$: $frac(1, u_k) = v_k + 1$، ومنه $T_n = S_n + (n + 1) = (2^(n+1) - 1) + n + 1 = 2^(n+1) + n$.',
					mark: '1.5'
				}
			]
		},
		{
			id: 'bac_2023_se_ex4',
			customTitle: 'التمرين الرابع: المسألة الشاملة',
			points: 7,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content:
								'*I)* $(Gamma)$ التمثيل البياني للدالة المعرّفة على $bb(R)$ بـ: $x arrow.r.bar (2 x - 1) e^(2 x)$ و $(D)$ المستقيم ذو المعادلة $y = 1$، $alpha$ هي فاصلة نقطة تقاطع $(Gamma)$ و $(D)$ (لاحظ الشكل المقابل). \\\n1) بقراءة بيانية، حدّد وضعية $(Gamma)$ بالنسبة إلى $(D)$.',
							answer:
								'*I)* 1) بقراءة بيانية:\n- على المجال $]-oo ; alpha[$: المنحني $(Gamma)$ يقع أسفل المستقيم $(D)$.\n- على المجال $]alpha ; +oo[$: المنحني $(Gamma)$ يقع أعلى المستقيم $(D)$.\n- ويتقاطعان في النقطة $A(alpha ; 1)$ أي $(D) ∩ (Gamma) = {A(alpha ; 1)}$.',
							mark: '0.5'
						},
						{
							type: 'image',
							src: ex4GammaSubjUrl,
							caption: 'المنحني $(Gamma)$ والمستقيم $(D)$'
						}
					]
				},
				{
					type: 'text',
					content:
						'2) $g$ الدالة المعرّفة على $bb(R)$ بـ: $g(x) = (2 x - 1) e^(2 x) - 1$. \\\nاستنتج حسب قيم $x$ إشارة $g(x)$ ثمّ تحقّق أنّ: $0.6 < alpha < 0.7$.',
					answer:
						'2) إشارة $g(x)$ حسب قيم $x$: سالبة تماماً ($g(x) < 0$) على $]-oo ; alpha[$، وتنعدم عند $alpha$ ($g(alpha) = 0$)، وموجبة تماماً ($g(x) > 0$) على $]alpha ; +oo[$. \\\nالتحقّق: $g(0.6) approx -0.34 < 0$ و $g(0.7) approx 0.62 > 0$، وبما أنّ $g(0.6) times g(0.7) < 0$ فإنّ $0.6 < alpha < 0.7$.',
					mark: '0.5'
				},
				{
					type: 'text',
					content:
						'*II)* $f$ الدالة المعرّفة على $bb(R)$ بـ: $f(x) = (x - 1)(e^(2 x) - 1)$. \\\n$(C_f)$ تمثيلها البياني في المستوي المنسوب إلى المعلم المتعامد والمتجانس $(O ; arrow(i), arrow(j))$ (وحدة الطول $2 upright(c) upright(m)$). \\\n1) احسب $lim_(x arrow.r -oo) f(x)$ و $lim_(x arrow.r +oo) f(x)$.',
					answer:
						'*II)* 1) حساب النهايات:\n- $lim_(x arrow.r -oo) f(x) = +oo$ لأنّ $lim_(x arrow.r -oo) (x - 1) = -oo$ و $lim_(x arrow.r -oo) (e^(2 x) - 1) = -1$.\n- $lim_(x arrow.r +oo) f(x) = +oo$ لأنّ $lim_(x arrow.r +oo) (x - 1) = +oo$ و $lim_(x arrow.r +oo) (e^(2 x) - 1) = +oo$.',
					mark: '0.5'
				},
				{
					type: 'text',
					content:
						'2) أ) بيّن أنّ المستقيم $(Delta)$ ذا المعادلة $y = -x + 1$ مقارب مائل لـ $(C_f)$ عند $-oo$. \\\nب) ادرس وضعية $(C_f)$ بالنسبة إلى $(Delta)$.',
					answer:
						'2) أ) لدينا $f(x) - (-x + 1) = (x - 1) e^(2 x) = frac(1, 2)(2 x e^(2 x)) - e^(2 x)$، وبالتزايد المقارن $lim_(x arrow.r -oo) [f(x) - (-x + 1)] = 0$، فالمستقيم $(Delta): y = -x + 1$ مقارب مائل لـ $(C_f)$ عند $-oo$. \\\nب) إشارة الفرق $(x - 1) e^(2 x)$ من إشارة $(x - 1)$:\n- على $]-oo ; 1[$: $(C_f)$ أسفل $(Delta)$.\n- على $]1 ; +oo[$: $(C_f)$ أعلى $(Delta)$.\n- يقطع $(C_f)$ المستقيم $(Delta)$ في النقطة $(1 ; 0)$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'3) أ) بيّن أنّه: من أجل كلّ عدد حقيقي $x$، $f\'(x) = g(x)$. \\\nب) استنتج أنّ $f$ متناقصة تماما على $]-oo ; alpha]$ ومتزايدة تماما على $[alpha ; +oo[$ ثم شكّل جدول تغيّراتها. \\\nج) بيّن أنّ $(C_f)$ يقبل مماسا $(T)$ موازيا لـ $(Delta)$، يُطلب تعيين معادلة له.',
					answer: `3) أ) من أجل كل $x in bb(R)$: $f'(x) = 1 (e^(2 x) - 1) + 2 (x - 1) e^(2 x) = (2 x - 1) e^(2 x) - 1 = g(x)$. \\\nب) إشارة $f'(x)$ من إشارة $g(x)$، إذن $f$ متناقصة تماما على $]-oo ; alpha]$ ومتزايدة تماما على $[alpha ; +oo[$.
#align(center)[#image("/static${ex4VarSolUrl}", width: 56%)]
ج) توازي $(T)$ و $(Delta)$ يكافئ $f'(x) = -1 arrow.l.r.double (2 x - 1) e^(2 x) = 0 arrow.l.r.double x = frac(1, 2)$. وبما أنّ $f(frac(1, 2)) = frac(1 - e, 2)$ فمعادلة المماس $(T)$ هي: $y = -x + 1 - frac(e, 2)$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) أ) عيّن فواصل نقط تقاطع $(C_f)$ مع حامل محور الفواصل. \\\nب) ارسم $(Delta)$، $(T)$ و $(C_f)$ (نأخذ: $f(1.4) approx 6.2$ و $f(alpha) approx -0.9$). \\\nج) ناقش بيانيا، حسب قيم الوسيط الحقيقي $m$، عدد حلول المعادلة $f(x) = -x + m$.',
					answer: `4) أ) $f(x) = 0 arrow.l.r.double (x - 1)(e^(2 x) - 1) = 0 arrow.l.r.double x = 0$ أو $x = 1$. فاصلتا نقطتي تقاطع $(C_f)$ مع حامل محور الفواصل هما $0$ و $1$. \\\nب) رسم $(Delta)$، $(T)$، والمنحني $(C_f)$:
#align(center)[#image("/static${ex4CfSolUrl}", width: 58%)]
ج) المناقشة البيانية المائلة (موازي لـ $(Delta)$ و $(T)$):
- لمّا $m < 1 - frac(1, 2) e$: لا توجد حلول.
- لمّا $m = 1 - frac(1, 2) e$: يوجد حلّ وحيد.
- لمّا $1 - frac(1, 2) e < m < 1$: يوجد حلّان متمايزان.
- لمّا $m >= 1$: يوجد حلّ وحيد.`,
					mark: '2'
				},
				{
					type: 'text',
					content:
						'5) أ) باستعمال المكاملة بالتجزئة، بيّن أنّ: $integral_0^(frac(1, 2)) (x - 1) e^(2 x) dif x = frac(3 - 2 e, 4)$. \\\nب) استنتج، بالسنتيمتر المربع، مساحة الحيّز المستوي المحدّد بالمنحني $(C_f)$ والمستقيمات التي معادلاتها: $x = 0$، $x = frac(1, 2)$ و $y = -x + 1$.',
					answer:
						'5) أ) بوضع $u(x) = x - 1$ ($u\'(x) = 1$) و $v\'(x) = e^(2 x)$ ($v(x) = frac(1, 2) e^(2 x)$): \\\n$integral_0^(frac(1, 2)) (x - 1) e^(2 x) dif x = [frac(1, 4)(2 x - 3) e^(2 x)]_0^(frac(1, 2)) = frac(-2 e - (-3), 4) = frac(3 - 2 e, 4)$. \\\nب) على $[0 ; frac(1, 2)]$ المنحني $(C_f)$ أسفل $(Delta)$ ووحدة المساحة $4 upright(c) upright(m)^2$: \\\n$cal(A) = (integral_0^(frac(1, 2)) [-x + 1 - f(x)] dif x) times 4 upright(c) upright(m)^2 = (-integral_0^(frac(1, 2)) (x - 1) e^(2 x) dif x) times 4 upright(c) upright(m)^2 = frac(2 e - 3, 4) times 4 upright(c) upright(m)^2 = (2 e - 3) upright(c) upright(m)^2$.',
					mark: '1'
				}
			]
		}
	];

	return buildRecord('2023', exercises);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. دورة جوان 2024 — شعبة علوم تجريبية — الموضوع الأول
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2024Se(): OfficialBacPaperRecord {
	const ex4GTableSubjUrl = saveSvgAsset(
		'bac_2024_se_ex4_g_table_subj',
		svgVariationTable({
			xValues: ['-∞', '1', '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '+' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '-' }
			],
			variations: [
				{ value: '-∞', position: 'bottom' },
				{ value: 'g(1)', position: 'top' },
				{ value: '-2', position: 'bottom' }
			],
			fnName: 'g(x)',
			derivName: "g'(x)"
		})
	);

	const ex4FVarSolUrl = saveSvgAsset(
		'bac_2024_se_ex4_var_sol',
		svgVariationTable({
			xValues: ['-∞', '+∞'],
			derivativeRow: [{ kind: 'sign', value: '-' }],
			variations: [
				{ value: '+∞', position: 'top' },
				{ value: '-∞', position: 'bottom' }
			],
			fnName: 'f(x)',
			derivName: "f'(x)"
		})
	);

	const ex4CfSolUrl = saveSvgAsset(
		'bac_2024_se_ex4_cf_sol',
		svgFunctionCurvePlot({
			xMin: -1.2,
			xMax: 3.2,
			yMin: -3.5,
			yMax: 5.0,
			fn: (x) => -2 * x + 3 - x * Math.exp(-x + 1),
			curveLabel: '(Cf)',
			asymptotes: [{ kind: 'oblique', a: -2, b: 3, label: '(Δ): y = -2x + 3', color: '#dc2626' }],
			tangents: [{ x: 1, y: 0, slope: -2, halfSpan: 2.0, color: '#059669' }],
			points: [
				{ x: 0, y: 3, label: 'I(0;3)', color: '#dc2626' },
				{ x: 1, y: 0, label: '(1;0)', color: '#15803d' }
			],
			width: 360,
			height: 250
		})
	);

	const exercises: ExerciseBlock[] = [
		{
			id: 'bac_2024_se_ex1',
			num: 'الأول',
			points: 4,
			instruction:
				'يحتوي كيس على $11$ كريّة متماثلة لا نفرّق بينها باللمس موزعة كما يلي: كريّتان بيضاوان مرقمتان بـ: $1 ، 3$ وأربع كريّات حمراء مرقمة بـ: $0 ، 1 ، 1 ، 3$ وخمس كريّات خضراء مرقمة بـ: $0 ، 1 ، 1 ، 3 ، 4$.',
			content: [
				{
					type: 'text',
					content:
						'*I)* نسحب عشوائيا وفي آن واحد $3$ كريّات من الكيس ونعتبر الحوادث الآتية: \\\n$A$: "الحصول على $3$ كريّات من نفس اللون"، $B$: "الحصول على $3$ كريّات جُداء أرقامها عدد فردي"، $C$: "الحصول على $3$ كريّات جُداء أرقامها عدد زوجي". \\\n1) أ) احسب $P(A)$ احتمال الحادثة $A$ وبيّن أنّ: $P(B) = frac(56, 165)$ ثمّ استنتج $P(C)$.',
					answer:
						'*I)* 1) أ) عدد الحالات الممكنة لسحب $3$ كريات في آن واحد هو $C_(11)^3 = 165$. الكيس يضمّ $8$ كريات فردية و $3$ كريات زوجية ($0 ، 0 ، 4$):\n- $P(A) = frac(C_4^3 + C_5^3, C_(11)^3) = frac(4 + 10, 165) = frac(14, 165)$.\n- يكون جداء الأرقام فردياً إذا كانت الكريات الثلاث فردية: $P(B) = frac(C_8^3, C_(11)^3) = frac(56, 165)$.\n- الحادثة $C$ معاكسة لـ $B$: $P(C) = 1 - P(B) = 1 - frac(56, 165) = frac(109, 165)$.',
					mark: '1.25'
				},
				{
					type: 'text',
					content: 'ب) احسب الاحتمال الشرطي $P_A (B)$.',
					answer:
						'ب) الحادثة $A ∩ B$ تعني سحب $3$ كريات من نفس اللون وأرقامها فردية ($3$ حمراء فردية أو $3$ خضراء فردية): $P(A ∩ B) = frac(C_3^3 + C_3^3, 165) = frac(2, 165)$. \\\nومنه $P_A (B) = frac(P(A ∩ B), P(A)) = frac(2, 14) = frac(1, 7)$.',
					mark: '0.5'
				},
				{
					type: 'text',
					content:
						'2) $X$ المتغيّر العشوائي الذي يرفق بكلّ عملية سحب لثلاث كريّات، عدد الكريّات التي تحمل رقما زوجيا. \\\nأ) عيّن قانون الاحتمال للمتغيّر العشوائي $X$ ثمّ احسب أمله الرياضياتي $E(X)$.',
					answer: `2) أ) قيم $X$ الممكنة هي $\{0 ; 1 ; 2 ; 3\}$ (لوجود $3$ كريات زوجية و $8$ فردية): \\\n$P(X = 0) = frac(C_8^3, 165) = frac(56, 165)$، $P(X = 1) = frac(C_3^1 times C_8^2, 165) = frac(84, 165)$، $P(X = 2) = frac(C_3^2 times C_8^1, 165) = frac(24, 165)$، و $P(X = 3) = frac(C_3^3, 165) = frac(1, 165)$.
#align(center)[#[#set text(dir: ltr); #table(columns: 5, align: center + horizon, inset: 5pt, [$x_i$], [$0$], [$1$], [$2$], [$3$], [$P(X = x_i)$], [$frac(56, 165)$], [$frac(84, 165)$], [$frac(24, 165)$], [$frac(1, 165)$])]]
الأمل الرياضياتي: $E(X) = frac(0 times 56 + 1 times 84 + 2 times 24 + 3 times 1, 165) = frac(135, 165) = frac(9, 11)$.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: 'ب) احسب احتمال الحادثة $(X > 1)$.',
					answer:
						'ب) $P(X > 1) = P(X = 2) + P(X = 3) = frac(24 + 1, 165) = frac(25, 165) = frac(5, 33)$.',
					mark: '0.5'
				},
				{
					type: 'text',
					content:
						'*II)* نسحب الآن من الكيس عشوائيا $3$ كريّات على التوالي وبدون إرجاع. \\\n— احسب احتمال الحادثة $D$: "الحصول على $3$ كريّات جُداء أرقامها معدوم".',
					answer: `*II)* في السحب على التوالي وبدون إرجاع عدد الترتيبات $A_(11)^3 = 990$. الحادثة المعاكسة ${mathInline('overline(D)')} هي عدم سحب أي كرية تحمل الرقم $0$ (من بين $9$ كريات غير معدومة): \\\n${mathInline('P(D) = 1 - P(overline(D))')} $= 1 - frac(A_9^3, A_(11)^3) = 1 - frac(9 times 8 times 7, 11 times 10 times 9) = 1 - frac(28, 55) = frac(27, 55)$.`,
					mark: '0.5'
				}
			]
		},
		{
			id: 'bac_2024_se_ex2',
			num: 'الثاني',
			points: 4,
			content: [
				{
					type: 'text',
					content:
						'*I)* حل في مجموعة الأعداد المركبة $bb(C)$ المعادلة ذات المجهول $z$ الآتية: \\\n$(z - 1 + 2 sqrt(3))[z^2 - 2(1 - sqrt(3)) z + 5 - 2 sqrt(3)] = 0$.',
					answer:
						'*I)* المعادلة تكافئ $z - 1 + 2 sqrt(3) = 0$ (أي $z_0 = 1 - 2 sqrt(3)$) أو $z^2 - 2(1 - sqrt(3)) z + 5 - 2 sqrt(3) = 0$. \\\nمميز المعادلة الثانية: $Delta = 4(1 - sqrt(3))^2 - 4(5 - 2 sqrt(3)) = 16 - 8 sqrt(3) - 20 + 8 sqrt(3) = -4 = (2 i)^2$. \\\nومنه الجذران المترافقان $z_1 = 1 - sqrt(3) - i$ و $z_2 = 1 - sqrt(3) + i$. \\\nمجموعة الحلول في $bb(C)$: $S = {1 - 2 sqrt(3) ; 1 - sqrt(3) - i ; 1 - sqrt(3) + i}$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content: `*II)* في المستوي المركب المنسوب إلى المعلم المتعامد والمتجانس $(O ; arrow(u), arrow(v))$، نعتبر النقط $A$، $B$ و $C$ التي لاحقاتها على الترتيب $z_A$، $z_B$ و $z_C$ حيث: $z_A = 1 - sqrt(3) + i$، $z_B = 1 - 2 sqrt(3)$ و ${mathInline('z_C = overline(z_A)')}. \\\n1) اكتب كلّاً من $z_A - 1$، $z_C - 1$ و $z_B$ على الشّكل المثلثي.`,
					answer: `*II)* 1) الكتابة المثلثية:
- $z_A - 1 = -sqrt(3) + i = 2 (cos frac(5 pi, 6) + i sin frac(5 pi, 6))$.
- ${mathInline('z_C - 1 = overline(z_A - 1)')} $= -sqrt(3) - i = 2 (cos(-frac(5 pi, 6)) + i sin(-frac(5 pi, 6)))$.
- بما أنّ $1 - 2 sqrt(3) < 0$ فإنّ $|z_B| = 2 sqrt(3) - 1$ وعمدته $pi$: $z_B = (2 sqrt(3) - 1)(cos pi + i sin pi)$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'2) جِد لاحقة النقطة $D$ مرجح الجملة المثقلة ${(A ; 1), (B ; -1), (C ; 1)}$.',
					answer:
						'2) لاحقة المرجح $D$: $z_D = frac(z_A - z_B + z_C, 1 - 1 + 1) = (1 - sqrt(3) + i) - (1 - 2 sqrt(3)) + (1 - sqrt(3) - i) = 1$.',
					mark: '0.5'
				},
				{
					type: 'text',
					content: '3) بيّن أنّ الرباعي $A B C D$ معيّن.',
					answer:
						'3) من $z_D = z_A - z_B + z_C$ نجد $z_A - z_B = z_D - z_C$ أي $arrow(B A) = arrow(C D)$ فـ $A B C D$ متوازي أضلاع. \\\nولدينا $A D = |z_A - z_D| = |z_A - 1| = 2$ و $A B = |z_B - z_A| = |-sqrt(3) - i| = 2$، أي $A B = A D = 2$، ومنه الرباعي $A B C D$ معيّن.',
					mark: '0.5'
				}
			]
		},
		{
			id: 'bac_2024_se_ex3',
			num: 'الثالث',
			points: 5,
			instruction:
				'$(u_n)$ المتتالية العددية المعرّفة بـ: $u_0 = 0$ ومن أجل كلّ عدد طبيعي $n$، $u_(n+1) = frac(4 - u_n, 2 + u_n)$.',
			content: [
				{
					type: 'text',
					content:
						'1) احسب الحدود $u_1$، $u_2$ و $u_3$ ثمّ برهن بالتراجع أنّه: من أجل كلّ عدد طبيعي $n$، $0 <= u_n <= 2$.',
					answer:
						'1) حساب الحدود: $u_1 = frac(4, 2) = 2$، $u_2 = frac(4 - 2, 2 + 2) = frac(1, 2)$، و $u_3 = frac(4 - frac(1, 2), 2 + frac(1, 2)) = frac(7, 5)$. \\\nالبرهان بالتراجع: من أجل $n = 0$ لدينا $0 <= u_0 <= 2$ محقّقة. نفرض $0 <= u_n <= 2$ من أجل $n in bb(N)$؛ بما أنّ $u_(n+1) = -1 + frac(6, u_n + 2)$ فإنّ $2 <= u_n + 2 <= 4 arrow.l.r.double frac(3, 2) <= frac(6, u_n + 2) <= 3 arrow.l.r.double frac(1, 2) <= u_(n+1) <= 2$، ومنه $0 <= u_(n+1) <= 2$. إذن من أجل كل $n in bb(N)$: $0 <= u_n <= 2$.',
					mark: '1.75'
				},
				{
					type: 'text',
					content:
						'2) $(v_n)$ المتتالية العددية المعرّفة على $bb(N)$ بـ: $v_n = frac(u_n - 1, u_n + 4)$. \\\nأ) أثبت أنّ المتتالية $(v_n)$ هندسية أساسها $-frac(2, 3)$ ثمّ اكتب عبارة $v_n$ بدلالة $n$.',
					answer:
						'2) أ) من أجل كل $n in bb(N)$: $v_(n+1) = frac(frac(4 - u_n, 2 + u_n) - 1, frac(4 - u_n, 2 + u_n) + 4) = frac(2 - 2 u_n, 12 + 3 u_n) = -frac(2, 3) (frac(u_n - 1, u_n + 4)) = -frac(2, 3) v_n$. \\\nفالمتتالية $(v_n)$ هندسية أساسها $q = -frac(2, 3)$ وحدّها الأول $v_0 = -frac(1, 4)$، ومنه $v_n = -frac(1, 4) (-frac(2, 3))^n$.',
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'ب) بيّن أنّه: من أجل كلّ عدد طبيعي $n$، $u_n = frac(5, 1 - v_n) - 4$ ثمّ احسب $lim_(n arrow.r +oo) u_n$.',
					answer:
						'ب) من $v_n = 1 - frac(5, u_n + 4)$ نجد $frac(5, u_n + 4) = 1 - v_n$ ومنه $u_n = frac(5, 1 - v_n) - 4$. \\\nوبما أنّ $-1 < -frac(2, 3) < 1$ فإنّ $lim_(n arrow.r +oo) v_n = 0$، ومنه $lim_(n arrow.r +oo) u_n = frac(5, 1) - 4 = 1$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'3) من أجل كلّ عدد طبيعي $n$، نضع: \\\n$S_n = v_n + v_(n+1) + ... + v_(n+2024)$ و $T_n = frac(1, 4 + u_n) + frac(1, 4 + u_(n+1)) + ... + frac(1, 4 + u_(n+2024))$. \\\n— احسب $S_n$ بدلالة $n$ ثمّ استنتج $T_n$ بدلالة $n$.',
					answer:
						'3) $S_n$ مجموع $2025$ حدّاً متتابعاً من المتتالية الهندسية $(v_n)$ ابتداءً من $v_n$: \\\n$S_n = v_n frac(1 - (-frac(2, 3))^(2025), 1 + frac(2, 3)) = -frac(3, 20) (-frac(2, 3))^n (1 + (frac(2, 3))^(2025))$. \\\nولدينا $frac(1, 4 + u_k) = frac(1, 5)(1 - v_k)$، ومنه $T_n = frac(1, 5)(2025 - S_n) = 405 + frac(3, 100) (-frac(2, 3))^n (1 + (frac(2, 3))^(2025))$.',
					mark: '1'
				}
			]
		},
		{
			id: 'bac_2024_se_ex4',
			customTitle: 'التمرين الرابع: المسألة الشاملة',
			points: 7,
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1fr'],
					children: [
						{
							type: 'text',
							content:
								'*I)* يُمثّل الجدول المقابل تغيّرات الدّالة $g$ المعرّفة على $bb(R)$ بـ: $g(x) = x e^(-x + 1) - 2$. \\\n— احسب $g(1)$ ثمّ استنتج إشارة $g(x)$.',
							answer:
								'*I)* لدينا $g(1) = 1 times e^0 - 2 = -1$. وبما أنّ $g(1) = -1$ قيمة حدية عظمى شاملة لـ $g$ على $bb(R)$ فإنّه من أجل كلّ $x in bb(R)$: $g(x) < 0$.',
							mark: '0.75'
						},
						{
							type: 'image',
							src: ex4GTableSubjUrl,
							caption: 'جدول تغيّرات الدّالة $g$'
						}
					]
				},
				{
					type: 'text',
					content:
						'*II)* $f$ الدّالة المعرّفة على $bb(R)$ بـ: $f(x) = -2 x + 3 - x e^(-x + 1)$. \\\n$(C_f)$ تمثيلها البياني في المستوي المنسوب إلى المعلم المتعامد والمتجانس $(O ; arrow(i), arrow(j))$، (وحدة الطول $2 upright(c) upright(m)$). \\\n1) أ) احسب $lim_(x arrow.r -oo) f(x)$ و $lim_(x arrow.r +oo) f(x)$.',
					answer:
						'*II)* 1) أ) عند $-oo$: $f(x) = x (-2 - e^(-x + 1)) + 3$ ومنه $lim_(x arrow.r -oo) f(x) = +oo$. \\\nعند $+oo$: بالتزايد المقارن $lim_(x arrow.r +oo) x e^(-x + 1) = 0$ ومنه $lim_(x arrow.r +oo) f(x) = -oo$.',
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'ب) بيّن أنّ المستقيم $(Delta)$ ذا المعادلة $y = -2 x + 3$ مقارب مائل للمنحني $(C_f)$ عند $+oo$ ثمّ ادرس الوضع النسبي للمنحني $(C_f)$ والمستقيم $(Delta)$.',
					answer:
						'ب) لدينا $lim_(x arrow.r +oo) [f(x) - (-2 x + 3)] = lim_(x arrow.r +oo) (-x e^(-x + 1)) = 0$، فالمستقيم $(Delta): y = -2 x + 3$ مقارب مائل لـ $(C_f)$ عند $+oo$. \\\nإشارة الفرق $-x e^(-x + 1)$ من إشارة $(-x)$: لمّا $x < 0$ يقع $(C_f)$ أعلى $(Delta)$، ولمّا $x > 0$ يقع $(C_f)$ أسفل $(Delta)$، ويتقاطعان في النقطة $I(0 ; 3)$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'2) أ) بيّن أنّه: من أجل كلّ عدد حقيقي $x$، $f\'(x) = g(x) - e^(-x + 1)$. \\\nب) استنتج اتجاه تغيّر الدّالة $f$ ثمّ شكّل جدول تغيّراتها.',
					answer: `2) أ) من أجل كل $x in bb(R)$: $f'(x) = -2 - (e^(-x + 1) - x e^(-x + 1)) = (x e^(-x + 1) - 2) - e^(-x + 1) = g(x) - e^(-x + 1)$. \\\nب) بما أنّ $g(x) < 0$ و $-e^(-x + 1) < 0$ على $bb(R)$ فإنّ $f'(x) < 0$ تماماً على $bb(R)$، أي أنّ $f$ متناقصة تماماً على $bb(R)$.
#align(center)[#image("/static${ex4FVarSolUrl}", width: 48%)]`,
					mark: '1'
				},
				{
					type: 'text',
					content:
						'3) بيّن أنّ $(C_f)$ يقبل مماسا $(T)$ موازيا لـ $(Delta)$، يُطلب تعيين معادلة له.',
					answer:
						'3) حلّ المعادلة $f\'(x) = -2$ يكافئ $(x - 1) e^(-x + 1) = 0$ أي $x = 1$. وبما أنّ $f(1) = 0$ فمعادلة المماس $(T)$ هي: $y = -2 x + 2$.',
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'4) أ) ارسم $(Delta)$، $(T)$ و $(C_f)$. \\\nب) عيّن بيانيا قيم الوسيط الحقيقي $m$ التي من أجلها تقبل المعادلة $f(x) = -2 x + m$ حلّين مختلفين.',
					answer: `4) أ) إنشاء $(Delta)$، $(T)$، والمنحني $(C_f)$:
#align(center)[#image("/static${ex4CfSolUrl}", width: 58%)]
ب) تقبل المعادلة $f(x) = -2 x + m$ حلّين مختلفين لمّا يقع المستقيم $y = -2 x + m$ بين $(T)$ و $(Delta)$ أي لمّا $2 < m < 3$.`,
					mark: '1.75'
				},
				{
					type: 'text',
					content:
						'5) أ) باستعمال المكاملة بالتجزئة، بيّن أنّ: $integral_0^1 x e^(-x + 1) dif x = e - 2$. \\\nب) استنتج بالسنتيمتر المربع $cal(A)$ مساحة الحيّز المستوي المحدّد بـ $(C_f)$ و $(Delta)$ والمستقيمين اللذين معادلتاهما: $x = 0$ و $x = 1$.',
					answer:
						'5) أ) بوضع $u(x) = x$ ($u\'(x) = 1$) و $v\'(x) = e^(-x + 1)$ ($v(x) = -e^(-x + 1)$): \\\n$integral_0^1 x e^(-x + 1) dif x = [-x e^(-x + 1)]_0^1 + integral_0^1 e^(-x + 1) dif x = -1 + [-e^(-x + 1)]_0^1 = e - 2$. \\\nب) على $[0 ; 1]$ المنحني $(C_f)$ أسفل $(Delta)$ ووحدة المساحة $4 upright(c) upright(m)^2$: \\\n$cal(A) = (integral_0^1 [-2 x + 3 - f(x)] dif x) times 4 upright(c) upright(m)^2 = (integral_0^1 x e^(-x + 1) dif x) times 4 upright(c) upright(m)^2 = 4(e - 2) upright(c) upright(m)^2$.',
					mark: '1'
				}
			]
		}
	];

	return buildRecord('2024', exercises);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. دورة جوان 2025 — شعبة علوم تجريبية — الموضوع الأول
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2025Se(): OfficialBacPaperRecord {
	const ex1TreeSubjUrl = saveSvgAsset(
		'bac_2025_se_ex1_tree_subj',
		svgProbabilityTree({
			firstLevel: [
				{
					label: 'R',
					probLabel: '...',
					children: [
						{ label: 'RR', probLabel: '1/10' },
						{ label: 'RV', probLabel: '...' },
						{ label: 'VV', probLabel: '...' }
					]
				},
				{
					label: 'V',
					probLabel: '...',
					children: [
						{ label: 'RR', probLabel: '1/5' },
						{ label: 'RV', probLabel: '...' },
						{ label: 'VV', probLabel: '...' }
					]
				}
			]
		})
	);

	const ex1TreeSolUrl = saveSvgAsset(
		'bac_2025_se_ex1_tree_sol',
		svgProbabilityTree({
			firstLevel: [
				{
					label: 'R',
					probLabel: '2/5',
					children: [
						{ label: 'RR', probLabel: '1/10' },
						{ label: 'RV', probLabel: '6/10' },
						{ label: 'VV', probLabel: '3/10' }
					]
				},
				{
					label: 'V',
					probLabel: '3/5',
					children: [
						{ label: 'RR', probLabel: '1/5' },
						{ label: 'RV', probLabel: '3/5' },
						{ label: 'VV', probLabel: '1/5' }
					]
				}
			]
		})
	);

	const ex2CurveSubjUrl = saveSvgAsset(
		'bac_2025_se_ex2_curve_subj',
		svgFunctionCurvePlot({
			xMin: -1.3,
			xMax: 4.2,
			yMin: -1.2,
			yMax: 3.4,
			fn: (x) => (x >= -1.05 ? 3 / (x + 2) : Number.NaN),
			curveLabel: '(Cf)',
			asymptotes: [{ kind: 'oblique', a: 1, b: 0, label: '(Δ): y = x', color: '#0f172a' }],
			width: 295,
			height: 210
		})
	);

	const ex2CobwebSolUrl = saveSvgAsset(
		'bac_2025_se_ex2_cobweb_sol',
		svgCobwebSequencePlot({
			xMin: -1.3,
			xMax: 3.5,
			yMin: -1.3,
			yMax: 3.5,
			fn: (x) => 3 / (x + 2),
			u0: -1,
			steps: 3,
			fixedPoint: 1
		})
	);

	const ex4VarSolUrl = saveSvgAsset(
		'bac_2025_se_ex4_var_sol',
		svgVariationTable({
			xValues: ['-∞', '0', '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '-' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '+' }
			],
			variations: [
				{ value: '+∞', position: 'top' },
				{ value: '-2', position: 'bottom' },
				{ value: '+∞', position: 'top' }
			],
			fnName: 'f(x)',
			derivName: "f'(x)"
		})
	);

	const xTan2025 = -Math.LN2;
	const yTan2025 = Math.LN2 - 2.25;
	const ex4CfSolUrl = saveSvgAsset(
		'bac_2025_se_ex4_cf_sol',
		svgFunctionCurvePlot({
			xMin: -3.2,
			xMax: 1.4,
			yMin: -2.8,
			yMax: 2.6,
			fn: (x) => Math.exp(2 * x) - Math.exp(x) - x - 2,
			curveLabel: '(Cf)',
			asymptotes: [{ kind: 'oblique', a: -1, b: -2, label: '(Δ): y = -x - 2', color: '#dc2626' }],
			tangents: [{ x: xTan2025, y: yTan2025, slope: -1, halfSpan: 2.1, color: '#059669' }],
			points: [
				{ x: 0, y: -2, label: 'A(0;-2)', color: '#dc2626' },
				{ x: -Math.log(4), y: -35 / 16 + Math.log(4), label: 'B', color: '#7c3aed' }
			],
			width: 360,
			height: 250
		})
	);

	const exercises: ExerciseBlock[] = [
		{
			id: 'bac_2025_se_ex1',
			num: 'الأول',
			points: 4,
			instruction:
				'يحتوي صندوق $U_1$ على $5$ كريّات منها: كريّتان حمراوان وثلاث كريّات خضراء، ويحتوي صندوق $U_2$ على $5$ كريّات منها: ثلاث كريّات حمراء وكريّتان خضراوان (جميع الكريّات متماثلة ولا نفرق بينها باللّمس). نسحب عشوائيا $3$ كريّات بالكيفية التّالية: نقوم بسحب كريّة واحدة من $U_1$ ونسجّل لونها:\n- إذا كانت الكريّة المسحوبة حمراء نعيدها إلى $U_1$ ثمّ نسحب منه عشوائيا كريّتين في آن واحد.\n- وإذا كانت الكريّة المسحوبة خضراء نضعها في $U_2$ ثمّ نسحب منه عشوائيا كريّتين في آن واحد.\nنعتبر الحوادث $R$: "الحصول على كريّة حمراء"، $V$: "الحصول على كريّة خضراء"، $A$: "الحصول على $3$ كريّات من نفس اللّون"، $B$: "الحصول على كريّة خضراء على الأقل".',
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1fr'],
					children: [
						{
							type: 'text',
							content: '1) انقل وأكمل شجرة الاحتمالات المقابلة.',
							answer: `1) إكمال شجرة الاحتمالات ($P(R) = frac(2, 5)$ و $P(V) = frac(3, 5)$):
- عند تحقّق $R$ ($C_5^2 = 10$): $P_R (R R) = frac(1, 10)$، $P_R (R V) = frac(6, 10)$، $P_R (V V) = frac(3, 10)$.
- عند تحقّق $V$ ($C_6^2 = 15$): $P_V (R R) = frac(1, 5)$، $P_V (R V) = frac(3, 5)$، $P_V (V V) = frac(1, 5)$.
#align(center)[#image("/static${ex1TreeSolUrl}", width: 82%)]`,
							mark: '1.5'
						},
						{
							type: 'image',
							src: ex1TreeSubjUrl,
							caption: 'شجرة الاحتمالات المراد إكمالها'
						}
					]
				},
				{
					type: 'text',
					content: '2) احسب احتمالي الحادثتين $A$ و $B$.',
					answer:
						'2) حساب الاحتمالين:\n- $P(A) = frac(2, 5) times frac(1, 10) + frac(3, 5) times frac(1, 5) = frac(1, 25) + frac(3, 25) = frac(4, 25)$.\n- الحادثة المعاكسة لـ $B$ هي الحصول على $3$ كريات حمراء: $P(B) = 1 - (frac(2, 5) times frac(1, 10)) = 1 - frac(1, 25) = frac(24, 25)$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'3) $X$ المتغيّر العشوائي الذي يرفق بكلّ عملية سحب لثلاث كريّات بالكيفية السّابقة عدد الكريّات الحمراء المسحوبة. \\\n— عيّن قانون احتمال المتغيّر العشوائي $X$ ثمّ احسب أمله الرياضياتي.',
					answer: `3) مجموعة قيم $X$ هي $X(Omega) = \{0 ; 1 ; 2 ; 3\}$: \\\n$P(X = 0) = frac(3, 5) times frac(1, 5) = frac(3, 25)$، $P(X = 1) = frac(2, 5) times frac(3, 10) + frac(3, 5) times frac(3, 5) = frac(12, 25)$، $P(X = 2) = frac(2, 5) times frac(6, 10) + frac(3, 5) times frac(1, 5) = frac(9, 25)$، و $P(X = 3) = frac(2, 5) times frac(1, 10) = frac(1, 25)$.
#align(center)[#[#set text(dir: ltr); #table(columns: 5, align: center + horizon, inset: 5pt, [$x_i$], [$0$], [$1$], [$2$], [$3$], [$P(X = x_i)$], [$frac(3, 25)$], [$frac(12, 25)$], [$frac(9, 25)$], [$frac(1, 25)$])]]
الأمل الرياضياتي: $E(X) = frac(0 times 3 + 1 times 12 + 2 times 9 + 3 times 1, 25) = frac(33, 25)$.`,
					mark: '1.5'
				}
			]
		},
		{
			id: 'bac_2025_se_ex2',
			num: 'الثاني',
			points: 4,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content:
								'1) $f$ الدّالة المعرّفة على $[-1 ; +oo[$ بـ: $f(x) = frac(3, x + 2)$، $(C_f)$ تمثيلها البياني في المستوي المنسوب إلى المعلم المتعامد والمتجانس $(O ; arrow(i), arrow(j))$، $(Delta)$ المستقيم ذو المعادلة $y = x$ كما في الشّكل المقابل. \\\n$(u_n)$ المتتالية العددية المعرّفة بـ: $u_0 = -1$ ومن أجل كلّ عدد طبيعي $n$، $u_(n+1) = f(u_n)$. \\\nأ) انقل الشّكل على ورقة الإجابة ثمّ مثّل على حامل محور الفواصل الحدود $u_0$، $u_1$، $u_2$ و $u_3$ (دون حسابها مبرزا خطوط التّمثيل). \\\nب) ضع تخمينا حول اتّجاه تغيّر المتتالية $(u_n)$ وتقاربها.',
							answer: `1) أ) تمثيل الحدود $u_0$، $u_1$، $u_2$ و $u_3$ على حامل محور الفواصل:
#align(center)[#image("/static${ex2CobwebSolUrl}", width: 80%)]
ب) التخمين: المتتالية $(u_n)$ ليست رتيبة، وهي متقاربة نحو العدد $1$.`,
							mark: '1'
						},
						{
							type: 'image',
							src: ex2CurveSubjUrl,
							caption: 'المنحني $(C_f)$ والمستقيم $(Delta)$'
						}
					]
				},
				{
					type: 'text',
					content:
						'2) $(v_n)$ المتتالية العددية المعرّفة على $bb(N)$ بـ: $v_n = frac(1 - u_n, 3 + u_n)$. \\\nأ) بيّن أنّ المتتالية $(v_n)$ هندسيّة أساسها $-frac(1, 3)$ ثمّ اكتب $v_n$ بدلالة $n$.',
					answer:
						'2) أ) من أجل كل $n in bb(N)$: $v_(n+1) = frac(1 - frac(3, u_n + 2), 3 + frac(3, u_n + 2)) = frac(u_n - 1, 3 u_n + 9) = -frac(1, 3) (frac(1 - u_n, 3 + u_n)) = -frac(1, 3) v_n$. \\\nفالمتتالية $(v_n)$ هندسية أساسها $q = -frac(1, 3)$ وحدّها الأول $v_0 = frac(1 - (-1), 3 + (-1)) = 1$، ومنه $v_n = (-frac(1, 3))^n$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'ب) استنتج كتابة $u_n$ بدلالة $n$ ثمّ احسب $lim_(n arrow.r +oo) u_n$.',
					answer:
						'ب) من $v_n = frac(1 - u_n, 3 + u_n)$ نجد $u_n = frac(1 - 3 v_n, 1 + v_n) = frac(1 - 3 (-frac(1, 3))^n, 1 + (-frac(1, 3))^n)$. \\\nوبما أنّ $-1 < -frac(1, 3) < 1$ فإنّ $lim_(n arrow.r +oo) (-frac(1, 3))^n = 0$، ومنه $lim_(n arrow.r +oo) u_n = 1$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'3) احسب بدلالة $n$ كلّاً من $S_n$ و $T_n$ حيث: $S_n = v_0 + v_1 + ... + v_n$ و $T_n = ln|v_0| + ln|v_1| + ... + ln|v_n|$.',
					answer:
						'3) حساب المجموعين:\n- $S_n = frac(1 - (-frac(1, 3))^(n+1), 1 + frac(1, 3)) = frac(3, 4) (1 - (-frac(1, 3))^(n+1))$.\n- لدينا $ln|v_k| = ln((frac(1, 3))^k) = -k ln 3$، ومنه $T_n = -(0 + 1 + ... + n) ln 3 = -frac(1, 2) n (n + 1) ln 3$.',
					mark: '1'
				}
			]
		},
		{
			id: 'bac_2025_se_ex3',
			num: 'الثالث',
			points: 5,
			content: [
				{
					type: 'text',
					content:
						'1) حلّ في مجموعة الأعداد المركّبة $bb(C)$ المعادلة ذات المجهول $z$ الآتية: $(i z + 2)(z^2 + 2 sqrt(3) z + 4) = 0$.',
					answer:
						'1) المعادلة تكافئ $i z + 2 = 0$ (أي $z_0 = 2 i$) أو $z^2 + 2 sqrt(3) z + 4 = 0$. \\\nمميز المعادلة الثانية: $Delta = 12 - 16 = -4 = (2 i)^2$، وجذراها $-sqrt(3) - i$ و $-sqrt(3) + i$. \\\nمجموعة الحلول في $bb(C)$: $S = {2 i ; -sqrt(3) - i ; -sqrt(3) + i}$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content: `2) المستوي المركّب منسوب إلى المعلم المتعامد والمتجانس $(O ; arrow(u), arrow(v))$ و $A$، $B$، $C$ نقط من المستوي لاحقاتها على التّرتيب $z_A$، $z_B$ و $z_C$ حيث: $z_A = 2 i$، $z_B = -sqrt(3) + i$ و ${mathInline('z_C = overline(z_B)')}. \\\nأ) اكتب كلّاً من $z_A$، $z_B$ و $z_C$ على الشّكل المثلّثي.`,
					answer: `2) أ) الكتابة على الشّكل المثلّثي:
- $z_A = 2 (cos frac(pi, 2) + i sin frac(pi, 2))$.
- $z_B = 2 (cos frac(5 pi, 6) + i sin frac(5 pi, 6))$.
- ${mathInline('z_C = overline(z_B)')} $= -sqrt(3) - i = 2 (cos frac(7 pi, 6) + i sin frac(7 pi, 6))$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'ب) استنتج أنّ النقط $A$، $B$ و $C$ تنتمي إلى نفس الدّائرة التي يُطلب تعيين مركزها ونصف قطرها.',
					answer:
						'ب) لدينا $|z_A| = |z_B| = |z_C| = 2$ أي $O A = O B = O C = 2$، ومنه النقط $A$، $B$ و $C$ تنتمي إلى الدّائرة التي مركزها المبدأ $O$ ونصف قطرها $2$.',
					mark: '0.75'
				},
				{
					type: 'text',
					content: 'ج) حدّد طبيعة المثلّث $A B C$ ثمّ عيّن لاحقة مركز ثقله.',
					answer:
						'ج) لدينا $A B = |z_B - z_A| = |-sqrt(3) - i| = 2$، $B C = |z_C - z_B| = |-2 i| = 2$، و $A C = |z_C - z_A| = |-sqrt(3) - 3 i| = 2 sqrt(3)$، فالمثلّث $A B C$ متساوي الساقين رأسه الأساسي $B$. \\\nلاحقة مركز ثقله: $z_G = frac(z_A + z_B + z_C, 3) = frac(-2 sqrt(3), 3) + frac(2, 3) i$.',
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'3) $z$ عدد مركّب حيث: $z = (cos theta + i sin theta) z_A$ و $theta$ عدد حقيقي مع $0 < theta < frac(pi, 2)$. \\\n— عيّن قيمة $theta$ بحيث يكون $frac(5 pi, 6)$ عمدة للعدد $z$.',
					answer:
						'3) لدينا $arg(z) = theta + frac(pi, 2) + 2 k pi$ ($k in bb(Z)$). وبما أنّ $0 < theta < frac(pi, 2)$ فإنّ $theta + frac(pi, 2) = frac(5 pi, 6)$، أي $theta = frac(pi, 3)$.',
					mark: '0.5'
				}
			]
		},
		{
			id: 'bac_2025_se_ex4',
			customTitle: 'التمرين الرابع: المسألة الشاملة',
			points: 7,
			instruction:
				'$f$ الدّالة المعرّفة على $bb(R)$ بـ: $f(x) = e^(2 x) - e^x - x - 2$، $(C_f)$ تمثيلها البياني في المستوي المنسوب إلى المعلم المتعامد والمتجانس $(O ; arrow(i), arrow(j))$ (وحدة الطول $2 upright(c) upright(m)$).',
			content: [
				{
					type: 'text',
					content:
						'1) أ) احسب $lim_(x arrow.r -oo) f(x)$ وبيّن أنّ: $lim_(x arrow.r +oo) f(x) = +oo$. \\\nب) بيّن أنّ المستقيم $(Delta)$ ذا المعادلة: $y = -x - 2$ مقارب مائل للمنحني $(C_f)$ عند $-oo$. \\\nج) ادرس الوضع النّسبي للمنحني $(C_f)$ والمستقيم $(Delta)$.',
					answer:
						'1) أ) عند $-oo$: $lim_(x arrow.r -oo) e^(2 x) = lim_(x arrow.r -oo) e^x = 0$ ومنه $lim_(x arrow.r -oo) f(x) = +oo$. \\\nوعند $+oo$: $f(x) = e^x (e^x - 1 - frac(x, e^x)) - 2$، وبالتزايد المقارن $lim_(x arrow.r +oo) frac(x, e^x) = 0$ ومنه $lim_(x arrow.r +oo) f(x) = +oo$. \\\nب) لدينا $lim_(x arrow.r -oo) [f(x) - (-x - 2)] = lim_(x arrow.r -oo) (e^(2 x) - e^x) = 0$، فالمستقيم $(Delta): y = -x - 2$ مقارب مائل لـ $(C_f)$ عند $-oo$. \\\nج) من أجل كل $x in bb(R)$: $f(x) - (-x - 2) = e^x (e^x - 1)$:\n- لمّا $x < 0$: $(C_f)$ أسفل $(Delta)$؛ ولمّا $x > 0$: $(C_f)$ أعلى $(Delta)$؛ ولمّا $x = 0$: يتقاطعان في $A(0 ; -2)$.',
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'2) أ) بيّن أنّه: من أجل كلّ عدد حقيقي $x$، $f\'(x) = (e^x - 1)(2 e^x + 1)$. \\\nب) استنتج اتّجاه تغيّر الدّالة $f$ ثمّ شكّل جدول تغيّراتها.',
					answer: `2) أ) من أجل كل $x in bb(R)$: $f'(x) = 2 e^(2 x) - e^x - 1 = (e^x - 1)(2 e^x + 1)$. \\\nب) بما أنّ $2 e^x + 1 > 0$ فإنّ إشارة $f'(x)$ من إشارة $(e^x - 1)$: فالدالة $f$ متناقصة تماماً على $]-oo ; 0]$ ومتزايدة تماماً على $[0 ; +oo[$، وقيمتها الحدية الصغرى $f(0) = -2$.
#align(center)[#image("/static${ex4VarSolUrl}", width: 54%)]`,
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'3) بيّن أنّ المنحني $(C_f)$ يقبل مماسا $(T)$ موازيا لـ $(Delta)$، يُطلب تعيين معادلة له.',
					answer:
						'3) حلّ المعادلة $f\'(x) = -1$ يكافئ $e^x (2 e^x - 1) = 0$ أي $e^x = frac(1, 2) arrow.l.r.double x = -ln 2$. وبما أنّ $f(-ln 2) = ln 2 - frac(9, 4)$ فمعادلة المماس $(T)$ هي: $y = -x - frac(9, 4)$.',
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'4) أثبت أنّ للمعادلة $f(x) = 0$ حلّين فقط $alpha$ و $beta$ ثمّ تحقّق أنّ: $-2.2 < alpha < -2.1$ و $0.8 < beta < 0.9$.',
					answer:
						'4) الدالة $f$ مستمرة على $bb(R)$ ورتيبة تماماً على كلّ من المجالين $]-oo ; 0]$ و $[0 ; +oo[$ وصورة كلّ منهما $[-2 ; +oo[$ التي تحوي $0$، فالمعادلة $f(x) = 0$ تقبل حلّين فقط $alpha$ و $beta$ في $bb(R)$. \\\nوبما أنّ $f(-2.2) times f(-2.1) < 0$ فإنّ $-2.2 < alpha < -2.1$، وبما أنّ $f(0.8) times f(0.9) < 0$ فإنّ $0.8 < beta < 0.9$.',
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'5) بيّن أنّ المنحني $(C_f)$ يقبل نقطة انعطاف، يُطلب تعيين إحداثييها.',
					answer:
						'5) من أجل كل $x in bb(R)$: $f\'\'(x) = e^x (4 e^x - 1)$، تنعدم وتغيّر إشارتها عند $x = -ln 4$. ومنه النقطة $B(-ln 4 ; -frac(35, 16) + ln 4)$ هي نقطة انعطاف للمنحني $(C_f)$.',
					mark: '0.5'
				},
				{
					type: 'text',
					content:
						'6) أ) ارسم كلّاً من $(Delta)$، $(T)$ و $(C_f)$. \\\nب) ناقش بيانيا وحسب قيم العدد الحقيقي $m$ عدد حلول المعادلة: $e^(2 x) - e^x - m - 2 = 0$.',
					answer: `6) أ) إنشاء كلّ من $(Delta)$، $(T)$ و $(C_f)$:
#align(center)[#image("/static${ex4CfSolUrl}", width: 58%)]
ب) المعادلة تكافئ $f(x) = -x + m$ (مناقشة مائلة بموازاة $(Delta)$ و $(T)$):
- لمّا $m < -frac(9, 4)$: لا توجد حلول.
- لمّا $m = -frac(9, 4)$ أو $m >= -2$: يوجد حلّ واحد.
- لمّا $-frac(9, 4) < m < -2$: يوجد حلّان مختلفان.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'7) احسب بالسّنتيمتر المربّع $cal(A)$ مساحة الحيّز المستوي المحدّد بالمنحني $(C_f)$ والمستقيمات التي معادلاتها: $y = -x - 2$، $x = -1$ و $x = 0$.',
					answer:
						'7) على $[-1 ; 0]$ المنحني $(C_f)$ أسفل $(Delta)$ ووحدة المساحة $4 upright(c) upright(m)^2$: \\\n$cal(A) = 4 integral_(-1)^0 [(-x - 2) - f(x)] dif x = 4 integral_(-1)^0 (e^x - e^(2 x)) dif x = 4 [e^x - frac(1, 2) e^(2 x)]_(-1)^0 = (2 - frac(4, e) + frac(2, e^2)) upright(c) upright(m)^2$.',
					mark: '0.5'
				}
			]
		}
	];

	return buildRecord('2025', exercises);
}

export function buildOfficialBac3asSe(): OfficialBacPaperRecord[] {
	return [buildBac2023Se(), buildBac2024Se(), buildBac2025Se()];
}
