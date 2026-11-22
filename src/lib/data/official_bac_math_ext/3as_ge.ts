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
	svgProbabilityTree,
	svgVariationTable
} from '../../modules/MathTemplates/svg-secondary';

export type GeMathAcademicYear = '2023' | '2024' | '2025';

export interface OfficialBacGeMathPaperSpec {
	slug: string;
	bindingSlug: string;
	paperSlug: string;
	grade: '3as_ge';
	yearSubjectId: 749;
	subjectId: 'MAT-GE';
	streamId: 'GE';
	streamNameAr: 'تسيير واقتصاد';
	academicYear: GeMathAcademicYear;
	topicNumber: 1 | 2;
	sessionAr: string;
	coefficient: 5;
	duration: '03 ساعات و30 دقيقة';
	pointsSplit: readonly [4, 4, 5, 7];
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

function buildGeMetadata(year: GeMathAcademicYear, topicNumber: 1 | 2): ExamMetadata {
	const sessionAr = `دورة جوان ${year}`;
	return {
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي',
		streamId: 'GE',
		streamName: 'تسيير واقتصاد',
		subjectId: 'MAT-GE',
		subjectName: 'الرياضيات',
		trimesterId: 't3',
		trimesterName: 'دورة بكالوريا رسمية',
		docType: 'exam',
		academicYear: year,
		duration: '03 ساعات و30 دقيقة',
		coefficient: 5,
		examSessionAr: sessionAr,
		topicNumber,
		font: 'Arabic Transparent',
		customDocTitle: 'امتحان بكالوريا التعليم الثانوي',
		siteUrl: 'https://sujetstore.com'
	};
}

function buildGePaperSpec(opts: {
	year: GeMathAcademicYear;
	topicNumber: 1 | 2;
	themesAr: string[];
	exercises: [ExerciseBlock, ExerciseBlock, ExerciseBlock, ExerciseBlock];
}): OfficialBacGeMathPaperSpec {
	const slug = `bac-${opts.year}-3as-ge-math-s${opts.topicNumber}`;
	const sessionAr = `دورة جوان ${opts.year}`;
	const topicLabel = opts.topicNumber === 1 ? 'الموضوع الأول' : 'الموضوع الثاني';
	const examDoc: ExamDocument = {
		metadata: buildGeMetadata(opts.year, opts.topicNumber),
		exercises: opts.exercises
	};

	return {
		slug,
		bindingSlug: slug,
		paperSlug: slug,
		grade: '3as_ge',
		yearSubjectId: 749,
		subjectId: 'MAT-GE',
		streamId: 'GE',
		streamNameAr: 'تسيير واقتصاد',
		academicYear: opts.year,
		topicNumber: opts.topicNumber,
		sessionAr,
		coefficient: 5,
		duration: '03 ساعات و30 دقيقة',
		pointsSplit: [4, 4, 5, 7] as const,
		templateId: 'secondary/bac_official',
		titleAr: `بكالوريا رسمية في الرياضيات — شعبة تسيير واقتصاد (${sessionAr} - ${topicLabel})`,
		themesAr: opts.themesAr,
		examDoc
	};
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. دورة جوان 2023 — شعبة تسيير واقتصاد — الموضوع الأول
// ت1 (4ن): الاحتمالات الشرطية والمتغير العشوائي | ت2 (4ن): المتتالية التراجعية
// ت3 (5ن): الإحصاء بمتغيرين والانحدار الخطي   | ت4 (7ن): الدالة اللوغاريتمية والمساحة
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2023GeS1(): OfficialBacGeMathPaperSpec {
	const ex1TreeSubjUrl = saveSvgAsset(
		'bac_ext_2023_ge_s1_ex1_tree_subj',
		svgProbabilityTree({
			firstLevel: [
				{
					label: 'M1',
					probLabel: '0.6',
					children: [
						{ label: 'D', probLabel: '0.05' },
						{ label: 'S', probLabel: '?' }
					]
				},
				{
					label: 'M2',
					probLabel: '?',
					children: [
						{ label: 'D', probLabel: '?' },
						{ label: 'S', probLabel: '?' }
					]
				}
			]
		})
	);

	const ex1TreeSolUrl = saveSvgAsset(
		'bac_ext_2023_ge_s1_ex1_tree_sol',
		svgProbabilityTree({
			firstLevel: [
				{
					label: 'M1',
					probLabel: '0.6',
					children: [
						{ label: 'D', probLabel: '0.05' },
						{ label: 'S', probLabel: '0.95' }
					]
				},
				{
					label: 'M2',
					probLabel: '0.4',
					children: [
						{ label: 'D', probLabel: '0.10' },
						{ label: 'S', probLabel: '0.90' }
					]
				}
			]
		})
	);

	const ex2CobwebUrl = saveSvgAsset(
		'bac_ext_2023_ge_s1_ex2_cobweb',
		svgCobwebSequencePlot({
			xMin: 2,
			xMax: 9,
			yMin: 2,
			yMax: 9,
			fn: (x) => 0.75 * x + 2,
			u0: 4,
			steps: 3,
			fixedPoint: 8
		})
	);

	const ex3RegPlotUrl = saveSvgAsset(
		'bac_ext_2023_ge_s1_ex3_reg',
		svgFunctionCurvePlot({
			xMin: 0,
			xMax: 7,
			yMin: 0,
			yMax: 12.5,
			fn: (x) => 1.6 * x + 1.4,
			curveLabel: '(D)',
			points: [
				{ x: 1, y: 3, label: '', color: '#0f766e' },
				{ x: 2, y: 5, label: '', color: '#0f766e' },
				{ x: 3, y: 6, label: '', color: '#0f766e' },
				{ x: 4, y: 7, label: '', color: '#0f766e' },
				{ x: 5, y: 10, label: '', color: '#0f766e' },
				{ x: 6, y: 11, label: '', color: '#0f766e' },
				{ x: 3.5, y: 7, label: 'G(3.5;7)', color: '#dc2626' }
			],
			width: 350,
			height: 235
		})
	);

	const ex4GVarUrl = saveSvgAsset(
		'bac_ext_2023_ge_s1_ex4_g_var',
		svgVariationTable({
			xValues: ['0', 'α', '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '||' },
				{ kind: 'sign', value: '+' }
			],
			variations: [
				{ value: '-∞', position: 'bottom' },
				{ value: '0', position: 'mid' },
				{ value: '+∞', position: 'top' }
			],
			fnName: 'g(x)',
			derivName: "g'(x)"
		})
	);

	const ex4FVarUrl = saveSvgAsset(
		'bac_ext_2023_ge_s1_ex4_f_var',
		svgVariationTable({
			xValues: ['0', 'α', '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '||' },
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

	const alpha2023 = 1.2457;
	const fAlpha2023 = 2 * alpha2023 + 1 - 2 / alpha2023;
	const ex4CfUrl = saveSvgAsset(
		'bac_ext_2023_ge_s1_ex4_cf',
		svgFunctionCurvePlot({
			xMin: -0.3,
			xMax: 4.6,
			yMin: -0.5,
			yMax: 6.2,
			fn: (x) => (x > 0.08 ? x + 1 - (2 * Math.log(x)) / x : Number.NaN),
			curveLabel: '(Cf)',
			asymptotes: [
				{ kind: 'vertical', value: 0, label: 'x = 0', color: '#dc2626' },
				{ kind: 'oblique', a: 1, b: 1, label: '(Δ): y = x + 1', color: '#059669' }
			],
			tangents: [
				{
					x: Math.E,
					y: Math.E + 1 - 2 / Math.E,
					slope: 1,
					halfSpan: 1.5,
					color: '#7c3aed'
				}
			],
			points: [
				{ x: 1, y: 2, label: 'A(1;2)', color: '#0f172a' },
				{ x: alpha2023, y: fAlpha2023, label: '(α;f(α))', color: '#dc2626' }
			],
			shadedIntegral: { a: 1, b: Math.E, color: 'rgba(59,130,246,0.20)' },
			width: 360,
			height: 245
		})
	);

	const exercises: [ExerciseBlock, ExerciseBlock, ExerciseBlock, ExerciseBlock] = [
		{
			id: 'bac_2023_ge_s1_ex1',
			num: 'الأول',
			points: 4,
			instruction:
				'تتعاقد مؤسسة وطنية لتركيب الألواح الشمسية مع مصنعين محليين $M_1$ و $M_2$ لتوريد الخلايا الضوئية، حيث يوفّر المصنع $M_1$ نسبة $60%$ من إجمالي المخزون ويوفّر المصنع $M_2$ الباقي. بينت المراقبة التقنية أنّ $5%$ من خلايا $M_1$ و $10%$ من خلايا $M_2$ غير مطابقة للمعايير.\n\nنختار عشوائياً خلية واحدة من المخزون ونعتبر الحوادث:\n\n- $M_1$: "الخلية من إنتاج المصنع $M_1$"، و $M_2$: "الخلية من إنتاج المصنع $M_2$".\n\n- $D$: "الخلية غير مطابقة للمعايير التقنية"، و $S$: "الخلية سليمة ومطابقة للمعايير" ($S = overline(D)$).',
			content: [
				{
					type: 'columns',
					widths: ['1.2fr', '1fr'],
					children: [
						{
							type: 'text',
							content: '1) انقل وأكمل شجرة الاحتمالات الموزونة المقابلة التي تُنمذج هذه الوضعية.',
							answer: `1) إكمال شجرة الاحتمالات ($P(M_1) = 0.6$ و $P(M_2) = 1 - 0.6 = 0.4$):

- على فرع $M_1$: $P_(M_1)(D) = 0.05$ و $P_(M_1)(S) = 0.95$.

- على فرع $M_2$: $P_(M_2)(D) = 0.10$ و $P_(M_2)(S) = 0.90$.

#align(center)[#image("${typstSvgPath(ex1TreeSolUrl)}", width: 82%)]`,
							mark: '1'
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
					content: '2) احسب $P(M_1 sect D)$ ثمّ بيّن أنّ $P(D) = 0.07$.',
					answer:
						'2) حساب الاحتمالين:\n\n- $P(M_1 sect D) = P(M_1) times P_(M_1)(D) = 0.6 times 0.05 = 0.03$.\n\n- حسب دستور الاحتمالات الكلية:\n$P(D) = P(M_1 sect D) + P(M_2 sect D) = 0.6 times 0.05 + 0.4 times 0.10 = 0.03 + 0.04 = 0.07$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'3) عُلِم أنّ الخلية المختارة غير مطابقة للمعايير ($D$). احسب احتمال أن تكون من إنتاج المصنع $M_2$، ثمّ تحقّق إن كانت الحادثتان $M_2$ و $D$ مستقلّتين.',
					answer:
						'3) الاحتمال الشرطي:\n$P_D (M_2) = frac(P(M_2 sect D), P(D)) = frac(0.04, 0.07) = frac(4, 7) approx 0.571$.\n\nاختبار الاستقلالية: لدينا $P(M_2 sect D) = 0.04$ بينما $P(M_2) times P(D) = 0.4 times 0.07 = 0.028 != 0.04$، ومنه الحادثتان $M_2$ و $D$ ليستا مستقلّتين.',
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'4) تبلغ تكلفة اقتناء الخلية السليمة $2000$ دج، وإذا كانت غير مطابقة تتحمّل المؤسسة نفقة صيانة إضافية قدرها $500$ دج فتصبح كلفتها $2500$ دج. ليكن $X$ المتغيّر العشوائي الذي يرفق بكلّ خلية مختارة كلفتها الإجمالية بالدينار.\n\nعيّن قانون احتمال المتغيّر العشوائي $X$ ثمّ احسب أمله الرياضياتي $E(X)$.',
					answer: `4) مجموعة قيم المتغيّر العشوائي $X$ هي $\{2000 ; 2500\}$:

- $P(X = 2500) = P(D) = 0.07$.

- $P(X = 2000) = P(overline(D)) = 1 - 0.07 = 0.93$.

#align(center)[#[#set text(dir: ltr); #table(columns: 3, align: center + horizon, inset: 5pt, [$x_i$], [$2000$], [$2500$], [$P(X = x_i)$], [$0.93$], [$0.07$])]]

الأمل الرياضياتي: $E(X) = 2000 times 0.93 + 2500 times 0.07 = 1860 + 175 = 2035$ دج.`,
					mark: '1.25'
				}
			]
		},
		{
			id: 'bac_2023_ge_s1_ex2',
			num: 'الثاني',
			points: 4,
			instruction:
				'نعتبر المتتالية العددية $(u_n)$ المعرّفة على $bb(N)$ بحدّها الأول $u_0 = 4$ والعلاقة التراجعية: $u_(n+1) = frac(3, 4) u_n + 2$.',
			content: [
				{
					type: 'text',
					content:
						'1) احسب الحدّين $u_1$ و $u_2$، ثمّ مثّل في معلم متعامد ومتجانس الحدود $u_0$، $u_1$، $u_2$ و $u_3$ على حامل محور الفواصل باستعمال المستقيمين $(D) : y = x$ و $(Delta) : y = frac(3, 4) x + 2$.',
					answer: `1) حساب الحدّين: $u_1 = frac(3, 4)(4) + 2 = 5$، و $u_2 = frac(3, 4)(5) + 2 = frac(23, 4) = 5.75$.

تمثيل الحدود $u_0$، $u_1$، $u_2$ و $u_3$ على حامل محور الفواصل:

#align(center)[#image("${typstSvgPath(ex2CobwebUrl)}", width: 54%)]`,
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'2) برهن بالتراجع أنّه من أجل كلّ عدد طبيعي $n$: $u_n < 8$، ثمّ ادرس اتجاه تغيّر $(u_n)$ واستنتج أنّها متقاربة.',
					answer:
						'2) البرهان بالتراجع للخاصية $u_n < 8$:\n\n- من أجل $n = 0$: $u_0 = 4 < 8$ محقّقة.\n\n- نفرض صحّة $u_n < 8$ من أجل عدد طبيعي $n$: بضرب الطرفين في $frac(3, 4) > 0$ نجد $frac(3, 4) u_n < 6$، وبإضافة $2$ نحصل على $u_(n+1) < 8$. إذن من أجل كلّ $n in bb(N)$، $u_n < 8$.\n\nاتجاه التغيّر: $u_(n+1) - u_n = frac(3, 4) u_n + 2 - u_n = frac(8 - u_n, 4) > 0$ (لأنّ $u_n < 8$)، فالمتتالية $(u_n)$ متزايدة تماماً ومحدودة من الأعلى بـ $8$، ومنه فهي متقاربة.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'3) نضع من أجل كلّ عدد طبيعي $n$: $v_n = u_n - 8$.\n\nأ) أثبت أنّ $(v_n)$ متتالية هندسية أساسها $q = frac(3, 4)$ يُطلب تعيين حدّها الأول $v_0$.\n\nب) اكتب عبارة $v_n$ ثمّ استنتج عبارة $u_n$ بدلالة $n$، واحسب $lim_(n arrow.r +oo) u_n$.',
					answer:
						'3) أ) من أجل كلّ $n in bb(N)$: $v_(n+1) = u_(n+1) - 8 = frac(3, 4) u_n + 2 - 8 = frac(3, 4)(u_n - 8) = frac(3, 4) v_n$.\nفالمتتالية $(v_n)$ هندسية أساسها $q = frac(3, 4)$ وحدّها الأول $v_0 = u_0 - 8 = -4$.\n\nب) عبارة الحدّ العام: $v_n = -4 (frac(3, 4))^n$، ومنه $u_n = 8 - 4 (frac(3, 4))^n$.\nبما أنّ $-1 < frac(3, 4) < 1$ فإنّ $lim_(n arrow.r +oo) (frac(3, 4))^n = 0$، وعليه $lim_(n arrow.r +oo) u_n = 8$.',
					mark: '1.25'
				},
				{
					type: 'text',
					content: '4) احسب بدلالة $n$ المجموع: $S_n = u_0 + u_1 + dots + u_n$.',
					answer:
						'4) لدينا $u_k = v_k + 8$، ومجموع حدود المتتالية الهندسية $(v_n)$ هو:\n$sum_(k=0)^n v_k = -4 frac(1 - (frac(3, 4))^(n+1), 1 - frac(3, 4)) = -16 [1 - (frac(3, 4))^(n+1)]$.\n\nومنه: $S_n = sum_(k=0)^n v_k + 8 (n + 1) = 8 n - 8 + 16 (frac(3, 4))^(n+1)$.',
					mark: '1'
				}
			]
		},
		{
			id: 'bac_2023_ge_s1_ex3',
			num: 'الثالث',
			points: 5,
			instruction:
				'يمثّل الجدول الآتي تطوّر رقم الأعمال السنوي $y_i$ (بملايين الدنانير) لمؤسسة تجارية جزائرية خلال $6$ سنوات متتالية، حيث $x_i$ يمثّل رتبة السنة:',
			content: [
				{
					type: 'table',
					headers: ['السنة', '2017', '2018', '2019', '2020', '2021', '2022'],
					cells: [],
					rows: [
						['رتبة السنة $x_i$', '$1$', '$2$', '$3$', '$4$', '$5$', '$6$'],
						['رقم الأعمال $y_i$', '$3$', '$5$', '$6$', '$7$', '$10$', '$11$']
					],
					align: 'center',
					headerBackground: true,
					width: 'full'
				},
				{
					type: 'text',
					content:
						'1) احسب إحداثيي النقطة المتوسّطة $G(bar(x) ; bar(y))$ لهذه السلسلة الإحصائية المزدوجة.',
					answer:
						'1) حساب إحداثيي النقطة المتوسّطة $G(bar(x) ; bar(y))$:\n\n- $bar(x) = frac(1 + 2 + 3 + 4 + 5 + 6, 6) = frac(21, 6) = 3.5$.\n\n- $bar(y) = frac(3 + 5 + 6 + 7 + 10 + 11, 6) = frac(42, 6) = 7$.\n\nإذن $G(3.5 ; 7)$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'2) بيّن أنّ معادلة مستقيم الانحدار بالمربعات الدّنيا $(D)$ لـ $y$ بدلالة $x$ تُكتب على الشّكل: $y = 1.6 x + 1.4$.',
					answer:
						'2) نحسب التباين $V(X)$ والتغاير $"Cov"(X, Y)$:\n\n- $sum_(i=1)^6 (x_i - bar(x))^2 = (-2.5)^2 + (-1.5)^2 + (-0.5)^2 + 0.5^2 + 1.5^2 + 2.5^2 = 17.5$.\n\n- $sum_(i=1)^6 (x_i - bar(x))(y_i - bar(y)) = (-2.5)(-4) + (-1.5)(-2) + (-0.5)(-1) + (0.5)(0) + (1.5)(3) + (2.5)(4) = 10 + 3 + 0.5 + 0 + 4.5 + 10 = 28$.\n\nومنه معامل التوجيه: $a = frac(28, 17.5) = 1.6$، والترتيب عند المبدأ: $b = bar(y) - a bar(x) = 7 - 1.6 times 3.5 = 1.4$.\nإذن معادلة مستقيم الانحدار $(D)$ هي: $y = 1.6 x + 1.4$.',
					mark: '2'
				},
				{
					type: 'text',
					content:
						'3) مثّل سحابة النقط $M_i(x_i ; y_i)$ والنقطة المتوسّطة $G$ والمستقيم $(D)$ في معلم متعامد.',
					answer: `3) تمثيل سحابة النقط $M_i(x_i ; y_i)$ والنقطة المتوسّطة $G(3.5 ; 7)$ ومستقيم الانحدار $(D) : y = 1.6 x + 1.4$:

#align(center)[#image("${typstSvgPath(ex3RegPlotUrl)}", width: 58%)]`,
					mark: '1'
				},
				{
					type: 'text',
					content:
						'4) أ) باستعمال التعديل الخطي السابق، قدّر رقم الأعمال المتوقّع للمؤسسة في سنة 2024.\n\nب) ابتداءً من أي سنة يتجاوز رقم الأعمال $19$ مليون دينار حسب هذا النموذج؟',
					answer:
						'4) أ) سنة 2024 توافق الرتبة $x = 8$: بالتعويض في معادلة $(D)$ نجد $y = 1.6(8) + 1.4 = 14.2$ مليون دج.\n\nب) نحلّ المتراجحة $1.6 x + 1.4 > 19 arrow.l.r.double 1.6 x > 17.6 arrow.l.r.double x > 11$.\nأوّل عدد طبيعي يحقّق ذلك هو $x = 12$، الموافق لسنة $2016 + 12 = 2028$.',
					mark: '1'
				}
			]
		},
		{
			id: 'bac_2023_ge_s1_ex4',
			num: 'الرابع',
			customTitle: 'التمرين الرابع: المسألة الشاملة',
			points: 7,
			content: [
				{
					type: 'text',
					content:
						'*I)* $g$ الدّالة المعرّفة على $]0 ; +oo[$ بـ: $g(x) = x^2 - 2 + 2 ln(x)$.\n\n1) احسب $lim_(x arrow.r 0^+) g(x)$ و $lim_(x arrow.r +oo) g(x)$، ثمّ ادرس اتجاه تغيّر الدالة $g$ وشكّل جدول تغيّراتها.\n\n2) بيّن أنّ المعادلة $g(x) = 0$ تقبل حلّاً وحيداً $alpha$ حيث $1.2 < alpha < 1.3$، ثمّ استنتج إشارة $g(x)$ على $]0 ; +oo[$.',
					answer: `*I)* 1) لدينا $lim_(x arrow.r 0^+) g(x) = -oo$ (لأنّ $lim_(x arrow.r 0^+) ln(x) = -oo$) و $lim_(x arrow.r +oo) g(x) = +oo$.
المشتقة: $g'(x) = 2 x + frac(2, x) > 0$ على $]0 ; +oo[$، فالدالة $g$ متزايدة تماماً على $]0 ; +oo[$.

#align(center)[#image("${typstSvgPath(ex4GVarUrl)}", width: 52%)]

2) $g$ مستمرة ومتزايدة تماماً على $]0 ; +oo[$، ولدينا $g(1.2) approx -0.195 < 0$ و $g(1.3) approx 0.215 > 0$، فحسب مبرهنة القيم المتوسطة المعادلة $g(x) = 0$ تقبل حلّاً وحيداً $alpha in ]1.2 ; 1.3[$.
إشارة $g(x)$: سالبة تماماً على $]0 ; alpha[$، معدومة عند $alpha$، وموجبة تماماً على $]alpha ; +oo[$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'*II)* $f$ الدّالة المعرّفة على $]0 ; +oo[$ بـ: $f(x) = x + 1 - frac(2 ln(x), x)$، و $(C_f)$ تمثيلها البياني في المعلم المتعامد والمتجانس $(O ; arrow(i), arrow(j))$ (وحدة الطول $2$ سم).\n\n1) احسب $lim_(x arrow.r 0^+) f(x)$ وفسّر النتيجة هندسياً، ثمّ احسب $lim_(x arrow.r +oo) f(x)$.\n\n2) بيّن أنّ المستقيم $(Delta) : y = x + 1$ مقارب مائل لـ $(C_f)$ عند $+oo$، ثمّ ادرس وضعية $(C_f)$ بالنسبة إلى $(Delta)$.',
					answer:
						'*II)* 1) عند $0^+$: $lim_(x arrow.r 0^+) (-frac(2 ln(x), x)) = +oo$ ومنه $lim_(x arrow.r 0^+) f(x) = +oo$، فالمستقيم ذو المعادلة $x = 0$ مقارب عمودي لـ $(C_f)$.\nعند $+oo$: بالتزايد المقارن $lim_(x arrow.r +oo) frac(ln(x), x) = 0$ ومنه $lim_(x arrow.r +oo) f(x) = +oo$.\n\n2) $lim_(x arrow.r +oo) [f(x) - (x + 1)] = lim_(x arrow.r +oo) (-frac(2 ln(x), x)) = 0$، فالمستقيم $(Delta) : y = x + 1$ مقارب مائل لـ $(C_f)$ عند $+oo$.\nإشارة الفرق $f(x) - (x + 1) = -frac(2 ln(x), x)$ على $]0 ; +oo[$ هي عكس إشارة $ln(x)$:\n- على $]0 ; 1[$: $(C_f)$ يقع فوق $(Delta)$؛ على $]1 ; +oo[$: $(C_f)$ يقع تحت $(Delta)$؛ ويتقاطعان في النقطة $A(1 ; 2)$.',
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'3) أ) بيّن أنّه من أجل كلّ $x in ]0 ; +oo[$: $f\'(x) = frac(g(x), x^2)$، ثمّ شكّل جدول تغيّرات الدالة $f$.\n\nب) أثبت أنّ $f(alpha) = 2 alpha + 1 - frac(2, alpha)$، ثمّ استنتج حصراً للعدد $f(alpha)$ علماً أنّ $1.24 < alpha < 1.25$.',
					answer: `3) أ) من أجل كلّ $x in ]0 ; +oo[$:
$f'(x) = 1 - 2 frac(frac(1, x) times x - ln(x), x^2) = 1 - frac(2 - 2 ln(x), x^2) = frac(x^2 - 2 + 2 ln(x), x^2) = frac(g(x), x^2)$.

بما أنّ $x^2 > 0$، فإنّ $f$ متناقصة تماماً على $]0 ; alpha]$ ومتزايدة تماماً على $[alpha ; +oo[$.

#align(center)[#image("${typstSvgPath(ex4FVarUrl)}", width: 54%)]

ب) من $g(alpha) = 0$ نجد $2 ln(alpha) = 2 - alpha^2$، وبالتعويض:
$f(alpha) = alpha + 1 - frac(2 - alpha^2, alpha) = 2 alpha + 1 - frac(2, alpha) approx 1.89$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) أ) بيّن أنّ $(C_f)$ يقبل مماساً $(T)$ موازياً للمستقيم $(Delta)$ عند نقطة فاصلتها $e$، ثمّ اكتب معادلته.\n\nب) أنشئ كلّاً من $(Delta)$، $(T)$ والمنحني $(C_f)$.',
					answer: `4) أ) $(T) parallel (Delta) arrow.l.r.double f'(x) = 1 arrow.l.r.double frac(-2 + 2 ln(x), x^2) = 0 arrow.l.r.double ln(x) = 1 arrow.l.r.double x = e$.
لدينا $f(e) = e + 1 - frac(2, e)$، ومنه معادلة المماس $(T)$: $y = (x - e) + e + 1 - frac(2, e) = x + 1 - frac(2, e)$.

ب) رسم المستقيمين $(Delta)$ و $(T)$ والمنحني $(C_f)$:

#align(center)[#image("${typstSvgPath(ex4CfUrl)}", width: 58%)]`,
					mark: '1.75'
				},
				{
					type: 'text',
					content:
						'5) أ) تحقّق أنّ الدالة $H$ المعرّفة على $]0 ; +oo[$ بـ $H(x) = (ln(x))^2$ هي دالة أصلية للدالة $x arrow.r.bar frac(2 ln(x), x)$.\n\nب) استنتج بالسنتيمتر المربع مساحة الحيّز المستوي المحدّد بالمنحني $(C_f)$ والمستقيمات التي معادلاتها $y = x + 1$، $x = 1$ و $x = e$.',
					answer:
						'5) أ) الدالة $H$ قابلة للاشتقاق على $]0 ; +oo[$ ومشتقتها $H\'(x) = 2 times frac(1, x) times ln(x) = frac(2 ln(x), x)$، فهي دالة أصلية لها.\n\nب) على المجال $[1 ; e]$ يقع $(C_f)$ تحت $(Delta)$، ووحدة المساحة $2 times 2 = 4$ سم مربع:\n$cal(A) = 4 integral_1^e [x + 1 - f(x)] dif x = 4 integral_1^e frac(2 ln(x), x) dif x = 4 [H(e) - H(1)] = 4 (1^2 - 0^2) = 4$ سم مربع.',
					mark: '1'
				}
			]
		}
	];

	return buildGePaperSpec({
		year: '2023',
		topicNumber: 1,
		themesAr: [
			'الاحتمالات الشرطية والمتغير العشوائي',
			'المتتالية التراجعية والتمثيل البياني',
			'الإحصاء بمتغيرين والانحدار الخطي',
			'الدالة اللوغاريتمية وحساب المساحة'
		],
		exercises
	});
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. دورة جوان 2023 — شعبة تسيير واقتصاد — الموضوع الثاني
// ت1 (4ن): صحيح أم خطأ مع التبرير           | ت2 (4ن): الاحتمالات الشرطية وشجرة الاحتمالات
// ت3 (5ن): المتتالية التراجعية الاقتصادية   | ت4 (7ن): الدالة الأسية والمساحة
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2023GeS2(): OfficialBacGeMathPaperSpec {
	const ex2TreeUrl = saveSvgAsset(
		'bac_ext_2023_ge_s2_ex2_tree',
		svgProbabilityTree({
			firstLevel: [
				{
					label: 'P',
					probLabel: '0.65',
					children: [
						{ label: 'C', probLabel: '0.80' },
						{ label: 'E', probLabel: '0.20' }
					]
				},
				{
					label: 'N',
					probLabel: '0.35',
					children: [
						{ label: 'C', probLabel: '0.40' },
						{ label: 'E', probLabel: '0.60' }
					]
				}
			]
		})
	);

	const ex3CobwebUrl = saveSvgAsset(
		'bac_ext_2023_ge_s2_ex3_cobweb',
		svgCobwebSequencePlot({
			xMin: 350,
			xMax: 650,
			yMin: 350,
			yMax: 650,
			fn: (x) => 1.05 * x + 30,
			u0: 400,
			steps: 3
		})
	);

	const ex4FVarUrl = saveSvgAsset(
		'bac_ext_2023_ge_s2_ex4_f_var',
		svgVariationTable({
			xValues: ['-∞', '+∞'],
			derivativeRow: [{ kind: 'sign', value: '+' }],
			variations: [
				{ value: '-∞', position: 'bottom' },
				{ value: '+∞', position: 'top' }
			],
			fnName: 'f(x)',
			derivName: "f'(x)"
		})
	);

	const ex4CfUrl = saveSvgAsset(
		'bac_ext_2023_ge_s2_ex4_cf',
		svgFunctionCurvePlot({
			xMin: -1.5,
			xMax: 4.5,
			yMin: -2.0,
			yMax: 6.0,
			fn: (x) => (2 * x - 1) * Math.exp(-x) + x + 1,
			curveLabel: '(Cf)',
			asymptotes: [{ kind: 'oblique', a: 1, b: 1, label: '(Δ): y = x + 1', color: '#dc2626' }],
			tangents: [
				{
					x: 1.5,
					y: 2 * Math.exp(-1.5) + 2.5,
					slope: 1,
					halfSpan: 1.6,
					color: '#059669'
				}
			],
			points: [
				{ x: 0, y: 0, label: 'O', color: '#0f172a' },
				{ x: 0.5, y: 1.5, label: 'A(0.5;1.5)', color: '#7c3aed' }
			],
			shadedIntegral: { a: 1, b: 3, color: 'rgba(59,130,246,0.20)' },
			width: 360,
			height: 245
		})
	);

	const exercises: [ExerciseBlock, ExerciseBlock, ExerciseBlock, ExerciseBlock] = [
		{
			id: 'bac_2023_ge_s2_ex1',
			num: 'الأول',
			points: 4,
			instruction: 'أجب بصحيح أو خاطئ مع التبرير في كلّ حالة من الحالات الأربع الآتية:',
			content: [
				{
					type: 'text',
					content:
						'1) الدّالة $F$ المعرّفة على $bb(R)$ بـ: $F(x) = frac(1, 2) ln(x^2 + 3)$ دالة أصلية للدّالة $f(x) = frac(x, x^2 + 3)$ على $bb(R)$.',
					answer:
						'1) *صحيح*: لأنّ $x^2 + 3 > 0$ دوماً على $bb(R)$، وباشتقاق $F$ نجد $F\'(x) = frac(1, 2) times frac(2 x, x^2 + 3) = frac(x, x^2 + 3) = f(x)$.',
					mark: '1'
				},
				{
					type: 'text',
					content: '2) $lim_(x arrow.r +oo) (x - 2) e^(-x) = +oo$.',
					answer:
						'2) *خاطئ*: لأنّ بالتزايد المقارن $lim_(x arrow.r +oo) x e^(-x) = 0$ و $lim_(x arrow.r +oo) (-2 e^(-x)) = 0$، ومنه $lim_(x arrow.r +oo) (x - 2) e^(-x) = 0 != +oo$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'3) ارتفع سعر منتج صناعي بنسبة $25%$ خلال سنة 2022 ثمّ انخفض بنسبة $20%$ خلال سنة 2023، فيكون بذلك قد عاد إلى سعره الأصلي.',
					answer:
						'3) *صحيح*: المعامل الضربي للتطوّر الإجمالي هو $k = (1 + 0.25)(1 - 0.20) = 1.25 times 0.80 = 1$، أي أنّ السعر عاد تماماً إلى قيمته الابتدائية.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'4) المتتالية $(u_n)$ المعرّفة على $bb(N)$ بـ $u_n = frac(3 n - 1, n + 2)$ متقاربة نحو $3$ وحدّها السادس يساوي $2$.',
					answer:
						'4) *صحيح*: $lim_(n arrow.r +oo) u_n = lim_(n arrow.r +oo) frac(3 - frac(1, n), 1 + frac(2, n)) = 3$، والحدّ السادس هو $u_5 = frac(3(5) - 1, 5 + 2) = frac(14, 7) = 2$.',
					mark: '1'
				}
			]
		},
		{
			id: 'bac_2023_ge_s2_ex2',
			num: 'الثاني',
			points: 4,
			instruction:
				'يعالج متجر إلكتروني جزائري طلبات الكتب الورقية ($P$) والرقمية ($N$)، حيث تمثّل طلبات الكتب الورقية $65%$ من مجمل الطلبات والباقي للكتب الرقمية. يُدفع ثمن $80%$ من الطلبات الورقية نقداً عند الاستلام ($C$) والباقي عبر الدفع الإلكتروني ($E = overline(C)$)، بينما يُدفع ثمن $40%$ فقط من الطلبات الرقمية عند الاستلام والباقي إلكترونياً.',
			content: [
				{
					type: 'text',
					content: '1) أنشئ شجرة الاحتمالات الموزونة التي تُنمذج هذه التجربة.',
					answer: `1) شجرة الاحتمالات الموزونة ($P(P) = 0.65$ و $P(N) = 0.35$):

#align(center)[#image("${typstSvgPath(ex2TreeUrl)}", width: 52%)]`,
					mark: '1'
				},
				{
					type: 'text',
					content:
						'2) بيّن أنّ احتمال أن يُدفع الطلب عند الاستلام هو $P(C) = 0.66$، ثمّ استنتج $P(overline(C))$.',
					answer:
						'2) حسب دستور الاحتمالات الكلية:\n$P(C) = P(P) times P_P (C) + P(N) times P_N (C) = 0.65 times 0.80 + 0.35 times 0.40 = 0.52 + 0.14 = 0.66$.\n\nومنه: $P(overline(C)) = 1 - P(C) = 1 - 0.66 = 0.34$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'3) عُلِم أنّ الطلب المختار دُفع إلكترونياً ($overline(C)$). احسب احتمال أن يكون طلباً لكتاب رقمي ($N$).',
					answer:
						'3) $P_(overline(C))(N) = frac(P(N sect overline(C)), P(overline(C))) = frac(0.35 times 0.60, 0.34) = frac(0.21, 0.34) = frac(21, 34) approx 0.618$.',
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'4) رسم التوصيل للكتاب الورقي المدفوع عند الاستلام $400$ دج، وللورقي المدفوع إلكترونياً $200$ دج، ومجاني ($0$ دج) للكتاب الرقمي. ليكن $X$ المتغيّر العشوائي المرفق برسم التوصيل.\n\nعيّن قانون احتمال $X$ واحسب أمله الرياضياتي $E(X)$.',
					answer: `4) مجموعة قيم $X$ هي $\{0 ; 200 ; 400\}$:

- $P(X = 0) = P(N) = 0.35$.

- $P(X = 200) = P(P sect overline(C)) = 0.65 times 0.20 = 0.13$.

- $P(X = 400) = P(P sect C) = 0.65 times 0.80 = 0.52$.

#align(center)[#[#set text(dir: ltr); #table(columns: 4, align: center + horizon, inset: 5pt, [$x_i$], [$0$], [$200$], [$400$], [$P(X = x_i)$], [$0.35$], [$0.13$], [$0.52$])]]

الأمل الرياضياتي: $E(X) = 0 times 0.35 + 200 times 0.13 + 400 times 0.52 = 26 + 208 = 234$ دج.`,
					mark: '1.25'
				}
			]
		},
		{
			id: 'bac_2023_ge_s2_ex3',
			num: 'الثالث',
			points: 5,
			instruction:
				'بلغ الإنتاج السنوي لتعاونية فلاحية لزراعة النخيل سنة 2020 (الموافقة للرتبة $n = 0$) كمية $u_0 = 400$ قنطار، وتهدف التعاونية إلى رفع إنتاجها بنسبة $5%$ كلّ سنة مع غرس فسائل جديدة تضيف $30$ قنطاراً سنوياً، فيُنمذج الإنتاج السنوي بعد $n$ سنة بالمتتالية $(u_n)$ المعرّفة بـ: $u_0 = 400$ و $u_(n+1) = 1.05 u_n + 30$.',
			content: [
				{
					type: 'text',
					content:
						'1) احسب $u_1$ و $u_2$ إنتاج التعاونية في سنتي 2021 و 2022، ثمّ مثّل الحدود الأولى بيانياً.',
					answer: `1) $u_1 = 1.05(400) + 30 = 450$ قنطاراً، و $u_2 = 1.05(450) + 30 = 502.5$ قنطاراً.

التمثيل البياني للمتتالية على محور الفواصل:

#align(center)[#image("${typstSvgPath(ex3CobwebUrl)}", width: 52%)]`,
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'2) برهن بالتراجع أنّه من أجل كلّ عدد طبيعي $n$: $u_(n+1) > u_n$، واستنتج اتجاه تغيّر $(u_n)$.',
					answer:
						'2) نبرهن بالتراجع الخاصية $u_(n+1) > u_n$:\n\n- من أجل $n = 0$: $u_1 = 450 > 400 = u_0$ محقّقة.\n\n- نفرض صحّة $u_(n+1) > u_n$ من أجل $n in bb(N)$: بضرب الطرفين في $1.05 > 0$ وإضافة $30$ نحصل على $1.05 u_(n+1) + 30 > 1.05 u_n + 30$، أي $u_(n+2) > u_(n+1)$.\nإذن المتتالية $(u_n)$ متزايدة تماماً على $bb(N)$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'3) نضع من أجل كلّ $n in bb(N)$: $v_n = u_n + 600$.\n\nأ) أثبت أنّ $(v_n)$ متتالية هندسية أساسها $q = 1.05$ وحدّها الأول $v_0 = 1000$.\n\nب) اكتب $v_n$ ثمّ $u_n$ بدلالة $n$، واحسب $lim_(n arrow.r +oo) u_n$.',
					answer:
						'3) أ) $v_(n+1) = u_(n+1) + 600 = 1.05 u_n + 630 = 1.05(u_n + 600) = 1.05 v_n$، فـ $(v_n)$ هندسية أساسها $q = 1.05$ وحدّها الأول $v_0 = 400 + 600 = 1000$.\n\nب) $v_n = 1000 (1.05)^n$، ومنه $u_n = 1000 (1.05)^n - 600$.\nبما أنّ $1.05 > 1$ فإنّ $lim_(n arrow.r +oo) (1.05)^n = +oo$، وعليه $lim_(n arrow.r +oo) u_n = +oo$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) أ) احسب بدلالة $n$ الإنتاج التراكمي $S_n = u_0 + u_1 + dots + u_n$.\n\nب) ابتداءً من أي سنة يتجاوز الإنتاج السنوي للتعاونية $1000$ قنطار؟',
					answer:
						'4) أ) $S_n = sum_(k=0)^n v_k - 600(n + 1) = 1000 frac((1.05)^(n+1) - 1, 1.05 - 1) - 600(n + 1) = 20000 [(1.05)^(n+1) - 1] - 600(n + 1)$.\n\nب) $u_n > 1000 arrow.l.r.double 1000(1.05)^n - 600 > 1000 arrow.l.r.double (1.05)^n > 1.6 arrow.l.r.double n > frac(ln(1.6), ln(1.05)) approx 9.63$.\nأوّل عدد طبيعي يحقّق الشرط هو $n = 10$، أي ابتداءً من سنة $2020 + 10 = 2030$.',
					mark: '1.75'
				}
			]
		},
		{
			id: 'bac_2023_ge_s2_ex4',
			num: 'الرابع',
			customTitle: 'التمرين الرابع: المسألة الشاملة',
			points: 7,
			content: [
				{
					type: 'text',
					content:
						'*I)* نعتبر الدالة $g$ المعرّفة على $bb(R)$ بـ: $g(x) = e^x - 2 x + 3$.\n\n1) ادرس اتجاه تغيّر الدالة $g$ على $bb(R)$ ثمّ عيّن قيمتها الحدّية الصغرى.\n\n2) استنتج أنّه من أجل كلّ $x in bb(R)$: $g(x) > 0$.',
					answer:
						'*I)* 1) $g$ قابلة للاشتقاق على $bb(R)$ و $g\'(x) = e^x - 2$، تنعدم عند $x = ln(2)$.\nالدالة $g$ متناقصة تماماً على $]-oo ; ln(2)]$ ومتزايدة تماماً على $[ln(2) ; +oo[$، وقيمتها الحدّية الصغرى هي $g(ln(2)) = 2 - 2 ln(2) + 3 = 5 - 2 ln(2) approx 3.61 > 0$.\n\n2) بما أنّ القيمة الحدّية الصغرى الشاملة موجبة تماماً، فإنّ $g(x) > 0$ من أجل كلّ $x in bb(R)$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'*II)* $f$ الدالة المعرّفة على $bb(R)$ بـ: $f(x) = (2 x - 1) e^(-x) + x + 1$، و $(C_f)$ تمثيلها البياني في معلم متعامد ومتجانس $(O ; arrow(i), arrow(j))$ (وحدة الطول $2$ سم).\n\n1) احسب $lim_(x arrow.r -oo) f(x)$ و $lim_(x arrow.r +oo) f(x)$.\n\n2) بيّن أنّ المستقيم $(Delta) : y = x + 1$ مقارب مائل لـ $(C_f)$ عند $+oo$، وادرس وضعية $(C_f)$ بالنسبة إلى $(Delta)$.',
					answer:
						'*II)* 1) عند $-oo$: $lim_(x arrow.r -oo) (2 x - 1) = -oo$ و $lim_(x arrow.r -oo) e^(-x) = +oo$، ومنه $lim_(x arrow.r -oo) f(x) = -oo$.\nعند $+oo$: بالتزايد المقارن $lim_(x arrow.r +oo) (2 x - 1) e^(-x) = 0$، ومنه $lim_(x arrow.r +oo) f(x) = +oo$.\n\n2) $lim_(x arrow.r +oo) [f(x) - (x + 1)] = lim_(x arrow.r +oo) (2 x - 1) e^(-x) = 0$، فالمستقيم $(Delta) : y = x + 1$ مقارب مائل عند $+oo$.\nإشارة $f(x) - (x + 1) = (2 x - 1) e^(-x)$ من إشارة $(2 x - 1)$:\n- على $]-oo ; frac(1, 2)[$: $(C_f)$ تحت $(Delta)$؛ على $]frac(1, 2) ; +oo[$: $(C_f)$ فوق $(Delta)$؛ ويتقاطعان في $A(frac(1, 2) ; frac(3, 2))$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3) بيّن أنّه من أجل كلّ $x in bb(R)$: $f\'(x) = e^(-x) g(x)$، ثمّ شكّل جدول تغيّرات الدالة $f$ وتحقّق أنّ $f(0) = 0$.',
					answer: `3) $f'(x) = 2 e^(-x) - (2 x - 1) e^(-x) + 1 = (3 - 2 x) e^(-x) + 1 = e^(-x) (e^x - 2 x + 3) = e^(-x) g(x)$.
بما أنّ $e^(-x) > 0$ و $g(x) > 0$، فإنّ $f'(x) > 0$ دوماً، فـ $f$ متزايدة تماماً على $bb(R)$، و $f(0) = (-1) e^0 + 0 + 1 = 0$.

#align(center)[#image("${typstSvgPath(ex4FVarUrl)}", width: 50%)]`,
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) أ) بيّن أنّ للمنحني $(C_f)$ نقطة انعطاف يُطلب تعيين فاصلتها، ثمّ اكتب معادلة المماس $(T)$ الموازي للمستقيم $(Delta)$.\n\nب) ارسم $(Delta)$، $(T)$ والمنحني $(C_f)$.',
					answer: `4) أ) $f''(x) = -2 e^(-x) - (3 - 2 x) e^(-x) = (2 x - 5) e^(-x)$، تنعدم وتغيّر إشارتها عند $x = frac(5, 2)$، فهي فاصلة نقطة الانعطاف.
توازي $(T)$ و $(Delta)$ يكافئ $f'(x) = 1 arrow.l.r.double (3 - 2 x) e^(-x) = 0 arrow.l.r.double x = frac(3, 2)$.
بما أنّ $f(frac(3, 2)) = 2 e^(-frac(3, 2)) + frac(5, 2)$، فمعادلة $(T)$ هي: $y = x + 1 + 2 e^(-frac(3, 2))$.

ب) التمثيل البياني للمنحني $(C_f)$ مع $(Delta)$ و $(T)$:

#align(center)[#image("${typstSvgPath(ex4CfUrl)}", width: 58%)]`,
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'5) تحقّق أنّ الدالة $H(x) = -(2 x + 1) e^(-x)$ هي دالة أصلية للدالة $h(x) = (2 x - 1) e^(-x)$، ثمّ استنتج بالسنتيمتر المربع مساحة الحيّز المستوي المحدّد بالمنحني $(C_f)$ والمستقيمات $y = x + 1$، $x = 1$ و $x = 3$.',
					answer:
						'5) $H\'(x) = -2 e^(-x) + (2 x + 1) e^(-x) = (2 x - 1) e^(-x) = h(x)$.\nعلى $[1 ; 3]$ يقع $(C_f)$ فوق $(Delta)$ ووحدة المساحة $4$ سم مربع:\n$cal(A) = 4 integral_1^3 [f(x) - (x + 1)] dif x = 4 [-(2 x + 1) e^(-x)]_1^3 = 4 (-7 e^(-3) + 3 e^(-1)) = (12 e^(-1) - 28 e^(-3))$ سم مربع.',
					mark: '1'
				}
			]
		}
	];

	return buildGePaperSpec({
		year: '2023',
		topicNumber: 2,
		themesAr: [
			'صحيح أم خطأ في الدوال والمتتاليات والنسب',
			'الاحتمالات الشرطية وشجرة الاحتمالات',
			'نمذجة الإنتاج الزراعي بمتتالية تراجعية',
			'الدالة الأسية ونقطة الانعطاف والمساحة'
		],
		exercises
	});
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. دورة جوان 2024 — شعبة تسيير واقتصاد — الموضوع الأول
// ت1 (4ن): الإحصاء بمتغيرين (صادرات التمور)  | ت2 (4ن): المتتالية التناظرية
// ت3 (5ن): الاحتمالات الشرطية والمتغير       | ت4 (7ن): قراءة بيانية لـ (Cg) ودالة لوغاريتمية
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2024GeS1(): OfficialBacGeMathPaperSpec {
	const ex1RegUrl = saveSvgAsset(
		'bac_ext_2024_ge_s1_ex1_reg',
		svgFunctionCurvePlot({
			xMin: 0,
			xMax: 7,
			yMin: 0,
			yMax: 13,
			fn: (x) => 1.2 * x + 3.8,
			curveLabel: '(D)',
			points: [
				{ x: 1, y: 5, label: '', color: '#0f766e' },
				{ x: 2, y: 6, label: '', color: '#0f766e' },
				{ x: 3, y: 8, label: '', color: '#0f766e' },
				{ x: 4, y: 8, label: '', color: '#0f766e' },
				{ x: 5, y: 10, label: '', color: '#0f766e' },
				{ x: 6, y: 11, label: '', color: '#0f766e' },
				{ x: 3.5, y: 8, label: 'G(3.5;8)', color: '#dc2626' }
			],
			width: 350,
			height: 235
		})
	);

	const ex2CobwebUrl = saveSvgAsset(
		'bac_ext_2024_ge_s1_ex2_cobweb',
		svgCobwebSequencePlot({
			xMin: -0.2,
			xMax: 1.4,
			yMin: -0.2,
			yMax: 1.4,
			fn: (x) => (3 * x + 2) / (x + 4),
			u0: 0,
			steps: 3,
			fixedPoint: 1
		})
	);

	const ex3TreeUrl = saveSvgAsset(
		'bac_ext_2024_ge_s1_ex3_tree',
		svgProbabilityTree({
			firstLevel: [
				{
					label: 'U1',
					probLabel: '1/3',
					children: [
						{ label: 'B', probLabel: '3/5' },
						{ label: 'R', probLabel: '2/5' }
					]
				},
				{
					label: 'U2',
					probLabel: '2/3',
					children: [
						{ label: 'B', probLabel: '1/3' },
						{ label: 'R', probLabel: '2/3' }
					]
				}
			]
		})
	);

	const ex4CgSubjUrl = saveSvgAsset(
		'bac_ext_2024_ge_s1_ex4_cg_subj',
		svgFunctionCurvePlot({
			xMin: -0.3,
			xMax: 2.5,
			yMin: -3.5,
			yMax: 4.5,
			fn: (x) => (x > 0.12 ? 2 * x * x - 3 + Math.log(x) : Number.NaN),
			curveLabel: '(Cg)',
			asymptotes: [{ kind: 'vertical', value: 0, label: 'x = 0', color: '#dc2626' }],
			points: [{ x: 1.1862, y: 0, label: 'α', color: '#dc2626' }],
			width: 310,
			height: 225
		})
	);

	const ex4FVarUrl = saveSvgAsset(
		'bac_ext_2024_ge_s1_ex4_f_var',
		svgVariationTable({
			xValues: ['0', 'α', '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '||' },
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

	const alpha2024 = 1.1862;
	const fAlpha2024 = 4 * alpha2024 + 1 - 1 / alpha2024;
	const ex4CfSolUrl = saveSvgAsset(
		'bac_ext_2024_ge_s1_ex4_cf',
		svgFunctionCurvePlot({
			xMin: -0.3,
			xMax: 4.2,
			yMin: 0,
			yMax: 10,
			fn: (x) => (x > 0.14 ? 2 * x + 1 + (2 - Math.log(x)) / x : Number.NaN),
			curveLabel: '(Cf)',
			asymptotes: [
				{ kind: 'vertical', value: 0, label: 'x = 0', color: '#dc2626' },
				{ kind: 'oblique', a: 2, b: 1, label: '(Δ): y = 2x + 1', color: '#059669' }
			],
			tangents: [{ x: 1, y: 5, slope: -1, halfSpan: 1.1, color: '#7c3aed' }],
			points: [
				{ x: 1, y: 5, label: 'A(1;5)', color: '#7c3aed' },
				{ x: alpha2024, y: fAlpha2024, label: '(α;f(α))', color: '#dc2626' }
			],
			shadedIntegral: { a: 1, b: Math.E, color: 'rgba(59,130,246,0.20)' },
			width: 360,
			height: 245
		})
	);

	const exercises: [ExerciseBlock, ExerciseBlock, ExerciseBlock, ExerciseBlock] = [
		{
			id: 'bac_2024_ge_s1_ex1',
			num: 'الأول',
			points: 4,
			instruction:
				'يبيّن الجدول الآتي تطوّر كمية صادرات التمور $y_i$ (بآلاف الأطنان) لتعاونية زراعية جزائرية ما بين سنتي 2018 و 2023، حيث $x_i$ رتبة السنة:',
			content: [
				{
					type: 'table',
					headers: ['السنة', '2018', '2019', '2020', '2021', '2022', '2023'],
					cells: [],
					rows: [
						['رتبة السنة $x_i$', '$1$', '$2$', '$3$', '$4$', '$5$', '$6$'],
						['الصادرات $y_i$', '$5$', '$6$', '$8$', '$8$', '$10$', '$11$']
					],
					align: 'center',
					headerBackground: true,
					width: 'full'
				},
				{
					type: 'text',
					content: '1) عيّن إحداثيي النقطة المتوسّطة $G(bar(x) ; bar(y))$.',
					answer:
						'1) $bar(x) = frac(21, 6) = 3.5$ و $bar(y) = frac(5 + 6 + 8 + 8 + 10 + 11, 6) = frac(48, 6) = 8$. إذن $G(3.5 ; 8)$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'2) جد معادلة مستقيم الانحدار بالمربعات الدنيا $(D)$ لـ $y$ بدلالة $x$ على الشّكل $y = a x + b$.',
					answer:
						'2) $sum_(i=1)^6 (x_i - bar(x))^2 = 17.5$، و $sum_(i=1)^6 (x_i - bar(x))(y_i - bar(y)) = (-2.5)(-3) + (-1.5)(-2) + (-0.5)(0) + (0.5)(0) + (1.5)(2) + (2.5)(3) = 7.5 + 3 + 3 + 7.5 = 21$.\nومنه $a = frac(21, 17.5) = 1.2$ و $b = 8 - 1.2 times 3.5 = 3.8$. المعادلة هي: $y = 1.2 x + 3.8$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content: '3) مثّل سحابة النقط $M_i(x_i ; y_i)$ والنقطة $G$ والمستقيم $(D)$ في معلم متعامد.',
					answer: `3) التمثيل البياني لسحابة النقط والنقطة المتوسّطة $G(3.5 ; 8)$ ومستقيم الانحدار $(D)$:

#align(center)[#image("${typstSvgPath(ex1RegUrl)}", width: 58%)]`,
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'4) قدّر كمية الصادرات المرتقبة سنة 2025، وحدّد أوّل سنة تبلغ فيها الصادرات $17$ ألف طن على الأقلّ.',
					answer:
						'4) سنة 2025 توافق $x = 8$: $y = 1.2(8) + 3.8 = 13.4$ ألف طن.\nبلوغ $17$ ألف طن يكافئ $1.2 x + 3.8 >= 17 arrow.l.r.double 1.2 x >= 13.2 arrow.l.r.double x >= 11$، الموافق لسنة $2017 + 11 = 2028$.',
					mark: '0.75'
				}
			]
		},
		{
			id: 'bac_2024_ge_s1_ex2',
			num: 'الثاني',
			points: 4,
			instruction:
				'نعتبر المتتالية العددية $(u_n)$ المعرّفة على $bb(N)$ بـ: $u_0 = 0$ ومن أجل كلّ عدد طبيعي $n$: $u_(n+1) = frac(3 u_n + 2, u_n + 4)$.',
			content: [
				{
					type: 'text',
					content:
						'1) احسب $u_1$ و $u_2$، ثمّ تحقّق أنّه من أجل كلّ $n in bb(N)$: $u_(n+1) = 3 - frac(10, u_n + 4)$.',
					answer:
						'1) $u_1 = frac(2, 4) = frac(1, 2)$ و $u_2 = frac(frac(3, 2) + 2, frac(1, 2) + 4) = frac(7, 9)$.\nولدينا $3 - frac(10, u_n + 4) = frac(3 u_n + 12 - 10, u_n + 4) = frac(3 u_n + 2, u_n + 4) = u_(n+1)$.',
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'2) برهن بالتراجع أنّه من أجل كلّ $n in bb(N)$: $0 <= u_n < 1$، ثمّ بيّن أنّ $(u_n)$ متزايدة تماماً واستنتج تقاربها.',
					answer: `2) من أجل $n = 0$: $0 <= u_0 = 0 < 1$ محقّقة. نفرض $0 <= u_n < 1$: نجد $4 <= u_n + 4 < 5 arrow.r.double 2 < frac(10, u_n + 4) <= frac(5, 2) arrow.r.double frac(1, 2) <= u_(n+1) < 1$، ومنه $0 <= u_(n+1) < 1$.
الرتابة: $u_(n+1) - u_n = frac(-u_n^2 - u_n + 2, u_n + 4) = frac((1 - u_n)(u_n + 2), u_n + 4) > 0$، فالمتتالية $(u_n)$ متزايدة تماماً ومحدودة من الأعلى بـ $1$، إذن متقاربة.

#align(center)[#image("${typstSvgPath(ex2CobwebUrl)}", width: 52%)]`,
					mark: '1'
				},
				{
					type: 'text',
					content:
						'3) نضع من أجل كلّ $n in bb(N)$: $v_n = frac(u_n - 1, u_n + 2)$.\n\nأ) أثبت أنّ $(v_n)$ متتالية هندسية أساسها $q = frac(2, 5)$ وحدّها الأول $v_0 = -frac(1, 2)$.\n\nب) اكتب $v_n$ ثمّ $u_n$ بدلالة $n$ واحسب $lim_(n arrow.r +oo) u_n$.',
					answer:
						'3) أ) $v_(n+1) = frac(frac(3 u_n + 2, u_n + 4) - 1, frac(3 u_n + 2, u_n + 4) + 2) = frac(2 u_n - 2, 5 u_n + 10) = frac(2, 5) v_n$، و $v_0 = frac(0 - 1, 0 + 2) = -frac(1, 2)$.\n\nب) $v_n = -frac(1, 2) (frac(2, 5))^n$. ومن $u_n = frac(1 + 2 v_n, 1 - v_n)$ نجد $u_n = frac(2 - 2 (frac(2, 5))^n, 2 + (frac(2, 5))^n)$، ومنه $lim_(n arrow.r +oo) u_n = 1$.',
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'4) احسب بدلالة $n$ المجموع: $S_n = frac(1, u_0 + 2) + frac(1, u_1 + 2) + dots + frac(1, u_n + 2)$.',
					answer:
						'4) نلاحظ أنّ $v_k = 1 - frac(3, u_k + 2)$، أي $frac(1, u_k + 2) = frac(1 - v_k, 3)$.\nومجموع $(v_n)$ هو $sum_(k=0)^n v_k = -frac(1, 2) frac(1 - (frac(2, 5))^(n+1), frac(3, 5)) = -frac(5, 6) [1 - (frac(2, 5))^(n+1)]$.\nإذن $S_n = frac(1, 3) [(n + 1) - sum_(k=0)^n v_k] = frac(n, 3) + frac(11, 18) - frac(5, 18) (frac(2, 5))^(n+1)$.',
					mark: '1'
				}
			]
		},
		{
			id: 'bac_2024_ge_s1_ex3',
			num: 'الثالث',
			points: 5,
			instruction:
				'يحتوي صندوق $U_1$ على $3$ كريات بيضاء و $2$ حمراوين، ويحتوي صندوق $U_2$ على $2$ بيضاوين و $4$ حمراء (كل الكريات متماثلة). نرمي زهرة نرد غير مزيّفة أوجهها مرقّمة من $1$ إلى $6$: إذا ظهر مضاعف للعدد $3$ نختار الصندوق $U_1$، وإلّا نختار الصندوق $U_2$.',
			content: [
				{
					type: 'text',
					content: '1) نسحب كرية واحدة من الصندوق المختار. أنجز شجرة الاحتمالات لهذه التجربة.',
					answer: `1) لدينا $P(U_1) = frac(2, 6) = frac(1, 3)$ و $P(U_2) = frac(2, 3)$:

#align(center)[#image("${typstSvgPath(ex3TreeUrl)}", width: 52%)]`,
					mark: '1'
				},
				{
					type: 'text',
					content: '2) احسب احتمال سحب كرية بيضاء $P(B)$ ثمّ استنتج $P(R)$.',
					answer:
						'2) $P(B) = frac(1, 3) times frac(3, 5) + frac(2, 3) times frac(1, 3) = frac(1, 5) + frac(2, 9) = frac(19, 45)$، ومنه $P(R) = 1 - frac(19, 45) = frac(26, 45)$.',
					mark: '1.25'
				},
				{
					type: 'text',
					content: '3) عُلِم أنّ الكرية المسحوبة بيضاء ($B$). ما احتمال أن تكون من الصندوق $U_1$؟',
					answer:
						'3) $P_B (U_1) = frac(P(U_1 sect B), P(B)) = frac(frac(1, 5), frac(19, 45)) = frac(9, 19)$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'4) نسحب الآن **كريتين في آن واحد** من الصندوق المختار نفسه (بعد رمي النرد). ليكن $X$ المتغيّر العشوائي الذي يساوي عدد الكريات البيضاء المسحوبة.\n\nعيّن قانون احتمال المتغيّر العشوائي $X$ ثمّ احسب أمله الرياضياتي $E(X)$.',
					answer: `4) مجموعة قيم $X$ هي $\{0 ; 1 ; 2\}$:
من $U_1$ ($C_5^2 = 10$): $P_(U_1)(X = 2) = frac(3, 10)$، $P_(U_1)(X = 1) = frac(6, 10)$، $P_(U_1)(X = 0) = frac(1, 10)$.
من $U_2$ ($C_6^2 = 15$): $P_(U_2)(X = 2) = frac(1, 15)$، $P_(U_2)(X = 1) = frac(8, 15)$، $P_(U_2)(X = 0) = frac(6, 15)$.

- $P(X = 0) = frac(1, 3) times frac(1, 10) + frac(2, 3) times frac(6, 15) = frac(1, 30) + frac(4, 15) = frac(27, 90) = frac(3, 10)$.

- $P(X = 1) = frac(1, 3) times frac(6, 10) + frac(2, 3) times frac(8, 15) = frac(1, 5) + frac(16, 45) = frac(50, 90) = frac(5, 9)$.

- $P(X = 2) = frac(1, 3) times frac(3, 10) + frac(2, 3) times frac(1, 15) = frac(1, 10) + frac(2, 45) = frac(13, 90)$.

#align(center)[#[#set text(dir: ltr); #table(columns: 4, align: center + horizon, inset: 5pt, [$x_i$], [$0$], [$1$], [$2$], [$P(X = x_i)$], [$frac(27, 90)$], [$frac(50, 90)$], [$frac(13, 90)$])]]

الأمل الرياضياتي: $E(X) = frac(0 + 50 + 26, 90) = frac(76, 90) = frac(38, 45)$.`,
					mark: '1.75'
				}
			]
		},
		{
			id: 'bac_2024_ge_s1_ex4',
			num: 'الرابع',
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
								'*I)* $(C_g)$ التمثيل البياني المقابل للدّالة $g$ المعرّفة على $]0 ; +oo[$ بـ: $g(x) = 2 x^2 - 3 + ln(x)$، يقطع حامل محور الفواصل في نقطة فاصلتها $alpha$.\n\n1) بقراءة بيانية، حدّد إشارة $g(x)$ على $]0 ; +oo[$.\n\n2) تحقّق حسابياً أنّ $1.1 < alpha < 1.2$.',
							answer:
								'*I)* 1) بقراءة بيانية: $g(x) < 0$ على $]0 ; alpha[$، $g(alpha) = 0$، و $g(x) > 0$ على $]alpha ; +oo[$.\n\n2) $g$ مستمرة ومتزايدة تماماً على $[1.1 ; 1.2]$، ولدينا $g(1.1) = 2.42 - 3 + ln(1.1) approx -0.485 < 0$ و $g(1.2) = 2.88 - 3 + ln(1.2) approx +0.062 > 0$، إذن $1.1 < alpha < 1.2$.',
							mark: '1.5'
						},
						{
							type: 'image',
							src: ex4CgSubjUrl,
							caption: 'المنحني البياني $(C_g)$ للدالة $g$'
						}
					]
				},
				{
					type: 'text',
					content:
						'*II)* $f$ الدالة المعرّفة على $]0 ; +oo[$ بـ: $f(x) = 2 x + 1 + frac(2 - ln(x), x)$، و $(C_f)$ تمثيلها البياني في المعلم المتعامد والمتجانس $(O ; arrow(i), arrow(j))$ (وحدة الطول $2$ سم).\n\n1) احسب $lim_(x arrow.r 0^+) f(x)$ و $lim_(x arrow.r +oo) f(x)$.\n\n2) بيّن أنّ المستقيم $(Delta) : y = 2 x + 1$ مقارب مائل لـ $(C_f)$ عند $+oo$، ثمّ ادرس الوضعية النسبية لـ $(C_f)$ و $(Delta)$.',
					answer:
						'*II)* 1) $lim_(x arrow.r 0^+) f(x) = +oo$ (ومنه $x = 0$ مقارب عمودي)، و $lim_(x arrow.r +oo) f(x) = +oo$ (بالتزايد المقارن $lim_(x arrow.r +oo) frac(ln(x), x) = 0$).\n\n2) $lim_(x arrow.r +oo) [f(x) - (2 x + 1)] = lim_(x arrow.r +oo) frac(2 - ln(x), x) = 0$، فالمستقيم $(Delta) : y = 2 x + 1$ مقارب مائل.\nالوضعية: $f(x) - (2 x + 1) = frac(2 - ln(x), x)$ ينعدم عند $x = e^2$:\n- على $]0 ; e^2[$: $(C_f)$ فوق $(Delta)$؛ على $]e^2 ; +oo[$: $(C_f)$ تحت $(Delta)$؛ ويتقاطعان في $(e^2 ; 2 e^2 + 1)$.',
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'3) أ) بيّن أنّه من أجل كلّ $x in ]0 ; +oo[$: $f\'(x) = frac(g(x), x^2)$، ثمّ شكّل جدول تغيّرات الدالة $f$.\n\nب) بيّن أنّ $f(alpha) = 4 alpha + 1 - frac(1, alpha)$.',
					answer: `3) أ) $f'(x) = 2 + frac((-frac(1, x)) x - (2 - ln(x)), x^2) = frac(2 x^2 - 3 + ln(x), x^2) = frac(g(x), x^2)$.
فالدالة $f$ متناقصة تماماً على $]0 ; alpha]$ ومتزايدة تماماً على $[alpha ; +oo[$.

#align(center)[#image("${typstSvgPath(ex4FVarUrl)}", width: 54%)]

ب) من $g(alpha) = 0$ لدينا $ln(alpha) = 3 - 2 alpha^2$، ومنه:
$f(alpha) = 2 alpha + 1 + frac(2 - (3 - 2 alpha^2), alpha) = 2 alpha + 1 + frac(2 alpha^2 - 1, alpha) = 4 alpha + 1 - frac(1, alpha) approx 4.90$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) اكتب معادلة المماس $(T)$ للمنحني $(C_f)$ عند النقطة $A$ ذات الفاصلة $1$، ثمّ ارسم $(Delta)$، $(T)$ والمنحني $(C_f)$.',
					answer: `4) لدينا $f(1) = 5$ و $f'(1) = g(1) = -1$، فمعادلة المماس $(T)$ عند $A(1 ; 5)$ هي: $y = -(x - 1) + 5 = -x + 6$.

#align(center)[#image("${typstSvgPath(ex4CfSolUrl)}", width: 58%)]`,
					mark: '1.75'
				},
				{
					type: 'text',
					content:
						'5) تحقّق أنّ $H(x) = 2 ln(x) - frac(1, 2)(ln(x))^2$ دالة أصلية للدالة $x arrow.r.bar frac(2 - ln(x), x)$ على $]0 ; +oo[$، ثمّ استنتج بالسنتيمتر المربع مساحة الحيّز المحدّد بـ $(C_f)$ و $(Delta)$ والمستقيمين $x = 1$ و $x = e$.',
					answer:
						'5) $H\'(x) = frac(2, x) - frac(ln(x), x) = frac(2 - ln(x), x)$.\nعلى $[1 ; e] subset ]0 ; e^2[$ يقع $(C_f)$ فوق $(Delta)$ ووحدة المساحة $4$ سم مربع:\n$cal(A) = 4 integral_1^e [f(x) - (2 x + 1)] dif x = 4 [H(e) - H(1)] = 4 (2 - frac(1, 2) - 0) = 6$ سم مربع.',
					mark: '1'
				}
			]
		}
	];

	return buildGePaperSpec({
		year: '2024',
		topicNumber: 1,
		themesAr: [
			'الإحصاء بمتغيرين وتعديل صادرات التمور',
			'المتتالية التناظرية والمتتالية الهندسية المساعدة',
			'الاحتمالات الشرطية والمتغير العشوائي',
			'القراءة البيانية لـ (Cg) ودراسة دالة لوغاريتمية'
		],
		exercises
	});
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4. دورة جوان 2024 — شعبة تسيير واقتصاد — الموضوع الثاني
// ت1 (4ن): صحيح أم خطأ مع التبرير           | ت2 (4ن): الاحتمالات الشرطية (مكتبة جامعية)
// ت3 (5ن): المتتاليات والمتتالية اللوغاريتمية | ت4 (7ن): دالة أسية وتطبيق اقتصادي (الربح الحلال)
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2024GeS2(): OfficialBacGeMathPaperSpec {
	const ex2TreeUrl = saveSvgAsset(
		'bac_ext_2024_ge_s2_ex2_tree',
		svgProbabilityTree({
			firstLevel: [
				{
					label: 'S',
					probLabel: '0.7',
					children: [
						{ label: 'A', probLabel: '0.6' },
						{ label: 'F', probLabel: '0.4' }
					]
				},
				{
					label: 'L',
					probLabel: '0.3',
					children: [
						{ label: 'A', probLabel: '0.8' },
						{ label: 'F', probLabel: '0.2' }
					]
				}
			]
		})
	);

	const ex3CobwebUrl = saveSvgAsset(
		'bac_ext_2024_ge_s2_ex3_cobweb',
		svgCobwebSequencePlot({
			xMin: 3.5,
			xMax: 5.5,
			yMin: 3.5,
			yMax: 5.5,
			fn: (x) => 0.5 * x + 2,
			u0: 5,
			steps: 3,
			fixedPoint: 4
		})
	);

	const ex4FVarUrl = saveSvgAsset(
		'bac_ext_2024_ge_s2_ex4_f_var',
		svgVariationTable({
			xValues: ['-∞', '3', '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '+' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '-' }
			],
			variations: [
				{ value: '-∞', position: 'bottom' },
				{ value: 'f(3)', position: 'top' },
				{ value: '0', position: 'bottom' }
			],
			fnName: 'f(x)',
			derivName: "f'(x)"
		})
	);

	const ex4CfUrl = saveSvgAsset(
		'bac_ext_2024_ge_s2_ex4_cf',
		svgFunctionCurvePlot({
			xMin: 0,
			xMax: 7,
			yMin: -1.5,
			yMax: 2.0,
			fn: (x) => 2 * (x - 1) * Math.exp(-0.5 * x),
			curveLabel: '(Cf)',
			asymptotes: [{ kind: 'horizontal', value: 0, label: 'y = 0', color: '#dc2626' }],
			tangents: [{ x: 1, y: 0, slope: 2 * Math.exp(-0.5), halfSpan: 0.9, color: '#059669' }],
			points: [
				{ x: 1, y: 0, label: '(1;0)', color: '#0f172a' },
				{ x: 3, y: 4 * Math.exp(-1.5), label: 'S(3;f(3))', color: '#dc2626' },
				{ x: 5, y: 8 * Math.exp(-2.5), label: 'I(5;f(5))', color: '#7c3aed' }
			],
			shadedIntegral: { a: 1, b: 5, color: 'rgba(59,130,246,0.20)' },
			width: 360,
			height: 245
		})
	);

	const exercises: [ExerciseBlock, ExerciseBlock, ExerciseBlock, ExerciseBlock] = [
		{
			id: 'bac_2024_ge_s2_ex1',
			num: 'الأول',
			points: 4,
			instruction: 'أجب بصحيح أو خاطئ مع التبرير في كلّ حالة من الحالات الأربع الآتية:',
			content: [
				{
					type: 'text',
					content:
						'1) الدالة $x arrow.r.bar x e^x$ هي دالة أصلية للدالة $x arrow.r.bar (x + 1) e^x$ على $bb(R)$.',
					answer:
						'1) *صحيح*: باشتقاق الجداء نجد $(x e^x)\' = 1 times e^x + x e^x = (x + 1) e^x$ من أجل كلّ $x in bb(R)$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'2) القيمة المتوسطة للدالة $f(x) = frac(2, x)$ على المجال $[1 ; e]$ تساوي $frac(2, e - 1)$.',
					answer:
						'2) *صحيح*: $m = frac(1, e - 1) integral_1^e frac(2, x) dif x = frac(1, e - 1) [2 ln(x)]_1^e = frac(2(1 - 0), e - 1) = frac(2, e - 1)$.',
					mark: '1'
				},
				{
					type: 'text',
					content: '3) حلّ المعادلة $ln(x - 5) = ln(1 - x)$ في $bb(R)$ هو $x = 3$.',
					answer:
						'3) *خاطئ*: مجموعة تعريف المعادلة تشترط $x - 5 > 0$ و $1 - x > 0$ معاً، أي $x > 5$ و $x < 1$، وهو مستحيل؛ فمجموعة الحلول هي $emptyset$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'4) إذا ارتفع إنتاج مصنع بنسبة $20%$ سنوياً لمدة سنتين متتاليتين، فإنّ نسبة الزيادة الإجمالية هي $40%$.',
					answer:
						'4) *خاطئ*: المعامل الضربي الإجمالي يساوي $1.20 times 1.20 = 1.44$، أي أنّ نسبة الزيادة الإجمالية هي $44% != 40%$.',
					mark: '1'
				}
			]
		},
		{
			id: 'bac_2024_ge_s2_ex2',
			num: 'الثاني',
			points: 4,
			instruction:
				'تضمّ مكتبة جامعية $70%$ من الكتب العلمية ($S$) و $30%$ من الكتب الأدبية ($L$). من بين الكتب العلمية، $60%$ مكتوبة باللغة العربية ($A$) والباقي بلغات أجنبية ($F = overline(A)$). أمّا الكتب الأدبية فـ $80%$ منها باللغة العربية والباقي بلغات أجنبية. نختار عشوائياً كتاباً واحداً من المكتبة.',
			content: [
				{
					type: 'text',
					content: '1) أنجز شجرة الاحتمالات التي تُنمذج هذه التجربة.',
					answer: `1) شجرة الاحتمالات الموزونة:

#align(center)[#image("${typstSvgPath(ex2TreeUrl)}", width: 52%)]`,
					mark: '0.75'
				},
				{
					type: 'text',
					content: '2) احسب $P(A)$ ثمّ استنتج $P(overline(A))$.',
					answer:
						'2) $P(A) = 0.7 times 0.6 + 0.3 times 0.8 = 0.42 + 0.24 = 0.66$، ومنه $P(overline(A)) = 1 - 0.66 = 0.34$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'3) عُلِم أنّ الكتاب المختار بلغة أجنبية ($overline(A)$). احسب احتمال أن يكون كتاباً علمياً ($S$).',
					answer:
						'3) $P_(overline(A))(S) = frac(P(S sect overline(A)), P(overline(A))) = frac(0.7 times 0.4, 0.34) = frac(0.28, 0.34) = frac(14, 17) approx 0.824$.',
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'4) يبلغ وزن الكتاب الأدبي العربي $300$ غ، الأدبي الأجنبي $400$ غ، العلمي العربي $500$ غ، والعلمي الأجنبي $600$ غ. ليكن $X$ المتغيّر العشوائي لوزن الكتاب المختار.\n\nعيّن قانون احتمال $X$ واحسب أمله الرياضياتي $E(X)$.',
					answer: `4) قيم $X$ هي $\{300 ; 400 ; 500 ; 600\}$:

- $P(X = 300) = 0.3 times 0.8 = 0.24$، $P(X = 400) = 0.3 times 0.2 = 0.06$.

- $P(X = 500) = 0.7 times 0.6 = 0.42$، $P(X = 600) = 0.7 times 0.4 = 0.28$.

#align(center)[#[#set text(dir: ltr); #table(columns: 5, align: center + horizon, inset: 5pt, [$x_i$], [$300$], [$400$], [$500$], [$600$], [$P(X = x_i)$], [$0.24$], [$0.06$], [$0.42$], [$0.28$])]]

$E(X) = 300(0.24) + 400(0.06) + 500(0.42) + 600(0.28) = 72 + 24 + 210 + 168 = 474$ غ.`,
					mark: '1.5'
				}
			]
		},
		{
			id: 'bac_2024_ge_s2_ex3',
			num: 'الثالث',
			points: 5,
			instruction:
				'$(u_n)$ المتتالية العددية المعرّفة على $bb(N)$ بـ: $u_0 = 5$ و $u_(n+1) = frac(1, 2) u_n + 2$.',
			content: [
				{
					type: 'text',
					content:
						'1) احسب $u_1$ و $u_2$، ثمّ برهن بالتراجع أنّه من أجل كلّ $n in bb(N)$: $u_n > 4$.',
					answer:
						'1) $u_1 = frac(5, 2) + 2 = 4.5$ و $u_2 = frac(4.5, 2) + 2 = 4.25$.\nالبرهان بالتراجع: $u_0 = 5 > 4$ محقّقة؛ نفرض $u_n > 4$ فنجد $frac(1, 2) u_n > 2 arrow.r.double u_(n+1) > 4$.',
					mark: '0.75'
				},
				{
					type: 'text',
					content: '2) بيّن أنّ المتتالية $(u_n)$ متناقصة تماماً واستنتج تقاربها.',
					answer: `2) $u_(n+1) - u_n = -frac(1, 2) u_n + 2 = frac(4 - u_n, 2) < 0$ لأنّ $u_n > 4$، فهي متناقصة تماماً ومحدودة من الأسفل بـ $4$، إذن متقاربة.

#align(center)[#image("${typstSvgPath(ex3CobwebUrl)}", width: 52%)]`,
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'3) نضع $v_n = u_n - 4$. أثبت أنّ $(v_n)$ هندسية أساسها $frac(1, 2)$، ثمّ اكتب $v_n$ و $u_n$ بدلالة $n$ واحسب $lim_(n arrow.r +oo) u_n$.',
					answer:
						'3) $v_(n+1) = u_(n+1) - 4 = frac(1, 2) u_n - 2 = frac(1, 2) v_n$، وحدّها الأول $v_0 = 5 - 4 = 1$.\nومنه $v_n = (frac(1, 2))^n$ و $u_n = 4 + (frac(1, 2))^n$، وبالتالي $lim_(n arrow.r +oo) u_n = 4$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) نضع من أجل كلّ $n in bb(N)$: $w_n = ln(v_n)$.\n\nأ) بيّن أنّ $(w_n)$ متتالية حسابية أساسها $-ln(2)$ وحدّها الأول $w_0 = 0$.\n\nب) احسب المجموع $T_n = w_0 + w_1 + dots + w_n$ ثمّ استنتج الجداء $P_n = v_0 times v_1 times dots times v_n$.',
					answer:
						'4) أ) $w_n = ln((frac(1, 2))^n) = -n ln(2)$، ومنه $w_(n+1) - w_n = -ln(2)$ و $w_0 = 0$؛ فهي حسابية أساسها $-ln(2)$.\n\nب) $T_n = frac(n + 1, 2)(w_0 + w_n) = -frac(n(n + 1), 2) ln(2)$.\nوبما أنّ $ln(P_n) = sum_(k=0)^n ln(v_k) = T_n$ فإنّ $P_n = e^(T_n) = 2^(-frac(n(n + 1), 2))$.',
					mark: '2'
				}
			]
		},
		{
			id: 'bac_2024_ge_s2_ex4',
			num: 'الرابع',
			customTitle: 'التمرين الرابع: المسألة الشاملة',
			points: 7,
			content: [
				{
					type: 'text',
					content:
						'*I)* نعتبر الدالة $f$ المعرّفة على $bb(R)$ بـ: $f(x) = 2(x - 1) e^(-0.5 x)$، و $(C_f)$ تمثيلها البياني في المعلم المتعامد والمتجانس $(O ; arrow(i), arrow(j))$.\n\n1) احسب $lim_(x arrow.r -oo) f(x)$ و $lim_(x arrow.r +oo) f(x)$ وفسّر النتيجة الثانية هندسياً.',
					answer:
						'*I)* 1) عند $-oo$: $lim_(x arrow.r -oo) 2(x - 1) = -oo$ و $lim_(x arrow.r -oo) e^(-0.5 x) = +oo$ ومنه $lim_(x arrow.r -oo) f(x) = -oo$.\nعند $+oo$: بوضع $t = 0.5 x arrow.r +oo$ وبالتزايد المقارن $lim_(x arrow.r +oo) f(x) = 0$. فحامل محور الفواصل $(y = 0)$ مقارب أفقي لـ $(C_f)$ عند $+oo$.',
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'2) بيّن أنّه من أجل كلّ $x in bb(R)$: $f\'(x) = (3 - x) e^(-0.5 x)$، ثمّ ادرس اتجاه تغيّر $f$ وشكّل جدول تغيّراتها.',
					answer: `2) $f'(x) = 2 e^(-0.5 x) - 0.5 times 2(x - 1) e^(-0.5 x) = (3 - x) e^(-0.5 x)$.
بما أنّ $e^(-0.5 x) > 0$ فإنّ $f$ متزايدة تماماً على $]-oo ; 3]$ ومتناقصة تماماً على $[3 ; +oo[$، وقيمتها الحدّية العظمى $f(3) = 4 e^(-1.5) approx 0.893$.

#align(center)[#image("${typstSvgPath(ex4FVarUrl)}", width: 52%)]`,
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3) عيّن إحداثيي نقطة الانعطاف $I$ للمنحني $(C_f)$، واكتب معادلة المماس $(T)$ عند النقطة ذات الفاصلة $1$، ثمّ ارسم $(T)$ و $(C_f)$ على $[0 ; 7]$.',
					answer: `3) $f''(x) = -e^(-0.5 x) - 0.5(3 - x) e^(-0.5 x) = frac(1, 2)(x - 5) e^(-0.5 x)$، تنعدم وتغيّر إشارتها عند $x = 5$، فـ $I(5 ; 8 e^(-2.5))$ نقطة انعطاف.
عند $x = 1$: $f(1) = 0$ و $f'(1) = 2 e^(-0.5)$، ومنه $(T) : y = 2 e^(-0.5)(x - 1)$.

#align(center)[#image("${typstSvgPath(ex4CfUrl)}", width: 58%)]`,
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'*II)* تُنمذج دالة الربح الشهري الصافي لمؤسسة صناعية (بمئات الآلاف من الدنانير) بدلالة كمية الإنتاج $x$ (بمئات الوحدات، $x in [1 ; 6]$) بالعبارة: $B(x) = 10 f(x) = 20(x - 1) e^(-0.5 x)$.\n\n1) حدّد كمية الإنتاج التي تحقّق أقصى ربح شهري، واحسب هذا الربح الأقصى مدوّراً إلى ألف دينار.',
					answer:
						'*II)* 1) بما أنّ $B(x) = 10 f(x)$ و $10 > 0$، فإنّ $B$ تبلغ قيمتها الحدّية العظمى على $[1 ; 6]$ عند $x = 3$ (أي إنتاج $300$ وحدة).\nأقصى ربح شهري هو $B(3) = 40 e^(-1.5) approx 8.925$ مئات آلاف دج، أي حوالي $893000$ دج.',
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'2) بيّن أنّ الدالة $H(x) = -4(x + 1) e^(-0.5 x)$ دالة أصلية للدالة $f$ على $bb(R)$، ثمّ استنتج القيمة المتوسطة للربح الشهري $B(x)$ عندما يتراوح الإنتاج بين $100$ و $500$ وحدة (أي على $[1 ; 5]$).',
					answer:
						'2) $H\'(x) = -4 e^(-0.5 x) + 2(x + 1) e^(-0.5 x) = 2(x - 1) e^(-0.5 x) = f(x)$.\nالقيمة المتوسطة للربح على $[1 ; 5]$ هي:\n$m = frac(1, 5 - 1) integral_1^5 10 f(x) dif x = 2.5 [H(5) - H(1)] = 2.5 (-24 e^(-2.5) + 8 e^(-0.5)) = 20 e^(-0.5) - 60 e^(-2.5) approx 7.206$ مئات آلاف دج (أي نحو $720600$ دج).',
					mark: '1.5'
				}
			]
		}
	];

	return buildGePaperSpec({
		year: '2024',
		topicNumber: 2,
		themesAr: [
			'صحيح أم خطأ في التكامل والمعادلات اللوغاريتمية والنسب',
			'الاحتمالات الشرطية والمتغير العشوائي',
			'المتتالية التراجعية والجداء عبر اللوغاريتم',
			'الدالة الأسية وتعظيم الربح الإنتاجي'
		],
		exercises
	});
}

// ═══════════════════════════════════════════════════════════════════════════════
// 5. دورة جوان 2025 — شعبة تسيير واقتصاد — الموضوع الأول
// ت1 (4ن): شجرة الاحتمالات (شركة تغليف)       | ت2 (4ن): الإحصاء والانحدار الخطي
// ت3 (5ن): المتتالية الكسرية                | ت4 (7ن): جدول تغيرات g المعطى ودالة أسية
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2025GeS1(): OfficialBacGeMathPaperSpec {
	const ex1TreeSubjUrl = saveSvgAsset(
		'bac_ext_2025_ge_s1_ex1_tree_subj',
		svgProbabilityTree({
			firstLevel: [
				{
					label: 'A',
					probLabel: '0.55',
					children: [
						{ label: 'E', probLabel: '0.02' },
						{ label: 'S', probLabel: '?' }
					]
				},
				{
					label: 'B',
					probLabel: '?',
					children: [
						{ label: 'E', probLabel: '?' },
						{ label: 'S', probLabel: '?' }
					]
				}
			]
		})
	);

	const ex1TreeSolUrl = saveSvgAsset(
		'bac_ext_2025_ge_s1_ex1_tree_sol',
		svgProbabilityTree({
			firstLevel: [
				{
					label: 'A',
					probLabel: '0.55',
					children: [
						{ label: 'E', probLabel: '0.02' },
						{ label: 'S', probLabel: '0.98' }
					]
				},
				{
					label: 'B',
					probLabel: '0.45',
					children: [
						{ label: 'E', probLabel: '0.04' },
						{ label: 'S', probLabel: '0.96' }
					]
				}
			]
		})
	);

	const ex2RegUrl = saveSvgAsset(
		'bac_ext_2025_ge_s1_ex2_reg',
		svgFunctionCurvePlot({
			xMin: 0,
			xMax: 7,
			yMin: 0,
			yMax: 12,
			fn: (x) => 1.6 * x + 0.4,
			curveLabel: '(D)',
			points: [
				{ x: 1, y: 2, label: '', color: '#0f766e' },
				{ x: 2, y: 3, label: '', color: '#0f766e' },
				{ x: 3, y: 6, label: '', color: '#0f766e' },
				{ x: 4, y: 7, label: '', color: '#0f766e' },
				{ x: 5, y: 8, label: '', color: '#0f766e' },
				{ x: 6, y: 10, label: '', color: '#0f766e' },
				{ x: 3.5, y: 6, label: 'G(3.5;6)', color: '#dc2626' }
			],
			width: 350,
			height: 235
		})
	);

	const ex3CobwebUrl = saveSvgAsset(
		'bac_ext_2025_ge_s1_ex3_cobweb',
		svgCobwebSequencePlot({
			xMin: 1.5,
			xMax: 3.4,
			yMin: 1.5,
			yMax: 3.4,
			fn: (x) => (4 * x - 2) / (x + 1),
			u0: 3,
			steps: 3,
			fixedPoint: 2
		})
	);

	const ex4GVarSubjUrl = saveSvgAsset(
		'bac_ext_2025_ge_s1_ex4_g_subj',
		svgVariationTable({
			xValues: ['-∞', '-2', 'α', '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '-' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '+' },
				{ kind: 'sign', value: '+' }
			],
			variations: [
				{ value: '-2', position: 'top' },
				{ value: 'g(-2)', position: 'bottom' },
				{ value: '0', position: 'mid' },
				{ value: '+∞', position: 'top' }
			],
			fnName: 'g(x)',
			derivName: "g'(x)"
		})
	);

	const ex4FVarSolUrl = saveSvgAsset(
		'bac_ext_2025_ge_s1_ex4_f_var',
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

	const alpha2025 = 0.3748;
	const fAlpha2025 = alpha2025 * Math.exp(alpha2025) - 2 * alpha2025 + 1;
	const ex4CfSolUrl = saveSvgAsset(
		'bac_ext_2025_ge_s1_ex4_cf',
		svgFunctionCurvePlot({
			xMin: -2.6,
			xMax: 1.8,
			yMin: -0.6,
			yMax: 6.2,
			fn: (x) => x * Math.exp(x) - 2 * x + 1,
			curveLabel: '(Cf)',
			asymptotes: [{ kind: 'oblique', a: -2, b: 1, label: '(Δ): y = -2x + 1', color: '#dc2626' }],
			tangents: [
				{
					x: -1,
					y: 3 - Math.exp(-1),
					slope: -2,
					halfSpan: 1.5,
					color: '#059669'
				}
			],
			points: [
				{ x: 0, y: 1, label: 'A(0;1)', color: '#0f172a' },
				{ x: -2, y: 5 - 2 * Math.exp(-2), label: 'B', color: '#7c3aed' },
				{ x: alpha2025, y: fAlpha2025, label: '(α;f(α))', color: '#dc2626' }
			],
			shadedIntegral: { a: -1, b: 0, color: 'rgba(59,130,246,0.20)' },
			width: 360,
			height: 245
		})
	);

	const exercises: [ExerciseBlock, ExerciseBlock, ExerciseBlock, ExerciseBlock] = [
		{
			id: 'bac_2025_ge_s1_ex1',
			num: 'الأول',
			points: 4,
			instruction:
				'تستعمل مؤسسة لتغليف المواد الغذائية آلتي تعبئة $A$ و $B$؛ تعبّئ الآلة $A$ نسبة $55%$ من العلب وتعبّئ الآلة $B$ الباقي. لوحظ أنّ نسبة العلب التي بها خلل في الوزن ($E$) هي $2%$ من إنتاج الآلة $A$ و $4%$ من إنتاج الآلة $B$ (ونرمز بالرمز $S = overline(E)$ لحادثة العلبة السليمة). نسحب عشوائياً علبة واحدة.',
			content: [
				{
					type: 'columns',
					widths: ['1.2fr', '1fr'],
					children: [
						{
							type: 'text',
							content: '1) انقل وأكمل شجرة الاحتمالات المقابلة.',
							answer: `1) $P(B) = 0.45$، $P_A(S) = 0.98$، $P_B(E) = 0.04$، $P_B(S) = 0.96$:

#align(center)[#image("${typstSvgPath(ex1TreeSolUrl)}", width: 82%)]`,
							mark: '1'
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
					content: '2) احسب $P(A sect E)$ ثمّ بيّن أنّ $P(E) = 0.029$.',
					answer:
						'2) $P(A sect E) = 0.55 times 0.02 = 0.011$.\nوبدستور الاحتمالات الكلية: $P(E) = 0.55 times 0.02 + 0.45 times 0.04 = 0.011 + 0.018 = 0.029$.',
					mark: '1'
				},
				{
					type: 'text',
					content: '3) عُلِم أنّ العلبة بها خلل في الوزن ($E$). ما احتمال أن تكون من الآلة $B$؟',
					answer:
						'3) $P_E(B) = frac(P(B sect E), P(E)) = frac(0.018, 0.029) = frac(18, 29) approx 0.621$.',
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'4) تحقّق المؤسسة ربحاً قدره $50$ دج في العلبة السليمة، بينما ينخفض الربح إلى $10$ دج في العلبة التي تُعاد تعبئتها. ليكن $X$ المتغيّر العشوائي لصافي الربح من العلبة المختارة.\n\nعيّن قانون احتمال $X$ واحسب أمله الرياضياتي $E(X)$.',
					answer: `4) قيم $X$ هي $\{10 ; 50\}$ مع $P(X = 10) = 0.029$ و $P(X = 50) = 0.971$:

#align(center)[#[#set text(dir: ltr); #table(columns: 3, align: center + horizon, inset: 5pt, [$x_i$], [$10$], [$50$], [$P(X = x_i)$], [$0.029$], [$0.971$])]]

$E(X) = 10(0.029) + 50(0.971) = 0.29 + 48.55 = 48.84$ دج.`,
					mark: '1.25'
				}
			]
		},
		{
			id: 'bac_2025_ge_s1_ex2',
			num: 'الثاني',
			points: 4,
			instruction:
				'يمثّل الجدول الآتي تطوّر إنتاج الكهرباء الشمسية $y_i$ (بالميغاواط ساعي) في وحدة صناعية خلال $6$ سنوات متتالية، حيث $x_i$ رتبة السنة:',
			content: [
				{
					type: 'table',
					headers: ['السنة', '2019', '2020', '2021', '2022', '2023', '2024'],
					cells: [],
					rows: [
						['رتبة السنة $x_i$', '$1$', '$2$', '$3$', '$4$', '$5$', '$6$'],
						['الإنتاج $y_i$', '$2$', '$3$', '$6$', '$7$', '$8$', '$10$']
					],
					align: 'center',
					headerBackground: true,
					width: 'full'
				},
				{
					type: 'text',
					content: '1) احسب إحداثيي النقطة المتوسّطة $G(bar(x) ; bar(y))$.',
					answer:
						'1) $bar(x) = 3.5$ و $bar(y) = frac(2 + 3 + 6 + 7 + 8 + 10, 6) = frac(36, 6) = 6$، ومنه $G(3.5 ; 6)$.',
					mark: '1'
				},
				{
					type: 'text',
					content: '2) بيّن أنّ معادلة مستقيم الانحدار $(D)$ بالمربعات الدنيا هي $y = 1.6 x + 0.4$.',
					answer:
						'2) $sum (x_i - bar(x))^2 = 17.5$ و $sum (x_i - bar(x))(y_i - bar(y)) = 10 + 4.5 + 0 + 0.5 + 3 + 10 = 28$.\nومنه $a = frac(28, 17.5) = 1.6$ و $b = 6 - 1.6 times 3.5 = 0.4$، أي $y = 1.6 x + 0.4$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content: '3) مثّل سحابة النقط والنقطة $G$ والمستقيم $(D)$ في معلم متعامد.',
					answer: `3) التمثيل البياني لسحابة النقط والنقطة $G(3.5 ; 6)$ ومستقيم الانحدار $(D)$:

#align(center)[#image("${typstSvgPath(ex2RegUrl)}", width: 58%)]`,
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'4) قدّر الإنتاج الكهربائي الشمسي المتوقّع سنة 2026، وحدّد أوّل سنة يتجاوز فيها $15$ ميغاواط ساعي.',
					answer:
						'4) سنة 2026 توافق $x = 8$: $y = 1.6(8) + 0.4 = 13.2$ ميغاواط ساعي.\n$1.6 x + 0.4 > 15 arrow.l.r.double 1.6 x > 14.6 arrow.l.r.double x > 9.125 arrow.r.double x = 10$، الموافق لسنة $2018 + 10 = 2028$.',
					mark: '0.75'
				}
			]
		},
		{
			id: 'bac_2025_ge_s1_ex3',
			num: 'الثالث',
			points: 5,
			instruction:
				'$(u_n)$ متتالية عددية معرّفة على $bb(N)$ بحدّها الأول $u_0 = 3$ والعلاقة: $u_(n+1) = frac(4 u_n - 2, u_n + 1)$.',
			content: [
				{
					type: 'text',
					content:
						'1) احسب الحدّين $u_1$ و $u_2$، وتحقّق أنّه من أجل كلّ $n in bb(N)$: $u_(n+1) = 4 - frac(6, u_n + 1)$.',
					answer:
						'1) $u_1 = frac(10, 4) = frac(5, 2)$ و $u_2 = frac(8, frac(7, 2)) = frac(16, 7)$.\nولدينا $4 - frac(6, u_n + 1) = frac(4 u_n + 4 - 6, u_n + 1) = frac(4 u_n - 2, u_n + 1) = u_(n+1)$.',
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'2) برهن بالتراجع أنّه من أجل كلّ $n in bb(N)$: $u_n > 2$، ثمّ ادرس اتجاه تغيّر $(u_n)$ واستنتج تقاربها.',
					answer: `2) من أجل $n = 0$: $u_0 = 3 > 2$ محقّقة. نفرض $u_n > 2$: نجد $u_n + 1 > 3 arrow.r.double 0 < frac(6, u_n + 1) < 2 arrow.r.double 2 < 4 - frac(6, u_n + 1) < 4$، ومنه $u_(n+1) > 2$.
اتجاه التغيّر: $u_(n+1) - u_n = frac(-u_n^2 + 3 u_n - 2, u_n + 1) = frac(-(u_n - 1)(u_n - 2), u_n + 1) < 0$، فالمتتالية $(u_n)$ متناقصة تماماً ومحدودة من الأسفل بـ $2$، إذن متقاربة.

#align(center)[#image("${typstSvgPath(ex3CobwebUrl)}", width: 52%)]`,
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'3) نضع $v_n = frac(u_n - 2, u_n - 1)$ لكلّ $n in bb(N)$.\n\nأ) أثبت أنّ $(v_n)$ متتالية هندسية أساسها $q = frac(2, 3)$ وحدّها الأول $v_0 = frac(1, 2)$.\n\nب) اكتب $v_n$ ثمّ $u_n$ بدلالة $n$ واحسب $lim_(n arrow.r +oo) u_n$.',
					answer:
						'3) أ) $v_(n+1) = frac(frac(4 u_n - 2, u_n + 1) - 2, frac(4 u_n - 2, u_n + 1) - 1) = frac(2 u_n - 4, 3 u_n - 3) = frac(2, 3) v_n$، و $v_0 = frac(3 - 2, 3 - 1) = frac(1, 2)$.\n\nب) $v_n = frac(1, 2) (frac(2, 3))^n$، ومن $u_n = frac(2 - v_n, 1 - v_n)$ نجد $u_n = frac(4 - (frac(2, 3))^n, 2 - (frac(2, 3))^n)$، وعليه $lim_(n arrow.r +oo) u_n = 2$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) احسب بدلالة $n$ المجموع: $S_n = frac(1, u_0 - 1) + frac(1, u_1 - 1) + dots + frac(1, u_n - 1)$.',
					answer:
						'4) لدينا $v_k = 1 - frac(1, u_k - 1)$، أي $frac(1, u_k - 1) = 1 - v_k$.\nومجموع $(v_n)$ هو $sum_(k=0)^n v_k = frac(1, 2) frac(1 - (frac(2, 3))^(n+1), frac(1, 3)) = frac(3, 2) [1 - (frac(2, 3))^(n+1)] = frac(3, 2) - (frac(2, 3))^n$.\nومنه: $S_n = (n + 1) - (frac(3, 2) - (frac(2, 3))^n) = n - frac(1, 2) + (frac(2, 3))^n$.',
					mark: '1.5'
				}
			]
		},
		{
			id: 'bac_2025_ge_s1_ex4',
			num: 'الرابع',
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
								'*I)* الدالة $g$ معرّفة على $bb(R)$ بـ $g(x) = (x + 1) e^x - 2$، وجدول تغيّراتها معطى في الشكل المقابل.\n\n1) احسب $g(-2)$، ثمّ تحقّق أنّ $0.3 < alpha < 0.4$.\n\n2) استنتج إشارة $g(x)$ على $bb(R)$.',
							answer:
								'*I)* 1) $g(-2) = -e^(-2) - 2 approx -2.135 < 0$. وبما أنّ $g$ مستمرة ومتزايدة تماماً على $[0.3 ; 0.4] subset [-2 ; +oo[$ ولدينا $g(0.3) approx -0.245 < 0$ و $g(0.4) approx +0.088 > 0$، فإنّ $0.3 < alpha < 0.4$.\n\n2) على $]-oo ; alpha[$: $g(x) < 0$؛ عند $alpha$: $g(alpha) = 0$؛ على $]alpha ; +oo[$: $g(x) > 0$.',
							mark: '1'
						},
						{
							type: 'image',
							src: ex4GVarSubjUrl,
							caption: 'جدول تغيّرات الدالة المساعدة $g$'
						}
					]
				},
				{
					type: 'text',
					content:
						'*II)* $f$ الدالة المعرّفة على $bb(R)$ بـ: $f(x) = x e^x - 2 x + 1$، و $(C_f)$ تمثيلها البياني في المعلم المتعامد والمتجانس $(O ; arrow(i), arrow(j))$ (وحدة الطول $2$ سم).\n\n1) احسب $lim_(x arrow.r -oo) f(x)$ و $lim_(x arrow.r +oo) f(x)$.\n\n2) بيّن أنّ المستقيم $(Delta) : y = -2 x + 1$ مقارب مائل لـ $(C_f)$ عند $-oo$، وادرس وضعية $(C_f)$ بالنسبة إلى $(Delta)$.',
					answer:
						'*II)* 1) $lim_(x arrow.r -oo) f(x) = +oo$ (لأنّ $lim_(x arrow.r -oo) x e^x = 0$)، و $lim_(x arrow.r +oo) f(x) = lim_(x arrow.r +oo) x(e^x - 2) + 1 = +oo$.\n\n2) $lim_(x arrow.r -oo) [f(x) - (-2 x + 1)] = lim_(x arrow.r -oo) x e^x = 0$، فالمستقيم $(Delta) : y = -2 x + 1$ مقارب مائل عند $-oo$.\nإشارة $f(x) - (-2 x + 1) = x e^x$ من إشارة $x$: على $]-oo ; 0[$ يقع $(C_f)$ تحت $(Delta)$، وعلى $]0 ; +oo[$ يقع $(C_f)$ فوق $(Delta)$، ويتقاطعان في $A(0 ; 1)$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3) أ) بيّن أنّه من أجل كلّ $x in bb(R)$: $f\'(x) = g(x)$، ثمّ شكّل جدول تغيّرات الدالة $f$.\n\nب) أثبت أنّ $f(alpha) = frac(-2 alpha^2 + alpha + 1, alpha + 1)$.',
					answer: `3) أ) $f'(x) = (x + 1) e^x - 2 = g(x)$.
فالدالة $f$ متناقصة تماماً على $]-oo ; alpha]$ ومتزايدة تماماً على $[alpha ; +oo[$.

#align(center)[#image("${typstSvgPath(ex4FVarSolUrl)}", width: 52%)]

ب) من $g(alpha) = 0$ نجد $e^alpha = frac(2, alpha + 1)$، ومنه:
$f(alpha) = frac(2 alpha, alpha + 1) - 2 alpha + 1 = frac(2 alpha - 2 alpha^2 - 2 alpha + alpha + 1, alpha + 1) = frac(-2 alpha^2 + alpha + 1, alpha + 1) approx 0.795$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) أ) بيّن أنّ $(C_f)$ يقبل مماساً $(T)$ موازياً لـ $(Delta)$ يُطلب تعيين معادلته، وحدّد إحداثيي نقطة الانعطاف $B$ للمنحني $(C_f)$.\n\nب) ارسم $(Delta)$، $(T)$ والمنحني $(C_f)$.',
					answer: `4) أ) $(T) parallel (Delta) arrow.l.r.double f'(x) = -2 arrow.l.r.double (x + 1) e^x = 0 arrow.l.r.double x = -1$.
لدينا $f(-1) = -e^(-1) + 3$، فمعادلة $(T)$ هي $y = -2(x + 1) - e^(-1) + 3 = -2 x + 3 - e^(-1)$.
نقطة الانعطاف: $f''(x) = (x + 2) e^x$ تنعدم وتغيّر إشارتها عند $x = -2$، فـ $B(-2 ; 5 - 2 e^(-2))$ نقطة انعطاف.

ب) الرسم البياني للمستقيمين $(Delta)$ و $(T)$ والمنحني $(C_f)$:

#align(center)[#image("${typstSvgPath(ex4CfSolUrl)}", width: 58%)]`,
					mark: '2'
				},
				{
					type: 'text',
					content:
						'5) تحقّق أنّ $H(x) = (x - 1) e^x$ دالة أصلية للدالة $x arrow.r.bar x e^x$ على $bb(R)$، ثمّ احسب بالسنتيمتر المربع مساحة الحيّز المحدّد بـ $(C_f)$ و $(Delta)$ والمستقيمين $x = -1$ و $x = 0$.',
					answer:
						'5) $H\'(x) = e^x + (x - 1) e^x = x e^x$.\nعلى $[-1 ; 0]$ يقع $(C_f)$ تحت $(Delta)$ ووحدة المساحة $4$ سم مربع:\n$cal(A) = 4 integral_(-1)^0 [(-2 x + 1) - f(x)] dif x = 4 integral_(-1)^0 (-x e^x) dif x = 4 [-(x - 1) e^x]_(-1)^0 = 4 (1 - 2 e^(-1)) = (4 - 8 e^(-1))$ سم مربع.',
					mark: '1'
				}
			]
		}
	];

	return buildGePaperSpec({
		year: '2025',
		topicNumber: 1,
		themesAr: [
			'شجرة الاحتمالات والمتغير العشوائي في مراقبة الجودة',
			'الإحصاء بمتغيرين وتعديل الطاقة الشمسية',
			'المتتالية التراجعية الكسرية',
			'جدول تغيّرات g والدالة الأسية والمساحة'
		],
		exercises
	});
}

// ═══════════════════════════════════════════════════════════════════════════════
// 6. دورة جوان 2025 — شعبة تسيير واقتصاد — الموضوع الثاني
// ت1 (4ن): اختيار من متعدد مع التبرير       | ت2 (4ن): الاحتمالات (النقل اللوجستي)
// ت3 (5ن): المتتاليات (محطة تحلية المياه)     | ت4 (7ن): الدالة اللوغاريتمية والمساحة
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2025GeS2(): OfficialBacGeMathPaperSpec {
	const ex2TreeUrl = saveSvgAsset(
		'bac_ext_2025_ge_s2_ex2_tree',
		svgProbabilityTree({
			firstLevel: [
				{
					label: 'F',
					probLabel: '0.6',
					children: [
						{ label: 'T', probLabel: '0.9' },
						{ label: 'L', probLabel: '0.1' }
					]
				},
				{
					label: 'R',
					probLabel: '0.4',
					children: [
						{ label: 'T', probLabel: '0.75' },
						{ label: 'L', probLabel: '0.25' }
					]
				}
			]
		})
	);

	const ex3CobwebUrl = saveSvgAsset(
		'bac_ext_2025_ge_s2_ex3_cobweb',
		svgCobwebSequencePlot({
			xMin: 4000,
			xMax: 10500,
			yMin: 4000,
			yMax: 10500,
			fn: (x) => 0.8 * x + 2000,
			u0: 5000,
			steps: 3,
			fixedPoint: 10000
		})
	);

	const ex4GVarUrl = saveSvgAsset(
		'bac_ext_2025_ge_s2_ex4_g_var',
		svgVariationTable({
			xValues: ['0', '1', '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '||' },
				{ kind: 'sign', value: '-' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '+' }
			],
			variations: [
				{ value: '+∞', position: 'top' },
				{ value: '2', position: 'bottom' },
				{ value: '+∞', position: 'top' }
			],
			fnName: 'g(x)',
			derivName: "g'(x)"
		})
	);

	const ex4FVarUrl = saveSvgAsset(
		'bac_ext_2025_ge_s2_ex4_f_var',
		svgVariationTable({
			xValues: ['0', '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '||' },
				{ kind: 'sign', value: '+' }
			],
			variations: [
				{ value: '-∞', position: 'bottom' },
				{ value: '+∞', position: 'top' }
			],
			fnName: 'f(x)',
			derivName: "f'(x)"
		})
	);

	const ex4CfUrl = saveSvgAsset(
		'bac_ext_2025_ge_s2_ex4_cf',
		svgFunctionCurvePlot({
			xMin: -0.3,
			xMax: 4.5,
			yMin: -2.2,
			yMax: 4.8,
			fn: (x) => (x > 0.12 ? x - 1 + (1 + 2 * Math.log(x)) / x : Number.NaN),
			curveLabel: '(Cf)',
			asymptotes: [
				{ kind: 'vertical', value: 0, label: 'x = 0', color: '#dc2626' },
				{ kind: 'oblique', a: 1, b: -1, label: '(Δ): y = x - 1', color: '#059669' }
			],
			tangents: [
				{
					x: Math.sqrt(Math.E),
					y: Math.sqrt(Math.E) - 1 + 2 / Math.sqrt(Math.E),
					slope: 1,
					halfSpan: 1.4,
					color: '#7c3aed'
				}
			],
			points: [
				{ x: 0.653, y: 0, label: 'α', color: '#dc2626' },
				{ x: Math.exp(-0.5), y: Math.exp(-0.5) - 1, label: 'K', color: '#0f172a' }
			],
			shadedIntegral: { a: 1, b: Math.E, color: 'rgba(59,130,246,0.20)' },
			width: 360,
			height: 245
		})
	);

	const exercises: [ExerciseBlock, ExerciseBlock, ExerciseBlock, ExerciseBlock] = [
		{
			id: 'bac_2025_ge_s2_ex1',
			num: 'الأول',
			points: 4,
			instruction:
				'في كلّ حالة من الحالات الأربع الآتية، اختر الإجابة الصحيحة الوحيدة من بين الاقتراحات الثلاثة مع التبرير:',
			content: [
				{
					type: 'text',
					content:
						'1) $lim_(x arrow.r 0^+) (x ln(x) - 2 x + 3)$ تساوي:\n\nأ) $0$ #h(24pt) ب) $3$ #h(24pt) جـ) $-oo$',
					answer:
						'1) الإجابة الصحيحة هي *ب) $3$*؛ لأنّ بالتزايد المقارن $lim_(x arrow.r 0^+) x ln(x) = 0$ و $lim_(x arrow.r 0^+) (-2 x) = 0$، ومنه النهاية تساوي $3$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'2) مجموعة حلول المعادلة $e^(2 x) - 3 e^x + 2 = 0$ في $bb(R)$ هي:\n\nأ) $\{0 ; ln(2)\}$ #h(24pt) ب) $\{1 ; 2\}$ #h(24pt) جـ) $\{ln(2)\}$',
					answer:
						'2) الإجابة الصحيحة هي *أ) $\{0 ; ln(2)\}$*؛ بوضع $X = e^x > 0$ نجد $X^2 - 3 X + 2 = 0 arrow.l.r.double (X - 1)(X - 2) = 0$، أي $e^x = 1 arrow.r.double x = 0$ أو $e^x = 2 arrow.r.double x = ln(2)$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'3) $(u_n)$ متتالية هندسية حدّها العام $u_n = 3 times 2^n$. المجموع $u_0 + u_1 + dots + u_5$ يساوي:\n\nأ) $93$ #h(24pt) ب) $189$ #h(24pt) جـ) $192$',
					answer:
						'3) الإجابة الصحيحة هي *ب) $189$*؛ لأنّ $u_0 + dots + u_5 = 3 frac(2^6 - 1, 2 - 1) = 3 times 63 = 189$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'4) في سلسلة إحصائية مزدوجة، إذا كان $"Cov"(X, Y) = 12$ و $V(X) = 8$، فإنّ ميل مستقيم الانحدار بالمربعات الدنيا $y = a x + b$ يساوي:\n\nأ) $1.5$ #h(24pt) ب) $0.67$ #h(24pt) جـ) $4$',
					answer:
						'4) الإجابة الصحيحة هي *أ) $1.5$*؛ لأنّ معامل التوجيه يُعطى بالعلاقة $a = frac("Cov"(X, Y), V(X)) = frac(12, 8) = 1.5$.',
					mark: '1'
				}
			]
		},
		{
			id: 'bac_2025_ge_s2_ex2',
			num: 'الثاني',
			points: 4,
			instruction:
				'في مؤسسة للنقل اللوجستي، يتمّ شحن $60%$ من البضائع عبر السكك الحديدية ($F$) و $40%$ عبر الطرق البرية ($R$). تصل $90%$ من الشحنات الحديدية في الموعد المحدد ($T$)، بينما تصل $75%$ من الشحنات البرية في الموعد المحدد ($T$)، ونرمز بالرمز $L = overline(T)$ لحادثة تأخّر الشحنة. نختار عشوائياً شحنة واحدة.',
			content: [
				{
					type: 'text',
					content: '1) أنجز شجرة الاحتمالات التي تُنمذج هذه التجربة.',
					answer: `1) شجرة الاحتمالات الموزونة:

#align(center)[#image("${typstSvgPath(ex2TreeUrl)}", width: 52%)]`,
					mark: '0.75'
				},
				{
					type: 'text',
					content: '2) بيّن أنّ $P(T) = 0.84$ ثمّ احسب $P(overline(T))$.',
					answer:
						'2) $P(T) = 0.6 times 0.9 + 0.4 times 0.75 = 0.54 + 0.30 = 0.84$، ومنه $P(overline(T)) = 1 - 0.84 = 0.16$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'3) عُلِم أنّ الشحنة تأخّرت عن موعدها ($overline(T)$). ما احتمال أن تكون قد نُقلت عبر الطرق البرية ($R$)؟',
					answer:
						'3) $P_(overline(T))(R) = frac(P(R sect overline(T)), P(overline(T))) = frac(0.4 times 0.25, 0.16) = frac(0.10, 0.16) = frac(5, 8) = 0.625$.',
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'4) نتابع عمليتي شحن مستقلّتين عن بعضهما. ليكن $X$ المتغيّر العشوائي الذي يساوي عدد الشحنات التي تصل في الموعد المحدد.\n\nعيّن قانون احتمال $X$ واحسب أمله الرياضياتي $E(X)$.',
					answer: `4) قيم $X$ هي $\{0 ; 1 ; 2\}$ (تجربة برنولي متكررة مرتين بوسيط $p = 0.84$):

- $P(X = 0) = (0.16)^2 = 0.0256$.

- $P(X = 1) = 2 times 0.84 times 0.16 = 0.2688$.

- $P(X = 2) = (0.84)^2 = 0.7056$.

#align(center)[#[#set text(dir: ltr); #table(columns: 4, align: center + horizon, inset: 5pt, [$x_i$], [$0$], [$1$], [$2$], [$P(X = x_i)$], [$0.0256$], [$0.2688$], [$0.7056$])]]

$E(X) = 1 times 0.2688 + 2 times 0.7056 = 1.68$.`,
					mark: '1.5'
				}
			]
		},
		{
			id: 'bac_2025_ge_s2_ex3',
			num: 'الثالث',
			points: 5,
			instruction:
				'بلغت الطاقة الإنتاجية اليومية لمحطة تحلية مياه سنة 2022 (الموافقة لـ $n = 0$) $u_0 = 5000$ متر مكعب، وضمن مخطط التوسعة تتطوّر الطاقة اليومية $u_n$ بعد $n$ سنة وفق العلاقة: $u_(n+1) = 0.8 u_n + 2000$.',
			content: [
				{
					type: 'text',
					content: '1) احسب $u_1$ و $u_2$ (الطاقة اليومية في سنتي 2023 و 2024).',
					answer:
						'1) $u_1 = 0.8(5000) + 2000 = 6000$ متر مكعب، و $u_2 = 0.8(6000) + 2000 = 6800$ متر مكعب.',
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'2) برهن بالتراجع أنّه من أجل كلّ $n in bb(N)$: $u_n < 10000$، ثمّ بيّن أنّ $(u_n)$ متزايدة تماماً واستنتج تقاربها.',
					answer: `2) من أجل $n = 0$: $u_0 = 5000 < 10000$ محقّقة. نفرض $u_n < 10000$: بضرب الطرفين في $0.8$ وإضافة $2000$ نجد $u_(n+1) < 10000$.
الرتابة: $u_(n+1) - u_n = -0.2 u_n + 2000 = 0.2(10000 - u_n) > 0$، فالمتتالية $(u_n)$ متزايدة تماماً ومحدودة من الأعلى بـ $10000$، إذن متقاربة.

#align(center)[#image("${typstSvgPath(ex3CobwebUrl)}", width: 52%)]`,
					mark: '1'
				},
				{
					type: 'text',
					content:
						'3) نضع $v_n = 10000 - u_n$. أثبت أنّ $(v_n)$ متتالية هندسية أساسها $0.8$ وحدّها الأول $v_0 = 5000$، ثمّ اكتب $u_n$ بدلالة $n$ واحسب $lim_(n arrow.r +oo) u_n$.',
					answer:
						'3) $v_(n+1) = 10000 - (0.8 u_n + 2000) = 0.8(10000 - u_n) = 0.8 v_n$، و $v_0 = 5000$.\nومنه $v_n = 5000 (0.8)^n$، أي $u_n = 10000 - 5000 (0.8)^n$، و $lim_(n arrow.r +oo) u_n = 10000$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) أ) احسب بدلالة $n$ المجموع $S_n = u_0 + u_1 + dots + u_n$.\n\nب) عيّن أصغر قيمة للعدد الطبيعي $n$ التي تبلغ عندها الطاقة اليومية $9000$ متر مكعب على الأقلّ.',
					answer:
						'4) أ) $S_n = 10000(n + 1) - 5000 frac(1 - (0.8)^(n+1), 1 - 0.8) = 10000(n + 1) - 25000 [1 - (0.8)^(n+1)]$.\n\nب) $10000 - 5000(0.8)^n >= 9000 arrow.l.r.double (0.8)^n <= 0.2 arrow.l.r.double n >= frac(ln(0.2), ln(0.8)) approx 7.21$.\nإذن أصغر قيمة هي $n = 8$ (الموافقة لسنة $2030$).',
					mark: '1.75'
				}
			]
		},
		{
			id: 'bac_2025_ge_s2_ex4',
			num: 'الرابع',
			customTitle: 'التمرين الرابع: المسألة الشاملة',
			points: 7,
			content: [
				{
					type: 'text',
					content:
						'*I)* $g$ الدالة المعرّفة على $]0 ; +oo[$ بـ: $g(x) = x^2 + 1 - 2 ln(x)$.\n\n1) احسب $lim_(x arrow.r 0^+) g(x)$ و $lim_(x arrow.r +oo) g(x)$.\n\n2) ادرس اتجاه تغيّر الدالة $g$ وشكّل جدول تغيّراتها، ثمّ استنتج أنّ $g(x) > 0$ على $]0 ; +oo[$.',
					answer: `*I)* 1) $lim_(x arrow.r 0^+) g(x) = +oo$ و $lim_(x arrow.r +oo) g(x) = +oo$.
2) $g'(x) = 2 x - frac(2, x) = frac(2(x - 1)(x + 1), x)$، تنعدم وتغيّر إشارتها عند $x = 1$.
القيمة الحدّية الصغرى هي $g(1) = 1 + 1 - 0 = 2 > 0$، ومنه $g(x) > 0$ من أجل كلّ $x in ]0 ; +oo[$.

#align(center)[#image("${typstSvgPath(ex4GVarUrl)}", width: 52%)]`,
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'*II)* $f$ الدالة المعرّفة على $]0 ; +oo[$ بـ: $f(x) = x - 1 + frac(1 + 2 ln(x), x)$، و $(C_f)$ تمثيلها البياني في المعلم المتعامد والمتجانس $(O ; arrow(i), arrow(j))$ (وحدة الطول $2$ سم).\n\n1) احسب $lim_(x arrow.r 0^+) f(x)$ و $lim_(x arrow.r +oo) f(x)$.\n\n2) بيّن أنّ المستقيم $(Delta) : y = x - 1$ مقارب مائل لـ $(C_f)$ عند $+oo$، ثمّ ادرس وضعية $(C_f)$ بالنسبة إلى $(Delta)$.',
					answer:
						'*II)* 1) $lim_(x arrow.r 0^+) f(x) = -oo$ (ومنه $x = 0$ مقارب عمودي)، و $lim_(x arrow.r +oo) f(x) = +oo$.\n\n2) $lim_(x arrow.r +oo) [f(x) - (x - 1)] = lim_(x arrow.r +oo) frac(1 + 2 ln(x), x) = 0$، فالمستقيم $(Delta) : y = x - 1$ مقارب مائل عند $+oo$.\nإشارة الفرق $frac(1 + 2 ln(x), x)$ تنعدم عند $x = e^(-frac(1, 2))$:\n- على $]0 ; e^(-frac(1, 2))[$: $(C_f)$ تحت $(Delta)$؛ على $]e^(-frac(1, 2)) ; +oo[$: $(C_f)$ فوق $(Delta)$؛ ويتقاطعان في $K(e^(-frac(1, 2)) ; e^(-frac(1, 2)) - 1)$.',
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'3) أ) بيّن أنّه من أجل كلّ $x in ]0 ; +oo[$: $f\'(x) = frac(g(x), x^2)$، ثمّ شكّل جدول تغيّرات الدالة $f$.\n\nب) أثبت أنّ المعادلة $f(x) = 0$ تقبل حلّاً وحيداً $alpha$ حيث $0.6 < alpha < 0.7$.',
					answer: `3) أ) $f'(x) = 1 + frac(frac(2, x) times x - (1 + 2 ln(x)), x^2) = frac(x^2 + 1 - 2 ln(x), x^2) = frac(g(x), x^2) > 0$.
فالدالة $f$ متزايدة تماماً على $]0 ; +oo[$.

#align(center)[#image("${typstSvgPath(ex4FVarUrl)}", width: 50%)]

ب) $f$ مستمرة ومتزايدة تماماً من $-oo$ إلى $+oo$، ولدينا $f(0.6) approx -0.436 < 0$ و $f(0.7) approx 0.109 > 0$، إذن تقبل $f(x) = 0$ حلّاً وحيداً $alpha in ]0.6 ; 0.7[$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) اكتب معادلة المماس $(T)$ للمنحني $(C_f)$ الموازي للمستقيم $(Delta)$، ثمّ ارسم $(Delta)$، $(T)$ والمنحني $(C_f)$.',
					answer: `4) $(T) parallel (Delta) arrow.l.r.double f'(x) = 1 arrow.l.r.double 1 - 2 ln(x) = 0 arrow.l.r.double x = sqrt(e)$.
لدينا $f(sqrt(e)) = sqrt(e) - 1 + frac(2, sqrt(e))$، فمعادلة $(T)$ هي: $y = x - 1 + frac(2, sqrt(e))$.

#align(center)[#image("${typstSvgPath(ex4CfUrl)}", width: 58%)]`,
					mark: '1.75'
				},
				{
					type: 'text',
					content:
						'5) تحقّق أنّ $H(x) = ln(x) + (ln(x))^2$ دالة أصلية للدالة $x arrow.r.bar frac(1 + 2 ln(x), x)$ على $]0 ; +oo[$، ثمّ احسب بالسنتيمتر المربع مساحة الحيّز المحدّد بـ $(C_f)$ و $(Delta)$ والمستقيمين $x = 1$ و $x = e$.',
					answer:
						'5) $H\'(x) = frac(1, x) + frac(2 ln(x), x) = frac(1 + 2 ln(x), x)$.\nعلى $[1 ; e]$ يقع $(C_f)$ فوق $(Delta)$ ووحدة المساحة $4$ سم مربع:\n$cal(A) = 4 integral_1^e [f(x) - (x - 1)] dif x = 4 [H(e) - H(1)] = 4 (1 + 1 - 0) = 8$ سم مربع.',
					mark: '1'
				}
			]
		}
	];

	return buildGePaperSpec({
		year: '2025',
		topicNumber: 2,
		themesAr: [
			'اختيار من متعدد في النهايات والأسية والمتتاليات والإحصاء',
			'الاحتمالات الشرطية وتجربة برنولي',
			'المتتاليات ونمذجة محطة تحلية المياه',
			'الدالة اللوغاريتمية وحساب المساحة'
		],
		exercises
	});
}

export const OFFICIAL_BAC_GE_MATH_PAPERS: OfficialBacGeMathPaperSpec[] = [
	buildBac2023GeS1(),
	buildBac2023GeS2(),
	buildBac2024GeS1(),
	buildBac2024GeS2(),
	buildBac2025GeS1(),
	buildBac2025GeS2()
];

export function buildOfficialBac3asGe(): OfficialBacGeMathPaperSpec[] {
	return OFFICIAL_BAC_GE_MATH_PAPERS;
}
