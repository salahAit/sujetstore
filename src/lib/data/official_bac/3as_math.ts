import type { ExamDocument, ExamMetadata, ExerciseBlock } from '../../modules/SujetBuilder/types';
import { saveSvgAsset } from '../../modules/MathTemplates/svg-helpers';
import {
	svgCobwebSequencePlot,
	svgFunctionCurvePlot,
	svgProbabilityTree,
	svgVariationTable
} from '../../modules/MathTemplates/svg-secondary';
import type { OfficialBacPaperRecord } from './types';

function buildMetadata(year: '2023' | '2024' | '2025'): ExamMetadata {
	return {
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي',
		streamId: 'MATH',
		streamName: 'رياضيات',
		subjectId: 'MAT-MATH',
		subjectName: 'الرياضيات',
		trimesterId: 't3',
		trimesterName: 'دورة بكالوريا رسمية',
		docType: 'exam',
		academicYear: year,
		duration: '04 ساعات و30 دقيقة',
		coefficient: 7,
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
		slug: `bac-${year}-3as-math-math`,
		grade: '3as_math',
		yearSubjectId: 702,
		streamId: 'MATH',
		streamNameAr: 'رياضيات',
		academicYear: year,
		sessionAr: 'دورة جوان ' + year,
		coefficient: 7,
		duration: '04 ساعات و30 دقيقة',
		titleAr: `بكالوريا رسمية في الرياضيات — شعبة رياضيات (دورة جوان ${year} - الموضوع الأول)`,
		sourcePdfRelPath: `pipeline/references/3as_math/03_bac_official_archive/bac_math_${year}_sujet.pdf`,
		sourceSolutionPdfRelPath: `pipeline/references/3as_math/03_bac_official_archive/bac_math_${year}_correction.pdf`,
		examDoc
	};
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. دورة جوان 2023 — شعبة رياضيات — الموضوع الأول
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2023Math(): OfficialBacPaperRecord {
	const ex2CurveSubjUrl = saveSvgAsset(
		'bac_2023_math_ex2_curve_subj',
		svgFunctionCurvePlot({
			xMin: -0.6,
			xMax: 5,
			yMin: -0.6,
			yMax: 5,
			fn: (x) => (x >= -0.05 ? (x + 4) / (x + 1) : Number.NaN),
			curveLabel: '(Cf)',
			asymptotes: [{ kind: 'oblique', a: 1, b: 0, label: '(D): y = x', color: '#334155' }],
			width: 310,
			height: 240
		})
	);

	const ex2CobwebSolUrl = saveSvgAsset(
		'bac_2023_math_ex2_cobweb_sol',
		svgCobwebSequencePlot({
			xMin: 0,
			xMax: 4.5,
			yMin: 0,
			yMax: 4.5,
			fn: (x) => (x + 4) / (x + 1),
			u0: 0,
			steps: 3,
			fixedPoint: 2
		})
	);

	const ex4GVarSolUrl = saveSvgAsset(
		'bac_2023_math_ex4_g_var_sol',
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
				{ value: '1', position: 'bottom' }
			],
			fnName: 'g(x)',
			derivName: "g'(x)"
		})
	);

	const ex4FVarSolUrl = saveSvgAsset(
		'bac_2023_math_ex4_f_var_sol',
		svgVariationTable({
			xValues: ['-∞', '-α', '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '+' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '-' }
			],
			variations: [
				{ value: '-∞', position: 'bottom' },
				{ value: 'f(-α)', position: 'top' },
				{ value: '-∞', position: 'bottom' }
			],
			fnName: 'f(x)',
			derivName: "f'(x)"
		})
	);

	const yTan2023 = 0.5 + 1.5 * Math.exp(-1);
	const ex4CfSolUrl = saveSvgAsset(
		'bac_2023_math_ex4_cf_sol',
		svgFunctionCurvePlot({
			xMin: -3,
			xMax: 0.8,
			yMin: -2.2,
			yMax: 2.2,
			fn: (x) => (x <= 0.5 ? x + 1 - 3 * x * Math.exp(2 * x) : Number.NaN),
			curveLabel: '(Cf)',
			asymptotes: [{ kind: 'oblique', a: 1, b: 1, label: '(Δ): y = x + 1', color: '#dc2626' }],
			tangents: [{ x: -0.5, y: yTan2023, slope: 1, halfSpan: 1.8, color: '#059669' }],
			points: [
				{ x: 0, y: 1, label: '(0;1)', color: '#0f172a' },
				{ x: -0.258, y: 1.204, label: '(-α;f(-α))', color: '#7c3aed' }
			],
			shadedIntegral: { a: -0.258, b: 0 },
			width: 360,
			height: 250
		})
	);

	const exercises: ExerciseBlock[] = [
		{
			id: 'bac_2023_math_ex1',
			num: 'الأول',
			points: 4,
			instruction:
				'يحتوي كيس على $10$ كريات متماثلة ولا نفرّق بينها باللّمس، منها كريتان حمراوان مرقمتان بـ: $2 ، -3$ وخمس كريات بيضاء مرقمة بـ: $0 ، 1 ، 1 ، 2 ، -2$ وثلاث كريات خضراء مرقمة بـ: $0 ، 1 ، 2$. نسحب عشوائيا وفي آن واحد ثلاث كريات من الكيس ونعتبر الحوادث $A$، $B$، $C$ الآتية:\n$A$: "الحصول على $3$ كريات من نفس اللون"، $B$: "الحصول على الألوان الثلاثة"، $C$: "الحصول على $3$ كريات مجموع أرقامها معدوم".',
			content: [
				{
					type: 'text',
					content: '1) أ) احسب $P(A)$ و $P(B)$ ثمّ بيّن أنّ: $P(C) = frac(3, 20)$.',
					answer:
						'1) أ) عدد الحالات الممكنة لسحب $3$ كريات في آن واحد من $10$ هو $C_(10)^3 = 120$:\n- حساب $P(A)$ (ثلاث كريات بيضاء أو ثلاث خضراء، لاستحالة سحب $3$ حمراء): $P(A) = frac(C_5^3 + C_3^3, C_(10)^3) = frac(10 + 1, 120) = frac(11, 120)$.\n- حساب $P(B)$ (كرية من كل لون): $P(B) = frac(C_5^1 times C_3^1 times C_2^1, C_(10)^3) = frac(30, 120) = frac(1, 4)$.\n- تبيان أنّ $P(C) = frac(3, 20)$: يكون مجموع الأرقام معدوماً في الحالات ${0 ; 2 ; -2}$ (لدينا كريتان تحملان $0$، ثلاث تحمل $2$، وواحدة تحمل $-2$)، أو ${1 ; 1 ; -2}$ (ثلاث تحمل $1$ وواحدة تحمل $-2$)، أو ${-3 ; 1 ; 2}$ (واحدة تحمل $-3$، ثلاث تحمل $1$، وثلاث تحمل $2$):\n$P(C) = frac(C_2^1 times C_3^1 times C_1^1 + C_3^2 times C_1^1 + C_1^1 times C_3^1 times C_3^1, C_(10)^3) = frac(6 + 3 + 9, 120) = frac(18, 120) = frac(3, 20)$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content: 'ب) احسب $P(A ∩ C)$ ثم استنتج $P_C (A)$.',
					answer:
						'ب) الحادثة $A ∩ C$: الكريات من نفس اللون ومجموع أرقامها معدوم، وتتحقّق فقط بسحب $3$ كريات بيضاء أرقامها ${0 ; 2 ; -2}$ أو ${1 ; 1 ; -2}$:\n$P(A ∩ C) = frac(C_1^1 times C_1^1 times C_1^1 + C_2^2 times C_1^1, C_(10)^3) = frac(1 + 1, 120) = frac(1, 60)$.\nومنه الاحتمال الشرطي: $P_C (A) = frac(P(A ∩ C), P(C)) = frac(frac(1, 60), frac(3, 20)) = frac(1, 9)$.',
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'2) نعتبر المتغيّر العشوائي $X$ الذي يرفق بكلّ عملية سحب لثلاث كريات عدد الألوان المتحصّل عليها.\nعيّن قانون الاحتمال للمتغيّر العشوائي $X$ ثمّ احسب أمله الرياضياتي $E(X)$.',
					answer: `2) مجموعة قيم المتغيّر العشوائي $X$ هي $ {1 ; 2 ; 3} $:
$P(X = 1) = P(A) = frac(11, 120)$، $P(X = 3) = P(B) = frac(30, 120)$، و $P(X = 2) = 1 - P(X = 1) - P(X = 3) = frac(79, 120)$.
#align(center)[#table(columns: 4, align: center + horizon, inset: 5pt, [$x_i$], [$1$], [$2$], [$3$], [$P(X = x_i)$], [$frac(11, 120)$], [$frac(79, 120)$], [$frac(30, 120)$])]
الأمل الرياضياتي: $E(X) = 1 times frac(11, 120) + 2 times frac(79, 120) + 3 times frac(30, 120) = frac(259, 120)$.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'3) نسحب الآن عشوائيا من الكيس ثلاث كريات على التوالي وبإرجاع.\nاحسب احتمال الحصول على ثلاث كريات جُداء أرقامها معدوم.',
					answer:
						'3) عدد القوائم الممكنة هو $10^3 = 1000$. الحدث المعاكس هو "عدم ظهور الرقم $0$ في السحبات الثلاث" (السحب من بين $8$ كريات أرقامها غير معدومة)، واحتماله $P\' = frac(8^3, 10^3)$.\nومنه الاحتمال المطلوب هو: $P = 1 - P\' = 1 - frac(8^3, 10^3) = 1 - frac(64, 125) = frac(61, 125)$.',
					mark: '0.5'
				}
			]
		},
		{
			id: 'bac_2023_math_ex2',
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
								'1) $f$ الدّالة المعرّفة على $[0 ; +oo[$ بـ: $f(x) = frac(x + 4, x + 1)$، و $(C_f)$ تمثيلها البياني في المستوي المنسوب إلى المعلم المتعامد والمتجانس $(O ; arrow(i), arrow(j))$، و $(D)$ المستقيم ذو المعادلة $y = x$.\n$(u_n)$ المتتالية العددية المعرّفة بـ: $u_0 = 0$ ومن أجل كلّ عدد طبيعي $n$، $u_(n+1) = f(u_n)$.\nأ) أعد رسم الشكل على ورقة الإجابة ثمّ مثّل على حامل محور الفواصل الحدود $u_0$، $u_1$، $u_2$ و $u_3$ (دون حسابها مبرزا خطوط التمثيل).\nب) ضع تخمينا حول اتجاه تغيّر المتتالية $(u_n)$ وتقاربها.',
							answer: `1) أ) تمثيل الحدود $u_0$، $u_1$، $u_2$، $u_3$ على حامل محور الفواصل انطلاقاً من $u_0 = 0$ بالإسقاط المتتالي على $(C_f)$ ثمّ $(D): y = x$ (تظهر بالترتيب $u_0 < u_2 < 2 < u_3 < u_1$):
#align(center)[#image("/static${ex2CobwebSolUrl}", width: 78%)]
ب) التخمين: المتتالية $(u_n)$ ليست رتيبة، وهي متقاربة نحو العدد $2$.`,
							mark: '1'
						},
						{
							type: 'image',
							src: ex2CurveSubjUrl,
							caption: 'المنحني $(C_f)$ والمستقيم $(D)$'
						}
					]
				},
				{
					type: 'text',
					content:
						'2) $(v_n)$ المتتالية العددية المعرّفة على $bb(N)$ بـ: $v_n = frac(u_n - 2, u_n + 2)$.\nأ) بيّن أنّ المتتالية $(v_n)$ هندسية أساسها $-frac(1, 3)$ يُطلب تعيين حدّها الأول $v_0$.',
					answer:
						'2) أ) من أجل كلّ عدد طبيعي $n$:\n$v_(n+1) = frac(u_(n+1) - 2, u_(n+1) + 2) = frac(frac(u_n + 4, u_n + 1) - 2, frac(u_n + 4, u_n + 1) + 2) = frac(-u_n + 2, 3 u_n + 6) = -frac(1, 3) (frac(u_n - 2, u_n + 2)) = -frac(1, 3) v_n$.\nفالمتتالية $(v_n)$ هندسية أساسها $q = -frac(1, 3)$ وحدّها الأول $v_0 = frac(u_0 - 2, u_0 + 2) = -1$.',
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'ب) عيّن عبارة الحدّ العام $v_n$ بدلالة $n$ ثمّ استنتج أنّه: من أجل كلّ عدد طبيعي $n$، $u_n = -2 + frac(4, 1 + (-frac(1, 3))^n)$.\nجـ) احسب $lim_(n arrow.r +oo) u_n$.',
					answer:
						'ب) من أجل كلّ عدد طبيعي $n$: $v_n = v_0 times q^n = -(-frac(1, 3))^n$.\nولدينا $v_n = frac(u_n - 2, u_n + 2) = 1 - frac(4, u_n + 2)$ ومنه $frac(4, u_n + 2) = 1 - v_n$، أي:\n$u_n = -2 + frac(4, 1 - v_n) = -2 + frac(4, 1 + (-frac(1, 3))^n)$.\nجـ) بما أنّ $-1 < -frac(1, 3) < 1$ فإنّ $lim_(n arrow.r +oo) (-frac(1, 3))^n = 0$، ومنه $lim_(n arrow.r +oo) u_n = 2$.',
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'3) نضع: من أجل كلّ عدد طبيعي $n$، $S_n = v_0 + v_1 + ... + v_n$ و $T_n = frac(1, u_0 + 2) + frac(1, u_1 + 2) + ... + frac(1, u_n + 2)$.\nاحسب $S_n$ بدلالة $n$ ثمّ بيّن أنّه: من أجل كلّ عدد طبيعي $n$، $T_n = frac(1, 16) [4 n + 7 + (-frac(1, 3))^n]$.',
					answer:
						'3) مجموع حدود المتتالية الهندسية $(v_n)$:\n$S_n = v_0 frac(1 - q^(n+1), 1 - q) = -frac(1 - (-frac(1, 3))^(n+1), 1 + frac(1, 3)) = -frac(3, 4) [1 - (-frac(1, 3))^(n+1)]$.\nولدينا من أجل كلّ $k in bb(N)$: $frac(1, u_k + 2) = frac(1, 4)(1 - v_k)$، ومنه:\n$T_n = frac(1, 4) [(n + 1) - S_n] = frac(1, 4) [n + 1 + frac(3, 4) + frac(1, 4)(-frac(1, 3))^n] = frac(1, 16) [4 n + 7 + (-frac(1, 3))^n]$.',
					mark: '1'
				}
			]
		},
		{
			id: 'bac_2023_math_ex3',
			num: 'الثالث',
			points: 5,
			content: [
				{
					type: 'text',
					content:
						'1) نعتبر المعادلة $(E) : 16 x + 361 y = 818$ ذات المجهولين الصحيحين $x$ و $y$.\nأ) تحقّق أنّ الثنائية $(6 ; 2)$ حلّ للمعادلة $(E)$ ثمّ استنتج مجموعة حلولها.',
					answer:
						'1) أ) لدينا $16 times 6 + 361 times 2 = 96 + 722 = 818$، فالثنائية $(6 ; 2)$ حلّ للمعادلة $(E)$.\nبطرح المعادلتين طرفاً لطرف نجد: $16 (x - 6) = 361 (2 - y)$.\nبما أنّ $"PGCD"(16 ; 361) = 1$ (لأنّ $16 = 2^4$ و $361 = 19^2$)، فحسب مبرهنة غوص $361$ يقسم $(x - 6)$ أي $x = 361 k + 6$ ($k in bb(Z)$)، ومنه $2 - y = 16 k$ أي $y = -16 k + 2$.\nعكسياً تتحقّق المعادلة، إذن مجموعة الحلول هي $S = {(361 k + 6 ; -16 k + 2) / k in bb(Z)}$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'ب) عيّن كلّ الثنائيات $(x ; y)$ حلول المعادلة $(E)$ التي تحقّق: $abs(x + 23 y) <= 4$.',
					answer:
						'ب) بتعويض $x = 361 k + 6$ و $y = -16 k + 2$ في المتراجحة $abs(x + 23 y) <= 4$ نجد:\n$abs(-7 k + 52) <= 4 arrow.l.r.double -4 <= -7 k + 52 <= 4 arrow.l.r.double frac(48, 7) <= k <= 8$ (حيث $frac(48, 7) approx 6.85$).\nوبما أنّ $k in bb(Z)$ فإنّ $k in {7 ; 8}$، ومنه الثنائيتان هما $(2533 ; -110)$ و $(2894 ; -126)$.',
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'2) $P$ عدد طبيعي يُكتب $bar(5 alpha beta 0)$ في نظام التعداد الذي أساسه $7$ ويُكتب $bar(beta alpha 8 7)$ في نظام التعداد الذي أساسه $9$ حيث $alpha$ و $beta$ عددان طبيعيان.\nعيّن $alpha$ و $beta$ ثمّ اكتب $P$ في النظام العشري.',
					answer:
						'2) يشترط في التعداد أن يكون $0 <= alpha <= 6$ و $0 < beta <= 6$. بالنشر في النظام العشري:\n$P = 5 times 7^3 + 49 alpha + 7 beta = 1715 + 49 alpha + 7 beta$، و $P = 729 beta + 81 alpha + 8 times 9 + 7 = 79 + 81 alpha + 729 beta$.\nالمساواة $1715 + 49 alpha + 7 beta = 79 + 81 alpha + 729 beta$ تكافئ $32 alpha + 722 beta = 1636$ أي $16 alpha + 361 beta = 818$.\nمن السؤال (1) نجد $alpha = 361 k + 6$ و $beta = -16 k + 2$ ($k in bb(Z)$)، ومع الشرطين $0 <= alpha <= 6$ و $0 < beta <= 6$ نجد $k = 0$، أي $alpha = 6$ و $beta = 2$.\nومنه في النظام العشري: $P = 1715 + 49 times 6 + 7 times 2 = 2023$.',
					mark: '2'
				},
				{
					type: 'text',
					content:
						'3) أ) حلّل العدد $2023$ إلى جُداء عوامل أوّلية ثمّ عيّن الأعداد الطبيعية التي مربع كلّ منها يقسم $2023$.\nب) نضع: $d = "PGCD"(a ; b)$ و $m = "PPCM"(a ; b)$. عيّن كلّ الثنائيات $(a ; b)$ من الأعداد الطبيعية التي تحقّق: $m^2 + 3 d^2 = 2023$.',
					answer:
						'3) أ) تحليل العدد $2023$: $2023 = 7 times 17^2$. الأعداد الطبيعية التي يقسم مربع كلّ منها $2023$ هي $1$ و $17$.\nب) نضع $a = d a\'$ و $b = d b\'$ مع $"PGCD"(a\' ; b\') = 1$ و $m = d a\' b\'$. تصبح المعادلة $d^2 [(a\' b\')^2 + 3] = 2023$، أي $d^2$ يقسم $2023$ ومنه $d in {1 ; 17}$:\n- من أجل $d = 1$: نجد $(a\' b\')^2 = 2020$ أي $a\' b\' = sqrt(2020)$ (غير ممكن في $bb(N)$).\n- من أجل $d = 17$: نجد $(a\' b\')^2 + 3 = 7$ أي $a\' b\' = 2$، ومع $"PGCD"(a\' ; b\') = 1$ نجد $(a\' ; b\') in {(1 ; 2) , (2 ; 1)}$، ومنه الثنائيتان هما $(17 ; 34)$ و $(34 ; 17)$.',
					mark: '1.25'
				}
			]
		},
		{
			id: 'bac_2023_math_ex4',
			customTitle: 'التمرين الرابع: المسألة الشاملة',
			points: 7,
			content: [
				{
					type: 'text',
					content:
						'*I)* $g$ الدّالة المعرّفة على $bb(R)$ بـ: $g(x) = 1 + (6 x - 3) e^(-2 x)$.\n1) أ) احسب $lim_(x arrow.r -oo) g(x)$ و $lim_(x arrow.r +oo) g(x)$.\nب) ادرس اتجاه تغيّر الدّالة $g$ ثمّ شكّل جدول تغيّراتها.',
					answer: `*I)* 1) أ) $lim_(x arrow.r -oo) g(x) = -oo$ (لأنّ $6 x - 3 arrow.r -oo$ و $e^(-2 x) arrow.r +oo$)، و $lim_(x arrow.r +oo) g(x) = 1$ (بالتزايد المقارن $lim_(x arrow.r +oo) x e^(-2 x) = 0$).
ب) من أجل كلّ عدد حقيقي $x$: $g'(x) = 6 e^(-2 x) - 2 (6 x - 3) e^(-2 x) = -12 (x - 1) e^(-2 x)$.
الدّالة $g$ متزايدة تماما على $]-oo ; 1]$ ومتناقصة تماما على $[1 ; +oo[$، و $g(1) = 1 + 3 e^(-2)$:
#align(center)[#image("/static${ex4GVarSolUrl}", width: 56%)]`,
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'2) أ) أثبت أنّ المعادلة $g(x) = 0$ تقبل حلا وحيدا $alpha$ حيث $0.2 < alpha < 0.3$.\nب) استنتج حسب قيم $x$ إشارة $g(x)$.',
					answer: `2) أ) الدّالة $g$ مستمرة ومتزايدة تماما على $[0.2 ; 0.3] subset ]-oo ; 1]$، ولدينا $g(0.2) approx -0.21 < 0$ و $g(0.3) approx 0.34 > 0$ أي $g(0.2) times g(0.3) < 0$، وعلى $[1 ; +oo[$ لدينا $g(x) > 1 > 0$. إذن حسب مبرهنة القيم المتوسطة تقبل المعادلة $g(x) = 0$ حلا وحيدا $alpha$ حيث $0.2 < alpha < 0.3$.
ب) إشارة $g(x)$ حسب قيم $x$: سالبة تماماً على $]-oo ; alpha[$، وتنعدم عند $alpha$، وموجبة تماماً على $]alpha ; +oo[$.`,
					mark: '0.5'
				},
				{
					type: 'text',
					content:
						'*II)* $f$ الدّالة المعرّفة على $bb(R)$ بـ: $f(x) = x + 1 - 3 x e^(2 x)$.\n$(C_f)$ تمثيلها البياني في المستوي المنسوب إلى المعلم المتعامد والمتجانس $(O ; arrow(i), arrow(j))$ (وحدة الطول $2 upright(c) upright(m)$).\n1) أ) احسب $lim_(x arrow.r -oo) f(x)$ و $lim_(x arrow.r +oo) f(x)$.\nب) بيّن أنّ المستقيم $(Delta)$ ذا المعادلة $y = x + 1$ مقارب مائل لـ $(C_f)$ عند $-oo$.\nجـ) ادرس وضعية $(C_f)$ بالنسبة إلى $(Delta)$.',
					answer:
						'*II)* 1) أ) $lim_(x arrow.r -oo) f(x) = -oo$ لأنّ $lim_(x arrow.r -oo) x e^(2 x) = 0$؛ وعند $+oo$: $lim_(x arrow.r +oo) f(x) = lim_(x arrow.r +oo) x (1 + frac(1, x) - 3 e^(2 x)) = -oo$.\nب) $lim_(x arrow.r -oo) [f(x) - (x + 1)] = lim_(x arrow.r -oo) (-3 x e^(2 x)) = 0$، فالمستقيم $(Delta) : y = x + 1$ مقارب مائل لـ $(C_f)$ عند $-oo$.\nجـ) إشارة $f(x) - (x + 1) = -3 x e^(2 x)$ من إشارة $(-x)$:\n- على $]-oo ; 0[$ يكون $(C_f)$ أعلى $(Delta)$، وعلى $]0 ; +oo[$ يكون $(C_f)$ أسفل $(Delta)$، ويقطع $(C_f)$ المستقيم $(Delta)$ في النقطة $(0 ; 1)$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'2) أ) بيّن أنّه: من أجل كلّ عدد حقيقي $x$، $f\'(x) = g(-x)$.\nب) استنتج أنّ $f$ متزايدة تماما على $]-oo ; -alpha]$ ومتناقصة تماما على $[-alpha ; +oo[$ ثمّ شكّل جدول تغيّراتها.',
					answer: `2) أ) من أجل كلّ عدد حقيقي $x$: $f'(x) = 1 - 3 e^(2 x) - 6 x e^(2 x) = 1 + (-6 x - 3) e^(2 x) = g(-x)$.
ب) إشارة $f'(x)$ من نفس إشارة $g(-x)$: يكون $g(-x) >= 0 arrow.l.r.double -x >= alpha arrow.l.r.double x <= -alpha$. إذن $f$ متزايدة تماما على $]-oo ; -alpha]$ ومتناقصة تماما على $[-alpha ; +oo[$:
#align(center)[#image("/static${ex4FVarSolUrl}", width: 56%)]`,
					mark: '1'
				},
				{
					type: 'text',
					content:
						'3) أ) أثبت أنّ $(C_f)$ يقبل مماسا $(T)$ يوازي $(Delta)$ يُطلب تعيين معادلة له.\nب) ارسم $(Delta)$، $(T)$ و $(C_f)$ على $]-oo ; frac(1, 2)]$ (نأخذ: $f(0.25) approx 0$، $f(-1.3) approx 0$ و $f(-alpha) approx 1.2$).\nجـ) عيّن بيانيا قيم الوسيط الحقيقي $m$ التي من أجلها تقبل المعادلة $f(x) = x + m$ حلّين بالضبط.',
					answer: `3) أ) $f'(x) = 1$ يكافئ $g(-x) = 1$ أي $(-6 x - 3) e^(2 x) = 0$ ومنه $x = -frac(1, 2)$. معادلة المماس $(T)$ عندئذ هي: $y = x + 1 + frac(3, 2) e^(-1)$.
ب) رسم $(Delta)$، $(T)$ والمنحني $(C_f)$ على $]-oo ; frac(1, 2)]$:
#align(center)[#image("/static${ex4CfSolUrl}", width: 58%)]
جـ) مجموعة قيم الوسيط الحقيقي $m$ التي من أجلها تقبل المعادلة $f(x) = x + m$ حلّين بالضبط هي: $m in ]1 ; 1 + frac(3, 2) e^(-1)[$.`,
					mark: '1.75'
				},
				{
					type: 'text',
					content:
						'4) أ) باستعمال المكاملة بالتجزئة، احسب العدد الحقيقي $integral_(-alpha)^0 x e^(2 x) dif x$.\nب) استنتج بالسنتيمتر المربّع المساحة $cal(A)$ للحيّز المستوي المحدّد بـ $(C_f)$ والمستقيمات التي معادلاتها $y = x + 1$، $x = -alpha$ و $x = 0$.\nجـ) تحقّق أنّ $cal(A) = 2 (frac(4 alpha - 1, 2 alpha - 1)) upright(c) upright(m)^2$.',
					answer:
						'4) أ) بوضع $u(x) = x$ و $v\'(x) = e^(2 x)$ ($v(x) = frac(1, 2) e^(2 x)$):\n$integral_(-alpha)^0 x e^(2 x) dif x = [frac(1, 4)(2 x - 1) e^(2 x)]_(-alpha)^0 = frac(1, 4)(2 alpha + 1) e^(-2 alpha) - frac(1, 4)$.\nب) على $[-alpha ; 0]$ يقع $(C_f)$ أعلى $(Delta)$، ووحدة المساحة $4 upright(c) upright(m)^2$:\n$cal(A) = 4 integral_(-alpha)^0 [f(x) - (x + 1)] dif x = -12 integral_(-alpha)^0 x e^(2 x) dif x = [-3 (2 alpha + 1) e^(-2 alpha) + 3] upright(c) upright(m)^2$.\nجـ) من $g(alpha) = 0$ لدينا $e^(-2 alpha) = -frac(1, 3 (2 alpha - 1))$، وبالتعويض نجد: $cal(A) = (frac(2 alpha + 1, 2 alpha - 1) + 3) upright(c) upright(m)^2 = 2 (frac(4 alpha - 1, 2 alpha - 1)) upright(c) upright(m)^2$.',
					mark: '1'
				}
			]
		}
	];

	return buildRecord('2023', exercises);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. دورة جوان 2024 — شعبة رياضيات — الموضوع الأول
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2024Math(): OfficialBacPaperRecord {
	const ex1TreeSubjUrl = saveSvgAsset(
		'bac_2024_math_ex1_tree_subj',
		svgProbabilityTree({
			firstLevel: [
				{
					label: 'C1',
					probLabel: '...',
					children: [
						{ label: 'A', probLabel: '...' },
						{ label: 'B', probLabel: '...' }
					]
				},
				{
					label: 'C2',
					probLabel: '...',
					children: [
						{ label: 'A', probLabel: '...' },
						{ label: 'B', probLabel: '...' },
						{ label: 'D', probLabel: '...' }
					]
				},
				{
					label: 'C3',
					probLabel: '...',
					children: [
						{ label: 'A', probLabel: '...' },
						{ label: 'D', probLabel: '...' }
					]
				}
			]
		})
	);

	const ex1TreeSolUrl = saveSvgAsset(
		'bac_2024_math_ex1_tree_sol',
		svgProbabilityTree({
			firstLevel: [
				{
					label: 'C1',
					probLabel: '2/5',
					children: [
						{ label: 'A', probLabel: '2/3' },
						{ label: 'B', probLabel: '1/3' }
					]
				},
				{
					label: 'C2',
					probLabel: '1/5',
					children: [
						{ label: 'A', probLabel: '2/5' },
						{ label: 'B', probLabel: '1/15' },
						{ label: 'D', probLabel: '8/15' }
					]
				},
				{
					label: 'C3',
					probLabel: '2/5',
					children: [
						{ label: 'A', probLabel: '1/5' },
						{ label: 'D', probLabel: '4/5' }
					]
				}
			]
		})
	);

	const ex4GVarSubjUrl = saveSvgAsset(
		'bac_2024_math_ex4_g_var_subj',
		svgVariationTable({
			xValues: ['-∞', '1', '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '+' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '-' }
			],
			variations: [
				{ value: '16', position: 'bottom' },
				{ value: 'g(1)', position: 'top' },
				{ value: '-∞', position: 'bottom' }
			],
			fnName: 'g(x)',
			derivName: "g'(x)"
		})
	);

	const ex4FVarSolUrl = saveSvgAsset(
		'bac_2024_math_ex4_f_var_sol',
		svgVariationTable({
			xValues: ['-∞', 'α', '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '+' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '-' }
			],
			variations: [
				{ value: '-∞', position: 'bottom' },
				{ value: 'f(α)', position: 'top' },
				{ value: '1', position: 'bottom' }
			],
			fnName: 'f(x)',
			derivName: "f'(x)"
		})
	);

	const ex4CfSolUrl = saveSvgAsset(
		'bac_2024_math_ex4_cf_sol',
		svgFunctionCurvePlot({
			xMin: -2.2,
			xMax: 5,
			yMin: -2,
			yMax: 2.3,
			fn: (x) => (Math.exp(x) + 4 * x) / (Math.exp(x) + 4),
			curveLabel: '(Cf)',
			asymptotes: [
				{ kind: 'oblique', a: 1, b: 0, label: '(Δ): y = x', color: '#dc2626' },
				{ kind: 'horizontal', value: 1, label: '(D): y = 1', color: '#059669' }
			],
			points: [
				{ x: 1, y: 1, label: 'A(1;1)', color: '#0f172a' },
				{ x: 2.374, y: 1.387, label: '(α;f(α))', color: '#7c3aed' }
			],
			shadedIntegral: { a: 1, b: 2 },
			width: 370,
			height: 250
		})
	);

	const exercises: ExerciseBlock[] = [
		{
			id: 'bac_2024_math_ex1',
			num: 'الأول',
			points: 4,
			instruction:
				'يحتوي صندوق $U_1$ على $5$ بطاقات متماثلة مرقمة بـ: $1 ، 1 ، 2 ، 3 ، 3$ ويحتوي صندوق $U_2$ على $6$ كريّات متماثلة موزّعة كما يلي: $4$ كريات حمراء و $2$ خضراوان (لا نفرّق بين البطاقات ولا بين الكريّات باللّمس).\nنسحب عشوائيا بطاقة واحدة من الصندوق $U_1$: إذا تحصّلنا على الرقم $1$ نسحب عشوائيا من $U_2$ كريّة واحدة؛ وإذا تحصّلنا على الرقم $2$ نسحب عشوائيا من $U_2$ كريتين في آن واحد؛ وإذا تحصّلنا على الرقم $3$ نسحب عشوائيا من $U_2$ ثلاث كريّات في آن واحد.\nنعتبر الحوادث الآتية: $C_i$: "البطاقة المتحصّل عليها تحمل الرقم $i$" حيث $i in {1 ; 2 ; 3}$، $A$: "الحصول على كريّات حمراء فقط"، $B$: "الحصول على كريّات خضراء فقط"، $D$: "الحصول على كريّات ليست كلّها من نفس اللون".',
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content:
								'1) أ) بيّن أنّ: $P_(C_2) (B) = frac(1, 15)$ و $P_(C_3) (D) = frac(4, 5)$.\nب) انقل واملأ شجرة الاحتمالات المقابلة.',
							answer: `1) أ) عند تحقّق $C_2$ نسحب كريتين في آن واحد من $6$ ($C_6^2 = 15$): $P_(C_2) (B) = frac(C_2^2, C_6^2) = frac(1, 15)$.
وعند تحقّق $C_3$ نسحب $3$ كريات في آن واحد من $6$ ($C_6^3 = 20$): $P_(C_3) (D) = frac(C_4^2 times C_2^1 + C_4^1 times C_2^2, C_6^3) = frac(16, 20) = frac(4, 5)$.
ب) إتمام شجرة الاحتمالات ($P(C_1) = frac(2, 5)$، $P(C_2) = frac(1, 5)$، $P(C_3) = frac(2, 5)$):
#align(center)[#image("/static${ex1TreeSolUrl}", width: 82%)]`,
							mark: '1.75'
						},
						{
							type: 'image',
							src: ex1TreeSubjUrl,
							caption: 'شجرة الاحتمالات للنقل والإتمام'
						}
					]
				},
				{
					type: 'text',
					content: 'جـ) احسب $P(A)$، $P(B)$ و $P(D)$.',
					answer:
						'جـ) بتطبيق دستور الاحتمالات الكلية:\n- $P(A) = frac(2, 5) times frac(2, 3) + frac(1, 5) times frac(2, 5) + frac(2, 5) times frac(1, 5) = frac(20 + 6 + 6, 75) = frac(32, 75)$.\n- $P(B) = frac(2, 5) times frac(1, 3) + frac(1, 5) times frac(1, 15) = frac(10 + 1, 75) = frac(11, 75)$.\n- $P(D) = frac(1, 5) times frac(8, 15) + frac(2, 5) times frac(4, 5) = frac(8 + 24, 75) = frac(32, 75)$.',
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'2) احسب احتمال أن تكون البطاقة المتحصّل عليها تحمل الرقم $3$ علما أنّ الكريّات المسحوبة حمراء.',
					answer:
						'2) لدينا $P(A ∩ C_3) = P(C_3) times P_(C_3) (A) = frac(2, 5) times frac(1, 5) = frac(2, 25)$، ومنه:\n$P_A (C_3) = frac(P(A ∩ C_3), P(A)) = frac(frac(2, 25), frac(32, 75)) = frac(3, 16)$.',
					mark: '0.5'
				},
				{
					type: 'text',
					content:
						'3) $X$ المتغيّر العشوائي الذي يرفق بكلّ عملية سحب عدد الألوان المتحصّل عليها.\nعيّن قانون احتمال المتغيّر العشوائي $X$ ثمّ احسب الأمل الرياضياتي $E(75 X + 1917)$.',
					answer: `3) قيم المتغيّر العشوائي $X$ هي $ {1 ; 2} $، حيث $P(X = 1) = P(A) + P(B) = frac(43, 75)$ و $P(X = 2) = P(D) = frac(32, 75)$:
#align(center)[#table(columns: 3, align: center + horizon, inset: 5pt, [$x_i$], [$1$], [$2$], [$P(X = x_i)$], [$frac(43, 75)$], [$frac(32, 75)$])]
لدينا $E(X) = frac(43 + 64, 75) = frac(107, 75)$، ومنه بخطية الأمل الرياضياتي: $E(75 X + 1917) = 75 E(X) + 1917 = 107 + 1917 = 2024$.`,
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'4) إذا كان عدد الكريّات الحمراء في الصندوق $U_2$ هو $n + 4$ حيث $n$ عدد طبيعي.\nجد قيمة $n$ التي من أجلها يكون $P_(C_3) (A) = frac(7, 15)$.',
					answer:
						'4) الشرط $P_(C_3) (A) = frac(7, 15)$ معناه $frac(C_(n+4)^3, C_(n+6)^3) = frac(7, 15)$، وبعد الاختزال بـ $(n + 4)$ والنشر نحصل على $4 n^2 - n - 60 = 0$، وبما أنّ $n in bb(N)$ فإنّ $n = 4$.',
					mark: '0.25'
				}
			]
		},
		{
			id: 'bac_2024_math_ex2',
			num: 'الثاني',
			points: 4,
			content: [
				{
					type: 'text',
					content:
						'*I)* أ) حلّ في مجموعة الأعداد المركبة $bb(C)$ المعادلة ذات المجهول $z$ الآتية: $(z - 8 + 6 i)(z^2 - 2 z + 4) = 0$.\nب) جد الجذرين التربيعيين للعدد المركب $8 - 6 i$.',
					answer:
						'*I)* أ) إمّا $z = 8 - 6 i$، أو $z^2 - 2 z + 4 = 0$ ومميّزها $Delta = -12 = (2 i sqrt(3))^2$ فحلّاها $1 - i sqrt(3)$ و $1 + i sqrt(3)$. إذن $S = {8 - 6 i ; 1 - i sqrt(3) ; 1 + i sqrt(3)}$.\nب) بوضع $z = x + i y$ في $z^2 = 8 - 6 i$ نحصل على $x^2 - y^2 = 8$، $x^2 + y^2 = 10$، و $2 x y = -6$، فنجد الجذرين التربيعيين: $3 - i$ و $-3 + i$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'*II)* في المستوي المركب المنسوب إلى المعلم المتعامد والمتجانس $(O ; arrow(u), arrow(v))$، نعتبر النقط $A$، $B$ و $C$ التي لاحقاتها على الترتيب $z_A$، $z_B$ و $z_C$ حيث: $z_A = 1 + i sqrt(3)$، $z_B = i z_A$ و $z_C = -z_A$.\n1) تحقّق أنّ: $z_A - z_B = i (z_C - z_B)$ ثمّ بيّن أنّ المثلث $A B C$ قائم ومتساوي الساقين.',
					answer:
						'*II)* 1) لدينا $i (z_C - z_B) = i (-z_A - i z_A) = -i z_A + z_A = z_A - z_B$، فالمساواة محقّقة.\nومنه $frac(z_A - z_B, z_C - z_B) = i$، أي $frac(B A, B C) = abs(i) = 1$ و $(arrow(B C) ; arrow(B A)) = frac(pi, 2) + 2 k pi$ ($k in bb(Z)$)، فالمثلث $A B C$ قائم في $B$ ومتساوي الساقين.',
					mark: '0.5'
				},
				{
					type: 'text',
					content:
						'2) أ) اكتب كلّا من $z_A$، $z_B$ و $z_C$ على الشكل المثلثي.\nب) استنتج أنّ النقط $A$، $B$ و $C$ تنتمي إلى نفس الدائرة، يُطلب تعيين مركزها ونصف قطرها.',
					answer:
						'2) أ) لدينا $abs(z_A) = 2$، ومنه:\n$z_A = 2 (cos frac(pi, 3) + i sin frac(pi, 3))$، $z_B = i z_A = 2 (cos frac(5 pi, 6) + i sin frac(5 pi, 6))$، و $z_C = -z_A = 2 (cos frac(4 pi, 3) + i sin frac(4 pi, 3))$.\nب) بما أنّ $abs(z_A) = abs(z_B) = abs(z_C) = 2$ فإنّ النقط $A$، $B$ و $C$ تنتمي إلى الدائرة التي مركزها المبدأ $O$ ونصف قطرها $R = 2$.',
					mark: '1.75'
				},
				{
					type: 'text',
					content:
						'3) النقطة $D$ هي نظيرة $B$ بالنسبة إلى مبدأ المعلم. بيّن أنّ الرباعي $A B C D$ مربع.',
					answer:
						'3) المبدأ $O$ منتصف $[A C]$ (لأنّ $z_C = -z_A$) ومنتصف $[B D]$ (لأنّ $D$ نظيرة $B$ بالنسبة إلى $O$)، فالرباعي $A B C D$ متوازي أضلاع؛ وبما أنّ المثلث $A B C$ قائم في $B$ ومتساوي الساقين فإنّ الرباعي $A B C D$ مربع.',
					mark: '0.25'
				}
			]
		},
		{
			id: 'bac_2024_math_ex3',
			num: 'الثالث',
			points: 5,
			content: [
				{
					type: 'text',
					content:
						'1) نعتبر المعادلة $(E) : 7 x - 13 y = 29$ ذات المجهولين الصحيحين $x$ و $y$.\nأ) عيّن الحل الخاص $(x_0 ; y_0)$ للمعادلة $(E)$ الذي يحقّق: $x_0 - 3 y_0 = 3$.\nب) استنتج حلول المعادلة $(E)$.\nجـ) عيّن الثنائيات $(x ; y)$ حلول المعادلة $(E)$ والتي من أجلها يكون: $abs(x - y - 5) <= 6$.',
					answer:
						'1) أ) بالتعويض بـ $x_0 = 3 y_0 + 3$ في $(E)$ نجد $8 y_0 = 8$ أي $y_0 = 1$ و $x_0 = 6$، فالحل الخاص هو $(x_0 ; y_0) = (6 ; 1)$.\nب) بطرح $7 times 6 - 13 times 1 = 29$ من $(E)$ نحصل على $7 (x - 6) = 13 (y - 1)$، وبما أنّ $"PGCD"(7 ; 13) = 1$ فحسب مبرهنة غوص $S = {(13 k + 6 ; 7 k + 1) / k in bb(Z)}$.\nجـ) الشرط $abs(x - y - 5) <= 6$ يكافئ $abs(6 k) <= 6$ أي $abs(k) <= 1$ ($k in {-1 ; 0 ; 1}$)، ومنه الثنائيات هي: $(-7 ; -6)$، $(6 ; 1)$، $(19 ; 8)$.',
					mark: '2'
				},
				{
					type: 'text',
					content:
						'2) أ) ادرس تبعا لقيم العدد الطبيعي $n$ بواقي القسمة الإقليدية للعدد $3^n$ على $5$.\nب) بيّن أنّ العدد $2024 times 3^(1445) + 2023^(4 n + 2) + 9^(2 n + 3)$ يقبل القسمة على $5$.',
					answer: `2) أ) دور بواقي $3^n$ بترديد $5$ هو $4$ ($k in bb(N)$):
#align(center)[#table(columns: 5, align: center + horizon, inset: 5pt, [$n$], [$4 k$], [$4 k + 1$], [$4 k + 2$], [$4 k + 3$], [باقي $3^n$ على $5$], [$1$], [$3$], [$4$], [$2$])]
ب) لدينا $2024 equiv 4 [5]$، $3^(1445) = 3^(4 times 361 + 1) equiv 3 [5]$، $2023^(4 n + 2) equiv 3^(4 n + 2) equiv 4 [5]$، و $9^(2 n + 3) equiv (-1)^(2 n + 3) equiv -1 [5]$.
ومنه $2024 times 3^(1445) + 2023^(4 n + 2) + 9^(2 n + 3) equiv 4 times 3 + 4 - 1 = 15 equiv 0 [5]$، فالعدد يقبل القسمة على $5$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3) عيّن الأعداد الطبيعية $n$ بحيث: $cases(n equiv 0 [4], 3^(x + y) + 19 times 3^n - 2 n equiv 0 [5])$ و $(x ; y)$ حلّ طبيعي للمعادلة $(E)$.',
					answer:
						'3) من أجل حلّ طبيعي $(x ; y) = (13 k + 6 ; 7 k + 1)$ ($k in bb(N)$) لدينا $x + y = 20 k + 7$ ومنه $3^(x + y) equiv 3^3 equiv 2 [5]$.\nنضع $n = 4 lambda$ ($lambda in bb(N)$) فيكون $3^n equiv 1 [5]$، وتصبح الموافقة: $2 + 4 times 1 - 8 lambda equiv 0 [5] arrow.l.r.double 2 lambda equiv 4 [5] arrow.l.r.double lambda equiv 2 [5]$.\nإذن $lambda = 5 p + 2$ وعليه فإنّ $n = 20 p + 8$ حيث $p$ عدد طبيعي.',
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'4) $A$ عدد طبيعي يكتب $bar(5 alpha 2 beta)$ في نظام التعداد ذي الأساس $7$ حيث $alpha$ و $beta$ عددان طبيعيان و $0 < beta < alpha$.\nجد $alpha$ و $beta$ حتى يكون: $A equiv 4 [5]$ ثم اكتب $A$ في النظام العشري.',
					answer:
						'4) يشترط $0 < beta < alpha < 7$، ولدينا $A = 5 times 7^3 + 49 alpha + 14 + beta = 1729 + 49 alpha + beta$.\nالشرط $A equiv 4 [5]$ معناه $4 - alpha + beta equiv 4 [5]$ أي $beta - alpha equiv 0 [5]$، وبما أنّ $0 < beta < alpha <= 6$ نستنتج أنّ $(alpha ; beta) = (6 ; 1)$، ومنه $A = 2024$.',
					mark: '0.75'
				}
			]
		},
		{
			id: 'bac_2024_math_ex4',
			customTitle: 'التمرين الرابع: المسألة الشاملة',
			points: 7,
			content: [
				{
					type: 'columns',
					widths: ['1.3fr', '1fr'],
					children: [
						{
							type: 'text',
							content:
								'*I)* يمثّل الجدول المقابل تغيّرات الدّالة $g$ المعرّفة على $bb(R)$ بـ: $g(x) = (8 - 4 x) e^x + 16$.\nأثبت أنّ المعادلة $g(x) = 0$ تقبل حلّا وحيدا $alpha$ حيث $2.37 < alpha < 2.38$ ثم استنتج حسب قيم $x$ إشارة $g(x)$.',
							answer:
								'*I)* على $]-oo ; 1]$ لدينا $g(x) >= 16 > 0$. وعلى $[1 ; +oo[$ الدّالة $g$ مستمرة ومتناقصة تماما، ولدينا $g(2.37) approx 0.17 > 0$ و $g(2.38) approx -0.42 < 0$ أي $g(2.37) times g(2.38) < 0$؛ إذن تقبل المعادلة $g(x) = 0$ حلّا وحيدا $alpha$ حيث $2.37 < alpha < 2.38$.\nإشارة $g(x)$: موجبة تماماً على $]-oo ; alpha[$، وتنعدم عند $alpha$، وسالبة تماماً على $]alpha ; +oo[$.',
							mark: '1'
						},
						{
							type: 'image',
							src: ex4GVarSubjUrl,
							caption: 'جدول تغيّرات الدّالة $g$'
						}
					]
				},
				{
					type: 'text',
					content:
						'*II)* $f$ الدّالة المعرّفة على $bb(R)$ بـ: $f(x) = frac(e^x + 4 x, e^x + 4)$، و $(C_f)$ تمثيلها البياني في المستوي المنسوب إلى المعلم المتعامد والمتجانس $(O ; arrow(i), arrow(j))$.\n1) احسب $lim_(x arrow.r -oo) f(x)$ ثمّ بيّن أنّ: $lim_(x arrow.r +oo) f(x) = 1$ وفسّرها هندسيا.',
					answer:
						'*II)* 1) $lim_(x arrow.r -oo) f(x) = -oo$ (لأنّ $e^x arrow.r 0$ و $4 x arrow.r -oo$). وعند $+oo$: $f(x) = frac(1 + 4 x e^(-x), 1 + 4 e^(-x))$ وبالتزايد المقارن $lim_(x arrow.r +oo) f(x) = 1$.\nالتفسير الهندسي: المستقيم $(D) : y = 1$ مقارب أفقي للمنحني $(C_f)$ بجوار $+oo$.',
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'2) أ) بيّن أنّه: من أجل كلّ $x$ من $bb(R)$، $f\'(x) = frac(g(x), (e^x + 4)^2)$.\nب) استنتج اتجاه تغيّر الدّالة $f$ ثمّ شكّل جدول تغيّراتها.',
					answer: `2) أ) من أجل كلّ $x in bb(R)$: $f'(x) = frac((e^x + 4)(e^x + 4) - e^x (e^x + 4 x), (e^x + 4)^2) = frac((8 - 4 x) e^x + 16, (e^x + 4)^2) = frac(g(x), (e^x + 4)^2)$.
ب) إشارة $f'(x)$ من إشارة $g(x)$: الدّالة $f$ متزايدة تماما على $]-oo ; alpha]$ ومتناقصة تماما على $[alpha ; +oo[$:
#align(center)[#image("/static${ex4FVarSolUrl}", width: 56%)]`,
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'3) أ) بيّن أنّ المستقيم $(Delta)$ ذا المعادلة $y = x$ مقارب مائل للمنحني $(C_f)$ عند $-oo$.\nب) ادرس الوضع النّسبي للمنحني $(C_f)$ والمستقيم $(Delta)$.',
					answer:
						'3) أ) لدينا $lim_(x arrow.r -oo) [f(x) - x] = lim_(x arrow.r -oo) frac((1 - x) e^x, e^x + 4) = 0$ (لأنّ $lim_(x arrow.r -oo) x e^x = 0$)، فالمستقيم $(Delta) : y = x$ مقارب مائل لـ $(C_f)$ عند $-oo$.\nب) إشارة $f(x) - x = frac((1 - x) e^x, e^x + 4)$ من إشارة $(1 - x)$:\nلمّا $x < 1$ يكون $(C_f)$ أعلى $(Delta)$، ولمّا $x > 1$ يكون $(C_f)$ أسفل $(Delta)$، و $(Delta) ∩ (C_f) = {A(1 ; 1)}$.',
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'4) أ) ارسم $(Delta)$ و $(C_f)$ (نأخذ: $f(alpha) approx 1.4$).\nب) عيّن بيانيا قيم الوسيط الحقيقي الموجب تماما $m$ حتى تقبل المعادلة $f(x) = ln(m)$ حلّين مختلفين.',
					answer: `4) أ) رسم المقاربين $(Delta)$، $(D)$ والمنحني $(C_f)$:
#align(center)[#image("/static${ex4CfSolUrl}", width: 58%)]
ب) تقبل المعادلة $f(x) = ln(m)$ حلّين مختلفين لمّا $1 < ln(m) < f(alpha)$، أي $e < m < e^(f(alpha))$.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'5) أ) أثبت أنّه: من أجل كلّ $x$ من $[1 ; +oo[$، $frac(e^x, e^x + 4) <= f(x) <= x$.\nب) $cal(A)$ مساحة الحيّز المستوي المحدّد بـ $(C_f)$ والمستقيمات التي معادلاتها: $y = 0$، $x = 1$، $x = 2$. بيّن أنّ: $ln(frac(e^2 + 4, e + 4)) <= cal(A) <= frac(3, 2)$.',
					answer:
						'5) أ) من أجل كلّ $x in [1 ; +oo[$: لدينا $f(x) - frac(e^x, e^x + 4) = frac(4 x, e^x + 4) >= 0$، ومن الوضع النسبي على $[1 ; +oo[$ لدينا $f(x) <= x$، إذن $frac(e^x, e^x + 4) <= f(x) <= x$.\nب) بمكاملة الحصر الموجب على $[1 ; 2]$: $[ln(e^x + 4)]_1^2 <= integral_1^2 f(x) dif x <= [frac(1, 2) x^2]_1^2$، ومنه $ln(frac(e^2 + 4, e + 4)) <= cal(A) <= frac(3, 2)$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'6) $(u_n)$ المتتالية العددية المعرّفة على $bb(N)$ بـ: $u_n = (e^n + 4) f(n)$.\nاحسب بدلالة $n$ المجموع $S_n$ حيث: $S_n = u_0 + u_1 + ... + u_n$.',
					answer:
						'6) من أجل كلّ $n in bb(N)$: $u_n = (e^n + 4) f(n) = e^n + 4 n$، ومنه:\n$S_n = (1 + e + ... + e^n) + 4 (0 + 1 + ... + n) = frac(e^(n+1) - 1, e - 1) + 2 n (n + 1)$.',
					mark: '0.5'
				}
			]
		}
	];

	return buildRecord('2024', exercises);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. دورة جوان 2025 — شعبة رياضيات — الموضوع الأول
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2025Math(): OfficialBacPaperRecord {
	const ex1TreeSubjUrl = saveSvgAsset(
		'bac_2025_math_ex1_tree_subj',
		svgProbabilityTree({
			firstLevel: [
				{
					label: 'A',
					probLabel: '...',
					children: [
						{ label: 'B', probLabel: '...' },
						{ label: 'C', probLabel: '...' },
						{ label: 'D', probLabel: '...' }
					]
				},
				{
					label: 'Ā',
					probLabel: '...',
					children: [
						{ label: 'B', probLabel: '...' },
						{ label: 'D', probLabel: '...' }
					]
				}
			]
		})
	);

	const ex1TreeSolUrl = saveSvgAsset(
		'bac_2025_math_ex1_tree_sol',
		svgProbabilityTree({
			firstLevel: [
				{
					label: 'A',
					probLabel: '2/3',
					children: [
						{ label: 'B', probLabel: '3/44' },
						{ label: 'C', probLabel: '12/44' },
						{ label: 'D', probLabel: '29/44' }
					]
				},
				{
					label: 'Ā',
					probLabel: '1/3',
					children: [
						{ label: 'B', probLabel: '1/7' },
						{ label: 'D', probLabel: '6/7' }
					]
				}
			]
		})
	);

	const ex4ChSubjUrl = saveSvgAsset(
		'bac_2025_math_ex4_ch_subj',
		svgFunctionCurvePlot({
			xMin: -3,
			xMax: 0.9,
			yMin: -0.45,
			yMax: 2.3,
			fn: (x) => (x * x + 1) * Math.exp(2 * x) + (x - 2) * Math.exp(x) + 1,
			curveLabel: '(Ch)',
			points: [
				{ x: -0.653, y: 0, label: 'α', color: '#dc2626' },
				{ x: 0, y: 0, label: '0', color: '#15803d' }
			],
			width: 310,
			height: 230
		})
	);

	const ex4FVarSolUrl = saveSvgAsset(
		'bac_2025_math_ex4_f_var_sol',
		svgVariationTable({
			xValues: ['-∞', 'α', '0', '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '+' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '-' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '+' }
			],
			variations: [
				{ value: '-∞', position: 'bottom' },
				{ value: 'f(α)', position: 'top' },
				{ value: '0', position: 'bottom' },
				{ value: '+∞', position: 'top' }
			],
			fnName: 'f(x)',
			derivName: "f'(x)"
		})
	);

	const ex4CfSolUrl = saveSvgAsset(
		'bac_2025_math_ex4_cf_sol',
		svgFunctionCurvePlot({
			xMin: -2.2,
			xMax: 2.2,
			yMin: -2.5,
			yMax: 4.5,
			fn: (x) => 2 * x + (2 - 2 * Math.exp(x)) / (1 + x * Math.exp(x)),
			curveLabel: '(Cf)',
			asymptotes: [
				{ kind: 'oblique', a: 2, b: 2, label: '(Δ): y = 2x + 2', color: '#dc2626' },
				{ kind: 'oblique', a: 2, b: 0, label: "(Δ'): y = 2x", color: '#059669' }
			],
			points: [
				{ x: -1, y: 0, label: 'A(-1;0)', color: '#0f172a' },
				{ x: -0.653, y: 0.147, label: '(α;f(α))', color: '#7c3aed' },
				{ x: 0, y: 0, label: 'O(0;0)', color: '#15803d' }
			],
			width: 360,
			height: 250
		})
	);

	const ex4KVarSolUrl = saveSvgAsset(
		'bac_2025_math_ex4_k_var_sol',
		svgVariationTable({
			xValues: ['-∞', '0', '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '-' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '+' }
			],
			variations: [
				{ value: '+∞', position: 'top' },
				{ value: '0', position: 'bottom' },
				{ value: '+∞', position: 'top' }
			],
			fnName: 'k(x)',
			derivName: "k'(x)"
		})
	);

	const exercises: ExerciseBlock[] = [
		{
			id: 'bac_2025_math_ex1',
			num: 'الأول',
			points: 4,
			instruction:
				'يحتوي صندوق $U_1$ على $12$ كريّة منها: $3$ كريّات حمراء، $4$ كريّات بيضاء و $5$ كريّات خضراء. ويحتوي صندوق $U_2$ على $7$ كريّات منها: $4$ كريّات حمراء و $3$ كريّات بيضاء (جميع الكريّات متماثلة ولا نفرّق بينها باللّمس).\nنرمي نردا غير مزيّف ذا $6$ أوجه مرقّمة بـ: $1 ، 1 ، 1 ، 1 ، 2 ، 2$: إذا ظهر الرّقم $1$، نسحب عشوائيا $3$ كريّات في آن واحد من $U_1$؛ وإذا ظهر الرّقم $2$، نسحب عشوائيا $3$ كريّات على التّوالي من $U_2$ دون إرجاع.\nنعتبر الحوادث: $A$: "ظهور الرّقم $1$"، $B$: "الحصول على $3$ كريّات من نفس اللّون"، $C$: "الحصول على $3$ كريّات مختلفة الألوان مثنى مثنى"، $D$: "الحصول على كريّتين بالضّبط من نفس اللّون".',
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: '1) انقل واملأ شجرة الاحتمالات المقابلة.',
							answer: `1) لدينا $P(A) = frac(4, 6) = frac(2, 3)$ و $P(bar(A)) = frac(1, 3)$.
- من $U_1$ ($C_(12)^3 = 220$): $P_A (B) = frac(1 + 4 + 10, 220) = frac(3, 44)$، $P_A (C) = frac(3 times 4 times 5, 220) = frac(12, 44)$، و $P_A (D) = frac(29, 44)$.
- من $U_2$ ($7 times 6 times 5 = 210$ ترتيبات): $P_(bar(A)) (B) = frac(24 + 6, 210) = frac(1, 7)$ و $P_(bar(A)) (D) = frac(6, 7)$:
#align(center)[#image("/static${ex1TreeSolUrl}", width: 82%)]`,
							mark: '0.75'
						},
						{
							type: 'image',
							src: ex1TreeSubjUrl,
							caption: 'شجرة الاحتمالات للنقل والإتمام'
						}
					]
				},
				{
					type: 'text',
					content:
						'2) أ) احسب $P(B)$، $P(C)$، $P(D)$، $P(B ∪ C)$ احتمالات الحوادث $B$، $C$، $D$، $B ∪ C$ على التّرتيب.',
					answer:
						'2) أ) بتطبيق دستور الاحتمالات الكلية:\n- $P(B) = frac(2, 3) times frac(3, 44) + frac(1, 3) times frac(1, 7) = frac(1, 22) + frac(1, 21) = frac(43, 462)$.\n- $P(C) = frac(2, 3) times frac(12, 44) = frac(2, 11) = frac(84, 462)$.\n- $P(D) = frac(2, 3) times frac(29, 44) + frac(1, 3) times frac(6, 7) = frac(203 + 132, 462) = frac(335, 462)$.\n- بما أنّ $B ∩ C = emptyset$ فإنّ: $P(B ∪ C) = P(B) + P(C) = frac(43 + 84, 462) = frac(127, 462)$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'ب) بيّن أنّ: $P(A ∩ bar(B)) = frac(41, 66)$.\nجـ) احسب $P_(bar(B)) (A)$ احتمال سحب $3$ كريّات من $U_1$ علما أنّها ليست من نفس اللّون.',
					answer:
						'ب) لدينا $P(A ∩ bar(B)) = frac(2, 3) times frac(12, 44) + frac(2, 3) times frac(29, 44) = frac(2, 3) times frac(41, 44) = frac(41, 66)$.\nجـ) بما أنّ $P(bar(B)) = 1 - P(B) = frac(419, 462)$ فإنّ: $P_(bar(B)) (A) = frac(P(A ∩ bar(B)), P(bar(B))) = frac(frac(41, 66), frac(419, 462)) = frac(287, 419)$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'3) $X$ المتغيّر العشوائي الذي يرفق بكلّ عملية سحب لـ $3$ كريّات كما سبق، عدد الألوان التي تحملها الكريّات المسحوبة.\nعيّن قانون احتمال المتغيّر العشوائي $X$ ثمّ احسب أمله الرّياضياتي.',
					answer: `3) مجموعة قيم المتغيّر العشوائي $X$ هي $ {1 ; 2 ; 3} $، حيث $P(X = 1) = P(B) = frac(43, 462)$، $P(X = 2) = P(D) = frac(335, 462)$، و $P(X = 3) = P(C) = frac(84, 462)$:
#align(center)[#table(columns: 4, align: center + horizon, inset: 5pt, [$x_i$], [$1$], [$2$], [$3$], [$P(X = x_i)$], [$frac(43, 462)$], [$frac(335, 462)$], [$frac(84, 462)$])]
الأمل الرّياضياتي: $E(X) = frac(1 times 43 + 2 times 335 + 3 times 84, 462) = frac(965, 462)$.`,
					mark: '1.25'
				}
			]
		},
		{
			id: 'bac_2025_math_ex2',
			num: 'الثاني',
			points: 4,
			content: [
				{
					type: 'text',
					content:
						'1) حلّ في مجموعة الأعداد المركّبة $bb(C)$ المعادلة ذات المجهول $z$ الآتية: $(z^2 + 1)(z^2 - 6 z + 13) = 0$.',
					answer:
						'1) إمّا $z^2 + 1 = 0$ (حلّاها $-i$ و $i$)، أو $z^2 - 6 z + 13 = 0$ (مميّزها $Delta = -16 = (4 i)^2$ وحلّاها $3 - 2 i$ و $3 + 2 i$). إذن $S = {-i ; i ; 3 - 2 i ; 3 + 2 i}$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'2) المستوي المركّب منسوب إلى المعلم المتعامد والمتجانس $(O ; arrow(u), arrow(v))$، و $A$، $B$، $C$ نقط من المستوي لاحقاتها على التّرتيب $z_A$، $z_B$، $z_C$ حيث: $z_A = 2 - 3 i$، $z_B = i z_A$، $z_C = -i$، و $L$ عدد مركّب حيث: $L = frac(z_A - z_C, z_B - z_C)$.\nأ) اكتب كلّا من العددين $z_A - z_C$، $z_B - z_C$ على الشّكل المثلثي.\nب) عيّن الطّويلة وعمدة للعدد المركّب $L$ ثمّ حدّد طبيعة المثلّث $A B C$.',
					answer:
						'2) أ) لدينا $z_B = 3 + 2 i$، ومنه:\n$z_A - z_C = 2 - 2 i = 2 sqrt(2) (cos(-frac(pi, 4)) + i sin(-frac(pi, 4)))$، و $z_B - z_C = 3 + 3 i = 3 sqrt(2) (cos frac(pi, 4) + i sin frac(pi, 4))$.\nب) $abs(L) = frac(2 sqrt(2), 3 sqrt(2)) = frac(2, 3)$، و $arg(L) = -frac(pi, 2) + 2 k pi$ ($k in bb(Z)$)، ومنه المثلّث $A B C$ قائم في $C$.',
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'جـ) بيّن أنّ النّقط $O$، $A$، $B$ و $C$ تنتمي إلى نفس الدّائرة التي يُطلب تعيين مركزها ونصف قطرها.\nد) من أجل كلّ عدد طبيعي غير معدوم $n$، نضع: $S_n = abs(L) + abs(L)^2 + ... + abs(L)^n$. احسب بدلالة $n$ المجموع $S_n$ ثمّ استنتج $lim_(n arrow.r +oo) S_n$.',
					answer:
						'جـ) المثلّث $A B C$ قائم في $C$، فالنّقط $A$، $B$ و $C$ تنتمي إلى الدّائرة $(C)$ التي مركزها $omega$ منتصف $[A B]$ ذو اللاحقة $frac(5, 2) - frac(1, 2) i$ ونصف قطرها $frac(A B, 2) = frac(sqrt(26), 2)$. وبما أنّ $omega O = abs(frac(5, 2) - frac(1, 2) i) = frac(sqrt(26), 2)$ فإنّ $O$ تنتمي إلى الدّائرة $(C)$.\nد) $S_n = abs(L) frac(1 - abs(L)^n, 1 - abs(L)) = 2 (1 - (frac(2, 3))^n)$، وبما أنّ $-1 < frac(2, 3) < 1$ فإنّ $lim_(n arrow.r +oo) S_n = 2$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'3) $z_theta$ عدد مركّب حيث: $z_theta = 1 + cos(2 theta) - i sin(2 theta)$ و $theta$ عدد حقيقي يختلف عن $frac(pi, 2)$ مع $0 < theta < pi$.\nبيّن أنّ $z_theta = 2 cos theta (cos theta - i sin theta)$ ثمّ استنتج حسب قيم $theta$ الطّويلة وعمدة للعدد $z_theta$.',
					answer:
						'3) لدينا $1 + cos(2 theta) = 2 cos^2 theta$ و $sin(2 theta) = 2 sin theta cos theta$، ومنه $z_theta = 2 cos theta (cos theta - i sin theta)$.\n- لمّا $0 < theta < frac(pi, 2)$: $cos theta > 0$، فيكون $abs(z_theta) = 2 cos theta$ و $arg(z_theta) = -theta + 2 k pi$ ($k in bb(Z)$).\n- لمّا $frac(pi, 2) < theta < pi$: $cos theta < 0$، نكتب $z_theta = -2 cos theta (cos(pi - theta) + i sin(pi - theta))$، فيكون $abs(z_theta) = -2 cos theta$ و $arg(z_theta) = pi - theta + 2 k pi$ ($k in bb(Z)$).',
					mark: '0.75'
				}
			]
		},
		{
			id: 'bac_2025_math_ex3',
			num: 'الثالث',
			points: 5,
			content: [
				{
					type: 'text',
					content:
						'1) نعتبر المعادلة $(E) : 13 x - 2 y = 35$ ذات المجهولين الصّحيحين $x$ و $y$.\nأ) بيّن أنّه إذا كانت الثّنائية $(x ; y)$ حلّا للمعادلة $(E)$ فإنّ $y equiv 2 [13]$ ثمّ حلّ المعادلة $(E)$.\nب) جد كلّ الثّنائيات $(x ; y)$ حلول المعادلة $(E)$ حيث: $"PGCD"(x ; y) = 35$.',
					answer:
						'1) أ) من $13 x - 2 y = 35$ نجد $-2 y equiv 9 [13]$ أي $2 y equiv 4 [13]$، وبما أنّ $"PGCD"(2 ; 13) = 1$ فإنّ $y equiv 2 [13]$ أي $y = 13 k + 2$ ($k in bb(Z)$)، وبالتعويض في $(E)$ نجد $x = 2 k + 3$. إذن الحلول هي $(2 k + 3 ; 13 k + 2)$ مع $k in bb(Z)$.\nب) $"PGCD"(x ; y) = 35$ يعني $35$ يقسم $x$ و $35$ يقسم $y$ (لأنّ كل قاسم مشترك لهما يقسم $13 x - 2 y = 35$). الشرط $2 k + 3 equiv 0 [35]$ يكافئ $k = 35 k\' + 16$ ($k\' in bb(Z)$)، وعليه $x = 70 k\' + 35$ و $y = 455 k\' + 210$ ($k\' in bb(Z)$).',
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'2) أ) ادرس حسب قيم العدد الطّبيعي $n$ بواقي القسمة الإقليدية للعدد $5^n$ على $11$.\nب) عيّن قيم العدد الطّبيعي $n$ التي من أجلها يكون العدد $6 n^2 + 1446^(x + y)$ قابلا للقسمة على $11$ والثّنائية $(x ; y)$ حلّ للمعادلة $(E)$ (مع $x + y >= 0$).',
					answer: `2) أ) دور بواقي $5^n$ بترديد $11$ هو $5$ ($k in bb(N)$):
#align(center)[#table(columns: 6, align: center + horizon, inset: 5pt, [$n$], [$5 k$], [$5 k + 1$], [$5 k + 2$], [$5 k + 3$], [$5 k + 4$], [باقي $5^n$ على $11$], [$1$], [$5$], [$3$], [$4$], [$9$])]
ب) لدينا $1446 equiv 5 [11]$ و $x + y = 15 k + 5 = 5 (3 k + 1)$ ($k in bb(N)$)، ومنه $1446^(x + y) equiv 5^(5 (3 k + 1)) equiv 1 [11]$.
إذن $6 n^2 + 1446^(x + y) equiv 0 [11]$ يكافئ $6 n^2 + 1 equiv 0 [11]$ أي $n^2 equiv 9 [11]$، ومنه $n = 11 gamma + 3$ أو $n = 11 gamma + 8$ مع $gamma in bb(N)$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3) $lambda$ عدد طبيعي يكتب $bar(1 alpha alpha beta beta 1)$ في نظام التّعداد ذي الأساس $4$ ويكتب $bar(1 alpha beta 1 3)$ في نظام التّعداد ذي الأساس $6$.\nعيّن $alpha$ و $beta$ ثمّ اكتب $lambda$ في النّظام العشري.',
					answer:
						'3) يشترط $0 <= alpha < 4$ و $0 <= beta < 4$. بالنشر: $lambda = 1025 + 320 alpha + 20 beta = 1305 + 216 alpha + 36 beta$، ومنه $104 alpha - 16 beta = 280$ أي $13 alpha - 2 beta = 35$.\nمن السؤال (1) وبمراعاة $0 <= alpha, beta < 4$ نستنتج أنّ $(alpha ; beta) = (3 ; 2)$، ومنه $lambda = 2025$.',
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'4) $a$، $b$ عددان طبيعيان و $d$ قاسمهما المشترك الأكبر.\nحلّل العدد $2025$ إلى جُداء عوامل أوّليّة ثمّ عيّن كلّ الثّنائيات $(a ; b)$ حيث: $7 (a b)^2 - 3 d^4 = 2025$.',
					answer:
						'4) لدينا $2025 = 3^4 times 5^2$. بوضع $a = d a\'$ و $b = d b\'$ مع $"PGCD"(a\' ; b\') = 1$، تصبح المعادلة $d^4 [7 (a\' b\')^2 - 3] = 2025$، ومنه $d in {1 ; 3}$:\n- لمّا $d = 1$: ينتج $7 (a\' b\')^2 = 2028$ وليس للمعادلة حلّ طبيعي.\n- لمّا $d = 3$: ينتج $7 (a\' b\')^2 - 3 = 25$ أي $a\' b\' = 2$، ومنه $(a ; b) in {(3 ; 6) , (6 ; 3)}$.',
					mark: '1'
				}
			]
		},
		{
			id: 'bac_2025_math_ex4',
			customTitle: 'التمرين الرابع: المسألة الشاملة',
			points: 7,
			content: [
				{
					type: 'text',
					content:
						'*I)* 1) $g$ الدّالة المعرّفة على $bb(R)$ بـ: $g(x) = 1 + x e^x$.\nادرس اتّجاه تغيّر الدّالة $g$ ثمّ استنتج أنّه: من أجل كلّ عدد حقيقي $x$، $1 + x e^x > 0$.',
					answer:
						'*I)* 1) من أجل كلّ عدد حقيقي $x$: $g\'(x) = (1 + x) e^x$. الدّالة $g$ متناقصة تماما على $]-oo ; -1]$ ومتزايدة تماما على $[-1 ; +oo[$، وقيمتها الحدية الصغرى الشاملة $g(-1) = 1 - e^(-1) > 0$، ومنه من أجل كلّ عدد حقيقي $x$: $1 + x e^x > 0$.',
					mark: '1'
				},
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content:
								'2) $h$ الدّالة المعرّفة على $bb(R)$ بـ: $h(x) = (x^2 + 1) e^(2 x) + (x - 2) e^x + 1$، تمثيلها البياني $(C_h)$ يقطع حامل محور الفواصل في نقطتين فاصلتاهما $alpha$ و $0$، كما في الشّكل المقابل.\nأ) بقراءة بيانيّة، حدّد إشارة $h(x)$ على $bb(R)$.\nب) تحقّق أنّ: $-0.7 < alpha < -0.6$.',
							answer:
								'2) أ) بقراءة بيانيّة: $h(x) > 0$ على $]-oo ; alpha[$ وعلى $]0 ; +oo[$، و $h(x) < 0$ على $]alpha ; 0[$، و $h(alpha) = h(0) = 0$.\nب) لدينا $h(-0.7) approx +0.027 > 0$ و $h(-0.6) approx -0.017 < 0$ أي $h(-0.7) times h(-0.6) < 0$، ومنه $-0.7 < alpha < -0.6$.',
							mark: '0.75'
						},
						{
							type: 'image',
							src: ex4ChSubjUrl,
							caption: 'التمثيل البياني $(C_h)$'
						}
					]
				},
				{
					type: 'text',
					content:
						'*II)* $f$ الدّالة المعرّفة على $bb(R)$ بـ: $f(x) = 2 x + frac(2 - 2 e^x, 1 + x e^x)$، و $(C_f)$ تمثيلها البياني في المستوي المنسوب إلى المعلم المتعامد والمتجانس $(O ; arrow(i), arrow(j))$ (وحدة الطول $2 upright(c) upright(m)$).\n1) أ) احسب $lim_(x arrow.r -oo) f(x)$ وبيّن أنّ: $lim_(x arrow.r +oo) f(x) = +oo$.\nب) بيّن أنّ المستقيم $(Delta)$ ذا المعادلة $y = 2 x + 2$ مقارب مائل لـ $(C_f)$ عند $-oo$، وأنّ المستقيم $(Delta\')$ ذا المعادلة $y = 2 x$ مقارب مائل لـ $(C_f)$ عند $+oo$.',
					answer:
						'*II)* 1) أ) عند $-oo$: $lim_(x arrow.r -oo) f(x) = -oo$ لأنّ $e^x arrow.r 0$ و $x e^x arrow.r 0$. وعند $+oo$: نكتب $frac(2 - 2 e^x, 1 + x e^x) = frac(2 e^(-x) - 2, e^(-x) + x) arrow.r 0$، ومنه $lim_(x arrow.r +oo) f(x) = +oo$.\nب) $lim_(x arrow.r -oo) [f(x) - (2 x + 2)] = lim_(x arrow.r -oo) (-frac(2 (x + 1) e^x, 1 + x e^x)) = 0$ فـ $(Delta)$ مقارب مائل عند $-oo$؛ و $lim_(x arrow.r +oo) [f(x) - 2 x] = 0$ فـ $(Delta\')$ مقارب مائل عند $+oo$.',
					mark: '1'
				},
				{
					type: 'text',
					content: 'جـ) ادرس وضعية كلّ من $(Delta)$ و $(Delta\')$ بالنّسبة إلى $(C_f)$.',
					answer:
						'جـ) بما أنّ $1 + x e^x > 0$:\n- لدينا $f(x) - (2 x + 2) = -frac(2 (x + 1) e^x, 1 + x e^x)$: لمّا $x < -1$ يقع $(C_f)$ أعلى $(Delta)$، ولمّا $x > -1$ يقع $(C_f)$ أسفل $(Delta)$، ويتقاطعان في $A(-1 ; 0)$.\n- ولدينا $f(x) - 2 x = frac(2 - 2 e^x, 1 + x e^x)$: لمّا $x < 0$ يقع $(C_f)$ أعلى $(Delta\')$، ولمّا $x > 0$ يقع $(C_f)$ أسفل $(Delta\')$، ويتقاطعان في المبدأ $O(0 ; 0)$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'2) أ) بيّن أنّه: من أجل كلّ عدد حقيقي $x$، $f\'(x) = frac(2 h(x), (1 + x e^x)^2)$.\nب) استنتج اتّجاه تغيّر الدّالة $f$ ثمّ شكّل جدول تغيّراتها.',
					answer: `2) أ) من أجل كلّ $x in bb(R)$: بتوحيد المقامات وتبسيط المشتقة نجد $f'(x) = 2 + frac(-2 e^x (1 + x e^x) - (2 - 2 e^x)(x + 1) e^x, (1 + x e^x)^2) = frac(2 h(x), (1 + x e^x)^2)$.
ب) الدّالة $f$ متزايدة تماما على كلّ من $]-oo ; alpha]$ و $[0 ; +oo[$، ومتناقصة تماما على $[alpha ; 0]$:
#align(center)[#image("/static${ex4FVarSolUrl}", width: 62%)]`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: '3) ارسم كلّا من $(Delta)$، $(Delta\')$ و $(C_f)$ (نأخذ: $f(alpha) approx 0.15$).',
					answer: `3) رسم المقاربين $(Delta)$، $(Delta')$ والمنحني $(C_f)$:
#align(center)[#image("/static${ex4CfSolUrl}", width: 58%)]`,
					mark: '1'
				},
				{
					type: 'text',
					content:
						'4) أ) تحقّق أنّه: من أجل كلّ عدد حقيقي $x$، $1 - frac(1 - e^x, 1 + x e^x) = frac((x + 1) e^x, 1 + x e^x)$.\nب) استنتج بالسّنتيمتر المربّع حساب $cal(A)$ مساحة الحيّز المستوي المحدّد بالمنحني $(C_f)$ والمستقيمات التي معادلاتها: $y = 2 x + 2$، $x = 0$ و $x = 1$.',
					answer:
						'4) أ) بتوحيد المقامات: $1 - frac(1 - e^x, 1 + x e^x) = frac(1 + x e^x - 1 + e^x, 1 + x e^x) = frac((x + 1) e^x, 1 + x e^x)$.\nب) على $[0 ; 1]$ يقع $(C_f)$ أسفل $(Delta)$ ووحدة المساحة $4 upright(c) upright(m)^2$:\n$cal(A) = 4 integral_0^1 [(2 x + 2) - f(x)] dif x = 8 integral_0^1 frac((x + 1) e^x, 1 + x e^x) dif x = 8 [ln(1 + x e^x)]_0^1 = 8 ln(e + 1) upright(c) upright(m)^2$.',
					mark: '0.5'
				},
				{
					type: 'text',
					content:
						'5) $k$ الدّالة المعرّفة على $bb(R)$ بـ: $k(x) = f(x^2)$.\nدون حساب عبارة $k(x)$، حدّد اتّجاه تغيّر الدّالة $k$ ثمّ شكّل جدول تغيّراتها.',
					answer: `5) من أجل كلّ $x in bb(R)$: $k'(x) = 2 x f'(x^2)$. وبما أنّ $x^2 >= 0$ و $f' >= 0$ على $[0 ; +oo[$، فإنّ إشارة $k'(x)$ من إشارة $2 x$: فالدّالة $k$ متناقصة تماما على $]-oo ; 0]$ ومتزايدة تماما على $[0 ; +oo[$:
#align(center)[#image("/static${ex4KVarSolUrl}", width: 54%)]`,
					mark: '0.5'
				}
			]
		}
	];

	return buildRecord('2025', exercises);
}

export function buildOfficialBac3asMath(): OfficialBacPaperRecord[] {
	return [buildBac2023Math(), buildBac2024Math(), buildBac2025Math()];
}
