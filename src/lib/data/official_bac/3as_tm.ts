import { saveSvgAsset } from '../../modules/MathTemplates/svg-helpers';
import { svgFunctionCurvePlot, svgVariationTable } from '../../modules/MathTemplates/svg-secondary';
import type { ExamDocument, ExamMetadata } from '../../modules/SujetBuilder/types';
import type { OfficialBacPaperRecord } from './types';

function buildBacTmMetadata(year: '2023' | '2024' | '2025'): ExamMetadata {
	return {
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي',
		streamId: 'TM',
		streamName: 'تقني رياضي',
		subjectId: 'MAT-TM',
		subjectName: 'الرياضيات',
		trimesterId: 't3',
		trimesterName: 'دورة بكالوريا رسمية',
		docType: 'exam',
		academicYear: year,
		duration: '04 ساعات و30 دقيقة',
		coefficient: 6,
		examSessionAr: 'دورة جوان ' + year,
		topicNumber: 1,
		customDocTitle: 'امتحان بكالوريا التعليم الثانوي (موضوع رسمي مُعاد تنسيقه)',
		siteUrl: 'https://sujetstore.com'
	};
}

function buildPaper2023(): OfficialBacPaperRecord {
	const alpha2023 = -0.7156;

	const cg2023Svg = svgFunctionCurvePlot({
		xMin: -2,
		xMax: 2.2,
		yMin: -1,
		yMax: 2.2,
		fn: (x: number) => (x <= -0.96 ? NaN : 2 * Math.log(x + 1) - x / (x + 1)),
		curveLabel: '(Cg)',
		asymptotes: [{ kind: 'vertical', value: -1, label: 'x = -1', color: '#dc2626' }],
		points: [
			{ x: alpha2023, y: 0, label: 'α', color: '#dc2626' },
			{ x: 0, y: 0, label: '', color: '#15803d' }
		],
		width: 340,
		height: 235
	});
	const cg2023Url = saveSvgAsset('bac_2023_3as_tm_cg_subject', cg2023Svg);

	const fVar2023Svg = svgVariationTable({
		fnName: 'f(x)',
		derivName: "f'(x)",
		xValues: ['-1', 'α', '0', '+∞'],
		derivativeRow: [
			{ kind: 'sign', value: '||' },
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
		]
	});
	const fVar2023Url = saveSvgAsset('bac_2023_3as_tm_f_vartable', fVar2023Svg);

	const cf2023Svg = svgFunctionCurvePlot({
		xMin: -1.5,
		xMax: 4.3,
		yMin: -2.5,
		yMax: 6.2,
		fn: (x: number) => (x <= -0.985 ? NaN : (2 * x + 3) * Math.log(x + 1) - 3 * x),
		curveLabel: '(Cf)',
		asymptotes: [{ kind: 'vertical', value: -1, label: 'x = -1', color: '#dc2626' }],
		points: [
			{ x: alpha2023, y: 0.203, label: 'M(α; f(α))', color: '#dc2626' },
			{ x: 0, y: 0, label: 'O(0; 0)', color: '#15803d' }
		],
		shadedIntegral: { a: alpha2023, b: 0, color: 'rgba(59,130,246,0.22)' },
		width: 360,
		height: 250
	});
	const cf2023Url = saveSvgAsset('bac_2023_3as_tm_cf_solution', cf2023Svg);

	const examDoc: ExamDocument = {
		metadata: buildBacTmMetadata('2023'),
		exercises: [
			{
				id: 'bac_2023_tm_ex1',
				num: 'الأول',
				points: 4,
				instruction:
					'يحتوي كيس على 8 كريات متماثلة ولا نفرّق بينها باللّمس، موزعة كما يلي: 3 كريات بيضاء مرقمة بـ: 0، 1، 1 و 3 كريات حمراء مرقمة بـ: 1، 1، 2 وكريتين خضراوين مرقمتين بـ: 1، 2. نسحب عشوائيا وفي آن واحد كريتين من الكيس ونعتبر الحوادث $A$، $B$، $C$ الآتية: $A$: "الحصول على كريتين من نفس اللون"، $B$: "الحصول على كرية حمراء على الأقل"، $C$: "الحصول على كريتين تحملان رقمين مجموعهما يساوي 3".',
				content: [
					{
						type: 'text',
						content:
							'1) أ) بيّن أنّ احتمال الحدث $A$ يساوي $frac(1, 4)$ وأنّ احتمال الحدث $B$ يساوي $frac(9, 14)$.',
						answer:
							'1) أ) عدد الحالات الممكنة لسحب كريتين في آن واحد من 8 كريات هو $C_8^2 = frac(8 times 7, 2) = 28$.\n\n- الحدث $A$ (كريتان من نفس اللون): $P(A) = frac(C_3^2 + C_3^2 + C_2^2, C_8^2) = frac(3 + 3 + 1, 28) = frac(7, 28) = frac(1, 4)$ (0.75 ن).\n\n- الحدث $B$ (كرية حمراء على الأقل، الحدث المضاد $bar(B)$ هو عدم سحب أي كرية حمراء من أصل 5 كريات غير حمراء): $P(B) = 1 - P(bar(B)) = 1 - frac(C_5^2, C_8^2) = 1 - frac(10, 28) = frac(18, 28) = frac(9, 14)$ (0.75 ن).',
						mark: '1.5'
					},
					{
						type: 'text',
						content: 'ب) احسب الاحتمال $P(C)$.',
						answer:
							'ب) الحدث $C$ يتحقق بسحب كرية تحمل الرقم 1 (من بين 5 كريات) وكرية تحمل الرقم 2 (من بين كريتين): $P(C) = frac(C_5^1 times C_2^1, C_8^2) = frac(5 times 2, 28) = frac(10, 28) = frac(5, 14)$.',
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'2) نعتبر المتغيّر العشوائي $X$ الذي يرفق بكلّ عملية سحب لكريتين مجموع الرقمين المسجلين عليهما.\n\nأ) برّر أنّ مجموعة قيم المتغيّر العشوائي $X$ هي ${1 ; 2 ; 3 ; 4}$.',
						answer:
							'2) أ) الكريات موزعة حسب الأرقام إلى: كرية واحدة تحمل الرقم 0، خمس كريات تحمل الرقم 1، وكريتان تحملان الرقم 2. عند سحب كريتين في آن واحد تكون المجاميع الممكنة هي: $0 + 1 = 1$، $0 + 2 = 1 + 1 = 2$، $1 + 2 = 3$، $2 + 2 = 4$ (ولا يمكن الحصول على المجموع 0 لوجود كرية وحيدة تحمل 0). إذن $X(Omega) = {1 ; 2 ; 3 ; 4}$.',
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'ب) عيّن قانون احتمال المتغيّر العشوائي $X$ ثمّ احسب أمله الرياضياتي $E(X)$.',
						answer:
							'ب) قانون احتمال المتغيّر العشوائي $X$ (4 × 0.25 ن = 1 ن):\n\n- $P(X = 1) = frac(C_1^1 times C_5^1, C_8^2) = frac(5, 28)$\n\n- $P(X = 2) = frac(C_1^1 times C_2^1 + C_5^2, C_8^2) = frac(2 + 10, 28) = frac(12, 28)$\n\n- $P(X = 3) = P(C) = frac(10, 28)$\n\n- $P(X = 4) = frac(C_2^2, C_8^2) = frac(1, 28)$\n\nالأمل الرياضياتي (0.5 ن): $E(X) = frac(1 times 5 + 2 times 12 + 3 times 10 + 4 times 1, 28) = frac(63, 28) = frac(9, 4)$.',
						mark: '1.5'
					}
				]
			},
			{
				id: 'bac_2023_tm_ex2',
				num: 'الثاني',
				points: 4,
				instruction:
					'$(u_n)$ المتتالية العددية المعرّفة بـ: $u_0 = 1$ ومن أجل كلّ عدد طبيعي $n$، $u_(n+1) = frac(2, 3) u_n + 1$.',
				content: [
					{
						type: 'text',
						content: '1) برهن بالتراجع أنّه: من أجل كلّ عدد طبيعي $n$، $u_n < 3$.',
						answer:
							'1) نبرهن بالتراجع الخاصية $P(n) : u_n < 3$ من أجل كل $n in bb(N)$:\n\n- التحقق من صحة الخاصية الابتدائية: من أجل $n = 0$ لدينا $u_0 = 1 < 3$ محقّقة (0.25 ن).\n\n- إثبات الوراثة: نفرض أنّ $u_n < 3$ من أجل عدد طبيعي كيفي $n$، فنجد $frac(2, 3) u_n < 2$ ومنه $frac(2, 3) u_n + 1 < 3$ أي $u_(n+1) < 3$. إذن من أجل كل عدد طبيعي $n$، $u_n < 3$ (0.75 ن).',
						mark: '1'
					},
					{
						type: 'text',
						content: '2) بيّن أنّ $(u_n)$ متزايدة تماما.',
						answer:
							'2) من أجل كل $n in bb(N)$: $u_(n+1) - u_n = frac(2, 3) u_n + 1 - u_n = -frac(1, 3)(u_n - 3)$. بما أن $u_n < 3$ فإن $u_n - 3 < 0$ ومنه $u_(n+1) - u_n > 0$، إذن المتتالية $(u_n)$ متزايدة تماما.',
						mark: '0.25'
					},
					{
						type: 'text',
						content:
							'3) $(v_n)$ المتتالية العددية المعرّفة على $bb(N)$ بـ: $v_n = u_n - 3$.\n\nأ) بيّن أنّ المتتالية $(v_n)$ هندسية أساسها $frac(2, 3)$ يُطلب تعيين حدّها الأول $v_0$.',
						answer:
							'3) أ) من أجل كل $n in bb(N)$: $v_(n+1) = u_(n+1) - 3 = frac(2, 3) u_n + 1 - 3 = frac(2, 3)(u_n - 3) = frac(2, 3) v_n$ (0.75 ن).\n\nإذن $(v_n)$ متتالية هندسية أساسها $q = frac(2, 3)$ وحدّها الأول $v_0 = u_0 - 3 = 1 - 3 = -2$ (0.25 ن).',
						mark: '1'
					},
					{
						type: 'text',
						content:
							'ب) عيّن عبارة الحدّ العام $v_n$ بدلالة $n$ ثمّ استنتج أنّه: من أجل كلّ عدد طبيعي $n$، $u_n = -2 (frac(2, 3))^n + 3$.',
						answer:
							'ب) من أجل كل عدد طبيعي $n$: $v_n = v_0 times q^n = -2 (frac(2, 3))^n$ (0.25 ن)، وبما أن $u_n = v_n + 3$ فإن $u_n = -2 (frac(2, 3))^n + 3$ (0.25 ن).',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'جـ) احسب $lim_(n arrow.r +oo) u_n$.',
						answer:
							'جـ) بما أن $-1 < frac(2, 3) < 1$ فإن $lim_(n arrow.r +oo) (frac(2, 3))^n = 0$، وعليه $lim_(n arrow.r +oo) u_n = 3$.',
						mark: '0.25'
					},
					{
						type: 'text',
						content:
							'4) نضع: من أجل كلّ عدد طبيعي $n$، $S_n = v_0 + v_1 + ... + v_n$ و $T_n = u_0 + u_1 + ... + u_n$.\n\nاحسب $S_n$ بدلالة $n$ ثمّ بيّن أنّه: من أجل كلّ عدد طبيعي $n$، $T_n = 3 n - 3 + 4 (frac(2, 3))^n$.',
						answer:
							'4) لدينا $S_n = v_0 frac(1 - q^(n+1), 1 - q) = -2 frac(1 - (frac(2, 3))^(n+1), 1 - frac(2, 3)) = -6 [1 - (frac(2, 3))^(n+1)]$ (0.75 ن).\n\nوبما أن $u_k = v_k + 3$ فإن $T_n = S_n + 3(n + 1) = -6 [1 - (frac(2, 3))^(n+1)] + 3 n + 3 = 3 n - 3 + 6 times frac(2, 3) (frac(2, 3))^n = 3 n - 3 + 4 (frac(2, 3))^n$ (0.25 ن).',
						mark: '1'
					}
				]
			},
			{
				id: 'bac_2023_tm_ex3',
				num: 'الثالث',
				points: 5,
				content: [
					{
						type: 'text',
						content:
							'1) أ) عيّن حسب قيم العدد الطبيعي $n$ بواقي القسمة الإقليدية للعدد $2^n$ على 7.',
						answer:
							'1) أ) لدينا: $2^0 equiv 1 [7]$، $2^1 equiv 2 [7]$، $2^2 equiv 4 [7]$، $2^3 equiv 1 [7]$ (الدور يساوي 3). من أجل كل $k in bb(N)$:\n\n- من أجل $n = 3 k$: $2^(3 k) equiv 1 [7]$.\n\n- من أجل $n = 3 k + 1$: $2^(3 k + 1) equiv 2 [7]$.\n\n- من أجل $n = 3 k + 2$: $2^(3 k + 2) equiv 4 [7]$.',
						mark: '1.5'
					},
					{
						type: 'text',
						content: 'ب) استنتج باقي القسمة الإقليدية للعدد $1444^(2023)$ على 7.',
						answer:
							'ب) لدينا $1444 = 7 times 206 + 2$ أي $1444 equiv 2 [7]$، وبما أن $2023 = 3 times 674 + 1$ أي $2023 equiv 1 [3]$، فإن $1444^(2023) equiv 2^(2023) equiv 2^1 equiv 2 [7]$. إذن الباقي هو 2.',
						mark: '0.75'
					},
					{
						type: 'text',
						content:
							'جـ) عيّن قيم العدد الطبيعي $n$ التي من أجلها يكون: $1962 n + 1444^(3 n + 1) equiv 0 [7]$.',
						answer:
							'جـ) لدينا $1962 = 7 times 280 + 2 equiv 2 [7]$ ومنه $1962 n equiv 2 n [7]$، ولدينا $1444^(3 n + 1) equiv 2^(3 n + 1) equiv 2 [7]$ (0.25 ن).\n\nتصبح الموافقة $2 n + 2 equiv 0 [7]$ أي $2(n + 1) equiv 0 [7]$، ولأن $op("PGCD")(2 ; 7) = 1$ نجد $n + 1 equiv 0 [7]$ أي $n equiv 6 [7]$ (0.25 ن)، وعليه $n = 7 alpha + 6$ مع $alpha in bb(N)$ (0.25 ن).',
						mark: '0.75'
					},
					{
						type: 'text',
						content:
							'2) نعتبر المعادلة $(E) : 7 x - 6 y = 4$ ذات المجهولين الصحيحين $x$ و $y$.\n\nتحقّق أنّ الثنائية $(4 ; 4)$ حلّ للمعادلة $(E)$ ثمّ استنتج مجموعة حلولها.',
						answer:
							'2) لدينا $7(4) - 6(4) = 28 - 24 = 4$ ومنه $(4 ; 4)$ حلّ خاص للمعادلة $(E)$ (0.5 ن).\n\nبطرح $7(4) - 6(4) = 4$ من $7 x - 6 y = 4$ نجد $7(x - 4) = 6(y - 4)$ (0.5 ن). بما أن $op("PGCD")(7 ; 6) = 1$ فحسب مبرهنة غوص يقسم 6 العدد $(x - 4)$ أي $x - 4 = 6 k$ ومنه $y - 4 = 7 k$ ($k in bb(Z)$). إذن مجموعة الحلول في $bb(Z)^2$ هي $S = {(6 k + 4 ; 7 k + 4) / k in bb(Z)}$ (0.5 ن).',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'3) عيّن الثنائيات $(x ; y)$ من الأعداد الطبيعية حلول المعادلة $(E)$ والتي تحقّق $2^(3 x) + 2^y equiv 3 [7]$.',
						answer:
							'3) من أجل $k in bb(N)$ لدينا $(x ; y) = (6 k + 4 ; 7 k + 4)$، ومنه $2^(3 x) + 2^y = (2^3)^x + 2^(7 k + 4) equiv 1 + 2^(6 k) times 2^(k + 4) equiv 1 + 2^(k + 1) [7]$.\n\nشرط الموافقة يكافئ $1 + 2^(k + 1) equiv 3 [7]$ أي $2^(k + 1) equiv 2 [7]$ ومنه $k + 1 equiv 1 [3]$ أي $k = 3 lambda$ ($lambda in bb(N)$) (0.25 ن). بالتعويض نجد $(x ; y) in {(18 lambda + 4 ; 21 lambda + 4) / lambda in bb(N)}$ (0.25 ن).',
						mark: '0.5'
					}
				]
			},
			{
				id: 'bac_2023_tm_ex4',
				customTitle: 'التمرين الرابع: المسألة الشاملة',
				points: 7,
				content: [
					{
						type: 'text',
						content:
							'*الجزء الأول (I):* $g$ الدّالة المعرّفة على $]-1 ; +oo[$ بـ: $g(x) = 2 ln(x + 1) - frac(x, x + 1)$. $(C_g)$ تمثيلها البياني، يقطع حامل محور الفواصل في النقطتين اللتين فاصلتاهما $alpha$ و $0$ (لاحظ الشكل المقابل).\n\n1) بقراءة بيانية، حدّد حسب قيم $x$ إشارة $g(x)$.',
						answer:
							'*الجزء الأول (I):* 1) بقراءة بيانية لوضعية $(C_g)$ بالنسبة لحامل محور الفواصل على $]-1 ; +oo[$:\n\n- على $]-1 ; alpha[ ∪ ]0 ; +oo[$: $g(x) > 0$.\n\n- على $]alpha ; 0[$: $g(x) < 0$.\n\n- من أجل $x = alpha$ أو $x = 0$: $g(alpha) = g(0) = 0$.',
						mark: '0.75'
					},
					{
						type: 'image',
						src: cg2023Url,
						caption: 'التمثيل البياني $(C_g)$ للدالة المساعدة $g$ على المجال $]-1 ; +oo[$'
					},
					{
						type: 'text',
						content: '2) تحقّق أنّ: $-0.72 < alpha < -0.71$.',
						answer:
							'2) لدينا $g(-0.72) = 2 ln(0.28) - frac(-0.72, 0.28) approx 0.025 > 0$ و $g(-0.71) = 2 ln(0.29) - frac(-0.71, 0.29) approx -0.027 < 0$. وبما أن الدالة $g$ مستمرة على $[-0.72 ; -0.71]$ و $g(-0.72) times g(-0.71) < 0$، فإن $-0.72 < alpha < -0.71$.',
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'*الجزء الثاني (II):* $f$ الدّالة المعرّفة على المجال $]-1 ; +oo[$ بـ: $f(x) = (2 x + 3) ln(x + 1) - 3 x$. $(C_f)$ تمثيلها البياني في المستوي المنسوب إلى المعلم المتعامد والمتجانس $(O ; arrow(i), arrow(j))$ (وحدة الطول $2 upright(c) upright(m)$).\n\n1) أ) احسب $lim_(x arrow.r -1^+) f(x)$ ثمّ فسّر النتيجة هندسيا.',
						answer:
							'*الجزء الثاني (II):* 1) أ) لدينا $lim_(x arrow.r -1^+) (2 x + 3) = 1 > 0$ و $lim_(x arrow.r -1^+) ln(x + 1) = -oo$، ومنه $lim_(x arrow.r -1^+) f(x) = -oo$ (0.25 ن). التفسير الهندسي: المستقيم ذو المعادلة $x = -1$ مقارب عمودي للمنحني $(C_f)$ (0.25 ن).',
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'ب) تحقّق أنّه من أجل كلّ عدد حقيقي غير معدوم $x$ من المجال $]-1 ; +oo[$: $f(x) = x [(2 + frac(3, x)) ln(x + 1) - 3]$ ثمّ استنتج أنّ: $lim_(x arrow.r +oo) f(x) = +oo$.',
						answer:
							'ب) من أجل كل $x != 0$ من $]-1 ; +oo[$: باستخراج $x$ عاملاً مشتركاً نجد $f(x) = x [(2 + frac(3, x)) ln(x + 1) - 3]$ (0.25 ن). وبما أن $lim_(x arrow.r +oo) (2 + frac(3, x)) = 2$ و $lim_(x arrow.r +oo) ln(x + 1) = +oo$ فإن $lim_(x arrow.r +oo) f(x) = +oo$ (0.25 ن).',
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'2) أ) بيّن أنّه: من أجل كلّ عدد حقيقي $x$ من المجال $]-1 ; +oo[$، $f\'(x) = g(x)$.',
						answer:
							'2) أ) الدالة $f$ قابلة للاشتقاق على $]-1 ; +oo[$ ومن أجل كل $x > -1$: $f\'(x) = 2 ln(x + 1) + frac(2 x + 3, x + 1) - 3 = 2 ln(x + 1) + frac(2 x + 3 - 3 x - 3, x + 1) = 2 ln(x + 1) - frac(x, x + 1) = g(x)$.',
						mark: '0.75'
					},
					{
						type: 'text',
						content:
							'ب) استنتج أنّ $f$ متناقصة تماما على $[alpha ; 0]$ ومتزايدة تماما على كلّ من المجالين $]-1 ; alpha]$ و $[0 ; +oo[$.',
						answer:
							'ب) بما أن $f\'(x) = g(x)$، فمن إشارة $g(x)$ نستنتج أن الدالة $f$ متناقصة تماما على $[alpha ; 0]$ (0.25 ن)، ومتزايدة تماما على كلّ من المجالين $]-1 ; alpha]$ و $[0 ; +oo[$ (0.25 ن).',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'جـ) شكّل جدول تغيّرات الدّالة $f$.',
						answer: `جـ) جدول تغيّرات الدّالة $f$ على المجال $]-1 ; +oo[$ (حيث $f(0) = 0$ و $f(alpha) approx 0.2$):\n\n#align(center)[#image("/static${fVar2023Url}", width: 70%)]`,
						mark: '0.75'
					},
					{
						type: 'text',
						content:
							'3) أ) ارسم $(C_f)$ في المجال $]-1 ; 4]$ (نأخذ: $f(3) approx 3.5$، $f(4) approx 5.7$ و $f(alpha) approx 0.2$).',
						answer: `3) أ) التمثيل البياني للمنحني $(C_f)$ والمستقيم المقارب العمودي $x = -1$:\n\n#align(center)[#image("/static${cf2023Url}", width: 68%)]`,
						mark: '0.75'
					},
					{
						type: 'text',
						content:
							'ب) عيّن بيانيا قيم الوسيط الحقيقي $m$ التي من أجلها تقبل المعادلة $f(x) = m$ ثلاثة حلول بالضبط.',
						answer:
							'ب) بيانيا، تقبل المعادلة $f(x) = m$ ثلاثة حلول متمايزة بالضبط من أجل: $0 < m < f(alpha)$.',
						mark: '0.25'
					},
					{
						type: 'text',
						content:
							'4) $F$ الدّالة المعرّفة على المجال $]-1 ; +oo[$ بـ: $F(x) = (x^2 + 3 x + 2) ln(x + 1) - 2 x^2 - 2 x$.\n\nأ) تحقّق أنّ $F$ أصلية للدّالة $f$ على المجال $]-1 ; +oo[$.',
						answer:
							'4) أ) الدالة $F$ قابلة للاشتقاق على $]-1 ; +oo[$، ومن أجل كل $x > -1$ (مع $x^2 + 3 x + 2 = (x + 1)(x + 2)$): $F\'(x) = (2 x + 3) ln(x + 1) + frac((x + 1)(x + 2), x + 1) - 4 x - 2 = (2 x + 3) ln(x + 1) + x + 2 - 4 x - 2 = f(x)$، إذن $F$ دالة أصلية لـ $f$ على $]-1 ; +oo[$.',
						mark: '1'
					},
					{
						type: 'text',
						content:
							'ب) استنتج بالسنتيمتر المربّع $cal(A)$ مساحة الحيّز المستوي المحدّد بالمنحني $(C_f)$ والمستقيمات التي معادلاتها $y = 0$، $x = alpha$ و $x = 0$.',
						answer:
							'ب) على المجال $[alpha ; 0]$ لدينا $f(x) >= 0$، ووحدة المساحة هي $1 upright(u) . upright(a) = 4 upright(c) upright(m)^2$. إذن $cal(A) = [F(0) - F(alpha)] times 4 upright(c) upright(m)^2 = 4 [2 alpha^2 + 2 alpha - (alpha^2 + 3 alpha + 2) ln(alpha + 1)] upright(c) upright(m)^2$.',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'جـ) تحقّق أنّ $cal(A) = (6 alpha^2 + 4 alpha) upright(c) upright(m)^2$.',
						answer:
							'جـ) من $g(alpha) = 0$ نستخرج $ln(alpha + 1) = frac(alpha, 2(alpha + 1))$، وبالتعويض في عبارة المساحة (مع $(alpha + 1)(alpha + 2) frac(alpha, 2(alpha + 1)) = frac(alpha^2 + 2 alpha, 2)$) نجد: $cal(A) = 4 [2 alpha^2 + 2 alpha - frac(alpha^2 + 2 alpha, 2)] = (6 alpha^2 + 4 alpha) upright(c) upright(m)^2$.',
						mark: '0.25'
					}
				]
			}
		]
	};

	return {
		slug: 'bac-2023-3as-tm-math',
		grade: '3as_tm',
		yearSubjectId: 725,
		streamId: 'TM',
		streamNameAr: 'تقني رياضي',
		academicYear: '2023',
		sessionAr: 'دورة جوان 2023',
		coefficient: 6,
		duration: '04 ساعات و30 دقيقة',
		titleAr: 'بكالوريا 2023 — الرياضيات (شعبة تقني رياضي - الموضوع الأول)',
		sourcePdfRelPath: 'pipeline/references/3as_tm/03_bac_official_archive/bac_2023_sujet.pdf',
		sourceSolutionPdfRelPath:
			'pipeline/references/3as_tm/03_bac_official_archive/bac_2023_correction.pdf',
		examDoc
	};
}

function buildPaper2024(): OfficialBacPaperRecord {
	const alpha2024 = -0.44285;

	const ch2024Svg = svgFunctionCurvePlot({
		xMin: -2.2,
		xMax: 3.1,
		yMin: -1,
		yMax: 4.2,
		fn: (x: number) => Math.exp(-x),
		curveLabel: '(Ch)',
		tangents: [{ x: 0, y: 2, slope: 1, halfSpan: 3.2, color: '#0f766e' }],
		points: [
			{ x: alpha2024, y: 0, label: 'α', color: '#dc2626' },
			{ x: 0.7, y: 2.7, label: '(D)', color: '#0f766e' }
		],
		width: 340,
		height: 240
	});
	const ch2024Url = saveSvgAsset('bac_2024_3as_tm_ch_subject', ch2024Svg);

	const fVar2024Svg = svgVariationTable({
		fnName: 'f(x)',
		derivName: "f'(x)",
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
		]
	});
	const fVar2024Url = saveSvgAsset('bac_2024_3as_tm_f_vartable', fVar2024Svg);

	const cf2024Svg = svgFunctionCurvePlot({
		xMin: -3.2,
		xMax: 1.3,
		yMin: -0.5,
		yMax: 4.2,
		fn: (x: number) => -x + (x + 1) * Math.exp(x),
		curveLabel: '(Cf)',
		asymptotes: [{ kind: 'oblique', a: -1, b: 0, label: '(Δ)', color: '#dc2626' }],
		tangents: [
			{
				x: -2,
				y: 2 - Math.exp(-2),
				slope: -1,
				halfSpan: 1.5,
				color: '#059669'
			}
		],
		points: [
			{ x: -1, y: 1, label: 'A(-1; 1)', color: '#15803d' },
			{ x: alpha2024, y: 0.8, label: 'M(α; f(α))', color: '#dc2626' }
		],
		width: 350,
		height: 245
	});
	const cf2024Url = saveSvgAsset('bac_2024_3as_tm_cf_solution', cf2024Svg);

	const examDoc: ExamDocument = {
		metadata: buildBacTmMetadata('2024'),
		exercises: [
			{
				id: 'bac_2024_tm_ex1',
				num: 'الأول',
				points: 4,
				instruction:
					'يحتوي صندوق على 9 كريّات متماثلة ولا نفرّق بينها باللّمس، منها: 4 بيضاء و 3 حمراء و 2 خضراوان.',
				content: [
					{
						type: 'text',
						content:
							'*الجزء الأول (I):* نسحب عشوائيا من الصندوق 3 كريّات في آن واحد.\n\n1) احسب احتمال كلّ من الحوادث الآتية: $A$: "الحصول على ثلاث كريّات من نفس اللّون"، $B$: "الحصول على الألوان الثلاثة"، $C$: "الحصول على كريّة بيضاء على الأقل".',
						answer:
							'*الجزء الأول (I):* 1) عدد الحالات الممكنة هو $C_9^3 = 84$.\n\n- $P(A) = frac(C_4^3 + C_3^3, C_9^3) = frac(4 + 1, 84) = frac(5, 84)$ (0.5 ن).\n\n- $P(B) = frac(C_4^1 times C_3^1 times C_2^1, C_9^3) = frac(24, 84) = frac(2, 7)$ (0.5 ن).\n\n- $P(C) = 1 - P(bar(C)) = 1 - frac(C_5^3, C_9^3) = 1 - frac(10, 84) = frac(74, 84) = frac(37, 42)$ (0.5 ن).',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'2) $X$ المتغيّر العشوائي الذي يرفق بكلّ عملية سحب لثلاث كريّات عدد الألوان المتحصّل عليها.\n\nأ) عيّن قانون احتمال المتغيّر العشوائي $X$ ثمّ احسب أمله الرياضياتي $E(X)$.',
						answer:
							'2) أ) قيم المتغيّر العشوائي $X$ هي $X(Omega) = {1 ; 2 ; 3}$ (0.25 ن):\n\n- $P(X = 1) = P(A) = frac(5, 84)$ (0.25 ن)، و $P(X = 3) = P(B) = frac(24, 84)$ (0.25 ن)، و $P(X = 2) = 1 - frac(5 + 24, 84) = frac(55, 84)$ (0.25 ن).\n\nالأمل الرياضياتي (0.5 ن): $E(X) = frac(1 times 5 + 2 times 55 + 3 times 24, 84) = frac(187, 84)$.',
						mark: '1.5'
					},
					{
						type: 'text',
						content: 'ب) احسب $E(84 X + 1837)$.',
						answer:
							'ب) بخواص خطية الأمل الرياضياتي: $E(84 X + 1837) = 84 E(X) + 1837 = 84 times frac(187, 84) + 1837 = 2024$.',
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'*الجزء الثاني (II):* نضيف الآن إلى الصندوق كريّة واحدة سوداء ثمّ نسحب منه عشوائيا 4 كريّات على التوالي دون إرجاع.\n\n- بيّن أنّ احتمال الحادثة $D$: "الحصول على الألوان الأربعة" هو $frac(4, 35)$.',
						answer:
							'*الجزء الثاني (II):* يصبح في الصندوق 10 كريات (4 بيضاء، 3 حمراء، 2 خضراء، 1 سوداء)، وعدد الترتيبات الممكنة هو $A_(10)^4 = 5040$. احتمال الحصول على الألوان الأربعة مع تبديل الترتيب ($4! = 24$) هو: $P(D) = frac(4! times (A_1^1 times A_2^1 times A_3^1 times A_4^1), A_(10)^4) = frac(24 times 24, 5040) = frac(576, 5040) = frac(4, 35)$.',
						mark: '0.5'
					}
				]
			},
			{
				id: 'bac_2024_tm_ex2',
				num: 'الثاني',
				points: 4,
				content: [
					{
						type: 'text',
						content:
							'1) أ) ادرس تبعا لقيم العدد الطبيعي $n$، بواقي القسمة الإقليدية لكلّ من العددين $3^n$ و $5^n$ على 7.',
						answer:
							'1) أ) دور البواقي على 7 لكلّ من $3^n$ و $5^n$ هو 6 (حيث $k in bb(N)$):\n\n- بواقي $3^n$ على 7 من أجل $n = 6 k + r$ مع $r in {0, 1, 2, 3, 4, 5}$ هي على الترتيب: $1, 3, 2, 6, 4, 5$ (1 ن).\n\n- بواقي $5^n$ على 7 من أجل $n = 6 k + r$ مع $r in {0, 1, 2, 3, 4, 5}$ هي على الترتيب: $1, 5, 4, 6, 2, 3$ (1 ن).',
						mark: '2'
					},
					{
						type: 'text',
						content: 'ب) استنتج باقي القسمة الإقليدية للعدد $(5^(1445))^(2024)$ على 7.',
						answer:
							'ب) لدينا $1445 = 6 times 240 + 5$ ومنه $5^(1445) equiv 5^5 equiv 3 [7]$. ولدينا $2024 = 6 times 337 + 2$ ومنه $(5^(1445))^(2024) equiv 3^(2024) equiv 3^2 equiv 2 [7]$، فالباقي هو 2.',
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'2) بيّن أنّه: من أجل كلّ عدد طبيعي $n$، العدد $61^(6 n + 1) + 52^(6 n + 3) + 1445$ مضاعف للعدد 7.',
						answer:
							'2) لدينا $61 equiv 5 [7]$ و $52 equiv 3 [7]$ و $1445 equiv 3 [7]$، ومنه: $61^(6 n + 1) + 52^(6 n + 3) + 1445 equiv 5^(6 n + 1) + 3^(6 n + 3) + 3 equiv 5 + 6 + 3 equiv 14 equiv 0 [7]$، فالعدد مضاعف لـ 7 من أجل كل عدد طبيعي $n$.',
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'3) جد الأعداد الطبيعية $n$ التي تُحقّق: $1445^(6 n + 1) + 2024^n + 2 n equiv 0 [7]$.',
						answer:
							'3) لدينا $1445^(6 n + 1) equiv 3^(6 n + 1) equiv 3 [7]$ و $2024 equiv 1 [7]$ ومنه $2024^n equiv 1 [7]$. تصبح الموافقة $3 + 1 + 2 n equiv 0 [7]$ أي $2 n equiv 3 equiv 10 [7]$، ولأن $op("PGCD")(2 ; 7) = 1$ نجد $n equiv 5 [7]$ أي $n = 7 alpha + 5$ مع $alpha in bb(N)$.',
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'4) عيّن الأعداد الطبيعية $n$ التي من أجلها يقبل العدد $2^n + 5^n$ القسمة على 7.',
						answer:
							'4) بما أن $2 equiv -5 [7]$ فإن $2^n + 5^n equiv (-5)^n + 5^n [7]$، وتكافئ قابلية القسمة على 7 أن يكون $(-5)^n + 5^n equiv 0 [7]$ أي أن يكون $n$ عدداً طبيعياً فردياً ($n = 2 k + 1$ مع $k in bb(N)$).',
						mark: '0.5'
					}
				]
			},
			{
				id: 'bac_2024_tm_ex3',
				num: 'الثالث',
				points: 5,
				instruction:
					'$(u_n)$ المتتالية العددية المعرّفة بـ: $u_0 = 0$ ومن أجل كلّ عدد طبيعي $n$، $u_(n+1) = frac(6 + 6 u_n, 5 + u_n)$.',
				content: [
					{
						type: 'text',
						content:
							'1) احسب $u_1$ و $u_2$ ثمّ تحقّق أنّه: من أجل كلّ عدد طبيعي $n$، $u_(n+1) = 6 - frac(24, 5 + u_n)$.',
						answer:
							'1) لدينا $u_1 = frac(6, 5)$ (0.25 ن)، و $u_2 = frac(6 + frac(36, 5), 5 + frac(6, 5)) = frac(66, 31)$ (0.25 ن). ومن أجل كل $n in bb(N)$: $6 - frac(24, 5 + u_n) = frac(30 + 6 u_n - 24, 5 + u_n) = frac(6 + 6 u_n, 5 + u_n) = u_(n+1)$ (0.25 ن).',
						mark: '0.75'
					},
					{
						type: 'text',
						content: '2) أ) برهن بالتراجع أنّه: من أجل كلّ عدد طبيعي $n$، $0 <= u_n < 3$.',
						answer:
							'2) أ) من أجل $n = 0$ لدينا $0 <= 0 < 3$ محقّقة (0.25 ن). نفرض أن $0 <= u_n < 3$ من أجل عدد طبيعي كيفي $n$، فيكون $5 <= 5 + u_n < 8$ ومنه $frac(1, 8) < frac(1, 5 + u_n) <= frac(1, 5)$، وعليه $6 - frac(24, 5) <= 6 - frac(24, 5 + u_n) < 6 - 3$ أي $0 < frac(6, 5) <= u_(n+1) < 3$. إذن من أجل كل $n in bb(N)$: $0 <= u_n < 3$ (0.75 ن).',
						mark: '1'
					},
					{
						type: 'text',
						content: 'ب) ادرس اتجاه تغيّر المتتالية $(u_n)$.',
						answer:
							'ب) من أجل كل $n in bb(N)$: $u_(n+1) - u_n = frac(6 + u_n - u_n^2, 5 + u_n) = frac((u_n + 2)(3 - u_n), 5 + u_n) > 0$ لأن $0 <= u_n < 3$. إذن المتتالية $(u_n)$ متزايدة تماما على $bb(N)$.',
						mark: '0.75'
					},
					{
						type: 'text',
						content:
							'3) $(v_n)$ المتتالية العددية المعرّفة على $bb(N)$ بـ: $v_n = frac(u_n + 2, u_n - 3)$.\n\nأ) أثبت أنّ المتتالية $(v_n)$ هندسية أساسها $frac(8, 3)$ ثمّ اكتب عبارة $v_n$ بدلالة $n$.',
						answer:
							'3) أ) من أجل كل $n in bb(N)$ لدينا $v_(n+1) = frac(u_(n+1) + 2, u_(n+1) - 3) = frac(8 u_n + 16, 3 u_n - 9) = frac(8, 3) v_n$ (0.5 ن).\n\nإذن $(v_n)$ هندسية أساسها $frac(8, 3)$ وحدّها الأول $v_0 = -frac(2, 3)$، وعبارتها $v_n = -frac(2, 3) (frac(8, 3))^n$ (0.5 ن).',
						mark: '1'
					},
					{
						type: 'text',
						content:
							'ب) بيّن أنّه: من أجل كلّ عدد طبيعي $n$، $u_n = 3 + frac(5, v_n - 1)$ ثمّ احسب $lim_(n arrow.r +oo) u_n$.',
						answer:
							'ب) من $v_n = 1 + frac(5, u_n - 3)$ نستخرج $u_n - 3 = frac(5, v_n - 1)$ أي $u_n = 3 + frac(5, v_n - 1)$ (0.5 ن).\n\nوبما أن $frac(8, 3) > 1$ فإن $lim_(n arrow.r +oo) v_n = -oo$، ومنه $lim_(n arrow.r +oo) u_n = 3$ (0.5 ن).',
						mark: '1'
					},
					{
						type: 'text',
						content:
							'4) احسب المجموع $S_n$ بدلالة $n$ حيث: $S_n = v_0 + 3 times v_1 + 3^2 times v_2 + ... + 3^n times v_n$.',
						answer:
							'4) لدينا $3^k v_k = -frac(2, 3) times 8^k$، ومنه $S_n = -frac(2, 3) (8^0 + 8^1 + ... + 8^n) = -frac(2, 3) times frac(1 - 8^(n+1), 1 - 8) = frac(2, 21) (1 - 8^(n+1))$.',
						mark: '0.5'
					}
				]
			},
			{
				id: 'bac_2024_tm_ex4',
				customTitle: 'التمرين الرابع: المسألة الشاملة',
				points: 7,
				content: [
					{
						type: 'text',
						content:
							'*الجزء الأول (I):* $(C_h)$ التمثيل البياني للدّالة $h$ المعرّفة على $bb(R)$ بـ: $h(x) = e^(-x)$، و $(D)$ المستقيم ذو المعادلة: $y = x + 2$ و $alpha$ فاصلة نقطة تقاطع $(C_h)$ و $(D)$، كما في الشّكل المقابل.\n\nبقراءة بيانية: حدّد حسب قيم العدد الحقيقي $x$ إشارة $g(x)$ حيث: $g(x) = e^(-x) - x - 2$.',
						answer:
							'*الجزء الأول (I):* بقراءة الوضعية النسبية لـ $(C_h)$ و $(D)$ على $bb(R)$:\n\n- من أجل $x in ]-oo ; alpha[$: $g(x) > 0$.\n\n- من أجل $x = alpha$: $g(alpha) = 0$.\n\n- من أجل $x in ]alpha ; +oo[$: $g(x) < 0$.',
						mark: '0.5'
					},
					{
						type: 'image',
						src: ch2024Url,
						caption: 'التمثيل البياني $(C_h)$ للدالة $h(x) = e^(-x)$ والمستقيم $(D) : y = x + 2$'
					},
					{
						type: 'text',
						content:
							'*الجزء الثاني (II):* $f$ الدّالة العددية المعرّفة على $bb(R)$ بـ: $f(x) = -x + (x + 1) e^x$. $(C_f)$ تمثيلها البياني في المستوي المنسوب إلى المعلم المتعامد والمتجانس $(O ; arrow(i), arrow(j))$، (وحدة الطول $2 upright(c) upright(m)$).\n\n1) احسب $lim_(x arrow.r -oo) f(x)$ و $lim_(x arrow.r +oo) f(x)$.',
						answer:
							'*الجزء الثاني (II):* 1) عند $-oo$: بالتزايد المقارن $lim_(x arrow.r -oo) (x e^x + e^x) = 0$ و $lim_(x arrow.r -oo) (-x) = +oo$، ومنه $lim_(x arrow.r -oo) f(x) = +oo$ (0.25 ن). وعند $+oo$: $f(x) = x(e^x - 1) + e^x$ ومنه $lim_(x arrow.r +oo) f(x) = +oo$ (0.25 ن).',
						mark: '0.5'
					},
					{
						type: 'text',
						content: '2) أ) بيّن أنّه: من أجل كلّ عدد حقيقي $x$، $f\'(x) = -g(x) times e^x$.',
						answer:
							'2) أ) من أجل كل $x in bb(R)$: $f\'(x) = -1 + e^x + (x + 1) e^x = -1 + (x + 2) e^x = -e^x (e^(-x) - x - 2) = -g(x) times e^x$.',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'ب) استنتج اتجاه تغيّر الدّالة $f$ ثمّ شكّل جدول تغيّراتها.',
						answer: `ب) بما أن $e^x > 0$ فإن إشارة $f'(x)$ عكس إشارة $g(x)$: الدالة $f$ متناقصة تماما على $]-oo ; alpha]$ ومتزايدة تماما على $[alpha ; +oo[$ (0.5 ن). جدول التغيّرات (0.5 ن):\n\n#align(center)[#image("/static${fVar2024Url}", width: 65%)]`,
						mark: '1'
					},
					{
						type: 'text',
						content:
							'3) أ) بيّن أنّ المستقيم $(Delta)$ ذا المعادلة $y = -x$ مقارب مائل للمنحني $(C_f)$ عند $-oo$.',
						answer:
							'3) أ) لدينا $lim_(x arrow.r -oo) [f(x) - (-x)] = lim_(x arrow.r -oo) (x e^x + e^x) = 0$، إذن المستقيم $(Delta) : y = -x$ مقارب مائل لـ $(C_f)$ عند $-oo$.',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'ب) ادرس الوضع النّسبي للمنحني $(C_f)$ والمستقيم $(Delta)$.',
						answer:
							'ب) إشارة الفرق $f(x) - (-x) = (x + 1) e^x$ من إشارة $(x + 1)$: لما $x < -1$ يقع $(C_f)$ أسفل $(Delta)$، ولما $x > -1$ يقع $(C_f)$ أعلى $(Delta)$، ويتقاطعان في النقطة $A(-1 ; 1)$.',
						mark: '0.75'
					},
					{
						type: 'text',
						content: '4) بيّن أنّ $(C_f)$ يقبل مماسا $(T)$ موازيا لـ $(Delta)$، يُطلب تعيين معادلة له.',
						answer:
							'4) توازي $(T)$ مع $(Delta)$ يكافئ $f\'(x) = -1$ أي $-1 + (x + 2) e^x = -1$ ومنه $x = -2$ (0.5 ن). معادلة المماس $(T)$ هي: $y = -1(x + 2) + f(-2) = -x - frac(1, e^2)$ (0.25 ن).',
						mark: '0.75'
					},
					{
						type: 'text',
						content:
							'5) أ) ارسم $(T)$، $(Delta)$ و $(C_f)$ (نأخذ: $alpha approx -0.5$ و $f(alpha) approx 0.8$).',
						answer: `5) أ) رسم $(Delta)$ و $(T)$ (0.5 ن) والمنحني $(C_f)$ (0.5 ن):\n\n#align(center)[#image("/static${cf2024Url}", width: 66%)]`,
						mark: '1'
					},
					{
						type: 'text',
						content:
							'ب) عيّن بيانيا قيم الوسيط الحقيقي $m$ التي من أجلها تقبل المعادلة $f(x) = -x - e^m$ حلّين مختلفين.',
						answer:
							'ب) تقبل المعادلة $f(x) = -x - e^m$ حلّين مختلفين إذا وقع المستقيم المائل $y = -x - e^m$ بين $(T) : y = -x - e^(-2)$ و $(Delta) : y = -x$، أي $-e^(-2) < -e^m < 0$ ومنه $m in ]-oo ; -2[$.',
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'6) أ) باستعمال المكاملة بالتجزئة، بيّن أنّ: $integral_(-1)^0 x e^x dif x = frac(2, e) - 1$.',
						answer:
							'6) أ) بوضع $u(x) = x$ و $v\'(x) = e^x$ (أي $u\'(x) = 1$ و $v(x) = e^x$): $integral_(-1)^0 x e^x dif x = [x e^x]_(-1)^0 - integral_(-1)^0 e^x dif x = frac(1, e) - (1 - frac(1, e)) = frac(2, e) - 1$.',
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'ب) استنتج بالسنتيمتر المربع، $cal(A)$ مساحة الحيّز المستوي المحدّد بـ $(C_f)$ والمستقيمات التي معادلاتها: $y = -x$، $x = -1$، $x = 0$.',
						answer:
							'ب) على $[-1 ; 0]$ لدينا $f(x) + x = (x + 1) e^x >= 0$ ووحدة المساحة $4 upright(c) upright(m)^2$. ولدينا $integral_(-1)^0 (f(x) + x) dif x = (frac(2, e) - 1) + (1 - frac(1, e)) = frac(1, e)$، ومنه $cal(A) = frac(4, e) upright(c) upright(m)^2$.',
						mark: '0.5'
					}
				]
			}
		]
	};

	return {
		slug: 'bac-2024-3as-tm-math',
		grade: '3as_tm',
		yearSubjectId: 725,
		streamId: 'TM',
		streamNameAr: 'تقني رياضي',
		academicYear: '2024',
		sessionAr: 'دورة جوان 2024',
		coefficient: 6,
		duration: '04 ساعات و30 دقيقة',
		titleAr: 'بكالوريا 2024 — الرياضيات (شعبة تقني رياضي - الموضوع الأول)',
		sourcePdfRelPath: 'pipeline/references/3as_tm/03_bac_official_archive/bac_2024_sujet.pdf',
		sourceSolutionPdfRelPath:
			'pipeline/references/3as_tm/03_bac_official_archive/bac_2024_correction.pdf',
		examDoc
	};
}

function buildPaper2025(): OfficialBacPaperRecord {
	const gVar2025Svg = svgVariationTable({
		fnName: 'g(x)',
		derivName: "g'(x)",
		xValues: ['-∞', '1', '3', '+∞'],
		derivativeRow: [
			{ kind: 'sign', value: '+' },
			{ kind: 'sign', value: '0' },
			{ kind: 'sign', value: '-' },
			{ kind: 'sign', value: '0' },
			{ kind: 'sign', value: '+' }
		],
		variations: [
			{ value: '-∞', position: 'bottom' },
			{ value: '1', position: 'top' },
			{ value: '1-4e^-3', position: 'bottom' },
			{ value: '1', position: 'top' }
		]
	});
	const gVar2025Url = saveSvgAsset('bac_2025_3as_tm_g_vartable', gVar2025Svg);

	const fVar2025Svg = svgVariationTable({
		fnName: 'f(x)',
		derivName: "f'(x)",
		xValues: ['-∞', '0', '+∞'],
		derivativeRow: [
			{ kind: 'sign', value: '-' },
			{ kind: 'sign', value: '0' },
			{ kind: 'sign', value: '+' }
		],
		variations: [
			{ value: '+∞', position: 'top' },
			{ value: '1', position: 'bottom' },
			{ value: '+∞', position: 'top' }
		]
	});
	const fVar2025Url = saveSvgAsset('bac_2025_3as_tm_f_vartable', fVar2025Svg);

	const cf2025Svg = svgFunctionCurvePlot({
		xMin: -1.6,
		xMax: 4.4,
		yMin: -0.6,
		yMax: 4.8,
		fn: (x: number) => x + (x * x + 1) * Math.exp(-x),
		curveLabel: '(Cf)',
		asymptotes: [{ kind: 'oblique', a: 1, b: 0, label: '(Δ)', color: '#dc2626' }],
		tangents: [
			{
				x: 1,
				y: 1 + 2 / Math.E,
				slope: 1,
				halfSpan: 2.2,
				color: '#059669'
			}
		],
		points: [
			{ x: 0, y: 1, label: '(0; 1)', color: '#15803d' },
			{ x: 1, y: 1 + 2 / Math.E, label: 'A', color: '#dc2626' },
			{ x: 3, y: 3 + 10 / Math.pow(Math.E, 3), label: 'B', color: '#7c3aed' }
		],
		width: 360,
		height: 250
	});
	const cf2025Url = saveSvgAsset('bac_2025_3as_tm_cf_solution', cf2025Svg);

	const examDoc: ExamDocument = {
		metadata: buildBacTmMetadata('2025'),
		exercises: [
			{
				id: 'bac_2025_tm_ex1',
				num: 'الأول',
				points: 4,
				instruction:
					'يحتوي صندوق على 10 كريّات متماثلة ولا نفرّق بينها باللّمس منها: كريتان خضراوان مرقّمتان بـ: 1، 2 وثلاث كريّات بيضاء مرقّمة بـ: 1، 1، 2 وخمس كريّات حمراء مرقّمة بـ: 1، 1، 2، 2، 3.',
				content: [
					{
						type: 'text',
						content:
							'*الجزء الأول (I):* نسحب عشوائيا من الصندوق 3 كريّات في آن واحد، ونعتبر الحوادث الآتية: $A$: "الحصول على 3 كريّات مختلفة الألوان مثنى مثنى"، $B$: "الحصول على 3 كريّات تحمل نفس الرّقم"، $C$: "الحصول على 3 كريّات مجموع أرقامها 6".\n\n1) أ) احسب $P(A)$، $P(B)$ و $P(C)$ احتمالات الحوادث $A$، $B$ و $C$ على التّرتيب.',
						answer:
							'*الجزء الأول (I):* 1) أ) عدد الحالات الممكنة هو $C_(10)^3 = 120$ (0.5 ن).\n\n- $P(A) = frac(C_2^1 times C_3^1 times C_5^1, C_(10)^3) = frac(30, 120) = frac(1, 4)$ (0.25 ن).\n\n- توزيع الأرقام في الصندوق: خمس كريات تحمل 1، أربع تحمل 2، وواحدة تحمل 3، ومنه $P(B) = frac(C_5^3 + C_4^3, C_(10)^3) = frac(14, 120) = frac(7, 60)$ (0.25 ن).\n\n- مجموع الأرقام 6 يتحقق بـ $(2, 2, 2)$ أو $(1, 2, 3)$: $P(C) = frac(C_4^3 + C_5^1 times C_4^1 times C_1^1, C_(10)^3) = frac(24, 120) = frac(1, 5)$ (0.25 ن).',
						mark: '1.25'
					},
					{
						type: 'text',
						content: 'ب) احسب $P(A ∩ B)$ ثمّ استنتج حساب $P(A ∪ B)$.',
						answer:
							'ب) الحادثة $A ∩ B$ تعني 3 كريات مختلفة الألوان وتحمل نفس الرقم (إما ثلاثتها تحمل 1 أو ثلاثتها تحمل 2): $P(A ∩ B) = frac(C_1^1 times C_2^1 times C_2^1 + C_1^1 times C_1^1 times C_2^1, C_(10)^3) = frac(4 + 2, 120) = frac(1, 20)$ (0.5 ن).\n\nومنه $P(A ∪ B) = P(A) + P(B) - P(A ∩ B) = frac(15 + 7 - 3, 60) = frac(19, 60)$ (0.5 ن).',
						mark: '1'
					},
					{
						type: 'text',
						content:
							'2) $X$ المتغيّر العشوائي الذي يرفق بكلّ عملية سحب لـ 3 كريّات بالكيفية السّابقة عدد ألوان الكريّات المسحوبة.\n\n- عيّن قانون احتمال المتغيّر العشوائي $X$ ثمّ احسب أمله الرّياضياتي.',
						answer:
							'2) مجموعة قيم المتغيّر العشوائي $X$ هي $X(Omega) = {1 ; 2 ; 3}$ (0.25 ن):\n\n- $P(X = 1) = frac(C_3^3 + C_5^3, 120) = frac(11, 120)$ (0.25 ن)، و $P(X = 3) = P(A) = frac(30, 120)$ (0.25 ن)، و $P(X = 2) = 1 - frac(41, 120) = frac(79, 120)$ (0.25 ن).\n\nالأمل الرياضياتي (0.25 ن): $E(X) = frac(1 times 11 + 2 times 79 + 3 times 30, 120) = frac(259, 120)$.',
						mark: '1.25'
					},
					{
						type: 'text',
						content:
							'*الجزء الثاني (II):* نسحب عشوائيا من الصندوق 3 كريّات على التّوالي دون إرجاع.\n\n- ما احتمال ألّا يبقى في الصّندوق أيّة كريّة خضراء؟',
						answer:
							'*الجزء الثاني (II):* ألّا يبقى في الصندوق أية كرية خضراء يعني سحب الكريتين الخضراوين وكرية من الثماني المتبقية مع مراعاة الترتيب: $P = frac(3 times A_2^2 times A_8^1, A_(10)^3) = frac(3 times 2 times 8, 720) = frac(48, 720) = frac(1, 15)$.',
						mark: '0.5'
					}
				]
			},
			{
				id: 'bac_2025_tm_ex2',
				num: 'الثاني',
				points: 4,
				content: [
					{
						type: 'text',
						content:
							'1) $(u_n)$ المتتالية العددية المعرّفة بـ: $u_0 = e^2$ ومن أجل كلّ عدد طبيعي $n$، $u_(n+1) = 2 sqrt(u_n)$.\n\nأ) احسب الحدّين $u_1$، $u_2$ ثمّ خمّن اتّجاه تغيّر المتتالية $(u_n)$.',
						answer:
							'1) أ) لدينا $u_1 = 2 sqrt(e^2) = 2 e$ (0.25 ن)، و $u_2 = 2 sqrt(2 e)$ (0.25 ن). التخمين: المتتالية $(u_n)$ متناقصة تماما (0.25 ن).',
						mark: '0.75'
					},
					{
						type: 'text',
						content: 'ب) برهن بالتّراجع أنّه: من أجل كلّ عدد طبيعي $n$، $4 < u_n <= e^2$.',
						answer:
							'ب) من أجل $n = 0$: $u_0 = e^2$ يحقق $4 < e^2 <= e^2$. نفرض أن $4 < u_n <= e^2$ من أجل عدد طبيعي كيفي $n$، فيكون $2 < sqrt(u_n) <= e$ ومنه $4 < 2 sqrt(u_n) <= 2 e < e^2$ (لأن $2 < e$)، أي $4 < u_(n+1) <= e^2$. إذن من أجل كل عدد طبيعي $n$: $4 < u_n <= e^2$.',
						mark: '0.75'
					},
					{
						type: 'text',
						content: 'جـ) ادرس اتّجاه تغيّر المتتالية $(u_n)$.',
						answer:
							'جـ) من أجل كل $n in bb(N)$: $u_(n+1) - u_n = sqrt(u_n)(2 - sqrt(u_n))$. وبما أن $u_n > 4$ فإن $sqrt(u_n) > 2$ ومنه $2 - sqrt(u_n) < 0$، وعليه $u_(n+1) - u_n < 0$، فالمتتالية $(u_n)$ متناقصة تماما.',
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'2) $(v_n)$ المتتالية العددية المعرّفة على $bb(N)$ بـ: $v_n = ln(u_n) - 2 ln(2)$.\n\nأ) بيّن أنّ المتتالية $(v_n)$ هندسية أساسها $frac(1, 2)$ ثمّ اكتب $v_n$ بدلالة $n$.',
						answer:
							'2) أ) من أجل كل $n in bb(N)$: $v_(n+1) = ln(2 sqrt(u_n)) - 2 ln(2) = frac(1, 2) ln(u_n) - ln(2) = frac(1, 2) v_n$ (0.5 ن). إذن $(v_n)$ هندسية أساسها $frac(1, 2)$ وحدّها الأول $v_0 = 2 - 2 ln(2)$ (0.25 ن)، وعبارتها $v_n = frac(2 - ln(4), 2^n) = frac(1 - ln(2), 2^(n-1))$ (0.25 ن).',
						mark: '1'
					},
					{
						type: 'text',
						content: 'ب) استنتج كتابة $u_n$ بدلالة $n$ ثمّ احسب $lim_(n arrow.r +oo) u_n$.',
						answer:
							'ب) من $ln(u_n) = v_n + ln(4)$ نجد $u_n = 4 e^(v_n) = 4 exp(frac(1 - ln(2), 2^(n-1)))$ (0.25 ن). وبما أن $lim_(n arrow.r +oo) v_n = 0$ فإن $lim_(n arrow.r +oo) u_n = 4$ (0.25 ن).',
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'3) أ) احسب بدلالة $n$ المجموع $S_n$ حيث: $S_n = v_0 + v_1 + ... + v_n$.',
						answer:
							'3) أ) لدينا $S_n = v_0 frac(1 - (frac(1, 2))^(n+1), 1 - frac(1, 2)) = 4(1 - ln(2)) [1 - (frac(1, 2))^(n+1)]$.',
						mark: '0.25'
					},
					{
						type: 'text',
						content:
							'ب) استنتج بدلالة $n$ الجُداء $P_n$ حيث: $P_n = u_0 times u_1 times ... times u_n$.',
						answer:
							'ب) بما أن $u_k = 4 e^(v_k)$ فإن $P_n = 4^(n+1) times e^(v_0 + v_1 + ... + v_n) = 4^(n+1) times e^(S_n)$.',
						mark: '0.25'
					}
				]
			},
			{
				id: 'bac_2025_tm_ex3',
				num: 'الثالث',
				points: 5,
				content: [
					{
						type: 'text',
						content:
							'1) نعتبر المعادلة: $(E) : 7 x - 5 y = 9$ ذات المجهولين الصّحيحين $x$ و $y$.\n\nأ) عيّن الأعداد الصّحيحة $x$ التي تحقّق: $7 x equiv 9 [5]$ ثمّ حل المعادلة $(E)$.',
						answer:
							'1) أ) الموافقة $7 x equiv 9 [5]$ تكافئ $2 x equiv 4 [5]$ أي $x equiv 2 [5]$ ومنه $x = 5 k + 2$ مع $k in bb(Z)$ (0.75 ن). بالتعويض في $(E)$ نجد $y = 7 k + 1$، فحلول $(E)$ هي $(x ; y) = (5 k + 2 ; 7 k + 1)$ مع $k in bb(Z)$ (0.5 ن).',
						mark: '1.25'
					},
					{
						type: 'text',
						content:
							'ب) نضع: $d = op("PGCD")(x ; y)$ حيث الثّنائية $(x ; y)$ تحقّق المعادلة $(E)$.\n\n- عيّن القيم الممكنة للعدد $d$ ثمّ جد كلّ الثّنائيات $(x ; y)$ حلول المعادلة $(E)$ حيث: $d = 9$.',
						answer:
							'ب) $d$ يقسم كلاً من $x$ و $y$ فهو يقسم $7 x - 5 y = 9$، ومنه $d in {1 ; 3 ; 9}$ (0.25 ن). من أجل $d = 9$ يلزم $5 k + 2 equiv 0 [9]$ أي $5 k equiv 7 equiv 25 [9]$ ومنه $k = 9 m + 5$ ($m in bb(Z)$)، فنجد $(x ; y) = (45 m + 27 ; 63 m + 36)$ مع $m in bb(Z)$ (0.75 ن).',
						mark: '1'
					},
					{
						type: 'text',
						content:
							'2) أ) ادرس حسب قيم العدد الطّبيعي $n$ بواقي القسمة الإقليدية للعدد $3^n$ على 7.',
						answer:
							'2) أ) من أجل كل عدد طبيعي $k$: $3^(6 k) equiv 1 [7]$، $3^(6 k + 1) equiv 3 [7]$، $3^(6 k + 2) equiv 2 [7]$، $3^(6 k + 3) equiv 6 [7]$، $3^(6 k + 4) equiv 4 [7]$، $3^(6 k + 5) equiv 5 [7]$ (دور البواقي هو 6).',
						mark: '1'
					},
					{
						type: 'text',
						content:
							'ب) عيّن الأعداد الطّبيعية $n$ التي من أجلها يكون العدد $1446^(2025) + 5 n + 2$ قابلا للقسمة على 7.',
						answer:
							'ب) لدينا $1446 = 7 times 206 + 4 equiv 3^4 [7]$ ومنه $1446^(2025) equiv 3^(8100) = (3^6)^(1350) equiv 1 [7]$. إذن $1446^(2025) + 5 n + 2 equiv 0 [7]$ تكافئ $5 n + 3 equiv 0 [7]$ أي $5 n equiv 4 equiv 25 [7]$ ومنه $n = 7 k + 5$ مع $k in bb(N)$.',
						mark: '0.75'
					},
					{
						type: 'text',
						content:
							'3) عيّن كلّ الثّنائيات الطّبيعية $(x ; y)$ حلول المعادلة $(E)$ والتي تحقّق: $3^(y - x) equiv 5 [7]$.',
						answer:
							'3) من أجل $k >= 1$ لدينا $y - x = 2 k - 1$، والموافقة $3^(2 k - 1) equiv 5 [7]$ تكافئ $2 k - 1 = 6 alpha + 5$ ($alpha in bb(N)$) أي $k = 3 alpha + 3$ مع $alpha in bb(N)$ (0.5 ن). ومنه $(x ; y) = (15 alpha + 17 ; 21 alpha + 22)$ مع $alpha in bb(N)$ (0.5 ن).',
						mark: '1'
					}
				]
			},
			{
				id: 'bac_2025_tm_ex4',
				customTitle: 'التمرين الرابع: المسألة الشاملة',
				points: 7,
				content: [
					{
						type: 'text',
						content:
							'*الجزء الأول (I):* $g$ الدّالة المعرّفة على $bb(R)$ بـ: $g(x) = 1 - (x - 1)^2 e^(-x)$.\n\n1) أ) احسب $lim_(x arrow.r -oo) g(x)$ وبيّن أنّ: $lim_(x arrow.r +oo) g(x) = 1$.',
						answer:
							'*الجزء الأول (I):* 1) أ) لدينا $lim_(x arrow.r -oo) g(x) = -oo$ لأن $lim_(x arrow.r -oo) (x - 1)^2 e^(-x) = +oo$ (0.25 ن). وعند $+oo$: $g(x) = 1 - frac(x^2, e^x) + frac(2 x, e^x) - frac(1, e^x)$ وبالتزايد المقارن $lim_(x arrow.r +oo) g(x) = 1$ (0.25 ن).',
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'ب) تحقّق أنّه: من أجل كلّ عدد حقيقي $x$، $g\'(x) = (x - 1)(x - 3) e^(-x)$.',
						answer:
							'ب) من أجل كل عدد حقيقي $x$: $g\'(x) = -2(x - 1) e^(-x) + (x - 1)^2 e^(-x) = (x - 1)(x - 3) e^(-x)$.',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'جـ) ادرس اتّجاه تغيّر الدّالة $g$ ثمّ شكّل جدول تغيّراتها.',
						answer: `جـ) الدالة $g$ متزايدة تماما على كلّ من $]-oo ; 1]$ و $[3 ; +oo[$ ومتناقصة تماما على $[1 ; 3]$ (0.25 ن). جدول التغيّرات (0.25 ن):\n\n#align(center)[#image("/static${gVar2025Url}", width: 70%)]`,
						mark: '0.5'
					},
					{
						type: 'text',
						content: '2) احسب $g(0)$ ثمّ استنتج حسب قيم $x$ إشارة $g(x)$.',
						answer:
							'2) لدينا $g(0) = 1 - 1 = 0$ (0.25 ن). وبما أن $g(3) = 1 - 4 e^(-3) > 0$ فإن: $g(x) < 0$ على $]-oo ; 0[$، و $g(0) = 0$، و $g(x) > 0$ على $]0 ; +oo[$ (0.25 ن).',
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'*الجزء الثاني (II):* $f$ الدّالة المعرّفة على $bb(R)$ بـ: $f(x) = x + (x^2 + 1) e^(-x)$. $(C_f)$ تمثيلها البياني في المستوي المنسوب إلى المعلم المتعامد والمتجانس $(O ; arrow(i), arrow(j))$ (وحدة الطول $2 upright(c) upright(m)$).\n\n1) أ) احسب $lim_(x arrow.r +oo) f(x)$ وبيّن أنّ: $lim_(x arrow.r -oo) f(x) = +oo$.',
						answer:
							'*الجزء الثاني (II):* 1) أ) بالتزايد المقارن عند $+oo$ نجد $lim_(x arrow.r +oo) f(x) = +oo$ (0.25 ن). وعند $-oo$ نكتب $f(x) = x(1 + x e^(-x)) + e^(-x)$ وبما أن $lim_(x arrow.r -oo) x e^(-x) = -oo$ فإن $lim_(x arrow.r -oo) f(x) = +oo$ (0.25 ن).',
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'ب) بيّن أنّ المستقيم $(Delta)$ ذا المعادلة: $y = x$ مقارب مائل للمنحني $(C_f)$ عند $+oo$.',
						answer:
							'ب) لدينا $lim_(x arrow.r +oo) [f(x) - x] = lim_(x arrow.r +oo) (frac(x^2, e^x) + frac(1, e^x)) = 0$، فالمستقيم $(Delta) : y = x$ مقارب مائل لـ $(C_f)$ عند $+oo$.',
						mark: '0.25'
					},
					{
						type: 'text',
						content: '2) أ) بيّن أنّه: من أجل كلّ عدد حقيقي $x$، $f\'(x) = g(x)$.',
						answer:
							'2) أ) من أجل كل عدد حقيقي $x$: $f\'(x) = 1 + 2 x e^(-x) - (x^2 + 1) e^(-x) = 1 - (x - 1)^2 e^(-x) = g(x)$.',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'ب) استنتج اتّجاه تغيّر الدّالة $f$ ثمّ شكّل جدول تغيّراتها.',
						answer: `ب) الدالة $f$ متناقصة تماما على $]-oo ; 0]$ ومتزايدة تماما على $[0 ; +oo[$ (0.25 ن). جدول التغيّرات (0.25 ن):\n\n#align(center)[#image("/static${fVar2025Url}", width: 65%)]`,
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'3) أ) بيّن أنّ المنحني $(C_f)$ يقبل مماسا $(T)$ موازيا لـ $(Delta)$، يُطلب تعيين معادلة له.',
						answer:
							'3) أ) المعادلة $f\'(x) = 1$ تكافئ $(x - 1)^2 = 0$ أي $x = 1$ (0.5 ن)، ومعادلة المماس $(T)$ هي $y = x + frac(2, e)$ (0.25 ن).',
						mark: '0.75'
					},
					{
						type: 'text',
						content: 'ب) تحقّق أنّ للمنحني $(C_f)$ نقطتي انعطاف، يُطلب تعيين إحداثييهما.',
						answer:
							'ب) لدينا $f\'\'(x) = g\'(x) = (x - 1)(x - 3) e^(-x)$ تنعدم وتغيّر إشارتها عند 1 وعند 3، فنقطتا الانعطاف هما $A(1 ; 1 + frac(2, e))$ و $B(3 ; 3 + frac(10, e^3))$.',
						mark: '0.5'
					},
					{
						type: 'text',
						content: '4) احسب $f(-1)$ ثمّ ارسم كلّا من $(Delta)$، $(T)$ و $(C_f)$.',
						answer: `4) لدينا $f(-1) = -1 + 2 e approx 4.44$ (0.25 ن). رسم $(Delta)$ و $(T)$ (0.5 ن) ورسم المنحني $(C_f)$ (0.5 ن):\n\n#align(center)[#image("/static${cf2025Url}", width: 68%)]`,
						mark: '1.25'
					},
					{
						type: 'text',
						content:
							'5) أ) عيّن العددين الحقيقيين $a$، $b$ حتى تكون الدّالة $h : x arrow.r.bar (-x^2 + a x + b) e^(-x)$ أصلية للدّالة $k : x arrow.r.bar (x^2 + 1) e^(-x)$ على $bb(R)$.',
						answer:
							'5) أ) من أجل كل عدد حقيقي $x$: $h\'(x) = [x^2 - (a + 2) x + a - b] e^(-x)$ (0.25 ن)، وبالمطابقة مع $k(x)$ نجد $(a ; b) = (-2 ; -3)$ (0.25 ن).',
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'ب) استنتج بالسنتيمتر المربّع حساب $cal(A)$ مساحة الحيّز المستوي المحدّد بالمنحني $(C_f)$ والمستقيمات التي معادلاتها: $y = x$، $x = 0$ و $x = 1$.',
						answer:
							'ب) بما أن وحدة المساحة هي $4 upright(c) upright(m)^2$ و $f(x) - x = k(x) > 0$ على $[0 ; 1]$، فإن $cal(A) = 4 integral_0^1 k(x) dif x = 4 [h(1) - h(0)]$، ومنه $cal(A) = (12 - frac(24, e)) upright(c) upright(m)^2$.',
						mark: '0.25'
					}
				]
			}
		]
	};

	return {
		slug: 'bac-2025-3as-tm-math',
		grade: '3as_tm',
		yearSubjectId: 725,
		streamId: 'TM',
		streamNameAr: 'تقني رياضي',
		academicYear: '2025',
		sessionAr: 'دورة جوان 2025',
		coefficient: 6,
		duration: '04 ساعات و30 دقيقة',
		titleAr: 'بكالوريا 2025 — الرياضيات (شعبة تقني رياضي - الموضوع الأول)',
		sourcePdfRelPath: 'pipeline/references/3as_tm/03_bac_official_archive/bac_2025_sujet.pdf',
		sourceSolutionPdfRelPath:
			'pipeline/references/3as_tm/03_bac_official_archive/bac_2025_correction.pdf',
		examDoc
	};
}

export function buildOfficialBac3asTm(): OfficialBacPaperRecord[] {
	return [buildPaper2023(), buildPaper2024(), buildPaper2025()];
}
